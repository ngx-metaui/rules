/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Environment, isPresent, RoutingService } from '@aribaui/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { BaseComponent } from '../../../core/base.component';
/**
 *
 * Header component that implements consistent styling, behavior for an Ariba page.
 * Header includes a menu, user profile, and alerts.
 *
 * \@Component({
 *    selector: 'registration' ,
 *    template: `
 *                <aw-page-header [showBackAction]="true" userName="Chad Noll"
 *                                 [menuItems]="menuItems" [notifications]="userNotifications">
 *                     <div class="page-header-center">
 *                           <a class="navbar-brand" tabindex="0" href="/">
 *                               <img class="navbar-logo" src="./images/SAP_Ariba_DB.png"
 *                                   alt="Go to homepage" data-pin-nopin="true">
 *                          </a>
 *                     </div>
 *                </aw-page-header>
 *
 *    `
 *    })
 *    export class MyPage
 *    {
 *      menuItems: PageMenuItem[] = [new PageMenuItem('icon-home', 'Home', '/play/'),
 *                                  new PageMenuItem('icon-expense-report', 'Reports',
 *                                                     '/play/pageheader'),
 *                                  new PageMenuItem('icon-sales-order', 'Purchase Order',
 *                                                       '/play/pageheader'),
 *                                  new PageMenuItem('icon-account', 'Accounts',
 *                                                     '/play/pageheader')];
 *
 *     userNotifications: UserNotification[] = [
 *       new UserNotification('icon-expense-report', 'Expense report EXP453 has been approved.',
 *                             '/play/'),
 *         new UserNotification('icon-sales-order', 'Sales Order SO1234 has been created.',
 *                             '/play/'),
 *           new UserNotification('icon-account', 'Supplier account SA1234 has been updated.',
 *                               '/play/')
 *        ];
 *
 *        constructor ()
 *        {
 *        }
 *
 *    }
 */
