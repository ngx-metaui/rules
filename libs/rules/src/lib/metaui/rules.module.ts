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
  ErrorHandler,
  Injector,
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIMeta} from './core/uimeta';
import {RuleLoaderService} from './core/rule-loader.service';
import * as sysMetaComponents from './entry-components';
import {AWMetaCoreModule} from './core/meta-core.module';
import {AWMetaLayoutModule} from './layout/meta-layout.module';
import {MetaUIRulesRoutingModule} from './rules-routing.module';
import {ModalService} from '../components/core/modal-service/modal.service';
import {ComponentRegistry} from '../components/core/component-registry.service';
import {ErrorManagerService} from '../components/core/error-manager.service';
import {DomUtilsService} from '../components/core/dom-utils.service';
import {DataTypeProviderRegistry} from '../components/core/data/datatype-registry.service';
import {DataProviders} from '../components/core/data/data-providers';
import {DataFinders} from '../components/core/data/data-finders';
import {registerComponents} from '../components/ariba.component.module';
import {Meta, Title} from '@angular/platform-browser';
import {Environment} from '../core/config/environment';
import {Notifications} from '../core/messaging/notifications.service';
import {Resource} from '../core/domain/resource.service';
import {AppConfig, makeConfig} from '../core/config/app-config';
import {GlobalErrorHandler} from '../core/global-error-handler';
import {RoutingService} from '../core/routing/routing.service';
import {Router} from '@angular/router';
import {AribaCoreModule, UserConfig} from '../core/ariba.core.module';


/**
 * This module contains everything needs to dynamically generated UI based on metaRules
 * Since we are using primeNG, check AribaComponent if its already imported so you dont have
 * import it again.
 *
 */
@NgModule({
  imports: [
    CommonModule,
    MetaUIRulesRoutingModule,
    AWMetaCoreModule,
    AWMetaLayoutModule,
    AribaCoreModule
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
        // CORE Provides
        Title,
        Meta,
        Environment,
        Notifications,
        Resource,

        {provide: UserConfig, useValue: config},
        {
          provide: AppConfig, useFactory: makeConfig,
          deps: [UserConfig, Injector, Environment]
        },
        {provide: ErrorHandler, useClass: GlobalErrorHandler, deps: [Notifications]},
        {provide: RoutingService, useClass: RoutingService, deps: [Router]},


        // COMPONENTS Providers
        ModalService,
        ComponentRegistry,
        ErrorManagerService,
        DomUtilsService,
        DataTypeProviderRegistry,
        DataProviders,
        DataFinders,
        {
          provide: APP_INITIALIZER,
          useFactory: registerComponents,
          deps: [ComponentRegistry],
          multi: true
        },
        // MetaUI Providers
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
  let initFce = function init(inj: Injector) {
    let promise: Promise<any> = new Promise((resolve: any) => {
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

