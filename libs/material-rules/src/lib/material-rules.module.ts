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

import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIModule} from './ui/ui.module';
import {LayoutModule} from './metaui/meta-ui-layout.module';

import * as entryComponents from './entry-components';
import {WidgetsRulesRule} from './metaui/ts/WidgetsRules.oss';
import {PersistenceRulesRule} from './metaui/ts/PersistenceRules.oss';
import {UILibraryRulePriority, UIMeta} from '@ngx-metaui/rules';

@NgModule({
  imports: [
    CommonModule,
    UIModule,
    LayoutModule
  ],
  exports: [
    UIModule,
    LayoutModule
  ]
})
export class MaterialRulesModule {


  constructor() {
  }

  static forRoot(): ModuleWithProviders<MaterialRulesModule> {
    return {
      ngModule: MaterialRulesModule,
      providers: [
        {
          'provide': APP_INITIALIZER,
          'useFactory': initLibMetaUI,
          'deps': [UIMeta],
          'multi': true
        }
      ]
    };
  }
}


export function initLibMetaUI(rules: UIMeta): Function {
  return (): Promise<any> => new Promise(resolve => {
    rules.loadRuleSource({
      module: 'MaterialRules', filePath: 'WidgetsRules.oss',
      content: WidgetsRulesRule
    }, true, UILibraryRulePriority);

    rules.loadRuleSource({
      module: 'MaterialRules', filePath: 'PersistenceRules.oss',
      content: PersistenceRulesRule
    }, true, UILibraryRulePriority + 2000);

    rules.registerComponents(entryComponents);
    rules.loadApplicationRule();

    resolve();
  });
}
