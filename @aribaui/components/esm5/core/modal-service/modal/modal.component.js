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
var ModalComponent = /** @class */ (function () {
    function ModalComponent(modalService) {
        this.modalService = modalService;
    }
    /**
     * @return {?}
     */
    ModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
    };
    ModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-modal',
                    template: "<div #modal></div>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return [
        { type: ModalService }
    ]; };
    ModalComponent.propDecorators = {
        viewContainerRef: [{ type: ViewChild, args: ['modal', { read: ViewContainerRef },] }]
    };
    return ModalComponent;
}());
export { ModalComponent };
function ModalComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ModalComponent.prototype.viewContainerRef;
    /** @type {?} */
    ModalComponent.prototype.modalService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvbW9kYWwtc2VydmljZS9tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFVLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztJQW1CMUMsd0JBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0tBRTdDOzs7O0lBRUQsaUNBQVE7OztJQUFSO1FBRUksSUFBSSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNyRTs7Z0JBbkJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLHNCQUNiO29CQUNHLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDZjs7OztnQkFaTyxZQUFZOzs7bUNBZ0JmLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7O3lCQXJDaEQ7O1NBa0NhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01vZGFsU2VydmljZX0gZnJvbSAnLi4vbW9kYWwuc2VydmljZSc7XG5cblxuLyoqXG4gKiBQbGFjZSBob2xkZXIgZm9yIGFsbCBtb2RhbCBkaWFsb2dzLiBUaGlzIGNvbXBvbmVudCB3b3JrcyB3aXRoIHRoZSBtb2RhbFNlcnZpY2UgYnkgcHJvdmlkaW5nXG4gKiBhIHBsYWNlIGhvbGRlciBmb3IgaXQgdG8gaW5qZWN0IERpYWxvZyBjb21wb25lbnQgaW50by5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1tb2RhbCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICNtb2RhbD48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG5cbiAgICBAVmlld0NoaWxkKCdtb2RhbCcsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSlcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSlcbiAgICB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2UucmVnaXN0ZXJWaWV3Q29udGFpbmVyUmVmKHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG59XG4iXX0=