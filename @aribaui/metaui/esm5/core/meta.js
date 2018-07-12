/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as Collections from 'typescript-collections';
import { assert, BooleanWrapper, equals, isArray, isBlank, isBoolean, isEntity, isFunction, isPresent, isString, isStringMap, isValue, ListWrapper, MapWrapper, objectToName, print, shiftLeft, shiftRight, StringJoiner, StringWrapper, unimplemented } from '@aribaui/core';
import { Match, MatchResult, UnionMatchResult } from './match';
import { Context } from './context';
import { DeferredOperationChain, DynamicPropertyValue } from './property-value';
import { Rule, Selector } from './rule';
/**
 * Meta is the core class in MetaUI.  An instance of meta represents a 'Rule Base' (a repository
 * rules), and this rule base is used to compute property maps based on a series of key/value
 * constraints (typically based on the current values in a Context instance).
 *
 * Meta works in concert with Match.MatchResult to cache partial matches (match trees) with cached
 * computed property maps. Meta is generally used by way of its subclasses ObjectMeta and UIMeta
 * (which extend Meta with behaviors around auto-creating rules for references Typescripts classes
 * and dynamic properties for field and layout zoning)
 *
 *
 */
var Meta = /** @class */ (function () {
    function Meta() {
        this._rules = new Array();
        this._ruleCount = 0;
        this._testRules = new Map();
        this._nextKeyId = 0;
        this._ruleSetGeneration = 0;
        this._keyData = new Map();
        this._keyDatasById = new Array(Meta.MaxKeyDatas);
        this._MatchToPropsCache = new Collections.Dictionary();
        this._PropertyMapUniquer = new Collections.Dictionary();
        this._identityCache = new Collections.Dictionary();
        this._managerForProperty = new Map();
        this._declareKeyMask = 0;
        Meta.PropertyMerger_DeclareList = new PropertyMergerDeclareList();
        Meta.PropertyMerger_Traits = new PropertyMergerDeclareListForTrait();
        Meta.PropertyMerger_List = new PropertyMerger_List();
        Meta.Transformer_KeyPresent = new KeyValueTransformer_KeyPresent();
        this._declareKeyMask = this.keyData(Meta.KeyDeclare).maskValue();
        this.registerPropertyMerger(Meta.KeyTrait, Meta.PropertyMerger_Traits);
        var /** @type {?} */ nooprule = new Rule(null, null, 0, 0);
        nooprule.disable();
        this._rules[0] = nooprule;
        this._ruleCount = 1;
    }
    /*
     A few handy utilities (for which we probably already have superior versions elsewhere)
     */
    /**
     * @param {?} value
     * @return {?}
     */
    Meta.booleanValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return BooleanWrapper.boleanValue(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Meta.toList = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return (isArray(value)) ? value : [value];
    };
    /**
     * @param {?} one
     * @param {?} two
     * @return {?}
     */
    Meta.objectEquals = /**
     * @param {?} one
     * @param {?} two
     * @return {?}
     */
    function (one, two) {
        if (isBlank(one) && isBlank(two)) {
            return true;
        }
        if (isBlank(one) || isBlank(two)) {
            return false;
        }
        return equals(one, two);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Meta.overrideKeyForKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return key + '_o';
    };
    /**
     * @param {?} traits
     * @param {?} map
     * @return {?}
     */
    Meta.addTraits = /**
     * @param {?} traits
     * @param {?} map
     * @return {?}
     */
    function (traits, map) {
        var /** @type {?} */ current = map.get(Meta.KeyTrait);
        if (isBlank(current)) {
            map.set(Meta.KeyTrait, traits);
        }
        else {
            ListWrapper.addAll(current, traits);
            map.set(Meta.KeyTrait, current);
        }
    };
    /**
     * @param {?} trait
     * @param {?} map
     * @return {?}
     */
    Meta.addTrait = /**
     * @param {?} trait
     * @param {?} map
     * @return {?}
     */
    function (trait, map) {
        var /** @type {?} */ current = map.get(Meta.KeyTrait);
        if (isBlank(current)) {
            map.set(Meta.KeyTrait, Meta.toList(trait));
        }
        else {
            current.push(trait);
            map.set(Meta.KeyTrait, current);
        }
    };
    /**
     * @param {?} object
     * @return {?}
     */
    Meta.className = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        if (isStringMap(object) && (isEntity(object) || isValue(object))) {
            return (/** @type {?} */ (object)).className();
        }
        else if (isStringMap(object)) {
            return objectToName(object);
        }
        else if (isFunction(object)) {
            return object.name;
        }
        return object;
    };
    /**
     * @param {?} loader
     * @return {?}
     */
    Meta.prototype.registerLoader = /**
     * @param {?} loader
     * @return {?}
     */
    function (loader) {
        this._ruleLoader = loader;
    };
    /**
     * @param {?} rule
     * @return {?}
     */
    Meta.prototype.addRule = /**
     * @param {?} rule
     * @return {?}
     */
    function (rule) {
        var /** @type {?} */ selectors = rule.selectors;
        if (selectors.length > 0 && selectors[selectors.length - 1].isDecl) {
            var /** @type {?} */ decl = rule.createDecl();
            this._addRule(decl, true);
        }
        // we allow null to enable creation of a decl, but otherwise this rule has no effect
        if (isPresent(rule.properties)) {
            // After we've captured the decl, do the collapse
            rule._selectors = rule.convertKeyOverrides(rule._selectors);
            this._addRule(rule, true);
        }
    };
    /**
     * @param {?} rule
     * @param {?} pos
     * @return {?}
     */
    Meta.prototype._addToRules = /**
     * @param {?} rule
     * @param {?} pos
     * @return {?}
     */
    function (rule, pos) {
        this._rules[pos] = rule;
    };
    // todo: TEST unit test this
    /**
     * @param {?} rule
     * @param {?} checkPropScope
     * @return {?}
     */
    Meta.prototype._addRule = /**
     * @param {?} rule
     * @param {?} checkPropScope
     * @return {?}
     */
    function (rule, checkPropScope) {
        assert(isPresent(this._currentRuleSet), 'Attempt to add rule without current RuleSet');
        var /** @type {?} */ selectors = rule._selectors;
        var /** @type {?} */ entryId = this._currentRuleSet.allocateNextRuleEntry();
        rule.id = entryId;
        if (rule.rank === 0) {
            rule.rank = this._currentRuleSet._rank++;
        }
        rule.ruleSet = this._currentRuleSet;
        this._addToRules(rule, entryId);
        // index it
        var /** @type {?} */ lastScopeKeyData;
        var /** @type {?} */ declKey;
        var /** @type {?} */ declMask = this.declareKeyMask;
        var /** @type {?} */ matchMask = 0, /** @type {?} */ indexedMask = 0, /** @type {?} */ antiMask = 0;
        var /** @type {?} */ count = selectors.length;
        var /** @type {?} */ indexOnlySelector = Meta._UsePartialIndexing ? this.bestSelectorToIndex(selectors) : null;
        for (var /** @type {?} */ i = count - 1; i >= 0; i--) {
            var /** @type {?} */ p = selectors[i];
            var /** @type {?} */ shouldIndex = (indexOnlySelector === null || p === indexOnlySelector);
            var /** @type {?} */ data = this.keyData(p.key);
            var /** @type {?} */ dataMask = data.maskValue();
            if (!this.isNullMarker(p.value)) {
                if (shouldIndex || Meta._DebugDoubleCheckMatches) {
                    if (isArray(p.value)) {
                        try {
                            for (var _a = tslib_1.__values(p.value), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var v = _b.value;
                                data.addEntry(v, entryId);
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
                        data.addEntry(p.value, entryId);
                    }
                    if (shouldIndex) {
                        indexedMask |= shiftLeft(1, data.id);
                    }
                }
                if (!shouldIndex) {
                    // prepare selector for direct evaluation
                    p.bindToKeyData(data);
                }
                matchMask |= dataMask;
                if (data.isPropertyScope && isBlank(lastScopeKeyData)) {
                    lastScopeKeyData = data;
                }
                if ((dataMask & declMask) !== 0) {
                    declKey = p.value;
                }
            }
            else {
                antiMask |= dataMask;
            }
        }
        var /** @type {?} */ isDecl = isPresent(declKey);
        var /** @type {?} */ nonScopeKeyDecl = isPresent(declKey) && !this.keyData(declKey).isPropertyScope;
        if (!isDecl || nonScopeKeyDecl) {
            // all non-decl rules don't apply outside decl context
            if (!isDecl) {
                antiMask |= declMask;
            }
            if (isPresent(lastScopeKeyData) && checkPropScope) {
                var /** @type {?} */ traitVal = rule.properties.get(Meta.KeyTrait);
                if (isPresent(traitVal)) {
                    var /** @type {?} */ traitKey = lastScopeKeyData._key + '_trait';
                    var /** @type {?} */ properties = MapWrapper.createEmpty();
                    properties.set(traitKey, traitVal);
                    var /** @type {?} */ traitRule = new Rule(rule._selectors, properties, rule.rank, rule.lineNumber);
                    this._addRule(traitRule, false);
                }
                rule._selectors = selectors.slice(0);
                var /** @type {?} */ scopeSel = new Selector(Meta.ScopeKey, lastScopeKeyData.key);
                rule.selectors.push(scopeSel);
                var /** @type {?} */ data = this.keyData(Meta.ScopeKey);
                if (!Meta._UsePartialIndexing || Meta._DebugDoubleCheckMatches) {
                    data.addEntry(lastScopeKeyData._key, entryId);
                    indexedMask |= shiftLeft(1, data._id);
                }
                scopeSel.bindToKeyData(data);
                matchMask |= shiftLeft(1, data._id);
            }
        }
        rule.keyMatchesMask = matchMask;
        rule.keyIndexedMask = indexedMask;
        rule.keyAntiMask = antiMask;
        var e_1, _c;
    };
    /**
     * @param {?} selectors
     * @return {?}
     */
    Meta.prototype.bestSelectorToIndex = /**
     * @param {?} selectors
     * @return {?}
     */
    function (selectors) {
        var /** @type {?} */ best;
        var /** @type {?} */ bestRank = Number.MIN_VALUE;
        var /** @type {?} */ pos = 0;
        try {
            for (var selectors_1 = tslib_1.__values(selectors), selectors_1_1 = selectors_1.next(); !selectors_1_1.done; selectors_1_1 = selectors_1.next()) {
                var sel = selectors_1_1.value;
                var /** @type {?} */ rank = this.selectivityRank(sel) + pos++;
                if (rank > bestRank) {
                    best = sel;
                    bestRank = rank;
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
        return best;
        var e_2, _a;
    };
    /**
     * @param {?} selector
     * @return {?}
     */
    Meta.prototype.selectivityRank = /**
     * @param {?} selector
     * @return {?}
     */
    function (selector) {
        // Score selectors: good if property scope, key !== '*' or bool
        // '*' is particularly bad, since these are inherited by all others
        var /** @type {?} */ score = 1;
        var /** @type {?} */ value = selector.value;
        if (isPresent(value) && !(Meta.KeyAny === value)) {
            score += (isBoolean(value) ? 1 : 9);
        }
        var /** @type {?} */ keyData = this.keyData(selector.key);
        if (keyData.isPropertyScope) {
            score *= 5;
        }
        // Todo: we could score based on # of entries in KeyData
        return score;
    };
    /**
     * if addition of this rule results in addition of extra rules, those are returned
     * (null otherwise)
     */
    /**
     * if addition of this rule results in addition of extra rules, those are returned
     * (null otherwise)
     * @return {?}
     */
    Meta.prototype._editingRuleEnd = /**
     * if addition of this rule results in addition of extra rules, those are returned
     * (null otherwise)
     * @return {?}
     */
    function () {
        return Math.max(this._currentRuleSet.end, this._ruleCount);
    };
    /**
     * @param {?} rule
     * @return {?}
     */
    Meta.prototype._addRuleAndReturnExtras = /**
     * @param {?} rule
     * @return {?}
     */
    function (rule) {
        var /** @type {?} */ start = this._editingRuleEnd();
        var /** @type {?} */ extras;
        this.addRule(rule);
        // Return any extra rules created by addition of this one
        for (var /** @type {?} */ i = start, /** @type {?} */ c = this._editingRuleEnd(); i < c; i++) {
            var /** @type {?} */ r = this._rules[i];
            if (r !== rule) {
                if (isBlank(extras)) {
                    extras = new Array();
                }
                extras.push(r);
            }
        }
        return extras;
    };
    // Icky method to replace an exited rule in place
    /**
     * @param {?} rule
     * @param {?} extras
     * @return {?}
     */
    Meta.prototype._updateEditedRule = /**
     * @param {?} rule
     * @param {?} extras
     * @return {?}
     */
    function (rule, extras) {
        // in place replace existing rule with NoOp
        var /** @type {?} */ nooprule = new Rule(null, null, 0, 0);
        nooprule.disable();
        this._rules[rule.id] = nooprule;
        if (isPresent(extras)) {
            try {
                for (var extras_1 = tslib_1.__values(extras), extras_1_1 = extras_1.next(); !extras_1_1.done; extras_1_1 = extras_1.next()) {
                    var r = extras_1_1.value;
                    r.disable();
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (extras_1_1 && !extras_1_1.done && (_a = extras_1.return)) _a.call(extras_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        // Since this rule has already been mutated (the first time it was added) we need to
        // reverse the addition of the scopeKey
        var /** @type {?} */ preds = rule.selectors;
        if ((isPresent(preds) && preds.length > 0) && ListWrapper.last(preds).key === Meta.ScopeKey) {
            ListWrapper.removeAt(preds, preds.length);
        }
        // now (re)-add it and invalidate
        extras = this._addRuleAndReturnExtras(rule);
        this.invalidateRules();
        return extras;
        var e_3, _a;
    };
    /**
     * @param {?} preds
     * @return {?}
     */
    Meta.prototype.scopeKeyForSelector = /**
     * @param {?} preds
     * @return {?}
     */
    function (preds) {
        for (var /** @type {?} */ i = preds.length - 1; i >= 0; i--) {
            var /** @type {?} */ pred = preds[i];
            var /** @type {?} */ data = this.keyData(pred.key);
            if (data.isPropertyScope) {
                return pred.key;
            }
        }
        return null;
    };
    /**
     * @param {?} selectorMap
     * @param {?} propertyMap
     * @return {?}
     */
    Meta.prototype.addRuleFromSelectorMap = /**
     * @param {?} selectorMap
     * @param {?} propertyMap
     * @return {?}
     */
    function (selectorMap, propertyMap) {
        this.addRuleFromSelectorMapWithRank(selectorMap, propertyMap, 0);
    };
    /**
     * @param {?} selectorMap
     * @param {?} propertyMap
     * @param {?} rank
     * @return {?}
     */
    Meta.prototype.addRuleFromSelectorMapWithRank = /**
     * @param {?} selectorMap
     * @param {?} propertyMap
     * @param {?} rank
     * @return {?}
     */
    function (selectorMap, propertyMap, rank) {
        var /** @type {?} */ rule = new Rule(Selector.fromMap(selectorMap), propertyMap, 0, -1);
        if (rank !== 0) {
            rule.rank = rank;
        }
        this.addRule(rule);
    };
    /**
     * @param {?} ruleSet
     * @param {?} selectors
     * @return {?}
     */
    Meta.prototype.addRules = /**
     * @param {?} ruleSet
     * @param {?} selectors
     * @return {?}
     */
    function (ruleSet, selectors) {
        // Special keys:  'props, 'rules'.  Everthing else is a selector
        var /** @type {?} */ props;
        var /** @type {?} */ rules;
        MapWrapper.iterable(ruleSet).forEach(function (value, key) {
            if (key === 'props') {
                props = value;
            }
            else if (key === 'rules') {
                rules = value;
            }
            else {
                selectors.push(new Selector(key, value));
            }
        });
        if (isPresent(props)) {
            this.addRule(new Rule(selectors, props, 0));
        }
        if (isPresent(rules)) {
            try {
                for (var rules_1 = tslib_1.__values(rules), rules_1_1 = rules_1.next(); !rules_1_1.done; rules_1_1 = rules_1.next()) {
                    var r = rules_1_1.value;
                    this.addRules(r, selectors);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (rules_1_1 && !rules_1_1.done && (_a = rules_1.return)) _a.call(rules_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        var e_4, _a;
    };
    // this one expect that we already opened the ruleset
    /**
     * @param {?=} ruleText
     * @param {?=} module
     * @param {?=} editable
     * @return {?}
     */
    Meta.prototype._loadRules = /**
     * @param {?=} ruleText
     * @param {?=} module
     * @param {?=} editable
     * @return {?}
     */
    function (ruleText, module, editable) {
        var _this = this;
        if (module === void 0) { module = 'system'; }
        if (editable === void 0) { editable = true; }
        try {
            if (isPresent(this._ruleLoader)) {
                this._ruleLoader.loadRules(this, ruleText, module, function (rule) { return _this.addRule(rule); });
            }
        }
        catch (/** @type {?} */ e) {
            this.endRuleSet().disableRules();
            throw new Error('Error loading rule: ' + e);
        }
    };
    /**
     * @param {?=} ruleText
     * @return {?}
     */
    Meta.prototype.loadRules = /**
     * @param {?=} ruleText
     * @return {?}
     */
    function (ruleText) {
        this._loadRulesWithRuleSet('StringLiteral', ruleText, 0);
        this.endRuleSet();
    };
    /**
     * @param {?} filename
     * @param {?} ruleText
     * @param {?} rank
     * @return {?}
     */
    Meta.prototype._loadRulesWithRuleSet = /**
     * @param {?} filename
     * @param {?} ruleText
     * @param {?} rank
     * @return {?}
     */
    function (filename, ruleText, rank) {
        this.beginRuleSetWithRank(rank, filename);
        try {
            this._loadRules(ruleText);
        }
        catch (/** @type {?} */ e) {
            this.endRuleSet().disableRules();
            throw new Error('Error loading rule: ' + e);
        }
    };
    /**
     * @param {?} source
     * @param {?} userClass
     * @return {?}
     */
    Meta.prototype.loadUserRule = /**
     * @param {?} source
     * @param {?} userClass
     * @return {?}
     */
    function (source, userClass) {
        return unimplemented();
    };
    /**
     * @param {?} propString
     * @param {?} propertyMap
     * @return {?}
     */
    Meta.prototype.parsePropertyAssignment = /**
     * @param {?} propString
     * @param {?} propertyMap
     * @return {?}
     */
    function (propString, propertyMap) {
        // todo: implement this
        return unimplemented();
    };
    /**
     * @return {?}
     */
    Meta.prototype.clearCaches = /**
     * @return {?}
     */
    function () {
        this._MatchToPropsCache = new Collections.Dictionary();
        this._PropertyMapUniquer = new Collections.Dictionary();
        this._identityCache = new Collections.Dictionary();
    };
    /**
     * @param {?} rule
     * @return {?}
     */
    Meta.prototype.isTraitExportRule = /**
     * @param {?} rule
     * @return {?}
     */
    function (rule) {
        if (isBlank(rule.properties) || rule || rule.properties.size === 1) {
            var /** @type {?} */ key = Array.from(rule.properties.keys())[0];
            return StringWrapper.endsWidth(key, '_trait');
        }
        return false;
    };
    /**
     * @param {?} identificator
     * @return {?}
     */
    Meta.prototype.beginRuleSet = /**
     * @param {?} identificator
     * @return {?}
     */
    function (identificator) {
        this.beginRuleSetWithRank(this._ruleCount, identificator);
    };
    /**
     * @param {?} rank
     * @param {?} filePath
     * @return {?}
     */
    Meta.prototype.beginRuleSetWithRank = /**
     * @param {?} rank
     * @param {?} filePath
     * @return {?}
     */
    function (rank, filePath) {
        try {
            assert(isBlank(this._currentRuleSet), 'Can t start new rule set while one in progress');
            this._currentRuleSet = new RuleSet(this);
            this._currentRuleSet._start = this._ruleCount;
            this._currentRuleSet._end = this._ruleCount;
            this._currentRuleSet._rank = rank;
            this._currentRuleSet._filePath = filePath;
        }
        catch (/** @type {?} */ e) {
            throw e;
        }
    };
    /**
     * @param {?} orig
     * @return {?}
     */
    Meta.prototype.beginReplacementRuleSet = /**
     * @param {?} orig
     * @return {?}
     */
    function (orig) {
        var /** @type {?} */ origRank = orig.startRank();
        this.beginRuleSetWithRank(this._ruleCount, orig._filePath);
        this._currentRuleSet._rank = origRank;
    };
    /**
     * @return {?}
     */
    Meta.prototype.endRuleSet = /**
     * @return {?}
     */
    function () {
        assert(isPresent(this._currentRuleSet), 'No rule set progress');
        var /** @type {?} */ result = this._currentRuleSet;
        if (this._ruleCount < result._end) {
            this._ruleCount = result._end;
        }
        this._currentRuleSet = null;
        this._ruleSetGeneration++;
        return result;
    };
    Object.defineProperty(Meta.prototype, "ruleSetGeneration", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ruleSetGeneration;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Meta.prototype.invalidateRules = /**
     * @return {?}
     */
    function () {
        this._ruleSetGeneration++;
        this.clearCaches();
    };
    /**
     * @return {?}
     */
    Meta.prototype.newContext = /**
     * @return {?}
     */
    function () {
        return new Context(this);
    };
    Object.defineProperty(Meta.prototype, "declareKeyMask", {
        get: /**
         * @return {?}
         */
        function () {
            return this._declareKeyMask;
        },
        enumerable: true,
        configurable: true
    });
    // Touch a key/value to force pre-loading/registration of associated rule files
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Meta.prototype.touch = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        var /** @type {?} */ context = this.newContext();
        context.push();
        context.set(key, value);
        context.allProperties();
        context.pop();
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Meta.prototype.transformValue = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        var /** @type {?} */ keyData = this._keyData.get(key);
        if (isPresent(keyData) && isPresent(keyData._transformer)) {
            value = keyData._transformer.tranformForMatch(value);
        }
        return value;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} intermediateResult
     * @return {?}
     */
    Meta.prototype.match = /**
     * @param {?} key
     * @param {?} value
     * @param {?} intermediateResult
     * @return {?}
     */
    function (key, value, intermediateResult) {
        var /** @type {?} */ keyData = this._keyData.get(key);
        if (isBlank(keyData)) {
            return intermediateResult;
        }
        var /** @type {?} */ keyMask = shiftLeft(1, keyData._id);
        // Does our result already include this key?  Then no need to join again
        // if (intermediateResult !== null && (intermediateResult._keysMatchedMask & keyMask) !==
        // 0) return intermediateResult;
        return new MatchResult(this, keyData, value, intermediateResult);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} intermediateResult
     * @return {?}
     */
    Meta.prototype.unionOverrideMatch = /**
     * @param {?} key
     * @param {?} value
     * @param {?} intermediateResult
     * @return {?}
     */
    function (key, value, intermediateResult) {
        var /** @type {?} */ keyData = this._keyData.get(Meta.overrideKeyForKey(key));
        if (isBlank(keyData)) {
            return intermediateResult;
        }
        return new UnionMatchResult(this, keyData, value, intermediateResult);
    };
    /**
     * @return {?}
     */
    Meta.prototype.newPropertiesMap = /**
     * @return {?}
     */
    function () {
        return new PropertyMap();
    };
    /**
     * @param {?} matchResult
     * @return {?}
     */
    Meta.prototype.propertiesForMatch = /**
     * @param {?} matchResult
     * @return {?}
     */
    function (matchResult) {
        var /** @type {?} */ properties = this._MatchToPropsCache.getValue(matchResult);
        if (isPresent(properties)) {
            return properties;
        }
        properties = this.newPropertiesMap();
        var /** @type {?} */ arr = matchResult.filteredMatches();
        if (isBlank(arr)) {
            return properties;
        }
        // first entry is count
        var /** @type {?} */ count = arr[0];
        var /** @type {?} */ rules = new Array(count);
        for (var /** @type {?} */ i = 0; i < count; i++) {
            rules[i] = this._rules[arr[i + 1]];
        }
        ListWrapper.sort(rules, function (o1, o2) { return o1.rank - o2.rank; });
        var /** @type {?} */ modifiedMask = 0;
        var /** @type {?} */ declareKey = ((this._declareKeyMask & matchResult.keysMatchedMask) !== 0)
            ? matchResult.valueForKey(Meta.KeyDeclare) : null;
        for (var /** @type {?} */ r in rules) {
            modifiedMask |= rules[r].apply(this, properties, declareKey);
        }
        properties.awakeProperties();
        this._MatchToPropsCache.setValue(matchResult.immutableCopy(), properties);
        return properties;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Meta.prototype.keyData = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var /** @type {?} */ data = this._keyData.get(key);
        if (isBlank(data)) {
            var /** @type {?} */ id = this._nextKeyId;
            if (id >= Meta.MaxKeyDatas - 1) {
                print('Exceeded maximum number of context keys');
            }
            this._nextKeyId++;
            data = new KeyData(key, id);
            this._keyDatasById[id] = data;
            this._keyData.set(key, data);
        }
        return data;
    };
    /**
     * @param {?} mask
     * @return {?}
     */
    Meta.prototype._keysInMask = /**
     * @param {?} mask
     * @return {?}
     */
    function (mask) {
        var /** @type {?} */ matches = [];
        var /** @type {?} */ pos = 0;
        while (mask !== 0) {
            if ((mask & 1) !== 0) {
                matches.push(this._keyDatasById[pos]._key);
            }
            pos++;
            mask = shiftRight(mask, 1);
        }
        return matches;
    };
    /**
     * @param {?} key
     * @param {?} o
     * @return {?}
     */
    Meta.prototype.registerKeyInitObserver = /**
     * @param {?} key
     * @param {?} o
     * @return {?}
     */
    function (key, o) {
        this.keyData(key).addObserver(o);
    };
    /**
     * @param {?} key
     * @param {?} transformer
     * @return {?}
     */
    Meta.prototype.registerValueTransformerForKey = /**
     * @param {?} key
     * @param {?} transformer
     * @return {?}
     */
    function (key, transformer) {
        this.keyData(key)._transformer = transformer;
    };
    Object.defineProperty(Meta.prototype, "identityCache", {
        get: /**
         * @return {?}
         */
        function () {
            return this._identityCache;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Meta.prototype.newMatchArray = /**
     * @return {?}
     */
    function () {
        return [];
    };
    /**
     * @param {?} array
     * @param {?} keyData
     * @param {?} matchValue
     * @return {?}
     */
    Meta.prototype.matchArrayAssign = /**
     * @param {?} array
     * @param {?} keyData
     * @param {?} matchValue
     * @return {?}
     */
    function (array, keyData, matchValue) {
        var /** @type {?} */ idx = keyData._id;
        var /** @type {?} */ curr = array[idx];
        if (isPresent(curr)) {
            matchValue = curr.updateByAdding(matchValue);
        }
        array[idx] = matchValue;
    };
    /**
     * @param {?} propertyName
     * @param {?} origValue
     * @return {?}
     */
    Meta.prototype.propertyWillDoMerge = /**
     * @param {?} propertyName
     * @param {?} origValue
     * @return {?}
     */
    function (propertyName, origValue) {
        var /** @type {?} */ merger = this.mergerForProperty(propertyName);
        return this.isPropertyMergerIsChaining(merger) || (isPresent(origValue) && (origValue instanceof Map));
    };
    /**
     * @param {?} name
     * @return {?}
     */
    Meta.prototype.managerForProperty = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var /** @type {?} */ manager = this._managerForProperty.get(name);
        if (isBlank(manager)) {
            manager = new PropertyManager(name);
            this._managerForProperty.set(name, manager);
        }
        return manager;
    };
    /**
     * @param {?} propertyName
     * @param {?} contextKey
     * @return {?}
     */
    Meta.prototype.mirrorPropertyToContext = /**
     * @param {?} propertyName
     * @param {?} contextKey
     * @return {?}
     */
    function (propertyName, contextKey) {
        var /** @type {?} */ keyData = this.keyData(contextKey);
        var /** @type {?} */ manager = this.managerForProperty(propertyName);
        manager._keyDataToSet = keyData;
    };
    /**
     * @param {?} contextKey
     * @return {?}
     */
    Meta.prototype.defineKeyAsPropertyScope = /**
     * @param {?} contextKey
     * @return {?}
     */
    function (contextKey) {
        var /** @type {?} */ keyData = this.keyData(contextKey);
        keyData.isPropertyScope = true;
        var /** @type {?} */ traitKey = contextKey + '_trait';
        this.mirrorPropertyToContext(traitKey, traitKey);
        this.registerPropertyMerger(traitKey, Meta.PropertyMerger_DeclareList);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Meta.prototype.isPropertyScopeKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return Meta.ScopeKey === key;
    };
    /**
     * @param {?} propertyName
     * @param {?} merger
     * @return {?}
     */
    Meta.prototype.registerPropertyMerger = /**
     * @param {?} propertyName
     * @param {?} merger
     * @return {?}
     */
    function (propertyName, merger) {
        if (isBlank(merger._meta)) {
            merger._meta = this;
        }
        var /** @type {?} */ manager = this.managerForProperty(propertyName);
        manager._merger = merger;
    };
    /**
     * @param {?} propertyName
     * @return {?}
     */
    Meta.prototype.mergerForProperty = /**
     * @param {?} propertyName
     * @return {?}
     */
    function (propertyName) {
        var /** @type {?} */ manager = this.managerForProperty(propertyName);
        return manager._merger;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Meta.prototype.isPropertyMergerIsChaining = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return isPresent(val.isPropMergerIsChainingMark) && val.isPropMergerIsChainingMark;
    };
    /**
     * @param {?} trait
     * @return {?}
     */
    Meta.prototype.groupForTrait = /**
     * @param {?} trait
     * @return {?}
     */
    function (trait) {
        return 'default';
    };
    /**
     * @return {?}
     */
    Meta.prototype._logRuleStats = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ total = 0;
        var /** @type {?} */ values = this._keyData.keys();
        var /** @type {?} */ counts = [];
        try {
            for (var _a = tslib_1.__values(Array.from(values)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var id = _b.value;
                var /** @type {?} */ keyData = this._keyData.get(id);
                var /** @type {?} */ valuess = keyData.ruleVecs.values();
                try {
                    for (var valuess_1 = tslib_1.__values(valuess), valuess_1_1 = valuess_1.next(); !valuess_1_1.done; valuess_1_1 = valuess_1.next()) {
                        var vm = valuess_1_1.value;
                        var /** @type {?} */ kvc = new KeyValueCount(keyData._key, (/** @type {?} */ (vm))['_value'], isPresent(vm._arr) ? vm._arr[0] : 0);
                        total += kvc.count;
                        counts.push(kvc);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (valuess_1_1 && !valuess_1_1.done && (_c = valuess_1.return)) _c.call(valuess_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_6) throw e_6.error; }
        }
        ListWrapper.sort(counts, function (o1, o2) { return o2.count - o1.count; });
        var /** @type {?} */ buf = new StringJoiner([]);
        var /** @type {?} */ c = Math.min(10, counts.length);
        buf.add('Total index entries comparisons performed: ' + Match._Debug_ElementProcessCount);
        buf.add('\nTotal index entries: ' + total);
        buf.add('\nTop  keys/values: ' + c);
        for (var /** @type {?} */ i = 0; i < c; i++) {
            var /** @type {?} */ kvc = counts[i];
            buf.add('     ' + kvc.key + '  = ' + kvc.value + ' : ' + kvc.count + ' entries');
            buf.add('\n');
        }
        print(buf.toString());
        var e_6, _d, e_5, _c;
    };
    /**
     * @return {?}
     */
    Meta.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'Meta';
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Meta.prototype.isNullMarker = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return isPresent(value) && value['markernull'];
    };
    /**
     * @param {?} testRuleName
     * @param {?} source
     * @return {?}
     */
    Meta.prototype.addTestUserRule = /**
     * @param {?} testRuleName
     * @param {?} source
     * @return {?}
     */
    function (testRuleName, source) {
        this._testRules.set(testRuleName, source);
    };
    Meta.KeyAny = '*';
    Meta.KeyDeclare = 'declare';
    Meta.KeyTrait = 'trait';
    Meta.LowRulePriority = -100000;
    Meta.SystemRulePriority = -200000;
    Meta.ClassRulePriority = -100000;
    Meta.TemplateRulePriority = 100000;
    Meta.EditorRulePriority = 200000;
    Meta.MaxKeyDatas = 64;
    Meta.NullMarker = { markernull: true };
    Meta.ScopeKey = 'scopeKey';
    Meta.DeclRule = 'declRule';
    /**
     *
     * PartialIndexing indexes each rule by a single (well chosen) key and evaluates other parts of
     * the selector on the index-filtered matches (generally this is a  win since may selectors are
     * not selective, resulting in huge rule vectors)
     *
     */
    Meta._UsePartialIndexing = true;
    Meta._DebugDoubleCheckMatches = false;
    Meta.PropertyMerger_DeclareList = null;
    Meta.PropertyMerger_Traits = null;
    Meta.PropertyMerger_List = null;
    Meta.Transformer_KeyPresent = null;
    return Meta;
}());
export { Meta };
function Meta_tsickle_Closure_declarations() {
    /** @type {?} */
    Meta.KeyAny;
    /** @type {?} */
    Meta.KeyDeclare;
    /** @type {?} */
    Meta.KeyTrait;
    /** @type {?} */
    Meta.LowRulePriority;
    /** @type {?} */
    Meta.SystemRulePriority;
    /** @type {?} */
    Meta.ClassRulePriority;
    /** @type {?} */
    Meta.TemplateRulePriority;
    /** @type {?} */
    Meta.EditorRulePriority;
    /** @type {?} */
    Meta.MaxKeyDatas;
    /** @type {?} */
    Meta.NullMarker;
    /** @type {?} */
    Meta.ScopeKey;
    /** @type {?} */
    Meta.DeclRule;
    /**
     *
     * PartialIndexing indexes each rule by a single (well chosen) key and evaluates other parts of
     * the selector on the index-filtered matches (generally this is a  win since may selectors are
     * not selective, resulting in huge rule vectors)
     *
     * @type {?}
     */
    Meta._UsePartialIndexing;
    /** @type {?} */
    Meta._DebugDoubleCheckMatches;
    /** @type {?} */
    Meta.PropertyMerger_DeclareList;
    /** @type {?} */
    Meta.PropertyMerger_Traits;
    /** @type {?} */
    Meta.PropertyMerger_List;
    /** @type {?} */
    Meta.Transformer_KeyPresent;
    /** @type {?} */
    Meta.prototype._rules;
    /** @type {?} */
    Meta.prototype._ruleCount;
    /** @type {?} */
    Meta.prototype._testRules;
    /** @type {?} */
    Meta.prototype._currentRuleSet;
    /** @type {?} */
    Meta.prototype._nextKeyId;
    /** @type {?} */
    Meta.prototype._ruleSetGeneration;
    /** @type {?} */
    Meta.prototype._keyData;
    /** @type {?} */
    Meta.prototype._keyDatasById;
    /** @type {?} */
    Meta.prototype._MatchToPropsCache;
    /** @type {?} */
    Meta.prototype._PropertyMapUniquer;
    /** @type {?} */
    Meta.prototype._identityCache;
    /** @type {?} */
    Meta.prototype._managerForProperty;
    /** @type {?} */
    Meta.prototype._declareKeyMask;
    /** @type {?} */
    Meta.prototype._ruleLoader;
}
var KeyValueCount = /** @class */ (function () {
    function KeyValueCount(key, value, count) {
        this.key = key;
        this.value = value;
        this.count = count;
    }
    return KeyValueCount;
}());
export { KeyValueCount };
function KeyValueCount_tsickle_Closure_declarations() {
    /** @type {?} */
    KeyValueCount.prototype.key;
    /** @type {?} */
    KeyValueCount.prototype.value;
    /** @type {?} */
    KeyValueCount.prototype.count;
}
/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
var /**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
PropertyManager = /** @class */ (function () {
    function PropertyManager(_name) {
        this._name = _name;
    }
    /**
     * @param {?} propertyName
     * @param {?} orig
     * @param {?} newValue
     * @param {?} isDeclare
     * @return {?}
     */
    PropertyManager.prototype.mergeProperty = /**
     * @param {?} propertyName
     * @param {?} orig
     * @param {?} newValue
     * @param {?} isDeclare
     * @return {?}
     */
    function (propertyName, orig, newValue, isDeclare) {
        if (isBlank(orig)) {
            return newValue;
        }
        if (newValue instanceof OverrideValue) {
            return (/** @type {?} */ (newValue)).value();
        }
        if (isBlank(this._merger)) {
            // Perhaps should have a data-type-based merger registry?
            if (orig instanceof Map) {
                if (isPresent(newValue) && newValue instanceof Map) {
                    // merge maps
                    // todo: TEST check outcome of the merge and compare
                    var /** @type {?} */ origClone = MapWrapper.clone(orig);
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
    };
    return PropertyManager;
}());
/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
export { PropertyManager };
function PropertyManager_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyManager.prototype._merger;
    /** @type {?} */
    PropertyManager.prototype._keyDataToSet;
    /** @type {?} */
    PropertyManager.prototype._name;
}
/**
 * Wrapper for a value that should, in rule application, override any previous value for its
 * property.  This can be used to override default property value merge policy, for instance
 * allowing the 'visible' property to be forced from false to true.
 */
var /**
 * Wrapper for a value that should, in rule application, override any previous value for its
 * property.  This can be used to override default property value merge policy, for instance
 * allowing the 'visible' property to be forced from false to true.
 */
OverrideValue = /** @class */ (function () {
    function OverrideValue(_value) {
        this._value = _value;
    }
    /**
     * @return {?}
     */
    OverrideValue.prototype.value = /**
     * @return {?}
     */
    function () {
        return this._value === 'null' ? null : this._value;
    };
    /**
     * @return {?}
     */
    OverrideValue.prototype.toString = /**
     * @return {?}
     */
    function () {
        return isPresent(this._value) ? this._value.toString() + '!' : 'null' + '!';
    };
    return OverrideValue;
}());
/**
 * Wrapper for a value that should, in rule application, override any previous value for its
 * property.  This can be used to override default property value merge policy, for instance
 * allowing the 'visible' property to be forced from false to true.
 */
export { OverrideValue };
function OverrideValue_tsickle_Closure_declarations() {
    /** @type {?} */
    OverrideValue.prototype._value;
}
/**
 * KeyData is the primary structure for representing information about context keys
 * (e.g. 'class', 'layout', 'operation', 'field', ...), including an index of rules
 * that match on particular values of that key (_ValueMatches).
 *
 * Note that every context key has a small integer ID (0-63) and these are uses in
 * (long) masks for certain rule matching operations.
 */
var /**
 * KeyData is the primary structure for representing information about context keys
 * (e.g. 'class', 'layout', 'operation', 'field', ...), including an index of rules
 * that match on particular values of that key (_ValueMatches).
 *
 * Note that every context key has a small integer ID (0-63) and these are uses in
 * (long) masks for certain rule matching operations.
 */
KeyData = /** @class */ (function () {
    function KeyData(_key, _id) {
        this._key = _key;
        this._id = _id;
        this._isPropertyScope = false;
        this._ruleVecs = new Collections.Dictionary();
        this._any = this.get(Meta.KeyAny);
    }
    /**
     * @return {?}
     */
    KeyData.prototype.maskValue = /**
     * @return {?}
     */
    function () {
        return shiftLeft(1, this._id);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    KeyData.prototype.get = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (isBlank(value)) {
            value = Meta.NullMarker;
        }
        else if (isPresent(this._transformer)) {
            value = this._transformer.tranformForMatch(value);
        }
        var /** @type {?} */ matches = this._ruleVecs.getValue(value);
        if (isBlank(matches)) {
            matches = new ValueMatches(value);
            if (isPresent(value) && !BooleanWrapper.isFalse(value)) {
                matches._parent = this._any;
            }
            this._ruleVecs.setValue(value, matches);
        }
        return matches;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    KeyData.prototype.matchValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (isArray(value)) {
            var /** @type {?} */ list = value;
            if (list.length === 1) {
                return this.get(list[0]);
            }
            var /** @type {?} */ multi_1 = new MultiMatchValue();
            ListWrapper.forEachWithIndex(list, function (v, i) {
                multi_1.data.push(_this.get(v));
            });
            return multi_1;
        }
        else {
            return this.get(value);
        }
    };
    /**
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    KeyData.prototype.addEntry = /**
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    function (value, id) {
        var /** @type {?} */ matches = this.get(value);
        var /** @type {?} */ before = matches._arr;
        var /** @type {?} */ after = Match.addInt(before, id);
        if (before !== after) {
            matches._arr = after;
        }
    };
    /**
     * @param {?} owner
     * @param {?} value
     * @return {?}
     */
    KeyData.prototype.lookup = /**
     * @param {?} owner
     * @param {?} value
     * @return {?}
     */
    function (owner, value) {
        var _this = this;
        var /** @type {?} */ matches = this.get(value);
        if (!matches._read && isPresent(this._observers)) {
            try {
                if (!matches._read) {
                    // notify
                    if (isPresent(value)) {
                        ListWrapper.forEachWithIndex(this._observers, function (v, i) {
                            v.notify(owner, _this._key, value);
                        });
                    }
                }
                matches._read = true;
            }
            finally {
            }
        }
        // check if parent has changed and need to union in parent data
        matches.checkParent();
        return matches._arr;
    };
    /**
     * @param {?} value
     * @param {?} parentValue
     * @return {?}
     */
    KeyData.prototype.setParent = /**
     * @param {?} value
     * @param {?} parentValue
     * @return {?}
     */
    function (value, parentValue) {
        var /** @type {?} */ parent = this.get(parentValue);
        var /** @type {?} */ child = this.get(value);
        child._parent = parent;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    KeyData.prototype.parent = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ child = this.get(value);
        return child._parent._value;
    };
    /**
     * @param {?} o
     * @return {?}
     */
    KeyData.prototype.addObserver = /**
     * @param {?} o
     * @return {?}
     */
    function (o) {
        if (isBlank(this._observers)) {
            this._observers = new Array();
        }
        this._observers.push(o);
    };
    Object.defineProperty(KeyData.prototype, "isPropertyScope", {
        // If this key defines a scope for properties (e.g. field, class, action)
        // this this returns the name of the selector key for those properties
        // (e.g. field_p, class_p)
        get: /**
         * @return {?}
         */
        function () {
            return this._isPropertyScope;
        },
        set: /**
         * @param {?} yn
         * @return {?}
         */
        function (yn) {
            this._isPropertyScope = yn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyData.prototype, "ruleVecs", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ruleVecs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyData.prototype, "key", {
        get: /**
         * @return {?}
         */
        function () {
            return this._key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyData.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyData.prototype, "observers", {
        get: /**
         * @return {?}
         */
        function () {
            return this._observers;
        },
        enumerable: true,
        configurable: true
    });
    return KeyData;
}());
/**
 * KeyData is the primary structure for representing information about context keys
 * (e.g. 'class', 'layout', 'operation', 'field', ...), including an index of rules
 * that match on particular values of that key (_ValueMatches).
 *
 * Note that every context key has a small integer ID (0-63) and these are uses in
 * (long) masks for certain rule matching operations.
 */
export { KeyData };
function KeyData_tsickle_Closure_declarations() {
    /** @type {?} */
    KeyData.prototype._ruleVecs;
    /** @type {?} */
    KeyData.prototype._observers;
    /** @type {?} */
    KeyData.prototype._any;
    /** @type {?} */
    KeyData.prototype._transformer;
    /** @type {?} */
    KeyData.prototype._isPropertyScope;
    /** @type {?} */
    KeyData.prototype._key;
    /** @type {?} */
    KeyData.prototype._id;
}
/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
var /**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
PropertyMap = /** @class */ (function () {
    function PropertyMap(entries) {
        if (isPresent(entries)) {
            this._map = new Map(entries);
        }
        else {
            this._map = new Map();
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    PropertyMap.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._map.get(key);
    };
    /**
     * @return {?}
     */
    PropertyMap.prototype.keys = /**
     * @return {?}
     */
    function () {
        return this._map.keys();
    };
    /**
     * @return {?}
     */
    PropertyMap.prototype.values = /**
     * @return {?}
     */
    function () {
        return this._map.values();
    };
    /**
     * @return {?}
     */
    PropertyMap.prototype.clear = /**
     * @return {?}
     */
    function () {
        this._map.clear();
    };
    /**
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    PropertyMap.prototype.set = /**
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    function (key, value) {
        return this._map.set(key, value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    PropertyMap.prototype.delete = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._map.delete(key);
    };
    /**
     * @param {?} callbackfn
     * @param {?=} thisArg
     * @return {?}
     */
    PropertyMap.prototype.forEach = /**
     * @param {?} callbackfn
     * @param {?=} thisArg
     * @return {?}
     */
    function (callbackfn, thisArg) {
        this._map.forEach(callbackfn);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    PropertyMap.prototype.has = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._map.has(key);
    };
    /**
     * @return {?}
     */
    PropertyMap.prototype[Symbol.iterator] = /**
     * @return {?}
     */
    function () {
        return this._map[Symbol.iterator]();
    };
    /**
     * @return {?}
     */
    PropertyMap.prototype.entries = /**
     * @return {?}
     */
    function () {
        return this._map.entries();
    };
    Object.defineProperty(PropertyMap.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PropertyMap.prototype.awakeProperties = /**
     * @return {?}
     */
    function () {
        var _this = this;
        MapWrapper.iterable(this).forEach(function (value, key) {
            if (isPropertyMapAwaking(value)) {
                var /** @type {?} */ newValue = value.awakeForPropertyMap(_this);
                if (newValue !== value) {
                    _this.set(key, newValue);
                }
            }
        });
    };
    /**
     * @param {?} key
     * @return {?}
     */
    PropertyMap.prototype.addContextKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (isBlank(this._contextPropertiesUpdated)) {
            this._contextPropertiesUpdated = new Array();
        }
        this._contextPropertiesUpdated.push(key);
    };
    Object.defineProperty(PropertyMap.prototype, "contextKeysUpdated", {
        get: /**
         * @return {?}
         */
        function () {
            return this._contextPropertiesUpdated;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PropertyMap.prototype.toString = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // todo: find better way for the string. thsi is also used as key for the dictionary
        // not really efficient
        var /** @type {?} */ sj = new StringJoiner(['PropertyMap:']);
        sj.add(this.size + ',');
        MapWrapper.iterable(this).forEach(function (value, key) {
            if (isPropertyMapAwaking(value)) {
                var /** @type {?} */ newValue = value.awakeForPropertyMap(_this);
                if (newValue !== value) {
                    sj.add(key + ':' + value);
                    sj.add(', ');
                }
            }
        });
        return sj.toString();
    };
    return PropertyMap;
}());
/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
export { PropertyMap };
function PropertyMap_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMap.prototype._contextPropertiesUpdated;
    /** @type {?} */
    PropertyMap.prototype._map;
    /* TODO: handle strange member:
    [Symbol.toStringTag]: 'Map';
    */
}
/**
 * @record
 */
export function PropertyMergerIsChaining() { }
function PropertyMergerIsChaining_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMergerIsChaining.prototype.isPropMergerIsChainingMark;
}
/**
 * Define policy for merging a property value assigned by one rule
 * to a subsequent value from a higher ranked rule.
 * @record
 */
export function PropertyMerger() { }
function PropertyMerger_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMerger.prototype._meta;
    /**
     * Called during rule application to merge an earlier (lower ranked) value with a newer one.
     * \@param orig the previous value accumulated in the property map
     * \@param override the new value from the higher ranked rule
     * \@param isDeclare whether we are currently accumulating matched for declarations of the
     *     property/value
     * \@return the new property value to be put in the property map
     * @type {?}
     */
    PropertyMerger.prototype.merge;
    /** @type {?} */
    PropertyMerger.prototype.toString;
}
/**
 * @abstract
 */
var /**
 * @abstract
 */
PropertyMergerDynamic = /** @class */ (function () {
    function PropertyMergerDynamic() {
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    PropertyMergerDynamic.prototype.merge = /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    function (orig, override, isDeclare) {
        return unimplemented();
    };
    /**
     * @return {?}
     */
    PropertyMergerDynamic.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'PropertyMergerDynamic';
    };
    return PropertyMergerDynamic;
}());
/**
 * @abstract
 */
export { PropertyMergerDynamic };
function PropertyMergerDynamic_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMergerDynamic.prototype._meta;
}
var PropertyMerger_Overwrite = /** @class */ (function () {
    function PropertyMerger_Overwrite() {
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    PropertyMerger_Overwrite.prototype.merge = /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    function (orig, override, isDeclare) {
        return override;
    };
    /**
     * @return {?}
     */
    PropertyMerger_Overwrite.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'OVERWRITE';
    };
    return PropertyMerger_Overwrite;
}());
export { PropertyMerger_Overwrite };
function PropertyMerger_Overwrite_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMerger_Overwrite.prototype._meta;
}
/**
 * PropertyMerger for properties the should be unioned as lists
 */
var /**
 * PropertyMerger for properties the should be unioned as lists
 */
PropertyMerger_List = /** @class */ (function () {
    function PropertyMerger_List() {
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    PropertyMerger_List.prototype.merge = /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    function (orig, override, isDeclare) {
        if (!(isArray(orig)) && !(isArray(override)) && Meta.objectEquals(orig, override)) {
            return orig;
        }
        var /** @type {?} */ l1 = Meta.toList(orig);
        var /** @type {?} */ l2 = Meta.toList(override);
        var /** @type {?} */ result = ListWrapper.clone(l1);
        ListWrapper.addElementsIfAbsent(result, l2);
        return result;
    };
    return PropertyMerger_List;
}());
/**
 * PropertyMerger for properties the should be unioned as lists
 */
export { PropertyMerger_List };
function PropertyMerger_List_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMerger_List.prototype._meta;
}
/**
 * PropertyMerger for properties the should override normally, but return lists when
 * in declare mode (e.g. 'class', 'field', 'layout', ...)
 */
var /**
 * PropertyMerger for properties the should override normally, but return lists when
 * in declare mode (e.g. 'class', 'field', 'layout', ...)
 */
PropertyMergerDeclareList = /** @class */ (function (_super) {
    tslib_1.__extends(PropertyMergerDeclareList, _super);
    function PropertyMergerDeclareList() {
        return _super.call(this) || this;
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    PropertyMergerDeclareList.prototype.merge = /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    function (orig, override, isDeclare) {
        if (!isDeclare) {
            return override;
        }
        if (!(isArray(orig)) && !(isArray(override)) && Meta.objectEquals(orig, override)) {
            return orig;
        }
        var /** @type {?} */ result = [];
        ListWrapper.addElementsIfAbsent(result, Meta.toList(orig));
        ListWrapper.addElementsIfAbsent(result, Meta.toList(override));
        return result;
    };
    /**
     * @return {?}
     */
    PropertyMergerDeclareList.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'PropertyMergerDeclareList';
    };
    return PropertyMergerDeclareList;
}(PropertyMergerDynamic));
/**
 * PropertyMerger for properties the should override normally, but return lists when
 * in declare mode (e.g. 'class', 'field', 'layout', ...)
 */
export { PropertyMergerDeclareList };
/**
 * PropertyMerger for the 'trait' property.  Generally, traits are unioned, except for traits
 * from the same 'traitGroup', which override (i.e. only one trait from each traitGroup should
 * survive).
 */
var /**
 * PropertyMerger for the 'trait' property.  Generally, traits are unioned, except for traits
 * from the same 'traitGroup', which override (i.e. only one trait from each traitGroup should
 * survive).
 */
PropertyMergerDeclareListForTrait = /** @class */ (function (_super) {
    tslib_1.__extends(PropertyMergerDeclareListForTrait, _super);
    function PropertyMergerDeclareListForTrait() {
        return _super.call(this) || this;
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    PropertyMergerDeclareListForTrait.prototype.merge = /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    function (orig, override, isDeclare) {
        if (isDeclare) {
            return _super.prototype.merge.call(this, orig, override, isDeclare);
        }
        // if we're override a single element with itself, don't go List...
        if (!isArray(orig) && !isArray(override) && Meta.objectEquals(orig, override)) {
            return orig;
        }
        var /** @type {?} */ origL = Meta.toList(orig);
        var /** @type {?} */ overrideL = Meta.toList(override);
        var /** @type {?} */ result = [];
        try {
            for (var origL_1 = tslib_1.__values(origL), origL_1_1 = origL_1.next(); !origL_1_1.done; origL_1_1 = origL_1.next()) {
                var trait = origL_1_1.value;
                if (trait instanceof OverrideValue) {
                    trait = (/** @type {?} */ (trait)).value();
                }
                var /** @type {?} */ canAdd = true;
                var /** @type {?} */ group = this._meta.groupForTrait(trait);
                if (isPresent(group)) {
                    try {
                        for (var overrideL_1 = tslib_1.__values(overrideL), overrideL_1_1 = overrideL_1.next(); !overrideL_1_1.done; overrideL_1_1 = overrideL_1.next()) {
                            var overrideTrait = overrideL_1_1.value;
                            if (overrideTrait instanceof OverrideValue) {
                                overrideTrait = (/** @type {?} */ (overrideTrait)).value();
                            }
                            if (group === this._meta.groupForTrait(overrideTrait)) {
                                canAdd = false;
                                break;
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (overrideL_1_1 && !overrideL_1_1.done && (_a = overrideL_1.return)) _a.call(overrideL_1);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                }
                if (canAdd) {
                    result.push(trait);
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (origL_1_1 && !origL_1_1.done && (_b = origL_1.return)) _b.call(origL_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        ListWrapper.addElementsIfAbsent(result, overrideL);
        return result;
        var e_8, _b, e_7, _a;
    };
    /**
     * @return {?}
     */
    PropertyMergerDeclareListForTrait.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'PropertyMergerDeclareListForTrait';
    };
    return PropertyMergerDeclareListForTrait;
}(PropertyMergerDeclareList));
/**
 * PropertyMerger for the 'trait' property.  Generally, traits are unioned, except for traits
 * from the same 'traitGroup', which override (i.e. only one trait from each traitGroup should
 * survive).
 */
export { PropertyMergerDeclareListForTrait };
function PropertyMergerDeclareListForTrait_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMergerDeclareListForTrait.prototype._meta;
}
/**
 * PropertyMerger implementing AND semantics -- i.e. false trumps true.
 * (Used, for instance, for the properties 'visible' and 'editable')
 */
var /**
 * PropertyMerger implementing AND semantics -- i.e. false trumps true.
 * (Used, for instance, for the properties 'visible' and 'editable')
 */
PropertyMerger_And = /** @class */ (function (_super) {
    tslib_1.__extends(PropertyMerger_And, _super);
    function PropertyMerger_And() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isPropMergerIsChainingMark = true;
        return _this;
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    PropertyMerger_And.prototype.merge = /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    function (orig, override, isDeclare) {
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
                : BooleanWrapper.boleanValue(override);
        }
        if (isBoolean(override) && BooleanWrapper.boleanValue(override)) {
            return (orig instanceof DynamicPropertyValue) ? orig : BooleanWrapper.boleanValue(override);
        }
        // if one of our values is dynamic, defer
        if ((orig instanceof DynamicPropertyValue || override instanceof DynamicPropertyValue)) {
            return new DeferredOperationChain(this, orig, override);
        }
        return BooleanWrapper.boleanValue(orig) && BooleanWrapper.boleanValue(override);
    };
    /**
     * @return {?}
     */
    PropertyMerger_And.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'AND';
    };
    return PropertyMerger_And;
}(PropertyMergerDynamic));
/**
 * PropertyMerger implementing AND semantics -- i.e. false trumps true.
 * (Used, for instance, for the properties 'visible' and 'editable')
 */
export { PropertyMerger_And };
function PropertyMerger_And_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMerger_And.prototype.isPropMergerIsChainingMark;
}
var PropertyMerger_Valid = /** @class */ (function () {
    function PropertyMerger_Valid() {
        this.isPropMergerIsChainingMark = true;
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    PropertyMerger_Valid.prototype.merge = /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    function (orig, override, isDeclare) {
        /**
                 *
                 *
                 return (isString(override) || ( isBoolean(override) &&
                 !(BooleanWrapper.boleanValue(override)))) ? override : orig;
                 */
        // if first is error (error message or false, it wins), otherwise second
        return (isString(override) || (isBoolean(override) && BooleanWrapper.isFalse(override)))
            ? override : orig;
    };
    /**
     * @return {?}
     */
    PropertyMerger_Valid.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'VALIDATE';
    };
    return PropertyMerger_Valid;
}());
export { PropertyMerger_Valid };
function PropertyMerger_Valid_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMerger_Valid.prototype._meta;
    /** @type {?} */
    PropertyMerger_Valid.prototype.isPropMergerIsChainingMark;
}
/**
 * A group of rules originating from a common source.
 * All rules must be added to the rule base as part of a RuleSet.
 */
var /**
 * A group of rules originating from a common source.
 * All rules must be added to the rule base as part of a RuleSet.
 */
RuleSet = /** @class */ (function () {
    function RuleSet(_meta) {
        this._meta = _meta;
        this._start = 0;
        this._end = 0;
        this._editableStart = -1;
        this._rank = 0;
    }
    /**
     * @return {?}
     */
    RuleSet.prototype.disableRules = /**
     * @return {?}
     */
    function () {
        for (var /** @type {?} */ i = this._start; i < this._end; i++) {
            this._meta._rules[i].disable();
        }
        this._meta.clearCaches();
    };
    Object.defineProperty(RuleSet.prototype, "filePath", {
        get: /**
         * @return {?}
         */
        function () {
            return this._filePath;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} editableOnly
     * @return {?}
     */
    RuleSet.prototype.rules = /**
     * @param {?} editableOnly
     * @return {?}
     */
    function (editableOnly) {
        var /** @type {?} */ result = [];
        var /** @type {?} */ i = (editableOnly) ? (this._editableStart === -1 ? this._end : this._editableStart)
            : this._start;
        for (; i < this._end; i++) {
            var /** @type {?} */ r = this._meta._rules[i];
            if (!r.disabled() && !this._meta.isTraitExportRule(r)) {
                result.push(r);
            }
        }
        return result;
    };
    /**
     * @return {?}
     */
    RuleSet.prototype.startRank = /**
     * @return {?}
     */
    function () {
        return (this._start < this._meta._ruleCount)
            ? this._meta._rules[this._start].rank
            : this._rank - (this._end - this._start);
    };
    /**
     * @return {?}
     */
    RuleSet.prototype.allocateNextRuleEntry = /**
     * @return {?}
     */
    function () {
        return (this._meta._ruleCount > this._end) ? this._meta._ruleCount++ : this._end++;
    };
    Object.defineProperty(RuleSet.prototype, "start", {
        get: /**
         * @return {?}
         */
        function () {
            return this._start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleSet.prototype, "end", {
        get: /**
         * @return {?}
         */
        function () {
            return this._end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleSet.prototype, "editableStart", {
        get: /**
         * @return {?}
         */
        function () {
            return this._editableStart;
        },
        enumerable: true,
        configurable: true
    });
    return RuleSet;
}());
/**
 * A group of rules originating from a common source.
 * All rules must be added to the rule base as part of a RuleSet.
 */
export { RuleSet };
function RuleSet_tsickle_Closure_declarations() {
    /** @type {?} */
    RuleSet.prototype._filePath;
    /** @type {?} */
    RuleSet.prototype._start;
    /** @type {?} */
    RuleSet.prototype._end;
    /** @type {?} */
    RuleSet.prototype._editableStart;
    /** @type {?} */
    RuleSet.prototype._rank;
    /** @type {?} */
    RuleSet.prototype._meta;
}
/**
 * Abstraction for values (or sets of values) that can be matched against others
 * (in the context of Selector key/value) matching.  Subtypes take advantage of
 * the fact that ValueMatches instances globally uniquely represent key/value pairs
 * to enable efficient matching entirely through identity comparison.
 * @record
 */
export function MatchValue() { }
function MatchValue_tsickle_Closure_declarations() {
    /** @type {?} */
    MatchValue.prototype.matches;
    /** @type {?} */
    MatchValue.prototype.updateByAdding;
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
var /**
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
ValueMatches = /** @class */ (function () {
    function ValueMatches(value) {
        this._read = false;
        this._parentSize = 0;
        this._value = value;
    }
    /**
     * @return {?}
     */
    ValueMatches.prototype.checkParent = /**
     * @return {?}
     */
    function () {
        // todo: performance: keep a rule set version # and only do this when the rule set has
        // reloaded
        if (isPresent(this._parent)) {
            this._parent.checkParent();
            var /** @type {?} */ parentArr = this._parent._arr;
            if (isPresent(parentArr) && parentArr[0] !== this._parentSize) {
                this._arr = Match.union(this._arr, parentArr);
                this._parentSize = parentArr[0];
            }
        }
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ValueMatches.prototype.matches = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (!(other instanceof ValueMatches)) {
            return other.matches(this);
        }
        // we recurse up parent chain to do superclass matches
        return (other === this) || (isPresent(this._parent) && this._parent.matches(other));
    };
    /**
     * @param {?} other
     * @return {?}
     */
    ValueMatches.prototype.updateByAdding = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        var /** @type {?} */ multi = new MultiMatchValue();
        multi.data.push(this);
        return multi.updateByAdding(other);
    };
    return ValueMatches;
}());
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
export { ValueMatches };
function ValueMatches_tsickle_Closure_declarations() {
    /** @type {?} */
    ValueMatches.prototype._value;
    /** @type {?} */
    ValueMatches.prototype._read;
    /** @type {?} */
    ValueMatches.prototype._arr;
    /** @type {?} */
    ValueMatches.prototype._parent;
    /** @type {?} */
    ValueMatches.prototype._parentSize;
}
var MultiMatchValue = /** @class */ (function () {
    function MultiMatchValue() {
        this.data = [];
    }
    /**
     * @param {?} other
     * @return {?}
     */
    MultiMatchValue.prototype.matches = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (other instanceof MultiMatchValue) {
            // list / list comparison: any combo can match
            for (var /** @type {?} */ i = 0; i < this.data.length; i++) {
                if (other.matches(this.data[i])) {
                    return true;
                }
            }
        }
        else {
            // single value against array: one must match
            for (var /** @type {?} */ i = 0; i < this.data.length; i++) {
                if (this.data[i].matches(other)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * @param {?} other
     * @return {?}
     */
    MultiMatchValue.prototype.updateByAdding = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (other instanceof MultiMatchValue) {
            var /** @type {?} */ matchValue = /** @type {?} */ (other);
            ListWrapper.addAll(this.data, matchValue.data);
        }
        else {
            this.data.push(other);
        }
        return this;
    };
    return MultiMatchValue;
}());
export { MultiMatchValue };
function MultiMatchValue_tsickle_Closure_declarations() {
    /** @type {?} */
    MultiMatchValue.prototype.data;
}
/**
 * @record
 */
export function ValueQueriedObserver() { }
function ValueQueriedObserver_tsickle_Closure_declarations() {
    /** @type {?} */
    ValueQueriedObserver.prototype.notify;
}
/**
 * Used to transform values into the (static) version they should be indexed / searched under
 * For instance, 'object' may be indexed as true/false (present or not)
 * @record
 */
export function KeyValueTransformer() { }
function KeyValueTransformer_tsickle_Closure_declarations() {
    /** @type {?} */
    KeyValueTransformer.prototype.tranformForMatch;
}
var KeyValueTransformer_KeyPresent = /** @class */ (function () {
    function KeyValueTransformer_KeyPresent() {
    }
    /**
     * @param {?} o
     * @return {?}
     */
    KeyValueTransformer_KeyPresent.prototype.tranformForMatch = /**
     * @param {?} o
     * @return {?}
     */
    function (o) {
        return (isPresent(o) && !(BooleanWrapper.isFalse(o))) ? true : false;
    };
    return KeyValueTransformer_KeyPresent;
}());
export { KeyValueTransformer_KeyPresent };
/**
 * Called on implementing values to allow statically resolvable (but dynamic) values
 * to evaluate/copy themselves for inclusion in a new map (to ensure that a value that
 * derived its value based on a different context doesn't get reused in another)
 * @record
 */
export function PropertyMapAwaking() { }
function PropertyMapAwaking_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMapAwaking.prototype.propertyAwaking;
    /** @type {?} */
    PropertyMapAwaking.prototype.awakeForPropertyMap;
}
/**
 * @param {?} arg
 * @return {?}
 */
export function isPropertyMapAwaking(arg) {
    return isPresent(arg) && isPresent(arg.propertyAwaking);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvbWV0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEtBQUssV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFDSCxNQUFNLEVBQ04sY0FBYyxFQUVkLE1BQU0sRUFDTixPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsVUFBVSxFQUNWLFNBQVMsRUFDVCxRQUFRLEVBQ1IsV0FBVyxFQUNYLE9BQU8sRUFDUCxXQUFXLEVBQ1gsVUFBVSxFQUFFLFlBQVksRUFDeEIsS0FBSyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLGFBQWEsRUFDYixhQUFhLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFDLHNCQUFzQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDOUUsT0FBTyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBb0lsQztzQkFyRmlCLElBQUksS0FBSyxFQUFROzBCQUNiLENBQUM7MEJBQ1MsSUFBSSxHQUFHLEVBQWU7MEJBR3hCLENBQUM7a0NBQ08sQ0FBQzt3QkFFRyxJQUFJLEdBQUcsRUFBbUI7NkJBRWhDLElBQUksS0FBSyxDQUFVLElBQUksQ0FBQyxXQUFXLENBQUM7a0NBRW5FLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBc0I7bUNBRWhELElBQUksV0FBVyxDQUFDLFVBQVUsRUFBNEI7OEJBRWpDLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBWTttQ0FDSCxJQUFJLEdBQUcsRUFBMkI7K0JB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LFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Q0FDM0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbi8vIHRvZG86IHRyeSB0byBnZXQgcmlkIG9mIHRoaXMgbGlicmFyeVxuaW1wb3J0ICogYXMgQ29sbGVjdGlvbnMgZnJvbSAndHlwZXNjcmlwdC1jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIGFzc2VydCxcbiAgICBCb29sZWFuV3JhcHBlcixcbiAgICBDb21wb3NpdGVUeXBlLFxuICAgIGVxdWFscyxcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNCb29sZWFuLFxuICAgIGlzRW50aXR5LFxuICAgIGlzRnVuY3Rpb24sXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIGlzU3RyaW5nTWFwLFxuICAgIGlzVmFsdWUsXG4gICAgTGlzdFdyYXBwZXIsXG4gICAgTWFwV3JhcHBlciwgb2JqZWN0VG9OYW1lLFxuICAgIHByaW50LFxuICAgIHNoaWZ0TGVmdCxcbiAgICBzaGlmdFJpZ2h0LFxuICAgIFN0cmluZ0pvaW5lcixcbiAgICBTdHJpbmdXcmFwcGVyLFxuICAgIHVuaW1wbGVtZW50ZWRcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge01hdGNoLCBNYXRjaFJlc3VsdCwgVW5pb25NYXRjaFJlc3VsdH0gZnJvbSAnLi9tYXRjaCc7XG5pbXBvcnQge1J1bGVMb2FkZXJ9IGZyb20gJy4vcnVsZS1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQge0RlZmVycmVkT3BlcmF0aW9uQ2hhaW4sIER5bmFtaWNQcm9wZXJ0eVZhbHVlfSBmcm9tICcuL3Byb3BlcnR5LXZhbHVlJztcbmltcG9ydCB7UnVsZSwgU2VsZWN0b3J9IGZyb20gJy4vcnVsZSc7XG5cbi8qKlxuICogTWV0YSBpcyB0aGUgY29yZSBjbGFzcyBpbiBNZXRhVUkuICBBbiBpbnN0YW5jZSBvZiBtZXRhIHJlcHJlc2VudHMgYSAnUnVsZSBCYXNlJyAoYSByZXBvc2l0b3J5XG4gKiBydWxlcyksIGFuZCB0aGlzIHJ1bGUgYmFzZSBpcyB1c2VkIHRvIGNvbXB1dGUgcHJvcGVydHkgbWFwcyBiYXNlZCBvbiBhIHNlcmllcyBvZiBrZXkvdmFsdWVcbiAqIGNvbnN0cmFpbnRzICh0eXBpY2FsbHkgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmFsdWVzIGluIGEgQ29udGV4dCBpbnN0YW5jZSkuXG4gKlxuICogTWV0YSB3b3JrcyBpbiBjb25jZXJ0IHdpdGggTWF0Y2guTWF0Y2hSZXN1bHQgdG8gY2FjaGUgcGFydGlhbCBtYXRjaGVzIChtYXRjaCB0cmVlcykgd2l0aCBjYWNoZWRcbiAqIGNvbXB1dGVkIHByb3BlcnR5IG1hcHMuIE1ldGEgaXMgZ2VuZXJhbGx5IHVzZWQgYnkgd2F5IG9mIGl0cyBzdWJjbGFzc2VzIE9iamVjdE1ldGEgYW5kIFVJTWV0YVxuICogKHdoaWNoIGV4dGVuZCBNZXRhIHdpdGggYmVoYXZpb3JzIGFyb3VuZCBhdXRvLWNyZWF0aW5nIHJ1bGVzIGZvciByZWZlcmVuY2VzIFR5cGVzY3JpcHRzIGNsYXNzZXNcbiAqIGFuZCBkeW5hbWljIHByb3BlcnRpZXMgZm9yIGZpZWxkIGFuZCBsYXlvdXQgem9uaW5nKVxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBNZXRhIHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgS2V5QW55OiBzdHJpbmcgPSAnKic7XG4gICAgc3RhdGljIHJlYWRvbmx5IEtleURlY2xhcmU6IHN0cmluZyA9ICdkZWNsYXJlJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgS2V5VHJhaXQ6IHN0cmluZyA9ICd0cmFpdCc7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgTG93UnVsZVByaW9yaXR5OiBudW1iZXIgPSAtMTAwMDAwO1xuICAgIHN0YXRpYyByZWFkb25seSBTeXN0ZW1SdWxlUHJpb3JpdHk6IG51bWJlciA9IC0yMDAwMDA7XG4gICAgc3RhdGljIHJlYWRvbmx5IENsYXNzUnVsZVByaW9yaXR5OiBudW1iZXIgPSAtMTAwMDAwO1xuICAgIHN0YXRpYyByZWFkb25seSBUZW1wbGF0ZVJ1bGVQcmlvcml0eTogbnVtYmVyID0gMTAwMDAwO1xuICAgIHN0YXRpYyByZWFkb25seSBFZGl0b3JSdWxlUHJpb3JpdHk6IG51bWJlciA9IDIwMDAwMDtcblxuICAgIHN0YXRpYyByZWFkb25seSBNYXhLZXlEYXRhczogbnVtYmVyID0gNjQ7XG4gICAgc3RhdGljIHJlYWRvbmx5IE51bGxNYXJrZXI6IGFueSA9IHttYXJrZXJudWxsOiB0cnVlfTtcblxuICAgIHN0YXRpYyByZWFkb25seSBTY29wZUtleTogc3RyaW5nID0gJ3Njb3BlS2V5JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgRGVjbFJ1bGU6IHN0cmluZyA9ICdkZWNsUnVsZSc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFBhcnRpYWxJbmRleGluZyBpbmRleGVzIGVhY2ggcnVsZSBieSBhIHNpbmdsZSAod2VsbCBjaG9zZW4pIGtleSBhbmQgZXZhbHVhdGVzIG90aGVyIHBhcnRzIG9mXG4gICAgICogdGhlIHNlbGVjdG9yIG9uIHRoZSBpbmRleC1maWx0ZXJlZCBtYXRjaGVzIChnZW5lcmFsbHkgdGhpcyBpcyBhICB3aW4gc2luY2UgbWF5IHNlbGVjdG9ycyBhcmVcbiAgICAgKiBub3Qgc2VsZWN0aXZlLCByZXN1bHRpbmcgaW4gaHVnZSBydWxlIHZlY3RvcnMpXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgX1VzZVBhcnRpYWxJbmRleGluZzogYm9vbGVhbiA9IHRydWU7XG4gICAgc3RhdGljIF9EZWJ1Z0RvdWJsZUNoZWNrTWF0Y2hlczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc3RhdGljIFByb3BlcnR5TWVyZ2VyX0RlY2xhcmVMaXN0OiBhbnkgPSBudWxsO1xuICAgIHN0YXRpYyBQcm9wZXJ0eU1lcmdlcl9UcmFpdHM6IGFueSA9IG51bGw7XG4gICAgc3RhdGljIFByb3BlcnR5TWVyZ2VyX0xpc3Q6IGFueSA9IG51bGw7XG4gICAgc3RhdGljIFRyYW5zZm9ybWVyX0tleVByZXNlbnQ6IGFueSA9IG51bGw7XG5cblxuICAgIF9ydWxlczogUnVsZVtdID0gbmV3IEFycmF5PFJ1bGU+KCk7XG4gICAgX3J1bGVDb3VudDogbnVtYmVyID0gMDtcbiAgICBfdGVzdFJ1bGVzOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgIHByb3RlY3RlZCBfY3VycmVudFJ1bGVTZXQ6IFJ1bGVTZXQ7XG4gICAgcHJpdmF0ZSBfbmV4dEtleUlkOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3J1bGVTZXRHZW5lcmF0aW9uOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBfa2V5RGF0YTogTWFwPHN0cmluZywgS2V5RGF0YT4gPSBuZXcgTWFwPHN0cmluZywgS2V5RGF0YT4oKTtcblxuICAgIHByaXZhdGUgX2tleURhdGFzQnlJZDogS2V5RGF0YVtdID0gbmV3IEFycmF5PEtleURhdGE+KE1ldGEuTWF4S2V5RGF0YXMpO1xuICAgIHByaXZhdGUgX01hdGNoVG9Qcm9wc0NhY2hlOiBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PE1hdGNoLCBQcm9wZXJ0eU1hcD4gPVxuICAgICAgICBuZXcgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxNYXRjaCwgUHJvcGVydHlNYXA+KCk7XG4gICAgcHJpdmF0ZSBfUHJvcGVydHlNYXBVbmlxdWVyOiBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PFByb3BlcnR5TWFwLCBQcm9wZXJ0eU1hcD4gPVxuICAgICAgICBuZXcgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxQcm9wZXJ0eU1hcCwgUHJvcGVydHlNYXA+KCk7XG5cbiAgICBwcml2YXRlIF9pZGVudGl0eUNhY2hlID0gbmV3IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+KCk7XG4gICAgcHJpdmF0ZSBfbWFuYWdlckZvclByb3BlcnR5OiBNYXA8c3RyaW5nLCBQcm9wZXJ0eU1hbmFnZXI+ID0gbmV3IE1hcDxzdHJpbmcsIFByb3BlcnR5TWFuYWdlcj4oKTtcblxuXG4gICAgcHJpdmF0ZSBfZGVjbGFyZUtleU1hc2s6IG51bWJlciA9IDA7XG5cbiAgICBwcm90ZWN0ZWQgX3J1bGVMb2FkZXI6IFJ1bGVMb2FkZXI7XG5cblxuICAgIC8qXG4gICAgIEEgZmV3IGhhbmR5IHV0aWxpdGllcyAoZm9yIHdoaWNoIHdlIHByb2JhYmx5IGFscmVhZHkgaGF2ZSBzdXBlcmlvciB2ZXJzaW9ucyBlbHNld2hlcmUpXG4gICAgICovXG4gICAgc3RhdGljIGJvb2xlYW5WYWx1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvTGlzdCh2YWx1ZTogYW55KTogQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiAoaXNBcnJheSh2YWx1ZSkpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgIH1cblxuICAgIHN0YXRpYyBvYmplY3RFcXVhbHMob25lOiBhbnksIHR3bzogYW55KSB7XG4gICAgICAgIGlmIChpc0JsYW5rKG9uZSkgJiYgaXNCbGFuayh0d28pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCbGFuayhvbmUpIHx8IGlzQmxhbmsodHdvKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcXVhbHMob25lLCB0d28pO1xuICAgIH1cblxuICAgIHN0YXRpYyBvdmVycmlkZUtleUZvcktleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBrZXkgKyAnX28nO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUcmFpdHModHJhaXRzOiBzdHJpbmdbXSwgbWFwOiBNYXA8c3RyaW5nLCBhbnk+KTogdm9pZCB7XG4gICAgICAgIGxldCBjdXJyZW50OiBzdHJpbmdbXSA9IG1hcC5nZXQoTWV0YS5LZXlUcmFpdCk7XG4gICAgICAgIGlmIChpc0JsYW5rKGN1cnJlbnQpKSB7XG4gICAgICAgICAgICBtYXAuc2V0KE1ldGEuS2V5VHJhaXQsIHRyYWl0cyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEFsbChjdXJyZW50LCB0cmFpdHMpO1xuICAgICAgICAgICAgbWFwLnNldChNZXRhLktleVRyYWl0LCBjdXJyZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUcmFpdCh0cmFpdDogc3RyaW5nLCBtYXA6IE1hcDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ6IHN0cmluZ1tdID0gbWFwLmdldChNZXRhLktleVRyYWl0KTtcbiAgICAgICAgaWYgKGlzQmxhbmsoY3VycmVudCkpIHtcbiAgICAgICAgICAgIG1hcC5zZXQoTWV0YS5LZXlUcmFpdCwgTWV0YS50b0xpc3QodHJhaXQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnQucHVzaCh0cmFpdCk7XG4gICAgICAgICAgICBtYXAuc2V0KE1ldGEuS2V5VHJhaXQsIGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY2xhc3NOYW1lKG9iamVjdDogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nTWFwKG9iamVjdCkgJiYgKGlzRW50aXR5KG9iamVjdCkgfHwgaXNWYWx1ZShvYmplY3QpKSkge1xuICAgICAgICAgICAgcmV0dXJuICg8Q29tcG9zaXRlVHlwZT5vYmplY3QpLmNsYXNzTmFtZSgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmdNYXAob2JqZWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdFRvTmFtZShvYmplY3QpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihvYmplY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0Lm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCA9IG5ldyBQcm9wZXJ0eU1lcmdlckRlY2xhcmVMaXN0KCk7XG4gICAgICAgIE1ldGEuUHJvcGVydHlNZXJnZXJfVHJhaXRzID0gbmV3IFByb3BlcnR5TWVyZ2VyRGVjbGFyZUxpc3RGb3JUcmFpdCgpO1xuICAgICAgICBNZXRhLlByb3BlcnR5TWVyZ2VyX0xpc3QgPSBuZXcgUHJvcGVydHlNZXJnZXJfTGlzdCgpO1xuICAgICAgICBNZXRhLlRyYW5zZm9ybWVyX0tleVByZXNlbnQgPSBuZXcgS2V5VmFsdWVUcmFuc2Zvcm1lcl9LZXlQcmVzZW50KCk7XG5cblxuICAgICAgICB0aGlzLl9kZWNsYXJlS2V5TWFzayA9IHRoaXMua2V5RGF0YShNZXRhLktleURlY2xhcmUpLm1hc2tWYWx1ZSgpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoTWV0YS5LZXlUcmFpdCwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9UcmFpdHMpO1xuXG5cbiAgICAgICAgbGV0IG5vb3BydWxlOiBSdWxlID0gbmV3IFJ1bGUobnVsbCwgbnVsbCwgMCwgMCk7XG4gICAgICAgIG5vb3BydWxlLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5fcnVsZXNbMF0gPSBub29wcnVsZTtcbiAgICAgICAgdGhpcy5fcnVsZUNvdW50ID0gMTtcbiAgICB9XG5cbiAgICByZWdpc3RlckxvYWRlcihsb2FkZXI6IFJ1bGVMb2FkZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcnVsZUxvYWRlciA9IGxvYWRlcjtcbiAgICB9XG5cbiAgICBhZGRSdWxlKHJ1bGU6IFJ1bGUpOiB2b2lkIHtcblxuICAgICAgICBsZXQgc2VsZWN0b3JzOiBBcnJheTxTZWxlY3Rvcj4gPSBydWxlLnNlbGVjdG9ycztcblxuICAgICAgICBpZiAoc2VsZWN0b3JzLmxlbmd0aCA+IDAgJiYgc2VsZWN0b3JzW3NlbGVjdG9ycy5sZW5ndGggLSAxXS5pc0RlY2wpIHtcbiAgICAgICAgICAgIGxldCBkZWNsID0gcnVsZS5jcmVhdGVEZWNsKCk7XG4gICAgICAgICAgICB0aGlzLl9hZGRSdWxlKGRlY2wsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2UgYWxsb3cgbnVsbCB0byBlbmFibGUgY3JlYXRpb24gb2YgYSBkZWNsLCBidXQgb3RoZXJ3aXNlIHRoaXMgcnVsZSBoYXMgbm8gZWZmZWN0XG4gICAgICAgIGlmIChpc1ByZXNlbnQocnVsZS5wcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgLy8gQWZ0ZXIgd2UndmUgY2FwdHVyZWQgdGhlIGRlY2wsIGRvIHRoZSBjb2xsYXBzZVxuICAgICAgICAgICAgcnVsZS5fc2VsZWN0b3JzID0gcnVsZS5jb252ZXJ0S2V5T3ZlcnJpZGVzKHJ1bGUuX3NlbGVjdG9ycyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRSdWxlKHJ1bGUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBfYWRkVG9SdWxlcyhydWxlOiBSdWxlLCBwb3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9ydWxlc1twb3NdID0gcnVsZTtcbiAgICB9XG5cblxuICAgIC8vIHRvZG86IFRFU1QgdW5pdCB0ZXN0IHRoaXNcbiAgICBfYWRkUnVsZShydWxlOiBSdWxlLCBjaGVja1Byb3BTY29wZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuX2N1cnJlbnRSdWxlU2V0KSwgJ0F0dGVtcHQgdG8gYWRkIHJ1bGUgd2l0aG91dCBjdXJyZW50IFJ1bGVTZXQnKTtcbiAgICAgICAgbGV0IHNlbGVjdG9yczogQXJyYXk8U2VsZWN0b3I+ID0gcnVsZS5fc2VsZWN0b3JzO1xuXG4gICAgICAgIGxldCBlbnRyeUlkOiBudW1iZXIgPSB0aGlzLl9jdXJyZW50UnVsZVNldC5hbGxvY2F0ZU5leHRSdWxlRW50cnkoKTtcbiAgICAgICAgcnVsZS5pZCA9IGVudHJ5SWQ7XG4gICAgICAgIGlmIChydWxlLnJhbmsgPT09IDApIHtcbiAgICAgICAgICAgIHJ1bGUucmFuayA9IHRoaXMuX2N1cnJlbnRSdWxlU2V0Ll9yYW5rKys7XG4gICAgICAgIH1cbiAgICAgICAgcnVsZS5ydWxlU2V0ID0gdGhpcy5fY3VycmVudFJ1bGVTZXQ7XG4gICAgICAgIHRoaXMuX2FkZFRvUnVsZXMocnVsZSwgZW50cnlJZCk7XG5cbiAgICAgICAgLy8gaW5kZXggaXRcbiAgICAgICAgbGV0IGxhc3RTY29wZUtleURhdGE6IEtleURhdGE7XG4gICAgICAgIGxldCBkZWNsS2V5OiBzdHJpbmc7XG4gICAgICAgIGxldCBkZWNsTWFzazogbnVtYmVyID0gdGhpcy5kZWNsYXJlS2V5TWFzaztcbiAgICAgICAgbGV0IG1hdGNoTWFzayA9IDAsIGluZGV4ZWRNYXNrID0gMCwgYW50aU1hc2sgPSAwO1xuICAgICAgICBsZXQgY291bnQgPSBzZWxlY3RvcnMubGVuZ3RoO1xuXG4gICAgICAgIGxldCBpbmRleE9ubHlTZWxlY3RvcjogU2VsZWN0b3IgPSBNZXRhLl9Vc2VQYXJ0aWFsSW5kZXhpbmcgPyB0aGlzLmJlc3RTZWxlY3RvclRvSW5kZXgoXG4gICAgICAgICAgICBzZWxlY3RvcnMpIDogbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvdW50IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBwOiBTZWxlY3RvciA9IHNlbGVjdG9yc1tpXTtcblxuICAgICAgICAgICAgbGV0IHNob3VsZEluZGV4OiBib29sZWFuID0gKGluZGV4T25seVNlbGVjdG9yID09PSBudWxsIHx8IHAgPT09IGluZGV4T25seVNlbGVjdG9yKTtcblxuICAgICAgICAgICAgbGV0IGRhdGE6IEtleURhdGEgPSB0aGlzLmtleURhdGEocC5rZXkpO1xuICAgICAgICAgICAgbGV0IGRhdGFNYXNrOiBudW1iZXIgPSBkYXRhLm1hc2tWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzTnVsbE1hcmtlcihwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRJbmRleCB8fCBNZXRhLl9EZWJ1Z0RvdWJsZUNoZWNrTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBwLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hZGRFbnRyeSh2LCBlbnRyeUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hZGRFbnRyeShwLnZhbHVlLCBlbnRyeUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZWRNYXNrIHw9IHNoaWZ0TGVmdCgxLCBkYXRhLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXNob3VsZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgc2VsZWN0b3IgZm9yIGRpcmVjdCBldmFsdWF0aW9uXG4gICAgICAgICAgICAgICAgICAgIHAuYmluZFRvS2V5RGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWF0Y2hNYXNrIHw9IGRhdGFNYXNrO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaXNQcm9wZXJ0eVNjb3BlICYmIGlzQmxhbmsobGFzdFNjb3BlS2V5RGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNjb3BlS2V5RGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoZGF0YU1hc2sgJiBkZWNsTWFzaykgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjbEtleSA9IHAudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbnRpTWFzayB8PSBkYXRhTWFzaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaXNEZWNsOiBib29sZWFuID0gaXNQcmVzZW50KGRlY2xLZXkpO1xuICAgICAgICBsZXQgbm9uU2NvcGVLZXlEZWNsOiBib29sZWFuID0gaXNQcmVzZW50KGRlY2xLZXkpICYmICF0aGlzLmtleURhdGEoZGVjbEtleSkuaXNQcm9wZXJ0eVNjb3BlO1xuICAgICAgICBpZiAoIWlzRGVjbCB8fCBub25TY29wZUtleURlY2wpIHtcblxuICAgICAgICAgICAgLy8gYWxsIG5vbi1kZWNsIHJ1bGVzIGRvbid0IGFwcGx5IG91dHNpZGUgZGVjbCBjb250ZXh0XG4gICAgICAgICAgICBpZiAoIWlzRGVjbCkge1xuICAgICAgICAgICAgICAgIGFudGlNYXNrIHw9IGRlY2xNYXNrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGxhc3RTY29wZUtleURhdGEpICYmIGNoZWNrUHJvcFNjb3BlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRyYWl0VmFsID0gcnVsZS5wcm9wZXJ0aWVzLmdldChNZXRhLktleVRyYWl0KTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0cmFpdFZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyYWl0S2V5OiBzdHJpbmcgPSBsYXN0U2NvcGVLZXlEYXRhLl9rZXkgKyAnX3RyYWl0JztcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcGVydGllcyA9IE1hcFdyYXBwZXIuY3JlYXRlRW1wdHk8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuc2V0KHRyYWl0S2V5LCB0cmFpdFZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyYWl0UnVsZTogUnVsZSA9IG5ldyBSdWxlKHJ1bGUuX3NlbGVjdG9ycywgcHJvcGVydGllcywgcnVsZS5yYW5rLFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVsZS5saW5lTnVtYmVyKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRSdWxlKHRyYWl0UnVsZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJ1bGUuX3NlbGVjdG9ycyA9IHNlbGVjdG9ycy5zbGljZSgwKTtcblxuICAgICAgICAgICAgICAgIGxldCBzY29wZVNlbDogU2VsZWN0b3IgPSBuZXcgU2VsZWN0b3IoTWV0YS5TY29wZUtleSwgbGFzdFNjb3BlS2V5RGF0YS5rZXkpO1xuICAgICAgICAgICAgICAgIHJ1bGUuc2VsZWN0b3JzLnB1c2goc2NvcGVTZWwpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE6IEtleURhdGEgPSB0aGlzLmtleURhdGEoTWV0YS5TY29wZUtleSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIU1ldGEuX1VzZVBhcnRpYWxJbmRleGluZyB8fCBNZXRhLl9EZWJ1Z0RvdWJsZUNoZWNrTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmFkZEVudHJ5KGxhc3RTY29wZUtleURhdGEuX2tleSwgZW50cnlJZCk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ZWRNYXNrIHw9IHNoaWZ0TGVmdCgxLCBkYXRhLl9pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlU2VsLmJpbmRUb0tleURhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hNYXNrIHw9IHNoaWZ0TGVmdCgxLCBkYXRhLl9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcnVsZS5rZXlNYXRjaGVzTWFzayA9IG1hdGNoTWFzaztcbiAgICAgICAgcnVsZS5rZXlJbmRleGVkTWFzayA9IGluZGV4ZWRNYXNrO1xuICAgICAgICBydWxlLmtleUFudGlNYXNrID0gYW50aU1hc2s7XG4gICAgfVxuXG4gICAgYmVzdFNlbGVjdG9yVG9JbmRleChzZWxlY3RvcnM6IEFycmF5PFNlbGVjdG9yPik6IFNlbGVjdG9yIHtcbiAgICAgICAgbGV0IGJlc3Q6IFNlbGVjdG9yO1xuICAgICAgICBsZXQgYmVzdFJhbmsgPSBOdW1iZXIuTUlOX1ZBTFVFO1xuICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgZm9yIChsZXQgc2VsIG9mICBzZWxlY3RvcnMpIHtcbiAgICAgICAgICAgIGxldCByYW5rID0gdGhpcy5zZWxlY3Rpdml0eVJhbmsoc2VsKSArIHBvcysrO1xuICAgICAgICAgICAgaWYgKHJhbmsgPiBiZXN0UmFuaykge1xuICAgICAgICAgICAgICAgIGJlc3QgPSBzZWw7XG4gICAgICAgICAgICAgICAgYmVzdFJhbmsgPSByYW5rO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0O1xuICAgIH1cblxuICAgIHNlbGVjdGl2aXR5UmFuayhzZWxlY3RvcjogU2VsZWN0b3IpOiBudW1iZXIge1xuICAgICAgICAvLyBTY29yZSBzZWxlY3RvcnM6IGdvb2QgaWYgcHJvcGVydHkgc2NvcGUsIGtleSAhPT0gJyonIG9yIGJvb2xcbiAgICAgICAgLy8gJyonIGlzIHBhcnRpY3VsYXJseSBiYWQsIHNpbmNlIHRoZXNlIGFyZSBpbmhlcml0ZWQgYnkgYWxsIG90aGVyc1xuICAgICAgICBsZXQgc2NvcmUgPSAxO1xuICAgICAgICBsZXQgdmFsdWUgPSBzZWxlY3Rvci52YWx1ZTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSAmJiAhKE1ldGEuS2V5QW55ID09PSB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHNjb3JlICs9IChpc0Jvb2xlYW4odmFsdWUpID8gMSA6IDkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGtleURhdGE6IEtleURhdGEgPSB0aGlzLmtleURhdGEoc2VsZWN0b3Iua2V5KTtcbiAgICAgICAgaWYgKGtleURhdGEuaXNQcm9wZXJ0eVNjb3BlKSB7XG4gICAgICAgICAgICBzY29yZSAqPSA1O1xuICAgICAgICB9XG4gICAgICAgIC8vIFRvZG86IHdlIGNvdWxkIHNjb3JlIGJhc2VkIG9uICMgb2YgZW50cmllcyBpbiBLZXlEYXRhXG4gICAgICAgIHJldHVybiBzY29yZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIGlmIGFkZGl0aW9uIG9mIHRoaXMgcnVsZSByZXN1bHRzIGluIGFkZGl0aW9uIG9mIGV4dHJhIHJ1bGVzLCB0aG9zZSBhcmUgcmV0dXJuZWRcbiAgICAgKiAobnVsbCBvdGhlcndpc2UpXG4gICAgICovXG4gICAgX2VkaXRpbmdSdWxlRW5kKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCh0aGlzLl9jdXJyZW50UnVsZVNldC5lbmQsIHRoaXMuX3J1bGVDb3VudCk7XG4gICAgfVxuXG5cbiAgICBfYWRkUnVsZUFuZFJldHVybkV4dHJhcyhydWxlOiBSdWxlKTogQXJyYXk8UnVsZT4ge1xuICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLl9lZGl0aW5nUnVsZUVuZCgpO1xuICAgICAgICBsZXQgZXh0cmFzOiBBcnJheTxSdWxlPjtcblxuICAgICAgICB0aGlzLmFkZFJ1bGUocnVsZSk7XG5cbiAgICAgICAgLy8gUmV0dXJuIGFueSBleHRyYSBydWxlcyBjcmVhdGVkIGJ5IGFkZGl0aW9uIG9mIHRoaXMgb25lXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydCwgYyA9IHRoaXMuX2VkaXRpbmdSdWxlRW5kKCk7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByID0gdGhpcy5fcnVsZXNbaV07XG4gICAgICAgICAgICBpZiAociAhPT0gcnVsZSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKGV4dHJhcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFzID0gbmV3IEFycmF5PFJ1bGU+KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV4dHJhcy5wdXNoKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRyYXM7XG4gICAgfVxuXG4gICAgLy8gSWNreSBtZXRob2QgdG8gcmVwbGFjZSBhbiBleGl0ZWQgcnVsZSBpbiBwbGFjZVxuICAgIF91cGRhdGVFZGl0ZWRSdWxlKHJ1bGU6IFJ1bGUsIGV4dHJhczogQXJyYXk8UnVsZT4pOiBBcnJheTxSdWxlPiB7XG4gICAgICAgIC8vIGluIHBsYWNlIHJlcGxhY2UgZXhpc3RpbmcgcnVsZSB3aXRoIE5vT3BcbiAgICAgICAgbGV0IG5vb3BydWxlOiBSdWxlID0gbmV3IFJ1bGUobnVsbCwgbnVsbCwgMCwgMCk7XG4gICAgICAgIG5vb3BydWxlLmRpc2FibGUoKTtcblxuICAgICAgICB0aGlzLl9ydWxlc1tydWxlLmlkXSA9IG5vb3BydWxlO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoZXh0cmFzKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgciBvZiBleHRyYXMpIHtcbiAgICAgICAgICAgICAgICByLmRpc2FibGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNpbmNlIHRoaXMgcnVsZSBoYXMgYWxyZWFkeSBiZWVuIG11dGF0ZWQgKHRoZSBmaXJzdCB0aW1lIGl0IHdhcyBhZGRlZCkgd2UgbmVlZCB0b1xuICAgICAgICAvLyByZXZlcnNlIHRoZSBhZGRpdGlvbiBvZiB0aGUgc2NvcGVLZXlcbiAgICAgICAgbGV0IHByZWRzID0gcnVsZS5zZWxlY3RvcnM7XG5cbiAgICAgICAgaWYgKChpc1ByZXNlbnQocHJlZHMpICYmIHByZWRzLmxlbmd0aCA+IDApICYmIExpc3RXcmFwcGVyLmxhc3Q8U2VsZWN0b3I+KFxuICAgICAgICAgICAgICAgIHByZWRzKS5rZXkgPT09IE1ldGEuU2NvcGVLZXkpIHtcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZUF0PFNlbGVjdG9yPihwcmVkcywgcHJlZHMubGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyAocmUpLWFkZCBpdCBhbmQgaW52YWxpZGF0ZVxuICAgICAgICBleHRyYXMgPSB0aGlzLl9hZGRSdWxlQW5kUmV0dXJuRXh0cmFzKHJ1bGUpO1xuICAgICAgICB0aGlzLmludmFsaWRhdGVSdWxlcygpO1xuICAgICAgICByZXR1cm4gZXh0cmFzO1xuICAgIH1cblxuXG4gICAgc2NvcGVLZXlGb3JTZWxlY3RvcihwcmVkczogQXJyYXk8U2VsZWN0b3I+KTogc3RyaW5nIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHByZWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgcHJlZCA9IHByZWRzW2ldO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmtleURhdGEocHJlZC5rZXkpO1xuICAgICAgICAgICAgaWYgKGRhdGEuaXNQcm9wZXJ0eVNjb3BlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZWQua2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgYWRkUnVsZUZyb21TZWxlY3Rvck1hcChzZWxlY3Rvck1hcDogTWFwPHN0cmluZywgYW55PiwgcHJvcGVydHlNYXA6IE1hcDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRSdWxlRnJvbVNlbGVjdG9yTWFwV2l0aFJhbmsoc2VsZWN0b3JNYXAsIHByb3BlcnR5TWFwLCAwKTtcbiAgICB9XG5cbiAgICBhZGRSdWxlRnJvbVNlbGVjdG9yTWFwV2l0aFJhbmsoc2VsZWN0b3JNYXA6IE1hcDxzdHJpbmcsIGFueT4sIHByb3BlcnR5TWFwOiBNYXA8c3RyaW5nLCBhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5rOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJ1bGUgPSBuZXcgUnVsZShTZWxlY3Rvci5mcm9tTWFwKHNlbGVjdG9yTWFwKSwgcHJvcGVydHlNYXAsIDAsIC0xKTtcbiAgICAgICAgaWYgKHJhbmsgIT09IDApIHtcbiAgICAgICAgICAgIHJ1bGUucmFuayA9IHJhbms7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRSdWxlKHJ1bGUpO1xuICAgIH1cblxuXG4gICAgYWRkUnVsZXMocnVsZVNldDogTWFwPHN0cmluZywgYW55Piwgc2VsZWN0b3JzOiBBcnJheTxTZWxlY3Rvcj4pIHtcbiAgICAgICAgLy8gU3BlY2lhbCBrZXlzOiAgJ3Byb3BzLCAncnVsZXMnLiAgRXZlcnRoaW5nIGVsc2UgaXMgYSBzZWxlY3RvclxuICAgICAgICBsZXQgcHJvcHM6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgICAgIGxldCBydWxlczogQXJyYXk8TWFwPHN0cmluZywgYW55Pj47XG5cbiAgICAgICAgTWFwV3JhcHBlci5pdGVyYWJsZShydWxlU2V0KS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAncHJvcHMnKSB7XG4gICAgICAgICAgICAgICAgcHJvcHMgPSB2YWx1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdydWxlcycpIHtcbiAgICAgICAgICAgICAgICBydWxlcyA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnMucHVzaChuZXcgU2VsZWN0b3Ioa2V5LCB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHByb3BzKSkge1xuICAgICAgICAgICAgdGhpcy5hZGRSdWxlKG5ldyBSdWxlKHNlbGVjdG9ycywgcHJvcHMsIDApKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHJ1bGVzKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgciBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUnVsZXMociwgc2VsZWN0b3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoaXMgb25lIGV4cGVjdCB0aGF0IHdlIGFscmVhZHkgb3BlbmVkIHRoZSBydWxlc2V0XG4gICAgX2xvYWRSdWxlcyhydWxlVGV4dD86IGFueSwgbW9kdWxlOiBzdHJpbmcgPSAnc3lzdGVtJyxcbiAgICAgICAgICAgICAgIGVkaXRhYmxlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3J1bGVMb2FkZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcnVsZUxvYWRlci5sb2FkUnVsZXModGhpcywgcnVsZVRleHQsIG1vZHVsZSwgKHJ1bGUpID0+IHRoaXMuYWRkUnVsZShydWxlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kUnVsZVNldCgpLmRpc2FibGVSdWxlcygpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBsb2FkaW5nIHJ1bGU6ICcgKyBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbG9hZFJ1bGVzKHJ1bGVUZXh0PzogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xvYWRSdWxlc1dpdGhSdWxlU2V0KCdTdHJpbmdMaXRlcmFsJywgcnVsZVRleHQsIDApO1xuICAgICAgICB0aGlzLmVuZFJ1bGVTZXQoKTtcbiAgICB9XG5cblxuICAgIF9sb2FkUnVsZXNXaXRoUnVsZVNldChmaWxlbmFtZTogc3RyaW5nLCBydWxlVGV4dDogYW55LCByYW5rOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayhyYW5rLCBmaWxlbmFtZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9sb2FkUnVsZXMocnVsZVRleHQpO1xuXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kUnVsZVNldCgpLmRpc2FibGVSdWxlcygpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBsb2FkaW5nIHJ1bGU6ICcgKyBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbG9hZFVzZXJSdWxlKHNvdXJjZTogYW55LCB1c2VyQ2xhc3M6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cblxuICAgIHBhcnNlUHJvcGVydHlBc3NpZ25tZW50KHByb3BTdHJpbmc6IHN0cmluZywgcHJvcGVydHlNYXA6IE1hcDxzdHJpbmcsIGFueT4pOiBzdHJpbmcge1xuICAgICAgICAvLyB0b2RvOiBpbXBsZW1lbnQgdGhpc1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cblxuXG4gICAgY2xlYXJDYWNoZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX01hdGNoVG9Qcm9wc0NhY2hlID0gbmV3IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8TWF0Y2gsIFByb3BlcnR5TWFwPigpO1xuICAgICAgICB0aGlzLl9Qcm9wZXJ0eU1hcFVuaXF1ZXIgPSBuZXcgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxQcm9wZXJ0eU1hcCwgUHJvcGVydHlNYXA+KCk7XG4gICAgICAgIHRoaXMuX2lkZW50aXR5Q2FjaGUgPSBuZXcgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4oKTtcbiAgICB9XG5cblxuICAgIGlzVHJhaXRFeHBvcnRSdWxlKHJ1bGU6IFJ1bGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGlzQmxhbmsocnVsZS5wcm9wZXJ0aWVzKSB8fCBydWxlIHx8IHJ1bGUucHJvcGVydGllcy5zaXplID09PSAxKSB7XG5cbiAgICAgICAgICAgIGxldCBrZXk6IHN0cmluZyA9IEFycmF5LmZyb20ocnVsZS5wcm9wZXJ0aWVzLmtleXMoKSlbMF07XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nV3JhcHBlci5lbmRzV2lkdGgoa2V5LCAnX3RyYWl0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGJlZ2luUnVsZVNldChpZGVudGlmaWNhdG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayh0aGlzLl9ydWxlQ291bnQsIGlkZW50aWZpY2F0b3IpO1xuICAgIH1cblxuXG4gICAgYmVnaW5SdWxlU2V0V2l0aFJhbmsocmFuazogbnVtYmVyLCBmaWxlUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhc3NlcnQoaXNCbGFuayh0aGlzLl9jdXJyZW50UnVsZVNldCksXG4gICAgICAgICAgICAgICAgJ0NhbiB0IHN0YXJ0IG5ldyBydWxlIHNldCB3aGlsZSBvbmUgaW4gcHJvZ3Jlc3MnKTtcblxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFJ1bGVTZXQgPSBuZXcgUnVsZVNldCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRSdWxlU2V0Ll9zdGFydCA9IHRoaXMuX3J1bGVDb3VudDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRSdWxlU2V0Ll9lbmQgPSB0aGlzLl9ydWxlQ291bnQ7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UnVsZVNldC5fcmFuayA9IHJhbms7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UnVsZVNldC5fZmlsZVBhdGggPSBmaWxlUGF0aDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmVnaW5SZXBsYWNlbWVudFJ1bGVTZXQob3JpZzogUnVsZVNldCk6IHZvaWQge1xuICAgICAgICBsZXQgb3JpZ1JhbmsgPSBvcmlnLnN0YXJ0UmFuaygpO1xuICAgICAgICB0aGlzLmJlZ2luUnVsZVNldFdpdGhSYW5rKHRoaXMuX3J1bGVDb3VudCwgb3JpZy5fZmlsZVBhdGgpO1xuICAgICAgICB0aGlzLl9jdXJyZW50UnVsZVNldC5fcmFuayA9IG9yaWdSYW5rO1xuICAgIH1cblxuXG4gICAgZW5kUnVsZVNldCgpOiBSdWxlU2V0IHtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLl9jdXJyZW50UnVsZVNldCksICdObyBydWxlIHNldCBwcm9ncmVzcycpO1xuICAgICAgICBsZXQgcmVzdWx0OiBSdWxlU2V0ID0gdGhpcy5fY3VycmVudFJ1bGVTZXQ7XG4gICAgICAgIGlmICh0aGlzLl9ydWxlQ291bnQgPCByZXN1bHQuX2VuZCkge1xuICAgICAgICAgICAgdGhpcy5fcnVsZUNvdW50ID0gcmVzdWx0Ll9lbmQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudFJ1bGVTZXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9ydWxlU2V0R2VuZXJhdGlvbisrO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBnZXQgcnVsZVNldEdlbmVyYXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3J1bGVTZXRHZW5lcmF0aW9uO1xuICAgIH1cblxuICAgIGludmFsaWRhdGVSdWxlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcnVsZVNldEdlbmVyYXRpb24rKztcbiAgICAgICAgdGhpcy5jbGVhckNhY2hlcygpO1xuICAgIH1cblxuXG4gICAgbmV3Q29udGV4dCgpOiBDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb250ZXh0KHRoaXMpO1xuICAgIH1cblxuICAgIGdldCBkZWNsYXJlS2V5TWFzaygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVjbGFyZUtleU1hc2s7XG4gICAgfVxuXG5cbiAgICAvLyBUb3VjaCBhIGtleS92YWx1ZSB0byBmb3JjZSBwcmUtbG9hZGluZy9yZWdpc3RyYXRpb24gb2YgYXNzb2NpYXRlZCBydWxlIGZpbGVzXG4gICAgdG91Y2goa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm5ld0NvbnRleHQoKTtcbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIGNvbnRleHQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICBjb250ZXh0LmFsbFByb3BlcnRpZXMoKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcbiAgICB9XG5cblxuICAgIHRyYW5zZm9ybVZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgbGV0IGtleURhdGEgPSB0aGlzLl9rZXlEYXRhLmdldChrZXkpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGtleURhdGEpICYmIGlzUHJlc2VudChrZXlEYXRhLl90cmFuc2Zvcm1lcikpIHtcbiAgICAgICAgICAgIHZhbHVlID0ga2V5RGF0YS5fdHJhbnNmb3JtZXIudHJhbmZvcm1Gb3JNYXRjaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIG1hdGNoKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBpbnRlcm1lZGlhdGVSZXN1bHQ6IE1hdGNoUmVzdWx0KTogTWF0Y2hSZXN1bHQge1xuICAgICAgICBsZXQga2V5RGF0YSA9IHRoaXMuX2tleURhdGEuZ2V0KGtleSk7XG4gICAgICAgIGlmIChpc0JsYW5rKGtleURhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJtZWRpYXRlUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGxldCBrZXlNYXNrOiBudW1iZXIgPSBzaGlmdExlZnQoMSwga2V5RGF0YS5faWQpO1xuXG4gICAgICAgIC8vIERvZXMgb3VyIHJlc3VsdCBhbHJlYWR5IGluY2x1ZGUgdGhpcyBrZXk/ICBUaGVuIG5vIG5lZWQgdG8gam9pbiBhZ2FpblxuICAgICAgICAvLyBpZiAoaW50ZXJtZWRpYXRlUmVzdWx0ICE9PSBudWxsICYmIChpbnRlcm1lZGlhdGVSZXN1bHQuX2tleXNNYXRjaGVkTWFzayAmIGtleU1hc2spICE9PVxuICAgICAgICAvLyAwKSByZXR1cm4gaW50ZXJtZWRpYXRlUmVzdWx0O1xuXG4gICAgICAgIHJldHVybiBuZXcgTWF0Y2hSZXN1bHQodGhpcywga2V5RGF0YSwgdmFsdWUsIGludGVybWVkaWF0ZVJlc3VsdCk7XG4gICAgfVxuXG5cbiAgICB1bmlvbk92ZXJyaWRlTWF0Y2goa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgIGludGVybWVkaWF0ZVJlc3VsdDogVW5pb25NYXRjaFJlc3VsdCk6IFVuaW9uTWF0Y2hSZXN1bHQge1xuICAgICAgICBsZXQga2V5RGF0YTogS2V5RGF0YSA9IHRoaXMuX2tleURhdGEuZ2V0KE1ldGEub3ZlcnJpZGVLZXlGb3JLZXkoa2V5KSk7XG4gICAgICAgIGlmIChpc0JsYW5rKGtleURhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJtZWRpYXRlUmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgVW5pb25NYXRjaFJlc3VsdCh0aGlzLCBrZXlEYXRhLCB2YWx1ZSwgaW50ZXJtZWRpYXRlUmVzdWx0KTtcbiAgICB9XG5cbiAgICBuZXdQcm9wZXJ0aWVzTWFwKCk6IFByb3BlcnR5TWFwIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eU1hcCgpO1xuICAgIH1cblxuICAgIHByb3BlcnRpZXNGb3JNYXRjaChtYXRjaFJlc3VsdDogTWF0Y2hSZXN1bHQpOiBQcm9wZXJ0eU1hcCB7XG4gICAgICAgIGxldCBwcm9wZXJ0aWVzOiBQcm9wZXJ0eU1hcCA9IHRoaXMuX01hdGNoVG9Qcm9wc0NhY2hlLmdldFZhbHVlKG1hdGNoUmVzdWx0KTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChwcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wZXJ0aWVzID0gdGhpcy5uZXdQcm9wZXJ0aWVzTWFwKCk7XG5cbiAgICAgICAgbGV0IGFycjogbnVtYmVyW10gPSBtYXRjaFJlc3VsdC5maWx0ZXJlZE1hdGNoZXMoKTtcbiAgICAgICAgaWYgKGlzQmxhbmsoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXJzdCBlbnRyeSBpcyBjb3VudFxuICAgICAgICBsZXQgY291bnQ6IG51bWJlciA9IGFyclswXTtcbiAgICAgICAgbGV0IHJ1bGVzOiBBcnJheTxSdWxlPiA9IG5ldyBBcnJheTxSdWxlPihjb3VudCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBydWxlc1tpXSA9IHRoaXMuX3J1bGVzW2FycltpICsgMV1dO1xuICAgICAgICB9XG5cbiAgICAgICAgTGlzdFdyYXBwZXIuc29ydDxSdWxlPihydWxlcywgKG8xLCBvMikgPT4gbzEucmFuayAtIG8yLnJhbmspO1xuXG4gICAgICAgIGxldCBtb2RpZmllZE1hc2sgPSAwO1xuICAgICAgICBsZXQgZGVjbGFyZUtleTogc3RyaW5nID0gKCh0aGlzLl9kZWNsYXJlS2V5TWFzayAmIG1hdGNoUmVzdWx0LmtleXNNYXRjaGVkTWFzaykgIT09IDApXG4gICAgICAgICAgICA/IG1hdGNoUmVzdWx0LnZhbHVlRm9yS2V5KE1ldGEuS2V5RGVjbGFyZSkgOiBudWxsO1xuXG5cbiAgICAgICAgZm9yIChsZXQgciBpbiBydWxlcykge1xuICAgICAgICAgICAgbW9kaWZpZWRNYXNrIHw9IHJ1bGVzW3JdLmFwcGx5KHRoaXMsIHByb3BlcnRpZXMsIGRlY2xhcmVLZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvcGVydGllcy5hd2FrZVByb3BlcnRpZXMoKTtcbiAgICAgICAgdGhpcy5fTWF0Y2hUb1Byb3BzQ2FjaGUuc2V0VmFsdWUobWF0Y2hSZXN1bHQuaW1tdXRhYmxlQ29weSgpLCBwcm9wZXJ0aWVzKTtcbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgfVxuXG5cbiAgICBrZXlEYXRhKGtleTogc3RyaW5nKTogS2V5RGF0YSB7XG4gICAgICAgIGxldCBkYXRhOiBLZXlEYXRhID0gdGhpcy5fa2V5RGF0YS5nZXQoa2V5KTtcblxuICAgICAgICBpZiAoaXNCbGFuayhkYXRhKSkge1xuICAgICAgICAgICAgbGV0IGlkOiBudW1iZXIgPSB0aGlzLl9uZXh0S2V5SWQ7XG5cbiAgICAgICAgICAgIGlmIChpZCA+PSBNZXRhLk1heEtleURhdGFzIC0gMSkge1xuICAgICAgICAgICAgICAgIHByaW50KCdFeGNlZWRlZCBtYXhpbXVtIG51bWJlciBvZiBjb250ZXh0IGtleXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX25leHRLZXlJZCsrO1xuICAgICAgICAgICAgZGF0YSA9IG5ldyBLZXlEYXRhKGtleSwgaWQpO1xuXG4gICAgICAgICAgICB0aGlzLl9rZXlEYXRhc0J5SWRbaWRdID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMuX2tleURhdGEuc2V0KGtleSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG5cbiAgICBfa2V5c0luTWFzayhtYXNrOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCBtYXRjaGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgd2hpbGUgKG1hc2sgIT09IDApIHtcbiAgICAgICAgICAgIGlmICgobWFzayAmIDEpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKHRoaXMuX2tleURhdGFzQnlJZFtwb3NdLl9rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICBtYXNrID0gc2hpZnRSaWdodChtYXNrLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG5cbiAgICByZWdpc3RlcktleUluaXRPYnNlcnZlcihrZXk6IHN0cmluZywgbzogVmFsdWVRdWVyaWVkT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5rZXlEYXRhKGtleSkuYWRkT2JzZXJ2ZXIobyk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJWYWx1ZVRyYW5zZm9ybWVyRm9yS2V5KGtleTogc3RyaW5nLCB0cmFuc2Zvcm1lcjogS2V5VmFsdWVUcmFuc2Zvcm1lcik6IHZvaWQge1xuICAgICAgICB0aGlzLmtleURhdGEoa2V5KS5fdHJhbnNmb3JtZXIgPSB0cmFuc2Zvcm1lcjtcbiAgICB9XG5cblxuICAgIGdldCBpZGVudGl0eUNhY2hlKCk6IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkZW50aXR5Q2FjaGU7XG4gICAgfVxuXG5cbiAgICBuZXdNYXRjaEFycmF5KCk6IE1hdGNoVmFsdWVbXSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBtYXRjaEFycmF5QXNzaWduKGFycmF5OiBNYXRjaFZhbHVlW10sIGtleURhdGE6IEtleURhdGEsIG1hdGNoVmFsdWU6IE1hdGNoVmFsdWUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlkeCA9IGtleURhdGEuX2lkO1xuICAgICAgICBsZXQgY3VyciA9IGFycmF5W2lkeF07XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY3VycikpIHtcbiAgICAgICAgICAgIG1hdGNoVmFsdWUgPSBjdXJyLnVwZGF0ZUJ5QWRkaW5nKG1hdGNoVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5W2lkeF0gPSBtYXRjaFZhbHVlO1xuICAgIH1cblxuXG4gICAgcHJvcGVydHlXaWxsRG9NZXJnZShwcm9wZXJ0eU5hbWU6IHN0cmluZywgb3JpZ1ZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG1lcmdlcjogUHJvcGVydHlNZXJnZXIgPSB0aGlzLm1lcmdlckZvclByb3BlcnR5KHByb3BlcnR5TmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQcm9wZXJ0eU1lcmdlcklzQ2hhaW5pbmcobWVyZ2VyKSB8fCAoaXNQcmVzZW50KFxuICAgICAgICAgICAgb3JpZ1ZhbHVlKSAmJiAob3JpZ1ZhbHVlIGluc3RhbmNlb2YgTWFwKSk7XG4gICAgfVxuXG5cbiAgICBtYW5hZ2VyRm9yUHJvcGVydHkobmFtZTogc3RyaW5nKTogUHJvcGVydHlNYW5hZ2VyIHtcbiAgICAgICAgbGV0IG1hbmFnZXI6IFByb3BlcnR5TWFuYWdlciA9IHRoaXMuX21hbmFnZXJGb3JQcm9wZXJ0eS5nZXQobmFtZSk7XG4gICAgICAgIGlmIChpc0JsYW5rKG1hbmFnZXIpKSB7XG4gICAgICAgICAgICBtYW5hZ2VyID0gbmV3IFByb3BlcnR5TWFuYWdlcihuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXJGb3JQcm9wZXJ0eS5zZXQobmFtZSwgbWFuYWdlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxuXG5cbiAgICBtaXJyb3JQcm9wZXJ0eVRvQ29udGV4dChwcm9wZXJ0eU5hbWU6IHN0cmluZywgY29udGV4dEtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBrZXlEYXRhID0gdGhpcy5rZXlEYXRhKGNvbnRleHRLZXkpO1xuICAgICAgICBsZXQgbWFuYWdlciA9IHRoaXMubWFuYWdlckZvclByb3BlcnR5KHByb3BlcnR5TmFtZSk7XG4gICAgICAgIG1hbmFnZXIuX2tleURhdGFUb1NldCA9IGtleURhdGE7XG4gICAgfVxuXG5cbiAgICBkZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoY29udGV4dEtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBrZXlEYXRhOiBLZXlEYXRhID0gdGhpcy5rZXlEYXRhKGNvbnRleHRLZXkpO1xuICAgICAgICBrZXlEYXRhLmlzUHJvcGVydHlTY29wZSA9IHRydWU7XG5cbiAgICAgICAgbGV0IHRyYWl0S2V5OiBzdHJpbmcgPSBjb250ZXh0S2V5ICsgJ190cmFpdCc7XG4gICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQodHJhaXRLZXksIHRyYWl0S2V5KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKHRyYWl0S2V5LCBNZXRhLlByb3BlcnR5TWVyZ2VyX0RlY2xhcmVMaXN0KTtcbiAgICB9XG5cbiAgICBpc1Byb3BlcnR5U2NvcGVLZXkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIE1ldGEuU2NvcGVLZXkgPT09IGtleTtcbiAgICB9XG5cbiAgICByZWdpc3RlclByb3BlcnR5TWVyZ2VyKHByb3BlcnR5TmFtZTogc3RyaW5nLCBtZXJnZXI6IFByb3BlcnR5TWVyZ2VyKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0JsYW5rKG1lcmdlci5fbWV0YSkpIHtcbiAgICAgICAgICAgIG1lcmdlci5fbWV0YSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hbmFnZXI6IFByb3BlcnR5TWFuYWdlciA9IHRoaXMubWFuYWdlckZvclByb3BlcnR5KHByb3BlcnR5TmFtZSk7XG4gICAgICAgIG1hbmFnZXIuX21lcmdlciA9IG1lcmdlcjtcbiAgICB9XG5cbiAgICBtZXJnZXJGb3JQcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IFByb3BlcnR5TWVyZ2VyIHtcbiAgICAgICAgbGV0IG1hbmFnZXI6IFByb3BlcnR5TWFuYWdlciA9IHRoaXMubWFuYWdlckZvclByb3BlcnR5KHByb3BlcnR5TmFtZSk7XG4gICAgICAgIHJldHVybiBtYW5hZ2VyLl9tZXJnZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1Byb3BlcnR5TWVyZ2VySXNDaGFpbmluZyh2YWw6IGFueSk6IHZhbCBpcyBQcm9wZXJ0eU1lcmdlcklzQ2hhaW5pbmcge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHZhbC5pc1Byb3BNZXJnZXJJc0NoYWluaW5nTWFyaykgJiYgdmFsLmlzUHJvcE1lcmdlcklzQ2hhaW5pbmdNYXJrO1xuICAgIH1cblxuXG4gICAgZ3JvdXBGb3JUcmFpdCh0cmFpdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdkZWZhdWx0JztcbiAgICB9XG5cbiAgICBfbG9nUnVsZVN0YXRzKCk6IHZvaWQge1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuXG4gICAgICAgIGxldCB2YWx1ZXMgPSB0aGlzLl9rZXlEYXRhLmtleXMoKTtcblxuICAgICAgICBsZXQgY291bnRzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgaWQgb2YgQXJyYXkuZnJvbSh2YWx1ZXMpKSB7XG4gICAgICAgICAgICBsZXQga2V5RGF0YSA9IHRoaXMuX2tleURhdGEuZ2V0KGlkKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZXNzID0ga2V5RGF0YS5ydWxlVmVjcy52YWx1ZXMoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgdm0gIG9mIHZhbHVlc3MpIHtcbiAgICAgICAgICAgICAgICBsZXQga3ZjID0gbmV3IEtleVZhbHVlQ291bnQoa2V5RGF0YS5fa2V5LCAoPGFueT52bSlbJ192YWx1ZSddLCBpc1ByZXNlbnQoXG4gICAgICAgICAgICAgICAgICAgIHZtLl9hcnIpID8gdm0uX2FyclswXSA6IDApO1xuXG4gICAgICAgICAgICAgICAgdG90YWwgKz0ga3ZjLmNvdW50O1xuICAgICAgICAgICAgICAgIGNvdW50cy5wdXNoKGt2Yyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgTGlzdFdyYXBwZXIuc29ydDxLZXlWYWx1ZUNvdW50Pihjb3VudHMsIChvMSwgbzIpID0+IG8yLmNvdW50IC0gbzEuY291bnQpO1xuXG4gICAgICAgIGxldCBidWYgPSBuZXcgU3RyaW5nSm9pbmVyKFtdKTtcbiAgICAgICAgbGV0IGMgPSBNYXRoLm1pbigxMCwgY291bnRzLmxlbmd0aCk7XG5cbiAgICAgICAgYnVmLmFkZCgnVG90YWwgaW5kZXggZW50cmllcyBjb21wYXJpc29ucyBwZXJmb3JtZWQ6ICcgKyBNYXRjaC5fRGVidWdfRWxlbWVudFByb2Nlc3NDb3VudCk7XG4gICAgICAgIGJ1Zi5hZGQoJ1xcblRvdGFsIGluZGV4IGVudHJpZXM6ICcgKyB0b3RhbCk7XG4gICAgICAgIGJ1Zi5hZGQoJ1xcblRvcCAga2V5cy92YWx1ZXM6ICcgKyBjKTtcblxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQga3ZjID0gY291bnRzW2ldO1xuXG4gICAgICAgICAgICBidWYuYWRkKCcgICAgICcgKyBrdmMua2V5ICsgJyAgPSAnICsga3ZjLnZhbHVlICsgJyA6ICcgKyBrdmMuY291bnQgKyAnIGVudHJpZXMnKTtcbiAgICAgICAgICAgIGJ1Zi5hZGQoJ1xcbicpO1xuICAgICAgICB9XG4gICAgICAgIHByaW50KGJ1Zi50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ01ldGEnO1xuICAgIH1cblxuXG4gICAgaXNOdWxsTWFya2VyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh2YWx1ZSkgJiYgdmFsdWVbJ21hcmtlcm51bGwnXTtcbiAgICB9XG5cblxuICAgIGFkZFRlc3RVc2VyUnVsZSh0ZXN0UnVsZU5hbWU6IHN0cmluZywgc291cmNlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdGVzdFJ1bGVzLnNldCh0ZXN0UnVsZU5hbWUsIHNvdXJjZSk7XG4gICAgfVxuXG5cbn1cblxuXG5leHBvcnQgY2xhc3MgS2V5VmFsdWVDb3VudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMga2V5OiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgY291bnQ6IG51bWJlcikge1xuICAgIH1cbn1cblxuLyoqXG4gKiBTdG9yZSBvZiBwb2xpY3kgaW5mb3JtYXRpb24gZm9yIHBhcnRpY3VsYXIgcHJvcGVydGllcyAtLSBtb3N0IHNpZ25pZmljYW50bHksIGhvd1xuICogc3VjY2Vzc2l2ZSB2YWx1ZXMgb2YgdGhpcyBwcm9wZXJ0eSBhcmUgdG8gYmUgKm1lcmdlZCogZHVyaW5nIHJ1bGUgYXBwbGljYXRpb24uXG4gKiAoU2VlIE1ldGEucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcikuICBFLmcuICd2aXNpYmxlJywgJ3RyYWl0JywgYW5kICd2YWxpZCcgYWxsIGhhdmUgdW5pcXVlXG4gKiBtZXJnZSBwb2xpY2llcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5TWFuYWdlciB7XG4gICAgX21lcmdlcjogUHJvcGVydHlNZXJnZXI7XG4gICAgX2tleURhdGFUb1NldDogS2V5RGF0YTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIF9uYW1lOiBzdHJpbmcpIHtcbiAgICB9XG5cblxuICAgIG1lcmdlUHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcsIG9yaWc6IGFueSwgbmV3VmFsdWU6IGFueSwgaXNEZWNsYXJlOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgaWYgKGlzQmxhbmsob3JpZykpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIE92ZXJyaWRlVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAoPE92ZXJyaWRlVmFsdWU+IG5ld1ZhbHVlKS52YWx1ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fbWVyZ2VyKSkge1xuICAgICAgICAgICAgLy8gUGVyaGFwcyBzaG91bGQgaGF2ZSBhIGRhdGEtdHlwZS1iYXNlZCBtZXJnZXIgcmVnaXN0cnk/XG4gICAgICAgICAgICBpZiAob3JpZyBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQobmV3VmFsdWUpICYmIG5ld1ZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1lcmdlIG1hcHNcbiAgICAgICAgICAgICAgICAgICAgLy8gdG9kbzogVEVTVCBjaGVjayBvdXRjb21lIG9mIHRoZSBtZXJnZSBhbmQgY29tcGFyZVxuICAgICAgICAgICAgICAgICAgICBsZXQgb3JpZ0Nsb25lID0gTWFwV3JhcHBlci5jbG9uZTxzdHJpbmcsIGFueT4ob3JpZyk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gTWFwV3JhcHBlci5tZXJnZU1hcEludG9NYXBXaXRoT2JqZWN0KG9yaWdDbG9uZSwgbmV3VmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKHRoaXMuX21lcmdlciBpbnN0YW5jZW9mIFByb3BlcnR5TWVyZ2VyRHluYW1pYykgJiZcbiAgICAgICAgICAgIChvcmlnIGluc3RhbmNlb2YgRHluYW1pY1Byb3BlcnR5VmFsdWUgfHwgbmV3VmFsdWUgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHlWYWx1ZSkpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEZWZlcnJlZE9wZXJhdGlvbkNoYWluKHRoaXMuX21lcmdlciwgb3JpZywgbmV3VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlci5tZXJnZShvcmlnLCBuZXdWYWx1ZSwgaXNEZWNsYXJlKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBXcmFwcGVyIGZvciBhIHZhbHVlIHRoYXQgc2hvdWxkLCBpbiBydWxlIGFwcGxpY2F0aW9uLCBvdmVycmlkZSBhbnkgcHJldmlvdXMgdmFsdWUgZm9yIGl0c1xuICogcHJvcGVydHkuICBUaGlzIGNhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIGRlZmF1bHQgcHJvcGVydHkgdmFsdWUgbWVyZ2UgcG9saWN5LCBmb3IgaW5zdGFuY2VcbiAqIGFsbG93aW5nIHRoZSAndmlzaWJsZScgcHJvcGVydHkgdG8gYmUgZm9yY2VkIGZyb20gZmFsc2UgdG8gdHJ1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIE92ZXJyaWRlVmFsdWUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZhbHVlOiBhbnkpIHtcbiAgICB9XG5cbiAgICB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUgPT09ICdudWxsJyA/IG51bGwgOiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX3ZhbHVlKSA/IHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCkgKyAnIScgOiAnbnVsbCcgKyAnISc7XG4gICAgfVxufVxuXG5cbi8qKlxuICogS2V5RGF0YSBpcyB0aGUgcHJpbWFyeSBzdHJ1Y3R1cmUgZm9yIHJlcHJlc2VudGluZyBpbmZvcm1hdGlvbiBhYm91dCBjb250ZXh0IGtleXNcbiAqIChlLmcuICdjbGFzcycsICdsYXlvdXQnLCAnb3BlcmF0aW9uJywgJ2ZpZWxkJywgLi4uKSwgaW5jbHVkaW5nIGFuIGluZGV4IG9mIHJ1bGVzXG4gKiB0aGF0IG1hdGNoIG9uIHBhcnRpY3VsYXIgdmFsdWVzIG9mIHRoYXQga2V5IChfVmFsdWVNYXRjaGVzKS5cbiAqXG4gKiBOb3RlIHRoYXQgZXZlcnkgY29udGV4dCBrZXkgaGFzIGEgc21hbGwgaW50ZWdlciBJRCAoMC02MykgYW5kIHRoZXNlIGFyZSB1c2VzIGluXG4gKiAobG9uZykgbWFza3MgZm9yIGNlcnRhaW4gcnVsZSBtYXRjaGluZyBvcGVyYXRpb25zLlxuICovXG5cbmV4cG9ydCBjbGFzcyBLZXlEYXRhIHtcbiAgICBwcml2YXRlIF9ydWxlVmVjczogQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIFZhbHVlTWF0Y2hlcz47XG4gICAgcHJpdmF0ZSBfb2JzZXJ2ZXJzOiBBcnJheTxWYWx1ZVF1ZXJpZWRPYnNlcnZlcj47XG5cbiAgICBwcml2YXRlIF9hbnk6IFZhbHVlTWF0Y2hlcztcbiAgICBfdHJhbnNmb3JtZXI6IEtleVZhbHVlVHJhbnNmb3JtZXI7XG5cbiAgICBwcml2YXRlIF9pc1Byb3BlcnR5U2NvcGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIF9rZXk6IHN0cmluZywgcHVibGljIF9pZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3J1bGVWZWNzID0gbmV3IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBWYWx1ZU1hdGNoZXM+KCk7XG4gICAgICAgIHRoaXMuX2FueSA9IHRoaXMuZ2V0KE1ldGEuS2V5QW55KTtcblxuICAgIH1cblxuICAgIG1hc2tWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2hpZnRMZWZ0KDEsIHRoaXMuX2lkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCh2YWx1ZTogYW55KTogVmFsdWVNYXRjaGVzIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IE1ldGEuTnVsbE1hcmtlcjtcblxuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLl90cmFuc2Zvcm1lcikpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fdHJhbnNmb3JtZXIudHJhbmZvcm1Gb3JNYXRjaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hdGNoZXM6IFZhbHVlTWF0Y2hlcyA9IHRoaXMuX3J1bGVWZWNzLmdldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICBpZiAoaXNCbGFuayhtYXRjaGVzKSkge1xuICAgICAgICAgICAgbWF0Y2hlcyA9IG5ldyBWYWx1ZU1hdGNoZXModmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSAmJiAhQm9vbGVhbldyYXBwZXIuaXNGYWxzZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVzLl9wYXJlbnQgPSB0aGlzLl9hbnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9ydWxlVmVjcy5zZXRWYWx1ZSh2YWx1ZSwgbWF0Y2hlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgfVxuXG4gICAgbWF0Y2hWYWx1ZSh2YWx1ZTogYW55KTogTWF0Y2hWYWx1ZSB7XG4gICAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IGxpc3QgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldChsaXN0WzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBtdWx0aTogTXVsdGlNYXRjaFZhbHVlID0gbmV3IE11bHRpTWF0Y2hWYWx1ZSgpO1xuXG4gICAgICAgICAgICBMaXN0V3JhcHBlci5mb3JFYWNoV2l0aEluZGV4KGxpc3QsICh2LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbXVsdGkuZGF0YS5wdXNoKHRoaXMuZ2V0KHYpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG11bHRpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgYWRkRW50cnkodmFsdWU6IGFueSwgaWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgbWF0Y2hlczogVmFsdWVNYXRjaGVzID0gdGhpcy5nZXQodmFsdWUpO1xuICAgICAgICBsZXQgYmVmb3JlOiBudW1iZXJbXSA9IG1hdGNoZXMuX2FycjtcbiAgICAgICAgbGV0IGFmdGVyOiBudW1iZXJbXSA9IE1hdGNoLmFkZEludChiZWZvcmUsIGlkKTtcbiAgICAgICAgaWYgKGJlZm9yZSAhPT0gYWZ0ZXIpIHtcbiAgICAgICAgICAgIG1hdGNoZXMuX2FyciA9IGFmdGVyO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBsb29rdXAob3duZXI6IE1ldGEsIHZhbHVlOiBhbnkpOiBudW1iZXJbXSB7XG4gICAgICAgIGxldCBtYXRjaGVzOiBWYWx1ZU1hdGNoZXMgPSB0aGlzLmdldCh2YWx1ZSk7XG4gICAgICAgIGlmICghbWF0Y2hlcy5fcmVhZCAmJiBpc1ByZXNlbnQodGhpcy5fb2JzZXJ2ZXJzKSkge1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlcy5fcmVhZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBub3RpZnlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLmZvckVhY2hXaXRoSW5kZXgodGhpcy5fb2JzZXJ2ZXJzLCAodiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYubm90aWZ5KG93bmVyLCB0aGlzLl9rZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1hdGNoZXMuX3JlYWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIGlmIHBhcmVudCBoYXMgY2hhbmdlZCBhbmQgbmVlZCB0byB1bmlvbiBpbiBwYXJlbnQgZGF0YVxuICAgICAgICBtYXRjaGVzLmNoZWNrUGFyZW50KCk7XG4gICAgICAgIHJldHVybiBtYXRjaGVzLl9hcnI7XG4gICAgfVxuXG5cbiAgICBzZXRQYXJlbnQodmFsdWU6IGFueSwgcGFyZW50VmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgcGFyZW50OiBWYWx1ZU1hdGNoZXMgPSB0aGlzLmdldChwYXJlbnRWYWx1ZSk7XG4gICAgICAgIGxldCBjaGlsZDogVmFsdWVNYXRjaGVzID0gdGhpcy5nZXQodmFsdWUpO1xuICAgICAgICBjaGlsZC5fcGFyZW50ID0gcGFyZW50O1xuICAgIH1cblxuXG4gICAgcGFyZW50KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICBsZXQgY2hpbGQ6IFZhbHVlTWF0Y2hlcyA9IHRoaXMuZ2V0KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkLl9wYXJlbnQuX3ZhbHVlO1xuICAgIH1cblxuXG4gICAgYWRkT2JzZXJ2ZXIobzogVmFsdWVRdWVyaWVkT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fb2JzZXJ2ZXJzKSkge1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzID0gbmV3IEFycmF5PFZhbHVlUXVlcmllZE9ic2VydmVyPigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29ic2VydmVycy5wdXNoKG8pO1xuICAgIH1cblxuXG4gICAgLy8gSWYgdGhpcyBrZXkgZGVmaW5lcyBhIHNjb3BlIGZvciBwcm9wZXJ0aWVzIChlLmcuIGZpZWxkLCBjbGFzcywgYWN0aW9uKVxuICAgIC8vIHRoaXMgdGhpcyByZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBzZWxlY3RvciBrZXkgZm9yIHRob3NlIHByb3BlcnRpZXNcbiAgICAvLyAoZS5nLiBmaWVsZF9wLCBjbGFzc19wKVxuICAgIGdldCBpc1Byb3BlcnR5U2NvcGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1Byb3BlcnR5U2NvcGU7XG4gICAgfVxuXG4gICAgc2V0IGlzUHJvcGVydHlTY29wZSh5bjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9pc1Byb3BlcnR5U2NvcGUgPSB5bjtcbiAgICB9XG5cblxuICAgIGdldCBydWxlVmVjcygpOiBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgVmFsdWVNYXRjaGVzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ydWxlVmVjcztcbiAgICB9XG5cbiAgICBnZXQga2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXk7XG4gICAgfVxuXG4gICAgZ2V0IGlkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cblxuICAgIGdldCBvYnNlcnZlcnMoKTogQXJyYXk8VmFsdWVRdWVyaWVkT2JzZXJ2ZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ic2VydmVycztcbiAgICB9XG59XG5cblxuLyoqXG4gKiBTdG9yZSBvZiBwb2xpY3kgaW5mb3JtYXRpb24gZm9yIHBhcnRpY3VsYXIgcHJvcGVydGllcyAtLSBtb3N0IHNpZ25pZmljYW50bHksIGhvd1xuICogc3VjY2Vzc2l2ZSB2YWx1ZXMgb2YgdGhpcyBwcm9wZXJ0eSBhcmUgdG8gYmUgKm1lcmdlZCogZHVyaW5nIHJ1bGUgYXBwbGljYXRpb24uXG4gKiAoU2VlIE1ldGEucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcikuICBFLmcuICd2aXNpYmxlJywgJ3RyYWl0JywgYW5kICd2YWxpZCcgYWxsIGhhdmUgdW5pcXVlXG4gKiBtZXJnZSBwb2xpY2llcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5TWFwIGltcGxlbWVudHMgTWFwPHN0cmluZywgYW55PiB7XG5cbiAgICBwcml2YXRlIF9jb250ZXh0UHJvcGVydGllc1VwZGF0ZWQ6IEFycmF5PFByb3BlcnR5TWFuYWdlcj47XG4gICAgcHJvdGVjdGVkIF9tYXA6IE1hcDxzdHJpbmcsIGFueT47XG5cbiAgICBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCc7XG5cblxuICAgIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBNYXA8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZW50cmllcykpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KGVudHJpZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0KGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5nZXQoa2V5KTtcbiAgICB9XG5cblxuICAgIGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5rZXlzKCk7XG4gICAgfVxuXG5cbiAgICB2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC52YWx1ZXMoKTtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFwLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZT86IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuXG4gICAgZGVsZXRlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5kZWxldGUoa2V5KTtcbiAgICB9XG5cbiAgICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogYW55LCBpbmRleDogc3RyaW5nLCBtYXA6IE1hcDxzdHJpbmcsIGFueT4pID0+IHZvaWQsXG4gICAgICAgICAgICB0aGlzQXJnPzogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21hcC5mb3JFYWNoKGNhbGxiYWNrZm4pO1xuICAgIH1cblxuXG4gICAgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuaGFzKGtleSk7XG4gICAgfVxuXG5cbiAgICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICB9XG5cblxuICAgIGVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5lbnRyaWVzKCk7XG4gICAgfVxuXG5cbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnNpemU7XG4gICAgfVxuXG5cbiAgICBhd2FrZVByb3BlcnRpZXMoKTogdm9pZCB7XG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUodGhpcykuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzUHJvcGVydHlNYXBBd2FraW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlLmF3YWtlRm9yUHJvcGVydHlNYXAodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZENvbnRleHRLZXkoa2V5OiBQcm9wZXJ0eU1hbmFnZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fY29udGV4dFByb3BlcnRpZXNVcGRhdGVkKSkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dFByb3BlcnRpZXNVcGRhdGVkID0gbmV3IEFycmF5PFByb3BlcnR5TWFuYWdlcj4oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZXh0UHJvcGVydGllc1VwZGF0ZWQucHVzaChrZXkpO1xuICAgIH1cblxuXG4gICAgZ2V0IGNvbnRleHRLZXlzVXBkYXRlZCgpOiBBcnJheTxQcm9wZXJ0eU1hbmFnZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHRQcm9wZXJ0aWVzVXBkYXRlZDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgLy8gdG9kbzogZmluZCBiZXR0ZXIgd2F5IGZvciB0aGUgc3RyaW5nLiB0aHNpIGlzIGFsc28gdXNlZCBhcyBrZXkgZm9yIHRoZSBkaWN0aW9uYXJ5XG4gICAgICAgIC8vIG5vdCByZWFsbHkgZWZmaWNpZW50XG4gICAgICAgIGxldCBzaiA9IG5ldyBTdHJpbmdKb2luZXIoWydQcm9wZXJ0eU1hcDonXSk7XG4gICAgICAgIHNqLmFkZCh0aGlzLnNpemUgKyAnLCcpO1xuICAgICAgICBNYXBXcmFwcGVyLml0ZXJhYmxlKHRoaXMpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChpc1Byb3BlcnR5TWFwQXdha2luZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZS5hd2FrZUZvclByb3BlcnR5TWFwKHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2ouYWRkKGtleSArICc6JyArIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2ouYWRkKCcsICcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cbn1cblxuXG4vLyBNYXJrZXIgaW50ZXJmYWNlXG5leHBvcnQgaW50ZXJmYWNlIFByb3BlcnR5TWVyZ2VySXNDaGFpbmluZyB7XG4gICAgaXNQcm9wTWVyZ2VySXNDaGFpbmluZ01hcms6IGJvb2xlYW47XG5cbn1cblxuLyoqXG4gKiBEZWZpbmUgcG9saWN5IGZvciBtZXJnaW5nIGEgcHJvcGVydHkgdmFsdWUgYXNzaWduZWQgYnkgb25lIHJ1bGVcbiAqIHRvIGEgc3Vic2VxdWVudCB2YWx1ZSBmcm9tIGEgaGlnaGVyIHJhbmtlZCBydWxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb3BlcnR5TWVyZ2VyIHtcblxuICAgIF9tZXRhOiBNZXRhO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGR1cmluZyBydWxlIGFwcGxpY2F0aW9uIHRvIG1lcmdlIGFuIGVhcmxpZXIgKGxvd2VyIHJhbmtlZCkgdmFsdWUgd2l0aCBhIG5ld2VyIG9uZS5cbiAgICAgKiBAcGFyYW0gb3JpZyB0aGUgcHJldmlvdXMgdmFsdWUgYWNjdW11bGF0ZWQgaW4gdGhlIHByb3BlcnR5IG1hcFxuICAgICAqIEBwYXJhbSBvdmVycmlkZSB0aGUgbmV3IHZhbHVlIGZyb20gdGhlIGhpZ2hlciByYW5rZWQgcnVsZVxuICAgICAqIEBwYXJhbSBpc0RlY2xhcmUgd2hldGhlciB3ZSBhcmUgY3VycmVudGx5IGFjY3VtdWxhdGluZyBtYXRjaGVkIGZvciBkZWNsYXJhdGlvbnMgb2YgdGhlXG4gICAgICogICAgIHByb3BlcnR5L3ZhbHVlXG4gICAgICogQHJldHVybiB0aGUgbmV3IHByb3BlcnR5IHZhbHVlIHRvIGJlIHB1dCBpbiB0aGUgcHJvcGVydHkgbWFwXG4gICAgICovXG4gICAgbWVyZ2UgKG9yaWc6IGFueSwgb3ZlcnJpZGU6IGFueSwgaXNEZWNsYXJlOiBib29sZWFuKTogYW55O1xuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nO1xufVxuXG4vLyBtYXJrZXIgaW50ZXJmYWNlIGZvciBQcm9wZXJ0eU1lcmdlcyB0aGF0IGNhbiBoYW5kbGUgZHluYW1pYyB2YWx1ZXNcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcm9wZXJ0eU1lcmdlckR5bmFtaWMgaW1wbGVtZW50cyBQcm9wZXJ0eU1lcmdlciB7XG4gICAgX21ldGE6IE1ldGE7XG5cbiAgICBtZXJnZShvcmlnOiBhbnksIG92ZXJyaWRlOiBhbnksIGlzRGVjbGFyZTogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdQcm9wZXJ0eU1lcmdlckR5bmFtaWMnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlNZXJnZXJfT3ZlcndyaXRlIGltcGxlbWVudHMgUHJvcGVydHlNZXJnZXIge1xuICAgIF9tZXRhOiBNZXRhO1xuXG4gICAgbWVyZ2Uob3JpZzogYW55LCBvdmVycmlkZTogYW55LCBpc0RlY2xhcmU6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICByZXR1cm4gb3ZlcnJpZGU7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdPVkVSV1JJVEUnO1xuICAgIH1cbn1cblxuLyoqXG4gUHJvcGVydHlNZXJnZXIgZm9yIHByb3BlcnRpZXMgdGhlIHNob3VsZCBiZSB1bmlvbmVkIGFzIGxpc3RzXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eU1lcmdlcl9MaXN0IGltcGxlbWVudHMgUHJvcGVydHlNZXJnZXIge1xuICAgIF9tZXRhOiBNZXRhO1xuXG4gICAgbWVyZ2Uob3JpZzogYW55LCBvdmVycmlkZTogYW55LCBpc0RlY2xhcmU6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICBpZiAoIShpc0FycmF5KG9yaWcpKSAmJiAhKGlzQXJyYXkob3ZlcnJpZGUpKSAmJiBNZXRhLm9iamVjdEVxdWFscyhvcmlnLCBvdmVycmlkZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBvcmlnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsMSA9IE1ldGEudG9MaXN0KG9yaWcpO1xuICAgICAgICBsZXQgbDIgPSBNZXRhLnRvTGlzdChvdmVycmlkZSk7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IExpc3RXcmFwcGVyLmNsb25lKGwxKTtcblxuICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50c0lmQWJzZW50KHJlc3VsdCwgbDIpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFByb3BlcnR5TWVyZ2VyIGZvciBwcm9wZXJ0aWVzIHRoZSBzaG91bGQgb3ZlcnJpZGUgbm9ybWFsbHksIGJ1dCByZXR1cm4gbGlzdHMgd2hlblxuICogaW4gZGVjbGFyZSBtb2RlIChlLmcuICdjbGFzcycsICdmaWVsZCcsICdsYXlvdXQnLCAuLi4pXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eU1lcmdlckRlY2xhcmVMaXN0IGV4dGVuZHMgUHJvcGVydHlNZXJnZXJEeW5hbWljIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG1lcmdlKG9yaWc6IGFueSwgb3ZlcnJpZGU6IGFueSwgaXNEZWNsYXJlOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgaWYgKCFpc0RlY2xhcmUpIHtcbiAgICAgICAgICAgIHJldHVybiBvdmVycmlkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGlzQXJyYXkob3JpZykpICYmICEoaXNBcnJheShvdmVycmlkZSkpICYmIE1ldGEub2JqZWN0RXF1YWxzKG9yaWcsIG92ZXJyaWRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9yaWc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzdWx0OiBhbnlbXSA9IFtdO1xuICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50c0lmQWJzZW50KHJlc3VsdCwgTWV0YS50b0xpc3Qob3JpZykpO1xuICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50c0lmQWJzZW50KHJlc3VsdCwgTWV0YS50b0xpc3Qob3ZlcnJpZGUpKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnUHJvcGVydHlNZXJnZXJEZWNsYXJlTGlzdCc7XG4gICAgfVxufVxuXG4vKipcbiAqIFByb3BlcnR5TWVyZ2VyIGZvciB0aGUgJ3RyYWl0JyBwcm9wZXJ0eS4gIEdlbmVyYWxseSwgdHJhaXRzIGFyZSB1bmlvbmVkLCBleGNlcHQgZm9yIHRyYWl0c1xuICogZnJvbSB0aGUgc2FtZSAndHJhaXRHcm91cCcsIHdoaWNoIG92ZXJyaWRlIChpLmUuIG9ubHkgb25lIHRyYWl0IGZyb20gZWFjaCB0cmFpdEdyb3VwIHNob3VsZFxuICogc3Vydml2ZSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eU1lcmdlckRlY2xhcmVMaXN0Rm9yVHJhaXQgZXh0ZW5kcyBQcm9wZXJ0eU1lcmdlckRlY2xhcmVMaXN0IHtcblxuICAgIF9tZXRhOiBNZXRhO1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBtZXJnZShvcmlnOiBhbnksIG92ZXJyaWRlOiBhbnksIGlzRGVjbGFyZTogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGlmIChpc0RlY2xhcmUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5tZXJnZShvcmlnLCBvdmVycmlkZSwgaXNEZWNsYXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlJ3JlIG92ZXJyaWRlIGEgc2luZ2xlIGVsZW1lbnQgd2l0aCBpdHNlbGYsIGRvbid0IGdvIExpc3QuLi5cbiAgICAgICAgaWYgKCFpc0FycmF5KG9yaWcpICYmICFpc0FycmF5KG92ZXJyaWRlKSAmJiBNZXRhLm9iamVjdEVxdWFscyhvcmlnLCBvdmVycmlkZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBvcmlnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcmlnTCA9IE1ldGEudG9MaXN0KG9yaWcpO1xuICAgICAgICBsZXQgb3ZlcnJpZGVMID0gTWV0YS50b0xpc3Qob3ZlcnJpZGUpO1xuICAgICAgICBsZXQgcmVzdWx0OiBhbnlbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCB0cmFpdCBvZiBvcmlnTCkge1xuICAgICAgICAgICAgaWYgKHRyYWl0IGluc3RhbmNlb2YgT3ZlcnJpZGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRyYWl0ID0gKDxPdmVycmlkZVZhbHVlPiB0cmFpdCkudmFsdWUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGNhbkFkZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzLl9tZXRhLmdyb3VwRm9yVHJhaXQodHJhaXQpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGdyb3VwKSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgb3ZlcnJpZGVUcmFpdCBvZiBvdmVycmlkZUwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJyaWRlVHJhaXQgaW5zdGFuY2VvZiBPdmVycmlkZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVycmlkZVRyYWl0ID0gKDxPdmVycmlkZVZhbHVlPm92ZXJyaWRlVHJhaXQpLnZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cCA9PT0gdGhpcy5fbWV0YS5ncm91cEZvclRyYWl0KG92ZXJyaWRlVHJhaXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5BZGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbkFkZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRyYWl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50c0lmQWJzZW50KHJlc3VsdCwgb3ZlcnJpZGVMKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnUHJvcGVydHlNZXJnZXJEZWNsYXJlTGlzdEZvclRyYWl0JztcbiAgICB9XG59XG5cblxuLyoqXG4gKiBQcm9wZXJ0eU1lcmdlciBpbXBsZW1lbnRpbmcgQU5EIHNlbWFudGljcyAtLSBpLmUuIGZhbHNlIHRydW1wcyB0cnVlLlxuICogKFVzZWQsIGZvciBpbnN0YW5jZSwgZm9yIHRoZSBwcm9wZXJ0aWVzICd2aXNpYmxlJyBhbmQgJ2VkaXRhYmxlJylcbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5TWVyZ2VyX0FuZCBleHRlbmRzIFByb3BlcnR5TWVyZ2VyRHluYW1pYyBpbXBsZW1lbnRzIFByb3BlcnR5TWVyZ2VySXNDaGFpbmluZyB7XG4gICAgaXNQcm9wTWVyZ2VySXNDaGFpbmluZ01hcms6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICBtZXJnZShvcmlnOiBhbnksIG92ZXJyaWRlOiBhbnksIGlzRGVjbGFyZTogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIC8vIG51bGwgd2lsbCByZXNldCAoc28gdGhhdCBpdCBjYW4gYmUgb3ZlcnJpZGRlbiB0byB0cnVlIHN1YnNlcXVlbnRseVxuICAgICAgICBpZiAoaXNCbGFuayhvdmVycmlkZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgd2UgY2FuIGV2YWx1YXRlIHN0YXRpY2FsbHksIGRvIGl0IG5vd1xuXG5cbiAgICAgICAgaWYgKChpc0Jvb2xlYW4ob3JpZykgJiYgIShCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZShvcmlnKSkpIHx8XG4gICAgICAgICAgICAoaXNCb29sZWFuKG92ZXJyaWRlKSAmJiAhKEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKG92ZXJyaWRlKSkpKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBTkRpbmcgd2l0aCB0cnVlIGlzIGEgbm9vcCAtLSByZXR1cm4gbmV3IHZhbHVlXG4gICAgICAgIGlmIChpc0Jvb2xlYW4ob3JpZykgJiYgQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUob3JpZykpIHtcblxuICAgICAgICAgICAgcmV0dXJuIChvdmVycmlkZSBpbnN0YW5jZW9mIER5bmFtaWNQcm9wZXJ0eVZhbHVlKSA/IG92ZXJyaWRlXG4gICAgICAgICAgICAgICAgOiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgb3ZlcnJpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQm9vbGVhbihvdmVycmlkZSkgJiYgQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUob3ZlcnJpZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKG9yaWcgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHlWYWx1ZSkgPyBvcmlnIDogQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUoXG4gICAgICAgICAgICAgICAgb3ZlcnJpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgb25lIG9mIG91ciB2YWx1ZXMgaXMgZHluYW1pYywgZGVmZXJcbiAgICAgICAgaWYgKChvcmlnIGluc3RhbmNlb2YgRHluYW1pY1Byb3BlcnR5VmFsdWUgfHwgb3ZlcnJpZGUgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHlWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGVmZXJyZWRPcGVyYXRpb25DaGFpbih0aGlzLCBvcmlnLCBvdmVycmlkZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKG9yaWcpICYmIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKG92ZXJyaWRlKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ0FORCc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eU1lcmdlcl9WYWxpZCBpbXBsZW1lbnRzIFByb3BlcnR5TWVyZ2VyLFxuICAgIFByb3BlcnR5TWVyZ2VySXNDaGFpbmluZyB7XG4gICAgX21ldGE6IE1ldGE7XG4gICAgaXNQcm9wTWVyZ2VySXNDaGFpbmluZ01hcms6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgbWVyZ2Uob3JpZzogYW55LCBvdmVycmlkZTogYW55LCBpc0RlY2xhcmU6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICpcbiAgICAgICAgIHJldHVybiAoaXNTdHJpbmcob3ZlcnJpZGUpIHx8ICggaXNCb29sZWFuKG92ZXJyaWRlKSAmJlxuICAgICAgICAgIShCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZShvdmVycmlkZSkpKSkgPyBvdmVycmlkZSA6IG9yaWc7XG4gICAgICAgICAqL1xuXG4gICAgICAgIC8vIGlmIGZpcnN0IGlzIGVycm9yIChlcnJvciBtZXNzYWdlIG9yIGZhbHNlLCBpdCB3aW5zKSwgb3RoZXJ3aXNlIHNlY29uZFxuICAgICAgICByZXR1cm4gKGlzU3RyaW5nKG92ZXJyaWRlKSB8fCAoaXNCb29sZWFuKG92ZXJyaWRlKSAmJiBCb29sZWFuV3JhcHBlci5pc0ZhbHNlKG92ZXJyaWRlKSkpXG4gICAgICAgICAgICA/IG92ZXJyaWRlIDogb3JpZztcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ1ZBTElEQVRFJztcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIGdyb3VwIG9mIHJ1bGVzIG9yaWdpbmF0aW5nIGZyb20gYSBjb21tb24gc291cmNlLlxuICogQWxsIHJ1bGVzIG11c3QgYmUgYWRkZWQgdG8gdGhlIHJ1bGUgYmFzZSBhcyBwYXJ0IG9mIGEgUnVsZVNldC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bGVTZXQge1xuXG4gICAgX2ZpbGVQYXRoOiBzdHJpbmc7XG4gICAgX3N0YXJ0OiBudW1iZXIgPSAwO1xuICAgIF9lbmQ6IG51bWJlciA9IDA7XG4gICAgX2VkaXRhYmxlU3RhcnQ6IG51bWJlciA9IC0xO1xuXG4gICAgX3Jhbms6IG51bWJlciA9IDA7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21ldGE6IE1ldGEpIHtcbiAgICB9XG5cbiAgICBkaXNhYmxlUnVsZXMoKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9zdGFydDsgaSA8IHRoaXMuX2VuZDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXRhLl9ydWxlc1tpXS5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWV0YS5jbGVhckNhY2hlcygpO1xuXG4gICAgfVxuXG5cbiAgICBnZXQgZmlsZVBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVQYXRoO1xuICAgIH1cblxuICAgIHJ1bGVzKGVkaXRhYmxlT25seTogYW55KTogQXJyYXk8UnVsZT4ge1xuICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTxSdWxlPiA9IFtdO1xuICAgICAgICBsZXQgaSA9IChlZGl0YWJsZU9ubHkpID8gKHRoaXMuX2VkaXRhYmxlU3RhcnQgPT09IC0xID8gdGhpcy5fZW5kIDogdGhpcy5fZWRpdGFibGVTdGFydClcbiAgICAgICAgICAgIDogdGhpcy5fc3RhcnQ7XG4gICAgICAgIGZvciAoOyBpIDwgdGhpcy5fZW5kOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByID0gdGhpcy5fbWV0YS5fcnVsZXNbaV07XG4gICAgICAgICAgICBpZiAoIXIuZGlzYWJsZWQoKSAmJiAhdGhpcy5fbWV0YS5pc1RyYWl0RXhwb3J0UnVsZShyKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBzdGFydFJhbmsoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9zdGFydCA8IHRoaXMuX21ldGEuX3J1bGVDb3VudClcbiAgICAgICAgICAgID8gdGhpcy5fbWV0YS5fcnVsZXNbdGhpcy5fc3RhcnRdLnJhbmtcbiAgICAgICAgICAgIDogdGhpcy5fcmFuayAtICh0aGlzLl9lbmQgLSB0aGlzLl9zdGFydCk7XG4gICAgfVxuXG4gICAgYWxsb2NhdGVOZXh0UnVsZUVudHJ5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5fbWV0YS5fcnVsZUNvdW50ID4gdGhpcy5fZW5kKSA/IHRoaXMuX21ldGEuX3J1bGVDb3VudCsrIDogdGhpcy5fZW5kKys7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydDtcbiAgICB9XG5cbiAgICBnZXQgZW5kKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmQ7XG4gICAgfVxuXG4gICAgZ2V0IGVkaXRhYmxlU3RhcnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRhYmxlU3RhcnQ7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQWJzdHJhY3Rpb24gZm9yIHZhbHVlcyAob3Igc2V0cyBvZiB2YWx1ZXMpIHRoYXQgY2FuIGJlIG1hdGNoZWQgYWdhaW5zdCBvdGhlcnNcbiAqIChpbiB0aGUgY29udGV4dCBvZiBTZWxlY3RvciBrZXkvdmFsdWUpIG1hdGNoaW5nLiAgU3VidHlwZXMgdGFrZSBhZHZhbnRhZ2Ugb2ZcbiAqIHRoZSBmYWN0IHRoYXQgVmFsdWVNYXRjaGVzIGluc3RhbmNlcyBnbG9iYWxseSB1bmlxdWVseSByZXByZXNlbnQga2V5L3ZhbHVlIHBhaXJzXG4gKiB0byBlbmFibGUgZWZmaWNpZW50IG1hdGNoaW5nIGVudGlyZWx5IHRocm91Z2ggaWRlbnRpdHkgY29tcGFyaXNvbi5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoVmFsdWUge1xuICAgIG1hdGNoZXMgKG90aGVyOiBNYXRjaFZhbHVlKTogYm9vbGVhbjtcblxuICAgIHVwZGF0ZUJ5QWRkaW5nIChvdGhlcjogTWF0Y2hWYWx1ZSk6IE1hdGNoVmFsdWU7XG59XG5cblxuLyoqXG4gKlxuICogVW5pcXVlbHkgcmVwcmVzZW50cyBhIHBhcnRpY3VsYXIga2V5L3ZhbHVlIGluIHRoZSBNZXRhIHNjb3BlLCBhbmQgaW5kZXhlcyBhbGwgcnVsZXNcbiAqIHdpdGggKGluZGV4ZWQpIFNlbGVjdG9ycyBtYXRjaGluZyB0aGF0IGtleS92YWx1ZS5cblxuICogVmFsdWVNYXRjaGVzIGFsc28gbW9kZWxzICppbmhlcml0YW5jZSogYnkgYWxsb3dpbmcgb25lIGtleS92YWx1ZSB0byBoYXZlIGFub3RoZXJcbiAqIGFzIGl0cyAncGFyZW50JyBhbmQgdGhlcmVieSBtYXRjaCBvbiBhbnkgU2VsZWN0b3IgKGFuZCBydWxlKSB0aGF0IGl0cyBwYXJlbnQgd291bGQuXG4gKlxuICogRm9yIGluc3RhbmNlLCB0aGlzIGVuYWJsZXMgYSBydWxlIG9uIGNsYXNzPU51bWJlciB0byBhcHBseSB0byBjbGFzcz1JbnRlZ2VyIGFuZFxuICogY2xhc3M9QmlnRGVjaW1hbCwgYW5kIG9uZSBvbiBjbGFzcz0qIHRvIGFwcGx5IHRvIGFueS5cbiAqXG4gKiBUaGUgdXRpbGl0eSBvZiAncGFyZW50JyBpcyBub3QgbGltaXRlZCwgb2YgY291cnNlLCB0byB0aGUga2V5ICdjbGFzcyc6IGFsbCBrZXlzXG4gKiB0YWtlIGFkdmFudGFnZSBvZiB0aGUgcGFyZW50ICcqJyB0byBzdXBwb3J0IHVucXVhbGlmaWVkIG1hdGNoZXMgb24gdGhhdCBrZXksIGFuZFxuICoga2V5cyBsaWtlICdvcGVyYXRpb24nIGRlZmluZSBhIHZhbHVlIGhpZXJhcmNoeSAoICdpbnNwZWN0JyAtPiB7J3ZpZXcnLCAnc2VhcmNoJ30sXG4gKiAnc2VhcmNoJyAtPiB7J2tleXdvcmRTZWFyY2gnLCAndGV4dFNlYXJjaCd9KVxuICovXG5cbmV4cG9ydCBjbGFzcyBWYWx1ZU1hdGNoZXMgaW1wbGVtZW50cyBNYXRjaFZhbHVlIHtcblxuICAgIF92YWx1ZTogYW55O1xuICAgIF9yZWFkOiBib29sZWFuID0gZmFsc2U7XG4gICAgX2FycjogbnVtYmVyW107XG5cbiAgICBfcGFyZW50OiBWYWx1ZU1hdGNoZXM7XG4gICAgX3BhcmVudFNpemU6IG51bWJlciA9IDA7XG5cblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBjaGVja1BhcmVudCgpIHtcbiAgICAgICAgLy8gdG9kbzogcGVyZm9ybWFuY2U6IGtlZXAgYSBydWxlIHNldCB2ZXJzaW9uICMgYW5kIG9ubHkgZG8gdGhpcyB3aGVuIHRoZSBydWxlIHNldCBoYXNcbiAgICAgICAgLy8gcmVsb2FkZWRcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhcmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5jaGVja1BhcmVudCgpO1xuXG4gICAgICAgICAgICBsZXQgcGFyZW50QXJyOiBudW1iZXJbXSA9IHRoaXMuX3BhcmVudC5fYXJyO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHBhcmVudEFycikgJiYgcGFyZW50QXJyWzBdICE9PSB0aGlzLl9wYXJlbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJyID0gTWF0Y2gudW5pb24odGhpcy5fYXJyLCBwYXJlbnRBcnIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudFNpemUgPSBwYXJlbnRBcnJbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hdGNoZXMob3RoZXI6IE1hdGNoVmFsdWUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBWYWx1ZU1hdGNoZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3RoZXIubWF0Y2hlcyh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIHJlY3Vyc2UgdXAgcGFyZW50IGNoYWluIHRvIGRvIHN1cGVyY2xhc3MgbWF0Y2hlc1xuICAgICAgICByZXR1cm4gKG90aGVyID09PSB0aGlzKSB8fCAoaXNQcmVzZW50KHRoaXMuX3BhcmVudCkgJiYgdGhpcy5fcGFyZW50Lm1hdGNoZXMob3RoZXIpKTtcbiAgICB9XG5cbiAgICB1cGRhdGVCeUFkZGluZyhvdGhlcjogTWF0Y2hWYWx1ZSk6IE1hdGNoVmFsdWUge1xuICAgICAgICBsZXQgbXVsdGk6IE11bHRpTWF0Y2hWYWx1ZSA9IG5ldyBNdWx0aU1hdGNoVmFsdWUoKTtcbiAgICAgICAgbXVsdGkuZGF0YS5wdXNoKHRoaXMpO1xuICAgICAgICByZXR1cm4gbXVsdGkudXBkYXRlQnlBZGRpbmcob3RoZXIpO1xuICAgIH1cblxufVxuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvd2lraS9GQVEjd2h5LWRvZXNudC1leHRlbmRpbmctYnVpbHQtaW5zLWxpa2UtZXJyb3ItXG4vLyAgYXJyYXktYW5kLW1hcC13b3JrXG5leHBvcnQgY2xhc3MgTXVsdGlNYXRjaFZhbHVlIGltcGxlbWVudHMgTWF0Y2hWYWx1ZSB7XG5cbiAgICBkYXRhOiBBcnJheTxNYXRjaFZhbHVlPiA9IFtdO1xuXG5cbiAgICBtYXRjaGVzKG90aGVyOiBNYXRjaFZhbHVlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChvdGhlciBpbnN0YW5jZW9mIE11bHRpTWF0Y2hWYWx1ZSkge1xuICAgICAgICAgICAgLy8gbGlzdCAvIGxpc3QgY29tcGFyaXNvbjogYW55IGNvbWJvIGNhbiBtYXRjaFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXIubWF0Y2hlcyh0aGlzLmRhdGFbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNpbmdsZSB2YWx1ZSBhZ2FpbnN0IGFycmF5OiBvbmUgbXVzdCBtYXRjaFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhW2ldLm1hdGNoZXMob3RoZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdXBkYXRlQnlBZGRpbmcob3RoZXI6IE1hdGNoVmFsdWUpOiBNYXRjaFZhbHVlIHtcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgTXVsdGlNYXRjaFZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hWYWx1ZTogTXVsdGlNYXRjaFZhbHVlID0gPE11bHRpTWF0Y2hWYWx1ZT4gb3RoZXI7XG4gICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRBbGwodGhpcy5kYXRhLCBtYXRjaFZhbHVlLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2gob3RoZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlUXVlcmllZE9ic2VydmVyIHtcblxuICAgIG5vdGlmeSAobWV0YTogTWV0YSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xuXG59XG5cblxuLyoqXG4gKiBVc2VkIHRvIHRyYW5zZm9ybSB2YWx1ZXMgaW50byB0aGUgKHN0YXRpYykgdmVyc2lvbiB0aGV5IHNob3VsZCBiZSBpbmRleGVkIC8gc2VhcmNoZWQgdW5kZXJcbiAqIEZvciBpbnN0YW5jZSwgJ29iamVjdCcgbWF5IGJlIGluZGV4ZWQgYXMgdHJ1ZS9mYWxzZSAocHJlc2VudCBvciBub3QpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgS2V5VmFsdWVUcmFuc2Zvcm1lciB7XG4gICAgdHJhbmZvcm1Gb3JNYXRjaCAobzogYW55KTogYW55O1xufVxuXG5cbmV4cG9ydCBjbGFzcyBLZXlWYWx1ZVRyYW5zZm9ybWVyX0tleVByZXNlbnQgaW1wbGVtZW50cyBLZXlWYWx1ZVRyYW5zZm9ybWVyIHtcblxuXG4gICAgdHJhbmZvcm1Gb3JNYXRjaChvOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudChvKSAmJiAhKEJvb2xlYW5XcmFwcGVyLmlzRmFsc2UobykpKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cblxufVxuXG5cbi8qKlxuICogQ2FsbGVkIG9uIGltcGxlbWVudGluZyB2YWx1ZXMgdG8gYWxsb3cgc3RhdGljYWxseSByZXNvbHZhYmxlIChidXQgZHluYW1pYykgdmFsdWVzXG4gKiB0byBldmFsdWF0ZS9jb3B5IHRoZW1zZWx2ZXMgZm9yIGluY2x1c2lvbiBpbiBhIG5ldyBtYXAgKHRvIGVuc3VyZSB0aGF0IGEgdmFsdWUgdGhhdFxuICogZGVyaXZlZCBpdHMgdmFsdWUgYmFzZWQgb24gYSBkaWZmZXJlbnQgY29udGV4dCBkb2Vzbid0IGdldCByZXVzZWQgaW4gYW5vdGhlcilcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0eU1hcEF3YWtpbmcge1xuICAgIHByb3BlcnR5QXdha2luZzogYm9vbGVhbjtcblxuICAgIGF3YWtlRm9yUHJvcGVydHlNYXAgKG1hcDogUHJvcGVydHlNYXApOiBhbnk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvcGVydHlNYXBBd2FraW5nKGFyZzogYW55KTogYXJnIGlzIFByb3BlcnR5TWFwQXdha2luZyB7XG4gICAgcmV0dXJuIGlzUHJlc2VudChhcmcpICYmIGlzUHJlc2VudChhcmcucHJvcGVydHlBd2FraW5nKTtcbn1cbiJdfQ==