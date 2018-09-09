/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Injectable } from '@angular/core';
/**
 * Modal service is used to to create modal dialogs. It creates modal dialogs dynamically.
 * The service also keeps track of the created modal dialog and can close it by calling the
 * service's close()
 *
 * Modal service requires a ViewContainer to insert newly created modals. This is taken care
 * by the ModalComponent.
 *
 * Usage:
 *     Add   <aw-modal></aw-modal>  into your application main html. It needs to be on every
 *     page where a modal dialog will appear.
 *
 *    1.  Popup a dialog without creating your own component.
 *        Use the existing DialogComponent in widgets.
 *
 *             this.modalService.open<DialogComponent>(DialogComponent, {
 *                     title: 'My Popup Title',
 *                     body: 'My Popup Body'
 *              });
 *
 *
 *   2.   Creating your own Dialog Component to popup.
 *
 *         let componentRef = this.modalService.open<MyDialogComponent>(MyDialogComponent,
 * {inputs});
 *
 * \@Component({
 *                selector: 'aw-mydialog' ,
 *                           template: `
 *                                         <aw-dialog (onClose)="closePopup()">
 *                                              <ng-template #titleTemplate>
 *                                                 <span><i class="fa fa-envira" ></i>This is my
 *     Title </span>
 *                                              </ng-template>
 *                                              <ng-template #bodyTemplate>
 *                                                 <span><i class="fa fa-envira" ></i>This is my
 *     Body </span>
 *                                              </ng-template>
 *                                        </aw-dialog>
 *                                     `
 *         })
 *         export class MyDialogComponent extends DialogComponent implements OnInit {
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *
 *                     closePopup() {
 *                            this.modalService.close();
 *                      }
 *         }
 */
