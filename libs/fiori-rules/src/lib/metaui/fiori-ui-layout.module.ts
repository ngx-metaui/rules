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
import {MetaFormModule} from './meta-form/meta-form.module';
import {MetaDynamicPageModule} from './meta-dynamic-page/dynamic-page.module';
import {CommonModule} from '@angular/common';
import {MetaElementListModule} from './meta-element-list/element-list.module';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {MetaToolbarActionsModule} from './meta-toolbar-actions/meta-toolbar-actions.module';

@NgModule({
  imports: [
    CommonModule,
    MetaUIRulesModule,
    MetaFormModule,
    MetaDynamicPageModule,
    MetaElementListModule,
    MetaToolbarActionsModule
  ],
  exports: [
    MetaFormModule,
    MetaDynamicPageModule
  ]
})
export class FioriUiLayoutModule {
}


