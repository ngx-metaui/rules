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
import {isDevMode} from '@angular/core';
import {BooleanWrapper, isPresent, NumberWrapper} from '../utils/lang';
import {MapWrapper} from '../utils/collection';
import {Environment} from './environment';


/**
 * This is now absolute as i18n was removed
 */
const SuportedLanguages = ['en', 'fr'];


/**
 * Simple Configuration implementation  which let us configure MetaUI during a bootstrap
 * phase.
 *
 */
export class MetaConfig {
  static readonly IsDevMode = 'devmode.enabled';
  static readonly UserAgent = 'useragent';
  static readonly Lang = 'lang';
  static readonly SupportedLangs = 'supportedlang';
  static readonly Direction = 'dir';
  static readonly i18nEnabled = 'i18n.enabled';
  static readonly InTest = 'env.test';
  testUrl: string;
  private values: Map<string, any>;

  constructor(public environment: Environment) {
    this.values = new Map<string, any>();
  }


  /**
   *
   * Called by factory method to initialize this config class
   *
   */
  init(config: { [key: string]: any }) {
    this.initDefaults();
    if (isPresent(config)) {
      const values: Map<string, any> = MapWrapper.createFromStringMap<any>(config);
      values.forEach((v: any, k: any) => this.set(k, v));
    }
  }

  /**
   * Sets values to configuration. to make sure we will not run into case-sensitive problems we
   * are converting all keys into lowercase
   *
   */
  set(key: string, value: any): void {
    this.values.set(key.toLowerCase(), value);

    if (key.toLowerCase() === MetaConfig.InTest) {
      this.environment.inTest = value;
    }
  }


  /**
   * Sets values to configuration
   * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
   * simply map keys from this.values into lowercase and then check if it has a key
   */
  get(key: string): any {
    if (this.values.has(key.toLowerCase())) {
      return this.values.get(key.toLowerCase());
    }
    return null;
  }


  getNumber(key: string): number {
    const val = this.get(key);
    return NumberWrapper.parseIntAutoRadix(val);
  }


  getBoolean(key: string): boolean {
    const val = this.get(key);
    return BooleanWrapper.boleanValue(val);
  }

  isProductionMode(): boolean {
    return !this.getBoolean(MetaConfig.IsDevMode);
  }

  private initDefaults() {

    this.set(MetaConfig.IsDevMode, isDevMode());
    this.set(MetaConfig.UserAgent, window.navigator.userAgent);
    this.set(MetaConfig.Direction, document.documentElement.dir);
    this.set(MetaConfig.i18nEnabled, true);
    this.set(MetaConfig.InTest, false);

    if (!this.values.has(MetaConfig.Lang)) {
      this.set(MetaConfig.Lang, window.navigator.language);
    }

    if (!this.values.has(MetaConfig.SupportedLangs)) {
      this.set(MetaConfig.SupportedLangs, SuportedLanguages);
    }
  }

}


/**
 * Factory instantiate MetaConfig provider
 *
 */
export function makeConfig(config: { [key: string]: any }, env: Environment): MetaConfig {
  const conf: MetaConfig = new MetaConfig(env);

  conf.init(config);
  return conf;
}

