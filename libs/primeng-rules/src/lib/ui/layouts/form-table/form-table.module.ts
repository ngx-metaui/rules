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
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormTableComponent} from './form-table.component';
import {FormRowComponent} from './form-row/form-row.component';
import {
  BottomZoneComponent,
  LeftZoneComponent,
  MiddleZoneComponent,
  RightZoneComponent,
  TopZoneComponent
} from '../five-zone-layout.component';
import {AWCoreComponentModule} from '../../core/core.module';


@NgModule({
  declarations: [
    FormTableComponent,
    FormRowComponent,
    TopZoneComponent,
    LeftZoneComponent,
    RightZoneComponent,
    MiddleZoneComponent,
    BottomZoneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    AWCoreComponentModule
  ],
  entryComponents: [
    FormTableComponent,
    FormRowComponent,
    TopZoneComponent,
    LeftZoneComponent,
    RightZoneComponent,
    MiddleZoneComponent,
    BottomZoneComponent
  ],
  exports: [
    FormTableComponent,
    FormRowComponent,
    TopZoneComponent,
    LeftZoneComponent,
    RightZoneComponent,
    MiddleZoneComponent,
    BottomZoneComponent
  ]
})
export class AWFormTableModule {
}


