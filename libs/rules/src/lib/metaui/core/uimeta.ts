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
import {Type} from '@angular/core';
import {
  assert,
  decamelize,
  isArray,
  isBlank,
  isPresent,
  isString,
  isStringMap,
  warn
} from '../../core/utils/lang';
import {FieldPath} from '../../core/utils/field-path';
import {Environment} from '../../core/config/environment';
import {AppConfig} from '../../core/config/app-config';
import {RoutingService} from '../../core/routing/routing.service';
import {ListWrapper, MapWrapper} from '../../core/utils/collection';
import {ObjectMeta} from './object-meta';
import {ComponentRegistry} from '../../components/core/component-registry.service';
import {
  Meta,
  PropertyMap,
  PropertyMapAwaking,
  PropertyMerger_And,
  ValueQueriedObserver
} from './meta';
import {Context, UIContext} from './context';
import {SystemRules} from './widgets-rules';
import {DynamicPropertyValue, StaticallyResolvable, StaticDynamicWrapper} from './property-value';
import {Rule, Selector} from './rule';
import {JsonRule} from './json-rule';
import {ItemProperties} from './item-properties';
import {SystemPersistenceRules} from './persistence-rules';
import {ACTIVE_CNTX} from './meta-context/meta-context.component';


/**
 * UIMeta is responsible setting layouts and all around this. We can either use this as a singleton
 * or use it as a service using Angular @Inject()
 * Right now we use still singleton as we need this class as a library for some other projects
 *
 *
 * todo: Convert to Injectable
 */

  // @Injectable()
export class UIMeta extends ObjectMeta {
  static KeyOperation = 'operation';
  static KeyModule = 'module';
  static KeyLayout = 'layout';
  static KeyArea = 'area';
  static KeyEditing = 'editing';
  static KeyAfter = 'after';
  static KeyHidden = 'hidden';
  static KeyLabel = 'label';
  static KeyComponentName = 'component';
  static KeyBindings = 'bindings';
  static KeyHomePage = 'homePage';
  static KeyZonePath = 'zonePath';
  static PropFieldsByZone = 'fieldsByZone';
  static PropIsFieldsByZone = 'fiveZoneLayout';
  static PropActionsByCategory = 'actionsByCategory';
  static PropActionCategories = 'actionCategories';
  static PropFieldPropertyList = 'fieldPropertyList';
  static PropLayoutsByZone = 'layoutsByZone';
  static KeyWrapperComponent = 'wrapperComponent';
  static KeyWrapperBinding = 'wrapperBindings';


  static RootPredecessorKey = '_root';
  static readonly ZoneMain = 'zMain';
  static readonly ZoneTop = 'zTop';
  static readonly ZoneLeft = 'zLeft';
  static readonly ZoneMiddle = 'zMiddle';
  static readonly ZoneRight = 'zRight';
  static readonly ZoneBottom = 'zBottom';
  static readonly ZoneDetail = 'zDetail';

  static readonly AppConfigRuleFilesParam = 'metaui.rules.file-names';
  static readonly AppConfigUserRulesParam = 'metaui.rules.user-rules';

  static ZonesTLRMB = [
    UIMeta.ZoneTop, UIMeta.ZoneLeft, UIMeta.ZoneMiddle,
    UIMeta.ZoneRight, UIMeta.ZoneBottom
  ];
  static ZonesMTLRB = [
    UIMeta.ZoneMain, UIMeta.ZoneTop, UIMeta.ZoneLeft, UIMeta.ZoneRight, UIMeta.ZoneBottom
  ];
  static ZonesDetail = [UIMeta.ZoneDetail];

  private static _instance: UIMeta = null;

  static ModuleActionZones: string[] = ['zNav', 'zGlobal'];
  static ActionZones: string[] = ['zGlobal', 'zMain', 'zGeneral'];


  static getInstance(): UIMeta {
    return this._instance || (this._instance = new this());
  }

