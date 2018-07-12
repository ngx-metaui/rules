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
import { DataProvider } from './datatype-registry.service';
import { FieldPath } from '@aribaui/core';
import { Observable } from 'rxjs';
/**
 *
 * Provides a registry of different data Finders used mostly by DataSources. All Finders are
 * registered by this class as we don't have any needs right now to expose this to developer.
 *
 */
export declare class DataFinders {
    private findersByType;
    constructor();
    /**
     * Finds the best matching DataFinder based on the object type and queryType.
     */
    find(forProvider: DataProvider<any>, forType: QueryType): DataFinder;
    private initFinders();
}
/**
 * We have different options how to query data. FullText uses a string where predicate is
 * using key:value pair to built a query
 */
export declare enum QueryType {
    FullText = 0,
    Predicate = 1,
    FullTextAndPredicate = 2,
}
/**
 * This class provides matching capability for given DataProvider.
 */
export declare abstract class DataFinder {
    /**
     * In order to find concrete DataFinder we need to know the target type and the query type
     *
     */
    accepts(forData: DataProvider<any>, forType: QueryType): boolean;
    /**
     *
     * Sets a DataProvider for DataFinder
     *
     */
    abstract forData(provider: DataProvider<any>): DataFinder;
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
    abstract lookupKey: string;
    /**
     *
     * Matching methods which are either async or sync
     *
     */
    abstract instantMatch<T>(query: any, max: number): T[];
    abstract instantMatchWithSelections<T>(selections: any[], query: any, max: number): T[];
    match<T>(query: any, max?: number): Observable<T[]>;
    matchWithSelections<T>(selections: any[], query: any, max: number): Observable<T[]>;
}
/**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
 *
 *
 */
export declare class FullTextArrayDataFinder extends DataFinder {
    /**
     *  If list value is object set keyPath to get the object value
     */
    _keyPath: FieldPath;
    /**
     * Current DataProvider used to access data
     */
    protected _provider: DataProvider<any>;
    accepts(forData: DataProvider<any>, forType: QueryType): boolean;
    forData(provider: DataProvider<any>): FullTextArrayDataFinder;
    lookupKey: string;
    instantMatch<T>(query: any, max: number): T[];
    instantMatchWithSelections<T>(selections: any[], query: string, max: number): Array<T>;
    /**
     *
     * Warning: If you dont supply search Key and you want fulltext search and you use this
     * default implementation be aware that it can  perform poorly as it is naive implementaion
     * that does not do deep compare.
     *
     */
    matches<T>(item: any, pattern: string): boolean;
    match<T>(query: any, max: number): Observable<T[]>;
    matchWithSelections<T>(selections: any[], query: any, max: number): Observable<T[]>;
}
