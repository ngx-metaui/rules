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
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    providers: [DomHandler]
                },] },
    ];
    /** @nocollapse */
    DTSingleSelectColumnComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: DomHandler }
    ]; };
    return DTSingleSelectColumnComponent;
}(DTColumn2Component));
export { DTSingleSelectColumnComponent };
function DTSingleSelectColumnComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DTSingleSelectColumnComponent.prototype.env;
    /** @type {?} */
    DTSingleSelectColumnComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtc2luZ2xlLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9jb2x1bW4vc2luZ2xlLXNlbGVjdC9kdC1zaW5nbGUtc2VsZWN0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBa0MsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFM0YsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7O0lBK0RQLHlEQUFrQjtJQUdqRSx1Q0FBbUIsR0FBZ0IsRUFBUyxVQUFzQjtRQUFsRSxZQUVJLGtCQUFNLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FJekI7UUFOa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUFTLGdCQUFVLEdBQVYsVUFBVSxDQUFZOztRQUs5RCxBQURBLHlDQUF5QztRQUN6QyxLQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzs7S0FDdkI7O2dCQS9ESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFLHV5REE4Q2I7b0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNaLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBRTFCOzs7O2dCQWhFTyxXQUFXO2dCQUNYLFVBQVU7O3dDQXZCbEI7RUF1Rm1ELGtCQUFrQjtTQUF4RCw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbmplY3QsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGF0YXRhYmxlMkNvbXBvbmVudH0gZnJvbSAnLi4vLi4vZGF0YXRhYmxlMi5jb21wb25lbnQnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKlxuICogQ29sdW1uIGltcGxlbWVudGF0aW9uIGZvciB0aGUgU2luZ2xlU2VsZWN0IHdoZXJlIHdlIHNob3cgY2hlY2tib3ggY29udHJvbFxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtc2luZ2xlLXNlbGVjdC1jb2x1bW4nLFxuICAgIHRlbXBsYXRlOiBgPCEtLVxuICAgIE1hbmFnZXMgbXVsdGkgc2VsZWN0aW9uIGFuZCByZW5kZXJzIGNoZWNrYm94ZXMgYm90aCBmb3IgaGVhZGVyIGluIGNhc2UgW3Nob3dTZWxlY3RBbGxdIGlzXG4gICAgZW5hYmxlZCBhcyB3ZWxsIGFzIGVhY2ggY2hlY2tib3ggcGVyIHJvd1xuLS0+XG48bmctdGVtcGxhdGUgI3JlbmRlcmluZ1RlbXBsYXRlIGxldC1pc0hlYWRlciBsZXQtaXNTdWJIZWFkZXI9XCJpc1N1YkhlYWRlclwiIGxldC1jb2x1bW49XCJjb2x1bW5cIlxuICAgICAgICAgICAgIGxldC1kYXRhVG9SZW5kZXI9XCJkYXRhXCJcbiAgICAgICAgICAgICBsZXQtbGV2ZWw9XCJuZXN0aW5nTGV2ZWxcIlxuICAgICAgICAgICAgIGxldC1jb2x1bW5JbmRleD1cImNvbHVtbkluZGV4XCJcbiAgICAgICAgICAgICBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiPlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiaXNIZWFkZXJcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2xIZWFkZXJcIlxuICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyRpbXBsaWNpdDogaXNTdWJIZWFkZXIsIGNvbHVtbkluZGV4OmNvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgICBsZXZlbDpsZXZlbH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiIWlzSGVhZGVyXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sQm9keVwiXG4gICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7JGltcGxpY2l0OiBjb2x1bW4sIGxldmVsOmxldmVsLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOmRhdGFUb1JlbmRlcixyb3dJbmRleDpyb3dJbmRleH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI2NvbEhlYWRlciBsZXQtaXNTdWJIZWFkZXIgbGV0LWNvbHVtbkluZGV4PVwiY29sdW1uSW5kZXhcIj5cbiAgICA8dGggW25nQ2xhc3NdPVwieydkdC1pcy1kZWZhdWx0IGR0LXUtdW5zZWxlY3RhYmxlLXRleHQgZHQtc2VsZWN0aW9uLWNvbHVtbicgOnRydWUsXG4gICAgICAgICAgICAgICAgICAgICdkdC1jZWxsLWRlZic6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICdkdC1zdWItaGVhZGVyJzogaXNTdWJIZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgICdkdC1pcy1oaWRkZW4nOiAhZHQuc2hvd1NlbGVjdGlvbkNvbHVtbn1cIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAmbmJzcDtcbiAgICA8L3RoPlxuXG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjY29sQm9keSBsZXQtZGF0YT1cImRhdGFcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiICwgbGV0LWxldmVsPVwibGV2ZWxcIj5cblxuICAgIDx0ZCAjY2VsbCBbY2xhc3NdPVwiZHluYW1pY0JvZHlDbGFzcyhkYXRhKVwiXG4gICAgICAgIFtzdHlsZS5wYWRkaW5nLWxlZnQucHhdPVwiaW5kZW50Rm9yQ29udHJvbChjZWxsLCBsZXZlbClcIlxuICAgICAgICBhbGlnbj1cImNlbnRlclwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ2R0LWlzLWRlZmF1bHQgZHQtc2VsZWN0aW9uLWNvbHVtbic6IHRydWUsXG4gICAgICAgICdkdC1jZWxsLWRlZic6IHRydWUsXG4gICAgICAgICdkdC1pcy1oaWRkZW4nOiAhZHQuc2hvd1NlbGVjdGlvbkNvbHVtbn1cIj5cblxuICAgICAgICA8YXctcmFkaW9idXR0b24gW25hbWVdPVwiJ0RUUmFkaW8nXCIgW3ZhbHVlXT1cImRhdGFcIiBbKG5nTW9kZWwpXT1cImR0LmRhdGFTb3VyY2Uuc3RhdGUuc2VsZWN0aW9uXCI+XG4gICAgICAgIDwvYXctcmFkaW9idXR0b24+XG4gICAgPC90ZD5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICAgIHN0eWxlczogW2BgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFRTaW5nbGVTZWxlY3RDb2x1bW5Db21wb25lbnQgZXh0ZW5kcyBEVENvbHVtbjJDb21wb25lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZG9tSGFuZGxlcjogRG9tSGFuZGxlcilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgZG9tSGFuZGxlcik7XG5cbiAgICAgICAgLy8gZGVmYXVsdCB3aWR0aCBvZiB0aGUgc2VsZWN0aW9uIGNvbnRyb2xcbiAgICAgICAgdGhpcy53aWR0aCA9ICc0NXB4JztcbiAgICB9XG5cblxufVxuXG4iXX0=