/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { assert, BooleanWrapper, FieldPath, isArray, isBlank, isBoolean, isPresent, isString } from '@aribaui/core';
import { Meta, PropertyMap, PropertyMerger_And } from './meta';
import { ObjectMetaContext } from './context';
import { ItemProperties } from './item-properties';
import { Rule, Selector } from './rule';
/**
 * ObjectMeta is resposible for setting up everything related to class, field, actions
 *
 */
var ObjectMeta = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectMeta, _super);
    // todo: implement new decorators in typescript if we want ot annotate _annotationProcessors
    function ObjectMeta() {
        var _this = _super.call(this) || this;
        _this._traitToGroupGeneration = -1;
        _this.registerKeyInitObserver(ObjectMeta.KeyClass, new IntrospectionMetaProvider());
        _this.registerKeyInitObserver(ObjectMeta.KeyType, new FieldTypeIntrospectionMetaProvider());
        // These keys define scopes for their properties
        // These keys define scopes for their properties
        _this.defineKeyAsPropertyScope(ObjectMeta.KeyField);
        _this.defineKeyAsPropertyScope(ObjectMeta.KeyAction);
        _this.defineKeyAsPropertyScope(ObjectMeta.KeyActionCategory);
        _this.defineKeyAsPropertyScope(ObjectMeta.KeyClass);
        // policies for chaining certain well known properties
        // policies for chaining certain well known properties
        _this.registerPropertyMerger(ObjectMeta.KeyVisible, new PropertyMerger_And());
        _this.registerPropertyMerger(ObjectMeta.KeyEditable, new PropertyMerger_And());
        _this.registerPropertyMerger(ObjectMeta.KeyValid, new OMPropertyMerger_Valid());
        _this.registerPropertyMerger(ObjectMeta.KeyClass, Meta.PropertyMerger_DeclareList);
        _this.registerPropertyMerger(ObjectMeta.KeyField, Meta.PropertyMerger_DeclareList);
        _this.registerPropertyMerger(ObjectMeta.KeyAction, Meta.PropertyMerger_DeclareList);
        _this.registerPropertyMerger(ObjectMeta.KeyActionCategory, Meta.PropertyMerger_DeclareList);
        _this.registerPropertyMerger(ObjectMeta.KeyTraitGroup, Meta.PropertyMerger_DeclareList);
        _this.mirrorPropertyToContext(ObjectMeta.KeyClass, ObjectMeta.KeyClass);
        _this.mirrorPropertyToContext(ObjectMeta.KeyType, ObjectMeta.KeyType);
        _this.mirrorPropertyToContext(ObjectMeta.KeyElementType, ObjectMeta.KeyElementType);
        _this.mirrorPropertyToContext(ObjectMeta.KeyTrait, Meta.KeyTrait);
        _this.mirrorPropertyToContext(ObjectMeta.KeyEditable, ObjectMeta.KeyEditable);
        _this.registerValueTransformerForKey(ObjectMeta.KeyObject, Meta.Transformer_KeyPresent);
        // todo: try to support decorators and how we can put meta data into object @Traits,
        // @Properties, @Action
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    ObjectMeta.validationError = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var error = context.propertyForKey(ObjectMeta.KeyValid);
        if (isBlank(error)) {
            return null;
        }
        if (isBoolean(error)) {
            return BooleanWrapper.boleanValue(error) ? null : 'Invalid entry';
        }
        return error.toString();
    };
    /*
     *  Provide subclass context with conveniences for getting object field values
     */
    /**
     * @return {?}
     */
    ObjectMeta.prototype.newContext = /**
     * @return {?}
     */
    function () {
        return new ObjectMetaContext(this, false);
    };
    // Use a special map subsclass for our Properties
    /**
     * @return {?}
     */
    ObjectMeta.prototype.newPropertiesMap = /**
     * @return {?}
     */
    function () {
        return new ObjectMetaPropertyMap();
    };
    /**
     * @param {?} context
     * @param {?} key
     * @return {?}
     */
    ObjectMeta.prototype.itemNames = /**
     * @param {?} context
     * @param {?} key
     * @return {?}
     */
    function (context, key) {
        context.push();
        context.set(ObjectMeta.KeyDeclare, key);
        /** @type {?} */
        var itemsNames = context.listPropertyForKey(key);
        context.pop();
        return itemsNames;
    };
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} filterHidden
     * @return {?}
     */
    ObjectMeta.prototype.itemProperties = /**
     * @param {?} context
     * @param {?} key
     * @param {?} filterHidden
     * @return {?}
     */
    function (context, key, filterHidden) {
        return this.itemPropertiesForNames(context, key, this.itemNames(context, key), filterHidden);
    };
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} itemNames
     * @param {?} filterHidden
     * @return {?}
     */
    ObjectMeta.prototype.itemPropertiesForNames = /**
     * @param {?} context
     * @param {?} key
     * @param {?} itemNames
     * @param {?} filterHidden
     * @return {?}
     */
    function (context, key, itemNames, filterHidden) {
        /** @type {?} */
        var result = [];
        try {
            for (var itemNames_1 = tslib_1.__values(itemNames), itemNames_1_1 = itemNames_1.next(); !itemNames_1_1.done; itemNames_1_1 = itemNames_1.next()) {
                var itemName = itemNames_1_1.value;
                context.push();
                context.set(key, itemName);
                /** @type {?} */
                var isVisible = context.allProperties().get(ObjectMeta.KeyVisible);
                /** @type {?} */
                var visible = context.staticallyResolveValue(isVisible);
                /** @type {?} */
                var isHidden = (isBlank(visible)) || BooleanWrapper.isFalse(visible);
                if (!isHidden || !filterHidden) {
                    result.push(new ItemProperties(itemName, context.allProperties(), isHidden));
                }
                context.pop();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (itemNames_1_1 && !itemNames_1_1.done && (_a = itemNames_1.return)) _a.call(itemNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
        var e_1, _a;
    };
    /**
     * @param {?} trait
     * @return {?}
     */
    ObjectMeta.prototype.groupForTrait = /**
     * @param {?} trait
     * @return {?}
     */
    function (trait) {
        if (this._traitToGroup == null || this._traitToGroupGeneration < this.ruleSetGeneration) {
            this._traitToGroupGeneration = this.ruleSetGeneration;
            this._traitToGroup = new Map();
            /** @type {?} */
            var context = this.newContext();
            try {
                for (var _a = tslib_1.__values(this.itemNames(context, ObjectMeta.KeyTraitGroup)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var group = _b.value;
                    context.push();
                    context.set(ObjectMeta.KeyTraitGroup, group);
                    try {
                        for (var _c = tslib_1.__values(this.itemNames(context, ObjectMeta.KeyTrait)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var name_1 = _d.value;
                            this._traitToGroup.set(name_1, group);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    context.pop();
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return this._traitToGroup.get(trait);
        var e_3, _f, e_2, _e;
    };
    Object.defineProperty(ObjectMeta.prototype, "injector", {
        get: /**
         * @return {?}
         */
        function () {
            return this._injector;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._injector = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectMeta.prototype, "componentRegistry", {
        get: /**
         * @return {?}
         */
        function () {
            return this._componentRegistry;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._componentRegistry = value;
        },
        enumerable: true,
        configurable: true
    });
    ObjectMeta.KeyClass = 'class';
    ObjectMeta.KeyField = 'field';
    ObjectMeta.KeyAction = 'action';
    ObjectMeta.KeyActionCategory = 'actionCategory';
    ObjectMeta.KeyObject = 'object';
    ObjectMeta.KeyValue = 'value';
    ObjectMeta.KeyType = 'type';
    ObjectMeta.KeyElementType = 'elementType';
    ObjectMeta.KeyTraitGroup = 'traitGroup';
    ObjectMeta.KeyVisible = 'visible';
    ObjectMeta.KeyEditable = 'editable';
    ObjectMeta.KeyValid = 'valid';
    ObjectMeta.KeyRank = 'rank';
    ObjectMeta.DefaultActionCategory = 'General';
    ObjectMeta._FieldPathNullMarker = new FieldPath('null');
    return ObjectMeta;
}(Meta));
export { ObjectMeta };
if (false) {
    /** @type {?} */
    ObjectMeta.KeyClass;
    /** @type {?} */
    ObjectMeta.KeyField;
    /** @type {?} */
    ObjectMeta.KeyAction;
    /** @type {?} */
    ObjectMeta.KeyActionCategory;
    /** @type {?} */
    ObjectMeta.KeyObject;
    /** @type {?} */
    ObjectMeta.KeyValue;
    /** @type {?} */
    ObjectMeta.KeyType;
    /** @type {?} */
    ObjectMeta.KeyElementType;
    /** @type {?} */
    ObjectMeta.KeyTraitGroup;
    /** @type {?} */
    ObjectMeta.KeyVisible;
    /** @type {?} */
    ObjectMeta.KeyEditable;
    /** @type {?} */
    ObjectMeta.KeyValid;
    /** @type {?} */
    ObjectMeta.KeyRank;
    /** @type {?} */
    ObjectMeta.DefaultActionCategory;
    /** @type {?} */
    ObjectMeta._FieldPathNullMarker;
    /** @type {?} */
    ObjectMeta.prototype._traitToGroup;
    /** @type {?} */
    ObjectMeta.prototype._traitToGroupGeneration;
    /**
     *  Can inject these directly but want to keep this as much as possible with any angular
     *  dependecies as we will be using these core rule classes outside of UI code
     * @type {?}
     */
    ObjectMeta.prototype._componentRegistry;
    /** @type {?} */
    ObjectMeta.prototype._injector;
}
/**
 * When a class is pushed either directly or indirectly (using deffered rules) we receive a
 * ValueQueriedObserver notification in order to register  types for the object. Trying to achieve
 * at least some kind of introspection we need to implement $proto method inside the object that
 * instantiates all types which we can query.
 *
 * Ideally we want to use decorators when dealing with client side typescript class. but for cases
 * where Rules will be loaded using Rest API along with the object instance its impossible.
 */
var /**
 * When a class is pushed either directly or indirectly (using deffered rules) we receive a
 * ValueQueriedObserver notification in order to register  types for the object. Trying to achieve
 * at least some kind of introspection we need to implement $proto method inside the object that
 * instantiates all types which we can query.
 *
 * Ideally we want to use decorators when dealing with client side typescript class. but for cases
 * where Rules will be loaded using Rest API along with the object instance its impossible.
 */
IntrospectionMetaProvider = /** @class */ (function () {
    function IntrospectionMetaProvider() {
    }
    /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    IntrospectionMetaProvider.prototype.notify = /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (meta, key, value) {
        this._meta = meta;
        /** @type {?} */
        var myObject;
        /** @type {?} */
        var componentRegistry = (/** @type {?} */ (this._meta)).componentRegistry;
        assert(isPresent(componentRegistry), 'Component registry is not initialized');
        /** @type {?} */
        var clazz = null;
        if (isString(value) && (clazz = componentRegistry.nameToType.get(value))
            && isPresent(clazz)) {
            myObject = new clazz();
        }
        else if (isBlank(clazz)) {
            return;
        }
        assert(Meta.className(myObject) === value, 'Trying to process and register a class that does not exists on Context');
        this.registerRulesForClass(myObject, value);
    };
    /**
     * @param {?} object
     * @param {?} className
     * @return {?}
     */
    IntrospectionMetaProvider.prototype.registerRulesForClass = /**
     * @param {?} object
     * @param {?} className
     * @return {?}
     */
    function (object, className) {
        this._meta.keyData(ObjectMeta.KeyClass).setParent(className, 'Object');
        this._meta.beginRuleSet(className);
        try {
            /** @type {?} */
            var selectors = [new Selector(ObjectMeta.KeyClass, className)];
            /** @type {?} */
            var propertyMap = this._meta.newPropertiesMap();
            selectors[0].isDecl = true;
            /** @type {?} */
            var rule = new Rule(selectors, propertyMap, ObjectMeta.ClassRulePriority);
            this._meta.addRule(rule);
            this.registerRulesForFields(object, className);
        }
        finally {
            this._meta.endRuleSet();
        }
    };
    /**
     * @param {?} object
     * @param {?} className
     * @return {?}
     */
    IntrospectionMetaProvider.prototype.registerRulesForFields = /**
     * @param {?} object
     * @param {?} className
     * @return {?}
     */
    function (object, className) {
        // todo: Can we somehow utilize decorators? Maybe for local typescript defined object, but
        // not objects loaded as json from rest API
        assert(isPresent(object['$proto']), 'Cannot register fields without a $proto method that will expose all the fields');
        /** @type {?} */
        var instance = object['$proto']();
        /** @type {?} */
        var fieldNames = Object.keys(instance);
        /** @type {?} */
        var rank = 0;
        try {
            for (var fieldNames_1 = tslib_1.__values(fieldNames), fieldNames_1_1 = fieldNames_1.next(); !fieldNames_1_1.done; fieldNames_1_1 = fieldNames_1.next()) {
                var name_2 = fieldNames_1_1.value;
                /** @type {?} */
                var type = instance[name_2].constructor.name;
                /** @type {?} */
                var properties = new Map();
                properties.set(ObjectMeta.KeyField, name_2);
                properties.set(ObjectMeta.KeyType, type);
                properties.set(ObjectMeta.KeyVisible, true);
                if (isArray(instance[name_2])) {
                    assert(instance[name_2].length > 0, ' Cannot register type[array] and its type without properly initialized ' +
                        'prototype');
                    /** @type {?} */
                    var item = instance[name_2][0];
                    /** @type {?} */
                    var collectionElementType = item.constructor.name;
                    properties.set(ObjectMeta.KeyElementType, collectionElementType);
                }
                /** @type {?} */
                var selectorList = [
                    new Selector(ObjectMeta.KeyClass, className),
                    new Selector(ObjectMeta.KeyField, name_2),
                ];
                selectorList[1].isDecl = true;
                properties.set(ObjectMeta.KeyRank, (rank++ + 1) * 10);
                /** @type {?} */
                var rule = new Rule(selectorList, properties, ObjectMeta.ClassRulePriority);
                this._meta.addRule(rule);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (fieldNames_1_1 && !fieldNames_1_1.done && (_a = fieldNames_1.return)) _a.call(fieldNames_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var e_4, _a;
    };
    return IntrospectionMetaProvider;
}());
/**
 * When a class is pushed either directly or indirectly (using deffered rules) we receive a
 * ValueQueriedObserver notification in order to register  types for the object. Trying to achieve
 * at least some kind of introspection we need to implement $proto method inside the object that
 * instantiates all types which we can query.
 *
 * Ideally we want to use decorators when dealing with client side typescript class. but for cases
 * where Rules will be loaded using Rest API along with the object instance its impossible.
 */
export { IntrospectionMetaProvider };
if (false) {
    /** @type {?} */
    IntrospectionMetaProvider.prototype._meta;
}
/**
 * Registers specials types that we are read during introspections
 */
var /**
 * Registers specials types that we are read during introspections
 */
FieldTypeIntrospectionMetaProvider = /** @class */ (function () {
    function FieldTypeIntrospectionMetaProvider() {
    }
    /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    FieldTypeIntrospectionMetaProvider.prototype.notify = /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (meta, key, value) {
        // print('FieldTypeIntrospectionMetaProvider notified of first use of field:  ' , value);
    };
    return FieldTypeIntrospectionMetaProvider;
}());
/**
 * Registers specials types that we are read during introspections
 */
export { FieldTypeIntrospectionMetaProvider };
var ObjectMetaPropertyMap = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectMetaPropertyMap, _super);
    function ObjectMetaPropertyMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ObjectMetaPropertyMap.prototype, "fieldPath", {
        get: /**
         * @return {?}
         */
        function () {
            if (isBlank(this._fieldPath)) {
                /** @type {?} */
                var value = this.get(ObjectMeta.KeyValue);
                /** @type {?} */
                var fieldName = this.get(ObjectMeta.KeyField);
                this._fieldPath = (isPresent(fieldName) && isBlank(value))
                    ? new FieldPath(fieldName)
                    : ObjectMeta._FieldPathNullMarker;
            }
            /** @type {?} */
            var isNullPath = this._fieldPath === ObjectMeta._FieldPathNullMarker;
            return isNullPath ? null : this._fieldPath;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    ObjectMetaPropertyMap.prototype.isFieldNullMarker = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return isPresent(value) && value.path === 'null';
    };
    return ObjectMetaPropertyMap;
}(PropertyMap));
export { ObjectMetaPropertyMap };
if (false) {
    /** @type {?} */
    ObjectMetaPropertyMap.prototype._fieldPath;
}
var OMPropertyMerger_Valid = /** @class */ (function () {
    function OMPropertyMerger_Valid() {
        this.isPropMergerIsChainingMark = true;
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    OMPropertyMerger_Valid.prototype.merge = /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    function (orig, override, isDeclare) {
        // if first is error (error message or false, it wins), otherwise second
        return (isString(override) || (isBoolean(override) && BooleanWrapper.isFalse(override))) ? override : orig;
    };
    /**
     * @return {?}
     */
    OMPropertyMerger_Valid.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'VALIDATE';
    };
    return OMPropertyMerger_Valid;
}());
export { OMPropertyMerger_Valid };
if (false) {
    /** @type {?} */
    OMPropertyMerger_Valid.prototype._meta;
    /** @type {?} */
    OMPropertyMerger_Valid.prototype.isPropMergerIsChainingMark;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LW1ldGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL29iamVjdC1tZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxNQUFNLEVBQ04sY0FBYyxFQUNkLFNBQVMsRUFDVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxTQUFTLEVBQ1QsUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDSCxJQUFJLEVBQ0osV0FBVyxFQUVYLGtCQUFrQixFQUdyQixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQVUsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDckQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7SUFNTixzQ0FBSTtJQTJDaEMsNEZBQTRGO0lBRTVGO1FBQUEsWUFDSSxpQkFBTyxTQWdDVjt3Q0ExRGlDLENBQUMsQ0FBQztRQTRCaEMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7UUFDbkYsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxrQ0FBa0MsRUFBRSxDQUFDLENBQUM7O1FBRzNGLEFBREEsZ0RBQWdEO1FBQ2hELEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsS0FBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxLQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsS0FBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxRQUFRLENB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QUMsQ0FBQyxJQUFJLENBQUM7S0FDckM7Ozs7SUFHRCx5Q0FBUTs7O0lBQVI7UUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDO0tBQ3JCO2lDQXhXTDtJQXlXQyxDQUFBO0FBZkQsa0NBZUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0b3IsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBhc3NlcnQsXG4gICAgQm9vbGVhbldyYXBwZXIsXG4gICAgRmllbGRQYXRoLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc0Jvb2xlYW4sXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5pbXBvcnQge1xuICAgIE1ldGEsXG4gICAgUHJvcGVydHlNYXAsXG4gICAgUHJvcGVydHlNZXJnZXIsXG4gICAgUHJvcGVydHlNZXJnZXJfQW5kLFxuICAgIFByb3BlcnR5TWVyZ2VySXNDaGFpbmluZyxcbiAgICBWYWx1ZVF1ZXJpZWRPYnNlcnZlclxufSBmcm9tICcuL21ldGEnO1xuaW1wb3J0IHtDb250ZXh0LCBPYmplY3RNZXRhQ29udGV4dH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4vaXRlbS1wcm9wZXJ0aWVzJztcbmltcG9ydCB7UnVsZSwgU2VsZWN0b3J9IGZyb20gJy4vcnVsZSc7XG5cbi8qKlxuICogT2JqZWN0TWV0YSBpcyByZXNwb3NpYmxlIGZvciBzZXR0aW5nIHVwIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byBjbGFzcywgZmllbGQsIGFjdGlvbnNcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RNZXRhIGV4dGVuZHMgTWV0YSB7XG4gICAgc3RhdGljIEtleUNsYXNzID0gJ2NsYXNzJztcbiAgICBzdGF0aWMgS2V5RmllbGQgPSAnZmllbGQnO1xuICAgIHN0YXRpYyBLZXlBY3Rpb24gPSAnYWN0aW9uJztcbiAgICBzdGF0aWMgS2V5QWN0aW9uQ2F0ZWdvcnkgPSAnYWN0aW9uQ2F0ZWdvcnknO1xuICAgIHN0YXRpYyBLZXlPYmplY3QgPSAnb2JqZWN0JztcbiAgICBzdGF0aWMgS2V5VmFsdWUgPSAndmFsdWUnO1xuICAgIHN0YXRpYyBLZXlUeXBlID0gJ3R5cGUnO1xuICAgIHN0YXRpYyBLZXlFbGVtZW50VHlwZSA9ICdlbGVtZW50VHlwZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEtleVRyYWl0R3JvdXAgPSAndHJhaXRHcm91cCc7XG4gICAgc3RhdGljIEtleVZpc2libGUgPSAndmlzaWJsZSc7XG4gICAgc3RhdGljIEtleUVkaXRhYmxlID0gJ2VkaXRhYmxlJztcbiAgICBzdGF0aWMgS2V5VmFsaWQgPSAndmFsaWQnO1xuICAgIHN0YXRpYyBLZXlSYW5rID0gJ3JhbmsnO1xuICAgIHN0YXRpYyByZWFkb25seSBEZWZhdWx0QWN0aW9uQ2F0ZWdvcnkgPSAnR2VuZXJhbCc7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgX0ZpZWxkUGF0aE51bGxNYXJrZXIgPSBuZXcgRmllbGRQYXRoKCdudWxsJyk7XG5cblxuICAgIF90cmFpdFRvR3JvdXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XG4gICAgX3RyYWl0VG9Hcm91cEdlbmVyYXRpb246IG51bWJlciA9IC0xO1xuXG5cbiAgICAvKipcbiAgICAgKiAgQ2FuIGluamVjdCB0aGVzZSBkaXJlY3RseSBidXQgd2FudCB0byBrZWVwIHRoaXMgYXMgbXVjaCBhcyBwb3NzaWJsZSB3aXRoIGFueSBhbmd1bGFyXG4gICAgICogIGRlcGVuZGVjaWVzIGFzIHdlIHdpbGwgYmUgdXNpbmcgdGhlc2UgY29yZSBydWxlIGNsYXNzZXMgb3V0c2lkZSBvZiBVSSBjb2RlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9jb21wb25lbnRSZWdpc3RyeTogQ29tcG9uZW50UmVnaXN0cnk7XG4gICAgcHJvdGVjdGVkIF9pbmplY3RvcjogSW5qZWN0b3I7XG5cblxuICAgIHN0YXRpYyB2YWxpZGF0aW9uRXJyb3IoY29udGV4dDogQ29udGV4dCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBlcnJvciA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoT2JqZWN0TWV0YS5LZXlWYWxpZCk7XG4gICAgICAgIGlmIChpc0JsYW5rKGVycm9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCb29sZWFuKGVycm9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKGVycm9yKSA/IG51bGwgOiAnSW52YWxpZCBlbnRyeSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9yLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy8gdG9kbzogaW1wbGVtZW50IG5ldyBkZWNvcmF0b3JzIGluIHR5cGVzY3JpcHQgaWYgd2Ugd2FudCBvdCBhbm5vdGF0ZSBfYW5ub3RhdGlvblByb2Nlc3NvcnNcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJLZXlJbml0T2JzZXJ2ZXIoT2JqZWN0TWV0YS5LZXlDbGFzcywgbmV3IEludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJLZXlJbml0T2JzZXJ2ZXIoT2JqZWN0TWV0YS5LZXlUeXBlLCBuZXcgRmllbGRUeXBlSW50cm9zcGVjdGlvbk1ldGFQcm92aWRlcigpKTtcblxuICAgICAgICAvLyBUaGVzZSBrZXlzIGRlZmluZSBzY29wZXMgZm9yIHRoZWlyIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5kZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoT2JqZWN0TWV0YS5LZXlGaWVsZCk7XG4gICAgICAgIHRoaXMuZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKE9iamVjdE1ldGEuS2V5QWN0aW9uKTtcbiAgICAgICAgdGhpcy5kZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSk7XG4gICAgICAgIHRoaXMuZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKE9iamVjdE1ldGEuS2V5Q2xhc3MpO1xuXG4gICAgICAgIC8vIHBvbGljaWVzIGZvciBjaGFpbmluZyBjZXJ0YWluIHdlbGwga25vd24gcHJvcGVydGllc1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlWaXNpYmxlLCBuZXcgUHJvcGVydHlNZXJnZXJfQW5kKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlFZGl0YWJsZSwgbmV3IFByb3BlcnR5TWVyZ2VyX0FuZCgpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5VmFsaWQsIG5ldyBPTVByb3BlcnR5TWVyZ2VyX1ZhbGlkKCkpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleUNsYXNzLCBNZXRhLlByb3BlcnR5TWVyZ2VyX0RlY2xhcmVMaXN0KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5RmllbGQsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlBY3Rpb24sIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleVRyYWl0R3JvdXAsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuXG4gICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoT2JqZWN0TWV0YS5LZXlDbGFzcywgT2JqZWN0TWV0YS5LZXlDbGFzcyk7XG4gICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoT2JqZWN0TWV0YS5LZXlUeXBlLCBPYmplY3RNZXRhLktleVR5cGUpO1xuICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KE9iamVjdE1ldGEuS2V5RWxlbWVudFR5cGUsIE9iamVjdE1ldGEuS2V5RWxlbWVudFR5cGUpO1xuICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KE9iamVjdE1ldGEuS2V5VHJhaXQsIE1ldGEuS2V5VHJhaXQpO1xuICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KE9iamVjdE1ldGEuS2V5RWRpdGFibGUsIE9iamVjdE1ldGEuS2V5RWRpdGFibGUpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJWYWx1ZVRyYW5zZm9ybWVyRm9yS2V5KE9iamVjdE1ldGEuS2V5T2JqZWN0LCBNZXRhLlRyYW5zZm9ybWVyX0tleVByZXNlbnQpO1xuXG4gICAgICAgIC8vIHRvZG86IHRyeSB0byBzdXBwb3J0IGRlY29yYXRvcnMgYW5kIGhvdyB3ZSBjYW4gcHV0IG1ldGEgZGF0YSBpbnRvIG9iamVjdCBAVHJhaXRzLFxuICAgICAgICAvLyBAUHJvcGVydGllcywgQEFjdGlvblxuICAgIH1cblxuXG4gICAgLypcbiAgICAgKiAgUHJvdmlkZSBzdWJjbGFzcyBjb250ZXh0IHdpdGggY29udmVuaWVuY2VzIGZvciBnZXR0aW5nIG9iamVjdCBmaWVsZCB2YWx1ZXNcbiAgICAgKi9cbiAgICBuZXdDb250ZXh0KCk6IENvbnRleHQge1xuICAgICAgICByZXR1cm4gbmV3IE9iamVjdE1ldGFDb250ZXh0KHRoaXMsIGZhbHNlKTtcbiAgICB9XG5cblxuICAgIC8vIFVzZSBhIHNwZWNpYWwgbWFwIHN1YnNjbGFzcyBmb3Igb3VyIFByb3BlcnRpZXNcbiAgICBuZXdQcm9wZXJ0aWVzTWFwKCk6IFByb3BlcnR5TWFwIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYmplY3RNZXRhUHJvcGVydHlNYXAoKTtcbiAgICB9XG5cbiAgICBpdGVtTmFtZXMoY29udGV4dDogQ29udGV4dCwga2V5OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIGNvbnRleHQuc2V0KE9iamVjdE1ldGEuS2V5RGVjbGFyZSwga2V5KTtcbiAgICAgICAgbGV0IGl0ZW1zTmFtZXMgPSBjb250ZXh0Lmxpc3RQcm9wZXJ0eUZvcktleShrZXkpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgICAgIHJldHVybiBpdGVtc05hbWVzO1xuICAgIH1cblxuXG4gICAgaXRlbVByb3BlcnRpZXMoY29udGV4dDogQ29udGV4dCwga2V5OiBzdHJpbmcsIGZpbHRlckhpZGRlbjogYm9vbGVhbik6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1Qcm9wZXJ0aWVzRm9yTmFtZXMoY29udGV4dCwga2V5LCB0aGlzLml0ZW1OYW1lcyhjb250ZXh0LCBrZXkpLFxuICAgICAgICAgICAgZmlsdGVySGlkZGVuKTtcbiAgICB9XG5cbiAgICBpdGVtUHJvcGVydGllc0Zvck5hbWVzKGNvbnRleHQ6IENvbnRleHQsIGtleTogc3RyaW5nLCBpdGVtTmFtZXM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySGlkZGVuOiBib29sZWFuKTogQXJyYXk8SXRlbVByb3BlcnRpZXM+IHtcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8SXRlbVByb3BlcnRpZXM+ID0gW107XG4gICAgICAgIGZvciAobGV0IGl0ZW1OYW1lIG9mIGl0ZW1OYW1lcykge1xuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChrZXksIGl0ZW1OYW1lKTtcblxuICAgICAgICAgICAgbGV0IGlzVmlzaWJsZSA9IGNvbnRleHQuYWxsUHJvcGVydGllcygpLmdldChPYmplY3RNZXRhLktleVZpc2libGUpO1xuICAgICAgICAgICAgbGV0IHZpc2libGUgPSBjb250ZXh0LnN0YXRpY2FsbHlSZXNvbHZlVmFsdWUoaXNWaXNpYmxlKTtcblxuICAgICAgICAgICAgbGV0IGlzSGlkZGVuID0gKGlzQmxhbmsodmlzaWJsZSkpIHx8IEJvb2xlYW5XcmFwcGVyLmlzRmFsc2UodmlzaWJsZSk7XG5cbiAgICAgICAgICAgIGlmICghaXNIaWRkZW4gfHwgIWZpbHRlckhpZGRlbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBJdGVtUHJvcGVydGllcyhpdGVtTmFtZSwgY29udGV4dC5hbGxQcm9wZXJ0aWVzKCksIGlzSGlkZGVuKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBncm91cEZvclRyYWl0KHRyYWl0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5fdHJhaXRUb0dyb3VwID09IG51bGwgfHwgdGhpcy5fdHJhaXRUb0dyb3VwR2VuZXJhdGlvbiA8IHRoaXMucnVsZVNldEdlbmVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3RyYWl0VG9Hcm91cEdlbmVyYXRpb24gPSB0aGlzLnJ1bGVTZXRHZW5lcmF0aW9uO1xuICAgICAgICAgICAgdGhpcy5fdHJhaXRUb0dyb3VwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm5ld0NvbnRleHQoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwIG9mIHRoaXMuaXRlbU5hbWVzKGNvbnRleHQsIE9iamVjdE1ldGEuS2V5VHJhaXRHcm91cCkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNldChPYmplY3RNZXRhLktleVRyYWl0R3JvdXAsIGdyb3VwKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IG5hbWUgb2YgdGhpcy5pdGVtTmFtZXMoY29udGV4dCwgT2JqZWN0TWV0YS5LZXlUcmFpdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhaXRUb0dyb3VwLnNldChuYW1lLCBncm91cCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWl0VG9Hcm91cC5nZXQodHJhaXQpO1xuICAgIH1cblxuICAgIHNldCBpbmplY3Rvcih2YWx1ZTogSW5qZWN0b3IpIHtcbiAgICAgICAgdGhpcy5faW5qZWN0b3IgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmplY3RvcjtcbiAgICB9XG5cbiAgICBnZXQgY29tcG9uZW50UmVnaXN0cnkoKTogQ29tcG9uZW50UmVnaXN0cnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50UmVnaXN0cnk7XG4gICAgfVxuXG4gICAgc2V0IGNvbXBvbmVudFJlZ2lzdHJ5KHZhbHVlOiBDb21wb25lbnRSZWdpc3RyeSkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRSZWdpc3RyeSA9IHZhbHVlO1xuICAgIH1cbn1cblxuLyoqXG4gKiBXaGVuIGEgY2xhc3MgaXMgcHVzaGVkIGVpdGhlciBkaXJlY3RseSBvciBpbmRpcmVjdGx5ICh1c2luZyBkZWZmZXJlZCBydWxlcykgd2UgcmVjZWl2ZSBhXG4gKiBWYWx1ZVF1ZXJpZWRPYnNlcnZlciBub3RpZmljYXRpb24gaW4gb3JkZXIgdG8gcmVnaXN0ZXIgIHR5cGVzIGZvciB0aGUgb2JqZWN0LiBUcnlpbmcgdG8gYWNoaWV2ZVxuICogYXQgbGVhc3Qgc29tZSBraW5kIG9mIGludHJvc3BlY3Rpb24gd2UgbmVlZCB0byBpbXBsZW1lbnQgJHByb3RvIG1ldGhvZCBpbnNpZGUgdGhlIG9iamVjdCB0aGF0XG4gKiBpbnN0YW50aWF0ZXMgYWxsIHR5cGVzIHdoaWNoIHdlIGNhbiBxdWVyeS5cbiAqXG4gKiBJZGVhbGx5IHdlIHdhbnQgdG8gdXNlIGRlY29yYXRvcnMgd2hlbiBkZWFsaW5nIHdpdGggY2xpZW50IHNpZGUgdHlwZXNjcmlwdCBjbGFzcy4gYnV0IGZvciBjYXNlc1xuICogd2hlcmUgUnVsZXMgd2lsbCBiZSBsb2FkZWQgdXNpbmcgUmVzdCBBUEkgYWxvbmcgd2l0aCB0aGUgb2JqZWN0IGluc3RhbmNlIGl0cyBpbXBvc3NpYmxlLlxuICovXG5leHBvcnQgY2xhc3MgSW50cm9zcGVjdGlvbk1ldGFQcm92aWRlciBpbXBsZW1lbnRzIFZhbHVlUXVlcmllZE9ic2VydmVyIHtcbiAgICBwcml2YXRlIF9tZXRhOiBNZXRhO1xuXG4gICAgbm90aWZ5KG1ldGE6IE1ldGEsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21ldGEgPSBtZXRhO1xuICAgICAgICBsZXQgbXlPYmplY3Q7XG5cbiAgICAgICAgbGV0IGNvbXBvbmVudFJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeSA9ICg8T2JqZWN0TWV0YT50aGlzLl9tZXRhKS5jb21wb25lbnRSZWdpc3RyeTtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChjb21wb25lbnRSZWdpc3RyeSksXG4gICAgICAgICAgICAnQ29tcG9uZW50IHJlZ2lzdHJ5IGlzIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgICAgIGxldCBjbGF6ejogVHlwZTxhbnk+ID0gbnVsbDtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSAmJiAoY2xhenogPSBjb21wb25lbnRSZWdpc3RyeS5uYW1lVG9UeXBlLmdldCh2YWx1ZSkpXG4gICAgICAgICAgICAmJiBpc1ByZXNlbnQoY2xhenopKSB7XG4gICAgICAgICAgICBteU9iamVjdCA9IG5ldyBjbGF6eigpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQmxhbmsoY2xhenopKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlcnQoTWV0YS5jbGFzc05hbWUobXlPYmplY3QpID09PSB2YWx1ZSxcbiAgICAgICAgICAgICdUcnlpbmcgdG8gcHJvY2VzcyBhbmQgcmVnaXN0ZXIgYSBjbGFzcyB0aGF0IGRvZXMgbm90IGV4aXN0cyBvbiBDb250ZXh0Jyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSdWxlc0ZvckNsYXNzKG15T2JqZWN0LCB2YWx1ZSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyUnVsZXNGb3JDbGFzcyhvYmplY3Q6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWV0YS5rZXlEYXRhKE9iamVjdE1ldGEuS2V5Q2xhc3MpLnNldFBhcmVudChjbGFzc05hbWUsICdPYmplY3QnKTtcblxuICAgICAgICB0aGlzLl9tZXRhLmJlZ2luUnVsZVNldChjbGFzc05hbWUpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0b3JzOiBBcnJheTxTZWxlY3Rvcj4gPSBbbmV3IFNlbGVjdG9yKE9iamVjdE1ldGEuS2V5Q2xhc3MsIGNsYXNzTmFtZSldO1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5TWFwID0gdGhpcy5fbWV0YS5uZXdQcm9wZXJ0aWVzTWFwKCk7XG4gICAgICAgICAgICBzZWxlY3RvcnNbMF0uaXNEZWNsID0gdHJ1ZTtcblxuICAgICAgICAgICAgbGV0IHJ1bGU6IFJ1bGUgPSBuZXcgUnVsZShzZWxlY3RvcnMsIHByb3BlcnR5TWFwLCBPYmplY3RNZXRhLkNsYXNzUnVsZVByaW9yaXR5KTtcbiAgICAgICAgICAgIHRoaXMuX21ldGEuYWRkUnVsZShydWxlKTtcblxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclJ1bGVzRm9yRmllbGRzKG9iamVjdCwgY2xhc3NOYW1lKTtcblxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fbWV0YS5lbmRSdWxlU2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgcmVnaXN0ZXJSdWxlc0ZvckZpZWxkcyhvYmplY3Q6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gdG9kbzogQ2FuIHdlIHNvbWVob3cgdXRpbGl6ZSBkZWNvcmF0b3JzPyBNYXliZSBmb3IgbG9jYWwgdHlwZXNjcmlwdCBkZWZpbmVkIG9iamVjdCwgYnV0XG4gICAgICAgIC8vIG5vdCBvYmplY3RzIGxvYWRlZCBhcyBqc29uIGZyb20gcmVzdCBBUElcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChvYmplY3RbJyRwcm90byddKSxcbiAgICAgICAgICAgICdDYW5ub3QgcmVnaXN0ZXIgZmllbGRzIHdpdGhvdXQgYSAkcHJvdG8gbWV0aG9kIHRoYXQgd2lsbCBleHBvc2UgYWxsIHRoZSBmaWVsZHMnKTtcbiAgICAgICAgbGV0IGluc3RhbmNlOiBhbnkgPSBvYmplY3RbJyRwcm90byddKCk7XG4gICAgICAgIGxldCBmaWVsZE5hbWVzID0gT2JqZWN0LmtleXMoaW5zdGFuY2UpO1xuXG4gICAgICAgIGxldCByYW5rID0gMDtcbiAgICAgICAgZm9yIChsZXQgbmFtZSBvZiBmaWVsZE5hbWVzKSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBjaGVjaz0+ICBjYW4gd2UgcmVseSBvbiB0aGlzID9cbiAgICAgICAgICAgIGxldCB0eXBlID0gaW5zdGFuY2VbbmFtZV0uY29uc3RydWN0b3IubmFtZTtcblxuICAgICAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnNldChPYmplY3RNZXRhLktleUZpZWxkLCBuYW1lKTtcbiAgICAgICAgICAgIHByb3BlcnRpZXMuc2V0KE9iamVjdE1ldGEuS2V5VHlwZSwgdHlwZSk7XG5cbiAgICAgICAgICAgIHByb3BlcnRpZXMuc2V0KE9iamVjdE1ldGEuS2V5VmlzaWJsZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5KGluc3RhbmNlW25hbWVdKSkge1xuICAgICAgICAgICAgICAgIGFzc2VydChpbnN0YW5jZVtuYW1lXS5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgICAgICAnIENhbm5vdCByZWdpc3RlciB0eXBlW2FycmF5XSBhbmQgaXRzIHR5cGUgd2l0aG91dCBwcm9wZXJseSBpbml0aWFsaXplZCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3Byb3RvdHlwZScpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaW5zdGFuY2VbbmFtZV1bMF07XG4gICAgICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb25FbGVtZW50VHlwZSA9IGl0ZW0uY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnNldChPYmplY3RNZXRhLktleUVsZW1lbnRUeXBlLCBjb2xsZWN0aW9uRWxlbWVudFR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2VsZWN0b3JMaXN0OiBBcnJheTxTZWxlY3Rvcj4gPSBbXG4gICAgICAgICAgICAgICAgbmV3IFNlbGVjdG9yKE9iamVjdE1ldGEuS2V5Q2xhc3MsIGNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgbmV3IFNlbGVjdG9yKE9iamVjdE1ldGEuS2V5RmllbGQsIG5hbWUpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHNlbGVjdG9yTGlzdFsxXS5pc0RlY2wgPSB0cnVlO1xuICAgICAgICAgICAgcHJvcGVydGllcy5zZXQoT2JqZWN0TWV0YS5LZXlSYW5rLCAocmFuaysrICsgMSkgKiAxMCk7XG5cbiAgICAgICAgICAgIGxldCBydWxlOiBSdWxlID0gbmV3IFJ1bGUoc2VsZWN0b3JMaXN0LCBwcm9wZXJ0aWVzLCBPYmplY3RNZXRhLkNsYXNzUnVsZVByaW9yaXR5KTtcbiAgICAgICAgICAgIHRoaXMuX21ldGEuYWRkUnVsZShydWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBSZWdpc3RlcnMgc3BlY2lhbHMgdHlwZXMgdGhhdCB3ZSBhcmUgcmVhZCBkdXJpbmcgaW50cm9zcGVjdGlvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkVHlwZUludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIgaW1wbGVtZW50cyBWYWx1ZVF1ZXJpZWRPYnNlcnZlciB7XG5cbiAgICBub3RpZnkobWV0YTogTWV0YSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgLy8gcHJpbnQoJ0ZpZWxkVHlwZUludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIgbm90aWZpZWQgb2YgZmlyc3QgdXNlIG9mIGZpZWxkOiAgJyAsIHZhbHVlKTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgT2JqZWN0TWV0YVByb3BlcnR5TWFwIGV4dGVuZHMgUHJvcGVydHlNYXAge1xuICAgIHByaXZhdGUgX2ZpZWxkUGF0aDogRmllbGRQYXRoO1xuXG5cbiAgICBnZXQgZmllbGRQYXRoKCk6IEZpZWxkUGF0aCB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2ZpZWxkUGF0aCkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0KE9iamVjdE1ldGEuS2V5VmFsdWUpO1xuICAgICAgICAgICAgbGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0KE9iamVjdE1ldGEuS2V5RmllbGQpO1xuXG4gICAgICAgICAgICB0aGlzLl9maWVsZFBhdGggPSAoaXNQcmVzZW50KGZpZWxkTmFtZSkgJiYgaXNCbGFuayh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgPyBuZXcgRmllbGRQYXRoKGZpZWxkTmFtZSlcbiAgICAgICAgICAgICAgICA6IE9iamVjdE1ldGEuX0ZpZWxkUGF0aE51bGxNYXJrZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlzTnVsbFBhdGggPSB0aGlzLl9maWVsZFBhdGggPT09IE9iamVjdE1ldGEuX0ZpZWxkUGF0aE51bGxNYXJrZXI7XG4gICAgICAgIHJldHVybiBpc051bGxQYXRoID8gbnVsbCA6IHRoaXMuX2ZpZWxkUGF0aDtcbiAgICB9XG5cbiAgICBpc0ZpZWxkTnVsbE1hcmtlcih2YWx1ZTogRmllbGRQYXRoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodmFsdWUpICYmIHZhbHVlLnBhdGggPT09ICdudWxsJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE9NUHJvcGVydHlNZXJnZXJfVmFsaWQgaW1wbGVtZW50cyBQcm9wZXJ0eU1lcmdlciwgUHJvcGVydHlNZXJnZXJJc0NoYWluaW5nIHtcbiAgICBfbWV0YTogTWV0YTtcbiAgICBpc1Byb3BNZXJnZXJJc0NoYWluaW5nTWFyazogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIG1lcmdlKG9yaWc6IGFueSwgb3ZlcnJpZGU6IGFueSwgaXNEZWNsYXJlOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgLy8gaWYgZmlyc3QgaXMgZXJyb3IgKGVycm9yIG1lc3NhZ2Ugb3IgZmFsc2UsIGl0IHdpbnMpLCBvdGhlcndpc2Ugc2Vjb25kXG4gICAgICAgIHJldHVybiAoaXNTdHJpbmcob3ZlcnJpZGUpIHx8IChpc0Jvb2xlYW4ob3ZlcnJpZGUpICYmIEJvb2xlYW5XcmFwcGVyLmlzRmFsc2UoXG4gICAgICAgICAgICBvdmVycmlkZSkpKSA/IG92ZXJyaWRlIDogb3JpZztcbiAgICB9XG5cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gJ1ZBTElEQVRFJztcbiAgICB9XG59XG5cblxuIl19