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
import {Injectable, isDevMode, Type} from '@angular/core';
import {Route} from '@angular/router';
import {assert, isArray, isBlank, isPresent, isStringMap, toList} from './utils/lang';
import {FieldPath} from './utils/field-path';
import {Environment} from './config/environment';
import {RoutingService} from './utils/routing.service';
import {ListWrapper, MapWrapper} from './utils/collection';
import {ObjectMeta} from './object-meta';
import {ComponentRegistry} from './component-registry.service';
import {Context, UIContext} from './context';
import {
  DefaultLabelGenerator,
  PropFieldPropertyListResolver,
  PropFieldsByZoneResolver,
  PropLayoutsByZoneResolver,
  StaticallyResolvable,
  StaticDynamicWrapper
} from './property-value';
import {Rule, RuleSet, Selector} from './rule';
import {ItemProperties} from './item-properties';
import {
  ActionZones,
  ACTIVE_CNTX,
  AppConfigUserRulesParam,
  DefaultActionCategory,
  KeyAction,
  KeyActionCategory,
  KeyAfter,
  KeyAny,
  KeyArea,
  KeyClass,
  KeyComponentName,
  KeyEditing,
  KeyField,
  KeyHomePage,
  KeyLabel,
  KeyLayout,
  KeyModule,
  KeyObject,
  KeyOperation,
  KeyRank,
  KeyTrait,
  KeyVisible,
  KeyZonePath,
  LowRulePriority,
  ModuleActionZones,
  ModuleInfo,
  OSSResource,
  PropFieldPropertyList,
  PropFieldsByZone,
  PropLayoutsByZone,
  resourceToPath,
  SystemRulePriority,
  ValueQueriedObserver,
  ZoneMain,
  ZonesTLRMB
} from './constants';
import {DynamicPropertyValue, PropertyMerger_And} from './policies/merging-policy';
import {MetaConfig} from './config/meta-config';
import {LocalizedLabelString, LocalizedString} from './i18n/localized-string';
import {RuntimeParser} from './compiler/runtime-parser.visitor';


/**
 * UIMeta is responsible setting layouts and all around this. We can either use this as a singleton
 * or use it as a service using Angular @Inject()
 * Right now we use still singleton as we need this class as a library for some other projects
 *
 *
 *
 */
@Injectable({providedIn: 'root'})
export class UIMeta extends ObjectMeta {
  private _loadedResource: Map<string, RuleSet> = new Map<string, RuleSet>();

  constructor(public componentRegistry: ComponentRegistry,
              public env: Environment,
              public config: MetaConfig,
              public routingService?: RoutingService) {
    super(componentRegistry);

    try {

      this.beginRuleSet('UIMeta');

      this.registerKeyInitObserver(KeyClass, new AppRuleMetaDataProvider());

      // These keys define scopes for their properties
      // defineKeyAsPropertyScope(KeyArea);
      this.defineKeyAsPropertyScope(KeyLayout);
      this.defineKeyAsPropertyScope(KeyModule);

      // Default rule for converting field name to label
      this.registerDefaultLabelGeneratorForKey(KeyClass);
      this.registerDefaultLabelGeneratorForKey(KeyField);
      this.registerDefaultLabelGeneratorForKey(KeyLayout);
      this.registerDefaultLabelGeneratorForKey(KeyModule);
      this.registerDefaultLabelGeneratorForKey(KeyAction);
      this.registerDefaultLabelGeneratorForKey(KeyActionCategory);

      // policies for chaining certain well known properties
      this.registerPropertyMerger(KeyArea, this.PropertyMerger_DeclareList);
      this.registerPropertyMerger(KeyLayout, this.PropertyMerger_DeclareList);
      this.registerPropertyMerger(KeyModule, this.PropertyMerger_DeclareList);

      this.mirrorPropertyToContext(KeyEditing, KeyEditing);
      this.mirrorPropertyToContext(KeyLayout, KeyLayout);
      this.mirrorPropertyToContext(KeyComponentName, KeyComponentName);

      this.registerPropertyMerger(KeyEditing, new PropertyMerger_And());

      // define operation hierarchy
      this.keyData(KeyOperation).setParent('view', 'inspect');
      this.keyData(KeyOperation).setParent('print', 'view');
      this.keyData(KeyOperation).setParent('edit', 'inspect');
      this.keyData(KeyOperation).setParent('search', 'inspect');
      this.keyData(KeyOperation).setParent('keywordSearch', 'search');
      this.keyData(KeyOperation).setParent('textSearch', 'keywordSearch');

      this.registerStaticallyResolvable(PropFieldsByZone, new PropFieldsByZoneResolver(), KeyClass);
      this.registerStaticallyResolvable(PropFieldPropertyList, new PropFieldPropertyListResolver(),
        KeyClass);
      this.registerStaticallyResolvable(PropLayoutsByZone, new PropLayoutsByZoneResolver(),
        KeyLayout);


    } finally {
      if (isDevMode()) {
        window['$oss'] = this;
      }
      this.endRuleSet();
    }

  }

  loadedRuleSets(): Map<string, RuleSet> {
    return this._loadedResource;
  }

  zones(context: Context): Array<string> {
    const zones: Array<string> = context.propertyForKey('zones');
    return (isBlank(zones)) ? toList(ZoneMain) : zones;
  }


  zonePath(context: Context): string {
    let zonePath: any;
    if (isPresent(context.values.get(KeyLayout))) {
      context.push();
      context.setScopeKey(KeyLayout);
      zonePath = context.propertyForKey(KeyZonePath);
      context.pop();
    }
    return zonePath;
  }


  newContext(isNested: boolean = false): Context {
    return new UIContext(this, isNested);
  }

  loadRuleSource(source: OSSResource, required: boolean, rank: number): boolean {
    if (source.content) {
      this.beginRuleSet(resourceToPath(source), rank);
      this._loadRuleSource(source);
      return true;
    }
    return false;
  }


  loadAppRuleOnDemand(ruleText: string, appClass: string): void {
    if (ruleText) {
      const resource = {content: ruleText, module: 'App', filePath: appClass};
      this.beginRuleSet(resourceToPath(resource));
      try {
        this._loadRuleSource(resource);
      } catch (e) {
        throw e;
      }
    }
  }


  itemList(context: Context, key: string, zones: string[]): Array<ItemProperties> {
    const predecessors: Map<string, Array<ItemProperties>> = this.predecessorMap(context, key,
      zones[0]);
    const result: Array<ItemProperties> = [];

    for (const zone of zones) {
      this.accumulatePrecessors(predecessors, zone, result);
    }
    return result;
  }

  itemsByZones(context: Context, property: string, zones: string[]): Map<string, any> {
    const predecessors = this.predecessorMap(context, property, zones[0]);
    const byZone = new Map<string, any>();


    MapWrapper.iterable(predecessors).forEach((value, zone) => {
      if (this.isZoneReference(zone)) {
        const list: any[] = [];
        this.accumulatePrecessors(predecessors, zone, list);

        FieldPath.setFieldValue(byZone, zone, list);
      }
    });

    return byZone;
  }

  /**
   *
   * Not used by will be used by Meta Datatable
   */
  flattenVisible(fieldsByZones: Map<string, Array<string>>, zoneList: string[], key: string,
                 context: Context): string[] {
    const result: string[] = [];

    if (isPresent(fieldsByZones)) {

      for (const zone of zoneList) {
        const fields: string[] = fieldsByZones.get(zone);

        if (isBlank(fields)) {
          continue;
        }

        for (const field of fields) {
          context.push();
          context.set(key, field);
          if (context.booleanPropertyForKey(KeyVisible, false)) {
            result.push(field);
          }
          context.pop();
        }
      }
    }
    return result;
  }


  displayLabel(className: string, useInstead?: string, usedByField: boolean = false): string {

    if (isPresent(useInstead) || className === 'String') {
      return useInstead;
    }
    return this.displayKeyForClass(className, usedByField);
  }


