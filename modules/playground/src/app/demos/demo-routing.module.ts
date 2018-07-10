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
import {Routes, RouterModule} from '@angular/router';
import {MetaUIPageComponent} from './meta-ui/metaui.page.component';
import {FormsPageComponent} from './forms/forms.page.component';
import {DemoPageComponent} from './demo.page.component';
import {UserManagerPageComponent} from './user-manager/user-manager.page';
import {ControlsPageComponent} from './controls-showcase/controls.page.component';
import {
    MetaUIModulePageComponent, ProductContentComponent
} from './meta-ui-modules/metaui-module.page.component';
import {MetaHomePageComponent} from '@aribaui/metaui';
import {OutlinePageComponent} from './outline-demo/outline.page.component';
import {MockServerPageComponent} from './mock-server/mock-server.page.component';
import {ComponentsDemoComponent} from './components/components-demo.component';
import {HomePageDemoComponent} from './components/home-page-demo.component';
import {InputDemoComponent} from './components/input/input-demo.component';
import {ButtonDemoComponent} from './components/button/button-demo.component';
import {TextAreaDemoComponent} from './components/textarea/textarea-demo.component';
import {TextEditorDemoComponent} from './components/richtextarea/texteditor-demo.component';
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
import {MetaUISectionPageComponent} from './meta-ui-sections/metaui-section.page.component';
import {MetaUINestedPageComponent} from './meta-ui-nested/metaui-nested.page.component';
import {StepperDemoComponent} from './components/stepper/stepper-demo.component';
import {ScrollableDemoComponent} from './components/scrollable/scrollable-demo.component';
import {HoverCardDemoComponent} from './components/hover-card/hovercard-demo.component';
import {ListDemoComponent} from './components/list/list-demo.component';
import {CardDemoComponent} from './components/card/card-demo.component';
import {DatatablePageComponent} from './datatable/datatable.page.component';


const routesDemo: Routes = [
    {
        path: 'play', component: DemoPageComponent
    },
    {path: 'play/mock', component: MockServerPageComponent},
    {path: 'play/metaui', component: MetaUIPageComponent},
    {path: 'play/metaui-sections', component: MetaUISectionPageComponent},
    {path: 'play/metaui-nested', component: MetaUINestedPageComponent},
    {path: 'play/forms', component: FormsPageComponent},
    {path: 'play/quickstart1', component: UserManagerPageComponent},
    {path: 'play/controls', component: ControlsPageComponent},
    {path: 'play/outline', component: OutlinePageComponent},
    {path: 'play/table', component: DatatablePageComponent},
    {
        path: 'play/metaui-modules', component: MetaUIModulePageComponent,

        children: [
            {
                path: '',
                component: MetaHomePageComponent
            },
            {
                path: 'home',
                component: MetaHomePageComponent
            },
            {
                path: 'products',
                component: ProductContentComponent
            },
            {
                path: 'help',
                component: MetaHomePageComponent
            },

        ]
    },
    {
        path: 'play/components', component: ComponentsDemoComponent,
        children: [
            {
                path: '',
                component: HomePageDemoComponent
            },
            {
                path: 'input',
                component: InputDemoComponent
            },
            {
                path: 'button',
                component: ButtonDemoComponent
            },
            {
                path: 'textarea',
                component: TextAreaDemoComponent
            },
            {
                path: 'texteditor',
                component: TextEditorDemoComponent
            },
            {
                path: 'datetime',
                component: DateAndTimeDemoComponent
            },
            {
                path: 'dropdown',
                component: DropdownDemoComponent
            },
            {
                path: 'currency',
                component: CurrencyDemoComponent
            },
            {
                path: 'card',
                component: CardDemoComponent
            },
            {
                path: 'chooser',
                component: ChooserDemoComponent
            },
            {
                path: 'checkbox',
                component: CheckboxDemoComponent
            },
            {
                path: 'radio',
                component: RadioButtonDemoComponent
            },
            {
                path: 'checkboxlist',
                component: CheckboxListDemoComponent
            },
            {
                path: 'pagenotification',
                component: PageNotificationDemoComponent
            },
            {
                path: 'radiolist',
                component: RadioListDemoComponent
            },
            {
                path: 'g-chooser',
                component: GenericChooserDemoComponent
            },
            {
                path: 'pageheader',
                component: PageHeaderDemoComponent
            },
            {
                path: 'pagefooter',
                component: PageFooterDemoComponent
            },
            {
                path: 'section',
                component: SectionDemoComponent
            },
            {
                path: 'dialog',
                component: DialogDemoComponent
            },
            {
                path: 'stepper',
                component: StepperDemoComponent
            },
            {
                path: 'scrollable',
                component: ScrollableDemoComponent
            },
            {
                path: 'hovercard',
                component: HoverCardDemoComponent
            },
            {
                path: 'list',
                component: ListDemoComponent
            }
        ]
    }

];


@NgModule({
    imports: [
        RouterModule.forChild(routesDemo),

    ],
    exports: [RouterModule],
    providers: []
})
export class DemoRoutingModule
{
}
