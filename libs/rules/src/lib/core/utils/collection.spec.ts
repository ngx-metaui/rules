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
import * as Collections from 'typescript-collections';
import * as objectPath from 'object-path';
import {evalExpression, isArray} from './lang';
import {ListWrapper, MapWrapper} from './collection';
import {FieldPath} from './field-path';


describe('a ListWrapper utilities so ', () => {

  it(' addElementIfAbsent add only object literal if mising', () => {

      const item = new SomeData('Test', 'Test');
      const item2 = new SomeData('Test', 'Test');

      const arr: any = [];

      ListWrapper.addElementIfAbsent(arr, item);
      ListWrapper.addElementIfAbsent(arr, item2);


      expect(1).toEqual(arr.length);
    }
  );

  it(' addElement(s)IfAbsent add only object literal if mising', () => {


      const item = new SomeData('Test', 'Test');
      const item2 = new SomeData('Test', 'Test');
      const itemx = new SomeData('Test', 'Test');

      const arr = [item, item2];
      const result: any[] = [];

      ListWrapper.addElementIfAbsent(result, itemx);
      ListWrapper.addElementsIfAbsent(result, arr);


      expect(1).toEqual(result.length);
    }
  );


  it(' it can group by element by calculated field', () => {

    const itemsProperties = [
      {name: 'name1', zone: 'zLeft'},
      {name: 'name2', zone: 'zLeft'},
      {name: 'name3', zone: 'zLeft'},
      {name: 'name4', zone: 'zRight'},
      {name: 'name5', zone: 'zLeft'},
      {name: 'name6', zone: 'zLeft'},
      {name: 'name7', zone: 'zLeft'},
    ];

    const grouped = itemsProperties.reduce((groupResult: any, currentValue: any) => {

      let groupKey = 'RightLayout';
      if (currentValue.zone === 'zLeft') {
        groupKey = 'LeftLayout';
      }

      if (!groupResult[groupKey]) {
        groupResult[groupKey] = [];
      }
      groupResult[groupKey].push(currentValue);

      return groupResult;
    }, {});

    const res: Map<string, any> = new Map<string, any>();

    Object.keys(grouped).forEach((key) => {
      res.set(key, grouped[key]);
    });

    expect(res.get('LeftLayout').length).toEqual(6);
    expect(res.get('RightLayout').length).toEqual(1);
  });

  it('it can group by element by calculated field using our utility method grouby',
    () => {

      const itemsProperties = [
        {name: 'name1', zone: 'zLeft'},
        {name: 'name2', zone: 'zLeft'},
        {name: 'name3', zone: 'zLeft'},
        {name: 'name4', zone: 'zRight'},
        {name: 'name5', zone: 'zLeft'},
        {name: 'name6', zone: 'zLeft'},
        {name: 'name7', zone: 'zLeft'},
      ];


      const res = MapWrapper.groupBy(itemsProperties,
        (item: any) => {
          return (item.zone === 'zLeft') ? 'LeftLayout' : 'RightLayout';
        });

      expect(res.get('LeftLayout').length).toEqual(6);
      expect(res.get('RightLayout').length).toEqual(1);
    }
  );


  it(' ContainsAll should RETURN TRUE if all element in the sublist are present in the ' +
    'master list', () => {


      const subList: any[] = ['a', 'b'];
      const masterList: any[] = ['a', 'b', 'c'];

      expect(ListWrapper.containsAll(masterList, subList)).toBe(true);
    }
  );


  it(' ContainsAll should RETURN FALSE if not all element in the sublist are present in the ' +
    'master list', () => {


      const subList: any[] = ['a', 'z'];
      const masterList: any[] = ['a', 'b', 'c'];

      expect(ListWrapper.containsAll(masterList, subList)).toBe(false);
    }
  );


});


describe('Dictionary if it works as expect', () => {

  it('retrieved object should not be equal is key is different ', () => {


      const dict = new Collections.Dictionary();
      dict.setValue(new User('Frank', 'Kolar'), {aa: 'ss'});
      dict.setValue(new User('David', 'Kolar'), {aa: 'ssaaa'});


      const value = dict.getValue(new User('Frank', 'Kolar'));
      const value2 = dict.getValue(new User('David', 'Kolar'));


      expect(value).not.toEqual(value2);
    }
  );
});

