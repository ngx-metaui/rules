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
import {EmbeddedItemDirective} from './embedded-item';
import {GenericContainerComponent} from './generic-container.component';
import {IncludeComponentDirective} from './include-component.directive';
import {ErrorMessagesComponent} from './error-messages/error-messages.component';
import {ModalComponent} from './modal-service/modal/modal.component';
import {CurrencyFormatPipe} from './pipes/currency-format.pipe';
import {NgForSetDirective} from './on-ngfor-set.directive';
import {InfiniteScrollComponent} from './infite-scroll/infite-scroll.component';
import {AwNameDirective} from './aw-name/aw-name.directive';


@NgModule({
    declarations: [
        EmbeddedItemDirective,
        IncludeComponentDirective,
        GenericContainerComponent,
        ErrorMessagesComponent,
        ModalComponent,
        CurrencyFormatPipe,
        NgForSetDirective,
        InfiniteScrollComponent,
        AwNameDirective
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        GenericContainerComponent,
        ModalComponent
    ],
    exports: [
        EmbeddedItemDirective,
        IncludeComponentDirective,
        GenericContainerComponent,
        ErrorMessagesComponent,
        ModalComponent,
        CurrencyFormatPipe,
        NgForSetDirective,
        InfiniteScrollComponent,
        AwNameDirective
    ]
})
export class AWCoreComponentModule
{
}


