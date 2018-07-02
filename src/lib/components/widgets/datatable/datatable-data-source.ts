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
import {assert, equals, isBlank, isPresent, isString} from '@aribaui/core';
import {Observable} from 'rxjs';
import {DataSource, DSInitParams} from '../../core/data/data-source';
import {DataProvider} from '../../core/data/datatype-registry.service';
import {DataFinder, DataFinders, QueryType} from '../../core/data/data-finders';
import {DataProviders} from '../../core/data/data-providers';


/**
 * Concrete DataSource implementation for Datatable which defines state and column definition that
 * can programmatically modify rendered columns (if provided) and method for inserting and
 * and deleting records;
 *
 * All operations dealing with data use Observable<T> and instant() method to retrieve current
 * state is not implemented.
 *
 *
 */
export class DTDataSource extends DataSource
{
    static readonly MaxLimit = 100;

    /**
     * Matching dataProviders and finders
     */
    dataProvider: DataProvider<any>;
    private dataFinder: DataFinder;

    /**
     * Keep track of current PrimeNg datatable state
     */
    private state: DatatableState;

    /**
     * Defines object being rendered
     */
    private entity: EntityDef;


    constructor(public dataProviders: DataProviders, public finders: DataFinders)
    {
        super(dataProviders, finders);
    }


    init(...args: any[]): void
    {
        if (isBlank(args) || args.length !== 1 && !isDTChooserInitParams(args[0])) {
            throw new Error('You need to initialize DS with (DSChooserInitParams)');
        }
        let init: DTDSChooserInitParams = args[0];

        this.dataProvider = isPresent(init.dataProvider) ? init.dataProvider
            : this.dataProviders.find(init.obj);

        this.dataFinder = isPresent(init.dataFinder) ? init.dataFinder
            : this.finders.find(this.dataProvider, init.queryType);

        assert(isPresent(this.dataProvider) && isPresent(this.dataFinder),
            'DataSource incorrectly initialized. (DataProvider, DataFinder) missing. ');

        this.dataFinder.lookupKey = init.lookupKey;
        if (isBlank(init.state)) {
            this.state = new DatatableState();
        } else {
            this.state = init.state;
        }

    }


    /**
     * Triggers async fetch data request and result is given back using dataProvider.dataChanges
     *
     */
    fetch(withParams?: DatatableState): void
    {
        let params = null;
        if (isPresent(withParams)) {
            params = new Map().set('offset', withParams.offset)
                .set('limit', (withParams.offset + withParams.rowsPerPage))
                .set('orderby', withParams.sortField)
                .set('selector', withParams.sortOrder);
        }

        let data = this.dataProvider.dataForParams(params);
        this.dataProvider.dataChanges.next(data);
    }


    /**
     * Component uses this method to open up continuous stream to listen for any changes which
     * need to be reflected on the UI.
     *
     * Dont forget to unsubscribe when component is destroyed.
     */
    open<T>(): Observable<T[]>
    {
        return this.dataProvider.dataChanges.asObservable();
    }

    close(): void
    {
        this.dataProvider = null;
        this.dataFinder = null;
    }


    /**
     * If CRUD is enabled we delegate calls to DataProvider that is responsible to tell the
     * dataProvider.dataChanges that are new data. If not enabled we have default implementation
     * which works with local array
     *
     */
    insert(object: any): void
    {
        if (this.dataProvider.canCRUD()) {
            this.dataProvider.insert(object);

        } else {
            let copy = this.dataProvider.data().slice();
            copy.push(object);

            this.dataProvider.dataChanges.next(copy);
        }
    }


    /**
     * Please see {@link insert} method
     *
     */
    remove(object: any): void
    {
        if (this.dataProvider.canCRUD()) {
            this.dataProvider.remove(object);

        } else {
            let copy = this.dataProvider.data().slice();
            let afterDelete = copy.filter((elem: any) => !equals(elem, object));

            this.dataProvider.dataChanges.next(afterDelete);
        }
    }

    /**
     *
     * Provides access to DataFinder which can accept either plain string or Map.
     *
     * To be able to provide correct input we need to ask DataFinder if it supports FullText like
     * type query or Predicate. In case of Predicate we build the Map with different key/value
     * pairs
     *
     *
     */
    find(pattern: any): void
    {
        if (isBlank(pattern) || pattern.length === 0) {
            return;
        }

        let searchParam: any = pattern;
        if (this.dataFinder.accepts(this.dataProvider, QueryType.Predicate)) {
            searchParam = new Map().set('query', pattern).set('limit', DTDataSource.MaxLimit);

            if (isPresent(this.state.sortField)) {
                searchParam.set('orderby', this.state.sortField);
            }

            if (isPresent(this.state.sortField)) {
                searchParam.set('selector', this.state.sortOrder);
            }
        } else {
            assert(isString(pattern), 'Cannot pass non-string value to FullText Finder');
        }

        this.dataFinder.match<any>(searchParam).subscribe((result: any[]) =>
        {
            this.dataProvider.dataChanges.next(result);
        });
    }


    /**
     *
     * Persist db state
     *
     */
    updateState(offset: number, rowsPerPage: number, sortField: string, sOrder: number): void
    {
        this.state.offset = offset;
        this.state.rowsPerPage = rowsPerPage;
        this.state.sortField = sortField;
        this.state.sortOrder = sOrder;
    }
}

/**
 * Entity definition to be used to initialize programatically columns
 */
export interface EntityDef
{
    propertyKeys: string[];

    defaultFormatter: (key: any) => string;

    displayStringForKey: (key: string) => string;

    defaultAlignmentForKey: (key: string) => string;
}

/**
 * Keeps current datatable state that is used to add additional information while fetching data or
 * executing query.
 *
 */
export class DatatableState
{
    public static readonly Ascending = 1;
    public static readonly Descending = -1;


    /**
     * First row offset
     */
    offset: number = 0;

    /**
     * Number of rows per page
     */
    rowsPerPage: number = 0;

    /**
     * Current sorting field
     */
    sortField: string;

    /**
     * Sorting order of the sort field. DataTable support sorting for multiple column but we
     * dont persist it now. Maybe in the future
     */
    sortOrder: number = DatatableState.Ascending;

    /**
     * If we are using global filter for current datatable then save it here
     */
    currentFilter: any;


    constructor()
    {

    }

    static create(offset: number = 0, rowsPerPage: number = 0, sortField: string = '',
                  sOrder: number = 0): DatatableState
    {
        let s = new DatatableState();
        s.offset = offset;
        s.rowsPerPage = rowsPerPage;
        s.sortField = sortField;
        s.sortOrder = sOrder;

        return s;
    }
}


export function isDTChooserInitParams(init: DTDSChooserInitParams): init is DTDSChooserInitParams
{
    return isPresent(init.obj) || isPresent(init.queryType);
}

/**
 * To make initialization easier we have this common format.
 */
export interface DTDSChooserInitParams extends DSInitParams
{

    /**
     * Object definition for the data
     */
    entity?: EntityDef;


    state?: DatatableState;

}
