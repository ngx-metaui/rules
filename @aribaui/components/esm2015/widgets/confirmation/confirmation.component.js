/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                template: "<aw-dialog [title]=\"title\" [(visible)]=\"visible\"\n           [modal]=\"true\" [closable]=\"closable\" [width]=\"width\" [height]=\"height\"\n           [styleClass]=\"styleClass\" [appendTo]=\"appendTo\" (onOpen)=\"open()\" (onClose)=\"close()\">\n\n    <aw-dialog-header *ngIf=\"hasHeader()\">\n        <ng-content select=\"aw-confirmation-header\"></ng-content>\n    </aw-dialog-header>\n\n    {{body}}\n    <ng-content></ng-content>\n\n\n    <aw-dialog-footer *ngIf=\"hasFooter(); else defaultFooter\">\n        <ng-content select=\"aw-confirmation-footer\"></ng-content>\n    </aw-dialog-footer>\n\n    <ng-template #defaultFooter>\n        <aw-dialog-footer>\n            <aw-button name=\"confirm\" [style]=\"'primary'\" (action)=\"confirm()\">\n                {{confirmActionLabel}}\n            </aw-button>\n\n            <aw-button name=\"cancel\" [style]=\"'secondary'\" (action)=\"cancel()\">\n                {{cancelActionLabel}}\n            </aw-button>\n\n        </aw-dialog-footer>\n    </ng-template>\n\n</aw-dialog>\n",
                styles: [".confirmation-footer-separator{border-top:1px solid #d7d7d7;height:14px}"]
            }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2NvbmZpcm1hdGlvbi9jb25maXJtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzVFLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNGNUUsTUFBTSw0QkFBNkIsU0FBUSxjQUFjOzs7O0lBc0ZyRCxZQUFtQixHQUFnQjtRQUUvQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFGSSxRQUFHLEdBQUgsR0FBRyxDQUFhOzs7OzZCQWpEQSxJQUFJLFlBQVksRUFBRTs7Ozt3QkFNakMsS0FBSzs7Ozt1QkFZSSxJQUFJLFlBQVksRUFBRTs7OztzQkFNbkIsSUFBSSxZQUFZLEVBQUU7Ozs7eUJBTWYsSUFBSSxZQUFZLEVBQUU7Ozs7d0JBTW5CLElBQUksWUFBWSxFQUFFO1FBaUI1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7UUFFckIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUNwQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0tBQ3JDOzs7OztJQUtELElBQUk7UUFFQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUtELEtBQUs7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDOzs7O1FBS3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUtELFNBQVM7UUFFTCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqQzs7Ozs7SUFLRCxTQUFTO1FBRUwsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7Ozs7O0lBS0QsT0FBTztRQUVILElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7Ozs7O0lBS0QsTUFBTTtRQUVGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7OztZQS9KSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsK2hDQUEwQzs7YUFFN0M7Ozs7WUF4Rk8sV0FBVzs7O29CQStGZCxLQUFLO21CQU9MLEtBQUs7aUNBUUwsS0FBSztnQ0FRTCxLQUFLOzRCQU9MLE1BQU07dUJBTU4sS0FBSzt1QkFNTCxLQUFLO3NCQU1MLE1BQU07cUJBTU4sTUFBTTt3QkFNTixNQUFNO3VCQU1OLE1BQU07cUJBTU4sWUFBWSxTQUFDLDJCQUEyQjtxQkFLeEMsWUFBWSxTQUFDLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge01vZGFsQ29udGFpbmVyfSBmcm9tICcuLi8uLi9jb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCB7Q29uZmlybWF0aW9uSGVhZGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbmZpcm1hdGlvbi1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7Q29uZmlybWF0aW9uRm9vdGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbmZpcm1hdGlvbi1mb290ZXIuY29tcG9uZW50JztcblxuLyoqXG4gKiBDb25maXJtYXRpb24gQ29tcG9uZW50IGlzIGEgc3BlY2lmaWMgdmVyc2lvbiBvZiB0aGUgZGlhbG9nIHdoZXJlIGl0IHN1cHBvcnRzIGNvbmZpcm0gYW5kIGNhbmNlbFxuICogZnVuY3Rpb25hbGl0eS4gSXQgYmVoYXZlcyBsaWtlIGEgZGlhbG9nLCBpcyBtb2RhbCwgYW5kIG5vdCBjbG9zYWJsZSBieSBkZWZhdWx0LlxuICpcbiAqIFRoZXJlIGFyZSB0aHJlZSB0eXBlcyBvZiBwb3B1cC5cbiAqICAgMS4gIGEgcmVndWxhciBkaWFsb2cgYm94IHRoYXQgaGFzIGhlYWRlciwgYm9keSBhbmQgZm9vdGVyLiBJdCdzIHRoZSBtb3N0IGN1c3RvbWl6YWJsZS5cbiAqICAgMi4gIGEgY29uZmlybWF0aW9uIGJveCBpcyBzaW1pbGFyIHRvIGEgZGlhbG9nIGJveCBidXQgaGFzIGFjY2VwdCBhbmQgcmVqZWN0IGFjdGlvbiBidXR0b25zLlxuICogICAzLiAgYSBvdmVybGF5LCB3aGljaCBpcyBhIHZlcnkgYmFzaWMgcG9wdXAgd2l0aCB3aGF0IHlvdSBwdXQgaW5zaWRlLlxuICogICAgICAgSXQgZG9lc24ndCBoYXZlIGhlYWRlciBhbmQgZm9vdGVyLlxuICpcbiAqIFRoZXJlIGFyZSB0d28gd2F5cyB0byB1c2UgYW55IHBvcHVwIGNvbXBvbmVudC5cbiAqICAgMS4gIEVpdGhlciBkaXJlY3RseSBieSB1c2luZyBjb21wb25lbnQsIGF3LWRpYWxvZywgYXctY29uZmlybWF0aW9uIG9yIGF3LW92ZXJsYXlcbiAqICAgMi4gIG9yIHRoZSBNb2RhbFNlcnZpY2UgIHNlcnZpY2Uub3Blbig8Q29uZmlybWF0aW9uQ29tcG9uZW50PiksIHNlcnZpY2UuY2xvc2UoKVxuICpcbiAqIFVzYWdlOlxuICogICAgMS4gIFVzaW5nIE1vZGFsU2VydmljZSBkaXJlY3RseSB0byBkaXNwbGF5IGEgbW9kYWwgcG9wdXAuIFRoaXMgdXNhZ2UgaXMgYSBxdWljayB3YXkgdG8gc2hvd1xuICogICAgICAgIGEgY29uZmlybWF0aW9uIHRvIHRoZSB1c2VyLlxuICpcbiAqICAgICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLm9wZW48Q29uZmlybWF0aW9uQ29tcG9uZW50PihDb25maXJtYXRpb25Db21wb25lbnQsIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtYXRpb24nLFxuICogICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBgIEFyZSB5b3Ugc3VyZSA/IGAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4ge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1BY3Rpb24oKTtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgb25DYW5jZWw6ICgpID0+IHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxBY3Rpb24oKTtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgIH0pO1xuICpcbiAqXG4gKiAgIDIuICAgVXNlIHRoZSBjb21wb25lbnQgaW5zaWRlIHlvdXIgdGVtcGxhdGUuXG4gKlxuICogICAgICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2F3LXBhZ2UnICxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWNvbmZpcm1hdGlvbiBbdGl0bGVdPVwiJ0NvbmZpcm1hdGlvbidcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsodmlzaWJsZSldPVwiZGlzcGxheVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25Db25maXJtKT1cImNvbmZpcm1BY3Rpb24oKVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbkNhbmNlbCk9XCJjYW5jZWxBY3Rpb24oKVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInNhcC1pY29uIGljb24tYWxlcnRcIj48L2k+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgeW91ciBoYXJkIGRyaXZlP1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1jb25maXJtYXRpb24+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24gW3NpemVdPVwiJ3NtYWxsJ1wiIChjbGljayk9XCJvcGVuKClcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3BlbiBDb25maXJtYXRpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAqICAgICAgICAgICAgICAgICAgYFxuICogICAgICAgICBleHBvcnQgY2xhc3MgTXlQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1BY3Rpb246IHN0cmluZztcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UpIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBlcigpO1xuICogICAgICAgICAgICAgICAgICAgICAgIH1cbiAqICAgICAgICAgICAgICAgICAgICAgbmdPbkluaXQoKSB7IH1cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIG9wZW4oKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gKiAgICAgICAgICAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1BY3Rpb24oKSAge1xuICogICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1BY3Rpb24gPSBcImNvbmZpcm1lZFwiO1xuICogICAgICAgICAgICAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKCkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gKiAgICAgICAgICAgICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWN0aW9uKCkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUFjdGlvbiA9IFwiY2FuY2VsZWRcIjtcbiAqICAgICAgICAgICAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICB9XG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1jb25maXJtYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnY29uZmlybWF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnY29uZmlybWF0aW9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybWF0aW9uQ29tcG9uZW50IGV4dGVuZHMgTW9kYWxDb250YWluZXJcbntcbiAgICAvKipcbiAgICAgKiBUaXRsZSBmb3IgdGhlIERpYWxvZy4gIGlmIHRpdGxlIGFuZCAnVGl0bGVUZW1wbGF0ZScgYXJlIGJvdGggc2V0LCB0aXRsZVRlbXBsYXRlIHRha2VzXG4gICAgICogcHJlY2VkZW5jZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBCb2R5IHNlY3Rpb24gZm9yIERpYWxvZy4gQ2FsbGVyIHNob3VsZCB1c2UgZWl0aGVyIHRoZSBib2R5IHN0cmluZywgb3IgY29udGVudCBwcm9qZWN0aW9uXG4gICAgICogdG8gYWRkIHZhbHVlcyB0byB0aGUgZGlhbG9nLiBJZiBib3RoIGFyZSB1c2VkLCB0aGV5IHdpbGwgYm90aCBzaG93IHVwLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYm9keTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSWYgeW91IGFyZSBub3QgdXNpbmcgY3VzdG9tIGJ1dHRvbnMgeW91IGNhbiBwYXNzIGEgbGFiZWwgdG8gT0sgYWN0aW9uXG4gICAgICpcbiAgICAgKiBEZWZhdWx0IHZhbHVlIGlzIE9LXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb25maXJtQWN0aW9uTGFiZWw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIElmIHlvdSBhcmUgbm90IHVzaW5nIGN1c3RvbSBidXR0b25zIHlvdSBjYW4gcGFzcyBhIGxhYmVsIHRvIENhbmNlbCBhY3Rpb25cbiAgICAgKlxuICAgICAqIERlZmF1bHQgdmFsdWUgaXMgT0tcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNhbmNlbEFjdGlvbkxhYmVsOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIHN1cHBvcnQgdHdvIHdheSBkYXRhIGJpbmRpbmcgb24gdmlzaWJsZSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICB2aXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlcmUncyBhbiB4IGF0IHRoZSB0b3AgcmlnaHQgdGhhdCBtYWtlcyB0aGUgZGlhbG9nIGNsb3NhYmxlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2FibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRhcmdldCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgZGlhbG9nLiBcImJvZHlcIiBvciBsb2NhbCBuZy10ZW1wbGF0ZSB2YXJpYWJsZSBhcmUgdmFsaWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhcHBlbmRUbzogYW55O1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiBkaWFsb2cgaXMgY2xvc2VkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiB0aGUgZGlhbG9nIGlzIG9wZW5lZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbk9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiB1c2VyIGNsaWNrZWQgb24gY29uZmlybSBidXR0b24uXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25Db25maXJtOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVkIHdoZW4gdXNlciBjbGlja2VkIG9uIGNhbmNlbCBidXR0b24uXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25DYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogSGVhZGVyIGNvbXBvbmVudC4gVXN1YWxseSBjb250YWlucyB0aGUgdGl0bGUuXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChDb25maXJtYXRpb25IZWFkZXJDb21wb25lbnQpIGhlYWRlcjogQ29uZmlybWF0aW9uSGVhZGVyQ29tcG9uZW50O1xuXG4gICAgLyoqXG4gICAgICogRGlhbG9nIGZvb3Rlci4gVXN1YWxseSBjb250YWlucyBidXR0b25zXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChDb25maXJtYXRpb25Gb290ZXJDb21wb25lbnQpIGZvb3RlcjogQ29uZmlybWF0aW9uRm9vdGVyQ29tcG9uZW50O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IDQwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgIC8vIFRvZG86IGludGVybmF0aW9uYWxpemUuXG4gICAgICAgIHRoaXMuY29uZmlybUFjdGlvbkxhYmVsID0gJ0NvbmZpcm0nO1xuICAgICAgICB0aGlzLmNhbmNlbEFjdGlvbkxhYmVsID0gJ0NhbmNlbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb3BlbiBjb25maXJtYXRpb24uXG4gICAgICovXG4gICAgb3BlbigpXG4gICAge1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KCk7XG5cbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2xvc2UgY29uZmlybWF0aW9uLlxuICAgICAqL1xuICAgIGNsb3NlKClcbiAgICB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCgpO1xuXG4gICAgICAgIC8vIEltcG9ydGFudCB0byBtYWtlIHN1cmUgY2hhbmdlIGlzIHNldCBvbiBwYXJlbnQgYmluZGluZy5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aGUgdmFyaWFibGUgYW5kIGRpYWxvZyBvcGVuL2Nsb3NlIHN0YXRlIGNhbiBiZSBvdXRcbiAgICAgICAgLy8gb2Ygc3luYyBhbmQgd2Ugd291bGRuJ3QgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9lcyB0aGUgY29uZmlybWF0aW9uIGhhdmUgaGVhZGVyIGNvbnRlbnQ/XG4gICAgICovXG4gICAgaGFzSGVhZGVyKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvZXMgdGhlIGNvbmZpcm1hdGlvbiBoYXZlIGZvb3RlciBjb250ZW50P1xuICAgICAqL1xuICAgIGhhc0Zvb3RlcigpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZm9vdGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25maXJtIGFjdGlvbi5cbiAgICAgKi9cbiAgICBjb25maXJtKClcbiAgICB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5vbkNvbmZpcm0uZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbmNlbCBhY3Rpb24uXG4gICAgICovXG4gICAgY2FuY2VsKClcbiAgICB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5vbkNhbmNlbC5lbWl0KCk7XG4gICAgfVxufVxuIl19