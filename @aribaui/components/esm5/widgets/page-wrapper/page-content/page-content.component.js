/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
/**
 * Page content is a wrapper for page content.
 * Currently, it's pretty bare, but as we add more interactions on the page, like a side bar,
 * the page content area will likely get affected.
 */
var PageContentComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PageContentComponent, _super);
    function PageContentComponent(element, env) {
        var _this = _super.call(this, env) || this;
        _this.element = element;
        _this.env = env;
        return _this;
    }
    PageContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-page-content',
                    template: '<ng-content></ng-content>',
                    styles: [':host {width: 100%; padding: 0 .5em;}']
                },] },
    ];
    /** @nocollapse */
    PageContentComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment }
    ]; };
    return PageContentComponent;
}(BaseComponent));
export { PageContentComponent };
function PageContentComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PageContentComponent.prototype.element;
    /** @type {?} */
    PageContentComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3BhZ2Utd3JhcHBlci9wYWdlLWNvbnRlbnQvcGFnZS1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7OztJQVlqQixnREFBYTtJQUduRCw4QkFBc0IsT0FBbUIsRUFBUyxHQUFnQjtRQUFsRSxZQUVJLGtCQUFNLEdBQUcsQ0FBQyxTQUNiO1FBSHFCLGFBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhOztLQUdqRTs7Z0JBWEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLE1BQU0sRUFBRSxDQUFDLHVDQUF1QyxDQUFDO2lCQUNwRDs7OztnQkFia0IsVUFBVTtnQkFDckIsV0FBVzs7K0JBckJuQjtFQWtDMEMsYUFBYTtTQUExQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKiBQYWdlIGNvbnRlbnQgaXMgYSB3cmFwcGVyIGZvciBwYWdlIGNvbnRlbnQuXG4gKiBDdXJyZW50bHksIGl0J3MgcHJldHR5IGJhcmUsIGJ1dCBhcyB3ZSBhZGQgbW9yZSBpbnRlcmFjdGlvbnMgb24gdGhlIHBhZ2UsIGxpa2UgYSBzaWRlIGJhcixcbiAqIHRoZSBwYWdlIGNvbnRlbnQgYXJlYSB3aWxsIGxpa2VseSBnZXQgYWZmZWN0ZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcGFnZS1jb250ZW50JyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlczogWyc6aG9zdCB7d2lkdGg6IDEwMCU7IHBhZGRpbmc6IDAgLjVlbTt9J11cbn0pXG5leHBvcnQgY2xhc3MgUGFnZUNvbnRlbnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cbn1cbiJdfQ==