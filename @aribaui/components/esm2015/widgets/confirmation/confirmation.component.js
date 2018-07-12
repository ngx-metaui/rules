/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { ModalContainer } from '../../core/modal-service/modal-container';
import { ConfirmationHeaderComponent } from './confirmation-header.component';
import { ConfirmationFooterComponent } from './confirmation-footer.component';
/**
 * Confirmation Component is a specific version of the dialog where it supports confirm and cancel
 * functionality. It behaves like a dialog, is modal, and not closable by default.
 *
 * There are three types of popup.
 *   1.  a regular dialog box that has header, body and footer. It's the most customizable.
 *   2.  a confirmation box is similar to a dialog box but has accept and reject action buttons.
 *   3.  a overlay, which is a very basic popup with what you put inside.
 *       It doesn't have header and footer.
 *
 * There are two ways to use any popup component.
 *   1.  Either directly by using component, aw-dialog, aw-confirmation or aw-overlay
 *   2.  or the ModalService  service.open(<ConfirmationComponent>), service.close()
 *
 * Usage:
 *    1.  Using ModalService directly to display a modal popup. This usage is a quick way to show
 *        a confirmation to the user.
 *
 *          this.modalService.open<ConfirmationComponent>(ConfirmationComponent, {
 *                        title: 'Confirmation',
 *                        body: ` Are you sure ? `,
 *                        width: 300,
 *                        onConfirm: () => {
 *                              this.confirmAction();
 *                        },
 *                        onCancel: () => {
 *                              this.cancelAction();
 *                        }
 *           });
 *
 *
 *   2.   Use the component inside your template.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                              <aw-confirmation [title]="'Confirmation'"
 *                                      [(visible)]="display"
 *                                     (onConfirm)="confirmAction()"
 *                                    (onCancel)="cancelAction()">
 *                                       <i class="sap-icon icon-alert"></i>
 *                                       Are you sure you want to delete your hard drive?
 *                            </aw-confirmation>
 *
 *                                   <aw-button [size]="'small'" (click)="open()">
 *                                       Open Confirmation
 *                                   </aw-button>
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     display: boolean = false;
 *
 *                     confirmAction: string;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *
 *                     open() {
 *                        this.display = true;
 *                     }
 *
 *                     confirmAction()  {
 *                        this.confirmAction = "confirmed";
 *                      }
 *
 *                      close() {
 *                         this.display = false;
 *                      }
 *
 *                      cancelAction() {
 *                          this.confirmAction = "canceled";
 *                      }
 *
 *       }
 *
 *
 */
