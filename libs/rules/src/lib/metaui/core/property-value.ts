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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {
  BooleanWrapper,
  defaultLabelForIdentifier,
  evalExpressionWithCntx,
  isBlank,
  isBoolean,
  isFunction,
  isNumber,
  isPresent,
  isString,
  isStringMap,
  StringJoiner
} from './utils/lang';
import {FieldPath} from './utils/field-path';
import {Context} from './context';

import {KeyField, KeyLayout, MetaRules} from './meta-rules';
import {
  DynamicPropertyValue,
  isPropertyMapAwaking,
  PropertyMap,
  PropertyMapAwaking
} from './policies/merging-policy';


export interface DynamicSettablePropertyValue {
  settable: boolean;

  evaluateSet(context: Context, value: any): void;
}

/**
 * ;marker; interface for DynamicPropertyValues that depend only on their match context and
 * therefore can be computed and cached statically in the Context Activation tree
 */
export class StaticallyResolvable extends DynamicPropertyValue {


}


export class StaticDynamicWrapper extends StaticallyResolvable implements PropertyMapAwaking {
  private _cached: any;
  propertyAwaking: boolean = true;

  constructor(private _orig: StaticallyResolvable) {
    super();
  }


  getDynamicValue(): StaticallyResolvable {
    return this._orig;
  }

  awakeForPropertyMap(map: PropertyMap): any {
    // copy ourselves so there's a fresh copy for each context in which is appears

    const origaw = (isPropertyMapAwaking(this._orig)) ?
      <StaticallyResolvable>(<PropertyMapAwaking>this._orig).awakeForPropertyMap(map)
      : this._orig;
    return new StaticDynamicWrapper(origaw);
  }

  evaluate(context: Context): any {
    // we lazily static evaluate our value and cache the result
    if (isBlank(this._cached)) {
      this._cached = context.staticallyResolveValue(this._orig);
    }
    return this._cached;
  }


  toString(): string {
    const sj = new StringJoiner(['StaticDynamicWrapper']);
    sj.add('(');
    sj.add(((isPresent(this._cached)) ? this._cached : this._orig));
    sj.add(((isBlank(this._cached)) ? ' unevaluated' : ''));
    sj.add(')');

    return sj.toString();
  }

}

// Wrapper that marks a normally dynamic value (e.g. an Expr) as StaticallyResolvable
export class StaticallyResolvableWrapper extends StaticallyResolvable {

  constructor(private _orig: DynamicPropertyValue) {
    super();
  }

  evaluate(context: Context): any {
    return this._orig.evaluate(context);
  }

  toString(): string {
    const sj = new StringJoiner(['StaticallyResolvableWrapper']);
    sj.add('(');
    sj.add(this._orig.toString());
    sj.add(')');

    return sj.toString();
  }
}


export class ContextFieldPath extends DynamicPropertyValue implements DynamicSettablePropertyValue {
  settable: boolean = true;

  protected fieldPath: FieldPath;

  constructor(path: string) {
    super();

    this.fieldPath = new FieldPath(path);
  }

  evaluate(context: Context): any {
    return this.fieldPath.getFieldValue(context);
  }

  evaluateSet(context: Context, value: any): void {

    this.fieldPath.setFieldValue(context, value);
  }
}

export function isDynamicSettable(arg: any): arg is DynamicSettablePropertyValue {
  return isPresent(arg.settable);
}


export class Expr extends DynamicPropertyValue {
  private _extendedObjects: Map<string, any> = new Map<string, any>();

  constructor(private _expressionString: string, private meta: MetaRules) {
    super();
    this.addDepencyToContext('FieldPath', FieldPath);
  }


  addDepencyToContext(name: string, context: any): void {
    if (isFunction(context) || isStringMap(context)) {
      this._extendedObjects.set(name, context);
    }
  }

  evaluate(context: Context): any {
    if (this.meta && this.meta.contextDependencies().size > 0) {
      this.meta.contextDependencies().forEach((v, k) => {
        this.addDepencyToContext(k, v);
      });
    }

    let index = 0;
    this._extendedObjects.forEach((v, k) => {
      const typeName = `DynObj${index++}`;
      (<any>context)[typeName] = v;

      if (this._expressionString.indexOf(`${k}.`) !== -1) {
        this._expressionString = this._expressionString.replace(`${k}.`, `${typeName}.`);

      } else if (this._expressionString.indexOf(`this.${k}`) !== -1) {
        this._expressionString = this._expressionString.replace(`this.${k}`, `${typeName}`);
      }
    });

    const result = evalExpressionWithCntx(this._expressionString, '', context, context);

    index = 0;
    this._extendedObjects.forEach((v, k) => {
      const typeName = `DynObj${index++}`;
      if (isPresent((<any>context)[typeName])) {
        delete (<any>context)[typeName];
        // check if we can use undefined. Delete is pretty slow
      }
    });
    return result;
  }

  toString(): string {
    const sj = new StringJoiner(['expr:']);
    sj.add('(');
    sj.add(this._expressionString);
    sj.add(')');

    return sj.toString();
  }
}


export class DefaultLabelGenerator extends StaticallyResolvable {


  constructor(private _key: string) {
    super();
  }

  evaluate(context: Context): any {
    const fieldName = context.values.get(this._key);

    return (isPresent(fieldName) && isString(fieldName)) ? defaultLabelForIdentifier(fieldName) :
      null;
  }
}

export class PropFieldsByZoneResolver extends StaticallyResolvable {


  evaluate(context: Context): any {
    let m = context.meta.itemNamesByZones(context, KeyField, context.meta.zones(context));
    const zonePath = context.meta.zonePath(context);

    if (zonePath) {
      m = <Map<string, any>>FieldPath.getFieldValue(m, zonePath);
      if (!m) {
        m = new Map<string, any>();
      }
    }
    return m;
  }
}

export class PropFieldPropertyListResolver extends StaticallyResolvable {

  evaluate(context: Context): any {
    return context.meta.fieldList(context);
  }
}

export class PropLayoutsByZoneResolver extends StaticallyResolvable {

  evaluate(context: Context): any {
    return context.meta.itemNamesByZones(context, KeyLayout,
      context.meta.zones(context));
  }
}


export class ValueConverter {

  static value(toType: string, value: any): any {

    if (toType === 'String') {
      if (isBlank(value) || isString(value)) {
        return value;
      }
      return value.toString();

    } else if (toType === 'Boolean') {
      if (isBlank(value) || isBoolean(value)) {
        return value;
      }

      return BooleanWrapper.boleanValue(value);

    } else if (toType === 'Number') {
      if (isBlank(value) || isNumber(value)) {
        return value;
      }

      // ignore dec. points for now
      return parseInt(value.toString());
    }
    return value;

  }
}