var ModalService = /** @class */ (function () {
    /**
     * DI ComponentFactoryResolver to be used to create modal component.
     *
     * @param cfr
     */
    function ModalService(cfr) {
        this.cfr = cfr;
    }
    /**
     *  PlaceHolder for modal to be inserted.
     *
     * @param vcRef
     */
    /**
     *  PlaceHolder for modal to be inserted.
     *
     * @param {?} vcRef
     * @return {?}
     */
    ModalService.prototype.registerViewContainerRef = /**
     *  PlaceHolder for modal to be inserted.
     *
     * @param {?} vcRef
     * @return {?}
     */
    function (vcRef) {
        this.vcRef = vcRef;
    };
    /**
     * Opens the modal dialog by dynamically creating the component and adding it to vcRef.
     *
     */
    /**
     * Opens the modal dialog by dynamically creating the component and adding it to vcRef.
     *
     * @template T
     * @param {?} component
     * @param {?=} parameters
     * @return {?}
     */
    ModalService.prototype.open = /**
     * Opens the modal dialog by dynamically creating the component and adding it to vcRef.
     *
     * @template T
     * @param {?} component
     * @param {?=} parameters
     * @return {?}
     */
    function (component, parameters) {
        /** @type {?} */
        var cf = this.cfr.resolveComponentFactory(component);
        /** @type {?} */
        var componentRef = this.vcRef.createComponent(cf);
        // Auto set visiblity to true. So that the Dialog will display
        parameters = (parameters) ? parameters : {};
        parameters['visible'] = true;
        // Handle output parameters.
        ModalService.OUTPUT_PARAMETERS.forEach(function (param) {
            if (parameters[param]) {
                (/** @type {?} */ (componentRef.instance))[param].subscribe(parameters[param]);
                delete parameters[param];
            }
        });
        Object.assign(componentRef.instance, parameters);
        // had to cast it in order to avoid any index Error
        // Attach a destroy method to the newly created component.
        (/** @type {?} */ (componentRef.instance))['destroy'] = function () {
            componentRef.destroy();
        };
        // Save the instance, so it can be destroyed later.
        this.instance = componentRef;
        return componentRef;
    };
    /**
     * Calling close() will remove the modal from view.
     */
    /**
     * Calling close() will remove the modal from view.
     * @return {?}
     */
    ModalService.prototype.close = /**
     * Calling close() will remove the modal from view.
     * @return {?}
     */
    function () {
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }
    };
    /**
     * This is a static list of output parameter from Dialog, Confirmation components
     * that needs to be handled.
     *
     */
    ModalService.OUTPUT_PARAMETERS = ['onClose', 'onConfirm', 'onCancel'];
    ModalService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ModalService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    return ModalService;
}());
export { ModalService };
if (false) {
    /**
     * This is a static list of output parameter from Dialog, Confirmation components
     * that needs to be handled.
     *
     * @type {?}
     */
    ModalService.OUTPUT_PARAMETERS;
    /**
     * Container for the newly created modal. This is passed in through the
     * registerViewContainerRef().
     * @type {?}
     */
    ModalService.prototype.vcRef;
    /**
     * Storing the created modal instance.
     * @type {?}
     */
    ModalService.prototype.instance;
    /** @type {?} */
    ModalService.prototype.cfr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFFSCx3QkFBd0IsRUFFeEIsVUFBVSxFQUdiLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0RW5COzs7O09BSUc7SUFDSCxzQkFBb0IsR0FBNkI7UUFBN0IsUUFBRyxHQUFILEdBQUcsQ0FBMEI7S0FFaEQ7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsK0NBQXdCOzs7Ozs7SUFBeEIsVUFBeUIsS0FBdUI7UUFFNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdEI7SUFFRDs7O09BR0c7Ozs7Ozs7OztJQUNILDJCQUFJOzs7Ozs7OztJQUFKLFVBQVEsU0FBa0IsRUFBRSxVQUFnQjs7UUFFeEMsSUFBTSxFQUFFLEdBQXdCLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBQzVFLElBQUksWUFBWSxHQUFvQixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFHbkUsVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzVDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7O1FBRzdCLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBRXpDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLG1CQUFNLFlBQVksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7UUFJakQsbUJBQU0sWUFBWSxDQUFDLFFBQVEsRUFBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHO1lBRXRDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQixDQUFDOztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDdkI7SUFFRDs7T0FFRzs7Ozs7SUFDSCw0QkFBSzs7OztJQUFMO1FBRUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtLQUNKOzs7Ozs7cUNBOUU0QyxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDOztnQkFScEYsVUFBVTs7OztnQkEzRFAsd0JBQXdCOzt1QkF0QjVCOztTQWtGYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBJbmplY3RhYmxlLFxuICAgIFR5cGUsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBNb2RhbCBzZXJ2aWNlIGlzIHVzZWQgdG8gdG8gY3JlYXRlIG1vZGFsIGRpYWxvZ3MuIEl0IGNyZWF0ZXMgbW9kYWwgZGlhbG9ncyBkeW5hbWljYWxseS5cbiAqIFRoZSBzZXJ2aWNlIGFsc28ga2VlcHMgdHJhY2sgb2YgdGhlIGNyZWF0ZWQgbW9kYWwgZGlhbG9nIGFuZCBjYW4gY2xvc2UgaXQgYnkgY2FsbGluZyB0aGVcbiAqIHNlcnZpY2UncyBjbG9zZSgpXG4gKlxuICogTW9kYWwgc2VydmljZSByZXF1aXJlcyBhIFZpZXdDb250YWluZXIgdG8gaW5zZXJ0IG5ld2x5IGNyZWF0ZWQgbW9kYWxzLiBUaGlzIGlzIHRha2VuIGNhcmVcbiAqIGJ5IHRoZSBNb2RhbENvbXBvbmVudC5cbiAqXG4gKiBVc2FnZTpcbiAqICAgICBBZGQgICA8YXctbW9kYWw+PC9hdy1tb2RhbD4gIGludG8geW91ciBhcHBsaWNhdGlvbiBtYWluIGh0bWwuIEl0IG5lZWRzIHRvIGJlIG9uIGV2ZXJ5XG4gKiAgICAgcGFnZSB3aGVyZSBhIG1vZGFsIGRpYWxvZyB3aWxsIGFwcGVhci5cbiAqXG4gKiAgICAxLiAgUG9wdXAgYSBkaWFsb2cgd2l0aG91dCBjcmVhdGluZyB5b3VyIG93biBjb21wb25lbnQuXG4gKiAgICAgICAgVXNlIHRoZSBleGlzdGluZyBEaWFsb2dDb21wb25lbnQgaW4gd2lkZ2V0cy5cbiAqXG4gKiAgICAgICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5vcGVuPERpYWxvZ0NvbXBvbmVudD4oRGlhbG9nQ29tcG9uZW50LCB7XG4gKiAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTXkgUG9wdXAgVGl0bGUnLFxuICogICAgICAgICAgICAgICAgICAgICBib2R5OiAnTXkgUG9wdXAgQm9keSdcbiAqICAgICAgICAgICAgICB9KTtcbiAqXG4gKlxuICogICAyLiAgIENyZWF0aW5nIHlvdXIgb3duIERpYWxvZyBDb21wb25lbnQgdG8gcG9wdXAuXG4gKlxuICogICAgICAgICBsZXQgY29tcG9uZW50UmVmID0gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbjxNeURpYWxvZ0NvbXBvbmVudD4oTXlEaWFsb2dDb21wb25lbnQsXG4gKiB7aW5wdXRzfSk7XG4gKlxuICogICAgICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2F3LW15ZGlhbG9nJyAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWRpYWxvZyAob25DbG9zZSk9XCJjbG9zZVBvcHVwKClcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdGl0bGVUZW1wbGF0ZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiZmEgZmEtZW52aXJhXCIgPjwvaT5UaGlzIGlzIG15XG4gKiAgICAgVGl0bGUgPC9zcGFuPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYm9keVRlbXBsYXRlPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJmYSBmYS1lbnZpcmFcIiA+PC9pPlRoaXMgaXMgbXlcbiAqICAgICBCb2R5IDwvc3Bhbj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWRpYWxvZz5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAqICAgICAgICAgfSlcbiAqICAgICAgICAgZXhwb3J0IGNsYXNzIE15RGlhbG9nQ29tcG9uZW50IGV4dGVuZHMgRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgICAgICAgICBuZ09uSW5pdCgpIHsgfVxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLmNsb3NlKCk7XG4gKiAgICAgICAgICAgICAgICAgICAgICB9XG4gKiAgICAgICAgIH1cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGFsU2VydmljZVxue1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgYSBzdGF0aWMgbGlzdCBvZiBvdXRwdXQgcGFyYW1ldGVyIGZyb20gRGlhbG9nLCBDb25maXJtYXRpb24gY29tcG9uZW50c1xuICAgICAqIHRoYXQgbmVlZHMgdG8gYmUgaGFuZGxlZC5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIE9VVFBVVF9QQVJBTUVURVJTOiBzdHJpbmdbXSA9IFsnb25DbG9zZScsICdvbkNvbmZpcm0nLCAnb25DYW5jZWwnXTtcblxuXG4gICAgLyoqXG4gICAgICogQ29udGFpbmVyIGZvciB0aGUgbmV3bHkgY3JlYXRlZCBtb2RhbC4gVGhpcyBpcyBwYXNzZWQgaW4gdGhyb3VnaCB0aGVcbiAgICAgKiByZWdpc3RlclZpZXdDb250YWluZXJSZWYoKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmluZyB0aGUgY3JlYXRlZCBtb2RhbCBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGluc3RhbmNlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBESSBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgdG8gYmUgdXNlZCB0byBjcmVhdGUgbW9kYWwgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNmclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpXG4gICAge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBQbGFjZUhvbGRlciBmb3IgbW9kYWwgdG8gYmUgaW5zZXJ0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmNSZWZcbiAgICAgKi9cbiAgICByZWdpc3RlclZpZXdDb250YWluZXJSZWYodmNSZWY6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnZjUmVmID0gdmNSZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIG1vZGFsIGRpYWxvZyBieSBkeW5hbWljYWxseSBjcmVhdGluZyB0aGUgY29tcG9uZW50IGFuZCBhZGRpbmcgaXQgdG8gdmNSZWYuXG4gICAgICpcbiAgICAgKi9cbiAgICBvcGVuPFQ+KGNvbXBvbmVudDogVHlwZTxUPiwgcGFyYW1ldGVycz86IGFueSk6IENvbXBvbmVudFJlZjxUPlxuICAgIHtcbiAgICAgICAgY29uc3QgY2Y6IENvbXBvbmVudEZhY3Rvcnk8VD4gPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgICAgICBsZXQgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VD4gPSB0aGlzLnZjUmVmLmNyZWF0ZUNvbXBvbmVudChjZik7XG5cbiAgICAgICAgLy8gQXV0byBzZXQgdmlzaWJsaXR5IHRvIHRydWUuIFNvIHRoYXQgdGhlIERpYWxvZyB3aWxsIGRpc3BsYXlcbiAgICAgICAgcGFyYW1ldGVycyA9IChwYXJhbWV0ZXJzKSA/IHBhcmFtZXRlcnMgOiB7fTtcbiAgICAgICAgcGFyYW1ldGVyc1sndmlzaWJsZSddID0gdHJ1ZTtcblxuICAgICAgICAvLyBIYW5kbGUgb3V0cHV0IHBhcmFtZXRlcnMuXG4gICAgICAgIE1vZGFsU2VydmljZS5PVVRQVVRfUEFSQU1FVEVSUy5mb3JFYWNoKChwYXJhbSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnNbcGFyYW1dKSB7XG4gICAgICAgICAgICAgICAgKDxhbnk+Y29tcG9uZW50UmVmLmluc3RhbmNlKVtwYXJhbV0uc3Vic2NyaWJlKHBhcmFtZXRlcnNbcGFyYW1dKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1ldGVyc1twYXJhbV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oY29tcG9uZW50UmVmLmluc3RhbmNlLCBwYXJhbWV0ZXJzKTtcblxuICAgICAgICAvLyBoYWQgdG8gY2FzdCBpdCBpbiBvcmRlciB0byBhdm9pZCBhbnkgaW5kZXggRXJyb3JcbiAgICAgICAgLy8gQXR0YWNoIGEgZGVzdHJveSBtZXRob2QgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgY29tcG9uZW50LlxuICAgICAgICAoPGFueT5jb21wb25lbnRSZWYuaW5zdGFuY2UpWydkZXN0cm95J10gPSAoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBjb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBTYXZlIHRoZSBpbnN0YW5jZSwgc28gaXQgY2FuIGJlIGRlc3Ryb3llZCBsYXRlci5cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IGNvbXBvbmVudFJlZjtcblxuICAgICAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxpbmcgY2xvc2UoKSB3aWxsIHJlbW92ZSB0aGUgbW9kYWwgZnJvbSB2aWV3LlxuICAgICAqL1xuICAgIGNsb3NlKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19