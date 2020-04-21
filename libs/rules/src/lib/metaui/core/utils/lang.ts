/**
 *
 * @original-license
 *
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 *
 *
 *  Credit: Derived and extended from https://github.com/angular/angular in order to have set of
 *  reusable globals. Since its not exported API need to have a copy under core.
 */
import * as bigIntImported from 'big-integer';
import {fast1a32} from 'fnv-plus';
import {CompositeType, isEntity, isValue} from './domain-model';

const bigInt = bigIntImported;


export function unimplemented(): any {
  throw new Error('unimplemented');
}

export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

export function isBoolean(obj: any): boolean {
  return typeof obj === 'boolean';
}

export function isNumber(obj: any): boolean {
  return typeof obj === 'number';
}

export function isString(obj: any): obj is string {
  return typeof obj === 'string';
}

export function isFunction(obj: any): boolean {
  return typeof obj === 'function';
}

export function isType(obj: any): boolean {
  return isFunction(obj);
}

export function isStringMap(obj: any): obj is Object {
  return typeof obj === 'object' && obj !== null;
}

export function isArray(obj: any): boolean {
  return Array.isArray(obj);
}

export function isDate(obj: any): obj is Date {
  return (obj instanceof Date && !isNaN(obj.valueOf())) ||
    (isPresent(obj) && isFunction(obj.now));
}


/**
 * Checks if `obj` is a window object.
 *
 */
export function isWindow(obj: any): boolean {
  return obj && obj.window === obj;
}


/**
 * Determines if a value is a regular expression object.
 *
 */
export function isRegExp(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}


export function noop() {
}


export function shiftLeft(a: number, b: number): number {
  return bigInt(a).shiftLeft(b).valueOf();
}


export function shiftRight(a: number, b: number): number {
  return bigInt(a).shiftRight(b).valueOf();
}


export function stringify(token: any): string {
  if (typeof token === 'string') {
    return token;
  }

  if (token === undefined || token === null) {
    return '' + token;
  }

  if (token.overriddenName) {
    return token.overriddenName;
  }
  if (token.name) {
    return token.name;
  }

  const res = token.toString();
  const newLineIndex = res.indexOf('\n');
  return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}


export function toList(value: any): Array<any> {
  return (isArray(value)) ? value : [value];
}


export class StringWrapper {
  static split(s: string, regExp: RegExp): string[] {
    return s.split(regExp);
  }

  static equals(s: string, s2: string): boolean {
    return s === s2;
  }

  static stripLeft(s: string, charVal: string): string {
    if (s && s.length) {
      let pos = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] !== charVal) {
          break;
        }
        pos++;
      }
      s = s.substring(pos);
    }
    return s;
  }

  static replace(s: string, from: string, replace: string): string {
    return s.replace(from, replace);
  }

  static slice<T>(s: string, from: number = 0, to: number = null): string {
    return s.slice(from, to === null ? undefined : to);
  }

  static contains(s: string, substr: string): boolean {
    return s.indexOf(substr) !== -1;
  }

  static compare(a: string, b: string): number {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }
}

export class StringJoiner {
  constructor(public parts: string[] = []) {
  }

  add(part: string): StringJoiner {
    this.parts.push(part);
    return this;
  }


  last(): string {
    return this.parts[this.parts.length - 1];
  }

  toString(): string {
    return this.parts.join('');
  }
}


export class NumberWrapper {
  static equal(a: number, b: number): boolean {
    return a === b;
  }

  static parseIntAutoRadix(text: string): number {
    const result: number = parseInt(text);
    if (isNaN(result)) {
      throw new Error('Invalid integer literal when parsing ' + text);
    }
    return result;
  }
}


export function print(obj: Error | Object) {
  console.log(obj);
}


export function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(msg);
  }
}

export function checksum(s: any) {
  let chk = 0x12345678;
  const len = s.length;
  for (let i = 0; i < len; i++) {
    chk += (s.charCodeAt(i) * (i + 1));
  }

  return (chk & 0xffffffff).toString(16);
}

