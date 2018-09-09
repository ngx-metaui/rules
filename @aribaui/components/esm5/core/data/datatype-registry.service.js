/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isBlank, isPresent, isStringMap, isType, objectToName } from '@aribaui/core';
import { BehaviorSubject } from 'rxjs';
/**
 * DataTypeProviderRegistry aggregates different DataProviders per type.
 */
var DataTypeProviderRegistry = /** @class */ (function () {
    function DataTypeProviderRegistry() {
        this.registryByProvider = new Map();
        this.registryNameToClass = new Map();
    }
    /**
     * For every single registered DataProvider implementation we also need store its prototype
     * in order to be able to support some kind of inheritance. You can register a provider for
     * a parent class if needed
     *
     */
    /**
     * For every single registered DataProvider implementation we also need store its prototype
     * in order to be able to support some kind of inheritance. You can register a provider for
     * a parent class if needed
     *
     * @template T
     * @param {?} target
     * @param {?} provider
     * @return {?}
     */
    DataTypeProviderRegistry.prototype.registerProvider = /**
     * For every single registered DataProvider implementation we also need store its prototype
     * in order to be able to support some kind of inheritance. You can register a provider for
     * a parent class if needed
     *
     * @template T
     * @param {?} target
     * @param {?} provider
     * @return {?}
     */
    function (target, provider) {
        if (isBlank(target) || (!isStringMap(target) && !isType(target))) {
            throw new Error(' Cannot register non-object');
        }
        /** @type {?} */
        var name = isType(target) ? target.prototype.constructor.name : target.constructor.name;
        this.registryByProvider.set(name, provider);
        /** @type {?} */
        var prototype = Object.getPrototypeOf(target);
        this.registryNameToClass.set(name, prototype);
    };
    /**
     * Search for best matching provider. If not found then use object prototype to get hold of its
     * parent and see if there is a provider registered on this level
     *
     */
    /**
     * Search for best matching provider. If not found then use object prototype to get hold of its
     * parent and see if there is a provider registered on this level
     *
     * @template T
     * @param {?} className
     * @return {?}
     */
    DataTypeProviderRegistry.prototype.bestMatchForClass = /**
     * Search for best matching provider. If not found then use object prototype to get hold of its
     * parent and see if there is a provider registered on this level
     *
     * @template T
     * @param {?} className
     * @return {?}
     */
    function (className) {
        /** @type {?} */
        var registeredClassName = className;
        /** @type {?} */
        var classProto = this.registryNameToClass.get(className);
        while (isPresent(registeredClassName)) {
            /** @type {?} */
            var provider = this.registryByProvider.get(registeredClassName);
            if (isPresent(provider)) {
                provider.type = className;
                return provider;
            }
            // Go up to parent
            if (isPresent(classProto)) {
                classProto = Object.getPrototypeOf(classProto);
                /** @type {?} */
                var parentName = objectToName(classProto);
                registeredClassName =
                    (isPresent(parentName) && parentName !== registeredClassName) ? parentName
                        : null;
            }
            else {
                return null;
            }
        }
        return null;
    };
    /**
     * The same as bestMatchForClass() with the difference to pass a type. If you want to
     * support object inheritance you need this.
     *
     *
     */
    /**
     * The same as bestMatchForClass() with the difference to pass a type. If you want to
     * support object inheritance you need this.
     *
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    DataTypeProviderRegistry.prototype.bestMatchForType = /**
     * The same as bestMatchForClass() with the difference to pass a type. If you want to
     * support object inheritance you need this.
     *
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var name = objectToName(type);
        this.registryNameToClass.set(name, type);
        return this.bestMatchForClass(name);
    };
    DataTypeProviderRegistry.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DataTypeProviderRegistry.ctorParameters = function () { return []; };
    return DataTypeProviderRegistry;
}());
export { DataTypeProviderRegistry };
if (false) {
    /**
     * Maps class name to DataProvider implementation
     * @type {?}
     */
    DataTypeProviderRegistry.prototype.registryByProvider;
    /**
     * Maps a class Name  to actual type
     * @type {?}
     */
    DataTypeProviderRegistry.prototype.registryNameToClass;
}
/**
 * Provider is a data driver that can access data and retrieve them. It knows how to get 1
 * or more records, maybe do paging and some other things.
 *
 * @abstract
 * @template T
 */
var /**
 * Provider is a data driver that can access data and retrieve them. It knows how to get 1
 * or more records, maybe do paging and some other things.
 *
 * @abstract
 * @template T
 */
DataProvider = /** @class */ (function () {
    function DataProvider() {
        /**
         * Notifies all the listeners in case of data are available or if they changed due to some user
         * interaction  (search, adding or removing).
         *
         */
        this.dataChanges = new BehaviorSubject([]);
    }
    /**
     *  Return size of the source
     *
     */
    /**
     *  Return size of the source
     *
     * @param {?=} params
     * @return {?}
     */
    DataProvider.prototype.expectedCount = /**
     *  Return size of the source
     *
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        return -1;
    };
    /**
     *
     * Returns non-async current state of data
     */
    /**
     *
     * Returns non-async current state of data
     * @return {?}
     */
    DataProvider.prototype.data = /**
     *
     * Returns non-async current state of data
     * @return {?}
     */
    function () {
        return this.dataChanges.getValue();
    };
    /**
     * Tells if this DataProvider supports INSERT, REMOVE
     *
     */
    /**
     * Tells if this DataProvider supports INSERT, REMOVE
     *
     * @return {?}
     */
    DataProvider.prototype.canCRUD = /**
     * Tells if this DataProvider supports INSERT, REMOVE
     *
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Tells if this DataProvider supports query capability
     *
     */
    /**
     * Tells if this DataProvider supports query capability
     *
     * @return {?}
     */
    DataProvider.prototype.canQuery = /**
     * Tells if this DataProvider supports query capability
     *
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Implement to support insertion. After record is inserted emit event for dataChanges to
     * inform all subscribers
     *
     */
    /**
     * Implement to support insertion. After record is inserted emit event for dataChanges to
     * inform all subscribers
     *
     * @param {?} obj
     * @return {?}
     */
    DataProvider.prototype.insert = /**
     * Implement to support insertion. After record is inserted emit event for dataChanges to
     * inform all subscribers
     *
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
    };
    /**
     * Implement to support record removal. After record is removed emit event for dataChanges to
     * inform all subscribers.
     *
     */
    /**
     * Implement to support record removal. After record is removed emit event for dataChanges to
     * inform all subscribers.
     *
     * @param {?} obj
     * @return {?}
     */
    DataProvider.prototype.remove = /**
     * Implement to support record removal. After record is removed emit event for dataChanges to
     * inform all subscribers.
     *
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
    };
    /**
     * Implement to provide access to low level searcg API.
     *
     */
    /**
     * Implement to provide access to low level searcg API.
     *
     * @param {?} params
     * @return {?}
     */
    DataProvider.prototype.query = /**
     * Implement to provide access to low level searcg API.
     *
     * @param {?} params
     * @return {?}
     */
    function (params) {
    };
    return DataProvider;
}());
/**
 * Provider is a data driver that can access data and retrieve them. It knows how to get 1
 * or more records, maybe do paging and some other things.
 *
 * @abstract
 * @template T
 */
export { DataProvider };
if (false) {
    /**
     * Defines current type for this DataProvider
     * @type {?}
     */
    DataProvider.prototype.type;
    /**
     * Notifies all the listeners in case of data are available or if they changed due to some user
     * interaction  (search, adding or removing).
     *
     * @type {?}
     */
    DataProvider.prototype.dataChanges;
    /**
     * Internal data source populated by fetch or search. JS application can hold large amount of
     * records without going back to the REST server. This can be used to cache search result on
     * the client site.
     *
     * @type {?}
     */
    DataProvider.prototype.offScreenData;
    /**
     *
     * For use cases where we need to retrieve data based on some criteria e.g.
     *
     *  - max number of records
     *  - support paging with offset and limit
     *
     * @deprecated by fetch
     * @abstract
     * @param {?} params
     * @return {?}
     */
    DataProvider.prototype.dataForParams = function (params) { };
    /**
     *
     * Fetches data from underlying dataProvider.
     *
     * Replacement for dataforParams
     *
     * @abstract
     * @param {?} params
     * @return {?}
     */
    DataProvider.prototype.fetch = function (params) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2RhdGEvZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxVQUFVLEVBQU8sTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLGVBQWUsRUFBYSxNQUFNLE1BQU0sQ0FBQzs7Ozs7SUFzQjdDO1FBRUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO1FBQy9ELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO0tBQ3JEO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7Ozs7O0lBQ0gsbURBQWdCOzs7Ozs7Ozs7O0lBQWhCLFVBQW9CLE1BQVcsRUFBRSxRQUF5QjtRQUV0RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDbEQ7O1FBRUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3hGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztRQUU1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KiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBpc1N0cmluZ01hcCwgaXNUeXBlLCBvYmplY3RUb05hbWV9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogRGF0YVR5cGVQcm92aWRlclJlZ2lzdHJ5IGFnZ3JlZ2F0ZXMgZGlmZmVyZW50IERhdGFQcm92aWRlcnMgcGVyIHR5cGUuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhVHlwZVByb3ZpZGVyUmVnaXN0cnlcbntcblxuICAgIC8qKlxuICAgICAqIE1hcHMgY2xhc3MgbmFtZSB0byBEYXRhUHJvdmlkZXIgaW1wbGVtZW50YXRpb25cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZ2lzdHJ5QnlQcm92aWRlcjogTWFwPHN0cmluZywgRGF0YVByb3ZpZGVyPGFueT4+O1xuXG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGEgY2xhc3MgTmFtZSAgdG8gYWN0dWFsIHR5cGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZ2lzdHJ5TmFtZVRvQ2xhc3M6IE1hcDxzdHJpbmcsIGFueT47XG5cblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMucmVnaXN0cnlCeVByb3ZpZGVyID0gbmV3IE1hcDxzdHJpbmcsIERhdGFQcm92aWRlcjxhbnk+PigpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5TmFtZVRvQ2xhc3MgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvciBldmVyeSBzaW5nbGUgcmVnaXN0ZXJlZCBEYXRhUHJvdmlkZXIgaW1wbGVtZW50YXRpb24gd2UgYWxzbyBuZWVkIHN0b3JlIGl0cyBwcm90b3R5cGVcbiAgICAgKiBpbiBvcmRlciB0byBiZSBhYmxlIHRvIHN1cHBvcnQgc29tZSBraW5kIG9mIGluaGVyaXRhbmNlLiBZb3UgY2FuIHJlZ2lzdGVyIGEgcHJvdmlkZXIgZm9yXG4gICAgICogYSBwYXJlbnQgY2xhc3MgaWYgbmVlZGVkXG4gICAgICpcbiAgICAgKi9cbiAgICByZWdpc3RlclByb3ZpZGVyPFQ+KHRhcmdldDogYW55LCBwcm92aWRlcjogRGF0YVByb3ZpZGVyPFQ+KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGFyZ2V0KSB8fCAoIWlzU3RyaW5nTWFwKHRhcmdldCkgJiYgIWlzVHlwZSh0YXJnZXQpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCcgQ2Fubm90IHJlZ2lzdGVyIG5vbi1vYmplY3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuYW1lID0gaXNUeXBlKHRhcmdldCkgPyB0YXJnZXQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWUgOiB0YXJnZXQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgdGhpcy5yZWdpc3RyeUJ5UHJvdmlkZXIuc2V0KG5hbWUsIHByb3ZpZGVyKTtcblxuICAgICAgICBsZXQgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gICAgICAgIHRoaXMucmVnaXN0cnlOYW1lVG9DbGFzcy5zZXQobmFtZSwgcHJvdG90eXBlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYmVzdCBtYXRjaGluZyBwcm92aWRlci4gSWYgbm90IGZvdW5kIHRoZW4gdXNlIG9iamVjdCBwcm90b3R5cGUgdG8gZ2V0IGhvbGQgb2YgaXRzXG4gICAgICogcGFyZW50IGFuZCBzZWUgaWYgdGhlcmUgaXMgYSBwcm92aWRlciByZWdpc3RlcmVkIG9uIHRoaXMgbGV2ZWxcbiAgICAgKlxuICAgICAqL1xuICAgIGJlc3RNYXRjaEZvckNsYXNzPFQ+KGNsYXNzTmFtZTogc3RyaW5nKTogRGF0YVByb3ZpZGVyPFQ+XG4gICAge1xuICAgICAgICBsZXQgcmVnaXN0ZXJlZENsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgbGV0IGNsYXNzUHJvdG8gPSB0aGlzLnJlZ2lzdHJ5TmFtZVRvQ2xhc3MuZ2V0KGNsYXNzTmFtZSk7XG5cbiAgICAgICAgd2hpbGUgKGlzUHJlc2VudChyZWdpc3RlcmVkQ2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgbGV0IHByb3ZpZGVyOiBEYXRhUHJvdmlkZXI8VD4gPSB0aGlzLnJlZ2lzdHJ5QnlQcm92aWRlci5nZXQocmVnaXN0ZXJlZENsYXNzTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQocHJvdmlkZXIpKSB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXIudHlwZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEdvIHVwIHRvIHBhcmVudFxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChjbGFzc1Byb3RvKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY2xhc3NQcm90byk7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudE5hbWUgPSBvYmplY3RUb05hbWUoY2xhc3NQcm90byk7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJlZENsYXNzTmFtZSA9XG4gICAgICAgICAgICAgICAgICAgIChpc1ByZXNlbnQocGFyZW50TmFtZSkgJiYgcGFyZW50TmFtZSAhPT0gcmVnaXN0ZXJlZENsYXNzTmFtZSkgPyBwYXJlbnROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYmVzdE1hdGNoRm9yQ2xhc3MoKSB3aXRoIHRoZSBkaWZmZXJlbmNlIHRvIHBhc3MgYSB0eXBlLiBJZiB5b3Ugd2FudCB0b1xuICAgICAqIHN1cHBvcnQgb2JqZWN0IGluaGVyaXRhbmNlIHlvdSBuZWVkIHRoaXMuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGJlc3RNYXRjaEZvclR5cGU8VD4odHlwZTogVHlwZTxUPik6IERhdGFQcm92aWRlcjxUPlxuICAgIHtcbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IG9iamVjdFRvTmFtZSh0eXBlKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdHJ5TmFtZVRvQ2xhc3Muc2V0KG5hbWUsIHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5iZXN0TWF0Y2hGb3JDbGFzczxUPihuYW1lKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBQcm92aWRlciBpcyBhIGRhdGEgZHJpdmVyIHRoYXQgY2FuIGFjY2VzcyBkYXRhIGFuZCByZXRyaWV2ZSB0aGVtLiBJdCBrbm93cyBob3cgdG8gZ2V0IDFcbiAqIG9yIG1vcmUgcmVjb3JkcywgbWF5YmUgZG8gcGFnaW5nIGFuZCBzb21lIG90aGVyIHRoaW5ncy5cbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhUHJvdmlkZXI8VD5cbntcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGN1cnJlbnQgdHlwZSBmb3IgdGhpcyBEYXRhUHJvdmlkZXJcbiAgICAgKi9cbiAgICB0eXBlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBOb3RpZmllcyBhbGwgdGhlIGxpc3RlbmVycyBpbiBjYXNlIG9mIGRhdGEgYXJlIGF2YWlsYWJsZSBvciBpZiB0aGV5IGNoYW5nZWQgZHVlIHRvIHNvbWUgdXNlclxuICAgICAqIGludGVyYWN0aW9uICAoc2VhcmNoLCBhZGRpbmcgb3IgcmVtb3ZpbmcpLlxuICAgICAqXG4gICAgICovXG4gICAgZGF0YUNoYW5nZXM6IEJlaGF2aW9yU3ViamVjdDxUW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KFtdKTtcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgZGF0YSBzb3VyY2UgcG9wdWxhdGVkIGJ5IGZldGNoIG9yIHNlYXJjaC4gSlMgYXBwbGljYXRpb24gY2FuIGhvbGQgbGFyZ2UgYW1vdW50IG9mXG4gICAgICogcmVjb3JkcyB3aXRob3V0IGdvaW5nIGJhY2sgdG8gdGhlIFJFU1Qgc2VydmVyLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGNhY2hlIHNlYXJjaCByZXN1bHQgb25cbiAgICAgKiB0aGUgY2xpZW50IHNpdGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBvZmZTY3JlZW5EYXRhOiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogIFJldHVybiBzaXplIG9mIHRoZSBzb3VyY2VcbiAgICAgKlxuICAgICAqL1xuICAgIGV4cGVjdGVkQ291bnQocGFyYW1zPzogTWFwPHN0cmluZywgYW55Pik6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRm9yIHVzZSBjYXNlcyB3aGVyZSB3ZSBuZWVkIHRvIHJldHJpZXZlIGRhdGEgYmFzZWQgb24gc29tZSBjcml0ZXJpYSBlLmcuXG4gICAgICpcbiAgICAgKiAgLSBtYXggbnVtYmVyIG9mIHJlY29yZHNcbiAgICAgKiAgLSBzdXBwb3J0IHBhZ2luZyB3aXRoIG9mZnNldCBhbmQgbGltaXRcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIGJ5IGZldGNoXG4gICAgICovXG4gICAgYWJzdHJhY3QgZGF0YUZvclBhcmFtcyhwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT4pOiBBcnJheTxUPjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGZXRjaGVzIGRhdGEgZnJvbSB1bmRlcmx5aW5nIGRhdGFQcm92aWRlci5cbiAgICAgKlxuICAgICAqIFJlcGxhY2VtZW50IGZvciBkYXRhZm9yUGFyYW1zXG4gICAgICpcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBmZXRjaChwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT4pOiBPYnNlcnZhYmxlPFRbXT47XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybnMgbm9uLWFzeW5jIGN1cnJlbnQgc3RhdGUgb2YgZGF0YVxuICAgICAqL1xuICAgIGRhdGEoKTogQXJyYXk8VD5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFDaGFuZ2VzLmdldFZhbHVlKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB0aGlzIERhdGFQcm92aWRlciBzdXBwb3J0cyBJTlNFUlQsIFJFTU9WRVxuICAgICAqXG4gICAgICovXG4gICAgY2FuQ1JVRCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB0aGlzIERhdGFQcm92aWRlciBzdXBwb3J0cyBxdWVyeSBjYXBhYmlsaXR5XG4gICAgICpcbiAgICAgKi9cbiAgICBjYW5RdWVyeSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IHRvIHN1cHBvcnQgaW5zZXJ0aW9uLiBBZnRlciByZWNvcmQgaXMgaW5zZXJ0ZWQgZW1pdCBldmVudCBmb3IgZGF0YUNoYW5nZXMgdG9cbiAgICAgKiBpbmZvcm0gYWxsIHN1YnNjcmliZXJzXG4gICAgICpcbiAgICAgKi9cbiAgICBpbnNlcnQob2JqOiBhbnkpOiB2b2lkXG4gICAge1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IHRvIHN1cHBvcnQgcmVjb3JkIHJlbW92YWwuIEFmdGVyIHJlY29yZCBpcyByZW1vdmVkIGVtaXQgZXZlbnQgZm9yIGRhdGFDaGFuZ2VzIHRvXG4gICAgICogaW5mb3JtIGFsbCBzdWJzY3JpYmVycy5cbiAgICAgKlxuICAgICAqL1xuICAgIHJlbW92ZShvYmo6IGFueSk6IHZvaWRcbiAgICB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdG8gcHJvdmlkZSBhY2Nlc3MgdG8gbG93IGxldmVsIHNlYXJjZyBBUEkuXG4gICAgICpcbiAgICAgKi9cbiAgICBxdWVyeShwYXJhbXM6IE1hcDxzdHJpbmcsIHN0cmluZz4pOiB2b2lkXG4gICAge1xuICAgIH1cbn1cbiJdfQ==