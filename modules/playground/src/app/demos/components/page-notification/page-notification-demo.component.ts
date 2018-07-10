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
import {PageNotification} from '@aribaui/components';

@Component({
    templateUrl: './page-notification-demo.component.html',
    styleUrls: ['./page-notification-demo.component.scss']
})
export class PageNotificationDemoComponent
{

    successNotification: PageNotification = new PageNotification('success',
        'Success', 'This request has been saved.');

    infoNotification: PageNotification = new PageNotification('info',
        'Information', 'Use the community panel to help you with your questions.');

    warnNotification: PageNotification = new PageNotification('warning',
        'Policy Warning', 'This request requires 3 bids.');

    errorNotification: PageNotification = new PageNotification('error',
        'Error', 'The server is offline!');
}
