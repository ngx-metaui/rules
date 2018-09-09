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
 * Column implementation for the Multiselection where we show checkbox control
 *
 *
 */
var DTMultiSelectColumnComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DTMultiSelectColumnComponent, _super);
    function DTMultiSelectColumnComponent(env, domHandler) {
        var _this = _super.call(this, env, domHandler) || this;
        _this.env = env;
        _this.domHandler = domHandler;
        // default width of the selection control
        // default width of the selection control
        _this.width = '45px';
        return _this;
    }
    DTMultiSelectColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-dt-multi-select-column',
                    template: "<!--\n    Manages multi selection and renders checkboxes both for header in case [showSelectAll] is\n    enabled as well as each checkbox per row\n-->\n<ng-template #renderingTemplate let-isHeader let-isSubHeader=\"isSubHeader\" let-column=\"column\"\n             let-dataToRender=\"data\"\n             let-level=\"nestingLevel\"\n             let-columnIndex=\"columnIndex\"\n             let-rowIndex=\"rowIndex\">\n\n    <ng-template *ngIf=\"isHeader\" [ngTemplateOutlet]=\"colHeader\"\n                 [ngTemplateOutletContext]=\"{$implicit: isSubHeader, columnIndex:columnIndex,\n                 level:level}\">\n    </ng-template>\n\n    <ng-template *ngIf=\"!isHeader\" [ngTemplateOutlet]=\"colBody\"\n                 [ngTemplateOutletContext]=\"{$implicit: column, level:level,\n                    data:dataToRender,rowIndex:rowIndex}\">\n    </ng-template>\n</ng-template>\n\n\n<ng-template #colHeader let-isSubHeader let-columnIndex=\"columnIndex\">\n    <th [ngClass]=\"{'dt-is-default dt-u-unselectable-text dt-selection-column' :true,\n                    'dt-cell-def': true,\n                    'dt-sub-header': isSubHeader,\n                    'dt-is-hidden': !dt.showSelectionColumn}\" align=\"center\">\n\n        <ng-template [ngIf]=\"dt.showSelectAll\">\n            <aw-checkbox [type]=\"'action'\" (action)=\"dt.toggleAllColumns($event)\"\n                         [value]=\"dt.isToggleAllColumnSelected()\"\n                         [disabled]=\"dt.isToggleAllColumnDisabled()\">\n            </aw-checkbox>\n        </ng-template>\n\n        <ng-template [ngIf]=\"!dt.showSelectAll\">&nbsp;\n        </ng-template>\n    </th>\n\n</ng-template>\n\n\n<ng-template #colBody let-data=\"data\" let-rowIndex=\"rowIndex\" , let-level=\"level\">\n\n    <td #cell [class]=\"dynamicBodyClass(data)\"\n        [style.padding-left.px]=\"indentForControl(cell, level)\"\n        align=\"center\"\n        [ngClass]=\"{ 'dt-is-default dt-selection-column': true,\n        'dt-cell-def': true,\n        'dt-is-hidden': !dt.showSelectionColumn}\">\n\n        <aw-checkbox [type]=\"'action'\" [value]=\"dt.isRowSelected(data)\">\n        </aw-checkbox>\n\n    </td>\n</ng-template>\n",
                    encapsulation: ViewEncapsulation.None,
                    providers: [DomHandler],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    DTMultiSelectColumnComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: DomHandler }
    ]; };
    return DTMultiSelectColumnComponent;
}(DTColumn2Component));
export { DTMultiSelectColumnComponent };
if (false) {
    /** @type {?} */
    DTMultiSelectColumnComponent.prototype.env;
    /** @type {?} */
    DTMultiSelectColumnComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtbXVsdGktc2VsZWN0LWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9tdWx0aS1zZWxlY3QvZHQtbXVsdGktc2VsZWN0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7SUFpQlIsd0RBQWtCO0lBR2hFLHNDQUFtQixHQUFnQixFQUFTLFVBQXNCO1FBQWxFLFlBRUksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUl6QjtRQU5rQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBQVMsZ0JBQVUsR0FBVixVQUFVLENBQVk7O1FBSzlELEFBREEseUNBQXlDO1FBQ3pDLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDOztLQUN2Qjs7Z0JBakJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxrcUVBQW9EO29CQUVwRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDOztpQkFFMUI7Ozs7Z0JBbEJPLFdBQVc7Z0JBQ1gsVUFBVTs7dUNBdEJsQjtFQXdDa0Qsa0JBQWtCO1NBQXZELDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuXG5cbi8qKlxuICpcbiAqIENvbHVtbiBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIE11bHRpc2VsZWN0aW9uIHdoZXJlIHdlIHNob3cgY2hlY2tib3ggY29udHJvbFxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtbXVsdGktc2VsZWN0LWNvbHVtbicsXG4gICAgdGVtcGxhdGVVcmw6ICdkdC1tdWx0aS1zZWxlY3QtY29sdW1uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZHQtbXVsdGktc2VsZWN0LWNvbHVtbi5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl1cblxufSlcbmV4cG9ydCBjbGFzcyBEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50IGV4dGVuZHMgRFRDb2x1bW4yQ29tcG9uZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHVibGljIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIGRvbUhhbmRsZXIpO1xuXG4gICAgICAgIC8vIGRlZmF1bHQgd2lkdGggb2YgdGhlIHNlbGVjdGlvbiBjb250cm9sXG4gICAgICAgIHRoaXMud2lkdGggPSAnNDVweCc7XG4gICAgfVxuXG59XG5cbiJdfQ==