/**
 * @license
 * Copyright 2018 Frank Kolar
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */

import {Context} from '../context';
import {defaultLabelForIdentifier, isBlank} from '../utils/lang';
import {ScopeKey} from '../meta-rules';
import {UIMeta} from '../uimeta';
import {DynamicPropertyValue, PropertyMap, PropertyMapAwaking} from '../policies/merging-policy';

/**
 * Localized string read special syntax out of OSS
 *
 * label: [XX000]"Default Label"
 *
 * In order to extract translated value out of resource files. This was temporary disabled
 * as we are waiting for i18n runtime support in the angular.
 *
 */
export class LocalizedString extends DynamicPropertyValue {

  constructor(protected meta: UIMeta, protected _module: string, protected  _key: string,
              protected _defaultValue: string) {
    super();
  }

  evaluate(context: Context): any {

    // const localizedString: any;
    // let clazz = context.values.get('class');
    // if (isPresent(this._key) && isPresent(this.meta.i18nService)) {
    //     let i18nKey = clazz + '.' + this._key;
    //     localizedString = this.meta.i18nService.instant(i18nKey);
    //
    //     // when it return the same string most likely it means there is no
    //     // translation so default it to null
    //     localizedString = (localizedString === i18nKey) ? null : localizedString;
    // }

    // if (isBlank(localizedString) || this._key === ObjectMeta.KeyField) {
    //     return this._defaultValue;
    // }
    return this._defaultValue;
  }

  toString(): string {
    return 'LocaledString: {' + this._key + ' - ' + this._defaultValue + ' }';
  }
}

export class LocalizedLabelString extends LocalizedString implements PropertyMapAwaking {
  static DefaultModule = 'default';
  propertyAwaking: boolean = true;

  constructor(protected meta: UIMeta) {
    super(meta, LocalizedLabelString.DefaultModule, null, null);
  }

  evaluate(context: Context): any {
    if (isBlank(this._key)) {
      const scopeKey: string = context.values.get(ScopeKey);
      const scopeVal: string = context.values.get(scopeKey);

      this._defaultValue = defaultLabelForIdentifier(scopeVal);

      this._key = scopeKey;
    }
    return super.evaluate(context);
  }

  awakeForPropertyMap(map: PropertyMap): any {
    return new LocalizedLabelString(this.meta);
  }

}
