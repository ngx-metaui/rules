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
  assert,
  fnv1a,
  hashCode,
  isArray,
  isPresent,
  print,
  shiftLeft,
  StringJoiner
} from './utils/lang';
import {Rule} from './rule';
import {ListWrapper} from './utils/collection';
import {_DebugDoubleCheckMatches, _UsePartialIndexing} from './constants';
import {KeyData, PropertyMap} from './policies/merging-policy';
import {Meta} from './meta';


/**
 * Represents a set of matching rules resulting from looking up a set of key/values
 *  against the Meta rule base.
 *
 * Instances of the Match superclass are simply immutable snapshots of previous matches
 * (used as keys in Match -> Properties lookup caches).
 * The more meaty class is its static inner subclass, Match.MatchResult.
 */
export class Match {
  static readonly EmptyMatchArray: number[] = [];

  static _Debug_ElementProcessCount: number = 0;

  constructor(public _matches: number[], public _keysMatchedMask: number,
              public  _matchPathCRC: number = 0) {
  }

  get keysMatchedMask(): number {
    return this._keysMatchedMask;
  }

  // Word lists are int arrays with the first element holding the length
  static addInt(intArr: number[], val: number): number[] {
    if (!intArr) {
      const r: number[] = [];
      r[0] = 1;
      r[1] = val;

      return r;
    }
    let newPos: number = intArr[0];
    if (intArr[newPos++] === val) {
      return intArr;
    }  // already here...

    if (newPos >= intArr.length) {
      let a: Array<number>;
      a = intArr.slice(0, newPos);
      intArr = a;
    }
    intArr[newPos] = val;
    intArr[0] = newPos;
    return intArr;
  }

  // only rules that use only the activated (queried) keys
  static filterMustUse(rules: Array<Rule>, arr: number[], usesMask: number): number[] {
    if (!arr) {
      return null;
    }
    let result: number[];
    const count = arr[0];
    for (let i = 0; i < count; i++) {
      const r = arr[i + 1];
      const rule = rules[r];
      if ((rule.keyMatchesMask & usesMask) !== 0) {
        result = Match.addInt(result, r);
      }
    }
    return result;
  }

  /**
   * Intersects two rulevecs.  This is not a traditional intersection where only items in both
   * inputs are included in the result: we only intersect rules that match on common keys;
   * others are unioned.
   *
   * For instance, say we have the following inputs:
   *      a:  [matched on: class, layout]  (class=Foo, layout=Inspect)
   *          1) class=Foo layout=Inspect { ... }
   *          2) class=Foo operation=edit { ... }
   *          3) layout=Inspect operation=view { ... }
   *
   *      b:  [matched on: operation]  (operation=view)
   *          3) layout=Inspect operation=view { ... }
   *          4) operation=view type=String { ... }
   *          5) operation=view layout=Tabs { ... }
   *
   * The result should be: 1, 3, 4
   * I.e.: items that appear in both (#3 above) are included, as are items that appear in just
   * one,
   * *but don't match on the keys in the other* (#1 and #4 above).
   *
   * @param allRules the full rule base
   * @param a first vector of rule indexes
   * @param b second vector of rule indexes
   * @param aMask mask indicating the keys against which the first rule vectors items have
   *     already been matched
   * @param bMask mask indicating the keys against which the second rule vectors items have
   *     already been matched
   * @return rule vector for the matches
   */
  static intersect(allRules: Array<Rule>, a: number[], b: number[], aMask: number,
                   bMask: number): number[] {

    if (!a) {
      return b;
    }
    let result: number[];
    let iA = 1, iB = 1;
    const sizeA = isPresent(a[0]) ? a[0] : 0, sizeB = isPresent(b[0]) ? b[0] : 0;
    Match._Debug_ElementProcessCount += sizeA + sizeB;

    while (iA <= sizeA || iB <= sizeB) {
      const iAMask = (iA <= sizeA) ? allRules[a[iA]].keyIndexedMask : 0;
      const iBMask = (iB <= sizeB) ? allRules[b[iB]].keyIndexedMask : 0;
      const c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));

