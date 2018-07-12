/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ lastDot = fieldName.lastIndexOf('.');
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
        var /** @type {?} */ zones = context.propertyForKey('zones');
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
        var /** @type {?} */ zonePath;
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
        var /** @type {?} */ aRules;
        var /** @type {?} */ userReferences;
        var /** @type {?} */ appRuleFiles = ['Application'];
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
                var /** @type {?} */ rule = ruleFile + 'Rule';
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
                    for (var /** @type {?} */ i in userReferences) {
                        var /** @type {?} */ userRule = userReferences[i];
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
        var /** @type {?} */ m = new Map();
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
        var /** @type {?} */ itemsByZones = this.itemsByZones(context, key, zones);
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
        var /** @type {?} */ namesByZones = new Map();
        MapWrapper.iterable(itemsByZones).forEach(function (value, key) {
            if (isPresent(value) && isArray(value)) {
                var /** @type {?} */ names = [];
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
        var /** @type {?} */ fieldInfos = this.itemProperties(context, key, false);
        var /** @type {?} */ predecessors = MapWrapper.groupBy(fieldInfos, function (item) {
            var /** @type {?} */ pred = item.properties.get(UIMeta.KeyAfter);
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
        var /** @type {?} */ predecessors = this.predecessorMap(context, key, zones[0]);
        var /** @type {?} */ result = [];
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
        // keys of the form 'z<Name>' and 'foo.bar.z<Name>' are considered zone keys
        var /** @type {?} */ lastDot = key.lastIndexOf('.');
        var /** @type {?} */ suffix = (lastDot === -1) ? key : key.substring(lastDot + 1);
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
        var /** @type {?} */ predecessors = this.predecessorMap(context, property, zones[0]);
        var /** @type {?} */ byZone = new Map();
        MapWrapper.iterable(predecessors).forEach(function (value, zone) {
            if (_this.isZoneReference(zone)) {
                var /** @type {?} */ list = [];
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
        var /** @type {?} */ items = predecessors.get(key);
        if (isBlank(items)) {
            return;
        }
        ListWrapper.sort(items, function (o1, o2) {
            var /** @type {?} */ r1 = o1.properties.get(UIMeta.KeyRank);
            var /** @type {?} */ r2 = o2.properties.get(UIMeta.KeyRank);
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
        var /** @type {?} */ key = this.scopeKeyForSelector(contextPreds);
        if (isBlank(key) || key === UIMeta.KeyClass) {
            key = UIMeta.KeyField;
        }
        var /** @type {?} */ selector = new Array();
        ListWrapper.addAll(selector, contextPreds);
        selector.push(new Selector(key, itemName));
        var /** @type {?} */ props = new Map();
        if (isPresent(predecessor)) {
            props.set(UIMeta.KeyAfter, predecessor);
        }
        if (isPresent(traits)) {
            props.set(UIMeta.KeyTrait, traits);
        }
        var /** @type {?} */ rule = new Rule(selector, props, 0, lineNumber);
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
        var /** @type {?} */ result = [];
        if (isPresent(fieldsByZones)) {
            try {
                for (var zoneList_1 = tslib_1.__values(zoneList), zoneList_1_1 = zoneList_1.next(); !zoneList_1_1.done; zoneList_1_1 = zoneList_1.next()) {
                    var zone = zoneList_1_1.value;
                    var /** @type {?} */ fields = fieldsByZones.get(zone);
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
        // performance: should use registerDerivedValue('...', new Context.StaticDynamicWrapper
        // to get cached resolution here...
        var /** @type {?} */ context = this.newContext();
        context.set(UIMeta.KeyLayout, 'LabelField');
        context.set(UIMeta.KeyClass, className);
        var /** @type {?} */ fields = this.itemProperties(context, UIMeta.KeyField, true);
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
            return (isPresent(this._injector)) ? this._injector.get(RoutingService) : null;
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
                var /** @type {?} */ userReferences = this.appConfig.get(UIMeta.AppConfigUserRulesParam);
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
        var /** @type {?} */ actionCategory = action.properties.get(ObjectMeta.KeyActionCategory);
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
        var /** @type {?} */ actionResults = context.propertyForKey('actionResults');
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
        var /** @type {?} */ params = this.prepareRoute(context, withBackAction);
        var /** @type {?} */ uiContex = /** @type {?} */ (context);
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
        var /** @type {?} */ params = {};
        var /** @type {?} */ pageBindings = context.propertyForKey('pageBindings');
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
        var /** @type {?} */ params = {};
        var /** @type {?} */ pageBindings = context.propertyForKey('pageBindings');
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
        var /** @type {?} */ context = this.newContext();
        context.push();
        context.set(UIMeta.KeyModule, module.name);
        var /** @type {?} */ pageName = context.propertyForKey(UIMeta.KeyHomePage);
        var /** @type {?} */ route = this.routingService.routeForPage(pageName, module.name.toLowerCase(), activatedPath);
        if (activatedPath === '/') {
            activatedPath = '';
        }
        var /** @type {?} */ path = activatedPath + "/" + route.path;
        var /** @type {?} */ params = this.prepareRoute(context, null);
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
        var /** @type {?} */ currType = this.componentRegistry.nameToType.get(name);
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
        var /** @type {?} */ catNames = [];
        var /** @type {?} */ actionCategories = this.itemList(context, ObjectMeta.KeyActionCategory, zones);
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
        var /** @type {?} */ actionInfos = this.itemProperties(context, ObjectMeta.KeyAction, true);
        try {
            for (var actionInfos_1 = tslib_1.__values(actionInfos), actionInfos_1_1 = actionInfos_1.next(); !actionInfos_1_1.done; actionInfos_1_1 = actionInfos_1.next()) {
                var actionInfo = actionInfos_1_1.value;
                context.push();
                context.set(ObjectMeta.KeyAction, actionInfo.name);
                var /** @type {?} */ visible = context.booleanPropertyForKey(ObjectMeta.KeyVisible, true);
                context.pop();
                if (visible) {
                    var /** @type {?} */ category = actionInfo.properties.get(ObjectMeta.KeyActionCategory);
                    if (category == null) {
                        category = ObjectMeta.DefaultActionCategory;
                    }
                    if (targetCat !== category) {
                        continue;
                    }
                    var /** @type {?} */ forCategory = result.get(category);
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
        var /** @type {?} */ moduleInfo = new ModuleInfo();
        moduleInfo.modules = [];
        var /** @type {?} */ allModuleProps = this.itemList(context, UIMeta.KeyModule, UIMeta.ActionZones);
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
                // // todo: create typescript anotation
                // context.push();
                // context.set("homeForClasses", true);
                // let homeClasses: Array<string> = this.itemNames(context, UIMeta.KeyClass);
                // context.pop();
                var /** @type {?} */ modProperties = new ItemProperties(module.name, context.allProperties(), false);
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
        var /** @type {?} */ label = context.propertyForKey(UIMeta.KeyLabel);
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
var ModuleInfo = /** @class */ (function () {
    function ModuleInfo() {
    }
    return ModuleInfo;
}());
export { ModuleInfo };
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
        var /** @type {?} */ localizedString;
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
            var /** @type {?} */ scopeKey = context.values.get(Meta.ScopeKey);
            var /** @type {?} */ scopeVal = context.values.get(scopeKey);
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
function LocalizedLabelString_tsickle_Closure_declarations() {
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
        var /** @type {?} */ m = (/** @type {?} */ (context.meta)).itemNamesByZones(context, UIMeta.KeyField, (/** @type {?} */ (context.meta)).zones(context));
        var /** @type {?} */ zonePath = (/** @type {?} */ (context.meta)).zonePath(context);
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
        var /** @type {?} */ fieldName = context.values.get(this._key);
        return (isPresent(fieldName) && isString(fieldName)) ?
            UIMeta.defaultLabelForIdentifier(fieldName) : null;
    };
    return _DefaultLabelGenerator;
}(StaticallyResolvable));
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
        var /** @type {?} */ aRules;
        var /** @type {?} */ uiMeta = /** @type {?} */ (meta);
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
            var /** @type {?} */ userReferences = uiMeta.appConfig.get(UIMeta.AppConfigUserRulesParam);
            for (var /** @type {?} */ i in userReferences) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWltZXRhLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsiY29yZS91aW1ldGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDUCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFdBQVcsRUFDWCxXQUFXLEVBQ1gsVUFBVSxFQUNWLGNBQWMsRUFDZCxJQUFJLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsSUFBSSxFQUdKLGtCQUFrQixFQUVyQixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQVUsU0FBUyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRyxPQUFPLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUV0QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHVDQUF1QyxDQUFDOzs7Ozs7Ozs7O0lBYXRDLGtDQUFVOztvQkF3RTlCLGlCQUFPOzs7O1FBTVAsSUFBSSxDQUFDO1lBQ0QsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1QixLQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxD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QUMsQ0FBQyxDQUFDO1lBRXZELHFCQUFJLGNBQWMsR0FBVSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUVqRixHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7b0JBQzVDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkQsTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO2lCQUNsRDthQUNKO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDcEM7S0FDSjsrQkF2K0JMO0lBeStCQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBcHBDb25maWcsXG4gICAgYXNzZXJ0LFxuICAgIGRlY2FtZWxpemUsXG4gICAgRW52aXJvbm1lbnQsXG4gICAgRmllbGRQYXRoLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgaXNTdHJpbmdNYXAsXG4gICAgTGlzdFdyYXBwZXIsXG4gICAgTWFwV3JhcHBlcixcbiAgICBSb3V0aW5nU2VydmljZSxcbiAgICB3YXJuXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtPYmplY3RNZXRhfSBmcm9tICcuL29iamVjdC1tZXRhJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJ0BhcmliYXVpL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgICBNZXRhLFxuICAgIFByb3BlcnR5TWFwLFxuICAgIFByb3BlcnR5TWFwQXdha2luZyxcbiAgICBQcm9wZXJ0eU1lcmdlcl9BbmQsXG4gICAgVmFsdWVRdWVyaWVkT2JzZXJ2ZXJcbn0gZnJvbSAnLi9tZXRhJztcbmltcG9ydCB7Q29udGV4dCwgVUlDb250ZXh0fSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHtTeXN0ZW1SdWxlc30gZnJvbSAnLi93aWRnZXRzLXJ1bGVzJztcbmltcG9ydCB7RHluYW1pY1Byb3BlcnR5VmFsdWUsIFN0YXRpY2FsbHlSZXNvbHZhYmxlLCBTdGF0aWNEeW5hbWljV3JhcHBlcn0gZnJvbSAnLi9wcm9wZXJ0eS12YWx1ZSc7XG5pbXBvcnQge1J1bGUsIFNlbGVjdG9yfSBmcm9tICcuL3J1bGUnO1xuaW1wb3J0IHtKc29uUnVsZX0gZnJvbSAnLi9qc29uLXJ1bGUnO1xuaW1wb3J0IHtJdGVtUHJvcGVydGllc30gZnJvbSAnLi9pdGVtLXByb3BlcnRpZXMnO1xuaW1wb3J0IHtTeXN0ZW1QZXJzaXN0ZW5jZVJ1bGVzfSBmcm9tICcuL3BlcnNpc3RlbmNlLXJ1bGVzJztcbmltcG9ydCB7QUNUSVZFX0NOVFh9IGZyb20gJy4vbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogVUlNZXRhIGlzIHJlc3BvbnNpYmxlIHNldHRpbmcgbGF5b3V0cyBhbmQgYWxsIGFyb3VuZCB0aGlzLiBXZSBjYW4gZWl0aGVyIHVzZSB0aGlzIGFzIGEgc2luZ2xldG9uXG4gKiBvciB1c2UgaXQgYXMgYSBzZXJ2aWNlIHVzaW5nIEFuZ3VsYXIgQEluamVjdCgpXG4gKiBSaWdodCBub3cgd2UgdXNlIHN0aWxsIHNpbmdsZXRvbiBhcyB3ZSBuZWVkIHRoaXMgY2xhc3MgYXMgYSBsaWJyYXJ5IGZvciBzb21lIG90aGVyIHByb2plY3RzXG4gKlxuICpcbiAqIHRvZG86IENvbnZlcnQgdG8gSW5qZWN0YWJsZVxuICovXG5cbiAgICAvLyBASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVUlNZXRhIGV4dGVuZHMgT2JqZWN0TWV0YSB7XG4gICAgc3RhdGljIEtleU9wZXJhdGlvbiA9ICdvcGVyYXRpb24nO1xuICAgIHN0YXRpYyBLZXlNb2R1bGUgPSAnbW9kdWxlJztcbiAgICBzdGF0aWMgS2V5TGF5b3V0ID0gJ2xheW91dCc7XG4gICAgc3RhdGljIEtleUFyZWEgPSAnYXJlYSc7XG4gICAgc3RhdGljIEtleUVkaXRpbmcgPSAnZWRpdGluZyc7XG4gICAgc3RhdGljIEtleUFmdGVyID0gJ2FmdGVyJztcbiAgICBzdGF0aWMgS2V5SGlkZGVuID0gJ2hpZGRlbic7XG4gICAgc3RhdGljIEtleUxhYmVsID0gJ2xhYmVsJztcbiAgICBzdGF0aWMgS2V5Q29tcG9uZW50TmFtZSA9ICdjb21wb25lbnQnO1xuICAgIHN0YXRpYyBLZXlCaW5kaW5ncyA9ICdiaW5kaW5ncyc7XG4gICAgc3RhdGljIEtleUhvbWVQYWdlID0gJ2hvbWVQYWdlJztcbiAgICBzdGF0aWMgS2V5Wm9uZVBhdGggPSAnem9uZVBhdGgnO1xuICAgIHN0YXRpYyBQcm9wRmllbGRzQnlab25lID0gJ2ZpZWxkc0J5Wm9uZSc7XG4gICAgc3RhdGljIFByb3BJc0ZpZWxkc0J5Wm9uZSA9ICdmaXZlWm9uZUxheW91dCc7XG4gICAgc3RhdGljIFByb3BBY3Rpb25zQnlDYXRlZ29yeSA9ICdhY3Rpb25zQnlDYXRlZ29yeSc7XG4gICAgc3RhdGljIFByb3BBY3Rpb25DYXRlZ29yaWVzID0gJ2FjdGlvbkNhdGVnb3JpZXMnO1xuICAgIHN0YXRpYyBQcm9wRmllbGRQcm9wZXJ0eUxpc3QgPSAnZmllbGRQcm9wZXJ0eUxpc3QnO1xuICAgIHN0YXRpYyBQcm9wTGF5b3V0c0J5Wm9uZSA9ICdsYXlvdXRzQnlab25lJztcbiAgICBzdGF0aWMgS2V5V3JhcHBlckNvbXBvbmVudCA9ICd3cmFwcGVyQ29tcG9uZW50JztcbiAgICBzdGF0aWMgS2V5V3JhcHBlckJpbmRpbmcgPSAnd3JhcHBlckJpbmRpbmdzJztcblxuXG4gICAgc3RhdGljIFJvb3RQcmVkZWNlc3NvcktleSA9ICdfcm9vdCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFpvbmVNYWluID0gJ3pNYWluJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgWm9uZVRvcCA9ICd6VG9wJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgWm9uZUxlZnQgPSAnekxlZnQnO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lTWlkZGxlID0gJ3pNaWRkbGUnO1xuICAgIHN0YXRpYyByZWFkb25seSBab25lUmlnaHQgPSAnelJpZ2h0JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgWm9uZUJvdHRvbSA9ICd6Qm90dG9tJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgWm9uZURldGFpbCA9ICd6RGV0YWlsJztcblxuICAgIHN0YXRpYyByZWFkb25seSBBcHBDb25maWdSdWxlRmlsZXNQYXJhbSA9ICdtZXRhdWkucnVsZXMuZmlsZS1uYW1lcyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEFwcENvbmZpZ1VzZXJSdWxlc1BhcmFtID0gJ21ldGF1aS5ydWxlcy51c2VyLXJ1bGVzJztcblxuICAgIHN0YXRpYyBab25lc1RMUk1CID0gW1xuICAgICAgICBVSU1ldGEuWm9uZVRvcCwgVUlNZXRhLlpvbmVMZWZ0LCBVSU1ldGEuWm9uZU1pZGRsZSxcbiAgICAgICAgVUlNZXRhLlpvbmVSaWdodCwgVUlNZXRhLlpvbmVCb3R0b21cbiAgICBdO1xuICAgIHN0YXRpYyBab25lc01UTFJCID0gW1xuICAgICAgICBVSU1ldGEuWm9uZU1haW4sIFVJTWV0YS5ab25lVG9wLCBVSU1ldGEuWm9uZUxlZnQsIFVJTWV0YS5ab25lUmlnaHQsIFVJTWV0YS5ab25lQm90dG9tXG4gICAgXTtcbiAgICBzdGF0aWMgWm9uZXNEZXRhaWwgPSBbVUlNZXRhLlpvbmVEZXRhaWxdO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBVSU1ldGEgPSBudWxsO1xuXG4gICAgc3RhdGljIE1vZHVsZUFjdGlvblpvbmVzOiBzdHJpbmdbXSA9IFsnek5hdicsICd6R2xvYmFsJ107XG4gICAgc3RhdGljIEFjdGlvblpvbmVzOiBzdHJpbmdbXSA9IFsnekdsb2JhbCcsICd6TWFpbicsICd6R2VuZXJhbCddO1xuXG5cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogVUlNZXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0TGFiZWxGb3JJZGVudGlmaWVyKGZpZWxkTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBsYXN0RG90ID0gZmllbGROYW1lLmxhc3RJbmRleE9mKCcuJyk7XG4gICAgICAgIGlmIChsYXN0RG90ICE9PSAtMSAmJiBsYXN0RG90ICE9PSBmaWVsZE5hbWUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgZmllbGROYW1lID0gZmllbGROYW1lLnN1YnN0cmluZyhsYXN0RG90ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlY2FtZWxpemUoZmllbGROYW1lKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYmVhdXRpZnlDbGFzc05hbWUoY2xhc3NOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZGVjYW1lbGl6ZShjbGFzc05hbWUsICcgJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGJlYXV0aWZ5RmlsZU5hbWUoZmllbGQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkZWNhbWVsaXplKGZpZWxkLCAnICcpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBpZiAoaXNQcmVzZW50KGxvYWRlcikpIHtcbiAgICAgICAgLy8gICAgIHRoaXMucmVnaXN0ZXJMb2FkZXIobG9hZGVyKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmJlZ2luUnVsZVNldCgnVUlNZXRhJyk7XG5cbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJLZXlJbml0T2JzZXJ2ZXIoVUlNZXRhLktleUNsYXNzLCBuZXcgVXNlck1ldGFEYXRhUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgICAgIC8vIFRoZXNlIGtleXMgZGVmaW5lIHNjb3BlcyBmb3IgdGhlaXIgcHJvcGVydGllc1xuICAgICAgICAgICAgLy8gZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKEtleUFyZWEpO1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoVUlNZXRhLktleUxheW91dCk7XG4gICAgICAgICAgICB0aGlzLmRlZmluZUtleUFzUHJvcGVydHlTY29wZShVSU1ldGEuS2V5TW9kdWxlKTtcblxuICAgICAgICAgICAgLy8gRGVmYXVsdCBydWxlIGZvciBjb252ZXJ0aW5nIGZpZWxkIG5hbWUgdG8gbGFiZWxcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleUNsYXNzKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleUZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleUxheW91dCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRGVmYXVsdExhYmVsR2VuZXJhdG9yRm9yS2V5KFVJTWV0YS5LZXlNb2R1bGUpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShVSU1ldGEuS2V5QWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0TGFiZWxHZW5lcmF0b3JGb3JLZXkoVUlNZXRhLktleUFjdGlvbkNhdGVnb3J5KTtcblxuICAgICAgICAgICAgLy8gcG9saWNpZXMgZm9yIGNoYWluaW5nIGNlcnRhaW4gd2VsbCBrbm93biBwcm9wZXJ0aWVzXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoVUlNZXRhLktleUFyZWEsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKFVJTWV0YS5LZXlMYXlvdXQsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKFVJTWV0YS5LZXlNb2R1bGUsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuXG4gICAgICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KFVJTWV0YS5LZXlFZGl0aW5nLCBVSU1ldGEuS2V5RWRpdGluZyk7XG4gICAgICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KFVJTWV0YS5LZXlMYXlvdXQsIFVJTWV0YS5LZXlMYXlvdXQpO1xuICAgICAgICAgICAgdGhpcy5taXJyb3JQcm9wZXJ0eVRvQ29udGV4dChVSU1ldGEuS2V5Q29tcG9uZW50TmFtZSwgVUlNZXRhLktleUNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoVUlNZXRhLktleUVkaXRpbmcsIG5ldyBQcm9wZXJ0eU1lcmdlcl9BbmQoKSk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMucmVnaXN0ZXJWYWx1ZVRyYW5zZm9ybWVyRm9yS2V5KCdyZXF1ZXN0Q29udGV4dCcsIFVJTWV0YS5UcmFuc2Zvcm1lcl9LZXlQcmVzZW50KTtcbiAgICAgICAgICAgIC8vIHRoaXMucmVnaXN0ZXJWYWx1ZVRyYW5zZm9ybWVyRm9yS2V5KCdkaXNwbGF5R3JvdXAnLCBVSU1ldGEuVHJhbnNmb3JtZXJfS2V5UHJlc2VudCk7XG5cbiAgICAgICAgICAgIC8vIGRlZmluZSBvcGVyYXRpb24gaGllcmFyY2h5XG4gICAgICAgICAgICB0aGlzLmtleURhdGEoVUlNZXRhLktleU9wZXJhdGlvbikuc2V0UGFyZW50KCd2aWV3JywgJ2luc3BlY3QnKTtcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ3ByaW50JywgJ3ZpZXcnKTtcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ2VkaXQnLCAnaW5zcGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5rZXlEYXRhKFVJTWV0YS5LZXlPcGVyYXRpb24pLnNldFBhcmVudCgnc2VhcmNoJywgJ2luc3BlY3QnKTtcbiAgICAgICAgICAgIHRoaXMua2V5RGF0YShVSU1ldGEuS2V5T3BlcmF0aW9uKS5zZXRQYXJlbnQoJ2tleXdvcmRTZWFyY2gnLCAnc2VhcmNoJyk7XG4gICAgICAgICAgICB0aGlzLmtleURhdGEoVUlNZXRhLktleU9wZXJhdGlvbikuc2V0UGFyZW50KCd0ZXh0U2VhcmNoJywgJ2tleXdvcmRTZWFyY2gnKTtcblxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKFVJTWV0YS5Qcm9wRmllbGRzQnlab25lLFxuICAgICAgICAgICAgICAgIG5ldyBQcm9wRmllbGRzQnlab25lUmVzb2x2ZXIoKSxcbiAgICAgICAgICAgICAgICBVSU1ldGEuS2V5Q2xhc3MpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKFVJTWV0YS5Qcm9wRmllbGRQcm9wZXJ0eUxpc3QsXG4gICAgICAgICAgICAgICAgbmV3IFByb3BGaWVsZFByb3BlcnR5TGlzdFJlc29sdmVyKCksXG4gICAgICAgICAgICAgICAgVUlNZXRhLktleUNsYXNzKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZShVSU1ldGEuUHJvcExheW91dHNCeVpvbmUsXG4gICAgICAgICAgICAgICAgbmV3IFByb3BMYXlvdXRzQnlab25lUmVzb2x2ZXIoKSxcbiAgICAgICAgICAgICAgICBVSU1ldGEuS2V5TGF5b3V0KTtcblxuXG4gICAgICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoVUlNZXRhLlByb3BMYXlvdXRzQnlab25lICwgbmV3XG4gICAgICAgICAgICAvLyBQcm9wTGF5b3V0c0J5Wm9uZVJlc29sdmVyKCkgLCBVSU1ldGEuS2V5TGF5b3V0KTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoJ2JpbmRpbmdzRGljdGlvbmFyeScgLCBkeW4gLCBLZXlGaWVsZCk7XG4gICAgICAgICAgICAvLyByZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKCdiaW5kaW5nc0RpY3Rpb25hcnknICwgZHluICwgS2V5TGF5b3V0KTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyU3RhdGljYWxseVJlc29sdmFibGUoJ2JpbmRpbmdzRGljdGlvbmFyeScgLCBkeW4gLCBLZXlDbGFzcyk7XG4gICAgICAgICAgICAvLyByZWdpc3RlclN0YXRpY2FsbHlSZXNvbHZhYmxlKCdiaW5kaW5nc0RpY3Rpb25hcnknICwgZHluICwgS2V5TW9kdWxlKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuZW5kUnVsZVNldCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIHpvbmVzKGNvbnRleHQ6IENvbnRleHQpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgbGV0IHpvbmVzOiBBcnJheTxzdHJpbmc+ID0gY29udGV4dC5wcm9wZXJ0eUZvcktleSgnem9uZXMnKTtcbiAgICAgICAgcmV0dXJuIChpc0JsYW5rKHpvbmVzKSkgPyBNZXRhLnRvTGlzdChVSU1ldGEuWm9uZU1haW4pIDogem9uZXM7XG4gICAgfVxuXG5cbiAgICB6b25lUGF0aChjb250ZXh0OiBDb250ZXh0KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHpvbmVQYXRoOiBhbnk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29udGV4dC52YWx1ZXMuZ2V0KFVJTWV0YS5LZXlMYXlvdXQpKSkge1xuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldFNjb3BlS2V5KFVJTWV0YS5LZXlMYXlvdXQpO1xuICAgICAgICAgICAgem9uZVBhdGggPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlab25lUGF0aCk7XG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB6b25lUGF0aDtcbiAgICB9XG5cblxuICAgIG5ld0NvbnRleHQoaXNOZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSk6IENvbnRleHQge1xuICAgICAgICByZXR1cm4gbmV3IFVJQ29udGV4dCh0aGlzLCBpc05lc3RlZCk7XG4gICAgfVxuXG4gICAgLy8gTG9hZCBzeXN0ZW0gcnVsZXNcbiAgICBsb2FkRGVmYXVsdFJ1bGVGaWxlcyhyZWZlcmVuY2VzPzogYW55KTogYm9vbGVhbiB7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChTeXN0ZW1SdWxlcy5vc3MpKSB7XG4gICAgICAgICAgICB0aGlzLmJlZ2luUnVsZVNldFdpdGhSYW5rKE1ldGEuU3lzdGVtUnVsZVByaW9yaXR5LCAnc3lzdGVtJyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRSdWxlcyhTeXN0ZW1SdWxlcy5vc3MsICdzeXN0ZW0nLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kUnVsZVNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChTeXN0ZW1QZXJzaXN0ZW5jZVJ1bGVzLm9zcykpIHtcbiAgICAgICAgICAgIHRoaXMuYmVnaW5SdWxlU2V0V2l0aFJhbmsoTWV0YS5TeXN0ZW1SdWxlUHJpb3JpdHkgKyAyMDAwLCAnc3lzdGVtLXBlcnNpc3RlbmNlJyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRSdWxlcyhTeXN0ZW1QZXJzaXN0ZW5jZVJ1bGVzLm9zcywgJ3N5c3RlbS1wZXJzaXN0ZW5jZScsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJlc2VudChyZWZlcmVuY2VzKSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbXBvbmVudHMocmVmZXJlbmNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogbG9hZHMgYXBwbGljYXRpb24gbGV2ZWwgcnVsZXMuIEFwcGxpY2F0aW9uIGxldmVsIHJ1bGVzIGFyZSBnbG9iYWwgcnVsZXNcbiAgICAgKi9cbiAgICBsb2FkQXBwbGljYXRpb25SdWxlcygpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFSdWxlczogQXJyYXk8SnNvblJ1bGU+O1xuICAgICAgICBsZXQgdXNlclJlZmVyZW5jZXM6IGFueVtdO1xuICAgICAgICBsZXQgYXBwUnVsZUZpbGVzOiBzdHJpbmdbXSA9IFsnQXBwbGljYXRpb24nXTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYXBwQ29uZmlnKSkge1xuICAgICAgICAgICAgYXBwUnVsZUZpbGVzID0gdGhpcy5hcHBDb25maWcuZ2V0KFVJTWV0YS5BcHBDb25maWdSdWxlRmlsZXNQYXJhbSkgfHwgWydBcHBsaWNhdGlvbiddO1xuICAgICAgICAgICAgdXNlclJlZmVyZW5jZXMgPSB0aGlzLmFwcENvbmZpZy5nZXQoVUlNZXRhLkFwcENvbmZpZ1VzZXJSdWxlc1BhcmFtKTtcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYWx3YXlzIEFwcGxpY2F0aW9uIGFuZCBtYWtlIGl0IG1vcmUgYWRkaXRpdmUuXG4gICAgICAgICAgICBpZiAoIUxpc3RXcmFwcGVyLmNvbnRhaW5zPHN0cmluZz4oYXBwUnVsZUZpbGVzLCAnQXBwbGljYXRpb24nKSkge1xuICAgICAgICAgICAgICAgIGFwcFJ1bGVGaWxlcy51bnNoaWZ0KCdBcHBsaWNhdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgcnVsZUZpbGUgb2YgYXBwUnVsZUZpbGVzKSB7XG4gICAgICAgICAgICBsZXQgcnVsZSA9IHJ1bGVGaWxlICsgJ1J1bGUnO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fdGVzdFJ1bGVzLmhhcyhydWxlKSkge1xuICAgICAgICAgICAgICAgIC8vIHNpbmNlIHdlIGFyZSBpbiBkZXZlbG9wbWVudCBtb2RlIGFuZCB0ZXN0IG1vZGUgaXMgb24gd2UgY2FuIGNoZWNrIGV4dHJhXG4gICAgICAgICAgICAgICAgLy8gcmVwb3NpdG9yeSB1c2VkIGJ5IHRlc3RzLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGFyZSBub3QgcnVubmluZyB1bml0dGVzdFxuICAgICAgICAgICAgICAgIC8vIGFuZCBhIGNsYXNzIGlzIG5vdCBkZWZpbmVkIGJ1dCB1bml0dGVzdFxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rlc3RSdWxlcy5oYXMocnVsZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNQcmVzZW50KHRoaXMuX3Rlc3RSdWxlcy5nZXQocnVsZSkub3NzKSkge1xuICAgICAgICAgICAgICAgICAgICBhUnVsZXMgPSB0aGlzLl90ZXN0UnVsZXMuZ2V0KHJ1bGUpLm9zcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KGFSdWxlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5SdWxlU2V0V2l0aFJhbmsoTWV0YS5Mb3dSdWxlUHJpb3JpdHksIHJ1bGVGaWxlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUnVsZXMoYVJ1bGVzLCBydWxlRmlsZS50b0xvd2VyQ2FzZSgpLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUnVsZVNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHVzZXJSZWZlcmVuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyUnVsZSA9IHVzZXJSZWZlcmVuY2VzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodXNlclJ1bGUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodXNlclJ1bGVbcnVsZV0pICYmIGlzUHJlc2VudCh1c2VyUnVsZVtydWxlXS5vc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYVJ1bGVzID0gdXNlclJ1bGVbcnVsZV0ub3NzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoYVJ1bGVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpblJ1bGVTZXRXaXRoUmFuayhNZXRhLkxvd1J1bGVQcmlvcml0eSwgcnVsZUZpbGUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRSdWxlcyhhUnVsZXMsIHJ1bGVGaWxlLnRvTG93ZXJDYXNlKCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSdWxlU2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRVc2VyUnVsZShzb3VyY2U6IGFueSwgdXNlckNsYXNzOiBzdHJpbmcpOiBib29sZWFuIHtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYmVnaW5SdWxlU2V0V2l0aFJhbmsodGhpcy5fcnVsZUNvdW50LCAndXNlcjonICsgdXNlckNsYXNzKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFJ1bGVzKHNvdXJjZSwgJ3VzZXInLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kUnVsZVNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIGRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShrZXk6IHN0cmluZyk6IER5bmFtaWNQcm9wZXJ0eVZhbHVlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBfRGVmYXVsdExhYmVsR2VuZXJhdG9yKGtleSk7XG4gICAgfVxuXG5cbiAgICByZWdpc3RlckRlcml2ZWRWYWx1ZShwcm9wS2V5OiBzdHJpbmcsIGR5bmFtaWNWYWx1ZTogRHluYW1pY1Byb3BlcnR5VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dEtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBtID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgbS5zZXQocHJvcEtleSwgZHluYW1pY1ZhbHVlKTtcbiAgICAgICAgdGhpcy5hZGRSdWxlKG5ldyBSdWxlKE1ldGEudG9MaXN0KFxuICAgICAgICAgICAgbmV3IFNlbGVjdG9yKGNvbnRleHRLZXksIGNvbnRleHRWYWx1ZSkpLCBtLCBNZXRhLlN5c3RlbVJ1bGVQcmlvcml0eSkpO1xuICAgIH1cblxuXG4gICAgcmVnaXN0ZXJTdGF0aWNhbGx5UmVzb2x2YWJsZShwcm9wS2V5OiBzdHJpbmcsIGR5bmFtaWNWYWx1ZTogU3RhdGljYWxseVJlc29sdmFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0S2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckRlcml2ZWRWYWx1ZShwcm9wS2V5LCBuZXcgU3RhdGljRHluYW1pY1dyYXBwZXIoZHluYW1pY1ZhbHVlKSwgY29udGV4dEtleSxcbiAgICAgICAgICAgIE1ldGEuS2V5QW55KTtcbiAgICB9XG5cbiAgICByZWdpc3RlckRlZmF1bHRMYWJlbEdlbmVyYXRvckZvcktleShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGVyaXZlZFZhbHVlKFVJTWV0YS5LZXlMYWJlbCwgbmV3IExvY2FsaXplZExhYmVsU3RyaW5nKHRoaXMpLCBrZXksXG4gICAgICAgICAgICBVSU1ldGEuS2V5QW55KTtcbiAgICB9XG5cbiAgICBmaWVsZExpc3QoY29udGV4dDogQ29udGV4dCk6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1MaXN0KGNvbnRleHQsIFVJTWV0YS5LZXlGaWVsZCwgVUlNZXRhLlpvbmVzVExSTUIpO1xuICAgIH1cblxuICAgIGZpZWxkc0J5Wm9uZXMoY29udGV4dDogQ29udGV4dCk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc0J5Wm9uZXMoY29udGV4dCwgVUlNZXRhLktleUZpZWxkLCBVSU1ldGEuWm9uZXNUTFJNQik7XG4gICAgfVxuXG4gICAgaXRlbU5hbWVzQnlab25lcyhjb250ZXh0OiBDb250ZXh0LCBrZXk6IHN0cmluZywgem9uZXM6IHN0cmluZ1tdKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCBpdGVtc0J5Wm9uZXM6IE1hcDxzdHJpbmcsIGFueT4gPSB0aGlzLml0ZW1zQnlab25lcyhjb250ZXh0LCBrZXksIHpvbmVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwSXRlbVByb3BzVG9OYW1lcyhpdGVtc0J5Wm9uZXMpO1xuICAgIH1cblxuICAgIG1hcEl0ZW1Qcm9wc1RvTmFtZXMoaXRlbXNCeVpvbmVzOiBNYXA8c3RyaW5nLCBhbnk+KTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCBuYW1lc0J5Wm9uZXM6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUoaXRlbXNCeVpvbmVzKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSAmJiBpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCBuYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgSXRlbVByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDxJdGVtUHJvcGVydGllcz5pdGVtKS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuYW1lc0J5Wm9uZXMuc2V0KGtleSwgbmFtZXMpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWVzQnlab25lcy5zZXQoa2V5LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcEl0ZW1Qcm9wc1RvTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5hbWVzQnlab25lcztcbiAgICB9XG5cbiAgICBwcmVkZWNlc3Nvck1hcChjb250ZXh0OiBDb250ZXh0LCBrZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJlZGVjZXNzb3I6IHN0cmluZyk6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4ge1xuICAgICAgICBsZXQgZmllbGRJbmZvczogQXJyYXk8SXRlbVByb3BlcnRpZXM+ID0gdGhpcy5pdGVtUHJvcGVydGllcyhjb250ZXh0LCBrZXksIGZhbHNlKTtcbiAgICAgICAgbGV0IHByZWRlY2Vzc29yczogTWFwPHN0cmluZywgQXJyYXk8SXRlbVByb3BlcnRpZXM+PiA9IE1hcFdyYXBwZXIuZ3JvdXBCeTxJdGVtUHJvcGVydGllcz4oXG4gICAgICAgICAgICBmaWVsZEluZm9zLCAoaXRlbTogSXRlbVByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcHJlZCA9IGl0ZW0ucHJvcGVydGllcy5nZXQoVUlNZXRhLktleUFmdGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KHByZWQpID8gcHJlZCA6IGRlZmF1bHRQcmVkZWNlc3NvcjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmVkZWNlc3NvcnM7XG4gICAgfVxuXG4gICAgaXRlbUxpc3QoY29udGV4dDogQ29udGV4dCwga2V5OiBzdHJpbmcsIHpvbmVzOiBzdHJpbmdbXSk6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiB7XG4gICAgICAgIGxldCBwcmVkZWNlc3NvcnM6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4gPSB0aGlzLnByZWRlY2Vzc29yTWFwKGNvbnRleHQsIGtleSxcbiAgICAgICAgICAgIHpvbmVzWzBdKTtcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8SXRlbVByb3BlcnRpZXM+ID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgem9uZSBvZiB6b25lcykge1xuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlUHJlY2Vzc29ycyhwcmVkZWNlc3NvcnMsIHpvbmUsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpc1pvbmVSZWZlcmVuY2Uoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgLy8ga2V5cyBvZiB0aGUgZm9ybSAnejxOYW1lPicgYW5kICdmb28uYmFyLno8TmFtZT4nIGFyZSBjb25zaWRlcmVkIHpvbmUga2V5c1xuICAgICAgICBsZXQgbGFzdERvdCA9IGtleS5sYXN0SW5kZXhPZignLicpO1xuICAgICAgICBsZXQgc3VmZml4ID0gKGxhc3REb3QgPT09IC0xKSA/IGtleSA6IGtleS5zdWJzdHJpbmcobGFzdERvdCArIDEpO1xuICAgICAgICByZXR1cm4gKHN1ZmZpeC5sZW5ndGggPiAxKSAmJiAoc3VmZml4WzBdID09PSAneicpICYmIChcbiAgICAgICAgICAgIHN1ZmZpeFsxXS50b1VwcGVyQ2FzZSgpID09PSBzdWZmaXhbMV0gLy8gaXMgdXBwZXJjYXNlID9zXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgaXRlbXNCeVpvbmVzKGNvbnRleHQ6IENvbnRleHQsIHByb3BlcnR5OiBzdHJpbmcsIHpvbmVzOiBzdHJpbmdbXSk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBsZXQgcHJlZGVjZXNzb3JzID0gdGhpcy5wcmVkZWNlc3Nvck1hcChjb250ZXh0LCBwcm9wZXJ0eSwgem9uZXNbMF0pO1xuICAgICAgICBsZXQgYnlab25lID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuXG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUocHJlZGVjZXNzb3JzKS5mb3JFYWNoKCh2YWx1ZSwgem9uZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNab25lUmVmZXJlbmNlKHpvbmUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3Q6IGFueVtdID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlUHJlY2Vzc29ycyhwcmVkZWNlc3NvcnMsXG4gICAgICAgICAgICAgICAgICAgIHpvbmUsIGxpc3QpO1xuXG4gICAgICAgICAgICAgICAgRmllbGRQYXRoLnNldEZpZWxkVmFsdWUoYnlab25lLCB6b25lLCBsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJ5Wm9uZTtcbiAgICB9XG5cbiAgICAvLyByZWN1cnNpdmUgZGVjZW50IG9mIHByZWRlY2Vzc29yIHRyZWUuLi5cbiAgICBhY2N1bXVsYXRlUHJlY2Vzc29ycyhwcmVkZWNlc3NvcnM6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4sIGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBpdGVtczogQXJyYXk8SXRlbVByb3BlcnRpZXM+ID0gcHJlZGVjZXNzb3JzLmdldChrZXkpO1xuICAgICAgICBpZiAoaXNCbGFuayhpdGVtcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIExpc3RXcmFwcGVyLnNvcnQ8SXRlbVByb3BlcnRpZXM+KGl0ZW1zLCAobzEsIG8yKSA9PiB7XG4gICAgICAgICAgICBsZXQgcjEgPSBvMS5wcm9wZXJ0aWVzLmdldChVSU1ldGEuS2V5UmFuayk7XG4gICAgICAgICAgICBsZXQgcjIgPSBvMi5wcm9wZXJ0aWVzLmdldChVSU1ldGEuS2V5UmFuayk7XG5cbiAgICAgICAgICAgIGlmIChyMSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHIxID0gMTAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHIyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcjIgPSAxMDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAocjEgPT09IHIyKSA/IDAgOiAocjEgPT09IG51bGwpID8gMSA6IChyMiA9PT0gbnVsbCkgPyAtMSA6IChyMSAtIHIyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgaWYgKCFpdGVtLmhpZGRlbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlUHJlY2Vzc29ycyhwcmVkZWNlc3NvcnMsIGl0ZW0ubmFtZSwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSBQYXJzZXIgdG8gaGFuZGxlIGRlY2xzIGxpa2UgJ3pMZWZ0ID0+IGxhc3ROYW1lI3JlcXVpcmVkJ1xuICAgICAqXG4gICAgICovXG4gICAgYWRkUHJlZGVjZXNzb3JSdWxlKGl0ZW1OYW1lOiBzdHJpbmcsIGNvbnRleHRQcmVkczogQXJyYXk8U2VsZWN0b3I+LCBwcmVkZWNlc3Nvcjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICB0cmFpdHM6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgbGluZU51bWJlcjogbnVtYmVyKTogUnVsZSB7XG4gICAgICAgIGlmIChpc0JsYW5rKHByZWRlY2Vzc29yKSAmJiBpc0JsYW5rKHRyYWl0cykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGtleTogc3RyaW5nID0gdGhpcy5zY29wZUtleUZvclNlbGVjdG9yKGNvbnRleHRQcmVkcyk7XG4gICAgICAgIGlmIChpc0JsYW5rKGtleSkgfHwga2V5ID09PSBVSU1ldGEuS2V5Q2xhc3MpIHtcbiAgICAgICAgICAgIGtleSA9IFVJTWV0YS5LZXlGaWVsZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VsZWN0b3I6IEFycmF5PFNlbGVjdG9yPiA9IG5ldyBBcnJheTxTZWxlY3Rvcj4oKTtcbiAgICAgICAgTGlzdFdyYXBwZXIuYWRkQWxsPFNlbGVjdG9yPihzZWxlY3RvciwgY29udGV4dFByZWRzKTtcblxuICAgICAgICBzZWxlY3Rvci5wdXNoKG5ldyBTZWxlY3RvcihrZXksIGl0ZW1OYW1lKSk7XG4gICAgICAgIGxldCBwcm9wczogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChwcmVkZWNlc3NvcikpIHtcbiAgICAgICAgICAgIHByb3BzLnNldChVSU1ldGEuS2V5QWZ0ZXIsIHByZWRlY2Vzc29yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodHJhaXRzKSkge1xuICAgICAgICAgICAgcHJvcHMuc2V0KFVJTWV0YS5LZXlUcmFpdCwgdHJhaXRzKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcnVsZSA9IG5ldyBSdWxlKHNlbGVjdG9yLCBwcm9wcywgMCwgbGluZU51bWJlcik7XG4gICAgICAgIHRoaXMuYWRkUnVsZShydWxlKTtcbiAgICAgICAgcmV0dXJuIHJ1bGU7XG4gICAgfVxuXG4gICAgZmxhdHRlblZpc2libGUoZmllbGRzQnlab25lczogTWFwPHN0cmluZywgQXJyYXk8c3RyaW5nPj4sIHpvbmVMaXN0OiBzdHJpbmdbXSwga2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgY29udGV4dDogQ29udGV4dCk6IHN0cmluZ1tdIHtcbiAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGZpZWxkc0J5Wm9uZXMpKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHpvbmUgb2YgIHpvbmVMaXN0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkczogc3RyaW5nW10gPSBmaWVsZHNCeVpvbmVzLmdldCh6b25lKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKGZpZWxkcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNldChrZXksIGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYm9vbGVhblByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlWaXNpYmxlLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGRpc3BsYXlLZXlGb3JDbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIC8vIHBlcmZvcm1hbmNlOiBzaG91bGQgdXNlIHJlZ2lzdGVyRGVyaXZlZFZhbHVlKCcuLi4nLCBuZXcgQ29udGV4dC5TdGF0aWNEeW5hbWljV3JhcHBlclxuICAgICAgICAvLyB0byBnZXQgY2FjaGVkIHJlc29sdXRpb24gaGVyZS4uLlxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubmV3Q29udGV4dCgpO1xuICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5TGF5b3V0LCAnTGFiZWxGaWVsZCcpO1xuICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5Q2xhc3MsIGNsYXNzTmFtZSk7XG4gICAgICAgIGxldCBmaWVsZHM6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiA9IHRoaXMuaXRlbVByb3BlcnRpZXMoY29udGV4dCwgVUlNZXRhLktleUZpZWxkLCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIuaXNFbXB0eShmaWVsZHMpID8gJyR0b1N0cmluZycgOiBmaWVsZHNbMF0ubmFtZTtcbiAgICB9XG5cblxuICAgIGRpc3BsYXlMYWJlbChjbGFzc05hbWU6IHN0cmluZywgcHJvcGVydGllc1ZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQocHJvcGVydGllc1ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXNWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5S2V5Rm9yQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9XG5cblxuICAgIGNyZWF0ZUxvY2FsaXplZFN0cmluZyhrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBzdHJpbmcpOiBMb2NhbGl6ZWRTdHJpbmcge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuX2N1cnJlbnRSdWxlU2V0KSxcbiAgICAgICAgICAgICdBdHRlbXB0IHRvIGNyZWF0ZSBsb2NhbGl6ZWQgc3RyaW5nIHdpdGhvdXQgY3VycmVudFJ1bGVTZXQgaW4gcGxhY2UnKTtcblxuICAgICAgICByZXR1cm4gbmV3IExvY2FsaXplZFN0cmluZyh0aGlzLCB0aGlzLl9jdXJyZW50UnVsZVNldC5maWxlUGF0aCwga2V5LCBkZWZhdWx0VmFsdWUpO1xuICAgIH1cblxuXG4gICAgZ2V0IHJvdXRpbmdTZXJ2aWNlKCk6IFJvdXRpbmdTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQodGhpcy5faW5qZWN0b3IpKSA/IHRoaXMuX2luamVjdG9yLmdldChSb3V0aW5nU2VydmljZSkgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBlbnYoKTogRW52aXJvbm1lbnQge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudCh0aGlzLl9pbmplY3RvcikpID8gdGhpcy5faW5qZWN0b3IuZ2V0KEVudmlyb25tZW50KSA6IG5ldyBFbnZpcm9ubWVudCgpO1xuICAgIH1cblxuXG4gICAgZ2V0IGFwcENvbmZpZygpOiBBcHBDb25maWcge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudCh0aGlzLl9pbmplY3RvcikpID8gdGhpcy5faW5qZWN0b3IuZ2V0KEFwcENvbmZpZykgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBmcmFtZXdvcmsgbGV2ZWwgY29tcG9uZW50cyBhbmQgbGlzdGVuIGZvciB1c2VyIGxldmVsIHJ1bGVzIHRvIGJlIHJlZ2lzdGVyZWQuXG4gICAgICogQWZ0ZXIgd2UgcmVnaXN0ZXIgdXNlciBsZXZlbCBydWxlcyBpdCB3aWxsIGxvYWQgYXBwbGljYXRpb24ub3NzLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZ2lzdGVyQ29tcG9uZW50cyhzeXNSZWZlcmVuY2VzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLmluamVjdG9yKSwgJ0Nhbm5vdCByZWdpc3RlciBjb21wb25lbnRzIHdpdGhvdXQgSW5qZWN0b3IgaW4gb3JkZXInICtcbiAgICAgICAgICAgICcgdG8gZ2V0IGFjY2VzcyB0byBDb21wb25lbnRSZWdpc3RyeSBTZXJ2aWNlJyk7XG5cbiAgICAgICAgYXNzZXJ0KHRoaXMuZW52LmluVGVzdCB8fCBpc1ByZXNlbnQodGhpcy5hcHBDb25maWcuZ2V0KFVJTWV0YS5BcHBDb25maWdVc2VyUnVsZXNQYXJhbSkpLFxuICAgICAgICAgICAgJ1VuYWJsZSB0byBpbml0aWFsaXplIE1ldGFVSSBhcyB1c2VyIHJ1bGVzIGFyZSBtaXNzaW5nLiBwbGVhc2UgdXNlOicgK1xuICAgICAgICAgICAgJyBtZXRhdWkucnVsZXMudXNlci1ydWxlcyBjb25maWd1cmF0aW9uIHBhcmFtJyk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWdpc3RyeSA9IHRoaXMuaW5qZWN0b3IuZ2V0KENvbXBvbmVudFJlZ2lzdHJ5KTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5KSkge1xuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5LnJlZ2lzdGVyVHlwZXMoc3lzUmVmZXJlbmNlcyk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5lbnYuaW5UZXN0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJSZWZlcmVuY2VzOiBhbnlbXSA9IHRoaXMuYXBwQ29uZmlnLmdldChVSU1ldGEuQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHVSdWxlIG9mIHVzZXJSZWZlcmVuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVnaXN0cnkucmVnaXN0ZXJUeXBlcyh1UnVsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFwcGxpY2F0aW9uUnVsZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmVudi5pblRlc3QpIHtcbiAgICAgICAgICAgIHdhcm4oJ1VJTWV0YS5yZWdpc3RlckNvbXBvbmVudHMoKSBObyBjb21wb25lbnRzIHdlcmUgcmVnaXN0ZXJlZCAhJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBKdXN0IG5lZWQgdG8gY2FsbCBpdCBkaWZmZXJlbnQgdGhhbiB0aGUgb3RoZXIgZmlyZUFjdGlvbiBhcyBJIGNhbiBub3QgZG8gYW55IG1ldGhvZFxuICAgICAqIG92ZXJsb2FkaW5nIGhlcmUuXG4gICAgICpcbiAgICAgKi9cbiAgICBmaXJlQWN0aW9uRnJvbVByb3BzKGFjdGlvbjogSXRlbVByb3BlcnRpZXMsIGNvbnRleHQ6IENvbnRleHQpOiB2b2lkIHtcbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIGxldCBhY3Rpb25DYXRlZ29yeSA9IGFjdGlvbi5wcm9wZXJ0aWVzLmdldChPYmplY3RNZXRhLktleUFjdGlvbkNhdGVnb3J5KTtcbiAgICAgICAgaWYgKGlzQmxhbmsoYWN0aW9uQ2F0ZWdvcnkpKSB7XG4gICAgICAgICAgICBhY3Rpb25DYXRlZ29yeSA9IE9iamVjdE1ldGEuRGVmYXVsdEFjdGlvbkNhdGVnb3J5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc2V0KE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnksIGFjdGlvbkNhdGVnb3J5KTtcbiAgICAgICAgY29udGV4dC5zZXQoT2JqZWN0TWV0YS5LZXlBY3Rpb24sIGFjdGlvbi5uYW1lKTtcblxuICAgICAgICB0aGlzLl9maXJlQWN0aW9uKGNvbnRleHQsIGZhbHNlKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgIH1cblxuICAgIGZpcmVBY3Rpb24oY29udGV4dDogVUlDb250ZXh0LCB3aXRoQmFja0FjdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICB0aGlzLl9maXJlQWN0aW9uKGNvbnRleHQsIHdpdGhCYWNrQWN0aW9uKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpcmVBY3Rpb24oY29udGV4dDogQ29udGV4dCwgd2l0aEJhY2tBY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgbGV0IGFjdGlvblJlc3VsdHMgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KCdhY3Rpb25SZXN1bHRzJyk7XG4gICAgICAgIGlmIChpc0JsYW5rKGFjdGlvblJlc3VsdHMpIHx8ICF0aGlzLmlzUm91dGUoYWN0aW9uUmVzdWx0cykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hdmlhdGVUb1BhZ2UoY29udGV4dCwgYWN0aW9uUmVzdWx0cywgd2l0aEJhY2tBY3Rpb24pO1xuICAgIH1cblxuICAgIG5hdmlhdGVUb1BhZ2UoY29udGV4dDogQ29udGV4dCwgcm91dGU6IGFueSwgd2l0aEJhY2tBY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMucHJlcGFyZVJvdXRlKGNvbnRleHQsIHdpdGhCYWNrQWN0aW9uKTtcblxuICAgICAgICBsZXQgdWlDb250ZXg6IFVJQ29udGV4dCA9IDxVSUNvbnRleHQ+IGNvbnRleHQ7XG4gICAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UubmF2aWdhdGVXaXRoUm91dGUocm91dGUsIHBhcmFtcywgdWlDb250ZXgub2JqZWN0KTtcbiAgICB9XG5cblxuICAgIHByZXBhcmVSb3V0ZShjb250ZXh0OiBDb250ZXh0LCB3aXRoQmFja0FjdGlvbjogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICAgICAgbGV0IHBhZ2VCaW5kaW5ncyA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoJ3BhZ2VCaW5kaW5ncycpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHBhZ2VCaW5kaW5ncykpIHtcbiAgICAgICAgICAgIHBhZ2VCaW5kaW5ncy5mb3JFYWNoKCh2OiBhbnksIGs6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrICE9PSBPYmplY3RNZXRhLktleU9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAoPGFueT5wYXJhbXMpW2tdID0gY29udGV4dC5yZXNvbHZlVmFsdWUodik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHdpdGhCYWNrQWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICg8YW55PnBhcmFtcylbJ2InXSA9IHdpdGhCYWNrQWN0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuXG4gICAgcHJlcGFyZVJvdXRlRm9yQ29tcG9uZW50KGNvbXBvbmVudDogYW55LCBjb250ZXh0OiBDb250ZXh0LCB3aXRoQmFja0FjdGlvbjogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICAgICAgbGV0IHBhZ2VCaW5kaW5ncyA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoJ3BhZ2VCaW5kaW5ncycpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHBhZ2VCaW5kaW5ncykpIHtcbiAgICAgICAgICAgIHBhZ2VCaW5kaW5ncy5mb3JFYWNoKCh2OiBhbnksIGs6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudFtrXSA9IHY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG5cbiAgICBnb3RvTW9kdWxlKG1vZHVsZTogSXRlbVByb3BlcnRpZXMsIGFjdGl2YXRlZFBhdGg/OiBzdHJpbmcpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmVudi5kZWxldGVWYWx1ZShBQ1RJVkVfQ05UWCk7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5uZXdDb250ZXh0KCk7XG5cblxuICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgY29udGV4dC5zZXQoVUlNZXRhLktleU1vZHVsZSwgbW9kdWxlLm5hbWUpO1xuICAgICAgICBsZXQgcGFnZU5hbWUgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlIb21lUGFnZSk7XG5cblxuICAgICAgICBsZXQgcm91dGUgPSB0aGlzLnJvdXRpbmdTZXJ2aWNlLnJvdXRlRm9yUGFnZShwYWdlTmFtZSwgbW9kdWxlLm5hbWUudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIGFjdGl2YXRlZFBhdGgpO1xuICAgICAgICBpZiAoYWN0aXZhdGVkUGF0aCA9PT0gJy8nKSB7XG4gICAgICAgICAgICBhY3RpdmF0ZWRQYXRoID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhdGggPSBgJHthY3RpdmF0ZWRQYXRofS8ke3JvdXRlLnBhdGh9YDtcblxuICAgICAgICBsZXQgcGFyYW1zID0gdGhpcy5wcmVwYXJlUm91dGUoY29udGV4dCwgbnVsbCk7XG4gICAgICAgIGNvbnRleHQucG9wKCk7XG5cbiAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5uYXZpZ2F0ZShbcGF0aCwgcGFyYW1zXSwge3NraXBMb2NhdGlvbkNoYW5nZTogdHJ1ZX0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNSb3V0ZShhY3Rpb25SZXN1bHQ6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNTdHJpbmdNYXAoYWN0aW9uUmVzdWx0KSAmJiBpc1ByZXNlbnQoYWN0aW9uUmVzdWx0WydwYXRoJ10pO1xuXG4gICAgfVxuXG4gICAgY29tcFBhZ2VXaXRoTmFtZShuYW1lOiBzdHJpbmcpOiBUeXBlPGFueT4ge1xuICAgICAgICBsZXQgY3VyclR5cGUgPSB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5Lm5hbWVUb1R5cGUuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoaXNCbGFuayhjdXJyVHlwZSkpIHtcbiAgICAgICAgICAgIGFzc2VydChmYWxzZSwgbmFtZSArICcgY29tcG9uZW50IGRvZXMgbm90IGV4aXN0cy4gQ3JlYXRlIER1bW15IENvbXBvbmVudCBpbnN0ZWFkIG9mJyArXG4gICAgICAgICAgICAgICAgJyB0aHJvd2luZyB0aGlzIGVycm9yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJUeXBlO1xuICAgIH1cblxuXG4gICAgLy8gY2FsbGVyIG11c3QgcHVzaC9wb3AhXG4gICAgYWN0aW9uc0J5Q2F0ZWdvcnkoY29udGV4dDogQ29udGV4dCwgcmVzdWx0OiBNYXA8c3RyaW5nLCBBcnJheTxJdGVtUHJvcGVydGllcz4+LFxuICAgICAgICAgICAgICAgICAgICAgIHpvbmVzOiBzdHJpbmdbXSk6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiB7XG4gICAgICAgIGxldCBjYXROYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IGFjdGlvbkNhdGVnb3JpZXMgPSB0aGlzLml0ZW1MaXN0KGNvbnRleHQsIE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnksIHpvbmVzKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGFjdGlvbkNhdGVnb3JpZXMpKSB7XG4gICAgICAgICAgICBhY3Rpb25DYXRlZ29yaWVzLmZvckVhY2goKGl0ZW06IEl0ZW1Qcm9wZXJ0aWVzKSA9PiBjYXROYW1lcy5wdXNoKGl0ZW0ubmFtZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRBY3Rpb25zRm9yQ2F0ZWdvcmllcyhjb250ZXh0LCByZXN1bHQsIGNhdE5hbWVzKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbkNhdGVnb3JpZXM7XG4gICAgfVxuXG4gICAgYWRkQWN0aW9uc0ZvckNhdGVnb3JpZXMoY29udGV4dDogQ29udGV4dCwgcmVzdWx0OiBNYXA8c3RyaW5nLCBBcnJheTxJdGVtUHJvcGVydGllcz4+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdE5hbWVzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBjYXQgb2YgY2F0TmFtZXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgaWYgKGNhdCAhPT0gT2JqZWN0TWV0YS5EZWZhdWx0QWN0aW9uQ2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNldChPYmplY3RNZXRhLktleUFjdGlvbkNhdGVnb3J5LCBjYXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RBY3Rpb25zQnlDYXRlZ29yeShjb250ZXh0LCByZXN1bHQsIGNhdCk7XG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIGNvbGxlY3RBY3Rpb25zQnlDYXRlZ29yeShjb250ZXh0OiBDb250ZXh0LCByZXN1bHQ6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldENhdDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBhY3Rpb25JbmZvczogSXRlbVByb3BlcnRpZXNbXSA9IHRoaXMuaXRlbVByb3BlcnRpZXMoY29udGV4dCwgT2JqZWN0TWV0YS5LZXlBY3Rpb24sXG4gICAgICAgICAgICB0cnVlKTtcbiAgICAgICAgZm9yIChsZXQgYWN0aW9uSW5mbyBvZiBhY3Rpb25JbmZvcykge1xuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChPYmplY3RNZXRhLktleUFjdGlvbiwgYWN0aW9uSW5mby5uYW1lKTtcblxuICAgICAgICAgICAgbGV0IHZpc2libGUgPSBjb250ZXh0LmJvb2xlYW5Qcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleVZpc2libGUsIHRydWUpO1xuICAgICAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcnkgPSBhY3Rpb25JbmZvLnByb3BlcnRpZXMuZ2V0KE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhdGVnb3J5ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkgPSBPYmplY3RNZXRhLkRlZmF1bHRBY3Rpb25DYXRlZ29yeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldENhdCAhPT0gY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGZvckNhdGVnb3J5OiBJdGVtUHJvcGVydGllc1tdID0gcmVzdWx0LmdldChjYXRlZ29yeSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoZm9yQ2F0ZWdvcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvckNhdGVnb3J5ID0gW107XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoY2F0ZWdvcnksIGZvckNhdGVnb3J5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yQ2F0ZWdvcnkucHVzaChhY3Rpb25JbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29tcHV0ZU1vZHVsZUluZm8oY29udGV4dDogQ29udGV4dCA9IHRoaXMubmV3Q29udGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmlzaWJpbGl0eTogYm9vbGVhbiA9IHRydWUpOiBNb2R1bGVJbmZvIHtcblxuICAgICAgICBsZXQgbW9kdWxlSW5mbzogTW9kdWxlSW5mbyA9IG5ldyBNb2R1bGVJbmZvKCk7XG4gICAgICAgIG1vZHVsZUluZm8ubW9kdWxlcyA9IFtdO1xuXG4gICAgICAgIGxldCBhbGxNb2R1bGVQcm9wczogQXJyYXk8SXRlbVByb3BlcnRpZXM+ID0gdGhpcy5pdGVtTGlzdChjb250ZXh0LCBVSU1ldGEuS2V5TW9kdWxlLFxuICAgICAgICAgICAgVUlNZXRhLkFjdGlvblpvbmVzKTtcbiAgICAgICAgbW9kdWxlSW5mby5tb2R1bGVOYW1lcyA9IFtdO1xuICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZUJ5TmFtZXMgPSBuZXcgTWFwPHN0cmluZywgSXRlbVByb3BlcnRpZXM+KCk7XG5cbiAgICAgICAgZm9yIChsZXQgbW9kdWxlIG9mIGFsbE1vZHVsZVByb3BzKSB7XG5cbiAgICAgICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgY29udGV4dC5zZXQoVUlNZXRhLktleU1vZHVsZSwgbW9kdWxlLm5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2tWaXNpYmlsaXR5ICYmICFjb250ZXh0LmJvb2xlYW5Qcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5VmlzaWJsZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZU5hbWVzLnB1c2gobW9kdWxlLm5hbWUpO1xuXG4gICAgICAgICAgICAvLyAvLyB0b2RvOiBjcmVhdGUgdHlwZXNjcmlwdCBhbm90YXRpb25cbiAgICAgICAgICAgIC8vIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgLy8gY29udGV4dC5zZXQoXCJob21lRm9yQ2xhc3Nlc1wiLCB0cnVlKTtcbiAgICAgICAgICAgIC8vIGxldCBob21lQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuaXRlbU5hbWVzKGNvbnRleHQsIFVJTWV0YS5LZXlDbGFzcyk7XG4gICAgICAgICAgICAvLyBjb250ZXh0LnBvcCgpO1xuXG5cbiAgICAgICAgICAgIGxldCBtb2RQcm9wZXJ0aWVzID0gbmV3IEl0ZW1Qcm9wZXJ0aWVzKG1vZHVsZS5uYW1lLCBjb250ZXh0LmFsbFByb3BlcnRpZXMoKSwgZmFsc2UpO1xuICAgICAgICAgICAgbW9kdWxlSW5mby5tb2R1bGVzLnB1c2gobW9kUHJvcGVydGllcyk7XG5cbiAgICAgICAgICAgIG1vZHVsZUluZm8ubW9kdWxlQnlOYW1lcy5zZXQobW9kdWxlLm5hbWUsIG1vZFByb3BlcnRpZXMpO1xuXG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIGNvbnRleHQuc2V0KFVJTWV0YS5LZXlNb2R1bGUsIG1vZHVsZUluZm8ubW9kdWxlTmFtZXMpO1xuICAgICAgICBtb2R1bGVJbmZvLmFjdGlvbnNCeUNhdGVnb3J5ID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj4oKTtcbiAgICAgICAgbW9kdWxlSW5mby5hY3Rpb25DYXRlZ29yaWVzID0gdGhpcy5hY3Rpb25zQnlDYXRlZ29yeShjb250ZXh0LCBtb2R1bGVJbmZvLmFjdGlvbnNCeUNhdGVnb3J5LFxuICAgICAgICAgICAgVUlNZXRhLk1vZHVsZUFjdGlvblpvbmVzKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgICAgICByZXR1cm4gbW9kdWxlSW5mbztcbiAgICB9XG5cblxuICAgIGN1cnJlbnRNb2R1bGVMYWJlbChtb2R1bGVOYW1lOiBzdHJpbmcsIGNvbnRleHQ6IENvbnRleHQgPSB0aGlzLm5ld0NvbnRleHQoKSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5TW9kdWxlLCBtb2R1bGVOYW1lKTtcbiAgICAgICAgbGV0IGxhYmVsOiBzdHJpbmcgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlMYWJlbCk7XG4gICAgICAgIGNvbnRleHQucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTW9kdWxlSW5mbyB7XG4gICAgbW9kdWxlczogQXJyYXk8SXRlbVByb3BlcnRpZXM+O1xuICAgIG1vZHVsZU5hbWVzOiBBcnJheTxzdHJpbmc+O1xuICAgIG1vZHVsZUJ5TmFtZXM6IE1hcDxzdHJpbmcsIEl0ZW1Qcm9wZXJ0aWVzPjtcbiAgICBhY3Rpb25DYXRlZ29yaWVzOiBBcnJheTxJdGVtUHJvcGVydGllcz47XG4gICAgYWN0aW9uc0J5Q2F0ZWdvcnk6IE1hcDxzdHJpbmcsIEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPj47XG59XG5cblxuZXhwb3J0IGNsYXNzIExvY2FsaXplZFN0cmluZyBleHRlbmRzIER5bmFtaWNQcm9wZXJ0eVZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBtZXRhOiBVSU1ldGEsIHByb3RlY3RlZCBfbW9kdWxlOiBzdHJpbmcsIHByb3RlY3RlZCAgX2tleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBfZGVmYXVsdFZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55IHtcblxuICAgICAgICBsZXQgbG9jYWxpemVkU3RyaW5nOiBhbnk7XG4gICAgICAgIC8vIGxldCBjbGF6eiA9IGNvbnRleHQudmFsdWVzLmdldCgnY2xhc3MnKTtcbiAgICAgICAgLy8gaWYgKGlzUHJlc2VudCh0aGlzLl9rZXkpICYmIGlzUHJlc2VudCh0aGlzLm1ldGEuaTE4blNlcnZpY2UpKSB7XG4gICAgICAgIC8vICAgICBsZXQgaTE4bktleSA9IGNsYXp6ICsgJy4nICsgdGhpcy5fa2V5O1xuICAgICAgICAvLyAgICAgbG9jYWxpemVkU3RyaW5nID0gdGhpcy5tZXRhLmkxOG5TZXJ2aWNlLmluc3RhbnQoaTE4bktleSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyB3aGVuIGl0IHJldHVybiB0aGUgc2FtZSBzdHJpbmcgbW9zdCBsaWtlbHkgaXQgbWVhbnMgdGhlcmUgaXMgbm9cbiAgICAgICAgLy8gICAgIC8vIHRyYW5zbGF0aW9uIHNvIGRlZmF1bHQgaXQgdG8gbnVsbFxuICAgICAgICAvLyAgICAgbG9jYWxpemVkU3RyaW5nID0gKGxvY2FsaXplZFN0cmluZyA9PT0gaTE4bktleSkgPyBudWxsIDogbG9jYWxpemVkU3RyaW5nO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gaWYgKGlzQmxhbmsobG9jYWxpemVkU3RyaW5nKSB8fCB0aGlzLl9rZXkgPT09IE9iamVjdE1ldGEuS2V5RmllbGQpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VmFsdWU7XG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ0xvY2FsZWRTdHJpbmc6IHsnICsgdGhpcy5fa2V5ICsgJyAtICcgKyB0aGlzLl9kZWZhdWx0VmFsdWUgKyAnIH0nO1xuICAgIH1cbn1cblxuY2xhc3MgTG9jYWxpemVkTGFiZWxTdHJpbmcgZXh0ZW5kcyBMb2NhbGl6ZWRTdHJpbmcgaW1wbGVtZW50cyBQcm9wZXJ0eU1hcEF3YWtpbmcge1xuICAgIHN0YXRpYyBEZWZhdWx0TW9kdWxlID0gJ2RlZmF1bHQnO1xuICAgIHByb3BlcnR5QXdha2luZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbWV0YTogVUlNZXRhKSB7XG4gICAgICAgIHN1cGVyKG1ldGEsIExvY2FsaXplZExhYmVsU3RyaW5nLkRlZmF1bHRNb2R1bGUsIG51bGwsIG51bGwpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnkge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9rZXkpKSB7XG4gICAgICAgICAgICBsZXQgc2NvcGVLZXk6IHN0cmluZyA9IGNvbnRleHQudmFsdWVzLmdldChNZXRhLlNjb3BlS2V5KTtcbiAgICAgICAgICAgIGxldCBzY29wZVZhbDogc3RyaW5nID0gY29udGV4dC52YWx1ZXMuZ2V0KHNjb3BlS2V5KTtcblxuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdFZhbHVlID0gVUlNZXRhLmRlZmF1bHRMYWJlbEZvcklkZW50aWZpZXIoc2NvcGVWYWwpO1xuXG4gICAgICAgICAgICB0aGlzLl9rZXkgPSBzY29wZUtleTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIuZXZhbHVhdGUoY29udGV4dCk7XG4gICAgfVxuXG4gICAgYXdha2VGb3JQcm9wZXJ0eU1hcChtYXA6IFByb3BlcnR5TWFwKTogYW55IHtcbiAgICAgICAgcmV0dXJuIG5ldyBMb2NhbGl6ZWRMYWJlbFN0cmluZyh0aGlzLm1ldGEpO1xuICAgIH1cblxufVxuXG5cbmNsYXNzIFByb3BGaWVsZHNCeVpvbmVSZXNvbHZlciBleHRlbmRzIFN0YXRpY2FsbHlSZXNvbHZhYmxlIHtcblxuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueSB7XG4gICAgICAgIGxldCBtID0gKDxVSU1ldGE+Y29udGV4dC5tZXRhKS5pdGVtTmFtZXNCeVpvbmVzKGNvbnRleHQsIFVJTWV0YS5LZXlGaWVsZCxcbiAgICAgICAgICAgICg8VUlNZXRhPmNvbnRleHQubWV0YSkuem9uZXMoY29udGV4dCkpO1xuICAgICAgICBsZXQgem9uZVBhdGggPSAoPFVJTWV0YT5jb250ZXh0Lm1ldGEpLnpvbmVQYXRoKGNvbnRleHQpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHpvbmVQYXRoKSkge1xuXG5cbiAgICAgICAgICAgIG0gPSA8TWFwPHN0cmluZywgYW55Pj4gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUobSwgem9uZVBhdGgpO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsobSkpIHtcbiAgICAgICAgICAgICAgICBtID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG59XG5cbmNsYXNzIFByb3BGaWVsZFByb3BlcnR5TGlzdFJlc29sdmVyIGV4dGVuZHMgU3RhdGljYWxseVJlc29sdmFibGUge1xuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueSB7XG4gICAgICAgIHJldHVybiAoPFVJTWV0YT5jb250ZXh0Lm1ldGEpLmZpZWxkTGlzdChjb250ZXh0KTtcbiAgICB9XG59XG5cbmNsYXNzIFByb3BMYXlvdXRzQnlab25lUmVzb2x2ZXIgZXh0ZW5kcyBTdGF0aWNhbGx5UmVzb2x2YWJsZSB7XG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55IHtcbiAgICAgICAgcmV0dXJuICg8VUlNZXRhPmNvbnRleHQubWV0YSkuaXRlbU5hbWVzQnlab25lcyhjb250ZXh0LCBVSU1ldGEuS2V5TGF5b3V0LFxuICAgICAgICAgICAgKDxVSU1ldGE+Y29udGV4dC5tZXRhKS56b25lcyhjb250ZXh0KSk7XG4gICAgfVxufVxuXG5cbmNsYXNzIF9EZWZhdWx0TGFiZWxHZW5lcmF0b3IgZXh0ZW5kcyBTdGF0aWNhbGx5UmVzb2x2YWJsZSB7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2tleTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueSB7XG4gICAgICAgIGxldCBmaWVsZE5hbWUgPSBjb250ZXh0LnZhbHVlcy5nZXQodGhpcy5fa2V5KTtcblxuICAgICAgICByZXR1cm4gKGlzUHJlc2VudChmaWVsZE5hbWUpICYmIGlzU3RyaW5nKGZpZWxkTmFtZSkpID9cbiAgICAgICAgICAgIFVJTWV0YS5kZWZhdWx0TGFiZWxGb3JJZGVudGlmaWVyKGZpZWxkTmFtZSkgOiBudWxsO1xuICAgIH1cbn1cblxuLyoqXG4gKiBMb2FkIFVzZXIgZGVmaW5lZCBtZXRhIGRhdGEuIFRoaXMgY2xhc3MgaXMgdHJpZ2dlcmVkIGFzIHNvb24gYXMgd2UgY3JlYXRlIGEgY29udGV4dCBhbmRcbiAqIHBhc3MgYW4gb2JqZWN0IGludG8gaXQuIEJhc2VkIG9uIHRoZSBvYmplY3Qgd2Ugbm90aWZ5IGRpZmZlcmVudCBPYnNlcnZlcnMgcGFzc2luZyBuYW1lXG4gKiBvZiB0aGUgY2xhc3MgYW5kIGhlcmUgd2Ugc2VhcmNoIGlmIHdlIGhhdmUgYW55IFJ1bGVzIGF2YWlsYWJsZSBmb3IgY3VycmVudCBjbGFzc05hbWUgYW5kXG4gKiB0cnkgdG8gbG9hZCB0aGUgUnVsZS5cbiAqL1xuY2xhc3MgVXNlck1ldGFEYXRhUHJvdmlkZXIgaW1wbGVtZW50cyBWYWx1ZVF1ZXJpZWRPYnNlcnZlciB7XG5cbiAgICBub3RpZnkobWV0YTogTWV0YSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFSdWxlczogQXJyYXk8SnNvblJ1bGU+O1xuICAgICAgICBsZXQgdWlNZXRhOiBVSU1ldGEgPSA8VUlNZXRhPiBtZXRhO1xuXG4gICAgICAgIGlmICh1aU1ldGEuX3Rlc3RSdWxlcy5oYXModmFsdWUgKyAnUnVsZScpKSB7XG4gICAgICAgICAgICAvLyBzaW5jZSB3ZSBhcmUgaW4gZGV2ZWxvcG1lbnQgbW9kZSBhbmQgdGVzdCBtb2RlIGlzIG9uIHdlIGNhbiBjaGVjayBleHRyYSByZXBvc2l0b3J5XG4gICAgICAgICAgICAvLyB1c2VkIGJ5IHRlc3RzLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGFyZSBub3QgcnVubmluZyB1bml0dGVzdCBhbmQgYSBjbGFzcyBpcyBub3RcbiAgICAgICAgICAgIC8vIGFwcGxpY2F0aW9uIGRlZmluZWQgYnV0IHVuaXR0ZXN0IGRlZmluZWQgcnVsZVxuXG4gICAgICAgICAgICBpZiAodWlNZXRhLl90ZXN0UnVsZXMuaGFzKHZhbHVlICsgJ1J1bGUnKSAmJlxuICAgICAgICAgICAgICAgIGlzUHJlc2VudCh1aU1ldGEuX3Rlc3RSdWxlcy5nZXQodmFsdWUgKyAnUnVsZScpLm9zcykpIHtcbiAgICAgICAgICAgICAgICBhUnVsZXMgPSB1aU1ldGEuX3Rlc3RSdWxlcy5nZXQodmFsdWUgKyAnUnVsZScpLm9zcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGEubG9hZFVzZXJSdWxlKGFSdWxlcywgdmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHVpTWV0YS5hcHBDb25maWcpICYmXG4gICAgICAgICAgICB1aU1ldGEuYXBwQ29uZmlnLmdldChVSU1ldGEuQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0pKSB7XG5cbiAgICAgICAgICAgIGxldCB1c2VyUmVmZXJlbmNlczogYW55W10gPSB1aU1ldGEuYXBwQ29uZmlnLmdldChVSU1ldGEuQXBwQ29uZmlnVXNlclJ1bGVzUGFyYW0pO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHVzZXJSZWZlcmVuY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh1c2VyUmVmZXJlbmNlc1tpXVt2YWx1ZSArICdSdWxlJ10pICYmXG4gICAgICAgICAgICAgICAgICAgIGlzUHJlc2VudCh1c2VyUmVmZXJlbmNlc1tpXVt2YWx1ZSArICdSdWxlJ10ub3NzKSkge1xuICAgICAgICAgICAgICAgICAgICBhUnVsZXMgPSB1c2VyUmVmZXJlbmNlc1tpXVt2YWx1ZSArICdSdWxlJ10ub3NzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGEubG9hZFVzZXJSdWxlKGFSdWxlcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=