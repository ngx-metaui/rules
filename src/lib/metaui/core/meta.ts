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
// todo: try to get rid of this library
import * as Collections from 'typescript-collections';
import {
    assert,
    BooleanWrapper,
    CompositeType,
    equals,
    isArray,
    isBlank,
    isBoolean,
    isEntity,
    isFunction,
    isPresent,
    isString,
    isStringMap,
    isValue,
    ListWrapper,
    MapWrapper,
    print,
    shiftLeft,
    shiftRight,
    StringJoiner,
    StringWrapper,
    unimplemented
} from '@aribaui/core';
import {Match, MatchResult, UnionMatchResult} from './match';
import {RuleLoader} from './rule-loader.service';
import {Context} from './context';
import {DeferredOperationChain, DynamicPropertyValue} from './property-value';
import {Rule, Selector} from './rule';

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
export class Meta
{
    static readonly KeyAny: string = '*';
    static readonly KeyDeclare: string = 'declare';
    static readonly KeyTrait: string = 'trait';

    static readonly LowRulePriority: number = -100000;
    static readonly SystemRulePriority: number = -200000;
    static readonly ClassRulePriority: number = -100000;
    static readonly TemplateRulePriority: number = 100000;
    static readonly EditorRulePriority: number = 200000;

    static readonly MaxKeyDatas: number = 64;
    static readonly NullMarker: any = {markernull: true};

    static readonly ScopeKey: string = 'scopeKey';
    static readonly DeclRule: string = 'declRule';

    /**
     *
     * PartialIndexing indexes each rule by a single (well chosen) key and evaluates other parts of
     * the selector on the index-filtered matches (generally this is a  win since may selectors are
     * not selective, resulting in huge rule vectors)
     *
     */
    static _UsePartialIndexing: boolean = true;
    static _DebugDoubleCheckMatches: boolean = false;

    static PropertyMerger_DeclareList: any = null;
    static PropertyMerger_Traits: any = null;
    static PropertyMerger_List: any = null;
    static Transformer_KeyPresent: any = null;


    _rules: Rule[] = new Array<Rule>();
    _ruleCount: number = 0;
    _testRules: Map<string, any> = new Map<string, any>();

    protected _currentRuleSet: RuleSet;
    private _nextKeyId: number = 0;
    private _ruleSetGeneration: number = 0;

    private _keyData: Map<string, KeyData> = new Map<string, KeyData>();

    private _keyDatasById: KeyData[] = new Array<KeyData>(Meta.MaxKeyDatas);
    private _MatchToPropsCache: Collections.Dictionary<Match, PropertyMap> =
        new Collections.Dictionary<Match, PropertyMap>();
    private _PropertyMapUniquer: Collections.Dictionary<PropertyMap, PropertyMap> =
        new Collections.Dictionary<PropertyMap, PropertyMap>();

    private _identityCache = new Collections.Dictionary<any, any>();
    private _managerForProperty: Map<string, PropertyManager> = new Map<string, PropertyManager>();


    private _declareKeyMask: number = 0;

    protected _ruleLoader: RuleLoader;
    protected _currentContext: Context;


    /*
     A few handy utilities (for which we probably already have superior versions elsewhere)
     */
    static booleanValue(value: any): boolean
    {
        return BooleanWrapper.boleanValue(value);
    }

    static toList(value: any): Array<any>
    {
        return (isArray(value)) ? value : [value];
    }

    static objectEquals(one: any, two: any)
    {
        if (isBlank(one) && isBlank(two)) {
            return true;
        }
        if (isBlank(one) || isBlank(two)) {
            return false;
        }
        return equals(one, two);
    }

    static overrideKeyForKey(key: string): string
    {
        return key + '_o';
    }

    static addTraits(traits: string[], map: Map<string, any>): void
    {
        let current: string[] = map.get(Meta.KeyTrait);
        if (isBlank(current)) {
            map.set(Meta.KeyTrait, traits);

        } else {
            ListWrapper.addAll(current, traits);
            map.set(Meta.KeyTrait, current);
        }
    }

    static addTrait(trait: string, map: Map<string, any>): void
    {
        let current: string[] = map.get(Meta.KeyTrait);
        if (isBlank(current)) {
            map.set(Meta.KeyTrait, Meta.toList(trait));
        } else {
            current.push(trait);
            map.set(Meta.KeyTrait, current);
        }
    }


    static className(object: any): string
    {
        if (isStringMap(object) && (isEntity(object) || isValue(object))) {
            return (<CompositeType>object).className();

        } else if (isFunction(object)) {
            return object.name;
        }
        return object;
    }

    constructor()
    {
        Meta.PropertyMerger_DeclareList = new PropertyMergerDeclareList();
        Meta.PropertyMerger_Traits = new PropertyMergerDeclareListForTrait();
        Meta.PropertyMerger_List = new PropertyMerger_List();
        Meta.Transformer_KeyPresent = new KeyValueTransformer_KeyPresent();


        this._declareKeyMask = this.keyData(Meta.KeyDeclare).maskValue();
        this.registerPropertyMerger(Meta.KeyTrait, Meta.PropertyMerger_Traits);


        let nooprule: Rule = new Rule(null, null, 0, 0);
        nooprule.disable();
        this._rules[0] = nooprule;
        this._ruleCount = 1;
    }

