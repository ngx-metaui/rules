/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { assert, equals, isBlank, isEntity, isPresent, isString, MapWrapper } from '@aribaui/core';
import { DataSource } from '../../core/data/data-source';
import { QueryType } from '../../core/data/data-finders';
import { DropPosition } from './aw-datatable';
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
export class DT2DataSource extends DataSource {
    /**
     * @param {?=} dataProviders
     * @param {?=} finders
     */
    constructor(dataProviders, finders) {
        super(dataProviders, finders);
        this.dataProviders = dataProviders;
        this.finders = finders;
        this.initialized = false;
        this.state = Datatable2State.create();
        this.debugTime = new Date().getTime();
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    init(...args) {
        if (isBlank(args) || args.length !== 1 && !isDTInitParams(args[0])) {
            throw new Error('You need to initialize DS with (DSChooserInitParams)');
        }
        let /** @type {?} */ init = args[0];
        // use existing or find best match for dataProvider
        this.dataProvider = isPresent(init.dataProvider) ? init.dataProvider
            : this.dataProviders.find(init.obj);
        // use existing or find best match for dataFinder
        this.dataFinder = isPresent(init.dataFinder) ? init.dataFinder
            : this.finders.find(this.dataProvider, init.queryType);
        assert(isPresent(this.dataProvider) && isPresent(this.dataFinder), 'DataSource incorrectly initialized. (DataProvider, DataFinder) missing. ');
        this.dataFinder.lookupKey = init.lookupKey;
        if (isBlank(init.state)) {
            this.state = new Datatable2State();
        }
        else {
            this.state = init.state;
        }
        this.initialized = true;
    }
    /**
     * Triggers async fetch data request and result is given back using dataProvider.dataChanges
     *
     * @param {?=} withParams
     * @return {?}
     */
    fetch(withParams) {
        let /** @type {?} */ params = null;
        if (isPresent(withParams)) {
            params = new Map().set('offset', withParams.offset)
                .set('limit', withParams.limit)
                .set('orderby', withParams.sortKey)
                .set('selector', withParams.sortOrder);
        }
        this.dataProvider.fetch(params).subscribe((result) => {
            if (withParams.offset > 0) {
                let /** @type {?} */ incrData = [...this.dataProvider.dataChanges.getValue(), ...result];
                this.dataProvider.dataChanges.next(incrData);
            }
            else {
                this.dataProvider.dataChanges.next(result);
            }
        });
    }
    /**
     * Component uses this method to open up continuous stream to listen for any changes which
     * need to be reflected on the UI.
     *
     * Dont forget to unsubscribe when component is destroyed.
     * @template T
     * @return {?}
     */
    open() {
        return this.dataProvider.dataChanges.asObservable();
    }
    /**
     * @return {?}
     */
    close() {
        this.dataProvider = null;
        this.dataFinder = null;
    }
    /**
     * If CRUD is enabled we delegate calls to DataProvider that is responsible to tell the
     * dataProvider.dataChanges that are new data. If not enabled we have default implementation
     * which works with local array
     *
     * @param {?} object
     * @return {?}
     */
    insert(object) {
        if (this.dataProvider.canCRUD()) {
            this.dataProvider.insert(object);
        }
        else {
            let /** @type {?} */ copy = this.dataProvider.data().slice();
            copy.push(object);
            this.dataProvider.dataChanges.next(copy);
        }
    }
    /**
     * Please see {\@link insert} method
     *
     * @param {?} object
     * @return {?}
     */
    remove(object) {
        if (this.dataProvider.canCRUD()) {
            this.dataProvider.remove(object);
        }
        else {
            let /** @type {?} */ copy = this.dataProvider.data().slice();
            let /** @type {?} */ afterDelete = copy.filter((elem) => !equals(elem, object));
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
     * @param {?=} pattern
     * @return {?}
     */
    find(pattern) {
        if (isBlank(pattern) || pattern.length === 0) {
            // if we received empty string return orginal list
            this.fetch(this.state);
            return;
        }
        let /** @type {?} */ searchParam = pattern;
        if (this.dataFinder.accepts(this.dataProvider, QueryType.Predicate)) {
            searchParam = new Map().set('query', pattern).set('limit', DT2DataSource.MaxLimit);
            if (isPresent(this.state.sortKey)) {
                searchParam.set('orderby', this.state.sortKey);
            }
            if (isPresent(this.state.sortKey)) {
                searchParam.set('selector', this.state.sortOrder);
            }
        }
        else {
            assert(isString(pattern), 'Cannot pass non-string value to FullText Finder');
        }
        this.dataFinder.match(searchParam).subscribe((result) => {
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
     * @param {?} key
     * @param {?} sortOrder
     * @return {?}
     */
    sort(key, sortOrder) {
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
     * @param {?} offset
     * @param {?} sortField
     * @param {?} sOrder
     * @return {?}
     */
    updateState(offset, sortField, sOrder) {
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
     * @param {?} origPos
     * @param {?} newPos
     * @param {?} dropPos
     * @return {?}
     */
    reorderRows(origPos, newPos, dropPos) {
        let /** @type {?} */ array = this.dataProvider.data().slice();
        // take something from top and drag&drop under
        if (newPos > origPos && dropPos === DropPosition.Before && newPos < array.length) {
            newPos -= 1;
            // take something from bottom and drag&drop above
        }
        else if (newPos < origPos && dropPos === DropPosition.After && newPos >= 0) {
            newPos += 1;
        }
        array.splice(newPos, 0, ...array.splice(origPos, 1)[0]);
        this.dataProvider.dataChanges.next(array);
    }
}
DT2DataSource.MaxLimit = 100;
function DT2DataSource_tsickle_Closure_declarations() {
    /** @type {?} */
    DT2DataSource.MaxLimit;
    /**
     * Matching dataProviders and finders
     * @type {?}
     */
    DT2DataSource.prototype.dataProvider;
    /** @type {?} */
    DT2DataSource.prototype.dataFinder;
    /**
     * Keep track of current datatable state
     * @type {?}
     */
    DT2DataSource.prototype.state;
    /**
     * Defines object being rendered
     * @type {?}
     */
    DT2DataSource.prototype.entity;
    /** @type {?} */
    DT2DataSource.prototype.initialized;
    /** @type {?} */
    DT2DataSource.prototype.debugTime;
    /** @type {?} */
    DT2DataSource.prototype.dataProviders;
    /** @type {?} */
    DT2DataSource.prototype.finders;
}
/**
 * Entity definition to be used to initialize programmatically columns
 * @record
 */
export function EntityDef2() { }
function EntityDef2_tsickle_Closure_declarations() {
    /** @type {?} */
    EntityDef2.prototype.propertyKeys;
    /** @type {?} */
    EntityDef2.prototype.defaultFormatter;
    /** @type {?} */
    EntityDef2.prototype.displayStringForKey;
    /** @type {?} */
    EntityDef2.prototype.defaultAlignmentForKey;
}
/**
 * Keeps current datatable state the state which drivers the way while fetching the data as well
 * encapsulate set of properties that needs to be persistet in order to recover a state after e.g.
 * browser refresh
 *
 *
 * todo: Create methods to convert this state from and to JSON for easier serialization
 */
export class Datatable2State {
    constructor() {
        /**
         * Properties for paging and fetching
         */
        this.offset = 0;
        this.limit = 0;
        /**
         * Identifies default value that is used to render N number of rows in non-fullscreen
         * mode
         *
         */
        this.displayLimit = 0;
        /**
         * Sorting order of the sort field. DataTable support sorting for multiple column but we
         * dont persist it now. Maybe in the future
         */
        this.sortOrder = Datatable2State.Ascending;
        /**
         * If we are using global filter for current datatable then save it here
         */
        this.currentSearchQuery = '';
        this.outlineState = new Map();
        this.detailRowExpandState = new Map();
    }
    /**
     * @param {?=} offset
     * @param {?=} limit
     * @param {?=} displayLimit
     * @param {?=} sortField
     * @param {?=} sOrder
     * @param {?=} searchQuery
     * @param {?=} filter
     * @param {?=} outlineState
     * @param {?=} detailRowState
     * @return {?}
     */
    static create(offset = 0, limit = 15, displayLimit = 5, sortField = '', sOrder = 0, searchQuery, filter, outlineState = new Map(), detailRowState = new Map()) {
        let /** @type {?} */ s = new Datatable2State();
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
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJSON(data) {
        let /** @type {?} */ state = JSON.parse(data);
        let /** @type {?} */ ds = new Datatable2State();
        ds.offset = state.offset;
        ds.limit = state.limit;
        ds.displayLimit = state.displayLimit;
        ds.sortKey = state.sortKey;
        ds.sortOrder = state.sortOrder;
        ds.currentSearchQuery = state.currentSearchQuery;
        ds.outlineState = MapWrapper.createFromAnyMap(state.outlineState);
        ds.detailRowExpandState = MapWrapper.createFromAnyMap(state.detailRowExpandState);
        return ds;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static toJSON(data) {
        let /** @type {?} */ toConvert = {
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
Datatable2State.Ascending = 1;
Datatable2State.Descending = -1;
function Datatable2State_tsickle_Closure_declarations() {
    /** @type {?} */
    Datatable2State.Ascending;
    /** @type {?} */
    Datatable2State.Descending;
    /**
     * Properties for paging and fetching
     * @type {?}
     */
    Datatable2State.prototype.offset;
    /** @type {?} */
    Datatable2State.prototype.limit;
    /**
     * Identifies default value that is used to render N number of rows in non-fullscreen
     * mode
     *
     * @type {?}
     */
    Datatable2State.prototype.displayLimit;
    /**
     * Current sorting field
     * @type {?}
     */
    Datatable2State.prototype.sortKey;
    /**
     * Sorting order of the sort field. DataTable support sorting for multiple column but we
     * dont persist it now. Maybe in the future
     * @type {?}
     */
    Datatable2State.prototype.sortOrder;
    /**
     * If we are using global filter for current datatable then save it here
     * @type {?}
     */
    Datatable2State.prototype.currentSearchQuery;
    /**
     * Current if any preselected filter
     * @type {?}
     */
    Datatable2State.prototype.currentFilter;
    /**
     * Represent current selection depending on selection mode.
     *
     * Current selection used both for row selection and cell selection. Row selection is used when
     * SingleSelect and MultiSelect once we implement this.
     *
     * @type {?}
     */
    Datatable2State.prototype.selection;
    /**
     * When header selection is enabled it captures currently selected column
     * @type {?}
     */
    Datatable2State.prototype.headerSelection;
    /**
     *
     *  Holds current state of the outline tree if used
     *
     * @type {?}
     */
    Datatable2State.prototype.outlineState;
    /**
     *
     *  Holds current state of the detail rows if used
     *
     * @type {?}
     */
    Datatable2State.prototype.detailRowExpandState;
}
/**
 * This needs to go to DTDataSource to keep and manage the state of the detail row. The idea is
 * simple we have a map holding item reference as a key and boolean value indicating if the
 * detail row is visible
 *
 * Todo: move this out to DS
 */
export class DetailRowExpansionState {
    /**
     * @param {?} dt
     */
    constructor(dt) {
        this.dt = dt;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    itemToKey(item) {
        return isEntity(item) ? (/** @type {?} */ (item)).identity() : item;
    }
    /**
     * @return {?}
     */
    get detailExpansionEnabled() {
        return isPresent(this.expansionStates);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set detailExpansionEnabled(value) {
        if (value) {
            this.expansionStates = new Map();
        }
        else {
            this.expansionStates = null;
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    toggle(item) {
        let /** @type {?} */ key = this.itemToKey(item);
        if (!this.isExpanded(item)) {
            this.expansionStates.set(key, true);
        }
        else {
            this.expansionStates.delete(key);
        }
        this.dt.dataSource.state.detailRowExpandState = this.expansionStates;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isExpanded(item) {
        let /** @type {?} */ key = this.itemToKey(item);
        // handle special case where we collapse parent of parent while detail row is expanded
        if (this.dt.isOutline() && !this.dt.outlineState.isExpanded(key)) {
            this.expansionStates.delete(key);
            return false;
        }
        let /** @type {?} */ isOutlineExpanded = this.dt.isOutline() ? this.dt.outlineState.isExpanded(key) : true;
        return isPresent(key) && this.expansionStates.has(key);
    }
}
function DetailRowExpansionState_tsickle_Closure_declarations() {
    /** @type {?} */
    DetailRowExpansionState.prototype.expansionStates;
    /** @type {?} */
    DetailRowExpansionState.prototype.dt;
}
/**
 * @record
 */
export function DTStateSerializableHelper() { }
function DTStateSerializableHelper_tsickle_Closure_declarations() {
    /** @type {?} */
    DTStateSerializableHelper.prototype.offset;
    /** @type {?} */
    DTStateSerializableHelper.prototype.limit;
    /** @type {?} */
    DTStateSerializableHelper.prototype.displayLimit;
    /** @type {?} */
    DTStateSerializableHelper.prototype.sortKey;
    /** @type {?} */
    DTStateSerializableHelper.prototype.sortOrder;
    /** @type {?} */
    DTStateSerializableHelper.prototype.currentSearchQuery;
    /** @type {?|undefined} */
    DTStateSerializableHelper.prototype.currentFilter;
    /** @type {?} */
    DTStateSerializableHelper.prototype.outlineState;
    /** @type {?} */
    DTStateSerializableHelper.prototype.detailRowExpandState;
}
/**
 * @param {?} init
 * @return {?}
 */
export function isDTInitParams(init) {
    return isPresent(init.obj) || isPresent(init.queryType) || isPresent(init.entity);
}
/**
 * To make initialization easier we have this common format.
 * @record
 */
export function DTDSInitParams() { }
function DTDSInitParams_tsickle_Closure_declarations() {
    /**
     * Object definition for the data
     * @type {?|undefined}
     */
    DTDSInitParams.prototype.entity;
    /** @type {?|undefined} */
    DTDSInitParams.prototype.state;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvZGF0YXRhYmxlMi1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFDSCxNQUFNLEVBRU4sTUFBTSxFQUNOLE9BQU8sRUFDUCxRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixVQUFVLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFVBQVUsRUFBZSxNQUFNLDZCQUE2QixDQUFDO0FBRXJFLE9BQU8sRUFBMEIsU0FBUyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFHaEYsT0FBTyxFQUFjLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7OztBQWF6RCxNQUFNLG9CQUFxQixTQUFRLFVBQVU7Ozs7O0lBd0J6QyxZQUFtQixhQUE2QixFQUFTLE9BQXFCO1FBQzFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFEZixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFjOzJCQUpoRSxLQUFLO1FBT2YsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3pDOzs7OztJQUdELElBQUksQ0FBQyxHQUFHLElBQVc7UUFDZixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FB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LElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDckYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgYXNzZXJ0LFxuICAgIEVudGl0eSxcbiAgICBlcXVhbHMsXG4gICAgaXNCbGFuayxcbiAgICBpc0VudGl0eSxcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgTWFwV3JhcHBlclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RhdGFTb3VyY2UsIERTSW5pdFBhcmFtc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtc291cmNlJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0RhdGFGaW5kZXIsIERhdGFGaW5kZXJzLCBRdWVyeVR5cGV9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJzfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1wcm92aWRlcnMnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4vY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtBV0RhdGFUYWJsZSwgRHJvcFBvc2l0aW9ufSBmcm9tICcuL2F3LWRhdGF0YWJsZSc7XG5cblxuLyoqXG4gKiBDb25jcmV0ZSBEYXRhU291cmNlIGltcGxlbWVudGF0aW9uIGZvciBEYXRhdGFibGUgd2hpY2ggZGVmaW5lcyBzdGF0ZSBhbmQgY29sdW1uIGRlZmluaXRpb24gdGhhdFxuICogY2FuIHByb2dyYW1tYXRpY2FsbHkgbW9kaWZ5IHJlbmRlcmVkIGNvbHVtbnMgKGlmIHByb3ZpZGVkKSBhbmQgbWV0aG9kIGZvciBpbnNlcnRpbmcgYW5kXG4gKiBhbmQgZGVsZXRpbmcgcmVjb3JkcztcbiAqXG4gKiBBbGwgb3BlcmF0aW9ucyBkZWFsaW5nIHdpdGggZGF0YSB1c2UgT2JzZXJ2YWJsZTxUPiBhbmQgaW5zdGFudCgpIG1ldGhvZCB0byByZXRyaWV2ZSBjdXJyZW50XG4gKiBzdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIERUMkRhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgTWF4TGltaXQgPSAxMDA7XG5cbiAgICAvKipcbiAgICAgKiBNYXRjaGluZyBkYXRhUHJvdmlkZXJzIGFuZCBmaW5kZXJzXG4gICAgICovXG4gICAgZGF0YVByb3ZpZGVyOiBEYXRhUHJvdmlkZXI8YW55PjtcbiAgICBkYXRhRmluZGVyOiBEYXRhRmluZGVyO1xuXG4gICAgLyoqXG4gICAgICogS2VlcCB0cmFjayBvZiBjdXJyZW50IGRhdGF0YWJsZSBzdGF0ZVxuICAgICAqL1xuICAgIHN0YXRlOiBEYXRhdGFibGUyU3RhdGU7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIG9iamVjdCBiZWluZyByZW5kZXJlZFxuICAgICAqL1xuICAgIHByaXZhdGUgZW50aXR5OiBFbnRpdHlEZWYyO1xuXG5cbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgZGVidWdUaW1lOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YVByb3ZpZGVycz86IERhdGFQcm92aWRlcnMsIHB1YmxpYyBmaW5kZXJzPzogRGF0YUZpbmRlcnMpIHtcbiAgICAgICAgc3VwZXIoZGF0YVByb3ZpZGVycywgZmluZGVycyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IERhdGF0YWJsZTJTdGF0ZS5jcmVhdGUoKTtcblxuICAgICAgICB0aGlzLmRlYnVnVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cblxuXG4gICAgaW5pdCguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBpZiAoaXNCbGFuayhhcmdzKSB8fCBhcmdzLmxlbmd0aCAhPT0gMSAmJiAhaXNEVEluaXRQYXJhbXMoYXJnc1swXSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gaW5pdGlhbGl6ZSBEUyB3aXRoIChEU0Nob29zZXJJbml0UGFyYW1zKScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbml0OiBEVERTSW5pdFBhcmFtcyA9IGFyZ3NbMF07XG5cbiAgICAgICAgLy8gdXNlIGV4aXN0aW5nIG9yIGZpbmQgYmVzdCBtYXRjaCBmb3IgZGF0YVByb3ZpZGVyXG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gaXNQcmVzZW50KGluaXQuZGF0YVByb3ZpZGVyKSA/IGluaXQuZGF0YVByb3ZpZGVyXG4gICAgICAgICAgICA6IHRoaXMuZGF0YVByb3ZpZGVycy5maW5kKGluaXQub2JqKTtcblxuICAgICAgICAvLyB1c2UgZXhpc3Rpbmcgb3IgZmluZCBiZXN0IG1hdGNoIGZvciBkYXRhRmluZGVyXG4gICAgICAgIHRoaXMuZGF0YUZpbmRlciA9IGlzUHJlc2VudChpbml0LmRhdGFGaW5kZXIpID8gaW5pdC5kYXRhRmluZGVyXG4gICAgICAgICAgICA6IHRoaXMuZmluZGVycy5maW5kKHRoaXMuZGF0YVByb3ZpZGVyLCBpbml0LnF1ZXJ5VHlwZSk7XG5cbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLmRhdGFQcm92aWRlcikgJiYgaXNQcmVzZW50KHRoaXMuZGF0YUZpbmRlciksXG4gICAgICAgICAgICAnRGF0YVNvdXJjZSBpbmNvcnJlY3RseSBpbml0aWFsaXplZC4gKERhdGFQcm92aWRlciwgRGF0YUZpbmRlcikgbWlzc2luZy4gJyk7XG5cbiAgICAgICAgdGhpcy5kYXRhRmluZGVyLmxvb2t1cEtleSA9IGluaXQubG9va3VwS2V5O1xuICAgICAgICBpZiAoaXNCbGFuayhpbml0LnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBEYXRhdGFibGUyU3RhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBpbml0LnN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhc3luYyBmZXRjaCBkYXRhIHJlcXVlc3QgYW5kIHJlc3VsdCBpcyBnaXZlbiBiYWNrIHVzaW5nIGRhdGFQcm92aWRlci5kYXRhQ2hhbmdlc1xuICAgICAqXG4gICAgICovXG4gICAgZmV0Y2god2l0aFBhcmFtcz86IERhdGF0YWJsZTJTdGF0ZSk6IHZvaWQge1xuICAgICAgICBsZXQgcGFyYW1zID0gbnVsbDtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh3aXRoUGFyYW1zKSkge1xuICAgICAgICAgICAgcGFyYW1zID0gbmV3IE1hcCgpLnNldCgnb2Zmc2V0Jywgd2l0aFBhcmFtcy5vZmZzZXQpXG4gICAgICAgICAgICAgICAgLnNldCgnbGltaXQnLCB3aXRoUGFyYW1zLmxpbWl0KVxuICAgICAgICAgICAgICAgIC5zZXQoJ29yZGVyYnknLCB3aXRoUGFyYW1zLnNvcnRLZXkpXG4gICAgICAgICAgICAgICAgLnNldCgnc2VsZWN0b3InLCB3aXRoUGFyYW1zLnNvcnRPcmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5mZXRjaChwYXJhbXMpLnN1YnNjcmliZSgocmVzdWx0OiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpdGhQYXJhbXMub2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBpbmNyRGF0YSA9IFsuLi50aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5nZXRWYWx1ZSgpLCAuLi5yZXN1bHRdO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQoaW5jckRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29tcG9uZW50IHVzZXMgdGhpcyBtZXRob2QgdG8gb3BlbiB1cCBjb250aW51b3VzIHN0cmVhbSB0byBsaXN0ZW4gZm9yIGFueSBjaGFuZ2VzIHdoaWNoXG4gICAgICogbmVlZCB0byBiZSByZWZsZWN0ZWQgb24gdGhlIFVJLlxuICAgICAqXG4gICAgICogRG9udCBmb3JnZXQgdG8gdW5zdWJzY3JpYmUgd2hlbiBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICAgICAqL1xuICAgIG9wZW48VD4oKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFQcm92aWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuZGF0YUZpbmRlciA9IG51bGw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJZiBDUlVEIGlzIGVuYWJsZWQgd2UgZGVsZWdhdGUgY2FsbHMgdG8gRGF0YVByb3ZpZGVyIHRoYXQgaXMgcmVzcG9uc2libGUgdG8gdGVsbCB0aGVcbiAgICAgKiBkYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMgdGhhdCBhcmUgbmV3IGRhdGEuIElmIG5vdCBlbmFibGVkIHdlIGhhdmUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvblxuICAgICAqIHdoaWNoIHdvcmtzIHdpdGggbG9jYWwgYXJyYXlcbiAgICAgKlxuICAgICAqL1xuICAgIGluc2VydChvYmplY3Q6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kYXRhUHJvdmlkZXIuY2FuQ1JVRCgpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5pbnNlcnQob2JqZWN0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNvcHkgPSB0aGlzLmRhdGFQcm92aWRlci5kYXRhKCkuc2xpY2UoKTtcbiAgICAgICAgICAgIGNvcHkucHVzaChvYmplY3QpO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KGNvcHkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQbGVhc2Ugc2VlIHtAbGluayBpbnNlcnR9IG1ldGhvZFxuICAgICAqXG4gICAgICovXG4gICAgcmVtb3ZlKG9iamVjdDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFQcm92aWRlci5jYW5DUlVEKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLnJlbW92ZShvYmplY3QpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgY29weSA9IHRoaXMuZGF0YVByb3ZpZGVyLmRhdGEoKS5zbGljZSgpO1xuICAgICAgICAgICAgbGV0IGFmdGVyRGVsZXRlID0gY29weS5maWx0ZXIoKGVsZW06IGFueSkgPT4gIWVxdWFscyhlbGVtLCBvYmplY3QpKTtcblxuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dChhZnRlckRlbGV0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFByb3ZpZGVzIGFjY2VzcyB0byBEYXRhRmluZGVyIHdoaWNoIGNhbiBhY2NlcHQgZWl0aGVyIHBsYWluIHN0cmluZyBvciBNYXAuXG4gICAgICpcbiAgICAgKiBUbyBiZSBhYmxlIHRvIHByb3ZpZGUgY29ycmVjdCBpbnB1dCB3ZSBuZWVkIHRvIGFzayBEYXRhRmluZGVyIGlmIGl0IHN1cHBvcnRzIEZ1bGxUZXh0IGxpa2VcbiAgICAgKiB0eXBlIHF1ZXJ5IG9yIFByZWRpY2F0ZS4gSW4gY2FzZSBvZiBQcmVkaWNhdGUgd2UgYnVpbGQgdGhlIE1hcCB3aXRoIGRpZmZlcmVudCBrZXkvdmFsdWVcbiAgICAgKiBwYWlyc1xuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBmaW5kKHBhdHRlcm4/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQmxhbmsocGF0dGVybikgfHwgcGF0dGVybi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIHJlY2VpdmVkIGVtcHR5IHN0cmluZyByZXR1cm4gb3JnaW5hbCBsaXN0XG4gICAgICAgICAgICB0aGlzLmZldGNoKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlYXJjaFBhcmFtOiBhbnkgPSBwYXR0ZXJuO1xuICAgICAgICBpZiAodGhpcy5kYXRhRmluZGVyLmFjY2VwdHModGhpcy5kYXRhUHJvdmlkZXIsIFF1ZXJ5VHlwZS5QcmVkaWNhdGUpKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbSA9IG5ldyBNYXAoKS5zZXQoJ3F1ZXJ5JywgcGF0dGVybikuc2V0KCdsaW1pdCcsIERUMkRhdGFTb3VyY2UuTWF4TGltaXQpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc3RhdGUuc29ydEtleSkpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbS5zZXQoJ29yZGVyYnknLCB0aGlzLnN0YXRlLnNvcnRLZXkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc3RhdGUuc29ydEtleSkpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbS5zZXQoJ3NlbGVjdG9yJywgdGhpcy5zdGF0ZS5zb3J0T3JkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXNzZXJ0KGlzU3RyaW5nKHBhdHRlcm4pLCAnQ2Fubm90IHBhc3Mgbm9uLXN0cmluZyB2YWx1ZSB0byBGdWxsVGV4dCBGaW5kZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YUZpbmRlci5tYXRjaDxhbnk+KHNlYXJjaFBhcmFtKS5zdWJzY3JpYmUoKHJlc3VsdDogYW55W10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQocmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERhdGEgc291cmNlIGRlbGVnYXRlcyB0aGUgcmVzcG9uc2liaWxpdHkgdG8gdGhlIGdpdmVuIGRhdGEgcHJvdmlkZXIgd2hpY2ggbmVlZHMgdG8gaW1wbGVtZW50XG4gICAgICogc3BlY2lmaWMgc29ydGluZyBtZWNoYW5pc21cbiAgICAgKlxuICAgICAqIFRvZG86IEV4dGVuZCB0byBzb3J0IGJ5IG11bHRpcGxlIGNvbHVtbnNcbiAgICAgKlxuICAgICAqL1xuICAgIHNvcnQoa2V5OiBzdHJpbmcsIHNvcnRPcmRlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuZGF0YVByb3ZpZGVyLmRhdGEoKSkgfHwgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc29ydEtleSA9IGtleTtcbiAgICAgICAgdGhpcy5zdGF0ZS5zb3J0T3JkZXIgPSBzb3J0T3JkZXI7XG4gICAgICAgIHRoaXMuZmV0Y2godGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBQZXJzaXN0IGRiIHN0YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICB1cGRhdGVTdGF0ZShvZmZzZXQ6IG51bWJlciwgc29ydEZpZWxkOiBzdHJpbmcsIHNPcmRlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGUub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICB0aGlzLnN0YXRlLnNvcnRLZXkgPSBzb3J0RmllbGQ7XG4gICAgICAgIHRoaXMuc3RhdGUuc29ydE9yZGVyID0gc09yZGVyO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiByZXNodWZmbGVzIGN1cnJlbnQgYXJyYXkgYmFzZWQgb24gbmV3IHJvdyBEJkQgcmVzdWx0LlxuICAgICAqXG4gICAgICogU2luY2UgdGhlcmUgaXMgYSBkaWZmZXJlbmNlIGlmIHdlIG1vdmUgaXRlbSBmcm9tIGJvdHRvbSBvciBmcm9tIHRoZSB0b3AgYW5kIHRoZW4gYWNjb3JkaW5nbHlcbiAgICAgKiBoaWdobGlnaHRpbmcgYSBzcGFjZSBiZXR3ZWVuIHJvd3MuIFdlIG5lZWQgdG8gcmVmbGVjdCB0aGlzIGluIGhlcmUgYXMgd2VsbC5cbiAgICAgKlxuICAgICAqIFVzZUNhc2UgMTpcbiAgICAgKlxuICAgICAqIDEuIFlvdSBjYW4gZ3JhYiBpdGVtIHdpdGggaW5kZXggMCBhbmQgbW92ZSBpdCBkb3duIHNvIHRoYXQgeW91IGNhbiBzZWUgYSBkcm9wcGluZyBsaW5lXG4gICAgICogYmV0d2VlbiByb3cgd2l0aCBpbmRleCAyIC0gM1xuICAgICAqXG4gICAgICogMi4gSW4gdGhpcyBjYXNlIHNwbGljZSgpIHN0YXJ0cyBmcm9tIHBvc2l0aW9uIDIgYW5kIGluc2VydCBhbGwgZWxlbWVudHMgYWZ0ZXIgMlxuICAgICAqICAgICAgc3BsaWNlKHN0YXJ0OiBudW1iZXIsIGRlbGV0ZUNvdW50OiBudW1iZXIsIC4uLml0ZW1zOiBUW10pOiBUW107XG4gICAgICpcbiAgICAgKiAzLiBubyBuZWVkIHRvIHVwZGF0ZSBuZXdQb3NcbiAgICAgKlxuICAgICAqIFVzZUNhc2UgMjpcbiAgICAgKlxuICAgICAqIDEuIFlvdSBjYW4gZ3JhYiBpdGVtIHdpdGggaW5kZXggMCBhbmQgbW92ZSBhbGwgdGhlIHdheSBkb3duIG9mIHRoZSBEVCBhbmQgbm93IG1vdmUgdGhlXG4gICAgICogcm93IHRvd2FyZCBUT1AgYW5kIHNwYWNlIGJldHdlZW4gcm93cyB3aXRoIGluZGV4IDIgLSAzIGlzIGhpZ2hsaWdodGVkIGFnYWluLlxuICAgICAqXG4gICAgICogMi4gSGVyZSBpcyB0aGUgZGlmZmVyZW5jZSwgYmVmb3JlIHdlIGhpZ2hsaWdodGVkIHJvdyAjMiB3aXRoIGxpbmUgYXQgdGhlIGJvdHRvbSwgbm93XG4gICAgICogaXQgc2VlbXMgdGhlIHNhbWUgYnV0IGl0cyBoaWdobGlnaHRlZCByb3cgIzMgd2l0aCBsaW5lIGF0IHRoZSBUT1AuXG4gICAgICpcbiAgICAgKiAqIFRoaXMgaXMgdGhlIHJlYXNvbiB3aGV5IHdlIG5lZWQgdG8gZG8gbmV3UG9zIC09IDEgb3IgbmV3UG9zICs9IDE7IGRlcGVuZGluZyBvdXIgZGlyZWN0aW9uXG4gICAgICogd2hlcmUgd2hlcmUgdGhlIGxpbmUgYmV0d2VlbiByb3dzIGlzIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKlxuICAgICAqIFdlIGRvbid0IG5lZWQgYW55IGNvbXBsaWNhdGVkIGNhbGN1bGF0aW9uIHRyeWluZyB0byBmaW5kIG91dCBpZiB3ZSBhcmUgb24gb25lIGhhbGYgb2YgdGhlIHJvd1xuICAgICAqIG9yIHNlY29uZCBoYWxmIGFuZCBiYXNlZCBvbiB0aGlzIHRyeSB0byBhcHBseSBjZXJ0YWluIHN0eWxlLiBUaGlzIHdvdWxkIG5vdCBnaXZlIHNvIG11Y2hcbiAgICAgKiBzcGFjZSBpZiB3ZSB3YW50IGRyb3Agcm93IGludG8gdGhlIHJvdy4gQW5kIHRoZSBjYWxjdWxhdGlvbiB3aXRoIGNvb3JkaW5hdGVzIHdvdWRsIGJlIHRvb1xuICAgICAqIGNvbXBsaWNhdGVkLlxuICAgICAqXG4gICAgICogV2Ugc2ltcGx5IHJlbWVtYmVyIHRoZSBkaXJlY3Rpb24gd2UgYXJlIG1vdmluZyBhbmQgYmFzZWQgb24gdGhpcyB3ZSBhcHBseSBzdHlsZSB0b1xuICAgICAqIHRvIGNyZWF0ZSBhIGxpbmUgYXQgdGhlIFRPUCBpZiB3ZSBhcmUgZ29pbmcgdXB3YXJkcyBvciBib3R0b20gb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICByZW9yZGVyUm93cyhvcmlnUG9zOiBudW1iZXIsIG5ld1BvczogbnVtYmVyLCBkcm9wUG9zOiBEcm9wUG9zaXRpb24pOiB2b2lkIHtcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5kYXRhUHJvdmlkZXIuZGF0YSgpLnNsaWNlKCk7XG5cbiAgICAgICAgLy8gdGFrZSBzb21ldGhpbmcgZnJvbSB0b3AgYW5kIGRyYWcmZHJvcCB1bmRlclxuICAgICAgICBpZiAobmV3UG9zID4gb3JpZ1BvcyAmJiBkcm9wUG9zID09PSBEcm9wUG9zaXRpb24uQmVmb3JlICYmIG5ld1BvcyA8IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgbmV3UG9zIC09IDE7XG5cbiAgICAgICAgICAgIC8vIHRha2Ugc29tZXRoaW5nIGZyb20gYm90dG9tIGFuZCBkcmFnJmRyb3AgYWJvdmVcbiAgICAgICAgfSBlbHNlIGlmIChuZXdQb3MgPCBvcmlnUG9zICYmIGRyb3BQb3MgPT09IERyb3BQb3NpdGlvbi5BZnRlciAmJiBuZXdQb3MgPj0gMCkge1xuICAgICAgICAgICAgbmV3UG9zICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBhcnJheS5zcGxpY2UobmV3UG9zLCAwLCAuLi5hcnJheS5zcGxpY2Uob3JpZ1BvcywgMSlbMF0pO1xuICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KGFycmF5KTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBFbnRpdHkgZGVmaW5pdGlvbiB0byBiZSB1c2VkIHRvIGluaXRpYWxpemUgcHJvZ3JhbW1hdGljYWxseSBjb2x1bW5zXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5RGVmMiB7XG4gICAgcHJvcGVydHlLZXlzOiBzdHJpbmdbXTtcblxuICAgIGRlZmF1bHRGb3JtYXR0ZXI6IChrZXk6IGFueSkgPT4gc3RyaW5nO1xuXG4gICAgZGlzcGxheVN0cmluZ0ZvcktleTogKGtleTogc3RyaW5nKSA9PiBzdHJpbmc7XG5cbiAgICBkZWZhdWx0QWxpZ25tZW50Rm9yS2V5OiAoa2V5OiBzdHJpbmcpID0+IHN0cmluZztcbn1cblxuLyoqXG4gKiBLZWVwcyBjdXJyZW50IGRhdGF0YWJsZSBzdGF0ZSB0aGUgc3RhdGUgd2hpY2ggZHJpdmVycyB0aGUgd2F5IHdoaWxlIGZldGNoaW5nIHRoZSBkYXRhIGFzIHdlbGxcbiAqIGVuY2Fwc3VsYXRlIHNldCBvZiBwcm9wZXJ0aWVzIHRoYXQgbmVlZHMgdG8gYmUgcGVyc2lzdGV0IGluIG9yZGVyIHRvIHJlY292ZXIgYSBzdGF0ZSBhZnRlciBlLmcuXG4gKiBicm93c2VyIHJlZnJlc2hcbiAqXG4gKlxuICogdG9kbzogQ3JlYXRlIG1ldGhvZHMgdG8gY29udmVydCB0aGlzIHN0YXRlIGZyb20gYW5kIHRvIEpTT04gZm9yIGVhc2llciBzZXJpYWxpemF0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhdGFibGUyU3RhdGUge1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQXNjZW5kaW5nID0gMTtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlc2NlbmRpbmcgPSAtMTtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgZm9yIHBhZ2luZyBhbmQgZmV0Y2hpbmdcbiAgICAgKi9cbiAgICBvZmZzZXQ6IG51bWJlciA9IDA7XG4gICAgbGltaXQ6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIGRlZmF1bHQgdmFsdWUgdGhhdCBpcyB1c2VkIHRvIHJlbmRlciBOIG51bWJlciBvZiByb3dzIGluIG5vbi1mdWxsc2NyZWVuXG4gICAgICogbW9kZVxuICAgICAqXG4gICAgICovXG4gICAgZGlzcGxheUxpbWl0OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBzb3J0aW5nIGZpZWxkXG4gICAgICovXG4gICAgc29ydEtleTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU29ydGluZyBvcmRlciBvZiB0aGUgc29ydCBmaWVsZC4gRGF0YVRhYmxlIHN1cHBvcnQgc29ydGluZyBmb3IgbXVsdGlwbGUgY29sdW1uIGJ1dCB3ZVxuICAgICAqIGRvbnQgcGVyc2lzdCBpdCBub3cuIE1heWJlIGluIHRoZSBmdXR1cmVcbiAgICAgKi9cbiAgICBzb3J0T3JkZXI6IG51bWJlciA9IERhdGF0YWJsZTJTdGF0ZS5Bc2NlbmRpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJZiB3ZSBhcmUgdXNpbmcgZ2xvYmFsIGZpbHRlciBmb3IgY3VycmVudCBkYXRhdGFibGUgdGhlbiBzYXZlIGl0IGhlcmVcbiAgICAgKi9cbiAgICBjdXJyZW50U2VhcmNoUXVlcnk6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBpZiBhbnkgcHJlc2VsZWN0ZWQgZmlsdGVyXG4gICAgICovXG4gICAgY3VycmVudEZpbHRlcjogYW55O1xuXG4gICAgLyoqXG4gICAgICogUmVwcmVzZW50IGN1cnJlbnQgc2VsZWN0aW9uIGRlcGVuZGluZyBvbiBzZWxlY3Rpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIEN1cnJlbnQgc2VsZWN0aW9uIHVzZWQgYm90aCBmb3Igcm93IHNlbGVjdGlvbiBhbmQgY2VsbCBzZWxlY3Rpb24uIFJvdyBzZWxlY3Rpb24gaXMgdXNlZCB3aGVuXG4gICAgICogU2luZ2xlU2VsZWN0IGFuZCBNdWx0aVNlbGVjdCBvbmNlIHdlIGltcGxlbWVudCB0aGlzLlxuICAgICAqXG4gICAgICovXG4gICAgc2VsZWN0aW9uOiBhbnk7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gaGVhZGVyIHNlbGVjdGlvbiBpcyBlbmFibGVkIGl0IGNhcHR1cmVzIGN1cnJlbnRseSBzZWxlY3RlZCBjb2x1bW5cbiAgICAgKi9cbiAgICBoZWFkZXJTZWxlY3Rpb246IERUQ29sdW1uMkNvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgSG9sZHMgY3VycmVudCBzdGF0ZSBvZiB0aGUgb3V0bGluZSB0cmVlIGlmIHVzZWRcbiAgICAgKlxuICAgICAqL1xuICAgIG91dGxpbmVTdGF0ZT86IE1hcDxhbnksIGJvb2xlYW4+O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgSG9sZHMgY3VycmVudCBzdGF0ZSBvZiB0aGUgZGV0YWlsIHJvd3MgaWYgdXNlZFxuICAgICAqXG4gICAgICovXG4gICAgZGV0YWlsUm93RXhwYW5kU3RhdGU/OiBNYXA8YW55LCBib29sZWFuPjtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3V0bGluZVN0YXRlID0gbmV3IE1hcDxhbnksIGJvb2xlYW4+KCk7XG4gICAgICAgIHRoaXMuZGV0YWlsUm93RXhwYW5kU3RhdGUgPSBuZXcgTWFwPGFueSwgYm9vbGVhbj4oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlKG9mZnNldDogbnVtYmVyID0gMCwgbGltaXQ6IG51bWJlciA9IDE1LCBkaXNwbGF5TGltaXQ6IG51bWJlciA9IDUsXG4gICAgICAgICAgICAgICAgICBzb3J0RmllbGQ6IHN0cmluZyA9ICcnLCBzT3JkZXI6IG51bWJlciA9IDAsIHNlYXJjaFF1ZXJ5Pzogc3RyaW5nLCBmaWx0ZXI/OiBhbnksXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lU3RhdGU6IE1hcDxhbnksIGJvb2xlYW4+ID0gbmV3IE1hcDxhbnksIGJvb2xlYW4+KCksXG4gICAgICAgICAgICAgICAgICBkZXRhaWxSb3dTdGF0ZTogTWFwPGFueSwgYm9vbGVhbj4gPSBuZXcgTWFwPGFueSwgYm9vbGVhbj4oKSk6IERhdGF0YWJsZTJTdGF0ZSB7XG4gICAgICAgIGxldCBzID0gbmV3IERhdGF0YWJsZTJTdGF0ZSgpO1xuICAgICAgICBzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgcy5saW1pdCA9IGxpbWl0O1xuICAgICAgICBzLmRpc3BsYXlMaW1pdCA9IGRpc3BsYXlMaW1pdDtcbiAgICAgICAgcy5zb3J0S2V5ID0gc29ydEZpZWxkO1xuICAgICAgICBzLnNvcnRPcmRlciA9IHNPcmRlcjtcbiAgICAgICAgcy5jdXJyZW50U2VhcmNoUXVlcnkgPSBzZWFyY2hRdWVyeTtcbiAgICAgICAgcy5jdXJyZW50RmlsdGVyID0gZmlsdGVyO1xuICAgICAgICBzLm91dGxpbmVTdGF0ZSA9IG91dGxpbmVTdGF0ZTtcbiAgICAgICAgcy5kZXRhaWxSb3dFeHBhbmRTdGF0ZSA9IGRldGFpbFJvd1N0YXRlO1xuXG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tSlNPTihkYXRhOiBzdHJpbmcpOiBEYXRhdGFibGUyU3RhdGUge1xuICAgICAgICBsZXQgc3RhdGU6IERUU3RhdGVTZXJpYWxpemFibGVIZWxwZXIgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICBsZXQgZHMgPSBuZXcgRGF0YXRhYmxlMlN0YXRlKCk7XG4gICAgICAgIGRzLm9mZnNldCA9IHN0YXRlLm9mZnNldDtcbiAgICAgICAgZHMubGltaXQgPSBzdGF0ZS5saW1pdDtcbiAgICAgICAgZHMuZGlzcGxheUxpbWl0ID0gc3RhdGUuZGlzcGxheUxpbWl0O1xuICAgICAgICBkcy5zb3J0S2V5ID0gc3RhdGUuc29ydEtleTtcbiAgICAgICAgZHMuc29ydE9yZGVyID0gc3RhdGUuc29ydE9yZGVyO1xuICAgICAgICBkcy5jdXJyZW50U2VhcmNoUXVlcnkgPSBzdGF0ZS5jdXJyZW50U2VhcmNoUXVlcnk7XG4gICAgICAgIGRzLm91dGxpbmVTdGF0ZSA9IE1hcFdyYXBwZXIuY3JlYXRlRnJvbUFueU1hcDxib29sZWFuPihzdGF0ZS5vdXRsaW5lU3RhdGUpO1xuICAgICAgICBkcy5kZXRhaWxSb3dFeHBhbmRTdGF0ZSA9IE1hcFdyYXBwZXIuY3JlYXRlRnJvbUFueU1hcDxib29sZWFuPihzdGF0ZS5kZXRhaWxSb3dFeHBhbmRTdGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGRzO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHRvSlNPTihkYXRhOiBEYXRhdGFibGUyU3RhdGUpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdG9Db252ZXJ0OiBEVFN0YXRlU2VyaWFsaXphYmxlSGVscGVyID0ge1xuICAgICAgICAgICAgb2Zmc2V0OiBkYXRhLm9mZnNldCxcbiAgICAgICAgICAgIGxpbWl0OiBkYXRhLmxpbWl0LFxuICAgICAgICAgICAgZGlzcGxheUxpbWl0OiBkYXRhLmRpc3BsYXlMaW1pdCxcbiAgICAgICAgICAgIHNvcnRLZXk6IGRhdGEuc29ydEtleSxcbiAgICAgICAgICAgIHNvcnRPcmRlcjogZGF0YS5zb3J0T3JkZXIsXG4gICAgICAgICAgICBjdXJyZW50U2VhcmNoUXVlcnk6IGRhdGEuY3VycmVudFNlYXJjaFF1ZXJ5LFxuICAgICAgICAgICAgb3V0bGluZVN0YXRlOiBNYXBXcmFwcGVyLnRvQW55TWFwKGRhdGEub3V0bGluZVN0YXRlKSxcbiAgICAgICAgICAgIGRldGFpbFJvd0V4cGFuZFN0YXRlOiBNYXBXcmFwcGVyLnRvQW55TWFwKGRhdGEuZGV0YWlsUm93RXhwYW5kU3RhdGUpXG5cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRvQ29udmVydCk7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBUaGlzIG5lZWRzIHRvIGdvIHRvIERURGF0YVNvdXJjZSB0byBrZWVwIGFuZCBtYW5hZ2UgdGhlIHN0YXRlIG9mIHRoZSBkZXRhaWwgcm93LiBUaGUgaWRlYSBpc1xuICogc2ltcGxlIHdlIGhhdmUgYSBtYXAgaG9sZGluZyBpdGVtIHJlZmVyZW5jZSBhcyBhIGtleSBhbmQgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIGlmIHRoZVxuICogZGV0YWlsIHJvdyBpcyB2aXNpYmxlXG4gKlxuICogVG9kbzogbW92ZSB0aGlzIG91dCB0byBEU1xuICovXG5leHBvcnQgY2xhc3MgRGV0YWlsUm93RXhwYW5zaW9uU3RhdGUge1xuXG4gICAgZXhwYW5zaW9uU3RhdGVzOiBNYXA8YW55LCBib29sZWFuPjtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkdDogQVdEYXRhVGFibGUpIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIGl0ZW1Ub0tleShpdGVtOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaXNFbnRpdHkoaXRlbSkgPyAoPEVudGl0eT5pdGVtKS5pZGVudGl0eSgpIDogaXRlbTtcbiAgICB9XG5cbiAgICBnZXQgZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmV4cGFuc2lvblN0YXRlcyk7XG4gICAgfVxuXG4gICAgc2V0IGRldGFpbEV4cGFuc2lvbkVuYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzID0gbmV3IE1hcDxhbnksIGJvb2xlYW4+KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLml0ZW1Ub0tleShpdGVtKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzRXhwYW5kZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzLnNldChrZXksIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2Uuc3RhdGUuZGV0YWlsUm93RXhwYW5kU3RhdGUgPSB0aGlzLmV4cGFuc2lvblN0YXRlcztcbiAgICB9XG5cbiAgICBpc0V4cGFuZGVkKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5pdGVtVG9LZXkoaXRlbSk7XG4gICAgICAgIC8vIGhhbmRsZSBzcGVjaWFsIGNhc2Ugd2hlcmUgd2UgY29sbGFwc2UgcGFyZW50IG9mIHBhcmVudCB3aGlsZSBkZXRhaWwgcm93IGlzIGV4cGFuZGVkXG4gICAgICAgIGlmICh0aGlzLmR0LmlzT3V0bGluZSgpICYmICF0aGlzLmR0Lm91dGxpbmVTdGF0ZS5pc0V4cGFuZGVkKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGlzT3V0bGluZUV4cGFuZGVkID0gdGhpcy5kdC5pc091dGxpbmUoKSA/IHRoaXMuZHQub3V0bGluZVN0YXRlLmlzRXhwYW5kZWQoa2V5KSA6IHRydWU7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoa2V5KSAmJiB0aGlzLmV4cGFuc2lvblN0YXRlcy5oYXMoa2V5KTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRFRTdGF0ZVNlcmlhbGl6YWJsZUhlbHBlciB7XG4gICAgb2Zmc2V0OiBudW1iZXI7XG4gICAgbGltaXQ6IG51bWJlcjtcbiAgICBkaXNwbGF5TGltaXQ6IG51bWJlcjtcbiAgICBzb3J0S2V5OiBzdHJpbmc7XG4gICAgc29ydE9yZGVyOiBudW1iZXI7XG4gICAgY3VycmVudFNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG4gICAgY3VycmVudEZpbHRlcj86IGFueTtcbiAgICBvdXRsaW5lU3RhdGU6IGFueTtcbiAgICBkZXRhaWxSb3dFeHBhbmRTdGF0ZTogYW55O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RUSW5pdFBhcmFtcyhpbml0OiBEVERTSW5pdFBhcmFtcyk6IGluaXQgaXMgRFREU0luaXRQYXJhbXMge1xuICAgIHJldHVybiBpc1ByZXNlbnQoaW5pdC5vYmopIHx8IGlzUHJlc2VudChpbml0LnF1ZXJ5VHlwZSkgfHwgaXNQcmVzZW50KGluaXQuZW50aXR5KTtcbn1cblxuLyoqXG4gKiBUbyBtYWtlIGluaXRpYWxpemF0aW9uIGVhc2llciB3ZSBoYXZlIHRoaXMgY29tbW9uIGZvcm1hdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEVERTSW5pdFBhcmFtcyBleHRlbmRzIERTSW5pdFBhcmFtcyB7XG5cbiAgICAvKipcbiAgICAgKiBPYmplY3QgZGVmaW5pdGlvbiBmb3IgdGhlIGRhdGFcbiAgICAgKi9cbiAgICBlbnRpdHk/OiBFbnRpdHlEZWYyO1xuXG4gICAgc3RhdGU/OiBEYXRhdGFibGUyU3RhdGU7XG59XG4iXX0=