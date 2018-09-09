/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BooleanWrapper, isArray, isBlank, isPresent, ListWrapper, MapWrapper, print, shiftLeft, StringJoiner } from '@aribaui/core';
import { Meta, PropertyMap } from './meta';
/**
 * A Selector defines a sort of key/value predicate that must be satisfied for a
 * rule to apply.
 */
var /**
 * A Selector defines a sort of key/value predicate that must be satisfied for a
 * rule to apply.
 */
Selector = /** @class */ (function () {
    function Selector(_key, _value, isDecl) {
        if (isDecl === void 0) { isDecl = false; }
        this._key = _key;
        this._value = _value;
        this.isDecl = isDecl;
        this._matchArrayIdx = 0;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    Selector.fromMap = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        /** @type {?} */
        var result = new Array();
        MapWrapper.iterable(values).forEach(function (value, key) {
            result.push(new Selector(key, value, false));
        });
        return result;
    };
    Object.defineProperty(Selector.prototype, "key", {
        get: /**
         * @return {?}
         */
        function () {
            return this._key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selector.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} keyData
     * @return {?}
     */
    Selector.prototype.bindToKeyData = /**
     * @param {?} keyData
     * @return {?}
     */
    function (keyData) {
        this._matchArrayIdx = keyData._id;
        this._matchValue = keyData.matchValue(this._value);
    };
    /**
     * @param {?} matchArray
     * @return {?}
     */
    Selector.prototype.matches = /**
     * @param {?} matchArray
     * @return {?}
     */
    function (matchArray) {
        // If we haven't been initialized with a matchValue, then we were indexed and don't need to
        // match
        if (isBlank(this._matchValue)) {
            return true;
        }
        /** @type {?} */
        var other = matchArray[this._matchArrayIdx];
        return isPresent(other) ? other.matches(this._matchValue) : false;
    };
    /**
     * @return {?}
     */
    Selector.prototype.toString = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sj = new StringJoiner([]);
        sj.add(this.key);
        sj.add('=');
        sj.add(this._value.toString());
        sj.add('(');
        sj.add(this.isDecl + '');
        sj.add(')');
        sj.add('[ ');
        sj.add(this._matchArrayIdx + ']');
        return sj.toString();
    };
    return Selector;
}());
/**
 * A Selector defines a sort of key/value predicate that must be satisfied for a
 * rule to apply.
 */
export { Selector };
if (false) {
    /** @type {?} */
    Selector.prototype._matchArrayIdx;
    /** @type {?} */
    Selector.prototype._matchValue;
    /** @type {?} */
    Selector.prototype._key;
    /** @type {?} */
    Selector.prototype._value;
    /** @type {?} */
    Selector.prototype.isDecl;
}
/**
 * A Rule defines a map of properties that should apply in the event that a set of Selectors
 * are matched.  Given a rule base (Meta) and a set of asserted values (Context) a list of matching
 * rules can be computed (by matching their selectors against the values) and by successively (in
 * rank / priority order) applying (merging) their property maps a set of effective properties can
 * be computed.
 *
 */
var /**
 * A Rule defines a map of properties that should apply in the event that a set of Selectors
 * are matched.  Given a rule base (Meta) and a set of asserted values (Context) a list of matching
 * rules can be computed (by matching their selectors against the values) and by successively (in
 * rank / priority order) applying (merging) their property maps a set of effective properties can
 * be computed.
 *
 */
Rule = /** @class */ (function () {
    function Rule(_selectors, _properties, _rank, _lineNumber) {
        if (_rank === void 0) { _rank = -1; }
        if (_lineNumber === void 0) { _lineNumber = -1; }
        this._selectors = _selectors;
        this._properties = _properties;
        this._rank = _rank;
        this._lineNumber = _lineNumber;
        this.keyMatchesMask = 0;
        this.keyIndexedMask = 0;
        this.keyAntiMask = 0;
    }
    /**
     * @param {?} meta
     * @param {?} src
     * @param {?} dest
     * @param {?} declareKey
     * @return {?}
     */
    Rule.merge = /**
     * @param {?} meta
     * @param {?} src
     * @param {?} dest
     * @param {?} declareKey
     * @return {?}
     */
    function (meta, src, dest, declareKey) {
        /** @type {?} */
        var updatedMask = 0;
        MapWrapper.iterable(src).forEach(function (value, key) {
            /** @type {?} */
            var propManager = meta.managerForProperty(key);
            /** @type {?} */
            var orig = dest.get(key);
            /** @type {?} */
            var isDeclare = (isPresent(declareKey) && key === declareKey);
            /** @type {?} */
            var newVal = propManager.mergeProperty(key, orig, value, isDeclare);
            if (newVal !== orig) {
                dest.set(key, newVal);
                /** @type {?} */
                var keyData = propManager._keyDataToSet;
                if (isPresent(keyData)) {
                    /** @type {?} */
                    var keymask = shiftLeft(1, keyData._id);
                    if ((keymask & updatedMask) === 0 &&
                        (dest instanceof PropertyMap)) {
                        updatedMask |= keymask;
                        (/** @type {?} */ (dest)).addContextKey(propManager);
                    }
                }
            }
        });
        return updatedMask;
    };
    /**
     * @param {?} matchArray
     * @return {?}
     */
    Rule.prototype.matches = /**
     * @param {?} matchArray
     * @return {?}
     */
    function (matchArray) {
        try {
            for (var _a = tslib_1.__values(this._selectors), _b = _a.next(); !_b.done; _b = _a.next()) {
                var sel = _b.value;
                if (!sel.matches(matchArray)) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
        var e_1, _c;
    };
    /**
     * returns context keys modified
     */
    /**
     * returns context keys modified
     * @param {?} meta
     * @param {?} properties
     * @param {?} declareKey
     * @return {?}
     */
    Rule.prototype.apply = /**
     * returns context keys modified
     * @param {?} meta
     * @param {?} properties
     * @param {?} declareKey
     * @return {?}
     */
    function (meta, properties, declareKey) {
        if (this._rank === Number.MIN_VALUE) {
            return 0;
        }
        return Rule.merge(meta, this._properties, properties, declareKey);
    };
    /**
     * @return {?}
     */
    Rule.prototype.disable = /**
     * @return {?}
     */
    function () {
        this._rank = Number.MIN_VALUE;
    };
    /**
     * @return {?}
     */
    Rule.prototype.disabled = /**
     * @return {?}
     */
    function () {
        return this._rank === Number.MIN_VALUE;
    };
    Object.defineProperty(Rule.prototype, "lineNumber", {
        get: /**
         * @return {?}
         */
        function () {
            return this._lineNumber;
        },
        set: /**
         * @param {?} lineNumber
         * @return {?}
         */
        function (lineNumber) {
            this._lineNumber = lineNumber;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Rule.prototype.location = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var path = isPresent(this._ruleSet) ? this._ruleSet.filePath : 'Unknow';
        return (this._lineNumber >= 0) ? (new StringJoiner([
            path, ':', this._lineNumber + ''
        ])).toString() : path;
    };
    Object.defineProperty(Rule.prototype, "selectors", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectors;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selectors = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rule.prototype, "properties", {
        get: /**
         * @return {?}
         */
        function () {
            return this._properties;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._properties = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rule.prototype, "rank", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rank;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._rank = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rule.prototype, "ruleSet", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ruleSet;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._ruleSet = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rule.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Rule.prototype.isEditable = /**
     * @return {?}
     */
    function () {
        return (this._ruleSet !== null) && (this._ruleSet.editableStart > 0) &&
            (this._id >= this._ruleSet.editableStart);
    };
    /**
     * @return {?}
     */
    Rule.prototype.createDecl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectors = this._selectors;
        /** @type {?} */
        var declPred = selectors[selectors.length - 1];
        /** @type {?} */
        var prePreds = this.convertKeyOverrides(selectors.slice(0, selectors.length - 1));
        if (isBlank(this._properties)) {
            this._properties = new Map();
        }
        try {
            for (var selectors_1 = tslib_1.__values(selectors), selectors_1_1 = selectors_1.next(); !selectors_1_1.done; selectors_1_1 = selectors_1.next()) {
                var p = selectors_1_1.value;
                if (!(isArray(p.value))) {
                    this._properties.set(p.key, p.value);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (selectors_1_1 && !selectors_1_1.done && (_a = selectors_1.return)) _a.call(selectors_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // Flag the declaring rule as a property
        this._properties.set(Meta.DeclRule, new RuleWrapper(this));
        /** @type {?} */
        var hasOverrideScope = false;
        try {
            for (var prePreds_1 = tslib_1.__values(prePreds), prePreds_1_1 = prePreds_1.next(); !prePreds_1_1.done; prePreds_1_1 = prePreds_1.next()) {
                var p = prePreds_1_1.value;
                if (p.key === declPred.key) {
                    hasOverrideScope = true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (prePreds_1_1 && !prePreds_1_1.done && (_b = prePreds_1.return)) _b.call(prePreds_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // if decl key isn't scoped, then select on no scope
        if (!hasOverrideScope) {
            /** @type {?} */
            var overrideKey = Meta.overrideKeyForKey(declPred.key);
            prePreds.unshift(new Selector(overrideKey, Meta.NullMarker));
        }
        // The decl rule...
        prePreds.push(new Selector(Meta.KeyDeclare, declPred.key));
        /** @type {?} */
        var m = new Map();
        m.set(declPred.key, declPred.value);
        return new Rule(prePreds, m, 0, -1);
        var e_2, _a, e_3, _b;
    };
    /**
     *  rewrite any selector of the form "layout=L1, class=c, layout=L2" to
     *  "layout_o=L1 class=c, layout=L2"
     */
    /**
     *  rewrite any selector of the form "layout=L1, class=c, layout=L2" to
     *  "layout_o=L1 class=c, layout=L2"
     * @param {?} orig
     * @return {?}
     */
    Rule.prototype.convertKeyOverrides = /**
     *  rewrite any selector of the form "layout=L1, class=c, layout=L2" to
     *  "layout_o=L1 class=c, layout=L2"
     * @param {?} orig
     * @return {?}
     */
    function (orig) {
        /** @type {?} */
        var result = orig;
        /** @type {?} */
        var count = orig.length;
        for (var i = 0; i < count; i++) {
            /** @type {?} */
            var p = orig[i];
            // See if overridded by same key later in selector
            for (var j = i + 1; j < count; j++) {
                /** @type {?} */
                var pNext = orig[j];
                if (pNext.key === p.key) {
                    // if we're overridden, we drop ours, and replace the next collision
                    // with one with our prefix
                    // make a copy if we haven't already
                    if (result === orig) {
                        result = orig.slice(0, i);
                    }
                    p = new Selector(Meta.overrideKeyForKey(p.key), p.value);
                    break;
                }
            }
            if (result !== orig) {
                result.push(p);
            }
        }
        return result;
    };
    /**
     * @return {?}
     */
    Rule.prototype.toString = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sj = new StringJoiner(['<Rule [']);
        sj.add(this._rank + '] ');
        if (isBlank(this.selectors)) {
            sj.add('null, null --> null >');
        }
        else {
            sj.add(ListWrapper.toString(this._selectors));
            sj.add(' -> ');
            if (!this._properties) {
                sj.add('[,]' + ' >');
            }
            else {
                if (this._properties.has('declRule')) {
                }
                sj.add(MapWrapper.toString(this._properties) + ' >');
            }
            sj.add('[ ');
            sj.add(this.keyIndexedMask + ', ');
            sj.add(this.keyAntiMask + ', ');
            sj.add(this.keyMatchesMask + '');
            sj.add(' ]');
        }
        return sj.toString();
    };
    /**
     * @param {?} values
     * @param {?} meta
     * @return {?}
     */
    Rule.prototype._checkRule = /**
     * @param {?} values
     * @param {?} meta
     * @return {?}
     */
    function (values, meta) {
        var _this = this;
        ListWrapper.forEachWithIndex(this.selectors, function (p, i) {
            /** @type {?} */
            var contextValue = values.get(p.key);
            /** @type {?} */
            var keyData = meta.keyData(p.key);
            if (isPresent(keyData._transformer)) {
                contextValue = keyData._transformer.tranformForMatch(contextValue);
            }
            if (isPresent(contextValue) &&
                ((Meta.KeyAny === p.value && BooleanWrapper.boleanValue(contextValue) ||
                    Meta.objectEquals(contextValue, p.value) ||
                    (isArray(p.value) && p.value.indexOf(contextValue) > -1) ||
                    (isArray(p.value) && contextValue.indexOf(p.value) > -1)))) {
                // okay
            }
            else {
                print('Possible bad rule match!  Rule: %s; selector: %s, context val: %s' + _this +
                    ' ' + p + ' ' + contextValue);
            }
        });
    };
    return Rule;
}());
/**
 * A Rule defines a map of properties that should apply in the event that a set of Selectors
 * are matched.  Given a rule base (Meta) and a set of asserted values (Context) a list of matching
 * rules can be computed (by matching their selectors against the values) and by successively (in
 * rank / priority order) applying (merging) their property maps a set of effective properties can
 * be computed.
 *
 */
export { Rule };
if (false) {
    /** @type {?} */
    Rule.prototype._id;
    /** @type {?} */
    Rule.prototype._ruleSet;
    /** @type {?} */
    Rule.prototype.keyMatchesMask;
    /** @type {?} */
    Rule.prototype.keyIndexedMask;
    /** @type {?} */
    Rule.prototype.keyAntiMask;
    /** @type {?} */
    Rule.prototype._selectors;
    /** @type {?} */
    Rule.prototype._properties;
    /** @type {?} */
    Rule.prototype._rank;
    /** @type {?} */
    Rule.prototype._lineNumber;
}
var RuleWrapper = /** @class */ (function () {
    function RuleWrapper(rule) {
        this.rule = rule;
    }
    return RuleWrapper;
}());
export { RuleWrapper };
if (false) {
    /** @type {?} */
    RuleWrapper.prototype.rule;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvcnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW1CQSxPQUFPLEVBQ0gsY0FBYyxFQUNkLE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxFQUNULFdBQVcsRUFDWCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFzQixJQUFJLEVBQW1CLFdBQVcsRUFBVSxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFPeEY7Ozs7QUFBQTtJQWtCSSxrQkFBb0IsSUFBWSxFQUFVLE1BQVcsRUFBUyxNQUF1QjsrQ0FBQTtRQUFqRSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWlCOzhCQWZwRCxDQUFDO0tBaUJqQzs7Ozs7SUFiTSxnQkFBTzs7OztJQUFkLFVBQWUsTUFBeUI7O1FBRXBDLElBQU0sTUFBTSxHQUFHLElBQUksS0FBSyxFQUFZLENBQUM7UUFDckMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztZQUUzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNoRCxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCO0lBUUQsc0JBQUkseUJBQUc7Ozs7UUFBUDtZQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCOzs7T0FBQTtJQUVELHNCQUFJLDJCQUFLOzs7O1FBQVQ7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0Qjs7O09BQUE7Ozs7O0lBRUQsZ0NBQWE7Ozs7SUFBYixV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QUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDeEMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzthQUVqRTtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUssQ0FBQyxtRUFBbUUsR0FBRyxLQUFJO29CQUM1RSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQzthQUNyQztTQUNKLENBQUMsQ0FBQztLQUNOO2VBL1pMO0lBa2FDLENBQUE7Ozs7Ozs7OztBQTNTRCxnQkEyU0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdELElBQUE7SUFJSSxxQkFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07S0FFNUI7c0JBM2FMO0lBNGFDLENBQUE7QUFQRCx1QkFPQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBCb29sZWFuV3JhcHBlcixcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNQcmVzZW50LFxuICAgIExpc3RXcmFwcGVyLFxuICAgIE1hcFdyYXBwZXIsXG4gICAgcHJpbnQsXG4gICAgc2hpZnRMZWZ0LFxuICAgIFN0cmluZ0pvaW5lclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7S2V5RGF0YSwgTWF0Y2hWYWx1ZSwgTWV0YSwgUHJvcGVydHlNYW5hZ2VyLCBQcm9wZXJ0eU1hcCwgUnVsZVNldH0gZnJvbSAnLi9tZXRhJztcblxuXG4vKipcbiAqIEEgU2VsZWN0b3IgZGVmaW5lcyBhIHNvcnQgb2Yga2V5L3ZhbHVlIHByZWRpY2F0ZSB0aGF0IG11c3QgYmUgc2F0aXNmaWVkIGZvciBhXG4gKiBydWxlIHRvIGFwcGx5LlxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0b3JcbntcblxuICAgIHByaXZhdGUgX21hdGNoQXJyYXlJZHg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWF0Y2hWYWx1ZTogTWF0Y2hWYWx1ZTtcblxuXG4gICAgc3RhdGljIGZyb21NYXAodmFsdWVzOiBNYXAgPHN0cmluZywgYW55Pik6IEFycmF5PFNlbGVjdG9yPlxuICAgIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PFNlbGVjdG9yPigpO1xuICAgICAgICBNYXBXcmFwcGVyLml0ZXJhYmxlKHZhbHVlcykuZm9yRWFjaCgodmFsdWUsIGtleSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFNlbGVjdG9yKGtleSwgdmFsdWUsIGZhbHNlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfa2V5OiBzdHJpbmcsIHByaXZhdGUgX3ZhbHVlOiBhbnksIHB1YmxpYyBpc0RlY2w6IGJvb2xlYW4gPSBmYWxzZSlcbiAgICB7XG4gICAgfVxuXG5cbiAgICBnZXQga2V5KCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgYmluZFRvS2V5RGF0YShrZXlEYXRhOiBLZXlEYXRhKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5fbWF0Y2hBcnJheUlkeCA9IGtleURhdGEuX2lkO1xuICAgICAgICB0aGlzLl9tYXRjaFZhbHVlID0ga2V5RGF0YS5tYXRjaFZhbHVlKHRoaXMuX3ZhbHVlKTtcblxuICAgIH1cblxuICAgIG1hdGNoZXMobWF0Y2hBcnJheTogQXJyYXk8TWF0Y2hWYWx1ZT4pOiBib29sZWFuXG4gICAge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlbid0IGJlZW4gaW5pdGlhbGl6ZWQgd2l0aCBhIG1hdGNoVmFsdWUsIHRoZW4gd2Ugd2VyZSBpbmRleGVkIGFuZCBkb24ndCBuZWVkIHRvXG4gICAgICAgIC8vIG1hdGNoXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX21hdGNoVmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY29uc3Qgb3RoZXI6IE1hdGNoVmFsdWUgPSBtYXRjaEFycmF5W3RoaXMuX21hdGNoQXJyYXlJZHhdO1xuXG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQob3RoZXIpID8gb3RoZXIubWF0Y2hlcyh0aGlzLl9tYXRjaFZhbHVlKSA6IGZhbHNlO1xuICAgIH1cblxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBjb25zdCBzaiA9IG5ldyBTdHJpbmdKb2luZXIoW10pO1xuXG4gICAgICAgIHNqLmFkZCh0aGlzLmtleSk7XG4gICAgICAgIHNqLmFkZCgnPScpO1xuICAgICAgICBzai5hZGQodGhpcy5fdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIHNqLmFkZCgnKCcpO1xuICAgICAgICBzai5hZGQodGhpcy5pc0RlY2wgKyAnJyk7XG4gICAgICAgIHNqLmFkZCgnKScpO1xuICAgICAgICBzai5hZGQoJ1sgJyk7XG4gICAgICAgIHNqLmFkZCh0aGlzLl9tYXRjaEFycmF5SWR4ICsgJ10nKTtcblxuICAgICAgICByZXR1cm4gc2oudG9TdHJpbmcoKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIFJ1bGUgZGVmaW5lcyBhIG1hcCBvZiBwcm9wZXJ0aWVzIHRoYXQgc2hvdWxkIGFwcGx5IGluIHRoZSBldmVudCB0aGF0IGEgc2V0IG9mIFNlbGVjdG9yc1xuICogYXJlIG1hdGNoZWQuICBHaXZlbiBhIHJ1bGUgYmFzZSAoTWV0YSkgYW5kIGEgc2V0IG9mIGFzc2VydGVkIHZhbHVlcyAoQ29udGV4dCkgYSBsaXN0IG9mIG1hdGNoaW5nXG4gKiBydWxlcyBjYW4gYmUgY29tcHV0ZWQgKGJ5IG1hdGNoaW5nIHRoZWlyIHNlbGVjdG9ycyBhZ2FpbnN0IHRoZSB2YWx1ZXMpIGFuZCBieSBzdWNjZXNzaXZlbHkgKGluXG4gKiByYW5rIC8gcHJpb3JpdHkgb3JkZXIpIGFwcGx5aW5nIChtZXJnaW5nKSB0aGVpciBwcm9wZXJ0eSBtYXBzIGEgc2V0IG9mIGVmZmVjdGl2ZSBwcm9wZXJ0aWVzIGNhblxuICogYmUgY29tcHV0ZWQuXG4gKlxuICovXG5cbmV4cG9ydCBjbGFzcyBSdWxlXG57XG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9ydWxlU2V0OiBSdWxlU2V0O1xuXG4gICAga2V5TWF0Y2hlc01hc2s6IG51bWJlciA9IDA7XG4gICAga2V5SW5kZXhlZE1hc2s6IG51bWJlciA9IDA7XG4gICAga2V5QW50aU1hc2s6IG51bWJlciA9IDA7XG5cbiAgICBzdGF0aWMgIG1lcmdlKG1ldGE6IE1ldGEsIHNyYzogTWFwPHN0cmluZywgYW55PiwgZGVzdDogTWFwPHN0cmluZywgYW55PixcbiAgICAgICAgICAgICAgICAgIGRlY2xhcmVLZXk6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRNYXNrID0gMDtcblxuICAgICAgICBNYXBXcmFwcGVyLml0ZXJhYmxlKHNyYykuZm9yRWFjaCgodmFsdWUsIGtleSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgcHJvcE1hbmFnZXI6IFByb3BlcnR5TWFuYWdlciA9IG1ldGEubWFuYWdlckZvclByb3BlcnR5KFxuICAgICAgICAgICAgICAgIGtleSk7XG4gICAgICAgICAgICBjb25zdCBvcmlnID0gZGVzdC5nZXQoa2V5KTtcbiAgICAgICAgICAgIGNvbnN0IGlzRGVjbGFyZTogYm9vbGVhbiA9IChpc1ByZXNlbnQoZGVjbGFyZUtleSkgJiYga2V5ID09PSBkZWNsYXJlS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbCA9IHByb3BNYW5hZ2VyLm1lcmdlUHJvcGVydHkoa2V5LCBvcmlnLCB2YWx1ZSwgaXNEZWNsYXJlKTtcblxuICAgICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gb3JpZykge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgbmV3VmFsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhOiBLZXlEYXRhID0gcHJvcE1hbmFnZXIuX2tleURhdGFUb1NldDtcblxuICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoa2V5RGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5bWFzazogbnVtYmVyID0gc2hpZnRMZWZ0KDEsIGtleURhdGEuX2lkKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKGtleW1hc2sgJiB1cGRhdGVkTWFzaykgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChkZXN0IGluc3RhbmNlb2YgUHJvcGVydHlNYXApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTWFzayB8PSBrZXltYXNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgKDxQcm9wZXJ0eU1hcD5kZXN0KS5hZGRDb250ZXh0S2V5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BNYW5hZ2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1cGRhdGVkTWFzaztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX3NlbGVjdG9yczogQXJyYXk8U2VsZWN0b3I+LCBwcml2YXRlIF9wcm9wZXJ0aWVzPzogTWFwPHN0cmluZywgYW55PixcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9yYW5rOiBudW1iZXIgPSAtMSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9saW5lTnVtYmVyOiBudW1iZXIgPSAtMSlcbiAgICB7XG5cbiAgICB9XG5cblxuICAgIG1hdGNoZXMobWF0Y2hBcnJheTogQXJyYXk8TWF0Y2hWYWx1ZT4pOiBib29sZWFuXG4gICAge1xuICAgICAgICBmb3IgKGxldCBzZWwgb2YgdGhpcy5fc2VsZWN0b3JzKSB7XG4gICAgICAgICAgICBpZiAoIXNlbC5tYXRjaGVzKG1hdGNoQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgY29udGV4dCBrZXlzIG1vZGlmaWVkXG4gICAgICovXG4gICAgYXBwbHkobWV0YTogTWV0YSwgcHJvcGVydGllczogUHJvcGVydHlNYXAsIGRlY2xhcmVLZXk6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX3JhbmsgPT09IE51bWJlci5NSU5fVkFMVUUpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSdWxlLm1lcmdlKG1ldGEsIHRoaXMuX3Byb3BlcnRpZXMsIHByb3BlcnRpZXMsIGRlY2xhcmVLZXkpO1xuICAgIH1cblxuICAgIGRpc2FibGUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5fcmFuayA9IE51bWJlci5NSU5fVkFMVUU7XG4gICAgfVxuXG4gICAgZGlzYWJsZWQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmsgPT09IE51bWJlci5NSU5fVkFMVUU7XG4gICAgfVxuXG4gICAgZ2V0IGxpbmVOdW1iZXIoKTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGluZU51bWJlcjtcbiAgICB9XG5cbiAgICBzZXQgbGluZU51bWJlcihsaW5lTnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbGluZU51bWJlciA9IGxpbmVOdW1iZXI7XG4gICAgfVxuXG5cbiAgICBsb2NhdGlvbigpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBwYXRoOiBzdHJpbmcgPSBpc1ByZXNlbnQodGhpcy5fcnVsZVNldCkgPyB0aGlzLl9ydWxlU2V0LmZpbGVQYXRoIDogJ1Vua25vdyc7XG4gICAgICAgIHJldHVybiAodGhpcy5fbGluZU51bWJlciA+PSAwICkgPyAobmV3IFN0cmluZ0pvaW5lcihbXG4gICAgICAgICAgICAgICAgcGF0aCwgJzonLCB0aGlzLl9saW5lTnVtYmVyICsgJydcbiAgICAgICAgICAgIF0pKS50b1N0cmluZygpIDogcGF0aDtcbiAgICB9XG5cblxuICAgIGdldCBzZWxlY3RvcnMoKTogQXJyYXk8U2VsZWN0b3I+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0b3JzO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RvcnModmFsdWU6IEFycmF5PFNlbGVjdG9yPilcbiAgICB7XG4gICAgICAgIHRoaXMuX3NlbGVjdG9ycyA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBwcm9wZXJ0aWVzKCk6IE1hcDxzdHJpbmcsIGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIHNldCBwcm9wZXJ0aWVzKHZhbHVlOiBNYXA8c3RyaW5nLCBhbnk+KVxuICAgIHtcbiAgICAgICAgdGhpcy5fcHJvcGVydGllcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCByYW5rKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jhbms7XG4gICAgfVxuXG5cbiAgICBzZXQgcmFuayh2YWx1ZTogbnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5fcmFuayA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBydWxlU2V0KCk6IFJ1bGVTZXRcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ydWxlU2V0O1xuICAgIH1cblxuXG4gICAgc2V0IHJ1bGVTZXQodmFsdWU6IFJ1bGVTZXQpXG4gICAge1xuICAgICAgICB0aGlzLl9ydWxlU2V0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGlkKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHNldCBpZCh2YWx1ZTogbnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpc0VkaXRhYmxlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAodGhpcy5fcnVsZVNldCAhPT0gbnVsbCkgJiYgKHRoaXMuX3J1bGVTZXQuZWRpdGFibGVTdGFydCA+IDApICYmXG4gICAgICAgICAgICAodGhpcy5faWQgPj0gdGhpcy5fcnVsZVNldC5lZGl0YWJsZVN0YXJ0KTtcbiAgICB9XG5cbiAgICBjcmVhdGVEZWNsKCk6IFJ1bGVcbiAgICB7XG4gICAgICAgIC8qXG4gICAgICAgICBAZmllbGQ9ZHlubyB7IHZhbHVlOiR7IHNvbWUgZXhwcn0gfSBiZWNvbWVzXG4gICAgICAgICBkZWNsYXJlIHsgZmllbGQ6ZHlubyB9XG4gICAgICAgICBmaWVsZD1keW5vIHsgZmllbGQ6ZHlubzsgdmFsdWU6JHsgc29tZSBleHByfSB9XG4gICAgICAgICAqL1xuICAgICAgICAvLyBhZGQgcnVsZSBmb3IgZGVjbGFyYXRpb25cblxuICAgICAgICBsZXQgc2VsZWN0b3JzOiBBcnJheTxTZWxlY3Rvcj4gPSB0aGlzLl9zZWxlY3RvcnM7XG4gICAgICAgIGxldCBkZWNsUHJlZDogU2VsZWN0b3IgPSBzZWxlY3RvcnNbc2VsZWN0b3JzLmxlbmd0aCAtIDFdO1xuICAgICAgICBsZXQgcHJlUHJlZHM6IEFycmF5PFNlbGVjdG9yPiA9IHRoaXMuY29udmVydEtleU92ZXJyaWRlcyhcbiAgICAgICAgICAgIHNlbGVjdG9ycy5zbGljZSgwLCBzZWxlY3RvcnMubGVuZ3RoIC0gMSkpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3Byb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBwIG9mIHNlbGVjdG9ycykge1xuICAgICAgICAgICAgaWYgKCEoaXNBcnJheShwLnZhbHVlKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzLnNldChwLmtleSwgcC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmxhZyB0aGUgZGVjbGFyaW5nIHJ1bGUgYXMgYSBwcm9wZXJ0eVxuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzLnNldChNZXRhLkRlY2xSdWxlLCBuZXcgUnVsZVdyYXBwZXIodGhpcykpO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciBvdmVycmlkZSBzY29wZVxuICAgICAgICBsZXQgaGFzT3ZlcnJpZGVTY29wZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBwIG9mIHByZVByZWRzKSB7XG4gICAgICAgICAgICBpZiAocC5rZXkgPT09IGRlY2xQcmVkLmtleSkge1xuICAgICAgICAgICAgICAgIGhhc092ZXJyaWRlU2NvcGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgZGVjbCBrZXkgaXNuJ3Qgc2NvcGVkLCB0aGVuIHNlbGVjdCBvbiBubyBzY29wZVxuICAgICAgICBpZiAoIWhhc092ZXJyaWRlU2NvcGUpIHtcbiAgICAgICAgICAgIGxldCBvdmVycmlkZUtleTogc3RyaW5nID0gTWV0YS5vdmVycmlkZUtleUZvcktleShkZWNsUHJlZC5rZXkpO1xuICAgICAgICAgICAgcHJlUHJlZHMudW5zaGlmdChuZXcgU2VsZWN0b3Iob3ZlcnJpZGVLZXksIE1ldGEuTnVsbE1hcmtlcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGRlY2wgcnVsZS4uLlxuICAgICAgICBwcmVQcmVkcy5wdXNoKG5ldyBTZWxlY3RvcihNZXRhLktleURlY2xhcmUsIGRlY2xQcmVkLmtleSkpO1xuXG4gICAgICAgIGxldCBtID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgbS5zZXQoZGVjbFByZWQua2V5LCBkZWNsUHJlZC52YWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUnVsZShwcmVQcmVkcywgbSwgMCwgLTEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICByZXdyaXRlIGFueSBzZWxlY3RvciBvZiB0aGUgZm9ybSBcImxheW91dD1MMSwgY2xhc3M9YywgbGF5b3V0PUwyXCIgdG9cbiAgICAgKiAgXCJsYXlvdXRfbz1MMSBjbGFzcz1jLCBsYXlvdXQ9TDJcIlxuICAgICAqL1xuXG4gICAgY29udmVydEtleU92ZXJyaWRlcyhvcmlnOiBBcnJheTxTZWxlY3Rvcj4pOiBBcnJheTxTZWxlY3Rvcj5cbiAgICB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IG9yaWc7XG4gICAgICAgIGxldCBjb3VudDogbnVtYmVyID0gb3JpZy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHA6IFNlbGVjdG9yID0gb3JpZ1tpXTtcbiAgICAgICAgICAgIC8vIFNlZSBpZiBvdmVycmlkZGVkIGJ5IHNhbWUga2V5IGxhdGVyIGluIHNlbGVjdG9yXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBjb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBOZXh0OiBTZWxlY3RvciA9IG9yaWdbal07XG5cbiAgICAgICAgICAgICAgICBpZiAocE5leHQua2V5ID09PSBwLmtleSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSdyZSBvdmVycmlkZGVuLCB3ZSBkcm9wIG91cnMsIGFuZCByZXBsYWNlIHRoZSBuZXh0IGNvbGxpc2lvblxuICAgICAgICAgICAgICAgICAgICAvLyB3aXRoIG9uZSB3aXRoIG91ciBwcmVmaXhcblxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIGEgY29weSBpZiB3ZSBoYXZlbid0IGFscmVhZHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gb3JpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gb3JpZy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwID0gbmV3IFNlbGVjdG9yKE1ldGEub3ZlcnJpZGVLZXlGb3JLZXkocC5rZXkpLCBwLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gb3JpZykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgc2ogPSBuZXcgU3RyaW5nSm9pbmVyKFsnPFJ1bGUgWyddKTtcbiAgICAgICAgc2ouYWRkKHRoaXMuX3JhbmsgKyAnXSAnKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnNlbGVjdG9ycykpIHtcbiAgICAgICAgICAgIHNqLmFkZCgnbnVsbCwgbnVsbCAtLT4gbnVsbCA+Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzai5hZGQoTGlzdFdyYXBwZXIudG9TdHJpbmc8U2VsZWN0b3I+KHRoaXMuX3NlbGVjdG9ycykpO1xuXG4gICAgICAgICAgICBzai5hZGQoJyAtPiAnKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgc2ouYWRkKCdbLF0nICsgJyA+Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcm9wZXJ0aWVzLmhhcygnZGVjbFJ1bGUnKSkge1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2ouYWRkKE1hcFdyYXBwZXIudG9TdHJpbmcodGhpcy5fcHJvcGVydGllcykgKyAnID4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2ouYWRkKCdbICcpO1xuICAgICAgICAgICAgc2ouYWRkKHRoaXMua2V5SW5kZXhlZE1hc2sgKyAnLCAnKTtcbiAgICAgICAgICAgIHNqLmFkZCh0aGlzLmtleUFudGlNYXNrICsgJywgJyk7XG4gICAgICAgICAgICBzai5hZGQodGhpcy5rZXlNYXRjaGVzTWFzayArICcnKTtcbiAgICAgICAgICAgIHNqLmFkZCgnIF0nKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gc2oudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBfY2hlY2tSdWxlKHZhbHVlczogTWFwPHN0cmluZywgYW55PiwgbWV0YTogTWV0YSk6IHZvaWRcbiAgICB7XG4gICAgICAgIExpc3RXcmFwcGVyLmZvckVhY2hXaXRoSW5kZXg8U2VsZWN0b3I+KHRoaXMuc2VsZWN0b3JzLCAocCwgaSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGNvbnRleHRWYWx1ZSA9IHZhbHVlcy5nZXQocC5rZXkpO1xuICAgICAgICAgICAgbGV0IGtleURhdGE6IEtleURhdGEgPSBtZXRhLmtleURhdGEocC5rZXkpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGtleURhdGEuX3RyYW5zZm9ybWVyKSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHRWYWx1ZSA9IGtleURhdGEuX3RyYW5zZm9ybWVyLnRyYW5mb3JtRm9yTWF0Y2goY29udGV4dFZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChjb250ZXh0VmFsdWUpICYmXG4gICAgICAgICAgICAgICAgKChNZXRhLktleUFueSA9PT0gcC52YWx1ZSAmJiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZShjb250ZXh0VmFsdWUpIHx8XG4gICAgICAgICAgICAgICAgTWV0YS5vYmplY3RFcXVhbHMoY29udGV4dFZhbHVlLCBwLnZhbHVlKSB8fFxuICAgICAgICAgICAgICAgIChpc0FycmF5KHAudmFsdWUpICYmIHAudmFsdWUuaW5kZXhPZihjb250ZXh0VmFsdWUpID4gLTEpIHx8XG4gICAgICAgICAgICAgICAgKGlzQXJyYXkocC52YWx1ZSkgJiYgY29udGV4dFZhbHVlLmluZGV4T2YocC52YWx1ZSkgPiAtMSApKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBva2F5XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByaW50KCdQb3NzaWJsZSBiYWQgcnVsZSBtYXRjaCEgIFJ1bGU6ICVzOyBzZWxlY3RvcjogJXMsIGNvbnRleHQgdmFsOiAlcycgKyB0aGlzICtcbiAgICAgICAgICAgICAgICAgICAgJyAnICsgcCArICcgJyArIGNvbnRleHRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG5cbi8vIGhlcmUgc28gbG9nZ2luZyBvZiBwcm9wZXJ0eSBtYXAgZG9lc24ndCBpbmZpbml0ZWx5IHJlY3Vyc2VcbmV4cG9ydCBjbGFzcyBSdWxlV3JhcHBlclxue1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcnVsZTogUnVsZSlcbiAgICB7XG4gICAgfVxufVxuXG5cblxuIl19