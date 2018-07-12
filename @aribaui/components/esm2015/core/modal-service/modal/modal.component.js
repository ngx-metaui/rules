/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from '../modal.service';
/**
 * Place holder for all modal dialogs. This component works with the modalService by providing
 * a place holder for it to inject Dialog component into.
 */
export class ModalComponent {
    /**
     * @param {?} modalService
     */
    constructor(modalService) {
        this.modalService = modalService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
    }
}
ModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-modal',
                template: `<div #modal></div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ModalComponent.ctorParameters = () => [
    { type: ModalService }
];
ModalComponent.propDecorators = {
    viewContainerRef: [{ type: ViewChild, args: ['modal', { read: ViewContainerRef },] }]
};
function ModalComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ModalComponent.prototype.viewContainerRef;
    /** @type {?} */
    ModalComponent.prototype.modalService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvbW9kYWwtc2VydmljZS9tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFVLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBYTlDLE1BQU07Ozs7SUFNRixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztLQUU3Qzs7OztJQUVELFFBQVE7UUFFSixJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3JFOzs7WUFuQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUU7Q0FDYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDZjs7OztZQVpPLFlBQVk7OzsrQkFnQmYsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TW9kYWxTZXJ2aWNlfSBmcm9tICcuLi9tb2RhbC5zZXJ2aWNlJztcblxuXG4vKipcbiAqIFBsYWNlIGhvbGRlciBmb3IgYWxsIG1vZGFsIGRpYWxvZ3MuIFRoaXMgY29tcG9uZW50IHdvcmtzIHdpdGggdGhlIG1vZGFsU2VydmljZSBieSBwcm92aWRpbmdcbiAqIGEgcGxhY2UgaG9sZGVyIGZvciBpdCB0byBpbmplY3QgRGlhbG9nIGNvbXBvbmVudCBpbnRvLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LW1vZGFsJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgI21vZGFsPjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbntcblxuICAgIEBWaWV3Q2hpbGQoJ21vZGFsJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KVxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlKVxuICAgIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5yZWdpc3RlclZpZXdDb250YWluZXJSZWYodGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICB9XG5cbn1cbiJdfQ==