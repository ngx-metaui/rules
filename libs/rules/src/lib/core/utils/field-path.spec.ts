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
import {FieldPath} from './field-path';
import * as objectPath from 'object-path';


describe('A Field Path functionality that it can corectly retrieve and set values,  ', () => {

  it(' should set correct primitive values on the class string, number, etc', () => {

      let obj: TestObject = new TestObject();


      setValue(obj, 'field1', 'field1Value');

      expect(obj.field1).toEqual('field1Value');

    }
  );

  it(' should set correct complext values on the class  - nested, etc', () => {

      let obj: TestObject = new TestObject();
      let nestedValue = new NestedObject();


      setValue(obj, 'nestedObject', nestedValue);
      expect(obj.nestedObject).toBeDefined();

    }
  );

  it(' should set correct values on the nested class field ', () => {

      let obj: TestObject = new TestObject();
      let nestedValue = new NestedObject();
      setValue(obj, 'nestedObject', nestedValue);


      setValue(obj, 'nestedObject.nestedObjectField', 'New Value');


      expect(obj.nestedObject['nestedObjectField']).toEqual('New Value');

    }
  );


  it(' should set correct values on the nested MAP that is on nested class field ', () => {

      let obj: TestObject = new TestObject();
      let nestedValue = new NestedObject();
      setValue(obj, 'nestedObject', nestedValue);


      setValue(obj, 'nestedObject.mapField2.newKey', 'New Value');


      expect(obj.nestedObject.mapField2.size).toEqual(1);

    }
  );


  it(' should set correct values on the nested MAP that is on nested class field using ' +
    'FieldPath ', () => {

      let obj: TestObject = new TestObject();
      obj.nestedObject = new NestedObject();

      let fp = new FieldPath('nestedObject.mapField2.newKey');
      fp.setFieldValue(obj, 'New Value');

      expect(obj.nestedObject.mapField2.size).toEqual(1);

    }
  );


  it(' should get correct primitive values on the class', () => {

      let obj: TestObject = new TestObject();
      let nestedValue = new NestedObject();
      obj.field1 = 'value1';


      let value = getValue(obj, 'field1');
      expect(value).toEqual('value1');

    }
  );

  it(' should get correct next values from the class  ', () => {

      let obj: TestObject = new TestObject();
      let nestedValue = new NestedObject();
      obj.field1 = 'value1';
      obj.nestedObject = nestedValue;


      let value = getValue(obj, 'nestedObject');
      expect(value).toBeDefined();

    }
  );


  it(' should get correct next values from the class property MAP  ', () => {

      let obj: TestObject = new TestObject();
      let nestedValue = new NestedObject();
      obj.field1 = 'value1';
      obj.nestedObject = nestedValue;

      obj.nestedObject.mapField2.set('Key', 'Prague');


      let value = getValue(obj, 'nestedObject.mapField2.Key');
      expect(value).toEqual('Prague');

    }
  );

});


function setValue(target: any, fieldPath: string, value: any) {

  let path: string[] = fieldPath.split('.');
  if (path.length > 1) {

    let objectToBeUpdated = objectPath.get(target, path.slice(0, path.length - 1).join('.'));
    if (objectToBeUpdated instanceof Map) {
      objectToBeUpdated.set(path[path.length - 1], value);
    } else {
      objectPath.set(target, fieldPath, value);
    }
  } else {
    objectPath.set(target, fieldPath, value);
  }
}


function getValue(target: any, fieldPath: string) {

  let path: string[] = fieldPath.split('.');
  if (path.length > 1) {
    let objectToBeUpdated = objectPath.get(target, path.slice(0, path.length - 1).join('.'));
    if (objectToBeUpdated instanceof Map) {
      return objectToBeUpdated.get(path[path.length - 1]);
    } else {
      return objectPath.get(target, fieldPath);
    }
  } else {
    return objectPath.get(target, fieldPath);
  }
}

class TestObject {
  field1: string;
  mapField: Map<string, any>;
  nestedObject: NestedObject;

}


class NestedObject {
  mapField2: Map<string, any> = new Map<string, any>();
  nestedObjectField: string;


}
