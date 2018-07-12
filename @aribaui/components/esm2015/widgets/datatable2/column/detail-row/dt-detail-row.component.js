/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        this.isVisible = !this.dt.isOutline() || !this.dt.pivotalLayout;
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
        let /** @type {?} */ isVisible = this.isVisible;
        if (isPresent(this.isVisibleFn)) {
            isVisible = this.isVisibleFn.apply(this.dt.context, [this, item]);
        }
        return isVisible;
    }
}
DTDetailRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-detail-column',
                template: `<!--
    Renders application defined detail column. This template just renders a detail row and
    not expansion control. This is implemented by different DtColumn implementation and its added
    (will be) added programmatically during column initialization
-->
<ng-template #renderingTemplate let-column="column" let-rowData="data">

    <tr #detailRowElement class="dt-body-row dt-detail-row">

        <td *ngIf="dt.hasInvisibleSelectionColumn()" width="1px"></td>
        <td *ngIf="visibleLeadingCols() > 0" colspan="visibleLeadingCols()" width="1px">
            &nbsp;&nbsp;
        </td>
        <td [attr.colspan]="dt.startOfFirstDataColumn" [class]="dynamicBodyClass(rowData)"
            [ngClass]="{ 'dt-is-default dt-cell-def': true}">

            <ng-container
                *ngTemplateOutlet="bodyTemplate; context:{$implicit: this, rowData:rowData}">
            </ng-container>
        </td>
    </tr>
</ng-template>

`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler]
            },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZGV0YWlsLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9kZXRhaWwtcm93L2R0LWRldGFpbC1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBc0IsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXRGLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7OztBQXdDMUQsTUFBTSwyQkFBNEIsU0FBUSxrQkFBa0I7Ozs7O0lBbUJ4RCxZQUFtQixHQUFnQixFQUFTLFVBQXNCO1FBQzlELEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFEUixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7Ozs7OzJCQUgzQyxJQUFJO0tBSzFCOzs7O0lBR0QsUUFBUTs7UUFFSixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDaEUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3BCOzs7Ozs7SUFPRCxrQkFBa0I7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzRjs7Ozs7Ozs7Ozs7O0lBWUQsYUFBYSxDQUFDLElBQVM7UUFDbkIscUJBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckU7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3BCOzs7WUF4RkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1QmI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFFMUI7Ozs7WUF6Q08sV0FBVztZQUNYLFVBQVU7OzswQkErQ2IsS0FBSzswQkFTTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRhdGFibGUyQ29tcG9uZW50fSBmcm9tICcuLi8uLi9kYXRhdGFibGUyLmNvbXBvbmVudCc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuXG5cbi8qKlxuICpcbiAqIEN1c3RvbSBjb2x1bW4gaW1wbGVtZW50YXRpb24gdG8gcmVuZGVyIGRldGFpbCByb3cgc3BhbmluZyBpdHMgY29sdW1uIGFjcm9zcyB3aG9sZSB0YWJsZSB3aWR0aC5cbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWR0LWRldGFpbC1jb2x1bW4nLFxuICAgIHRlbXBsYXRlOiBgPCEtLVxuICAgIFJlbmRlcnMgYXBwbGljYXRpb24gZGVmaW5lZCBkZXRhaWwgY29sdW1uLiBUaGlzIHRlbXBsYXRlIGp1c3QgcmVuZGVycyBhIGRldGFpbCByb3cgYW5kXG4gICAgbm90IGV4cGFuc2lvbiBjb250cm9sLiBUaGlzIGlzIGltcGxlbWVudGVkIGJ5IGRpZmZlcmVudCBEdENvbHVtbiBpbXBsZW1lbnRhdGlvbiBhbmQgaXRzIGFkZGVkXG4gICAgKHdpbGwgYmUpIGFkZGVkIHByb2dyYW1tYXRpY2FsbHkgZHVyaW5nIGNvbHVtbiBpbml0aWFsaXphdGlvblxuLS0+XG48bmctdGVtcGxhdGUgI3JlbmRlcmluZ1RlbXBsYXRlIGxldC1jb2x1bW49XCJjb2x1bW5cIiBsZXQtcm93RGF0YT1cImRhdGFcIj5cblxuICAgIDx0ciAjZGV0YWlsUm93RWxlbWVudCBjbGFzcz1cImR0LWJvZHktcm93IGR0LWRldGFpbC1yb3dcIj5cblxuICAgICAgICA8dGQgKm5nSWY9XCJkdC5oYXNJbnZpc2libGVTZWxlY3Rpb25Db2x1bW4oKVwiIHdpZHRoPVwiMXB4XCI+PC90ZD5cbiAgICAgICAgPHRkICpuZ0lmPVwidmlzaWJsZUxlYWRpbmdDb2xzKCkgPiAwXCIgY29sc3Bhbj1cInZpc2libGVMZWFkaW5nQ29scygpXCIgd2lkdGg9XCIxcHhcIj5cbiAgICAgICAgICAgICZuYnNwOyZuYnNwO1xuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJkdC5zdGFydE9mRmlyc3REYXRhQ29sdW1uXCIgW2NsYXNzXT1cImR5bmFtaWNCb2R5Q2xhc3Mocm93RGF0YSlcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAnZHQtaXMtZGVmYXVsdCBkdC1jZWxsLWRlZic6IHRydWV9XCI+XG5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlUZW1wbGF0ZTsgY29udGV4dDp7JGltcGxpY2l0OiB0aGlzLCByb3dEYXRhOnJvd0RhdGF9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC90ZD5cbiAgICA8L3RyPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgICBzdHlsZXM6IFtgYF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxuXG59KVxuZXhwb3J0IGNsYXNzIERURGV0YWlsUm93Q29tcG9uZW50IGV4dGVuZHMgRFRDb2x1bW4yQ29tcG9uZW50IHtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgY3VycmVudCB2aXNpYmlsaXR5IGZvciBjdXJyZW50IGRhdGEgcm93IHVzaW5nIG1ldGhvZCByZWZlcmVuY2VcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNWaXNpYmxlRm46IChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KSA9PiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIHRlbGxzIGlmIHdlIG5lZWQgdG8gcmVuZGVyIGEgbGluZSBiZXR3ZWVuIGl0ZW0gcm93IGFuZCBpdHMgZGV0YWlsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dSb3dMaW5lOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBkb21IYW5kbGVyOiBEb21IYW5kbGVyKSB7XG4gICAgICAgIHN1cGVyKGVudiwgZG9tSGFuZGxlcik7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8ganVzdCB0byBnZXQgYXJvdW5kIHRoZSBjaGVjayBpbiBwYXJlbnQgY2xhc3NcbiAgICAgICAgdGhpcy5rZXkgPSAnJztcblxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmR0LmlzT3V0bGluZSgpIHx8ICF0aGlzLmR0LnBpdm90YWxMYXlvdXQ7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB3ZSBuZWVkIHRvIGtlZXAgc29tZSBsZWFkaW5nIFREc1xuICAgICAqXG4gICAgICovXG4gICAgdmlzaWJsZUxlYWRpbmdDb2xzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0Lm51bWJlck9mQ29sc0JlZm9yZURhdGEgLSAodGhpcy5kdC5oYXNJbnZpc2libGVTZWxlY3Rpb25Db2x1bW4oKSA/IDEgOiAwKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2hlY2sgaWYgd2UgY2FuIHNob3cgZGV0YWlsIHJvdy9jb2x1bW4gdXNpbmcgZWl0aGVyIFtpc1Zpc2libGVdIG9yIFtpc1Zpc2libGVGbl0gYmluZGluZ3MuXG4gICAgICogSGVyZSBjYW4gaG9vayBvbiBhcHBsaWNhdGlvbiBsZXZlbCBjdXN0b20gbWV0aG9kIHRvIGRlY2lkZSBpZiBjdXJyZW50IGl0ZW0gaGFzIGRldGFpbCByb3dcbiAgICAgKiBvciBub3RcbiAgICAgKlxuICAgICAqIE9yIHdlIGNhbiB1c2UgaXNWaXNpYmxlPXRydWUgdG8gdGVsbCBhbGwgcm93IGhhdmUgZGV0YWlsIHJvd1xuICAgICAqXG4gICAgICovXG4gICAgc2hvd0RldGFpbFJvdyhpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGlzVmlzaWJsZSA9IHRoaXMuaXNWaXNpYmxlO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuaXNWaXNpYmxlRm4pKSB7XG4gICAgICAgICAgICBpc1Zpc2libGUgPSB0aGlzLmlzVmlzaWJsZUZuLmFwcGx5KHRoaXMuZHQuY29udGV4dCwgW3RoaXMsIGl0ZW1dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNWaXNpYmxlO1xuICAgIH1cblxufVxuXG4iXX0=