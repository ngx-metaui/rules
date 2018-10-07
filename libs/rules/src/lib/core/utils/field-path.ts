/**
 *
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
 *
 *
 */
import * as objectPath from 'object-path';
import {isBlank, isString, isStringMap} from './lang';


/**
 * The FieldPath is utility class for representing of a dotted fieldPath.
 *
 * A String such as "foo.bar.baz" can be used to access a value on a target object.
 *
 */
export class FieldPath {
  _fieldPaths: string[];
  private objectPathInstance: any;

  /**
   *
   * Sets a value to target objects
   *
   */
  static setFieldValue(target: any, field: string, value: any): void {
    let fp = new FieldPath(field);
    fp.setFieldValue(target, value);
  }


  /**
   * Reads a value from target objects
   */
  static getFieldValue(target: any, field: string): any {
    let fp = new FieldPath(field);
    let value = fp.getFieldValue(target);

    if (field === '$toString') {
      return value();
    }
    return value;
  }

  constructor(private _path: string) {
    this._fieldPaths = isBlank(_path) ? [] : _path.split('.');
    this.objectPathInstance = (<any>objectPath)['create']({includeInheritedProps: true});
  }

  /**
   *  One of the main reason why I have this is not only to iterate thru dotted field path but
   * mainly to be able to set naturally value into a nested maps like :
   *
   *  fieldName.fieldNameMap.fieldKey => it will access fieldName on the target, from there it
   * reads FieldNameMap since fieldName nested objects and sets a new value identified by Map key
   * fieldKey
   *
   *  ```
   *  class MyClass {
   *      fieldName:NestedObject
   *
   *  }
   *
   *  class NestedObject {
   *      fieldNameMap:Map<key, value>;
   *  }
   *
   *  ```
   * use field value for assignment so keys of form "a.b.c" will go in nested Maps
   */
  setFieldValue(target: any, value: any): void {
    // implement the same thing what we have on the get, if Map set field into map
    if (this._fieldPaths.length > 1 && !(target instanceof Map)) {

      let path = this._fieldPaths.slice(0, this._fieldPaths.length - 1).join('.');
      let objectToBeUpdated = this.objectPathInstance.get(target, path);
      if (objectToBeUpdated instanceof Map) {
        objectToBeUpdated.set(this._fieldPaths[this._fieldPaths.length - 1], value);
      } else {
        this.objectPathInstance.set(target, this._path, value);
      }
    }

    if (target instanceof Map) {
      let mapTarget: Map<string, any> = target;
      // handle Nested Map
      if (this._fieldPaths.length > 1) {
        let path = this._fieldPaths.splice(0, 1);

        let nestedMap: Map<string, any> = mapTarget.get(path[0]);
        if (isBlank(nestedMap)) {
          nestedMap = new Map<string, any>();
          mapTarget.set(path[0], nestedMap);
        }
        this.setFieldValue(nestedMap, value);
      } else {
        target.set(this._fieldPaths[0], value);
      }
    } else {
      this.objectPathInstance.set(target, this._path, value);
    }
  }

  /**
   * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
   * as ready value from Maps.
   *
   * todo: this is quick and dirty implementation - need to write better solution
   */
  getFieldValue(target: any): any {
    let value: any;
    for (let i = 0; i < this._fieldPaths.length; i++) {
      if ((isStringMap(target) || isString(target)) && !(target instanceof Map)) {
        value = this.objectPathInstance.get(target, this._fieldPaths[i]);
        target = value;
      } else if (target instanceof Map) {
        let targetMap: Map<string, any> = target;
        value = targetMap.get(this._fieldPaths[i]);
      }

      // just tweak to be able to access maps field.someMapField.mapKey
      // I want this to get the element from the map
      if (value instanceof Map && (i + 1) < this._fieldPaths.length) {
        let mapValue = <Map<string, any>> value;
        return mapValue.get(this._fieldPaths[i + 1]);
      }
    }
    return value;
  }


  get path(): string {
    return this._path;
  }

  toString(): string {
    return this._path;
  }

}

