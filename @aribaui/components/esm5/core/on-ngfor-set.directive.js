/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, Output } from '@angular/core';
/**
 * Simple utility directive that is used by NG For cycle in situation where we need to call a
 * or execute some logic after each iteration
 */
var NgForSetDirective = /** @class */ (function () {
    function NgForSetDirective() {
        this.onItem = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NgForSetDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.onItem.emit('--');
    };
    NgForSetDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngForSet]'
                },] },
    ];
    /** @nocollapse */
    NgForSetDirective.ctorParameters = function () { return []; };
    NgForSetDirective.propDecorators = {
        onItem: [{ type: Output }]
    };
    return NgForSetDirective;
}());
export { NgForSetDirective };
function NgForSetDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NgForSetDirective.prototype.onItem;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tbmdmb3Itc2V0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL29uLW5nZm9yLXNldC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWtCQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7OztJQWdCMUQ7c0JBRjRCLElBQUksWUFBWSxFQUFPO0tBSWxEOzs7O0lBRUQsb0NBQVE7OztJQUFSO1FBRUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUI7O2dCQWhCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7aUJBQ3pCOzs7Ozt5QkFJSSxNQUFNOzs0QkEvQlg7O1NBNEJhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBTaW1wbGUgdXRpbGl0eSBkaXJlY3RpdmUgdGhhdCBpcyB1c2VkIGJ5IE5HIEZvciBjeWNsZSBpbiBzaXR1YXRpb24gd2hlcmUgd2UgbmVlZCB0byBjYWxsIGFcbiAqIG9yIGV4ZWN1dGUgc29tZSBsb2dpYyBhZnRlciBlYWNoIGl0ZXJhdGlvblxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tuZ0ZvclNldF0nXG59KVxuZXhwb3J0IGNsYXNzIE5nRm9yU2V0RGlyZWN0aXZlXG57XG5cbiAgICBAT3V0cHV0KClcbiAgICBvbkl0ZW06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHRoaXMub25JdGVtLmVtaXQoJy0tJyk7XG4gICAgfVxuXG59XG4iXX0=