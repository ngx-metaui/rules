import * as bigIntImported from 'big-integer';
import { arrays } from 'typescript-collections';
import { InjectionToken, isDevMode, EventEmitter, Injectable, Component, ErrorHandler, NgModule, Inject, Injector, Optional, SkipSelf } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse, HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { Subject, throwError, of } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { create } from 'object-path';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ bigInt = bigIntImported;
/**
 *  Set of reusable globals. This is taken from the Angular 2 since its not exported API. And there
 *  is a need for such common functions and wrappers
 *
 */
const /** @type {?} */ __window = typeof window !== 'undefined' && window;
const /** @type {?} */ _global = __window;
/**
 * @param {?} varName
 * @return {?}
 */
function readGlobalParam(varName) {
    return _global[varName];
}
/**
 * @param {?} type
 * @return {?}
 */
function getTypeNameForDebugging(type) {
    if (type['name']) {
        return type['name'];
    }
    return typeof type;
}
/**
 * @return {?}
 */
function unimplemented() {
    throw new Error('unimplemented');
}
/**
 * @param {?} obj
 * @return {?}
 */
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isBlank(obj) {
    return obj === undefined || obj === null;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isBoolean(obj) {
    return typeof obj === 'boolean';
}
/**
 * @param {?} obj
 * @return {?}
 */
function isNumber(obj) {
    return typeof obj === 'number';
}
/**
 * @param {?} obj
 * @return {?}
 */
function isString(obj) {
    return typeof obj === 'string';
}
/**
 * @param {?} obj
 * @return {?}
 */
function isFunction(obj) {
    return typeof obj === 'function';
}
/**
 * @param {?} obj
 * @return {?}
 */
function isType(obj) {
    return isFunction(obj);
}
/**
 * @param {?} obj
 * @return {?}
 */
function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
}
const /** @type {?} */ STRING_MAP_PROTO = Object.getPrototypeOf({});
/**
 * @param {?} obj
 * @return {?}
 */
function isStrictStringMap(obj) {
    return isStringMap(obj) && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return isPresent(obj) && isFunction(obj.then);
}
/**
 * @param {?} obj
 * @return {?}
 */
function isArray(obj) {
    return Array.isArray(obj);
}
/**
 * @param {?} obj
 * @return {?}
 */
function isDate(obj) {
    return (obj instanceof Date && !isNaN(obj.valueOf())) ||
        (isPresent(obj) && isFunction(obj.now));
}
/**
 * Checks if `obj` is a window object.
 *
 * @param {?} obj
 * @return {?}
 */
function isWindow(obj) {
    return obj && obj.window === obj;
}
/**
 * Determines if a value is a regular expression object.
 *
 * @param {?} value
 * @return {?}
 */
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
/**
 * @return {?}
 */
