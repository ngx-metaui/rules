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
  crc32,
  hashCode,
  isArray,
  isBlank,
  isPresent,
  print,
  shiftLeft,
  StringJoiner
} from '../../core/utils/lang';
import {Rule} from './rule';
import {KeyData, MatchValue, Meta, PropertyMap} from './meta';


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


  // Word lists are int arrays with the first element holding the length
  static addInt(intArr: number[], val: number): number[] {
    if (isBlank(intArr)) {
      let r: Array<number> = new Array<number>(4);
      r[0] = 1;
      r[1] = val;

      return r;
    }
    let newPos: number = intArr[0];
    if (intArr[newPos++] === val) {
      return intArr;
    }  // already here...

    if (newPos >= intArr.length) {
      let a: Array<number> = new Array<number>(newPos * 2);
      a = intArr.slice(0, newPos);
      intArr = a;
    }
    intArr[newPos] = val;
    intArr[0] = newPos;
    return intArr;
  }

  // only rules that use only the activated (queried) keys
  static filterMustUse(rules: Array<Rule>, arr: number[], usesMask: number): number[] {
    if (isBlank(arr)) {
      return null;
    }
    let result: number[];
    let count = arr[0];
    for (let i = 0; i < count; i++) {
      let r = arr[i + 1];
      let rule = rules[r];
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

    if (isBlank(a)) {
      return b;
    }
    let result: number[];
    let iA = 1, sizeA = isPresent(a[0]) ? a[0] : 0, iB = 1, sizeB = isPresent(b[0]) ? b[0] : 0;
    Match._Debug_ElementProcessCount += sizeA + sizeB;

    while (iA <= sizeA || iB <= sizeB) {
      let iAMask = (iA <= sizeA) ? allRules[a[iA]].keyIndexedMask : 0;
      let iBMask = (iB <= sizeB) ? allRules[b[iB]].keyIndexedMask : 0;
      let c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));

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
    if (isBlank(a)) {
      return b;
    }
    if (isBlank(b)) {
      return a;
    }
    let sizeA = a[0], sizeB = b[0];
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
      let c: number = vA - vB;
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
    let count = a[0];
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

  constructor(public _matches: number[], public _keysMatchedMask: number,
              public  _matchPathCRC: number = 0) {
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
    if (isBlank(matchesArr)) {
      return null;
    }
    // print('\n## Filtering matching: ' + matchesArr[0] + ', Queried Mask: ' + queriedMask);
    //
    // for (let i = 1; i <= matchesArr[0]; i++) {
    //     print('## ' + matchesArr[i] + '): ' + allRules[matchesArr[i]].toString());
    // }

    let result: number[];
    let count = matchesArr[0];

    for (let i = 0; i < count; i++) {
      let r = matchesArr[i + 1];
      if (r >= maxRule) {
        continue;
      }
      let rule: Rule = allRules[r];


      if (rule.disabled() || (rule.keyAntiMask & queriedMask) !== 0) {
        continue;
      }

      // Must have matched on (activate) all match keys for this rule, *and*
      // if have any non-indexed rules, need to check match on those
      if (((rule.keyMatchesMask & ~queriedMask) === 0) &&
        ((rule.keyMatchesMask === rule.keyIndexedMask)
          ||
          (isPresent(matchArray) && rule.matches(matchArray)))) {

        if (Meta._DebugDoubleCheckMatches && !(matchArray != null && rule.matches(
          matchArray))) {
          assert(false, 'Inconsistent (negative) match on rule: ' + rule);
        }


        result = Match.addInt(result, r);
      } else if (Meta._DebugDoubleCheckMatches && (matchArray != null && rule.matches(
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
      for (let i = 0, c = this._matches[0]; i < c; i++) {
        ret = crc32(ret, this._matches[i + 1]);
      }
    }
    return ret;
  }


  get keysMatchedMask(): number {
    return this._keysMatchedMask;
  }

  equalsTo(o: any): boolean {
    return ((o instanceof Match) && this._keysMatchedMask === o._keysMatchedMask) &&
      this._matchPathCRC === o._matchPathCRC &&
      Match._arrayEq(this._matches, o._matches);
  }

  toString() {
    let buf = new StringJoiner([]);
    buf.add('_matches');
    buf.add((isPresent(this._matches) ? this._matches.length : 0) + '');
    buf.add('_keysMatchedMask');
    buf.add(this._keysMatchedMask + '');
    buf.add('_keysMatchedMask');
    buf.add(this._matchPathCRC + '');

    buf.add('hashcode');
    buf.add(this.hashCode() + '');

    return buf.toString();
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
  constructor(private _meta: Meta, private  _keyData: KeyData, private _value: any,
              private _prevMatch: MatchResult) {
    super(null, null, 0, (_prevMatch != null) ? _prevMatch._overUnionMatch : null);
    this._initMatch();

  }

  setOverridesMatch(over: UnionMatchResult) {
    this._overUnionMatch = over;
  }

  matches(): number[] {
    this._invalidateIfStale();
    if (isBlank(this._matches)) {
      this._initMatch();
    }
    return this._matches;
  }

  filterResult(): number[] {
    return this.filter(this._meta._rules, this._meta._ruleCount, this.matches(),
      this._keysMatchedMask, null);
  }

  /**
   * Fill in matchArray with MatchValues to use in Selector matching
   * @param matchArray
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
    let keysMatchedMask = this._keysMatchedMask | (isPresent(
      this._overUnionMatch) ? this._overUnionMatch._keysMatchedMask : 0);

    let overrideMatches: number[];

    if (isPresent(this._overUnionMatch) && isPresent(
      (overrideMatches = this._overUnionMatch.matches()))) {
      if (isBlank(matches)) {
        matches = overrideMatches;

      } else {
        matches = Match.intersect(this._meta._rules, matches, overrideMatches,
          this._keysMatchedMask,
          this._overUnionMatch._keysMatchedMask);
      }
    }

    let matchArray: MatchValue[];
    if (Meta._UsePartialIndexing) {
      matchArray = this._meta.newMatchArray();
      this.initMatchValues(matchArray);
    }

    return this.filter(this._meta._rules, this._meta._ruleCount, matches, keysMatchedMask,
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

  protected join(a: number[], b: number[], aMask: number, bMask: number): number[] {
    return Match.intersect(this._meta._rules, a, b, aMask, bMask);
  }


  protected _initMatch(): void {
    let keyMask: number = shiftLeft(1, this._keyData._id);

    // get vec for this key/value -- if value is list, compute the union
    let newArr: number[];
    if (isArray(this._value)) {

      for (let v of this._value) {
        let a: number[] = this._keyData.lookup(this._meta, v);
        newArr = Match.union(a, newArr);
      }
    } else {
      newArr = this._keyData.lookup(this._meta, this._value);
    }

    let prevMatches: number[] = (isBlank(this._prevMatch)) ? null : this._prevMatch.matches();

    this._keysMatchedMask = (isBlank(
      this._prevMatch)) ? keyMask : (keyMask | this._prevMatch._keysMatchedMask);
    if (isBlank(prevMatches)) {
      this._matches = newArr;
      // Todo: not clear why this is needed, but without it we end up failing to filter
      // certain matches that should be filtered (resulting in bad matches)
      if (!Meta._UsePartialIndexing) {
        this._keysMatchedMask = keyMask;
      }

    } else {
      if (isBlank(newArr)) {
        newArr = Match.EmptyMatchArray;
      }
      // Join
      this._matches = this.join(newArr, prevMatches, keyMask,
        this._prevMatch._keysMatchedMask);
    }

    // compute path CRC
    this._matchPathCRC = -1;
    for (let mr: MatchResult = this; mr != null; mr = mr._prevMatch) {
      this._matchPathCRC = crc32(this._matchPathCRC, mr._keyData._key.length);

      if (isPresent(mr._value)) {
        let value = isArray(mr._value) ? mr._value.join(',') : mr._value;
        this._matchPathCRC = crc32(this._matchPathCRC, hashCode(value));
      }
    }
    if (this._matchPathCRC === 0) {
      this._matchPathCRC = 1;
    }
    this._metaGeneration = this._meta.ruleSetGeneration;
    this._properties = null;
  }


  _logMatchDiff(a: number[], b: number[]): void {
    let iA = 1, sizeA = a[0], iB = 1, sizeB = b[0];

    while (iA <= sizeA || iB <= sizeB) {
      let c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));
      if (c === 0) {
        iA++;
        iB++;
      } else if (c < 0) {
        // If A not in B, but A doesn't filter on B's mask, then add it
        print('  -- Only in A: ' + this._meta._rules[a[iA]]);
        iA++;
      } else {
        print('  -- Only in B: ' + this._meta._rules[b[iB]]);
        iB++;
      }
    }
  }

  properties(): PropertyMap {
    this._invalidateIfStale();
    if (isBlank(this._properties)) {
      this._properties = this._meta.propertiesForMatch(this);
    }
    return this._properties;
  }

  debugString(): string {

    let sj = new StringJoiner(['Match Result path: \n']);
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

  _checkMatch(values: Map<string, any>, meta: Meta): void {
    let arr: number[] = this.filterResult();
    if (isBlank(arr)) {
      return;
    }
    // first entry is count
    let count: number = arr[0];
    for (let i = 0; i < count; i++) {
      let r = this._meta._rules[arr[i + 1]];
      r._checkRule(values, meta);
    }

  }


  equalsTo(o: any): boolean {
    return (o instanceof MatchResult) && super.equalsTo(
      o) && (o._metaGeneration === this._metaGeneration) &&
      o._properties.size === this._properties.size;
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

