/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { AppConfig, assert, decamelize, Environment, FieldPath, isArray, isBlank, isPresent, isString, isStringMap, ListWrapper, MapWrapper, RoutingService, warn } from '@aribaui/core';
import { ObjectMeta } from './object-meta';
import { ComponentRegistry } from '@aribaui/components';
import { Meta, PropertyMerger_And } from './meta';
import { UIContext } from './context';
import { SystemRules } from './widgets-rules';
import { DynamicPropertyValue, StaticallyResolvable, StaticDynamicWrapper } from './property-value';
import { Rule, Selector } from './rule';
import { ItemProperties } from './item-properties';
import { SystemPersistenceRules } from './persistence-rules';
import { ACTIVE_CNTX } from './meta-context/meta-context.component';
/**
 * UIMeta is responsible setting layouts and all around this. We can either use this as a singleton
 * or use it as a service using Angular \@Inject()
 * Right now we use still singleton as we need this class as a library for some other projects
 *
 *
 * todo: Convert to Injectable
 */
export class UIMeta extends ObjectMeta {
    constructor() {
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
            this.registerStaticallyResolvable(UIMeta.PropFieldsByZone, new PropFieldsByZoneResolver(), UIMeta.KeyClass);
            this.registerStaticallyResolvable(UIMeta.PropFieldPropertyList, new PropFieldPropertyListResolver(), UIMeta.KeyClass);
            this.registerStaticallyResolvable(UIMeta.PropLayoutsByZone, new PropLayoutsByZoneResolver(), UIMeta.KeyLayout);
            // this.registerStaticallyResolvable(UIMeta.PropLayoutsByZone , new
            // PropLayoutsByZoneResolver() , UIMeta.KeyLayout);
            // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyField);
            // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyLayout);
            // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyClass);
            // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyModule);
        }
        finally {
            this.endRuleSet();
        }
    }
    /**
     * @return {?}
     */
    static getInstance() {
        return this._instance || (this._instance = new this());
    }
    /**
     * @param {?} fieldName
     * @return {?}
     */
    static defaultLabelForIdentifier(fieldName) {
        let /** @type {?} */ lastDot = fieldName.lastIndexOf('.');
        if (lastDot !== -1 && lastDot !== fieldName.length - 1) {
            fieldName = fieldName.substring(lastDot + 1);
        }
        return decamelize(fieldName);
    }
    /**
     * @param {?} className
     * @return {?}
     */
    static beautifyClassName(className) {
        return decamelize(className, ' ');
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static beautifyFileName(field) {
        return decamelize(field, ' ');
    }
    /**
     * @param {?} context
     * @return {?}
     */
    zones(context) {
        let /** @type {?} */ zones = context.propertyForKey('zones');
        return (isBlank(zones)) ? Meta.toList(UIMeta.ZoneMain) : zones;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    zonePath(context) {
        let /** @type {?} */ zonePath;
        if (isPresent(context.values.get(UIMeta.KeyLayout))) {
            context.push();
            context.setScopeKey(UIMeta.KeyLayout);
            zonePath = context.propertyForKey(UIMeta.KeyZonePath);
            context.pop();
        }
        return zonePath;
    }
    /**
     * @param {?=} isNested
     * @return {?}
     */
    newContext(isNested = false) {
        return new UIContext(this, isNested);
    }
    /**
     * @param {?=} references
     * @return {?}
     */
    loadDefaultRuleFiles(references) {
        if (isPresent(SystemRules.oss)) {
            this.beginRuleSetWithRank(Meta.SystemRulePriority, 'system');
            try {
                this._loadRules(SystemRules.oss, 'system', false);
            }
            finally {
                this.endRuleSet();
            }
        }
        if (isPresent(SystemPersistenceRules.oss)) {
            this.beginRuleSetWithRank(Meta.SystemRulePriority + 2000, 'system-persistence');
            try {
                this._loadRules(SystemPersistenceRules.oss, 'system-persistence', false);
            }
            finally {
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
     * @return {?}
     */
    loadApplicationRules() {
        let /** @type {?} */ aRules;
        let /** @type {?} */ userReferences;
        let /** @type {?} */ appRuleFiles = ['Application'];
        if (isPresent(this.appConfig)) {
            appRuleFiles = this.appConfig.get(UIMeta.AppConfigRuleFilesParam) || ['Application'];
            userReferences = this.appConfig.get(UIMeta.AppConfigUserRulesParam);
            // make sure we have always Application and make it more additive.
            if (!ListWrapper.contains(appRuleFiles, 'Application')) {
                appRuleFiles.unshift('Application');
            }
        }
        for (let /** @type {?} */ ruleFile of appRuleFiles) {
            let /** @type {?} */ rule = ruleFile + 'Rule';
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
                        }
                        finally {
                            this.endRuleSet();
                        }
                    }
                }
            }
            else {
                for (let /** @type {?} */ i in userReferences) {
                    let /** @type {?} */ userRule = userReferences[i];
                    if (isPresent(userRule)) {
                        if (isPresent(userRule[rule]) && isPresent(userRule[rule].oss)) {
                            aRules = userRule[rule].oss;
                        }
                    }
                    if (isPresent(aRules)) {
                        this.beginRuleSetWithRank(Meta.LowRulePriority, ruleFile.toLowerCase());
                        try {
                            this._loadRules(aRules, ruleFile.toLowerCase(), false);
                        }
                        finally {
                            this.endRuleSet();
                        }
                    }
                }
            }
        }
    }
    /**
     * @param {?} source
     * @param {?} userClass
     * @return {?}
     */
    loadUserRule(source, userClass) {
        if (isPresent(source)) {
            this.beginRuleSetWithRank(this._ruleCount, 'user:' + userClass);
            try {
                this._loadRules(source, 'user', false);
            }
            finally {
                this.endRuleSet();
            }
        }
        return false;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    defaultLabelGeneratorForKey(key) {
        return new _DefaultLabelGenerator(key);
    }
    /**
     * @param {?} propKey
     * @param {?} dynamicValue
     * @param {?} contextKey
     * @param {?} contextValue
     * @return {?}
     */
    registerDerivedValue(propKey, dynamicValue, contextKey, contextValue) {
        let /** @type {?} */ m = new Map();
        m.set(propKey, dynamicValue);
        this.addRule(new Rule(Meta.toList(new Selector(contextKey, contextValue)), m, Meta.SystemRulePriority));
    }
    /**
     * @param {?} propKey
     * @param {?} dynamicValue
     * @param {?} contextKey
     * @return {?}
     */
    registerStaticallyResolvable(propKey, dynamicValue, contextKey) {
        this.registerDerivedValue(propKey, new StaticDynamicWrapper(dynamicValue), contextKey, Meta.KeyAny);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    registerDefaultLabelGeneratorForKey(key) {
        this.registerDerivedValue(UIMeta.KeyLabel, new LocalizedLabelString(this), key, UIMeta.KeyAny);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    fieldList(context) {
        return this.itemList(context, UIMeta.KeyField, UIMeta.ZonesTLRMB);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    fieldsByZones(context) {
        return this.itemsByZones(context, UIMeta.KeyField, UIMeta.ZonesTLRMB);
    }
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} zones
     * @return {?}
     */
    itemNamesByZones(context, key, zones) {
        let /** @type {?} */ itemsByZones = this.itemsByZones(context, key, zones);
        return this.mapItemPropsToNames(itemsByZones);
    }
    /**
     * @param {?} itemsByZones
     * @return {?}
     */
    mapItemPropsToNames(itemsByZones) {
        let /** @type {?} */ namesByZones = new Map();
        MapWrapper.iterable(itemsByZones).forEach((value, key) => {
            if (isPresent(value) && isArray(value)) {
                let /** @type {?} */ names = [];
                for (let /** @type {?} */ item of value) {
                    if (item instanceof ItemProperties) {
                        names.push((/** @type {?} */ (item)).name);
                    }
                }
                namesByZones.set(key, names);
            }
            else {
                namesByZones.set(key, this.mapItemPropsToNames(value));
            }
        });
        return namesByZones;
    }
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} defaultPredecessor
     * @return {?}
     */
    predecessorMap(context, key, defaultPredecessor) {
        let /** @type {?} */ fieldInfos = this.itemProperties(context, key, false);
        let /** @type {?} */ predecessors = MapWrapper.groupBy(fieldInfos, (item) => {
            let /** @type {?} */ pred = item.properties.get(UIMeta.KeyAfter);
            return isPresent(pred) ? pred : defaultPredecessor;
        });
        return predecessors;
    }
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} zones
     * @return {?}
     */
    itemList(context, key, zones) {
        let /** @type {?} */ predecessors = this.predecessorMap(context, key, zones[0]);
        let /** @type {?} */ result = [];
        for (let /** @type {?} */ zone of zones) {
            this.accumulatePrecessors(predecessors, zone, result);
        }
        return result;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    isZoneReference(key) {
        // keys of the form 'z<Name>' and 'foo.bar.z<Name>' are considered zone keys
        let /** @type {?} */ lastDot = key.lastIndexOf('.');
        let /** @type {?} */ suffix = (lastDot === -1) ? key : key.substring(lastDot + 1);
        return (suffix.length > 1) && (suffix[0] === 'z') && (suffix[1].toUpperCase() === suffix[1] // is uppercase ?s
        );
    }
    /**
     * @param {?} context
     * @param {?} property
     * @param {?} zones
     * @return {?}
     */
    itemsByZones(context, property, zones) {
        let /** @type {?} */ predecessors = this.predecessorMap(context, property, zones[0]);
        let /** @type {?} */ byZone = new Map();
        MapWrapper.iterable(predecessors).forEach((value, zone) => {
            if (this.isZoneReference(zone)) {
                let /** @type {?} */ list = [];
                this.accumulatePrecessors(predecessors, zone, list);
                FieldPath.setFieldValue(byZone, zone, list);
            }
        });
        return byZone;
    }
    /**
     * @param {?} predecessors
     * @param {?} key
     * @param {?} result
     * @return {?}
     */
    accumulatePrecessors(predecessors, key, result) {
        let /** @type {?} */ items = predecessors.get(key);
        if (isBlank(items)) {
            return;
        }
        ListWrapper.sort(items, (o1, o2) => {
            let /** @type {?} */ r1 = o1.properties.get(UIMeta.KeyRank);
            let /** @type {?} */ r2 = o2.properties.get(UIMeta.KeyRank);
            if (r1 === null) {
                r1 = 100;
            }
            if (r2 === null) {
                r2 = 100;
            }
            return (r1 === r2) ? 0 : (r1 === null) ? 1 : (r2 === null) ? -1 : (r1 - r2);
        });
        for (let /** @type {?} */ item of items) {
            if (!item.hidden) {
                result.push(item);
            }
            this.accumulatePrecessors(predecessors, item.name, result);
        }
    }
    /**
     * Called by Parser to handle decls like 'zLeft => lastName#required'
     *
     * @param {?} itemName
     * @param {?} contextPreds
     * @param {?} predecessor
     * @param {?} traits
     * @param {?} lineNumber
     * @return {?}
     */
    addPredecessorRule(itemName, contextPreds, predecessor, traits, lineNumber) {
        if (isBlank(predecessor) && isBlank(traits)) {
            return null;
        }
        let /** @type {?} */ key = this.scopeKeyForSelector(contextPreds);
        if (isBlank(key) || key === UIMeta.KeyClass) {
            key = UIMeta.KeyField;
        }
        let /** @type {?} */ selector = new Array();
        ListWrapper.addAll(selector, contextPreds);
        selector.push(new Selector(key, itemName));
        let /** @type {?} */ props = new Map();
        if (isPresent(predecessor)) {
            props.set(UIMeta.KeyAfter, predecessor);
        }
        if (isPresent(traits)) {
            props.set(UIMeta.KeyTrait, traits);
        }
        let /** @type {?} */ rule = new Rule(selector, props, 0, lineNumber);
        this.addRule(rule);
        return rule;
    }
    /**
     * @param {?} fieldsByZones
     * @param {?} zoneList
     * @param {?} key
     * @param {?} context
     * @return {?}
     */
    flattenVisible(fieldsByZones, zoneList, key, context) {
        let /** @type {?} */ result = [];
        if (isPresent(fieldsByZones)) {
            for (let /** @type {?} */ zone of zoneList) {
                let /** @type {?} */ fields = fieldsByZones.get(zone);
                if (isBlank(fields)) {
                    continue;
                }
                for (let /** @type {?} */ field of fields) {
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
    /**
     * @param {?} className
     * @return {?}
     */
    displayKeyForClass(className) {
        // performance: should use registerDerivedValue('...', new Context.StaticDynamicWrapper
        // to get cached resolution here...
        let /** @type {?} */ context = this.newContext();
        context.set(UIMeta.KeyLayout, 'LabelField');
        context.set(UIMeta.KeyClass, className);
        let /** @type {?} */ fields = this.itemProperties(context, UIMeta.KeyField, true);
        return ListWrapper.isEmpty(fields) ? '$toString' : fields[0].name;
    }
    /**
     * @param {?} className
     * @param {?} propertiesValue
     * @return {?}
     */
    displayLabel(className, propertiesValue) {
        if (isPresent(propertiesValue)) {
            return propertiesValue;
        }
        return this.displayKeyForClass(className);
    }
    /**
     * @param {?} key
     * @param {?} defaultValue
     * @return {?}
     */
    createLocalizedString(key, defaultValue) {
        assert(isPresent(this._currentRuleSet), 'Attempt to create localized string without currentRuleSet in place');
        return new LocalizedString(this, this._currentRuleSet.filePath, key, defaultValue);
    }
    /**
     * @return {?}
     */
    get routingService() {
        return (isPresent(this._injector)) ? this._injector.get(RoutingService) : null;
    }
    /**
     * @return {?}
     */
    get env() {
        return (isPresent(this._injector)) ? this._injector.get(Environment) : new Environment();
    }
    /**
     * @return {?}
     */
    get appConfig() {
        return (isPresent(this._injector)) ? this._injector.get(AppConfig) : null;
    }
    /**
     * Registers framework level components and listen for user level rules to be registered.
     * After we register user level rules it will load application.oss.
     *
     *
     * @param {?} sysReferences
     * @return {?}
     */
    registerComponents(sysReferences) {
        assert(isPresent(this.injector), 'Cannot register components without Injector in order' +
            ' to get access to ComponentRegistry Service');
        assert(this.env.inTest || isPresent(this.appConfig.get(UIMeta.AppConfigUserRulesParam)), 'Unable to initialize MetaUI as user rules are missing. please use:' +
            ' metaui.rules.user-rules configuration param');
        this.componentRegistry = this.injector.get(ComponentRegistry);
        if (isPresent(this.componentRegistry)) {
            this.componentRegistry.registerTypes(sysReferences);
            if (!this.env.inTest) {
                let /** @type {?} */ userReferences = this.appConfig.get(UIMeta.AppConfigUserRulesParam);
                for (let /** @type {?} */ uRule of userReferences) {
                    this.componentRegistry.registerTypes(uRule);
                }
                this.loadApplicationRules();
            }
        }
        else if (!this.env.inTest) {
            warn('UIMeta.registerComponents() No components were registered !');
        }
    }
    /**
     *
     * Just need to call it different than the other fireAction as I can not do any method
     * overloading here.
     *
     * @param {?} action
     * @param {?} context
     * @return {?}
     */
    fireActionFromProps(action, context) {
        context.push();
        let /** @type {?} */ actionCategory = action.properties.get(ObjectMeta.KeyActionCategory);
        if (isBlank(actionCategory)) {
            actionCategory = ObjectMeta.DefaultActionCategory;
        }
        context.set(ObjectMeta.KeyActionCategory, actionCategory);
        context.set(ObjectMeta.KeyAction, action.name);
        this._fireAction(context, false);
        context.pop();
    }
    /**
     * @param {?} context
     * @param {?=} withBackAction
     * @return {?}
     */
    fireAction(context, withBackAction = false) {
        context.push();
        this._fireAction(context, withBackAction);
        context.pop();
    }
    /**
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    _fireAction(context, withBackAction) {
        let /** @type {?} */ actionResults = context.propertyForKey('actionResults');
        if (isBlank(actionResults) || !this.isRoute(actionResults)) {
            return;
        }
        this.naviateToPage(context, actionResults, withBackAction);
    }
    /**
     * @param {?} context
     * @param {?} route
     * @param {?} withBackAction
     * @return {?}
     */
    naviateToPage(context, route, withBackAction) {
        let /** @type {?} */ params = this.prepareRoute(context, withBackAction);
        let /** @type {?} */ uiContex = /** @type {?} */ (context);
        this.routingService.navigateWithRoute(route, params, uiContex.object);
    }
    /**
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    prepareRoute(context, withBackAction) {
        let /** @type {?} */ params = {};
        let /** @type {?} */ pageBindings = context.propertyForKey('pageBindings');
        if (isPresent(pageBindings)) {
            pageBindings.forEach((v, k) => {
                if (k !== ObjectMeta.KeyObject) {
                    (/** @type {?} */ (params))[k] = context.resolveValue(v);
                }
            });
            if (isPresent(withBackAction)) {
                (/** @type {?} */ (params))['b'] = withBackAction;
            }
        }
        return params;
    }
    /**
     * @param {?} component
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    prepareRouteForComponent(component, context, withBackAction) {
        let /** @type {?} */ params = {};
        let /** @type {?} */ pageBindings = context.propertyForKey('pageBindings');
        if (isPresent(pageBindings)) {
            pageBindings.forEach((v, k) => {
                component[k] = v;
            });
        }
        return params;
    }
    /**
     * @param {?} module
     * @param {?=} activatedPath
     * @return {?}
     */
    gotoModule(module, activatedPath) {
        this.env.deleteValue(ACTIVE_CNTX);
        let /** @type {?} */ context = this.newContext();
        context.push();
        context.set(UIMeta.KeyModule, module.name);
        let /** @type {?} */ pageName = context.propertyForKey(UIMeta.KeyHomePage);
        let /** @type {?} */ route = this.routingService.routeForPage(pageName, module.name.toLowerCase(), activatedPath);
        if (activatedPath === '/') {
            activatedPath = '';
        }
        let /** @type {?} */ path = `${activatedPath}/${route.path}`;
        let /** @type {?} */ params = this.prepareRoute(context, null);
        context.pop();
        this.routingService.navigate([path, params], { skipLocationChange: true });
    }
    /**
     * @param {?} actionResult
     * @return {?}
     */
    isRoute(actionResult) {
        return isStringMap(actionResult) && isPresent(actionResult['path']);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    compPageWithName(name) {
        let /** @type {?} */ currType = this.componentRegistry.nameToType.get(name);
        if (isBlank(currType)) {
            assert(false, name + ' component does not exists. Create Dummy Component instead of' +
                ' throwing this error');
            return;
        }
        return currType;
    }
    /**
     * @param {?} context
     * @param {?} result
     * @param {?} zones
     * @return {?}
     */
    actionsByCategory(context, result, zones) {
        let /** @type {?} */ catNames = [];
        let /** @type {?} */ actionCategories = this.itemList(context, ObjectMeta.KeyActionCategory, zones);
        if (isPresent(actionCategories)) {
            actionCategories.forEach((item) => catNames.push(item.name));
        }
        this.addActionsForCategories(context, result, catNames);
        return actionCategories;
    }
    /**
     * @param {?} context
     * @param {?} result
     * @param {?} catNames
     * @return {?}
     */
    addActionsForCategories(context, result, catNames) {
        for (let /** @type {?} */ cat of catNames) {
            context.push();
            if (cat !== ObjectMeta.DefaultActionCategory) {
                context.set(ObjectMeta.KeyActionCategory, cat);
            }
            this.collectActionsByCategory(context, result, cat);
            context.pop();
        }
    }
    /**
     * @param {?} context
     * @param {?} result
     * @param {?} targetCat
     * @return {?}
     */
    collectActionsByCategory(context, result, targetCat) {
        let /** @type {?} */ actionInfos = this.itemProperties(context, ObjectMeta.KeyAction, true);
        for (let /** @type {?} */ actionInfo of actionInfos) {
            context.push();
            context.set(ObjectMeta.KeyAction, actionInfo.name);
            let /** @type {?} */ visible = context.booleanPropertyForKey(ObjectMeta.KeyVisible, true);
            context.pop();
            if (visible) {
                let /** @type {?} */ category = actionInfo.properties.get(ObjectMeta.KeyActionCategory);
                if (category == null) {
                    category = ObjectMeta.DefaultActionCategory;
                }
                if (targetCat !== category) {
                    continue;
                }
                let /** @type {?} */ forCategory = result.get(category);
                if (isBlank(forCategory)) {
                    forCategory = [];
                    result.set(category, forCategory);
                }
                forCategory.push(actionInfo);
            }
        }
    }
    /**
     * @param {?=} context
     * @param {?=} checkVisibility
     * @return {?}
     */
    computeModuleInfo(context = this.newContext(), checkVisibility = true) {
        let /** @type {?} */ moduleInfo = new ModuleInfo();
        moduleInfo.modules = [];
        let /** @type {?} */ allModuleProps = this.itemList(context, UIMeta.KeyModule, UIMeta.ActionZones);
        moduleInfo.moduleNames = [];
        moduleInfo.moduleByNames = new Map();
        for (let /** @type {?} */ module of allModuleProps) {
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
            let /** @type {?} */ modProperties = new ItemProperties(module.name, context.allProperties(), false);
            moduleInfo.modules.push(modProperties);
            moduleInfo.moduleByNames.set(module.name, modProperties);
            context.pop();
        }
        context.push();
        context.set(UIMeta.KeyModule, moduleInfo.moduleNames);
        moduleInfo.actionsByCategory = new Map();
        moduleInfo.actionCategories = this.actionsByCategory(context, moduleInfo.actionsByCategory, UIMeta.ModuleActionZones);
        context.pop();
        return moduleInfo;
    }
    /**
     * @param {?} moduleName
     * @param {?=} context
     * @return {?}
     */
    currentModuleLabel(moduleName, context = this.newContext()) {
        context.push();
        context.set(UIMeta.KeyModule, moduleName);
        let /** @type {?} */ label = context.propertyForKey(UIMeta.KeyLabel);
        context.pop();
        return label;
    }
}
UIMeta.KeyOperation = 'operation';
UIMeta.KeyModule = 'module';
UIMeta.KeyLayout = 'layout';
UIMeta.KeyArea = 'area';
UIMeta.KeyEditing = 'editing';
UIMeta.KeyAfter = 'after';
UIMeta.KeyHidden = 'hidden';
UIMeta.KeyLabel = 'label';
UIMeta.KeyComponentName = 'component';
UIMeta.KeyBindings = 'bindings';
UIMeta.KeyHomePage = 'homePage';
UIMeta.KeyZonePath = 'zonePath';
UIMeta.PropFieldsByZone = 'fieldsByZone';
UIMeta.PropIsFieldsByZone = 'fiveZoneLayout';
UIMeta.PropActionsByCategory = 'actionsByCategory';
UIMeta.PropActionCategories = 'actionCategories';
UIMeta.PropFieldPropertyList = 'fieldPropertyList';
UIMeta.PropLayoutsByZone = 'layoutsByZone';
UIMeta.KeyWrapperComponent = 'wrapperComponent';
UIMeta.KeyWrapperBinding = 'wrapperBindings';
UIMeta.RootPredecessorKey = '_root';
UIMeta.ZoneMain = 'zMain';
UIMeta.ZoneTop = 'zTop';
UIMeta.ZoneLeft = 'zLeft';
UIMeta.ZoneMiddle = 'zMiddle';
UIMeta.ZoneRight = 'zRight';
UIMeta.ZoneBottom = 'zBottom';
UIMeta.ZoneDetail = 'zDetail';
UIMeta.AppConfigRuleFilesParam = 'metaui.rules.file-names';
UIMeta.AppConfigUserRulesParam = 'metaui.rules.user-rules';
UIMeta.ZonesTLRMB = [
    UIMeta.ZoneTop, UIMeta.ZoneLeft, UIMeta.ZoneMiddle,
    UIMeta.ZoneRight, UIMeta.ZoneBottom
];
UIMeta.ZonesMTLRB = [
    UIMeta.ZoneMain, UIMeta.ZoneTop, UIMeta.ZoneLeft, UIMeta.ZoneRight, UIMeta.ZoneBottom
];
UIMeta.ZonesDetail = [UIMeta.ZoneDetail];
UIMeta._instance = null;
UIMeta.ModuleActionZones = ['zNav', 'zGlobal'];
UIMeta.ActionZones = ['zGlobal', 'zMain', 'zGeneral'];
function UIMeta_tsickle_Closure_declarations() {
    /** @type {?} */
    UIMeta.KeyOperation;
    /** @type {?} */
    UIMeta.KeyModule;
    /** @type {?} */
    UIMeta.KeyLayout;
    /** @type {?} */
    UIMeta.KeyArea;
    /** @type {?} */
    UIMeta.KeyEditing;
    /** @type {?} */
    UIMeta.KeyAfter;
    /** @type {?} */
    UIMeta.KeyHidden;
    /** @type {?} */
    UIMeta.KeyLabel;
    /** @type {?} */
    UIMeta.KeyComponentName;
    /** @type {?} */
    UIMeta.KeyBindings;
    /** @type {?} */
    UIMeta.KeyHomePage;
    /** @type {?} */
    UIMeta.KeyZonePath;
    /** @type {?} */
    UIMeta.PropFieldsByZone;
    /** @type {?} */
    UIMeta.PropIsFieldsByZone;
    /** @type {?} */
    UIMeta.PropActionsByCategory;
    /** @type {?} */
    UIMeta.PropActionCategories;
    /** @type {?} */
    UIMeta.PropFieldPropertyList;
    /** @type {?} */
    UIMeta.PropLayoutsByZone;
    /** @type {?} */
    UIMeta.KeyWrapperComponent;
    /** @type {?} */
    UIMeta.KeyWrapperBinding;
    /** @type {?} */
    UIMeta.RootPredecessorKey;
    /** @type {?} */
    UIMeta.ZoneMain;
    /** @type {?} */
    UIMeta.ZoneTop;
    /** @type {?} */
    UIMeta.ZoneLeft;
    /** @type {?} */
    UIMeta.ZoneMiddle;
    /** @type {?} */
    UIMeta.ZoneRight;
    /** @type {?} */
    UIMeta.ZoneBottom;
    /** @type {?} */
    UIMeta.ZoneDetail;
    /** @type {?} */
    UIMeta.AppConfigRuleFilesParam;
    /** @type {?} */
    UIMeta.AppConfigUserRulesParam;
    /** @type {?} */
    UIMeta.ZonesTLRMB;
    /** @type {?} */
    UIMeta.ZonesMTLRB;
    /** @type {?} */
    UIMeta.ZonesDetail;
    /** @type {?} */
    UIMeta._instance;
    /** @type {?} */
    UIMeta.ModuleActionZones;
    /** @type {?} */
    UIMeta.ActionZones;
}
export class ModuleInfo {
}
function ModuleInfo_tsickle_Closure_declarations() {
    /** @type {?} */
    ModuleInfo.prototype.modules;
    /** @type {?} */
    ModuleInfo.prototype.moduleNames;
    /** @type {?} */
    ModuleInfo.prototype.moduleByNames;
    /** @type {?} */
    ModuleInfo.prototype.actionCategories;
    /** @type {?} */
    ModuleInfo.prototype.actionsByCategory;
}
export class LocalizedString extends DynamicPropertyValue {
    /**
     * @param {?} meta
     * @param {?} _module
     * @param {?} _key
     * @param {?} _defaultValue
     */
    constructor(meta, _module, _key, _defaultValue) {
        super();
        this.meta = meta;
        this._module = _module;
        this._key = _key;
        this._defaultValue = _defaultValue;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        let /** @type {?} */ localizedString;
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
    /**
     * @return {?}
     */
    toString() {
        return 'LocaledString: {' + this._key + ' - ' + this._defaultValue + ' }';
    }
}
function LocalizedString_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalizedString.prototype.meta;
    /** @type {?} */
    LocalizedString.prototype._module;
    /** @type {?} */
    LocalizedString.prototype._key;
    /** @type {?} */
    LocalizedString.prototype._defaultValue;
}
class LocalizedLabelString extends LocalizedString {
    /**
     * @param {?} meta
     */
    constructor(meta) {
        super(meta, LocalizedLabelString.DefaultModule, null, null);
        this.meta = meta;
        this.propertyAwaking = true;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        if (isBlank(this._key)) {
            let /** @type {?} */ scopeKey = context.values.get(Meta.ScopeKey);
            let /** @type {?} */ scopeVal = context.values.get(scopeKey);
            this._defaultValue = UIMeta.defaultLabelForIdentifier(scopeVal);
            this._key = scopeKey;
        }
        return super.evaluate(context);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    awakeForPropertyMap(map) {
        return new LocalizedLabelString(this.meta);
    }
}
LocalizedLabelString.DefaultModule = 'default';
function LocalizedLabelString_tsickle_Closure_declarations() {
    /** @type {?} */
    LocalizedLabelString.DefaultModule;
    /** @type {?} */
    LocalizedLabelString.prototype.propertyAwaking;
    /** @type {?} */
    LocalizedLabelString.prototype.meta;
}
class PropFieldsByZoneResolver extends StaticallyResolvable {
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        let /** @type {?} */ m = (/** @type {?} */ (context.meta)).itemNamesByZones(context, UIMeta.KeyField, (/** @type {?} */ (context.meta)).zones(context));
        let /** @type {?} */ zonePath = (/** @type {?} */ (context.meta)).zonePath(context);
        if (isPresent(zonePath)) {
            m = /** @type {?} */ (FieldPath.getFieldValue(m, zonePath));
            if (isBlank(m)) {
                m = new Map();
            }
        }
        return m;
    }
}
class PropFieldPropertyListResolver extends StaticallyResolvable {
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        return (/** @type {?} */ (context.meta)).fieldList(context);
    }
}
class PropLayoutsByZoneResolver extends StaticallyResolvable {
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        return (/** @type {?} */ (context.meta)).itemNamesByZones(context, UIMeta.KeyLayout, (/** @type {?} */ (context.meta)).zones(context));
    }
}
class _DefaultLabelGenerator extends StaticallyResolvable {
    /**
     * @param {?} _key
     */
    constructor(_key) {
        super();
        this._key = _key;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        let /** @type {?} */ fieldName = context.values.get(this._key);
        return (isPresent(fieldName) && isString(fieldName)) ?
            UIMeta.defaultLabelForIdentifier(fieldName) : null;
    }
}
function _DefaultLabelGenerator_tsickle_Closure_declarations() {
    /** @type {?} */
    _DefaultLabelGenerator.prototype._key;
}
/**
 * Load User defined meta data. This class is triggered as soon as we create a context and
 * pass an object into it. Based on the object we notify different Observers passing name
 * of the class and here we search if we have any Rules available for current className and
 * try to load the Rule.
 */
class UserMetaDataProvider {
    /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    notify(meta, key, value) {
        let /** @type {?} */ aRules;
        let /** @type {?} */ uiMeta = /** @type {?} */ (meta);
        if (uiMeta._testRules.has(value + 'Rule')) {
            // since we are in development mode and test mode is on we can check extra repository
            // used by tests, we need to check if we are not running unittest and a class is not
            // application defined but unittest defined rule
            if (uiMeta._testRules.has(value + 'Rule') &&
                isPresent(uiMeta._testRules.get(value + 'Rule').oss)) {
                aRules = uiMeta._testRules.get(value + 'Rule').oss;
            }
            meta.loadUserRule(aRules, value);
        }
        else if (isPresent(uiMeta.appConfig) &&
            uiMeta.appConfig.get(UIMeta.AppConfigUserRulesParam)) {
            let /** @type {?} */ userReferences = uiMeta.appConfig.get(UIMeta.AppConfigUserRulesParam);
            for (let /** @type {?} */ i in userReferences) {
                if (isPresent(userReferences[i][value + 'Rule']) &&
                    isPresent(userReferences[i][value + 'Rule'].oss)) {
                    aRules = userReferences[i][value + 'Rule'].oss;
                }
            }
            meta.loadUserRule(aRules, value);
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWltZXRhLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsiY29yZS91aW1ldGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFdBQVcsRUFDWCxVQUFVLEVBQ1YsY0FBYyxFQUNkLElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFDSCxJQUFJLEVBR0osa0JBQWtCLEVBRXJCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBVSxTQUFTLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xHLE9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXRDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sdUNBQXVDLENBQUM7Ozs7Ozs7OztBQWFsRSxNQUFNLGFBQWMsU0FBUSxVQUFVOztRQXdFOUIsS0FBSyxFQUFFLENBQUM7Ozs7UUFNUixJQUFJLENBQUM7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVCLElBQUksQ0FB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RCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNwQztLQUNKO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFwcENvbmZpZyxcbiAgICBhc3NlcnQsXG4gICAgZGVjYW1lbGl6ZSxcbiAgICBFbnZpcm9ubWVudCxcbiAgICBGaWVsZFBhdGgsXG4gICAgaXNBcnJheSxcbiAgICBpc0JsYW5rLFxuICAgIGlzUHJlc2VudCxcbiAgICBpc1N0cmluZyxcbiAgICBpc1N0cmluZ01hcCxcbiAgICBMaXN0V3JhcHBlcixcbiAgICBNYXBXcmFwcGVyLFxuICAgIFJvdXRpbmdTZXJ2aWNlLFxuICAgIHdhcm5cbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge09iamVjdE1ldGF9IGZyb20gJy4vb2JqZWN0LW1ldGEnO1xuaW1wb3J0IHtDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5pbXBvcnQge1xuICAgIE1ldGEsXG4gICAgUHJvcGVydHlNYXAsXG4gICAgUHJvcGVydHlNYXBBd2FraW5nLFxuICAgIFByb3BlcnR5TWVyZ2VyX0FuZCxcbiAgICBWYWx1ZVF1ZXJpZWRPYnNlcnZlclxufSBmcm9tICcuL21ldGEnO1xuaW1wb3J0IHtDb250ZXh0LCBVSUNvbnRleHR9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQge1N5c3RlbVJ1bGVzfSBmcm9tICcuL3dpZGdldHMtcnVsZXMnO1xuaW1wb3J0IHtEeW5hbWljUHJvcGVydHlWYWx1ZSwgU3RhdGljYWxseVJlc29sdmFibGUsIFN0YXRpY0R5bmFtaWNXcmFwcGVyfSBmcm9tICcuL3Byb3BlcnR5LXZhbHVlJztcbmltcG9ydCB7UnVsZSwgU2VsZWN0b3J9IGZyb20gJy4vcnVsZSc7XG5pbXBvcnQge0pzb25SdWxlfSBmcm9tICcuL2pzb24tcnVsZSc7XG5pbXBvcnQge0l0ZW1Qcm9wZXJ0aWVzfSBmcm9tICcuL2l0ZW0tcHJvcGVydGllcyc7XG5pbXBvcnQge1N5c3RlbVBlcnNpc3RlbmNlUnVsZXN9IGZyb20gJy4vcGVyc2lzdGVuY2UtcnVsZXMnO1xuaW1wb3J0IHtBQ1RJVkVfQ05UWH0gZnJvbSAnLi9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBVSU1ldGEgaXMgcmVzcG9uc2libGUgc2V0dGluZyBsYXlvdXRzIGFuZCBhbGwgYXJvdW5kIHRoaXMuIFdlIGNhbiBlaXRoZXIgdXNlIHRoaXMgYXMgYSBzaW5nbGV0b25cbiAqIG9yIHVzZSBpdCBhcyBhIHNlcnZpY2UgdXNpbmcgQW5ndWxhciBASW5qZWN0KClcbiAqIFJpZ2h0IG5vdyB3ZSB1c2Ugc3RpbGwgc2luZ2xldG9uIGFzIHdlIG5lZWQgdGhpcyBjbGFzcyBhcyBhIGxpYnJhcnkgZm9yIHNvbWUgb3RoZXIgcHJvamVjdHNcbiAqXG4gKlxuICogdG9kbzogQ29udmVydCB0byBJbmplY3RhYmxlXG4gKi9cblxuICAgIC8vIEBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVSU1ldGEgZXh0ZW5kcyBPYmplY3RNZXRhIHtcbiAgICBzdGF0aWMgS2V5T3BlcmF0aW9uID0gJ29wZXJhdGlvbic7XG4gICAgc3RhdGljIEtleU1vZHVsZSA9ICdtb2R1bGUnO1xuICAgIHN0YXRpYyBLZXlMYXlvdXQgPSAnbGF5b3V0JztcbiAgICBzdGF0aWMgS2V5QXJlYSA9ICdhcmVhJztcbiAgICBzdGF0aWMgS2V5RWRpdGluZyA9ICdlZGl0aW5nJztcbiAgICBzdGF0aWMgS2V5QWZ0ZXIgPSAnYWZ0ZXInO1xuICAgIHN0YXRpYyBLZXlIaWRkZW4gPSAnaGlkZGVuJztcbiAgICBzdGF0aWMgS2V5TGFiZWwgPSAnbGFiZWwnO1xuICAgIHN0YXRpYyBLZXlDb21wb25lbnROYW1lID0gJ2NvbXBvbmVudCc7XG4gICAgc3RhdGljIEtleUJpbmRpbmdzID0gJ2JpbmRpbmdzJztcbiAgICBzdGF0aWMgS2V5SG9tZVBhZ2UgPSAnaG9tZVBhZ2UnO1xuICAgIHN0YXRpYyBLZXlab25lUGF0aCA9ICd6b25lUGF0aCc7XG4gICAgc3RhdGljIFByb3BGaWVsZHNCeVpvbmUgPSAnZmllbGRzQnlab25lJztcbiAgICBzdGF0aWMgUHJvcElzRmllbGRzQnlab25lID0gJ2ZpdmVab25lTGF5b3V0JztcbiAgICBzdGF0aWMgUHJvcEFjdGlvbnNCeUNhdGVnb3J5ID0gJ2FjdGlvbnNCeUNhdGVnb3J5JztcbiAgICBzdGF0aWMgUHJvcEFjdGlvbkNhdGVnb3JpZXMgPSAnYWN0aW9uQ2F0ZWdvcmllcyc7XG4gICAgc3RhdGljIFByb3BGaWVsZFByb3BlcnR5TGlzdCA9ICdmaWVsZFByb3BlcnR5TGlzdCc7XG4gICAgc3RhdGljIFByb3BMYXlvdXRzQnlab25lID0gJ2xheW91dHNCeVpvbmUnO1xuICAgIHN0YXRpYyBLZXlXcmFwcGVyQ29tcG9uZW50ID0gJ3dyYXBwZXJDb21wb25lbnQnO1xuICAgIHN0YXRpYyBLZXlXcmFwcGVyQmluZGluZyA9ICd3cmFwcGVyQmluZGluZ3MnO1xuXG5cbiAgICBzdGF0aWMgUm9vdFByZWRlY2Vzc29yS2V5ID0gJ19yb290JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgWm9uZU1haW4gPSAnek1haW4nO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lVG9wID0gJ3pUb3AnO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lTGVmdCA9ICd6TGVmdCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpvbmVNaWRkbGUgPSAnek1pZGRsZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpvbmVSaWdodCA9ICd6UmlnaHQnO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lQm90dG9tID0gJ3pCb3R0b20nO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lRGV0YWlsID0gJ3pEZXRhaWwnO1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IEFwcENvbmZpZ1J1bGVGaWxlc1BhcmFtID0gJ21ldGF1aS5ydWxlcy5maWxlLW5hbWVzJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0gPSAnbWV0YXVpLnJ1bGVzLnVzZXItcnVsZXMnO1xuXG4gICAgc3RhdGljIFpvbmVzVExSTUIgPSBbXG4gICAgICAgIFVJTWV0YS5ab25lVG9wLCBVSU1ldGEuWm9uZUxlZnQsIFVJTWV0YS5ab25lTWlkZGxlLFxuICAgICAgICBVSU1ldGEuWm9uZVJpZ2h0LCBVSU1ldGEuWm9uZUJvdHRvbVxuICAgIF07XG4gICAgc3RhdGljIFpvbmVzTVRMUkIgPSBbXG4gICAgICAgIFVJTWV0YS5ab25lTWFpbiwgVUlNZXRhLlpvbmVUb3AsIFVJTWV0YS5ab25lTGVmdCwgVUlNZXRhLlpvbmVSaWdodCwgVUlNZXRhLlpvbmVCb3R0b21cbiAgICBdO1xuICAgIHN0YXRpYyBab25lc0RldGFpbCA9IFtVSU1ldGEuWm9uZURldGFpbF07XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFVJTWV0YSA9IG51bGw7XG5cbiAgICBzdGF0aWMgTW9kdWxlQWN0aW9uWm9uZXM6IHN0cmluZ1tdID0gWyd6TmF2JywgJ3pHbG9iYWwnXTtcbiAgICBzdGF0aWMgQWN0aW9uWm9uZXM6IHN0cmluZ1tdID0gWyd6R2xvYmFsJywgJ3pNYWluJywgJ3pHZW5lcmFsJ107XG5cblxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBVSU1ldGEge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRMYWJlbEZvcklkZW50aWZpZXIoZmllbGROYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGxhc3REb3QgPSBmaWVsZE5hbWUubGFzdEluZGV4T2YoJy4nKTtcbiAgICAgICAgaWYgKGxhc3REb3QgIT09IC0xICYmIGxhc3REb3QgIT09IGZpZWxkTmFtZS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBmaWVsZE5hbWUgPSBmaWVsZE5hbWUuc3Vic3RyaW5nKGxhc3REb3QgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVjYW1lbGl6ZShmaWVsZE5hbWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBiZWF1dGlmeUNsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkZWNhbWVsaXplKGNsYXNzTmFtZSwgJyAnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYmVhdXRpZnlGaWxlTmFtZShmaWVsZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRlY2FtZWxpemUoZmllbGQsICcgJyk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIGlmIChpc1ByZXNlbnQobG9hZGVyKSkge1xuICAgICAgICAvLyAgICAgdGhpcy5yZWdpc3RlckxvYWRlcihsb2FkZXIpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuYmVnaW5SdWxlU2V0KCdVSU1ldGEnKTtcblxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlcktleUluaXRPYnNlcnZlcihVSU1ldGEuS2V5Q2xhc3MsIG5ldyBVc2VyTWV0YURhdGFQcm92aWRlcigpKTtcblxuICAgICAgICAgICAgLy8gVGhlc2Uga2V5cyBkZWZpbmUgc2NvcGVzIGZvciB0aGVpciBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAvLyBkZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoS2V5QXJlYSk7XG4gICAgICAgICAgICB0aGlzLmRlZmluZUtleUFzUHJvcGVydHlTY29wZShVSU1ldGEuS2V5TGF5b3V0KTtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKFVJTWV0YS5LZXlNb2R1bGUpO1xuXG4gICAgICAgICAgICAvLyBEZWZhdWx0IHJ1bGUgZm9yIGNvbnZlcnRpbmcgZmllbGQgbmFtZSB0byBsYWJlbFxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5Q2xhc3MpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5RmllbGQpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5TGF5b3V0KTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleU1vZHVsZSk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRGVmYXVsdExhYmVsR2VuZXJhdG9yRm9yS2V5KFVJTWV0YS5LZXlBY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnkpO1xuXG4gICAgICAgICAgICAvLyBwb2xpY2llcyBmb3IgY2hhaW5pbmcgY2VydGFpbiB3ZWxsIGtub3duIHByb3BlcnRpZXNcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihVSU1ldGEuS2V5QXJlYSwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoVUlNZXRhLktleUxheW91dCwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoVUlNZXRhLktleU1vZHVsZSwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG5cbiAgICAgICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoVUlNZXRhLktleUVkaXRpbmcsIFVJTWV0YS5LZXlFZGl0aW5nKTtcbiAgICAgICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoVUlNZXRhLktleUxheW91dCwgVUlNZXRhLktleUxheW91dCk7XG4gICAgICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KFVJTWV0YS5LZXlDb21wb25lbnROYW1lLCBVSU1ldGEuS2V5Q29tcG9uZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihVSU1ldGEuS2V5RWRpdGluZywgbmV3IFByb3BlcnR5TWVyZ2VyX0FuZCgpKTtcblxuICAgICAgICAgICAgLy8gdGhpcy5yZWdpc3RlclZhbHVlVHJhbnNmb3JtZXJGb3JLZXkoJ3JlcXVlc3RDb250ZXh0JywgVUlNZXRhLlRyYW5zZm9ybWVyX0tleVByZXNlbnQpO1xuICAgICAgICAgICAgLy8gdGhpcy5yZWdpc3RlclZhbHVlVHJhbnNmb3JtZXJGb3JLZXkoJ2Rpc3BsYXlHcm91cCcsIFVJTWV0YS5UcmFuc2Zvcm1lcl9LZXlQcmVzZW50KTtcblxuICAgICAgICAgICAgLy8gZGVmaW5lIG9wZXJhdGlvbiBoaWVyYXJjaHlcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ3ZpZXcnLCAnaW5zcGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5rZXlEYXRhKFVJTWV0YS5LZXlPcGVyYXRpb24pLnNldFBhcmVudCgncHJpbnQnLCAndmlldycpO1xuICAgICAgICAgICAgdGhpcy5rZXlEYXRhKFVJTWV0YS5LZXlPcGVyYXRpb24pLnNldFBhcmVudCgnZWRpdCcsICdpbnNwZWN0Jyk7XG4gICAgICAgICAgICB0aGlzLmtleURhdGEoVUlNZXRhLktleU9wZXJhdGlvbikuc2V0UGFyZW50KCdzZWFyY2gnLCAnaW5zcGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5rZXlEYXRhKFVJTWV0YS5LZXlPcGVyYXRpb24pLnNldFBhcmVudCgna2V5d29yZFNlYXJjaCcsICdzZWFyY2gnKTtcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ3RleHRTZWFyY2gnLCAna2V5d29yZFNlYXJjaCcpO1xuXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoVUlNZXRhLlByb3BGaWVsZHNCeVpvbmUsXG4gICAgICAgICAgICAgICAgbmV3IFByb3BGaWVsZHNCeVpvbmVSZXNvbHZlcigpLFxuICAgICAgICAgICAgICAgIFVJTWV0YS5LZXlDbGFzcyk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoVUlNZXRhLlByb3BGaWVsZFByb3BlcnR5TGlzdCxcbiAgICAgICAgICAgICAgICBuZXcgUHJvcEZpZWxkUHJvcGVydHlMaXN0UmVzb2x2ZXIoKSxcbiAgICAgICAgICAgICAgICBVSU1ldGEuS2V5Q2xhc3MpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKFVJTWV0YS5Qcm9wTGF5b3V0c0J5Wm9uZSxcbiAgICAgICAgICAgICAgICBuZXcgUHJvcExheW91dHNCeVpvbmVSZXNvbHZlcigpLFxuICAgICAgICAgICAgICAgIFVJTWV0YS5LZXlMYXlvdXQpO1xuXG5cbiAgICAgICAgICAgIC8vIHRoaXMucmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZShVSU1ldGEuUHJvcExheW91dHNCeVpvbmUgLCBuZXdcbiAgICAgICAgICAgIC8vIFByb3BMYXlvdXRzQnlab25lUmVzb2x2ZXIoKSAsIFVJTWV0YS5LZXlMYXlvdXQpO1xuICAgICAgICAgICAgLy8gcmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZSgnYmluZGluZ3NEaWN0aW9uYXJ5JyAsIGR5biAsIEtleUZpZWxkKTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoJ2JpbmRpbmdzRGljdGlvbmFyeScgLCBkeW4gLCBLZXlMYXlvdXQpO1xuICAgICAgICAgICAgLy8gcmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZSgnYmluZGluZ3NEaWN0aW9uYXJ5JyAsIGR5biAsIEtleUNsYXNzKTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoJ2JpbmRpbmdzRGljdGlvbmFyeScgLCBkeW4gLCBLZXlNb2R1bGUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgem9uZXMoY29udGV4dDogQ29udGV4dCk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICBsZXQgem9uZXM6IEFycmF5PHN0cmluZz4gPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KCd6b25lcycpO1xuICAgICAgICByZXR1cm4gKGlzQmxhbmsoem9uZXMpKSA/IE1ldGEudG9MaXN0KFVJTWV0YS5ab25lTWFpbikgOiB6b25lcztcbiAgICB9XG5cblxuICAgIHpvbmVQYXRoKGNvbnRleHQ6IENvbnRleHQpOiBzdHJpbmcge1xuICAgICAgICBsZXQgem9uZVBhdGg6IGFueTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChjb250ZXh0LnZhbHVlcy5nZXQoVUlNZXRhLktleUxheW91dCkpKSB7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0U2NvcGVLZXkoVUlNZXRhLktleUxheW91dCk7XG4gICAgICAgICAgICB6b25lUGF0aCA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleVpvbmVQYXRoKTtcbiAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHpvbmVQYXRoO1xuICAgIH1cblxuXG4gICAgbmV3Q29udGV4dChpc05lc3RlZDogYm9vbGVhbiA9IGZhbHNlKTogQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBuZXcgVUlDb250ZXh0KHRoaXMsIGlzTmVzdGVkKTtcbiAgICB9XG5cbiAgICAvLyBMb2FkIHN5c3RlbSBydWxlc1xuICAgIGxvYWREZWZhdWx0UnVsZUZpbGVzKHJlZmVyZW5jZXM/OiBhbnkpOiBib29sZWFuIHtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KFN5c3RlbVJ1bGVzLm9zcykpIHtcbiAgICAgICAgICAgIHRoaXMuYmVnaW5SdWxlU2V0V2l0aFJhbmsoTWV0YS5TeXN0ZW1SdWxlUHJpb3JpdHksICdzeXN0ZW0nKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFJ1bGVzKFN5c3RlbVJ1bGVzLm9zcywgJ3N5c3RlbScsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KFN5c3RlbVBlcnNpc3RlbmNlUnVsZXMub3NzKSkge1xuICAgICAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayhNZXRhLlN5c3RlbVJ1bGVQcmlvcml0eSArIDIwMDAsICdzeXN0ZW0tcGVyc2lzdGVuY2UnKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFJ1bGVzKFN5c3RlbVBlcnNpc3RlbmNlUnVsZXMub3NzLCAnc3lzdGVtLXBlcnNpc3RlbmNlJywgZmFsc2UpO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFJ1bGVTZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHJlZmVyZW5jZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50cyhyZWZlcmVuY2VzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBsb2FkcyBhcHBsaWNhdGlvbiBsZXZlbCBydWxlcy4gQXBwbGljYXRpb24gbGV2ZWwgcnVsZXMgYXJlIGdsb2JhbCBydWxlc1xuICAgICAqL1xuICAgIGxvYWRBcHBsaWNhdGlvblJ1bGVzKCk6IHZvaWQge1xuICAgICAgICBsZXQgYVJ1bGVzOiBBcnJheTxKc29uUnVsZT47XG4gICAgICAgIGxldCB1c2VyUmVmZXJlbmNlczogYW55W107XG4gICAgICAgIGxldCBhcHBSdWxlRmlsZXM6IHN0cmluZ1tdID0gWydBcHBsaWNhdGlvbiddO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5hcHBDb25maWcpKSB7XG4gICAgICAgICAgICBhcHBSdWxlRmlsZXMgPSB0aGlzLmFwcENvbmZpZy5nZXQoVUlNZXRhLkFwcENvbmZpZ1J1bGVGaWxlc1BhcmFtKSB8fCBbJ0FwcGxpY2F0aW9uJ107XG4gICAgICAgICAgICB1c2VyUmVmZXJlbmNlcyA9IHRoaXMuYXBwQ29uZmlnLmdldChVSU1ldGEuQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0pO1xuXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgd2UgaGF2ZSBhbHdheXMgQXBwbGljYXRpb24gYW5kIG1ha2UgaXQgbW9yZSBhZGRpdGl2ZS5cbiAgICAgICAgICAgIGlmICghTGlzdFdyYXBwZXIuY29udGFpbnM8c3RyaW5nPihhcHBSdWxlRmlsZXMsICdBcHBsaWNhdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgYXBwUnVsZUZpbGVzLnVuc2hpZnQoJ0FwcGxpY2F0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBydWxlRmlsZSBvZiBhcHBSdWxlRmlsZXMpIHtcbiAgICAgICAgICAgIGxldCBydWxlID0gcnVsZUZpbGUgKyAnUnVsZSc7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl90ZXN0UnVsZXMuaGFzKHJ1bGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gc2luY2Ugd2UgYXJlIGluIGRldmVsb3BtZW50IG1vZGUgYW5kIHRlc3QgbW9kZSBpcyBvbiB3ZSBjYW4gY2hlY2sgZXh0cmFcbiAgICAgICAgICAgICAgICAvLyByZXBvc2l0b3J5IHVzZWQgYnkgdGVzdHMsIHdlIG5lZWQgdG8gY2hlY2sgaWYgd2UgYXJlIG5vdCBydW5uaW5nIHVuaXR0ZXN0XG4gICAgICAgICAgICAgICAgLy8gYW5kIGEgY2xhc3MgaXMgbm90IGRlZmluZWQgYnV0IHVuaXR0ZXN0XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGVzdFJ1bGVzLmhhcyhydWxlKSAmJlxuICAgICAgICAgICAgICAgICAgICBpc1ByZXNlbnQodGhpcy5fdGVzdFJ1bGVzLmdldChydWxlKS5vc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFSdWxlcyA9IHRoaXMuX3Rlc3RSdWxlcy5nZXQocnVsZSkub3NzO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoYVJ1bGVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayhNZXRhLkxvd1J1bGVQcmlvcml0eSwgcnVsZUZpbGUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRSdWxlcyhhUnVsZXMsIHJ1bGVGaWxlLnRvTG93ZXJDYXNlKCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdXNlclJlZmVyZW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJSdWxlID0gdXNlclJlZmVyZW5jZXNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh1c2VyUnVsZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh1c2VyUnVsZVtydWxlXSkgJiYgaXNQcmVzZW50KHVzZXJSdWxlW3J1bGVdLm9zcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhUnVsZXMgPSB1c2VyUnVsZVtydWxlXS5vc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChhUnVsZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luUnVsZVNldFdpdGhSYW5rKE1ldGEuTG93UnVsZVByaW9yaXR5LCBydWxlRmlsZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZFJ1bGVzKGFSdWxlcywgcnVsZUZpbGUudG9Mb3dlckNhc2UoKSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJ1bGVTZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFVzZXJSdWxlKHNvdXJjZTogYW55LCB1c2VyQ2xhc3M6IHN0cmluZyk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoc291cmNlKSkge1xuICAgICAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayh0aGlzLl9ydWxlQ291bnQsICd1c2VyOicgKyB1c2VyQ2xhc3MpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUnVsZXMoc291cmNlLCAndXNlcicsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG4gICAgZGVmYXVsdExhYmVsR2VuZXJhdG9yRm9yS2V5KGtleTogc3RyaW5nKTogRHluYW1pY1Byb3BlcnR5VmFsdWUge1xuICAgICAgICByZXR1cm4gbmV3IF9EZWZhdWx0TGFiZWxHZW5lcmF0b3Ioa2V5KTtcbiAgICB9XG5cblxuICAgIHJlZ2lzdGVyRGVyaXZlZFZhbHVlKHByb3BLZXk6IHN0cmluZywgZHluYW1pY1ZhbHVlOiBEeW5hbWljUHJvcGVydHlWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0S2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IG0gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBtLnNldChwcm9wS2V5LCBkeW5hbWljVmFsdWUpO1xuICAgICAgICB0aGlzLmFkZFJ1bGUobmV3IFJ1bGUoTWV0YS50b0xpc3QoXG4gICAgICAgICAgICBuZXcgU2VsZWN0b3IoY29udGV4dEtleSwgY29udGV4dFZhbHVlKSksIG0sIE1ldGEuU3lzdGVtUnVsZVByaW9yaXR5KSk7XG4gICAgfVxuXG5cbiAgICByZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKHByb3BLZXk6IHN0cmluZywgZHluYW1pY1ZhbHVlOiBTdGF0aWNhbGx5UmVzb2x2YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRLZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGVyaXZlZFZhbHVlKHByb3BLZXksIG5ldyBTdGF0aWNEeW5hbWljV3JhcHBlcihkeW5hbWljVmFsdWUpLCBjb250ZXh0S2V5LFxuICAgICAgICAgICAgTWV0YS5LZXlBbnkpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyRGVmYXVsdExhYmVsR2VuZXJhdG9yRm9yS2V5KGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEZXJpdmVkVmFsdWUoVUlNZXRhLktleUxhYmVsLCBuZXcgTG9jYWxpemVkTGFiZWxTdHJpbmcodGhpcyksIGtleSxcbiAgICAgICAgICAgIFVJTWV0YS5LZXlBbnkpO1xuICAgIH1cblxuICAgIGZpZWxkTGlzdChjb250ZXh0OiBDb250ZXh0KTogQXJyYXk8SXRlbVByb3BlcnRpZXM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbUxpc3QoY29udGV4dCwgVUlNZXRhLktleUZpZWxkLCBVSU1ldGEuWm9uZXNUTFJNQik7XG4gICAgfVxuXG4gICAgZmllbGRzQnlab25lcyhjb250ZXh0OiBDb250ZXh0KTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zQnlab25lcyhjb250ZXh0LCBVSU1ldGEuS2V5RmllbGQsIFVJTWV0YS5ab25lc1RMUk1CKTtcbiAgICB9XG5cbiAgICBpdGVtTmFtZXNCeVpvbmVzKGNvbnRleHQ6IENvbnRleHQsIGtleTogc3RyaW5nLCB6b25lczogc3RyaW5nW10pOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IGl0ZW1zQnlab25lczogTWFwPHN0cmluZywgYW55PiA9IHRoaXMuaXRlbXNCeVpvbmVzKGNvbnRleHQsIGtleSwgem9uZXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBJdGVtUHJvcHNUb05hbWVzKGl0ZW1zQnlab25lcyk7XG4gICAgfVxuXG4gICAgbWFwSXRlbVByb3BzVG9OYW1lcyhpdGVtc0J5Wm9uZXM6IE1hcDxzdHJpbmcsIGFueT4pOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IG5hbWVzQnlab25lczogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgICAgTWFwV3JhcHBlci5pdGVyYWJsZShpdGVtc0J5Wm9uZXMpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodmFsdWUpICYmIGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBJdGVtUHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPEl0ZW1Qcm9wZXJ0aWVzPml0ZW0pLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hbWVzQnlab25lcy5zZXQoa2V5LCBuYW1lcyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZXNCeVpvbmVzLnNldChrZXksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwSXRlbVByb3BzVG9OYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmFtZXNCeVpvbmVzO1xuICAgIH1cblxuICAgIHByZWRlY2Vzc29yTWFwKGNvbnRleHQ6IENvbnRleHQsIGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcmVkZWNlc3Nvcjogc3RyaW5nKTogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+PiB7XG4gICAgICAgIGxldCBmaWVsZEluZm9zOiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSB0aGlzLml0ZW1Qcm9wZXJ0aWVzKGNvbnRleHQsIGtleSwgZmFsc2UpO1xuICAgICAgICBsZXQgcHJlZGVjZXNzb3JzOiBNYXA8c3RyaW5nLCBBcnJheTxJdGVtUHJvcGVydGllcz4+ID0gTWFwV3JhcHBlci5ncm91cEJ5PEl0ZW1Qcm9wZXJ0aWVzPihcbiAgICAgICAgICAgIGZpZWxkSW5mb3MsIChpdGVtOiBJdGVtUHJvcGVydGllcykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwcmVkID0gaXRlbS5wcm9wZXJ0aWVzLmdldChVSU1ldGEuS2V5QWZ0ZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1ByZXNlbnQocHJlZCkgPyBwcmVkIDogZGVmYXVsdFByZWRlY2Vzc29yO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByZWRlY2Vzc29ycztcbiAgICB9XG5cbiAgICBpdGVtTGlzdChjb250ZXh0OiBDb250ZXh0LCBrZXk6IHN0cmluZywgem9uZXM6IHN0cmluZ1tdKTogQXJyYXk8SXRlbVByb3BlcnRpZXM+IHtcbiAgICAgICAgbGV0IHByZWRlY2Vzc29yczogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+PiA9IHRoaXMucHJlZGVjZXNzb3JNYXAoY29udGV4dCwga2V5LFxuICAgICAgICAgICAgem9uZXNbMF0pO1xuICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCB6b25lIG9mIHpvbmVzKSB7XG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVQcmVjZXNzb3JzKHByZWRlY2Vzc29ycywgem9uZSwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlzWm9uZVJlZmVyZW5jZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBrZXlzIG9mIHRoZSBmb3JtICd6PE5hbWU+JyBhbmQgJ2Zvby5iYXIuejxOYW1lPicgYXJlIGNvbnNpZGVyZWQgem9uZSBrZXlzXG4gICAgICAgIGxldCBsYXN0RG90ID0ga2V5Lmxhc3RJbmRleE9mKCcuJyk7XG4gICAgICAgIGxldCBzdWZmaXggPSAobGFzdERvdCA9PT0gLTEpID8ga2V5IDoga2V5LnN1YnN0cmluZyhsYXN0RG90ICsgMSk7XG4gICAgICAgIHJldHVybiAoc3VmZml4Lmxlbmd0aCA+IDEpICYmIChzdWZmaXhbMF0gPT09ICd6JykgJiYgKFxuICAgICAgICAgICAgc3VmZml4WzFdLnRvVXBwZXJDYXNlKCkgPT09IHN1ZmZpeFsxXSAvLyBpcyB1cHBlcmNhc2UgP3NcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBpdGVtc0J5Wm9uZXMoY29udGV4dDogQ29udGV4dCwgcHJvcGVydHk6IHN0cmluZywgem9uZXM6IHN0cmluZ1tdKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCBwcmVkZWNlc3NvcnMgPSB0aGlzLnByZWRlY2Vzc29yTWFwKGNvbnRleHQsIHByb3BlcnR5LCB6b25lc1swXSk7XG4gICAgICAgIGxldCBieVpvbmUgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG5cbiAgICAgICAgTWFwV3JhcHBlci5pdGVyYWJsZShwcmVkZWNlc3NvcnMpLmZvckVhY2goKHZhbHVlLCB6b25lKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1pvbmVSZWZlcmVuY2Uoem9uZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdDogYW55W10gPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVQcmVjZXNzb3JzKHByZWRlY2Vzc29ycyxcbiAgICAgICAgICAgICAgICAgICAgem9uZSwgbGlzdCk7XG5cbiAgICAgICAgICAgICAgICBGaWVsZFBhdGguc2V0RmllbGRWYWx1ZShieVpvbmUsIHpvbmUsIGxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnlab25lO1xuICAgIH1cblxuICAgIC8vIHJlY3Vyc2l2ZSBkZWNlbnQgb2YgcHJlZGVjZXNzb3IgdHJlZS4uLlxuICAgIGFjY3VtdWxhdGVQcmVjZXNzb3JzKHByZWRlY2Vzc29yczogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+Piwga2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGl0ZW1zOiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSBwcmVkZWNlc3NvcnMuZ2V0KGtleSk7XG4gICAgICAgIGlmIChpc0JsYW5rKGl0ZW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgTGlzdFdyYXBwZXIuc29ydDxJdGVtUHJvcGVydGllcz4oaXRlbXMsIChvMSwgbzIpID0+IHtcbiAgICAgICAgICAgIGxldCByMSA9IG8xLnByb3BlcnRpZXMuZ2V0KFVJTWV0YS5LZXlSYW5rKTtcbiAgICAgICAgICAgIGxldCByMiA9IG8yLnByb3BlcnRpZXMuZ2V0KFVJTWV0YS5LZXlSYW5rKTtcblxuICAgICAgICAgICAgaWYgKHIxID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcjEgPSAxMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocjIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByMiA9IDEwMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChyMSA9PT0gcjIpID8gMCA6IChyMSA9PT0gbnVsbCkgPyAxIDogKHIyID09PSBudWxsKSA/IC0xIDogKHIxIC0gcjIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVQcmVjZXNzb3JzKHByZWRlY2Vzc29ycywgaXRlbS5uYW1lLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IFBhcnNlciB0byBoYW5kbGUgZGVjbHMgbGlrZSAnekxlZnQgPT4gbGFzdE5hbWUjcmVxdWlyZWQnXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGRQcmVkZWNlc3NvclJ1bGUoaXRlbU5hbWU6IHN0cmluZywgY29udGV4dFByZWRzOiBBcnJheTxTZWxlY3Rvcj4sIHByZWRlY2Vzc29yOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgIHRyYWl0czogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiBudW1iZXIpOiBSdWxlIHtcbiAgICAgICAgaWYgKGlzQmxhbmsocHJlZGVjZXNzb3IpICYmIGlzQmxhbmsodHJhaXRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQga2V5OiBzdHJpbmcgPSB0aGlzLnNjb3BlS2V5Rm9yU2VsZWN0b3IoY29udGV4dFByZWRzKTtcbiAgICAgICAgaWYgKGlzQmxhbmsoa2V5KSB8fCBrZXkgPT09IFVJTWV0YS5LZXlDbGFzcykge1xuICAgICAgICAgICAga2V5ID0gVUlNZXRhLktleUZpZWxkO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZWxlY3RvcjogQXJyYXk8U2VsZWN0b3I+ID0gbmV3IEFycmF5PFNlbGVjdG9yPigpO1xuICAgICAgICBMaXN0V3JhcHBlci5hZGRBbGw8U2VsZWN0b3I+KHNlbGVjdG9yLCBjb250ZXh0UHJlZHMpO1xuXG4gICAgICAgIHNlbGVjdG9yLnB1c2gobmV3IFNlbGVjdG9yKGtleSwgaXRlbU5hbWUpKTtcbiAgICAgICAgbGV0IHByb3BzOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHByZWRlY2Vzc29yKSkge1xuICAgICAgICAgICAgcHJvcHMuc2V0KFVJTWV0YS5LZXlBZnRlciwgcHJlZGVjZXNzb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0cmFpdHMpKSB7XG4gICAgICAgICAgICBwcm9wcy5zZXQoVUlNZXRhLktleVRyYWl0LCB0cmFpdHMpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBydWxlID0gbmV3IFJ1bGUoc2VsZWN0b3IsIHByb3BzLCAwLCBsaW5lTnVtYmVyKTtcbiAgICAgICAgdGhpcy5hZGRSdWxlKHJ1bGUpO1xuICAgICAgICByZXR1cm4gcnVsZTtcbiAgICB9XG5cbiAgICBmbGF0dGVuVmlzaWJsZShmaWVsZHNCeVpvbmVzOiBNYXA8c3RyaW5nLCBBcnJheTxzdHJpbmc+Piwgem9uZUxpc3Q6IHN0cmluZ1tdLCBrZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBDb250ZXh0KTogc3RyaW5nW10ge1xuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoZmllbGRzQnlab25lcykpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgem9uZSBvZiAgem9uZUxpc3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRzOiBzdHJpbmdbXSA9IGZpZWxkc0J5Wm9uZXMuZ2V0KHpvbmUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoZmllbGRzKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0KGtleSwgZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5ib29sZWFuUHJvcGVydHlGb3JLZXkoVUlNZXRhLktleVZpc2libGUsIGZhbHNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZGlzcGxheUtleUZvckNsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgLy8gcGVyZm9ybWFuY2U6IHNob3VsZCB1c2UgcmVnaXN0ZXJEZXJpdmVkVmFsdWUoJy4uLicsIG5ldyBDb250ZXh0LlN0YXRpY0R5bmFtaWNXcmFwcGVyXG4gICAgICAgIC8vIHRvIGdldCBjYWNoZWQgcmVzb2x1dGlvbiBoZXJlLi4uXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5uZXdDb250ZXh0KCk7XG4gICAgICAgIGNvbnRleHQuc2V0KFVJTWV0YS5LZXlMYXlvdXQsICdMYWJlbEZpZWxkJyk7XG4gICAgICAgIGNvbnRleHQuc2V0KFVJTWV0YS5LZXlDbGFzcywgY2xhc3NOYW1lKTtcbiAgICAgICAgbGV0IGZpZWxkczogQXJyYXk8SXRlbVByb3BlcnRpZXM+ID0gdGhpcy5pdGVtUHJvcGVydGllcyhjb250ZXh0LCBVSU1ldGEuS2V5RmllbGQsIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5pc0VtcHR5KGZpZWxkcykgPyAnJHRvU3RyaW5nJyA6IGZpZWxkc1swXS5uYW1lO1xuICAgIH1cblxuXG4gICAgZGlzcGxheUxhYmVsKGNsYXNzTmFtZTogc3RyaW5nLCBwcm9wZXJ0aWVzVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChwcm9wZXJ0aWVzVmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcGVydGllc1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlLZXlGb3JDbGFzcyhjbGFzc05hbWUpO1xuICAgIH1cblxuXG4gICAgY3JlYXRlTG9jYWxpemVkU3RyaW5nKGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IHN0cmluZyk6IExvY2FsaXplZFN0cmluZyB7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5fY3VycmVudFJ1bGVTZXQpLFxuICAgICAgICAgICAgJ0F0dGVtcHQgdG8gY3JlYXRlIGxvY2FsaXplZCBzdHJpbmcgd2l0aG91dCBjdXJyZW50UnVsZVNldCBpbiBwbGFjZScpO1xuXG4gICAgICAgIHJldHVybiBuZXcgTG9jYWxpemVkU3RyaW5nKHRoaXMsIHRoaXMuX2N1cnJlbnRSdWxlU2V0LmZpbGVQYXRoLCBrZXksIGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuXG5cbiAgICBnZXQgcm91dGluZ1NlcnZpY2UoKTogUm91dGluZ1NlcnZpY2Uge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudCh0aGlzLl9pbmplY3RvcikpID8gdGhpcy5faW5qZWN0b3IuZ2V0KFJvdXRpbmdTZXJ2aWNlKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGVudigpOiBFbnZpcm9ubWVudCB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHRoaXMuX2luamVjdG9yKSkgPyB0aGlzLl9pbmplY3Rvci5nZXQoRW52aXJvbm1lbnQpIDogbmV3IEVudmlyb25tZW50KCk7XG4gICAgfVxuXG5cbiAgICBnZXQgYXBwQ29uZmlnKCk6IEFwcENvbmZpZyB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHRoaXMuX2luamVjdG9yKSkgPyB0aGlzLl9pbmplY3Rvci5nZXQoQXBwQ29uZmlnKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGZyYW1ld29yayBsZXZlbCBjb21wb25lbnRzIGFuZCBsaXN0ZW4gZm9yIHVzZXIgbGV2ZWwgcnVsZXMgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICAgKiBBZnRlciB3ZSByZWdpc3RlciB1c2VyIGxldmVsIHJ1bGVzIGl0IHdpbGwgbG9hZCBhcHBsaWNhdGlvbi5vc3MuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVnaXN0ZXJDb21wb25lbnRzKHN5c1JlZmVyZW5jZXM6IGFueSk6IHZvaWQge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuaW5qZWN0b3IpLCAnQ2Fubm90IHJlZ2lzdGVyIGNvbXBvbmVudHMgd2l0aG91dCBJbmplY3RvciBpbiBvcmRlcicgK1xuICAgICAgICAgICAgJyB0byBnZXQgYWNjZXNzIHRvIENvbXBvbmVudFJlZ2lzdHJ5IFNlcnZpY2UnKTtcblxuICAgICAgICBhc3NlcnQodGhpcy5lbnYuaW5UZXN0IHx8IGlzUHJlc2VudCh0aGlzLmFwcENvbmZpZy5nZXQoVUlNZXRhLkFwcENvbmZpZ1VzZXJSdWxlc1BhcmFtKSksXG4gICAgICAgICAgICAnVW5hYmxlIHRvIGluaXRpYWxpemUgTWV0YVVJIGFzIHVzZXIgcnVsZXMgYXJlIG1pc3NpbmcuIHBsZWFzZSB1c2U6JyArXG4gICAgICAgICAgICAnIG1ldGF1aS5ydWxlcy51c2VyLXJ1bGVzIGNvbmZpZ3VyYXRpb24gcGFyYW0nKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5ID0gdGhpcy5pbmplY3Rvci5nZXQoQ29tcG9uZW50UmVnaXN0cnkpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuY29tcG9uZW50UmVnaXN0cnkpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVnaXN0cnkucmVnaXN0ZXJUeXBlcyhzeXNSZWZlcmVuY2VzKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmVudi5pblRlc3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXNlclJlZmVyZW5jZXM6IGFueVtdID0gdGhpcy5hcHBDb25maWcuZ2V0KFVJTWV0YS5BcHBDb25maWdVc2VyUnVsZXNQYXJhbSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdVJ1bGUgb2YgdXNlclJlZmVyZW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWdpc3RyeS5yZWdpc3RlclR5cGVzKHVSdWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQXBwbGljYXRpb25SdWxlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZW52LmluVGVzdCkge1xuICAgICAgICAgICAgd2FybignVUlNZXRhLnJlZ2lzdGVyQ29tcG9uZW50cygpIE5vIGNvbXBvbmVudHMgd2VyZSByZWdpc3RlcmVkICEnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEp1c3QgbmVlZCB0byBjYWxsIGl0IGRpZmZlcmVudCB0aGFuIHRoZSBvdGhlciBmaXJlQWN0aW9uIGFzIEkgY2FuIG5vdCBkbyBhbnkgbWV0aG9kXG4gICAgICogb3ZlcmxvYWRpbmcgaGVyZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGZpcmVBY3Rpb25Gcm9tUHJvcHMoYWN0aW9uOiBJdGVtUHJvcGVydGllcywgY29udGV4dDogQ29udGV4dCk6IHZvaWQge1xuICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgbGV0IGFjdGlvbkNhdGVnb3J5ID0gYWN0aW9uLnByb3BlcnRpZXMuZ2V0KE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnkpO1xuICAgICAgICBpZiAoaXNCbGFuayhhY3Rpb25DYXRlZ29yeSkpIHtcbiAgICAgICAgICAgIGFjdGlvbkNhdGVnb3J5ID0gT2JqZWN0TWV0YS5EZWZhdWx0QWN0aW9uQ2F0ZWdvcnk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zZXQoT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSwgYWN0aW9uQ2F0ZWdvcnkpO1xuICAgICAgICBjb250ZXh0LnNldChPYmplY3RNZXRhLktleUFjdGlvbiwgYWN0aW9uLm5hbWUpO1xuXG4gICAgICAgIHRoaXMuX2ZpcmVBY3Rpb24oY29udGV4dCwgZmFsc2UpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgfVxuXG4gICAgZmlyZUFjdGlvbihjb250ZXh0OiBVSUNvbnRleHQsIHdpdGhCYWNrQWN0aW9uOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIHRoaXMuX2ZpcmVBY3Rpb24oY29udGV4dCwgd2l0aEJhY2tBY3Rpb24pO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmlyZUFjdGlvbihjb250ZXh0OiBDb250ZXh0LCB3aXRoQmFja0FjdGlvbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBsZXQgYWN0aW9uUmVzdWx0cyA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoJ2FjdGlvblJlc3VsdHMnKTtcbiAgICAgICAgaWYgKGlzQmxhbmsoYWN0aW9uUmVzdWx0cykgfHwgIXRoaXMuaXNSb3V0ZShhY3Rpb25SZXN1bHRzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmF2aWF0ZVRvUGFnZShjb250ZXh0LCBhY3Rpb25SZXN1bHRzLCB3aXRoQmFja0FjdGlvbik7XG4gICAgfVxuXG4gICAgbmF2aWF0ZVRvUGFnZShjb250ZXh0OiBDb250ZXh0LCByb3V0ZTogYW55LCB3aXRoQmFja0FjdGlvbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBsZXQgcGFyYW1zID0gdGhpcy5wcmVwYXJlUm91dGUoY29udGV4dCwgd2l0aEJhY2tBY3Rpb24pO1xuXG4gICAgICAgIGxldCB1aUNvbnRleDogVUlDb250ZXh0ID0gPFVJQ29udGV4dD4gY29udGV4dDtcbiAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5uYXZpZ2F0ZVdpdGhSb3V0ZShyb3V0ZSwgcGFyYW1zLCB1aUNvbnRleC5vYmplY3QpO1xuICAgIH1cblxuXG4gICAgcHJlcGFyZVJvdXRlKGNvbnRleHQ6IENvbnRleHQsIHdpdGhCYWNrQWN0aW9uOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgICAgICBsZXQgcGFnZUJpbmRpbmdzID0gY29udGV4dC5wcm9wZXJ0eUZvcktleSgncGFnZUJpbmRpbmdzJyk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQocGFnZUJpbmRpbmdzKSkge1xuICAgICAgICAgICAgcGFnZUJpbmRpbmdzLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGsgIT09IE9iamVjdE1ldGEuS2V5T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PnBhcmFtcylba10gPSBjb250ZXh0LnJlc29sdmVWYWx1ZSh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQod2l0aEJhY2tBY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgKDxhbnk+cGFyYW1zKVsnYiddID0gd2l0aEJhY2tBY3Rpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG5cbiAgICBwcmVwYXJlUm91dGVGb3JDb21wb25lbnQoY29tcG9uZW50OiBhbnksIGNvbnRleHQ6IENvbnRleHQsIHdpdGhCYWNrQWN0aW9uOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgICAgICBsZXQgcGFnZUJpbmRpbmdzID0gY29udGV4dC5wcm9wZXJ0eUZvcktleSgncGFnZUJpbmRpbmdzJyk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQocGFnZUJpbmRpbmdzKSkge1xuICAgICAgICAgICAgcGFnZUJpbmRpbmdzLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50W2tdID0gdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cblxuICAgIGdvdG9Nb2R1bGUobW9kdWxlOiBJdGVtUHJvcGVydGllcywgYWN0aXZhdGVkUGF0aD86IHN0cmluZyk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuZW52LmRlbGV0ZVZhbHVlKEFDVElWRV9DTlRYKTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm5ld0NvbnRleHQoKTtcblxuXG4gICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5TW9kdWxlLCBtb2R1bGUubmFtZSk7XG4gICAgICAgIGxldCBwYWdlTmFtZSA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUhvbWVQYWdlKTtcblxuXG4gICAgICAgIGxldCByb3V0ZSA9IHRoaXMucm91dGluZ1NlcnZpY2Uucm91dGVGb3JQYWdlKHBhZ2VOYW1lLCBtb2R1bGUubmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgYWN0aXZhdGVkUGF0aCk7XG4gICAgICAgIGlmIChhY3RpdmF0ZWRQYXRoID09PSAnLycpIHtcbiAgICAgICAgICAgIGFjdGl2YXRlZFBhdGggPSAnJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGF0aCA9IGAke2FjdGl2YXRlZFBhdGh9LyR7cm91dGUucGF0aH1gO1xuXG4gICAgICAgIGxldCBwYXJhbXMgPSB0aGlzLnByZXBhcmVSb3V0ZShjb250ZXh0LCBudWxsKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLm5hdmlnYXRlKFtwYXRoLCBwYXJhbXNdLCB7c2tpcExvY2F0aW9uQ2hhbmdlOiB0cnVlfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1JvdXRlKGFjdGlvblJlc3VsdDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1N0cmluZ01hcChhY3Rpb25SZXN1bHQpICYmIGlzUHJlc2VudChhY3Rpb25SZXN1bHRbJ3BhdGgnXSk7XG5cbiAgICB9XG5cbiAgICBjb21wUGFnZVdpdGhOYW1lKG5hbWU6IHN0cmluZyk6IFR5cGU8YW55PiB7XG4gICAgICAgIGxldCBjdXJyVHlwZSA9IHRoaXMuY29tcG9uZW50UmVnaXN0cnkubmFtZVRvVHlwZS5nZXQobmFtZSk7XG4gICAgICAgIGlmIChpc0JsYW5rKGN1cnJUeXBlKSkge1xuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCBuYW1lICsgJyBjb21wb25lbnQgZG9lcyBub3QgZXhpc3RzLiBDcmVhdGUgRHVtbXkgQ29tcG9uZW50IGluc3RlYWQgb2YnICtcbiAgICAgICAgICAgICAgICAnIHRocm93aW5nIHRoaXMgZXJyb3InKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VyclR5cGU7XG4gICAgfVxuXG5cbiAgICAvLyBjYWxsZXIgbXVzdCBwdXNoL3BvcCFcbiAgICBhY3Rpb25zQnlDYXRlZ29yeShjb250ZXh0OiBDb250ZXh0LCByZXN1bHQ6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4sXG4gICAgICAgICAgICAgICAgICAgICAgem9uZXM6IHN0cmluZ1tdKTogQXJyYXk8SXRlbVByb3BlcnRpZXM+IHtcbiAgICAgICAgbGV0IGNhdE5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgYWN0aW9uQ2F0ZWdvcmllcyA9IHRoaXMuaXRlbUxpc3QoY29udGV4dCwgT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSwgem9uZXMpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoYWN0aW9uQ2F0ZWdvcmllcykpIHtcbiAgICAgICAgICAgIGFjdGlvbkNhdGVnb3JpZXMuZm9yRWFjaCgoaXRlbTogSXRlbVByb3BlcnRpZXMpID0+IGNhdE5hbWVzLnB1c2goaXRlbS5uYW1lKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZEFjdGlvbnNGb3JDYXRlZ29yaWVzKGNvbnRleHQsIHJlc3VsdCwgY2F0TmFtZXMpO1xuICAgICAgICByZXR1cm4gYWN0aW9uQ2F0ZWdvcmllcztcbiAgICB9XG5cbiAgICBhZGRBY3Rpb25zRm9yQ2F0ZWdvcmllcyhjb250ZXh0OiBDb250ZXh0LCByZXN1bHQ6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0TmFtZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGNhdCBvZiBjYXROYW1lcykge1xuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBpZiAoY2F0ICE9PSBPYmplY3RNZXRhLkRlZmF1bHRBY3Rpb25DYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0KE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnksIGNhdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEFjdGlvbnNCeUNhdGVnb3J5KGNvbnRleHQsIHJlc3VsdCwgY2F0KTtcbiAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgY29sbGVjdEFjdGlvbnNCeUNhdGVnb3J5KGNvbnRleHQ6IENvbnRleHQsIHJlc3VsdDogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2F0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFjdGlvbkluZm9zOiBJdGVtUHJvcGVydGllc1tdID0gdGhpcy5pdGVtUHJvcGVydGllcyhjb250ZXh0LCBPYmplY3RNZXRhLktleUFjdGlvbixcbiAgICAgICAgICAgIHRydWUpO1xuICAgICAgICBmb3IgKGxldCBhY3Rpb25JbmZvIG9mIGFjdGlvbkluZm9zKSB7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0KE9iamVjdE1ldGEuS2V5QWN0aW9uLCBhY3Rpb25JbmZvLm5hbWUpO1xuXG4gICAgICAgICAgICBsZXQgdmlzaWJsZSA9IGNvbnRleHQuYm9vbGVhblByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5VmlzaWJsZSwgdHJ1ZSk7XG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeSA9IGFjdGlvbkluZm8ucHJvcGVydGllcy5nZXQoT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcnkgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeSA9IE9iamVjdE1ldGEuRGVmYXVsdEFjdGlvbkNhdGVnb3J5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Q2F0ICE9PSBjYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZm9yQ2F0ZWdvcnk6IEl0ZW1Qcm9wZXJ0aWVzW10gPSByZXN1bHQuZ2V0KGNhdGVnb3J5KTtcbiAgICAgICAgICAgICAgICBpZiAoaXNCbGFuayhmb3JDYXRlZ29yeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yQ2F0ZWdvcnkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNldChjYXRlZ29yeSwgZm9yQ2F0ZWdvcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3JDYXRlZ29yeS5wdXNoKGFjdGlvbkluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb21wdXRlTW9kdWxlSW5mbyhjb250ZXh0OiBDb250ZXh0ID0gdGhpcy5uZXdDb250ZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tWaXNpYmlsaXR5OiBib29sZWFuID0gdHJ1ZSk6IE1vZHVsZUluZm8ge1xuXG4gICAgICAgIGxldCBtb2R1bGVJbmZvOiBNb2R1bGVJbmZvID0gbmV3IE1vZHVsZUluZm8oKTtcbiAgICAgICAgbW9kdWxlSW5mby5tb2R1bGVzID0gW107XG5cbiAgICAgICAgbGV0IGFsbE1vZHVsZVByb3BzOiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSB0aGlzLml0ZW1MaXN0KGNvbnRleHQsIFVJTWV0YS5LZXlNb2R1bGUsXG4gICAgICAgICAgICBVSU1ldGEuQWN0aW9uWm9uZXMpO1xuICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZU5hbWVzID0gW107XG4gICAgICAgIG1vZHVsZUluZm8ubW9kdWxlQnlOYW1lcyA9IG5ldyBNYXA8c3RyaW5nLCBJdGVtUHJvcGVydGllcz4oKTtcblxuICAgICAgICBmb3IgKGxldCBtb2R1bGUgb2YgYWxsTW9kdWxlUHJvcHMpIHtcblxuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5TW9kdWxlLCBtb2R1bGUubmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChjaGVja1Zpc2liaWxpdHkgJiYgIWNvbnRleHQuYm9vbGVhblByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlWaXNpYmxlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vZHVsZUluZm8ubW9kdWxlTmFtZXMucHVzaChtb2R1bGUubmFtZSk7XG5cbiAgICAgICAgICAgIC8vIC8vIHRvZG86IGNyZWF0ZSB0eXBlc2NyaXB0IGFub3RhdGlvblxuICAgICAgICAgICAgLy8gY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICAvLyBjb250ZXh0LnNldChcImhvbWVGb3JDbGFzc2VzXCIsIHRydWUpO1xuICAgICAgICAgICAgLy8gbGV0IGhvbWVDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5pdGVtTmFtZXMoY29udGV4dCwgVUlNZXRhLktleUNsYXNzKTtcbiAgICAgICAgICAgIC8vIGNvbnRleHQucG9wKCk7XG5cblxuICAgICAgICAgICAgbGV0IG1vZFByb3BlcnRpZXMgPSBuZXcgSXRlbVByb3BlcnRpZXMobW9kdWxlLm5hbWUsIGNvbnRleHQuYWxsUHJvcGVydGllcygpLCBmYWxzZSk7XG4gICAgICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZXMucHVzaChtb2RQcm9wZXJ0aWVzKTtcblxuICAgICAgICAgICAgbW9kdWxlSW5mby5tb2R1bGVCeU5hbWVzLnNldChtb2R1bGUubmFtZSwgbW9kUHJvcGVydGllcyk7XG5cbiAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgY29udGV4dC5zZXQoVUlNZXRhLktleU1vZHVsZSwgbW9kdWxlSW5mby5tb2R1bGVOYW1lcyk7XG4gICAgICAgIG1vZHVsZUluZm8uYWN0aW9uc0J5Q2F0ZWdvcnkgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+PigpO1xuICAgICAgICBtb2R1bGVJbmZvLmFjdGlvbkNhdGVnb3JpZXMgPSB0aGlzLmFjdGlvbnNCeUNhdGVnb3J5KGNvbnRleHQsIG1vZHVsZUluZm8uYWN0aW9uc0J5Q2F0ZWdvcnksXG4gICAgICAgICAgICBVSU1ldGEuTW9kdWxlQWN0aW9uWm9uZXMpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgICAgIHJldHVybiBtb2R1bGVJbmZvO1xuICAgIH1cblxuXG4gICAgY3VycmVudE1vZHVsZUxhYmVsKG1vZHVsZU5hbWU6IHN0cmluZywgY29udGV4dDogQ29udGV4dCA9IHRoaXMubmV3Q29udGV4dCgpKTogc3RyaW5nIHtcbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIGNvbnRleHQuc2V0KFVJTWV0YS5LZXlNb2R1bGUsIG1vZHVsZU5hbWUpO1xuICAgICAgICBsZXQgbGFiZWw6IHN0cmluZyA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUxhYmVsKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgICAgICByZXR1cm4gbGFiZWw7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBNb2R1bGVJbmZvIHtcbiAgICBtb2R1bGVzOiBBcnJheTxJdGVtUHJvcGVydGllcz47XG4gICAgbW9kdWxlTmFtZXM6IEFycmF5PHN0cmluZz47XG4gICAgbW9kdWxlQnlOYW1lczogTWFwPHN0cmluZywgSXRlbVByb3BlcnRpZXM+O1xuICAgIGFjdGlvbkNhdGVnb3JpZXM6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPjtcbiAgICBhY3Rpb25zQnlDYXRlZ29yeTogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+Pjtcbn1cblxuXG5leHBvcnQgY2xhc3MgTG9jYWxpemVkU3RyaW5nIGV4dGVuZHMgRHluYW1pY1Byb3BlcnR5VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIG1ldGE6IFVJTWV0YSwgcHJvdGVjdGVkIF9tb2R1bGU6IHN0cmluZywgcHJvdGVjdGVkICBfa2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9kZWZhdWx0VmFsdWU6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnkge1xuXG4gICAgICAgIGxldCBsb2NhbGl6ZWRTdHJpbmc6IGFueTtcbiAgICAgICAgLy8gbGV0IGNsYXp6ID0gY29udGV4dC52YWx1ZXMuZ2V0KCdjbGFzcycpO1xuICAgICAgICAvLyBpZiAoaXNQcmVzZW50KHRoaXMuX2tleSkgJiYgaXNQcmVzZW50KHRoaXMubWV0YS5pMThuU2VydmljZSkpIHtcbiAgICAgICAgLy8gICAgIGxldCBpMThuS2V5ID0gY2xhenogKyAnLicgKyB0aGlzLl9rZXk7XG4gICAgICAgIC8vICAgICBsb2NhbGl6ZWRTdHJpbmcgPSB0aGlzLm1ldGEuaTE4blNlcnZpY2UuaW5zdGFudChpMThuS2V5KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIHdoZW4gaXQgcmV0dXJuIHRoZSBzYW1lIHN0cmluZyBtb3N0IGxpa2VseSBpdCBtZWFucyB0aGVyZSBpcyBub1xuICAgICAgICAvLyAgICAgLy8gdHJhbnNsYXRpb24gc28gZGVmYXVsdCBpdCB0byBudWxsXG4gICAgICAgIC8vICAgICBsb2NhbGl6ZWRTdHJpbmcgPSAobG9jYWxpemVkU3RyaW5nID09PSBpMThuS2V5KSA/IG51bGwgOiBsb2NhbGl6ZWRTdHJpbmc7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBpZiAoaXNCbGFuayhsb2NhbGl6ZWRTdHJpbmcpIHx8IHRoaXMuX2tleSA9PT0gT2JqZWN0TWV0YS5LZXlGaWVsZCkge1xuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRWYWx1ZTtcbiAgICAgICAgLy8gfVxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnTG9jYWxlZFN0cmluZzogeycgKyB0aGlzLl9rZXkgKyAnIC0gJyArIHRoaXMuX2RlZmF1bHRWYWx1ZSArICcgfSc7XG4gICAgfVxufVxuXG5jbGFzcyBMb2NhbGl6ZWRMYWJlbFN0cmluZyBleHRlbmRzIExvY2FsaXplZFN0cmluZyBpbXBsZW1lbnRzIFByb3BlcnR5TWFwQXdha2luZyB7XG4gICAgc3RhdGljIERlZmF1bHRNb2R1bGUgPSAnZGVmYXVsdCc7XG4gICAgcHJvcGVydHlBd2FraW5nOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBtZXRhOiBVSU1ldGEpIHtcbiAgICAgICAgc3VwZXIobWV0YSwgTG9jYWxpemVkTGFiZWxTdHJpbmcuRGVmYXVsdE1vZHVsZSwgbnVsbCwgbnVsbCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueSB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2tleSkpIHtcbiAgICAgICAgICAgIGxldCBzY29wZUtleTogc3RyaW5nID0gY29udGV4dC52YWx1ZXMuZ2V0KE1ldGEuU2NvcGVLZXkpO1xuICAgICAgICAgICAgbGV0IHNjb3BlVmFsOiBzdHJpbmcgPSBjb250ZXh0LnZhbHVlcy5nZXQoc2NvcGVLZXkpO1xuXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0VmFsdWUgPSBVSU1ldGEuZGVmYXVsdExhYmVsRm9ySWRlbnRpZmllcihzY29wZVZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2tleSA9IHNjb3BlS2V5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5ldmFsdWF0ZShjb250ZXh0KTtcbiAgICB9XG5cbiAgICBhd2FrZUZvclByb3BlcnR5TWFwKG1hcDogUHJvcGVydHlNYXApOiBhbnkge1xuICAgICAgICByZXR1cm4gbmV3IExvY2FsaXplZExhYmVsU3RyaW5nKHRoaXMubWV0YSk7XG4gICAgfVxuXG59XG5cblxuY2xhc3MgUHJvcEZpZWxkc0J5Wm9uZVJlc29sdmVyIGV4dGVuZHMgU3RhdGljYWxseVJlc29sdmFibGUge1xuXG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55IHtcbiAgICAgICAgbGV0IG0gPSAoPFVJTWV0YT5jb250ZXh0Lm1ldGEpLml0ZW1OYW1lc0J5Wm9uZXMoY29udGV4dCwgVUlNZXRhLktleUZpZWxkLFxuICAgICAgICAgICAgKDxVSU1ldGE+Y29udGV4dC5tZXRhKS56b25lcyhjb250ZXh0KSk7XG4gICAgICAgIGxldCB6b25lUGF0aCA9ICg8VUlNZXRhPmNvbnRleHQubWV0YSkuem9uZVBhdGgoY29udGV4dCk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoem9uZVBhdGgpKSB7XG5cblxuICAgICAgICAgICAgbSA9IDxNYXA8c3RyaW5nLCBhbnk+PiBGaWVsZFBhdGguZ2V0RmllbGRWYWx1ZShtLCB6b25lUGF0aCk7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayhtKSkge1xuICAgICAgICAgICAgICAgIG0gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cbn1cblxuY2xhc3MgUHJvcEZpZWxkUHJvcGVydHlMaXN0UmVzb2x2ZXIgZXh0ZW5kcyBTdGF0aWNhbGx5UmVzb2x2YWJsZSB7XG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55IHtcbiAgICAgICAgcmV0dXJuICg8VUlNZXRhPmNvbnRleHQubWV0YSkuZmllbGRMaXN0KGNvbnRleHQpO1xuICAgIH1cbn1cblxuY2xhc3MgUHJvcExheW91dHNCeVpvbmVSZXNvbHZlciBleHRlbmRzIFN0YXRpY2FsbHlSZXNvbHZhYmxlIHtcblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnkge1xuICAgICAgICByZXR1cm4gKDxVSU1ldGE+Y29udGV4dC5tZXRhKS5pdGVtTmFtZXNCeVpvbmVzKGNvbnRleHQsIFVJTWV0YS5LZXlMYXlvdXQsXG4gICAgICAgICAgICAoPFVJTWV0YT5jb250ZXh0Lm1ldGEpLnpvbmVzKGNvbnRleHQpKTtcbiAgICB9XG59XG5cblxuY2xhc3MgX0RlZmF1bHRMYWJlbEdlbmVyYXRvciBleHRlbmRzIFN0YXRpY2FsbHlSZXNvbHZhYmxlIHtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55IHtcbiAgICAgICAgbGV0IGZpZWxkTmFtZSA9IGNvbnRleHQudmFsdWVzLmdldCh0aGlzLl9rZXkpO1xuXG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KGZpZWxkTmFtZSkgJiYgaXNTdHJpbmcoZmllbGROYW1lKSkgP1xuICAgICAgICAgICAgVUlNZXRhLmRlZmF1bHRMYWJlbEZvcklkZW50aWZpZXIoZmllbGROYW1lKSA6IG51bGw7XG4gICAgfVxufVxuXG4vKipcbiAqIExvYWQgVXNlciBkZWZpbmVkIG1ldGEgZGF0YS4gVGhpcyBjbGFzcyBpcyB0cmlnZ2VyZWQgYXMgc29vbiBhcyB3ZSBjcmVhdGUgYSBjb250ZXh0IGFuZFxuICogcGFzcyBhbiBvYmplY3QgaW50byBpdC4gQmFzZWQgb24gdGhlIG9iamVjdCB3ZSBub3RpZnkgZGlmZmVyZW50IE9ic2VydmVycyBwYXNzaW5nIG5hbWVcbiAqIG9mIHRoZSBjbGFzcyBhbmQgaGVyZSB3ZSBzZWFyY2ggaWYgd2UgaGF2ZSBhbnkgUnVsZXMgYXZhaWxhYmxlIGZvciBjdXJyZW50IGNsYXNzTmFtZSBhbmRcbiAqIHRyeSB0byBsb2FkIHRoZSBSdWxlLlxuICovXG5jbGFzcyBVc2VyTWV0YURhdGFQcm92aWRlciBpbXBsZW1lbnRzIFZhbHVlUXVlcmllZE9ic2VydmVyIHtcblxuICAgIG5vdGlmeShtZXRhOiBNZXRhLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgYVJ1bGVzOiBBcnJheTxKc29uUnVsZT47XG4gICAgICAgIGxldCB1aU1ldGE6IFVJTWV0YSA9IDxVSU1ldGE+IG1ldGE7XG5cbiAgICAgICAgaWYgKHVpTWV0YS5fdGVzdFJ1bGVzLmhhcyh2YWx1ZSArICdSdWxlJykpIHtcbiAgICAgICAgICAgIC8vIHNpbmNlIHdlIGFyZSBpbiBkZXZlbG9wbWVudCBtb2RlIGFuZCB0ZXN0IG1vZGUgaXMgb24gd2UgY2FuIGNoZWNrIGV4dHJhIHJlcG9zaXRvcnlcbiAgICAgICAgICAgIC8vIHVzZWQgYnkgdGVzdHMsIHdlIG5lZWQgdG8gY2hlY2sgaWYgd2UgYXJlIG5vdCBydW5uaW5nIHVuaXR0ZXN0IGFuZCBhIGNsYXNzIGlzIG5vdFxuICAgICAgICAgICAgLy8gYXBwbGljYXRpb24gZGVmaW5lZCBidXQgdW5pdHRlc3QgZGVmaW5lZCBydWxlXG5cbiAgICAgICAgICAgIGlmICh1aU1ldGEuX3Rlc3RSdWxlcy5oYXModmFsdWUgKyAnUnVsZScpICYmXG4gICAgICAgICAgICAgICAgaXNQcmVzZW50KHVpTWV0YS5fdGVzdFJ1bGVzLmdldCh2YWx1ZSArICdSdWxlJykub3NzKSkge1xuICAgICAgICAgICAgICAgIGFSdWxlcyA9IHVpTWV0YS5fdGVzdFJ1bGVzLmdldCh2YWx1ZSArICdSdWxlJykub3NzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWV0YS5sb2FkVXNlclJ1bGUoYVJ1bGVzLCB2YWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodWlNZXRhLmFwcENvbmZpZykgJiZcbiAgICAgICAgICAgIHVpTWV0YS5hcHBDb25maWcuZ2V0KFVJTWV0YS5BcHBDb25maWdVc2VyUnVsZXNQYXJhbSkpIHtcblxuICAgICAgICAgICAgbGV0IHVzZXJSZWZlcmVuY2VzOiBhbnlbXSA9IHVpTWV0YS5hcHBDb25maWcuZ2V0KFVJTWV0YS5BcHBDb25maWdVc2VyUnVsZXNQYXJhbSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdXNlclJlZmVyZW5jZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHVzZXJSZWZlcmVuY2VzW2ldW3ZhbHVlICsgJ1J1bGUnXSkgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNQcmVzZW50KHVzZXJSZWZlcmVuY2VzW2ldW3ZhbHVlICsgJ1J1bGUnXS5vc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFSdWxlcyA9IHVzZXJSZWZlcmVuY2VzW2ldW3ZhbHVlICsgJ1J1bGUnXS5vc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWV0YS5sb2FkVXNlclJ1bGUoYVJ1bGVzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==