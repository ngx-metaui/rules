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
/* tslint:disable:no-unused-variable */
import {
    PageHeaderComponent,
    PageMenuItem,
    UserNotification
} from '../../../src/widgets/page-wrapper/page-header/page-header.component';
import {Component, ViewChild} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {AribaCoreModule} from '@aribaui/core';
import {AWPageWrapperModule} from '../../../src/widgets/page-wrapper/page-wrapper.module';
import {AppConfig, Environment} from '@aribaui/core';
import {AribaComponentsTestProviderModule} from '../../../src/ariba.component.provider.module';

describe('Page Header component behavior', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PageHeaderBasicComponent,
                PageHeaderWithMenuComponent,
                PageHeaderWithNotificationsComponent
            ],
            imports: [
                AribaCoreModule.forRoot({
                    'i18n.enabled': false, 'env.test': true
                }),
                AribaComponentsTestProviderModule.forRoot(),
                AWPageWrapperModule,
                RouterTestingModule
            ]
        });

        TestBed.compileComponents();
    });


    it('It should have logo, user name and notification set correctly', () => {
        let fixtureWrapper = TestBed.createComponent(PageHeaderBasicComponent);
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.header.userName).toEqual('Chad Noll');
        expect(fixtureWrapper.componentInstance.header.menuItems).toBeUndefined();
        expect(fixtureWrapper.componentInstance.header.notifications).toBeUndefined();
        expect(fixtureWrapper.componentInstance.header.hideNotification).toEqual(false);
        expect(fixtureWrapper.componentInstance.header.showBackAction).toEqual(false);

        // Make sure the notification icon is there. But number could is null.
        let icon = fixtureWrapper.debugElement.query(By.css('.icon-notification'));
        expect(icon.nativeElement).toBeDefined();

        // Make sure the logo icon is there.
        icon = fixtureWrapper.debugElement.query(By.css('.navbar-logo'));
        expect(icon.nativeElement).toBeDefined();
        expect(icon.nativeElement.nodeName).toEqual('IMG');

        // Make sure that the menu icon isn't there. Since there's no menu.
        icon = fixtureWrapper.debugElement.query(By.css('.icon-paging'));
        expect(icon).toBeNull();
    });

    it('It should have the the menu icon, when clicked, it should show menu items',
        fakeAsync(() => {
            let fixtureWrapper = TestBed.createComponent(PageHeaderWithMenuComponent);
            fixtureWrapper.detectChanges();

            // Make sure the menu icon is there.
            let icon = fixtureWrapper.nativeElement.querySelector('.icon-paging');
            expect(icon).toBeDefined();

            // Parent is the anchor where the click event handler is attached.
            icon.parentElement.dispatchEvent(new Event('click'));
            tick();
            fixtureWrapper.detectChanges();

            // Make sure that the menu is open
            let menu = fixtureWrapper.debugElement.query(By.css('.sidenav-active'));
            expect(menu.nativeElement).toBeDefined();

            // Make sure that all the menu items is there.
            let menuItems = fixtureWrapper.nativeElement.querySelector('.sidenav-content');
            expect(menuItems.children.length).toEqual(4);


        }));

    it('It should have the user notification number correct, and show notification items',
        fakeAsync(() => {
            let fixtureWrapper = TestBed.createComponent(PageHeaderWithNotificationsComponent);
            fixtureWrapper.detectChanges();

            // Make sure the notification icon is there.
            let icon = fixtureWrapper.nativeElement.querySelector('.icon-notification');
            expect(icon).toBeDefined();

            // Make sure that that the notification count is correct.
            let count = fixtureWrapper.nativeElement.querySelector('.notification-badge');
            expect(count.textContent).toEqual('3');

            icon.dispatchEvent(new Event('click'));
            tick();
            fixtureWrapper.detectChanges();

            // Make sure that the notification panel is open
            let notifications = fixtureWrapper.debugElement.query(By.css('.notification-panel'));
            expect(notifications.nativeElement).toBeDefined();

            // Make sure that all the items are there.
            let items = fixtureWrapper.nativeElement.querySelector('.notification-content');
            expect(items.children.length).toEqual(3);

        }));

});

@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-page-header userName="Chad Noll">
            <div class="page-header-center">
                <a class="navbar-brand" tabindex="0" href="/play/">
                    <img class="navbar-logo" src="{{assetFolder}}/images/SAP_Ariba_DB.png"
                         alt="Go to homepage" data-pin-nopin="true">
                </a>
            </div>
        </aw-page-header>
    `
})
class PageHeaderBasicComponent {
    @ViewChild(PageHeaderComponent)
    header: PageHeaderComponent;

    assetFolder: string;


    constructor(private env: Environment) {
        this.assetFolder = this.env.getValue(AppConfig.AssetFolder);
    }
}

@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-page-header userName="Chad Noll" [menuItems]="menuItems">
            <div class="page-header-center">
                <a class="navbar-brand" tabindex="0" href="/play/">
                    <img class="navbar-logo"
                         src="{{assetFolder}}/assets/images/SAP_Ariba_DB.png"
                         alt="Go to homepage" data-pin-nopin="true">
                </a>
            </div>
        </aw-page-header>

    `
})
class PageHeaderWithMenuComponent {
    @ViewChild(PageHeaderComponent)
    header: PageHeaderComponent;

    menuItems: PageMenuItem[] = [
        new PageMenuItem('icon-home', 'Home', '/play/'),
        new PageMenuItem('icon-expense-report', 'Reports',
            '/play/pageheader'),
        new PageMenuItem('icon-sales-order', 'Purchase Order',
            '/play/pageheader'),
        new PageMenuItem('icon-account', 'Accounts',
            '/play/pageheader')
    ];


    assetFolder: string;


    constructor(private env: Environment) {
        this.assetFolder = this.env.getValue(AppConfig.AssetFolder);
    }

}

@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-page-header userName="Chad Noll" [notifications]="userNotifications">
            <div class="page-header-center">
                <a class="navbar-brand" tabindex="0" href="/play/">
                    <img class="navbar-logo"
                         src="{{assetFolder}}/images/SAP_Ariba_DB.png"
                         alt="Go to homepage" data-pin-nopin="true">
                </a>
            </div>
        </aw-page-header>

    `
})
class PageHeaderWithNotificationsComponent {
    @ViewChild(PageHeaderComponent)
    header: PageHeaderComponent;

    userNotifications: UserNotification[] = [
        new UserNotification('icon-expense-report', 'Expense report EXP453 has been approved.',
            '/play/'),
        new UserNotification('icon-sales-order', 'Sales Order SO1234 has been created.',
            '/play/'),
        new UserNotification('icon-account', 'Supplier account SA1234 has been updated.',
            '/play/')
    ];

    assetFolder: string;


    constructor(private env: Environment) {
        this.assetFolder = this.env.getValue(AppConfig.AssetFolder);
    }
}
