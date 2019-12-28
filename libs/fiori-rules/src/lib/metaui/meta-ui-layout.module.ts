/**
 * @licensess
 * Copyright F. Kolara
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
import {UILibModule} from '../ui/ui.module';
import {MetaForm} from './meta-form/meta-form.component';
import {MetaFormGroup} from './meta-form/meta-form-group/meta-form-group.component';
import {MetaFormField} from './meta-form/meta-form-field/meta-form-field.component';
import {MetaFormFieldAdapter} from './meta-form/meta-form-field/form-field-adapter.directive';
import {MetaObjectDetailComponent} from './object-detail/object-detail.component';
import {MetaContentPageComponent} from './content-page/content-page.component';
import {ActionBarModule, ButtonModule} from '@fundamental-ngx/core';
import {MetaActionListComponent} from './meta-action-list/meta-action-list.component';
import {MetaHomePageComponent} from './meta-home-page/meta-home.page.component';
import {MetaDashboardLayoutComponent} from './meta-dashboard/meta-dashboard-layout.component';
import {MetaDashboardLayoutModule} from './meta-dashboard/meta-dashboard-layout.module';


@NgModule({
  declarations: [
    MetaForm,
    MetaFormGroup,
    MetaFormField,
    MetaFormFieldAdapter,
    MetaObjectDetailComponent,
    MetaContentPageComponent,
    MetaActionListComponent,
    MetaHomePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ActionBarModule,
    ButtonModule,
    MetaUIRulesModule,
    MetaDashboardLayoutModule,
    UILibModule
  ],
  entryComponents: [
    MetaForm,
    MetaObjectDetailComponent,
    MetaContentPageComponent,
    MetaActionListComponent
  ],
  exports: [
    UILibModule
  ]
})
export class MetaUILibLayoutModule {
}


