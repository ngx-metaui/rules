/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Environment, isStringMap } from '@aribaui/core';
/**
 * A class holding a references to components. The methods are self-explanatory.
 *
 */
export class ComponentRegistry {
    /**
     * @param {?} env
     */
    constructor(env) {
        this.env = env;
        this._nameToType = new Map();
    }
    /**
     * @param {?} references
     * @return {?}
     */
    initialize(references) {
        this.registerTypes(references);
        let /** @type {?} */ promise = new Promise((resolve) => {
            resolve(true);
        });
        return promise;
    }
    /**
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    registerType(name, type) {
        if (!this.nameToType.has(name)) {
            this._nameToType.set(name, type);
        }
    }
    /**
     * @param {?} references
     * @return {?}
     */
    registerTypes(references) {
        if (!isStringMap(references)) {
            return;
        }
        Object.keys(references).forEach((name) => {
            this.registerType(name, references[name]);
        });
    }
    /**
     * @return {?}
     */
    get nameToType() {
        return this._nameToType;
    }
}
ComponentRegistry.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ComponentRegistry.ctorParameters = () => [
    { type: Environment }
];
function ComponentRegistry_tsickle_Closure_declarations() {
    /** @type {?} */
    ComponentRegistry.prototype._nameToType;
    /** @type {?} */
    ComponentRegistry.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXJlZ2lzdHJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9jb21wb25lbnQtcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBUXZELE1BQU07Ozs7SUFJRixZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhOzJCQUZJLElBQUksR0FBRyxFQUFlO0tBSTdEOzs7OztJQUdELFVBQVUsQ0FBQyxVQUFlO1FBRXRCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IscUJBQUksT0FBTyxHQUFpQixJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBRXJELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBRWxCOzs7Ozs7SUFHRCxZQUFZLENBQUMsSUFBWSxFQUFFLElBQVM7UUFFaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0o7Ozs7O0lBR0QsYUFBYSxDQUFDLFVBQWU7UUFFekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQztTQUNWO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUU3QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM3QyxDQUFDLENBQUM7S0FDTjs7OztJQUdELElBQUksVUFBVTtRQUVWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQzNCOzs7WUE5Q0osVUFBVTs7OztZQVBILFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1N0cmluZ01hcH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuLyoqXG4gKiBBIGNsYXNzIGhvbGRpbmcgYSByZWZlcmVuY2VzIHRvIGNvbXBvbmVudHMuIFRoZSBtZXRob2RzIGFyZSBzZWxmLWV4cGxhbmF0b3J5LlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudFJlZ2lzdHJ5XG57XG4gICAgcHJpdmF0ZSBfbmFtZVRvVHlwZTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgIH1cblxuXG4gICAgaW5pdGlhbGl6ZShyZWZlcmVuY2VzOiBhbnkpOiBQcm9taXNlPGFueT5cbiAgICB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJUeXBlcyhyZWZlcmVuY2VzKTtcbiAgICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PiA9IG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcblxuICAgIH1cblxuXG4gICAgcmVnaXN0ZXJUeXBlKG5hbWU6IHN0cmluZywgdHlwZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLm5hbWVUb1R5cGUuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9uYW1lVG9UeXBlLnNldChuYW1lLCB0eXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVnaXN0ZXJUeXBlcyhyZWZlcmVuY2VzOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIWlzU3RyaW5nTWFwKHJlZmVyZW5jZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3Qua2V5cyhyZWZlcmVuY2VzKS5mb3JFYWNoKChuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJUeXBlKG5hbWUsIHJlZmVyZW5jZXNbbmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGdldCBuYW1lVG9UeXBlKCk6IE1hcDxzdHJpbmcsIGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lVG9UeXBlO1xuICAgIH1cbn1cblxuIl19