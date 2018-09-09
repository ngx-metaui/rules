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
import { Type } from '@angular/core';
import { FieldPath } from '@aribaui/core';
import { Observable } from 'rxjs';
import { OutlineNode } from '../../widgets/outline/outline-for.component';
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
    /**
     * Registers new finder
     *
     */
    register<T>(prototype: DataFinder, type: Type<DataFinder>): void;
    private initFinders();
}
/**
 * We have different options how to query data. FullText uses a string where predicate is
 * using key:value pair to built a query
 */
export declare enum QueryType {
    FullText = 0,
    FullTextOutline = 1,
    Predicate = 2,
    FullTextAndPredicate = 3,
}
/**
 * This class provides matching capability for given DataProvider.
 */
export declare abstract class DataFinder {
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
     * Matching methods which are either async or sync
     *
     */
    abstract instantMatch<T>(query: any, max: number): T[];
    abstract instantMatchWithSelections<T>(selectionsForMatch: any[], query: any, max: number): T[];
    /**
     *
     * Query can be a simple string literal or a map having different key value pair as a
     * filter
     *
     */
    match<T>(query: any, max?: number): Observable<T[]>;
    matchWithSelections<T>(selections: any[], query: any, max: number): Observable<T[]>;
}
/**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
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
    lookupKey: string;
    accepts(forData: DataProvider<any>, forType: QueryType): boolean;
    forData(provider: DataProvider<any>): FullTextArrayDataFinder;
    instantMatch<T>(query: any, max: number): T[];
    instantMatchWithSelections<T>(selectionsForMatch: any[], query: string, max: number): Array<T>;
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
    protected hasObjectValue(obj: any, pattern: string): boolean;
}
/**
 * Extends basic Infix implementation to work on top of OutlineNodes. It first checks all the
 * children on lowest level and moving up to the root and marking nodes that can be removed.
 *
 *  For simple data structure which operates on local array this should be good enough we this
 *  can never match with real DB full text search.
 *
 */
export declare class OutlineFullTextArrayDataFinder extends FullTextArrayDataFinder {
    accepts(forData: DataProvider<any>, forType: QueryType): boolean;
    instantMatchWithSelections<T>(selectionsForMatch: any[], query: string, max: number): Array<T>;
    /**
     *
     * Going thru the tree from bottom up and mark all that matches query
     *
     */
    rollup(nodes: OutlineNode[], query: string): boolean;
    /**
     * Filter out all the nodes that are marked as visible = false and make sure and
     * don't modify original list
     *
     */
    shake(nodes: OutlineNode[]): any[];
}
