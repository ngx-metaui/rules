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
  Injector,
  ModuleWithProviders,
  NgModule,
  Optional
} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule, Location} from '@angular/common';
import {UIMeta} from './core/uimeta';
import {RuleLoaderService} from './core/rule-loader.service';
import * as sysMetaComponents from './entry-components';
import {AWMetaCoreModule} from './core/meta-core.module';
import {Environment} from './core/config/environment';
import {RoutingService} from './core/utils/routing.service';
import {ComponentRegistry} from './core/component-registry.service';
import {makeConfig, MetaConfig} from './core/config/meta-config';
import {META_RULES, MetaRules} from './core/meta-rules';
import {DomUtilsService} from './layout/core/dom-utils.service';
import {AWMetaLayoutModule} from './layout/meta-layout.module';


export const AppMetaConfig = new InjectionToken<string>('meta.AppConfig');


/**
 * This module contains everything needs to dynamically generated UI based on metaRules
 * Since we are using primeNG, check AribaComponent if its already imported so you dont have
 * import it again.
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
  static forRoot(config: { [key: string]: any } = {}): ModuleWithProviders {
    return {
      ngModule: MetaUIRulesModule,
      providers: [
        Environment,
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

        ComponentRegistry,
        DomUtilsService,
        RuleLoaderService,
        {
          provide: META_RULES,
          useClass: UIMeta,
          deps: [ComponentRegistry, Environment, MetaConfig, RuleLoaderService, RoutingService]
        },
        {
          'provide': APP_INITIALIZER,
          'useFactory': initMetaUI,
          'deps': [Injector],
          'multi': true
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
export function initMetaUI(injector: Injector) {
  const initFce = function init(inj: Injector) {

    const promise: Promise<any> = new Promise((resolve: any) => {
      const metaRules: MetaRules = injector.get(META_RULES);
      metaRules.loadSystemRuleFiles(sysMetaComponents);

      resolve(true);
    });
    return promise;
  };
  return initFce.bind(initFce, injector);
}

