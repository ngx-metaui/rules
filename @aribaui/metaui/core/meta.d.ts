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
import * as Collections from 'typescript-collections';
import { MatchResult, UnionMatchResult } from './match';
import { RuleLoader } from './rule-loader.service';
import { Context } from './context';
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
export declare class Meta {
    static readonly KeyAny: string;
    static readonly KeyDeclare: string;
    static readonly KeyTrait: string;
    static readonly LowRulePriority: number;
    static readonly SystemRulePriority: number;
    static readonly ClassRulePriority: number;
    static readonly TemplateRulePriority: number;
    static readonly EditorRulePriority: number;
    static readonly MaxKeyDatas: number;
    static readonly NullMarker: any;
    static readonly ScopeKey: string;
    static readonly DeclRule: string;
    /**
     *
     * PartialIndexing indexes each rule by a single (well chosen) key and evaluates other parts of
     * the selector on the index-filtered matches (generally this is a  win since may selectors are
     * not selective, resulting in huge rule vectors)
     *
     */
    static _UsePartialIndexing: boolean;
    static _DebugDoubleCheckMatches: boolean;
    static PropertyMerger_DeclareList: any;
    static PropertyMerger_Traits: any;
    static PropertyMerger_List: any;
    static Transformer_KeyPresent: any;
    _rules: Rule[];
    _ruleCount: number;
    _testRules: Map<string, any>;
    protected _currentRuleSet: RuleSet;
    private _nextKeyId;
    private _ruleSetGeneration;
    private _keyData;
    private _keyDatasById;
    private _MatchToPropsCache;
    private _PropertyMapUniquer;
    private _identityCache;
    private _managerForProperty;
    private _declareKeyMask;
    protected _ruleLoader: RuleLoader;
    static booleanValue(value: any): boolean;
    static toList(value: any): Array<any>;
    static objectEquals(one: any, two: any): boolean;
    static overrideKeyForKey(key: string): string;
    static addTraits(traits: string[], map: Map<string, any>): void;
    static addTrait(trait: string, map: Map<string, any>): void;
    static className(object: any): string;
    constructor();
    registerLoader(loader: RuleLoader): void;
    addRule(rule: Rule): void;
    _addToRules(rule: Rule, pos: number): void;
    _addRule(rule: Rule, checkPropScope: boolean): void;
    bestSelectorToIndex(selectors: Array<Selector>): Selector;
    selectivityRank(selector: Selector): number;
    /**
     * if addition of this rule results in addition of extra rules, those are returned
     * (null otherwise)
     */
    _editingRuleEnd(): number;
    _addRuleAndReturnExtras(rule: Rule): Array<Rule>;
    _updateEditedRule(rule: Rule, extras: Array<Rule>): Array<Rule>;
    scopeKeyForSelector(preds: Array<Selector>): string;
    addRuleFromSelectorMap(selectorMap: Map<string, any>, propertyMap: Map<string, any>): void;
    addRuleFromSelectorMapWithRank(selectorMap: Map<string, any>, propertyMap: Map<string, any>, rank: number): void;
    addRules(ruleSet: Map<string, any>, selectors: Array<Selector>): void;
    _loadRules(ruleText?: any, module?: string, editable?: boolean): void;
    loadRules(ruleText?: any): void;
    _loadRulesWithRuleSet(filename: string, ruleText: any, rank: number): void;
    loadUserRule(source: any, userClass: string): boolean;
    parsePropertyAssignment(propString: string, propertyMap: Map<string, any>): string;
    clearCaches(): void;
    isTraitExportRule(rule: Rule): boolean;
    beginRuleSet(identificator: string): void;
    beginRuleSetWithRank(rank: number, filePath: string): void;
    beginReplacementRuleSet(orig: RuleSet): void;
    endRuleSet(): RuleSet;
    readonly ruleSetGeneration: number;
    invalidateRules(): void;
    newContext(): Context;
    readonly declareKeyMask: number;
    touch(key: string, value: any): void;
    transformValue(key: string, value: any): any;
    match(key: string, value: any, intermediateResult: MatchResult): MatchResult;
    unionOverrideMatch(key: string, value: any, intermediateResult: UnionMatchResult): UnionMatchResult;
    newPropertiesMap(): PropertyMap;
    propertiesForMatch(matchResult: MatchResult): PropertyMap;
    keyData(key: string): KeyData;
    _keysInMask(mask: number): string[];
    registerKeyInitObserver(key: string, o: ValueQueriedObserver): void;
    registerValueTransformerForKey(key: string, transformer: KeyValueTransformer): void;
    readonly identityCache: Collections.Dictionary<any, any>;
    newMatchArray(): MatchValue[];
    matchArrayAssign(array: MatchValue[], keyData: KeyData, matchValue: MatchValue): void;
    propertyWillDoMerge(propertyName: string, origValue: any): boolean;
    managerForProperty(name: string): PropertyManager;
    mirrorPropertyToContext(propertyName: string, contextKey: string): void;
    defineKeyAsPropertyScope(contextKey: string): void;
    isPropertyScopeKey(key: string): boolean;
    registerPropertyMerger(propertyName: string, merger: PropertyMerger): void;
    mergerForProperty(propertyName: string): PropertyMerger;
    private isPropertyMergerIsChaining(val);
    groupForTrait(trait: string): string;
    _logRuleStats(): void;
    toString(): string;
    isNullMarker(value: any): boolean;
    addTestUserRule(testRuleName: string, source: any): void;
}
export declare class KeyValueCount {
    key: string;
    value: any;
    count: number;
    constructor(key: string, value: any, count: number);
}
/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
export declare class PropertyManager {
    _name: string;
    _merger: PropertyMerger;
    _keyDataToSet: KeyData;
    constructor(_name: string);
    mergeProperty(propertyName: string, orig: any, newValue: any, isDeclare: boolean): any;
}
/**
 * Wrapper for a value that should, in rule application, override any previous value for its
 * property.  This can be used to override default property value merge policy, for instance
 * allowing the 'visible' property to be forced from false to true.
 */
