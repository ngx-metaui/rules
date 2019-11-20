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
 *  Use of decorators to extends existing OSS.
 */
import {Type} from '@angular/core';
import {ActionRespType, addMetaAction} from './utils';


export interface ActionDef {
  bindTo?: Type<any>;
  responseType?: ActionRespType;
  actionRef?: any;
  message?: string;
  route?: string;
}

export function Action(def: ActionDef) {
  return (target: any, propertyKey: string, mDescriptor: PropertyDescriptor) => {
    if (!def.responseType) {
      def.responseType = 'messageResult';
    }

    addMetaAction(def.bindTo, def.responseType, propertyKey,
      def.responseType === 'messageResult' ? def.message : def.responseType, target[propertyKey]);
  };

}

