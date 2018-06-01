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
import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {FormattersService} from './core/formatters-service';
import {ComponentRegistry} from './core/component-registry.service';
import * as components from './entry-components';
import {DomUtilsService} from './core/dom-utils.service';
import {ModalService} from './core/modal-service/modal.service';
import {DataProviders} from './core/data/data-providers';
import {DataFinders} from './core/data/data-finders';
import {ErrorManagerService} from './core/error-manager.service';
import {AwNameStore} from './core/aw-name/aw-name.store';
import {DataTypeProviderRegistry} from './core/data/datatype-registry.service';


/**
 *
 * This module is used mainly for tests as importing a module with all the components and you
 * use only 1 or two has a big impact on the performance execution. e.g. from executing couple
 * tests under 1 sec can go up to 10sec if you import all the things that you are not using.
 *
 * I havent noticed anything similar in application its only jasmine/karma that needs to init
 * components for every test.
 *
 */
@NgModule({
    imports: []
})
export class AribaComponentsTestProviderModule
{


    static forRoot (): ModuleWithProviders
    {
        return {
            ngModule: AribaComponentsTestProviderModule,
            providers: [
                ModalService,
                ComponentRegistry,
                ErrorManagerService,
                FormattersService,
                DomUtilsService,
                DataTypeProviderRegistry,
                DataProviders,
                DataFinders,
                AwNameStore,
                {
                    provide: APP_INITIALIZER,
                    useFactory: initComponents,
                    deps: [FormattersService],
                    multi: true,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: registerComponents,
                    deps: [ComponentRegistry],
                    multi: true,
                }
            ]
        };
    }
}


export function initComponents (formatters: FormattersService): Function
{
    return formatters.populate.bind(formatters);
}

export function registerComponents (compRegistry: ComponentRegistry): Function
{
    return compRegistry.initialize.bind(compRegistry, components);
}


