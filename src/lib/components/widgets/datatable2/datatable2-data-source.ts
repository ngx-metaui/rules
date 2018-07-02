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
import {DTColumn2Component} from './column/dt-column.component';
import {MapWrapper} from '../../../core/utils/collection';
import {DropPosition} from './directives/dt-draggable-row.directive';


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
export class DT2DataSource extends DataSource
{
    static readonly MaxLimit = 100;

    /**
     * Matching dataProviders and finders
     */
    dataProvider: DataProvider<any>;
    dataFinder: DataFinder;

    /**
     * Keep track of current datatable state
     */
    state: Datatable2State;

    /**
     * Defines object being rendered
     */
    private entity: EntityDef2;


    initialized = false;

    debugTime: number;

    constructor (public dataProviders?: DataProviders, public finders?: DataFinders)
    {
        super(dataProviders, finders);

        this.state = Datatable2State.create();

        this.debugTime = new Date().getTime();
    }


    init (...args: any[]): void
    {
        if (isBlank(args) || args.length !== 1 && !isDTInitParams(args[0])) {
            throw new Error('You need to initialize DS with (DSChooserInitParams)');
        }
        let init: DTDSInitParams = args[0];

        // use existing or find best match for dataProvider
        this.dataProvider = isPresent(init.dataProvider) ? init.dataProvider
            : this.dataProviders.find(init.obj);

        // use existing or find best match for dataFinder
        this.dataFinder = isPresent(init.dataFinder) ? init.dataFinder
            : this.finders.find(this.dataProvider, init.queryType);

        assert(isPresent(this.dataProvider) && isPresent(this.dataFinder),
            'DataSource incorrectly initialized. (DataProvider, DataFinder) missing. ');

        this.dataFinder.lookupKey = init.lookupKey;
        if (isBlank(init.state)) {
            this.state = new Datatable2State();
        } else {
            this.state = init.state;
        }

        this.initialized = true;
    }


    /**
     * Triggers async fetch data request and result is given back using dataProvider.dataChanges
     *
     */
    fetch (withParams?: Datatable2State): void
    {
        let params = null;
        if (isPresent(withParams)) {
            params = new Map().set('offset', withParams.offset)
                .set('limit', withParams.limit)
                .set('orderby', withParams.sortKey)
                .set('selector', withParams.sortOrder);
        }

        this.dataProvider.fetch(params).subscribe((result: any[]) =>
        {
            if (withParams.offset > 0) {
                let incrData = [...this.dataProvider.dataChanges.getValue(), ...result];
                this.dataProvider.dataChanges.next(incrData);
            } else {
                this.dataProvider.dataChanges.next(result);
            }
        });
    }


    /**
     * Component uses this method to open up continuous stream to listen for any changes which
     * need to be reflected on the UI.
     *
     * Dont forget to unsubscribe when component is destroyed.
     */
    open<T> (): Observable<T[]>
    {
        return this.dataProvider.dataChanges.asObservable();
    }

