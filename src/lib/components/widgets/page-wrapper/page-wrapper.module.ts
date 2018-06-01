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
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageLifeCycleService} from './page-lifecycle.service';
import {ObjectPageWrapperComponent} from './object-page-wrapper/object-page-wrapper.component';
import {PageActionsComponent} from './page-actions/page-actions.component';
import {PageContentComponent} from './page-content/page-content.component';
import {PageFooterComponent} from './page-footer/page-footer.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {AWStepperModule} from '../stepper/stepper.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {AWCoreComponentModule} from '../../core/core.module';
import {AWPageNotificationModule} from '../page-notification/page-notification.module';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        ObjectPageWrapperComponent,
        PageActionsComponent,
        PageContentComponent,
        PageFooterComponent,
        PageHeaderComponent,
        SidenavComponent

    ],
    imports: [
        CommonModule,
        RouterModule,
        AWCoreComponentModule,
        AWStepperModule,
        AWPageNotificationModule
    ],
    entryComponents: [
        PageFooterComponent,
        PageActionsComponent,
        PageContentComponent,
        PageHeaderComponent
    ],
    exports: [
        ObjectPageWrapperComponent,
        PageActionsComponent,
        PageContentComponent,
        PageFooterComponent,
        PageHeaderComponent,
        SidenavComponent
    ],
    providers: [PageLifeCycleService]
})
export class AWPageWrapperModule
{
}


