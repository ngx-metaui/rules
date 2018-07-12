/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
/**
 * Page actions is a wrapper for all page actions, buttons, links, menus that interacts it with the
 * page. The wrapper use the ability to position it as needed.
 */
var PageActionsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PageActionsComponent, _super);
    function PageActionsComponent(element, env) {
        var _this = _super.call(this, env) || this;
        _this.element = element;
        _this.env = env;
        return _this;
    }
    PageActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-page-actions',
                    template: "<div class=\"page-actions\">\n    <ng-content></ng-content>\n</div>\n",
                    styles: [".page-actions{text-align:right;padding-top:0;padding-right:0}"]
                },] },
    ];
    /** @nocollapse */
    PageActionsComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment }
    ]; };
    return PageActionsComponent;
}(BaseComponent));
export { PageActionsComponent };
function PageActionsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PageActionsComponent.prototype.element;
    /** @type {?} */
    PageActionsComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3BhZ2Utd3JhcHBlci9wYWdlLWFjdGlvbnMvcGFnZS1hY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7O0lBY2pCLGdEQUFhO0lBR25ELDhCQUFzQixPQUFtQixFQUFTLEdBQWdCO1FBQWxFLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFIcUIsYUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7O0tBR2pFOztnQkFkSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLHVFQUdiO29CQUNHLE1BQU0sRUFBRSxDQUFDLCtEQUErRCxDQUFDO2lCQUM1RTs7OztnQkFma0IsVUFBVTtnQkFDckIsV0FBVzs7K0JBckJuQjtFQW9DMEMsYUFBYTtTQUExQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKiBQYWdlIGFjdGlvbnMgaXMgYSB3cmFwcGVyIGZvciBhbGwgcGFnZSBhY3Rpb25zLCBidXR0b25zLCBsaW5rcywgbWVudXMgdGhhdCBpbnRlcmFjdHMgaXQgd2l0aCB0aGVcbiAqIHBhZ2UuIFRoZSB3cmFwcGVyIHVzZSB0aGUgYWJpbGl0eSB0byBwb3NpdGlvbiBpdCBhcyBuZWVkZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcGFnZS1hY3Rpb25zJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYWdlLWFjdGlvbnNcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5wYWdlLWFjdGlvbnN7dGV4dC1hbGlnbjpyaWdodDtwYWRkaW5nLXRvcDowO3BhZGRpbmctcmlnaHQ6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlQWN0aW9uc0NvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxufVxuIl19