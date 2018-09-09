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
 * Column implementation for the Multiselection where we show checkbox control
 *
 *
 */
export class DTMultiSelectColumnComponent extends DTColumn2Component {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env, domHandler);
        this.env = env;
        this.domHandler = domHandler;
        // default width of the selection control
        this.width = '45px';
    }
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
DTMultiSelectColumnComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];
if (false) {
    /** @type {?} */
    DTMultiSelectColumnComponent.prototype.env;
    /** @type {?} */
    DTMultiSelectColumnComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtbXVsdGktc2VsZWN0LWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9tdWx0aS1zZWxlY3QvZHQtbXVsdGktc2VsZWN0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7O0FBaUIxRCxNQUFNLG1DQUFvQyxTQUFRLGtCQUFrQjs7Ozs7SUFHaEUsWUFBbUIsR0FBZ0IsRUFBUyxVQUFzQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRlIsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7O1FBSzlELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQ3ZCOzs7WUFqQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLGtxRUFBb0Q7Z0JBRXBELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7O2FBRTFCOzs7O1lBbEJPLFdBQVc7WUFDWCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKlxuICogQ29sdW1uIGltcGxlbWVudGF0aW9uIGZvciB0aGUgTXVsdGlzZWxlY3Rpb24gd2hlcmUgd2Ugc2hvdyBjaGVja2JveCBjb250cm9sXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1kdC1tdWx0aS1zZWxlY3QtY29sdW1uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2R0LW11bHRpLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkdC1tdWx0aS1zZWxlY3QtY29sdW1uLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxuXG59KVxuZXhwb3J0IGNsYXNzIERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnQgZXh0ZW5kcyBEVENvbHVtbjJDb21wb25lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZG9tSGFuZGxlcjogRG9tSGFuZGxlcilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgZG9tSGFuZGxlcik7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB3aWR0aCBvZiB0aGUgc2VsZWN0aW9uIGNvbnRyb2xcbiAgICAgICAgdGhpcy53aWR0aCA9ICc0NXB4JztcbiAgICB9XG5cbn1cblxuIl19