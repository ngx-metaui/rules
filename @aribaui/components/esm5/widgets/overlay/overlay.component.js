/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalContainer } from '../../core/modal-service/modal-container';
import { OverlayPanel } from 'primeng/primeng';
import { Environment } from '@aribaui/core';
/**
 * Overlay Component is a simple version of the dialog where there's only content.
 * Overlay will appear at the position where the action performed trigger an overlay.
 *
 * There are three types of popup.
 *   1.  a regular dialog box that has header, body and footer. It's the most customizable.
 *   2.  a confirmation box is similar to a dialog box but has accept and reject action buttons.
 *   3.  a overlay, which is a very basic popup with what you put inside.
 *       It doesn't have header and footer.
 *
 * There are two ways to use any popup component.
 *   1.  Either directly by using component, aw-dialog, aw-confirmation or aw-overlay
 *   2.  or the ModalService  service.open(<OverlayComponent>), service.close()
 *
 * Usage:
 *    1.  Using ModalService directly to display a modal popup. The usage is a little tricky
 *        because angular currently doesn't support dynamic content projection.
 *
 *          let overlay = this.modalService.open<OverlayComponent>(OverlayComponent, {});
 *
 *            // Add content. There's not support for dynamic content projection yet.
 *            // So have add content directly.
 *            // This is probably not the best way.
 *          overlay.instance.overlay.el.nativeElement.querySelector(".ui-overlaypanel-content")
 *               .innerHTML = `<img style='width:300px;' src="sales.png" alt="Sales Chart" />`;
 *
 *          // delay the opening after ng lifecycle has been initialized.
 *          setTimeout(() => { overlay.instance.open(event); }, 1);
 *
 *
 *   2.   Use the component inside your template.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                                <aw-overlay #overlay (onOpen)="overlayAction='open'"
 *                                                     (onClose)="overlayAction='close'">
 *                                      <img src="sales.png" alt="Chart"/>
 *                                </aw-overlay>
 *
 *                                <aw-button [size]="'small'" (click)="overlay.open($event)">
 *                                    Open Overlay
 *                                </aw-button>
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     overlayAction: string;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *       }
 *
 *
 */
var OverlayComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OverlayComponent, _super);
    function OverlayComponent(env) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        /**
         * Enables hide overlay when outside is clicked.
         */
        _this.dismissable = true;
        /**
         * displays the close icon 'x' at top of right corner.
         */
        _this.showCloseIcon = false;
        /**
         * Event fired when overlay is closed.
         */
        _this.onClose = new EventEmitter();
        /**
         * Event fired when the overlay is opened.
         */
        _this.onOpen = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    OverlayComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * Open Overlay
     * @param event
     */
    /**
     * Open Overlay
     * @param {?} event
     * @return {?}
     */
    OverlayComponent.prototype.open = /**
     * Open Overlay
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.overlay.show(event);
        this.onOpened(null);
    };
    /**
     * Close Overlay
     */
    /**
     * Close Overlay
     * @return {?}
     */
    OverlayComponent.prototype.close = /**
     * Close Overlay
     * @return {?}
     */
    function () {
        this.overlay.hide();
    };
    /**
     * toggle open and close.
     * @param event
     */
    /**
     * toggle open and close.
     * @param {?} event
     * @return {?}
     */
    OverlayComponent.prototype.toggle = /**
     * toggle open and close.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.overlay.toggle(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OverlayComponent.prototype.onOpened = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onOpen.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OverlayComponent.prototype.onClosed = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onClose.emit(event);
    };
    OverlayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-overlay',
                    template: "<p-overlayPanel [dismissable]=\"dismissable\" [showCloseIcon]=\"showCloseIcon\"\n                [styleClass]=\"styleClass\" [appendTo]=\"appendTo\"\n                (onAfterHide)=\"onClosed($event)\">\n    <ng-content></ng-content>\n</p-overlayPanel>\n",
                    styles: ["::ng-deep .ui-overlaypanel{border:1px solid #d7d7d7;box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .ui-overlaypanel-content{padding:2em 3.4em .6em 1.43em}::ng-deep .ui-overlaypanel-close{border-radius:0;top:.5em;right:.5em}::ng-deep .ui-overlaypanel-close.ui-state-default{border:none}"]
                },] },
    ];
    /** @nocollapse */
    OverlayComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    OverlayComponent.propDecorators = {
        dismissable: [{ type: Input }],
        showCloseIcon: [{ type: Input }],
        appendTo: [{ type: Input }],
        onClose: [{ type: Output }],
        onOpen: [{ type: Output }],
        overlay: [{ type: ViewChild, args: [OverlayPanel,] }]
    };
    return OverlayComponent;
}(ModalContainer));
export { OverlayComponent };
function OverlayComponent_tsickle_Closure_declarations() {
    /**
     * Enables hide overlay when outside is clicked.
     * @type {?}
     */
    OverlayComponent.prototype.dismissable;
    /**
     * displays the close icon 'x' at top of right corner.
     * @type {?}
     */
    OverlayComponent.prototype.showCloseIcon;
    /**
     * Target element to attach the overlay. "body" or local ng-template variable are valid.
     * @type {?}
     */
    OverlayComponent.prototype.appendTo;
    /**
     * Event fired when overlay is closed.
     * @type {?}
     */
    OverlayComponent.prototype.onClose;
    /**
     * Event fired when the overlay is opened.
     * @type {?}
     */
    OverlayComponent.prototype.onOpen;
    /**
     * The internal overlay panel.
     * @type {?}
     */
    OverlayComponent.prototype.overlay;
    /** @type {?} */
    OverlayComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9vdmVybGF5L292ZXJsYXkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9FSiw0Q0FBYztJQXFDaEQsMEJBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFIa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7Ozs0QkEvQlosSUFBSTs7Ozs4QkFNRixLQUFLOzs7O3dCQVdELElBQUksWUFBWSxFQUFFOzs7O3VCQU1uQixJQUFJLFlBQVksRUFBRTs7S0FXN0M7Ozs7SUFFRCxtQ0FBUTs7O0lBQVI7S0FFQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsK0JBQUk7Ozs7O0lBQUosVUFBSyxLQUFVO1FBRVgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QjtJQUVEOztPQUVHOzs7OztJQUNILGdDQUFLOzs7O0lBQUw7UUFFSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3ZCO0lBR0Q7OztPQUdHOzs7Ozs7SUFDSCxpQ0FBTTs7Ozs7SUFBTixVQUFPLEtBQVU7UUFFYixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5Qjs7Ozs7SUFHRCxtQ0FBUTs7OztJQUFSLFVBQVMsS0FBVTtRQUVmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUVELG1DQUFROzs7O0lBQVIsVUFBUyxLQUFVO1FBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7O2dCQTdGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSwrUEFLYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxnU0FBZ1MsQ0FBQztpQkFDN1M7Ozs7Z0JBbkVPLFdBQVc7Ozs4QkF5RWQsS0FBSztnQ0FNTCxLQUFLOzJCQUtMLEtBQUs7MEJBTUwsTUFBTTt5QkFNTixNQUFNOzBCQU1OLFNBQVMsU0FBQyxZQUFZOzsyQkE3SDNCO0VBMkZzQyxjQUFjO1NBQXZDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNb2RhbENvbnRhaW5lcn0gZnJvbSAnLi4vLi4vY29yZS9tb2RhbC1zZXJ2aWNlL21vZGFsLWNvbnRhaW5lcic7XG5pbXBvcnQge092ZXJsYXlQYW5lbH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG4vKipcbiAqIE92ZXJsYXkgQ29tcG9uZW50IGlzIGEgc2ltcGxlIHZlcnNpb24gb2YgdGhlIGRpYWxvZyB3aGVyZSB0aGVyZSdzIG9ubHkgY29udGVudC5cbiAqIE92ZXJsYXkgd2lsbCBhcHBlYXIgYXQgdGhlIHBvc2l0aW9uIHdoZXJlIHRoZSBhY3Rpb24gcGVyZm9ybWVkIHRyaWdnZXIgYW4gb3ZlcmxheS5cbiAqXG4gKiBUaGVyZSBhcmUgdGhyZWUgdHlwZXMgb2YgcG9wdXAuXG4gKiAgIDEuICBhIHJlZ3VsYXIgZGlhbG9nIGJveCB0aGF0IGhhcyBoZWFkZXIsIGJvZHkgYW5kIGZvb3Rlci4gSXQncyB0aGUgbW9zdCBjdXN0b21pemFibGUuXG4gKiAgIDIuICBhIGNvbmZpcm1hdGlvbiBib3ggaXMgc2ltaWxhciB0byBhIGRpYWxvZyBib3ggYnV0IGhhcyBhY2NlcHQgYW5kIHJlamVjdCBhY3Rpb24gYnV0dG9ucy5cbiAqICAgMy4gIGEgb3ZlcmxheSwgd2hpY2ggaXMgYSB2ZXJ5IGJhc2ljIHBvcHVwIHdpdGggd2hhdCB5b3UgcHV0IGluc2lkZS5cbiAqICAgICAgIEl0IGRvZXNuJ3QgaGF2ZSBoZWFkZXIgYW5kIGZvb3Rlci5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHdheXMgdG8gdXNlIGFueSBwb3B1cCBjb21wb25lbnQuXG4gKiAgIDEuICBFaXRoZXIgZGlyZWN0bHkgYnkgdXNpbmcgY29tcG9uZW50LCBhdy1kaWFsb2csIGF3LWNvbmZpcm1hdGlvbiBvciBhdy1vdmVybGF5XG4gKiAgIDIuICBvciB0aGUgTW9kYWxTZXJ2aWNlICBzZXJ2aWNlLm9wZW4oPE92ZXJsYXlDb21wb25lbnQ+KSwgc2VydmljZS5jbG9zZSgpXG4gKlxuICogVXNhZ2U6XG4gKiAgICAxLiAgVXNpbmcgTW9kYWxTZXJ2aWNlIGRpcmVjdGx5IHRvIGRpc3BsYXkgYSBtb2RhbCBwb3B1cC4gVGhlIHVzYWdlIGlzIGEgbGl0dGxlIHRyaWNreVxuICogICAgICAgIGJlY2F1c2UgYW5ndWxhciBjdXJyZW50bHkgZG9lc24ndCBzdXBwb3J0IGR5bmFtaWMgY29udGVudCBwcm9qZWN0aW9uLlxuICpcbiAqICAgICAgICAgIGxldCBvdmVybGF5ID0gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbjxPdmVybGF5Q29tcG9uZW50PihPdmVybGF5Q29tcG9uZW50LCB7fSk7XG4gKlxuICogICAgICAgICAgICAvLyBBZGQgY29udGVudC4gVGhlcmUncyBub3Qgc3VwcG9ydCBmb3IgZHluYW1pYyBjb250ZW50IHByb2plY3Rpb24geWV0LlxuICogICAgICAgICAgICAvLyBTbyBoYXZlIGFkZCBjb250ZW50IGRpcmVjdGx5LlxuICogICAgICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IG5vdCB0aGUgYmVzdCB3YXkuXG4gKiAgICAgICAgICBvdmVybGF5Lmluc3RhbmNlLm92ZXJsYXkuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnVpLW92ZXJsYXlwYW5lbC1jb250ZW50XCIpXG4gKiAgICAgICAgICAgICAgIC5pbm5lckhUTUwgPSBgPGltZyBzdHlsZT0nd2lkdGg6MzAwcHg7JyBzcmM9XCJzYWxlcy5wbmdcIiBhbHQ9XCJTYWxlcyBDaGFydFwiIC8+YDtcbiAqXG4gKiAgICAgICAgICAvLyBkZWxheSB0aGUgb3BlbmluZyBhZnRlciBuZyBsaWZlY3ljbGUgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuXG4gKiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgb3ZlcmxheS5pbnN0YW5jZS5vcGVuKGV2ZW50KTsgfSwgMSk7XG4gKlxuICpcbiAqICAgMi4gICBVc2UgdGhlIGNvbXBvbmVudCBpbnNpZGUgeW91ciB0ZW1wbGF0ZS5cbiAqXG4gKiAgICAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYXctcGFnZScgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1vdmVybGF5ICNvdmVybGF5IChvbk9wZW4pPVwib3ZlcmxheUFjdGlvbj0nb3BlbidcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbkNsb3NlKT1cIm92ZXJsYXlBY3Rpb249J2Nsb3NlJ1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwic2FsZXMucG5nXCIgYWx0PVwiQ2hhcnRcIi8+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1vdmVybGF5PlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctYnV0dG9uIFtzaXplXT1cIidzbWFsbCdcIiAoY2xpY2spPVwib3ZlcmxheS5vcGVuKCRldmVudClcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3BlbiBPdmVybGF5XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1idXR0b24+XG4gKiAgICAgICAgICAgICAgICAgIGBcbiAqICAgICAgICAgZXhwb3J0IGNsYXNzIE15UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gKlxuICogICAgICAgICAgICAgICAgICAgICBvdmVybGF5QWN0aW9uOiBzdHJpbmc7XG4gKlxuICogICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAqICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiAgICAgICAgICAgICAgICAgICAgIG5nT25Jbml0KCkgeyB9XG4gKiAgICAgICB9XG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1vdmVybGF5JyxcbiAgICB0ZW1wbGF0ZTogYDxwLW92ZXJsYXlQYW5lbCBbZGlzbWlzc2FibGVdPVwiZGlzbWlzc2FibGVcIiBbc2hvd0Nsb3NlSWNvbl09XCJzaG93Q2xvc2VJY29uXCJcbiAgICAgICAgICAgICAgICBbc3R5bGVDbGFzc109XCJzdHlsZUNsYXNzXCIgW2FwcGVuZFRvXT1cImFwcGVuZFRvXCJcbiAgICAgICAgICAgICAgICAob25BZnRlckhpZGUpPVwib25DbG9zZWQoJGV2ZW50KVwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvcC1vdmVybGF5UGFuZWw+XG5gLFxuICAgIHN0eWxlczogW2A6Om5nLWRlZXAgLnVpLW92ZXJsYXlwYW5lbHtib3JkZXI6MXB4IHNvbGlkICNkN2Q3ZDc7Ym94LXNoYWRvdzowIDJweCA0cHggMCByZ2JhKDAsMCwwLC4yKX06Om5nLWRlZXAgLnVpLW92ZXJsYXlwYW5lbC1jb250ZW50e3BhZGRpbmc6MmVtIDMuNGVtIC42ZW0gMS40M2VtfTo6bmctZGVlcCAudWktb3ZlcmxheXBhbmVsLWNsb3Nle2JvcmRlci1yYWRpdXM6MDt0b3A6LjVlbTtyaWdodDouNWVtfTo6bmctZGVlcCAudWktb3ZlcmxheXBhbmVsLWNsb3NlLnVpLXN0YXRlLWRlZmF1bHR7Ym9yZGVyOm5vbmV9YF1cbn0pXG5leHBvcnQgY2xhc3MgT3ZlcmxheUNvbXBvbmVudCBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgT25Jbml0XG57XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBoaWRlIG92ZXJsYXkgd2hlbiBvdXRzaWRlIGlzIGNsaWNrZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNtaXNzYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBkaXNwbGF5cyB0aGUgY2xvc2UgaWNvbiAneCcgYXQgdG9wIG9mIHJpZ2h0IGNvcm5lci5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dDbG9zZUljb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIG92ZXJsYXkuIFwiYm9keVwiIG9yIGxvY2FsIG5nLXRlbXBsYXRlIHZhcmlhYmxlIGFyZSB2YWxpZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZFRvOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIG92ZXJsYXkgaXMgY2xvc2VkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiB0aGUgb3ZlcmxheSBpcyBvcGVuZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25PcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlcm5hbCBvdmVybGF5IHBhbmVsLlxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoT3ZlcmxheVBhbmVsKVxuICAgIG92ZXJsYXk6IE92ZXJsYXlQYW5lbDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gT3ZlcmxheVxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIG9wZW4oZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMub3ZlcmxheS5zaG93KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbk9wZW5lZChudWxsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9zZSBPdmVybGF5XG4gICAgICovXG4gICAgY2xvc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LmhpZGUoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIHRvZ2dsZSBvcGVuIGFuZCBjbG9zZS5cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICB0b2dnbGUoZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMub3ZlcmxheS50b2dnbGUoZXZlbnQpO1xuICAgIH1cblxuXG4gICAgb25PcGVuZWQoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMub25PcGVuLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uQ2xvc2VkKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdChldmVudCk7XG4gICAgfVxufVxuIl19