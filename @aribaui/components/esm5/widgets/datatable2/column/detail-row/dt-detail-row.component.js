/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DTDetailRowComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DTDetailRowComponent, _super);
    function DTDetailRowComponent(env, domHandler) {
        var _this = _super.call(this, env, domHandler) || this;
        _this.env = env;
        _this.domHandler = domHandler;
        /**
         *
         * tells if we need to render a line between item row and its detail
         *
         */
        _this.showRowLine = true;
        return _this;
    }
    /**
     * @return {?}
     */
    DTDetailRowComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // just to get around the check in parent class
        this.key = '';
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * Check if we need to keep some leading TDs
     *
     */
    /**
     * Check if we need to keep some leading TDs
     *
     * @return {?}
     */
    DTDetailRowComponent.prototype.visibleLeadingCols = /**
     * Check if we need to keep some leading TDs
     *
     * @return {?}
     */
    function () {
        return this.dt.numberOfColsBeforeData - (this.dt.hasInvisibleSelectionColumn() ? 1 : 0);
    };
    /**
     *
     * Check if we can show detail row/column using either [isVisible] or [isVisibleFn] bindings.
     * Here can hook on application level custom method to decide if current item has detail row
     * or not
     *
     * Or we can use isVisible=true to tell all row have detail row
     *
     */
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
    DTDetailRowComponent.prototype.showDetailRow = /**
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
    function (item) {
        /** @type {?} */
        var isVisible = this.isVisible;
        if (isPresent(this.isVisibleFn)) {
            isVisible = this.isVisibleFn.apply(this.dt.context, [this, item]);
        }
        return isVisible;
    };
    /**
     * @param {?} table
     * @return {?}
     */
    DTDetailRowComponent.prototype.initialize = /**
     * @param {?} table
     * @return {?}
     */
    function (table) {
        _super.prototype.initialize.call(this, table);
        this.isVisible = !this.dt.isOutline() || !this.dt.pivotalLayout;
    };
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
    DTDetailRowComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: DomHandler }
    ]; };
    DTDetailRowComponent.propDecorators = {
        isVisibleFn: [{ type: Input }],
        showRowLine: [{ type: Input }]
    };
    return DTDetailRowComponent;
}(DTColumn2Component));
export { DTDetailRowComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZGV0YWlsLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9kZXRhaWwtcm93L2R0LWRldGFpbC1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7SUFrQmhCLGdEQUFrQjtJQW9CeEQsOEJBQW1CLEdBQWdCLEVBQVMsVUFBc0I7UUFBbEUsWUFFSSxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQ3pCO1FBSGtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7Ozs7OzRCQUgzQyxJQUFJOztLQU0xQjs7OztJQUdELHVDQUFROzs7SUFBUjs7UUFHSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLGlCQUFNLFFBQVEsV0FBRSxDQUFDO0tBQ3BCO0lBR0Q7OztPQUdHOzs7Ozs7SUFDSCxpREFBa0I7Ozs7O0lBQWxCO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDJCQUEyQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0Y7SUFHRDs7Ozs7Ozs7T0FRRzs7Ozs7Ozs7Ozs7O0lBQ0gsNENBQWE7Ozs7Ozs7Ozs7O0lBQWIsVUFBYyxJQUFTOztRQUVuQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNwQjs7Ozs7SUFHRCx5Q0FBVTs7OztJQUFWLFVBQVcsS0FBa0I7UUFFekIsaUJBQU0sVUFBVSxZQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDbkU7O2dCQTVFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsdStCQUEyQztvQkFFM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQzs7aUJBRTFCOzs7O2dCQW5CTyxXQUFXO2dCQUNYLFVBQVU7Ozs4QkEwQmIsS0FBSzs4QkFTTCxLQUFLOzsrQkF6RFY7RUF5QzBDLGtCQUFrQjtTQUEvQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuLi9kdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7QVdEYXRhVGFibGV9IGZyb20gJy4uLy4uL2F3LWRhdGF0YWJsZSc7XG5cblxuLyoqXG4gKlxuICogQ3VzdG9tIGNvbHVtbiBpbXBsZW1lbnRhdGlvbiB0byByZW5kZXIgZGV0YWlsIHJvdyBzcGFuaW5nIGl0cyBjb2x1bW4gYWNyb3NzIHdob2xlIHRhYmxlIHdpZHRoLlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtZGV0YWlsLWNvbHVtbicsXG4gICAgdGVtcGxhdGVVcmw6ICdkdC1kZXRhaWwtcm93LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZHQtZGV0YWlsLXJvdy5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl1cblxufSlcbmV4cG9ydCBjbGFzcyBEVERldGFpbFJvd0NvbXBvbmVudCBleHRlbmRzIERUQ29sdW1uMkNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBjdXJyZW50IHZpc2liaWxpdHkgZm9yIGN1cnJlbnQgZGF0YSByb3cgdXNpbmcgbWV0aG9kIHJlZmVyZW5jZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpc1Zpc2libGVGbjogKGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpID0+IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogdGVsbHMgaWYgd2UgbmVlZCB0byByZW5kZXIgYSBsaW5lIGJldHdlZW4gaXRlbSByb3cgYW5kIGl0cyBkZXRhaWxcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1Jvd0xpbmU6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHVibGljIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIGRvbUhhbmRsZXIpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8ganVzdCB0byBnZXQgYXJvdW5kIHRoZSBjaGVjayBpbiBwYXJlbnQgY2xhc3NcbiAgICAgICAgdGhpcy5rZXkgPSAnJztcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHdlIG5lZWQgdG8ga2VlcCBzb21lIGxlYWRpbmcgVERzXG4gICAgICpcbiAgICAgKi9cbiAgICB2aXNpYmxlTGVhZGluZ0NvbHMoKTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5udW1iZXJPZkNvbHNCZWZvcmVEYXRhIC0gKHRoaXMuZHQuaGFzSW52aXNpYmxlU2VsZWN0aW9uQ29sdW1uKCkgPyAxIDogMCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENoZWNrIGlmIHdlIGNhbiBzaG93IGRldGFpbCByb3cvY29sdW1uIHVzaW5nIGVpdGhlciBbaXNWaXNpYmxlXSBvciBbaXNWaXNpYmxlRm5dIGJpbmRpbmdzLlxuICAgICAqIEhlcmUgY2FuIGhvb2sgb24gYXBwbGljYXRpb24gbGV2ZWwgY3VzdG9tIG1ldGhvZCB0byBkZWNpZGUgaWYgY3VycmVudCBpdGVtIGhhcyBkZXRhaWwgcm93XG4gICAgICogb3Igbm90XG4gICAgICpcbiAgICAgKiBPciB3ZSBjYW4gdXNlIGlzVmlzaWJsZT10cnVlIHRvIHRlbGwgYWxsIHJvdyBoYXZlIGRldGFpbCByb3dcbiAgICAgKlxuICAgICAqL1xuICAgIHNob3dEZXRhaWxSb3coaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGlzVmlzaWJsZSA9IHRoaXMuaXNWaXNpYmxlO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuaXNWaXNpYmxlRm4pKSB7XG4gICAgICAgICAgICBpc1Zpc2libGUgPSB0aGlzLmlzVmlzaWJsZUZuLmFwcGx5KHRoaXMuZHQuY29udGV4dCwgW3RoaXMsIGl0ZW1dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNWaXNpYmxlO1xuICAgIH1cblxuXG4gICAgaW5pdGlhbGl6ZSh0YWJsZTogQVdEYXRhVGFibGUpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5pbml0aWFsaXplKHRhYmxlKTtcblxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmR0LmlzT3V0bGluZSgpIHx8ICF0aGlzLmR0LnBpdm90YWxMYXlvdXQ7XG4gICAgfVxufVxuXG4iXX0=