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
import {StringWrapper} from './lang';


describe(
  ' utility functions such as decamelizing classname or field name into human readable form.  ',
  () => {

    it(' it should retrive from class MyUserTestClass following string My User Test Class',
      () => {
        // print(decamelize('MyUserTestClass'));
        expect(decamelize('MyUserTestClass')).toEqual('My User Test Class');

      }
    );


    it(' it should retrieve from class MyUserTestClass following string my User Test ' +
      'Class since we want to specify no initial caps', () => {
        expect(decamelize('MyUserTestClass', ' ', false)).toEqual('my user test class');
      }
    );


    it(' it should decamelize a field firstName that start with small letter so that we ' +
      'can simulate human readable name that can be rendered into UI', () => {
        expect(decamelize('firstName')).toEqual('First Name');

      }
    );


  });


function decamelize(string: string, separator: string = ' ', initialCaps: boolean = true): string {

  let lastUCIndex = -1;
  let allCaps = true;

  let splitOnUC = !StringWrapper.contains(string, '_');
  let buf = '';
  let inWord = 0;

  for (let i = string.length; inWord < i; ++inWord) {
    let c = string[inWord];

    if (c.toUpperCase() === c) {
      if ((inWord - 1) !== lastUCIndex && splitOnUC) {
        buf += separator;
      }
      lastUCIndex = inWord;
      if (!initialCaps) {
        c = c.toLowerCase();
      }
    } else if (c.toLowerCase() === c) {
      if (inWord === 0 && initialCaps) {
        c = c.toUpperCase();
      }
      allCaps = false;

    } else if (c !== '_') {
      c = separator;
    }
    buf += c;
  }

  if (allCaps) {
    let toCaps = false;
    for (let i = 0, c = buf.length; i < c; i++) {
      let ch = buf[i];

      if (ch.toLowerCase() !== ch.toUpperCase()) {
        if (inWord && ch === ch.toUpperCase()) {
          buf = buf.substr(0, i) + ch.toLowerCase() + buf.substr(i + 1);
        }
        toCaps = true;
      } else {
        toCaps = false;
      }
    }
  }
  return buf;
}

