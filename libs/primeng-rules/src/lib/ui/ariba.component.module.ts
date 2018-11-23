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
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  AccordionModule,
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  Checkbox,
  CheckboxModule,
  DataTableModule,
  Dialog,
  DialogModule,
  DropdownModule,
  EditorModule,
  InputTextareaModule,
  InputTextModule,
  MenuModule,
  OverlayPanelModule,
  PaginatorModule,
  PanelModule,
  RadioButtonModule,
  SharedModule,
  TabMenuModule,
  ToolbarModule,
  TreeModule
} from 'primeng/primeng';
import {EmbeddedItemDirective} from './core/embedded-item';
import {AWCoreComponentModule} from './core/core.module';
import {AWCheckBoxListModule} from './widgets/check-box-list/check-box-list.module';
import {AWCheckBoxModule} from './widgets/checkbox/check-box.module';
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
import {AWListModule} from './widgets/list/list.module';
import {DomUtilsService} from './core/dom-utils.service';
import {DataProviders} from './core/data/data-providers';
import {DataFinders} from './core/data/data-finders';
import {ErrorManagerService} from './core/error-manager.service';
import {DataTypeProviderRegistry} from './core/data/datatype-registry.service';
import {ToggleSwitchModule} from './widgets/toggle-switch/toggle-switch.module';

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
    AWCheckBoxModule,
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
    AWListModule,
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
    DataTableModule,
    PaginatorModule,
    OverlayPanelModule,
    TreeModule

  ],
  declarations: [
    // 3th party declaration
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
    AWCheckBoxModule,
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
    EmbeddedItemDirective,
    AWButtonModule,
    AWHoverCardModule,
    AWListModule,
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
    DataTableModule,
    PaginatorModule,
    OverlayPanelModule
  ]
})
export class AribaComponentsModule {


  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AribaComponentsModule,
      providers: [
        ErrorManagerService,
        DomUtilsService,
        DataTypeProviderRegistry,
        DataProviders,
        DataFinders
      ]
    };
  }
}

