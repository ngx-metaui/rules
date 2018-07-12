/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ConfirmationComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ConfirmationComponent, _super);
    function ConfirmationComponent(env) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        /**
         * support two way data binding on visible property.
         */
        _this.visibleChange = new EventEmitter();
        /**
         * Whether there's an x at the top right that makes the dialog closable.
         */
        _this.closable = false;
        /**
         * Event fired when dialog is closed.
         */
        _this.onClose = new EventEmitter();
        /**
         * Event fired when the dialog is opened.
         */
        _this.onOpen = new EventEmitter();
        /**
         * Fired when user clicked on confirm button.
         */
        _this.onConfirm = new EventEmitter();
        /**
         * Fired when user clicked on cancel button.
         */
        _this.onCancel = new EventEmitter();
        _this.width = 400;
        _this.height = 'auto';
        // Todo: internationalize.
        // Todo: internationalize.
        _this.confirmActionLabel = 'Confirm';
        _this.cancelActionLabel = 'Cancel';
        return _this;
    }
    /**
     * open confirmation.
     */
    /**
     * open confirmation.
     * @return {?}
     */
    ConfirmationComponent.prototype.open = /**
     * open confirmation.
     * @return {?}
     */
    function () {
        this.visible = true;
        this.onOpen.emit();
        this.visibleChange.emit(true);
    };
    /**
     * close confirmation.
     */
    /**
     * close confirmation.
     * @return {?}
     */
    ConfirmationComponent.prototype.close = /**
     * close confirmation.
     * @return {?}
     */
    function () {
        this.visible = false;
        this.onClose.emit();
        // Important to make sure change is set on parent binding.
        // Otherwise, the variable and dialog open/close state can be out
        // of sync and we wouldn't trigger change detection.
        this.visibleChange.emit(false);
    };
    /**
     * Does the confirmation have header content?
     */
    /**
     * Does the confirmation have header content?
     * @return {?}
     */
    ConfirmationComponent.prototype.hasHeader = /**
     * Does the confirmation have header content?
     * @return {?}
     */
    function () {
        return isPresent(this.header);
    };
    /**
     * Does the confirmation have footer content?
     */
    /**
     * Does the confirmation have footer content?
     * @return {?}
     */
    ConfirmationComponent.prototype.hasFooter = /**
     * Does the confirmation have footer content?
     * @return {?}
     */
    function () {
        return isPresent(this.footer);
    };
    /**
     * Confirm action.
     */
    /**
     * Confirm action.
     * @return {?}
     */
    ConfirmationComponent.prototype.confirm = /**
     * Confirm action.
     * @return {?}
     */
    function () {
        this.close();
        this.onConfirm.emit();
    };
    /**
     * Cancel action.
     */
    /**
     * Cancel action.
     * @return {?}
     */
    ConfirmationComponent.prototype.cancel = /**
     * Cancel action.
     * @return {?}
     */
    function () {
        this.close();
        this.onCancel.emit();
    };
    ConfirmationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-confirmation',
                    template: "<aw-dialog [title]=\"title\" [(visible)]=\"visible\"\n           [modal]=\"true\" [closable]=\"closable\" [width]=\"width\" [height]=\"height\"\n           [styleClass]=\"styleClass\" [appendTo]=\"appendTo\" (onOpen)=\"open()\" (onClose)=\"close()\">\n\n    <aw-dialog-header *ngIf=\"hasHeader()\">\n        <ng-content select=\"aw-confirmation-header\"></ng-content>\n    </aw-dialog-header>\n\n    {{body}}\n    <ng-content></ng-content>\n\n\n    <aw-dialog-footer *ngIf=\"hasFooter(); else defaultFooter\">\n        <ng-content select=\"aw-confirmation-footer\"></ng-content>\n    </aw-dialog-footer>\n\n    <ng-template #defaultFooter>\n        <aw-dialog-footer>\n            <aw-button name=\"confirm\" [style]=\"'primary'\" (action)=\"confirm()\">\n                {{confirmActionLabel}}\n            </aw-button>\n\n            <aw-button name=\"cancel\" [style]=\"'secondary'\" (action)=\"cancel()\">\n                {{cancelActionLabel}}\n            </aw-button>\n\n        </aw-dialog-footer>\n    </ng-template>\n\n</aw-dialog>\n",
                    styles: [".confirmation-footer-separator{border-top:1px solid #d7d7d7;height:14px}"]
                },] },
    ];
    /** @nocollapse */
    ConfirmationComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
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
    return ConfirmationComponent;
}(ModalContainer));
export { ConfirmationComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2NvbmZpcm1hdGlvbi9jb25maXJtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0hqQyxpREFBYztJQXNGckQsK0JBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBT2I7UUFUa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7Ozs4QkFqREEsSUFBSSxZQUFZLEVBQUU7Ozs7eUJBTWpDLEtBQUs7Ozs7d0JBWUksSUFBSSxZQUFZLEVBQUU7Ozs7dUJBTW5CLElBQUksWUFBWSxFQUFFOzs7OzBCQU1mLElBQUksWUFBWSxFQUFFOzs7O3lCQU1uQixJQUFJLFlBQVksRUFBRTtRQWlCNUMsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O1FBRXJCLEFBREEsMEJBQTBCO1FBQzFCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDcEMsS0FBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQzs7S0FDckM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxvQ0FBSTs7OztJQUFKO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQztJQUVEOztPQUVHOzs7OztJQUNILHFDQUFLOzs7O0lBQUw7UUFFSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDOzs7O1FBS3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gseUNBQVM7Ozs7SUFBVDtRQUVJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gseUNBQVM7Ozs7SUFBVDtRQUVJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUNBQU87Ozs7SUFBUDtRQUVJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7SUFFRDs7T0FFRzs7Ozs7SUFDSCxzQ0FBTTs7OztJQUFOO1FBRUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4Qjs7Z0JBN0xKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUscWhDQThCYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQywwRUFBMEUsQ0FBQztpQkFDdkY7Ozs7Z0JBdEhPLFdBQVc7Ozt3QkE2SGQsS0FBSzt1QkFPTCxLQUFLO3FDQVFMLEtBQUs7b0NBUUwsS0FBSztnQ0FPTCxNQUFNOzJCQU1OLEtBQUs7MkJBTUwsS0FBSzswQkFNTCxNQUFNO3lCQU1OLE1BQU07NEJBTU4sTUFBTTsyQkFNTixNQUFNO3lCQU1OLFlBQVksU0FBQywyQkFBMkI7eUJBS3hDLFlBQVksU0FBQywyQkFBMkI7O2dDQS9ON0M7RUE0STJDLGNBQWM7U0FBNUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TW9kYWxDb250YWluZXJ9IGZyb20gJy4uLy4uL2NvcmUvbW9kYWwtc2VydmljZS9tb2RhbC1jb250YWluZXInO1xuaW1wb3J0IHtDb25maXJtYXRpb25IZWFkZXJDb21wb25lbnR9IGZyb20gJy4vY29uZmlybWF0aW9uLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb25maXJtYXRpb25Gb290ZXJDb21wb25lbnR9IGZyb20gJy4vY29uZmlybWF0aW9uLWZvb3Rlci5jb21wb25lbnQnO1xuXG4vKipcbiAqIENvbmZpcm1hdGlvbiBDb21wb25lbnQgaXMgYSBzcGVjaWZpYyB2ZXJzaW9uIG9mIHRoZSBkaWFsb2cgd2hlcmUgaXQgc3VwcG9ydHMgY29uZmlybSBhbmQgY2FuY2VsXG4gKiBmdW5jdGlvbmFsaXR5LiBJdCBiZWhhdmVzIGxpa2UgYSBkaWFsb2csIGlzIG1vZGFsLCBhbmQgbm90IGNsb3NhYmxlIGJ5IGRlZmF1bHQuXG4gKlxuICogVGhlcmUgYXJlIHRocmVlIHR5cGVzIG9mIHBvcHVwLlxuICogICAxLiAgYSByZWd1bGFyIGRpYWxvZyBib3ggdGhhdCBoYXMgaGVhZGVyLCBib2R5IGFuZCBmb290ZXIuIEl0J3MgdGhlIG1vc3QgY3VzdG9taXphYmxlLlxuICogICAyLiAgYSBjb25maXJtYXRpb24gYm94IGlzIHNpbWlsYXIgdG8gYSBkaWFsb2cgYm94IGJ1dCBoYXMgYWNjZXB0IGFuZCByZWplY3QgYWN0aW9uIGJ1dHRvbnMuXG4gKiAgIDMuICBhIG92ZXJsYXksIHdoaWNoIGlzIGEgdmVyeSBiYXNpYyBwb3B1cCB3aXRoIHdoYXQgeW91IHB1dCBpbnNpZGUuXG4gKiAgICAgICBJdCBkb2Vzbid0IGhhdmUgaGVhZGVyIGFuZCBmb290ZXIuXG4gKlxuICogVGhlcmUgYXJlIHR3byB3YXlzIHRvIHVzZSBhbnkgcG9wdXAgY29tcG9uZW50LlxuICogICAxLiAgRWl0aGVyIGRpcmVjdGx5IGJ5IHVzaW5nIGNvbXBvbmVudCwgYXctZGlhbG9nLCBhdy1jb25maXJtYXRpb24gb3IgYXctb3ZlcmxheVxuICogICAyLiAgb3IgdGhlIE1vZGFsU2VydmljZSAgc2VydmljZS5vcGVuKDxDb25maXJtYXRpb25Db21wb25lbnQ+KSwgc2VydmljZS5jbG9zZSgpXG4gKlxuICogVXNhZ2U6XG4gKiAgICAxLiAgVXNpbmcgTW9kYWxTZXJ2aWNlIGRpcmVjdGx5IHRvIGRpc3BsYXkgYSBtb2RhbCBwb3B1cC4gVGhpcyB1c2FnZSBpcyBhIHF1aWNrIHdheSB0byBzaG93XG4gKiAgICAgICAgYSBjb25maXJtYXRpb24gdG8gdGhlIHVzZXIuXG4gKlxuICogICAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uub3BlbjxDb25maXJtYXRpb25Db21wb25lbnQ+KENvbmZpcm1hdGlvbkNvbXBvbmVudCwge1xuICogICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm1hdGlvbicsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IGAgQXJlIHlvdSBzdXJlID8gYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUFjdGlvbigpO1xuICogICAgICAgICAgICAgICAgICAgICAgICB9LFxuICogICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogKCkgPT4ge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEFjdGlvbigpO1xuICogICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiAgICAgICAgICAgfSk7XG4gKlxuICpcbiAqICAgMi4gICBVc2UgdGhlIGNvbXBvbmVudCBpbnNpZGUgeW91ciB0ZW1wbGF0ZS5cbiAqXG4gKiAgICAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYXctcGFnZScgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctY29uZmlybWF0aW9uIFt0aXRsZV09XCInQ29uZmlybWF0aW9uJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyh2aXNpYmxlKV09XCJkaXNwbGF5XCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbkNvbmZpcm0pPVwiY29uZmlybUFjdGlvbigpXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2FuY2VsKT1cImNhbmNlbEFjdGlvbigpXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwic2FwLWljb24gaWNvbi1hbGVydFwiPjwvaT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB5b3VyIGhhcmQgZHJpdmU/XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWNvbmZpcm1hdGlvbj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiBbc2l6ZV09XCInc21hbGwnXCIgKGNsaWNrKT1cIm9wZW4oKVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcGVuIENvbmZpcm1hdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuICogICAgICAgICAgICAgICAgICBgXG4gKiAgICAgICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYm9vbGVhbiA9IGZhbHNlO1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uZmlybUFjdGlvbjogc3RyaW5nO1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgICAgICAgICBuZ09uSW5pdCgpIHsgfVxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgb3BlbigpIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAqICAgICAgICAgICAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uZmlybUFjdGlvbigpICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUFjdGlvbiA9IFwiY29uZmlybWVkXCI7XG4gKiAgICAgICAgICAgICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgY2xvc2UoKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcbiAqICAgICAgICAgICAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxBY3Rpb24oKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtQWN0aW9uID0gXCJjYW5jZWxlZFwiO1xuICogICAgICAgICAgICAgICAgICAgICAgfVxuICpcbiAqICAgICAgIH1cbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWNvbmZpcm1hdGlvbicsXG4gICAgdGVtcGxhdGU6IGA8YXctZGlhbG9nIFt0aXRsZV09XCJ0aXRsZVwiIFsodmlzaWJsZSldPVwidmlzaWJsZVwiXG4gICAgICAgICAgIFttb2RhbF09XCJ0cnVlXCIgW2Nsb3NhYmxlXT1cImNsb3NhYmxlXCIgW3dpZHRoXT1cIndpZHRoXCIgW2hlaWdodF09XCJoZWlnaHRcIlxuICAgICAgICAgICBbc3R5bGVDbGFzc109XCJzdHlsZUNsYXNzXCIgW2FwcGVuZFRvXT1cImFwcGVuZFRvXCIgKG9uT3Blbik9XCJvcGVuKClcIiAob25DbG9zZSk9XCJjbG9zZSgpXCI+XG5cbiAgICA8YXctZGlhbG9nLWhlYWRlciAqbmdJZj1cImhhc0hlYWRlcigpXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImF3LWNvbmZpcm1hdGlvbi1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9hdy1kaWFsb2ctaGVhZGVyPlxuXG4gICAge3tib2R5fX1cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cblxuICAgIDxhdy1kaWFsb2ctZm9vdGVyICpuZ0lmPVwiaGFzRm9vdGVyKCk7IGVsc2UgZGVmYXVsdEZvb3RlclwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJhdy1jb25maXJtYXRpb24tZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgIDwvYXctZGlhbG9nLWZvb3Rlcj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEZvb3Rlcj5cbiAgICAgICAgPGF3LWRpYWxvZy1mb290ZXI+XG4gICAgICAgICAgICA8YXctYnV0dG9uIG5hbWU9XCJjb25maXJtXCIgW3N0eWxlXT1cIidwcmltYXJ5J1wiIChhY3Rpb24pPVwiY29uZmlybSgpXCI+XG4gICAgICAgICAgICAgICAge3tjb25maXJtQWN0aW9uTGFiZWx9fVxuICAgICAgICAgICAgPC9hdy1idXR0b24+XG5cbiAgICAgICAgICAgIDxhdy1idXR0b24gbmFtZT1cImNhbmNlbFwiIFtzdHlsZV09XCInc2Vjb25kYXJ5J1wiIChhY3Rpb24pPVwiY2FuY2VsKClcIj5cbiAgICAgICAgICAgICAgICB7e2NhbmNlbEFjdGlvbkxhYmVsfX1cbiAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuXG4gICAgICAgIDwvYXctZGlhbG9nLWZvb3Rlcj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG48L2F3LWRpYWxvZz5cbmAsXG4gICAgc3R5bGVzOiBbYC5jb25maXJtYXRpb24tZm9vdGVyLXNlcGFyYXRvcntib3JkZXItdG9wOjFweCBzb2xpZCAjZDdkN2Q3O2hlaWdodDoxNHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1hdGlvbkNvbXBvbmVudCBleHRlbmRzIE1vZGFsQ29udGFpbmVyXG57XG4gICAgLyoqXG4gICAgICogVGl0bGUgZm9yIHRoZSBEaWFsb2cuICBpZiB0aXRsZSBhbmQgJ1RpdGxlVGVtcGxhdGUnIGFyZSBib3RoIHNldCwgdGl0bGVUZW1wbGF0ZSB0YWtlc1xuICAgICAqIHByZWNlZGVuY2UuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQm9keSBzZWN0aW9uIGZvciBEaWFsb2cuIENhbGxlciBzaG91bGQgdXNlIGVpdGhlciB0aGUgYm9keSBzdHJpbmcsIG9yIGNvbnRlbnQgcHJvamVjdGlvblxuICAgICAqIHRvIGFkZCB2YWx1ZXMgdG8gdGhlIGRpYWxvZy4gSWYgYm90aCBhcmUgdXNlZCwgdGhleSB3aWxsIGJvdGggc2hvdyB1cC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJvZHk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIElmIHlvdSBhcmUgbm90IHVzaW5nIGN1c3RvbSBidXR0b25zIHlvdSBjYW4gcGFzcyBhIGxhYmVsIHRvIE9LIGFjdGlvblxuICAgICAqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBpcyBPS1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29uZmlybUFjdGlvbkxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJZiB5b3UgYXJlIG5vdCB1c2luZyBjdXN0b20gYnV0dG9ucyB5b3UgY2FuIHBhc3MgYSBsYWJlbCB0byBDYW5jZWwgYWN0aW9uXG4gICAgICpcbiAgICAgKiBEZWZhdWx0IHZhbHVlIGlzIE9LXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjYW5jZWxBY3Rpb25MYWJlbDogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBzdXBwb3J0IHR3byB3YXkgZGF0YSBiaW5kaW5nIG9uIHZpc2libGUgcHJvcGVydHkuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgdmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZXJlJ3MgYW4geCBhdCB0aGUgdG9wIHJpZ2h0IHRoYXQgbWFrZXMgdGhlIGRpYWxvZyBjbG9zYWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNsb3NhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIGRpYWxvZy4gXCJib2R5XCIgb3IgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgYXJlIHZhbGlkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXBwZW5kVG86IGFueTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gZGlhbG9nIGlzIGNsb3NlZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIGRpYWxvZyBpcyBvcGVuZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25PcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVkIHdoZW4gdXNlciBjbGlja2VkIG9uIGNvbmZpcm0gYnV0dG9uLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ29uZmlybTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlZCB3aGVuIHVzZXIgY2xpY2tlZCBvbiBjYW5jZWwgYnV0dG9uLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEhlYWRlciBjb21wb25lbnQuIFVzdWFsbHkgY29udGFpbnMgdGhlIHRpdGxlLlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoQ29uZmlybWF0aW9uSGVhZGVyQ29tcG9uZW50KSBoZWFkZXI6IENvbmZpcm1hdGlvbkhlYWRlckNvbXBvbmVudDtcblxuICAgIC8qKlxuICAgICAqIERpYWxvZyBmb290ZXIuIFVzdWFsbHkgY29udGFpbnMgYnV0dG9uc1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoQ29uZmlybWF0aW9uRm9vdGVyQ29tcG9uZW50KSBmb290ZXI6IENvbmZpcm1hdGlvbkZvb3RlckNvbXBvbmVudDtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSA0MDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgICAvLyBUb2RvOiBpbnRlcm5hdGlvbmFsaXplLlxuICAgICAgICB0aGlzLmNvbmZpcm1BY3Rpb25MYWJlbCA9ICdDb25maXJtJztcbiAgICAgICAgdGhpcy5jYW5jZWxBY3Rpb25MYWJlbCA9ICdDYW5jZWwnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9wZW4gY29uZmlybWF0aW9uLlxuICAgICAqL1xuICAgIG9wZW4oKVxuICAgIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbk9wZW4uZW1pdCgpO1xuXG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNsb3NlIGNvbmZpcm1hdGlvbi5cbiAgICAgKi9cbiAgICBjbG9zZSgpXG4gICAge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcblxuICAgICAgICAvLyBJbXBvcnRhbnQgdG8gbWFrZSBzdXJlIGNoYW5nZSBpcyBzZXQgb24gcGFyZW50IGJpbmRpbmcuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgdGhlIHZhcmlhYmxlIGFuZCBkaWFsb2cgb3Blbi9jbG9zZSBzdGF0ZSBjYW4gYmUgb3V0XG4gICAgICAgIC8vIG9mIHN5bmMgYW5kIHdlIHdvdWxkbid0IHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvZXMgdGhlIGNvbmZpcm1hdGlvbiBoYXZlIGhlYWRlciBjb250ZW50P1xuICAgICAqL1xuICAgIGhhc0hlYWRlcigpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuaGVhZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb2VzIHRoZSBjb25maXJtYXRpb24gaGF2ZSBmb290ZXIgY29udGVudD9cbiAgICAgKi9cbiAgICBoYXNGb290ZXIoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmZvb3Rlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlybSBhY3Rpb24uXG4gICAgICovXG4gICAgY29uZmlybSgpXG4gICAge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMub25Db25maXJtLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYW5jZWwgYWN0aW9uLlxuICAgICAqL1xuICAgIGNhbmNlbCgpXG4gICAge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMub25DYW5jZWwuZW1pdCgpO1xuICAgIH1cbn1cbiJdfQ==