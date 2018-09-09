/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                }] }
    ];
    /** @nocollapse */
    PageContentComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment }
    ]; };
    return PageContentComponent;
}(BaseComponent));
export { PageContentComponent };
if (false) {
    /** @type {?} */
    PageContentComponent.prototype.element;
    /** @type {?} */
    PageContentComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3BhZ2Utd3JhcHBlci9wYWdlLWNvbnRlbnQvcGFnZS1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7OztJQVlqQixnREFBYTtJQUduRCw4QkFBc0IsT0FBbUIsRUFBUyxHQUFnQjtRQUFsRSxZQUVJLGtCQUFNLEdBQUcsQ0FBQyxTQUNiO1FBSHFCLGFBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhOztLQUdqRTs7Z0JBWEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSwyQkFBMkI7NkJBQzVCLHVDQUF1QztpQkFDbkQ7Ozs7Z0JBYmtCLFVBQVU7Z0JBQ3JCLFdBQVc7OytCQXJCbkI7RUFrQzBDLGFBQWE7U0FBMUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogUGFnZSBjb250ZW50IGlzIGEgd3JhcHBlciBmb3IgcGFnZSBjb250ZW50LlxuICogQ3VycmVudGx5LCBpdCdzIHByZXR0eSBiYXJlLCBidXQgYXMgd2UgYWRkIG1vcmUgaW50ZXJhY3Rpb25zIG9uIHRoZSBwYWdlLCBsaWtlIGEgc2lkZSBiYXIsXG4gKiB0aGUgcGFnZSBjb250ZW50IGFyZWEgd2lsbCBsaWtlbHkgZ2V0IGFmZmVjdGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXBhZ2UtY29udGVudCcsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgICBzdHlsZXM6IFsnOmhvc3Qge3dpZHRoOiAxMDAlOyBwYWRkaW5nOiAwIC41ZW07fSddXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VDb250ZW50Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG59XG4iXX0=