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
      if (expr.indexOf(name) !== -1) {
        fnArgNames.push(name);
        fnArgValues.push(lets[name]);
      }
    }

  } else {
    for (const name in lets) {
      if (expr.indexOf(name) !== -1) {
        fnArgNames.push(name);
        fnArgValues.push(lets[name]);
      }
    }
  }

  Object.keys(lets).forEach(key => {
    if (expr.indexOf(key) !== -1) {
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