  createLocalizedString(key: string, defaultValue: string): LocalizedString {
    assert(isPresent(this._currentRuleSet),
      'Attempt to create localized string without currentRuleSet in place');

    return new LocalizedString(this, this._currentRuleSet.filePath, key, defaultValue);
  }


  fireAction(context: Context, action?: ItemProperties | Route,
             withBackAction: boolean = false): void {

    if (isPresent(action)) {
      if (action instanceof ItemProperties) {
        context.push();
        let actionCategory = action.properties.get(KeyActionCategory);
        if (isBlank(actionCategory)) {
          actionCategory = DefaultActionCategory;
        }
        context.set(KeyActionCategory, actionCategory);
        context.set(KeyAction, action.name);

        this._fireAction(context, false);
        context.pop();
      } else {
        this.navigateToPage(context, action, withBackAction);
      }
    } else {
      context.push();
      this._fireAction(context, withBackAction);
      context.pop();
    }
  }

  /**
   *
   * @deprecated please use go2Module instead
   */
  gotoModule(module: ItemProperties, activatedPath?: string): void {

    this.env.deleteValue(ACTIVE_CNTX);
    const context = this.newContext();

    console.log('got To Module: ', module);
    context.push();
    context.set(KeyModule, module.name);
    const pageName = context.propertyForKey(KeyHomePage);
    const route = this.routingService.routeForPage(pageName, module.name.toLowerCase(),
      activatedPath);
    if (activatedPath === '/') {
      activatedPath = '';
    }
    const path = `${activatedPath}/${route.path}`;
    const params = this.prepareRoute(context, null);
    context.pop();

    this.routingService.navigate([path, params], {skipLocationChange: true});
  }

  go2Module(module: ItemProperties, routePrefix: string): void {
    this.env.deleteValue(ACTIVE_CNTX);
    const context = this.newContext();

    context.push();
    context.set(KeyModule, module.name);
    const homePageRoute = context.propertyForKey(KeyHomePage);
    const params = this.prepareRoute(context, null);
    context.pop();

    this.routingService.router.navigate([routePrefix, homePageRoute], {
      queryParams: params
    });
  }


  fieldList(context: Context): Array<ItemProperties> {
    return this.itemList(context, KeyField, ZonesTLRMB);
  }

  itemNamesByZones(context: Context, key: string, zones: string[]): Map<string, any> {
    const itemsByZones: Map<string, any> = this.itemsByZones(context, key, zones);
    return this.mapItemPropsToNames(itemsByZones);
  }

  /**
   * This method is responsible to load Application.oss which is called internal but this
   * method is exposed in order to run this manually e.g. from test
   */
  loadApplicationRule(): void {
    if (!this.env.inTest) {
      return;
    }
    const registeredAppRules = this.config.get(AppConfigUserRulesParam) || [];
    for (const i in registeredAppRules) {
      const userRule = registeredAppRules[i];

      const appRule = userRule['ApplicationRule'];
      if (appRule) {
        this.loadRuleSource({filePath: 'Application.oss', module: 'App', content: appRule},
          false, LowRulePriority);
      }
    }
  }

  addPredecessorRule(itemName: string, contextPreds: Array<Selector>, predecessor: string,
                     traits: Array<string>, lineNumber: number): Rule {

    if (!predecessor && !traits) {
      return;
    }

    // Determine key being used.  If selector scope key is "class" use "field"
    let key = this.scopeKeyForSelector(contextPreds);
    if (!key == null || key === KeyClass) {
      key = KeyField;
    }
    const selectors = [...contextPreds];
    selectors.push(new Selector(key, itemName));
    const props = new Map<string, any>();

    if (predecessor) {
      props.set(KeyAfter, predecessor);
    }

    if (traits != null) {
      props.set(KeyTrait, traits);
    }

    const rule = new Rule(selectors, props, 0, lineNumber);
    this.addRule(rule);
    return rule;
  }

  compPageWithName(name: string): Type<any> {
    const currType = this.componentRegistry.nameToType.get(name);
    if (isBlank(currType)) {
      assert(false, name + ' component does not exists. Create Dummy Component instead of' +
        ' throwing this error');
      return;
    }
    return currType;
  }

