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
import {Injector, Type} from '@angular/core';
import {
    assert,
    BooleanWrapper,
    FieldPath,
    isArray,
    isBlank,
    isBoolean,
    isPresent,
    isString
} from '@aribaui/core';
import {ComponentRegistry} from '@aribaui/components';
import {
    Meta,
    PropertyMap,
    PropertyMerger,
    PropertyMerger_And,
    PropertyMergerIsChaining,
    ValueQueriedObserver
} from './meta';
import {Context, ObjectMetaContext} from './context';
import {ItemProperties} from './item-properties';
import {Rule, Selector} from './rule';

/**
 * ObjectMeta is resposible for setting up everything related to class, field, actions
 *
 */
export class ObjectMeta extends Meta {
    static KeyClass = 'class';
    static KeyField = 'field';
    static KeyAction = 'action';
    static KeyActionCategory = 'actionCategory';
    static KeyObject = 'object';
    static KeyValue = 'value';
    static KeyType = 'type';
    static KeyElementType = 'elementType';
    static readonly KeyTraitGroup = 'traitGroup';
    static KeyVisible = 'visible';
    static KeyEditable = 'editable';
    static KeyValid = 'valid';
    static KeyRank = 'rank';
    static readonly DefaultActionCategory = 'General';

    static readonly _FieldPathNullMarker = new FieldPath('null');


    _traitToGroup: Map<string, string>;
    _traitToGroupGeneration: number = -1;


    /**
     *  Can inject these directly but want to keep this as much as possible with any angular
     *  dependecies as we will be using these core rule classes outside of UI code
     */
    protected _componentRegistry: ComponentRegistry;
    protected _injector: Injector;


    static validationError(context: Context): string {
        let error = context.propertyForKey(ObjectMeta.KeyValid);
        if (isBlank(error)) {
            return null;
        }

        if (isBoolean(error)) {
            return BooleanWrapper.boleanValue(error) ? null : 'Invalid entry';
        }
        return error.toString();
    }

    // todo: implement new decorators in typescript if we want ot annotate _annotationProcessors