      if (c === 0) {
        result = Match.addInt(result, a[iA]);
        iA++;
        iB++;

      } else if (c < 0) {
        // If A not in B, but A doesn't filter on B's mask, then add it
        if ((iAMask & bMask) === 0) {
          result = Match.addInt(result, a[iA]);
        }
        iA++;
      } else {
        if ((iBMask & aMask) === 0) {
          result = Match.addInt(result, b[iB]);
        }
        iB++;
      }
    }
    return result;
  }

  static union(a: number[], b: number[]): number[] {
    if (!a) {
      return b;
    }
    if (!b) {
      return a;
    }
    const sizeA = a[0], sizeB = b[0];
    if (sizeA === 0) {
      return b;
    }
    if (sizeB === 0) {
      return a;
    }
    Match._Debug_ElementProcessCount += (sizeA + sizeB);

    let result: number[];
    let iA = 1, vA = a[1], iB = 1, vB = b[1];


    while (iA <= sizeA || iB <= sizeB) {
      const c: number = vA - vB;
      result = Match.addInt(result, ((c <= 0) ? vA : vB));
      if (c <= 0) {
        iA++;
        vA = (iA <= sizeA) ? a[iA] : Number.MAX_VALUE;
      }
      if (c >= 0) {
        iB++;
        vB = (iB <= sizeB) ? b[iB] : Number.MAX_VALUE;
      }
    }
    return result;
  }

  static _arrayEq(a: number[], b: number[]): boolean {
    if (a === b) {
      return true;
    }
    if (a === null || b === null) {
      return false;
    }
    const count = a[0];
    if (count !== b[0]) {
      return false;
    }
    for (let i = 1; i <= count; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Filter a partially matched set of rules down to the actual matches.
   * The input set of rules, matchesArr, is based on a *partial* match, and so includes rules
   * that were touched by some of the queried keys, but that may also require *additional* keys
   * that we have not matched on -- these must now be removed. Also, when 'partial indexing',
   * rules are indexed on a subset of their keys, so matchesArr will contain rules that need to
   * be evaluated against those MatchValues upon which they were not indexed (and therefore not
   * intersected / filtered on in the lookup process).
   */
  filter(allRules: Array<Rule>, maxRule: number, matchesArr: number[], queriedMask: number,
         matchArray: MatchValue[]): number[] {
    if (!matchesArr) {
      return null;
    }
    // print('\n## Filtering matching: ' + matchesArr[0] + ', Queried Mask: ' + queriedMask);
    //
    // for (let i = 1; i <= matchesArr[0]; i++) {
    //     print('## ' + matchesArr[i] + '): ' + allRules[matchesArr[i]].toString());
    // }

    let result: number[];
    const count = matchesArr[0];

    for (let i = 0; i < count; i++) {
      const r = matchesArr[i + 1];
      if (r >= maxRule) {
        continue;
      }
      const rule: Rule = allRules[r];


      if (rule.disabled() || (rule.keyAntiMask & queriedMask) !== 0) {
        continue;
      }

      // Must have matched on (activate) all match keys for this rule, *and*
      // if have any non-indexed rules, need to check match on those
      if (((rule.keyMatchesMask & ~queriedMask) === 0) &&
        ((rule.keyMatchesMask === rule.keyIndexedMask)
          ||
          (isPresent(matchArray) && rule.matches(matchArray)))) {

        if (_DebugDoubleCheckMatches && !(matchArray != null && rule.matches(
          matchArray))) {
          assert(false, 'Inconsistent (negative) match on rule: ' + rule);
        }


        result = Match.addInt(result, r);
      } else if (_DebugDoubleCheckMatches && (matchArray != null && rule.matches(
        matchArray))) {
        // Assert.that(false, 'Inconsistent (positive) match on rule: %s', rule);

      }
    }

    // if (isPresent(result) && result.length > 0) {
    //     print('\n\n\n #### Filtering RESULT: ' + result[0]);
    //
    //     for (let i = 1; i <= result[0]; i++) {
    //         print('## ' + result[i] + '): ' + allRules[result[i]].toString());
    //     }
    // }
    return result;
  }

  hashCode(): number {
    let ret = this._keysMatchedMask * 31 + this._matchPathCRC;
    if (isPresent(this._matches)) {
      ret = fnv1a(this._matches.join(','));
    }
    return ret;
  }

  equalsTo(o: any): boolean {
    return ((o instanceof Match) && this._keysMatchedMask === o._keysMatchedMask) &&
      this._matchPathCRC === o._matchPathCRC &&
      Match._arrayEq(this._matches, o._matches);
  }

  toString(): string {
    const str: string[] = [];
    if (this._matches) {
      str.push(this._matches.join(','));
    }
    if (this._keysMatchedMask) {
      str.push(this._keysMatchedMask.toString());
    }
    if (this._matchPathCRC) {
      str.push(this._matchPathCRC.toString());
    }
    return str.join();
  }

}

/**
 *  An Match which includes a UnionMatchResult part (which is used by Context to
 * represent the set of overridden key/values up the stack)
 */
export class MatchWithUnion extends Match {

  constructor(public _matches: number[], public  _keysMatchedMask: number,
              public  _matchPathCRC: number = 0,
              public _overUnionMatch: UnionMatchResult) {
    super(_matches, _keysMatchedMask, _matchPathCRC);
  }


  equalsTo(o: any): boolean {
    return super.equalsTo(o) && (
      (this._overUnionMatch === o._overUnionMatch) ||
      ((isPresent(this._overUnionMatch)) && isPresent(
        o._overUnionMatch) && this._overUnionMatch.equalsTo(
        o._overUnionMatch)));
  }

}

/**
 *  MatchResult represents the result of computing the set of matching rules
 *  based on the key/value on this instance, and the other key/value pairs
 * on its predecessor chain.  I.e. to find the matching rules for the context keys
 * {operation=edit; layout=Inspect; class=Foo}, first a MatchResult is created for
 * 'operation=edit' and passed as the 'prev' to the creation of another for 'layout=Inspect',
 * and so on.  In this way the MatchResults form a *(sharable) partial-match tree.*
 *
 * The ability to result previous partial match 'paths' is an important optimization:
 * the primary client of MatchResult (and of rule matching in general) is the Context, when each
 * assignment pushes a record on a stack that (roughly) extends the Match from the previous
 * assignment.  By caching MatchResult instances on the _Assignment records, matching is limited
 *  to the *incremental* matching on just the new assignment, not a full match on all keys in the
 *  context.
 *
 * Further, a MatchResult caches the *property map* resulting from the application of the rules
 *  that it matches.  By caching MatchResult objects (and caching the map from
 *  Rule vector (AKA Match) -> MatchResult -> PropertyMap), redudant rule application (and creation
 * of additional property maps) is avoided.
 */
  // todo: implement toString for the Dictonary as this is used as a key
export class MatchResult extends MatchWithUnion {

  private _metaGeneration: number = 0;
  private _properties: PropertyMap;

  // Meta meta, Meta.KeyData keyData, Object value, MatchResult prev)
  constructor(private _meta: Meta, private  _keyData: KeyData,
              private _value: any,
              private _prevMatch: MatchResult) {
    super(null, null, 0, (_prevMatch != null) ? _prevMatch._overUnionMatch : null);
    this._initMatch();

  }

  setOverridesMatch(over: UnionMatchResult) {
    this._overUnionMatch = over;
  }

  matches(): number[] {
    this._invalidateIfStale();
    if (!this._matches) {
      this._initMatch();
    }
    return this._matches;
  }

  filterResult(): number[] {
    return this.filter(this._meta.rules, this._meta.ruleCount, this.matches(),
      this._keysMatchedMask, null);
  }

  /**
   * Fill in matchArray with MatchValues to use in Selector matching
   */
  initMatchValues(matchArray: MatchValue[]): void {
    if (isPresent(this._prevMatch)) {
      this._prevMatch.initMatchValues(matchArray);
    }
    if (isPresent(this._overUnionMatch)) {
      this._overUnionMatch.initMatchValues(matchArray);
    }
    this._meta.matchArrayAssign(matchArray, this._keyData,
      this._keyData.matchValue(this._value));
  }


  filteredMatches(): number[] {
    // shouldn't this be cached?!?
    let matches: number[] = this.matches();
    const keysMatchedMask = this._keysMatchedMask | (isPresent(
      this._overUnionMatch) ? this._overUnionMatch._keysMatchedMask : 0);

    let overrideMatches: number[];

    if (isPresent(this._overUnionMatch) && isPresent(
      (overrideMatches = this._overUnionMatch.matches()))) {
      if (!matches) {
        matches = overrideMatches;

      } else {
        matches = Match.intersect(this._meta.rules, matches, overrideMatches,
          this._keysMatchedMask,
          this._overUnionMatch._keysMatchedMask);
      }
    }

    let matchArray: MatchValue[];
    if (_UsePartialIndexing) {
      matchArray = this._meta.newMatchArray();
      this.initMatchValues(matchArray);
    }

    return this.filter(this._meta.rules, this._meta.ruleCount, matches, keysMatchedMask,
      matchArray);
  }


  valueForKey(key: string): any {
    return (this._keyData._key === key) ? this._value :
      (isPresent(this._prevMatch) ? this._prevMatch.valueForKey(key) : null);
  }

  immutableCopy(): Match {
    this._invalidateIfStale();
    return new MatchWithUnion(this.matches(), this._keysMatchedMask, this._matchPathCRC,
      this._overUnionMatch);
  }

  _invalidateIfStale(): void {
    if (this._metaGeneration < this._meta.ruleSetGeneration) {
      this._initMatch();
    }
  }

  _logMatchDiff(a: number[], b: number[]): void {
    let iA = 1, iB = 1;
    const sizeA = a[0], sizeB = b[0];

    while (iA <= sizeA || iB <= sizeB) {
      const c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));
      if (c === 0) {
        iA++;
        iB++;
      } else if (c < 0) {
        // If A not in B, but A doesn't filter on B's mask, then add it
        print('  -- Only in A: ' + this._meta.rules[a[iA]]);
        iA++;
      } else {
        print('  -- Only in B: ' + this._meta.rules[b[iB]]);
        iB++;
      }
    }
  }

  properties(): PropertyMap {
    this._invalidateIfStale();
    if (!this._properties) {
      this._properties = this._meta.propertiesForMatch(this);
    }
    return this._properties;
  }

  debugString(): string {

    const sj = new StringJoiner(['Match Result path: \n']);
    this._appendPrevPath(sj);

    if (isPresent(this._overUnionMatch)) {
      sj.add('\nOverrides path: ');
      this._overUnionMatch._appendPrevPath(sj);
    }
    return sj.toString();
  }

  _appendPrevPath(buf: StringJoiner): void {
    if (isPresent(this._prevMatch)) {
      this._prevMatch._appendPrevPath(buf);
      buf.add(' -> ');
    }
    buf.add(this._keyData._key);
    buf.add('=');
    buf.add(this._value);
  }

  _checkMatch(values: Map<string, any>): void {
    const arr: number[] = this.filterResult();
    if (!arr) {
      return;
    }
    // first entry is count
    const count: number = arr[0];
    for (let i = 0; i < count; i++) {
      const r = this._meta.rules[arr[i + 1]];
      r._checkRule(values, this._meta);
    }

  }

  equalsTo(o: any): boolean {
    return (o instanceof MatchResult) && super.equalsTo(
      o) && (o._metaGeneration === this._metaGeneration) &&
      o._properties.size === this._properties.size;
  }

  protected join(a: number[], b: number[], aMask: number, bMask: number): number[] {
    return Match.intersect(this._meta.rules, a, b, aMask, bMask);
  }

  protected _initMatch(): void {
    const keyMask: number = shiftLeft(1, this._keyData._id);

    // get vec for this key/value -- if value is list, compute the union
    let newArr: number[];
    if (isArray(this._value)) {

      for (const v of this._value) {
        const a: number[] = this._keyData.lookup(this._meta, v);
        newArr = Match.union(a, newArr);
      }
    } else {
      newArr = this._keyData.lookup(this._meta, this._value);
    }

    const prevMatches: number[] = (!this._prevMatch) ? null : this._prevMatch.matches();

    this._keysMatchedMask = (!this._prevMatch) ? keyMask :
      (keyMask | this._prevMatch._keysMatchedMask);

    if (!prevMatches) {
      this._matches = newArr;
      // Todo: not clear why this is needed, but without it we end up failing to filter
      // certain matches that should be filtered (resulting in bad matches)
      if (!_UsePartialIndexing) {
        this._keysMatchedMask = keyMask;
      }

    } else {
      if (!newArr) {
        newArr = Match.EmptyMatchArray;
      }
      // Join
      this._matches = this.join(newArr, prevMatches, keyMask, this._prevMatch._keysMatchedMask);
    }

    // compute path CRC
    this._matchPathCRC = -1;
    for (let mr: MatchResult = this; mr != null; mr = mr._prevMatch) {
      this._matchPathCRC = fnv1a(this._matchPathCRC.toString().concat(mr._keyData._key));

      if (mr._value) {
        const value = isArray(mr._value) ? mr._value.join(',') : mr._value;
        this._matchPathCRC = fnv1a(this._matchPathCRC.toString().concat(
          hashCode(value).toString()));
      }
    }
    if (this._matchPathCRC === 0) {
      this._matchPathCRC = 1;
    }
    this._metaGeneration = this._meta.ruleSetGeneration;
    this._properties = null;
  }

}

