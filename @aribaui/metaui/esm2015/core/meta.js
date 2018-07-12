/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class Meta {
    constructor() {
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
        let /** @type {?} */ nooprule = new Rule(null, null, 0, 0);
        nooprule.disable();
        this._rules[0] = nooprule;
        this._ruleCount = 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static booleanValue(value) {
        return BooleanWrapper.boleanValue(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static toList(value) {
        return (isArray(value)) ? value : [value];
    }
    /**
     * @param {?} one
     * @param {?} two
     * @return {?}
     */
    static objectEquals(one, two) {
        if (isBlank(one) && isBlank(two)) {
            return true;
        }
        if (isBlank(one) || isBlank(two)) {
            return false;
        }
        return equals(one, two);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    static overrideKeyForKey(key) {
        return key + '_o';
    }
    /**
     * @param {?} traits
     * @param {?} map
     * @return {?}
     */
    static addTraits(traits, map) {
        let /** @type {?} */ current = map.get(Meta.KeyTrait);
        if (isBlank(current)) {
            map.set(Meta.KeyTrait, traits);
        }
        else {
            ListWrapper.addAll(current, traits);
            map.set(Meta.KeyTrait, current);
        }
    }
    /**
     * @param {?} trait
     * @param {?} map
     * @return {?}
     */
    static addTrait(trait, map) {
        let /** @type {?} */ current = map.get(Meta.KeyTrait);
        if (isBlank(current)) {
            map.set(Meta.KeyTrait, Meta.toList(trait));
        }
        else {
            current.push(trait);
            map.set(Meta.KeyTrait, current);
        }
    }
    /**
     * @param {?} object
     * @return {?}
     */
    static className(object) {
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
    }
    /**
     * @param {?} loader
     * @return {?}
     */
    registerLoader(loader) {
        this._ruleLoader = loader;
    }
    /**
     * @param {?} rule
     * @return {?}
     */
    addRule(rule) {
        let /** @type {?} */ selectors = rule.selectors;
        if (selectors.length > 0 && selectors[selectors.length - 1].isDecl) {
            let /** @type {?} */ decl = rule.createDecl();
            this._addRule(decl, true);
        }
        // we allow null to enable creation of a decl, but otherwise this rule has no effect
        if (isPresent(rule.properties)) {
            // After we've captured the decl, do the collapse
            rule._selectors = rule.convertKeyOverrides(rule._selectors);
            this._addRule(rule, true);
        }
    }
    /**
     * @param {?} rule
     * @param {?} pos
     * @return {?}
     */
    _addToRules(rule, pos) {
        this._rules[pos] = rule;
    }
    /**
     * @param {?} rule
     * @param {?} checkPropScope
     * @return {?}
     */
    _addRule(rule, checkPropScope) {
        assert(isPresent(this._currentRuleSet), 'Attempt to add rule without current RuleSet');
        let /** @type {?} */ selectors = rule._selectors;
        let /** @type {?} */ entryId = this._currentRuleSet.allocateNextRuleEntry();
        rule.id = entryId;
        if (rule.rank === 0) {
            rule.rank = this._currentRuleSet._rank++;
        }
        rule.ruleSet = this._currentRuleSet;
        this._addToRules(rule, entryId);
        // index it
        let /** @type {?} */ lastScopeKeyData;
        let /** @type {?} */ declKey;
        let /** @type {?} */ declMask = this.declareKeyMask;
        let /** @type {?} */ matchMask = 0, /** @type {?} */ indexedMask = 0, /** @type {?} */ antiMask = 0;
        let /** @type {?} */ count = selectors.length;
        let /** @type {?} */ indexOnlySelector = Meta._UsePartialIndexing ? this.bestSelectorToIndex(selectors) : null;
        for (let /** @type {?} */ i = count - 1; i >= 0; i--) {
            let /** @type {?} */ p = selectors[i];
            let /** @type {?} */ shouldIndex = (indexOnlySelector === null || p === indexOnlySelector);
            let /** @type {?} */ data = this.keyData(p.key);
            let /** @type {?} */ dataMask = data.maskValue();
            if (!this.isNullMarker(p.value)) {
                if (shouldIndex || Meta._DebugDoubleCheckMatches) {
                    if (isArray(p.value)) {
                        for (let /** @type {?} */ v of p.value) {
                            data.addEntry(v, entryId);
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
        let /** @type {?} */ isDecl = isPresent(declKey);
        let /** @type {?} */ nonScopeKeyDecl = isPresent(declKey) && !this.keyData(declKey).isPropertyScope;
        if (!isDecl || nonScopeKeyDecl) {
            // all non-decl rules don't apply outside decl context
            if (!isDecl) {
                antiMask |= declMask;
            }
            if (isPresent(lastScopeKeyData) && checkPropScope) {
                let /** @type {?} */ traitVal = rule.properties.get(Meta.KeyTrait);
                if (isPresent(traitVal)) {
                    let /** @type {?} */ traitKey = lastScopeKeyData._key + '_trait';
                    let /** @type {?} */ properties = MapWrapper.createEmpty();
                    properties.set(traitKey, traitVal);
                    let /** @type {?} */ traitRule = new Rule(rule._selectors, properties, rule.rank, rule.lineNumber);
                    this._addRule(traitRule, false);
                }
                rule._selectors = selectors.slice(0);
                let /** @type {?} */ scopeSel = new Selector(Meta.ScopeKey, lastScopeKeyData.key);
                rule.selectors.push(scopeSel);
                let /** @type {?} */ data = this.keyData(Meta.ScopeKey);
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
    }
    /**
     * @param {?} selectors
     * @return {?}
     */
    bestSelectorToIndex(selectors) {
        let /** @type {?} */ best;
        let /** @type {?} */ bestRank = Number.MIN_VALUE;
        let /** @type {?} */ pos = 0;
        for (let /** @type {?} */ sel of selectors) {
            let /** @type {?} */ rank = this.selectivityRank(sel) + pos++;
            if (rank > bestRank) {
                best = sel;
                bestRank = rank;
            }
        }
        return best;
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    selectivityRank(selector) {
        // Score selectors: good if property scope, key !== '*' or bool
        // '*' is particularly bad, since these are inherited by all others
        let /** @type {?} */ score = 1;
        let /** @type {?} */ value = selector.value;
        if (isPresent(value) && !(Meta.KeyAny === value)) {
            score += (isBoolean(value) ? 1 : 9);
        }
        let /** @type {?} */ keyData = this.keyData(selector.key);
        if (keyData.isPropertyScope) {
            score *= 5;
        }
        // Todo: we could score based on # of entries in KeyData
        return score;
    }
    /**
     * if addition of this rule results in addition of extra rules, those are returned
     * (null otherwise)
     * @return {?}
     */
    _editingRuleEnd() {
        return Math.max(this._currentRuleSet.end, this._ruleCount);
    }
    /**
     * @param {?} rule
     * @return {?}
     */
    _addRuleAndReturnExtras(rule) {
        let /** @type {?} */ start = this._editingRuleEnd();
        let /** @type {?} */ extras;
        this.addRule(rule);
        // Return any extra rules created by addition of this one
        for (let /** @type {?} */ i = start, /** @type {?} */ c = this._editingRuleEnd(); i < c; i++) {
            let /** @type {?} */ r = this._rules[i];
            if (r !== rule) {
                if (isBlank(extras)) {
                    extras = new Array();
                }
                extras.push(r);
            }
        }
        return extras;
    }
    /**
     * @param {?} rule
     * @param {?} extras
     * @return {?}
     */
    _updateEditedRule(rule, extras) {
        // in place replace existing rule with NoOp
        let /** @type {?} */ nooprule = new Rule(null, null, 0, 0);
        nooprule.disable();
        this._rules[rule.id] = nooprule;
        if (isPresent(extras)) {
            for (let /** @type {?} */ r of extras) {
                r.disable();
            }
        }
        // Since this rule has already been mutated (the first time it was added) we need to
        // reverse the addition of the scopeKey
        let /** @type {?} */ preds = rule.selectors;
        if ((isPresent(preds) && preds.length > 0) && ListWrapper.last(preds).key === Meta.ScopeKey) {
            ListWrapper.removeAt(preds, preds.length);
        }
        // now (re)-add it and invalidate
        extras = this._addRuleAndReturnExtras(rule);
        this.invalidateRules();
        return extras;
    }
    /**
     * @param {?} preds
     * @return {?}
     */
    scopeKeyForSelector(preds) {
        for (let /** @type {?} */ i = preds.length - 1; i >= 0; i--) {
            let /** @type {?} */ pred = preds[i];
            let /** @type {?} */ data = this.keyData(pred.key);
            if (data.isPropertyScope) {
                return pred.key;
            }
        }
        return null;
    }
    /**
     * @param {?} selectorMap
     * @param {?} propertyMap
     * @return {?}
     */
    addRuleFromSelectorMap(selectorMap, propertyMap) {
        this.addRuleFromSelectorMapWithRank(selectorMap, propertyMap, 0);
    }
    /**
     * @param {?} selectorMap
     * @param {?} propertyMap
     * @param {?} rank
     * @return {?}
     */
    addRuleFromSelectorMapWithRank(selectorMap, propertyMap, rank) {
        let /** @type {?} */ rule = new Rule(Selector.fromMap(selectorMap), propertyMap, 0, -1);
        if (rank !== 0) {
            rule.rank = rank;
        }
        this.addRule(rule);
    }
    /**
     * @param {?} ruleSet
     * @param {?} selectors
     * @return {?}
     */
    addRules(ruleSet, selectors) {
        // Special keys:  'props, 'rules'.  Everthing else is a selector
        let /** @type {?} */ props;
        let /** @type {?} */ rules;
        MapWrapper.iterable(ruleSet).forEach((value, key) => {
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
            for (let /** @type {?} */ r of rules) {
                this.addRules(r, selectors);
            }
        }
    }
    /**
     * @param {?=} ruleText
     * @param {?=} module
     * @param {?=} editable
     * @return {?}
     */
    _loadRules(ruleText, module = 'system', editable = true) {
        try {
            if (isPresent(this._ruleLoader)) {
                this._ruleLoader.loadRules(this, ruleText, module, (rule) => this.addRule(rule));
            }
        }
        catch (/** @type {?} */ e) {
            this.endRuleSet().disableRules();
            throw new Error('Error loading rule: ' + e);
        }
    }
    /**
     * @param {?=} ruleText
     * @return {?}
     */
    loadRules(ruleText) {
        this._loadRulesWithRuleSet('StringLiteral', ruleText, 0);
        this.endRuleSet();
    }
    /**
     * @param {?} filename
     * @param {?} ruleText
     * @param {?} rank
     * @return {?}
     */
    _loadRulesWithRuleSet(filename, ruleText, rank) {
        this.beginRuleSetWithRank(rank, filename);
        try {
            this._loadRules(ruleText);
        }
        catch (/** @type {?} */ e) {
            this.endRuleSet().disableRules();
            throw new Error('Error loading rule: ' + e);
        }
    }
    /**
     * @param {?} source
     * @param {?} userClass
     * @return {?}
     */
    loadUserRule(source, userClass) {
        return unimplemented();
    }
    /**
     * @param {?} propString
     * @param {?} propertyMap
     * @return {?}
     */
    parsePropertyAssignment(propString, propertyMap) {
        // todo: implement this
        return unimplemented();
    }
    /**
     * @return {?}
     */
    clearCaches() {
        this._MatchToPropsCache = new Collections.Dictionary();
        this._PropertyMapUniquer = new Collections.Dictionary();
        this._identityCache = new Collections.Dictionary();
    }
    /**
     * @param {?} rule
     * @return {?}
     */
    isTraitExportRule(rule) {
        if (isBlank(rule.properties) || rule || rule.properties.size === 1) {
            let /** @type {?} */ key = Array.from(rule.properties.keys())[0];
            return StringWrapper.endsWidth(key, '_trait');
        }
        return false;
    }
    /**
     * @param {?} identificator
     * @return {?}
     */
    beginRuleSet(identificator) {
        this.beginRuleSetWithRank(this._ruleCount, identificator);
    }
    /**
     * @param {?} rank
     * @param {?} filePath
     * @return {?}
     */
    beginRuleSetWithRank(rank, filePath) {
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
    }
    /**
     * @param {?} orig
     * @return {?}
     */
    beginReplacementRuleSet(orig) {
        let /** @type {?} */ origRank = orig.startRank();
        this.beginRuleSetWithRank(this._ruleCount, orig._filePath);
        this._currentRuleSet._rank = origRank;
    }
    /**
     * @return {?}
     */
    endRuleSet() {
        assert(isPresent(this._currentRuleSet), 'No rule set progress');
        let /** @type {?} */ result = this._currentRuleSet;
        if (this._ruleCount < result._end) {
            this._ruleCount = result._end;
        }
        this._currentRuleSet = null;
        this._ruleSetGeneration++;
        return result;
    }
    /**
     * @return {?}
     */
    get ruleSetGeneration() {
        return this._ruleSetGeneration;
    }
    /**
     * @return {?}
     */
    invalidateRules() {
        this._ruleSetGeneration++;
        this.clearCaches();
    }
    /**
     * @return {?}
     */
    newContext() {
        return new Context(this);
    }
    /**
     * @return {?}
     */
    get declareKeyMask() {
        return this._declareKeyMask;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    touch(key, value) {
        let /** @type {?} */ context = this.newContext();
        context.push();
        context.set(key, value);
        context.allProperties();
        context.pop();
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    transformValue(key, value) {
        let /** @type {?} */ keyData = this._keyData.get(key);
        if (isPresent(keyData) && isPresent(keyData._transformer)) {
            value = keyData._transformer.tranformForMatch(value);
        }
        return value;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} intermediateResult
     * @return {?}
     */
    match(key, value, intermediateResult) {
        let /** @type {?} */ keyData = this._keyData.get(key);
        if (isBlank(keyData)) {
            return intermediateResult;
        }
        let /** @type {?} */ keyMask = shiftLeft(1, keyData._id);
        // Does our result already include this key?  Then no need to join again
        // if (intermediateResult !== null && (intermediateResult._keysMatchedMask & keyMask) !==
        // 0) return intermediateResult;
        return new MatchResult(this, keyData, value, intermediateResult);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} intermediateResult
     * @return {?}
     */
    unionOverrideMatch(key, value, intermediateResult) {
        let /** @type {?} */ keyData = this._keyData.get(Meta.overrideKeyForKey(key));
        if (isBlank(keyData)) {
            return intermediateResult;
        }
        return new UnionMatchResult(this, keyData, value, intermediateResult);
    }
    /**
     * @return {?}
     */
    newPropertiesMap() {
        return new PropertyMap();
    }
    /**
     * @param {?} matchResult
     * @return {?}
     */
    propertiesForMatch(matchResult) {
        let /** @type {?} */ properties = this._MatchToPropsCache.getValue(matchResult);
        if (isPresent(properties)) {
            return properties;
        }
        properties = this.newPropertiesMap();
        let /** @type {?} */ arr = matchResult.filteredMatches();
        if (isBlank(arr)) {
            return properties;
        }
        // first entry is count
        let /** @type {?} */ count = arr[0];
        let /** @type {?} */ rules = new Array(count);
        for (let /** @type {?} */ i = 0; i < count; i++) {
            rules[i] = this._rules[arr[i + 1]];
        }
        ListWrapper.sort(rules, (o1, o2) => o1.rank - o2.rank);
        let /** @type {?} */ modifiedMask = 0;
        let /** @type {?} */ declareKey = ((this._declareKeyMask & matchResult.keysMatchedMask) !== 0)
            ? matchResult.valueForKey(Meta.KeyDeclare) : null;
        for (let /** @type {?} */ r in rules) {
            modifiedMask |= rules[r].apply(this, properties, declareKey);
        }
        properties.awakeProperties();
        this._MatchToPropsCache.setValue(matchResult.immutableCopy(), properties);
        return properties;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    keyData(key) {
        let /** @type {?} */ data = this._keyData.get(key);
        if (isBlank(data)) {
            let /** @type {?} */ id = this._nextKeyId;
            if (id >= Meta.MaxKeyDatas - 1) {
                print('Exceeded maximum number of context keys');
            }
            this._nextKeyId++;
            data = new KeyData(key, id);
            this._keyDatasById[id] = data;
            this._keyData.set(key, data);
        }
        return data;
    }
    /**
     * @param {?} mask
     * @return {?}
     */
    _keysInMask(mask) {
        let /** @type {?} */ matches = [];
        let /** @type {?} */ pos = 0;
        while (mask !== 0) {
            if ((mask & 1) !== 0) {
                matches.push(this._keyDatasById[pos]._key);
            }
            pos++;
            mask = shiftRight(mask, 1);
        }
        return matches;
    }
    /**
     * @param {?} key
     * @param {?} o
     * @return {?}
     */
    registerKeyInitObserver(key, o) {
        this.keyData(key).addObserver(o);
    }
    /**
     * @param {?} key
     * @param {?} transformer
     * @return {?}
     */
    registerValueTransformerForKey(key, transformer) {
        this.keyData(key)._transformer = transformer;
    }
    /**
     * @return {?}
     */
    get identityCache() {
        return this._identityCache;
    }
    /**
     * @return {?}
     */
    newMatchArray() {
        return [];
    }
    /**
     * @param {?} array
     * @param {?} keyData
     * @param {?} matchValue
     * @return {?}
     */
    matchArrayAssign(array, keyData, matchValue) {
        let /** @type {?} */ idx = keyData._id;
        let /** @type {?} */ curr = array[idx];
        if (isPresent(curr)) {
            matchValue = curr.updateByAdding(matchValue);
        }
        array[idx] = matchValue;
    }
    /**
     * @param {?} propertyName
     * @param {?} origValue
     * @return {?}
     */
    propertyWillDoMerge(propertyName, origValue) {
        let /** @type {?} */ merger = this.mergerForProperty(propertyName);
        return this.isPropertyMergerIsChaining(merger) || (isPresent(origValue) && (origValue instanceof Map));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    managerForProperty(name) {
        let /** @type {?} */ manager = this._managerForProperty.get(name);
        if (isBlank(manager)) {
            manager = new PropertyManager(name);
            this._managerForProperty.set(name, manager);
        }
        return manager;
    }
    /**
     * @param {?} propertyName
     * @param {?} contextKey
     * @return {?}
     */
    mirrorPropertyToContext(propertyName, contextKey) {
        let /** @type {?} */ keyData = this.keyData(contextKey);
        let /** @type {?} */ manager = this.managerForProperty(propertyName);
        manager._keyDataToSet = keyData;
    }
    /**
     * @param {?} contextKey
     * @return {?}
     */
    defineKeyAsPropertyScope(contextKey) {
        let /** @type {?} */ keyData = this.keyData(contextKey);
        keyData.isPropertyScope = true;
        let /** @type {?} */ traitKey = contextKey + '_trait';
        this.mirrorPropertyToContext(traitKey, traitKey);
        this.registerPropertyMerger(traitKey, Meta.PropertyMerger_DeclareList);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    isPropertyScopeKey(key) {
        return Meta.ScopeKey === key;
    }
    /**
     * @param {?} propertyName
     * @param {?} merger
     * @return {?}
     */
    registerPropertyMerger(propertyName, merger) {
        if (isBlank(merger._meta)) {
            merger._meta = this;
        }
        let /** @type {?} */ manager = this.managerForProperty(propertyName);
        manager._merger = merger;
    }
    /**
     * @param {?} propertyName
     * @return {?}
     */
    mergerForProperty(propertyName) {
        let /** @type {?} */ manager = this.managerForProperty(propertyName);
        return manager._merger;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isPropertyMergerIsChaining(val) {
        return isPresent(val.isPropMergerIsChainingMark) && val.isPropMergerIsChainingMark;
    }
    /**
     * @param {?} trait
     * @return {?}
     */
    groupForTrait(trait) {
        return 'default';
    }
    /**
     * @return {?}
     */
    _logRuleStats() {
        let /** @type {?} */ total = 0;
        let /** @type {?} */ values = this._keyData.keys();
        let /** @type {?} */ counts = [];
        for (const /** @type {?} */ id of Array.from(values)) {
            let /** @type {?} */ keyData = this._keyData.get(id);
            let /** @type {?} */ valuess = keyData.ruleVecs.values();
            for (let /** @type {?} */ vm of valuess) {
                let /** @type {?} */ kvc = new KeyValueCount(keyData._key, (/** @type {?} */ (vm))['_value'], isPresent(vm._arr) ? vm._arr[0] : 0);
                total += kvc.count;
                counts.push(kvc);
            }
        }
        ListWrapper.sort(counts, (o1, o2) => o2.count - o1.count);
        let /** @type {?} */ buf = new StringJoiner([]);
        let /** @type {?} */ c = Math.min(10, counts.length);
        buf.add('Total index entries comparisons performed: ' + Match._Debug_ElementProcessCount);
        buf.add('\nTotal index entries: ' + total);
        buf.add('\nTop  keys/values: ' + c);
        for (let /** @type {?} */ i = 0; i < c; i++) {
            let /** @type {?} */ kvc = counts[i];
            buf.add('     ' + kvc.key + '  = ' + kvc.value + ' : ' + kvc.count + ' entries');
            buf.add('\n');
        }
        print(buf.toString());
    }
    /**
     * @return {?}
     */
    toString() {
        return 'Meta';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isNullMarker(value) {
        return isPresent(value) && value['markernull'];
    }
    /**
     * @param {?} testRuleName
     * @param {?} source
     * @return {?}
     */
    addTestUserRule(testRuleName, source) {
        this._testRules.set(testRuleName, source);
    }
}
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
export class KeyValueCount {
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} count
     */
    constructor(key, value, count) {
        this.key = key;
        this.value = value;
        this.count = count;
    }
}
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
export class PropertyManager {
    /**
     * @param {?} _name
     */
    constructor(_name) {
        this._name = _name;
    }
    /**
     * @param {?} propertyName
     * @param {?} orig
     * @param {?} newValue
     * @param {?} isDeclare
     * @return {?}
     */
    mergeProperty(propertyName, orig, newValue, isDeclare) {
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
                    let /** @type {?} */ origClone = MapWrapper.clone(orig);
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
    }
}
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
export class OverrideValue {
    /**
     * @param {?} _value
     */
    constructor(_value) {
        this._value = _value;
    }
    /**
     * @return {?}
     */
    value() {
        return this._value === 'null' ? null : this._value;
    }
    /**
     * @return {?}
     */
    toString() {
        return isPresent(this._value) ? this._value.toString() + '!' : 'null' + '!';
    }
}
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
export class KeyData {
    /**
     * @param {?} _key
     * @param {?} _id
     */
    constructor(_key, _id) {
        this._key = _key;
        this._id = _id;
        this._isPropertyScope = false;
        this._ruleVecs = new Collections.Dictionary();
        this._any = this.get(Meta.KeyAny);
    }
    /**
     * @return {?}
     */
    maskValue() {
        return shiftLeft(1, this._id);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    get(value) {
        if (isBlank(value)) {
            value = Meta.NullMarker;
        }
        else if (isPresent(this._transformer)) {
            value = this._transformer.tranformForMatch(value);
        }
        let /** @type {?} */ matches = this._ruleVecs.getValue(value);
        if (isBlank(matches)) {
            matches = new ValueMatches(value);
            if (isPresent(value) && !BooleanWrapper.isFalse(value)) {
                matches._parent = this._any;
            }
            this._ruleVecs.setValue(value, matches);
        }
        return matches;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    matchValue(value) {
        if (isArray(value)) {
            let /** @type {?} */ list = value;
            if (list.length === 1) {
                return this.get(list[0]);
            }
            let /** @type {?} */ multi = new MultiMatchValue();
            ListWrapper.forEachWithIndex(list, (v, i) => {
                multi.data.push(this.get(v));
            });
            return multi;
        }
        else {
            return this.get(value);
        }
    }
    /**
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    addEntry(value, id) {
        let /** @type {?} */ matches = this.get(value);
        let /** @type {?} */ before = matches._arr;
        let /** @type {?} */ after = Match.addInt(before, id);
        if (before !== after) {
            matches._arr = after;
        }
    }
    /**
     * @param {?} owner
     * @param {?} value
     * @return {?}
     */
    lookup(owner, value) {
        let /** @type {?} */ matches = this.get(value);
        if (!matches._read && isPresent(this._observers)) {
            try {
                if (!matches._read) {
                    // notify
                    if (isPresent(value)) {
                        ListWrapper.forEachWithIndex(this._observers, (v, i) => {
                            v.notify(owner, this._key, value);
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
    }
    /**
     * @param {?} value
     * @param {?} parentValue
     * @return {?}
     */
    setParent(value, parentValue) {
        let /** @type {?} */ parent = this.get(parentValue);
        let /** @type {?} */ child = this.get(value);
        child._parent = parent;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parent(value) {
        let /** @type {?} */ child = this.get(value);
        return child._parent._value;
    }
    /**
     * @param {?} o
     * @return {?}
     */
    addObserver(o) {
        if (isBlank(this._observers)) {
            this._observers = new Array();
        }
        this._observers.push(o);
    }
    /**
     * @return {?}
     */
    get isPropertyScope() {
        return this._isPropertyScope;
    }
    /**
     * @param {?} yn
     * @return {?}
     */
    set isPropertyScope(yn) {
        this._isPropertyScope = yn;
    }
    /**
     * @return {?}
     */
    get ruleVecs() {
        return this._ruleVecs;
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
    get id() {
        return this._id;
    }
    /**
     * @return {?}
     */
    get observers() {
        return this._observers;
    }
}
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
export class PropertyMap {
    /**
     * @param {?=} entries
     */
    constructor(entries) {
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
    get(key) {
        return this._map.get(key);
    }
    /**
     * @return {?}
     */
    keys() {
        return this._map.keys();
    }
    /**
     * @return {?}
     */
    values() {
        return this._map.values();
    }
    /**
     * @return {?}
     */
    clear() {
        this._map.clear();
    }
    /**
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    set(key, value) {
        return this._map.set(key, value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    delete(key) {
        return this._map.delete(key);
    }
    /**
     * @param {?} callbackfn
     * @param {?=} thisArg
     * @return {?}
     */
    forEach(callbackfn, thisArg) {
        this._map.forEach(callbackfn);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    has(key) {
        return this._map.has(key);
    }
    /**
     * @return {?}
     */
    [Symbol.iterator]() {
        return this._map[Symbol.iterator]();
    }
    /**
     * @return {?}
     */
    entries() {
        return this._map.entries();
    }
    /**
     * @return {?}
     */
    get size() {
        return this._map.size;
    }
    /**
     * @return {?}
     */
    awakeProperties() {
        MapWrapper.iterable(this).forEach((value, key) => {
            if (isPropertyMapAwaking(value)) {
                let /** @type {?} */ newValue = value.awakeForPropertyMap(this);
                if (newValue !== value) {
                    this.set(key, newValue);
                }
            }
        });
    }
    /**
     * @param {?} key
     * @return {?}
     */
    addContextKey(key) {
        if (isBlank(this._contextPropertiesUpdated)) {
            this._contextPropertiesUpdated = new Array();
        }
        this._contextPropertiesUpdated.push(key);
    }
    /**
     * @return {?}
     */
    get contextKeysUpdated() {
        return this._contextPropertiesUpdated;
    }
    /**
     * @return {?}
     */
    toString() {
        // todo: find better way for the string. thsi is also used as key for the dictionary
        // not really efficient
        let /** @type {?} */ sj = new StringJoiner(['PropertyMap:']);
        sj.add(this.size + ',');
        MapWrapper.iterable(this).forEach((value, key) => {
            if (isPropertyMapAwaking(value)) {
                let /** @type {?} */ newValue = value.awakeForPropertyMap(this);
                if (newValue !== value) {
                    sj.add(key + ':' + value);
                    sj.add(', ');
                }
            }
        });
        return sj.toString();
    }
}
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
export class PropertyMergerDynamic {
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    merge(orig, override, isDeclare) {
        return unimplemented();
    }
    /**
     * @return {?}
     */
    toString() {
        return 'PropertyMergerDynamic';
    }
}
function PropertyMergerDynamic_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMergerDynamic.prototype._meta;
}
export class PropertyMerger_Overwrite {
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    merge(orig, override, isDeclare) {
        return override;
    }
    /**
     * @return {?}
     */
    toString() {
        return 'OVERWRITE';
    }
}
function PropertyMerger_Overwrite_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMerger_Overwrite.prototype._meta;
}
/**
 * PropertyMerger for properties the should be unioned as lists
 */
export class PropertyMerger_List {
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    merge(orig, override, isDeclare) {
        if (!(isArray(orig)) && !(isArray(override)) && Meta.objectEquals(orig, override)) {
            return orig;
        }
        let /** @type {?} */ l1 = Meta.toList(orig);
        let /** @type {?} */ l2 = Meta.toList(override);
        let /** @type {?} */ result = ListWrapper.clone(l1);
        ListWrapper.addElementsIfAbsent(result, l2);
        return result;
    }
}
function PropertyMerger_List_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMerger_List.prototype._meta;
}
/**
 * PropertyMerger for properties the should override normally, but return lists when
 * in declare mode (e.g. 'class', 'field', 'layout', ...)
 */
export class PropertyMergerDeclareList extends PropertyMergerDynamic {
    constructor() {
        super();
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    merge(orig, override, isDeclare) {
        if (!isDeclare) {
            return override;
        }
        if (!(isArray(orig)) && !(isArray(override)) && Meta.objectEquals(orig, override)) {
            return orig;
        }
        let /** @type {?} */ result = [];
        ListWrapper.addElementsIfAbsent(result, Meta.toList(orig));
        ListWrapper.addElementsIfAbsent(result, Meta.toList(override));
        return result;
    }
    /**
     * @return {?}
     */
    toString() {
        return 'PropertyMergerDeclareList';
    }
}
/**
 * PropertyMerger for the 'trait' property.  Generally, traits are unioned, except for traits
 * from the same 'traitGroup', which override (i.e. only one trait from each traitGroup should
 * survive).
 */
export class PropertyMergerDeclareListForTrait extends PropertyMergerDeclareList {
    constructor() {
        super();
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    merge(orig, override, isDeclare) {
        if (isDeclare) {
            return super.merge(orig, override, isDeclare);
        }
        // if we're override a single element with itself, don't go List...
        if (!isArray(orig) && !isArray(override) && Meta.objectEquals(orig, override)) {
            return orig;
        }
        let /** @type {?} */ origL = Meta.toList(orig);
        let /** @type {?} */ overrideL = Meta.toList(override);
        let /** @type {?} */ result = [];
        for (let /** @type {?} */ trait of origL) {
            if (trait instanceof OverrideValue) {
                trait = (/** @type {?} */ (trait)).value();
            }
            let /** @type {?} */ canAdd = true;
            let /** @type {?} */ group = this._meta.groupForTrait(trait);
            if (isPresent(group)) {
                for (let /** @type {?} */ overrideTrait of overrideL) {
                    if (overrideTrait instanceof OverrideValue) {
                        overrideTrait = (/** @type {?} */ (overrideTrait)).value();
                    }
                    if (group === this._meta.groupForTrait(overrideTrait)) {
                        canAdd = false;
                        break;
                    }
                }
            }
            if (canAdd) {
                result.push(trait);
            }
        }
        ListWrapper.addElementsIfAbsent(result, overrideL);
        return result;
    }
    /**
     * @return {?}
     */
    toString() {
        return 'PropertyMergerDeclareListForTrait';
    }
}
function PropertyMergerDeclareListForTrait_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMergerDeclareListForTrait.prototype._meta;
}
/**
 * PropertyMerger implementing AND semantics -- i.e. false trumps true.
 * (Used, for instance, for the properties 'visible' and 'editable')
 */
export class PropertyMerger_And extends PropertyMergerDynamic {
    constructor() {
        super(...arguments);
        this.isPropMergerIsChainingMark = true;
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    merge(orig, override, isDeclare) {
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
    }
    /**
     * @return {?}
     */
    toString() {
        return 'AND';
    }
}
function PropertyMerger_And_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyMerger_And.prototype.isPropMergerIsChainingMark;
}
export class PropertyMerger_Valid {
    constructor() {
        this.isPropMergerIsChainingMark = true;
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    merge(orig, override, isDeclare) {
        /**
                 *
                 *
                 return (isString(override) || ( isBoolean(override) &&
                 !(BooleanWrapper.boleanValue(override)))) ? override : orig;
                 */
        // if first is error (error message or false, it wins), otherwise second
        return (isString(override) || (isBoolean(override) && BooleanWrapper.isFalse(override)))
            ? override : orig;
    }
    /**
     * @return {?}
     */
    toString() {
        return 'VALIDATE';
    }
}
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
export class RuleSet {
    /**
     * @param {?} _meta
     */
    constructor(_meta) {
        this._meta = _meta;
        this._start = 0;
        this._end = 0;
        this._editableStart = -1;
        this._rank = 0;
    }
    /**
     * @return {?}
     */
    disableRules() {
        for (let /** @type {?} */ i = this._start; i < this._end; i++) {
            this._meta._rules[i].disable();
        }
        this._meta.clearCaches();
    }
    /**
     * @return {?}
     */
    get filePath() {
        return this._filePath;
    }
    /**
     * @param {?} editableOnly
     * @return {?}
     */
    rules(editableOnly) {
        let /** @type {?} */ result = [];
        let /** @type {?} */ i = (editableOnly) ? (this._editableStart === -1 ? this._end : this._editableStart)
            : this._start;
        for (; i < this._end; i++) {
            let /** @type {?} */ r = this._meta._rules[i];
            if (!r.disabled() && !this._meta.isTraitExportRule(r)) {
                result.push(r);
            }
        }
        return result;
    }
    /**
     * @return {?}
     */
    startRank() {
        return (this._start < this._meta._ruleCount)
            ? this._meta._rules[this._start].rank
            : this._rank - (this._end - this._start);
    }
    /**
     * @return {?}
     */
    allocateNextRuleEntry() {
        return (this._meta._ruleCount > this._end) ? this._meta._ruleCount++ : this._end++;
    }
    /**
     * @return {?}
     */
    get start() {
        return this._start;
    }
    /**
     * @return {?}
     */
    get end() {
        return this._end;
    }
    /**
     * @return {?}
     */
    get editableStart() {
        return this._editableStart;
    }
}
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
export class ValueMatches {
    /**
     * @param {?} value
     */
    constructor(value) {
        this._read = false;
        this._parentSize = 0;
        this._value = value;
    }
    /**
     * @return {?}
     */
    checkParent() {
        // todo: performance: keep a rule set version # and only do this when the rule set has
        // reloaded
        if (isPresent(this._parent)) {
            this._parent.checkParent();
            let /** @type {?} */ parentArr = this._parent._arr;
            if (isPresent(parentArr) && parentArr[0] !== this._parentSize) {
                this._arr = Match.union(this._arr, parentArr);
                this._parentSize = parentArr[0];
            }
        }
    }
    /**
     * @param {?} other
     * @return {?}
     */
    matches(other) {
        if (!(other instanceof ValueMatches)) {
            return other.matches(this);
        }
        // we recurse up parent chain to do superclass matches
        return (other === this) || (isPresent(this._parent) && this._parent.matches(other));
    }
    /**
     * @param {?} other
     * @return {?}
     */
    updateByAdding(other) {
        let /** @type {?} */ multi = new MultiMatchValue();
        multi.data.push(this);
        return multi.updateByAdding(other);
    }
}
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
export class MultiMatchValue {
    constructor() {
        this.data = [];
    }
    /**
     * @param {?} other
     * @return {?}
     */
    matches(other) {
        if (other instanceof MultiMatchValue) {
            // list / list comparison: any combo can match
            for (let /** @type {?} */ i = 0; i < this.data.length; i++) {
                if (other.matches(this.data[i])) {
                    return true;
                }
            }
        }
        else {
            // single value against array: one must match
            for (let /** @type {?} */ i = 0; i < this.data.length; i++) {
                if (this.data[i].matches(other)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * @param {?} other
     * @return {?}
     */
    updateByAdding(other) {
        if (other instanceof MultiMatchValue) {
            let /** @type {?} */ matchValue = /** @type {?} */ (other);
            ListWrapper.addAll(this.data, matchValue.data);
        }
        else {
            this.data.push(other);
        }
        return this;
    }
}
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
export class KeyValueTransformer_KeyPresent {
    /**
     * @param {?} o
     * @return {?}
     */
    tranformForMatch(o) {
        return (isPresent(o) && !(BooleanWrapper.isFalse(o))) ? true : false;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvbWV0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sS0FBSyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUNILE1BQU0sRUFDTixjQUFjLEVBRWQsTUFBTSxFQUNOLE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixXQUFXLEVBQ1gsT0FBTyxFQUNQLFdBQVcsRUFDWCxVQUFVLEVBQUUsWUFBWSxFQUN4QixLQUFLLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osYUFBYSxFQUNiLGFBQWEsRUFDaEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0QsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5RSxPQUFPLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWN0QyxNQUFNO0lBc0hGO3NCQXJGaUIsSUFBSSxLQUFLLEVBQVE7MEJBQ2IsQ0FBQzswQkFDUyxJQUFJLEdBQUcsRUFBZTswQkFHeEIsQ0FBQztrQ0FDTyxDQUFDO3dCQUVHLElBQUksR0FBRyxFQUFtQjs2QkFFaEMsSUFBSSxLQUFLLENBQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQztrQ0FFbkUsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUFzQjttQ0FFaEQsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUE0Qjs4QkFFakMsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUFZO21DQUNILElBQUksR0FBRyxF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QyxLQUFLLENBQUM7S0FDaEI7Ozs7O0lBRUQsY0FBYyxDQUFDLEtBQWlCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ25DLHFCQUFJLFVBQVUscUJBQXNDLEtBQUssQ0FBQSxDQUFDO1lBQzFELFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJELE1BQU07Ozs7O0lBR0YsZ0JBQWdCLENBQUMsQ0FBTTtRQUNuQixNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUN4RTtDQUdKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlRCxNQUFNLCtCQUErQixHQUFRO0lBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztDQUMzRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuLy8gdG9kbzogdHJ5IHRvIGdldCByaWQgb2YgdGhpcyBsaWJyYXJ5XG5pbXBvcnQgKiBhcyBDb2xsZWN0aW9ucyBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgYXNzZXJ0LFxuICAgIEJvb2xlYW5XcmFwcGVyLFxuICAgIENvbXBvc2l0ZVR5cGUsXG4gICAgZXF1YWxzLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc0Jvb2xlYW4sXG4gICAgaXNFbnRpdHksXG4gICAgaXNGdW5jdGlvbixcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgaXNTdHJpbmdNYXAsXG4gICAgaXNWYWx1ZSxcbiAgICBMaXN0V3JhcHBlcixcbiAgICBNYXBXcmFwcGVyLCBvYmplY3RUb05hbWUsXG4gICAgcHJpbnQsXG4gICAgc2hpZnRMZWZ0LFxuICAgIHNoaWZ0UmlnaHQsXG4gICAgU3RyaW5nSm9pbmVyLFxuICAgIFN0cmluZ1dyYXBwZXIsXG4gICAgdW5pbXBsZW1lbnRlZFxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TWF0Y2gsIE1hdGNoUmVzdWx0LCBVbmlvbk1hdGNoUmVzdWx0fSBmcm9tICcuL21hdGNoJztcbmltcG9ydCB7UnVsZUxvYWRlcn0gZnJvbSAnLi9ydWxlLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7Q29udGV4dH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7RGVmZXJyZWRPcGVyYXRpb25DaGFpbiwgRHluYW1pY1Byb3BlcnR5VmFsdWV9IGZyb20gJy4vcHJvcGVydHktdmFsdWUnO1xuaW1wb3J0IHtSdWxlLCBTZWxlY3Rvcn0gZnJvbSAnLi9ydWxlJztcblxuLyoqXG4gKiBNZXRhIGlzIHRoZSBjb3JlIGNsYXNzIGluIE1ldGFVSS4gIEFuIGluc3RhbmNlIG9mIG1ldGEgcmVwcmVzZW50cyBhICdSdWxlIEJhc2UnIChhIHJlcG9zaXRvcnlcbiAqIHJ1bGVzKSwgYW5kIHRoaXMgcnVsZSBiYXNlIGlzIHVzZWQgdG8gY29tcHV0ZSBwcm9wZXJ0eSBtYXBzIGJhc2VkIG9uIGEgc2VyaWVzIG9mIGtleS92YWx1ZVxuICogY29uc3RyYWludHMgKHR5cGljYWxseSBiYXNlZCBvbiB0aGUgY3VycmVudCB2YWx1ZXMgaW4gYSBDb250ZXh0IGluc3RhbmNlKS5cbiAqXG4gKiBNZXRhIHdvcmtzIGluIGNvbmNlcnQgd2l0aCBNYXRjaC5NYXRjaFJlc3VsdCB0byBjYWNoZSBwYXJ0aWFsIG1hdGNoZXMgKG1hdGNoIHRyZWVzKSB3aXRoIGNhY2hlZFxuICogY29tcHV0ZWQgcHJvcGVydHkgbWFwcy4gTWV0YSBpcyBnZW5lcmFsbHkgdXNlZCBieSB3YXkgb2YgaXRzIHN1YmNsYXNzZXMgT2JqZWN0TWV0YSBhbmQgVUlNZXRhXG4gKiAod2hpY2ggZXh0ZW5kIE1ldGEgd2l0aCBiZWhhdmlvcnMgYXJvdW5kIGF1dG8tY3JlYXRpbmcgcnVsZXMgZm9yIHJlZmVyZW5jZXMgVHlwZXNjcmlwdHMgY2xhc3Nlc1xuICogYW5kIGR5bmFtaWMgcHJvcGVydGllcyBmb3IgZmllbGQgYW5kIGxheW91dCB6b25pbmcpXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIE1ldGEge1xuICAgIHN0YXRpYyByZWFkb25seSBLZXlBbnk6IHN0cmluZyA9ICcqJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgS2V5RGVjbGFyZTogc3RyaW5nID0gJ2RlY2xhcmUnO1xuICAgIHN0YXRpYyByZWFkb25seSBLZXlUcmFpdDogc3RyaW5nID0gJ3RyYWl0JztcblxuICAgIHN0YXRpYyByZWFkb25seSBMb3dSdWxlUHJpb3JpdHk6IG51bWJlciA9IC0xMDAwMDA7XG4gICAgc3RhdGljIHJlYWRvbmx5IFN5c3RlbVJ1bGVQcmlvcml0eTogbnVtYmVyID0gLTIwMDAwMDtcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ2xhc3NSdWxlUHJpb3JpdHk6IG51bWJlciA9IC0xMDAwMDA7XG4gICAgc3RhdGljIHJlYWRvbmx5IFRlbXBsYXRlUnVsZVByaW9yaXR5OiBudW1iZXIgPSAxMDAwMDA7XG4gICAgc3RhdGljIHJlYWRvbmx5IEVkaXRvclJ1bGVQcmlvcml0eTogbnVtYmVyID0gMjAwMDAwO1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IE1heEtleURhdGFzOiBudW1iZXIgPSA2NDtcbiAgICBzdGF0aWMgcmVhZG9ubHkgTnVsbE1hcmtlcjogYW55ID0ge21hcmtlcm51bGw6IHRydWV9O1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IFNjb3BlS2V5OiBzdHJpbmcgPSAnc2NvcGVLZXknO1xuICAgIHN0YXRpYyByZWFkb25seSBEZWNsUnVsZTogc3RyaW5nID0gJ2RlY2xSdWxlJztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUGFydGlhbEluZGV4aW5nIGluZGV4ZXMgZWFjaCBydWxlIGJ5IGEgc2luZ2xlICh3ZWxsIGNob3Nlbikga2V5IGFuZCBldmFsdWF0ZXMgb3RoZXIgcGFydHMgb2ZcbiAgICAgKiB0aGUgc2VsZWN0b3Igb24gdGhlIGluZGV4LWZpbHRlcmVkIG1hdGNoZXMgKGdlbmVyYWxseSB0aGlzIGlzIGEgIHdpbiBzaW5jZSBtYXkgc2VsZWN0b3JzIGFyZVxuICAgICAqIG5vdCBzZWxlY3RpdmUsIHJlc3VsdGluZyBpbiBodWdlIHJ1bGUgdmVjdG9ycylcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyBfVXNlUGFydGlhbEluZGV4aW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICBzdGF0aWMgX0RlYnVnRG91YmxlQ2hlY2tNYXRjaGVzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBzdGF0aWMgUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3Q6IGFueSA9IG51bGw7XG4gICAgc3RhdGljIFByb3BlcnR5TWVyZ2VyX1RyYWl0czogYW55ID0gbnVsbDtcbiAgICBzdGF0aWMgUHJvcGVydHlNZXJnZXJfTGlzdDogYW55ID0gbnVsbDtcbiAgICBzdGF0aWMgVHJhbnNmb3JtZXJfS2V5UHJlc2VudDogYW55ID0gbnVsbDtcblxuXG4gICAgX3J1bGVzOiBSdWxlW10gPSBuZXcgQXJyYXk8UnVsZT4oKTtcbiAgICBfcnVsZUNvdW50OiBudW1iZXIgPSAwO1xuICAgIF90ZXN0UnVsZXM6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgcHJvdGVjdGVkIF9jdXJyZW50UnVsZVNldDogUnVsZVNldDtcbiAgICBwcml2YXRlIF9uZXh0S2V5SWQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfcnVsZVNldEdlbmVyYXRpb246IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIF9rZXlEYXRhOiBNYXA8c3RyaW5nLCBLZXlEYXRhPiA9IG5ldyBNYXA8c3RyaW5nLCBLZXlEYXRhPigpO1xuXG4gICAgcHJpdmF0ZSBfa2V5RGF0YXNCeUlkOiBLZXlEYXRhW10gPSBuZXcgQXJyYXk8S2V5RGF0YT4oTWV0YS5NYXhLZXlEYXRhcyk7XG4gICAgcHJpdmF0ZSBfTWF0Y2hUb1Byb3BzQ2FjaGU6IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8TWF0Y2gsIFByb3BlcnR5TWFwPiA9XG4gICAgICAgIG5ldyBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PE1hdGNoLCBQcm9wZXJ0eU1hcD4oKTtcbiAgICBwcml2YXRlIF9Qcm9wZXJ0eU1hcFVuaXF1ZXI6IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8UHJvcGVydHlNYXAsIFByb3BlcnR5TWFwPiA9XG4gICAgICAgIG5ldyBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PFByb3BlcnR5TWFwLCBQcm9wZXJ0eU1hcD4oKTtcblxuICAgIHByaXZhdGUgX2lkZW50aXR5Q2FjaGUgPSBuZXcgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4oKTtcbiAgICBwcml2YXRlIF9tYW5hZ2VyRm9yUHJvcGVydHk6IE1hcDxzdHJpbmcsIFByb3BlcnR5TWFuYWdlcj4gPSBuZXcgTWFwPHN0cmluZywgUHJvcGVydHlNYW5hZ2VyPigpO1xuXG5cbiAgICBwcml2YXRlIF9kZWNsYXJlS2V5TWFzazogbnVtYmVyID0gMDtcblxuICAgIHByb3RlY3RlZCBfcnVsZUxvYWRlcjogUnVsZUxvYWRlcjtcblxuXG4gICAgLypcbiAgICAgQSBmZXcgaGFuZHkgdXRpbGl0aWVzIChmb3Igd2hpY2ggd2UgcHJvYmFibHkgYWxyZWFkeSBoYXZlIHN1cGVyaW9yIHZlcnNpb25zIGVsc2V3aGVyZSlcbiAgICAgKi9cbiAgICBzdGF0aWMgYm9vbGVhblZhbHVlKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9MaXN0KHZhbHVlOiBhbnkpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIChpc0FycmF5KHZhbHVlKSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG4gICAgfVxuXG4gICAgc3RhdGljIG9iamVjdEVxdWFscyhvbmU6IGFueSwgdHdvOiBhbnkpIHtcbiAgICAgICAgaWYgKGlzQmxhbmsob25lKSAmJiBpc0JsYW5rKHR3bykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JsYW5rKG9uZSkgfHwgaXNCbGFuayh0d28pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVxdWFscyhvbmUsIHR3byk7XG4gICAgfVxuXG4gICAgc3RhdGljIG92ZXJyaWRlS2V5Rm9yS2V5KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGtleSArICdfbyc7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZFRyYWl0cyh0cmFpdHM6IHN0cmluZ1tdLCBtYXA6IE1hcDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ6IHN0cmluZ1tdID0gbWFwLmdldChNZXRhLktleVRyYWl0KTtcbiAgICAgICAgaWYgKGlzQmxhbmsoY3VycmVudCkpIHtcbiAgICAgICAgICAgIG1hcC5zZXQoTWV0YS5LZXlUcmFpdCwgdHJhaXRzKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkQWxsKGN1cnJlbnQsIHRyYWl0cyk7XG4gICAgICAgICAgICBtYXAuc2V0KE1ldGEuS2V5VHJhaXQsIGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZFRyYWl0KHRyYWl0OiBzdHJpbmcsIG1hcDogTWFwPHN0cmluZywgYW55Pik6IHZvaWQge1xuICAgICAgICBsZXQgY3VycmVudDogc3RyaW5nW10gPSBtYXAuZ2V0KE1ldGEuS2V5VHJhaXQpO1xuICAgICAgICBpZiAoaXNCbGFuayhjdXJyZW50KSkge1xuICAgICAgICAgICAgbWFwLnNldChNZXRhLktleVRyYWl0LCBNZXRhLnRvTGlzdCh0cmFpdCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudC5wdXNoKHRyYWl0KTtcbiAgICAgICAgICAgIG1hcC5zZXQoTWV0YS5LZXlUcmFpdCwgY3VycmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBjbGFzc05hbWUob2JqZWN0OiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZiAoaXNTdHJpbmdNYXAob2JqZWN0KSAmJiAoaXNFbnRpdHkob2JqZWN0KSB8fCBpc1ZhbHVlKG9iamVjdCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxDb21wb3NpdGVUeXBlPm9iamVjdCkuY2xhc3NOYW1lKCk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZ01hcChvYmplY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0VG9OYW1lKG9iamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKG9iamVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QubmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBNZXRhLlByb3BlcnR5TWVyZ2VyX0RlY2xhcmVMaXN0ID0gbmV3IFByb3BlcnR5TWVyZ2VyRGVjbGFyZUxpc3QoKTtcbiAgICAgICAgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9UcmFpdHMgPSBuZXcgUHJvcGVydHlNZXJnZXJEZWNsYXJlTGlzdEZvclRyYWl0KCk7XG4gICAgICAgIE1ldGEuUHJvcGVydHlNZXJnZXJfTGlzdCA9IG5ldyBQcm9wZXJ0eU1lcmdlcl9MaXN0KCk7XG4gICAgICAgIE1ldGEuVHJhbnNmb3JtZXJfS2V5UHJlc2VudCA9IG5ldyBLZXlWYWx1ZVRyYW5zZm9ybWVyX0tleVByZXNlbnQoKTtcblxuXG4gICAgICAgIHRoaXMuX2RlY2xhcmVLZXlNYXNrID0gdGhpcy5rZXlEYXRhKE1ldGEuS2V5RGVjbGFyZSkubWFza1ZhbHVlKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihNZXRhLktleVRyYWl0LCBNZXRhLlByb3BlcnR5TWVyZ2VyX1RyYWl0cyk7XG5cblxuICAgICAgICBsZXQgbm9vcHJ1bGU6IFJ1bGUgPSBuZXcgUnVsZShudWxsLCBudWxsLCAwLCAwKTtcbiAgICAgICAgbm9vcHJ1bGUuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLl9ydWxlc1swXSA9IG5vb3BydWxlO1xuICAgICAgICB0aGlzLl9ydWxlQ291bnQgPSAxO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyTG9hZGVyKGxvYWRlcjogUnVsZUxvYWRlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9ydWxlTG9hZGVyID0gbG9hZGVyO1xuICAgIH1cblxuICAgIGFkZFJ1bGUocnVsZTogUnVsZSk6IHZvaWQge1xuXG4gICAgICAgIGxldCBzZWxlY3RvcnM6IEFycmF5PFNlbGVjdG9yPiA9IHJ1bGUuc2VsZWN0b3JzO1xuXG4gICAgICAgIGlmIChzZWxlY3RvcnMubGVuZ3RoID4gMCAmJiBzZWxlY3RvcnNbc2VsZWN0b3JzLmxlbmd0aCAtIDFdLmlzRGVjbCkge1xuICAgICAgICAgICAgbGV0IGRlY2wgPSBydWxlLmNyZWF0ZURlY2woKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFJ1bGUoZGVjbCwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZSBhbGxvdyBudWxsIHRvIGVuYWJsZSBjcmVhdGlvbiBvZiBhIGRlY2wsIGJ1dCBvdGhlcndpc2UgdGhpcyBydWxlIGhhcyBubyBlZmZlY3RcbiAgICAgICAgaWYgKGlzUHJlc2VudChydWxlLnByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICAvLyBBZnRlciB3ZSd2ZSBjYXB0dXJlZCB0aGUgZGVjbCwgZG8gdGhlIGNvbGxhcHNlXG4gICAgICAgICAgICBydWxlLl9zZWxlY3RvcnMgPSBydWxlLmNvbnZlcnRLZXlPdmVycmlkZXMocnVsZS5fc2VsZWN0b3JzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFJ1bGUocnVsZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9hZGRUb1J1bGVzKHJ1bGU6IFJ1bGUsIHBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3J1bGVzW3Bvc10gPSBydWxlO1xuICAgIH1cblxuXG4gICAgLy8gdG9kbzogVEVTVCB1bml0IHRlc3QgdGhpc1xuICAgIF9hZGRSdWxlKHJ1bGU6IFJ1bGUsIGNoZWNrUHJvcFNjb3BlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5fY3VycmVudFJ1bGVTZXQpLCAnQXR0ZW1wdCB0byBhZGQgcnVsZSB3aXRob3V0IGN1cnJlbnQgUnVsZVNldCcpO1xuICAgICAgICBsZXQgc2VsZWN0b3JzOiBBcnJheTxTZWxlY3Rvcj4gPSBydWxlLl9zZWxlY3RvcnM7XG5cbiAgICAgICAgbGV0IGVudHJ5SWQ6IG51bWJlciA9IHRoaXMuX2N1cnJlbnRSdWxlU2V0LmFsbG9jYXRlTmV4dFJ1bGVFbnRyeSgpO1xuICAgICAgICBydWxlLmlkID0gZW50cnlJZDtcbiAgICAgICAgaWYgKHJ1bGUucmFuayA9PT0gMCkge1xuICAgICAgICAgICAgcnVsZS5yYW5rID0gdGhpcy5fY3VycmVudFJ1bGVTZXQuX3JhbmsrKztcbiAgICAgICAgfVxuICAgICAgICBydWxlLnJ1bGVTZXQgPSB0aGlzLl9jdXJyZW50UnVsZVNldDtcbiAgICAgICAgdGhpcy5fYWRkVG9SdWxlcyhydWxlLCBlbnRyeUlkKTtcblxuICAgICAgICAvLyBpbmRleCBpdFxuICAgICAgICBsZXQgbGFzdFNjb3BlS2V5RGF0YTogS2V5RGF0YTtcbiAgICAgICAgbGV0IGRlY2xLZXk6IHN0cmluZztcbiAgICAgICAgbGV0IGRlY2xNYXNrOiBudW1iZXIgPSB0aGlzLmRlY2xhcmVLZXlNYXNrO1xuICAgICAgICBsZXQgbWF0Y2hNYXNrID0gMCwgaW5kZXhlZE1hc2sgPSAwLCBhbnRpTWFzayA9IDA7XG4gICAgICAgIGxldCBjb3VudCA9IHNlbGVjdG9ycy5sZW5ndGg7XG5cbiAgICAgICAgbGV0IGluZGV4T25seVNlbGVjdG9yOiBTZWxlY3RvciA9IE1ldGEuX1VzZVBhcnRpYWxJbmRleGluZyA/IHRoaXMuYmVzdFNlbGVjdG9yVG9JbmRleChcbiAgICAgICAgICAgIHNlbGVjdG9ycykgOiBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gY291bnQgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHA6IFNlbGVjdG9yID0gc2VsZWN0b3JzW2ldO1xuXG4gICAgICAgICAgICBsZXQgc2hvdWxkSW5kZXg6IGJvb2xlYW4gPSAoaW5kZXhPbmx5U2VsZWN0b3IgPT09IG51bGwgfHwgcCA9PT0gaW5kZXhPbmx5U2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBsZXQgZGF0YTogS2V5RGF0YSA9IHRoaXMua2V5RGF0YShwLmtleSk7XG4gICAgICAgICAgICBsZXQgZGF0YU1hc2s6IG51bWJlciA9IGRhdGEubWFza1ZhbHVlKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNOdWxsTWFya2VyKHAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEluZGV4IHx8IE1ldGEuX0RlYnVnRG91YmxlQ2hlY2tNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KHAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIHAudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFkZEVudHJ5KHYsIGVudHJ5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFkZEVudHJ5KHAudmFsdWUsIGVudHJ5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhlZE1hc2sgfD0gc2hpZnRMZWZ0KDEsIGRhdGEuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc2hvdWxkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlcGFyZSBzZWxlY3RvciBmb3IgZGlyZWN0IGV2YWx1YXRpb25cbiAgICAgICAgICAgICAgICAgICAgcC5iaW5kVG9LZXlEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYXRjaE1hc2sgfD0gZGF0YU1hc2s7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pc1Byb3BlcnR5U2NvcGUgJiYgaXNCbGFuayhsYXN0U2NvcGVLZXlEYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2NvcGVLZXlEYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChkYXRhTWFzayAmIGRlY2xNYXNrKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkZWNsS2V5ID0gcC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFudGlNYXNrIHw9IGRhdGFNYXNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBpc0RlY2w6IGJvb2xlYW4gPSBpc1ByZXNlbnQoZGVjbEtleSk7XG4gICAgICAgIGxldCBub25TY29wZUtleURlY2w6IGJvb2xlYW4gPSBpc1ByZXNlbnQoZGVjbEtleSkgJiYgIXRoaXMua2V5RGF0YShkZWNsS2V5KS5pc1Byb3BlcnR5U2NvcGU7XG4gICAgICAgIGlmICghaXNEZWNsIHx8IG5vblNjb3BlS2V5RGVjbCkge1xuXG4gICAgICAgICAgICAvLyBhbGwgbm9uLWRlY2wgcnVsZXMgZG9uJ3QgYXBwbHkgb3V0c2lkZSBkZWNsIGNvbnRleHRcbiAgICAgICAgICAgIGlmICghaXNEZWNsKSB7XG4gICAgICAgICAgICAgICAgYW50aU1hc2sgfD0gZGVjbE1hc2s7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQobGFzdFNjb3BlS2V5RGF0YSkgJiYgY2hlY2tQcm9wU2NvcGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJhaXRWYWwgPSBydWxlLnByb3BlcnRpZXMuZ2V0KE1ldGEuS2V5VHJhaXQpO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRyYWl0VmFsKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHJhaXRLZXk6IHN0cmluZyA9IGxhc3RTY29wZUtleURhdGEuX2tleSArICdfdHJhaXQnO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0aWVzID0gTWFwV3JhcHBlci5jcmVhdGVFbXB0eTxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5zZXQodHJhaXRLZXksIHRyYWl0VmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdHJhaXRSdWxlOiBSdWxlID0gbmV3IFJ1bGUocnVsZS5fc2VsZWN0b3JzLCBwcm9wZXJ0aWVzLCBydWxlLnJhbmssXG4gICAgICAgICAgICAgICAgICAgICAgICBydWxlLmxpbmVOdW1iZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFJ1bGUodHJhaXRSdWxlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcnVsZS5fc2VsZWN0b3JzID0gc2VsZWN0b3JzLnNsaWNlKDApO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNjb3BlU2VsOiBTZWxlY3RvciA9IG5ldyBTZWxlY3RvcihNZXRhLlNjb3BlS2V5LCBsYXN0U2NvcGVLZXlEYXRhLmtleSk7XG4gICAgICAgICAgICAgICAgcnVsZS5zZWxlY3RvcnMucHVzaChzY29wZVNlbCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGF0YTogS2V5RGF0YSA9IHRoaXMua2V5RGF0YShNZXRhLlNjb3BlS2V5KTtcblxuICAgICAgICAgICAgICAgIGlmICghTWV0YS5fVXNlUGFydGlhbEluZGV4aW5nIHx8IE1ldGEuX0RlYnVnRG91YmxlQ2hlY2tNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWRkRW50cnkobGFzdFNjb3BlS2V5RGF0YS5fa2V5LCBlbnRyeUlkKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhlZE1hc2sgfD0gc2hpZnRMZWZ0KDEsIGRhdGEuX2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGVTZWwuYmluZFRvS2V5RGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgICBtYXRjaE1hc2sgfD0gc2hpZnRMZWZ0KDEsIGRhdGEuX2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBydWxlLmtleU1hdGNoZXNNYXNrID0gbWF0Y2hNYXNrO1xuICAgICAgICBydWxlLmtleUluZGV4ZWRNYXNrID0gaW5kZXhlZE1hc2s7XG4gICAgICAgIHJ1bGUua2V5QW50aU1hc2sgPSBhbnRpTWFzaztcbiAgICB9XG5cbiAgICBiZXN0U2VsZWN0b3JUb0luZGV4KHNlbGVjdG9yczogQXJyYXk8U2VsZWN0b3I+KTogU2VsZWN0b3Ige1xuICAgICAgICBsZXQgYmVzdDogU2VsZWN0b3I7XG4gICAgICAgIGxldCBiZXN0UmFuayA9IE51bWJlci5NSU5fVkFMVUU7XG4gICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICBmb3IgKGxldCBzZWwgb2YgIHNlbGVjdG9ycykge1xuICAgICAgICAgICAgbGV0IHJhbmsgPSB0aGlzLnNlbGVjdGl2aXR5UmFuayhzZWwpICsgcG9zKys7XG4gICAgICAgICAgICBpZiAocmFuayA+IGJlc3RSYW5rKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IHNlbDtcbiAgICAgICAgICAgICAgICBiZXN0UmFuayA9IHJhbms7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJlc3Q7XG4gICAgfVxuXG4gICAgc2VsZWN0aXZpdHlSYW5rKHNlbGVjdG9yOiBTZWxlY3Rvcik6IG51bWJlciB7XG4gICAgICAgIC8vIFNjb3JlIHNlbGVjdG9yczogZ29vZCBpZiBwcm9wZXJ0eSBzY29wZSwga2V5ICE9PSAnKicgb3IgYm9vbFxuICAgICAgICAvLyAnKicgaXMgcGFydGljdWxhcmx5IGJhZCwgc2luY2UgdGhlc2UgYXJlIGluaGVyaXRlZCBieSBhbGwgb3RoZXJzXG4gICAgICAgIGxldCBzY29yZSA9IDE7XG4gICAgICAgIGxldCB2YWx1ZSA9IHNlbGVjdG9yLnZhbHVlO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodmFsdWUpICYmICEoTWV0YS5LZXlBbnkgPT09IHZhbHVlKSkge1xuICAgICAgICAgICAgc2NvcmUgKz0gKGlzQm9vbGVhbih2YWx1ZSkgPyAxIDogOSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQga2V5RGF0YTogS2V5RGF0YSA9IHRoaXMua2V5RGF0YShzZWxlY3Rvci5rZXkpO1xuICAgICAgICBpZiAoa2V5RGF0YS5pc1Byb3BlcnR5U2NvcGUpIHtcbiAgICAgICAgICAgIHNjb3JlICo9IDU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVG9kbzogd2UgY291bGQgc2NvcmUgYmFzZWQgb24gIyBvZiBlbnRyaWVzIGluIEtleURhdGFcbiAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogaWYgYWRkaXRpb24gb2YgdGhpcyBydWxlIHJlc3VsdHMgaW4gYWRkaXRpb24gb2YgZXh0cmEgcnVsZXMsIHRob3NlIGFyZSByZXR1cm5lZFxuICAgICAqIChudWxsIG90aGVyd2lzZSlcbiAgICAgKi9cbiAgICBfZWRpdGluZ1J1bGVFbmQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KHRoaXMuX2N1cnJlbnRSdWxlU2V0LmVuZCwgdGhpcy5fcnVsZUNvdW50KTtcbiAgICB9XG5cblxuICAgIF9hZGRSdWxlQW5kUmV0dXJuRXh0cmFzKHJ1bGU6IFJ1bGUpOiBBcnJheTxSdWxlPiB7XG4gICAgICAgIGxldCBzdGFydCA9IHRoaXMuX2VkaXRpbmdSdWxlRW5kKCk7XG4gICAgICAgIGxldCBleHRyYXM6IEFycmF5PFJ1bGU+O1xuXG4gICAgICAgIHRoaXMuYWRkUnVsZShydWxlKTtcblxuICAgICAgICAvLyBSZXR1cm4gYW55IGV4dHJhIHJ1bGVzIGNyZWF0ZWQgYnkgYWRkaXRpb24gb2YgdGhpcyBvbmVcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0LCBjID0gdGhpcy5fZWRpdGluZ1J1bGVFbmQoKTsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgbGV0IHIgPSB0aGlzLl9ydWxlc1tpXTtcbiAgICAgICAgICAgIGlmIChyICE9PSBydWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoZXh0cmFzKSkge1xuICAgICAgICAgICAgICAgICAgICBleHRyYXMgPSBuZXcgQXJyYXk8UnVsZT4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXh0cmFzLnB1c2gocik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dHJhcztcbiAgICB9XG5cbiAgICAvLyBJY2t5IG1ldGhvZCB0byByZXBsYWNlIGFuIGV4aXRlZCBydWxlIGluIHBsYWNlXG4gICAgX3VwZGF0ZUVkaXRlZFJ1bGUocnVsZTogUnVsZSwgZXh0cmFzOiBBcnJheTxSdWxlPik6IEFycmF5PFJ1bGU+IHtcbiAgICAgICAgLy8gaW4gcGxhY2UgcmVwbGFjZSBleGlzdGluZyBydWxlIHdpdGggTm9PcFxuICAgICAgICBsZXQgbm9vcHJ1bGU6IFJ1bGUgPSBuZXcgUnVsZShudWxsLCBudWxsLCAwLCAwKTtcbiAgICAgICAgbm9vcHJ1bGUuZGlzYWJsZSgpO1xuXG4gICAgICAgIHRoaXMuX3J1bGVzW3J1bGUuaWRdID0gbm9vcHJ1bGU7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChleHRyYXMpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByIG9mIGV4dHJhcykge1xuICAgICAgICAgICAgICAgIHIuZGlzYWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2luY2UgdGhpcyBydWxlIGhhcyBhbHJlYWR5IGJlZW4gbXV0YXRlZCAodGhlIGZpcnN0IHRpbWUgaXQgd2FzIGFkZGVkKSB3ZSBuZWVkIHRvXG4gICAgICAgIC8vIHJldmVyc2UgdGhlIGFkZGl0aW9uIG9mIHRoZSBzY29wZUtleVxuICAgICAgICBsZXQgcHJlZHMgPSBydWxlLnNlbGVjdG9ycztcblxuICAgICAgICBpZiAoKGlzUHJlc2VudChwcmVkcykgJiYgcHJlZHMubGVuZ3RoID4gMCkgJiYgTGlzdFdyYXBwZXIubGFzdDxTZWxlY3Rvcj4oXG4gICAgICAgICAgICAgICAgcHJlZHMpLmtleSA9PT0gTWV0YS5TY29wZUtleSkge1xuICAgICAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlQXQ8U2VsZWN0b3I+KHByZWRzLCBwcmVkcy5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IChyZSktYWRkIGl0IGFuZCBpbnZhbGlkYXRlXG4gICAgICAgIGV4dHJhcyA9IHRoaXMuX2FkZFJ1bGVBbmRSZXR1cm5FeHRyYXMocnVsZSk7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0ZVJ1bGVzKCk7XG4gICAgICAgIHJldHVybiBleHRyYXM7XG4gICAgfVxuXG5cbiAgICBzY29wZUtleUZvclNlbGVjdG9yKHByZWRzOiBBcnJheTxTZWxlY3Rvcj4pOiBzdHJpbmcge1xuICAgICAgICBmb3IgKGxldCBpID0gcHJlZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBwcmVkID0gcHJlZHNbaV07XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMua2V5RGF0YShwcmVkLmtleSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5pc1Byb3BlcnR5U2NvcGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJlZC5rZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICBhZGRSdWxlRnJvbVNlbGVjdG9yTWFwKHNlbGVjdG9yTWFwOiBNYXA8c3RyaW5nLCBhbnk+LCBwcm9wZXJ0eU1hcDogTWFwPHN0cmluZywgYW55Pik6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZFJ1bGVGcm9tU2VsZWN0b3JNYXBXaXRoUmFuayhzZWxlY3Rvck1hcCwgcHJvcGVydHlNYXAsIDApO1xuICAgIH1cblxuICAgIGFkZFJ1bGVGcm9tU2VsZWN0b3JNYXBXaXRoUmFuayhzZWxlY3Rvck1hcDogTWFwPHN0cmluZywgYW55PiwgcHJvcGVydHlNYXA6IE1hcDxzdHJpbmcsIGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbms6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgcnVsZSA9IG5ldyBSdWxlKFNlbGVjdG9yLmZyb21NYXAoc2VsZWN0b3JNYXApLCBwcm9wZXJ0eU1hcCwgMCwgLTEpO1xuICAgICAgICBpZiAocmFuayAhPT0gMCkge1xuICAgICAgICAgICAgcnVsZS5yYW5rID0gcmFuaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFJ1bGUocnVsZSk7XG4gICAgfVxuXG5cbiAgICBhZGRSdWxlcyhydWxlU2V0OiBNYXA8c3RyaW5nLCBhbnk+LCBzZWxlY3RvcnM6IEFycmF5PFNlbGVjdG9yPikge1xuICAgICAgICAvLyBTcGVjaWFsIGtleXM6ICAncHJvcHMsICdydWxlcycuICBFdmVydGhpbmcgZWxzZSBpcyBhIHNlbGVjdG9yXG4gICAgICAgIGxldCBwcm9wczogTWFwPHN0cmluZywgYW55PjtcbiAgICAgICAgbGV0IHJ1bGVzOiBBcnJheTxNYXA8c3RyaW5nLCBhbnk+PjtcblxuICAgICAgICBNYXBXcmFwcGVyLml0ZXJhYmxlKHJ1bGVTZXQpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdwcm9wcycpIHtcbiAgICAgICAgICAgICAgICBwcm9wcyA9IHZhbHVlO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3J1bGVzJykge1xuICAgICAgICAgICAgICAgIHJ1bGVzID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9ycy5wdXNoKG5ldyBTZWxlY3RvcihrZXksIHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQocHJvcHMpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFJ1bGUobmV3IFJ1bGUoc2VsZWN0b3JzLCBwcm9wcywgMCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQocnVsZXMpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSdWxlcyhyLCBzZWxlY3RvcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGhpcyBvbmUgZXhwZWN0IHRoYXQgd2UgYWxyZWFkeSBvcGVuZWQgdGhlIHJ1bGVzZXRcbiAgICBfbG9hZFJ1bGVzKHJ1bGVUZXh0PzogYW55LCBtb2R1bGU6IHN0cmluZyA9ICdzeXN0ZW0nLFxuICAgICAgICAgICAgICAgZWRpdGFibGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcnVsZUxvYWRlcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ydWxlTG9hZGVyLmxvYWRSdWxlcyh0aGlzLCBydWxlVGV4dCwgbW9kdWxlLCAocnVsZSkgPT4gdGhpcy5hZGRSdWxlKHJ1bGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCkuZGlzYWJsZVJ1bGVzKCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgcnVsZTogJyArIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBsb2FkUnVsZXMocnVsZVRleHQ/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbG9hZFJ1bGVzV2l0aFJ1bGVTZXQoJ1N0cmluZ0xpdGVyYWwnLCBydWxlVGV4dCwgMCk7XG4gICAgICAgIHRoaXMuZW5kUnVsZVNldCgpO1xuICAgIH1cblxuXG4gICAgX2xvYWRSdWxlc1dpdGhSdWxlU2V0KGZpbGVuYW1lOiBzdHJpbmcsIHJ1bGVUZXh0OiBhbnksIHJhbms6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmJlZ2luUnVsZVNldFdpdGhSYW5rKHJhbmssIGZpbGVuYW1lKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRSdWxlcyhydWxlVGV4dCk7XG5cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCkuZGlzYWJsZVJ1bGVzKCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgcnVsZTogJyArIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBsb2FkVXNlclJ1bGUoc291cmNlOiBhbnksIHVzZXJDbGFzczogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxuXG4gICAgcGFyc2VQcm9wZXJ0eUFzc2lnbm1lbnQocHJvcFN0cmluZzogc3RyaW5nLCBwcm9wZXJ0eU1hcDogTWFwPHN0cmluZywgYW55Pik6IHN0cmluZyB7XG4gICAgICAgIC8vIHRvZG86IGltcGxlbWVudCB0aGlzXG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxuXG5cbiAgICBjbGVhckNhY2hlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fTWF0Y2hUb1Byb3BzQ2FjaGUgPSBuZXcgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxNYXRjaCwgUHJvcGVydHlNYXA+KCk7XG4gICAgICAgIHRoaXMuX1Byb3BlcnR5TWFwVW5pcXVlciA9IG5ldyBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PFByb3BlcnR5TWFwLCBQcm9wZXJ0eU1hcD4oKTtcbiAgICAgICAgdGhpcy5faWRlbnRpdHlDYWNoZSA9IG5ldyBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55PigpO1xuICAgIH1cblxuXG4gICAgaXNUcmFpdEV4cG9ydFJ1bGUocnVsZTogUnVsZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaXNCbGFuayhydWxlLnByb3BlcnRpZXMpIHx8IHJ1bGUgfHwgcnVsZS5wcm9wZXJ0aWVzLnNpemUgPT09IDEpIHtcblxuICAgICAgICAgICAgbGV0IGtleTogc3RyaW5nID0gQXJyYXkuZnJvbShydWxlLnByb3BlcnRpZXMua2V5cygpKVswXTtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLmVuZHNXaWR0aChrZXksICdfdHJhaXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYmVnaW5SdWxlU2V0KGlkZW50aWZpY2F0b3I6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmJlZ2luUnVsZVNldFdpdGhSYW5rKHRoaXMuX3J1bGVDb3VudCwgaWRlbnRpZmljYXRvcik7XG4gICAgfVxuXG5cbiAgICBiZWdpblJ1bGVTZXRXaXRoUmFuayhyYW5rOiBudW1iZXIsIGZpbGVQYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGFzc2VydChpc0JsYW5rKHRoaXMuX2N1cnJlbnRSdWxlU2V0KSxcbiAgICAgICAgICAgICAgICAnQ2FuIHQgc3RhcnQgbmV3IHJ1bGUgc2V0IHdoaWxlIG9uZSBpbiBwcm9ncmVzcycpO1xuXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UnVsZVNldCA9IG5ldyBSdWxlU2V0KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFJ1bGVTZXQuX3N0YXJ0ID0gdGhpcy5fcnVsZUNvdW50O1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFJ1bGVTZXQuX2VuZCA9IHRoaXMuX3J1bGVDb3VudDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRSdWxlU2V0Ll9yYW5rID0gcmFuaztcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRSdWxlU2V0Ll9maWxlUGF0aCA9IGZpbGVQYXRoO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiZWdpblJlcGxhY2VtZW50UnVsZVNldChvcmlnOiBSdWxlU2V0KTogdm9pZCB7XG4gICAgICAgIGxldCBvcmlnUmFuayA9IG9yaWcuc3RhcnRSYW5rKCk7XG4gICAgICAgIHRoaXMuYmVnaW5SdWxlU2V0V2l0aFJhbmsodGhpcy5fcnVsZUNvdW50LCBvcmlnLl9maWxlUGF0aCk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRSdWxlU2V0Ll9yYW5rID0gb3JpZ1Jhbms7XG4gICAgfVxuXG5cbiAgICBlbmRSdWxlU2V0KCk6IFJ1bGVTZXQge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuX2N1cnJlbnRSdWxlU2V0KSwgJ05vIHJ1bGUgc2V0IHByb2dyZXNzJyk7XG4gICAgICAgIGxldCByZXN1bHQ6IFJ1bGVTZXQgPSB0aGlzLl9jdXJyZW50UnVsZVNldDtcbiAgICAgICAgaWYgKHRoaXMuX3J1bGVDb3VudCA8IHJlc3VsdC5fZW5kKSB7XG4gICAgICAgICAgICB0aGlzLl9ydWxlQ291bnQgPSByZXN1bHQuX2VuZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50UnVsZVNldCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3J1bGVTZXRHZW5lcmF0aW9uKys7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIGdldCBydWxlU2V0R2VuZXJhdGlvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcnVsZVNldEdlbmVyYXRpb247XG4gICAgfVxuXG4gICAgaW52YWxpZGF0ZVJ1bGVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ydWxlU2V0R2VuZXJhdGlvbisrO1xuICAgICAgICB0aGlzLmNsZWFyQ2FjaGVzKCk7XG4gICAgfVxuXG5cbiAgICBuZXdDb250ZXh0KCk6IENvbnRleHQge1xuICAgICAgICByZXR1cm4gbmV3IENvbnRleHQodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IGRlY2xhcmVLZXlNYXNrKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWNsYXJlS2V5TWFzaztcbiAgICB9XG5cblxuICAgIC8vIFRvdWNoIGEga2V5L3ZhbHVlIHRvIGZvcmNlIHByZS1sb2FkaW5nL3JlZ2lzdHJhdGlvbiBvZiBhc3NvY2lhdGVkIHJ1bGUgZmlsZXNcbiAgICB0b3VjaChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubmV3Q29udGV4dCgpO1xuICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgY29udGV4dC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIGNvbnRleHQuYWxsUHJvcGVydGllcygpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgIH1cblxuXG4gICAgdHJhbnNmb3JtVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICBsZXQga2V5RGF0YSA9IHRoaXMuX2tleURhdGEuZ2V0KGtleSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoa2V5RGF0YSkgJiYgaXNQcmVzZW50KGtleURhdGEuX3RyYW5zZm9ybWVyKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBrZXlEYXRhLl90cmFuc2Zvcm1lci50cmFuZm9ybUZvck1hdGNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgbWF0Y2goa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGludGVybWVkaWF0ZVJlc3VsdDogTWF0Y2hSZXN1bHQpOiBNYXRjaFJlc3VsdCB7XG4gICAgICAgIGxldCBrZXlEYXRhID0gdGhpcy5fa2V5RGF0YS5nZXQoa2V5KTtcbiAgICAgICAgaWYgKGlzQmxhbmsoa2V5RGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm1lZGlhdGVSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGtleU1hc2s6IG51bWJlciA9IHNoaWZ0TGVmdCgxLCBrZXlEYXRhLl9pZCk7XG5cbiAgICAgICAgLy8gRG9lcyBvdXIgcmVzdWx0IGFscmVhZHkgaW5jbHVkZSB0aGlzIGtleT8gIFRoZW4gbm8gbmVlZCB0byBqb2luIGFnYWluXG4gICAgICAgIC8vIGlmIChpbnRlcm1lZGlhdGVSZXN1bHQgIT09IG51bGwgJiYgKGludGVybWVkaWF0ZVJlc3VsdC5fa2V5c01hdGNoZWRNYXNrICYga2V5TWFzaykgIT09XG4gICAgICAgIC8vIDApIHJldHVybiBpbnRlcm1lZGlhdGVSZXN1bHQ7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNYXRjaFJlc3VsdCh0aGlzLCBrZXlEYXRhLCB2YWx1ZSwgaW50ZXJtZWRpYXRlUmVzdWx0KTtcbiAgICB9XG5cblxuICAgIHVuaW9uT3ZlcnJpZGVNYXRjaChrZXk6IHN0cmluZywgdmFsdWU6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlUmVzdWx0OiBVbmlvbk1hdGNoUmVzdWx0KTogVW5pb25NYXRjaFJlc3VsdCB7XG4gICAgICAgIGxldCBrZXlEYXRhOiBLZXlEYXRhID0gdGhpcy5fa2V5RGF0YS5nZXQoTWV0YS5vdmVycmlkZUtleUZvcktleShrZXkpKTtcbiAgICAgICAgaWYgKGlzQmxhbmsoa2V5RGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm1lZGlhdGVSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBVbmlvbk1hdGNoUmVzdWx0KHRoaXMsIGtleURhdGEsIHZhbHVlLCBpbnRlcm1lZGlhdGVSZXN1bHQpO1xuICAgIH1cblxuICAgIG5ld1Byb3BlcnRpZXNNYXAoKTogUHJvcGVydHlNYXAge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5TWFwKCk7XG4gICAgfVxuXG4gICAgcHJvcGVydGllc0Zvck1hdGNoKG1hdGNoUmVzdWx0OiBNYXRjaFJlc3VsdCk6IFByb3BlcnR5TWFwIHtcbiAgICAgICAgbGV0IHByb3BlcnRpZXM6IFByb3BlcnR5TWFwID0gdGhpcy5fTWF0Y2hUb1Byb3BzQ2FjaGUuZ2V0VmFsdWUobWF0Y2hSZXN1bHQpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3BlcnRpZXMgPSB0aGlzLm5ld1Byb3BlcnRpZXNNYXAoKTtcblxuICAgICAgICBsZXQgYXJyOiBudW1iZXJbXSA9IG1hdGNoUmVzdWx0LmZpbHRlcmVkTWF0Y2hlcygpO1xuICAgICAgICBpZiAoaXNCbGFuayhhcnIpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpcnN0IGVudHJ5IGlzIGNvdW50XG4gICAgICAgIGxldCBjb3VudDogbnVtYmVyID0gYXJyWzBdO1xuICAgICAgICBsZXQgcnVsZXM6IEFycmF5PFJ1bGU+ID0gbmV3IEFycmF5PFJ1bGU+KGNvdW50KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHJ1bGVzW2ldID0gdGhpcy5fcnVsZXNbYXJyW2kgKyAxXV07XG4gICAgICAgIH1cblxuICAgICAgICBMaXN0V3JhcHBlci5zb3J0PFJ1bGU+KHJ1bGVzLCAobzEsIG8yKSA9PiBvMS5yYW5rIC0gbzIucmFuayk7XG5cbiAgICAgICAgbGV0IG1vZGlmaWVkTWFzayA9IDA7XG4gICAgICAgIGxldCBkZWNsYXJlS2V5OiBzdHJpbmcgPSAoKHRoaXMuX2RlY2xhcmVLZXlNYXNrICYgbWF0Y2hSZXN1bHQua2V5c01hdGNoZWRNYXNrKSAhPT0gMClcbiAgICAgICAgICAgID8gbWF0Y2hSZXN1bHQudmFsdWVGb3JLZXkoTWV0YS5LZXlEZWNsYXJlKSA6IG51bGw7XG5cblxuICAgICAgICBmb3IgKGxldCByIGluIHJ1bGVzKSB7XG4gICAgICAgICAgICBtb2RpZmllZE1hc2sgfD0gcnVsZXNbcl0uYXBwbHkodGhpcywgcHJvcGVydGllcywgZGVjbGFyZUtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wZXJ0aWVzLmF3YWtlUHJvcGVydGllcygpO1xuICAgICAgICB0aGlzLl9NYXRjaFRvUHJvcHNDYWNoZS5zZXRWYWx1ZShtYXRjaFJlc3VsdC5pbW11dGFibGVDb3B5KCksIHByb3BlcnRpZXMpO1xuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICB9XG5cblxuICAgIGtleURhdGEoa2V5OiBzdHJpbmcpOiBLZXlEYXRhIHtcbiAgICAgICAgbGV0IGRhdGE6IEtleURhdGEgPSB0aGlzLl9rZXlEYXRhLmdldChrZXkpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKGRhdGEpKSB7XG4gICAgICAgICAgICBsZXQgaWQ6IG51bWJlciA9IHRoaXMuX25leHRLZXlJZDtcblxuICAgICAgICAgICAgaWYgKGlkID49IE1ldGEuTWF4S2V5RGF0YXMgLSAxKSB7XG4gICAgICAgICAgICAgICAgcHJpbnQoJ0V4Y2VlZGVkIG1heGltdW0gbnVtYmVyIG9mIGNvbnRleHQga2V5cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbmV4dEtleUlkKys7XG4gICAgICAgICAgICBkYXRhID0gbmV3IEtleURhdGEoa2V5LCBpZCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2tleURhdGFzQnlJZFtpZF0gPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5fa2V5RGF0YS5zZXQoa2V5LCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cblxuICAgIF9rZXlzSW5NYXNrKG1hc2s6IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICAgICAgbGV0IG1hdGNoZXM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICB3aGlsZSAobWFzayAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKChtYXNrICYgMSkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2godGhpcy5fa2V5RGF0YXNCeUlkW3Bvc10uX2tleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIG1hc2sgPSBzaGlmdFJpZ2h0KG1hc2ssIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyS2V5SW5pdE9ic2VydmVyKGtleTogc3RyaW5nLCBvOiBWYWx1ZVF1ZXJpZWRPYnNlcnZlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmtleURhdGEoa2V5KS5hZGRPYnNlcnZlcihvKTtcbiAgICB9XG5cbiAgICByZWdpc3RlclZhbHVlVHJhbnNmb3JtZXJGb3JLZXkoa2V5OiBzdHJpbmcsIHRyYW5zZm9ybWVyOiBLZXlWYWx1ZVRyYW5zZm9ybWVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMua2V5RGF0YShrZXkpLl90cmFuc2Zvcm1lciA9IHRyYW5zZm9ybWVyO1xuICAgIH1cblxuXG4gICAgZ2V0IGlkZW50aXR5Q2FjaGUoKTogQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faWRlbnRpdHlDYWNoZTtcbiAgICB9XG5cblxuICAgIG5ld01hdGNoQXJyYXkoKTogTWF0Y2hWYWx1ZVtdIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIG1hdGNoQXJyYXlBc3NpZ24oYXJyYXk6IE1hdGNoVmFsdWVbXSwga2V5RGF0YTogS2V5RGF0YSwgbWF0Y2hWYWx1ZTogTWF0Y2hWYWx1ZSk6IHZvaWQge1xuICAgICAgICBsZXQgaWR4ID0ga2V5RGF0YS5faWQ7XG4gICAgICAgIGxldCBjdXJyID0gYXJyYXlbaWR4XTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChjdXJyKSkge1xuICAgICAgICAgICAgbWF0Y2hWYWx1ZSA9IGN1cnIudXBkYXRlQnlBZGRpbmcobWF0Y2hWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlbaWR4XSA9IG1hdGNoVmFsdWU7XG4gICAgfVxuXG5cbiAgICBwcm9wZXJ0eVdpbGxEb01lcmdlKHByb3BlcnR5TmFtZTogc3RyaW5nLCBvcmlnVmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbWVyZ2VyOiBQcm9wZXJ0eU1lcmdlciA9IHRoaXMubWVyZ2VyRm9yUHJvcGVydHkocHJvcGVydHlOYW1lKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5pc1Byb3BlcnR5TWVyZ2VySXNDaGFpbmluZyhtZXJnZXIpIHx8IChpc1ByZXNlbnQoXG4gICAgICAgICAgICBvcmlnVmFsdWUpICYmIChvcmlnVmFsdWUgaW5zdGFuY2VvZiBNYXApKTtcbiAgICB9XG5cblxuICAgIG1hbmFnZXJGb3JQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eU1hbmFnZXIge1xuICAgICAgICBsZXQgbWFuYWdlcjogUHJvcGVydHlNYW5hZ2VyID0gdGhpcy5fbWFuYWdlckZvclByb3BlcnR5LmdldChuYW1lKTtcbiAgICAgICAgaWYgKGlzQmxhbmsobWFuYWdlcikpIHtcbiAgICAgICAgICAgIG1hbmFnZXIgPSBuZXcgUHJvcGVydHlNYW5hZ2VyKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlckZvclByb3BlcnR5LnNldChuYW1lLCBtYW5hZ2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFuYWdlcjtcbiAgICB9XG5cblxuICAgIG1pcnJvclByb3BlcnR5VG9Db250ZXh0KHByb3BlcnR5TmFtZTogc3RyaW5nLCBjb250ZXh0S2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGtleURhdGEgPSB0aGlzLmtleURhdGEoY29udGV4dEtleSk7XG4gICAgICAgIGxldCBtYW5hZ2VyID0gdGhpcy5tYW5hZ2VyRm9yUHJvcGVydHkocHJvcGVydHlOYW1lKTtcbiAgICAgICAgbWFuYWdlci5fa2V5RGF0YVRvU2V0ID0ga2V5RGF0YTtcbiAgICB9XG5cblxuICAgIGRlZmluZUtleUFzUHJvcGVydHlTY29wZShjb250ZXh0S2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGtleURhdGE6IEtleURhdGEgPSB0aGlzLmtleURhdGEoY29udGV4dEtleSk7XG4gICAgICAgIGtleURhdGEuaXNQcm9wZXJ0eVNjb3BlID0gdHJ1ZTtcblxuICAgICAgICBsZXQgdHJhaXRLZXk6IHN0cmluZyA9IGNvbnRleHRLZXkgKyAnX3RyYWl0JztcbiAgICAgICAgdGhpcy5taXJyb3JQcm9wZXJ0eVRvQ29udGV4dCh0cmFpdEtleSwgdHJhaXRLZXkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIodHJhaXRLZXksIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgIH1cblxuICAgIGlzUHJvcGVydHlTY29wZUtleShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gTWV0YS5TY29wZUtleSA9PT0ga2V5O1xuICAgIH1cblxuICAgIHJlZ2lzdGVyUHJvcGVydHlNZXJnZXIocHJvcGVydHlOYW1lOiBzdHJpbmcsIG1lcmdlcjogUHJvcGVydHlNZXJnZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQmxhbmsobWVyZ2VyLl9tZXRhKSkge1xuICAgICAgICAgICAgbWVyZ2VyLl9tZXRhID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWFuYWdlcjogUHJvcGVydHlNYW5hZ2VyID0gdGhpcy5tYW5hZ2VyRm9yUHJvcGVydHkocHJvcGVydHlOYW1lKTtcbiAgICAgICAgbWFuYWdlci5fbWVyZ2VyID0gbWVyZ2VyO1xuICAgIH1cblxuICAgIG1lcmdlckZvclByb3BlcnR5KHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvcGVydHlNZXJnZXIge1xuICAgICAgICBsZXQgbWFuYWdlcjogUHJvcGVydHlNYW5hZ2VyID0gdGhpcy5tYW5hZ2VyRm9yUHJvcGVydHkocHJvcGVydHlOYW1lKTtcbiAgICAgICAgcmV0dXJuIG1hbmFnZXIuX21lcmdlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzUHJvcGVydHlNZXJnZXJJc0NoYWluaW5nKHZhbDogYW55KTogdmFsIGlzIFByb3BlcnR5TWVyZ2VySXNDaGFpbmluZyB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodmFsLmlzUHJvcE1lcmdlcklzQ2hhaW5pbmdNYXJrKSAmJiB2YWwuaXNQcm9wTWVyZ2VySXNDaGFpbmluZ01hcms7XG4gICAgfVxuXG5cbiAgICBncm91cEZvclRyYWl0KHRyYWl0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2RlZmF1bHQnO1xuICAgIH1cblxuICAgIF9sb2dSdWxlU3RhdHMoKTogdm9pZCB7XG4gICAgICAgIGxldCB0b3RhbCA9IDA7XG5cbiAgICAgICAgbGV0IHZhbHVlcyA9IHRoaXMuX2tleURhdGEua2V5cygpO1xuXG4gICAgICAgIGxldCBjb3VudHM6IGFueVtdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBpZCBvZiBBcnJheS5mcm9tKHZhbHVlcykpIHtcbiAgICAgICAgICAgIGxldCBrZXlEYXRhID0gdGhpcy5fa2V5RGF0YS5nZXQoaWQpO1xuICAgICAgICAgICAgbGV0IHZhbHVlc3MgPSBrZXlEYXRhLnJ1bGVWZWNzLnZhbHVlcygpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB2bSAgb2YgdmFsdWVzcykge1xuICAgICAgICAgICAgICAgIGxldCBrdmMgPSBuZXcgS2V5VmFsdWVDb3VudChrZXlEYXRhLl9rZXksICg8YW55PnZtKVsnX3ZhbHVlJ10sIGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICAgICAgdm0uX2FycikgPyB2bS5fYXJyWzBdIDogMCk7XG5cbiAgICAgICAgICAgICAgICB0b3RhbCArPSBrdmMuY291bnQ7XG4gICAgICAgICAgICAgICAgY291bnRzLnB1c2goa3ZjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBMaXN0V3JhcHBlci5zb3J0PEtleVZhbHVlQ291bnQ+KGNvdW50cywgKG8xLCBvMikgPT4gbzIuY291bnQgLSBvMS5jb3VudCk7XG5cbiAgICAgICAgbGV0IGJ1ZiA9IG5ldyBTdHJpbmdKb2luZXIoW10pO1xuICAgICAgICBsZXQgYyA9IE1hdGgubWluKDEwLCBjb3VudHMubGVuZ3RoKTtcblxuICAgICAgICBidWYuYWRkKCdUb3RhbCBpbmRleCBlbnRyaWVzIGNvbXBhcmlzb25zIHBlcmZvcm1lZDogJyArIE1hdGNoLl9EZWJ1Z19FbGVtZW50UHJvY2Vzc0NvdW50KTtcbiAgICAgICAgYnVmLmFkZCgnXFxuVG90YWwgaW5kZXggZW50cmllczogJyArIHRvdGFsKTtcbiAgICAgICAgYnVmLmFkZCgnXFxuVG9wICBrZXlzL3ZhbHVlczogJyArIGMpO1xuXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBrdmMgPSBjb3VudHNbaV07XG5cbiAgICAgICAgICAgIGJ1Zi5hZGQoJyAgICAgJyArIGt2Yy5rZXkgKyAnICA9ICcgKyBrdmMudmFsdWUgKyAnIDogJyArIGt2Yy5jb3VudCArICcgZW50cmllcycpO1xuICAgICAgICAgICAgYnVmLmFkZCgnXFxuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJpbnQoYnVmLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnTWV0YSc7XG4gICAgfVxuXG5cbiAgICBpc051bGxNYXJrZXIodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHZhbHVlKSAmJiB2YWx1ZVsnbWFya2VybnVsbCddO1xuICAgIH1cblxuXG4gICAgYWRkVGVzdFVzZXJSdWxlKHRlc3RSdWxlTmFtZTogc3RyaW5nLCBzb3VyY2U6IGFueSkge1xuICAgICAgICB0aGlzLl90ZXN0UnVsZXMuc2V0KHRlc3RSdWxlTmFtZSwgc291cmNlKTtcbiAgICB9XG5cblxufVxuXG5cbmV4cG9ydCBjbGFzcyBLZXlWYWx1ZUNvdW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXk6IHN0cmluZywgcHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyBjb3VudDogbnVtYmVyKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFN0b3JlIG9mIHBvbGljeSBpbmZvcm1hdGlvbiBmb3IgcGFydGljdWxhciBwcm9wZXJ0aWVzIC0tIG1vc3Qgc2lnbmlmaWNhbnRseSwgaG93XG4gKiBzdWNjZXNzaXZlIHZhbHVlcyBvZiB0aGlzIHByb3BlcnR5IGFyZSB0byBiZSAqbWVyZ2VkKiBkdXJpbmcgcnVsZSBhcHBsaWNhdGlvbi5cbiAqIChTZWUgTWV0YS5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKS4gIEUuZy4gJ3Zpc2libGUnLCAndHJhaXQnLCBhbmQgJ3ZhbGlkJyBhbGwgaGF2ZSB1bmlxdWVcbiAqIG1lcmdlIHBvbGljaWVzLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlNYW5hZ2VyIHtcbiAgICBfbWVyZ2VyOiBQcm9wZXJ0eU1lcmdlcjtcbiAgICBfa2V5RGF0YVRvU2V0OiBLZXlEYXRhO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX25hbWU6IHN0cmluZykge1xuICAgIH1cblxuXG4gICAgbWVyZ2VQcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZywgb3JpZzogYW55LCBuZXdWYWx1ZTogYW55LCBpc0RlY2xhcmU6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICBpZiAoaXNCbGFuayhvcmlnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgT3ZlcnJpZGVWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICg8T3ZlcnJpZGVWYWx1ZT4gbmV3VmFsdWUpLnZhbHVlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9tZXJnZXIpKSB7XG4gICAgICAgICAgICAvLyBQZXJoYXBzIHNob3VsZCBoYXZlIGEgZGF0YS10eXBlLWJhc2VkIG1lcmdlciByZWdpc3RyeT9cbiAgICAgICAgICAgIGlmIChvcmlnIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChuZXdWYWx1ZSkgJiYgbmV3VmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWVyZ2UgbWFwc1xuICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiBURVNUIGNoZWNrIG91dGNvbWUgb2YgdGhlIG1lcmdlIGFuZCBjb21wYXJlXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcmlnQ2xvbmUgPSBNYXBXcmFwcGVyLmNsb25lPHN0cmluZywgYW55PihvcmlnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBNYXBXcmFwcGVyLm1lcmdlTWFwSW50b01hcFdpdGhPYmplY3Qob3JpZ0Nsb25lLCBuZXdWYWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEodGhpcy5fbWVyZ2VyIGluc3RhbmNlb2YgUHJvcGVydHlNZXJnZXJEeW5hbWljKSAmJlxuICAgICAgICAgICAgKG9yaWcgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHlWYWx1ZSB8fCBuZXdWYWx1ZSBpbnN0YW5jZW9mIER5bmFtaWNQcm9wZXJ0eVZhbHVlKSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IERlZmVycmVkT3BlcmF0aW9uQ2hhaW4odGhpcy5fbWVyZ2VyLCBvcmlnLCBuZXdWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbWVyZ2VyLm1lcmdlKG9yaWcsIG5ld1ZhbHVlLCBpc0RlY2xhcmUpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFdyYXBwZXIgZm9yIGEgdmFsdWUgdGhhdCBzaG91bGQsIGluIHJ1bGUgYXBwbGljYXRpb24sIG92ZXJyaWRlIGFueSBwcmV2aW91cyB2YWx1ZSBmb3IgaXRzXG4gKiBwcm9wZXJ0eS4gIFRoaXMgY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgZGVmYXVsdCBwcm9wZXJ0eSB2YWx1ZSBtZXJnZSBwb2xpY3ksIGZvciBpbnN0YW5jZVxuICogYWxsb3dpbmcgdGhlICd2aXNpYmxlJyBwcm9wZXJ0eSB0byBiZSBmb3JjZWQgZnJvbSBmYWxzZSB0byB0cnVlLlxuICovXG5leHBvcnQgY2xhc3MgT3ZlcnJpZGVWYWx1ZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmFsdWU6IGFueSkge1xuICAgIH1cblxuICAgIHZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSA9PT0gJ251bGwnID8gbnVsbCA6IHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5fdmFsdWUpID8gdGhpcy5fdmFsdWUudG9TdHJpbmcoKSArICchJyA6ICdudWxsJyArICchJztcbiAgICB9XG59XG5cblxuLyoqXG4gKiBLZXlEYXRhIGlzIHRoZSBwcmltYXJ5IHN0cnVjdHVyZSBmb3IgcmVwcmVzZW50aW5nIGluZm9ybWF0aW9uIGFib3V0IGNvbnRleHQga2V5c1xuICogKGUuZy4gJ2NsYXNzJywgJ2xheW91dCcsICdvcGVyYXRpb24nLCAnZmllbGQnLCAuLi4pLCBpbmNsdWRpbmcgYW4gaW5kZXggb2YgcnVsZXNcbiAqIHRoYXQgbWF0Y2ggb24gcGFydGljdWxhciB2YWx1ZXMgb2YgdGhhdCBrZXkgKF9WYWx1ZU1hdGNoZXMpLlxuICpcbiAqIE5vdGUgdGhhdCBldmVyeSBjb250ZXh0IGtleSBoYXMgYSBzbWFsbCBpbnRlZ2VyIElEICgwLTYzKSBhbmQgdGhlc2UgYXJlIHVzZXMgaW5cbiAqIChsb25nKSBtYXNrcyBmb3IgY2VydGFpbiBydWxlIG1hdGNoaW5nIG9wZXJhdGlvbnMuXG4gKi9cblxuZXhwb3J0IGNsYXNzIEtleURhdGEge1xuICAgIHByaXZhdGUgX3J1bGVWZWNzOiBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgVmFsdWVNYXRjaGVzPjtcbiAgICBwcml2YXRlIF9vYnNlcnZlcnM6IEFycmF5PFZhbHVlUXVlcmllZE9ic2VydmVyPjtcblxuICAgIHByaXZhdGUgX2FueTogVmFsdWVNYXRjaGVzO1xuICAgIF90cmFuc2Zvcm1lcjogS2V5VmFsdWVUcmFuc2Zvcm1lcjtcblxuICAgIHByaXZhdGUgX2lzUHJvcGVydHlTY29wZTogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2tleTogc3RyaW5nLCBwdWJsaWMgX2lkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcnVsZVZlY3MgPSBuZXcgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIFZhbHVlTWF0Y2hlcz4oKTtcbiAgICAgICAgdGhpcy5fYW55ID0gdGhpcy5nZXQoTWV0YS5LZXlBbnkpO1xuXG4gICAgfVxuXG4gICAgbWFza1ZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzaGlmdExlZnQoMSwgdGhpcy5faWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0KHZhbHVlOiBhbnkpOiBWYWx1ZU1hdGNoZXMge1xuICAgICAgICBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gTWV0YS5OdWxsTWFya2VyO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMuX3RyYW5zZm9ybWVyKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl90cmFuc2Zvcm1lci50cmFuZm9ybUZvck1hdGNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWF0Y2hlczogVmFsdWVNYXRjaGVzID0gdGhpcy5fcnVsZVZlY3MuZ2V0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKG1hdGNoZXMpKSB7XG4gICAgICAgICAgICBtYXRjaGVzID0gbmV3IFZhbHVlTWF0Y2hlcyh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodmFsdWUpICYmICFCb29sZWFuV3JhcHBlci5pc0ZhbHNlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoZXMuX3BhcmVudCA9IHRoaXMuX2FueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3J1bGVWZWNzLnNldFZhbHVlKHZhbHVlLCBtYXRjaGVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG5cbiAgICBtYXRjaFZhbHVlKHZhbHVlOiBhbnkpOiBNYXRjaFZhbHVlIHtcbiAgICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbGlzdCA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGxpc3RbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG11bHRpOiBNdWx0aU1hdGNoVmFsdWUgPSBuZXcgTXVsdGlNYXRjaFZhbHVlKCk7XG5cbiAgICAgICAgICAgIExpc3RXcmFwcGVyLmZvckVhY2hXaXRoSW5kZXgobGlzdCwgKHYsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBtdWx0aS5kYXRhLnB1c2godGhpcy5nZXQodikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbXVsdGk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBhZGRFbnRyeSh2YWx1ZTogYW55LCBpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBtYXRjaGVzOiBWYWx1ZU1hdGNoZXMgPSB0aGlzLmdldCh2YWx1ZSk7XG4gICAgICAgIGxldCBiZWZvcmU6IG51bWJlcltdID0gbWF0Y2hlcy5fYXJyO1xuICAgICAgICBsZXQgYWZ0ZXI6IG51bWJlcltdID0gTWF0Y2guYWRkSW50KGJlZm9yZSwgaWQpO1xuICAgICAgICBpZiAoYmVmb3JlICE9PSBhZnRlcikge1xuICAgICAgICAgICAgbWF0Y2hlcy5fYXJyID0gYWZ0ZXI7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGxvb2t1cChvd25lcjogTWV0YSwgdmFsdWU6IGFueSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IG1hdGNoZXM6IFZhbHVlTWF0Y2hlcyA9IHRoaXMuZ2V0KHZhbHVlKTtcbiAgICAgICAgaWYgKCFtYXRjaGVzLl9yZWFkICYmIGlzUHJlc2VudCh0aGlzLl9vYnNlcnZlcnMpKSB7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVzLl9yZWFkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdGlmeVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuZm9yRWFjaFdpdGhJbmRleCh0aGlzLl9vYnNlcnZlcnMsICh2LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi5ub3RpZnkob3duZXIsIHRoaXMuX2tleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWF0Y2hlcy5fcmVhZCA9IHRydWU7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgaWYgcGFyZW50IGhhcyBjaGFuZ2VkIGFuZCBuZWVkIHRvIHVuaW9uIGluIHBhcmVudCBkYXRhXG4gICAgICAgIG1hdGNoZXMuY2hlY2tQYXJlbnQoKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMuX2FycjtcbiAgICB9XG5cblxuICAgIHNldFBhcmVudCh2YWx1ZTogYW55LCBwYXJlbnRWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBwYXJlbnQ6IFZhbHVlTWF0Y2hlcyA9IHRoaXMuZ2V0KHBhcmVudFZhbHVlKTtcbiAgICAgICAgbGV0IGNoaWxkOiBWYWx1ZU1hdGNoZXMgPSB0aGlzLmdldCh2YWx1ZSk7XG4gICAgICAgIGNoaWxkLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgfVxuXG5cbiAgICBwYXJlbnQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgIGxldCBjaGlsZDogVmFsdWVNYXRjaGVzID0gdGhpcy5nZXQodmFsdWUpO1xuICAgICAgICByZXR1cm4gY2hpbGQuX3BhcmVudC5fdmFsdWU7XG4gICAgfVxuXG5cbiAgICBhZGRPYnNlcnZlcihvOiBWYWx1ZVF1ZXJpZWRPYnNlcnZlcik6IHZvaWQge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9vYnNlcnZlcnMpKSB7XG4gICAgICAgICAgICB0aGlzLl9vYnNlcnZlcnMgPSBuZXcgQXJyYXk8VmFsdWVRdWVyaWVkT2JzZXJ2ZXI+KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzLnB1c2gobyk7XG4gICAgfVxuXG5cbiAgICAvLyBJZiB0aGlzIGtleSBkZWZpbmVzIGEgc2NvcGUgZm9yIHByb3BlcnRpZXMgKGUuZy4gZmllbGQsIGNsYXNzLCBhY3Rpb24pXG4gICAgLy8gdGhpcyB0aGlzIHJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHNlbGVjdG9yIGtleSBmb3IgdGhvc2UgcHJvcGVydGllc1xuICAgIC8vIChlLmcuIGZpZWxkX3AsIGNsYXNzX3ApXG4gICAgZ2V0IGlzUHJvcGVydHlTY29wZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUHJvcGVydHlTY29wZTtcbiAgICB9XG5cbiAgICBzZXQgaXNQcm9wZXJ0eVNjb3BlKHluOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzUHJvcGVydHlTY29wZSA9IHluO1xuICAgIH1cblxuXG4gICAgZ2V0IHJ1bGVWZWNzKCk6IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBWYWx1ZU1hdGNoZXM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3J1bGVWZWNzO1xuICAgIH1cblxuICAgIGdldCBrZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleTtcbiAgICB9XG5cbiAgICBnZXQgaWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuXG4gICAgZ2V0IG9ic2VydmVycygpOiBBcnJheTxWYWx1ZVF1ZXJpZWRPYnNlcnZlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2JzZXJ2ZXJzO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFN0b3JlIG9mIHBvbGljeSBpbmZvcm1hdGlvbiBmb3IgcGFydGljdWxhciBwcm9wZXJ0aWVzIC0tIG1vc3Qgc2lnbmlmaWNhbnRseSwgaG93XG4gKiBzdWNjZXNzaXZlIHZhbHVlcyBvZiB0aGlzIHByb3BlcnR5IGFyZSB0byBiZSAqbWVyZ2VkKiBkdXJpbmcgcnVsZSBhcHBsaWNhdGlvbi5cbiAqIChTZWUgTWV0YS5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKS4gIEUuZy4gJ3Zpc2libGUnLCAndHJhaXQnLCBhbmQgJ3ZhbGlkJyBhbGwgaGF2ZSB1bmlxdWVcbiAqIG1lcmdlIHBvbGljaWVzLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlNYXAgaW1wbGVtZW50cyBNYXA8c3RyaW5nLCBhbnk+IHtcblxuICAgIHByaXZhdGUgX2NvbnRleHRQcm9wZXJ0aWVzVXBkYXRlZDogQXJyYXk8UHJvcGVydHlNYW5hZ2VyPjtcbiAgICBwcm90ZWN0ZWQgX21hcDogTWFwPHN0cmluZywgYW55PjtcblxuICAgIFtTeW1ib2wudG9TdHJpbmdUYWddOiAnTWFwJztcblxuXG4gICAgY29uc3RydWN0b3IoZW50cmllcz86IE1hcDxzdHJpbmcsIGFueT4pIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChlbnRyaWVzKSkge1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oZW50cmllcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmdldChrZXkpO1xuICAgIH1cblxuXG4gICAga2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmtleXMoKTtcbiAgICB9XG5cblxuICAgIHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnZhbHVlcygpO1xuICAgIH1cblxuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlPzogYW55KTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICBkZWxldGUoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmRlbGV0ZShrZXkpO1xuICAgIH1cblxuICAgIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBhbnksIGluZGV4OiBzdHJpbmcsIG1hcDogTWFwPHN0cmluZywgYW55PikgPT4gdm9pZCxcbiAgICAgICAgICAgIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFwLmZvckVhY2goY2FsbGJhY2tmbik7XG4gICAgfVxuXG5cbiAgICBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5oYXMoa2V5KTtcbiAgICB9XG5cblxuICAgIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIH1cblxuXG4gICAgZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmVudHJpZXMoKTtcbiAgICB9XG5cblxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuc2l6ZTtcbiAgICB9XG5cblxuICAgIGF3YWtlUHJvcGVydGllcygpOiB2b2lkIHtcbiAgICAgICAgTWFwV3JhcHBlci5pdGVyYWJsZSh0aGlzKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNQcm9wZXJ0eU1hcEF3YWtpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gdmFsdWUuYXdha2VGb3JQcm9wZXJ0eU1hcCh0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkQ29udGV4dEtleShrZXk6IFByb3BlcnR5TWFuYWdlcik6IHZvaWQge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9jb250ZXh0UHJvcGVydGllc1VwZGF0ZWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0UHJvcGVydGllc1VwZGF0ZWQgPSBuZXcgQXJyYXk8UHJvcGVydHlNYW5hZ2VyPigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbnRleHRQcm9wZXJ0aWVzVXBkYXRlZC5wdXNoKGtleSk7XG4gICAgfVxuXG5cbiAgICBnZXQgY29udGV4dEtleXNVcGRhdGVkKCk6IEFycmF5PFByb3BlcnR5TWFuYWdlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dFByb3BlcnRpZXNVcGRhdGVkO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAvLyB0b2RvOiBmaW5kIGJldHRlciB3YXkgZm9yIHRoZSBzdHJpbmcuIHRoc2kgaXMgYWxzbyB1c2VkIGFzIGtleSBmb3IgdGhlIGRpY3Rpb25hcnlcbiAgICAgICAgLy8gbm90IHJlYWxseSBlZmZpY2llbnRcbiAgICAgICAgbGV0IHNqID0gbmV3IFN0cmluZ0pvaW5lcihbJ1Byb3BlcnR5TWFwOiddKTtcbiAgICAgICAgc2ouYWRkKHRoaXMuc2l6ZSArICcsJyk7XG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUodGhpcykuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzUHJvcGVydHlNYXBBd2FraW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlLmF3YWtlRm9yUHJvcGVydHlNYXAodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzai5hZGQoa2V5ICsgJzonICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzai5hZGQoJywgJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNqLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG5cbi8vIE1hcmtlciBpbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlNZXJnZXJJc0NoYWluaW5nIHtcbiAgICBpc1Byb3BNZXJnZXJJc0NoYWluaW5nTWFyazogYm9vbGVhbjtcblxufVxuXG4vKipcbiAqIERlZmluZSBwb2xpY3kgZm9yIG1lcmdpbmcgYSBwcm9wZXJ0eSB2YWx1ZSBhc3NpZ25lZCBieSBvbmUgcnVsZVxuICogdG8gYSBzdWJzZXF1ZW50IHZhbHVlIGZyb20gYSBoaWdoZXIgcmFua2VkIHJ1bGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlNZXJnZXIge1xuXG4gICAgX21ldGE6IE1ldGE7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgZHVyaW5nIHJ1bGUgYXBwbGljYXRpb24gdG8gbWVyZ2UgYW4gZWFybGllciAobG93ZXIgcmFua2VkKSB2YWx1ZSB3aXRoIGEgbmV3ZXIgb25lLlxuICAgICAqIEBwYXJhbSBvcmlnIHRoZSBwcmV2aW91cyB2YWx1ZSBhY2N1bXVsYXRlZCBpbiB0aGUgcHJvcGVydHkgbWFwXG4gICAgICogQHBhcmFtIG92ZXJyaWRlIHRoZSBuZXcgdmFsdWUgZnJvbSB0aGUgaGlnaGVyIHJhbmtlZCBydWxlXG4gICAgICogQHBhcmFtIGlzRGVjbGFyZSB3aGV0aGVyIHdlIGFyZSBjdXJyZW50bHkgYWNjdW11bGF0aW5nIG1hdGNoZWQgZm9yIGRlY2xhcmF0aW9ucyBvZiB0aGVcbiAgICAgKiAgICAgcHJvcGVydHkvdmFsdWVcbiAgICAgKiBAcmV0dXJuIHRoZSBuZXcgcHJvcGVydHkgdmFsdWUgdG8gYmUgcHV0IGluIHRoZSBwcm9wZXJ0eSBtYXBcbiAgICAgKi9cbiAgICBtZXJnZSAob3JpZzogYW55LCBvdmVycmlkZTogYW55LCBpc0RlY2xhcmU6IGJvb2xlYW4pOiBhbnk7XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmc7XG59XG5cbi8vIG1hcmtlciBpbnRlcmZhY2UgZm9yIFByb3BlcnR5TWVyZ2VzIHRoYXQgY2FuIGhhbmRsZSBkeW5hbWljIHZhbHVlc1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByb3BlcnR5TWVyZ2VyRHluYW1pYyBpbXBsZW1lbnRzIFByb3BlcnR5TWVyZ2VyIHtcbiAgICBfbWV0YTogTWV0YTtcblxuICAgIG1lcmdlKG9yaWc6IGFueSwgb3ZlcnJpZGU6IGFueSwgaXNEZWNsYXJlOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ1Byb3BlcnR5TWVyZ2VyRHluYW1pYyc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eU1lcmdlcl9PdmVyd3JpdGUgaW1wbGVtZW50cyBQcm9wZXJ0eU1lcmdlciB7XG4gICAgX21ldGE6IE1ldGE7XG5cbiAgICBtZXJnZShvcmlnOiBhbnksIG92ZXJyaWRlOiBhbnksIGlzRGVjbGFyZTogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIHJldHVybiBvdmVycmlkZTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ09WRVJXUklURSc7XG4gICAgfVxufVxuXG4vKipcbiBQcm9wZXJ0eU1lcmdlciBmb3IgcHJvcGVydGllcyB0aGUgc2hvdWxkIGJlIHVuaW9uZWQgYXMgbGlzdHNcbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5TWVyZ2VyX0xpc3QgaW1wbGVtZW50cyBQcm9wZXJ0eU1lcmdlciB7XG4gICAgX21ldGE6IE1ldGE7XG5cbiAgICBtZXJnZShvcmlnOiBhbnksIG92ZXJyaWRlOiBhbnksIGlzRGVjbGFyZTogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGlmICghKGlzQXJyYXkob3JpZykpICYmICEoaXNBcnJheShvdmVycmlkZSkpICYmIE1ldGEub2JqZWN0RXF1YWxzKG9yaWcsIG92ZXJyaWRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9yaWc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGwxID0gTWV0YS50b0xpc3Qob3JpZyk7XG4gICAgICAgIGxldCBsMiA9IE1ldGEudG9MaXN0KG92ZXJyaWRlKTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gTGlzdFdyYXBwZXIuY2xvbmUobDEpO1xuXG4gICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRzSWZBYnNlbnQocmVzdWx0LCBsMik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5cbi8qKlxuICogUHJvcGVydHlNZXJnZXIgZm9yIHByb3BlcnRpZXMgdGhlIHNob3VsZCBvdmVycmlkZSBub3JtYWxseSwgYnV0IHJldHVybiBsaXN0cyB3aGVuXG4gKiBpbiBkZWNsYXJlIG1vZGUgKGUuZy4gJ2NsYXNzJywgJ2ZpZWxkJywgJ2xheW91dCcsIC4uLilcbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5TWVyZ2VyRGVjbGFyZUxpc3QgZXh0ZW5kcyBQcm9wZXJ0eU1lcmdlckR5bmFtaWMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbWVyZ2Uob3JpZzogYW55LCBvdmVycmlkZTogYW55LCBpc0RlY2xhcmU6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICBpZiAoIWlzRGVjbGFyZSkge1xuICAgICAgICAgICAgcmV0dXJuIG92ZXJyaWRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoaXNBcnJheShvcmlnKSkgJiYgIShpc0FycmF5KG92ZXJyaWRlKSkgJiYgTWV0YS5vYmplY3RFcXVhbHMob3JpZywgb3ZlcnJpZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3JpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQ6IGFueVtdID0gW107XG4gICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRzSWZBYnNlbnQocmVzdWx0LCBNZXRhLnRvTGlzdChvcmlnKSk7XG4gICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRzSWZBYnNlbnQocmVzdWx0LCBNZXRhLnRvTGlzdChvdmVycmlkZSkpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdQcm9wZXJ0eU1lcmdlckRlY2xhcmVMaXN0JztcbiAgICB9XG59XG5cbi8qKlxuICogUHJvcGVydHlNZXJnZXIgZm9yIHRoZSAndHJhaXQnIHByb3BlcnR5LiAgR2VuZXJhbGx5LCB0cmFpdHMgYXJlIHVuaW9uZWQsIGV4Y2VwdCBmb3IgdHJhaXRzXG4gKiBmcm9tIHRoZSBzYW1lICd0cmFpdEdyb3VwJywgd2hpY2ggb3ZlcnJpZGUgKGkuZS4gb25seSBvbmUgdHJhaXQgZnJvbSBlYWNoIHRyYWl0R3JvdXAgc2hvdWxkXG4gKiBzdXJ2aXZlKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5TWVyZ2VyRGVjbGFyZUxpc3RGb3JUcmFpdCBleHRlbmRzIFByb3BlcnR5TWVyZ2VyRGVjbGFyZUxpc3Qge1xuXG4gICAgX21ldGE6IE1ldGE7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG1lcmdlKG9yaWc6IGFueSwgb3ZlcnJpZGU6IGFueSwgaXNEZWNsYXJlOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgaWYgKGlzRGVjbGFyZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm1lcmdlKG9yaWcsIG92ZXJyaWRlLCBpc0RlY2xhcmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UncmUgb3ZlcnJpZGUgYSBzaW5nbGUgZWxlbWVudCB3aXRoIGl0c2VsZiwgZG9uJ3QgZ28gTGlzdC4uLlxuICAgICAgICBpZiAoIWlzQXJyYXkob3JpZykgJiYgIWlzQXJyYXkob3ZlcnJpZGUpICYmIE1ldGEub2JqZWN0RXF1YWxzKG9yaWcsIG92ZXJyaWRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9yaWc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9yaWdMID0gTWV0YS50b0xpc3Qob3JpZyk7XG4gICAgICAgIGxldCBvdmVycmlkZUwgPSBNZXRhLnRvTGlzdChvdmVycmlkZSk7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueVtdID0gW107XG4gICAgICAgIGZvciAobGV0IHRyYWl0IG9mIG9yaWdMKSB7XG4gICAgICAgICAgICBpZiAodHJhaXQgaW5zdGFuY2VvZiBPdmVycmlkZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdHJhaXQgPSAoPE92ZXJyaWRlVmFsdWU+IHRyYWl0KS52YWx1ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY2FuQWRkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBncm91cCA9IHRoaXMuX21ldGEuZ3JvdXBGb3JUcmFpdCh0cmFpdCk7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoZ3JvdXApKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvdmVycmlkZVRyYWl0IG9mIG92ZXJyaWRlTCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcnJpZGVUcmFpdCBpbnN0YW5jZW9mIE92ZXJyaWRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJyaWRlVHJhaXQgPSAoPE92ZXJyaWRlVmFsdWU+b3ZlcnJpZGVUcmFpdCkudmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwID09PSB0aGlzLl9tZXRhLmdyb3VwRm9yVHJhaXQob3ZlcnJpZGVUcmFpdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbkFkZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FuQWRkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godHJhaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRzSWZBYnNlbnQocmVzdWx0LCBvdmVycmlkZUwpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdQcm9wZXJ0eU1lcmdlckRlY2xhcmVMaXN0Rm9yVHJhaXQnO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFByb3BlcnR5TWVyZ2VyIGltcGxlbWVudGluZyBBTkQgc2VtYW50aWNzIC0tIGkuZS4gZmFsc2UgdHJ1bXBzIHRydWUuXG4gKiAoVXNlZCwgZm9yIGluc3RhbmNlLCBmb3IgdGhlIHByb3BlcnRpZXMgJ3Zpc2libGUnIGFuZCAnZWRpdGFibGUnKVxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlNZXJnZXJfQW5kIGV4dGVuZHMgUHJvcGVydHlNZXJnZXJEeW5hbWljIGltcGxlbWVudHMgUHJvcGVydHlNZXJnZXJJc0NoYWluaW5nIHtcbiAgICBpc1Byb3BNZXJnZXJJc0NoYWluaW5nTWFyazogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIG1lcmdlKG9yaWc6IGFueSwgb3ZlcnJpZGU6IGFueSwgaXNEZWNsYXJlOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgLy8gbnVsbCB3aWxsIHJlc2V0IChzbyB0aGF0IGl0IGNhbiBiZSBvdmVycmlkZGVuIHRvIHRydWUgc3Vic2VxdWVudGx5XG4gICAgICAgIGlmIChpc0JsYW5rKG92ZXJyaWRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB3ZSBjYW4gZXZhbHVhdGUgc3RhdGljYWxseSwgZG8gaXQgbm93XG5cblxuICAgICAgICBpZiAoKGlzQm9vbGVhbihvcmlnKSAmJiAhKEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKG9yaWcpKSkgfHxcbiAgICAgICAgICAgIChpc0Jvb2xlYW4ob3ZlcnJpZGUpICYmICEoQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUob3ZlcnJpZGUpKSkpIHtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFORGluZyB3aXRoIHRydWUgaXMgYSBub29wIC0tIHJldHVybiBuZXcgdmFsdWVcbiAgICAgICAgaWYgKGlzQm9vbGVhbihvcmlnKSAmJiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZShvcmlnKSkge1xuXG4gICAgICAgICAgICByZXR1cm4gKG92ZXJyaWRlIGluc3RhbmNlb2YgRHluYW1pY1Byb3BlcnR5VmFsdWUpID8gb3ZlcnJpZGVcbiAgICAgICAgICAgICAgICA6IEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBvdmVycmlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCb29sZWFuKG92ZXJyaWRlKSAmJiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZShvdmVycmlkZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAob3JpZyBpbnN0YW5jZW9mIER5bmFtaWNQcm9wZXJ0eVZhbHVlKSA/IG9yaWcgOiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZShcbiAgICAgICAgICAgICAgICBvdmVycmlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBvbmUgb2Ygb3VyIHZhbHVlcyBpcyBkeW5hbWljLCBkZWZlclxuICAgICAgICBpZiAoKG9yaWcgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHlWYWx1ZSB8fCBvdmVycmlkZSBpbnN0YW5jZW9mIER5bmFtaWNQcm9wZXJ0eVZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEZWZlcnJlZE9wZXJhdGlvbkNoYWluKHRoaXMsIG9yaWcsIG92ZXJyaWRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUob3JpZykgJiYgQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUob3ZlcnJpZGUpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnQU5EJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFByb3BlcnR5TWVyZ2VyX1ZhbGlkIGltcGxlbWVudHMgUHJvcGVydHlNZXJnZXIsXG4gICAgUHJvcGVydHlNZXJnZXJJc0NoYWluaW5nIHtcbiAgICBfbWV0YTogTWV0YTtcbiAgICBpc1Byb3BNZXJnZXJJc0NoYWluaW5nTWFyazogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBtZXJnZShvcmlnOiBhbnksIG92ZXJyaWRlOiBhbnksIGlzRGVjbGFyZTogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKlxuICAgICAgICAgcmV0dXJuIChpc1N0cmluZyhvdmVycmlkZSkgfHwgKCBpc0Jvb2xlYW4ob3ZlcnJpZGUpICYmXG4gICAgICAgICAhKEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKG92ZXJyaWRlKSkpKSA/IG92ZXJyaWRlIDogb3JpZztcbiAgICAgICAgICovXG5cbiAgICAgICAgLy8gaWYgZmlyc3QgaXMgZXJyb3IgKGVycm9yIG1lc3NhZ2Ugb3IgZmFsc2UsIGl0IHdpbnMpLCBvdGhlcndpc2Ugc2Vjb25kXG4gICAgICAgIHJldHVybiAoaXNTdHJpbmcob3ZlcnJpZGUpIHx8IChpc0Jvb2xlYW4ob3ZlcnJpZGUpICYmIEJvb2xlYW5XcmFwcGVyLmlzRmFsc2Uob3ZlcnJpZGUpKSlcbiAgICAgICAgICAgID8gb3ZlcnJpZGUgOiBvcmlnO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnVkFMSURBVEUnO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgZ3JvdXAgb2YgcnVsZXMgb3JpZ2luYXRpbmcgZnJvbSBhIGNvbW1vbiBzb3VyY2UuXG4gKiBBbGwgcnVsZXMgbXVzdCBiZSBhZGRlZCB0byB0aGUgcnVsZSBiYXNlIGFzIHBhcnQgb2YgYSBSdWxlU2V0LlxuICovXG5leHBvcnQgY2xhc3MgUnVsZVNldCB7XG5cbiAgICBfZmlsZVBhdGg6IHN0cmluZztcbiAgICBfc3RhcnQ6IG51bWJlciA9IDA7XG4gICAgX2VuZDogbnVtYmVyID0gMDtcbiAgICBfZWRpdGFibGVTdGFydDogbnVtYmVyID0gLTE7XG5cbiAgICBfcmFuazogbnVtYmVyID0gMDtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWV0YTogTWV0YSkge1xuICAgIH1cblxuICAgIGRpc2FibGVSdWxlcygpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3N0YXJ0OyBpIDwgdGhpcy5fZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX21ldGEuX3J1bGVzW2ldLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZXRhLmNsZWFyQ2FjaGVzKCk7XG5cbiAgICB9XG5cblxuICAgIGdldCBmaWxlUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsZVBhdGg7XG4gICAgfVxuXG4gICAgcnVsZXMoZWRpdGFibGVPbmx5OiBhbnkpOiBBcnJheTxSdWxlPiB7XG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PFJ1bGU+ID0gW107XG4gICAgICAgIGxldCBpID0gKGVkaXRhYmxlT25seSkgPyAodGhpcy5fZWRpdGFibGVTdGFydCA9PT0gLTEgPyB0aGlzLl9lbmQgOiB0aGlzLl9lZGl0YWJsZVN0YXJ0KVxuICAgICAgICAgICAgOiB0aGlzLl9zdGFydDtcbiAgICAgICAgZm9yICg7IGkgPCB0aGlzLl9lbmQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHIgPSB0aGlzLl9tZXRhLl9ydWxlc1tpXTtcbiAgICAgICAgICAgIGlmICghci5kaXNhYmxlZCgpICYmICF0aGlzLl9tZXRhLmlzVHJhaXRFeHBvcnRSdWxlKHIpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIHN0YXJ0UmFuaygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHRoaXMuX3N0YXJ0IDwgdGhpcy5fbWV0YS5fcnVsZUNvdW50KVxuICAgICAgICAgICAgPyB0aGlzLl9tZXRhLl9ydWxlc1t0aGlzLl9zdGFydF0ucmFua1xuICAgICAgICAgICAgOiB0aGlzLl9yYW5rIC0gKHRoaXMuX2VuZCAtIHRoaXMuX3N0YXJ0KTtcbiAgICB9XG5cbiAgICBhbGxvY2F0ZU5leHRSdWxlRW50cnkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9tZXRhLl9ydWxlQ291bnQgPiB0aGlzLl9lbmQpID8gdGhpcy5fbWV0YS5fcnVsZUNvdW50KysgOiB0aGlzLl9lbmQrKztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xuICAgIH1cblxuICAgIGdldCBlbmQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZDtcbiAgICB9XG5cbiAgICBnZXQgZWRpdGFibGVTdGFydCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdGFibGVTdGFydDtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBYnN0cmFjdGlvbiBmb3IgdmFsdWVzIChvciBzZXRzIG9mIHZhbHVlcykgdGhhdCBjYW4gYmUgbWF0Y2hlZCBhZ2FpbnN0IG90aGVyc1xuICogKGluIHRoZSBjb250ZXh0IG9mIFNlbGVjdG9yIGtleS92YWx1ZSkgbWF0Y2hpbmcuICBTdWJ0eXBlcyB0YWtlIGFkdmFudGFnZSBvZlxuICogdGhlIGZhY3QgdGhhdCBWYWx1ZU1hdGNoZXMgaW5zdGFuY2VzIGdsb2JhbGx5IHVuaXF1ZWx5IHJlcHJlc2VudCBrZXkvdmFsdWUgcGFpcnNcbiAqIHRvIGVuYWJsZSBlZmZpY2llbnQgbWF0Y2hpbmcgZW50aXJlbHkgdGhyb3VnaCBpZGVudGl0eSBjb21wYXJpc29uLlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Y2hWYWx1ZSB7XG4gICAgbWF0Y2hlcyAob3RoZXI6IE1hdGNoVmFsdWUpOiBib29sZWFuO1xuXG4gICAgdXBkYXRlQnlBZGRpbmcgKG90aGVyOiBNYXRjaFZhbHVlKTogTWF0Y2hWYWx1ZTtcbn1cblxuXG4vKipcbiAqXG4gKiBVbmlxdWVseSByZXByZXNlbnRzIGEgcGFydGljdWxhciBrZXkvdmFsdWUgaW4gdGhlIE1ldGEgc2NvcGUsIGFuZCBpbmRleGVzIGFsbCBydWxlc1xuICogd2l0aCAoaW5kZXhlZCkgU2VsZWN0b3JzIG1hdGNoaW5nIHRoYXQga2V5L3ZhbHVlLlxuXG4gKiBWYWx1ZU1hdGNoZXMgYWxzbyBtb2RlbHMgKmluaGVyaXRhbmNlKiBieSBhbGxvd2luZyBvbmUga2V5L3ZhbHVlIHRvIGhhdmUgYW5vdGhlclxuICogYXMgaXRzICdwYXJlbnQnIGFuZCB0aGVyZWJ5IG1hdGNoIG9uIGFueSBTZWxlY3RvciAoYW5kIHJ1bGUpIHRoYXQgaXRzIHBhcmVudCB3b3VsZC5cbiAqXG4gKiBGb3IgaW5zdGFuY2UsIHRoaXMgZW5hYmxlcyBhIHJ1bGUgb24gY2xhc3M9TnVtYmVyIHRvIGFwcGx5IHRvIGNsYXNzPUludGVnZXIgYW5kXG4gKiBjbGFzcz1CaWdEZWNpbWFsLCBhbmQgb25lIG9uIGNsYXNzPSogdG8gYXBwbHkgdG8gYW55LlxuICpcbiAqIFRoZSB1dGlsaXR5IG9mICdwYXJlbnQnIGlzIG5vdCBsaW1pdGVkLCBvZiBjb3Vyc2UsIHRvIHRoZSBrZXkgJ2NsYXNzJzogYWxsIGtleXNcbiAqIHRha2UgYWR2YW50YWdlIG9mIHRoZSBwYXJlbnQgJyonIHRvIHN1cHBvcnQgdW5xdWFsaWZpZWQgbWF0Y2hlcyBvbiB0aGF0IGtleSwgYW5kXG4gKiBrZXlzIGxpa2UgJ29wZXJhdGlvbicgZGVmaW5lIGEgdmFsdWUgaGllcmFyY2h5ICggJ2luc3BlY3QnIC0+IHsndmlldycsICdzZWFyY2gnfSxcbiAqICdzZWFyY2gnIC0+IHsna2V5d29yZFNlYXJjaCcsICd0ZXh0U2VhcmNoJ30pXG4gKi9cblxuZXhwb3J0IGNsYXNzIFZhbHVlTWF0Y2hlcyBpbXBsZW1lbnRzIE1hdGNoVmFsdWUge1xuXG4gICAgX3ZhbHVlOiBhbnk7XG4gICAgX3JlYWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBfYXJyOiBudW1iZXJbXTtcblxuICAgIF9wYXJlbnQ6IFZhbHVlTWF0Y2hlcztcbiAgICBfcGFyZW50U2l6ZTogbnVtYmVyID0gMDtcblxuXG4gICAgY29uc3RydWN0b3IodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGNoZWNrUGFyZW50KCkge1xuICAgICAgICAvLyB0b2RvOiBwZXJmb3JtYW5jZToga2VlcCBhIHJ1bGUgc2V0IHZlcnNpb24gIyBhbmQgb25seSBkbyB0aGlzIHdoZW4gdGhlIHJ1bGUgc2V0IGhhc1xuICAgICAgICAvLyByZWxvYWRlZFxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcGFyZW50KSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50LmNoZWNrUGFyZW50KCk7XG5cbiAgICAgICAgICAgIGxldCBwYXJlbnRBcnI6IG51bWJlcltdID0gdGhpcy5fcGFyZW50Ll9hcnI7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQocGFyZW50QXJyKSAmJiBwYXJlbnRBcnJbMF0gIT09IHRoaXMuX3BhcmVudFNpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcnIgPSBNYXRjaC51bmlvbih0aGlzLl9hcnIsIHBhcmVudEFycik7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50U2l6ZSA9IHBhcmVudEFyclswXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWF0Y2hlcyhvdGhlcjogTWF0Y2hWYWx1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFZhbHVlTWF0Y2hlcykpIHtcbiAgICAgICAgICAgIHJldHVybiBvdGhlci5tYXRjaGVzKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2UgcmVjdXJzZSB1cCBwYXJlbnQgY2hhaW4gdG8gZG8gc3VwZXJjbGFzcyBtYXRjaGVzXG4gICAgICAgIHJldHVybiAob3RoZXIgPT09IHRoaXMpIHx8IChpc1ByZXNlbnQodGhpcy5fcGFyZW50KSAmJiB0aGlzLl9wYXJlbnQubWF0Y2hlcyhvdGhlcikpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJ5QWRkaW5nKG90aGVyOiBNYXRjaFZhbHVlKTogTWF0Y2hWYWx1ZSB7XG4gICAgICAgIGxldCBtdWx0aTogTXVsdGlNYXRjaFZhbHVlID0gbmV3IE11bHRpTWF0Y2hWYWx1ZSgpO1xuICAgICAgICBtdWx0aS5kYXRhLnB1c2godGhpcyk7XG4gICAgICAgIHJldHVybiBtdWx0aS51cGRhdGVCeUFkZGluZyhvdGhlcik7XG4gICAgfVxuXG59XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC93aWtpL0ZBUSN3aHktZG9lc250LWV4dGVuZGluZy1idWlsdC1pbnMtbGlrZS1lcnJvci1cbi8vICBhcnJheS1hbmQtbWFwLXdvcmtcbmV4cG9ydCBjbGFzcyBNdWx0aU1hdGNoVmFsdWUgaW1wbGVtZW50cyBNYXRjaFZhbHVlIHtcblxuICAgIGRhdGE6IEFycmF5PE1hdGNoVmFsdWU+ID0gW107XG5cblxuICAgIG1hdGNoZXMob3RoZXI6IE1hdGNoVmFsdWUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG90aGVyIGluc3RhbmNlb2YgTXVsdGlNYXRjaFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBsaXN0IC8gbGlzdCBjb21wYXJpc29uOiBhbnkgY29tYm8gY2FuIG1hdGNoXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChvdGhlci5tYXRjaGVzKHRoaXMuZGF0YVtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2luZ2xlIHZhbHVlIGFnYWluc3QgYXJyYXk6IG9uZSBtdXN0IG1hdGNoXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGFbaV0ubWF0Y2hlcyhvdGhlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB1cGRhdGVCeUFkZGluZyhvdGhlcjogTWF0Y2hWYWx1ZSk6IE1hdGNoVmFsdWUge1xuICAgICAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBNdWx0aU1hdGNoVmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBtYXRjaFZhbHVlOiBNdWx0aU1hdGNoVmFsdWUgPSA8TXVsdGlNYXRjaFZhbHVlPiBvdGhlcjtcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEFsbCh0aGlzLmRhdGEsIG1hdGNoVmFsdWUuZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEucHVzaChvdGhlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWVRdWVyaWVkT2JzZXJ2ZXIge1xuXG4gICAgbm90aWZ5IChtZXRhOiBNZXRhLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XG5cbn1cblxuXG4vKipcbiAqIFVzZWQgdG8gdHJhbnNmb3JtIHZhbHVlcyBpbnRvIHRoZSAoc3RhdGljKSB2ZXJzaW9uIHRoZXkgc2hvdWxkIGJlIGluZGV4ZWQgLyBzZWFyY2hlZCB1bmRlclxuICogRm9yIGluc3RhbmNlLCAnb2JqZWN0JyBtYXkgYmUgaW5kZXhlZCBhcyB0cnVlL2ZhbHNlIChwcmVzZW50IG9yIG5vdClcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBLZXlWYWx1ZVRyYW5zZm9ybWVyIHtcbiAgICB0cmFuZm9ybUZvck1hdGNoIChvOiBhbnkpOiBhbnk7XG59XG5cblxuZXhwb3J0IGNsYXNzIEtleVZhbHVlVHJhbnNmb3JtZXJfS2V5UHJlc2VudCBpbXBsZW1lbnRzIEtleVZhbHVlVHJhbnNmb3JtZXIge1xuXG5cbiAgICB0cmFuZm9ybUZvck1hdGNoKG86IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KG8pICYmICEoQm9vbGVhbldyYXBwZXIuaXNGYWxzZShvKSkpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuXG59XG5cblxuLyoqXG4gKiBDYWxsZWQgb24gaW1wbGVtZW50aW5nIHZhbHVlcyB0byBhbGxvdyBzdGF0aWNhbGx5IHJlc29sdmFibGUgKGJ1dCBkeW5hbWljKSB2YWx1ZXNcbiAqIHRvIGV2YWx1YXRlL2NvcHkgdGhlbXNlbHZlcyBmb3IgaW5jbHVzaW9uIGluIGEgbmV3IG1hcCAodG8gZW5zdXJlIHRoYXQgYSB2YWx1ZSB0aGF0XG4gKiBkZXJpdmVkIGl0cyB2YWx1ZSBiYXNlZCBvbiBhIGRpZmZlcmVudCBjb250ZXh0IGRvZXNuJ3QgZ2V0IHJldXNlZCBpbiBhbm90aGVyKVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb3BlcnR5TWFwQXdha2luZyB7XG4gICAgcHJvcGVydHlBd2FraW5nOiBib29sZWFuO1xuXG4gICAgYXdha2VGb3JQcm9wZXJ0eU1hcCAobWFwOiBQcm9wZXJ0eU1hcCk6IGFueTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9wZXJ0eU1hcEF3YWtpbmcoYXJnOiBhbnkpOiBhcmcgaXMgUHJvcGVydHlNYXBBd2FraW5nIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KGFyZykgJiYgaXNQcmVzZW50KGFyZy5wcm9wZXJ0eUF3YWtpbmcpO1xufVxuIl19