/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class DTDetailRowExpanderComponent extends DTColumn2Component {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env, domHandler);
        this.env = env;
        this.domHandler = domHandler;
        // we dont want to show the row/column unless application says so
        this.isVisible = false;
        // default width of the selection control
        this.width = '45px';
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
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    toggleExpansion(event, item) {
        this.dt.detailRowExpansionState.toggle(item);
        event.stopPropagation();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    calculateStyleClass(item) {
        return this.dt.detailRowExpansionState.isExpanded(item) ?
            'icon-slim-arrow-down' : 'icon-slim-arrow-right';
    }
}
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
DTDetailRowExpanderComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];
if (false) {
    /** @type {?} */
    DTDetailRowExpanderComponent.prototype.env;
    /** @type {?} */
    DTDetailRowExpanderComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtZGV0YWlsLXJvdy1leHBhbmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9kZXRhaWwtcm93LWV4cGFuZGVyL2R0LWRldGFpbC1yb3ctZXhwYW5kZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7OztBQWlCMUQsTUFBTSxtQ0FBb0MsU0FBUSxrQkFBa0I7Ozs7O0lBR2hFLFlBQW1CLEdBQWdCLEVBQVMsVUFBc0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUZSLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFZOztRQUs5RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7UUFHdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDdkI7Ozs7SUFHRCxRQUFROztRQUdKLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWQsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3BCOzs7Ozs7SUFFRCxlQUFlLENBQUMsS0FBVSxFQUFFLElBQVM7UUFFakMsSUFBSSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQzNCOzs7OztJQUVELG1CQUFtQixDQUFDLElBQVM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckQsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO0tBQ3hEOzs7WUF6Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLDBnREFBb0Q7Z0JBRXBELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7O2FBRTFCOzs7O1lBbEJPLFdBQVc7WUFDWCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWR0LWRldGFpbC1jb2x1bW4tZXhwYW5kJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2R0LWRldGFpbC1yb3ctZXhwYW5kZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkdC1kZXRhaWwtcm93LWV4cGFuZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxuXG59KVxuZXhwb3J0IGNsYXNzIERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnQgZXh0ZW5kcyBEVENvbHVtbjJDb21wb25lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZG9tSGFuZGxlcjogRG9tSGFuZGxlcilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgZG9tSGFuZGxlcik7XG5cbiAgICAgICAgLy8gd2UgZG9udCB3YW50IHRvIHNob3cgdGhlIHJvdy9jb2x1bW4gdW5sZXNzIGFwcGxpY2F0aW9uIHNheXMgc29cbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcblxuICAgICAgICAvLyBkZWZhdWx0IHdpZHRoIG9mIHRoZSBzZWxlY3Rpb24gY29udHJvbFxuICAgICAgICB0aGlzLndpZHRoID0gJzQ1cHgnO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8ganVzdCB0byBnZXQgYXJvdW5kIHRoZSBjaGVjayBpbiBwYXJlbnQgY2xhc3NcbiAgICAgICAgdGhpcy5rZXkgPSAnJztcblxuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUV4cGFuc2lvbihldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmR0LmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLnRvZ2dsZShpdGVtKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU3R5bGVDbGFzcyhpdGVtOiBhbnkpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLmlzRXhwYW5kZWQoaXRlbSkgP1xuICAgICAgICAgICAgJ2ljb24tc2xpbS1hcnJvdy1kb3duJyA6ICdpY29uLXNsaW0tYXJyb3ctcmlnaHQnO1xuICAgIH1cbn1cblxuIl19