export class UnionMatchResult extends MatchResult {

  constructor(meta: Meta, keyData: KeyData, value: any, prevMatch: MatchResult) {
    super(meta, keyData, value, prevMatch);
  }


  protected join(a: number[], b: number[], aMask: number, bMask: number): number[] {
    return Match.union(a, b);

  }
}


/**
 * Abstraction for values (or sets of values) that can be matched against others
 * (in the context of Selector key/value) matching.  Subtypes take advantage of
 * the fact that ValueMatches instances globally uniquely represent key/value pairs
 * to enable efficient matching entirely through identity comparison.
 */

export interface MatchValue {
  matches(other: MatchValue): boolean;

  updateByAdding(other: MatchValue): MatchValue;
}


/**
 *
 * Uniquely represents a particular key/value in the Meta scope, and indexes all rules
 * with (indexed) Selectors matching that key/value.

 * ValueMatches also models *inheritance* by allowing one key/value to have another
 * as its 'parent' and thereby match on any Selector (and rule) that its parent would.
 *
 * For instance, this enables a rule on class=Number to apply to class=Integer and
 * class=BigDecimal, and one on class=* to apply to any.
 *
 * The utility of 'parent' is not limited, of course, to the key 'class': all keys
 * take advantage of the parent '*' to support unqualified matches on that key, and
 * keys like 'operation' define a value hierarchy ( 'inspect' -> {'view', 'search'},
 * 'search' -> {'keywordSearch', 'textSearch'})
 */

