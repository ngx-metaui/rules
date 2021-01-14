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
  BooleanWrapper,
  className,
  isArray,
  isBlank,
  isPresent,
  isString
} from './utils/lang';
import {ComponentRegistry} from './component-registry.service';
import {Context, ObjectMetaContext} from './context';
import {ItemProperties} from './item-properties';
import {Rule, Selector} from './rule';
import {
  addTrait,
  ClassRulePriority,
  DefaultActionCategory,
  KeyAction,
  KeyActionCategory,
  KeyAny,
  KeyClass,
  KeyDeclare,
  KeyEditable,
  KeyElementType,
  KeyField,
  KeyObject,
  KeyRank,
  KeyTrait,
  KeyTraitGroup,
  KeyType,
  KeyValid,
  KeyVisible,
  ValueQueriedObserver
} from './constants';
import {
  ObjectMetaPropertyMap,
  OMPropertyMerger_Valid,
  PropertyMap,
  PropertyMerger_And
} from './policies/merging-policy';
import {Meta} from './meta';
import {CLASS_META, MetaActiondDef, PropertyDef} from './decorators/utils';
import {RuntimeParser} from './compiler/runtime-parser.visitor';
import {CompositeType} from './utils/domain-model';

/**
 * ObjectMeta is responsible for setting up everything related to class, field, actions
 *
 */
export abstract class ObjectMeta extends Meta {

  _traitToGroup: Map<string, string>;
  _traitToGroupGeneration: number = -1;


  constructor(public componentRegistry: ComponentRegistry) {
    super(componentRegistry);

    this.registerKeyInitObserver(KeyClass, new IntrospectionMetaProvider());
    this.registerKeyInitObserver(KeyType, new FieldTypeIntrospectionMetaProvider());

    // These keys define scopes for their properties
    this.defineKeyAsPropertyScope(KeyField);
    this.defineKeyAsPropertyScope(KeyAction);
    this.defineKeyAsPropertyScope(KeyActionCategory);
    this.defineKeyAsPropertyScope(KeyClass);

    // policies for chaining certain well known properties
    this.registerPropertyMerger(KeyVisible, new PropertyMerger_And());
    this.registerPropertyMerger(KeyEditable, new PropertyMerger_And());
    this.registerPropertyMerger(KeyValid, new OMPropertyMerger_Valid());

    this.registerPropertyMerger(KeyClass, this.PropertyMerger_DeclareList);
    this.registerPropertyMerger(KeyField, this.PropertyMerger_DeclareList);
    this.registerPropertyMerger(KeyAction, this.PropertyMerger_DeclareList);
    this.registerPropertyMerger(KeyActionCategory, this.PropertyMerger_DeclareList);
    this.registerPropertyMerger(KeyTraitGroup, this.PropertyMerger_DeclareList);

    this.mirrorPropertyToContext(KeyClass, KeyClass);
    this.mirrorPropertyToContext(KeyType, KeyType);
    this.mirrorPropertyToContext(KeyElementType, KeyElementType);
    this.mirrorPropertyToContext(KeyTrait, KeyTrait);
    this.mirrorPropertyToContext(KeyEditable, KeyEditable);

    this.registerValueTransformerForKey(KeyObject, this.Transformer_KeyPresent);
  }


  /*
   *  Provide subclass context with conveniences for getting object field values
   */
  newContext(isNested: boolean = false): Context {
    return new ObjectMetaContext(this, false);
  }


  // Use a special map subsclass for our Properties
  newPropertiesMap(): PropertyMap {
    return new ObjectMetaPropertyMap();
  }

  groupForTrait(trait: string): string {
    if (this._traitToGroup == null || this._traitToGroupGeneration < this.ruleSetGeneration) {
      this._traitToGroupGeneration = this.ruleSetGeneration;
      this._traitToGroup = new Map<string, string>();

      const context = this.newContext();
      for (const group of this.itemNames(context, KeyTraitGroup)) {
        context.push();
        context.set(KeyTraitGroup, group);

        for (const name of this.itemNames(context, KeyTrait)) {
          this._traitToGroup.set(name, group);
        }
        context.pop();
      }
    }
    return this._traitToGroup.get(trait);
  }


  itemNames(context: Context, key: string): Array<string> {
    context.push();
    context.set(KeyDeclare, key);
    const itemsNames = context.listPropertyForKey(key);
    context.pop();

    return itemsNames;
  }


  itemProperties(context: Context, key: string,
                 filterHidden: boolean): Array<ItemProperties> {
    return this.itemPropertiesForNames(context, key, this.itemNames(context, key), filterHidden);
  }

  protected itemPropertiesForNames(context: Context, key: string, itemNames: string[],
                                   filterHidden: boolean): Array<ItemProperties> {
    const result: Array<ItemProperties> = [];
    for (const itemName of itemNames) {
      context.push();
      context.set(key, itemName);

      const isVisible = context.allProperties().get(KeyVisible);
      const visible = context.staticallyResolveValue(isVisible);

      const isHidden = (isBlank(visible)) || BooleanWrapper.isFalse(visible);

      if (!isHidden || !filterHidden) {
        result.push(new ItemProperties(itemName, context.allProperties(), isHidden));
      }
      context.pop();
    }
    return result;
  }


}

/**
 * When a class is pushed either directly or indirectly (using deferred rules) we receive a
 * ValueQueriedObserver notification in order to register field types for the object. Trying to
 * achieve at least some kind of introspection we need to implement getTypes method from the
 * Deserializable interface that retrieve all types which we can query.
 *
 * Ideally we want to use decorators when dealing with client side typescript class. but for cases
 * where Rules will be loaded using Rest API along with the object instance its impossible.
 */
export class IntrospectionMetaProvider implements ValueQueriedObserver {
  private _meta: Meta;


