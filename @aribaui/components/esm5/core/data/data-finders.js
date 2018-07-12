/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { assert, FieldPath, isBlank, isFunction, isJsObject, isPresent, isString, unimplemented } from '@aribaui/core';
import { of as observableOf } from 'rxjs';
import { ArrayDataProvider } from './array-data-provider';
/**
 *
 * Provides a registry of different data Finders used mostly by DataSources. All Finders are
 * registered by this class as we don't have any needs right now to expose this to developer.
 *
 */
var DataFinders = /** @class */ (function () {
    function DataFinders() {
        this.findersByType = new Map();
        this.initFinders();
    }
    /**
     * Finds the best matching DataFinder based on the object type and queryType.
     */
    /**
     * Finds the best matching DataFinder based on the object type and queryType.
     * @param {?} forProvider
     * @param {?} forType
     * @return {?}
     */
    DataFinders.prototype.find = /**
     * Finds the best matching DataFinder based on the object type and queryType.
     * @param {?} forProvider
     * @param {?} forType
     * @return {?}
     */
    function (forProvider, forType) {
        var /** @type {?} */ finderMatch;
        this.findersByType.forEach(function (v, k) {
            if (k.accepts(forProvider, forType)) {
                finderMatch = v;
                return true;
            }
        });
        if (isPresent(finderMatch)) {
            var /** @type {?} */ copy = new finderMatch();
            copy.forData(forProvider);
            return copy;
        }
        return null;
    };
    /**
     * @return {?}
     */
    DataFinders.prototype.initFinders = /**
     * @return {?}
     */
    function () {
        // create a prototype for each
        this.findersByType.set(new FullTextArrayDataFinder(), FullTextArrayDataFinder);
    };
    DataFinders.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DataFinders.ctorParameters = function () { return []; };
    return DataFinders;
}());
export { DataFinders };
function DataFinders_tsickle_Closure_declarations() {
    /** @type {?} */
    DataFinders.prototype.findersByType;
}
/** @enum {number} */
var QueryType = {
    FullText: 0,
    Predicate: 1,
    FullTextAndPredicate: 2,
};
export { QueryType };
QueryType[QueryType.FullText] = "FullText";
QueryType[QueryType.Predicate] = "Predicate";
QueryType[QueryType.FullTextAndPredicate] = "FullTextAndPredicate";
/**
 * This class provides matching capability for given DataProvider.
 * @abstract
 */
var /**
 * This class provides matching capability for given DataProvider.
 * @abstract
 */
DataFinder = /** @class */ (function () {
    function DataFinder() {
    }
    /**
     * In order to find concrete DataFinder we need to know the target type and the query type
     *
     */
    /**
     * In order to find concrete DataFinder we need to know the target type and the query type
     *
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    DataFinder.prototype.accepts = /**
     * In order to find concrete DataFinder we need to know the target type and the query type
     *
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    function (forData, forType) {
        return false;
    };
    /**
     * @template T
     * @param {?} query
     * @param {?=} max
     * @return {?}
     */
    DataFinder.prototype.match = /**
     * @template T
     * @param {?} query
     * @param {?=} max
     * @return {?}
     */
    function (query, max) {
        if (max === void 0) { max = -1; }
        return unimplemented();
    };
    /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    DataFinder.prototype.matchWithSelections = /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    function (selections, query, max) {
        return unimplemented();
    };
    return DataFinder;
}());
/**
 * This class provides matching capability for given DataProvider.
 * @abstract
 */
