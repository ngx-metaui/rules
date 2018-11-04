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
 */
import {NgModule} from '@angular/core';
import {
  AribaComponentsModule,
  AribaCoreModule,
  ModalService,
  RoutingService
} from '@ngx-metaui/rules';
import {DemoPageComponent} from './demo.page.component';
import {DemoRoutingModule} from './demo-routing.module';
import {FormsPageComponent} from './forms/forms.page.component';
import {ControlsPageComponent} from './controls-showcase/controls.page.component';
import {CommonModule} from '@angular/common';
import {OutlinePageComponent} from './outline-demo/outline.page.component';
import {ComponentsDemoComponent} from './components/components-demo.component';
import {HomePageDemoComponent} from './components/home-page-demo.component';
import {InputDemoComponent} from './components/input/input-demo.component';
import {ButtonDemoComponent} from './components/button/button-demo.component';
import {TextAreaDemoComponent} from './components/textarea/textarea-demo.component';
import {TextEditorDemoComponent} from './components/richtextarea/texteditor-demo.component';
import {
  AutoCompleteModule,
  CodeHighlighterModule,
  DataTableModule,
  DialogModule,
  EditorModule,
  InputSwitchModule,
  InputTextModule,
  MultiSelectModule,
  SharedModule,
  SliderModule
} from 'primeng/primeng';
import {DateAndTimeDemoComponent} from './components/date-and-time/date-and-time-demo.component';
import {DropdownDemoComponent} from './components/dropdown/dropdown-demo.component';
import {CurrencyDemoComponent} from './components/currency/currency-demo.component';
import {ChooserDemoComponent} from './components/chooser/chooser-demo.component';
import {CheckboxDemoComponent} from './components/checkbox/checkbox-demo.component';
import {RadioButtonDemoComponent} from './components/radio-button/radio-button-demo.component';
import {CheckboxListDemoComponent} from './components/checkbox-list/checkbox-list-demo.component';
import {
  PageNotificationDemoComponent
} from './components/page-notification/page-notification-demo.component';
import {RadioListDemoComponent} from './components/radiobutton-list/radio-list-demo.component';
import {GenericChooserDemoComponent} from './components/generic-chooser/g-chooser-demo.component';
import {PageHeaderDemoComponent} from './components/page-header/page-header-demo.component';
import {PageFooterDemoComponent} from './components/page-footer/page-footer-demo.component';
import {SectionDemoComponent} from './components/section/section-demo.component';
import {DialogDemoComponent} from './components/dialog/dialog-demo.component';

import {StepperDemoComponent} from './components/stepper/stepper-demo.component';
import {
  DemoCardTestComponent,
  ScrollableDemoComponent
} from './components/scrollable/scrollable-demo.component';
import {CardDemoComponent} from './components/card/card-demo.component';
import {HoverCardDemoComponent} from './components/hover-card/hovercard-demo.component';
import {ListDemoComponent} from './components/list/list-demo.component';
import {HttpClientModule} from '@angular/common/http';
import {DatatablePageComponent} from './datatable/datatable.page.component';
import {
  WizardProgressDemoComponent
} from './components/wizard-progress/wizard-progress-demo.component';
import {ToggleSwitchDemoComponent} from './components/toggle-switch/toggle-switch-demo.component';
import {HighlightPipe} from './datatable/highlight-text.pipe';

/**
 * This module contains set of examples how to use some of the key components and also provides
 * developer some playground to start with
 */
@NgModule({
  declarations: [
    DemoPageComponent,
    FormsPageComponent,
    ControlsPageComponent,
    OutlinePageComponent,
    ComponentsDemoComponent,
    HomePageDemoComponent,
    InputDemoComponent,
    ButtonDemoComponent,
    TextAreaDemoComponent,
    TextEditorDemoComponent,
    DateAndTimeDemoComponent,
    DropdownDemoComponent,
    CurrencyDemoComponent,
    CardDemoComponent,
    ChooserDemoComponent,
    CheckboxDemoComponent,
    RadioButtonDemoComponent,
    CheckboxListDemoComponent,
    PageNotificationDemoComponent,
    RadioListDemoComponent,
    GenericChooserDemoComponent,
    PageHeaderDemoComponent,
    PageFooterDemoComponent,
    SectionDemoComponent,
    DialogDemoComponent,
    StepperDemoComponent,
    DemoCardTestComponent,
    ScrollableDemoComponent,
    HoverCardDemoComponent,
    ListDemoComponent,
    DatatablePageComponent,
    WizardProgressDemoComponent,
    ToggleSwitchDemoComponent,
    HighlightPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    InputTextModule,
    EditorModule,
    DataTableModule,
    DialogModule,
    InputSwitchModule,
    SliderModule,
    MultiSelectModule,
    AribaCoreModule,
    AribaComponentsModule,
    DemoRoutingModule,
    AutoCompleteModule,
    CodeHighlighterModule
  ],
  exports: [],
  providers: [RoutingService, ModalService],
  entryComponents: []
})
export class DemoModule {

}
