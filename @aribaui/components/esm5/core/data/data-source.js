/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { unimplemented } from '@aribaui/core';
/** @type {?} */
export var DATA_SOURCE = new InjectionToken('DATA_SOURCE');
/**
 * DataSource describes basic functionality for handling stream of data specific to component
 *
 * It is expected that DataSource will be defined as component provider using
 *
 * \@Components ({
 *      ...
 *      providers:[
 *
 *          provide: DATA_SOURCE, useClass: ChooserDataSourcePlainArrayExample,
 * deps: [DataProviders, DataFinders]
 *      ]
 *
 * })
 *
 *
 * so all the dependencies (DataProviders, DataFinders) are properly injected.
 *
 * DataProvider uses open() method to broadcast changes to all the subscribers in reactive way.
 * Or you can use instant() method to retrieve current state of this DataSource (sync)
 *
 * @abstract
 */
var DataSource = /** @class */ (function () {
    /**
     *
     * Each DataSource have injected DataProviders and DataFinders to retrieve concrete
     * implementation
     *
     */
    function DataSource(dataProviders, finders) {
        this.dataProviders = dataProviders;
        this.finders = finders;
    }
    /**
     * Returns a data instantly from the internal state of DataProvider
     */
    /**
     * Returns a data instantly from the internal state of DataProvider
     * @template T
     * @return {?}
     */
    DataSource.prototype.instant = /**
     * Returns a data instantly from the internal state of DataProvider
     * @template T
     * @return {?}
     */
    function () {
        return unimplemented();
    };
    DataSource.MaxLength = 10;
    DataSource.MaxRecentSelected = 5;
    return DataSource;
}());
export { DataSource };
if (false) {
    /** @type {?} */
    DataSource.MaxLength;
    /** @type {?} */
    DataSource.MaxRecentSelected;
    /** @type {?} */
    DataSource.prototype.dataProviders;
    /** @type {?} */
    DataSource.prototype.finders;
    /**
     * Allows to initialize data source and pass some additional values
     *
     *
     * @abstract
     * @param {...?} args
     * @return {?}
     */
    DataSource.prototype.init = function (args) { };
    /**
     * DataProviders works with stream of data and this opens up the channel in order to
     * listen and react for any changes that could happen inside DataProvider
     * @abstract
     * @template T
     * @return {?}
     */
    DataSource.prototype.open = function () { };
    /**
     * Release subscription to DataProvider
     * @abstract
     * @return {?}
     */
    DataSource.prototype.close = function () { };
}
/**
 * To make initialization easier we have this common format.
 * @record
 */
export function DSInitParams() { }
/**
 * List of values or the object type name we want to render
 * @type {?|undefined}
 */
DSInitParams.prototype.obj;
/**
 * Which find we want to load FullText or Predicate
 * @type {?}
 */
DSInitParams.prototype.queryType;
/**
 * Can specify lookup Key to narrow down the search to specific field. If lookup key is
 * null, items are assumed to be strings
 * @type {?|undefined}
 */
DSInitParams.prototype.lookupKey;
/**
 * Tells if the Chooser is single or multi select
 * @type {?}
 */
DSInitParams.prototype.multiselect;
/**
 * Option to pass custom DataProvider instead letting DataProviders to find match
 * @type {?|undefined}
 */
DSInitParams.prototype.dataProvider;
/**
 * Option to pass custom DataFinder instead letting DataFinders to find match
 * @type {?|undefined}
 */
