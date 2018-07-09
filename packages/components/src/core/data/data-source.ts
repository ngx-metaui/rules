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
import {DataProviders} from './data-providers';
import {DataFinders} from './data-finders';
import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import {unimplemented} from '@aribaui/core';
import {DataFinder, QueryType} from '../../core/data/data-finders';
import {DataProvider} from '../../core/data/datatype-registry.service';


export const DATA_SOURCE = new InjectionToken<DataSource>('DATA_SOURCE');

/**
 * DataSource describes basic functionality for handling stream of data specific to component
 *
 * It is expected that DataSource will be defined as component provider using
 *
 * @Components ({
 *      ...
 *      providers:[
 *
 *          provide: DATA_SOURCE, useClass: ChooserDataSourcePlainArrayExample,
                        deps: [DataProviders, DataFinders]
 *      ]
 *
 * })
 *
 *
 * so all the dependencies (DataProviders, DataFinders) are properly injected.
 *
 * DataProvider uses open() method to broadcast changes to all the subscribers in reactive way.
 * Or you can use instant() method to retrieve current state of this DataSource (sync)
 *
 */
export abstract class DataSource
{
    static readonly MaxLength = 10;
    static readonly MaxRecentSelected = 5;

    /**
     *
     * Each DataSource have injected DataProviders and DataFinders to retrieve concrete
     * implementation
     *
     */
    constructor(protected dataProviders?: DataProviders, protected finders?: DataFinders)
    {
    }


    /**
     * Allows to initialize data source and pass some additional values
     *
     *
     */
    abstract init(...args: any[]): void;

    /**
     * DataProviders works with stream of data and this opens up the channel in order to
     * listen and react for any changes that could happen inside DataProvider
     */
    abstract open<T>(): Observable<T[]>;


    /**
     * Release subscription to DataProvider
     */
    abstract close(): void;


    /**
     * Returns a data instantly from the internal state of DataProvider
     */
    instant<T>(): T[]
    {

        return unimplemented();
    }

}


/**
 * To make initialization easier we have this common format.
 */
export interface DSInitParams
{
    /**
     * List of values or the object type name we want to render
     */
    obj?: any;

    /**
     * Which find we want to load FullText or Predicate
     */
    queryType: QueryType;

    /**
     * Can specify lookup Key to narrow down the search to specific field. If lookup key is
     * null, items are assumed to be strings
     */
    lookupKey?: string;

    /**
     * Tells if the Chooser is single or multi select
     */
    multiselect: boolean;

    /**
     * Option to pass custom DataProvider instead letting DataProviders to find match
     */
    dataProvider?: DataProvider<any>;

    /**
     * Option to pass custom DataFinder instead letting DataFinders to find match
     */
    dataFinder?: DataFinder;
}