export function crc32(crc: number, anInt: number) {
  /* tslint:disable */
  let table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
  /* tslint:enable */

  let x = 0;
  let y = 0;
  for (let i = 0; i < 4; i++) {
    y = (crc ^ anInt) & 0xFF;
    x = Number('0x' + table.substr(y * 9, 8));
    crc = (crc >>> 8) ^ x;
  }
  return crc ^ (-1);
}

export function fnv1a(aString: string): number {
  return fast1a32(aString);
}


export function booleanValue(value: any): boolean {
  return BooleanWrapper.boleanValue(value);
}

export class BooleanWrapper {

  static boleanValue(value: any = false): boolean {
    if (value && isString(value)) {
      return value === 'true';
    }
    return value;
  }


  static isFalse(value: any): boolean {
    if (value && isString(value)) {
      return value === 'false';
    } else if (isStringMap(value)) {
      return false;
    } else if (isBoolean(value)) {
      return (value === false);
    }
    return value;
  }


  static isTrue(value: any): boolean {
    if (value && isString(value)) {
      return value === 'true';
    } else if (isStringMap(value)) {
      return false;
    } else if (isBoolean(value)) {
      return (value === true);
    }
    return value;
  }
}


// When Symbol.iterator doesn't exist, retrieves the key used in es6-shim
const ReservedKeyword = ['class'];

export function evalExpression(expr: string, declarations: string,
                               lets: { [key: string]: any }): any {
  const fnBody = `${declarations}\n\treturn ${expr}\n//# sourceURL=AribaExpression`;
  const fnArgNames: string[] = [];
  const fnArgValues: any[] = [];
  for (const argName in lets) {
    if (StringWrapper.contains(expr, argName)) {
      fnArgNames.push(argName);
      fnArgValues.push(lets[argName]);
    }
  }
  if (lets instanceof Extensible) {
    lets.extendedFields().forEach((value, key) => {
      if (StringWrapper.contains(expr, key) &&
        fnArgNames.indexOf(
          key) === -1 && ReservedKeyword.indexOf(
          key) === -1) {
        fnArgNames.push(key);
        fnArgValues.push(value);
      }
    });
  }

  // fnArgNames.push('this');
  // fnArgValues.push(lets);
  return new Function(...fnArgNames.concat(fnBody))(...fnArgValues);
}


export function evalExpressionWithCntx(expr: string, declarations: string,
                                       lets: { [key: string]: any },
                                       thisContext: any): any {
  const fnBody = `${declarations}\n\treturn ${expr}\n//# sourceURL=MetaExpr`;
  const fnArgNames: string[] = [];
  const fnArgValues: any[] = [];

  if (lets['iterableFields']) {

    const fields: string[] = lets['iterableFields']();
    for (const name of fields) {
      if (StringWrapper.contains(expr, name)) {
        fnArgNames.push(name);
        fnArgValues.push(lets[name]);
      }
    }

  } else {
    for (const name in lets) {
      if (StringWrapper.contains(expr, name)) {
        fnArgNames.push(name);
        fnArgValues.push(lets[name]);
      }
    }
  }

  Object.keys(lets).forEach(key => {
    const value = lets[key];
    if (StringWrapper.contains(expr, key)) {
      fnArgNames.push(key);
      fnArgValues.push(lets[key]);
    }
  });

  if (lets instanceof Extensible) {
    const extValues: Extensible = lets;

    extValues.extendedFields().forEach((value, key) => {
      if (StringWrapper.contains(expr, key) &&
        fnArgNames.indexOf(
          key) === -1 && ReservedKeyword.indexOf(
          key) === -1) {
        fnArgNames.push(key);
        fnArgValues.push(value);
      }
    });
  }

  // fnArgNames.push('this');
  // fnArgValues.push(lets);
  const fn = new Function(...fnArgNames.concat(fnBody));
  assert(isPresent(fn), 'Cannot evaluate expression. FN is not defined');
  const fnBound = fn.bind(thisContext);

  return fnBound(...fnArgValues);
}

export function escape(s: string): string {
  return encodeURI(s);
}


export function hashCode(str: string): number {
  let hash = 0;
  let char: number;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}

/**
 *
 * Converts object to a name;
 *
 */
export function objectToName(target: any): string {
  if (isBlank(target) || (!isStringMap(target) && !isType(target))) {
    throw new Error(' Cannot convert. Uknown object');
  }

  return isType(target) ? target.prototype.constructor.name : target.constructor.name;
}