  static defaultLabelForIdentifier(fieldName: string) {
    let lastDot = fieldName.lastIndexOf('.');
    if (lastDot !== -1 && lastDot !== fieldName.length - 1) {
      fieldName = fieldName.substring(lastDot + 1);
    }
    return decamelize(fieldName);
  }

  static beautifyClassName(className: string): string {
    return decamelize(className, ' ');
  }

  static beautifyFileName(field: string): string {
    return decamelize(field, ' ');
  }


  private constructor() {
    super();

    // if (isPresent(loader)) {
    //     this.registerLoader(loader);
    // }

    try {
      this.beginRuleSet('UIMeta');

      this.registerKeyInitObserver(UIMeta.KeyClass, new UserMetaDataProvider());

      // These keys define scopes for their properties
      // defineKeyAsPropertyScope(KeyArea);
      this.defineKeyAsPropertyScope(UIMeta.KeyLayout);
      this.defineKeyAsPropertyScope(UIMeta.KeyModule);

      // Default rule for converting field name to label
      this.registerDefaultLabelGeneratorForKey(UIMeta.KeyClass);
      this.registerDefaultLabelGeneratorForKey(UIMeta.KeyField);
      this.registerDefaultLabelGeneratorForKey(UIMeta.KeyLayout);
      this.registerDefaultLabelGeneratorForKey(UIMeta.KeyModule);
      this.registerDefaultLabelGeneratorForKey(UIMeta.KeyAction);
      this.registerDefaultLabelGeneratorForKey(UIMeta.KeyActionCategory);

      // policies for chaining certain well known properties
      this.registerPropertyMerger(UIMeta.KeyArea, Meta.PropertyMerger_DeclareList);
      this.registerPropertyMerger(UIMeta.KeyLayout, Meta.PropertyMerger_DeclareList);
      this.registerPropertyMerger(UIMeta.KeyModule, Meta.PropertyMerger_DeclareList);

      this.mirrorPropertyToContext(UIMeta.KeyEditing, UIMeta.KeyEditing);
      this.mirrorPropertyToContext(UIMeta.KeyLayout, UIMeta.KeyLayout);
      this.mirrorPropertyToContext(UIMeta.KeyComponentName, UIMeta.KeyComponentName);

      this.registerPropertyMerger(UIMeta.KeyEditing, new PropertyMerger_And());

      // this.registerValueTransformerForKey('requestContext', UIMeta.Transformer_KeyPresent);
      // this.registerValueTransformerForKey('displayGroup', UIMeta.Transformer_KeyPresent);

      // define operation hierarchy
      this.keyData(UIMeta.KeyOperation).setParent('view', 'inspect');
      this.keyData(UIMeta.KeyOperation).setParent('print', 'view');
      this.keyData(UIMeta.KeyOperation).setParent('edit', 'inspect');
      this.keyData(UIMeta.KeyOperation).setParent('search', 'inspect');
      this.keyData(UIMeta.KeyOperation).setParent('keywordSearch', 'search');
      this.keyData(UIMeta.KeyOperation).setParent('textSearch', 'keywordSearch');

      this.registerStaticallyResolvable(UIMeta.PropFieldsByZone,
        new PropFieldsByZoneResolver(),
        UIMeta.KeyClass);
      this.registerStaticallyResolvable(UIMeta.PropFieldPropertyList,
        new PropFieldPropertyListResolver(),
        UIMeta.KeyClass);
      this.registerStaticallyResolvable(UIMeta.PropLayoutsByZone,
        new PropLayoutsByZoneResolver(),
        UIMeta.KeyLayout);


      // this.registerStaticallyResolvable(UIMeta.PropLayoutsByZone , new
      // PropLayoutsByZoneResolver() , UIMeta.KeyLayout);
      // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyField);
      // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyLayout);
      // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyClass);
      // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyModule);
    } finally {
      this.endRuleSet();
    }

  }