    constructor() {
        super();

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


    /*
     *  Provide subclass context with conveniences for getting object field values
     */
    newContext(): Context {
        return new ObjectMetaContext(this, false);
    }


    // Use a special map subsclass for our Properties
    newPropertiesMap(): PropertyMap {
        return new ObjectMetaPropertyMap();
    }

    itemNames(context: Context, key: string): Array<string> {
        context.push();
        context.set(ObjectMeta.KeyDeclare, key);
        let itemsNames = context.listPropertyForKey(key);
        context.pop();

        return itemsNames;
    }


    itemProperties(context: Context, key: string, filterHidden: boolean): Array<ItemProperties> {
        return this.itemPropertiesForNames(context, key, this.itemNames(context, key),
            filterHidden);
    }

    itemPropertiesForNames(context: Context, key: string, itemNames: string[],
                           filterHidden: boolean): Array<ItemProperties> {
        let result: Array<ItemProperties> = [];
        for (let itemName of itemNames) {
            context.push();
            context.set(key, itemName);

            let isVisible = context.allProperties().get(ObjectMeta.KeyVisible);
            let visible = context.staticallyResolveValue(isVisible);

            let isHidden = (isBlank(visible)) || BooleanWrapper.isFalse(visible);

            if (!isHidden || !filterHidden) {
                result.push(new ItemProperties(itemName, context.allProperties(), isHidden));
            }
            context.pop();
        }
        return result;
    }


    groupForTrait(trait: string): string {
        if (this._traitToGroup == null || this._traitToGroupGeneration < this.ruleSetGeneration) {
            this._traitToGroupGeneration = this.ruleSetGeneration;
            this._traitToGroup = new Map<string, string>();

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

    set injector(value: Injector) {
        this._injector = value;
    }


    get injector(): Injector {
        return this._injector;
    }

    get componentRegistry(): ComponentRegistry {
        return this._componentRegistry;
    }

    set componentRegistry(value: ComponentRegistry) {
        this._componentRegistry = value;
    }
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
export class IntrospectionMetaProvider implements ValueQueriedObserver {
    private _meta: Meta;

    notify(meta: Meta, key: string, value: any): void {
        this._meta = meta;
        let myObject;

        let componentRegistry: ComponentRegistry = (<ObjectMeta>this._meta).componentRegistry;
        assert(isPresent(componentRegistry),
            'Component registry is not initialized');

        let clazz: Type<any> = null;
        if (isString(value) && (clazz = componentRegistry.nameToType.get(value))
            && isPresent(clazz)) {
            myObject = new clazz();
        } else if (isBlank(clazz)) {
            return;
        }

        assert(Meta.className(myObject) === value,
            'Trying to process and register a class that does not exists on Context');
        this.registerRulesForClass(myObject, value);

    }

    private registerRulesForClass(object: any, className: string): void {
        this._meta.keyData(ObjectMeta.KeyClass).setParent(className, 'Object');

        this._meta.beginRuleSet(className);

        try {
            let selectors: Array<Selector> = [new Selector(ObjectMeta.KeyClass, className)];
            let propertyMap = this._meta.newPropertiesMap();
            selectors[0].isDecl = true;

            let rule: Rule = new Rule(selectors, propertyMap, ObjectMeta.ClassRulePriority);
            this._meta.addRule(rule);

            this.registerRulesForFields(object, className);

        } finally {
            this._meta.endRuleSet();
        }
    }


    private registerRulesForFields(object: any, className: string): void {
        // todo: Can we somehow utilize decorators? Maybe for local typescript defined object, but
        // not objects loaded as json from rest API
        assert(isPresent(object['$proto']),
            'Cannot register fields without a $proto method that will expose all the fields');
        let instance: any = object['$proto']();
        let fieldNames = Object.keys(instance);

        let rank = 0;
        for (let name of fieldNames) {
            // todo: check=>  can we rely on this ?
            let type = instance[name].constructor.name;

            let properties = new Map<string, any>();

            properties.set(ObjectMeta.KeyField, name);
            properties.set(ObjectMeta.KeyType, type);

            properties.set(ObjectMeta.KeyVisible, true);

            if (isArray(instance[name])) {
                assert(instance[name].length > 0,
                    ' Cannot register type[array] and its type without properly initialized ' +
                    'prototype');
                let item = instance[name][0];
                let collectionElementType = item.constructor.name;
                properties.set(ObjectMeta.KeyElementType, collectionElementType);
            }

            let selectorList: Array<Selector> = [
                new Selector(ObjectMeta.KeyClass, className),
                new Selector(ObjectMeta.KeyField, name),
            ];
            selectorList[1].isDecl = true;
            properties.set(ObjectMeta.KeyRank, (rank++ + 1) * 10);

            let rule: Rule = new Rule(selectorList, properties, ObjectMeta.ClassRulePriority);
            this._meta.addRule(rule);
        }
    }
}

/**
 * Registers specials types that we are read during introspections
 */
export class FieldTypeIntrospectionMetaProvider implements ValueQueriedObserver {

    notify(meta: Meta, key: string, value: any): void {
        // print('FieldTypeIntrospectionMetaProvider notified of first use of field:  ' , value);
    }

}


export class ObjectMetaPropertyMap extends PropertyMap {
    private _fieldPath: FieldPath;


    get fieldPath(): FieldPath {
        if (isBlank(this._fieldPath)) {
            let value = this.get(ObjectMeta.KeyValue);
            let fieldName = this.get(ObjectMeta.KeyField);

            this._fieldPath = (isPresent(fieldName) && isBlank(value))
                ? new FieldPath(fieldName)
                : ObjectMeta._FieldPathNullMarker;
        }
        let isNullPath = this._fieldPath === ObjectMeta._FieldPathNullMarker;
        return isNullPath ? null : this._fieldPath;
    }

    isFieldNullMarker(value: FieldPath): boolean {
        return isPresent(value) && value.path === 'null';
    }
}


export class OMPropertyMerger_Valid implements PropertyMerger, PropertyMergerIsChaining {
    _meta: Meta;
    isPropMergerIsChainingMark: boolean = true;


    merge(orig: any, override: any, isDeclare: boolean): any {
        // if first is error (error message or false, it wins), otherwise second
        return (isString(override) || (isBoolean(override) && BooleanWrapper.isFalse(
            override))) ? override : orig;
    }


    toString() {
        return 'VALIDATE';
    }
}


