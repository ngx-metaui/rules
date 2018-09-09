/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2NvbmZpcm1hdGlvbi9jb25maXJtYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0ZqQyxpREFBYztJQXNGckQsK0JBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBT2I7UUFUa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7Ozs4QkFqREEsSUFBSSxZQUFZLEVBQUU7Ozs7eUJBTWpDLEtBQUs7Ozs7d0JBWUksSUFBSSxZQUFZLEVBQUU7Ozs7dUJBTW5CLElBQUksWUFBWSxFQUFFOzs7OzBCQU1mLElBQUksWUFBWSxFQUFFOzs7O3lCQU1uQixJQUFJLFlBQVksRUFBRTtRQWlCNUMsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O1FBRXJCLEFBREEsMEJBQTBCO1FBQzFCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDcEMsS0FBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQzs7S0FDckM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxvQ0FBSTs7OztJQUFKO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQztJQUVEOztPQUVHOzs7OztJQUNILHFDQUFLOzs7O0lBQUw7UUFFSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDOzs7O1FBS3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gseUNBQVM7Ozs7SUFBVDtRQUVJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gseUNBQVM7Ozs7SUFBVDtRQUVJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUNBQU87Ozs7SUFBUDtRQUVJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7SUFFRDs7T0FFRzs7Ozs7SUFDSCxzQ0FBTTs7OztJQUFOO1FBRUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN4Qjs7Z0JBL0pKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQiwraENBQTBDOztpQkFFN0M7Ozs7Z0JBeEZPLFdBQVc7Ozt3QkErRmQsS0FBSzt1QkFPTCxLQUFLO3FDQVFMLEtBQUs7b0NBUUwsS0FBSztnQ0FPTCxNQUFNOzJCQU1OLEtBQUs7MkJBTUwsS0FBSzswQkFNTCxNQUFNO3lCQU1OLE1BQU07NEJBTU4sTUFBTTsyQkFNTixNQUFNO3lCQU1OLFlBQVksU0FBQywyQkFBMkI7eUJBS3hDLFlBQVksU0FBQywyQkFBMkI7O2dDQWpNN0M7RUE4RzJDLGNBQWM7U0FBNUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TW9kYWxDb250YWluZXJ9IGZyb20gJy4uLy4uL2NvcmUvbW9kYWwtc2VydmljZS9tb2RhbC1jb250YWluZXInO1xuaW1wb3J0IHtDb25maXJtYXRpb25IZWFkZXJDb21wb25lbnR9IGZyb20gJy4vY29uZmlybWF0aW9uLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb25maXJtYXRpb25Gb290ZXJDb21wb25lbnR9IGZyb20gJy4vY29uZmlybWF0aW9uLWZvb3Rlci5jb21wb25lbnQnO1xuXG4vKipcbiAqIENvbmZpcm1hdGlvbiBDb21wb25lbnQgaXMgYSBzcGVjaWZpYyB2ZXJzaW9uIG9mIHRoZSBkaWFsb2cgd2hlcmUgaXQgc3VwcG9ydHMgY29uZmlybSBhbmQgY2FuY2VsXG4gKiBmdW5jdGlvbmFsaXR5LiBJdCBiZWhhdmVzIGxpa2UgYSBkaWFsb2csIGlzIG1vZGFsLCBhbmQgbm90IGNsb3NhYmxlIGJ5IGRlZmF1bHQuXG4gKlxuICogVGhlcmUgYXJlIHRocmVlIHR5cGVzIG9mIHBvcHVwLlxuICogICAxLiAgYSByZWd1bGFyIGRpYWxvZyBib3ggdGhhdCBoYXMgaGVhZGVyLCBib2R5IGFuZCBmb290ZXIuIEl0J3MgdGhlIG1vc3QgY3VzdG9taXphYmxlLlxuICogICAyLiAgYSBjb25maXJtYXRpb24gYm94IGlzIHNpbWlsYXIgdG8gYSBkaWFsb2cgYm94IGJ1dCBoYXMgYWNjZXB0IGFuZCByZWplY3QgYWN0aW9uIGJ1dHRvbnMuXG4gKiAgIDMuICBhIG92ZXJsYXksIHdoaWNoIGlzIGEgdmVyeSBiYXNpYyBwb3B1cCB3aXRoIHdoYXQgeW91IHB1dCBpbnNpZGUuXG4gKiAgICAgICBJdCBkb2Vzbid0IGhhdmUgaGVhZGVyIGFuZCBmb290ZXIuXG4gKlxuICogVGhlcmUgYXJlIHR3byB3YXlzIHRvIHVzZSBhbnkgcG9wdXAgY29tcG9uZW50LlxuICogICAxLiAgRWl0aGVyIGRpcmVjdGx5IGJ5IHVzaW5nIGNvbXBvbmVudCwgYXctZGlhbG9nLCBhdy1jb25maXJtYXRpb24gb3IgYXctb3ZlcmxheVxuICogICAyLiAgb3IgdGhlIE1vZGFsU2VydmljZSAgc2VydmljZS5vcGVuKDxDb25maXJtYXRpb25Db21wb25lbnQ+KSwgc2VydmljZS5jbG9zZSgpXG4gKlxuICogVXNhZ2U6XG4gKiAgICAxLiAgVXNpbmcgTW9kYWxTZXJ2aWNlIGRpcmVjdGx5IHRvIGRpc3BsYXkgYSBtb2RhbCBwb3B1cC4gVGhpcyB1c2FnZSBpcyBhIHF1aWNrIHdheSB0byBzaG93XG4gKiAgICAgICAgYSBjb25maXJtYXRpb24gdG8gdGhlIHVzZXIuXG4gKlxuICogICAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uub3BlbjxDb25maXJtYXRpb25Db21wb25lbnQ+KENvbmZpcm1hdGlvbkNvbXBvbmVudCwge1xuICogICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm1hdGlvbicsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IGAgQXJlIHlvdSBzdXJlID8gYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUFjdGlvbigpO1xuICogICAgICAgICAgICAgICAgICAgICAgICB9LFxuICogICAgICAgICAgICAgICAgICAgICAgICBvbkNhbmNlbDogKCkgPT4ge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEFjdGlvbigpO1xuICogICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiAgICAgICAgICAgfSk7XG4gKlxuICpcbiAqICAgMi4gICBVc2UgdGhlIGNvbXBvbmVudCBpbnNpZGUgeW91ciB0ZW1wbGF0ZS5cbiAqXG4gKiAgICAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYXctcGFnZScgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctY29uZmlybWF0aW9uIFt0aXRsZV09XCInQ29uZmlybWF0aW9uJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyh2aXNpYmxlKV09XCJkaXNwbGF5XCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbkNvbmZpcm0pPVwiY29uZmlybUFjdGlvbigpXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2FuY2VsKT1cImNhbmNlbEFjdGlvbigpXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwic2FwLWljb24gaWNvbi1hbGVydFwiPjwvaT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB5b3VyIGhhcmQgZHJpdmU/XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWNvbmZpcm1hdGlvbj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiBbc2l6ZV09XCInc21hbGwnXCIgKGNsaWNrKT1cIm9wZW4oKVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcGVuIENvbmZpcm1hdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuICogICAgICAgICAgICAgICAgICBgXG4gKiAgICAgICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYm9vbGVhbiA9IGZhbHNlO1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uZmlybUFjdGlvbjogc3RyaW5nO1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgICAgICAgICBuZ09uSW5pdCgpIHsgfVxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgb3BlbigpIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAqICAgICAgICAgICAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uZmlybUFjdGlvbigpICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybUFjdGlvbiA9IFwiY29uZmlybWVkXCI7XG4gKiAgICAgICAgICAgICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgY2xvc2UoKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcbiAqICAgICAgICAgICAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxBY3Rpb24oKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtQWN0aW9uID0gXCJjYW5jZWxlZFwiO1xuICogICAgICAgICAgICAgICAgICAgICAgfVxuICpcbiAqICAgICAgIH1cbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWNvbmZpcm1hdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICdjb25maXJtYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjb25maXJtYXRpb24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25Db21wb25lbnQgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclxue1xuICAgIC8qKlxuICAgICAqIFRpdGxlIGZvciB0aGUgRGlhbG9nLiAgaWYgdGl0bGUgYW5kICdUaXRsZVRlbXBsYXRlJyBhcmUgYm90aCBzZXQsIHRpdGxlVGVtcGxhdGUgdGFrZXNcbiAgICAgKiBwcmVjZWRlbmNlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEJvZHkgc2VjdGlvbiBmb3IgRGlhbG9nLiBDYWxsZXIgc2hvdWxkIHVzZSBlaXRoZXIgdGhlIGJvZHkgc3RyaW5nLCBvciBjb250ZW50IHByb2plY3Rpb25cbiAgICAgKiB0byBhZGQgdmFsdWVzIHRvIHRoZSBkaWFsb2cuIElmIGJvdGggYXJlIHVzZWQsIHRoZXkgd2lsbCBib3RoIHNob3cgdXAuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib2R5OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJZiB5b3UgYXJlIG5vdCB1c2luZyBjdXN0b20gYnV0dG9ucyB5b3UgY2FuIHBhc3MgYSBsYWJlbCB0byBPSyBhY3Rpb25cbiAgICAgKlxuICAgICAqIERlZmF1bHQgdmFsdWUgaXMgT0tcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbmZpcm1BY3Rpb25MYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSWYgeW91IGFyZSBub3QgdXNpbmcgY3VzdG9tIGJ1dHRvbnMgeW91IGNhbiBwYXNzIGEgbGFiZWwgdG8gQ2FuY2VsIGFjdGlvblxuICAgICAqXG4gICAgICogRGVmYXVsdCB2YWx1ZSBpcyBPS1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2FuY2VsQWN0aW9uTGFiZWw6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogc3VwcG9ydCB0d28gd2F5IGRhdGEgYmluZGluZyBvbiB2aXNpYmxlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGVyZSdzIGFuIHggYXQgdGhlIHRvcCByaWdodCB0aGF0IG1ha2VzIHRoZSBkaWFsb2cgY2xvc2FibGUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjbG9zYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBkaWFsb2cuIFwiYm9keVwiIG9yIGxvY2FsIG5nLXRlbXBsYXRlIHZhcmlhYmxlIGFyZSB2YWxpZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZFRvOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIGRpYWxvZyBpcyBjbG9zZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBkaWFsb2cgaXMgb3BlbmVkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlZCB3aGVuIHVzZXIgY2xpY2tlZCBvbiBjb25maXJtIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNvbmZpcm06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiB1c2VyIGNsaWNrZWQgb24gY2FuY2VsIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNhbmNlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBIZWFkZXIgY29tcG9uZW50LiBVc3VhbGx5IGNvbnRhaW5zIHRoZSB0aXRsZS5cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKENvbmZpcm1hdGlvbkhlYWRlckNvbXBvbmVudCkgaGVhZGVyOiBDb25maXJtYXRpb25IZWFkZXJDb21wb25lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBEaWFsb2cgZm9vdGVyLiBVc3VhbGx5IGNvbnRhaW5zIGJ1dHRvbnNcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKENvbmZpcm1hdGlvbkZvb3RlckNvbXBvbmVudCkgZm9vdGVyOiBDb25maXJtYXRpb25Gb290ZXJDb21wb25lbnQ7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICB0aGlzLndpZHRoID0gNDAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgLy8gVG9kbzogaW50ZXJuYXRpb25hbGl6ZS5cbiAgICAgICAgdGhpcy5jb25maXJtQWN0aW9uTGFiZWwgPSAnQ29uZmlybSc7XG4gICAgICAgIHRoaXMuY2FuY2VsQWN0aW9uTGFiZWwgPSAnQ2FuY2VsJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvcGVuIGNvbmZpcm1hdGlvbi5cbiAgICAgKi9cbiAgICBvcGVuKClcbiAgICB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMub25PcGVuLmVtaXQoKTtcblxuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjbG9zZSBjb25maXJtYXRpb24uXG4gICAgICovXG4gICAgY2xvc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG5cbiAgICAgICAgLy8gSW1wb3J0YW50IHRvIG1ha2Ugc3VyZSBjaGFuZ2UgaXMgc2V0IG9uIHBhcmVudCBiaW5kaW5nLlxuICAgICAgICAvLyBPdGhlcndpc2UsIHRoZSB2YXJpYWJsZSBhbmQgZGlhbG9nIG9wZW4vY2xvc2Ugc3RhdGUgY2FuIGJlIG91dFxuICAgICAgICAvLyBvZiBzeW5jIGFuZCB3ZSB3b3VsZG4ndCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb2VzIHRoZSBjb25maXJtYXRpb24gaGF2ZSBoZWFkZXIgY29udGVudD9cbiAgICAgKi9cbiAgICBoYXNIZWFkZXIoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmhlYWRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9lcyB0aGUgY29uZmlybWF0aW9uIGhhdmUgZm9vdGVyIGNvbnRlbnQ/XG4gICAgICovXG4gICAgaGFzRm9vdGVyKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5mb290ZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpcm0gYWN0aW9uLlxuICAgICAqL1xuICAgIGNvbmZpcm0oKVxuICAgIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLm9uQ29uZmlybS5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FuY2VsIGFjdGlvbi5cbiAgICAgKi9cbiAgICBjYW5jZWwoKVxuICAgIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLm9uQ2FuY2VsLmVtaXQoKTtcbiAgICB9XG59XG4iXX0=