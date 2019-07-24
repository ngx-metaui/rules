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
import {Injectable} from '@angular/core';
import {isArray, isBlank, isPresent, isStringMap} from './utils/lang';
import {ListWrapper, MapWrapper} from './utils/collection';
import {Rule, Selector} from './rule';
import {JsonRule} from './json-rule';
import {
  ContextFieldPath,
  Expr,
  StaticallyResolvableWrapper,
  StaticDynamicWrapper
} from './property-value';
import {MetaRules, NullMarker} from './meta-rules';
import {OverrideValue} from './policies/merging-policy';
import {LocalizedString} from './i18n/localized-string';


type DynamicValueType = 'Expr' | 'SDW' | 'CFP' | 'OV' | 'i18n';


export interface RuleLoader {
  loadRules(meta: MetaRules, source: any, module: string, onRule: (rule: Rule) => void): void;
}

/**
 *
 * @deprecated
 */
@Injectable()
export class RuleLoaderService implements RuleLoader {

  private _meta: MetaRules;

  constructor() {
  }


  loadRules(meta: MetaRules, source: any, module: string, onRule: (rule: Rule) => void) {
    this._meta = meta;

    source.forEach((val: any, index: any) => {
      const rule = this.readRule(val, module);
      if (isPresent(onRule)) {
        onRule(rule);

      }
    });


  }

  loadRulesWithReturn(source: any, module: string): Array<Rule> {
    const rules: Array<Rule> = new Array<Rule>();
    source.forEach((val: any, index: any) => {
      const rule = this.readRule(val, module);
      rules.push(rule);
    });

    return rules;

  }

  private readRule(jsonRule: JsonRule, module: string): Rule {

    const selectors: Array<Selector> = new Array<Selector>();
    for (const item of jsonRule._selectors) {

      if (isPresent(item._value) && item._value.constructor === Object && Object.keys(
        item._value).length === 0) {
        item._value = NullMarker;
      }

      const selector = new Selector(item._key, item._value, item._isDecl);
      selectors.push(selector);
    }
    const properties = MapWrapper.createFromStringMapWithResolve<any>(jsonRule._properties,
      (k, v) => {

        if (isStringMap(v) && isPresent(v['t'])) {
          return this.resoveValue(v['t'], v, module);

        } else if (isStringMap(v) && !isArray(v)) {
          // we have some other sub level of object literal - lets convert this into Map.
          return MapWrapper.createFromStringMapWithResolve<any>(v, (key, val) =>
            this.resoveValue(val['t'], val, module));

        } else if (isArray(v)) {
          // let convert with typings as well
          return ListWrapper.clone<string>(v);
        }
        return v;
      });
    const props = properties.size === 0 ? undefined : properties;
    const rule: Rule = new Rule(selectors, props, jsonRule._rank);

    return rule;
  }


  // 'Expr' | 'SDW' | 'CFP' | 'OV' | 'i18n';
  private resoveValue(type: DynamicValueType, value: any, module: string): any {
    if (isBlank(value)) {
      return null;
    }

    if (type === 'Expr') {
      return new Expr(value['v'], this._meta);
    } else if (type === 'SDW') {
      const expr = new Expr(value['v'], this._meta);
      return new StaticDynamicWrapper(new StaticallyResolvableWrapper(expr));

    } else if (type === 'CFP') {
      return new ContextFieldPath(value['v']);

    } else if (type === 'OV') {
      return new OverrideValue(value['v']);

    } else if (type === 'i18n' && value['v']['key']) {
      const locKey = value['v']['key'];

      return isPresent(this._meta) ? this._meta.createLocalizedString(locKey,
        value['v']['defVal'])
        :
        new LocalizedString(null, module, locKey, value['v']['defVal']);

    }
    return value;

  }
}