export class PageHeaderComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     * @param {?} routing
     */
    constructor(element, env, routing) {
        super(env);
        this.element = element;
        this.env = env;
        this.routing = routing;
        /**
         * Should the user notification icon be hidden. Default it to show the icon even
         * if there's no notifications.
         *
         */
        this.hideNotification = false;
        /**
         * displays the back link that navigates user to the previous page when clicked.
         */
        this.showBackAction = false;
        this.showNotificationPanel = false;
    }
    /**
     * @return {?}
     */
    backAction() {
        this.routing.goBack();
    }
    /**
     * Do i have any menu items.
     *
     * @return {?}
     */
    hasMenuItems() {
        return (this.menuItems && this.menuItems.length > 0);
    }
    /**
     * Toggle the side navigation menu.
     * @return {?}
     */
    showHideMenu() {
        this.sidenav.toggle();
    }
    /**
     * Do I have any notifications.
     *
     * @return {?}
     */
    hasNotifications() {
        return isPresent(this.notifications) && this.notifications.length > 0;
    }
    /**
     * toggling wheather notification panel is displayed or not.
     * @return {?}
     */
    toggleNotificationPanel() {
        this.showNotificationPanel = !this.showNotificationPanel;
    }
}
PageHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-page-header',
                template: "<nav class=\"navbar page-header\" role=\"navigation\">\n\n    <div class=\"ui-g\">\n        <div class=\"ui-g-12 ui-md-4 navbar-left\">\n\n        <span *ngIf=\"hasMenuItems()\">\n            <a (click)=\"showHideMenu()\">\n                <i class=\"sap-icon icon-paging\"></i>\n            </a>\n\n            <!-- Side menu -->\n            <aw-sidenav #sidemenu [items]=\"menuItems\"></aw-sidenav>\n        </span>\n            <!-- End Hamburger menu. -->\n\n            <!--  back action -->\n            <span class=\"back-action\">\n            <a (click)=\"backAction()\">\n                <i *ngIf=\"showBackAction\" class=\"sap-icon icon-arrow-left\" role=\"button\"></i>\n            </a>\n        </span>\n\n        </div>\n\n        <div class=\"ui-g-12 ui-md-4 navbar-center\">\n\n            <!-- central section.  Application can add Ariba-logo, search box, etc -->\n            <ng-content select=\".page-header-center\"></ng-content>\n        </div>\n\n        <div class=\"ui-g-12 ui-md-4 navbar-right\">\n        <span *ngIf=\"userName\">\n            <img id=\"userProfilePicture\" class=\"profile-logo\" aria-hidden=\"true\"\n                 [title]=\"userName\" src=\"{{assetFolder}}/images/default_image_small.png\">\n            <span class=\"profile-user\" title=\"{{userName}}\">{{userName}}</span>\n        </span>\n\n            <span *ngIf=\"!hideNotification\" class=\"notification-container\">\n\n            <i #notificationIcon class=\"ariba-icon icon-notification\"\n               (click)=\"toggleNotificationPanel()\"></i>\n            <span *ngIf=\"hasNotifications()\" class=\"notification-badge\" aria-hidden=\"true\">{{notifications.length}}</span>\n\n                <!-- Originally I was using p-overlay-panel, however, it doesn't position correctly under the notification icon.\n                     The positioning logic in prime ng needs some more investigation. So for now, use a div instead-->\n            <div *ngIf=\"showNotificationPanel\" class=\"notification-panel\">\n\n                <div class=\"notification-header\">\n                     Notifications\n                </div>\n\n                <ul class=\"notification-content\">\n                    <li *ngFor=\"let noti of notifications\" class=\"notification-item\">\n                        <a [routerLink]=\"noti.link\">\n                            <span class=\"notification-item-icon\"><i\n                                [ngClass]=\"'sap-icon ' + noti.icon\"></i></span>\n                            {{noti.label}}\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </span>\n        </div>\n\n\n    </div>\n</nav>\n",
                styles: [".page-header i{font-size:32px}.page-header .icon-paging{font-size:30px;position:relative;top:2px}.back-action{display:inline-block;margin-left:15px}.back-action i{position:relative;top:3px}.navbar{background:#000;color:#fff}.navbar-left{padding-left:15px;height:50px}.navbar-center{text-align:center;height:50px}.navbar-right{text-align:right;height:50px}.profile-logo{width:30px;height:30px;position:relative;top:2px}.profile-user{vertical-align:super;margin-right:30px}.icon-notification:before{content:\"\\eA14\"}.navbar #sidebar-menu-icon{position:relative;top:.5em}.notification-container{position:relative;margin-right:20px;display:inline-block}.notification-badge{display:inline-block;padding:2px 5px;font-size:12px;font-weight:700;color:#fff;background-color:#c00;border-radius:10px;position:absolute;top:0;left:16px}.notification-panel{position:absolute;right:-27px;top:45px;width:350px;color:#767676;box-shadow:0 2px 10px 0 rgba(0,0,0,.13);background-color:#fff;overflow:hidden;transition:.3s ease-in-out}.notification-panel .notification-header{background-color:#f3f3f3;font-size:16px;height:50px;line-height:50px;text-align:center}.notification-panel .notification-content{padding:0;margin:0}.notification-panel .notification-item{height:50px;border-top:1px solid #d7d7d7;padding:15px 10px;white-space:nowrap;text-overflow:ellipsis}.notification-panel .notification-item a{color:#767676;text-decoration:none;line-height:35px}.notification-panel .notification-item:hover{background-color:#f7f8fa}.notification-panel .notification-item-icon{margin-right:15px;color:#767676;display:inline-block;margin-top:10px;vertical-align:middle}"]
            }] }
];
/** @nocollapse */
PageHeaderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment },
    { type: RoutingService }
];
PageHeaderComponent.propDecorators = {
    menuItems: [{ type: Input }],
    notifications: [{ type: Input }],
    hideNotification: [{ type: Input }],
    showBackAction: [{ type: Input }],
    userName: [{ type: Input }],
    sidenav: [{ type: ViewChild, args: ['sidemenu',] }]
};
if (false) {
    /**
     * list of menu entries. The page menu icon will only display when this list is not empty.
     * @type {?}
     */
    PageHeaderComponent.prototype.menuItems;
    /**
     * list of user notification
     * @type {?}
     */
    PageHeaderComponent.prototype.notifications;
    /**
     * Should the user notification icon be hidden. Default it to show the icon even
     * if there's no notifications.
     *
     * @type {?}
     */
    PageHeaderComponent.prototype.hideNotification;
    /**
     * displays the back link that navigates user to the previous page when clicked.
     * @type {?}
     */
    PageHeaderComponent.prototype.showBackAction;
    /**
     * Current logged in user name.
     * @type {?}
     */
    PageHeaderComponent.prototype.userName;
    /**
     * The sidemenu
     * @type {?}
     */
    PageHeaderComponent.prototype.sidenav;
    /** @type {?} */
    PageHeaderComponent.prototype.showNotificationPanel;
    /** @type {?} */
    PageHeaderComponent.prototype.element;
    /** @type {?} */
    PageHeaderComponent.prototype.env;
    /** @type {?} */
    PageHeaderComponent.prototype.routing;
}
/**
 * PageMenuItem represents an item in the page menu structure.
 */
