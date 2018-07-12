/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Input } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
/**
 *  This is a temporary implementation for the page header component.
 *  When the real implementation of side menu is done, PageHeaderComponent will
 *  be swaped to use it.
 *
 */
var SidenavComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SidenavComponent, _super);
    function SidenavComponent(element, env) {
        var _this = _super.call(this, env) || this;
        _this.element = element;
        _this.env = env;
        return _this;
    }
    /**
     * @return {?}
     */
    SidenavComponent.prototype.getSidenavClass = /**
     * @return {?}
     */
    function () {
        // Only show if I have items
        return (this.show && this.items) ? 'sidenav sidenav-active' : 'sidenav';
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this.show = true;
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.show = false;
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.show = !this.show;
    };
    SidenavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-sidenav',
                    template: "<div [ngClass]=\"getSidenavClass()\">\n    <div class=\"sidenav-content\">\n        <a *ngFor=\"let item of items\" [routerLink]=\"item.link\">\n            <span class=\"sidenav-icon\"><i [ngClass]=\"'sap-icon ' + item.icon\"></i></span>\n            {{item.label}}\n        </a>\n    </div>\n</div>\n",
                    styles: [".sidenav{height:100%;width:0;position:fixed;z-index:1;top:50px;left:0;background-color:#363636;overflow-x:hidden;padding-top:20px;transition:.5s}.sidenav-active{width:250px}.sidenav a{padding:8px 8px 8px 32px;text-decoration:none;font-size:16px;color:#fff;display:block;transition:.3s}.sidenav a:hover{background-color:#111}.sidenav-icon{font-size:30px;color:#ccc;margin-right:10px}"]
                },] },
    ];
    /** @nocollapse */
    SidenavComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment }
    ]; };
    SidenavComponent.propDecorators = {
        items: [{ type: Input }],
        show: [{ type: Input }]
    };
    return SidenavComponent;
}(BaseComponent));
export { SidenavComponent };
function SidenavComponent_tsickle_Closure_declarations() {
    /**
     * list of menu items
     * @type {?}
     */
    SidenavComponent.prototype.items;
    /**
     * displays the back link that navigates user to the previous page when clicked.
     * @type {?}
     */
    SidenavComponent.prototype.show;
    /** @type {?} */
    SidenavComponent.prototype.element;
    /** @type {?} */
    SidenavComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9wYWdlLXdyYXBwZXIvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7O0lBcUJyQiw0Q0FBYTtJQWMvQywwQkFBc0IsT0FBbUIsRUFBUyxHQUFnQjtRQUFsRSxZQUVJLGtCQUFNLEdBQUcsQ0FBQyxTQUNiO1FBSHFCLGFBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhOztLQUdqRTs7OztJQUVELDBDQUFlOzs7SUFBZjs7UUFHSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztLQUMzRTs7OztJQUVELCtCQUFJOzs7SUFBSjtRQUVJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOzs7O0lBRUQsZ0NBQUs7OztJQUFMO1FBRUksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7S0FDckI7Ozs7SUFFRCxpQ0FBTTs7O0lBQU47UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUMxQjs7Z0JBbkRKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLGdUQVFiO29CQUNHLE1BQU0sRUFBRSxDQUFDLGdZQUFnWSxDQUFDO2lCQUM3WTs7OztnQkF2QmtCLFVBQVU7Z0JBQ3JCLFdBQVc7Ozt3QkE0QmQsS0FBSzt1QkFNTCxLQUFLOzsyQkF2RFY7RUE0Q3NDLGFBQWE7U0FBdEMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge1BhZ2VNZW51SXRlbX0gZnJvbSAnLi4vcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogIFRoaXMgaXMgYSB0ZW1wb3JhcnkgaW1wbGVtZW50YXRpb24gZm9yIHRoZSBwYWdlIGhlYWRlciBjb21wb25lbnQuXG4gKiAgV2hlbiB0aGUgcmVhbCBpbXBsZW1lbnRhdGlvbiBvZiBzaWRlIG1lbnUgaXMgZG9uZSwgUGFnZUhlYWRlckNvbXBvbmVudCB3aWxsXG4gKiAgYmUgc3dhcGVkIHRvIHVzZSBpdC5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctc2lkZW5hdicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IFtuZ0NsYXNzXT1cImdldFNpZGVuYXZDbGFzcygpXCI+XG4gICAgPGRpdiBjbGFzcz1cInNpZGVuYXYtY29udGVudFwiPlxuICAgICAgICA8YSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiIFtyb3V0ZXJMaW5rXT1cIml0ZW0ubGlua1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzaWRlbmF2LWljb25cIj48aSBbbmdDbGFzc109XCInc2FwLWljb24gJyArIGl0ZW0uaWNvblwiPjwvaT48L3NwYW4+XG4gICAgICAgICAgICB7e2l0ZW0ubGFiZWx9fVxuICAgICAgICA8L2E+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5zaWRlbmF2e2hlaWdodDoxMDAlO3dpZHRoOjA7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxO3RvcDo1MHB4O2xlZnQ6MDtiYWNrZ3JvdW5kLWNvbG9yOiMzNjM2MzY7b3ZlcmZsb3cteDpoaWRkZW47cGFkZGluZy10b3A6MjBweDt0cmFuc2l0aW9uOi41c30uc2lkZW5hdi1hY3RpdmV7d2lkdGg6MjUwcHh9LnNpZGVuYXYgYXtwYWRkaW5nOjhweCA4cHggOHB4IDMycHg7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Zm9udC1zaXplOjE2cHg7Y29sb3I6I2ZmZjtkaXNwbGF5OmJsb2NrO3RyYW5zaXRpb246LjNzfS5zaWRlbmF2IGE6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMTExfS5zaWRlbmF2LWljb257Zm9udC1zaXplOjMwcHg7Y29sb3I6I2NjYzttYXJnaW4tcmlnaHQ6MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBTaWRlbmF2Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqIGxpc3Qgb2YgbWVudSBpdGVtc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXRlbXM6IFBhZ2VNZW51SXRlbVtdO1xuXG4gICAgLyoqXG4gICAgICogZGlzcGxheXMgdGhlIGJhY2sgbGluayB0aGF0IG5hdmlnYXRlcyB1c2VyIHRvIHRoZSBwcmV2aW91cyBwYWdlIHdoZW4gY2xpY2tlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3c6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuICAgIGdldFNpZGVuYXZDbGFzcygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIC8vIE9ubHkgc2hvdyBpZiBJIGhhdmUgaXRlbXNcbiAgICAgICAgcmV0dXJuICh0aGlzLnNob3cgJiYgdGhpcy5pdGVtcykgPyAnc2lkZW5hdiBzaWRlbmF2LWFjdGl2ZScgOiAnc2lkZW5hdic7XG4gICAgfVxuXG4gICAgb3BlbigpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnNob3cgPSB0cnVlO1xuICAgIH1cblxuICAgIGNsb3NlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93O1xuICAgIH1cbn1cbiJdfQ==