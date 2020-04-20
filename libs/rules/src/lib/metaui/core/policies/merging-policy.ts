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


/**
 * Define policy for merging a property value assigned by one rule
 * to a subsequent value from a higher ranked rule.
 */
import {
  BooleanWrapper,
  isArray,
  isBlank,
  isBoolean,
  isPresent,
  isString,
  objectEquals,
  shiftLeft,
  StringJoiner,
  toList,
  unimplemented
} from '../utils/lang';
import {ListWrapper, MapWrapper} from '../utils/collection';
import {FieldPath} from '../utils/field-path';
import {
  FieldPathNullMarker,
  KeyAny,
  KeyField,
  KeyValue,
  MetaRules,
  NullMarker,
  ValueQueriedObserver
} from '../meta-rules';
import {Match, MatchValue, MultiMatchValue, ValueMatches} from '../match';
import {KeyValueTransformer} from '../tranformers';
import {Context} from '../context';


export abstract class DynamicPropertyValue {
  evaluate(context: Context): any {
    return unimplemented();
  }

  bind(context: any): void {
    return unimplemented();
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


export abstract class PropertyMerger {

  metaRules: MetaRules;

  /**
   * Called during rule application to merge an earlier (lower ranked) value with a newer one.
   * @param orig the previous value accumulated in the property map
   * @param override the new value from the higher ranked rule
   * @param isDeclare whether we are currently accumulating matched for declarations of the
   *     property/value
   * @return the new property value to be put in the property map
   */
  merge(orig: any, override: any, isDeclare: boolean): any {
    return unimplemented();
  }

  abstract toString(): string;
}


/**
 *  marker interface for PropertyMerges that can handle dynamic values
 */
export abstract class PropertyMergerDynamic extends PropertyMerger {


  toString(): string {
    return 'PropertyMergerDynamic';
  }
}


/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
export class PropertyManager {
  _merger: PropertyMerger;
  _keyDataToSet: KeyData;


  constructor(public _name: string) {
  }


  mergeProperty(propertyName: string, orig: any, newValue: any, isDeclare: boolean): any {
    if (isBlank(orig)) {
      return newValue;
    }

    if (newValue instanceof OverrideValue) {
      return (<OverrideValue>newValue).value();
    }

    if (isBlank(this._merger)) {
      // Perhaps should have a data-type-based merger registry?
      if (orig instanceof Map) {
        if (isPresent(newValue) && newValue instanceof Map) {
          // merge maps
          // todo: TEST check outcome of the merge and compare
          const origClone = MapWrapper.clone<string, any>(orig);
          newValue = MapWrapper.mergeMapIntoMapWithObject(origClone, newValue, true);
        }
      }
      return newValue;
    }

    if (!(this._merger instanceof PropertyMergerDynamic) &&
      (orig instanceof DynamicPropertyValue || newValue instanceof DynamicPropertyValue)) {

      return new DeferredOperationChain(this._merger, orig, newValue);
    }

    return this._merger.merge(orig, newValue, isDeclare);
  }

}


/**
 * KeyData is the primary structure for representing information about context keys
 * (e.g. 'class', 'layout', 'operation', 'field', ...), including an index of rules
 * that match on particular values of that key (_ValueMatches).
 *
 * Note that every context key has a small integer ID (0-63) and these are uses in
 * (long) masks for certain rule matching operations.
 */

export class KeyData {
  _transformer: KeyValueTransformer;
  private _any: ValueMatches;

  constructor(public _key: string, public _id: number) {
    this._ruleVecs = new Map<string, ValueMatches>();
    this._any = this.get(KeyAny);

  }

  private _ruleVecs: Map<string, ValueMatches>;

  get ruleVecs(): Map<string, ValueMatches> {
    return this._ruleVecs;
  }

  private _observers: Array<ValueQueriedObserver>;

  get observers(): Array<ValueQueriedObserver> {
    return this._observers;
  }

  private _isPropertyScope: boolean = false;

  // (e.g. field_p, class_p)
  get isPropertyScope(): boolean {
    return this._isPropertyScope;
  }

  set isPropertyScope(yn: boolean) {
    this._isPropertyScope = yn;
  }

  get key(): string {
    return this._key;
  }

  get id(): number {
    return this._id;
  }

  maskValue(): number {
    return shiftLeft(1, this._id);
  }

  matchValue(value: any): MatchValue {
    if (isArray(value)) {
      const list = value;
      if (list.length === 1) {
        return this.get(list[0]);
      }
      const multi: MultiMatchValue = new MultiMatchValue();

      ListWrapper.forEachWithIndex(list, (v, i) => {
        multi.data.push(this.get(v));
      });
      return multi;
    } else {
      return this.get(value);
    }
  }


  // If this key defines a scope for properties (e.g. field, class, action)
  // this this returns the name of the selector key for those properties

  addEntry(value: any, id: number): void {
    const matches: ValueMatches = this.get(value);
    const before: number[] = matches._arr;
    const after: number[] = Match.addInt(before, id);
    if (before !== after) {
      matches._arr = after;
    }
  }

  lookup(owner: MetaRules, value: any): number[] {
    const matches: ValueMatches = this.get(value);
    if (!matches._read && isPresent(this._observers)) {

      try {
        if (!matches._read) {
          // notify
          if (isPresent(value)) {
            ListWrapper.forEachWithIndex(this._observers, (v, i) => {
              v.notify(owner, this._key, value);
            });
          }
        }
        matches._read = true;
      } finally {

      }
    }
    // check if parent has changed and need to union in parent data
    matches.checkParent();
    return matches._arr;
  }

  setParent(value: any, parentValue: any): void {
    const parent: ValueMatches = this.get(parentValue);
    const child: ValueMatches = this.get(value);
    child._parent = parent;
  }

  parent(value: any): any {
    const child: ValueMatches = this.get(value);
    return child._parent._value;
  }

  addObserver(o: ValueQueriedObserver): void {
    if (isBlank(this._observers)) {
      this._observers = new Array<ValueQueriedObserver>();
    }
    this._observers.push(o);
  }

  private get(value: any): ValueMatches {
    if (isBlank(value)) {
      value = NullMarker;

    } else if (isPresent(this._transformer)) {
      value = this._transformer.tranformForMatch(value);
    }
    let matches: ValueMatches = this._ruleVecs.get(value);

    if (isBlank(matches)) {
      matches = new ValueMatches(value);

      if (isPresent(value) && !BooleanWrapper.isFalse(value)) {
        matches._parent = this._any;
      }
      this._ruleVecs.set(value, matches);
    }
    return matches;
  }
}


/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
export class PropertyMap implements Map<string, any> {

  [Symbol.toStringTag]: 'Map';
  protected _map: Map<string, any>;
  private _contextPropertiesUpdated: Array<PropertyManager>;

  constructor(entries?: Map<string, any>) {
    if (isPresent(entries)) {
      this._map = new Map<string, any>(entries);
    } else {
      this._map = new Map<string, any>();
    }
  }

  get size(): number {
    return this._map.size;
  }

  get contextKeysUpdated(): Array<PropertyManager> {
    return this._contextPropertiesUpdated;
  }

  get(key: string): any {
    return this._map.get(key);
  }

  keys(): IterableIterator<string> {
    return this._map.keys();
  }

  values(): IterableIterator<any> {
    return this._map.values();
  }

  clear(): void {
    this._map.clear();
  }

  set(key: string, value?: any): any {
    return this._map.set(key, value);
  }

  delete(key: string): boolean {

    return this._map.delete(key);
  }

  forEach(callbackfn: (value: any, index: string, map: Map<string, any>) => void,
          thisArg?: any): void {
    this._map.forEach(callbackfn);
  }

  has(key: string): boolean {
    return this._map.has(key);
  }

  [Symbol.iterator](): IterableIterator<any> {
    return this._map[Symbol.iterator]();
  }

  entries(): IterableIterator<any> {
    return this._map.entries();
  }

  awakeProperties(): void {
    MapWrapper.iterable(this).forEach((value, key) => {
      if (isPropertyMapAwaking(value)) {
        const newValue = value.awakeForPropertyMap(this);
        if (newValue !== value) {
          this.set(key, newValue);
        }
      }
    });
  }

  addContextKey(key: PropertyManager): void {
    if (isBlank(this._contextPropertiesUpdated)) {
      this._contextPropertiesUpdated = new Array<PropertyManager>();
    }
    this._contextPropertiesUpdated.push(key);
  }

  toString() {
    // todo: find better way for the string. thsi is also used as key for the dictionary
    // not really efficient
    const sj = new StringJoiner(['PropertyMap:']);
    sj.add(this.size + ',');
    MapWrapper.iterable(this).forEach((value, key) => {
      if (isPropertyMapAwaking(value)) {
        const newValue = value.awakeForPropertyMap(this);
        if (newValue !== value) {
          sj.add(key + ':' + value);
          sj.add(', ');
        }
      }
    });
    return sj.toString();
  }
}


/**
 * Called on implementing values to allow statically resolvable (but dynamic) values
 * to evaluate/copy themselves for inclusion in a new map (to ensure that a value that
 * derived its value based on a different context doesn't get reused in another)
 */
export interface PropertyMapAwaking {
  propertyAwaking: boolean;

  awakeForPropertyMap(map: PropertyMap): any;
}


export function isPropertyMapAwaking(arg: any): arg is PropertyMapAwaking {
  return isPresent(arg) && isPresent(arg.propertyAwaking);
}


export class ObjectMetaPropertyMap extends PropertyMap {
  private _fieldPath: FieldPath;


  get fieldPath(): FieldPath {
    if (isBlank(this._fieldPath)) {
      const value = this.get(KeyValue);
      const fieldName = this.get(KeyField);

      this._fieldPath = (isPresent(fieldName) && isBlank(value))
        ? new FieldPath(fieldName)
        : FieldPathNullMarker;
    }
    const isNullPath = this._fieldPath === FieldPathNullMarker;
    return isNullPath ? null : this._fieldPath;
  }

  isFieldNullMarker(value: FieldPath): boolean {
    return isPresent(value) && value.path === 'null';
  }
}


export class PropertyMerger_Overwrite extends PropertyMerger {


  merge(orig: any, override: any, isDeclare: boolean): any {
    return override;
  }

  toString(): string {
    return 'OVERWRITE';
  }
}

/**
 PropertyMerger for properties the should be unioned as lists
 */
export class PropertyMerger_List extends PropertyMerger {


  merge(orig: any, override: any, isDeclare: boolean): any {
    if (!(isArray(orig)) && !(isArray(override)) && objectEquals(orig, override)) {
      return orig;
    }
    const l1 = toList(orig);
    const l2 = toList(override);

    const result = ListWrapper.clone(l1);

    ListWrapper.addElementsIfAbsent(result, l2);
    return result;
  }


  toString(): string {
    return 'PropertyMerger_List';
  }
}


/**
 * PropertyMerger for properties the should override normally, but return lists when
 * in declare mode (e.g. 'class', 'field', 'layout', ...)
 */
export class PropertyMergerDeclareList extends PropertyMergerDynamic {

  constructor() {
    super();
  }

  merge(orig: any, override: any, isDeclare: boolean): any {
    if (!isDeclare) {
      return override;
    }

    if (!(isArray(orig)) && !(isArray(override)) && objectEquals(orig, override)) {
      return orig;
    }

    const result: any[] = [];
    ListWrapper.addElementsIfAbsent(result, toList(orig));
    ListWrapper.addElementsIfAbsent(result, toList(override));

    return result;
  }

  toString(): string {
    return 'PropertyMergerDeclareList';
  }
}

/**
 * PropertyMerger for the 'trait' property.  Generally, traits are unioned, except for traits
 * from the same 'traitGroup', which override (i.e. only one trait from each traitGroup should
 * survive).
 */
export class PropertyMergerDeclareListForTrait extends PropertyMergerDeclareList {


  constructor() {
    super();
  }

  merge(orig: any, override: any, isDeclare: boolean): any {
    if (isDeclare) {
      return super.merge(orig, override, isDeclare);
    }

    // if we're override a single element with itself, don't go List...
    if (!isArray(orig) && !isArray(override) && objectEquals(orig, override)) {
      return orig;
    }
    const origL = toList(orig);
    const overrideL = toList(override);
    const result: any[] = [];
    for (let trait of origL) {
      if (trait instanceof OverrideValue) {
        trait = (<OverrideValue>trait).value();
      }

      let canAdd = true;
      const group = this.metaRules.groupForTrait(trait);

      if (isPresent(group)) {

        for (let overrideTrait of overrideL) {
          if (overrideTrait instanceof OverrideValue) {
            overrideTrait = (<OverrideValue>overrideTrait).value();
          }


          if (group === this.metaRules.groupForTrait(overrideTrait)) {
            canAdd = false;
            break;
          }
        }
      }
      if (canAdd) {
        result.push(trait);
      }
    }
    ListWrapper.addElementsIfAbsent(result, overrideL);
    return result;
  }


  toString(): string {
    return 'PropertyMergerDeclareListForTrait';
  }
}


export class PropertyMerger_Valid extends PropertyMerger implements PropertyMergerIsChaining {

  isPropMergerIsChainingMark: boolean = true;

  merge(orig: any, override: any, isDeclare: boolean): any {
    /**
     *
     *
     return (isString(override) || ( isBoolean(override) &&
     !(BooleanWrapper.boleanValue(override)))) ? override : orig;
     */

    // if first is error (error message or false, it wins), otherwise second
    return (isString(override) || (isBoolean(override) && BooleanWrapper.isFalse(override)))
      ? override : orig;
  }

  toString(): string {
    return 'VALIDATE';
  }
}


/**
 * PropertyMerger implementing AND semantics -- i.e. false trumps true.
 * (Used, for instance, for the properties 'visible' and 'editable')
 */
export class PropertyMerger_And extends PropertyMergerDynamic implements PropertyMergerIsChaining {
  isPropMergerIsChainingMark: boolean = true;


  merge(orig: any, override: any, isDeclare: boolean): any {
    // null will reset (so that it can be overridden to true subsequently
    if (isBlank(override)) {
      return null;
    }

    // If we can evaluate statically, do it now


    if ((isBoolean(orig) && !(BooleanWrapper.boleanValue(orig))) ||
      (isBoolean(override) && !(BooleanWrapper.boleanValue(override)))) {

      return false;
    }
    // ANDing with true is a noop -- return new value
    if (isBoolean(orig) && BooleanWrapper.boleanValue(orig)) {

      return (override instanceof DynamicPropertyValue) ? override
        : BooleanWrapper.boleanValue(
          override);
    }

    if (isBoolean(override) && BooleanWrapper.boleanValue(override)) {
      return (orig instanceof DynamicPropertyValue) ? orig : BooleanWrapper.boleanValue(
        override);
    }

    // if one of our values is dynamic, defer
    if ((orig instanceof DynamicPropertyValue || override instanceof DynamicPropertyValue)) {
      return new DeferredOperationChain(this, orig, override);
    }
    return BooleanWrapper.boleanValue(orig) && BooleanWrapper.boleanValue(override);
  }

  toString(): string {
    return 'AND';
  }
}

export class OMPropertyMerger_Valid extends PropertyMerger implements PropertyMergerIsChaining {
  isPropMergerIsChainingMark: boolean = true;


  merge(orig: any, override: any, isDeclare: boolean): any {
    // if first is error (error message or false, it wins), otherwise second
    return (isString(override) || (isBoolean(override) && BooleanWrapper.isFalse(
      override))) ? override : orig;
  }


  toString() {
    return 'VALIDATE';
  }
}


// Marker interface
export interface PropertyMergerIsChaining {
  isPropMergerIsChainingMark: boolean;

}


/**
 * Wrapper for a value that should, in rule application, override any previous value for its
 * property.  This can be used to override default property value merge policy, for instance
 * allowing the 'visible' property to be forced from false to true.
 */
export class OverrideValue {
  constructor(private _value: any) {
  }

  value(): any {
    return this._value === 'null' ? null : this._value;
  }

  toString(): string {
    return isPresent(this._value) ? this._value.toString() + '!' : 'null' + '!';
  }
}
