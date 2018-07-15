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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS1ub3RpZmljYXRpb24vcGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0Z4RCxNQUFNLGdDQUFpQyxTQUFRLGFBQWE7Ozs7O0lBU3hELFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRk8sWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7S0FHakU7Ozs7SUFFRCxpQkFBaUI7UUFFYixNQUFNLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDbkQ7Ozs7SUFFRCxnQkFBZ0I7UUFFWixNQUFNLENBQUMsbUJBQW1CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdEQ7OztZQXpDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztDQWNiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLGkyQkFBaTJCLENBQUM7YUFDOTJCOzs7O1lBckZrQixVQUFVO1lBQ3JCLFdBQVc7OzsyQkEyRmQsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJWLE1BQU07Ozs7Ozs7SUFFRixZQUFtQixJQUEwQixFQUFTLEtBQWEsRUFDaEQsYUFBNEIsV0FBOEI7UUFEMUQsU0FBSSxHQUFKLElBQUksQ0FBc0I7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2hELGdCQUFXLEdBQVgsV0FBVztRQUFpQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7S0FFNUU7Ozs7SUFFRCxXQUFXO1FBRVAsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDdEM7Ozs7SUFFRCxRQUFRO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUN2RjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKlxuICogUGFnZS1Ob3RpZmljYXRpb24gY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyBhIG5vdGlmaWNhdGlvbiBzeXN0ZW0gZm9yIHRoZSB1c2VyIHJlZ2FyZGluZ1xuICogdGhlIGN1cnJlbnQgb2JqZWN0IGhlJ3Mgd29ya2luZyBvbi4gVHlwaWNhbCBub3RpZmljYXRpb24gYXJlOlxuICogICAgICBTdWNjZXNzIC0gc2F2ZWQuXG4gKiAgICAgIFdhcm5pbmcgLSBTb3VyY2luZyByZXF1ZXN0IHJlcXVpcmVzIDMgc3VwcGxpZXJzLlxuICogICAgICBFcnJvciAgIC0gY2Fubm90IGNvbm5lY3QgdG8gc2VydmVyLCBjaGVjayBpbnRlcm5ldCBjb25uZWN0aW9uLlxuICpcbiAqXG4gKlxuICogVXNhZ2UgMTogIEFzIHBhcnQgb2YgcGFnZSB3cmFwcGVyLlxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAnTXlQYWdlJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgPGF3LW9iamVjdC1wYWdlLXdyYXBwZXJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW3RpdGxlXT1cIk15UGFnZVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIFtvYmplY3RUeXBlXT1cIk15VHlwZVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIFtub3RpZmljYXRpb25dPVwicGFnZU5vdGlmaWNhdGlvblwiPlxuICogICAgICAgICAgICAgcGFnZSBjb250ZW50XG4gKiAgICAgICAgICBgXG4gKiAgICAgICA8L2F3LW9iamVjdC1wYWdlci13cmFwcGVyPlxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VcbiAqICAgIHtcbiAqXG4gKiAgICAgICAgcGFnZU5vdGlmaWNhdGlvbjogUGFnZU5vdGlmaWNhdGlvbiA9IG5ldyBQYWdlTm90aWZpY2F0aW9uKFwid2FyblwiLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBvbGljeSBXYXJuaW5nXCIsIFwiVGhpcyByZXF1ZXN0IHJlcXVpcmVzIDMgYmlkcy5cIik7XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqXG4gKiBVc2FnZSAyOiBkaXJlY3RseSBpbnRvIHRoZSBwYWdlLlxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAncmVnaXN0cmF0aW9uJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICA8YXctaGVhZGVyPjwvYXctaGVhZGVyPlxuICogICAgICAgIFBhZ2UgSGVhZGVyXG4gKlxuICogICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJoYXNOb3RpZmljYXRpb25zKClcIj5cbiAqICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHUtbm9wYWRkaW5nXCI+XG4gKiAgICAgICAgICAgIDxhdy1wYWdlLW5vdGlmaWNhdGlvbiBbbm90aWZpY2F0aW9uXT1cIm5vdGlmaWNhdGlvblwiPjwvYXctcGFnZS1ub3RpZmljYXRpb24+XG4gKiAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqICAgICAgPGF3LWZvb3Rlcj48L2F3LWZvb3Rlcj5cbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlQYWdlXG4gKiAgICB7XG4gKlxuICogICAgICAgIG5vdGlmaWNhdGlvbjogUGFnZU5vdGlmaWNhdGlvbiA9IG5ldyBQYWdlTm90aWZpY2F0aW9uKFwid2FybmluZ1wiLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBvbGljeSBXYXJuaW5nXCIsIFwiVGhpcyByZXF1ZXN0IHJlcXVpcmVzIDMgYmlkcy5cIik7XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcGFnZS1ub3RpZmljYXRpb24nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2Utbm90aWZpY2F0aW9uXCI+XG4gICAgPGRpdiBbY2xhc3NdPVwibm90aWZpY2F0aW9uQ2xhc3MoKVwiPlxuICAgICAgICA8aSBbY2xhc3NdPVwibm90aWZpY2F0aW9uSWNvbigpXCI+PC9pPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPnt7bm90aWZpY2F0aW9uLnRpdGxlfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwibm90aWZpY2F0aW9uLmhhc1RlbXBsYXRlKCk7IGVsc2UgZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwibm90aWZpY2F0aW9uLmNvbnRlbnRUbXBsXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVzY3JpcHRpb24+e3tub3RpZmljYXRpb24uZGVzY3JpcHRpb259fTwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLnBhZ2Utbm90aWZpY2F0aW9ue21hcmdpbjowIDAgNXB4fS5ub3RpZmljYXRpb24tZXJyb3IsLm5vdGlmaWNhdGlvbi1pbmZvLC5ub3RpZmljYXRpb24tc3VjY2Vzcywubm90aWZpY2F0aW9uLXdhcm5pbmd7cGFkZGluZzo5cHggOHB4fS5ub3RpZmljYXRpb24tZXJyb3IgaSwubm90aWZpY2F0aW9uLWluZm8gaSwubm90aWZpY2F0aW9uLXN1Y2Nlc3MgaSwubm90aWZpY2F0aW9uLXdhcm5pbmcgaXtmb250LXNpemU6MjRweDttYXJnaW46MTBweH0ubm90aWZpY2F0aW9uLXN1Y2Nlc3MgaXtjb2xvcjojNThiOTU3fS5ub3RpZmljYXRpb24taW5mbyBpe2NvbG9yOiMxOTlkZTB9Lm5vdGlmaWNhdGlvbi13YXJuaW5nIGl7Y29sb3I6I2Y5MH0ubm90aWZpY2F0aW9uLWVycm9yIGl7Y29sb3I6I2MwMH0ubm90aWZpY2F0aW9uLXN1Y2Nlc3N7YmFja2dyb3VuZC1jb2xvcjojZjFmOWYxO2JvcmRlcjoxcHggc29saWQgcmdiYSg4OCwxODUsODcsLjUpfS5ub3RpZmljYXRpb24taW5mb3tiYWNrZ3JvdW5kLWNvbG9yOiNlZGY4ZmQ7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDI1LDE1NywyMjQsLjUpfS5ub3RpZmljYXRpb24td2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiNmZmY4ZGQ7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDI1NSwxNTMsMCwuNSl9Lm5vdGlmaWNhdGlvbi1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmViZWI7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDIwNCwwLDAsLjUpfS5pY29uLWVycm9yOmJlZm9yZXtjb250ZW50OlwiXFxcXEVBOURcIn0uaWNvbi13YXJuaW5nOmJlZm9yZXtjb250ZW50OlwiXFxcXEVBOUNcIn0uY29udGVudHt2ZXJ0aWNhbC1hbGlnbjpzdXBlcn0udGl0bGV7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbi1yaWdodDoxMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VOb3RpZmljYXRpb25Db21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKiBBbnkgaW5mbywgRXJyb3IsIG9yIFdhcm4gZm9yIHRoaXMgcGFnZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG5vdGlmaWNhdGlvbjogUGFnZU5vdGlmaWNhdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG4gICAgbm90aWZpY2F0aW9uQ2xhc3MoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYG5vdGlmaWNhdGlvbi0ke3RoaXMubm90aWZpY2F0aW9uLnR5cGV9YDtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb25JY29uKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGBhcmliYS1pY29uIGljb24tJHt0aGlzLm5vdGlmaWNhdGlvbi50eXBlfWA7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUGFnZSBOb3RpZmljYXRpb24gYXJlIG1lc3NhZ2VzIGZvciB0aGlzIHBhZ2Ugb25seS4gSXQgZGlzcGxheXMgaW4gdGhlIGNlbnRlciBvZiB0aGUgcGFnZVxuICogcmlnaHQgdW5kZXIgcGFnZSB0aXRsZS4gVHlwaWNhbCBwYWdlIG5vdGlmaWNhdGlvbnMgYXJlICdzYXZlIGNvbmZpcm1hdGlvbicsXG4gKiAnZXJyb3IgZHVyaW5nIHN1Ym1pdCcsIHdhcm5pbmdzIG9mIGZpZWxkIHJlcXVpcmVtZW50cywgZXRjLlxuICovXG5leHBvcnQgY2xhc3MgUGFnZU5vdGlmaWNhdGlvblxue1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBQYWdlTm90aWZpY2F0aW9uVHlwZSwgcHVibGljIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHB1YmxpYyBjb250ZW50VG1wbD86IFRlbXBsYXRlUmVmPGFueT4pXG4gICAge1xuICAgIH1cblxuICAgIGhhc1RlbXBsYXRlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jb250ZW50VG1wbCk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlICsgJywgdGl0bGU6ICcgKyB0aGlzLnRpdGxlICsgJywgZGVzY3JpcHRpb246ICAnICsgdGhpcy5kZXNjcmlwdGlvbjtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFBhZ2VOb3RpZmljYXRpb25UeXBlID0gJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJztcbiJdfQ==