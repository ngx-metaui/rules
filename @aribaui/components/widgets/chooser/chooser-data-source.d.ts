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
import { DataSource, DSInitParams } from '../../core/data/data-source';
import { DataFinders } from '../../core/data/data-finders';
import { DataProviders } from '../../core/data/data-providers';
import { Observable } from 'rxjs';
import { ChooserState } from './chooser-state';
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
export declare class ChooserDataSource extends DataSource {
    dataProviders: DataProviders;
    finders: DataFinders;
    /**
     * Matching dataProviders and finders
     */
    private dataProvider;
    private dataFinder;
    /**
     * Special object to keep current state of this chooser
     */
    state: ChooserState;
    constructor(dataProviders: DataProviders, finders: DataFinders);
    /**
     * To initialize this DataSource with current DataFinder and Provider as well as state we use
     * an interface DSChooserInitParams to have all init values typed checked
     *
     *
     */
    init(...args: any[]): void;
    find(pattern: string, max: number): void;
    /**
     *
     * When multiselect this method checks if we need to show SHOW MORE label under the selected
     * items. We do not want show e.g. 50 selection under the chooser that would take up whole
     * page.
     *
     */
    showMoreSelected(): boolean;
    open<T>(): Observable<T[]>;
    close(): void;
    instant<T>(): T[];
    updateValue(value: any): void;
    readonly lookupKey: string;
}
export declare function isDSChooserInitParams(init: DSChooserInitParams): init is DSChooserInitParams;
/**
 * To make initialization easier we have this common format.
 */
export interface DSChooserInitParams extends DSInitParams {
    /**
     * Chooser state keeping information what is currently selected , result of the last match
     */
    state?: ChooserState;
}
