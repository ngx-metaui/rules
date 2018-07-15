/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { assert, FieldPath, isArray, isBlank, isFunction, isJsObject, isPresent, objectToName, objectValues, unimplemented } from '@aribaui/core';
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
     * Registers new finder
     *
     */
    /**
     * Registers new finder
     *
     * @template T
     * @param {?} prototype
     * @param {?} type
     * @return {?}
     */
    DataFinders.prototype.register = /**
     * Registers new finder
     *
     * @template T
     * @param {?} prototype
     * @param {?} type
     * @return {?}
     */
    function (prototype, type) {
        this.findersByType.set(prototype, type);
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
        this.findersByType.set(new OutlineFullTextArrayDataFinder(), OutlineFullTextArrayDataFinder);
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
    FullTextOutline: 1,
    Predicate: 2,
    FullTextAndPredicate: 3,
};
export { QueryType };
QueryType[QueryType.FullText] = "FullText";
QueryType[QueryType.FullTextOutline] = "FullTextOutline";
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
     *
     * Query can be a simple string literal or a map having different key value pair as a
     * filter
     *
     */
    /**
     *
     * Query can be a simple string literal or a map having different key value pair as a
     * filter
     *
     * @template T
     * @param {?} query
     * @param {?=} max
     * @return {?}
     */
    DataFinder.prototype.match = /**
     *
     * Query can be a simple string literal or a map having different key value pair as a
     * filter
     *
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
     * Sets a DataProvider for DataFinder
     *
     * @abstract
     * @param {?} provider
     * @return {?}
     */
    DataFinder.prototype.forData = function (provider) { };
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
     * @param {?} selectionsForMatch
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    DataFinder.prototype.instantMatchWithSelections = function (selectionsForMatch, query, max) { };
}
/**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
 *
 */
var /**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
 *
 */
