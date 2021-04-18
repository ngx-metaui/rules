import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UILibraryRulePriority, UIMeta, Zones1234} from '@ngx-metaui/rules';
import * as entryComponents from './entry-components';
import {WidgetsRulesRule} from './metaui/ts/WidgetsRules.oss';
import {PersistenceRulesRule} from './metaui/ts/PersistenceRules.oss';
import {FioriUiLayoutModule} from './metaui/fiori-ui-layout.module';

@NgModule({
  imports: [
    CommonModule,
    FioriUiLayoutModule,
    FioriUiLayoutModule
  ],
  exports: [
    FioriUiLayoutModule,
    FioriUiLayoutModule
  ]
})
export class FioriRulesModule {


  constructor() {
  }

  static forRoot(): ModuleWithProviders<FioriRulesModule> {
    return {
      ngModule: FioriRulesModule,
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


export function initLibMetaUI(rules: UIMeta) {
  rules.layoutZones = Zones1234;

  const initFce = function init(rEngine: UIMeta) {
    const promise: Promise<any> = new Promise((resolve: any) => {
      rEngine.loadRuleSource({
        module: 'FioriRules', filePath: 'WidgetsRules.oss',
        content: WidgetsRulesRule
      }, true, UILibraryRulePriority);

      rEngine.loadRuleSource({
        module: 'FioriRules', filePath: 'PersistenceRules.oss',
        content: PersistenceRulesRule
      }, true, UILibraryRulePriority + 2000);


      rEngine.registerComponents(entryComponents);
      resolve(true);
    });
    return promise;
  };
  return initFce.bind(initFce, rules);
}
