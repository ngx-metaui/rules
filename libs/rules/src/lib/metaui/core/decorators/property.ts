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
import {addMetaProperty, cArgs, PropertyType} from './utils';

// @dynamic
export class Property {

  static Label(label: string, ctor: boolean = true) {
    return (target: any, key: string | symbol, index?: number) => {
      const propertyKey = cArgs(target, index);

      if (propertyKey) {
        addMetaProperty(target, propertyKey, PropertyType.label, label);
      }
    };
  }


  static Valid(expr: string, ctor: boolean = true) {
    return (target: any, key: string | symbol, index?: number) => {
      const propertyKey = cArgs(target, index);

      if (propertyKey) {
        addMetaProperty(target, propertyKey, PropertyType.valid, expr);
      }
    };
  }

  static Editable(expr: string, ctor: boolean = true) {
    return (target: any, key: string | symbol, index?: number) => {
      const propertyKey = cArgs(target, index);

      if (propertyKey) {
        addMetaProperty(target, propertyKey, PropertyType.editable, expr);
      }
    };
  }


  static Visible(expr: string, ctor: boolean = true) {
    return (target: any, key: string | symbol, index?: number) => {
      const propertyKey = cArgs(target, index);

      if (propertyKey) {
        addMetaProperty(target, propertyKey, PropertyType.visible, expr);
      }
    };
  }

  static After(label: string, ctor: boolean = true) {
    return (target: any, key: string | symbol, index?: number) => {
      const propertyKey = cArgs(target, index);

      if (propertyKey) {
        addMetaProperty(target, propertyKey, PropertyType.after, label);
      }
    };
  }

  static Properties(props: string, ctor: boolean = true) {
    return (target: any, key: string | symbol, index?: number) => {
      const propertyKey = cArgs(target, index);

      if (propertyKey) {
        addMetaProperty(target, propertyKey, PropertyType.Expr, props);
      }
    };

  }

}