  zones(context: Context): Array<string> {
    let zones: Array<string> = context.propertyForKey('zones');
    return (isBlank(zones)) ? Meta.toList(UIMeta.ZoneMain) : zones;
  }


  zonePath(context: Context): string {
    let zonePath: any;
    if (isPresent(context.values.get(UIMeta.KeyLayout))) {
      context.push();
      context.setScopeKey(UIMeta.KeyLayout);
      zonePath = context.propertyForKey(UIMeta.KeyZonePath);
      context.pop();
    }
    return zonePath;
  }


  newContext(isNested: boolean = false): Context {
    return new UIContext(this, isNested);
  }

  // Load system rules
  loadDefaultRuleFiles(references?: any): boolean {

    if (isPresent(SystemRules.oss)) {
      this.beginRuleSetWithRank(Meta.SystemRulePriority, 'system');
      try {
        this._loadRules(SystemRules.oss, 'system', false);
      } finally {
        this.endRuleSet();
      }
    }

    if (isPresent(SystemPersistenceRules.oss)) {
      this.beginRuleSetWithRank(Meta.SystemRulePriority + 2000, 'system-persistence');
      try {
        this._loadRules(SystemPersistenceRules.oss, 'system-persistence', false);
      } finally {
        this.endRuleSet();
      }
    }
    if (isPresent(references)) {
      this.registerComponents(references);
    }
    return false;
  }


  /**
   * loads application level rules. Application level rules are global rules
   */
  loadApplicationRules(): void {
    let aRules: Array<JsonRule>;
    let userReferences: any[];
    let appRuleFiles: string[] = ['Application'];

    if (isPresent(this.appConfig)) {
      appRuleFiles = this.appConfig.get(UIMeta.AppConfigRuleFilesParam) || ['Application'];
      userReferences = this.appConfig.get(UIMeta.AppConfigUserRulesParam);

      // make sure we have always Application and make it more additive.
      if (!ListWrapper.contains<string>(appRuleFiles, 'Application')) {
        appRuleFiles.unshift('Application');
      }
    }

    for (let ruleFile of appRuleFiles) {
      let rule = ruleFile + 'Rule';

      if (this._testRules.has(rule)) {
        // since we are in development mode and test mode is on we can check extra
        // repository used by tests, we need to check if we are not running unittest
        // and a class is not defined but unittest

        if (this._testRules.has(rule) &&
          isPresent(this._testRules.get(rule).oss)) {
          aRules = this._testRules.get(rule).oss;

          if (isPresent(aRules)) {
            this.beginRuleSetWithRank(Meta.LowRulePriority, ruleFile.toLowerCase());
            try {
              this._loadRules(aRules, ruleFile.toLowerCase(), false);
            } finally {
              this.endRuleSet();
            }
          }
        }
      } else {
        for (let i in userReferences) {
          let userRule = userReferences[i];

          if (isPresent(userRule)) {

            if (isPresent(userRule[rule]) && isPresent(userRule[rule].oss)) {
              aRules = userRule[rule].oss;
            }
          }
          if (isPresent(aRules)) {
            this.beginRuleSetWithRank(Meta.LowRulePriority, ruleFile.toLowerCase());
            try {
              this._loadRules(aRules, ruleFile.toLowerCase(), false);
            } finally {
              this.endRuleSet();
            }
          }
        }
      }

    }
  }

  loadUserRule(source: any, userClass: string): boolean {

    if (isPresent(source)) {
      this.beginRuleSetWithRank(this._ruleCount, 'user:' + userClass);
      try {
        this._loadRules(source, 'user', false);
      } finally {
        this.endRuleSet();
      }
    }
    return false;
  }


  defaultLabelGeneratorForKey(key: string): DynamicPropertyValue {
    return new _DefaultLabelGenerator(key);
  }


