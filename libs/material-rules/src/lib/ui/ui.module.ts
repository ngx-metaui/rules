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
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import {InputField} from './input/input.component';
import {TextArea} from './text-area/text-area.component';
import {Select} from './select/select.component';
import {Checkbox} from './checkbox/checkbox.component';
import {RadioGroup} from './radio-group/radio-group.component';
import {DatePicker} from './date-picker/date-picker.component';
import {Button} from './button/button.component';
import {StringField} from './string/string.component';
import {AutoComplete} from './autocomplete/autocomplete.component';


@NgModule({
  declarations: [
    InputField,
    StringField,
    TextArea,
    Select,
    Checkbox,
    RadioGroup,
    DatePicker,
    Button,
    AutoComplete
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    InputField,
    TextArea,
    Select,
    StringField,
    Checkbox,
    RadioGroup,
    DatePicker,
    Button,
    AutoComplete

  ],
  exports: [
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    InputField,
    StringField,
    TextArea,
    Select,
    Checkbox,
    RadioGroup,
    DatePicker,
    AutoComplete,
    MatNativeDateModule,
    MatButtonModule,
    MatAutocompleteModule,
    Button
  ]
})
export class UILibModule {
}


