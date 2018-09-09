/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
         * Event fired just before overlay is closed
         */
        _this.beforeClose = new EventEmitter();
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
     * @return {?}
     */
    OverlayComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // place holder to be overridden by Modal Service
    };
    /**
     * @return {?}
     */
    OverlayComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // place holder to be overridden by Modal Service
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
        var _this = this;
        setTimeout(function () {
            _this.overlay.show(event);
            _this.onOpened(null);
        }, 1);
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
        this.beforeClose.emit(null);
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
        var _this = this;
        setTimeout(function () {
            _this.overlay.toggle(event);
        }, 0);
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
                    template: "<p-overlayPanel [dismissable]=\"dismissable\" [showCloseIcon]=\"showCloseIcon\"\n                [styleClass]=\"styleClass\" [appendTo]=\"appendTo\"\n                (onHide)=\"onClosed($event)\">\n    <ng-content></ng-content>\n</p-overlayPanel>\n",
                    styles: ["::ng-deep .ui-overlaypanel{border:1px solid #d7d7d7;box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .ui-overlaypanel-content{padding:2em 3.4em .6em 1.43em}::ng-deep .ui-overlaypanel-close{border-radius:0;top:.5em;right:.5em}::ng-deep .ui-overlaypanel-close.ui-state-default{border:none}"]
                }] }
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
        beforeClose: [{ type: Output }],
        onOpen: [{ type: Output }],
        overlay: [{ type: ViewChild, args: [OverlayPanel,] }]
    };
    return OverlayComponent;
}(ModalContainer));
export { OverlayComponent };
if (false) {
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
     * Event fired just before overlay is closed
     * @type {?}
     */
    OverlayComponent.prototype.beforeClose;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9vdmVybGF5L292ZXJsYXkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQStESiw0Q0FBYztJQTZDaEQsMEJBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFIa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7Ozs0QkF0Q1osSUFBSTs7Ozs4QkFNRixLQUFLOzs7O3dCQVdELElBQUksWUFBWSxFQUFFOzs7OzRCQU9kLElBQUksWUFBWSxFQUFFOzs7O3VCQU12QixJQUFJLFlBQVksRUFBRTs7S0FXN0M7Ozs7SUFFRCxtQ0FBUTs7O0lBQVI7S0FFQzs7OztJQUVELDZDQUFrQjs7O0lBQWxCOztLQUdDOzs7O0lBRUQsMENBQWU7OztJQUFmOztLQUdDO0lBR0Q7OztPQUdHOzs7Ozs7SUFDSCwrQkFBSTs7Ozs7SUFBSixVQUFLLEtBQVU7UUFBZixpQkFPQztRQUxHLFVBQVUsQ0FBQztZQUVQLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNUO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsZ0NBQUs7Ozs7SUFBTDtRQUVJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdkI7SUFHRDs7O09BR0c7Ozs7OztJQUNILGlDQUFNOzs7OztJQUFOLFVBQU8sS0FBVTtRQUFqQixpQkFNQztRQUpHLFVBQVUsQ0FBQztZQUVQLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDVDs7Ozs7SUFHRCxtQ0FBUTs7OztJQUFSLFVBQVMsS0FBVTtRQUVmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUVELG1DQUFROzs7O0lBQVIsVUFBUyxLQUFVO1FBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7O2dCQWxISixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLG9RQUFxQzs7aUJBRXhDOzs7O2dCQTlETyxXQUFXOzs7OEJBcUVkLEtBQUs7Z0NBTUwsS0FBSzsyQkFLTCxLQUFLOzBCQU1MLE1BQU07OEJBT04sTUFBTTt5QkFNTixNQUFNOzBCQU1OLFNBQVMsU0FBQyxZQUFZOzsyQkF4STNCO0VBOEZzQyxjQUFjO1NBQXZDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01vZGFsQ29udGFpbmVyfSBmcm9tICcuLi8uLi9jb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCB7T3ZlcmxheVBhbmVsfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cbi8qKlxuICogT3ZlcmxheSBDb21wb25lbnQgaXMgYSBzaW1wbGUgdmVyc2lvbiBvZiB0aGUgZGlhbG9nIHdoZXJlIHRoZXJlJ3Mgb25seSBjb250ZW50LlxuICogT3ZlcmxheSB3aWxsIGFwcGVhciBhdCB0aGUgcG9zaXRpb24gd2hlcmUgdGhlIGFjdGlvbiBwZXJmb3JtZWQgdHJpZ2dlciBhbiBvdmVybGF5LlxuICpcbiAqIFRoZXJlIGFyZSB0aHJlZSB0eXBlcyBvZiBwb3B1cC5cbiAqICAgMS4gIGEgcmVndWxhciBkaWFsb2cgYm94IHRoYXQgaGFzIGhlYWRlciwgYm9keSBhbmQgZm9vdGVyLiBJdCdzIHRoZSBtb3N0IGN1c3RvbWl6YWJsZS5cbiAqICAgMi4gIGEgY29uZmlybWF0aW9uIGJveCBpcyBzaW1pbGFyIHRvIGEgZGlhbG9nIGJveCBidXQgaGFzIGFjY2VwdCBhbmQgcmVqZWN0IGFjdGlvbiBidXR0b25zLlxuICogICAzLiAgYSBvdmVybGF5LCB3aGljaCBpcyBhIHZlcnkgYmFzaWMgcG9wdXAgd2l0aCB3aGF0IHlvdSBwdXQgaW5zaWRlLlxuICogICAgICAgSXQgZG9lc24ndCBoYXZlIGhlYWRlciBhbmQgZm9vdGVyLlxuICpcbiAqIFRoZXJlIGFyZSB0d28gd2F5cyB0byB1c2UgYW55IHBvcHVwIGNvbXBvbmVudC5cbiAqICAgMS4gIEVpdGhlciBkaXJlY3RseSBieSB1c2luZyBjb21wb25lbnQsIGF3LWRpYWxvZywgYXctY29uZmlybWF0aW9uIG9yIGF3LW92ZXJsYXlcbiAqICAgMi4gIG9yIHRoZSBNb2RhbFNlcnZpY2UgIHNlcnZpY2Uub3Blbig8T3ZlcmxheUNvbXBvbmVudD4pLCBzZXJ2aWNlLmNsb3NlKClcbiAqXG4gKiBVc2FnZTpcbiAqICAgIDEuICBVc2luZyBNb2RhbFNlcnZpY2UgZGlyZWN0bHkgdG8gZGlzcGxheSBhIG1vZGFsIHBvcHVwLiBUaGUgdXNhZ2UgaXMgYSBsaXR0bGUgdHJpY2t5XG4gKiAgICAgICAgYmVjYXVzZSBhbmd1bGFyIGN1cnJlbnRseSBkb2Vzbid0IHN1cHBvcnQgZHluYW1pYyBjb250ZW50IHByb2plY3Rpb24uXG4gKlxuICogICAgICAgICAgbGV0IG92ZXJsYXkgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuPE92ZXJsYXlDb21wb25lbnQ+KE92ZXJsYXlDb21wb25lbnQsIHt9KTtcbiAqXG4gKiAgICAgICAgICAgIC8vIEFkZCBjb250ZW50LiBUaGVyZSdzIG5vdCBzdXBwb3J0IGZvciBkeW5hbWljIGNvbnRlbnQgcHJvamVjdGlvbiB5ZXQuXG4gKiAgICAgICAgICAgIC8vIFNvIGhhdmUgYWRkIGNvbnRlbnQgZGlyZWN0bHkuXG4gKiAgICAgICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgbm90IHRoZSBiZXN0IHdheS5cbiAqICAgICAgICAgIG92ZXJsYXkuaW5zdGFuY2Uub3ZlcmxheS5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudWktb3ZlcmxheXBhbmVsLWNvbnRlbnRcIilcbiAqICAgICAgICAgICAgICAgLmlubmVySFRNTCA9IGA8aW1nIHN0eWxlPSd3aWR0aDozMDBweDsnIHNyYz1cInNhbGVzLnBuZ1wiIGFsdD1cIlNhbGVzIENoYXJ0XCIgLz5gO1xuICpcbiAqICAgICAgICAgIC8vIGRlbGF5IHRoZSBvcGVuaW5nIGFmdGVyIG5nIGxpZmVjeWNsZSBoYXMgYmVlbiBpbml0aWFsaXplZC5cbiAqICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBvdmVybGF5Lmluc3RhbmNlLm9wZW4oZXZlbnQpOyB9LCAxKTtcbiAqXG4gKlxuICogICAyLiAgIFVzZSB0aGUgY29tcG9uZW50IGluc2lkZSB5b3VyIHRlbXBsYXRlLlxuICpcbiAqICAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhdy1wYWdlJyAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LW92ZXJsYXkgI292ZXJsYXkgKG9uT3Blbik9XCJvdmVybGF5QWN0aW9uPSdvcGVuJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2xvc2UpPVwib3ZlcmxheUFjdGlvbj0nY2xvc2UnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJzYWxlcy5wbmdcIiBhbHQ9XCJDaGFydFwiLz5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LW92ZXJsYXk+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24gW3NpemVdPVwiJ3NtYWxsJ1wiIChjbGljayk9XCJvdmVybGF5Lm9wZW4oJGV2ZW50KVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcGVuIE92ZXJsYXlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAqICAgICAgICAgICAgICAgICAgYFxuICogICAgICAgICBleHBvcnQgY2xhc3MgTXlQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXlBY3Rpb246IHN0cmluZztcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UpIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBlcigpO1xuICogICAgICAgICAgICAgICAgICAgICAgIH1cbiAqICAgICAgICAgICAgICAgICAgICAgbmdPbkluaXQoKSB7IH1cbiAqICAgICAgIH1cbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LW92ZXJsYXknLFxuICAgIHRlbXBsYXRlVXJsOiAnb3ZlcmxheS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ292ZXJsYXkuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5Q29tcG9uZW50IGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdFxue1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgaGlkZSBvdmVybGF5IHdoZW4gb3V0c2lkZSBpcyBjbGlja2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzbWlzc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogZGlzcGxheXMgdGhlIGNsb3NlIGljb24gJ3gnIGF0IHRvcCBvZiByaWdodCBjb3JuZXIuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93Q2xvc2VJY29uOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBvdmVybGF5LiBcImJvZHlcIiBvciBsb2NhbCBuZy10ZW1wbGF0ZSB2YXJpYWJsZSBhcmUgdmFsaWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhcHBlbmRUbzogYW55O1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiBvdmVybGF5IGlzIGNsb3NlZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQganVzdCBiZWZvcmUgb3ZlcmxheSBpcyBjbG9zZWRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBiZWZvcmVDbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBvdmVybGF5IGlzIG9wZW5lZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbk9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGludGVybmFsIG92ZXJsYXkgcGFuZWwuXG4gICAgICovXG4gICAgQFZpZXdDaGlsZChPdmVybGF5UGFuZWwpXG4gICAgb3ZlcmxheTogT3ZlcmxheVBhbmVsO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIHBsYWNlIGhvbGRlciB0byBiZSBvdmVycmlkZGVuIGJ5IE1vZGFsIFNlcnZpY2VcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gcGxhY2UgaG9sZGVyIHRvIGJlIG92ZXJyaWRkZW4gYnkgTW9kYWwgU2VydmljZVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogT3BlbiBPdmVybGF5XG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgb3BlbihldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc2hvdyhldmVudCk7XG4gICAgICAgICAgICB0aGlzLm9uT3BlbmVkKG51bGwpO1xuICAgICAgICB9LCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9zZSBPdmVybGF5XG4gICAgICovXG4gICAgY2xvc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy5iZWZvcmVDbG9zZS5lbWl0KG51bGwpO1xuICAgICAgICB0aGlzLm92ZXJsYXkuaGlkZSgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogdG9nZ2xlIG9wZW4gYW5kIGNsb3NlLlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIHRvZ2dsZShldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG5cbiAgICBvbk9wZW5lZChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5vbk9wZW4uZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25DbG9zZWQoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG4iXX0=