/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import { ElementRef } from '@angular/core';
import { Environment, RoutingService } from '@aribaui/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { BaseComponent } from '../../../core/base.component';
/**
 *
 * Header component that implements consistent styling, behavior for an Ariba page.
 * Header includes a menu, user profile, and alerts.
 *
 *  @Component({
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
export declare class PageHeaderComponent extends BaseComponent {
    protected element: ElementRef;
    env: Environment;
    private routing;
    /**
     * list of menu entries. The page menu icon will only display when this list is not empty.
     */
    menuItems: PageMenuItem[];
    /**
     * list of user notification
     */
    notifications: UserNotification[];
    /**
     * Should the user notification icon be hidden. Default it to show the icon even
     * if there's no notifications.
     *
     */
    hideNotification: boolean;
    /**
     * displays the back link that navigates user to the previous page when clicked.
     */
    showBackAction: boolean;
    /**
     * Current logged in user name.
     */
    userName: string;
    /**
     * The sidemenu
     */
    sidenav: SidenavComponent;
    showNotificationPanel: boolean;
    constructor(element: ElementRef, env: Environment, routing: RoutingService);
    backAction(): void;
    /**
     * Do i have any menu items.
     *
     */
    hasMenuItems(): boolean;
    /**
     * Toggle the side navigation menu.
     */
    showHideMenu(): void;
    /**
     * Do I have any notifications.
     *
     */
    hasNotifications(): boolean;
    /**
     * toggling wheather notification panel is displayed or not.
     */
    toggleNotificationPanel(): void;
}
/**
 * PageMenuItem represents an item in the page menu structure.
 */
export declare class PageMenuItem {
    icon: string;
    label: string;
    link: string;
    /**
     * @param icon    - Icon of this menu item.
     * @param label   - label of this item.
     * @param link    - link to the destination when user clicks on it.
     */
    constructor(icon: string, label: string, link: string);
    toString(): string;
}
/**
 * notification for the current logged in user.
 * Ex:  PR2049 has been approved.
 *      Order PO518 received.
 */
export declare class UserNotification {
    icon: string;
    label: string;
    link: string;
    /**
     * @param icon   - alert notification icon
     * @param label  - alert notification label
     * @param link   - link
     */
    constructor(icon: string, label: string, link: string);
    toString(): string;
}
