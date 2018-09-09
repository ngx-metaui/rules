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
import { StringJoiner } from '@aribaui/core';
import { Rule } from './rule';
import { KeyData, MatchValue, Meta, PropertyMap } from './meta';
/**
 * Represents a set of matching rules resulting from looking up a set of key/values
 *  against the Meta rule base.
 *
 * Instances of the Match superclass are simply immutable snapshots of previous matches
 * (used as keys in Match -> Properties lookup caches).
 * The more meaty class is its static inner subclass, Match.MatchResult.
 */
export declare class Match {
    _matches: number[];
    _keysMatchedMask: number;
    _matchPathCRC: number;
    static readonly EmptyMatchArray: number[];
    static _Debug_ElementProcessCount: number;
    static addInt(intArr: number[], val: number): number[];
    static filterMustUse(rules: Array<Rule>, arr: number[], usesMask: number): number[];
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
    static intersect(allRules: Array<Rule>, a: number[], b: number[], aMask: number, bMask: number): number[];
    static union(a: number[], b: number[]): number[];
    static _arrayEq(a: number[], b: number[]): boolean;
    constructor(_matches: number[], _keysMatchedMask: number, _matchPathCRC?: number);
    /**
     * Filter a partially matched set of rules down to the actual matches.
     * The input set of rules, matchesArr, is based on a *partial* match, and so includes rules
     * that were touched by some of the queried keys, but that may also require *additional* keys
     * that we have not matched on -- these must now be removed. Also, when 'partial indexing',
     * rules are indexed on a subset of their keys, so matchesArr will contain rules that need to
     * be evaluated against those MatchValues upon which they were not indexed (and therefore not
     * intersected / filtered on in the lookup process).
     */
    filter(allRules: Array<Rule>, maxRule: number, matchesArr: number[], queriedMask: number, matchArray: MatchValue[]): number[];
    hashCode(): number;
    readonly keysMatchedMask: number;
    equalsTo(o: any): boolean;
    toString(): string;
}
/**
 *  An Match which includes a UnionMatchResult part (which is used by Context to
 * represent the set of overridden key/values up the stack)
 */
export declare class MatchWithUnion extends Match {
    _matches: number[];
    _keysMatchedMask: number;
    _matchPathCRC: number;
    _overUnionMatch: UnionMatchResult;
    constructor(_matches: number[], _keysMatchedMask: number, _matchPathCRC: number, _overUnionMatch: UnionMatchResult);
    equalsTo(o: any): boolean;
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
export declare class MatchResult extends MatchWithUnion {
    private _meta;
    private _keyData;
    private _value;
    private _prevMatch;
    private _metaGeneration;
    private _properties;
    constructor(_meta: Meta, _keyData: KeyData, _value: any, _prevMatch: MatchResult);
    setOverridesMatch(over: UnionMatchResult): void;
    matches(): number[];
    filterResult(): number[];
    /**
     * Fill in matchArray with MatchValues to use in Selector matching
     * @param matchArray
     */
    initMatchValues(matchArray: MatchValue[]): void;
    filteredMatches(): number[];
    valueForKey(key: string): any;
    immutableCopy(): Match;
    _invalidateIfStale(): void;
    protected join(a: number[], b: number[], aMask: number, bMask: number): number[];
    protected _initMatch(): void;
    _logMatchDiff(a: number[], b: number[]): void;
    properties(): PropertyMap;
    debugString(): string;
    _appendPrevPath(buf: StringJoiner): void;
    _checkMatch(values: Map<string, any>, meta: Meta): void;
    equalsTo(o: any): boolean;
}
export declare class UnionMatchResult extends MatchResult {
    constructor(meta: Meta, keyData: KeyData, value: any, prevMatch: MatchResult);
    protected join(a: number[], b: number[], aMask: number, bMask: number): number[];
}
