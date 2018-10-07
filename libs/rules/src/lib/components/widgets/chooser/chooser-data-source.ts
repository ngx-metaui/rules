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
import {DataSource, DSInitParams} from '../../core/data/data-source';
import {DataFinder, DataFinders} from '../../core/data/data-finders';
import {DataProviders} from '../../core/data/data-providers';
import {Observable} from 'rxjs';
import {DataProvider} from '../../core/data/datatype-registry.service';
import {ChooserState} from './chooser-state';
import {assert, isArray, isBlank, isPresent} from '../../../core/utils/lang';
import {ListWrapper} from '../../../core/utils/collection';

/**
 * Concrete DataSource implementation for the Chooser component. There are two ways how to use it:
 *
 * 1) You can use default DataSource injected inside component constructor and just call
 * initialize to configure it with correct DataProvider and DataFinder:
 *
 *
 * ```
 *   this.dataSource.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 * and then you can use it to simply retrieve data or run queries.
 *
 * 2) You will instantiate your own DataSource and pass it into the component using [dataSource]
 * binding
 *
 * ```
 *
 *   this.ds = new ChooserDataSource(this.data, this.finders);
 *   this.ds.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 *
 */
export class ChooserDataSource extends DataSource {

  /**
   * Matching dataProviders and finders
   */
  private dataProvider: DataProvider<any>;
  private dataFinder: DataFinder;


  /**
   * Special object to keep current state of this chooser
   */
  state: ChooserState;


  constructor(public dataProviders: DataProviders, public finders: DataFinders) {
    super(dataProviders, finders);
  }


  /**
   * To initialize this DataSource with current DataFinder and Provider as well as state we use
   * an interface DSChooserInitParams to have all init values typed checked
   *
   *
   */
  init(...args: any[]): void {
    if (isBlank(args) || args.length !== 1 && !isDSChooserInitParams(args[0])) {
      throw new Error('You need to initialize DS with (DSChooserInitParams)');
    }
    let init: DSChooserInitParams = args[0];

    this.dataProvider = isPresent(init.dataProvider) ? init.dataProvider
      : this.dataProviders.find(init.obj);

    this.dataFinder = isPresent(init.dataFinder) ? init.dataFinder
      : this.finders.find(this.dataProvider, init.queryType);

    assert(isPresent(this.dataProvider) && isPresent(this.dataFinder),
      'DataSource incorrectly initialized. (DataProvider, DataFinder) missing. ');

    if (isPresent(init.state)) {
      this.state = init.state;
    } else {
      this.state = new ChooserState(null, init.multiselect);
    }

    this.dataFinder.lookupKey = init.lookupKey;
    this.state.lookupKey = init.lookupKey;
  }


  find(pattern: string, max: number): void {
    this.state.pattern = pattern;
    this.state.lastFullMatchPattern = pattern;

    if (pattern.length === 0) {
      return;
    }
    if (pattern === '*') { // query everything
      pattern = '';
    }


    // make sure we dataFinder has expected lookup key
    let origKey = this.dataFinder.lookupKey;
    this.dataFinder.lookupKey = this.state.lookupKey;
    this.dataFinder.forData(this.dataProvider).match<any>(pattern, max)
      .subscribe((result: any[]) => {
        this.state.matches = result;

        if (this.state.multiselect) {
          for (let i = 0; i < this.state.selectedObjects().length; i++) {
            let item = this.state.selectedObjects()[i];
            ListWrapper.removeIfExist(this.state.matches, item);
          }
        }

        this.dataFinder.lookupKey = origKey;
      });
  }

  /**
   *
   * When multiselect this method checks if we need to show SHOW MORE label under the selected
   * items. We do not want show e.g. 50 selection under the chooser that would take up whole
   * page.
   *
   */
  showMoreSelected(): boolean {
    return this.state.selectedObjects().length >= DataSource.MaxRecentSelected;
  }

  open<T>(): Observable<T[]> {
    return this.dataProvider.dataChanges.asObservable();
  }

  close(): void {
    this.dataProvider = null;
    this.dataFinder = null;
    this.state = null;
  }

  instant<T>(): T[] {
    return this.dataProvider.data();
  }

  updateValue(value: any): void {
    this.state.addMode = true;
    if (isArray(value)) {
      let items: any[] = value;
      items.forEach((item) => this.state.updatedSelectedObjects(item));
    } else {
      this.state.updatedSelectedObjects(value);
    }
    this.state.addMode = false;

  }


  get lookupKey(): string {
    return this.dataFinder.lookupKey;
  }
}

/* is "init" type of DSChooserInitParams interface ? */
export function isDSChooserInitParams(init: DSChooserInitParams): init is DSChooserInitParams {
  return isPresent(init.obj) || isPresent(init.queryType);
}

/**
 * To make initialization easier we have this common format.
 */
export interface DSChooserInitParams extends DSInitParams {
  /**
   * Chooser state keeping information what is currently selected , result of the last match
   */
  state?: ChooserState;
}



