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
import {isArray, isBlank, isPresent, isStringMap} from '../../core/utils/lang';
import {ListWrapper, MapWrapper} from '../../core/utils/collection';
import {LocalizedString, UIMeta} from './uimeta';
import {Rule, Selector} from './rule';
import {JsonRule} from './json-rule';
import {Meta, OverrideValue} from './meta';
import {
  ContextFieldPath,
  Expr,
  StaticallyResolvableWrapper,
  StaticDynamicWrapper
} from './property-value';


type DynamicValueType = 'Expr' | 'SDW' | 'CFP' | 'OV' | 'i18n';


export interface RuleLoader {
  loadRules(meta: Meta, source: any, module: string, onRule: (rule: Rule) => void): void;
}

@Injectable()
export class RuleLoaderService implements RuleLoader {

  private _uiMeta: UIMeta;

  constructor() {
  }


  get uiMeta(): UIMeta {
    return this._uiMeta;
  }

  set uiMeta(value: UIMeta) {
    this._uiMeta = value;
  }

  loadRules(meta: Meta, source: any, module: string, onRule: (rule: Rule) => void) {
    this._uiMeta = <UIMeta>meta;
    source.forEach((val: any, index: any) => {
      let rule = this.readRule(val, module);
      if (isPresent(onRule)) {
        onRule(rule);

      }
    });


  }

  loadRulesWithReturn(source: any, module: string): Array<Rule> {

    let rules: Array<Rule> = new Array<Rule>();
    source.forEach((val: any, index: any) => {
      let rule = this.readRule(val, module);
      rules.push(rule);
    });

    return rules;

  }

  private readRule(jsonRule: JsonRule, module: string): Rule {

    let selectors: Array<Selector> = new Array<Selector>();
    for (let item of jsonRule._selectors) {

      if (isPresent(item._value) && item._value.constructor === Object && Object.keys(
        item._value).length === 0) {
        item._value = Meta.NullMarker;
      }

      let selector = new Selector(item._key, item._value, item._isDecl);
      selectors.push(selector);
    }
    let properties = MapWrapper.createFromStringMapWithResolve<any>(jsonRule._properties,
      (k, v) => {
        if (isStringMap(v) &&
          isPresent(v['t'])) {
          return this.resoveValue(
            v['t'], v,
            module);
        } else if (isStringMap(
          v) && !isArray(
          v)) {
          // we have some
          // other sub level
          // of object
          // literal - lets
          // convert this
          // into Map.
          return MapWrapper.createFromStringMapWithResolve<any>(
            v, (key, val) =>
              this.resoveValue(
                val['t'],
                val,
                module));

        } else if (isArray(v)) {
          // let convert with
          // typings as well
          return ListWrapper.clone<string>(
            v);
        }
        return v;
      });
    let props = properties.size === 0 ? undefined : properties;
    let rule: Rule = new Rule(selectors, props, jsonRule._rank);

    return rule;
  }


  // 'Expr' | 'SDW' | 'CFP' | 'OV' | 'i18n';
  private resoveValue(type: DynamicValueType, value: any, module: string): any {
    if (isBlank(value)) {
      return null;
    }

    if (type === 'Expr') {
      return new Expr(value['v']);
    } else if (type === 'SDW') {
      let expr = new Expr(value['v']);
      return new StaticDynamicWrapper(new StaticallyResolvableWrapper(expr));

    } else if (type === 'CFP') {
      return new ContextFieldPath(value['v']);

    } else if (type === 'OV') {
      return new OverrideValue(value['v']);

    } else if (type === 'i18n' && value['v']['key']) {
      let locKey = value['v']['key'];

      return isPresent(this._uiMeta) ? this._uiMeta.createLocalizedString(locKey,
        value['v']['defVal'])
        :
        new LocalizedString(null, module, locKey, value['v']['defVal']);

    }
    return value;

  }
}
