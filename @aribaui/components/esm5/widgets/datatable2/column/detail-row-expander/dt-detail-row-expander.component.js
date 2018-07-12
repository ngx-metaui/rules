/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Environment } from '@aribaui/core';
import { DomHandler } from 'primeng/primeng';
import { DTColumn2Component } from '../dt-column.component';
/**
 *
 *
 *
 *
 */
var DTDetailRowExpanderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DTDetailRowExpanderComponent, _super);
    function DTDetailRowExpanderComponent(env, domHandler) {
        var _this = _super.call(this, env, domHandler) || this;
        _this.env = env;
        _this.domHandler = domHandler;
        // we dont want to show the row/column unless application says so
        // we dont want to show the row/column unless application says so
        _this.isVisible = false;
        // default width of the selection control
        // default width of the selection control
        _this.width = '45px';
        return _this;
    }
    /**
     * @return {?}
     */
    DTDetailRowExpanderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // just to get around the check in parent class
        this.key = '';
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    DTDetailRowExpanderComponent.prototype.toggleExpansion = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        this.dt.detailRowExpansionState.toggle(item);
        event.stopPropagation();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DTDetailRowExpanderComponent.prototype.calculateStyleClass = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.dt.detailRowExpansionState.isExpanded(item) ?
            'icon-slim-arrow-down' : 'icon-slim-arrow-right';
    };
    DTDetailRowExpanderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-dt-detail-column-expand',
                    template: "<!--\n   Special column that renders expand/collapse control for detail row when detail row is enabled.\n\n   Just like for the other column it renders header section as well as body section with\n   expand control to toggle the expansion\n\n-->\n<ng-template #renderingTemplate let-isHeader let-isSubHeader=\"isSubHeader\" let-column=\"column\"\n             let-dataToRender=\"data\" let-columnIndex=\"columnIndex\" let-rowIndex=\"rowIndex\">\n\n\n    <ng-template [ngIf]=\"isHeader && !isSubHeader\">\n        <th #headerCell1 [class]=\"headerStyleClass||styleClass\"\n            class=\"dt-row-cell-expando\"\n            [ngClass]=\"{'dt-is-default dt-u-unselectable-text dt-cell-def' :true,\n                        'dt-det-row-expanded': dt.detailRowExpansionState.isExpanded(dataToRender)}\">\n        </th>\n\n    </ng-template>\n\n    <ng-template [ngIf]=\"!isHeader && !isSubHeader\">\n        <td #cell\n            class=\"dt-row-cell-expando\"\n            [ngClass]=\"{ 'dt-is-default': true,\n                    'dt-cell-def': !isCellSelectable(dataToRender),\n                    'dt-det-row-expanded': dt.detailRowExpansionState.isExpanded(dataToRender),\n                    'dt-det-row-with-ln' : dt.rowDetailColumn.showRowLine}\">\n\n            <span (click)=\"toggleExpansion($event, dataToRender)\"\n                  class=\"dt-det-row-expand sap-icon\"\n                  [ngClass]=\"calculateStyleClass(dataToRender)\">\n\n            </span>\n\n        </td>\n\n    </ng-template>\n\n\n</ng-template>\n\n",
                    styles: [".dt-row-cell-expando{width:14px;text-align:right;padding:17px 5px 17px 17px;border-right-color:transparent}.dt-row-cell-expando .dt-det-row-expand{cursor:pointer;line-height:21px}td.dt-det-row-expanded:not(.dt-det-row-with-ln),td.dt-det-row-expanded:not(.dt-det-row-with-ln)~td{border-bottom-color:transparent}"],
                    encapsulation: ViewEncapsulation.None,
                    providers: [DomHandler]
                },] },
    ];
    /** @nocollapse */
    DTDetailRowExpanderComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: DomHandler }
    ]; };
    return DTDetailRowExpanderComponent;
}(DTColumn2Component));
export { DTDetailRowExpanderComponent };
function DTDetailRowExpanderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DTDetailRowExpanderComponent.prototype.env;
    /** @type {?} */
    DTDetailRowExpanderComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZGV0YWlsLXJvdy1leHBhbmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9kZXRhaWwtcm93LWV4cGFuZGVyL2R0LWRldGFpbC1yb3ctZXhwYW5kZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQXNCLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9FLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7OztJQTBEUix3REFBa0I7SUFFaEUsc0NBQW1CLEdBQWdCLEVBQVMsVUFBc0I7UUFBbEUsWUFDSSxrQkFBTSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBT3pCO1FBUmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7UUFJOUQsQUFEQSxpRUFBaUU7UUFDakUsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7O1FBR3ZCLEFBREEseUNBQXlDO1FBQ3pDLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDOztLQUN2Qjs7OztJQUdELCtDQUFROzs7SUFBUjs7UUFFSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUVkLGlCQUFNLFFBQVEsV0FBRSxDQUFDO0tBQ3BCOzs7Ozs7SUFFRCxzREFBZTs7Ozs7SUFBZixVQUFnQixLQUFVLEVBQUUsSUFBUztRQUNqQyxJQUFJLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDM0I7Ozs7O0lBRUQsMERBQW1COzs7O0lBQW5CLFVBQW9CLElBQVM7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckQsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO0tBQ3hEOztnQkE3RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRSxnZ0RBeUNiO29CQUNHLE1BQU0sRUFBRSxDQUFDLHdUQUF3VCxDQUFDO29CQUNsVSxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUUxQjs7OztnQkEzRE8sV0FBVztnQkFDWCxVQUFVOzt1Q0F2QmxCO0VBa0ZrRCxrQkFBa0I7U0FBdkQsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhdGF0YWJsZTJDb21wb25lbnR9IGZyb20gJy4uLy4uL2RhdGF0YWJsZTIuY29tcG9uZW50JztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuXG5cbi8qKlxuICpcbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1kdC1kZXRhaWwtY29sdW1uLWV4cGFuZCcsXG4gICAgdGVtcGxhdGU6IGA8IS0tXG4gICBTcGVjaWFsIGNvbHVtbiB0aGF0IHJlbmRlcnMgZXhwYW5kL2NvbGxhcHNlIGNvbnRyb2wgZm9yIGRldGFpbCByb3cgd2hlbiBkZXRhaWwgcm93IGlzIGVuYWJsZWQuXG5cbiAgIEp1c3QgbGlrZSBmb3IgdGhlIG90aGVyIGNvbHVtbiBpdCByZW5kZXJzIGhlYWRlciBzZWN0aW9uIGFzIHdlbGwgYXMgYm9keSBzZWN0aW9uIHdpdGhcbiAgIGV4cGFuZCBjb250cm9sIHRvIHRvZ2dsZSB0aGUgZXhwYW5zaW9uXG5cbi0tPlxuPG5nLXRlbXBsYXRlICNyZW5kZXJpbmdUZW1wbGF0ZSBsZXQtaXNIZWFkZXIgbGV0LWlzU3ViSGVhZGVyPVwiaXNTdWJIZWFkZXJcIiBsZXQtY29sdW1uPVwiY29sdW1uXCJcbiAgICAgICAgICAgICBsZXQtZGF0YVRvUmVuZGVyPVwiZGF0YVwiIGxldC1jb2x1bW5JbmRleD1cImNvbHVtbkluZGV4XCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cblxuXG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzSGVhZGVyICYmICFpc1N1YkhlYWRlclwiPlxuICAgICAgICA8dGggI2hlYWRlckNlbGwxIFtjbGFzc109XCJoZWFkZXJTdHlsZUNsYXNzfHxzdHlsZUNsYXNzXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZHQtcm93LWNlbGwtZXhwYW5kb1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWlzLWRlZmF1bHQgZHQtdS11bnNlbGVjdGFibGUtdGV4dCBkdC1jZWxsLWRlZicgOnRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZHQtZGV0LXJvdy1leHBhbmRlZCc6IGR0LmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLmlzRXhwYW5kZWQoZGF0YVRvUmVuZGVyKX1cIj5cbiAgICAgICAgPC90aD5cblxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWlzSGVhZGVyICYmICFpc1N1YkhlYWRlclwiPlxuICAgICAgICA8dGQgI2NlbGxcbiAgICAgICAgICAgIGNsYXNzPVwiZHQtcm93LWNlbGwtZXhwYW5kb1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdkdC1pcy1kZWZhdWx0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ2R0LWNlbGwtZGVmJzogIWlzQ2VsbFNlbGVjdGFibGUoZGF0YVRvUmVuZGVyKSxcbiAgICAgICAgICAgICAgICAgICAgJ2R0LWRldC1yb3ctZXhwYW5kZWQnOiBkdC5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5pc0V4cGFuZGVkKGRhdGFUb1JlbmRlciksXG4gICAgICAgICAgICAgICAgICAgICdkdC1kZXQtcm93LXdpdGgtbG4nIDogZHQucm93RGV0YWlsQ29sdW1uLnNob3dSb3dMaW5lfVwiPlxuXG4gICAgICAgICAgICA8c3BhbiAoY2xpY2spPVwidG9nZ2xlRXhwYW5zaW9uKCRldmVudCwgZGF0YVRvUmVuZGVyKVwiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImR0LWRldC1yb3ctZXhwYW5kIHNhcC1pY29uXCJcbiAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImNhbGN1bGF0ZVN0eWxlQ2xhc3MoZGF0YVRvUmVuZGVyKVwiPlxuXG4gICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPC90ZD5cblxuICAgIDwvbmctdGVtcGxhdGU+XG5cblxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgICBzdHlsZXM6IFtgLmR0LXJvdy1jZWxsLWV4cGFuZG97d2lkdGg6MTRweDt0ZXh0LWFsaWduOnJpZ2h0O3BhZGRpbmc6MTdweCA1cHggMTdweCAxN3B4O2JvcmRlci1yaWdodC1jb2xvcjp0cmFuc3BhcmVudH0uZHQtcm93LWNlbGwtZXhwYW5kbyAuZHQtZGV0LXJvdy1leHBhbmR7Y3Vyc29yOnBvaW50ZXI7bGluZS1oZWlnaHQ6MjFweH10ZC5kdC1kZXQtcm93LWV4cGFuZGVkOm5vdCguZHQtZGV0LXJvdy13aXRoLWxuKSx0ZC5kdC1kZXQtcm93LWV4cGFuZGVkOm5vdCguZHQtZGV0LXJvdy13aXRoLWxuKX50ZHtib3JkZXItYm90dG9tLWNvbG9yOnRyYW5zcGFyZW50fWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl1cblxufSlcbmV4cG9ydCBjbGFzcyBEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50IGV4dGVuZHMgRFRDb2x1bW4yQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZG9tSGFuZGxlcjogRG9tSGFuZGxlcikge1xuICAgICAgICBzdXBlcihlbnYsIGRvbUhhbmRsZXIpO1xuXG4gICAgICAgIC8vIHdlIGRvbnQgd2FudCB0byBzaG93IHRoZSByb3cvY29sdW1uIHVubGVzcyBhcHBsaWNhdGlvbiBzYXlzIHNvXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB3aWR0aCBvZiB0aGUgc2VsZWN0aW9uIGNvbnRyb2xcbiAgICAgICAgdGhpcy53aWR0aCA9ICc0NXB4JztcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBqdXN0IHRvIGdldCBhcm91bmQgdGhlIGNoZWNrIGluIHBhcmVudCBjbGFzc1xuICAgICAgICB0aGlzLmtleSA9ICcnO1xuXG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRXhwYW5zaW9uKGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmR0LmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLnRvZ2dsZShpdGVtKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU3R5bGVDbGFzcyhpdGVtOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5pc0V4cGFuZGVkKGl0ZW0pID9cbiAgICAgICAgICAgICdpY29uLXNsaW0tYXJyb3ctZG93bicgOiAnaWNvbi1zbGltLWFycm93LXJpZ2h0JztcbiAgICB9XG59XG5cbiJdfQ==