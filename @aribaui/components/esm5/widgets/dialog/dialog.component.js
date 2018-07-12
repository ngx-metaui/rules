/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { ModalContainer } from '../../core/modal-service/modal-container';
import { DialogHeaderComponent } from './dialog-header.component';
import { DialogFooterComponent } from './dialog-footer.component';
/**
 * Dialog Component that provides the look and feel for a modal dialog. This component has three
 * sections: header, body, and footer. It can be used by itself or extended.
 *
 * There are three types of popup.
 *   1.  a regular dialog box that has header, body and footer. It's the most customizable.
 *   2.  a confirmation box is similar to a dialog box but has accept and reject action buttons.
 *   3.  a overlay, which is a very basic popup with what you put inside.
 *       It doesn't have header and footer.
 *
 * There are two ways to use any popup component.
 *   1.  Either directly by using component, aw-dialog, aw-confirmation or aw-overlay
 *   2.  or the ModalService  service.open(<DialogComponent>), service.close()
 *
 * Usage:
 *    1.  Using Dialog directly to display a modal popup. This usage is a quick way to show a
 * message to the user.
 *
 *             this.modalService.open<DialogComponent>( DialogComponent, {
 *                     title: 'My Popup Title',
 *                     body: 'My Popup Body'
 *              });
 *
 *
 *   2.   Use the component inside your template.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                              <aw-dialog [(visible)]="display" [modal]="true"
 *                                        (onOpen)="openAction()" (onClose)="closeAction()">
 *
 *                                    <aw-dialog-header>Dialog Header</aw-dialog-header>
 *
 *                                     Dialog Body: Creating a dialog using the dialog component
 *
 *                                    <aw-dialog-footer>
 *                                      <aw-button [size]="'small'" [style]="'primary'"
 *                                                 (click)="close()">OK</aw-button>
 *                                    </aw-dialog-footer>
 *                              </aw-dialog>
 *
 *                          <aw-button [size]="'small'" (click)="open()">Open Dialog</aw-button>
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     display: boolean = false;
 *
 *                     dialogAction: string;
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
 *                     openAction()  {
 *                        this.dialogAction = "open";
 *                      }
 *       }
 *
 *
 */
var DialogComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DialogComponent, _super);
    function DialogComponent(env) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        /**
         * support two way data binding on visible property.
         */
        _this.visibleChange = new EventEmitter();
        /**
         * whether this dialog blocks the rest of the page or not when displayed.
         */
        _this.modal = true;
        /**
         * Whether there's an x at the top right that makes the dialog closable.
         */
        _this.closable = true;
        /**
         * Event fired when dialog is closed.
         */
        _this.onClose = new EventEmitter();
        /**
         * Event fired when the dialog is opened.
         */
        _this.onOpen = new EventEmitter();
        _this.width = 300;
        _this.height = 'auto';
        return _this;
    }
    /**
     * Open this dialog.
     */
    /**
     * Open this dialog.
     * @return {?}
     */
    DialogComponent.prototype.open = /**
     * Open this dialog.
     * @return {?}
     */
    function () {
        this.visible = true;
        this.onOpen.emit();
        // visible is a 2-way binding variable.
        this.visibleChange.emit(true);
    };
    /**
     * close the dialog
     */
    /**
     * close the dialog
     * @return {?}
     */
    DialogComponent.prototype.close = /**
     * close the dialog
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
     * Does this dialog have header.
     *
     */
    /**
     * Does this dialog have header.
     *
     * @return {?}
     */
    DialogComponent.prototype.hasHeader = /**
     * Does this dialog have header.
     *
     * @return {?}
     */
    function () {
        return isPresent(this.header);
    };
    /**
     * Does this dialog have footer.
     *
     */
    /**
     * Does this dialog have footer.
     *
     * @return {?}
     */
    DialogComponent.prototype.hasFooter = /**
     * Does this dialog have footer.
     *
     * @return {?}
     */
    function () {
        return isPresent(this.footer);
    };
    DialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-dialog',
                    template: "<p-dialog [header]=\"title\" [(visible)]=\"visible\"\n          [modal]=\"modal\" [closable]=\"closable\" [width]=\"width\" [height]=\"height\"\n          [styleClass]=\"styleClass\" [appendTo]=\"appendTo\" (onShow)=\"open()\" (onHide)=\"close()\">\n\n    <p-header *ngIf=\"hasHeader()\">\n        <ng-content select=\"aw-dialog-header\"></ng-content>\n    </p-header>\n\n    {{body}}\n    <ng-content></ng-content>\n\n    <p-footer *ngIf=\"hasFooter()\">\n        <div class=\"dialog-footer-separator\"></div>\n        <ng-content select=\"aw-dialog-footer\"></ng-content>\n    </p-footer>\n</p-dialog>\n",
                    styles: ["::ng-deep .ui-dialog .ui-dialog-titlebar{background-color:#f2f2f2;padding:15px 20px}::ng-deep .ui-dialog .ui-dialog-titlebar .ui-dialog-titlebar-icon:hover{border-color:transparent}::ng-deep .ui-widget-header{font-weight:400;font-size:16px}::ng-deep .ui-dialog .ui-dialog-content{padding:15px 20px;line-height:1.3em}::ng-deep .ui-dialog .ui-widget-content{border:none}::ng-deep .ui-dialog.ui-widget-content{border:none;box-shadow:0 2px 10px 0 rgba(0,0,0,.3)}::ng-deep .ui-dialog .dialog-footer-separator{border-top:1px solid #d7d7d7;height:14px}::ng-deep .ui-dialog .ui-dialog-footer{padding:0 20px 15px}"]
                },] },
    ];
    /** @nocollapse */
    DialogComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    DialogComponent.propDecorators = {
        title: [{ type: Input }],
        body: [{ type: Input }],
        visibleChange: [{ type: Output }],
        modal: [{ type: Input }],
        closable: [{ type: Input }],
        appendTo: [{ type: Input }],
        onClose: [{ type: Output }],
        onOpen: [{ type: Output }],
        header: [{ type: ContentChild, args: [DialogHeaderComponent,] }],
        footer: [{ type: ContentChild, args: [DialogFooterComponent,] }]
    };
    return DialogComponent;
}(ModalContainer));
export { DialogComponent };
function DialogComponent_tsickle_Closure_declarations() {
    /**
     * Title for the Dialog.  if title and 'TitleTemplate' are both set, titleTemplate takes
     * precedence.
     * @type {?}
     */
    DialogComponent.prototype.title;
    /**
     * Body section for Dialog. Caller should use either the body string, or content projection
     * to add values to the dialog. If both are used, they will both show up.
     * @type {?}
     */
    DialogComponent.prototype.body;
    /**
     * support two way data binding on visible property.
     * @type {?}
     */
    DialogComponent.prototype.visibleChange;
    /**
     * whether this dialog blocks the rest of the page or not when displayed.
     * @type {?}
     */
    DialogComponent.prototype.modal;
    /**
     * Whether there's an x at the top right that makes the dialog closable.
     * @type {?}
     */
    DialogComponent.prototype.closable;
    /**
     * Target element to attach the dialog. "body" or local ng-template variable are valid.
     * @type {?}
     */
    DialogComponent.prototype.appendTo;
    /**
     * Event fired when dialog is closed.
     * @type {?}
     */
    DialogComponent.prototype.onClose;
    /**
     * Event fired when the dialog is opened.
     * @type {?}
     */
    DialogComponent.prototype.onOpen;
    /**
     * Header component. Usually contains the title.
     * @type {?}
     */
    DialogComponent.prototype.header;
    /**
     * Dialog footer. Usually contains buttons
     * @type {?}
     */
    DialogComponent.prototype.footer;
    /** @type {?} */
    DialogComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RpYWxvZy9kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5RjNCLDJDQUFjO0lBOEQvQyx5QkFBbUIsR0FBZ0I7UUFBbkMsWUFFSSxrQkFBTSxHQUFHLENBQUMsU0FJYjtRQU5rQixTQUFHLEdBQUgsR0FBRyxDQUFhOzs7OzhCQTNDQSxJQUFJLFlBQVksRUFBRTs7OztzQkFNcEMsSUFBSTs7Ozt5QkFNRCxJQUFJOzs7O3dCQVlLLElBQUksWUFBWSxFQUFFOzs7O3VCQU1uQixJQUFJLFlBQVksRUFBRTtRQWlCMUMsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0tBQ3hCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsOEJBQUk7Ozs7SUFBSjtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7O1FBR25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsK0JBQUs7Ozs7SUFBTDtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7UUFLcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7SUFFRDs7O09BR0c7Ozs7OztJQUNILG1DQUFTOzs7OztJQUFUO1FBRUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7SUFFRDs7O09BR0c7Ozs7OztJQUNILG1DQUFTOzs7OztJQUFUO1FBRUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7O2dCQXJJSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSwrbEJBZ0JiO29CQUNHLE1BQU0sRUFBRSxDQUFDLDhsQkFBOGxCLENBQUM7aUJBQzNtQjs7OztnQkEzRk8sV0FBVzs7O3dCQWtHZCxLQUFLO3VCQU9MLEtBQUs7Z0NBS0wsTUFBTTt3QkFNTixLQUFLOzJCQU1MLEtBQUs7MkJBTUwsS0FBSzswQkFNTCxNQUFNO3lCQU1OLE1BQU07eUJBTU4sWUFBWSxTQUFDLHFCQUFxQjt5QkFLbEMsWUFBWSxTQUFDLHFCQUFxQjs7MEJBNUt2QztFQWlIcUMsY0FBYztTQUF0QyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TW9kYWxDb250YWluZXJ9IGZyb20gJy4uLy4uL2NvcmUvbW9kYWwtc2VydmljZS9tb2RhbC1jb250YWluZXInO1xuaW1wb3J0IHtEaWFsb2dIZWFkZXJDb21wb25lbnR9IGZyb20gJy4vZGlhbG9nLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtEaWFsb2dGb290ZXJDb21wb25lbnR9IGZyb20gJy4vZGlhbG9nLWZvb3Rlci5jb21wb25lbnQnO1xuXG4vKipcbiAqIERpYWxvZyBDb21wb25lbnQgdGhhdCBwcm92aWRlcyB0aGUgbG9vayBhbmQgZmVlbCBmb3IgYSBtb2RhbCBkaWFsb2cuIFRoaXMgY29tcG9uZW50IGhhcyB0aHJlZVxuICogc2VjdGlvbnM6IGhlYWRlciwgYm9keSwgYW5kIGZvb3Rlci4gSXQgY2FuIGJlIHVzZWQgYnkgaXRzZWxmIG9yIGV4dGVuZGVkLlxuICpcbiAqIFRoZXJlIGFyZSB0aHJlZSB0eXBlcyBvZiBwb3B1cC5cbiAqICAgMS4gIGEgcmVndWxhciBkaWFsb2cgYm94IHRoYXQgaGFzIGhlYWRlciwgYm9keSBhbmQgZm9vdGVyLiBJdCdzIHRoZSBtb3N0IGN1c3RvbWl6YWJsZS5cbiAqICAgMi4gIGEgY29uZmlybWF0aW9uIGJveCBpcyBzaW1pbGFyIHRvIGEgZGlhbG9nIGJveCBidXQgaGFzIGFjY2VwdCBhbmQgcmVqZWN0IGFjdGlvbiBidXR0b25zLlxuICogICAzLiAgYSBvdmVybGF5LCB3aGljaCBpcyBhIHZlcnkgYmFzaWMgcG9wdXAgd2l0aCB3aGF0IHlvdSBwdXQgaW5zaWRlLlxuICogICAgICAgSXQgZG9lc24ndCBoYXZlIGhlYWRlciBhbmQgZm9vdGVyLlxuICpcbiAqIFRoZXJlIGFyZSB0d28gd2F5cyB0byB1c2UgYW55IHBvcHVwIGNvbXBvbmVudC5cbiAqICAgMS4gIEVpdGhlciBkaXJlY3RseSBieSB1c2luZyBjb21wb25lbnQsIGF3LWRpYWxvZywgYXctY29uZmlybWF0aW9uIG9yIGF3LW92ZXJsYXlcbiAqICAgMi4gIG9yIHRoZSBNb2RhbFNlcnZpY2UgIHNlcnZpY2Uub3Blbig8RGlhbG9nQ29tcG9uZW50PiksIHNlcnZpY2UuY2xvc2UoKVxuICpcbiAqIFVzYWdlOlxuICogICAgMS4gIFVzaW5nIERpYWxvZyBkaXJlY3RseSB0byBkaXNwbGF5IGEgbW9kYWwgcG9wdXAuIFRoaXMgdXNhZ2UgaXMgYSBxdWljayB3YXkgdG8gc2hvdyBhXG4gKiBtZXNzYWdlIHRvIHRoZSB1c2VyLlxuICpcbiAqICAgICAgICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlLm9wZW48RGlhbG9nQ29tcG9uZW50PiggRGlhbG9nQ29tcG9uZW50LCB7XG4gKiAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTXkgUG9wdXAgVGl0bGUnLFxuICogICAgICAgICAgICAgICAgICAgICBib2R5OiAnTXkgUG9wdXAgQm9keSdcbiAqICAgICAgICAgICAgICB9KTtcbiAqXG4gKlxuICogICAyLiAgIFVzZSB0aGUgY29tcG9uZW50IGluc2lkZSB5b3VyIHRlbXBsYXRlLlxuICpcbiAqICAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhdy1wYWdlJyAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1kaWFsb2cgWyh2aXNpYmxlKV09XCJkaXNwbGF5XCIgW21vZGFsXT1cInRydWVcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uT3Blbik9XCJvcGVuQWN0aW9uKClcIiAob25DbG9zZSk9XCJjbG9zZUFjdGlvbigpXCI+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctZGlhbG9nLWhlYWRlcj5EaWFsb2cgSGVhZGVyPC9hdy1kaWFsb2ctaGVhZGVyPlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZyBCb2R5OiBDcmVhdGluZyBhIGRpYWxvZyB1c2luZyB0aGUgZGlhbG9nIGNvbXBvbmVudFxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWRpYWxvZy1mb290ZXI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiBbc2l6ZV09XCInc21hbGwnXCIgW3N0eWxlXT1cIidwcmltYXJ5J1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xvc2UoKVwiPk9LPC9hdy1idXR0b24+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctZGlhbG9nLWZvb3Rlcj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1kaWFsb2c+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24gW3NpemVdPVwiJ3NtYWxsJ1wiIChjbGljayk9XCJvcGVuKClcIj5PcGVuIERpYWxvZzwvYXctYnV0dG9uPlxuICogICAgICAgICAgICAgICAgICBgXG4gKiAgICAgICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYm9vbGVhbiA9IGZhbHNlO1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgZGlhbG9nQWN0aW9uOiBzdHJpbmc7XG4gKlxuICogICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAqICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiAgICAgICAgICAgICAgICAgICAgIG5nT25Jbml0KCkgeyB9XG4gKlxuICogICAgICAgICAgICAgICAgICAgICBvcGVuKCkge1xuICogICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlO1xuICogICAgICAgICAgICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgICAgICAgICAgICBvcGVuQWN0aW9uKCkgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dBY3Rpb24gPSBcIm9wZW5cIjtcbiAqICAgICAgICAgICAgICAgICAgICAgIH1cbiAqICAgICAgIH1cbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWRpYWxvZycsXG4gICAgdGVtcGxhdGU6IGA8cC1kaWFsb2cgW2hlYWRlcl09XCJ0aXRsZVwiIFsodmlzaWJsZSldPVwidmlzaWJsZVwiXG4gICAgICAgICAgW21vZGFsXT1cIm1vZGFsXCIgW2Nsb3NhYmxlXT1cImNsb3NhYmxlXCIgW3dpZHRoXT1cIndpZHRoXCIgW2hlaWdodF09XCJoZWlnaHRcIlxuICAgICAgICAgIFtzdHlsZUNsYXNzXT1cInN0eWxlQ2xhc3NcIiBbYXBwZW5kVG9dPVwiYXBwZW5kVG9cIiAob25TaG93KT1cIm9wZW4oKVwiIChvbkhpZGUpPVwiY2xvc2UoKVwiPlxuXG4gICAgPHAtaGVhZGVyICpuZ0lmPVwiaGFzSGVhZGVyKClcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYXctZGlhbG9nLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICA8L3AtaGVhZGVyPlxuXG4gICAge3tib2R5fX1cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbiAgICA8cC1mb290ZXIgKm5nSWY9XCJoYXNGb290ZXIoKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWZvb3Rlci1zZXBhcmF0b3JcIj48L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYXctZGlhbG9nLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICA8L3AtZm9vdGVyPlxuPC9wLWRpYWxvZz5cbmAsXG4gICAgc3R5bGVzOiBbYDo6bmctZGVlcCAudWktZGlhbG9nIC51aS1kaWFsb2ctdGl0bGViYXJ7YmFja2dyb3VuZC1jb2xvcjojZjJmMmYyO3BhZGRpbmc6MTVweCAyMHB4fTo6bmctZGVlcCAudWktZGlhbG9nIC51aS1kaWFsb2ctdGl0bGViYXIgLnVpLWRpYWxvZy10aXRsZWJhci1pY29uOmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudH06Om5nLWRlZXAgLnVpLXdpZGdldC1oZWFkZXJ7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNnB4fTo6bmctZGVlcCAudWktZGlhbG9nIC51aS1kaWFsb2ctY29udGVudHtwYWRkaW5nOjE1cHggMjBweDtsaW5lLWhlaWdodDoxLjNlbX06Om5nLWRlZXAgLnVpLWRpYWxvZyAudWktd2lkZ2V0LWNvbnRlbnR7Ym9yZGVyOm5vbmV9OjpuZy1kZWVwIC51aS1kaWFsb2cudWktd2lkZ2V0LWNvbnRlbnR7Ym9yZGVyOm5vbmU7Ym94LXNoYWRvdzowIDJweCAxMHB4IDAgcmdiYSgwLDAsMCwuMyl9OjpuZy1kZWVwIC51aS1kaWFsb2cgLmRpYWxvZy1mb290ZXItc2VwYXJhdG9ye2JvcmRlci10b3A6MXB4IHNvbGlkICNkN2Q3ZDc7aGVpZ2h0OjE0cHh9OjpuZy1kZWVwIC51aS1kaWFsb2cgLnVpLWRpYWxvZy1mb290ZXJ7cGFkZGluZzowIDIwcHggMTVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb21wb25lbnQgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclxue1xuICAgIC8qKlxuICAgICAqIFRpdGxlIGZvciB0aGUgRGlhbG9nLiAgaWYgdGl0bGUgYW5kICdUaXRsZVRlbXBsYXRlJyBhcmUgYm90aCBzZXQsIHRpdGxlVGVtcGxhdGUgdGFrZXNcbiAgICAgKiBwcmVjZWRlbmNlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEJvZHkgc2VjdGlvbiBmb3IgRGlhbG9nLiBDYWxsZXIgc2hvdWxkIHVzZSBlaXRoZXIgdGhlIGJvZHkgc3RyaW5nLCBvciBjb250ZW50IHByb2plY3Rpb25cbiAgICAgKiB0byBhZGQgdmFsdWVzIHRvIHRoZSBkaWFsb2cuIElmIGJvdGggYXJlIHVzZWQsIHRoZXkgd2lsbCBib3RoIHNob3cgdXAuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib2R5OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogc3VwcG9ydCB0d28gd2F5IGRhdGEgYmluZGluZyBvbiB2aXNpYmxlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogd2hldGhlciB0aGlzIGRpYWxvZyBibG9ja3MgdGhlIHJlc3Qgb2YgdGhlIHBhZ2Ugb3Igbm90IHdoZW4gZGlzcGxheWVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbW9kYWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGVyZSdzIGFuIHggYXQgdGhlIHRvcCByaWdodCB0aGF0IG1ha2VzIHRoZSBkaWFsb2cgY2xvc2FibGUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIGRpYWxvZy4gXCJib2R5XCIgb3IgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgYXJlIHZhbGlkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXBwZW5kVG86IGFueTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gZGlhbG9nIGlzIGNsb3NlZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIGRpYWxvZyBpcyBvcGVuZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25PcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEhlYWRlciBjb21wb25lbnQuIFVzdWFsbHkgY29udGFpbnMgdGhlIHRpdGxlLlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoRGlhbG9nSGVhZGVyQ29tcG9uZW50KSBoZWFkZXI6IERpYWxvZ0hlYWRlckNvbXBvbmVudDtcblxuICAgIC8qKlxuICAgICAqIERpYWxvZyBmb290ZXIuIFVzdWFsbHkgY29udGFpbnMgYnV0dG9uc1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoRGlhbG9nRm9vdGVyQ29tcG9uZW50KSBmb290ZXI6IERpYWxvZ0Zvb3RlckNvbXBvbmVudDtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSAzMDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gdGhpcyBkaWFsb2cuXG4gICAgICovXG4gICAgb3BlbigpXG4gICAge1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KCk7XG5cbiAgICAgICAgLy8gdmlzaWJsZSBpcyBhIDItd2F5IGJpbmRpbmcgdmFyaWFibGUuXG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgKi9cbiAgICBjbG9zZSgpXG4gICAge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcblxuICAgICAgICAvLyBJbXBvcnRhbnQgdG8gbWFrZSBzdXJlIGNoYW5nZSBpcyBzZXQgb24gcGFyZW50IGJpbmRpbmcuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgdGhlIHZhcmlhYmxlIGFuZCBkaWFsb2cgb3Blbi9jbG9zZSBzdGF0ZSBjYW4gYmUgb3V0XG4gICAgICAgIC8vIG9mIHN5bmMgYW5kIHdlIHdvdWxkbid0IHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvZXMgdGhpcyBkaWFsb2cgaGF2ZSBoZWFkZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNIZWFkZXIoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmhlYWRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9lcyB0aGlzIGRpYWxvZyBoYXZlIGZvb3Rlci5cbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0Zvb3RlcigpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZm9vdGVyKTtcbiAgICB9XG59XG4iXX0=