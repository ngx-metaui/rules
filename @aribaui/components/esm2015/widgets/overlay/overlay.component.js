/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
     * Open Overlay
     * @param {?} event
     * @return {?}
     */
    open(event) {
        this.overlay.show(event);
        this.onOpened(null);
    }
    /**
     * Close Overlay
     * @return {?}
     */
    close() {
        this.overlay.hide();
    }
    /**
     * toggle open and close.
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        this.overlay.toggle(event);
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
                template: `<p-overlayPanel [dismissable]="dismissable" [showCloseIcon]="showCloseIcon"
                [styleClass]="styleClass" [appendTo]="appendTo"
                (onAfterHide)="onClosed($event)">
    <ng-content></ng-content>
</p-overlayPanel>
`,
                styles: [`::ng-deep .ui-overlaypanel{border:1px solid #d7d7d7;box-shadow:0 2px 4px 0 rgba(0,0,0,.2)}::ng-deep .ui-overlaypanel-content{padding:2em 3.4em .6em 1.43em}::ng-deep .ui-overlaypanel-close{border-radius:0;top:.5em;right:.5em}::ng-deep .ui-overlaypanel-close.ui-state-default{border:none}`]
            },] },
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
    onOpen: [{ type: Output }],
    overlay: [{ type: ViewChild, args: [OverlayPanel,] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9vdmVybGF5L292ZXJsYXkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvRTFDLE1BQU0sdUJBQXdCLFNBQVEsY0FBYzs7OztJQXFDaEQsWUFBbUIsR0FBZ0I7UUFFL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkksUUFBRyxHQUFILEdBQUcsQ0FBYTs7OzsyQkEvQlosSUFBSTs7Ozs2QkFNRixLQUFLOzs7O3VCQVdELElBQUksWUFBWSxFQUFFOzs7O3NCQU1uQixJQUFJLFlBQVksRUFBRTtLQVc3Qzs7OztJQUVELFFBQVE7S0FFUDs7Ozs7O0lBTUQsSUFBSSxDQUFDLEtBQVU7UUFFWCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCOzs7OztJQUtELEtBQUs7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3ZCOzs7Ozs7SUFPRCxNQUFNLENBQUMsS0FBVTtRQUViLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCOzs7OztJQUdELFFBQVEsQ0FBQyxLQUFVO1FBRWYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFFZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7O1lBN0ZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7OztDQUtiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLGdTQUFnUyxDQUFDO2FBQzdTOzs7O1lBbkVPLFdBQVc7OzswQkF5RWQsS0FBSzs0QkFNTCxLQUFLO3VCQUtMLEtBQUs7c0JBTUwsTUFBTTtxQkFNTixNQUFNO3NCQU1OLFNBQVMsU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01vZGFsQ29udGFpbmVyfSBmcm9tICcuLi8uLi9jb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCB7T3ZlcmxheVBhbmVsfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cbi8qKlxuICogT3ZlcmxheSBDb21wb25lbnQgaXMgYSBzaW1wbGUgdmVyc2lvbiBvZiB0aGUgZGlhbG9nIHdoZXJlIHRoZXJlJ3Mgb25seSBjb250ZW50LlxuICogT3ZlcmxheSB3aWxsIGFwcGVhciBhdCB0aGUgcG9zaXRpb24gd2hlcmUgdGhlIGFjdGlvbiBwZXJmb3JtZWQgdHJpZ2dlciBhbiBvdmVybGF5LlxuICpcbiAqIFRoZXJlIGFyZSB0aHJlZSB0eXBlcyBvZiBwb3B1cC5cbiAqICAgMS4gIGEgcmVndWxhciBkaWFsb2cgYm94IHRoYXQgaGFzIGhlYWRlciwgYm9keSBhbmQgZm9vdGVyLiBJdCdzIHRoZSBtb3N0IGN1c3RvbWl6YWJsZS5cbiAqICAgMi4gIGEgY29uZmlybWF0aW9uIGJveCBpcyBzaW1pbGFyIHRvIGEgZGlhbG9nIGJveCBidXQgaGFzIGFjY2VwdCBhbmQgcmVqZWN0IGFjdGlvbiBidXR0b25zLlxuICogICAzLiAgYSBvdmVybGF5LCB3aGljaCBpcyBhIHZlcnkgYmFzaWMgcG9wdXAgd2l0aCB3aGF0IHlvdSBwdXQgaW5zaWRlLlxuICogICAgICAgSXQgZG9lc24ndCBoYXZlIGhlYWRlciBhbmQgZm9vdGVyLlxuICpcbiAqIFRoZXJlIGFyZSB0d28gd2F5cyB0byB1c2UgYW55IHBvcHVwIGNvbXBvbmVudC5cbiAqICAgMS4gIEVpdGhlciBkaXJlY3RseSBieSB1c2luZyBjb21wb25lbnQsIGF3LWRpYWxvZywgYXctY29uZmlybWF0aW9uIG9yIGF3LW92ZXJsYXlcbiAqICAgMi4gIG9yIHRoZSBNb2RhbFNlcnZpY2UgIHNlcnZpY2Uub3Blbig8T3ZlcmxheUNvbXBvbmVudD4pLCBzZXJ2aWNlLmNsb3NlKClcbiAqXG4gKiBVc2FnZTpcbiAqICAgIDEuICBVc2luZyBNb2RhbFNlcnZpY2UgZGlyZWN0bHkgdG8gZGlzcGxheSBhIG1vZGFsIHBvcHVwLiBUaGUgdXNhZ2UgaXMgYSBsaXR0bGUgdHJpY2t5XG4gKiAgICAgICAgYmVjYXVzZSBhbmd1bGFyIGN1cnJlbnRseSBkb2Vzbid0IHN1cHBvcnQgZHluYW1pYyBjb250ZW50IHByb2plY3Rpb24uXG4gKlxuICogICAgICAgICAgbGV0IG92ZXJsYXkgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuPE92ZXJsYXlDb21wb25lbnQ+KE92ZXJsYXlDb21wb25lbnQsIHt9KTtcbiAqXG4gKiAgICAgICAgICAgIC8vIEFkZCBjb250ZW50LiBUaGVyZSdzIG5vdCBzdXBwb3J0IGZvciBkeW5hbWljIGNvbnRlbnQgcHJvamVjdGlvbiB5ZXQuXG4gKiAgICAgICAgICAgIC8vIFNvIGhhdmUgYWRkIGNvbnRlbnQgZGlyZWN0bHkuXG4gKiAgICAgICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgbm90IHRoZSBiZXN0IHdheS5cbiAqICAgICAgICAgIG92ZXJsYXkuaW5zdGFuY2Uub3ZlcmxheS5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudWktb3ZlcmxheXBhbmVsLWNvbnRlbnRcIilcbiAqICAgICAgICAgICAgICAgLmlubmVySFRNTCA9IGA8aW1nIHN0eWxlPSd3aWR0aDozMDBweDsnIHNyYz1cInNhbGVzLnBuZ1wiIGFsdD1cIlNhbGVzIENoYXJ0XCIgLz5gO1xuICpcbiAqICAgICAgICAgIC8vIGRlbGF5IHRoZSBvcGVuaW5nIGFmdGVyIG5nIGxpZmVjeWNsZSBoYXMgYmVlbiBpbml0aWFsaXplZC5cbiAqICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBvdmVybGF5Lmluc3RhbmNlLm9wZW4oZXZlbnQpOyB9LCAxKTtcbiAqXG4gKlxuICogICAyLiAgIFVzZSB0aGUgY29tcG9uZW50IGluc2lkZSB5b3VyIHRlbXBsYXRlLlxuICpcbiAqICAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhdy1wYWdlJyAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LW92ZXJsYXkgI292ZXJsYXkgKG9uT3Blbik9XCJvdmVybGF5QWN0aW9uPSdvcGVuJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2xvc2UpPVwib3ZlcmxheUFjdGlvbj0nY2xvc2UnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJzYWxlcy5wbmdcIiBhbHQ9XCJDaGFydFwiLz5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LW92ZXJsYXk+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24gW3NpemVdPVwiJ3NtYWxsJ1wiIChjbGljayk9XCJvdmVybGF5Lm9wZW4oJGV2ZW50KVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcGVuIE92ZXJsYXlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAqICAgICAgICAgICAgICAgICAgYFxuICogICAgICAgICBleHBvcnQgY2xhc3MgTXlQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXlBY3Rpb246IHN0cmluZztcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UpIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBlcigpO1xuICogICAgICAgICAgICAgICAgICAgICAgIH1cbiAqICAgICAgICAgICAgICAgICAgICAgbmdPbkluaXQoKSB7IH1cbiAqICAgICAgIH1cbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LW92ZXJsYXknLFxuICAgIHRlbXBsYXRlOiBgPHAtb3ZlcmxheVBhbmVsIFtkaXNtaXNzYWJsZV09XCJkaXNtaXNzYWJsZVwiIFtzaG93Q2xvc2VJY29uXT1cInNob3dDbG9zZUljb25cIlxuICAgICAgICAgICAgICAgIFtzdHlsZUNsYXNzXT1cInN0eWxlQ2xhc3NcIiBbYXBwZW5kVG9dPVwiYXBwZW5kVG9cIlxuICAgICAgICAgICAgICAgIChvbkFmdGVySGlkZSk9XCJvbkNsb3NlZCgkZXZlbnQpXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9wLW92ZXJsYXlQYW5lbD5cbmAsXG4gICAgc3R5bGVzOiBbYDo6bmctZGVlcCAudWktb3ZlcmxheXBhbmVse2JvcmRlcjoxcHggc29saWQgI2Q3ZDdkNztib3gtc2hhZG93OjAgMnB4IDRweCAwIHJnYmEoMCwwLDAsLjIpfTo6bmctZGVlcCAudWktb3ZlcmxheXBhbmVsLWNvbnRlbnR7cGFkZGluZzoyZW0gMy40ZW0gLjZlbSAxLjQzZW19OjpuZy1kZWVwIC51aS1vdmVybGF5cGFuZWwtY2xvc2V7Ym9yZGVyLXJhZGl1czowO3RvcDouNWVtO3JpZ2h0Oi41ZW19OjpuZy1kZWVwIC51aS1vdmVybGF5cGFuZWwtY2xvc2UudWktc3RhdGUtZGVmYXVsdHtib3JkZXI6bm9uZX1gXVxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5Q29tcG9uZW50IGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIGhpZGUgb3ZlcmxheSB3aGVuIG91dHNpZGUgaXMgY2xpY2tlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc21pc3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIGRpc3BsYXlzIHRoZSBjbG9zZSBpY29uICd4JyBhdCB0b3Agb2YgcmlnaHQgY29ybmVyLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0Nsb3NlSWNvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFRhcmdldCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgb3ZlcmxheS4gXCJib2R5XCIgb3IgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgYXJlIHZhbGlkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXBwZW5kVG86IGFueTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gb3ZlcmxheSBpcyBjbG9zZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBvdmVybGF5IGlzIG9wZW5lZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbk9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGludGVybmFsIG92ZXJsYXkgcGFuZWwuXG4gICAgICovXG4gICAgQFZpZXdDaGlsZChPdmVybGF5UGFuZWwpXG4gICAgb3ZlcmxheTogT3ZlcmxheVBhbmVsO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBPdmVybGF5XG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgb3BlbihldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LnNob3coZXZlbnQpO1xuICAgICAgICB0aGlzLm9uT3BlbmVkKG51bGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlIE92ZXJsYXlcbiAgICAgKi9cbiAgICBjbG9zZSgpXG4gICAge1xuICAgICAgICB0aGlzLm92ZXJsYXkuaGlkZSgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogdG9nZ2xlIG9wZW4gYW5kIGNsb3NlLlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIHRvZ2dsZShldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LnRvZ2dsZShldmVudCk7XG4gICAgfVxuXG5cbiAgICBvbk9wZW5lZChldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5vbk9wZW4uZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25DbG9zZWQoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG4iXX0=