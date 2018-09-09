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
 * Column implementation for the SingleSelect where we show checkbox control
 *
 *
 */
var DTSingleSelectColumnComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DTSingleSelectColumnComponent, _super);
    function DTSingleSelectColumnComponent(env, domHandler) {
        var _this = _super.call(this, env, domHandler) || this;
        _this.env = env;
        _this.domHandler = domHandler;
        // default width of the selection control
        // default width of the selection control
        _this.width = '45px';
        return _this;
    }
    DTSingleSelectColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-dt-single-select-column',
                    template: "<!--\n    Manages multi selection and renders checkboxes both for header in case [showSelectAll] is\n    enabled as well as each checkbox per row\n-->\n<ng-template #renderingTemplate let-isHeader let-isSubHeader=\"isSubHeader\" let-column=\"column\"\n             let-dataToRender=\"data\"\n             let-level=\"nestingLevel\"\n             let-columnIndex=\"columnIndex\"\n             let-rowIndex=\"rowIndex\">\n\n    <ng-template *ngIf=\"isHeader\" [ngTemplateOutlet]=\"colHeader\"\n                 [ngTemplateOutletContext]=\"{$implicit: isSubHeader, columnIndex:columnIndex,\n                 level:level}\">\n    </ng-template>\n\n    <ng-template *ngIf=\"!isHeader\" [ngTemplateOutlet]=\"colBody\"\n                 [ngTemplateOutletContext]=\"{$implicit: column, level:level,\n                    data:dataToRender,rowIndex:rowIndex}\">\n    </ng-template>\n</ng-template>\n\n\n<ng-template #colHeader let-isSubHeader let-columnIndex=\"columnIndex\">\n    <th [ngClass]=\"{'dt-is-default dt-u-unselectable-text dt-selection-column' :true,\n                    'dt-cell-def': true,\n                    'dt-sub-header': isSubHeader,\n                    'dt-is-hidden': !dt.showSelectionColumn}\" align=\"center\">\n        &nbsp;\n    </th>\n\n</ng-template>\n\n\n<ng-template #colBody let-data=\"data\" let-rowIndex=\"rowIndex\" , let-level=\"level\">\n\n    <td #cell [class]=\"dynamicBodyClass(data)\"\n        [style.padding-left.px]=\"indentForControl(cell, level)\"\n        align=\"center\"\n        [ngClass]=\"{ 'dt-is-default dt-selection-column': true,\n        'dt-cell-def': true,\n        'dt-is-hidden': !dt.showSelectionColumn}\">\n\n        <aw-radiobutton [name]=\"'DTRadio'\" [value]=\"data\" [(ngModel)]=\"dt.dataSource.state.selection\">\n        </aw-radiobutton>\n    </td>\n</ng-template>\n",
                    encapsulation: ViewEncapsulation.None,
                    providers: [DomHandler],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    DTSingleSelectColumnComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: DomHandler }
    ]; };
    return DTSingleSelectColumnComponent;
}(DTColumn2Component));
export { DTSingleSelectColumnComponent };
if (false) {
    /** @type {?} */
    DTSingleSelectColumnComponent.prototype.env;
    /** @type {?} */
    DTSingleSelectColumnComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtc2luZ2xlLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9jb2x1bW4vc2luZ2xlLXNlbGVjdC9kdC1zaW5nbGUtc2VsZWN0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7SUFpQlAseURBQWtCO0lBR2pFLHVDQUFtQixHQUFnQixFQUFTLFVBQXNCO1FBQWxFLFlBRUksa0JBQU0sR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUl6QjtRQU5rQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBQVMsZ0JBQVUsR0FBVixVQUFVLENBQVk7O1FBSzlELEFBREEseUNBQXlDO1FBQ3pDLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDOztLQUN2Qjs7Z0JBakJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxpekRBQXFEO29CQUVyRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDOztpQkFFMUI7Ozs7Z0JBbEJPLFdBQVc7Z0JBQ1gsVUFBVTs7d0NBdEJsQjtFQXdDbUQsa0JBQWtCO1NBQXhELDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuXG5cbi8qKlxuICpcbiAqIENvbHVtbiBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIFNpbmdsZVNlbGVjdCB3aGVyZSB3ZSBzaG93IGNoZWNrYm94IGNvbnRyb2xcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWR0LXNpbmdsZS1zZWxlY3QtY29sdW1uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2R0LXNpbmdsZS1zZWxlY3QtY29sdW1uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZHQtc2luZ2xlLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFRTaW5nbGVTZWxlY3RDb2x1bW5Db21wb25lbnQgZXh0ZW5kcyBEVENvbHVtbjJDb21wb25lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZG9tSGFuZGxlcjogRG9tSGFuZGxlcilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgZG9tSGFuZGxlcik7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB3aWR0aCBvZiB0aGUgc2VsZWN0aW9uIGNvbnRyb2xcbiAgICAgICAgdGhpcy53aWR0aCA9ICc0NXB4JztcbiAgICB9XG5cblxufVxuXG4iXX0=