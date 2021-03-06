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
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import {UIModule} from '../ui/ui.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MetaContentPageComponent} from './meta-content-page/meta-content-page.component';
import {MetaActionListComponent} from './meta-action-list/meta-action-list.component';
import {MetaElementListComponent} from './meta-element-list/meta-element-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MetaFFAdapter} from './meta-form/form-field-adapter.directive';
import {MetaFormGroup} from './meta-form/meta-form-group.component';


const routes: Routes = [
  {path: 'object-detail', component: MetaContentPageComponent}
];

@NgModule({
  declarations: [
    MetaFormGroup,
    MetaFFAdapter,
    MetaContentPageComponent,
    MetaActionListComponent,
    MetaElementListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MetaUIRulesModule,
    UIModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MetaFormGroup,
    MetaFFAdapter,
    MetaContentPageComponent,
    UIModule
  ]
})
export class LayoutModule {
}