export class ConfirmationComponent extends ModalContainer {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * support two way data binding on visible property.
         */
        this.visibleChange = new EventEmitter();
        /**
         * Whether there's an x at the top right that makes the dialog closable.
         */
        this.closable = false;
        /**
         * Event fired when dialog is closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Event fired when the dialog is opened.
         */
        this.onOpen = new EventEmitter();
        /**
         * Fired when user clicked on confirm button.
         */
        this.onConfirm = new EventEmitter();
        /**
         * Fired when user clicked on cancel button.
         */
        this.onCancel = new EventEmitter();
        this.width = 400;
        this.height = 'auto';
        // Todo: internationalize.
        this.confirmActionLabel = 'Confirm';
        this.cancelActionLabel = 'Cancel';
    }
    /**
     * open confirmation.
     * @return {?}
     */
    open() {
        this.visible = true;
        this.onOpen.emit();
        this.visibleChange.emit(true);
    }
    /**
     * close confirmation.
     * @return {?}
     */
    close() {
        this.visible = false;
        this.onClose.emit();
        // Important to make sure change is set on parent binding.
        // Otherwise, the variable and dialog open/close state can be out
        // of sync and we wouldn't trigger change detection.
        this.visibleChange.emit(false);
    }
    /**
     * Does the confirmation have header content?
     * @return {?}
     */
    hasHeader() {
        return isPresent(this.header);
    }
    /**
     * Does the confirmation have footer content?
     * @return {?}
     */
    hasFooter() {
        return isPresent(this.footer);
    }
    /**
     * Confirm action.
     * @return {?}
     */
    confirm() {
        this.close();
        this.onConfirm.emit();
    }
    /**
     * Cancel action.
     * @return {?}
     */
    cancel() {
        this.close();
        this.onCancel.emit();
    }
}
ConfirmationComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-confirmation',
                template: `<aw-dialog [title]="title" [(visible)]="visible"
           [modal]="true" [closable]="closable" [width]="width" [height]="height"
           [styleClass]="styleClass" [appendTo]="appendTo" (onOpen)="open()" (onClose)="close()">

    <aw-dialog-header *ngIf="hasHeader()">
        <ng-content select="aw-confirmation-header"></ng-content>
    </aw-dialog-header>

    {{body}}
    <ng-content></ng-content>


    <aw-dialog-footer *ngIf="hasFooter(); else defaultFooter">
        <ng-content select="aw-confirmation-footer"></ng-content>
    </aw-dialog-footer>

    <ng-template #defaultFooter>
        <aw-dialog-footer>
            <aw-button name="confirm" [style]="'primary'" (action)="confirm()">
                {{confirmActionLabel}}
            </aw-button>

            <aw-button name="cancel" [style]="'secondary'" (action)="cancel()">
                {{cancelActionLabel}}
            </aw-button>

        </aw-dialog-footer>
    </ng-template>

</aw-dialog>
`,
                styles: [`.confirmation-footer-separator{border-top:1px solid #d7d7d7;height:14px}`]
            },] },
];
/** @nocollapse */
ConfirmationComponent.ctorParameters = () => [
    { type: Environment }
];
ConfirmationComponent.propDecorators = {
    title: [{ type: Input }],
    body: [{ type: Input }],
    confirmActionLabel: [{ type: Input }],
    cancelActionLabel: [{ type: Input }],
    visibleChange: [{ type: Output }],
    closable: [{ type: Input }],
    appendTo: [{ type: Input }],
    onClose: [{ type: Output }],
    onOpen: [{ type: Output }],
    onConfirm: [{ type: Output }],
    onCancel: [{ type: Output }],
    header: [{ type: ContentChild, args: [ConfirmationHeaderComponent,] }],
    footer: [{ type: ContentChild, args: [ConfirmationFooterComponent,] }]
};
function ConfirmationComponent_tsickle_Closure_declarations() {
    /**
     * Title for the Dialog.  if title and 'TitleTemplate' are both set, titleTemplate takes
     * precedence.
     * @type {?}
     */
    ConfirmationComponent.prototype.title;
    /**
     * Body section for Dialog. Caller should use either the body string, or content projection
     * to add values to the dialog. If both are used, they will both show up.
     * @type {?}
     */
    ConfirmationComponent.prototype.body;
    /**
     * If you are not using custom buttons you can pass a label to OK action
     *
     * Default value is OK
     * @type {?}
     */
    ConfirmationComponent.prototype.confirmActionLabel;
    /**
     * If you are not using custom buttons you can pass a label to Cancel action
     *
     * Default value is OK
     * @type {?}
     */
    ConfirmationComponent.prototype.cancelActionLabel;
    /**
     * support two way data binding on visible property.
     * @type {?}
     */
    ConfirmationComponent.prototype.visibleChange;
    /**
     * Whether there's an x at the top right that makes the dialog closable.
     * @type {?}
     */
    ConfirmationComponent.prototype.closable;
    /**
     * Target element to attach the dialog. "body" or local ng-template variable are valid.
     * @type {?}
     */
    ConfirmationComponent.prototype.appendTo;
    /**
     * Event fired when dialog is closed.
     * @type {?}
     */
    ConfirmationComponent.prototype.onClose;
    /**
     * Event fired when the dialog is opened.
     * @type {?}
     */
    ConfirmationComponent.prototype.onOpen;
    /**
     * Fired when user clicked on confirm button.
     * @type {?}
     */
    ConfirmationComponent.prototype.onConfirm;
    /**
     * Fired when user clicked on cancel button.
     * @type {?}
     */
    ConfirmationComponent.prototype.onCancel;
    /**
     * Header component. Usually contains the title.
     * @type {?}
     */
    ConfirmationComponent.prototype.header;
    /**
     * Dialog footer. Usually contains buttons
     * @type {?}
     */
    ConfirmationComponent.prototype.footer;
    /** @type {?} */
    ConfirmationComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2NvbmZpcm1hdGlvbi9jb25maXJtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzVFLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9INUUsTUFBTSw0QkFBNkIsU0FBUSxjQUFjOzs7O0lBc0ZyRCxZQUFtQixHQUFnQjtRQUUvQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFGSSxRQUFHLEdBQUgsR0FBRyxDQUFhOzs7OzZCQWpEQSxJQUFJLFlBQVksRUFBRTs7Ozt3QkFNakMsS0FBSzs7Ozt1QkFZSSxJQUFJLFlBQVksRUFBRTs7OztzQkFNbkIsSUFBSSxZQUFZLEVBQUU7Ozs7eUJBTWYsSUFBSSxZQUFZLEVBQUU7Ozs7d0JBTW5CLElBQUksWUFBWSxFQUFFO1FBaUI1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7UUFFckIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0tBQ3JDOzs7OztJQUtELElBQUk7UUFFQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUtELEtBQUs7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDOzs7O1FBS3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUtELFNBQVM7UUFFTCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqQzs7Ozs7SUFLRCxTQUFTO1FBRUwsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7Ozs7O0lBS0QsT0FBTztRQUVILElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7Ozs7O0lBS0QsTUFBTTtRQUVGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7OztZQTdMSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E4QmI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsMEVBQTBFLENBQUM7YUFDdkY7Ozs7WUF0SE8sV0FBVzs7O29CQTZIZCxLQUFLO21CQU9MLEtBQUs7aUNBUUwsS0FBSztnQ0FRTCxLQUFLOzRCQU9MLE1BQU07dUJBTU4sS0FBSzt1QkFNTCxLQUFLO3NCQU1MLE1BQU07cUJBTU4sTUFBTTt3QkFNTixNQUFNO3VCQU1OLE1BQU07cUJBTU4sWUFBWSxTQUFDLDJCQUEyQjtxQkFLeEMsWUFBWSxTQUFDLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge01vZGFsQ29udGFpbmVyfSBmcm9tICcuLi8uLi9jb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCB7Q29uZmlybWF0aW9uSGVhZGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbmZpcm1hdGlvbi1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7Q29uZmlybWF0aW9uRm9vdGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbmZpcm1hdGlvbi1mb290ZXIuY29tcG9uZW50JztcblxuLyoqXG4gKiBDb25maXJtYXRpb24gQ29tcG9uZW50IGlzIGEgc3BlY2lmaWMgdmVyc2lvbiBvZiB0aGUgZGlhbG9nIHdoZXJlIGl0IHN1cHBvcnRzIGNvbmZpcm0gYW5kIGNhbmNlbFxuICogZnVuY3Rpb25hbGl0eS4gSXQgYmVoYXZlcyBsaWtlIGEgZGlhbG9nLCBpcyBtb2RhbCwgYW5kIG5vdCBjbG9zYWJsZSBieSBkZWZhdWx0LlxuICpcbiAqIFRoZXJlIGFyZSB0aHJlZSB0eXBlcyBvZiBwb3B1cC5cbiAqICAgMS4gIGEgcmVndWxhciBkaWFsb2cgYm94IHRoYXQgaGFzIGhlYWRlciwgYm9keSBhbmQgZm9vdGVyLiBJdCdzIHRoZSBtb3N0IGN1c3RvbWl6YWJsZS5cbiAqICAgMi4gIGEgY29uZmlybWF0aW9uIGJveCBpcyBzaW1pbGFyIHRvIGEgZGlhbG9nIGJveCBidXQgaGFzIGFjY2VwdCBhbmQgcmVqZWN0IGFjdGlvbiBidXR0b25zLlxuICogICAzLiAgYSBvdmVybGF5LCB3aGljaCBpcyBhIHZlcnkgYmFzaWMgcG9wdXAgd2l0aCB3aGF0IHlvdSBwdXQgaW5zaWRlLlxuICogICAgICAgSXQgZG9lc24ndCBoYXZlIGhlYWRlciBhbmQgZm9vdGVyLlxuICpcbiAqIFRoZXJlIGFyZSB0d28gd2F5cyB0byB1c2UgYW55IHBvcHVwIGNvbXBvbmVudC5cbiAqICAgMS4gIEVpdGhlciBkaXJlY3RseSBieSB1c2luZyBjb21wb25lbnQsIGF3LWRpYWxvZywgYXctY29uZmlybWF0aW9uIG9yIGF3LW92ZXJsYXlcbiAqICAgMi4gIG9yIHRoZSBNb2RhbFNlcnZpY2UgIHNlcnZpY2Uub3Blbig8Q29uZmlybWF0aW9uQ29tcG9uZW50PiksIHNlcnZpY2UuY2xvc2UoKVxuICpcbiAqIFVzYWdlOlxuICogICAgMS4gIFVzaW5nIE1vZGFsU2VydmljZSBkaXJlY3RseSB0byBkaXNwbGF5IGEgbW9kYWwgcG9wdXAuIFRoaXMgdXNhZ2UgaXMgYSBxdWljayB3YXkgdG8gc2hvd1xuICogICAgICAgIGEgY29uZmlybWF0aW9uIHRvIHRoZSB1c2VyLlxuICpcbiAqICAgICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLm9wZW48Q29uZmlybWF0aW9uQ29tcG9uZW50PihDb25maXJtYXRpb25Db21wb25lbnQsIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtYXRpb24nLFxuICogICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBgIEFyZSB5b3Ugc3VyZSA/IGAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4ge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1BY3Rpb24oKTtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6ICgpID0+IHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxBY3Rpb24oKTtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgIH0pO1xuICpcbiAqXG4gKiAgIDIuICAgVXNlIHRoZSBjb21wb25lbnQgaW5zaWRlIHlvdXIgdGVtcGxhdGUuXG4gKlxuICogICAgICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2F3LXBhZ2UnICxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWNvbmZpcm1hdGlvbiBbdGl0bGVdPVwiJ0NvbmZpcm1hdGlvbidcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsodmlzaWJsZSldPVwiZGlzcGxheVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25Db25maXJtKT1cImNvbmZpcm1BY3Rpb24oKVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbkNhbmNlbCk9XCJjYW5jZWxBY3Rpb24oKVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInNhcC1pY29uIGljb24tYWxlcnRcIj48L2k+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgeW91ciBoYXJkIGRyaXZlP1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1jb25maXJtYXRpb24+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24gW3NpemVdPVwiJ3NtYWxsJ1wiIChjbGljayk9XCJvcGVuKClcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3BlbiBDb25maXJtYXRpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAqICAgICAgICAgICAgICAgICAgYFxuICogICAgICAgICBleHBvcnQgY2xhc3MgTXlQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1BY3Rpb246IHN0cmluZztcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UpIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBlcigpO1xuICogICAgICAgICAgICAgICAgICAgICAgIH1cbiAqICAgICAgICAgICAgICAgICAgICAgbmdPbkluaXQoKSB7IH1cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIG9wZW4oKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gKiAgICAgICAgICAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1BY3Rpb24oKSAge1xuICogICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1BY3Rpb24gPSBcImNvbmZpcm1lZFwiO1xuICogICAgICAgICAgICAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKCkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gKiAgICAgICAgICAgICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWN0aW9uKCkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUFjdGlvbiA9IFwiY2FuY2VsZWRcIjtcbiAqICAgICAgICAgICAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICB9XG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1jb25maXJtYXRpb24nLFxuICAgIHRlbXBsYXRlOiBgPGF3LWRpYWxvZyBbdGl0bGVdPVwidGl0bGVcIiBbKHZpc2libGUpXT1cInZpc2libGVcIlxuICAgICAgICAgICBbbW9kYWxdPVwidHJ1ZVwiIFtjbG9zYWJsZV09XCJjbG9zYWJsZVwiIFt3aWR0aF09XCJ3aWR0aFwiIFtoZWlnaHRdPVwiaGVpZ2h0XCJcbiAgICAgICAgICAgW3N0eWxlQ2xhc3NdPVwic3R5bGVDbGFzc1wiIFthcHBlbmRUb109XCJhcHBlbmRUb1wiIChvbk9wZW4pPVwib3BlbigpXCIgKG9uQ2xvc2UpPVwiY2xvc2UoKVwiPlxuXG4gICAgPGF3LWRpYWxvZy1oZWFkZXIgKm5nSWY9XCJoYXNIZWFkZXIoKVwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJhdy1jb25maXJtYXRpb24taGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgIDwvYXctZGlhbG9nLWhlYWRlcj5cblxuICAgIHt7Ym9keX19XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG5cbiAgICA8YXctZGlhbG9nLWZvb3RlciAqbmdJZj1cImhhc0Zvb3RlcigpOyBlbHNlIGRlZmF1bHRGb290ZXJcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYXctY29uZmlybWF0aW9uLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICA8L2F3LWRpYWxvZy1mb290ZXI+XG5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRGb290ZXI+XG4gICAgICAgIDxhdy1kaWFsb2ctZm9vdGVyPlxuICAgICAgICAgICAgPGF3LWJ1dHRvbiBuYW1lPVwiY29uZmlybVwiIFtzdHlsZV09XCIncHJpbWFyeSdcIiAoYWN0aW9uKT1cImNvbmZpcm0oKVwiPlxuICAgICAgICAgICAgICAgIHt7Y29uZmlybUFjdGlvbkxhYmVsfX1cbiAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuXG4gICAgICAgICAgICA8YXctYnV0dG9uIG5hbWU9XCJjYW5jZWxcIiBbc3R5bGVdPVwiJ3NlY29uZGFyeSdcIiAoYWN0aW9uKT1cImNhbmNlbCgpXCI+XG4gICAgICAgICAgICAgICAge3tjYW5jZWxBY3Rpb25MYWJlbH19XG4gICAgICAgICAgICA8L2F3LWJ1dHRvbj5cblxuICAgICAgICA8L2F3LWRpYWxvZy1mb290ZXI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuPC9hdy1kaWFsb2c+XG5gLFxuICAgIHN0eWxlczogW2AuY29uZmlybWF0aW9uLWZvb3Rlci1zZXBhcmF0b3J7Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q3ZDdkNztoZWlnaHQ6MTRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25Db21wb25lbnQgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclxue1xuICAgIC8qKlxuICAgICAqIFRpdGxlIGZvciB0aGUgRGlhbG9nLiAgaWYgdGl0bGUgYW5kICdUaXRsZVRlbXBsYXRlJyBhcmUgYm90aCBzZXQsIHRpdGxlVGVtcGxhdGUgdGFrZXNcbiAgICAgKiBwcmVjZWRlbmNlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEJvZHkgc2VjdGlvbiBmb3IgRGlhbG9nLiBDYWxsZXIgc2hvdWxkIHVzZSBlaXRoZXIgdGhlIGJvZHkgc3RyaW5nLCBvciBjb250ZW50IHByb2plY3Rpb25cbiAgICAgKiB0byBhZGQgdmFsdWVzIHRvIHRoZSBkaWFsb2cuIElmIGJvdGggYXJlIHVzZWQsIHRoZXkgd2lsbCBib3RoIHNob3cgdXAuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib2R5OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJZiB5b3UgYXJlIG5vdCB1c2luZyBjdXN0b20gYnV0dG9ucyB5b3UgY2FuIHBhc3MgYSBsYWJlbCB0byBPSyBhY3Rpb25cbiAgICAgKlxuICAgICAqIERlZmF1bHQgdmFsdWUgaXMgT0tcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbmZpcm1BY3Rpb25MYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSWYgeW91IGFyZSBub3QgdXNpbmcgY3VzdG9tIGJ1dHRvbnMgeW91IGNhbiBwYXNzIGEgbGFiZWwgdG8gQ2FuY2VsIGFjdGlvblxuICAgICAqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBpcyBPS1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2FuY2VsQWN0aW9uTGFiZWw6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogc3VwcG9ydCB0d28gd2F5IGRhdGEgYmluZGluZyBvbiB2aXNpYmxlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGVyZSdzIGFuIHggYXQgdGhlIHRvcCByaWdodCB0aGF0IG1ha2VzIHRoZSBkaWFsb2cgY2xvc2FibGUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjbG9zYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBkaWFsb2cuIFwiYm9keVwiIG9yIGxvY2FsIG5nLXRlbXBsYXRlIHZhcmlhYmxlIGFyZSB2YWxpZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZFRvOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIGRpYWxvZyBpcyBjbG9zZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBkaWFsb2cgaXMgb3BlbmVkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlZCB3aGVuIHVzZXIgY2xpY2tlZCBvbiBjb25maXJtIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNvbmZpcm06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiB1c2VyIGNsaWNrZWQgb24gY2FuY2VsIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNhbmNlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBIZWFkZXIgY29tcG9uZW50LiBVc3VhbGx5IGNvbnRhaW5zIHRoZSB0aXRsZS5cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKENvbmZpcm1hdGlvbkhlYWRlckNvbXBvbmVudCkgaGVhZGVyOiBDb25maXJtYXRpb25IZWFkZXJDb21wb25lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBEaWFsb2cgZm9vdGVyLiBVc3VhbGx5IGNvbnRhaW5zIGJ1dHRvbnNcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKENvbmZpcm1hdGlvbkZvb3RlckNvbXBvbmVudCkgZm9vdGVyOiBDb25maXJtYXRpb25Gb290ZXJDb21wb25lbnQ7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICB0aGlzLndpZHRoID0gNDAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgLy8gVG9kbzogaW50ZXJuYXRpb25hbGl6ZS5cbiAgICAgICAgdGhpcy5jb25maXJtQWN0aW9uTGFiZWwgPSAnQ29uZmlybSc7XG4gICAgICAgIHRoaXMuY2FuY2VsQWN0aW9uTGFiZWwgPSAnQ2FuY2VsJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvcGVuIGNvbmZpcm1hdGlvbi5cbiAgICAgKi9cbiAgICBvcGVuKClcbiAgICB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMub25PcGVuLmVtaXQoKTtcblxuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjbG9zZSBjb25maXJtYXRpb24uXG4gICAgICovXG4gICAgY2xvc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG5cbiAgICAgICAgLy8gSW1wb3J0YW50IHRvIG1ha2Ugc3VyZSBjaGFuZ2UgaXMgc2V0IG9uIHBhcmVudCBiaW5kaW5nLlxuICAgICAgICAvLyBPdGhlcndpc2UsIHRoZSB2YXJpYWJsZSBhbmQgZGlhbG9nIG9wZW4vY2xvc2Ugc3RhdGUgY2FuIGJlIG91dFxuICAgICAgICAvLyBvZiBzeW5jIGFuZCB3ZSB3b3VsZG4ndCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb2VzIHRoZSBjb25maXJtYXRpb24gaGF2ZSBoZWFkZXIgY29udGVudD9cbiAgICAgKi9cbiAgICBoYXNIZWFkZXIoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmhlYWRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9lcyB0aGUgY29uZmlybWF0aW9uIGhhdmUgZm9vdGVyIGNvbnRlbnQ/XG4gICAgICovXG4gICAgaGFzRm9vdGVyKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5mb290ZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpcm0gYWN0aW9uLlxuICAgICAqL1xuICAgIGNvbmZpcm0oKVxuICAgIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLm9uQ29uZmlybS5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FuY2VsIGFjdGlvbi5cbiAgICAgKi9cbiAgICBjYW5jZWwoKVxuICAgIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLm9uQ2FuY2VsLmVtaXQoKTtcbiAgICB9XG59XG4iXX0=