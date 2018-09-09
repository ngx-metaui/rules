/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { assert, crc32, hashCode, isArray, isBlank, isPresent, print, shiftLeft, StringJoiner } from '@aribaui/core';
import { Meta } from './meta';
/**
 * Represents a set of matching rules resulting from looking up a set of key/values
 *  against the Meta rule base.
 *
 * Instances of the Match superclass are simply immutable snapshots of previous matches
 * (used as keys in Match -> Properties lookup caches).
 * The more meaty class is its static inner subclass, Match.MatchResult.
 */
export class Match {
    /**
     * @param {?} _matches
     * @param {?} _keysMatchedMask
     * @param {?=} _matchPathCRC
     */
    constructor(_matches, _keysMatchedMask, _matchPathCRC = 0) {
        this._matches = _matches;
        this._keysMatchedMask = _keysMatchedMask;
        this._matchPathCRC = _matchPathCRC;
    }
    /**
     * @param {?} intArr
     * @param {?} val
     * @return {?}
     */
    static addInt(intArr, val) {
        if (isBlank(intArr)) {
            /** @type {?} */
            let r = new Array(4);
            r[0] = 1;
            r[1] = val;
            return r;
        }
        /** @type {?} */
        let newPos = intArr[0];
        if (intArr[newPos++] === val) {
            return intArr;
        } // already here...
        if (newPos >= intArr.length) {
            /** @type {?} */
            let a = new Array(newPos * 2);
            a = intArr.slice(0, newPos);
            intArr = a;
        }
        intArr[newPos] = val;
        intArr[0] = newPos;
        return intArr;
    }
    /**
     * @param {?} rules
     * @param {?} arr
     * @param {?} usesMask
     * @return {?}
     */
    static filterMustUse(rules, arr, usesMask) {
        if (isBlank(arr)) {
            return null;
        }
        /** @type {?} */
        let result;
        /** @type {?} */
        let count = arr[0];
        for (let i = 0; i < count; i++) {
            /** @type {?} */
            let r = arr[i + 1];
            /** @type {?} */
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
     * @param {?} allRules the full rule base
     * @param {?} a first vector of rule indexes
     * @param {?} b second vector of rule indexes
     * @param {?} aMask mask indicating the keys against which the first rule vectors items have
     *     already been matched
     * @param {?} bMask mask indicating the keys against which the second rule vectors items have
     *     already been matched
     * @return {?} rule vector for the matches
     */
    static intersect(allRules, a, b, aMask, bMask) {
        if (isBlank(a)) {
            return b;
        }
        /** @type {?} */
        let result;
        /** @type {?} */
        let iA = 1;
        /** @type {?} */
        let sizeA = isPresent(a[0]) ? a[0] : 0;
        /** @type {?} */
        let iB = 1;
        /** @type {?} */
        let sizeB = isPresent(b[0]) ? b[0] : 0;
        Match._Debug_ElementProcessCount += sizeA + sizeB;
        while (iA <= sizeA || iB <= sizeB) {
            /** @type {?} */
            let iAMask = (iA <= sizeA) ? allRules[a[iA]].keyIndexedMask : 0;
            /** @type {?} */
            let iBMask = (iB <= sizeB) ? allRules[b[iB]].keyIndexedMask : 0;
            /** @type {?} */
            let c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));
            if (c === 0) {
                result = Match.addInt(result, a[iA]);
                iA++;
                iB++;
            }
            else if (c < 0) {
                // If A not in B, but A doesn't filter on B's mask, then add it
                if ((iAMask & bMask) === 0) {
                    result = Match.addInt(result, a[iA]);
                }
                iA++;
            }
            else {
                if ((iBMask & aMask) === 0) {
                    result = Match.addInt(result, b[iB]);
                }
                iB++;
            }
        }
        return result;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static union(a, b) {
        if (isBlank(a)) {
            return b;
        }
        if (isBlank(b)) {
            return a;
        }
        /** @type {?} */
        let sizeA = a[0];
        /** @type {?} */
        let sizeB = b[0];
        if (sizeA === 0) {
            return b;
        }
        if (sizeB === 0) {
            return a;
        }
        Match._Debug_ElementProcessCount += (sizeA + sizeB);
        /** @type {?} */
        let result;
        /** @type {?} */
        let iA = 1;
        /** @type {?} */
        let vA = a[1];
        /** @type {?} */
        let iB = 1;
        /** @type {?} */
        let vB = b[1];
        while (iA <= sizeA || iB <= sizeB) {
            /** @type {?} */
            let c = vA - vB;
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
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static _arrayEq(a, b) {
        if (a === b) {
            return true;
        }
        if (a === null || b === null) {
            return false;
        }
        /** @type {?} */
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
    /**
     * Filter a partially matched set of rules down to the actual matches.
     * The input set of rules, matchesArr, is based on a *partial* match, and so includes rules
     * that were touched by some of the queried keys, but that may also require *additional* keys
     * that we have not matched on -- these must now be removed. Also, when 'partial indexing',
     * rules are indexed on a subset of their keys, so matchesArr will contain rules that need to
     * be evaluated against those MatchValues upon which they were not indexed (and therefore not
     * intersected / filtered on in the lookup process).
     * @param {?} allRules
     * @param {?} maxRule
     * @param {?} matchesArr
     * @param {?} queriedMask
     * @param {?} matchArray
     * @return {?}
     */
    filter(allRules, maxRule, matchesArr, queriedMask, matchArray) {
        if (isBlank(matchesArr)) {
            return null;
        }
        /** @type {?} */
        let result;
        /** @type {?} */
        let count = matchesArr[0];
        for (let i = 0; i < count; i++) {
            /** @type {?} */
            let r = matchesArr[i + 1];
            if (r >= maxRule) {
                continue;
            }
            /** @type {?} */
            let rule = allRules[r];
            if (rule.disabled() || (rule.keyAntiMask & queriedMask) !== 0) {
                continue;
            }
            // Must have matched on (activate) all match keys for this rule, *and*
            // if have any non-indexed rules, need to check match on those
            if (((rule.keyMatchesMask & ~queriedMask) === 0) &&
                ((rule.keyMatchesMask === rule.keyIndexedMask)
                    ||
                        (isPresent(matchArray) && rule.matches(matchArray)))) {
                if (Meta._DebugDoubleCheckMatches && !(matchArray != null && rule.matches(matchArray))) {
                    assert(false, 'Inconsistent (negative) match on rule: ' + rule);
                }
                result = Match.addInt(result, r);
            }
            else if (Meta._DebugDoubleCheckMatches && (matchArray != null && rule.matches(matchArray))) {
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
    /**
     * @return {?}
     */
    hashCode() {
        /** @type {?} */
        let ret = this._keysMatchedMask * 31 + this._matchPathCRC;
        if (isPresent(this._matches)) {
            for (let i = 0, c = this._matches[0]; i < c; i++) {
                ret = crc32(ret, this._matches[i + 1]);
            }
        }
        return ret;
    }
    /**
     * @return {?}
     */
    get keysMatchedMask() {
        return this._keysMatchedMask;
    }
    /**
     * @param {?} o
     * @return {?}
     */
    equalsTo(o) {
        return ((o instanceof Match) && this._keysMatchedMask === o._keysMatchedMask) &&
            this._matchPathCRC === o._matchPathCRC &&
            Match._arrayEq(this._matches, o._matches);
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
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
Match.EmptyMatchArray = [];
Match._Debug_ElementProcessCount = 0;
if (false) {
    /** @type {?} */
    Match.EmptyMatchArray;
    /** @type {?} */
    Match._Debug_ElementProcessCount;
    /** @type {?} */
    Match.prototype._matches;
    /** @type {?} */
    Match.prototype._keysMatchedMask;
    /** @type {?} */
    Match.prototype._matchPathCRC;
}
/**
 *  An Match which includes a UnionMatchResult part (which is used by Context to
 * represent the set of overridden key/values up the stack)
 */
export class MatchWithUnion extends Match {
    /**
     * @param {?} _matches
     * @param {?} _keysMatchedMask
     * @param {?=} _matchPathCRC
     * @param {?=} _overUnionMatch
     */
    constructor(_matches, _keysMatchedMask, _matchPathCRC = 0, _overUnionMatch) {
        super(_matches, _keysMatchedMask, _matchPathCRC);
        this._matches = _matches;
        this._keysMatchedMask = _keysMatchedMask;
        this._matchPathCRC = _matchPathCRC;
        this._overUnionMatch = _overUnionMatch;
    }
    /**
     * @param {?} o
     * @return {?}
     */
    equalsTo(o) {
        return super.equalsTo(o) && ((this._overUnionMatch === o._overUnionMatch) ||
            ((isPresent(this._overUnionMatch)) && isPresent(o._overUnionMatch) && this._overUnionMatch.equalsTo(o._overUnionMatch)));
    }
}
if (false) {
    /** @type {?} */
    MatchWithUnion.prototype._matches;
    /** @type {?} */
    MatchWithUnion.prototype._keysMatchedMask;
    /** @type {?} */
    MatchWithUnion.prototype._matchPathCRC;
    /** @type {?} */
    MatchWithUnion.prototype._overUnionMatch;
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
export class MatchResult extends MatchWithUnion {
    /**
     * @param {?} _meta
     * @param {?} _keyData
     * @param {?} _value
     * @param {?} _prevMatch
     */
    constructor(_meta, _keyData, _value, _prevMatch) {
        super(null, null, 0, (_prevMatch != null) ? _prevMatch._overUnionMatch : null);
        this._meta = _meta;
        this._keyData = _keyData;
        this._value = _value;
        this._prevMatch = _prevMatch;
        this._metaGeneration = 0;
        this._initMatch();
    }
    /**
     * @param {?} over
     * @return {?}
     */
    setOverridesMatch(over) {
        this._overUnionMatch = over;
    }
    /**
     * @return {?}
     */
    matches() {
        this._invalidateIfStale();
        if (isBlank(this._matches)) {
            this._initMatch();
        }
        return this._matches;
    }
    /**
     * @return {?}
     */
    filterResult() {
        return this.filter(this._meta._rules, this._meta._ruleCount, this.matches(), this._keysMatchedMask, null);
    }
    /**
     * Fill in matchArray with MatchValues to use in Selector matching
     * @param {?} matchArray
     * @return {?}
     */
    initMatchValues(matchArray) {
        if (isPresent(this._prevMatch)) {
            this._prevMatch.initMatchValues(matchArray);
        }
        if (isPresent(this._overUnionMatch)) {
            this._overUnionMatch.initMatchValues(matchArray);
        }
        this._meta.matchArrayAssign(matchArray, this._keyData, this._keyData.matchValue(this._value));
    }
    /**
     * @return {?}
     */
    filteredMatches() {
        /** @type {?} */
        let matches = this.matches();
        /** @type {?} */
        let keysMatchedMask = this._keysMatchedMask | (isPresent(this._overUnionMatch) ? this._overUnionMatch._keysMatchedMask : 0);
        /** @type {?} */
        let overrideMatches;
        if (isPresent(this._overUnionMatch) && isPresent((overrideMatches = this._overUnionMatch.matches()))) {
            if (isBlank(matches)) {
                matches = overrideMatches;
            }
            else {
                matches = Match.intersect(this._meta._rules, matches, overrideMatches, this._keysMatchedMask, this._overUnionMatch._keysMatchedMask);
            }
        }
        /** @type {?} */
        let matchArray;
        if (Meta._UsePartialIndexing) {
            matchArray = this._meta.newMatchArray();
            this.initMatchValues(matchArray);
        }
        return this.filter(this._meta._rules, this._meta._ruleCount, matches, keysMatchedMask, matchArray);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    valueForKey(key) {
        return (this._keyData._key === key) ? this._value :
            (isPresent(this._prevMatch) ? this._prevMatch.valueForKey(key) : null);
    }
    /**
     * @return {?}
     */
    immutableCopy() {
        this._invalidateIfStale();
        return new MatchWithUnion(this.matches(), this._keysMatchedMask, this._matchPathCRC, this._overUnionMatch);
    }
    /**
     * @return {?}
     */
    _invalidateIfStale() {
        if (this._metaGeneration < this._meta.ruleSetGeneration) {
            this._initMatch();
        }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @param {?} aMask
     * @param {?} bMask
     * @return {?}
     */
    join(a, b, aMask, bMask) {
        return Match.intersect(this._meta._rules, a, b, aMask, bMask);
    }
    /**
     * @return {?}
     */
    _initMatch() {
        /** @type {?} */
        let keyMask = shiftLeft(1, this._keyData._id);
        /** @type {?} */
        let newArr;
        if (isArray(this._value)) {
            for (let v of this._value) {
                /** @type {?} */
                let a = this._keyData.lookup(this._meta, v);
                newArr = Match.union(a, newArr);
            }
        }
        else {
            newArr = this._keyData.lookup(this._meta, this._value);
        }
        /** @type {?} */
        let prevMatches = (isBlank(this._prevMatch)) ? null : this._prevMatch.matches();
        this._keysMatchedMask = (isBlank(this._prevMatch)) ? keyMask : (keyMask | this._prevMatch._keysMatchedMask);
        if (isBlank(prevMatches)) {
            this._matches = newArr;
            // Todo: not clear why this is needed, but without it we end up failing to filter
            // certain matches that should be filtered (resulting in bad matches)
            if (!Meta._UsePartialIndexing) {
                this._keysMatchedMask = keyMask;
            }
        }
        else {
            if (isBlank(newArr)) {
                newArr = Match.EmptyMatchArray;
            }
            // Join
            this._matches = this.join(newArr, prevMatches, keyMask, this._prevMatch._keysMatchedMask);
        }
        // compute path CRC
        this._matchPathCRC = -1;
        for (let mr = this; mr != null; mr = mr._prevMatch) {
            this._matchPathCRC = crc32(this._matchPathCRC, mr._keyData._key.length);
            if (isPresent(mr._value)) {
                /** @type {?} */
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
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    _logMatchDiff(a, b) {
        /** @type {?} */
        let iA = 1;
        /** @type {?} */
        let sizeA = a[0];
        /** @type {?} */
        let iB = 1;
        /** @type {?} */
        let sizeB = b[0];
        while (iA <= sizeA || iB <= sizeB) {
            /** @type {?} */
            let c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));
            if (c === 0) {
                iA++;
                iB++;
            }
            else if (c < 0) {
                // If A not in B, but A doesn't filter on B's mask, then add it
                print('  -- Only in A: ' + this._meta._rules[a[iA]]);
                iA++;
            }
            else {
                print('  -- Only in B: ' + this._meta._rules[b[iB]]);
                iB++;
            }
        }
    }
    /**
     * @return {?}
     */
    properties() {
        this._invalidateIfStale();
        if (isBlank(this._properties)) {
            this._properties = this._meta.propertiesForMatch(this);
        }
        return this._properties;
    }
    /**
     * @return {?}
     */
    debugString() {
        /** @type {?} */
        let sj = new StringJoiner(['Match Result path: \n']);
        this._appendPrevPath(sj);
        if (isPresent(this._overUnionMatch)) {
            sj.add('\nOverrides path: ');
            this._overUnionMatch._appendPrevPath(sj);
        }
        return sj.toString();
    }
    /**
     * @param {?} buf
     * @return {?}
     */
    _appendPrevPath(buf) {
        if (isPresent(this._prevMatch)) {
            this._prevMatch._appendPrevPath(buf);
            buf.add(' -> ');
        }
        buf.add(this._keyData._key);
        buf.add('=');
        buf.add(this._value);
    }
    /**
     * @param {?} values
     * @param {?} meta
     * @return {?}
     */
    _checkMatch(values, meta) {
        /** @type {?} */
        let arr = this.filterResult();
        if (isBlank(arr)) {
            return;
        }
        /** @type {?} */
        let count = arr[0];
        for (let i = 0; i < count; i++) {
            /** @type {?} */
            let r = this._meta._rules[arr[i + 1]];
            r._checkRule(values, meta);
        }
    }
    /**
     * @param {?} o
     * @return {?}
     */
    equalsTo(o) {
        return (o instanceof MatchResult) && super.equalsTo(o) && (o._metaGeneration === this._metaGeneration) &&
            o._properties.size === this._properties.size;
    }
}
if (false) {
    /** @type {?} */
    MatchResult.prototype._metaGeneration;
    /** @type {?} */
    MatchResult.prototype._properties;
    /** @type {?} */
    MatchResult.prototype._meta;
    /** @type {?} */
    MatchResult.prototype._keyData;
    /** @type {?} */
    MatchResult.prototype._value;
    /** @type {?} */
    MatchResult.prototype._prevMatch;
}
export class UnionMatchResult extends MatchResult {
    /**
     * @param {?} meta
     * @param {?} keyData
     * @param {?} value
     * @param {?} prevMatch
     */
    constructor(meta, keyData, value, prevMatch) {
        super(meta, keyData, value, prevMatch);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @param {?} aMask
     * @param {?} bMask
     * @return {?}
     */
    join(a, b, aMask, bMask) {
        return Match.union(a, b);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL21hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFtQkEsT0FBTyxFQUNILE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxFQUNULEtBQUssRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBc0IsSUFBSSxFQUFjLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7QUFXOUQsTUFBTTs7Ozs7O0lBOEtGLFlBQW1CLFFBQWtCLEVBQVMsZ0JBQXdCLEVBQ2xELGdCQUF3QixDQUFDO1FBRDFCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7UUFDbEQsa0JBQWEsR0FBYixhQUFhO0tBRWhDOzs7Ozs7SUF6S0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFnQixFQUFFLEdBQVc7UUFFdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDbEIsSUFBSSxDQUFDLEdBQWtCLElBQUksS0FBSyxDQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRVgsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNaOztRQUNELElBQUksTUFBTSxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDakI7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1B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QyxDQUFDO2dCQUNULEVBQUUsRUFBRSxDQUFDO2dCQUNMLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQ2pEO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFDakQ7U0FDSjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDakI7Ozs7OztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBVyxFQUFFLENBQVc7UUFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7O1FBQ0QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7UUFDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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Q0FBQztLQUMxQzs7Ozs7Ozs7SUFHUyxJQUFJLENBQUMsQ0FBVyxFQUFFLENBQVcsRUFBRSxLQUFhLEVBQUUsS0FBYTtRQUVqRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FFNUI7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBhc3NlcnQsXG4gICAgY3JjMzIsXG4gICAgaGFzaENvZGUsXG4gICAgaXNBcnJheSxcbiAgICBpc0JsYW5rLFxuICAgIGlzUHJlc2VudCxcbiAgICBwcmludCxcbiAgICBzaGlmdExlZnQsXG4gICAgU3RyaW5nSm9pbmVyXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtSdWxlfSBmcm9tICcuL3J1bGUnO1xuaW1wb3J0IHtLZXlEYXRhLCBNYXRjaFZhbHVlLCBNZXRhLCBQcm9wZXJ0eU1hcH0gZnJvbSAnLi9tZXRhJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzZXQgb2YgbWF0Y2hpbmcgcnVsZXMgcmVzdWx0aW5nIGZyb20gbG9va2luZyB1cCBhIHNldCBvZiBrZXkvdmFsdWVzXG4gKiAgYWdhaW5zdCB0aGUgTWV0YSBydWxlIGJhc2UuXG4gKlxuICogSW5zdGFuY2VzIG9mIHRoZSBNYXRjaCBzdXBlcmNsYXNzIGFyZSBzaW1wbHkgaW1tdXRhYmxlIHNuYXBzaG90cyBvZiBwcmV2aW91cyBtYXRjaGVzXG4gKiAodXNlZCBhcyBrZXlzIGluIE1hdGNoIC0+IFByb3BlcnRpZXMgbG9va3VwIGNhY2hlcykuXG4gKiBUaGUgbW9yZSBtZWF0eSBjbGFzcyBpcyBpdHMgc3RhdGljIGlubmVyIHN1YmNsYXNzLCBNYXRjaC5NYXRjaFJlc3VsdC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1hdGNoXG57XG4gICAgc3RhdGljIHJlYWRvbmx5IEVtcHR5TWF0Y2hBcnJheTogbnVtYmVyW10gPSBbXTtcblxuICAgIHN0YXRpYyBfRGVidWdfRWxlbWVudFByb2Nlc3NDb3VudDogbnVtYmVyID0gMDtcblxuXG4gICAgLy8gV29yZCBsaXN0cyBhcmUgaW50IGFycmF5cyB3aXRoIHRoZSBmaXJzdCBlbGVtZW50IGhvbGRpbmcgdGhlIGxlbmd0aFxuICAgIHN0YXRpYyBhZGRJbnQoaW50QXJyOiBudW1iZXJbXSwgdmFsOiBudW1iZXIpOiBudW1iZXJbXVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoaW50QXJyKSkge1xuICAgICAgICAgICAgbGV0IHI6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPig0KTtcbiAgICAgICAgICAgIHJbMF0gPSAxO1xuICAgICAgICAgICAgclsxXSA9IHZhbDtcblxuICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld1BvczogbnVtYmVyID0gaW50QXJyWzBdO1xuICAgICAgICBpZiAoaW50QXJyW25ld1BvcysrXSA9PT0gdmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50QXJyO1xuICAgICAgICB9ICAvLyBhbHJlYWR5IGhlcmUuLi5cblxuICAgICAgICBpZiAobmV3UG9zID49IGludEFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBhOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4obmV3UG9zICogMik7XG4gICAgICAgICAgICBhID0gaW50QXJyLnNsaWNlKDAsIG5ld1Bvcyk7XG4gICAgICAgICAgICBpbnRBcnIgPSBhO1xuICAgICAgICB9XG4gICAgICAgIGludEFycltuZXdQb3NdID0gdmFsO1xuICAgICAgICBpbnRBcnJbMF0gPSBuZXdQb3M7XG4gICAgICAgIHJldHVybiBpbnRBcnI7XG4gICAgfVxuXG4gICAgLy8gb25seSBydWxlcyB0aGF0IHVzZSBvbmx5IHRoZSBhY3RpdmF0ZWQgKHF1ZXJpZWQpIGtleXNcbiAgICBzdGF0aWMgZmlsdGVyTXVzdFVzZShydWxlczogQXJyYXk8UnVsZT4sIGFycjogbnVtYmVyW10sIHVzZXNNYXNrOiBudW1iZXIpOiBudW1iZXJbXVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyW107XG4gICAgICAgIGxldCBjb3VudCA9IGFyclswXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgciA9IGFycltpICsgMV07XG4gICAgICAgICAgICBsZXQgcnVsZSA9IHJ1bGVzW3JdO1xuICAgICAgICAgICAgaWYgKChydWxlLmtleU1hdGNoZXNNYXNrICYgdXNlc01hc2spICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gTWF0Y2guYWRkSW50KHJlc3VsdCwgcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEludGVyc2VjdHMgdHdvIHJ1bGV2ZWNzLiAgVGhpcyBpcyBub3QgYSB0cmFkaXRpb25hbCBpbnRlcnNlY3Rpb24gd2hlcmUgb25seSBpdGVtcyBpbiBib3RoXG4gICAgICogaW5wdXRzIGFyZSBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0OiB3ZSBvbmx5IGludGVyc2VjdCBydWxlcyB0aGF0IG1hdGNoIG9uIGNvbW1vbiBrZXlzO1xuICAgICAqIG90aGVycyBhcmUgdW5pb25lZC5cbiAgICAgKlxuICAgICAqIEZvciBpbnN0YW5jZSwgc2F5IHdlIGhhdmUgdGhlIGZvbGxvd2luZyBpbnB1dHM6XG4gICAgICogICAgICBhOiAgW21hdGNoZWQgb246IGNsYXNzLCBsYXlvdXRdICAoY2xhc3M9Rm9vLCBsYXlvdXQ9SW5zcGVjdClcbiAgICAgKiAgICAgICAgICAxKSBjbGFzcz1Gb28gbGF5b3V0PUluc3BlY3QgeyAuLi4gfVxuICAgICAqICAgICAgICAgIDIpIGNsYXNzPUZvbyBvcGVyYXRpb249ZWRpdCB7IC4uLiB9XG4gICAgICogICAgICAgICAgMykgbGF5b3V0PUluc3BlY3Qgb3BlcmF0aW9uPXZpZXcgeyAuLi4gfVxuICAgICAqXG4gICAgICogICAgICBiOiAgW21hdGNoZWQgb246IG9wZXJhdGlvbl0gIChvcGVyYXRpb249dmlldylcbiAgICAgKiAgICAgICAgICAzKSBsYXlvdXQ9SW5zcGVjdCBvcGVyYXRpb249dmlldyB7IC4uLiB9XG4gICAgICogICAgICAgICAgNCkgb3BlcmF0aW9uPXZpZXcgdHlwZT1TdHJpbmcgeyAuLi4gfVxuICAgICAqICAgICAgICAgIDUpIG9wZXJhdGlvbj12aWV3IGxheW91dD1UYWJzIHsgLi4uIH1cbiAgICAgKlxuICAgICAqIFRoZSByZXN1bHQgc2hvdWxkIGJlOiAxLCAzLCA0XG4gICAgICogSS5lLjogaXRlbXMgdGhhdCBhcHBlYXIgaW4gYm90aCAoIzMgYWJvdmUpIGFyZSBpbmNsdWRlZCwgYXMgYXJlIGl0ZW1zIHRoYXQgYXBwZWFyIGluIGp1c3RcbiAgICAgKiBvbmUsXG4gICAgICogKmJ1dCBkb24ndCBtYXRjaCBvbiB0aGUga2V5cyBpbiB0aGUgb3RoZXIqICgjMSBhbmQgIzQgYWJvdmUpLlxuICAgICAqXG4gICAgICogQHBhcmFtIGFsbFJ1bGVzIHRoZSBmdWxsIHJ1bGUgYmFzZVxuICAgICAqIEBwYXJhbSBhIGZpcnN0IHZlY3RvciBvZiBydWxlIGluZGV4ZXNcbiAgICAgKiBAcGFyYW0gYiBzZWNvbmQgdmVjdG9yIG9mIHJ1bGUgaW5kZXhlc1xuICAgICAqIEBwYXJhbSBhTWFzayBtYXNrIGluZGljYXRpbmcgdGhlIGtleXMgYWdhaW5zdCB3aGljaCB0aGUgZmlyc3QgcnVsZSB2ZWN0b3JzIGl0ZW1zIGhhdmVcbiAgICAgKiAgICAgYWxyZWFkeSBiZWVuIG1hdGNoZWRcbiAgICAgKiBAcGFyYW0gYk1hc2sgbWFzayBpbmRpY2F0aW5nIHRoZSBrZXlzIGFnYWluc3Qgd2hpY2ggdGhlIHNlY29uZCBydWxlIHZlY3RvcnMgaXRlbXMgaGF2ZVxuICAgICAqICAgICBhbHJlYWR5IGJlZW4gbWF0Y2hlZFxuICAgICAqIEByZXR1cm4gcnVsZSB2ZWN0b3IgZm9yIHRoZSBtYXRjaGVzXG4gICAgICovXG4gICAgc3RhdGljIGludGVyc2VjdChhbGxSdWxlczogQXJyYXk8UnVsZT4sIGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSwgYU1hc2s6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgIGJNYXNrOiBudW1iZXIpOiBudW1iZXJbXVxuICAgIHtcblxuICAgICAgICBpZiAoaXNCbGFuayhhKSkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyW107XG4gICAgICAgIGxldCBpQSA9IDEsIHNpemVBID0gaXNQcmVzZW50KGFbMF0pID8gYVswXSA6IDAsIGlCID0gMSwgc2l6ZUIgPSBpc1ByZXNlbnQoYlswXSkgPyBiWzBdIDogMDtcbiAgICAgICAgTWF0Y2guX0RlYnVnX0VsZW1lbnRQcm9jZXNzQ291bnQgKz0gc2l6ZUEgKyBzaXplQjtcblxuICAgICAgICB3aGlsZSAoaUEgPD0gc2l6ZUEgfHwgaUIgPD0gc2l6ZUIpIHtcbiAgICAgICAgICAgIGxldCBpQU1hc2sgPSAoaUEgPD0gc2l6ZUEpID8gYWxsUnVsZXNbYVtpQV1dLmtleUluZGV4ZWRNYXNrIDogMDtcbiAgICAgICAgICAgIGxldCBpQk1hc2sgPSAoaUIgPD0gc2l6ZUIpID8gYWxsUnVsZXNbYltpQl1dLmtleUluZGV4ZWRNYXNrIDogMDtcbiAgICAgICAgICAgIGxldCBjID0gKGlBID4gc2l6ZUEgPyAxIDogKGlCID4gc2l6ZUIgPyAtMSA6IChhW2lBXSAtIGJbaUJdKSkpO1xuXG4gICAgICAgICAgICBpZiAoYyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE1hdGNoLmFkZEludChyZXN1bHQsIGFbaUFdKTtcbiAgICAgICAgICAgICAgICBpQSsrO1xuICAgICAgICAgICAgICAgIGlCKys7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA8IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBBIG5vdCBpbiBCLCBidXQgQSBkb2Vzbid0IGZpbHRlciBvbiBCJ3MgbWFzaywgdGhlbiBhZGQgaXRcbiAgICAgICAgICAgICAgICBpZiAoKGlBTWFzayAmIGJNYXNrKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBNYXRjaC5hZGRJbnQocmVzdWx0LCBhW2lBXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlBKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgoaUJNYXNrICYgYU1hc2spID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IE1hdGNoLmFkZEludChyZXN1bHQsIGJbaUJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaUIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyB1bmlvbihhOiBudW1iZXJbXSwgYjogbnVtYmVyW10pOiBudW1iZXJbXVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoYSkpIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JsYW5rKGIpKSB7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2l6ZUEgPSBhWzBdLCBzaXplQiA9IGJbMF07XG4gICAgICAgIGlmIChzaXplQSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpemVCID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgICAgICBNYXRjaC5fRGVidWdfRWxlbWVudFByb2Nlc3NDb3VudCArPSAoc2l6ZUEgKyBzaXplQik7XG5cbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyW107XG4gICAgICAgIGxldCBpQSA9IDEsIHZBID0gYVsxXSwgaUIgPSAxLCB2QiA9IGJbMV07XG5cblxuICAgICAgICB3aGlsZSAoaUEgPD0gc2l6ZUEgfHwgaUIgPD0gc2l6ZUIpIHtcbiAgICAgICAgICAgIGxldCBjOiBudW1iZXIgPSB2QSAtIHZCO1xuICAgICAgICAgICAgcmVzdWx0ID0gTWF0Y2guYWRkSW50KHJlc3VsdCwgKChjIDw9IDApID8gdkEgOiB2QikpO1xuICAgICAgICAgICAgaWYgKGMgPD0gMCkge1xuICAgICAgICAgICAgICAgIGlBKys7XG4gICAgICAgICAgICAgICAgdkEgPSAoaUEgPD0gc2l6ZUEpID8gYVtpQV0gOiBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPj0gMCkge1xuICAgICAgICAgICAgICAgIGlCKys7XG4gICAgICAgICAgICAgICAgdkIgPSAoaUIgPD0gc2l6ZUIpID8gYltpQl0gOiBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIF9hcnJheUVxKGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmIChhID09PSBiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYSA9PT0gbnVsbCB8fCBiID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvdW50ID0gYVswXTtcbiAgICAgICAgaWYgKGNvdW50ICE9PSBiWzBdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291bnQ7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIF9tYXRjaGVzOiBudW1iZXJbXSwgcHVibGljIF9rZXlzTWF0Y2hlZE1hc2s6IG51bWJlcixcbiAgICAgICAgICAgICAgICBwdWJsaWMgIF9tYXRjaFBhdGhDUkM6IG51bWJlciA9IDApXG4gICAge1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRmlsdGVyIGEgcGFydGlhbGx5IG1hdGNoZWQgc2V0IG9mIHJ1bGVzIGRvd24gdG8gdGhlIGFjdHVhbCBtYXRjaGVzLlxuICAgICAqIFRoZSBpbnB1dCBzZXQgb2YgcnVsZXMsIG1hdGNoZXNBcnIsIGlzIGJhc2VkIG9uIGEgKnBhcnRpYWwqIG1hdGNoLCBhbmQgc28gaW5jbHVkZXMgcnVsZXNcbiAgICAgKiB0aGF0IHdlcmUgdG91Y2hlZCBieSBzb21lIG9mIHRoZSBxdWVyaWVkIGtleXMsIGJ1dCB0aGF0IG1heSBhbHNvIHJlcXVpcmUgKmFkZGl0aW9uYWwqIGtleXNcbiAgICAgKiB0aGF0IHdlIGhhdmUgbm90IG1hdGNoZWQgb24gLS0gdGhlc2UgbXVzdCBub3cgYmUgcmVtb3ZlZC4gQWxzbywgd2hlbiAncGFydGlhbCBpbmRleGluZycsXG4gICAgICogcnVsZXMgYXJlIGluZGV4ZWQgb24gYSBzdWJzZXQgb2YgdGhlaXIga2V5cywgc28gbWF0Y2hlc0FyciB3aWxsIGNvbnRhaW4gcnVsZXMgdGhhdCBuZWVkIHRvXG4gICAgICogYmUgZXZhbHVhdGVkIGFnYWluc3QgdGhvc2UgTWF0Y2hWYWx1ZXMgdXBvbiB3aGljaCB0aGV5IHdlcmUgbm90IGluZGV4ZWQgKGFuZCB0aGVyZWZvcmUgbm90XG4gICAgICogaW50ZXJzZWN0ZWQgLyBmaWx0ZXJlZCBvbiBpbiB0aGUgbG9va3VwIHByb2Nlc3MpLlxuICAgICAqL1xuICAgIGZpbHRlcihhbGxSdWxlczogQXJyYXk8UnVsZT4sIG1heFJ1bGU6IG51bWJlciwgbWF0Y2hlc0FycjogbnVtYmVyW10sIHF1ZXJpZWRNYXNrOiBudW1iZXIsXG4gICAgICAgICAgIG1hdGNoQXJyYXk6IE1hdGNoVmFsdWVbXSk6IG51bWJlcltdXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhtYXRjaGVzQXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJpbnQoJ1xcbiMjIEZpbHRlcmluZyBtYXRjaGluZzogJyArIG1hdGNoZXNBcnJbMF0gKyAnLCBRdWVyaWVkIE1hc2s6ICcgKyBxdWVyaWVkTWFzayk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAxOyBpIDw9IG1hdGNoZXNBcnJbMF07IGkrKykge1xuICAgICAgICAvLyAgICAgcHJpbnQoJyMjICcgKyBtYXRjaGVzQXJyW2ldICsgJyk6ICcgKyBhbGxSdWxlc1ttYXRjaGVzQXJyW2ldXS50b1N0cmluZygpKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlcltdO1xuICAgICAgICBsZXQgY291bnQgPSBtYXRjaGVzQXJyWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHIgPSBtYXRjaGVzQXJyW2kgKyAxXTtcbiAgICAgICAgICAgIGlmIChyID49IG1heFJ1bGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBydWxlOiBSdWxlID0gYWxsUnVsZXNbcl07XG5cblxuICAgICAgICAgICAgaWYgKHJ1bGUuZGlzYWJsZWQoKSB8fCAocnVsZS5rZXlBbnRpTWFzayAmIHF1ZXJpZWRNYXNrKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNdXN0IGhhdmUgbWF0Y2hlZCBvbiAoYWN0aXZhdGUpIGFsbCBtYXRjaCBrZXlzIGZvciB0aGlzIHJ1bGUsICphbmQqXG4gICAgICAgICAgICAvLyBpZiBoYXZlIGFueSBub24taW5kZXhlZCBydWxlcywgbmVlZCB0byBjaGVjayBtYXRjaCBvbiB0aG9zZVxuICAgICAgICAgICAgaWYgKCgocnVsZS5rZXlNYXRjaGVzTWFzayAmIH5xdWVyaWVkTWFzaykgPT09IDApICYmXG4gICAgICAgICAgICAgICAgKChydWxlLmtleU1hdGNoZXNNYXNrID09PSBydWxlLmtleUluZGV4ZWRNYXNrKVxuICAgICAgICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgKGlzUHJlc2VudChtYXRjaEFycmF5KSAmJiBydWxlLm1hdGNoZXMobWF0Y2hBcnJheSkpKSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKE1ldGEuX0RlYnVnRG91YmxlQ2hlY2tNYXRjaGVzICYmICEobWF0Y2hBcnJheSAhPSBudWxsICYmIHJ1bGUubWF0Y2hlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoQXJyYXkpKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoZmFsc2UsICdJbmNvbnNpc3RlbnQgKG5lZ2F0aXZlKSBtYXRjaCBvbiBydWxlOiAnICsgcnVsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBNYXRjaC5hZGRJbnQocmVzdWx0LCByKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWV0YS5fRGVidWdEb3VibGVDaGVja01hdGNoZXMgJiYgKG1hdGNoQXJyYXkgIT0gbnVsbCAmJiBydWxlLm1hdGNoZXMoXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoQXJyYXkpKSkge1xuICAgICAgICAgICAgICAgIC8vIEFzc2VydC50aGF0KGZhbHNlLCAnSW5jb25zaXN0ZW50IChwb3NpdGl2ZSkgbWF0Y2ggb24gcnVsZTogJXMnLCBydWxlKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKGlzUHJlc2VudChyZXN1bHQpICYmIHJlc3VsdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vICAgICBwcmludCgnXFxuXFxuXFxuICMjIyMgRmlsdGVyaW5nIFJFU1VMVDogJyArIHJlc3VsdFswXSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSByZXN1bHRbMF07IGkrKykge1xuICAgICAgICAvLyAgICAgICAgIHByaW50KCcjIyAnICsgcmVzdWx0W2ldICsgJyk6ICcgKyBhbGxSdWxlc1tyZXN1bHRbaV1dLnRvU3RyaW5nKCkpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBoYXNoQ29kZSgpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCByZXQgPSB0aGlzLl9rZXlzTWF0Y2hlZE1hc2sgKiAzMSArIHRoaXMuX21hdGNoUGF0aENSQztcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9tYXRjaGVzKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSB0aGlzLl9tYXRjaGVzWzBdOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gY3JjMzIocmV0LCB0aGlzLl9tYXRjaGVzW2kgKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cblxuICAgIGdldCBrZXlzTWF0Y2hlZE1hc2soKTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5c01hdGNoZWRNYXNrO1xuICAgIH1cblxuICAgIGVxdWFsc1RvKG86IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAoKG8gaW5zdGFuY2VvZiBNYXRjaCkgJiYgdGhpcy5fa2V5c01hdGNoZWRNYXNrID09PSBvLl9rZXlzTWF0Y2hlZE1hc2spICYmXG4gICAgICAgICAgICB0aGlzLl9tYXRjaFBhdGhDUkMgPT09IG8uX21hdGNoUGF0aENSQyAmJlxuICAgICAgICAgICAgTWF0Y2guX2FycmF5RXEodGhpcy5fbWF0Y2hlcywgby5fbWF0Y2hlcyk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKVxuICAgIHtcbiAgICAgICAgbGV0IGJ1ZiA9IG5ldyBTdHJpbmdKb2luZXIoW10pO1xuICAgICAgICBidWYuYWRkKCdfbWF0Y2hlcycpO1xuICAgICAgICBidWYuYWRkKChpc1ByZXNlbnQodGhpcy5fbWF0Y2hlcykgPyB0aGlzLl9tYXRjaGVzLmxlbmd0aCA6IDApICsgJycpO1xuICAgICAgICBidWYuYWRkKCdfa2V5c01hdGNoZWRNYXNrJyk7XG4gICAgICAgIGJ1Zi5hZGQodGhpcy5fa2V5c01hdGNoZWRNYXNrICsgJycpO1xuICAgICAgICBidWYuYWRkKCdfa2V5c01hdGNoZWRNYXNrJyk7XG4gICAgICAgIGJ1Zi5hZGQodGhpcy5fbWF0Y2hQYXRoQ1JDICsgJycpO1xuXG4gICAgICAgIGJ1Zi5hZGQoJ2hhc2hjb2RlJyk7XG4gICAgICAgIGJ1Zi5hZGQodGhpcy5oYXNoQ29kZSgpICsgJycpO1xuXG4gICAgICAgIHJldHVybiBidWYudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cbi8qKlxuICogIEFuIE1hdGNoIHdoaWNoIGluY2x1ZGVzIGEgVW5pb25NYXRjaFJlc3VsdCBwYXJ0ICh3aGljaCBpcyB1c2VkIGJ5IENvbnRleHQgdG9cbiAqIHJlcHJlc2VudCB0aGUgc2V0IG9mIG92ZXJyaWRkZW4ga2V5L3ZhbHVlcyB1cCB0aGUgc3RhY2spXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRjaFdpdGhVbmlvbiBleHRlbmRzIE1hdGNoXG57XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX21hdGNoZXM6IG51bWJlcltdLCBwdWJsaWMgIF9rZXlzTWF0Y2hlZE1hc2s6IG51bWJlcixcbiAgICAgICAgICAgICAgICBwdWJsaWMgIF9tYXRjaFBhdGhDUkM6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgcHVibGljIF9vdmVyVW5pb25NYXRjaDogVW5pb25NYXRjaFJlc3VsdClcbiAgICB7XG4gICAgICAgIHN1cGVyKF9tYXRjaGVzLCBfa2V5c01hdGNoZWRNYXNrLCBfbWF0Y2hQYXRoQ1JDKTtcbiAgICB9XG5cblxuICAgIGVxdWFsc1RvKG86IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzdXBlci5lcXVhbHNUbyhvKSAmJiAoXG4gICAgICAgICAgICAodGhpcy5fb3ZlclVuaW9uTWF0Y2ggPT09IG8uX292ZXJVbmlvbk1hdGNoKSB8fFxuICAgICAgICAgICAgKChpc1ByZXNlbnQodGhpcy5fb3ZlclVuaW9uTWF0Y2gpKSAmJiBpc1ByZXNlbnQoXG4gICAgICAgICAgICAgICAgby5fb3ZlclVuaW9uTWF0Y2gpICYmIHRoaXMuX292ZXJVbmlvbk1hdGNoLmVxdWFsc1RvKFxuICAgICAgICAgICAgICAgIG8uX292ZXJVbmlvbk1hdGNoKSkpO1xuICAgIH1cblxufVxuXG4vKipcbiAqICBNYXRjaFJlc3VsdCByZXByZXNlbnRzIHRoZSByZXN1bHQgb2YgY29tcHV0aW5nIHRoZSBzZXQgb2YgbWF0Y2hpbmcgcnVsZXNcbiAqICBiYXNlZCBvbiB0aGUga2V5L3ZhbHVlIG9uIHRoaXMgaW5zdGFuY2UsIGFuZCB0aGUgb3RoZXIga2V5L3ZhbHVlIHBhaXJzXG4gKiBvbiBpdHMgcHJlZGVjZXNzb3IgY2hhaW4uICBJLmUuIHRvIGZpbmQgdGhlIG1hdGNoaW5nIHJ1bGVzIGZvciB0aGUgY29udGV4dCBrZXlzXG4gKiB7b3BlcmF0aW9uPWVkaXQ7IGxheW91dD1JbnNwZWN0OyBjbGFzcz1Gb299LCBmaXJzdCBhIE1hdGNoUmVzdWx0IGlzIGNyZWF0ZWQgZm9yXG4gKiAnb3BlcmF0aW9uPWVkaXQnIGFuZCBwYXNzZWQgYXMgdGhlICdwcmV2JyB0byB0aGUgY3JlYXRpb24gb2YgYW5vdGhlciBmb3IgJ2xheW91dD1JbnNwZWN0JyxcbiAqIGFuZCBzbyBvbi4gIEluIHRoaXMgd2F5IHRoZSBNYXRjaFJlc3VsdHMgZm9ybSBhICooc2hhcmFibGUpIHBhcnRpYWwtbWF0Y2ggdHJlZS4qXG4gKlxuICogVGhlIGFiaWxpdHkgdG8gcmVzdWx0IHByZXZpb3VzIHBhcnRpYWwgbWF0Y2ggJ3BhdGhzJyBpcyBhbiBpbXBvcnRhbnQgb3B0aW1pemF0aW9uOlxuICogdGhlIHByaW1hcnkgY2xpZW50IG9mIE1hdGNoUmVzdWx0IChhbmQgb2YgcnVsZSBtYXRjaGluZyBpbiBnZW5lcmFsKSBpcyB0aGUgQ29udGV4dCwgd2hlbiBlYWNoXG4gKiBhc3NpZ25tZW50IHB1c2hlcyBhIHJlY29yZCBvbiBhIHN0YWNrIHRoYXQgKHJvdWdobHkpIGV4dGVuZHMgdGhlIE1hdGNoIGZyb20gdGhlIHByZXZpb3VzXG4gKiBhc3NpZ25tZW50LiAgQnkgY2FjaGluZyBNYXRjaFJlc3VsdCBpbnN0YW5jZXMgb24gdGhlIF9Bc3NpZ25tZW50IHJlY29yZHMsIG1hdGNoaW5nIGlzIGxpbWl0ZWRcbiAqICB0byB0aGUgKmluY3JlbWVudGFsKiBtYXRjaGluZyBvbiBqdXN0IHRoZSBuZXcgYXNzaWdubWVudCwgbm90IGEgZnVsbCBtYXRjaCBvbiBhbGwga2V5cyBpbiB0aGVcbiAqICBjb250ZXh0LlxuICpcbiAqIEZ1cnRoZXIsIGEgTWF0Y2hSZXN1bHQgY2FjaGVzIHRoZSAqcHJvcGVydHkgbWFwKiByZXN1bHRpbmcgZnJvbSB0aGUgYXBwbGljYXRpb24gb2YgdGhlIHJ1bGVzXG4gKiAgdGhhdCBpdCBtYXRjaGVzLiAgQnkgY2FjaGluZyBNYXRjaFJlc3VsdCBvYmplY3RzIChhbmQgY2FjaGluZyB0aGUgbWFwIGZyb21cbiAqICBSdWxlIHZlY3RvciAoQUtBIE1hdGNoKSAtPiBNYXRjaFJlc3VsdCAtPiBQcm9wZXJ0eU1hcCksIHJlZHVkYW50IHJ1bGUgYXBwbGljYXRpb24gKGFuZCBjcmVhdGlvblxuICogb2YgYWRkaXRpb25hbCBwcm9wZXJ0eSBtYXBzKSBpcyBhdm9pZGVkLlxuICovXG4gICAgLy8gdG9kbzogaW1wbGVtZW50IHRvU3RyaW5nIGZvciB0aGUgRGljdG9uYXJ5IGFzIHRoaXMgaXMgdXNlZCBhcyBhIGtleVxuZXhwb3J0IGNsYXNzIE1hdGNoUmVzdWx0IGV4dGVuZHMgTWF0Y2hXaXRoVW5pb25cbntcblxuICAgIHByaXZhdGUgX21ldGFHZW5lcmF0aW9uOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3Byb3BlcnRpZXM6IFByb3BlcnR5TWFwO1xuXG4gICAgLy8gTWV0YSBtZXRhLCBNZXRhLktleURhdGEga2V5RGF0YSwgT2JqZWN0IHZhbHVlLCBNYXRjaFJlc3VsdCBwcmV2KVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21ldGE6IE1ldGEsIHByaXZhdGUgIF9rZXlEYXRhOiBLZXlEYXRhLCBwcml2YXRlIF92YWx1ZTogYW55LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3ByZXZNYXRjaDogTWF0Y2hSZXN1bHQpXG4gICAge1xuICAgICAgICBzdXBlcihudWxsLCBudWxsLCAwLCAoX3ByZXZNYXRjaCAhPSBudWxsKSA/IF9wcmV2TWF0Y2guX292ZXJVbmlvbk1hdGNoIDogbnVsbCk7XG4gICAgICAgIHRoaXMuX2luaXRNYXRjaCgpO1xuXG4gICAgfVxuXG4gICAgc2V0T3ZlcnJpZGVzTWF0Y2gob3ZlcjogVW5pb25NYXRjaFJlc3VsdClcbiAgICB7XG4gICAgICAgIHRoaXMuX292ZXJVbmlvbk1hdGNoID0gb3ZlcjtcbiAgICB9XG5cbiAgICBtYXRjaGVzKCk6IG51bWJlcltdXG4gICAge1xuICAgICAgICB0aGlzLl9pbnZhbGlkYXRlSWZTdGFsZSgpO1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9tYXRjaGVzKSkge1xuICAgICAgICAgICAgdGhpcy5faW5pdE1hdGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoZXM7XG4gICAgfVxuXG4gICAgZmlsdGVyUmVzdWx0KCk6IG51bWJlcltdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5fbWV0YS5fcnVsZXMsIHRoaXMuX21ldGEuX3J1bGVDb3VudCwgdGhpcy5tYXRjaGVzKCksXG4gICAgICAgICAgICB0aGlzLl9rZXlzTWF0Y2hlZE1hc2ssIG51bGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbGwgaW4gbWF0Y2hBcnJheSB3aXRoIE1hdGNoVmFsdWVzIHRvIHVzZSBpbiBTZWxlY3RvciBtYXRjaGluZ1xuICAgICAqIEBwYXJhbSBtYXRjaEFycmF5XG4gICAgICovXG4gICAgaW5pdE1hdGNoVmFsdWVzKG1hdGNoQXJyYXk6IE1hdGNoVmFsdWVbXSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcHJldk1hdGNoKSkge1xuICAgICAgICAgICAgdGhpcy5fcHJldk1hdGNoLmluaXRNYXRjaFZhbHVlcyhtYXRjaEFycmF5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX292ZXJVbmlvbk1hdGNoKSkge1xuICAgICAgICAgICAgdGhpcy5fb3ZlclVuaW9uTWF0Y2guaW5pdE1hdGNoVmFsdWVzKG1hdGNoQXJyYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21ldGEubWF0Y2hBcnJheUFzc2lnbihtYXRjaEFycmF5LCB0aGlzLl9rZXlEYXRhLFxuICAgICAgICAgICAgdGhpcy5fa2V5RGF0YS5tYXRjaFZhbHVlKHRoaXMuX3ZhbHVlKSk7XG4gICAgfVxuXG5cbiAgICBmaWx0ZXJlZE1hdGNoZXMoKTogbnVtYmVyW11cbiAgICB7XG4gICAgICAgIC8vIHNob3VsZG4ndCB0aGlzIGJlIGNhY2hlZD8hP1xuICAgICAgICBsZXQgbWF0Y2hlczogbnVtYmVyW10gPSB0aGlzLm1hdGNoZXMoKTtcbiAgICAgICAgbGV0IGtleXNNYXRjaGVkTWFzayA9IHRoaXMuX2tleXNNYXRjaGVkTWFzayB8IChpc1ByZXNlbnQoXG4gICAgICAgICAgICAgICAgdGhpcy5fb3ZlclVuaW9uTWF0Y2gpID8gdGhpcy5fb3ZlclVuaW9uTWF0Y2guX2tleXNNYXRjaGVkTWFzayA6IDApO1xuXG4gICAgICAgIGxldCBvdmVycmlkZU1hdGNoZXM6IG51bWJlcltdO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fb3ZlclVuaW9uTWF0Y2gpICYmIGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICAob3ZlcnJpZGVNYXRjaGVzID0gdGhpcy5fb3ZlclVuaW9uTWF0Y2gubWF0Y2hlcygpKSkpIHtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKG1hdGNoZXMpKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IG92ZXJyaWRlTWF0Y2hlcztcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVzID0gTWF0Y2guaW50ZXJzZWN0KHRoaXMuX21ldGEuX3J1bGVzLCBtYXRjaGVzLCBvdmVycmlkZU1hdGNoZXMsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXNNYXRjaGVkTWFzayxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3ZlclVuaW9uTWF0Y2guX2tleXNNYXRjaGVkTWFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF0Y2hBcnJheTogTWF0Y2hWYWx1ZVtdO1xuICAgICAgICBpZiAoTWV0YS5fVXNlUGFydGlhbEluZGV4aW5nKSB7XG4gICAgICAgICAgICBtYXRjaEFycmF5ID0gdGhpcy5fbWV0YS5uZXdNYXRjaEFycmF5KCk7XG4gICAgICAgICAgICB0aGlzLmluaXRNYXRjaFZhbHVlcyhtYXRjaEFycmF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLl9tZXRhLl9ydWxlcywgdGhpcy5fbWV0YS5fcnVsZUNvdW50LCBtYXRjaGVzLCBrZXlzTWF0Y2hlZE1hc2ssXG4gICAgICAgICAgICBtYXRjaEFycmF5KTtcbiAgICB9XG5cblxuICAgIHZhbHVlRm9yS2V5KGtleTogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gKHRoaXMuX2tleURhdGEuX2tleSA9PT0ga2V5KSA/IHRoaXMuX3ZhbHVlIDpcbiAgICAgICAgICAgIChpc1ByZXNlbnQodGhpcy5fcHJldk1hdGNoKSA/IHRoaXMuX3ByZXZNYXRjaC52YWx1ZUZvcktleShrZXkpIDogbnVsbCk7XG4gICAgfVxuXG4gICAgaW1tdXRhYmxlQ29weSgpOiBNYXRjaFxuICAgIHtcbiAgICAgICAgdGhpcy5faW52YWxpZGF0ZUlmU3RhbGUoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRjaFdpdGhVbmlvbih0aGlzLm1hdGNoZXMoKSwgdGhpcy5fa2V5c01hdGNoZWRNYXNrLCB0aGlzLl9tYXRjaFBhdGhDUkMsXG4gICAgICAgICAgICB0aGlzLl9vdmVyVW5pb25NYXRjaCk7XG4gICAgfVxuXG4gICAgX2ludmFsaWRhdGVJZlN0YWxlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLl9tZXRhR2VuZXJhdGlvbiA8IHRoaXMuX21ldGEucnVsZVNldEdlbmVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRNYXRjaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGpvaW4oYTogbnVtYmVyW10sIGI6IG51bWJlcltdLCBhTWFzazogbnVtYmVyLCBiTWFzazogbnVtYmVyKTogbnVtYmVyW11cbiAgICB7XG4gICAgICAgIHJldHVybiBNYXRjaC5pbnRlcnNlY3QodGhpcy5fbWV0YS5fcnVsZXMsIGEsIGIsIGFNYXNrLCBiTWFzayk7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgX2luaXRNYXRjaCgpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQga2V5TWFzazogbnVtYmVyID0gc2hpZnRMZWZ0KDEsIHRoaXMuX2tleURhdGEuX2lkKTtcblxuICAgICAgICAvLyBnZXQgdmVjIGZvciB0aGlzIGtleS92YWx1ZSAtLSBpZiB2YWx1ZSBpcyBsaXN0LCBjb21wdXRlIHRoZSB1bmlvblxuICAgICAgICBsZXQgbmV3QXJyOiBudW1iZXJbXTtcbiAgICAgICAgaWYgKGlzQXJyYXkodGhpcy5fdmFsdWUpKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgYTogbnVtYmVyW10gPSB0aGlzLl9rZXlEYXRhLmxvb2t1cCh0aGlzLl9tZXRhLCB2KTtcbiAgICAgICAgICAgICAgICBuZXdBcnIgPSBNYXRjaC51bmlvbihhLCBuZXdBcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3QXJyID0gdGhpcy5fa2V5RGF0YS5sb29rdXAodGhpcy5fbWV0YSwgdGhpcy5fdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByZXZNYXRjaGVzOiBudW1iZXJbXSA9IChpc0JsYW5rKHRoaXMuX3ByZXZNYXRjaCkpID8gbnVsbCA6IHRoaXMuX3ByZXZNYXRjaC5tYXRjaGVzKCk7XG5cbiAgICAgICAgdGhpcy5fa2V5c01hdGNoZWRNYXNrID0gKGlzQmxhbmsoXG4gICAgICAgICAgICB0aGlzLl9wcmV2TWF0Y2gpKSA/IGtleU1hc2sgOiAoa2V5TWFzayB8IHRoaXMuX3ByZXZNYXRjaC5fa2V5c01hdGNoZWRNYXNrKTtcbiAgICAgICAgaWYgKGlzQmxhbmsocHJldk1hdGNoZXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXRjaGVzID0gbmV3QXJyO1xuICAgICAgICAgICAgLy8gVG9kbzogbm90IGNsZWFyIHdoeSB0aGlzIGlzIG5lZWRlZCwgYnV0IHdpdGhvdXQgaXQgd2UgZW5kIHVwIGZhaWxpbmcgdG8gZmlsdGVyXG4gICAgICAgICAgICAvLyBjZXJ0YWluIG1hdGNoZXMgdGhhdCBzaG91bGQgYmUgZmlsdGVyZWQgKHJlc3VsdGluZyBpbiBiYWQgbWF0Y2hlcylcbiAgICAgICAgICAgIGlmICghTWV0YS5fVXNlUGFydGlhbEluZGV4aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fa2V5c01hdGNoZWRNYXNrID0ga2V5TWFzaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsobmV3QXJyKSkge1xuICAgICAgICAgICAgICAgIG5ld0FyciA9IE1hdGNoLkVtcHR5TWF0Y2hBcnJheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEpvaW5cbiAgICAgICAgICAgIHRoaXMuX21hdGNoZXMgPSB0aGlzLmpvaW4obmV3QXJyLCBwcmV2TWF0Y2hlcywga2V5TWFzayxcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmV2TWF0Y2guX2tleXNNYXRjaGVkTWFzayk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb21wdXRlIHBhdGggQ1JDXG4gICAgICAgIHRoaXMuX21hdGNoUGF0aENSQyA9IC0xO1xuICAgICAgICBmb3IgKGxldCBtcjogTWF0Y2hSZXN1bHQgPSB0aGlzOyBtciAhPSBudWxsOyBtciA9IG1yLl9wcmV2TWF0Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuX21hdGNoUGF0aENSQyA9IGNyYzMyKHRoaXMuX21hdGNoUGF0aENSQywgbXIuX2tleURhdGEuX2tleS5sZW5ndGgpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KG1yLl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBpc0FycmF5KG1yLl92YWx1ZSkgPyBtci5fdmFsdWUuam9pbignLCcpIDogbXIuX3ZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hdGNoUGF0aENSQyA9IGNyYzMyKHRoaXMuX21hdGNoUGF0aENSQywgaGFzaENvZGUodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbWF0Y2hQYXRoQ1JDID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXRjaFBhdGhDUkMgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21ldGFHZW5lcmF0aW9uID0gdGhpcy5fbWV0YS5ydWxlU2V0R2VuZXJhdGlvbjtcbiAgICAgICAgdGhpcy5fcHJvcGVydGllcyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICBfbG9nTWF0Y2hEaWZmKGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBpQSA9IDEsIHNpemVBID0gYVswXSwgaUIgPSAxLCBzaXplQiA9IGJbMF07XG5cbiAgICAgICAgd2hpbGUgKGlBIDw9IHNpemVBIHx8IGlCIDw9IHNpemVCKSB7XG4gICAgICAgICAgICBsZXQgYyA9IChpQSA+IHNpemVBID8gMSA6IChpQiA+IHNpemVCID8gLTEgOiAoYVtpQV0gLSBiW2lCXSkpKTtcbiAgICAgICAgICAgIGlmIChjID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaUErKztcbiAgICAgICAgICAgICAgICBpQisrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjIDwgMCkge1xuICAgICAgICAgICAgICAgIC8vIElmIEEgbm90IGluIEIsIGJ1dCBBIGRvZXNuJ3QgZmlsdGVyIG9uIEIncyBtYXNrLCB0aGVuIGFkZCBpdFxuICAgICAgICAgICAgICAgIHByaW50KCcgIC0tIE9ubHkgaW4gQTogJyArIHRoaXMuX21ldGEuX3J1bGVzW2FbaUFdXSk7XG4gICAgICAgICAgICAgICAgaUErKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJpbnQoJyAgLS0gT25seSBpbiBCOiAnICsgdGhpcy5fbWV0YS5fcnVsZXNbYltpQl1dKTtcbiAgICAgICAgICAgICAgICBpQisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvcGVydGllcygpOiBQcm9wZXJ0eU1hcFxuICAgIHtcbiAgICAgICAgdGhpcy5faW52YWxpZGF0ZUlmU3RhbGUoKTtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fcHJvcGVydGllcykpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB0aGlzLl9tZXRhLnByb3BlcnRpZXNGb3JNYXRjaCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcztcbiAgICB9XG5cbiAgICBkZWJ1Z1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG5cbiAgICAgICAgbGV0IHNqID0gbmV3IFN0cmluZ0pvaW5lcihbJ01hdGNoIFJlc3VsdCBwYXRoOiBcXG4nXSk7XG4gICAgICAgIHRoaXMuX2FwcGVuZFByZXZQYXRoKHNqKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX292ZXJVbmlvbk1hdGNoKSkge1xuICAgICAgICAgICAgc2ouYWRkKCdcXG5PdmVycmlkZXMgcGF0aDogJyk7XG4gICAgICAgICAgICB0aGlzLl9vdmVyVW5pb25NYXRjaC5fYXBwZW5kUHJldlBhdGgoc2opO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cblxuICAgIF9hcHBlbmRQcmV2UGF0aChidWY6IFN0cmluZ0pvaW5lcik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcHJldk1hdGNoKSkge1xuICAgICAgICAgICAgdGhpcy5fcHJldk1hdGNoLl9hcHBlbmRQcmV2UGF0aChidWYpO1xuICAgICAgICAgICAgYnVmLmFkZCgnIC0+ICcpO1xuICAgICAgICB9XG4gICAgICAgIGJ1Zi5hZGQodGhpcy5fa2V5RGF0YS5fa2V5KTtcbiAgICAgICAgYnVmLmFkZCgnPScpO1xuICAgICAgICBidWYuYWRkKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG5cbiAgICBfY2hlY2tNYXRjaCh2YWx1ZXM6IE1hcDxzdHJpbmcsIGFueT4sIG1ldGE6IE1ldGEpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgYXJyOiBudW1iZXJbXSA9IHRoaXMuZmlsdGVyUmVzdWx0KCk7XG4gICAgICAgIGlmIChpc0JsYW5rKGFycikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBmaXJzdCBlbnRyeSBpcyBjb3VudFxuICAgICAgICBsZXQgY291bnQ6IG51bWJlciA9IGFyclswXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgciA9IHRoaXMuX21ldGEuX3J1bGVzW2FycltpICsgMV1dO1xuICAgICAgICAgICAgci5fY2hlY2tSdWxlKHZhbHVlcywgbWV0YSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgZXF1YWxzVG8obzogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIChvIGluc3RhbmNlb2YgTWF0Y2hSZXN1bHQpICYmIHN1cGVyLmVxdWFsc1RvKFxuICAgICAgICAgICAgICAgIG8pICYmIChvLl9tZXRhR2VuZXJhdGlvbiA9PT0gdGhpcy5fbWV0YUdlbmVyYXRpb24pICYmXG4gICAgICAgICAgICBvLl9wcm9wZXJ0aWVzLnNpemUgPT09IHRoaXMuX3Byb3BlcnRpZXMuc2l6ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmlvbk1hdGNoUmVzdWx0IGV4dGVuZHMgTWF0Y2hSZXN1bHRcbntcblxuICAgIGNvbnN0cnVjdG9yKG1ldGE6IE1ldGEsIGtleURhdGE6IEtleURhdGEsIHZhbHVlOiBhbnksIHByZXZNYXRjaDogTWF0Y2hSZXN1bHQpXG4gICAge1xuICAgICAgICBzdXBlcihtZXRhLCBrZXlEYXRhLCB2YWx1ZSwgcHJldk1hdGNoKTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBqb2luKGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSwgYU1hc2s6IG51bWJlciwgYk1hc2s6IG51bWJlcik6IG51bWJlcltdXG4gICAge1xuICAgICAgICByZXR1cm4gTWF0Y2gudW5pb24oYSwgYik7XG5cbiAgICB9XG59XG5cbiJdfQ==