export declare class OverrideValue {
    private _value;
    constructor(_value: any);
    value(): any;
    toString(): string;
}
/**
 * KeyData is the primary structure for representing information about context keys
 * (e.g. 'class', 'layout', 'operation', 'field', ...), including an index of rules
 * that match on particular values of that key (_ValueMatches).
 *
 * Note that every context key has a small integer ID (0-63) and these are uses in
 * (long) masks for certain rule matching operations.
 */
export declare class KeyData {
    _key: string;
    _id: number;
    private _ruleVecs;
    private _observers;
    private _any;
    _transformer: KeyValueTransformer;
    private _isPropertyScope;
    constructor(_key: string, _id: number);
    maskValue(): number;
    private get(value);
    matchValue(value: any): MatchValue;
    addEntry(value: any, id: number): void;
    lookup(owner: Meta, value: any): number[];
    setParent(value: any, parentValue: any): void;
    parent(value: any): any;
    addObserver(o: ValueQueriedObserver): void;
    isPropertyScope: boolean;
    readonly ruleVecs: Collections.Dictionary<any, ValueMatches>;
    readonly key: string;
    readonly id: number;
    readonly observers: Array<ValueQueriedObserver>;
}
/**
 * Store of policy information for particular properties -- most significantly, how
 * successive values of this property are to be *merged* during rule application.
 * (See Meta.registerPropertyMerger).  E.g. 'visible', 'trait', and 'valid' all have unique
 * merge policies.
 */
export declare class PropertyMap implements Map<string, any> {
    private _contextPropertiesUpdated;
    protected _map: Map<string, any>;
    [Symbol.toStringTag]: 'Map';
    constructor(entries?: Map<string, any>);
    get(key: string): any;
    keys(): IterableIterator<string>;
    values(): IterableIterator<any>;
    clear(): void;
    set(key: string, value?: any): any;
    delete(key: string): boolean;
    forEach(callbackfn: (value: any, index: string, map: Map<string, any>) => void, thisArg?: any): void;
    has(key: string): boolean;
    [Symbol.iterator](): IterableIterator<any>;
    entries(): IterableIterator<any>;
    readonly size: number;
    awakeProperties(): void;
    addContextKey(key: PropertyManager): void;
    readonly contextKeysUpdated: Array<PropertyManager>;
    toString(): string;
}
export interface PropertyMergerIsChaining {
    isPropMergerIsChainingMark: boolean;
}
/**
 * Define policy for merging a property value assigned by one rule
 * to a subsequent value from a higher ranked rule.
 */
