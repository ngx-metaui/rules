/**
 * @license
 * F. Kolar
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
import {
  DatePickerModule as FdDatePickerModule,
  FormModule as FdFormModule,
  InlineHelpModule,
  SelectModule
} from '@fundamental-ngx/core';
import {MoneyComponent} from './money/money.component';
import {StringComponent} from './string/string.component';
import {DatePickerComponent} from './date-picker/date-picker.component';

@NgModule({
  declarations: [
    DatePickerComponent,
    MoneyComponent,
    StringComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FdFormModule,
    InlineHelpModule,
    SelectModule,
    FdDatePickerModule
  ],
  exports: [
    // FormFieldComponent,
    // InputComponent,
    // SelectComponent,
    // RadioGroupComponent,
    // CheckboxComponent,
    // CheckboxGroupComponent,
    // TextAreaComponent,
    // DatePickerComponent,
    // ComboBoxComponent,
    MoneyComponent,
    StringComponent
  ]
})
export class FdpFormModule {
}


