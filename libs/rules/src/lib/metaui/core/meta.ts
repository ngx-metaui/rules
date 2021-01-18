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
import {ListWrapper, MapWrapper} from './utils/collection';
import {Match, MatchResult, MatchValue, UnionMatchResult} from './match';
import {Context} from './context';
import {Rule, RuleSet, Selector} from './rule';
import {
  assert,
  beautifyClassName,
  BooleanWrapper,
  className,
  isArray,
  isBlank,
  isBoolean,
  isPresent,
  print,
  shiftLeft,
  StringJoiner
} from './utils/lang';
import {
  KeyData,
  PropertyManager,
  PropertyMap,
  PropertyMerger,
  PropertyMerger_List,
  PropertyMergerDeclareList,
  PropertyMergerDeclareListForTrait
} from './policies/merging-policy';
import {
  _DebugDoubleCheckMatches,
  _UsePartialIndexing,
  KeyAny,
  KeyDeclare,
  KeyTrait,
  KeyValid,
  MaxKeyDatas,
  ModuleInfo,
  overrideKeyForKey,
  ScopeKey,
  ValueQueriedObserver
} from './constants';
import {ComponentRegistry} from './component-registry.service';
import {KeyValueTransformer, KeyValueTransformer_KeyPresent} from './tranformers';
import {ItemProperties} from './item-properties';
import {Injectable, OnDestroy, Type} from '@angular/core';
import {Route} from '@angular/router';
import {LocalizedString} from './i18n/localized-string';


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
@Injectable()
export abstract class Meta implements OnDestroy {

  /**
   *
   * PartialIndexing indexes each rule by a single (well chosen) key and evaluates other parts of
   * the selector on the index-filtered matches (generally this is a  win since may selectors are
   * not selective, resulting in huge rule vectors)
   *
   */

  readonly PropertyMerger_DeclareList;
  readonly PropertyMerger_List;
  readonly PropertyMerger_Traits;
  readonly Transformer_KeyPresent;


  rules: Rule[] = new Array<Rule>();
  ruleCount: number = 0;
  _testRules: Map<string, string> = new Map<string, string>();

  declareKeyMask: number = 0;
  ruleSetGeneration: number = 0;
  identityCache = new Map<string, any>();

  protected _currentRuleSet: RuleSet;
  protected sysRulesLoaded = false;
  protected uiLibSysRulesLoaded = false;
  private _nextKeyId: number = 0;
  private _keyData: Map<string, KeyData> = new Map<string, KeyData>();
  private _keyDatasById: KeyData[] = new Array<KeyData>(MaxKeyDatas);
  private _MatchToPropsCache: Map<string, PropertyMap> = new Map<string, PropertyMap>();
  /**
   * Stores objects that can be referenced from OSS while evaluating expression
   */
  private contextInjectables: Map<string, any> = new Map<string, any>();
  private _managerForProperty: Map<string, PropertyManager> = new Map<string, PropertyManager>();

  constructor(public componentRegistry: ComponentRegistry) {

    this.PropertyMerger_DeclareList = new PropertyMergerDeclareList();
    this.PropertyMerger_Traits = new PropertyMergerDeclareListForTrait();
    this.PropertyMerger_List = new PropertyMerger_List();
    this.Transformer_KeyPresent = new KeyValueTransformer_KeyPresent();


    this.declareKeyMask = this.keyData(KeyDeclare).maskValue();
    this.registerPropertyMerger(KeyTrait, this.PropertyMerger_Traits);


    const nooprule: Rule = new Rule(null, null, 0, 0);
    nooprule.disable();
    this.rules[0] = nooprule;
    this.ruleCount = 1;
  }

  /**
   * Register a single rule within the rules base repo. Each rule must have a list of selectors
   * and property map. If the property map is empty we assume we need to declare the rule.
   *
   */
  addRule(rule: Rule): void {

    const selectors: Array<Selector> = rule.selectors;

    if (selectors.length > 0 && selectors[selectors.length - 1].isDecl) {
      const decl = rule.createDecl();
      this.addRuleWithCheckScope(decl, true);
    }

    // we allow null to enable creation of a decl, but otherwise this rule has no effect
    if (isPresent(rule.properties)) {
      // After we've captured the decl, do the collapse
      rule._selectors = rule.convertKeyOverrides(rule._selectors);
      this.addRuleWithCheckScope(rule, true);
    }
  }

