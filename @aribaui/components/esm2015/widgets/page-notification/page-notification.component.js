/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                template: "<div class=\"page-notification\">\n    <div [class]=\"notificationClass()\">\n        <i [class]=\"notificationIcon()\"></i>\n        <span class=\"content\">\n              <span class=\"title\">{{notification.title}}</span>\n              <span class=\"description\">\n                    <ng-template *ngIf=\"notification.hasTemplate(); else description\"\n                                 [ngTemplateOutlet]=\"notification.contentTmpl\">\n                    </ng-template>\n                    <ng-template #description>{{notification.description}}</ng-template>\n              </span>\n      </span>\n    </div>\n</div>\n",
                styles: [".page-notification{margin:0 0 5px}.notification-error,.notification-info,.notification-success,.notification-warning{padding:9px 8px}.notification-error i,.notification-info i,.notification-success i,.notification-warning i{font-size:24px;margin:10px}.notification-success i{color:#58b957}.notification-info i{color:#199de0}.notification-warning i{color:#f90}.notification-error i{color:#c00}.notification-success{background-color:#f1f9f1;border:1px solid rgba(88,185,87,.5)}.notification-info{background-color:#edf8fd;border:1px solid rgba(25,157,224,.5)}.notification-warning{background-color:#fff8dd;border:1px solid rgba(255,153,0,.5)}.notification-error{background-color:#ffebeb;border:1px solid rgba(204,0,0,.5)}.icon-error:before{content:\"\\EA9D\"}.icon-warning:before{content:\"\\EA9C\"}.content{vertical-align:super}.title{font-weight:700;margin-right:10px}"]
            }] }
];
/** @nocollapse */
PageNotificationComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
PageNotificationComponent.propDecorators = {
    notification: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS1ub3RpZmljYXRpb24vcGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0V4RCxNQUFNLGdDQUFpQyxTQUFRLGFBQWE7Ozs7O0lBU3hELFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRk8sWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7S0FHakU7Ozs7SUFFRCxpQkFBaUI7UUFFYixNQUFNLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDbkQ7Ozs7SUFFRCxnQkFBZ0I7UUFFWixNQUFNLENBQUMsbUJBQW1CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdEQ7OztZQTNCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsK25CQUErQzs7YUFFbEQ7Ozs7WUF2RWtCLFVBQVU7WUFDckIsV0FBVzs7OzJCQTZFZCxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QlYsTUFBTTs7Ozs7OztJQUVGLFlBQW1CLElBQTBCLEVBQVMsS0FBYSxFQUNoRCxhQUE0QixXQUE4QjtRQUQxRCxTQUFJLEdBQUosSUFBSSxDQUFzQjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDaEQsZ0JBQVcsR0FBWCxXQUFXO1FBQWlCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtLQUU1RTs7OztJQUVELFdBQVc7UUFFUCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN0Qzs7OztJQUVELFFBQVE7UUFFSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3ZGO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqXG4gKiBQYWdlLU5vdGlmaWNhdGlvbiBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzIGEgbm90aWZpY2F0aW9uIHN5c3RlbSBmb3IgdGhlIHVzZXIgcmVnYXJkaW5nXG4gKiB0aGUgY3VycmVudCBvYmplY3QgaGUncyB3b3JraW5nIG9uLiBUeXBpY2FsIG5vdGlmaWNhdGlvbiBhcmU6XG4gKiAgICAgIFN1Y2Nlc3MgLSBzYXZlZC5cbiAqICAgICAgV2FybmluZyAtIFNvdXJjaW5nIHJlcXVlc3QgcmVxdWlyZXMgMyBzdXBwbGllcnMuXG4gKiAgICAgIEVycm9yICAgLSBjYW5ub3QgY29ubmVjdCB0byBzZXJ2ZXIsIGNoZWNrIGludGVybmV0IGNvbm5lY3Rpb24uXG4gKlxuICpcbiAqXG4gKiBVc2FnZSAxOiAgQXMgcGFydCBvZiBwYWdlIHdyYXBwZXIuXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdNeVBhZ2UnICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICA8YXctb2JqZWN0LXBhZ2Utd3JhcHBlclxuICogICAgICAgICAgICAgICAgICAgICAgICBbdGl0bGVdPVwiTXlQYWdlXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW29iamVjdFR5cGVdPVwiTXlUeXBlXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW25vdGlmaWNhdGlvbl09XCJwYWdlTm90aWZpY2F0aW9uXCI+XG4gKiAgICAgICAgICAgICBwYWdlIGNvbnRlbnRcbiAqICAgICAgICAgIGBcbiAqICAgICAgIDwvYXctb2JqZWN0LXBhZ2VyLXdyYXBwZXI+XG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15UGFnZVxuICogICAge1xuICpcbiAqICAgICAgICBwYWdlTm90aWZpY2F0aW9uOiBQYWdlTm90aWZpY2F0aW9uID0gbmV3IFBhZ2VOb3RpZmljYXRpb24oXCJ3YXJuXCIsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUG9saWN5IFdhcm5pbmdcIiwgXCJUaGlzIHJlcXVlc3QgcmVxdWlyZXMgMyBiaWRzLlwiKTtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICogICAgfVxuICpcbiAqIFVzYWdlIDI6IGRpcmVjdGx5IGludG8gdGhlIHBhZ2UuXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdyZWdpc3RyYXRpb24nICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgIDxhdy1oZWFkZXI+PC9hdy1oZWFkZXI+XG4gKiAgICAgICAgUGFnZSBIZWFkZXJcbiAqXG4gKiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImhhc05vdGlmaWNhdGlvbnMoKVwiPlxuICogICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctMTIgdS1ub3BhZGRpbmdcIj5cbiAqICAgICAgICAgICAgPGF3LXBhZ2Utbm90aWZpY2F0aW9uIFtub3RpZmljYXRpb25dPVwibm90aWZpY2F0aW9uXCI+PC9hdy1wYWdlLW5vdGlmaWNhdGlvbj5cbiAqICAgICAgICAgIDwvZGl2PlxuICogICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICogICAgICA8YXctZm9vdGVyPjwvYXctZm9vdGVyPlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VcbiAqICAgIHtcbiAqXG4gKiAgICAgICAgbm90aWZpY2F0aW9uOiBQYWdlTm90aWZpY2F0aW9uID0gbmV3IFBhZ2VOb3RpZmljYXRpb24oXCJ3YXJuaW5nXCIsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUG9saWN5IFdhcm5pbmdcIiwgXCJUaGlzIHJlcXVlc3QgcmVxdWlyZXMgMyBiaWRzLlwiKTtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICogICAgfVxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1wYWdlLW5vdGlmaWNhdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlLW5vdGlmaWNhdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3BhZ2Utbm90aWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGFnZU5vdGlmaWNhdGlvbkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIEFueSBpbmZvLCBFcnJvciwgb3IgV2FybiBmb3IgdGhpcyBwYWdlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm90aWZpY2F0aW9uOiBQYWdlTm90aWZpY2F0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb25DbGFzcygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgbm90aWZpY2F0aW9uLSR7dGhpcy5ub3RpZmljYXRpb24udHlwZX1gO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvbkljb24oKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYGFyaWJhLWljb24gaWNvbi0ke3RoaXMubm90aWZpY2F0aW9uLnR5cGV9YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBQYWdlIE5vdGlmaWNhdGlvbiBhcmUgbWVzc2FnZXMgZm9yIHRoaXMgcGFnZSBvbmx5LiBJdCBkaXNwbGF5cyBpbiB0aGUgY2VudGVyIG9mIHRoZSBwYWdlXG4gKiByaWdodCB1bmRlciBwYWdlIHRpdGxlLiBUeXBpY2FsIHBhZ2Ugbm90aWZpY2F0aW9ucyBhcmUgJ3NhdmUgY29uZmlybWF0aW9uJyxcbiAqICdlcnJvciBkdXJpbmcgc3VibWl0Jywgd2FybmluZ3Mgb2YgZmllbGQgcmVxdWlyZW1lbnRzLCBldGMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlTm90aWZpY2F0aW9uXG57XG4gICAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IFBhZ2VOb3RpZmljYXRpb25UeXBlLCBwdWJsaWMgdGl0bGU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZywgcHVibGljIGNvbnRlbnRUbXBsPzogVGVtcGxhdGVSZWY8YW55PilcbiAgICB7XG4gICAgfVxuXG4gICAgaGFzVGVtcGxhdGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNvbnRlbnRUbXBsKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgKyAnLCB0aXRsZTogJyArIHRoaXMudGl0bGUgKyAnLCBkZXNjcmlwdGlvbjogICcgKyB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgUGFnZU5vdGlmaWNhdGlvblR5cGUgPSAnc3VjY2VzcycgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InO1xuIl19