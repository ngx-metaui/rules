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
 * Column implementation for the SingleSelect where we show checkbox control
 *
 *
 */
export class DTSingleSelectColumnComponent extends DTColumn2Component {
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
DTSingleSelectColumnComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];
if (false) {
    /** @type {?} */
    DTSingleSelectColumnComponent.prototype.env;
    /** @type {?} */
    DTSingleSelectColumnComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtc2luZ2xlLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9jb2x1bW4vc2luZ2xlLXNlbGVjdC9kdC1zaW5nbGUtc2VsZWN0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7O0FBaUIxRCxNQUFNLG9DQUFxQyxTQUFRLGtCQUFrQjs7Ozs7SUFHakUsWUFBbUIsR0FBZ0IsRUFBUyxVQUFzQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRlIsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7O1FBSzlELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQ3ZCOzs7WUFqQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLGl6REFBcUQ7Z0JBRXJELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7O2FBRTFCOzs7O1lBbEJPLFdBQVc7WUFDWCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKlxuICogQ29sdW1uIGltcGxlbWVudGF0aW9uIGZvciB0aGUgU2luZ2xlU2VsZWN0IHdoZXJlIHdlIHNob3cgY2hlY2tib3ggY29udHJvbFxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtc2luZ2xlLXNlbGVjdC1jb2x1bW4nLFxuICAgIHRlbXBsYXRlVXJsOiAnZHQtc2luZ2xlLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkdC1zaW5nbGUtc2VsZWN0LWNvbHVtbi5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl1cblxufSlcbmV4cG9ydCBjbGFzcyBEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudCBleHRlbmRzIERUQ29sdW1uMkNvbXBvbmVudFxue1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBkb21IYW5kbGVyOiBEb21IYW5kbGVyKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBkb21IYW5kbGVyKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHdpZHRoIG9mIHRoZSBzZWxlY3Rpb24gY29udHJvbFxuICAgICAgICB0aGlzLndpZHRoID0gJzQ1cHgnO1xuICAgIH1cblxuXG59XG5cbiJdfQ==