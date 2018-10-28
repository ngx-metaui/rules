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
import {assert, isArray} from './lang';


describe('a typescript types/class and how they are translated into runtime ', () => {


  it('it should sumulate javascript introspection so that we are able to read fields types of ' +
    'the objets', () => {


      let expectedTypes = new Map<string, string>();
      expectedTypes.set('stringLiteral', 'String');
      expectedTypes.set('someNumber', 'Number');
      expectedTypes.set('aBool', 'Boolean');
      expectedTypes.set('aDate', 'Date');
      expectedTypes.set('arrayOfNumbers', 'Array');
      expectedTypes.set('arrayOfNumbersElementType', 'Number');

      expectedTypes.set('arrayOfStrings', 'Array');
      expectedTypes.set('arrayOfStringsElementType', 'String');
      expectedTypes.set('myNestedObjects', 'NestedObject');

      expectedTypes.set('myArrayOfNestedObjects', 'Array');
      expectedTypes.set('myArrayOfNestedObjectsElementType', 'NestedObject');

      expectedTypes.set('myMap', 'Map');
      expectedTypes.set('mySet', 'Set');

      let actualTypes = new Map<string, string>();
      let _item = new TestClass();

      let instance: any;
      if (_item['getTypes']) {
        instance = _item['getTypes']();
      }
      let ownPropertyNames = Object.keys(instance);
      for (let name of ownPropertyNames) {
        let type = instance[name].name || instance[name].constructor.name;
        actualTypes.set(name, type);
        if (instance[name] && isArray(instance[name])) {
          assert(instance[name].length > 0,
            ' Cannot register type[array] with properly initialized prototype');
          let item = instance[name][0];
          let elementType = item.name;
          actualTypes.set(name + 'ElementType', elementType);

        }
      }

      expectedTypes.forEach((v, k) => {
        expect(actualTypes.has(k)).toBeTruthy();
        expect(actualTypes.get(k)).toEqual(v);
      });
    }
  );


});


export enum Color {Red = 1, Green, Blue}


class TestClass {
  // primitives
  stringLiteral: string;
  someNumber: number;
  aBool: boolean;

  // objects
  aDate: Date;
  arrayOfNumbers: Array<number>;
  arrayOfStrings: Array<string>;

  myNestedObjects: NestedObject;
  myArrayOfNestedObjects: Array<NestedObject>;
  myMap: Map<string, string>;
  mySet: Set<string>;


  getTypes(): any {
    return {
      stringLiteral: String,
      someNumber: Number,
      aBool: Boolean,
      aDate: Date,
      arrayOfNumbers: Array(Number),
      arrayOfNumbersElementType: Number,

      arrayOfStrings: Array(String),
      arrayOfStringsElementType: String,

      myNestedObjects: NestedObject,
      myArrayOfNestedObjects: Array(NestedObject),
      myMap: Map,
      mySet: Set
    };
  }

}


class NestedObject {

  field1: number = 0;


  constructor(field1: number) {
    this.field1 = field1;
  }

  getTypes(): any {
    return {
      field1: Number
    };
  }
}


class NestedType {
  someField: string;
  someField2: string;


  constructor(someField: string, someField2: string) {
    this.someField = someField;
    this.someField2 = someField2;
  }


  getTypes(): any {
    return {
      someField: String,
      someField2: String
    };
  }
}

