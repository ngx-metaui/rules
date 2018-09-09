/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { BaseComponent } from '@aribaui/components';
import { Environment, isPresent } from '@aribaui/core';
import { ActivatedRoute } from '@angular/router';
import { UIMeta } from '../../core/uimeta';
/**
 * Default homePage implementation for a Module. Just like on the example bellow when we define a
 * module without a homePage this MetaHomePageComponent will be used.
 *
 * ```
 *
 * \@module=Home {
 *       label:"My Home";
 *       pageTitle:"You are now on Homepage";
 *
 * \@layout=Today {
 *          after:zTop;
 *          label: "Sales Graph";
 *          component:SalesGraphComponent;
 *     }
 *  }
 *
 * ```
 * Or you can decide not to use this MetaHomePage and Provide your own e.g:
 *
 * ```
 * \@module=Products {
 *      label:"Products for Somethig";
 *      pageTitle:"You are now on Products";
 *      homePage:ProductContentComponent;
 *  }
 *
 * ```
 *
 *
 */
var MetaHomePageComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MetaHomePageComponent, _super);
    function MetaHomePageComponent(env, activatedRoute) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this.activatedRoute = activatedRoute;
        return _this;
    }
    /**
     *
     * This page is triggered by router and we expect a module to be passed in by routing
     * params
     *
     */
    /**
     *
     * This page is triggered by router and we expect a module to be passed in by routing
     * params
     *
     * @return {?}
     */
    MetaHomePageComponent.prototype.ngOnInit = /**
     *
     * This page is triggered by router and we expect a module to be passed in by routing
     * params
     *
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        /** @type {?} */
        var routeParams = this.activatedRoute.snapshot.params;
        if (isPresent(routeParams) && isPresent(routeParams[UIMeta.KeyModule])) {
            this.module = routeParams[UIMeta.KeyModule];
        }
    };
    /**
     * @return {?}
     */
    MetaHomePageComponent.prototype.hasModule = /**
     * @return {?}
     */
    function () {
        return isPresent(this.module);
    };
    MetaHomePageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'm-home-page',
                    template: "<div class=\"m-page\" *ngIf=\"hasModule()\">\n    <m-context [module]=\"module\">\n        <m-include-component></m-include-component>\n    </m-context>\n\n</div>\n\n\n",
                    styles: [".m-page{width:100%;margin:0 auto;padding:5px}.m-page:after{content:\".\";display:block;height:0;clear:both;visibility:hidden}.module-footer{clear:both}"]
                }] }
    ];
    /** @nocollapse */
    MetaHomePageComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: ActivatedRoute }
    ]; };
    MetaHomePageComponent.propDecorators = {
        module: [{ type: Input }]
    };
    return MetaHomePageComponent;
}(BaseComponent));
export { MetaHomePageComponent };
if (false) {
    /** @type {?} */
    MetaHomePageComponent.prototype.module;
    /** @type {?} */
    MetaHomePageComponent.prototype.env;
    /** @type {?} */
    MetaHomePageComponent.prototype.activatedRoute;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1ob21lLnBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtaG9tZS1wYWdlL21ldGEtaG9tZS5wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW1CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUNFLGlEQUFhO0lBTXBELCtCQUFtQixHQUFnQixFQUFVLGNBQThCO1FBQTNFLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFIa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUFVLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjs7S0FHMUU7SUFHRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCx3Q0FBUTs7Ozs7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7O1FBRWpCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQy9DO0tBQ0o7Ozs7SUFFRCx5Q0FBUzs7O0lBQVQ7UUFFSSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqQzs7Z0JBcENKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsb0xBQTRDOztpQkFFL0M7Ozs7Z0JBeENPLFdBQVc7Z0JBQ1gsY0FBYzs7O3lCQTJDakIsS0FBSzs7Z0NBakVWO0VBOEQyQyxhQUFhO1NBQTNDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuLi8uLi9jb3JlL3VpbWV0YSc7XG5cblxuLyoqXG4gKiBEZWZhdWx0IGhvbWVQYWdlIGltcGxlbWVudGF0aW9uIGZvciBhIE1vZHVsZS4gSnVzdCBsaWtlIG9uIHRoZSBleGFtcGxlIGJlbGxvdyB3aGVuIHdlIGRlZmluZSBhXG4gKiBtb2R1bGUgd2l0aG91dCBhIGhvbWVQYWdlIHRoaXMgTWV0YUhvbWVQYWdlQ29tcG9uZW50IHdpbGwgYmUgdXNlZC5cbiAqXG4gKiBgYGBcbiAqXG4gKiAgIEBtb2R1bGU9SG9tZSB7XG4gKiAgICAgICBsYWJlbDpcIk15IEhvbWVcIjtcbiAqICAgICAgIHBhZ2VUaXRsZTpcIllvdSBhcmUgbm93IG9uIEhvbWVwYWdlXCI7XG4gKlxuICogICAgICAgQGxheW91dD1Ub2RheSB7XG4gKiAgICAgICAgICBhZnRlcjp6VG9wO1xuICogICAgICAgICAgbGFiZWw6IFwiU2FsZXMgR3JhcGhcIjtcbiAqICAgICAgICAgIGNvbXBvbmVudDpTYWxlc0dyYXBoQ29tcG9uZW50O1xuICogICAgIH1cbiAqICB9XG4gKlxuICogYGBgXG4gKiBPciB5b3UgY2FuIGRlY2lkZSBub3QgdG8gdXNlIHRoaXMgTWV0YUhvbWVQYWdlIGFuZCBQcm92aWRlIHlvdXIgb3duIGUuZzpcbiAqXG4gKiBgYGBcbiAqICBAbW9kdWxlPVByb2R1Y3RzIHtcbiAqICAgICAgbGFiZWw6XCJQcm9kdWN0cyBmb3IgU29tZXRoaWdcIjtcbiAqICAgICAgcGFnZVRpdGxlOlwiWW91IGFyZSBub3cgb24gUHJvZHVjdHNcIjtcbiAqICAgICAgaG9tZVBhZ2U6UHJvZHVjdENvbnRlbnRDb21wb25lbnQ7XG4gKiAgfVxuICpcbiAqIGBgYFxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbS1ob21lLXBhZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnbWV0YS1ob21lLnBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydtZXRhLWhvbWUucGFnZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFIb21lUGFnZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIEBJbnB1dCgpXG4gICAgbW9kdWxlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIHBhZ2UgaXMgdHJpZ2dlcmVkIGJ5IHJvdXRlciBhbmQgd2UgZXhwZWN0IGEgbW9kdWxlIHRvIGJlIHBhc3NlZCBpbiBieSByb3V0aW5nXG4gICAgICogcGFyYW1zXG4gICAgICpcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIGxldCByb3V0ZVBhcmFtcyA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHJvdXRlUGFyYW1zKSAmJiBpc1ByZXNlbnQocm91dGVQYXJhbXNbVUlNZXRhLktleU1vZHVsZV0pKSB7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZSA9IHJvdXRlUGFyYW1zW1VJTWV0YS5LZXlNb2R1bGVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzTW9kdWxlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5tb2R1bGUpO1xuICAgIH1cbn1cbiJdfQ==