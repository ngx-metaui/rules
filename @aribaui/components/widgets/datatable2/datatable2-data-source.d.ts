import { Observable } from 'rxjs';
import { DataSource, DSInitParams } from '../../core/data/data-source';
import { DataProvider } from '../../core/data/datatype-registry.service';
import { DataFinder, DataFinders } from '../../core/data/data-finders';
import { DataProviders } from '../../core/data/data-providers';
import { DTColumn2Component } from './column/dt-column.component';
import { AWDataTable, DropPosition } from './aw-datatable';
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
export declare class DT2DataSource extends DataSource {
    dataProviders: DataProviders;
    finders: DataFinders;
    static readonly MaxLimit: number;
    /**
     * Matching dataProviders and finders
     */
    dataProvider: DataProvider<any>;
    dataFinder: DataFinder;
    /**
     * Keep track of current datatable state
     */
    state: Datatable2State;
    initialized: boolean;
    debugTime: number;
    /**
     * Defines object being rendered
     */
    private entity;
    constructor(dataProviders?: DataProviders, finders?: DataFinders);
    init(...args: any[]): void;
    /**
     * Triggers async fetch data request and result is given back using dataProvider.dataChanges
     *
     */
    fetch(withParams?: Datatable2State): void;
    /**
     * Component uses this method to open up continuous stream to listen for any changes which
     * need to be reflected on the UI.
     *
     * Dont forget to unsubscribe when component is destroyed.
     */
    open<T>(): Observable<T[]>;
    close(): void;
    /**
     * If CRUD is enabled we delegate calls to DataProvider that is responsible to tell the
     * dataProvider.dataChanges that are new data. If not enabled we have default implementation
     * which works with local array
     *
     */
    insert(object: any): void;
    /**
     * Please see {@link insert} method
     *
     */
    remove(object: any): void;
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
    find(pattern?: any): void;
    /**
     *
     * Data source delegates the responsibility to the given data provider which needs to implement
     * specific sorting mechanism
     *
     * Todo: Extend to sort by multiple columns
     *
     */
    sort(key: string, sortOrder: number): void;
    /**
     *
     * Persist db state
     *
     */
    updateState(offset: number, sortField: string, sOrder: number): void;
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
    reorderRows(origPos: number, newPos: number, dropPos: DropPosition): void;
}
/**
 * Entity definition to be used to initialize programmatically columns
 */
export interface EntityDef2 {
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
export declare class Datatable2State {
    static readonly Ascending: number;
    static readonly Descending: number;
    /**
     * Properties for paging and fetching
     */
    offset: number;
    limit: number;
    /**
     * Identifies default value that is used to render N number of rows in non-fullscreen
     * mode
     *
     */
    displayLimit: number;
    /**
     * Current sorting field
     */
    sortKey: string;
    /**
     * Sorting order of the sort field. DataTable support sorting for multiple column but we
     * dont persist it now. Maybe in the future
     */
    sortOrder: number;
    /**
     * If we are using global filter for current datatable then save it here
     */
    currentSearchQuery: string;
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
    constructor();
    static create(offset?: number, limit?: number, displayLimit?: number, sortField?: string, sOrder?: number, searchQuery?: string, filter?: any, outlineState?: Map<any, boolean>, detailRowState?: Map<any, boolean>): Datatable2State;
    static fromJSON(data: string): Datatable2State;
    static toJSON(data: Datatable2State): string;
}
/**
 * This needs to go to DTDataSource to keep and manage the state of the detail row. The idea is
 * simple we have a map holding item reference as a key and boolean value indicating if the
 * detail row is visible
 *
 * Todo: move this out to DS
 */
export declare class DetailRowExpansionState {
    private dt;
    expansionStates: Map<any, boolean>;
    constructor(dt: AWDataTable);
    detailExpansionEnabled: boolean;
    toggle(item: any): void;
    isExpanded(item: any): boolean;
    private itemToKey(item);
}
export interface DTStateSerializableHelper {
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
export declare function isDTInitParams(init: DTDSInitParams): init is DTDSInitParams;
/**
 * To make initialization easier we have this common format.
 */
export interface DTDSInitParams extends DSInitParams {
    /**
     * Object definition for the data
     */
    entity?: EntityDef2;
    state?: Datatable2State;
}
