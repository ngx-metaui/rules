/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @type {?} */
        let lastDot = fieldName.lastIndexOf('.');
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
        /** @type {?} */
        let zones = context.propertyForKey('zones');
        return (isBlank(zones)) ? Meta.toList(UIMeta.ZoneMain) : zones;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    zonePath(context) {
        /** @type {?} */
        let zonePath;
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
        /** @type {?} */
        let aRules;
        /** @type {?} */
        let userReferences;
        /** @type {?} */
        let appRuleFiles = ['Application'];
        if (isPresent(this.appConfig)) {
            appRuleFiles = this.appConfig.get(UIMeta.AppConfigRuleFilesParam) || ['Application'];
            userReferences = this.appConfig.get(UIMeta.AppConfigUserRulesParam);
            // make sure we have always Application and make it more additive.
            if (!ListWrapper.contains(appRuleFiles, 'Application')) {
                appRuleFiles.unshift('Application');
            }
        }
        for (let ruleFile of appRuleFiles) {
            /** @type {?} */
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
                        }
                        finally {
                            this.endRuleSet();
                        }
                    }
                }
            }
            else {
                for (let i in userReferences) {
                    /** @type {?} */
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
        /** @type {?} */
        let m = new Map();
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
        /** @type {?} */
        let itemsByZones = this.itemsByZones(context, key, zones);
        return this.mapItemPropsToNames(itemsByZones);
    }
    /**
     * @param {?} itemsByZones
     * @return {?}
     */
    mapItemPropsToNames(itemsByZones) {
        /** @type {?} */
        let namesByZones = new Map();
        MapWrapper.iterable(itemsByZones).forEach((value, key) => {
            if (isPresent(value) && isArray(value)) {
                /** @type {?} */
                let names = [];
                for (let item of value) {
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
        /** @type {?} */
        let fieldInfos = this.itemProperties(context, key, false);
        /** @type {?} */
        let predecessors = MapWrapper.groupBy(fieldInfos, (item) => {
            /** @type {?} */
            let pred = item.properties.get(UIMeta.KeyAfter);
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
        /** @type {?} */
        let predecessors = this.predecessorMap(context, key, zones[0]);
        /** @type {?} */
        let result = [];
        for (let zone of zones) {
            this.accumulatePrecessors(predecessors, zone, result);
        }
        return result;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    isZoneReference(key) {
        /** @type {?} */
        let lastDot = key.lastIndexOf('.');
        /** @type {?} */
        let suffix = (lastDot === -1) ? key : key.substring(lastDot + 1);
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
        /** @type {?} */
        let predecessors = this.predecessorMap(context, property, zones[0]);
        /** @type {?} */
        let byZone = new Map();
        MapWrapper.iterable(predecessors).forEach((value, zone) => {
            if (this.isZoneReference(zone)) {
                /** @type {?} */
                let list = [];
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
        /** @type {?} */
        let items = predecessors.get(key);
        if (isBlank(items)) {
            return;
        }
        ListWrapper.sort(items, (o1, o2) => {
            /** @type {?} */
            let r1 = o1.properties.get(UIMeta.KeyRank);
            /** @type {?} */
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
        /** @type {?} */
        let key = this.scopeKeyForSelector(contextPreds);
        if (isBlank(key) || key === UIMeta.KeyClass) {
            key = UIMeta.KeyField;
        }
        /** @type {?} */
        let selector = new Array();
        ListWrapper.addAll(selector, contextPreds);
        selector.push(new Selector(key, itemName));
        /** @type {?} */
        let props = new Map();
        if (isPresent(predecessor)) {
            props.set(UIMeta.KeyAfter, predecessor);
        }
        if (isPresent(traits)) {
            props.set(UIMeta.KeyTrait, traits);
        }
        /** @type {?} */
        let rule = new Rule(selector, props, 0, lineNumber);
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
        /** @type {?} */
        let result = [];
        if (isPresent(fieldsByZones)) {
            for (let zone of zoneList) {
                /** @type {?} */
                let fields = fieldsByZones.get(zone);
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
    /**
     * @param {?} className
     * @return {?}
     */
    displayKeyForClass(className) {
        /** @type {?} */
        let context = this.newContext();
        context.set(UIMeta.KeyLayout, 'LabelField');
        context.set(UIMeta.KeyClass, className);
        /** @type {?} */
        let fields = this.itemProperties(context, UIMeta.KeyField, true);
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
        return (isPresent(this._injector)) ? this._injector.get(RoutingService)
            : null;
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
                /** @type {?} */
                let userReferences = this.appConfig.get(UIMeta.AppConfigUserRulesParam);
                for (let uRule of userReferences) {
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
        /** @type {?} */
        let actionCategory = action.properties.get(ObjectMeta.KeyActionCategory);
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
        /** @type {?} */
        let actionResults = context.propertyForKey('actionResults');
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
        /** @type {?} */
        let params = this.prepareRoute(context, withBackAction);
        /** @type {?} */
        let uiContex = /** @type {?} */ (context);
        this.routingService.navigateWithRoute(route, params, uiContex.object);
    }
    /**
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    prepareRoute(context, withBackAction) {
        /** @type {?} */
        let params = {};
        /** @type {?} */
        let pageBindings = context.propertyForKey('pageBindings');
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
        /** @type {?} */
        let params = {};
        /** @type {?} */
        let pageBindings = context.propertyForKey('pageBindings');
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
        /** @type {?} */
        let context = this.newContext();
        context.push();
        context.set(UIMeta.KeyModule, module.name);
        /** @type {?} */
        let pageName = context.propertyForKey(UIMeta.KeyHomePage);
        /** @type {?} */
        let route = this.routingService.routeForPage(pageName, module.name.toLowerCase(), activatedPath);
        if (activatedPath === '/') {
            activatedPath = '';
        }
        /** @type {?} */
        let path = `${activatedPath}/${route.path}`;
        /** @type {?} */
        let params = this.prepareRoute(context, null);
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
        /** @type {?} */
        let currType = this.componentRegistry.nameToType.get(name);
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
        /** @type {?} */
        let catNames = [];
        /** @type {?} */
        let actionCategories = this.itemList(context, ObjectMeta.KeyActionCategory, zones);
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
        for (let cat of catNames) {
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
        /** @type {?} */
        let actionInfos = this.itemProperties(context, ObjectMeta.KeyAction, true);
        for (let actionInfo of actionInfos) {
            context.push();
            context.set(ObjectMeta.KeyAction, actionInfo.name);
            /** @type {?} */
            let visible = context.booleanPropertyForKey(ObjectMeta.KeyVisible, true);
            context.pop();
            if (visible) {
                /** @type {?} */
                let category = actionInfo.properties.get(ObjectMeta.KeyActionCategory);
                if (category == null) {
                    category = ObjectMeta.DefaultActionCategory;
                }
                if (targetCat !== category) {
                    continue;
                }
                /** @type {?} */
                let forCategory = result.get(category);
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
        /** @type {?} */
        let moduleInfo = new ModuleInfo();
        moduleInfo.modules = [];
        /** @type {?} */
        let allModuleProps = this.itemList(context, UIMeta.KeyModule, UIMeta.ActionZones);
        moduleInfo.moduleNames = [];
        moduleInfo.moduleByNames = new Map();
        for (let module of allModuleProps) {
            context.push();
            context.set(UIMeta.KeyModule, module.name);
            if (checkVisibility && !context.booleanPropertyForKey(UIMeta.KeyVisible, true)) {
                context.pop();
                continue;
            }
            moduleInfo.moduleNames.push(module.name);
            /** @type {?} */
            let modProperties = new ItemProperties(module.name, context.allProperties(), false);
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
        /** @type {?} */
        let label = context.propertyForKey(UIMeta.KeyLabel);
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
if (false) {
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
if (false) {
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
        /** @type {?} */
        let localizedString;
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
if (false) {
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
            /** @type {?} */
            let scopeKey = context.values.get(Meta.ScopeKey);
            /** @type {?} */
            let scopeVal = context.values.get(scopeKey);
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
if (false) {
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
        /** @type {?} */
        let m = (/** @type {?} */ (context.meta)).itemNamesByZones(context, UIMeta.KeyField, (/** @type {?} */ (context.meta)).zones(context));
        /** @type {?} */
        let zonePath = (/** @type {?} */ (context.meta)).zonePath(context);
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
        /** @type {?} */
        let fieldName = context.values.get(this._key);
        return (isPresent(fieldName) && isString(fieldName)) ?
            UIMeta.defaultLabelForIdentifier(fieldName) : null;
    }
}
if (false) {
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
        /** @type {?} */
        let aRules;
        /** @type {?} */
        let uiMeta = /** @type {?} */ (meta);
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
            /** @type {?} */
            let userReferences = uiMeta.appConfig.get(UIMeta.AppConfigUserRulesParam);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWltZXRhLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsiY29yZS91aW1ldGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFdBQVcsRUFDWCxVQUFVLEVBQ1YsY0FBYyxFQUNkLElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFDSCxJQUFJLEVBR0osa0JBQWtCLEVBRXJCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBVSxTQUFTLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xHLE9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXRDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sdUNBQXVDLENBQUM7Ozs7Ozs7OztBQWFsRSxNQUFNLGFBQWMsU0FBUSxVQUFVOztRQThFOUIsS0FBSyxFQUFFLENBQUM7Ozs7UUFNUixJQUFJLENBQUM7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksb0JBQW9CLEVBQUUsQ0FBQyxDQUFDOzs7WUFJMUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztZQUdoRCxJQUFJLENBQUMsbUNBQW1DLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsbUNBQW1DLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztZQUduRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUUvRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFL0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Ozs7WUFNekUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFFM0UsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFDckQsSUFBSSx3QkFBd0IsRUFBRSxFQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFDMUQsSUFBSSw2QkFBNkIsRUFBRSxFQUNuQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFDdEQsSUFBSSx5QkFBeUIsRUFBRSxFQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7U0FTekI7Z0JBQVMsQ0FBQztZQUNQLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjs7Ozs7SUE1RkwsTUFBTSxDQUFDLFdBQVc7UUFFZCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzFEOzs7OztJQUVELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxTQUFpQjs7UUFFOUMsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLElBQUksT0FBTyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2hDOzs7OztJQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFpQjtRQUV0QyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNyQzs7Ozs7SUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBYTtRQUVqQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNqQzs7Ozs7SUEyRUQsS0FBSyxDQUFDLE9BQWdCOztRQUVsQixJQUFJLEtBQUssR0FBa0IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNsRTs7Ozs7SUFHRCxRQUFRLENBQUMsT0FBZ0I7O1FBRXJCLElBQUksUUFBUSxDQUFNO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdEMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNqQjtRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7S0FDbkI7Ozs7O0lBR0QsVUFBVSxDQUFDLFdBQW9CLEtBQUs7UUFFaEMsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN4Qzs7Ozs7SUFHRCxvQkFBb0IsQ0FBQyxVQUFnQjtRQUdqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQztnQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3JEO29CQUFTLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCO1NBQ0o7UUFFRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDO2dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzVFO29CQUFTLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCO1NBQ0o7UUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2QztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDaEI7Ozs7O0lBTUQsb0JBQW9COztRQUVoQixJQUFJLE1BQU0sQ0FBa0I7O1FBQzVCLElBQUksY0FBYyxDQUFROztRQUMxQixJQUFJLFlBQVksR0FBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3JGLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7WUFHcEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFTLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDdkM7U0FDSjtRQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUM7O1lBQ2hDLElBQUksSUFBSSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O2dCQUs1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUM3QyxDQUFDO29CQUNHLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBRXZDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3dCQUN4RSxJQUFJLENBQUM7NEJBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUMxRDtnQ0FBUyxDQUFDOzRCQUNQLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt5QkFDckI7cUJBQ0o7aUJBQ0o7YUFDSjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUM7O29CQUMzQixJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWpDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRXRCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDN0QsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7eUJBQy9CO3FCQUNKO29CQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3dCQUN4RSxJQUFJLENBQUM7NEJBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUMxRDtnQ0FBUyxDQUFDOzRCQUNQLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt5QkFDckI7cUJBQ0o7aUJBQ0o7YUFDSjtTQUVKO0tBQ0o7Ozs7OztJQUVELFlBQVksQ0FBQyxNQUFXLEVBQUUsU0FBaUI7UUFHdkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDO2dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzthQUMxQztvQkFBUyxDQUFDO2dCQUNQLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtTQUNKO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7Ozs7SUFHRCwyQkFBMkIsQ0FBQyxHQUFXO1FBRW5DLE1BQU0sQ0FBQyxJQUFJLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFDOzs7Ozs7OztJQUdELG9CQUFvQixDQUFDLE9BQWUsRUFBRSxZQUFrQyxFQUNuRCxVQUFrQixFQUNsQixZQUFvQjs7UUFFckMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUMvQixDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQzdCLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0tBQzdFOzs7Ozs7O0lBR0QsNEJBQTRCLENBQUMsT0FBZSxFQUFFLFlBQWtDLEVBQ25ELFVBQWtCO1FBRTNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsRUFBRSxVQUFVLEVBQ2pGLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwQjs7Ozs7SUFFRCxtQ0FBbUMsQ0FBQyxHQUFXO1FBRTNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUMxRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEI7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQWdCO1FBRXRCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNyRTs7Ozs7SUFFRCxhQUFhLENBQUMsT0FBZ0I7UUFFMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3pFOzs7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsT0FBZ0IsRUFBRSxHQUFXLEVBQUUsS0FBZTs7UUFFM0QsSUFBSSxZQUFZLEdBQXFCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ2pEOzs7OztJQUVELG1CQUFtQixDQUFDLFlBQThCOztRQUU5QyxJQUFJLFlBQVksR0FBcUIsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUU1RCxVQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUVyRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3JDLElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztnQkFDekIsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLEtBQUssQ0FBQyxJQUFJLENBQ04sbUJBQWlCLElBQUksRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNwQztpQkFDSjtnQkFDRCxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUVoQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUNoQixJQUFJLENBQUMsbUJBQW1CLENBQ3BCLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3ZCOzs7Ozs7O0lBRUQsY0FBYyxDQUFDLE9BQWdCLEVBQUUsR0FBVyxFQUM3QixrQkFBMEI7O1FBRXJDLElBQUksVUFBVSxHQUEwQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7O1FBQ2pGLElBQUksWUFBWSxHQUF1QyxVQUFVLENBQUMsT0FBTyxDQUNyRSxVQUFVLEVBQUUsQ0FBQyxJQUFvQixFQUFFLEVBQUU7O1lBRWpDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO1NBQ3RELENBQUMsQ0FBQztRQUVQLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDdkI7Ozs7Ozs7SUFFRCxRQUFRLENBQUMsT0FBZ0IsRUFBRSxHQUFXLEVBQUUsS0FBZTs7UUFFbkQsSUFBSSxZQUFZLEdBQXVDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFDbkYsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ2QsSUFBSSxNQUFNLEdBQTBCLEVBQUUsQ0FBQztRQUV2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNqQjs7Ozs7SUFFRCxlQUFlLENBQUMsR0FBVzs7UUFHdkIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFDbkMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQ2pELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3hDLENBQUM7S0FDTDs7Ozs7OztJQUVELFlBQVksQ0FBQyxPQUFnQixFQUFFLFFBQWdCLEVBQUUsS0FBZTs7UUFFNUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUNwRSxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO1FBR3BDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBRXRELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDN0IsSUFBSSxJQUFJLEdBQVUsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRWhCLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMvQztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDakI7Ozs7Ozs7SUFHRCxvQkFBb0IsQ0FBQyxZQUFnRCxFQUFFLEdBQVcsRUFDN0QsTUFBVzs7UUFFNUIsSUFBSSxLQUFLLEdBQTBCLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7U0FDVjtRQUVELFdBQVcsQ0FBQyxJQUFJLENBQWlCLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7WUFFL0MsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUMzQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFM0MsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsRUFBRSxHQUFHLEdBQUcsQ0FBQzthQUNaO1lBQ0QsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsRUFBRSxHQUFHLEdBQUcsQ0FBQzthQUNaO1lBRUQsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDL0UsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7WUFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDOUQ7S0FDSjs7Ozs7Ozs7Ozs7SUFNRCxrQkFBa0IsQ0FBQyxRQUFnQixFQUFFLFlBQTZCLEVBQUUsV0FBbUIsRUFDcEUsTUFBVyxFQUNYLFVBQWtCO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjs7UUFFRCxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUN6Qjs7UUFDRCxJQUFJLFFBQVEsR0FBb0IsSUFBSSxLQUFLLEVBQVksQ0FBQztRQUN0RCxXQUFXLENBQUMsTUFBTSxDQUFXLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUVyRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDOztRQUMzQyxJQUFJLEtBQUssR0FBcUIsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUVyRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUMzQztRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDOztRQUNELElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7OztJQUVELGNBQWMsQ0FBQyxhQUF5QyxFQUFFLFFBQWtCLEVBQUUsR0FBVyxFQUMxRSxPQUFnQjs7UUFFM0IsSUFBSSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3pCLElBQUksTUFBTSxHQUFhLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRS9DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLFFBQVEsQ0FBQztpQkFDWjtnQkFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN2QixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDdEI7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUNqQjthQUNKO1NBQ0o7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCOzs7OztJQUVELGtCQUFrQixDQUFDLFNBQWlCOztRQUloQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzs7UUFDeEMsSUFBSSxNQUFNLEdBQTBCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFeEYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNyRTs7Ozs7O0lBR0QsWUFBWSxDQUFDLFNBQWlCLEVBQUUsZUFBdUI7UUFHbkQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsZUFBZSxDQUFDO1NBQzFCO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM3Qzs7Ozs7O0lBR0QscUJBQXFCLENBQUMsR0FBVyxFQUFFLFlBQW9CO1FBRW5ELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUNsQyxvRUFBb0UsQ0FBQyxDQUFDO1FBRTFFLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQ3RGOzs7O0lBR0QsSUFBSSxjQUFjO1FBRWQsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBaUIsY0FBYyxDQUFDO1lBQ25GLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDZDs7OztJQUVELElBQUksR0FBRztRQUVILE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxFQUFFLENBQUM7S0FDNUY7Ozs7SUFHRCxJQUFJLFNBQVM7UUFFVCxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDN0U7Ozs7Ozs7OztJQVFPLGtCQUFrQixDQUFDLGFBQWtCO1FBRXpDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLHNEQUFzRDtZQUNuRiw2Q0FBNkMsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFDbkYsb0VBQW9FO1lBQ3BFLDhDQUE4QyxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXBELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztnQkFDbkIsSUFBSSxjQUFjLEdBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBQy9FLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQy9DO2dCQUNELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQy9CO1NBRUo7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLDZEQUE2RCxDQUFDLENBQUM7U0FDdkU7Ozs7Ozs7Ozs7O0lBV0wsbUJBQW1CLENBQUMsTUFBc0IsRUFBRSxPQUFnQjtRQUV4RCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7O1FBQ2YsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixjQUFjLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7S0FFakI7Ozs7OztJQUVELFVBQVUsQ0FBQyxPQUFrQixFQUFFLGlCQUEwQixLQUFLO1FBRTFELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUVqQjs7Ozs7O0lBRU8sV0FBVyxDQUFDLE9BQWdCLEVBQUUsY0FBdUI7O1FBRXpELElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDO1NBQ1Y7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7Ozs7Ozs7O0lBRy9ELGFBQWEsQ0FBQyxPQUFnQixFQUFFLEtBQVUsRUFBRSxjQUF1Qjs7UUFFL0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7O1FBRXhELElBQUksUUFBUSxxQkFBMEIsT0FBTyxFQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDekU7Ozs7OztJQUdELFlBQVksQ0FBQyxPQUFnQixFQUFFLGNBQXVCOztRQUVsRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O1FBQ2hCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxFQUFFO2dCQUVwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLG1CQUFNLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlDO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsbUJBQU0sTUFBTSxFQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDO2FBQ3ZDO1NBRUo7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCOzs7Ozs7O0lBR0Qsd0JBQXdCLENBQUMsU0FBYyxFQUFFLE9BQWdCLEVBQUUsY0FBdUI7O1FBRTlFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7UUFDaEIsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQUU7Z0JBRXBDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEIsQ0FBQyxDQUFDO1NBQ047UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCOzs7Ozs7SUFHRCxVQUFVLENBQUMsTUFBc0IsRUFBRSxhQUFzQjtRQUdyRCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFDbEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBR2hDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBQzNDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUcxRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFDNUUsYUFBYSxDQUFDLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsYUFBYSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsYUFBYSxHQUFHLEVBQUUsQ0FBQztTQUN0Qjs7UUFDRCxJQUFJLElBQUksR0FBRyxHQUFHLGFBQWEsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7O1FBRTVDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztLQUM1RTs7Ozs7SUFFTyxPQUFPLENBQUMsWUFBaUI7UUFFN0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUl4RSxnQkFBZ0IsQ0FBQyxJQUFZOztRQUV6QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLCtEQUErRDtnQkFDaEYsc0JBQXNCLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUM7U0FDVjtRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7S0FDbkI7Ozs7Ozs7SUFJRCxpQkFBaUIsQ0FBQyxPQUFnQixFQUFFLE1BQTBDLEVBQzVELEtBQWU7O1FBRTdCLElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQzs7UUFDNUIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFbkYsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQW9CLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDaEY7UUFFRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsZ0JBQWdCLENBQUM7S0FDM0I7Ozs7Ozs7SUFFRCx1QkFBdUIsQ0FBQyxPQUFnQixFQUFFLE1BQTBDLEVBQzVELFFBQWtCO1FBRXRDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2xEO1lBRUQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2pCO0tBRUo7Ozs7Ozs7SUFHRCx3QkFBd0IsQ0FBQyxPQUFnQixFQUFFLE1BQTBDLEVBQzVELFNBQWlCOztRQUV0QyxJQUFJLFdBQVcsR0FBcUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFDakYsSUFBSSxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxJQUFJLFVBQVUsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBRW5ELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O2dCQUNWLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUV2RSxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsUUFBUSxHQUFHLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDL0M7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLFFBQVEsQ0FBQztpQkFDWjs7Z0JBRUQsSUFBSSxXQUFXLEdBQXFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNyQztnQkFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7S0FDSjs7Ozs7O0lBR0QsaUJBQWlCLENBQUMsVUFBbUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUNwQyxrQkFBMkIsSUFBSTs7UUFHN0MsSUFBSSxVQUFVLEdBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QyxVQUFVLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzs7UUFFeEIsSUFBSSxjQUFjLEdBQTBCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQy9FLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QixVQUFVLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUM1QixVQUFVLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUEwQixDQUFDO1FBRTdELEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUzQyxFQUFFLENBQUMsQ0FBQyxlQUFlLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDZCxRQUFRLENBQUM7YUFDWjtZQUVELFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFTekMsSUFBSSxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFdkMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztZQUV6RCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDakI7UUFFRCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RELFVBQVUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBaUMsQ0FBQztRQUN4RSxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsaUJBQWlCLEVBQ3RGLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVkLE1BQU0sQ0FBQyxVQUFVLENBQUM7S0FDckI7Ozs7OztJQUdELGtCQUFrQixDQUFDLFVBQWtCLEVBQUUsVUFBbUIsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUV2RSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7O1FBQzFDLElBQUksS0FBSyxHQUFXLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVkLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDaEI7O3NCQS96QnFCLFdBQVc7bUJBQ2QsUUFBUTttQkFDUixRQUFRO2lCQUNWLE1BQU07b0JBQ0gsU0FBUztrQkFDWCxPQUFPO21CQUNOLFFBQVE7a0JBQ1QsT0FBTzswQkFDQyxXQUFXO3FCQUNoQixVQUFVO3FCQUNWLFVBQVU7cUJBQ1YsVUFBVTswQkFDTCxjQUFjOzRCQUNaLGdCQUFnQjsrQkFDYixtQkFBbUI7OEJBQ3BCLGtCQUFrQjsrQkFDakIsbUJBQW1COzJCQUN2QixlQUFlOzZCQUNiLGtCQUFrQjsyQkFDcEIsaUJBQWlCOzRCQUdoQixPQUFPO2tCQUNSLE9BQU87aUJBQ1IsTUFBTTtrQkFDTCxPQUFPO29CQUNMLFNBQVM7bUJBQ1YsUUFBUTtvQkFDUCxTQUFTO29CQUNULFNBQVM7aUNBRUkseUJBQXlCO2lDQUN6Qix5QkFBeUI7b0JBRS9DO0lBQ2hCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsVUFBVTtJQUNsRCxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxVQUFVO0NBQ3RDO29CQUNtQjtJQUNoQixNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxVQUFVO0NBQ3hGO3FCQUNvQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7bUJBRUwsSUFBSTsyQkFFRixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7cUJBQ3pCLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXF4Qm5FLE1BQU07Q0FPTDs7Ozs7Ozs7Ozs7OztBQUdELE1BQU0sc0JBQXVCLFNBQVEsb0JBQW9COzs7Ozs7O0lBR3JELFlBQXNCLElBQVksRUFBWSxPQUFlLEVBQWEsSUFBWSxFQUNoRSxhQUFxQjtRQUV2QyxLQUFLLEVBQUUsQ0FBQztRQUhVLFNBQUksR0FBSixJQUFJLENBQVE7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQWEsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNoRSxrQkFBYSxHQUFiLGFBQWEsQ0FBUTtLQUcxQzs7Ozs7SUFFRCxRQUFRLENBQUMsT0FBZ0I7O1FBR3JCLElBQUksZUFBZSxDQUFNOzs7Ozs7Ozs7Ozs7O1FBY3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0tBQzdCOzs7O0lBRUQsUUFBUTtRQUVKLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztLQUM3RTtDQUNKOzs7Ozs7Ozs7OztBQUVELDBCQUEyQixTQUFRLGVBQWU7Ozs7SUFLOUMsWUFBc0IsSUFBWTtRQUU5QixLQUFLLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFGMUMsU0FBSSxHQUFKLElBQUksQ0FBUTsrQkFGUCxJQUFJO0tBSzlCOzs7OztJQUVELFFBQVEsQ0FBQyxPQUFnQjtRQUVyQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDckIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUN6RCxJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoRSxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUN4QjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUVELG1CQUFtQixDQUFDLEdBQWdCO1FBRWhDLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5Qzs7cUNBeEJzQixTQUFTOzs7Ozs7Ozs7QUE2QnBDLDhCQUErQixTQUFRLG9CQUFvQjs7Ozs7SUFJdkQsUUFBUSxDQUFDLE9BQWdCOztRQUVyQixJQUFJLENBQUMsR0FBRyxtQkFBUyxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQ3BFLG1CQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7UUFDM0MsSUFBSSxRQUFRLEdBQUcsbUJBQVMsT0FBTyxDQUFDLElBQUksRUFBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBR3RCLENBQUMscUJBQXNCLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDNUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQzthQUM5QjtTQUNKO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNaO0NBQ0o7QUFFRCxtQ0FBb0MsU0FBUSxvQkFBb0I7Ozs7O0lBRzVELFFBQVEsQ0FBQyxPQUFnQjtRQUVyQixNQUFNLENBQUMsbUJBQVMsT0FBTyxDQUFDLElBQUksRUFBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNwRDtDQUNKO0FBRUQsK0JBQWdDLFNBQVEsb0JBQW9COzs7OztJQUd4RCxRQUFRLENBQUMsT0FBZ0I7UUFFckIsTUFBTSxDQUFDLG1CQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFDcEUsbUJBQVMsT0FBTyxDQUFDLElBQUksRUFBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0NBQ0o7QUFHRCw0QkFBNkIsU0FBUSxvQkFBb0I7Ozs7SUFJckQsWUFBb0IsSUFBWTtRQUU1QixLQUFLLEVBQUUsQ0FBQztRQUZRLFNBQUksR0FBSixJQUFJLENBQVE7S0FHL0I7Ozs7O0lBRUQsUUFBUSxDQUFDLE9BQWdCOztRQUVyQixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDMUQ7Q0FDSjs7Ozs7Ozs7Ozs7QUFRRDs7Ozs7OztJQUdJLE1BQU0sQ0FBQyxJQUFVLEVBQUUsR0FBVyxFQUFFLEtBQVU7O1FBRXRDLElBQUksTUFBTSxDQUFrQjs7UUFDNUIsSUFBSSxNQUFNLHFCQUFvQixJQUFJLEVBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztZQUt4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2dCQUNyQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3pELENBQUM7Z0JBQ0csTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7YUFDdEQ7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUVwQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUN6RCxDQUFDOztZQUVHLElBQUksY0FBYyxHQUFVLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRWpGLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO29CQUM1QyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNyRCxDQUFDO29CQUNHLE1BQU0sR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztpQkFDbEQ7YUFDSjtZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0tBQ0o7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQXBwQ29uZmlnLFxuICAgIGFzc2VydCxcbiAgICBkZWNhbWVsaXplLFxuICAgIEVudmlyb25tZW50LFxuICAgIEZpZWxkUGF0aCxcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIGlzU3RyaW5nTWFwLFxuICAgIExpc3RXcmFwcGVyLFxuICAgIE1hcFdyYXBwZXIsXG4gICAgUm91dGluZ1NlcnZpY2UsXG4gICAgd2FyblxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7T2JqZWN0TWV0YX0gZnJvbSAnLi9vYmplY3QtbWV0YSc7XG5pbXBvcnQge0NvbXBvbmVudFJlZ2lzdHJ5fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7XG4gICAgTWV0YSxcbiAgICBQcm9wZXJ0eU1hcCxcbiAgICBQcm9wZXJ0eU1hcEF3YWtpbmcsXG4gICAgUHJvcGVydHlNZXJnZXJfQW5kLFxuICAgIFZhbHVlUXVlcmllZE9ic2VydmVyXG59IGZyb20gJy4vbWV0YSc7XG5pbXBvcnQge0NvbnRleHQsIFVJQ29udGV4dH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7U3lzdGVtUnVsZXN9IGZyb20gJy4vd2lkZ2V0cy1ydWxlcyc7XG5pbXBvcnQge0R5bmFtaWNQcm9wZXJ0eVZhbHVlLCBTdGF0aWNhbGx5UmVzb2x2YWJsZSwgU3RhdGljRHluYW1pY1dyYXBwZXJ9IGZyb20gJy4vcHJvcGVydHktdmFsdWUnO1xuaW1wb3J0IHtSdWxlLCBTZWxlY3Rvcn0gZnJvbSAnLi9ydWxlJztcbmltcG9ydCB7SnNvblJ1bGV9IGZyb20gJy4vanNvbi1ydWxlJztcbmltcG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4vaXRlbS1wcm9wZXJ0aWVzJztcbmltcG9ydCB7U3lzdGVtUGVyc2lzdGVuY2VSdWxlc30gZnJvbSAnLi9wZXJzaXN0ZW5jZS1ydWxlcyc7XG5pbXBvcnQge0FDVElWRV9DTlRYfSBmcm9tICcuL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcblxuXG4vKipcbiAqIFVJTWV0YSBpcyByZXNwb25zaWJsZSBzZXR0aW5nIGxheW91dHMgYW5kIGFsbCBhcm91bmQgdGhpcy4gV2UgY2FuIGVpdGhlciB1c2UgdGhpcyBhcyBhIHNpbmdsZXRvblxuICogb3IgdXNlIGl0IGFzIGEgc2VydmljZSB1c2luZyBBbmd1bGFyIEBJbmplY3QoKVxuICogUmlnaHQgbm93IHdlIHVzZSBzdGlsbCBzaW5nbGV0b24gYXMgd2UgbmVlZCB0aGlzIGNsYXNzIGFzIGEgbGlicmFyeSBmb3Igc29tZSBvdGhlciBwcm9qZWN0c1xuICpcbiAqXG4gKiB0b2RvOiBDb252ZXJ0IHRvIEluamVjdGFibGVcbiAqL1xuXG4gICAgLy8gQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVJTWV0YSBleHRlbmRzIE9iamVjdE1ldGFcbntcbiAgICBzdGF0aWMgS2V5T3BlcmF0aW9uID0gJ29wZXJhdGlvbic7XG4gICAgc3RhdGljIEtleU1vZHVsZSA9ICdtb2R1bGUnO1xuICAgIHN0YXRpYyBLZXlMYXlvdXQgPSAnbGF5b3V0JztcbiAgICBzdGF0aWMgS2V5QXJlYSA9ICdhcmVhJztcbiAgICBzdGF0aWMgS2V5RWRpdGluZyA9ICdlZGl0aW5nJztcbiAgICBzdGF0aWMgS2V5QWZ0ZXIgPSAnYWZ0ZXInO1xuICAgIHN0YXRpYyBLZXlIaWRkZW4gPSAnaGlkZGVuJztcbiAgICBzdGF0aWMgS2V5TGFiZWwgPSAnbGFiZWwnO1xuICAgIHN0YXRpYyBLZXlDb21wb25lbnROYW1lID0gJ2NvbXBvbmVudCc7XG4gICAgc3RhdGljIEtleUJpbmRpbmdzID0gJ2JpbmRpbmdzJztcbiAgICBzdGF0aWMgS2V5SG9tZVBhZ2UgPSAnaG9tZVBhZ2UnO1xuICAgIHN0YXRpYyBLZXlab25lUGF0aCA9ICd6b25lUGF0aCc7XG4gICAgc3RhdGljIFByb3BGaWVsZHNCeVpvbmUgPSAnZmllbGRzQnlab25lJztcbiAgICBzdGF0aWMgUHJvcElzRmllbGRzQnlab25lID0gJ2ZpdmVab25lTGF5b3V0JztcbiAgICBzdGF0aWMgUHJvcEFjdGlvbnNCeUNhdGVnb3J5ID0gJ2FjdGlvbnNCeUNhdGVnb3J5JztcbiAgICBzdGF0aWMgUHJvcEFjdGlvbkNhdGVnb3JpZXMgPSAnYWN0aW9uQ2F0ZWdvcmllcyc7XG4gICAgc3RhdGljIFByb3BGaWVsZFByb3BlcnR5TGlzdCA9ICdmaWVsZFByb3BlcnR5TGlzdCc7XG4gICAgc3RhdGljIFByb3BMYXlvdXRzQnlab25lID0gJ2xheW91dHNCeVpvbmUnO1xuICAgIHN0YXRpYyBLZXlXcmFwcGVyQ29tcG9uZW50ID0gJ3dyYXBwZXJDb21wb25lbnQnO1xuICAgIHN0YXRpYyBLZXlXcmFwcGVyQmluZGluZyA9ICd3cmFwcGVyQmluZGluZ3MnO1xuXG5cbiAgICBzdGF0aWMgUm9vdFByZWRlY2Vzc29yS2V5ID0gJ19yb290JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgWm9uZU1haW4gPSAnek1haW4nO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lVG9wID0gJ3pUb3AnO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lTGVmdCA9ICd6TGVmdCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpvbmVNaWRkbGUgPSAnek1pZGRsZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpvbmVSaWdodCA9ICd6UmlnaHQnO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lQm90dG9tID0gJ3pCb3R0b20nO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lRGV0YWlsID0gJ3pEZXRhaWwnO1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IEFwcENvbmZpZ1J1bGVGaWxlc1BhcmFtID0gJ21ldGF1aS5ydWxlcy5maWxlLW5hbWVzJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0gPSAnbWV0YXVpLnJ1bGVzLnVzZXItcnVsZXMnO1xuXG4gICAgc3RhdGljIFpvbmVzVExSTUIgPSBbXG4gICAgICAgIFVJTWV0YS5ab25lVG9wLCBVSU1ldGEuWm9uZUxlZnQsIFVJTWV0YS5ab25lTWlkZGxlLFxuICAgICAgICBVSU1ldGEuWm9uZVJpZ2h0LCBVSU1ldGEuWm9uZUJvdHRvbVxuICAgIF07XG4gICAgc3RhdGljIFpvbmVzTVRMUkIgPSBbXG4gICAgICAgIFVJTWV0YS5ab25lTWFpbiwgVUlNZXRhLlpvbmVUb3AsIFVJTWV0YS5ab25lTGVmdCwgVUlNZXRhLlpvbmVSaWdodCwgVUlNZXRhLlpvbmVCb3R0b21cbiAgICBdO1xuICAgIHN0YXRpYyBab25lc0RldGFpbCA9IFtVSU1ldGEuWm9uZURldGFpbF07XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFVJTWV0YSA9IG51bGw7XG5cbiAgICBzdGF0aWMgTW9kdWxlQWN0aW9uWm9uZXM6IHN0cmluZ1tdID0gWyd6TmF2JywgJ3pHbG9iYWwnXTtcbiAgICBzdGF0aWMgQWN0aW9uWm9uZXM6IHN0cmluZ1tdID0gWyd6R2xvYmFsJywgJ3pNYWluJywgJ3pHZW5lcmFsJ107XG5cblxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBVSU1ldGFcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdExhYmVsRm9ySWRlbnRpZmllcihmaWVsZE5hbWU6IHN0cmluZylcbiAgICB7XG4gICAgICAgIGxldCBsYXN0RG90ID0gZmllbGROYW1lLmxhc3RJbmRleE9mKCcuJyk7XG4gICAgICAgIGlmIChsYXN0RG90ICE9PSAtMSAmJiBsYXN0RG90ICE9PSBmaWVsZE5hbWUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgZmllbGROYW1lID0gZmllbGROYW1lLnN1YnN0cmluZyhsYXN0RG90ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlY2FtZWxpemUoZmllbGROYW1lKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYmVhdXRpZnlDbGFzc05hbWUoY2xhc3NOYW1lOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBkZWNhbWVsaXplKGNsYXNzTmFtZSwgJyAnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYmVhdXRpZnlGaWxlTmFtZShmaWVsZDogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gZGVjYW1lbGl6ZShmaWVsZCwgJyAnKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBpZiAoaXNQcmVzZW50KGxvYWRlcikpIHtcbiAgICAgICAgLy8gICAgIHRoaXMucmVnaXN0ZXJMb2FkZXIobG9hZGVyKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmJlZ2luUnVsZVNldCgnVUlNZXRhJyk7XG5cbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJLZXlJbml0T2JzZXJ2ZXIoVUlNZXRhLktleUNsYXNzLCBuZXcgVXNlck1ldGFEYXRhUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgICAgIC8vIFRoZXNlIGtleXMgZGVmaW5lIHNjb3BlcyBmb3IgdGhlaXIgcHJvcGVydGllc1xuICAgICAgICAgICAgLy8gZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKEtleUFyZWEpO1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoVUlNZXRhLktleUxheW91dCk7XG4gICAgICAgICAgICB0aGlzLmRlZmluZUtleUFzUHJvcGVydHlTY29wZShVSU1ldGEuS2V5TW9kdWxlKTtcblxuICAgICAgICAgICAgLy8gRGVmYXVsdCBydWxlIGZvciBjb252ZXJ0aW5nIGZpZWxkIG5hbWUgdG8gbGFiZWxcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleUNsYXNzKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleUZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleUxheW91dCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRGVmYXVsdExhYmVsR2VuZXJhdG9yRm9yS2V5KFVJTWV0YS5LZXlNb2R1bGUpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5QWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleUFjdGlvbkNhdGVnb3J5KTtcblxuICAgICAgICAgICAgLy8gcG9saWNpZXMgZm9yIGNoYWluaW5nIGNlcnRhaW4gd2VsbCBrbm93biBwcm9wZXJ0aWVzXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoVUlNZXRhLktleUFyZWEsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKFVJTWV0YS5LZXlMYXlvdXQsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKFVJTWV0YS5LZXlNb2R1bGUsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuXG4gICAgICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KFVJTWV0YS5LZXlFZGl0aW5nLCBVSU1ldGEuS2V5RWRpdGluZyk7XG4gICAgICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KFVJTWV0YS5LZXlMYXlvdXQsIFVJTWV0YS5LZXlMYXlvdXQpO1xuICAgICAgICAgICAgdGhpcy5taXJyb3JQcm9wZXJ0eVRvQ29udGV4dChVSU1ldGEuS2V5Q29tcG9uZW50TmFtZSwgVUlNZXRhLktleUNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoVUlNZXRhLktleUVkaXRpbmcsIG5ldyBQcm9wZXJ0eU1lcmdlcl9BbmQoKSk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMucmVnaXN0ZXJWYWx1ZVRyYW5zZm9ybWVyRm9yS2V5KCdyZXF1ZXN0Q29udGV4dCcsIFVJTWV0YS5UcmFuc2Zvcm1lcl9LZXlQcmVzZW50KTtcbiAgICAgICAgICAgIC8vIHRoaXMucmVnaXN0ZXJWYWx1ZVRyYW5zZm9ybWVyRm9yS2V5KCdkaXNwbGF5R3JvdXAnLCBVSU1ldGEuVHJhbnNmb3JtZXJfS2V5UHJlc2VudCk7XG5cbiAgICAgICAgICAgIC8vIGRlZmluZSBvcGVyYXRpb24gaGllcmFyY2h5XG4gICAgICAgICAgICB0aGlzLmtleURhdGEoVUlNZXRhLktleU9wZXJhdGlvbikuc2V0UGFyZW50KCd2aWV3JywgJ2luc3BlY3QnKTtcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ3ByaW50JywgJ3ZpZXcnKTtcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ2VkaXQnLCAnaW5zcGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5rZXlEYXRhKFVJTWV0YS5LZXlPcGVyYXRpb24pLnNldFBhcmVudCgnc2VhcmNoJywgJ2luc3BlY3QnKTtcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ2tleXdvcmRTZWFyY2gnLCAnc2VhcmNoJyk7XG4gICAgICAgICAgICB0aGlzLmtleURhdGEoVUlNZXRhLktleU9wZXJhdGlvbikuc2V0UGFyZW50KCd0ZXh0U2VhcmNoJywgJ2tleXdvcmRTZWFyY2gnKTtcblxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKFVJTWV0YS5Qcm9wRmllbGRzQnlab25lLFxuICAgICAgICAgICAgICAgIG5ldyBQcm9wRmllbGRzQnlab25lUmVzb2x2ZXIoKSxcbiAgICAgICAgICAgICAgICBVSU1ldGEuS2V5Q2xhc3MpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKFVJTWV0YS5Qcm9wRmllbGRQcm9wZXJ0eUxpc3QsXG4gICAgICAgICAgICAgICAgbmV3IFByb3BGaWVsZFByb3BlcnR5TGlzdFJlc29sdmVyKCksXG4gICAgICAgICAgICAgICAgVUlNZXRhLktleUNsYXNzKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZShVSU1ldGEuUHJvcExheW91dHNCeVpvbmUsXG4gICAgICAgICAgICAgICAgbmV3IFByb3BMYXlvdXRzQnlab25lUmVzb2x2ZXIoKSxcbiAgICAgICAgICAgICAgICBVSU1ldGEuS2V5TGF5b3V0KTtcblxuXG4gICAgICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoVUlNZXRhLlByb3BMYXlvdXRzQnlab25lICwgbmV3XG4gICAgICAgICAgICAvLyBQcm9wTGF5b3V0c0J5Wm9uZVJlc29sdmVyKCkgLCBVSU1ldGEuS2V5TGF5b3V0KTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoJ2JpbmRpbmdzRGljdGlvbmFyeScgLCBkeW4gLCBLZXlGaWVsZCk7XG4gICAgICAgICAgICAvLyByZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKCdiaW5kaW5nc0RpY3Rpb25hcnknICwgZHluICwgS2V5TGF5b3V0KTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoJ2JpbmRpbmdzRGljdGlvbmFyeScgLCBkeW4gLCBLZXlDbGFzcyk7XG4gICAgICAgICAgICAvLyByZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKCdiaW5kaW5nc0RpY3Rpb25hcnknICwgZHluICwgS2V5TW9kdWxlKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuZW5kUnVsZVNldCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIHpvbmVzKGNvbnRleHQ6IENvbnRleHQpOiBBcnJheTxzdHJpbmc+XG4gICAge1xuICAgICAgICBsZXQgem9uZXM6IEFycmF5PHN0cmluZz4gPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KCd6b25lcycpO1xuICAgICAgICByZXR1cm4gKGlzQmxhbmsoem9uZXMpKSA/IE1ldGEudG9MaXN0KFVJTWV0YS5ab25lTWFpbikgOiB6b25lcztcbiAgICB9XG5cblxuICAgIHpvbmVQYXRoKGNvbnRleHQ6IENvbnRleHQpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCB6b25lUGF0aDogYW55O1xuICAgICAgICBpZiAoaXNQcmVzZW50KGNvbnRleHQudmFsdWVzLmdldChVSU1ldGEuS2V5TGF5b3V0KSkpIHtcbiAgICAgICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgY29udGV4dC5zZXRTY29wZUtleShVSU1ldGEuS2V5TGF5b3V0KTtcbiAgICAgICAgICAgIHpvbmVQYXRoID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5Wm9uZVBhdGgpO1xuICAgICAgICAgICAgY29udGV4dC5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gem9uZVBhdGg7XG4gICAgfVxuXG5cbiAgICBuZXdDb250ZXh0KGlzTmVzdGVkOiBib29sZWFuID0gZmFsc2UpOiBDb250ZXh0XG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IFVJQ29udGV4dCh0aGlzLCBpc05lc3RlZCk7XG4gICAgfVxuXG4gICAgLy8gTG9hZCBzeXN0ZW0gcnVsZXNcbiAgICBsb2FkRGVmYXVsdFJ1bGVGaWxlcyhyZWZlcmVuY2VzPzogYW55KTogYm9vbGVhblxuICAgIHtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KFN5c3RlbVJ1bGVzLm9zcykpIHtcbiAgICAgICAgICAgIHRoaXMuYmVnaW5SdWxlU2V0V2l0aFJhbmsoTWV0YS5TeXN0ZW1SdWxlUHJpb3JpdHksICdzeXN0ZW0nKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFJ1bGVzKFN5c3RlbVJ1bGVzLm9zcywgJ3N5c3RlbScsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KFN5c3RlbVBlcnNpc3RlbmNlUnVsZXMub3NzKSkge1xuICAgICAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayhNZXRhLlN5c3RlbVJ1bGVQcmlvcml0eSArIDIwMDAsICdzeXN0ZW0tcGVyc2lzdGVuY2UnKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFJ1bGVzKFN5c3RlbVBlcnNpc3RlbmNlUnVsZXMub3NzLCAnc3lzdGVtLXBlcnNpc3RlbmNlJywgZmFsc2UpO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFJ1bGVTZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHJlZmVyZW5jZXMpKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50cyhyZWZlcmVuY2VzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBsb2FkcyBhcHBsaWNhdGlvbiBsZXZlbCBydWxlcy4gQXBwbGljYXRpb24gbGV2ZWwgcnVsZXMgYXJlIGdsb2JhbCBydWxlc1xuICAgICAqL1xuICAgIGxvYWRBcHBsaWNhdGlvblJ1bGVzKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhUnVsZXM6IEFycmF5PEpzb25SdWxlPjtcbiAgICAgICAgbGV0IHVzZXJSZWZlcmVuY2VzOiBhbnlbXTtcbiAgICAgICAgbGV0IGFwcFJ1bGVGaWxlczogc3RyaW5nW10gPSBbJ0FwcGxpY2F0aW9uJ107XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmFwcENvbmZpZykpIHtcbiAgICAgICAgICAgIGFwcFJ1bGVGaWxlcyA9IHRoaXMuYXBwQ29uZmlnLmdldChVSU1ldGEuQXBwQ29uZmlnUnVsZUZpbGVzUGFyYW0pIHx8IFsnQXBwbGljYXRpb24nXTtcbiAgICAgICAgICAgIHVzZXJSZWZlcmVuY2VzID0gdGhpcy5hcHBDb25maWcuZ2V0KFVJTWV0YS5BcHBDb25maWdVc2VyUnVsZXNQYXJhbSk7XG5cbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBoYXZlIGFsd2F5cyBBcHBsaWNhdGlvbiBhbmQgbWFrZSBpdCBtb3JlIGFkZGl0aXZlLlxuICAgICAgICAgICAgaWYgKCFMaXN0V3JhcHBlci5jb250YWluczxzdHJpbmc+KGFwcFJ1bGVGaWxlcywgJ0FwcGxpY2F0aW9uJykpIHtcbiAgICAgICAgICAgICAgICBhcHBSdWxlRmlsZXMudW5zaGlmdCgnQXBwbGljYXRpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHJ1bGVGaWxlIG9mIGFwcFJ1bGVGaWxlcykge1xuICAgICAgICAgICAgbGV0IHJ1bGUgPSBydWxlRmlsZSArICdSdWxlJztcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rlc3RSdWxlcy5oYXMocnVsZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBzaW5jZSB3ZSBhcmUgaW4gZGV2ZWxvcG1lbnQgbW9kZSBhbmQgdGVzdCBtb2RlIGlzIG9uIHdlIGNhbiBjaGVjayBleHRyYVxuICAgICAgICAgICAgICAgIC8vIHJlcG9zaXRvcnkgdXNlZCBieSB0ZXN0cywgd2UgbmVlZCB0byBjaGVjayBpZiB3ZSBhcmUgbm90IHJ1bm5pbmcgdW5pdHRlc3RcbiAgICAgICAgICAgICAgICAvLyBhbmQgYSBjbGFzcyBpcyBub3QgZGVmaW5lZCBidXQgdW5pdHRlc3RcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXN0UnVsZXMuaGFzKHJ1bGUpICYmXG4gICAgICAgICAgICAgICAgICAgIGlzUHJlc2VudCh0aGlzLl90ZXN0UnVsZXMuZ2V0KHJ1bGUpLm9zcykpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhUnVsZXMgPSB0aGlzLl90ZXN0UnVsZXMuZ2V0KHJ1bGUpLm9zcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KGFSdWxlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5SdWxlU2V0V2l0aFJhbmsoTWV0YS5Mb3dSdWxlUHJpb3JpdHksIHJ1bGVGaWxlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUnVsZXMoYVJ1bGVzLCBydWxlRmlsZS50b0xvd2VyQ2FzZSgpLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUnVsZVNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHVzZXJSZWZlcmVuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyUnVsZSA9IHVzZXJSZWZlcmVuY2VzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodXNlclJ1bGUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodXNlclJ1bGVbcnVsZV0pICYmIGlzUHJlc2VudCh1c2VyUnVsZVtydWxlXS5vc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYVJ1bGVzID0gdXNlclJ1bGVbcnVsZV0ub3NzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoYVJ1bGVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayhNZXRhLkxvd1J1bGVQcmlvcml0eSwgcnVsZUZpbGUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRSdWxlcyhhUnVsZXMsIHJ1bGVGaWxlLnRvTG93ZXJDYXNlKCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRVc2VyUnVsZShzb3VyY2U6IGFueSwgdXNlckNsYXNzOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoc291cmNlKSkge1xuICAgICAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayh0aGlzLl9ydWxlQ291bnQsICd1c2VyOicgKyB1c2VyQ2xhc3MpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUnVsZXMoc291cmNlLCAndXNlcicsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG4gICAgZGVmYXVsdExhYmVsR2VuZXJhdG9yRm9yS2V5KGtleTogc3RyaW5nKTogRHluYW1pY1Byb3BlcnR5VmFsdWVcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgX0RlZmF1bHRMYWJlbEdlbmVyYXRvcihrZXkpO1xuICAgIH1cblxuXG4gICAgcmVnaXN0ZXJEZXJpdmVkVmFsdWUocHJvcEtleTogc3RyaW5nLCBkeW5hbWljVmFsdWU6IER5bmFtaWNQcm9wZXJ0eVZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRLZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0VmFsdWU6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBtID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgbS5zZXQocHJvcEtleSwgZHluYW1pY1ZhbHVlKTtcbiAgICAgICAgdGhpcy5hZGRSdWxlKG5ldyBSdWxlKE1ldGEudG9MaXN0KFxuICAgICAgICAgICAgbmV3IFNlbGVjdG9yKGNvbnRleHRLZXksIGNvbnRleHRWYWx1ZSkpLCBtLCBNZXRhLlN5c3RlbVJ1bGVQcmlvcml0eSkpO1xuICAgIH1cblxuXG4gICAgcmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZShwcm9wS2V5OiBzdHJpbmcsIGR5bmFtaWNWYWx1ZTogU3RhdGljYWxseVJlc29sdmFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0S2V5OiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGVyaXZlZFZhbHVlKHByb3BLZXksIG5ldyBTdGF0aWNEeW5hbWljV3JhcHBlcihkeW5hbWljVmFsdWUpLCBjb250ZXh0S2V5LFxuICAgICAgICAgICAgTWV0YS5LZXlBbnkpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyRGVmYXVsdExhYmVsR2VuZXJhdG9yRm9yS2V5KGtleTogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckRlcml2ZWRWYWx1ZShVSU1ldGEuS2V5TGFiZWwsIG5ldyBMb2NhbGl6ZWRMYWJlbFN0cmluZyh0aGlzKSwga2V5LFxuICAgICAgICAgICAgVUlNZXRhLktleUFueSk7XG4gICAgfVxuXG4gICAgZmllbGRMaXN0KGNvbnRleHQ6IENvbnRleHQpOiBBcnJheTxJdGVtUHJvcGVydGllcz5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1MaXN0KGNvbnRleHQsIFVJTWV0YS5LZXlGaWVsZCwgVUlNZXRhLlpvbmVzVExSTUIpO1xuICAgIH1cblxuICAgIGZpZWxkc0J5Wm9uZXMoY29udGV4dDogQ29udGV4dCk6IE1hcDxzdHJpbmcsIGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zQnlab25lcyhjb250ZXh0LCBVSU1ldGEuS2V5RmllbGQsIFVJTWV0YS5ab25lc1RMUk1CKTtcbiAgICB9XG5cbiAgICBpdGVtTmFtZXNCeVpvbmVzKGNvbnRleHQ6IENvbnRleHQsIGtleTogc3RyaW5nLCB6b25lczogc3RyaW5nW10pOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICBsZXQgaXRlbXNCeVpvbmVzOiBNYXA8c3RyaW5nLCBhbnk+ID0gdGhpcy5pdGVtc0J5Wm9uZXMoY29udGV4dCwga2V5LCB6b25lcyk7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcEl0ZW1Qcm9wc1RvTmFtZXMoaXRlbXNCeVpvbmVzKTtcbiAgICB9XG5cbiAgICBtYXBJdGVtUHJvcHNUb05hbWVzKGl0ZW1zQnlab25lczogTWFwPHN0cmluZywgYW55Pik6IE1hcDxzdHJpbmcsIGFueT5cbiAgICB7XG4gICAgICAgIGxldCBuYW1lc0J5Wm9uZXM6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUoaXRlbXNCeVpvbmVzKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSAmJiBpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCBuYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgSXRlbVByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDxJdGVtUHJvcGVydGllcz5pdGVtKS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuYW1lc0J5Wm9uZXMuc2V0KGtleSwgbmFtZXMpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWVzQnlab25lcy5zZXQoa2V5LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcEl0ZW1Qcm9wc1RvTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5hbWVzQnlab25lcztcbiAgICB9XG5cbiAgICBwcmVkZWNlc3Nvck1hcChjb250ZXh0OiBDb250ZXh0LCBrZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJlZGVjZXNzb3I6IHN0cmluZyk6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj5cbiAgICB7XG4gICAgICAgIGxldCBmaWVsZEluZm9zOiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSB0aGlzLml0ZW1Qcm9wZXJ0aWVzKGNvbnRleHQsIGtleSwgZmFsc2UpO1xuICAgICAgICBsZXQgcHJlZGVjZXNzb3JzOiBNYXA8c3RyaW5nLCBBcnJheTxJdGVtUHJvcGVydGllcz4+ID0gTWFwV3JhcHBlci5ncm91cEJ5PEl0ZW1Qcm9wZXJ0aWVzPihcbiAgICAgICAgICAgIGZpZWxkSW5mb3MsIChpdGVtOiBJdGVtUHJvcGVydGllcykgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJlZCA9IGl0ZW0ucHJvcGVydGllcy5nZXQoVUlNZXRhLktleUFmdGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KHByZWQpID8gcHJlZCA6IGRlZmF1bHRQcmVkZWNlc3NvcjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmVkZWNlc3NvcnM7XG4gICAgfVxuXG4gICAgaXRlbUxpc3QoY29udGV4dDogQ29udGV4dCwga2V5OiBzdHJpbmcsIHpvbmVzOiBzdHJpbmdbXSk6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPlxuICAgIHtcbiAgICAgICAgbGV0IHByZWRlY2Vzc29yczogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+PiA9IHRoaXMucHJlZGVjZXNzb3JNYXAoY29udGV4dCwga2V5LFxuICAgICAgICAgICAgem9uZXNbMF0pO1xuICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCB6b25lIG9mIHpvbmVzKSB7XG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVQcmVjZXNzb3JzKHByZWRlY2Vzc29ycywgem9uZSwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlzWm9uZVJlZmVyZW5jZShrZXk6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIC8vIGtleXMgb2YgdGhlIGZvcm0gJ3o8TmFtZT4nIGFuZCAnZm9vLmJhci56PE5hbWU+JyBhcmUgY29uc2lkZXJlZCB6b25lIGtleXNcbiAgICAgICAgbGV0IGxhc3REb3QgPSBrZXkubGFzdEluZGV4T2YoJy4nKTtcbiAgICAgICAgbGV0IHN1ZmZpeCA9IChsYXN0RG90ID09PSAtMSkgPyBrZXkgOiBrZXkuc3Vic3RyaW5nKGxhc3REb3QgKyAxKTtcbiAgICAgICAgcmV0dXJuIChzdWZmaXgubGVuZ3RoID4gMSkgJiYgKHN1ZmZpeFswXSA9PT0gJ3onKSAmJiAoXG4gICAgICAgICAgICBzdWZmaXhbMV0udG9VcHBlckNhc2UoKSA9PT0gc3VmZml4WzFdIC8vIGlzIHVwcGVyY2FzZSA/c1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGl0ZW1zQnlab25lcyhjb250ZXh0OiBDb250ZXh0LCBwcm9wZXJ0eTogc3RyaW5nLCB6b25lczogc3RyaW5nW10pOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICBsZXQgcHJlZGVjZXNzb3JzID0gdGhpcy5wcmVkZWNlc3Nvck1hcChjb250ZXh0LCBwcm9wZXJ0eSwgem9uZXNbMF0pO1xuICAgICAgICBsZXQgYnlab25lID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuXG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUocHJlZGVjZXNzb3JzKS5mb3JFYWNoKCh2YWx1ZSwgem9uZSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNab25lUmVmZXJlbmNlKHpvbmUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3Q6IGFueVtdID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlUHJlY2Vzc29ycyhwcmVkZWNlc3NvcnMsXG4gICAgICAgICAgICAgICAgICAgIHpvbmUsIGxpc3QpO1xuXG4gICAgICAgICAgICAgICAgRmllbGRQYXRoLnNldEZpZWxkVmFsdWUoYnlab25lLCB6b25lLCBsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJ5Wm9uZTtcbiAgICB9XG5cbiAgICAvLyByZWN1cnNpdmUgZGVjZW50IG9mIHByZWRlY2Vzc29yIHRyZWUuLi5cbiAgICBhY2N1bXVsYXRlUHJlY2Vzc29ycyhwcmVkZWNlc3NvcnM6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4sIGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGl0ZW1zOiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSBwcmVkZWNlc3NvcnMuZ2V0KGtleSk7XG4gICAgICAgIGlmIChpc0JsYW5rKGl0ZW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgTGlzdFdyYXBwZXIuc29ydDxJdGVtUHJvcGVydGllcz4oaXRlbXMsIChvMSwgbzIpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCByMSA9IG8xLnByb3BlcnRpZXMuZ2V0KFVJTWV0YS5LZXlSYW5rKTtcbiAgICAgICAgICAgIGxldCByMiA9IG8yLnByb3BlcnRpZXMuZ2V0KFVJTWV0YS5LZXlSYW5rKTtcblxuICAgICAgICAgICAgaWYgKHIxID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcjEgPSAxMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocjIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByMiA9IDEwMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChyMSA9PT0gcjIpID8gMCA6IChyMSA9PT0gbnVsbCkgPyAxIDogKHIyID09PSBudWxsKSA/IC0xIDogKHIxIC0gcjIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVQcmVjZXNzb3JzKHByZWRlY2Vzc29ycywgaXRlbS5uYW1lLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IFBhcnNlciB0byBoYW5kbGUgZGVjbHMgbGlrZSAnekxlZnQgPT4gbGFzdE5hbWUjcmVxdWlyZWQnXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGRQcmVkZWNlc3NvclJ1bGUoaXRlbU5hbWU6IHN0cmluZywgY29udGV4dFByZWRzOiBBcnJheTxTZWxlY3Rvcj4sIHByZWRlY2Vzc29yOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgIHRyYWl0czogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiBudW1iZXIpOiBSdWxlXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhwcmVkZWNlc3NvcikgJiYgaXNCbGFuayh0cmFpdHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXk6IHN0cmluZyA9IHRoaXMuc2NvcGVLZXlGb3JTZWxlY3Rvcihjb250ZXh0UHJlZHMpO1xuICAgICAgICBpZiAoaXNCbGFuayhrZXkpIHx8IGtleSA9PT0gVUlNZXRhLktleUNsYXNzKSB7XG4gICAgICAgICAgICBrZXkgPSBVSU1ldGEuS2V5RmllbGQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbGVjdG9yOiBBcnJheTxTZWxlY3Rvcj4gPSBuZXcgQXJyYXk8U2VsZWN0b3I+KCk7XG4gICAgICAgIExpc3RXcmFwcGVyLmFkZEFsbDxTZWxlY3Rvcj4oc2VsZWN0b3IsIGNvbnRleHRQcmVkcyk7XG5cbiAgICAgICAgc2VsZWN0b3IucHVzaChuZXcgU2VsZWN0b3Ioa2V5LCBpdGVtTmFtZSkpO1xuICAgICAgICBsZXQgcHJvcHM6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQocHJlZGVjZXNzb3IpKSB7XG4gICAgICAgICAgICBwcm9wcy5zZXQoVUlNZXRhLktleUFmdGVyLCBwcmVkZWNlc3Nvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRyYWl0cykpIHtcbiAgICAgICAgICAgIHByb3BzLnNldChVSU1ldGEuS2V5VHJhaXQsIHRyYWl0cyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJ1bGUgPSBuZXcgUnVsZShzZWxlY3RvciwgcHJvcHMsIDAsIGxpbmVOdW1iZXIpO1xuICAgICAgICB0aGlzLmFkZFJ1bGUocnVsZSk7XG4gICAgICAgIHJldHVybiBydWxlO1xuICAgIH1cblxuICAgIGZsYXR0ZW5WaXNpYmxlKGZpZWxkc0J5Wm9uZXM6IE1hcDxzdHJpbmcsIEFycmF5PHN0cmluZz4+LCB6b25lTGlzdDogc3RyaW5nW10sIGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IENvbnRleHQpOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGZpZWxkc0J5Wm9uZXMpKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHpvbmUgb2YgIHpvbmVMaXN0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkczogc3RyaW5nW10gPSBmaWVsZHNCeVpvbmVzLmdldCh6b25lKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKGZpZWxkcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNldChrZXksIGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYm9vbGVhblByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlWaXNpYmxlLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGRpc3BsYXlLZXlGb3JDbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgLy8gcGVyZm9ybWFuY2U6IHNob3VsZCB1c2UgcmVnaXN0ZXJEZXJpdmVkVmFsdWUoJy4uLicsIG5ldyBDb250ZXh0LlN0YXRpY0R5bmFtaWNXcmFwcGVyXG4gICAgICAgIC8vIHRvIGdldCBjYWNoZWQgcmVzb2x1dGlvbiBoZXJlLi4uXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5uZXdDb250ZXh0KCk7XG4gICAgICAgIGNvbnRleHQuc2V0KFVJTWV0YS5LZXlMYXlvdXQsICdMYWJlbEZpZWxkJyk7XG4gICAgICAgIGNvbnRleHQuc2V0KFVJTWV0YS5LZXlDbGFzcywgY2xhc3NOYW1lKTtcbiAgICAgICAgbGV0IGZpZWxkczogQXJyYXk8SXRlbVByb3BlcnRpZXM+ID0gdGhpcy5pdGVtUHJvcGVydGllcyhjb250ZXh0LCBVSU1ldGEuS2V5RmllbGQsIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5pc0VtcHR5KGZpZWxkcykgPyAnJHRvU3RyaW5nJyA6IGZpZWxkc1swXS5uYW1lO1xuICAgIH1cblxuXG4gICAgZGlzcGxheUxhYmVsKGNsYXNzTmFtZTogc3RyaW5nLCBwcm9wZXJ0aWVzVmFsdWU6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHByb3BlcnRpZXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0aWVzVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUtleUZvckNsYXNzKGNsYXNzTmFtZSk7XG4gICAgfVxuXG5cbiAgICBjcmVhdGVMb2NhbGl6ZWRTdHJpbmcoa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogc3RyaW5nKTogTG9jYWxpemVkU3RyaW5nXG4gICAge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuX2N1cnJlbnRSdWxlU2V0KSxcbiAgICAgICAgICAgICdBdHRlbXB0IHRvIGNyZWF0ZSBsb2NhbGl6ZWQgc3RyaW5nIHdpdGhvdXQgY3VycmVudFJ1bGVTZXQgaW4gcGxhY2UnKTtcblxuICAgICAgICByZXR1cm4gbmV3IExvY2FsaXplZFN0cmluZyh0aGlzLCB0aGlzLl9jdXJyZW50UnVsZVNldC5maWxlUGF0aCwga2V5LCBkZWZhdWx0VmFsdWUpO1xuICAgIH1cblxuXG4gICAgZ2V0IHJvdXRpbmdTZXJ2aWNlKCk6IFJvdXRpbmdTZXJ2aWNlXG4gICAge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudCh0aGlzLl9pbmplY3RvcikpID8gdGhpcy5faW5qZWN0b3IuZ2V0PFJvdXRpbmdTZXJ2aWNlPihSb3V0aW5nU2VydmljZSlcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgZW52KCk6IEVudmlyb25tZW50XG4gICAge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudCh0aGlzLl9pbmplY3RvcikpID8gdGhpcy5faW5qZWN0b3IuZ2V0KEVudmlyb25tZW50KSA6IG5ldyBFbnZpcm9ubWVudCgpO1xuICAgIH1cblxuXG4gICAgZ2V0IGFwcENvbmZpZygpOiBBcHBDb25maWdcbiAgICB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHRoaXMuX2luamVjdG9yKSkgPyB0aGlzLl9pbmplY3Rvci5nZXQoQXBwQ29uZmlnKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGZyYW1ld29yayBsZXZlbCBjb21wb25lbnRzIGFuZCBsaXN0ZW4gZm9yIHVzZXIgbGV2ZWwgcnVsZXMgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICAgKiBBZnRlciB3ZSByZWdpc3RlciB1c2VyIGxldmVsIHJ1bGVzIGl0IHdpbGwgbG9hZCBhcHBsaWNhdGlvbi5vc3MuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVnaXN0ZXJDb21wb25lbnRzKHN5c1JlZmVyZW5jZXM6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5pbmplY3RvciksICdDYW5ub3QgcmVnaXN0ZXIgY29tcG9uZW50cyB3aXRob3V0IEluamVjdG9yIGluIG9yZGVyJyArXG4gICAgICAgICAgICAnIHRvIGdldCBhY2Nlc3MgdG8gQ29tcG9uZW50UmVnaXN0cnkgU2VydmljZScpO1xuXG4gICAgICAgIGFzc2VydCh0aGlzLmVudi5pblRlc3QgfHwgaXNQcmVzZW50KHRoaXMuYXBwQ29uZmlnLmdldChVSU1ldGEuQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0pKSxcbiAgICAgICAgICAgICdVbmFibGUgdG8gaW5pdGlhbGl6ZSBNZXRhVUkgYXMgdXNlciBydWxlcyBhcmUgbWlzc2luZy4gcGxlYXNlIHVzZTonICtcbiAgICAgICAgICAgICcgbWV0YXVpLnJ1bGVzLnVzZXItcnVsZXMgY29uZmlndXJhdGlvbiBwYXJhbScpO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVnaXN0cnkgPSB0aGlzLmluamVjdG9yLmdldChDb21wb25lbnRSZWdpc3RyeSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5jb21wb25lbnRSZWdpc3RyeSkpIHtcblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWdpc3RyeS5yZWdpc3RlclR5cGVzKHN5c1JlZmVyZW5jZXMpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZW52LmluVGVzdCkge1xuICAgICAgICAgICAgICAgIGxldCB1c2VyUmVmZXJlbmNlczogYW55W10gPSB0aGlzLmFwcENvbmZpZy5nZXQoVUlNZXRhLkFwcENvbmZpZ1VzZXJSdWxlc1BhcmFtKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB1UnVsZSBvZiB1c2VyUmVmZXJlbmNlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5LnJlZ2lzdGVyVHlwZXModVJ1bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRBcHBsaWNhdGlvblJ1bGVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5lbnYuaW5UZXN0KSB7XG4gICAgICAgICAgICB3YXJuKCdVSU1ldGEucmVnaXN0ZXJDb21wb25lbnRzKCkgTm8gY29tcG9uZW50cyB3ZXJlIHJlZ2lzdGVyZWQgIScpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSnVzdCBuZWVkIHRvIGNhbGwgaXQgZGlmZmVyZW50IHRoYW4gdGhlIG90aGVyIGZpcmVBY3Rpb24gYXMgSSBjYW4gbm90IGRvIGFueSBtZXRob2RcbiAgICAgKiBvdmVybG9hZGluZyBoZXJlLlxuICAgICAqXG4gICAgICovXG4gICAgZmlyZUFjdGlvbkZyb21Qcm9wcyhhY3Rpb246IEl0ZW1Qcm9wZXJ0aWVzLCBjb250ZXh0OiBDb250ZXh0KTogdm9pZFxuICAgIHtcbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIGxldCBhY3Rpb25DYXRlZ29yeSA9IGFjdGlvbi5wcm9wZXJ0aWVzLmdldChPYmplY3RNZXRhLktleUFjdGlvbkNhdGVnb3J5KTtcbiAgICAgICAgaWYgKGlzQmxhbmsoYWN0aW9uQ2F0ZWdvcnkpKSB7XG4gICAgICAgICAgICBhY3Rpb25DYXRlZ29yeSA9IE9iamVjdE1ldGEuRGVmYXVsdEFjdGlvbkNhdGVnb3J5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc2V0KE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnksIGFjdGlvbkNhdGVnb3J5KTtcbiAgICAgICAgY29udGV4dC5zZXQoT2JqZWN0TWV0YS5LZXlBY3Rpb24sIGFjdGlvbi5uYW1lKTtcblxuICAgICAgICB0aGlzLl9maXJlQWN0aW9uKGNvbnRleHQsIGZhbHNlKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgIH1cblxuICAgIGZpcmVBY3Rpb24oY29udGV4dDogVUlDb250ZXh0LCB3aXRoQmFja0FjdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIHRoaXMuX2ZpcmVBY3Rpb24oY29udGV4dCwgd2l0aEJhY2tBY3Rpb24pO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmlyZUFjdGlvbihjb250ZXh0OiBDb250ZXh0LCB3aXRoQmFja0FjdGlvbjogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhY3Rpb25SZXN1bHRzID0gY29udGV4dC5wcm9wZXJ0eUZvcktleSgnYWN0aW9uUmVzdWx0cycpO1xuICAgICAgICBpZiAoaXNCbGFuayhhY3Rpb25SZXN1bHRzKSB8fCAhdGhpcy5pc1JvdXRlKGFjdGlvblJlc3VsdHMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYXZpYXRlVG9QYWdlKGNvbnRleHQsIGFjdGlvblJlc3VsdHMsIHdpdGhCYWNrQWN0aW9uKTtcbiAgICB9XG5cbiAgICBuYXZpYXRlVG9QYWdlKGNvbnRleHQ6IENvbnRleHQsIHJvdXRlOiBhbnksIHdpdGhCYWNrQWN0aW9uOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMucHJlcGFyZVJvdXRlKGNvbnRleHQsIHdpdGhCYWNrQWN0aW9uKTtcblxuICAgICAgICBsZXQgdWlDb250ZXg6IFVJQ29udGV4dCA9IDxVSUNvbnRleHQ+IGNvbnRleHQ7XG4gICAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UubmF2aWdhdGVXaXRoUm91dGUocm91dGUsIHBhcmFtcywgdWlDb250ZXgub2JqZWN0KTtcbiAgICB9XG5cblxuICAgIHByZXBhcmVSb3V0ZShjb250ZXh0OiBDb250ZXh0LCB3aXRoQmFja0FjdGlvbjogYm9vbGVhbik6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgICAgICBsZXQgcGFnZUJpbmRpbmdzID0gY29udGV4dC5wcm9wZXJ0eUZvcktleSgncGFnZUJpbmRpbmdzJyk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQocGFnZUJpbmRpbmdzKSkge1xuICAgICAgICAgICAgcGFnZUJpbmRpbmdzLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChrICE9PSBPYmplY3RNZXRhLktleU9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAoPGFueT5wYXJhbXMpW2tdID0gY29udGV4dC5yZXNvbHZlVmFsdWUodik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHdpdGhCYWNrQWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICg8YW55PnBhcmFtcylbJ2InXSA9IHdpdGhCYWNrQWN0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuXG4gICAgcHJlcGFyZVJvdXRlRm9yQ29tcG9uZW50KGNvbXBvbmVudDogYW55LCBjb250ZXh0OiBDb250ZXh0LCB3aXRoQmFja0FjdGlvbjogYm9vbGVhbik6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgICAgICBsZXQgcGFnZUJpbmRpbmdzID0gY29udGV4dC5wcm9wZXJ0eUZvcktleSgncGFnZUJpbmRpbmdzJyk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQocGFnZUJpbmRpbmdzKSkge1xuICAgICAgICAgICAgcGFnZUJpbmRpbmdzLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudFtrXSA9IHY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG5cbiAgICBnb3RvTW9kdWxlKG1vZHVsZTogSXRlbVByb3BlcnRpZXMsIGFjdGl2YXRlZFBhdGg/OiBzdHJpbmcpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIHRoaXMuZW52LmRlbGV0ZVZhbHVlKEFDVElWRV9DTlRYKTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm5ld0NvbnRleHQoKTtcblxuXG4gICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5TW9kdWxlLCBtb2R1bGUubmFtZSk7XG4gICAgICAgIGxldCBwYWdlTmFtZSA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUhvbWVQYWdlKTtcblxuXG4gICAgICAgIGxldCByb3V0ZSA9IHRoaXMucm91dGluZ1NlcnZpY2Uucm91dGVGb3JQYWdlKHBhZ2VOYW1lLCBtb2R1bGUubmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgYWN0aXZhdGVkUGF0aCk7XG4gICAgICAgIGlmIChhY3RpdmF0ZWRQYXRoID09PSAnLycpIHtcbiAgICAgICAgICAgIGFjdGl2YXRlZFBhdGggPSAnJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGF0aCA9IGAke2FjdGl2YXRlZFBhdGh9LyR7cm91dGUucGF0aH1gO1xuXG4gICAgICAgIGxldCBwYXJhbXMgPSB0aGlzLnByZXBhcmVSb3V0ZShjb250ZXh0LCBudWxsKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLm5hdmlnYXRlKFtwYXRoLCBwYXJhbXNdLCB7c2tpcExvY2F0aW9uQ2hhbmdlOiB0cnVlfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1JvdXRlKGFjdGlvblJlc3VsdDogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzU3RyaW5nTWFwKGFjdGlvblJlc3VsdCkgJiYgaXNQcmVzZW50KGFjdGlvblJlc3VsdFsncGF0aCddKTtcblxuICAgIH1cblxuICAgIGNvbXBQYWdlV2l0aE5hbWUobmFtZTogc3RyaW5nKTogVHlwZTxhbnk+XG4gICAge1xuICAgICAgICBsZXQgY3VyclR5cGUgPSB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5Lm5hbWVUb1R5cGUuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoaXNCbGFuayhjdXJyVHlwZSkpIHtcbiAgICAgICAgICAgIGFzc2VydChmYWxzZSwgbmFtZSArICcgY29tcG9uZW50IGRvZXMgbm90IGV4aXN0cy4gQ3JlYXRlIER1bW15IENvbXBvbmVudCBpbnN0ZWFkIG9mJyArXG4gICAgICAgICAgICAgICAgJyB0aHJvd2luZyB0aGlzIGVycm9yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJUeXBlO1xuICAgIH1cblxuXG4gICAgLy8gY2FsbGVyIG11c3QgcHVzaC9wb3AhXG4gICAgYWN0aW9uc0J5Q2F0ZWdvcnkoY29udGV4dDogQ29udGV4dCwgcmVzdWx0OiBNYXA8c3RyaW5nLCBBcnJheTxJdGVtUHJvcGVydGllcz4+LFxuICAgICAgICAgICAgICAgICAgICAgIHpvbmVzOiBzdHJpbmdbXSk6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPlxuICAgIHtcbiAgICAgICAgbGV0IGNhdE5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgYWN0aW9uQ2F0ZWdvcmllcyA9IHRoaXMuaXRlbUxpc3QoY29udGV4dCwgT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSwgem9uZXMpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoYWN0aW9uQ2F0ZWdvcmllcykpIHtcbiAgICAgICAgICAgIGFjdGlvbkNhdGVnb3JpZXMuZm9yRWFjaCgoaXRlbTogSXRlbVByb3BlcnRpZXMpID0+IGNhdE5hbWVzLnB1c2goaXRlbS5uYW1lKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZEFjdGlvbnNGb3JDYXRlZ29yaWVzKGNvbnRleHQsIHJlc3VsdCwgY2F0TmFtZXMpO1xuICAgICAgICByZXR1cm4gYWN0aW9uQ2F0ZWdvcmllcztcbiAgICB9XG5cbiAgICBhZGRBY3Rpb25zRm9yQ2F0ZWdvcmllcyhjb250ZXh0OiBDb250ZXh0LCByZXN1bHQ6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0TmFtZXM6IHN0cmluZ1tdKTogdm9pZFxuICAgIHtcbiAgICAgICAgZm9yIChsZXQgY2F0IG9mIGNhdE5hbWVzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgIGlmIChjYXQgIT09IE9iamVjdE1ldGEuRGVmYXVsdEFjdGlvbkNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zZXQoT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSwgY2F0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0QWN0aW9uc0J5Q2F0ZWdvcnkoY29udGV4dCwgcmVzdWx0LCBjYXQpO1xuICAgICAgICAgICAgY29udGV4dC5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBjb2xsZWN0QWN0aW9uc0J5Q2F0ZWdvcnkoY29udGV4dDogQ29udGV4dCwgcmVzdWx0OiBNYXA8c3RyaW5nLCBBcnJheTxJdGVtUHJvcGVydGllcz4+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRDYXQ6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhY3Rpb25JbmZvczogSXRlbVByb3BlcnRpZXNbXSA9IHRoaXMuaXRlbVByb3BlcnRpZXMoY29udGV4dCwgT2JqZWN0TWV0YS5LZXlBY3Rpb24sXG4gICAgICAgICAgICB0cnVlKTtcbiAgICAgICAgZm9yIChsZXQgYWN0aW9uSW5mbyBvZiBhY3Rpb25JbmZvcykge1xuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChPYmplY3RNZXRhLktleUFjdGlvbiwgYWN0aW9uSW5mby5uYW1lKTtcblxuICAgICAgICAgICAgbGV0IHZpc2libGUgPSBjb250ZXh0LmJvb2xlYW5Qcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleVZpc2libGUsIHRydWUpO1xuICAgICAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcnkgPSBhY3Rpb25JbmZvLnByb3BlcnRpZXMuZ2V0KE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhdGVnb3J5ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkgPSBPYmplY3RNZXRhLkRlZmF1bHRBY3Rpb25DYXRlZ29yeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldENhdCAhPT0gY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGZvckNhdGVnb3J5OiBJdGVtUHJvcGVydGllc1tdID0gcmVzdWx0LmdldChjYXRlZ29yeSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoZm9yQ2F0ZWdvcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvckNhdGVnb3J5ID0gW107XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoY2F0ZWdvcnksIGZvckNhdGVnb3J5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yQ2F0ZWdvcnkucHVzaChhY3Rpb25JbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29tcHV0ZU1vZHVsZUluZm8oY29udGV4dDogQ29udGV4dCA9IHRoaXMubmV3Q29udGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmlzaWJpbGl0eTogYm9vbGVhbiA9IHRydWUpOiBNb2R1bGVJbmZvXG4gICAge1xuXG4gICAgICAgIGxldCBtb2R1bGVJbmZvOiBNb2R1bGVJbmZvID0gbmV3IE1vZHVsZUluZm8oKTtcbiAgICAgICAgbW9kdWxlSW5mby5tb2R1bGVzID0gW107XG5cbiAgICAgICAgbGV0IGFsbE1vZHVsZVByb3BzOiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSB0aGlzLml0ZW1MaXN0KGNvbnRleHQsIFVJTWV0YS5LZXlNb2R1bGUsXG4gICAgICAgICAgICBVSU1ldGEuQWN0aW9uWm9uZXMpO1xuICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZU5hbWVzID0gW107XG4gICAgICAgIG1vZHVsZUluZm8ubW9kdWxlQnlOYW1lcyA9IG5ldyBNYXA8c3RyaW5nLCBJdGVtUHJvcGVydGllcz4oKTtcblxuICAgICAgICBmb3IgKGxldCBtb2R1bGUgb2YgYWxsTW9kdWxlUHJvcHMpIHtcblxuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5TW9kdWxlLCBtb2R1bGUubmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChjaGVja1Zpc2liaWxpdHkgJiYgIWNvbnRleHQuYm9vbGVhblByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlWaXNpYmxlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vZHVsZUluZm8ubW9kdWxlTmFtZXMucHVzaChtb2R1bGUubmFtZSk7XG5cbiAgICAgICAgICAgIC8vIC8vIHRvZG86IGNyZWF0ZSB0eXBlc2NyaXB0IGFub3RhdGlvblxuICAgICAgICAgICAgLy8gY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICAvLyBjb250ZXh0LnNldChcImhvbWVGb3JDbGFzc2VzXCIsIHRydWUpO1xuICAgICAgICAgICAgLy8gbGV0IGhvbWVDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5pdGVtTmFtZXMoY29udGV4dCwgVUlNZXRhLktleUNsYXNzKTtcbiAgICAgICAgICAgIC8vIGNvbnRleHQucG9wKCk7XG5cblxuICAgICAgICAgICAgbGV0IG1vZFByb3BlcnRpZXMgPSBuZXcgSXRlbVByb3BlcnRpZXMobW9kdWxlLm5hbWUsIGNvbnRleHQuYWxsUHJvcGVydGllcygpLCBmYWxzZSk7XG4gICAgICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZXMucHVzaChtb2RQcm9wZXJ0aWVzKTtcblxuICAgICAgICAgICAgbW9kdWxlSW5mby5tb2R1bGVCeU5hbWVzLnNldChtb2R1bGUubmFtZSwgbW9kUHJvcGVydGllcyk7XG5cbiAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgY29udGV4dC5zZXQoVUlNZXRhLktleU1vZHVsZSwgbW9kdWxlSW5mby5tb2R1bGVOYW1lcyk7XG4gICAgICAgIG1vZHVsZUluZm8uYWN0aW9uc0J5Q2F0ZWdvcnkgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+PigpO1xuICAgICAgICBtb2R1bGVJbmZvLmFjdGlvbkNhdGVnb3JpZXMgPSB0aGlzLmFjdGlvbnNCeUNhdGVnb3J5KGNvbnRleHQsIG1vZHVsZUluZm8uYWN0aW9uc0J5Q2F0ZWdvcnksXG4gICAgICAgICAgICBVSU1ldGEuTW9kdWxlQWN0aW9uWm9uZXMpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgICAgIHJldHVybiBtb2R1bGVJbmZvO1xuICAgIH1cblxuXG4gICAgY3VycmVudE1vZHVsZUxhYmVsKG1vZHVsZU5hbWU6IHN0cmluZywgY29udGV4dDogQ29udGV4dCA9IHRoaXMubmV3Q29udGV4dCgpKTogc3RyaW5nXG4gICAge1xuICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgY29udGV4dC5zZXQoVUlNZXRhLktleU1vZHVsZSwgbW9kdWxlTmFtZSk7XG4gICAgICAgIGxldCBsYWJlbDogc3RyaW5nID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5TGFiZWwpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgICAgIHJldHVybiBsYWJlbDtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIE1vZHVsZUluZm9cbntcbiAgICBtb2R1bGVzOiBBcnJheTxJdGVtUHJvcGVydGllcz47XG4gICAgbW9kdWxlTmFtZXM6IEFycmF5PHN0cmluZz47XG4gICAgbW9kdWxlQnlOYW1lczogTWFwPHN0cmluZywgSXRlbVByb3BlcnRpZXM+O1xuICAgIGFjdGlvbkNhdGVnb3JpZXM6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPjtcbiAgICBhY3Rpb25zQnlDYXRlZ29yeTogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+Pjtcbn1cblxuXG5leHBvcnQgY2xhc3MgTG9jYWxpemVkU3RyaW5nIGV4dGVuZHMgRHluYW1pY1Byb3BlcnR5VmFsdWVcbntcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBtZXRhOiBVSU1ldGEsIHByb3RlY3RlZCBfbW9kdWxlOiBzdHJpbmcsIHByb3RlY3RlZCAgX2tleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBfZGVmYXVsdFZhbHVlOiBzdHJpbmcpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnlcbiAgICB7XG5cbiAgICAgICAgbGV0IGxvY2FsaXplZFN0cmluZzogYW55O1xuICAgICAgICAvLyBsZXQgY2xhenogPSBjb250ZXh0LnZhbHVlcy5nZXQoJ2NsYXNzJyk7XG4gICAgICAgIC8vIGlmIChpc1ByZXNlbnQodGhpcy5fa2V5KSAmJiBpc1ByZXNlbnQodGhpcy5tZXRhLmkxOG5TZXJ2aWNlKSkge1xuICAgICAgICAvLyAgICAgbGV0IGkxOG5LZXkgPSBjbGF6eiArICcuJyArIHRoaXMuX2tleTtcbiAgICAgICAgLy8gICAgIGxvY2FsaXplZFN0cmluZyA9IHRoaXMubWV0YS5pMThuU2VydmljZS5pbnN0YW50KGkxOG5LZXkpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gd2hlbiBpdCByZXR1cm4gdGhlIHNhbWUgc3RyaW5nIG1vc3QgbGlrZWx5IGl0IG1lYW5zIHRoZXJlIGlzIG5vXG4gICAgICAgIC8vICAgICAvLyB0cmFuc2xhdGlvbiBzbyBkZWZhdWx0IGl0IHRvIG51bGxcbiAgICAgICAgLy8gICAgIGxvY2FsaXplZFN0cmluZyA9IChsb2NhbGl6ZWRTdHJpbmcgPT09IGkxOG5LZXkpID8gbnVsbCA6IGxvY2FsaXplZFN0cmluZztcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGlmIChpc0JsYW5rKGxvY2FsaXplZFN0cmluZykgfHwgdGhpcy5fa2V5ID09PSBPYmplY3RNZXRhLktleUZpZWxkKSB7XG4gICAgICAgIC8vICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFZhbHVlO1xuICAgICAgICAvLyB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gJ0xvY2FsZWRTdHJpbmc6IHsnICsgdGhpcy5fa2V5ICsgJyAtICcgKyB0aGlzLl9kZWZhdWx0VmFsdWUgKyAnIH0nO1xuICAgIH1cbn1cblxuY2xhc3MgTG9jYWxpemVkTGFiZWxTdHJpbmcgZXh0ZW5kcyBMb2NhbGl6ZWRTdHJpbmcgaW1wbGVtZW50cyBQcm9wZXJ0eU1hcEF3YWtpbmdcbntcbiAgICBzdGF0aWMgRGVmYXVsdE1vZHVsZSA9ICdkZWZhdWx0JztcbiAgICBwcm9wZXJ0eUF3YWtpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIG1ldGE6IFVJTWV0YSlcbiAgICB7XG4gICAgICAgIHN1cGVyKG1ldGEsIExvY2FsaXplZExhYmVsU3RyaW5nLkRlZmF1bHRNb2R1bGUsIG51bGwsIG51bGwpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2tleSkpIHtcbiAgICAgICAgICAgIGxldCBzY29wZUtleTogc3RyaW5nID0gY29udGV4dC52YWx1ZXMuZ2V0KE1ldGEuU2NvcGVLZXkpO1xuICAgICAgICAgICAgbGV0IHNjb3BlVmFsOiBzdHJpbmcgPSBjb250ZXh0LnZhbHVlcy5nZXQoc2NvcGVLZXkpO1xuXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0VmFsdWUgPSBVSU1ldGEuZGVmYXVsdExhYmVsRm9ySWRlbnRpZmllcihzY29wZVZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2tleSA9IHNjb3BlS2V5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5ldmFsdWF0ZShjb250ZXh0KTtcbiAgICB9XG5cbiAgICBhd2FrZUZvclByb3BlcnR5TWFwKG1hcDogUHJvcGVydHlNYXApOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTG9jYWxpemVkTGFiZWxTdHJpbmcodGhpcy5tZXRhKTtcbiAgICB9XG5cbn1cblxuXG5jbGFzcyBQcm9wRmllbGRzQnlab25lUmVzb2x2ZXIgZXh0ZW5kcyBTdGF0aWNhbGx5UmVzb2x2YWJsZVxue1xuXG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55XG4gICAge1xuICAgICAgICBsZXQgbSA9ICg8VUlNZXRhPmNvbnRleHQubWV0YSkuaXRlbU5hbWVzQnlab25lcyhjb250ZXh0LCBVSU1ldGEuS2V5RmllbGQsXG4gICAgICAgICAgICAoPFVJTWV0YT5jb250ZXh0Lm1ldGEpLnpvbmVzKGNvbnRleHQpKTtcbiAgICAgICAgbGV0IHpvbmVQYXRoID0gKDxVSU1ldGE+Y29udGV4dC5tZXRhKS56b25lUGF0aChjb250ZXh0KTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh6b25lUGF0aCkpIHtcblxuXG4gICAgICAgICAgICBtID0gPE1hcDxzdHJpbmcsIGFueT4+IEZpZWxkUGF0aC5nZXRGaWVsZFZhbHVlKG0sIHpvbmVQYXRoKTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKG0pKSB7XG4gICAgICAgICAgICAgICAgbSA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxufVxuXG5jbGFzcyBQcm9wRmllbGRQcm9wZXJ0eUxpc3RSZXNvbHZlciBleHRlbmRzIFN0YXRpY2FsbHlSZXNvbHZhYmxlXG57XG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gKDxVSU1ldGE+Y29udGV4dC5tZXRhKS5maWVsZExpc3QoY29udGV4dCk7XG4gICAgfVxufVxuXG5jbGFzcyBQcm9wTGF5b3V0c0J5Wm9uZVJlc29sdmVyIGV4dGVuZHMgU3RhdGljYWxseVJlc29sdmFibGVcbntcblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiAoPFVJTWV0YT5jb250ZXh0Lm1ldGEpLml0ZW1OYW1lc0J5Wm9uZXMoY29udGV4dCwgVUlNZXRhLktleUxheW91dCxcbiAgICAgICAgICAgICg8VUlNZXRhPmNvbnRleHQubWV0YSkuem9uZXMoY29udGV4dCkpO1xuICAgIH1cbn1cblxuXG5jbGFzcyBfRGVmYXVsdExhYmVsR2VuZXJhdG9yIGV4dGVuZHMgU3RhdGljYWxseVJlc29sdmFibGVcbntcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfa2V5OiBzdHJpbmcpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBmaWVsZE5hbWUgPSBjb250ZXh0LnZhbHVlcy5nZXQodGhpcy5fa2V5KTtcblxuICAgICAgICByZXR1cm4gKGlzUHJlc2VudChmaWVsZE5hbWUpICYmIGlzU3RyaW5nKGZpZWxkTmFtZSkpID9cbiAgICAgICAgICAgIFVJTWV0YS5kZWZhdWx0TGFiZWxGb3JJZGVudGlmaWVyKGZpZWxkTmFtZSkgOiBudWxsO1xuICAgIH1cbn1cblxuLyoqXG4gKiBMb2FkIFVzZXIgZGVmaW5lZCBtZXRhIGRhdGEuIFRoaXMgY2xhc3MgaXMgdHJpZ2dlcmVkIGFzIHNvb24gYXMgd2UgY3JlYXRlIGEgY29udGV4dCBhbmRcbiAqIHBhc3MgYW4gb2JqZWN0IGludG8gaXQuIEJhc2VkIG9uIHRoZSBvYmplY3Qgd2Ugbm90aWZ5IGRpZmZlcmVudCBPYnNlcnZlcnMgcGFzc2luZyBuYW1lXG4gKiBvZiB0aGUgY2xhc3MgYW5kIGhlcmUgd2Ugc2VhcmNoIGlmIHdlIGhhdmUgYW55IFJ1bGVzIGF2YWlsYWJsZSBmb3IgY3VycmVudCBjbGFzc05hbWUgYW5kXG4gKiB0cnkgdG8gbG9hZCB0aGUgUnVsZS5cbiAqL1xuY2xhc3MgVXNlck1ldGFEYXRhUHJvdmlkZXIgaW1wbGVtZW50cyBWYWx1ZVF1ZXJpZWRPYnNlcnZlclxue1xuXG4gICAgbm90aWZ5KG1ldGE6IE1ldGEsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGFSdWxlczogQXJyYXk8SnNvblJ1bGU+O1xuICAgICAgICBsZXQgdWlNZXRhOiBVSU1ldGEgPSA8VUlNZXRhPiBtZXRhO1xuXG4gICAgICAgIGlmICh1aU1ldGEuX3Rlc3RSdWxlcy5oYXModmFsdWUgKyAnUnVsZScpKSB7XG4gICAgICAgICAgICAvLyBzaW5jZSB3ZSBhcmUgaW4gZGV2ZWxvcG1lbnQgbW9kZSBhbmQgdGVzdCBtb2RlIGlzIG9uIHdlIGNhbiBjaGVjayBleHRyYSByZXBvc2l0b3J5XG4gICAgICAgICAgICAvLyB1c2VkIGJ5IHRlc3RzLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGFyZSBub3QgcnVubmluZyB1bml0dGVzdCBhbmQgYSBjbGFzcyBpcyBub3RcbiAgICAgICAgICAgIC8vIGFwcGxpY2F0aW9uIGRlZmluZWQgYnV0IHVuaXR0ZXN0IGRlZmluZWQgcnVsZVxuXG4gICAgICAgICAgICBpZiAodWlNZXRhLl90ZXN0UnVsZXMuaGFzKHZhbHVlICsgJ1J1bGUnKSAmJlxuICAgICAgICAgICAgICAgIGlzUHJlc2VudCh1aU1ldGEuX3Rlc3RSdWxlcy5nZXQodmFsdWUgKyAnUnVsZScpLm9zcykpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYVJ1bGVzID0gdWlNZXRhLl90ZXN0UnVsZXMuZ2V0KHZhbHVlICsgJ1J1bGUnKS5vc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXRhLmxvYWRVc2VyUnVsZShhUnVsZXMsIHZhbHVlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh1aU1ldGEuYXBwQ29uZmlnKSAmJlxuICAgICAgICAgICAgdWlNZXRhLmFwcENvbmZpZy5nZXQoVUlNZXRhLkFwcENvbmZpZ1VzZXJSdWxlc1BhcmFtKSlcbiAgICAgICAge1xuXG4gICAgICAgICAgICBsZXQgdXNlclJlZmVyZW5jZXM6IGFueVtdID0gdWlNZXRhLmFwcENvbmZpZy5nZXQoVUlNZXRhLkFwcENvbmZpZ1VzZXJSdWxlc1BhcmFtKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB1c2VyUmVmZXJlbmNlcykge1xuICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodXNlclJlZmVyZW5jZXNbaV1bdmFsdWUgKyAnUnVsZSddKSAmJlxuICAgICAgICAgICAgICAgICAgICBpc1ByZXNlbnQodXNlclJlZmVyZW5jZXNbaV1bdmFsdWUgKyAnUnVsZSddLm9zcykpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhUnVsZXMgPSB1c2VyUmVmZXJlbmNlc1tpXVt2YWx1ZSArICdSdWxlJ10ub3NzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGEubG9hZFVzZXJSdWxlKGFSdWxlcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=