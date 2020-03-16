import {APP_INITIALIZER, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UILibModule} from './ui/ui.module';
import {MetaUILibLayoutModule} from './metaui/meta-ui-layout.module';
import {META_RULES, MetaRules} from '@ngx-metaui/rules';
import * as entryComponents from './entry-components';
import {WidgetsRulesRule} from './metaui/ts/WidgetsRules.oss';
import {PersistenceRulesRule} from './metaui/ts/PersistenceRules.oss';

@NgModule({
  imports: [
    CommonModule,
    UILibModule,
    MetaUILibLayoutModule
  ],
  exports: [
    UILibModule
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