  // caller must push/pop!
  actionsByCategory(context: Context, result: Map<string, Array<ItemProperties>>,
                    zones: string[]): Array<ItemProperties> {
    const catNames: string[] = [];
    const actionCategories = this.itemList(context, KeyActionCategory, zones);

    if (isPresent(actionCategories)) {
      actionCategories.forEach((item: ItemProperties) => catNames.push(item.name));
    }

    this.addActionsForCategories(context, result, catNames);
    return actionCategories;
  }

  computeModuleInfo(context?: Context, checkVisibility: boolean = true): ModuleInfo {

    const moduleInfo: ModuleInfo = new ModuleInfo();
    moduleInfo.modules = [];


    if (isBlank(context)) {
      context = this.newContext();
    }

    const allModuleProps: Array<ItemProperties> = this.itemList(context, KeyModule, ActionZones);
    moduleInfo.moduleNames = [];
    moduleInfo.moduleByNames = new Map<string, ItemProperties>();

    for (const module of allModuleProps) {

      context.push();
      context.set(KeyModule, module.name);

      if (checkVisibility && !context.booleanPropertyForKey(KeyVisible, true)) {
        context.pop();
        continue;
      }

      moduleInfo.moduleNames.push(module.name);
      const modProperties = new ItemProperties(module.name, context.allProperties(), false);
      moduleInfo.modules.push(modProperties);

      moduleInfo.moduleByNames.set(module.name, modProperties);

      context.pop();
    }

    context.push();
    context.set(KeyModule, moduleInfo.moduleNames);
    moduleInfo.actionsByCategory = new Map<string, Array<ItemProperties>>();
    moduleInfo.actionCategories = this.actionsByCategory(context, moduleInfo.actionsByCategory,
      ModuleActionZones);
    context.pop();

    return moduleInfo;
  }

  currentModuleLabel(moduleName: string, context?: Context): string {
    if (isBlank(context)) {
      context = this.newContext();
    }

    context.push();
    context.set(KeyModule, moduleName);
    const label: string = context.propertyForKey(KeyLabel);
    context.pop();

    return label;
  }

  /**
   * Registers framework level components in order to be instantiated when needed.
   *
   */
  registerComponents(sysReferences: any): void {

    assert(this.env.inTest || isPresent(this.config.get(AppConfigUserRulesParam)),
      'Unable to initialize MetaUI as user rules are missing. please use:' +
      ' metaui.rules.user-rules configuration param');

    this.componentRegistry.registerTypes(sysReferences);

    if (!this.env.inTest) {
      const userReferences: any[] = this.config.get(AppConfigUserRulesParam);
      for (const uRule of userReferences) {
        this.componentRegistry.registerTypes(uRule);
      }
    }
  }

  addTestUserRule(testRuleName: string, source: any): void {
    this._testRules.set(testRuleName, source);
    //
    // this.loadRuleSource({filePath: testRuleName, module: 'Test', content: source},
    //   false, LowRulePriority);
  }

  protected _loadRuleSource(source: OSSResource): void {
    this._loadRules(resourceToPath(source), source.content, true);
    this._loadedResource.set(resourceToPath(source), this.endRuleSet());
  }

  protected _loadRules(name: string, content: string, editable: boolean): void {
    try {
      const parser = new RuntimeParser(content, this);
      parser.registerRules();
    } catch (e) {
      this.endRuleSet().disableRules();
      throw new Error(`Error loading rule ${name} - ${e} `);
    }
  }

  reloadRuleFile(resource: OSSResource): void {
    const ruleSet: RuleSet = this._loadedResource.get(resourceToPath(resource));
    if (!ruleSet) {
      throw new Error('Attempt to reload not previously loaded resource');
    }
    this.beginReplacementRuleSet(ruleSet);
    this._loadRuleSource(resource);
    ruleSet.disableRules();
    this.invalidateRules();
  }

