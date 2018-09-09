/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DataTypeProviderRegistry } from './datatype-registry.service';
import { Injectable } from '@angular/core';
import { isArray, isString } from '@aribaui/core';
import { ArrayDataProvider } from './array-data-provider';
/**
 * Provides top level accessor class in order to make {\@link DataProvider} retrieval process easier.
 * Using {\@link DataTypeProviderRegistry} we either retrieve registered instance of concrete
 * provider or instantiate our implicit provider for native types such as Array.
 *
 *
 */
var DataProviders = /** @class */ (function () {
    function DataProviders(registry) {
        this.registry = registry;
    }
    /**
     * Finds the best matching  DataProvider or create new one in case of Array
     * More room to register and instantiate some other implicit Providers
     */
    /**
     * Finds the best matching  DataProvider or create new one in case of Array
     * More room to register and instantiate some other implicit Providers
     * @param {?} target
     * @return {?}
     */
    DataProviders.prototype.find = /**
     * Finds the best matching  DataProvider or create new one in case of Array
     * More room to register and instantiate some other implicit Providers
     * @param {?} target
     * @return {?}
     */
    function (target) {
        if (isArray(target)) {
            return new ArrayDataProvider(target);
        }
        else if (isString(target)) {
            return this.registry.bestMatchForClass(target);
        }
        return this.registry.bestMatchForType(target);
    };
    /**
     * Registers new provider within DataTypeProviderRegistry
     *
     */
    /**
     * Registers new provider within DataTypeProviderRegistry
     *
     * @template T
     * @param {?} target
     * @param {?} provider
     * @return {?}
     */
    DataProviders.prototype.register = /**
     * Registers new provider within DataTypeProviderRegistry
     *
     * @template T
     * @param {?} target
     * @param {?} provider
     * @return {?}
     */
    function (target, provider) {
        this.registry.registerProvider(target, provider);
    };
    DataProviders.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DataProviders.ctorParameters = function () { return [
        { type: DataTypeProviderRegistry }
    ]; };
    return DataProviders;
}());
export { DataProviders };
if (false) {
    /** @type {?} */
    DataProviders.prototype.registry;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1wcm92aWRlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUFlLHdCQUF3QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDbkYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7O0lBZXBELHVCQUFvQixRQUFrQztRQUFsQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtLQUVyRDtJQUVEOzs7T0FHRzs7Ozs7OztJQUNILDRCQUFJOzs7Ozs7SUFBSixVQUFLLE1BQVc7UUFFWixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEQ7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqRDtJQUdEOzs7T0FHRzs7Ozs7Ozs7O0lBQ0gsZ0NBQVE7Ozs7Ozs7O0lBQVIsVUFBWSxNQUFXLEVBQUUsUUFBeUI7UUFFOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDcEQ7O2dCQWhDSixVQUFVOzs7O2dCQWJXLHdCQUF3Qjs7d0JBbEI5Qzs7U0FnQ2EsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7RGF0YVByb3ZpZGVyLCBEYXRhVHlwZVByb3ZpZGVyUmVnaXN0cnl9IGZyb20gJy4vZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc0FycmF5LCBpc1N0cmluZ30gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0FycmF5RGF0YVByb3ZpZGVyfSBmcm9tICcuL2FycmF5LWRhdGEtcHJvdmlkZXInO1xuXG5cbi8qKlxuICogUHJvdmlkZXMgdG9wIGxldmVsIGFjY2Vzc29yIGNsYXNzIGluIG9yZGVyIHRvIG1ha2Uge0BsaW5rIERhdGFQcm92aWRlcn0gcmV0cmlldmFsIHByb2Nlc3MgZWFzaWVyLlxuICogVXNpbmcge0BsaW5rIERhdGFUeXBlUHJvdmlkZXJSZWdpc3RyeX0gd2UgZWl0aGVyIHJldHJpZXZlIHJlZ2lzdGVyZWQgaW5zdGFuY2Ugb2YgY29uY3JldGVcbiAqIHByb3ZpZGVyIG9yIGluc3RhbnRpYXRlIG91ciBpbXBsaWNpdCBwcm92aWRlciBmb3IgbmF0aXZlIHR5cGVzIHN1Y2ggYXMgQXJyYXkuXG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFQcm92aWRlcnNcbntcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWdpc3RyeTogRGF0YVR5cGVQcm92aWRlclJlZ2lzdHJ5KVxuICAgIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgYmVzdCBtYXRjaGluZyAgRGF0YVByb3ZpZGVyIG9yIGNyZWF0ZSBuZXcgb25lIGluIGNhc2Ugb2YgQXJyYXlcbiAgICAgKiBNb3JlIHJvb20gdG8gcmVnaXN0ZXIgYW5kIGluc3RhbnRpYXRlIHNvbWUgb3RoZXIgaW1wbGljaXQgUHJvdmlkZXJzXG4gICAgICovXG4gICAgZmluZCh0YXJnZXQ6IGFueSk6IERhdGFQcm92aWRlcjxhbnk+XG4gICAge1xuICAgICAgICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5RGF0YVByb3ZpZGVyKHRhcmdldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0cnkuYmVzdE1hdGNoRm9yQ2xhc3ModGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmJlc3RNYXRjaEZvclR5cGUodGFyZ2V0KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBuZXcgcHJvdmlkZXIgd2l0aGluIERhdGFUeXBlUHJvdmlkZXJSZWdpc3RyeVxuICAgICAqXG4gICAgICovXG4gICAgcmVnaXN0ZXI8VD4odGFyZ2V0OiBhbnksIHByb3ZpZGVyOiBEYXRhUHJvdmlkZXI8VD4pOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5LnJlZ2lzdGVyUHJvdmlkZXIodGFyZ2V0LCBwcm92aWRlcik7XG4gICAgfVxuXG59XG4iXX0=