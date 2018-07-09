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
import {FormsModule} from '@angular/forms';
import {AWCoreComponentModule} from '../../core/core.module';
import {AWOutlineForModule} from '../outline/outline-for.module';
import {Datatable2Component} from './datatable2.component';
import {DTWrapper} from './table-wrapper/table-wrapper.component';
import {DTColumn2Component} from './column/dt-column.component';
import {AWInputFieldModule} from '../input-field/input-field.module';
import {DTHeaderComponent2} from './header/header.component';
import {DTDetailRowComponent} from './column/detail-row/dt-detail-row.component';
import {
    DTDetailRowExpanderComponent
} from './column/detail-row-expander/dt-detail-row-expander.component';
import {
    DTMultiSelectColumnComponent
} from './column/multi-select/dt-multi-select-column.component';
import {AWCheckBoxModule} from '../checkbox/check-box.module';
import {
    DTSingleSelectColumnComponent
} from './column/single-select/dt-single-select-column.component';
import {AWRadioButtonModule} from '../radio-button/radio-button.module';
import {SetCellMaxWidthDirective} from './directives/dt-cell-directives';
import {DTDraggableRowDirective} from './directives/dt-draggable-row.directive';


@NgModule({
    declarations: [
        Datatable2Component,
        DTWrapper,
        DTColumn2Component,
        DTHeaderComponent2,
        DTDetailRowComponent,
        DTDetailRowExpanderComponent,
        DTMultiSelectColumnComponent,
        DTSingleSelectColumnComponent,
        SetCellMaxWidthDirective,
        DTDraggableRowDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        AWCoreComponentModule,
        AWCheckBoxModule,
        AWOutlineForModule,
        AWRadioButtonModule,
        AWInputFieldModule
    ],
    entryComponents: [
        DTDetailRowExpanderComponent,
        DTMultiSelectColumnComponent,
        DTSingleSelectColumnComponent
    ],
    exports: [
        Datatable2Component,
        DTColumn2Component,
        AWOutlineForModule,
        DTHeaderComponent2,
        DTDetailRowComponent
    ],
    providers: []
})
export class AWDatatable2Module
{
}



