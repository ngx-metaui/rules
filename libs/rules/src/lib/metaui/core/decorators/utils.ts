/**
 * @license
 * Copyright 2019 SAP Ariba
 *
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
 * @experimental
 */
import {Type} from '@angular/core';


export const CLASS_META = '__meta:rules__';
export type ActionRespType = 'messageResults' | 'pageAction';

export enum PropertyType {
  label,
  valid,
  visible,
  editable,
  after,
  Expr
}

export enum TraitType {
  longtext,
  required,
  Expr
}

export interface MetaClassDef {
  class: string;
  fields?: { [name: string]: MetaFieldDef };
  actions?: { [name: string]: MetaActiondDef };
}

export interface PropertyDef {
  key: string;
  value: string;
}


export interface MetaFieldDef {
  name: string;
  props: Array<PropertyDef>;
  traits: Array<string>;
}

export interface MetaActiondDef {
  methodRef: any;
  type: ActionRespType;
  static: boolean;
  value: string;
  category: string;
}


export function cArgs(fn: any, index: number): string {
  const COMMENT = /\/\/.*$|\/\*[\s\S]*?\*\//mg;
  const ARGUMENT = /([^\s,]+)/g;
  const dfn = fn.toString().replace(COMMENT, '');
  const argList = dfn.slice(dfn.indexOf('(') + 1, dfn.indexOf(')'));
  const names = argList.match(ARGUMENT) || [];

  if (names.length > index) {
    return names[index];
  }
  return null;
}


export function addMetaAction<T>(bindTo: Type<T>, responseType: ActionRespType, methodName: string,
                                 value: string, actionRef: any, isStatic: boolean,
                                 actionCat: string) {
  addMeta(bindTo, methodName, null, value, 'action', actionRef, responseType,
    isStatic, actionCat);
}

export function addMetaProperty<T>(classType: Type<T>, fieldName: string,
                                   pType: PropertyType, val: any) {
  addMeta(classType, fieldName, pType, val, 'props');
}


export function addMetaTrait<T>(classType: Type<T>, fieldName: string, pType: TraitType, val: any) {
  addMeta(classType, fieldName, pType, val, 'trait');
}

function addMeta<T>(classType: Type<T>, fieldName: string, type: PropertyType | TraitType, val: any,
                    metaType: 'trait' | 'props' | 'action' = 'trait', actionRef?: any,
                    actionType?: ActionRespType, isStatic?: boolean, actionCategory?: string) {

  let classMeta: MetaClassDef = classType[CLASS_META];
  if (!classMeta) {
    classMeta = {class: classType.name, fields: {}, actions: {}};
    classType[CLASS_META] = classMeta;
  }

  if ((metaType === 'props' || metaType === 'trait') && !classMeta.fields[fieldName]) {
    classMeta.fields[fieldName] = {
      name: fieldName,
      props: [],
      traits: []
    };
  }

  switch (metaType) {
    case 'trait':
      if (type === TraitType.Expr) {
        classMeta.fields[fieldName].traits = val;
      } else {
        classMeta.fields[fieldName].traits.push(TraitType[type]);
      }
      break;
    case 'props':
      classMeta.fields[fieldName].props.push({
        key: type === PropertyType.Expr ? null : PropertyType[type],
        value: val
      });
      break;
    case 'action':
      classMeta.actions[fieldName] = {
        methodRef: actionRef,
        type: actionType,
        static: isStatic,
        value: val,
        category: actionCategory
      };
      break;
  }
}
