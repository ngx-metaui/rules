/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class DialogComponent extends ModalContainer {
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
         * whether this dialog blocks the rest of the page or not when displayed.
         */
        this.modal = true;
        /**
         * Whether there's an x at the top right that makes the dialog closable.
         */
        this.closable = true;
        /**
         * Event fired when dialog is closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Event fired when the dialog is opened.
         */
        this.onOpen = new EventEmitter();
        this.width = 300;
        this.height = 'auto';
    }
    /**
     * Open this dialog.
     * @return {?}
     */
    open() {
        this.visible = true;
        this.onOpen.emit();
        // visible is a 2-way binding variable.
        this.visibleChange.emit(true);
    }
    /**
     * close the dialog
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
     * Does this dialog have header.
     *
     * @return {?}
     */
    hasHeader() {
        return isPresent(this.header);
    }
    /**
     * Does this dialog have footer.
     *
     * @return {?}
     */
    hasFooter() {
        return isPresent(this.footer);
    }
}
DialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dialog',
                template: `<p-dialog [header]="title" [(visible)]="visible"
          [modal]="modal" [closable]="closable" [width]="width" [height]="height"
          [styleClass]="styleClass" [appendTo]="appendTo" (onShow)="open()" (onHide)="close()">

    <p-header *ngIf="hasHeader()">
        <ng-content select="aw-dialog-header"></ng-content>
    </p-header>

    {{body}}
    <ng-content></ng-content>

    <p-footer *ngIf="hasFooter()">
        <div class="dialog-footer-separator"></div>
        <ng-content select="aw-dialog-footer"></ng-content>
    </p-footer>
</p-dialog>
`,
                styles: [`::ng-deep .ui-dialog .ui-dialog-titlebar{background-color:#f2f2f2;padding:15px 20px}::ng-deep .ui-dialog .ui-dialog-titlebar .ui-dialog-titlebar-icon:hover{border-color:transparent}::ng-deep .ui-widget-header{font-weight:400;font-size:16px}::ng-deep .ui-dialog .ui-dialog-content{padding:15px 20px;line-height:1.3em}::ng-deep .ui-dialog .ui-widget-content{border:none}::ng-deep .ui-dialog.ui-widget-content{border:none;box-shadow:0 2px 10px 0 rgba(0,0,0,.3)}::ng-deep .ui-dialog .dialog-footer-separator{border-top:1px solid #d7d7d7;height:14px}::ng-deep .ui-dialog .ui-dialog-footer{padding:0 20px 15px}`]
            },] },
];
/** @nocollapse */
DialogComponent.ctorParameters = () => [
    { type: Environment }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2RpYWxvZy9kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUZoRSxNQUFNLHNCQUF1QixTQUFRLGNBQWM7Ozs7SUE4RC9DLFlBQW1CLEdBQWdCO1FBRS9CLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZJLFFBQUcsR0FBSCxHQUFHLENBQWE7Ozs7NkJBM0NBLElBQUksWUFBWSxFQUFFOzs7O3FCQU1wQyxJQUFJOzs7O3dCQU1ELElBQUk7Ozs7dUJBWUssSUFBSSxZQUFZLEVBQUU7Ozs7c0JBTW5CLElBQUksWUFBWSxFQUFFO1FBaUIxQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN4Qjs7Ozs7SUFLRCxJQUFJO1FBRUEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7UUFHbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakM7Ozs7O0lBS0QsS0FBSztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7UUFLcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7Ozs7OztJQU1ELFNBQVM7UUFFTCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqQzs7Ozs7O0lBTUQsU0FBUztRQUVMLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDOzs7WUFySUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQmI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsOGxCQUE4bEIsQ0FBQzthQUMzbUI7Ozs7WUEzRk8sV0FBVzs7O29CQWtHZCxLQUFLO21CQU9MLEtBQUs7NEJBS0wsTUFBTTtvQkFNTixLQUFLO3VCQU1MLEtBQUs7dUJBTUwsS0FBSztzQkFNTCxNQUFNO3FCQU1OLE1BQU07cUJBTU4sWUFBWSxTQUFDLHFCQUFxQjtxQkFLbEMsWUFBWSxTQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge01vZGFsQ29udGFpbmVyfSBmcm9tICcuLi8uLi9jb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCB7RGlhbG9nSGVhZGVyQ29tcG9uZW50fSBmcm9tICcuL2RpYWxvZy1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7RGlhbG9nRm9vdGVyQ29tcG9uZW50fSBmcm9tICcuL2RpYWxvZy1mb290ZXIuY29tcG9uZW50JztcblxuLyoqXG4gKiBEaWFsb2cgQ29tcG9uZW50IHRoYXQgcHJvdmlkZXMgdGhlIGxvb2sgYW5kIGZlZWwgZm9yIGEgbW9kYWwgZGlhbG9nLiBUaGlzIGNvbXBvbmVudCBoYXMgdGhyZWVcbiAqIHNlY3Rpb25zOiBoZWFkZXIsIGJvZHksIGFuZCBmb290ZXIuIEl0IGNhbiBiZSB1c2VkIGJ5IGl0c2VsZiBvciBleHRlbmRlZC5cbiAqXG4gKiBUaGVyZSBhcmUgdGhyZWUgdHlwZXMgb2YgcG9wdXAuXG4gKiAgIDEuICBhIHJlZ3VsYXIgZGlhbG9nIGJveCB0aGF0IGhhcyBoZWFkZXIsIGJvZHkgYW5kIGZvb3Rlci4gSXQncyB0aGUgbW9zdCBjdXN0b21pemFibGUuXG4gKiAgIDIuICBhIGNvbmZpcm1hdGlvbiBib3ggaXMgc2ltaWxhciB0byBhIGRpYWxvZyBib3ggYnV0IGhhcyBhY2NlcHQgYW5kIHJlamVjdCBhY3Rpb24gYnV0dG9ucy5cbiAqICAgMy4gIGEgb3ZlcmxheSwgd2hpY2ggaXMgYSB2ZXJ5IGJhc2ljIHBvcHVwIHdpdGggd2hhdCB5b3UgcHV0IGluc2lkZS5cbiAqICAgICAgIEl0IGRvZXNuJ3QgaGF2ZSBoZWFkZXIgYW5kIGZvb3Rlci5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHdheXMgdG8gdXNlIGFueSBwb3B1cCBjb21wb25lbnQuXG4gKiAgIDEuICBFaXRoZXIgZGlyZWN0bHkgYnkgdXNpbmcgY29tcG9uZW50LCBhdy1kaWFsb2csIGF3LWNvbmZpcm1hdGlvbiBvciBhdy1vdmVybGF5XG4gKiAgIDIuICBvciB0aGUgTW9kYWxTZXJ2aWNlICBzZXJ2aWNlLm9wZW4oPERpYWxvZ0NvbXBvbmVudD4pLCBzZXJ2aWNlLmNsb3NlKClcbiAqXG4gKiBVc2FnZTpcbiAqICAgIDEuICBVc2luZyBEaWFsb2cgZGlyZWN0bHkgdG8gZGlzcGxheSBhIG1vZGFsIHBvcHVwLiBUaGlzIHVzYWdlIGlzIGEgcXVpY2sgd2F5IHRvIHNob3cgYVxuICogbWVzc2FnZSB0byB0aGUgdXNlci5cbiAqXG4gKiAgICAgICAgICAgICB0aGlzLm1vZGFsU2VydmljZS5vcGVuPERpYWxvZ0NvbXBvbmVudD4oIERpYWxvZ0NvbXBvbmVudCwge1xuICogICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ015IFBvcHVwIFRpdGxlJyxcbiAqICAgICAgICAgICAgICAgICAgICAgYm9keTogJ015IFBvcHVwIEJvZHknXG4gKiAgICAgICAgICAgICAgfSk7XG4gKlxuICpcbiAqICAgMi4gICBVc2UgdGhlIGNvbXBvbmVudCBpbnNpZGUgeW91ciB0ZW1wbGF0ZS5cbiAqXG4gKiAgICAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYXctcGFnZScgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctZGlhbG9nIFsodmlzaWJsZSldPVwiZGlzcGxheVwiIFttb2RhbF09XCJ0cnVlXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbk9wZW4pPVwib3BlbkFjdGlvbigpXCIgKG9uQ2xvc2UpPVwiY2xvc2VBY3Rpb24oKVwiPlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWRpYWxvZy1oZWFkZXI+RGlhbG9nIEhlYWRlcjwvYXctZGlhbG9nLWhlYWRlcj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWFsb2cgQm9keTogQ3JlYXRpbmcgYSBkaWFsb2cgdXNpbmcgdGhlIGRpYWxvZyBjb21wb25lbnRcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1kaWFsb2ctZm9vdGVyPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24gW3NpemVdPVwiJ3NtYWxsJ1wiIFtzdHlsZV09XCIncHJpbWFyeSdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsb3NlKClcIj5PSzwvYXctYnV0dG9uPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWRpYWxvZy1mb290ZXI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctZGlhbG9nPlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctYnV0dG9uIFtzaXplXT1cIidzbWFsbCdcIiAoY2xpY2spPVwib3BlbigpXCI+T3BlbiBEaWFsb2c8L2F3LWJ1dHRvbj5cbiAqICAgICAgICAgICAgICAgICAgYFxuICogICAgICAgICBleHBvcnQgY2xhc3MgTXlQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ0FjdGlvbjogc3RyaW5nO1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgICAgICAgICBuZ09uSW5pdCgpIHsgfVxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgb3BlbigpIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAqICAgICAgICAgICAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgb3BlbkFjdGlvbigpICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nQWN0aW9uID0gXCJvcGVuXCI7XG4gKiAgICAgICAgICAgICAgICAgICAgICB9XG4gKiAgICAgICB9XG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1kaWFsb2cnLFxuICAgIHRlbXBsYXRlOiBgPHAtZGlhbG9nIFtoZWFkZXJdPVwidGl0bGVcIiBbKHZpc2libGUpXT1cInZpc2libGVcIlxuICAgICAgICAgIFttb2RhbF09XCJtb2RhbFwiIFtjbG9zYWJsZV09XCJjbG9zYWJsZVwiIFt3aWR0aF09XCJ3aWR0aFwiIFtoZWlnaHRdPVwiaGVpZ2h0XCJcbiAgICAgICAgICBbc3R5bGVDbGFzc109XCJzdHlsZUNsYXNzXCIgW2FwcGVuZFRvXT1cImFwcGVuZFRvXCIgKG9uU2hvdyk9XCJvcGVuKClcIiAob25IaWRlKT1cImNsb3NlKClcIj5cblxuICAgIDxwLWhlYWRlciAqbmdJZj1cImhhc0hlYWRlcigpXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImF3LWRpYWxvZy1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9wLWhlYWRlcj5cblxuICAgIHt7Ym9keX19XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG4gICAgPHAtZm9vdGVyICpuZ0lmPVwiaGFzRm9vdGVyKClcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1mb290ZXItc2VwYXJhdG9yXCI+PC9kaXY+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImF3LWRpYWxvZy1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9wLWZvb3Rlcj5cbjwvcC1kaWFsb2c+XG5gLFxuICAgIHN0eWxlczogW2A6Om5nLWRlZXAgLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFye2JhY2tncm91bmQtY29sb3I6I2YyZjJmMjtwYWRkaW5nOjE1cHggMjBweH06Om5nLWRlZXAgLnVpLWRpYWxvZyAudWktZGlhbG9nLXRpdGxlYmFyIC51aS1kaWFsb2ctdGl0bGViYXItaWNvbjpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnR9OjpuZy1kZWVwIC51aS13aWRnZXQtaGVhZGVye2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTZweH06Om5nLWRlZXAgLnVpLWRpYWxvZyAudWktZGlhbG9nLWNvbnRlbnR7cGFkZGluZzoxNXB4IDIwcHg7bGluZS1oZWlnaHQ6MS4zZW19OjpuZy1kZWVwIC51aS1kaWFsb2cgLnVpLXdpZGdldC1jb250ZW50e2JvcmRlcjpub25lfTo6bmctZGVlcCAudWktZGlhbG9nLnVpLXdpZGdldC1jb250ZW50e2JvcmRlcjpub25lO2JveC1zaGFkb3c6MCAycHggMTBweCAwIHJnYmEoMCwwLDAsLjMpfTo6bmctZGVlcCAudWktZGlhbG9nIC5kaWFsb2ctZm9vdGVyLXNlcGFyYXRvcntib3JkZXItdG9wOjFweCBzb2xpZCAjZDdkN2Q3O2hlaWdodDoxNHB4fTo6bmctZGVlcCAudWktZGlhbG9nIC51aS1kaWFsb2ctZm9vdGVye3BhZGRpbmc6MCAyMHB4IDE1cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29tcG9uZW50IGV4dGVuZHMgTW9kYWxDb250YWluZXJcbntcbiAgICAvKipcbiAgICAgKiBUaXRsZSBmb3IgdGhlIERpYWxvZy4gIGlmIHRpdGxlIGFuZCAnVGl0bGVUZW1wbGF0ZScgYXJlIGJvdGggc2V0LCB0aXRsZVRlbXBsYXRlIHRha2VzXG4gICAgICogcHJlY2VkZW5jZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBCb2R5IHNlY3Rpb24gZm9yIERpYWxvZy4gQ2FsbGVyIHNob3VsZCB1c2UgZWl0aGVyIHRoZSBib2R5IHN0cmluZywgb3IgY29udGVudCBwcm9qZWN0aW9uXG4gICAgICogdG8gYWRkIHZhbHVlcyB0byB0aGUgZGlhbG9nLiBJZiBib3RoIGFyZSB1c2VkLCB0aGV5IHdpbGwgYm90aCBzaG93IHVwLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYm9keTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIHN1cHBvcnQgdHdvIHdheSBkYXRhIGJpbmRpbmcgb24gdmlzaWJsZSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICB2aXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIHdoZXRoZXIgdGhpcyBkaWFsb2cgYmxvY2tzIHRoZSByZXN0IG9mIHRoZSBwYWdlIG9yIG5vdCB3aGVuIGRpc3BsYXllZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1vZGFsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlcmUncyBhbiB4IGF0IHRoZSB0b3AgcmlnaHQgdGhhdCBtYWtlcyB0aGUgZGlhbG9nIGNsb3NhYmxlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBkaWFsb2cuIFwiYm9keVwiIG9yIGxvY2FsIG5nLXRlbXBsYXRlIHZhcmlhYmxlIGFyZSB2YWxpZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZFRvOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIGRpYWxvZyBpcyBjbG9zZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBkaWFsb2cgaXMgb3BlbmVkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBIZWFkZXIgY29tcG9uZW50LiBVc3VhbGx5IGNvbnRhaW5zIHRoZSB0aXRsZS5cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKERpYWxvZ0hlYWRlckNvbXBvbmVudCkgaGVhZGVyOiBEaWFsb2dIZWFkZXJDb21wb25lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBEaWFsb2cgZm9vdGVyLiBVc3VhbGx5IGNvbnRhaW5zIGJ1dHRvbnNcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKERpYWxvZ0Zvb3RlckNvbXBvbmVudCkgZm9vdGVyOiBEaWFsb2dGb290ZXJDb21wb25lbnQ7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICB0aGlzLndpZHRoID0gMzAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9ICdhdXRvJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIHRoaXMgZGlhbG9nLlxuICAgICAqL1xuICAgIG9wZW4oKVxuICAgIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbk9wZW4uZW1pdCgpO1xuXG4gICAgICAgIC8vIHZpc2libGUgaXMgYSAyLXdheSBiaW5kaW5nIHZhcmlhYmxlLlxuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjbG9zZSB0aGUgZGlhbG9nXG4gICAgICovXG4gICAgY2xvc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG5cbiAgICAgICAgLy8gSW1wb3J0YW50IHRvIG1ha2Ugc3VyZSBjaGFuZ2UgaXMgc2V0IG9uIHBhcmVudCBiaW5kaW5nLlxuICAgICAgICAvLyBPdGhlcndpc2UsIHRoZSB2YXJpYWJsZSBhbmQgZGlhbG9nIG9wZW4vY2xvc2Ugc3RhdGUgY2FuIGJlIG91dFxuICAgICAgICAvLyBvZiBzeW5jIGFuZCB3ZSB3b3VsZG4ndCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb2VzIHRoaXMgZGlhbG9nIGhhdmUgaGVhZGVyLlxuICAgICAqXG4gICAgICovXG4gICAgaGFzSGVhZGVyKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvZXMgdGhpcyBkaWFsb2cgaGF2ZSBmb290ZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNGb290ZXIoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmZvb3Rlcik7XG4gICAgfVxufVxuIl19