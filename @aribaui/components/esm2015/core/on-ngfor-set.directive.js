/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Output } from '@angular/core';
/**
 * Simple utility directive that is used by NG For cycle in situation where we need to call a
 * or execute some logic after each iteration
 */
export class NgForSetDirective {
    constructor() {
        this.onItem = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.onItem.emit('--');
    }
}
NgForSetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngForSet]'
            },] }
];
/** @nocollapse */
NgForSetDirective.ctorParameters = () => [];
NgForSetDirective.propDecorators = {
    onItem: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgForSetDirective.prototype.onItem;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tbmdmb3Itc2V0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL29uLW5nZm9yLXNldC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWtCQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBVTlELE1BQU07SUFNRjtzQkFGNEIsSUFBSSxZQUFZLEVBQU87S0FJbEQ7Ozs7SUFFRCxRQUFRO1FBRUosSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUI7OztZQWhCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7YUFDekI7Ozs7O3FCQUlJLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge0RpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogU2ltcGxlIHV0aWxpdHkgZGlyZWN0aXZlIHRoYXQgaXMgdXNlZCBieSBORyBGb3IgY3ljbGUgaW4gc2l0dWF0aW9uIHdoZXJlIHdlIG5lZWQgdG8gY2FsbCBhXG4gKiBvciBleGVjdXRlIHNvbWUgbG9naWMgYWZ0ZXIgZWFjaCBpdGVyYXRpb25cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmdGb3JTZXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ0ZvclNldERpcmVjdGl2ZVxue1xuXG4gICAgQE91dHB1dCgpXG4gICAgb25JdGVtOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLm9uSXRlbS5lbWl0KCctLScpO1xuICAgIH1cblxufVxuIl19