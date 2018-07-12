/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
            var /** @type {?} */ copy = this.dataProvider.data().slice();
            copy.push(object);
            this.dataProvider.dataChanges.next(copy);
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
            var /** @type {?} */ copy = this.dataProvider.data().slice();
            var /** @type {?} */ afterDelete = copy.filter(function (elem) { return !equals(elem, object); });
            this.dataProvider.dataChanges.next(afterDelete);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RhdGF0YWJsZTIvZGF0YXRhYmxlMi1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQ0gsTUFBTSxFQUVOLE1BQU0sRUFDTixPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsVUFBVSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxVQUFVLEVBQWUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRSxPQUFPLEVBQTBCLFNBQVMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBR2hGLE9BQU8sRUFBYyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYXRCLHlDQUFVO0lBd0J6Qyx1QkFBbUIsYUFBNkIsRUFBUyxPQUFxQjtRQUE5RSxZQUNJLGtCQUFNLGFBQWEsRUFBRSxPQUFPLENBQUMsU0FLaEM7UUFOa0IsbUJBQWEsR0FBYixhQUFhLENBQWdCO1FBQVMsYUFBTyxHQUFQLE9BQU8sQ0FBYzs0QkFKaEUsS0FBSztRQU9mLEtBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXRDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7S0FDekM7Ozs7O0lBR0QsNEJBQUk7Ozs7SUFBSjtRQUFLLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ2YsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRSxN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O1FBRS9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7UUFFRCxxQkFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxRixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFEO2tDQTdmTDtJQThmQyxDQUFBOzs7Ozs7OztBQS9DRCxtQ0ErQ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUQsTUFBTSx5QkFBeUIsSUFBb0I7SUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3JGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIGFzc2VydCxcbiAgICBFbnRpdHksXG4gICAgZXF1YWxzLFxuICAgIGlzQmxhbmssXG4gICAgaXNFbnRpdHksXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIE1hcFdyYXBwZXJcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEYXRhU291cmNlLCBEU0luaXRQYXJhbXN9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0RhdGFQcm92aWRlcn0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGF0eXBlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtEYXRhRmluZGVyLCBEYXRhRmluZGVycywgUXVlcnlUeXBlfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1maW5kZXJzJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi9kdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7QVdEYXRhVGFibGUsIERyb3BQb3NpdGlvbn0gZnJvbSAnLi9hdy1kYXRhdGFibGUnO1xuXG5cbi8qKlxuICogQ29uY3JldGUgRGF0YVNvdXJjZSBpbXBsZW1lbnRhdGlvbiBmb3IgRGF0YXRhYmxlIHdoaWNoIGRlZmluZXMgc3RhdGUgYW5kIGNvbHVtbiBkZWZpbml0aW9uIHRoYXRcbiAqIGNhbiBwcm9ncmFtbWF0aWNhbGx5IG1vZGlmeSByZW5kZXJlZCBjb2x1bW5zIChpZiBwcm92aWRlZCkgYW5kIG1ldGhvZCBmb3IgaW5zZXJ0aW5nIGFuZFxuICogYW5kIGRlbGV0aW5nIHJlY29yZHM7XG4gKlxuICogQWxsIG9wZXJhdGlvbnMgZGVhbGluZyB3aXRoIGRhdGEgdXNlIE9ic2VydmFibGU8VD4gYW5kIGluc3RhbnQoKSBtZXRob2QgdG8gcmV0cmlldmUgY3VycmVudFxuICogc3RhdGUgaXMgbm90IGltcGxlbWVudGVkLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBEVDJEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XG4gICAgc3RhdGljIHJlYWRvbmx5IE1heExpbWl0ID0gMTAwO1xuXG4gICAgLyoqXG4gICAgICogTWF0Y2hpbmcgZGF0YVByb3ZpZGVycyBhbmQgZmluZGVyc1xuICAgICAqL1xuICAgIGRhdGFQcm92aWRlcjogRGF0YVByb3ZpZGVyPGFueT47XG4gICAgZGF0YUZpbmRlcjogRGF0YUZpbmRlcjtcblxuICAgIC8qKlxuICAgICAqIEtlZXAgdHJhY2sgb2YgY3VycmVudCBkYXRhdGFibGUgc3RhdGVcbiAgICAgKi9cbiAgICBzdGF0ZTogRGF0YXRhYmxlMlN0YXRlO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBvYmplY3QgYmVpbmcgcmVuZGVyZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGVudGl0eTogRW50aXR5RGVmMjtcblxuXG4gICAgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIGRlYnVnVGltZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGFQcm92aWRlcnM/OiBEYXRhUHJvdmlkZXJzLCBwdWJsaWMgZmluZGVycz86IERhdGFGaW5kZXJzKSB7XG4gICAgICAgIHN1cGVyKGRhdGFQcm92aWRlcnMsIGZpbmRlcnMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBEYXRhdGFibGUyU3RhdGUuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5kZWJ1Z1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9XG5cblxuICAgIGluaXQoLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoYXJncykgfHwgYXJncy5sZW5ndGggIT09IDEgJiYgIWlzRFRJbml0UGFyYW1zKGFyZ3NbMF0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIGluaXRpYWxpemUgRFMgd2l0aCAoRFNDaG9vc2VySW5pdFBhcmFtcyknKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5pdDogRFREU0luaXRQYXJhbXMgPSBhcmdzWzBdO1xuXG4gICAgICAgIC8vIHVzZSBleGlzdGluZyBvciBmaW5kIGJlc3QgbWF0Y2ggZm9yIGRhdGFQcm92aWRlclxuICAgICAgICB0aGlzLmRhdGFQcm92aWRlciA9IGlzUHJlc2VudChpbml0LmRhdGFQcm92aWRlcikgPyBpbml0LmRhdGFQcm92aWRlclxuICAgICAgICAgICAgOiB0aGlzLmRhdGFQcm92aWRlcnMuZmluZChpbml0Lm9iaik7XG5cbiAgICAgICAgLy8gdXNlIGV4aXN0aW5nIG9yIGZpbmQgYmVzdCBtYXRjaCBmb3IgZGF0YUZpbmRlclxuICAgICAgICB0aGlzLmRhdGFGaW5kZXIgPSBpc1ByZXNlbnQoaW5pdC5kYXRhRmluZGVyKSA/IGluaXQuZGF0YUZpbmRlclxuICAgICAgICAgICAgOiB0aGlzLmZpbmRlcnMuZmluZCh0aGlzLmRhdGFQcm92aWRlciwgaW5pdC5xdWVyeVR5cGUpO1xuXG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5kYXRhUHJvdmlkZXIpICYmIGlzUHJlc2VudCh0aGlzLmRhdGFGaW5kZXIpLFxuICAgICAgICAgICAgJ0RhdGFTb3VyY2UgaW5jb3JyZWN0bHkgaW5pdGlhbGl6ZWQuIChEYXRhUHJvdmlkZXIsIERhdGFGaW5kZXIpIG1pc3NpbmcuICcpO1xuXG4gICAgICAgIHRoaXMuZGF0YUZpbmRlci5sb29rdXBLZXkgPSBpbml0Lmxvb2t1cEtleTtcbiAgICAgICAgaWYgKGlzQmxhbmsoaW5pdC5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgRGF0YXRhYmxlMlN0YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gaW5pdC5zdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYXN5bmMgZmV0Y2ggZGF0YSByZXF1ZXN0IGFuZCByZXN1bHQgaXMgZ2l2ZW4gYmFjayB1c2luZyBkYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGZldGNoKHdpdGhQYXJhbXM/OiBEYXRhdGFibGUyU3RhdGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG51bGw7XG4gICAgICAgIGlmIChpc1ByZXNlbnQod2l0aFBhcmFtcykpIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IG5ldyBNYXAoKS5zZXQoJ29mZnNldCcsIHdpdGhQYXJhbXMub2Zmc2V0KVxuICAgICAgICAgICAgICAgIC5zZXQoJ2xpbWl0Jywgd2l0aFBhcmFtcy5saW1pdClcbiAgICAgICAgICAgICAgICAuc2V0KCdvcmRlcmJ5Jywgd2l0aFBhcmFtcy5zb3J0S2V5KVxuICAgICAgICAgICAgICAgIC5zZXQoJ3NlbGVjdG9yJywgd2l0aFBhcmFtcy5zb3J0T3JkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuZmV0Y2gocGFyYW1zKS5zdWJzY3JpYmUoKHJlc3VsdDogYW55W10pID0+IHtcbiAgICAgICAgICAgIGlmICh3aXRoUGFyYW1zLm9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5jckRhdGEgPSBbLi4udGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMuZ2V0VmFsdWUoKSwgLi4ucmVzdWx0XTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KGluY3JEYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbXBvbmVudCB1c2VzIHRoaXMgbWV0aG9kIHRvIG9wZW4gdXAgY29udGludW91cyBzdHJlYW0gdG8gbGlzdGVuIGZvciBhbnkgY2hhbmdlcyB3aGljaFxuICAgICAqIG5lZWQgdG8gYmUgcmVmbGVjdGVkIG9uIHRoZSBVSS5cbiAgICAgKlxuICAgICAqIERvbnQgZm9yZ2V0IHRvIHVuc3Vic2NyaWJlIHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAgICAgKi9cbiAgICBvcGVuPFQ+KCk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmRhdGFGaW5kZXIgPSBudWxsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSWYgQ1JVRCBpcyBlbmFibGVkIHdlIGRlbGVnYXRlIGNhbGxzIHRvIERhdGFQcm92aWRlciB0aGF0IGlzIHJlc3BvbnNpYmxlIHRvIHRlbGwgdGhlXG4gICAgICogZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzIHRoYXQgYXJlIG5ldyBkYXRhLiBJZiBub3QgZW5hYmxlZCB3ZSBoYXZlIGRlZmF1bHQgaW1wbGVtZW50YXRpb25cbiAgICAgKiB3aGljaCB3b3JrcyB3aXRoIGxvY2FsIGFycmF5XG4gICAgICpcbiAgICAgKi9cbiAgICBpbnNlcnQob2JqZWN0OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVByb3ZpZGVyLmNhbkNSVUQoKSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuaW5zZXJ0KG9iamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjb3B5ID0gdGhpcy5kYXRhUHJvdmlkZXIuZGF0YSgpLnNsaWNlKCk7XG4gICAgICAgICAgICBjb3B5LnB1c2gob2JqZWN0KTtcblxuICAgICAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dChjb3B5KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUGxlYXNlIHNlZSB7QGxpbmsgaW5zZXJ0fSBtZXRob2RcbiAgICAgKlxuICAgICAqL1xuICAgIHJlbW92ZShvYmplY3Q6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kYXRhUHJvdmlkZXIuY2FuQ1JVRCgpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5yZW1vdmUob2JqZWN0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNvcHkgPSB0aGlzLmRhdGFQcm92aWRlci5kYXRhKCkuc2xpY2UoKTtcbiAgICAgICAgICAgIGxldCBhZnRlckRlbGV0ZSA9IGNvcHkuZmlsdGVyKChlbGVtOiBhbnkpID0+ICFlcXVhbHMoZWxlbSwgb2JqZWN0KSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQoYWZ0ZXJEZWxldGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBQcm92aWRlcyBhY2Nlc3MgdG8gRGF0YUZpbmRlciB3aGljaCBjYW4gYWNjZXB0IGVpdGhlciBwbGFpbiBzdHJpbmcgb3IgTWFwLlxuICAgICAqXG4gICAgICogVG8gYmUgYWJsZSB0byBwcm92aWRlIGNvcnJlY3QgaW5wdXQgd2UgbmVlZCB0byBhc2sgRGF0YUZpbmRlciBpZiBpdCBzdXBwb3J0cyBGdWxsVGV4dCBsaWtlXG4gICAgICogdHlwZSBxdWVyeSBvciBQcmVkaWNhdGUuIEluIGNhc2Ugb2YgUHJlZGljYXRlIHdlIGJ1aWxkIHRoZSBNYXAgd2l0aCBkaWZmZXJlbnQga2V5L3ZhbHVlXG4gICAgICogcGFpcnNcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgZmluZChwYXR0ZXJuPzogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChpc0JsYW5rKHBhdHRlcm4pIHx8IHBhdHRlcm4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSByZWNlaXZlZCBlbXB0eSBzdHJpbmcgcmV0dXJuIG9yZ2luYWwgbGlzdFxuICAgICAgICAgICAgdGhpcy5mZXRjaCh0aGlzLnN0YXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWFyY2hQYXJhbTogYW55ID0gcGF0dGVybjtcbiAgICAgICAgaWYgKHRoaXMuZGF0YUZpbmRlci5hY2NlcHRzKHRoaXMuZGF0YVByb3ZpZGVyLCBRdWVyeVR5cGUuUHJlZGljYXRlKSkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW0gPSBuZXcgTWFwKCkuc2V0KCdxdWVyeScsIHBhdHRlcm4pLnNldCgnbGltaXQnLCBEVDJEYXRhU291cmNlLk1heExpbWl0KTtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0YXRlLnNvcnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW0uc2V0KCdvcmRlcmJ5JywgdGhpcy5zdGF0ZS5zb3J0S2V5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0YXRlLnNvcnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW0uc2V0KCdzZWxlY3RvcicsIHRoaXMuc3RhdGUuc29ydE9yZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFzc2VydChpc1N0cmluZyhwYXR0ZXJuKSwgJ0Nhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdmFsdWUgdG8gRnVsbFRleHQgRmluZGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGFGaW5kZXIubWF0Y2g8YW55PihzZWFyY2hQYXJhbSkuc3Vic2NyaWJlKChyZXN1bHQ6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEYXRhIHNvdXJjZSBkZWxlZ2F0ZXMgdGhlIHJlc3BvbnNpYmlsaXR5IHRvIHRoZSBnaXZlbiBkYXRhIHByb3ZpZGVyIHdoaWNoIG5lZWRzIHRvIGltcGxlbWVudFxuICAgICAqIHNwZWNpZmljIHNvcnRpbmcgbWVjaGFuaXNtXG4gICAgICpcbiAgICAgKiBUb2RvOiBFeHRlbmQgdG8gc29ydCBieSBtdWx0aXBsZSBjb2x1bW5zXG4gICAgICpcbiAgICAgKi9cbiAgICBzb3J0KGtleTogc3RyaW5nLCBzb3J0T3JkZXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmRhdGFQcm92aWRlci5kYXRhKCkpIHx8IHRoaXMuZGF0YVByb3ZpZGVyLmRhdGEoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlLnNvcnRLZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc3RhdGUuc29ydE9yZGVyID0gc29ydE9yZGVyO1xuICAgICAgICB0aGlzLmZldGNoKHRoaXMuc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUGVyc2lzdCBkYiBzdGF0ZVxuICAgICAqXG4gICAgICovXG4gICAgdXBkYXRlU3RhdGUob2Zmc2V0OiBudW1iZXIsIHNvcnRGaWVsZDogc3RyaW5nLCBzT3JkZXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgdGhpcy5zdGF0ZS5zb3J0S2V5ID0gc29ydEZpZWxkO1xuICAgICAgICB0aGlzLnN0YXRlLnNvcnRPcmRlciA9IHNPcmRlcjtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogcmVzaHVmZmxlcyBjdXJyZW50IGFycmF5IGJhc2VkIG9uIG5ldyByb3cgRCZEIHJlc3VsdC5cbiAgICAgKlxuICAgICAqIFNpbmNlIHRoZXJlIGlzIGEgZGlmZmVyZW5jZSBpZiB3ZSBtb3ZlIGl0ZW0gZnJvbSBib3R0b20gb3IgZnJvbSB0aGUgdG9wIGFuZCB0aGVuIGFjY29yZGluZ2x5XG4gICAgICogaGlnaGxpZ2h0aW5nIGEgc3BhY2UgYmV0d2VlbiByb3dzLiBXZSBuZWVkIHRvIHJlZmxlY3QgdGhpcyBpbiBoZXJlIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKiBVc2VDYXNlIDE6XG4gICAgICpcbiAgICAgKiAxLiBZb3UgY2FuIGdyYWIgaXRlbSB3aXRoIGluZGV4IDAgYW5kIG1vdmUgaXQgZG93biBzbyB0aGF0IHlvdSBjYW4gc2VlIGEgZHJvcHBpbmcgbGluZVxuICAgICAqIGJldHdlZW4gcm93IHdpdGggaW5kZXggMiAtIDNcbiAgICAgKlxuICAgICAqIDIuIEluIHRoaXMgY2FzZSBzcGxpY2UoKSBzdGFydHMgZnJvbSBwb3NpdGlvbiAyIGFuZCBpbnNlcnQgYWxsIGVsZW1lbnRzIGFmdGVyIDJcbiAgICAgKiAgICAgIHNwbGljZShzdGFydDogbnVtYmVyLCBkZWxldGVDb3VudDogbnVtYmVyLCAuLi5pdGVtczogVFtdKTogVFtdO1xuICAgICAqXG4gICAgICogMy4gbm8gbmVlZCB0byB1cGRhdGUgbmV3UG9zXG4gICAgICpcbiAgICAgKiBVc2VDYXNlIDI6XG4gICAgICpcbiAgICAgKiAxLiBZb3UgY2FuIGdyYWIgaXRlbSB3aXRoIGluZGV4IDAgYW5kIG1vdmUgYWxsIHRoZSB3YXkgZG93biBvZiB0aGUgRFQgYW5kIG5vdyBtb3ZlIHRoZVxuICAgICAqIHJvdyB0b3dhcmQgVE9QIGFuZCBzcGFjZSBiZXR3ZWVuIHJvd3Mgd2l0aCBpbmRleCAyIC0gMyBpcyBoaWdobGlnaHRlZCBhZ2Fpbi5cbiAgICAgKlxuICAgICAqIDIuIEhlcmUgaXMgdGhlIGRpZmZlcmVuY2UsIGJlZm9yZSB3ZSBoaWdobGlnaHRlZCByb3cgIzIgd2l0aCBsaW5lIGF0IHRoZSBib3R0b20sIG5vd1xuICAgICAqIGl0IHNlZW1zIHRoZSBzYW1lIGJ1dCBpdHMgaGlnaGxpZ2h0ZWQgcm93ICMzIHdpdGggbGluZSBhdCB0aGUgVE9QLlxuICAgICAqXG4gICAgICogKiBUaGlzIGlzIHRoZSByZWFzb24gd2hleSB3ZSBuZWVkIHRvIGRvIG5ld1BvcyAtPSAxIG9yIG5ld1BvcyArPSAxOyBkZXBlbmRpbmcgb3VyIGRpcmVjdGlvblxuICAgICAqIHdoZXJlIHdoZXJlIHRoZSBsaW5lIGJldHdlZW4gcm93cyBpcyBjcmVhdGVkLlxuICAgICAqXG4gICAgICpcbiAgICAgKiBXZSBkb24ndCBuZWVkIGFueSBjb21wbGljYXRlZCBjYWxjdWxhdGlvbiB0cnlpbmcgdG8gZmluZCBvdXQgaWYgd2UgYXJlIG9uIG9uZSBoYWxmIG9mIHRoZSByb3dcbiAgICAgKiBvciBzZWNvbmQgaGFsZiBhbmQgYmFzZWQgb24gdGhpcyB0cnkgdG8gYXBwbHkgY2VydGFpbiBzdHlsZS4gVGhpcyB3b3VsZCBub3QgZ2l2ZSBzbyBtdWNoXG4gICAgICogc3BhY2UgaWYgd2Ugd2FudCBkcm9wIHJvdyBpbnRvIHRoZSByb3cuIEFuZCB0aGUgY2FsY3VsYXRpb24gd2l0aCBjb29yZGluYXRlcyB3b3VkbCBiZSB0b29cbiAgICAgKiBjb21wbGljYXRlZC5cbiAgICAgKlxuICAgICAqIFdlIHNpbXBseSByZW1lbWJlciB0aGUgZGlyZWN0aW9uIHdlIGFyZSBtb3ZpbmcgYW5kIGJhc2VkIG9uIHRoaXMgd2UgYXBwbHkgc3R5bGUgdG9cbiAgICAgKiB0byBjcmVhdGUgYSBsaW5lIGF0IHRoZSBUT1AgaWYgd2UgYXJlIGdvaW5nIHVwd2FyZHMgb3IgYm90dG9tIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcmVvcmRlclJvd3Mob3JpZ1BvczogbnVtYmVyLCBuZXdQb3M6IG51bWJlciwgZHJvcFBvczogRHJvcFBvc2l0aW9uKTogdm9pZCB7XG4gICAgICAgIGxldCBhcnJheSA9IHRoaXMuZGF0YVByb3ZpZGVyLmRhdGEoKS5zbGljZSgpO1xuXG4gICAgICAgIC8vIHRha2Ugc29tZXRoaW5nIGZyb20gdG9wIGFuZCBkcmFnJmRyb3AgdW5kZXJcbiAgICAgICAgaWYgKG5ld1BvcyA+IG9yaWdQb3MgJiYgZHJvcFBvcyA9PT0gRHJvcFBvc2l0aW9uLkJlZm9yZSAmJiBuZXdQb3MgPCBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5ld1BvcyAtPSAxO1xuXG4gICAgICAgICAgICAvLyB0YWtlIHNvbWV0aGluZyBmcm9tIGJvdHRvbSBhbmQgZHJhZyZkcm9wIGFib3ZlXG4gICAgICAgIH0gZWxzZSBpZiAobmV3UG9zIDwgb3JpZ1BvcyAmJiBkcm9wUG9zID09PSBEcm9wUG9zaXRpb24uQWZ0ZXIgJiYgbmV3UG9zID49IDApIHtcbiAgICAgICAgICAgIG5ld1BvcyArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJyYXkuc3BsaWNlKG5ld1BvcywgMCwgLi4uYXJyYXkuc3BsaWNlKG9yaWdQb3MsIDEpWzBdKTtcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dChhcnJheSk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogRW50aXR5IGRlZmluaXRpb24gdG8gYmUgdXNlZCB0byBpbml0aWFsaXplIHByb2dyYW1tYXRpY2FsbHkgY29sdW1uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eURlZjIge1xuICAgIHByb3BlcnR5S2V5czogc3RyaW5nW107XG5cbiAgICBkZWZhdWx0Rm9ybWF0dGVyOiAoa2V5OiBhbnkpID0+IHN0cmluZztcblxuICAgIGRpc3BsYXlTdHJpbmdGb3JLZXk6IChrZXk6IHN0cmluZykgPT4gc3RyaW5nO1xuXG4gICAgZGVmYXVsdEFsaWdubWVudEZvcktleTogKGtleTogc3RyaW5nKSA9PiBzdHJpbmc7XG59XG5cbi8qKlxuICogS2VlcHMgY3VycmVudCBkYXRhdGFibGUgc3RhdGUgdGhlIHN0YXRlIHdoaWNoIGRyaXZlcnMgdGhlIHdheSB3aGlsZSBmZXRjaGluZyB0aGUgZGF0YSBhcyB3ZWxsXG4gKiBlbmNhcHN1bGF0ZSBzZXQgb2YgcHJvcGVydGllcyB0aGF0IG5lZWRzIHRvIGJlIHBlcnNpc3RldCBpbiBvcmRlciB0byByZWNvdmVyIGEgc3RhdGUgYWZ0ZXIgZS5nLlxuICogYnJvd3NlciByZWZyZXNoXG4gKlxuICpcbiAqIHRvZG86IENyZWF0ZSBtZXRob2RzIHRvIGNvbnZlcnQgdGhpcyBzdGF0ZSBmcm9tIGFuZCB0byBKU09OIGZvciBlYXNpZXIgc2VyaWFsaXphdGlvblxuICovXG5leHBvcnQgY2xhc3MgRGF0YXRhYmxlMlN0YXRlIHtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFzY2VuZGluZyA9IDE7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZXNjZW5kaW5nID0gLTE7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIGZvciBwYWdpbmcgYW5kIGZldGNoaW5nXG4gICAgICovXG4gICAgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgIGxpbWl0OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBkZWZhdWx0IHZhbHVlIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgTiBudW1iZXIgb2Ygcm93cyBpbiBub24tZnVsbHNjcmVlblxuICAgICAqIG1vZGVcbiAgICAgKlxuICAgICAqL1xuICAgIGRpc3BsYXlMaW1pdDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgc29ydGluZyBmaWVsZFxuICAgICAqL1xuICAgIHNvcnRLZXk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNvcnRpbmcgb3JkZXIgb2YgdGhlIHNvcnQgZmllbGQuIERhdGFUYWJsZSBzdXBwb3J0IHNvcnRpbmcgZm9yIG11bHRpcGxlIGNvbHVtbiBidXQgd2VcbiAgICAgKiBkb250IHBlcnNpc3QgaXQgbm93LiBNYXliZSBpbiB0aGUgZnV0dXJlXG4gICAgICovXG4gICAgc29ydE9yZGVyOiBudW1iZXIgPSBEYXRhdGFibGUyU3RhdGUuQXNjZW5kaW5nO1xuXG4gICAgLyoqXG4gICAgICogSWYgd2UgYXJlIHVzaW5nIGdsb2JhbCBmaWx0ZXIgZm9yIGN1cnJlbnQgZGF0YXRhYmxlIHRoZW4gc2F2ZSBpdCBoZXJlXG4gICAgICovXG4gICAgY3VycmVudFNlYXJjaFF1ZXJ5OiBzdHJpbmcgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgaWYgYW55IHByZXNlbGVjdGVkIGZpbHRlclxuICAgICAqL1xuICAgIGN1cnJlbnRGaWx0ZXI6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFJlcHJlc2VudCBjdXJyZW50IHNlbGVjdGlvbiBkZXBlbmRpbmcgb24gc2VsZWN0aW9uIG1vZGUuXG4gICAgICpcbiAgICAgKiBDdXJyZW50IHNlbGVjdGlvbiB1c2VkIGJvdGggZm9yIHJvdyBzZWxlY3Rpb24gYW5kIGNlbGwgc2VsZWN0aW9uLiBSb3cgc2VsZWN0aW9uIGlzIHVzZWQgd2hlblxuICAgICAqIFNpbmdsZVNlbGVjdCBhbmQgTXVsdGlTZWxlY3Qgb25jZSB3ZSBpbXBsZW1lbnQgdGhpcy5cbiAgICAgKlxuICAgICAqL1xuICAgIHNlbGVjdGlvbjogYW55O1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGhlYWRlciBzZWxlY3Rpb24gaXMgZW5hYmxlZCBpdCBjYXB0dXJlcyBjdXJyZW50bHkgc2VsZWN0ZWQgY29sdW1uXG4gICAgICovXG4gICAgaGVhZGVyU2VsZWN0aW9uOiBEVENvbHVtbjJDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIEhvbGRzIGN1cnJlbnQgc3RhdGUgb2YgdGhlIG91dGxpbmUgdHJlZSBpZiB1c2VkXG4gICAgICpcbiAgICAgKi9cbiAgICBvdXRsaW5lU3RhdGU/OiBNYXA8YW55LCBib29sZWFuPjtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIEhvbGRzIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGRldGFpbCByb3dzIGlmIHVzZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGRldGFpbFJvd0V4cGFuZFN0YXRlPzogTWFwPGFueSwgYm9vbGVhbj47XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm91dGxpbmVTdGF0ZSA9IG5ldyBNYXA8YW55LCBib29sZWFuPigpO1xuICAgICAgICB0aGlzLmRldGFpbFJvd0V4cGFuZFN0YXRlID0gbmV3IE1hcDxhbnksIGJvb2xlYW4+KCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZShvZmZzZXQ6IG51bWJlciA9IDAsIGxpbWl0OiBudW1iZXIgPSAxNSwgZGlzcGxheUxpbWl0OiBudW1iZXIgPSA1LFxuICAgICAgICAgICAgICAgICAgc29ydEZpZWxkOiBzdHJpbmcgPSAnJywgc09yZGVyOiBudW1iZXIgPSAwLCBzZWFyY2hRdWVyeT86IHN0cmluZywgZmlsdGVyPzogYW55LFxuICAgICAgICAgICAgICAgICAgb3V0bGluZVN0YXRlOiBNYXA8YW55LCBib29sZWFuPiA9IG5ldyBNYXA8YW55LCBib29sZWFuPigpLFxuICAgICAgICAgICAgICAgICAgZGV0YWlsUm93U3RhdGU6IE1hcDxhbnksIGJvb2xlYW4+ID0gbmV3IE1hcDxhbnksIGJvb2xlYW4+KCkpOiBEYXRhdGFibGUyU3RhdGUge1xuICAgICAgICBsZXQgcyA9IG5ldyBEYXRhdGFibGUyU3RhdGUoKTtcbiAgICAgICAgcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIHMubGltaXQgPSBsaW1pdDtcbiAgICAgICAgcy5kaXNwbGF5TGltaXQgPSBkaXNwbGF5TGltaXQ7XG4gICAgICAgIHMuc29ydEtleSA9IHNvcnRGaWVsZDtcbiAgICAgICAgcy5zb3J0T3JkZXIgPSBzT3JkZXI7XG4gICAgICAgIHMuY3VycmVudFNlYXJjaFF1ZXJ5ID0gc2VhcmNoUXVlcnk7XG4gICAgICAgIHMuY3VycmVudEZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgcy5vdXRsaW5lU3RhdGUgPSBvdXRsaW5lU3RhdGU7XG4gICAgICAgIHMuZGV0YWlsUm93RXhwYW5kU3RhdGUgPSBkZXRhaWxSb3dTdGF0ZTtcblxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbUpTT04oZGF0YTogc3RyaW5nKTogRGF0YXRhYmxlMlN0YXRlIHtcbiAgICAgICAgbGV0IHN0YXRlOiBEVFN0YXRlU2VyaWFsaXphYmxlSGVscGVyID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgbGV0IGRzID0gbmV3IERhdGF0YWJsZTJTdGF0ZSgpO1xuICAgICAgICBkcy5vZmZzZXQgPSBzdGF0ZS5vZmZzZXQ7XG4gICAgICAgIGRzLmxpbWl0ID0gc3RhdGUubGltaXQ7XG4gICAgICAgIGRzLmRpc3BsYXlMaW1pdCA9IHN0YXRlLmRpc3BsYXlMaW1pdDtcbiAgICAgICAgZHMuc29ydEtleSA9IHN0YXRlLnNvcnRLZXk7XG4gICAgICAgIGRzLnNvcnRPcmRlciA9IHN0YXRlLnNvcnRPcmRlcjtcbiAgICAgICAgZHMuY3VycmVudFNlYXJjaFF1ZXJ5ID0gc3RhdGUuY3VycmVudFNlYXJjaFF1ZXJ5O1xuICAgICAgICBkcy5vdXRsaW5lU3RhdGUgPSBNYXBXcmFwcGVyLmNyZWF0ZUZyb21BbnlNYXA8Ym9vbGVhbj4oc3RhdGUub3V0bGluZVN0YXRlKTtcbiAgICAgICAgZHMuZGV0YWlsUm93RXhwYW5kU3RhdGUgPSBNYXBXcmFwcGVyLmNyZWF0ZUZyb21BbnlNYXA8Ym9vbGVhbj4oc3RhdGUuZGV0YWlsUm93RXhwYW5kU3RhdGUpO1xuXG4gICAgICAgIHJldHVybiBkcztcbiAgICB9XG5cblxuICAgIHN0YXRpYyB0b0pTT04oZGF0YTogRGF0YXRhYmxlMlN0YXRlKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHRvQ29udmVydDogRFRTdGF0ZVNlcmlhbGl6YWJsZUhlbHBlciA9IHtcbiAgICAgICAgICAgIG9mZnNldDogZGF0YS5vZmZzZXQsXG4gICAgICAgICAgICBsaW1pdDogZGF0YS5saW1pdCxcbiAgICAgICAgICAgIGRpc3BsYXlMaW1pdDogZGF0YS5kaXNwbGF5TGltaXQsXG4gICAgICAgICAgICBzb3J0S2V5OiBkYXRhLnNvcnRLZXksXG4gICAgICAgICAgICBzb3J0T3JkZXI6IGRhdGEuc29ydE9yZGVyLFxuICAgICAgICAgICAgY3VycmVudFNlYXJjaFF1ZXJ5OiBkYXRhLmN1cnJlbnRTZWFyY2hRdWVyeSxcbiAgICAgICAgICAgIG91dGxpbmVTdGF0ZTogTWFwV3JhcHBlci50b0FueU1hcChkYXRhLm91dGxpbmVTdGF0ZSksXG4gICAgICAgICAgICBkZXRhaWxSb3dFeHBhbmRTdGF0ZTogTWFwV3JhcHBlci50b0FueU1hcChkYXRhLmRldGFpbFJvd0V4cGFuZFN0YXRlKVxuXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0b0NvbnZlcnQpO1xuICAgIH1cblxufVxuXG5cbi8qKlxuICogVGhpcyBuZWVkcyB0byBnbyB0byBEVERhdGFTb3VyY2UgdG8ga2VlcCBhbmQgbWFuYWdlIHRoZSBzdGF0ZSBvZiB0aGUgZGV0YWlsIHJvdy4gVGhlIGlkZWEgaXNcbiAqIHNpbXBsZSB3ZSBoYXZlIGEgbWFwIGhvbGRpbmcgaXRlbSByZWZlcmVuY2UgYXMgYSBrZXkgYW5kIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyBpZiB0aGVcbiAqIGRldGFpbCByb3cgaXMgdmlzaWJsZVxuICpcbiAqIFRvZG86IG1vdmUgdGhpcyBvdXQgdG8gRFNcbiAqL1xuZXhwb3J0IGNsYXNzIERldGFpbFJvd0V4cGFuc2lvblN0YXRlIHtcblxuICAgIGV4cGFuc2lvblN0YXRlczogTWFwPGFueSwgYm9vbGVhbj47XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZHQ6IEFXRGF0YVRhYmxlKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpdGVtVG9LZXkoaXRlbTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGlzRW50aXR5KGl0ZW0pID8gKDxFbnRpdHk+aXRlbSkuaWRlbnRpdHkoKSA6IGl0ZW07XG4gICAgfVxuXG4gICAgZ2V0IGRldGFpbEV4cGFuc2lvbkVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5leHBhbnNpb25TdGF0ZXMpO1xuICAgIH1cblxuICAgIHNldCBkZXRhaWxFeHBhbnNpb25FbmFibGVkKHZhbHVlOiBib29sZWFuKSB7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcyA9IG5ldyBNYXA8YW55LCBib29sZWFuPigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5leHBhbnNpb25TdGF0ZXMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5pdGVtVG9LZXkoaXRlbSk7XG4gICAgICAgIGlmICghdGhpcy5pc0V4cGFuZGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcy5zZXQoa2V5LCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uU3RhdGVzLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kdC5kYXRhU291cmNlLnN0YXRlLmRldGFpbFJvd0V4cGFuZFN0YXRlID0gdGhpcy5leHBhbnNpb25TdGF0ZXM7XG4gICAgfVxuXG4gICAgaXNFeHBhbmRlZChpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuaXRlbVRvS2V5KGl0ZW0pO1xuICAgICAgICAvLyBoYW5kbGUgc3BlY2lhbCBjYXNlIHdoZXJlIHdlIGNvbGxhcHNlIHBhcmVudCBvZiBwYXJlbnQgd2hpbGUgZGV0YWlsIHJvdyBpcyBleHBhbmRlZFxuICAgICAgICBpZiAodGhpcy5kdC5pc091dGxpbmUoKSAmJiAhdGhpcy5kdC5vdXRsaW5lU3RhdGUuaXNFeHBhbmRlZChrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvblN0YXRlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpc091dGxpbmVFeHBhbmRlZCA9IHRoaXMuZHQuaXNPdXRsaW5lKCkgPyB0aGlzLmR0Lm91dGxpbmVTdGF0ZS5pc0V4cGFuZGVkKGtleSkgOiB0cnVlO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGtleSkgJiYgdGhpcy5leHBhbnNpb25TdGF0ZXMuaGFzKGtleSk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERUU3RhdGVTZXJpYWxpemFibGVIZWxwZXIge1xuICAgIG9mZnNldDogbnVtYmVyO1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgZGlzcGxheUxpbWl0OiBudW1iZXI7XG4gICAgc29ydEtleTogc3RyaW5nO1xuICAgIHNvcnRPcmRlcjogbnVtYmVyO1xuICAgIGN1cnJlbnRTZWFyY2hRdWVyeTogc3RyaW5nO1xuICAgIGN1cnJlbnRGaWx0ZXI/OiBhbnk7XG4gICAgb3V0bGluZVN0YXRlOiBhbnk7XG4gICAgZGV0YWlsUm93RXhwYW5kU3RhdGU6IGFueTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEVEluaXRQYXJhbXMoaW5pdDogRFREU0luaXRQYXJhbXMpOiBpbml0IGlzIERURFNJbml0UGFyYW1zIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KGluaXQub2JqKSB8fCBpc1ByZXNlbnQoaW5pdC5xdWVyeVR5cGUpIHx8IGlzUHJlc2VudChpbml0LmVudGl0eSk7XG59XG5cbi8qKlxuICogVG8gbWFrZSBpbml0aWFsaXphdGlvbiBlYXNpZXIgd2UgaGF2ZSB0aGlzIGNvbW1vbiBmb3JtYXQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRFREU0luaXRQYXJhbXMgZXh0ZW5kcyBEU0luaXRQYXJhbXMge1xuXG4gICAgLyoqXG4gICAgICogT2JqZWN0IGRlZmluaXRpb24gZm9yIHRoZSBkYXRhXG4gICAgICovXG4gICAgZW50aXR5PzogRW50aXR5RGVmMjtcblxuICAgIHN0YXRlPzogRGF0YXRhYmxlMlN0YXRlO1xufVxuIl19