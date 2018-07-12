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
import { Injector } from '@angular/core';
import { FieldPath } from '@aribaui/core';
import { ComponentRegistry } from '@aribaui/components';
import { Meta, PropertyMap, PropertyMerger, PropertyMergerIsChaining, ValueQueriedObserver } from './meta';
import { Context } from './context';
import { ItemProperties } from './item-properties';
/**
 * ObjectMeta is resposible for setting up everything related to class, field, actions
 *
 */
export declare class ObjectMeta extends Meta {
    static KeyClass: string;
    static KeyField: string;
    static KeyAction: string;
    static KeyActionCategory: string;
    static KeyObject: string;
    static KeyValue: string;
    static KeyType: string;
    static KeyElementType: string;
    static readonly KeyTraitGroup: string;
    static KeyVisible: string;
    static KeyEditable: string;
    static KeyValid: string;
    static KeyRank: string;
    static readonly DefaultActionCategory: string;
    static readonly _FieldPathNullMarker: FieldPath;
    _traitToGroup: Map<string, string>;
    _traitToGroupGeneration: number;
    /**
     *  Can inject these directly but want to keep this as much as possible with any angular
     *  dependecies as we will be using these core rule classes outside of UI code
     */
    protected _componentRegistry: ComponentRegistry;
    protected _injector: Injector;
    static validationError(context: Context): string;
    constructor();
    newContext(): Context;
    newPropertiesMap(): PropertyMap;
    itemNames(context: Context, key: string): Array<string>;
    itemProperties(context: Context, key: string, filterHidden: boolean): Array<ItemProperties>;
    itemPropertiesForNames(context: Context, key: string, itemNames: string[], filterHidden: boolean): Array<ItemProperties>;
    groupForTrait(trait: string): string;
    injector: Injector;
    componentRegistry: ComponentRegistry;
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
export declare class IntrospectionMetaProvider implements ValueQueriedObserver {
    private _meta;
    notify(meta: Meta, key: string, value: any): void;
    private registerRulesForClass(object, className);
    private registerRulesForFields(object, className);
}
/**
 * Registers specials types that we are read during introspections
 */
export declare class FieldTypeIntrospectionMetaProvider implements ValueQueriedObserver {
    notify(meta: Meta, key: string, value: any): void;
}
export declare class ObjectMetaPropertyMap extends PropertyMap {
    private _fieldPath;
    readonly fieldPath: FieldPath;
    isFieldNullMarker(value: FieldPath): boolean;
}
export declare class OMPropertyMerger_Valid implements PropertyMerger, PropertyMergerIsChaining {
    _meta: Meta;
    isPropMergerIsChainingMark: boolean;
    merge(orig: any, override: any, isDeclare: boolean): any;
    toString(): string;
}
