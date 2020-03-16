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

import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {Checkbox, CheckboxModule} from 'primeng/checkbox';
import {Dialog, DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SharedModule} from 'primeng/shared';
import {TabMenuModule} from 'primeng/tabmenu';
import {ToolbarModule} from 'primeng/toolbar';
import {TreeModule} from 'primeng/tree';
import {AWCoreComponentModule} from './core/core.module';
import {AWCheckBoxListModule} from './widgets/check-box-list/check-box-list.module';
import {AWChooserModule} from './widgets/chooser/chooser.module';
import {AWCurrencyModule} from './widgets/currency/currency.module';
import {AWDateAndTimeModule} from './widgets/date-and-time/data-and-time.module';
import {AWDropdownModule} from './widgets/dropdown/dropdown.module';
import {AWGenericChooserModule} from './widgets/generic-chooser/generic-chooser.module';
import {AWHyperlinkModule} from './widgets/hyperlink/hyperlink.module';
import {AWInputFieldModule} from './widgets/input-field/input-field.module';
import {AWOutlineForModule} from './widgets/outline/outline-for.module';
import {AWOverlayModule} from './widgets/overlay/overlay.module';
import {AWRadioButtonModule} from './widgets/radio-button/radio-button.module';
import {AWRadioButtonListModule} from './widgets/radio-button-list/radio-button-list.module';
import {AWHoverCardModule} from './widgets/hover-card/hover-card.module';
import {AWSectionModule} from './widgets/section/section.module';
import {AWStringFieldModule} from './widgets/string/string.module';
import {AWTextAreaModule} from './widgets/text-area/text-area.module';
import {AWButtonModule} from './widgets/button/button.module';
import {AWFormTableModule} from './layouts/form-table/form-table.module';
import {ToggleSwitchModule} from './widgets/toggle-switch/toggle-switch.module';
import {NotFoundComponent} from './widgets/not-found/not-found.component';

/**
 * Component module is core module for the common layouts and widgets libraries.
 *
 * todo: There are some things that I still need to resolve - please see and notices @Duplicates
 * jsdoc I want to keep this there to remind me that I need to refactor this as of now there are
 * not much option with angular.
 *
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AWCoreComponentModule,
    AWCheckBoxListModule,
    AWChooserModule,
    AWCurrencyModule,
    AWDateAndTimeModule,
    AWDropdownModule,
    AWGenericChooserModule,
    AWHyperlinkModule,
    AWInputFieldModule,
    AWOutlineForModule,
    AWOverlayModule,
    AWRadioButtonModule,
    AWRadioButtonListModule,
    AWSectionModule,
    AWStringFieldModule,
    AWTextAreaModule,
    AWFormTableModule,
    AWButtonModule,
    AWHoverCardModule,
    ToggleSwitchModule,

    // PrimeNG remove when all AW are imported
    PanelModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    SharedModule,
    DialogModule,
    MenuModule,
    TabMenuModule,
    AccordionModule,
    EditorModule,
    PaginatorModule,
    OverlayPanelModule,
    TreeModule

  ],
  declarations: [
    NotFoundComponent
  ],
  bootstrap: [],
  entryComponents: [

    // PrimeNG
    Checkbox,
    Dialog
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AWCoreComponentModule,
    AWCheckBoxListModule,
    AWChooserModule,
    AWCurrencyModule,
    AWDateAndTimeModule,
    AWDropdownModule,
    AWGenericChooserModule,
    AWHyperlinkModule,
    AWInputFieldModule,
    AWOutlineForModule,
    AWOverlayModule,
    AWRadioButtonModule,
    AWRadioButtonListModule,
    AWSectionModule,
    AWStringFieldModule,
    AWTextAreaModule,
    AWFormTableModule,
    AWButtonModule,
    AWHoverCardModule,
    ToggleSwitchModule,

    // PrimeNG
    SharedModule,
    PanelModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    DialogModule,
    MenuModule,
    TabMenuModule,
    EditorModule,
    PaginatorModule,
    OverlayPanelModule
  ]
})
export class AribaComponentsModule {
}

