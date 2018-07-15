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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZGV0YWlsLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9kZXRhaWwtcm93L2R0LWRldGFpbC1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7O0FBeUMxRCxNQUFNLDJCQUE0QixTQUFRLGtCQUFrQjs7Ozs7SUFvQnhELFlBQW1CLEdBQWdCLEVBQVMsVUFBc0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUZSLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFZOzs7Ozs7MkJBSDNDLElBQUk7S0FNMUI7Ozs7SUFHRCxRQUFROztRQUdKLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3BCOzs7Ozs7SUFPRCxrQkFBa0I7UUFFZCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzRjs7Ozs7Ozs7Ozs7O0lBWUQsYUFBYSxDQUFDLElBQVM7UUFFbkIscUJBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckU7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3BCOzs7OztJQUdELFVBQVUsQ0FBQyxLQUFrQjtRQUV6QixLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDbkU7OztZQW5HSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVCYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ1osYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUUxQjs7OztZQTFDTyxXQUFXO1lBQ1gsVUFBVTs7OzBCQWlEYixLQUFLOzBCQVNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuLi9kdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7QVdEYXRhVGFibGV9IGZyb20gJy4uLy4uL2F3LWRhdGF0YWJsZSc7XG5cblxuLyoqXG4gKlxuICogQ3VzdG9tIGNvbHVtbiBpbXBsZW1lbnRhdGlvbiB0byByZW5kZXIgZGV0YWlsIHJvdyBzcGFuaW5nIGl0cyBjb2x1bW4gYWNyb3NzIHdob2xlIHRhYmxlIHdpZHRoLlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtZGV0YWlsLWNvbHVtbicsXG4gICAgdGVtcGxhdGU6IGA8IS0tXG4gICAgUmVuZGVycyBhcHBsaWNhdGlvbiBkZWZpbmVkIGRldGFpbCBjb2x1bW4uIFRoaXMgdGVtcGxhdGUganVzdCByZW5kZXJzIGEgZGV0YWlsIHJvdyBhbmRcbiAgICBub3QgZXhwYW5zaW9uIGNvbnRyb2wuIFRoaXMgaXMgaW1wbGVtZW50ZWQgYnkgZGlmZmVyZW50IER0Q29sdW1uIGltcGxlbWVudGF0aW9uIGFuZCBpdHMgYWRkZWRcbiAgICAod2lsbCBiZSkgYWRkZWQgcHJvZ3JhbW1hdGljYWxseSBkdXJpbmcgY29sdW1uIGluaXRpYWxpemF0aW9uXG4tLT5cbjxuZy10ZW1wbGF0ZSAjcmVuZGVyaW5nVGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIGxldC1yb3dEYXRhPVwiZGF0YVwiPlxuXG4gICAgPHRyICNkZXRhaWxSb3dFbGVtZW50IGNsYXNzPVwiZHQtYm9keS1yb3cgZHQtZGV0YWlsLXJvd1wiPlxuXG4gICAgICAgIDx0ZCAqbmdJZj1cImR0Lmhhc0ludmlzaWJsZVNlbGVjdGlvbkNvbHVtbigpXCIgd2lkdGg9XCIxcHhcIj48L3RkPlxuICAgICAgICA8dGQgKm5nSWY9XCJ2aXNpYmxlTGVhZGluZ0NvbHMoKSA+IDBcIiBjb2xzcGFuPVwidmlzaWJsZUxlYWRpbmdDb2xzKClcIiB3aWR0aD1cIjFweFwiPlxuICAgICAgICAgICAgJm5ic3A7Jm5ic3A7XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImR0LnN0YXJ0T2ZGaXJzdERhdGFDb2x1bW5cIiBbY2xhc3NdPVwiZHluYW1pY0JvZHlDbGFzcyhyb3dEYXRhKVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdkdC1pcy1kZWZhdWx0IGR0LWNlbGwtZGVmJzogdHJ1ZX1cIj5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keVRlbXBsYXRlOyBjb250ZXh0OnskaW1wbGljaXQ6IHRoaXMsIHJvd0RhdGE6cm93RGF0YX1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICAgIHN0eWxlczogW2BgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFREZXRhaWxSb3dDb21wb25lbnQgZXh0ZW5kcyBEVENvbHVtbjJDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgY3VycmVudCB2aXNpYmlsaXR5IGZvciBjdXJyZW50IGRhdGEgcm93IHVzaW5nIG1ldGhvZCByZWZlcmVuY2VcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNWaXNpYmxlRm46IChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KSA9PiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIHRlbGxzIGlmIHdlIG5lZWQgdG8gcmVuZGVyIGEgbGluZSBiZXR3ZWVuIGl0ZW0gcm93IGFuZCBpdHMgZGV0YWlsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dSb3dMaW5lOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBkb21IYW5kbGVyOiBEb21IYW5kbGVyKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBkb21IYW5kbGVyKTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIGp1c3QgdG8gZ2V0IGFyb3VuZCB0aGUgY2hlY2sgaW4gcGFyZW50IGNsYXNzXG4gICAgICAgIHRoaXMua2V5ID0gJyc7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB3ZSBuZWVkIHRvIGtlZXAgc29tZSBsZWFkaW5nIFREc1xuICAgICAqXG4gICAgICovXG4gICAgdmlzaWJsZUxlYWRpbmdDb2xzKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQubnVtYmVyT2ZDb2xzQmVmb3JlRGF0YSAtICh0aGlzLmR0Lmhhc0ludmlzaWJsZVNlbGVjdGlvbkNvbHVtbigpID8gMSA6IDApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaGVjayBpZiB3ZSBjYW4gc2hvdyBkZXRhaWwgcm93L2NvbHVtbiB1c2luZyBlaXRoZXIgW2lzVmlzaWJsZV0gb3IgW2lzVmlzaWJsZUZuXSBiaW5kaW5ncy5cbiAgICAgKiBIZXJlIGNhbiBob29rIG9uIGFwcGxpY2F0aW9uIGxldmVsIGN1c3RvbSBtZXRob2QgdG8gZGVjaWRlIGlmIGN1cnJlbnQgaXRlbSBoYXMgZGV0YWlsIHJvd1xuICAgICAqIG9yIG5vdFxuICAgICAqXG4gICAgICogT3Igd2UgY2FuIHVzZSBpc1Zpc2libGU9dHJ1ZSB0byB0ZWxsIGFsbCByb3cgaGF2ZSBkZXRhaWwgcm93XG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93RGV0YWlsUm93KGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBpc1Zpc2libGUgPSB0aGlzLmlzVmlzaWJsZTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmlzVmlzaWJsZUZuKSkge1xuICAgICAgICAgICAgaXNWaXNpYmxlID0gdGhpcy5pc1Zpc2libGVGbi5hcHBseSh0aGlzLmR0LmNvbnRleHQsIFt0aGlzLCBpdGVtXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzVmlzaWJsZTtcbiAgICB9XG5cblxuICAgIGluaXRpYWxpemUodGFibGU6IEFXRGF0YVRhYmxlKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSh0YWJsZSk7XG5cbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSAhdGhpcy5kdC5pc091dGxpbmUoKSB8fCAhdGhpcy5kdC5waXZvdGFsTGF5b3V0O1xuICAgIH1cbn1cblxuIl19