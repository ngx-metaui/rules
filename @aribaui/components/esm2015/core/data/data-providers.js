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
export class DataProviders {
    /**
     * @param {?} registry
     */
    constructor(registry) {
        this.registry = registry;
    }
    /**
     * Finds the best matching  DataProvider or create new one in case of Array
     * More room to register and instantiate some other implicit Providers
     * @param {?} target
     * @return {?}
     */
    find(target) {
        if (isArray(target)) {
            return new ArrayDataProvider(target);
        }
        else if (isString(target)) {
            return this.registry.bestMatchForClass(target);
        }
        return this.registry.bestMatchForType(target);
    }
    /**
     * Registers new provider within DataTypeProviderRegistry
     *
     * @template T
     * @param {?} target
     * @param {?} provider
     * @return {?}
     */
    register(target, provider) {
        this.registry.registerProvider(target, provider);
    }
}
DataProviders.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DataProviders.ctorParameters = () => [
    { type: DataTypeProviderRegistry }
];
if (false) {
    /** @type {?} */
    DataProviders.prototype.registry;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1wcm92aWRlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUFlLHdCQUF3QixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDbkYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7QUFXeEQsTUFBTTs7OztJQUlGLFlBQW9CLFFBQWtDO1FBQWxDLGFBQVEsR0FBUixRQUFRLENBQTBCO0tBRXJEOzs7Ozs7O0lBTUQsSUFBSSxDQUFDLE1BQVc7UUFFWixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEQ7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqRDs7Ozs7Ozs7O0lBT0QsUUFBUSxDQUFJLE1BQVcsRUFBRSxRQUF5QjtRQUU5QyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNwRDs7O1lBaENKLFVBQVU7Ozs7WUFiVyx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQge0RhdGFQcm92aWRlciwgRGF0YVR5cGVQcm92aWRlclJlZ2lzdHJ5fSBmcm9tICcuL2RhdGF0eXBlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNBcnJheSwgaXNTdHJpbmd9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtBcnJheURhdGFQcm92aWRlcn0gZnJvbSAnLi9hcnJheS1kYXRhLXByb3ZpZGVyJztcblxuXG4vKipcbiAqIFByb3ZpZGVzIHRvcCBsZXZlbCBhY2Nlc3NvciBjbGFzcyBpbiBvcmRlciB0byBtYWtlIHtAbGluayBEYXRhUHJvdmlkZXJ9IHJldHJpZXZhbCBwcm9jZXNzIGVhc2llci5cbiAqIFVzaW5nIHtAbGluayBEYXRhVHlwZVByb3ZpZGVyUmVnaXN0cnl9IHdlIGVpdGhlciByZXRyaWV2ZSByZWdpc3RlcmVkIGluc3RhbmNlIG9mIGNvbmNyZXRlXG4gKiBwcm92aWRlciBvciBpbnN0YW50aWF0ZSBvdXIgaW1wbGljaXQgcHJvdmlkZXIgZm9yIG5hdGl2ZSB0eXBlcyBzdWNoIGFzIEFycmF5LlxuICpcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhUHJvdmlkZXJzXG57XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVnaXN0cnk6IERhdGFUeXBlUHJvdmlkZXJSZWdpc3RyeSlcbiAgICB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGJlc3QgbWF0Y2hpbmcgIERhdGFQcm92aWRlciBvciBjcmVhdGUgbmV3IG9uZSBpbiBjYXNlIG9mIEFycmF5XG4gICAgICogTW9yZSByb29tIHRvIHJlZ2lzdGVyIGFuZCBpbnN0YW50aWF0ZSBzb21lIG90aGVyIGltcGxpY2l0IFByb3ZpZGVyc1xuICAgICAqL1xuICAgIGZpbmQodGFyZ2V0OiBhbnkpOiBEYXRhUHJvdmlkZXI8YW55PlxuICAgIHtcbiAgICAgICAgaWYgKGlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheURhdGFQcm92aWRlcih0YXJnZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmJlc3RNYXRjaEZvckNsYXNzKHRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5iZXN0TWF0Y2hGb3JUeXBlKHRhcmdldCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgbmV3IHByb3ZpZGVyIHdpdGhpbiBEYXRhVHlwZVByb3ZpZGVyUmVnaXN0cnlcbiAgICAgKlxuICAgICAqL1xuICAgIHJlZ2lzdGVyPFQ+KHRhcmdldDogYW55LCBwcm92aWRlcjogRGF0YVByb3ZpZGVyPFQ+KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5yZWdpc3RyeS5yZWdpc3RlclByb3ZpZGVyKHRhcmdldCwgcHJvdmlkZXIpO1xuICAgIH1cblxufVxuIl19