  /**
   *  Before we load rules this method needs to be called in order to create a `RuleSet` containing
   *  common information about the source and some other key properties of the loaded rule.
   *
   *  We need to be able to track every load origin therefore each RuleSet into the loaded Rule.
   *
   */
  beginRuleSet(filePath: string, rank?: number): void {
    try {
      assert(isBlank(this._currentRuleSet),
        'Can t start new rule set while one in progress');

      this._currentRuleSet = new RuleSet(this);
      this._currentRuleSet._start = this.ruleCount;
      this._currentRuleSet._end = this.ruleCount;
      this._currentRuleSet._rank = rank || this.ruleCount;
      this._currentRuleSet._filePath = filePath;
    } catch (e) {
      throw e;
    }
  }

  beginReplacementRuleSet(orig: RuleSet): void {
    const origRank = orig.startRank();
    this.beginRuleSet(orig.filePath);
    this._currentRuleSet._rank = origRank;
  }

  /**
   * Updates current rule counts from the loaded RuleSet
   *
   */
  endRuleSet(): RuleSet {
    assert(isPresent(this._currentRuleSet), 'No rule set progress');
    const result: RuleSet = this._currentRuleSet;
    if (this.ruleCount < result._end) {
      this.ruleCount = result._end;
    }
    this._currentRuleSet = null;
    this.ruleSetGeneration++;

    return result;
  }

  clearCaches(): void {
    this._MatchToPropsCache.clear();
    this._MatchToPropsCache = new Map<string, PropertyMap>();
    this.identityCache.clear();
    this.identityCache = new Map<string, any>();
    this.contextInjectables.clear();
  }

  invalidateRules(): void {
    this.ruleSetGeneration++;
    this.clearCaches();
  }

  newContext(isNested: boolean = false): Context {
    return new Context(this);
  }

  newMatchArray(): MatchValue[] {
    return [];
  }

  match(key: string, value: any, intermediateResult: MatchResult): MatchResult {
    const keyData = this._keyData.get(key);
    if (isBlank(keyData)) {
      return intermediateResult;
    }
    const keyMask: number = shiftLeft(1, keyData._id);

    // Does our result already include this key?  Then no need to join again
    // if (intermediateResult !== null && (intermediateResult._keysMatchedMask & keyMask) !==
    // 0) return intermediateResult;

    return new MatchResult(this, keyData, value, intermediateResult);
  }


  unionOverrideMatch(key: string, value: any,
                     intermediateResult: UnionMatchResult): UnionMatchResult {
    const keyData: KeyData = this._keyData.get(overrideKeyForKey(key));
    if (isBlank(keyData)) {
      return intermediateResult;
    }
    return new UnionMatchResult(this, keyData, value, intermediateResult);
  }

  propertiesForMatch(matchResult: MatchResult): PropertyMap {
    let properties: PropertyMap = this._MatchToPropsCache.get(matchResult.toString());
    if (isPresent(properties)) {
      return properties;
    }
    properties = this.newPropertiesMap();

    const arr: number[] = matchResult.filteredMatches();
    if (isBlank(arr)) {
      return properties;
    }

    // first entry is count
    const count: number = arr[0];
    const rules: Array<Rule> = new Array<Rule>(count);

    for (let i = 0; i < count; i++) {
      rules[i] = this.rules[arr[i + 1]];
    }

    ListWrapper.sort<Rule>(rules, (o1, o2) => o1.rank - o2.rank);

    let modifiedMask = 0;
    const declareKey: string = ((this.declareKeyMask & matchResult.keysMatchedMask) !== 0)
      ? matchResult.valueForKey(KeyDeclare) : null;


    for (const r in rules) {
      modifiedMask |= rules[r].apply(this, properties, declareKey);
    }

    properties.awakeProperties();
    this._MatchToPropsCache.set(matchResult.immutableCopy().toString(), properties);
    return properties;
  }


  matchArrayAssign(array: MatchValue[], keyData: KeyData, matchValue: MatchValue): void {
    const idx = keyData._id;
    const curr = array[idx];
    if (isPresent(curr)) {
      matchValue = curr.updateByAdding(matchValue);
    }
    array[idx] = matchValue;
  }

  managerForProperty(name: string): PropertyManager {
    let manager: PropertyManager = this._managerForProperty.get(name);
    if (isBlank(manager)) {
      manager = new PropertyManager(name);
      this._managerForProperty.set(name, manager);
    }
    return manager;
  }

  transformValue(key: string, value: any): any {
    const keyData = this._keyData.get(key);
    if (isPresent(keyData) && isPresent(keyData._transformer)) {
      value = keyData._transformer.tranformForMatch(value);
    }
    return value;
  }


