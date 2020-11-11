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
import {ActionBarModule, ButtonModule} from '@fundamental-ngx/core';
import {FdpFormGroupModule} from '@fundamental-ngx/platform';
import {UILibModule} from '../ui/ui.module';
import {MetaForm} from './meta-form/meta-form.component';
import {MetaFormGroup} from './meta-form/meta-form-group/meta-form-group.component';
import {MetaContentPageComponent} from './content-page/content-page.component';
import {MetaHomePageComponent} from './meta-home-page/meta-home.page.component';
import {MetaElementListModule} from './meta-element-list/meta-element-list.module';


@NgModule({
  declarations: [
    MetaForm,
    MetaFormGroup,
    MetaContentPageComponent,
    MetaHomePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FdpFormGroupModule,
    ReactiveFormsModule,
    ActionBarModule,
    ButtonModule,
    MetaUIRulesModule,
    MetaElementListModule,
    UILibModule
  ],
  exports: [
    UILibModule
  ]
})
export class MetaUILibLayoutModule {
}