    registerLoader(loader: RuleLoader): void
    {
        this._ruleLoader = loader;
    }

    addRule(rule: Rule): void
    {

        let selectors: Array<Selector> = rule.selectors;

        if (selectors.length > 0 && selectors[selectors.length - 1].isDecl) {
            let decl = rule.createDecl();
            this._addRule(decl, true);
        }

        // we allow null to enable creation of a decl, but otherwise this rule has no effect
        if (isPresent(rule.properties)) {
            // After we've captured the decl, do the collapse
            rule._selectors = rule.convertKeyOverrides(rule._selectors);
            this._addRule(rule, true);
        }

    }

    _addToRules(rule: Rule, pos: number): void
    {
        this._rules[pos] = rule;
    }


    // todo: TEST unit test this
    _addRule(rule: Rule, checkPropScope: boolean): void
    {
        assert(isPresent(this._currentRuleSet), 'Attempt to add rule without current RuleSet');
        let selectors: Array<Selector> = rule._selectors;

        let entryId: number = this._currentRuleSet.allocateNextRuleEntry();
        rule.id = entryId;
        if (rule.rank === 0) {
            rule.rank = this._currentRuleSet._rank++;
        }
        rule.ruleSet = this._currentRuleSet;
        this._addToRules(rule, entryId);

        // index it
        let lastScopeKeyData: KeyData;
        let declKey: string;
        let declMask: number = this.declareKeyMask;
        let matchMask = 0, indexedMask = 0, antiMask = 0;
        let count = selectors.length;

        let indexOnlySelector: Selector = Meta._UsePartialIndexing ? this.bestSelectorToIndex(
            selectors) : null;
        for (let i = count - 1; i >= 0; i--) {
            let p: Selector = selectors[i];

            let shouldIndex: boolean = (indexOnlySelector === null || p === indexOnlySelector);

            let data: KeyData = this.keyData(p.key);
            let dataMask: number = data.maskValue();
            if (!this.isNullMarker(p.value)) {
                if (shouldIndex || Meta._DebugDoubleCheckMatches) {
                    if (isArray(p.value)) {
                        for (let v of p.value) {
                            data.addEntry(v, entryId);
                        }

                    } else {
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
            } else {
                antiMask |= dataMask;
            }
        }
        let isDecl: boolean = isPresent(declKey);
        let nonScopeKeyDecl: boolean = isPresent(declKey) && !this.keyData(declKey).isPropertyScope;
        if (!isDecl || nonScopeKeyDecl) {

            // all non-decl rules don't apply outside decl context
            if (!isDecl) {
                antiMask |= declMask;
            }

            if (isPresent(lastScopeKeyData) && checkPropScope) {
                let traitVal = rule.properties.get(Meta.KeyTrait);


                if (isPresent(traitVal)) {
                    let traitKey: string = lastScopeKeyData._key + '_trait';

                    let properties = MapWrapper.createEmpty<string, any>();
                    properties.set(traitKey, traitVal);

                    let traitRule: Rule = new Rule(rule._selectors, properties, rule.rank,
                        rule.lineNumber);

                    this._addRule(traitRule, false);
                }

                rule._selectors = selectors.slice(0);

                let scopeSel: Selector = new Selector(Meta.ScopeKey, lastScopeKeyData.key);
                rule.selectors.push(scopeSel);

                let data: KeyData = this.keyData(Meta.ScopeKey);

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

    bestSelectorToIndex(selectors: Array<Selector>): Selector
    {
        let best: Selector;
        let bestRank = Number.MIN_VALUE;
        let pos = 0;
        for (let sel of  selectors) {
            let rank = this.selectivityRank(sel) + pos++;
            if (rank > bestRank) {
                best = sel;
                bestRank = rank;
            }
        }
        return best;
    }

    selectivityRank(selector: Selector): number
    {
        // Score selectors: good if property scope, key !== '*' or bool
        // '*' is particularly bad, since these are inherited by all others
        let score = 1;
        let value = selector.value;

        if (isPresent(value) && !(Meta.KeyAny === value)) {
            score += (isBoolean(value) ? 1 : 9);
        }

        let keyData: KeyData = this.keyData(selector.key);
        if (keyData.isPropertyScope) {
            score *= 5;
        }
        // Todo: we could score based on # of entries in KeyData
        return score;
    }


    /**
     * if addition of this rule results in addition of extra rules, those are returned
     * (null otherwise)
     */
    _editingRuleEnd(): number
    {
        return Math.max(this._currentRuleSet.end, this._ruleCount);
    }


    _addRuleAndReturnExtras(rule: Rule): Array<Rule>
    {
        let start = this._editingRuleEnd();
        let extras: Array<Rule>;

        this.addRule(rule);

        // Return any extra rules created by addition of this one
        for (let i = start, c = this._editingRuleEnd(); i < c; i++) {
            let r = this._rules[i];
            if (r !== rule) {
                if (isBlank(extras)) {
                    extras = new Array<Rule>();
                }
                extras.push(r);
            }
        }
        return extras;
    }

    // Icky method to replace an exited rule in place
    _updateEditedRule(rule: Rule, extras: Array<Rule>): Array<Rule>
    {
        // in place replace existing rule with NoOp
        let nooprule: Rule = new Rule(null, null, 0, 0);
        nooprule.disable();

        this._rules[rule.id] = nooprule;

        if (isPresent(extras)) {
            for (let r of extras) {
                r.disable();
            }
        }

        // Since this rule has already been mutated (the first time it was added) we need to
        // reverse the addition of the scopeKey
        let preds = rule.selectors;

        if ((isPresent(preds) && preds.length > 0) && ListWrapper.last<Selector>(
                preds).key === Meta.ScopeKey) {
            ListWrapper.removeAt<Selector>(preds, preds.length);
        }

        // now (re)-add it and invalidate
        extras = this._addRuleAndReturnExtras(rule);
        this.invalidateRules();
        return extras;
    }


    scopeKeyForSelector(preds: Array<Selector>): string
    {
        for (let i = preds.length - 1; i >= 0; i--) {
            let pred = preds[i];
            let data = this.keyData(pred.key);
            if (data.isPropertyScope) {
                return pred.key;
            }
        }
        return null;
    }


    addRuleFromSelectorMap(selectorMap: Map<string, any>, propertyMap: Map<string, any>): void
    {
        this.addRuleFromSelectorMapWithRank(selectorMap, propertyMap, 0);
    }

    addRuleFromSelectorMapWithRank(selectorMap: Map<string, any>, propertyMap: Map<string, any>,
                                   rank: number): void
    {
        let rule = new Rule(Selector.fromMap(selectorMap), propertyMap, 0, -1);
        if (rank !== 0) {
            rule.rank = rank;
        }
        this.addRule(rule);
    }


    addRules(ruleSet: Map<string, any>, selectors: Array<Selector>)
    {
        // Special keys:  'props, 'rules'.  Everthing else is a selector
        let props: Map<string, any>;
        let rules: Array<Map<string, any>>;

        MapWrapper.iterable(ruleSet).forEach((value, key) => {
            if (key === 'props') {
                props = value;

            } else if (key === 'rules') {
                rules = value;
            } else {
                selectors.push(new Selector(key, value));
            }
        });

        if (isPresent(props)) {
            this.addRule(new Rule(selectors, props, 0));
        }
        if (isPresent(rules)) {
            for (let r of rules) {
                this.addRules(r, selectors);
            }
        }
    }

    // this one expect that we already opened the ruleset
    _loadRules(ruleText?: any, module: string = 'system',
               editable: boolean = true): void
    {
        try {

            if (isPresent(this._ruleLoader)) {
                this._ruleLoader.loadRules(this, ruleText, module, (rule) => this.addRule(rule));
            }
        } catch (e) {
            this.endRuleSet().disableRules();
            throw new Error('Error loading rule: ' + e);
        }
    }


    loadRules(ruleText?: any): void
    {
        this._loadRulesWithRuleSet('StringLiteral', ruleText, 0);
        this.endRuleSet();
    }


    _loadRulesWithRuleSet(filename: string, ruleText: any, rank: number): void
    {
        this.beginRuleSetWithRank(rank, filename);
        try {
            this._loadRules(ruleText);

        } catch (e) {
            this.endRuleSet().disableRules();
            throw new Error('Error loading rule: ' + e);
        }
    }


    loadUserRule(source: any, userClass: string): boolean
    {
        return unimplemented();
    }

    parsePropertyAssignment(propString: string, propertyMap: Map<string, any>): string
    {
        // todo: implement this
        return unimplemented();
    }


    clearCaches(): void
    {
        this._MatchToPropsCache = new Collections.Dictionary<Match, PropertyMap>();
        this._PropertyMapUniquer = new Collections.Dictionary<PropertyMap, PropertyMap>();
        this._identityCache = new Collections.Dictionary<any, any>();
    }


    isTraitExportRule(rule: Rule): boolean
    {
        if (isBlank(rule.properties) || rule || rule.properties.size === 1) {

            let key: string = Array.from(rule.properties.keys())[0];
            return StringWrapper.endsWidth(key, '_trait');
        }
        return false;
    }

    beginRuleSet(identificator: string): void
    {
        this.beginRuleSetWithRank(this._ruleCount, identificator);
    }


    beginRuleSetWithRank(rank: number, filePath: string): void
    {
        try {
            assert(isBlank(this._currentRuleSet),
                'Can t start new rule set while one in progress');

            this._currentRuleSet = new RuleSet(this);
            this._currentRuleSet._start = this._ruleCount;
            this._currentRuleSet._end = this._ruleCount;
            this._currentRuleSet._rank = rank;
            this._currentRuleSet._filePath = filePath;
        } catch (e) {

            throw e;
        }
    }

    beginReplacementRuleSet(orig: RuleSet): void
    {
        let origRank = orig.startRank();
        this.beginRuleSetWithRank(this._ruleCount, orig._filePath);
        this._currentRuleSet._rank = origRank;
    }


    endRuleSet(): RuleSet
    {
        assert(isPresent(this._currentRuleSet), 'No rule set progress');
        let result: RuleSet = this._currentRuleSet;
        if (this._ruleCount < result._end) {
            this._ruleCount = result._end;
        }
        this._currentRuleSet = null;
        this._ruleSetGeneration++;

        return result;
    }


    get ruleSetGeneration(): number
    {
        return this._ruleSetGeneration;
    }

    invalidateRules(): void
    {
        this._ruleSetGeneration++;
        this.clearCaches();
    }


    get currentContext(): Context
    {
        return this._currentContext;
    }

    newContext(): Context
    {
        this._currentContext = new Context(this);
        return this._currentContext;
    }

    get declareKeyMask(): number
    {
        return this._declareKeyMask;
    }


    // Touch a key/value to force pre-loading/registration of associated rule files
    touch(key: string, value: any): void
    {
        let context = this.newContext();
        context.push();
        context.set(key, value);
        context.allProperties();
        context.pop();
    }


    transformValue(key: string, value: any): any
    {
        let keyData = this._keyData.get(key);
        if (isPresent(keyData) && isPresent(keyData._transformer)) {
            value = keyData._transformer.tranformForMatch(value);
        }
        return value;
    }

    match(key: string, value: any, intermediateResult: MatchResult): MatchResult
    {
        let keyData = this._keyData.get(key);
        if (isBlank(keyData)) {
            return intermediateResult;
        }
        let keyMask: number = shiftLeft(1, keyData._id);

        // Does our result already include this key?  Then no need to join again
        // if (intermediateResult !== null && (intermediateResult._keysMatchedMask & keyMask) !==
        // 0) return intermediateResult;

        return new MatchResult(this, keyData, value, intermediateResult);
    }


    unionOverrideMatch(key: string, value: any,
                       intermediateResult: UnionMatchResult): UnionMatchResult
    {
        let keyData: KeyData = this._keyData.get(Meta.overrideKeyForKey(key));
        if (isBlank(keyData)) {
            return intermediateResult;
        }
        return new UnionMatchResult(this, keyData, value, intermediateResult);
    }

    newPropertiesMap(): PropertyMap
    {
        return new PropertyMap();
    }

    propertiesForMatch(matchResult: MatchResult): PropertyMap
    {
        let properties: PropertyMap = this._MatchToPropsCache.getValue(matchResult);
        if (isPresent(properties)) {
            return properties;
        }

        properties = this.newPropertiesMap();

        let arr: number[] = matchResult.filteredMatches();
        if (isBlank(arr)) {
            return properties;
        }

        // first entry is count
        let count: number = arr[0];
        let rules: Array<Rule> = new Array<Rule>(count);

        for (let i = 0; i < count; i++) {
            rules[i] = this._rules[arr[i + 1]];
        }

        ListWrapper.sort<Rule>(rules, (o1, o2) => o1.rank - o2.rank);

        let modifiedMask = 0;
        let declareKey: string = ((this._declareKeyMask & matchResult.keysMatchedMask) !== 0)
            ? matchResult.valueForKey(Meta.KeyDeclare) : null;


        for (let r in rules) {
            modifiedMask |= rules[r].apply(this, properties, declareKey);
        }

        properties.awakeProperties();
        this._MatchToPropsCache.setValue(matchResult.immutableCopy(), properties);
        return properties;
    }


    keyData(key: string): KeyData
    {
        let data: KeyData = this._keyData.get(key);

        if (isBlank(data)) {
            let id: number = this._nextKeyId;

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


    _keysInMask(mask: number): string[]
    {
        let matches: string[] = [];
        let pos = 0;
        while (mask !== 0) {
            if ((mask & 1) !== 0) {
                matches.push(this._keyDatasById[pos]._key);
            }
            pos++;
            mask = shiftRight(mask, 1);
        }
        return matches;
    }

    registerKeyInitObserver(key: string, o: ValueQueriedObserver): void
    {
        this.keyData(key).addObserver(o);
    }

    registerValueTransformerForKey(key: string, transformer: KeyValueTransformer): void
    {
        this.keyData(key)._transformer = transformer;
    }


    get identityCache(): Collections.Dictionary<any, any>
    {
        return this._identityCache;
    }


    newMatchArray(): MatchValue[]
    {
        return [];
    }

    matchArrayAssign(array: MatchValue[], keyData: KeyData, matchValue: MatchValue): void
    {
        let idx = keyData._id;
        let curr = array[idx];
        if (isPresent(curr)) {
            matchValue = curr.updateByAdding(matchValue);
        }
        array[idx] = matchValue;
    }


    propertyWillDoMerge(propertyName: string, origValue: any): boolean
    {
        let merger: PropertyMerger = this.mergerForProperty(propertyName);

        return this.isPropertyMergerIsChaining(merger) || (isPresent(
            origValue) && (origValue instanceof Map));
    }


    managerForProperty(name: string): PropertyManager
    {
        let manager: PropertyManager = this._managerForProperty.get(name);
        if (isBlank(manager)) {
            manager = new PropertyManager(name);
            this._managerForProperty.set(name, manager);
        }
        return manager;
    }


    mirrorPropertyToContext(propertyName: string, contextKey: string): void
    {
        let keyData = this.keyData(contextKey);
        let manager = this.managerForProperty(propertyName);
        manager._keyDataToSet = keyData;
    }


    defineKeyAsPropertyScope(contextKey: string): void
    {
        let keyData: KeyData = this.keyData(contextKey);
        keyData.isPropertyScope = true;

        let traitKey: string = contextKey + '_trait';
        this.mirrorPropertyToContext(traitKey, traitKey);
        this.registerPropertyMerger(traitKey, Meta.PropertyMerger_DeclareList);
    }

    isPropertyScopeKey(key: string): boolean
    {
        return Meta.ScopeKey === key;
    }

    registerPropertyMerger(propertyName: string, merger: PropertyMerger): void
    {
        if (isBlank(merger._meta)) {
            merger._meta = this;
        }
        let manager: PropertyManager = this.managerForProperty(propertyName);
        manager._merger = merger;
    }

    mergerForProperty(propertyName: string): PropertyMerger
    {
        let manager: PropertyManager = this.managerForProperty(propertyName);
        return manager._merger;
    }

    private isPropertyMergerIsChaining(val: any): val is PropertyMergerIsChaining
    {
        return isPresent(val.isPropMergerIsChainingMark) && val.isPropMergerIsChainingMark;
    }


    groupForTrait(trait: string): string
    {
        return 'default';
    }

    _logRuleStats(): void
    {
        let total = 0;

        let values = this._keyData.keys();

        let counts: any[] = [];

        for (const id of Array.from(values)) {
            let keyData = this._keyData.get(id);
            let valuess = keyData.ruleVecs.values();

            for (let vm  of valuess) {
                let kvc = new KeyValueCount(keyData._key, (<any>vm)['_value'], isPresent(
                    vm._arr) ? vm._arr[0] : 0);

                total += kvc.count;
                counts.push(kvc);
            }
        }
        ListWrapper.sort<KeyValueCount>(counts, (o1, o2) => o2.count - o1.count);

        let buf = new StringJoiner([]);
        let c = Math.min(10, counts.length);

        buf.add('Total index entries comparisons performed: ' + Match._Debug_ElementProcessCount);
        buf.add('\nTotal index entries: ' + total);
        buf.add('\nTop  keys/values: ' + c);


        for (let i = 0; i < c; i++) {
            let kvc = counts[i];

            buf.add('     ' + kvc.key + '  = ' + kvc.value + ' : ' + kvc.count + ' entries');
            buf.add('\n');
        }
        print(buf.toString());
    }

    toString(): string
    {
        return 'Meta';
    }


    isNullMarker(value: any): boolean
    {
        return isPresent(value) && value['markernull'];
    }


    addTestUserRule(testRuleName: string, source: any)
    {
        this._testRules.set(testRuleName, source);
    }


}


export class KeyValueCount
{

    constructor(public key: string, public value: any, public count: number)
    {
    }
}

/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
export class PropertyManager
{
    _merger: PropertyMerger;
    _keyDataToSet: KeyData;


    constructor(public _name: string)
    {
    }


    mergeProperty(propertyName: string, orig: any, newValue: any, isDeclare: boolean): any
    {
        if (isBlank(orig)) {
            return newValue;
        }

        if (newValue instanceof OverrideValue) {
            return (<OverrideValue> newValue).value();
        }

        if (isBlank(this._merger)) {
            // Perhaps should have a data-type-based merger registry?
            if (orig instanceof Map) {
                if (isPresent(newValue) && newValue instanceof Map) {
                    // merge maps
                    // todo: TEST check outcome of the merge and compare
                    let origClone = MapWrapper.clone<string, any>(orig);
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

/**
 * Wrapper for a value that should, in rule application, override any previous value for its
 * property.  This can be used to override default property value merge policy, for instance
 * allowing the 'visible' property to be forced from false to true.
 */
export class OverrideValue
{
    constructor(private _value: any)
    {
    }

    value(): any
    {
        return this._value === 'null' ? null : this._value;
    }

    toString(): string
    {
        return isPresent(this._value) ? this._value.toString() + '!' : 'null' + '!';
    }
}


/**
 * KeyData is the primary structure for representing information about context keys
 * (e.g. 'class', 'layout', 'operation', 'field', ...), including an index of rules
 * that match on particular values of that key (_ValueMatches).
 *
 * Note that every context key has a small integer ID (0-63) and these are uses in
 * (long) masks for certain rule matching operations.
 */

export class KeyData
{
    private _ruleVecs: Collections.Dictionary<any, ValueMatches>;
    private _observers: Array<ValueQueriedObserver>;

    private _any: ValueMatches;
    _transformer: KeyValueTransformer;

    private _isPropertyScope: boolean = false;


    constructor(public _key: string, public _id: number)
    {
        this._ruleVecs = new Collections.Dictionary<any, ValueMatches>();
        this._any = this.get(Meta.KeyAny);

    }

    maskValue(): number
    {
        return shiftLeft(1, this._id);
    }

    private get(value: any): ValueMatches
    {
        if (isBlank(value)) {
            value = Meta.NullMarker;

        } else if (isPresent(this._transformer)) {
            value = this._transformer.tranformForMatch(value);
        }
        let matches: ValueMatches = this._ruleVecs.getValue(value);

        if (isBlank(matches)) {
            matches = new ValueMatches(value);

            if (isPresent(value) && !BooleanWrapper.isFalse(value)) {
                matches._parent = this._any;
            }
            this._ruleVecs.setValue(value, matches);
        }
        return matches;
    }

    matchValue(value: any): MatchValue
    {
        if (isArray(value)) {
            let list = value;
            if (list.length === 1) {
                return this.get(list[0]);
            }
            let multi: MultiMatchValue = new MultiMatchValue();

            ListWrapper.forEachWithIndex(list, (v, i) => {
                multi.data.push(this.get(v));
            });
            return multi;
        } else {
            return this.get(value);
        }
    }


    addEntry(value: any, id: number): void
    {
        let matches: ValueMatches = this.get(value);
        let before: number[] = matches._arr;
        let after: number[] = Match.addInt(before, id);
        if (before !== after) {
            matches._arr = after;
        }
    }


    lookup(owner: Meta, value: any): number[]
    {
        let matches: ValueMatches = this.get(value);
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
            } finally {

            }
        }
        // check if parent has changed and need to union in parent data
        matches.checkParent();
        return matches._arr;
    }


    setParent(value: any, parentValue: any): void
    {
        let parent: ValueMatches = this.get(parentValue);
        let child: ValueMatches = this.get(value);
        child._parent = parent;
    }


    parent(value: any): any
    {
        let child: ValueMatches = this.get(value);
        return child._parent._value;
    }


    addObserver(o: ValueQueriedObserver): void
    {
        if (isBlank(this._observers)) {
            this._observers = new Array<ValueQueriedObserver>();
        }
        this._observers.push(o);
    }


    // If this key defines a scope for properties (e.g. field, class, action)
    // this this returns the name of the selector key for those properties
    // (e.g. field_p, class_p)
    get isPropertyScope(): boolean
    {
        return this._isPropertyScope;
    }

    set isPropertyScope(yn: boolean)
    {
        this._isPropertyScope = yn;
    }


    get ruleVecs(): Collections.Dictionary<any, ValueMatches>
    {
        return this._ruleVecs;
    }

    get key(): string
    {
        return this._key;
    }

    get id(): number
    {
        return this._id;
    }


    get observers(): Array<ValueQueriedObserver>
    {
        return this._observers;
    }
}


/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
export class PropertyMap implements Map<string, any>
{

    private _contextPropertiesUpdated: Array<PropertyManager>;
    protected _map: Map<string, any>;

    [Symbol.toStringTag]: 'Map';


    constructor(entries?: Map<string, any>)
    {
        if (isPresent(entries)) {
            this._map = new Map<string, any>(entries);
        } else {
            this._map = new Map<string, any>();
        }
    }


    get(key: string): any
    {
        return this._map.get(key);
    }


    keys(): IterableIterator<string>
    {
        return this._map.keys();
    }


    values(): IterableIterator<any>
    {
        return this._map.values();
    }

    clear(): void
    {
        this._map.clear();
    }

    set(key: string, value?: any): any
    {
        return this._map.set(key, value);
    }


    delete(key: string): boolean
    {

        return this._map.delete(key);
    }

    forEach(callbackfn: (value: any, index: string, map: Map<string, any>) => void,
            thisArg?: any): void
    {
        this._map.forEach(callbackfn);
    }


    has(key: string): boolean
    {
        return this._map.has(key);
    }


    [Symbol.iterator](): IterableIterator<any>
    {
        return this._map[Symbol.iterator]();
    }


    entries(): IterableIterator<any>
    {
        return this._map.entries();
    }


    get size(): number
    {
        return this._map.size;
    }


    awakeProperties(): void
    {
        MapWrapper.iterable(this).forEach((value, key) => {
            if (isPropertyMapAwaking(value)) {
                let newValue = value.awakeForPropertyMap(this);
                if (newValue !== value) {
                    this.set(key, newValue);
                }
            }
        });
    }

    addContextKey(key: PropertyManager): void
    {
        if (isBlank(this._contextPropertiesUpdated)) {
            this._contextPropertiesUpdated = new Array<PropertyManager>();
        }
        this._contextPropertiesUpdated.push(key);
    }


    get contextKeysUpdated(): Array<PropertyManager>
    {
        return this._contextPropertiesUpdated;
    }

    toString()
    {
        // todo: find better way for the string. thsi is also used as key for the dictionary
        // not really efficient
        let sj = new StringJoiner(['PropertyMap:']);
        sj.add(this.size + ',');
        MapWrapper.iterable(this).forEach((value, key) => {
            if (isPropertyMapAwaking(value)) {
                let newValue = value.awakeForPropertyMap(this);
                if (newValue !== value) {
                    sj.add(key + ':' + value);
                    sj.add(', ');
                }
            }
        });
        return sj.toString();
    }
}


// Marker interface
export interface PropertyMergerIsChaining
{
    isPropMergerIsChainingMark: boolean;

}

/**
 * Define policy for merging a property value assigned by one rule
 * to a subsequent value from a higher ranked rule.
 */
export interface PropertyMerger
{

    _meta: Meta;

    /**
     * Called during rule application to merge an earlier (lower ranked) value with a newer one.
     * @param orig the previous value accumulated in the property map
     * @param override the new value from the higher ranked rule
     * @param isDeclare whether we are currently accumulating matched for declarations of the
     *     property/value
     * @return the new property value to be put in the property map
     */
    merge (orig: any, override: any, isDeclare: boolean): any;

    toString(): string;
}

// marker interface for PropertyMerges that can handle dynamic values
export abstract class PropertyMergerDynamic implements PropertyMerger
{
    _meta: Meta;

    merge(orig: any, override: any, isDeclare: boolean): any
    {
        return unimplemented();
    }

    toString(): string
    {
        return 'PropertyMergerDynamic';
    }
}


export class PropertyMerger_Overwrite implements PropertyMerger
{
    _meta: Meta;

    merge(orig: any, override: any, isDeclare: boolean): any
    {
        return override;
    }

    toString(): string
    {
        return 'OVERWRITE';
    }
}

/**
 PropertyMerger for properties the should be unioned as lists
 */
export class PropertyMerger_List implements PropertyMerger
{
    _meta: Meta;

    merge(orig: any, override: any, isDeclare: boolean): any
    {
        if (!(isArray(orig)) && !(isArray(override)) && Meta.objectEquals(orig, override)) {
            return orig;
        }
        let l1 = Meta.toList(orig);
        let l2 = Meta.toList(override);

        let result = ListWrapper.clone(l1);

        ListWrapper.addElementsIfAbsent(result, l2);
        return result;
    }
}


/**
 * PropertyMerger for properties the should override normally, but return lists when
 * in declare mode (e.g. 'class', 'field', 'layout', ...)
 */
export class PropertyMergerDeclareList extends PropertyMergerDynamic
{

    constructor()
    {
        super();
    }

    merge(orig: any, override: any, isDeclare: boolean): any
    {
        if (!isDeclare) {
            return override;
        }

        if (!(isArray(orig)) && !(isArray(override)) && Meta.objectEquals(orig, override)) {
            return orig;
        }

        let result: any[] = [];
        ListWrapper.addElementsIfAbsent(result, Meta.toList(orig));
        ListWrapper.addElementsIfAbsent(result, Meta.toList(override));

        return result;
    }

    toString(): string
    {
        return 'PropertyMergerDeclareList';
    }
}

/**
 * PropertyMerger for the 'trait' property.  Generally, traits are unioned, except for traits
 * from the same 'traitGroup', which override (i.e. only one trait from each traitGroup should
 * survive).
 */
export class PropertyMergerDeclareListForTrait extends PropertyMergerDeclareList
{

    _meta: Meta;


    constructor()
    {
        super();
    }

    merge(orig: any, override: any, isDeclare: boolean): any
    {
        if (isDeclare) {
            return super.merge(orig, override, isDeclare);
        }

        // if we're override a single element with itself, don't go List...
        if (!isArray(orig) && !isArray(override) && Meta.objectEquals(orig, override)) {
            return orig;
        }
        let origL = Meta.toList(orig);
        let overrideL = Meta.toList(override);
        let result: any[] = [];
        for (let trait of origL) {
            if (trait instanceof OverrideValue) {
                trait = (<OverrideValue> trait).value();
            }

            let canAdd = true;
            let group = this._meta.groupForTrait(trait);

            if (isPresent(group)) {

                for (let overrideTrait of overrideL) {
                    if (overrideTrait instanceof OverrideValue) {
                        overrideTrait = (<OverrideValue>overrideTrait).value();
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


    toString(): string
    {
        return 'PropertyMergerDeclareListForTrait';
    }
}


/**
 * PropertyMerger implementing AND semantics -- i.e. false trumps true.
 * (Used, for instance, for the properties 'visible' and 'editable')
 */
export class PropertyMerger_And extends PropertyMergerDynamic implements PropertyMergerIsChaining
{
    isPropMergerIsChainingMark: boolean = true;


    merge(orig: any, override: any, isDeclare: boolean): any
    {
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
                : BooleanWrapper.boleanValue(
                    override);
        }

        if (isBoolean(override) && BooleanWrapper.boleanValue(override)) {
            return (orig instanceof DynamicPropertyValue) ? orig : BooleanWrapper.boleanValue(
                override);
        }

        // if one of our values is dynamic, defer
        if ((orig instanceof DynamicPropertyValue || override instanceof DynamicPropertyValue)) {
            return new DeferredOperationChain(this, orig, override);
        }
        return BooleanWrapper.boleanValue(orig) && BooleanWrapper.boleanValue(override);
    }

    toString(): string
    {
        return 'AND';
    }
}


export class PropertyMerger_Valid implements PropertyMerger,
    PropertyMergerIsChaining
{
    _meta: Meta;
    isPropMergerIsChainingMark: boolean = true;

    merge(orig: any, override: any, isDeclare: boolean): any
    {
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

    toString(): string
    {
        return 'VALIDATE';
    }
}


/**
 * A group of rules originating from a common source.
 * All rules must be added to the rule base as part of a RuleSet.
 */
export class RuleSet
{

    _filePath: string;
    _start: number = 0;
    _end: number = 0;
    _editableStart: number = -1;

    _rank: number = 0;


    constructor(private _meta: Meta)
    {
    }

    disableRules(): void
    {
        for (let i = this._start; i < this._end; i++) {
            this._meta._rules[i].disable();
        }
        this._meta.clearCaches();

    }


    get filePath(): string
    {
        return this._filePath;
    }

    rules(editableOnly: any): Array<Rule>
    {
        let result: Array<Rule> = [];
        let i = (editableOnly) ? (this._editableStart === -1 ? this._end : this._editableStart)
            : this._start;
        for (; i < this._end; i++) {
            let r = this._meta._rules[i];
            if (!r.disabled() && !this._meta.isTraitExportRule(r)) {
                result.push(r);
            }
        }
        return result;

    }

    startRank(): number
    {
        return (this._start < this._meta._ruleCount)
            ? this._meta._rules[this._start].rank
            : this._rank - (this._end - this._start);
    }

    allocateNextRuleEntry(): number
    {
        return (this._meta._ruleCount > this._end) ? this._meta._ruleCount++ : this._end++;
    }

    get start(): number
    {
        return this._start;
    }

    get end(): number
    {
        return this._end;
    }

    get editableStart(): number
    {
        return this._editableStart;
    }
}


/**
 * Abstraction for values (or sets of values) that can be matched against others
 * (in the context of Selector key/value) matching.  Subtypes take advantage of
 * the fact that ValueMatches instances globally uniquely represent key/value pairs
 * to enable efficient matching entirely through identity comparison.
 */

export interface MatchValue
{
    matches (other: MatchValue): boolean;

    updateByAdding (other: MatchValue): MatchValue;
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

export class ValueMatches implements MatchValue
{

    _value: any;
    _read: boolean = false;
    _arr: number[];

    _parent: ValueMatches;
    _parentSize: number = 0;


    constructor(value: any)
    {
        this._value = value;
    }

    checkParent()
    {
        // todo: performance: keep a rule set version # and only do this when the rule set has
        // reloaded

        if (isPresent(this._parent)) {
            this._parent.checkParent();

            let parentArr: number[] = this._parent._arr;

            if (isPresent(parentArr) && parentArr[0] !== this._parentSize) {
                this._arr = Match.union(this._arr, parentArr);
                this._parentSize = parentArr[0];
            }

        }
    }

    matches(other: MatchValue): boolean
    {
        if (!(other instanceof ValueMatches)) {
            return other.matches(this);
        }

        // we recurse up parent chain to do superclass matches
        return (other === this) || (isPresent(this._parent) && this._parent.matches(other));
    }

    updateByAdding(other: MatchValue): MatchValue
    {
        let multi: MultiMatchValue = new MultiMatchValue();
        multi.data.push(this);
        return multi.updateByAdding(other);
    }

}

// https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-
//  array-and-map-work
export class MultiMatchValue implements MatchValue
{

    data: Array<MatchValue> = [];


    matches(other: MatchValue): boolean
    {
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

    updateByAdding(other: MatchValue): MatchValue
    {
        if (other instanceof MultiMatchValue) {
            let matchValue: MultiMatchValue = <MultiMatchValue> other;
            ListWrapper.addAll(this.data, matchValue.data);
        } else {
            this.data.push(other);
        }
        return this;
    }
}


export interface ValueQueriedObserver
{

    notify (meta: Meta, key: string, value: any): void;

}


/**
 * Used to transform values into the (static) version they should be indexed / searched under
 * For instance, 'object' may be indexed as true/false (present or not)
 */
export interface KeyValueTransformer
{
    tranformForMatch (o: any): any;
}


export class KeyValueTransformer_KeyPresent implements KeyValueTransformer
{


    tranformForMatch(o: any): any
    {
        return (isPresent(o) && !(BooleanWrapper.isFalse(o))) ? true : false;
    }


}


/**
 * Called on implementing values to allow statically resolvable (but dynamic) values
 * to evaluate/copy themselves for inclusion in a new map (to ensure that a value that
 * derived its value based on a different context doesn't get reused in another)
 */
export interface PropertyMapAwaking
{
    propertyAwaking: boolean;

    awakeForPropertyMap (map: PropertyMap): any;
}


export function isPropertyMapAwaking(arg: any): arg is PropertyMapAwaking
{
    return isPresent(arg) && isPresent(arg.propertyAwaking);
}
