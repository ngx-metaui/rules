/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class OverlayComponent extends ModalContainer {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * Enables hide overlay when outside is clicked.
         */
        this.dismissable = true;
        /**
         * displays the close icon 'x' at top of right corner.
         */
        this.showCloseIcon = false;
        /**
         * Event fired when overlay is closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Event fired just before overlay is closed
         */
        this.beforeClose = new EventEmitter();
        /**
         * Event fired when the overlay is opened.
         */
        this.onOpen = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // place holder to be overridden by Modal Service
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // place holder to be overridden by Modal Service
    }
    /**
     * Open Overlay
     * @param {?} event
     * @return {?}
     */
    open(event) {
        setTimeout(() => {
            this.overlay.show(event);
            this.onOpened(null);
        }, 1);
    }
    /**
     * Close Overlay
     * @return {?}
     */
    close() {
        this.beforeClose.emit(null);
        this.overlay.hide();
    }
    /**
     * toggle open and close.
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        setTimeout(() => {
            this.overlay.toggle(event);
        }, 0);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onOpened(event) {
        this.onOpen.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClosed(event) {
        this.onClose.emit(event);
    }
}
OverlayComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-overlay',
                template: "<p-overlayPanel [dismissable]=\"dismissable\" [showCloseIcon]=\"showCloseIcon\"\n                [styleClass]=\"styleClass\" [appendTo]=\"appendTo\"\n                (onHide)=\"onClosed($event)\">\n    <ng-content></ng-content>\n</p-overlayPanel>\n",
                styles: ["::ng-deep .ui-overlaypanel{border:1px solid #d7d7d7;box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .ui-overlaypanel-content{padding:2em 3.4em .6em 1.43em}::ng-deep .ui-overlaypanel-close{border-radius:0;top:.5em;right:.5em}::ng-deep .ui-overlaypanel-close.ui-state-default{border:none}"]
            }] }
];
/** @nocollapse */
OverlayComponent.ctorParameters = () => [
    { type: Environment }
];
OverlayComponent.propDecorators = {
    dismissable: [{ type: Input }],
    showCloseIcon: [{ type: Input }],
    appendTo: [{ type: Input }],
    onClose: [{ type: Output }],
    beforeClose: [{ type: Output }],
    onOpen: [{ type: Output }],
    overlay: [{ type: ViewChild, args: [OverlayPanel,] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9vdmVybGF5L292ZXJsYXkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUVILFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErRDFDLE1BQU0sdUJBQXdCLFNBQVEsY0FBYzs7OztJQTZDaEQsWUFBbUIsR0FBZ0I7UUFFL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkksUUFBRyxHQUFILEdBQUcsQ0FBYTs7OzsyQkF0Q1osSUFBSTs7Ozs2QkFNRixLQUFLOzs7O3VCQVdELElBQUksWUFBWSxFQUFFOzs7OzJCQU9kLElBQUksWUFBWSxFQUFFOzs7O3NCQU12QixJQUFJLFlBQVksRUFBRTtLQVc3Qzs7OztJQUVELFFBQVE7S0FFUDs7OztJQUVELGtCQUFrQjs7S0FHakI7Ozs7SUFFRCxlQUFlOztLQUdkOzs7Ozs7SUFPRCxJQUFJLENBQUMsS0FBVTtRQUVYLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFFWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDVDs7Ozs7SUFLRCxLQUFLO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7O0lBT0QsTUFBTSxDQUFDLEtBQVU7UUFFYixVQUFVLENBQUMsR0FBRyxFQUFFO1lBRVosSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNUOzs7OztJQUdELFFBQVEsQ0FBQyxLQUFVO1FBRWYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFFZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7O1lBbEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsb1FBQXFDOzthQUV4Qzs7OztZQTlETyxXQUFXOzs7MEJBcUVkLEtBQUs7NEJBTUwsS0FBSzt1QkFLTCxLQUFLO3NCQU1MLE1BQU07MEJBT04sTUFBTTtxQkFNTixNQUFNO3NCQU1OLFNBQVMsU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TW9kYWxDb250YWluZXJ9IGZyb20gJy4uLy4uL2NvcmUvbW9kYWwtc2VydmljZS9tb2RhbC1jb250YWluZXInO1xuaW1wb3J0IHtPdmVybGF5UGFuZWx9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuLyoqXG4gKiBPdmVybGF5IENvbXBvbmVudCBpcyBhIHNpbXBsZSB2ZXJzaW9uIG9mIHRoZSBkaWFsb2cgd2hlcmUgdGhlcmUncyBvbmx5IGNvbnRlbnQuXG4gKiBPdmVybGF5IHdpbGwgYXBwZWFyIGF0IHRoZSBwb3NpdGlvbiB3aGVyZSB0aGUgYWN0aW9uIHBlcmZvcm1lZCB0cmlnZ2VyIGFuIG92ZXJsYXkuXG4gKlxuICogVGhlcmUgYXJlIHRocmVlIHR5cGVzIG9mIHBvcHVwLlxuICogICAxLiAgYSByZWd1bGFyIGRpYWxvZyBib3ggdGhhdCBoYXMgaGVhZGVyLCBib2R5IGFuZCBmb290ZXIuIEl0J3MgdGhlIG1vc3QgY3VzdG9taXphYmxlLlxuICogICAyLiAgYSBjb25maXJtYXRpb24gYm94IGlzIHNpbWlsYXIgdG8gYSBkaWFsb2cgYm94IGJ1dCBoYXMgYWNjZXB0IGFuZCByZWplY3QgYWN0aW9uIGJ1dHRvbnMuXG4gKiAgIDMuICBhIG92ZXJsYXksIHdoaWNoIGlzIGEgdmVyeSBiYXNpYyBwb3B1cCB3aXRoIHdoYXQgeW91IHB1dCBpbnNpZGUuXG4gKiAgICAgICBJdCBkb2Vzbid0IGhhdmUgaGVhZGVyIGFuZCBmb290ZXIuXG4gKlxuICogVGhlcmUgYXJlIHR3byB3YXlzIHRvIHVzZSBhbnkgcG9wdXAgY29tcG9uZW50LlxuICogICAxLiAgRWl0aGVyIGRpcmVjdGx5IGJ5IHVzaW5nIGNvbXBvbmVudCwgYXctZGlhbG9nLCBhdy1jb25maXJtYXRpb24gb3IgYXctb3ZlcmxheVxuICogICAyLiAgb3IgdGhlIE1vZGFsU2VydmljZSAgc2VydmljZS5vcGVuKDxPdmVybGF5Q29tcG9uZW50PiksIHNlcnZpY2UuY2xvc2UoKVxuICpcbiAqIFVzYWdlOlxuICogICAgMS4gIFVzaW5nIE1vZGFsU2VydmljZSBkaXJlY3RseSB0byBkaXNwbGF5IGEgbW9kYWwgcG9wdXAuIFRoZSB1c2FnZSBpcyBhIGxpdHRsZSB0cmlja3lcbiAqICAgICAgICBiZWNhdXNlIGFuZ3VsYXIgY3VycmVudGx5IGRvZXNuJ3Qgc3VwcG9ydCBkeW5hbWljIGNvbnRlbnQgcHJvamVjdGlvbi5cbiAqXG4gKiAgICAgICAgICBsZXQgb3ZlcmxheSA9IHRoaXMubW9kYWxTZXJ2aWNlLm9wZW48T3ZlcmxheUNvbXBvbmVudD4oT3ZlcmxheUNvbXBvbmVudCwge30pO1xuICpcbiAqICAgICAgICAgICAgLy8gQWRkIGNvbnRlbnQuIFRoZXJlJ3Mgbm90IHN1cHBvcnQgZm9yIGR5bmFtaWMgY29udGVudCBwcm9qZWN0aW9uIHlldC5cbiAqICAgICAgICAgICAgLy8gU28gaGF2ZSBhZGQgY29udGVudCBkaXJlY3RseS5cbiAqICAgICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBub3QgdGhlIGJlc3Qgd2F5LlxuICogICAgICAgICAgb3ZlcmxheS5pbnN0YW5jZS5vdmVybGF5LmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi51aS1vdmVybGF5cGFuZWwtY29udGVudFwiKVxuICogICAgICAgICAgICAgICAuaW5uZXJIVE1MID0gYDxpbWcgc3R5bGU9J3dpZHRoOjMwMHB4Oycgc3JjPVwic2FsZXMucG5nXCIgYWx0PVwiU2FsZXMgQ2hhcnRcIiAvPmA7XG4gKlxuICogICAgICAgICAgLy8gZGVsYXkgdGhlIG9wZW5pbmcgYWZ0ZXIgbmcgbGlmZWN5Y2xlIGhhcyBiZWVuIGluaXRpYWxpemVkLlxuICogICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG92ZXJsYXkuaW5zdGFuY2Uub3BlbihldmVudCk7IH0sIDEpO1xuICpcbiAqXG4gKiAgIDIuICAgVXNlIHRoZSBjb21wb25lbnQgaW5zaWRlIHlvdXIgdGVtcGxhdGUuXG4gKlxuICogICAgICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2F3LXBhZ2UnICxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctb3ZlcmxheSAjb3ZlcmxheSAob25PcGVuKT1cIm92ZXJsYXlBY3Rpb249J29wZW4nXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25DbG9zZSk9XCJvdmVybGF5QWN0aW9uPSdjbG9zZSdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cInNhbGVzLnBuZ1wiIGFsdD1cIkNoYXJ0XCIvPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctb3ZlcmxheT5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiBbc2l6ZV09XCInc21hbGwnXCIgKGNsaWNrKT1cIm92ZXJsYXkub3BlbigkZXZlbnQpXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wZW4gT3ZlcmxheVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuICogICAgICAgICAgICAgICAgICBgXG4gKiAgICAgICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheUFjdGlvbjogc3RyaW5nO1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgICAgICAgICBuZ09uSW5pdCgpIHsgfVxuICogICAgICAgfVxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctb3ZlcmxheScsXG4gICAgdGVtcGxhdGVVcmw6ICdvdmVybGF5LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnb3ZlcmxheS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE92ZXJsYXlDb21wb25lbnQgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0XG57XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBoaWRlIG92ZXJsYXkgd2hlbiBvdXRzaWRlIGlzIGNsaWNrZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNtaXNzYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBkaXNwbGF5cyB0aGUgY2xvc2UgaWNvbiAneCcgYXQgdG9wIG9mIHJpZ2h0IGNvcm5lci5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dDbG9zZUljb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIG92ZXJsYXkuIFwiYm9keVwiIG9yIGxvY2FsIG5nLXRlbXBsYXRlIHZhcmlhYmxlIGFyZSB2YWxpZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZFRvOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIG92ZXJsYXkgaXMgY2xvc2VkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCBqdXN0IGJlZm9yZSBvdmVybGF5IGlzIGNsb3NlZFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGJlZm9yZUNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIG92ZXJsYXkgaXMgb3BlbmVkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50ZXJuYWwgb3ZlcmxheSBwYW5lbC5cbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKE92ZXJsYXlQYW5lbClcbiAgICBvdmVybGF5OiBPdmVybGF5UGFuZWw7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gcGxhY2UgaG9sZGVyIHRvIGJlIG92ZXJyaWRkZW4gYnkgTW9kYWwgU2VydmljZVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBwbGFjZSBob2xkZXIgdG8gYmUgb3ZlcnJpZGRlbiBieSBNb2RhbCBTZXJ2aWNlXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBPcGVuIE92ZXJsYXlcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBvcGVuKGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zaG93KGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMub25PcGVuZWQobnVsbCk7XG4gICAgICAgIH0sIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlIE92ZXJsYXlcbiAgICAgKi9cbiAgICBjbG9zZSgpXG4gICAge1xuICAgICAgICB0aGlzLmJlZm9yZUNsb3NlLmVtaXQobnVsbCk7XG4gICAgICAgIHRoaXMub3ZlcmxheS5oaWRlKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiB0b2dnbGUgb3BlbiBhbmQgY2xvc2UuXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgdG9nZ2xlKGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS50b2dnbGUoZXZlbnQpO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG5cblxuICAgIG9uT3BlbmVkKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkNsb3NlZChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cbiJdfQ==