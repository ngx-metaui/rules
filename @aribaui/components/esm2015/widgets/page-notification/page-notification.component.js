/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class PageNotificationComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
    }
    /**
     * @return {?}
     */
    notificationClass() {
        return `notification-${this.notification.type}`;
    }
    /**
     * @return {?}
     */
    notificationIcon() {
        return `ariba-icon icon-${this.notification.type}`;
    }
}
PageNotificationComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-page-notification',
                template: `<div class="page-notification">
    <div [class]="notificationClass()">
        <i [class]="notificationIcon()"></i>
        <span class="content">
              <span class="title">{{notification.title}}</span>
              <span class="description">
                    <ng-template *ngIf="notification.hasTemplate(); else description"
                                 [ngTemplateOutlet]="notification.contentTmpl">
                    </ng-template>
                    <ng-template #description>{{notification.description}}</ng-template>
              </span>
      </span>
    </div>
</div>
`,
                styles: [`.page-notification{margin:0 0 5px}.notification-error,.notification-info,.notification-success,.notification-warning{padding:9px 8px}.notification-error i,.notification-info i,.notification-success i,.notification-warning i{font-size:24px;margin:10px}.notification-success i{color:#58b957}.notification-info i{color:#199de0}.notification-warning i{color:#f90}.notification-error i{color:#c00}.notification-success{background-color:#f1f9f1;border:1px solid rgba(88,185,87,.5)}.notification-info{background-color:#edf8fd;border:1px solid rgba(25,157,224,.5)}.notification-warning{background-color:#fff8dd;border:1px solid rgba(255,153,0,.5)}.notification-error{background-color:#ffebeb;border:1px solid rgba(204,0,0,.5)}.icon-error:before{content:"\\EA9D"}.icon-warning:before{content:"\\EA9C"}.content{vertical-align:super}.title{font-weight:700;margin-right:10px}`]
            },] },
];
/** @nocollapse */
PageNotificationComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
PageNotificationComponent.propDecorators = {
    notification: [{ type: Input }]
};
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
export class PageNotification {
    /**
     * @param {?} type
     * @param {?} title
     * @param {?} description
     * @param {?=} contentTmpl
     */
    constructor(type, title, description, contentTmpl) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.contentTmpl = contentTmpl;
    }
    /**
     * @return {?}
     */
    hasTemplate() {
        return isPresent(this.contentTmpl);
    }
    /**
     * @return {?}
     */
    toString() {
        return this.type + ', title: ' + this.title + ', description:  ' + this.description;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS1ub3RpZmljYXRpb24vcGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFGeEQsTUFBTSxnQ0FBaUMsU0FBUSxhQUFhOzs7OztJQVN4RCxZQUFzQixPQUFtQixFQUFTLEdBQWdCO1FBRTlELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZPLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFhO0tBR2pFOzs7O0lBRUQsaUJBQWlCO1FBRWIsTUFBTSxDQUFDLGdCQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ25EOzs7O0lBRUQsZ0JBQWdCO1FBRVosTUFBTSxDQUFDLG1CQUFtQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3REOzs7WUF6Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Q0FjYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxpMkJBQWkyQixDQUFDO2FBQzkyQjs7OztZQXRGa0IsVUFBVTtZQUNyQixXQUFXOzs7MkJBNEZkLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCVixNQUFNOzs7Ozs7O0lBRUYsWUFBbUIsSUFBMEIsRUFBUyxLQUFhLEVBQ2hELGFBQTRCLFdBQThCO1FBRDFELFNBQUksR0FBSixJQUFJLENBQXNCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNoRCxnQkFBVyxHQUFYLFdBQVc7UUFBaUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO0tBRTVFOzs7O0lBRUQsV0FBVztRQUVQLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3RDOzs7O0lBRUQsUUFBUTtRQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDdkY7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5cbi8qKlxuICpcbiAqIFBhZ2UtTm90aWZpY2F0aW9uIGNvbXBvbmVudCB0aGF0IGltcGxlbWVudHMgYSBub3RpZmljYXRpb24gc3lzdGVtIGZvciB0aGUgdXNlciByZWdhcmRpbmdcbiAqIHRoZSBjdXJyZW50IG9iamVjdCBoZSdzIHdvcmtpbmcgb24uIFR5cGljYWwgbm90aWZpY2F0aW9uIGFyZTpcbiAqICAgICAgU3VjY2VzcyAtIHNhdmVkLlxuICogICAgICBXYXJuaW5nIC0gU291cmNpbmcgcmVxdWVzdCByZXF1aXJlcyAzIHN1cHBsaWVycy5cbiAqICAgICAgRXJyb3IgICAtIGNhbm5vdCBjb25uZWN0IHRvIHNlcnZlciwgY2hlY2sgaW50ZXJuZXQgY29ubmVjdGlvbi5cbiAqXG4gKlxuICpcbiAqIFVzYWdlIDE6ICBBcyBwYXJ0IG9mIHBhZ2Ugd3JhcHBlci5cbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ015UGFnZScgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqICAgICAgIDxhdy1vYmplY3QtcGFnZS13cmFwcGVyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIFt0aXRsZV09XCJNeVBhZ2VcIlxuICogICAgICAgICAgICAgICAgICAgICAgICBbb2JqZWN0VHlwZV09XCJNeVR5cGVcIlxuICogICAgICAgICAgICAgICAgICAgICAgICBbbm90aWZpY2F0aW9uXT1cInBhZ2VOb3RpZmljYXRpb25cIj5cbiAqICAgICAgICAgICAgIHBhZ2UgY29udGVudFxuICogICAgICAgICAgYFxuICogICAgICAgPC9hdy1vYmplY3QtcGFnZXItd3JhcHBlcj5cbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlQYWdlXG4gKiAgICB7XG4gKlxuICogICAgICAgIHBhZ2VOb3RpZmljYXRpb246IFBhZ2VOb3RpZmljYXRpb24gPSBuZXcgUGFnZU5vdGlmaWNhdGlvbihcIndhcm5cIixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQb2xpY3kgV2FybmluZ1wiLCBcIlRoaXMgcmVxdWVzdCByZXF1aXJlcyAzIGJpZHMuXCIpO1xuICpcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICB9XG4gKiAgICB9XG4gKlxuICogVXNhZ2UgMjogZGlyZWN0bHkgaW50byB0aGUgcGFnZS5cbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ3JlZ2lzdHJhdGlvbicgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqICAgICAgPFxuICogICAgICBhdy1oZWFkZXI+PC9hdy1oZWFkZXI+XG4gKiAgICAgICAgUGFnZSBIZWFkZXJcbiAqXG4gKiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImhhc05vdGlmaWNhdGlvbnMoKVwiPlxuICogICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctMTIgdS1ub3BhZGRpbmdcIj5cbiAqICAgICAgICAgICAgPGF3LXBhZ2Utbm90aWZpY2F0aW9uIFtub3RpZmljYXRpb25dPVwibm90aWZpY2F0aW9uXCI+PC9hdy1wYWdlLW5vdGlmaWNhdGlvbj5cbiAqICAgICAgICAgIDwvZGl2PlxuICogICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICogICAgICA8YXctZm9vdGVyPjwvYXctZm9vdGVyPlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VcbiAqICAgIHtcbiAqXG4gKiAgICAgICAgbm90aWZpY2F0aW9uOiBQYWdlTm90aWZpY2F0aW9uID0gbmV3IFBhZ2VOb3RpZmljYXRpb24oXCJ3YXJuaW5nXCIsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUG9saWN5IFdhcm5pbmdcIiwgXCJUaGlzIHJlcXVlc3QgcmVxdWlyZXMgMyBiaWRzLlwiKTtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICogICAgfVxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1wYWdlLW5vdGlmaWNhdGlvbicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFnZS1ub3RpZmljYXRpb25cIj5cbiAgICA8ZGl2IFtjbGFzc109XCJub3RpZmljYXRpb25DbGFzcygpXCI+XG4gICAgICAgIDxpIFtjbGFzc109XCJub3RpZmljYXRpb25JY29uKClcIj48L2k+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+e3tub3RpZmljYXRpb24udGl0bGV9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJub3RpZmljYXRpb24uaGFzVGVtcGxhdGUoKTsgZWxzZSBkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJub3RpZmljYXRpb24uY29udGVudFRtcGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZXNjcmlwdGlvbj57e25vdGlmaWNhdGlvbi5kZXNjcmlwdGlvbn19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2AucGFnZS1ub3RpZmljYXRpb257bWFyZ2luOjAgMCA1cHh9Lm5vdGlmaWNhdGlvbi1lcnJvciwubm90aWZpY2F0aW9uLWluZm8sLm5vdGlmaWNhdGlvbi1zdWNjZXNzLC5ub3RpZmljYXRpb24td2FybmluZ3twYWRkaW5nOjlweCA4cHh9Lm5vdGlmaWNhdGlvbi1lcnJvciBpLC5ub3RpZmljYXRpb24taW5mbyBpLC5ub3RpZmljYXRpb24tc3VjY2VzcyBpLC5ub3RpZmljYXRpb24td2FybmluZyBpe2ZvbnQtc2l6ZToyNHB4O21hcmdpbjoxMHB4fS5ub3RpZmljYXRpb24tc3VjY2VzcyBpe2NvbG9yOiM1OGI5NTd9Lm5vdGlmaWNhdGlvbi1pbmZvIGl7Y29sb3I6IzE5OWRlMH0ubm90aWZpY2F0aW9uLXdhcm5pbmcgaXtjb2xvcjojZjkwfS5ub3RpZmljYXRpb24tZXJyb3IgaXtjb2xvcjojYzAwfS5ub3RpZmljYXRpb24tc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiNmMWY5ZjE7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDg4LDE4NSw4NywuNSl9Lm5vdGlmaWNhdGlvbi1pbmZve2JhY2tncm91bmQtY29sb3I6I2VkZjhmZDtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMjUsMTU3LDIyNCwuNSl9Lm5vdGlmaWNhdGlvbi13YXJuaW5ne2JhY2tncm91bmQtY29sb3I6I2ZmZjhkZDtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMjU1LDE1MywwLC41KX0ubm90aWZpY2F0aW9uLWVycm9ye2JhY2tncm91bmQtY29sb3I6I2ZmZWJlYjtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMjA0LDAsMCwuNSl9Lmljb24tZXJyb3I6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcRUE5RFwifS5pY29uLXdhcm5pbmc6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcRUE5Q1wifS5jb250ZW50e3ZlcnRpY2FsLWFsaWduOnN1cGVyfS50aXRsZXtmb250LXdlaWdodDo3MDA7bWFyZ2luLXJpZ2h0OjEwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGFnZU5vdGlmaWNhdGlvbkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIEFueSBpbmZvLCBFcnJvciwgb3IgV2FybiBmb3IgdGhpcyBwYWdlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm90aWZpY2F0aW9uOiBQYWdlTm90aWZpY2F0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb25DbGFzcygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgbm90aWZpY2F0aW9uLSR7dGhpcy5ub3RpZmljYXRpb24udHlwZX1gO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvbkljb24oKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYGFyaWJhLWljb24gaWNvbi0ke3RoaXMubm90aWZpY2F0aW9uLnR5cGV9YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBQYWdlIE5vdGlmaWNhdGlvbiBhcmUgbWVzc2FnZXMgZm9yIHRoaXMgcGFnZSBvbmx5LiBJdCBkaXNwbGF5cyBpbiB0aGUgY2VudGVyIG9mIHRoZSBwYWdlXG4gKiByaWdodCB1bmRlciBwYWdlIHRpdGxlLiBUeXBpY2FsIHBhZ2Ugbm90aWZpY2F0aW9ucyBhcmUgJ3NhdmUgY29uZmlybWF0aW9uJyxcbiAqICdlcnJvciBkdXJpbmcgc3VibWl0Jywgd2FybmluZ3Mgb2YgZmllbGQgcmVxdWlyZW1lbnRzLCBldGMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlTm90aWZpY2F0aW9uXG57XG4gICAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IFBhZ2VOb3RpZmljYXRpb25UeXBlLCBwdWJsaWMgdGl0bGU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZywgcHVibGljIGNvbnRlbnRUbXBsPzogVGVtcGxhdGVSZWY8YW55PilcbiAgICB7XG4gICAgfVxuXG4gICAgaGFzVGVtcGxhdGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbnRlbnRUbXBsKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgKyAnLCB0aXRsZTogJyArIHRoaXMudGl0bGUgKyAnLCBkZXNjcmlwdGlvbjogICcgKyB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgUGFnZU5vdGlmaWNhdGlvblR5cGUgPSAnc3VjY2VzcycgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InO1xuIl19