FullTextArrayDataFinder = /** @class */ (function (_super) {
    tslib_1.__extends(FullTextArrayDataFinder, _super);
    function FullTextArrayDataFinder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
     * @param {?} selectionsForMatch
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    FullTextArrayDataFinder.prototype.instantMatchWithSelections = /**
     * @template T
     * @param {?} selectionsForMatch
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    function (selectionsForMatch, query, max) {
        assert(isPresent(this._provider), 'Missing DataProvider');
        if (isBlank(query)) {
            return selectionsForMatch;
        }
        var /** @type {?} */ result = [];
        var /** @type {?} */ toLowerPattern = query.toLowerCase();
        for (var /** @type {?} */ i = 0; i < selectionsForMatch.length; i++) {
            var /** @type {?} */ item = selectionsForMatch[i];
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
            return this.hasObjectValue(item, pattern);
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
    /**
     * @param {?} obj
     * @param {?} pattern
     * @return {?}
     */
    FullTextArrayDataFinder.prototype.hasObjectValue = /**
     * @param {?} obj
     * @param {?} pattern
     * @return {?}
     */
    function (obj, pattern) {
        var _this = this;
        var /** @type {?} */ values = objectValues(obj);
        var /** @type {?} */ parentObj = objectToName(obj);
        var /** @type {?} */ length2 = values.filter(function (value) {
            if (isBlank(value) || isArray(value)) {
                return false;
            }
            else if (!isJsObject(value) && !isFunction(value)) {
                return value.toString().toLowerCase().indexOf(pattern) !== -1;
            }
            else if (isJsObject(value) && objectToName(value) !== parentObj) {
                return _this.hasObjectValue(value, pattern);
            }
            return false;
        }).length;
        return length2 > 0;
    };
    return FullTextArrayDataFinder;
}(DataFinder));
/**
 * Simple FullText implementation based on infix string matching which works on top of
 * ArrayDataProvider.
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
/**
 * Extends basic Infix implementation to work on top of OutlineNodes. It first checks all the
 * children on lowest level and moving up to the root and marking nodes that can be removed.
 *
 *  For simple data structure which operates on local array this should be good enough we this
 *  can never match with real DB full text search.
 *
 */
var /**
 * Extends basic Infix implementation to work on top of OutlineNodes. It first checks all the
 * children on lowest level and moving up to the root and marking nodes that can be removed.
 *
 *  For simple data structure which operates on local array this should be good enough we this
 *  can never match with real DB full text search.
 *
 */
OutlineFullTextArrayDataFinder = /** @class */ (function (_super) {
    tslib_1.__extends(OutlineFullTextArrayDataFinder, _super);
    function OutlineFullTextArrayDataFinder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    OutlineFullTextArrayDataFinder.prototype.accepts = /**
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    function (forData, forType) {
        return forData instanceof ArrayDataProvider && forType === QueryType.FullTextOutline;
    };
    /**
     * @template T
     * @param {?} selectionsForMatch
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    OutlineFullTextArrayDataFinder.prototype.instantMatchWithSelections = /**
     * @template T
     * @param {?} selectionsForMatch
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    function (selectionsForMatch, query, max) {
        assert(isPresent(this._provider), 'Missing DataProvider');
        if (isBlank(query)) {
            return selectionsForMatch;
        }
        var /** @type {?} */ toLowerPattern = query.toLowerCase();
        var /** @type {?} */ sourceToSearch = selectionsForMatch.slice();
        this.rollup(sourceToSearch, toLowerPattern);
        return this.shake(sourceToSearch);
    };
    /**
     *
     * Going thru the tree from bottom up and mark all that matches query
     *
     */
    /**
     *
     * Going thru the tree from bottom up and mark all that matches query
     *
     * @param {?} nodes
     * @param {?} query
     * @return {?}
     */
    OutlineFullTextArrayDataFinder.prototype.rollup = /**
     *
     * Going thru the tree from bottom up and mark all that matches query
     *
     * @param {?} nodes
     * @param {?} query
     * @return {?}
     */
    function (nodes, query) {
        var _this = this;
        nodes.forEach(function (item) {
            // start from bottom up and capture how many occurrences is found for future use
            var /** @type {?} */ hasChildrenMatch = false;
            if (isPresent(item.children) && item.children.length > 0) {
                hasChildrenMatch = _this.rollup(item.children, query);
            }
            item.visible = hasChildrenMatch || _this.matches(item, query);
        });
        return nodes.some(function (item) { return item.visible; });
    };
    /**
     * Filter out all the nodes that are marked as visible = false and make sure and
     * don't modify original list
     *
     */
    /**
     * Filter out all the nodes that are marked as visible = false and make sure and
     * don't modify original list
     *
     * @param {?} nodes
     * @return {?}
     */
    OutlineFullTextArrayDataFinder.prototype.shake = /**
     * Filter out all the nodes that are marked as visible = false and make sure and
     * don't modify original list
     *
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        var _this = this;
        return nodes
            .filter(function (node) { return node.visible; })
            .map(function (node) { return (tslib_1.__assign({}, node, { isExpanded: node.visible, children: node.children && _this.shake(node.children) })); });
    };
    return OutlineFullTextArrayDataFinder;
}(FullTextArrayDataFinder));
/**
 * Extends basic Infix implementation to work on top of OutlineNodes. It first checks all the
 * children on lowest level and moving up to the root and marking nodes that can be removed.
 *
 *  For simple data structure which operates on local array this should be good enough we this
 *  can never match with real DB full text search.
 *
 */
export { OutlineFullTextArrayDataFinder };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1maW5kZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9kYXRhLWZpbmRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFtQkEsT0FBTyxFQUFDLFVBQVUsRUFBTyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQ0gsTUFBTSxFQUNOLFNBQVMsRUFDVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osYUFBYSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsRUFBRSxJQUFJLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7SUFnQnBEOzZCQUYyRCxJQUFJLEdBQUcsRUFBRTtRQUloRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdEI7SUFFRDs7T0FFRzs7Ozs7OztJQUNILDBCQUFJOzs7Ozs7SUFBSixVQUFLLFdBQThCLEVBQUUsT0FBa0I7UUFHbkQscUJBQUksV0FBNkIsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQW1CLEVBQUUsQ0FBYTtZQUUxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDZjtTQUNKLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIscUJBQUksSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FB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LEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFDdEQsRUFKVyxDQUlYLENBQUMsQ0FBQztLQUNYO3lDQXRXTDtFQTRTb0QsdUJBQXVCLEVBNEQxRSxDQUFBOzs7Ozs7Ozs7QUE1REQsMENBNERDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJ9IGZyb20gJy4vZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0luamVjdGFibGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBhc3NlcnQsXG4gICAgRmllbGRQYXRoLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc0Z1bmN0aW9uLFxuICAgIGlzSnNPYmplY3QsXG4gICAgaXNQcmVzZW50LFxuICAgIG9iamVjdFRvTmFtZSxcbiAgICBvYmplY3RWYWx1ZXMsXG4gICAgdW5pbXBsZW1lbnRlZFxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7QXJyYXlEYXRhUHJvdmlkZXJ9IGZyb20gJy4vYXJyYXktZGF0YS1wcm92aWRlcic7XG5pbXBvcnQge091dGxpbmVOb2RlfSBmcm9tICcuLi8uLi93aWRnZXRzL291dGxpbmUvb3V0bGluZS1mb3IuY29tcG9uZW50JztcblxuXG4vKipcbiAqXG4gKiBQcm92aWRlcyBhIHJlZ2lzdHJ5IG9mIGRpZmZlcmVudCBkYXRhIEZpbmRlcnMgdXNlZCBtb3N0bHkgYnkgRGF0YVNvdXJjZXMuIEFsbCBGaW5kZXJzIGFyZVxuICogcmVnaXN0ZXJlZCBieSB0aGlzIGNsYXNzIGFzIHdlIGRvbid0IGhhdmUgYW55IG5lZWRzIHJpZ2h0IG5vdyB0byBleHBvc2UgdGhpcyB0byBkZXZlbG9wZXIuXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YUZpbmRlcnNcbntcblxuICAgIHByaXZhdGUgZmluZGVyc0J5VHlwZTogTWFwPERhdGFGaW5kZXIsIFR5cGU8RGF0YUZpbmRlcj4+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbml0RmluZGVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBiZXN0IG1hdGNoaW5nIERhdGFGaW5kZXIgYmFzZWQgb24gdGhlIG9iamVjdCB0eXBlIGFuZCBxdWVyeVR5cGUuXG4gICAgICovXG4gICAgZmluZChmb3JQcm92aWRlcjogRGF0YVByb3ZpZGVyPGFueT4sIGZvclR5cGU6IFF1ZXJ5VHlwZSk6IERhdGFGaW5kZXJcbiAgICB7XG5cbiAgICAgICAgbGV0IGZpbmRlck1hdGNoOiBUeXBlPERhdGFGaW5kZXI+O1xuICAgICAgICB0aGlzLmZpbmRlcnNCeVR5cGUuZm9yRWFjaCgodjogVHlwZTxEYXRhRmluZGVyPiwgazogRGF0YUZpbmRlcikgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGsuYWNjZXB0cyhmb3JQcm92aWRlciwgZm9yVHlwZSkpIHtcbiAgICAgICAgICAgICAgICBmaW5kZXJNYXRjaCA9IHY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoZmluZGVyTWF0Y2gpKSB7XG4gICAgICAgICAgICBsZXQgY29weSA9IG5ldyBmaW5kZXJNYXRjaCgpO1xuICAgICAgICAgICAgY29weS5mb3JEYXRhKGZvclByb3ZpZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBjb3B5O1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIG5ldyBmaW5kZXJcbiAgICAgKlxuICAgICAqL1xuICAgIHJlZ2lzdGVyPFQ+KHByb3RvdHlwZTogRGF0YUZpbmRlciwgdHlwZTogVHlwZTxEYXRhRmluZGVyPik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZmluZGVyc0J5VHlwZS5zZXQocHJvdG90eXBlLCB0eXBlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRGaW5kZXJzKClcbiAgICB7XG4gICAgICAgIC8vIGNyZWF0ZSBhIHByb3RvdHlwZSBmb3IgZWFjaFxuICAgICAgICB0aGlzLmZpbmRlcnNCeVR5cGUuc2V0KG5ldyBGdWxsVGV4dEFycmF5RGF0YUZpbmRlcigpLCBGdWxsVGV4dEFycmF5RGF0YUZpbmRlcik7XG4gICAgICAgIHRoaXMuZmluZGVyc0J5VHlwZS5zZXQobmV3IE91dGxpbmVGdWxsVGV4dEFycmF5RGF0YUZpbmRlcigpLFxuICAgICAgICAgICAgT3V0bGluZUZ1bGxUZXh0QXJyYXlEYXRhRmluZGVyKTtcblxuICAgIH1cbn1cblxuLyoqXG4gKiBXZSBoYXZlIGRpZmZlcmVudCBvcHRpb25zIGhvdyB0byBxdWVyeSBkYXRhLiBGdWxsVGV4dCB1c2VzIGEgc3RyaW5nIHdoZXJlIHByZWRpY2F0ZSBpc1xuICogdXNpbmcga2V5OnZhbHVlIHBhaXIgdG8gYnVpbHQgYSBxdWVyeVxuICovXG5leHBvcnQgZW51bSBRdWVyeVR5cGVcbntcbiAgICBGdWxsVGV4dCxcbiAgICBGdWxsVGV4dE91dGxpbmUsXG4gICAgUHJlZGljYXRlLFxuICAgIEZ1bGxUZXh0QW5kUHJlZGljYXRlXG59XG5cblxuLyoqXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIG1hdGNoaW5nIGNhcGFiaWxpdHkgZm9yIGdpdmVuIERhdGFQcm92aWRlci5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFGaW5kZXJcbntcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBMb29rdXAga2V5IHRvIGFwcGx5IHdoZW4gcnVubmluZyBtYXRjaC4gSWRlYWxseSB5b3VyIERTIHNob3VsZCBiZSBhYmxlIHRvIHNldCBsb29rdXBLZXlcbiAgICAgKiBlaXRoZXIgZ2xvYmFsbHkgZm9yIGdpdmVuIGRhdGFQcm92aWRlciBvciBsb2NhbGx5IGV2ZXJ5IHRpbWUgeW91IHJ1biBzZWFyY2guIFRoaXMgaXMgaW5cbiAgICAgKiBjYXNlIHlvdSBoYXZlIG1hbnkgY2hvb3NlcnMgZm9yIHRoZSBzYW1lIHR5cGUgYW5kIHlvdSB3YW50IHRoZW0gdG8gaGF2ZSBkaWZmZXJlbnQgbG9va3VwXG4gICAgICoga2V5LlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldCBsb29rdXBLZXkoa2V5OiBzdHJpbmcpO1xuXG4gICAgLyoqXG4gICAgICogSW4gb3JkZXIgdG8gZmluZCBjb25jcmV0ZSBEYXRhRmluZGVyIHdlIG5lZWQgdG8ga25vdyB0aGUgdGFyZ2V0IHR5cGUgYW5kIHRoZSBxdWVyeSB0eXBlXG4gICAgICpcbiAgICAgKi9cbiAgICBhY2NlcHRzKGZvckRhdGE6IERhdGFQcm92aWRlcjxhbnk+LCBmb3JUeXBlOiBRdWVyeVR5cGUpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZXRzIGEgRGF0YVByb3ZpZGVyIGZvciBEYXRhRmluZGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBmb3JEYXRhKHByb3ZpZGVyOiBEYXRhUHJvdmlkZXI8YW55Pik6IERhdGFGaW5kZXI7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIE1hdGNoaW5nIG1ldGhvZHMgd2hpY2ggYXJlIGVpdGhlciBhc3luYyBvciBzeW5jXG4gICAgICpcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpbnN0YW50TWF0Y2g8VD4ocXVlcnk6IGFueSwgbWF4OiBudW1iZXIpOiBUW107XG5cbiAgICBhYnN0cmFjdCBpbnN0YW50TWF0Y2hXaXRoU2VsZWN0aW9uczxUPihzZWxlY3Rpb25zRm9yTWF0Y2g6IGFueVtdLCBxdWVyeTogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogbnVtYmVyKTogVFtdO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFF1ZXJ5IGNhbiBiZSBhIHNpbXBsZSBzdHJpbmcgbGl0ZXJhbCBvciBhIG1hcCBoYXZpbmcgZGlmZmVyZW50IGtleSB2YWx1ZSBwYWlyIGFzIGFcbiAgICAgKiBmaWx0ZXJcbiAgICAgKlxuICAgICAqL1xuICAgIG1hdGNoPFQ+KHF1ZXJ5OiBhbnksIG1heDogbnVtYmVyID0gLTEpOiBPYnNlcnZhYmxlPFRbXT5cbiAgICB7XG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxuXG4gICAgbWF0Y2hXaXRoU2VsZWN0aW9uczxUPihzZWxlY3Rpb25zOiBhbnlbXSwgcXVlcnk6IGFueSwgbWF4OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRbXT5cbiAgICB7XG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogU2ltcGxlIEZ1bGxUZXh0IGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIGluZml4IHN0cmluZyBtYXRjaGluZyB3aGljaCB3b3JrcyBvbiB0b3Agb2ZcbiAqIEFycmF5RGF0YVByb3ZpZGVyLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEZ1bGxUZXh0QXJyYXlEYXRhRmluZGVyIGV4dGVuZHMgRGF0YUZpbmRlclxue1xuICAgIC8qKlxuICAgICAqICBJZiBsaXN0IHZhbHVlIGlzIG9iamVjdCBzZXQga2V5UGF0aCB0byBnZXQgdGhlIG9iamVjdCB2YWx1ZVxuICAgICAqL1xuICAgIF9rZXlQYXRoOiBGaWVsZFBhdGg7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IERhdGFQcm92aWRlciB1c2VkIHRvIGFjY2VzcyBkYXRhXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9wcm92aWRlcjogRGF0YVByb3ZpZGVyPGFueT47XG5cbiAgICBzZXQgbG9va3VwS2V5KGtleTogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5fa2V5UGF0aCA9IGlzUHJlc2VudChrZXkpID8gbmV3IEZpZWxkUGF0aChrZXkpIDogbnVsbDtcbiAgICB9XG5cbiAgICBhY2NlcHRzKGZvckRhdGE6IERhdGFQcm92aWRlcjxhbnk+LCBmb3JUeXBlOiBRdWVyeVR5cGUpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gZm9yRGF0YSBpbnN0YW5jZW9mIEFycmF5RGF0YVByb3ZpZGVyICYmIGZvclR5cGUgPT09IFF1ZXJ5VHlwZS5GdWxsVGV4dDtcbiAgICB9XG5cbiAgICBmb3JEYXRhKHByb3ZpZGVyOiBEYXRhUHJvdmlkZXI8YW55Pik6IEZ1bGxUZXh0QXJyYXlEYXRhRmluZGVyXG4gICAge1xuICAgICAgICB0aGlzLl9wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpbnN0YW50TWF0Y2g8VD4ocXVlcnk6IGFueSwgbWF4OiBudW1iZXIpOiBUW11cbiAgICB7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5fcHJvdmlkZXIpLCAnTWlzc2luZyBEYXRhUHJvdmlkZXInKTtcblxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX3Byb3ZpZGVyLmRhdGFGb3JQYXJhbXMobmV3IE1hcCgpLnNldCgnbGltaXQnLCBtYXgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFudE1hdGNoV2l0aFNlbGVjdGlvbnM8VD4obGlzdCwgcXVlcnksIG1heCk7XG4gICAgfVxuXG4gICAgaW5zdGFudE1hdGNoV2l0aFNlbGVjdGlvbnM8VD4oc2VsZWN0aW9uc0Zvck1hdGNoOiBhbnlbXSwgcXVlcnk6IHN0cmluZywgbWF4OiBudW1iZXIpOiBBcnJheTxUPlxuICAgIHtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLl9wcm92aWRlciksICdNaXNzaW5nIERhdGFQcm92aWRlcicpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHF1ZXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbnNGb3JNYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0OiBhbnlbXSA9IFtdO1xuICAgICAgICBsZXQgdG9Mb3dlclBhdHRlcm4gPSBxdWVyeS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0aW9uc0Zvck1hdGNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGVjdGlvbnNGb3JNYXRjaFtpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoZXMoaXRlbSwgdG9Mb3dlclBhdHRlcm4pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2FybmluZzogSWYgeW91IGRvbnQgc3VwcGx5IHNlYXJjaCBLZXkgYW5kIHlvdSB3YW50IGZ1bGx0ZXh0IHNlYXJjaCBhbmQgeW91IHVzZSB0aGlzXG4gICAgICogZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBiZSBhd2FyZSB0aGF0IGl0IGNhbiAgcGVyZm9ybSBwb29ybHkgYXMgaXQgaXMgbmFpdmUgaW1wbGVtZW50YWlvblxuICAgICAqIHRoYXQgZG9lcyBub3QgZG8gZGVlcCBjb21wYXJlLlxuICAgICAqXG4gICAgICovXG4gICAgbWF0Y2hlczxUPihpdGVtOiBhbnksIHBhdHRlcm46IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCB2YWwgPSAoaXNQcmVzZW50KHRoaXMuX2tleVBhdGgpKSA/IHRoaXMuX2tleVBhdGguZ2V0RmllbGRWYWx1ZShpdGVtKSA6IGl0ZW07XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbC5jYWxsKGl0ZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGlzSnNPYmplY3QoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc09iamVjdFZhbHVlKGl0ZW0sIHBhdHRlcm4pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXNCbGFuayhwYXR0ZXJuKSB8fFxuICAgICAgICAgICAgICAgIGlzUHJlc2VudCh2YWwpICYmIHZhbC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihwYXR0ZXJuKSA+IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBtYXRjaDxUPihxdWVyeTogYW55LCBtYXg6IG51bWJlcik6IE9ic2VydmFibGU8VFtdPlxuICAgIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmluc3RhbnRNYXRjaChxdWVyeSwgbWF4KSk7XG4gICAgfVxuXG4gICAgbWF0Y2hXaXRoU2VsZWN0aW9uczxUPihzZWxlY3Rpb25zOiBhbnlbXSwgcXVlcnk6IGFueSwgbWF4OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRbXT5cbiAgICB7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5pbnN0YW50TWF0Y2hXaXRoU2VsZWN0aW9ucyhzZWxlY3Rpb25zLCBxdWVyeSwgbWF4KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGhhc09iamVjdFZhbHVlKG9iajogYW55LCBwYXR0ZXJuOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgdmFsdWVzID0gb2JqZWN0VmFsdWVzKG9iaik7XG4gICAgICAgIGxldCBwYXJlbnRPYmogPSBvYmplY3RUb05hbWUob2JqKTtcbiAgICAgICAgbGV0IGxlbmd0aDIgPSB2YWx1ZXMuZmlsdGVyKCh2YWx1ZTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayh2YWx1ZSkgfHwgaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzSnNPYmplY3QodmFsdWUpICYmICFpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihwYXR0ZXJuKSAhPT0gLTE7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNKc09iamVjdCh2YWx1ZSkgJiYgb2JqZWN0VG9OYW1lKHZhbHVlKSAhPT0gcGFyZW50T2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzT2JqZWN0VmFsdWUodmFsdWUsIHBhdHRlcm4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGxlbmd0aDIgPiAwO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEV4dGVuZHMgYmFzaWMgSW5maXggaW1wbGVtZW50YXRpb24gdG8gd29yayBvbiB0b3Agb2YgT3V0bGluZU5vZGVzLiBJdCBmaXJzdCBjaGVja3MgYWxsIHRoZVxuICogY2hpbGRyZW4gb24gbG93ZXN0IGxldmVsIGFuZCBtb3ZpbmcgdXAgdG8gdGhlIHJvb3QgYW5kIG1hcmtpbmcgbm9kZXMgdGhhdCBjYW4gYmUgcmVtb3ZlZC5cbiAqXG4gKiAgRm9yIHNpbXBsZSBkYXRhIHN0cnVjdHVyZSB3aGljaCBvcGVyYXRlcyBvbiBsb2NhbCBhcnJheSB0aGlzIHNob3VsZCBiZSBnb29kIGVub3VnaCB3ZSB0aGlzXG4gKiAgY2FuIG5ldmVyIG1hdGNoIHdpdGggcmVhbCBEQiBmdWxsIHRleHQgc2VhcmNoLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIE91dGxpbmVGdWxsVGV4dEFycmF5RGF0YUZpbmRlciBleHRlbmRzIEZ1bGxUZXh0QXJyYXlEYXRhRmluZGVyXG57XG5cbiAgICBhY2NlcHRzKGZvckRhdGE6IERhdGFQcm92aWRlcjxhbnk+LCBmb3JUeXBlOiBRdWVyeVR5cGUpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gZm9yRGF0YSBpbnN0YW5jZW9mIEFycmF5RGF0YVByb3ZpZGVyICYmIGZvclR5cGUgPT09IFF1ZXJ5VHlwZS5GdWxsVGV4dE91dGxpbmU7XG4gICAgfVxuXG5cbiAgICBpbnN0YW50TWF0Y2hXaXRoU2VsZWN0aW9uczxUPihzZWxlY3Rpb25zRm9yTWF0Y2g6IGFueVtdLCBxdWVyeTogc3RyaW5nLCBtYXg6IG51bWJlcik6IEFycmF5PFQ+XG4gICAge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuX3Byb3ZpZGVyKSwgJ01pc3NpbmcgRGF0YVByb3ZpZGVyJyk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsocXVlcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uc0Zvck1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0b0xvd2VyUGF0dGVybiA9IHF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgbGV0IHNvdXJjZVRvU2VhcmNoID0gc2VsZWN0aW9uc0Zvck1hdGNoLnNsaWNlKCk7XG4gICAgICAgIHRoaXMucm9sbHVwKHNvdXJjZVRvU2VhcmNoLCB0b0xvd2VyUGF0dGVybik7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYWtlKHNvdXJjZVRvU2VhcmNoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogR29pbmcgdGhydSB0aGUgdHJlZSBmcm9tIGJvdHRvbSB1cCBhbmQgbWFyayBhbGwgdGhhdCBtYXRjaGVzIHF1ZXJ5XG4gICAgICpcbiAgICAgKi9cbiAgICByb2xsdXAobm9kZXM6IE91dGxpbmVOb2RlW10sIHF1ZXJ5OiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICBub2Rlcy5mb3JFYWNoKChpdGVtOiBPdXRsaW5lTm9kZSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgLy8gc3RhcnQgZnJvbSBib3R0b20gdXAgYW5kIGNhcHR1cmUgaG93IG1hbnkgb2NjdXJyZW5jZXMgaXMgZm91bmQgZm9yIGZ1dHVyZSB1c2VcbiAgICAgICAgICAgIGxldCBoYXNDaGlsZHJlbk1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGl0ZW0uY2hpbGRyZW4pICYmIGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGhhc0NoaWxkcmVuTWF0Y2ggPSB0aGlzLnJvbGx1cChpdGVtLmNoaWxkcmVuLCBxdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLnZpc2libGUgPSBoYXNDaGlsZHJlbk1hdGNoIHx8IHRoaXMubWF0Y2hlcyhpdGVtLCBxdWVyeSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBub2Rlcy5zb21lKChpdGVtOiBPdXRsaW5lTm9kZSkgPT4gaXRlbS52aXNpYmxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgb3V0IGFsbCB0aGUgbm9kZXMgdGhhdCBhcmUgbWFya2VkIGFzIHZpc2libGUgPSBmYWxzZSBhbmQgbWFrZSBzdXJlIGFuZFxuICAgICAqIGRvbid0IG1vZGlmeSBvcmlnaW5hbCBsaXN0XG4gICAgICpcbiAgICAgKi9cbiAgICBzaGFrZShub2RlczogT3V0bGluZU5vZGVbXSk6IGFueVtdXG4gICAge1xuICAgICAgICByZXR1cm4gbm9kZXNcbiAgICAgICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLnZpc2libGUpXG4gICAgICAgICAgICAubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5ub2RlLFxuICAgICAgICAgICAgICAgIGlzRXhwYW5kZWQ6IG5vZGUudmlzaWJsZSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbiAmJiB0aGlzLnNoYWtlKG5vZGUuY2hpbGRyZW4pXG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG59XG5cblxuIl19