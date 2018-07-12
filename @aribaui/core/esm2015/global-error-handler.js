/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ErrorHandler, Injectable } from '@angular/core';
import { Notifications } from './messaging/notifications.service';
import { isPresent } from './utils/lang';
export class GlobalErrorHandler extends ErrorHandler {
    /**
     * @param {?=} notifications
     */
    constructor(notifications) {
        super();
        this.notifications = notifications;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        if (isPresent(this.notifications)) {
            this.notifications.publish('app:error', error);
        }
    }
}
GlobalErrorHandler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GlobalErrorHandler.ctorParameters = () => [
    { type: Notifications }
];
function GlobalErrorHandler_tsickle_Closure_declarations() {
    /** @type {?} */
    GlobalErrorHandler.prototype.notifications;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWVycm9yLWhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb3JlLyIsInNvdXJjZXMiOlsiZ2xvYmFsLWVycm9yLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWtCQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUl2QyxNQUFNLHlCQUEwQixTQUFRLFlBQVk7Ozs7SUFJaEQsWUFBb0IsYUFBNkI7UUFFN0MsS0FBSyxFQUFFLENBQUM7UUFGUSxrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7S0FHaEQ7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQVU7UUFFbEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2xEO0tBRUo7OztZQWhCSixVQUFVOzs7O1lBSkgsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uc30gZnJvbSAnLi9tZXNzYWdpbmcvbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICcuL3V0aWxzL2xhbmcnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxFcnJvckhhbmRsZXIgZXh0ZW5kcyBFcnJvckhhbmRsZXJcbntcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25zPzogTm90aWZpY2F0aW9ucylcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSlcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5ub3RpZmljYXRpb25zKSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnB1Ymxpc2goJ2FwcDplcnJvcicsIGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG4iXX0=