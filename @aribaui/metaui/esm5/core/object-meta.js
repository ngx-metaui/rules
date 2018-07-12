/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ error = context.propertyForKey(ObjectMeta.KeyValid);
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
        var /** @type {?} */ itemsNames = context.listPropertyForKey(key);
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
        var /** @type {?} */ result = [];
        try {
            for (var itemNames_1 = tslib_1.__values(itemNames), itemNames_1_1 = itemNames_1.next(); !itemNames_1_1.done; itemNames_1_1 = itemNames_1.next()) {
                var itemName = itemNames_1_1.value;
                context.push();
                context.set(key, itemName);
                var /** @type {?} */ isVisible = context.allProperties().get(ObjectMeta.KeyVisible);
                var /** @type {?} */ visible = context.staticallyResolveValue(isVisible);
                var /** @type {?} */ isHidden = (isBlank(visible)) || BooleanWrapper.isFalse(visible);
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
            var /** @type {?} */ context = this.newContext();
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
function ObjectMeta_tsickle_Closure_declarations() {
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
        var /** @type {?} */ myObject;
        var /** @type {?} */ componentRegistry = (/** @type {?} */ (this._meta)).componentRegistry;
        assert(isPresent(componentRegistry), 'Component registry is not initialized');
        var /** @type {?} */ clazz = null;
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
            var /** @type {?} */ selectors = [new Selector(ObjectMeta.KeyClass, className)];
            var /** @type {?} */ propertyMap = this._meta.newPropertiesMap();
            selectors[0].isDecl = true;
            var /** @type {?} */ rule = new Rule(selectors, propertyMap, ObjectMeta.ClassRulePriority);
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
        var /** @type {?} */ instance = object['$proto']();
        var /** @type {?} */ fieldNames = Object.keys(instance);
        var /** @type {?} */ rank = 0;
        try {
            for (var fieldNames_1 = tslib_1.__values(fieldNames), fieldNames_1_1 = fieldNames_1.next(); !fieldNames_1_1.done; fieldNames_1_1 = fieldNames_1.next()) {
                var name_2 = fieldNames_1_1.value;
                // todo: check=>  can we rely on this ?
                var /** @type {?} */ type = instance[name_2].constructor.name;
                var /** @type {?} */ properties = new Map();
                properties.set(ObjectMeta.KeyField, name_2);
                properties.set(ObjectMeta.KeyType, type);
                properties.set(ObjectMeta.KeyVisible, true);
                if (isArray(instance[name_2])) {
                    assert(instance[name_2].length > 0, ' Cannot register type[array] and its type without properly initialized ' +
                        'prototype');
                    var /** @type {?} */ item = instance[name_2][0];
                    var /** @type {?} */ collectionElementType = item.constructor.name;
                    properties.set(ObjectMeta.KeyElementType, collectionElementType);
                }
                var /** @type {?} */ selectorList = [
                    new Selector(ObjectMeta.KeyClass, className),
                    new Selector(ObjectMeta.KeyField, name_2),
                ];
                selectorList[1].isDecl = true;
                properties.set(ObjectMeta.KeyRank, (rank++ + 1) * 10);
                var /** @type {?} */ rule = new Rule(selectorList, properties, ObjectMeta.ClassRulePriority);
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
function IntrospectionMetaProvider_tsickle_Closure_declarations() {
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
                var /** @type {?} */ value = this.get(ObjectMeta.KeyValue);
                var /** @type {?} */ fieldName = this.get(ObjectMeta.KeyField);
                this._fieldPath = (isPresent(fieldName) && isBlank(value))
                    ? new FieldPath(fieldName)
                    : ObjectMeta._FieldPathNullMarker;
            }
            var /** @type {?} */ isNullPath = this._fieldPath === ObjectMeta._FieldPathNullMarker;
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
function ObjectMetaPropertyMap_tsickle_Closure_declarations() {
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
function OMPropertyMerger_Valid_tsickle_Closure_declarations() {
    /** @type {?} */
    OMPropertyMerger_Valid.prototype._meta;
    /** @type {?} */
    OMPropertyMerger_Valid.prototype.isPropMergerIsChainingMark;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LW1ldGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL29iamVjdC1tZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxNQUFNLEVBQ04sY0FBYyxFQUNkLFNBQVMsRUFDVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFNBQVMsRUFDVCxTQUFTLEVBQ1QsUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDSCxJQUFJLEVBQ0osV0FBVyxFQUVYLGtCQUFrQixFQUdyQixNQUFNLFFBQVEsQ0FBQztBQUNoQixPQUFPLEVBQVUsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDckQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7SUFNTixzQ0FBSTtJQTJDaEMsNEZBQTRGO0lBRTVGO1FBQUEsWUFDSSxpQkFBTyxTQWdDVjt3Q0ExRGlDLENBQUMsQ0FBQztRQTRCaEMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7UUFDbkYsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxrQ0FBa0MsRUFBRSxDQUFDLENBQUM7O1FBRzNGLEFBREEsZ0RBQWdEO1FBQ2hELEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsS0FBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxLQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsS0FBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxRQUFRLENB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QUFDLENBQUMsSUFBSSxDQUFDO0tBQ3JDOzs7O0lBR0QseUNBQVE7OztJQUFSO1FBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUNyQjtpQ0F4V0w7SUF5V0MsQ0FBQTtBQWZELGtDQWVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge0luamVjdG9yLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgYXNzZXJ0LFxuICAgIEJvb2xlYW5XcmFwcGVyLFxuICAgIEZpZWxkUGF0aCxcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNCb29sZWFuLFxuICAgIGlzUHJlc2VudCxcbiAgICBpc1N0cmluZ1xufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJ0BhcmliYXVpL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgICBNZXRhLFxuICAgIFByb3BlcnR5TWFwLFxuICAgIFByb3BlcnR5TWVyZ2VyLFxuICAgIFByb3BlcnR5TWVyZ2VyX0FuZCxcbiAgICBQcm9wZXJ0eU1lcmdlcklzQ2hhaW5pbmcsXG4gICAgVmFsdWVRdWVyaWVkT2JzZXJ2ZXJcbn0gZnJvbSAnLi9tZXRhJztcbmltcG9ydCB7Q29udGV4dCwgT2JqZWN0TWV0YUNvbnRleHR9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQge0l0ZW1Qcm9wZXJ0aWVzfSBmcm9tICcuL2l0ZW0tcHJvcGVydGllcyc7XG5pbXBvcnQge1J1bGUsIFNlbGVjdG9yfSBmcm9tICcuL3J1bGUnO1xuXG4vKipcbiAqIE9iamVjdE1ldGEgaXMgcmVzcG9zaWJsZSBmb3Igc2V0dGluZyB1cCBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gY2xhc3MsIGZpZWxkLCBhY3Rpb25zXG4gKlxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0TWV0YSBleHRlbmRzIE1ldGEge1xuICAgIHN0YXRpYyBLZXlDbGFzcyA9ICdjbGFzcyc7XG4gICAgc3RhdGljIEtleUZpZWxkID0gJ2ZpZWxkJztcbiAgICBzdGF0aWMgS2V5QWN0aW9uID0gJ2FjdGlvbic7XG4gICAgc3RhdGljIEtleUFjdGlvbkNhdGVnb3J5ID0gJ2FjdGlvbkNhdGVnb3J5JztcbiAgICBzdGF0aWMgS2V5T2JqZWN0ID0gJ29iamVjdCc7XG4gICAgc3RhdGljIEtleVZhbHVlID0gJ3ZhbHVlJztcbiAgICBzdGF0aWMgS2V5VHlwZSA9ICd0eXBlJztcbiAgICBzdGF0aWMgS2V5RWxlbWVudFR5cGUgPSAnZWxlbWVudFR5cGUnO1xuICAgIHN0YXRpYyByZWFkb25seSBLZXlUcmFpdEdyb3VwID0gJ3RyYWl0R3JvdXAnO1xuICAgIHN0YXRpYyBLZXlWaXNpYmxlID0gJ3Zpc2libGUnO1xuICAgIHN0YXRpYyBLZXlFZGl0YWJsZSA9ICdlZGl0YWJsZSc7XG4gICAgc3RhdGljIEtleVZhbGlkID0gJ3ZhbGlkJztcbiAgICBzdGF0aWMgS2V5UmFuayA9ICdyYW5rJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgRGVmYXVsdEFjdGlvbkNhdGVnb3J5ID0gJ0dlbmVyYWwnO1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IF9GaWVsZFBhdGhOdWxsTWFya2VyID0gbmV3IEZpZWxkUGF0aCgnbnVsbCcpO1xuXG5cbiAgICBfdHJhaXRUb0dyb3VwOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xuICAgIF90cmFpdFRvR3JvdXBHZW5lcmF0aW9uOiBudW1iZXIgPSAtMTtcblxuXG4gICAgLyoqXG4gICAgICogIENhbiBpbmplY3QgdGhlc2UgZGlyZWN0bHkgYnV0IHdhbnQgdG8ga2VlcCB0aGlzIGFzIG11Y2ggYXMgcG9zc2libGUgd2l0aCBhbnkgYW5ndWxhclxuICAgICAqICBkZXBlbmRlY2llcyBhcyB3ZSB3aWxsIGJlIHVzaW5nIHRoZXNlIGNvcmUgcnVsZSBjbGFzc2VzIG91dHNpZGUgb2YgVUkgY29kZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfY29tcG9uZW50UmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5O1xuICAgIHByb3RlY3RlZCBfaW5qZWN0b3I6IEluamVjdG9yO1xuXG5cbiAgICBzdGF0aWMgdmFsaWRhdGlvbkVycm9yKGNvbnRleHQ6IENvbnRleHQpOiBzdHJpbmcge1xuICAgICAgICBsZXQgZXJyb3IgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5VmFsaWQpO1xuICAgICAgICBpZiAoaXNCbGFuayhlcnJvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQm9vbGVhbihlcnJvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZShlcnJvcikgPyBudWxsIDogJ0ludmFsaWQgZW50cnknO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcnJvci50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8vIHRvZG86IGltcGxlbWVudCBuZXcgZGVjb3JhdG9ycyBpbiB0eXBlc2NyaXB0IGlmIHdlIHdhbnQgb3QgYW5ub3RhdGUgX2Fubm90YXRpb25Qcm9jZXNzb3JzXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyS2V5SW5pdE9ic2VydmVyKE9iamVjdE1ldGEuS2V5Q2xhc3MsIG5ldyBJbnRyb3NwZWN0aW9uTWV0YVByb3ZpZGVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyS2V5SW5pdE9ic2VydmVyKE9iamVjdE1ldGEuS2V5VHlwZSwgbmV3IEZpZWxkVHlwZUludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIoKSk7XG5cbiAgICAgICAgLy8gVGhlc2Uga2V5cyBkZWZpbmUgc2NvcGVzIGZvciB0aGVpciBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKE9iamVjdE1ldGEuS2V5RmllbGQpO1xuICAgICAgICB0aGlzLmRlZmluZUtleUFzUHJvcGVydHlTY29wZShPYmplY3RNZXRhLktleUFjdGlvbik7XG4gICAgICAgIHRoaXMuZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnkpO1xuICAgICAgICB0aGlzLmRlZmluZUtleUFzUHJvcGVydHlTY29wZShPYmplY3RNZXRhLktleUNsYXNzKTtcblxuICAgICAgICAvLyBwb2xpY2llcyBmb3IgY2hhaW5pbmcgY2VydGFpbiB3ZWxsIGtub3duIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5VmlzaWJsZSwgbmV3IFByb3BlcnR5TWVyZ2VyX0FuZCgpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5RWRpdGFibGUsIG5ldyBQcm9wZXJ0eU1lcmdlcl9BbmQoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleVZhbGlkLCBuZXcgT01Qcm9wZXJ0eU1lcmdlcl9WYWxpZCgpKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlDbGFzcywgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleUZpZWxkLCBNZXRhLlByb3BlcnR5TWVyZ2VyX0RlY2xhcmVMaXN0KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5QWN0aW9uLCBNZXRhLlByb3BlcnR5TWVyZ2VyX0RlY2xhcmVMaXN0KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5QWN0aW9uQ2F0ZWdvcnksIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlUcmFpdEdyb3VwLCBNZXRhLlByb3BlcnR5TWVyZ2VyX0RlY2xhcmVMaXN0KTtcblxuICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KE9iamVjdE1ldGEuS2V5Q2xhc3MsIE9iamVjdE1ldGEuS2V5Q2xhc3MpO1xuICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KE9iamVjdE1ldGEuS2V5VHlwZSwgT2JqZWN0TWV0YS5LZXlUeXBlKTtcbiAgICAgICAgdGhpcy5taXJyb3JQcm9wZXJ0eVRvQ29udGV4dChPYmplY3RNZXRhLktleUVsZW1lbnRUeXBlLCBPYmplY3RNZXRhLktleUVsZW1lbnRUeXBlKTtcbiAgICAgICAgdGhpcy5taXJyb3JQcm9wZXJ0eVRvQ29udGV4dChPYmplY3RNZXRhLktleVRyYWl0LCBNZXRhLktleVRyYWl0KTtcbiAgICAgICAgdGhpcy5taXJyb3JQcm9wZXJ0eVRvQ29udGV4dChPYmplY3RNZXRhLktleUVkaXRhYmxlLCBPYmplY3RNZXRhLktleUVkaXRhYmxlKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyVmFsdWVUcmFuc2Zvcm1lckZvcktleShPYmplY3RNZXRhLktleU9iamVjdCwgTWV0YS5UcmFuc2Zvcm1lcl9LZXlQcmVzZW50KTtcblxuICAgICAgICAvLyB0b2RvOiB0cnkgdG8gc3VwcG9ydCBkZWNvcmF0b3JzIGFuZCBob3cgd2UgY2FuIHB1dCBtZXRhIGRhdGEgaW50byBvYmplY3QgQFRyYWl0cyxcbiAgICAgICAgLy8gQFByb3BlcnRpZXMsIEBBY3Rpb25cbiAgICB9XG5cblxuICAgIC8qXG4gICAgICogIFByb3ZpZGUgc3ViY2xhc3MgY29udGV4dCB3aXRoIGNvbnZlbmllbmNlcyBmb3IgZ2V0dGluZyBvYmplY3QgZmllbGQgdmFsdWVzXG4gICAgICovXG4gICAgbmV3Q29udGV4dCgpOiBDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYmplY3RNZXRhQ29udGV4dCh0aGlzLCBmYWxzZSk7XG4gICAgfVxuXG5cbiAgICAvLyBVc2UgYSBzcGVjaWFsIG1hcCBzdWJzY2xhc3MgZm9yIG91ciBQcm9wZXJ0aWVzXG4gICAgbmV3UHJvcGVydGllc01hcCgpOiBQcm9wZXJ0eU1hcCB7XG4gICAgICAgIHJldHVybiBuZXcgT2JqZWN0TWV0YVByb3BlcnR5TWFwKCk7XG4gICAgfVxuXG4gICAgaXRlbU5hbWVzKGNvbnRleHQ6IENvbnRleHQsIGtleTogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICBjb250ZXh0LnNldChPYmplY3RNZXRhLktleURlY2xhcmUsIGtleSk7XG4gICAgICAgIGxldCBpdGVtc05hbWVzID0gY29udGV4dC5saXN0UHJvcGVydHlGb3JLZXkoa2V5KTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgICAgICByZXR1cm4gaXRlbXNOYW1lcztcbiAgICB9XG5cblxuICAgIGl0ZW1Qcm9wZXJ0aWVzKGNvbnRleHQ6IENvbnRleHQsIGtleTogc3RyaW5nLCBmaWx0ZXJIaWRkZW46IGJvb2xlYW4pOiBBcnJheTxJdGVtUHJvcGVydGllcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtUHJvcGVydGllc0Zvck5hbWVzKGNvbnRleHQsIGtleSwgdGhpcy5pdGVtTmFtZXMoY29udGV4dCwga2V5KSxcbiAgICAgICAgICAgIGZpbHRlckhpZGRlbik7XG4gICAgfVxuXG4gICAgaXRlbVByb3BlcnRpZXNGb3JOYW1lcyhjb250ZXh0OiBDb250ZXh0LCBrZXk6IHN0cmluZywgaXRlbU5hbWVzOiBzdHJpbmdbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckhpZGRlbjogYm9vbGVhbik6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiB7XG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpdGVtTmFtZSBvZiBpdGVtTmFtZXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgY29udGV4dC5zZXQoa2V5LCBpdGVtTmFtZSk7XG5cbiAgICAgICAgICAgIGxldCBpc1Zpc2libGUgPSBjb250ZXh0LmFsbFByb3BlcnRpZXMoKS5nZXQoT2JqZWN0TWV0YS5LZXlWaXNpYmxlKTtcbiAgICAgICAgICAgIGxldCB2aXNpYmxlID0gY29udGV4dC5zdGF0aWNhbGx5UmVzb2x2ZVZhbHVlKGlzVmlzaWJsZSk7XG5cbiAgICAgICAgICAgIGxldCBpc0hpZGRlbiA9IChpc0JsYW5rKHZpc2libGUpKSB8fCBCb29sZWFuV3JhcHBlci5pc0ZhbHNlKHZpc2libGUpO1xuXG4gICAgICAgICAgICBpZiAoIWlzSGlkZGVuIHx8ICFmaWx0ZXJIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgSXRlbVByb3BlcnRpZXMoaXRlbU5hbWUsIGNvbnRleHQuYWxsUHJvcGVydGllcygpLCBpc0hpZGRlbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dC5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgZ3JvdXBGb3JUcmFpdCh0cmFpdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyYWl0VG9Hcm91cCA9PSBudWxsIHx8IHRoaXMuX3RyYWl0VG9Hcm91cEdlbmVyYXRpb24gPCB0aGlzLnJ1bGVTZXRHZW5lcmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl90cmFpdFRvR3JvdXBHZW5lcmF0aW9uID0gdGhpcy5ydWxlU2V0R2VuZXJhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX3RyYWl0VG9Hcm91cCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5uZXdDb250ZXh0KCk7XG4gICAgICAgICAgICBmb3IgKGxldCBncm91cCBvZiB0aGlzLml0ZW1OYW1lcyhjb250ZXh0LCBPYmplY3RNZXRhLktleVRyYWl0R3JvdXApKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zZXQoT2JqZWN0TWV0YS5LZXlUcmFpdEdyb3VwLCBncm91cCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuYW1lIG9mIHRoaXMuaXRlbU5hbWVzKGNvbnRleHQsIE9iamVjdE1ldGEuS2V5VHJhaXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYWl0VG9Hcm91cC5zZXQobmFtZSwgZ3JvdXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90cmFpdFRvR3JvdXAuZ2V0KHRyYWl0KTtcbiAgICB9XG5cbiAgICBzZXQgaW5qZWN0b3IodmFsdWU6IEluamVjdG9yKSB7XG4gICAgICAgIHRoaXMuX2luamVjdG9yID0gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0b3I7XG4gICAgfVxuXG4gICAgZ2V0IGNvbXBvbmVudFJlZ2lzdHJ5KCk6IENvbXBvbmVudFJlZ2lzdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudFJlZ2lzdHJ5O1xuICAgIH1cblxuICAgIHNldCBjb21wb25lbnRSZWdpc3RyeSh2YWx1ZTogQ29tcG9uZW50UmVnaXN0cnkpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50UmVnaXN0cnkgPSB2YWx1ZTtcbiAgICB9XG59XG5cbi8qKlxuICogV2hlbiBhIGNsYXNzIGlzIHB1c2hlZCBlaXRoZXIgZGlyZWN0bHkgb3IgaW5kaXJlY3RseSAodXNpbmcgZGVmZmVyZWQgcnVsZXMpIHdlIHJlY2VpdmUgYVxuICogVmFsdWVRdWVyaWVkT2JzZXJ2ZXIgbm90aWZpY2F0aW9uIGluIG9yZGVyIHRvIHJlZ2lzdGVyICB0eXBlcyBmb3IgdGhlIG9iamVjdC4gVHJ5aW5nIHRvIGFjaGlldmVcbiAqIGF0IGxlYXN0IHNvbWUga2luZCBvZiBpbnRyb3NwZWN0aW9uIHdlIG5lZWQgdG8gaW1wbGVtZW50ICRwcm90byBtZXRob2QgaW5zaWRlIHRoZSBvYmplY3QgdGhhdFxuICogaW5zdGFudGlhdGVzIGFsbCB0eXBlcyB3aGljaCB3ZSBjYW4gcXVlcnkuXG4gKlxuICogSWRlYWxseSB3ZSB3YW50IHRvIHVzZSBkZWNvcmF0b3JzIHdoZW4gZGVhbGluZyB3aXRoIGNsaWVudCBzaWRlIHR5cGVzY3JpcHQgY2xhc3MuIGJ1dCBmb3IgY2FzZXNcbiAqIHdoZXJlIFJ1bGVzIHdpbGwgYmUgbG9hZGVkIHVzaW5nIFJlc3QgQVBJIGFsb25nIHdpdGggdGhlIG9iamVjdCBpbnN0YW5jZSBpdHMgaW1wb3NzaWJsZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIgaW1wbGVtZW50cyBWYWx1ZVF1ZXJpZWRPYnNlcnZlciB7XG4gICAgcHJpdmF0ZSBfbWV0YTogTWV0YTtcblxuICAgIG5vdGlmeShtZXRhOiBNZXRhLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZXRhID0gbWV0YTtcbiAgICAgICAgbGV0IG15T2JqZWN0O1xuXG4gICAgICAgIGxldCBjb21wb25lbnRSZWdpc3RyeTogQ29tcG9uZW50UmVnaXN0cnkgPSAoPE9iamVjdE1ldGE+dGhpcy5fbWV0YSkuY29tcG9uZW50UmVnaXN0cnk7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQoY29tcG9uZW50UmVnaXN0cnkpLFxuICAgICAgICAgICAgJ0NvbXBvbmVudCByZWdpc3RyeSBpcyBub3QgaW5pdGlhbGl6ZWQnKTtcblxuICAgICAgICBsZXQgY2xheno6IFR5cGU8YW55PiA9IG51bGw7XG4gICAgICAgIGlmIChpc1N0cmluZyh2YWx1ZSkgJiYgKGNsYXp6ID0gY29tcG9uZW50UmVnaXN0cnkubmFtZVRvVHlwZS5nZXQodmFsdWUpKVxuICAgICAgICAgICAgJiYgaXNQcmVzZW50KGNsYXp6KSkge1xuICAgICAgICAgICAgbXlPYmplY3QgPSBuZXcgY2xhenooKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0JsYW5rKGNsYXp6KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0KE1ldGEuY2xhc3NOYW1lKG15T2JqZWN0KSA9PT0gdmFsdWUsXG4gICAgICAgICAgICAnVHJ5aW5nIHRvIHByb2Nlc3MgYW5kIHJlZ2lzdGVyIGEgY2xhc3MgdGhhdCBkb2VzIG5vdCBleGlzdHMgb24gQ29udGV4dCcpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUnVsZXNGb3JDbGFzcyhteU9iamVjdCwgdmFsdWUpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlclJ1bGVzRm9yQ2xhc3Mob2JqZWN0OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21ldGEua2V5RGF0YShPYmplY3RNZXRhLktleUNsYXNzKS5zZXRQYXJlbnQoY2xhc3NOYW1lLCAnT2JqZWN0Jyk7XG5cbiAgICAgICAgdGhpcy5fbWV0YS5iZWdpblJ1bGVTZXQoY2xhc3NOYW1lKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdG9yczogQXJyYXk8U2VsZWN0b3I+ID0gW25ldyBTZWxlY3RvcihPYmplY3RNZXRhLktleUNsYXNzLCBjbGFzc05hbWUpXTtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eU1hcCA9IHRoaXMuX21ldGEubmV3UHJvcGVydGllc01hcCgpO1xuICAgICAgICAgICAgc2VsZWN0b3JzWzBdLmlzRGVjbCA9IHRydWU7XG5cbiAgICAgICAgICAgIGxldCBydWxlOiBSdWxlID0gbmV3IFJ1bGUoc2VsZWN0b3JzLCBwcm9wZXJ0eU1hcCwgT2JqZWN0TWV0YS5DbGFzc1J1bGVQcmlvcml0eSk7XG4gICAgICAgICAgICB0aGlzLl9tZXRhLmFkZFJ1bGUocnVsZSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJSdWxlc0ZvckZpZWxkcyhvYmplY3QsIGNsYXNzTmFtZSk7XG5cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX21ldGEuZW5kUnVsZVNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyUnVsZXNGb3JGaWVsZHMob2JqZWN0OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIC8vIHRvZG86IENhbiB3ZSBzb21laG93IHV0aWxpemUgZGVjb3JhdG9ycz8gTWF5YmUgZm9yIGxvY2FsIHR5cGVzY3JpcHQgZGVmaW5lZCBvYmplY3QsIGJ1dFxuICAgICAgICAvLyBub3Qgb2JqZWN0cyBsb2FkZWQgYXMganNvbiBmcm9tIHJlc3QgQVBJXG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQob2JqZWN0WyckcHJvdG8nXSksXG4gICAgICAgICAgICAnQ2Fubm90IHJlZ2lzdGVyIGZpZWxkcyB3aXRob3V0IGEgJHByb3RvIG1ldGhvZCB0aGF0IHdpbGwgZXhwb3NlIGFsbCB0aGUgZmllbGRzJyk7XG4gICAgICAgIGxldCBpbnN0YW5jZTogYW55ID0gb2JqZWN0WyckcHJvdG8nXSgpO1xuICAgICAgICBsZXQgZmllbGROYW1lcyA9IE9iamVjdC5rZXlzKGluc3RhbmNlKTtcblxuICAgICAgICBsZXQgcmFuayA9IDA7XG4gICAgICAgIGZvciAobGV0IG5hbWUgb2YgZmllbGROYW1lcykge1xuICAgICAgICAgICAgLy8gdG9kbzogY2hlY2s9PiAgY2FuIHdlIHJlbHkgb24gdGhpcyA/XG4gICAgICAgICAgICBsZXQgdHlwZSA9IGluc3RhbmNlW25hbWVdLmNvbnN0cnVjdG9yLm5hbWU7XG5cbiAgICAgICAgICAgIGxldCBwcm9wZXJ0aWVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgICAgICAgICAgcHJvcGVydGllcy5zZXQoT2JqZWN0TWV0YS5LZXlGaWVsZCwgbmFtZSk7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnNldChPYmplY3RNZXRhLktleVR5cGUsIHR5cGUpO1xuXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnNldChPYmplY3RNZXRhLktleVZpc2libGUsIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAoaXNBcnJheShpbnN0YW5jZVtuYW1lXSkpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoaW5zdGFuY2VbbmFtZV0ubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICAgICAgJyBDYW5ub3QgcmVnaXN0ZXIgdHlwZVthcnJheV0gYW5kIGl0cyB0eXBlIHdpdGhvdXQgcHJvcGVybHkgaW5pdGlhbGl6ZWQgJyArXG4gICAgICAgICAgICAgICAgICAgICdwcm90b3R5cGUnKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGluc3RhbmNlW25hbWVdWzBdO1xuICAgICAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uRWxlbWVudFR5cGUgPSBpdGVtLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllcy5zZXQoT2JqZWN0TWV0YS5LZXlFbGVtZW50VHlwZSwgY29sbGVjdGlvbkVsZW1lbnRUeXBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNlbGVjdG9yTGlzdDogQXJyYXk8U2VsZWN0b3I+ID0gW1xuICAgICAgICAgICAgICAgIG5ldyBTZWxlY3RvcihPYmplY3RNZXRhLktleUNsYXNzLCBjbGFzc05hbWUpLFxuICAgICAgICAgICAgICAgIG5ldyBTZWxlY3RvcihPYmplY3RNZXRhLktleUZpZWxkLCBuYW1lKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBzZWxlY3Rvckxpc3RbMV0uaXNEZWNsID0gdHJ1ZTtcbiAgICAgICAgICAgIHByb3BlcnRpZXMuc2V0KE9iamVjdE1ldGEuS2V5UmFuaywgKHJhbmsrKyArIDEpICogMTApO1xuXG4gICAgICAgICAgICBsZXQgcnVsZTogUnVsZSA9IG5ldyBSdWxlKHNlbGVjdG9yTGlzdCwgcHJvcGVydGllcywgT2JqZWN0TWV0YS5DbGFzc1J1bGVQcmlvcml0eSk7XG4gICAgICAgICAgICB0aGlzLl9tZXRhLmFkZFJ1bGUocnVsZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUmVnaXN0ZXJzIHNwZWNpYWxzIHR5cGVzIHRoYXQgd2UgYXJlIHJlYWQgZHVyaW5nIGludHJvc3BlY3Rpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWVsZFR5cGVJbnRyb3NwZWN0aW9uTWV0YVByb3ZpZGVyIGltcGxlbWVudHMgVmFsdWVRdWVyaWVkT2JzZXJ2ZXIge1xuXG4gICAgbm90aWZ5KG1ldGE6IE1ldGEsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIC8vIHByaW50KCdGaWVsZFR5cGVJbnRyb3NwZWN0aW9uTWV0YVByb3ZpZGVyIG5vdGlmaWVkIG9mIGZpcnN0IHVzZSBvZiBmaWVsZDogICcgLCB2YWx1ZSk7XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGNsYXNzIE9iamVjdE1ldGFQcm9wZXJ0eU1hcCBleHRlbmRzIFByb3BlcnR5TWFwIHtcbiAgICBwcml2YXRlIF9maWVsZFBhdGg6IEZpZWxkUGF0aDtcblxuXG4gICAgZ2V0IGZpZWxkUGF0aCgpOiBGaWVsZFBhdGgge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9maWVsZFBhdGgpKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldChPYmplY3RNZXRhLktleVZhbHVlKTtcbiAgICAgICAgICAgIGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldChPYmplY3RNZXRhLktleUZpZWxkKTtcblxuICAgICAgICAgICAgdGhpcy5fZmllbGRQYXRoID0gKGlzUHJlc2VudChmaWVsZE5hbWUpICYmIGlzQmxhbmsodmFsdWUpKVxuICAgICAgICAgICAgICAgID8gbmV3IEZpZWxkUGF0aChmaWVsZE5hbWUpXG4gICAgICAgICAgICAgICAgOiBPYmplY3RNZXRhLl9GaWVsZFBhdGhOdWxsTWFya2VyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpc051bGxQYXRoID0gdGhpcy5fZmllbGRQYXRoID09PSBPYmplY3RNZXRhLl9GaWVsZFBhdGhOdWxsTWFya2VyO1xuICAgICAgICByZXR1cm4gaXNOdWxsUGF0aCA/IG51bGwgOiB0aGlzLl9maWVsZFBhdGg7XG4gICAgfVxuXG4gICAgaXNGaWVsZE51bGxNYXJrZXIodmFsdWU6IEZpZWxkUGF0aCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHZhbHVlKSAmJiB2YWx1ZS5wYXRoID09PSAnbnVsbCc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBPTVByb3BlcnR5TWVyZ2VyX1ZhbGlkIGltcGxlbWVudHMgUHJvcGVydHlNZXJnZXIsIFByb3BlcnR5TWVyZ2VySXNDaGFpbmluZyB7XG4gICAgX21ldGE6IE1ldGE7XG4gICAgaXNQcm9wTWVyZ2VySXNDaGFpbmluZ01hcms6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICBtZXJnZShvcmlnOiBhbnksIG92ZXJyaWRlOiBhbnksIGlzRGVjbGFyZTogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIC8vIGlmIGZpcnN0IGlzIGVycm9yIChlcnJvciBtZXNzYWdlIG9yIGZhbHNlLCBpdCB3aW5zKSwgb3RoZXJ3aXNlIHNlY29uZFxuICAgICAgICByZXR1cm4gKGlzU3RyaW5nKG92ZXJyaWRlKSB8fCAoaXNCb29sZWFuKG92ZXJyaWRlKSAmJiBCb29sZWFuV3JhcHBlci5pc0ZhbHNlKFxuICAgICAgICAgICAgb3ZlcnJpZGUpKSkgPyBvdmVycmlkZSA6IG9yaWc7XG4gICAgfVxuXG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuICdWQUxJREFURSc7XG4gICAgfVxufVxuXG5cbiJdfQ==