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
import {NgModule} from '@angular/core';
import {CommonModule, Location, LocationStrategy} from '@angular/common';
import {AWMetaCoreModule} from './core/meta-core.module';
import {AWMetaLayoutModule} from './layout/meta-layout.module';
import {MetaUIRulesModule} from './rules.module';
import {MockLocationStrategy, SpyLocation} from '@angular/common/testing';


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
export class MetaUITestRulesModule {

  static forRoot(config: { [key: string]: any } = {}): MetaUITestRulesModule {
    return {
      ngModule: MetaUITestRulesModule,
      providers: [
        ...MetaUIRulesModule.forRoot(config).providers,
        {provide: Location, useClass: SpyLocation},
        {provide: LocationStrategy, useClass: MockLocationStrategy}
      ]
    };
  }
}
