/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Environment, isStringMap } from '@aribaui/core';
/**
 * A class holding a references to components. The methods are self-explanatory.
 *
 */
var ComponentRegistry = /** @class */ (function () {
    function ComponentRegistry(env) {
        this.env = env;
        this._nameToType = new Map();
    }
    /**
     * @param {?} references
     * @return {?}
     */
    ComponentRegistry.prototype.initialize = /**
     * @param {?} references
     * @return {?}
     */
    function (references) {
        this.registerTypes(references);
        /** @type {?} */
        var promise = new Promise(function (resolve) {
            resolve(true);
        });
        return promise;
    };
    /**
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    ComponentRegistry.prototype.registerType = /**
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    function (name, type) {
        if (!this.nameToType.has(name)) {
            this._nameToType.set(name, type);
        }
    };
    /**
     * @param {?} references
     * @return {?}
     */
    ComponentRegistry.prototype.registerTypes = /**
     * @param {?} references
     * @return {?}
     */
    function (references) {
        var _this = this;
        if (!isStringMap(references)) {
            return;
        }
        Object.keys(references).forEach(function (name) {
            _this.registerType(name, references[name]);
        });
    };
    Object.defineProperty(ComponentRegistry.prototype, "nameToType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._nameToType;
        },
        enumerable: true,
        configurable: true
    });
    ComponentRegistry.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ComponentRegistry.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    return ComponentRegistry;
}());
export { ComponentRegistry };
if (false) {
    /** @type {?} */
    ComponentRegistry.prototype._nameToType;
    /** @type {?} */
    ComponentRegistry.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXJlZ2lzdHJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9jb21wb25lbnQtcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7OztJQVluRCwyQkFBb0IsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTsyQkFGSSxJQUFJLEdBQUcsRUFBZTtLQUk3RDs7Ozs7SUFHRCxzQ0FBVTs7OztJQUFWLFVBQVcsVUFBZTtRQUV0QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztRQUMvQixJQUFJLE9BQU8sR0FBaUIsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFZO1lBRWpELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO0tBRWxCOzs7Ozs7SUFHRCx3Q0FBWTs7Ozs7SUFBWixVQUFhLElBQVksRUFBRSxJQUFTO1FBRWhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwQztLQUNKOzs7OztJQUdELHlDQUFhOzs7O0lBQWIsVUFBYyxVQUFlO1FBQTdCLGlCQVVDO1FBUkcsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQztTQUNWO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFZO1lBRXpDLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdDLENBQUMsQ0FBQztLQUNOO0lBR0Qsc0JBQUkseUNBQVU7Ozs7UUFBZDtZQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzNCOzs7T0FBQTs7Z0JBOUNKLFVBQVU7Ozs7Z0JBUEgsV0FBVzs7NEJBckJuQjs7U0E2QmEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNTdHJpbmdNYXB9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG5cbi8qKlxuICogQSBjbGFzcyBob2xkaW5nIGEgcmVmZXJlbmNlcyB0byBjb21wb25lbnRzLiBUaGUgbWV0aG9kcyBhcmUgc2VsZi1leHBsYW5hdG9yeS5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRSZWdpc3RyeVxue1xuICAgIHByaXZhdGUgX25hbWVUb1R5cGU6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICB9XG5cblxuICAgIGluaXRpYWxpemUocmVmZXJlbmNlczogYW55KTogUHJvbWlzZTxhbnk+XG4gICAge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyVHlwZXMocmVmZXJlbmNlcyk7XG4gICAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG5cbiAgICB9XG5cblxuICAgIHJlZ2lzdGVyVHlwZShuYW1lOiBzdHJpbmcsIHR5cGU6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5uYW1lVG9UeXBlLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5fbmFtZVRvVHlwZS5zZXQobmFtZSwgdHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJlZ2lzdGVyVHlwZXMocmVmZXJlbmNlczogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCFpc1N0cmluZ01hcChyZWZlcmVuY2VzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmtleXMocmVmZXJlbmNlcykuZm9yRWFjaCgobmFtZTogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyVHlwZShuYW1lLCByZWZlcmVuY2VzW25hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBnZXQgbmFtZVRvVHlwZSgpOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZVRvVHlwZTtcbiAgICB9XG59XG5cbiJdfQ==