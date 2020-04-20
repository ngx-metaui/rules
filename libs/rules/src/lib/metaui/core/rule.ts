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
  isArray,
  isBlank,
  isPresent,
  objectEquals,
  print,
  shiftLeft,
  StringJoiner
} from './utils/lang';
import {ListWrapper, MapWrapper} from './utils/collection';
import {DeclRule, KeyAny, KeyDeclare, MetaRules, NullMarker, overrideKeyForKey} from './meta-rules';
import {MatchValue} from './match';
import {KeyData, PropertyManager, PropertyMap} from './policies/merging-policy';


/**
 * A Selector defines a sort of key/value predicate that must be satisfied for a
 * rule to apply.
 */
export class Selector {

  private _matchArrayIdx: number = 0;
  private _matchValue: MatchValue;

  constructor(private _key: string, private _value: any, public isDecl: boolean = false) {
  }

  get key(): string {
    return this._key;
  }

  get value(): any {
    return this._value;
  }

  static fromMap(values: Map<string, any>): Array<Selector> {
    const result = new Array<Selector>();
    MapWrapper.iterable(values).forEach((value, key) => {
      result.push(new Selector(key, value, false));
    });
    return result;
  }

  bindToKeyData(keyData: KeyData): void {
    this._matchArrayIdx = keyData._id;
    this._matchValue = keyData.matchValue(this._value);

  }

  matches(matchArray: Array<MatchValue>): boolean {
    // If we haven't been initialized with a matchValue, then we were indexed and don't need to
    // match
    if (isBlank(this._matchValue)) {
      return true;
    }


    const other: MatchValue = matchArray[this._matchArrayIdx];

    return isPresent(other) ? other.matches(this._matchValue) : false;
  }


  toString(): string {
    const sj = new StringJoiner([]);

    sj.add(this.key);
    sj.add('=');
    sj.add(this._value.toString());
    sj.add('(');
    sj.add(this.isDecl + '');
    sj.add(')');
    sj.add('[ ');
    sj.add(this._matchArrayIdx + ']');

    return sj.toString();
  }
}


/**
 * A Rule defines a map of properties that should apply in the event that a set of Selectors
 * are matched.  Given a rule base (Meta) and a set of asserted values (Context) a list of matching
 * rules can be computed (by matching their selectors against the values) and by successively (in
 * rank / priority order) applying (merging) their property maps a set of effective properties can
 * be computed.
 *
 */

export class Rule {
  keyMatchesMask: number = 0;
  keyIndexedMask: number = 0;
  keyAntiMask: number = 0;

