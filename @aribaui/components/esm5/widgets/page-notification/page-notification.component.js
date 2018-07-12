/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
 *      <
 *      aw-header></aw-header>
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
                },] },
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
function PageNotificationComponent_tsickle_Closure_declarations() {
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
function PageNotification_tsickle_Closure_declarations() {
    /** @type {?} */
    PageNotification.prototype.type;
    /** @type {?} */
    PageNotification.prototype.title;
    /** @type {?} */
    PageNotification.prototype.description;
    /** @type {?} */
    PageNotification.prototype.contentTmpl;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS1ub3RpZmljYXRpb24vcGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFjLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUZULHFEQUFhO0lBU3hELG1DQUFzQixPQUFtQixFQUFTLEdBQWdCO1FBQWxFLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFIcUIsYUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7O0tBR2pFOzs7O0lBRUQscURBQWlCOzs7SUFBakI7UUFFSSxNQUFNLENBQUMsa0JBQWdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBTSxDQUFDO0tBQ25EOzs7O0lBRUQsb0RBQWdCOzs7SUFBaEI7UUFFSSxNQUFNLENBQUMscUJBQW1CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBTSxDQUFDO0tBQ3REOztnQkF6Q0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSxxbkJBY2I7b0JBQ0csTUFBTSxFQUFFLENBQUMscTJCQUFpMkIsQ0FBQztpQkFDOTJCOzs7O2dCQXRGa0IsVUFBVTtnQkFDckIsV0FBVzs7OytCQTRGZCxLQUFLOztvQ0E3RlY7RUF1RitDLGFBQWE7U0FBL0MseUJBQXlCOzs7Ozs7Ozs7Ozs7Ozs7OztBQStCdEM7Ozs7O0FBQUE7SUFFSSwwQkFBbUIsSUFBMEIsRUFBUyxLQUFhLEVBQ2hELGFBQTRCLFdBQThCO1FBRDFELFNBQUksR0FBSixJQUFJLENBQXNCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNoRCxnQkFBVyxHQUFYLFdBQVc7UUFBaUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO0tBRTVFOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBRUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDdEM7Ozs7SUFFRCxtQ0FBUTs7O0lBQVI7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3ZGOzJCQXJJTDtJQXNJQyxDQUFBOzs7Ozs7QUFoQkQsNEJBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKlxuICogUGFnZS1Ob3RpZmljYXRpb24gY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyBhIG5vdGlmaWNhdGlvbiBzeXN0ZW0gZm9yIHRoZSB1c2VyIHJlZ2FyZGluZ1xuICogdGhlIGN1cnJlbnQgb2JqZWN0IGhlJ3Mgd29ya2luZyBvbi4gVHlwaWNhbCBub3RpZmljYXRpb24gYXJlOlxuICogICAgICBTdWNjZXNzIC0gc2F2ZWQuXG4gKiAgICAgIFdhcm5pbmcgLSBTb3VyY2luZyByZXF1ZXN0IHJlcXVpcmVzIDMgc3VwcGxpZXJzLlxuICogICAgICBFcnJvciAgIC0gY2Fubm90IGNvbm5lY3QgdG8gc2VydmVyLCBjaGVjayBpbnRlcm5ldCBjb25uZWN0aW9uLlxuICpcbiAqXG4gKlxuICogVXNhZ2UgMTogIEFzIHBhcnQgb2YgcGFnZSB3cmFwcGVyLlxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAnTXlQYWdlJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgPGF3LW9iamVjdC1wYWdlLXdyYXBwZXJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW3RpdGxlXT1cIk15UGFnZVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIFtvYmplY3RUeXBlXT1cIk15VHlwZVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIFtub3RpZmljYXRpb25dPVwicGFnZU5vdGlmaWNhdGlvblwiPlxuICogICAgICAgICAgICAgcGFnZSBjb250ZW50XG4gKiAgICAgICAgICBgXG4gKiAgICAgICA8L2F3LW9iamVjdC1wYWdlci13cmFwcGVyPlxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VcbiAqICAgIHtcbiAqXG4gKiAgICAgICAgcGFnZU5vdGlmaWNhdGlvbjogUGFnZU5vdGlmaWNhdGlvbiA9IG5ldyBQYWdlTm90aWZpY2F0aW9uKFwid2FyblwiLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBvbGljeSBXYXJuaW5nXCIsIFwiVGhpcyByZXF1ZXN0IHJlcXVpcmVzIDMgYmlkcy5cIik7XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqXG4gKiBVc2FnZSAyOiBkaXJlY3RseSBpbnRvIHRoZSBwYWdlLlxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAncmVnaXN0cmF0aW9uJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICA8XG4gKiAgICAgIGF3LWhlYWRlcj48L2F3LWhlYWRlcj5cbiAqICAgICAgICBQYWdlIEhlYWRlclxuICpcbiAqICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaGFzTm90aWZpY2F0aW9ucygpXCI+XG4gKiAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy0xMiB1LW5vcGFkZGluZ1wiPlxuICogICAgICAgICAgICA8YXctcGFnZS1ub3RpZmljYXRpb24gW25vdGlmaWNhdGlvbl09XCJub3RpZmljYXRpb25cIj48L2F3LXBhZ2Utbm90aWZpY2F0aW9uPlxuICogICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqXG4gKiAgICAgIDxhdy1mb290ZXI+PC9hdy1mb290ZXI+XG4gKiAgICBgXG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15UGFnZVxuICogICAge1xuICpcbiAqICAgICAgICBub3RpZmljYXRpb246IFBhZ2VOb3RpZmljYXRpb24gPSBuZXcgUGFnZU5vdGlmaWNhdGlvbihcIndhcm5pbmdcIixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQb2xpY3kgV2FybmluZ1wiLCBcIlRoaXMgcmVxdWVzdCByZXF1aXJlcyAzIGJpZHMuXCIpO1xuICpcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICB9XG4gKiAgICB9XG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXBhZ2Utbm90aWZpY2F0aW9uJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYWdlLW5vdGlmaWNhdGlvblwiPlxuICAgIDxkaXYgW2NsYXNzXT1cIm5vdGlmaWNhdGlvbkNsYXNzKClcIj5cbiAgICAgICAgPGkgW2NsYXNzXT1cIm5vdGlmaWNhdGlvbkljb24oKVwiPjwvaT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj57e25vdGlmaWNhdGlvbi50aXRsZX19PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cIm5vdGlmaWNhdGlvbi5oYXNUZW1wbGF0ZSgpOyBlbHNlIGRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm5vdGlmaWNhdGlvbi5jb250ZW50VG1wbFwiPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2Rlc2NyaXB0aW9uPnt7bm90aWZpY2F0aW9uLmRlc2NyaXB0aW9ufX08L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5wYWdlLW5vdGlmaWNhdGlvbnttYXJnaW46MCAwIDVweH0ubm90aWZpY2F0aW9uLWVycm9yLC5ub3RpZmljYXRpb24taW5mbywubm90aWZpY2F0aW9uLXN1Y2Nlc3MsLm5vdGlmaWNhdGlvbi13YXJuaW5ne3BhZGRpbmc6OXB4IDhweH0ubm90aWZpY2F0aW9uLWVycm9yIGksLm5vdGlmaWNhdGlvbi1pbmZvIGksLm5vdGlmaWNhdGlvbi1zdWNjZXNzIGksLm5vdGlmaWNhdGlvbi13YXJuaW5nIGl7Zm9udC1zaXplOjI0cHg7bWFyZ2luOjEwcHh9Lm5vdGlmaWNhdGlvbi1zdWNjZXNzIGl7Y29sb3I6IzU4Yjk1N30ubm90aWZpY2F0aW9uLWluZm8gaXtjb2xvcjojMTk5ZGUwfS5ub3RpZmljYXRpb24td2FybmluZyBpe2NvbG9yOiNmOTB9Lm5vdGlmaWNhdGlvbi1lcnJvciBpe2NvbG9yOiNjMDB9Lm5vdGlmaWNhdGlvbi1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6I2YxZjlmMTtib3JkZXI6MXB4IHNvbGlkIHJnYmEoODgsMTg1LDg3LC41KX0ubm90aWZpY2F0aW9uLWluZm97YmFja2dyb3VuZC1jb2xvcjojZWRmOGZkO2JvcmRlcjoxcHggc29saWQgcmdiYSgyNSwxNTcsMjI0LC41KX0ubm90aWZpY2F0aW9uLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjojZmZmOGRkO2JvcmRlcjoxcHggc29saWQgcmdiYSgyNTUsMTUzLDAsLjUpfS5ub3RpZmljYXRpb24tZXJyb3J7YmFja2dyb3VuZC1jb2xvcjojZmZlYmViO2JvcmRlcjoxcHggc29saWQgcmdiYSgyMDQsMCwwLC41KX0uaWNvbi1lcnJvcjpiZWZvcmV7Y29udGVudDpcIlxcXFxFQTlEXCJ9Lmljb24td2FybmluZzpiZWZvcmV7Y29udGVudDpcIlxcXFxFQTlDXCJ9LmNvbnRlbnR7dmVydGljYWwtYWxpZ246c3VwZXJ9LnRpdGxle2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW4tcmlnaHQ6MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlTm90aWZpY2F0aW9uQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogQW55IGluZm8sIEVycm9yLCBvciBXYXJuIGZvciB0aGlzIHBhZ2UuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBub3RpZmljYXRpb246IFBhZ2VOb3RpZmljYXRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvbkNsYXNzKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGBub3RpZmljYXRpb24tJHt0aGlzLm5vdGlmaWNhdGlvbi50eXBlfWA7XG4gICAgfVxuXG4gICAgbm90aWZpY2F0aW9uSWNvbigpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgYXJpYmEtaWNvbiBpY29uLSR7dGhpcy5ub3RpZmljYXRpb24udHlwZX1gO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFBhZ2UgTm90aWZpY2F0aW9uIGFyZSBtZXNzYWdlcyBmb3IgdGhpcyBwYWdlIG9ubHkuIEl0IGRpc3BsYXlzIGluIHRoZSBjZW50ZXIgb2YgdGhlIHBhZ2VcbiAqIHJpZ2h0IHVuZGVyIHBhZ2UgdGl0bGUuIFR5cGljYWwgcGFnZSBub3RpZmljYXRpb25zIGFyZSAnc2F2ZSBjb25maXJtYXRpb24nLFxuICogJ2Vycm9yIGR1cmluZyBzdWJtaXQnLCB3YXJuaW5ncyBvZiBmaWVsZCByZXF1aXJlbWVudHMsIGV0Yy5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2VOb3RpZmljYXRpb25cbntcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogUGFnZU5vdGlmaWNhdGlvblR5cGUsIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLCBwdWJsaWMgY29udGVudFRtcGw/OiBUZW1wbGF0ZVJlZjxhbnk+KVxuICAgIHtcbiAgICB9XG5cbiAgICBoYXNUZW1wbGF0ZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuY29udGVudFRtcGwpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZSArICcsIHRpdGxlOiAnICsgdGhpcy50aXRsZSArICcsIGRlc2NyaXB0aW9uOiAgJyArIHRoaXMuZGVzY3JpcHRpb247XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBQYWdlTm90aWZpY2F0aW9uVHlwZSA9ICdzdWNjZXNzJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcic7XG4iXX0=