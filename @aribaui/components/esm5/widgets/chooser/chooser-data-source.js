/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DataSource } from '../../core/data/data-source';
import { ChooserState } from './chooser-state';
import { assert, isArray, isBlank, isPresent, ListWrapper } from '@aribaui/core';
/**
 * Concrete DataSource implementation for the Chooser component. There are two ways how to use it:
 *
 * 1) You can use default DataSource injected inside component constructor and just call
 * initialize to configure it with correct DataProvider and DataFinder:
 *
 *
 * ```
 *   this.dataSource.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 * and then you can use it to simply retrieve data or run queries.
 *
 * 2) You will instantiate your own DataSource and pass it into the component using [dataSource]
 * binding
 *
 * ```
 *
 *   this.ds = new ChooserDataSource(this.data, this.finders);
 *   this.ds.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 *
 */
var /**
 * Concrete DataSource implementation for the Chooser component. There are two ways how to use it:
 *
 * 1) You can use default DataSource injected inside component constructor and just call
 * initialize to configure it with correct DataProvider and DataFinder:
 *
 *
 * ```
 *   this.dataSource.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 * and then you can use it to simply retrieve data or run queries.
 *
 * 2) You will instantiate your own DataSource and pass it into the component using [dataSource]
 * binding
 *
 * ```
 *
 *   this.ds = new ChooserDataSource(this.data, this.finders);
 *   this.ds.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 *
 */
ChooserDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(ChooserDataSource, _super);
    function ChooserDataSource(dataProviders, finders) {
        var _this = _super.call(this, dataProviders, finders) || this;
        _this.dataProviders = dataProviders;
        _this.finders = finders;
        return _this;
    }
    /**
     * To initialize this DataSource with current DataFinder and Provider as well as state we use
     * an interface DSChooserInitParams to have all init values typed checked
     *
     *
     */
    /**
     * To initialize this DataSource with current DataFinder and Provider as well as state we use
     * an interface DSChooserInitParams to have all init values typed checked
     *
     *
     * @param {...?} args
     * @return {?}
     */
    ChooserDataSource.prototype.init = /**
     * To initialize this DataSource with current DataFinder and Provider as well as state we use
     * an interface DSChooserInitParams to have all init values typed checked
     *
     *
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isBlank(args) || args.length !== 1 && !isDSChooserInitParams(args[0])) {
            throw new Error('You need to initialize DS with (DSChooserInitParams)');
        }
        /** @type {?} */
        var init = args[0];
        this.dataProvider = isPresent(init.dataProvider) ? init.dataProvider
            : this.dataProviders.find(init.obj);
        this.dataFinder = isPresent(init.dataFinder) ? init.dataFinder
            : this.finders.find(this.dataProvider, init.queryType);
        assert(isPresent(this.dataProvider) && isPresent(this.dataFinder), 'DataSource incorrectly initialized. (DataProvider, DataFinder) missing. ');
        if (isPresent(init.state)) {
            this.state = init.state;
        }
        else {
            this.state = new ChooserState(null, init.multiselect);
        }
        this.dataFinder.lookupKey = init.lookupKey;
        this.state.lookupKey = init.lookupKey;
    };
    /**
     * @param {?} pattern
     * @param {?} max
     * @return {?}
     */
    ChooserDataSource.prototype.find = /**
     * @param {?} pattern
     * @param {?} max
     * @return {?}
     */
    function (pattern, max) {
        var _this = this;
        this.state.pattern = pattern;
        this.state.lastFullMatchPattern = pattern;
        if (pattern.length === 0) {
            return;
        }
        if (pattern === '*') {
            // query everything
            pattern = '';
        }
        /** @type {?} */
        var origKey = this.dataFinder.lookupKey;
        this.dataFinder.lookupKey = this.state.lookupKey;
        this.dataFinder.forData(this.dataProvider).match(pattern, max)
            .subscribe(function (result) {
            _this.state.matches = result;
            if (_this.state.multiselect) {
                for (var i = 0; i < _this.state.selectedObjects().length; i++) {
                    /** @type {?} */
                    var item = _this.state.selectedObjects()[i];
                    ListWrapper.removeIfExist(_this.state.matches, item);
                }
            }
            _this.dataFinder.lookupKey = origKey;
        });
    };
    /**
     *
     * When multiselect this method checks if we need to show SHOW MORE label under the selected
     * items. We do not want show e.g. 50 selection under the chooser that would take up whole
     * page.
     *
     */
    /**
     *
     * When multiselect this method checks if we need to show SHOW MORE label under the selected
     * items. We do not want show e.g. 50 selection under the chooser that would take up whole
     * page.
     *
     * @return {?}
     */
    ChooserDataSource.prototype.showMoreSelected = /**
     *
     * When multiselect this method checks if we need to show SHOW MORE label under the selected
     * items. We do not want show e.g. 50 selection under the chooser that would take up whole
     * page.
     *
     * @return {?}
     */
    function () {
        return this.state.selectedObjects().length >= DataSource.MaxRecentSelected;
    };
    /**
     * @template T
     * @return {?}
     */
    ChooserDataSource.prototype.open = /**
     * @template T
     * @return {?}
     */
    function () {
        return this.dataProvider.dataChanges.asObservable();
    };
    /**
     * @return {?}
     */
    ChooserDataSource.prototype.close = /**
     * @return {?}
     */
    function () {
        this.dataProvider = null;
        this.dataFinder = null;
        this.state = null;
    };
    /**
     * @template T
     * @return {?}
     */
    ChooserDataSource.prototype.instant = /**
     * @template T
     * @return {?}
     */
    function () {
        return this.dataProvider.data();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ChooserDataSource.prototype.updateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.state.addMode = true;
        if (isArray(value)) {
            /** @type {?} */
            var items = value;
            items.forEach(function (item) { return _this.state.updatedSelectedObjects(item); });
        }
        else {
            this.state.updatedSelectedObjects(value);
        }
        this.state.addMode = false;
    };
    Object.defineProperty(ChooserDataSource.prototype, "lookupKey", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dataFinder.lookupKey;
        },
        enumerable: true,
        configurable: true
    });
    return ChooserDataSource;
}(DataSource));
/**
 * Concrete DataSource implementation for the Chooser component. There are two ways how to use it:
 *
 * 1) You can use default DataSource injected inside component constructor and just call
 * initialize to configure it with correct DataProvider and DataFinder:
 *
 *
 * ```
 *   this.dataSource.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 * and then you can use it to simply retrieve data or run queries.
 *
 * 2) You will instantiate your own DataSource and pass it into the component using [dataSource]
 * binding
 *
 * ```
 *
 *   this.ds = new ChooserDataSource(this.data, this.finders);
 *   this.ds.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 *
 */
