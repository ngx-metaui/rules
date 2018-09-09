/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Input } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
/**
 *
 * Page-Notification component that implements a notification system for the user regarding
 * the current object he's working on. Typical notification are:
 *      Success - saved.
 *      Warning - Sourcing request requires 3 suppliers.
 *      Error   - cannot connect to server, check internet connection.
 *
 *
 *
 * Usage 1:  As part of page wrapper.
 *
 * \@Component({
 *    selector: 'MyPage' ,
 *    template: `
 *       <aw-object-page-wrapper
 *                        [title]="MyPage"
 *                        [objectType]="MyType"
 *                        [notification]="pageNotification">
 *             page content
 *          `
 *       </aw-object-pager-wrapper>
 *    })
 *    export class MyPage
 *    {
 *
 *        pageNotification: PageNotification = new PageNotification("warn",
 *                              "Policy Warning", "This request requires 3 bids.");
 *
 *        constructor ()
 *        {
 *        }
 *    }
 *
 * Usage 2: directly into the page.
 *
 * \@Component({
 *    selector: 'registration' ,
 *    template: `
 *      <aw-header></aw-header>
 *        Page Header
 *
 *        <ng-template [ngIf]="hasNotifications()">
 *          <div class="ui-g-12 u-nopadding">
 *            <aw-page-notification [notification]="notification"></aw-page-notification>
 *          </div>
 *        </ng-template>
 *
 *      <aw-footer></aw-footer>
 *    `
 *    })
 *    export class MyPage
 *    {
 *
 *        notification: PageNotification = new PageNotification("warning",
 *                              "Policy Warning", "This request requires 3 bids.");
 *
 *        constructor ()
 *        {
 *        }
 *    }
 *
 */
var PageNotificationComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PageNotificationComponent, _super);
    function PageNotificationComponent(element, env) {
        var _this = _super.call(this, env) || this;
        _this.element = element;
        _this.env = env;
        return _this;
    }
    /**
     * @return {?}
     */
    PageNotificationComponent.prototype.notificationClass = /**
     * @return {?}
     */
    function () {
        return "notification-" + this.notification.type;
    };
    /**
     * @return {?}
     */
    PageNotificationComponent.prototype.notificationIcon = /**
     * @return {?}
     */
    function () {
        return "ariba-icon icon-" + this.notification.type;
    };
    PageNotificationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-page-notification',
                    template: "<div class=\"page-notification\">\n    <div [class]=\"notificationClass()\">\n        <i [class]=\"notificationIcon()\"></i>\n        <span class=\"content\">\n              <span class=\"title\">{{notification.title}}</span>\n              <span class=\"description\">\n                    <ng-template *ngIf=\"notification.hasTemplate(); else description\"\n                                 [ngTemplateOutlet]=\"notification.contentTmpl\">\n                    </ng-template>\n                    <ng-template #description>{{notification.description}}</ng-template>\n              </span>\n      </span>\n    </div>\n</div>\n",
                    styles: [".page-notification{margin:0 0 5px}.notification-error,.notification-info,.notification-success,.notification-warning{padding:9px 8px}.notification-error i,.notification-info i,.notification-success i,.notification-warning i{font-size:24px;margin:10px}.notification-success i{color:#58b957}.notification-info i{color:#199de0}.notification-warning i{color:#f90}.notification-error i{color:#c00}.notification-success{background-color:#f1f9f1;border:1px solid rgba(88,185,87,.5)}.notification-info{background-color:#edf8fd;border:1px solid rgba(25,157,224,.5)}.notification-warning{background-color:#fff8dd;border:1px solid rgba(255,153,0,.5)}.notification-error{background-color:#ffebeb;border:1px solid rgba(204,0,0,.5)}.icon-error:before{content:\"\\EA9D\"}.icon-warning:before{content:\"\\EA9C\"}.content{vertical-align:super}.title{font-weight:700;margin-right:10px}"]
                }] }
    ];
    /** @nocollapse */
    PageNotificationComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment }
    ]; };
    PageNotificationComponent.propDecorators = {
        notification: [{ type: Input }]
    };
    return PageNotificationComponent;
}(BaseComponent));
export { PageNotificationComponent };
if (false) {
    /**
     * Any info, Error, or Warn for this page.
     * @type {?}
     */
    PageNotificationComponent.prototype.notification;
    /** @type {?} */
    PageNotificationComponent.prototype.element;
    /** @type {?} */
    PageNotificationComponent.prototype.env;
}
/**
 * Page Notification are messages for this page only. It displays in the center of the page
 * right under page title. Typical page notifications are 'save confirmation',
 * 'error during submit', warnings of field requirements, etc.
 */
