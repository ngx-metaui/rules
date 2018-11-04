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
  evalExpressionWithCntx,
  isBlank,
  isBoolean,
  isFunction,
  isNumber,
  isPresent,
  isString,
  StringJoiner,
  unimplemented
} from '../../core/utils/lang';
import {FieldPath} from '../../core/utils/field-path';
import {isPropertyMapAwaking, Meta, PropertyMap, PropertyMapAwaking, PropertyMerger} from './meta';
import {Context} from './context';


export abstract class DynamicPropertyValue {
  evaluate(context: Context): any {
    return unimplemented();
  }

  bind(context: any): void {
    return unimplemented();
  }


}

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

  constructor(private _expressionString: string) {
    super();

    this.addTypeToContext('Meta', Meta);
    this.addTypeToContext('FieldPath', FieldPath);
  }


  addTypeToContext(name: string, context: any): void {
    if (isFunction(context)) {
      this._extendedObjects.set(name, context);
    }
  }

  evaluate(context: Context): any {
    let index = 0;
    this._extendedObjects.forEach((v, k) => {
      const typeName = `DynObj${index++}`;
      (<any>context)[typeName] = v;

      if (this._expressionString.indexOf(`${k}.`) !== -1) {
        this._expressionString = this._expressionString.replace(`${k}.`, `${typeName}.`);
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

export class DeferredOperationChain extends DynamicPropertyValue implements PropertyMapAwaking {
  propertyAwaking: boolean = true;

  constructor(private _merger: PropertyMerger, private _orig: any, private _override: any) {
    super();
  }


  evaluate(context: Context): any {
    return this._merger.merge(context.resolveValue(this._override),
      context.resolveValue(this._orig),
      context.isDeclare());
  }


  awakeForPropertyMap(map: PropertyMap): any {
    let orig = this._orig;
    let over = this._override;

    if (isPropertyMapAwaking(orig)) {
      orig = (<PropertyMapAwaking>orig).awakeForPropertyMap(map);
    }
    if (isPropertyMapAwaking(over)) {
      over = (<PropertyMapAwaking>over).awakeForPropertyMap(map);
    }
    if (orig !== this._orig || over !== this._override) {
      return new DeferredOperationChain(this._merger, orig, over);
    }
    return this;
  }


  toString(): string {
    const sj = new StringJoiner(['Chain']);
    sj.add('<');
    sj.add(this._merger.toString());
    sj.add('>');
    sj.add(': ');
    sj.add(this._override);
    sj.add(' => ');
    sj.add(this._orig);

    return sj.toString();
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