/**
 *
 * Basic function to generate UUID taken from W3C from one of the examples
 *
 */
export function uuid(): string {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    (c: string) => {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/**
 * Check object equality derived from angular.equals 1.5 implementation
 *
 */
export function equals(o1: any, o2: any): boolean {
  if (o1 === o2) {
    return true;
  }
  if (o1 === null || o2 === null) {
    return false;
  }
  // eslint-disable-next-line no-self-compare
  if (o1 !== o1 && o2 !== o2) {
    return true; // NaN === NaN
  }

  const t1 = typeof o1;
  const t2 = typeof o2;
  let length: any = -1, key: any, keySet: any;
  if (t1 === t2 && t1 === 'object') {
    if (isArray(o1)) {
      if (!isArray(o2)) {
        return false;
      }
      if ((length = o1.length) === o2.length) {
        for (key = 0; key < length; key++) {
          if (!equals(o1[key], o2[key])) {
            return false;
          }
        }
        return true;
      }
    } else if (isDate(o1)) {
      if (!isDate(o2)) {
        return false;
      }
      return equals(o1.getTime(), o2.getTime());
    } else if (isRegExp(o1)) {
      if (!isRegExp(o2)) {
        return false;
      }
      return o1.toString() === o2.toString();
    } else {
      if (isWindow(o1) || isWindow(o2) ||
        isArray(o2) || isDate(o2) || isRegExp(o2)) {
        return false;
      }
      keySet = new Map<string, boolean>();
      // using Object.keys as iterating thru object stop working in NG6, TS2.7
      let keys = Object.keys(o2);
      for (key in keys) {
        if (keys[key].charAt(0) === '$' || isFunction(o1[keys[key]])) {
          continue;
        }
        if (!equals(o1[keys[key]], o2[keys[key]])) {
          return false;
        }
        keySet.set(keys[key], true);
      }

      keys = Object.keys(o2);
      for (key of keys) {
        if (!(keySet.has(key)) && key.charAt(0) !== '$'
          && isPresent(o2[key]) && !isFunction(o2[key])) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}


export function objectEquals(one: any, two: any) {
  if (isBlank(one) && isBlank(two)) {
    return true;
  }
  if (isBlank(one) || isBlank(two)) {
    return false;
  }
  return equals(one, two);
}


export function className(object: any): string {
  if (isStringMap(object) && (isEntity(object) || isValue(object))) {
    return (<CompositeType>object).className();

  } else if (isStringMap(object)) {
    return objectToName(object);

  } else if (isFunction(object)) {
    return object.name;
  }
  return object;
}


export function defaultLabelForIdentifier(fieldName: string) {
  const lastDot = fieldName.lastIndexOf('.');
  if (lastDot !== -1 && lastDot !== fieldName.length - 1) {
    fieldName = fieldName.substring(lastDot + 1);
  }
  return decamelize(fieldName);
}

export function beautifyClassName(name: string): string {
  return decamelize(name, ' ');
}

export function beautifyFileName(field: string): string {
  return decamelize(field, ' ');
}


/**
 * transform a string into decamel. form. Mostly used when reading class names or field names
 * such firstName and we want to create a label First Name
 *
 *
 */
export function decamelize(string: string, separator: string = ' ', initialCaps: boolean = true) {
  if (isBlank(string)) {
    return '';
  }

  let lastUCIndex = -1;
  let allCaps = true;

  const splitOnUC = !StringWrapper.contains(string, '_');
  let buf = '';
  let inWord = 0;

  for (const i = string.length; inWord < i; ++inWord) {
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
      const ch = buf[i];

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


export function nonPrivatePrefix(input: string): string {
  return input[0] === '_' ? StringWrapper.stripLeft(input, '_') : input;
}


/**
 * The Extensible interface can be implemented when a given class
 * wants to provide dynamically added fields.  Once this is implemented
 * to return a Map, the FieldValue system will be able to look in
 * the Map to see if the desired field exists.
 *
 *
 */
export abstract class Extensible {

  /**
   *  Returns the Map in which the dynamically added fields reside.
   *
   */
  extendedFields(): Map<string, any> {
    return unimplemented();
  }
}

