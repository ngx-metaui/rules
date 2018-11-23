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

/**
 *  Set of reusable globals. This is taken from the Angular 2 since its not exported API. And there
 *  is a need for such common functions and wrappers
 *
 */

const __window = typeof window !== 'undefined' && window;
const _global: { [name: string]: any } = <any>__window;


export function readGlobalParam(varName: any): { [name: string]: any } {
  return _global[varName];
}


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

const STRING_MAP_PROTO = Object.getPrototypeOf({});

export function isStrictStringMap(obj: any): boolean {
  return isStringMap(obj) && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
}


export function isArray(obj: any): boolean {
  return Array.isArray(obj);
}

export function isDate(obj: any): obj is Date {
  return (obj instanceof Date && !isNaN(obj.valueOf())) ||
    (isPresent(obj) && isFunction(obj.now));
}


export function isListLikeIterable(obj: any): boolean {
  if (!isJsObject(obj)) {
    return false;
  }
  return Array.isArray(obj) ||
    (!(obj instanceof Map) &&      // JS Map are iterables but return entries as [k, v]
      getSymbolIterator() in obj);  // JS Iterable have a Symbol.iterator prop
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


export function className(clazz: any): string {
  if (isPresent(clazz.constructor)) {
    let classN = clazz.constructor.toString();
    classN = classN.substr('function '.length);
    return classN.substr(0, classN.indexOf('('));
  }
  return clazz;
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


  static startsWidth(subject: string, searchString: string): boolean {
    return subject.indexOf(searchString) === 0;
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


export function isJsObject(o: any): boolean {
  return o !== null && (typeof o === 'function' || typeof o === 'object');
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
      return (value === false) ? true : false;
    }
    return value;
  }


  static isTrue(value: any): boolean {
    if (value && isString(value)) {
      return value === 'true';
    } else if (isStringMap(value)) {
      return false;
    } else if (isBoolean(value)) {
      return (value === true) ? true : false;
    }
    return value;
  }
}


// When Symbol.iterator doesn't exist, retrieves the key used in es6-shim
declare let Symbol: any;
let _symbolIterator: any = null;

export function getSymbolIterator(): string | symbol {
  if (isBlank(_symbolIterator)) {
    if (isPresent(Symbol.iterator)) {
      _symbolIterator = Symbol.iterator;
    } else {
      // es6-shim specific logic
      const keys = Object.getOwnPropertyNames(Map.prototype);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key !== 'entries' && key !== 'size' &&
          (Map as any).prototype[key] === Map.prototype['entries']) {
          _symbolIterator = key;
        }
      }
    }
  }
  return _symbolIterator;
}

const ReservedKeyword = ['class'];


export function escape(s: string): string {
  return encodeURI(s);
}


export function objectValues(obj: any): any[] {
  return Object.keys(obj).map(key => obj[key]);
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
  const proto = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    (c: string) => {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  return proto;
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
 *
 * This considers currently only 1 form which when we have getter we have this form for
 * declaration _<name> and get <name>(). I do not check any other forms now.
 *
 *
 */
export function hasGetter(instance: any, field: string): boolean {
  if (isBlank(field)) {
    return false;
  }

  return (field[0] === '_' && isPresent(nonPrivatePrefix(field)));

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