export { ChooserDataSource };
if (false) {
    /**
     * Matching dataProviders and finders
     * @type {?}
     */
    ChooserDataSource.prototype.dataProvider;
    /** @type {?} */
    ChooserDataSource.prototype.dataFinder;
    /**
     * Special object to keep current state of this chooser
     * @type {?}
     */
    ChooserDataSource.prototype.state;
    /** @type {?} */
    ChooserDataSource.prototype.dataProviders;
    /** @type {?} */
    ChooserDataSource.prototype.finders;
}
/**
 * @param {?} init
 * @return {?}
 */
export function isDSChooserInitParams(init) {
    return isPresent(init.obj) || isPresent(init.queryType);
}
/**
 * To make initialization easier we have this common format.
 * @record
 */
export function DSChooserInitParams() { }
/**
 * Chooser state keeping information what is currently selected , result of the last match
 * @type {?|undefined}
 */
DSChooserInitParams.prototype.state;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Nob29zZXIvY2hvb3Nlci1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQWtCQSxPQUFPLEVBQUMsVUFBVSxFQUFlLE1BQU0sNkJBQTZCLENBQUM7QUFLckUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0MvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBdUMsNkNBQVU7SUFnQjdDLDJCQUFtQixhQUE0QixFQUFTLE9BQW9CO1FBQTVFLFlBRUksa0JBQU0sYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUNoQztRQUhrQixtQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFTLGFBQU8sR0FBUCxPQUFPLENBQWE7O0tBRzNFO0lBR0Q7Ozs7O09BS0c7Ozs7Ozs7OztJQUNILGdDQUFJOzs7Ozs7OztJQUFKO1FBQUssY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFFZixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1NBQzNFOztRQUNELElBQUksSUFBSSxHQUF3QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEMsSUFBSSxD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Qzs7O09BQUE7NEJBbk1MO0VBOER1QyxVQUFVLEVBc0loRCxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdElELDZCQXNJQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCxNQUFNLGdDQUFnQyxJQUF5QjtJQUUzRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQzNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHtEYXRhU291cmNlLCBEU0luaXRQYXJhbXN9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0RhdGFGaW5kZXIsIERhdGFGaW5kZXJzfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1maW5kZXJzJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RhdGFQcm92aWRlcn0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGF0eXBlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtDaG9vc2VyU3RhdGV9IGZyb20gJy4vY2hvb3Nlci1zdGF0ZSc7XG5pbXBvcnQge2Fzc2VydCwgaXNBcnJheSwgaXNCbGFuaywgaXNQcmVzZW50LCBMaXN0V3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cbi8qKlxuICogQ29uY3JldGUgRGF0YVNvdXJjZSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIENob29zZXIgY29tcG9uZW50LiBUaGVyZSBhcmUgdHdvIHdheXMgaG93IHRvIHVzZSBpdDpcbiAqXG4gKiAxKSBZb3UgY2FuIHVzZSBkZWZhdWx0IERhdGFTb3VyY2UgaW5qZWN0ZWQgaW5zaWRlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciBhbmQganVzdCBjYWxsXG4gKiBpbml0aWFsaXplIHRvIGNvbmZpZ3VyZSBpdCB3aXRoIGNvcnJlY3QgRGF0YVByb3ZpZGVyIGFuZCBEYXRhRmluZGVyOlxuICpcbiAqXG4gKiBgYGBcbiAqICAgdGhpcy5kYXRhU291cmNlLmluaXQoe1xuICogICAgICAgICAgICAgICBvYmo6IHRoaXMubGlzdCxcbiAqICAgICAgICAgICAgICAgcXVlcnlUeXBlOiBRdWVyeVR5cGUuRnVsbFRleHQsXG4gKiAgICAgICAgICAgICAgIHN0YXRlOiBudWxsLFxuICogICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdGhpcy5tdWx0aXNlbGVjdFxuICogICAgICAgICAgIH0pO1xuICpcbiAqIGBgYFxuICpcbiAqIGFuZCB0aGVuIHlvdSBjYW4gdXNlIGl0IHRvIHNpbXBseSByZXRyaWV2ZSBkYXRhIG9yIHJ1biBxdWVyaWVzLlxuICpcbiAqIDIpIFlvdSB3aWxsIGluc3RhbnRpYXRlIHlvdXIgb3duIERhdGFTb3VyY2UgYW5kIHBhc3MgaXQgaW50byB0aGUgY29tcG9uZW50IHVzaW5nIFtkYXRhU291cmNlXVxuICogYmluZGluZ1xuICpcbiAqIGBgYFxuICpcbiAqICAgdGhpcy5kcyA9IG5ldyBDaG9vc2VyRGF0YVNvdXJjZSh0aGlzLmRhdGEsIHRoaXMuZmluZGVycyk7XG4gKiAgIHRoaXMuZHMuaW5pdCh7XG4gKiAgICAgICAgICAgICAgIG9iajogdGhpcy5saXN0LFxuICogICAgICAgICAgICAgICBxdWVyeVR5cGU6IFF1ZXJ5VHlwZS5GdWxsVGV4dCxcbiAqICAgICAgICAgICAgICAgc3RhdGU6IG51bGwsXG4gKiAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0aGlzLm11bHRpc2VsZWN0XG4gKiAgICAgICAgICAgfSk7XG4gKlxuICogYGBgXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENob29zZXJEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZVxue1xuXG4gICAgLyoqXG4gICAgICogTWF0Y2hpbmcgZGF0YVByb3ZpZGVycyBhbmQgZmluZGVyc1xuICAgICAqL1xuICAgIHByaXZhdGUgZGF0YVByb3ZpZGVyOiBEYXRhUHJvdmlkZXI8YW55PjtcbiAgICBwcml2YXRlIGRhdGFGaW5kZXI6IERhdGFGaW5kZXI7XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpYWwgb2JqZWN0IHRvIGtlZXAgY3VycmVudCBzdGF0ZSBvZiB0aGlzIGNob29zZXJcbiAgICAgKi9cbiAgICBzdGF0ZTogQ2hvb3NlclN0YXRlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YVByb3ZpZGVyczogRGF0YVByb3ZpZGVycywgcHVibGljIGZpbmRlcnM6IERhdGFGaW5kZXJzKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZGF0YVByb3ZpZGVycywgZmluZGVycyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUbyBpbml0aWFsaXplIHRoaXMgRGF0YVNvdXJjZSB3aXRoIGN1cnJlbnQgRGF0YUZpbmRlciBhbmQgUHJvdmlkZXIgYXMgd2VsbCBhcyBzdGF0ZSB3ZSB1c2VcbiAgICAgKiBhbiBpbnRlcmZhY2UgRFNDaG9vc2VySW5pdFBhcmFtcyB0byBoYXZlIGFsbCBpbml0IHZhbHVlcyB0eXBlZCBjaGVja2VkXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoLi4uYXJnczogYW55W10pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhhcmdzKSB8fCBhcmdzLmxlbmd0aCAhPT0gMSAmJiAhaXNEU0Nob29zZXJJbml0UGFyYW1zKGFyZ3NbMF0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIGluaXRpYWxpemUgRFMgd2l0aCAoRFNDaG9vc2VySW5pdFBhcmFtcyknKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5pdDogRFNDaG9vc2VySW5pdFBhcmFtcyA9IGFyZ3NbMF07XG5cbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIgPSBpc1ByZXNlbnQoaW5pdC5kYXRhUHJvdmlkZXIpID8gaW5pdC5kYXRhUHJvdmlkZXJcbiAgICAgICAgICAgIDogdGhpcy5kYXRhUHJvdmlkZXJzLmZpbmQoaW5pdC5vYmopO1xuXG4gICAgICAgIHRoaXMuZGF0YUZpbmRlciA9IGlzUHJlc2VudChpbml0LmRhdGFGaW5kZXIpID8gaW5pdC5kYXRhRmluZGVyXG4gICAgICAgICAgICA6IHRoaXMuZmluZGVycy5maW5kKHRoaXMuZGF0YVByb3ZpZGVyLCBpbml0LnF1ZXJ5VHlwZSk7XG5cbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLmRhdGFQcm92aWRlcikgJiYgaXNQcmVzZW50KHRoaXMuZGF0YUZpbmRlciksXG4gICAgICAgICAgICAnRGF0YVNvdXJjZSBpbmNvcnJlY3RseSBpbml0aWFsaXplZC4gKERhdGFQcm92aWRlciwgRGF0YUZpbmRlcikgbWlzc2luZy4gJyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChpbml0LnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IGluaXQuc3RhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3IENob29zZXJTdGF0ZShudWxsLCBpbml0Lm11bHRpc2VsZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YUZpbmRlci5sb29rdXBLZXkgPSBpbml0Lmxvb2t1cEtleTtcbiAgICAgICAgdGhpcy5zdGF0ZS5sb29rdXBLZXkgPSBpbml0Lmxvb2t1cEtleTtcbiAgICB9XG5cblxuICAgIGZpbmQocGF0dGVybjogc3RyaW5nLCBtYXg6IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc3RhdGUucGF0dGVybiA9IHBhdHRlcm47XG4gICAgICAgIHRoaXMuc3RhdGUubGFzdEZ1bGxNYXRjaFBhdHRlcm4gPSBwYXR0ZXJuO1xuXG4gICAgICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXR0ZXJuID09PSAnKicpIHsgLy8gcXVlcnkgZXZlcnl0aGluZ1xuICAgICAgICAgICAgcGF0dGVybiA9ICcnO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgZGF0YUZpbmRlciBoYXMgZXhwZWN0ZWQgbG9va3VwIGtleVxuICAgICAgICBsZXQgb3JpZ0tleSA9IHRoaXMuZGF0YUZpbmRlci5sb29rdXBLZXk7XG4gICAgICAgIHRoaXMuZGF0YUZpbmRlci5sb29rdXBLZXkgPSB0aGlzLnN0YXRlLmxvb2t1cEtleTtcbiAgICAgICAgdGhpcy5kYXRhRmluZGVyLmZvckRhdGEodGhpcy5kYXRhUHJvdmlkZXIpLm1hdGNoPGFueT4ocGF0dGVybiwgbWF4KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnlbXSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLm1hdGNoZXMgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGUuc2VsZWN0ZWRPYmplY3RzKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zdGF0ZS5zZWxlY3RlZE9iamVjdHMoKVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZUlmRXhpc3QodGhpcy5zdGF0ZS5tYXRjaGVzLCBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUZpbmRlci5sb29rdXBLZXkgPSBvcmlnS2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIG11bHRpc2VsZWN0IHRoaXMgbWV0aG9kIGNoZWNrcyBpZiB3ZSBuZWVkIHRvIHNob3cgU0hPVyBNT1JFIGxhYmVsIHVuZGVyIHRoZSBzZWxlY3RlZFxuICAgICAqIGl0ZW1zLiBXZSBkbyBub3Qgd2FudCBzaG93IGUuZy4gNTAgc2VsZWN0aW9uIHVuZGVyIHRoZSBjaG9vc2VyIHRoYXQgd291bGQgdGFrZSB1cCB3aG9sZVxuICAgICAqIHBhZ2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93TW9yZVNlbGVjdGVkKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnNlbGVjdGVkT2JqZWN0cygpLmxlbmd0aCA+PSBEYXRhU291cmNlLk1heFJlY2VudFNlbGVjdGVkO1xuICAgIH1cblxuICAgIG9wZW48VD4oKTogT2JzZXJ2YWJsZTxUW10+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgY2xvc2UoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5kYXRhUHJvdmlkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmRhdGFGaW5kZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlID0gbnVsbDtcbiAgICB9XG5cbiAgICBpbnN0YW50PFQ+KCk6IFRbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGEoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5hZGRNb2RlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgaXRlbXM6IGFueVtdID0gdmFsdWU7XG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB0aGlzLnN0YXRlLnVwZGF0ZWRTZWxlY3RlZE9iamVjdHMoaXRlbSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS51cGRhdGVkU2VsZWN0ZWRPYmplY3RzKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlLmFkZE1vZGUgPSBmYWxzZTtcblxuICAgIH1cblxuXG4gICAgZ2V0IGxvb2t1cEtleSgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFGaW5kZXIubG9va3VwS2V5O1xuICAgIH1cbn1cblxuLyogaXMgXCJpbml0XCIgdHlwZSBvZiBEU0Nob29zZXJJbml0UGFyYW1zIGludGVyZmFjZSA/ICovXG5leHBvcnQgZnVuY3Rpb24gaXNEU0Nob29zZXJJbml0UGFyYW1zKGluaXQ6IERTQ2hvb3NlckluaXRQYXJhbXMpOiBpbml0IGlzIERTQ2hvb3NlckluaXRQYXJhbXNcbntcbiAgICByZXR1cm4gaXNQcmVzZW50KGluaXQub2JqKSB8fCBpc1ByZXNlbnQoaW5pdC5xdWVyeVR5cGUpO1xufVxuXG4vKipcbiAqIFRvIG1ha2UgaW5pdGlhbGl6YXRpb24gZWFzaWVyIHdlIGhhdmUgdGhpcyBjb21tb24gZm9ybWF0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERTQ2hvb3NlckluaXRQYXJhbXMgZXh0ZW5kcyBEU0luaXRQYXJhbXNcbntcbiAgICAvKipcbiAgICAgKiBDaG9vc2VyIHN0YXRlIGtlZXBpbmcgaW5mb3JtYXRpb24gd2hhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQgLCByZXN1bHQgb2YgdGhlIGxhc3QgbWF0Y2hcbiAgICAgKi9cbiAgICBzdGF0ZT86IENob29zZXJTdGF0ZTtcbn1cblxuXG5cbiJdfQ==