  private _fireAction(context: Context, withBackAction: boolean): void {
    const actionResults = context.propertyForKey('actionResults');
    if (!actionResults) {
      return;
    }
    this.navigateToPage(context, actionResults, withBackAction);
  }

  private defaultLabelGeneratorForKey(key: string): DynamicPropertyValue {
    return new DefaultLabelGenerator(key);
  }

  private registerDerivedValue(propKey: string, dynamicValue: DynamicPropertyValue,
                               contextKey: string,
                               contextValue: string): void {
    const m = new Map<string, any>();
    m.set(propKey, dynamicValue);
    this.addRule(new Rule(toList(new Selector(contextKey, contextValue)), m, SystemRulePriority));
  }

  private registerStaticallyResolvable(propKey: string, dynamicValue: StaticallyResolvable,
                                       contextKey: string): void {
    this.registerDerivedValue(propKey, new StaticDynamicWrapper(dynamicValue), contextKey, KeyAny);
  }

  private registerDefaultLabelGeneratorForKey(key: string): void {
    this.registerDerivedValue(KeyLabel, new LocalizedLabelString(this), key, KeyAny);
  }

  private fieldsByZones(context: Context): Map<string, any> {
    return this.itemsByZones(context, KeyField, ZonesTLRMB);
  }

  private mapItemPropsToNames(itemsByZones: Map<string, any>): Map<string, any> {
    const namesByZones: Map<string, any> = new Map<string, any>();

    MapWrapper.iterable(itemsByZones).forEach((value, key) => {
      if (isPresent(value) && isArray(value)) {
        const names: string[] = [];
        for (const item of value) {
          if (item instanceof ItemProperties) {
            names.push(
              (<ItemProperties>item).name);
          }
        }
        namesByZones.set(key, names);

      } else {
        namesByZones.set(key,
          this.mapItemPropsToNames(
            value));
      }
    });
    return namesByZones;
  }

  private predecessorMap(context: Context, key: string,
                         defaultPredecessor: string): Map<string, Array<ItemProperties>> {
    const fieldInfos: Array<ItemProperties> = this.itemProperties(context, key, false);

    const predecessors: Map<string, Array<ItemProperties>> = MapWrapper.groupBy<ItemProperties>(
      fieldInfos, (item: ItemProperties) => {
        const pred = item.properties.get(KeyAfter);
        return isPresent(pred) ? pred : defaultPredecessor;
      });

    return predecessors;
  }

  private isZoneReference(key: string): boolean {
    // keys of the form 'z<Name>' and 'foo.bar.z<Name>' are considered zone keys
    const lastDot = key.lastIndexOf('.');
    const suffix = (lastDot === -1) ? key : key.substring(lastDot + 1);
    return (suffix.length > 1) && (suffix[0] === 'z') && (
      suffix[1].toUpperCase() === suffix[1] // is uppercase ?s
    );
  }

  // recursive decent of predecessor tree...
  private accumulatePrecessors(predecessors: Map<string, Array<ItemProperties>>, key: string,
                               result: any): void {
    const items: Array<ItemProperties> = predecessors.get(key);
    if (isBlank(items)) {
      return;
    }

    ListWrapper.sort<ItemProperties>(items, (o1, o2) => {
      let r1 = o1.properties.get(KeyRank);
      let r2 = o2.properties.get(KeyRank);

      if (r1 === null) {
        r1 = 100;
      }
      if (r2 === null) {
        r2 = 100;
      }

      return (r1 === r2) ? 0 : (r1 === null) ? 1 : (r2 === null) ? -1 : (r1 - r2);
    });

    for (const item of items) {
      if (!item.hidden) {
        result.push(item);
      }
      this.accumulatePrecessors(predecessors, item.name, result);
    }
  }

  private displayKeyForClass(className: string, usedByField: boolean = false): string {
    // performance: should use registerDerivedValue('...', new Context.StaticDynamicWrapper
    // to get cached resolution here...
    const context = this.newContext();
    context.set(KeyLayout, 'LabelField');
    context.set(KeyClass, className);
    const fields: Array<ItemProperties> = this.itemProperties(context, KeyField, true);

    if (usedByField) {
      return ListWrapper.isEmpty(fields) ? null : fields[0].name;
    } else {
      return ListWrapper.isEmpty(fields) ? '$toString' : fields[0].name;
    }
  }


