/**
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
 */
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {MetaActionListComponent} from './meta-action-list/meta-action-list.component';
import {MetaContentPageComponent} from './meta-content-page/meta-content-page.component';
import {MetaDashboardLayoutComponent} from './meta-dashboard/metadashboard-layout.component';
import {MetaElementListComponent} from './meta-element-list/meta-element-list.component';
import {MetaHomePageComponent} from './meta-home-page/meta-home.page.component';
import {MetaObjectDetailComponent} from './meta-object-detail/meta-object-detail.component';
import {MetaSectionsComponent} from './meta-section/meta-sections.component';
import {AribaComponentsModule} from '../ui/ariba.component.module';
import {MetaFormTableComponent} from './meta-form/meta-form-table/meta-form-table.component';
import {MetaFormComponent} from './meta-form/meta-form.component';
import {MetaFormRowComponent} from './meta-form/meta-form-row/meta-form-row.component';


@NgModule({
  declarations: [
    MetaActionListComponent,
    MetaContentPageComponent,
    MetaDashboardLayoutComponent,
    MetaElementListComponent,
    MetaFormComponent,
    MetaFormTableComponent,
    MetaFormRowComponent,
    MetaHomePageComponent,
    MetaObjectDetailComponent,
    MetaSectionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MetaUIRulesModule,
    AribaComponentsModule

  ],
  entryComponents: [
    MetaActionListComponent,
    MetaContentPageComponent,
    MetaDashboardLayoutComponent,
    MetaElementListComponent,
    MetaFormComponent,
    MetaFormTableComponent,
    MetaFormRowComponent,
    MetaHomePageComponent,
    MetaObjectDetailComponent,
    MetaSectionsComponent
  ],
  exports: [
    MetaActionListComponent,
    MetaContentPageComponent,
    MetaDashboardLayoutComponent,
    MetaElementListComponent,
    MetaFormComponent,
    MetaFormTableComponent,
    MetaFormRowComponent,
    MetaHomePageComponent,
    MetaObjectDetailComponent,
    MetaSectionsComponent,
    AribaComponentsModule
  ],
  providers: []
})
export class MetaUILibLayoutModule {
}


