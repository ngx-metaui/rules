/**
 *
 * @license
 * F. Kolar
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

import {APP_INITIALIZER, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UILibModule} from './ui/ui.module';
import {MetaUILibLayoutModule} from './metaui/meta-ui-layout.module';

import * as entryComponents from './entry-components';
import {WidgetsRulesRule} from './metaui/ts/WidgetsRules.oss';
import {PersistenceRulesRule} from './metaui/ts/PersistenceRules.oss';
import {META_RULES, MetaRules} from '@ngx-metaui/rules';

@NgModule({
  imports: [
    CommonModule,
    UILibModule,
    MetaUILibLayoutModule
  ],
  exports: [UILibModule]
})
export class MaterialRulesModule {


  constructor() {
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialRulesModule,
      providers: [
        {
          'provide': APP_INITIALIZER,
          'useFactory': initLibMetaUI,
          'deps': [Injector],
          'multi': true
        }
      ]
    };
  }
}


/**
 *
 * Entry factory method that initialize The MetaUI layer and here we load WidgetsRules.oss as well
 * as Persistence Rules.
 *
 * I think it should work simply injecting this into Module constructor and loading it from
 * there, but we need to maintain the order how rules are loaded
 *
 */
export function initLibMetaUI(injector: Injector) {
  const initFce = function init(inj: Injector) {

    const promise: Promise<any> = new Promise((resolve: any) => {
      const metaRules: MetaRules = injector.get(META_RULES);
      metaRules.loadUILibSystemRuleFiles(entryComponents, WidgetsRulesRule, PersistenceRulesRule);

      resolve(true);
    });
    return promise;
  };
  return initFce.bind(initFce, injector);
}