export class ValueMatches implements MatchValue {

  _value: any;
  _read: boolean = false;
  _arr: number[];

  _parent: ValueMatches;
  _parentSize: number = 0;


  constructor(value: any) {
    this._value = value;
  }

  checkParent() {
    // todo: performance: keep a rule set version # and only do this when the rule set has
    // reloaded

    if (isPresent(this._parent)) {
      this._parent.checkParent();

      const parentArr: number[] = this._parent._arr;

      if (isPresent(parentArr) && parentArr[0] !== this._parentSize) {
        this._arr = Match.union(this._arr, parentArr);
        this._parentSize = parentArr[0];
      }

    }
  }

  matches(other: MatchValue): boolean {
    if (!(other instanceof ValueMatches)) {
      return other.matches(this);
    }

    // we recurse up parent chain to do superclass matches
    return (other === this) || (isPresent(this._parent) && this._parent.matches(other));
  }

  updateByAdding(other: MatchValue): MatchValue {
    const multi: MultiMatchValue = new MultiMatchValue();
    multi.data.push(this);
    return multi.updateByAdding(other);
  }

}

// https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-
//  array-and-map-work
export class MultiMatchValue implements MatchValue {

  data: Array<MatchValue> = [];


  matches(other: MatchValue): boolean {
    if (other instanceof MultiMatchValue) {
      // list / list comparison: any combo can match
      for (let i = 0; i < this.data.length; i++) {
        if (other.matches(this.data[i])) {
          return true;
        }
      }
    } else {
      // single value against array: one must match
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].matches(other)) {
          return true;
        }
      }
    }
    return false;
  }

  updateByAdding(other: MatchValue): MatchValue {
    if (other instanceof MultiMatchValue) {
      const matchValue: MultiMatchValue = <MultiMatchValue>other;
      ListWrapper.addAll(this.data, matchValue.data);
    } else {
      this.data.push(other);
    }
    return this;
  }
}