  keyData(key: string): KeyData {
    let data: KeyData = this._keyData.get(key);

    if (isBlank(data)) {
      const id: number = this._nextKeyId;

      if (id >= MaxKeyDatas - 1) {
        print('Exceeded maximum number of context keys');
      }
      this._nextKeyId++;
      data = new KeyData(key, id);

      this._keyDatasById[id] = data;
      this._keyData.set(key, data);
    }
    return data;
  }


  groupForTrait(trait: string): string {
    return 'default';
  }

  toString(): string {
    return 'Meta';
  }


  isNullMarker(value: any): boolean {
    return isPresent(value) && value['markernull'];
  }


  newPropertiesMap(): PropertyMap {
    return new PropertyMap();
  }

  beautifyClassName(name: string): string {
    return beautifyClassName(name);
  }

  toClassName(object: any): string {
    return className(object);
  }

  ngOnDestroy(): void {
    this.invalidateRules();
  }


  abstract itemNames(context: Context, key: string): Array<string>;

  abstract itemProperties(context: Context, key: string,
                          filterHidden: boolean): Array<ItemProperties>;

  abstract actionsByCategory(context: Context, result: Map<string, Array<ItemProperties>>,
                             zones: string[]): Array<ItemProperties>;

  abstract compPageWithName(name: string): Type<any>;

  abstract computeModuleInfo(context?: Context, checkVisibility?: boolean): ModuleInfo;

  abstract createLocalizedString(key: string, defaultValue: string): LocalizedString;

  abstract currentModuleLabel(moduleName: string, context?: Context): string;

  abstract displayLabel(className: string, propertiesValue: string, usedByField?: boolean): string;

  abstract fieldList(context: Context): Array<ItemProperties>;

  abstract fireAction(context: Context, action?: ItemProperties | Route,
                      withBackAction?: boolean): void;

  abstract flattenVisible(fieldsByZones: Map<string, Array<string>>, zoneList: string[],
                          key: string, context: Context): string[];

  abstract gotoModule(module: ItemProperties, activatedPath?: string): void;

  abstract go2Module(module: ItemProperties, routePrefix: string): void;

  abstract itemList(context: Context, key: string, zones: string[]): Array<ItemProperties>;

  abstract itemNamesByZones(context: Context, key: string, zones: string[]): Map<string, any>;

  abstract itemsByZones(context: Context, property: string, zones: string[]): Map<string, any>;

  abstract zonePath(context: Context): string;

  abstract zones(context: Context): Array<string>;


  contextDependencies(): Map<string, any> {
    return this.contextInjectables;
  }

  registerDependency(name: string, dependency: any): void {
    this.contextInjectables.set(name, dependency);
  }

  bestSelectorToIndex(selectors: Array<Selector>): Selector {
    let best: Selector;
    let bestRank = Number.MIN_VALUE;
    let pos = 0;
    for (const sel of selectors) {
      const rank = this.selectivityRank(sel) + pos++;
      if (rank > bestRank) {
        best = sel;
        bestRank = rank;
      }
    }
    return best;
  }

  validationError(context: Context): string {
    const error = context.propertyForKey(KeyValid);
    if (isBlank(error)) {
      return null;
    }

    if (isBoolean(error)) {
      return BooleanWrapper.boleanValue(error) ? null : 'Invalid entry';
    }
    return error.toString();
  }

  protected scopeKeyForSelector(preds: Array<Selector>): string {
    for (let i = preds.length - 1; i >= 0; i--) {
      const pred = preds[i];
      const data = this.keyData(pred.key);
      if (data.isPropertyScope) {
        return pred.key;
      }
    }
    return null;
  }

  protected registerKeyInitObserver(key: string, o: ValueQueriedObserver): void {
    this.keyData(key).addObserver(o);
  }

  protected registerValueTransformerForKey(key: string, transformer: KeyValueTransformer): void {
    this.keyData(key)._transformer = transformer;
  }

  protected mirrorPropertyToContext(propertyName: string, contextKey: string): void {
    const keyData = this.keyData(contextKey);
    const manager = this.managerForProperty(propertyName);
    manager._keyDataToSet = keyData;
  }

  protected defineKeyAsPropertyScope(contextKey: string): void {
    const keyData: KeyData = this.keyData(contextKey);
    keyData.isPropertyScope = true;

    const traitKey: string = contextKey + '_trait';
    this.mirrorPropertyToContext(traitKey, traitKey);
    this.registerPropertyMerger(traitKey, this.PropertyMerger_DeclareList);
  }

  protected registerPropertyMerger(propertyName: string, merger: PropertyMerger): void {
    if (isBlank(merger.meta)) {
      merger.meta = this;
    }
    const manager: PropertyManager = this.managerForProperty(propertyName);
    manager._merger = merger;
  }

