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
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {MatCardModule, MatIconModule} from '@angular/material';
import {UILibModule} from '../ui/ui.module';
import {MetaForm} from './meta-form/meta-form.component';
import {MetaFormGroup} from './meta-form/meta-form-group/meta-form-group.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MetaFormField} from './meta-form/meta-form-field/meta-form-field.component';
import {MetaFormFieldAdapter} from './meta-form/meta-form-field/form-field-adapter.directive';


@NgModule({
  declarations: [
    MetaForm,
    MetaFormGroup,
    MetaFormField,
    MetaFormFieldAdapter
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MetaUIRulesModule,
    UILibModule
  ],
  entryComponents: [
    MetaForm,
    MetaFormGroup,
    MetaFormField
  ],
  exports: [
    MetaForm,
    MetaFormGroup,
    MetaFormField,
    UILibModule
  ]
})
export class MetaUILibLayoutModule {
}