  constructor(public _selectors: Array<Selector>, private _properties?: Map<string, any>,
              private _rank: number = -1,
              private _lineNumber: number = -1) {

  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _ruleSet: RuleSet;

  get ruleSet(): RuleSet {
    return this._ruleSet;
  }

  set ruleSet(value: RuleSet) {
    this._ruleSet = value;
  }

  get lineNumber(): number {
    return this._lineNumber;
  }

  set lineNumber(lineNumber) {
    this._lineNumber = lineNumber;
  }

  get selectors(): Array<Selector> {
    return this._selectors;
  }

  set selectors(value: Array<Selector>) {
    this._selectors = value;
  }

  get properties(): Map<string, any> {
    return this._properties;
  }

  set properties(value: Map<string, any>) {
    this._properties = value;
  }

  get rank(): number {
    return this._rank;
  }

  set rank(value: number) {
    this._rank = value;
  }

  static merge(meta: MetaRules, src: Map<string, any>, dest: Map<string, any>,
               declareKey: string): number {
    let updatedMask = 0;

    MapWrapper.iterable(src).forEach((value, key) => {
      const propManager: PropertyManager = meta.managerForProperty(
        key);
      const orig = dest.get(key);
      const isDeclare: boolean = (isPresent(declareKey) && key === declareKey);
      const newVal = propManager.mergeProperty(key, orig, value, isDeclare);

      if (newVal !== orig) {
        dest.set(key, newVal);
        const keyData: KeyData = propManager._keyDataToSet;

        if (isPresent(keyData)) {
          const keymask: number = shiftLeft(1, keyData._id);

          if ((keymask & updatedMask) === 0 &&
            (dest instanceof PropertyMap)) {
            updatedMask |= keymask;
            (<PropertyMap>dest).addContextKey(
              propManager);
          }
        }
      }
    });
    return updatedMask;
  }

  matches(matchArray: Array<MatchValue>): boolean {
    for (const sel of this._selectors) {
      if (!sel.matches(matchArray)) {
        return false;
      }
    }
    return true;
  }

  /**
   * returns context keys modified
   */
  apply(meta: MetaRules, properties: PropertyMap, declareKey: string): number {
    if (this._rank === Number.MIN_VALUE) {
      return 0;
    }
    return Rule.merge(meta, this._properties, properties, declareKey);
  }

  disable(): void {
    this._rank = Number.MIN_VALUE;
  }

  disabled(): boolean {
    return this._rank === Number.MIN_VALUE;
  }

  location(): string {
    const path: string = isPresent(this._ruleSet) ? this._ruleSet.filePath : 'Unknown';
    return (this._lineNumber >= 0) ? (new StringJoiner([
      path, ':', this._lineNumber + ''
    ])).toString() : path;
  }

  isEditable(): boolean {
    return (this._ruleSet !== null) && (this._ruleSet.editableStart > 0) &&
      (this._id >= this._ruleSet.editableStart);
  }

  createDecl(): Rule {
    /*
     @field=dyno { value:${ some expr} } becomes
     declare { field:dyno }
     field=dyno { field:dyno; value:${ some expr} }
     */
    // add rule for declaration

    const selectors: Array<Selector> = this._selectors;
    const declPred: Selector = selectors[selectors.length - 1];
    const prePreds: Array<Selector> = this.convertKeyOverrides(
      selectors.slice(0, selectors.length - 1));

    if (isBlank(this._properties)) {
      this._properties = new Map<string, any>();
    }
    for (const p of selectors) {
      if (!(isArray(p.value))) {
        this._properties.set(p.key, p.value);
      }
    }
    // Flag the declaring rule as a property
    this._properties.set(DeclRule, new RuleWrapper(this));

    // check for override scope
    let hasOverrideScope = false;
    for (const p of prePreds) {
      if (p.key === declPred.key) {
        hasOverrideScope = true;
      }
    }

    // if decl key isn't scoped, then select on no scope
    if (!hasOverrideScope) {
      const overrideKey: string = overrideKeyForKey(declPred.key);
      prePreds.unshift(new Selector(overrideKey, NullMarker));
    }

    // The decl rule...
    prePreds.push(new Selector(KeyDeclare, declPred.key));

    const m = new Map<string, any>();
    m.set(declPred.key, declPred.value);
    return new Rule(prePreds, m, 0, -1);
  }

  /**
   *  rewrite any selector of the form "layout=L1, class=c, layout=L2" to
   *  "layout_o=L1 class=c, layout=L2"
   */

  convertKeyOverrides(orig: Array<Selector>): Array<Selector> {

    let result = orig;
    const count: number = orig.length;
    for (let i = 0; i < count; i++) {
      let p: Selector = orig[i];
      // See if overridded by same key later in selector
      for (let j = i + 1; j < count; j++) {
        const pNext: Selector = orig[j];

        if (pNext.key === p.key) {
          // if we're overridden, we drop ours, and replace the next collision
          // with one with our prefix

          // make a copy if we haven't already
          if (result === orig) {
            result = orig.slice(0, i);
          }
          p = new Selector(overrideKeyForKey(p.key), p.value);
          break;
        }
      }
      if (result !== orig) {
        result.push(p);
      }
    }
    return result;
  }

  toString(): string {
    const sj = new StringJoiner(['<Rule [']);
    sj.add(this._rank + '] ');

    if (isBlank(this.selectors)) {
      sj.add('null, null --> null >');
    } else {
      this._selectors.forEach((selector: Selector) => {
        sj.add(selector.key).add('=').add(selector.value).add(', ');

      });

      sj.add(' -> ');

      if (!this._properties) {
        sj.add('[,]' + ' >');
      } else {
        if (this._properties.has('declRule')) {

        }

        sj.add(MapWrapper.toString(this._properties) + ' >');
      }
    }


    return sj.toString();
  }

  _checkRule(values: Map<string, any>, meta: MetaRules): void {
    ListWrapper.forEachWithIndex<Selector>(this.selectors, (p, i) => {
      let contextValue = values.get(p.key);
      const keyData: KeyData = meta.keyData(p.key);

      if (isPresent(keyData._transformer)) {
        contextValue = keyData._transformer.tranformForMatch(contextValue);
      }

      if (isPresent(contextValue) &&
        ((KeyAny === p.value && BooleanWrapper.boleanValue(contextValue) ||
          objectEquals(contextValue, p.value) ||
          (isArray(p.value) && p.value.indexOf(contextValue) > -1) ||
          (isArray(p.value) && contextValue.indexOf(p.value) > -1)))) {
        // okay
      } else {
        print('Possible bad rule match!  Rule: %s; selector: %s, context val: %s' + this +
          ' ' + p + ' ' + contextValue);
      }
    });
  }


}

// here so logging of property map doesn't infinitely recurse
export class RuleWrapper {


  constructor(public rule: Rule) {
  }
}


/**
 * A group of rules originating from a common source.
 * All rules must be added to the rule base as part of a RuleSet.
 */
export class RuleSet {

  _rank: number = 0;

  constructor(private _meta: MetaRules) {
  }

  _filePath: string;

  get filePath(): string {
    return this._filePath;
  }

  _start: number = 0;

  get start(): number {
    return this._start;
  }

  _end: number = 0;

  get end(): number {
    return this._end;
  }

  _editableStart: number = -1;

  get editableStart(): number {
    return this._editableStart;
  }

  disableRules(): void {
    for (let i = this._start; i < this._end; i++) {
      this._meta.rules[i].disable();
    }
    this._meta.clearCaches();

  }

  startRank(): number {
    return (this._start < this._meta.ruleCount)
      ? this._meta.rules[this._start].rank
      : this._rank - (this._end - this._start);
  }

  allocateNextRuleEntry(): number {
    return (this._meta.ruleCount > this._end) ? this._meta.ruleCount++ : this._end++;
  }
}