  private addToRulesWithPos(rule: Rule, pos: number): void {
    this.rules[pos] = rule;
  }

  // todo: unit test this
  private addRuleWithCheckScope(rule: Rule, checkPropScope: boolean): void {
    assert(isPresent(this._currentRuleSet), 'Attempt to add rule without current RuleSet');
    const selectors: Array<Selector> = rule._selectors;

    const entryId: number = this._currentRuleSet.allocateNextRuleEntry();
    rule.id = entryId;
    if (rule.rank === 0) {
      rule.rank = this._currentRuleSet._rank++;
    }
    rule.ruleSet = this._currentRuleSet;
    this.addToRulesWithPos(rule, entryId);

    // index it
    let lastScopeKeyData: KeyData;
    let declKey: string;
    const declMask: number = this.declareKeyMask;
    let matchMask = 0, indexedMask = 0, antiMask = 0;
    const count = selectors.length;

    const indexOnlySelector: Selector = _UsePartialIndexing ? this.bestSelectorToIndex(
      selectors) : null;
    for (let i = count - 1; i >= 0; i--) {
      const p: Selector = selectors[i];

      const shouldIndex: boolean = (indexOnlySelector === null || p === indexOnlySelector);

      const data: KeyData = this.keyData(p.key);
      const dataMask: number = data.maskValue();
      if (!this.isNullMarker(p.value)) {
        if (shouldIndex || _DebugDoubleCheckMatches) {
          if (isArray(p.value)) {
            for (const v of p.value) {
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
    const isDecl: boolean = isPresent(declKey);
    const nonScopeKeyDecl: boolean = isPresent(declKey) && !this.keyData(declKey).isPropertyScope;
    if (!isDecl || nonScopeKeyDecl) {

      // all non-decl rules don't apply outside decl context
      if (!isDecl) {
        antiMask |= declMask;
      }

      if (isPresent(lastScopeKeyData) && checkPropScope) {
        const traitVal = rule.properties.get(KeyTrait);


        if (isPresent(traitVal)) {
          const traitKey: string = lastScopeKeyData._key + '_trait';

          const properties = MapWrapper.createEmpty<string, any>();
          properties.set(traitKey, traitVal);

          const traitRule: Rule = new Rule(rule._selectors, properties, rule.rank,
            rule.lineNumber);

          this.addRuleWithCheckScope(traitRule, false);
        }

        rule._selectors = selectors.slice(0);

        const scopeSel: Selector = new Selector(ScopeKey, lastScopeKeyData.key);
        rule.selectors.push(scopeSel);

        const data: KeyData = this.keyData(ScopeKey);

        if (!_UsePartialIndexing || _DebugDoubleCheckMatches) {
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

  private selectivityRank(selector: Selector): number {
    // Score selectors: good if property scope, key !== '*' or bool
    // '*' is particularly bad, since these are inherited by all others
    let score = 1;
    const value = selector.value;

    if (isPresent(value) && !(KeyAny === value)) {
      score += (isBoolean(value) ? 1 : 9);
    }

    const keyData: KeyData = this.keyData(selector.key);
    if (keyData.isPropertyScope) {
      score *= 5;
    }
    // Todo: we could score based on # of entries in KeyData
    return score;
  }

  private logRuleStats(): void {
    let total = 0;

    const values = this._keyData.keys();

    const counts: any[] = [];

    for (const id of Array.from(values)) {
      const keyData = this._keyData.get(id);
      const valuess = keyData.ruleVecs.values();

      keyData.ruleVecs.forEach((vm, k) => {
        const kvc = new KeyValueCount(keyData._key, (<any>vm)['_value'], isPresent(
          vm._arr) ? vm._arr[0] : 0);

        total += kvc.count;
        counts.push(kvc);
      });
    }
    ListWrapper.sort<KeyValueCount>(counts, (o1, o2) => o2.count - o1.count);

    const buf = new StringJoiner([]);
    const c = Math.min(10, counts.length);

    buf.add('Total index entries comparisons performed: ' + Match._Debug_ElementProcessCount);
    buf.add('\nTotal index entries: ' + total);
    buf.add('\nTop  keys/values: ' + c);


    for (let i = 0; i < c; i++) {
      const kvc = counts[i];

      buf.add('     ' + kvc.key + '  = ' + kvc.value + ' : ' + kvc.count + ' entries');
      buf.add('\n');
    }
    print(buf.toString());
  }


}


export class KeyValueCount {

  constructor(public key: string, public value: any, public count: number) {
  }
}
