/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                template: `<nav class="navbar page-header" role="navigation">

    <div class="ui-g">
        <div class="ui-g-12 ui-md-4 navbar-left">

        <span *ngIf="hasMenuItems()">
            <a (click)="showHideMenu()">
                <i class="sap-icon icon-paging"></i>
            </a>

            <!-- Side menu -->
            <aw-sidenav #sidemenu [items]="menuItems"></aw-sidenav>
        </span>
            <!-- End Hamburger menu. -->

            <!--  back action -->
            <span class="back-action">
            <a (click)="backAction()">
                <i *ngIf="showBackAction" class="sap-icon icon-arrow-left" role="button"></i>
            </a>
        </span>

        </div>

        <div class="ui-g-12 ui-md-4 navbar-center">

            <!-- central section.  Application can add Ariba-logo, search box, etc -->
            <ng-content select=".page-header-center"></ng-content>
        </div>

        <div class="ui-g-12 ui-md-4 navbar-right">
        <span *ngIf="userName">
            <img id="userProfilePicture" class="profile-logo" aria-hidden="true"
                 [title]="userName" src="{{assetFolder}}/images/default_image_small.png">
            <span class="profile-user" title="{{userName}}">{{userName}}</span>
        </span>

            <span *ngIf="!hideNotification" class="notification-container">

            <i #notificationIcon class="ariba-icon icon-notification"
               (click)="toggleNotificationPanel()"></i>
            <span *ngIf="hasNotifications()" class="notification-badge" aria-hidden="true">{{notifications.length}}</span>

                <!-- Originally I was using p-overlay-panel, however, it doesn't position correctly under the notification icon.
                     The positioning logic in prime ng needs some more investigation. So for now, use a div instead-->
            <div *ngIf="showNotificationPanel" class="notification-panel">

                <div class="notification-header">
                     Notifications
                </div>

                <ul class="notification-content">
                    <li *ngFor="let noti of notifications" class="notification-item">
                        <a [routerLink]="noti.link">
                            <span class="notification-item-icon"><i
                                [ngClass]="'sap-icon ' + noti.icon"></i></span>
                            {{noti.label}}
                        </a>
                    </li>
                </ul>
            </div>
        </span>
        </div>


    </div>
</nav>
`,
                styles: [`.page-header i{font-size:32px}.page-header .icon-paging{font-size:30px;position:relative;top:2px}.back-action{display:inline-block;margin-left:15px}.back-action i{position:relative;top:3px}.navbar{background:#000;color:#fff}.navbar-left{padding-left:15px;height:50px}.navbar-center{text-align:center;height:50px}.navbar-right{text-align:right;height:50px}.profile-logo{width:30px;height:30px;position:relative;top:2px}.profile-user{vertical-align:super;margin-right:30px}.icon-notification:before{content:"\\eA14"}.navbar #sidebar-menu-icon{position:relative;top:.5em}.notification-container{position:relative;margin-right:20px;display:inline-block}.notification-badge{display:inline-block;padding:2px 5px;font-size:12px;font-weight:700;color:#fff;background-color:#c00;border-radius:10px;position:absolute;top:0;left:16px}.notification-panel{position:absolute;right:-27px;top:45px;width:350px;color:#767676;box-shadow:0 2px 10px 0 rgba(0,0,0,.13);background-color:#fff;overflow:hidden;transition:all .3s ease-in-out}.notification-panel .notification-header{background-color:#f3f3f3;font-size:16px;height:50px;line-height:50px;text-align:center}.notification-panel .notification-content{padding:0;margin:0}.notification-panel .notification-item{height:50px;border-top:1px solid #d7d7d7;padding:15px 10px;white-space:nowrap;text-overflow:ellipsis}.notification-panel .notification-item a{color:#767676;text-decoration:none;line-height:35px}.notification-panel .notification-item:hover{background-color:#f7f8fa}.notification-panel .notification-item-icon{margin-right:15px;color:#767676;display:inline-block;margin-top:10px;vertical-align:middle}`]
            },] },
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
function PageHeaderComponent_tsickle_Closure_declarations() {
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
function PageMenuItem_tsickle_Closure_declarations() {
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
function UserNotification_tsickle_Closure_declarations() {
    /** @type {?} */
    UserNotification.prototype.icon;
    /** @type {?} */
    UserNotification.prototype.label;
    /** @type {?} */
    UserNotification.prototype.link;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2UtaGVhZGVyL3BhZ2UtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVIM0QsTUFBTSwwQkFBMkIsU0FBUSxhQUFhOzs7Ozs7SUE0Q2xELFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0IsRUFDOUM7UUFFaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBSE8sWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFDOUMsWUFBTyxHQUFQLE9BQU87Ozs7OztnQ0F4QkMsS0FBSzs7Ozs4QkFNUCxLQUFLO3FDQWNFLEtBQUs7S0FRckM7Ozs7SUFFRCxVQUFVO1FBRU4sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7O0lBTUQsWUFBWTtRQUVSLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7Ozs7O0lBS0QsWUFBWTtRQUVSLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDekI7Ozs7OztJQU1ELGdCQUFnQjtRQUVaLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUN6RTs7Ozs7SUFLRCx1QkFBdUI7UUFFbkIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO0tBQzVEOzs7WUFoS0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW1FYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyw4bURBQThtRCxDQUFDO2FBQzNuRDs7OztZQXpIa0IsVUFBVTtZQUNyQixXQUFXO1lBQWEsY0FBYzs7O3dCQStIekMsS0FBSzs0QkFNTCxLQUFLOytCQVFMLEtBQUs7NkJBTUwsS0FBSzt1QkFNTCxLQUFLO3NCQU1MLFNBQVMsU0FBQyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdEekIsTUFBTTs7Ozs7O0lBT0YsWUFBbUIsSUFBWSxFQUFTLEtBQWEsRUFDbEM7UUFEQSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNsQyxTQUFJLEdBQUosSUFBSTtLQUV0Qjs7OztJQUVELFFBQVE7UUFFSixNQUFNLENBQUMseUJBQXlCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztLQUNqRDtDQUNKOzs7Ozs7Ozs7Ozs7OztBQU9ELE1BQU07Ozs7OztJQVFGLFlBQW1CLElBQVksRUFBUyxLQUFhLEVBQ2xDO1FBREEsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDbEMsU0FBSSxHQUFKLElBQUk7S0FHdEI7Ozs7SUFFRCxRQUFRO1FBRUosTUFBTSxDQUFDLGlDQUFpQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUM7S0FDekQ7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50LCBSb3V0aW5nU2VydmljZX0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge1NpZGVuYXZDb21wb25lbnR9IGZyb20gJy4uL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKlxuICogSGVhZGVyIGNvbXBvbmVudCB0aGF0IGltcGxlbWVudHMgY29uc2lzdGVudCBzdHlsaW5nLCBiZWhhdmlvciBmb3IgYW4gQXJpYmEgcGFnZS5cbiAqIEhlYWRlciBpbmNsdWRlcyBhIG1lbnUsIHVzZXIgcHJvZmlsZSwgYW5kIGFsZXJ0cy5cbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ3JlZ2lzdHJhdGlvbicgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICAgIDxhdy1wYWdlLWhlYWRlciBbc2hvd0JhY2tBY3Rpb25dPVwidHJ1ZVwiIHVzZXJOYW1lPVwiQ2hhZCBOb2xsXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21lbnVJdGVtc109XCJtZW51SXRlbXNcIiBbbm90aWZpY2F0aW9uc109XCJ1c2VyTm90aWZpY2F0aW9uc1wiPlxuICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXItY2VudGVyXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kXCIgdGFiaW5kZXg9XCIwXCIgaHJlZj1cIi9cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJuYXZiYXItbG9nb1wiIHNyYz1cIi4vaW1hZ2VzL1NBUF9BcmliYV9EQi5wbmdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIkdvIHRvIGhvbWVwYWdlXCIgZGF0YS1waW4tbm9waW49XCJ0cnVlXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICogICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICAgIDwvYXctcGFnZS1oZWFkZXI+XG4gKlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VcbiAqICAgIHtcbiAqICAgICAgbWVudUl0ZW1zOiBQYWdlTWVudUl0ZW1bXSA9IFtuZXcgUGFnZU1lbnVJdGVtKCdpY29uLWhvbWUnLCAnSG9tZScsICcvcGxheS8nKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYWdlTWVudUl0ZW0oJ2ljb24tZXhwZW5zZS1yZXBvcnQnLCAnUmVwb3J0cycsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9wbGF5L3BhZ2VoZWFkZXInKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYWdlTWVudUl0ZW0oJ2ljb24tc2FsZXMtb3JkZXInLCAnUHVyY2hhc2UgT3JkZXInLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9wbGF5L3BhZ2VoZWFkZXInKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYWdlTWVudUl0ZW0oJ2ljb24tYWNjb3VudCcsICdBY2NvdW50cycsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9wbGF5L3BhZ2VoZWFkZXInKV07XG4gKlxuICogICAgIHVzZXJOb3RpZmljYXRpb25zOiBVc2VyTm90aWZpY2F0aW9uW10gPSBbXG4gKiAgICAgICBuZXcgVXNlck5vdGlmaWNhdGlvbignaWNvbi1leHBlbnNlLXJlcG9ydCcsICdFeHBlbnNlIHJlcG9ydCBFWFA0NTMgaGFzIGJlZW4gYXBwcm92ZWQuJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL3BsYXkvJyksXG4gKiAgICAgICAgIG5ldyBVc2VyTm90aWZpY2F0aW9uKCdpY29uLXNhbGVzLW9yZGVyJywgJ1NhbGVzIE9yZGVyIFNPMTIzNCBoYXMgYmVlbiBjcmVhdGVkLicsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9wbGF5LycpLFxuICogICAgICAgICAgIG5ldyBVc2VyTm90aWZpY2F0aW9uKCdpY29uLWFjY291bnQnLCAnU3VwcGxpZXIgYWNjb3VudCBTQTEyMzQgaGFzIGJlZW4gdXBkYXRlZC4nLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9wbGF5LycpXG4gKiAgICAgICAgXTtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICpcbiAqICAgIH1cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1wYWdlLWhlYWRlcicsXG4gICAgdGVtcGxhdGU6IGA8bmF2IGNsYXNzPVwibmF2YmFyIHBhZ2UtaGVhZGVyXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1aS1nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHVpLW1kLTQgbmF2YmFyLWxlZnRcIj5cblxuICAgICAgICA8c3BhbiAqbmdJZj1cImhhc01lbnVJdGVtcygpXCI+XG4gICAgICAgICAgICA8YSAoY2xpY2spPVwic2hvd0hpZGVNZW51KClcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInNhcC1pY29uIGljb24tcGFnaW5nXCI+PC9pPlxuICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICA8IS0tIFNpZGUgbWVudSAtLT5cbiAgICAgICAgICAgIDxhdy1zaWRlbmF2ICNzaWRlbWVudSBbaXRlbXNdPVwibWVudUl0ZW1zXCI+PC9hdy1zaWRlbmF2PlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8IS0tIEVuZCBIYW1idXJnZXIgbWVudS4gLS0+XG5cbiAgICAgICAgICAgIDwhLS0gIGJhY2sgYWN0aW9uIC0tPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYWNrLWFjdGlvblwiPlxuICAgICAgICAgICAgPGEgKGNsaWNrKT1cImJhY2tBY3Rpb24oKVwiPlxuICAgICAgICAgICAgICAgIDxpICpuZ0lmPVwic2hvd0JhY2tBY3Rpb25cIiBjbGFzcz1cInNhcC1pY29uIGljb24tYXJyb3ctbGVmdFwiIHJvbGU9XCJidXR0b25cIj48L2k+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy0xMiB1aS1tZC00IG5hdmJhci1jZW50ZXJcIj5cblxuICAgICAgICAgICAgPCEtLSBjZW50cmFsIHNlY3Rpb24uICBBcHBsaWNhdGlvbiBjYW4gYWRkIEFyaWJhLWxvZ28sIHNlYXJjaCBib3gsIGV0YyAtLT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5wYWdlLWhlYWRlci1jZW50ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHVpLW1kLTQgbmF2YmFyLXJpZ2h0XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidXNlck5hbWVcIj5cbiAgICAgICAgICAgIDxpbWcgaWQ9XCJ1c2VyUHJvZmlsZVBpY3R1cmVcIiBjbGFzcz1cInByb2ZpbGUtbG9nb1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgIFt0aXRsZV09XCJ1c2VyTmFtZVwiIHNyYz1cInt7YXNzZXRGb2xkZXJ9fS9pbWFnZXMvZGVmYXVsdF9pbWFnZV9zbWFsbC5wbmdcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS11c2VyXCIgdGl0bGU9XCJ7e3VzZXJOYW1lfX1cIj57e3VzZXJOYW1lfX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaGlkZU5vdGlmaWNhdGlvblwiIGNsYXNzPVwibm90aWZpY2F0aW9uLWNvbnRhaW5lclwiPlxuXG4gICAgICAgICAgICA8aSAjbm90aWZpY2F0aW9uSWNvbiBjbGFzcz1cImFyaWJhLWljb24gaWNvbi1ub3RpZmljYXRpb25cIlxuICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU5vdGlmaWNhdGlvblBhbmVsKClcIj48L2k+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cImhhc05vdGlmaWNhdGlvbnMoKVwiIGNsYXNzPVwibm90aWZpY2F0aW9uLWJhZGdlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3tub3RpZmljYXRpb25zLmxlbmd0aH19PC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgPCEtLSBPcmlnaW5hbGx5IEkgd2FzIHVzaW5nIHAtb3ZlcmxheS1wYW5lbCwgaG93ZXZlciwgaXQgZG9lc24ndCBwb3NpdGlvbiBjb3JyZWN0bHkgdW5kZXIgdGhlIG5vdGlmaWNhdGlvbiBpY29uLlxuICAgICAgICAgICAgICAgICAgICAgVGhlIHBvc2l0aW9uaW5nIGxvZ2ljIGluIHByaW1lIG5nIG5lZWRzIHNvbWUgbW9yZSBpbnZlc3RpZ2F0aW9uLiBTbyBmb3Igbm93LCB1c2UgYSBkaXYgaW5zdGVhZC0tPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dOb3RpZmljYXRpb25QYW5lbFwiIGNsYXNzPVwibm90aWZpY2F0aW9uLXBhbmVsXCI+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uc1xuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibm90aWZpY2F0aW9uLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBub3RpIG9mIG5vdGlmaWNhdGlvbnNcIiBjbGFzcz1cIm5vdGlmaWNhdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJub3RpLmxpbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5vdGlmaWNhdGlvbi1pdGVtLWljb25cIj48aVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCInc2FwLWljb24gJyArIG5vdGkuaWNvblwiPjwvaT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tub3RpLmxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cblxuICAgIDwvZGl2PlxuPC9uYXY+XG5gLFxuICAgIHN0eWxlczogW2AucGFnZS1oZWFkZXIgaXtmb250LXNpemU6MzJweH0ucGFnZS1oZWFkZXIgLmljb24tcGFnaW5ne2ZvbnQtc2l6ZTozMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoycHh9LmJhY2stYWN0aW9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1sZWZ0OjE1cHh9LmJhY2stYWN0aW9uIGl7cG9zaXRpb246cmVsYXRpdmU7dG9wOjNweH0ubmF2YmFye2JhY2tncm91bmQ6IzAwMDtjb2xvcjojZmZmfS5uYXZiYXItbGVmdHtwYWRkaW5nLWxlZnQ6MTVweDtoZWlnaHQ6NTBweH0ubmF2YmFyLWNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6NTBweH0ubmF2YmFyLXJpZ2h0e3RleHQtYWxpZ246cmlnaHQ7aGVpZ2h0OjUwcHh9LnByb2ZpbGUtbG9nb3t3aWR0aDozMHB4O2hlaWdodDozMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoycHh9LnByb2ZpbGUtdXNlcnt2ZXJ0aWNhbC1hbGlnbjpzdXBlcjttYXJnaW4tcmlnaHQ6MzBweH0uaWNvbi1ub3RpZmljYXRpb246YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZUExNFwifS5uYXZiYXIgI3NpZGViYXItbWVudS1pY29ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDouNWVtfS5ub3RpZmljYXRpb24tY29udGFpbmVye3Bvc2l0aW9uOnJlbGF0aXZlO21hcmdpbi1yaWdodDoyMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5ub3RpZmljYXRpb24tYmFkZ2V7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzoycHggNXB4O2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6I2MwMDtib3JkZXItcmFkaXVzOjEwcHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDoxNnB4fS5ub3RpZmljYXRpb24tcGFuZWx7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6LTI3cHg7dG9wOjQ1cHg7d2lkdGg6MzUwcHg7Y29sb3I6Izc2NzY3Njtib3gtc2hhZG93OjAgMnB4IDEwcHggMCByZ2JhKDAsMCwwLC4xMyk7YmFja2dyb3VuZC1jb2xvcjojZmZmO292ZXJmbG93OmhpZGRlbjt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZS1pbi1vdXR9Lm5vdGlmaWNhdGlvbi1wYW5lbCAubm90aWZpY2F0aW9uLWhlYWRlcntiYWNrZ3JvdW5kLWNvbG9yOiNmM2YzZjM7Zm9udC1zaXplOjE2cHg7aGVpZ2h0OjUwcHg7bGluZS1oZWlnaHQ6NTBweDt0ZXh0LWFsaWduOmNlbnRlcn0ubm90aWZpY2F0aW9uLXBhbmVsIC5ub3RpZmljYXRpb24tY29udGVudHtwYWRkaW5nOjA7bWFyZ2luOjB9Lm5vdGlmaWNhdGlvbi1wYW5lbCAubm90aWZpY2F0aW9uLWl0ZW17aGVpZ2h0OjUwcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q3ZDdkNztwYWRkaW5nOjE1cHggMTBweDt3aGl0ZS1zcGFjZTpub3dyYXA7dGV4dC1vdmVyZmxvdzplbGxpcHNpc30ubm90aWZpY2F0aW9uLXBhbmVsIC5ub3RpZmljYXRpb24taXRlbSBhe2NvbG9yOiM3Njc2NzY7dGV4dC1kZWNvcmF0aW9uOm5vbmU7bGluZS1oZWlnaHQ6MzVweH0ubm90aWZpY2F0aW9uLXBhbmVsIC5ub3RpZmljYXRpb24taXRlbTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmN2Y4ZmF9Lm5vdGlmaWNhdGlvbi1wYW5lbCAubm90aWZpY2F0aW9uLWl0ZW0taWNvbnttYXJnaW4tcmlnaHQ6MTVweDtjb2xvcjojNzY3Njc2O2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi10b3A6MTBweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGFnZUhlYWRlckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIGxpc3Qgb2YgbWVudSBlbnRyaWVzLiBUaGUgcGFnZSBtZW51IGljb24gd2lsbCBvbmx5IGRpc3BsYXkgd2hlbiB0aGlzIGxpc3QgaXMgbm90IGVtcHR5LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWVudUl0ZW1zOiBQYWdlTWVudUl0ZW1bXTtcblxuICAgIC8qKlxuICAgICAqIGxpc3Qgb2YgdXNlciBub3RpZmljYXRpb25cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG5vdGlmaWNhdGlvbnM6IFVzZXJOb3RpZmljYXRpb25bXTtcblxuICAgIC8qKlxuICAgICAqIFNob3VsZCB0aGUgdXNlciBub3RpZmljYXRpb24gaWNvbiBiZSBoaWRkZW4uIERlZmF1bHQgaXQgdG8gc2hvdyB0aGUgaWNvbiBldmVuXG4gICAgICogaWYgdGhlcmUncyBubyBub3RpZmljYXRpb25zLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoaWRlTm90aWZpY2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBkaXNwbGF5cyB0aGUgYmFjayBsaW5rIHRoYXQgbmF2aWdhdGVzIHVzZXIgdG8gdGhlIHByZXZpb3VzIHBhZ2Ugd2hlbiBjbGlja2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0JhY2tBY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgbG9nZ2VkIGluIHVzZXIgbmFtZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZXJOYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2lkZW1lbnVcbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdzaWRlbWVudScpXG4gICAgc2lkZW5hdjogU2lkZW5hdkNvbXBvbmVudDtcblxuICAgIHNob3dOb3RpZmljYXRpb25QYW5lbDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0aW5nOiBSb3V0aW5nU2VydmljZSlcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICB9XG5cbiAgICBiYWNrQWN0aW9uKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMucm91dGluZy5nb0JhY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEbyBpIGhhdmUgYW55IG1lbnUgaXRlbXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNNZW51SXRlbXMoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1lbnVJdGVtcyAmJiB0aGlzLm1lbnVJdGVtcy5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIHNpZGUgbmF2aWdhdGlvbiBtZW51LlxuICAgICAqL1xuICAgIHNob3dIaWRlTWVudSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnNpZGVuYXYudG9nZ2xlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG8gSSBoYXZlIGFueSBub3RpZmljYXRpb25zLlxuICAgICAqXG4gICAgICovXG4gICAgaGFzTm90aWZpY2F0aW9ucygpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMubm90aWZpY2F0aW9ucykgJiYgdGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9nZ2xpbmcgd2hlYXRoZXIgbm90aWZpY2F0aW9uIHBhbmVsIGlzIGRpc3BsYXllZCBvciBub3QuXG4gICAgICovXG4gICAgdG9nZ2xlTm90aWZpY2F0aW9uUGFuZWwoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zaG93Tm90aWZpY2F0aW9uUGFuZWwgPSAhdGhpcy5zaG93Tm90aWZpY2F0aW9uUGFuZWw7XG4gICAgfVxufVxuXG4vKipcbiAqIFBhZ2VNZW51SXRlbSByZXByZXNlbnRzIGFuIGl0ZW0gaW4gdGhlIHBhZ2UgbWVudSBzdHJ1Y3R1cmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWdlTWVudUl0ZW1cbntcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWNvbiAgICAtIEljb24gb2YgdGhpcyBtZW51IGl0ZW0uXG4gICAgICogQHBhcmFtIGxhYmVsICAgLSBsYWJlbCBvZiB0aGlzIGl0ZW0uXG4gICAgICogQHBhcmFtIGxpbmsgICAgLSBsaW5rIHRvIHRoZSBkZXN0aW5hdGlvbiB3aGVuIHVzZXIgY2xpY2tzIG9uIGl0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpY29uOiBzdHJpbmcsIHB1YmxpYyBsYWJlbDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBsaW5rOiBzdHJpbmcpXG4gICAge1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGBQYWdlTWVudUl0ZW06IChsYWJlbCwgJHt0aGlzLmxhYmVsfSlgO1xuICAgIH1cbn1cblxuLyoqXG4gKiBub3RpZmljYXRpb24gZm9yIHRoZSBjdXJyZW50IGxvZ2dlZCBpbiB1c2VyLlxuICogRXg6ICBQUjIwNDkgaGFzIGJlZW4gYXBwcm92ZWQuXG4gKiAgICAgIE9yZGVyIFBPNTE4IHJlY2VpdmVkLlxuICovXG5leHBvcnQgY2xhc3MgVXNlck5vdGlmaWNhdGlvblxue1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGljb24gICAtIGFsZXJ0IG5vdGlmaWNhdGlvbiBpY29uXG4gICAgICogQHBhcmFtIGxhYmVsICAtIGFsZXJ0IG5vdGlmaWNhdGlvbiBsYWJlbFxuICAgICAqIEBwYXJhbSBsaW5rICAgLSBsaW5rXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGljb246IHN0cmluZywgcHVibGljIGxhYmVsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHVibGljIGxpbms6IHN0cmluZylcbiAgICB7XG5cbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgUGFnZVVzZXJOb3RpZmljYXRpb246IChsYWJlbCwgJHt0aGlzLmxhYmVsfSlgO1xuICAgIH1cbn1cbiJdfQ==