/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {DataProvider} from './datatype-registry.service';
import {Injectable, Type} from '@angular/core';
import {
  assert,
  isArray,
  isBlank,
  isFunction,
  isJsObject,
  isPresent,
  objectToName,
  objectValues,
  unimplemented
} from '../../core/utils/lang';


import {Observable, of as observableOf} from 'rxjs';
import {ArrayDataProvider} from './array-data-provider';
import {OutlineNode} from '../../widgets/outline/outline-for.component';
import {FieldPath} from '@ngx-metaui/rules';


/**
 *
 * Provides a registry of different data Finders used mostly by DataSources. All Finders are
 * registered by this class as we don't have any needs right now to expose this to developer.
 *
 */
@Injectable()
export class DataFinders {

  private findersByType: Map<DataFinder, Type<DataFinder>> = new Map();

  constructor() {
    this.initFinders();
  }

  /**
   * Finds the best matching DataFinder based on the object type and queryType.
   */
  find(forProvider: DataProvider<any>, forType: QueryType): DataFinder {

    let finderMatch: Type<DataFinder>;
    this.findersByType.forEach((v: Type<DataFinder>, k: DataFinder) => {
      if (k.accepts(forProvider, forType)) {
        finderMatch = v;
        return true;
      }
    });

    if (isPresent(finderMatch)) {
      const copy = new finderMatch();
      copy.forData(forProvider);
      return copy;

    }
    return null;
  }

  /**
   * Registers new finder
   *
   */
  register<T>(prototype: DataFinder, type: Type<DataFinder>): void {
    this.findersByType.set(prototype, type);
  }

  private initFinders() {
    // create a prototype for each
    this.findersByType.set(new FullTextArrayDataFinder(), FullTextArrayDataFinder);
    this.findersByType.set(new OutlineFullTextArrayDataFinder(),
      OutlineFullTextArrayDataFinder);

  }
}

/**
 * We have different options how to query data. FullText uses a string where predicate is
 * using key:value pair to built a query
 */
export enum QueryType {
  FullText,
  FullTextOutline,
  Predicate,
  FullTextAndPredicate
}


/**
 * This class provides matching capability for given DataProvider.
 */
export abstract class DataFinder {


  /**
   *
   * Lookup key to apply when running match. Ideally your DS should be able to set lookupKey
   * either globally for given dataProvider or locally every time you run search. This is in
   * case you have many choosers for the same type and you want them to have different lookup
   * key.
   *
   *
   *
   */
  abstract set lookupKey(key: string);

  /**
   * In order to find concrete DataFinder we need to know the target type and the query type
   *
   */
  accepts(forData: DataProvider<any>, forType: QueryType): boolean {
    return false;
  }

  /**
   *
   * Sets a DataProvider for DataFinder
   *
   */
  abstract forData(provider: DataProvider<any>): DataFinder;

  /**
   *
   * Matching methods which are either async or sync
   *
   */
  abstract instantMatch<T>(query: any, max: number): T[];

  abstract instantMatchWithSelections<T>(selectionsForMatch: any[], query: any,
                                         max: number): T[];


  /**
   *
   * Query can be a simple string literal or a map having different key value pair as a
   * filter
   *
   */
  match<T>(query: any, max: number = -1): Observable<T[]> {
    return unimplemented();
  }

  matchWithSelections<T>(selections: any[], query: any, max: number): Observable<T[]> {
    return unimplemented();
  }
}


/**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
 *
 */
export class FullTextArrayDataFinder extends DataFinder {
  /**
   *  If list value is object set keyPath to get the object value
   */
  _keyPath: FieldPath;

  /**
   * Current DataProvider used to access data
   */
  protected _provider: DataProvider<any>;

  set lookupKey(key: string) {
    this._keyPath = isPresent(key) ? new FieldPath(key) : null;
  }

  accepts(forData: DataProvider<any>, forType: QueryType): boolean {
    return forData instanceof ArrayDataProvider && forType === QueryType.FullText;
  }

  forData(provider: DataProvider<any>): FullTextArrayDataFinder {
    this._provider = provider;
    return this;
  }

