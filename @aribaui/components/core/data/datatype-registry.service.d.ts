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
import { Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * DataTypeProviderRegistry aggregates different DataProviders per type.
 */
export declare class DataTypeProviderRegistry {
    /**
     * Maps class name to DataProvider implementation
     */
    private registryByProvider;
    /**
     * Maps a class Name  to actual type
     */
    private registryNameToClass;
    constructor();
    /**
     * For every single registered DataProvider implementation we also need store its prototype
     * in order to be able to support some kind of inheritance. You can register a provider for
     * a parent class if needed
     *
     */
    registerProvider<T>(target: any, provider: DataProvider<T>): void;
    /**
     * Search for best matching provider. If not found then use object prototype to get hold of its
     * parent and see if there is a provider registered on this level
     *
     */
    bestMatchForClass<T>(className: string): DataProvider<T>;
    /**
     * The same as bestMatchForClass() with the difference to pass a type. If you want to
     * support object inheritance you need this.
     *
     *
     */
    bestMatchForType<T>(type: Type<T>): DataProvider<T>;
}
/**
 * Provider is a data driver that can access data and retrieve them. It knows how to get 1
 * or more records, maybe do paging and some other things.
 *
 */
export declare abstract class DataProvider<T> {
    /**
     * Defines current type for this DataProvider
     */
    type: any;
    /**
     * Notifies all the listeners in case of data are available or if they changed due to some user
     * interaction  (search, adding or removing).
     *
     */
    dataChanges: BehaviorSubject<T[]>;
    /**
     *  Return size of the source
     *
     */
    expectedCount(params?: Map<string, any>): number;
    /**
     *
     * For use cases where we need to retrieve data based on some criteria e.g.
     *
     *  - max number of records
     *  - support paging with offset and limit
     *
     * @deprecated by fetch
     */
    abstract dataForParams(params: Map<string, any>): Array<T>;
    /**
     *
     * Fetches data from underlying dataProvider.
     *
     * Replacement for dataforParams
     *
     */
    abstract fetch(params: Map<string, any>): Observable<T[]>;
    /**
     *
     * Returns non-async current state of data
     */
    data(): Array<T>;
    /**
     * Tells if this DataProvider supports INSERT, REMOVE
     *
     */
    canCRUD(): boolean;
    /**
     * Tells if this DataProvider supports query capability
     *
     */
    canQuery(): boolean;
    /**
     * Implement to support insertion. After record is inserted emit event for dataChanges to
     * inform all subscribers
     *
     */
    insert(obj: any): void;
    /**
     * Implement to support record removal. After record is removed emit event for dataChanges to
     * inform all subscribers.
     *
     */
    remove(obj: any): void;
    /**
     * Implement to provide access to low level searcg API.
     *
     */
    query(params: Map<string, string>): void;
}
