/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var UIMeta = /** @class */ (function (_super) {
    tslib_1.__extends(UIMeta, _super);
    function UIMeta() {
        var _this = _super.call(this) || this;
        // if (isPresent(loader)) {
        //     this.registerLoader(loader);
        // }
        try {
            _this.beginRuleSet('UIMeta');
            _this.registerKeyInitObserver(UIMeta.KeyClass, new UserMetaDataProvider());
            // These keys define scopes for their properties
            // defineKeyAsPropertyScope(KeyArea);
            // These keys define scopes for their properties
            // defineKeyAsPropertyScope(KeyArea);
            _this.defineKeyAsPropertyScope(UIMeta.KeyLayout);
            _this.defineKeyAsPropertyScope(UIMeta.KeyModule);
            // Default rule for converting field name to label
            // Default rule for converting field name to label
            _this.registerDefaultLabelGeneratorForKey(UIMeta.KeyClass);
            _this.registerDefaultLabelGeneratorForKey(UIMeta.KeyField);
            _this.registerDefaultLabelGeneratorForKey(UIMeta.KeyLayout);
            _this.registerDefaultLabelGeneratorForKey(UIMeta.KeyModule);
            _this.registerDefaultLabelGeneratorForKey(UIMeta.KeyAction);
            _this.registerDefaultLabelGeneratorForKey(UIMeta.KeyActionCategory);
            // policies for chaining certain well known properties
            // policies for chaining certain well known properties
            _this.registerPropertyMerger(UIMeta.KeyArea, Meta.PropertyMerger_DeclareList);
            _this.registerPropertyMerger(UIMeta.KeyLayout, Meta.PropertyMerger_DeclareList);
            _this.registerPropertyMerger(UIMeta.KeyModule, Meta.PropertyMerger_DeclareList);
            _this.mirrorPropertyToContext(UIMeta.KeyEditing, UIMeta.KeyEditing);
            _this.mirrorPropertyToContext(UIMeta.KeyLayout, UIMeta.KeyLayout);
            _this.mirrorPropertyToContext(UIMeta.KeyComponentName, UIMeta.KeyComponentName);
            _this.registerPropertyMerger(UIMeta.KeyEditing, new PropertyMerger_And());
            // this.registerValueTransformerForKey('requestContext', UIMeta.Transformer_KeyPresent);
            // this.registerValueTransformerForKey('displayGroup', UIMeta.Transformer_KeyPresent);
            // define operation hierarchy
            // this.registerValueTransformerForKey('requestContext', UIMeta.Transformer_KeyPresent);
            // this.registerValueTransformerForKey('displayGroup', UIMeta.Transformer_KeyPresent);
            // define operation hierarchy
            _this.keyData(UIMeta.KeyOperation).setParent('view', 'inspect');
            _this.keyData(UIMeta.KeyOperation).setParent('print', 'view');
            _this.keyData(UIMeta.KeyOperation).setParent('edit', 'inspect');
            _this.keyData(UIMeta.KeyOperation).setParent('search', 'inspect');
            _this.keyData(UIMeta.KeyOperation).setParent('keywordSearch', 'search');
            _this.keyData(UIMeta.KeyOperation).setParent('textSearch', 'keywordSearch');
            _this.registerStaticallyResolvable(UIMeta.PropFieldsByZone, new PropFieldsByZoneResolver(), UIMeta.KeyClass);
            _this.registerStaticallyResolvable(UIMeta.PropFieldPropertyList, new PropFieldPropertyListResolver(), UIMeta.KeyClass);
            _this.registerStaticallyResolvable(UIMeta.PropLayoutsByZone, new PropLayoutsByZoneResolver(), UIMeta.KeyLayout);
            // this.registerStaticallyResolvable(UIMeta.PropLayoutsByZone , new
            // PropLayoutsByZoneResolver() , UIMeta.KeyLayout);
            // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyField);
            // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyLayout);
            // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyClass);
            // registerStaticallyResolvable('bindingsDictionary' , dyn , KeyModule);
        }
        finally {
            _this.endRuleSet();
        }
        return _this;
    }
    /**
     * @return {?}
     */
    UIMeta.getInstance = /**
     * @return {?}
     */
    function () {
        return this._instance || (this._instance = new this());
    };
    /**
     * @param {?} fieldName
     * @return {?}
     */
    UIMeta.defaultLabelForIdentifier = /**
     * @param {?} fieldName
     * @return {?}
     */
    function (fieldName) {
        /** @type {?} */
        var lastDot = fieldName.lastIndexOf('.');
        if (lastDot !== -1 && lastDot !== fieldName.length - 1) {
            fieldName = fieldName.substring(lastDot + 1);
        }
        return decamelize(fieldName);
    };
    /**
     * @param {?} className
     * @return {?}
     */
    UIMeta.beautifyClassName = /**
     * @param {?} className
     * @return {?}
     */
    function (className) {
        return decamelize(className, ' ');
    };
    /**
     * @param {?} field
     * @return {?}
     */
    UIMeta.beautifyFileName = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return decamelize(field, ' ');
    };
    /**
     * @param {?} context
     * @return {?}
     */
    UIMeta.prototype.zones = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var zones = context.propertyForKey('zones');
        return (isBlank(zones)) ? Meta.toList(UIMeta.ZoneMain) : zones;
    };
    /**
     * @param {?} context
     * @return {?}
     */
    UIMeta.prototype.zonePath = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var zonePath;
        if (isPresent(context.values.get(UIMeta.KeyLayout))) {
            context.push();
            context.setScopeKey(UIMeta.KeyLayout);
            zonePath = context.propertyForKey(UIMeta.KeyZonePath);
            context.pop();
        }
        return zonePath;
    };
    /**
     * @param {?=} isNested
     * @return {?}
     */
    UIMeta.prototype.newContext = /**
     * @param {?=} isNested
     * @return {?}
     */
    function (isNested) {
        if (isNested === void 0) { isNested = false; }
        return new UIContext(this, isNested);
    };
    // Load system rules
    /**
     * @param {?=} references
     * @return {?}
     */
    UIMeta.prototype.loadDefaultRuleFiles = /**
     * @param {?=} references
     * @return {?}
     */
    function (references) {
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
    };
    /**
     * loads application level rules. Application level rules are global rules
     */
    /**
     * loads application level rules. Application level rules are global rules
     * @return {?}
     */
    UIMeta.prototype.loadApplicationRules = /**
     * loads application level rules. Application level rules are global rules
     * @return {?}
     */
    function () {
        /** @type {?} */
        var aRules;
        /** @type {?} */
        var userReferences;
        /** @type {?} */
        var appRuleFiles = ['Application'];
        if (isPresent(this.appConfig)) {
            appRuleFiles = this.appConfig.get(UIMeta.AppConfigRuleFilesParam) || ['Application'];
            userReferences = this.appConfig.get(UIMeta.AppConfigUserRulesParam);
            // make sure we have always Application and make it more additive.
            if (!ListWrapper.contains(appRuleFiles, 'Application')) {
                appRuleFiles.unshift('Application');
            }
        }
        try {
            for (var appRuleFiles_1 = tslib_1.__values(appRuleFiles), appRuleFiles_1_1 = appRuleFiles_1.next(); !appRuleFiles_1_1.done; appRuleFiles_1_1 = appRuleFiles_1.next()) {
                var ruleFile = appRuleFiles_1_1.value;
                /** @type {?} */
                var rule = ruleFile + 'Rule';
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
                    for (var i in userReferences) {
                        /** @type {?} */
                        var userRule = userReferences[i];
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (appRuleFiles_1_1 && !appRuleFiles_1_1.done && (_a = appRuleFiles_1.return)) _a.call(appRuleFiles_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    /**
     * @param {?} source
     * @param {?} userClass
     * @return {?}
     */
    UIMeta.prototype.loadUserRule = /**
     * @param {?} source
     * @param {?} userClass
     * @return {?}
     */
    function (source, userClass) {
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
    };
    /**
     * @param {?} key
     * @return {?}
     */
    UIMeta.prototype.defaultLabelGeneratorForKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return new _DefaultLabelGenerator(key);
    };
    /**
     * @param {?} propKey
     * @param {?} dynamicValue
     * @param {?} contextKey
     * @param {?} contextValue
     * @return {?}
     */
    UIMeta.prototype.registerDerivedValue = /**
     * @param {?} propKey
     * @param {?} dynamicValue
     * @param {?} contextKey
     * @param {?} contextValue
     * @return {?}
     */
    function (propKey, dynamicValue, contextKey, contextValue) {
        /** @type {?} */
        var m = new Map();
        m.set(propKey, dynamicValue);
        this.addRule(new Rule(Meta.toList(new Selector(contextKey, contextValue)), m, Meta.SystemRulePriority));
    };
    /**
     * @param {?} propKey
     * @param {?} dynamicValue
     * @param {?} contextKey
     * @return {?}
     */
    UIMeta.prototype.registerStaticallyResolvable = /**
     * @param {?} propKey
     * @param {?} dynamicValue
     * @param {?} contextKey
     * @return {?}
     */
    function (propKey, dynamicValue, contextKey) {
        this.registerDerivedValue(propKey, new StaticDynamicWrapper(dynamicValue), contextKey, Meta.KeyAny);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    UIMeta.prototype.registerDefaultLabelGeneratorForKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.registerDerivedValue(UIMeta.KeyLabel, new LocalizedLabelString(this), key, UIMeta.KeyAny);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    UIMeta.prototype.fieldList = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.itemList(context, UIMeta.KeyField, UIMeta.ZonesTLRMB);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    UIMeta.prototype.fieldsByZones = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.itemsByZones(context, UIMeta.KeyField, UIMeta.ZonesTLRMB);
    };
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} zones
     * @return {?}
     */
    UIMeta.prototype.itemNamesByZones = /**
     * @param {?} context
     * @param {?} key
     * @param {?} zones
     * @return {?}
     */
    function (context, key, zones) {
        /** @type {?} */
        var itemsByZones = this.itemsByZones(context, key, zones);
        return this.mapItemPropsToNames(itemsByZones);
    };
    /**
     * @param {?} itemsByZones
     * @return {?}
     */
    UIMeta.prototype.mapItemPropsToNames = /**
     * @param {?} itemsByZones
     * @return {?}
     */
    function (itemsByZones) {
        var _this = this;
        /** @type {?} */
        var namesByZones = new Map();
        MapWrapper.iterable(itemsByZones).forEach(function (value, key) {
            if (isPresent(value) && isArray(value)) {
                /** @type {?} */
                var names = [];
                try {
                    for (var value_1 = tslib_1.__values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        var item = value_1_1.value;
                        if (item instanceof ItemProperties) {
                            names.push((/** @type {?} */ (item)).name);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                namesByZones.set(key, names);
            }
            else {
                namesByZones.set(key, _this.mapItemPropsToNames(value));
            }
            var e_2, _a;
        });
        return namesByZones;
    };
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} defaultPredecessor
     * @return {?}
     */
    UIMeta.prototype.predecessorMap = /**
     * @param {?} context
     * @param {?} key
     * @param {?} defaultPredecessor
     * @return {?}
     */
    function (context, key, defaultPredecessor) {
        /** @type {?} */
        var fieldInfos = this.itemProperties(context, key, false);
        /** @type {?} */
        var predecessors = MapWrapper.groupBy(fieldInfos, function (item) {
            /** @type {?} */
            var pred = item.properties.get(UIMeta.KeyAfter);
            return isPresent(pred) ? pred : defaultPredecessor;
        });
        return predecessors;
    };
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} zones
     * @return {?}
     */
    UIMeta.prototype.itemList = /**
     * @param {?} context
     * @param {?} key
     * @param {?} zones
     * @return {?}
     */
    function (context, key, zones) {
        /** @type {?} */
        var predecessors = this.predecessorMap(context, key, zones[0]);
        /** @type {?} */
        var result = [];
        try {
            for (var zones_1 = tslib_1.__values(zones), zones_1_1 = zones_1.next(); !zones_1_1.done; zones_1_1 = zones_1.next()) {
                var zone = zones_1_1.value;
                this.accumulatePrecessors(predecessors, zone, result);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (zones_1_1 && !zones_1_1.done && (_a = zones_1.return)) _a.call(zones_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return result;
        var e_3, _a;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    UIMeta.prototype.isZoneReference = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var lastDot = key.lastIndexOf('.');
        /** @type {?} */
        var suffix = (lastDot === -1) ? key : key.substring(lastDot + 1);
        return (suffix.length > 1) && (suffix[0] === 'z') && (suffix[1].toUpperCase() === suffix[1] // is uppercase ?s
        );
    };
    /**
     * @param {?} context
     * @param {?} property
     * @param {?} zones
     * @return {?}
     */
    UIMeta.prototype.itemsByZones = /**
     * @param {?} context
     * @param {?} property
     * @param {?} zones
     * @return {?}
     */
    function (context, property, zones) {
        var _this = this;
        /** @type {?} */
        var predecessors = this.predecessorMap(context, property, zones[0]);
        /** @type {?} */
        var byZone = new Map();
        MapWrapper.iterable(predecessors).forEach(function (value, zone) {
            if (_this.isZoneReference(zone)) {
                /** @type {?} */
                var list = [];
                _this.accumulatePrecessors(predecessors, zone, list);
                FieldPath.setFieldValue(byZone, zone, list);
            }
        });
        return byZone;
    };
    // recursive decent of predecessor tree...
    /**
     * @param {?} predecessors
     * @param {?} key
     * @param {?} result
     * @return {?}
     */
    UIMeta.prototype.accumulatePrecessors = /**
     * @param {?} predecessors
     * @param {?} key
     * @param {?} result
     * @return {?}
     */
    function (predecessors, key, result) {
        /** @type {?} */
        var items = predecessors.get(key);
        if (isBlank(items)) {
            return;
        }
        ListWrapper.sort(items, function (o1, o2) {
            /** @type {?} */
            var r1 = o1.properties.get(UIMeta.KeyRank);
            /** @type {?} */
            var r2 = o2.properties.get(UIMeta.KeyRank);
            if (r1 === null) {
                r1 = 100;
            }
            if (r2 === null) {
                r2 = 100;
            }
            return (r1 === r2) ? 0 : (r1 === null) ? 1 : (r2 === null) ? -1 : (r1 - r2);
        });
        try {
            for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (!item.hidden) {
                    result.push(item);
                }
                this.accumulatePrecessors(predecessors, item.name, result);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var e_4, _a;
    };
    /**
     * Called by Parser to handle decls like 'zLeft => lastName#required'
     *
     */
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
    UIMeta.prototype.addPredecessorRule = /**
     * Called by Parser to handle decls like 'zLeft => lastName#required'
     *
     * @param {?} itemName
     * @param {?} contextPreds
     * @param {?} predecessor
     * @param {?} traits
     * @param {?} lineNumber
     * @return {?}
     */
    function (itemName, contextPreds, predecessor, traits, lineNumber) {
        if (isBlank(predecessor) && isBlank(traits)) {
            return null;
        }
        /** @type {?} */
        var key = this.scopeKeyForSelector(contextPreds);
        if (isBlank(key) || key === UIMeta.KeyClass) {
            key = UIMeta.KeyField;
        }
        /** @type {?} */
        var selector = new Array();
        ListWrapper.addAll(selector, contextPreds);
        selector.push(new Selector(key, itemName));
        /** @type {?} */
        var props = new Map();
        if (isPresent(predecessor)) {
            props.set(UIMeta.KeyAfter, predecessor);
        }
        if (isPresent(traits)) {
            props.set(UIMeta.KeyTrait, traits);
        }
        /** @type {?} */
        var rule = new Rule(selector, props, 0, lineNumber);
        this.addRule(rule);
        return rule;
    };
    /**
     * @param {?} fieldsByZones
     * @param {?} zoneList
     * @param {?} key
     * @param {?} context
     * @return {?}
     */
    UIMeta.prototype.flattenVisible = /**
     * @param {?} fieldsByZones
     * @param {?} zoneList
     * @param {?} key
     * @param {?} context
     * @return {?}
     */
    function (fieldsByZones, zoneList, key, context) {
        /** @type {?} */
        var result = [];
        if (isPresent(fieldsByZones)) {
            try {
                for (var zoneList_1 = tslib_1.__values(zoneList), zoneList_1_1 = zoneList_1.next(); !zoneList_1_1.done; zoneList_1_1 = zoneList_1.next()) {
                    var zone = zoneList_1_1.value;
                    /** @type {?} */
                    var fields = fieldsByZones.get(zone);
                    if (isBlank(fields)) {
                        continue;
                    }
                    try {
                        for (var fields_1 = tslib_1.__values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                            var field = fields_1_1.value;
                            context.push();
                            context.set(key, field);
                            if (context.booleanPropertyForKey(UIMeta.KeyVisible, false)) {
                                result.push(field);
                            }
                            context.pop();
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (zoneList_1_1 && !zoneList_1_1.done && (_b = zoneList_1.return)) _b.call(zoneList_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        return result;
        var e_6, _b, e_5, _a;
    };
    /**
     * @param {?} className
     * @return {?}
     */
    UIMeta.prototype.displayKeyForClass = /**
     * @param {?} className
     * @return {?}
     */
    function (className) {
        /** @type {?} */
        var context = this.newContext();
        context.set(UIMeta.KeyLayout, 'LabelField');
        context.set(UIMeta.KeyClass, className);
        /** @type {?} */
        var fields = this.itemProperties(context, UIMeta.KeyField, true);
        return ListWrapper.isEmpty(fields) ? '$toString' : fields[0].name;
    };
    /**
     * @param {?} className
     * @param {?} propertiesValue
     * @return {?}
     */
    UIMeta.prototype.displayLabel = /**
     * @param {?} className
     * @param {?} propertiesValue
     * @return {?}
     */
    function (className, propertiesValue) {
        if (isPresent(propertiesValue)) {
            return propertiesValue;
        }
        return this.displayKeyForClass(className);
    };
    /**
     * @param {?} key
     * @param {?} defaultValue
     * @return {?}
     */
    UIMeta.prototype.createLocalizedString = /**
     * @param {?} key
     * @param {?} defaultValue
     * @return {?}
     */
    function (key, defaultValue) {
        assert(isPresent(this._currentRuleSet), 'Attempt to create localized string without currentRuleSet in place');
        return new LocalizedString(this, this._currentRuleSet.filePath, key, defaultValue);
    };
    Object.defineProperty(UIMeta.prototype, "routingService", {
        get: /**
         * @return {?}
         */
        function () {
            return (isPresent(this._injector)) ? this._injector.get(RoutingService)
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIMeta.prototype, "env", {
        get: /**
         * @return {?}
         */
        function () {
            return (isPresent(this._injector)) ? this._injector.get(Environment) : new Environment();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIMeta.prototype, "appConfig", {
        get: /**
         * @return {?}
         */
        function () {
            return (isPresent(this._injector)) ? this._injector.get(AppConfig) : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Registers framework level components and listen for user level rules to be registered.
     * After we register user level rules it will load application.oss.
     *
     *
     * @param {?} sysReferences
     * @return {?}
     */
    UIMeta.prototype.registerComponents = /**
     * Registers framework level components and listen for user level rules to be registered.
     * After we register user level rules it will load application.oss.
     *
     *
     * @param {?} sysReferences
     * @return {?}
     */
    function (sysReferences) {
        assert(isPresent(this.injector), 'Cannot register components without Injector in order' +
            ' to get access to ComponentRegistry Service');
        assert(this.env.inTest || isPresent(this.appConfig.get(UIMeta.AppConfigUserRulesParam)), 'Unable to initialize MetaUI as user rules are missing. please use:' +
            ' metaui.rules.user-rules configuration param');
        this.componentRegistry = this.injector.get(ComponentRegistry);
        if (isPresent(this.componentRegistry)) {
            this.componentRegistry.registerTypes(sysReferences);
            if (!this.env.inTest) {
                /** @type {?} */
                var userReferences = this.appConfig.get(UIMeta.AppConfigUserRulesParam);
                try {
                    for (var userReferences_1 = tslib_1.__values(userReferences), userReferences_1_1 = userReferences_1.next(); !userReferences_1_1.done; userReferences_1_1 = userReferences_1.next()) {
                        var uRule = userReferences_1_1.value;
                        this.componentRegistry.registerTypes(uRule);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (userReferences_1_1 && !userReferences_1_1.done && (_a = userReferences_1.return)) _a.call(userReferences_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                this.loadApplicationRules();
            }
        }
        else if (!this.env.inTest) {
            warn('UIMeta.registerComponents() No components were registered !');
        }
        var e_7, _a;
    };
    /**
     *
     * Just need to call it different than the other fireAction as I can not do any method
     * overloading here.
     *
     */
    /**
     *
     * Just need to call it different than the other fireAction as I can not do any method
     * overloading here.
     *
     * @param {?} action
     * @param {?} context
     * @return {?}
     */
    UIMeta.prototype.fireActionFromProps = /**
     *
     * Just need to call it different than the other fireAction as I can not do any method
     * overloading here.
     *
     * @param {?} action
     * @param {?} context
     * @return {?}
     */
    function (action, context) {
        context.push();
        /** @type {?} */
        var actionCategory = action.properties.get(ObjectMeta.KeyActionCategory);
        if (isBlank(actionCategory)) {
            actionCategory = ObjectMeta.DefaultActionCategory;
        }
        context.set(ObjectMeta.KeyActionCategory, actionCategory);
        context.set(ObjectMeta.KeyAction, action.name);
        this._fireAction(context, false);
        context.pop();
    };
    /**
     * @param {?} context
     * @param {?=} withBackAction
     * @return {?}
     */
    UIMeta.prototype.fireAction = /**
     * @param {?} context
     * @param {?=} withBackAction
     * @return {?}
     */
    function (context, withBackAction) {
        if (withBackAction === void 0) { withBackAction = false; }
        context.push();
        this._fireAction(context, withBackAction);
        context.pop();
    };
    /**
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    UIMeta.prototype._fireAction = /**
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    function (context, withBackAction) {
        /** @type {?} */
        var actionResults = context.propertyForKey('actionResults');
        if (isBlank(actionResults) || !this.isRoute(actionResults)) {
            return;
        }
        this.naviateToPage(context, actionResults, withBackAction);
    };
    /**
     * @param {?} context
     * @param {?} route
     * @param {?} withBackAction
     * @return {?}
     */
    UIMeta.prototype.naviateToPage = /**
     * @param {?} context
     * @param {?} route
     * @param {?} withBackAction
     * @return {?}
     */
    function (context, route, withBackAction) {
        /** @type {?} */
        var params = this.prepareRoute(context, withBackAction);
        /** @type {?} */
        var uiContex = /** @type {?} */ (context);
        this.routingService.navigateWithRoute(route, params, uiContex.object);
    };
    /**
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    UIMeta.prototype.prepareRoute = /**
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    function (context, withBackAction) {
        /** @type {?} */
        var params = {};
        /** @type {?} */
        var pageBindings = context.propertyForKey('pageBindings');
        if (isPresent(pageBindings)) {
            pageBindings.forEach(function (v, k) {
                if (k !== ObjectMeta.KeyObject) {
                    (/** @type {?} */ (params))[k] = context.resolveValue(v);
                }
            });
            if (isPresent(withBackAction)) {
                (/** @type {?} */ (params))['b'] = withBackAction;
            }
        }
        return params;
    };
    /**
     * @param {?} component
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    UIMeta.prototype.prepareRouteForComponent = /**
     * @param {?} component
     * @param {?} context
     * @param {?} withBackAction
     * @return {?}
     */
    function (component, context, withBackAction) {
        /** @type {?} */
        var params = {};
        /** @type {?} */
        var pageBindings = context.propertyForKey('pageBindings');
        if (isPresent(pageBindings)) {
            pageBindings.forEach(function (v, k) {
                component[k] = v;
            });
        }
        return params;
    };
    /**
     * @param {?} module
     * @param {?=} activatedPath
     * @return {?}
     */
    UIMeta.prototype.gotoModule = /**
     * @param {?} module
     * @param {?=} activatedPath
     * @return {?}
     */
    function (module, activatedPath) {
        this.env.deleteValue(ACTIVE_CNTX);
        /** @type {?} */
        var context = this.newContext();
        context.push();
        context.set(UIMeta.KeyModule, module.name);
        /** @type {?} */
        var pageName = context.propertyForKey(UIMeta.KeyHomePage);
        /** @type {?} */
        var route = this.routingService.routeForPage(pageName, module.name.toLowerCase(), activatedPath);
        if (activatedPath === '/') {
            activatedPath = '';
        }
        /** @type {?} */
        var path = activatedPath + "/" + route.path;
        /** @type {?} */
        var params = this.prepareRoute(context, null);
        context.pop();
        this.routingService.navigate([path, params], { skipLocationChange: true });
    };
    /**
     * @param {?} actionResult
     * @return {?}
     */
    UIMeta.prototype.isRoute = /**
     * @param {?} actionResult
     * @return {?}
     */
    function (actionResult) {
        return isStringMap(actionResult) && isPresent(actionResult['path']);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    UIMeta.prototype.compPageWithName = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var currType = this.componentRegistry.nameToType.get(name);
        if (isBlank(currType)) {
            assert(false, name + ' component does not exists. Create Dummy Component instead of' +
                ' throwing this error');
            return;
        }
        return currType;
    };
    // caller must push/pop!
    /**
     * @param {?} context
     * @param {?} result
     * @param {?} zones
     * @return {?}
     */
    UIMeta.prototype.actionsByCategory = /**
     * @param {?} context
     * @param {?} result
     * @param {?} zones
     * @return {?}
     */
    function (context, result, zones) {
        /** @type {?} */
        var catNames = [];
        /** @type {?} */
        var actionCategories = this.itemList(context, ObjectMeta.KeyActionCategory, zones);
        if (isPresent(actionCategories)) {
            actionCategories.forEach(function (item) { return catNames.push(item.name); });
        }
        this.addActionsForCategories(context, result, catNames);
        return actionCategories;
    };
    /**
     * @param {?} context
     * @param {?} result
     * @param {?} catNames
     * @return {?}
     */
    UIMeta.prototype.addActionsForCategories = /**
     * @param {?} context
     * @param {?} result
     * @param {?} catNames
     * @return {?}
     */
    function (context, result, catNames) {
        try {
            for (var catNames_1 = tslib_1.__values(catNames), catNames_1_1 = catNames_1.next(); !catNames_1_1.done; catNames_1_1 = catNames_1.next()) {
                var cat = catNames_1_1.value;
                context.push();
                if (cat !== ObjectMeta.DefaultActionCategory) {
                    context.set(ObjectMeta.KeyActionCategory, cat);
                }
                this.collectActionsByCategory(context, result, cat);
                context.pop();
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (catNames_1_1 && !catNames_1_1.done && (_a = catNames_1.return)) _a.call(catNames_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        var e_8, _a;
    };
    /**
     * @param {?} context
     * @param {?} result
     * @param {?} targetCat
     * @return {?}
     */
    UIMeta.prototype.collectActionsByCategory = /**
     * @param {?} context
     * @param {?} result
     * @param {?} targetCat
     * @return {?}
     */
    function (context, result, targetCat) {
        /** @type {?} */
        var actionInfos = this.itemProperties(context, ObjectMeta.KeyAction, true);
        try {
            for (var actionInfos_1 = tslib_1.__values(actionInfos), actionInfos_1_1 = actionInfos_1.next(); !actionInfos_1_1.done; actionInfos_1_1 = actionInfos_1.next()) {
                var actionInfo = actionInfos_1_1.value;
                context.push();
                context.set(ObjectMeta.KeyAction, actionInfo.name);
                /** @type {?} */
                var visible = context.booleanPropertyForKey(ObjectMeta.KeyVisible, true);
                context.pop();
                if (visible) {
                    /** @type {?} */
                    var category = actionInfo.properties.get(ObjectMeta.KeyActionCategory);
                    if (category == null) {
                        category = ObjectMeta.DefaultActionCategory;
                    }
                    if (targetCat !== category) {
                        continue;
                    }
                    /** @type {?} */
                    var forCategory = result.get(category);
                    if (isBlank(forCategory)) {
                        forCategory = [];
                        result.set(category, forCategory);
                    }
                    forCategory.push(actionInfo);
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (actionInfos_1_1 && !actionInfos_1_1.done && (_a = actionInfos_1.return)) _a.call(actionInfos_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        var e_9, _a;
    };
    /**
     * @param {?=} context
     * @param {?=} checkVisibility
     * @return {?}
     */
    UIMeta.prototype.computeModuleInfo = /**
     * @param {?=} context
     * @param {?=} checkVisibility
     * @return {?}
     */
    function (context, checkVisibility) {
        if (context === void 0) { context = this.newContext(); }
        if (checkVisibility === void 0) { checkVisibility = true; }
        /** @type {?} */
        var moduleInfo = new ModuleInfo();
        moduleInfo.modules = [];
        /** @type {?} */
        var allModuleProps = this.itemList(context, UIMeta.KeyModule, UIMeta.ActionZones);
        moduleInfo.moduleNames = [];
        moduleInfo.moduleByNames = new Map();
        try {
            for (var allModuleProps_1 = tslib_1.__values(allModuleProps), allModuleProps_1_1 = allModuleProps_1.next(); !allModuleProps_1_1.done; allModuleProps_1_1 = allModuleProps_1.next()) {
                var module = allModuleProps_1_1.value;
                context.push();
                context.set(UIMeta.KeyModule, module.name);
                if (checkVisibility && !context.booleanPropertyForKey(UIMeta.KeyVisible, true)) {
                    context.pop();
                    continue;
                }
                moduleInfo.moduleNames.push(module.name);
                /** @type {?} */
                var modProperties = new ItemProperties(module.name, context.allProperties(), false);
                moduleInfo.modules.push(modProperties);
                moduleInfo.moduleByNames.set(module.name, modProperties);
                context.pop();
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (allModuleProps_1_1 && !allModuleProps_1_1.done && (_a = allModuleProps_1.return)) _a.call(allModuleProps_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
        context.push();
        context.set(UIMeta.KeyModule, moduleInfo.moduleNames);
        moduleInfo.actionsByCategory = new Map();
        moduleInfo.actionCategories = this.actionsByCategory(context, moduleInfo.actionsByCategory, UIMeta.ModuleActionZones);
        context.pop();
        return moduleInfo;
        var e_10, _a;
    };
    /**
     * @param {?} moduleName
     * @param {?=} context
     * @return {?}
     */
    UIMeta.prototype.currentModuleLabel = /**
     * @param {?} moduleName
     * @param {?=} context
     * @return {?}
     */
    function (moduleName, context) {
        if (context === void 0) { context = this.newContext(); }
        context.push();
        context.set(UIMeta.KeyModule, moduleName);
        /** @type {?} */
        var label = context.propertyForKey(UIMeta.KeyLabel);
        context.pop();
        return label;
    };
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
    return UIMeta;
}(ObjectMeta));
export { UIMeta };
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
var ModuleInfo = /** @class */ (function () {
    function ModuleInfo() {
    }
    return ModuleInfo;
}());
export { ModuleInfo };
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
var LocalizedString = /** @class */ (function (_super) {
    tslib_1.__extends(LocalizedString, _super);
    function LocalizedString(meta, _module, _key, _defaultValue) {
        var _this = _super.call(this) || this;
        _this.meta = meta;
        _this._module = _module;
        _this._key = _key;
        _this._defaultValue = _defaultValue;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    LocalizedString.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var localizedString;
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
    };
    /**
     * @return {?}
     */
    LocalizedString.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'LocaledString: {' + this._key + ' - ' + this._defaultValue + ' }';
    };
    return LocalizedString;
}(DynamicPropertyValue));
export { LocalizedString };
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
var LocalizedLabelString = /** @class */ (function (_super) {
    tslib_1.__extends(LocalizedLabelString, _super);
    function LocalizedLabelString(meta) {
        var _this = _super.call(this, meta, LocalizedLabelString.DefaultModule, null, null) || this;
        _this.meta = meta;
        _this.propertyAwaking = true;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    LocalizedLabelString.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (isBlank(this._key)) {
            /** @type {?} */
            var scopeKey = context.values.get(Meta.ScopeKey);
            /** @type {?} */
            var scopeVal = context.values.get(scopeKey);
            this._defaultValue = UIMeta.defaultLabelForIdentifier(scopeVal);
            this._key = scopeKey;
        }
        return _super.prototype.evaluate.call(this, context);
    };
    /**
     * @param {?} map
     * @return {?}
     */
    LocalizedLabelString.prototype.awakeForPropertyMap = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        return new LocalizedLabelString(this.meta);
    };
    LocalizedLabelString.DefaultModule = 'default';
    return LocalizedLabelString;
}(LocalizedString));
if (false) {
    /** @type {?} */
    LocalizedLabelString.DefaultModule;
    /** @type {?} */
    LocalizedLabelString.prototype.propertyAwaking;
    /** @type {?} */
    LocalizedLabelString.prototype.meta;
}
var PropFieldsByZoneResolver = /** @class */ (function (_super) {
    tslib_1.__extends(PropFieldsByZoneResolver, _super);
    function PropFieldsByZoneResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    PropFieldsByZoneResolver.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var m = (/** @type {?} */ (context.meta)).itemNamesByZones(context, UIMeta.KeyField, (/** @type {?} */ (context.meta)).zones(context));
        /** @type {?} */
        var zonePath = (/** @type {?} */ (context.meta)).zonePath(context);
        if (isPresent(zonePath)) {
            m = /** @type {?} */ (FieldPath.getFieldValue(m, zonePath));
            if (isBlank(m)) {
                m = new Map();
            }
        }
        return m;
    };
    return PropFieldsByZoneResolver;
}(StaticallyResolvable));
var PropFieldPropertyListResolver = /** @class */ (function (_super) {
    tslib_1.__extends(PropFieldPropertyListResolver, _super);
    function PropFieldPropertyListResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    PropFieldPropertyListResolver.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return (/** @type {?} */ (context.meta)).fieldList(context);
    };
    return PropFieldPropertyListResolver;
}(StaticallyResolvable));
var PropLayoutsByZoneResolver = /** @class */ (function (_super) {
    tslib_1.__extends(PropLayoutsByZoneResolver, _super);
    function PropLayoutsByZoneResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    PropLayoutsByZoneResolver.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return (/** @type {?} */ (context.meta)).itemNamesByZones(context, UIMeta.KeyLayout, (/** @type {?} */ (context.meta)).zones(context));
    };
    return PropLayoutsByZoneResolver;
}(StaticallyResolvable));
var _DefaultLabelGenerator = /** @class */ (function (_super) {
    tslib_1.__extends(_DefaultLabelGenerator, _super);
    function _DefaultLabelGenerator(_key) {
        var _this = _super.call(this) || this;
        _this._key = _key;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    _DefaultLabelGenerator.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var fieldName = context.values.get(this._key);
        return (isPresent(fieldName) && isString(fieldName)) ?
            UIMeta.defaultLabelForIdentifier(fieldName) : null;
    };
    return _DefaultLabelGenerator;
}(StaticallyResolvable));
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
var /**
 * Load User defined meta data. This class is triggered as soon as we create a context and
 * pass an object into it. Based on the object we notify different Observers passing name
 * of the class and here we search if we have any Rules available for current className and
 * try to load the Rule.
 */
UserMetaDataProvider = /** @class */ (function () {
    function UserMetaDataProvider() {
    }
    /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    UserMetaDataProvider.prototype.notify = /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (meta, key, value) {
        /** @type {?} */
        var aRules;
        /** @type {?} */
        var uiMeta = /** @type {?} */ (meta);
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
            var userReferences = uiMeta.appConfig.get(UIMeta.AppConfigUserRulesParam);
            for (var i in userReferences) {
                if (isPresent(userReferences[i][value + 'Rule']) &&
                    isPresent(userReferences[i][value + 'Rule'].oss)) {
                    aRules = userReferences[i][value + 'Rule'].oss;
                }
            }
            meta.loadUserRule(aRules, value);
        }
    };
    return UserMetaDataProvider;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWltZXRhLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsiY29yZS91aW1ldGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDUCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFdBQVcsRUFDWCxXQUFXLEVBQ1gsVUFBVSxFQUNWLGNBQWMsRUFDZCxJQUFJLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsSUFBSSxFQUdKLGtCQUFrQixFQUVyQixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQVUsU0FBUyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRyxPQUFPLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUV0QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHVDQUF1QyxDQUFDOzs7Ozs7Ozs7O0lBYXRDLGtDQUFVOztvQkE4RTlCLGlCQUFPOzs7O1FBTVAsSUFBSSxDQUFDO1lBQ0QsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1QixLQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxD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RUcsSUFBSSxjQUFjLEdBQVUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFFakYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7b0JBQzVDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3JELENBQUM7b0JBQ0csTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO2lCQUNsRDthQUNKO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDcEM7S0FDSjsrQkF0akNMO0lBd2pDQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBcHBDb25maWcsXG4gICAgYXNzZXJ0LFxuICAgIGRlY2FtZWxpemUsXG4gICAgRW52aXJvbm1lbnQsXG4gICAgRmllbGRQYXRoLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgaXNTdHJpbmdNYXAsXG4gICAgTGlzdFdyYXBwZXIsXG4gICAgTWFwV3JhcHBlcixcbiAgICBSb3V0aW5nU2VydmljZSxcbiAgICB3YXJuXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtPYmplY3RNZXRhfSBmcm9tICcuL29iamVjdC1tZXRhJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJ0BhcmliYXVpL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgICBNZXRhLFxuICAgIFByb3BlcnR5TWFwLFxuICAgIFByb3BlcnR5TWFwQXdha2luZyxcbiAgICBQcm9wZXJ0eU1lcmdlcl9BbmQsXG4gICAgVmFsdWVRdWVyaWVkT2JzZXJ2ZXJcbn0gZnJvbSAnLi9tZXRhJztcbmltcG9ydCB7Q29udGV4dCwgVUlDb250ZXh0fSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHtTeXN0ZW1SdWxlc30gZnJvbSAnLi93aWRnZXRzLXJ1bGVzJztcbmltcG9ydCB7RHluYW1pY1Byb3BlcnR5VmFsdWUsIFN0YXRpY2FsbHlSZXNvbHZhYmxlLCBTdGF0aWNEeW5hbWljV3JhcHBlcn0gZnJvbSAnLi9wcm9wZXJ0eS12YWx1ZSc7XG5pbXBvcnQge1J1bGUsIFNlbGVjdG9yfSBmcm9tICcuL3J1bGUnO1xuaW1wb3J0IHtKc29uUnVsZX0gZnJvbSAnLi9qc29uLXJ1bGUnO1xuaW1wb3J0IHtJdGVtUHJvcGVydGllc30gZnJvbSAnLi9pdGVtLXByb3BlcnRpZXMnO1xuaW1wb3J0IHtTeXN0ZW1QZXJzaXN0ZW5jZVJ1bGVzfSBmcm9tICcuL3BlcnNpc3RlbmNlLXJ1bGVzJztcbmltcG9ydCB7QUNUSVZFX0NOVFh9IGZyb20gJy4vbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogVUlNZXRhIGlzIHJlc3BvbnNpYmxlIHNldHRpbmcgbGF5b3V0cyBhbmQgYWxsIGFyb3VuZCB0aGlzLiBXZSBjYW4gZWl0aGVyIHVzZSB0aGlzIGFzIGEgc2luZ2xldG9uXG4gKiBvciB1c2UgaXQgYXMgYSBzZXJ2aWNlIHVzaW5nIEFuZ3VsYXIgQEluamVjdCgpXG4gKiBSaWdodCBub3cgd2UgdXNlIHN0aWxsIHNpbmdsZXRvbiBhcyB3ZSBuZWVkIHRoaXMgY2xhc3MgYXMgYSBsaWJyYXJ5IGZvciBzb21lIG90aGVyIHByb2plY3RzXG4gKlxuICpcbiAqIHRvZG86IENvbnZlcnQgdG8gSW5qZWN0YWJsZVxuICovXG5cbiAgICAvLyBASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVUlNZXRhIGV4dGVuZHMgT2JqZWN0TWV0YVxue1xuICAgIHN0YXRpYyBLZXlPcGVyYXRpb24gPSAnb3BlcmF0aW9uJztcbiAgICBzdGF0aWMgS2V5TW9kdWxlID0gJ21vZHVsZSc7XG4gICAgc3RhdGljIEtleUxheW91dCA9ICdsYXlvdXQnO1xuICAgIHN0YXRpYyBLZXlBcmVhID0gJ2FyZWEnO1xuICAgIHN0YXRpYyBLZXlFZGl0aW5nID0gJ2VkaXRpbmcnO1xuICAgIHN0YXRpYyBLZXlBZnRlciA9ICdhZnRlcic7XG4gICAgc3RhdGljIEtleUhpZGRlbiA9ICdoaWRkZW4nO1xuICAgIHN0YXRpYyBLZXlMYWJlbCA9ICdsYWJlbCc7XG4gICAgc3RhdGljIEtleUNvbXBvbmVudE5hbWUgPSAnY29tcG9uZW50JztcbiAgICBzdGF0aWMgS2V5QmluZGluZ3MgPSAnYmluZGluZ3MnO1xuICAgIHN0YXRpYyBLZXlIb21lUGFnZSA9ICdob21lUGFnZSc7XG4gICAgc3RhdGljIEtleVpvbmVQYXRoID0gJ3pvbmVQYXRoJztcbiAgICBzdGF0aWMgUHJvcEZpZWxkc0J5Wm9uZSA9ICdmaWVsZHNCeVpvbmUnO1xuICAgIHN0YXRpYyBQcm9wSXNGaWVsZHNCeVpvbmUgPSAnZml2ZVpvbmVMYXlvdXQnO1xuICAgIHN0YXRpYyBQcm9wQWN0aW9uc0J5Q2F0ZWdvcnkgPSAnYWN0aW9uc0J5Q2F0ZWdvcnknO1xuICAgIHN0YXRpYyBQcm9wQWN0aW9uQ2F0ZWdvcmllcyA9ICdhY3Rpb25DYXRlZ29yaWVzJztcbiAgICBzdGF0aWMgUHJvcEZpZWxkUHJvcGVydHlMaXN0ID0gJ2ZpZWxkUHJvcGVydHlMaXN0JztcbiAgICBzdGF0aWMgUHJvcExheW91dHNCeVpvbmUgPSAnbGF5b3V0c0J5Wm9uZSc7XG4gICAgc3RhdGljIEtleVdyYXBwZXJDb21wb25lbnQgPSAnd3JhcHBlckNvbXBvbmVudCc7XG4gICAgc3RhdGljIEtleVdyYXBwZXJCaW5kaW5nID0gJ3dyYXBwZXJCaW5kaW5ncyc7XG5cblxuICAgIHN0YXRpYyBSb290UHJlZGVjZXNzb3JLZXkgPSAnX3Jvb3QnO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lTWFpbiA9ICd6TWFpbic7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpvbmVUb3AgPSAnelRvcCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpvbmVMZWZ0ID0gJ3pMZWZ0JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgWm9uZU1pZGRsZSA9ICd6TWlkZGxlJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgWm9uZVJpZ2h0ID0gJ3pSaWdodCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpvbmVCb3R0b20gPSAnekJvdHRvbSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpvbmVEZXRhaWwgPSAnekRldGFpbCc7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgQXBwQ29uZmlnUnVsZUZpbGVzUGFyYW0gPSAnbWV0YXVpLnJ1bGVzLmZpbGUtbmFtZXMnO1xuICAgIHN0YXRpYyByZWFkb25seSBBcHBDb25maWdVc2VyUnVsZXNQYXJhbSA9ICdtZXRhdWkucnVsZXMudXNlci1ydWxlcyc7XG5cbiAgICBzdGF0aWMgWm9uZXNUTFJNQiA9IFtcbiAgICAgICAgVUlNZXRhLlpvbmVUb3AsIFVJTWV0YS5ab25lTGVmdCwgVUlNZXRhLlpvbmVNaWRkbGUsXG4gICAgICAgIFVJTWV0YS5ab25lUmlnaHQsIFVJTWV0YS5ab25lQm90dG9tXG4gICAgXTtcbiAgICBzdGF0aWMgWm9uZXNNVExSQiA9IFtcbiAgICAgICAgVUlNZXRhLlpvbmVNYWluLCBVSU1ldGEuWm9uZVRvcCwgVUlNZXRhLlpvbmVMZWZ0LCBVSU1ldGEuWm9uZVJpZ2h0LCBVSU1ldGEuWm9uZUJvdHRvbVxuICAgIF07XG4gICAgc3RhdGljIFpvbmVzRGV0YWlsID0gW1VJTWV0YS5ab25lRGV0YWlsXTtcblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVUlNZXRhID0gbnVsbDtcblxuICAgIHN0YXRpYyBNb2R1bGVBY3Rpb25ab25lczogc3RyaW5nW10gPSBbJ3pOYXYnLCAnekdsb2JhbCddO1xuICAgIHN0YXRpYyBBY3Rpb25ab25lczogc3RyaW5nW10gPSBbJ3pHbG9iYWwnLCAnek1haW4nLCAnekdlbmVyYWwnXTtcblxuXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IFVJTWV0YVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0TGFiZWxGb3JJZGVudGlmaWVyKGZpZWxkTmFtZTogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgbGV0IGxhc3REb3QgPSBmaWVsZE5hbWUubGFzdEluZGV4T2YoJy4nKTtcbiAgICAgICAgaWYgKGxhc3REb3QgIT09IC0xICYmIGxhc3REb3QgIT09IGZpZWxkTmFtZS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBmaWVsZE5hbWUgPSBmaWVsZE5hbWUuc3Vic3RyaW5nKGxhc3REb3QgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVjYW1lbGl6ZShmaWVsZE5hbWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBiZWF1dGlmeUNsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGRlY2FtZWxpemUoY2xhc3NOYW1lLCAnICcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBiZWF1dGlmeUZpbGVOYW1lKGZpZWxkOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBkZWNhbWVsaXplKGZpZWxkLCAnICcpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIGlmIChpc1ByZXNlbnQobG9hZGVyKSkge1xuICAgICAgICAvLyAgICAgdGhpcy5yZWdpc3RlckxvYWRlcihsb2FkZXIpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuYmVnaW5SdWxlU2V0KCdVSU1ldGEnKTtcblxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlcktleUluaXRPYnNlcnZlcihVSU1ldGEuS2V5Q2xhc3MsIG5ldyBVc2VyTWV0YURhdGFQcm92aWRlcigpKTtcblxuICAgICAgICAgICAgLy8gVGhlc2Uga2V5cyBkZWZpbmUgc2NvcGVzIGZvciB0aGVpciBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAvLyBkZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoS2V5QXJlYSk7XG4gICAgICAgICAgICB0aGlzLmRlZmluZUtleUFzUHJvcGVydHlTY29wZShVSU1ldGEuS2V5TGF5b3V0KTtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKFVJTWV0YS5LZXlNb2R1bGUpO1xuXG4gICAgICAgICAgICAvLyBEZWZhdWx0IHJ1bGUgZm9yIGNvbnZlcnRpbmcgZmllbGQgbmFtZSB0byBsYWJlbFxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5Q2xhc3MpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5RmllbGQpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5TGF5b3V0KTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleU1vZHVsZSk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRGVmYXVsdExhYmVsR2VuZXJhdG9yRm9yS2V5KFVJTWV0YS5LZXlBY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnkpO1xuXG4gICAgICAgICAgICAvLyBwb2xpY2llcyBmb3IgY2hhaW5pbmcgY2VydGFpbiB3ZWxsIGtub3duIHByb3BlcnRpZXNcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihVSU1ldGEuS2V5QXJlYSwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoVUlNZXRhLktleUxheW91dCwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoVUlNZXRhLktleU1vZHVsZSwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG5cbiAgICAgICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoVUlNZXRhLktleUVkaXRpbmcsIFVJTWV0YS5LZXlFZGl0aW5nKTtcbiAgICAgICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoVUlNZXRhLktleUxheW91dCwgVUlNZXRhLktleUxheW91dCk7XG4gICAgICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KFVJTWV0YS5LZXlDb21wb25lbnROYW1lLCBVSU1ldGEuS2V5Q29tcG9uZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihVSU1ldGEuS2V5RWRpdGluZywgbmV3IFByb3BlcnR5TWVyZ2VyX0FuZCgpKTtcblxuICAgICAgICAgICAgLy8gdGhpcy5yZWdpc3RlclZhbHVlVHJhbnNmb3JtZXJGb3JLZXkoJ3JlcXVlc3RDb250ZXh0JywgVUlNZXRhLlRyYW5zZm9ybWVyX0tleVByZXNlbnQpO1xuICAgICAgICAgICAgLy8gdGhpcy5yZWdpc3RlclZhbHVlVHJhbnNmb3JtZXJGb3JLZXkoJ2Rpc3BsYXlHcm91cCcsIFVJTWV0YS5UcmFuc2Zvcm1lcl9LZXlQcmVzZW50KTtcblxuICAgICAgICAgICAgLy8gZGVmaW5lIG9wZXJhdGlvbiBoaWVyYXJjaHlcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ3ZpZXcnLCAnaW5zcGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5rZXlEYXRhKFVJTWV0YS5LZXlPcGVyYXRpb24pLnNldFBhcmVudCgncHJpbnQnLCAndmlldycpO1xuICAgICAgICAgICAgdGhpcy5rZXlEYXRhKFVJTWV0YS5LZXlPcGVyYXRpb24pLnNldFBhcmVudCgnZWRpdCcsICdpbnNwZWN0Jyk7XG4gICAgICAgICAgICB0aGlzLmtleURhdGEoVUlNZXRhLktleU9wZXJhdGlvbikuc2V0UGFyZW50KCdzZWFyY2gnLCAnaW5zcGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5rZXlEYXRhKFVJTWV0YS5LZXlPcGVyYXRpb24pLnNldFBhcmVudCgna2V5d29yZFNlYXJjaCcsICdzZWFyY2gnKTtcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ3RleHRTZWFyY2gnLCAna2V5d29yZFNlYXJjaCcpO1xuXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoVUlNZXRhLlByb3BGaWVsZHNCeVpvbmUsXG4gICAgICAgICAgICAgICAgbmV3IFByb3BGaWVsZHNCeVpvbmVSZXNvbHZlcigpLFxuICAgICAgICAgICAgICAgIFVJTWV0YS5LZXlDbGFzcyk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoVUlNZXRhLlByb3BGaWVsZFByb3BlcnR5TGlzdCxcbiAgICAgICAgICAgICAgICBuZXcgUHJvcEZpZWxkUHJvcGVydHlMaXN0UmVzb2x2ZXIoKSxcbiAgICAgICAgICAgICAgICBVSU1ldGEuS2V5Q2xhc3MpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKFVJTWV0YS5Qcm9wTGF5b3V0c0J5Wm9uZSxcbiAgICAgICAgICAgICAgICBuZXcgUHJvcExheW91dHNCeVpvbmVSZXNvbHZlcigpLFxuICAgICAgICAgICAgICAgIFVJTWV0YS5LZXlMYXlvdXQpO1xuXG5cbiAgICAgICAgICAgIC8vIHRoaXMucmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZShVSU1ldGEuUHJvcExheW91dHNCeVpvbmUgLCBuZXdcbiAgICAgICAgICAgIC8vIFByb3BMYXlvdXRzQnlab25lUmVzb2x2ZXIoKSAsIFVJTWV0YS5LZXlMYXlvdXQpO1xuICAgICAgICAgICAgLy8gcmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZSgnYmluZGluZ3NEaWN0aW9uYXJ5JyAsIGR5biAsIEtleUZpZWxkKTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoJ2JpbmRpbmdzRGljdGlvbmFyeScgLCBkeW4gLCBLZXlMYXlvdXQpO1xuICAgICAgICAgICAgLy8gcmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZSgnYmluZGluZ3NEaWN0aW9uYXJ5JyAsIGR5biAsIEtleUNsYXNzKTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoJ2JpbmRpbmdzRGljdGlvbmFyeScgLCBkeW4gLCBLZXlNb2R1bGUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgem9uZXMoY29udGV4dDogQ29udGV4dCk6IEFycmF5PHN0cmluZz5cbiAgICB7XG4gICAgICAgIGxldCB6b25lczogQXJyYXk8c3RyaW5nPiA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoJ3pvbmVzJyk7XG4gICAgICAgIHJldHVybiAoaXNCbGFuayh6b25lcykpID8gTWV0YS50b0xpc3QoVUlNZXRhLlpvbmVNYWluKSA6IHpvbmVzO1xuICAgIH1cblxuXG4gICAgem9uZVBhdGgoY29udGV4dDogQ29udGV4dCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IHpvbmVQYXRoOiBhbnk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29udGV4dC52YWx1ZXMuZ2V0KFVJTWV0YS5LZXlMYXlvdXQpKSkge1xuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldFNjb3BlS2V5KFVJTWV0YS5LZXlMYXlvdXQpO1xuICAgICAgICAgICAgem9uZVBhdGggPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlab25lUGF0aCk7XG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB6b25lUGF0aDtcbiAgICB9XG5cblxuICAgIG5ld0NvbnRleHQoaXNOZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSk6IENvbnRleHRcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgVUlDb250ZXh0KHRoaXMsIGlzTmVzdGVkKTtcbiAgICB9XG5cbiAgICAvLyBMb2FkIHN5c3RlbSBydWxlc1xuICAgIGxvYWREZWZhdWx0UnVsZUZpbGVzKHJlZmVyZW5jZXM/OiBhbnkpOiBib29sZWFuXG4gICAge1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoU3lzdGVtUnVsZXMub3NzKSkge1xuICAgICAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayhNZXRhLlN5c3RlbVJ1bGVQcmlvcml0eSwgJ3N5c3RlbScpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUnVsZXMoU3lzdGVtUnVsZXMub3NzLCAnc3lzdGVtJywgZmFsc2UpO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFJ1bGVTZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoU3lzdGVtUGVyc2lzdGVuY2VSdWxlcy5vc3MpKSB7XG4gICAgICAgICAgICB0aGlzLmJlZ2luUnVsZVNldFdpdGhSYW5rKE1ldGEuU3lzdGVtUnVsZVByaW9yaXR5ICsgMjAwMCwgJ3N5c3RlbS1wZXJzaXN0ZW5jZScpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUnVsZXMoU3lzdGVtUGVyc2lzdGVuY2VSdWxlcy5vc3MsICdzeXN0ZW0tcGVyc2lzdGVuY2UnLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kUnVsZVNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQocmVmZXJlbmNlcykpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21wb25lbnRzKHJlZmVyZW5jZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIGxvYWRzIGFwcGxpY2F0aW9uIGxldmVsIHJ1bGVzLiBBcHBsaWNhdGlvbiBsZXZlbCBydWxlcyBhcmUgZ2xvYmFsIHJ1bGVzXG4gICAgICovXG4gICAgbG9hZEFwcGxpY2F0aW9uUnVsZXMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGFSdWxlczogQXJyYXk8SnNvblJ1bGU+O1xuICAgICAgICBsZXQgdXNlclJlZmVyZW5jZXM6IGFueVtdO1xuICAgICAgICBsZXQgYXBwUnVsZUZpbGVzOiBzdHJpbmdbXSA9IFsnQXBwbGljYXRpb24nXTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYXBwQ29uZmlnKSkge1xuICAgICAgICAgICAgYXBwUnVsZUZpbGVzID0gdGhpcy5hcHBDb25maWcuZ2V0KFVJTWV0YS5BcHBDb25maWdSdWxlRmlsZXNQYXJhbSkgfHwgWydBcHBsaWNhdGlvbiddO1xuICAgICAgICAgICAgdXNlclJlZmVyZW5jZXMgPSB0aGlzLmFwcENvbmZpZy5nZXQoVUlNZXRhLkFwcENvbmZpZ1VzZXJSdWxlc1BhcmFtKTtcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYWx3YXlzIEFwcGxpY2F0aW9uIGFuZCBtYWtlIGl0IG1vcmUgYWRkaXRpdmUuXG4gICAgICAgICAgICBpZiAoIUxpc3RXcmFwcGVyLmNvbnRhaW5zPHN0cmluZz4oYXBwUnVsZUZpbGVzLCAnQXBwbGljYXRpb24nKSkge1xuICAgICAgICAgICAgICAgIGFwcFJ1bGVGaWxlcy51bnNoaWZ0KCdBcHBsaWNhdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgcnVsZUZpbGUgb2YgYXBwUnVsZUZpbGVzKSB7XG4gICAgICAgICAgICBsZXQgcnVsZSA9IHJ1bGVGaWxlICsgJ1J1bGUnO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fdGVzdFJ1bGVzLmhhcyhydWxlKSkge1xuICAgICAgICAgICAgICAgIC8vIHNpbmNlIHdlIGFyZSBpbiBkZXZlbG9wbWVudCBtb2RlIGFuZCB0ZXN0IG1vZGUgaXMgb24gd2UgY2FuIGNoZWNrIGV4dHJhXG4gICAgICAgICAgICAgICAgLy8gcmVwb3NpdG9yeSB1c2VkIGJ5IHRlc3RzLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGFyZSBub3QgcnVubmluZyB1bml0dGVzdFxuICAgICAgICAgICAgICAgIC8vIGFuZCBhIGNsYXNzIGlzIG5vdCBkZWZpbmVkIGJ1dCB1bml0dGVzdFxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rlc3RSdWxlcy5oYXMocnVsZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNQcmVzZW50KHRoaXMuX3Rlc3RSdWxlcy5nZXQocnVsZSkub3NzKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFSdWxlcyA9IHRoaXMuX3Rlc3RSdWxlcy5nZXQocnVsZSkub3NzO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoYVJ1bGVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayhNZXRhLkxvd1J1bGVQcmlvcml0eSwgcnVsZUZpbGUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRSdWxlcyhhUnVsZXMsIHJ1bGVGaWxlLnRvTG93ZXJDYXNlKCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdXNlclJlZmVyZW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJSdWxlID0gdXNlclJlZmVyZW5jZXNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh1c2VyUnVsZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh1c2VyUnVsZVtydWxlXSkgJiYgaXNQcmVzZW50KHVzZXJSdWxlW3J1bGVdLm9zcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhUnVsZXMgPSB1c2VyUnVsZVtydWxlXS5vc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChhUnVsZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luUnVsZVNldFdpdGhSYW5rKE1ldGEuTG93UnVsZVByaW9yaXR5LCBydWxlRmlsZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZFJ1bGVzKGFSdWxlcywgcnVsZUZpbGUudG9Mb3dlckNhc2UoKSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJ1bGVTZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFVzZXJSdWxlKHNvdXJjZTogYW55LCB1c2VyQ2xhc3M6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChzb3VyY2UpKSB7XG4gICAgICAgICAgICB0aGlzLmJlZ2luUnVsZVNldFdpdGhSYW5rKHRoaXMuX3J1bGVDb3VudCwgJ3VzZXI6JyArIHVzZXJDbGFzcyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRSdWxlcyhzb3VyY2UsICd1c2VyJywgZmFsc2UpO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFJ1bGVTZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBkZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoa2V5OiBzdHJpbmcpOiBEeW5hbWljUHJvcGVydHlWYWx1ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBfRGVmYXVsdExhYmVsR2VuZXJhdG9yKGtleSk7XG4gICAgfVxuXG5cbiAgICByZWdpc3RlckRlcml2ZWRWYWx1ZShwcm9wS2V5OiBzdHJpbmcsIGR5bmFtaWNWYWx1ZTogRHluYW1pY1Byb3BlcnR5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dEtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRWYWx1ZTogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IG0gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBtLnNldChwcm9wS2V5LCBkeW5hbWljVmFsdWUpO1xuICAgICAgICB0aGlzLmFkZFJ1bGUobmV3IFJ1bGUoTWV0YS50b0xpc3QoXG4gICAgICAgICAgICBuZXcgU2VsZWN0b3IoY29udGV4dEtleSwgY29udGV4dFZhbHVlKSksIG0sIE1ldGEuU3lzdGVtUnVsZVByaW9yaXR5KSk7XG4gICAgfVxuXG5cbiAgICByZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKHByb3BLZXk6IHN0cmluZywgZHluYW1pY1ZhbHVlOiBTdGF0aWNhbGx5UmVzb2x2YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRLZXk6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEZXJpdmVkVmFsdWUocHJvcEtleSwgbmV3IFN0YXRpY0R5bmFtaWNXcmFwcGVyKGR5bmFtaWNWYWx1ZSksIGNvbnRleHRLZXksXG4gICAgICAgICAgICBNZXRhLktleUFueSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoa2V5OiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGVyaXZlZFZhbHVlKFVJTWV0YS5LZXlMYWJlbCwgbmV3IExvY2FsaXplZExhYmVsU3RyaW5nKHRoaXMpLCBrZXksXG4gICAgICAgICAgICBVSU1ldGEuS2V5QW55KTtcbiAgICB9XG5cbiAgICBmaWVsZExpc3QoY29udGV4dDogQ29udGV4dCk6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbUxpc3QoY29udGV4dCwgVUlNZXRhLktleUZpZWxkLCBVSU1ldGEuWm9uZXNUTFJNQik7XG4gICAgfVxuXG4gICAgZmllbGRzQnlab25lcyhjb250ZXh0OiBDb250ZXh0KTogTWFwPHN0cmluZywgYW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNCeVpvbmVzKGNvbnRleHQsIFVJTWV0YS5LZXlGaWVsZCwgVUlNZXRhLlpvbmVzVExSTUIpO1xuICAgIH1cblxuICAgIGl0ZW1OYW1lc0J5Wm9uZXMoY29udGV4dDogQ29udGV4dCwga2V5OiBzdHJpbmcsIHpvbmVzOiBzdHJpbmdbXSk6IE1hcDxzdHJpbmcsIGFueT5cbiAgICB7XG4gICAgICAgIGxldCBpdGVtc0J5Wm9uZXM6IE1hcDxzdHJpbmcsIGFueT4gPSB0aGlzLml0ZW1zQnlab25lcyhjb250ZXh0LCBrZXksIHpvbmVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwSXRlbVByb3BzVG9OYW1lcyhpdGVtc0J5Wm9uZXMpO1xuICAgIH1cblxuICAgIG1hcEl0ZW1Qcm9wc1RvTmFtZXMoaXRlbXNCeVpvbmVzOiBNYXA8c3RyaW5nLCBhbnk+KTogTWFwPHN0cmluZywgYW55PlxuICAgIHtcbiAgICAgICAgbGV0IG5hbWVzQnlab25lczogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgICAgTWFwV3JhcHBlci5pdGVyYWJsZShpdGVtc0J5Wm9uZXMpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodmFsdWUpICYmIGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBJdGVtUHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPEl0ZW1Qcm9wZXJ0aWVzPml0ZW0pLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hbWVzQnlab25lcy5zZXQoa2V5LCBuYW1lcyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZXNCeVpvbmVzLnNldChrZXksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwSXRlbVByb3BzVG9OYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmFtZXNCeVpvbmVzO1xuICAgIH1cblxuICAgIHByZWRlY2Vzc29yTWFwKGNvbnRleHQ6IENvbnRleHQsIGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcmVkZWNlc3Nvcjogc3RyaW5nKTogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+PlxuICAgIHtcbiAgICAgICAgbGV0IGZpZWxkSW5mb3M6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiA9IHRoaXMuaXRlbVByb3BlcnRpZXMoY29udGV4dCwga2V5LCBmYWxzZSk7XG4gICAgICAgIGxldCBwcmVkZWNlc3NvcnM6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4gPSBNYXBXcmFwcGVyLmdyb3VwQnk8SXRlbVByb3BlcnRpZXM+KFxuICAgICAgICAgICAgZmllbGRJbmZvcywgKGl0ZW06IEl0ZW1Qcm9wZXJ0aWVzKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBwcmVkID0gaXRlbS5wcm9wZXJ0aWVzLmdldChVSU1ldGEuS2V5QWZ0ZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1ByZXNlbnQocHJlZCkgPyBwcmVkIDogZGVmYXVsdFByZWRlY2Vzc29yO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByZWRlY2Vzc29ycztcbiAgICB9XG5cbiAgICBpdGVtTGlzdChjb250ZXh0OiBDb250ZXh0LCBrZXk6IHN0cmluZywgem9uZXM6IHN0cmluZ1tdKTogQXJyYXk8SXRlbVByb3BlcnRpZXM+XG4gICAge1xuICAgICAgICBsZXQgcHJlZGVjZXNzb3JzOiBNYXA8c3RyaW5nLCBBcnJheTxJdGVtUHJvcGVydGllcz4+ID0gdGhpcy5wcmVkZWNlc3Nvck1hcChjb250ZXh0LCBrZXksXG4gICAgICAgICAgICB6b25lc1swXSk7XG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IHpvbmUgb2Ygem9uZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZVByZWNlc3NvcnMocHJlZGVjZXNzb3JzLCB6b25lLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaXNab25lUmVmZXJlbmNlKGtleTogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgLy8ga2V5cyBvZiB0aGUgZm9ybSAnejxOYW1lPicgYW5kICdmb28uYmFyLno8TmFtZT4nIGFyZSBjb25zaWRlcmVkIHpvbmUga2V5c1xuICAgICAgICBsZXQgbGFzdERvdCA9IGtleS5sYXN0SW5kZXhPZignLicpO1xuICAgICAgICBsZXQgc3VmZml4ID0gKGxhc3REb3QgPT09IC0xKSA/IGtleSA6IGtleS5zdWJzdHJpbmcobGFzdERvdCArIDEpO1xuICAgICAgICByZXR1cm4gKHN1ZmZpeC5sZW5ndGggPiAxKSAmJiAoc3VmZml4WzBdID09PSAneicpICYmIChcbiAgICAgICAgICAgIHN1ZmZpeFsxXS50b1VwcGVyQ2FzZSgpID09PSBzdWZmaXhbMV0gLy8gaXMgdXBwZXJjYXNlID9zXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgaXRlbXNCeVpvbmVzKGNvbnRleHQ6IENvbnRleHQsIHByb3BlcnR5OiBzdHJpbmcsIHpvbmVzOiBzdHJpbmdbXSk6IE1hcDxzdHJpbmcsIGFueT5cbiAgICB7XG4gICAgICAgIGxldCBwcmVkZWNlc3NvcnMgPSB0aGlzLnByZWRlY2Vzc29yTWFwKGNvbnRleHQsIHByb3BlcnR5LCB6b25lc1swXSk7XG4gICAgICAgIGxldCBieVpvbmUgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG5cbiAgICAgICAgTWFwV3JhcHBlci5pdGVyYWJsZShwcmVkZWNlc3NvcnMpLmZvckVhY2goKHZhbHVlLCB6b25lKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1pvbmVSZWZlcmVuY2Uoem9uZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdDogYW55W10gPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVQcmVjZXNzb3JzKHByZWRlY2Vzc29ycyxcbiAgICAgICAgICAgICAgICAgICAgem9uZSwgbGlzdCk7XG5cbiAgICAgICAgICAgICAgICBGaWVsZFBhdGguc2V0RmllbGRWYWx1ZShieVpvbmUsIHpvbmUsIGxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnlab25lO1xuICAgIH1cblxuICAgIC8vIHJlY3Vyc2l2ZSBkZWNlbnQgb2YgcHJlZGVjZXNzb3IgdHJlZS4uLlxuICAgIGFjY3VtdWxhdGVQcmVjZXNzb3JzKHByZWRlY2Vzc29yczogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+Piwga2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgaXRlbXM6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiA9IHByZWRlY2Vzc29ycy5nZXQoa2V5KTtcbiAgICAgICAgaWYgKGlzQmxhbmsoaXRlbXMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBMaXN0V3JhcHBlci5zb3J0PEl0ZW1Qcm9wZXJ0aWVzPihpdGVtcywgKG8xLCBvMikgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHIxID0gbzEucHJvcGVydGllcy5nZXQoVUlNZXRhLktleVJhbmspO1xuICAgICAgICAgICAgbGV0IHIyID0gbzIucHJvcGVydGllcy5nZXQoVUlNZXRhLktleVJhbmspO1xuXG4gICAgICAgICAgICBpZiAocjEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByMSA9IDEwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyMiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHIyID0gMTAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHIxID09PSByMikgPyAwIDogKHIxID09PSBudWxsKSA/IDEgOiAocjIgPT09IG51bGwpID8gLTEgOiAocjEgLSByMik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICghaXRlbS5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZVByZWNlc3NvcnMocHJlZGVjZXNzb3JzLCBpdGVtLm5hbWUsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgUGFyc2VyIHRvIGhhbmRsZSBkZWNscyBsaWtlICd6TGVmdCA9PiBsYXN0TmFtZSNyZXF1aXJlZCdcbiAgICAgKlxuICAgICAqL1xuICAgIGFkZFByZWRlY2Vzc29yUnVsZShpdGVtTmFtZTogc3RyaW5nLCBjb250ZXh0UHJlZHM6IEFycmF5PFNlbGVjdG9yPiwgcHJlZGVjZXNzb3I6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgdHJhaXRzOiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IG51bWJlcik6IFJ1bGVcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHByZWRlY2Vzc29yKSAmJiBpc0JsYW5rKHRyYWl0cykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGtleTogc3RyaW5nID0gdGhpcy5zY29wZUtleUZvclNlbGVjdG9yKGNvbnRleHRQcmVkcyk7XG4gICAgICAgIGlmIChpc0JsYW5rKGtleSkgfHwga2V5ID09PSBVSU1ldGEuS2V5Q2xhc3MpIHtcbiAgICAgICAgICAgIGtleSA9IFVJTWV0YS5LZXlGaWVsZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VsZWN0b3I6IEFycmF5PFNlbGVjdG9yPiA9IG5ldyBBcnJheTxTZWxlY3Rvcj4oKTtcbiAgICAgICAgTGlzdFdyYXBwZXIuYWRkQWxsPFNlbGVjdG9yPihzZWxlY3RvciwgY29udGV4dFByZWRzKTtcblxuICAgICAgICBzZWxlY3Rvci5wdXNoKG5ldyBTZWxlY3RvcihrZXksIGl0ZW1OYW1lKSk7XG4gICAgICAgIGxldCBwcm9wczogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChwcmVkZWNlc3NvcikpIHtcbiAgICAgICAgICAgIHByb3BzLnNldChVSU1ldGEuS2V5QWZ0ZXIsIHByZWRlY2Vzc29yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodHJhaXRzKSkge1xuICAgICAgICAgICAgcHJvcHMuc2V0KFVJTWV0YS5LZXlUcmFpdCwgdHJhaXRzKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcnVsZSA9IG5ldyBSdWxlKHNlbGVjdG9yLCBwcm9wcywgMCwgbGluZU51bWJlcik7XG4gICAgICAgIHRoaXMuYWRkUnVsZShydWxlKTtcbiAgICAgICAgcmV0dXJuIHJ1bGU7XG4gICAgfVxuXG4gICAgZmxhdHRlblZpc2libGUoZmllbGRzQnlab25lczogTWFwPHN0cmluZywgQXJyYXk8c3RyaW5nPj4sIHpvbmVMaXN0OiBzdHJpbmdbXSwga2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgY29udGV4dDogQ29udGV4dCk6IHN0cmluZ1tdXG4gICAge1xuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoZmllbGRzQnlab25lcykpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgem9uZSBvZiAgem9uZUxpc3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRzOiBzdHJpbmdbXSA9IGZpZWxkc0J5Wm9uZXMuZ2V0KHpvbmUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoZmllbGRzKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0KGtleSwgZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5ib29sZWFuUHJvcGVydHlGb3JLZXkoVUlNZXRhLktleVZpc2libGUsIGZhbHNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZGlzcGxheUtleUZvckNsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICAvLyBwZXJmb3JtYW5jZTogc2hvdWxkIHVzZSByZWdpc3RlckRlcml2ZWRWYWx1ZSgnLi4uJywgbmV3IENvbnRleHQuU3RhdGljRHluYW1pY1dyYXBwZXJcbiAgICAgICAgLy8gdG8gZ2V0IGNhY2hlZCByZXNvbHV0aW9uIGhlcmUuLi5cbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm5ld0NvbnRleHQoKTtcbiAgICAgICAgY29udGV4dC5zZXQoVUlNZXRhLktleUxheW91dCwgJ0xhYmVsRmllbGQnKTtcbiAgICAgICAgY29udGV4dC5zZXQoVUlNZXRhLktleUNsYXNzLCBjbGFzc05hbWUpO1xuICAgICAgICBsZXQgZmllbGRzOiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSB0aGlzLml0ZW1Qcm9wZXJ0aWVzKGNvbnRleHQsIFVJTWV0YS5LZXlGaWVsZCwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLmlzRW1wdHkoZmllbGRzKSA/ICckdG9TdHJpbmcnIDogZmllbGRzWzBdLm5hbWU7XG4gICAgfVxuXG5cbiAgICBkaXNwbGF5TGFiZWwoY2xhc3NOYW1lOiBzdHJpbmcsIHByb3BlcnRpZXNWYWx1ZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQocHJvcGVydGllc1ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXNWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5S2V5Rm9yQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9XG5cblxuICAgIGNyZWF0ZUxvY2FsaXplZFN0cmluZyhrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBzdHJpbmcpOiBMb2NhbGl6ZWRTdHJpbmdcbiAgICB7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5fY3VycmVudFJ1bGVTZXQpLFxuICAgICAgICAgICAgJ0F0dGVtcHQgdG8gY3JlYXRlIGxvY2FsaXplZCBzdHJpbmcgd2l0aG91dCBjdXJyZW50UnVsZVNldCBpbiBwbGFjZScpO1xuXG4gICAgICAgIHJldHVybiBuZXcgTG9jYWxpemVkU3RyaW5nKHRoaXMsIHRoaXMuX2N1cnJlbnRSdWxlU2V0LmZpbGVQYXRoLCBrZXksIGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuXG5cbiAgICBnZXQgcm91dGluZ1NlcnZpY2UoKTogUm91dGluZ1NlcnZpY2VcbiAgICB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHRoaXMuX2luamVjdG9yKSkgPyB0aGlzLl9pbmplY3Rvci5nZXQ8Um91dGluZ1NlcnZpY2U+KFJvdXRpbmdTZXJ2aWNlKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBlbnYoKTogRW52aXJvbm1lbnRcbiAgICB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHRoaXMuX2luamVjdG9yKSkgPyB0aGlzLl9pbmplY3Rvci5nZXQoRW52aXJvbm1lbnQpIDogbmV3IEVudmlyb25tZW50KCk7XG4gICAgfVxuXG5cbiAgICBnZXQgYXBwQ29uZmlnKCk6IEFwcENvbmZpZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQodGhpcy5faW5qZWN0b3IpKSA/IHRoaXMuX2luamVjdG9yLmdldChBcHBDb25maWcpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgZnJhbWV3b3JrIGxldmVsIGNvbXBvbmVudHMgYW5kIGxpc3RlbiBmb3IgdXNlciBsZXZlbCBydWxlcyB0byBiZSByZWdpc3RlcmVkLlxuICAgICAqIEFmdGVyIHdlIHJlZ2lzdGVyIHVzZXIgbGV2ZWwgcnVsZXMgaXQgd2lsbCBsb2FkIGFwcGxpY2F0aW9uLm9zcy5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSByZWdpc3RlckNvbXBvbmVudHMoc3lzUmVmZXJlbmNlczogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLmluamVjdG9yKSwgJ0Nhbm5vdCByZWdpc3RlciBjb21wb25lbnRzIHdpdGhvdXQgSW5qZWN0b3IgaW4gb3JkZXInICtcbiAgICAgICAgICAgICcgdG8gZ2V0IGFjY2VzcyB0byBDb21wb25lbnRSZWdpc3RyeSBTZXJ2aWNlJyk7XG5cbiAgICAgICAgYXNzZXJ0KHRoaXMuZW52LmluVGVzdCB8fCBpc1ByZXNlbnQodGhpcy5hcHBDb25maWcuZ2V0KFVJTWV0YS5BcHBDb25maWdVc2VyUnVsZXNQYXJhbSkpLFxuICAgICAgICAgICAgJ1VuYWJsZSB0byBpbml0aWFsaXplIE1ldGFVSSBhcyB1c2VyIHJ1bGVzIGFyZSBtaXNzaW5nLiBwbGVhc2UgdXNlOicgK1xuICAgICAgICAgICAgJyBtZXRhdWkucnVsZXMudXNlci1ydWxlcyBjb25maWd1cmF0aW9uIHBhcmFtJyk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWdpc3RyeSA9IHRoaXMuaW5qZWN0b3IuZ2V0KENvbXBvbmVudFJlZ2lzdHJ5KTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5KSkge1xuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5LnJlZ2lzdGVyVHlwZXMoc3lzUmVmZXJlbmNlcyk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5lbnYuaW5UZXN0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJSZWZlcmVuY2VzOiBhbnlbXSA9IHRoaXMuYXBwQ29uZmlnLmdldChVSU1ldGEuQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHVSdWxlIG9mIHVzZXJSZWZlcmVuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVnaXN0cnkucmVnaXN0ZXJUeXBlcyh1UnVsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFwcGxpY2F0aW9uUnVsZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmVudi5pblRlc3QpIHtcbiAgICAgICAgICAgIHdhcm4oJ1VJTWV0YS5yZWdpc3RlckNvbXBvbmVudHMoKSBObyBjb21wb25lbnRzIHdlcmUgcmVnaXN0ZXJlZCAhJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBKdXN0IG5lZWQgdG8gY2FsbCBpdCBkaWZmZXJlbnQgdGhhbiB0aGUgb3RoZXIgZmlyZUFjdGlvbiBhcyBJIGNhbiBub3QgZG8gYW55IG1ldGhvZFxuICAgICAqIG92ZXJsb2FkaW5nIGhlcmUuXG4gICAgICpcbiAgICAgKi9cbiAgICBmaXJlQWN0aW9uRnJvbVByb3BzKGFjdGlvbjogSXRlbVByb3BlcnRpZXMsIGNvbnRleHQ6IENvbnRleHQpOiB2b2lkXG4gICAge1xuICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgbGV0IGFjdGlvbkNhdGVnb3J5ID0gYWN0aW9uLnByb3BlcnRpZXMuZ2V0KE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnkpO1xuICAgICAgICBpZiAoaXNCbGFuayhhY3Rpb25DYXRlZ29yeSkpIHtcbiAgICAgICAgICAgIGFjdGlvbkNhdGVnb3J5ID0gT2JqZWN0TWV0YS5EZWZhdWx0QWN0aW9uQ2F0ZWdvcnk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zZXQoT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSwgYWN0aW9uQ2F0ZWdvcnkpO1xuICAgICAgICBjb250ZXh0LnNldChPYmplY3RNZXRhLktleUFjdGlvbiwgYWN0aW9uLm5hbWUpO1xuXG4gICAgICAgIHRoaXMuX2ZpcmVBY3Rpb24oY29udGV4dCwgZmFsc2UpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgfVxuXG4gICAgZmlyZUFjdGlvbihjb250ZXh0OiBVSUNvbnRleHQsIHdpdGhCYWNrQWN0aW9uOiBib29sZWFuID0gZmFsc2UpOiB2b2lkXG4gICAge1xuICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgdGhpcy5fZmlyZUFjdGlvbihjb250ZXh0LCB3aXRoQmFja0FjdGlvbik7XG4gICAgICAgIGNvbnRleHQucG9wKCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9maXJlQWN0aW9uKGNvbnRleHQ6IENvbnRleHQsIHdpdGhCYWNrQWN0aW9uOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGFjdGlvblJlc3VsdHMgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KCdhY3Rpb25SZXN1bHRzJyk7XG4gICAgICAgIGlmIChpc0JsYW5rKGFjdGlvblJlc3VsdHMpIHx8ICF0aGlzLmlzUm91dGUoYWN0aW9uUmVzdWx0cykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hdmlhdGVUb1BhZ2UoY29udGV4dCwgYWN0aW9uUmVzdWx0cywgd2l0aEJhY2tBY3Rpb24pO1xuICAgIH1cblxuICAgIG5hdmlhdGVUb1BhZ2UoY29udGV4dDogQ29udGV4dCwgcm91dGU6IGFueSwgd2l0aEJhY2tBY3Rpb246IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgcGFyYW1zID0gdGhpcy5wcmVwYXJlUm91dGUoY29udGV4dCwgd2l0aEJhY2tBY3Rpb24pO1xuXG4gICAgICAgIGxldCB1aUNvbnRleDogVUlDb250ZXh0ID0gPFVJQ29udGV4dD4gY29udGV4dDtcbiAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5uYXZpZ2F0ZVdpdGhSb3V0ZShyb3V0ZSwgcGFyYW1zLCB1aUNvbnRleC5vYmplY3QpO1xuICAgIH1cblxuXG4gICAgcHJlcGFyZVJvdXRlKGNvbnRleHQ6IENvbnRleHQsIHdpdGhCYWNrQWN0aW9uOiBib29sZWFuKTogYW55XG4gICAge1xuICAgICAgICBsZXQgcGFyYW1zID0ge307XG4gICAgICAgIGxldCBwYWdlQmluZGluZ3MgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KCdwYWdlQmluZGluZ3MnKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChwYWdlQmluZGluZ3MpKSB7XG4gICAgICAgICAgICBwYWdlQmluZGluZ3MuZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKGsgIT09IE9iamVjdE1ldGEuS2V5T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PnBhcmFtcylba10gPSBjb250ZXh0LnJlc29sdmVWYWx1ZSh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQod2l0aEJhY2tBY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgKDxhbnk+cGFyYW1zKVsnYiddID0gd2l0aEJhY2tBY3Rpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG5cbiAgICBwcmVwYXJlUm91dGVGb3JDb21wb25lbnQoY29tcG9uZW50OiBhbnksIGNvbnRleHQ6IENvbnRleHQsIHdpdGhCYWNrQWN0aW9uOiBib29sZWFuKTogYW55XG4gICAge1xuICAgICAgICBsZXQgcGFyYW1zID0ge307XG4gICAgICAgIGxldCBwYWdlQmluZGluZ3MgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KCdwYWdlQmluZGluZ3MnKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChwYWdlQmluZGluZ3MpKSB7XG4gICAgICAgICAgICBwYWdlQmluZGluZ3MuZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50W2tdID0gdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cblxuICAgIGdvdG9Nb2R1bGUobW9kdWxlOiBJdGVtUHJvcGVydGllcywgYWN0aXZhdGVkUGF0aD86IHN0cmluZyk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgdGhpcy5lbnYuZGVsZXRlVmFsdWUoQUNUSVZFX0NOVFgpO1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubmV3Q29udGV4dCgpO1xuXG5cbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIGNvbnRleHQuc2V0KFVJTWV0YS5LZXlNb2R1bGUsIG1vZHVsZS5uYW1lKTtcbiAgICAgICAgbGV0IHBhZ2VOYW1lID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5SG9tZVBhZ2UpO1xuXG5cbiAgICAgICAgbGV0IHJvdXRlID0gdGhpcy5yb3V0aW5nU2VydmljZS5yb3V0ZUZvclBhZ2UocGFnZU5hbWUsIG1vZHVsZS5uYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBhY3RpdmF0ZWRQYXRoKTtcbiAgICAgICAgaWYgKGFjdGl2YXRlZFBhdGggPT09ICcvJykge1xuICAgICAgICAgICAgYWN0aXZhdGVkUGF0aCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXRoID0gYCR7YWN0aXZhdGVkUGF0aH0vJHtyb3V0ZS5wYXRofWA7XG5cbiAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMucHJlcGFyZVJvdXRlKGNvbnRleHQsIG51bGwpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UubmF2aWdhdGUoW3BhdGgsIHBhcmFtc10sIHtza2lwTG9jYXRpb25DaGFuZ2U6IHRydWV9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzUm91dGUoYWN0aW9uUmVzdWx0OiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNTdHJpbmdNYXAoYWN0aW9uUmVzdWx0KSAmJiBpc1ByZXNlbnQoYWN0aW9uUmVzdWx0WydwYXRoJ10pO1xuXG4gICAgfVxuXG4gICAgY29tcFBhZ2VXaXRoTmFtZShuYW1lOiBzdHJpbmcpOiBUeXBlPGFueT5cbiAgICB7XG4gICAgICAgIGxldCBjdXJyVHlwZSA9IHRoaXMuY29tcG9uZW50UmVnaXN0cnkubmFtZVRvVHlwZS5nZXQobmFtZSk7XG4gICAgICAgIGlmIChpc0JsYW5rKGN1cnJUeXBlKSkge1xuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCBuYW1lICsgJyBjb21wb25lbnQgZG9lcyBub3QgZXhpc3RzLiBDcmVhdGUgRHVtbXkgQ29tcG9uZW50IGluc3RlYWQgb2YnICtcbiAgICAgICAgICAgICAgICAnIHRocm93aW5nIHRoaXMgZXJyb3InKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VyclR5cGU7XG4gICAgfVxuXG5cbiAgICAvLyBjYWxsZXIgbXVzdCBwdXNoL3BvcCFcbiAgICBhY3Rpb25zQnlDYXRlZ29yeShjb250ZXh0OiBDb250ZXh0LCByZXN1bHQ6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4sXG4gICAgICAgICAgICAgICAgICAgICAgem9uZXM6IHN0cmluZ1tdKTogQXJyYXk8SXRlbVByb3BlcnRpZXM+XG4gICAge1xuICAgICAgICBsZXQgY2F0TmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGxldCBhY3Rpb25DYXRlZ29yaWVzID0gdGhpcy5pdGVtTGlzdChjb250ZXh0LCBPYmplY3RNZXRhLktleUFjdGlvbkNhdGVnb3J5LCB6b25lcyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChhY3Rpb25DYXRlZ29yaWVzKSkge1xuICAgICAgICAgICAgYWN0aW9uQ2F0ZWdvcmllcy5mb3JFYWNoKChpdGVtOiBJdGVtUHJvcGVydGllcykgPT4gY2F0TmFtZXMucHVzaChpdGVtLm5hbWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkQWN0aW9uc0ZvckNhdGVnb3JpZXMoY29udGV4dCwgcmVzdWx0LCBjYXROYW1lcyk7XG4gICAgICAgIHJldHVybiBhY3Rpb25DYXRlZ29yaWVzO1xuICAgIH1cblxuICAgIGFkZEFjdGlvbnNGb3JDYXRlZ29yaWVzKGNvbnRleHQ6IENvbnRleHQsIHJlc3VsdDogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXROYW1lczogc3RyaW5nW10pOiB2b2lkXG4gICAge1xuICAgICAgICBmb3IgKGxldCBjYXQgb2YgY2F0TmFtZXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgaWYgKGNhdCAhPT0gT2JqZWN0TWV0YS5EZWZhdWx0QWN0aW9uQ2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNldChPYmplY3RNZXRhLktleUFjdGlvbkNhdGVnb3J5LCBjYXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RBY3Rpb25zQnlDYXRlZ29yeShjb250ZXh0LCByZXN1bHQsIGNhdCk7XG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGNvbGxlY3RBY3Rpb25zQnlDYXRlZ29yeShjb250ZXh0OiBDb250ZXh0LCByZXN1bHQ6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldENhdDogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGFjdGlvbkluZm9zOiBJdGVtUHJvcGVydGllc1tdID0gdGhpcy5pdGVtUHJvcGVydGllcyhjb250ZXh0LCBPYmplY3RNZXRhLktleUFjdGlvbixcbiAgICAgICAgICAgIHRydWUpO1xuICAgICAgICBmb3IgKGxldCBhY3Rpb25JbmZvIG9mIGFjdGlvbkluZm9zKSB7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0KE9iamVjdE1ldGEuS2V5QWN0aW9uLCBhY3Rpb25JbmZvLm5hbWUpO1xuXG4gICAgICAgICAgICBsZXQgdmlzaWJsZSA9IGNvbnRleHQuYm9vbGVhblByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5VmlzaWJsZSwgdHJ1ZSk7XG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeSA9IGFjdGlvbkluZm8ucHJvcGVydGllcy5nZXQoT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcnkgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeSA9IE9iamVjdE1ldGEuRGVmYXVsdEFjdGlvbkNhdGVnb3J5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Q2F0ICE9PSBjYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZm9yQ2F0ZWdvcnk6IEl0ZW1Qcm9wZXJ0aWVzW10gPSByZXN1bHQuZ2V0KGNhdGVnb3J5KTtcbiAgICAgICAgICAgICAgICBpZiAoaXNCbGFuayhmb3JDYXRlZ29yeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yQ2F0ZWdvcnkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNldChjYXRlZ29yeSwgZm9yQ2F0ZWdvcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3JDYXRlZ29yeS5wdXNoKGFjdGlvbkluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb21wdXRlTW9kdWxlSW5mbyhjb250ZXh0OiBDb250ZXh0ID0gdGhpcy5uZXdDb250ZXh0KCksXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tWaXNpYmlsaXR5OiBib29sZWFuID0gdHJ1ZSk6IE1vZHVsZUluZm9cbiAgICB7XG5cbiAgICAgICAgbGV0IG1vZHVsZUluZm86IE1vZHVsZUluZm8gPSBuZXcgTW9kdWxlSW5mbygpO1xuICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZXMgPSBbXTtcblxuICAgICAgICBsZXQgYWxsTW9kdWxlUHJvcHM6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiA9IHRoaXMuaXRlbUxpc3QoY29udGV4dCwgVUlNZXRhLktleU1vZHVsZSxcbiAgICAgICAgICAgIFVJTWV0YS5BY3Rpb25ab25lcyk7XG4gICAgICAgIG1vZHVsZUluZm8ubW9kdWxlTmFtZXMgPSBbXTtcbiAgICAgICAgbW9kdWxlSW5mby5tb2R1bGVCeU5hbWVzID0gbmV3IE1hcDxzdHJpbmcsIEl0ZW1Qcm9wZXJ0aWVzPigpO1xuXG4gICAgICAgIGZvciAobGV0IG1vZHVsZSBvZiBhbGxNb2R1bGVQcm9wcykge1xuXG4gICAgICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0KFVJTWV0YS5LZXlNb2R1bGUsIG1vZHVsZS5uYW1lKTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrVmlzaWJpbGl0eSAmJiAhY29udGV4dC5ib29sZWFuUHJvcGVydHlGb3JLZXkoVUlNZXRhLktleVZpc2libGUsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5wb3AoKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9kdWxlSW5mby5tb2R1bGVOYW1lcy5wdXNoKG1vZHVsZS5uYW1lKTtcblxuICAgICAgICAgICAgLy8gLy8gdG9kbzogY3JlYXRlIHR5cGVzY3JpcHQgYW5vdGF0aW9uXG4gICAgICAgICAgICAvLyBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgIC8vIGNvbnRleHQuc2V0KFwiaG9tZUZvckNsYXNzZXNcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAvLyBsZXQgaG9tZUNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLml0ZW1OYW1lcyhjb250ZXh0LCBVSU1ldGEuS2V5Q2xhc3MpO1xuICAgICAgICAgICAgLy8gY29udGV4dC5wb3AoKTtcblxuXG4gICAgICAgICAgICBsZXQgbW9kUHJvcGVydGllcyA9IG5ldyBJdGVtUHJvcGVydGllcyhtb2R1bGUubmFtZSwgY29udGV4dC5hbGxQcm9wZXJ0aWVzKCksIGZhbHNlKTtcbiAgICAgICAgICAgIG1vZHVsZUluZm8ubW9kdWxlcy5wdXNoKG1vZFByb3BlcnRpZXMpO1xuXG4gICAgICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZUJ5TmFtZXMuc2V0KG1vZHVsZS5uYW1lLCBtb2RQcm9wZXJ0aWVzKTtcblxuICAgICAgICAgICAgY29udGV4dC5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5TW9kdWxlLCBtb2R1bGVJbmZvLm1vZHVsZU5hbWVzKTtcbiAgICAgICAgbW9kdWxlSW5mby5hY3Rpb25zQnlDYXRlZ29yeSA9IG5ldyBNYXA8c3RyaW5nLCBBcnJheTxJdGVtUHJvcGVydGllcz4+KCk7XG4gICAgICAgIG1vZHVsZUluZm8uYWN0aW9uQ2F0ZWdvcmllcyA9IHRoaXMuYWN0aW9uc0J5Q2F0ZWdvcnkoY29udGV4dCwgbW9kdWxlSW5mby5hY3Rpb25zQnlDYXRlZ29yeSxcbiAgICAgICAgICAgIFVJTWV0YS5Nb2R1bGVBY3Rpb25ab25lcyk7XG4gICAgICAgIGNvbnRleHQucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIG1vZHVsZUluZm87XG4gICAgfVxuXG5cbiAgICBjdXJyZW50TW9kdWxlTGFiZWwobW9kdWxlTmFtZTogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0ID0gdGhpcy5uZXdDb250ZXh0KCkpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5TW9kdWxlLCBtb2R1bGVOYW1lKTtcbiAgICAgICAgbGV0IGxhYmVsOiBzdHJpbmcgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlMYWJlbCk7XG4gICAgICAgIGNvbnRleHQucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTW9kdWxlSW5mb1xue1xuICAgIG1vZHVsZXM6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPjtcbiAgICBtb2R1bGVOYW1lczogQXJyYXk8c3RyaW5nPjtcbiAgICBtb2R1bGVCeU5hbWVzOiBNYXA8c3RyaW5nLCBJdGVtUHJvcGVydGllcz47XG4gICAgYWN0aW9uQ2F0ZWdvcmllczogQXJyYXk8SXRlbVByb3BlcnRpZXM+O1xuICAgIGFjdGlvbnNCeUNhdGVnb3J5OiBNYXA8c3RyaW5nLCBBcnJheTxJdGVtUHJvcGVydGllcz4+O1xufVxuXG5cbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZWRTdHJpbmcgZXh0ZW5kcyBEeW5hbWljUHJvcGVydHlWYWx1ZVxue1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIG1ldGE6IFVJTWV0YSwgcHJvdGVjdGVkIF9tb2R1bGU6IHN0cmluZywgcHJvdGVjdGVkICBfa2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9kZWZhdWx0VmFsdWU6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueVxuICAgIHtcblxuICAgICAgICBsZXQgbG9jYWxpemVkU3RyaW5nOiBhbnk7XG4gICAgICAgIC8vIGxldCBjbGF6eiA9IGNvbnRleHQudmFsdWVzLmdldCgnY2xhc3MnKTtcbiAgICAgICAgLy8gaWYgKGlzUHJlc2VudCh0aGlzLl9rZXkpICYmIGlzUHJlc2VudCh0aGlzLm1ldGEuaTE4blNlcnZpY2UpKSB7XG4gICAgICAgIC8vICAgICBsZXQgaTE4bktleSA9IGNsYXp6ICsgJy4nICsgdGhpcy5fa2V5O1xuICAgICAgICAvLyAgICAgbG9jYWxpemVkU3RyaW5nID0gdGhpcy5tZXRhLmkxOG5TZXJ2aWNlLmluc3RhbnQoaTE4bktleSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyB3aGVuIGl0IHJldHVybiB0aGUgc2FtZSBzdHJpbmcgbW9zdCBsaWtlbHkgaXQgbWVhbnMgdGhlcmUgaXMgbm9cbiAgICAgICAgLy8gICAgIC8vIHRyYW5zbGF0aW9uIHNvIGRlZmF1bHQgaXQgdG8gbnVsbFxuICAgICAgICAvLyAgICAgbG9jYWxpemVkU3RyaW5nID0gKGxvY2FsaXplZFN0cmluZyA9PT0gaTE4bktleSkgPyBudWxsIDogbG9jYWxpemVkU3RyaW5nO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gaWYgKGlzQmxhbmsobG9jYWxpemVkU3RyaW5nKSB8fCB0aGlzLl9rZXkgPT09IE9iamVjdE1ldGEuS2V5RmllbGQpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VmFsdWU7XG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiAnTG9jYWxlZFN0cmluZzogeycgKyB0aGlzLl9rZXkgKyAnIC0gJyArIHRoaXMuX2RlZmF1bHRWYWx1ZSArICcgfSc7XG4gICAgfVxufVxuXG5jbGFzcyBMb2NhbGl6ZWRMYWJlbFN0cmluZyBleHRlbmRzIExvY2FsaXplZFN0cmluZyBpbXBsZW1lbnRzIFByb3BlcnR5TWFwQXdha2luZ1xue1xuICAgIHN0YXRpYyBEZWZhdWx0TW9kdWxlID0gJ2RlZmF1bHQnO1xuICAgIHByb3BlcnR5QXdha2luZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbWV0YTogVUlNZXRhKVxuICAgIHtcbiAgICAgICAgc3VwZXIobWV0YSwgTG9jYWxpemVkTGFiZWxTdHJpbmcuRGVmYXVsdE1vZHVsZSwgbnVsbCwgbnVsbCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fa2V5KSkge1xuICAgICAgICAgICAgbGV0IHNjb3BlS2V5OiBzdHJpbmcgPSBjb250ZXh0LnZhbHVlcy5nZXQoTWV0YS5TY29wZUtleSk7XG4gICAgICAgICAgICBsZXQgc2NvcGVWYWw6IHN0cmluZyA9IGNvbnRleHQudmFsdWVzLmdldChzY29wZUtleSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRWYWx1ZSA9IFVJTWV0YS5kZWZhdWx0TGFiZWxGb3JJZGVudGlmaWVyKHNjb3BlVmFsKTtcblxuICAgICAgICAgICAgdGhpcy5fa2V5ID0gc2NvcGVLZXk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLmV2YWx1YXRlKGNvbnRleHQpO1xuICAgIH1cblxuICAgIGF3YWtlRm9yUHJvcGVydHlNYXAobWFwOiBQcm9wZXJ0eU1hcCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMb2NhbGl6ZWRMYWJlbFN0cmluZyh0aGlzLm1ldGEpO1xuICAgIH1cblxufVxuXG5cbmNsYXNzIFByb3BGaWVsZHNCeVpvbmVSZXNvbHZlciBleHRlbmRzIFN0YXRpY2FsbHlSZXNvbHZhYmxlXG57XG5cblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBtID0gKDxVSU1ldGE+Y29udGV4dC5tZXRhKS5pdGVtTmFtZXNCeVpvbmVzKGNvbnRleHQsIFVJTWV0YS5LZXlGaWVsZCxcbiAgICAgICAgICAgICg8VUlNZXRhPmNvbnRleHQubWV0YSkuem9uZXMoY29udGV4dCkpO1xuICAgICAgICBsZXQgem9uZVBhdGggPSAoPFVJTWV0YT5jb250ZXh0Lm1ldGEpLnpvbmVQYXRoKGNvbnRleHQpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHpvbmVQYXRoKSkge1xuXG5cbiAgICAgICAgICAgIG0gPSA8TWFwPHN0cmluZywgYW55Pj4gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUobSwgem9uZVBhdGgpO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsobSkpIHtcbiAgICAgICAgICAgICAgICBtID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG59XG5cbmNsYXNzIFByb3BGaWVsZFByb3BlcnR5TGlzdFJlc29sdmVyIGV4dGVuZHMgU3RhdGljYWxseVJlc29sdmFibGVcbntcblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiAoPFVJTWV0YT5jb250ZXh0Lm1ldGEpLmZpZWxkTGlzdChjb250ZXh0KTtcbiAgICB9XG59XG5cbmNsYXNzIFByb3BMYXlvdXRzQnlab25lUmVzb2x2ZXIgZXh0ZW5kcyBTdGF0aWNhbGx5UmVzb2x2YWJsZVxue1xuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuICg8VUlNZXRhPmNvbnRleHQubWV0YSkuaXRlbU5hbWVzQnlab25lcyhjb250ZXh0LCBVSU1ldGEuS2V5TGF5b3V0LFxuICAgICAgICAgICAgKDxVSU1ldGE+Y29udGV4dC5tZXRhKS56b25lcyhjb250ZXh0KSk7XG4gICAgfVxufVxuXG5cbmNsYXNzIF9EZWZhdWx0TGFiZWxHZW5lcmF0b3IgZXh0ZW5kcyBTdGF0aWNhbGx5UmVzb2x2YWJsZVxue1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9rZXk6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IGZpZWxkTmFtZSA9IGNvbnRleHQudmFsdWVzLmdldCh0aGlzLl9rZXkpO1xuXG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KGZpZWxkTmFtZSkgJiYgaXNTdHJpbmcoZmllbGROYW1lKSkgP1xuICAgICAgICAgICAgVUlNZXRhLmRlZmF1bHRMYWJlbEZvcklkZW50aWZpZXIoZmllbGROYW1lKSA6IG51bGw7XG4gICAgfVxufVxuXG4vKipcbiAqIExvYWQgVXNlciBkZWZpbmVkIG1ldGEgZGF0YS4gVGhpcyBjbGFzcyBpcyB0cmlnZ2VyZWQgYXMgc29vbiBhcyB3ZSBjcmVhdGUgYSBjb250ZXh0IGFuZFxuICogcGFzcyBhbiBvYmplY3QgaW50byBpdC4gQmFzZWQgb24gdGhlIG9iamVjdCB3ZSBub3RpZnkgZGlmZmVyZW50IE9ic2VydmVycyBwYXNzaW5nIG5hbWVcbiAqIG9mIHRoZSBjbGFzcyBhbmQgaGVyZSB3ZSBzZWFyY2ggaWYgd2UgaGF2ZSBhbnkgUnVsZXMgYXZhaWxhYmxlIGZvciBjdXJyZW50IGNsYXNzTmFtZSBhbmRcbiAqIHRyeSB0byBsb2FkIHRoZSBSdWxlLlxuICovXG5jbGFzcyBVc2VyTWV0YURhdGFQcm92aWRlciBpbXBsZW1lbnRzIFZhbHVlUXVlcmllZE9ic2VydmVyXG57XG5cbiAgICBub3RpZnkobWV0YTogTWV0YSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgYVJ1bGVzOiBBcnJheTxKc29uUnVsZT47XG4gICAgICAgIGxldCB1aU1ldGE6IFVJTWV0YSA9IDxVSU1ldGE+IG1ldGE7XG5cbiAgICAgICAgaWYgKHVpTWV0YS5fdGVzdFJ1bGVzLmhhcyh2YWx1ZSArICdSdWxlJykpIHtcbiAgICAgICAgICAgIC8vIHNpbmNlIHdlIGFyZSBpbiBkZXZlbG9wbWVudCBtb2RlIGFuZCB0ZXN0IG1vZGUgaXMgb24gd2UgY2FuIGNoZWNrIGV4dHJhIHJlcG9zaXRvcnlcbiAgICAgICAgICAgIC8vIHVzZWQgYnkgdGVzdHMsIHdlIG5lZWQgdG8gY2hlY2sgaWYgd2UgYXJlIG5vdCBydW5uaW5nIHVuaXR0ZXN0IGFuZCBhIGNsYXNzIGlzIG5vdFxuICAgICAgICAgICAgLy8gYXBwbGljYXRpb24gZGVmaW5lZCBidXQgdW5pdHRlc3QgZGVmaW5lZCBydWxlXG5cbiAgICAgICAgICAgIGlmICh1aU1ldGEuX3Rlc3RSdWxlcy5oYXModmFsdWUgKyAnUnVsZScpICYmXG4gICAgICAgICAgICAgICAgaXNQcmVzZW50KHVpTWV0YS5fdGVzdFJ1bGVzLmdldCh2YWx1ZSArICdSdWxlJykub3NzKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhUnVsZXMgPSB1aU1ldGEuX3Rlc3RSdWxlcy5nZXQodmFsdWUgKyAnUnVsZScpLm9zcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGEubG9hZFVzZXJSdWxlKGFSdWxlcywgdmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHVpTWV0YS5hcHBDb25maWcpICYmXG4gICAgICAgICAgICB1aU1ldGEuYXBwQ29uZmlnLmdldChVSU1ldGEuQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0pKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIGxldCB1c2VyUmVmZXJlbmNlczogYW55W10gPSB1aU1ldGEuYXBwQ29uZmlnLmdldChVSU1ldGEuQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0pO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHVzZXJSZWZlcmVuY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh1c2VyUmVmZXJlbmNlc1tpXVt2YWx1ZSArICdSdWxlJ10pICYmXG4gICAgICAgICAgICAgICAgICAgIGlzUHJlc2VudCh1c2VyUmVmZXJlbmNlc1tpXVt2YWx1ZSArICdSdWxlJ10ub3NzKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFSdWxlcyA9IHVzZXJSZWZlcmVuY2VzW2ldW3ZhbHVlICsgJ1J1bGUnXS5vc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWV0YS5sb2FkVXNlclJ1bGUoYVJ1bGVzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==