export class PageMenuItem {
    /**
     * @param {?} icon    - Icon of this menu item.
     * @param {?} label   - label of this item.
     * @param {?} link    - link to the destination when user clicks on it.
     */
    constructor(icon, label, link) {
        this.icon = icon;
        this.label = label;
        this.link = link;
    }
    /**
     * @return {?}
     */
    toString() {
        return `PageMenuItem: (label, ${this.label})`;
    }
}
if (false) {
    /** @type {?} */
    PageMenuItem.prototype.icon;
    /** @type {?} */
    PageMenuItem.prototype.label;
    /** @type {?} */
    PageMenuItem.prototype.link;
}
/**
 * notification for the current logged in user.
 * Ex:  PR2049 has been approved.
 *      Order PO518 received.
 */
export class UserNotification {
    /**
     * @param {?} icon   - alert notification icon
     * @param {?} label  - alert notification label
     * @param {?} link   - link
     */
    constructor(icon, label, link) {
        this.icon = icon;
        this.label = label;
        this.link = link;
    }
    /**
     * @return {?}
     */
    toString() {
        return `PageUserNotification: (label, ${this.label})`;
    }
}
if (false) {
    /** @type {?} */
    UserNotification.prototype.icon;
    /** @type {?} */
    UserNotification.prototype.label;
    /** @type {?} */
    UserNotification.prototype.link;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9EM0QsTUFBTSwwQkFBMkIsU0FBUSxhQUFhOzs7Ozs7SUE0Q2xELFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0IsRUFDOUM7UUFFaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBSE8sWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDOUMsWUFBTyxHQUFQLE9BQU87Ozs7OztnQ0F4QkMsS0FBSzs7Ozs4QkFNUCxLQUFLO3FDQWNFLEtBQUs7S0FRckM7Ozs7SUFFRCxVQUFVO1FBRU4sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7O0lBTUQsWUFBWTtRQUVSLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7Ozs7O0lBS0QsWUFBWTtRQUVSLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDekI7Ozs7OztJQU1ELGdCQUFnQjtRQUVaLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUN6RTs7Ozs7SUFLRCx1QkFBdUI7UUFFbkIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO0tBQzVEOzs7WUE3RkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLHFwRkFBeUM7O2FBRTVDOzs7O1lBdERrQixVQUFVO1lBQ3JCLFdBQVc7WUFBYSxjQUFjOzs7d0JBNER6QyxLQUFLOzRCQU1MLEtBQUs7K0JBUUwsS0FBSzs2QkFNTCxLQUFLO3VCQU1MLEtBQUs7c0JBTUwsU0FBUyxTQUFDLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0R6QixNQUFNOzs7Ozs7SUFPRixZQUFtQixJQUFZLEVBQVMsS0FBYSxFQUNsQztRQURBLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2xDLFNBQUksR0FBSixJQUFJO0tBRXRCOzs7O0lBRUQsUUFBUTtRQUVKLE1BQU0sQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO0tBQ2pEO0NBQ0o7Ozs7Ozs7Ozs7Ozs7O0FBT0QsTUFBTTs7Ozs7O0lBUUYsWUFBbUIsSUFBWSxFQUFTLEtBQWEsRUFDbEM7UUFEQSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNsQyxTQUFJLEdBQUosSUFBSTtLQUd0Qjs7OztJQUVELFFBQVE7UUFFSixNQUFNLENBQUMsaUNBQWlDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztLQUN6RDtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnQsIFJvdXRpbmdTZXJ2aWNlfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7U2lkZW5hdkNvbXBvbmVudH0gZnJvbSAnLi4vc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudCc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqXG4gKiBIZWFkZXIgY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyBjb25zaXN0ZW50IHN0eWxpbmcsIGJlaGF2aW9yIGZvciBhbiBBcmliYSBwYWdlLlxuICogSGVhZGVyIGluY2x1ZGVzIGEgbWVudSwgdXNlciBwcm9maWxlLCBhbmQgYWxlcnRzLlxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAncmVnaXN0cmF0aW9uJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgPGF3LXBhZ2UtaGVhZGVyIFtzaG93QmFja0FjdGlvbl09XCJ0cnVlXCIgdXNlck5hbWU9XCJDaGFkIE5vbGxcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWVudUl0ZW1zXT1cIm1lbnVJdGVtc1wiIFtub3RpZmljYXRpb25zXT1cInVzZXJOb3RpZmljYXRpb25zXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWhlYWRlci1jZW50ZXJcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXZiYXItYnJhbmRcIiB0YWJpbmRleD1cIjBcIiBocmVmPVwiL1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm5hdmJhci1sb2dvXCIgc3JjPVwiLi9pbWFnZXMvU0FQX0FyaWJhX0RCLnBuZ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiR28gdG8gaG9tZXBhZ2VcIiBkYXRhLXBpbi1ub3Bpbj1cInRydWVcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gKiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICAgPC9hdy1wYWdlLWhlYWRlcj5cbiAqXG4gKiAgICBgXG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15UGFnZVxuICogICAge1xuICogICAgICBtZW51SXRlbXM6IFBhZ2VNZW51SXRlbVtdID0gW25ldyBQYWdlTWVudUl0ZW0oJ2ljb24taG9tZScsICdIb21lJywgJy9wbGF5LycpLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhZ2VNZW51SXRlbSgnaWNvbi1leHBlbnNlLXJlcG9ydCcsICdSZXBvcnRzJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL3BsYXkvcGFnZWhlYWRlcicpLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhZ2VNZW51SXRlbSgnaWNvbi1zYWxlcy1vcmRlcicsICdQdXJjaGFzZSBPcmRlcicsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL3BsYXkvcGFnZWhlYWRlcicpLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhZ2VNZW51SXRlbSgnaWNvbi1hY2NvdW50JywgJ0FjY291bnRzJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL3BsYXkvcGFnZWhlYWRlcicpXTtcbiAqXG4gKiAgICAgdXNlck5vdGlmaWNhdGlvbnM6IFVzZXJOb3RpZmljYXRpb25bXSA9IFtcbiAqICAgICAgIG5ldyBVc2VyTm90aWZpY2F0aW9uKCdpY29uLWV4cGVuc2UtcmVwb3J0JywgJ0V4cGVuc2UgcmVwb3J0IEVYUDQ1MyBoYXMgYmVlbiBhcHByb3ZlZC4nLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvcGxheS8nKSxcbiAqICAgICAgICAgbmV3IFVzZXJOb3RpZmljYXRpb24oJ2ljb24tc2FsZXMtb3JkZXInLCAnU2FsZXMgT3JkZXIgU08xMjM0IGhhcyBiZWVuIGNyZWF0ZWQuJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL3BsYXkvJyksXG4gKiAgICAgICAgICAgbmV3IFVzZXJOb3RpZmljYXRpb24oJ2ljb24tYWNjb3VudCcsICdTdXBwbGllciBhY2NvdW50IFNBMTIzNCBoYXMgYmVlbiB1cGRhdGVkLicsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL3BsYXkvJylcbiAqICAgICAgICBdO1xuICpcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICB9XG4gKlxuICogICAgfVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXBhZ2UtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2UtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsncGFnZS1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogbGlzdCBvZiBtZW51IGVudHJpZXMuIFRoZSBwYWdlIG1lbnUgaWNvbiB3aWxsIG9ubHkgZGlzcGxheSB3aGVuIHRoaXMgbGlzdCBpcyBub3QgZW1wdHkuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtZW51SXRlbXM6IFBhZ2VNZW51SXRlbVtdO1xuXG4gICAgLyoqXG4gICAgICogbGlzdCBvZiB1c2VyIG5vdGlmaWNhdGlvblxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm90aWZpY2F0aW9uczogVXNlck5vdGlmaWNhdGlvbltdO1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRoZSB1c2VyIG5vdGlmaWNhdGlvbiBpY29uIGJlIGhpZGRlbi4gRGVmYXVsdCBpdCB0byBzaG93IHRoZSBpY29uIGV2ZW5cbiAgICAgKiBpZiB0aGVyZSdzIG5vIG5vdGlmaWNhdGlvbnMuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhpZGVOb3RpZmljYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGRpc3BsYXlzIHRoZSBiYWNrIGxpbmsgdGhhdCBuYXZpZ2F0ZXMgdXNlciB0byB0aGUgcHJldmlvdXMgcGFnZSB3aGVuIGNsaWNrZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93QmFja0FjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBsb2dnZWQgaW4gdXNlciBuYW1lLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlck5hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBzaWRlbWVudVxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoJ3NpZGVtZW51JylcbiAgICBzaWRlbmF2OiBTaWRlbmF2Q29tcG9uZW50O1xuXG4gICAgc2hvd05vdGlmaWNhdGlvblBhbmVsOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRpbmc6IFJvdXRpbmdTZXJ2aWNlKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgIH1cblxuICAgIGJhY2tBY3Rpb24oKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5yb3V0aW5nLmdvQmFjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvIGkgaGF2ZSBhbnkgbWVudSBpdGVtcy5cbiAgICAgKlxuICAgICAqL1xuICAgIGhhc01lbnVJdGVtcygpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gKHRoaXMubWVudUl0ZW1zICYmIHRoaXMubWVudUl0ZW1zLmxlbmd0aCA+IDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB0aGUgc2lkZSBuYXZpZ2F0aW9uIG1lbnUuXG4gICAgICovXG4gICAgc2hvd0hpZGVNZW51KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc2lkZW5hdi50b2dnbGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEbyBJIGhhdmUgYW55IG5vdGlmaWNhdGlvbnMuXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNOb3RpZmljYXRpb25zKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5ub3RpZmljYXRpb25zKSAmJiB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0b2dnbGluZyB3aGVhdGhlciBub3RpZmljYXRpb24gcGFuZWwgaXMgZGlzcGxheWVkIG9yIG5vdC5cbiAgICAgKi9cbiAgICB0b2dnbGVOb3RpZmljYXRpb25QYW5lbCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnNob3dOb3RpZmljYXRpb25QYW5lbCA9ICF0aGlzLnNob3dOb3RpZmljYXRpb25QYW5lbDtcbiAgICB9XG59XG5cbi8qKlxuICogUGFnZU1lbnVJdGVtIHJlcHJlc2VudHMgYW4gaXRlbSBpbiB0aGUgcGFnZSBtZW51IHN0cnVjdHVyZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2VNZW51SXRlbVxue1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpY29uICAgIC0gSWNvbiBvZiB0aGlzIG1lbnUgaXRlbS5cbiAgICAgKiBAcGFyYW0gbGFiZWwgICAtIGxhYmVsIG9mIHRoaXMgaXRlbS5cbiAgICAgKiBAcGFyYW0gbGluayAgICAtIGxpbmsgdG8gdGhlIGRlc3RpbmF0aW9uIHdoZW4gdXNlciBjbGlja3Mgb24gaXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGljb246IHN0cmluZywgcHVibGljIGxhYmVsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHVibGljIGxpbms6IHN0cmluZylcbiAgICB7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYFBhZ2VNZW51SXRlbTogKGxhYmVsLCAke3RoaXMubGFiZWx9KWA7XG4gICAgfVxufVxuXG4vKipcbiAqIG5vdGlmaWNhdGlvbiBmb3IgdGhlIGN1cnJlbnQgbG9nZ2VkIGluIHVzZXIuXG4gKiBFeDogIFBSMjA0OSBoYXMgYmVlbiBhcHByb3ZlZC5cbiAqICAgICAgT3JkZXIgUE81MTggcmVjZWl2ZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyTm90aWZpY2F0aW9uXG57XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWNvbiAgIC0gYWxlcnQgbm90aWZpY2F0aW9uIGljb25cbiAgICAgKiBAcGFyYW0gbGFiZWwgIC0gYWxlcnQgbm90aWZpY2F0aW9uIGxhYmVsXG4gICAgICogQHBhcmFtIGxpbmsgICAtIGxpbmtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWNvbjogc3RyaW5nLCBwdWJsaWMgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBwdWJsaWMgbGluazogc3RyaW5nKVxuICAgIHtcblxuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGBQYWdlVXNlck5vdGlmaWNhdGlvbjogKGxhYmVsLCAke3RoaXMubGFiZWx9KWA7XG4gICAgfVxufVxuIl19