function noop() {
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function shiftLeft(a, b) {
    return bigInt(a).shiftLeft(b).valueOf();
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function shiftRight(a, b) {
    return bigInt(a).shiftRight(b).valueOf();
}
/**
 * @param {?} token
 * @return {?}
 */
function stringify(token) {
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
    let /** @type {?} */ res = token.toString();
    let /** @type {?} */ newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
/**
 * @param {?} clazz
 * @return {?}
 */
function className(clazz) {
    if (isPresent(clazz.constructor)) {
        let /** @type {?} */ classN = clazz.constructor.toString();
        classN = classN.substr('function '.length);
        return classN.substr(0, classN.indexOf('('));
    }
    return clazz;
}
/**
 *  Source: https://www.typescriptlang.org/docs/handbook/mixins.html
 *
 *  Function that copies properties of the baseCtors to derivedCtor.
 *  Can be used to achieve multiple inheritance.
 * @param {?} derivedCtor
 * @param {?} baseCtors
 * @return {?}
 */
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name]
                = baseCtor.prototype[name];
        });
    });
}
class StringWrapper {
    /**
     * @param {?} code
     * @return {?}
     */
    static fromCharCode(code) {
        return String.fromCharCode(code);
    }
    /**
     * @param {?} s
     * @param {?} index
     * @return {?}
     */
    static charCodeAt(s, index) {
        return s.charCodeAt(index);
    }
    /**
     * @param {?} s
     * @param {?} regExp
     * @return {?}
     */
    static split(s, regExp) {
        return s.split(regExp);
    }
    /**
     * @param {?} s
     * @param {?} s2
     * @return {?}
     */
    static equals(s, s2) {
        return s === s2;
    }
    /**
     * @param {?} s
     * @param {?} charVal
     * @return {?}
     */
    static stripLeft(s, charVal) {
        if (s && s.length) {
            let /** @type {?} */ pos = 0;
            for (let /** @type {?} */ i = 0; i < s.length; i++) {
                if (s[i] !== charVal) {
                    break;
                }
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    }
    /**
     * @param {?} s
     * @param {?} charVal
     * @return {?}
     */
    static stripRight(s, charVal) {
        if (s && s.length) {
            let /** @type {?} */ pos = s.length;
            for (let /** @type {?} */ i = s.length - 1; i >= 0; i--) {
                if (s[i] !== charVal) {
                    break;
                }
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    }
    /**
     * @param {?} s
     * @param {?} from
     * @param {?} replace
     * @return {?}
     */
    static replace(s, from, replace) {
        return s.replace(from, replace);
    }
    /**
     * @param {?} s
     * @param {?} from
     * @param {?} replace
     * @return {?}
     */
    static replaceAll(s, from, replace) {
        return s.replace(from, replace);
    }
    /**
     * @template T
     * @param {?} s
     * @param {?=} from
     * @param {?=} to
     * @return {?}
     */
    static slice(s, from = 0, to = null) {
        return s.slice(from, to === null ? undefined : to);
    }
    /**
     * @param {?} s
     * @param {?} substr
     * @return {?}
     */
    static contains(s, substr) {
        return s.indexOf(substr) !== -1;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static compare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    }
    /**
     * @param {?} subject
     * @param {?} searchString
     * @param {?=} position
     * @return {?}
     */
    static endsWidth(subject, searchString, position = 0) {
        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function (sstring, pos = 0) {
                let /** @type {?} */ subjectString = this.toString();
                if (typeof pos !== 'number' || !isFinite(pos) || Math.floor(pos) !== pos || pos
                    >
                        subjectString.length) {
                    pos = subjectString.length;
                }
                pos -= sstring.length;
                let /** @type {?} */ lastIndex = subjectString.indexOf(sstring, pos);
                return lastIndex !== -1 && lastIndex === pos;
            };
        }
        return subject.endsWith(searchString);
    }
    /**
     * @param {?} subject
     * @param {?} searchString
     * @return {?}
     */
    static startsWidth(subject, searchString) {
        return subject.indexOf(searchString) === 0;
    }
}
class StringJoiner {
    /**
     * @param {?=} parts
     */
    constructor(parts = []) {
        this.parts = parts;
    }
    /**
     * @param {?} part
     * @return {?}
     */
    add(part) {
        this.parts.push(part);
        return this;
    }
    /**
     * @return {?}
     */
    last() {
        return this.parts[this.parts.length - 1];
    }
    /**
     * @return {?}
     */
    toString() {
        return this.parts.join('');
    }
}
class NumberWrapper {
    /**
     * @param {?} n
     * @param {?} fractionDigits
     * @return {?}
     */
    static toFixed(n, fractionDigits) {
        return n.toFixed(fractionDigits);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static equal(a, b) {
        return a === b;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    static parseIntAutoRadix(text) {
        let /** @type {?} */ result = parseInt(text);
        if (isNaN(result)) {
            throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
    }
    /**
     * @param {?} text
     * @param {?} radix
     * @return {?}
     */
    static parseInt(text, radix) {
        if (radix === 10) {
            if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else if (radix === 16) {
            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else {
            let /** @type {?} */ result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    static parseFloat(text) {
        return parseFloat(text);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static isNumeric(value) {
        return !isNaN(value - parseFloat(value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static isNaN(value) {
        return isNaN(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static isInteger(value) {
        return Number.isInteger(value);
    }
}
class FunctionWrapper {
    /**
     * @param {?} fn
     * @param {?} posArgs
     * @return {?}
     */
    static apply(fn, posArgs) {
        return fn.apply(null, posArgs);
    }
    /**
     * @param {?} fn
     * @param {?} scope
     * @return {?}
     */
    static bind(fn, scope) {
        return fn.bind(scope);
    }
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function looseIdentical(a, b) {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function getMapKey(value) {
    return value;
}
/**
 * @param {?} obj
 * @return {?}
 */
function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
}
/**
 * @param {?} obj
 * @return {?}
 */
function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
}
/**
 * @param {?} o
 * @return {?}
 */
function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
/**
 * @param {?} obj
 * @return {?}
 */
function print(obj) {
    console.log(obj);
}
/**
 * @param {?} obj
 * @return {?}
 */
function warn(obj) {
    console.warn(obj);
}
/**
 * @param {?} condition
 * @param {?} msg
 * @return {?}
 */
function assert(condition, msg) {
    if (!condition) {
        throw new Error(msg);
    }
}
/**
 * @param {?} s
 * @return {?}
 */
function checksum(s) {
    let /** @type {?} */ chk = 0x12345678;
    let /** @type {?} */ len = s.length;
    for (let /** @type {?} */ i = 0; i < len; i++) {
        chk += (s.charCodeAt(i) * (i + 1));
    }
    return (chk & 0xffffffff).toString(16);
}
/**
 * @param {?} crc
 * @param {?} anInt
 * @return {?}
 */
function crc32(crc, anInt) {
    /* tslint:disable */
    let /** @type {?} */ table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
    /* tslint:enable */
    let /** @type {?} */ x = 0;
    let /** @type {?} */ y = 0;
    for (let /** @type {?} */ i = 0; i < 4; i++) {
        y = (crc ^ anInt) & 0xFF;
        x = Number('0x' + table.substr(y * 9, 8));
        crc = (crc >>> 8) ^ x;
    }
    return crc ^ (-1);
}
class Json {
    /**
     * @param {?} s
     * @return {?}
     */
    static parse(s) {
        return JSON.parse(s);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static stringify(data) {
        // Dart doesn't take 3 arguments
        return JSON.stringify(data, null, 2);
    }
}
class DateWrapper {
    /**
     * @param {?} year
     * @param {?=} month
     * @param {?=} day
     * @param {?=} hour
     * @param {?=} minutes
     * @param {?=} seconds
     * @param {?=} milliseconds
     * @return {?}
     */
    static create(year, month = 1, day = 1, hour = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static fromISOString(str) {
        return new Date(str);
    }
    /**
     * @param {?} ms
     * @return {?}
     */
    static fromMillis(ms) {
        return new Date(ms);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static toMillis(date) {
        return date.getTime();
    }
    /**
     * @return {?}
     */
    static now() {
        return new Date();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static toJson(date) {
        return date.toJSON();
    }
}
class BooleanWrapper {
    /**
     * @param {?=} value
     * @return {?}
     */
    static boleanValue(value = false) {
        if (value && isString(value)) {
            return value === 'true';
        }
        return value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static isFalse(value) {
        if (value && isString(value)) {
            return value === 'false';
        }
        else if (isStringMap(value)) {
            return false;
        }
        else if (isBoolean(value)) {
            return (value === false) ? true : false;
        }
        return value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static isTrue(value) {
        if (value && isString(value)) {
            return value === 'true';
        }
        else if (isStringMap(value)) {
            return false;
        }
        else if (isBoolean(value)) {
            return (value === true) ? true : false;
        }
        return value;
    }
}
let /** @type {?} */ _symbolIterator = null;
/**
 * @return {?}
 */
function getSymbolIterator() {
    if (isBlank(_symbolIterator)) {
        if (isPresent(Symbol.iterator)) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            let /** @type {?} */ keys = Object.getOwnPropertyNames(Map.prototype);
            for (let /** @type {?} */ i = 0; i < keys.length; ++i) {
                let /** @type {?} */ key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    (/** @type {?} */ (Map)).prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
const /** @type {?} */ ReservedKeyword = ['class'];
/**
 * @param {?} expr
 * @param {?} declarations
 * @param {?} lets
 * @return {?}
 */
function evalExpression(expr, declarations, lets) {
    let /** @type {?} */ fnBody = `${declarations}\n\treturn ${expr}\n//# sourceURL=AribaExpression`;
    let /** @type {?} */ fnArgNames = [];
    let /** @type {?} */ fnArgValues = [];
    for (let /** @type {?} */ argName in lets) {
        if (StringWrapper.contains(expr, argName)) {
            fnArgNames.push(argName);
            fnArgValues.push(lets[argName]);
        }
    }
    if (lets instanceof Extensible) {
        let /** @type {?} */ extValues = lets;
        extValues.extendedFields().forEach((value, key) => {
            if (StringWrapper.contains(expr, key) &&
                fnArgNames.indexOf(key) === -1 && ReservedKeyword.indexOf(key) === -1) {
                fnArgNames.push(key);
                fnArgValues.push(value);
            }
        });
    }
    // fnArgNames.push('this');
    // fnArgValues.push(lets);
    return new Function(...fnArgNames.concat(fnBody))(...fnArgValues);
}
/**
 * @param {?} expr
 * @param {?} declarations
 * @param {?} lets
 * @param {?} thisContext
 * @return {?}
 */
function evalExpressionWithCntx(expr, declarations, lets, thisContext) {
    let /** @type {?} */ fnBody = `${declarations}\n\treturn ${expr}\n//# sourceURL=AribaExpression`;
    let /** @type {?} */ fnArgNames = [];
    let /** @type {?} */ fnArgValues = [];
    for (let /** @type {?} */ argName in lets) {
        if (StringWrapper.contains(expr, argName)) {
            fnArgNames.push(argName);
            fnArgValues.push(lets[argName]);
        }
    }
    if (lets instanceof Extensible) {
        let /** @type {?} */ extValues = lets;
        extValues.extendedFields().forEach((value, key) => {
            if (StringWrapper.contains(expr, key) &&
                fnArgNames.indexOf(key) === -1 && ReservedKeyword.indexOf(key) === -1) {
                fnArgNames.push(key);
                fnArgValues.push(value);
            }
        });
    }
    // fnArgNames.push('this');
    // fnArgValues.push(lets);
    let /** @type {?} */ fn = new Function(...fnArgNames.concat(fnBody));
    assert(isPresent(fn), 'Cannot evaluate expression. FN is not defined');
    let /** @type {?} */ fnBound = fn.bind(thisContext);
    return fnBound(...fnArgValues);
}
/**
 * @param {?} obj
 * @return {?}
 */
function isPrimitive(obj) {
    return !isJsObject(obj);
}
/**
 * @param {?} value
 * @param {?} type
 * @return {?}
 */
function hasConstructor(value, type) {
    return value.constructor === type;
}
/**
 * @param {?} s
 * @return {?}
 */
function escape(s) {
    return encodeURI(s);
}
/**
 * @param {?} s
 * @return {?}
 */
function escapeRegExp(s) {
    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
/**
 * @param {?} str
 * @return {?}
 */
function hashCode(str) {
    let /** @type {?} */ hash = 0;
    let /** @type {?} */ char;
    if (str.length === 0) {
        return hash;
    }
    for (let /** @type {?} */ i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}
/**
 * @param {?} obj
 * @return {?}
 */
function objectValues(obj) {
    return Object.keys(obj).map(key => obj[key]);
}
/**
 *
 * Converts object to a name;
 *
 * @param {?} target
 * @return {?}
 */
function objectToName(target) {
    if (isBlank(target) || (!isStringMap(target) && !isType(target))) {
        throw new Error(' Cannot convert. Uknown object');
    }
    return isType(target) ? target.prototype.constructor.name : target.constructor.name;
}
/**
 *
 * Basic function to generate UUID taken from W3C from one of the examples
 *
 * @return {?}
 */
function uuid() {
    let /** @type {?} */ dt = new Date().getTime();
    let /** @type {?} */ proto = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let /** @type {?} */ r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return proto;
}
/**
 * Check object equality derived from angular.equals 1.5 implementation
 *
 * @param {?} o1
 * @param {?} o2
 * @return {?}
 */
function equals(o1, o2) {
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
    let /** @type {?} */ t1 = typeof o1, /** @type {?} */ t2 = typeof o2, /** @type {?} */ length, /** @type {?} */ key, /** @type {?} */ keySet;
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
        }
        else if (isDate(o1)) {
            if (!isDate(o2)) {
                return false;
            }
            return equals(o1.getTime(), o2.getTime());
        }
        else if (isRegExp(o1)) {
            if (!isRegExp(o2)) {
                return false;
            }
            return o1.toString() === o2.toString();
        }
        else {
            if (isWindow(o1) || isWindow(o2) ||
                isArray(o2) || isDate(o2) || isRegExp(o2)) {
                return false;
            }
            keySet = new Map();
            // using Object.keys as iterating thru object stop working in NG6, TS2.7
            let /** @type {?} */ keys = Object.keys(o2);
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
 * @param {?} string
 * @param {?=} separator
 * @param {?=} initialCaps
 * @return {?}
 */
function decamelize(string, separator = ' ', initialCaps = true) {
    if (isBlank(string)) {
        return '';
    }
    let /** @type {?} */ lastUCIndex = -1;
    let /** @type {?} */ allCaps = true;
    let /** @type {?} */ splitOnUC = !StringWrapper.contains(string, '_');
    let /** @type {?} */ buf = '';
    let /** @type {?} */ inWord = 0;
    for (let /** @type {?} */ i = string.length; inWord < i; ++inWord) {
        let /** @type {?} */ c = string[inWord];
        if (c.toUpperCase() === c) {
            if ((inWord - 1) !== lastUCIndex && splitOnUC) {
                buf += separator;
            }
            lastUCIndex = inWord;
            if (!initialCaps) {
                c = c.toLowerCase();
            }
        }
        else if (c.toLowerCase() === c) {
            if (inWord === 0 && initialCaps) {
                c = c.toUpperCase();
            }
            allCaps = false;
        }
        else if (c !== '_') {
            c = separator;
        }
        buf += c;
    }
    if (allCaps) {
        for (let /** @type {?} */ i = 0, /** @type {?} */ c = buf.length; i < c; i++) {
            let /** @type {?} */ ch = buf[i];
            if (ch.toLowerCase() !== ch.toUpperCase()) {
                if (inWord && ch === ch.toUpperCase()) {
                    buf = buf.substr(0, i) + ch.toLowerCase() + buf.substr(i + 1);
                }
            }
        }
    }
    return buf;
}
/**
 * @param {?} input
 * @return {?}
 */
function nonPrivatePrefix(input) {
    return input[0] === '_' ? StringWrapper.stripLeft(input, '_') : input;
}
/**
 *
 * This considers currently only 1 form which when we have getter we have this form for
 * declaration _<name> and get <name>(). I do not check any other forms now.
 *
 *
 * @param {?} instance
 * @param {?} field
 * @return {?}
 */
function hasGetter(instance, field) {
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
 * @abstract
 */
class Extensible {
    /**
     *  Returns the Map in which the dynamically added fields reside.
     *
     * @return {?}
     */
    extendedFields() {
        return unimplemented();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ _clearValues = (function () {
    if ((/** @type {?} */ ((new Map()).keys())).next) {
        return function _clearValuesInner(m) {
            let /** @type {?} */ keyIterator = m.keys();
            let /** @type {?} */ k /** TODO #???? */;
            while (!((k = (/** @type {?} */ (keyIterator)).next()).done)) {
                m.set(k.value, null);
            }
        };
    }
    else {
        return function _clearValuesWithForeEach(m) {
            m.forEach((v, k) => {
                m.set(k, null);
            });
        };
    }
})();
class MapWrapper {
    /**
     * @template K, V
     * @return {?}
     */
    static createEmpty() {
        return new Map();
    }
    /**
     * @template K, V
     * @param {?} m
     * @return {?}
     */
    static clone(m) {
        try {
            if (new Map(/** @type {?} */ (new Map()))) {
                return new Map(/** @type {?} */ (m));
            }
        }
        catch (/** @type {?} */ e) {
        }
        let /** @type {?} */ map$$1 = new Map();
        m.forEach((v, k) => {
            map$$1.set(k, v);
        });
        return map$$1;
    }
    /**
     * @template T
     * @param {?} stringMap
     * @return {?}
     */
    static createFromStringMap(stringMap) {
        let /** @type {?} */ result = new Map();
        for (let /** @type {?} */ key in stringMap) {
            result.set(key, stringMap[key]);
        }
        return result;
    }
    /**
     * @template T
     * @param {?} stringMap
     * @return {?}
     */
    static createFromAnyMap(stringMap) {
        let /** @type {?} */ result = new Map();
        for (let /** @type {?} */ key in stringMap) {
            result.set(key, stringMap[key]);
        }
        return result;
    }
    /**
     * @template T
     * @param {?} stringMap
     * @param {?} resolve
     * @return {?}
     */
    static createFromStringMapWithResolve(stringMap, resolve) {
        let /** @type {?} */ result = new Map();
        for (let /** @type {?} */ key in stringMap) {
            let /** @type {?} */ updatedValue = resolve(key, stringMap[key]);
            result.set(key, updatedValue);
        }
        return result;
    }
    /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    static toStringMap(m) {
        let /** @type {?} */ r = {};
        m.forEach((v, k) => r[k] = v);
        return r;
    }
    /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    static toAnyMap(m) {
        let /** @type {?} */ r = {};
        if (isPresent(m)) {
            m.forEach((v, k) => (/** @type {?} */ (r))[k] = v);
        }
        return r;
    }
    /**
     * @param {?} m
     * @param {?=} inner
     * @return {?}
     */
    static toString(m, inner = false) {
        let /** @type {?} */ sj = new StringJoiner(['']);
        if (!inner) {
            sj.add('{');
        }
        m.forEach((v, k) => {
            if (v instanceof Map) {
                sj.add(MapWrapper.toString(v, true));
            }
            else {
                sj.add(k);
                sj.add('=');
                sj.add(v);
            }
            sj.add(', ');
        });
        if (!inner) {
            sj.add('} ');
        }
        return sj.toString();
    }
    /**
     * @param {?} m
     * @return {?}
     */
    static clearValues(m) {
        _clearValues(m);
    }
    /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    static iterable(m) {
        return m;
    }
    /**
     * @param {?} dest
     * @param {?} source
     * @param {?} overwriteMismatched
     * @return {?}
     */
    static mergeMapIntoMapWithObject(dest, source, overwriteMismatched) {
        let /** @type {?} */ keys = Array.from(source.keys());
        for (let /** @type {?} */ key of keys) {
            let /** @type {?} */ sourceValue = source.get(key);
            let /** @type {?} */ destValue = dest.get(key);
            if (isBlank(destValue)) {
                dest.set(key, ListWrapper.copyValue(sourceValue));
                continue;
            }
            else if (destValue instanceof Map && sourceValue instanceof Map) {
                dest.set(key, MapWrapper.mergeMapIntoMapWithObject(MapWrapper.clone(destValue), sourceValue, overwriteMismatched));
            }
            else if (destValue instanceof Map && isArray(sourceValue)) {
                if (ListWrapper.allElementsAreStrings(sourceValue)) {
                    dest.set(key, MapWrapper.mergeMapIntoMapWithObject(MapWrapper.clone(destValue), MapWrapper.convertListToMap(sourceValue), overwriteMismatched));
                }
                else {
                    let /** @type {?} */ sourceVect = ListWrapper.clone(sourceValue);
                    ListWrapper.addElementIfAbsent(sourceVect, destValue);
                    dest.set(key, sourceVect);
                }
            }
            else if (isArray(destValue) && sourceValue instanceof Map) {
                if (ListWrapper.allElementsAreStrings(destValue)) {
                    dest.set(key, MapWrapper.mergeMapIntoMapWithObject(MapWrapper.convertListToMap(destValue), sourceValue, overwriteMismatched));
                }
                else {
                    // todo: can we really match this values with indexOf
                    ListWrapper.addElementIfAbsent(destValue, MapWrapper.clone(sourceValue));
                }
            }
            else if (destValue instanceof Map && isString(sourceValue)) {
                let /** @type {?} */ destValueMap = MapWrapper.clone(destValue);
                if (isBlank(destValueMap.get(sourceValue))) {
                    destValue.set(sourceValue, MapWrapper.createEmpty());
                }
            }
            else if (isString(destValue) && sourceValue instanceof Map) {
                let /** @type {?} */ sourceHash = MapWrapper.clone(sourceValue);
                if (isBlank(sourceHash.get(destValue))) {
                    sourceHash.set(destValue, MapWrapper.createEmpty());
                }
                dest.set(key, sourceHash);
            }
            else if (isArray(destValue) && isArray(sourceValue)) {
                dest.set(key, sourceValue);
            }
            else if (isArray(destValue) && isString(sourceValue)) {
                ListWrapper.addElementIfAbsent(destValue, sourceValue);
            }
            else if (isString(destValue) && isArray(sourceValue)) {
                let /** @type {?} */ sourceVect = ListWrapper.clone(sourceValue);
                ListWrapper.addElementIfAbsent(sourceVect, destValue);
                dest.set(key, sourceVect);
            }
            else if (isString(destValue) && isString(sourceValue)) {
                dest.set(key, sourceValue);
            }
            else if (overwriteMismatched) {
                dest.set(key, sourceValue);
            }
            else {
                let /** @type {?} */ destClass = className(destValue);
                let /** @type {?} */ sourceClass = className(sourceValue);
                if (destClass === sourceClass) {
                    dest.set(key, sourceValue);
                }
            }
        }
        return dest;
    }
    /**
     * @param {?} keys
     * @return {?}
     */
    static convertListToMap(keys) {
        let /** @type {?} */ map$$1 = new Map();
        for (let /** @type {?} */ i = 0; i < keys.length; i++) {
            map$$1.set(keys[i], MapWrapper.createEmpty());
        }
        return map$$1;
    }
    /**
     * @template K
     * @param {?} items
     * @param {?} groupByKey
     * @return {?}
     */
    static groupBy(items, groupByKey) {
        let /** @type {?} */ result = items.reduce((groupResult, currentValue) => {
            let /** @type {?} */ gKey = groupByKey(currentValue);
            (groupResult[gKey] = groupResult[gKey] || []).push(currentValue);
            return groupResult;
        }, {});
        let /** @type {?} */ grouped = new Map();
        Object.keys(result).forEach((key) => {
            grouped.set(key, result[key]);
        });
        return grouped;
    }
}
/**
 * Wraps Javascript Objects
 */
class StringMapWrapper {
    /**
     * @return {?}
     */
    static create() {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    }
    /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    static contains(map$$1, key) {
        return map$$1.hasOwnProperty(key);
    }
    /**
     * @template V
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    static get(map$$1, key) {
        return map$$1.hasOwnProperty(key) ? map$$1[key] : undefined;
    }
    /**
     * @template V
     * @param {?} map
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    static set(map$$1, key, value) {
        map$$1[key] = value;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    static isEmpty(map$$1) {
        for (let /** @type {?} */ prop in map$$1) {
            return false;
        }
        return true;
    }
    /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    static delete(map$$1, key) {
        delete map$$1[key];
    }
    /**
     * @template K, V
     * @param {?} map
     * @param {?} callback
     * @return {?}
     */
    static forEach(map$$1, callback) {
        for (let /** @type {?} */ k of Object.keys(map$$1)) {
            callback(map$$1[k], k);
        }
    }
    /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static merge(m1, m2) {
        let /** @type {?} */ m = {};
        for (let /** @type {?} */ k of Object.keys(m1)) {
            m[k] = m1[k];
        }
        for (let /** @type {?} */ k of Object.keys(m2)) {
            m[k] = m2[k];
        }
        return m;
    }
    /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static equals(m1, m2) {
        let /** @type {?} */ k1 = Object.keys(m1);
        let /** @type {?} */ k2 = Object.keys(m2);
        if (k1.length !== k2.length) {
            return false;
        }
        let /** @type {?} */ key /** TODO #???? */;
        for (let /** @type {?} */ i = 0; i < k1.length; i++) {
            key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    }
}
class ListWrapper {
    /**
     * @param {?} size
     * @return {?}
     */
    static createFixedSize(size) {
        return new Array(size);
    }
    /**
     * @param {?} size
     * @return {?}
     */
    static createGrowableSize(size) {
        return new Array(size);
    }
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    static clone(array) {
        return array.slice(0);
    }
    /**
     * @template T
     * @param {?} array
     * @param {?} fn
     * @return {?}
     */
    static forEachWithIndex(array, fn) {
        for (let /** @type {?} */ i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    }
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    static first(array) {
        if (!array) {
            return null;
        }
    }
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    static last(array) {
        if (!array || array.length === 0) {
            return null;
        }
        return array[array.length - 1];
    }
    /**
     * @template T
     * @param {?} array
     * @param {?} value
     * @param {?=} startIndex
     * @return {?}
     */
    static indexOf(array, value, startIndex = 0) {
        return array.indexOf(value, startIndex);
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    static contains(list, el) {
        return list.indexOf(el) !== -1;
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} els
     * @return {?}
     */
    static containsAll(list, els) {
        return els.map(function (needle) {
            return list.indexOf(needle);
        }).indexOf(-1) === -1;
    }
    /**
     * @param {?} list
     * @param {?} item
     * @return {?}
     */
    static containsComplex(list, item) {
        return list.findIndex(el => {
            return equals(el, item);
        }) > -1;
    }
    /**
     * @param {?} list
     * @param {?} item
     * @return {?}
     */
    static findIndexComplex(list, item) {
        const /** @type {?} */ index = list.findIndex(el => {
            return equals(el, item);
        });
        return index;
    }
    /**
     * @param {?} list
     * @param {?} item
     * @return {?}
     */
    static removeIfExist(list, item) {
        let /** @type {?} */ index = list.findIndex(el => {
            return equals(el, item);
        });
        if (index !== -1) {
            ListWrapper.removeAt(list, index);
        }
    }
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    static reversed(array) {
        let /** @type {?} */ a = ListWrapper.clone(array);
        return a.reverse();
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static concat(a, b) {
        return a.concat(b);
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    static insert(list, index, value) {
        list.splice(index, 0, value);
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} index
     * @return {?}
     */
    static removeAt(list, index) {
        let /** @type {?} */ res = list[index];
        list.splice(index, 1);
        return res;
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} items
     * @return {?}
     */
    static removeAll(list, items) {
        for (let /** @type {?} */ i = 0; i < items.length; ++i) {
            let /** @type {?} */ index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    static remove(list, el) {
        let /** @type {?} */ index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    static removeLast(array) {
        if (!array || array.length === 0) {
            return null;
        }
        array.splice(array.length - 1);
    }
    /**
     * @param {?} list
     * @return {?}
     */
    static clear(list) {
        list.length = 0;
    }
    /**
     * @param {?} list
     * @return {?}
     */
    static isEmpty(list) {
        return list.length === 0;
    }
    /**
     * @param {?} list
     * @param {?} value
     * @param {?=} start
     * @param {?=} end
     * @return {?}
     */
    static fill(list, value, start = 0, end = null) {
        list.fill(value, start, end === null ? list.length : end);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static equals(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        for (let /** @type {?} */ i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * @template T
     * @param {?} l
     * @param {?=} from
     * @param {?=} to
     * @return {?}
     */
    static slice(l, from = 0, to = null) {
        return l.slice(from, to === null ? undefined : to);
    }
    /**
     * @template T
     * @param {?} l
     * @param {?} from
     * @param {?} length
     * @return {?}
     */
    static splice(l, from, length) {
        return l.splice(from, length);
    }
    /**
     * @template T
     * @param {?} l
     * @param {?=} compareFn
     * @return {?}
     */
    static sort(l, compareFn) {
        if (isPresent(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    }
    /**
     * @param {?} toSort
     * @param {?} pattern
     * @return {?}
     */
    static sortByExample(toSort, pattern) {
        toSort.sort((a, b) => {
            let /** @type {?} */ indexA = pattern.indexOf(a) === -1 ? 10 : pattern.indexOf(a);
            let /** @type {?} */ indexB = pattern.indexOf(b) === -1 ? 10 : pattern.indexOf(b);
            return indexA - indexB;
        });
    }
    /**
     * @template T
     * @param {?} l
     * @return {?}
     */
    static toString(l) {
        let /** @type {?} */ out = '';
        for (let /** @type {?} */ item of l) {
            out += item.toString() + ',  ';
        }
        return out;
    }
    /**
     * @template T
     * @param {?} l
     * @return {?}
     */
    static toJSON(l) {
        return JSON.stringify(l);
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} predicate
     * @return {?}
     */
    static maximum(list, predicate) {
        if (list.length === 0) {
            return null;
        }
        let /** @type {?} */ solution = null;
        let /** @type {?} */ maxValue = -Infinity;
        for (let /** @type {?} */ index = 0; index < list.length; index++) {
            let /** @type {?} */ candidate = list[index];
            if (isBlank(candidate)) {
                continue;
            }
            let /** @type {?} */ candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    }
    /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    static flatten(list) {
        let /** @type {?} */ target = [];
        _flattenArray(list, target);
        return target;
    }
    /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    static allElementsAreStrings(list) {
        let /** @type {?} */ target = ListWrapper.flatten(list);
        for (let /** @type {?} */ element of target) {
            if (!isString(element)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} source
     * @return {?}
     */
    static addAll(list, source) {
        for (let /** @type {?} */ i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} element
     * @return {?}
     */
    static addElementIfAbsent(list, element) {
        let /** @type {?} */ contains = arrays.contains(list, element, (item1, item2) => {
            if (item1['equalsTo']) {
                return item1['equalsTo'](item2);
            }
            return item1 === item2;
        });
        if (!contains) {
            list.push(element);
        }
    }
    /**
     * @template T
     * @param {?} list
     * @param {?} elements
     * @return {?}
     */
    static addElementsIfAbsent(list, elements) {
        if (isBlank(elements)) {
            return;
        }
        for (let /** @type {?} */ elem of elements) {
            let /** @type {?} */ contains = arrays.contains(list, elem, (item1, item2) => {
                if (item1['equalsTo'] && item2['equalsTo']) {
                    return item1['equalsTo'](item2);
                }
                return item1 === item2;
            });
            if (!contains) {
                list.push(elem);
            }
        }
    }
    /**
     * @template T
     * @param {?} value
     * @return {?}
     */
    static copyValue(value) {
        if (value instanceof Map) {
            return MapWrapper.clone(value);
        }
        else if (isArray(value)) {
            return ListWrapper.clone(value);
        }
        return value;
    }
}
/**
 * @param {?} source
 * @param {?} target
 * @return {?}
 */
function _flattenArray(source, target) {
    if (isPresent(source)) {
        for (let /** @type {?} */ i = 0; i < source.length; i++) {
            let /** @type {?} */ item = source[i];
            if (isArray(item)) {
                _flattenArray(item, target);
            }
            else {
                target.push(item);
            }
        }
    }
    return target;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isListLikeIterable$1(obj) {
    if (!isJsObject(obj)) {
        return false;
    }
    return isArray(obj) ||
        (!(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
            // JS Map are iterables but return entries as [k, v]
            getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
}
/**
 * @param {?} a
 * @param {?} b
 * @param {?} comparator
 * @return {?}
 */
function areIterablesEqual(a, b, comparator) {
    let /** @type {?} */ iterator1 = a[getSymbolIterator()]();
    let /** @type {?} */ iterator2 = b[getSymbolIterator()]();
    while (true) {
        let /** @type {?} */ item1 = iterator1.next();
        let /** @type {?} */ item2 = iterator2.next();
        if (item1.done && item2.done) {
            return true;
        }
        if (item1.done || item2.done) {
            return false;
        }
        if (!comparator(item1.value, item2.value)) {
            return false;
        }
    }
}
/**
 * @param {?} obj
 * @param {?} fn
 * @return {?}
 */
function iterateListLike(obj, fn) {
    if (isArray(obj)) {
        for (let /** @type {?} */ i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        let /** @type {?} */ iterator = obj[getSymbolIterator()]();
        let /** @type {?} */ item /** TODO #???? */;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}
/**
 * @template T
 * @param {?} arr
 * @param {?} condition
 * @return {?}
 */
function findLast(arr, condition) {
    for (let /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
        if (condition(arr[i])) {
            return arr[i];
        }
    }
    return null;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Since on enterprise level we need to support all available locales as user might change
 * to different lang anytime we need to import all expected locales that we want to support.
 *
 * Note:  Remember when you want to support more locales you need to import them and register
 * them using registerLocaleData
 */
const /** @type {?} */ AppConfigToken = new InjectionToken('App.Config');
const /** @type {?} */ SuportedLanguages = ['en', 'fr'];
/**
 * Simple Configuration implementation  which let us configure application during a bootstrap
 * phase. You can pass values in 3 different ways
 *
 * 1) Using import - at the time you import your module
 * 2) injected as service and you can set values
 * 3) From Script tag or globally defined VAR during a deployment
 *
 *
 * There is also from URL option that is for now temporary disabled.
 *
 */
class AppConfig {
    /**
     * @param {?} injector
     * @param {?} environment
     */
    constructor(injector, environment) {
        this.injector = injector;
        this.environment = environment;
        // we expect there will be always window available.
        this.values = new Map();
        // this.queryValues = new Map<string,  any>();
    }
    /**
     *
     * Called by factory method to initialize this config class
     *
     * @param {?} config
     * @return {?}
     */
    init(config) {
        this.initDefaults();
        if (isPresent(config)) {
            let /** @type {?} */ values = MapWrapper.createFromStringMap(config);
            values.forEach((v, k) => this.set(k, v));
        }
        this.environment.setValue(AppConfig.AssetFolder, this.get(AppConfig.AssetFolder));
        let /** @type {?} */ location = window.location.pathname + window.location.search;
        if (this.environment.inTest) {
            location = this.get(AppConfig.InTestUrl);
        }
        // if (isPresent(location)) {
        //     this.parseQueryParms(location);
        // }
    }
    /**
     * This will read globally inserted scripts to initialize application from the server side.
     * The script can directly declare the variables :
     *
     * ```js
     *   <script>
     *      var AppConfigGlobal = {
     *               'app.pro1': 'value1',
     *               'app.pro2': 'value2',
     *               'lang': 'ch'
     *      };
     *  </script>
     * ```
     *
     *   or it can be included on the index.html page during build time.
     *
     *   We expect that will find the `AppConfigGlobal`
     *
     *
     * @return {?}
     */
    parseGlobalParams() {
        let /** @type {?} */ globalConfig = readGlobalParam(AppConfig.AppConfigGlobalVar);
        if (isPresent(globalConfig)) {
            for (let /** @type {?} */ key in globalConfig) {
                this.values.set(key.toLowerCase(), globalConfig[key]);
            }
        }
    }
    /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        this.values.set(key.toLowerCase(), value);
        if (key.toLowerCase() === AppConfig.InTest) {
            this.environment.inTest = value;
        }
    }
    /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     * @param {?} key
     * @return {?}
     */
    get(key) {
        if (this.values.has(key.toLowerCase())) {
            return this.values.get(key.toLowerCase());
        }
        return null;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getNumber(key) {
        let /** @type {?} */ val = this.get(key);
        return NumberWrapper.parseIntAutoRadix(val);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getBoolean(key) {
        let /** @type {?} */ val = this.get(key);
        return BooleanWrapper.boleanValue(val);
    }
    /**
     * @return {?}
     */
    initDefaults() {
        this.set(AppConfig.IsDevMode, isDevMode());
        this.set(AppConfig.UserAgent, window.navigator.userAgent);
        this.set(AppConfig.Direction, document.documentElement.dir);
        this.set(AppConfig.NavPlatform, window.navigator.platform);
        this.set(AppConfig.ContentType, 'application/json; charset=utf-8');
        this.set(AppConfig.ConnectionRetryInterval, 500);
        this.set(AppConfig.ConnectionUseMockServer, false);
        this.set(AppConfig.ConnectionMockServerPath, '/mock-routing');
        this.set(AppConfig.i18nEnabled, true);
        this.set(AppConfig.InTest, false);
        this.set(AppConfig.DomainUniqueName, 'uniqueName');
        this.set(AppConfig.DomainQuery, 'q');
        if (this.environment.inTest) {
            this.set(AppConfig.ConnectionAbortTimeout, 500);
        }
        else {
            this.set(AppConfig.ConnectionAbortTimeout, 8000);
        }
        this.set(AppConfig.AssetFolder, 'assets');
        if (!this.values.has(AppConfig.Lang)) {
            this.set(AppConfig.Lang, window.navigator.language);
        }
        if (!this.values.has(AppConfig.SupportedLangs)) {
            this.set(AppConfig.SupportedLangs, SuportedLanguages);
        }
    }
    /**
     * @param {?} entity
     * @param {?=} isNested
     * @return {?}
     */
    getRestApiContextUrl(entity, isNested = false) {
        let /** @type {?} */ nestedFlag = isNested ? '$' : '';
        let /** @type {?} */ withEntity = `${AppConfig.RestApiContextUrl}.${nestedFlag}${entity}`;
        let /** @type {?} */ url = this.get(withEntity) || this.get(AppConfig.RestApiContextUrl);
        if (isPresent(url)) {
            if (/\/$/g.test(url)) {
                url = url.substring(0, url.length - 1);
            }
            return url;
        }
        throw new Error('Rest APIUri is not configured');
    }
    /**
     * @return {?}
     */
    getRestApiContext() {
        return this.get(AppConfig.RestApiContextUrl) || '';
    }
    /**
     * @return {?}
     */
    getRestApiHost() {
        return this.get(AppConfig.RestApiHostUrl) || '';
    }
    /**
     * @return {?}
     */
    isProductionMode() {
        return !this.getBoolean(AppConfig.IsDevMode);
    }
    /**
     * @return {?}
     */
    getBaseUrl() {
        const /** @type {?} */ isMocked = this.getBoolean(AppConfig.ConnectionUseMockServer);
        const /** @type {?} */ cnx = this.getRestApiContext();
        const /** @type {?} */ host = this.getRestApiHost() || '';
        if (isMocked) {
            const /** @type {?} */ prefix = this.get(AppConfig.AssetFolder);
            return `${prefix}${cnx || '/'}`;
        }
        let /** @type {?} */ url = `${host}${cnx || '/'}`;
        return url;
    }
    /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     * @return {?}
     */
    initializeI18n() {
        let /** @type {?} */ promise = new Promise((resolve) => {
            resolve(true);
        });
        return promise;
    }
}
/**
 * This is not regular env. param we use this to query global var that can be attached to
 * window to read env. settings that can be injected by server
 *
 */
AppConfig.AppConfigGlobalVar = 'AppConfigGlobal';
AppConfig.IsDevMode = 'devmode.enabled';
AppConfig.UserAgent = 'useragent';
AppConfig.Lang = 'lang';
AppConfig.SupportedLangs = 'supportedlang';
AppConfig.Direction = 'dir';
AppConfig.NavPlatform = 'platform';
AppConfig.i18nEnabled = 'i18n.enabled';
AppConfig.AppTitle = 'app.title';
AppConfig.RestApiContextUrl = 'restapi.context';
AppConfig.RestApiHostUrl = 'restapi.host';
AppConfig.ContentType = 'content-type';
AppConfig.ConnectionRetryInterval = 'connection.retry';
AppConfig.ConnectionAbortTimeout = 'connection.abort-timeout';
AppConfig.ConnectionUseMockServer = 'connection.mock-server.enabled';
AppConfig.ConnectionMockServerPath = 'connection.mock-server.path';
AppConfig.ConnectionMockServerRoutes = 'connection.mock-server.routes';
AppConfig.DomainUniqueName = 'domain.uniquename';
AppConfig.DomainQuery = 'domain.uniquename';
AppConfig.AssetFolder = 'asset-folder';
AppConfig.InTest = 'env.test';
/**
 * Since we unable to change and simulate URL during ng test but still we need to be able to
 * test this URL parsing logic then just for a Test purposes this `env.test.url` property
 * will be used to pass url during a test.
 */
AppConfig.InTestUrl = 'env.test.url';
/**
 * Factory method used by CoreModule in order to instantiate AppConfig provider
 *
 * @param {?} config
 * @param {?} injector
 * @param {?} env
 * @return {?}
 */
function makeConfig(config, injector, env) {
    // when empty we asume we are in Test. Application should always have some basic initialization
    // todo: Need to get back to this as this is temporary.
    let /** @type {?} */ conf = new AppConfig(injector, env);
    conf.init(config);
    return conf;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Environment is sharable state between components and its injected at the root level and
 * the same instance accessible down the component tree.
 *
 */
class Environment {
    constructor() {
        /**
         * Helper properties for debugging and testing purposes
         *
         */
        this.isPseudoLocalized = false;
        this.inTest = false;
        /**
         * An EventEmitter to listen to locale change events
         */
        this.onLocaleChange = new EventEmitter();
        this.isProduction = false;
        this._locale = 'en';
        this.envVariables = new Map();
        this.stacksVariables = new Map();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getValue(key) {
        if (this.envVariables.has(key)) {
            return this.envVariables.get(key);
        }
        return null;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setValue(key, value) {
        this.envVariables.set(key, value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    deleteValue(key) {
        if (this.hasValue(key)) {
            this.envVariables.delete(key);
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    hasValue(key) {
        return this.envVariables.has(key);
    }
    /**
     * @return {?}
     */
    allVariables() {
        return this.envVariables;
    }
    /**
     * @return {?}
     */
    get locale() {
        return this._locale;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set locale(value) {
        this._locale = value;
        // Emit locale changed event
        this.onLocaleChange.emit(value);
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    peak(key) {
        let /** @type {?} */ stack = this.stacksVariables.get(key) || [];
        return ListWrapper.last(stack);
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    pop(key) {
        let /** @type {?} */ stack = this.stacksVariables.get(key) || [];
        assert(stack.length > 0, ' Attempt to get value from empty stack');
        return ListWrapper.removeAt(stack, stack.length - 1);
    }
    /**
     * @template T
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    push(key, value) {
        let /** @type {?} */ stack = this.stacksVariables.get(key) || [];
        stack.push(value);
        this.stacksVariables.set(key, stack);
    }
}
Environment.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Environment.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} entity
 * @return {?}
 */
function isEntity(entity) {
    return isPresent(entity) && isPresent((/** @type {?} */ (entity)).identity);
}
/**
 * @param {?} val
 * @return {?}
 */
function isValue(val) {
    return isPresent(val) && isPresent((/** @type {?} */ (val)).clone);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const RestSegmentType = {
    Host: 0,
    Context: 1,
    Action: 2,
    Resource: 3,
    Identifier: 4,
    OfParent: 5,
};
RestSegmentType[RestSegmentType.Host] = "Host";
RestSegmentType[RestSegmentType.Context] = "Context";
RestSegmentType[RestSegmentType.Action] = "Action";
RestSegmentType[RestSegmentType.Resource] = "Resource";
RestSegmentType[RestSegmentType.Identifier] = "Identifier";
RestSegmentType[RestSegmentType.OfParent] = "OfParent";
/** @enum {number} */
const RestAction = {
    Load: 0,
    Query: 1,
    Save: 2,
    Do: 3,
};
RestAction[RestAction.Load] = "Load";
RestAction[RestAction.Query] = "Query";
RestAction[RestAction.Save] = "Save";
RestAction[RestAction.Do] = "Do";
/**
 * Set of AST like classes to keep the fluent API grammar in the abstract format to give developers
 * changes to provide their own implementation
 *
 * Todo: Expose Builder as a service
 *
 * @abstract
 */
class UrlSegment {
    /**
     * @param {?} type
     * @param {?=} value
     * @param {?=} params
     * @param {?=} rank
     */
    constructor(type, value, params, rank = -1) {
        this.type = type;
        this.value = value;
        this.params = params;
        this.rank = rank;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return 'Wrong Rest Segment order';
    }
}
class HostSegment extends UrlSegment {
    /**
     * @param {?} value
     * @param {?=} params
     */
    constructor(value, params) {
        super(RestSegmentType.Host, value, params, 5);
        this.value = value;
        this.params = params;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment == null, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Host segment must be first!`;
    }
}
class ContextSegment extends UrlSegment {
    /**
     * @param {?} value
     * @param {?=} params
     */
    constructor(value, params) {
        super(RestSegmentType.Context, value, params, 10);
        this.value = value;
        this.params = params;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment === RestSegmentType.Host, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Context segment must follow Host!`;
    }
}
class ActionSegment extends UrlSegment {
    /**
     * @param {?} action
     * @param {?=} data
     * @param {?=} params
     */
    constructor(action, data, params) {
        super(RestSegmentType.Action, action, params, 0);
        this.action = action;
        this.data = data;
        this.params = params;
        // save it to local property for easier comparision
        this.actionType = action;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment === RestSegmentType.Context, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Action must follow Context segment!`;
    }
}
class ResourceSegment extends UrlSegment {
    /**
     * @param {?} value
     * @param {?=} params
     */
    constructor(value, params) {
        super(RestSegmentType.Resource, value, params, 15);
        this.value = value;
        this.params = params;
        this.resourceName = `${objectToName(this.value).toLowerCase()}s`;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert((prevSegment === RestSegmentType.Action || prevSegment === RestSegmentType.OfParent), this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Resource must follow either Action or Of!`;
    }
}
class IdentifierSegment extends UrlSegment {
    /**
     * @param {?} value
     * @param {?=} params
     */
    constructor(value, params) {
        super(RestSegmentType.Identifier, value, params, 20);
        this.value = value;
        this.params = params;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment === RestSegmentType.Resource, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Identifier must follow Resource!`;
    }
}
class OfParentSegment extends UrlSegment {
    constructor() {
        super(RestSegmentType.OfParent);
        this.rank = 2;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment === RestSegmentType.Resource ||
            prevSegment === RestSegmentType.Identifier, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Of must follow Resource!`;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Default implementation that reads abstract URL structure and assembles correct URL.
 */
class DefaultRestBuilder {
    /**
     * @param {?} urlGroup
     */
    constructor(urlGroup) {
        this.urlGroup = urlGroup;
        this.sorted = false;
    }
    /**
     * @param {?} isMocked
     * @return {?}
     */
    assembleUrl(isMocked) {
        this.validate();
        let /** @type {?} */ sortedSegments = this.adjustRank(this.urlGroup.segments);
        let /** @type {?} */ url = new StringJoiner();
        for (let /** @type {?} */ i = 1; i < sortedSegments.length; i++) {
            switch (sortedSegments[i].type) {
                case RestSegmentType.Action:
                case RestSegmentType.OfParent:
                    break;
                case RestSegmentType.Resource:
                    let /** @type {?} */ resSegment = /** @type {?} */ (sortedSegments[i]);
                    if (isMocked) {
                        url.add('mocked').add('/');
                    }
                    url.add(resSegment.resourceName);
                    this.addSlash(url, i !== (sortedSegments.length - 1));
                    break;
                default:
                    url.add(sortedSegments[i].value);
                    this.addSlash(url, isPresent(sortedSegments[i].value) &&
                        sortedSegments[i].value.toString().length > 0 &&
                        i !== (sortedSegments.length - 1));
            }
        }
        if ((/** @type {?} */ (sortedSegments[0])).value === RestAction.Do) {
            url.add('/').add('actions').add('/').add((/** @type {?} */ (sortedSegments[0])).data);
        }
        return url.toString();
    }
    /**
     * @param {?} url
     * @param {?} shouldAdd
     * @return {?}
     */
    addSlash(url, shouldAdd) {
        if (shouldAdd) {
            url.add('/');
        }
    }
    /**
     * @return {?}
     */
    validate() {
        let /** @type {?} */ action = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        switch (action.actionType) {
            case RestAction.Save:
            case RestAction.Do:
                // make sure we have a Identifier
                let /** @type {?} */ withIdCount = this.urlGroup.count(RestSegmentType.Identifier);
                let /** @type {?} */ of$$1 = this.urlGroup.lookup(RestSegmentType.OfParent);
                assert(withIdCount >= 1, 'Missing withId(<IDENTIFIER>) call!');
                break;
        }
    }
    /**
     *
     * Check to see if we have OF segment where we refer to parent resource. In such case we
     * need move all before OF at the end. Either after parent RESOURCE or IDENTIFIER
     *
     *
     * ```
     *   service
     *      .load()
     *      .resource(LineItem)
     *      .of
     *      .resource(Requisition)
     *      .withId('123');
     *  ```
     *
     *
     *
     * Find the OF segment and go back until we reach Resource and adjust rank of these adn
     * then
     * sort
     *
     *
     *
     *
     *
     *
     *
     * @param {?} segments
     * @return {?}
     */
    adjustRank(segments) {
        let /** @type {?} */ ofIndex = segments
            .findIndex((s) => s.type === RestSegmentType.OfParent);
        if (ofIndex !== -1) {
            let /** @type {?} */ of$$1 = segments[ofIndex];
            let /** @type {?} */ segment;
            do {
                segment = segments[--ofIndex];
                segment.rank *= of$$1.rank;
            } while (segment.type !== RestSegmentType.Resource);
        }
        return segments.sort((a, b) => a.rank - b.rank);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * This class just aggregates and provides convient apit to to work with UrlSegments
 *
 */
class RestUrlGroup {
    /**
     * @param {?=} _segments
     */
    constructor(_segments) {
        this._segments = _segments;
        if (isBlank(this._segments)) {
            this._segments = [];
        }
    }
    /**
     *
     * Every push is validated againts UrlSegment assert methods to make sure the order of the
     * method calls is correct
     *
     * @param {?} segment
     * @return {?}
     */
    push(segment) {
        segment.assertSegment((this._segments.length > 0) ? this.peak().type : null);
        if (isString(segment.value)) {
            segment.value = segment.value.replace(/^\/|\/$/g, '');
        }
        this._segments.push(segment);
    }
    /**
     * Stack like API
     *
     * @return {?}
     */
    peak() {
        return ListWrapper.last(this._segments);
    }
    /**
     * @return {?}
     */
    pop() {
        assert(this._segments.length > 0, ' Attempt to get value from empty segments stack');
        return ListWrapper.removeAt(this._segments, this._segments.length - 1);
    }
    /**
     * @param {?} segmentType
     * @param {?} data
     * @return {?}
     */
    updateSegment(segmentType, data) {
        let /** @type {?} */ urlSegment = this.lookup(segmentType);
        urlSegment.value = data;
    }
    /**
     *
     * Based on the enum Segment Type  it will retrieve correct segment from the stack
     *
     * @param {?} segment
     * @param {?=} byResource
     * @return {?}
     */
    lookup(segment, byResource) {
        if (isBlank(this.segments)) {
            return null;
        }
        let /** @type {?} */ ss = [...this.segments];
        ss = ss.reverse();
        return ss.find(((s) => {
            let /** @type {?} */ hasMatch = s.type === segment;
            if (segment === RestSegmentType.Resource) {
                if (isPresent(byResource)) {
                    return hasMatch && (/** @type {?} */ (s)).value === byResource;
                }
                else {
                    return hasMatch;
                }
            }
            return hasMatch;
        }));
    }
    /**
     *
     * Counts number of segments of certain type
     *
     * @param {?} segment
     * @return {?}
     */
    count(segment) {
        let /** @type {?} */ segments = this.segments.filter((s) => segment === s.type);
        return isPresent(segments) ? segments.length : 0;
    }
    /**
     * @return {?}
     */
    get segments() {
        return this._segments;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * To simplify work with current HttpClient the Resource provides fluent API on top of it. You dont
 * assemble URL traditional way rather more fluent and functional way, working with real data types
 * such a Value and Entity.
 *
 * Entity and Value are two main key interfaces that all domain objects should inherit from if they
 * want to leverage this functionality.
 *
 * ###Example
 *
 * 1.  to simply assemble following URL http://api.ariba.com/myService/v1/requisitions/123 and
 *  and fetch Requisition data:
 *
 * ```ts
 *  let r: Resource
 *
 *  r.load()
 *   .resource(Requisition)
 *   .withId('123')
 *   .asEntity<Requisition>((r: Requisition) => receivedR = r);
 *
 * ```
 * You you can simply read it: load resource Requisition with ID 123 and return this as Entity
 *
 * 2. Current fluent API also support partial updates and subcontext resource
 *  to load data from this REST API endpoint
 *      http://api.ariba.com/myService/v1/requisitions/123/suppliers
 * ```ts
 *  let r: Resource
 *
 *  r.load()
 *   .resource(Supplier)
 *   .of
 *   .resource(Requisition)
 *   .withId('123')
 *   .asEntity<Supplier>((r:  Supplier[]) => receivedR = r);
 *
 * ```
 *
 *  You can read above: Load all from resource Supplier of Requisition (or supplier belongs to
 *  Requisition)  with ID 123 and return this as Entity.
 *
 *
 * 3. To save data you follow the same syntax
 *      Save requisition so we are PUTting data to following URL
 *      http://api.ariba.com/myService/v1/requisitions/123
 *
 * ```ts
 *  let r: Resource
 *
 *          r
 *        .save()
 *        .resource(Requisition)
 *        .withId('123')
 *        .withData(pr)
 *        .asEntity<Requisition>((r: Requisition) => receivedR = r);
 *
 *
 * ```
 *
 *  You can read above: Save resource Requisition with ID 123 and with Data .... and return it as
 *  a Entity
 *
 *
 *  4. API can also for you assemble and execute actions sometimes called interaction. Not all is
 *  about CRUD. Our current syntax for actions is
 *
 *                       http://api.ariba.com/myService/v1/requisitions/123/actions/approve
 *
 * ```ts
 *  let r: Resource
 *
 *        r
 *        .do('approve')
 *        .resource(Requisition)
 *        .withId('123')
 *        .asEntity<Requisition>((r: Requisition) => receivedR = r);
 *
 *
 * ```
 *
 * To make it easily extensible they are 3 main pieces
 *  - Resource: This class just put together abstract structure URLSegment
 *  - URLSegments: More like AST style to assemble the URL
 *  - builder: that read this AST to assemble the URL
 *
 *
 * Later on we might want to expose builder as a provider and you can have your own implementation
 *
 *
 *
 *
 */
class Resource {
    /**
     * @param {?} http
     * @param {?} appConfig
     */
    constructor(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    /**
     * Identifies GET operation
     *
     * @return {?}
     */
    load() {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Load));
        return this;
    }
    /**
     * Identifies PUT or POST operation. Depending on the object. If the object has already
     * populated its identifier, then we use PUT, otherwise POST
     *
     * @return {?}
     */
    save() {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Save));
        return this;
    }
    /**
     * Identifies interaction. For this we use POST
     *
     * @param {?} action
     * @return {?}
     */
    do(action) {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Do, action));
        return this;
    }
    /**
     *
     * TODO: Since query API is not yet implemented on the server side => TBD
     *
     * There where should be able to accepts individual query grammar. Similar style like rxjs
     * operators.
     *
     *  e.g.: Resource.prototype.contains = ....
     *        Resource.prototype.eq = ....
     *
     * You should be able to add dynamically let;s call it QuerySpecification
     *
     *      res
     *      .query()
     *      .resource(Requsition)
     *      .where( contains<string>(reqEntity.title(), '*asdf*' )
     *
     *  so it could look like something like:
     *
     *
     *  contains<T>(title: string, value: T): T
     *
     *  But since all these Specification would have a way to translate this key|value to the
     *  query so the where, would just list all the specification to bulid
     *  the query
     *
     *
     * @return {?}
     */
    query() {
        this.init();
        throw new Error('Not implemented');
    }
    /**
     * @return {?}
     */
    where() {
        this.init();
        throw new Error('Not implemented');
    }
    /**
     *
     * Identifies ResourceSegment with specific type that must be either Entity or Value
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    resource(type) {
        this.urlGroup.push(new ResourceSegment(type));
        return this;
    }
    /**
     * Identifier IdentifierSegment
     *
     * @param {?} identifier
     * @return {?}
     */
    withId(identifier) {
        this.urlGroup.push(new IdentifierSegment(identifier));
        return this;
    }
    /**
     * When we are saving data this method is used to insert a payload to the ActionSegment
     *
     * @template T
     * @param {?} data
     * @return {?}
     */
    withData(data) {
        let /** @type {?} */ urlSegment = this.urlGroup.lookup(RestSegmentType.Action);
        let /** @type {?} */ isSave = (/** @type {?} */ (urlSegment)).actionType === RestAction.Save;
        assert(isSave, 'withData can be used with SAVE operation only!');
        (/** @type {?} */ (urlSegment)).data = data;
        return this;
    }
    /**
     * OF is just a syntactic suggar for better readability and to easier work with sub resources.
     * using OF we are able to tell that some resource belongs to other resource
     *
     * @return {?}
     */
    get of() {
        this.urlGroup.push(new OfParentSegment());
        return this;
    }
    /**
     *
     * Once tell what you want this is the last call you want to make to return resources as actual
     * Entities or Values.
     *
     * Todo: Maybe rename a method name as we can return both Entity and Value.
     *
     * You have also option to insert HttpOption
     *
     * @template T
     * @param {?} subscriber
     * @param {?=} options
     * @return {?}
     */
    asEntity(subscriber, options = { observe: 'body' }) {
        let /** @type {?} */ segment = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
        let /** @type {?} */ observable;
        let /** @type {?} */ actionType = segment.value;
        switch (actionType) {
            case RestAction.Load:
                observable = this.http.get(this.url, options);
                break;
            case RestAction.Do:
                observable = this.http.post(this.url, {}, options);
                break;
            case RestAction.Save:
                // we dont have right now other usecase subcontext resource will be always some
                // array
                if (isEntity(segment.data)) {
                    if (isBlank((/** @type {?} */ (segment.data)).identity())) {
                        observable = this.http.post(this.url, segment.data, options);
                    }
                    else {
                        observable = this.http.put(this.url, segment.data, options);
                    }
                }
                else if (isValue(segment.data)) {
                    // we expect value will be always pushed
                    observable = this.http.put(this.url, segment.data, options);
                }
                break;
        }
        return observable.pipe(map(res => this.convertToComposite(res, true, false))).subscribe(subscriber);
    }
    /**
     * @template T
     * @param {?} subscriber
     * @param {?=} error
     * @param {?=} options
     * @return {?}
     */
    asHttpResponse(subscriber, error, options = { observe: 'response' }) {
        let /** @type {?} */ segment = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
        let /** @type {?} */ observable;
        let /** @type {?} */ actionType = segment.value;
        switch (actionType) {
            case RestAction.Load:
                observable = this.http.get(this.url, options);
                break;
            case RestAction.Do:
                observable = this.http.post(this.url, {}, options);
                break;
            case RestAction.Save:
                // we dont have right now other usecase subcontext resource will be always some
                // array
                if (isEntity(segment.data)) {
                    if (isBlank((/** @type {?} */ (segment.data)).identity())) {
                        observable = this.http.post(this.url, segment.data, options);
                    }
                    else {
                        observable = this.http.put(this.url, segment.data, options);
                    }
                }
                else if (isValue(segment.data)) {
                    // we expect value will be always pushed
                    observable = this.http.put(this.url, segment.data, options);
                }
                break;
        }
        const /** @type {?} */ hasProgress = options.reportProgress || false;
        return observable.pipe(map(res => this.convertToComposite(res, false, hasProgress)))
            .subscribe(subscriber, error);
    }
    /**
     *
     * Return assebled URL AST -> string
     *
     * @return {?}
     */
    get url() {
        if (isBlank(this._url)) {
            let /** @type {?} */ isMocked = this.appConfig.getBoolean(AppConfig.ConnectionUseMockServer);
            this._url = this._urlBuilder.assembleUrl(isMocked);
        }
        return this._url;
    }
    /**
     * private
     *
     * @return {?}
     */
    get urlGroup() {
        return this._urlGroup;
    }
    /**
     * private
     *
     * @return {?}
     */
    get urlBuilder() {
        return this._urlBuilder;
    }
    /**
     * private
     *
     * @return {?}
     */
    init() {
        this._urlGroup = new RestUrlGroup();
        this._urlBuilder = new DefaultRestBuilder(this._urlGroup);
        this._url = null;
        this.urlGroup.push(new HostSegment(this.appConfig.getRestApiHost()));
        this.urlGroup.push(new ContextSegment(this.appConfig.getRestApiContext()));
    }
    /**
     * Used inside .map to map JSON response or HttpResponse.body to actual type
     *
     * @template T
     * @param {?} res
     * @param {?} isComposite
     * @param {?} hasProgress
     * @return {?}
     */
    convertToComposite(res, isComposite, hasProgress) {
        if (hasProgress) {
            return res;
        }
        // unsorted segments will have have our target resource as first one
        let /** @type {?} */ sgm = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Resource));
        if (isComposite) {
            return this.deserialize((/** @type {?} */ (res)).payload, sgm.value);
        }
        else {
            let /** @type {?} */ httpRes = /** @type {?} */ (res);
            let /** @type {?} */ myResp = {
                payload: this.deserialize(httpRes.body.payload, sgm.value)
            };
            return httpRes.clone({ body: myResp });
        }
    }
    /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    serialize(data) {
        return JSON.stringify(data);
    }
    /**
     *
     * Converts JSON object to actual Type. We don't care about primitive types as we dont have to
     * do anything with them. We do instantiate objects or complex types only.
     *
     *
     * @param {?} json
     * @param {?} clazz
     * @return {?}
     */
    deserialize(json, clazz) {
        if (isArray(json)) {
            let /** @type {?} */ instances = [];
            for (let /** @type {?} */ item in json) {
                instances.push(this.deserialize(json[item], clazz));
            }
            return instances;
        }
        else {
            let /** @type {?} */ instance;
            if (clazz === String) {
                instance = json.toString();
            }
            else if (clazz === Number) {
                instance = json;
            }
            else if (clazz === Boolean) {
                instance = json;
            }
            else {
                instance = new clazz();
                let /** @type {?} */ types = instance.getTypes();
                for (let /** @type {?} */ prop in json) {
                    if (!json.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (isPresent(types[prop]) && isPresent(json[prop]) && types[prop] !== Date) {
                        instance[prop] = this.deserialize(json[prop], types[prop]);
                    }
                    else if (isDate(types[prop])) {
                        instance[prop] = new types[prop](json[prop]);
                    }
                    else {
                        instance[prop] = json[prop];
                    }
                    // else if (isString(json[prop]) && isEntity(instance)
                    //     && prop === (<Entity>instance).identity()) {
                    //
                    //     const idString = (<Entity>instance).identity();
                    //     (<any>instance)[idString] = <string>json[prop];
                    //
                    // }
                }
            }
            return instance;
        }
    }
}
Resource.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Resource.ctorParameters = () => [
    { type: HttpClient },
    { type: AppConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NotFoundComponent {
    constructor() {
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
NotFoundComponent.decorators = [
    { type: Component, args: [{
                template: `<div class="page-container">
    <div class="row">
        <div class="col-md-12">
            <div class="error-template">
                <h1> Oops!</h1>
                <h2> 404 Not Found</h2>
                <div class="error-details"> Sorry, an error has occured, Requested page not found!
                </div>

            </div>
        </div>
    </div>
</div>
`,
                styles: [`.error-template{padding:40px 15px;text-align:center}.error-actions{margin-top:15px;margin-bottom:15px}.error-actions .btn{margin-right:10px}`]
            },] },
];
/** @nocollapse */
NotFoundComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Basic wrapper around Angular's ROUTE service to simplify temporary state caching as well
 * navigation. This service listen for Routing events such as NavigationStart as well,
 * NavigationEnds and when the routing Enters, We check if there any state which needs to be cached
 * if yes then we save it into the stateCacheHistory which maps final URL to the actual STATE
 * object, and when we are navigate back to the same URL We check if there is any saved state.
 *
 * This service was originally created as a response that angular always destroyes and recreates
 * components when navigating aways and then back to it. By a of angular 4.2.0+ this might be
 * obsolete.
 *
 */
class RoutingService {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        /**
         * Stack keeping active Routes so we can go back/redirect back
         *
         */
        this.routingState = [];
        /*
             * Event object for registering listeners to save a certain state as well as broadcasting back
             * when state needs to be retrieved back to the Page
             *
             */
        this.stateCache = new Subject();
        /**
         *
         * This is our cache which maps URL => to = >STATE. Any page can save any state using
         * observable object which will be retrieved back.
         *
         */
        this.stateCacheHistory = new Map();
        this.router.events.subscribe((event) => this.subscribeToRoutingEvents(event));
    }
    /**
     *
     * Here is the main routing logic that proceses every routing events.
     *
     * @param {?} event
     * @return {?}
     */
    subscribeToRoutingEvents(event) {
        if (event instanceof NavigationEnd) {
            let /** @type {?} */ url = event.url;
            if (this.stateCacheHistory.has(url)) {
                this.stateCache.next(this.stateCacheHistory.get(url));
                this.stateCacheHistory.delete(url);
            }
            this.routingState.push(event);
        }
        if (event instanceof NavigationStart) {
            let /** @type {?} */ itemBeforeRoute = ListWrapper.last(this.routingState);
            if (isPresent(this.currentStateFrom) && isPresent(itemBeforeRoute) && isPresent(this.currentStateFrom) && itemBeforeRoute instanceof NavigationEnd ||
                itemBeforeRoute instanceof NavigationStart) {
                this.stateCacheHistory.set(itemBeforeRoute.url, this.currentStateFrom);
                this.currentStateFrom = null;
            }
            else if (isPresent(this.currentStateTo)) {
                this.stateCacheHistory.set(event.url, this.currentStateTo);
                this.currentStateTo = null;
            }
        }
    }
    /**
     * Convenient GO BACK method. which takes you to previous route along with the URL change.
     *
     *
     * @param {?=} numOfSteps
     * @return {?}
     */
    goBack(numOfSteps = 1) {
        // we are starting from -1 as we need to also remove current route
        let /** @type {?} */ steps = -1;
        let /** @type {?} */ navigateUrl = '/404';
        while (steps !== numOfSteps) {
            let /** @type {?} */ popState = this.routingState.pop();
            if (popState instanceof NavigationEnd || popState instanceof NavigationStart) {
                navigateUrl = popState.url;
                steps++;
            }
        }
        this.router.navigateByUrl(navigateUrl);
    }
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     * @template T
     * @param {?} commands
     * @param {?=} state
     * @param {?=} extras
     * @return {?}
     */
    navigate(commands, state, extras) {
        this.currentStateFrom = state;
        this.router.navigate(commands, extras);
    }
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     * @template T
     * @param {?} route
     * @param {?=} params
     * @param {?=} state
     * @param {?=} extras
     * @return {?}
     */
    navigateWithRoute(route, params, state, extras) {
        this.currentStateTo = state;
        this.router.navigate([route.path, params], extras);
    }
    /**
     *
     * Entry method for broadcasting stateCache and sending saved State back to the page
     *
     *
     * @template T
     * @param {?} listener
     * @return {?}
     */
    bindStateCache(listener) {
        this.stateCache.asObservable().subscribe((stateItem) => listener(stateItem));
    }
    /**
     * Utility method so check extra parameters which are passed using Matrix notation
     *
     *
     * @param {?} route
     * @return {?}
     */
    operation(route) {
        let /** @type {?} */ operation = route.snapshot.params['o'];
        return isBlank(operation) || (operation !== 'view' && operation !== 'create' && operation !== 'edit')
            ? 'view' : operation;
    }
    /**
     * Assembles a path based on the current route.
     *
     * @param {?} pageName
     * @param {?} pathName
     * @return {?}
     */
    pathForPage(pageName, pathName) {
        return `${this.router.routerState.snapshot.url}/${pathName}`;
    }
    /**
     *
     * Search top level routes and return Route that has component name equal to pageName
     *
     *
     * @param {?} pageName
     * @param {?=} pathName
     * @param {?=} activatedPath
     * @return {?}
     */
    routeForPage(pageName, pathName, activatedPath) {
        let /** @type {?} */ nextRoute;
        // we need this as we need to lookup if there is any route with given pageName as
        // child route, if not search for global onces
        let /** @type {?} */ normalizedPath = activatedPath.indexOf('/') === 0 ? activatedPath.substring(1) :
            activatedPath;
        let /** @type {?} */ currentRoute = this.router.config.find((r) => {
            let /** @type {?} */ routePath = r.path.indexOf('/') === 0 ? r.path.substring(1) :
                r.path;
            return isPresent(normalizedPath) && normalizedPath === routePath;
        });
        // try to match the path and expected pageName
        if (isPresent(pathName) && isPresent(currentRoute) && currentRoute.children.length > 0) {
            nextRoute = currentRoute.children.find((r) => {
                let /** @type {?} */ componentName = r.component.prototype.constructor.name;
                return pathName === r.path && pageName === componentName;
            });
        }
        else if (isPresent(pageName)) {
            nextRoute = this.router.config.find((r) => {
                let /** @type {?} */ componentName = r.component.prototype.constructor.name;
                return pathName === r.path && pageName === componentName;
            });
        }
        // path not found then check only if we find anywhere in the path pageNae
        if (isBlank(nextRoute)) {
            this.router.config.forEach((r) => {
                if (isPresent(r.component)) {
                    let /** @type {?} */ componentName = r.component.prototype.constructor.name;
                    if (pageName === componentName) {
                        nextRoute = r;
                    }
                }
            });
        }
        return nextRoute;
    }
}
RoutingService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RoutingService.ctorParameters = () => [
    { type: Router }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Notifications service is a implementation of the publish/subscribe event bus for publishing
 * and listening for application level events.
 *
 * To subscribe to specific event e.g. User Logged In where topic is called user:signedIn
 *
 *
 * ```ts
 *
 * \@Component({
 *         selector: 'my-comp',
 *         template: `
 *                 Hello
 *             `
 *     })
 *     class MyComponent implements OnDestroy
 *     {
 *
 *        subscr: Subscription;
 *
 *         constructor(private notifications: Notifications) {
 *
 *              this.subscr = notifications.subscribe('user:signedIn', (message: any) =>
 *              {
 *                  // load user profile
 *              });
 *         }
 *
 *          ngOnDestroy(): void
 *          {
 *             this.subscr.unsubscribe();
 *          }
 *
 *
 *
 *     }
 *
 *
 * ```
 *
 * To publish event:
 *
 * ```
 *     let notifications: Notification;
 *     notifications.publish('user:signedIn', 'User just signed in');
 *
 * ```
 *
 * You can create and listen for your own application level events or you can also listen for all
 * the topics in the application if you use  `*` as application topic
 *
 * Unsubscribing is responsibility  of each subscriber
 *
 */
class Notifications {
    constructor() {
        this.events = new Subject();
    }
    /**
     *
     * Subscribe to specific listener based on given topic.
     *
     * @param {?} topic
     * @param {?} subscriber
     * @return {?}
     */
    subscribe(topic, subscriber) {
        const /** @type {?} */ toAll = Notifications.AllTopics;
        return this.events.pipe(filter(msg => msg.topic === topic || topic === toAll), map((msg) => msg.content)).subscribe(subscriber);
    }
    /**
     *
     * Publish new event to a topic
     *
     * @param {?} topic
     * @param {?} message
     * @return {?}
     */
    publish(topic, message) {
        let /** @type {?} */ msg = { topic: topic, content: message };
        this.events.next(msg);
    }
}
/**
 * When this is used as a topic subscriber receives all messages
 *
 */
Notifications.AllTopics = '*';
Notifications.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Notifications.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GlobalErrorHandler extends ErrorHandler {
    /**
     * @param {?=} notifications
     */
    constructor(notifications) {
        super();
        this.notifications = notifications;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        if (isPresent(this.notifications)) {
            this.notifications.publish('app:error', error);
        }
    }
}
GlobalErrorHandler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GlobalErrorHandler.ctorParameters = () => [
    { type: Notifications }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ routes = [
    { path: 'not-found', component: NotFoundComponent }
];
class AribaCoreRoutingModule {
}
AribaCoreRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    RouterModule.forChild(routes)
                ],
                exports: [RouterModule],
                providers: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Interceptor providing Mock Server functionality and is inserted only and if mock server is
 * enabled using AppConfig's connection.mock-server.enabled bootstrap property
 *
 *
 */
class HttpMockInterceptor {
    /**
     * @param {?} appConfig
     */
    constructor(appConfig) {
        this.appConfig = appConfig;
        /**
         * Stores loaded routes by given entity name.
         *
         */
        this.routesByEntity = new Map();
    }
    /**
     *
     * If route is found returned Mock resuled defined in the JSON files, otherwise pass
     * the request to the next interceptor.
     *
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        let /** @type {?} */ mockedResp = this.makeRes(req);
        if (isPresent(mockedResp)) {
            if (mockedResp.status >= 200 && mockedResp.status < 300) {
                return of(/** @type {?} */ (mockedResp));
            }
            else {
                let /** @type {?} */ errror = new HttpErrorResponse({
                    error: mockedResp.body,
                    status: mockedResp.status,
                    statusText: mockedResp.statusText,
                    url: req.urlWithParams
                });
                throwError(errror);
            }
        }
        return next.handle(req);
    }
    /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     * @return {?}
     */
    loadRoutes() {
        let /** @type {?} */ routes = this.appConfig.get(AppConfig.ConnectionMockServerRoutes);
        for (let /** @type {?} */ routeName of routes) {
            let /** @type {?} */ req = this.makeReq(routeName);
            // let's make quick and dirty async call to load our routes before anything else
            let /** @type {?} */ mocked = this.requestForRoutes(req);
            this.routesByEntity.set(mocked.resource, mocked.routes);
        }
    }
    /**
     *
     * Returns configuration based on mock JSON files.
     *
     * @param {?} req
     * @return {?}
     */
    requestForRoutes(req) {
        let /** @type {?} */ xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open(req.method, req.urlWithParams, false);
        req.headers.keys().forEach((key) => {
            let /** @type {?} */ all = req.headers.getAll(key);
            xmlHttpReq.setRequestHeader(name, all.join(','));
        });
        xmlHttpReq.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xmlHttpReq.send(null);
        let /** @type {?} */ body = isBlank(xmlHttpReq.response) ? xmlHttpReq.responseText :
            xmlHttpReq.response;
        if (xmlHttpReq.status < 200 && xmlHttpReq.status >= 300) {
            throw new Error('Cannot load Mock server configuration. Please make sure that you' +
                ' have a mock-routing/ folder under your assets');
        }
        return isString(body) ? JSON.parse(body) : body;
    }
    /**
     *
     * Create a requests to load routes
     *
     * @param {?} routeName
     * @return {?}
     */
    makeReq(routeName) {
        let /** @type {?} */ assetFolder = this.appConfig.get(AppConfig.AssetFolder);
        let /** @type {?} */ path = this.appConfig.get(AppConfig.ConnectionMockServerPath);
        return new HttpRequest('GET', `${assetFolder}${path}/${routeName}.json`, {
            responseType: 'json'
        });
    }
    /**
     *
     * When we are creating a response we always expect two things:
     * 1) We are dealing with Entity
     * 2) REST API is handled using Resource which prepend /mocked/
     *
     * @param {?} req
     * @return {?}
     */
    makeRes(req) {
        let /** @type {?} */ responseOp;
        let /** @type {?} */ path = req.urlWithParams.substring(req.url.indexOf('mocked') + 6);
        let /** @type {?} */ resource = path.substring(1);
        if (resource.indexOf('/') !== -1) {
            resource = resource.substring(0, resource.indexOf('/'));
        }
        if (this.routesByEntity.has(resource)) {
            responseOp = this.doHandleRequest(req, path, resource);
        }
        if (isBlank(responseOp) && this.appConfig.getBoolean(AppConfig.InTest)) {
            return new HttpResponse({
                body: {}, status: 404, statusText: 'Not Found',
                url: req.urlWithParams
            });
        }
        return responseOp;
    }
    /**
     *
     * This will get the content from the routes -> route as it as and return it as a
     * response
     *
     * @param {?} req
     * @param {?} path
     * @param {?} resource
     * @return {?}
     */
    doHandleRequest(req, path, resource) {
        let /** @type {?} */ routes = this.routesByEntity.get(resource);
        let /** @type {?} */ matchedRoute = routes.findIndex((el) => {
            return req.method.toLowerCase() === el.method.toLowerCase() && el.path === path;
        });
        if (matchedRoute !== -1) {
            let /** @type {?} */ route = routes[matchedRoute];
            let /** @type {?} */ payload = {
                payload: route.data
            };
            return new HttpResponse({
                body: payload,
                status: route.responseCode,
                statusText: route.responseText,
                url: route.path
            });
        }
        return null;
    }
}
HttpMockInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HttpMockInterceptor.ctorParameters = () => [
    { type: AppConfig }
];
/**
 * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
 */
class MockInterceptorHandler {
    /**
     * @param {?} next
     * @param {?} interceptor
     */
    constructor(next, interceptor) {
        this.next = next;
        this.interceptor = interceptor;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    handle(req) {
        return this.interceptor.intercept(req, this.next);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ UserConfig = new InjectionToken('UserConfig');
/**
 * Core mode includes all shared logic accross whole application
 */
class AribaCoreModule {
    /**
     * @param {?} parentModule
     * @param {?} conf
     */
    constructor(parentModule, conf) {
        this.conf = conf;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: AribaCoreModule,
            providers: [
                Title,
                Meta,
                Environment,
                Notifications,
                HttpMockInterceptor,
                Resource,
                { provide: UserConfig, useValue: config },
                {
                    provide: AppConfig, useFactory: makeConfig,
                    deps: [UserConfig, Injector, Environment]
                },
                {
                    provide: HttpHandler,
                    useFactory: makeHttpClientHandler,
                    deps: [
                        HttpBackend, AppConfig, HttpMockInterceptor,
                        [new Optional(), new Inject(HTTP_INTERCEPTORS)]
                    ],
                },
                { provide: ErrorHandler, useClass: GlobalErrorHandler, deps: [Notifications] },
                { provide: RoutingService, useClass: RoutingService, deps: [Router] }
            ]
        };
    }
}
AribaCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    AribaCoreRoutingModule
                ],
                declarations: [NotFoundComponent],
                bootstrap: []
            },] },
];
/** @nocollapse */
AribaCoreModule.ctorParameters = () => [
    { type: AribaCoreModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: AppConfig }
];
/**
 *
 * Add custom Mock functionality only and if we enabled this in the settings. I dont really want to
 * have NoopIntercepter in the chain
 *
 * @param {?} ngBackend
 * @param {?} config
 * @param {?} mockInterceptor
 * @param {?=} interceptors
 * @return {?}
 */
function makeHttpClientHandler(ngBackend, config, mockInterceptor, interceptors = []) {
    if (config.getBoolean(AppConfig.ConnectionUseMockServer)) {
        mockInterceptor.loadRoutes();
        interceptors = [...interceptors, mockInterceptor];
    }
    if (!interceptors) {
        return ngBackend;
    }
    return interceptors.reduceRight((next, interceptor) => new MockInterceptorHandler(next, interceptor), ngBackend);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * The FieldPath is utility class for representing of a dotted fieldPath.
 *
 * A String such as "foo.bar.baz" can be used to access a value on a target object.
 *
 */
class FieldPath {
    /**
     * @param {?} _path
     */
    constructor(_path) {
        this._path = _path;
        this._fieldPaths = isBlank(_path) ? [] : _path.split('.');
        this.objectPathInstance = create({ includeInheritedProps: true });
    }
    /**
     *
     * Sets a value to target objects
     *
     * @param {?} target
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    static setFieldValue(target, field, value) {
        let /** @type {?} */ fp = new FieldPath(field);
        fp.setFieldValue(target, value);
    }
    /**
     * Reads a value from target objects
     * @param {?} target
     * @param {?} field
     * @return {?}
     */
    static getFieldValue(target, field) {
        let /** @type {?} */ fp = new FieldPath(field);
        let /** @type {?} */ value = fp.getFieldValue(target);
        if (field === '$toString') {
            return value();
        }
        return value;
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
     * @param {?} target
     * @param {?} value
     * @return {?}
     */
    setFieldValue(target, value) {
        // implement the same thing what we have on the get, if Map set field into map
        if (this._fieldPaths.length > 1 && !(target instanceof Map)) {
            let /** @type {?} */ path = this._fieldPaths.slice(0, this._fieldPaths.length - 1).join('.');
            let /** @type {?} */ objectToBeUpdated = this.objectPathInstance.get(target, path);
            if (objectToBeUpdated instanceof Map) {
                objectToBeUpdated.set(this._fieldPaths[this._fieldPaths.length - 1], value);
            }
            else {
                this.objectPathInstance.set(target, this._path, value);
            }
        }
        if (target instanceof Map) {
            let /** @type {?} */ mapTarget = target;
            // handle Nested Map
            if (this._fieldPaths.length > 1) {
                let /** @type {?} */ path = this._fieldPaths.splice(0, 1);
                let /** @type {?} */ nestedMap = mapTarget.get(path[0]);
                if (isBlank(nestedMap)) {
                    nestedMap = new Map();
                    mapTarget.set(path[0], nestedMap);
                }
                this.setFieldValue(nestedMap, value);
            }
            else {
                target.set(this._fieldPaths[0], value);
            }
        }
        else {
            this.objectPathInstance.set(target, this._path, value);
        }
    }
    /**
     * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
     * as ready value from Maps.
     *
     * todo: this is quick and dirty implementation - need to write better solution
     * @param {?} target
     * @return {?}
     */
    getFieldValue(target) {
        let /** @type {?} */ value;
        for (let /** @type {?} */ i = 0; i < this._fieldPaths.length; i++) {
            if ((isStringMap(target) || isString(target)) && !(target instanceof Map)) {
                value = this.objectPathInstance.get(target, this._fieldPaths[i]);
                target = value;
            }
            else if (target instanceof Map) {
                let /** @type {?} */ targetMap = target;
                value = targetMap.get(this._fieldPaths[i]);
            }
            // just tweak to be able to access maps field.someMapField.mapKey
            // I want this to get the element from the map
            if (value instanceof Map && (i + 1) < this._fieldPaths.length) {
                let /** @type {?} */ mapValue = /** @type {?} */ (value);
                return mapValue.get(this._fieldPaths[i + 1]);
            }
        }
        return value;
    }
    /**
     * @return {?}
     */
    get path() {
        return this._path;
    }
    /**
     * @return {?}
     */
    toString() {
        return this._path;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Notion of having `AribaApplication` class came from  a simple requirement that every single
 * application needs a common way how to initialize.
 *
 * We want to be more application specific therefore we don't want to have generic names such as
 * `app.component or app.module`, the root component should be named based on what it is doing
 * or what is real application name e.g.: TodoApp, SourcingApp, etcs. and these application will
 * inherit from `AribaApplication` to get some common behavior.
 *
 * Specific application types will extends this class to add more behavior.
 *
 * There are two types of bootstrapping and passing environment parameters to the application:
 *
 * -  During AribaCoreUI import:
 *
 * ### example
 *
 * ```ts
 *      AribaCoreModule.forRoot({
 *                  'app.title': 'Playground Application',
 *                  'asset-folder': 'playground/assets',
 *                  'metaui.rules.file-names': ['Application', 'Layout'],
 *                  'restapi.context': '/myService/',
 *                  'connection.mock-server.enabled': true,
 *                  'connection.mock-server.routes': ['users'],
 *              }),
 *
 * ```
 *  Use this to pass some static properties.
 *
 *
 * -  From AribaApplication :
 *
 *  When you have specific type of applications that needs more settings you inherit from this
 *  class to extend its behavior and then use it for your applications to share common behavior
 *
 * ### example
 *
 *  ```ts
 *
 *     export class FacebookApplication extends AribaApplication {
 *
 *         protected appId: string = '.....';
 *
 *
 *          protected initialize(): void
 *          {
 *              super.initialize();
 *
 *              this.appId = readAppIdfromEnv();
 *
 *              this.appConfig.set('facebook.appId', this.appId );
 *
 *              this.registerFBAuthenticator();
 *
 *          }
 *
 *     }
 *
 *  ```
 *  Once you defined your type of application, then you can start creating applications that inherit
 *  from this `FacebookApplication`. Root App component
 *
 *
 * ```ts
 * \@Component({...})
 *      export PictureAppComponent extends FacebookApplication {
 *             ...
 *
 *      }
 *
 *
 *
 * \@NgModule({ bootstrap: [PictureAppComponent] })
 *     export class PictureAppModule {
 *
 *     }
 *
 *
 * ```
 *
 */
class AribaApplication {
    /**
     * @param {?} appConfig
     */
    constructor(appConfig) {
        this.appConfig = appConfig;
        this.metaTags = this.appConfig.injector.get(Meta);
        this.title = this.appConfig.injector.get(Title);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initialize();
    }
    /**
     * Current default behavior just sets a title for the application
     * @return {?}
     */
    initialize() {
        let /** @type {?} */ title = this.appConfig.get(AppConfig.AppTitle);
        if (isBlank(title)) {
            title = 'Ariba Application';
        }
        this.title.setTitle(title);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AppConfig, makeConfig, Environment, Resource, DefaultRestBuilder, isEntity, isValue, ActionSegment, RestAction, ResourceSegment, RestSegmentType, UrlSegment, ContextSegment, HostSegment, IdentifierSegment, OfParentSegment, RestUrlGroup, MapWrapper, StringMapWrapper, ListWrapper, isListLikeIterable$1 as isListLikeIterable, areIterablesEqual, iterateListLike, findLast, getTypeNameForDebugging, unimplemented, isPresent, isBlank, isBoolean, isNumber, isString, isFunction, isType, isStringMap, isStrictStringMap, isPromise, isArray, isDate, isWindow, isRegExp, noop, stringify, className, applyMixins, StringWrapper, StringJoiner, NumberWrapper, FunctionWrapper, looseIdentical, getMapKey, normalizeBlank, normalizeBool, isJsObject, print, warn, assert, checksum, crc32, Json, DateWrapper, BooleanWrapper, getSymbolIterator, evalExpression, evalExpressionWithCntx, isPrimitive, hasConstructor, escape, escapeRegExp, hashCode, objectToName, equals, shiftLeft, shiftRight, Extensible, readGlobalParam, decamelize, nonPrivatePrefix, hasGetter, uuid, objectValues, NotFoundComponent, RoutingService, AribaCoreModule, FieldPath, AribaApplication, Notifications, AribaCoreRoutingModule as ɵc, UserConfig as ɵa, makeHttpClientHandler as ɵb, GlobalErrorHandler as ɵe, HttpMockInterceptor as ɵd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmF1aS1jb3JlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYXJpYmF1aS9jb3JlL3V0aWxzL2xhbmcudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvdXRpbHMvY29sbGVjdGlvbi50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9jb25maWcvYXBwLWNvbmZpZy50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9jb25maWcvZW52aXJvbm1lbnQudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZG9tYWluL2RvbWFpbi1tb2RlbC50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9kb21haW4vdXJsL3NlZ21lbnQudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZG9tYWluL3VybC9idWlsZGVyLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2RvbWFpbi91cmwvdXJsLWdyb3VwLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2RvbWFpbi9yZXNvdXJjZS5zZXJ2aWNlLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL25vdC1mb3VuZC9ub3QtZm91bmQuY29tcG9uZW50LnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL3JvdXRpbmcvcm91dGluZy5zZXJ2aWNlLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL21lc3NhZ2luZy9ub3RpZmljYXRpb25zLnNlcnZpY2UudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZ2xvYmFsLWVycm9yLWhhbmRsZXIudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvYXJpYmEtY29yZS1yb3V0aW5nLm1vZHVsZS50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9odHRwL2h0dHAtbW9jay1pbnRlcmNlcHRvci50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9hcmliYS5jb3JlLm1vZHVsZS50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS91dGlscy9maWVsZC1wYXRoLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2FyaWJhLWFwcGxpY2F0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBvcmlnaW5hbC1saWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqXG4gKlxuICpcbiAqICBDcmVkaXQ6IERlcml2ZWQgYW5kIGV4dGVuZGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhciBpbiBvcmRlciB0byBoYXZlIHNldCBvZlxuICogIHJldXNhYmxlIGdsb2JhbHMuIFNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJIG5lZWQgdG8gaGF2ZSBhIGNvcHkgdW5kZXIgY29yZS5cbiAqL1xuaW1wb3J0ICogYXMgYmlnSW50SW1wb3J0ZWQgZnJvbSAnYmlnLWludGVnZXInO1xuXG5jb25zdCBiaWdJbnQgPSBiaWdJbnRJbXBvcnRlZDtcblxuLyoqXG4gKiAgU2V0IG9mIHJldXNhYmxlIGdsb2JhbHMuIFRoaXMgaXMgdGFrZW4gZnJvbSB0aGUgQW5ndWxhciAyIHNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJLiBBbmQgdGhlcmVcbiAqICBpcyBhIG5lZWQgZm9yIHN1Y2ggY29tbW9uIGZ1bmN0aW9ucyBhbmQgd3JhcHBlcnNcbiAqXG4gKi9cblxuY29uc3QgX193aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG5jb25zdCBfZ2xvYmFsOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IF9fd2luZG93O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkR2xvYmFsUGFyYW0odmFyTmFtZTogYW55KTogeyBbbmFtZTogc3RyaW5nXTogYW55IH1cbntcbiAgICByZXR1cm4gX2dsb2JhbFt2YXJOYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRHbG9iYWxUeXBlKHZhck5hbWU6IGFueSk6IGFueVxue1xuICAgIHJldHVybiBfZ2xvYmFsW3Zhck5hbWVdO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlTmFtZUZvckRlYnVnZ2luZyh0eXBlOiBhbnkpOiBzdHJpbmdcbntcbiAgICBpZiAodHlwZVsnbmFtZSddKSB7XG4gICAgICAgIHJldHVybiB0eXBlWyduYW1lJ107XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgdHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaW1wbGVtZW50ZWQoKTogYW55XG57XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByZXNlbnQob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIG9iaiAhPT0gdW5kZWZpbmVkICYmIG9iaiAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxhbmsob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbihvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcob2JqOiBhbnkpOiBvYmogaXMgc3RyaW5nXG57XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVHlwZShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gaXNGdW5jdGlvbihvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdNYXAob2JqOiBhbnkpOiBvYmogaXMgT2JqZWN0XG57XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbDtcbn1cblxuY29uc3QgU1RSSU5HX01BUF9QUk9UTyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih7fSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmljdFN0cmluZ01hcChvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gaXNTdHJpbmdNYXAob2JqKSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gU1RSSU5HX01BUF9QUk9UTztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICAvLyBhbGxvdyBhbnkgUHJvbWlzZS9BKyBjb21wbGlhbnQgdGhlbmFibGUuXG4gICAgLy8gSXQncyB1cCB0byB0aGUgY2FsbGVyIHRvIGVuc3VyZSB0aGF0IG9iai50aGVuIGNvbmZvcm1zIHRvIHRoZSBzcGVjXG4gICAgcmV0dXJuIGlzUHJlc2VudChvYmopICYmIGlzRnVuY3Rpb24ob2JqLnRoZW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlKG9iajogYW55KTogb2JqIGlzIERhdGVcbntcbiAgICByZXR1cm4gKG9iaiBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKG9iai52YWx1ZU9mKCkpKSB8fFxuICAgICAgICAoaXNQcmVzZW50KG9iaikgJiYgaXNGdW5jdGlvbihvYmoubm93KSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlzdExpa2VJdGVyYWJsZShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICBpZiAoIWlzSnNPYmplY3Qob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KG9iaikgfHxcbiAgICAgICAgKCEob2JqIGluc3RhbmNlb2YgTWFwKSAmJiAgICAgIC8vIEpTIE1hcCBhcmUgaXRlcmFibGVzIGJ1dCByZXR1cm4gZW50cmllcyBhcyBbaywgdl1cbiAgICAgICAgICAgIGdldFN5bWJvbEl0ZXJhdG9yKCkgaW4gb2JqKTsgIC8vIEpTIEl0ZXJhYmxlIGhhdmUgYSBTeW1ib2wuaXRlcmF0b3IgcHJvcFxufVxuXG5cbi8qKlxuICogQ2hlY2tzIGlmIGBvYmpgIGlzIGEgd2luZG93IG9iamVjdC5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1dpbmRvdyhvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gb2JqICYmIG9iai53aW5kb3cgPT09IG9iajtcbn1cblxuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZWdFeHAodmFsdWU6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKVxue1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaGlmdExlZnQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXJcbntcbiAgICByZXR1cm4gYmlnSW50KGEpLnNoaWZ0TGVmdChiKS52YWx1ZU9mKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaWZ0UmlnaHQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXJcbntcbiAgICByZXR1cm4gYmlnSW50KGEpLnNoaWZ0UmlnaHQoYikudmFsdWVPZigpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkodG9rZW46IGFueSk6IHN0cmluZ1xue1xuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG5cbiAgICBpZiAodG9rZW4gPT09IHVuZGVmaW5lZCB8fCB0b2tlbiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJycgKyB0b2tlbjtcbiAgICB9XG5cbiAgICBpZiAodG9rZW4ub3ZlcnJpZGRlbk5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuLm92ZXJyaWRkZW5OYW1lO1xuICAgIH1cbiAgICBpZiAodG9rZW4ubmFtZSkge1xuICAgICAgICByZXR1cm4gdG9rZW4ubmFtZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gdG9rZW4udG9TdHJpbmcoKTtcbiAgICBsZXQgbmV3TGluZUluZGV4ID0gcmVzLmluZGV4T2YoJ1xcbicpO1xuICAgIHJldHVybiAobmV3TGluZUluZGV4ID09PSAtMSkgPyByZXMgOiByZXMuc3Vic3RyaW5nKDAsIG5ld0xpbmVJbmRleCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzTmFtZShjbGF6ejogYW55KTogc3RyaW5nXG57XG4gICAgaWYgKGlzUHJlc2VudChjbGF6ei5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgbGV0IGNsYXNzTiA9IGNsYXp6LmNvbnN0cnVjdG9yLnRvU3RyaW5nKCk7XG4gICAgICAgIGNsYXNzTiA9IGNsYXNzTi5zdWJzdHIoJ2Z1bmN0aW9uICcubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGNsYXNzTi5zdWJzdHIoMCwgY2xhc3NOLmluZGV4T2YoJygnKSk7XG4gICAgfVxuICAgIHJldHVybiBjbGF6ejtcbn1cblxuXG4vKipcbiAqICBTb3VyY2U6IGh0dHBzOi8vd3d3LnR5cGVzY3JpcHRsYW5nLm9yZy9kb2NzL2hhbmRib29rL21peGlucy5odG1sXG4gKlxuICogIEZ1bmN0aW9uIHRoYXQgY29waWVzIHByb3BlcnRpZXMgb2YgdGhlIGJhc2VDdG9ycyB0byBkZXJpdmVkQ3Rvci5cbiAqICBDYW4gYmUgdXNlZCB0byBhY2hpZXZlIG11bHRpcGxlIGluaGVyaXRhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNaXhpbnMoZGVyaXZlZEN0b3I6IGFueSwgYmFzZUN0b3JzOiBhbnlbXSlcbntcbiAgICBiYXNlQ3RvcnMuZm9yRWFjaChiYXNlQ3RvciA9PlxuICAgIHtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmFzZUN0b3IucHJvdG90eXBlKS5mb3JFYWNoKG5hbWUgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgZGVyaXZlZEN0b3IucHJvdG90eXBlW25hbWVdXG4gICAgICAgICAgICAgICAgPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nV3JhcHBlclxue1xuICAgIHN0YXRpYyBmcm9tQ2hhckNvZGUoY29kZTogbnVtYmVyKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hhckNvZGVBdChzOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiBzLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzcGxpdChzOiBzdHJpbmcsIHJlZ0V4cDogUmVnRXhwKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiBzLnNwbGl0KHJlZ0V4cCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFscyhzOiBzdHJpbmcsIHMyOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gcyA9PT0gczI7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0cmlwTGVmdChzOiBzdHJpbmcsIGNoYXJWYWw6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNbaV0gIT09IGNoYXJWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0cmlwUmlnaHQoczogc3RyaW5nLCBjaGFyVmFsOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmIChzICYmIHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgcG9zID0gcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmIChzW2ldICE9PSBjaGFyVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMgPSBzLnN1YnN0cmluZygwLCBwb3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXBsYWNlKHM6IHN0cmluZywgZnJvbTogc3RyaW5nLCByZXBsYWNlOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgcmVwbGFjZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2VBbGwoczogc3RyaW5nLCBmcm9tOiBSZWdFeHAsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZShmcm9tLCByZXBsYWNlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2xpY2U8VD4oczogc3RyaW5nLCBmcm9tOiBudW1iZXIgPSAwLCB0bzogbnVtYmVyID0gbnVsbCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHMuc2xpY2UoZnJvbSwgdG8gPT09IG51bGwgPyB1bmRlZmluZWQgOiB0byk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5zKHM6IHN0cmluZywgc3Vic3RyOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gcy5pbmRleE9mKHN1YnN0cikgIT09IC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb21wYXJlKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIGVuZHNXaWR0aChzdWJqZWN0OiBzdHJpbmcsIHNlYXJjaFN0cmluZzogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyID0gMCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICghU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCkge1xuICAgICAgICAgICAgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uIChzc3RyaW5nLCBwb3MgPSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBzdWJqZWN0U3RyaW5nID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcG9zICE9PSAnbnVtYmVyJyB8fCAhaXNGaW5pdGUocG9zKSB8fCBNYXRoLmZsb29yKHBvcykgIT09IHBvcyB8fCBwb3NcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0U3RyaW5nLmxlbmd0aClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHN1YmplY3RTdHJpbmcubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MgLT0gc3N0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RJbmRleCA9IHN1YmplY3RTdHJpbmcuaW5kZXhPZihzc3RyaW5nLCBwb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViamVjdC5lbmRzV2l0aChzZWFyY2hTdHJpbmcpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHN0YXJ0c1dpZHRoKHN1YmplY3Q6IHN0cmluZywgc2VhcmNoU3RyaW5nOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gc3ViamVjdC5pbmRleE9mKHNlYXJjaFN0cmluZykgPT09IDA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nSm9pbmVyXG57XG4gICAgY29uc3RydWN0b3IocHVibGljIHBhcnRzOiBzdHJpbmdbXSA9IFtdKVxuICAgIHtcbiAgICB9XG5cbiAgICBhZGQocGFydDogc3RyaW5nKTogU3RyaW5nSm9pbmVyXG4gICAge1xuICAgICAgICB0aGlzLnBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgbGFzdCgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzW3RoaXMucGFydHMubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cy5qb2luKCcnKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE51bWJlcldyYXBwZXJcbntcbiAgICBzdGF0aWMgdG9GaXhlZChuOiBudW1iZXIsIGZyYWN0aW9uRGlnaXRzOiBudW1iZXIpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBuLnRvRml4ZWQoZnJhY3Rpb25EaWdpdHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbChhOiBudW1iZXIsIGI6IG51bWJlcik6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBhID09PSBiO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZUludEF1dG9SYWRpeCh0ZXh0OiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IHBhcnNlSW50KHRleHQpO1xuICAgICAgICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgJyArIHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlSW50KHRleHQ6IHN0cmluZywgcmFkaXg6IG51bWJlcik6IG51bWJlclxuICAgIHtcbiAgICAgICAgaWYgKHJhZGl4ID09PSAxMCkge1xuICAgICAgICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTldKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJhZGl4ID09PSAxNikge1xuICAgICAgICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTlBQkNERUZhYmNkZWZdKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCBpbnRlZ2VyIGxpdGVyYWwgd2hlbiBwYXJzaW5nICcgKyB0ZXh0ICsgJyBpbiBiYXNlICcgKyByYWRpeCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogTmFOIGlzIGEgdmFsaWQgbGl0ZXJhbCBidXQgaXMgcmV0dXJuZWQgYnkgcGFyc2VGbG9hdCB0byBpbmRpY2F0ZSBhbiBlcnJvci5cbiAgICBzdGF0aWMgcGFyc2VGbG9hdCh0ZXh0OiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRleHQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc051bWVyaWModmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAhaXNOYU4odmFsdWUgLSBwYXJzZUZsb2F0KHZhbHVlKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzTmFOKHZhbHVlOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0ludGVnZXIodmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbldyYXBwZXJcbntcbiAgICBzdGF0aWMgYXBwbHkoZm46IEZ1bmN0aW9uLCBwb3NBcmdzOiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBwb3NBcmdzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYmluZChmbjogRnVuY3Rpb24sIHNjb3BlOiBhbnkpOiBGdW5jdGlvblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZuLmJpbmQoc2NvcGUpO1xuICAgIH1cbn1cblxuLy8gSlMgaGFzIE5hTiAhPT0gTmFOXG5leHBvcnQgZnVuY3Rpb24gbG9vc2VJZGVudGljYWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIGEgPT09IGIgfHwgdHlwZW9mIGEgPT09ICdudW1iZXInICYmIHR5cGVvZiBiID09PSAnbnVtYmVyJyAmJiBpc05hTihhKSAmJiBpc05hTihiKTtcbn1cblxuLy8gSlMgY29uc2lkZXJzIE5hTiBpcyB0aGUgc2FtZSBhcyBOYU4gZm9yIG1hcCBLZXkgKHdoaWxlIE5hTiAhPT0gTmFOIG90aGVyd2lzZSlcbi8vIHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXBcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXBLZXk8VD4odmFsdWU6IFQpOiBUXG57XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQmxhbmsob2JqOiBPYmplY3QpOiBhbnlcbntcbiAgICByZXR1cm4gaXNCbGFuayhvYmopID8gbnVsbCA6IG9iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUJvb2wob2JqOiBib29sZWFuKTogYm9vbGVhblxue1xuICAgIHJldHVybiBpc0JsYW5rKG9iaikgPyBmYWxzZSA6IG9iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSnNPYmplY3QobzogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBvICE9PSBudWxsICYmICh0eXBlb2YgbyA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgbyA9PT0gJ29iamVjdCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnQob2JqOiBFcnJvciB8IE9iamVjdClcbntcbiAgICBjb25zb2xlLmxvZyhvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FybihvYmo6IEVycm9yIHwgT2JqZWN0KVxue1xuICAgIGNvbnNvbGUud2FybihvYmopO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uOiBib29sZWFuLCBtc2c6IHN0cmluZylcbntcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja3N1bShzOiBhbnkpXG57XG4gICAgbGV0IGNoayA9IDB4MTIzNDU2Nzg7XG4gICAgbGV0IGxlbiA9IHMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY2hrICs9IChzLmNoYXJDb2RlQXQoaSkgKiAoaSArIDEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGNoayAmIDB4ZmZmZmZmZmYpLnRvU3RyaW5nKDE2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyYzMyKGNyYzogbnVtYmVyLCBhbkludDogbnVtYmVyKVxue1xuICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgbGV0IHRhYmxlID0gJzAwMDAwMDAwIDc3MDczMDk2IEVFMEU2MTJDIDk5MDk1MUJBIDA3NkRDNDE5IDcwNkFGNDhGIEU5NjNBNTM1IDlFNjQ5NUEzIDBFREI4ODMyIDc5RENCOEE0IEUwRDVFOTFFIDk3RDJEOTg4IDA5QjY0QzJCIDdFQjE3Q0JEIEU3QjgyRDA3IDkwQkYxRDkxIDFEQjcxMDY0IDZBQjAyMEYyIEYzQjk3MTQ4IDg0QkU0MURFIDFBREFENDdEIDZERERFNEVCIEY0RDRCNTUxIDgzRDM4NUM3IDEzNkM5ODU2IDY0NkJBOEMwIEZENjJGOTdBIDhBNjVDOUVDIDE0MDE1QzRGIDYzMDY2Q0Q5IEZBMEYzRDYzIDhEMDgwREY1IDNCNkUyMEM4IDRDNjkxMDVFIEQ1NjA0MUU0IEEyNjc3MTcyIDNDMDNFNEQxIDRCMDRENDQ3IEQyMEQ4NUZEIEE1MEFCNTZCIDM1QjVBOEZBIDQyQjI5ODZDIERCQkJDOUQ2IEFDQkNGOTQwIDMyRDg2Q0UzIDQ1REY1Qzc1IERDRDYwRENGIEFCRDEzRDU5IDI2RDkzMEFDIDUxREUwMDNBIEM4RDc1MTgwIEJGRDA2MTE2IDIxQjRGNEI1IDU2QjNDNDIzIENGQkE5NTk5IEI4QkRBNTBGIDI4MDJCODlFIDVGMDU4ODA4IEM2MENEOUIyIEIxMEJFOTI0IDJGNkY3Qzg3IDU4Njg0QzExIEMxNjExREFCIEI2NjYyRDNEIDc2REM0MTkwIDAxREI3MTA2IDk4RDIyMEJDIEVGRDUxMDJBIDcxQjE4NTg5IDA2QjZCNTFGIDlGQkZFNEE1IEU4QjhENDMzIDc4MDdDOUEyIDBGMDBGOTM0IDk2MDlBODhFIEUxMEU5ODE4IDdGNkEwREJCIDA4NkQzRDJEIDkxNjQ2Qzk3IEU2NjM1QzAxIDZCNkI1MUY0IDFDNkM2MTYyIDg1NjUzMEQ4IEYyNjIwMDRFIDZDMDY5NUVEIDFCMDFBNTdCIDgyMDhGNEMxIEY1MEZDNDU3IDY1QjBEOUM2IDEyQjdFOTUwIDhCQkVCOEVBIEZDQjk4ODdDIDYyREQxRERGIDE1REEyRDQ5IDhDRDM3Q0YzIEZCRDQ0QzY1IDREQjI2MTU4IDNBQjU1MUNFIEEzQkMwMDc0IEQ0QkIzMEUyIDRBREZBNTQxIDNERDg5NUQ3IEE0RDFDNDZEIEQzRDZGNEZCIDQzNjlFOTZBIDM0NkVEOUZDIEFENjc4ODQ2IERBNjBCOEQwIDQ0MDQyRDczIDMzMDMxREU1IEFBMEE0QzVGIEREMEQ3Q0M5IDUwMDU3MTNDIDI3MDI0MUFBIEJFMEIxMDEwIEM5MEMyMDg2IDU3NjhCNTI1IDIwNkY4NUIzIEI5NjZENDA5IENFNjFFNDlGIDVFREVGOTBFIDI5RDlDOTk4IEIwRDA5ODIyIEM3RDdBOEI0IDU5QjMzRDE3IDJFQjQwRDgxIEI3QkQ1QzNCIEMwQkE2Q0FEIEVEQjg4MzIwIDlBQkZCM0I2IDAzQjZFMjBDIDc0QjFEMjlBIEVBRDU0NzM5IDlERDI3N0FGIDA0REIyNjE1IDczREMxNjgzIEUzNjMwQjEyIDk0NjQzQjg0IDBENkQ2QTNFIDdBNkE1QUE4IEU0MEVDRjBCIDkzMDlGRjlEIDBBMDBBRTI3IDdEMDc5RUIxIEYwMEY5MzQ0IDg3MDhBM0QyIDFFMDFGMjY4IDY5MDZDMkZFIEY3NjI1NzVEIDgwNjU2N0NCIDE5NkMzNjcxIDZFNkIwNkU3IEZFRDQxQjc2IDg5RDMyQkUwIDEwREE3QTVBIDY3REQ0QUNDIEY5QjlERjZGIDhFQkVFRkY5IDE3QjdCRTQzIDYwQjA4RUQ1IEQ2RDZBM0U4IEExRDE5MzdFIDM4RDhDMkM0IDRGREZGMjUyIEQxQkI2N0YxIEE2QkM1NzY3IDNGQjUwNkREIDQ4QjIzNjRCIEQ4MEQyQkRBIEFGMEExQjRDIDM2MDM0QUY2IDQxMDQ3QTYwIERGNjBFRkMzIEE4NjdERjU1IDMxNkU4RUVGIDQ2NjlCRTc5IENCNjFCMzhDIEJDNjY4MzFBIDI1NkZEMkEwIDUyNjhFMjM2IENDMEM3Nzk1IEJCMEI0NzAzIDIyMDIxNkI5IDU1MDUyNjJGIEM1QkEzQkJFIEIyQkQwQjI4IDJCQjQ1QTkyIDVDQjM2QTA0IEMyRDdGRkE3IEI1RDBDRjMxIDJDRDk5RThCIDVCREVBRTFEIDlCNjRDMkIwIEVDNjNGMjI2IDc1NkFBMzlDIDAyNkQ5MzBBIDlDMDkwNkE5IEVCMEUzNjNGIDcyMDc2Nzg1IDA1MDA1NzEzIDk1QkY0QTgyIEUyQjg3QTE0IDdCQjEyQkFFIDBDQjYxQjM4IDkyRDI4RTlCIEU1RDVCRTBEIDdDRENFRkI3IDBCREJERjIxIDg2RDNEMkQ0IEYxRDRFMjQyIDY4RERCM0Y4IDFGREE4MzZFIDgxQkUxNkNEIEY2QjkyNjVCIDZGQjA3N0UxIDE4Qjc0Nzc3IDg4MDg1QUU2IEZGMEY2QTcwIDY2MDYzQkNBIDExMDEwQjVDIDhGNjU5RUZGIEY4NjJBRTY5IDYxNkJGRkQzIDE2NkNDRjQ1IEEwMEFFMjc4IEQ3MEREMkVFIDRFMDQ4MzU0IDM5MDNCM0MyIEE3NjcyNjYxIEQwNjAxNkY3IDQ5Njk0NzREIDNFNkU3N0RCIEFFRDE2QTRBIEQ5RDY1QURDIDQwREYwQjY2IDM3RDgzQkYwIEE5QkNBRTUzIERFQkI5RUM1IDQ3QjJDRjdGIDMwQjVGRkU5IEJEQkRGMjFDIENBQkFDMjhBIDUzQjM5MzMwIDI0QjRBM0E2IEJBRDAzNjA1IENERDcwNjkzIDU0REU1NzI5IDIzRDk2N0JGIEIzNjY3QTJFIEM0NjE0QUI4IDVENjgxQjAyIDJBNkYyQjk0IEI0MEJCRTM3IEMzMEM4RUExIDVBMDVERjFCIDJEMDJFRjhEJztcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG5cbiAgICBsZXQgeCA9IDA7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgbGV0IG15Q3JjID0gY3JjIF4gKC0xKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICB5ID0gKGNyYyBeIGFuSW50KSAmIDB4RkY7XG4gICAgICAgIHggPSBOdW1iZXIoJzB4JyArIHRhYmxlLnN1YnN0cih5ICogOSwgOCkpO1xuICAgICAgICBjcmMgPSAoY3JjID4+PiA4KSBeIHg7XG4gICAgfVxuICAgIHJldHVybiBjcmMgXiAoLTEpO1xufVxuXG5cbi8vIENhbid0IGJlIGFsbCB1cHBlcmNhc2UgYXMgb3VyIHRyYW5zcGlsZXIgd291bGQgdGhpbmsgaXQgaXMgYSBzcGVjaWFsIGRpcmVjdGl2ZS4uLlxuZXhwb3J0IGNsYXNzIEpzb25cbntcbiAgICBzdGF0aWMgcGFyc2Uoczogc3RyaW5nKTogT2JqZWN0XG4gICAge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RyaW5naWZ5KGRhdGE6IE9iamVjdCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgLy8gRGFydCBkb2Vzbid0IHRha2UgMyBhcmd1bWVudHNcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERhdGVXcmFwcGVyXG57XG4gICAgc3RhdGljIGNyZWF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIgPSAxLCBkYXk6IG51bWJlciA9IDEsIGhvdXI6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgICBtaW51dGVzOiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgICAgc2Vjb25kczogbnVtYmVyID0gMCwgbWlsbGlzZWNvbmRzOiBudW1iZXIgPSAwKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tSVNPU3RyaW5nKHN0cjogc3RyaW5nKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHN0cik7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21NaWxsaXMobXM6IG51bWJlcik6IERhdGVcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShtcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvTWlsbGlzKGRhdGU6IERhdGUpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm93KCk6IERhdGVcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b0pzb24oZGF0ZTogRGF0ZSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGRhdGUudG9KU09OKCk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBCb29sZWFuV3JhcHBlclxue1xuXG4gICAgc3RhdGljIGJvbGVhblZhbHVlKHZhbHVlOiBhbnkgPSBmYWxzZSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBpc0ZhbHNlKHZhbHVlOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodmFsdWUgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICdmYWxzZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmdNYXAodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gZmFsc2UpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBpc1RydWUodmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nTWFwKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgPT09IHRydWUpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cblxuLy8gV2hlbiBTeW1ib2wuaXRlcmF0b3IgZG9lc24ndCBleGlzdCwgcmV0cmlldmVzIHRoZSBrZXkgdXNlZCBpbiBlczYtc2hpbVxuZGVjbGFyZSBsZXQgU3ltYm9sOiBhbnk7XG5sZXQgX3N5bWJvbEl0ZXJhdG9yOiBhbnkgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKTogc3RyaW5nIHwgc3ltYm9sXG57XG4gICAgaWYgKGlzQmxhbmsoX3N5bWJvbEl0ZXJhdG9yKSkge1xuICAgICAgICBpZiAoaXNQcmVzZW50KFN5bWJvbC5pdGVyYXRvcikpIHtcbiAgICAgICAgICAgIF9zeW1ib2xJdGVyYXRvciA9IFN5bWJvbC5pdGVyYXRvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzNi1zaGltIHNwZWNpZmljIGxvZ2ljXG4gICAgICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE1hcC5wcm90b3R5cGUpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2VudHJpZXMnICYmIGtleSAhPT0gJ3NpemUnICYmXG4gICAgICAgICAgICAgICAgICAgIChNYXAgYXMgYW55KS5wcm90b3R5cGVba2V5XSA9PT0gTWFwLnByb3RvdHlwZVsnZW50cmllcyddKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgX3N5bWJvbEl0ZXJhdG9yID0ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX3N5bWJvbEl0ZXJhdG9yO1xufVxuXG5jb25zdCBSZXNlcnZlZEtleXdvcmQgPSBbJ2NsYXNzJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsRXhwcmVzc2lvbihleHByOiBzdHJpbmcsIGRlY2xhcmF0aW9uczogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBhbnlcbntcbiAgICBsZXQgZm5Cb2R5ID0gYCR7ZGVjbGFyYXRpb25zfVxcblxcdHJldHVybiAke2V4cHJ9XFxuLy8jIHNvdXJjZVVSTD1BcmliYUV4cHJlc3Npb25gO1xuICAgIGxldCBmbkFyZ05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBmbkFyZ1ZhbHVlczogYW55W10gPSBbXTtcbiAgICBmb3IgKGxldCBhcmdOYW1lIGluIGxldHMpIHtcbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwgYXJnTmFtZSkpIHtcbiAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChhcmdOYW1lKTtcbiAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2gobGV0c1thcmdOYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxldHMgaW5zdGFuY2VvZiBFeHRlbnNpYmxlKSB7XG4gICAgICAgIGxldCBleHRWYWx1ZXM6IEV4dGVuc2libGUgPSBsZXRzO1xuXG4gICAgICAgIGV4dFZhbHVlcy5leHRlbmRlZEZpZWxkcygpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGV4cHIsIGtleSkgJiZcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xICYmIFJlc2VydmVkS2V5d29yZC5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICBrZXkpID09PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICBmbkFyZ1ZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZm5BcmdOYW1lcy5wdXNoKCd0aGlzJyk7XG4gICAgLy8gZm5BcmdWYWx1ZXMucHVzaChsZXRzKTtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKC4uLmZuQXJnTmFtZXMuY29uY2F0KGZuQm9keSkpKC4uLmZuQXJnVmFsdWVzKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXZhbEV4cHJlc3Npb25XaXRoQ250eChleHByOiBzdHJpbmcsIGRlY2xhcmF0aW9uczogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0czogeyBba2V5OiBzdHJpbmddOiBhbnkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNDb250ZXh0OiBhbnkpOiBhbnlcbntcbiAgICBsZXQgZm5Cb2R5ID0gYCR7ZGVjbGFyYXRpb25zfVxcblxcdHJldHVybiAke2V4cHJ9XFxuLy8jIHNvdXJjZVVSTD1BcmliYUV4cHJlc3Npb25gO1xuICAgIGxldCBmbkFyZ05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBmbkFyZ1ZhbHVlczogYW55W10gPSBbXTtcbiAgICBmb3IgKGxldCBhcmdOYW1lIGluIGxldHMpIHtcbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwgYXJnTmFtZSkpIHtcbiAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChhcmdOYW1lKTtcbiAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2gobGV0c1thcmdOYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxldHMgaW5zdGFuY2VvZiBFeHRlbnNpYmxlKSB7XG4gICAgICAgIGxldCBleHRWYWx1ZXM6IEV4dGVuc2libGUgPSBsZXRzO1xuXG4gICAgICAgIGV4dFZhbHVlcy5leHRlbmRlZEZpZWxkcygpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGV4cHIsIGtleSkgJiZcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xICYmIFJlc2VydmVkS2V5d29yZC5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICBrZXkpID09PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICBmbkFyZ1ZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZm5BcmdOYW1lcy5wdXNoKCd0aGlzJyk7XG4gICAgLy8gZm5BcmdWYWx1ZXMucHVzaChsZXRzKTtcbiAgICBsZXQgZm4gPSBuZXcgRnVuY3Rpb24oLi4uZm5BcmdOYW1lcy5jb25jYXQoZm5Cb2R5KSk7XG4gICAgYXNzZXJ0KGlzUHJlc2VudChmbiksICdDYW5ub3QgZXZhbHVhdGUgZXhwcmVzc2lvbi4gRk4gaXMgbm90IGRlZmluZWQnKTtcbiAgICBsZXQgZm5Cb3VuZCA9IGZuLmJpbmQodGhpc0NvbnRleHQpO1xuXG4gICAgcmV0dXJuIGZuQm91bmQoLi4uZm5BcmdWYWx1ZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmltaXRpdmUob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuICFpc0pzT2JqZWN0KG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb25zdHJ1Y3Rvcih2YWx1ZTogT2JqZWN0LCB0eXBlOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlKHM6IHN0cmluZyk6IHN0cmluZ1xue1xuICAgIHJldHVybiBlbmNvZGVVUkkocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoczogc3RyaW5nKTogc3RyaW5nXG57XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvKFsuKis/Xj0hOiR7fSgpfFtcXF1cXC9cXFxcXSkvZywgJ1xcXFwkMScpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoQ29kZShzdHI6IHN0cmluZyk6IG51bWJlclxue1xuICAgIGxldCBoYXNoID0gMDtcbiAgICBsZXQgY2hhcjogbnVtYmVyO1xuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBoYXNoO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RWYWx1ZXMob2JqOiBhbnkpOiBhbnlbXVxue1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pO1xufVxuXG4vKipcbiAqXG4gKiBDb252ZXJ0cyBvYmplY3QgdG8gYSBuYW1lO1xuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdFRvTmFtZSh0YXJnZXQ6IGFueSk6IHN0cmluZ1xue1xuICAgIGlmIChpc0JsYW5rKHRhcmdldCkgfHwgKCFpc1N0cmluZ01hcCh0YXJnZXQpICYmICFpc1R5cGUodGFyZ2V0KSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCcgQ2Fubm90IGNvbnZlcnQuIFVrbm93biBvYmplY3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNUeXBlKHRhcmdldCkgPyB0YXJnZXQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWUgOiB0YXJnZXQuY29uc3RydWN0b3IubmFtZTtcbn1cblxuLyoqXG4gKlxuICogQmFzaWMgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgVVVJRCB0YWtlbiBmcm9tIFczQyBmcm9tIG9uZSBvZiB0aGUgZXhhbXBsZXNcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1dWlkKCk6IHN0cmluZ1xue1xuICAgIGxldCBkdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGxldCBwcm90byA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZyxcbiAgICAgICAgKGM6IHN0cmluZykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHIgPSAoZHQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xuICAgICAgICAgICAgZHQgPSBNYXRoLmZsb29yKGR0IC8gMTYpO1xuICAgICAgICAgICAgcmV0dXJuIChjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVjayBvYmplY3QgZXF1YWxpdHkgZGVyaXZlZCBmcm9tIGFuZ3VsYXIuZXF1YWxzIDEuNSBpbXBsZW1lbnRhdGlvblxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhvMTogYW55LCBvMjogYW55KTogYm9vbGVhblxue1xuICAgIGlmIChvMSA9PT0gbzIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvMSA9PT0gbnVsbCB8fCBvMiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAobzEgIT09IG8xICYmIG8yICE9PSBvMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gTmFOID09PSBOYU5cbiAgICB9XG5cbiAgICBsZXQgdDEgPSB0eXBlb2YgbzEsIHQyID0gdHlwZW9mIG8yLCBsZW5ndGg6IGFueSwga2V5OiBhbnksIGtleVNldDogYW55O1xuICAgIGlmICh0MSA9PT0gdDIgJiYgdDEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG8xKSkge1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KG8yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgobGVuZ3RoID0gbzEubGVuZ3RoKSA9PT0gbzIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgPSAwOyBrZXkgPCBsZW5ndGg7IGtleSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXF1YWxzKG8xW2tleV0sIG8yW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKG8xKSkge1xuICAgICAgICAgICAgaWYgKCFpc0RhdGUobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhvMS5nZXRUaW1lKCksIG8yLmdldFRpbWUoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNSZWdFeHAobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzUmVnRXhwKG8yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvMS50b1N0cmluZygpID09PSBvMi50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzV2luZG93KG8xKSB8fCBpc1dpbmRvdyhvMikgfHxcbiAgICAgICAgICAgICAgICBpc0FycmF5KG8yKSB8fCBpc0RhdGUobzIpIHx8IGlzUmVnRXhwKG8yKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlTZXQgPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcbiAgICAgICAgICAgIC8vIHVzaW5nIE9iamVjdC5rZXlzIGFzIGl0ZXJhdGluZyB0aHJ1IG9iamVjdCBzdG9wIHdvcmtpbmcgaW4gTkc2LCBUUzIuN1xuICAgICAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvMik7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleXNba2V5XS5jaGFyQXQoMCkgPT09ICckJyB8fCBpc0Z1bmN0aW9uKG8xW2tleXNba2V5XV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWVxdWFscyhvMVtrZXlzW2tleV1dLCBvMltrZXlzW2tleV1dKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleVNldC5zZXQoa2V5c1trZXldLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKG8yKTtcbiAgICAgICAgICAgIGZvciAoa2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIShrZXlTZXQuaGFzKGtleSkpICYmIGtleS5jaGFyQXQoMCkgIT09ICckJ1xuICAgICAgICAgICAgICAgICAgICAmJiBpc1ByZXNlbnQobzJba2V5XSkgJiYgIWlzRnVuY3Rpb24obzJba2V5XSkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5cbi8qKlxuICogdHJhbnNmb3JtIGEgc3RyaW5nIGludG8gZGVjYW1lbC4gZm9ybS4gTW9zdGx5IHVzZWQgd2hlbiByZWFkaW5nIGNsYXNzIG5hbWVzIG9yIGZpZWxkIG5hbWVzXG4gKiBzdWNoIGZpcnN0TmFtZSBhbmQgd2Ugd2FudCB0byBjcmVhdGUgYSBsYWJlbCBGaXJzdCBOYW1lXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2FtZWxpemUoc3RyaW5nOiBzdHJpbmcsIHNlcGFyYXRvcjogc3RyaW5nID0gJyAnLCBpbml0aWFsQ2FwczogYm9vbGVhbiA9IHRydWUpXG57XG4gICAgaWYgKGlzQmxhbmsoc3RyaW5nKSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgbGV0IGxhc3RVQ0luZGV4ID0gLTE7XG4gICAgbGV0IGFsbENhcHMgPSB0cnVlO1xuXG4gICAgbGV0IHNwbGl0T25VQyA9ICFTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKHN0cmluZywgJ18nKTtcbiAgICBsZXQgYnVmID0gJyc7XG4gICAgbGV0IGluV29yZCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gc3RyaW5nLmxlbmd0aDsgaW5Xb3JkIDwgaTsgKytpbldvcmQpIHtcbiAgICAgICAgbGV0IGMgPSBzdHJpbmdbaW5Xb3JkXTtcblxuICAgICAgICBpZiAoYy50b1VwcGVyQ2FzZSgpID09PSBjKSB7XG4gICAgICAgICAgICBpZiAoKGluV29yZCAtIDEpICE9PSBsYXN0VUNJbmRleCAmJiBzcGxpdE9uVUMpIHtcbiAgICAgICAgICAgICAgICBidWYgKz0gc2VwYXJhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdFVDSW5kZXggPSBpbldvcmQ7XG4gICAgICAgICAgICBpZiAoIWluaXRpYWxDYXBzKSB7XG4gICAgICAgICAgICAgICAgYyA9IGMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjLnRvTG93ZXJDYXNlKCkgPT09IGMpIHtcbiAgICAgICAgICAgIGlmIChpbldvcmQgPT09IDAgJiYgaW5pdGlhbENhcHMpIHtcbiAgICAgICAgICAgICAgICBjID0gYy50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWxsQ2FwcyA9IGZhbHNlO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoYyAhPT0gJ18nKSB7XG4gICAgICAgICAgICBjID0gc2VwYXJhdG9yO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZiArPSBjO1xuICAgIH1cblxuICAgIGlmIChhbGxDYXBzKSB7XG4gICAgICAgIGxldCB0b0NhcHMgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSBidWYubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2ggPSBidWZbaV07XG5cbiAgICAgICAgICAgIGlmIChjaC50b0xvd2VyQ2FzZSgpICE9PSBjaC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluV29yZCAmJiBjaCA9PT0gY2gudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBidWYgPSBidWYuc3Vic3RyKDAsIGkpICsgY2gudG9Mb3dlckNhc2UoKSArIGJ1Zi5zdWJzdHIoaSArIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b0NhcHMgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b0NhcHMgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYnVmO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub25Qcml2YXRlUHJlZml4KGlucHV0OiBzdHJpbmcpOiBzdHJpbmdcbntcbiAgICByZXR1cm4gaW5wdXRbMF0gPT09ICdfJyA/IFN0cmluZ1dyYXBwZXIuc3RyaXBMZWZ0KGlucHV0LCAnXycpIDogaW5wdXQ7XG59XG5cblxuLyoqXG4gKlxuICogVGhpcyBjb25zaWRlcnMgY3VycmVudGx5IG9ubHkgMSBmb3JtIHdoaWNoIHdoZW4gd2UgaGF2ZSBnZXR0ZXIgd2UgaGF2ZSB0aGlzIGZvcm0gZm9yXG4gKiBkZWNsYXJhdGlvbiBfPG5hbWU+IGFuZCBnZXQgPG5hbWU+KCkuIEkgZG8gbm90IGNoZWNrIGFueSBvdGhlciBmb3JtcyBub3cuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0dldHRlcihpbnN0YW5jZTogYW55LCBmaWVsZDogc3RyaW5nKTogYm9vbGVhblxue1xuICAgIGlmIChpc0JsYW5rKGZpZWxkKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIChmaWVsZFswXSA9PT0gJ18nICYmIGlzUHJlc2VudChub25Qcml2YXRlUHJlZml4KGZpZWxkKSkpO1xuXG59XG5cbi8qKlxuICogVGhlIEV4dGVuc2libGUgaW50ZXJmYWNlIGNhbiBiZSBpbXBsZW1lbnRlZCB3aGVuIGEgZ2l2ZW4gY2xhc3NcbiAqIHdhbnRzIHRvIHByb3ZpZGUgZHluYW1pY2FsbHkgYWRkZWQgZmllbGRzLiAgT25jZSB0aGlzIGlzIGltcGxlbWVudGVkXG4gKiB0byByZXR1cm4gYSBNYXAsIHRoZSBGaWVsZFZhbHVlIHN5c3RlbSB3aWxsIGJlIGFibGUgdG8gbG9vayBpblxuICogdGhlIE1hcCB0byBzZWUgaWYgdGhlIGRlc2lyZWQgZmllbGQgZXhpc3RzLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFeHRlbnNpYmxlXG57XG5cbiAgICAvKipcbiAgICAgKiAgUmV0dXJucyB0aGUgTWFwIGluIHdoaWNoIHRoZSBkeW5hbWljYWxseSBhZGRlZCBmaWVsZHMgcmVzaWRlLlxuICAgICAqXG4gICAgICovXG4gICAgZXh0ZW5kZWRGaWVsZHMoKTogTWFwPHN0cmluZywgYW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTtcbiAgICB9XG59XG5cbiIsIi8qKlxuICpcbiAqIEBvcmlnaW5hbC1saWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqXG4gKlxuICpcbiAqICBDcmVkaXQ6IERlcml2ZWQgYW5kIGV4dGVuZGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhciBpbiBvcmRlciB0byBoYXZlIHNldCBvZlxuICogIHJldXNhYmxlIGdsb2JhbHMuIFNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJIG5lZWQgdG8gaGF2ZSBhIGNvcHkgdW5kZXIgY29yZS5cbiAqL1xuaW1wb3J0ICogYXMgQ29sbGVjdGlvbnMgZnJvbSAndHlwZXNjcmlwdC1jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIGNsYXNzTmFtZSxcbiAgICBlcXVhbHMsXG4gICAgZ2V0U3ltYm9sSXRlcmF0b3IsXG4gICAgaXNBcnJheSxcbiAgICBpc0JsYW5rLFxuICAgIGlzSnNPYmplY3QsXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIFN0cmluZ0pvaW5lclxufSBmcm9tICcuL2xhbmcnO1xuXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVNYXBGcm9tTWFwOiB7IChtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55PiB9ID0gKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAobmV3IE1hcCg8YW55Pm5ldyBNYXAoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVNYXBGcm9tTWFwSW5uZXIobTogTWFwPGFueSwgYW55Pik6IE1hcDxhbnksIGFueT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWFwKDxhbnk+bSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlTWFwQW5kUG9wdWxhdGVGcm9tTWFwKG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+IHtcbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICBtYXAuc2V0KGssIHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9O1xufSkoKTtcbmV4cG9ydCBjb25zdCBfY2xlYXJWYWx1ZXM6IHsgKG06IE1hcDxhbnksIGFueT4pOiB2b2lkIH0gPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmICgoPGFueT4obmV3IE1hcCgpKS5rZXlzKCkpLm5leHQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9jbGVhclZhbHVlc0lubmVyKG06IE1hcDxhbnksIGFueT4pIHtcbiAgICAgICAgICAgIGxldCBrZXlJdGVyYXRvciA9IG0ua2V5cygpO1xuICAgICAgICAgICAgbGV0IGs6IGFueSAvKiogVE9ETyAjPz8/PyAqLztcbiAgICAgICAgICAgIHdoaWxlICghKChrID0gKDxhbnk+a2V5SXRlcmF0b3IpLm5leHQoKSkuZG9uZSkpIHtcbiAgICAgICAgICAgICAgICBtLnNldChrLnZhbHVlLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gX2NsZWFyVmFsdWVzV2l0aEZvcmVFYWNoKG06IE1hcDxhbnksIGFueT4pIHtcbiAgICAgICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICAgICAgICAgIG0uc2V0KGssIG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxufSkoKTtcblxuZXhwb3J0IGNsYXNzIE1hcFdyYXBwZXIge1xuXG4gICAgc3RhdGljIGNyZWF0ZUVtcHR5PEssIFY+KCk6IE1hcDxLLCBWPiB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwPEssIFY+KCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsb25lPEssIFY+KG06IE1hcDxLLCBWPik6IE1hcDxLLCBWPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobmV3IE1hcCg8YW55Pm5ldyBNYXAoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1hcDxLLCBWPig8YW55PiBtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB9XG4gICAgICAgIGxldCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICAgICAgbWFwLnNldChrLCB2KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUZyb21TdHJpbmdNYXA8VD4oc3RyaW5nTWFwOiB7IFtrZXk6IHN0cmluZ106IFQgfSk6IE1hcDxzdHJpbmcsIFQ+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBUPigpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3RyaW5nTWFwKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGtleSwgc3RyaW5nTWFwW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY3JlYXRlRnJvbUFueU1hcDxUPihzdHJpbmdNYXA6IHsgW2tleTogc3RyaW5nXTogVCB9KTogTWFwPGFueSwgVD4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcDxhbnksIFQ+KCk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzdHJpbmdNYXApIHtcbiAgICAgICAgICAgIHJlc3VsdC5zZXQoa2V5LCBzdHJpbmdNYXBba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjcmVhdGVGcm9tU3RyaW5nTWFwV2l0aFJlc29sdmU8VD4oc3RyaW5nTWFwOiB7IFtrZXk6IHN0cmluZ106IFQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmU6IChrZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYW55KSA9PiBhbnkpOiBNYXA8c3RyaW5nLCBUPiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHN0cmluZ01hcCkge1xuICAgICAgICAgICAgbGV0IHVwZGF0ZWRWYWx1ZSA9IHJlc29sdmUoa2V5LCBzdHJpbmdNYXBba2V5XSk7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGtleSwgdXBkYXRlZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyB0b1N0cmluZ01hcDxUPihtOiBNYXA8c3RyaW5nLCBUPik6IHsgW2tleTogc3RyaW5nXTogVCB9IHtcbiAgICAgICAgbGV0IHI6IHsgW2tleTogc3RyaW5nXTogVCB9ID0ge307XG4gICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4gcltrXSA9IHYpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9BbnlNYXA8VD4obTogTWFwPGFueSwgVD4pOiBhbnkge1xuICAgICAgICBsZXQgciA9IHt9O1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQobSkpIHtcbiAgICAgICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4gKDxhbnk+cilba10gPSB2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG5cblxuICAgIHN0YXRpYyB0b1N0cmluZyhtOiBNYXA8c3RyaW5nLCBhbnk+LCBpbm5lcjogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHNqID0gbmV3IFN0cmluZ0pvaW5lcihbJyddKTtcbiAgICAgICAgaWYgKCFpbm5lcikge1xuICAgICAgICAgICAgc2ouYWRkKCd7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh2IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgc2ouYWRkKE1hcFdyYXBwZXIudG9TdHJpbmcodiwgdHJ1ZSkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNqLmFkZChrKTtcbiAgICAgICAgICAgICAgICBzai5hZGQoJz0nKTtcbiAgICAgICAgICAgICAgICBzai5hZGQodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzai5hZGQoJywgJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaW5uZXIpIHtcbiAgICAgICAgICAgIHNqLmFkZCgnfSAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2oudG9TdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjbGVhclZhbHVlcyhtOiBNYXA8YW55LCBhbnk+KSB7XG4gICAgICAgIF9jbGVhclZhbHVlcyhtKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXRlcmFibGU8VD4obTogVCk6IFQge1xuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBtZXJnZU1hcEludG9NYXBXaXRoT2JqZWN0KGRlc3Q6IE1hcDxzdHJpbmcsIGFueT4sIHNvdXJjZTogTWFwPHN0cmluZywgYW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyd3JpdGVNaXNtYXRjaGVkOiBib29sZWFuKTogTWFwPHN0cmluZywgYW55PiB7XG5cbiAgICAgICAgbGV0IGtleXMgPSBBcnJheS5mcm9tKHNvdXJjZS5rZXlzKCkpO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICBsZXQgc291cmNlVmFsdWUgPSBzb3VyY2UuZ2V0KGtleSk7XG4gICAgICAgICAgICBsZXQgZGVzdFZhbHVlID0gZGVzdC5nZXQoa2V5KTtcblxuICAgICAgICAgICAgaWYgKGlzQmxhbmsoZGVzdFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgTGlzdFdyYXBwZXIuY29weVZhbHVlKHNvdXJjZVZhbHVlKSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlc3RWYWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiBzb3VyY2VWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuXG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LFxuICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLm1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNsb25lPHN0cmluZywgYW55PihkZXN0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlVmFsdWUsIG92ZXJ3cml0ZU1pc21hdGNoZWQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzdFZhbHVlIGluc3RhbmNlb2YgTWFwICYmIGlzQXJyYXkoc291cmNlVmFsdWUpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoTGlzdFdyYXBwZXIuYWxsRWxlbWVudHNBcmVTdHJpbmdzKHNvdXJjZVZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgTWFwV3JhcHBlci5tZXJnZU1hcEludG9NYXBXaXRoT2JqZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jbG9uZTxzdHJpbmcsIGFueT4oZGVzdFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY29udmVydExpc3RUb01hcChzb3VyY2VWYWx1ZSksIG92ZXJ3cml0ZU1pc21hdGNoZWQpXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc291cmNlVmVjdDogc3RyaW5nW10gPSBMaXN0V3JhcHBlci5jbG9uZTxhbnk+KHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkRWxlbWVudElmQWJzZW50PGFueT4oc291cmNlVmVjdCwgZGVzdFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGVzdFZhbHVlKSAmJiBzb3VyY2VWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKExpc3RXcmFwcGVyLmFsbEVsZW1lbnRzQXJlU3RyaW5ncyhkZXN0VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgTWFwV3JhcHBlci5tZXJnZU1hcEludG9NYXBXaXRoT2JqZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jb252ZXJ0TGlzdFRvTWFwKGRlc3RWYWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZU1pc21hdGNoZWQpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdG9kbzogY2FuIHdlIHJlYWxseSBtYXRjaCB0aGlzIHZhbHVlcyB3aXRoIGluZGV4T2ZcbiAgICAgICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkRWxlbWVudElmQWJzZW50PE1hcDxzdHJpbmcsIGFueT4+KGRlc3RWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY2xvbmU8c3RyaW5nLCBhbnk+KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVZhbHVlKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzdFZhbHVlIGluc3RhbmNlb2YgTWFwICYmIGlzU3RyaW5nKHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCBkZXN0VmFsdWVNYXAgPSBNYXBXcmFwcGVyLmNsb25lKGRlc3RWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNCbGFuayhkZXN0VmFsdWVNYXAuZ2V0KHNvdXJjZVZhbHVlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdFZhbHVlLnNldChzb3VyY2VWYWx1ZSwgTWFwV3JhcHBlci5jcmVhdGVFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGRlc3RWYWx1ZSkgJiYgc291cmNlVmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlSGFzaCA9IE1hcFdyYXBwZXIuY2xvbmUoc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKHNvdXJjZUhhc2guZ2V0KGRlc3RWYWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUhhc2guc2V0KGRlc3RWYWx1ZSwgTWFwV3JhcHBlci5jcmVhdGVFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VIYXNoKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGRlc3RWYWx1ZSkgJiYgaXNBcnJheShzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGRlc3RWYWx1ZSkgJiYgaXNTdHJpbmcoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkRWxlbWVudElmQWJzZW50KGRlc3RWYWx1ZSwgc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGRlc3RWYWx1ZSkgJiYgaXNBcnJheShzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlVmVjdDogc3RyaW5nW10gPSBMaXN0V3JhcHBlci5jbG9uZTxzdHJpbmc+KHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRJZkFic2VudChzb3VyY2VWZWN0LCBkZXN0VmFsdWUpO1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZGVzdFZhbHVlKSAmJiBpc1N0cmluZyhzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvdmVyd3JpdGVNaXNtYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBkZXN0Q2xhc3MgPSBjbGFzc05hbWUoZGVzdFZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlQ2xhc3MgPSBjbGFzc05hbWUoc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRlc3RDbGFzcyA9PT0gc291cmNlQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH1cblxuICAgIHN0YXRpYyBjb252ZXJ0TGlzdFRvTWFwKGtleXM6IHN0cmluZ1tdKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1hcC5zZXQoa2V5c1tpXSwgTWFwV3JhcHBlci5jcmVhdGVFbXB0eTxzdHJpbmcsIGFueT4oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ3JvdXBCeTxLPihpdGVtczogYW55LCBncm91cEJ5S2V5OiAoaXRlbTogSykgPT4gc3RyaW5nKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBpdGVtcy5yZWR1Y2UoKGdyb3VwUmVzdWx0OiBhbnksIGN1cnJlbnRWYWx1ZTogYW55KSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBnS2V5ID0gZ3JvdXBCeUtleShjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgKGdyb3VwUmVzdWx0W2dLZXldID0gZ3JvdXBSZXN1bHRbZ0tleV0gfHwgW10pLnB1c2goY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBncm91cFJlc3VsdDtcbiAgICAgICAgfSwge30pO1xuXG5cbiAgICAgICAgbGV0IGdyb3VwZWQ6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgZ3JvdXBlZC5zZXQoa2V5LCByZXN1bHRba2V5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ3JvdXBlZDtcbiAgICB9XG59XG5cbi8qKlxuICogV3JhcHMgSmF2YXNjcmlwdCBPYmplY3RzXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHJpbmdNYXBXcmFwcGVyIHtcbiAgICBzdGF0aWMgY3JlYXRlKCk6IHsgW2s6IC8qYW55Ki8gc3RyaW5nXTogYW55IH0ge1xuICAgICAgICAvLyBOb3RlOiBXZSBhcmUgbm90IHVzaW5nIE9iamVjdC5jcmVhdGUobnVsbCkgaGVyZSBkdWUgdG9cbiAgICAgICAgLy8gcGVyZm9ybWFuY2UhXG4gICAgICAgIC8vIGh0dHA6Ly9qc3BlcmYuY29tL25nMi1vYmplY3QtY3JlYXRlLW51bGxcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWlucyhtYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBtYXAuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0PFY+KG1hcDogeyBba2V5OiBzdHJpbmddOiBWIH0sIGtleTogc3RyaW5nKTogViB7XG4gICAgICAgIHJldHVybiBtYXAuaGFzT3duUHJvcGVydHkoa2V5KSA/IG1hcFtrZXldIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQ8Vj4obWFwOiB7IFtrZXk6IHN0cmluZ106IFYgfSwga2V5OiBzdHJpbmcsIHZhbHVlOiBWKSB7XG4gICAgICAgIG1hcFtrZXldID0gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgaXNFbXB0eShtYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBtYXApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVsZXRlKG1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwga2V5OiBzdHJpbmcpIHtcbiAgICAgICAgZGVsZXRlIG1hcFtrZXldO1xuICAgIH1cblxuICAgIHN0YXRpYyBmb3JFYWNoPEssIFY+KG1hcDogeyBba2V5OiBzdHJpbmddOiBWIH0sIGNhbGxiYWNrOiAodjogViwgSzogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgICAgIGZvciAobGV0IGsgb2YgT2JqZWN0LmtleXMobWFwKSkge1xuICAgICAgICAgICAgY2FsbGJhY2sobWFwW2tdLCBrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBtZXJnZTxWPihtMTogeyBba2V5OiBzdHJpbmddOiBWIH0sIG0yOiB7IFtrZXk6IHN0cmluZ106IFYgfSk6IHsgW2tleTogc3RyaW5nXTogViB9IHtcbiAgICAgICAgbGV0IG06IHsgW2tleTogc3RyaW5nXTogViB9ID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyhtMSkpIHtcbiAgICAgICAgICAgIG1ba10gPSBtMVtrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGsgb2YgT2JqZWN0LmtleXMobTIpKSB7XG4gICAgICAgICAgICBtW2tdID0gbTJba107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzPFY+KG0xOiB7IFtrZXk6IHN0cmluZ106IFYgfSwgbTI6IHsgW2tleTogc3RyaW5nXTogViB9KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBrMSA9IE9iamVjdC5rZXlzKG0xKTtcbiAgICAgICAgbGV0IGsyID0gT2JqZWN0LmtleXMobTIpO1xuICAgICAgICBpZiAoazEubGVuZ3RoICE9PSBrMi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQga2V5OiBhbnkgLyoqIFRPRE8gIz8/Pz8gKi87XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgazEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGtleSA9IGsxW2ldO1xuICAgICAgICAgICAgaWYgKG0xW2tleV0gIT09IG0yW2tleV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQSBib29sZWFuLXZhbHVlZCBmdW5jdGlvbiBvdmVyIGEgdmFsdWUsIHBvc3NpYmx5IGluY2x1ZGluZyBjb250ZXh0IGluZm9ybWF0aW9uXG4gKiByZWdhcmRpbmcgdGhhdCB2YWx1ZSdzIHBvc2l0aW9uIGluIGFuIGFycmF5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByZWRpY2F0ZTxUPiB7XG4gICAgKHZhbHVlOiBULCBpbmRleD86IG51bWJlciwgYXJyYXk/OiBUW10pOiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgTGlzdFdyYXBwZXIge1xuICAgIC8vIEpTIGhhcyBubyB3YXkgdG8gZXhwcmVzcyBhIHN0YXRpY2FsbHkgZml4ZWQgc2l6ZSBsaXN0LCBidXQgZGFydCBkb2VzIHNvIHdlXG4gICAgLy8ga2VlcCBib3RoIG1ldGhvZHMuXG4gICAgc3RhdGljIGNyZWF0ZUZpeGVkU2l6ZShzaXplOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUdyb3dhYmxlU2l6ZShzaXplOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsb25lPFQ+KGFycmF5OiBUW10pOiBUW10ge1xuICAgICAgICByZXR1cm4gYXJyYXkuc2xpY2UoMCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZvckVhY2hXaXRoSW5kZXg8VD4oYXJyYXk6IFRbXSwgZm46ICh0OiBULCBuOiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm4oYXJyYXlbaV0sIGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGZpcnN0PFQ+KGFycmF5OiBUW10pOiBUIHtcbiAgICAgICAgaWYgKCFhcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbGFzdDxUPihhcnJheTogVFtdKTogVCB7XG4gICAgICAgIGlmICghYXJyYXkgfHwgYXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgc3RhdGljIGluZGV4T2Y8VD4oYXJyYXk6IFRbXSwgdmFsdWU6IFQsIHN0YXJ0SW5kZXg6IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSwgc3RhcnRJbmRleCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5zPFQ+KGxpc3Q6IFRbXSwgZWw6IFQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihlbCkgIT09IC0xO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNvbnRhaW5zQWxsPFQ+KGxpc3Q6IFRbXSwgZWxzOiBUW10pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGVscy5tYXAoZnVuY3Rpb24gKG5lZWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihuZWVkbGUpO1xuICAgICAgICB9KS5pbmRleE9mKC0xKSA9PT0gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5zQ29tcGxleChsaXN0OiBBcnJheTxhbnk+LCBpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuZmluZEluZGV4KGVsID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcXVhbHMoZWwsIGl0ZW0pO1xuICAgICAgICB9KSA+IC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyBmaW5kSW5kZXhDb21wbGV4KGxpc3Q6IEFycmF5PGFueT4sIGl0ZW06IGFueSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbGlzdC5maW5kSW5kZXgoZWwgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhlbCwgaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyByZW1vdmVJZkV4aXN0KGxpc3Q6IEFycmF5PGFueT4sIGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IGxpc3QuZmluZEluZGV4KGVsID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcXVhbHMoZWwsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlQXQ8YW55PihsaXN0LCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcmV2ZXJzZWQ8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XG4gICAgICAgIGxldCBhID0gTGlzdFdyYXBwZXIuY2xvbmUoYXJyYXkpO1xuICAgICAgICByZXR1cm4gYS5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbmNhdChhOiBhbnlbXSwgYjogYW55W10pOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0PFQ+KGxpc3Q6IFRbXSwgaW5kZXg6IG51bWJlciwgdmFsdWU6IFQpIHtcbiAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDAsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlQXQ8VD4obGlzdDogVFtdLCBpbmRleDogbnVtYmVyKTogVCB7XG4gICAgICAgIGxldCByZXMgPSBsaXN0W2luZGV4XTtcbiAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVBbGw8VD4obGlzdDogVFtdLCBpdGVtczogVFtdKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGxpc3QuaW5kZXhPZihpdGVtc1tpXSk7XG4gICAgICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlPFQ+KGxpc3Q6IFRbXSwgZWw6IFQpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGluZGV4ID0gbGlzdC5pbmRleE9mKGVsKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlTGFzdDxUPihhcnJheTogVFtdKTogdm9pZCB7XG4gICAgICAgIGlmICghYXJyYXkgfHwgYXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBhcnJheS5zcGxpY2UoYXJyYXkubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY2xlYXIobGlzdDogYW55W10pIHtcbiAgICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0VtcHR5KGxpc3Q6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBsaXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmlsbChsaXN0OiBhbnlbXSwgdmFsdWU6IGFueSwgc3RhcnQ6IG51bWJlciA9IDAsIGVuZDogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICBsaXN0LmZpbGwodmFsdWUsIHN0YXJ0LCBlbmQgPT09IG51bGwgPyBsaXN0Lmxlbmd0aCA6IGVuZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFscyhhOiBhbnlbXSwgYjogYW55W10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIHNsaWNlPFQ+KGw6IFRbXSwgZnJvbTogbnVtYmVyID0gMCwgdG86IG51bWJlciA9IG51bGwpOiBUW10ge1xuICAgICAgICByZXR1cm4gbC5zbGljZShmcm9tLCB0byA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHRvKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3BsaWNlPFQ+KGw6IFRbXSwgZnJvbTogbnVtYmVyLCBsZW5ndGg6IG51bWJlcik6IFRbXSB7XG4gICAgICAgIHJldHVybiBsLnNwbGljZShmcm9tLCBsZW5ndGgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzb3J0PFQ+KGw6IFRbXSwgY29tcGFyZUZuPzogKGE6IFQsIGI6IFQpID0+IG51bWJlcikge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGNvbXBhcmVGbikpIHtcbiAgICAgICAgICAgIGwuc29ydChjb21wYXJlRm4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbC5zb3J0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBzb3J0QnlFeGFtcGxlKHRvU29ydDogc3RyaW5nW10sIHBhdHRlcm46IHN0cmluZ1tdKSB7XG4gICAgICAgIHRvU29ydC5zb3J0KChhOiBzdHJpbmcsIGI6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4QSA9IHBhdHRlcm4uaW5kZXhPZihhKSA9PT0gLTEgPyAxMCA6IHBhdHRlcm4uaW5kZXhPZihhKTtcbiAgICAgICAgICAgIGxldCBpbmRleEIgPSBwYXR0ZXJuLmluZGV4T2YoYikgPT09IC0xID8gMTAgOiBwYXR0ZXJuLmluZGV4T2YoYik7XG5cbiAgICAgICAgICAgIHJldHVybiBpbmRleEEgLSBpbmRleEI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b1N0cmluZzxUPihsOiBUW10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgb3V0ID0gJyc7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbCkge1xuICAgICAgICAgICAgb3V0ICs9IGl0ZW0udG9TdHJpbmcoKSArICcsICAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvSlNPTjxUPihsOiBUW10pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG1heGltdW08VD4obGlzdDogVFtdLCBwcmVkaWNhdGU6ICh0OiBUKSA9PiBudW1iZXIpOiBUIHtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc29sdXRpb246IGFueSAvKiogVE9ETyAjPz8/PyAqLyA9IG51bGw7XG4gICAgICAgIGxldCBtYXhWYWx1ZSA9IC1JbmZpbml0eTtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlID0gbGlzdFtpbmRleF07XG4gICAgICAgICAgICBpZiAoaXNCbGFuayhjYW5kaWRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlVmFsdWUgPSBwcmVkaWNhdGUoY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGVWYWx1ZSA+IG1heFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc29sdXRpb24gPSBjYW5kaWRhdGU7XG4gICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBjYW5kaWRhdGVWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc29sdXRpb247XG4gICAgfVxuXG4gICAgc3RhdGljIGZsYXR0ZW48VD4obGlzdDogQXJyYXk8VCB8IFRbXT4pOiBUW10ge1xuICAgICAgICBsZXQgdGFyZ2V0OiBhbnlbXSA9IFtdO1xuICAgICAgICBfZmxhdHRlbkFycmF5KGxpc3QsIHRhcmdldCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgYWxsRWxlbWVudHNBcmVTdHJpbmdzPFQ+KGxpc3Q6IEFycmF5PFQgfCBUW10+KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB0YXJnZXQ6IGFueVtdID0gTGlzdFdyYXBwZXIuZmxhdHRlbihsaXN0KTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICghaXNTdHJpbmcoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkQWxsPFQ+KGxpc3Q6IEFycmF5PFQ+LCBzb3VyY2U6IEFycmF5PFQ+KTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goc291cmNlW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRvZG86IGNoZWNrIGlmIHRoaXMgaGFuZGxlcyBvYmplY3RzIHdpdGggY29udGFpbnNcbiAgICBzdGF0aWMgYWRkRWxlbWVudElmQWJzZW50PFQ+KGxpc3Q6IEFycmF5PFQ+LCBlbGVtZW50OiBUKTogdm9pZCB7XG5cbiAgICAgICAgbGV0IGNvbnRhaW5zID0gQ29sbGVjdGlvbnMuYXJyYXlzLmNvbnRhaW5zKGxpc3QsIGVsZW1lbnQsIChpdGVtMTogYW55LCBpdGVtMjogYW55KSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChpdGVtMVsnZXF1YWxzVG8nXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtMVsnZXF1YWxzVG8nXShpdGVtMik7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtMSA9PT0gaXRlbTI7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWNvbnRhaW5zKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBhZGRFbGVtZW50c0lmQWJzZW50PFQ+KGxpc3Q6IEFycmF5PFQ+LCBlbGVtZW50czogVFtdKTogdm9pZCB7XG5cblxuICAgICAgICBpZiAoaXNCbGFuayhlbGVtZW50cykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGVsZW0gb2YgZWxlbWVudHMpIHtcblxuICAgICAgICAgICAgbGV0IGNvbnRhaW5zID0gQ29sbGVjdGlvbnMuYXJyYXlzLmNvbnRhaW5zKGxpc3QsIGVsZW0sIChpdGVtMTogYW55LCBpdGVtMjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0xWydlcXVhbHNUbyddICYmIGl0ZW0yWydlcXVhbHNUbyddKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtMVsnZXF1YWxzVG8nXShpdGVtMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtMSA9PT0gaXRlbTI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY29udGFpbnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBjb3B5VmFsdWU8VD4odmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hcFdyYXBwZXIuY2xvbmUodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIuY2xvbmUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIF9mbGF0dGVuQXJyYXkoc291cmNlOiBhbnlbXSwgdGFyZ2V0OiBhbnlbXSk6IGFueVtdIHtcbiAgICBpZiAoaXNQcmVzZW50KHNvdXJjZSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc291cmNlW2ldO1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBfZmxhdHRlbkFycmF5KGl0ZW0sIHRhcmdldCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlzdExpa2VJdGVyYWJsZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNKc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSB8fFxuICAgICAgICAoIShvYmogaW5zdGFuY2VvZiBNYXApICYmICAgICAgLy8gSlMgTWFwIGFyZSBpdGVyYWJsZXMgYnV0IHJldHVybiBlbnRyaWVzIGFzIFtrLCB2XVxuICAgICAgICAgICAgZ2V0U3ltYm9sSXRlcmF0b3IoKSBpbiBvYmopOyAgLy8gSlMgSXRlcmFibGUgaGF2ZSBhIFN5bWJvbC5pdGVyYXRvciBwcm9wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmVJdGVyYWJsZXNFcXVhbChhOiBhbnksIGI6IGFueSwgY29tcGFyYXRvcjogRnVuY3Rpb24pOiBib29sZWFuIHtcbiAgICBsZXQgaXRlcmF0b3IxID0gYVtnZXRTeW1ib2xJdGVyYXRvcigpXSgpO1xuICAgIGxldCBpdGVyYXRvcjIgPSBiW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBsZXQgaXRlbTEgPSBpdGVyYXRvcjEubmV4dCgpO1xuICAgICAgICBsZXQgaXRlbTIgPSBpdGVyYXRvcjIubmV4dCgpO1xuICAgICAgICBpZiAoaXRlbTEuZG9uZSAmJiBpdGVtMi5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbTEuZG9uZSB8fCBpdGVtMi5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb21wYXJhdG9yKGl0ZW0xLnZhbHVlLCBpdGVtMi52YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGl0ZXJhdGVMaXN0TGlrZShvYmo6IGFueSwgZm46IEZ1bmN0aW9uKSB7XG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm4ob2JqW2ldKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBpdGVyYXRvciA9IG9ialtnZXRTeW1ib2xJdGVyYXRvcigpXSgpO1xuICAgICAgICBsZXQgaXRlbTogYW55IC8qKiBUT0RPICM/Pz8/ICovO1xuICAgICAgICB3aGlsZSAoISgoaXRlbSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkpIHtcbiAgICAgICAgICAgIGZuKGl0ZW0udmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTGFzdDxUPihhcnI6IFRbXSwgY29uZGl0aW9uOiAodmFsdWU6IFQpID0+IGJvb2xlYW4pOiBUIHwgbnVsbCB7XG4gICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoY29uZGl0aW9uKGFycltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbi8vIFNhZmFyaSBhbmQgSW50ZXJuZXQgRXhwbG9yZXIgZG8gbm90IHN1cHBvcnQgdGhlIGl0ZXJhYmxlIHBhcmFtZXRlciB0byB0aGVcbi8vIFNldCBjb25zdHJ1Y3Rvci4gIFdlIHdvcmsgYXJvdW5kIHRoYXQgYnkgbWFudWFsbHkgYWRkaW5nIHRoZSBpdGVtcy5cbmxldCBjcmVhdGVTZXRGcm9tTGlzdDogeyAobHN0OiBhbnlbXSk6IFNldDxhbnk+IH0gPSAoZnVuY3Rpb24gKCkge1xuICAgIGxldCB0ZXN0ID0gbmV3IFNldChbMSwgMiwgM10pO1xuICAgIGlmICh0ZXN0LnNpemUgPT09IDMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVNldEZyb21MaXN0SW5uZXIobHN0OiBhbnlbXSk6IFNldDxhbnk+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KGxzdCk7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVNldEFuZFBvcHVsYXRlRnJvbUxpc3QobHN0OiBhbnlbXSk6IFNldDxhbnk+IHtcbiAgICAgICAgICAgIGxldCByZXMgPSBuZXcgU2V0KGxzdCk7XG4gICAgICAgICAgICBpZiAocmVzLnNpemUgIT09IGxzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByZXMuYWRkKGxzdFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCb29sZWFuV3JhcHBlciwgaXNQcmVzZW50LCBOdW1iZXJXcmFwcGVyLCByZWFkR2xvYmFsUGFyYW19IGZyb20gJy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtNYXBXcmFwcGVyfSBmcm9tICcuLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuXG5cbi8qKlxuICogU2luY2Ugb24gZW50ZXJwcmlzZSBsZXZlbCB3ZSBuZWVkIHRvIHN1cHBvcnQgYWxsIGF2YWlsYWJsZSBsb2NhbGVzIGFzIHVzZXIgbWlnaHQgY2hhbmdlXG4gKiB0byBkaWZmZXJlbnQgbGFuZyBhbnl0aW1lIHdlIG5lZWQgdG8gaW1wb3J0IGFsbCBleHBlY3RlZCBsb2NhbGVzIHRoYXQgd2Ugd2FudCB0byBzdXBwb3J0LlxuICpcbiAqIE5vdGU6ICBSZW1lbWJlciB3aGVuIHlvdSB3YW50IHRvIHN1cHBvcnQgbW9yZSBsb2NhbGVzIHlvdSBuZWVkIHRvIGltcG9ydCB0aGVtIGFuZCByZWdpc3RlclxuICogdGhlbSB1c2luZyByZWdpc3RlckxvY2FsZURhdGFcbiAqL1xuZXhwb3J0IGNvbnN0IEFwcENvbmZpZ1Rva2VuID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ0FwcC5Db25maWcnKTtcblxuY29uc3QgU3Vwb3J0ZWRMYW5ndWFnZXMgPSBbJ2VuJywgJ2ZyJ107XG5cblxuLyoqXG4gKiBTaW1wbGUgQ29uZmlndXJhdGlvbiBpbXBsZW1lbnRhdGlvbiAgd2hpY2ggbGV0IHVzIGNvbmZpZ3VyZSBhcHBsaWNhdGlvbiBkdXJpbmcgYSBib290c3RyYXBcbiAqIHBoYXNlLiBZb3UgY2FuIHBhc3MgdmFsdWVzIGluIDMgZGlmZmVyZW50IHdheXNcbiAqXG4gKiAxKSBVc2luZyBpbXBvcnQgLSBhdCB0aGUgdGltZSB5b3UgaW1wb3J0IHlvdXIgbW9kdWxlXG4gKiAyKSBpbmplY3RlZCBhcyBzZXJ2aWNlIGFuZCB5b3UgY2FuIHNldCB2YWx1ZXNcbiAqIDMpIEZyb20gU2NyaXB0IHRhZyBvciBnbG9iYWxseSBkZWZpbmVkIFZBUiBkdXJpbmcgYSBkZXBsb3ltZW50XG4gKlxuICpcbiAqIFRoZXJlIGlzIGFsc28gZnJvbSBVUkwgb3B0aW9uIHRoYXQgaXMgZm9yIG5vdyB0ZW1wb3JhcnkgZGlzYWJsZWQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQXBwQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIG5vdCByZWd1bGFyIGVudi4gcGFyYW0gd2UgdXNlIHRoaXMgdG8gcXVlcnkgZ2xvYmFsIHZhciB0aGF0IGNhbiBiZSBhdHRhY2hlZCB0b1xuICAgICAqIHdpbmRvdyB0byByZWFkIGVudi4gc2V0dGluZ3MgdGhhdCBjYW4gYmUgaW5qZWN0ZWQgYnkgc2VydmVyXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgQXBwQ29uZmlnR2xvYmFsVmFyID0gJ0FwcENvbmZpZ0dsb2JhbCc7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgSXNEZXZNb2RlID0gJ2Rldm1vZGUuZW5hYmxlZCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFVzZXJBZ2VudCA9ICd1c2VyYWdlbnQnO1xuICAgIHN0YXRpYyByZWFkb25seSBMYW5nID0gJ2xhbmcnO1xuICAgIHN0YXRpYyByZWFkb25seSBTdXBwb3J0ZWRMYW5ncyA9ICdzdXBwb3J0ZWRsYW5nJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgRGlyZWN0aW9uID0gJ2Rpcic7XG4gICAgc3RhdGljIHJlYWRvbmx5IE5hdlBsYXRmb3JtID0gJ3BsYXRmb3JtJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgaTE4bkVuYWJsZWQgPSAnaTE4bi5lbmFibGVkJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQXBwVGl0bGUgPSAnYXBwLnRpdGxlJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgUmVzdEFwaUNvbnRleHRVcmwgPSAncmVzdGFwaS5jb250ZXh0JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgUmVzdEFwaUhvc3RVcmwgPSAncmVzdGFwaS5ob3N0JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29udGVudFR5cGUgPSAnY29udGVudC10eXBlJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvblJldHJ5SW50ZXJ2YWwgPSAnY29ubmVjdGlvbi5yZXRyeSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25BYm9ydFRpbWVvdXQgPSAnY29ubmVjdGlvbi5hYm9ydC10aW1lb3V0JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvblVzZU1vY2tTZXJ2ZXIgPSAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5lbmFibGVkJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvbk1vY2tTZXJ2ZXJQYXRoID0gJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIucGF0aCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25Nb2NrU2VydmVyUm91dGVzID0gJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIucm91dGVzJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgRG9tYWluVW5pcXVlTmFtZSA9ICdkb21haW4udW5pcXVlbmFtZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IERvbWFpblF1ZXJ5ID0gJ2RvbWFpbi51bmlxdWVuYW1lJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQXNzZXRGb2xkZXIgPSAnYXNzZXQtZm9sZGVyJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgSW5UZXN0ID0gJ2Vudi50ZXN0JztcblxuICAgIC8qKlxuICAgICAqIFNpbmNlIHdlIHVuYWJsZSB0byBjaGFuZ2UgYW5kIHNpbXVsYXRlIFVSTCBkdXJpbmcgbmcgdGVzdCBidXQgc3RpbGwgd2UgbmVlZCB0byBiZSBhYmxlIHRvXG4gICAgICogdGVzdCB0aGlzIFVSTCBwYXJzaW5nIGxvZ2ljIHRoZW4ganVzdCBmb3IgYSBUZXN0IHB1cnBvc2VzIHRoaXMgYGVudi50ZXN0LnVybGAgcHJvcGVydHlcbiAgICAgKiB3aWxsIGJlIHVzZWQgdG8gcGFzcyB1cmwgZHVyaW5nIGEgdGVzdC5cbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgSW5UZXN0VXJsID0gJ2Vudi50ZXN0LnVybCc7XG5cbiAgICBwcml2YXRlIHZhbHVlczogTWFwPHN0cmluZywgYW55PjtcbiAgICAvLyBwcml2YXRlIHF1ZXJ5VmFsdWVzOiBNYXA8c3RyaW5nLCAgYW55PjtcblxuXG4gICAgdGVzdFVybDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGluamVjdG9yOiBJbmplY3RvciwgcHVibGljIGVudmlyb25tZW50OiBFbnZpcm9ubWVudCkge1xuICAgICAgICAvLyB3ZSBleHBlY3QgdGhlcmUgd2lsbCBiZSBhbHdheXMgd2luZG93IGF2YWlsYWJsZS5cbiAgICAgICAgdGhpcy52YWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICAvLyB0aGlzLnF1ZXJ5VmFsdWVzID0gbmV3IE1hcDxzdHJpbmcsICBhbnk+KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENhbGxlZCBieSBmYWN0b3J5IG1ldGhvZCB0byBpbml0aWFsaXplIHRoaXMgY29uZmlnIGNsYXNzXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KGNvbmZpZzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xuICAgICAgICB0aGlzLmluaXREZWZhdWx0cygpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGNvbmZpZykpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZXM6IE1hcDxzdHJpbmcsIGFueT4gPSBNYXBXcmFwcGVyLmNyZWF0ZUZyb21TdHJpbmdNYXA8YW55Pihjb25maWcpO1xuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PiB0aGlzLnNldChrLCB2KSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVudmlyb25tZW50LnNldFZhbHVlKEFwcENvbmZpZy5Bc3NldEZvbGRlciwgdGhpcy5nZXQoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyKSk7XG5cbiAgICAgICAgbGV0IGxvY2F0aW9uOiBhbnkgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICBpZiAodGhpcy5lbnZpcm9ubWVudC5pblRlc3QpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gdGhpcy5nZXQoQXBwQ29uZmlnLkluVGVzdFVybCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAoaXNQcmVzZW50KGxvY2F0aW9uKSkge1xuICAgICAgICAvLyAgICAgdGhpcy5wYXJzZVF1ZXJ5UGFybXMobG9jYXRpb24pO1xuICAgICAgICAvLyB9XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIHJlYWQgZ2xvYmFsbHkgaW5zZXJ0ZWQgc2NyaXB0cyB0byBpbml0aWFsaXplIGFwcGxpY2F0aW9uIGZyb20gdGhlIHNlcnZlciBzaWRlLlxuICAgICAqIFRoZSBzY3JpcHQgY2FuIGRpcmVjdGx5IGRlY2xhcmUgdGhlIHZhcmlhYmxlcyA6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICAgPHNjcmlwdD5cbiAgICAgKiAgICAgIHZhciBBcHBDb25maWdHbG9iYWwgPSB7XG4gICAgICogICAgICAgICAgICAgICAnYXBwLnBybzEnOiAndmFsdWUxJyxcbiAgICAgKiAgICAgICAgICAgICAgICdhcHAucHJvMic6ICd2YWx1ZTInLFxuICAgICAqICAgICAgICAgICAgICAgJ2xhbmcnOiAnY2gnXG4gICAgICogICAgICB9O1xuICAgICAqICA8L3NjcmlwdD5cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICAgb3IgaXQgY2FuIGJlIGluY2x1ZGVkIG9uIHRoZSBpbmRleC5odG1sIHBhZ2UgZHVyaW5nIGJ1aWxkIHRpbWUuXG4gICAgICpcbiAgICAgKiAgIFdlIGV4cGVjdCB0aGF0IHdpbGwgZmluZCB0aGUgYEFwcENvbmZpZ0dsb2JhbGBcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcGFyc2VHbG9iYWxQYXJhbXMoKTogdm9pZCB7XG4gICAgICAgIGxldCBnbG9iYWxDb25maWc6IHsgW25hbWU6IHN0cmluZ106IGFueSB9ID0gcmVhZEdsb2JhbFBhcmFtKEFwcENvbmZpZy5BcHBDb25maWdHbG9iYWxWYXIpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGdsb2JhbENvbmZpZykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBnbG9iYWxDb25maWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcy5zZXQoa2V5LnRvTG93ZXJDYXNlKCksIGdsb2JhbENvbmZpZ1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZXMgdG8gY29uZmlndXJhdGlvbi4gdG8gbWFrZSBzdXJlIHdlIHdpbGwgbm90IHJ1biBpbnRvIGNhc2Utc2Vuc2l0aXZlIHByb2JsZW1zIHdlXG4gICAgICogYXJlIGNvbnZlcnRpbmcgYWxsIGtleXMgaW50byBsb3dlcmNhc2VcbiAgICAgKlxuICAgICAqL1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlcy5zZXQoa2V5LnRvTG93ZXJDYXNlKCksIHZhbHVlKTtcblxuICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09IEFwcENvbmZpZy5JblRlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnQuaW5UZXN0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWVzIHRvIGNvbmZpZ3VyYXRpb25cbiAgICAgKiB0b2RvOiBkb250IGRvIGFsbCB0aGlzIHdpdGggdGhpcyBoYWNreSB3YXkuIGp1c3QgaWYgeW91IG5lZWQgdG8gY2hlY2sgY2FzZSBzZW5zaXRpdml0eSwgdGhlblxuICAgICAqIHNpbXBseSBtYXAga2V5cyBmcm9tIHRoaXMudmFsdWVzIGludG8gbG93ZXJjYXNlIGFuZCB0aGVuIGNoZWNrIGlmIGl0IGhhcyBhIGtleVxuICAgICAqL1xuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlcy5oYXMoa2V5LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMuZ2V0KGtleS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIGdldE51bWJlcihrZXk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmdldChrZXkpO1xuICAgICAgICByZXR1cm4gTnVtYmVyV3JhcHBlci5wYXJzZUludEF1dG9SYWRpeCh2YWwpO1xuICAgIH1cblxuXG4gICAgZ2V0Qm9vbGVhbihrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKHZhbCk7XG4gICAgfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICpcbiAgICAvLyAgKiBDYWxsZWQgZHVyaW5nIGluc3RhbnRpYXRpb24gYW5kIGl0IHJlYWQgcXVlcnkgcGFyYW1zIGlmIGFueSBhbmQgdXNlIHRoZW0gYXNcbiAgICAvLyBjb25maWd1cmF0aW9uLlxuICAgIC8vICAqIFdlIG1pZ2h0IHdhbnQgdG8gZm9yY2UgdG8gcHJlZml4IGVhY2ggcGFyYW0gd2l0aCBlbnYuIHRvIG1ha2Ugc3VyZSB3ZSBkbyBub3Qgc3RvcmVcbiAgICAvLyBldmVyeXRoaW5nICogKi8gcHJpdmF0ZSBwYXJzZVF1ZXJ5UGFybXModXJsOiBzdHJpbmcpIHsgIGxldCB1cmxTZXJpYWxpemVyID0gbmV3XG4gICAgLy8gRGVmYXVsdFVybFNlcmlhbGl6ZXIoKTsgbGV0IHVybFRyZWUgPSB1cmxTZXJpYWxpemVyLnBhcnNlKHVybCk7ICBpZlxuICAgIC8vIChpc1ByZXNlbnQodXJsVHJlZS5xdWVyeVBhcmFtcykpIHsgIGZvciAobGV0IGtleSBpbiB1cmxUcmVlLnF1ZXJ5UGFyYW1zKSB7XG4gICAgLy8gdGhpcy5xdWVyeVZhbHVlcy5zZXQoa2V5LnRvTG93ZXJDYXNlKCksIHVybFRyZWUucXVlcnlQYXJhbXNba2V5XSk7IH0gfSB9XG5cbiAgICBwcml2YXRlIGluaXREZWZhdWx0cygpIHtcblxuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuSXNEZXZNb2RlLCBpc0Rldk1vZGUoKSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Vc2VyQWdlbnQsIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkRpcmVjdGlvbiwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRpcik7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5OYXZQbGF0Zm9ybSwgd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db250ZW50VHlwZSwgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25SZXRyeUludGVydmFsLCA1MDApO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvblVzZU1vY2tTZXJ2ZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25Nb2NrU2VydmVyUGF0aCwgJy9tb2NrLXJvdXRpbmcnKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLmkxOG5FbmFibGVkLCB0cnVlKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkluVGVzdCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuRG9tYWluVW5pcXVlTmFtZSwgJ3VuaXF1ZU5hbWUnKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkRvbWFpblF1ZXJ5LCAncScpO1xuXG4gICAgICAgIGlmICh0aGlzLmVudmlyb25tZW50LmluVGVzdCkge1xuICAgICAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25BYm9ydFRpbWVvdXQsIDUwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvbkFib3J0VGltZW91dCwgODAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyLCAnYXNzZXRzJyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlcy5oYXMoQXBwQ29uZmlnLkxhbmcpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChBcHBDb25maWcuTGFuZywgd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudmFsdWVzLmhhcyhBcHBDb25maWcuU3VwcG9ydGVkTGFuZ3MpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChBcHBDb25maWcuU3VwcG9ydGVkTGFuZ3MsIFN1cG9ydGVkTGFuZ3VhZ2VzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0UmVzdEFwaUNvbnRleHRVcmwoZW50aXR5OiBzdHJpbmcsIGlzTmVzdGVkOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbmVzdGVkRmxhZyA9IGlzTmVzdGVkID8gJyQnIDogJyc7XG4gICAgICAgIGxldCB3aXRoRW50aXR5ID0gYCR7QXBwQ29uZmlnLlJlc3RBcGlDb250ZXh0VXJsfS4ke25lc3RlZEZsYWd9JHtlbnRpdHl9YDtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2V0KHdpdGhFbnRpdHkpIHx8IHRoaXMuZ2V0KEFwcENvbmZpZy5SZXN0QXBpQ29udGV4dFVybCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh1cmwpKSB7XG4gICAgICAgICAgICBpZiAoL1xcLyQvZy50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Jlc3QgQVBJVXJpIGlzIG5vdCBjb25maWd1cmVkJyk7XG4gICAgfVxuXG5cbiAgICBnZXRSZXN0QXBpQ29udGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoQXBwQ29uZmlnLlJlc3RBcGlDb250ZXh0VXJsKSB8fCAnJztcbiAgICB9XG5cbiAgICBnZXRSZXN0QXBpSG9zdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoQXBwQ29uZmlnLlJlc3RBcGlIb3N0VXJsKSB8fCAnJztcbiAgICB9XG5cbiAgICBpc1Byb2R1Y3Rpb25Nb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuZ2V0Qm9vbGVhbihBcHBDb25maWcuSXNEZXZNb2RlKTtcbiAgICB9XG5cbiAgICBnZXRCYXNlVXJsKCkge1xuICAgICAgICBjb25zdCBpc01vY2tlZCA9IHRoaXMuZ2V0Qm9vbGVhbihBcHBDb25maWcuQ29ubmVjdGlvblVzZU1vY2tTZXJ2ZXIpO1xuICAgICAgICBjb25zdCBjbnggPSB0aGlzLmdldFJlc3RBcGlDb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IGhvc3QgPSB0aGlzLmdldFJlc3RBcGlIb3N0KCkgfHwgJyc7XG5cbiAgICAgICAgaWYgKGlzTW9ja2VkKSB7XG4gICAgICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldChBcHBDb25maWcuQXNzZXRGb2xkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0ke2NueCB8fCAnLyd9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB1cmwgPSBgJHtob3N0fSR7Y254IHx8ICcvJ31gO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBieSBmYWN0b3J5IG1ldGhvZCBpbnNpZGVyIEFQUF9JTklUSUFMSVpFUiB0byBwcmUtbG9hZCBpMThuIHN1cHBvcnRcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXRpYWxpemVJMThuKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxufVxuXG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdXNlZCBieSBDb3JlTW9kdWxlIGluIG9yZGVyIHRvIGluc3RhbnRpYXRlIEFwcENvbmZpZyBwcm92aWRlclxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VDb25maWcoY29uZmlnOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBlbnY6IEVudmlyb25tZW50KTogQXBwQ29uZmlnIHtcbiAgICAvLyB3aGVuIGVtcHR5IHdlIGFzdW1lIHdlIGFyZSBpbiBUZXN0LiBBcHBsaWNhdGlvbiBzaG91bGQgYWx3YXlzIGhhdmUgc29tZSBiYXNpYyBpbml0aWFsaXphdGlvblxuICAgIC8vIHRvZG86IE5lZWQgdG8gZ2V0IGJhY2sgdG8gdGhpcyBhcyB0aGlzIGlzIHRlbXBvcmFyeS5cblxuICAgIGxldCBjb25mOiBBcHBDb25maWcgPSBuZXcgQXBwQ29uZmlnKGluamVjdG9yLCBlbnYpO1xuICAgIGNvbmYuaW5pdChjb25maWcpO1xuICAgIHJldHVybiBjb25mO1xufVxuXG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICcuLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7YXNzZXJ0fSBmcm9tICcuLi91dGlscy9sYW5nJztcblxuXG4vKipcbiAqIEVudmlyb25tZW50IGlzIHNoYXJhYmxlIHN0YXRlIGJldHdlZW4gY29tcG9uZW50cyBhbmQgaXRzIGluamVjdGVkIGF0IHRoZSByb290IGxldmVsIGFuZFxuICogdGhlIHNhbWUgaW5zdGFuY2UgYWNjZXNzaWJsZSBkb3duIHRoZSBjb21wb25lbnQgdHJlZS5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudFxue1xuXG4gICAgLyoqXG4gICAgICogS2VlcCBDdXJyZW50IExvY2FsZS4gSW5pdGlhbGl6ZWQgZnJvbSBBcHBDb25maWcgYWxvbmcgd2l0aCBpMThuIHN1cHBvcnRcbiAgICAgKi9cbiAgICBwcml2YXRlIF9sb2NhbGU6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBieSBjb21wb25lbnQgdG8gc2F2ZSBzYXZlIGFkZGl0aW9uYWwgcHJvcGVydGllcyBmb3IgcHJvY2Vzc2luZyBhbmQgaXRzIHJlbmRlcmluZ1xuICAgICAqL1xuICAgIHByaXZhdGUgZW52VmFyaWFibGVzOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBTaW1wbGUgc3RhY2stbGlrZSBzdG9yYWdlIHdoZXJlIHdlIG5lZWQgdG8gYSBrZWVwIGhpc3RvcnlcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YWNrc1ZhcmlhYmxlczogTWFwPHN0cmluZywgYW55W10+O1xuXG4gICAgLyoqXG4gICAgICogSGVscGVyIHByb3BlcnRpZXMgZm9yIGRlYnVnZ2luZyBhbmQgdGVzdGluZyBwdXJwb3Nlc1xuICAgICAqXG4gICAgICovXG4gICAgaXNQc2V1ZG9Mb2NhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpblRlc3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgY3VycmVudCBQYWdlIEZvcm1Hcm91cCBTdGF0ZSB0aGF0IG5lZWQgdG8gYmUgc2hhcmVkIGRvd24gYWNyb3NzIGNvbXBvbmVudHNcbiAgICAgKi9cbiAgICBjdXJyZW50Rm9ybTogRm9ybUdyb3VwO1xuXG4gICAgLyoqXG4gICAgICogQW4gRXZlbnRFbWl0dGVyIHRvIGxpc3RlbiB0byBsb2NhbGUgY2hhbmdlIGV2ZW50c1xuICAgICAqL1xuICAgIG9uTG9jYWxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgaXNQcm9kdWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJlZ2lzdGVyIGFuZCBzYXZlIHJlZmVyZW5jZSB0byB1c2VyIGRlZmluZWQgcnVsZXMgaWYgYW55LiBZb3UgbWlnaHQgZGVmaW5lIGl0cyBvd24gbWV0YWRhdGFcbiAgICAgKiB3aGVuIHJlbmRlcmluZyBVSS5cbiAgICAgKi9cbiAgICB1c2VyUnVsZXM6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMganN1dCBmb3IgZGVidWdnaW5nIHB1cnBvc2VzIHRvIHNhdmUgc29tZSB0ZW1wIG1lc3NhZ2UgdGhhdCBJIGNhbiB0aGVuIHRyYWNlLlxuICAgICAqXG4gICAgICovXG4gICAgZGVidWdTdHJpbmc6IHN0cmluZztcblxuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlID0gJ2VuJztcbiAgICAgICAgdGhpcy5lbnZWYXJpYWJsZXMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICB0aGlzLnN0YWNrc1ZhcmlhYmxlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnlbXT4oKTtcbiAgICB9XG5cblxuICAgIGdldFZhbHVlKGtleTogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICBpZiAodGhpcy5lbnZWYXJpYWJsZXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVudlZhcmlhYmxlcy5nZXQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZW52VmFyaWFibGVzLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICBkZWxldGVWYWx1ZShrZXk6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmhhc1ZhbHVlKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuZW52VmFyaWFibGVzLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzVmFsdWUoa2V5OiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnZWYXJpYWJsZXMuaGFzKGtleSk7XG4gICAgfVxuXG4gICAgYWxsVmFyaWFibGVzKCk6IE1hcDxzdHJpbmcsIGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudlZhcmlhYmxlcztcbiAgICB9XG5cblxuICAgIGdldCBsb2NhbGUoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cblxuICAgIHNldCBsb2NhbGUodmFsdWU6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuX2xvY2FsZSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIEVtaXQgbG9jYWxlIGNoYW5nZWQgZXZlbnRcbiAgICAgICAgdGhpcy5vbkxvY2FsZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwZWFrPFQ+KGtleTogc3RyaW5nKTogVFxuICAgIHtcbiAgICAgICAgbGV0IHN0YWNrOiBUW10gPSB0aGlzLnN0YWNrc1ZhcmlhYmxlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLmxhc3Q8VD4oc3RhY2spO1xuXG4gICAgfVxuXG5cbiAgICBwb3A8VD4oa2V5OiBzdHJpbmcpOiBUXG4gICAge1xuICAgICAgICBsZXQgc3RhY2s6IFRbXSA9IHRoaXMuc3RhY2tzVmFyaWFibGVzLmdldChrZXkpIHx8IFtdO1xuICAgICAgICBhc3NlcnQoc3RhY2subGVuZ3RoID4gMCwgJyBBdHRlbXB0IHRvIGdldCB2YWx1ZSBmcm9tIGVtcHR5IHN0YWNrJyk7XG5cbiAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLnJlbW92ZUF0PGFueT4oc3RhY2ssIHN0YWNrLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuXG4gICAgcHVzaDxUPihrZXk6IHN0cmluZywgdmFsdWU6IFQpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgc3RhY2s6IFRbXSA9IHRoaXMuc3RhY2tzVmFyaWFibGVzLmdldChrZXkpIHx8IFtdO1xuICAgICAgICBzdGFjay5wdXNoKHZhbHVlKTtcbiAgICAgICAgdGhpcy5zdGFja3NWYXJpYWJsZXMuc2V0KGtleSwgc3RhY2spO1xuICAgIH1cblxufVxuXG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cblxuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJy4uL3V0aWxzL2xhbmcnO1xuXG4vKipcbiAqIFRvIHVuaWZ5IHRoZSB3b3JrIHdpdGggZG9tYWluIG9iamVjdHMgd2UgaGF2ZSB0aGVzZSBzZXQgb2YgaW50ZXJmYWNlcyB0aGF0IGVhY2ggRW50aXR5IG9yIFZhbHVlXG4gKiBtdXN0IHVzZSB0byBsZXZlcmFnZSBzb21lIG9mIHRoZSBmdW5jdGlvbmFsaXR5IHdlIGhhdmUgaW4gdGhlIGNvcmVcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9zaXRlVHlwZVxue1xuXG4gICAgY2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgICRwcm90bz8oKTogQ29tcG9zaXRlVHlwZTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElkZW50aXR5XG57XG5cbiAgICBpZGVudGl0eSgpOiBzdHJpbmc7XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZXNlcmlhbGl6YWJsZVxue1xuICAgIGdldFR5cGVzKCk6IGFueTtcbn1cblxuXG4vKipcbiAqIEVudGl0eUNvbXBvc2l0ZSBoYXZpbmcgaWRlbnRpdHkgdGhhdCBjYW4gYmUgaWRlbnRpZmllZCBpbiB0aGUgc3RvcmFnZSBieSBpdHMgSUQuIEVudGl0aWVzIGFyZVxuICogbXV0YWJsZSBvYmplY3RzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5IGV4dGVuZHMgSWRlbnRpdHksXG4gICAgRGVzZXJpYWxpemFibGUsXG4gICAgQ29tcG9zaXRlVHlwZVxue1xufVxuXG4vKipcbiAqIDxsaT5ObyBJZGVudGl0eTwvbGk+XG4gKiA8bGk+SW1tdXRhYmxlPC9saT5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWYWx1ZSBleHRlbmRzIERlc2VyaWFsaXphYmxlLFxuICAgIENvbXBvc2l0ZVR5cGVcbntcbiAgICAvLyBmb3IgdXNlIG9mIHR5cGUgZ3VhcmQgb25seSwgbGF0ZXIgb24gd2UgY2FuIHVzZSBpdCBmb3Igc29tZXRoaW5nXG4gICAgY2xvbmUoKTogVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VudGl0eShlbnRpdHk6IGFueSk6IGVudGl0eSBpcyBFbnRpdHlcbntcbiAgICByZXR1cm4gaXNQcmVzZW50KGVudGl0eSkgJiYgaXNQcmVzZW50KCg8RW50aXR5PmVudGl0eSkuaWRlbnRpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWx1ZSh2YWw6IGFueSk6IHZhbCBpcyBWYWx1ZVxue1xuICAgIHJldHVybiBpc1ByZXNlbnQodmFsKSAgJiYgaXNQcmVzZW50KCg8VmFsdWU+dmFsKS5jbG9uZSk7XG59XG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Fzc2VydCwgb2JqZWN0VG9OYW1lfSBmcm9tICcuLi8uLi91dGlscy9sYW5nJztcblxuZXhwb3J0IGVudW0gUmVzdFNlZ21lbnRUeXBlXG57XG4gICAgSG9zdCxcbiAgICBDb250ZXh0LFxuICAgIEFjdGlvbixcbiAgICBSZXNvdXJjZSxcbiAgICBJZGVudGlmaWVyLFxuICAgIE9mUGFyZW50XG59XG5cblxuZXhwb3J0IGVudW0gUmVzdEFjdGlvblxue1xuICAgIExvYWQsXG4gICAgUXVlcnksXG4gICAgU2F2ZSxcbiAgICBEb1xufVxuXG5cbi8qKlxuICogU2V0IG9mIEFTVCBsaWtlIGNsYXNzZXMgdG8ga2VlcCB0aGUgZmx1ZW50IEFQSSBncmFtbWFyIGluIHRoZSBhYnN0cmFjdCBmb3JtYXQgdG8gZ2l2ZSBkZXZlbG9wZXJzXG4gKiBjaGFuZ2VzIHRvIHByb3ZpZGUgdGhlaXIgb3duIGltcGxlbWVudGF0aW9uXG4gKlxuICogVG9kbzogRXhwb3NlIEJ1aWxkZXIgYXMgYSBzZXJ2aWNlXG4gKlxuICovXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVcmxTZWdtZW50XG57XG4gICAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IFJlc3RTZWdtZW50VHlwZSwgcHVibGljIHZhbHVlPzogYW55LFxuICAgICAgICAgICAgICAgIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+LCBwdWJsaWMgcmFuazogbnVtYmVyID0gLTEpXG4gICAge1xuXG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgIH1cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiAnV3JvbmcgUmVzdCBTZWdtZW50IG9yZGVyJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEhvc3RTZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLkhvc3QsIHZhbHVlLCBwYXJhbXMsIDUpO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09IG51bGwsIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmFzc2VydE1zZygpfS4gLiBIb3N0IHNlZ21lbnQgbXVzdCBiZSBmaXJzdCFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQ29udGV4dFNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuQ29udGV4dCwgdmFsdWUsIHBhcmFtcywgMTApO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuSG9zdCwgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIENvbnRleHQgc2VnbWVudCBtdXN0IGZvbGxvdyBIb3N0IWA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25TZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuICAgIGFjdGlvblR5cGU6IFJlc3RBY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aW9uOiBSZXN0QWN0aW9uLCBwdWJsaWMgZGF0YT86IGFueSwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuQWN0aW9uLCBhY3Rpb24sIHBhcmFtcywgMCk7XG5cbiAgICAgICAgLy8gc2F2ZSBpdCB0byBsb2NhbCBwcm9wZXJ0eSBmb3IgZWFzaWVyIGNvbXBhcmlzaW9uXG4gICAgICAgIHRoaXMuYWN0aW9uVHlwZSA9IGFjdGlvbjtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLkNvbnRleHQsIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmFzc2VydE1zZygpfS4gLiBBY3Rpb24gbXVzdCBmb2xsb3cgQ29udGV4dCBzZWdtZW50IWA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICByZXNvdXJjZU5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogVHlwZTxhbnk+LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSwgdmFsdWUsIHBhcmFtcywgMTUpO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VOYW1lID0gYCR7b2JqZWN0VG9OYW1lKHRoaXMudmFsdWUpLnRvTG93ZXJDYXNlKCl9c2A7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQoKHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuQWN0aW9uIHx8IHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQpLFxuICAgICAgICAgICAgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIFJlc291cmNlIG11c3QgZm9sbG93IGVpdGhlciBBY3Rpb24gb3IgT2YhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIElkZW50aWZpZXJTZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLklkZW50aWZpZXIsIHZhbHVlLCBwYXJhbXMsIDIwKTtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlLCB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIElkZW50aWZpZXIgbXVzdCBmb2xsb3cgUmVzb3VyY2UhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE9mUGFyZW50U2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudCk7XG4gICAgICAgIHRoaXMucmFuayA9IDI7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSB8fFxuICAgICAgICAgICAgcHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5JZGVudGlmaWVyLFxuICAgICAgICAgICAgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmFzc2VydE1zZygpfS4gLiBPZiBtdXN0IGZvbGxvdyBSZXNvdXJjZSFgO1xuICAgIH1cbn1cblxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0FjdGlvblNlZ21lbnQsIFJlc291cmNlU2VnbWVudCwgUmVzdEFjdGlvbiwgUmVzdFNlZ21lbnRUeXBlLCBVcmxTZWdtZW50fSBmcm9tICcuL3NlZ21lbnQnO1xuaW1wb3J0IHthc3NlcnQsIGlzUHJlc2VudCwgU3RyaW5nSm9pbmVyfSBmcm9tICcuLi8uLi91dGlscy9sYW5nJztcbmltcG9ydCB7UmVzdFVybEdyb3VwfSBmcm9tICcuL3VybC1ncm91cCc7XG5cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIHRoYXQgcmVhZHMgYWJzdHJhY3QgVVJMIHN0cnVjdHVyZSBhbmQgYXNzZW1ibGVzIGNvcnJlY3QgVVJMLlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFJlc3RCdWlsZGVyXG57XG4gICAgcHJpdmF0ZSBzb3J0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1cmxHcm91cDogUmVzdFVybEdyb3VwKVxuICAgIHtcbiAgICB9XG5cbiAgICBhc3NlbWJsZVVybChpc01vY2tlZDogYm9vbGVhbik6IHN0cmluZ1xuICAgIHtcblxuICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XG5cbiAgICAgICAgbGV0IHNvcnRlZFNlZ21lbnRzID0gdGhpcy5hZGp1c3RSYW5rKHRoaXMudXJsR3JvdXAuc2VnbWVudHMpO1xuXG4gICAgICAgIGxldCB1cmwgPSBuZXcgU3RyaW5nSm9pbmVyKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc29ydGVkU2VnbWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgc3dpdGNoIChzb3J0ZWRTZWdtZW50c1tpXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBSZXN0U2VnbWVudFR5cGUuQWN0aW9uOlxuICAgICAgICAgICAgICAgIGNhc2UgUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlOlxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzU2VnbWVudDogUmVzb3VyY2VTZWdtZW50ID0gPFJlc291cmNlU2VnbWVudD4gc29ydGVkU2VnbWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01vY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsLmFkZCgnbW9ja2VkJykuYWRkKCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXJsLmFkZChyZXNTZWdtZW50LnJlc291cmNlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2xhc2godXJsLCBpICE9PSAoc29ydGVkU2VnbWVudHMubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdXJsLmFkZChzb3J0ZWRTZWdtZW50c1tpXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2xhc2godXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJlc2VudChzb3J0ZWRTZWdtZW50c1tpXS52YWx1ZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWRTZWdtZW50c1tpXS52YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICE9PSAoc29ydGVkU2VnbWVudHMubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgoPEFjdGlvblNlZ21lbnQ+c29ydGVkU2VnbWVudHNbMF0pLnZhbHVlID09PSBSZXN0QWN0aW9uLkRvKSB7XG4gICAgICAgICAgICB1cmwuYWRkKCcvJykuYWRkKCdhY3Rpb25zJykuYWRkKCcvJykuYWRkKCg8QWN0aW9uU2VnbWVudD5zb3J0ZWRTZWdtZW50c1swXSkuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGFkZFNsYXNoKHVybDogU3RyaW5nSm9pbmVyLCBzaG91bGRBZGQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgICB1cmwuYWRkKCcvJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgYWN0aW9uOiBBY3Rpb25TZWdtZW50ID0gPEFjdGlvblNlZ21lbnQ+dGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbik7XG5cbiAgICAgICAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLlNhdmU6XG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uRG86XG4gICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYSBJZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgbGV0IHdpdGhJZENvdW50ID0gdGhpcy51cmxHcm91cC5jb3VudChSZXN0U2VnbWVudFR5cGUuSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgbGV0IG9mID0gdGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50KTtcblxuICAgICAgICAgICAgICAgIGFzc2VydCh3aXRoSWRDb3VudCA+PSAxLCAnTWlzc2luZyB3aXRoSWQoPElERU5USUZJRVI+KSBjYWxsIScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgT0Ygc2VnbWVudCB3aGVyZSB3ZSByZWZlciB0byBwYXJlbnQgcmVzb3VyY2UuIEluIHN1Y2ggY2FzZSB3ZVxuICAgICAqIG5lZWQgbW92ZSBhbGwgYmVmb3JlIE9GIGF0IHRoZSBlbmQuIEVpdGhlciBhZnRlciBwYXJlbnQgUkVTT1VSQ0Ugb3IgSURFTlRJRklFUlxuICAgICAqXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAgIHNlcnZpY2VcbiAgICAgKiAgICAgIC5sb2FkKClcbiAgICAgKiAgICAgIC5yZXNvdXJjZShMaW5lSXRlbSlcbiAgICAgKiAgICAgIC5vZlxuICAgICAqICAgICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICAgICAqICAgICAgLndpdGhJZCgnMTIzJyk7XG4gICAgICogIGBgYFxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqIEZpbmQgdGhlIE9GIHNlZ21lbnQgYW5kIGdvIGJhY2sgdW50aWwgd2UgcmVhY2ggUmVzb3VyY2UgYW5kIGFkanVzdCByYW5rIG9mIHRoZXNlIGFkblxuICAgICAqIHRoZW5cbiAgICAgKiBzb3J0XG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkanVzdFJhbmsoc2VnbWVudHM6IFVybFNlZ21lbnRbXSk6IFVybFNlZ21lbnRbXVxuICAgIHtcbiAgICAgICAgbGV0IG9mSW5kZXggPSBzZWdtZW50c1xuICAgICAgICAgICAgLmZpbmRJbmRleCgoczogVXJsU2VnbWVudCkgPT4gcy50eXBlID09PSBSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQpO1xuXG4gICAgICAgIGlmIChvZkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IG9mID0gc2VnbWVudHNbb2ZJbmRleF07XG4gICAgICAgICAgICBsZXQgc2VnbWVudDogVXJsU2VnbWVudDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50ID0gc2VnbWVudHNbLS1vZkluZGV4XTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LnJhbmsgKj0gb2YucmFuaztcbiAgICAgICAgICAgIH0gd2hpbGUgKHNlZ21lbnQudHlwZSAhPT0gUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWdtZW50cy5zb3J0KChhLCBiKSA9PiBhLnJhbmsgLSBiLnJhbmspO1xuICAgIH1cbn1cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtSZXNvdXJjZVNlZ21lbnQsIFJlc3RTZWdtZW50VHlwZSwgVXJsU2VnbWVudH0gZnJvbSAnLi9zZWdtZW50JztcbmltcG9ydCB7YXNzZXJ0LCBpc0JsYW5rLCBpc1ByZXNlbnQsIGlzU3RyaW5nfSBmcm9tICcuLi8uLi91dGlscy9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJy4uLy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKlxuICogVGhpcyBjbGFzcyBqdXN0IGFnZ3JlZ2F0ZXMgYW5kIHByb3ZpZGVzIGNvbnZpZW50IGFwaXQgdG8gdG8gd29yayB3aXRoIFVybFNlZ21lbnRzXG4gKlxuICovXG5leHBvcnQgY2xhc3MgUmVzdFVybEdyb3VwXG57XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VnbWVudHM/OiBVcmxTZWdtZW50W10pXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9zZWdtZW50cykpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRXZlcnkgcHVzaCBpcyB2YWxpZGF0ZWQgYWdhaW50cyBVcmxTZWdtZW50IGFzc2VydCBtZXRob2RzIHRvIG1ha2Ugc3VyZSB0aGUgb3JkZXIgb2YgdGhlXG4gICAgICogbWV0aG9kIGNhbGxzIGlzIGNvcnJlY3RcbiAgICAgKlxuICAgICAqL1xuICAgIHB1c2goc2VnbWVudDogVXJsU2VnbWVudCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHNlZ21lbnQuYXNzZXJ0U2VnbWVudCgodGhpcy5fc2VnbWVudHMubGVuZ3RoID4gMCkgPyB0aGlzLnBlYWsoKS50eXBlIDogbnVsbCk7XG5cbiAgICAgICAgaWYgKGlzU3RyaW5nKHNlZ21lbnQudmFsdWUpKSB7XG4gICAgICAgICAgICBzZWdtZW50LnZhbHVlID0gc2VnbWVudC52YWx1ZS5yZXBsYWNlKC9eXFwvfFxcLyQvZywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTdGFjayBsaWtlIEFQSVxuICAgICAqXG4gICAgICovXG4gICAgcGVhaygpOiBVcmxTZWdtZW50XG4gICAge1xuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIubGFzdDxVcmxTZWdtZW50Pih0aGlzLl9zZWdtZW50cyk7XG4gICAgfVxuXG5cbiAgICBwb3AoKTogVXJsU2VnbWVudFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX3NlZ21lbnRzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAnIEF0dGVtcHQgdG8gZ2V0IHZhbHVlIGZyb20gZW1wdHkgc2VnbWVudHMgc3RhY2snKTtcblxuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIucmVtb3ZlQXQ8VXJsU2VnbWVudD4odGhpcy5fc2VnbWVudHMsIHRoaXMuX3NlZ21lbnRzLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlZ21lbnQoc2VnbWVudFR5cGU6IFJlc3RTZWdtZW50VHlwZSwgZGF0YTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHVybFNlZ21lbnQgPSB0aGlzLmxvb2t1cChzZWdtZW50VHlwZSk7XG4gICAgICAgIHVybFNlZ21lbnQudmFsdWUgPSBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQmFzZWQgb24gdGhlIGVudW0gU2VnbWVudCBUeXBlICBpdCB3aWxsIHJldHJpZXZlIGNvcnJlY3Qgc2VnbWVudCBmcm9tIHRoZSBzdGFja1xuICAgICAqXG4gICAgICovXG4gICAgbG9va3VwKHNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSwgYnlSZXNvdXJjZT86IFR5cGU8YW55Pik6IFVybFNlZ21lbnRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2VnbWVudHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcyA9IFsuLi50aGlzLnNlZ21lbnRzXTtcbiAgICAgICAgc3MgPSBzcy5yZXZlcnNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHNzLmZpbmQoKChzOiBVcmxTZWdtZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgaGFzTWF0Y2ggPSBzLnR5cGUgPT09IHNlZ21lbnQ7XG5cbiAgICAgICAgICAgIGlmIChzZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoYnlSZXNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc01hdGNoICYmICg8UmVzb3VyY2VTZWdtZW50PnMpLnZhbHVlID09PSBieVJlc291cmNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNNYXRjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaGFzTWF0Y2g7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENvdW50cyBudW1iZXIgb2Ygc2VnbWVudHMgb2YgY2VydGFpbiB0eXBlXG4gICAgICpcbiAgICAgKi9cbiAgICBjb3VudChzZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCBzZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKChzOiBVcmxTZWdtZW50KSA9PiBzZWdtZW50ID09PSBzLnR5cGUpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHNlZ21lbnRzKSA/IHNlZ21lbnRzLmxlbmd0aCA6IDA7XG4gICAgfVxuXG5cbiAgICBnZXQgc2VnbWVudHMoKTogVXJsU2VnbWVudFtdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VnbWVudHM7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5cblxuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtJbmplY3RhYmxlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgSHR0cENsaWVudCxcbiAgICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgICBIdHRwSGVhZGVycyxcbiAgICBIdHRwUGFyYW1zLFxuICAgIEh0dHBQcm9ncmVzc0V2ZW50LFxuICAgIEh0dHBSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0VudGl0eSwgaXNFbnRpdHksIGlzVmFsdWUsIFZhbHVlfSBmcm9tICcuL2RvbWFpbi1tb2RlbCc7XG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtcbiAgICBBY3Rpb25TZWdtZW50LFxuICAgIENvbnRleHRTZWdtZW50LFxuICAgIEhvc3RTZWdtZW50LFxuICAgIElkZW50aWZpZXJTZWdtZW50LFxuICAgIE9mUGFyZW50U2VnbWVudCxcbiAgICBSZXNvdXJjZVNlZ21lbnQsXG4gICAgUmVzdEFjdGlvbixcbiAgICBSZXN0U2VnbWVudFR5cGVcbn0gZnJvbSAnLi91cmwvc2VnbWVudCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RlZmF1bHRSZXN0QnVpbGRlcn0gZnJvbSAnLi91cmwvYnVpbGRlcic7XG5pbXBvcnQge1Jlc3RVcmxHcm91cH0gZnJvbSAnLi91cmwvdXJsLWdyb3VwJztcbmltcG9ydCB7YXNzZXJ0LCBpc0FycmF5LCBpc0JsYW5rLCBpc0RhdGUsIGlzUHJlc2VudH0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5cblxuLyoqXG4gKiBSZXNwb25zZSBpcyB0aGUgZ2VuZXJpYyB3cmFwcGVyIGludGVyZmFjZSBlbmNhcHN1bGF0aW5nIGEgcmVzcG9uc2UgZnJvbSB0aGUgbWljcm8gc2VydmljZS5cbiAqIEN1cnJlbnRseSB3ZSBoYXZlIG9ubHkgYm9keSBmaWVsZCwgYnV0IGxhdGVyIG9uIHdlIG5lZWQgdG8gZXh0ZW5kIGl0IGZvciBkaWZmZXJlbnQgbm90aWZpY2F0aW9ucyxcbiAqIGVycm9ycywgcGFnaW5nIGluZm9ybWF0aW9uIGFuZCBtdWNoIG1vcmUuXG4gKlxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uc2U8VD4ge1xuICAgIHBheWxvYWQ6IFQ7XG59XG5cblxuLyoqXG4gKlxuICogVG8gc2ltcGxpZnkgd29yayB3aXRoIGN1cnJlbnQgSHR0cENsaWVudCB0aGUgUmVzb3VyY2UgcHJvdmlkZXMgZmx1ZW50IEFQSSBvbiB0b3Agb2YgaXQuIFlvdSBkb250XG4gKiBhc3NlbWJsZSBVUkwgdHJhZGl0aW9uYWwgd2F5IHJhdGhlciBtb3JlIGZsdWVudCBhbmQgZnVuY3Rpb25hbCB3YXksIHdvcmtpbmcgd2l0aCByZWFsIGRhdGEgdHlwZXNcbiAqIHN1Y2ggYSBWYWx1ZSBhbmQgRW50aXR5LlxuICpcbiAqIEVudGl0eSBhbmQgVmFsdWUgYXJlIHR3byBtYWluIGtleSBpbnRlcmZhY2VzIHRoYXQgYWxsIGRvbWFpbiBvYmplY3RzIHNob3VsZCBpbmhlcml0IGZyb20gaWYgdGhleVxuICogd2FudCB0byBsZXZlcmFnZSB0aGlzIGZ1bmN0aW9uYWxpdHkuXG4gKlxuICogIyMjRXhhbXBsZVxuICpcbiAqIDEuICB0byBzaW1wbHkgYXNzZW1ibGUgZm9sbG93aW5nIFVSTCBodHRwOi8vYXBpLmFyaWJhLmNvbS9teVNlcnZpY2UvdjEvcmVxdWlzaXRpb25zLzEyMyBhbmRcbiAqICBhbmQgZmV0Y2ggUmVxdWlzaXRpb24gZGF0YTpcbiAqXG4gKiBgYGB0c1xuICogIGxldCByOiBSZXNvdXJjZVxuICpcbiAqICByLmxvYWQoKVxuICogICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gKiAgIC53aXRoSWQoJzEyMycpXG4gKiAgIC5hc0VudGl0eTxSZXF1aXNpdGlvbj4oKHI6IFJlcXVpc2l0aW9uKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKiBgYGBcbiAqIFlvdSB5b3UgY2FuIHNpbXBseSByZWFkIGl0OiBsb2FkIHJlc291cmNlIFJlcXVpc2l0aW9uIHdpdGggSUQgMTIzIGFuZCByZXR1cm4gdGhpcyBhcyBFbnRpdHlcbiAqXG4gKiAyLiBDdXJyZW50IGZsdWVudCBBUEkgYWxzbyBzdXBwb3J0IHBhcnRpYWwgdXBkYXRlcyBhbmQgc3ViY29udGV4dCByZXNvdXJjZVxuICogIHRvIGxvYWQgZGF0YSBmcm9tIHRoaXMgUkVTVCBBUEkgZW5kcG9pbnRcbiAqICAgICAgaHR0cDovL2FwaS5hcmliYS5jb20vbXlTZXJ2aWNlL3YxL3JlcXVpc2l0aW9ucy8xMjMvc3VwcGxpZXJzXG5cblxuICogYGBgdHNcbiAqICBsZXQgcjogUmVzb3VyY2VcbiAqXG4gKiAgci5sb2FkKClcbiAqICAgLnJlc291cmNlKFN1cHBsaWVyKVxuICogICAub2ZcbiAqICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICogICAud2l0aElkKCcxMjMnKVxuICogICAuYXNFbnRpdHk8U3VwcGxpZXI+KChyOiAgU3VwcGxpZXJbXSkgPT4gcmVjZWl2ZWRSID0gcik7XG4gKlxuICogYGBgXG4gKlxuICogIFlvdSBjYW4gcmVhZCBhYm92ZTogTG9hZCBhbGwgZnJvbSByZXNvdXJjZSBTdXBwbGllciBvZiBSZXF1aXNpdGlvbiAob3Igc3VwcGxpZXIgYmVsb25ncyB0b1xuICogIFJlcXVpc2l0aW9uKSAgd2l0aCBJRCAxMjMgYW5kIHJldHVybiB0aGlzIGFzIEVudGl0eS5cbiAqXG4gKlxuICogMy4gVG8gc2F2ZSBkYXRhIHlvdSBmb2xsb3cgdGhlIHNhbWUgc3ludGF4XG4gKiAgICAgIFNhdmUgcmVxdWlzaXRpb24gc28gd2UgYXJlIFBVVHRpbmcgZGF0YSB0byBmb2xsb3dpbmcgVVJMXG4gKiAgICAgIGh0dHA6Ly9hcGkuYXJpYmEuY29tL215U2VydmljZS92MS9yZXF1aXNpdGlvbnMvMTIzXG4gKlxuICogYGBgdHNcbiAqICBsZXQgcjogUmVzb3VyY2VcbiAqXG4gKiAgICAgICAgICByXG4gKiAgICAgICAgLnNhdmUoKVxuICogICAgICAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAqICAgICAgICAud2l0aElkKCcxMjMnKVxuICogICAgICAgIC53aXRoRGF0YShwcilcbiAqICAgICAgICAuYXNFbnRpdHk8UmVxdWlzaXRpb24+KChyOiBSZXF1aXNpdGlvbikgPT4gcmVjZWl2ZWRSID0gcik7XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqICBZb3UgY2FuIHJlYWQgYWJvdmU6IFNhdmUgcmVzb3VyY2UgUmVxdWlzaXRpb24gd2l0aCBJRCAxMjMgYW5kIHdpdGggRGF0YSAuLi4uIGFuZCByZXR1cm4gaXQgYXNcbiAqICBhIEVudGl0eVxuICpcbiAqXG4gKiAgNC4gQVBJIGNhbiBhbHNvIGZvciB5b3UgYXNzZW1ibGUgYW5kIGV4ZWN1dGUgYWN0aW9ucyBzb21ldGltZXMgY2FsbGVkIGludGVyYWN0aW9uLiBOb3QgYWxsIGlzXG4gKiAgYWJvdXQgQ1JVRC4gT3VyIGN1cnJlbnQgc3ludGF4IGZvciBhY3Rpb25zIGlzXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgIGh0dHA6Ly9hcGkuYXJpYmEuY29tL215U2VydmljZS92MS9yZXF1aXNpdGlvbnMvMTIzL2FjdGlvbnMvYXBwcm92ZVxuICpcbiAqIGBgYHRzXG4gKiAgbGV0IHI6IFJlc291cmNlXG4gKlxuICogICAgICAgIHJcbiAqICAgICAgICAuZG8oJ2FwcHJvdmUnKVxuICogICAgICAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAqICAgICAgICAud2l0aElkKCcxMjMnKVxuICogICAgICAgIC5hc0VudGl0eTxSZXF1aXNpdGlvbj4oKHI6IFJlcXVpc2l0aW9uKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKlxuICogYGBgXG4gKlxuICogVG8gbWFrZSBpdCBlYXNpbHkgZXh0ZW5zaWJsZSB0aGV5IGFyZSAzIG1haW4gcGllY2VzXG4gKiAgLSBSZXNvdXJjZTogVGhpcyBjbGFzcyBqdXN0IHB1dCB0b2dldGhlciBhYnN0cmFjdCBzdHJ1Y3R1cmUgVVJMU2VnbWVudFxuICogIC0gVVJMU2VnbWVudHM6IE1vcmUgbGlrZSBBU1Qgc3R5bGUgdG8gYXNzZW1ibGUgdGhlIFVSTFxuICogIC0gYnVpbGRlcjogdGhhdCByZWFkIHRoaXMgQVNUIHRvIGFzc2VtYmxlIHRoZSBVUkxcbiAqXG4gKlxuICogTGF0ZXIgb24gd2UgbWlnaHQgd2FudCB0byBleHBvc2UgYnVpbGRlciBhcyBhIHByb3ZpZGVyIGFuZCB5b3UgY2FuIGhhdmUgeW91ciBvd24gaW1wbGVtZW50YXRpb25cbiAqXG4gKlxuICpcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZSB7XG4gICAgLyoqXG4gICAgICogUmVzdFVybEdyb3VwIGFnZ3JlZ2F0ZXMgVXJsU2VnbWVudHNcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgX3VybEdyb3VwOiBSZXN0VXJsR3JvdXA7XG5cbiAgICAvKipcbiAgICAgKiBPbmNlIGFsbCBVUkwgYXJlIGFzc2VtYmxlZCB0aGUgYnVpbGRlciByZXR1cm5zIGZpbmFsIFVSTCB0byBiZSB1c2VkIGZvciB0aGUgSHR0cENsaWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgX3VybEJ1aWxkZXI6IERlZmF1bHRSZXN0QnVpbGRlcjtcblxuICAgIC8qKlxuICAgICAqIENhY2hlZCB1cmwsIHNvIHdlIGRvbnQgaGF2ZSB0byBhc3NlbWJsZSB0aGlzIGV2ZXJ5dGltZSBzb21lYm9keSBjYWxscyB1cmxcbiAgICAgKi9cbiAgICBwcml2YXRlIF91cmw6IHN0cmluZztcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGFwcENvbmZpZzogQXBwQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBHRVQgb3BlcmF0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBsb2FkKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBBY3Rpb25TZWdtZW50KFJlc3RBY3Rpb24uTG9hZCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgUFVUIG9yIFBPU1Qgb3BlcmF0aW9uLiBEZXBlbmRpbmcgb24gdGhlIG9iamVjdC4gSWYgdGhlIG9iamVjdCBoYXMgYWxyZWFkeVxuICAgICAqIHBvcHVsYXRlZCBpdHMgaWRlbnRpZmllciwgdGhlbiB3ZSB1c2UgUFVULCBvdGhlcndpc2UgUE9TVFxuICAgICAqXG4gICAgICovXG4gICAgc2F2ZSgpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgQWN0aW9uU2VnbWVudChSZXN0QWN0aW9uLlNhdmUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIGludGVyYWN0aW9uLiBGb3IgdGhpcyB3ZSB1c2UgUE9TVFxuICAgICAqXG4gICAgICovXG4gICAgZG8oYWN0aW9uOiBzdHJpbmcpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgQWN0aW9uU2VnbWVudChSZXN0QWN0aW9uLkRvLCBhY3Rpb24pKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRPRE86IFNpbmNlIHF1ZXJ5IEFQSSBpcyBub3QgeWV0IGltcGxlbWVudGVkIG9uIHRoZSBzZXJ2ZXIgc2lkZSA9PiBUQkRcbiAgICAgKlxuICAgICAqIFRoZXJlIHdoZXJlIHNob3VsZCBiZSBhYmxlIHRvIGFjY2VwdHMgaW5kaXZpZHVhbCBxdWVyeSBncmFtbWFyLiBTaW1pbGFyIHN0eWxlIGxpa2Ugcnhqc1xuICAgICAqIG9wZXJhdG9ycy5cbiAgICAgKlxuICAgICAqICBlLmcuOiBSZXNvdXJjZS5wcm90b3R5cGUuY29udGFpbnMgPSAuLi4uXG4gICAgICogICAgICAgIFJlc291cmNlLnByb3RvdHlwZS5lcSA9IC4uLi5cbiAgICAgKlxuICAgICAqIFlvdSBzaG91bGQgYmUgYWJsZSB0byBhZGQgZHluYW1pY2FsbHkgbGV0O3MgY2FsbCBpdCBRdWVyeVNwZWNpZmljYXRpb25cbiAgICAgKlxuICAgICAqICAgICAgcmVzXG4gICAgICogICAgICAucXVlcnkoKVxuICAgICAqICAgICAgLnJlc291cmNlKFJlcXVzaXRpb24pXG4gICAgICogICAgICAud2hlcmUoIGNvbnRhaW5zPHN0cmluZz4ocmVxRW50aXR5LnRpdGxlKCksICcqYXNkZionIClcbiAgICAgKlxuICAgICAqICBzbyBpdCBjb3VsZCBsb29rIGxpa2Ugc29tZXRoaW5nIGxpa2U6XG4gICAgICpcbiAgICAgKlxuICAgICAqICBjb250YWluczxUPih0aXRsZTogc3RyaW5nLCB2YWx1ZTogVCk6IFRcbiAgICAgKlxuICAgICAqICBCdXQgc2luY2UgYWxsIHRoZXNlIFNwZWNpZmljYXRpb24gd291bGQgaGF2ZSBhIHdheSB0byB0cmFuc2xhdGUgdGhpcyBrZXl8dmFsdWUgdG8gdGhlXG4gICAgICogIHF1ZXJ5IHNvIHRoZSB3aGVyZSwgd291bGQganVzdCBsaXN0IGFsbCB0aGUgc3BlY2lmaWNhdGlvbiB0byBidWxpZFxuICAgICAqICB0aGUgcXVlcnlcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcXVlcnkoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH1cblxuICAgIHdoZXJlKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElkZW50aWZpZXMgUmVzb3VyY2VTZWdtZW50IHdpdGggc3BlY2lmaWMgdHlwZSB0aGF0IG11c3QgYmUgZWl0aGVyIEVudGl0eSBvciBWYWx1ZVxuICAgICAqXG4gICAgICovXG4gICAgcmVzb3VyY2U8VCBleHRlbmRzIEVudGl0eSB8IFZhbHVlPih0eXBlOiBUeXBlPFQ+KTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IFJlc291cmNlU2VnbWVudCh0eXBlKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXIgSWRlbnRpZmllclNlZ21lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIHdpdGhJZChpZGVudGlmaWVyOiBzdHJpbmcpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgSWRlbnRpZmllclNlZ21lbnQoaWRlbnRpZmllcikpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGFyZSBzYXZpbmcgZGF0YSB0aGlzIG1ldGhvZCBpcyB1c2VkIHRvIGluc2VydCBhIHBheWxvYWQgdG8gdGhlIEFjdGlvblNlZ21lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIHdpdGhEYXRhPFQgZXh0ZW5kcyBFbnRpdHkgfCBWYWx1ZT4oZGF0YTogVCk6IFJlc291cmNlIHtcbiAgICAgICAgbGV0IHVybFNlZ21lbnQgPSB0aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuQWN0aW9uKTtcbiAgICAgICAgbGV0IGlzU2F2ZSA9ICg8QWN0aW9uU2VnbWVudD51cmxTZWdtZW50KS5hY3Rpb25UeXBlID09PSBSZXN0QWN0aW9uLlNhdmU7XG5cbiAgICAgICAgYXNzZXJ0KGlzU2F2ZSwgJ3dpdGhEYXRhIGNhbiBiZSB1c2VkIHdpdGggU0FWRSBvcGVyYXRpb24gb25seSEnKTtcblxuICAgICAgICAoPEFjdGlvblNlZ21lbnQ+dXJsU2VnbWVudCkuZGF0YSA9IGRhdGE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogT0YgaXMganVzdCBhIHN5bnRhY3RpYyBzdWdnYXIgZm9yIGJldHRlciByZWFkYWJpbGl0eSBhbmQgdG8gZWFzaWVyIHdvcmsgd2l0aCBzdWIgcmVzb3VyY2VzLlxuICAgICAqIHVzaW5nIE9GIHdlIGFyZSBhYmxlIHRvIHRlbGwgdGhhdCBzb21lIHJlc291cmNlIGJlbG9uZ3MgdG8gb3RoZXIgcmVzb3VyY2VcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCBvZigpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgT2ZQYXJlbnRTZWdtZW50KCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogT25jZSB0ZWxsIHdoYXQgeW91IHdhbnQgdGhpcyBpcyB0aGUgbGFzdCBjYWxsIHlvdSB3YW50IHRvIG1ha2UgdG8gcmV0dXJuIHJlc291cmNlcyBhcyBhY3R1YWxcbiAgICAgKiBFbnRpdGllcyBvciBWYWx1ZXMuXG4gICAgICpcbiAgICAgKiBUb2RvOiBNYXliZSByZW5hbWUgYSBtZXRob2QgbmFtZSBhcyB3ZSBjYW4gcmV0dXJuIGJvdGggRW50aXR5IGFuZCBWYWx1ZS5cbiAgICAgKlxuICAgICAqIFlvdSBoYXZlIGFsc28gb3B0aW9uIHRvIGluc2VydCBIdHRwT3B0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBhc0VudGl0eTxUIGV4dGVuZHMgRW50aXR5IHwgVmFsdWU+KHN1YnNjcmliZXI6IChyZXM6IFQgfCBUW10pID0+IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmU6ICdib2R5J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcz86IEh0dHBQYXJhbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZT86ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA9IHtvYnNlcnZlOiAnYm9keSd9KTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgbGV0IHNlZ21lbnQ6IEFjdGlvblNlZ21lbnQgPSA8QWN0aW9uU2VnbWVudD4gdGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbik7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQoc2VnbWVudCksICdNaXNzaW5nIEh0dHAgbWV0aG9kLiBOb3Qgc3VyZSBob3cgdG8gaGFuZGxlIHRoaXMhJyk7XG5cbiAgICAgICAgbGV0IG9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PjtcblxuICAgICAgICBsZXQgYWN0aW9uVHlwZTogUmVzdEFjdGlvbiA9IHNlZ21lbnQudmFsdWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkxvYWQ6XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkRvOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLlNhdmU6XG4gICAgICAgICAgICAgICAgLy8gd2UgZG9udCBoYXZlIHJpZ2h0IG5vdyBvdGhlciB1c2VjYXNlIHN1YmNvbnRleHQgcmVzb3VyY2Ugd2lsbCBiZSBhbHdheXMgc29tZVxuICAgICAgICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgICAgICAgaWYgKGlzRW50aXR5KHNlZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoKDxFbnRpdHk+c2VnbWVudC5kYXRhKS5pZGVudGl0eSgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzVmFsdWUoc2VnbWVudC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBleHBlY3QgdmFsdWUgd2lsbCBiZSBhbHdheXMgcHVzaGVkXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUobWFwPFJlc3BvbnNlPFQgfCBUW10+LCBUIHwgVFtdPihyZXMgPT4gdGhpcy5jb252ZXJ0VG9Db21wb3NpdGUocmVzLFxuICAgICAgICAgICAgdHJ1ZSwgZmFsc2UpKSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH1cblxuXG4gICAgYXNIdHRwUmVzcG9uc2U8VCBleHRlbmRzIEVudGl0eSB8XG4gICAgICAgIFZhbHVlPihzdWJzY3JpYmVyOiAocmVzOiBIdHRwUmVzcG9uc2U8UmVzcG9uc2U8VCB8IFRbXT4+IHwgSHR0cFByb2dyZXNzRXZlbnQpID0+IHZvaWQsXG4gICAgICAgICAgICAgICBlcnJvcj86IChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHZvaWQsXG4gICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgIHBhcmFtcz86IEh0dHBQYXJhbXMsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU/OiAnanNvbicsIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW5cbiAgICAgICAgICAgICAgIH0gPSB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pOiBTdWJzY3JpcHRpb24ge1xuXG4gICAgICAgIGxldCBzZWdtZW50OiBBY3Rpb25TZWdtZW50ID0gPEFjdGlvblNlZ21lbnQ+IHRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24pO1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHNlZ21lbnQpLCAnTWlzc2luZyBIdHRwIG1ldGhvZC4gTm90IHN1cmUgaG93IHRvIGhhbmRsZSB0aGlzIScpO1xuXG4gICAgICAgIGxldCBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgICAgICAgbGV0IGFjdGlvblR5cGU6IFJlc3RBY3Rpb24gPSBzZWdtZW50LnZhbHVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5Mb2FkOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAuZ2V0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5EbzpcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnBvc3Q8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCB7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5TYXZlOlxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbnQgaGF2ZSByaWdodCBub3cgb3RoZXIgdXNlY2FzZSBzdWJjb250ZXh0IHJlc291cmNlIHdpbGwgYmUgYWx3YXlzIHNvbWVcbiAgICAgICAgICAgICAgICAvLyBhcnJheVxuICAgICAgICAgICAgICAgIGlmIChpc0VudGl0eShzZWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKCg8RW50aXR5PnNlZ21lbnQuZGF0YSkuaWRlbnRpdHkoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1ZhbHVlKHNlZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgZXhwZWN0IHZhbHVlIHdpbGwgYmUgYWx3YXlzIHB1c2hlZFxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGFzUHJvZ3Jlc3MgPSBvcHRpb25zLnJlcG9ydFByb2dyZXNzIHx8IGZhbHNlO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKFxuICAgICAgICAgICAgbWFwKHJlcyA9PiB0aGlzLmNvbnZlcnRUb0NvbXBvc2l0ZShyZXMsIGZhbHNlLCBoYXNQcm9ncmVzcykpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShzdWJzY3JpYmVyLCBlcnJvcik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybiBhc3NlYmxlZCBVUkwgQVNUIC0+IHN0cmluZ1xuICAgICAqXG4gICAgICovXG4gICAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl91cmwpKSB7XG4gICAgICAgICAgICBsZXQgaXNNb2NrZWQgPSB0aGlzLmFwcENvbmZpZy5nZXRCb29sZWFuKEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlcik7XG5cbiAgICAgICAgICAgIHRoaXMuX3VybCA9IHRoaXMuX3VybEJ1aWxkZXIuYXNzZW1ibGVVcmwoaXNNb2NrZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBwcml2YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgdXJsR3JvdXAoKTogUmVzdFVybEdyb3VwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybEdyb3VwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCB1cmxCdWlsZGVyKCk6IERlZmF1bHRSZXN0QnVpbGRlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cmxCdWlsZGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdXJsR3JvdXAgPSBuZXcgUmVzdFVybEdyb3VwKCk7XG4gICAgICAgIHRoaXMuX3VybEJ1aWxkZXIgPSBuZXcgRGVmYXVsdFJlc3RCdWlsZGVyKHRoaXMuX3VybEdyb3VwKTtcbiAgICAgICAgdGhpcy5fdXJsID0gbnVsbDtcblxuXG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgSG9zdFNlZ21lbnQodGhpcy5hcHBDb25maWcuZ2V0UmVzdEFwaUhvc3QoKSkpO1xuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IENvbnRleHRTZWdtZW50KHRoaXMuYXBwQ29uZmlnLmdldFJlc3RBcGlDb250ZXh0KCkpKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgaW5zaWRlIC5tYXAgdG8gbWFwIEpTT04gcmVzcG9uc2Ugb3IgSHR0cFJlc3BvbnNlLmJvZHkgdG8gYWN0dWFsIHR5cGVcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydFRvQ29tcG9zaXRlPFQgZXh0ZW5kcyBFbnRpdHkgfCBWYWx1ZT4ocmVzOiBSZXNwb25zZTxUIHwgVFtdPiB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSHR0cFJlc3BvbnNlPFJlc3BvbnNlPFQgfCBUW10+PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcG9zaXRlOiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzUHJvZ3Jlc3M6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICBpZiAoaGFzUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdW5zb3J0ZWQgc2VnbWVudHMgd2lsbCBoYXZlIGhhdmUgb3VyIHRhcmdldCByZXNvdXJjZSBhcyBmaXJzdCBvbmVcbiAgICAgICAgbGV0IHNnbTogUmVzb3VyY2VTZWdtZW50ID0gPFJlc291cmNlU2VnbWVudD50aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UpO1xuXG4gICAgICAgIGlmIChpc0NvbXBvc2l0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVzZXJpYWxpemUoKDxSZXNwb25zZTxUPj5yZXMpLnBheWxvYWQsIHNnbS52YWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBodHRwUmVzID0gPEh0dHBSZXNwb25zZTxSZXNwb25zZTxUPj4+cmVzO1xuICAgICAgICAgICAgbGV0IG15UmVzcDogUmVzcG9uc2U8VD4gPSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZDogdGhpcy5kZXNlcmlhbGl6ZShodHRwUmVzLmJvZHkucGF5bG9hZCwgc2dtLnZhbHVlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBodHRwUmVzLmNsb25lKHtib2R5OiBteVJlc3B9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc2VyaWFsaXplPFQ+KGRhdGE6IFQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDb252ZXJ0cyBKU09OIG9iamVjdCB0byBhY3R1YWwgVHlwZS4gV2UgZG9uJ3QgY2FyZSBhYm91dCBwcmltaXRpdmUgdHlwZXMgYXMgd2UgZG9udCBoYXZlIHRvXG4gICAgICogZG8gYW55dGhpbmcgd2l0aCB0aGVtLiBXZSBkbyBpbnN0YW50aWF0ZSBvYmplY3RzIG9yIGNvbXBsZXggdHlwZXMgb25seS5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgZGVzZXJpYWxpemUoanNvbjogYW55LCBjbGF6ejogVHlwZTxhbnk+KTogYW55IHtcbiAgICAgICAgaWYgKGlzQXJyYXkoanNvbikpIHtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gaW4ganNvbikge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlcy5wdXNoKHRoaXMuZGVzZXJpYWxpemUoanNvbltpdGVtXSwgY2xhenopKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgaW5zdGFuY2U7XG4gICAgICAgICAgICBpZiAoY2xhenogPT09IFN0cmluZykge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0ganNvbi50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGF6eiA9PT0gTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBqc29uO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGF6eiA9PT0gQm9vbGVhbikge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0ganNvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgY2xhenooKTtcbiAgICAgICAgICAgICAgICBsZXQgdHlwZXMgPSBpbnN0YW5jZS5nZXRUeXBlcygpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghanNvbi5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHR5cGVzW3Byb3BdKSAmJiBpc1ByZXNlbnQoanNvbltwcm9wXSkgJiYgdHlwZXNbcHJvcF0gIT09IERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BdID0gdGhpcy5kZXNlcmlhbGl6ZShqc29uW3Byb3BdLCB0eXBlc1twcm9wXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUodHlwZXNbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wXSA9IG5ldyB0eXBlc1twcm9wXShqc29uW3Byb3BdKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcF0gPSBqc29uW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSBpZiAoaXNTdHJpbmcoanNvbltwcm9wXSkgJiYgaXNFbnRpdHkoaW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAmJiBwcm9wID09PSAoPEVudGl0eT5pbnN0YW5jZSkuaWRlbnRpdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgaWRTdHJpbmcgPSAoPEVudGl0eT5pbnN0YW5jZSkuaWRlbnRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICg8YW55Pmluc3RhbmNlKVtpZFN0cmluZ10gPSA8c3RyaW5nPmpzb25bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2UtY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICA8aDE+IE9vcHMhPC9oMT5cbiAgICAgICAgICAgICAgICA8aDI+IDQwNCBOb3QgRm91bmQ8L2gyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1kZXRhaWxzXCI+IFNvcnJ5LCBhbiBlcnJvciBoYXMgb2NjdXJlZCwgUmVxdWVzdGVkIHBhZ2Ugbm90IGZvdW5kIVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5lcnJvci10ZW1wbGF0ZXtwYWRkaW5nOjQwcHggMTVweDt0ZXh0LWFsaWduOmNlbnRlcn0uZXJyb3ItYWN0aW9uc3ttYXJnaW4tdG9wOjE1cHg7bWFyZ2luLWJvdHRvbToxNXB4fS5lcnJvci1hY3Rpb25zIC5idG57bWFyZ2luLXJpZ2h0OjEwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgTm90Rm91bmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbntcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICB9XG5cbn1cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWN0aXZhdGVkUm91dGUsXG4gICAgRXZlbnQsXG4gICAgTmF2aWdhdGlvbkVuZCxcbiAgICBOYXZpZ2F0aW9uRXh0cmFzLFxuICAgIE5hdmlnYXRpb25TdGFydCxcbiAgICBSb3V0ZSxcbiAgICBSb3V0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICcuLi91dGlscy9jb2xsZWN0aW9uJztcblxuLyoqXG4gKiBCYXNpYyB3cmFwcGVyIGFyb3VuZCBBbmd1bGFyJ3MgUk9VVEUgc2VydmljZSB0byBzaW1wbGlmeSB0ZW1wb3Jhcnkgc3RhdGUgY2FjaGluZyBhcyB3ZWxsXG4gKiBuYXZpZ2F0aW9uLiBUaGlzIHNlcnZpY2UgbGlzdGVuIGZvciBSb3V0aW5nIGV2ZW50cyBzdWNoIGFzIE5hdmlnYXRpb25TdGFydCBhcyB3ZWxsLFxuICogTmF2aWdhdGlvbkVuZHMgYW5kIHdoZW4gdGhlIHJvdXRpbmcgRW50ZXJzLCBXZSBjaGVjayBpZiB0aGVyZSBhbnkgc3RhdGUgd2hpY2ggbmVlZHMgdG8gYmUgY2FjaGVkXG4gKiBpZiB5ZXMgdGhlbiB3ZSBzYXZlIGl0IGludG8gdGhlIHN0YXRlQ2FjaGVIaXN0b3J5IHdoaWNoIG1hcHMgZmluYWwgVVJMIHRvIHRoZSBhY3R1YWwgU1RBVEVcbiAqIG9iamVjdCwgYW5kIHdoZW4gd2UgYXJlIG5hdmlnYXRlIGJhY2sgdG8gdGhlIHNhbWUgVVJMIFdlIGNoZWNrIGlmIHRoZXJlIGlzIGFueSBzYXZlZCBzdGF0ZS5cbiAqXG4gKiBUaGlzIHNlcnZpY2Ugd2FzIG9yaWdpbmFsbHkgY3JlYXRlZCBhcyBhIHJlc3BvbnNlIHRoYXQgYW5ndWxhciBhbHdheXMgZGVzdHJveWVzIGFuZCByZWNyZWF0ZXNcbiAqIGNvbXBvbmVudHMgd2hlbiBuYXZpZ2F0aW5nIGF3YXlzIGFuZCB0aGVuIGJhY2sgdG8gaXQuIEJ5IGEgb2YgYW5ndWxhciA0LjIuMCsgdGhpcyBtaWdodCBiZVxuICogb2Jzb2xldGUuXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm91dGluZ1NlcnZpY2VcbntcbiAgICAvKipcbiAgICAgKiBTdGFjayBrZWVwaW5nIGFjdGl2ZSBSb3V0ZXMgc28gd2UgY2FuIGdvIGJhY2svcmVkaXJlY3QgYmFja1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSByb3V0aW5nU3RhdGU6IEV2ZW50W10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIFRlbXBvcmFyeSBmaWVsZCBob2xkaW5nIGEgc3RhdGUgT2JqZWN0IG9mIHR5cGUgVCBiZWZvcmUgaXRzIHNhdmVkIGludG8gc3RhdGVDYWNoZUhpc3RvcnksXG4gICAgICogYW5kIHJldHJpZXZlZCB3aGVuIGdldHRpbmcgYmFjayBmcm9tIFN0YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjdXJyZW50U3RhdGVGcm9tOiBhbnk7XG5cblxuICAgIC8qKlxuICAgICAqIFRlbXBvcmFyeSBmaWVsZCBob2xkaW5nIGEgc3RhdGUgT2JqZWN0IG9mIHR5cGUgVCBiZWZvcmUgaXRzIHNhdmVkIGludG8gc3RhdGVDYWNoZUhpc3RvcnksXG4gICAgICogYW5kIHJldHJpZXZlZCB3aGVuIGdldHRpbmcgdG8gU3RhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGN1cnJlbnRTdGF0ZVRvOiBhbnk7XG5cbiAgICAvKlxuICAgICAqIEV2ZW50IG9iamVjdCBmb3IgcmVnaXN0ZXJpbmcgbGlzdGVuZXJzIHRvIHNhdmUgYSBjZXJ0YWluIHN0YXRlIGFzIHdlbGwgYXMgYnJvYWRjYXN0aW5nIGJhY2tcbiAgICAgKiB3aGVuIHN0YXRlIG5lZWRzIHRvIGJlIHJldHJpZXZlZCBiYWNrIHRvIHRoZSBQYWdlXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0ZUNhY2hlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoaXMgaXMgb3VyIGNhY2hlIHdoaWNoIG1hcHMgVVJMID0+IHRvID0gPlNUQVRFLiBBbnkgcGFnZSBjYW4gc2F2ZSBhbnkgc3RhdGUgdXNpbmdcbiAgICAgKiBvYnNlcnZhYmxlIG9iamVjdCB3aGljaCB3aWxsIGJlIHJldHJpZXZlZCBiYWNrLlxuICAgICAqXG4gICAgICovXG4gICAgc3RhdGVDYWNoZUhpc3Rvcnk6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcm91dGVyOiBSb3V0ZXIpXG4gICAge1xuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudDogRXZlbnQpID0+IHRoaXMuc3Vic2NyaWJlVG9Sb3V0aW5nRXZlbnRzKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBIZXJlIGlzIHRoZSBtYWluIHJvdXRpbmcgbG9naWMgdGhhdCBwcm9jZXNlcyBldmVyeSByb3V0aW5nIGV2ZW50cy5cbiAgICAgKlxuICAgICAqL1xuICAgIHN1YnNjcmliZVRvUm91dGluZ0V2ZW50cyhldmVudDogRXZlbnQpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgICAgIGxldCB1cmwgPSBldmVudC51cmw7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5oYXModXJsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDYWNoZS5uZXh0KHRoaXMuc3RhdGVDYWNoZUhpc3RvcnkuZ2V0KHVybCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDYWNoZUhpc3RvcnkuZGVsZXRlKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJvdXRpbmdTdGF0ZS5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuXG4gICAgICAgICAgICBsZXQgaXRlbUJlZm9yZVJvdXRlID0gTGlzdFdyYXBwZXIubGFzdDxFdmVudD4odGhpcy5yb3V0aW5nU3RhdGUpO1xuXG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5jdXJyZW50U3RhdGVGcm9tKSAmJiBpc1ByZXNlbnQoaXRlbUJlZm9yZVJvdXRlKSAmJiBpc1ByZXNlbnQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRnJvbSkgJiYgaXRlbUJlZm9yZVJvdXRlIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCB8fFxuICAgICAgICAgICAgICAgIGl0ZW1CZWZvcmVSb3V0ZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5zZXQoaXRlbUJlZm9yZVJvdXRlLnVybCwgdGhpcy5jdXJyZW50U3RhdGVGcm9tKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUZyb20gPSBudWxsO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLmN1cnJlbnRTdGF0ZVRvKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDYWNoZUhpc3Rvcnkuc2V0KGV2ZW50LnVybCwgdGhpcy5jdXJyZW50U3RhdGVUbyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVUbyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZW5pZW50IEdPIEJBQ0sgbWV0aG9kLiB3aGljaCB0YWtlcyB5b3UgdG8gcHJldmlvdXMgcm91dGUgYWxvbmcgd2l0aCB0aGUgVVJMIGNoYW5nZS5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgZ29CYWNrKG51bU9mU3RlcHM6IG51bWJlciA9IDEpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyB3ZSBhcmUgc3RhcnRpbmcgZnJvbSAtMSBhcyB3ZSBuZWVkIHRvIGFsc28gcmVtb3ZlIGN1cnJlbnQgcm91dGVcbiAgICAgICAgbGV0IHN0ZXBzID0gLTE7XG4gICAgICAgIGxldCBuYXZpZ2F0ZVVybCA9ICcvNDA0JztcbiAgICAgICAgd2hpbGUgKHN0ZXBzICE9PSBudW1PZlN0ZXBzKSB7XG4gICAgICAgICAgICBsZXQgcG9wU3RhdGUgPSB0aGlzLnJvdXRpbmdTdGF0ZS5wb3AoKTtcbiAgICAgICAgICAgIGlmIChwb3BTdGF0ZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQgfHwgcG9wU3RhdGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpIHtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0ZVVybCA9IHBvcFN0YXRlLnVybDtcbiAgICAgICAgICAgICAgICBzdGVwcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChuYXZpZ2F0ZVVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIG5hdmlnYXRpbmcgdG8gYSBuZXcgUGFnZSB5b3UgY2FuIHVzZSBkaXJlY3RseSByb3V0ZXIgb3IgaWYgeW91IHdhbnQgdG8gcmVtZW1iZXIgc29tZVxuICAgICAqIHN0YXRlIHRuZSB0aGlzIG1ldGhvZCBjYW4gYmUgdXNlZCBhcyB3ZWxsLlxuICAgICAqXG4gICAgICovXG4gICAgbmF2aWdhdGU8VD4oY29tbWFuZHM6IGFueVtdLCBzdGF0ZT86IFQsIGV4dHJhcz86IE5hdmlnYXRpb25FeHRyYXMpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUZyb20gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoY29tbWFuZHMsIGV4dHJhcyk7XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIG5hdmlnYXRpbmcgdG8gYSBuZXcgUGFnZSB5b3UgY2FuIHVzZSBkaXJlY3RseSByb3V0ZXIgb3IgaWYgeW91IHdhbnQgdG8gcmVtZW1iZXIgc29tZVxuICAgICAqIHN0YXRlIHRuZSB0aGlzIG1ldGhvZCBjYW4gYmUgdXNlZCBhcyB3ZWxsLlxuICAgICAqXG4gICAgICovXG4gICAgbmF2aWdhdGVXaXRoUm91dGU8VD4ocm91dGU6IFJvdXRlLCBwYXJhbXM/OiBhbnksIHN0YXRlPzogVCwgZXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlVG8gPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JvdXRlLnBhdGgsIHBhcmFtc10sIGV4dHJhcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBFbnRyeSBtZXRob2QgZm9yIGJyb2FkY2FzdGluZyBzdGF0ZUNhY2hlIGFuZCBzZW5kaW5nIHNhdmVkIFN0YXRlIGJhY2sgdG8gdGhlIHBhZ2VcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgYmluZFN0YXRlQ2FjaGU8VD4obGlzdGVuZXI6IChpdGVtOiBUKSA9PiB2b2lkKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNhY2hlLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoc3RhdGVJdGVtOiBUKSA9PiBsaXN0ZW5lcihzdGF0ZUl0ZW0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBzbyBjaGVjayBleHRyYSBwYXJhbWV0ZXJzIHdoaWNoIGFyZSBwYXNzZWQgdXNpbmcgTWF0cml4IG5vdGF0aW9uXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIG9wZXJhdGlvbihyb3V0ZTogQWN0aXZhdGVkUm91dGUpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBvcGVyYXRpb24gPSByb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ28nXTtcbiAgICAgICAgcmV0dXJuIGlzQmxhbmsoXG4gICAgICAgICAgICBvcGVyYXRpb24pIHx8IChvcGVyYXRpb24gIT09ICd2aWV3JyAmJiBvcGVyYXRpb24gIT09ICdjcmVhdGUnICYmIG9wZXJhdGlvbiAhPT0gJ2VkaXQnKVxuICAgICAgICAgICAgPyAndmlldycgOiBvcGVyYXRpb247XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBc3NlbWJsZXMgYSBwYXRoIGJhc2VkIG9uIHRoZSBjdXJyZW50IHJvdXRlLlxuICAgICAqXG4gICAgICovXG4gICAgcGF0aEZvclBhZ2UocGFnZU5hbWU6IHN0cmluZywgcGF0aE5hbWU6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90LnVybH0vJHtwYXRoTmFtZX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VhcmNoIHRvcCBsZXZlbCByb3V0ZXMgYW5kIHJldHVybiBSb3V0ZSB0aGF0IGhhcyBjb21wb25lbnQgbmFtZSBlcXVhbCB0byBwYWdlTmFtZVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICByb3V0ZUZvclBhZ2UocGFnZU5hbWU6IHN0cmluZywgcGF0aE5hbWU/OiBzdHJpbmcsIGFjdGl2YXRlZFBhdGg/OiBzdHJpbmcpOiBSb3V0ZVxuICAgIHtcbiAgICAgICAgbGV0IG5leHRSb3V0ZTogYW55O1xuICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgYXMgd2UgbmVlZCB0byBsb29rdXAgaWYgdGhlcmUgaXMgYW55IHJvdXRlIHdpdGggZ2l2ZW4gcGFnZU5hbWUgYXNcbiAgICAgICAgLy8gY2hpbGQgcm91dGUsIGlmIG5vdCBzZWFyY2ggZm9yIGdsb2JhbCBvbmNlc1xuXG4gICAgICAgIGxldCBub3JtYWxpemVkUGF0aCA9IGFjdGl2YXRlZFBhdGguaW5kZXhPZignLycpID09PSAwID8gYWN0aXZhdGVkUGF0aC5zdWJzdHJpbmcoMSkgOlxuICAgICAgICAgICAgYWN0aXZhdGVkUGF0aDtcblxuICAgICAgICBsZXQgY3VycmVudFJvdXRlOiBSb3V0ZSA9IHRoaXMucm91dGVyLmNvbmZpZy5maW5kKChyOiBSb3V0ZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgcm91dGVQYXRoID0gci5wYXRoLmluZGV4T2YoJy8nKSA9PT0gMCA/IHIucGF0aC5zdWJzdHJpbmcoMSkgOlxuICAgICAgICAgICAgICAgICAgICByLnBhdGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzUHJlc2VudChub3JtYWxpemVkUGF0aCkgJiYgbm9ybWFsaXplZFBhdGggPT09IHJvdXRlUGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvLyB0cnkgdG8gbWF0Y2ggdGhlIHBhdGggYW5kIGV4cGVjdGVkIHBhZ2VOYW1lXG4gICAgICAgIGlmIChpc1ByZXNlbnQocGF0aE5hbWUpICYmIGlzUHJlc2VudChjdXJyZW50Um91dGUpICYmIGN1cnJlbnRSb3V0ZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIG5leHRSb3V0ZSA9IGN1cnJlbnRSb3V0ZS5jaGlsZHJlbi5maW5kKChyOiBSb3V0ZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50TmFtZSA9IHIuY29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoTmFtZSA9PT0gci5wYXRoICYmIHBhZ2VOYW1lID09PSBjb21wb25lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHBhZ2VOYW1lKSkge1xuXG4gICAgICAgICAgICBuZXh0Um91dGUgPSB0aGlzLnJvdXRlci5jb25maWcuZmluZCgocjogUm91dGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudE5hbWUgPSByLmNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aE5hbWUgPT09IHIucGF0aCAmJiBwYWdlTmFtZSA9PT0gY29tcG9uZW50TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHBhdGggbm90IGZvdW5kIHRoZW4gY2hlY2sgb25seSBpZiB3ZSBmaW5kIGFueXdoZXJlIGluIHRoZSBwYXRoIHBhZ2VOYWVcbiAgICAgICAgaWYgKGlzQmxhbmsobmV4dFJvdXRlKSkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIuY29uZmlnLmZvckVhY2goKHI6IFJvdXRlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoci5jb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnROYW1lID0gci5jb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWdlTmFtZSA9PT0gY29tcG9uZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvdXRlID0gcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0Um91dGU7XG4gICAgfVxuXG59XG5cblxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogTm90aWZpY2F0aW9ucyBzZXJ2aWNlIGlzIGEgaW1wbGVtZW50YXRpb24gb2YgdGhlIHB1Ymxpc2gvc3Vic2NyaWJlIGV2ZW50IGJ1cyBmb3IgcHVibGlzaGluZ1xuICogYW5kIGxpc3RlbmluZyBmb3IgYXBwbGljYXRpb24gbGV2ZWwgZXZlbnRzLlxuICpcbiAqIFRvIHN1YnNjcmliZSB0byBzcGVjaWZpYyBldmVudCBlLmcuIFVzZXIgTG9nZ2VkIEluIHdoZXJlIHRvcGljIGlzIGNhbGxlZCB1c2VyOnNpZ25lZEluXG4gKlxuICpcbiAqIGBgYHRzXG4gKlxuICogICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICBzZWxlY3RvcjogJ215LWNvbXAnLFxuICogICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgIEhlbGxvXG4gKiAgICAgICAgICAgICBgXG4gKiAgICAgfSlcbiAqICAgICBjbGFzcyBNeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveVxuICogICAgIHtcbiAqXG4gKiAgICAgICAgc3Vic2NyOiBTdWJzY3JpcHRpb247XG4gKlxuICogICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbnMpIHtcbiAqXG4gKiAgICAgICAgICAgICAgdGhpcy5zdWJzY3IgPSBub3RpZmljYXRpb25zLnN1YnNjcmliZSgndXNlcjpzaWduZWRJbicsIChtZXNzYWdlOiBhbnkpID0+XG4gKiAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAvLyBsb2FkIHVzZXIgcHJvZmlsZVxuICogICAgICAgICAgICAgIH0pO1xuICogICAgICAgICB9XG4gKlxuICogICAgICAgICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICogICAgICAgICAge1xuICogICAgICAgICAgICAgdGhpcy5zdWJzY3IudW5zdWJzY3JpYmUoKTtcbiAqICAgICAgICAgIH1cbiAqXG4gKlxuICpcbiAqICAgICB9XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqIFRvIHB1Ymxpc2ggZXZlbnQ6XG4gKlxuICogYGBgXG4gKiAgICAgbGV0IG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbjtcbiAqICAgICBub3RpZmljYXRpb25zLnB1Ymxpc2goJ3VzZXI6c2lnbmVkSW4nLCAnVXNlciBqdXN0IHNpZ25lZCBpbicpO1xuICpcbiAqIGBgYFxuICpcbiAqIFlvdSBjYW4gY3JlYXRlIGFuZCBsaXN0ZW4gZm9yIHlvdXIgb3duIGFwcGxpY2F0aW9uIGxldmVsIGV2ZW50cyBvciB5b3UgY2FuIGFsc28gbGlzdGVuIGZvciBhbGxcbiAqIHRoZSB0b3BpY3MgaW4gdGhlIGFwcGxpY2F0aW9uIGlmIHlvdSB1c2UgIGAqYCBhcyBhcHBsaWNhdGlvbiB0b3BpY1xuICpcbiAqIFVuc3Vic2NyaWJpbmcgaXMgcmVzcG9uc2liaWxpdHkgIG9mIGVhY2ggc3Vic2NyaWJlclxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbnNcbntcblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhpcyBpcyB1c2VkIGFzIGEgdG9waWMgc3Vic2NyaWJlciByZWNlaXZlcyBhbGwgbWVzc2FnZXNcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBBbGxUb3BpY3MgPSAnKic7XG5cbiAgICAvKipcbiAgICAgKiBPYnNlcnZhYmxlIHVzZWQgdG8gcHVibGlzaCBhbmQgc3Vic2NyaWJlIHRvIGFwcGxpY2F0aW9uIGxldmVsIGV2ZW50c1xuICAgICAqL1xuICAgIHByaXZhdGUgZXZlbnRzOiBTdWJqZWN0PE1lc3NhZ2U+O1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBTdWJqZWN0PE1lc3NhZ2U+KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTdWJzY3JpYmUgdG8gc3BlY2lmaWMgbGlzdGVuZXIgYmFzZWQgb24gZ2l2ZW4gdG9waWMuXG4gICAgICpcbiAgICAgKi9cbiAgICBzdWJzY3JpYmUodG9waWM6IHN0cmluZywgc3Vic2NyaWJlcjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiBTdWJzY3JpcHRpb25cbiAgICB7XG4gICAgICAgIGNvbnN0IHRvQWxsID0gTm90aWZpY2F0aW9ucy5BbGxUb3BpY3M7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIobXNnID0+IG1zZy50b3BpYyA9PT0gdG9waWMgfHwgdG9waWMgPT09IHRvQWxsKSxcbiAgICAgICAgICAgIG1hcCgobXNnOiBNZXNzYWdlKSA9PiBtc2cuY29udGVudClcblxuICAgICAgICApLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFB1Ymxpc2ggbmV3IGV2ZW50IHRvIGEgdG9waWNcbiAgICAgKlxuICAgICAqL1xuICAgIHB1Ymxpc2godG9waWM6IHN0cmluZywgbWVzc2FnZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IG1zZzogTWVzc2FnZSA9IHt0b3BpYzogdG9waWMsIGNvbnRlbnQ6IG1lc3NhZ2V9O1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG1zZyk7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKlxuICogQmFzZSBjbGFzcyBmb3IgZ2VuZXJpYyBtZXNzYWdlXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VcbntcbiAgICB0b3BpYzogc3RyaW5nO1xuICAgIGNvbnRlbnQ6IGFueTtcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uc30gZnJvbSAnLi9tZXNzYWdpbmcvbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICcuL3V0aWxzL2xhbmcnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxFcnJvckhhbmRsZXIgZXh0ZW5kcyBFcnJvckhhbmRsZXJcbntcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25zPzogTm90aWZpY2F0aW9ucylcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSlcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5ub3RpZmljYXRpb25zKSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnB1Ymxpc2goJ2FwcDplcnJvcicsIGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Um91dGVyTW9kdWxlLCBSb3V0ZXN9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge05vdEZvdW5kQ29tcG9uZW50fSBmcm9tICcuL25vdC1mb3VuZC9ub3QtZm91bmQuY29tcG9uZW50JztcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAge3BhdGg6ICdub3QtZm91bmQnLCBjb21wb25lbnQ6IE5vdEZvdW5kQ29tcG9uZW50fVxuXTtcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtSb3V0ZXJNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgQXJpYmFDb3JlUm91dGluZ01vZHVsZVxue1xufVxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEh0dHBFcnJvclJlc3BvbnNlLFxuICAgIEh0dHBFdmVudCxcbiAgICBIdHRwSGFuZGxlcixcbiAgICBIdHRwSW50ZXJjZXB0b3IsXG4gICAgSHR0cFJlcXVlc3QsXG4gICAgSHR0cFJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3Rocm93RXJyb3IgYXMgb2JzZXJ2YWJsZVRocm93RXJyb3IsIG9mIGFzIG9ic2VydmFibGVPZiwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICcuLi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgaXNTdHJpbmd9IGZyb20gJy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vZG9tYWluL3Jlc291cmNlLnNlcnZpY2UnO1xuXG5cbi8qKlxuICogVHlwZWQgaW50ZXJmYWNlZCB0byBwcm9jZXNzIGVhc2llciByb3V0ZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2NrUm91dGVzXG57XG4gICAgcmVzb3VyY2U6IHN0cmluZztcbiAgICByb3V0ZXM6IE1vY2tSb3V0ZVtdO1xufVxuZXhwb3J0IGludGVyZmFjZSBNb2NrUm91dGVcbntcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgbWV0aG9kOiBzdHJpbmc7XG4gICAgcmVzcG9uc2VDb2RlOiBudW1iZXI7XG4gICAgcmVzcG9uc2VUZXh0OiBzdHJpbmc7XG4gICAgZGF0YTogYW55IHwgbnVsbDtcbn1cblxuLyoqXG4gKiBJbnRlcmNlcHRvciBwcm92aWRpbmcgTW9jayBTZXJ2ZXIgZnVuY3Rpb25hbGl0eSBhbmQgaXMgaW5zZXJ0ZWQgb25seSBhbmQgaWYgbW9jayBzZXJ2ZXIgaXNcbiAqIGVuYWJsZWQgdXNpbmcgQXBwQ29uZmlnJ3MgY29ubmVjdGlvbi5tb2NrLXNlcnZlci5lbmFibGVkIGJvb3RzdHJhcCBwcm9wZXJ0eVxuICpcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwTW9ja0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yXG57XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZXMgbG9hZGVkIHJvdXRlcyBieSBnaXZlbiBlbnRpdHkgbmFtZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHJvdXRlc0J5RW50aXR5OiBNYXA8c3RyaW5nLCBNb2NrUm91dGVbXT4gPSBuZXcgTWFwPHN0cmluZywgTW9ja1JvdXRlW10+KCk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwQ29uZmlnOiBBcHBDb25maWcpXG4gICAge1xuXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSWYgcm91dGUgaXMgZm91bmQgcmV0dXJuZWQgTW9jayByZXN1bGVkIGRlZmluZWQgaW4gdGhlIEpTT04gZmlsZXMsIG90aGVyd2lzZSBwYXNzXG4gICAgICogdGhlIHJlcXVlc3QgdG8gdGhlIG5leHQgaW50ZXJjZXB0b3IuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj5cbiAgICB7XG5cbiAgICAgICAgbGV0IG1vY2tlZFJlc3AgPSB0aGlzLm1ha2VSZXMocmVxKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KG1vY2tlZFJlc3ApKSB7XG5cbiAgICAgICAgICAgIGlmIChtb2NrZWRSZXNwLnN0YXR1cyA+PSAyMDAgJiYgbW9ja2VkUmVzcC5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKDxIdHRwUmVzcG9uc2U8YW55Pj5tb2NrZWRSZXNwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGVycnJvciA9IG5ldyBIdHRwRXJyb3JSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBtb2NrZWRSZXNwLmJvZHksXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogbW9ja2VkUmVzcC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IG1vY2tlZFJlc3Auc3RhdHVzVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiByZXEudXJsV2l0aFBhcmFtc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGVUaHJvd0Vycm9yKGVycnJvcik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQmFzZWQgb24gdXNlciBjb25maWd1cmF0aW9uIHdlIGxvYWQgYWxsIHRoZSBhdmFpbGFibGUgcm91dGVzIGFuZCByZWdpc3RlciB0aGVtIGludG9cbiAgICAgKiBgdGhpcy5yb3V0ZXNCeUVudGl0eWBcbiAgICAgKlxuICAgICAqL1xuICAgIGxvYWRSb3V0ZXMoKVxuICAgIHtcbiAgICAgICAgbGV0IHJvdXRlczogc3RyaW5nW10gPSB0aGlzLmFwcENvbmZpZy5nZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25Nb2NrU2VydmVyUm91dGVzKTtcbiAgICAgICAgZm9yIChsZXQgcm91dGVOYW1lIG9mIHJvdXRlcykge1xuICAgICAgICAgICAgbGV0IHJlcTogSHR0cFJlcXVlc3Q8YW55PiA9IHRoaXMubWFrZVJlcShyb3V0ZU5hbWUpO1xuXG4gICAgICAgICAgICAvLyBsZXQncyBtYWtlIHF1aWNrIGFuZCBkaXJ0eSBhc3luYyBjYWxsIHRvIGxvYWQgb3VyIHJvdXRlcyBiZWZvcmUgYW55dGhpbmcgZWxzZVxuICAgICAgICAgICAgbGV0IG1vY2tlZDogTW9ja1JvdXRlcyA9IHRoaXMucmVxdWVzdEZvclJvdXRlcyhyZXEpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXNCeUVudGl0eS5zZXQobW9ja2VkLnJlc291cmNlLCBtb2NrZWQucm91dGVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGNvbmZpZ3VyYXRpb24gYmFzZWQgb24gbW9jayBKU09OIGZpbGVzLlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXF1ZXN0Rm9yUm91dGVzKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE1vY2tSb3V0ZXNcbiAgICB7XG5cbiAgICAgICAgbGV0IHhtbEh0dHBSZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXG4gICAgICAgIHhtbEh0dHBSZXEub3BlbihyZXEubWV0aG9kLCByZXEudXJsV2l0aFBhcmFtcywgZmFsc2UpO1xuXG4gICAgICAgIHJlcS5oZWFkZXJzLmtleXMoKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGFsbCA9IHJlcS5oZWFkZXJzLmdldEFsbChrZXkpO1xuICAgICAgICAgICAgeG1sSHR0cFJlcS5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIGFsbC5qb2luKCcsJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgeG1sSHR0cFJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyk7XG4gICAgICAgIHhtbEh0dHBSZXEuc2VuZChudWxsKTtcblxuXG4gICAgICAgIGxldCBib2R5ID0gaXNCbGFuayh4bWxIdHRwUmVxLnJlc3BvbnNlKSA/IHhtbEh0dHBSZXEucmVzcG9uc2VUZXh0IDpcbiAgICAgICAgICAgIHhtbEh0dHBSZXEucmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKHhtbEh0dHBSZXEuc3RhdHVzIDwgMjAwICYmIHhtbEh0dHBSZXEuc3RhdHVzID49IDMwMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbG9hZCBNb2NrIHNlcnZlciBjb25maWd1cmF0aW9uLiBQbGVhc2UgbWFrZSBzdXJlIHRoYXQgeW91JyArXG4gICAgICAgICAgICAgICAgJyBoYXZlIGEgbW9jay1yb3V0aW5nLyBmb2xkZXIgdW5kZXIgeW91ciBhc3NldHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc1N0cmluZyhib2R5KSA/IEpTT04ucGFyc2UoYm9keSkgOiBib2R5O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDcmVhdGUgYSByZXF1ZXN0cyB0byBsb2FkIHJvdXRlc1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBtYWtlUmVxKHJvdXRlTmFtZTogc3RyaW5nKTogSHR0cFJlcXVlc3Q8YW55PlxuICAgIHtcbiAgICAgICAgbGV0IGFzc2V0Rm9sZGVyOiBzdHJpbmcgPSB0aGlzLmFwcENvbmZpZy5nZXQoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyKTtcbiAgICAgICAgbGV0IHBhdGg6IHN0cmluZyA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQ29ubmVjdGlvbk1vY2tTZXJ2ZXJQYXRoKTtcblxuICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXF1ZXN0KCdHRVQnLCBgJHthc3NldEZvbGRlcn0ke3BhdGh9LyR7cm91dGVOYW1lfS5qc29uYCwge1xuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbidcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gd2UgYXJlIGNyZWF0aW5nIGEgcmVzcG9uc2Ugd2UgYWx3YXlzIGV4cGVjdCB0d28gdGhpbmdzOlxuICAgICAqIDEpIFdlIGFyZSBkZWFsaW5nIHdpdGggRW50aXR5XG4gICAgICogMikgUkVTVCBBUEkgaXMgaGFuZGxlZCB1c2luZyBSZXNvdXJjZSB3aGljaCBwcmVwZW5kIC9tb2NrZWQvXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG1ha2VSZXMocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogSHR0cFJlc3BvbnNlPGFueT5cbiAgICB7XG4gICAgICAgIGxldCByZXNwb25zZU9wOiBIdHRwUmVzcG9uc2U8YW55PjtcblxuICAgICAgICBsZXQgcGF0aCA9IHJlcS51cmxXaXRoUGFyYW1zLnN1YnN0cmluZyhyZXEudXJsLmluZGV4T2YoJ21vY2tlZCcpICsgNik7XG4gICAgICAgIGxldCByZXNvdXJjZSA9IHBhdGguc3Vic3RyaW5nKDEpO1xuICAgICAgICBpZiAocmVzb3VyY2UuaW5kZXhPZignLycpICE9PSAtMSkge1xuICAgICAgICAgICAgcmVzb3VyY2UgPSByZXNvdXJjZS5zdWJzdHJpbmcoMCwgcmVzb3VyY2UuaW5kZXhPZignLycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJvdXRlc0J5RW50aXR5LmhhcyhyZXNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlT3AgPSB0aGlzLmRvSGFuZGxlUmVxdWVzdChyZXEsIHBhdGgsIHJlc291cmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHJlc3BvbnNlT3ApICYmIHRoaXMuYXBwQ29uZmlnLmdldEJvb2xlYW4oQXBwQ29uZmlnLkluVGVzdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBib2R5OiB7fSwgc3RhdHVzOiA0MDQsIHN0YXR1c1RleHQ6ICdOb3QgRm91bmQnLFxuICAgICAgICAgICAgICAgIHVybDogcmVxLnVybFdpdGhQYXJhbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZU9wO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBjb250ZW50IGZyb20gdGhlIHJvdXRlcyAtPiByb3V0ZSBhcyBpdCBhcyBhbmQgcmV0dXJuIGl0IGFzIGFcbiAgICAgKiByZXNwb25zZVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBkb0hhbmRsZVJlcXVlc3QocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBwYXRoOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2U6IHN0cmluZyk6IEh0dHBSZXNwb25zZTxhbnk+XG4gICAge1xuICAgICAgICBsZXQgcm91dGVzOiBNb2NrUm91dGVbXSA9IHRoaXMucm91dGVzQnlFbnRpdHkuZ2V0KHJlc291cmNlKTtcblxuICAgICAgICBsZXQgbWF0Y2hlZFJvdXRlID0gcm91dGVzLmZpbmRJbmRleCgoZWw6IE1vY2tSb3V0ZSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHJlcS5tZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gZWwubWV0aG9kLnRvTG93ZXJDYXNlKCkgJiYgZWwucGF0aCA9PT0gcGF0aDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1hdGNoZWRSb3V0ZSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCByb3V0ZTogTW9ja1JvdXRlID0gcm91dGVzW21hdGNoZWRSb3V0ZV07XG5cbiAgICAgICAgICAgIGxldCBwYXlsb2FkOiBSZXNwb25zZTxhbnk+ID0ge1xuICAgICAgICAgICAgICAgIHBheWxvYWQ6ICByb3V0ZS5kYXRhXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXNwb25zZTxSZXNwb25zZTxhbnk+Pih7XG4gICAgICAgICAgICAgICAgYm9keTogcGF5bG9hZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHJvdXRlLnJlc3BvbnNlQ29kZSxcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiByb3V0ZS5yZXNwb25zZVRleHQsXG4gICAgICAgICAgICAgICAgdXJsOiByb3V0ZS5wYXRoXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIEh0dHBIYW5kbGVyIHNvIHdlIGNhbiBoYXZlIGN1c3RvbSBiZWhhdmlvciB0byBIVFRQQ2xpZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBNb2NrSW50ZXJjZXB0b3JIYW5kbGVyIGltcGxlbWVudHMgSHR0cEhhbmRsZXJcbntcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5leHQ6IEh0dHBIYW5kbGVyLCBwcml2YXRlIGludGVyY2VwdG9yOiBIdHRwSW50ZXJjZXB0b3IpXG4gICAge1xuICAgIH1cblxuICAgIGhhbmRsZShyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJjZXB0b3IuaW50ZXJjZXB0KHJlcSwgdGhpcy5uZXh0KTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge01ldGEsIFRpdGxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7XG4gICAgQVBQX0lOSVRJQUxJWkVSLFxuICAgIEVycm9ySGFuZGxlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5qZWN0b3IsXG4gICAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgICBOZ01vZHVsZSxcbiAgICBPcHRpb25hbCxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgSHR0cEJhY2tlbmQsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBIdHRwSGFuZGxlcixcbiAgICBIdHRwSW50ZXJjZXB0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0FwcENvbmZpZywgbWFrZUNvbmZpZ30gZnJvbSAnLi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICcuL2NvbmZpZy9lbnZpcm9ubWVudCc7XG5pbXBvcnQge05vdEZvdW5kQ29tcG9uZW50fSBmcm9tICcuL25vdC1mb3VuZC9ub3QtZm91bmQuY29tcG9uZW50JztcbmltcG9ydCB7Um91dGluZ1NlcnZpY2V9IGZyb20gJy4vcm91dGluZy9yb3V0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHtHbG9iYWxFcnJvckhhbmRsZXJ9IGZyb20gJy4vZ2xvYmFsLWVycm9yLWhhbmRsZXInO1xuaW1wb3J0IHtBcmliYUNvcmVSb3V0aW5nTW9kdWxlfSBmcm9tICcuL2FyaWJhLWNvcmUtcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zfSBmcm9tICcuL21lc3NhZ2luZy9ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHtIdHRwTW9ja0ludGVyY2VwdG9yLCBNb2NrSW50ZXJjZXB0b3JIYW5kbGVyfSBmcm9tICcuL2h0dHAvaHR0cC1tb2NrLWludGVyY2VwdG9yJztcbmltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4vZG9tYWluL3Jlc291cmNlLnNlcnZpY2UnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBjb25zdCBVc2VyQ29uZmlnID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1VzZXJDb25maWcnKTtcblxuXG4vKipcbiAqIENvcmUgbW9kZSBpbmNsdWRlcyBhbGwgc2hhcmVkIGxvZ2ljIGFjY3Jvc3Mgd2hvbGUgYXBwbGljYXRpb25cbiAqL1xuICAgIC8vIHRvZG86IGZvciBBT1QgdXNlIGV4cG9ydGVkIGZ1bmN0aW9ucyBmb3IgZmFjdG9yaWVzIGluc3RlYWRzIHRoaXMgaW5saW5lIG9uZXMuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBBcmliYUNvcmVSb3V0aW5nTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtOb3RGb3VuZENvbXBvbmVudF0sXG5cbiAgICBib290c3RyYXA6IFtdXG5cbn0pXG5leHBvcnQgY2xhc3MgQXJpYmFDb3JlTW9kdWxlIHtcblxuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQXJpYmFDb3JlTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgVGl0bGUsXG4gICAgICAgICAgICAgICAgTWV0YSxcbiAgICAgICAgICAgICAgICBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb25zLFxuICAgICAgICAgICAgICAgIEh0dHBNb2NrSW50ZXJjZXB0b3IsXG5cbiAgICAgICAgICAgICAgICBSZXNvdXJjZSxcblxuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBVc2VyQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IEFwcENvbmZpZywgdXNlRmFjdG9yeTogbWFrZUNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1VzZXJDb25maWcsIEluamVjdG9yLCBFbnZpcm9ubWVudF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogSHR0cEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IG1ha2VIdHRwQ2xpZW50SGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgSHR0cEJhY2tlbmQsIEFwcENvbmZpZywgSHR0cE1vY2tJbnRlcmNlcHRvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZXcgT3B0aW9uYWwoKSwgbmV3IEluamVjdChIVFRQX0lOVEVSQ0VQVE9SUyldXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBHbG9iYWxFcnJvckhhbmRsZXIsIGRlcHM6IFtOb3RpZmljYXRpb25zXX0sXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IFJvdXRpbmdTZXJ2aWNlLCB1c2VDbGFzczogUm91dGluZ1NlcnZpY2UsIGRlcHM6IFtSb3V0ZXJdfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBBcmliYUNvcmVNb2R1bGUsIHByaXZhdGUgY29uZjogQXBwQ29uZmlnKSB7XG5cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqXG4gKiBBZGQgY3VzdG9tIE1vY2sgZnVuY3Rpb25hbGl0eSBvbmx5IGFuZCBpZiB3ZSBlbmFibGVkIHRoaXMgaW4gdGhlIHNldHRpbmdzLiBJIGRvbnQgcmVhbGx5IHdhbnQgdG9cbiAqIGhhdmUgTm9vcEludGVyY2VwdGVyIGluIHRoZSBjaGFpblxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VIdHRwQ2xpZW50SGFuZGxlcihuZ0JhY2tlbmQ6IEh0dHBCYWNrZW5kLCBjb25maWc6IEFwcENvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ja0ludGVyY2VwdG9yOiBIdHRwTW9ja0ludGVyY2VwdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmNlcHRvcnM6IEh0dHBJbnRlcmNlcHRvcltdIHwgbnVsbCA9IFtdKTogSHR0cEhhbmRsZXIge1xuICAgIGlmIChjb25maWcuZ2V0Qm9vbGVhbihBcHBDb25maWcuQ29ubmVjdGlvblVzZU1vY2tTZXJ2ZXIpKSB7XG5cbiAgICAgICAgbW9ja0ludGVyY2VwdG9yLmxvYWRSb3V0ZXMoKTtcbiAgICAgICAgaW50ZXJjZXB0b3JzID0gWy4uLmludGVyY2VwdG9ycywgbW9ja0ludGVyY2VwdG9yXTtcbiAgICB9XG5cbiAgICBpZiAoIWludGVyY2VwdG9ycykge1xuICAgICAgICByZXR1cm4gbmdCYWNrZW5kO1xuICAgIH1cbiAgICByZXR1cm4gaW50ZXJjZXB0b3JzLnJlZHVjZVJpZ2h0KFxuICAgICAgICAobmV4dCwgaW50ZXJjZXB0b3IpID0+IG5ldyBNb2NrSW50ZXJjZXB0b3JIYW5kbGVyKG5leHQsIGludGVyY2VwdG9yKSwgbmdCYWNrZW5kKTtcbn1cblxuXG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCAqIGFzIG9iamVjdFBhdGggZnJvbSAnb2JqZWN0LXBhdGgnO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1N0cmluZywgaXNTdHJpbmdNYXB9IGZyb20gJy4vbGFuZyc7XG5cblxuLyoqXG4gKiBUaGUgRmllbGRQYXRoIGlzIHV0aWxpdHkgY2xhc3MgZm9yIHJlcHJlc2VudGluZyBvZiBhIGRvdHRlZCBmaWVsZFBhdGguXG4gKlxuICogQSBTdHJpbmcgc3VjaCBhcyBcImZvby5iYXIuYmF6XCIgY2FuIGJlIHVzZWQgdG8gYWNjZXNzIGEgdmFsdWUgb24gYSB0YXJnZXQgb2JqZWN0LlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkUGF0aFxue1xuICAgIF9maWVsZFBhdGhzOiBzdHJpbmdbXTtcbiAgICBwcml2YXRlIG9iamVjdFBhdGhJbnN0YW5jZTogYW55O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZXRzIGEgdmFsdWUgdG8gdGFyZ2V0IG9iamVjdHNcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRGaWVsZFZhbHVlKHRhcmdldDogYW55LCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGZwID0gbmV3IEZpZWxkUGF0aChmaWVsZCk7XG4gICAgICAgIGZwLnNldEZpZWxkVmFsdWUodGFyZ2V0LCB2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyBhIHZhbHVlIGZyb20gdGFyZ2V0IG9iamVjdHNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0RmllbGRWYWx1ZSh0YXJnZXQ6IGFueSwgZmllbGQ6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IGZwID0gbmV3IEZpZWxkUGF0aChmaWVsZCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IGZwLmdldEZpZWxkVmFsdWUodGFyZ2V0KTtcblxuICAgICAgICBpZiAoZmllbGQgPT09ICckdG9TdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGF0aDogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5fZmllbGRQYXRocyA9IGlzQmxhbmsoX3BhdGgpID8gW10gOiBfcGF0aC5zcGxpdCgnLicpO1xuICAgICAgICB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZSA9ICg8YW55Pm9iamVjdFBhdGgpWydjcmVhdGUnXSh7aW5jbHVkZUluaGVyaXRlZFByb3BzOiB0cnVlfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIE9uZSBvZiB0aGUgbWFpbiByZWFzb24gd2h5IEkgaGF2ZSB0aGlzIGlzIG5vdCBvbmx5IHRvIGl0ZXJhdGUgdGhydSBkb3R0ZWQgZmllbGQgcGF0aCBidXRcbiAgICAgKiBtYWlubHkgdG8gYmUgYWJsZSB0byBzZXQgbmF0dXJhbGx5IHZhbHVlIGludG8gYSBuZXN0ZWQgbWFwcyBsaWtlIDpcbiAgICAgKlxuICAgICAqICBmaWVsZE5hbWUuZmllbGROYW1lTWFwLmZpZWxkS2V5ID0+IGl0IHdpbGwgYWNjZXNzIGZpZWxkTmFtZSBvbiB0aGUgdGFyZ2V0LCBmcm9tIHRoZXJlIGl0XG4gICAgICogcmVhZHMgRmllbGROYW1lTWFwIHNpbmNlIGZpZWxkTmFtZSBuZXN0ZWQgb2JqZWN0cyBhbmQgc2V0cyBhIG5ldyB2YWx1ZSBpZGVudGlmaWVkIGJ5IE1hcCBrZXlcbiAgICAgKiBmaWVsZEtleVxuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqICBjbGFzcyBNeUNsYXNzIHtcbiAgICAgKiAgICAgIGZpZWxkTmFtZTpOZXN0ZWRPYmplY3RcbiAgICAgKlxuICAgICAqICB9XG4gICAgICpcbiAgICAgKiAgY2xhc3MgTmVzdGVkT2JqZWN0IHtcbiAgICAgKiAgICAgIGZpZWxkTmFtZU1hcDpNYXA8a2V5LCB2YWx1ZT47XG4gICAgICogIH1cbiAgICAgKlxuICAgICAqICBgYGBcbiAgICAgKiB1c2UgZmllbGQgdmFsdWUgZm9yIGFzc2lnbm1lbnQgc28ga2V5cyBvZiBmb3JtIFwiYS5iLmNcIiB3aWxsIGdvIGluIG5lc3RlZCBNYXBzXG4gICAgICovXG4gICAgc2V0RmllbGRWYWx1ZSh0YXJnZXQ6IGFueSwgdmFsdWU6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIGltcGxlbWVudCB0aGUgc2FtZSB0aGluZyB3aGF0IHdlIGhhdmUgb24gdGhlIGdldCwgaWYgTWFwIHNldCBmaWVsZCBpbnRvIG1hcFxuICAgICAgICBpZiAodGhpcy5fZmllbGRQYXRocy5sZW5ndGggPiAxICYmICEodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSkge1xuXG4gICAgICAgICAgICBsZXQgcGF0aCA9IHRoaXMuX2ZpZWxkUGF0aHMuc2xpY2UoMCwgdGhpcy5fZmllbGRQYXRocy5sZW5ndGggLSAxKS5qb2luKCcuJyk7XG4gICAgICAgICAgICBsZXQgb2JqZWN0VG9CZVVwZGF0ZWQgPSB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZS5nZXQodGFyZ2V0LCBwYXRoKTtcbiAgICAgICAgICAgIGlmIChvYmplY3RUb0JlVXBkYXRlZCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIG9iamVjdFRvQmVVcGRhdGVkLnNldCh0aGlzLl9maWVsZFBhdGhzW3RoaXMuX2ZpZWxkUGF0aHMubGVuZ3RoIC0gMV0sIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RQYXRoSW5zdGFuY2Uuc2V0KHRhcmdldCwgdGhpcy5fcGF0aCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgbGV0IG1hcFRhcmdldDogTWFwPHN0cmluZywgYW55PiA9IHRhcmdldDtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBOZXN0ZWQgTWFwXG4gICAgICAgICAgICBpZiAodGhpcy5fZmllbGRQYXRocy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9maWVsZFBhdGhzLnNwbGljZSgwLCAxKTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSBtYXBUYXJnZXQuZ2V0KHBhdGhbMF0pO1xuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKG5lc3RlZE1hcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmVzdGVkTWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwVGFyZ2V0LnNldChwYXRoWzBdLCBuZXN0ZWRNYXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldEZpZWxkVmFsdWUobmVzdGVkTWFwLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXQodGhpcy5fZmllbGRQYXRoc1swXSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vYmplY3RQYXRoSW5zdGFuY2Uuc2V0KHRhcmdldCwgdGhpcy5fcGF0aCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgcmVhc29uIGFzIGZvciBTZXRGaWVsZFZhbHVlLiBOZWVkIHRvIGJlIGFibGUgdG8gcmVhZCB2YWx1ZSBieSBkb3R0ZWQgcGF0aCBhcyB3ZWxsXG4gICAgICogYXMgcmVhZHkgdmFsdWUgZnJvbSBNYXBzLlxuICAgICAqXG4gICAgICogdG9kbzogdGhpcyBpcyBxdWljayBhbmQgZGlydHkgaW1wbGVtZW50YXRpb24gLSBuZWVkIHRvIHdyaXRlIGJldHRlciBzb2x1dGlvblxuICAgICAqL1xuICAgIGdldEZpZWxkVmFsdWUodGFyZ2V0OiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCB2YWx1ZTogYW55O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2ZpZWxkUGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoaXNTdHJpbmdNYXAodGFyZ2V0KSB8fCBpc1N0cmluZyh0YXJnZXQpKSAmJiAhKHRhcmdldCBpbnN0YW5jZW9mIE1hcCkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMub2JqZWN0UGF0aEluc3RhbmNlLmdldCh0YXJnZXQsIHRoaXMuX2ZpZWxkUGF0aHNbaV0pO1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0TWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGFyZ2V0TWFwLmdldCh0aGlzLl9maWVsZFBhdGhzW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8ganVzdCB0d2VhayB0byBiZSBhYmxlIHRvIGFjY2VzcyBtYXBzIGZpZWxkLnNvbWVNYXBGaWVsZC5tYXBLZXlcbiAgICAgICAgICAgIC8vIEkgd2FudCB0aGlzIHRvIGdldCB0aGUgZWxlbWVudCBmcm9tIHRoZSBtYXBcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiAoaSArIDEpIDwgdGhpcy5fZmllbGRQYXRocy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWFwVmFsdWUgPSA8TWFwPHN0cmluZywgYW55Pj4gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcFZhbHVlLmdldCh0aGlzLl9maWVsZFBhdGhzW2kgKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgZ2V0IHBhdGgoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICAgIH1cblxufVxuXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge2lzQmxhbmt9IGZyb20gJy4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge01ldGEgYXMgTWV0YVRhZ3MsIFRpdGxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7T25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKipcbiAqIE5vdGlvbiBvZiBoYXZpbmcgYEFyaWJhQXBwbGljYXRpb25gIGNsYXNzIGNhbWUgZnJvbSAgYSBzaW1wbGUgcmVxdWlyZW1lbnQgdGhhdCBldmVyeSBzaW5nbGVcbiAqIGFwcGxpY2F0aW9uIG5lZWRzIGEgY29tbW9uIHdheSBob3cgdG8gaW5pdGlhbGl6ZS5cbiAqXG4gKiBXZSB3YW50IHRvIGJlIG1vcmUgYXBwbGljYXRpb24gc3BlY2lmaWMgdGhlcmVmb3JlIHdlIGRvbid0IHdhbnQgdG8gaGF2ZSBnZW5lcmljIG5hbWVzIHN1Y2ggYXNcbiAqIGBhcHAuY29tcG9uZW50IG9yIGFwcC5tb2R1bGVgLCB0aGUgcm9vdCBjb21wb25lbnQgc2hvdWxkIGJlIG5hbWVkIGJhc2VkIG9uIHdoYXQgaXQgaXMgZG9pbmdcbiAqIG9yIHdoYXQgaXMgcmVhbCBhcHBsaWNhdGlvbiBuYW1lIGUuZy46IFRvZG9BcHAsIFNvdXJjaW5nQXBwLCBldGNzLiBhbmQgdGhlc2UgYXBwbGljYXRpb24gd2lsbFxuICogaW5oZXJpdCBmcm9tIGBBcmliYUFwcGxpY2F0aW9uYCB0byBnZXQgc29tZSBjb21tb24gYmVoYXZpb3IuXG4gKlxuICogU3BlY2lmaWMgYXBwbGljYXRpb24gdHlwZXMgd2lsbCBleHRlbmRzIHRoaXMgY2xhc3MgdG8gYWRkIG1vcmUgYmVoYXZpb3IuXG4gKlxuICogVGhlcmUgYXJlIHR3byB0eXBlcyBvZiBib290c3RyYXBwaW5nIGFuZCBwYXNzaW5nIGVudmlyb25tZW50IHBhcmFtZXRlcnMgdG8gdGhlIGFwcGxpY2F0aW9uOlxuICpcbiAqIC0gIER1cmluZyBBcmliYUNvcmVVSSBpbXBvcnQ6XG4gKlxuICogIyMjIGV4YW1wbGVcbiAqXG4gKiBgYGB0c1xuICogICAgICBBcmliYUNvcmVNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgICAgICAgICAgICAgICdhcHAudGl0bGUnOiAnUGxheWdyb3VuZCBBcHBsaWNhdGlvbicsXG4gKiAgICAgICAgICAgICAgICAgICdhc3NldC1mb2xkZXInOiAncGxheWdyb3VuZC9hc3NldHMnLFxuICogICAgICAgICAgICAgICAgICAnbWV0YXVpLnJ1bGVzLmZpbGUtbmFtZXMnOiBbJ0FwcGxpY2F0aW9uJywgJ0xheW91dCddLFxuICogICAgICAgICAgICAgICAgICAncmVzdGFwaS5jb250ZXh0JzogJy9teVNlcnZpY2UvJyxcbiAqICAgICAgICAgICAgICAgICAgJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIuZW5hYmxlZCc6IHRydWUsXG4gKiAgICAgICAgICAgICAgICAgICdjb25uZWN0aW9uLm1vY2stc2VydmVyLnJvdXRlcyc6IFsndXNlcnMnXSxcbiAqICAgICAgICAgICAgICB9KSxcbiAqXG4gKiBgYGBcbiAqICBVc2UgdGhpcyB0byBwYXNzIHNvbWUgc3RhdGljIHByb3BlcnRpZXMuXG4gKlxuICpcbiAqIC0gIEZyb20gQXJpYmFBcHBsaWNhdGlvbiA6XG4gKlxuICogIFdoZW4geW91IGhhdmUgc3BlY2lmaWMgdHlwZSBvZiBhcHBsaWNhdGlvbnMgdGhhdCBuZWVkcyBtb3JlIHNldHRpbmdzIHlvdSBpbmhlcml0IGZyb20gdGhpc1xuICogIGNsYXNzIHRvIGV4dGVuZCBpdHMgYmVoYXZpb3IgYW5kIHRoZW4gdXNlIGl0IGZvciB5b3VyIGFwcGxpY2F0aW9ucyB0byBzaGFyZSBjb21tb24gYmVoYXZpb3JcbiAqXG4gKiAjIyMgZXhhbXBsZVxuICpcbiAqICBgYGB0c1xuICpcbiAqICAgICBleHBvcnQgY2xhc3MgRmFjZWJvb2tBcHBsaWNhdGlvbiBleHRlbmRzIEFyaWJhQXBwbGljYXRpb24ge1xuICpcbiAqICAgICAgICAgcHJvdGVjdGVkIGFwcElkOiBzdHJpbmcgPSAnLi4uLi4nO1xuICpcbiAqXG4gKiAgICAgICAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZSgpOiB2b2lkXG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLmFwcElkID0gcmVhZEFwcElkZnJvbUVudigpO1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLmFwcENvbmZpZy5zZXQoJ2ZhY2Vib29rLmFwcElkJywgdGhpcy5hcHBJZCApO1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRkJBdXRoZW50aWNhdG9yKCk7XG4gKlxuICogICAgICAgICAgfVxuICpcbiAqICAgICB9XG4gKlxuICogIGBgYFxuICogIE9uY2UgeW91IGRlZmluZWQgeW91ciB0eXBlIG9mIGFwcGxpY2F0aW9uLCB0aGVuIHlvdSBjYW4gc3RhcnQgY3JlYXRpbmcgYXBwbGljYXRpb25zIHRoYXQgaW5oZXJpdFxuICogIGZyb20gdGhpcyBgRmFjZWJvb2tBcHBsaWNhdGlvbmAuIFJvb3QgQXBwIGNvbXBvbmVudFxuICpcbiAqXG4gKiBgYGB0c1xuICogICAgICBAQ29tcG9uZW50KHsuLi59KVxuICogICAgICBleHBvcnQgUGljdHVyZUFwcENvbXBvbmVudCBleHRlbmRzIEZhY2Vib29rQXBwbGljYXRpb24ge1xuICogICAgICAgICAgICAgLi4uXG4gKlxuICogICAgICB9XG4gKlxuICpcbiAqXG4gKiAgICAgQE5nTW9kdWxlKHsgYm9vdHN0cmFwOiBbUGljdHVyZUFwcENvbXBvbmVudF0gfSlcbiAqICAgICBleHBvcnQgY2xhc3MgUGljdHVyZUFwcE1vZHVsZSB7XG4gKlxuICogICAgIH1cbiAqXG4gKlxuICogYGBgXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQXJpYmFBcHBsaWNhdGlvbiBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgLyoqXG4gICAgICogVGl0bGUgc2VydmljZSBmb3Igc2V0dGluZyBwYWdlIHRpdGxlXG4gICAgICovXG4gICAgdGl0bGU6IFRpdGxlO1xuXG5cbiAgICAvKipcbiAgICAgKiBNZXRhIHNlcnZpY2UgZm9yIGFkZGluZyBhbmQgdXBkYXRpbmcgcGFnZSBtZXRhIHRhZ3NcbiAgICAgKi9cbiAgICBtZXRhVGFnczogTWV0YVRhZ3M7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhcHBDb25maWc6IEFwcENvbmZpZylcbiAgICB7XG4gICAgICAgIHRoaXMubWV0YVRhZ3MgPSB0aGlzLmFwcENvbmZpZy5pbmplY3Rvci5nZXQoTWV0YVRhZ3MpO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5hcHBDb25maWcuaW5qZWN0b3IuZ2V0KFRpdGxlKTtcblxuXG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGRlZmF1bHQgYmVoYXZpb3IganVzdCBzZXRzIGEgdGl0bGUgZm9yIHRoZSBhcHBsaWNhdGlvblxuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5BcHBUaXRsZSk7XG4gICAgICAgIGlmIChpc0JsYW5rKHRpdGxlKSkge1xuICAgICAgICAgICAgdGl0bGUgPSAnQXJpYmEgQXBwbGljYXRpb24nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGl0bGUuc2V0VGl0bGUodGl0bGUpO1xuXG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIm1hcCIsIkNvbGxlY3Rpb25zLmFycmF5cyIsIm9mIiwib2JzZXJ2YWJsZU9mIiwib2JzZXJ2YWJsZVRocm93RXJyb3IiLCIoLyoqIEB0eXBlIHs/fSAqLyAob2JqZWN0UGF0aCkpWydjcmVhdGUnXSIsIk1ldGFUYWdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFjQSxBQUVBLHVCQUFNLE1BQU0sR0FBRyxjQUFjLENBQUM7Ozs7OztBQVE5Qix1QkFBTSxRQUFRLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQztBQUN6RCx1QkFBTSxPQUFPLEdBQTRCLFFBQVEsQ0FBQzs7Ozs7QUFHbEQseUJBQWdDLE9BQVk7SUFFeEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDM0I7Ozs7O0FBUUQsaUNBQXdDLElBQVM7SUFFN0MsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2QjtJQUNELE9BQU8sT0FBTyxJQUFJLENBQUM7Q0FDdEI7Ozs7QUFFRDtJQUVJLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Q0FDcEM7Ozs7O0FBRUQsbUJBQTBCLEdBQVE7SUFFOUIsT0FBTyxHQUFHLEtB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