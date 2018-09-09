/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @type {?} */
        let error = context.propertyForKey(ObjectMeta.KeyValid);
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
        /** @type {?} */
        let itemsNames = context.listPropertyForKey(key);
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
        /** @type {?} */
        let result = [];
        for (let itemName of itemNames) {
            context.push();
            context.set(key, itemName);
            /** @type {?} */
            let isVisible = context.allProperties().get(ObjectMeta.KeyVisible);
            /** @type {?} */
            let visible = context.staticallyResolveValue(isVisible);
            /** @type {?} */
            let isHidden = (isBlank(visible)) || BooleanWrapper.isFalse(visible);
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
            /** @type {?} */
            let context = this.newContext();
            for (let group of this.itemNames(context, ObjectMeta.KeyTraitGroup)) {
                context.push();
                context.set(ObjectMeta.KeyTraitGroup, group);
                for (let name of this.itemNames(context, ObjectMeta.KeyTrait)) {
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
export class IntrospectionMetaProvider {
    /**
     * @param {?} meta
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    notify(meta, key, value) {
        this._meta = meta;
        /** @type {?} */
        let myObject;
        /** @type {?} */
        let componentRegistry = (/** @type {?} */ (this._meta)).componentRegistry;
        assert(isPresent(componentRegistry), 'Component registry is not initialized');
        /** @type {?} */
        let clazz = null;
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
            /** @type {?} */
            let selectors = [new Selector(ObjectMeta.KeyClass, className)];
            /** @type {?} */
            let propertyMap = this._meta.newPropertiesMap();
            selectors[0].isDecl = true;
            /** @type {?} */
            let rule = new Rule(selectors, propertyMap, ObjectMeta.ClassRulePriority);
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
        /** @type {?} */
        let instance = object['$proto']();
        /** @type {?} */
        let fieldNames = Object.keys(instance);
        /** @type {?} */
        let rank = 0;
        for (let name of fieldNames) {
            /** @type {?} */
            let type = instance[name].constructor.name;
            /** @type {?} */
            let properties = new Map();
            properties.set(ObjectMeta.KeyField, name);
            properties.set(ObjectMeta.KeyType, type);
            properties.set(ObjectMeta.KeyVisible, true);
            if (isArray(instance[name])) {
                assert(instance[name].length > 0, ' Cannot register type[array] and its type without properly initialized ' +
                    'prototype');
                /** @type {?} */
                let item = instance[name][0];
                /** @type {?} */
                let collectionElementType = item.constructor.name;
                properties.set(ObjectMeta.KeyElementType, collectionElementType);
            }
            /** @type {?} */
            let selectorList = [
                new Selector(ObjectMeta.KeyClass, className),
                new Selector(ObjectMeta.KeyField, name),
            ];
            selectorList[1].isDecl = true;
            properties.set(ObjectMeta.KeyRank, (rank++ + 1) * 10);
            /** @type {?} */
            let rule = new Rule(selectorList, properties, ObjectMeta.ClassRulePriority);
            this._meta.addRule(rule);
        }
    }
}
if (false) {
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
            /** @type {?} */
            let value = this.get(ObjectMeta.KeyValue);
            /** @type {?} */
            let fieldName = this.get(ObjectMeta.KeyField);
            this._fieldPath = (isPresent(fieldName) && isBlank(value))
                ? new FieldPath(fieldName)
                : ObjectMeta._FieldPathNullMarker;
        }
        /** @type {?} */
        let isNullPath = this._fieldPath === ObjectMeta._FieldPathNullMarker;
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
if (false) {
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
if (false) {
    /** @type {?} */
    OMPropertyMerger_Valid.prototype._meta;
    /** @type {?} */
    OMPropertyMerger_Valid.prototype.isPropMergerIsChainingMark;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LW1ldGEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL29iamVjdC1tZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILE1BQU0sRUFDTixjQUFjLEVBQ2QsU0FBUyxFQUNULE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxFQUNULFNBQVMsRUFDVCxRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNILElBQUksRUFDSixXQUFXLEVBRVgsa0JBQWtCLEVBR3JCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBVSxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNyRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7O0FBTXRDLE1BQU0saUJBQWtCLFNBQVEsSUFBSTtJQTZDaEM7UUFDSSxLQUFLLEVBQUUsQ0FBQzt1Q0ExQnNCLENBQUMsQ0FBQztRQTRCaEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxrQ0FBa0MsRUFBRSxDQUFDLENBQUM7O1FBRzNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFHbkQsSUFB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LG9CQUFvQixDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUM5Qzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxLQUFnQjtRQUM5QixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO0tBQ3BEO0NBQ0o7Ozs7O0FBR0QsTUFBTTs7MENBRW9DLElBQUk7Ozs7Ozs7O0lBRzFDLEtBQUssQ0FBQyxJQUFTLEVBQUUsUUFBYSxFQUFFLFNBQWtCOztRQUU5QyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FDeEUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNyQzs7OztJQUdELFFBQVE7UUFDSixNQUFNLENBQUMsVUFBVSxDQUFDO0tBQ3JCO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0b3IsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBhc3NlcnQsXG4gICAgQm9vbGVhbldyYXBwZXIsXG4gICAgRmllbGRQYXRoLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc0Jvb2xlYW4sXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5pbXBvcnQge1xuICAgIE1ldGEsXG4gICAgUHJvcGVydHlNYXAsXG4gICAgUHJvcGVydHlNZXJnZXIsXG4gICAgUHJvcGVydHlNZXJnZXJfQW5kLFxuICAgIFByb3BlcnR5TWVyZ2VySXNDaGFpbmluZyxcbiAgICBWYWx1ZVF1ZXJpZWRPYnNlcnZlclxufSBmcm9tICcuL21ldGEnO1xuaW1wb3J0IHtDb250ZXh0LCBPYmplY3RNZXRhQ29udGV4dH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4vaXRlbS1wcm9wZXJ0aWVzJztcbmltcG9ydCB7UnVsZSwgU2VsZWN0b3J9IGZyb20gJy4vcnVsZSc7XG5cbi8qKlxuICogT2JqZWN0TWV0YSBpcyByZXNwb3NpYmxlIGZvciBzZXR0aW5nIHVwIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byBjbGFzcywgZmllbGQsIGFjdGlvbnNcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RNZXRhIGV4dGVuZHMgTWV0YSB7XG4gICAgc3RhdGljIEtleUNsYXNzID0gJ2NsYXNzJztcbiAgICBzdGF0aWMgS2V5RmllbGQgPSAnZmllbGQnO1xuICAgIHN0YXRpYyBLZXlBY3Rpb24gPSAnYWN0aW9uJztcbiAgICBzdGF0aWMgS2V5QWN0aW9uQ2F0ZWdvcnkgPSAnYWN0aW9uQ2F0ZWdvcnknO1xuICAgIHN0YXRpYyBLZXlPYmplY3QgPSAnb2JqZWN0JztcbiAgICBzdGF0aWMgS2V5VmFsdWUgPSAndmFsdWUnO1xuICAgIHN0YXRpYyBLZXlUeXBlID0gJ3R5cGUnO1xuICAgIHN0YXRpYyBLZXlFbGVtZW50VHlwZSA9ICdlbGVtZW50VHlwZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEtleVRyYWl0R3JvdXAgPSAndHJhaXRHcm91cCc7XG4gICAgc3RhdGljIEtleVZpc2libGUgPSAndmlzaWJsZSc7XG4gICAgc3RhdGljIEtleUVkaXRhYmxlID0gJ2VkaXRhYmxlJztcbiAgICBzdGF0aWMgS2V5VmFsaWQgPSAndmFsaWQnO1xuICAgIHN0YXRpYyBLZXlSYW5rID0gJ3JhbmsnO1xuICAgIHN0YXRpYyByZWFkb25seSBEZWZhdWx0QWN0aW9uQ2F0ZWdvcnkgPSAnR2VuZXJhbCc7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgX0ZpZWxkUGF0aE51bGxNYXJrZXIgPSBuZXcgRmllbGRQYXRoKCdudWxsJyk7XG5cblxuICAgIF90cmFpdFRvR3JvdXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XG4gICAgX3RyYWl0VG9Hcm91cEdlbmVyYXRpb246IG51bWJlciA9IC0xO1xuXG5cbiAgICAvKipcbiAgICAgKiAgQ2FuIGluamVjdCB0aGVzZSBkaXJlY3RseSBidXQgd2FudCB0byBrZWVwIHRoaXMgYXMgbXVjaCBhcyBwb3NzaWJsZSB3aXRoIGFueSBhbmd1bGFyXG4gICAgICogIGRlcGVuZGVjaWVzIGFzIHdlIHdpbGwgYmUgdXNpbmcgdGhlc2UgY29yZSBydWxlIGNsYXNzZXMgb3V0c2lkZSBvZiBVSSBjb2RlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9jb21wb25lbnRSZWdpc3RyeTogQ29tcG9uZW50UmVnaXN0cnk7XG4gICAgcHJvdGVjdGVkIF9pbmplY3RvcjogSW5qZWN0b3I7XG5cblxuICAgIHN0YXRpYyB2YWxpZGF0aW9uRXJyb3IoY29udGV4dDogQ29udGV4dCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBlcnJvciA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoT2JqZWN0TWV0YS5LZXlWYWxpZCk7XG4gICAgICAgIGlmIChpc0JsYW5rKGVycm9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCb29sZWFuKGVycm9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKGVycm9yKSA/IG51bGwgOiAnSW52YWxpZCBlbnRyeSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9yLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy8gdG9kbzogaW1wbGVtZW50IG5ldyBkZWNvcmF0b3JzIGluIHR5cGVzY3JpcHQgaWYgd2Ugd2FudCBvdCBhbm5vdGF0ZSBfYW5ub3RhdGlvblByb2Nlc3NvcnNcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJLZXlJbml0T2JzZXJ2ZXIoT2JqZWN0TWV0YS5LZXlDbGFzcywgbmV3IEludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJLZXlJbml0T2JzZXJ2ZXIoT2JqZWN0TWV0YS5LZXlUeXBlLCBuZXcgRmllbGRUeXBlSW50cm9zcGVjdGlvbk1ldGFQcm92aWRlcigpKTtcblxuICAgICAgICAvLyBUaGVzZSBrZXlzIGRlZmluZSBzY29wZXMgZm9yIHRoZWlyIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5kZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoT2JqZWN0TWV0YS5LZXlGaWVsZCk7XG4gICAgICAgIHRoaXMuZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKE9iamVjdE1ldGEuS2V5QWN0aW9uKTtcbiAgICAgICAgdGhpcy5kZWZpbmVLZXlBc1Byb3BlcnR5U2NvcGUoT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSk7XG4gICAgICAgIHRoaXMuZGVmaW5lS2V5QXNQcm9wZXJ0eVNjb3BlKE9iamVjdE1ldGEuS2V5Q2xhc3MpO1xuXG4gICAgICAgIC8vIHBvbGljaWVzIGZvciBjaGFpbmluZyBjZXJ0YWluIHdlbGwga25vd24gcHJvcGVydGllc1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlWaXNpYmxlLCBuZXcgUHJvcGVydHlNZXJnZXJfQW5kKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlFZGl0YWJsZSwgbmV3IFByb3BlcnR5TWVyZ2VyX0FuZCgpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5VmFsaWQsIG5ldyBPTVByb3BlcnR5TWVyZ2VyX1ZhbGlkKCkpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleUNsYXNzLCBNZXRhLlByb3BlcnR5TWVyZ2VyX0RlY2xhcmVMaXN0KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclByb3BlcnR5TWVyZ2VyKE9iamVjdE1ldGEuS2V5RmllbGQsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlBY3Rpb24sIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJvcGVydHlNZXJnZXIoT2JqZWN0TWV0YS5LZXlBY3Rpb25DYXRlZ29yeSwgTWV0YS5Qcm9wZXJ0eU1lcmdlcl9EZWNsYXJlTGlzdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm9wZXJ0eU1lcmdlcihPYmplY3RNZXRhLktleVRyYWl0R3JvdXAsIE1ldGEuUHJvcGVydHlNZXJnZXJfRGVjbGFyZUxpc3QpO1xuXG4gICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoT2JqZWN0TWV0YS5LZXlDbGFzcywgT2JqZWN0TWV0YS5LZXlDbGFzcyk7XG4gICAgICAgIHRoaXMubWlycm9yUHJvcGVydHlUb0NvbnRleHQoT2JqZWN0TWV0YS5LZXlUeXBlLCBPYmplY3RNZXRhLktleVR5cGUpO1xuICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KE9iamVjdE1ldGEuS2V5RWxlbWVudFR5cGUsIE9iamVjdE1ldGEuS2V5RWxlbWVudFR5cGUpO1xuICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KE9iamVjdE1ldGEuS2V5VHJhaXQsIE1ldGEuS2V5VHJhaXQpO1xuICAgICAgICB0aGlzLm1pcnJvclByb3BlcnR5VG9Db250ZXh0KE9iamVjdE1ldGEuS2V5RWRpdGFibGUsIE9iamVjdE1ldGEuS2V5RWRpdGFibGUpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJWYWx1ZVRyYW5zZm9ybWVyRm9yS2V5KE9iamVjdE1ldGEuS2V5T2JqZWN0LCBNZXRhLlRyYW5zZm9ybWVyX0tleVByZXNlbnQpO1xuXG4gICAgICAgIC8vIHRvZG86IHRyeSB0byBzdXBwb3J0IGRlY29yYXRvcnMgYW5kIGhvdyB3ZSBjYW4gcHV0IG1ldGEgZGF0YSBpbnRvIG9iamVjdCBAVHJhaXRzLFxuICAgICAgICAvLyBAUHJvcGVydGllcywgQEFjdGlvblxuICAgIH1cblxuXG4gICAgLypcbiAgICAgKiAgUHJvdmlkZSBzdWJjbGFzcyBjb250ZXh0IHdpdGggY29udmVuaWVuY2VzIGZvciBnZXR0aW5nIG9iamVjdCBmaWVsZCB2YWx1ZXNcbiAgICAgKi9cbiAgICBuZXdDb250ZXh0KCk6IENvbnRleHQge1xuICAgICAgICByZXR1cm4gbmV3IE9iamVjdE1ldGFDb250ZXh0KHRoaXMsIGZhbHNlKTtcbiAgICB9XG5cblxuICAgIC8vIFVzZSBhIHNwZWNpYWwgbWFwIHN1YnNjbGFzcyBmb3Igb3VyIFByb3BlcnRpZXNcbiAgICBuZXdQcm9wZXJ0aWVzTWFwKCk6IFByb3BlcnR5TWFwIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYmplY3RNZXRhUHJvcGVydHlNYXAoKTtcbiAgICB9XG5cbiAgICBpdGVtTmFtZXMoY29udGV4dDogQ29udGV4dCwga2V5OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgIGNvbnRleHQuc2V0KE9iamVjdE1ldGEuS2V5RGVjbGFyZSwga2V5KTtcbiAgICAgICAgbGV0IGl0ZW1zTmFtZXMgPSBjb250ZXh0Lmxpc3RQcm9wZXJ0eUZvcktleShrZXkpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgICAgIHJldHVybiBpdGVtc05hbWVzO1xuICAgIH1cblxuXG4gICAgaXRlbVByb3BlcnRpZXMoY29udGV4dDogQ29udGV4dCwga2V5OiBzdHJpbmcsIGZpbHRlckhpZGRlbjogYm9vbGVhbik6IEFycmF5PEl0ZW1Qcm9wZXJ0aWVzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1Qcm9wZXJ0aWVzRm9yTmFtZXMoY29udGV4dCwga2V5LCB0aGlzLml0ZW1OYW1lcyhjb250ZXh0LCBrZXkpLFxuICAgICAgICAgICAgZmlsdGVySGlkZGVuKTtcbiAgICB9XG5cbiAgICBpdGVtUHJvcGVydGllc0Zvck5hbWVzKGNvbnRleHQ6IENvbnRleHQsIGtleTogc3RyaW5nLCBpdGVtTmFtZXM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySGlkZGVuOiBib29sZWFuKTogQXJyYXk8SXRlbVByb3BlcnRpZXM+IHtcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8SXRlbVByb3BlcnRpZXM+ID0gW107XG4gICAgICAgIGZvciAobGV0IGl0ZW1OYW1lIG9mIGl0ZW1OYW1lcykge1xuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChrZXksIGl0ZW1OYW1lKTtcblxuICAgICAgICAgICAgbGV0IGlzVmlzaWJsZSA9IGNvbnRleHQuYWxsUHJvcGVydGllcygpLmdldChPYmplY3RNZXRhLktleVZpc2libGUpO1xuICAgICAgICAgICAgbGV0IHZpc2libGUgPSBjb250ZXh0LnN0YXRpY2FsbHlSZXNvbHZlVmFsdWUoaXNWaXNpYmxlKTtcblxuICAgICAgICAgICAgbGV0IGlzSGlkZGVuID0gKGlzQmxhbmsodmlzaWJsZSkpIHx8IEJvb2xlYW5XcmFwcGVyLmlzRmFsc2UodmlzaWJsZSk7XG5cbiAgICAgICAgICAgIGlmICghaXNIaWRkZW4gfHwgIWZpbHRlckhpZGRlbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBJdGVtUHJvcGVydGllcyhpdGVtTmFtZSwgY29udGV4dC5hbGxQcm9wZXJ0aWVzKCksIGlzSGlkZGVuKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBncm91cEZvclRyYWl0KHRyYWl0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5fdHJhaXRUb0dyb3VwID09IG51bGwgfHwgdGhpcy5fdHJhaXRUb0dyb3VwR2VuZXJhdGlvbiA8IHRoaXMucnVsZVNldEdlbmVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3RyYWl0VG9Hcm91cEdlbmVyYXRpb24gPSB0aGlzLnJ1bGVTZXRHZW5lcmF0aW9uO1xuICAgICAgICAgICAgdGhpcy5fdHJhaXRUb0dyb3VwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm5ld0NvbnRleHQoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwIG9mIHRoaXMuaXRlbU5hbWVzKGNvbnRleHQsIE9iamVjdE1ldGEuS2V5VHJhaXRHcm91cCkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNldChPYmplY3RNZXRhLktleVRyYWl0R3JvdXAsIGdyb3VwKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IG5hbWUgb2YgdGhpcy5pdGVtTmFtZXMoY29udGV4dCwgT2JqZWN0TWV0YS5LZXlUcmFpdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhaXRUb0dyb3VwLnNldChuYW1lLCBncm91cCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWl0VG9Hcm91cC5nZXQodHJhaXQpO1xuICAgIH1cblxuICAgIHNldCBpbmplY3Rvcih2YWx1ZTogSW5qZWN0b3IpIHtcbiAgICAgICAgdGhpcy5faW5qZWN0b3IgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmplY3RvcjtcbiAgICB9XG5cbiAgICBnZXQgY29tcG9uZW50UmVnaXN0cnkoKTogQ29tcG9uZW50UmVnaXN0cnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50UmVnaXN0cnk7XG4gICAgfVxuXG4gICAgc2V0IGNvbXBvbmVudFJlZ2lzdHJ5KHZhbHVlOiBDb21wb25lbnRSZWdpc3RyeSkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRSZWdpc3RyeSA9IHZhbHVlO1xuICAgIH1cbn1cblxuLyoqXG4gKiBXaGVuIGEgY2xhc3MgaXMgcHVzaGVkIGVpdGhlciBkaXJlY3RseSBvciBpbmRpcmVjdGx5ICh1c2luZyBkZWZmZXJlZCBydWxlcykgd2UgcmVjZWl2ZSBhXG4gKiBWYWx1ZVF1ZXJpZWRPYnNlcnZlciBub3RpZmljYXRpb24gaW4gb3JkZXIgdG8gcmVnaXN0ZXIgIHR5cGVzIGZvciB0aGUgb2JqZWN0LiBUcnlpbmcgdG8gYWNoaWV2ZVxuICogYXQgbGVhc3Qgc29tZSBraW5kIG9mIGludHJvc3BlY3Rpb24gd2UgbmVlZCB0byBpbXBsZW1lbnQgJHByb3RvIG1ldGhvZCBpbnNpZGUgdGhlIG9iamVjdCB0aGF0XG4gKiBpbnN0YW50aWF0ZXMgYWxsIHR5cGVzIHdoaWNoIHdlIGNhbiBxdWVyeS5cbiAqXG4gKiBJZGVhbGx5IHdlIHdhbnQgdG8gdXNlIGRlY29yYXRvcnMgd2hlbiBkZWFsaW5nIHdpdGggY2xpZW50IHNpZGUgdHlwZXNjcmlwdCBjbGFzcy4gYnV0IGZvciBjYXNlc1xuICogd2hlcmUgUnVsZXMgd2lsbCBiZSBsb2FkZWQgdXNpbmcgUmVzdCBBUEkgYWxvbmcgd2l0aCB0aGUgb2JqZWN0IGluc3RhbmNlIGl0cyBpbXBvc3NpYmxlLlxuICovXG5leHBvcnQgY2xhc3MgSW50cm9zcGVjdGlvbk1ldGFQcm92aWRlciBpbXBsZW1lbnRzIFZhbHVlUXVlcmllZE9ic2VydmVyIHtcbiAgICBwcml2YXRlIF9tZXRhOiBNZXRhO1xuXG4gICAgbm90aWZ5KG1ldGE6IE1ldGEsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21ldGEgPSBtZXRhO1xuICAgICAgICBsZXQgbXlPYmplY3Q7XG5cbiAgICAgICAgbGV0IGNvbXBvbmVudFJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeSA9ICg8T2JqZWN0TWV0YT50aGlzLl9tZXRhKS5jb21wb25lbnRSZWdpc3RyeTtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChjb21wb25lbnRSZWdpc3RyeSksXG4gICAgICAgICAgICAnQ29tcG9uZW50IHJlZ2lzdHJ5IGlzIG5vdCBpbml0aWFsaXplZCcpO1xuXG4gICAgICAgIGxldCBjbGF6ejogVHlwZTxhbnk+ID0gbnVsbDtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSAmJiAoY2xhenogPSBjb21wb25lbnRSZWdpc3RyeS5uYW1lVG9UeXBlLmdldCh2YWx1ZSkpXG4gICAgICAgICAgICAmJiBpc1ByZXNlbnQoY2xhenopKSB7XG4gICAgICAgICAgICBteU9iamVjdCA9IG5ldyBjbGF6eigpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQmxhbmsoY2xhenopKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlcnQoTWV0YS5jbGFzc05hbWUobXlPYmplY3QpID09PSB2YWx1ZSxcbiAgICAgICAgICAgICdUcnlpbmcgdG8gcHJvY2VzcyBhbmQgcmVnaXN0ZXIgYSBjbGFzcyB0aGF0IGRvZXMgbm90IGV4aXN0cyBvbiBDb250ZXh0Jyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSdWxlc0ZvckNsYXNzKG15T2JqZWN0LCB2YWx1ZSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyUnVsZXNGb3JDbGFzcyhvYmplY3Q6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWV0YS5rZXlEYXRhKE9iamVjdE1ldGEuS2V5Q2xhc3MpLnNldFBhcmVudChjbGFzc05hbWUsICdPYmplY3QnKTtcblxuICAgICAgICB0aGlzLl9tZXRhLmJlZ2luUnVsZVNldChjbGFzc05hbWUpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0b3JzOiBBcnJheTxTZWxlY3Rvcj4gPSBbbmV3IFNlbGVjdG9yKE9iamVjdE1ldGEuS2V5Q2xhc3MsIGNsYXNzTmFtZSldO1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5TWFwID0gdGhpcy5fbWV0YS5uZXdQcm9wZXJ0aWVzTWFwKCk7XG4gICAgICAgICAgICBzZWxlY3RvcnNbMF0uaXNEZWNsID0gdHJ1ZTtcblxuICAgICAgICAgICAgbGV0IHJ1bGU6IFJ1bGUgPSBuZXcgUnVsZShzZWxlY3RvcnMsIHByb3BlcnR5TWFwLCBPYmplY3RNZXRhLkNsYXNzUnVsZVByaW9yaXR5KTtcbiAgICAgICAgICAgIHRoaXMuX21ldGEuYWRkUnVsZShydWxlKTtcblxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlclJ1bGVzRm9yRmllbGRzKG9iamVjdCwgY2xhc3NOYW1lKTtcblxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fbWV0YS5lbmRSdWxlU2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgcmVnaXN0ZXJSdWxlc0ZvckZpZWxkcyhvYmplY3Q6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gdG9kbzogQ2FuIHdlIHNvbWVob3cgdXRpbGl6ZSBkZWNvcmF0b3JzPyBNYXliZSBmb3IgbG9jYWwgdHlwZXNjcmlwdCBkZWZpbmVkIG9iamVjdCwgYnV0XG4gICAgICAgIC8vIG5vdCBvYmplY3RzIGxvYWRlZCBhcyBqc29uIGZyb20gcmVzdCBBUElcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChvYmplY3RbJyRwcm90byddKSxcbiAgICAgICAgICAgICdDYW5ub3QgcmVnaXN0ZXIgZmllbGRzIHdpdGhvdXQgYSAkcHJvdG8gbWV0aG9kIHRoYXQgd2lsbCBleHBvc2UgYWxsIHRoZSBmaWVsZHMnKTtcbiAgICAgICAgbGV0IGluc3RhbmNlOiBhbnkgPSBvYmplY3RbJyRwcm90byddKCk7XG4gICAgICAgIGxldCBmaWVsZE5hbWVzID0gT2JqZWN0LmtleXMoaW5zdGFuY2UpO1xuXG4gICAgICAgIGxldCByYW5rID0gMDtcbiAgICAgICAgZm9yIChsZXQgbmFtZSBvZiBmaWVsZE5hbWVzKSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBjaGVjaz0+ICBjYW4gd2UgcmVseSBvbiB0aGlzID9cbiAgICAgICAgICAgIGxldCB0eXBlID0gaW5zdGFuY2VbbmFtZV0uY29uc3RydWN0b3IubmFtZTtcblxuICAgICAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnNldChPYmplY3RNZXRhLktleUZpZWxkLCBuYW1lKTtcbiAgICAgICAgICAgIHByb3BlcnRpZXMuc2V0KE9iamVjdE1ldGEuS2V5VHlwZSwgdHlwZSk7XG5cbiAgICAgICAgICAgIHByb3BlcnRpZXMuc2V0KE9iamVjdE1ldGEuS2V5VmlzaWJsZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5KGluc3RhbmNlW25hbWVdKSkge1xuICAgICAgICAgICAgICAgIGFzc2VydChpbnN0YW5jZVtuYW1lXS5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgICAgICAnIENhbm5vdCByZWdpc3RlciB0eXBlW2FycmF5XSBhbmQgaXRzIHR5cGUgd2l0aG91dCBwcm9wZXJseSBpbml0aWFsaXplZCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3Byb3RvdHlwZScpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaW5zdGFuY2VbbmFtZV1bMF07XG4gICAgICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb25FbGVtZW50VHlwZSA9IGl0ZW0uY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnNldChPYmplY3RNZXRhLktleUVsZW1lbnRUeXBlLCBjb2xsZWN0aW9uRWxlbWVudFR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2VsZWN0b3JMaXN0OiBBcnJheTxTZWxlY3Rvcj4gPSBbXG4gICAgICAgICAgICAgICAgbmV3IFNlbGVjdG9yKE9iamVjdE1ldGEuS2V5Q2xhc3MsIGNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAgbmV3IFNlbGVjdG9yKE9iamVjdE1ldGEuS2V5RmllbGQsIG5hbWUpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHNlbGVjdG9yTGlzdFsxXS5pc0RlY2wgPSB0cnVlO1xuICAgICAgICAgICAgcHJvcGVydGllcy5zZXQoT2JqZWN0TWV0YS5LZXlSYW5rLCAocmFuaysrICsgMSkgKiAxMCk7XG5cbiAgICAgICAgICAgIGxldCBydWxlOiBSdWxlID0gbmV3IFJ1bGUoc2VsZWN0b3JMaXN0LCBwcm9wZXJ0aWVzLCBPYmplY3RNZXRhLkNsYXNzUnVsZVByaW9yaXR5KTtcbiAgICAgICAgICAgIHRoaXMuX21ldGEuYWRkUnVsZShydWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBSZWdpc3RlcnMgc3BlY2lhbHMgdHlwZXMgdGhhdCB3ZSBhcmUgcmVhZCBkdXJpbmcgaW50cm9zcGVjdGlvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkVHlwZUludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIgaW1wbGVtZW50cyBWYWx1ZVF1ZXJpZWRPYnNlcnZlciB7XG5cbiAgICBub3RpZnkobWV0YTogTWV0YSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgLy8gcHJpbnQoJ0ZpZWxkVHlwZUludHJvc3BlY3Rpb25NZXRhUHJvdmlkZXIgbm90aWZpZWQgb2YgZmlyc3QgdXNlIG9mIGZpZWxkOiAgJyAsIHZhbHVlKTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgT2JqZWN0TWV0YVByb3BlcnR5TWFwIGV4dGVuZHMgUHJvcGVydHlNYXAge1xuICAgIHByaXZhdGUgX2ZpZWxkUGF0aDogRmllbGRQYXRoO1xuXG5cbiAgICBnZXQgZmllbGRQYXRoKCk6IEZpZWxkUGF0aCB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2ZpZWxkUGF0aCkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0KE9iamVjdE1ldGEuS2V5VmFsdWUpO1xuICAgICAgICAgICAgbGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0KE9iamVjdE1ldGEuS2V5RmllbGQpO1xuXG4gICAgICAgICAgICB0aGlzLl9maWVsZFBhdGggPSAoaXNQcmVzZW50KGZpZWxkTmFtZSkgJiYgaXNCbGFuayh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgPyBuZXcgRmllbGRQYXRoKGZpZWxkTmFtZSlcbiAgICAgICAgICAgICAgICA6IE9iamVjdE1ldGEuX0ZpZWxkUGF0aE51bGxNYXJrZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlzTnVsbFBhdGggPSB0aGlzLl9maWVsZFBhdGggPT09IE9iamVjdE1ldGEuX0ZpZWxkUGF0aE51bGxNYXJrZXI7XG4gICAgICAgIHJldHVybiBpc051bGxQYXRoID8gbnVsbCA6IHRoaXMuX2ZpZWxkUGF0aDtcbiAgICB9XG5cbiAgICBpc0ZpZWxkTnVsbE1hcmtlcih2YWx1ZTogRmllbGRQYXRoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodmFsdWUpICYmIHZhbHVlLnBhdGggPT09ICdudWxsJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE9NUHJvcGVydHlNZXJnZXJfVmFsaWQgaW1wbGVtZW50cyBQcm9wZXJ0eU1lcmdlciwgUHJvcGVydHlNZXJnZXJJc0NoYWluaW5nIHtcbiAgICBfbWV0YTogTWV0YTtcbiAgICBpc1Byb3BNZXJnZXJJc0NoYWluaW5nTWFyazogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIG1lcmdlKG9yaWc6IGFueSwgb3ZlcnJpZGU6IGFueSwgaXNEZWNsYXJlOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgLy8gaWYgZmlyc3QgaXMgZXJyb3IgKGVycm9yIG1lc3NhZ2Ugb3IgZmFsc2UsIGl0IHdpbnMpLCBvdGhlcndpc2Ugc2Vjb25kXG4gICAgICAgIHJldHVybiAoaXNTdHJpbmcob3ZlcnJpZGUpIHx8IChpc0Jvb2xlYW4ob3ZlcnJpZGUpICYmIEJvb2xlYW5XcmFwcGVyLmlzRmFsc2UoXG4gICAgICAgICAgICBvdmVycmlkZSkpKSA/IG92ZXJyaWRlIDogb3JpZztcbiAgICB9XG5cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gJ1ZBTElEQVRFJztcbiAgICB9XG59XG5cblxuIl19