export interface PropertyMerger {
    _meta: Meta;
    /**
     * Called during rule application to merge an earlier (lower ranked) value with a newer one.
     * @param orig the previous value accumulated in the property map
     * @param override the new value from the higher ranked rule
     * @param isDeclare whether we are currently accumulating matched for declarations of the
     *     property/value
     * @return the new property value to be put in the property map
     */
    merge(orig: any, override: any, isDeclare: boolean): any;
    toString(): string;
}
export declare abstract class PropertyMergerDynamic implements PropertyMerger {
    _meta: Meta;
    merge(orig: any, override: any, isDeclare: boolean): any;
    toString(): string;
}
export declare class PropertyMerger_Overwrite implements PropertyMerger {
    _meta: Meta;
    merge(orig: any, override: any, isDeclare: boolean): any;
    toString(): string;
}
/**
 PropertyMerger for properties the should be unioned as lists
 */
export declare class PropertyMerger_List implements PropertyMerger {
    _meta: Meta;
    merge(orig: any, override: any, isDeclare: boolean): any;
}
/**
 * PropertyMerger for properties the should override normally, but return lists when
 * in declare mode (e.g. 'class', 'field', 'layout', ...)
 */
export declare class PropertyMergerDeclareList extends PropertyMergerDynamic {
    constructor();
    merge(orig: any, override: any, isDeclare: boolean): any;
    toString(): string;
}
/**
 * PropertyMerger for the 'trait' property.  Generally, traits are unioned, except for traits
 * from the same 'traitGroup', which override (i.e. only one trait from each traitGroup should
 * survive).
 */
export declare class PropertyMergerDeclareListForTrait extends PropertyMergerDeclareList {
    _meta: Meta;
    constructor();
    merge(orig: any, override: any, isDeclare: boolean): any;
    toString(): string;
}
/**
 * PropertyMerger implementing AND semantics -- i.e. false trumps true.
 * (Used, for instance, for the properties 'visible' and 'editable')
 */
export declare class PropertyMerger_And extends PropertyMergerDynamic implements PropertyMergerIsChaining {
    isPropMergerIsChainingMark: boolean;
    merge(orig: any, override: any, isDeclare: boolean): any;
    toString(): string;
}
export declare class PropertyMerger_Valid implements PropertyMerger, PropertyMergerIsChaining {
    _meta: Meta;
    isPropMergerIsChainingMark: boolean;
    merge(orig: any, override: any, isDeclare: boolean): any;
    toString(): string;
}
/**
 * A group of rules originating from a common source.
 * All rules must be added to the rule base as part of a RuleSet.
 */
export declare class RuleSet {
    private _meta;
    _filePath: string;
    _start: number;
    _end: number;
    _editableStart: number;
    _rank: number;
    constructor(_meta: Meta);
    disableRules(): void;
    readonly filePath: string;
    rules(editableOnly: any): Array<Rule>;
    startRank(): number;
    allocateNextRuleEntry(): number;
    readonly start: number;
    readonly end: number;
    readonly editableStart: number;
}
/**
 * Abstraction for values (or sets of values) that can be matched against others
 * (in the context of Selector key/value) matching.  Subtypes take advantage of
 * the fact that ValueMatches instances globally uniquely represent key/value pairs
 * to enable efficient matching entirely through identity comparison.
 */
export interface MatchValue {
    matches(other: MatchValue): boolean;
    updateByAdding(other: MatchValue): MatchValue;
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
export declare class ValueMatches implements MatchValue {
    _value: any;
    _read: boolean;
    _arr: number[];
    _parent: ValueMatches;
    _parentSize: number;
    constructor(value: any);
    checkParent(): void;
    matches(other: MatchValue): boolean;
    updateByAdding(other: MatchValue): MatchValue;
}
export declare class MultiMatchValue implements MatchValue {
    data: Array<MatchValue>;
    matches(other: MatchValue): boolean;
    updateByAdding(other: MatchValue): MatchValue;
}
export interface ValueQueriedObserver {
    notify(meta: Meta, key: string, value: any): void;
}
/**
 * Used to transform values into the (static) version they should be indexed / searched under
 * For instance, 'object' may be indexed as true/false (present or not)
 */
export interface KeyValueTransformer {
    tranformForMatch(o: any): any;
}
export declare class KeyValueTransformer_KeyPresent implements KeyValueTransformer {
    tranformForMatch(o: any): any;
}
/**
 * Called on implementing values to allow statically resolvable (but dynamic) values
 * to evaluate/copy themselves for inclusion in a new map (to ensure that a value that
 * derived its value based on a different context doesn't get reused in another)
 */
export interface PropertyMapAwaking {
    propertyAwaking: boolean;
    awakeForPropertyMap(map: PropertyMap): any;
}
export declare function isPropertyMapAwaking(arg: any): arg is PropertyMapAwaking;