  registerDerivedValue(propKey: string, dynamicValue: DynamicPropertyValue,
                       contextKey: string,
                       contextValue: string): void {
    let m = new Map<string, any>();
    m.set(propKey, dynamicValue);
    this.addRule(new Rule(Meta.toList(
      new Selector(contextKey, contextValue)), m, Meta.SystemRulePriority));
  }


  registerStaticallyResolvable(propKey: string, dynamicValue: StaticallyResolvable,
                               contextKey: string): void {
    this.registerDerivedValue(propKey, new StaticDynamicWrapper(dynamicValue), contextKey,
      Meta.KeyAny);
  }

  registerDefaultLabelGeneratorForKey(key: string): void {
    this.registerDerivedValue(UIMeta.KeyLabel, new LocalizedLabelString(this), key,
      UIMeta.KeyAny);
  }

  fieldList(context: Context): Array<ItemProperties> {
    return this.itemList(context, UIMeta.KeyField, UIMeta.ZonesTLRMB);
  }

  fieldsByZones(context: Context): Map<string, any> {
    return this.itemsByZones(context, UIMeta.KeyField, UIMeta.ZonesTLRMB);
  }

  itemNamesByZones(context: Context, key: string, zones: string[]): Map<string, any> {
    let itemsByZones: Map<string, any> = this.itemsByZones(context, key, zones);
    return this.mapItemPropsToNames(itemsByZones);
  }

