/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { assert, isBlank, isEntity, isPresent, isString, ListWrapper, MapWrapper } from '@aribaui/core';
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
            this.dataProvider.offScreenData.push(object);
            this.dataProvider.dataChanges.next(this.dataProvider.offScreenData);
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
            ListWrapper.removeIfExist(this.dataProvider.offScreenData, object);
            this.dataProvider.dataChanges.next(this.dataProvider.offScreenData);
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
    /** @type {?} */
    DT2DataSource.prototype.initialized;
    /** @type {?} */
    DT2DataSource.prototype.debugTime;
    /**
     * Defines object being rendered
     * @type {?}
     */
    DT2DataSource.prototype.entity;
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
    /**
     * @param {?} item
     * @return {?}
     */
    itemToKey(item) {
        return isEntity(item) ? (/** @type {?} */ (item)).identity() : item;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvZGF0YXRhYmxlMi1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFDSCxNQUFNLEVBRU4sT0FBTyxFQUNQLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLFdBQVcsRUFDWCxVQUFVLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFVBQVUsRUFBZSxNQUFNLDZCQUE2QixDQUFDO0FBRXJFLE9BQU8sRUFBMEIsU0FBUyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFHaEYsT0FBTyxFQUFjLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7OztBQWF6RCxNQUFNLG9CQUFxQixTQUFRLFVBQVU7Ozs7O0lBcUJ6QyxZQUFtQixhQUE2QixFQUFTLE9BQXFCO1FBRTFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFGZixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFjOzJCQVBoRSxLQUFLO1FBV2YsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3pDOzs7OztJQUdELElBQUksQ0FBQyxHQUFHLElBQVc7UUFFZixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FB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KlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBhc3NlcnQsXG4gICAgRW50aXR5LFxuICAgIGlzQmxhbmssXG4gICAgaXNFbnRpdHksXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIExpc3RXcmFwcGVyLFxuICAgIE1hcFdyYXBwZXJcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEYXRhU291cmNlLCBEU0luaXRQYXJhbXN9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0RhdGFQcm92aWRlcn0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGF0eXBlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtEYXRhRmluZGVyLCBEYXRhRmluZGVycywgUXVlcnlUeXBlfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1maW5kZXJzJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi9kdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7QVdEYXRhVGFibGUsIERyb3BQb3NpdGlvbn0gZnJvbSAnLi9hdy1kYXRhdGFibGUnO1xuXG5cbi8qKlxuICogQ29uY3JldGUgRGF0YVNvdXJjZSBpbXBsZW1lbnRhdGlvbiBmb3IgRGF0YXRhYmxlIHdoaWNoIGRlZmluZXMgc3RhdGUgYW5kIGNvbHVtbiBkZWZpbml0aW9uIHRoYXRcbiAqIGNhbiBwcm9ncmFtbWF0aWNhbGx5IG1vZGlmeSByZW5kZXJlZCBjb2x1bW5zIChpZiBwcm92aWRlZCkgYW5kIG1ldGhvZCBmb3IgaW5zZXJ0aW5nIGFuZFxuICogYW5kIGRlbGV0aW5nIHJlY29yZHM7XG4gKlxuICogQWxsIG9wZXJhdGlvbnMgZGVhbGluZyB3aXRoIGRhdGEgdXNlIE9ic2VydmFibGU8VD4gYW5kIGluc3RhbnQoKSBtZXRob2QgdG8gcmV0cmlldmUgY3VycmVudFxuICogc3RhdGUgaXMgbm90IGltcGxlbWVudGVkLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBEVDJEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZVxue1xuICAgIHN0YXRpYyByZWFkb25seSBNYXhMaW1pdCA9IDEwMDtcblxuICAgIC8qKlxuICAgICAqIE1hdGNoaW5nIGRhdGFQcm92aWRlcnMgYW5kIGZpbmRlcnNcbiAgICAgKi9cbiAgICBkYXRhUHJvdmlkZXI6IERhdGFQcm92aWRlcjxhbnk+O1xuICAgIGRhdGFGaW5kZXI6IERhdGFGaW5kZXI7XG5cbiAgICAvKipcbiAgICAgKiBLZWVwIHRyYWNrIG9mIGN1cnJlbnQgZGF0YXRhYmxlIHN0YXRlXG4gICAgICovXG4gICAgc3RhdGU6IERhdGF0YWJsZTJTdGF0ZTtcbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIGRlYnVnVGltZTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgb2JqZWN0IGJlaW5nIHJlbmRlcmVkXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbnRpdHk6IEVudGl0eURlZjI7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YVByb3ZpZGVycz86IERhdGFQcm92aWRlcnMsIHB1YmxpYyBmaW5kZXJzPzogRGF0YUZpbmRlcnMpXG4gICAge1xuICAgICAgICBzdXBlcihkYXRhUHJvdmlkZXJzLCBmaW5kZXJzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gRGF0YXRhYmxlMlN0YXRlLmNyZWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuZGVidWdUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxuXG5cbiAgICBpbml0KC4uLmFyZ3M6IGFueVtdKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoYXJncykgfHwgYXJncy5sZW5ndGggIT09IDEgJiYgIWlzRFRJbml0UGFyYW1zKGFyZ3NbMF0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIGluaXRpYWxpemUgRFMgd2l0aCAoRFNDaG9vc2VySW5pdFBhcmFtcyknKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5pdDogRFREU0luaXRQYXJhbXMgPSBhcmdzWzBdO1xuXG4gICAgICAgIC8vIHVzZSBleGlzdGluZyBvciBmaW5kIGJlc3QgbWF0Y2ggZm9yIGRhdGFQcm92aWRlclxuICAgICAgICB0aGlzLmRhdGFQcm92aWRlciA9IGlzUHJlc2VudChpbml0LmRhdGFQcm92aWRlcikgPyBpbml0LmRhdGFQcm92aWRlclxuICAgICAgICAgICAgOiB0aGlzLmRhdGFQcm92aWRlcnMuZmluZChpbml0Lm9iaik7XG5cbiAgICAgICAgLy8gdXNlIGV4aXN0aW5nIG9yIGZpbmQgYmVzdCBtYXRjaCBmb3IgZGF0YUZpbmRlclxuICAgICAgICB0aGlzLmRhdGFGaW5kZXIgPSBpc1ByZXNlbnQoaW5pdC5kYXRhRmluZGVyKSA/IGluaXQuZGF0YUZpbmRlclxuICAgICAgICAgICAgOiB0aGlzLmZpbmRlcnMuZmluZCh0aGlzLmRhdGFQcm92aWRlciwgaW5pdC5xdWVyeVR5cGUpO1xuXG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5kYXRhUHJvdmlkZXIpICYmIGlzUHJlc2VudCh0aGlzLmRhdGFGaW5kZXIpLFxuICAgICAgICAgICAgJ0RhdGFTb3VyY2UgaW5jb3JyZWN0bHkgaW5pdGlhbGl6ZWQuIChEYXRhUHJvdmlkZXIsIERhdGFGaW5kZXIpIG1pc3NpbmcuICcpO1xuXG4gICAgICAgIHRoaXMuZGF0YUZpbmRlci5sb29rdXBLZXkgPSBpbml0Lmxvb2t1cEtleTtcbiAgICAgICAgaWYgKGlzQmxhbmsoaW5pdC5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgRGF0YXRhYmxlMlN0YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gaW5pdC5zdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYXN5bmMgZmV0Y2ggZGF0YSByZXF1ZXN0IGFuZCByZXN1bHQgaXMgZ2l2ZW4gYmFjayB1c2luZyBkYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGZldGNoKHdpdGhQYXJhbXM/OiBEYXRhdGFibGUyU3RhdGUpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgcGFyYW1zID0gbnVsbDtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh3aXRoUGFyYW1zKSkge1xuICAgICAgICAgICAgcGFyYW1zID0gbmV3IE1hcCgpLnNldCgnb2Zmc2V0Jywgd2l0aFBhcmFtcy5vZmZzZXQpXG4gICAgICAgICAgICAgICAgLnNldCgnbGltaXQnLCB3aXRoUGFyYW1zLmxpbWl0KVxuICAgICAgICAgICAgICAgIC5zZXQoJ29yZGVyYnknLCB3aXRoUGFyYW1zLnNvcnRLZXkpXG4gICAgICAgICAgICAgICAgLnNldCgnc2VsZWN0b3InLCB3aXRoUGFyYW1zLnNvcnRPcmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5mZXRjaChwYXJhbXMpLnN1YnNjcmliZSgocmVzdWx0OiBhbnlbXSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHdpdGhQYXJhbXMub2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBpbmNyRGF0YSA9IFsuLi50aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5nZXRWYWx1ZSgpLCAuLi5yZXN1bHRdO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQoaW5jckRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29tcG9uZW50IHVzZXMgdGhpcyBtZXRob2QgdG8gb3BlbiB1cCBjb250aW51b3VzIHN0cmVhbSB0byBsaXN0ZW4gZm9yIGFueSBjaGFuZ2VzIHdoaWNoXG4gICAgICogbmVlZCB0byBiZSByZWZsZWN0ZWQgb24gdGhlIFVJLlxuICAgICAqXG4gICAgICogRG9udCBmb3JnZXQgdG8gdW5zdWJzY3JpYmUgd2hlbiBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICAgICAqL1xuICAgIG9wZW48VD4oKTogT2JzZXJ2YWJsZTxUW10+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgY2xvc2UoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmRhdGFGaW5kZXIgPSBudWxsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSWYgQ1JVRCBpcyBlbmFibGVkIHdlIGRlbGVnYXRlIGNhbGxzIHRvIERhdGFQcm92aWRlciB0aGF0IGlzIHJlc3BvbnNpYmxlIHRvIHRlbGwgdGhlXG4gICAgICogZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzIHRoYXQgYXJlIG5ldyBkYXRhLiBJZiBub3QgZW5hYmxlZCB3ZSBoYXZlIGRlZmF1bHQgaW1wbGVtZW50YXRpb25cbiAgICAgKiB3aGljaCB3b3JrcyB3aXRoIGxvY2FsIGFycmF5XG4gICAgICpcbiAgICAgKi9cbiAgICBpbnNlcnQob2JqZWN0OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5kYXRhUHJvdmlkZXIuY2FuQ1JVRCgpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5pbnNlcnQob2JqZWN0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIub2ZmU2NyZWVuRGF0YS5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KHRoaXMuZGF0YVByb3ZpZGVyLm9mZlNjcmVlbkRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQbGVhc2Ugc2VlIHtAbGluayBpbnNlcnR9IG1ldGhvZFxuICAgICAqXG4gICAgICovXG4gICAgcmVtb3ZlKG9iamVjdDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVByb3ZpZGVyLmNhbkNSVUQoKSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIucmVtb3ZlKG9iamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZUlmRXhpc3QodGhpcy5kYXRhUHJvdmlkZXIub2ZmU2NyZWVuRGF0YSwgb2JqZWN0KTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQodGhpcy5kYXRhUHJvdmlkZXIub2ZmU2NyZWVuRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFByb3ZpZGVzIGFjY2VzcyB0byBEYXRhRmluZGVyIHdoaWNoIGNhbiBhY2NlcHQgZWl0aGVyIHBsYWluIHN0cmluZyBvciBNYXAuXG4gICAgICpcbiAgICAgKiBUbyBiZSBhYmxlIHRvIHByb3ZpZGUgY29ycmVjdCBpbnB1dCB3ZSBuZWVkIHRvIGFzayBEYXRhRmluZGVyIGlmIGl0IHN1cHBvcnRzIEZ1bGxUZXh0IGxpa2VcbiAgICAgKiB0eXBlIHF1ZXJ5IG9yIFByZWRpY2F0ZS4gSW4gY2FzZSBvZiBQcmVkaWNhdGUgd2UgYnVpbGQgdGhlIE1hcCB3aXRoIGRpZmZlcmVudCBrZXkvdmFsdWVcbiAgICAgKiBwYWlyc1xuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBmaW5kKHBhdHRlcm4/OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhwYXR0ZXJuKSB8fCBwYXR0ZXJuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgd2UgcmVjZWl2ZWQgZW1wdHkgc3RyaW5nIHJldHVybiBvcmdpbmFsIGxpc3RcbiAgICAgICAgICAgIHRoaXMuZmV0Y2godGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VhcmNoUGFyYW06IGFueSA9IHBhdHRlcm47XG4gICAgICAgIGlmICh0aGlzLmRhdGFGaW5kZXIuYWNjZXB0cyh0aGlzLmRhdGFQcm92aWRlciwgUXVlcnlUeXBlLlByZWRpY2F0ZSkpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtID0gbmV3IE1hcCgpLnNldCgncXVlcnknLCBwYXR0ZXJuKS5zZXQoJ2xpbWl0JywgRFQyRGF0YVNvdXJjZS5NYXhMaW1pdCk7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdGF0ZS5zb3J0S2V5KSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtLnNldCgnb3JkZXJieScsIHRoaXMuc3RhdGUuc29ydEtleSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdGF0ZS5zb3J0S2V5KSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtLnNldCgnc2VsZWN0b3InLCB0aGlzLnN0YXRlLnNvcnRPcmRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhc3NlcnQoaXNTdHJpbmcocGF0dGVybiksICdDYW5ub3QgcGFzcyBub24tc3RyaW5nIHZhbHVlIHRvIEZ1bGxUZXh0IEZpbmRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhRmluZGVyLm1hdGNoPGFueT4oc2VhcmNoUGFyYW0pLnN1YnNjcmliZSgocmVzdWx0OiBhbnlbXSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dChyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRGF0YSBzb3VyY2UgZGVsZWdhdGVzIHRoZSByZXNwb25zaWJpbGl0eSB0byB0aGUgZ2l2ZW4gZGF0YSBwcm92aWRlciB3aGljaCBuZWVkcyB0byBpbXBsZW1lbnRcbiAgICAgKiBzcGVjaWZpYyBzb3J0aW5nIG1lY2hhbmlzbVxuICAgICAqXG4gICAgICogVG9kbzogRXh0ZW5kIHRvIHNvcnQgYnkgbXVsdGlwbGUgY29sdW1uc1xuICAgICAqXG4gICAgICovXG4gICAgc29ydChrZXk6IHN0cmluZywgc29ydE9yZGVyOiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmRhdGFQcm92aWRlci5kYXRhKCkpIHx8IHRoaXMuZGF0YVByb3ZpZGVyLmRhdGEoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlLnNvcnRLZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc3RhdGUuc29ydE9yZGVyID0gc29ydE9yZGVyO1xuICAgICAgICB0aGlzLmZldGNoKHRoaXMuc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUGVyc2lzdCBkYiBzdGF0ZVxuICAgICAqXG4gICAgICovXG4gICAgdXBkYXRlU3RhdGUob2Zmc2V0OiBudW1iZXIsIHNvcnRGaWVsZDogc3RyaW5nLCBzT3JkZXI6IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc3RhdGUub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICB0aGlzLnN0YXRlLnNvcnRLZXkgPSBzb3J0RmllbGQ7XG4gICAgICAgIHRoaXMuc3RhdGUuc29ydE9yZGVyID0gc09yZGVyO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiByZXNodWZmbGVzIGN1cnJlbnQgYXJyYXkgYmFzZWQgb24gbmV3IHJvdyBEJkQgcmVzdWx0LlxuICAgICAqXG4gICAgICogU2luY2UgdGhlcmUgaXMgYSBkaWZmZXJlbmNlIGlmIHdlIG1vdmUgaXRlbSBmcm9tIGJvdHRvbSBvciBmcm9tIHRoZSB0b3AgYW5kIHRoZW4gYWNjb3JkaW5nbHlcbiAgICAgKiBoaWdobGlnaHRpbmcgYSBzcGFjZSBiZXR3ZWVuIHJvd3MuIFdlIG5lZWQgdG8gcmVmbGVjdCB0aGlzIGluIGhlcmUgYXMgd2VsbC5cbiAgICAgKlxuICAgICAqIFVzZUNhc2UgMTpcbiAgICAgKlxuICAgICAqIDEuIFlvdSBjYW4gZ3JhYiBpdGVtIHdpdGggaW5kZXggMCBhbmQgbW92ZSBpdCBkb3duIHNvIHRoYXQgeW91IGNhbiBzZWUgYSBkcm9wcGluZyBsaW5lXG4gICAgICogYmV0d2VlbiByb3cgd2l0aCBpbmRleCAyIC0gM1xuICAgICAqXG4gICAgICogMi4gSW4gdGhpcyBjYXNlIHNwbGljZSgpIHN0YXJ0cyBmcm9tIHBvc2l0aW9uIDIgYW5kIGluc2VydCBhbGwgZWxlbWVudHMgYWZ0ZXIgMlxuICAgICAqICAgICAgc3BsaWNlKHN0YXJ0OiBudW1iZXIsIGRlbGV0ZUNvdW50OiBudW1iZXIsIC4uLml0ZW1zOiBUW10pOiBUW107XG4gICAgICpcbiAgICAgKiAzLiBubyBuZWVkIHRvIHVwZGF0ZSBuZXdQb3NcbiAgICAgKlxuICAgICAqIFVzZUNhc2UgMjpcbiAgICAgKlxuICAgICAqIDEuIFlvdSBjYW4gZ3JhYiBpdGVtIHdpdGggaW5kZXggMCBhbmQgbW92ZSBhbGwgdGhlIHdheSBkb3duIG9mIHRoZSBEVCBhbmQgbm93IG1vdmUgdGhlXG4gICAgICogcm93IHRvd2FyZCBUT1AgYW5kIHNwYWNlIGJldHdlZW4gcm93cyB3aXRoIGluZGV4IDIgLSAzIGlzIGhpZ2hsaWdodGVkIGFnYWluLlxuICAgICAqXG4gICAgICogMi4gSGVyZSBpcyB0aGUgZGlmZmVyZW5jZSwgYmVmb3JlIHdlIGhpZ2hsaWdodGVkIHJvdyAjMiB3aXRoIGxpbmUgYXQgdGhlIGJvdHRvbSwgbm93XG4gICAgICogaXQgc2VlbXMgdGhlIHNhbWUgYnV0IGl0cyBoaWdobGlnaHRlZCByb3cgIzMgd2l0aCBsaW5lIGF0IHRoZSBUT1AuXG4gICAgICpcbiAgICAgKiAqIFRoaXMgaXMgdGhlIHJlYXNvbiB3aGV5IHdlIG5lZWQgdG8gZG8gbmV3UG9zIC09IDEgb3IgbmV3UG9zICs9IDE7IGRlcGVuZGluZyBvdXIgZGlyZWN0aW9uXG4gICAgICogd2hlcmUgd2hlcmUgdGhlIGxpbmUgYmV0d2VlbiByb3dzIGlzIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKlxuICAgICAqIFdlIGRvbid0IG5lZWQgYW55IGNvbXBsaWNhdGVkIGNhbGN1bGF0aW9uIHRyeWluZyB0byBmaW5kIG91dCBpZiB3ZSBhcmUgb24gb25lIGhhbGYgb2YgdGhlIHJvd1xuICAgICAqIG9yIHNlY29uZCBoYWxmIGFuZCBiYXNlZCBvbiB0aGlzIHRyeSB0byBhcHBseSBjZXJ0YWluIHN0eWxlLiBUaGlzIHdvdWxkIG5vdCBnaXZlIHNvIG11Y2hcbiAgICAgKiBzcGFjZSBpZiB3ZSB3YW50IGRyb3Agcm93IGludG8gdGhlIHJvdy4gQW5kIHRoZSBjYWxjdWxhdGlvbiB3aXRoIGNvb3JkaW5hdGVzIHdvdWRsIGJlIHRvb1xuICAgICAqIGNvbXBsaWNhdGVkLlxuICAgICAqXG4gICAgICogV2Ugc2ltcGx5IHJlbWVtYmVyIHRoZSBkaXJlY3Rpb24gd2UgYXJlIG1vdmluZyBhbmQgYmFzZWQgb24gdGhpcyB3ZSBhcHBseSBzdHlsZSB0b1xuICAgICAqIHRvIGNyZWF0ZSBhIGxpbmUgYXQgdGhlIFRPUCBpZiB3ZSBhcmUgZ29pbmcgdXB3YXJkcyBvciBib3R0b20gb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICByZW9yZGVyUm93cyhvcmlnUG9zOiBudW1iZXIsIG5ld1BvczogbnVtYmVyLCBkcm9wUG9zOiBEcm9wUG9zaXRpb24pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLmRhdGFQcm92aWRlci5kYXRhKCkuc2xpY2UoKTtcblxuICAgICAgICAvLyB0YWtlIHNvbWV0aGluZyBmcm9tIHRvcCBhbmQgZHJhZyZkcm9wIHVuZGVyXG4gICAgICAgIGlmIChuZXdQb3MgPiBvcmlnUG9zICYmIGRyb3BQb3MgPT09IERyb3BQb3NpdGlvbi5CZWZvcmUgJiYgbmV3UG9zIDwgYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBuZXdQb3MgLT0gMTtcblxuICAgICAgICAgICAgLy8gdGFrZSBzb21ldGhpbmcgZnJvbSBib3R0b20gYW5kIGRyYWcmZHJvcCBhYm92ZVxuICAgICAgICB9IGVsc2UgaWYgKG5ld1BvcyA8IG9yaWdQb3MgJiYgZHJvcFBvcyA9PT0gRHJvcFBvc2l0aW9uLkFmdGVyICYmIG5ld1BvcyA+PSAwKSB7XG4gICAgICAgICAgICBuZXdQb3MgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFycmF5LnNwbGljZShuZXdQb3MsIDAsIC4uLmFycmF5LnNwbGljZShvcmlnUG9zLCAxKVswXSk7XG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQoYXJyYXkpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIEVudGl0eSBkZWZpbml0aW9uIHRvIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZSBwcm9ncmFtbWF0aWNhbGx5IGNvbHVtbnNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlEZWYyXG57XG4gICAgcHJvcGVydHlLZXlzOiBzdHJpbmdbXTtcblxuICAgIGRlZmF1bHRGb3JtYXR0ZXI6IChrZXk6IGFueSkgPT4gc3RyaW5nO1xuXG4gICAgZGlzcGxheVN0cmluZ0ZvcktleTogKGtleTogc3RyaW5nKSA9PiBzdHJpbmc7XG5cbiAgICBkZWZhdWx0QWxpZ25tZW50Rm9yS2V5OiAoa2V5OiBzdHJpbmcpID0+IHN0cmluZztcbn1cblxuLyoqXG4gKiBLZWVwcyBjdXJyZW50IGRhdGF0YWJsZSBzdGF0ZSB0aGUgc3RhdGUgd2hpY2ggZHJpdmVycyB0aGUgd2F5IHdoaWxlIGZldGNoaW5nIHRoZSBkYXRhIGFzIHdlbGxcbiAqIGVuY2Fwc3VsYXRlIHNldCBvZiBwcm9wZXJ0aWVzIHRoYXQgbmVlZHMgdG8gYmUgcGVyc2lzdGV0IGluIG9yZGVyIHRvIHJlY292ZXIgYSBzdGF0ZSBhZnRlciBlLmcuXG4gKiBicm93c2VyIHJlZnJlc2hcbiAqXG4gKlxuICogdG9kbzogQ3JlYXRlIG1ldGhvZHMgdG8gY29udmVydCB0aGlzIHN0YXRlIGZyb20gYW5kIHRvIEpTT04gZm9yIGVhc2llciBzZXJpYWxpemF0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhdGFibGUyU3RhdGVcbntcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFzY2VuZGluZyA9IDE7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXNjZW5kaW5nID0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIGZvciBwYWdpbmcgYW5kIGZldGNoaW5nXG4gICAgICovXG4gICAgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgIGxpbWl0OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBkZWZhdWx0IHZhbHVlIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgTiBudW1iZXIgb2Ygcm93cyBpbiBub24tZnVsbHNjcmVlblxuICAgICAqIG1vZGVcbiAgICAgKlxuICAgICAqL1xuICAgIGRpc3BsYXlMaW1pdDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgc29ydGluZyBmaWVsZFxuICAgICAqL1xuICAgIHNvcnRLZXk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNvcnRpbmcgb3JkZXIgb2YgdGhlIHNvcnQgZmllbGQuIERhdGFUYWJsZSBzdXBwb3J0IHNvcnRpbmcgZm9yIG11bHRpcGxlIGNvbHVtbiBidXQgd2VcbiAgICAgKiBkb250IHBlcnNpc3QgaXQgbm93LiBNYXliZSBpbiB0aGUgZnV0dXJlXG4gICAgICovXG4gICAgc29ydE9yZGVyOiBudW1iZXIgPSBEYXRhdGFibGUyU3RhdGUuQXNjZW5kaW5nO1xuXG4gICAgLyoqXG4gICAgICogSWYgd2UgYXJlIHVzaW5nIGdsb2JhbCBmaWx0ZXIgZm9yIGN1cnJlbnQgZGF0YXRhYmxlIHRoZW4gc2F2ZSBpdCBoZXJlXG4gICAgICovXG4gICAgY3VycmVudFNlYXJjaFF1ZXJ5OiBzdHJpbmcgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgaWYgYW55IHByZXNlbGVjdGVkIGZpbHRlclxuICAgICAqL1xuICAgIGN1cnJlbnRGaWx0ZXI6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFJlcHJlc2VudCBjdXJyZW50IHNlbGVjdGlvbiBkZXBlbmRpbmcgb24gc2VsZWN0aW9uIG1vZGUuXG4gICAgICpcbiAgICAgKiBDdXJyZW50IHNlbGVjdGlvbiB1c2VkIGJvdGggZm9yIHJvdyBzZWxlY3Rpb24gYW5kIGNlbGwgc2VsZWN0aW9uLiBSb3cgc2VsZWN0aW9uIGlzIHVzZWQgd2hlblxuICAgICAqIFNpbmdsZVNlbGVjdCBhbmQgTXVsdGlTZWxlY3Qgb25jZSB3ZSBpbXBsZW1lbnQgdGhpcy5cbiAgICAgKlxuICAgICAqL1xuICAgIHNlbGVjdGlvbjogYW55O1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGhlYWRlciBzZWxlY3Rpb24gaXMgZW5hYmxlZCBpdCBjYXB0dXJlcyBjdXJyZW50bHkgc2VsZWN0ZWQgY29sdW1uXG4gICAgICovXG4gICAgaGVhZGVyU2VsZWN0aW9uOiBEVENvbHVtbjJDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIEhvbGRzIGN1cnJlbnQgc3RhdGUgb2YgdGhlIG91dGxpbmUgdHJlZSBpZiB1c2VkXG4gICAgICpcbiAgICAgKi9cbiAgICBvdXRsaW5lU3RhdGU/OiBNYXA8YW55LCBib29sZWFuPjtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIEhvbGRzIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGRldGFpbCByb3dzIGlmIHVzZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGRldGFpbFJvd0V4cGFuZFN0YXRlPzogTWFwPGFueSwgYm9vbGVhbj47XG5cblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMub3V0bGluZVN0YXRlID0gbmV3IE1hcDxhbnksIGJvb2xlYW4+KCk7XG4gICAgICAgIHRoaXMuZGV0YWlsUm93RXhwYW5kU3RhdGUgPSBuZXcgTWFwPGFueSwgYm9vbGVhbj4oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlKG9mZnNldDogbnVtYmVyID0gMCwgbGltaXQ6IG51bWJlciA9IDE1LCBkaXNwbGF5TGltaXQ6IG51bWJlciA9IDUsXG4gICAgICAgICAgICAgICAgICBzb3J0RmllbGQ6IHN0cmluZyA9ICcnLCBzT3JkZXI6IG51bWJlciA9IDAsIHNlYXJjaFF1ZXJ5Pzogc3RyaW5nLCBmaWx0ZXI/OiBhbnksXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lU3RhdGU6IE1hcDxhbnksIGJvb2xlYW4+ID0gbmV3IE1hcDxhbnksIGJvb2xlYW4+KCksXG4gICAgICAgICAgICAgICAgICBkZXRhaWxSb3dTdGF0ZTogTWFwPGFueSwgYm9vbGVhbj4gPSBuZXcgTWFwPGFueSwgYm9vbGVhbj4oKSk6IERhdGF0YWJsZTJTdGF0ZVxuICAgIHtcbiAgICAgICAgbGV0IHMgPSBuZXcgRGF0YXRhYmxlMlN0YXRlKCk7XG4gICAgICAgIHMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICBzLmxpbWl0ID0gbGltaXQ7XG4gICAgICAgIHMuZGlzcGxheUxpbWl0ID0gZGlzcGxheUxpbWl0O1xuICAgICAgICBzLnNvcnRLZXkgPSBzb3J0RmllbGQ7XG4gICAgICAgIHMuc29ydE9yZGVyID0gc09yZGVyO1xuICAgICAgICBzLmN1cnJlbnRTZWFyY2hRdWVyeSA9IHNlYXJjaFF1ZXJ5O1xuICAgICAgICBzLmN1cnJlbnRGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgIHMub3V0bGluZVN0YXRlID0gb3V0bGluZVN0YXRlO1xuICAgICAgICBzLmRldGFpbFJvd0V4cGFuZFN0YXRlID0gZGV0YWlsUm93U3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21KU09OKGRhdGE6IHN0cmluZyk6IERhdGF0YWJsZTJTdGF0ZVxuICAgIHtcbiAgICAgICAgbGV0IHN0YXRlOiBEVFN0YXRlU2VyaWFsaXphYmxlSGVscGVyID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgbGV0IGRzID0gbmV3IERhdGF0YWJsZTJTdGF0ZSgpO1xuICAgICAgICBkcy5vZmZzZXQgPSBzdGF0ZS5vZmZzZXQ7XG4gICAgICAgIGRzLmxpbWl0ID0gc3RhdGUubGltaXQ7XG4gICAgICAgIGRzLmRpc3BsYXlMaW1pdCA9IHN0YXRlLmRpc3BsYXlMaW1pdDtcbiAgICAgICAgZHMuc29ydEtleSA9IHN0YXRlLnNvcnRLZXk7XG4gICAgICAgIGRzLnNvcnRPcmRlciA9IHN0YXRlLnNvcnRPcmRlcjtcbiAgICAgICAgZHMuY3VycmVudFNlYXJjaFF1ZXJ5ID0gc3RhdGUuY3VycmVudFNlYXJjaFF1ZXJ5O1xuICAgICAgICBkcy5vdXRsaW5lU3RhdGUgPSBNYXBXcmFwcGVyLmNyZWF0ZUZyb21BbnlNYXA8Ym9vbGVhbj4oc3RhdGUub3V0bGluZVN0YXRlKTtcbiAgICAgICAgZHMuZGV0YWlsUm93RXhwYW5kU3RhdGUgPSBNYXBXcmFwcGVyLmNyZWF0ZUZyb21BbnlNYXA8Ym9vbGVhbj4oc3RhdGUuZGV0YWlsUm93RXhwYW5kU3RhdGUpO1xuXG4gICAgICAgIHJldHVybiBkcztcbiAgICB9XG5cblxuICAgIHN0YXRpYyB0b0pTT04oZGF0YTogRGF0YXRhYmxlMlN0YXRlKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgdG9Db252ZXJ0OiBEVFN0YXRlU2VyaWFsaXphYmxlSGVscGVyID0ge1xuICAgICAgICAgICAgb2Zmc2V0OiBkYXRhLm9mZnNldCxcbiAgICAgICAgICAgIGxpbWl0OiBkYXRhLmxpbWl0LFxuICAgICAgICAgICAgZGlzcGxheUxpbWl0OiBkYXRhLmRpc3BsYXlMaW1pdCxcbiAgICAgICAgICAgIHNvcnRLZXk6IGRhdGEuc29ydEtleSxcbiAgICAgICAgICAgIHNvcnRPcmRlcjogZGF0YS5zb3J0T3JkZXIsXG4gICAgICAgICAgICBjdXJyZW50U2VhcmNoUXVlcnk6IGRhdGEuY3VycmVudFNlYXJjaFF1ZXJ5LFxuICAgICAgICAgICAgb3V0bGluZVN0YXRlOiBNYXBXcmFwcGVyLnRvQW55TWFwKGRhdGEub3V0bGluZVN0YXRlKSxcbiAgICAgICAgICAgIGRldGFpbFJvd0V4cGFuZFN0YXRlOiBNYXBXcmFwcGVyLnRvQW55TWFwKGRhdGEuZGV0YWlsUm93RXhwYW5kU3RhdGUpXG5cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRvQ29udmVydCk7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBUaGlzIG5lZWRzIHRvIGdvIHRvIERURGF0YVNvdXJjZSB0byBrZWVwIGFuZCBtYW5hZ2UgdGhlIHN0YXRlIG9mIHRoZSBkZXRhaWwgcm93LiBUaGUgaWRlYSBpc1xuICogc2ltcGxlIHdlIGhhdmUgYSBtYXAgaG9sZGluZyBpdGVtIHJlZmVyZW5jZSBhcyBhIGtleSBhbmQgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIGlmIHRoZVxuICogZGV0YWlsIHJvdyBpcyB2aXNpYmxlXG4gKlxuICogVG9kbzogbW92ZSB0aGlzIG91dCB0byBEU1xuICovXG5leHBvcnQgY2xhc3MgRGV0YWlsUm93RXhwYW5zaW9uU3RhdGVcbntcblxuICAgIGV4cGFuc2lvblN0YXRlczogTWFwPGFueSwgYm9vbGVhbj47XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZHQ6IEFXRGF0YVRhYmxlKVxuICAgIHtcbiAgICB9XG5cbiAgICBnZXQgZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZXhwYW5zaW9uU3RhdGVzKTtcbiAgICB9XG5cbiAgICBzZXQgZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCh2YWx1ZTogYm9vbGVhbilcbiAgICB7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcyA9IG5ldyBNYXA8YW55LCBib29sZWFuPigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKGl0ZW06IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLml0ZW1Ub0tleShpdGVtKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzRXhwYW5kZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzLnNldChrZXksIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmR0LmRhdGFTb3VyY2Uuc3RhdGUuZGV0YWlsUm93RXhwYW5kU3RhdGUgPSB0aGlzLmV4cGFuc2lvblN0YXRlcztcbiAgICB9XG5cbiAgICBpc0V4cGFuZGVkKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLml0ZW1Ub0tleShpdGVtKTtcbiAgICAgICAgLy8gaGFuZGxlIHNwZWNpYWwgY2FzZSB3aGVyZSB3ZSBjb2xsYXBzZSBwYXJlbnQgb2YgcGFyZW50IHdoaWxlIGRldGFpbCByb3cgaXMgZXhwYW5kZWRcbiAgICAgICAgaWYgKHRoaXMuZHQuaXNPdXRsaW5lKCkgJiYgIXRoaXMuZHQub3V0bGluZVN0YXRlLmlzRXhwYW5kZWQoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXNPdXRsaW5lRXhwYW5kZWQgPSB0aGlzLmR0LmlzT3V0bGluZSgpID8gdGhpcy5kdC5vdXRsaW5lU3RhdGUuaXNFeHBhbmRlZChrZXkpIDogdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChrZXkpICYmIHRoaXMuZXhwYW5zaW9uU3RhdGVzLmhhcyhrZXkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXRlbVRvS2V5KGl0ZW06IGFueSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzRW50aXR5KGl0ZW0pID8gKDxFbnRpdHk+aXRlbSkuaWRlbnRpdHkoKSA6IGl0ZW07XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERUU3RhdGVTZXJpYWxpemFibGVIZWxwZXJcbntcbiAgICBvZmZzZXQ6IG51bWJlcjtcbiAgICBsaW1pdDogbnVtYmVyO1xuICAgIGRpc3BsYXlMaW1pdDogbnVtYmVyO1xuICAgIHNvcnRLZXk6IHN0cmluZztcbiAgICBzb3J0T3JkZXI6IG51bWJlcjtcbiAgICBjdXJyZW50U2VhcmNoUXVlcnk6IHN0cmluZztcbiAgICBjdXJyZW50RmlsdGVyPzogYW55O1xuICAgIG91dGxpbmVTdGF0ZTogYW55O1xuICAgIGRldGFpbFJvd0V4cGFuZFN0YXRlOiBhbnk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRFRJbml0UGFyYW1zKGluaXQ6IERURFNJbml0UGFyYW1zKTogaW5pdCBpcyBEVERTSW5pdFBhcmFtc1xue1xuICAgIHJldHVybiBpc1ByZXNlbnQoaW5pdC5vYmopIHx8IGlzUHJlc2VudChpbml0LnF1ZXJ5VHlwZSkgfHwgaXNQcmVzZW50KGluaXQuZW50aXR5KTtcbn1cblxuLyoqXG4gKiBUbyBtYWtlIGluaXRpYWxpemF0aW9uIGVhc2llciB3ZSBoYXZlIHRoaXMgY29tbW9uIGZvcm1hdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEVERTSW5pdFBhcmFtcyBleHRlbmRzIERTSW5pdFBhcmFtc1xue1xuXG4gICAgLyoqXG4gICAgICogT2JqZWN0IGRlZmluaXRpb24gZm9yIHRoZSBkYXRhXG4gICAgICovXG4gICAgZW50aXR5PzogRW50aXR5RGVmMjtcblxuICAgIHN0YXRlPzogRGF0YXRhYmxlMlN0YXRlO1xufVxuIl19