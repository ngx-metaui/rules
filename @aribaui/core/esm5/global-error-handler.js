/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ErrorHandler, Injectable } from '@angular/core';
import { Notifications } from './messaging/notifications.service';
import { isPresent } from './utils/lang';
var GlobalErrorHandler = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalErrorHandler, _super);
    function GlobalErrorHandler(notifications) {
        var _this = _super.call(this) || this;
        _this.notifications = notifications;
        return _this;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    GlobalErrorHandler.prototype.handleError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        if (isPresent(this.notifications)) {
            this.notifications.publish('app:error', error);
        }
    };
    GlobalErrorHandler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GlobalErrorHandler.ctorParameters = function () { return [
        { type: Notifications }
    ]; };
    return GlobalErrorHandler;
}(ErrorHandler));
export { GlobalErrorHandler };
function GlobalErrorHandler_tsickle_Closure_declarations() {
    /** @type {?} */
    GlobalErrorHandler.prototype.notifications;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWVycm9yLWhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb3JlLyIsInNvdXJjZXMiOlsiZ2xvYmFsLWVycm9yLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFrQkEsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7O0lBSUMsOENBQVk7SUFJaEQsNEJBQW9CLGFBQTZCO1FBQWpELFlBRUksaUJBQU8sU0FDVjtRQUhtQixtQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7O0tBR2hEOzs7OztJQUVELHdDQUFXOzs7O0lBQVgsVUFBWSxLQUFVO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNsRDtLQUVKOztnQkFoQkosVUFBVTs7OztnQkFKSCxhQUFhOzs2QkFuQnJCO0VBd0J3QyxZQUFZO1NBQXZDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uc30gZnJvbSAnLi9tZXNzYWdpbmcvbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICcuL3V0aWxzL2xhbmcnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxFcnJvckhhbmRsZXIgZXh0ZW5kcyBFcnJvckhhbmRsZXJcbntcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25zPzogTm90aWZpY2F0aW9ucylcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSlcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5ub3RpZmljYXRpb25zKSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnB1Ymxpc2goJ2FwcDplcnJvcicsIGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG4iXX0=