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
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AWCoreComponentModule} from '../../core/core.module';
import {GenericChooserComponent} from './generic-chooser.component';
import {AWCheckBoxListModule} from '../check-box-list/check-box-list.module';
import {AWChooserModule} from '../chooser/chooser.module';
import {AWRadioButtonListModule} from '../radio-button-list/radio-button-list.module';
import {AWDropdownModule} from '../dropdown/dropdown.module';


@NgModule({
    declarations: [
        GenericChooserComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AWCoreComponentModule,
        AWDropdownModule,
        AWCheckBoxListModule,
        AWChooserModule,
        AWRadioButtonListModule
    ],
    entryComponents: [
        GenericChooserComponent
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        GenericChooserComponent
    ]
})
export class AWGenericChooserModule
{
}


