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
import {ChooserComponent} from './chooser.component';
import {AutoCompleteModule} from 'primeng/primeng';
import {AWHyperlinkModule} from '../hyperlink/hyperlink.module';
import {AWCoreComponentModule} from '../../core/core.module';


@NgModule({
    declarations: [
        ChooserComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        AWHyperlinkModule,
        AWCoreComponentModule

    ],
    entryComponents: [
        ChooserComponent
    ],
    exports: [
        ChooserComponent,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: []
})
export class AWChooserModule
{
}


