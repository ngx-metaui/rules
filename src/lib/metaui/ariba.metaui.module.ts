/**
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
 */
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIMeta} from './core/uimeta';
import {RuleLoaderService} from './core/rule-loader.service';
import * as sysMetaComponents from './entry-components';
import {AribaMetaUIRoutingModule} from './ariba-metaui-routing.module';
import {AWMetaCoreModule} from './core/meta-core.module';
import {AWMetaLayoutModule} from './layout/meta-layout.module';


/**
 * This module contains everything needs to dynamically generated UI based on metaRules
 * Since we are using primeNG, check AribaComponent if its already imported so you dont have
 * import it again.
 *
 */
@NgModule({
    imports: [
        CommonModule,
        AribaMetaUIRoutingModule,
        AWMetaCoreModule,
        AWMetaLayoutModule
    ],
    exports: [
        AWMetaCoreModule,
        AWMetaLayoutModule
    ],
    providers: [
        {
            'provide': APP_INITIALIZER,
            'useFactory': initMetaUI,
            'deps': [Injector],
            'multi': true,
        },
    ],
})
export class AribaMetaUIModule
{


    constructor()
    {
    }
}

/**
 *
 * Entry factory method that initialize The METAUI layer and here we load WidgetsRules.oss as well
 * as Persistence Rules.
 *
 */
export function initMetaUI(injector: Injector)
{
    let initFce = function init(inj: Injector)
    {
        let promise: Promise<any> = new Promise((resolve: any) =>
        {
            let metaUI = UIMeta.getInstance();

            // access services lazily when they are needed and initialized as workaround for
            // https://github.com/angular/angular/issues/16853
            metaUI.injector = inj;

            metaUI.registerLoader(new RuleLoaderService());
            metaUI.loadDefaultRuleFiles(sysMetaComponents);

            resolve(true);
        });
        return promise;
    };
    return initFce.bind(initFce, injector);
}