  private navigateToPage(context: Context, route: Route | string, withBackAction: boolean): void {
    const params = this.prepareRoute(context, withBackAction);

    const uiContex: UIContext = <UIContext>context;
    if (this.isRoute(route)) {
      this.routingService.navigateWithRoute(<Route>route, params, uiContex.object);
    } else {
      const id = params.id;
      const type = params.type;
      const routePath = [route];
      if (params.id && params.type) {
        routePath.push(type, id);
      }
      this.routingService.router.navigate(routePath);
    }
  }

  private prepareRoute(context: Context, withBackAction: boolean): any {
    const params = {};
    const pageBindings = context.propertyForKey('pageBindings');
    if (isPresent(pageBindings)) {
      pageBindings.forEach((v: any, k: any) => {

        (<any>params)[k] = context.resolveValue(v);
        // clean up defaults
        if (k === KeyObject) {
          delete (<any>params)[k]['$toString'];
        }
      });
      if (isPresent(withBackAction)) {
        (<any>params)['b'] = withBackAction;
      }

    }

    return params;
  }

  private isRoute(actionResult: any): boolean {
    return isStringMap(actionResult) && isPresent(actionResult['path']);

  }

  private addActionsForCategories(context: Context, result: Map<string, Array<ItemProperties>>,
                                  catNames: string[]): void {
    for (const cat of catNames) {
      context.push();
      if (cat !== DefaultActionCategory) {
        context.set(KeyActionCategory, cat);
      }

      this.collectActionsByCategory(context, result, cat);
      context.pop();
    }

  }

  private collectActionsByCategory(context: Context, result: Map<string, Array<ItemProperties>>,
                                   targetCat: string): void {
    const actionInfos: ItemProperties[] = this.itemProperties(context, KeyAction, true);
    for (const actionInfo of actionInfos) {
      context.push();
      context.set(KeyAction, actionInfo.name);

      const visible = context.booleanPropertyForKey(KeyVisible, true);
      context.pop();

      if (visible) {
        let category = actionInfo.properties.get(KeyActionCategory);

        if (category == null) {
          category = DefaultActionCategory;
        }
        if (targetCat !== category) {
          continue;
        }

        let forCategory: ItemProperties[] = result.get(category);
        if (isBlank(forCategory)) {
          forCategory = [];
          result.set(category, forCategory);
        }
        forCategory.push(actionInfo);
      }
    }
  }

}


/**
 * Load User defined meta data. This class is triggered as soon as we create a context and
 * pass an object into it. Based on the object we notify different Observers passing name
 * of the class and here we search if we have any Rules available for current className and
 * try to load the Rule.
 */
class AppRuleMetaDataProvider implements ValueQueriedObserver {

  notify(meta: UIMeta, key: string, value: any): void {
    let aRules: string;
    const uiMeta: UIMeta = <UIMeta>meta;

    if (uiMeta._testRules.has(value + 'Rule')) {
      // since we are in development mode and test mode is on we can check extra repository
      // used by tests, we need to check if we are not running unittest and a class is not
      // application defined but unittest defined rule

      if (uiMeta._testRules.has(value + 'Rule') && uiMeta._testRules.get(value + 'Rule')) {
        aRules = uiMeta._testRules.get(value + 'Rule');
      }

    } else if (isPresent(uiMeta.config) &&
      uiMeta.config.get(AppConfigUserRulesParam)) {

      const userReferences: any[] = uiMeta.config.get(AppConfigUserRulesParam);

      for (const i in userReferences) {
        if (isPresent(userReferences[i][value + 'Rule']) && userReferences[i][value + 'Rule']) {
          aRules = userReferences[i][value + 'Rule'];
        }
      }
    }
    meta.loadAppRuleOnDemand(aRules, value);
  }

}
