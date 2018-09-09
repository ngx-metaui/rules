/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { DomHandler } from 'primeng/primeng';
import { DTColumn2Component } from '../dt-column.component';
/**
 *
 * Custom column implementation to render detail row spaning its column across whole table width.
 *
 *
 */
export class DTDetailRowComponent extends DTColumn2Component {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env, domHandler);
        this.env = env;
        this.domHandler = domHandler;
        /**
         *
         * tells if we need to render a line between item row and its detail
         *
         */
        this.showRowLine = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // just to get around the check in parent class
        this.key = '';
        super.ngOnInit();
    }
    /**
     * Check if we need to keep some leading TDs
     *
     * @return {?}
     */
    visibleLeadingCols() {
        return this.dt.numberOfColsBeforeData - (this.dt.hasInvisibleSelectionColumn() ? 1 : 0);
    }
    /**
     *
     * Check if we can show detail row/column using either [isVisible] or [isVisibleFn] bindings.
     * Here can hook on application level custom method to decide if current item has detail row
     * or not
     *
     * Or we can use isVisible=true to tell all row have detail row
     *
     * @param {?} item
     * @return {?}
     */
    showDetailRow(item) {
        /** @type {?} */
        let isVisible = this.isVisible;
        if (isPresent(this.isVisibleFn)) {
            isVisible = this.isVisibleFn.apply(this.dt.context, [this, item]);
        }
        return isVisible;
    }
    /**
     * @param {?} table
     * @return {?}
     */
    initialize(table) {
        super.initialize(table);
        this.isVisible = !this.dt.isOutline() || !this.dt.pivotalLayout;
    }
}
DTDetailRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-detail-column',
                template: "<!--\n    Renders application defined detail column. This template just renders a detail row and\n    not expansion control. This is implemented by different DtColumn implementation and its added\n    (will be) added programmatically during column initialization\n-->\n<ng-template #renderingTemplate let-column=\"column\" let-rowData=\"data\">\n\n    <tr #detailRowElement class=\"dt-body-row dt-detail-row\">\n\n        <td *ngIf=\"dt.hasInvisibleSelectionColumn()\" width=\"1px\"></td>\n        <td *ngIf=\"visibleLeadingCols() > 0\" colspan=\"visibleLeadingCols()\" width=\"1px\">\n            &nbsp;&nbsp;\n        </td>\n        <td [attr.colspan]=\"dt.startOfFirstDataColumn\" [class]=\"dynamicBodyClass(rowData)\"\n            [ngClass]=\"{ 'dt-is-default dt-cell-def': true}\">\n\n            <ng-container\n                *ngTemplateOutlet=\"bodyTemplate; context:{$implicit: this, rowData:rowData}\">\n            </ng-container>\n        </td>\n    </tr>\n</ng-template>\n\n",
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler],
                styles: [""]
            }] }
];
/** @nocollapse */
DTDetailRowComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];
DTDetailRowComponent.propDecorators = {
    isVisibleFn: [{ type: Input }],
    showRowLine: [{ type: Input }]
};
if (false) {
    /**
     * Defines current visibility for current data row using method reference
     *
     * @type {?}
     */
    DTDetailRowComponent.prototype.isVisibleFn;
    /**
     *
     * tells if we need to render a line between item row and its detail
     *
     * @type {?}
     */
    DTDetailRowComponent.prototype.showRowLine;
    /** @type {?} */
    DTDetailRowComponent.prototype.env;
    /** @type {?} */
    DTDetailRowComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZGV0YWlsLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9kZXRhaWwtcm93L2R0LWRldGFpbC1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7O0FBa0IxRCxNQUFNLDJCQUE0QixTQUFRLGtCQUFrQjs7Ozs7SUFvQnhELFlBQW1CLEdBQWdCLEVBQVMsVUFBc0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUZSLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFZOzs7Ozs7MkJBSDNDLElBQUk7S0FNMUI7Ozs7SUFHRCxRQUFROztRQUdKLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3BCOzs7Ozs7SUFPRCxrQkFBa0I7UUFFZCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzRjs7Ozs7Ozs7Ozs7O0lBWUQsYUFBYSxDQUFDLElBQVM7O1FBRW5CLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckU7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3BCOzs7OztJQUdELFVBQVUsQ0FBQyxLQUFrQjtRQUV6QixLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDbkU7OztZQTVFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsdStCQUEyQztnQkFFM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQzs7YUFFMUI7Ozs7WUFuQk8sV0FBVztZQUNYLFVBQVU7OzswQkEwQmIsS0FBSzswQkFTTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQge0FXRGF0YVRhYmxlfSBmcm9tICcuLi8uLi9hdy1kYXRhdGFibGUnO1xuXG5cbi8qKlxuICpcbiAqIEN1c3RvbSBjb2x1bW4gaW1wbGVtZW50YXRpb24gdG8gcmVuZGVyIGRldGFpbCByb3cgc3BhbmluZyBpdHMgY29sdW1uIGFjcm9zcyB3aG9sZSB0YWJsZSB3aWR0aC5cbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWR0LWRldGFpbC1jb2x1bW4nLFxuICAgIHRlbXBsYXRlVXJsOiAnZHQtZGV0YWlsLXJvdy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2R0LWRldGFpbC1yb3cuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFREZXRhaWxSb3dDb21wb25lbnQgZXh0ZW5kcyBEVENvbHVtbjJDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgY3VycmVudCB2aXNpYmlsaXR5IGZvciBjdXJyZW50IGRhdGEgcm93IHVzaW5nIG1ldGhvZCByZWZlcmVuY2VcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNWaXNpYmxlRm46IChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KSA9PiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIHRlbGxzIGlmIHdlIG5lZWQgdG8gcmVuZGVyIGEgbGluZSBiZXR3ZWVuIGl0ZW0gcm93IGFuZCBpdHMgZGV0YWlsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dSb3dMaW5lOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBkb21IYW5kbGVyOiBEb21IYW5kbGVyKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBkb21IYW5kbGVyKTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIGp1c3QgdG8gZ2V0IGFyb3VuZCB0aGUgY2hlY2sgaW4gcGFyZW50IGNsYXNzXG4gICAgICAgIHRoaXMua2V5ID0gJyc7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB3ZSBuZWVkIHRvIGtlZXAgc29tZSBsZWFkaW5nIFREc1xuICAgICAqXG4gICAgICovXG4gICAgdmlzaWJsZUxlYWRpbmdDb2xzKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQubnVtYmVyT2ZDb2xzQmVmb3JlRGF0YSAtICh0aGlzLmR0Lmhhc0ludmlzaWJsZVNlbGVjdGlvbkNvbHVtbigpID8gMSA6IDApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaGVjayBpZiB3ZSBjYW4gc2hvdyBkZXRhaWwgcm93L2NvbHVtbiB1c2luZyBlaXRoZXIgW2lzVmlzaWJsZV0gb3IgW2lzVmlzaWJsZUZuXSBiaW5kaW5ncy5cbiAgICAgKiBIZXJlIGNhbiBob29rIG9uIGFwcGxpY2F0aW9uIGxldmVsIGN1c3RvbSBtZXRob2QgdG8gZGVjaWRlIGlmIGN1cnJlbnQgaXRlbSBoYXMgZGV0YWlsIHJvd1xuICAgICAqIG9yIG5vdFxuICAgICAqXG4gICAgICogT3Igd2UgY2FuIHVzZSBpc1Zpc2libGU9dHJ1ZSB0byB0ZWxsIGFsbCByb3cgaGF2ZSBkZXRhaWwgcm93XG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93RGV0YWlsUm93KGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBpc1Zpc2libGUgPSB0aGlzLmlzVmlzaWJsZTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmlzVmlzaWJsZUZuKSkge1xuICAgICAgICAgICAgaXNWaXNpYmxlID0gdGhpcy5pc1Zpc2libGVGbi5hcHBseSh0aGlzLmR0LmNvbnRleHQsIFt0aGlzLCBpdGVtXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzVmlzaWJsZTtcbiAgICB9XG5cblxuICAgIGluaXRpYWxpemUodGFibGU6IEFXRGF0YVRhYmxlKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSh0YWJsZSk7XG5cbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSAhdGhpcy5kdC5pc091dGxpbmUoKSB8fCAhdGhpcy5kdC5waXZvdGFsTGF5b3V0O1xuICAgIH1cbn1cblxuIl19