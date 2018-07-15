/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DT2DataSource = /** @class */ (function (_super) {
    tslib_1.__extends(DT2DataSource, _super);
    function DT2DataSource(dataProviders, finders) {
        var _this = _super.call(this, dataProviders, finders) || this;
        _this.dataProviders = dataProviders;
        _this.finders = finders;
        _this.initialized = false;
        _this.state = Datatable2State.create();
        _this.debugTime = new Date().getTime();
        return _this;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    DT2DataSource.prototype.init = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isBlank(args) || args.length !== 1 && !isDTInitParams(args[0])) {
            throw new Error('You need to initialize DS with (DSChooserInitParams)');
        }
        var /** @type {?} */ init = args[0];
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
    };
    /**
     * Triggers async fetch data request and result is given back using dataProvider.dataChanges
     *
     */
    /**
     * Triggers async fetch data request and result is given back using dataProvider.dataChanges
     *
     * @param {?=} withParams
     * @return {?}
     */
    DT2DataSource.prototype.fetch = /**
     * Triggers async fetch data request and result is given back using dataProvider.dataChanges
     *
     * @param {?=} withParams
     * @return {?}
     */
    function (withParams) {
        var _this = this;
        var /** @type {?} */ params = null;
        if (isPresent(withParams)) {
            params = new Map().set('offset', withParams.offset)
                .set('limit', withParams.limit)
                .set('orderby', withParams.sortKey)
                .set('selector', withParams.sortOrder);
        }
        this.dataProvider.fetch(params).subscribe(function (result) {
            if (withParams.offset > 0) {
                var /** @type {?} */ incrData = tslib_1.__spread(_this.dataProvider.dataChanges.getValue(), result);
                _this.dataProvider.dataChanges.next(incrData);
            }
            else {
                _this.dataProvider.dataChanges.next(result);
            }
        });
    };
    /**
     * Component uses this method to open up continuous stream to listen for any changes which
     * need to be reflected on the UI.
     *
     * Dont forget to unsubscribe when component is destroyed.
     */
    /**
     * Component uses this method to open up continuous stream to listen for any changes which
     * need to be reflected on the UI.
     *
     * Dont forget to unsubscribe when component is destroyed.
     * @template T
     * @return {?}
     */
    DT2DataSource.prototype.open = /**
     * Component uses this method to open up continuous stream to listen for any changes which
     * need to be reflected on the UI.
     *
     * Dont forget to unsubscribe when component is destroyed.
     * @template T
     * @return {?}
     */
    function () {
        return this.dataProvider.dataChanges.asObservable();
    };
    /**
     * @return {?}
     */
    DT2DataSource.prototype.close = /**
     * @return {?}
     */
    function () {
        this.dataProvider = null;
        this.dataFinder = null;
    };
    /**
     * If CRUD is enabled we delegate calls to DataProvider that is responsible to tell the
     * dataProvider.dataChanges that are new data. If not enabled we have default implementation
     * which works with local array
     *
     */
    /**
     * If CRUD is enabled we delegate calls to DataProvider that is responsible to tell the
     * dataProvider.dataChanges that are new data. If not enabled we have default implementation
     * which works with local array
     *
     * @param {?} object
     * @return {?}
     */
    DT2DataSource.prototype.insert = /**
     * If CRUD is enabled we delegate calls to DataProvider that is responsible to tell the
     * dataProvider.dataChanges that are new data. If not enabled we have default implementation
     * which works with local array
     *
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (this.dataProvider.canCRUD()) {
            this.dataProvider.insert(object);
        }
        else {
            this.dataProvider.offScreenData.push(object);
            this.dataProvider.dataChanges.next(this.dataProvider.offScreenData);
        }
    };
    /**
     * Please see {@link insert} method
     *
     */
    /**
     * Please see {\@link insert} method
     *
     * @param {?} object
     * @return {?}
     */
    DT2DataSource.prototype.remove = /**
     * Please see {\@link insert} method
     *
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (this.dataProvider.canCRUD()) {
            this.dataProvider.remove(object);
        }
        else {
            ListWrapper.removeIfExist(this.dataProvider.offScreenData, object);
            this.dataProvider.dataChanges.next(this.dataProvider.offScreenData);
        }
    };
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
    DT2DataSource.prototype.find = /**
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
    function (pattern) {
        var _this = this;
        if (isBlank(pattern) || pattern.length === 0) {
            // if we received empty string return orginal list
            this.fetch(this.state);
            return;
        }
        var /** @type {?} */ searchParam = pattern;
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
        this.dataFinder.match(searchParam).subscribe(function (result) {
            _this.dataProvider.dataChanges.next(result);
        });
    };
    /**
     *
     * Data source delegates the responsibility to the given data provider which needs to implement
     * specific sorting mechanism
     *
     * Todo: Extend to sort by multiple columns
     *
     */
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
    DT2DataSource.prototype.sort = /**
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
    function (key, sortOrder) {
        if (isBlank(this.dataProvider.data()) || this.dataProvider.data().length === 0) {
            return;
        }
        this.state.sortKey = key;
        this.state.sortOrder = sortOrder;
        this.fetch(this.state);
    };
    /**
     *
     * Persist db state
     *
     */
    /**
     *
     * Persist db state
     *
     * @param {?} offset
     * @param {?} sortField
     * @param {?} sOrder
     * @return {?}
     */
    DT2DataSource.prototype.updateState = /**
     *
     * Persist db state
     *
     * @param {?} offset
     * @param {?} sortField
     * @param {?} sOrder
     * @return {?}
     */
    function (offset, sortField, sOrder) {
        this.state.offset = offset;
        this.state.sortKey = sortField;
        this.state.sortOrder = sOrder;
    };
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
    DT2DataSource.prototype.reorderRows = /**
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
    function (origPos, newPos, dropPos) {
        var /** @type {?} */ array = this.dataProvider.data().slice();
        // take something from top and drag&drop under
        if (newPos > origPos && dropPos === DropPosition.Before && newPos < array.length) {
            newPos -= 1;
            // take something from bottom and drag&drop above
        }
        else if (newPos < origPos && dropPos === DropPosition.After && newPos >= 0) {
            newPos += 1;
        }
        array.splice.apply(array, tslib_1.__spread([newPos, 0], array.splice(origPos, 1)[0]));
        this.dataProvider.dataChanges.next(array);
    };
    DT2DataSource.MaxLimit = 100;
    return DT2DataSource;
}(DataSource));
export { DT2DataSource };
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
var Datatable2State = /** @class */ (function () {
    function Datatable2State() {
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
    Datatable2State.create = /**
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
    function (offset, limit, displayLimit, sortField, sOrder, searchQuery, filter, outlineState, detailRowState) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 15; }
        if (displayLimit === void 0) { displayLimit = 5; }
        if (sortField === void 0) { sortField = ''; }
        if (sOrder === void 0) { sOrder = 0; }
        if (outlineState === void 0) { outlineState = new Map(); }
        if (detailRowState === void 0) { detailRowState = new Map(); }
        var /** @type {?} */ s = new Datatable2State();
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
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Datatable2State.fromJSON = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ state = JSON.parse(data);
        var /** @type {?} */ ds = new Datatable2State();
        ds.offset = state.offset;
        ds.limit = state.limit;
        ds.displayLimit = state.displayLimit;
        ds.sortKey = state.sortKey;
        ds.sortOrder = state.sortOrder;
        ds.currentSearchQuery = state.currentSearchQuery;
        ds.outlineState = MapWrapper.createFromAnyMap(state.outlineState);
        ds.detailRowExpandState = MapWrapper.createFromAnyMap(state.detailRowExpandState);
        return ds;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Datatable2State.toJSON = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ toConvert = {
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
    };
    Datatable2State.Ascending = 1;
    Datatable2State.Descending = -1;
    return Datatable2State;
}());
export { Datatable2State };
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
var /**
 * This needs to go to DTDataSource to keep and manage the state of the detail row. The idea is
 * simple we have a map holding item reference as a key and boolean value indicating if the
 * detail row is visible
 *
 * Todo: move this out to DS
 */
DetailRowExpansionState = /** @class */ (function () {
    function DetailRowExpansionState(dt) {
        this.dt = dt;
    }
    Object.defineProperty(DetailRowExpansionState.prototype, "detailExpansionEnabled", {
        get: /**
         * @return {?}
         */
        function () {
            return isPresent(this.expansionStates);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.expansionStates = new Map();
            }
            else {
                this.expansionStates = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} item
     * @return {?}
     */
    DetailRowExpansionState.prototype.toggle = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ key = this.itemToKey(item);
        if (!this.isExpanded(item)) {
            this.expansionStates.set(key, true);
        }
        else {
            this.expansionStates.delete(key);
        }
        this.dt.dataSource.state.detailRowExpandState = this.expansionStates;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DetailRowExpansionState.prototype.isExpanded = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ key = this.itemToKey(item);
        // handle special case where we collapse parent of parent while detail row is expanded
        if (this.dt.isOutline() && !this.dt.outlineState.isExpanded(key)) {
            this.expansionStates.delete(key);
            return false;
        }
        var /** @type {?} */ isOutlineExpanded = this.dt.isOutline() ? this.dt.outlineState.isExpanded(key) : true;
        return isPresent(key) && this.expansionStates.has(key);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DetailRowExpansionState.prototype.itemToKey = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return isEntity(item) ? (/** @type {?} */ (item)).identity() : item;
    };
    return DetailRowExpansionState;
}());
/**
 * This needs to go to DTDataSource to keep and manage the state of the detail row. The idea is
 * simple we have a map holding item reference as a key and boolean value indicating if the
 * detail row is visible
 *
 * Todo: move this out to DS
 */
export { DetailRowExpansionState };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvZGF0YXRhYmxlMi1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQ0gsTUFBTSxFQUVOLE9BQU8sRUFDUCxRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixXQUFXLEVBQ1gsVUFBVSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxVQUFVLEVBQWUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSxPQUFPLEVBQTBCLFNBQVMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBR2hGLE9BQU8sRUFBYyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYXRCLHlDQUFVO0lBcUJ6Qyx1QkFBbUIsYUFBNkIsRUFBUyxPQUFxQjtRQUE5RSxZQUVJLGtCQUFNLGFBQWEsRUFBRSxPQUFPLENBQUMsU0FLaEM7UUFQa0IsbUJBQWEsR0FBYixhQUFhLENBQWdCO1FBQVMsYUFBTyxHQUFQLE9BQU8sQ0FBYzs0QkFQaEUsS0FBSztRQVdmLEtBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXRDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7S0FDekM7Ozs7O0lBR0QsNEJBQUk7Ozs7SUFBSjtRQUFLLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBRWYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRSxN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QUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxRDs7Ozs7SUFFTywyQ0FBUzs7OztjQUFDLElBQVM7UUFFdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQVMsSUFBSSxFQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7a0NBL2dCakU7SUFpaEJDLENBQUE7Ozs7Ozs7O0FBdERELG1DQXNEQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkQsTUFBTSx5QkFBeUIsSUFBb0I7SUFFL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3JGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIGFzc2VydCxcbiAgICBFbnRpdHksXG4gICAgaXNCbGFuayxcbiAgICBpc0VudGl0eSxcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgTGlzdFdyYXBwZXIsXG4gICAgTWFwV3JhcHBlclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RhdGFTb3VyY2UsIERTSW5pdFBhcmFtc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtc291cmNlJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0RhdGFGaW5kZXIsIERhdGFGaW5kZXJzLCBRdWVyeVR5cGV9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJzfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1wcm92aWRlcnMnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4vY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtBV0RhdGFUYWJsZSwgRHJvcFBvc2l0aW9ufSBmcm9tICcuL2F3LWRhdGF0YWJsZSc7XG5cblxuLyoqXG4gKiBDb25jcmV0ZSBEYXRhU291cmNlIGltcGxlbWVudGF0aW9uIGZvciBEYXRhdGFibGUgd2hpY2ggZGVmaW5lcyBzdGF0ZSBhbmQgY29sdW1uIGRlZmluaXRpb24gdGhhdFxuICogY2FuIHByb2dyYW1tYXRpY2FsbHkgbW9kaWZ5IHJlbmRlcmVkIGNvbHVtbnMgKGlmIHByb3ZpZGVkKSBhbmQgbWV0aG9kIGZvciBpbnNlcnRpbmcgYW5kXG4gKiBhbmQgZGVsZXRpbmcgcmVjb3JkcztcbiAqXG4gKiBBbGwgb3BlcmF0aW9ucyBkZWFsaW5nIHdpdGggZGF0YSB1c2UgT2JzZXJ2YWJsZTxUPiBhbmQgaW5zdGFudCgpIG1ldGhvZCB0byByZXRyaWV2ZSBjdXJyZW50XG4gKiBzdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIERUMkRhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlXG57XG4gICAgc3RhdGljIHJlYWRvbmx5IE1heExpbWl0ID0gMTAwO1xuXG4gICAgLyoqXG4gICAgICogTWF0Y2hpbmcgZGF0YVByb3ZpZGVycyBhbmQgZmluZGVyc1xuICAgICAqL1xuICAgIGRhdGFQcm92aWRlcjogRGF0YVByb3ZpZGVyPGFueT47XG4gICAgZGF0YUZpbmRlcjogRGF0YUZpbmRlcjtcblxuICAgIC8qKlxuICAgICAqIEtlZXAgdHJhY2sgb2YgY3VycmVudCBkYXRhdGFibGUgc3RhdGVcbiAgICAgKi9cbiAgICBzdGF0ZTogRGF0YXRhYmxlMlN0YXRlO1xuICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgZGVidWdUaW1lOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBvYmplY3QgYmVpbmcgcmVuZGVyZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGVudGl0eTogRW50aXR5RGVmMjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhUHJvdmlkZXJzPzogRGF0YVByb3ZpZGVycywgcHVibGljIGZpbmRlcnM/OiBEYXRhRmluZGVycylcbiAgICB7XG4gICAgICAgIHN1cGVyKGRhdGFQcm92aWRlcnMsIGZpbmRlcnMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBEYXRhdGFibGUyU3RhdGUuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5kZWJ1Z1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9XG5cblxuICAgIGluaXQoLi4uYXJnczogYW55W10pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhhcmdzKSB8fCBhcmdzLmxlbmd0aCAhPT0gMSAmJiAhaXNEVEluaXRQYXJhbXMoYXJnc1swXSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gaW5pdGlhbGl6ZSBEUyB3aXRoIChEU0Nob29zZXJJbml0UGFyYW1zKScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbml0OiBEVERTSW5pdFBhcmFtcyA9IGFyZ3NbMF07XG5cbiAgICAgICAgLy8gdXNlIGV4aXN0aW5nIG9yIGZpbmQgYmVzdCBtYXRjaCBmb3IgZGF0YVByb3ZpZGVyXG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gaXNQcmVzZW50KGluaXQuZGF0YVByb3ZpZGVyKSA/IGluaXQuZGF0YVByb3ZpZGVyXG4gICAgICAgICAgICA6IHRoaXMuZGF0YVByb3ZpZGVycy5maW5kKGluaXQub2JqKTtcblxuICAgICAgICAvLyB1c2UgZXhpc3Rpbmcgb3IgZmluZCBiZXN0IG1hdGNoIGZvciBkYXRhRmluZGVyXG4gICAgICAgIHRoaXMuZGF0YUZpbmRlciA9IGlzUHJlc2VudChpbml0LmRhdGFGaW5kZXIpID8gaW5pdC5kYXRhRmluZGVyXG4gICAgICAgICAgICA6IHRoaXMuZmluZGVycy5maW5kKHRoaXMuZGF0YVByb3ZpZGVyLCBpbml0LnF1ZXJ5VHlwZSk7XG5cbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLmRhdGFQcm92aWRlcikgJiYgaXNQcmVzZW50KHRoaXMuZGF0YUZpbmRlciksXG4gICAgICAgICAgICAnRGF0YVNvdXJjZSBpbmNvcnJlY3RseSBpbml0aWFsaXplZC4gKERhdGFQcm92aWRlciwgRGF0YUZpbmRlcikgbWlzc2luZy4gJyk7XG5cbiAgICAgICAgdGhpcy5kYXRhRmluZGVyLmxvb2t1cEtleSA9IGluaXQubG9va3VwS2V5O1xuICAgICAgICBpZiAoaXNCbGFuayhpbml0LnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBEYXRhdGFibGUyU3RhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBpbml0LnN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhc3luYyBmZXRjaCBkYXRhIHJlcXVlc3QgYW5kIHJlc3VsdCBpcyBnaXZlbiBiYWNrIHVzaW5nIGRhdGFQcm92aWRlci5kYXRhQ2hhbmdlc1xuICAgICAqXG4gICAgICovXG4gICAgZmV0Y2god2l0aFBhcmFtcz86IERhdGF0YWJsZTJTdGF0ZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBwYXJhbXMgPSBudWxsO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHdpdGhQYXJhbXMpKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSBuZXcgTWFwKCkuc2V0KCdvZmZzZXQnLCB3aXRoUGFyYW1zLm9mZnNldClcbiAgICAgICAgICAgICAgICAuc2V0KCdsaW1pdCcsIHdpdGhQYXJhbXMubGltaXQpXG4gICAgICAgICAgICAgICAgLnNldCgnb3JkZXJieScsIHdpdGhQYXJhbXMuc29ydEtleSlcbiAgICAgICAgICAgICAgICAuc2V0KCdzZWxlY3RvcicsIHdpdGhQYXJhbXMuc29ydE9yZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmZldGNoKHBhcmFtcykuc3Vic2NyaWJlKChyZXN1bHQ6IGFueVtdKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAod2l0aFBhcmFtcy5vZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluY3JEYXRhID0gWy4uLnRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLmdldFZhbHVlKCksIC4uLnJlc3VsdF07XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dChpbmNyRGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb21wb25lbnQgdXNlcyB0aGlzIG1ldGhvZCB0byBvcGVuIHVwIGNvbnRpbnVvdXMgc3RyZWFtIHRvIGxpc3RlbiBmb3IgYW55IGNoYW5nZXMgd2hpY2hcbiAgICAgKiBuZWVkIHRvIGJlIHJlZmxlY3RlZCBvbiB0aGUgVUkuXG4gICAgICpcbiAgICAgKiBEb250IGZvcmdldCB0byB1bnN1YnNjcmliZSB3aGVuIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gICAgICovXG4gICAgb3BlbjxUPigpOiBPYnNlcnZhYmxlPFRbXT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmRhdGFQcm92aWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuZGF0YUZpbmRlciA9IG51bGw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJZiBDUlVEIGlzIGVuYWJsZWQgd2UgZGVsZWdhdGUgY2FsbHMgdG8gRGF0YVByb3ZpZGVyIHRoYXQgaXMgcmVzcG9uc2libGUgdG8gdGVsbCB0aGVcbiAgICAgKiBkYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMgdGhhdCBhcmUgbmV3IGRhdGEuIElmIG5vdCBlbmFibGVkIHdlIGhhdmUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvblxuICAgICAqIHdoaWNoIHdvcmtzIHdpdGggbG9jYWwgYXJyYXlcbiAgICAgKlxuICAgICAqL1xuICAgIGluc2VydChvYmplY3Q6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFQcm92aWRlci5jYW5DUlVEKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmluc2VydChvYmplY3QpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5vZmZTY3JlZW5EYXRhLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQodGhpcy5kYXRhUHJvdmlkZXIub2ZmU2NyZWVuRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFBsZWFzZSBzZWUge0BsaW5rIGluc2VydH0gbWV0aG9kXG4gICAgICpcbiAgICAgKi9cbiAgICByZW1vdmUob2JqZWN0OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5kYXRhUHJvdmlkZXIuY2FuQ1JVRCgpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5yZW1vdmUob2JqZWN0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlSWZFeGlzdCh0aGlzLmRhdGFQcm92aWRlci5vZmZTY3JlZW5EYXRhLCBvYmplY3QpO1xuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dCh0aGlzLmRhdGFQcm92aWRlci5vZmZTY3JlZW5EYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUHJvdmlkZXMgYWNjZXNzIHRvIERhdGFGaW5kZXIgd2hpY2ggY2FuIGFjY2VwdCBlaXRoZXIgcGxhaW4gc3RyaW5nIG9yIE1hcC5cbiAgICAgKlxuICAgICAqIFRvIGJlIGFibGUgdG8gcHJvdmlkZSBjb3JyZWN0IGlucHV0IHdlIG5lZWQgdG8gYXNrIERhdGFGaW5kZXIgaWYgaXQgc3VwcG9ydHMgRnVsbFRleHQgbGlrZVxuICAgICAqIHR5cGUgcXVlcnkgb3IgUHJlZGljYXRlLiBJbiBjYXNlIG9mIFByZWRpY2F0ZSB3ZSBidWlsZCB0aGUgTWFwIHdpdGggZGlmZmVyZW50IGtleS92YWx1ZVxuICAgICAqIHBhaXJzXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGZpbmQocGF0dGVybj86IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHBhdHRlcm4pIHx8IHBhdHRlcm4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSByZWNlaXZlZCBlbXB0eSBzdHJpbmcgcmV0dXJuIG9yZ2luYWwgbGlzdFxuICAgICAgICAgICAgdGhpcy5mZXRjaCh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWFyY2hQYXJhbTogYW55ID0gcGF0dGVybjtcbiAgICAgICAgaWYgKHRoaXMuZGF0YUZpbmRlci5hY2NlcHRzKHRoaXMuZGF0YVByb3ZpZGVyLCBRdWVyeVR5cGUuUHJlZGljYXRlKSkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW0gPSBuZXcgTWFwKCkuc2V0KCdxdWVyeScsIHBhdHRlcm4pLnNldCgnbGltaXQnLCBEVDJEYXRhU291cmNlLk1heExpbWl0KTtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0YXRlLnNvcnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW0uc2V0KCdvcmRlcmJ5JywgdGhpcy5zdGF0ZS5zb3J0S2V5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0YXRlLnNvcnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW0uc2V0KCdzZWxlY3RvcicsIHRoaXMuc3RhdGUuc29ydE9yZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFzc2VydChpc1N0cmluZyhwYXR0ZXJuKSwgJ0Nhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdmFsdWUgdG8gRnVsbFRleHQgRmluZGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGFGaW5kZXIubWF0Y2g8YW55PihzZWFyY2hQYXJhbSkuc3Vic2NyaWJlKChyZXN1bHQ6IGFueVtdKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEYXRhIHNvdXJjZSBkZWxlZ2F0ZXMgdGhlIHJlc3BvbnNpYmlsaXR5IHRvIHRoZSBnaXZlbiBkYXRhIHByb3ZpZGVyIHdoaWNoIG5lZWRzIHRvIGltcGxlbWVudFxuICAgICAqIHNwZWNpZmljIHNvcnRpbmcgbWVjaGFuaXNtXG4gICAgICpcbiAgICAgKiBUb2RvOiBFeHRlbmQgdG8gc29ydCBieSBtdWx0aXBsZSBjb2x1bW5zXG4gICAgICpcbiAgICAgKi9cbiAgICBzb3J0KGtleTogc3RyaW5nLCBzb3J0T3JkZXI6IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuZGF0YVByb3ZpZGVyLmRhdGEoKSkgfHwgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc29ydEtleSA9IGtleTtcbiAgICAgICAgdGhpcy5zdGF0ZS5zb3J0T3JkZXIgPSBzb3J0T3JkZXI7XG4gICAgICAgIHRoaXMuZmV0Y2godGhpcy5zdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBQZXJzaXN0IGRiIHN0YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICB1cGRhdGVTdGF0ZShvZmZzZXQ6IG51bWJlciwgc29ydEZpZWxkOiBzdHJpbmcsIHNPcmRlcjogbnVtYmVyKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIHRoaXMuc3RhdGUuc29ydEtleSA9IHNvcnRGaWVsZDtcbiAgICAgICAgdGhpcy5zdGF0ZS5zb3J0T3JkZXIgPSBzT3JkZXI7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIHJlc2h1ZmZsZXMgY3VycmVudCBhcnJheSBiYXNlZCBvbiBuZXcgcm93IEQmRCByZXN1bHQuXG4gICAgICpcbiAgICAgKiBTaW5jZSB0aGVyZSBpcyBhIGRpZmZlcmVuY2UgaWYgd2UgbW92ZSBpdGVtIGZyb20gYm90dG9tIG9yIGZyb20gdGhlIHRvcCBhbmQgdGhlbiBhY2NvcmRpbmdseVxuICAgICAqIGhpZ2hsaWdodGluZyBhIHNwYWNlIGJldHdlZW4gcm93cy4gV2UgbmVlZCB0byByZWZsZWN0IHRoaXMgaW4gaGVyZSBhcyB3ZWxsLlxuICAgICAqXG4gICAgICogVXNlQ2FzZSAxOlxuICAgICAqXG4gICAgICogMS4gWW91IGNhbiBncmFiIGl0ZW0gd2l0aCBpbmRleCAwIGFuZCBtb3ZlIGl0IGRvd24gc28gdGhhdCB5b3UgY2FuIHNlZSBhIGRyb3BwaW5nIGxpbmVcbiAgICAgKiBiZXR3ZWVuIHJvdyB3aXRoIGluZGV4IDIgLSAzXG4gICAgICpcbiAgICAgKiAyLiBJbiB0aGlzIGNhc2Ugc3BsaWNlKCkgc3RhcnRzIGZyb20gcG9zaXRpb24gMiBhbmQgaW5zZXJ0IGFsbCBlbGVtZW50cyBhZnRlciAyXG4gICAgICogICAgICBzcGxpY2Uoc3RhcnQ6IG51bWJlciwgZGVsZXRlQ291bnQ6IG51bWJlciwgLi4uaXRlbXM6IFRbXSk6IFRbXTtcbiAgICAgKlxuICAgICAqIDMuIG5vIG5lZWQgdG8gdXBkYXRlIG5ld1Bvc1xuICAgICAqXG4gICAgICogVXNlQ2FzZSAyOlxuICAgICAqXG4gICAgICogMS4gWW91IGNhbiBncmFiIGl0ZW0gd2l0aCBpbmRleCAwIGFuZCBtb3ZlIGFsbCB0aGUgd2F5IGRvd24gb2YgdGhlIERUIGFuZCBub3cgbW92ZSB0aGVcbiAgICAgKiByb3cgdG93YXJkIFRPUCBhbmQgc3BhY2UgYmV0d2VlbiByb3dzIHdpdGggaW5kZXggMiAtIDMgaXMgaGlnaGxpZ2h0ZWQgYWdhaW4uXG4gICAgICpcbiAgICAgKiAyLiBIZXJlIGlzIHRoZSBkaWZmZXJlbmNlLCBiZWZvcmUgd2UgaGlnaGxpZ2h0ZWQgcm93ICMyIHdpdGggbGluZSBhdCB0aGUgYm90dG9tLCBub3dcbiAgICAgKiBpdCBzZWVtcyB0aGUgc2FtZSBidXQgaXRzIGhpZ2hsaWdodGVkIHJvdyAjMyB3aXRoIGxpbmUgYXQgdGhlIFRPUC5cbiAgICAgKlxuICAgICAqICogVGhpcyBpcyB0aGUgcmVhc29uIHdoZXkgd2UgbmVlZCB0byBkbyBuZXdQb3MgLT0gMSBvciBuZXdQb3MgKz0gMTsgZGVwZW5kaW5nIG91ciBkaXJlY3Rpb25cbiAgICAgKiB3aGVyZSB3aGVyZSB0aGUgbGluZSBiZXR3ZWVuIHJvd3MgaXMgY3JlYXRlZC5cbiAgICAgKlxuICAgICAqXG4gICAgICogV2UgZG9uJ3QgbmVlZCBhbnkgY29tcGxpY2F0ZWQgY2FsY3VsYXRpb24gdHJ5aW5nIHRvIGZpbmQgb3V0IGlmIHdlIGFyZSBvbiBvbmUgaGFsZiBvZiB0aGUgcm93XG4gICAgICogb3Igc2Vjb25kIGhhbGYgYW5kIGJhc2VkIG9uIHRoaXMgdHJ5IHRvIGFwcGx5IGNlcnRhaW4gc3R5bGUuIFRoaXMgd291bGQgbm90IGdpdmUgc28gbXVjaFxuICAgICAqIHNwYWNlIGlmIHdlIHdhbnQgZHJvcCByb3cgaW50byB0aGUgcm93LiBBbmQgdGhlIGNhbGN1bGF0aW9uIHdpdGggY29vcmRpbmF0ZXMgd291ZGwgYmUgdG9vXG4gICAgICogY29tcGxpY2F0ZWQuXG4gICAgICpcbiAgICAgKiBXZSBzaW1wbHkgcmVtZW1iZXIgdGhlIGRpcmVjdGlvbiB3ZSBhcmUgbW92aW5nIGFuZCBiYXNlZCBvbiB0aGlzIHdlIGFwcGx5IHN0eWxlIHRvXG4gICAgICogdG8gY3JlYXRlIGEgbGluZSBhdCB0aGUgVE9QIGlmIHdlIGFyZSBnb2luZyB1cHdhcmRzIG9yIGJvdHRvbSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHJlb3JkZXJSb3dzKG9yaWdQb3M6IG51bWJlciwgbmV3UG9zOiBudW1iZXIsIGRyb3BQb3M6IERyb3BQb3NpdGlvbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhcnJheSA9IHRoaXMuZGF0YVByb3ZpZGVyLmRhdGEoKS5zbGljZSgpO1xuXG4gICAgICAgIC8vIHRha2Ugc29tZXRoaW5nIGZyb20gdG9wIGFuZCBkcmFnJmRyb3AgdW5kZXJcbiAgICAgICAgaWYgKG5ld1BvcyA+IG9yaWdQb3MgJiYgZHJvcFBvcyA9PT0gRHJvcFBvc2l0aW9uLkJlZm9yZSAmJiBuZXdQb3MgPCBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld1BvcyAtPSAxO1xuXG4gICAgICAgICAgICAvLyB0YWtlIHNvbWV0aGluZyBmcm9tIGJvdHRvbSBhbmQgZHJhZyZkcm9wIGFib3ZlXG4gICAgICAgIH0gZWxzZSBpZiAobmV3UG9zIDwgb3JpZ1BvcyAmJiBkcm9wUG9zID09PSBEcm9wUG9zaXRpb24uQWZ0ZXIgJiYgbmV3UG9zID49IDApIHtcbiAgICAgICAgICAgIG5ld1BvcyArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJyYXkuc3BsaWNlKG5ld1BvcywgMCwgLi4uYXJyYXkuc3BsaWNlKG9yaWdQb3MsIDEpWzBdKTtcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dChhcnJheSk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogRW50aXR5IGRlZmluaXRpb24gdG8gYmUgdXNlZCB0byBpbml0aWFsaXplIHByb2dyYW1tYXRpY2FsbHkgY29sdW1uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eURlZjJcbntcbiAgICBwcm9wZXJ0eUtleXM6IHN0cmluZ1tdO1xuXG4gICAgZGVmYXVsdEZvcm1hdHRlcjogKGtleTogYW55KSA9PiBzdHJpbmc7XG5cbiAgICBkaXNwbGF5U3RyaW5nRm9yS2V5OiAoa2V5OiBzdHJpbmcpID0+IHN0cmluZztcblxuICAgIGRlZmF1bHRBbGlnbm1lbnRGb3JLZXk6IChrZXk6IHN0cmluZykgPT4gc3RyaW5nO1xufVxuXG4vKipcbiAqIEtlZXBzIGN1cnJlbnQgZGF0YXRhYmxlIHN0YXRlIHRoZSBzdGF0ZSB3aGljaCBkcml2ZXJzIHRoZSB3YXkgd2hpbGUgZmV0Y2hpbmcgdGhlIGRhdGEgYXMgd2VsbFxuICogZW5jYXBzdWxhdGUgc2V0IG9mIHByb3BlcnRpZXMgdGhhdCBuZWVkcyB0byBiZSBwZXJzaXN0ZXQgaW4gb3JkZXIgdG8gcmVjb3ZlciBhIHN0YXRlIGFmdGVyIGUuZy5cbiAqIGJyb3dzZXIgcmVmcmVzaFxuICpcbiAqXG4gKiB0b2RvOiBDcmVhdGUgbWV0aG9kcyB0byBjb252ZXJ0IHRoaXMgc3RhdGUgZnJvbSBhbmQgdG8gSlNPTiBmb3IgZWFzaWVyIHNlcmlhbGl6YXRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGF0YWJsZTJTdGF0ZVxue1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQXNjZW5kaW5nID0gMTtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERlc2NlbmRpbmcgPSAtMTtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgZm9yIHBhZ2luZyBhbmQgZmV0Y2hpbmdcbiAgICAgKi9cbiAgICBvZmZzZXQ6IG51bWJlciA9IDA7XG4gICAgbGltaXQ6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIGRlZmF1bHQgdmFsdWUgdGhhdCBpcyB1c2VkIHRvIHJlbmRlciBOIG51bWJlciBvZiByb3dzIGluIG5vbi1mdWxsc2NyZWVuXG4gICAgICogbW9kZVxuICAgICAqXG4gICAgICovXG4gICAgZGlzcGxheUxpbWl0OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBzb3J0aW5nIGZpZWxkXG4gICAgICovXG4gICAgc29ydEtleTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU29ydGluZyBvcmRlciBvZiB0aGUgc29ydCBmaWVsZC4gRGF0YVRhYmxlIHN1cHBvcnQgc29ydGluZyBmb3IgbXVsdGlwbGUgY29sdW1uIGJ1dCB3ZVxuICAgICAqIGRvbnQgcGVyc2lzdCBpdCBub3cuIE1heWJlIGluIHRoZSBmdXR1cmVcbiAgICAgKi9cbiAgICBzb3J0T3JkZXI6IG51bWJlciA9IERhdGF0YWJsZTJTdGF0ZS5Bc2NlbmRpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJZiB3ZSBhcmUgdXNpbmcgZ2xvYmFsIGZpbHRlciBmb3IgY3VycmVudCBkYXRhdGFibGUgdGhlbiBzYXZlIGl0IGhlcmVcbiAgICAgKi9cbiAgICBjdXJyZW50U2VhcmNoUXVlcnk6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBpZiBhbnkgcHJlc2VsZWN0ZWQgZmlsdGVyXG4gICAgICovXG4gICAgY3VycmVudEZpbHRlcjogYW55O1xuXG4gICAgLyoqXG4gICAgICogUmVwcmVzZW50IGN1cnJlbnQgc2VsZWN0aW9uIGRlcGVuZGluZyBvbiBzZWxlY3Rpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIEN1cnJlbnQgc2VsZWN0aW9uIHVzZWQgYm90aCBmb3Igcm93IHNlbGVjdGlvbiBhbmQgY2VsbCBzZWxlY3Rpb24uIFJvdyBzZWxlY3Rpb24gaXMgdXNlZCB3aGVuXG4gICAgICogU2luZ2xlU2VsZWN0IGFuZCBNdWx0aVNlbGVjdCBvbmNlIHdlIGltcGxlbWVudCB0aGlzLlxuICAgICAqXG4gICAgICovXG4gICAgc2VsZWN0aW9uOiBhbnk7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gaGVhZGVyIHNlbGVjdGlvbiBpcyBlbmFibGVkIGl0IGNhcHR1cmVzIGN1cnJlbnRseSBzZWxlY3RlZCBjb2x1bW5cbiAgICAgKi9cbiAgICBoZWFkZXJTZWxlY3Rpb246IERUQ29sdW1uMkNvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgSG9sZHMgY3VycmVudCBzdGF0ZSBvZiB0aGUgb3V0bGluZSB0cmVlIGlmIHVzZWRcbiAgICAgKlxuICAgICAqL1xuICAgIG91dGxpbmVTdGF0ZT86IE1hcDxhbnksIGJvb2xlYW4+O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgSG9sZHMgY3VycmVudCBzdGF0ZSBvZiB0aGUgZGV0YWlsIHJvd3MgaWYgdXNlZFxuICAgICAqXG4gICAgICovXG4gICAgZGV0YWlsUm93RXhwYW5kU3RhdGU/OiBNYXA8YW55LCBib29sZWFuPjtcblxuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5vdXRsaW5lU3RhdGUgPSBuZXcgTWFwPGFueSwgYm9vbGVhbj4oKTtcbiAgICAgICAgdGhpcy5kZXRhaWxSb3dFeHBhbmRTdGF0ZSA9IG5ldyBNYXA8YW55LCBib29sZWFuPigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGUob2Zmc2V0OiBudW1iZXIgPSAwLCBsaW1pdDogbnVtYmVyID0gMTUsIGRpc3BsYXlMaW1pdDogbnVtYmVyID0gNSxcbiAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZDogc3RyaW5nID0gJycsIHNPcmRlcjogbnVtYmVyID0gMCwgc2VhcmNoUXVlcnk/OiBzdHJpbmcsIGZpbHRlcj86IGFueSxcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVTdGF0ZTogTWFwPGFueSwgYm9vbGVhbj4gPSBuZXcgTWFwPGFueSwgYm9vbGVhbj4oKSxcbiAgICAgICAgICAgICAgICAgIGRldGFpbFJvd1N0YXRlOiBNYXA8YW55LCBib29sZWFuPiA9IG5ldyBNYXA8YW55LCBib29sZWFuPigpKTogRGF0YXRhYmxlMlN0YXRlXG4gICAge1xuICAgICAgICBsZXQgcyA9IG5ldyBEYXRhdGFibGUyU3RhdGUoKTtcbiAgICAgICAgcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIHMubGltaXQgPSBsaW1pdDtcbiAgICAgICAgcy5kaXNwbGF5TGltaXQgPSBkaXNwbGF5TGltaXQ7XG4gICAgICAgIHMuc29ydEtleSA9IHNvcnRGaWVsZDtcbiAgICAgICAgcy5zb3J0T3JkZXIgPSBzT3JkZXI7XG4gICAgICAgIHMuY3VycmVudFNlYXJjaFF1ZXJ5ID0gc2VhcmNoUXVlcnk7XG4gICAgICAgIHMuY3VycmVudEZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgcy5vdXRsaW5lU3RhdGUgPSBvdXRsaW5lU3RhdGU7XG4gICAgICAgIHMuZGV0YWlsUm93RXhwYW5kU3RhdGUgPSBkZXRhaWxSb3dTdGF0ZTtcblxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbUpTT04oZGF0YTogc3RyaW5nKTogRGF0YXRhYmxlMlN0YXRlXG4gICAge1xuICAgICAgICBsZXQgc3RhdGU6IERUU3RhdGVTZXJpYWxpemFibGVIZWxwZXIgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICBsZXQgZHMgPSBuZXcgRGF0YXRhYmxlMlN0YXRlKCk7XG4gICAgICAgIGRzLm9mZnNldCA9IHN0YXRlLm9mZnNldDtcbiAgICAgICAgZHMubGltaXQgPSBzdGF0ZS5saW1pdDtcbiAgICAgICAgZHMuZGlzcGxheUxpbWl0ID0gc3RhdGUuZGlzcGxheUxpbWl0O1xuICAgICAgICBkcy5zb3J0S2V5ID0gc3RhdGUuc29ydEtleTtcbiAgICAgICAgZHMuc29ydE9yZGVyID0gc3RhdGUuc29ydE9yZGVyO1xuICAgICAgICBkcy5jdXJyZW50U2VhcmNoUXVlcnkgPSBzdGF0ZS5jdXJyZW50U2VhcmNoUXVlcnk7XG4gICAgICAgIGRzLm91dGxpbmVTdGF0ZSA9IE1hcFdyYXBwZXIuY3JlYXRlRnJvbUFueU1hcDxib29sZWFuPihzdGF0ZS5vdXRsaW5lU3RhdGUpO1xuICAgICAgICBkcy5kZXRhaWxSb3dFeHBhbmRTdGF0ZSA9IE1hcFdyYXBwZXIuY3JlYXRlRnJvbUFueU1hcDxib29sZWFuPihzdGF0ZS5kZXRhaWxSb3dFeHBhbmRTdGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGRzO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHRvSlNPTihkYXRhOiBEYXRhdGFibGUyU3RhdGUpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCB0b0NvbnZlcnQ6IERUU3RhdGVTZXJpYWxpemFibGVIZWxwZXIgPSB7XG4gICAgICAgICAgICBvZmZzZXQ6IGRhdGEub2Zmc2V0LFxuICAgICAgICAgICAgbGltaXQ6IGRhdGEubGltaXQsXG4gICAgICAgICAgICBkaXNwbGF5TGltaXQ6IGRhdGEuZGlzcGxheUxpbWl0LFxuICAgICAgICAgICAgc29ydEtleTogZGF0YS5zb3J0S2V5LFxuICAgICAgICAgICAgc29ydE9yZGVyOiBkYXRhLnNvcnRPcmRlcixcbiAgICAgICAgICAgIGN1cnJlbnRTZWFyY2hRdWVyeTogZGF0YS5jdXJyZW50U2VhcmNoUXVlcnksXG4gICAgICAgICAgICBvdXRsaW5lU3RhdGU6IE1hcFdyYXBwZXIudG9BbnlNYXAoZGF0YS5vdXRsaW5lU3RhdGUpLFxuICAgICAgICAgICAgZGV0YWlsUm93RXhwYW5kU3RhdGU6IE1hcFdyYXBwZXIudG9BbnlNYXAoZGF0YS5kZXRhaWxSb3dFeHBhbmRTdGF0ZSlcblxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodG9Db252ZXJ0KTtcbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFRoaXMgbmVlZHMgdG8gZ28gdG8gRFREYXRhU291cmNlIHRvIGtlZXAgYW5kIG1hbmFnZSB0aGUgc3RhdGUgb2YgdGhlIGRldGFpbCByb3cuIFRoZSBpZGVhIGlzXG4gKiBzaW1wbGUgd2UgaGF2ZSBhIG1hcCBob2xkaW5nIGl0ZW0gcmVmZXJlbmNlIGFzIGEga2V5IGFuZCBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgaWYgdGhlXG4gKiBkZXRhaWwgcm93IGlzIHZpc2libGVcbiAqXG4gKiBUb2RvOiBtb3ZlIHRoaXMgb3V0IHRvIERTXG4gKi9cbmV4cG9ydCBjbGFzcyBEZXRhaWxSb3dFeHBhbnNpb25TdGF0ZVxue1xuXG4gICAgZXhwYW5zaW9uU3RhdGVzOiBNYXA8YW55LCBib29sZWFuPjtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkdDogQVdEYXRhVGFibGUpXG4gICAge1xuICAgIH1cblxuICAgIGdldCBkZXRhaWxFeHBhbnNpb25FbmFibGVkKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5leHBhbnNpb25TdGF0ZXMpO1xuICAgIH1cblxuICAgIHNldCBkZXRhaWxFeHBhbnNpb25FbmFibGVkKHZhbHVlOiBib29sZWFuKVxuICAgIHtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzID0gbmV3IE1hcDxhbnksIGJvb2xlYW4+KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoaXRlbTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuaXRlbVRvS2V5KGl0ZW0pO1xuICAgICAgICBpZiAoIXRoaXMuaXNFeHBhbmRlZChpdGVtKSkge1xuICAgICAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMuc2V0KGtleSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHQuZGF0YVNvdXJjZS5zdGF0ZS5kZXRhaWxSb3dFeHBhbmRTdGF0ZSA9IHRoaXMuZXhwYW5zaW9uU3RhdGVzO1xuICAgIH1cblxuICAgIGlzRXhwYW5kZWQoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuaXRlbVRvS2V5KGl0ZW0pO1xuICAgICAgICAvLyBoYW5kbGUgc3BlY2lhbCBjYXNlIHdoZXJlIHdlIGNvbGxhcHNlIHBhcmVudCBvZiBwYXJlbnQgd2hpbGUgZGV0YWlsIHJvdyBpcyBleHBhbmRlZFxuICAgICAgICBpZiAodGhpcy5kdC5pc091dGxpbmUoKSAmJiAhdGhpcy5kdC5vdXRsaW5lU3RhdGUuaXNFeHBhbmRlZChrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpc091dGxpbmVFeHBhbmRlZCA9IHRoaXMuZHQuaXNPdXRsaW5lKCkgPyB0aGlzLmR0Lm91dGxpbmVTdGF0ZS5pc0V4cGFuZGVkKGtleSkgOiB0cnVlO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGtleSkgJiYgdGhpcy5leHBhbnNpb25TdGF0ZXMuaGFzKGtleSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpdGVtVG9LZXkoaXRlbTogYW55KTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gaXNFbnRpdHkoaXRlbSkgPyAoPEVudGl0eT5pdGVtKS5pZGVudGl0eSgpIDogaXRlbTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRFRTdGF0ZVNlcmlhbGl6YWJsZUhlbHBlclxue1xuICAgIG9mZnNldDogbnVtYmVyO1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgZGlzcGxheUxpbWl0OiBudW1iZXI7XG4gICAgc29ydEtleTogc3RyaW5nO1xuICAgIHNvcnRPcmRlcjogbnVtYmVyO1xuICAgIGN1cnJlbnRTZWFyY2hRdWVyeTogc3RyaW5nO1xuICAgIGN1cnJlbnRGaWx0ZXI/OiBhbnk7XG4gICAgb3V0bGluZVN0YXRlOiBhbnk7XG4gICAgZGV0YWlsUm93RXhwYW5kU3RhdGU6IGFueTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEVEluaXRQYXJhbXMoaW5pdDogRFREU0luaXRQYXJhbXMpOiBpbml0IGlzIERURFNJbml0UGFyYW1zXG57XG4gICAgcmV0dXJuIGlzUHJlc2VudChpbml0Lm9iaikgfHwgaXNQcmVzZW50KGluaXQucXVlcnlUeXBlKSB8fCBpc1ByZXNlbnQoaW5pdC5lbnRpdHkpO1xufVxuXG4vKipcbiAqIFRvIG1ha2UgaW5pdGlhbGl6YXRpb24gZWFzaWVyIHdlIGhhdmUgdGhpcyBjb21tb24gZm9ybWF0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERURFNJbml0UGFyYW1zIGV4dGVuZHMgRFNJbml0UGFyYW1zXG57XG5cbiAgICAvKipcbiAgICAgKiBPYmplY3QgZGVmaW5pdGlvbiBmb3IgdGhlIGRhdGFcbiAgICAgKi9cbiAgICBlbnRpdHk/OiBFbnRpdHlEZWYyO1xuXG4gICAgc3RhdGU/OiBEYXRhdGFibGUyU3RhdGU7XG59XG4iXX0=