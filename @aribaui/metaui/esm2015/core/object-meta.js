/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { assert, BooleanWrapper, FieldPath, isArray, isBlank, isBoolean, isPresent, isString } from '@aribaui/core';
import { Meta, PropertyMap, PropertyMerger_And } from './meta';
import { ObjectMetaContext } from './context';
import { ItemProperties } from './item-properties';
import { Rule, Selector } from './rule';
/**
 * ObjectMeta is resposible for setting up everything related to class, field, actions
 *
 */
export class ObjectMeta extends Meta {
    constructor() {
        super();
        this._traitToGroupGeneration = -1;
        this.registerKeyInitObserver(ObjectMeta.KeyClass, new IntrospectionMetaProvider());
        this.registerKeyInitObserver(ObjectMeta.KeyType, new FieldTypeIntrospectionMetaProvider());
        // These keys define scopes for their properties
        this.defineKeyAsPropertyScope(ObjectMeta.KeyField);
        this.defineKeyAsPropertyScope(ObjectMeta.KeyAction);
        this.defineKeyAsPropertyScope(ObjectMeta.KeyActionCategory);
        this.defineKeyAsPropertyScope(ObjectMeta.KeyClass);
        // policies for chaining certain well known properties
        this.registerPropertyMerger(ObjectMeta.KeyVisible, new PropertyMerger_And());
        this.registerPropertyMerger(ObjectMeta.KeyEditable, new PropertyMerger_And());
        this.registerPropertyMerger(ObjectMeta.KeyValid, new OMPropertyMerger_Valid());
        this.registerPropertyMerger(ObjectMeta.KeyClass, Meta.PropertyMerger_DeclareList);
        this.registerPropertyMerger(ObjectMeta.KeyField, Meta.PropertyMerger_DeclareList);
        this.registerPropertyMerger(ObjectMeta.KeyAction, Meta.PropertyMerger_DeclareList);
        this.registerPropertyMerger(ObjectMeta.KeyActionCategory, Meta.PropertyMerger_DeclareList);
        this.registerPropertyMerger(ObjectMeta.KeyTraitGroup, Meta.PropertyMerger_DeclareList);
        this.mirrorPropertyToContext(ObjectMeta.KeyClass, ObjectMeta.KeyClass);
        this.mirrorPropertyToContext(ObjectMeta.KeyType, ObjectMeta.KeyType);
        this.mirrorPropertyToContext(ObjectMeta.KeyElementType, ObjectMeta.KeyElementType);
        this.mirrorPropertyToContext(ObjectMeta.KeyTrait, Meta.KeyTrait);
        this.mirrorPropertyToContext(ObjectMeta.KeyEditable, ObjectMeta.KeyEditable);
        this.registerValueTransformerForKey(ObjectMeta.KeyObject, Meta.Transformer_KeyPresent);
        // todo: try to support decorators and how we can put meta data into object @Traits,
        // @Properties, @Action
    }
    /**
     * @param {?} context
     * @return {?}
     */
    static validationError(context) {
        let /** @type {?} */ error = context.propertyForKey(ObjectMeta.KeyValid);
        if (isBlank(error)) {
            return null;
        }
        if (isBoolean(error)) {
            return BooleanWrapper.boleanValue(error) ? null : 'Invalid entry';
        }
        return error.toString();
    }
    /**
     * @return {?}
     */
    newContext() {
        return new ObjectMetaContext(this, false);
    }
    /**
     * @return {?}
     */
    newPropertiesMap() {
        return new ObjectMetaPropertyMap();
    }
    /**
     * @param {?} context
     * @param {?} key
     * @return {?}
     */
    itemNames(context, key) {
        context.push();
        context.set(ObjectMeta.KeyDeclare, key);
        let /** @type {?} */ itemsNames = context.listPropertyForKey(key);
        context.pop();
        return itemsNames;
    }
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} filterHidden
     * @return {?}
     */
    itemProperties(context, key, filterHidden) {
        return this.itemPropertiesForNames(context, key, this.itemNames(context, key), filterHidden);
    }
    /**
     * @param {?} context
     * @param {?} key
     * @param {?} itemNames
     * @param {?} filterHidden
     * @return {?}
     */
    itemPropertiesForNames(context, key, itemNames, filterHidden) {
        let /** @type {?} */ result = [];
        for (let /** @type {?} */ itemName of itemNames) {
            context.push();
            context.set(key, itemName);
            let /** @type {?} */ isVisible = context.allProperties().get(ObjectMeta.KeyVisible);
            let /** @type {?} */ visible = context.staticallyResolveValue(isVisible);
            let /** @type {?} */ isHidden = (isBlank(visible)) || BooleanWrapper.isFalse(visible);
            if (!isHidden || !filterHidden) {
                result.push(new ItemProperties(itemName, context.allProperties(), isHidden));
            }
            context.pop();
        }
        return result;
    }
    /**
     * @param {?} trait
     * @return {?}
     */
    groupForTrait(trait) {
        if (this._traitToGroup == null || this._traitToGroupGeneration < this.ruleSetGeneration) {
            this._traitToGroupGeneration = this.ruleSetGeneration;
            this._traitToGroup = new Map();
            let /** @type {?} */ context = this.newContext();
            for (let /** @type {?} */ group of this.itemNames(context, ObjectMeta.KeyTraitGroup)) {
                context.push();
                context.set(ObjectMeta.KeyTraitGroup, group);
                for (let /** @type {?} */ name of this.itemNames(context, ObjectMeta.KeyTrait)) {
                    this._traitToGroup.set(name, group);
                }
                context.pop();
            }
        }
        return this._traitToGroup.get(trait);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set injector(value) {
        this._injector = value;
    }
    /**
     * @return {?}
     */
    get injector() {
        return this._injector;
    }
    /**
     * @return {?}
     */
    get componentRegistry() {
        return this._componentRegistry;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set componentRegistry(value) {
        this._componentRegistry = value;
    }
}
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
export class IntrospectionMetaProvider {
    /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    notify(meta, key, value) {
        this._meta = meta;
        let /** @type {?} */ myObject;
        let /** @type {?} */ componentRegistry = (/** @type {?} */ (this._meta)).componentRegistry;
        assert(isPresent(componentRegistry), 'Component registry is not initialized');
        let /** @type {?} */ clazz = null;
        if (isString(value) && (clazz = componentRegistry.nameToType.get(value))
            && isPresent(clazz)) {
            myObject = new clazz();
        }
        else if (isBlank(clazz)) {
            return;
        }
        assert(Meta.className(myObject) === value, 'Trying to process and register a class that does not exists on Context');
        this.registerRulesForClass(myObject, value);
    }
    /**
     * @param {?} object
     * @param {?} className
     * @return {?}
     */
    registerRulesForClass(object, className) {
        this._meta.keyData(ObjectMeta.KeyClass).setParent(className, 'Object');
        this._meta.beginRuleSet(className);
        try {
            let /** @type {?} */ selectors = [new Selector(ObjectMeta.KeyClass, className)];
            let /** @type {?} */ propertyMap = this._meta.newPropertiesMap();
            selectors[0].isDecl = true;
            let /** @type {?} */ rule = new Rule(selectors, propertyMap, ObjectMeta.ClassRulePriority);
            this._meta.addRule(rule);
            this.registerRulesForFields(object, className);
        }
        finally {
            this._meta.endRuleSet();
        }
    }
    /**
     * @param {?} object
     * @param {?} className
     * @return {?}
     */
    registerRulesForFields(object, className) {
        // todo: Can we somehow utilize decorators? Maybe for local typescript defined object, but
        // not objects loaded as json from rest API
        assert(isPresent(object['$proto']), 'Cannot register fields without a $proto method that will expose all the fields');
        let /** @type {?} */ instance = object['$proto']();
        let /** @type {?} */ fieldNames = Object.keys(instance);
        let /** @type {?} */ rank = 0;
        for (let /** @type {?} */ name of fieldNames) {
            // todo: check=>  can we rely on this ?
            let /** @type {?} */ type = instance[name].constructor.name;
            let /** @type {?} */ properties = new Map();
            properties.set(ObjectMeta.KeyField, name);
            properties.set(ObjectMeta.KeyType, type);
            properties.set(ObjectMeta.KeyVisible, true);
            if (isArray(instance[name])) {
                assert(instance[name].length > 0, ' Cannot register type[array] and its type without properly initialized ' +
                    'prototype');
                let /** @type {?} */ item = instance[name][0];
                let /** @type {?} */ collectionElementType = item.constructor.name;
                properties.set(ObjectMeta.KeyElementType, collectionElementType);
            }
            let /** @type {?} */ selectorList = [
                new Selector(ObjectMeta.KeyClass, className),
                new Selector(ObjectMeta.KeyField, name),
            ];
            selectorList[1].isDecl = true;
            properties.set(ObjectMeta.KeyRank, (rank++ + 1) * 10);
            let /** @type {?} */ rule = new Rule(selectorList, properties, ObjectMeta.ClassRulePriority);
            this._meta.addRule(rule);
        }
    }
}
function IntrospectionMetaProvider_tsickle_Closure_declarations() {
    /** @type {?} */
    IntrospectionMetaProvider.prototype._meta;
}
/**
 * Registers specials types that we are read during introspections
 */
export class FieldTypeIntrospectionMetaProvider {
    /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    notify(meta, key, value) {
        // print('FieldTypeIntrospectionMetaProvider notified of first use of field:  ' , value);
    }
}
export class ObjectMetaPropertyMap extends PropertyMap {
    /**
     * @return {?}
     */
    get fieldPath() {
        if (isBlank(this._fieldPath)) {
            let /** @type {?} */ value = this.get(ObjectMeta.KeyValue);
            let /** @type {?} */ fieldName = this.get(ObjectMeta.KeyField);
            this._fieldPath = (isPresent(fieldName) && isBlank(value))
                ? new FieldPath(fieldName)
                : ObjectMeta._FieldPathNullMarker;
        }
        let /** @type {?} */ isNullPath = this._fieldPath === ObjectMeta._FieldPathNullMarker;
        return isNullPath ? null : this._fieldPath;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isFieldNullMarker(value) {
        return isPresent(value) && value.path === 'null';
    }
}
function ObjectMetaPropertyMap_tsickle_Closure_declarations() {
    /** @type {?} */
    ObjectMetaPropertyMap.prototype._fieldPath;
}
export class OMPropertyMerger_Valid {
    constructor() {
        this.isPropMergerIsChainingMark = true;
    }
    /**
     * @param {?} orig
     * @param {?} override
     * @param {?} isDeclare
     * @return {?}
     */
    merge(orig, override, isDeclare) {
        // if first is error (error message or false, it wins), otherwise second
        return (isString(override) || (isBoolean(override) && BooleanWrapper.isFalse(override))) ? override : orig;
    }
    /**
     * @return {?}
     */
    toString() {
        return 'VALIDATE';
    }
}
function OMPropertyMerger_Valid_tsickle_Closure_declarations() {
    /** @type {?} */
    OMPropertyMerger_Valid.prototype._meta;
    /** @type {?} */
    OMPropertyMerger_Valid.prototype.isPropMergerIsChainingMark;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LW1ldGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL29iamVjdC1tZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILE1BQU0sRUFDTixjQUFjLEVBQ2QsU0FBUyxFQUNULE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxFQUNULFNBQVMsRUFDVCxRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNILElBQUksRUFDSixXQUFXLEVBRVgsa0JBQWtCLEVBR3JCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBVSxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNyRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7O0FBTXRDLE1BQU0saUJBQWtCLFNBQVEsSUFBSTtJQTZDaEM7UUFDSSxLQUFLLEVBQUUsQ0FBQzt1Q0ExQnNCLENBQUMsQ0FBQztRQTRCaEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxrQ0FBa0MsRUFBRSxDQUFDLENBQUM7O1FBRzNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFHbkQsSUFB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LENBQUMsb0JBQW9CLENBQUM7UUFDckUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQzlDOzs7OztJQUVELGlCQUFpQixDQUFDLEtBQWdCO1FBQzlCLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7S0FDcEQ7Q0FDSjs7Ozs7QUFHRCxNQUFNOzswQ0FFb0MsSUFBSTs7Ozs7Ozs7SUFHMUMsS0FBSyxDQUFDLElBQVMsRUFBRSxRQUFhLEVBQUUsU0FBa0I7O1FBRTlDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUN4RSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ3JDOzs7O0lBR0QsUUFBUTtRQUNKLE1BQU0sQ0FBQyxVQUFVLENBQUM7S0FDckI7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3RvciwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIGFzc2VydCxcbiAgICBCb29sZWFuV3JhcHBlcixcbiAgICBGaWVsZFBhdGgsXG4gICAgaXNBcnJheSxcbiAgICBpc0JsYW5rLFxuICAgIGlzQm9vbGVhbixcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmdcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0NvbXBvbmVudFJlZ2lzdHJ5fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7XG4gICAgTWV0YSxcbiAgICBQcm9wZXJ0eU1hcCxcbiAgICBQcm9wZXJ0eU1lcmdlcixcbiAgICBQcm9wZXJ0eU1lcmdlcl9BbmQsXG4gICAgUHJvcGVydHlNZXJnZXJJc0NoYWluaW5nLFxuICAgIFZhbHVlUXVlcmllZE9ic2VydmVyXG59IGZyb20gJy4vbWV0YSc7XG5pbXBvcnQge0NvbnRleHQsIE9iamVjdE1ldGFDb250ZXh0fSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHtJdGVtUHJvcGVydGllc30gZnJvbSAnLi9pdGVtLXByb3BlcnRpZXMnO1xuaW1wb3J0IHtSdWxlLCBTZWxlY3Rvcn0gZnJvbSAnLi9ydWxlJztcblxuLyoqXG4gKiBPYmplY3RNZXRhIGlzIHJlc3Bvc2libGUgZm9yIHNldHRpbmcgdXAgZXZlcnl0aGluZyByZWxhdGVkIHRvIGNsYXNzLCBmaWVsZCwgYWN0aW9uc1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdE1ldGEgZXh0ZW5kcyBNZXRhIHtcbiAgICBzdGF0aWMgS2V5Q2xhc3MgPSAnY2xhc3MnO1xuICAgIHN0YXRpYyBLZXlGaWVsZCA9ICdmaWVsZCc7XG4gICAgc3RhdGljIEtleUFjdGlvbiA9ICdhY3Rpb24nO1xuICAgIHN0YXRpYyBLZXlBY3Rpb25DYXRlZ29yeSA9ICdhY3Rpb25DYXRlZ29yeSc7XG4gICAgc3RhdGljIEtleU9iamVjdCA9ICdvYmplY3QnO1xuICAgIHN0YXRpYyBLZXlWYWx1ZSA9ICd2YWx1ZSc7XG4gICAgc3RhdGljIEtleVR5cGUgPSAndHlwZSc7XG4gICAgc3RhdGljIEtleUVsZW1lbnRUeXBlID0gJ2VsZW1lbnRUeXBlJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgS2V5VHJhaXRHcm91cCA9ICd0cmFpdEdyb3VwJztcbiAgICBzdGF0aWMgS2V5VmlzaWJsZSA9ICd2aXNpYmxlJztcbiAgICBzdGF0aWMgS2V5RWRpdGFibGUgPSAnZWRpdGFibGUnO1xuICAgIHN0YXRpYyBLZXlWYWxpZCA9ICd2YWxpZCc7XG4gICAgc3RhdGljIEtleVJhbmsgPSAncmFuayc7XG4gICAgc3RhdGljIHJlYWRvbmx5IERlZmF1bHRBY3Rpb25DYXRlZ29yeSA9ICdHZW5lcmFsJztcblxuICAgIHN0YXRpYyByZWFkb25seSBfRmllbGRQYXRoTnVsbE1hcmtlciA9IG5ldyBGaWVsZFBhdGgoJ251bGwnKTtcblxuXG4gICAgX3RyYWl0VG9Hcm91cDogTWFwPHN0cmluZywgc3RyaW5nPjtcbiAgICBfdHJhaXRUb0dyb3VwR2VuZXJhdGlvbjogbnVtYmVyID0gLTE7XG5cblxuICAgIC8qKlxuICAgICAqICBDYW4gaW5qZWN0IHRoZXNlIGRpcmVjdGx5IGJ1dCB3YW50IHRvIGtlZXAgdGhpcyBhcyBtdWNoIGFzIHBvc3NpYmxlIHdpdGggYW55IGFuZ3VsYXJcbiAgICAgKiAgZGVwZW5kZWNpZXMgYXMgd2Ugd2lsbCBiZSB1c2luZyB0aGVzZSBjb3JlIHJ1bGUgY2xhc3NlcyBvdXRzaWRlIG9mIFVJIGNvZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2NvbXBvbmVudFJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeTtcbiAgICBwcm90ZWN0ZWQgX2luamVjdG9yOiBJbmplY3RvcjtcblxuXG4gICAgc3RhdGljIHZhbGlkYXRpb25FcnJvcihjb250ZXh0OiBDb250ZXh0KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGVycm9yID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleVZhbGlkKTtcbiAgICAgICAgaWYgKGlzQmxhbmsoZXJyb3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Jvb2xlYW4oZXJyb3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUoZXJyb3IpID8gbnVsbCA6ICdJbnZhbGlkIGVudHJ5JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3IudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvLyB0b2RvOiBpbXBsZW1lbnQgbmV3IGRlY29yYXRvcnMgaW4gdHlwZXNjcmlwdCBpZiB3ZSB3YW50IG90IGFubm90YXRlIF9hbm5vdGF0aW9uUHJvY2Vzc29yc1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlcktleUluaXRPYnNlcnZlcihPYmplY3RNZXRhLktleUNsYXNzLCBuZXcgSW50cm9zcGVjdGlvbk1ldGFQcm92aWRlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcktleUluaXRPYnNlcnZlcihPYmplY3RNZXRhLktleVR5cGUsIG5ldyBGaWVsZFR5cGVJbnRyb3NwZWN0aW9uTWV0YVByb3ZpZGVyKCkpO1xuXG4gICAgICAgIC8vIFRoZXNlIGtleXMgZGVmaW5lIHNjb3BlcyBmb3IgdGhlaXIgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmRlZmluZUtleUFzUHJvcGVydHlTY29wZShPYmplY3RNZXRhLktleUZpZWxkKTtcbiAgICAgICAgdGhpcy5kZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoT2JqZWN0TWV0YS5LZXlBY3Rpb24pO1xuICAgICAgICB0aGlzLmRlZmluZUtleUFzUHJvcGVydHlTY29wZShPYmplY3RNZXRhLktleUFjdGlvbkNhdGVnb3J5KTtcbiAgICAgICAgdGhpcy5kZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoT2JqZWN0TWV0YS5LZXlDbGFzcyk7XG5cbiAgICAgICAgLy8gcG9saWNpZXMgZm9yIGNoYWluaW5nIGNlcnRhaW4gd2VsbCBrbm93biBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleVZpc2libGUsIG5ldyBQcm9wZXJ0eU1lcmdlcl9BbmQoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleUVkaXRhYmxlLCBuZXcgUHJvcGVydHlNZXJnZXJfQW5kKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlWYWxpZCwgbmV3IE9NUHJvcGVydHlNZXJnZXJfVmFsaWQoKSk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5Q2xhc3MsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlGaWVsZCwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleUFjdGlvbiwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleUFjdGlvbkNhdGVnb3J5LCBNZXRhLlByb3BlcnR5TWVyZ2VyX0RlY2xhcmVMaXN0KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5VHJhaXRHcm91cCwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG5cbiAgICAgICAgdGhpcy5taXJyb3JQcm9wZXJ0eVRvQ29udGV4dChPYmplY3RNZXRhLktleUNsYXNzLCBPYmplY3RNZXRhLktleUNsYXNzKTtcbiAgICAgICAgdGhpcy5taXJyb3JQcm9wZXJ0eVRvQ29udGV4dChPYmplY3RNZXRhLktleVR5cGUsIE9iamVjdE1ldGEuS2V5VHlwZSk7XG4gICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoT2JqZWN0TWV0YS5LZXlFbGVtZW50VHlwZSwgT2JqZWN0TWV0YS5LZXlFbGVtZW50VHlwZSk7XG4gICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoT2JqZWN0TWV0YS5LZXlUcmFpdCwgTWV0YS5LZXlUcmFpdCk7XG4gICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoT2JqZWN0TWV0YS5LZXlFZGl0YWJsZSwgT2JqZWN0TWV0YS5LZXlFZGl0YWJsZSk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlclZhbHVlVHJhbnNmb3JtZXJGb3JLZXkoT2JqZWN0TWV0YS5LZXlPYmplY3QsIE1ldGEuVHJhbnNmb3JtZXJfS2V5UHJlc2VudCk7XG5cbiAgICAgICAgLy8gdG9kbzogdHJ5IHRvIHN1cHBvcnQgZGVjb3JhdG9ycyBhbmQgaG93IHdlIGNhbiBwdXQgbWV0YSBkYXRhIGludG8gb2JqZWN0IEBUcmFpdHMsXG4gICAgICAgIC8vIEBQcm9wZXJ0aWVzLCBAQWN0aW9uXG4gICAgfVxuXG5cbiAgICAvKlxuICAgICAqICBQcm92aWRlIHN1YmNsYXNzIGNvbnRleHQgd2l0aCBjb252ZW5pZW5jZXMgZm9yIGdldHRpbmcgb2JqZWN0IGZpZWxkIHZhbHVlc1xuICAgICAqL1xuICAgIG5ld0NvbnRleHQoKTogQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBuZXcgT2JqZWN0TWV0YUNvbnRleHQodGhpcywgZmFsc2UpO1xuICAgIH1cblxuXG4gICAgLy8gVXNlIGEgc3BlY2lhbCBtYXAgc3Vic2NsYXNzIGZvciBvdXIgUHJvcGVydGllc1xuICAgIG5ld1Byb3BlcnRpZXNNYXAoKTogUHJvcGVydHlNYXAge1xuICAgICAgICByZXR1cm4gbmV3IE9iamVjdE1ldGFQcm9wZXJ0eU1hcCgpO1xuICAgIH1cblxuICAgIGl0ZW1OYW1lcyhjb250ZXh0OiBDb250ZXh0LCBrZXk6IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgY29udGV4dC5zZXQoT2JqZWN0TWV0YS5LZXlEZWNsYXJlLCBrZXkpO1xuICAgICAgICBsZXQgaXRlbXNOYW1lcyA9IGNvbnRleHQubGlzdFByb3BlcnR5Rm9yS2V5KGtleSk7XG4gICAgICAgIGNvbnRleHQucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zTmFtZXM7XG4gICAgfVxuXG5cbiAgICBpdGVtUHJvcGVydGllcyhjb250ZXh0OiBDb250ZXh0LCBrZXk6IHN0cmluZywgZmlsdGVySGlkZGVuOiBib29sZWFuKTogQXJyYXk8SXRlbVByb3BlcnRpZXM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbVByb3BlcnRpZXNGb3JOYW1lcyhjb250ZXh0LCBrZXksIHRoaXMuaXRlbU5hbWVzKGNvbnRleHQsIGtleSksXG4gICAgICAgICAgICBmaWx0ZXJIaWRkZW4pO1xuICAgIH1cblxuICAgIGl0ZW1Qcm9wZXJ0aWVzRm9yTmFtZXMoY29udGV4dDogQ29udGV4dCwga2V5OiBzdHJpbmcsIGl0ZW1OYW1lczogc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJIaWRkZW46IGJvb2xlYW4pOiBBcnJheTxJdGVtUHJvcGVydGllcz4ge1xuICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTxJdGVtUHJvcGVydGllcz4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaXRlbU5hbWUgb2YgaXRlbU5hbWVzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0KGtleSwgaXRlbU5hbWUpO1xuXG4gICAgICAgICAgICBsZXQgaXNWaXNpYmxlID0gY29udGV4dC5hbGxQcm9wZXJ0aWVzKCkuZ2V0KE9iamVjdE1ldGEuS2V5VmlzaWJsZSk7XG4gICAgICAgICAgICBsZXQgdmlzaWJsZSA9IGNvbnRleHQuc3RhdGljYWxseVJlc29sdmVWYWx1ZShpc1Zpc2libGUpO1xuXG4gICAgICAgICAgICBsZXQgaXNIaWRkZW4gPSAoaXNCbGFuayh2aXNpYmxlKSkgfHwgQm9vbGVhbldyYXBwZXIuaXNGYWxzZSh2aXNpYmxlKTtcblxuICAgICAgICAgICAgaWYgKCFpc0hpZGRlbiB8fCAhZmlsdGVySGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IEl0ZW1Qcm9wZXJ0aWVzKGl0ZW1OYW1lLCBjb250ZXh0LmFsbFByb3BlcnRpZXMoKSwgaXNIaWRkZW4pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIGdyb3VwRm9yVHJhaXQodHJhaXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLl90cmFpdFRvR3JvdXAgPT0gbnVsbCB8fCB0aGlzLl90cmFpdFRvR3JvdXBHZW5lcmF0aW9uIDwgdGhpcy5ydWxlU2V0R2VuZXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fdHJhaXRUb0dyb3VwR2VuZXJhdGlvbiA9IHRoaXMucnVsZVNldEdlbmVyYXRpb247XG4gICAgICAgICAgICB0aGlzLl90cmFpdFRvR3JvdXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubmV3Q29udGV4dCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgdGhpcy5pdGVtTmFtZXMoY29udGV4dCwgT2JqZWN0TWV0YS5LZXlUcmFpdEdyb3VwKSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2V0KE9iamVjdE1ldGEuS2V5VHJhaXRHcm91cCwgZ3JvdXApO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmFtZSBvZiB0aGlzLml0ZW1OYW1lcyhjb250ZXh0LCBPYmplY3RNZXRhLktleVRyYWl0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFpdFRvR3JvdXAuc2V0KG5hbWUsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhaXRUb0dyb3VwLmdldCh0cmFpdCk7XG4gICAgfVxuXG4gICAgc2V0IGluamVjdG9yKHZhbHVlOiBJbmplY3Rvcikge1xuICAgICAgICB0aGlzLl9pbmplY3RvciA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdG9yO1xuICAgIH1cblxuICAgIGdldCBjb21wb25lbnRSZWdpc3RyeSgpOiBDb21wb25lbnRSZWdpc3RyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRSZWdpc3RyeTtcbiAgICB9XG5cbiAgICBzZXQgY29tcG9uZW50UmVnaXN0cnkodmFsdWU6IENvbXBvbmVudFJlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZ2lzdHJ5ID0gdmFsdWU7XG4gICAgfVxufVxuXG4vKipcbiAqIFdoZW4gYSBjbGFzcyBpcyBwdXNoZWQgZWl0aGVyIGRpcmVjdGx5IG9yIGluZGlyZWN0bHkgKHVzaW5nIGRlZmZlcmVkIHJ1bGVzKSB3ZSByZWNlaXZlIGFcbiAqIFZhbHVlUXVlcmllZE9ic2VydmVyIG5vdGlmaWNhdGlvbiBpbiBvcmRlciB0byByZWdpc3RlciAgdHlwZXMgZm9yIHRoZSBvYmplY3QuIFRyeWluZyB0byBhY2hpZXZlXG4gKiBhdCBsZWFzdCBzb21lIGtpbmQgb2YgaW50cm9zcGVjdGlvbiB3ZSBuZWVkIHRvIGltcGxlbWVudCAkcHJvdG8gbWV0aG9kIGluc2lkZSB0aGUgb2JqZWN0IHRoYXRcbiAqIGluc3RhbnRpYXRlcyBhbGwgdHlwZXMgd2hpY2ggd2UgY2FuIHF1ZXJ5LlxuICpcbiAqIElkZWFsbHkgd2Ugd2FudCB0byB1c2UgZGVjb3JhdG9ycyB3aGVuIGRlYWxpbmcgd2l0aCBjbGllbnQgc2lkZSB0eXBlc2NyaXB0IGNsYXNzLiBidXQgZm9yIGNhc2VzXG4gKiB3aGVyZSBSdWxlcyB3aWxsIGJlIGxvYWRlZCB1c2luZyBSZXN0IEFQSSBhbG9uZyB3aXRoIHRoZSBvYmplY3QgaW5zdGFuY2UgaXRzIGltcG9zc2libGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnRyb3NwZWN0aW9uTWV0YVByb3ZpZGVyIGltcGxlbWVudHMgVmFsdWVRdWVyaWVkT2JzZXJ2ZXIge1xuICAgIHByaXZhdGUgX21ldGE6IE1ldGE7XG5cbiAgICBub3RpZnkobWV0YTogTWV0YSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWV0YSA9IG1ldGE7XG4gICAgICAgIGxldCBteU9iamVjdDtcblxuICAgICAgICBsZXQgY29tcG9uZW50UmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5ID0gKDxPYmplY3RNZXRhPnRoaXMuX21ldGEpLmNvbXBvbmVudFJlZ2lzdHJ5O1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KGNvbXBvbmVudFJlZ2lzdHJ5KSxcbiAgICAgICAgICAgICdDb21wb25lbnQgcmVnaXN0cnkgaXMgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICAgICAgbGV0IGNsYXp6OiBUeXBlPGFueT4gPSBudWxsO1xuICAgICAgICBpZiAoaXNTdHJpbmcodmFsdWUpICYmIChjbGF6eiA9IGNvbXBvbmVudFJlZ2lzdHJ5Lm5hbWVUb1R5cGUuZ2V0KHZhbHVlKSlcbiAgICAgICAgICAgICYmIGlzUHJlc2VudChjbGF6eikpIHtcbiAgICAgICAgICAgIG15T2JqZWN0ID0gbmV3IGNsYXp6KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCbGFuayhjbGF6eikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydChNZXRhLmNsYXNzTmFtZShteU9iamVjdCkgPT09IHZhbHVlLFxuICAgICAgICAgICAgJ1RyeWluZyB0byBwcm9jZXNzIGFuZCByZWdpc3RlciBhIGNsYXNzIHRoYXQgZG9lcyBub3QgZXhpc3RzIG9uIENvbnRleHQnKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJ1bGVzRm9yQ2xhc3MobXlPYmplY3QsIHZhbHVlKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgcmVnaXN0ZXJSdWxlc0ZvckNsYXNzKG9iamVjdDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZXRhLmtleURhdGEoT2JqZWN0TWV0YS5LZXlDbGFzcykuc2V0UGFyZW50KGNsYXNzTmFtZSwgJ09iamVjdCcpO1xuXG4gICAgICAgIHRoaXMuX21ldGEuYmVnaW5SdWxlU2V0KGNsYXNzTmFtZSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RvcnM6IEFycmF5PFNlbGVjdG9yPiA9IFtuZXcgU2VsZWN0b3IoT2JqZWN0TWV0YS5LZXlDbGFzcywgY2xhc3NOYW1lKV07XG4gICAgICAgICAgICBsZXQgcHJvcGVydHlNYXAgPSB0aGlzLl9tZXRhLm5ld1Byb3BlcnRpZXNNYXAoKTtcbiAgICAgICAgICAgIHNlbGVjdG9yc1swXS5pc0RlY2wgPSB0cnVlO1xuXG4gICAgICAgICAgICBsZXQgcnVsZTogUnVsZSA9IG5ldyBSdWxlKHNlbGVjdG9ycywgcHJvcGVydHlNYXAsIE9iamVjdE1ldGEuQ2xhc3NSdWxlUHJpb3JpdHkpO1xuICAgICAgICAgICAgdGhpcy5fbWV0YS5hZGRSdWxlKHJ1bGUpO1xuXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyUnVsZXNGb3JGaWVsZHMob2JqZWN0LCBjbGFzc05hbWUpO1xuXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl9tZXRhLmVuZFJ1bGVTZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSByZWdpc3RlclJ1bGVzRm9yRmllbGRzKG9iamVjdDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAvLyB0b2RvOiBDYW4gd2Ugc29tZWhvdyB1dGlsaXplIGRlY29yYXRvcnM/IE1heWJlIGZvciBsb2NhbCB0eXBlc2NyaXB0IGRlZmluZWQgb2JqZWN0LCBidXRcbiAgICAgICAgLy8gbm90IG9iamVjdHMgbG9hZGVkIGFzIGpzb24gZnJvbSByZXN0IEFQSVxuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KG9iamVjdFsnJHByb3RvJ10pLFxuICAgICAgICAgICAgJ0Nhbm5vdCByZWdpc3RlciBmaWVsZHMgd2l0aG91dCBhICRwcm90byBtZXRob2QgdGhhdCB3aWxsIGV4cG9zZSBhbGwgdGhlIGZpZWxkcycpO1xuICAgICAgICBsZXQgaW5zdGFuY2U6IGFueSA9IG9iamVjdFsnJHByb3RvJ10oKTtcbiAgICAgICAgbGV0IGZpZWxkTmFtZXMgPSBPYmplY3Qua2V5cyhpbnN0YW5jZSk7XG5cbiAgICAgICAgbGV0IHJhbmsgPSAwO1xuICAgICAgICBmb3IgKGxldCBuYW1lIG9mIGZpZWxkTmFtZXMpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGNoZWNrPT4gIGNhbiB3ZSByZWx5IG9uIHRoaXMgP1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBpbnN0YW5jZVtuYW1lXS5jb25zdHJ1Y3Rvci5uYW1lO1xuXG4gICAgICAgICAgICBsZXQgcHJvcGVydGllcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgICAgICAgIHByb3BlcnRpZXMuc2V0KE9iamVjdE1ldGEuS2V5RmllbGQsIG5hbWUpO1xuICAgICAgICAgICAgcHJvcGVydGllcy5zZXQoT2JqZWN0TWV0YS5LZXlUeXBlLCB0eXBlKTtcblxuICAgICAgICAgICAgcHJvcGVydGllcy5zZXQoT2JqZWN0TWV0YS5LZXlWaXNpYmxlLCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkoaW5zdGFuY2VbbmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGluc3RhbmNlW25hbWVdLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgICAgICcgQ2Fubm90IHJlZ2lzdGVyIHR5cGVbYXJyYXldIGFuZCBpdHMgdHlwZSB3aXRob3V0IHByb3Blcmx5IGluaXRpYWxpemVkICcgK1xuICAgICAgICAgICAgICAgICAgICAncHJvdG90eXBlJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpbnN0YW5jZVtuYW1lXVswXTtcbiAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbkVsZW1lbnRUeXBlID0gaXRlbS5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuc2V0KE9iamVjdE1ldGEuS2V5RWxlbWVudFR5cGUsIGNvbGxlY3Rpb25FbGVtZW50VHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3Rvckxpc3Q6IEFycmF5PFNlbGVjdG9yPiA9IFtcbiAgICAgICAgICAgICAgICBuZXcgU2VsZWN0b3IoT2JqZWN0TWV0YS5LZXlDbGFzcywgY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICBuZXcgU2VsZWN0b3IoT2JqZWN0TWV0YS5LZXlGaWVsZCwgbmFtZSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgc2VsZWN0b3JMaXN0WzFdLmlzRGVjbCA9IHRydWU7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnNldChPYmplY3RNZXRhLktleVJhbmssIChyYW5rKysgKyAxKSAqIDEwKTtcblxuICAgICAgICAgICAgbGV0IHJ1bGU6IFJ1bGUgPSBuZXcgUnVsZShzZWxlY3Rvckxpc3QsIHByb3BlcnRpZXMsIE9iamVjdE1ldGEuQ2xhc3NSdWxlUHJpb3JpdHkpO1xuICAgICAgICAgICAgdGhpcy5fbWV0YS5hZGRSdWxlKHJ1bGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBzcGVjaWFscyB0eXBlcyB0aGF0IHdlIGFyZSByZWFkIGR1cmluZyBpbnRyb3NwZWN0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgRmllbGRUeXBlSW50cm9zcGVjdGlvbk1ldGFQcm92aWRlciBpbXBsZW1lbnRzIFZhbHVlUXVlcmllZE9ic2VydmVyIHtcblxuICAgIG5vdGlmeShtZXRhOiBNZXRhLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAvLyBwcmludCgnRmllbGRUeXBlSW50cm9zcGVjdGlvbk1ldGFQcm92aWRlciBub3RpZmllZCBvZiBmaXJzdCB1c2Ugb2YgZmllbGQ6ICAnICwgdmFsdWUpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBjbGFzcyBPYmplY3RNZXRhUHJvcGVydHlNYXAgZXh0ZW5kcyBQcm9wZXJ0eU1hcCB7XG4gICAgcHJpdmF0ZSBfZmllbGRQYXRoOiBGaWVsZFBhdGg7XG5cblxuICAgIGdldCBmaWVsZFBhdGgoKTogRmllbGRQYXRoIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fZmllbGRQYXRoKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXQoT2JqZWN0TWV0YS5LZXlWYWx1ZSk7XG4gICAgICAgICAgICBsZXQgZmllbGROYW1lID0gdGhpcy5nZXQoT2JqZWN0TWV0YS5LZXlGaWVsZCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2ZpZWxkUGF0aCA9IChpc1ByZXNlbnQoZmllbGROYW1lKSAmJiBpc0JsYW5rKHZhbHVlKSlcbiAgICAgICAgICAgICAgICA/IG5ldyBGaWVsZFBhdGgoZmllbGROYW1lKVxuICAgICAgICAgICAgICAgIDogT2JqZWN0TWV0YS5fRmllbGRQYXRoTnVsbE1hcmtlcjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaXNOdWxsUGF0aCA9IHRoaXMuX2ZpZWxkUGF0aCA9PT0gT2JqZWN0TWV0YS5fRmllbGRQYXRoTnVsbE1hcmtlcjtcbiAgICAgICAgcmV0dXJuIGlzTnVsbFBhdGggPyBudWxsIDogdGhpcy5fZmllbGRQYXRoO1xuICAgIH1cblxuICAgIGlzRmllbGROdWxsTWFya2VyKHZhbHVlOiBGaWVsZFBhdGgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh2YWx1ZSkgJiYgdmFsdWUucGF0aCA9PT0gJ251bGwnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgT01Qcm9wZXJ0eU1lcmdlcl9WYWxpZCBpbXBsZW1lbnRzIFByb3BlcnR5TWVyZ2VyLCBQcm9wZXJ0eU1lcmdlcklzQ2hhaW5pbmcge1xuICAgIF9tZXRhOiBNZXRhO1xuICAgIGlzUHJvcE1lcmdlcklzQ2hhaW5pbmdNYXJrOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgbWVyZ2Uob3JpZzogYW55LCBvdmVycmlkZTogYW55LCBpc0RlY2xhcmU6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICAvLyBpZiBmaXJzdCBpcyBlcnJvciAoZXJyb3IgbWVzc2FnZSBvciBmYWxzZSwgaXQgd2lucyksIG90aGVyd2lzZSBzZWNvbmRcbiAgICAgICAgcmV0dXJuIChpc1N0cmluZyhvdmVycmlkZSkgfHwgKGlzQm9vbGVhbihvdmVycmlkZSkgJiYgQm9vbGVhbldyYXBwZXIuaXNGYWxzZShcbiAgICAgICAgICAgIG92ZXJyaWRlKSkpID8gb3ZlcnJpZGUgOiBvcmlnO1xuICAgIH1cblxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiAnVkFMSURBVEUnO1xuICAgIH1cbn1cblxuXG4iXX0=