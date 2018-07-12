/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
export class ModalService {
    /**
     * DI ComponentFactoryResolver to be used to create modal component.
     *
     * @param {?} cfr
     */
    constructor(cfr) {
        this.cfr = cfr;
    }
    /**
     *  PlaceHolder for modal to be inserted.
     *
     * @param {?} vcRef
     * @return {?}
     */
    registerViewContainerRef(vcRef) {
        this.vcRef = vcRef;
    }
    /**
     * Opens the modal dialog by dynamically creating the component and adding it to vcRef.
     *
     * @template T
     * @param {?} component
     * @param {?=} parameters
     * @return {?}
     */
    open(component, parameters) {
        const /** @type {?} */ cf = this.cfr.resolveComponentFactory(component);
        let /** @type {?} */ componentRef = this.vcRef.createComponent(cf);
        // Auto set visiblity to true. So that the Dialog will display
        parameters = (parameters) ? parameters : {};
        parameters['visible'] = true;
        // Handle output parameters.
        ModalService.OUTPUT_PARAMETERS.forEach((param) => {
            if (parameters[param]) {
                (/** @type {?} */ (componentRef.instance))[param].subscribe(parameters[param]);
                delete parameters[param];
            }
        });
        Object.assign(componentRef.instance, parameters);
        // had to cast it in order to avoid any index Error
        // Attach a destroy method to the newly created component.
        (/** @type {?} */ (componentRef.instance))['destroy'] = () => {
            componentRef.destroy();
        };
        // Save the instance, so it can be destroyed later.
        this.instance = componentRef;
        return componentRef;
    }
    /**
     * Calling close() will remove the modal from view.
     * @return {?}
     */
    close() {
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }
    }
}
/**
 * This is a static list of output parameter from Dialog, Confirmation components
 * that needs to be handled.
 *
 */
