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
import {Inject, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';
import {InputField} from './input/input.component';
import {TextArea} from './text-area/text-area.component';
import {Select} from './select/select.component';
import {Checkbox} from './checkbox/checkbox.component';
import {RadioGroup} from './radio-group/radio-group.component';
import {DatePicker} from './date-picker/date-picker.component';
import {Button} from './button/button.component';
import {StringField} from './string/string.component';
import {AutoComplete} from './autocomplete/autocomplete.component';
import {META_RULES, MetaRules} from '@ngx-metaui/rules';

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
    MatAutocompleteModule,
    MatSnackBarModule
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
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000, verticalPosition: 'top'}}
  ]
})
export class UILibModule {

  constructor(@Inject(META_RULES) protected meta: MetaRules, private sf: MatSnackBar) {
    this.meta.registerDependency('matSnackBar', sf);
  }
}


