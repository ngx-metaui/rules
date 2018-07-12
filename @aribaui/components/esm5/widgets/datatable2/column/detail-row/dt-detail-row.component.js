/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        this.isVisible = !this.dt.isOutline() || !this.dt.pivotalLayout;
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
        var /** @type {?} */ isVisible = this.isVisible;
        if (isPresent(this.isVisibleFn)) {
            isVisible = this.isVisibleFn.apply(this.dt.context, [this, item]);
        }
        return isVisible;
    };
    DTDetailRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-dt-detail-column',
                    template: "<!--\n    Renders application defined detail column. This template just renders a detail row and\n    not expansion control. This is implemented by different DtColumn implementation and its added\n    (will be) added programmatically during column initialization\n-->\n<ng-template #renderingTemplate let-column=\"column\" let-rowData=\"data\">\n\n    <tr #detailRowElement class=\"dt-body-row dt-detail-row\">\n\n        <td *ngIf=\"dt.hasInvisibleSelectionColumn()\" width=\"1px\"></td>\n        <td *ngIf=\"visibleLeadingCols() > 0\" colspan=\"visibleLeadingCols()\" width=\"1px\">\n            &nbsp;&nbsp;\n        </td>\n        <td [attr.colspan]=\"dt.startOfFirstDataColumn\" [class]=\"dynamicBodyClass(rowData)\"\n            [ngClass]=\"{ 'dt-is-default dt-cell-def': true}\">\n\n            <ng-container\n                *ngTemplateOutlet=\"bodyTemplate; context:{$implicit: this, rowData:rowData}\">\n            </ng-container>\n        </td>\n    </tr>\n</ng-template>\n\n",
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    providers: [DomHandler]
                },] },
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
function DTDetailRowComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZGV0YWlsLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9kZXRhaWwtcm93L2R0LWRldGFpbC1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQXNCLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV0RixPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7O0lBd0NoQixnREFBa0I7SUFtQnhELDhCQUFtQixHQUFnQixFQUFTLFVBQXNCO1FBQWxFLFlBQ0ksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUN6QjtRQUZrQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBQVMsZ0JBQVUsR0FBVixVQUFVLENBQVk7Ozs7Ozs0QkFIM0MsSUFBSTs7S0FLMUI7Ozs7SUFHRCx1Q0FBUTs7O0lBQVI7O1FBRUksSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQ2hFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO0tBQ3BCO0lBR0Q7OztPQUdHOzs7Ozs7SUFDSCxpREFBa0I7Ozs7O0lBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDJCQUEyQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0Y7SUFHRDs7Ozs7Ozs7T0FRRzs7Ozs7Ozs7Ozs7O0lBQ0gsNENBQWE7Ozs7Ozs7Ozs7O0lBQWIsVUFBYyxJQUFTO1FBQ25CLHFCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNwQjs7Z0JBeEZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsNjlCQXVCYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ1osYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztpQkFFMUI7Ozs7Z0JBekNPLFdBQVc7Z0JBQ1gsVUFBVTs7OzhCQStDYixLQUFLOzhCQVNMLEtBQUs7OytCQS9FVjtFQWdFMEMsa0JBQWtCO1NBQS9DLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGF0YXRhYmxlMkNvbXBvbmVudH0gZnJvbSAnLi4vLi4vZGF0YXRhYmxlMi5jb21wb25lbnQnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuLi9kdC1jb2x1bW4uY29tcG9uZW50JztcblxuXG4vKipcbiAqXG4gKiBDdXN0b20gY29sdW1uIGltcGxlbWVudGF0aW9uIHRvIHJlbmRlciBkZXRhaWwgcm93IHNwYW5pbmcgaXRzIGNvbHVtbiBhY3Jvc3Mgd2hvbGUgdGFibGUgd2lkdGguXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1kdC1kZXRhaWwtY29sdW1uJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS1cbiAgICBSZW5kZXJzIGFwcGxpY2F0aW9uIGRlZmluZWQgZGV0YWlsIGNvbHVtbi4gVGhpcyB0ZW1wbGF0ZSBqdXN0IHJlbmRlcnMgYSBkZXRhaWwgcm93IGFuZFxuICAgIG5vdCBleHBhbnNpb24gY29udHJvbC4gVGhpcyBpcyBpbXBsZW1lbnRlZCBieSBkaWZmZXJlbnQgRHRDb2x1bW4gaW1wbGVtZW50YXRpb24gYW5kIGl0cyBhZGRlZFxuICAgICh3aWxsIGJlKSBhZGRlZCBwcm9ncmFtbWF0aWNhbGx5IGR1cmluZyBjb2x1bW4gaW5pdGlhbGl6YXRpb25cbi0tPlxuPG5nLXRlbXBsYXRlICNyZW5kZXJpbmdUZW1wbGF0ZSBsZXQtY29sdW1uPVwiY29sdW1uXCIgbGV0LXJvd0RhdGE9XCJkYXRhXCI+XG5cbiAgICA8dHIgI2RldGFpbFJvd0VsZW1lbnQgY2xhc3M9XCJkdC1ib2R5LXJvdyBkdC1kZXRhaWwtcm93XCI+XG5cbiAgICAgICAgPHRkICpuZ0lmPVwiZHQuaGFzSW52aXNpYmxlU2VsZWN0aW9uQ29sdW1uKClcIiB3aWR0aD1cIjFweFwiPjwvdGQ+XG4gICAgICAgIDx0ZCAqbmdJZj1cInZpc2libGVMZWFkaW5nQ29scygpID4gMFwiIGNvbHNwYW49XCJ2aXNpYmxlTGVhZGluZ0NvbHMoKVwiIHdpZHRoPVwiMXB4XCI+XG4gICAgICAgICAgICAmbmJzcDsmbmJzcDtcbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwiZHQuc3RhcnRPZkZpcnN0RGF0YUNvbHVtblwiIFtjbGFzc109XCJkeW5hbWljQm9keUNsYXNzKHJvd0RhdGEpXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2R0LWlzLWRlZmF1bHQgZHQtY2VsbC1kZWYnOiB0cnVlfVwiPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJib2R5VGVtcGxhdGU7IGNvbnRleHQ6eyRpbXBsaWNpdDogdGhpcywgcm93RGF0YTpyb3dEYXRhfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gICAgc3R5bGVzOiBbYGBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl1cblxufSlcbmV4cG9ydCBjbGFzcyBEVERldGFpbFJvd0NvbXBvbmVudCBleHRlbmRzIERUQ29sdW1uMkNvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGN1cnJlbnQgdmlzaWJpbGl0eSBmb3IgY3VycmVudCBkYXRhIHJvdyB1c2luZyBtZXRob2QgcmVmZXJlbmNlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGlzVmlzaWJsZUZuOiAoY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSkgPT4gYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiB0ZWxscyBpZiB3ZSBuZWVkIHRvIHJlbmRlciBhIGxpbmUgYmV0d2VlbiBpdGVtIHJvdyBhbmQgaXRzIGRldGFpbFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93Um93TGluZTogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZG9tSGFuZGxlcjogRG9tSGFuZGxlcikge1xuICAgICAgICBzdXBlcihlbnYsIGRvbUhhbmRsZXIpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIGp1c3QgdG8gZ2V0IGFyb3VuZCB0aGUgY2hlY2sgaW4gcGFyZW50IGNsYXNzXG4gICAgICAgIHRoaXMua2V5ID0gJyc7XG5cbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSAhdGhpcy5kdC5pc091dGxpbmUoKSB8fCAhdGhpcy5kdC5waXZvdGFsTGF5b3V0O1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgd2UgbmVlZCB0byBrZWVwIHNvbWUgbGVhZGluZyBURHNcbiAgICAgKlxuICAgICAqL1xuICAgIHZpc2libGVMZWFkaW5nQ29scygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5udW1iZXJPZkNvbHNCZWZvcmVEYXRhIC0gKHRoaXMuZHQuaGFzSW52aXNpYmxlU2VsZWN0aW9uQ29sdW1uKCkgPyAxIDogMCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENoZWNrIGlmIHdlIGNhbiBzaG93IGRldGFpbCByb3cvY29sdW1uIHVzaW5nIGVpdGhlciBbaXNWaXNpYmxlXSBvciBbaXNWaXNpYmxlRm5dIGJpbmRpbmdzLlxuICAgICAqIEhlcmUgY2FuIGhvb2sgb24gYXBwbGljYXRpb24gbGV2ZWwgY3VzdG9tIG1ldGhvZCB0byBkZWNpZGUgaWYgY3VycmVudCBpdGVtIGhhcyBkZXRhaWwgcm93XG4gICAgICogb3Igbm90XG4gICAgICpcbiAgICAgKiBPciB3ZSBjYW4gdXNlIGlzVmlzaWJsZT10cnVlIHRvIHRlbGwgYWxsIHJvdyBoYXZlIGRldGFpbCByb3dcbiAgICAgKlxuICAgICAqL1xuICAgIHNob3dEZXRhaWxSb3coaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBpc1Zpc2libGUgPSB0aGlzLmlzVmlzaWJsZTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmlzVmlzaWJsZUZuKSkge1xuICAgICAgICAgICAgaXNWaXNpYmxlID0gdGhpcy5pc1Zpc2libGVGbi5hcHBseSh0aGlzLmR0LmNvbnRleHQsIFt0aGlzLCBpdGVtXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzVmlzaWJsZTtcbiAgICB9XG5cbn1cblxuIl19