    close (): void
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
    insert (object: any): void
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
    remove (object: any): void
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
    find (pattern?: any): void
    {
        if (isBlank(pattern) || pattern.length === 0) {
            // if we received empty string return orginal list
            this.fetch(this.state);
            return;
        }

        let searchParam: any = pattern;
        if (this.dataFinder.accepts(this.dataProvider, QueryType.Predicate)) {
            searchParam = new Map().set('query', pattern).set('limit', DT2DataSource.MaxLimit);

            if (isPresent(this.state.sortKey)) {
                searchParam.set('orderby', this.state.sortKey);
            }

            if (isPresent(this.state.sortKey)) {
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
     * Data source delegates the responsibility to the given data provider which needs to implement
     * specific sorting mechanism
     *
     * Todo: Extend to sort by multiple columns
     *
     */
    sort (key: string, sortOrder: number): void
    {
        if (isBlank(this.dataProvider.data()) || this.dataProvider.data().length === 0) {
            return;
        }
        this.state.sortKey = key;
        this.state.sortOrder = sortOrder;
        this.fetch(this.state);
    }

    /**
     *
     * Persist db state
     *
     */
    updateState (offset: number, sortField: string, sOrder: number): void
    {
        this.state.offset = offset;
        this.state.sortKey = sortField;
        this.state.sortOrder = sOrder;
    }


    /**
     *
     * reshuffles current array based on new row D&D result.
     *
     * Since there is a difference if we move item from bottom or from the top and then accordingly
     * highlighting a space between rows. We need to reflect this in here as well.
     *
     * UseCase 1:
     *
     * 1. You can grab item with index 0 and move it down so that you can see a dropping line
     * between row with index 2 - 3
     *
     * 2. In this case splice() starts from position 2 and insert all elements after 2
     *      splice(start: number, deleteCount: number, ...items: T[]): T[];
     *
     * 3. no need to update newPos
     *
     * UseCase 2:
     *
     * 1. You can grab item with index 0 and move all the way down of the DT and now move the
     * row toward TOP and space between rows with index 2 - 3 is highlighted again.
     *
     * 2. Here is the difference, before we highlighted row #2 with line at the bottom, now
     * it seems the same but its highlighted row #3 with line at the TOP.
     *
     * * This is the reason whey we need to do newPos -= 1 or newPos += 1; depending our direction
     * where where the line between rows is created.
     *
     *
     * We don't need any complicated calculation trying to find out if we are on one half of the row
     * or second half and based on this try to apply certain style. This would not give so much
     * space if we want drop row into the row. And the calculation with coordinates woudl be too
     * complicated.
     *
     * We simply remember the direction we are moving and based on this we apply style to
     * to create a line at the TOP if we are going upwards or bottom otherwise.
     *
     *
     */
    reorderRows (origPos: number, newPos: number, dropPos: DropPosition): void
    {
        let array = this.dataProvider.data().slice();

        // take something from top and drag&drop under
        if (newPos > origPos && dropPos === DropPosition.Before && newPos < array.length) {
            newPos -= 1;

            // take something from bottom and drag&drop above
        } else if (newPos < origPos && dropPos === DropPosition.After && newPos >= 0) {
            newPos += 1;
        }

        array.splice(newPos, 0, ...array.splice(origPos, 1)[0]);
        this.dataProvider.dataChanges.next(array);
    }

}

/**
 * Entity definition to be used to initialize programmatically columns
 */
export interface EntityDef2
{
    propertyKeys: string[];

    defaultFormatter: (key: any) => string;

    displayStringForKey: (key: string) => string;

    defaultAlignmentForKey: (key: string) => string;
}

/**
 * Keeps current datatable state the state which drivers the way while fetching the data as well
 * encapsulate set of properties that needs to be persistet in order to recover a state after e.g.
 * browser refresh
 *
 *
 * todo: Create methods to convert this state from and to JSON for easier serialization
 */
export class Datatable2State
{
    public static readonly Ascending = 1;
    public static readonly Descending = -1;

    /**
     * Properties for paging and fetching
     */
    offset: number = 0;
    limit: number = 0;

    /**
     * Identifies default value that is used to render N number of rows in non-fullscreen
     * mode
     *
     */
    displayLimit: number = 0;

    /**
     * Current sorting field
     */
    sortKey: string;

    /**
     * Sorting order of the sort field. DataTable support sorting for multiple column but we
     * dont persist it now. Maybe in the future
     */
    sortOrder: number = Datatable2State.Ascending;

    /**
     * If we are using global filter for current datatable then save it here
     */
    currentSearchQuery: string = '';

    /**
     * Current if any preselected filter
     */
    currentFilter: any;

    /**
     * Represent current selection depending on selection mode.
     *
     * Current selection used both for row selection and cell selection. Row selection is used when
     * SingleSelect and MultiSelect once we implement this.
     *
     */
    selection: any;


    /**
     * When header selection is enabled it captures currently selected column
     */
    headerSelection: DTColumn2Component;


    /**
     *
     *  Holds current state of the outline tree if used
     *
     */
    outlineState?: Map<any, boolean>;

    /**
     *
     *  Holds current state of the detail rows if used
     *
     */
    detailRowExpandState?: Map<any, boolean>;


    constructor ()
    {
        this.outlineState = new Map<any, boolean>();
        this.detailRowExpandState = new Map<any, boolean>();
    }

    static create (offset: number = 0, limit: number = 15, displayLimit: number = 5,
                   sortField: string = '', sOrder: number = 0, searchQuery?: string, filter?: any,
                   outlineState: Map<any, boolean> = new Map<any, boolean>(),
                   detailRowState: Map<any, boolean> = new Map<any, boolean>()): Datatable2State
    {
        let s = new Datatable2State();
        s.offset = offset;
        s.limit = limit;
        s.displayLimit = displayLimit;
        s.sortKey = sortField;
        s.sortOrder = sOrder;
        s.currentSearchQuery = searchQuery;
        s.currentFilter = filter;
        s.outlineState = outlineState;
        s.detailRowExpandState = detailRowState;

        return s;
    }

    static fromJSON (data: string): Datatable2State
    {
        let state: DTStateSerializableHelper = JSON.parse(data);
        let ds = new Datatable2State();
        ds.offset = state.offset;
        ds.limit = state.limit;
        ds.displayLimit = state.displayLimit;
        ds.sortKey = state.sortKey;
        ds.sortOrder = state.sortOrder;
        ds.currentSearchQuery = state.currentSearchQuery;
        ds.outlineState = MapWrapper.createFromAnyMap<boolean>(state.outlineState);
        ds.detailRowExpandState = MapWrapper.createFromAnyMap<boolean>(state.detailRowExpandState);

        return ds;
    }


    static toJSON (data: Datatable2State): string
    {
        let toConvert: DTStateSerializableHelper = {
            offset: data.offset,
            limit: data.limit,
            displayLimit: data.displayLimit,
            sortKey: data.sortKey,
            sortOrder: data.sortOrder,
            currentSearchQuery: data.currentSearchQuery,
            outlineState: MapWrapper.toAnyMap(data.outlineState),
            detailRowExpandState: MapWrapper.toAnyMap(data.detailRowExpandState)

        };
        return JSON.stringify(toConvert);
    }

}


export interface DTStateSerializableHelper
{
    offset: number;
    limit: number;
    displayLimit: number;
    sortKey: string;
    sortOrder: number;
    currentSearchQuery: string;
    currentFilter?: any;
    outlineState: any;
    detailRowExpandState: any;

}

export function isDTInitParams (init: DTDSInitParams): init is DTDSInitParams
{
    return isPresent(init.obj) || isPresent(init.queryType) || isPresent(init.entity);
}

/**
 * To make initialization easier we have this common format.
 */
export interface DTDSInitParams extends DSInitParams
{

    /**
     * Object definition for the data
     */
    entity?: EntityDef2;

    state?: Datatable2State;
}
