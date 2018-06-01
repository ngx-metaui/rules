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
    FieldPath,
    isBlank,
    isFunction,
    isJsObject,
    isPresent,
    isString,
    unimplemented
} from '@aribaui/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ArrayDataProvider} from './array-data-provider';


/**
 *
 * Provides a registry of different data Finders used mostly by DataSources. All Finders are
 * registered by this class as we don't have any needs right now to expose this to developer.
 *
 */
@Injectable()
export class DataFinders
{

    private findersByType: Map<DataFinder, Type<DataFinder>> = new Map();

    constructor ()
    {
        this.initFinders();
    }

    /**
     * Finds the best matching DataFinder based on the object type and queryType.
     */
    find (forProvider: DataProvider<any>, forType: QueryType): DataFinder
    {

        let finderMatch: Type<DataFinder>;
        this.findersByType.forEach((v: Type<DataFinder>, k: DataFinder) =>
        {
            if (k.accepts(forProvider, forType)) {
                finderMatch = v;
                return true;
            }
        });

        if (isPresent(finderMatch)) {
            let copy = new finderMatch();
            copy.forData(forProvider);
            return copy;

        }
        return null;
    }

    private initFinders ()
    {
        // create a prototype for each
        this.findersByType.set(new FullTextArrayDataFinder(), FullTextArrayDataFinder);

    }
}

/**
 * We have different options how to query data. FullText uses a string where predicate is
 * using key:value pair to built a query
 */
export enum QueryType
{
    FullText,
    Predicate,
    FullTextAndPredicate
}


/**
 * This class provides matching capability for given DataProvider.
 */
export abstract class DataFinder
{


    /**
     * In order to find concrete DataFinder we need to know the target type and the query type
     *
     */
    accepts (forData: DataProvider<any>, forType: QueryType): boolean
    {
        return false;
    }

    /**
     *
     * Sets a DataProvider for DataFinder
     *
     */
    abstract forData (provider: DataProvider<any>): DataFinder;

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
    abstract set lookupKey (key: string);


    /**
     *
     * Matching methods which are either async or sync
     *
     */
    abstract instantMatch<T> (query: any, max: number): T[];

    abstract instantMatchWithSelections<T> (selections: any[], query: any, max: number): T[];


    match<T> (query: any, max: number = -1): Observable<T[]>
    {
        return unimplemented();
    }

    matchWithSelections<T> (selections: any[], query: any, max: number): Observable<T[]>
    {
        return unimplemented();
    }
}


/**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
 *
 *
 */
export class FullTextArrayDataFinder extends DataFinder
{
    /**
     *  If list value is object set keyPath to get the object value
     */
    _keyPath: FieldPath;

    /**
     * Current DataProvider used to access data
     */
    protected _provider: DataProvider<any>;


    accepts (forData: DataProvider<any>, forType: QueryType): boolean
    {
        return forData instanceof ArrayDataProvider && forType === QueryType.FullText;
    }

    forData (provider: DataProvider<any>): FullTextArrayDataFinder
    {
        this._provider = provider;
        return this;
    }

    set lookupKey (key: string)
    {
        this._keyPath = isPresent(key) ? new FieldPath(key) : null;
    }

    instantMatch<T> (query: any, max: number): T[]
    {
        assert(isPresent(this._provider), 'Missing DataProvider');

        let list = this._provider.dataForParams(new Map().set('limit', max));
        return this.instantMatchWithSelections<T>(list, query, max);
    }

    instantMatchWithSelections<T> (selections: any[], query: string, max: number): Array<T>
    {
        assert(isPresent(this._provider), 'Missing DataProvider');

        if (isBlank(query)) {
            return selections;
        }
        let result: any[] = [];
        let toLowerPattern = query.toLowerCase();

        for (let i = 0; i < selections.length; i++) {
            let item = selections[i];
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
    matches<T> (item: any, pattern: string): boolean
    {
        let val = (isPresent(this._keyPath)) ? this._keyPath.getFieldValue(item) : item;
        if (isFunction(val)) {
            val = val.call(item);
        } else if (isJsObject(item)) {
            return Object.values(item).filter((value: string) =>
                isPresent(value) && isString(value) && value.toLowerCase().indexOf(pattern) !== -1)
                .length > 0;
        } else {
            return isBlank(pattern) ||
                isPresent(val) && val.toString().toLowerCase().indexOf(pattern) > -1;
        }
    }


    match<T> (query: any, max: number): Observable<T[]>
    {
        return Observable.of(this.instantMatch(query, max));
    }

    matchWithSelections<T> (selections: any[], query: any, max: number): Observable<T[]>
    {
        return Observable.of(this.instantMatchWithSelections(selections, query, max));
    }
}
