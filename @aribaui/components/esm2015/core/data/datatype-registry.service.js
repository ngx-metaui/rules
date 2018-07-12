/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isBlank, isPresent, isStringMap, isType, objectToName } from '@aribaui/core';
import { BehaviorSubject } from 'rxjs';
/**
 * DataTypeProviderRegistry aggregates different DataProviders per type.
 */
export class DataTypeProviderRegistry {
    constructor() {
        this.registryByProvider = new Map();
        this.registryNameToClass = new Map();
    }
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
    registerProvider(target, provider) {
        if (isBlank(target) || (!isStringMap(target) && !isType(target))) {
            throw new Error(' Cannot register non-object');
        }
        let /** @type {?} */ name = isType(target) ? target.prototype.constructor.name : target.constructor.name;
        this.registryByProvider.set(name, provider);
        let /** @type {?} */ prototype = Object.getPrototypeOf(target);
        this.registryNameToClass.set(name, prototype);
    }
    /**
     * Search for best matching provider. If not found then use object prototype to get hold of its
     * parent and see if there is a provider registered on this level
     *
     * @template T
     * @param {?} className
     * @return {?}
     */
    bestMatchForClass(className) {
        let /** @type {?} */ registeredClassName = className;
        let /** @type {?} */ classProto = this.registryNameToClass.get(className);
        while (isPresent(registeredClassName)) {
            let /** @type {?} */ provider = this.registryByProvider.get(registeredClassName);
            if (isPresent(provider)) {
                provider.type = className;
                return provider;
            }
            // Go up to parent
            if (isPresent(classProto)) {
                classProto = Object.getPrototypeOf(classProto);
                let /** @type {?} */ parentName = objectToName(classProto);
                registeredClassName =
                    (isPresent(parentName) && parentName !== registeredClassName) ? parentName
                        : null;
            }
            else {
                return null;
            }
        }
        return null;
    }
    /**
     * The same as bestMatchForClass() with the difference to pass a type. If you want to
     * support object inheritance you need this.
     *
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    bestMatchForType(type) {
        let /** @type {?} */ name = objectToName(type);
        this.registryNameToClass.set(name, type);
        return this.bestMatchForClass(name);
    }
}
DataTypeProviderRegistry.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DataTypeProviderRegistry.ctorParameters = () => [];
function DataTypeProviderRegistry_tsickle_Closure_declarations() {
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
export class DataProvider {
    constructor() {
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
     * @param {?=} params
     * @return {?}
     */
    expectedCount(params) {
        return -1;
    }
    /**
     *
     * Returns non-async current state of data
     * @return {?}
     */
    data() {
        return this.dataChanges.getValue();
    }
    /**
     * Tells if this DataProvider supports INSERT, REMOVE
     *
     * @return {?}
     */
    canCRUD() {
        return false;
    }
    /**
     * Tells if this DataProvider supports query capability
     *
     * @return {?}
     */
    canQuery() {
        return false;
    }
    /**
     * Implement to support insertion. After record is inserted emit event for dataChanges to
     * inform all subscribers
     *
     * @param {?} obj
     * @return {?}
     */
    insert(obj) {
    }
    /**
     * Implement to support record removal. After record is removed emit event for dataChanges to
     * inform all subscribers.
     *
     * @param {?} obj
     * @return {?}
     */
    remove(obj) {
    }
    /**
     * Implement to provide access to low level searcg API.
     *
     * @param {?} params
     * @return {?}
     */
    query(params) {
    }
}
function DataProvider_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2RhdGEvZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxVQUFVLEVBQU8sTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLGVBQWUsRUFBYSxNQUFNLE1BQU0sQ0FBQzs7OztBQU9qRCxNQUFNO0lBZUY7UUFFSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxHQUFHLEVBQTZCLENBQUM7UUFDL0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7S0FDckQ7Ozs7Ozs7Ozs7O0lBUUQsZ0JBQWdCLENBQUssTUFBVyxFQUFFLFFBQXlCO1FBRXZELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNsRDtRQUVELHFCQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDeEYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFNUMscUJBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDakQ7Ozs7Ozs7OztJQVFELGlCQUFpQixDQUFLLFNBQWlCO1FBRW5DLHFCQUFJLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztRQUNwQyxxQkFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6RCxPQUFPLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7WUFDcEMscUJBQUksUUFBUSxHQUFvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFakYsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsUUFBUSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDbkI7O1lBR0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9DLHFCQUFJLFVBQVUsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFDLG1CQUFtQjtvQkFDZixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLEtBQUssbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDdEUsQ0FBQyxDQUFDLElBQUksQ0FBQzthQUNsQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7Ozs7O0lBU0QsZ0JBQWdCLENBQUssSUFBYTtRQUU5QixxQkFBSSxJQUFJLEdBQVcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUksSUFBSSxDQUFDLENBQUM7S0FDMUM7OztZQXZGSixVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdHWCxNQUFNOzs7Ozs7OzJCQVlrQyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUM7Ozs7Ozs7O0lBTWhFLGFBQWEsQ0FBRSxNQUF5QjtRQUVwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDYjs7Ozs7O0lBMkJELElBQUk7UUFFQSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN0Qzs7Ozs7O0lBT0QsT0FBTztRQUVILE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDaEI7Ozs7OztJQU9ELFFBQVE7UUFFSixNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCOzs7Ozs7OztJQU9ELE1BQU0sQ0FBRSxHQUFRO0tBRWY7Ozs7Ozs7O0lBUUQsTUFBTSxDQUFFLEdBQVE7S0FHZjs7Ozs7OztJQU1ELEtBQUssQ0FBRSxNQUEyQjtLQUVqQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGFibGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIGlzU3RyaW5nTWFwLCBpc1R5cGUsIG9iamVjdFRvTmFtZX0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBEYXRhVHlwZVByb3ZpZGVyUmVnaXN0cnkgYWdncmVnYXRlcyBkaWZmZXJlbnQgRGF0YVByb3ZpZGVycyBwZXIgdHlwZS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFUeXBlUHJvdmlkZXJSZWdpc3RyeVxue1xuXG4gICAgLyoqXG4gICAgICogTWFwcyBjbGFzcyBuYW1lIHRvIERhdGFQcm92aWRlciBpbXBsZW1lbnRhdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgcmVnaXN0cnlCeVByb3ZpZGVyOiBNYXA8c3RyaW5nLCBEYXRhUHJvdmlkZXI8YW55Pj47XG5cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYSBjbGFzcyBOYW1lICB0byBhY3R1YWwgdHlwZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVnaXN0cnlOYW1lVG9DbGFzczogTWFwPHN0cmluZywgYW55PjtcblxuXG4gICAgY29uc3RydWN0b3IgKClcbiAgICB7XG4gICAgICAgIHRoaXMucmVnaXN0cnlCeVByb3ZpZGVyID0gbmV3IE1hcDxzdHJpbmcsIERhdGFQcm92aWRlcjxhbnk+PigpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5TmFtZVRvQ2xhc3MgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvciBldmVyeSBzaW5nbGUgcmVnaXN0ZXJlZCBEYXRhUHJvdmlkZXIgaW1wbGVtZW50YXRpb24gd2UgYWxzbyBuZWVkIHN0b3JlIGl0cyBwcm90b3R5cGVcbiAgICAgKiBpbiBvcmRlciB0byBiZSBhYmxlIHRvIHN1cHBvcnQgc29tZSBraW5kIG9mIGluaGVyaXRhbmNlLiBZb3UgY2FuIHJlZ2lzdGVyIGEgcHJvdmlkZXIgZm9yXG4gICAgICogYSBwYXJlbnQgY2xhc3MgaWYgbmVlZGVkXG4gICAgICpcbiAgICAgKi9cbiAgICByZWdpc3RlclByb3ZpZGVyPFQ+ICh0YXJnZXQ6IGFueSwgcHJvdmlkZXI6IERhdGFQcm92aWRlcjxUPik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRhcmdldCkgfHwgKCFpc1N0cmluZ01hcCh0YXJnZXQpICYmICFpc1R5cGUodGFyZ2V0KSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignIENhbm5vdCByZWdpc3RlciBub24tb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmFtZSA9IGlzVHlwZSh0YXJnZXQpID8gdGFyZ2V0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lIDogdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIHRoaXMucmVnaXN0cnlCeVByb3ZpZGVyLnNldChuYW1lLCBwcm92aWRlcik7XG5cbiAgICAgICAgbGV0IHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5TmFtZVRvQ2xhc3Muc2V0KG5hbWUsIHByb3RvdHlwZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGJlc3QgbWF0Y2hpbmcgcHJvdmlkZXIuIElmIG5vdCBmb3VuZCB0aGVuIHVzZSBvYmplY3QgcHJvdG90eXBlIHRvIGdldCBob2xkIG9mIGl0c1xuICAgICAqIHBhcmVudCBhbmQgc2VlIGlmIHRoZXJlIGlzIGEgcHJvdmlkZXIgcmVnaXN0ZXJlZCBvbiB0aGlzIGxldmVsXG4gICAgICpcbiAgICAgKi9cbiAgICBiZXN0TWF0Y2hGb3JDbGFzczxUPiAoY2xhc3NOYW1lOiBzdHJpbmcpOiBEYXRhUHJvdmlkZXI8VD5cbiAgICB7XG4gICAgICAgIGxldCByZWdpc3RlcmVkQ2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgICBsZXQgY2xhc3NQcm90byA9IHRoaXMucmVnaXN0cnlOYW1lVG9DbGFzcy5nZXQoY2xhc3NOYW1lKTtcblxuICAgICAgICB3aGlsZSAoaXNQcmVzZW50KHJlZ2lzdGVyZWRDbGFzc05hbWUpKSB7XG4gICAgICAgICAgICBsZXQgcHJvdmlkZXI6IERhdGFQcm92aWRlcjxUPiA9IHRoaXMucmVnaXN0cnlCeVByb3ZpZGVyLmdldChyZWdpc3RlcmVkQ2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChwcm92aWRlcikpIHtcbiAgICAgICAgICAgICAgICBwcm92aWRlci50eXBlID0gY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gR28gdXAgdG8gcGFyZW50XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGNsYXNzUHJvdG8pKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjbGFzc1Byb3RvKTtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50TmFtZSA9IG9iamVjdFRvTmFtZShjbGFzc1Byb3RvKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlcmVkQ2xhc3NOYW1lID1cbiAgICAgICAgICAgICAgICAgICAgKGlzUHJlc2VudChwYXJlbnROYW1lKSAmJiBwYXJlbnROYW1lICE9PSByZWdpc3RlcmVkQ2xhc3NOYW1lKSA/IHBhcmVudE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBiZXN0TWF0Y2hGb3JDbGFzcygpIHdpdGggdGhlIGRpZmZlcmVuY2UgdG8gcGFzcyBhIHR5cGUuIElmIHlvdSB3YW50IHRvXG4gICAgICogc3VwcG9ydCBvYmplY3QgaW5oZXJpdGFuY2UgeW91IG5lZWQgdGhpcy5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgYmVzdE1hdGNoRm9yVHlwZTxUPiAodHlwZTogVHlwZTxUPik6IERhdGFQcm92aWRlcjxUPlxuICAgIHtcbiAgICAgICAgbGV0IG5hbWU6IHN0cmluZyA9IG9iamVjdFRvTmFtZSh0eXBlKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdHJ5TmFtZVRvQ2xhc3Muc2V0KG5hbWUsIHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5iZXN0TWF0Y2hGb3JDbGFzczxUPihuYW1lKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBQcm92aWRlciBpcyBhIGRhdGEgZHJpdmVyIHRoYXQgY2FuIGFjY2VzcyBkYXRhIGFuZCByZXRyaWV2ZSB0aGVtLiBJdCBrbm93cyBob3cgdG8gZ2V0IDFcbiAqIG9yIG1vcmUgcmVjb3JkcywgbWF5YmUgZG8gcGFnaW5nIGFuZCBzb21lIG90aGVyIHRoaW5ncy5cbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRhUHJvdmlkZXI8VD5cbntcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGN1cnJlbnQgdHlwZSBmb3IgdGhpcyBEYXRhUHJvdmlkZXJcbiAgICAgKi9cbiAgICB0eXBlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBOb3RpZmllcyBhbGwgdGhlIGxpc3RlbmVycyBpbiBjYXNlIG9mIGRhdGEgYXJlIGF2YWlsYWJsZSBvciBpZiB0aGV5IGNoYW5nZWQgZHVlIHRvIHNvbWUgdXNlclxuICAgICAqIGludGVyYWN0aW9uICAoc2VhcmNoLCBhZGRpbmcgb3IgcmVtb3ZpbmcpLlxuICAgICAqXG4gICAgICovXG4gICAgZGF0YUNoYW5nZXM6IEJlaGF2aW9yU3ViamVjdDxUW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KFtdKTtcblxuICAgIC8qKlxuICAgICAqICBSZXR1cm4gc2l6ZSBvZiB0aGUgc291cmNlXG4gICAgICpcbiAgICAgKi9cbiAgICBleHBlY3RlZENvdW50IChwYXJhbXM/OiBNYXA8c3RyaW5nLCBhbnk+KTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGb3IgdXNlIGNhc2VzIHdoZXJlIHdlIG5lZWQgdG8gcmV0cmlldmUgZGF0YSBiYXNlZCBvbiBzb21lIGNyaXRlcmlhIGUuZy5cbiAgICAgKlxuICAgICAqICAtIG1heCBudW1iZXIgb2YgcmVjb3Jkc1xuICAgICAqICAtIHN1cHBvcnQgcGFnaW5nIHdpdGggb2Zmc2V0IGFuZCBsaW1pdFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgYnkgZmV0Y2hcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBkYXRhRm9yUGFyYW1zIChwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT4pOiBBcnJheTxUPjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGZXRjaGVzIGRhdGEgZnJvbSB1bmRlcmx5aW5nIGRhdGFQcm92aWRlci5cbiAgICAgKlxuICAgICAqIFJlcGxhY2VtZW50IGZvciBkYXRhZm9yUGFyYW1zXG4gICAgICpcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBmZXRjaCAocGFyYW1zOiBNYXA8c3RyaW5nLCBhbnk+KTogT2JzZXJ2YWJsZTxUW10+O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIG5vbi1hc3luYyBjdXJyZW50IHN0YXRlIG9mIGRhdGFcbiAgICAgKi9cbiAgICBkYXRhICgpOiBBcnJheTxUPlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YUNoYW5nZXMuZ2V0VmFsdWUoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHRoaXMgRGF0YVByb3ZpZGVyIHN1cHBvcnRzIElOU0VSVCwgUkVNT1ZFXG4gICAgICpcbiAgICAgKi9cbiAgICBjYW5DUlVEICgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB0aGlzIERhdGFQcm92aWRlciBzdXBwb3J0cyBxdWVyeSBjYXBhYmlsaXR5XG4gICAgICpcbiAgICAgKi9cbiAgICBjYW5RdWVyeSAoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCB0byBzdXBwb3J0IGluc2VydGlvbi4gQWZ0ZXIgcmVjb3JkIGlzIGluc2VydGVkIGVtaXQgZXZlbnQgZm9yIGRhdGFDaGFuZ2VzIHRvXG4gICAgICogaW5mb3JtIGFsbCBzdWJzY3JpYmVyc1xuICAgICAqXG4gICAgICovXG4gICAgaW5zZXJ0IChvYmo6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdG8gc3VwcG9ydCByZWNvcmQgcmVtb3ZhbC4gQWZ0ZXIgcmVjb3JkIGlzIHJlbW92ZWQgZW1pdCBldmVudCBmb3IgZGF0YUNoYW5nZXMgdG9cbiAgICAgKiBpbmZvcm0gYWxsIHN1YnNjcmliZXJzLlxuICAgICAqXG4gICAgICovXG4gICAgcmVtb3ZlIChvYmo6IGFueSk6IHZvaWRcbiAgICB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdG8gcHJvdmlkZSBhY2Nlc3MgdG8gbG93IGxldmVsIHNlYXJjZyBBUEkuXG4gICAgICpcbiAgICAgKi9cbiAgICBxdWVyeSAocGFyYW1zOiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogdm9pZFxuICAgIHtcbiAgICB9XG59XG4iXX0=