// PropFieldsByZoneResolver
describe('object-path that we can simulate set and get values on the objects for dynamic  ' +
  'field expresssion', () => {

  it(' retrives values from object literal ', () => {

      const op = (<any>objectPath)['create']({includeInheritedProps: true});
      const object = {'a': [{'b': {'c': 3}}]};
      const result = op.get(object, 'a.0.b.c');

      expect(result).toEqual(3);
    }
  );

  it(' retrives values from typescript Class object ', () => {

      const op = (<any>objectPath)['create']({includeInheritedProps: true});
      const user = new User('11', '222');
      const result = op.get(user, 'someField');

      expect(result).toEqual('myAccessTest');
    }
  );


  it(' retrives values from typescript nested Class object ', () => {
      const op = (<any>objectPath)['create']({includeInheritedProps: true});
      const user = new User('11', '222');
      const result = op.get(user, 'address.city');

      expect(result).toEqual('Prague');
    }
  );


  it(' retrives values from FieldPath where target is normal JS object', () => {

      const user = new User('11', '222');

      const path: FieldPath = new FieldPath('address.city');

      const result = path.getFieldValue(user);

      expect(result).toEqual('Prague');
    }
  );


  it(' retrives values from FieldPath where target is map object', () => {

      const user = new User('11', '222');

      const path: FieldPath = new FieldPath('properties.myKey');

      const result = path.getFieldValue(user);

      expect(result).toEqual('MyValue');
    }
  );

  it(' retrives values from FieldPath where target is map with deep nesting', () => {

    const user = new User('11', '222');
    const path: FieldPath = new FieldPath('address.properties.prague');

    const result = path.getFieldValue(user);

    expect(result).toEqual('czech');
  });


  it('should read read value from the nested Map by its Fieldpath', () => {

      const sourceMap: Map<string, any> = new Map<string, any>();
      const nestedMap: Map<string, any> = new Map<string, any>();

      nestedMap.set('zLeft', ['s', 'b']);
      sourceMap.set('zLetft', ['a', 'b']);
      sourceMap.set('Second', nestedMap);

      const fieldValue = FieldPath.getFieldValue(sourceMap, 'Second');

      expect(fieldValue instanceof Map).toBeTruthy();
    }
  );


  it('should set object in form of aa.bb.cc as nested map.', () => {

      const sourceMap: Map<string, any> = new Map<string, any>();

      sourceMap.set('zLeft', ['a', 'b']);

      FieldPath.setFieldValue(sourceMap, 'Second.zLeft', ['c', 'z']);

      const second = sourceMap.get('Second');
      expect(second instanceof Map).toBeTruthy();

      const subMap: Map<string, any> = second;
      const zLeft = subMap.get('zLeft');
      expect(isArray(zLeft)).toBeTruthy();
    }
  );

});


describe('Expression language', () => {

  it('It evaluates correct expression and return result of 1 + 2', () => {

      const result = evalExpression(' num1 + num2;', 'let context1;', {num1: 1, num2: 2});
      expect(result).toEqual(3);
    }
  );
});


describe('Describe if we can sort lexically inputs into metaContexs correctly', () => {

  it(' it should sort all by example', () => {

      const patern = [
        'module', 'layout', 'operation', 'class', 'object', 'action', 'field', 'type',
        'elementType', 'editing', 'trait'
      ];

      const input = ['operation', 'object', 'layout'];
      ListWrapper.sortByExample(input, patern);

      // print(input);
      expect(input[0]).toEqual('layout');
      expect(input[1]).toEqual('operation');
      expect(input[2]).toEqual('object');


      const input2 = ['operation', 'role', 'object', 'layout'];
      ListWrapper.sortByExample(input2, patern);

      // print(input2);
      expect(input2[0]).toEqual('layout');
      expect(input2[1]).toEqual('operation');
      expect(input2[2]).toEqual('object');
      expect(input2[3]).toEqual('role');

    }
  );
});


class User {
  someField: string = 'myAccessTest';
  address: Address = new Address('Prague');
  properties: Map<string, any> = new Map<string, any>();

  constructor(private firstField: string, private secondField: string) {
    this.properties.set('myKey', 'MyValue');
  }

  toString() {
    // Short hand. Adds each own property
    return Collections.util.makeString(this);
  }
}

class Address {

  properties: Map<string, any> = new Map<string, any>();

  constructor(public city: string) {
    this.properties.set('prague', 'czech');
    this.properties.set('sanfran', 'cal');
  }
}


class SomeData {

  static aaaa(): number {
    const updatedMask = 0;


    return 0;
  }

  constructor(public name: string, public name2: string) {
  }

  equalsTo(o: any) {
    return o instanceof SomeData && o.name === this.name && o.name2 === this.name2;


  }
}