DSInitParams.prototype.dataFinder;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9kYXRhL2RhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFxQkEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUs1QyxXQUFhLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBYSxhQUFhLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTZCckU7Ozs7O09BS0c7SUFDSCxvQkFBc0IsYUFBNkIsRUFBWSxPQUFxQjtRQUE5RCxrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFjO0tBRW5GO0lBdUJEOztPQUVHOzs7Ozs7SUFDSCw0QkFBTzs7Ozs7SUFBUDtRQUdJLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUMxQjsyQkF6QzJCLEVBQUU7bUNBQ00sQ0FBQztxQkF0RHpDOztTQW1Ec0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi9kYXRhLXByb3ZpZGVycyc7XG5pbXBvcnQge0RhdGFGaW5kZXJzfSBmcm9tICcuL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3VuaW1wbGVtZW50ZWR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEYXRhRmluZGVyLCBRdWVyeVR5cGV9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJ9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhdHlwZS1yZWdpc3RyeS5zZXJ2aWNlJztcblxuXG5leHBvcnQgY29uc3QgREFUQV9TT1VSQ0UgPSBuZXcgSW5qZWN0aW9uVG9rZW48RGF0YVNvdXJjZT4oJ0RBVEFfU09VUkNFJyk7XG5cbi8qKlxuICogRGF0YVNvdXJjZSBkZXNjcmliZXMgYmFzaWMgZnVuY3Rpb25hbGl0eSBmb3IgaGFuZGxpbmcgc3RyZWFtIG9mIGRhdGEgc3BlY2lmaWMgdG8gY29tcG9uZW50XG4gKlxuICogSXQgaXMgZXhwZWN0ZWQgdGhhdCBEYXRhU291cmNlIHdpbGwgYmUgZGVmaW5lZCBhcyBjb21wb25lbnQgcHJvdmlkZXIgdXNpbmdcbiAqXG4gKiBAQ29tcG9uZW50cyAoe1xuICogICAgICAuLi5cbiAqICAgICAgcHJvdmlkZXJzOltcbiAqXG4gKiAgICAgICAgICBwcm92aWRlOiBEQVRBX1NPVVJDRSwgdXNlQ2xhc3M6IENob29zZXJEYXRhU291cmNlUGxhaW5BcnJheUV4YW1wbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBzOiBbRGF0YVByb3ZpZGVycywgRGF0YUZpbmRlcnNdXG4gKiAgICAgIF1cbiAqXG4gKiB9KVxuICpcbiAqXG4gKiBzbyBhbGwgdGhlIGRlcGVuZGVuY2llcyAoRGF0YVByb3ZpZGVycywgRGF0YUZpbmRlcnMpIGFyZSBwcm9wZXJseSBpbmplY3RlZC5cbiAqXG4gKiBEYXRhUHJvdmlkZXIgdXNlcyBvcGVuKCkgbWV0aG9kIHRvIGJyb2FkY2FzdCBjaGFuZ2VzIHRvIGFsbCB0aGUgc3Vic2NyaWJlcnMgaW4gcmVhY3RpdmUgd2F5LlxuICogT3IgeW91IGNhbiB1c2UgaW5zdGFudCgpIG1ldGhvZCB0byByZXRyaWV2ZSBjdXJyZW50IHN0YXRlIG9mIHRoaXMgRGF0YVNvdXJjZSAoc3luYylcbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhU291cmNlXG57XG4gICAgc3RhdGljIHJlYWRvbmx5IE1heExlbmd0aCA9IDEwO1xuICAgIHN0YXRpYyByZWFkb25seSBNYXhSZWNlbnRTZWxlY3RlZCA9IDU7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEVhY2ggRGF0YVNvdXJjZSBoYXZlIGluamVjdGVkIERhdGFQcm92aWRlcnMgYW5kIERhdGFGaW5kZXJzIHRvIHJldHJpZXZlIGNvbmNyZXRlXG4gICAgICogaW1wbGVtZW50YXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkYXRhUHJvdmlkZXJzPzogRGF0YVByb3ZpZGVycywgcHJvdGVjdGVkIGZpbmRlcnM/OiBEYXRhRmluZGVycylcbiAgICB7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdG8gaW5pdGlhbGl6ZSBkYXRhIHNvdXJjZSBhbmQgcGFzcyBzb21lIGFkZGl0aW9uYWwgdmFsdWVzXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGFic3RyYWN0IGluaXQoLi4uYXJnczogYW55W10pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogRGF0YVByb3ZpZGVycyB3b3JrcyB3aXRoIHN0cmVhbSBvZiBkYXRhIGFuZCB0aGlzIG9wZW5zIHVwIHRoZSBjaGFubmVsIGluIG9yZGVyIHRvXG4gICAgICogbGlzdGVuIGFuZCByZWFjdCBmb3IgYW55IGNoYW5nZXMgdGhhdCBjb3VsZCBoYXBwZW4gaW5zaWRlIERhdGFQcm92aWRlclxuICAgICAqL1xuICAgIGFic3RyYWN0IG9wZW48VD4oKTogT2JzZXJ2YWJsZTxUW10+O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZWxlYXNlIHN1YnNjcmlwdGlvbiB0byBEYXRhUHJvdmlkZXJcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBjbG9zZSgpOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZGF0YSBpbnN0YW50bHkgZnJvbSB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgRGF0YVByb3ZpZGVyXG4gICAgICovXG4gICAgaW5zdGFudDxUPigpOiBUW11cbiAgICB7XG5cbiAgICAgICAgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTtcbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFRvIG1ha2UgaW5pdGlhbGl6YXRpb24gZWFzaWVyIHdlIGhhdmUgdGhpcyBjb21tb24gZm9ybWF0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERTSW5pdFBhcmFtc1xue1xuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgdmFsdWVzIG9yIHRoZSBvYmplY3QgdHlwZSBuYW1lIHdlIHdhbnQgdG8gcmVuZGVyXG4gICAgICovXG4gICAgb2JqPzogYW55O1xuXG4gICAgLyoqXG4gICAgICogV2hpY2ggZmluZCB3ZSB3YW50IHRvIGxvYWQgRnVsbFRleHQgb3IgUHJlZGljYXRlXG4gICAgICovXG4gICAgcXVlcnlUeXBlOiBRdWVyeVR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBDYW4gc3BlY2lmeSBsb29rdXAgS2V5IHRvIG5hcnJvdyBkb3duIHRoZSBzZWFyY2ggdG8gc3BlY2lmaWMgZmllbGQuIElmIGxvb2t1cCBrZXkgaXNcbiAgICAgKiBudWxsLCBpdGVtcyBhcmUgYXNzdW1lZCB0byBiZSBzdHJpbmdzXG4gICAgICovXG4gICAgbG9va3VwS2V5Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGVsbHMgaWYgdGhlIENob29zZXIgaXMgc2luZ2xlIG9yIG11bHRpIHNlbGVjdFxuICAgICAqL1xuICAgIG11bHRpc2VsZWN0OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9uIHRvIHBhc3MgY3VzdG9tIERhdGFQcm92aWRlciBpbnN0ZWFkIGxldHRpbmcgRGF0YVByb3ZpZGVycyB0byBmaW5kIG1hdGNoXG4gICAgICovXG4gICAgZGF0YVByb3ZpZGVyPzogRGF0YVByb3ZpZGVyPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb24gdG8gcGFzcyBjdXN0b20gRGF0YUZpbmRlciBpbnN0ZWFkIGxldHRpbmcgRGF0YUZpbmRlcnMgdG8gZmluZCBtYXRjaFxuICAgICAqL1xuICAgIGRhdGFGaW5kZXI/OiBEYXRhRmluZGVyO1xufVxuIl19