export { DataFinder };
function DataFinder_tsickle_Closure_declarations() {
    /**
     *
     * Sets a DataProvider for DataFinder
     *
     * @abstract
     * @param {?} provider
     * @return {?}
     */
    DataFinder.prototype.forData = function (provider) { };
    /**
     *
     * Lookup key to apply when running match. Ideally your DS should be able to set lookupKey
     * either globally for given dataProvider or locally every time you run search. This is in
     * case you have many choosers for the same type and you want them to have different lookup
     * key.
     *
     *
     *
     * @abstract
     * @param {?} key
     * @return {?}
     */
    DataFinder.prototype.lookupKey = function (key) { };
    /**
     *
     * Matching methods which are either async or sync
     *
     * @abstract
     * @template T
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    DataFinder.prototype.instantMatch = function (query, max) { };
    /**
     * @abstract
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    DataFinder.prototype.instantMatchWithSelections = function (selections, query, max) { };
}
/**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
 *
 *
 */
var /**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
 *
 *
 */
FullTextArrayDataFinder = /** @class */ (function (_super) {
    tslib_1.__extends(FullTextArrayDataFinder, _super);
    function FullTextArrayDataFinder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    FullTextArrayDataFinder.prototype.accepts = /**
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    function (forData, forType) {
        return forData instanceof ArrayDataProvider && forType === QueryType.FullText;
    };
    /**
     * @param {?} provider
     * @return {?}
     */
    FullTextArrayDataFinder.prototype.forData = /**
     * @param {?} provider
     * @return {?}
     */
    function (provider) {
        this._provider = provider;
        return this;
    };
    Object.defineProperty(FullTextArrayDataFinder.prototype, "lookupKey", {
        set: /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            this._keyPath = isPresent(key) ? new FieldPath(key) : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    FullTextArrayDataFinder.prototype.instantMatch = /**
     * @template T
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    function (query, max) {
        assert(isPresent(this._provider), 'Missing DataProvider');
        var /** @type {?} */ list = this._provider.dataForParams(new Map().set('limit', max));
        return this.instantMatchWithSelections(list, query, max);
    };
    /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    FullTextArrayDataFinder.prototype.instantMatchWithSelections = /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    function (selections, query, max) {
        assert(isPresent(this._provider), 'Missing DataProvider');
        if (isBlank(query)) {
            return selections;
        }
        var /** @type {?} */ result = [];
        var /** @type {?} */ toLowerPattern = query.toLowerCase();
        for (var /** @type {?} */ i = 0; i < selections.length; i++) {
            var /** @type {?} */ item = selections[i];
            if (this.matches(item, toLowerPattern)) {
                result.push(item);
                if (result.length >= max) {
                    break;
                }
            }
        }
        return result;
    };
    /**
     *
     * Warning: If you dont supply search Key and you want fulltext search and you use this
     * default implementation be aware that it can  perform poorly as it is naive implementaion
     * that does not do deep compare.
     *
     */
    /**
     *
     * Warning: If you dont supply search Key and you want fulltext search and you use this
     * default implementation be aware that it can  perform poorly as it is naive implementaion
     * that does not do deep compare.
     *
     * @template T
     * @param {?} item
     * @param {?} pattern
     * @return {?}
     */
    FullTextArrayDataFinder.prototype.matches = /**
     *
     * Warning: If you dont supply search Key and you want fulltext search and you use this
     * default implementation be aware that it can  perform poorly as it is naive implementaion
     * that does not do deep compare.
     *
     * @template T
     * @param {?} item
     * @param {?} pattern
     * @return {?}
     */
    function (item, pattern) {
        var /** @type {?} */ val = (isPresent(this._keyPath)) ? this._keyPath.getFieldValue(item) : item;
        if (isFunction(val)) {
            val = val.call(item);
        }
        else if (isJsObject(item)) {
            return Object.keys(item).filter(function (key) {
                return isPresent(item[key]) && isString(item[key]) && item[key]
                    .toLowerCase().indexOf(pattern) !== -1;
            })
                .length > 0;
        }
        else {
            return isBlank(pattern) ||
                isPresent(val) && val.toString().toLowerCase().indexOf(pattern) > -1;
        }
    };
    /**
     * @template T
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    FullTextArrayDataFinder.prototype.match = /**
     * @template T
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    function (query, max) {
        return observableOf(this.instantMatch(query, max));
    };
    /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    FullTextArrayDataFinder.prototype.matchWithSelections = /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    function (selections, query, max) {
        return observableOf(this.instantMatchWithSelections(selections, query, max));
    };
    return FullTextArrayDataFinder;
}(DataFinder));
/**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
 *
 *
 */
export { FullTextArrayDataFinder };
function FullTextArrayDataFinder_tsickle_Closure_declarations() {
    /**
     *  If list value is object set keyPath to get the object value
     * @type {?}
     */
    FullTextArrayDataFinder.prototype._keyPath;
    /**
     * Current DataProvider used to access data
     * @type {?}
     */
    FullTextArrayDataFinder.prototype._provider;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1maW5kZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9kYXRhLWZpbmRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFtQkEsT0FBTyxFQUFDLFVBQVUsRUFBTyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQ0gsTUFBTSxFQUNOLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLGFBQWEsRUFDaEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLEVBQUUsSUFBSSxZQUFZLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7Ozs7O0lBY3BEOzZCQUYyRCxJQUFJLEdBQUcsRUFBRTtRQUdoRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdEI7SUFFRDs7T0FFRzs7Ozs7OztJQUNILDBCQUFJOzs7Ozs7SUFBSixVQUFLLFdBQThCLEVBQUUsT0FBa0I7UUFFbkQscUJBQUksV0FBNkIsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQW1CLEVBQUUsQ0FBYTtZQUMxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDZjtTQUNKLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIscUJBQUksSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMx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QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzVFO0tBQ0o7Ozs7Ozs7SUFHRCx1Q0FBSzs7Ozs7O0lBQUwsVUFBUyxLQUFVLEVBQUUsR0FBVztRQUM1QixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7Ozs7Ozs7O0lBRUQscURBQW1COzs7Ozs7O0lBQW5CLFVBQXVCLFVBQWlCLEVBQUUsS0FBVSxFQUFFLEdBQVc7UUFDN0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2hGO2tDQXZPTDtFQXFKNkMsVUFBVSxFQW1GdEQsQ0FBQTs7Ozs7OztBQW5GRCxtQ0FtRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQge0RhdGFQcm92aWRlcn0gZnJvbSAnLi9kYXRhdHlwZS1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIGFzc2VydCxcbiAgICBGaWVsZFBhdGgsXG4gICAgaXNCbGFuayxcbiAgICBpc0Z1bmN0aW9uLFxuICAgIGlzSnNPYmplY3QsXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIHVuaW1wbGVtZW50ZWRcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge29mIGFzIG9ic2VydmFibGVPZiwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0FycmF5RGF0YVByb3ZpZGVyfSBmcm9tICcuL2FycmF5LWRhdGEtcHJvdmlkZXInO1xuXG5cbi8qKlxuICpcbiAqIFByb3ZpZGVzIGEgcmVnaXN0cnkgb2YgZGlmZmVyZW50IGRhdGEgRmluZGVycyB1c2VkIG1vc3RseSBieSBEYXRhU291cmNlcy4gQWxsIEZpbmRlcnMgYXJlXG4gKiByZWdpc3RlcmVkIGJ5IHRoaXMgY2xhc3MgYXMgd2UgZG9uJ3QgaGF2ZSBhbnkgbmVlZHMgcmlnaHQgbm93IHRvIGV4cG9zZSB0aGlzIHRvIGRldmVsb3Blci5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhRmluZGVycyB7XG5cbiAgICBwcml2YXRlIGZpbmRlcnNCeVR5cGU6IE1hcDxEYXRhRmluZGVyLCBUeXBlPERhdGFGaW5kZXI+PiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRGaW5kZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGJlc3QgbWF0Y2hpbmcgRGF0YUZpbmRlciBiYXNlZCBvbiB0aGUgb2JqZWN0IHR5cGUgYW5kIHF1ZXJ5VHlwZS5cbiAgICAgKi9cbiAgICBmaW5kKGZvclByb3ZpZGVyOiBEYXRhUHJvdmlkZXI8YW55PiwgZm9yVHlwZTogUXVlcnlUeXBlKTogRGF0YUZpbmRlciB7XG5cbiAgICAgICAgbGV0IGZpbmRlck1hdGNoOiBUeXBlPERhdGFGaW5kZXI+O1xuICAgICAgICB0aGlzLmZpbmRlcnNCeVR5cGUuZm9yRWFjaCgodjogVHlwZTxEYXRhRmluZGVyPiwgazogRGF0YUZpbmRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGsuYWNjZXB0cyhmb3JQcm92aWRlciwgZm9yVHlwZSkpIHtcbiAgICAgICAgICAgICAgICBmaW5kZXJNYXRjaCA9IHY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoZmluZGVyTWF0Y2gpKSB7XG4gICAgICAgICAgICBsZXQgY29weSA9IG5ldyBmaW5kZXJNYXRjaCgpO1xuICAgICAgICAgICAgY29weS5mb3JEYXRhKGZvclByb3ZpZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBjb3B5O1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RmluZGVycygpIHtcbiAgICAgICAgLy8gY3JlYXRlIGEgcHJvdG90eXBlIGZvciBlYWNoXG4gICAgICAgIHRoaXMuZmluZGVyc0J5VHlwZS5zZXQobmV3IEZ1bGxUZXh0QXJyYXlEYXRhRmluZGVyKCksIEZ1bGxUZXh0QXJyYXlEYXRhRmluZGVyKTtcblxuICAgIH1cbn1cblxuLyoqXG4gKiBXZSBoYXZlIGRpZmZlcmVudCBvcHRpb25zIGhvdyB0byBxdWVyeSBkYXRhLiBGdWxsVGV4dCB1c2VzIGEgc3RyaW5nIHdoZXJlIHByZWRpY2F0ZSBpc1xuICogdXNpbmcga2V5OnZhbHVlIHBhaXIgdG8gYnVpbHQgYSBxdWVyeVxuICovXG5leHBvcnQgZW51bSBRdWVyeVR5cGUge1xuICAgIEZ1bGxUZXh0LFxuICAgIFByZWRpY2F0ZSxcbiAgICBGdWxsVGV4dEFuZFByZWRpY2F0ZVxufVxuXG5cbi8qKlxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBtYXRjaGluZyBjYXBhYmlsaXR5IGZvciBnaXZlbiBEYXRhUHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhRmluZGVyIHtcblxuXG4gICAgLyoqXG4gICAgICogSW4gb3JkZXIgdG8gZmluZCBjb25jcmV0ZSBEYXRhRmluZGVyIHdlIG5lZWQgdG8ga25vdyB0aGUgdGFyZ2V0IHR5cGUgYW5kIHRoZSBxdWVyeSB0eXBlXG4gICAgICpcbiAgICAgKi9cbiAgICBhY2NlcHRzKGZvckRhdGE6IERhdGFQcm92aWRlcjxhbnk+LCBmb3JUeXBlOiBRdWVyeVR5cGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2V0cyBhIERhdGFQcm92aWRlciBmb3IgRGF0YUZpbmRlclxuICAgICAqXG4gICAgICovXG4gICAgYWJzdHJhY3QgZm9yRGF0YShwcm92aWRlcjogRGF0YVByb3ZpZGVyPGFueT4pOiBEYXRhRmluZGVyO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBMb29rdXAga2V5IHRvIGFwcGx5IHdoZW4gcnVubmluZyBtYXRjaC4gSWRlYWxseSB5b3VyIERTIHNob3VsZCBiZSBhYmxlIHRvIHNldCBsb29rdXBLZXlcbiAgICAgKiBlaXRoZXIgZ2xvYmFsbHkgZm9yIGdpdmVuIGRhdGFQcm92aWRlciBvciBsb2NhbGx5IGV2ZXJ5IHRpbWUgeW91IHJ1biBzZWFyY2guIFRoaXMgaXMgaW5cbiAgICAgKiBjYXNlIHlvdSBoYXZlIG1hbnkgY2hvb3NlcnMgZm9yIHRoZSBzYW1lIHR5cGUgYW5kIHlvdSB3YW50IHRoZW0gdG8gaGF2ZSBkaWZmZXJlbnQgbG9va3VwXG4gICAgICoga2V5LlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldCBsb29rdXBLZXkoa2V5OiBzdHJpbmcpO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIE1hdGNoaW5nIG1ldGhvZHMgd2hpY2ggYXJlIGVpdGhlciBhc3luYyBvciBzeW5jXG4gICAgICpcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpbnN0YW50TWF0Y2g8VD4ocXVlcnk6IGFueSwgbWF4OiBudW1iZXIpOiBUW107XG5cbiAgICBhYnN0cmFjdCBpbnN0YW50TWF0Y2hXaXRoU2VsZWN0aW9uczxUPihzZWxlY3Rpb25zOiBhbnlbXSwgcXVlcnk6IGFueSwgbWF4OiBudW1iZXIpOiBUW107XG5cblxuICAgIG1hdGNoPFQ+KHF1ZXJ5OiBhbnksIG1heDogbnVtYmVyID0gLTEpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cblxuICAgIG1hdGNoV2l0aFNlbGVjdGlvbnM8VD4oc2VsZWN0aW9uczogYW55W10sIHF1ZXJ5OiBhbnksIG1heDogbnVtYmVyKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICAgICAgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBTaW1wbGUgRnVsbFRleHQgaW1wbGVtZW50YXRpb24gYmFzZWQgb24gaW5maXggc3RyaW5nIG1hdGNoaW5nIHdoaWNoIHdvcmtzIG9uIHRvcCBvZlxuICogQXJyYXlEYXRhUHJvdmlkZXIuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEZ1bGxUZXh0QXJyYXlEYXRhRmluZGVyIGV4dGVuZHMgRGF0YUZpbmRlciB7XG4gICAgLyoqXG4gICAgICogIElmIGxpc3QgdmFsdWUgaXMgb2JqZWN0IHNldCBrZXlQYXRoIHRvIGdldCB0aGUgb2JqZWN0IHZhbHVlXG4gICAgICovXG4gICAgX2tleVBhdGg6IEZpZWxkUGF0aDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgRGF0YVByb3ZpZGVyIHVzZWQgdG8gYWNjZXNzIGRhdGFcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3Byb3ZpZGVyOiBEYXRhUHJvdmlkZXI8YW55PjtcblxuXG4gICAgYWNjZXB0cyhmb3JEYXRhOiBEYXRhUHJvdmlkZXI8YW55PiwgZm9yVHlwZTogUXVlcnlUeXBlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmb3JEYXRhIGluc3RhbmNlb2YgQXJyYXlEYXRhUHJvdmlkZXIgJiYgZm9yVHlwZSA9PT0gUXVlcnlUeXBlLkZ1bGxUZXh0O1xuICAgIH1cblxuICAgIGZvckRhdGEocHJvdmlkZXI6IERhdGFQcm92aWRlcjxhbnk+KTogRnVsbFRleHRBcnJheURhdGFGaW5kZXIge1xuICAgICAgICB0aGlzLl9wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXQgbG9va3VwS2V5KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2tleVBhdGggPSBpc1ByZXNlbnQoa2V5KSA/IG5ldyBGaWVsZFBhdGgoa2V5KSA6IG51bGw7XG4gICAgfVxuXG4gICAgaW5zdGFudE1hdGNoPFQ+KHF1ZXJ5OiBhbnksIG1heDogbnVtYmVyKTogVFtdIHtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLl9wcm92aWRlciksICdNaXNzaW5nIERhdGFQcm92aWRlcicpO1xuXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fcHJvdmlkZXIuZGF0YUZvclBhcmFtcyhuZXcgTWFwKCkuc2V0KCdsaW1pdCcsIG1heCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW50TWF0Y2hXaXRoU2VsZWN0aW9uczxUPihsaXN0LCBxdWVyeSwgbWF4KTtcbiAgICB9XG5cbiAgICBpbnN0YW50TWF0Y2hXaXRoU2VsZWN0aW9uczxUPihzZWxlY3Rpb25zOiBhbnlbXSwgcXVlcnk6IHN0cmluZywgbWF4OiBudW1iZXIpOiBBcnJheTxUPiB7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5fcHJvdmlkZXIpLCAnTWlzc2luZyBEYXRhUHJvdmlkZXInKTtcblxuICAgICAgICBpZiAoaXNCbGFuayhxdWVyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb25zO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQ6IGFueVtdID0gW107XG4gICAgICAgIGxldCB0b0xvd2VyUGF0dGVybiA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGVjdGlvbnNbaV07XG4gICAgICAgICAgICBpZiAodGhpcy5tYXRjaGVzKGl0ZW0sIHRvTG93ZXJQYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IG1heCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdhcm5pbmc6IElmIHlvdSBkb250IHN1cHBseSBzZWFyY2ggS2V5IGFuZCB5b3Ugd2FudCBmdWxsdGV4dCBzZWFyY2ggYW5kIHlvdSB1c2UgdGhpc1xuICAgICAqIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gYmUgYXdhcmUgdGhhdCBpdCBjYW4gIHBlcmZvcm0gcG9vcmx5IGFzIGl0IGlzIG5haXZlIGltcGxlbWVudGFpb25cbiAgICAgKiB0aGF0IGRvZXMgbm90IGRvIGRlZXAgY29tcGFyZS5cbiAgICAgKlxuICAgICAqL1xuICAgIG1hdGNoZXM8VD4oaXRlbTogYW55LCBwYXR0ZXJuOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHZhbCA9IChpc1ByZXNlbnQodGhpcy5fa2V5UGF0aCkpID8gdGhpcy5fa2V5UGF0aC5nZXRGaWVsZFZhbHVlKGl0ZW0pIDogaXRlbTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgICAgICAgdmFsID0gdmFsLmNhbGwoaXRlbSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNKc09iamVjdChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW0pLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+XG4gICAgICAgICAgICAgICAgaXNQcmVzZW50KGl0ZW1ba2V5XSkgJiYgaXNTdHJpbmcoaXRlbVtrZXldKSAmJiBpdGVtW2tleV1cbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihwYXR0ZXJuKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgLmxlbmd0aCA+IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXNCbGFuayhwYXR0ZXJuKSB8fFxuICAgICAgICAgICAgICAgIGlzUHJlc2VudCh2YWwpICYmIHZhbC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihwYXR0ZXJuKSA+IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBtYXRjaDxUPihxdWVyeTogYW55LCBtYXg6IG51bWJlcik6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5pbnN0YW50TWF0Y2gocXVlcnksIG1heCkpO1xuICAgIH1cblxuICAgIG1hdGNoV2l0aFNlbGVjdGlvbnM8VD4oc2VsZWN0aW9uczogYW55W10sIHF1ZXJ5OiBhbnksIG1heDogbnVtYmVyKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmluc3RhbnRNYXRjaFdpdGhTZWxlY3Rpb25zKHNlbGVjdGlvbnMsIHF1ZXJ5LCBtYXgpKTtcbiAgICB9XG59XG4iXX0=