  instantMatch<T>(query: any, max: number): T[] {
    assert(isPresent(this._provider), 'Missing DataProvider');

    const list = this._provider.dataForParams(new Map().set('limit', max));
    return this.instantMatchWithSelections<T>(list, query, max);
  }

  instantMatchWithSelections<T>(selectionsForMatch: any[], query: string, max: number): Array<T> {
    assert(isPresent(this._provider), 'Missing DataProvider');

    if (isBlank(query)) {
      return selectionsForMatch;
    }
    const result: any[] = [];
    const toLowerPattern = query.toLowerCase();

    for (let i = 0; i < selectionsForMatch.length; i++) {
      const item = selectionsForMatch[i];
      if (this.matches(item, toLowerPattern)) {
        result.push(item);
        if (result.length >= max) {
          break;
        }
      }
    }
    return result;
  }

  /**
   *
   * Warning: If you dont supply search Key and you want fulltext search and you use this
   * default implementation be aware that it can  perform poorly as it is naive implementaion
   * that does not do deep compare.
   *
   */
  matches<T>(item: any, pattern: string): boolean {
    let val = (isPresent(this._keyPath)) ? this._keyPath.getFieldValue(item) : item;
    if (isFunction(val)) {
      val = val.call(item);
    } else if (isJsObject(item)) {
      return this.hasObjectValue(item, pattern);

    } else {
      return isBlank(pattern) ||
        isPresent(val) && val.toString().toLowerCase().indexOf(pattern) > -1;
    }
  }


  match<T>(query: any, max: number): Observable<T[]> {
    return observableOf(this.instantMatch(query, max));
  }

  matchWithSelections<T>(selections: any[], query: any, max: number): Observable<T[]> {
    return observableOf(this.instantMatchWithSelections(selections, query, max));
  }

  protected hasObjectValue(obj: any, pattern: string): boolean {
    const values = objectValues(obj);
    const parentObj = objectToName(obj);
    const length2 = values.filter((value: any) => {
      if (isBlank(value) || isArray(value)) {
        return false;

      } else if (!isJsObject(value) && !isFunction(value)) {
        return value.toString().toLowerCase().indexOf(pattern) !== -1;

      } else if (isJsObject(value) && objectToName(value) !== parentObj) {
        return this.hasObjectValue(value, pattern);
      }

      return false;
    }).length;
    return length2 > 0;
  }
}


/**
 * Extends basic Infix implementation to work on top of OutlineNodes. It first checks all the
 * children on lowest level and moving up to the root and marking nodes that can be removed.
 *
 *  For simple data structure which operates on local array this should be good enough we this
 *  can never match with real DB full text search.
 *
 */
export class OutlineFullTextArrayDataFinder extends FullTextArrayDataFinder {

  accepts(forData: DataProvider<any>, forType: QueryType): boolean {
    return forData instanceof ArrayDataProvider && forType === QueryType.FullTextOutline;
  }


  instantMatchWithSelections<T>(selectionsForMatch: any[], query: string, max: number): Array<T> {
    assert(isPresent(this._provider), 'Missing DataProvider');

    if (isBlank(query)) {
      return selectionsForMatch;
    }
    const toLowerPattern = query.toLowerCase();

    const sourceToSearch = selectionsForMatch.slice();
    this.rollup(sourceToSearch, toLowerPattern);
    return this.shake(sourceToSearch);
  }


  /**
   *
   * Going thru the tree from bottom up and mark all that matches query
   *
   */
  rollup(nodes: OutlineNode[], query: string): boolean {
    nodes.forEach((item: OutlineNode) => {
      // start from bottom up and capture how many occurrences is found for future use
      let hasChildrenMatch = false;
      if (isPresent(item.children) && item.children.length > 0) {
        hasChildrenMatch = this.rollup(item.children, query);
      }
      item.visible = hasChildrenMatch || this.matches(item, query);
    });

    return nodes.some((item: OutlineNode) => item.visible);
  }

  /**
   * Filter out all the nodes that are marked as visible = false and make sure and
   * don't modify original list
   *
   */
  shake(nodes: OutlineNode[]): any[] {
    return nodes
      .filter(node => node.visible)
      .map(node => ({
        ...node,
        isExpanded: node.visible,
        children: node.children && this.shake(node.children)
      }));
  }

}