  notify(meta: Meta, key: string, value: any): void {
    this._meta = meta;
    let myObject;

    const componentRegistry: ComponentRegistry = (<ObjectMeta>this._meta).componentRegistry;
    assert(isPresent(componentRegistry), 'Component registry is not initialized');

    let clazz: Type<any> = null;
    if (isString(value) && (clazz = componentRegistry.nameToType.get(value))
      && isPresent(clazz)) {
      myObject = new clazz();
    } else if (isBlank(clazz)) {
      return;
    }

    assert(className(myObject) === value,
      'Trying to process and register a class that does not exists on Context');
    this.registerRulesForClass(myObject, value);

  }

  private registerRulesForClass(object: any, clazzName: string): void {
    this._meta.keyData(KeyClass).setParent(clazzName, 'Object');

    this._meta.beginRuleSet(clazzName);

    try {
      const selectors: Array<Selector> = [new Selector(KeyClass, clazzName)];
      const propertyMap = this._meta.newPropertiesMap();
      selectors[0].isDecl = true;
      const rule: Rule = new Rule(selectors, propertyMap, ClassRulePriority);
      this._meta.addRule(rule);

      this.processActions(object, clazzName);
      this.registerRulesForFields(object, clazzName);

    } finally {
      this._meta.endRuleSet();
    }
  }


  private registerRulesForFields(object: any, clazzName: string): void {
    assert(isPresent(object['getTypes']), 'Cannot register fields without a getTypes method ' +
      'that will expose all the fields');
    const types: any = object.getTypes();
    const fieldNames = Object.keys(types);

    let rank = 0;
    for (const name of fieldNames) {
      // todo: check=>  can we rely on this ?
      const type = types[name].name || types[name].constructor.name;
      const typeInstance = !isArray(types[name]) ? new types[name]() : null;
      const isCompositeType = !!(typeInstance) && (<CompositeType>typeInstance.className);

      const properties = new Map<string, any>();
      properties.set(KeyField, name);
      properties.set(KeyType, isCompositeType ? typeInstance.className() : type);
      properties.set(KeyVisible, true);

          if (isArray(types[name])) {
        assert(types[name].length > 0,
          ' Cannot register type[array] and its type without properly initialized ' +
          'prototype');
        const item = types[name][0];
        const collectionElementType = item.name;
        properties.set(KeyElementType, collectionElementType);
      }

      const selectorList: Array<Selector> = [
        new Selector(KeyClass, clazzName),
        new Selector(KeyField, name)
      ];
      selectorList[1].isDecl = true;
      properties.set(KeyRank, (rank++ + 1) * 10);

      this.processPropDecorators(object, name, selectorList, properties);
      this.processTraitDecorators(object, name, properties);

      const rule: Rule = new Rule(selectorList, properties, ClassRulePriority);
      this._meta.addRule(rule);
    }
  }

  private processPropDecorators(object: any, field: string, selectorList: Array<Selector>,
                                properties: Map<string, any>): void {

    const meta = object.constructor[CLASS_META];
    if (meta && meta.fields[field]) {
      const props: Array<PropertyDef> = meta.fields[field].props;
      for (const p in props) {
        let rule = '';
        if (props[p].key) {
          rule = `${props[p].key.toLowerCase()}:"${props[p].value}";`;
        } else {
          rule = `${props[p].value};`;
        }

        const parser = new RuntimeParser(rule, this._meta);
        parser.registerRuleBody(selectorList);
      }
    }
  }

  private processTraitDecorators(object: any, field: string, properties: Map<string, any>): void {
    const meta = object.constructor[CLASS_META];
    if (meta && meta.fields[field]) {
      const traits: Array<string> = meta.fields[field].traits;
      if (!traits || traits.length === 0) {
        return;
      }

      const existingTraits: string[] = properties.get(KeyTrait);
      if (existingTraits) {
        properties.set(KeyTrait, [...existingTraits, ...traits]);
      } else {
        properties.set(KeyTrait, traits);
      }
    }
  }

  private processActionDecorators(action: MetaActiondDef, actionName: string,
                                  selectorList: Array<Selector>): void {

    const props = this._meta.newPropertiesMap();
    const selectors: Array<Selector> = selectorList.slice(0, selectorList.length - 1)
      .map((s) => new Selector(s.key, s.value));

    if (DefaultActionCategory !== action.category) {
      selectors.push(new Selector(KeyActionCategory, action.category));
    }
    if (!action.static) {
      selectors.push(new Selector(KeyObject, KeyAny));
    }
    const origSelector: Selector = selectorList[selectorList.length - 1];
    selectors.push(new Selector(origSelector.key, origSelector.value, true));

    if (!action.static) {
      addTrait('instance', props);
    }
    addTrait(action.type, props);

    if (action.value.length >= 0 && action.type === 'messageResults') {
      props.set('message', action.value);
      props.set('mRef', action.methodRef);
    }

    if (action.value && action.type === 'pageAction') {
      props.set('message', action.value);
    }
    this._meta.addRule(new Rule(selectors, props, ClassRulePriority));
  }


  private processActions(object: any, name: string): void {
    const meta = object.constructor[CLASS_META];
    if (meta && meta.actions) {
      for (const actionKey in meta.actions) {
        const value: MetaActiondDef = meta.actions[actionKey];
        if (meta.actions.hasOwnProperty(actionKey)) {
          const properties = this._meta.newPropertiesMap();
          const selectors: Array<Selector> = [new Selector(KeyClass, name),
            new Selector(KeyAction, actionKey)];

          this.processActionDecorators(value, actionKey, selectors);
          const r = new Rule(selectors, properties, ClassRulePriority);
          this._meta.addRule(r);
        }
      }
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




