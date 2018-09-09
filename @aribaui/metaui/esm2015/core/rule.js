/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { BooleanWrapper, isArray, isBlank, isPresent, ListWrapper, MapWrapper, print, shiftLeft, StringJoiner } from '@aribaui/core';
import { Meta, PropertyMap } from './meta';
/**
 * A Selector defines a sort of key/value predicate that must be satisfied for a
 * rule to apply.
 */
export class Selector {
    /**
     * @param {?} _key
     * @param {?} _value
     * @param {?=} isDecl
     */
    constructor(_key, _value, isDecl = false) {
        this._key = _key;
        this._value = _value;
        this.isDecl = isDecl;
        this._matchArrayIdx = 0;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    static fromMap(values) {
        /** @type {?} */
        const result = new Array();
        MapWrapper.iterable(values).forEach((value, key) => {
            result.push(new Selector(key, value, false));
        });
        return result;
    }
    /**
     * @return {?}
     */
    get key() {
        return this._key;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} keyData
     * @return {?}
     */
    bindToKeyData(keyData) {
        this._matchArrayIdx = keyData._id;
        this._matchValue = keyData.matchValue(this._value);
    }
    /**
     * @param {?} matchArray
     * @return {?}
     */
    matches(matchArray) {
        // If we haven't been initialized with a matchValue, then we were indexed and don't need to
        // match
        if (isBlank(this._matchValue)) {
            return true;
        }
        /** @type {?} */
        const other = matchArray[this._matchArrayIdx];
        return isPresent(other) ? other.matches(this._matchValue) : false;
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
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
export class Rule {
    /**
     * @param {?} _selectors
     * @param {?=} _properties
     * @param {?=} _rank
     * @param {?=} _lineNumber
     */
    constructor(_selectors, _properties, _rank = -1, _lineNumber = -1) {
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
    static merge(meta, src, dest, declareKey) {
        /** @type {?} */
        let updatedMask = 0;
        MapWrapper.iterable(src).forEach((value, key) => {
            /** @type {?} */
            const propManager = meta.managerForProperty(key);
            /** @type {?} */
            const orig = dest.get(key);
            /** @type {?} */
            const isDeclare = (isPresent(declareKey) && key === declareKey);
            /** @type {?} */
            const newVal = propManager.mergeProperty(key, orig, value, isDeclare);
            if (newVal !== orig) {
                dest.set(key, newVal);
                /** @type {?} */
                const keyData = propManager._keyDataToSet;
                if (isPresent(keyData)) {
                    /** @type {?} */
                    const keymask = shiftLeft(1, keyData._id);
                    if ((keymask & updatedMask) === 0 &&
                        (dest instanceof PropertyMap)) {
                        updatedMask |= keymask;
                        (/** @type {?} */ (dest)).addContextKey(propManager);
                    }
                }
            }
        });
        return updatedMask;
    }
    /**
     * @param {?} matchArray
     * @return {?}
     */
    matches(matchArray) {
        for (let sel of this._selectors) {
            if (!sel.matches(matchArray)) {
                return false;
            }
        }
        return true;
    }
    /**
     * returns context keys modified
     * @param {?} meta
     * @param {?} properties
     * @param {?} declareKey
     * @return {?}
     */
    apply(meta, properties, declareKey) {
        if (this._rank === Number.MIN_VALUE) {
            return 0;
        }
        return Rule.merge(meta, this._properties, properties, declareKey);
    }
    /**
     * @return {?}
     */
    disable() {
        this._rank = Number.MIN_VALUE;
    }
    /**
     * @return {?}
     */
    disabled() {
        return this._rank === Number.MIN_VALUE;
    }
    /**
     * @return {?}
     */
    get lineNumber() {
        return this._lineNumber;
    }
    /**
     * @param {?} lineNumber
     * @return {?}
     */
    set lineNumber(lineNumber) {
        this._lineNumber = lineNumber;
    }
    /**
     * @return {?}
     */
    location() {
        /** @type {?} */
        let path = isPresent(this._ruleSet) ? this._ruleSet.filePath : 'Unknow';
        return (this._lineNumber >= 0) ? (new StringJoiner([
            path, ':', this._lineNumber + ''
        ])).toString() : path;
    }
    /**
     * @return {?}
     */
    get selectors() {
        return this._selectors;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectors(value) {
        this._selectors = value;
    }
    /**
     * @return {?}
     */
    get properties() {
        return this._properties;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set properties(value) {
        this._properties = value;
    }
    /**
     * @return {?}
     */
    get rank() {
        return this._rank;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set rank(value) {
        this._rank = value;
    }
    /**
     * @return {?}
     */
    get ruleSet() {
        return this._ruleSet;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set ruleSet(value) {
        this._ruleSet = value;
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) {
        this._id = value;
    }
    /**
     * @return {?}
     */
    isEditable() {
        return (this._ruleSet !== null) && (this._ruleSet.editableStart > 0) &&
            (this._id >= this._ruleSet.editableStart);
    }
    /**
     * @return {?}
     */
    createDecl() {
        /** @type {?} */
        let selectors = this._selectors;
        /** @type {?} */
        let declPred = selectors[selectors.length - 1];
        /** @type {?} */
        let prePreds = this.convertKeyOverrides(selectors.slice(0, selectors.length - 1));
        if (isBlank(this._properties)) {
            this._properties = new Map();
        }
        for (let p of selectors) {
            if (!(isArray(p.value))) {
                this._properties.set(p.key, p.value);
            }
        }
        // Flag the declaring rule as a property
        this._properties.set(Meta.DeclRule, new RuleWrapper(this));
        /** @type {?} */
        let hasOverrideScope = false;
        for (let p of prePreds) {
            if (p.key === declPred.key) {
                hasOverrideScope = true;
            }
        }
        // if decl key isn't scoped, then select on no scope
        if (!hasOverrideScope) {
            /** @type {?} */
            let overrideKey = Meta.overrideKeyForKey(declPred.key);
            prePreds.unshift(new Selector(overrideKey, Meta.NullMarker));
        }
        // The decl rule...
        prePreds.push(new Selector(Meta.KeyDeclare, declPred.key));
        /** @type {?} */
        let m = new Map();
        m.set(declPred.key, declPred.value);
        return new Rule(prePreds, m, 0, -1);
    }
    /**
     *  rewrite any selector of the form "layout=L1, class=c, layout=L2" to
     *  "layout_o=L1 class=c, layout=L2"
     * @param {?} orig
     * @return {?}
     */
    convertKeyOverrides(orig) {
        /** @type {?} */
        let result = orig;
        /** @type {?} */
        let count = orig.length;
        for (let i = 0; i < count; i++) {
            /** @type {?} */
            let p = orig[i];
            // See if overridded by same key later in selector
            for (let j = i + 1; j < count; j++) {
                /** @type {?} */
                let pNext = orig[j];
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
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        let sj = new StringJoiner(['<Rule [']);
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
    }
    /**
     * @param {?} values
     * @param {?} meta
     * @return {?}
     */
    _checkRule(values, meta) {
        ListWrapper.forEachWithIndex(this.selectors, (p, i) => {
            /** @type {?} */
            let contextValue = values.get(p.key);
            /** @type {?} */
            let keyData = meta.keyData(p.key);
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
                print('Possible bad rule match!  Rule: %s; selector: %s, context val: %s' + this +
                    ' ' + p + ' ' + contextValue);
            }
        });
    }
}
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
export class RuleWrapper {
    /**
     * @param {?} rule
     */
    constructor(rule) {
        this.rule = rule;
    }
}
if (false) {
    /** @type {?} */
    RuleWrapper.prototype.rule;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvcnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFDSCxjQUFjLEVBQ2QsT0FBTyxFQUNQLE9BQU8sRUFDUCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXNCLElBQUksRUFBbUIsV0FBVyxFQUFVLE1BQU0sUUFBUSxDQUFDOzs7OztBQU94RixNQUFNOzs7Ozs7SUFrQkYsWUFBb0IsSUFBWSxFQUFVLE1BQVcsRUFBUyxTQUFrQixLQUFLO1FBQWpFLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7OEJBZnBELENBQUM7S0FpQmpDOzs7OztJQWJELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBeUI7O1FBRXBDLE1BQU0sTUFBTSxHQUFHLElBQUksS0FBSyxFQUFZLENBQUM7UUFDckMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFFL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNqQjs7OztJQVFELElBQUksR0FBRztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ3BCOzs7O0lBRUQsSUFBSSxLQUFLO1FBRUwsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDdEI7Ozs7O0lBRUQsYUFBYSxDQUFDLE9BQWdCO1FBRTFCLElBQUksQ0FBQyxj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QUVELFFBQVE7UUFFSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQzFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBRVYsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDM0I7Ozs7O0lBRUQsSUFBSSxVQUFVLENBQUMsVUFBVTtRQUVyQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztLQUNqQzs7OztJQUdELFFBQVE7O1FBRUosSUFBSSxJQUFJLEdBQVcsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDO1lBQzVDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFO1NBQ25DLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDN0I7Ozs7SUFHRCxJQUFJLFNBQVM7UUFFVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUMxQjs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFzQjtRQUVoQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztLQUMzQjs7OztJQUVELElBQUksVUFBVTtRQUVWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQzNCOzs7OztJQUVELElBQUksVUFBVSxDQUFDLEtBQXVCO1FBRWxDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0tBQzVCOzs7O0lBRUQsSUFBSSxJQUFJO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDckI7Ozs7O0lBR0QsSUFBSSxJQUFJLENBQUMsS0FBYTtRQUVsQixJQUFJLENBQUMsS0FBSyxH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RTtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUssQ0FBQyxtRUFBbUUsR0FBRyxJQUFJO29CQUM1RSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQzthQUNyQztTQUNKLENBQUMsQ0FBQztLQUNOO0NBR0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdELE1BQU07Ozs7SUFJRixZQUFtQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtLQUU1QjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEJvb2xlYW5XcmFwcGVyLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc1ByZXNlbnQsXG4gICAgTGlzdFdyYXBwZXIsXG4gICAgTWFwV3JhcHBlcixcbiAgICBwcmludCxcbiAgICBzaGlmdExlZnQsXG4gICAgU3RyaW5nSm9pbmVyXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtLZXlEYXRhLCBNYXRjaFZhbHVlLCBNZXRhLCBQcm9wZXJ0eU1hbmFnZXIsIFByb3BlcnR5TWFwLCBSdWxlU2V0fSBmcm9tICcuL21ldGEnO1xuXG5cbi8qKlxuICogQSBTZWxlY3RvciBkZWZpbmVzIGEgc29ydCBvZiBrZXkvdmFsdWUgcHJlZGljYXRlIHRoYXQgbXVzdCBiZSBzYXRpc2ZpZWQgZm9yIGFcbiAqIHJ1bGUgdG8gYXBwbHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWxlY3Rvclxue1xuXG4gICAgcHJpdmF0ZSBfbWF0Y2hBcnJheUlkeDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9tYXRjaFZhbHVlOiBNYXRjaFZhbHVlO1xuXG5cbiAgICBzdGF0aWMgZnJvbU1hcCh2YWx1ZXM6IE1hcCA8c3RyaW5nLCBhbnk+KTogQXJyYXk8U2VsZWN0b3I+XG4gICAge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8U2VsZWN0b3I+KCk7XG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUodmFsdWVzKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgU2VsZWN0b3Ioa2V5LCB2YWx1ZSwgZmFsc2UpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9rZXk6IHN0cmluZywgcHJpdmF0ZSBfdmFsdWU6IGFueSwgcHVibGljIGlzRGVjbDogYm9vbGVhbiA9IGZhbHNlKVxuICAgIHtcbiAgICB9XG5cblxuICAgIGdldCBrZXkoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5O1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBiaW5kVG9LZXlEYXRhKGtleURhdGE6IEtleURhdGEpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLl9tYXRjaEFycmF5SWR4ID0ga2V5RGF0YS5faWQ7XG4gICAgICAgIHRoaXMuX21hdGNoVmFsdWUgPSBrZXlEYXRhLm1hdGNoVmFsdWUodGhpcy5fdmFsdWUpO1xuXG4gICAgfVxuXG4gICAgbWF0Y2hlcyhtYXRjaEFycmF5OiBBcnJheTxNYXRjaFZhbHVlPik6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIC8vIElmIHdlIGhhdmVuJ3QgYmVlbiBpbml0aWFsaXplZCB3aXRoIGEgbWF0Y2hWYWx1ZSwgdGhlbiB3ZSB3ZXJlIGluZGV4ZWQgYW5kIGRvbid0IG5lZWQgdG9cbiAgICAgICAgLy8gbWF0Y2hcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fbWF0Y2hWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb25zdCBvdGhlcjogTWF0Y2hWYWx1ZSA9IG1hdGNoQXJyYXlbdGhpcy5fbWF0Y2hBcnJheUlkeF07XG5cbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChvdGhlcikgPyBvdGhlci5tYXRjaGVzKHRoaXMuX21hdGNoVmFsdWUpIDogZmFsc2U7XG4gICAgfVxuXG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGNvbnN0IHNqID0gbmV3IFN0cmluZ0pvaW5lcihbXSk7XG5cbiAgICAgICAgc2ouYWRkKHRoaXMua2V5KTtcbiAgICAgICAgc2ouYWRkKCc9Jyk7XG4gICAgICAgIHNqLmFkZCh0aGlzLl92YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgc2ouYWRkKCcoJyk7XG4gICAgICAgIHNqLmFkZCh0aGlzLmlzRGVjbCArICcnKTtcbiAgICAgICAgc2ouYWRkKCcpJyk7XG4gICAgICAgIHNqLmFkZCgnWyAnKTtcbiAgICAgICAgc2ouYWRkKHRoaXMuX21hdGNoQXJyYXlJZHggKyAnXScpO1xuXG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgUnVsZSBkZWZpbmVzIGEgbWFwIG9mIHByb3BlcnRpZXMgdGhhdCBzaG91bGQgYXBwbHkgaW4gdGhlIGV2ZW50IHRoYXQgYSBzZXQgb2YgU2VsZWN0b3JzXG4gKiBhcmUgbWF0Y2hlZC4gIEdpdmVuIGEgcnVsZSBiYXNlIChNZXRhKSBhbmQgYSBzZXQgb2YgYXNzZXJ0ZWQgdmFsdWVzIChDb250ZXh0KSBhIGxpc3Qgb2YgbWF0Y2hpbmdcbiAqIHJ1bGVzIGNhbiBiZSBjb21wdXRlZCAoYnkgbWF0Y2hpbmcgdGhlaXIgc2VsZWN0b3JzIGFnYWluc3QgdGhlIHZhbHVlcykgYW5kIGJ5IHN1Y2Nlc3NpdmVseSAoaW5cbiAqIHJhbmsgLyBwcmlvcml0eSBvcmRlcikgYXBwbHlpbmcgKG1lcmdpbmcpIHRoZWlyIHByb3BlcnR5IG1hcHMgYSBzZXQgb2YgZWZmZWN0aXZlIHByb3BlcnRpZXMgY2FuXG4gKiBiZSBjb21wdXRlZC5cbiAqXG4gKi9cblxuZXhwb3J0IGNsYXNzIFJ1bGVcbntcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3J1bGVTZXQ6IFJ1bGVTZXQ7XG5cbiAgICBrZXlNYXRjaGVzTWFzazogbnVtYmVyID0gMDtcbiAgICBrZXlJbmRleGVkTWFzazogbnVtYmVyID0gMDtcbiAgICBrZXlBbnRpTWFzazogbnVtYmVyID0gMDtcblxuICAgIHN0YXRpYyAgbWVyZ2UobWV0YTogTWV0YSwgc3JjOiBNYXA8c3RyaW5nLCBhbnk+LCBkZXN0OiBNYXA8c3RyaW5nLCBhbnk+LFxuICAgICAgICAgICAgICAgICAgZGVjbGFyZUtleTogc3RyaW5nKTogbnVtYmVyXG4gICAge1xuICAgICAgICBsZXQgdXBkYXRlZE1hc2sgPSAwO1xuXG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUoc3JjKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBwcm9wTWFuYWdlcjogUHJvcGVydHlNYW5hZ2VyID0gbWV0YS5tYW5hZ2VyRm9yUHJvcGVydHkoXG4gICAgICAgICAgICAgICAga2V5KTtcbiAgICAgICAgICAgIGNvbnN0IG9yaWcgPSBkZXN0LmdldChrZXkpO1xuICAgICAgICAgICAgY29uc3QgaXNEZWNsYXJlOiBib29sZWFuID0gKGlzUHJlc2VudChkZWNsYXJlS2V5KSAmJiBrZXkgPT09IGRlY2xhcmVLZXkpO1xuICAgICAgICAgICAgY29uc3QgbmV3VmFsID0gcHJvcE1hbmFnZXIubWVyZ2VQcm9wZXJ0eShrZXksIG9yaWcsIHZhbHVlLCBpc0RlY2xhcmUpO1xuXG4gICAgICAgICAgICBpZiAobmV3VmFsICE9PSBvcmlnKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBuZXdWYWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGE6IEtleURhdGEgPSBwcm9wTWFuYWdlci5fa2V5RGF0YVRvU2V0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChrZXlEYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXltYXNrOiBudW1iZXIgPSBzaGlmdExlZnQoMSwga2V5RGF0YS5faWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgoa2V5bWFzayAmIHVwZGF0ZWRNYXNrKSA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGRlc3QgaW5zdGFuY2VvZiBQcm9wZXJ0eU1hcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRNYXNrIHw9IGtleW1hc2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAoPFByb3BlcnR5TWFwPmRlc3QpLmFkZENvbnRleHRLZXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcE1hbmFnZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZWRNYXNrO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfc2VsZWN0b3JzOiBBcnJheTxTZWxlY3Rvcj4sIHByaXZhdGUgX3Byb3BlcnRpZXM/OiBNYXA8c3RyaW5nLCBhbnk+LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3Jhbms6IG51bWJlciA9IC0xLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2xpbmVOdW1iZXI6IG51bWJlciA9IC0xKVxuICAgIHtcblxuICAgIH1cblxuXG4gICAgbWF0Y2hlcyhtYXRjaEFycmF5OiBBcnJheTxNYXRjaFZhbHVlPik6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGZvciAobGV0IHNlbCBvZiB0aGlzLl9zZWxlY3RvcnMpIHtcbiAgICAgICAgICAgIGlmICghc2VsLm1hdGNoZXMobWF0Y2hBcnJheSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBjb250ZXh0IGtleXMgbW9kaWZpZWRcbiAgICAgKi9cbiAgICBhcHBseShtZXRhOiBNZXRhLCBwcm9wZXJ0aWVzOiBQcm9wZXJ0eU1hcCwgZGVjbGFyZUtleTogc3RyaW5nKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fcmFuayA9PT0gTnVtYmVyLk1JTl9WQUxVRSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJ1bGUubWVyZ2UobWV0YSwgdGhpcy5fcHJvcGVydGllcywgcHJvcGVydGllcywgZGVjbGFyZUtleSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLl9yYW5rID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICB9XG5cbiAgICBkaXNhYmxlZCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmFuayA9PT0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICB9XG5cbiAgICBnZXQgbGluZU51bWJlcigpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lTnVtYmVyO1xuICAgIH1cblxuICAgIHNldCBsaW5lTnVtYmVyKGxpbmVOdW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLl9saW5lTnVtYmVyID0gbGluZU51bWJlcjtcbiAgICB9XG5cblxuICAgIGxvY2F0aW9uKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IHBhdGg6IHN0cmluZyA9IGlzUHJlc2VudCh0aGlzLl9ydWxlU2V0KSA/IHRoaXMuX3J1bGVTZXQuZmlsZVBhdGggOiAnVW5rbm93JztcbiAgICAgICAgcmV0dXJuICh0aGlzLl9saW5lTnVtYmVyID49IDAgKSA/IChuZXcgU3RyaW5nSm9pbmVyKFtcbiAgICAgICAgICAgICAgICBwYXRoLCAnOicsIHRoaXMuX2xpbmVOdW1iZXIgKyAnJ1xuICAgICAgICAgICAgXSkpLnRvU3RyaW5nKCkgOiBwYXRoO1xuICAgIH1cblxuXG4gICAgZ2V0IHNlbGVjdG9ycygpOiBBcnJheTxTZWxlY3Rvcj5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RvcnM7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdG9ycyh2YWx1ZTogQXJyYXk8U2VsZWN0b3I+KVxuICAgIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0b3JzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHByb3BlcnRpZXMoKTogTWFwPHN0cmluZywgYW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgc2V0IHByb3BlcnRpZXModmFsdWU6IE1hcDxzdHJpbmcsIGFueT4pXG4gICAge1xuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHJhbmsoKTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmFuaztcbiAgICB9XG5cblxuICAgIHNldCByYW5rKHZhbHVlOiBudW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLl9yYW5rID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHJ1bGVTZXQoKTogUnVsZVNldFxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3J1bGVTZXQ7XG4gICAgfVxuXG5cbiAgICBzZXQgcnVsZVNldCh2YWx1ZTogUnVsZVNldClcbiAgICB7XG4gICAgICAgIHRoaXMuX3J1bGVTZXQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgaWQoKTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgc2V0IGlkKHZhbHVlOiBudW1iZXIpXG4gICAge1xuICAgICAgICB0aGlzLl9pZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlzRWRpdGFibGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9ydWxlU2V0ICE9PSBudWxsKSAmJiAodGhpcy5fcnVsZVNldC5lZGl0YWJsZVN0YXJ0ID4gMCkgJiZcbiAgICAgICAgICAgICh0aGlzLl9pZCA+PSB0aGlzLl9ydWxlU2V0LmVkaXRhYmxlU3RhcnQpO1xuICAgIH1cblxuICAgIGNyZWF0ZURlY2woKTogUnVsZVxuICAgIHtcbiAgICAgICAgLypcbiAgICAgICAgIEBmaWVsZD1keW5vIHsgdmFsdWU6JHsgc29tZSBleHByfSB9IGJlY29tZXNcbiAgICAgICAgIGRlY2xhcmUgeyBmaWVsZDpkeW5vIH1cbiAgICAgICAgIGZpZWxkPWR5bm8geyBmaWVsZDpkeW5vOyB2YWx1ZTokeyBzb21lIGV4cHJ9IH1cbiAgICAgICAgICovXG4gICAgICAgIC8vIGFkZCBydWxlIGZvciBkZWNsYXJhdGlvblxuXG4gICAgICAgIGxldCBzZWxlY3RvcnM6IEFycmF5PFNlbGVjdG9yPiA9IHRoaXMuX3NlbGVjdG9ycztcbiAgICAgICAgbGV0IGRlY2xQcmVkOiBTZWxlY3RvciA9IHNlbGVjdG9yc1tzZWxlY3RvcnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBwcmVQcmVkczogQXJyYXk8U2VsZWN0b3I+ID0gdGhpcy5jb252ZXJ0S2V5T3ZlcnJpZGVzKFxuICAgICAgICAgICAgc2VsZWN0b3JzLnNsaWNlKDAsIHNlbGVjdG9ycy5sZW5ndGggLSAxKSk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fcHJvcGVydGllcykpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHAgb2Ygc2VsZWN0b3JzKSB7XG4gICAgICAgICAgICBpZiAoIShpc0FycmF5KHAudmFsdWUpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Byb3BlcnRpZXMuc2V0KHAua2V5LCBwLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBGbGFnIHRoZSBkZWNsYXJpbmcgcnVsZSBhcyBhIHByb3BlcnR5XG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMuc2V0KE1ldGEuRGVjbFJ1bGUsIG5ldyBSdWxlV3JhcHBlcih0aGlzKSk7XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIG92ZXJyaWRlIHNjb3BlXG4gICAgICAgIGxldCBoYXNPdmVycmlkZVNjb3BlID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IHAgb2YgcHJlUHJlZHMpIHtcbiAgICAgICAgICAgIGlmIChwLmtleSA9PT0gZGVjbFByZWQua2V5KSB7XG4gICAgICAgICAgICAgICAgaGFzT3ZlcnJpZGVTY29wZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBkZWNsIGtleSBpc24ndCBzY29wZWQsIHRoZW4gc2VsZWN0IG9uIG5vIHNjb3BlXG4gICAgICAgIGlmICghaGFzT3ZlcnJpZGVTY29wZSkge1xuICAgICAgICAgICAgbGV0IG92ZXJyaWRlS2V5OiBzdHJpbmcgPSBNZXRhLm92ZXJyaWRlS2V5Rm9yS2V5KGRlY2xQcmVkLmtleSk7XG4gICAgICAgICAgICBwcmVQcmVkcy51bnNoaWZ0KG5ldyBTZWxlY3RvcihvdmVycmlkZUtleSwgTWV0YS5OdWxsTWFya2VyKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgZGVjbCBydWxlLi4uXG4gICAgICAgIHByZVByZWRzLnB1c2gobmV3IFNlbGVjdG9yKE1ldGEuS2V5RGVjbGFyZSwgZGVjbFByZWQua2V5KSk7XG5cbiAgICAgICAgbGV0IG0gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBtLnNldChkZWNsUHJlZC5rZXksIGRlY2xQcmVkLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSdWxlKHByZVByZWRzLCBtLCAwLCAtMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHJld3JpdGUgYW55IHNlbGVjdG9yIG9mIHRoZSBmb3JtIFwibGF5b3V0PUwxLCBjbGFzcz1jLCBsYXlvdXQ9TDJcIiB0b1xuICAgICAqICBcImxheW91dF9vPUwxIGNsYXNzPWMsIGxheW91dD1MMlwiXG4gICAgICovXG5cbiAgICBjb252ZXJ0S2V5T3ZlcnJpZGVzKG9yaWc6IEFycmF5PFNlbGVjdG9yPik6IEFycmF5PFNlbGVjdG9yPlxuICAgIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gb3JpZztcbiAgICAgICAgbGV0IGNvdW50OiBudW1iZXIgPSBvcmlnLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcDogU2VsZWN0b3IgPSBvcmlnW2ldO1xuICAgICAgICAgICAgLy8gU2VlIGlmIG92ZXJyaWRkZWQgYnkgc2FtZSBrZXkgbGF0ZXIgaW4gc2VsZWN0b3JcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcE5leHQ6IFNlbGVjdG9yID0gb3JpZ1tqXTtcblxuICAgICAgICAgICAgICAgIGlmIChwTmV4dC5rZXkgPT09IHAua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlJ3JlIG92ZXJyaWRkZW4sIHdlIGRyb3Agb3VycywgYW5kIHJlcGxhY2UgdGhlIG5leHQgY29sbGlzaW9uXG4gICAgICAgICAgICAgICAgICAgIC8vIHdpdGggb25lIHdpdGggb3VyIHByZWZpeFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgYSBjb3B5IGlmIHdlIGhhdmVuJ3QgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBvcmlnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBvcmlnLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHAgPSBuZXcgU2VsZWN0b3IoTWV0YS5vdmVycmlkZUtleUZvcktleShwLmtleSksIHAudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9PSBvcmlnKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBzaiA9IG5ldyBTdHJpbmdKb2luZXIoWyc8UnVsZSBbJ10pO1xuICAgICAgICBzai5hZGQodGhpcy5fcmFuayArICddICcpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2VsZWN0b3JzKSkge1xuICAgICAgICAgICAgc2ouYWRkKCdudWxsLCBudWxsIC0tPiBudWxsID4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNqLmFkZChMaXN0V3JhcHBlci50b1N0cmluZzxTZWxlY3Rvcj4odGhpcy5fc2VsZWN0b3JzKSk7XG5cbiAgICAgICAgICAgIHNqLmFkZCgnIC0+ICcpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Byb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBzai5hZGQoJ1ssXScgKyAnID4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb3BlcnRpZXMuaGFzKCdkZWNsUnVsZScpKSB7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzai5hZGQoTWFwV3JhcHBlci50b1N0cmluZyh0aGlzLl9wcm9wZXJ0aWVzKSArICcgPicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzai5hZGQoJ1sgJyk7XG4gICAgICAgICAgICBzai5hZGQodGhpcy5rZXlJbmRleGVkTWFzayArICcsICcpO1xuICAgICAgICAgICAgc2ouYWRkKHRoaXMua2V5QW50aU1hc2sgKyAnLCAnKTtcbiAgICAgICAgICAgIHNqLmFkZCh0aGlzLmtleU1hdGNoZXNNYXNrICsgJycpO1xuICAgICAgICAgICAgc2ouYWRkKCcgXScpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cblxuICAgIF9jaGVja1J1bGUodmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+LCBtZXRhOiBNZXRhKTogdm9pZFxuICAgIHtcbiAgICAgICAgTGlzdFdyYXBwZXIuZm9yRWFjaFdpdGhJbmRleDxTZWxlY3Rvcj4odGhpcy5zZWxlY3RvcnMsIChwLCBpKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgY29udGV4dFZhbHVlID0gdmFsdWVzLmdldChwLmtleSk7XG4gICAgICAgICAgICBsZXQga2V5RGF0YTogS2V5RGF0YSA9IG1ldGEua2V5RGF0YShwLmtleSk7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoa2V5RGF0YS5fdHJhbnNmb3JtZXIpKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dFZhbHVlID0ga2V5RGF0YS5fdHJhbnNmb3JtZXIudHJhbmZvcm1Gb3JNYXRjaChjb250ZXh0VmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGNvbnRleHRWYWx1ZSkgJiZcbiAgICAgICAgICAgICAgICAoKE1ldGEuS2V5QW55ID09PSBwLnZhbHVlICYmIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKGNvbnRleHRWYWx1ZSkgfHxcbiAgICAgICAgICAgICAgICBNZXRhLm9iamVjdEVxdWFscyhjb250ZXh0VmFsdWUsIHAudmFsdWUpIHx8XG4gICAgICAgICAgICAgICAgKGlzQXJyYXkocC52YWx1ZSkgJiYgcC52YWx1ZS5pbmRleE9mKGNvbnRleHRWYWx1ZSkgPiAtMSkgfHxcbiAgICAgICAgICAgICAgICAoaXNBcnJheShwLnZhbHVlKSAmJiBjb250ZXh0VmFsdWUuaW5kZXhPZihwLnZhbHVlKSA+IC0xICkpKSkge1xuICAgICAgICAgICAgICAgIC8vIG9rYXlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJpbnQoJ1Bvc3NpYmxlIGJhZCBydWxlIG1hdGNoISAgUnVsZTogJXM7IHNlbGVjdG9yOiAlcywgY29udGV4dCB2YWw6ICVzJyArIHRoaXMgK1xuICAgICAgICAgICAgICAgICAgICAnICcgKyBwICsgJyAnICsgY29udGV4dFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn1cblxuLy8gaGVyZSBzbyBsb2dnaW5nIG9mIHByb3BlcnR5IG1hcCBkb2Vzbid0IGluZmluaXRlbHkgcmVjdXJzZVxuZXhwb3J0IGNsYXNzIFJ1bGVXcmFwcGVyXG57XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBydWxlOiBSdWxlKVxuICAgIHtcbiAgICB9XG59XG5cblxuXG4iXX0=