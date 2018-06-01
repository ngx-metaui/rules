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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InitNestingDirective, OutlineForComponent} from './outline-for.component';
import {AWCoreComponentModule} from '../../core/core.module';
import {OutlineControlComponent} from './outline-control/outline-control.component';

@NgModule({
    declarations: [
        OutlineForComponent,
        OutlineControlComponent,
        InitNestingDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AWCoreComponentModule
    ],
    exports: [
        OutlineForComponent,
        OutlineControlComponent,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: []
})
export class AWOutlineForModule
{
}


