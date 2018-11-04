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
 */
import {Component} from '@angular/core';
import {BaseComponent, Environment, PageMenuItem, UserNotification} from '@ngx-metaui/rules';

@Component({
  templateUrl: './page-header-demo.component.html',
  styleUrls: ['./page-header-demo.component.scss']
})
export class PageHeaderDemoComponent extends BaseComponent {


  menuItems: PageMenuItem[] = [
    new PageMenuItem('icon-home', 'Home', '/play/'),
    new PageMenuItem('icon-expense-report', 'Reports',
      '/play/pageheader'),
    new PageMenuItem('icon-sales-order', 'Purchase Order',
      '/play/pageheader'),
    new PageMenuItem('icon-account', 'Accounts',
      '/play/pageheader')
  ];


  userNotifications: UserNotification[] = [
    new UserNotification('icon-expense-report', 'Expense report EXP453 has been approved.',
      '/play/'),
    new UserNotification('icon-sales-order', 'Sales Order SO1234 has been created.',
      '/play/'),
    new UserNotification('icon-account', 'Supplier account SA1234 has been updated.',
      '/play/')
  ];


  constructor(public env: Environment) {
    super(env);
  }
}
