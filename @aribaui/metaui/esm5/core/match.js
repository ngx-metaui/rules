/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var Match = /** @class */ (function () {
    function Match(_matches, _keysMatchedMask, _matchPathCRC) {
        if (_matchPathCRC === void 0) { _matchPathCRC = 0; }
        this._matches = _matches;
        this._keysMatchedMask = _keysMatchedMask;
        this._matchPathCRC = _matchPathCRC;
    }
    // Word lists are int arrays with the first element holding the length
    /**
     * @param {?} intArr
     * @param {?} val
     * @return {?}
     */
    Match.addInt = /**
     * @param {?} intArr
     * @param {?} val
     * @return {?}
     */
    function (intArr, val) {
        if (isBlank(intArr)) {
            /** @type {?} */
            var r = new Array(4);
            r[0] = 1;
            r[1] = val;
            return r;
        }
        /** @type {?} */
        var newPos = intArr[0];
        if (intArr[newPos++] === val) {
            return intArr;
        } // already here...
        if (newPos >= intArr.length) {
            /** @type {?} */
            var a = new Array(newPos * 2);
            a = intArr.slice(0, newPos);
            intArr = a;
        }
        intArr[newPos] = val;
        intArr[0] = newPos;
        return intArr;
    };
    // only rules that use only the activated (queried) keys
    /**
     * @param {?} rules
     * @param {?} arr
     * @param {?} usesMask
     * @return {?}
     */
    Match.filterMustUse = /**
     * @param {?} rules
     * @param {?} arr
     * @param {?} usesMask
     * @return {?}
     */
    function (rules, arr, usesMask) {
        if (isBlank(arr)) {
            return null;
        }
        /** @type {?} */
        var result;
        /** @type {?} */
        var count = arr[0];
        for (var i = 0; i < count; i++) {
            /** @type {?} */
            var r = arr[i + 1];
            /** @type {?} */
            var rule = rules[r];
            if ((rule.keyMatchesMask & usesMask) !== 0) {
                result = Match.addInt(result, r);
            }
        }
        return result;
    };
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
    Match.intersect = /**
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
    function (allRules, a, b, aMask, bMask) {
        if (isBlank(a)) {
            return b;
        }
        /** @type {?} */
        var result;
        /** @type {?} */
        var iA = 1;
        /** @type {?} */
        var sizeA = isPresent(a[0]) ? a[0] : 0;
        /** @type {?} */
        var iB = 1;
        /** @type {?} */
        var sizeB = isPresent(b[0]) ? b[0] : 0;
        Match._Debug_ElementProcessCount += sizeA + sizeB;
        while (iA <= sizeA || iB <= sizeB) {
            /** @type {?} */
            var iAMask = (iA <= sizeA) ? allRules[a[iA]].keyIndexedMask : 0;
            /** @type {?} */
            var iBMask = (iB <= sizeB) ? allRules[b[iB]].keyIndexedMask : 0;
            /** @type {?} */
            var c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));
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
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    Match.union = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (isBlank(a)) {
            return b;
        }
        if (isBlank(b)) {
            return a;
        }
        /** @type {?} */
        var sizeA = a[0];
        /** @type {?} */
        var sizeB = b[0];
        if (sizeA === 0) {
            return b;
        }
        if (sizeB === 0) {
            return a;
        }
        Match._Debug_ElementProcessCount += (sizeA + sizeB);
        /** @type {?} */
        var result;
        /** @type {?} */
        var iA = 1;
        /** @type {?} */
        var vA = a[1];
        /** @type {?} */
        var iB = 1;
        /** @type {?} */
        var vB = b[1];
        while (iA <= sizeA || iB <= sizeB) {
            /** @type {?} */
            var c = vA - vB;
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
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    Match._arrayEq = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (a === b) {
            return true;
        }
        if (a === null || b === null) {
            return false;
        }
        /** @type {?} */
        var count = a[0];
        if (count !== b[0]) {
            return false;
        }
        for (var i = 1; i <= count; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Filter a partially matched set of rules down to the actual matches.
     * The input set of rules, matchesArr, is based on a *partial* match, and so includes rules
     * that were touched by some of the queried keys, but that may also require *additional* keys
     * that we have not matched on -- these must now be removed. Also, when 'partial indexing',
     * rules are indexed on a subset of their keys, so matchesArr will contain rules that need to
     * be evaluated against those MatchValues upon which they were not indexed (and therefore not
     * intersected / filtered on in the lookup process).
     */
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
    Match.prototype.filter = /**
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
    function (allRules, maxRule, matchesArr, queriedMask, matchArray) {
        if (isBlank(matchesArr)) {
            return null;
        }
        /** @type {?} */
        var result;
        /** @type {?} */
        var count = matchesArr[0];
        for (var i = 0; i < count; i++) {
            /** @type {?} */
            var r = matchesArr[i + 1];
            if (r >= maxRule) {
                continue;
            }
            /** @type {?} */
            var rule = allRules[r];
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
    };
    /**
     * @return {?}
     */
    Match.prototype.hashCode = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ret = this._keysMatchedMask * 31 + this._matchPathCRC;
        if (isPresent(this._matches)) {
            for (var i = 0, c = this._matches[0]; i < c; i++) {
                ret = crc32(ret, this._matches[i + 1]);
            }
        }
        return ret;
    };
    Object.defineProperty(Match.prototype, "keysMatchedMask", {
        get: /**
         * @return {?}
         */
        function () {
            return this._keysMatchedMask;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} o
     * @return {?}
     */
    Match.prototype.equalsTo = /**
     * @param {?} o
     * @return {?}
     */
    function (o) {
        return ((o instanceof Match) && this._keysMatchedMask === o._keysMatchedMask) &&
            this._matchPathCRC === o._matchPathCRC &&
            Match._arrayEq(this._matches, o._matches);
    };
    /**
     * @return {?}
     */
    Match.prototype.toString = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var buf = new StringJoiner([]);
        buf.add('_matches');
        buf.add((isPresent(this._matches) ? this._matches.length : 0) + '');
        buf.add('_keysMatchedMask');
        buf.add(this._keysMatchedMask + '');
        buf.add('_keysMatchedMask');
        buf.add(this._matchPathCRC + '');
        buf.add('hashcode');
        buf.add(this.hashCode() + '');
        return buf.toString();
    };
    Match.EmptyMatchArray = [];
    Match._Debug_ElementProcessCount = 0;
    return Match;
}());
export { Match };
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
var /**
 *  An Match which includes a UnionMatchResult part (which is used by Context to
 * represent the set of overridden key/values up the stack)
 */
MatchWithUnion = /** @class */ (function (_super) {
    tslib_1.__extends(MatchWithUnion, _super);
    function MatchWithUnion(_matches, _keysMatchedMask, _matchPathCRC, _overUnionMatch) {
        if (_matchPathCRC === void 0) { _matchPathCRC = 0; }
        var _this = _super.call(this, _matches, _keysMatchedMask, _matchPathCRC) || this;
        _this._matches = _matches;
        _this._keysMatchedMask = _keysMatchedMask;
        _this._matchPathCRC = _matchPathCRC;
        _this._overUnionMatch = _overUnionMatch;
        return _this;
    }
    /**
     * @param {?} o
     * @return {?}
     */
    MatchWithUnion.prototype.equalsTo = /**
     * @param {?} o
     * @return {?}
     */
    function (o) {
        return _super.prototype.equalsTo.call(this, o) && ((this._overUnionMatch === o._overUnionMatch) ||
            ((isPresent(this._overUnionMatch)) && isPresent(o._overUnionMatch) && this._overUnionMatch.equalsTo(o._overUnionMatch)));
    };
    return MatchWithUnion;
}(Match));
/**
 *  An Match which includes a UnionMatchResult part (which is used by Context to
 * represent the set of overridden key/values up the stack)
 */
export { MatchWithUnion };
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
var /**
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
MatchResult = /** @class */ (function (_super) {
    tslib_1.__extends(MatchResult, _super);
    // Meta meta, Meta.KeyData keyData, Object value, MatchResult prev)
    function MatchResult(_meta, _keyData, _value, _prevMatch) {
        var _this = _super.call(this, null, null, 0, (_prevMatch != null) ? _prevMatch._overUnionMatch : null) || this;
        _this._meta = _meta;
        _this._keyData = _keyData;
        _this._value = _value;
        _this._prevMatch = _prevMatch;
        _this._metaGeneration = 0;
        _this._initMatch();
        return _this;
    }
    /**
     * @param {?} over
     * @return {?}
     */
    MatchResult.prototype.setOverridesMatch = /**
     * @param {?} over
     * @return {?}
     */
    function (over) {
        this._overUnionMatch = over;
    };
    /**
     * @return {?}
     */
    MatchResult.prototype.matches = /**
     * @return {?}
     */
    function () {
        this._invalidateIfStale();
        if (isBlank(this._matches)) {
            this._initMatch();
        }
        return this._matches;
    };
    /**
     * @return {?}
     */
    MatchResult.prototype.filterResult = /**
     * @return {?}
     */
    function () {
        return this.filter(this._meta._rules, this._meta._ruleCount, this.matches(), this._keysMatchedMask, null);
    };
    /**
     * Fill in matchArray with MatchValues to use in Selector matching
     * @param matchArray
     */
    /**
     * Fill in matchArray with MatchValues to use in Selector matching
     * @param {?} matchArray
     * @return {?}
     */
    MatchResult.prototype.initMatchValues = /**
     * Fill in matchArray with MatchValues to use in Selector matching
     * @param {?} matchArray
     * @return {?}
     */
    function (matchArray) {
        if (isPresent(this._prevMatch)) {
            this._prevMatch.initMatchValues(matchArray);
        }
        if (isPresent(this._overUnionMatch)) {
            this._overUnionMatch.initMatchValues(matchArray);
        }
        this._meta.matchArrayAssign(matchArray, this._keyData, this._keyData.matchValue(this._value));
    };
    /**
     * @return {?}
     */
    MatchResult.prototype.filteredMatches = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var matches = this.matches();
        /** @type {?} */
        var keysMatchedMask = this._keysMatchedMask | (isPresent(this._overUnionMatch) ? this._overUnionMatch._keysMatchedMask : 0);
        /** @type {?} */
        var overrideMatches;
        if (isPresent(this._overUnionMatch) && isPresent((overrideMatches = this._overUnionMatch.matches()))) {
            if (isBlank(matches)) {
                matches = overrideMatches;
            }
            else {
                matches = Match.intersect(this._meta._rules, matches, overrideMatches, this._keysMatchedMask, this._overUnionMatch._keysMatchedMask);
            }
        }
        /** @type {?} */
        var matchArray;
        if (Meta._UsePartialIndexing) {
            matchArray = this._meta.newMatchArray();
            this.initMatchValues(matchArray);
        }
        return this.filter(this._meta._rules, this._meta._ruleCount, matches, keysMatchedMask, matchArray);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    MatchResult.prototype.valueForKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return (this._keyData._key === key) ? this._value :
            (isPresent(this._prevMatch) ? this._prevMatch.valueForKey(key) : null);
    };
    /**
     * @return {?}
     */
    MatchResult.prototype.immutableCopy = /**
     * @return {?}
     */
    function () {
        this._invalidateIfStale();
        return new MatchWithUnion(this.matches(), this._keysMatchedMask, this._matchPathCRC, this._overUnionMatch);
    };
    /**
     * @return {?}
     */
    MatchResult.prototype._invalidateIfStale = /**
     * @return {?}
     */
    function () {
        if (this._metaGeneration < this._meta.ruleSetGeneration) {
            this._initMatch();
        }
    };
    /**
     * @param {?} a
     * @param {?} b
     * @param {?} aMask
     * @param {?} bMask
     * @return {?}
     */
    MatchResult.prototype.join = /**
     * @param {?} a
     * @param {?} b
     * @param {?} aMask
     * @param {?} bMask
     * @return {?}
     */
    function (a, b, aMask, bMask) {
        return Match.intersect(this._meta._rules, a, b, aMask, bMask);
    };
    /**
     * @return {?}
     */
    MatchResult.prototype._initMatch = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var keyMask = shiftLeft(1, this._keyData._id);
        /** @type {?} */
        var newArr;
        if (isArray(this._value)) {
            try {
                for (var _a = tslib_1.__values(this._value), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var v = _b.value;
                    /** @type {?} */
                    var a = this._keyData.lookup(this._meta, v);
                    newArr = Match.union(a, newArr);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            newArr = this._keyData.lookup(this._meta, this._value);
        }
        /** @type {?} */
        var prevMatches = (isBlank(this._prevMatch)) ? null : this._prevMatch.matches();
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
        for (var mr = this; mr != null; mr = mr._prevMatch) {
            this._matchPathCRC = crc32(this._matchPathCRC, mr._keyData._key.length);
            if (isPresent(mr._value)) {
                /** @type {?} */
                var value = isArray(mr._value) ? mr._value.join(',') : mr._value;
                this._matchPathCRC = crc32(this._matchPathCRC, hashCode(value));
            }
        }
        if (this._matchPathCRC === 0) {
            this._matchPathCRC = 1;
        }
        this._metaGeneration = this._meta.ruleSetGeneration;
        this._properties = null;
        var e_1, _c;
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    MatchResult.prototype._logMatchDiff = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        /** @type {?} */
        var iA = 1;
        /** @type {?} */
        var sizeA = a[0];
        /** @type {?} */
        var iB = 1;
        /** @type {?} */
        var sizeB = b[0];
        while (iA <= sizeA || iB <= sizeB) {
            /** @type {?} */
            var c = (iA > sizeA ? 1 : (iB > sizeB ? -1 : (a[iA] - b[iB])));
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
    };
    /**
     * @return {?}
     */
    MatchResult.prototype.properties = /**
     * @return {?}
     */
    function () {
        this._invalidateIfStale();
        if (isBlank(this._properties)) {
            this._properties = this._meta.propertiesForMatch(this);
        }
        return this._properties;
    };
    /**
     * @return {?}
     */
    MatchResult.prototype.debugString = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sj = new StringJoiner(['Match Result path: \n']);
        this._appendPrevPath(sj);
        if (isPresent(this._overUnionMatch)) {
            sj.add('\nOverrides path: ');
            this._overUnionMatch._appendPrevPath(sj);
        }
        return sj.toString();
    };
    /**
     * @param {?} buf
     * @return {?}
     */
    MatchResult.prototype._appendPrevPath = /**
     * @param {?} buf
     * @return {?}
     */
    function (buf) {
        if (isPresent(this._prevMatch)) {
            this._prevMatch._appendPrevPath(buf);
            buf.add(' -> ');
        }
        buf.add(this._keyData._key);
        buf.add('=');
        buf.add(this._value);
    };
    /**
     * @param {?} values
     * @param {?} meta
     * @return {?}
     */
    MatchResult.prototype._checkMatch = /**
     * @param {?} values
     * @param {?} meta
     * @return {?}
     */
    function (values, meta) {
        /** @type {?} */
        var arr = this.filterResult();
        if (isBlank(arr)) {
            return;
        }
        /** @type {?} */
        var count = arr[0];
        for (var i = 0; i < count; i++) {
            /** @type {?} */
            var r = this._meta._rules[arr[i + 1]];
            r._checkRule(values, meta);
        }
    };
    /**
     * @param {?} o
     * @return {?}
     */
    MatchResult.prototype.equalsTo = /**
     * @param {?} o
     * @return {?}
     */
    function (o) {
        return (o instanceof MatchResult) && _super.prototype.equalsTo.call(this, o) && (o._metaGeneration === this._metaGeneration) &&
            o._properties.size === this._properties.size;
    };
    return MatchResult;
}(MatchWithUnion));
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
export { MatchResult };
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
var UnionMatchResult = /** @class */ (function (_super) {
    tslib_1.__extends(UnionMatchResult, _super);
    function UnionMatchResult(meta, keyData, value, prevMatch) {
        return _super.call(this, meta, keyData, value, prevMatch) || this;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @param {?} aMask
     * @param {?} bMask
     * @return {?}
     */
    UnionMatchResult.prototype.join = /**
     * @param {?} a
     * @param {?} b
     * @param {?} aMask
     * @param {?} bMask
     * @return {?}
     */
    function (a, b, aMask, bMask) {
        return Match.union(a, b);
    };
    return UnionMatchResult;
}(MatchResult));
export { UnionMatchResult };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL21hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBbUJBLE9BQU8sRUFDSCxNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxLQUFLLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQXNCLElBQUksRUFBYyxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7OztJQXlMMUQsZUFBbUIsUUFBa0IsRUFBUyxnQkFBd0IsRUFDbEQ7O1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUNsRCxrQkFBYSxHQUFiLGFBQWE7S0FFaEM7SUExS0Qsc0VBQXNFOzs7Ozs7SUFDL0QsWUFBTTs7Ozs7SUFBYixVQUFjLE1BQWdCLEVBQUUsR0FBVztRQUV2QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNsQixJQUFJLENBQUMsR0FBa0IsSUFBSSxLQUFLLENBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFFWCxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ1o7O1FBQ0QsSUFBSSxNQUFNLEdBQVcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNqQjtRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMs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QUFDLENBQUM7U0FDOUI7S0FFSjs7Ozs7SUFHRCw4QkFBUTs7OztJQUFSLFVBQVMsQ0FBTTtRQUVYLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxXQUFXLENBQUMsSUFBSSxpQkFBTSxRQUFRLFlBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ3RELENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0tBQ3BEO3NCQXptQkw7RUEwWGlDLGNBQWMsRUFnUDlDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWhQRCx1QkFnUEM7Ozs7Ozs7Ozs7Ozs7OztBQUVELElBQUE7SUFBc0MsNENBQVc7SUFHN0MsMEJBQVksSUFBVSxFQUFFLE9BQWdCLEVBQUUsS0FBVSxFQUFFLFNBQXNCO2VBRXhFLGtCQUFNLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQztLQUN6Qzs7Ozs7Ozs7SUFHUywrQkFBSTs7Ozs7OztJQUFkLFVBQWUsQ0FBVyxFQUFFLENBQVcsRUFBRSxLQUFhLEVBQUUsS0FBYTtRQUVqRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FFNUI7MkJBem5CTDtFQTRtQnNDLFdBQVcsRUFjaEQsQ0FBQTtBQWRELDRCQWNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge1xuICAgIGFzc2VydCxcbiAgICBjcmMzMixcbiAgICBoYXNoQ29kZSxcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNQcmVzZW50LFxuICAgIHByaW50LFxuICAgIHNoaWZ0TGVmdCxcbiAgICBTdHJpbmdKb2luZXJcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge1J1bGV9IGZyb20gJy4vcnVsZSc7XG5pbXBvcnQge0tleURhdGEsIE1hdGNoVmFsdWUsIE1ldGEsIFByb3BlcnR5TWFwfSBmcm9tICcuL21ldGEnO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNldCBvZiBtYXRjaGluZyBydWxlcyByZXN1bHRpbmcgZnJvbSBsb29raW5nIHVwIGEgc2V0IG9mIGtleS92YWx1ZXNcbiAqICBhZ2FpbnN0IHRoZSBNZXRhIHJ1bGUgYmFzZS5cbiAqXG4gKiBJbnN0YW5jZXMgb2YgdGhlIE1hdGNoIHN1cGVyY2xhc3MgYXJlIHNpbXBseSBpbW11dGFibGUgc25hcHNob3RzIG9mIHByZXZpb3VzIG1hdGNoZXNcbiAqICh1c2VkIGFzIGtleXMgaW4gTWF0Y2ggLT4gUHJvcGVydGllcyBsb29rdXAgY2FjaGVzKS5cbiAqIFRoZSBtb3JlIG1lYXR5IGNsYXNzIGlzIGl0cyBzdGF0aWMgaW5uZXIgc3ViY2xhc3MsIE1hdGNoLk1hdGNoUmVzdWx0LlxuICovXG5leHBvcnQgY2xhc3MgTWF0Y2hcbntcbiAgICBzdGF0aWMgcmVhZG9ubHkgRW1wdHlNYXRjaEFycmF5OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgc3RhdGljIF9EZWJ1Z19FbGVtZW50UHJvY2Vzc0NvdW50OiBudW1iZXIgPSAwO1xuXG5cbiAgICAvLyBXb3JkIGxpc3RzIGFyZSBpbnQgYXJyYXlzIHdpdGggdGhlIGZpcnN0IGVsZW1lbnQgaG9sZGluZyB0aGUgbGVuZ3RoXG4gICAgc3RhdGljIGFkZEludChpbnRBcnI6IG51bWJlcltdLCB2YWw6IG51bWJlcik6IG51bWJlcltdXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhpbnRBcnIpKSB7XG4gICAgICAgICAgICBsZXQgcjogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KDQpO1xuICAgICAgICAgICAgclswXSA9IDE7XG4gICAgICAgICAgICByWzFdID0gdmFsO1xuXG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3UG9zOiBudW1iZXIgPSBpbnRBcnJbMF07XG4gICAgICAgIGlmIChpbnRBcnJbbmV3UG9zKytdID09PSB2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRBcnI7XG4gICAgICAgIH0gIC8vIGFscmVhZHkgaGVyZS4uLlxuXG4gICAgICAgIGlmIChuZXdQb3MgPj0gaW50QXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGE6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPihuZXdQb3MgKiAyKTtcbiAgICAgICAgICAgIGEgPSBpbnRBcnIuc2xpY2UoMCwgbmV3UG9zKTtcbiAgICAgICAgICAgIGludEFyciA9IGE7XG4gICAgICAgIH1cbiAgICAgICAgaW50QXJyW25ld1Bvc10gPSB2YWw7XG4gICAgICAgIGludEFyclswXSA9IG5ld1BvcztcbiAgICAgICAgcmV0dXJuIGludEFycjtcbiAgICB9XG5cbiAgICAvLyBvbmx5IHJ1bGVzIHRoYXQgdXNlIG9ubHkgdGhlIGFjdGl2YXRlZCAocXVlcmllZCkga2V5c1xuICAgIHN0YXRpYyBmaWx0ZXJNdXN0VXNlKHJ1bGVzOiBBcnJheTxSdWxlPiwgYXJyOiBudW1iZXJbXSwgdXNlc01hc2s6IG51bWJlcik6IG51bWJlcltdXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhhcnIpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXJbXTtcbiAgICAgICAgbGV0IGNvdW50ID0gYXJyWzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCByID0gYXJyW2kgKyAxXTtcbiAgICAgICAgICAgIGxldCBydWxlID0gcnVsZXNbcl07XG4gICAgICAgICAgICBpZiAoKHJ1bGUua2V5TWF0Y2hlc01hc2sgJiB1c2VzTWFzaykgIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBNYXRjaC5hZGRJbnQocmVzdWx0LCByKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJzZWN0cyB0d28gcnVsZXZlY3MuICBUaGlzIGlzIG5vdCBhIHRyYWRpdGlvbmFsIGludGVyc2VjdGlvbiB3aGVyZSBvbmx5IGl0ZW1zIGluIGJvdGhcbiAgICAgKiBpbnB1dHMgYXJlIGluY2x1ZGVkIGluIHRoZSByZXN1bHQ6IHdlIG9ubHkgaW50ZXJzZWN0IHJ1bGVzIHRoYXQgbWF0Y2ggb24gY29tbW9uIGtleXM7XG4gICAgICogb3RoZXJzIGFyZSB1bmlvbmVkLlxuICAgICAqXG4gICAgICogRm9yIGluc3RhbmNlLCBzYXkgd2UgaGF2ZSB0aGUgZm9sbG93aW5nIGlucHV0czpcbiAgICAgKiAgICAgIGE6ICBbbWF0Y2hlZCBvbjogY2xhc3MsIGxheW91dF0gIChjbGFzcz1Gb28sIGxheW91dD1JbnNwZWN0KVxuICAgICAqICAgICAgICAgIDEpIGNsYXNzPUZvbyBsYXlvdXQ9SW5zcGVjdCB7IC4uLiB9XG4gICAgICogICAgICAgICAgMikgY2xhc3M9Rm9vIG9wZXJhdGlvbj1lZGl0IHsgLi4uIH1cbiAgICAgKiAgICAgICAgICAzKSBsYXlvdXQ9SW5zcGVjdCBvcGVyYXRpb249dmlldyB7IC4uLiB9XG4gICAgICpcbiAgICAgKiAgICAgIGI6ICBbbWF0Y2hlZCBvbjogb3BlcmF0aW9uXSAgKG9wZXJhdGlvbj12aWV3KVxuICAgICAqICAgICAgICAgIDMpIGxheW91dD1JbnNwZWN0IG9wZXJhdGlvbj12aWV3IHsgLi4uIH1cbiAgICAgKiAgICAgICAgICA0KSBvcGVyYXRpb249dmlldyB0eXBlPVN0cmluZyB7IC4uLiB9XG4gICAgICogICAgICAgICAgNSkgb3BlcmF0aW9uPXZpZXcgbGF5b3V0PVRhYnMgeyAuLi4gfVxuICAgICAqXG4gICAgICogVGhlIHJlc3VsdCBzaG91bGQgYmU6IDEsIDMsIDRcbiAgICAgKiBJLmUuOiBpdGVtcyB0aGF0IGFwcGVhciBpbiBib3RoICgjMyBhYm92ZSkgYXJlIGluY2x1ZGVkLCBhcyBhcmUgaXRlbXMgdGhhdCBhcHBlYXIgaW4ganVzdFxuICAgICAqIG9uZSxcbiAgICAgKiAqYnV0IGRvbid0IG1hdGNoIG9uIHRoZSBrZXlzIGluIHRoZSBvdGhlciogKCMxIGFuZCAjNCBhYm92ZSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYWxsUnVsZXMgdGhlIGZ1bGwgcnVsZSBiYXNlXG4gICAgICogQHBhcmFtIGEgZmlyc3QgdmVjdG9yIG9mIHJ1bGUgaW5kZXhlc1xuICAgICAqIEBwYXJhbSBiIHNlY29uZCB2ZWN0b3Igb2YgcnVsZSBpbmRleGVzXG4gICAgICogQHBhcmFtIGFNYXNrIG1hc2sgaW5kaWNhdGluZyB0aGUga2V5cyBhZ2FpbnN0IHdoaWNoIHRoZSBmaXJzdCBydWxlIHZlY3RvcnMgaXRlbXMgaGF2ZVxuICAgICAqICAgICBhbHJlYWR5IGJlZW4gbWF0Y2hlZFxuICAgICAqIEBwYXJhbSBiTWFzayBtYXNrIGluZGljYXRpbmcgdGhlIGtleXMgYWdhaW5zdCB3aGljaCB0aGUgc2Vjb25kIHJ1bGUgdmVjdG9ycyBpdGVtcyBoYXZlXG4gICAgICogICAgIGFscmVhZHkgYmVlbiBtYXRjaGVkXG4gICAgICogQHJldHVybiBydWxlIHZlY3RvciBmb3IgdGhlIG1hdGNoZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgaW50ZXJzZWN0KGFsbFJ1bGVzOiBBcnJheTxSdWxlPiwgYTogbnVtYmVyW10sIGI6IG51bWJlcltdLCBhTWFzazogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgYk1hc2s6IG51bWJlcik6IG51bWJlcltdXG4gICAge1xuXG4gICAgICAgIGlmIChpc0JsYW5rKGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXJbXTtcbiAgICAgICAgbGV0IGlBID0gMSwgc2l6ZUEgPSBpc1ByZXNlbnQoYVswXSkgPyBhWzBdIDogMCwgaUIgPSAxLCBzaXplQiA9IGlzUHJlc2VudChiWzBdKSA/IGJbMF0gOiAwO1xuICAgICAgICBNYXRjaC5fRGVidWdfRWxlbWVudFByb2Nlc3NDb3VudCArPSBzaXplQSArIHNpemVCO1xuXG4gICAgICAgIHdoaWxlIChpQSA8PSBzaXplQSB8fCBpQiA8PSBzaXplQikge1xuICAgICAgICAgICAgbGV0IGlBTWFzayA9IChpQSA8PSBzaXplQSkgPyBhbGxSdWxlc1thW2lBXV0ua2V5SW5kZXhlZE1hc2sgOiAwO1xuICAgICAgICAgICAgbGV0IGlCTWFzayA9IChpQiA8PSBzaXplQikgPyBhbGxSdWxlc1tiW2lCXV0ua2V5SW5kZXhlZE1hc2sgOiAwO1xuICAgICAgICAgICAgbGV0IGMgPSAoaUEgPiBzaXplQSA/IDEgOiAoaUIgPiBzaXplQiA/IC0xIDogKGFbaUFdIC0gYltpQl0pKSk7XG5cbiAgICAgICAgICAgIGlmIChjID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gTWF0Y2guYWRkSW50KHJlc3VsdCwgYVtpQV0pO1xuICAgICAgICAgICAgICAgIGlBKys7XG4gICAgICAgICAgICAgICAgaUIrKztcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChjIDwgMCkge1xuICAgICAgICAgICAgICAgIC8vIElmIEEgbm90IGluIEIsIGJ1dCBBIGRvZXNuJ3QgZmlsdGVyIG9uIEIncyBtYXNrLCB0aGVuIGFkZCBpdFxuICAgICAgICAgICAgICAgIGlmICgoaUFNYXNrICYgYk1hc2spID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IE1hdGNoLmFkZEludChyZXN1bHQsIGFbaUFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaUErKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKChpQk1hc2sgJiBhTWFzaykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTWF0Y2guYWRkSW50KHJlc3VsdCwgYltpQl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpQisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHVuaW9uKGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSk6IG51bWJlcltdXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhhKSkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmxhbmsoYikpIHtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaXplQSA9IGFbMF0sIHNpemVCID0gYlswXTtcbiAgICAgICAgaWYgKHNpemVBID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2l6ZUIgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgICAgIE1hdGNoLl9EZWJ1Z19FbGVtZW50UHJvY2Vzc0NvdW50ICs9IChzaXplQSArIHNpemVCKTtcblxuICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXJbXTtcbiAgICAgICAgbGV0IGlBID0gMSwgdkEgPSBhWzFdLCBpQiA9IDEsIHZCID0gYlsxXTtcblxuXG4gICAgICAgIHdoaWxlIChpQSA8PSBzaXplQSB8fCBpQiA8PSBzaXplQikge1xuICAgICAgICAgICAgbGV0IGM6IG51bWJlciA9IHZBIC0gdkI7XG4gICAgICAgICAgICByZXN1bHQgPSBNYXRjaC5hZGRJbnQocmVzdWx0LCAoKGMgPD0gMCkgPyB2QSA6IHZCKSk7XG4gICAgICAgICAgICBpZiAoYyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgaUErKztcbiAgICAgICAgICAgICAgICB2QSA9IChpQSA8PSBzaXplQSkgPyBhW2lBXSA6IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYyA+PSAwKSB7XG4gICAgICAgICAgICAgICAgaUIrKztcbiAgICAgICAgICAgICAgICB2QiA9IChpQiA8PSBzaXplQikgPyBiW2lCXSA6IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgX2FycmF5RXEoYTogbnVtYmVyW10sIGI6IG51bWJlcltdKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhID09PSBudWxsIHx8IGIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY291bnQgPSBhWzBdO1xuICAgICAgICBpZiAoY291bnQgIT09IGJbMF0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX21hdGNoZXM6IG51bWJlcltdLCBwdWJsaWMgX2tleXNNYXRjaGVkTWFzazogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHB1YmxpYyAgX21hdGNoUGF0aENSQzogbnVtYmVyID0gMClcbiAgICB7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgYSBwYXJ0aWFsbHkgbWF0Y2hlZCBzZXQgb2YgcnVsZXMgZG93biB0byB0aGUgYWN0dWFsIG1hdGNoZXMuXG4gICAgICogVGhlIGlucHV0IHNldCBvZiBydWxlcywgbWF0Y2hlc0FyciwgaXMgYmFzZWQgb24gYSAqcGFydGlhbCogbWF0Y2gsIGFuZCBzbyBpbmNsdWRlcyBydWxlc1xuICAgICAqIHRoYXQgd2VyZSB0b3VjaGVkIGJ5IHNvbWUgb2YgdGhlIHF1ZXJpZWQga2V5cywgYnV0IHRoYXQgbWF5IGFsc28gcmVxdWlyZSAqYWRkaXRpb25hbCoga2V5c1xuICAgICAqIHRoYXQgd2UgaGF2ZSBub3QgbWF0Y2hlZCBvbiAtLSB0aGVzZSBtdXN0IG5vdyBiZSByZW1vdmVkLiBBbHNvLCB3aGVuICdwYXJ0aWFsIGluZGV4aW5nJyxcbiAgICAgKiBydWxlcyBhcmUgaW5kZXhlZCBvbiBhIHN1YnNldCBvZiB0aGVpciBrZXlzLCBzbyBtYXRjaGVzQXJyIHdpbGwgY29udGFpbiBydWxlcyB0aGF0IG5lZWQgdG9cbiAgICAgKiBiZSBldmFsdWF0ZWQgYWdhaW5zdCB0aG9zZSBNYXRjaFZhbHVlcyB1cG9uIHdoaWNoIHRoZXkgd2VyZSBub3QgaW5kZXhlZCAoYW5kIHRoZXJlZm9yZSBub3RcbiAgICAgKiBpbnRlcnNlY3RlZCAvIGZpbHRlcmVkIG9uIGluIHRoZSBsb29rdXAgcHJvY2VzcykuXG4gICAgICovXG4gICAgZmlsdGVyKGFsbFJ1bGVzOiBBcnJheTxSdWxlPiwgbWF4UnVsZTogbnVtYmVyLCBtYXRjaGVzQXJyOiBudW1iZXJbXSwgcXVlcmllZE1hc2s6IG51bWJlcixcbiAgICAgICAgICAgbWF0Y2hBcnJheTogTWF0Y2hWYWx1ZVtdKTogbnVtYmVyW11cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKG1hdGNoZXNBcnIpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBwcmludCgnXFxuIyMgRmlsdGVyaW5nIG1hdGNoaW5nOiAnICsgbWF0Y2hlc0FyclswXSArICcsIFF1ZXJpZWQgTWFzazogJyArIHF1ZXJpZWRNYXNrKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDE7IGkgPD0gbWF0Y2hlc0FyclswXTsgaSsrKSB7XG4gICAgICAgIC8vICAgICBwcmludCgnIyMgJyArIG1hdGNoZXNBcnJbaV0gKyAnKTogJyArIGFsbFJ1bGVzW21hdGNoZXNBcnJbaV1dLnRvU3RyaW5nKCkpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyW107XG4gICAgICAgIGxldCBjb3VudCA9IG1hdGNoZXNBcnJbMF07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgciA9IG1hdGNoZXNBcnJbaSArIDFdO1xuICAgICAgICAgICAgaWYgKHIgPj0gbWF4UnVsZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJ1bGU6IFJ1bGUgPSBhbGxSdWxlc1tyXTtcblxuXG4gICAgICAgICAgICBpZiAocnVsZS5kaXNhYmxlZCgpIHx8IChydWxlLmtleUFudGlNYXNrICYgcXVlcmllZE1hc2spICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE11c3QgaGF2ZSBtYXRjaGVkIG9uIChhY3RpdmF0ZSkgYWxsIG1hdGNoIGtleXMgZm9yIHRoaXMgcnVsZSwgKmFuZCpcbiAgICAgICAgICAgIC8vIGlmIGhhdmUgYW55IG5vbi1pbmRleGVkIHJ1bGVzLCBuZWVkIHRvIGNoZWNrIG1hdGNoIG9uIHRob3NlXG4gICAgICAgICAgICBpZiAoKChydWxlLmtleU1hdGNoZXNNYXNrICYgfnF1ZXJpZWRNYXNrKSA9PT0gMCkgJiZcbiAgICAgICAgICAgICAgICAoKHJ1bGUua2V5TWF0Y2hlc01hc2sgPT09IHJ1bGUua2V5SW5kZXhlZE1hc2spXG4gICAgICAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICAoaXNQcmVzZW50KG1hdGNoQXJyYXkpICYmIHJ1bGUubWF0Y2hlcyhtYXRjaEFycmF5KSkpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoTWV0YS5fRGVidWdEb3VibGVDaGVja01hdGNoZXMgJiYgIShtYXRjaEFycmF5ICE9IG51bGwgJiYgcnVsZS5tYXRjaGVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hBcnJheSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydChmYWxzZSwgJ0luY29uc2lzdGVudCAobmVnYXRpdmUpIG1hdGNoIG9uIHJ1bGU6ICcgKyBydWxlKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE1hdGNoLmFkZEludChyZXN1bHQsIHIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChNZXRhLl9EZWJ1Z0RvdWJsZUNoZWNrTWF0Y2hlcyAmJiAobWF0Y2hBcnJheSAhPSBudWxsICYmIHJ1bGUubWF0Y2hlcyhcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hBcnJheSkpKSB7XG4gICAgICAgICAgICAgICAgLy8gQXNzZXJ0LnRoYXQoZmFsc2UsICdJbmNvbnNpc3RlbnQgKHBvc2l0aXZlKSBtYXRjaCBvbiBydWxlOiAlcycsIHJ1bGUpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAoaXNQcmVzZW50KHJlc3VsdCkgJiYgcmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gICAgIHByaW50KCdcXG5cXG5cXG4gIyMjIyBGaWx0ZXJpbmcgUkVTVUxUOiAnICsgcmVzdWx0WzBdKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHJlc3VsdFswXTsgaSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgcHJpbnQoJyMjICcgKyByZXN1bHRbaV0gKyAnKTogJyArIGFsbFJ1bGVzW3Jlc3VsdFtpXV0udG9TdHJpbmcoKSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIGhhc2hDb2RlKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHJldCA9IHRoaXMuX2tleXNNYXRjaGVkTWFzayAqIDMxICsgdGhpcy5fbWF0Y2hQYXRoQ1JDO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX21hdGNoZXMpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IHRoaXMuX21hdGNoZXNbMF07IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXQgPSBjcmMzMihyZXQsIHRoaXMuX21hdGNoZXNbaSArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuXG4gICAgZ2V0IGtleXNNYXRjaGVkTWFzaygpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlzTWF0Y2hlZE1hc2s7XG4gICAgfVxuXG4gICAgZXF1YWxzVG8obzogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuICgobyBpbnN0YW5jZW9mIE1hdGNoKSAmJiB0aGlzLl9rZXlzTWF0Y2hlZE1hc2sgPT09IG8uX2tleXNNYXRjaGVkTWFzaykgJiZcbiAgICAgICAgICAgIHRoaXMuX21hdGNoUGF0aENSQyA9PT0gby5fbWF0Y2hQYXRoQ1JDICYmXG4gICAgICAgICAgICBNYXRjaC5fYXJyYXlFcSh0aGlzLl9tYXRjaGVzLCBvLl9tYXRjaGVzKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpXG4gICAge1xuICAgICAgICBsZXQgYnVmID0gbmV3IFN0cmluZ0pvaW5lcihbXSk7XG4gICAgICAgIGJ1Zi5hZGQoJ19tYXRjaGVzJyk7XG4gICAgICAgIGJ1Zi5hZGQoKGlzUHJlc2VudCh0aGlzLl9tYXRjaGVzKSA/IHRoaXMuX21hdGNoZXMubGVuZ3RoIDogMCkgKyAnJyk7XG4gICAgICAgIGJ1Zi5hZGQoJ19rZXlzTWF0Y2hlZE1hc2snKTtcbiAgICAgICAgYnVmLmFkZCh0aGlzLl9rZXlzTWF0Y2hlZE1hc2sgKyAnJyk7XG4gICAgICAgIGJ1Zi5hZGQoJ19rZXlzTWF0Y2hlZE1hc2snKTtcbiAgICAgICAgYnVmLmFkZCh0aGlzLl9tYXRjaFBhdGhDUkMgKyAnJyk7XG5cbiAgICAgICAgYnVmLmFkZCgnaGFzaGNvZGUnKTtcbiAgICAgICAgYnVmLmFkZCh0aGlzLmhhc2hDb2RlKCkgKyAnJyk7XG5cbiAgICAgICAgcmV0dXJuIGJ1Zi50b1N0cmluZygpO1xuICAgIH1cblxufVxuLyoqXG4gKiAgQW4gTWF0Y2ggd2hpY2ggaW5jbHVkZXMgYSBVbmlvbk1hdGNoUmVzdWx0IHBhcnQgKHdoaWNoIGlzIHVzZWQgYnkgQ29udGV4dCB0b1xuICogcmVwcmVzZW50IHRoZSBzZXQgb2Ygb3ZlcnJpZGRlbiBrZXkvdmFsdWVzIHVwIHRoZSBzdGFjaylcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdGNoV2l0aFVuaW9uIGV4dGVuZHMgTWF0Y2hcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfbWF0Y2hlczogbnVtYmVyW10sIHB1YmxpYyAgX2tleXNNYXRjaGVkTWFzazogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHB1YmxpYyAgX21hdGNoUGF0aENSQzogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICBwdWJsaWMgX292ZXJVbmlvbk1hdGNoOiBVbmlvbk1hdGNoUmVzdWx0KVxuICAgIHtcbiAgICAgICAgc3VwZXIoX21hdGNoZXMsIF9rZXlzTWF0Y2hlZE1hc2ssIF9tYXRjaFBhdGhDUkMpO1xuICAgIH1cblxuXG4gICAgZXF1YWxzVG8obzogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmVxdWFsc1RvKG8pICYmIChcbiAgICAgICAgICAgICh0aGlzLl9vdmVyVW5pb25NYXRjaCA9PT0gby5fb3ZlclVuaW9uTWF0Y2gpIHx8XG4gICAgICAgICAgICAoKGlzUHJlc2VudCh0aGlzLl9vdmVyVW5pb25NYXRjaCkpICYmIGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICBvLl9vdmVyVW5pb25NYXRjaCkgJiYgdGhpcy5fb3ZlclVuaW9uTWF0Y2guZXF1YWxzVG8oXG4gICAgICAgICAgICAgICAgby5fb3ZlclVuaW9uTWF0Y2gpKSk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogIE1hdGNoUmVzdWx0IHJlcHJlc2VudHMgdGhlIHJlc3VsdCBvZiBjb21wdXRpbmcgdGhlIHNldCBvZiBtYXRjaGluZyBydWxlc1xuICogIGJhc2VkIG9uIHRoZSBrZXkvdmFsdWUgb24gdGhpcyBpbnN0YW5jZSwgYW5kIHRoZSBvdGhlciBrZXkvdmFsdWUgcGFpcnNcbiAqIG9uIGl0cyBwcmVkZWNlc3NvciBjaGFpbi4gIEkuZS4gdG8gZmluZCB0aGUgbWF0Y2hpbmcgcnVsZXMgZm9yIHRoZSBjb250ZXh0IGtleXNcbiAqIHtvcGVyYXRpb249ZWRpdDsgbGF5b3V0PUluc3BlY3Q7IGNsYXNzPUZvb30sIGZpcnN0IGEgTWF0Y2hSZXN1bHQgaXMgY3JlYXRlZCBmb3JcbiAqICdvcGVyYXRpb249ZWRpdCcgYW5kIHBhc3NlZCBhcyB0aGUgJ3ByZXYnIHRvIHRoZSBjcmVhdGlvbiBvZiBhbm90aGVyIGZvciAnbGF5b3V0PUluc3BlY3QnLFxuICogYW5kIHNvIG9uLiAgSW4gdGhpcyB3YXkgdGhlIE1hdGNoUmVzdWx0cyBmb3JtIGEgKihzaGFyYWJsZSkgcGFydGlhbC1tYXRjaCB0cmVlLipcbiAqXG4gKiBUaGUgYWJpbGl0eSB0byByZXN1bHQgcHJldmlvdXMgcGFydGlhbCBtYXRjaCAncGF0aHMnIGlzIGFuIGltcG9ydGFudCBvcHRpbWl6YXRpb246XG4gKiB0aGUgcHJpbWFyeSBjbGllbnQgb2YgTWF0Y2hSZXN1bHQgKGFuZCBvZiBydWxlIG1hdGNoaW5nIGluIGdlbmVyYWwpIGlzIHRoZSBDb250ZXh0LCB3aGVuIGVhY2hcbiAqIGFzc2lnbm1lbnQgcHVzaGVzIGEgcmVjb3JkIG9uIGEgc3RhY2sgdGhhdCAocm91Z2hseSkgZXh0ZW5kcyB0aGUgTWF0Y2ggZnJvbSB0aGUgcHJldmlvdXNcbiAqIGFzc2lnbm1lbnQuICBCeSBjYWNoaW5nIE1hdGNoUmVzdWx0IGluc3RhbmNlcyBvbiB0aGUgX0Fzc2lnbm1lbnQgcmVjb3JkcywgbWF0Y2hpbmcgaXMgbGltaXRlZFxuICogIHRvIHRoZSAqaW5jcmVtZW50YWwqIG1hdGNoaW5nIG9uIGp1c3QgdGhlIG5ldyBhc3NpZ25tZW50LCBub3QgYSBmdWxsIG1hdGNoIG9uIGFsbCBrZXlzIGluIHRoZVxuICogIGNvbnRleHQuXG4gKlxuICogRnVydGhlciwgYSBNYXRjaFJlc3VsdCBjYWNoZXMgdGhlICpwcm9wZXJ0eSBtYXAqIHJlc3VsdGluZyBmcm9tIHRoZSBhcHBsaWNhdGlvbiBvZiB0aGUgcnVsZXNcbiAqICB0aGF0IGl0IG1hdGNoZXMuICBCeSBjYWNoaW5nIE1hdGNoUmVzdWx0IG9iamVjdHMgKGFuZCBjYWNoaW5nIHRoZSBtYXAgZnJvbVxuICogIFJ1bGUgdmVjdG9yIChBS0EgTWF0Y2gpIC0+IE1hdGNoUmVzdWx0IC0+IFByb3BlcnR5TWFwKSwgcmVkdWRhbnQgcnVsZSBhcHBsaWNhdGlvbiAoYW5kIGNyZWF0aW9uXG4gKiBvZiBhZGRpdGlvbmFsIHByb3BlcnR5IG1hcHMpIGlzIGF2b2lkZWQuXG4gKi9cbiAgICAvLyB0b2RvOiBpbXBsZW1lbnQgdG9TdHJpbmcgZm9yIHRoZSBEaWN0b25hcnkgYXMgdGhpcyBpcyB1c2VkIGFzIGEga2V5XG5leHBvcnQgY2xhc3MgTWF0Y2hSZXN1bHQgZXh0ZW5kcyBNYXRjaFdpdGhVbmlvblxue1xuXG4gICAgcHJpdmF0ZSBfbWV0YUdlbmVyYXRpb246IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfcHJvcGVydGllczogUHJvcGVydHlNYXA7XG5cbiAgICAvLyBNZXRhIG1ldGEsIE1ldGEuS2V5RGF0YSBrZXlEYXRhLCBPYmplY3QgdmFsdWUsIE1hdGNoUmVzdWx0IHByZXYpXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWV0YTogTWV0YSwgcHJpdmF0ZSAgX2tleURhdGE6IEtleURhdGEsIHByaXZhdGUgX3ZhbHVlOiBhbnksXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfcHJldk1hdGNoOiBNYXRjaFJlc3VsdClcbiAgICB7XG4gICAgICAgIHN1cGVyKG51bGwsIG51bGwsIDAsIChfcHJldk1hdGNoICE9IG51bGwpID8gX3ByZXZNYXRjaC5fb3ZlclVuaW9uTWF0Y2ggOiBudWxsKTtcbiAgICAgICAgdGhpcy5faW5pdE1hdGNoKCk7XG5cbiAgICB9XG5cbiAgICBzZXRPdmVycmlkZXNNYXRjaChvdmVyOiBVbmlvbk1hdGNoUmVzdWx0KVxuICAgIHtcbiAgICAgICAgdGhpcy5fb3ZlclVuaW9uTWF0Y2ggPSBvdmVyO1xuICAgIH1cblxuICAgIG1hdGNoZXMoKTogbnVtYmVyW11cbiAgICB7XG4gICAgICAgIHRoaXMuX2ludmFsaWRhdGVJZlN0YWxlKCk7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX21hdGNoZXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0TWF0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbWF0Y2hlcztcbiAgICB9XG5cbiAgICBmaWx0ZXJSZXN1bHQoKTogbnVtYmVyW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLl9tZXRhLl9ydWxlcywgdGhpcy5fbWV0YS5fcnVsZUNvdW50LCB0aGlzLm1hdGNoZXMoKSxcbiAgICAgICAgICAgIHRoaXMuX2tleXNNYXRjaGVkTWFzaywgbnVsbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlsbCBpbiBtYXRjaEFycmF5IHdpdGggTWF0Y2hWYWx1ZXMgdG8gdXNlIGluIFNlbGVjdG9yIG1hdGNoaW5nXG4gICAgICogQHBhcmFtIG1hdGNoQXJyYXlcbiAgICAgKi9cbiAgICBpbml0TWF0Y2hWYWx1ZXMobWF0Y2hBcnJheTogTWF0Y2hWYWx1ZVtdKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wcmV2TWF0Y2gpKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2TWF0Y2guaW5pdE1hdGNoVmFsdWVzKG1hdGNoQXJyYXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fb3ZlclVuaW9uTWF0Y2gpKSB7XG4gICAgICAgICAgICB0aGlzLl9vdmVyVW5pb25NYXRjaC5pbml0TWF0Y2hWYWx1ZXMobWF0Y2hBcnJheSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWV0YS5tYXRjaEFycmF5QXNzaWduKG1hdGNoQXJyYXksIHRoaXMuX2tleURhdGEsXG4gICAgICAgICAgICB0aGlzLl9rZXlEYXRhLm1hdGNoVmFsdWUodGhpcy5fdmFsdWUpKTtcbiAgICB9XG5cblxuICAgIGZpbHRlcmVkTWF0Y2hlcygpOiBudW1iZXJbXVxuICAgIHtcbiAgICAgICAgLy8gc2hvdWxkbid0IHRoaXMgYmUgY2FjaGVkPyE/XG4gICAgICAgIGxldCBtYXRjaGVzOiBudW1iZXJbXSA9IHRoaXMubWF0Y2hlcygpO1xuICAgICAgICBsZXQga2V5c01hdGNoZWRNYXNrID0gdGhpcy5fa2V5c01hdGNoZWRNYXNrIHwgKGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICB0aGlzLl9vdmVyVW5pb25NYXRjaCkgPyB0aGlzLl9vdmVyVW5pb25NYXRjaC5fa2V5c01hdGNoZWRNYXNrIDogMCk7XG5cbiAgICAgICAgbGV0IG92ZXJyaWRlTWF0Y2hlczogbnVtYmVyW107XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9vdmVyVW5pb25NYXRjaCkgJiYgaXNQcmVzZW50KFxuICAgICAgICAgICAgICAgIChvdmVycmlkZU1hdGNoZXMgPSB0aGlzLl9vdmVyVW5pb25NYXRjaC5tYXRjaGVzKCkpKSkge1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsobWF0Y2hlcykpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVzID0gb3ZlcnJpZGVNYXRjaGVzO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBNYXRjaC5pbnRlcnNlY3QodGhpcy5fbWV0YS5fcnVsZXMsIG1hdGNoZXMsIG92ZXJyaWRlTWF0Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5c01hdGNoZWRNYXNrLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vdmVyVW5pb25NYXRjaC5fa2V5c01hdGNoZWRNYXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXRjaEFycmF5OiBNYXRjaFZhbHVlW107XG4gICAgICAgIGlmIChNZXRhLl9Vc2VQYXJ0aWFsSW5kZXhpbmcpIHtcbiAgICAgICAgICAgIG1hdGNoQXJyYXkgPSB0aGlzLl9tZXRhLm5ld01hdGNoQXJyYXkoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1hdGNoVmFsdWVzKG1hdGNoQXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuX21ldGEuX3J1bGVzLCB0aGlzLl9tZXRhLl9ydWxlQ291bnQsIG1hdGNoZXMsIGtleXNNYXRjaGVkTWFzayxcbiAgICAgICAgICAgIG1hdGNoQXJyYXkpO1xuICAgIH1cblxuXG4gICAgdmFsdWVGb3JLZXkoa2V5OiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiAodGhpcy5fa2V5RGF0YS5fa2V5ID09PSBrZXkpID8gdGhpcy5fdmFsdWUgOlxuICAgICAgICAgICAgKGlzUHJlc2VudCh0aGlzLl9wcmV2TWF0Y2gpID8gdGhpcy5fcHJldk1hdGNoLnZhbHVlRm9yS2V5KGtleSkgOiBudWxsKTtcbiAgICB9XG5cbiAgICBpbW11dGFibGVDb3B5KCk6IE1hdGNoXG4gICAge1xuICAgICAgICB0aGlzLl9pbnZhbGlkYXRlSWZTdGFsZSgpO1xuICAgICAgICByZXR1cm4gbmV3IE1hdGNoV2l0aFVuaW9uKHRoaXMubWF0Y2hlcygpLCB0aGlzLl9rZXlzTWF0Y2hlZE1hc2ssIHRoaXMuX21hdGNoUGF0aENSQyxcbiAgICAgICAgICAgIHRoaXMuX292ZXJVbmlvbk1hdGNoKTtcbiAgICB9XG5cbiAgICBfaW52YWxpZGF0ZUlmU3RhbGUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX21ldGFHZW5lcmF0aW9uIDwgdGhpcy5fbWV0YS5ydWxlU2V0R2VuZXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5faW5pdE1hdGNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgam9pbihhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIGFNYXNrOiBudW1iZXIsIGJNYXNrOiBudW1iZXIpOiBudW1iZXJbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIE1hdGNoLmludGVyc2VjdCh0aGlzLl9tZXRhLl9ydWxlcywgYSwgYiwgYU1hc2ssIGJNYXNrKTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBfaW5pdE1hdGNoKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBrZXlNYXNrOiBudW1iZXIgPSBzaGlmdExlZnQoMSwgdGhpcy5fa2V5RGF0YS5faWQpO1xuXG4gICAgICAgIC8vIGdldCB2ZWMgZm9yIHRoaXMga2V5L3ZhbHVlIC0tIGlmIHZhbHVlIGlzIGxpc3QsIGNvbXB1dGUgdGhlIHVuaW9uXG4gICAgICAgIGxldCBuZXdBcnI6IG51bWJlcltdO1xuICAgICAgICBpZiAoaXNBcnJheSh0aGlzLl92YWx1ZSkpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgdiBvZiB0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBhOiBudW1iZXJbXSA9IHRoaXMuX2tleURhdGEubG9va3VwKHRoaXMuX21ldGEsIHYpO1xuICAgICAgICAgICAgICAgIG5ld0FyciA9IE1hdGNoLnVuaW9uKGEsIG5ld0Fycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdBcnIgPSB0aGlzLl9rZXlEYXRhLmxvb2t1cCh0aGlzLl9tZXRhLCB0aGlzLl92YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJldk1hdGNoZXM6IG51bWJlcltdID0gKGlzQmxhbmsodGhpcy5fcHJldk1hdGNoKSkgPyBudWxsIDogdGhpcy5fcHJldk1hdGNoLm1hdGNoZXMoKTtcblxuICAgICAgICB0aGlzLl9rZXlzTWF0Y2hlZE1hc2sgPSAoaXNCbGFuayhcbiAgICAgICAgICAgIHRoaXMuX3ByZXZNYXRjaCkpID8ga2V5TWFzayA6IChrZXlNYXNrIHwgdGhpcy5fcHJldk1hdGNoLl9rZXlzTWF0Y2hlZE1hc2spO1xuICAgICAgICBpZiAoaXNCbGFuayhwcmV2TWF0Y2hlcykpIHtcbiAgICAgICAgICAgIHRoaXMuX21hdGNoZXMgPSBuZXdBcnI7XG4gICAgICAgICAgICAvLyBUb2RvOiBub3QgY2xlYXIgd2h5IHRoaXMgaXMgbmVlZGVkLCBidXQgd2l0aG91dCBpdCB3ZSBlbmQgdXAgZmFpbGluZyB0byBmaWx0ZXJcbiAgICAgICAgICAgIC8vIGNlcnRhaW4gbWF0Y2hlcyB0aGF0IHNob3VsZCBiZSBmaWx0ZXJlZCAocmVzdWx0aW5nIGluIGJhZCBtYXRjaGVzKVxuICAgICAgICAgICAgaWYgKCFNZXRhLl9Vc2VQYXJ0aWFsSW5kZXhpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzTWF0Y2hlZE1hc2sgPSBrZXlNYXNrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayhuZXdBcnIpKSB7XG4gICAgICAgICAgICAgICAgbmV3QXJyID0gTWF0Y2guRW1wdHlNYXRjaEFycmF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSm9pblxuICAgICAgICAgICAgdGhpcy5fbWF0Y2hlcyA9IHRoaXMuam9pbihuZXdBcnIsIHByZXZNYXRjaGVzLCBrZXlNYXNrLFxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZNYXRjaC5fa2V5c01hdGNoZWRNYXNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbXB1dGUgcGF0aCBDUkNcbiAgICAgICAgdGhpcy5fbWF0Y2hQYXRoQ1JDID0gLTE7XG4gICAgICAgIGZvciAobGV0IG1yOiBNYXRjaFJlc3VsdCA9IHRoaXM7IG1yICE9IG51bGw7IG1yID0gbXIuX3ByZXZNYXRjaCkge1xuICAgICAgICAgICAgdGhpcy5fbWF0Y2hQYXRoQ1JDID0gY3JjMzIodGhpcy5fbWF0Y2hQYXRoQ1JDLCBtci5fa2V5RGF0YS5fa2V5Lmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQobXIuX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGlzQXJyYXkobXIuX3ZhbHVlKSA/IG1yLl92YWx1ZS5qb2luKCcsJykgOiBtci5fdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0Y2hQYXRoQ1JDID0gY3JjMzIodGhpcy5fbWF0Y2hQYXRoQ1JDLCBoYXNoQ29kZSh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tYXRjaFBhdGhDUkMgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21hdGNoUGF0aENSQyA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWV0YUdlbmVyYXRpb24gPSB0aGlzLl9tZXRhLnJ1bGVTZXRHZW5lcmF0aW9uO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gbnVsbDtcbiAgICB9XG5cblxuICAgIF9sb2dNYXRjaERpZmYoYTogbnVtYmVyW10sIGI6IG51bWJlcltdKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGlBID0gMSwgc2l6ZUEgPSBhWzBdLCBpQiA9IDEsIHNpemVCID0gYlswXTtcblxuICAgICAgICB3aGlsZSAoaUEgPD0gc2l6ZUEgfHwgaUIgPD0gc2l6ZUIpIHtcbiAgICAgICAgICAgIGxldCBjID0gKGlBID4gc2l6ZUEgPyAxIDogKGlCID4gc2l6ZUIgPyAtMSA6IChhW2lBXSAtIGJbaUJdKSkpO1xuICAgICAgICAgICAgaWYgKGMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpQSsrO1xuICAgICAgICAgICAgICAgIGlCKys7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMgPCAwKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgQSBub3QgaW4gQiwgYnV0IEEgZG9lc24ndCBmaWx0ZXIgb24gQidzIG1hc2ssIHRoZW4gYWRkIGl0XG4gICAgICAgICAgICAgICAgcHJpbnQoJyAgLS0gT25seSBpbiBBOiAnICsgdGhpcy5fbWV0YS5fcnVsZXNbYVtpQV1dKTtcbiAgICAgICAgICAgICAgICBpQSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmludCgnICAtLSBPbmx5IGluIEI6ICcgKyB0aGlzLl9tZXRhLl9ydWxlc1tiW2lCXV0pO1xuICAgICAgICAgICAgICAgIGlCKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9wZXJ0aWVzKCk6IFByb3BlcnR5TWFwXG4gICAge1xuICAgICAgICB0aGlzLl9pbnZhbGlkYXRlSWZTdGFsZSgpO1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9wcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgdGhpcy5fcHJvcGVydGllcyA9IHRoaXMuX21ldGEucHJvcGVydGllc0Zvck1hdGNoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIGRlYnVnU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcblxuICAgICAgICBsZXQgc2ogPSBuZXcgU3RyaW5nSm9pbmVyKFsnTWF0Y2ggUmVzdWx0IHBhdGg6IFxcbiddKTtcbiAgICAgICAgdGhpcy5fYXBwZW5kUHJldlBhdGgoc2opO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fb3ZlclVuaW9uTWF0Y2gpKSB7XG4gICAgICAgICAgICBzai5hZGQoJ1xcbk92ZXJyaWRlcyBwYXRoOiAnKTtcbiAgICAgICAgICAgIHRoaXMuX292ZXJVbmlvbk1hdGNoLl9hcHBlbmRQcmV2UGF0aChzaik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNqLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgX2FwcGVuZFByZXZQYXRoKGJ1ZjogU3RyaW5nSm9pbmVyKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wcmV2TWF0Y2gpKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2TWF0Y2guX2FwcGVuZFByZXZQYXRoKGJ1Zik7XG4gICAgICAgICAgICBidWYuYWRkKCcgLT4gJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnVmLmFkZCh0aGlzLl9rZXlEYXRhLl9rZXkpO1xuICAgICAgICBidWYuYWRkKCc9Jyk7XG4gICAgICAgIGJ1Zi5hZGQodGhpcy5fdmFsdWUpO1xuICAgIH1cblxuICAgIF9jaGVja01hdGNoKHZhbHVlczogTWFwPHN0cmluZywgYW55PiwgbWV0YTogTWV0YSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhcnI6IG51bWJlcltdID0gdGhpcy5maWx0ZXJSZXN1bHQoKTtcbiAgICAgICAgaWYgKGlzQmxhbmsoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZpcnN0IGVudHJ5IGlzIGNvdW50XG4gICAgICAgIGxldCBjb3VudDogbnVtYmVyID0gYXJyWzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCByID0gdGhpcy5fbWV0YS5fcnVsZXNbYXJyW2kgKyAxXV07XG4gICAgICAgICAgICByLl9jaGVja1J1bGUodmFsdWVzLCBtZXRhKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBlcXVhbHNUbyhvOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gKG8gaW5zdGFuY2VvZiBNYXRjaFJlc3VsdCkgJiYgc3VwZXIuZXF1YWxzVG8oXG4gICAgICAgICAgICAgICAgbykgJiYgKG8uX21ldGFHZW5lcmF0aW9uID09PSB0aGlzLl9tZXRhR2VuZXJhdGlvbikgJiZcbiAgICAgICAgICAgIG8uX3Byb3BlcnRpZXMuc2l6ZSA9PT0gdGhpcy5fcHJvcGVydGllcy5zaXplO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVuaW9uTWF0Y2hSZXN1bHQgZXh0ZW5kcyBNYXRjaFJlc3VsdFxue1xuXG4gICAgY29uc3RydWN0b3IobWV0YTogTWV0YSwga2V5RGF0YTogS2V5RGF0YSwgdmFsdWU6IGFueSwgcHJldk1hdGNoOiBNYXRjaFJlc3VsdClcbiAgICB7XG4gICAgICAgIHN1cGVyKG1ldGEsIGtleURhdGEsIHZhbHVlLCBwcmV2TWF0Y2gpO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIGpvaW4oYTogbnVtYmVyW10sIGI6IG51bWJlcltdLCBhTWFzazogbnVtYmVyLCBiTWFzazogbnVtYmVyKTogbnVtYmVyW11cbiAgICB7XG4gICAgICAgIHJldHVybiBNYXRjaC51bmlvbihhLCBiKTtcblxuICAgIH1cbn1cblxuIl19