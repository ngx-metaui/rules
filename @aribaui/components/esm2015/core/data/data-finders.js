/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class DataFinders {
    constructor() {
        this.findersByType = new Map();
        this.initFinders();
    }
    /**
     * Finds the best matching DataFinder based on the object type and queryType.
     * @param {?} forProvider
     * @param {?} forType
     * @return {?}
     */
    find(forProvider, forType) {
        let /** @type {?} */ finderMatch;
        this.findersByType.forEach((v, k) => {
            if (k.accepts(forProvider, forType)) {
                finderMatch = v;
                return true;
            }
        });
        if (isPresent(finderMatch)) {
            let /** @type {?} */ copy = new finderMatch();
            copy.forData(forProvider);
            return copy;
        }
        return null;
    }
    /**
     * @return {?}
     */
    initFinders() {
        // create a prototype for each
        this.findersByType.set(new FullTextArrayDataFinder(), FullTextArrayDataFinder);
    }
}
DataFinders.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DataFinders.ctorParameters = () => [];
function DataFinders_tsickle_Closure_declarations() {
    /** @type {?} */
    DataFinders.prototype.findersByType;
}
/** @enum {number} */
const QueryType = {
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
export class DataFinder {
    /**
     * In order to find concrete DataFinder we need to know the target type and the query type
     *
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    accepts(forData, forType) {
        return false;
    }
    /**
     * @template T
     * @param {?} query
     * @param {?=} max
     * @return {?}
     */
    match(query, max = -1) {
        return unimplemented();
    }
    /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    matchWithSelections(selections, query, max) {
        return unimplemented();
    }
}
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
export class FullTextArrayDataFinder extends DataFinder {
    /**
     * @param {?} forData
     * @param {?} forType
     * @return {?}
     */
    accepts(forData, forType) {
        return forData instanceof ArrayDataProvider && forType === QueryType.FullText;
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    forData(provider) {
        this._provider = provider;
        return this;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    set lookupKey(key) {
        this._keyPath = isPresent(key) ? new FieldPath(key) : null;
    }
    /**
     * @template T
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    instantMatch(query, max) {
        assert(isPresent(this._provider), 'Missing DataProvider');
        let /** @type {?} */ list = this._provider.dataForParams(new Map().set('limit', max));
        return this.instantMatchWithSelections(list, query, max);
    }
    /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    instantMatchWithSelections(selections, query, max) {
        assert(isPresent(this._provider), 'Missing DataProvider');
        if (isBlank(query)) {
            return selections;
        }
        let /** @type {?} */ result = [];
        let /** @type {?} */ toLowerPattern = query.toLowerCase();
        for (let /** @type {?} */ i = 0; i < selections.length; i++) {
            let /** @type {?} */ item = selections[i];
            if (this.matches(item, toLowerPattern)) {
                result.push(item);
                if (result.length >= max) {
                    break;
                }
            }
        }
        return result;
    }
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
    matches(item, pattern) {
        let /** @type {?} */ val = (isPresent(this._keyPath)) ? this._keyPath.getFieldValue(item) : item;
        if (isFunction(val)) {
            val = val.call(item);
        }
        else if (isJsObject(item)) {
            return Object.keys(item).filter((key) => isPresent(item[key]) && isString(item[key]) && item[key]
                .toLowerCase().indexOf(pattern) !== -1)
                .length > 0;
        }
        else {
            return isBlank(pattern) ||
                isPresent(val) && val.toString().toLowerCase().indexOf(pattern) > -1;
        }
    }
    /**
     * @template T
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    match(query, max) {
        return observableOf(this.instantMatch(query, max));
    }
    /**
     * @template T
     * @param {?} selections
     * @param {?} query
     * @param {?} max
     * @return {?}
     */
    matchWithSelections(selections, query, max) {
        return observableOf(this.instantMatchWithSelections(selections, query, max));
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1maW5kZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9kYXRhLWZpbmRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW1CQSxPQUFPLEVBQUMsVUFBVSxFQUFPLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFDSCxNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sRUFDUCxVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFDVCxRQUFRLEVBQ1IsYUFBYSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsRUFBRSxJQUFJLFlBQVksRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7OztBQVV4RCxNQUFNO0lBSUY7NkJBRjJELElBQUksR0FBRyxFQUFFO1FBR2hFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7OztJQUtELElBQUksQ0FBQyxXQUE4QixFQUFFLE9BQWtCO1FBRW5ELHFCQUFJLFdBQTZCLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFtQixFQUFFLENBQWEsRUFBRSxFQUFFO1lBQzlELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNmO1NBQ0osQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixxQkFBSSxJQUFJLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFCLE1B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QUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7Ozs7Ozs7O0lBRUQsbUJBQW1CLENBQUksVUFBaUIsRUFBRSxLQUFVLEVBQUUsR0FBVztRQUM3RCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDaEY7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7RGF0YVByb3ZpZGVyfSBmcm9tICcuL2RhdGF0eXBlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgYXNzZXJ0LFxuICAgIEZpZWxkUGF0aCxcbiAgICBpc0JsYW5rLFxuICAgIGlzRnVuY3Rpb24sXG4gICAgaXNKc09iamVjdCxcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgdW5pbXBsZW1lbnRlZFxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7b2YgYXMgb2JzZXJ2YWJsZU9mLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7QXJyYXlEYXRhUHJvdmlkZXJ9IGZyb20gJy4vYXJyYXktZGF0YS1wcm92aWRlcic7XG5cblxuLyoqXG4gKlxuICogUHJvdmlkZXMgYSByZWdpc3RyeSBvZiBkaWZmZXJlbnQgZGF0YSBGaW5kZXJzIHVzZWQgbW9zdGx5IGJ5IERhdGFTb3VyY2VzLiBBbGwgRmluZGVycyBhcmVcbiAqIHJlZ2lzdGVyZWQgYnkgdGhpcyBjbGFzcyBhcyB3ZSBkb24ndCBoYXZlIGFueSBuZWVkcyByaWdodCBub3cgdG8gZXhwb3NlIHRoaXMgdG8gZGV2ZWxvcGVyLlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFGaW5kZXJzIHtcblxuICAgIHByaXZhdGUgZmluZGVyc0J5VHlwZTogTWFwPERhdGFGaW5kZXIsIFR5cGU8RGF0YUZpbmRlcj4+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdEZpbmRlcnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgYmVzdCBtYXRjaGluZyBEYXRhRmluZGVyIGJhc2VkIG9uIHRoZSBvYmplY3QgdHlwZSBhbmQgcXVlcnlUeXBlLlxuICAgICAqL1xuICAgIGZpbmQoZm9yUHJvdmlkZXI6IERhdGFQcm92aWRlcjxhbnk+LCBmb3JUeXBlOiBRdWVyeVR5cGUpOiBEYXRhRmluZGVyIHtcblxuICAgICAgICBsZXQgZmluZGVyTWF0Y2g6IFR5cGU8RGF0YUZpbmRlcj47XG4gICAgICAgIHRoaXMuZmluZGVyc0J5VHlwZS5mb3JFYWNoKCh2OiBUeXBlPERhdGFGaW5kZXI+LCBrOiBEYXRhRmluZGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoay5hY2NlcHRzKGZvclByb3ZpZGVyLCBmb3JUeXBlKSkge1xuICAgICAgICAgICAgICAgIGZpbmRlck1hdGNoID0gdjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChmaW5kZXJNYXRjaCkpIHtcbiAgICAgICAgICAgIGxldCBjb3B5ID0gbmV3IGZpbmRlck1hdGNoKCk7XG4gICAgICAgICAgICBjb3B5LmZvckRhdGEoZm9yUHJvdmlkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGNvcHk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRGaW5kZXJzKCkge1xuICAgICAgICAvLyBjcmVhdGUgYSBwcm90b3R5cGUgZm9yIGVhY2hcbiAgICAgICAgdGhpcy5maW5kZXJzQnlUeXBlLnNldChuZXcgRnVsbFRleHRBcnJheURhdGFGaW5kZXIoKSwgRnVsbFRleHRBcnJheURhdGFGaW5kZXIpO1xuXG4gICAgfVxufVxuXG4vKipcbiAqIFdlIGhhdmUgZGlmZmVyZW50IG9wdGlvbnMgaG93IHRvIHF1ZXJ5IGRhdGEuIEZ1bGxUZXh0IHVzZXMgYSBzdHJpbmcgd2hlcmUgcHJlZGljYXRlIGlzXG4gKiB1c2luZyBrZXk6dmFsdWUgcGFpciB0byBidWlsdCBhIHF1ZXJ5XG4gKi9cbmV4cG9ydCBlbnVtIFF1ZXJ5VHlwZSB7XG4gICAgRnVsbFRleHQsXG4gICAgUHJlZGljYXRlLFxuICAgIEZ1bGxUZXh0QW5kUHJlZGljYXRlXG59XG5cblxuLyoqXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIG1hdGNoaW5nIGNhcGFiaWxpdHkgZm9yIGdpdmVuIERhdGFQcm92aWRlci5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFGaW5kZXIge1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBvcmRlciB0byBmaW5kIGNvbmNyZXRlIERhdGFGaW5kZXIgd2UgbmVlZCB0byBrbm93IHRoZSB0YXJnZXQgdHlwZSBhbmQgdGhlIHF1ZXJ5IHR5cGVcbiAgICAgKlxuICAgICAqL1xuICAgIGFjY2VwdHMoZm9yRGF0YTogRGF0YVByb3ZpZGVyPGFueT4sIGZvclR5cGU6IFF1ZXJ5VHlwZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZXRzIGEgRGF0YVByb3ZpZGVyIGZvciBEYXRhRmluZGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBmb3JEYXRhKHByb3ZpZGVyOiBEYXRhUHJvdmlkZXI8YW55Pik6IERhdGFGaW5kZXI7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIExvb2t1cCBrZXkgdG8gYXBwbHkgd2hlbiBydW5uaW5nIG1hdGNoLiBJZGVhbGx5IHlvdXIgRFMgc2hvdWxkIGJlIGFibGUgdG8gc2V0IGxvb2t1cEtleVxuICAgICAqIGVpdGhlciBnbG9iYWxseSBmb3IgZ2l2ZW4gZGF0YVByb3ZpZGVyIG9yIGxvY2FsbHkgZXZlcnkgdGltZSB5b3UgcnVuIHNlYXJjaC4gVGhpcyBpcyBpblxuICAgICAqIGNhc2UgeW91IGhhdmUgbWFueSBjaG9vc2VycyBmb3IgdGhlIHNhbWUgdHlwZSBhbmQgeW91IHdhbnQgdGhlbSB0byBoYXZlIGRpZmZlcmVudCBsb29rdXBcbiAgICAgKiBrZXkuXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0IGxvb2t1cEtleShrZXk6IHN0cmluZyk7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogTWF0Y2hpbmcgbWV0aG9kcyB3aGljaCBhcmUgZWl0aGVyIGFzeW5jIG9yIHN5bmNcbiAgICAgKlxuICAgICAqL1xuICAgIGFic3RyYWN0IGluc3RhbnRNYXRjaDxUPihxdWVyeTogYW55LCBtYXg6IG51bWJlcik6IFRbXTtcblxuICAgIGFic3RyYWN0IGluc3RhbnRNYXRjaFdpdGhTZWxlY3Rpb25zPFQ+KHNlbGVjdGlvbnM6IGFueVtdLCBxdWVyeTogYW55LCBtYXg6IG51bWJlcik6IFRbXTtcblxuXG4gICAgbWF0Y2g8VD4ocXVlcnk6IGFueSwgbWF4OiBudW1iZXIgPSAtMSk6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxuXG4gICAgbWF0Y2hXaXRoU2VsZWN0aW9uczxUPihzZWxlY3Rpb25zOiBhbnlbXSwgcXVlcnk6IGFueSwgbWF4OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFNpbXBsZSBGdWxsVGV4dCBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBpbmZpeCBzdHJpbmcgbWF0Y2hpbmcgd2hpY2ggd29ya3Mgb24gdG9wIG9mXG4gKiBBcnJheURhdGFQcm92aWRlci5cbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRnVsbFRleHRBcnJheURhdGFGaW5kZXIgZXh0ZW5kcyBEYXRhRmluZGVyIHtcbiAgICAvKipcbiAgICAgKiAgSWYgbGlzdCB2YWx1ZSBpcyBvYmplY3Qgc2V0IGtleVBhdGggdG8gZ2V0IHRoZSBvYmplY3QgdmFsdWVcbiAgICAgKi9cbiAgICBfa2V5UGF0aDogRmllbGRQYXRoO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBEYXRhUHJvdmlkZXIgdXNlZCB0byBhY2Nlc3MgZGF0YVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfcHJvdmlkZXI6IERhdGFQcm92aWRlcjxhbnk+O1xuXG5cbiAgICBhY2NlcHRzKGZvckRhdGE6IERhdGFQcm92aWRlcjxhbnk+LCBmb3JUeXBlOiBRdWVyeVR5cGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZvckRhdGEgaW5zdGFuY2VvZiBBcnJheURhdGFQcm92aWRlciAmJiBmb3JUeXBlID09PSBRdWVyeVR5cGUuRnVsbFRleHQ7XG4gICAgfVxuXG4gICAgZm9yRGF0YShwcm92aWRlcjogRGF0YVByb3ZpZGVyPGFueT4pOiBGdWxsVGV4dEFycmF5RGF0YUZpbmRlciB7XG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldCBsb29rdXBLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fa2V5UGF0aCA9IGlzUHJlc2VudChrZXkpID8gbmV3IEZpZWxkUGF0aChrZXkpIDogbnVsbDtcbiAgICB9XG5cbiAgICBpbnN0YW50TWF0Y2g8VD4ocXVlcnk6IGFueSwgbWF4OiBudW1iZXIpOiBUW10ge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuX3Byb3ZpZGVyKSwgJ01pc3NpbmcgRGF0YVByb3ZpZGVyJyk7XG5cbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9wcm92aWRlci5kYXRhRm9yUGFyYW1zKG5ldyBNYXAoKS5zZXQoJ2xpbWl0JywgbWF4KSk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbnRNYXRjaFdpdGhTZWxlY3Rpb25zPFQ+KGxpc3QsIHF1ZXJ5LCBtYXgpO1xuICAgIH1cblxuICAgIGluc3RhbnRNYXRjaFdpdGhTZWxlY3Rpb25zPFQ+KHNlbGVjdGlvbnM6IGFueVtdLCBxdWVyeTogc3RyaW5nLCBtYXg6IG51bWJlcik6IEFycmF5PFQ+IHtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLl9wcm92aWRlciksICdNaXNzaW5nIERhdGFQcm92aWRlcicpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHF1ZXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdDogYW55W10gPSBbXTtcbiAgICAgICAgbGV0IHRvTG93ZXJQYXR0ZXJuID0gcXVlcnkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZWN0aW9uc1tpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoZXMoaXRlbSwgdG9Mb3dlclBhdHRlcm4pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2FybmluZzogSWYgeW91IGRvbnQgc3VwcGx5IHNlYXJjaCBLZXkgYW5kIHlvdSB3YW50IGZ1bGx0ZXh0IHNlYXJjaCBhbmQgeW91IHVzZSB0aGlzXG4gICAgICogZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBiZSBhd2FyZSB0aGF0IGl0IGNhbiAgcGVyZm9ybSBwb29ybHkgYXMgaXQgaXMgbmFpdmUgaW1wbGVtZW50YWlvblxuICAgICAqIHRoYXQgZG9lcyBub3QgZG8gZGVlcCBjb21wYXJlLlxuICAgICAqXG4gICAgICovXG4gICAgbWF0Y2hlczxUPihpdGVtOiBhbnksIHBhdHRlcm46IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdmFsID0gKGlzUHJlc2VudCh0aGlzLl9rZXlQYXRoKSkgPyB0aGlzLl9rZXlQYXRoLmdldEZpZWxkVmFsdWUoaXRlbSkgOiBpdGVtO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICAgICAgICB2YWwgPSB2YWwuY2FsbChpdGVtKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0pzT2JqZWN0KGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoaXRlbSkuZmlsdGVyKChrZXk6IHN0cmluZykgPT5cbiAgICAgICAgICAgICAgICBpc1ByZXNlbnQoaXRlbVtrZXldKSAmJiBpc1N0cmluZyhpdGVtW2tleV0pICYmIGl0ZW1ba2V5XVxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKS5pbmRleE9mKHBhdHRlcm4pICE9PSAtMSlcbiAgICAgICAgICAgICAgICAubGVuZ3RoID4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpc0JsYW5rKHBhdHRlcm4pIHx8XG4gICAgICAgICAgICAgICAgaXNQcmVzZW50KHZhbCkgJiYgdmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHBhdHRlcm4pID4gLTE7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG1hdGNoPFQ+KHF1ZXJ5OiBhbnksIG1heDogbnVtYmVyKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmluc3RhbnRNYXRjaChxdWVyeSwgbWF4KSk7XG4gICAgfVxuXG4gICAgbWF0Y2hXaXRoU2VsZWN0aW9uczxUPihzZWxlY3Rpb25zOiBhbnlbXSwgcXVlcnk6IGFueSwgbWF4OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKHRoaXMuaW5zdGFudE1hdGNoV2l0aFNlbGVjdGlvbnMoc2VsZWN0aW9ucywgcXVlcnksIG1heCkpO1xuICAgIH1cbn1cbiJdfQ==