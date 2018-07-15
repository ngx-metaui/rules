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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZGV0YWlsLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9kZXRhaWwtcm93L2R0LWRldGFpbC1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7SUF5Q2hCLGdEQUFrQjtJQW9CeEQsOEJBQW1CLEdBQWdCLEVBQVMsVUFBc0I7UUFBbEUsWUFFSSxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQ3pCO1FBSGtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7Ozs7OzRCQUgzQyxJQUFJOztLQU0xQjs7OztJQUdELHVDQUFROzs7SUFBUjs7UUFHSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLGlCQUFNLFFBQVEsV0FBRSxDQUFDO0tBQ3BCO0lBR0Q7OztPQUdHOzs7Ozs7SUFDSCxpREFBa0I7Ozs7O0lBQWxCO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDJCQUEyQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0Y7SUFHRDs7Ozs7Ozs7T0FRRzs7Ozs7Ozs7Ozs7O0lBQ0gsNENBQWE7Ozs7Ozs7Ozs7O0lBQWIsVUFBYyxJQUFTO1FBRW5CLHFCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNwQjs7Ozs7SUFHRCx5Q0FBVTs7OztJQUFWLFVBQVcsS0FBa0I7UUFFekIsaUJBQU0sVUFBVSxZQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDbkU7O2dCQW5HSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLDY5QkF1QmI7b0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBRTFCOzs7O2dCQTFDTyxXQUFXO2dCQUNYLFVBQVU7Ozs4QkFpRGIsS0FBSzs4QkFTTCxLQUFLOzsrQkFoRlY7RUFnRTBDLGtCQUFrQjtTQUEvQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuLi9kdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7QVdEYXRhVGFibGV9IGZyb20gJy4uLy4uL2F3LWRhdGF0YWJsZSc7XG5cblxuLyoqXG4gKlxuICogQ3VzdG9tIGNvbHVtbiBpbXBsZW1lbnRhdGlvbiB0byByZW5kZXIgZGV0YWlsIHJvdyBzcGFuaW5nIGl0cyBjb2x1bW4gYWNyb3NzIHdob2xlIHRhYmxlIHdpZHRoLlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtZGV0YWlsLWNvbHVtbicsXG4gICAgdGVtcGxhdGU6IGA8IS0tXG4gICAgUmVuZGVycyBhcHBsaWNhdGlvbiBkZWZpbmVkIGRldGFpbCBjb2x1bW4uIFRoaXMgdGVtcGxhdGUganVzdCByZW5kZXJzIGEgZGV0YWlsIHJvdyBhbmRcbiAgICBub3QgZXhwYW5zaW9uIGNvbnRyb2wuIFRoaXMgaXMgaW1wbGVtZW50ZWQgYnkgZGlmZmVyZW50IER0Q29sdW1uIGltcGxlbWVudGF0aW9uIGFuZCBpdHMgYWRkZWRcbiAgICAod2lsbCBiZSkgYWRkZWQgcHJvZ3JhbW1hdGljYWxseSBkdXJpbmcgY29sdW1uIGluaXRpYWxpemF0aW9uXG4tLT5cbjxuZy10ZW1wbGF0ZSAjcmVuZGVyaW5nVGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIGxldC1yb3dEYXRhPVwiZGF0YVwiPlxuXG4gICAgPHRyICNkZXRhaWxSb3dFbGVtZW50IGNsYXNzPVwiZHQtYm9keS1yb3cgZHQtZGV0YWlsLXJvd1wiPlxuXG4gICAgICAgIDx0ZCAqbmdJZj1cImR0Lmhhc0ludmlzaWJsZVNlbGVjdGlvbkNvbHVtbigpXCIgd2lkdGg9XCIxcHhcIj48L3RkPlxuICAgICAgICA8dGQgKm5nSWY9XCJ2aXNpYmxlTGVhZGluZ0NvbHMoKSA+IDBcIiBjb2xzcGFuPVwidmlzaWJsZUxlYWRpbmdDb2xzKClcIiB3aWR0aD1cIjFweFwiPlxuICAgICAgICAgICAgJm5ic3A7Jm5ic3A7XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImR0LnN0YXJ0T2ZGaXJzdERhdGFDb2x1bW5cIiBbY2xhc3NdPVwiZHluYW1pY0JvZHlDbGFzcyhyb3dEYXRhKVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdkdC1pcy1kZWZhdWx0IGR0LWNlbGwtZGVmJzogdHJ1ZX1cIj5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keVRlbXBsYXRlOyBjb250ZXh0OnskaW1wbGljaXQ6IHRoaXMsIHJvd0RhdGE6cm93RGF0YX1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICAgIHN0eWxlczogW2BgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFREZXRhaWxSb3dDb21wb25lbnQgZXh0ZW5kcyBEVENvbHVtbjJDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgY3VycmVudCB2aXNpYmlsaXR5IGZvciBjdXJyZW50IGRhdGEgcm93IHVzaW5nIG1ldGhvZCByZWZlcmVuY2VcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNWaXNpYmxlRm46IChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KSA9PiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIHRlbGxzIGlmIHdlIG5lZWQgdG8gcmVuZGVyIGEgbGluZSBiZXR3ZWVuIGl0ZW0gcm93IGFuZCBpdHMgZGV0YWlsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dSb3dMaW5lOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBkb21IYW5kbGVyOiBEb21IYW5kbGVyKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBkb21IYW5kbGVyKTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIGp1c3QgdG8gZ2V0IGFyb3VuZCB0aGUgY2hlY2sgaW4gcGFyZW50IGNsYXNzXG4gICAgICAgIHRoaXMua2V5ID0gJyc7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB3ZSBuZWVkIHRvIGtlZXAgc29tZSBsZWFkaW5nIFREc1xuICAgICAqXG4gICAgICovXG4gICAgdmlzaWJsZUxlYWRpbmdDb2xzKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQubnVtYmVyT2ZDb2xzQmVmb3JlRGF0YSAtICh0aGlzLmR0Lmhhc0ludmlzaWJsZVNlbGVjdGlvbkNvbHVtbigpID8gMSA6IDApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaGVjayBpZiB3ZSBjYW4gc2hvdyBkZXRhaWwgcm93L2NvbHVtbiB1c2luZyBlaXRoZXIgW2lzVmlzaWJsZV0gb3IgW2lzVmlzaWJsZUZuXSBiaW5kaW5ncy5cbiAgICAgKiBIZXJlIGNhbiBob29rIG9uIGFwcGxpY2F0aW9uIGxldmVsIGN1c3RvbSBtZXRob2QgdG8gZGVjaWRlIGlmIGN1cnJlbnQgaXRlbSBoYXMgZGV0YWlsIHJvd1xuICAgICAqIG9yIG5vdFxuICAgICAqXG4gICAgICogT3Igd2UgY2FuIHVzZSBpc1Zpc2libGU9dHJ1ZSB0byB0ZWxsIGFsbCByb3cgaGF2ZSBkZXRhaWwgcm93XG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93RGV0YWlsUm93KGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBpc1Zpc2libGUgPSB0aGlzLmlzVmlzaWJsZTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmlzVmlzaWJsZUZuKSkge1xuICAgICAgICAgICAgaXNWaXNpYmxlID0gdGhpcy5pc1Zpc2libGVGbi5hcHBseSh0aGlzLmR0LmNvbnRleHQsIFt0aGlzLCBpdGVtXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzVmlzaWJsZTtcbiAgICB9XG5cblxuICAgIGluaXRpYWxpemUodGFibGU6IEFXRGF0YVRhYmxlKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSh0YWJsZSk7XG5cbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSAhdGhpcy5kdC5pc091dGxpbmUoKSB8fCAhdGhpcy5kdC5waXZvdGFsTGF5b3V0O1xuICAgIH1cbn1cblxuIl19