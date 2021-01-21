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
import {
  APP_INITIALIZER,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional
} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {UIMeta} from './core/uimeta';
import {AWMetaCoreModule} from './core/meta-core.module';
import {AWMetaLayoutModule} from './layout/meta-layout.module';
import * as entryComponents from './entry-components';
import {WidgetsRulesRule} from './core/ts/WidgetsRules.oss';
import {SystemRulePriority} from './core/constants';
import {PersistenceRulesRule} from './core/ts/PersistenceRules.oss';
import {RoutingService} from './core/utils/routing.service';
import {makeConfig, MetaConfig, MetaConfigVars} from './core/config/meta-config';
import {Router} from '@angular/router';
import {Environment} from './core/config/environment';

export const AppMetaConfig = new InjectionToken<string>('meta.AppConfig');


/**
 * This module contains everything needs to dynamically generated UI based on meta
 *
 */
@NgModule({
  imports: [
    CommonModule,
    AWMetaCoreModule,
    AWMetaLayoutModule
  ],
  exports: [
    AWMetaCoreModule,
    AWMetaLayoutModule
  ]
})
export class MetaUIRulesModule {

  /**
   *
   * This is a wrapper initializer both for core and components until we separate META and UI
   *
   */
  static forRoot(config: Partial<MetaConfigVars> = {}): ModuleWithProviders<MetaUIRulesModule> {
    return {
      ngModule: MetaUIRulesModule,
      providers: [
        {provide: AppMetaConfig, useValue: config},
        {
          provide: MetaConfig, useFactory: makeConfig,
          deps: [AppMetaConfig, Environment]
        },
        {
          provide: RoutingService,
          useClass: RoutingService,
          deps: [[new Optional(), Router], [new Optional(), Location]]
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initMetaUI,
          deps: [UIMeta],
          multi: true
        }
      ]
    };
  }
}

/**
 *
 * Entry factory method that initialize The METAUI layer and here we load WidgetsRules.oss as well
 * as Persistence Rules.
 *
 */
export function initMetaUI(rules: UIMeta) {
  const initFce = function init(rEngine: UIMeta) {

    const promise: Promise<any> = new Promise((resolve: any) => {
      rEngine.loadRuleSource({
        module: 'Rules', filePath: 'WidgetsRules.oss',
        content: WidgetsRulesRule
      }, true, SystemRulePriority);

      rEngine.loadRuleSource({
        module: 'Rules', filePath: 'PersistenceRules.oss',
        content: PersistenceRulesRule
      }, true, SystemRulePriority + 2000);
      rEngine.registerComponents(entryComponents);

      if (rEngine.config.preloadApplicationRule()) {
        rEngine.loadApplicationRule();
      }
      resolve(true);
    });
    return promise;
  };
  return initFce.bind(initFce, rules);
}

