/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    encapsulation: ViewEncapsulation.None,
                    providers: [DomHandler],
                    styles: [".dt-row-cell-expando{width:14px;text-align:right;padding:17px 5px 17px 17px;border-right-color:transparent}.dt-row-cell-expando .dt-det-row-expand{cursor:pointer;line-height:21px}td.dt-det-row-expanded:not(.dt-det-row-with-ln),td.dt-det-row-expanded:not(.dt-det-row-with-ln)~td{border-bottom-color:transparent}"]
                }] }
    ];
    /** @nocollapse */
    DTDetailRowExpanderComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: DomHandler }
    ]; };
    return DTDetailRowExpanderComponent;
}(DTColumn2Component));
export { DTDetailRowExpanderComponent };
if (false) {
    /** @type {?} */
    DTDetailRowExpanderComponent.prototype.env;
    /** @type {?} */
    DTDetailRowExpanderComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZGV0YWlsLXJvdy1leHBhbmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9kZXRhaWwtcm93LWV4cGFuZGVyL2R0LWRldGFpbC1yb3ctZXhwYW5kZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7O0lBaUJSLHdEQUFrQjtJQUdoRSxzQ0FBbUIsR0FBZ0IsRUFBUyxVQUFzQjtRQUFsRSxZQUVJLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FPekI7UUFUa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUFTLGdCQUFVLEdBQVYsVUFBVSxDQUFZOztRQUs5RCxBQURBLGlFQUFpRTtRQUNqRSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7UUFHdkIsQUFEQSx5Q0FBeUM7UUFDekMsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7O0tBQ3ZCOzs7O0lBR0QsK0NBQVE7OztJQUFSOztRQUdJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWQsaUJBQU0sUUFBUSxXQUFFLENBQUM7S0FDcEI7Ozs7OztJQUVELHNEQUFlOzs7OztJQUFmLFVBQWdCLEtBQVUsRUFBRSxJQUFTO1FBRWpDLElBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUMzQjs7Ozs7SUFFRCwwREFBbUI7Ozs7SUFBbkIsVUFBb0IsSUFBUztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRCxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUM7S0FDeEQ7O2dCQXpDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsMGdEQUFvRDtvQkFFcEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQzs7aUJBRTFCOzs7O2dCQWxCTyxXQUFXO2dCQUNYLFVBQVU7O3VDQXRCbEI7RUF3Q2tELGtCQUFrQjtTQUF2RCw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuLi9kdC1jb2x1bW4uY29tcG9uZW50JztcblxuXG4vKipcbiAqXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtZGV0YWlsLWNvbHVtbi1leHBhbmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnZHQtZGV0YWlsLXJvdy1leHBhbmRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2R0LWRldGFpbC1yb3ctZXhwYW5kZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFREZXRhaWxSb3dFeHBhbmRlckNvbXBvbmVudCBleHRlbmRzIERUQ29sdW1uMkNvbXBvbmVudFxue1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBkb21IYW5kbGVyOiBEb21IYW5kbGVyKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBkb21IYW5kbGVyKTtcblxuICAgICAgICAvLyB3ZSBkb250IHdhbnQgdG8gc2hvdyB0aGUgcm93L2NvbHVtbiB1bmxlc3MgYXBwbGljYXRpb24gc2F5cyBzb1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgd2lkdGggb2YgdGhlIHNlbGVjdGlvbiBjb250cm9sXG4gICAgICAgIHRoaXMud2lkdGggPSAnNDVweCc7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBqdXN0IHRvIGdldCBhcm91bmQgdGhlIGNoZWNrIGluIHBhcmVudCBjbGFzc1xuICAgICAgICB0aGlzLmtleSA9ICcnO1xuXG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRXhwYW5zaW9uKGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZHQuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUudG9nZ2xlKGl0ZW0pO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTdHlsZUNsYXNzKGl0ZW06IGFueSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuaXNFeHBhbmRlZChpdGVtKSA/XG4gICAgICAgICAgICAnaWNvbi1zbGltLWFycm93LWRvd24nIDogJ2ljb24tc2xpbS1hcnJvdy1yaWdodCc7XG4gICAgfVxufVxuXG4iXX0=