ModalService.OUTPUT_PARAMETERS = ['onClose', 'onConfirm', 'onCancel'];
ModalService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ModalService.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
function ModalService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFFSCx3QkFBd0IsRUFFeEIsVUFBVSxFQUdiLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVEdkIsTUFBTTs7Ozs7O0lBMEJGLFlBQW9CLEdBQTZCO1FBQTdCLFFBQUcsR0FBSCxHQUFHLENBQTBCO0tBRWhEOzs7Ozs7O0lBT0Qsd0JBQXdCLENBQUMsS0FBdUI7UUFFNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdEI7Ozs7Ozs7OztJQU1ELElBQUksQ0FBSSxTQUFrQixFQUFFLFVBQWdCO1FBRXhDLHVCQUFNLEVBQUUsR0FBd0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RSxxQkFBSSxZQUFZLEdBQW9CLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUduRSxVQUFVLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDNUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQzs7UUFHN0IsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBRTdDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLG1CQUFNLFlBQVksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7UUFJakQsbUJBQU0sWUFBWSxDQUFDLFFBQVEsRUFBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUUzQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUIsQ0FBQzs7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztRQUU3QixNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3ZCOzs7OztJQUtELEtBQUs7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0tBQ0o7Ozs7Ozs7aUNBOUU0QyxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDOztZQVJwRixVQUFVOzs7O1lBM0RQLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgSW5qZWN0YWJsZSxcbiAgICBUeXBlLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTW9kYWwgc2VydmljZSBpcyB1c2VkIHRvIHRvIGNyZWF0ZSBtb2RhbCBkaWFsb2dzLiBJdCBjcmVhdGVzIG1vZGFsIGRpYWxvZ3MgZHluYW1pY2FsbHkuXG4gKiBUaGUgc2VydmljZSBhbHNvIGtlZXBzIHRyYWNrIG9mIHRoZSBjcmVhdGVkIG1vZGFsIGRpYWxvZyBhbmQgY2FuIGNsb3NlIGl0IGJ5IGNhbGxpbmcgdGhlXG4gKiBzZXJ2aWNlJ3MgY2xvc2UoKVxuICpcbiAqIE1vZGFsIHNlcnZpY2UgcmVxdWlyZXMgYSBWaWV3Q29udGFpbmVyIHRvIGluc2VydCBuZXdseSBjcmVhdGVkIG1vZGFscy4gVGhpcyBpcyB0YWtlbiBjYXJlXG4gKiBieSB0aGUgTW9kYWxDb21wb25lbnQuXG4gKlxuICogVXNhZ2U6XG4gKiAgICAgQWRkICAgPGF3LW1vZGFsPjwvYXctbW9kYWw+ICBpbnRvIHlvdXIgYXBwbGljYXRpb24gbWFpbiBodG1sLiBJdCBuZWVkcyB0byBiZSBvbiBldmVyeVxuICogICAgIHBhZ2Ugd2hlcmUgYSBtb2RhbCBkaWFsb2cgd2lsbCBhcHBlYXIuXG4gKlxuICogICAgMS4gIFBvcHVwIGEgZGlhbG9nIHdpdGhvdXQgY3JlYXRpbmcgeW91ciBvd24gY29tcG9uZW50LlxuICogICAgICAgIFVzZSB0aGUgZXhpc3RpbmcgRGlhbG9nQ29tcG9uZW50IGluIHdpZGdldHMuXG4gKlxuICogICAgICAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uub3BlbjxEaWFsb2dDb21wb25lbnQ+KERpYWxvZ0NvbXBvbmVudCwge1xuICogICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ015IFBvcHVwIFRpdGxlJyxcbiAqICAgICAgICAgICAgICAgICAgICAgYm9keTogJ015IFBvcHVwIEJvZHknXG4gKiAgICAgICAgICAgICAgfSk7XG4gKlxuICpcbiAqICAgMi4gICBDcmVhdGluZyB5b3VyIG93biBEaWFsb2cgQ29tcG9uZW50IHRvIHBvcHVwLlxuICpcbiAqICAgICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW48TXlEaWFsb2dDb21wb25lbnQ+KE15RGlhbG9nQ29tcG9uZW50LFxuICoge2lucHV0c30pO1xuICpcbiAqICAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhdy1teWRpYWxvZycgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1kaWFsb2cgKG9uQ2xvc2UpPVwiY2xvc2VQb3B1cCgpXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3RpdGxlVGVtcGxhdGU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48aSBjbGFzcz1cImZhIGZhLWVudmlyYVwiID48L2k+VGhpcyBpcyBteVxuICogICAgIFRpdGxlIDwvc3Bhbj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2JvZHlUZW1wbGF0ZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiZmEgZmEtZW52aXJhXCIgPjwvaT5UaGlzIGlzIG15XG4gKiAgICAgQm9keSA8L3NwYW4+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1kaWFsb2c+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gKiAgICAgICAgIH0pXG4gKiAgICAgICAgIGV4cG9ydCBjbGFzcyBNeURpYWxvZ0NvbXBvbmVudCBleHRlbmRzIERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gKiAgICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UpIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBlcigpO1xuICogICAgICAgICAgICAgICAgICAgICAgIH1cbiAqICAgICAgICAgICAgICAgICAgICAgbmdPbkluaXQoKSB7IH1cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5jbG9zZSgpO1xuICogICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICB9XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2RhbFNlcnZpY2VcbntcbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGEgc3RhdGljIGxpc3Qgb2Ygb3V0cHV0IHBhcmFtZXRlciBmcm9tIERpYWxvZywgQ29uZmlybWF0aW9uIGNvbXBvbmVudHNcbiAgICAgKiB0aGF0IG5lZWRzIHRvIGJlIGhhbmRsZWQuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBPVVRQVVRfUEFSQU1FVEVSUzogc3RyaW5nW10gPSBbJ29uQ2xvc2UnLCAnb25Db25maXJtJywgJ29uQ2FuY2VsJ107XG5cblxuICAgIC8qKlxuICAgICAqIENvbnRhaW5lciBmb3IgdGhlIG5ld2x5IGNyZWF0ZWQgbW9kYWwuIFRoaXMgaXMgcGFzc2VkIGluIHRocm91Z2ggdGhlXG4gICAgICogcmVnaXN0ZXJWaWV3Q29udGFpbmVyUmVmKCkuXG4gICAgICovXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIC8qKlxuICAgICAqIFN0b3JpbmcgdGhlIGNyZWF0ZWQgbW9kYWwgaW5zdGFuY2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbnN0YW5jZTogYW55O1xuXG4gICAgLyoqXG4gICAgICogREkgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHRvIGJlIHVzZWQgdG8gY3JlYXRlIG1vZGFsIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZnJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKVxuICAgIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgUGxhY2VIb2xkZXIgZm9yIG1vZGFsIHRvIGJlIGluc2VydGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjUmVmXG4gICAgICovXG4gICAgcmVnaXN0ZXJWaWV3Q29udGFpbmVyUmVmKHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy52Y1JlZiA9IHZjUmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBtb2RhbCBkaWFsb2cgYnkgZHluYW1pY2FsbHkgY3JlYXRpbmcgdGhlIGNvbXBvbmVudCBhbmQgYWRkaW5nIGl0IHRvIHZjUmVmLlxuICAgICAqXG4gICAgICovXG4gICAgb3BlbjxUPihjb21wb25lbnQ6IFR5cGU8VD4sIHBhcmFtZXRlcnM/OiBhbnkpOiBDb21wb25lbnRSZWY8VD5cbiAgICB7XG4gICAgICAgIGNvbnN0IGNmOiBDb21wb25lbnRGYWN0b3J5PFQ+ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgICAgbGV0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFQ+ID0gdGhpcy52Y1JlZi5jcmVhdGVDb21wb25lbnQoY2YpO1xuXG4gICAgICAgIC8vIEF1dG8gc2V0IHZpc2libGl0eSB0byB0cnVlLiBTbyB0aGF0IHRoZSBEaWFsb2cgd2lsbCBkaXNwbGF5XG4gICAgICAgIHBhcmFtZXRlcnMgPSAocGFyYW1ldGVycykgPyBwYXJhbWV0ZXJzIDoge307XG4gICAgICAgIHBhcmFtZXRlcnNbJ3Zpc2libGUnXSA9IHRydWU7XG5cbiAgICAgICAgLy8gSGFuZGxlIG91dHB1dCBwYXJhbWV0ZXJzLlxuICAgICAgICBNb2RhbFNlcnZpY2UuT1VUUFVUX1BBUkFNRVRFUlMuZm9yRWFjaCgocGFyYW0pID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzW3BhcmFtXSkge1xuICAgICAgICAgICAgICAgICg8YW55PmNvbXBvbmVudFJlZi5pbnN0YW5jZSlbcGFyYW1dLnN1YnNjcmliZShwYXJhbWV0ZXJzW3BhcmFtXSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtZXRlcnNbcGFyYW1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudFJlZi5pbnN0YW5jZSwgcGFyYW1ldGVycyk7XG5cbiAgICAgICAgLy8gaGFkIHRvIGNhc3QgaXQgaW4gb3JkZXIgdG8gYXZvaWQgYW55IGluZGV4IEVycm9yXG4gICAgICAgIC8vIEF0dGFjaCBhIGRlc3Ryb3kgbWV0aG9kIHRvIHRoZSBuZXdseSBjcmVhdGVkIGNvbXBvbmVudC5cbiAgICAgICAgKDxhbnk+Y29tcG9uZW50UmVmLmluc3RhbmNlKVsnZGVzdHJveSddID0gKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gU2F2ZSB0aGUgaW5zdGFuY2UsIHNvIGl0IGNhbiBiZSBkZXN0cm95ZWQgbGF0ZXIuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBjb21wb25lbnRSZWY7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsaW5nIGNsb3NlKCkgd2lsbCByZW1vdmUgdGhlIG1vZGFsIGZyb20gdmlldy5cbiAgICAgKi9cbiAgICBjbG9zZSgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==