  mapItemPropsToNames(itemsByZones: Map<string, any>): Map<string, any> {
    let namesByZones: Map<string, any> = new Map<string, any>();

    MapWrapper.iterable(itemsByZones).forEach((value, key) => {
      if (isPresent(value) && isArray(value)) {
        let names: string[] = [];
        for (let item of value) {
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

  predecessorMap(context: Context, key: string,
                 defaultPredecessor: string): Map<string, Array<ItemProperties>> {
    let fieldInfos: Array<ItemProperties> = this.itemProperties(context, key, false);
    let predecessors: Map<string, Array<ItemProperties>> = MapWrapper.groupBy<ItemProperties>(
      fieldInfos, (item: ItemProperties) => {
        let pred = item.properties.get(UIMeta.KeyAfter);
        return isPresent(pred) ? pred : defaultPredecessor;
      });

    return predecessors;
  }

  itemList(context: Context, key: string, zones: string[]): Array<ItemProperties> {
    let predecessors: Map<string, Array<ItemProperties>> = this.predecessorMap(context, key,
      zones[0]);
    let result: Array<ItemProperties> = [];

    for (let zone of zones) {
      this.accumulatePrecessors(predecessors, zone, result);
    }
    return result;
  }

  isZoneReference(key: string): boolean {
    // keys of the form 'z<Name>' and 'foo.bar.z<Name>' are considered zone keys
    let lastDot = key.lastIndexOf('.');
    let suffix = (lastDot === -1) ? key : key.substring(lastDot + 1);
    return (suffix.length > 1) && (suffix[0] === 'z') && (
      suffix[1].toUpperCase() === suffix[1] // is uppercase ?s
    );
  }

  itemsByZones(context: Context, property: string, zones: string[]): Map<string, any> {
    let predecessors = this.predecessorMap(context, property, zones[0]);
    let byZone = new Map<string, any>();


    MapWrapper.iterable(predecessors).forEach((value, zone) => {
      if (this.isZoneReference(zone)) {
        let list: any[] = [];
        this.accumulatePrecessors(predecessors,
          zone, list);

        FieldPath.setFieldValue(byZone, zone, list);
      }
    });

    return byZone;
  }

  // recursive decent of predecessor tree...
  accumulatePrecessors(predecessors: Map<string, Array<ItemProperties>>, key: string,
                       result: any): void {
    let items: Array<ItemProperties> = predecessors.get(key);
    if (isBlank(items)) {
      return;
    }

    ListWrapper.sort<ItemProperties>(items, (o1, o2) => {
      let r1 = o1.properties.get(UIMeta.KeyRank);
      let r2 = o2.properties.get(UIMeta.KeyRank);

      if (r1 === null) {
        r1 = 100;
      }
      if (r2 === null) {
        r2 = 100;
      }

      return (r1 === r2) ? 0 : (r1 === null) ? 1 : (r2 === null) ? -1 : (r1 - r2);
    });

    for (let item of items) {
      if (!item.hidden) {
        result.push(item);
      }
      this.accumulatePrecessors(predecessors, item.name, result);
    }
  }

  /**
   * Called by Parser to handle decls like 'zLeft => lastName#required'
   *
   */
  addPredecessorRule(itemName: string, contextPreds: Array<Selector>, predecessor: string,
                     traits: any,
                     lineNumber: number): Rule {
    if (isBlank(predecessor) && isBlank(traits)) {
      return null;
    }

    let key: string = this.scopeKeyForSelector(contextPreds);
    if (isBlank(key) || key === UIMeta.KeyClass) {
      key = UIMeta.KeyField;
    }
    let selector: Array<Selector> = new Array<Selector>();
    ListWrapper.addAll<Selector>(selector, contextPreds);

    selector.push(new Selector(key, itemName));
    let props: Map<string, any> = new Map<string, any>();

    if (isPresent(predecessor)) {
      props.set(UIMeta.KeyAfter, predecessor);
    }

    if (isPresent(traits)) {
      props.set(UIMeta.KeyTrait, traits);
    }
    let rule = new Rule(selector, props, 0, lineNumber);
    this.addRule(rule);
    return rule;
  }

  flattenVisible(fieldsByZones: Map<string, Array<string>>, zoneList: string[], key: string,
                 context: Context): string[] {
    let result: string[] = [];

    if (isPresent(fieldsByZones)) {

      for (let zone of  zoneList) {
        let fields: string[] = fieldsByZones.get(zone);

        if (isBlank(fields)) {
          continue;
        }

        for (let field of fields) {
          context.push();
          context.set(key, field);
          if (context.booleanPropertyForKey(UIMeta.KeyVisible, false)) {
            result.push(field);
          }
          context.pop();
        }
      }
    }
    return result;
  }

  displayKeyForClass(className: string): string {
    // performance: should use registerDerivedValue('...', new Context.StaticDynamicWrapper
    // to get cached resolution here...
    let context = this.newContext();
    context.set(UIMeta.KeyLayout, 'LabelField');
    context.set(UIMeta.KeyClass, className);
    let fields: Array<ItemProperties> = this.itemProperties(context, UIMeta.KeyField, true);

    return ListWrapper.isEmpty(fields) ? '$toString' : fields[0].name;
  }


  displayLabel(className: string, propertiesValue: string): string {

    if (isPresent(propertiesValue)) {
      return propertiesValue;
    }
    return this.displayKeyForClass(className);
  }


  createLocalizedString(key: string, defaultValue: string): LocalizedString {
    assert(isPresent(this._currentRuleSet),
      'Attempt to create localized string without currentRuleSet in place');

    return new LocalizedString(this, this._currentRuleSet.filePath, key, defaultValue);
  }


  get routingService(): RoutingService {
    return (isPresent(this._injector)) ? this._injector.get<RoutingService>(RoutingService)
      : null;
  }

  get env(): Environment {
    return (isPresent(this._injector)) ? this._injector.get(Environment) : new Environment();
  }


  get appConfig(): AppConfig {
    return (isPresent(this._injector)) ? this._injector.get(AppConfig) : null;
  }

  /**
   * Registers framework level components and listen for user level rules to be registered.
   * After we register user level rules it will load application.oss.
   *
   *
   */
  private registerComponents(sysReferences: any): void {
    assert(isPresent(this.injector), 'Cannot register components without Injector in order' +
      ' to get access to ComponentRegistry Service');

    assert(this.env.inTest || isPresent(this.appConfig.get(UIMeta.AppConfigUserRulesParam)),
      'Unable to initialize MetaUI as user rules are missing. please use:' +
      ' metaui.rules.user-rules configuration param');

    this.componentRegistry = this.injector.get(ComponentRegistry);
    if (isPresent(this.componentRegistry)) {

      this.componentRegistry.registerTypes(sysReferences);

      if (!this.env.inTest) {
        let userReferences: any[] = this.appConfig.get(UIMeta.AppConfigUserRulesParam);
        for (let uRule of userReferences) {
          this.componentRegistry.registerTypes(uRule);
        }
        this.loadApplicationRules();
      }

    } else if (!this.env.inTest) {
      warn('UIMeta.registerComponents() No components were registered !');
    }

  }


  /**
   *
   * Just need to call it different than the other fireAction as I can not do any method
   * overloading here.
   *
   */
  fireActionFromProps(action: ItemProperties, context: Context): void {
    context.push();
    let actionCategory = action.properties.get(ObjectMeta.KeyActionCategory);
    if (isBlank(actionCategory)) {
      actionCategory = ObjectMeta.DefaultActionCategory;
    }
    context.set(ObjectMeta.KeyActionCategory, actionCategory);
    context.set(ObjectMeta.KeyAction, action.name);

    this._fireAction(context, false);
    context.pop();

  }

  fireAction(context: UIContext, withBackAction: boolean = false): void {
    context.push();
    this._fireAction(context, withBackAction);
    context.pop();

  }

  private _fireAction(context: Context, withBackAction: boolean): void {
    let actionResults = context.propertyForKey('actionResults');
    if (isBlank(actionResults) || !this.isRoute(actionResults)) {
      return;
    }
    this.naviateToPage(context, actionResults, withBackAction);
  }

  naviateToPage(context: Context, route: any, withBackAction: boolean): void {
    let params = this.prepareRoute(context, withBackAction);

    let uiContex: UIContext = <UIContext> context;
    this.routingService.navigateWithRoute(route, params, uiContex.object);
  }


  prepareRoute(context: Context, withBackAction: boolean): any {
    let params = {};
    let pageBindings = context.propertyForKey('pageBindings');
    if (isPresent(pageBindings)) {
      pageBindings.forEach((v: any, k: any) => {
        if (k !== ObjectMeta.KeyObject) {
          (<any>params)[k] = context.resolveValue(v);
        }
      });
      if (isPresent(withBackAction)) {
        (<any>params)['b'] = withBackAction;
      }

    }

    return params;
  }


  prepareRouteForComponent(component: any, context: Context, withBackAction: boolean): any {
    let params = {};
    let pageBindings = context.propertyForKey('pageBindings');
    if (isPresent(pageBindings)) {
      pageBindings.forEach((v: any, k: any) => {
        component[k] = v;
      });
    }

    return params;
  }


  gotoModule(module: ItemProperties, activatedPath?: string): void {

    this.env.deleteValue(ACTIVE_CNTX);
    let context = this.newContext();


    context.push();
    context.set(UIMeta.KeyModule, module.name);
    let pageName = context.propertyForKey(UIMeta.KeyHomePage);


    let route = this.routingService.routeForPage(pageName, module.name.toLowerCase(),
      activatedPath);
    if (activatedPath === '/') {
      activatedPath = '';
    }
    let path = `${activatedPath}/${route.path}`;

    let params = this.prepareRoute(context, null);
    context.pop();

    this.routingService.navigate([path, params], {skipLocationChange: true});
  }

  private isRoute(actionResult: any): boolean {
    return isStringMap(actionResult) && isPresent(actionResult['path']);

  }

  compPageWithName(name: string): Type<any> {
    let currType = this.componentRegistry.nameToType.get(name);
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
    let catNames: string[] = [];
    let actionCategories = this.itemList(context, ObjectMeta.KeyActionCategory, zones);

    if (isPresent(actionCategories)) {
      actionCategories.forEach((item: ItemProperties) => catNames.push(item.name));
    }

    this.addActionsForCategories(context, result, catNames);
    return actionCategories;
  }

  addActionsForCategories(context: Context, result: Map<string, Array<ItemProperties>>,
                          catNames: string[]): void {
    for (let cat of catNames) {
      context.push();
      if (cat !== ObjectMeta.DefaultActionCategory) {
        context.set(ObjectMeta.KeyActionCategory, cat);
      }

      this.collectActionsByCategory(context, result, cat);
      context.pop();
    }

  }


  collectActionsByCategory(context: Context, result: Map<string, Array<ItemProperties>>,
                           targetCat: string): void {
    let actionInfos: ItemProperties[] = this.itemProperties(context, ObjectMeta.KeyAction,
      true);
    for (let actionInfo of actionInfos) {
      context.push();
      context.set(ObjectMeta.KeyAction, actionInfo.name);

      let visible = context.booleanPropertyForKey(ObjectMeta.KeyVisible, true);
      context.pop();

      if (visible) {
        let category = actionInfo.properties.get(ObjectMeta.KeyActionCategory);

        if (category == null) {
          category = ObjectMeta.DefaultActionCategory;
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


  computeModuleInfo(context: Context = this.newContext(),
                    checkVisibility: boolean = true): ModuleInfo {

    let moduleInfo: ModuleInfo = new ModuleInfo();
    moduleInfo.modules = [];

    let allModuleProps: Array<ItemProperties> = this.itemList(context, UIMeta.KeyModule,
      UIMeta.ActionZones);
    moduleInfo.moduleNames = [];
    moduleInfo.moduleByNames = new Map<string, ItemProperties>();

    for (let module of allModuleProps) {

      context.push();
      context.set(UIMeta.KeyModule, module.name);

      if (checkVisibility && !context.booleanPropertyForKey(UIMeta.KeyVisible, true)) {
        context.pop();
        continue;
      }

      moduleInfo.moduleNames.push(module.name);

      // // todo: create typescript anotation
      // context.push();
      // context.set("homeForClasses", true);
      // let homeClasses: Array<string> = this.itemNames(context, UIMeta.KeyClass);
      // context.pop();


      let modProperties = new ItemProperties(module.name, context.allProperties(), false);
      moduleInfo.modules.push(modProperties);

      moduleInfo.moduleByNames.set(module.name, modProperties);

      context.pop();
    }

    context.push();
    context.set(UIMeta.KeyModule, moduleInfo.moduleNames);
    moduleInfo.actionsByCategory = new Map<string, Array<ItemProperties>>();
    moduleInfo.actionCategories = this.actionsByCategory(context, moduleInfo.actionsByCategory,
      UIMeta.ModuleActionZones);
    context.pop();

    return moduleInfo;
  }


  currentModuleLabel(moduleName: string, context: Context = this.newContext()): string {
    context.push();
    context.set(UIMeta.KeyModule, moduleName);
    let label: string = context.propertyForKey(UIMeta.KeyLabel);
    context.pop();

    return label;
  }

}

export class ModuleInfo {
  modules: Array<ItemProperties>;
  moduleNames: Array<string>;
  moduleByNames: Map<string, ItemProperties>;
  actionCategories: Array<ItemProperties>;
  actionsByCategory: Map<string, Array<ItemProperties>>;
}


export class LocalizedString extends DynamicPropertyValue {

  constructor(protected meta: UIMeta, protected _module: string, protected  _key: string,
              protected _defaultValue: string) {
    super();
  }

  evaluate(context: Context): any {

    let localizedString: any;
    // let clazz = context.values.get('class');
    // if (isPresent(this._key) && isPresent(this.meta.i18nService)) {
    //     let i18nKey = clazz + '.' + this._key;
    //     localizedString = this.meta.i18nService.instant(i18nKey);
    //
    //     // when it return the same string most likely it means there is no
    //     // translation so default it to null
    //     localizedString = (localizedString === i18nKey) ? null : localizedString;
    // }

    // if (isBlank(localizedString) || this._key === ObjectMeta.KeyField) {
    //     return this._defaultValue;
    // }
    return this._defaultValue;
  }

  toString(): string {
    return 'LocaledString: {' + this._key + ' - ' + this._defaultValue + ' }';
  }
}

class LocalizedLabelString extends LocalizedString implements PropertyMapAwaking {
  static DefaultModule = 'default';
  propertyAwaking: boolean = true;

  constructor(protected meta: UIMeta) {
    super(meta, LocalizedLabelString.DefaultModule, null, null);
  }

  evaluate(context: Context): any {
    if (isBlank(this._key)) {
      let scopeKey: string = context.values.get(Meta.ScopeKey);
      let scopeVal: string = context.values.get(scopeKey);

      this._defaultValue = UIMeta.defaultLabelForIdentifier(scopeVal);

      this._key = scopeKey;
    }
    return super.evaluate(context);
  }

  awakeForPropertyMap(map: PropertyMap): any {
    return new LocalizedLabelString(this.meta);
  }

}


class PropFieldsByZoneResolver extends StaticallyResolvable {


  evaluate(context: Context): any {
    let m = (<UIMeta>context.meta).itemNamesByZones(context, UIMeta.KeyField,
      (<UIMeta>context.meta).zones(context));
    let zonePath = (<UIMeta>context.meta).zonePath(context);
    if (isPresent(zonePath)) {


      m = <Map<string, any>> FieldPath.getFieldValue(m, zonePath);
      if (isBlank(m)) {
        m = new Map<string, any>();
      }
    }
    return m;
  }
}

class PropFieldPropertyListResolver extends StaticallyResolvable {

  evaluate(context: Context): any {
    return (<UIMeta>context.meta).fieldList(context);
  }
}

class PropLayoutsByZoneResolver extends StaticallyResolvable {

  evaluate(context: Context): any {
    return (<UIMeta>context.meta).itemNamesByZones(context, UIMeta.KeyLayout,
      (<UIMeta>context.meta).zones(context));
  }
}


class _DefaultLabelGenerator extends StaticallyResolvable {


  constructor(private _key: string) {
    super();
  }

  evaluate(context: Context): any {
    let fieldName = context.values.get(this._key);

    return (isPresent(fieldName) && isString(fieldName)) ?
      UIMeta.defaultLabelForIdentifier(fieldName) : null;
  }
}

/**
 * Load User defined meta data. This class is triggered as soon as we create a context and
 * pass an object into it. Based on the object we notify different Observers passing name
 * of the class and here we search if we have any Rules available for current className and
 * try to load the Rule.
 */
class UserMetaDataProvider implements ValueQueriedObserver {

  notify(meta: Meta, key: string, value: any): void {
    let aRules: Array<JsonRule>;
    let uiMeta: UIMeta = <UIMeta> meta;

    if (uiMeta._testRules.has(value + 'Rule')) {
      // since we are in development mode and test mode is on we can check extra repository
      // used by tests, we need to check if we are not running unittest and a class is not
      // application defined but unittest defined rule

      if (uiMeta._testRules.has(value + 'Rule') &&
        isPresent(uiMeta._testRules.get(value + 'Rule').oss)) {
        aRules = uiMeta._testRules.get(value + 'Rule').oss;
      }
      meta.loadUserRule(aRules, value);

    } else if (isPresent(uiMeta.appConfig) &&
      uiMeta.appConfig.get(UIMeta.AppConfigUserRulesParam)) {

      let userReferences: any[] = uiMeta.appConfig.get(UIMeta.AppConfigUserRulesParam);

      for (let i in userReferences) {
        if (isPresent(userReferences[i][value + 'Rule']) &&
          isPresent(userReferences[i][value + 'Rule'].oss)) {
          aRules = userReferences[i][value + 'Rule'].oss;
        }
      }
      meta.loadUserRule(aRules, value);
    }
  }

}
