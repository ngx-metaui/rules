/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            let /** @type {?} */ r = new Array(4);
            r[0] = 1;
            r[1] = val;
            return r;
        }
        let /** @type {?} */ newPos = intArr[0];
        if (intArr[newPos++] === val) {
            return intArr;
        } // already here...
        if (newPos >= intArr.length) {
            let /** @type {?} */ a = new Array(newPos * 2);
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
        let /** @type {?} */ result;
        let /** @type {?} */ count = arr[0];
        for (let /** @type {?} */ i = 0; i < count; i++) {
            let /** @type {?} */ r = arr[i + 1];
            let /** @type {?} */ rule = rules[r];
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
        let /** @type {?} */ result;
        let /** @type {?} */ iA = 1, /** @type {?} */ sizeA = isPresent(a[0]) ? a[0] : 0, /** @type {?} */ iB = 1, /** @type {?} */ sizeB = isPresent(b[0]) ? b[0] : 0;
        Match._Debug_ElementProcessCount += sizeA + sizeB;
        while (iA <= sizeA || iB <= sizeB) {
            let /** @type {?} */ iAMask = (iA <= sizeA) ? allRules[a[iA]].keyIndexedMask : 0;
            let /** @type {?} */ iBMask = (iB <= sizeB) ? allRules[b[iB]].keyIndexedMask : 0;
            let /** @type {?} */ c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));
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
        let /** @type {?} */ sizeA = a[0], /** @type {?} */ sizeB = b[0];
        if (sizeA === 0) {
            return b;
        }
        if (sizeB === 0) {
            return a;
        }
        Match._Debug_ElementProcessCount += (sizeA + sizeB);
        let /** @type {?} */ result;
        let /** @type {?} */ iA = 1, /** @type {?} */ vA = a[1], /** @type {?} */ iB = 1, /** @type {?} */ vB = b[1];
        while (iA <= sizeA || iB <= sizeB) {
            let /** @type {?} */ c = vA - vB;
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
        let /** @type {?} */ count = a[0];
        if (count !== b[0]) {
            return false;
        }
        for (let /** @type {?} */ i = 1; i <= count; i++) {
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
        // print('\n## Filtering matching: ' + matchesArr[0] + ', Queried Mask: ' + queriedMask);
        //
        // for (let i = 1; i <= matchesArr[0]; i++) {
        //     print('## ' + matchesArr[i] + '): ' + allRules[matchesArr[i]].toString());
        // }
        let /** @type {?} */ result;
        let /** @type {?} */ count = matchesArr[0];
        for (let /** @type {?} */ i = 0; i < count; i++) {
            let /** @type {?} */ r = matchesArr[i + 1];
            if (r >= maxRule) {
                continue;
            }
            let /** @type {?} */ rule = allRules[r];
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
        let /** @type {?} */ ret = this._keysMatchedMask * 31 + this._matchPathCRC;
        if (isPresent(this._matches)) {
            for (let /** @type {?} */ i = 0, /** @type {?} */ c = this._matches[0]; i < c; i++) {
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
        let /** @type {?} */ buf = new StringJoiner([]);
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
function Match_tsickle_Closure_declarations() {
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
function MatchWithUnion_tsickle_Closure_declarations() {
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
        // shouldn't this be cached?!?
        let /** @type {?} */ matches = this.matches();
        let /** @type {?} */ keysMatchedMask = this._keysMatchedMask | (isPresent(this._overUnionMatch) ? this._overUnionMatch._keysMatchedMask : 0);
        let /** @type {?} */ overrideMatches;
        if (isPresent(this._overUnionMatch) && isPresent((overrideMatches = this._overUnionMatch.matches()))) {
            if (isBlank(matches)) {
                matches = overrideMatches;
            }
            else {
                matches = Match.intersect(this._meta._rules, matches, overrideMatches, this._keysMatchedMask, this._overUnionMatch._keysMatchedMask);
            }
        }
        let /** @type {?} */ matchArray;
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
        let /** @type {?} */ keyMask = shiftLeft(1, this._keyData._id);
        // get vec for this key/value -- if value is list, compute the union
        let /** @type {?} */ newArr;
        if (isArray(this._value)) {
            for (let /** @type {?} */ v of this._value) {
                let /** @type {?} */ a = this._keyData.lookup(this._meta, v);
                newArr = Match.union(a, newArr);
            }
        }
        else {
            newArr = this._keyData.lookup(this._meta, this._value);
        }
        let /** @type {?} */ prevMatches = (isBlank(this._prevMatch)) ? null : this._prevMatch.matches();
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
        for (let /** @type {?} */ mr = this; mr != null; mr = mr._prevMatch) {
            this._matchPathCRC = crc32(this._matchPathCRC, mr._keyData._key.length);
            if (isPresent(mr._value)) {
                let /** @type {?} */ value = isArray(mr._value) ? mr._value.join(',') : mr._value;
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
        let /** @type {?} */ iA = 1, /** @type {?} */ sizeA = a[0], /** @type {?} */ iB = 1, /** @type {?} */ sizeB = b[0];
        while (iA <= sizeA || iB <= sizeB) {
            let /** @type {?} */ c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));
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
        let /** @type {?} */ sj = new StringJoiner(['Match Result path: \n']);
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
        let /** @type {?} */ arr = this.filterResult();
        if (isBlank(arr)) {
            return;
        }
        // first entry is count
        let /** @type {?} */ count = arr[0];
        for (let /** @type {?} */ i = 0; i < count; i++) {
            let /** @type {?} */ r = this._meta._rules[arr[i + 1]];
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
function MatchResult_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL21hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFtQkEsT0FBTyxFQUNILE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxFQUNULEtBQUssRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBc0IsSUFBSSxFQUFjLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7QUFXOUQsTUFBTTs7Ozs7O0lBOEtGLFlBQW1CLFFBQWtCLEVBQVMsZ0JBQXdCLEVBQ2xELGdCQUF3QixDQUFDO1FBRDFCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7UUFDbEQsa0JBQWEsR0FBYixhQUFhO0tBRWhDOzs7Ozs7SUF6S0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFnQixFQUFFLEdBQVc7UUFFdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixxQkFBSSxDQUFDLEdBQWtCLElBQUksS0FBSyxDQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRVgsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNaO1FBQ0QscUJBQUksTUFBTSxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDakI7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1B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QUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBRTVCO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgYXNzZXJ0LFxuICAgIGNyYzMyLFxuICAgIGhhc2hDb2RlLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc1ByZXNlbnQsXG4gICAgcHJpbnQsXG4gICAgc2hpZnRMZWZ0LFxuICAgIFN0cmluZ0pvaW5lclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7UnVsZX0gZnJvbSAnLi9ydWxlJztcbmltcG9ydCB7S2V5RGF0YSwgTWF0Y2hWYWx1ZSwgTWV0YSwgUHJvcGVydHlNYXB9IGZyb20gJy4vbWV0YSc7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2V0IG9mIG1hdGNoaW5nIHJ1bGVzIHJlc3VsdGluZyBmcm9tIGxvb2tpbmcgdXAgYSBzZXQgb2Yga2V5L3ZhbHVlc1xuICogIGFnYWluc3QgdGhlIE1ldGEgcnVsZSBiYXNlLlxuICpcbiAqIEluc3RhbmNlcyBvZiB0aGUgTWF0Y2ggc3VwZXJjbGFzcyBhcmUgc2ltcGx5IGltbXV0YWJsZSBzbmFwc2hvdHMgb2YgcHJldmlvdXMgbWF0Y2hlc1xuICogKHVzZWQgYXMga2V5cyBpbiBNYXRjaCAtPiBQcm9wZXJ0aWVzIGxvb2t1cCBjYWNoZXMpLlxuICogVGhlIG1vcmUgbWVhdHkgY2xhc3MgaXMgaXRzIHN0YXRpYyBpbm5lciBzdWJjbGFzcywgTWF0Y2guTWF0Y2hSZXN1bHQuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRjaFxue1xuICAgIHN0YXRpYyByZWFkb25seSBFbXB0eU1hdGNoQXJyYXk6IG51bWJlcltdID0gW107XG5cbiAgICBzdGF0aWMgX0RlYnVnX0VsZW1lbnRQcm9jZXNzQ291bnQ6IG51bWJlciA9IDA7XG5cblxuICAgIC8vIFdvcmQgbGlzdHMgYXJlIGludCBhcnJheXMgd2l0aCB0aGUgZmlyc3QgZWxlbWVudCBob2xkaW5nIHRoZSBsZW5ndGhcbiAgICBzdGF0aWMgYWRkSW50KGludEFycjogbnVtYmVyW10sIHZhbDogbnVtYmVyKTogbnVtYmVyW11cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKGludEFycikpIHtcbiAgICAgICAgICAgIGxldCByOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oNCk7XG4gICAgICAgICAgICByWzBdID0gMTtcbiAgICAgICAgICAgIHJbMV0gPSB2YWw7XG5cbiAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXdQb3M6IG51bWJlciA9IGludEFyclswXTtcbiAgICAgICAgaWYgKGludEFycltuZXdQb3MrK10gPT09IHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGludEFycjtcbiAgICAgICAgfSAgLy8gYWxyZWFkeSBoZXJlLi4uXG5cbiAgICAgICAgaWYgKG5ld1BvcyA+PSBpbnRBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgYTogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KG5ld1BvcyAqIDIpO1xuICAgICAgICAgICAgYSA9IGludEFyci5zbGljZSgwLCBuZXdQb3MpO1xuICAgICAgICAgICAgaW50QXJyID0gYTtcbiAgICAgICAgfVxuICAgICAgICBpbnRBcnJbbmV3UG9zXSA9IHZhbDtcbiAgICAgICAgaW50QXJyWzBdID0gbmV3UG9zO1xuICAgICAgICByZXR1cm4gaW50QXJyO1xuICAgIH1cblxuICAgIC8vIG9ubHkgcnVsZXMgdGhhdCB1c2Ugb25seSB0aGUgYWN0aXZhdGVkIChxdWVyaWVkKSBrZXlzXG4gICAgc3RhdGljIGZpbHRlck11c3RVc2UocnVsZXM6IEFycmF5PFJ1bGU+LCBhcnI6IG51bWJlcltdLCB1c2VzTWFzazogbnVtYmVyKTogbnVtYmVyW11cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKGFycikpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlcltdO1xuICAgICAgICBsZXQgY291bnQgPSBhcnJbMF07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHIgPSBhcnJbaSArIDFdO1xuICAgICAgICAgICAgbGV0IHJ1bGUgPSBydWxlc1tyXTtcbiAgICAgICAgICAgIGlmICgocnVsZS5rZXlNYXRjaGVzTWFzayAmIHVzZXNNYXNrKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE1hdGNoLmFkZEludChyZXN1bHQsIHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcnNlY3RzIHR3byBydWxldmVjcy4gIFRoaXMgaXMgbm90IGEgdHJhZGl0aW9uYWwgaW50ZXJzZWN0aW9uIHdoZXJlIG9ubHkgaXRlbXMgaW4gYm90aFxuICAgICAqIGlucHV0cyBhcmUgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdDogd2Ugb25seSBpbnRlcnNlY3QgcnVsZXMgdGhhdCBtYXRjaCBvbiBjb21tb24ga2V5cztcbiAgICAgKiBvdGhlcnMgYXJlIHVuaW9uZWQuXG4gICAgICpcbiAgICAgKiBGb3IgaW5zdGFuY2UsIHNheSB3ZSBoYXZlIHRoZSBmb2xsb3dpbmcgaW5wdXRzOlxuICAgICAqICAgICAgYTogIFttYXRjaGVkIG9uOiBjbGFzcywgbGF5b3V0XSAgKGNsYXNzPUZvbywgbGF5b3V0PUluc3BlY3QpXG4gICAgICogICAgICAgICAgMSkgY2xhc3M9Rm9vIGxheW91dD1JbnNwZWN0IHsgLi4uIH1cbiAgICAgKiAgICAgICAgICAyKSBjbGFzcz1Gb28gb3BlcmF0aW9uPWVkaXQgeyAuLi4gfVxuICAgICAqICAgICAgICAgIDMpIGxheW91dD1JbnNwZWN0IG9wZXJhdGlvbj12aWV3IHsgLi4uIH1cbiAgICAgKlxuICAgICAqICAgICAgYjogIFttYXRjaGVkIG9uOiBvcGVyYXRpb25dICAob3BlcmF0aW9uPXZpZXcpXG4gICAgICogICAgICAgICAgMykgbGF5b3V0PUluc3BlY3Qgb3BlcmF0aW9uPXZpZXcgeyAuLi4gfVxuICAgICAqICAgICAgICAgIDQpIG9wZXJhdGlvbj12aWV3IHR5cGU9U3RyaW5nIHsgLi4uIH1cbiAgICAgKiAgICAgICAgICA1KSBvcGVyYXRpb249dmlldyBsYXlvdXQ9VGFicyB7IC4uLiB9XG4gICAgICpcbiAgICAgKiBUaGUgcmVzdWx0IHNob3VsZCBiZTogMSwgMywgNFxuICAgICAqIEkuZS46IGl0ZW1zIHRoYXQgYXBwZWFyIGluIGJvdGggKCMzIGFib3ZlKSBhcmUgaW5jbHVkZWQsIGFzIGFyZSBpdGVtcyB0aGF0IGFwcGVhciBpbiBqdXN0XG4gICAgICogb25lLFxuICAgICAqICpidXQgZG9uJ3QgbWF0Y2ggb24gdGhlIGtleXMgaW4gdGhlIG90aGVyKiAoIzEgYW5kICM0IGFib3ZlKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhbGxSdWxlcyB0aGUgZnVsbCBydWxlIGJhc2VcbiAgICAgKiBAcGFyYW0gYSBmaXJzdCB2ZWN0b3Igb2YgcnVsZSBpbmRleGVzXG4gICAgICogQHBhcmFtIGIgc2Vjb25kIHZlY3RvciBvZiBydWxlIGluZGV4ZXNcbiAgICAgKiBAcGFyYW0gYU1hc2sgbWFzayBpbmRpY2F0aW5nIHRoZSBrZXlzIGFnYWluc3Qgd2hpY2ggdGhlIGZpcnN0IHJ1bGUgdmVjdG9ycyBpdGVtcyBoYXZlXG4gICAgICogICAgIGFscmVhZHkgYmVlbiBtYXRjaGVkXG4gICAgICogQHBhcmFtIGJNYXNrIG1hc2sgaW5kaWNhdGluZyB0aGUga2V5cyBhZ2FpbnN0IHdoaWNoIHRoZSBzZWNvbmQgcnVsZSB2ZWN0b3JzIGl0ZW1zIGhhdmVcbiAgICAgKiAgICAgYWxyZWFkeSBiZWVuIG1hdGNoZWRcbiAgICAgKiBAcmV0dXJuIHJ1bGUgdmVjdG9yIGZvciB0aGUgbWF0Y2hlc1xuICAgICAqL1xuICAgIHN0YXRpYyBpbnRlcnNlY3QoYWxsUnVsZXM6IEFycmF5PFJ1bGU+LCBhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIGFNYXNrOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICBiTWFzazogbnVtYmVyKTogbnVtYmVyW11cbiAgICB7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoYSkpIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlcltdO1xuICAgICAgICBsZXQgaUEgPSAxLCBzaXplQSA9IGlzUHJlc2VudChhWzBdKSA/IGFbMF0gOiAwLCBpQiA9IDEsIHNpemVCID0gaXNQcmVzZW50KGJbMF0pID8gYlswXSA6IDA7XG4gICAgICAgIE1hdGNoLl9EZWJ1Z19FbGVtZW50UHJvY2Vzc0NvdW50ICs9IHNpemVBICsgc2l6ZUI7XG5cbiAgICAgICAgd2hpbGUgKGlBIDw9IHNpemVBIHx8IGlCIDw9IHNpemVCKSB7XG4gICAgICAgICAgICBsZXQgaUFNYXNrID0gKGlBIDw9IHNpemVBKSA/IGFsbFJ1bGVzW2FbaUFdXS5rZXlJbmRleGVkTWFzayA6IDA7XG4gICAgICAgICAgICBsZXQgaUJNYXNrID0gKGlCIDw9IHNpemVCKSA/IGFsbFJ1bGVzW2JbaUJdXS5rZXlJbmRleGVkTWFzayA6IDA7XG4gICAgICAgICAgICBsZXQgYyA9IChpQSA+IHNpemVBID8gMSA6IChpQiA+IHNpemVCID8gLTEgOiAoYVtpQV0gLSBiW2lCXSkpKTtcblxuICAgICAgICAgICAgaWYgKGMgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBNYXRjaC5hZGRJbnQocmVzdWx0LCBhW2lBXSk7XG4gICAgICAgICAgICAgICAgaUErKztcbiAgICAgICAgICAgICAgICBpQisrO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMgPCAwKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgQSBub3QgaW4gQiwgYnV0IEEgZG9lc24ndCBmaWx0ZXIgb24gQidzIG1hc2ssIHRoZW4gYWRkIGl0XG4gICAgICAgICAgICAgICAgaWYgKChpQU1hc2sgJiBiTWFzaykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTWF0Y2guYWRkSW50KHJlc3VsdCwgYVtpQV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpQSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoKGlCTWFzayAmIGFNYXNrKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBNYXRjaC5hZGRJbnQocmVzdWx0LCBiW2lCXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlCKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdW5pb24oYTogbnVtYmVyW10sIGI6IG51bWJlcltdKTogbnVtYmVyW11cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCbGFuayhiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpemVBID0gYVswXSwgc2l6ZUIgPSBiWzBdO1xuICAgICAgICBpZiAoc2l6ZUEgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaXplQiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICAgICAgTWF0Y2guX0RlYnVnX0VsZW1lbnRQcm9jZXNzQ291bnQgKz0gKHNpemVBICsgc2l6ZUIpO1xuXG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlcltdO1xuICAgICAgICBsZXQgaUEgPSAxLCB2QSA9IGFbMV0sIGlCID0gMSwgdkIgPSBiWzFdO1xuXG5cbiAgICAgICAgd2hpbGUgKGlBIDw9IHNpemVBIHx8IGlCIDw9IHNpemVCKSB7XG4gICAgICAgICAgICBsZXQgYzogbnVtYmVyID0gdkEgLSB2QjtcbiAgICAgICAgICAgIHJlc3VsdCA9IE1hdGNoLmFkZEludChyZXN1bHQsICgoYyA8PSAwKSA/IHZBIDogdkIpKTtcbiAgICAgICAgICAgIGlmIChjIDw9IDApIHtcbiAgICAgICAgICAgICAgICBpQSsrO1xuICAgICAgICAgICAgICAgIHZBID0gKGlBIDw9IHNpemVBKSA/IGFbaUFdIDogTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID49IDApIHtcbiAgICAgICAgICAgICAgICBpQisrO1xuICAgICAgICAgICAgICAgIHZCID0gKGlCIDw9IHNpemVCKSA/IGJbaUJdIDogTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBfYXJyYXlFcShhOiBudW1iZXJbXSwgYjogbnVtYmVyW10pOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb3VudCA9IGFbMF07XG4gICAgICAgIGlmIChjb3VudCAhPT0gYlswXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfbWF0Y2hlczogbnVtYmVyW10sIHB1YmxpYyBfa2V5c01hdGNoZWRNYXNrOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgcHVibGljICBfbWF0Y2hQYXRoQ1JDOiBudW1iZXIgPSAwKVxuICAgIHtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZpbHRlciBhIHBhcnRpYWxseSBtYXRjaGVkIHNldCBvZiBydWxlcyBkb3duIHRvIHRoZSBhY3R1YWwgbWF0Y2hlcy5cbiAgICAgKiBUaGUgaW5wdXQgc2V0IG9mIHJ1bGVzLCBtYXRjaGVzQXJyLCBpcyBiYXNlZCBvbiBhICpwYXJ0aWFsKiBtYXRjaCwgYW5kIHNvIGluY2x1ZGVzIHJ1bGVzXG4gICAgICogdGhhdCB3ZXJlIHRvdWNoZWQgYnkgc29tZSBvZiB0aGUgcXVlcmllZCBrZXlzLCBidXQgdGhhdCBtYXkgYWxzbyByZXF1aXJlICphZGRpdGlvbmFsKiBrZXlzXG4gICAgICogdGhhdCB3ZSBoYXZlIG5vdCBtYXRjaGVkIG9uIC0tIHRoZXNlIG11c3Qgbm93IGJlIHJlbW92ZWQuIEFsc28sIHdoZW4gJ3BhcnRpYWwgaW5kZXhpbmcnLFxuICAgICAqIHJ1bGVzIGFyZSBpbmRleGVkIG9uIGEgc3Vic2V0IG9mIHRoZWlyIGtleXMsIHNvIG1hdGNoZXNBcnIgd2lsbCBjb250YWluIHJ1bGVzIHRoYXQgbmVlZCB0b1xuICAgICAqIGJlIGV2YWx1YXRlZCBhZ2FpbnN0IHRob3NlIE1hdGNoVmFsdWVzIHVwb24gd2hpY2ggdGhleSB3ZXJlIG5vdCBpbmRleGVkIChhbmQgdGhlcmVmb3JlIG5vdFxuICAgICAqIGludGVyc2VjdGVkIC8gZmlsdGVyZWQgb24gaW4gdGhlIGxvb2t1cCBwcm9jZXNzKS5cbiAgICAgKi9cbiAgICBmaWx0ZXIoYWxsUnVsZXM6IEFycmF5PFJ1bGU+LCBtYXhSdWxlOiBudW1iZXIsIG1hdGNoZXNBcnI6IG51bWJlcltdLCBxdWVyaWVkTWFzazogbnVtYmVyLFxuICAgICAgICAgICBtYXRjaEFycmF5OiBNYXRjaFZhbHVlW10pOiBudW1iZXJbXVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsobWF0Y2hlc0FycikpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIHByaW50KCdcXG4jIyBGaWx0ZXJpbmcgbWF0Y2hpbmc6ICcgKyBtYXRjaGVzQXJyWzBdICsgJywgUXVlcmllZCBNYXNrOiAnICsgcXVlcmllZE1hc2spO1xuICAgICAgICAvL1xuICAgICAgICAvLyBmb3IgKGxldCBpID0gMTsgaSA8PSBtYXRjaGVzQXJyWzBdOyBpKyspIHtcbiAgICAgICAgLy8gICAgIHByaW50KCcjIyAnICsgbWF0Y2hlc0FycltpXSArICcpOiAnICsgYWxsUnVsZXNbbWF0Y2hlc0FycltpXV0udG9TdHJpbmcoKSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXJbXTtcbiAgICAgICAgbGV0IGNvdW50ID0gbWF0Y2hlc0FyclswXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCByID0gbWF0Y2hlc0FycltpICsgMV07XG4gICAgICAgICAgICBpZiAociA+PSBtYXhSdWxlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcnVsZTogUnVsZSA9IGFsbFJ1bGVzW3JdO1xuXG5cbiAgICAgICAgICAgIGlmIChydWxlLmRpc2FibGVkKCkgfHwgKHJ1bGUua2V5QW50aU1hc2sgJiBxdWVyaWVkTWFzaykgIT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTXVzdCBoYXZlIG1hdGNoZWQgb24gKGFjdGl2YXRlKSBhbGwgbWF0Y2gga2V5cyBmb3IgdGhpcyBydWxlLCAqYW5kKlxuICAgICAgICAgICAgLy8gaWYgaGF2ZSBhbnkgbm9uLWluZGV4ZWQgcnVsZXMsIG5lZWQgdG8gY2hlY2sgbWF0Y2ggb24gdGhvc2VcbiAgICAgICAgICAgIGlmICgoKHJ1bGUua2V5TWF0Y2hlc01hc2sgJiB+cXVlcmllZE1hc2spID09PSAwKSAmJlxuICAgICAgICAgICAgICAgICgocnVsZS5rZXlNYXRjaGVzTWFzayA9PT0gcnVsZS5rZXlJbmRleGVkTWFzaylcbiAgICAgICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIChpc1ByZXNlbnQobWF0Y2hBcnJheSkgJiYgcnVsZS5tYXRjaGVzKG1hdGNoQXJyYXkpKSkpIHtcblxuICAgICAgICAgICAgICAgIGlmIChNZXRhLl9EZWJ1Z0RvdWJsZUNoZWNrTWF0Y2hlcyAmJiAhKG1hdGNoQXJyYXkgIT0gbnVsbCAmJiBydWxlLm1hdGNoZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaEFycmF5KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCAnSW5jb25zaXN0ZW50IChuZWdhdGl2ZSkgbWF0Y2ggb24gcnVsZTogJyArIHJ1bGUpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gTWF0Y2guYWRkSW50KHJlc3VsdCwgcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1ldGEuX0RlYnVnRG91YmxlQ2hlY2tNYXRjaGVzICYmIChtYXRjaEFycmF5ICE9IG51bGwgJiYgcnVsZS5tYXRjaGVzKFxuICAgICAgICAgICAgICAgICAgICBtYXRjaEFycmF5KSkpIHtcbiAgICAgICAgICAgICAgICAvLyBBc3NlcnQudGhhdChmYWxzZSwgJ0luY29uc2lzdGVudCAocG9zaXRpdmUpIG1hdGNoIG9uIHJ1bGU6ICVzJywgcnVsZSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIChpc1ByZXNlbnQocmVzdWx0KSAmJiByZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgcHJpbnQoJ1xcblxcblxcbiAjIyMjIEZpbHRlcmluZyBSRVNVTFQ6ICcgKyByZXN1bHRbMF0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcmVzdWx0WzBdOyBpKyspIHtcbiAgICAgICAgLy8gICAgICAgICBwcmludCgnIyMgJyArIHJlc3VsdFtpXSArICcpOiAnICsgYWxsUnVsZXNbcmVzdWx0W2ldXS50b1N0cmluZygpKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgaGFzaENvZGUoKTogbnVtYmVyXG4gICAge1xuICAgICAgICBsZXQgcmV0ID0gdGhpcy5fa2V5c01hdGNoZWRNYXNrICogMzEgKyB0aGlzLl9tYXRjaFBhdGhDUkM7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fbWF0Y2hlcykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBjID0gdGhpcy5fbWF0Y2hlc1swXTsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgICAgIHJldCA9IGNyYzMyKHJldCwgdGhpcy5fbWF0Y2hlc1tpICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG5cbiAgICBnZXQga2V5c01hdGNoZWRNYXNrKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleXNNYXRjaGVkTWFzaztcbiAgICB9XG5cbiAgICBlcXVhbHNUbyhvOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gKChvIGluc3RhbmNlb2YgTWF0Y2gpICYmIHRoaXMuX2tleXNNYXRjaGVkTWFzayA9PT0gby5fa2V5c01hdGNoZWRNYXNrKSAmJlxuICAgICAgICAgICAgdGhpcy5fbWF0Y2hQYXRoQ1JDID09PSBvLl9tYXRjaFBhdGhDUkMgJiZcbiAgICAgICAgICAgIE1hdGNoLl9hcnJheUVxKHRoaXMuX21hdGNoZXMsIG8uX21hdGNoZXMpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKClcbiAgICB7XG4gICAgICAgIGxldCBidWYgPSBuZXcgU3RyaW5nSm9pbmVyKFtdKTtcbiAgICAgICAgYnVmLmFkZCgnX21hdGNoZXMnKTtcbiAgICAgICAgYnVmLmFkZCgoaXNQcmVzZW50KHRoaXMuX21hdGNoZXMpID8gdGhpcy5fbWF0Y2hlcy5sZW5ndGggOiAwKSArICcnKTtcbiAgICAgICAgYnVmLmFkZCgnX2tleXNNYXRjaGVkTWFzaycpO1xuICAgICAgICBidWYuYWRkKHRoaXMuX2tleXNNYXRjaGVkTWFzayArICcnKTtcbiAgICAgICAgYnVmLmFkZCgnX2tleXNNYXRjaGVkTWFzaycpO1xuICAgICAgICBidWYuYWRkKHRoaXMuX21hdGNoUGF0aENSQyArICcnKTtcblxuICAgICAgICBidWYuYWRkKCdoYXNoY29kZScpO1xuICAgICAgICBidWYuYWRkKHRoaXMuaGFzaENvZGUoKSArICcnKTtcblxuICAgICAgICByZXR1cm4gYnVmLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG4vKipcbiAqICBBbiBNYXRjaCB3aGljaCBpbmNsdWRlcyBhIFVuaW9uTWF0Y2hSZXN1bHQgcGFydCAod2hpY2ggaXMgdXNlZCBieSBDb250ZXh0IHRvXG4gKiByZXByZXNlbnQgdGhlIHNldCBvZiBvdmVycmlkZGVuIGtleS92YWx1ZXMgdXAgdGhlIHN0YWNrKVxuICovXG5leHBvcnQgY2xhc3MgTWF0Y2hXaXRoVW5pb24gZXh0ZW5kcyBNYXRjaFxue1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIF9tYXRjaGVzOiBudW1iZXJbXSwgcHVibGljICBfa2V5c01hdGNoZWRNYXNrOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgcHVibGljICBfbWF0Y2hQYXRoQ1JDOiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBfb3ZlclVuaW9uTWF0Y2g6IFVuaW9uTWF0Y2hSZXN1bHQpXG4gICAge1xuICAgICAgICBzdXBlcihfbWF0Y2hlcywgX2tleXNNYXRjaGVkTWFzaywgX21hdGNoUGF0aENSQyk7XG4gICAgfVxuXG5cbiAgICBlcXVhbHNUbyhvOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gc3VwZXIuZXF1YWxzVG8obykgJiYgKFxuICAgICAgICAgICAgKHRoaXMuX292ZXJVbmlvbk1hdGNoID09PSBvLl9vdmVyVW5pb25NYXRjaCkgfHxcbiAgICAgICAgICAgICgoaXNQcmVzZW50KHRoaXMuX292ZXJVbmlvbk1hdGNoKSkgJiYgaXNQcmVzZW50KFxuICAgICAgICAgICAgICAgIG8uX292ZXJVbmlvbk1hdGNoKSAmJiB0aGlzLl9vdmVyVW5pb25NYXRjaC5lcXVhbHNUbyhcbiAgICAgICAgICAgICAgICBvLl9vdmVyVW5pb25NYXRjaCkpKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiAgTWF0Y2hSZXN1bHQgcmVwcmVzZW50cyB0aGUgcmVzdWx0IG9mIGNvbXB1dGluZyB0aGUgc2V0IG9mIG1hdGNoaW5nIHJ1bGVzXG4gKiAgYmFzZWQgb24gdGhlIGtleS92YWx1ZSBvbiB0aGlzIGluc3RhbmNlLCBhbmQgdGhlIG90aGVyIGtleS92YWx1ZSBwYWlyc1xuICogb24gaXRzIHByZWRlY2Vzc29yIGNoYWluLiAgSS5lLiB0byBmaW5kIHRoZSBtYXRjaGluZyBydWxlcyBmb3IgdGhlIGNvbnRleHQga2V5c1xuICoge29wZXJhdGlvbj1lZGl0OyBsYXlvdXQ9SW5zcGVjdDsgY2xhc3M9Rm9vfSwgZmlyc3QgYSBNYXRjaFJlc3VsdCBpcyBjcmVhdGVkIGZvclxuICogJ29wZXJhdGlvbj1lZGl0JyBhbmQgcGFzc2VkIGFzIHRoZSAncHJldicgdG8gdGhlIGNyZWF0aW9uIG9mIGFub3RoZXIgZm9yICdsYXlvdXQ9SW5zcGVjdCcsXG4gKiBhbmQgc28gb24uICBJbiB0aGlzIHdheSB0aGUgTWF0Y2hSZXN1bHRzIGZvcm0gYSAqKHNoYXJhYmxlKSBwYXJ0aWFsLW1hdGNoIHRyZWUuKlxuICpcbiAqIFRoZSBhYmlsaXR5IHRvIHJlc3VsdCBwcmV2aW91cyBwYXJ0aWFsIG1hdGNoICdwYXRocycgaXMgYW4gaW1wb3J0YW50IG9wdGltaXphdGlvbjpcbiAqIHRoZSBwcmltYXJ5IGNsaWVudCBvZiBNYXRjaFJlc3VsdCAoYW5kIG9mIHJ1bGUgbWF0Y2hpbmcgaW4gZ2VuZXJhbCkgaXMgdGhlIENvbnRleHQsIHdoZW4gZWFjaFxuICogYXNzaWdubWVudCBwdXNoZXMgYSByZWNvcmQgb24gYSBzdGFjayB0aGF0IChyb3VnaGx5KSBleHRlbmRzIHRoZSBNYXRjaCBmcm9tIHRoZSBwcmV2aW91c1xuICogYXNzaWdubWVudC4gIEJ5IGNhY2hpbmcgTWF0Y2hSZXN1bHQgaW5zdGFuY2VzIG9uIHRoZSBfQXNzaWdubWVudCByZWNvcmRzLCBtYXRjaGluZyBpcyBsaW1pdGVkXG4gKiAgdG8gdGhlICppbmNyZW1lbnRhbCogbWF0Y2hpbmcgb24ganVzdCB0aGUgbmV3IGFzc2lnbm1lbnQsIG5vdCBhIGZ1bGwgbWF0Y2ggb24gYWxsIGtleXMgaW4gdGhlXG4gKiAgY29udGV4dC5cbiAqXG4gKiBGdXJ0aGVyLCBhIE1hdGNoUmVzdWx0IGNhY2hlcyB0aGUgKnByb3BlcnR5IG1hcCogcmVzdWx0aW5nIGZyb20gdGhlIGFwcGxpY2F0aW9uIG9mIHRoZSBydWxlc1xuICogIHRoYXQgaXQgbWF0Y2hlcy4gIEJ5IGNhY2hpbmcgTWF0Y2hSZXN1bHQgb2JqZWN0cyAoYW5kIGNhY2hpbmcgdGhlIG1hcCBmcm9tXG4gKiAgUnVsZSB2ZWN0b3IgKEFLQSBNYXRjaCkgLT4gTWF0Y2hSZXN1bHQgLT4gUHJvcGVydHlNYXApLCByZWR1ZGFudCBydWxlIGFwcGxpY2F0aW9uIChhbmQgY3JlYXRpb25cbiAqIG9mIGFkZGl0aW9uYWwgcHJvcGVydHkgbWFwcykgaXMgYXZvaWRlZC5cbiAqL1xuICAgIC8vIHRvZG86IGltcGxlbWVudCB0b1N0cmluZyBmb3IgdGhlIERpY3RvbmFyeSBhcyB0aGlzIGlzIHVzZWQgYXMgYSBrZXlcbmV4cG9ydCBjbGFzcyBNYXRjaFJlc3VsdCBleHRlbmRzIE1hdGNoV2l0aFVuaW9uXG57XG5cbiAgICBwcml2YXRlIF9tZXRhR2VuZXJhdGlvbjogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9wcm9wZXJ0aWVzOiBQcm9wZXJ0eU1hcDtcblxuICAgIC8vIE1ldGEgbWV0YSwgTWV0YS5LZXlEYXRhIGtleURhdGEsIE9iamVjdCB2YWx1ZSwgTWF0Y2hSZXN1bHQgcHJldilcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXRhOiBNZXRhLCBwcml2YXRlICBfa2V5RGF0YTogS2V5RGF0YSwgcHJpdmF0ZSBfdmFsdWU6IGFueSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9wcmV2TWF0Y2g6IE1hdGNoUmVzdWx0KVxuICAgIHtcbiAgICAgICAgc3VwZXIobnVsbCwgbnVsbCwgMCwgKF9wcmV2TWF0Y2ggIT0gbnVsbCkgPyBfcHJldk1hdGNoLl9vdmVyVW5pb25NYXRjaCA6IG51bGwpO1xuICAgICAgICB0aGlzLl9pbml0TWF0Y2goKTtcblxuICAgIH1cblxuICAgIHNldE92ZXJyaWRlc01hdGNoKG92ZXI6IFVuaW9uTWF0Y2hSZXN1bHQpXG4gICAge1xuICAgICAgICB0aGlzLl9vdmVyVW5pb25NYXRjaCA9IG92ZXI7XG4gICAgfVxuXG4gICAgbWF0Y2hlcygpOiBudW1iZXJbXVxuICAgIHtcbiAgICAgICAgdGhpcy5faW52YWxpZGF0ZUlmU3RhbGUoKTtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fbWF0Y2hlcykpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRNYXRjaCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRjaGVzO1xuICAgIH1cblxuICAgIGZpbHRlclJlc3VsdCgpOiBudW1iZXJbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuX21ldGEuX3J1bGVzLCB0aGlzLl9tZXRhLl9ydWxlQ291bnQsIHRoaXMubWF0Y2hlcygpLFxuICAgICAgICAgICAgdGhpcy5fa2V5c01hdGNoZWRNYXNrLCBudWxsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaWxsIGluIG1hdGNoQXJyYXkgd2l0aCBNYXRjaFZhbHVlcyB0byB1c2UgaW4gU2VsZWN0b3IgbWF0Y2hpbmdcbiAgICAgKiBAcGFyYW0gbWF0Y2hBcnJheVxuICAgICAqL1xuICAgIGluaXRNYXRjaFZhbHVlcyhtYXRjaEFycmF5OiBNYXRjaFZhbHVlW10pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3ByZXZNYXRjaCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZNYXRjaC5pbml0TWF0Y2hWYWx1ZXMobWF0Y2hBcnJheSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9vdmVyVW5pb25NYXRjaCkpIHtcbiAgICAgICAgICAgIHRoaXMuX292ZXJVbmlvbk1hdGNoLmluaXRNYXRjaFZhbHVlcyhtYXRjaEFycmF5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZXRhLm1hdGNoQXJyYXlBc3NpZ24obWF0Y2hBcnJheSwgdGhpcy5fa2V5RGF0YSxcbiAgICAgICAgICAgIHRoaXMuX2tleURhdGEubWF0Y2hWYWx1ZSh0aGlzLl92YWx1ZSkpO1xuICAgIH1cblxuXG4gICAgZmlsdGVyZWRNYXRjaGVzKCk6IG51bWJlcltdXG4gICAge1xuICAgICAgICAvLyBzaG91bGRuJ3QgdGhpcyBiZSBjYWNoZWQ/IT9cbiAgICAgICAgbGV0IG1hdGNoZXM6IG51bWJlcltdID0gdGhpcy5tYXRjaGVzKCk7XG4gICAgICAgIGxldCBrZXlzTWF0Y2hlZE1hc2sgPSB0aGlzLl9rZXlzTWF0Y2hlZE1hc2sgfCAoaXNQcmVzZW50KFxuICAgICAgICAgICAgICAgIHRoaXMuX292ZXJVbmlvbk1hdGNoKSA/IHRoaXMuX292ZXJVbmlvbk1hdGNoLl9rZXlzTWF0Y2hlZE1hc2sgOiAwKTtcblxuICAgICAgICBsZXQgb3ZlcnJpZGVNYXRjaGVzOiBudW1iZXJbXTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX292ZXJVbmlvbk1hdGNoKSAmJiBpc1ByZXNlbnQoXG4gICAgICAgICAgICAgICAgKG92ZXJyaWRlTWF0Y2hlcyA9IHRoaXMuX292ZXJVbmlvbk1hdGNoLm1hdGNoZXMoKSkpKSB7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayhtYXRjaGVzKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBvdmVycmlkZU1hdGNoZXM7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IE1hdGNoLmludGVyc2VjdCh0aGlzLl9tZXRhLl9ydWxlcywgbWF0Y2hlcywgb3ZlcnJpZGVNYXRjaGVzLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzTWF0Y2hlZE1hc2ssXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX292ZXJVbmlvbk1hdGNoLl9rZXlzTWF0Y2hlZE1hc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1hdGNoQXJyYXk6IE1hdGNoVmFsdWVbXTtcbiAgICAgICAgaWYgKE1ldGEuX1VzZVBhcnRpYWxJbmRleGluZykge1xuICAgICAgICAgICAgbWF0Y2hBcnJheSA9IHRoaXMuX21ldGEubmV3TWF0Y2hBcnJheSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0TWF0Y2hWYWx1ZXMobWF0Y2hBcnJheSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5fbWV0YS5fcnVsZXMsIHRoaXMuX21ldGEuX3J1bGVDb3VudCwgbWF0Y2hlcywga2V5c01hdGNoZWRNYXNrLFxuICAgICAgICAgICAgbWF0Y2hBcnJheSk7XG4gICAgfVxuXG5cbiAgICB2YWx1ZUZvcktleShrZXk6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9rZXlEYXRhLl9rZXkgPT09IGtleSkgPyB0aGlzLl92YWx1ZSA6XG4gICAgICAgICAgICAoaXNQcmVzZW50KHRoaXMuX3ByZXZNYXRjaCkgPyB0aGlzLl9wcmV2TWF0Y2gudmFsdWVGb3JLZXkoa2V5KSA6IG51bGwpO1xuICAgIH1cblxuICAgIGltbXV0YWJsZUNvcHkoKTogTWF0Y2hcbiAgICB7XG4gICAgICAgIHRoaXMuX2ludmFsaWRhdGVJZlN0YWxlKCk7XG4gICAgICAgIHJldHVybiBuZXcgTWF0Y2hXaXRoVW5pb24odGhpcy5tYXRjaGVzKCksIHRoaXMuX2tleXNNYXRjaGVkTWFzaywgdGhpcy5fbWF0Y2hQYXRoQ1JDLFxuICAgICAgICAgICAgdGhpcy5fb3ZlclVuaW9uTWF0Y2gpO1xuICAgIH1cblxuICAgIF9pbnZhbGlkYXRlSWZTdGFsZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fbWV0YUdlbmVyYXRpb24gPCB0aGlzLl9tZXRhLnJ1bGVTZXRHZW5lcmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0TWF0Y2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBqb2luKGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSwgYU1hc2s6IG51bWJlciwgYk1hc2s6IG51bWJlcik6IG51bWJlcltdXG4gICAge1xuICAgICAgICByZXR1cm4gTWF0Y2guaW50ZXJzZWN0KHRoaXMuX21ldGEuX3J1bGVzLCBhLCBiLCBhTWFzaywgYk1hc2spO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIF9pbml0TWF0Y2goKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGtleU1hc2s6IG51bWJlciA9IHNoaWZ0TGVmdCgxLCB0aGlzLl9rZXlEYXRhLl9pZCk7XG5cbiAgICAgICAgLy8gZ2V0IHZlYyBmb3IgdGhpcyBrZXkvdmFsdWUgLS0gaWYgdmFsdWUgaXMgbGlzdCwgY29tcHV0ZSB0aGUgdW5pb25cbiAgICAgICAgbGV0IG5ld0FycjogbnVtYmVyW107XG4gICAgICAgIGlmIChpc0FycmF5KHRoaXMuX3ZhbHVlKSkge1xuXG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGE6IG51bWJlcltdID0gdGhpcy5fa2V5RGF0YS5sb29rdXAodGhpcy5fbWV0YSwgdik7XG4gICAgICAgICAgICAgICAgbmV3QXJyID0gTWF0Y2gudW5pb24oYSwgbmV3QXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0FyciA9IHRoaXMuX2tleURhdGEubG9va3VwKHRoaXMuX21ldGEsIHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcmV2TWF0Y2hlczogbnVtYmVyW10gPSAoaXNCbGFuayh0aGlzLl9wcmV2TWF0Y2gpKSA/IG51bGwgOiB0aGlzLl9wcmV2TWF0Y2gubWF0Y2hlcygpO1xuXG4gICAgICAgIHRoaXMuX2tleXNNYXRjaGVkTWFzayA9IChpc0JsYW5rKFxuICAgICAgICAgICAgdGhpcy5fcHJldk1hdGNoKSkgPyBrZXlNYXNrIDogKGtleU1hc2sgfCB0aGlzLl9wcmV2TWF0Y2guX2tleXNNYXRjaGVkTWFzayk7XG4gICAgICAgIGlmIChpc0JsYW5rKHByZXZNYXRjaGVzKSkge1xuICAgICAgICAgICAgdGhpcy5fbWF0Y2hlcyA9IG5ld0FycjtcbiAgICAgICAgICAgIC8vIFRvZG86IG5vdCBjbGVhciB3aHkgdGhpcyBpcyBuZWVkZWQsIGJ1dCB3aXRob3V0IGl0IHdlIGVuZCB1cCBmYWlsaW5nIHRvIGZpbHRlclxuICAgICAgICAgICAgLy8gY2VydGFpbiBtYXRjaGVzIHRoYXQgc2hvdWxkIGJlIGZpbHRlcmVkIChyZXN1bHRpbmcgaW4gYmFkIG1hdGNoZXMpXG4gICAgICAgICAgICBpZiAoIU1ldGEuX1VzZVBhcnRpYWxJbmRleGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2tleXNNYXRjaGVkTWFzayA9IGtleU1hc2s7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKG5ld0FycikpIHtcbiAgICAgICAgICAgICAgICBuZXdBcnIgPSBNYXRjaC5FbXB0eU1hdGNoQXJyYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBKb2luXG4gICAgICAgICAgICB0aGlzLl9tYXRjaGVzID0gdGhpcy5qb2luKG5ld0FyciwgcHJldk1hdGNoZXMsIGtleU1hc2ssXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldk1hdGNoLl9rZXlzTWF0Y2hlZE1hc2spO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29tcHV0ZSBwYXRoIENSQ1xuICAgICAgICB0aGlzLl9tYXRjaFBhdGhDUkMgPSAtMTtcbiAgICAgICAgZm9yIChsZXQgbXI6IE1hdGNoUmVzdWx0ID0gdGhpczsgbXIgIT0gbnVsbDsgbXIgPSBtci5fcHJldk1hdGNoKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXRjaFBhdGhDUkMgPSBjcmMzMih0aGlzLl9tYXRjaFBhdGhDUkMsIG1yLl9rZXlEYXRhLl9rZXkubGVuZ3RoKTtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChtci5fdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gaXNBcnJheShtci5fdmFsdWUpID8gbXIuX3ZhbHVlLmpvaW4oJywnKSA6IG1yLl92YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRjaFBhdGhDUkMgPSBjcmMzMih0aGlzLl9tYXRjaFBhdGhDUkMsIGhhc2hDb2RlKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX21hdGNoUGF0aENSQyA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fbWF0Y2hQYXRoQ1JDID0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZXRhR2VuZXJhdGlvbiA9IHRoaXMuX21ldGEucnVsZVNldEdlbmVyYXRpb247XG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBudWxsO1xuICAgIH1cblxuXG4gICAgX2xvZ01hdGNoRGlmZihhOiBudW1iZXJbXSwgYjogbnVtYmVyW10pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgaUEgPSAxLCBzaXplQSA9IGFbMF0sIGlCID0gMSwgc2l6ZUIgPSBiWzBdO1xuXG4gICAgICAgIHdoaWxlIChpQSA8PSBzaXplQSB8fCBpQiA8PSBzaXplQikge1xuICAgICAgICAgICAgbGV0IGMgPSAoaUEgPiBzaXplQSA/IDEgOiAoaUIgPiBzaXplQiA/IC0xIDogKGFbaUFdIC0gYltpQl0pKSk7XG4gICAgICAgICAgICBpZiAoYyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlBKys7XG4gICAgICAgICAgICAgICAgaUIrKztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA8IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBBIG5vdCBpbiBCLCBidXQgQSBkb2Vzbid0IGZpbHRlciBvbiBCJ3MgbWFzaywgdGhlbiBhZGQgaXRcbiAgICAgICAgICAgICAgICBwcmludCgnICAtLSBPbmx5IGluIEE6ICcgKyB0aGlzLl9tZXRhLl9ydWxlc1thW2lBXV0pO1xuICAgICAgICAgICAgICAgIGlBKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByaW50KCcgIC0tIE9ubHkgaW4gQjogJyArIHRoaXMuX21ldGEuX3J1bGVzW2JbaUJdXSk7XG4gICAgICAgICAgICAgICAgaUIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3BlcnRpZXMoKTogUHJvcGVydHlNYXBcbiAgICB7XG4gICAgICAgIHRoaXMuX2ludmFsaWRhdGVJZlN0YWxlKCk7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3Byb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gdGhpcy5fbWV0YS5wcm9wZXJ0aWVzRm9yTWF0Y2godGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgZGVidWdTdHJpbmcoKTogc3RyaW5nXG4gICAge1xuXG4gICAgICAgIGxldCBzaiA9IG5ldyBTdHJpbmdKb2luZXIoWydNYXRjaCBSZXN1bHQgcGF0aDogXFxuJ10pO1xuICAgICAgICB0aGlzLl9hcHBlbmRQcmV2UGF0aChzaik7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9vdmVyVW5pb25NYXRjaCkpIHtcbiAgICAgICAgICAgIHNqLmFkZCgnXFxuT3ZlcnJpZGVzIHBhdGg6ICcpO1xuICAgICAgICAgICAgdGhpcy5fb3ZlclVuaW9uTWF0Y2guX2FwcGVuZFByZXZQYXRoKHNqKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2oudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBfYXBwZW5kUHJldlBhdGgoYnVmOiBTdHJpbmdKb2luZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3ByZXZNYXRjaCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZNYXRjaC5fYXBwZW5kUHJldlBhdGgoYnVmKTtcbiAgICAgICAgICAgIGJ1Zi5hZGQoJyAtPiAnKTtcbiAgICAgICAgfVxuICAgICAgICBidWYuYWRkKHRoaXMuX2tleURhdGEuX2tleSk7XG4gICAgICAgIGJ1Zi5hZGQoJz0nKTtcbiAgICAgICAgYnVmLmFkZCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuXG4gICAgX2NoZWNrTWF0Y2godmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+LCBtZXRhOiBNZXRhKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGFycjogbnVtYmVyW10gPSB0aGlzLmZpbHRlclJlc3VsdCgpO1xuICAgICAgICBpZiAoaXNCbGFuayhhcnIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZmlyc3QgZW50cnkgaXMgY291bnRcbiAgICAgICAgbGV0IGNvdW50OiBudW1iZXIgPSBhcnJbMF07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHIgPSB0aGlzLl9tZXRhLl9ydWxlc1thcnJbaSArIDFdXTtcbiAgICAgICAgICAgIHIuX2NoZWNrUnVsZSh2YWx1ZXMsIG1ldGEpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGVxdWFsc1RvKG86IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAobyBpbnN0YW5jZW9mIE1hdGNoUmVzdWx0KSAmJiBzdXBlci5lcXVhbHNUbyhcbiAgICAgICAgICAgICAgICBvKSAmJiAoby5fbWV0YUdlbmVyYXRpb24gPT09IHRoaXMuX21ldGFHZW5lcmF0aW9uKSAmJlxuICAgICAgICAgICAgby5fcHJvcGVydGllcy5zaXplID09PSB0aGlzLl9wcm9wZXJ0aWVzLnNpemU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5pb25NYXRjaFJlc3VsdCBleHRlbmRzIE1hdGNoUmVzdWx0XG57XG5cbiAgICBjb25zdHJ1Y3RvcihtZXRhOiBNZXRhLCBrZXlEYXRhOiBLZXlEYXRhLCB2YWx1ZTogYW55LCBwcmV2TWF0Y2g6IE1hdGNoUmVzdWx0KVxuICAgIHtcbiAgICAgICAgc3VwZXIobWV0YSwga2V5RGF0YSwgdmFsdWUsIHByZXZNYXRjaCk7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgam9pbihhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIGFNYXNrOiBudW1iZXIsIGJNYXNrOiBudW1iZXIpOiBudW1iZXJbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIE1hdGNoLnVuaW9uKGEsIGIpO1xuXG4gICAgfVxufVxuXG4iXX0=