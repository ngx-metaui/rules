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
 *
 *
 */
import { DataProvider } from './datatype-registry.service';
import { Observable } from 'rxjs';
/**
 * Default implementation for Arrays.
 */
export declare class ArrayDataProvider<T> extends DataProvider<T> {
    protected values: Array<T>;
    constructor(values: Array<T>);
    expectedCount(params?: Map<string, any>): number;
    dataForParams(params?: Map<string, any>): Array<T>;
    fetch(params: Map<string, any>): Observable<T[]>;
    /**
     * Provides default implementation for sorting current dataset by one column / key
     *
     * for sortOrdering please see Datatable and its sortOrderingForNumber()
     *
     *      1  = ascending
     *      -1 = descending
     */
    private sort(arrayToSort, key, sortOrder);
}