var /**
 * Page Notification are messages for this page only. It displays in the center of the page
 * right under page title. Typical page notifications are 'save confirmation',
 * 'error during submit', warnings of field requirements, etc.
 */
PageNotification = /** @class */ (function () {
    function PageNotification(type, title, description, contentTmpl) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.contentTmpl = contentTmpl;
    }
    /**
     * @return {?}
     */
    PageNotification.prototype.hasTemplate = /**
     * @return {?}
     */
    function () {
        return isPresent(this.contentTmpl);
    };
    /**
     * @return {?}
     */
    PageNotification.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this.type + ', title: ' + this.title + ', description:  ' + this.description;
    };
    return PageNotification;
}());
/**
 * Page Notification are messages for this page only. It displays in the center of the page
 * right under page title. Typical page notifications are 'save confirmation',
 * 'error during submit', warnings of field requirements, etc.
 */
export { PageNotification };
if (false) {
    /** @type {?} */
    PageNotification.prototype.type;
    /** @type {?} */
    PageNotification.prototype.title;
    /** @type {?} */
    PageNotification.prototype.description;
    /** @type {?} */
    PageNotification.prototype.contentTmpl;
}
/** @typedef {?} */
var PageNotificationType;
export { PageNotificationType };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS1ub3RpZmljYXRpb24vcGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFjLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzRVQscURBQWE7SUFTeEQsbUNBQXNCLE9BQW1CLEVBQVMsR0FBZ0I7UUFBbEUsWUFFSSxrQkFBTSxHQUFHLENBQUMsU0FDYjtRQUhxQixhQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVMsU0FBRyxHQUFILEdBQUcsQ0FBYTs7S0FHakU7Ozs7SUFFRCxxREFBaUI7OztJQUFqQjtRQUVJLE1BQU0sQ0FBQyxrQkFBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFNLENBQUM7S0FDbkQ7Ozs7SUFFRCxvREFBZ0I7OztJQUFoQjtRQUVJLE1BQU0sQ0FBQyxxQkFBbUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFNLENBQUM7S0FDdEQ7O2dCQTNCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsK25CQUErQzs7aUJBRWxEOzs7O2dCQXZFa0IsVUFBVTtnQkFDckIsV0FBVzs7OytCQTZFZCxLQUFLOztvQ0E5RVY7RUF3RStDLGFBQWE7U0FBL0MseUJBQXlCOzs7Ozs7Ozs7Ozs7Ozs7OztBQStCdEM7Ozs7O0FBQUE7SUFFSSwwQkFBbUIsSUFBMEIsRUFBUyxLQUFhLEVBQ2hELGFBQTRCLFdBQThCO1FBRDFELFNBQUksR0FBSixJQUFJLENBQXNCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNoRCxnQkFBVyxHQUFYLFdBQVc7UUFBaUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO0tBRTVFOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBRUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDdEM7Ozs7SUFFRCxtQ0FBUTs7O0lBQVI7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3ZGOzJCQXRITDtJQXVIQyxDQUFBOzs7Ozs7QUFoQkQsNEJBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKlxuICogUGFnZS1Ob3RpZmljYXRpb24gY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyBhIG5vdGlmaWNhdGlvbiBzeXN0ZW0gZm9yIHRoZSB1c2VyIHJlZ2FyZGluZ1xuICogdGhlIGN1cnJlbnQgb2JqZWN0IGhlJ3Mgd29ya2luZyBvbi4gVHlwaWNhbCBub3RpZmljYXRpb24gYXJlOlxuICogICAgICBTdWNjZXNzIC0gc2F2ZWQuXG4gKiAgICAgIFdhcm5pbmcgLSBTb3VyY2luZyByZXF1ZXN0IHJlcXVpcmVzIDMgc3VwcGxpZXJzLlxuICogICAgICBFcnJvciAgIC0gY2Fubm90IGNvbm5lY3QgdG8gc2VydmVyLCBjaGVjayBpbnRlcm5ldCBjb25uZWN0aW9uLlxuICpcbiAqXG4gKlxuICogVXNhZ2UgMTogIEFzIHBhcnQgb2YgcGFnZSB3cmFwcGVyLlxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAnTXlQYWdlJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgPGF3LW9iamVjdC1wYWdlLXdyYXBwZXJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW3RpdGxlXT1cIk15UGFnZVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIFtvYmplY3RUeXBlXT1cIk15VHlwZVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIFtub3RpZmljYXRpb25dPVwicGFnZU5vdGlmaWNhdGlvblwiPlxuICogICAgICAgICAgICAgcGFnZSBjb250ZW50XG4gKiAgICAgICAgICBgXG4gKiAgICAgICA8L2F3LW9iamVjdC1wYWdlci13cmFwcGVyPlxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VcbiAqICAgIHtcbiAqXG4gKiAgICAgICAgcGFnZU5vdGlmaWNhdGlvbjogUGFnZU5vdGlmaWNhdGlvbiA9IG5ldyBQYWdlTm90aWZpY2F0aW9uKFwid2FyblwiLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBvbGljeSBXYXJuaW5nXCIsIFwiVGhpcyByZXF1ZXN0IHJlcXVpcmVzIDMgYmlkcy5cIik7XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqXG4gKiBVc2FnZSAyOiBkaXJlY3RseSBpbnRvIHRoZSBwYWdlLlxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAncmVnaXN0cmF0aW9uJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICA8YXctaGVhZGVyPjwvYXctaGVhZGVyPlxuICogICAgICAgIFBhZ2UgSGVhZGVyXG4gKlxuICogICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJoYXNOb3RpZmljYXRpb25zKClcIj5cbiAqICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHUtbm9wYWRkaW5nXCI+XG4gKiAgICAgICAgICAgIDxhdy1wYWdlLW5vdGlmaWNhdGlvbiBbbm90aWZpY2F0aW9uXT1cIm5vdGlmaWNhdGlvblwiPjwvYXctcGFnZS1ub3RpZmljYXRpb24+XG4gKiAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqICAgICAgPGF3LWZvb3Rlcj48L2F3LWZvb3Rlcj5cbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlQYWdlXG4gKiAgICB7XG4gKlxuICogICAgICAgIG5vdGlmaWNhdGlvbjogUGFnZU5vdGlmaWNhdGlvbiA9IG5ldyBQYWdlTm90aWZpY2F0aW9uKFwid2FybmluZ1wiLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBvbGljeSBXYXJuaW5nXCIsIFwiVGhpcyByZXF1ZXN0IHJlcXVpcmVzIDMgYmlkcy5cIik7XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcGFnZS1ub3RpZmljYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAncGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydwYWdlLW5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VOb3RpZmljYXRpb25Db21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKiBBbnkgaW5mbywgRXJyb3IsIG9yIFdhcm4gZm9yIHRoaXMgcGFnZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG5vdGlmaWNhdGlvbjogUGFnZU5vdGlmaWNhdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG4gICAgbm90aWZpY2F0aW9uQ2xhc3MoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYG5vdGlmaWNhdGlvbi0ke3RoaXMubm90aWZpY2F0aW9uLnR5cGV9YDtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb25JY29uKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGBhcmliYS1pY29uIGljb24tJHt0aGlzLm5vdGlmaWNhdGlvbi50eXBlfWA7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUGFnZSBOb3RpZmljYXRpb24gYXJlIG1lc3NhZ2VzIGZvciB0aGlzIHBhZ2Ugb25seS4gSXQgZGlzcGxheXMgaW4gdGhlIGNlbnRlciBvZiB0aGUgcGFnZVxuICogcmlnaHQgdW5kZXIgcGFnZSB0aXRsZS4gVHlwaWNhbCBwYWdlIG5vdGlmaWNhdGlvbnMgYXJlICdzYXZlIGNvbmZpcm1hdGlvbicsXG4gKiAnZXJyb3IgZHVyaW5nIHN1Ym1pdCcsIHdhcm5pbmdzIG9mIGZpZWxkIHJlcXVpcmVtZW50cywgZXRjLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZU5vdGlmaWNhdGlvblxue1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBQYWdlTm90aWZpY2F0aW9uVHlwZSwgcHVibGljIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHB1YmxpYyBjb250ZW50VG1wbD86IFRlbXBsYXRlUmVmPGFueT4pXG4gICAge1xuICAgIH1cblxuICAgIGhhc1RlbXBsYXRlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250ZW50VG1wbCk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlICsgJywgdGl0bGU6ICcgKyB0aGlzLnRpdGxlICsgJywgZGVzY3JpcHRpb246ICAnICsgdGhpcy5kZXNjcmlwdGlvbjtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFBhZ2VOb3RpZmljYXRpb25UeXBlID0gJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJztcbiJdfQ==