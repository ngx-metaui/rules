import { __spread, __extends, __values } from 'tslib';
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
var /** @type {?} */ bigInt = bigIntImported;
/**
 *  Set of reusable globals. This is taken from the Angular 2 since its not exported API. And there
 *  is a need for such common functions and wrappers
 *
 */
var /** @type {?} */ __window = typeof window !== 'undefined' && window;
var /** @type {?} */ _global = __window;
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
var /** @type {?} */ STRING_MAP_PROTO = Object.getPrototypeOf({});
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
    var /** @type {?} */ res = token.toString();
    var /** @type {?} */ newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
/**
 * @param {?} clazz
 * @return {?}
 */
function className(clazz) {
    if (isPresent(clazz.constructor)) {
        var /** @type {?} */ classN = clazz.constructor.toString();
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
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name]
                = baseCtor.prototype[name];
        });
    });
}
var StringWrapper = /** @class */ (function () {
    function StringWrapper() {
    }
    /**
     * @param {?} code
     * @return {?}
     */
    StringWrapper.fromCharCode = /**
     * @param {?} code
     * @return {?}
     */
    function (code) {
        return String.fromCharCode(code);
    };
    /**
     * @param {?} s
     * @param {?} index
     * @return {?}
     */
    StringWrapper.charCodeAt = /**
     * @param {?} s
     * @param {?} index
     * @return {?}
     */
    function (s, index) {
        return s.charCodeAt(index);
    };
    /**
     * @param {?} s
     * @param {?} regExp
     * @return {?}
     */
    StringWrapper.split = /**
     * @param {?} s
     * @param {?} regExp
     * @return {?}
     */
    function (s, regExp) {
        return s.split(regExp);
    };
    /**
     * @param {?} s
     * @param {?} s2
     * @return {?}
     */
    StringWrapper.equals = /**
     * @param {?} s
     * @param {?} s2
     * @return {?}
     */
    function (s, s2) {
        return s === s2;
    };
    /**
     * @param {?} s
     * @param {?} charVal
     * @return {?}
     */
    StringWrapper.stripLeft = /**
     * @param {?} s
     * @param {?} charVal
     * @return {?}
     */
    function (s, charVal) {
        if (s && s.length) {
            var /** @type {?} */ pos = 0;
            for (var /** @type {?} */ i = 0; i < s.length; i++) {
                if (s[i] !== charVal) {
                    break;
                }
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    /**
     * @param {?} s
     * @param {?} charVal
     * @return {?}
     */
    StringWrapper.stripRight = /**
     * @param {?} s
     * @param {?} charVal
     * @return {?}
     */
    function (s, charVal) {
        if (s && s.length) {
            var /** @type {?} */ pos = s.length;
            for (var /** @type {?} */ i = s.length - 1; i >= 0; i--) {
                if (s[i] !== charVal) {
                    break;
                }
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    /**
     * @param {?} s
     * @param {?} from
     * @param {?} replace
     * @return {?}
     */
    StringWrapper.replace = /**
     * @param {?} s
     * @param {?} from
     * @param {?} replace
     * @return {?}
     */
    function (s, from, replace) {
        return s.replace(from, replace);
    };
    /**
     * @param {?} s
     * @param {?} from
     * @param {?} replace
     * @return {?}
     */
    StringWrapper.replaceAll = /**
     * @param {?} s
     * @param {?} from
     * @param {?} replace
     * @return {?}
     */
    function (s, from, replace) {
        return s.replace(from, replace);
    };
    /**
     * @template T
     * @param {?} s
     * @param {?=} from
     * @param {?=} to
     * @return {?}
     */
    StringWrapper.slice = /**
     * @template T
     * @param {?} s
     * @param {?=} from
     * @param {?=} to
     * @return {?}
     */
    function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null ? undefined : to);
    };
    /**
     * @param {?} s
     * @param {?} substr
     * @return {?}
     */
    StringWrapper.contains = /**
     * @param {?} s
     * @param {?} substr
     * @return {?}
     */
    function (s, substr) {
        return s.indexOf(substr) !== -1;
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    StringWrapper.compare = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    /**
     * @param {?} subject
     * @param {?} searchString
     * @param {?=} position
     * @return {?}
     */
    StringWrapper.endsWidth = /**
     * @param {?} subject
     * @param {?} searchString
     * @param {?=} position
     * @return {?}
     */
    function (subject, searchString, position) {
        if (position === void 0) { position = 0; }
        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function (sstring, pos) {
                if (pos === void 0) { pos = 0; }
                var /** @type {?} */ subjectString = this.toString();
                if (typeof pos !== 'number' || !isFinite(pos) || Math.floor(pos) !== pos || pos
                    >
                        subjectString.length) {
                    pos = subjectString.length;
                }
                pos -= sstring.length;
                var /** @type {?} */ lastIndex = subjectString.indexOf(sstring, pos);
                return lastIndex !== -1 && lastIndex === pos;
            };
        }
        return subject.endsWith(searchString);
    };
    /**
     * @param {?} subject
     * @param {?} searchString
     * @return {?}
     */
    StringWrapper.startsWidth = /**
     * @param {?} subject
     * @param {?} searchString
     * @return {?}
     */
    function (subject, searchString) {
        return subject.indexOf(searchString) === 0;
    };
    return StringWrapper;
}());
var StringJoiner = /** @class */ (function () {
    function StringJoiner(parts) {
        if (parts === void 0) { parts = []; }
        this.parts = parts;
    }
    /**
     * @param {?} part
     * @return {?}
     */
    StringJoiner.prototype.add = /**
     * @param {?} part
     * @return {?}
     */
    function (part) {
        this.parts.push(part);
        return this;
    };
    /**
     * @return {?}
     */
    StringJoiner.prototype.last = /**
     * @return {?}
     */
    function () {
        return this.parts[this.parts.length - 1];
    };
    /**
     * @return {?}
     */
    StringJoiner.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this.parts.join('');
    };
    return StringJoiner;
}());
var NumberWrapper = /** @class */ (function () {
    function NumberWrapper() {
    }
    /**
     * @param {?} n
     * @param {?} fractionDigits
     * @return {?}
     */
    NumberWrapper.toFixed = /**
     * @param {?} n
     * @param {?} fractionDigits
     * @return {?}
     */
    function (n, fractionDigits) {
        return n.toFixed(fractionDigits);
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    NumberWrapper.equal = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        return a === b;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    NumberWrapper.parseIntAutoRadix = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        var /** @type {?} */ result = parseInt(text);
        if (isNaN(result)) {
            throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
    };
    /**
     * @param {?} text
     * @param {?} radix
     * @return {?}
     */
    NumberWrapper.parseInt = /**
     * @param {?} text
     * @param {?} radix
     * @return {?}
     */
    function (text, radix) {
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
            var /** @type {?} */ result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
    };
    // TODO: NaN is a valid literal but is returned by parseFloat to indicate an error.
    /**
     * @param {?} text
     * @return {?}
     */
    NumberWrapper.parseFloat = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        return parseFloat(text);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NumberWrapper.isNumeric = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return !isNaN(value - parseFloat(value));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NumberWrapper.isNaN = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return isNaN(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NumberWrapper.isInteger = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Number.isInteger(value);
    };
    return NumberWrapper;
}());
var FunctionWrapper = /** @class */ (function () {
    function FunctionWrapper() {
    }
    /**
     * @param {?} fn
     * @param {?} posArgs
     * @return {?}
     */
    FunctionWrapper.apply = /**
     * @param {?} fn
     * @param {?} posArgs
     * @return {?}
     */
    function (fn, posArgs) {
        return fn.apply(null, posArgs);
    };
    /**
     * @param {?} fn
     * @param {?} scope
     * @return {?}
     */
    FunctionWrapper.bind = /**
     * @param {?} fn
     * @param {?} scope
     * @return {?}
     */
    function (fn, scope) {
        return fn.bind(scope);
    };
    return FunctionWrapper;
}());
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
    var /** @type {?} */ chk = 0x12345678;
    var /** @type {?} */ len = s.length;
    for (var /** @type {?} */ i = 0; i < len; i++) {
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
    var /** @type {?} */ table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
    /* tslint:enable */
    var /** @type {?} */ x = 0;
    var /** @type {?} */ y = 0;
    for (var /** @type {?} */ i = 0; i < 4; i++) {
        y = (crc ^ anInt) & 0xFF;
        x = Number('0x' + table.substr(y * 9, 8));
        crc = (crc >>> 8) ^ x;
    }
    return crc ^ (-1);
}
var Json = /** @class */ (function () {
    function Json() {
    }
    /**
     * @param {?} s
     * @return {?}
     */
    Json.parse = /**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        return JSON.parse(s);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Json.stringify = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // Dart doesn't take 3 arguments
        return JSON.stringify(data, null, 2);
    };
    return Json;
}());
var DateWrapper = /** @class */ (function () {
    function DateWrapper() {
    }
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
    DateWrapper.create = /**
     * @param {?} year
     * @param {?=} month
     * @param {?=} day
     * @param {?=} hour
     * @param {?=} minutes
     * @param {?=} seconds
     * @param {?=} milliseconds
     * @return {?}
     */
    function (year, month, day, hour, minutes, seconds, milliseconds) {
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        if (hour === void 0) { hour = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (milliseconds === void 0) { milliseconds = 0; }
        return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
    };
    /**
     * @param {?} str
     * @return {?}
     */
    DateWrapper.fromISOString = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return new Date(str);
    };
    /**
     * @param {?} ms
     * @return {?}
     */
    DateWrapper.fromMillis = /**
     * @param {?} ms
     * @return {?}
     */
    function (ms) {
        return new Date(ms);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateWrapper.toMillis = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getTime();
    };
    /**
     * @return {?}
     */
    DateWrapper.now = /**
     * @return {?}
     */
    function () {
        return new Date();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateWrapper.toJson = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.toJSON();
    };
    return DateWrapper;
}());
var BooleanWrapper = /** @class */ (function () {
    function BooleanWrapper() {
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    BooleanWrapper.boleanValue = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = false; }
        if (value && isString(value)) {
            return value === 'true';
        }
        return value;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BooleanWrapper.isFalse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BooleanWrapper.isTrue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    };
    return BooleanWrapper;
}());
var /** @type {?} */ _symbolIterator = null;
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
            var /** @type {?} */ keys = Object.getOwnPropertyNames(Map.prototype);
            for (var /** @type {?} */ i = 0; i < keys.length; ++i) {
                var /** @type {?} */ key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    (/** @type {?} */ (Map)).prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
var /** @type {?} */ ReservedKeyword = ['class'];
/**
 * @param {?} expr
 * @param {?} declarations
 * @param {?} lets
 * @return {?}
 */
function evalExpression(expr, declarations, lets) {
    var /** @type {?} */ fnBody = declarations + "\n\treturn " + expr + "\n//# sourceURL=AribaExpression";
    var /** @type {?} */ fnArgNames = [];
    var /** @type {?} */ fnArgValues = [];
    for (var /** @type {?} */ argName in lets) {
        if (StringWrapper.contains(expr, argName)) {
            fnArgNames.push(argName);
            fnArgValues.push(lets[argName]);
        }
    }
    if (lets instanceof Extensible) {
        var /** @type {?} */ extValues = lets;
        extValues.extendedFields().forEach(function (value, key) {
            if (StringWrapper.contains(expr, key) &&
                fnArgNames.indexOf(key) === -1 && ReservedKeyword.indexOf(key) === -1) {
                fnArgNames.push(key);
                fnArgValues.push(value);
            }
        });
    }
    // fnArgNames.push('this');
    // fnArgValues.push(lets);
    return new (Function.bind.apply(Function, __spread([void 0], fnArgNames.concat(fnBody))))().apply(void 0, __spread(fnArgValues));
}
/**
 * @param {?} expr
 * @param {?} declarations
 * @param {?} lets
 * @param {?} thisContext
 * @return {?}
 */
function evalExpressionWithCntx(expr, declarations, lets, thisContext) {
    var /** @type {?} */ fnBody = declarations + "\n\treturn " + expr + "\n//# sourceURL=AribaExpression";
    var /** @type {?} */ fnArgNames = [];
    var /** @type {?} */ fnArgValues = [];
    for (var /** @type {?} */ argName in lets) {
        if (StringWrapper.contains(expr, argName)) {
            fnArgNames.push(argName);
            fnArgValues.push(lets[argName]);
        }
    }
    if (lets instanceof Extensible) {
        var /** @type {?} */ extValues = lets;
        extValues.extendedFields().forEach(function (value, key) {
            if (StringWrapper.contains(expr, key) &&
                fnArgNames.indexOf(key) === -1 && ReservedKeyword.indexOf(key) === -1) {
                fnArgNames.push(key);
                fnArgValues.push(value);
            }
        });
    }
    // fnArgNames.push('this');
    // fnArgValues.push(lets);
    var /** @type {?} */ fn = new (Function.bind.apply(Function, __spread([void 0], fnArgNames.concat(fnBody))))();
    assert(isPresent(fn), 'Cannot evaluate expression. FN is not defined');
    var /** @type {?} */ fnBound = fn.bind(thisContext);
    return fnBound.apply(void 0, __spread(fnArgValues));
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
    var /** @type {?} */ hash = 0;
    var /** @type {?} */ char;
    if (str.length === 0) {
        return hash;
    }
    for (var /** @type {?} */ i = 0; i < str.length; i++) {
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
    var /** @type {?} */ dt = new Date().getTime();
    var /** @type {?} */ proto = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var /** @type {?} */ r = (dt + Math.random() * 16) % 16 | 0;
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
    var /** @type {?} */ t1 = typeof o1, /** @type {?} */ t2 = typeof o2, /** @type {?} */ length, /** @type {?} */ key, /** @type {?} */ keySet;
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
            var /** @type {?} */ keys = Object.keys(o2);
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
            try {
                for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    key = keys_1_1.value;
                    if (!(keySet.has(key)) && key.charAt(0) !== '$'
                        && isPresent(o2[key]) && !isFunction(o2[key])) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        }
    }
    return false;
    var e_1, _a;
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
function decamelize(string, separator, initialCaps) {
    if (separator === void 0) { separator = ' '; }
    if (initialCaps === void 0) { initialCaps = true; }
    if (isBlank(string)) {
        return '';
    }
    var /** @type {?} */ lastUCIndex = -1;
    var /** @type {?} */ allCaps = true;
    var /** @type {?} */ splitOnUC = !StringWrapper.contains(string, '_');
    var /** @type {?} */ buf = '';
    var /** @type {?} */ inWord = 0;
    for (var /** @type {?} */ i = string.length; inWord < i; ++inWord) {
        var /** @type {?} */ c = string[inWord];
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
        for (var /** @type {?} */ i = 0, /** @type {?} */ c = buf.length; i < c; i++) {
            var /** @type {?} */ ch = buf[i];
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
var  /**
 * The Extensible interface can be implemented when a given class
 * wants to provide dynamically added fields.  Once this is implemented
 * to return a Map, the FieldValue system will be able to look in
 * the Map to see if the desired field exists.
 *
 *
 * @abstract
 */
Extensible = /** @class */ (function () {
    function Extensible() {
    }
    /**
     *  Returns the Map in which the dynamically added fields reside.
     *
     */
    /**
     *  Returns the Map in which the dynamically added fields reside.
     *
     * @return {?}
     */
    Extensible.prototype.extendedFields = /**
     *  Returns the Map in which the dynamically added fields reside.
     *
     * @return {?}
     */
    function () {
        return unimplemented();
    };
    return Extensible;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ _clearValues = (function () {
    if ((/** @type {?} */ ((new Map()).keys())).next) {
        return function _clearValuesInner(m) {
            var /** @type {?} */ keyIterator = m.keys();
            var /** @type {?} */ k /** TODO #???? */;
            while (!((k = (/** @type {?} */ (keyIterator)).next()).done)) {
                m.set(k.value, null);
            }
        };
    }
    else {
        return function _clearValuesWithForeEach(m) {
            m.forEach(function (v, k) {
                m.set(k, null);
            });
        };
    }
})();
var MapWrapper = /** @class */ (function () {
    function MapWrapper() {
    }
    /**
     * @template K, V
     * @return {?}
     */
    MapWrapper.createEmpty = /**
     * @template K, V
     * @return {?}
     */
    function () {
        return new Map();
    };
    /**
     * @template K, V
     * @param {?} m
     * @return {?}
     */
    MapWrapper.clone = /**
     * @template K, V
     * @param {?} m
     * @return {?}
     */
    function (m) {
        try {
            if (new Map(/** @type {?} */ (new Map()))) {
                return new Map(/** @type {?} */ (m));
            }
        }
        catch (/** @type {?} */ e) {
        }
        var /** @type {?} */ map$$1 = new Map();
        m.forEach(function (v, k) {
            map$$1.set(k, v);
        });
        return map$$1;
    };
    /**
     * @template T
     * @param {?} stringMap
     * @return {?}
     */
    MapWrapper.createFromStringMap = /**
     * @template T
     * @param {?} stringMap
     * @return {?}
     */
    function (stringMap) {
        var /** @type {?} */ result = new Map();
        for (var /** @type {?} */ key in stringMap) {
            result.set(key, stringMap[key]);
        }
        return result;
    };
    /**
     * @template T
     * @param {?} stringMap
     * @return {?}
     */
    MapWrapper.createFromAnyMap = /**
     * @template T
     * @param {?} stringMap
     * @return {?}
     */
    function (stringMap) {
        var /** @type {?} */ result = new Map();
        for (var /** @type {?} */ key in stringMap) {
            result.set(key, stringMap[key]);
        }
        return result;
    };
    /**
     * @template T
     * @param {?} stringMap
     * @param {?} resolve
     * @return {?}
     */
    MapWrapper.createFromStringMapWithResolve = /**
     * @template T
     * @param {?} stringMap
     * @param {?} resolve
     * @return {?}
     */
    function (stringMap, resolve) {
        var /** @type {?} */ result = new Map();
        for (var /** @type {?} */ key in stringMap) {
            var /** @type {?} */ updatedValue = resolve(key, stringMap[key]);
            result.set(key, updatedValue);
        }
        return result;
    };
    /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    MapWrapper.toStringMap = /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    function (m) {
        var /** @type {?} */ r = {};
        m.forEach(function (v, k) { return r[k] = v; });
        return r;
    };
    /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    MapWrapper.toAnyMap = /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    function (m) {
        var /** @type {?} */ r = {};
        if (isPresent(m)) {
            m.forEach(function (v, k) { return (/** @type {?} */ (r))[k] = v; });
        }
        return r;
    };
    /**
     * @param {?} m
     * @param {?=} inner
     * @return {?}
     */
    MapWrapper.toString = /**
     * @param {?} m
     * @param {?=} inner
     * @return {?}
     */
    function (m, inner) {
        if (inner === void 0) { inner = false; }
        var /** @type {?} */ sj = new StringJoiner(['']);
        if (!inner) {
            sj.add('{');
        }
        m.forEach(function (v, k) {
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
    };
    /**
     * @param {?} m
     * @return {?}
     */
    MapWrapper.clearValues = /**
     * @param {?} m
     * @return {?}
     */
    function (m) {
        _clearValues(m);
    };
    /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    MapWrapper.iterable = /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    function (m) {
        return m;
    };
    /**
     * @param {?} dest
     * @param {?} source
     * @param {?} overwriteMismatched
     * @return {?}
     */
    MapWrapper.mergeMapIntoMapWithObject = /**
     * @param {?} dest
     * @param {?} source
     * @param {?} overwriteMismatched
     * @return {?}
     */
    function (dest, source, overwriteMismatched) {
        var /** @type {?} */ keys = Array.from(source.keys());
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var /** @type {?} */ sourceValue = source.get(key);
                var /** @type {?} */ destValue = dest.get(key);
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
                        var /** @type {?} */ sourceVect = ListWrapper.clone(sourceValue);
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
                    var /** @type {?} */ destValueMap = MapWrapper.clone(destValue);
                    if (isBlank(destValueMap.get(sourceValue))) {
                        destValue.set(sourceValue, MapWrapper.createEmpty());
                    }
                }
                else if (isString(destValue) && sourceValue instanceof Map) {
                    var /** @type {?} */ sourceHash = MapWrapper.clone(sourceValue);
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
                    var /** @type {?} */ sourceVect = ListWrapper.clone(sourceValue);
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
                    var /** @type {?} */ destClass = className(destValue);
                    var /** @type {?} */ sourceClass = className(sourceValue);
                    if (destClass === sourceClass) {
                        dest.set(key, sourceValue);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return dest;
        var e_1, _a;
    };
    /**
     * @param {?} keys
     * @return {?}
     */
    MapWrapper.convertListToMap = /**
     * @param {?} keys
     * @return {?}
     */
    function (keys) {
        var /** @type {?} */ map$$1 = new Map();
        for (var /** @type {?} */ i = 0; i < keys.length; i++) {
            map$$1.set(keys[i], MapWrapper.createEmpty());
        }
        return map$$1;
    };
    /**
     * @template K
     * @param {?} items
     * @param {?} groupByKey
     * @return {?}
     */
    MapWrapper.groupBy = /**
     * @template K
     * @param {?} items
     * @param {?} groupByKey
     * @return {?}
     */
    function (items, groupByKey) {
        var /** @type {?} */ result = items.reduce(function (groupResult, currentValue) {
            var /** @type {?} */ gKey = groupByKey(currentValue);
            (groupResult[gKey] = groupResult[gKey] || []).push(currentValue);
            return groupResult;
        }, {});
        var /** @type {?} */ grouped = new Map();
        Object.keys(result).forEach(function (key) {
            grouped.set(key, result[key]);
        });
        return grouped;
    };
    return MapWrapper;
}());
/**
 * Wraps Javascript Objects
 */
var  /**
 * Wraps Javascript Objects
 */
StringMapWrapper = /** @class */ (function () {
    function StringMapWrapper() {
    }
    /**
     * @return {?}
     */
    StringMapWrapper.create = /**
     * @return {?}
     */
    function () {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    };
    /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    StringMapWrapper.contains = /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    function (map$$1, key) {
        return map$$1.hasOwnProperty(key);
    };
    /**
     * @template V
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    StringMapWrapper.get = /**
     * @template V
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    function (map$$1, key) {
        return map$$1.hasOwnProperty(key) ? map$$1[key] : undefined;
    };
    /**
     * @template V
     * @param {?} map
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    StringMapWrapper.set = /**
     * @template V
     * @param {?} map
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (map$$1, key, value) {
        map$$1[key] = value;
    };
    /**
     * @param {?} map
     * @return {?}
     */
    StringMapWrapper.isEmpty = /**
     * @param {?} map
     * @return {?}
     */
    function (map$$1) {
        for (var /** @type {?} */ prop in map$$1) {
            return false;
        }
        return true;
    };
    /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    StringMapWrapper.delete = /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    function (map$$1, key) {
        delete map$$1[key];
    };
    /**
     * @template K, V
     * @param {?} map
     * @param {?} callback
     * @return {?}
     */
    StringMapWrapper.forEach = /**
     * @template K, V
     * @param {?} map
     * @param {?} callback
     * @return {?}
     */
    function (map$$1, callback) {
        try {
            for (var _a = __values(Object.keys(map$$1)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var k = _b.value;
                callback(map$$1[k], k);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _c;
    };
    /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    StringMapWrapper.merge = /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    function (m1, m2) {
        var /** @type {?} */ m = {};
        try {
            for (var _a = __values(Object.keys(m1)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var k = _b.value;
                m[k] = m1[k];
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _d = __values(Object.keys(m2)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var k = _e.value;
                m[k] = m2[k];
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return m;
        var e_3, _c, e_4, _f;
    };
    /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    StringMapWrapper.equals = /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    function (m1, m2) {
        var /** @type {?} */ k1 = Object.keys(m1);
        var /** @type {?} */ k2 = Object.keys(m2);
        if (k1.length !== k2.length) {
            return false;
        }
        var /** @type {?} */ key /** TODO #???? */;
        for (var /** @type {?} */ i = 0; i < k1.length; i++) {
            key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    return StringMapWrapper;
}());
var ListWrapper = /** @class */ (function () {
    function ListWrapper() {
    }
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    /**
     * @param {?} size
     * @return {?}
     */
    ListWrapper.createFixedSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        return new Array(size);
    };
    /**
     * @param {?} size
     * @return {?}
     */
    ListWrapper.createGrowableSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        return new Array(size);
    };
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    ListWrapper.clone = /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    function (array) {
        return array.slice(0);
    };
    /**
     * @template T
     * @param {?} array
     * @param {?} fn
     * @return {?}
     */
    ListWrapper.forEachWithIndex = /**
     * @template T
     * @param {?} array
     * @param {?} fn
     * @return {?}
     */
    function (array, fn) {
        for (var /** @type {?} */ i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    ListWrapper.first = /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    function (array) {
        if (!array) {
            return null;
        }
    };
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    ListWrapper.last = /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    function (array) {
        if (!array || array.length === 0) {
            return null;
        }
        return array[array.length - 1];
    };
    /**
     * @template T
     * @param {?} array
     * @param {?} value
     * @param {?=} startIndex
     * @return {?}
     */
    ListWrapper.indexOf = /**
     * @template T
     * @param {?} array
     * @param {?} value
     * @param {?=} startIndex
     * @return {?}
     */
    function (array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    ListWrapper.contains = /**
     * @template T
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    function (list, el) {
        return list.indexOf(el) !== -1;
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} els
     * @return {?}
     */
    ListWrapper.containsAll = /**
     * @template T
     * @param {?} list
     * @param {?} els
     * @return {?}
     */
    function (list, els) {
        return els.map(function (needle) {
            return list.indexOf(needle);
        }).indexOf(-1) === -1;
    };
    /**
     * @param {?} list
     * @param {?} item
     * @return {?}
     */
    ListWrapper.containsComplex = /**
     * @param {?} list
     * @param {?} item
     * @return {?}
     */
    function (list, item) {
        return list.findIndex(function (el) {
            return equals(el, item);
        }) > -1;
    };
    /**
     * @param {?} list
     * @param {?} item
     * @return {?}
     */
    ListWrapper.findIndexComplex = /**
     * @param {?} list
     * @param {?} item
     * @return {?}
     */
    function (list, item) {
        var /** @type {?} */ index = list.findIndex(function (el) {
            return equals(el, item);
        });
        return index;
    };
    /**
     * @param {?} list
     * @param {?} item
     * @return {?}
     */
    ListWrapper.removeIfExist = /**
     * @param {?} list
     * @param {?} item
     * @return {?}
     */
    function (list, item) {
        var /** @type {?} */ index = list.findIndex(function (el) {
            return equals(el, item);
        });
        if (index !== -1) {
            ListWrapper.removeAt(list, index);
        }
    };
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    ListWrapper.reversed = /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    function (array) {
        var /** @type {?} */ a = ListWrapper.clone(array);
        return a.reverse();
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    ListWrapper.concat = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        return a.concat(b);
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    ListWrapper.insert = /**
     * @template T
     * @param {?} list
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    function (list, index, value) {
        list.splice(index, 0, value);
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} index
     * @return {?}
     */
    ListWrapper.removeAt = /**
     * @template T
     * @param {?} list
     * @param {?} index
     * @return {?}
     */
    function (list, index) {
        var /** @type {?} */ res = list[index];
        list.splice(index, 1);
        return res;
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} items
     * @return {?}
     */
    ListWrapper.removeAll = /**
     * @template T
     * @param {?} list
     * @param {?} items
     * @return {?}
     */
    function (list, items) {
        for (var /** @type {?} */ i = 0; i < items.length; ++i) {
            var /** @type {?} */ index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    ListWrapper.remove = /**
     * @template T
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    function (list, el) {
        var /** @type {?} */ index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    ListWrapper.removeLast = /**
     * @template T
     * @param {?} array
     * @return {?}
     */
    function (array) {
        if (!array || array.length === 0) {
            return null;
        }
        array.splice(array.length - 1);
    };
    /**
     * @param {?} list
     * @return {?}
     */
    ListWrapper.clear = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        list.length = 0;
    };
    /**
     * @param {?} list
     * @return {?}
     */
    ListWrapper.isEmpty = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        return list.length === 0;
    };
    /**
     * @param {?} list
     * @param {?} value
     * @param {?=} start
     * @param {?=} end
     * @return {?}
     */
    ListWrapper.fill = /**
     * @param {?} list
     * @param {?} value
     * @param {?=} start
     * @param {?=} end
     * @return {?}
     */
    function (list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        list.fill(value, start, end === null ? list.length : end);
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    ListWrapper.equals = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (a.length !== b.length) {
            return false;
        }
        for (var /** @type {?} */ i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * @template T
     * @param {?} l
     * @param {?=} from
     * @param {?=} to
     * @return {?}
     */
    ListWrapper.slice = /**
     * @template T
     * @param {?} l
     * @param {?=} from
     * @param {?=} to
     * @return {?}
     */
    function (l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null ? undefined : to);
    };
    /**
     * @template T
     * @param {?} l
     * @param {?} from
     * @param {?} length
     * @return {?}
     */
    ListWrapper.splice = /**
     * @template T
     * @param {?} l
     * @param {?} from
     * @param {?} length
     * @return {?}
     */
    function (l, from, length) {
        return l.splice(from, length);
    };
    /**
     * @template T
     * @param {?} l
     * @param {?=} compareFn
     * @return {?}
     */
    ListWrapper.sort = /**
     * @template T
     * @param {?} l
     * @param {?=} compareFn
     * @return {?}
     */
    function (l, compareFn) {
        if (isPresent(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    /**
     * @param {?} toSort
     * @param {?} pattern
     * @return {?}
     */
    ListWrapper.sortByExample = /**
     * @param {?} toSort
     * @param {?} pattern
     * @return {?}
     */
    function (toSort, pattern) {
        toSort.sort(function (a, b) {
            var /** @type {?} */ indexA = pattern.indexOf(a) === -1 ? 10 : pattern.indexOf(a);
            var /** @type {?} */ indexB = pattern.indexOf(b) === -1 ? 10 : pattern.indexOf(b);
            return indexA - indexB;
        });
    };
    /**
     * @template T
     * @param {?} l
     * @return {?}
     */
    ListWrapper.toString = /**
     * @template T
     * @param {?} l
     * @return {?}
     */
    function (l) {
        var /** @type {?} */ out = '';
        try {
            for (var l_1 = __values(l), l_1_1 = l_1.next(); !l_1_1.done; l_1_1 = l_1.next()) {
                var item = l_1_1.value;
                out += item.toString() + ',  ';
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (l_1_1 && !l_1_1.done && (_a = l_1.return)) _a.call(l_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return out;
        var e_5, _a;
    };
    /**
     * @template T
     * @param {?} l
     * @return {?}
     */
    ListWrapper.toJSON = /**
     * @template T
     * @param {?} l
     * @return {?}
     */
    function (l) {
        return JSON.stringify(l);
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} predicate
     * @return {?}
     */
    ListWrapper.maximum = /**
     * @template T
     * @param {?} list
     * @param {?} predicate
     * @return {?}
     */
    function (list, predicate) {
        if (list.length === 0) {
            return null;
        }
        var /** @type {?} */ solution = null;
        var /** @type {?} */ maxValue = -Infinity;
        for (var /** @type {?} */ index = 0; index < list.length; index++) {
            var /** @type {?} */ candidate = list[index];
            if (isBlank(candidate)) {
                continue;
            }
            var /** @type {?} */ candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    ListWrapper.flatten = /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    function (list) {
        var /** @type {?} */ target = [];
        _flattenArray(list, target);
        return target;
    };
    /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    ListWrapper.allElementsAreStrings = /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    function (list) {
        var /** @type {?} */ target = ListWrapper.flatten(list);
        try {
            for (var target_1 = __values(target), target_1_1 = target_1.next(); !target_1_1.done; target_1_1 = target_1.next()) {
                var element = target_1_1.value;
                if (!isString(element)) {
                    return false;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (target_1_1 && !target_1_1.done && (_a = target_1.return)) _a.call(target_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return true;
        var e_6, _a;
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} source
     * @return {?}
     */
    ListWrapper.addAll = /**
     * @template T
     * @param {?} list
     * @param {?} source
     * @return {?}
     */
    function (list, source) {
        for (var /** @type {?} */ i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    };
    // todo: check if this handles objects with contains
    /**
     * @template T
     * @param {?} list
     * @param {?} element
     * @return {?}
     */
    ListWrapper.addElementIfAbsent = /**
     * @template T
     * @param {?} list
     * @param {?} element
     * @return {?}
     */
    function (list, element) {
        var /** @type {?} */ contains = arrays.contains(list, element, function (item1, item2) {
            if (item1['equalsTo']) {
                return item1['equalsTo'](item2);
            }
            return item1 === item2;
        });
        if (!contains) {
            list.push(element);
        }
    };
    /**
     * @template T
     * @param {?} list
     * @param {?} elements
     * @return {?}
     */
    ListWrapper.addElementsIfAbsent = /**
     * @template T
     * @param {?} list
     * @param {?} elements
     * @return {?}
     */
    function (list, elements) {
        if (isBlank(elements)) {
            return;
        }
        try {
            for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                var elem = elements_1_1.value;
                var /** @type {?} */ contains = arrays.contains(list, elem, function (item1, item2) {
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
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var e_7, _a;
    };
    /**
     * @template T
     * @param {?} value
     * @return {?}
     */
    ListWrapper.copyValue = /**
     * @template T
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value instanceof Map) {
            return MapWrapper.clone(value);
        }
        else if (isArray(value)) {
            return ListWrapper.clone(value);
        }
        return value;
    };
    return ListWrapper;
}());
/**
 * @param {?} source
 * @param {?} target
 * @return {?}
 */
function _flattenArray(source, target) {
    if (isPresent(source)) {
        for (var /** @type {?} */ i = 0; i < source.length; i++) {
            var /** @type {?} */ item = source[i];
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
    var /** @type {?} */ iterator1 = a[getSymbolIterator()]();
    var /** @type {?} */ iterator2 = b[getSymbolIterator()]();
    while (true) {
        var /** @type {?} */ item1 = iterator1.next();
        var /** @type {?} */ item2 = iterator2.next();
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
        for (var /** @type {?} */ i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        var /** @type {?} */ iterator = obj[getSymbolIterator()]();
        var /** @type {?} */ item = void 0 /** TODO #???? */;
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
    for (var /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
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
var /** @type {?} */ AppConfigToken = new InjectionToken('App.Config');
var /** @type {?} */ SuportedLanguages = ['en', 'fr'];
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
var AppConfig = /** @class */ (function () {
    function AppConfig(injector, environment) {
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
     */
    /**
     *
     * Called by factory method to initialize this config class
     *
     * @param {?} config
     * @return {?}
     */
    AppConfig.prototype.init = /**
     *
     * Called by factory method to initialize this config class
     *
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        this.initDefaults();
        if (isPresent(config)) {
            var /** @type {?} */ values = MapWrapper.createFromStringMap(config);
            values.forEach(function (v, k) { return _this.set(k, v); });
        }
        this.environment.setValue(AppConfig.AssetFolder, this.get(AppConfig.AssetFolder));
        var /** @type {?} */ location = window.location.pathname + window.location.search;
        if (this.environment.inTest) {
            location = this.get(AppConfig.InTestUrl);
        }
        // if (isPresent(location)) {
        //     this.parseQueryParms(location);
        // }
    };
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
     */
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
    AppConfig.prototype.parseGlobalParams = /**
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
    function () {
        var /** @type {?} */ globalConfig = readGlobalParam(AppConfig.AppConfigGlobalVar);
        if (isPresent(globalConfig)) {
            for (var /** @type {?} */ key in globalConfig) {
                this.values.set(key.toLowerCase(), globalConfig[key]);
            }
        }
    };
    /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     */
    /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    AppConfig.prototype.set = /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.values.set(key.toLowerCase(), value);
        if (key.toLowerCase() === AppConfig.InTest) {
            this.environment.inTest = value;
        }
    };
    /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     */
    /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     * @param {?} key
     * @return {?}
     */
    AppConfig.prototype.get = /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this.values.has(key.toLowerCase())) {
            return this.values.get(key.toLowerCase());
        }
        return null;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    AppConfig.prototype.getNumber = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var /** @type {?} */ val = this.get(key);
        return NumberWrapper.parseIntAutoRadix(val);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    AppConfig.prototype.getBoolean = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var /** @type {?} */ val = this.get(key);
        return BooleanWrapper.boleanValue(val);
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.initDefaults = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} entity
     * @param {?=} isNested
     * @return {?}
     */
    AppConfig.prototype.getRestApiContextUrl = /**
     * @param {?} entity
     * @param {?=} isNested
     * @return {?}
     */
    function (entity, isNested) {
        if (isNested === void 0) { isNested = false; }
        var /** @type {?} */ nestedFlag = isNested ? '$' : '';
        var /** @type {?} */ withEntity = AppConfig.RestApiContextUrl + "." + nestedFlag + entity;
        var /** @type {?} */ url = this.get(withEntity) || this.get(AppConfig.RestApiContextUrl);
        if (isPresent(url)) {
            if (/\/$/g.test(url)) {
                url = url.substring(0, url.length - 1);
            }
            return url;
        }
        throw new Error('Rest APIUri is not configured');
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.getRestApiContext = /**
     * @return {?}
     */
    function () {
        return this.get(AppConfig.RestApiContextUrl) || '';
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.getRestApiHost = /**
     * @return {?}
     */
    function () {
        return this.get(AppConfig.RestApiHostUrl) || '';
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.isProductionMode = /**
     * @return {?}
     */
    function () {
        return !this.getBoolean(AppConfig.IsDevMode);
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.getBaseUrl = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ isMocked = this.getBoolean(AppConfig.ConnectionUseMockServer);
        var /** @type {?} */ cnx = this.getRestApiContext();
        var /** @type {?} */ host = this.getRestApiHost() || '';
        if (isMocked) {
            var /** @type {?} */ prefix = this.get(AppConfig.AssetFolder);
            return "" + prefix + (cnx || '/');
        }
        var /** @type {?} */ url = "" + host + (cnx || '/');
        return url;
    };
    /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     */
    /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     * @return {?}
     */
    AppConfig.prototype.initializeI18n = /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ promise = new Promise(function (resolve) {
            resolve(true);
        });
        return promise;
    };
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
    return AppConfig;
}());
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
    var /** @type {?} */ conf = new AppConfig(injector, env);
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
var Environment = /** @class */ (function () {
    function Environment() {
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
    Environment.prototype.getValue = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this.envVariables.has(key)) {
            return this.envVariables.get(key);
        }
        return null;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Environment.prototype.setValue = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.envVariables.set(key, value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Environment.prototype.deleteValue = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this.hasValue(key)) {
            this.envVariables.delete(key);
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Environment.prototype.hasValue = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.envVariables.has(key);
    };
    /**
     * @return {?}
     */
    Environment.prototype.allVariables = /**
     * @return {?}
     */
    function () {
        return this.envVariables;
    };
    Object.defineProperty(Environment.prototype, "locale", {
        get: /**
         * @return {?}
         */
        function () {
            return this._locale;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._locale = value;
            // Emit locale changed event
            this.onLocaleChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    Environment.prototype.peak = /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var /** @type {?} */ stack = this.stacksVariables.get(key) || [];
        return ListWrapper.last(stack);
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    Environment.prototype.pop = /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var /** @type {?} */ stack = this.stacksVariables.get(key) || [];
        assert(stack.length > 0, ' Attempt to get value from empty stack');
        return ListWrapper.removeAt(stack, stack.length - 1);
    };
    /**
     * @template T
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Environment.prototype.push = /**
     * @template T
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        var /** @type {?} */ stack = this.stacksVariables.get(key) || [];
        stack.push(value);
        this.stacksVariables.set(key, stack);
    };
    Environment.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Environment.ctorParameters = function () { return []; };
    return Environment;
}());

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
var RestSegmentType = {
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
var RestAction = {
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
var  /**
 * Set of AST like classes to keep the fluent API grammar in the abstract format to give developers
 * changes to provide their own implementation
 *
 * Todo: Expose Builder as a service
 *
 * @abstract
 */
UrlSegment = /** @class */ (function () {
    function UrlSegment(type, value, params, rank) {
        if (rank === void 0) { rank = -1; }
        this.type = type;
        this.value = value;
        this.params = params;
        this.rank = rank;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    UrlSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
    };
    /**
     * @return {?}
     */
    UrlSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return 'Wrong Rest Segment order';
    };
    return UrlSegment;
}());
var HostSegment = /** @class */ (function (_super) {
    __extends(HostSegment, _super);
    function HostSegment(value, params) {
        var _this = _super.call(this, RestSegmentType.Host, value, params, 5) || this;
        _this.value = value;
        _this.params = params;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    HostSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment == null, this.assertMsg());
    };
    /**
     * @return {?}
     */
    HostSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Host segment must be first!";
    };
    return HostSegment;
}(UrlSegment));
var ContextSegment = /** @class */ (function (_super) {
    __extends(ContextSegment, _super);
    function ContextSegment(value, params) {
        var _this = _super.call(this, RestSegmentType.Context, value, params, 10) || this;
        _this.value = value;
        _this.params = params;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    ContextSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment === RestSegmentType.Host, this.assertMsg());
    };
    /**
     * @return {?}
     */
    ContextSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Context segment must follow Host!";
    };
    return ContextSegment;
}(UrlSegment));
var ActionSegment = /** @class */ (function (_super) {
    __extends(ActionSegment, _super);
    function ActionSegment(action, data, params) {
        var _this = _super.call(this, RestSegmentType.Action, action, params, 0) || this;
        _this.action = action;
        _this.data = data;
        _this.params = params;
        // save it to local property for easier comparision
        // save it to local property for easier comparision
        _this.actionType = action;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    ActionSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment === RestSegmentType.Context, this.assertMsg());
    };
    /**
     * @return {?}
     */
    ActionSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Action must follow Context segment!";
    };
    return ActionSegment;
}(UrlSegment));
var ResourceSegment = /** @class */ (function (_super) {
    __extends(ResourceSegment, _super);
    function ResourceSegment(value, params) {
        var _this = _super.call(this, RestSegmentType.Resource, value, params, 15) || this;
        _this.value = value;
        _this.params = params;
        _this.resourceName = objectToName(_this.value).toLowerCase() + "s";
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    ResourceSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert((prevSegment === RestSegmentType.Action || prevSegment === RestSegmentType.OfParent), this.assertMsg());
    };
    /**
     * @return {?}
     */
    ResourceSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Resource must follow either Action or Of!";
    };
    return ResourceSegment;
}(UrlSegment));
var IdentifierSegment = /** @class */ (function (_super) {
    __extends(IdentifierSegment, _super);
    function IdentifierSegment(value, params) {
        var _this = _super.call(this, RestSegmentType.Identifier, value, params, 20) || this;
        _this.value = value;
        _this.params = params;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    IdentifierSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment === RestSegmentType.Resource, this.assertMsg());
    };
    /**
     * @return {?}
     */
    IdentifierSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Identifier must follow Resource!";
    };
    return IdentifierSegment;
}(UrlSegment));
var OfParentSegment = /** @class */ (function (_super) {
    __extends(OfParentSegment, _super);
    function OfParentSegment() {
        var _this = _super.call(this, RestSegmentType.OfParent) || this;
        _this.rank = 2;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    OfParentSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment === RestSegmentType.Resource ||
            prevSegment === RestSegmentType.Identifier, this.assertMsg());
    };
    /**
     * @return {?}
     */
    OfParentSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Of must follow Resource!";
    };
    return OfParentSegment;
}(UrlSegment));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Default implementation that reads abstract URL structure and assembles correct URL.
 */
var  /**
 * Default implementation that reads abstract URL structure and assembles correct URL.
 */
DefaultRestBuilder = /** @class */ (function () {
    function DefaultRestBuilder(urlGroup) {
        this.urlGroup = urlGroup;
        this.sorted = false;
    }
    /**
     * @param {?} isMocked
     * @return {?}
     */
    DefaultRestBuilder.prototype.assembleUrl = /**
     * @param {?} isMocked
     * @return {?}
     */
    function (isMocked) {
        this.validate();
        var /** @type {?} */ sortedSegments = this.adjustRank(this.urlGroup.segments);
        var /** @type {?} */ url = new StringJoiner();
        for (var /** @type {?} */ i = 1; i < sortedSegments.length; i++) {
            switch (sortedSegments[i].type) {
                case RestSegmentType.Action:
                case RestSegmentType.OfParent:
                    break;
                case RestSegmentType.Resource:
                    var /** @type {?} */ resSegment = /** @type {?} */ (sortedSegments[i]);
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
    };
    /**
     * @param {?} url
     * @param {?} shouldAdd
     * @return {?}
     */
    DefaultRestBuilder.prototype.addSlash = /**
     * @param {?} url
     * @param {?} shouldAdd
     * @return {?}
     */
    function (url, shouldAdd) {
        if (shouldAdd) {
            url.add('/');
        }
    };
    /**
     * @return {?}
     */
    DefaultRestBuilder.prototype.validate = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ action = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        switch (action.actionType) {
            case RestAction.Save:
            case RestAction.Do:
                // make sure we have a Identifier
                var /** @type {?} */ withIdCount = this.urlGroup.count(RestSegmentType.Identifier);
                var /** @type {?} */ of$$1 = this.urlGroup.lookup(RestSegmentType.OfParent);
                assert(withIdCount >= 1, 'Missing withId(<IDENTIFIER>) call!');
                break;
        }
    };
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
    DefaultRestBuilder.prototype.adjustRank = /**
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
    function (segments) {
        var /** @type {?} */ ofIndex = segments
            .findIndex(function (s) { return s.type === RestSegmentType.OfParent; });
        if (ofIndex !== -1) {
            var /** @type {?} */ of$$1 = segments[ofIndex];
            var /** @type {?} */ segment = void 0;
            do {
                segment = segments[--ofIndex];
                segment.rank *= of$$1.rank;
            } while (segment.type !== RestSegmentType.Resource);
        }
        return segments.sort(function (a, b) { return a.rank - b.rank; });
    };
    return DefaultRestBuilder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *
 * This class just aggregates and provides convient apit to to work with UrlSegments
 *
 */
var  /**
 *
 * This class just aggregates and provides convient apit to to work with UrlSegments
 *
 */
RestUrlGroup = /** @class */ (function () {
    function RestUrlGroup(_segments) {
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
     */
    /**
     *
     * Every push is validated againts UrlSegment assert methods to make sure the order of the
     * method calls is correct
     *
     * @param {?} segment
     * @return {?}
     */
    RestUrlGroup.prototype.push = /**
     *
     * Every push is validated againts UrlSegment assert methods to make sure the order of the
     * method calls is correct
     *
     * @param {?} segment
     * @return {?}
     */
    function (segment) {
        segment.assertSegment((this._segments.length > 0) ? this.peak().type : null);
        if (isString(segment.value)) {
            segment.value = segment.value.replace(/^\/|\/$/g, '');
        }
        this._segments.push(segment);
    };
    /**
     * Stack like API
     *
     */
    /**
     * Stack like API
     *
     * @return {?}
     */
    RestUrlGroup.prototype.peak = /**
     * Stack like API
     *
     * @return {?}
     */
    function () {
        return ListWrapper.last(this._segments);
    };
    /**
     * @return {?}
     */
    RestUrlGroup.prototype.pop = /**
     * @return {?}
     */
    function () {
        assert(this._segments.length > 0, ' Attempt to get value from empty segments stack');
        return ListWrapper.removeAt(this._segments, this._segments.length - 1);
    };
    /**
     * @param {?} segmentType
     * @param {?} data
     * @return {?}
     */
    RestUrlGroup.prototype.updateSegment = /**
     * @param {?} segmentType
     * @param {?} data
     * @return {?}
     */
    function (segmentType, data) {
        var /** @type {?} */ urlSegment = this.lookup(segmentType);
        urlSegment.value = data;
    };
    /**
     *
     * Based on the enum Segment Type  it will retrieve correct segment from the stack
     *
     */
    /**
     *
     * Based on the enum Segment Type  it will retrieve correct segment from the stack
     *
     * @param {?} segment
     * @param {?=} byResource
     * @return {?}
     */
    RestUrlGroup.prototype.lookup = /**
     *
     * Based on the enum Segment Type  it will retrieve correct segment from the stack
     *
     * @param {?} segment
     * @param {?=} byResource
     * @return {?}
     */
    function (segment, byResource) {
        if (isBlank(this.segments)) {
            return null;
        }
        var /** @type {?} */ ss = __spread(this.segments);
        ss = ss.reverse();
        return ss.find((function (s) {
            var /** @type {?} */ hasMatch = s.type === segment;
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
    };
    /**
     *
     * Counts number of segments of certain type
     *
     */
    /**
     *
     * Counts number of segments of certain type
     *
     * @param {?} segment
     * @return {?}
     */
    RestUrlGroup.prototype.count = /**
     *
     * Counts number of segments of certain type
     *
     * @param {?} segment
     * @return {?}
     */
    function (segment) {
        var /** @type {?} */ segments = this.segments.filter(function (s) { return segment === s.type; });
        return isPresent(segments) ? segments.length : 0;
    };
    Object.defineProperty(RestUrlGroup.prototype, "segments", {
        get: /**
         * @return {?}
         */
        function () {
            return this._segments;
        },
        enumerable: true,
        configurable: true
    });
    return RestUrlGroup;
}());

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
var Resource = /** @class */ (function () {
    function Resource(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    /**
     * Identifies GET operation
     *
     */
    /**
     * Identifies GET operation
     *
     * @return {?}
     */
    Resource.prototype.load = /**
     * Identifies GET operation
     *
     * @return {?}
     */
    function () {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Load));
        return this;
    };
    /**
     * Identifies PUT or POST operation. Depending on the object. If the object has already
     * populated its identifier, then we use PUT, otherwise POST
     *
     */
    /**
     * Identifies PUT or POST operation. Depending on the object. If the object has already
     * populated its identifier, then we use PUT, otherwise POST
     *
     * @return {?}
     */
    Resource.prototype.save = /**
     * Identifies PUT or POST operation. Depending on the object. If the object has already
     * populated its identifier, then we use PUT, otherwise POST
     *
     * @return {?}
     */
    function () {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Save));
        return this;
    };
    /**
     * Identifies interaction. For this we use POST
     *
     */
    /**
     * Identifies interaction. For this we use POST
     *
     * @param {?} action
     * @return {?}
     */
    Resource.prototype.do = /**
     * Identifies interaction. For this we use POST
     *
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.init();
        this.urlGroup.push(new ActionSegment(RestAction.Do, action));
        return this;
    };
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
     */
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
    Resource.prototype.query = /**
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
    function () {
        this.init();
        throw new Error('Not implemented');
    };
    /**
     * @return {?}
     */
    Resource.prototype.where = /**
     * @return {?}
     */
    function () {
        this.init();
        throw new Error('Not implemented');
    };
    /**
     *
     * Identifies ResourceSegment with specific type that must be either Entity or Value
     *
     */
    /**
     *
     * Identifies ResourceSegment with specific type that must be either Entity or Value
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    Resource.prototype.resource = /**
     *
     * Identifies ResourceSegment with specific type that must be either Entity or Value
     *
     * @template T
     * @param {?} type
     * @return {?}
     */
    function (type) {
        this.urlGroup.push(new ResourceSegment(type));
        return this;
    };
    /**
     * Identifier IdentifierSegment
     *
     */
    /**
     * Identifier IdentifierSegment
     *
     * @param {?} identifier
     * @return {?}
     */
    Resource.prototype.withId = /**
     * Identifier IdentifierSegment
     *
     * @param {?} identifier
     * @return {?}
     */
    function (identifier) {
        this.urlGroup.push(new IdentifierSegment(identifier));
        return this;
    };
    /**
     * When we are saving data this method is used to insert a payload to the ActionSegment
     *
     */
    /**
     * When we are saving data this method is used to insert a payload to the ActionSegment
     *
     * @template T
     * @param {?} data
     * @return {?}
     */
    Resource.prototype.withData = /**
     * When we are saving data this method is used to insert a payload to the ActionSegment
     *
     * @template T
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ urlSegment = this.urlGroup.lookup(RestSegmentType.Action);
        var /** @type {?} */ isSave = (/** @type {?} */ (urlSegment)).actionType === RestAction.Save;
        assert(isSave, 'withData can be used with SAVE operation only!');
        (/** @type {?} */ (urlSegment)).data = data;
        return this;
    };
    Object.defineProperty(Resource.prototype, "of", {
        /**
         * OF is just a syntactic suggar for better readability and to easier work with sub resources.
         * using OF we are able to tell that some resource belongs to other resource
         *
         */
        get: /**
         * OF is just a syntactic suggar for better readability and to easier work with sub resources.
         * using OF we are able to tell that some resource belongs to other resource
         *
         * @return {?}
         */
        function () {
            this.urlGroup.push(new OfParentSegment());
            return this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * Once tell what you want this is the last call you want to make to return resources as actual
     * Entities or Values.
     *
     * Todo: Maybe rename a method name as we can return both Entity and Value.
     *
     * You have also option to insert HttpOption
     *
     */
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
    Resource.prototype.asEntity = /**
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
    function (subscriber, options) {
        var _this = this;
        if (options === void 0) { options = { observe: 'body' }; }
        var /** @type {?} */ segment = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
        var /** @type {?} */ observable;
        var /** @type {?} */ actionType = segment.value;
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
        return observable.pipe(map(function (res) { return _this.convertToComposite(res, true, false); })).subscribe(subscriber);
    };
    /**
     * @template T
     * @param {?} subscriber
     * @param {?=} error
     * @param {?=} options
     * @return {?}
     */
    Resource.prototype.asHttpResponse = /**
     * @template T
     * @param {?} subscriber
     * @param {?=} error
     * @param {?=} options
     * @return {?}
     */
    function (subscriber, error, options) {
        var _this = this;
        if (options === void 0) { options = { observe: 'response' }; }
        var /** @type {?} */ segment = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Action));
        assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
        var /** @type {?} */ observable;
        var /** @type {?} */ actionType = segment.value;
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
        var /** @type {?} */ hasProgress = options.reportProgress || false;
        return observable.pipe(map(function (res) { return _this.convertToComposite(res, false, hasProgress); }))
            .subscribe(subscriber, error);
    };
    Object.defineProperty(Resource.prototype, "url", {
        /**
         *
         * Return assebled URL AST -> string
         *
         */
        get: /**
         *
         * Return assebled URL AST -> string
         *
         * @return {?}
         */
        function () {
            if (isBlank(this._url)) {
                var /** @type {?} */ isMocked = this.appConfig.getBoolean(AppConfig.ConnectionUseMockServer);
                this._url = this._urlBuilder.assembleUrl(isMocked);
            }
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "urlGroup", {
        /**
         * private
         *
         */
        get: /**
         * private
         *
         * @return {?}
         */
        function () {
            return this._urlGroup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "urlBuilder", {
        /**
         * private
         *
         */
        get: /**
         * private
         *
         * @return {?}
         */
        function () {
            return this._urlBuilder;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * private
     *
     * @return {?}
     */
    Resource.prototype.init = /**
     * private
     *
     * @return {?}
     */
    function () {
        this._urlGroup = new RestUrlGroup();
        this._urlBuilder = new DefaultRestBuilder(this._urlGroup);
        this._url = null;
        this.urlGroup.push(new HostSegment(this.appConfig.getRestApiHost()));
        this.urlGroup.push(new ContextSegment(this.appConfig.getRestApiContext()));
    };
    /**
     * Used inside .map to map JSON response or HttpResponse.body to actual type
     *
     * @template T
     * @param {?} res
     * @param {?} isComposite
     * @param {?} hasProgress
     * @return {?}
     */
    Resource.prototype.convertToComposite = /**
     * Used inside .map to map JSON response or HttpResponse.body to actual type
     *
     * @template T
     * @param {?} res
     * @param {?} isComposite
     * @param {?} hasProgress
     * @return {?}
     */
    function (res, isComposite, hasProgress) {
        if (hasProgress) {
            return res;
        }
        // unsorted segments will have have our target resource as first one
        var /** @type {?} */ sgm = /** @type {?} */ (this.urlGroup.lookup(RestSegmentType.Resource));
        if (isComposite) {
            return this.deserialize((/** @type {?} */ (res)).payload, sgm.value);
        }
        else {
            var /** @type {?} */ httpRes = /** @type {?} */ (res);
            var /** @type {?} */ myResp = {
                payload: this.deserialize(httpRes.body.payload, sgm.value)
            };
            return httpRes.clone({ body: myResp });
        }
    };
    /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    Resource.prototype.serialize = /**
     * @template T
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return JSON.stringify(data);
    };
    /**
     *
     * Converts JSON object to actual Type. We don't care about primitive types as we dont have to
     * do anything with them. We do instantiate objects or complex types only.
     *
     *
     */
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
    Resource.prototype.deserialize = /**
     *
     * Converts JSON object to actual Type. We don't care about primitive types as we dont have to
     * do anything with them. We do instantiate objects or complex types only.
     *
     *
     * @param {?} json
     * @param {?} clazz
     * @return {?}
     */
    function (json, clazz) {
        if (isArray(json)) {
            var /** @type {?} */ instances = [];
            for (var /** @type {?} */ item in json) {
                instances.push(this.deserialize(json[item], clazz));
            }
            return instances;
        }
        else {
            var /** @type {?} */ instance = void 0;
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
                var /** @type {?} */ types = instance.getTypes();
                for (var /** @type {?} */ prop in json) {
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
    };
    Resource.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Resource.ctorParameters = function () { return [
        { type: HttpClient },
        { type: AppConfig }
    ]; };
    return Resource;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
    }
    /**
     * @return {?}
     */
    NotFoundComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    NotFoundComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"page-container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"error-template\">\n                <h1> Oops!</h1>\n                <h2> 404 Not Found</h2>\n                <div class=\"error-details\"> Sorry, an error has occured, Requested page not found!\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>\n",
                    styles: [".error-template{padding:40px 15px;text-align:center}.error-actions{margin-top:15px;margin-bottom:15px}.error-actions .btn{margin-right:10px}"]
                },] },
    ];
    /** @nocollapse */
    NotFoundComponent.ctorParameters = function () { return []; };
    return NotFoundComponent;
}());

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
var RoutingService = /** @class */ (function () {
    function RoutingService(router) {
        var _this = this;
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
        this.router.events.subscribe(function (event) { return _this.subscribeToRoutingEvents(event); });
    }
    /**
     *
     * Here is the main routing logic that proceses every routing events.
     *
     */
    /**
     *
     * Here is the main routing logic that proceses every routing events.
     *
     * @param {?} event
     * @return {?}
     */
    RoutingService.prototype.subscribeToRoutingEvents = /**
     *
     * Here is the main routing logic that proceses every routing events.
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event instanceof NavigationEnd) {
            var /** @type {?} */ url = event.url;
            if (this.stateCacheHistory.has(url)) {
                this.stateCache.next(this.stateCacheHistory.get(url));
                this.stateCacheHistory.delete(url);
            }
            this.routingState.push(event);
        }
        if (event instanceof NavigationStart) {
            var /** @type {?} */ itemBeforeRoute = ListWrapper.last(this.routingState);
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
    };
    /**
     * Convenient GO BACK method. which takes you to previous route along with the URL change.
     *
     *
     */
    /**
     * Convenient GO BACK method. which takes you to previous route along with the URL change.
     *
     *
     * @param {?=} numOfSteps
     * @return {?}
     */
    RoutingService.prototype.goBack = /**
     * Convenient GO BACK method. which takes you to previous route along with the URL change.
     *
     *
     * @param {?=} numOfSteps
     * @return {?}
     */
    function (numOfSteps) {
        if (numOfSteps === void 0) { numOfSteps = 1; }
        // we are starting from -1 as we need to also remove current route
        var /** @type {?} */ steps = -1;
        var /** @type {?} */ navigateUrl = '/404';
        while (steps !== numOfSteps) {
            var /** @type {?} */ popState = this.routingState.pop();
            if (popState instanceof NavigationEnd || popState instanceof NavigationStart) {
                navigateUrl = popState.url;
                steps++;
            }
        }
        this.router.navigateByUrl(navigateUrl);
    };
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     */
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
    RoutingService.prototype.navigate = /**
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
    function (commands, state, extras) {
        this.currentStateFrom = state;
        this.router.navigate(commands, extras);
    };
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     */
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
    RoutingService.prototype.navigateWithRoute = /**
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
    function (route, params, state, extras) {
        this.currentStateTo = state;
        this.router.navigate([route.path, params], extras);
    };
    /**
     *
     * Entry method for broadcasting stateCache and sending saved State back to the page
     *
     *
     */
    /**
     *
     * Entry method for broadcasting stateCache and sending saved State back to the page
     *
     *
     * @template T
     * @param {?} listener
     * @return {?}
     */
    RoutingService.prototype.bindStateCache = /**
     *
     * Entry method for broadcasting stateCache and sending saved State back to the page
     *
     *
     * @template T
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        this.stateCache.asObservable().subscribe(function (stateItem) { return listener(stateItem); });
    };
    /**
     * Utility method so check extra parameters which are passed using Matrix notation
     *
     *
     */
    /**
     * Utility method so check extra parameters which are passed using Matrix notation
     *
     *
     * @param {?} route
     * @return {?}
     */
    RoutingService.prototype.operation = /**
     * Utility method so check extra parameters which are passed using Matrix notation
     *
     *
     * @param {?} route
     * @return {?}
     */
    function (route) {
        var /** @type {?} */ operation = route.snapshot.params['o'];
        return isBlank(operation) || (operation !== 'view' && operation !== 'create' && operation !== 'edit')
            ? 'view' : operation;
    };
    /**
     * Assembles a path based on the current route.
     *
     */
    /**
     * Assembles a path based on the current route.
     *
     * @param {?} pageName
     * @param {?} pathName
     * @return {?}
     */
    RoutingService.prototype.pathForPage = /**
     * Assembles a path based on the current route.
     *
     * @param {?} pageName
     * @param {?} pathName
     * @return {?}
     */
    function (pageName, pathName) {
        return this.router.routerState.snapshot.url + "/" + pathName;
    };
    /**
     *
     * Search top level routes and return Route that has component name equal to pageName
     *
     *
     */
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
    RoutingService.prototype.routeForPage = /**
     *
     * Search top level routes and return Route that has component name equal to pageName
     *
     *
     * @param {?} pageName
     * @param {?=} pathName
     * @param {?=} activatedPath
     * @return {?}
     */
    function (pageName, pathName, activatedPath) {
        var /** @type {?} */ nextRoute;
        // we need this as we need to lookup if there is any route with given pageName as
        // child route, if not search for global onces
        var /** @type {?} */ normalizedPath = activatedPath.indexOf('/') === 0 ? activatedPath.substring(1) :
            activatedPath;
        var /** @type {?} */ currentRoute = this.router.config.find(function (r) {
            var /** @type {?} */ routePath = r.path.indexOf('/') === 0 ? r.path.substring(1) :
                r.path;
            return isPresent(normalizedPath) && normalizedPath === routePath;
        });
        // try to match the path and expected pageName
        if (isPresent(pathName) && isPresent(currentRoute) && currentRoute.children.length > 0) {
            nextRoute = currentRoute.children.find(function (r) {
                var /** @type {?} */ componentName = r.component.prototype.constructor.name;
                return pathName === r.path && pageName === componentName;
            });
        }
        else if (isPresent(pageName)) {
            nextRoute = this.router.config.find(function (r) {
                var /** @type {?} */ componentName = r.component.prototype.constructor.name;
                return pathName === r.path && pageName === componentName;
            });
        }
        // path not found then check only if we find anywhere in the path pageNae
        if (isBlank(nextRoute)) {
            this.router.config.forEach(function (r) {
                if (isPresent(r.component)) {
                    var /** @type {?} */ componentName = r.component.prototype.constructor.name;
                    if (pageName === componentName) {
                        nextRoute = r;
                    }
                }
            });
        }
        return nextRoute;
    };
    RoutingService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RoutingService.ctorParameters = function () { return [
        { type: Router }
    ]; };
    return RoutingService;
}());

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
var Notifications = /** @class */ (function () {
    function Notifications() {
        this.events = new Subject();
    }
    /**
     *
     * Subscribe to specific listener based on given topic.
     *
     */
    /**
     *
     * Subscribe to specific listener based on given topic.
     *
     * @param {?} topic
     * @param {?} subscriber
     * @return {?}
     */
    Notifications.prototype.subscribe = /**
     *
     * Subscribe to specific listener based on given topic.
     *
     * @param {?} topic
     * @param {?} subscriber
     * @return {?}
     */
    function (topic, subscriber) {
        var /** @type {?} */ toAll = Notifications.AllTopics;
        return this.events.pipe(filter(function (msg) { return msg.topic === topic || topic === toAll; }), map(function (msg) { return msg.content; })).subscribe(subscriber);
    };
    /**
     *
     * Publish new event to a topic
     *
     */
    /**
     *
     * Publish new event to a topic
     *
     * @param {?} topic
     * @param {?} message
     * @return {?}
     */
    Notifications.prototype.publish = /**
     *
     * Publish new event to a topic
     *
     * @param {?} topic
     * @param {?} message
     * @return {?}
     */
    function (topic, message) {
        var /** @type {?} */ msg = { topic: topic, content: message };
        this.events.next(msg);
    };
    /**
     * When this is used as a topic subscriber receives all messages
     *
     */
    Notifications.AllTopics = '*';
    Notifications.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Notifications.ctorParameters = function () { return []; };
    return Notifications;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GlobalErrorHandler = /** @class */ (function (_super) {
    __extends(GlobalErrorHandler, _super);
    function GlobalErrorHandler(notifications) {
        var _this = _super.call(this) || this;
        _this.notifications = notifications;
        return _this;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    GlobalErrorHandler.prototype.handleError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        if (isPresent(this.notifications)) {
            this.notifications.publish('app:error', error);
        }
    };
    GlobalErrorHandler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GlobalErrorHandler.ctorParameters = function () { return [
        { type: Notifications }
    ]; };
    return GlobalErrorHandler;
}(ErrorHandler));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ routes = [
    { path: 'not-found', component: NotFoundComponent }
];
var AribaCoreRoutingModule = /** @class */ (function () {
    function AribaCoreRoutingModule() {
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
    return AribaCoreRoutingModule;
}());

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
var HttpMockInterceptor = /** @class */ (function () {
    function HttpMockInterceptor(appConfig) {
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
     */
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
    HttpMockInterceptor.prototype.intercept = /**
     *
     * If route is found returned Mock resuled defined in the JSON files, otherwise pass
     * the request to the next interceptor.
     *
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var /** @type {?} */ mockedResp = this.makeRes(req);
        if (isPresent(mockedResp)) {
            if (mockedResp.status >= 200 && mockedResp.status < 300) {
                return of(/** @type {?} */ (mockedResp));
            }
            else {
                var /** @type {?} */ errror = new HttpErrorResponse({
                    error: mockedResp.body,
                    status: mockedResp.status,
                    statusText: mockedResp.statusText,
                    url: req.urlWithParams
                });
                throwError(errror);
            }
        }
        return next.handle(req);
    };
    /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     */
    /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     * @return {?}
     */
    HttpMockInterceptor.prototype.loadRoutes = /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ routes = this.appConfig.get(AppConfig.ConnectionMockServerRoutes);
        try {
            for (var routes_1 = __values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
                var routeName = routes_1_1.value;
                var /** @type {?} */ req = this.makeReq(routeName);
                // let's make quick and dirty async call to load our routes before anything else
                var /** @type {?} */ mocked = this.requestForRoutes(req);
                this.routesByEntity.set(mocked.resource, mocked.routes);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (routes_1_1 && !routes_1_1.done && (_a = routes_1.return)) _a.call(routes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    /**
     *
     * Returns configuration based on mock JSON files.
     *
     * @param {?} req
     * @return {?}
     */
    HttpMockInterceptor.prototype.requestForRoutes = /**
     *
     * Returns configuration based on mock JSON files.
     *
     * @param {?} req
     * @return {?}
     */
    function (req) {
        var /** @type {?} */ xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open(req.method, req.urlWithParams, false);
        req.headers.keys().forEach(function (key) {
            var /** @type {?} */ all = req.headers.getAll(key);
            xmlHttpReq.setRequestHeader(name, all.join(','));
        });
        xmlHttpReq.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xmlHttpReq.send(null);
        var /** @type {?} */ body = isBlank(xmlHttpReq.response) ? xmlHttpReq.responseText :
            xmlHttpReq.response;
        if (xmlHttpReq.status < 200 && xmlHttpReq.status >= 300) {
            throw new Error('Cannot load Mock server configuration. Please make sure that you' +
                ' have a mock-routing/ folder under your assets');
        }
        return isString(body) ? JSON.parse(body) : body;
    };
    /**
     *
     * Create a requests to load routes
     *
     * @param {?} routeName
     * @return {?}
     */
    HttpMockInterceptor.prototype.makeReq = /**
     *
     * Create a requests to load routes
     *
     * @param {?} routeName
     * @return {?}
     */
    function (routeName) {
        var /** @type {?} */ assetFolder = this.appConfig.get(AppConfig.AssetFolder);
        var /** @type {?} */ path = this.appConfig.get(AppConfig.ConnectionMockServerPath);
        return new HttpRequest('GET', "" + assetFolder + path + "/" + routeName + ".json", {
            responseType: 'json'
        });
    };
    /**
     *
     * When we are creating a response we always expect two things:
     * 1) We are dealing with Entity
     * 2) REST API is handled using Resource which prepend /mocked/
     *
     * @param {?} req
     * @return {?}
     */
    HttpMockInterceptor.prototype.makeRes = /**
     *
     * When we are creating a response we always expect two things:
     * 1) We are dealing with Entity
     * 2) REST API is handled using Resource which prepend /mocked/
     *
     * @param {?} req
     * @return {?}
     */
    function (req) {
        var /** @type {?} */ responseOp;
        var /** @type {?} */ path = req.urlWithParams.substring(req.url.indexOf('mocked') + 6);
        var /** @type {?} */ resource = path.substring(1);
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
    };
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
    HttpMockInterceptor.prototype.doHandleRequest = /**
     *
     * This will get the content from the routes -> route as it as and return it as a
     * response
     *
     * @param {?} req
     * @param {?} path
     * @param {?} resource
     * @return {?}
     */
    function (req, path, resource) {
        var /** @type {?} */ routes = this.routesByEntity.get(resource);
        var /** @type {?} */ matchedRoute = routes.findIndex(function (el) {
            return req.method.toLowerCase() === el.method.toLowerCase() && el.path === path;
        });
        if (matchedRoute !== -1) {
            var /** @type {?} */ route = routes[matchedRoute];
            var /** @type {?} */ payload = {
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
    };
    HttpMockInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HttpMockInterceptor.ctorParameters = function () { return [
        { type: AppConfig }
    ]; };
    return HttpMockInterceptor;
}());
/**
 * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
 */
var /**
 * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
 */
MockInterceptorHandler = /** @class */ (function () {
    function MockInterceptorHandler(next, interceptor) {
        this.next = next;
        this.interceptor = interceptor;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    MockInterceptorHandler.prototype.handle = /**
     * @param {?} req
     * @return {?}
     */
    function (req) {
        return this.interceptor.intercept(req, this.next);
    };
    return MockInterceptorHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ UserConfig = new InjectionToken('UserConfig');
/**
 * Core mode includes all shared logic accross whole application
 */
var AribaCoreModule = /** @class */ (function () {
    function AribaCoreModule(parentModule, conf) {
        this.conf = conf;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    AribaCoreModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
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
    };
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
    AribaCoreModule.ctorParameters = function () { return [
        { type: AribaCoreModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: AppConfig }
    ]; };
    return AribaCoreModule;
}());
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
function makeHttpClientHandler(ngBackend, config, mockInterceptor, interceptors) {
    if (interceptors === void 0) { interceptors = []; }
    if (config.getBoolean(AppConfig.ConnectionUseMockServer)) {
        mockInterceptor.loadRoutes();
        interceptors = __spread(interceptors, [mockInterceptor]);
    }
    if (!interceptors) {
        return ngBackend;
    }
    return interceptors.reduceRight(function (next, interceptor) { return new MockInterceptorHandler(next, interceptor); }, ngBackend);
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
var  /**
 * The FieldPath is utility class for representing of a dotted fieldPath.
 *
 * A String such as "foo.bar.baz" can be used to access a value on a target object.
 *
 */
FieldPath = /** @class */ (function () {
    function FieldPath(_path) {
        this._path = _path;
        this._fieldPaths = isBlank(_path) ? [] : _path.split('.');
        this.objectPathInstance = create({ includeInheritedProps: true });
    }
    /**
     *
     * Sets a value to target objects
     *
     */
    /**
     *
     * Sets a value to target objects
     *
     * @param {?} target
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    FieldPath.setFieldValue = /**
     *
     * Sets a value to target objects
     *
     * @param {?} target
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    function (target, field, value) {
        var /** @type {?} */ fp = new FieldPath(field);
        fp.setFieldValue(target, value);
    };
    /**
     * Reads a value from target objects
     */
    /**
     * Reads a value from target objects
     * @param {?} target
     * @param {?} field
     * @return {?}
     */
    FieldPath.getFieldValue = /**
     * Reads a value from target objects
     * @param {?} target
     * @param {?} field
     * @return {?}
     */
    function (target, field) {
        var /** @type {?} */ fp = new FieldPath(field);
        var /** @type {?} */ value = fp.getFieldValue(target);
        if (field === '$toString') {
            return value();
        }
        return value;
    };
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
    FieldPath.prototype.setFieldValue = /**
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
    function (target, value) {
        // implement the same thing what we have on the get, if Map set field into map
        if (this._fieldPaths.length > 1 && !(target instanceof Map)) {
            var /** @type {?} */ path = this._fieldPaths.slice(0, this._fieldPaths.length - 1).join('.');
            var /** @type {?} */ objectToBeUpdated = this.objectPathInstance.get(target, path);
            if (objectToBeUpdated instanceof Map) {
                objectToBeUpdated.set(this._fieldPaths[this._fieldPaths.length - 1], value);
            }
            else {
                this.objectPathInstance.set(target, this._path, value);
            }
        }
        if (target instanceof Map) {
            var /** @type {?} */ mapTarget = target;
            // handle Nested Map
            if (this._fieldPaths.length > 1) {
                var /** @type {?} */ path = this._fieldPaths.splice(0, 1);
                var /** @type {?} */ nestedMap = mapTarget.get(path[0]);
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
    };
    /**
     * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
     * as ready value from Maps.
     *
     * todo: this is quick and dirty implementation - need to write better solution
     */
    /**
     * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
     * as ready value from Maps.
     *
     * todo: this is quick and dirty implementation - need to write better solution
     * @param {?} target
     * @return {?}
     */
    FieldPath.prototype.getFieldValue = /**
     * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
     * as ready value from Maps.
     *
     * todo: this is quick and dirty implementation - need to write better solution
     * @param {?} target
     * @return {?}
     */
    function (target) {
        var /** @type {?} */ value;
        for (var /** @type {?} */ i = 0; i < this._fieldPaths.length; i++) {
            if ((isStringMap(target) || isString(target)) && !(target instanceof Map)) {
                value = this.objectPathInstance.get(target, this._fieldPaths[i]);
                target = value;
            }
            else if (target instanceof Map) {
                var /** @type {?} */ targetMap = target;
                value = targetMap.get(this._fieldPaths[i]);
            }
            // just tweak to be able to access maps field.someMapField.mapKey
            // I want this to get the element from the map
            if (value instanceof Map && (i + 1) < this._fieldPaths.length) {
                var /** @type {?} */ mapValue = /** @type {?} */ (value);
                return mapValue.get(this._fieldPaths[i + 1]);
            }
        }
        return value;
    };
    Object.defineProperty(FieldPath.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FieldPath.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this._path;
    };
    return FieldPath;
}());

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
var  /**
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
AribaApplication = /** @class */ (function () {
    function AribaApplication(appConfig) {
        this.appConfig = appConfig;
        this.metaTags = this.appConfig.injector.get(Meta);
        this.title = this.appConfig.injector.get(Title);
    }
    /**
     * @return {?}
     */
    AribaApplication.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initialize();
    };
    /**
     * Current default behavior just sets a title for the application
     */
    /**
     * Current default behavior just sets a title for the application
     * @return {?}
     */
    AribaApplication.prototype.initialize = /**
     * Current default behavior just sets a title for the application
     * @return {?}
     */
    function () {
        var /** @type {?} */ title = this.appConfig.get(AppConfig.AppTitle);
        if (isBlank(title)) {
            title = 'Ariba Application';
        }
        this.title.setTitle(title);
    };
    return AribaApplication;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AppConfig, makeConfig, Environment, Resource, DefaultRestBuilder, isEntity, isValue, ActionSegment, RestAction, ResourceSegment, RestSegmentType, UrlSegment, ContextSegment, HostSegment, IdentifierSegment, OfParentSegment, RestUrlGroup, MapWrapper, StringMapWrapper, ListWrapper, isListLikeIterable$1 as isListLikeIterable, areIterablesEqual, iterateListLike, findLast, getTypeNameForDebugging, unimplemented, isPresent, isBlank, isBoolean, isNumber, isString, isFunction, isType, isStringMap, isStrictStringMap, isPromise, isArray, isDate, isWindow, isRegExp, noop, stringify, className, applyMixins, StringWrapper, StringJoiner, NumberWrapper, FunctionWrapper, looseIdentical, getMapKey, normalizeBlank, normalizeBool, isJsObject, print, warn, assert, checksum, crc32, Json, DateWrapper, BooleanWrapper, getSymbolIterator, evalExpression, evalExpressionWithCntx, isPrimitive, hasConstructor, escape, escapeRegExp, hashCode, objectToName, equals, shiftLeft, shiftRight, Extensible, readGlobalParam, decamelize, nonPrivatePrefix, hasGetter, uuid, NotFoundComponent, RoutingService, AribaCoreModule, FieldPath, AribaApplication, Notifications, AribaCoreRoutingModule as ɵc, UserConfig as ɵa, makeHttpClientHandler as ɵb, GlobalErrorHandler as ɵe, HttpMockInterceptor as ɵd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmF1aS1jb3JlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYXJpYmF1aS9jb3JlL3V0aWxzL2xhbmcudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvdXRpbHMvY29sbGVjdGlvbi50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9jb25maWcvYXBwLWNvbmZpZy50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9jb25maWcvZW52aXJvbm1lbnQudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZG9tYWluL2RvbWFpbi1tb2RlbC50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9kb21haW4vdXJsL3NlZ21lbnQudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZG9tYWluL3VybC9idWlsZGVyLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2RvbWFpbi91cmwvdXJsLWdyb3VwLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2RvbWFpbi9yZXNvdXJjZS5zZXJ2aWNlLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL25vdC1mb3VuZC9ub3QtZm91bmQuY29tcG9uZW50LnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL3JvdXRpbmcvcm91dGluZy5zZXJ2aWNlLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL21lc3NhZ2luZy9ub3RpZmljYXRpb25zLnNlcnZpY2UudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZ2xvYmFsLWVycm9yLWhhbmRsZXIudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvYXJpYmEtY29yZS1yb3V0aW5nLm1vZHVsZS50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9odHRwL2h0dHAtbW9jay1pbnRlcmNlcHRvci50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9hcmliYS5jb3JlLm1vZHVsZS50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS91dGlscy9maWVsZC1wYXRoLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2FyaWJhLWFwcGxpY2F0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBvcmlnaW5hbC1saWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqXG4gKlxuICpcbiAqICBDcmVkaXQ6IERlcml2ZWQgYW5kIGV4dGVuZGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhciBpbiBvcmRlciB0byBoYXZlIHNldCBvZlxuICogIHJldXNhYmxlIGdsb2JhbHMuIFNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJIG5lZWQgdG8gaGF2ZSBhIGNvcHkgdW5kZXIgY29yZS5cbiAqL1xuaW1wb3J0ICogYXMgYmlnSW50SW1wb3J0ZWQgZnJvbSAnYmlnLWludGVnZXInO1xuXG5jb25zdCBiaWdJbnQgPSBiaWdJbnRJbXBvcnRlZDtcblxuLyoqXG4gKiAgU2V0IG9mIHJldXNhYmxlIGdsb2JhbHMuIFRoaXMgaXMgdGFrZW4gZnJvbSB0aGUgQW5ndWxhciAyIHNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJLiBBbmQgdGhlcmVcbiAqICBpcyBhIG5lZWQgZm9yIHN1Y2ggY29tbW9uIGZ1bmN0aW9ucyBhbmQgd3JhcHBlcnNcbiAqXG4gKi9cblxuY29uc3QgX193aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG5jb25zdCBfZ2xvYmFsOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IF9fd2luZG93O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkR2xvYmFsUGFyYW0odmFyTmFtZTogYW55KTogeyBbbmFtZTogc3RyaW5nXTogYW55IH0ge1xuICAgIHJldHVybiBfZ2xvYmFsW3Zhck5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEdsb2JhbFR5cGUodmFyTmFtZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gX2dsb2JhbFt2YXJOYW1lXTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcodHlwZTogYW55KTogc3RyaW5nIHtcbiAgICBpZiAodHlwZVsnbmFtZSddKSB7XG4gICAgICAgIHJldHVybiB0eXBlWyduYW1lJ107XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgdHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaW1wbGVtZW50ZWQoKTogYW55IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJlc2VudChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbihvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKG9iajogYW55KTogb2JqIGlzIHN0cmluZyB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24ob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nTWFwKG9iajogYW55KTogb2JqIGlzIE9iamVjdCB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbDtcbn1cblxuY29uc3QgU1RSSU5HX01BUF9QUk9UTyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih7fSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmljdFN0cmluZ01hcChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1N0cmluZ01hcChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBTVFJJTkdfTUFQX1BST1RPO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgLy8gYWxsb3cgYW55IFByb21pc2UvQSsgY29tcGxpYW50IHRoZW5hYmxlLlxuICAgIC8vIEl0J3MgdXAgdG8gdGhlIGNhbGxlciB0byBlbnN1cmUgdGhhdCBvYmoudGhlbiBjb25mb3JtcyB0byB0aGUgc3BlY1xuICAgIHJldHVybiBpc1ByZXNlbnQob2JqKSAmJiBpc0Z1bmN0aW9uKG9iai50aGVuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlKG9iajogYW55KTogb2JqIGlzIERhdGUge1xuICAgIHJldHVybiAob2JqIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ob2JqLnZhbHVlT2YoKSkpIHx8XG4gICAgICAgIChpc1ByZXNlbnQob2JqKSAmJiBpc0Z1bmN0aW9uKG9iai5ub3cpKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc0pzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopIHx8XG4gICAgICAgICghKG9iaiBpbnN0YW5jZW9mIE1hcCkgJiYgICAgICAvLyBKUyBNYXAgYXJlIGl0ZXJhYmxlcyBidXQgcmV0dXJuIGVudHJpZXMgYXMgW2ssIHZdXG4gICAgICAgICAgICBnZXRTeW1ib2xJdGVyYXRvcigpIGluIG9iaik7ICAvLyBKUyBJdGVyYWJsZSBoYXZlIGEgU3ltYm9sLml0ZXJhdG9yIHByb3Bcbn1cblxuXG4vKipcbiAqIENoZWNrcyBpZiBgb2JqYCBpcyBhIHdpbmRvdyBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNXaW5kb3cob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai53aW5kb3cgPT09IG9iajtcbn1cblxuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZWdFeHAodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2hpZnRMZWZ0KGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gYmlnSW50KGEpLnNoaWZ0TGVmdChiKS52YWx1ZU9mKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaWZ0UmlnaHQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBiaWdJbnQoYSkuc2hpZnRSaWdodChiKS52YWx1ZU9mKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeSh0b2tlbjogYW55KTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRva2VuID09PSB1bmRlZmluZWQgfHwgdG9rZW4gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnICsgdG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRva2VuLm92ZXJyaWRkZW5OYW1lKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi5vdmVycmlkZGVuTmFtZTtcbiAgICB9XG4gICAgaWYgKHRva2VuLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuLm5hbWU7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IHRva2VuLnRvU3RyaW5nKCk7XG4gICAgbGV0IG5ld0xpbmVJbmRleCA9IHJlcy5pbmRleE9mKCdcXG4nKTtcbiAgICByZXR1cm4gKG5ld0xpbmVJbmRleCA9PT0gLTEpID8gcmVzIDogcmVzLnN1YnN0cmluZygwLCBuZXdMaW5lSW5kZXgpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc05hbWUoY2xheno6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKGlzUHJlc2VudChjbGF6ei5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgbGV0IGNsYXNzTiA9IGNsYXp6LmNvbnN0cnVjdG9yLnRvU3RyaW5nKCk7XG4gICAgICAgIGNsYXNzTiA9IGNsYXNzTi5zdWJzdHIoJ2Z1bmN0aW9uICcubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGNsYXNzTi5zdWJzdHIoMCwgY2xhc3NOLmluZGV4T2YoJygnKSk7XG4gICAgfVxuICAgIHJldHVybiBjbGF6ejtcbn1cblxuXG4vKipcbiAqICBTb3VyY2U6IGh0dHBzOi8vd3d3LnR5cGVzY3JpcHRsYW5nLm9yZy9kb2NzL2hhbmRib29rL21peGlucy5odG1sXG4gKlxuICogIEZ1bmN0aW9uIHRoYXQgY29waWVzIHByb3BlcnRpZXMgb2YgdGhlIGJhc2VDdG9ycyB0byBkZXJpdmVkQ3Rvci5cbiAqICBDYW4gYmUgdXNlZCB0byBhY2hpZXZlIG11bHRpcGxlIGluaGVyaXRhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNaXhpbnMoZGVyaXZlZEN0b3I6IGFueSwgYmFzZUN0b3JzOiBhbnlbXSkge1xuICAgIGJhc2VDdG9ycy5mb3JFYWNoKGJhc2VDdG9yID0+IHtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmFzZUN0b3IucHJvdG90eXBlKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgZGVyaXZlZEN0b3IucHJvdG90eXBlW25hbWVdXG4gICAgICAgICAgICAgICAgPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nV3JhcHBlciB7XG4gICAgc3RhdGljIGZyb21DaGFyQ29kZShjb2RlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hhckNvZGVBdChzOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3BsaXQoczogc3RyaW5nLCByZWdFeHA6IFJlZ0V4cCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHMuc3BsaXQocmVnRXhwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKHM6IHN0cmluZywgczI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcyA9PT0gczI7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0cmlwTGVmdChzOiBzdHJpbmcsIGNoYXJWYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmIChzICYmIHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzW2ldICE9PSBjaGFyVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMgPSBzLnN1YnN0cmluZyhwb3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdHJpcFJpZ2h0KHM6IHN0cmluZywgY2hhclZhbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNbaV0gIT09IGNoYXJWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2Uoczogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgcmVwbGFjZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2VBbGwoczogc3RyaW5nLCBmcm9tOiBSZWdFeHAsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgcmVwbGFjZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNsaWNlPFQ+KHM6IHN0cmluZywgZnJvbTogbnVtYmVyID0gMCwgdG86IG51bWJlciA9IG51bGwpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gcy5zbGljZShmcm9tLCB0byA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHRvKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnMoczogc3RyaW5nLCBzdWJzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcy5pbmRleE9mKHN1YnN0cikgIT09IC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb21wYXJlKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBlbmRzV2lkdGgoc3ViamVjdDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDApOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSB7XG4gICAgICAgICAgICBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHNzdHJpbmcsIHBvcyA9IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgc3ViamVjdFN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBvcyAhPT0gJ251bWJlcicgfHwgIWlzRmluaXRlKHBvcykgfHwgTWF0aC5mbG9vcihwb3MpICE9PSBwb3MgfHwgcG9zXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdFN0cmluZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gc3ViamVjdFN0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcyAtPSBzc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEluZGV4ID0gc3ViamVjdFN0cmluZy5pbmRleE9mKHNzdHJpbmcsIHBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3M7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmVuZHNXaXRoKHNlYXJjaFN0cmluZyk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgc3RhcnRzV2lkdGgoc3ViamVjdDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gc3ViamVjdC5pbmRleE9mKHNlYXJjaFN0cmluZykgPT09IDA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nSm9pbmVyIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFydHM6IHN0cmluZ1tdID0gW10pIHtcbiAgICB9XG5cbiAgICBhZGQocGFydDogc3RyaW5nKTogU3RyaW5nSm9pbmVyIHtcbiAgICAgICAgdGhpcy5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIGxhc3QoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHNbdGhpcy5wYXJ0cy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cy5qb2luKCcnKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE51bWJlcldyYXBwZXIge1xuICAgIHN0YXRpYyB0b0ZpeGVkKG46IG51bWJlciwgZnJhY3Rpb25EaWdpdHM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBuLnRvRml4ZWQoZnJhY3Rpb25EaWdpdHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbChhOiBudW1iZXIsIGI6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VJbnRBdXRvUmFkaXgodGV4dDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCk7XG4gICAgICAgIGlmIChpc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50ZWdlciBsaXRlcmFsIHdoZW4gcGFyc2luZyAnICsgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VJbnQodGV4dDogc3RyaW5nLCByYWRpeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHJhZGl4ID09PSAxMCkge1xuICAgICAgICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTldKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJhZGl4ID09PSAxNikge1xuICAgICAgICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTlBQkNERUZhYmNkZWZdKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCBpbnRlZ2VyIGxpdGVyYWwgd2hlbiBwYXJzaW5nICcgKyB0ZXh0ICsgJyBpbiBiYXNlICcgKyByYWRpeCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogTmFOIGlzIGEgdmFsaWQgbGl0ZXJhbCBidXQgaXMgcmV0dXJuZWQgYnkgcGFyc2VGbG9hdCB0byBpbmRpY2F0ZSBhbiBlcnJvci5cbiAgICBzdGF0aWMgcGFyc2VGbG9hdCh0ZXh0OiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0ZXh0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOdW1lcmljKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFpc05hTih2YWx1ZSAtIHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOYU4odmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0ludGVnZXIodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25XcmFwcGVyIHtcbiAgICBzdGF0aWMgYXBwbHkoZm46IEZ1bmN0aW9uLCBwb3NBcmdzOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgcG9zQXJncyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGJpbmQoZm46IEZ1bmN0aW9uLCBzY29wZTogYW55KTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gZm4uYmluZChzY29wZSk7XG4gICAgfVxufVxuXG4vLyBKUyBoYXMgTmFOICE9PSBOYU5cbmV4cG9ydCBmdW5jdGlvbiBsb29zZUlkZW50aWNhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhID09PSBiIHx8IHR5cGVvZiBhID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgYiA9PT0gJ251bWJlcicgJiYgaXNOYU4oYSkgJiYgaXNOYU4oYik7XG59XG5cbi8vIEpTIGNvbnNpZGVycyBOYU4gaXMgdGhlIHNhbWUgYXMgTmFOIGZvciBtYXAgS2V5ICh3aGlsZSBOYU4gIT09IE5hTiBvdGhlcndpc2UpXG4vLyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFwS2V5PFQ+KHZhbHVlOiBUKTogVCB7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQmxhbmsob2JqOiBPYmplY3QpOiBhbnkge1xuICAgIHJldHVybiBpc0JsYW5rKG9iaikgPyBudWxsIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQm9vbChvYmo6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNCbGFuayhvYmopID8gZmFsc2UgOiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0pzT2JqZWN0KG86IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvICE9PSBudWxsICYmICh0eXBlb2YgbyA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgbyA9PT0gJ29iamVjdCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnQob2JqOiBFcnJvciB8IE9iamVjdCkge1xuICAgIGNvbnNvbGUubG9nKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuKG9iajogRXJyb3IgfCBPYmplY3QpIHtcbiAgICBjb25zb2xlLndhcm4ob2JqKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbjogYm9vbGVhbiwgbXNnOiBzdHJpbmcpIHtcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja3N1bShzOiBhbnkpIHtcbiAgICBsZXQgY2hrID0gMHgxMjM0NTY3ODtcbiAgICBsZXQgbGVuID0gcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGsgKz0gKHMuY2hhckNvZGVBdChpKSAqIChpICsgMSkpO1xuICAgIH1cblxuICAgIHJldHVybiAoY2hrICYgMHhmZmZmZmZmZikudG9TdHJpbmcoMTYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JjMzIoY3JjOiBudW1iZXIsIGFuSW50OiBudW1iZXIpIHtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgIGxldCB0YWJsZSA9ICcwMDAwMDAwMCA3NzA3MzA5NiBFRTBFNjEyQyA5OTA5NTFCQSAwNzZEQzQxOSA3MDZBRjQ4RiBFOTYzQTUzNSA5RTY0OTVBMyAwRURCODgzMiA3OURDQjhBNCBFMEQ1RTkxRSA5N0QyRDk4OCAwOUI2NEMyQiA3RUIxN0NCRCBFN0I4MkQwNyA5MEJGMUQ5MSAxREI3MTA2NCA2QUIwMjBGMiBGM0I5NzE0OCA4NEJFNDFERSAxQURBRDQ3RCA2RERERTRFQiBGNEQ0QjU1MSA4M0QzODVDNyAxMzZDOTg1NiA2NDZCQThDMCBGRDYyRjk3QSA4QTY1QzlFQyAxNDAxNUM0RiA2MzA2NkNEOSBGQTBGM0Q2MyA4RDA4MERGNSAzQjZFMjBDOCA0QzY5MTA1RSBENTYwNDFFNCBBMjY3NzE3MiAzQzAzRTREMSA0QjA0RDQ0NyBEMjBEODVGRCBBNTBBQjU2QiAzNUI1QThGQSA0MkIyOTg2QyBEQkJCQzlENiBBQ0JDRjk0MCAzMkQ4NkNFMyA0NURGNUM3NSBEQ0Q2MERDRiBBQkQxM0Q1OSAyNkQ5MzBBQyA1MURFMDAzQSBDOEQ3NTE4MCBCRkQwNjExNiAyMUI0RjRCNSA1NkIzQzQyMyBDRkJBOTU5OSBCOEJEQTUwRiAyODAyQjg5RSA1RjA1ODgwOCBDNjBDRDlCMiBCMTBCRTkyNCAyRjZGN0M4NyA1ODY4NEMxMSBDMTYxMURBQiBCNjY2MkQzRCA3NkRDNDE5MCAwMURCNzEwNiA5OEQyMjBCQyBFRkQ1MTAyQSA3MUIxODU4OSAwNkI2QjUxRiA5RkJGRTRBNSBFOEI4RDQzMyA3ODA3QzlBMiAwRjAwRjkzNCA5NjA5QTg4RSBFMTBFOTgxOCA3RjZBMERCQiAwODZEM0QyRCA5MTY0NkM5NyBFNjYzNUMwMSA2QjZCNTFGNCAxQzZDNjE2MiA4NTY1MzBEOCBGMjYyMDA0RSA2QzA2OTVFRCAxQjAxQTU3QiA4MjA4RjRDMSBGNTBGQzQ1NyA2NUIwRDlDNiAxMkI3RTk1MCA4QkJFQjhFQSBGQ0I5ODg3QyA2MkREMURERiAxNURBMkQ0OSA4Q0QzN0NGMyBGQkQ0NEM2NSA0REIyNjE1OCAzQUI1NTFDRSBBM0JDMDA3NCBENEJCMzBFMiA0QURGQTU0MSAzREQ4OTVENyBBNEQxQzQ2RCBEM0Q2RjRGQiA0MzY5RTk2QSAzNDZFRDlGQyBBRDY3ODg0NiBEQTYwQjhEMCA0NDA0MkQ3MyAzMzAzMURFNSBBQTBBNEM1RiBERDBEN0NDOSA1MDA1NzEzQyAyNzAyNDFBQSBCRTBCMTAxMCBDOTBDMjA4NiA1NzY4QjUyNSAyMDZGODVCMyBCOTY2RDQwOSBDRTYxRTQ5RiA1RURFRjkwRSAyOUQ5Qzk5OCBCMEQwOTgyMiBDN0Q3QThCNCA1OUIzM0QxNyAyRUI0MEQ4MSBCN0JENUMzQiBDMEJBNkNBRCBFREI4ODMyMCA5QUJGQjNCNiAwM0I2RTIwQyA3NEIxRDI5QSBFQUQ1NDczOSA5REQyNzdBRiAwNERCMjYxNSA3M0RDMTY4MyBFMzYzMEIxMiA5NDY0M0I4NCAwRDZENkEzRSA3QTZBNUFBOCBFNDBFQ0YwQiA5MzA5RkY5RCAwQTAwQUUyNyA3RDA3OUVCMSBGMDBGOTM0NCA4NzA4QTNEMiAxRTAxRjI2OCA2OTA2QzJGRSBGNzYyNTc1RCA4MDY1NjdDQiAxOTZDMzY3MSA2RTZCMDZFNyBGRUQ0MUI3NiA4OUQzMkJFMCAxMERBN0E1QSA2N0RENEFDQyBGOUI5REY2RiA4RUJFRUZGOSAxN0I3QkU0MyA2MEIwOEVENSBENkQ2QTNFOCBBMUQxOTM3RSAzOEQ4QzJDNCA0RkRGRjI1MiBEMUJCNjdGMSBBNkJDNTc2NyAzRkI1MDZERCA0OEIyMzY0QiBEODBEMkJEQSBBRjBBMUI0QyAzNjAzNEFGNiA0MTA0N0E2MCBERjYwRUZDMyBBODY3REY1NSAzMTZFOEVFRiA0NjY5QkU3OSBDQjYxQjM4QyBCQzY2ODMxQSAyNTZGRDJBMCA1MjY4RTIzNiBDQzBDNzc5NSBCQjBCNDcwMyAyMjAyMTZCOSA1NTA1MjYyRiBDNUJBM0JCRSBCMkJEMEIyOCAyQkI0NUE5MiA1Q0IzNkEwNCBDMkQ3RkZBNyBCNUQwQ0YzMSAyQ0Q5OUU4QiA1QkRFQUUxRCA5QjY0QzJCMCBFQzYzRjIyNiA3NTZBQTM5QyAwMjZEOTMwQSA5QzA5MDZBOSBFQjBFMzYzRiA3MjA3Njc4NSAwNTAwNTcxMyA5NUJGNEE4MiBFMkI4N0ExNCA3QkIxMkJBRSAwQ0I2MUIzOCA5MkQyOEU5QiBFNUQ1QkUwRCA3Q0RDRUZCNyAwQkRCREYyMSA4NkQzRDJENCBGMUQ0RTI0MiA2OEREQjNGOCAxRkRBODM2RSA4MUJFMTZDRCBGNkI5MjY1QiA2RkIwNzdFMSAxOEI3NDc3NyA4ODA4NUFFNiBGRjBGNkE3MCA2NjA2M0JDQSAxMTAxMEI1QyA4RjY1OUVGRiBGODYyQUU2OSA2MTZCRkZEMyAxNjZDQ0Y0NSBBMDBBRTI3OCBENzBERDJFRSA0RTA0ODM1NCAzOTAzQjNDMiBBNzY3MjY2MSBEMDYwMTZGNyA0OTY5NDc0RCAzRTZFNzdEQiBBRUQxNkE0QSBEOUQ2NUFEQyA0MERGMEI2NiAzN0Q4M0JGMCBBOUJDQUU1MyBERUJCOUVDNSA0N0IyQ0Y3RiAzMEI1RkZFOSBCREJERjIxQyBDQUJBQzI4QSA1M0IzOTMzMCAyNEI0QTNBNiBCQUQwMzYwNSBDREQ3MDY5MyA1NERFNTcyOSAyM0Q5NjdCRiBCMzY2N0EyRSBDNDYxNEFCOCA1RDY4MUIwMiAyQTZGMkI5NCBCNDBCQkUzNyBDMzBDOEVBMSA1QTA1REYxQiAyRDAyRUY4RCc7XG4gICAgLyogdHNsaW50OmVuYWJsZSAqL1xuXG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcblxuICAgIGxldCBteUNyYyA9IGNyYyBeICgtMSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgeSA9IChjcmMgXiBhbkludCkgJiAweEZGO1xuICAgICAgICB4ID0gTnVtYmVyKCcweCcgKyB0YWJsZS5zdWJzdHIoeSAqIDksIDgpKTtcbiAgICAgICAgY3JjID0gKGNyYyA+Pj4gOCkgXiB4O1xuICAgIH1cbiAgICByZXR1cm4gY3JjIF4gKC0xKTtcbn1cblxuXG4vLyBDYW4ndCBiZSBhbGwgdXBwZXJjYXNlIGFzIG91ciB0cmFuc3BpbGVyIHdvdWxkIHRoaW5rIGl0IGlzIGEgc3BlY2lhbCBkaXJlY3RpdmUuLi5cbmV4cG9ydCBjbGFzcyBKc29uIHtcbiAgICBzdGF0aWMgcGFyc2Uoczogc3RyaW5nKTogT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uocyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0cmluZ2lmeShkYXRhOiBPYmplY3QpOiBzdHJpbmcge1xuICAgICAgICAvLyBEYXJ0IGRvZXNuJ3QgdGFrZSAzIGFyZ3VtZW50c1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0ZVdyYXBwZXIge1xuICAgIHN0YXRpYyBjcmVhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyID0gMSwgZGF5OiBudW1iZXIgPSAxLCBob3VyOiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgICAgbWludXRlczogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICAgIHNlY29uZHM6IG51bWJlciA9IDAsIG1pbGxpc2Vjb25kczogbnVtYmVyID0gMCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21JU09TdHJpbmcoc3RyOiBzdHJpbmcpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHN0cik7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21NaWxsaXMobXM6IG51bWJlcik6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUobXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b01pbGxpcyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBub3coKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b0pzb24oZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkYXRlLnRvSlNPTigpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQm9vbGVhbldyYXBwZXIge1xuXG4gICAgc3RhdGljIGJvbGVhblZhbHVlKHZhbHVlOiBhbnkgPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodmFsdWUgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgaXNGYWxzZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ2ZhbHNlJztcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZ01hcCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlID09PSBmYWxzZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzVHJ1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nTWFwKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgPT09IHRydWUpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cblxuLy8gV2hlbiBTeW1ib2wuaXRlcmF0b3IgZG9lc24ndCBleGlzdCwgcmV0cmlldmVzIHRoZSBrZXkgdXNlZCBpbiBlczYtc2hpbVxuZGVjbGFyZSBsZXQgU3ltYm9sOiBhbnk7XG5sZXQgX3N5bWJvbEl0ZXJhdG9yOiBhbnkgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKTogc3RyaW5nIHwgc3ltYm9sIHtcbiAgICBpZiAoaXNCbGFuayhfc3ltYm9sSXRlcmF0b3IpKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoU3ltYm9sLml0ZXJhdG9yKSkge1xuICAgICAgICAgICAgX3N5bWJvbEl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZXM2LXNoaW0gc3BlY2lmaWMgbG9naWNcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTWFwLnByb3RvdHlwZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnZW50cmllcycgJiYga2V5ICE9PSAnc2l6ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgKE1hcCBhcyBhbnkpLnByb3RvdHlwZVtrZXldID09PSBNYXAucHJvdG90eXBlWydlbnRyaWVzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgX3N5bWJvbEl0ZXJhdG9yID0ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX3N5bWJvbEl0ZXJhdG9yO1xufVxuXG5jb25zdCBSZXNlcnZlZEtleXdvcmQgPSBbJ2NsYXNzJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsRXhwcmVzc2lvbihleHByOiBzdHJpbmcsIGRlY2xhcmF0aW9uczogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBhbnkge1xuICAgIGxldCBmbkJvZHkgPSBgJHtkZWNsYXJhdGlvbnN9XFxuXFx0cmV0dXJuICR7ZXhwcn1cXG4vLyMgc291cmNlVVJMPUFyaWJhRXhwcmVzc2lvbmA7XG4gICAgbGV0IGZuQXJnTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGZuQXJnVmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGFyZ05hbWUgaW4gbGV0cykge1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBhcmdOYW1lKSkge1xuICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaChsZXRzW2FyZ05hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGV0cyBpbnN0YW5jZW9mIEV4dGVuc2libGUpIHtcbiAgICAgICAgbGV0IGV4dFZhbHVlczogRXh0ZW5zaWJsZSA9IGxldHM7XG5cbiAgICAgICAgZXh0VmFsdWVzLmV4dGVuZGVkRmllbGRzKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwga2V5KSAmJlxuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEgJiYgUmVzZXJ2ZWRLZXl3b3JkLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGZuQXJnTmFtZXMucHVzaCgndGhpcycpO1xuICAgIC8vIGZuQXJnVmFsdWVzLnB1c2gobGV0cyk7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKSguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWxFeHByZXNzaW9uV2l0aENudHgoZXhwcjogc3RyaW5nLCBkZWNsYXJhdGlvbnM6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzQ29udGV4dDogYW55KTogYW55IHtcbiAgICBsZXQgZm5Cb2R5ID0gYCR7ZGVjbGFyYXRpb25zfVxcblxcdHJldHVybiAke2V4cHJ9XFxuLy8jIHNvdXJjZVVSTD1BcmliYUV4cHJlc3Npb25gO1xuICAgIGxldCBmbkFyZ05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBmbkFyZ1ZhbHVlczogYW55W10gPSBbXTtcbiAgICBmb3IgKGxldCBhcmdOYW1lIGluIGxldHMpIHtcbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwgYXJnTmFtZSkpIHtcbiAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChhcmdOYW1lKTtcbiAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2gobGV0c1thcmdOYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxldHMgaW5zdGFuY2VvZiBFeHRlbnNpYmxlKSB7XG4gICAgICAgIGxldCBleHRWYWx1ZXM6IEV4dGVuc2libGUgPSBsZXRzO1xuXG4gICAgICAgIGV4dFZhbHVlcy5leHRlbmRlZEZpZWxkcygpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGV4cHIsIGtleSkgJiZcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xICYmIFJlc2VydmVkS2V5d29yZC5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICBrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmbkFyZ05hbWVzLnB1c2goJ3RoaXMnKTtcbiAgICAvLyBmbkFyZ1ZhbHVlcy5wdXNoKGxldHMpO1xuICAgIGxldCBmbiA9IG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKTtcbiAgICBhc3NlcnQoaXNQcmVzZW50KGZuKSwgJ0Nhbm5vdCBldmFsdWF0ZSBleHByZXNzaW9uLiBGTiBpcyBub3QgZGVmaW5lZCcpO1xuICAgIGxldCBmbkJvdW5kID0gZm4uYmluZCh0aGlzQ29udGV4dCk7XG5cbiAgICByZXR1cm4gZm5Cb3VuZCguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNKc09iamVjdChvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ29uc3RydWN0b3IodmFsdWU6IE9iamVjdCwgdHlwZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVuY29kZVVSSShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzLnJlcGxhY2UoLyhbLiorP149IToke30oKXxbXFxdXFwvXFxcXF0pL2csICdcXFxcJDEnKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaGFzaENvZGUoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGxldCBoYXNoID0gMDtcbiAgICBsZXQgY2hhcjogbnVtYmVyO1xuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBoYXNoO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG59XG5cbi8qKlxuICpcbiAqIENvbnZlcnRzIG9iamVjdCB0byBhIG5hbWU7XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0VG9OYW1lKHRhcmdldDogYW55KTogc3RyaW5nIHtcbiAgICBpZiAoaXNCbGFuayh0YXJnZXQpIHx8ICghaXNTdHJpbmdNYXAodGFyZ2V0KSAmJiAhaXNUeXBlKHRhcmdldCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignIENhbm5vdCBjb252ZXJ0LiBVa25vd24gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzVHlwZSh0YXJnZXQpID8gdGFyZ2V0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lIDogdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWU7XG59XG5cbi8qKlxuICpcbiAqIEJhc2ljIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIFVVSUQgdGFrZW4gZnJvbSBXM0MgZnJvbSBvbmUgb2YgdGhlIGV4YW1wbGVzXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXVpZCgpOiBzdHJpbmcge1xuICAgIGxldCBkdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGxldCBwcm90byA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZyxcbiAgICAgICAgKGM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IHIgPSAoZHQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xuICAgICAgICAgICAgZHQgPSBNYXRoLmZsb29yKGR0IC8gMTYpO1xuICAgICAgICAgICAgcmV0dXJuIChjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVjayBvYmplY3QgZXF1YWxpdHkgZGVyaXZlZCBmcm9tIGFuZ3VsYXIuZXF1YWxzIDEuNSBpbXBsZW1lbnRhdGlvblxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhvMTogYW55LCBvMjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKG8xID09PSBvMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG8xID09PSBudWxsIHx8IG8yID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChvMSAhPT0gbzEgJiYgbzIgIT09IG8yKSB7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBOYU4gPT09IE5hTlxuICAgIH1cblxuICAgIGxldCB0MSA9IHR5cGVvZiBvMSwgdDIgPSB0eXBlb2YgbzIsIGxlbmd0aDogYW55LCBrZXk6IGFueSwga2V5U2V0OiBhbnk7XG4gICAgaWYgKHQxID09PSB0MiAmJiB0MSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChsZW5ndGggPSBvMS5sZW5ndGgpID09PSBvMi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSA9IDA7IGtleSA8IGxlbmd0aDsga2V5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShvMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKG8xLmdldFRpbWUoKSwgbzIuZ2V0VGltZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1JlZ0V4cChvMSkpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWdFeHAobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG8xLnRvU3RyaW5nKCkgPT09IG8yLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNXaW5kb3cobzEpIHx8IGlzV2luZG93KG8yKSB8fFxuICAgICAgICAgICAgICAgIGlzQXJyYXkobzIpIHx8IGlzRGF0ZShvMikgfHwgaXNSZWdFeHAobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5U2V0ID0gbmV3IE1hcDxzdHJpbmcsIGJvb2xlYW4+KCk7XG4gICAgICAgICAgICAvLyB1c2luZyBPYmplY3Qua2V5cyBhcyBpdGVyYXRpbmcgdGhydSBvYmplY3Qgc3RvcCB3b3JraW5nIGluIE5HNiwgVFMyLjdcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobzIpO1xuICAgICAgICAgICAgZm9yIChrZXkgaW4ga2V5cykge1xuICAgICAgICAgICAgICAgIGlmIChrZXlzW2tleV0uY2hhckF0KDApID09PSAnJCcgfHwgaXNGdW5jdGlvbihvMVtrZXlzW2tleV1dKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5c1trZXldXSwgbzJba2V5c1trZXldXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXlTZXQuc2V0KGtleXNba2V5XSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhvMik7XG4gICAgICAgICAgICBmb3IgKGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5U2V0LmhhcyhrZXkpKSAmJiBrZXkuY2hhckF0KDApICE9PSAnJCdcbiAgICAgICAgICAgICAgICAgICAgJiYgaXNQcmVzZW50KG8yW2tleV0pICYmICFpc0Z1bmN0aW9uKG8yW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cblxuLyoqXG4gKiB0cmFuc2Zvcm0gYSBzdHJpbmcgaW50byBkZWNhbWVsLiBmb3JtLiBNb3N0bHkgdXNlZCB3aGVuIHJlYWRpbmcgY2xhc3MgbmFtZXMgb3IgZmllbGQgbmFtZXNcbiAqIHN1Y2ggZmlyc3ROYW1lIGFuZCB3ZSB3YW50IHRvIGNyZWF0ZSBhIGxhYmVsIEZpcnN0IE5hbWVcbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjYW1lbGl6ZShzdHJpbmc6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcsIGluaXRpYWxDYXBzOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmIChpc0JsYW5rKHN0cmluZykpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGxldCBsYXN0VUNJbmRleCA9IC0xO1xuICAgIGxldCBhbGxDYXBzID0gdHJ1ZTtcblxuICAgIGxldCBzcGxpdE9uVUMgPSAhU3RyaW5nV3JhcHBlci5jb250YWlucyhzdHJpbmcsICdfJyk7XG4gICAgbGV0IGJ1ZiA9ICcnO1xuICAgIGxldCBpbldvcmQgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IHN0cmluZy5sZW5ndGg7IGluV29yZCA8IGk7ICsraW5Xb3JkKSB7XG4gICAgICAgIGxldCBjID0gc3RyaW5nW2luV29yZF07XG5cbiAgICAgICAgaWYgKGMudG9VcHBlckNhc2UoKSA9PT0gYykge1xuICAgICAgICAgICAgaWYgKChpbldvcmQgLSAxKSAhPT0gbGFzdFVDSW5kZXggJiYgc3BsaXRPblVDKSB7XG4gICAgICAgICAgICAgICAgYnVmICs9IHNlcGFyYXRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RVQ0luZGV4ID0gaW5Xb3JkO1xuICAgICAgICAgICAgaWYgKCFpbml0aWFsQ2Fwcykge1xuICAgICAgICAgICAgICAgIGMgPSBjLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYy50b0xvd2VyQ2FzZSgpID09PSBjKSB7XG4gICAgICAgICAgICBpZiAoaW5Xb3JkID09PSAwICYmIGluaXRpYWxDYXBzKSB7XG4gICAgICAgICAgICAgICAgYyA9IGMudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFsbENhcHMgPSBmYWxzZTtcblxuICAgICAgICB9IGVsc2UgaWYgKGMgIT09ICdfJykge1xuICAgICAgICAgICAgYyA9IHNlcGFyYXRvcjtcbiAgICAgICAgfVxuICAgICAgICBidWYgKz0gYztcbiAgICB9XG5cbiAgICBpZiAoYWxsQ2Fwcykge1xuICAgICAgICBsZXQgdG9DYXBzID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBjID0gYnVmLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNoID0gYnVmW2ldO1xuXG4gICAgICAgICAgICBpZiAoY2gudG9Mb3dlckNhc2UoKSAhPT0gY2gudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpbldvcmQgJiYgY2ggPT09IGNoLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmID0gYnVmLnN1YnN0cigwLCBpKSArIGNoLnRvTG93ZXJDYXNlKCkgKyBidWYuc3Vic3RyKGkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9DYXBzID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9DYXBzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJ1Zjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbm9uUHJpdmF0ZVByZWZpeChpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaW5wdXRbMF0gPT09ICdfJyA/IFN0cmluZ1dyYXBwZXIuc3RyaXBMZWZ0KGlucHV0LCAnXycpIDogaW5wdXQ7XG59XG5cblxuLyoqXG4gKlxuICogVGhpcyBjb25zaWRlcnMgY3VycmVudGx5IG9ubHkgMSBmb3JtIHdoaWNoIHdoZW4gd2UgaGF2ZSBnZXR0ZXIgd2UgaGF2ZSB0aGlzIGZvcm0gZm9yXG4gKiBkZWNsYXJhdGlvbiBfPG5hbWU+IGFuZCBnZXQgPG5hbWU+KCkuIEkgZG8gbm90IGNoZWNrIGFueSBvdGhlciBmb3JtcyBub3cuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0dldHRlcihpbnN0YW5jZTogYW55LCBmaWVsZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzQmxhbmsoZmllbGQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGZpZWxkWzBdID09PSAnXycgJiYgaXNQcmVzZW50KG5vblByaXZhdGVQcmVmaXgoZmllbGQpKSk7XG5cbn1cblxuLyoqXG4gKiBUaGUgRXh0ZW5zaWJsZSBpbnRlcmZhY2UgY2FuIGJlIGltcGxlbWVudGVkIHdoZW4gYSBnaXZlbiBjbGFzc1xuICogd2FudHMgdG8gcHJvdmlkZSBkeW5hbWljYWxseSBhZGRlZCBmaWVsZHMuICBPbmNlIHRoaXMgaXMgaW1wbGVtZW50ZWRcbiAqIHRvIHJldHVybiBhIE1hcCwgdGhlIEZpZWxkVmFsdWUgc3lzdGVtIHdpbGwgYmUgYWJsZSB0byBsb29rIGluXG4gKiB0aGUgTWFwIHRvIHNlZSBpZiB0aGUgZGVzaXJlZCBmaWVsZCBleGlzdHMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV4dGVuc2libGUge1xuXG4gICAgLyoqXG4gICAgICogIFJldHVybnMgdGhlIE1hcCBpbiB3aGljaCB0aGUgZHluYW1pY2FsbHkgYWRkZWQgZmllbGRzIHJlc2lkZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGV4dGVuZGVkRmllbGRzKCk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cbn1cblxuIiwiLyoqXG4gKlxuICogQG9yaWdpbmFsLWxpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICpcbiAqXG4gKlxuICogIENyZWRpdDogRGVyaXZlZCBhbmQgZXh0ZW5kZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyIGluIG9yZGVyIHRvIGhhdmUgc2V0IG9mXG4gKiAgcmV1c2FibGUgZ2xvYmFscy4gU2luY2UgaXRzIG5vdCBleHBvcnRlZCBBUEkgbmVlZCB0byBoYXZlIGEgY29weSB1bmRlciBjb3JlLlxuICovXG5pbXBvcnQgKiBhcyBDb2xsZWN0aW9ucyBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgY2xhc3NOYW1lLFxuICAgIGVxdWFscyxcbiAgICBnZXRTeW1ib2xJdGVyYXRvcixcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNKc09iamVjdCxcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgU3RyaW5nSm9pbmVyXG59IGZyb20gJy4vbGFuZyc7XG5cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1hcEZyb21NYXA6IHsgKG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+IH0gPSAoZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChuZXcgTWFwKDxhbnk+bmV3IE1hcCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZU1hcEZyb21NYXBJbm5lcihtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXAoPGFueT5tKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVNYXBBbmRQb3B1bGF0ZUZyb21NYXAobTogTWFwPGFueSwgYW55Pik6IE1hcDxhbnksIGFueT4ge1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgIG1hcC5zZXQoaywgdik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH07XG59KSgpO1xuZXhwb3J0IGNvbnN0IF9jbGVhclZhbHVlczogeyAobTogTWFwPGFueSwgYW55Pik6IHZvaWQgfSA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCg8YW55PihuZXcgTWFwKCkpLmtleXMoKSkubmV4dCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gX2NsZWFyVmFsdWVzSW5uZXIobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgICAgICAgbGV0IGtleUl0ZXJhdG9yID0gbS5rZXlzKCk7XG4gICAgICAgICAgICBsZXQgazogYW55IC8qKiBUT0RPICM/Pz8/ICovO1xuICAgICAgICAgICAgd2hpbGUgKCEoKGsgPSAoPGFueT5rZXlJdGVyYXRvcikubmV4dCgpKS5kb25lKSkge1xuICAgICAgICAgICAgICAgIG0uc2V0KGsudmFsdWUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBfY2xlYXJWYWx1ZXNXaXRoRm9yZUVhY2gobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgbS5zZXQoaywgbnVsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG5leHBvcnQgY2xhc3MgTWFwV3JhcHBlciB7XG5cbiAgICBzdGF0aWMgY3JlYXRlRW1wdHk8SywgVj4oKTogTWFwPEssIFY+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXA8SywgVj4oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xvbmU8SywgVj4obTogTWFwPEssIFY+KTogTWFwPEssIFY+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuZXcgTWFwKDxhbnk+bmV3IE1hcCgpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWFwPEssIFY+KDxhbnk+IG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICBtYXAuc2V0KGssIHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRnJvbVN0cmluZ01hcDxUPihzdHJpbmdNYXA6IHsgW2tleTogc3RyaW5nXTogVCB9KTogTWFwPHN0cmluZywgVD4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzdHJpbmdNYXApIHtcbiAgICAgICAgICAgIHJlc3VsdC5zZXQoa2V5LCBzdHJpbmdNYXBba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjcmVhdGVGcm9tQW55TWFwPFQ+KHN0cmluZ01hcDogeyBba2V5OiBzdHJpbmddOiBUIH0pOiBNYXA8YW55LCBUPiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPGFueSwgVD4oKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHN0cmluZ01hcCkge1xuICAgICAgICAgICAgcmVzdWx0LnNldChrZXksIHN0cmluZ01hcFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNyZWF0ZUZyb21TdHJpbmdNYXBXaXRoUmVzb2x2ZTxUPihzdHJpbmdNYXA6IHsgW2tleTogc3RyaW5nXTogVCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZTogKGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBhbnkpID0+IGFueSk6IE1hcDxzdHJpbmcsIFQ+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBUPigpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3RyaW5nTWFwKSB7XG4gICAgICAgICAgICBsZXQgdXBkYXRlZFZhbHVlID0gcmVzb2x2ZShrZXksIHN0cmluZ01hcFtrZXldKTtcbiAgICAgICAgICAgIHJlc3VsdC5zZXQoa2V5LCB1cGRhdGVkVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvU3RyaW5nTWFwPFQ+KG06IE1hcDxzdHJpbmcsIFQ+KTogeyBba2V5OiBzdHJpbmddOiBUIH0ge1xuICAgICAgICBsZXQgcjogeyBba2V5OiBzdHJpbmddOiBUIH0gPSB7fTtcbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiByW2tdID0gdik7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b0FueU1hcDxUPihtOiBNYXA8YW55LCBUPik6IGFueSB7XG4gICAgICAgIGxldCByID0ge307XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChtKSkge1xuICAgICAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiAoPGFueT5yKVtrXSA9IHYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHRvU3RyaW5nKG06IE1hcDxzdHJpbmcsIGFueT4sIGlubmVyOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc2ogPSBuZXcgU3RyaW5nSm9pbmVyKFsnJ10pO1xuICAgICAgICBpZiAoIWlubmVyKSB7XG4gICAgICAgICAgICBzai5hZGQoJ3snKTtcbiAgICAgICAgfVxuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcblxuICAgICAgICAgICAgaWYgKHYgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICBzai5hZGQoTWFwV3JhcHBlci50b1N0cmluZyh2LCB0cnVlKSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2ouYWRkKGspO1xuICAgICAgICAgICAgICAgIHNqLmFkZCgnPScpO1xuICAgICAgICAgICAgICAgIHNqLmFkZCh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNqLmFkZCgnLCAnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpbm5lcikge1xuICAgICAgICAgICAgc2ouYWRkKCd9ICcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNsZWFyVmFsdWVzKG06IE1hcDxhbnksIGFueT4pIHtcbiAgICAgICAgX2NsZWFyVmFsdWVzKG0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBpdGVyYWJsZTxUPihtOiBUKTogVCB7XG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuXG4gICAgc3RhdGljIG1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoZGVzdDogTWFwPHN0cmluZywgYW55Piwgc291cmNlOiBNYXA8c3RyaW5nLCBhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZU1pc21hdGNoZWQ6IGJvb2xlYW4pOiBNYXA8c3RyaW5nLCBhbnk+IHtcblxuICAgICAgICBsZXQga2V5cyA9IEFycmF5LmZyb20oc291cmNlLmtleXMoKSk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2VWYWx1ZSA9IHNvdXJjZS5nZXQoa2V5KTtcbiAgICAgICAgICAgIGxldCBkZXN0VmFsdWUgPSBkZXN0LmdldChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoaXNCbGFuayhkZXN0VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBMaXN0V3JhcHBlci5jb3B5VmFsdWUoc291cmNlVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzdFZhbHVlIGluc3RhbmNlb2YgTWFwICYmIHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG5cbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksXG4gICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIubWVyZ2VNYXBJbnRvTWFwV2l0aE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY2xvbmU8c3RyaW5nLCBhbnk+KGRlc3RWYWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VWYWx1ZSwgb3ZlcndyaXRlTWlzbWF0Y2hlZClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkZXN0VmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgaXNBcnJheShzb3VyY2VWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgIGlmIChMaXN0V3JhcHBlci5hbGxFbGVtZW50c0FyZVN0cmluZ3Moc291cmNlVmFsdWUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBNYXBXcmFwcGVyLm1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNsb25lPHN0cmluZywgYW55PihkZXN0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jb252ZXJ0TGlzdFRvTWFwKHNvdXJjZVZhbHVlKSwgb3ZlcndyaXRlTWlzbWF0Y2hlZClcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzb3VyY2VWZWN0OiBzdHJpbmdbXSA9IExpc3RXcmFwcGVyLmNsb25lPGFueT4oc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQ8YW55Pihzb3VyY2VWZWN0LCBkZXN0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShkZXN0VmFsdWUpICYmIHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoTGlzdFdyYXBwZXIuYWxsRWxlbWVudHNBcmVTdHJpbmdzKGRlc3RWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBNYXBXcmFwcGVyLm1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNvbnZlcnRMaXN0VG9NYXAoZGVzdFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcndyaXRlTWlzbWF0Y2hlZClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiBjYW4gd2UgcmVhbGx5IG1hdGNoIHRoaXMgdmFsdWVzIHdpdGggaW5kZXhPZlxuICAgICAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQ8TWFwPHN0cmluZywgYW55Pj4oZGVzdFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jbG9uZTxzdHJpbmcsIGFueT4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkZXN0VmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgaXNTdHJpbmcoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRlc3RWYWx1ZU1hcCA9IE1hcFdyYXBwZXIuY2xvbmUoZGVzdFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKGRlc3RWYWx1ZU1hcC5nZXQoc291cmNlVmFsdWUpKSkge1xuICAgICAgICAgICAgICAgICAgICBkZXN0VmFsdWUuc2V0KHNvdXJjZVZhbHVlLCBNYXBXcmFwcGVyLmNyZWF0ZUVtcHR5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZGVzdFZhbHVlKSAmJiBzb3VyY2VWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VIYXNoID0gTWFwV3JhcHBlci5jbG9uZShzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoc291cmNlSGFzaC5nZXQoZGVzdFZhbHVlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSGFzaC5zZXQoZGVzdFZhbHVlLCBNYXBXcmFwcGVyLmNyZWF0ZUVtcHR5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZUhhc2gpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGVzdFZhbHVlKSAmJiBpc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGVzdFZhbHVlKSAmJiBpc1N0cmluZyhzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQoZGVzdFZhbHVlLCBzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZGVzdFZhbHVlKSAmJiBpc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VWZWN0OiBzdHJpbmdbXSA9IExpc3RXcmFwcGVyLmNsb25lPHN0cmluZz4oc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkRWxlbWVudElmQWJzZW50KHNvdXJjZVZlY3QsIGRlc3RWYWx1ZSk7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhkZXN0VmFsdWUpICYmIGlzU3RyaW5nKHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG92ZXJ3cml0ZU1pc21hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGRlc3RDbGFzcyA9IGNsYXNzTmFtZShkZXN0VmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VDbGFzcyA9IGNsYXNzTmFtZShzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVzdENsYXNzID09PSBzb3VyY2VDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnZlcnRMaXN0VG9NYXAoa2V5czogc3RyaW5nW10pOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWFwLnNldChrZXlzW2ldLCBNYXBXcmFwcGVyLmNyZWF0ZUVtcHR5PHN0cmluZywgYW55PigpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIHN0YXRpYyBncm91cEJ5PEs+KGl0ZW1zOiBhbnksIGdyb3VwQnlLZXk6IChpdGVtOiBLKSA9PiBzdHJpbmcpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGl0ZW1zLnJlZHVjZSgoZ3JvdXBSZXN1bHQ6IGFueSwgY3VycmVudFZhbHVlOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgbGV0IGdLZXkgPSBncm91cEJ5S2V5KGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAoZ3JvdXBSZXN1bHRbZ0tleV0gPSBncm91cFJlc3VsdFtnS2V5XSB8fCBbXSkucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwUmVzdWx0O1xuICAgICAgICB9LCB7fSk7XG5cblxuICAgICAgICBsZXQgZ3JvdXBlZDogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBncm91cGVkLnNldChrZXksIHJlc3VsdFtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBncm91cGVkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBXcmFwcyBKYXZhc2NyaXB0IE9iamVjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ01hcFdyYXBwZXIge1xuICAgIHN0YXRpYyBjcmVhdGUoKTogeyBbazogLyphbnkqLyBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIC8vIE5vdGU6IFdlIGFyZSBub3QgdXNpbmcgT2JqZWN0LmNyZWF0ZShudWxsKSBoZXJlIGR1ZSB0b1xuICAgICAgICAvLyBwZXJmb3JtYW5jZSFcbiAgICAgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vbmcyLW9iamVjdC1jcmVhdGUtbnVsbFxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5zKG1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwga2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQ8Vj4obWFwOiB7IFtrZXk6IHN0cmluZ106IFYgfSwga2V5OiBzdHJpbmcpOiBWIHtcbiAgICAgICAgcmV0dXJuIG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpID8gbWFwW2tleV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldDxWPihtYXA6IHsgW2tleTogc3RyaW5nXTogViB9LCBrZXk6IHN0cmluZywgdmFsdWU6IFYpIHtcbiAgICAgICAgbWFwW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBpc0VtcHR5KG1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBwcm9wIGluIG1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWxldGUobWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBrZXk6IHN0cmluZykge1xuICAgICAgICBkZWxldGUgbWFwW2tleV07XG4gICAgfVxuXG4gICAgc3RhdGljIGZvckVhY2g8SywgVj4obWFwOiB7IFtrZXk6IHN0cmluZ106IFYgfSwgY2FsbGJhY2s6ICh2OiBWLCBLOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyhtYXApKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhtYXBba10sIGspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIG1lcmdlPFY+KG0xOiB7IFtrZXk6IHN0cmluZ106IFYgfSwgbTI6IHsgW2tleTogc3RyaW5nXTogViB9KTogeyBba2V5OiBzdHJpbmddOiBWIH0ge1xuICAgICAgICBsZXQgbTogeyBba2V5OiBzdHJpbmddOiBWIH0gPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrIG9mIE9iamVjdC5rZXlzKG0xKSkge1xuICAgICAgICAgICAgbVtrXSA9IG0xW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyhtMikpIHtcbiAgICAgICAgICAgIG1ba10gPSBtMltrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbHM8Vj4obTE6IHsgW2tleTogc3RyaW5nXTogViB9LCBtMjogeyBba2V5OiBzdHJpbmddOiBWIH0pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGsxID0gT2JqZWN0LmtleXMobTEpO1xuICAgICAgICBsZXQgazIgPSBPYmplY3Qua2V5cyhtMik7XG4gICAgICAgIGlmIChrMS5sZW5ndGggIT09IGsyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBrZXk6IGFueSAvKiogVE9ETyAjPz8/PyAqLztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAga2V5ID0gazFbaV07XG4gICAgICAgICAgICBpZiAobTFba2V5XSAhPT0gbTJba2V5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBBIGJvb2xlYW4tdmFsdWVkIGZ1bmN0aW9uIG92ZXIgYSB2YWx1ZSwgcG9zc2libHkgaW5jbHVkaW5nIGNvbnRleHQgaW5mb3JtYXRpb25cbiAqIHJlZ2FyZGluZyB0aGF0IHZhbHVlJ3MgcG9zaXRpb24gaW4gYW4gYXJyYXkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJlZGljYXRlPFQ+IHtcbiAgICAodmFsdWU6IFQsIGluZGV4PzogbnVtYmVyLCBhcnJheT86IFRbXSk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBMaXN0V3JhcHBlciB7XG4gICAgLy8gSlMgaGFzIG5vIHdheSB0byBleHByZXNzIGEgc3RhdGljYWxseSBmaXhlZCBzaXplIGxpc3QsIGJ1dCBkYXJ0IGRvZXMgc28gd2VcbiAgICAvLyBrZWVwIGJvdGggbWV0aG9kcy5cbiAgICBzdGF0aWMgY3JlYXRlRml4ZWRTaXplKHNpemU6IG51bWJlcik6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheShzaXplKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlR3Jvd2FibGVTaXplKHNpemU6IG51bWJlcik6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheShzaXplKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xvbmU8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XG4gICAgICAgIHJldHVybiBhcnJheS5zbGljZSgwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZm9yRWFjaFdpdGhJbmRleDxUPihhcnJheTogVFtdLCBmbjogKHQ6IFQsIG46IG51bWJlcikgPT4gdm9pZCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmbihhcnJheVtpXSwgaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZmlyc3Q8VD4oYXJyYXk6IFRbXSk6IFQge1xuICAgICAgICBpZiAoIWFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBsYXN0PFQ+KGFycmF5OiBUW10pOiBUIHtcbiAgICAgICAgaWYgKCFhcnJheSB8fCBhcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5kZXhPZjxUPihhcnJheTogVFtdLCB2YWx1ZTogVCwgc3RhcnRJbmRleDogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlLCBzdGFydEluZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnM8VD4obGlzdDogVFtdLCBlbDogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKGVsKSAhPT0gLTE7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY29udGFpbnNBbGw8VD4obGlzdDogVFtdLCBlbHM6IFRbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZWxzLm1hcChmdW5jdGlvbiAobmVlZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKG5lZWRsZSk7XG4gICAgICAgIH0pLmluZGV4T2YoLTEpID09PSAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnNDb21wbGV4KGxpc3Q6IEFycmF5PGFueT4sIGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbGlzdC5maW5kSW5kZXgoZWwgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhlbCwgaXRlbSk7XG4gICAgICAgIH0pID4gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmRJbmRleENvbXBsZXgobGlzdDogQXJyYXk8YW55PiwgaXRlbTogYW55KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsaXN0LmZpbmRJbmRleChlbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKGVsLCBpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuXG4gICAgc3RhdGljIHJlbW92ZUlmRXhpc3QobGlzdDogQXJyYXk8YW55PiwgaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gbGlzdC5maW5kSW5kZXgoZWwgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhlbCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmVBdDxhbnk+KGxpc3QsIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZXZlcnNlZDxUPihhcnJheTogVFtdKTogVFtdIHtcbiAgICAgICAgbGV0IGEgPSBMaXN0V3JhcHBlci5jbG9uZShhcnJheSk7XG4gICAgICAgIHJldHVybiBhLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29uY2F0KGE6IGFueVtdLCBiOiBhbnlbXSk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnNlcnQ8VD4obGlzdDogVFtdLCBpbmRleDogbnVtYmVyLCB2YWx1ZTogVCkge1xuICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMCwgdmFsdWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVBdDxUPihsaXN0OiBUW10sIGluZGV4OiBudW1iZXIpOiBUIHtcbiAgICAgICAgbGV0IHJlcyA9IGxpc3RbaW5kZXhdO1xuICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUFsbDxUPihsaXN0OiBUW10sIGl0ZW1zOiBUW10pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gbGlzdC5pbmRleE9mKGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmU8VD4obGlzdDogVFtdLCBlbDogVCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaW5kZXggPSBsaXN0LmluZGV4T2YoZWwpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVMYXN0PFQ+KGFycmF5OiBUW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFhcnJheSB8fCBhcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5LnNwbGljZShhcnJheS5sZW5ndGggLSAxKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjbGVhcihsaXN0OiBhbnlbXSkge1xuICAgICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRW1wdHkobGlzdDogYW55W10pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGxpc3QubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBmaWxsKGxpc3Q6IGFueVtdLCB2YWx1ZTogYW55LCBzdGFydDogbnVtYmVyID0gMCwgZW5kOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGxpc3QuZmlsbCh2YWx1ZSwgc3RhcnQsIGVuZCA9PT0gbnVsbCA/IGxpc3QubGVuZ3RoIDogZW5kKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKGE6IGFueVtdLCBiOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2xpY2U8VD4obDogVFtdLCBmcm9tOiBudW1iZXIgPSAwLCB0bzogbnVtYmVyID0gbnVsbCk6IFRbXSB7XG4gICAgICAgIHJldHVybiBsLnNsaWNlKGZyb20sIHRvID09PSBudWxsID8gdW5kZWZpbmVkIDogdG8pO1xuICAgIH1cblxuICAgIHN0YXRpYyBzcGxpY2U8VD4obDogVFtdLCBmcm9tOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIGwuc3BsaWNlKGZyb20sIGxlbmd0aCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNvcnQ8VD4obDogVFtdLCBjb21wYXJlRm4/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29tcGFyZUZuKSkge1xuICAgICAgICAgICAgbC5zb3J0KGNvbXBhcmVGbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsLnNvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIHNvcnRCeUV4YW1wbGUodG9Tb3J0OiBzdHJpbmdbXSwgcGF0dGVybjogc3RyaW5nW10pIHtcbiAgICAgICAgdG9Tb3J0LnNvcnQoKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXhBID0gcGF0dGVybi5pbmRleE9mKGEpID09PSAtMSA/IDEwIDogcGF0dGVybi5pbmRleE9mKGEpO1xuICAgICAgICAgICAgbGV0IGluZGV4QiA9IHBhdHRlcm4uaW5kZXhPZihiKSA9PT0gLTEgPyAxMCA6IHBhdHRlcm4uaW5kZXhPZihiKTtcblxuICAgICAgICAgICAgcmV0dXJuIGluZGV4QSAtIGluZGV4QjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvU3RyaW5nPFQ+KGw6IFRbXSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBvdXQgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsKSB7XG4gICAgICAgICAgICBvdXQgKz0gaXRlbS50b1N0cmluZygpICsgJywgICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9KU09OPFQ+KGw6IFRbXSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShsKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbWF4aW11bTxUPihsaXN0OiBUW10sIHByZWRpY2F0ZTogKHQ6IFQpID0+IG51bWJlcik6IFQge1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzb2x1dGlvbjogYW55IC8qKiBUT0RPICM/Pz8/ICovID0gbnVsbDtcbiAgICAgICAgbGV0IG1heFZhbHVlID0gLUluZmluaXR5O1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGUgPSBsaXN0W2luZGV4XTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGVWYWx1ZSA9IHByZWRpY2F0ZShjYW5kaWRhdGUpO1xuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZVZhbHVlID4gbWF4VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzb2x1dGlvbiA9IGNhbmRpZGF0ZTtcbiAgICAgICAgICAgICAgICBtYXhWYWx1ZSA9IGNhbmRpZGF0ZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb2x1dGlvbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmxhdHRlbjxUPihsaXN0OiBBcnJheTxUIHwgVFtdPik6IFRbXSB7XG4gICAgICAgIGxldCB0YXJnZXQ6IGFueVtdID0gW107XG4gICAgICAgIF9mbGF0dGVuQXJyYXkobGlzdCwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBhbGxFbGVtZW50c0FyZVN0cmluZ3M8VD4obGlzdDogQXJyYXk8VCB8IFRbXT4pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHRhcmdldDogYW55W10gPSBMaXN0V3JhcHBlci5mbGF0dGVuKGxpc3QpO1xuICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRhcmdldCkge1xuICAgICAgICAgICAgaWYgKCFpc1N0cmluZyhlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRBbGw8VD4obGlzdDogQXJyYXk8VD4sIHNvdXJjZTogQXJyYXk8VD4pOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChzb3VyY2VbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdG9kbzogY2hlY2sgaWYgdGhpcyBoYW5kbGVzIG9iamVjdHMgd2l0aCBjb250YWluc1xuICAgIHN0YXRpYyBhZGRFbGVtZW50SWZBYnNlbnQ8VD4obGlzdDogQXJyYXk8VD4sIGVsZW1lbnQ6IFQpOiB2b2lkIHtcblxuICAgICAgICBsZXQgY29udGFpbnMgPSBDb2xsZWN0aW9ucy5hcnJheXMuY29udGFpbnMobGlzdCwgZWxlbWVudCwgKGl0ZW0xOiBhbnksIGl0ZW0yOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgaWYgKGl0ZW0xWydlcXVhbHNUbyddKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xWydlcXVhbHNUbyddKGl0ZW0yKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0xID09PSBpdGVtMjtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghY29udGFpbnMpIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIGFkZEVsZW1lbnRzSWZBYnNlbnQ8VD4obGlzdDogQXJyYXk8VD4sIGVsZW1lbnRzOiBUW10pOiB2b2lkIHtcblxuXG4gICAgICAgIGlmIChpc0JsYW5rKGVsZW1lbnRzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBlbGVtZW50cykge1xuXG4gICAgICAgICAgICBsZXQgY29udGFpbnMgPSBDb2xsZWN0aW9ucy5hcnJheXMuY29udGFpbnMobGlzdCwgZWxlbSwgKGl0ZW0xOiBhbnksIGl0ZW0yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbTFbJ2VxdWFsc1RvJ10gJiYgaXRlbTJbJ2VxdWFsc1RvJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xWydlcXVhbHNUbyddKGl0ZW0yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xID09PSBpdGVtMjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjb250YWlucykge1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaChlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIGNvcHlWYWx1ZTxUPih2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWFwV3JhcHBlci5jbG9uZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5jbG9uZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbn1cblxuZnVuY3Rpb24gX2ZsYXR0ZW5BcnJheShzb3VyY2U6IGFueVtdLCB0YXJnZXQ6IGFueVtdKTogYW55W10ge1xuICAgIGlmIChpc1ByZXNlbnQoc291cmNlKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzb3VyY2VbaV07XG4gICAgICAgICAgICBpZiAoaXNBcnJheShpdGVtKSkge1xuICAgICAgICAgICAgICAgIF9mbGF0dGVuQXJyYXkoaXRlbSwgdGFyZ2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc0pzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNBcnJheShvYmopIHx8XG4gICAgICAgICghKG9iaiBpbnN0YW5jZW9mIE1hcCkgJiYgICAgICAvLyBKUyBNYXAgYXJlIGl0ZXJhYmxlcyBidXQgcmV0dXJuIGVudHJpZXMgYXMgW2ssIHZdXG4gICAgICAgICAgICBnZXRTeW1ib2xJdGVyYXRvcigpIGluIG9iaik7ICAvLyBKUyBJdGVyYWJsZSBoYXZlIGEgU3ltYm9sLml0ZXJhdG9yIHByb3Bcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUl0ZXJhYmxlc0VxdWFsKGE6IGFueSwgYjogYW55LCBjb21wYXJhdG9yOiBGdW5jdGlvbik6IGJvb2xlYW4ge1xuICAgIGxldCBpdGVyYXRvcjEgPSBhW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gICAgbGV0IGl0ZXJhdG9yMiA9IGJbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBpdGVtMSA9IGl0ZXJhdG9yMS5uZXh0KCk7XG4gICAgICAgIGxldCBpdGVtMiA9IGl0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICAgIGlmIChpdGVtMS5kb25lICYmIGl0ZW0yLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtMS5kb25lIHx8IGl0ZW0yLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbXBhcmF0b3IoaXRlbTEudmFsdWUsIGl0ZW0yLnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXRlcmF0ZUxpc3RMaWtlKG9iajogYW55LCBmbjogRnVuY3Rpb24pIHtcbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmbihvYmpbaV0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gb2JqW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gICAgICAgIGxldCBpdGVtOiBhbnkgLyoqIFRPRE8gIz8/Pz8gKi87XG4gICAgICAgIHdoaWxlICghKChpdGVtID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSkge1xuICAgICAgICAgICAgZm4oaXRlbS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRMYXN0PFQ+KGFycjogVFtdLCBjb25kaXRpb246ICh2YWx1ZTogVCkgPT4gYm9vbGVhbik6IFQgfCBudWxsIHtcbiAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChjb25kaXRpb24oYXJyW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycltpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gU2FmYXJpIGFuZCBJbnRlcm5ldCBFeHBsb3JlciBkbyBub3Qgc3VwcG9ydCB0aGUgaXRlcmFibGUgcGFyYW1ldGVyIHRvIHRoZVxuLy8gU2V0IGNvbnN0cnVjdG9yLiAgV2Ugd29yayBhcm91bmQgdGhhdCBieSBtYW51YWxseSBhZGRpbmcgdGhlIGl0ZW1zLlxubGV0IGNyZWF0ZVNldEZyb21MaXN0OiB7IChsc3Q6IGFueVtdKTogU2V0PGFueT4gfSA9IChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRlc3QgPSBuZXcgU2V0KFsxLCAyLCAzXSk7XG4gICAgaWYgKHRlc3Quc2l6ZSA9PT0gMykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlU2V0RnJvbUxpc3RJbm5lcihsc3Q6IGFueVtdKTogU2V0PGFueT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQobHN0KTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlU2V0QW5kUG9wdWxhdGVGcm9tTGlzdChsc3Q6IGFueVtdKTogU2V0PGFueT4ge1xuICAgICAgICAgICAgbGV0IHJlcyA9IG5ldyBTZXQobHN0KTtcbiAgICAgICAgICAgIGlmIChyZXMuc2l6ZSAhPT0gbHN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5hZGQobHN0W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9O1xuICAgIH1cbn0pKCk7XG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIGlzRGV2TW9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jvb2xlYW5XcmFwcGVyLCBpc1ByZXNlbnQsIE51bWJlcldyYXBwZXIsIHJlYWRHbG9iYWxQYXJhbX0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge01hcFdyYXBwZXJ9IGZyb20gJy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5cblxuLyoqXG4gKiBTaW5jZSBvbiBlbnRlcnByaXNlIGxldmVsIHdlIG5lZWQgdG8gc3VwcG9ydCBhbGwgYXZhaWxhYmxlIGxvY2FsZXMgYXMgdXNlciBtaWdodCBjaGFuZ2VcbiAqIHRvIGRpZmZlcmVudCBsYW5nIGFueXRpbWUgd2UgbmVlZCB0byBpbXBvcnQgYWxsIGV4cGVjdGVkIGxvY2FsZXMgdGhhdCB3ZSB3YW50IHRvIHN1cHBvcnQuXG4gKlxuICogTm90ZTogIFJlbWVtYmVyIHdoZW4geW91IHdhbnQgdG8gc3VwcG9ydCBtb3JlIGxvY2FsZXMgeW91IG5lZWQgdG8gaW1wb3J0IHRoZW0gYW5kIHJlZ2lzdGVyXG4gKiB0aGVtIHVzaW5nIHJlZ2lzdGVyTG9jYWxlRGF0YVxuICovXG5leHBvcnQgY29uc3QgQXBwQ29uZmlnVG9rZW4gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignQXBwLkNvbmZpZycpO1xuXG5jb25zdCBTdXBvcnRlZExhbmd1YWdlcyA9IFsnZW4nLCAnZnInXTtcblxuXG4vKipcbiAqIFNpbXBsZSBDb25maWd1cmF0aW9uIGltcGxlbWVudGF0aW9uICB3aGljaCBsZXQgdXMgY29uZmlndXJlIGFwcGxpY2F0aW9uIGR1cmluZyBhIGJvb3RzdHJhcFxuICogcGhhc2UuIFlvdSBjYW4gcGFzcyB2YWx1ZXMgaW4gMyBkaWZmZXJlbnQgd2F5c1xuICpcbiAqIDEpIFVzaW5nIGltcG9ydCAtIGF0IHRoZSB0aW1lIHlvdSBpbXBvcnQgeW91ciBtb2R1bGVcbiAqIDIpIGluamVjdGVkIGFzIHNlcnZpY2UgYW5kIHlvdSBjYW4gc2V0IHZhbHVlc1xuICogMykgRnJvbSBTY3JpcHQgdGFnIG9yIGdsb2JhbGx5IGRlZmluZWQgVkFSIGR1cmluZyBhIGRlcGxveW1lbnRcbiAqXG4gKlxuICogVGhlcmUgaXMgYWxzbyBmcm9tIFVSTCBvcHRpb24gdGhhdCBpcyBmb3Igbm93IHRlbXBvcmFyeSBkaXNhYmxlZC5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBDb25maWcge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgbm90IHJlZ3VsYXIgZW52LiBwYXJhbSB3ZSB1c2UgdGhpcyB0byBxdWVyeSBnbG9iYWwgdmFyIHRoYXQgY2FuIGJlIGF0dGFjaGVkIHRvXG4gICAgICogd2luZG93IHRvIHJlYWQgZW52LiBzZXR0aW5ncyB0aGF0IGNhbiBiZSBpbmplY3RlZCBieSBzZXJ2ZXJcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBBcHBDb25maWdHbG9iYWxWYXIgPSAnQXBwQ29uZmlnR2xvYmFsJztcblxuICAgIHN0YXRpYyByZWFkb25seSBJc0Rldk1vZGUgPSAnZGV2bW9kZS5lbmFibGVkJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgVXNlckFnZW50ID0gJ3VzZXJhZ2VudCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IExhbmcgPSAnbGFuZyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFN1cHBvcnRlZExhbmdzID0gJ3N1cHBvcnRlZGxhbmcnO1xuICAgIHN0YXRpYyByZWFkb25seSBEaXJlY3Rpb24gPSAnZGlyJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTmF2UGxhdGZvcm0gPSAncGxhdGZvcm0nO1xuICAgIHN0YXRpYyByZWFkb25seSBpMThuRW5hYmxlZCA9ICdpMThuLmVuYWJsZWQnO1xuICAgIHN0YXRpYyByZWFkb25seSBBcHBUaXRsZSA9ICdhcHAudGl0bGUnO1xuICAgIHN0YXRpYyByZWFkb25seSBSZXN0QXBpQ29udGV4dFVybCA9ICdyZXN0YXBpLmNvbnRleHQnO1xuICAgIHN0YXRpYyByZWFkb25seSBSZXN0QXBpSG9zdFVybCA9ICdyZXN0YXBpLmhvc3QnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb250ZW50VHlwZSA9ICdjb250ZW50LXR5cGUnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uUmV0cnlJbnRlcnZhbCA9ICdjb25uZWN0aW9uLnJldHJ5JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvbkFib3J0VGltZW91dCA9ICdjb25uZWN0aW9uLmFib3J0LXRpbWVvdXQnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uVXNlTW9ja1NlcnZlciA9ICdjb25uZWN0aW9uLm1vY2stc2VydmVyLmVuYWJsZWQnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uTW9ja1NlcnZlclBhdGggPSAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5wYXRoJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvbk1vY2tTZXJ2ZXJSb3V0ZXMgPSAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5yb3V0ZXMnO1xuICAgIHN0YXRpYyByZWFkb25seSBEb21haW5VbmlxdWVOYW1lID0gJ2RvbWFpbi51bmlxdWVuYW1lJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgRG9tYWluUXVlcnkgPSAnZG9tYWluLnVuaXF1ZW5hbWUnO1xuICAgIHN0YXRpYyByZWFkb25seSBBc3NldEZvbGRlciA9ICdhc3NldC1mb2xkZXInO1xuICAgIHN0YXRpYyByZWFkb25seSBJblRlc3QgPSAnZW52LnRlc3QnO1xuXG4gICAgLyoqXG4gICAgICogU2luY2Ugd2UgdW5hYmxlIHRvIGNoYW5nZSBhbmQgc2ltdWxhdGUgVVJMIGR1cmluZyBuZyB0ZXN0IGJ1dCBzdGlsbCB3ZSBuZWVkIHRvIGJlIGFibGUgdG9cbiAgICAgKiB0ZXN0IHRoaXMgVVJMIHBhcnNpbmcgbG9naWMgdGhlbiBqdXN0IGZvciBhIFRlc3QgcHVycG9zZXMgdGhpcyBgZW52LnRlc3QudXJsYCBwcm9wZXJ0eVxuICAgICAqIHdpbGwgYmUgdXNlZCB0byBwYXNzIHVybCBkdXJpbmcgYSB0ZXN0LlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBJblRlc3RVcmwgPSAnZW52LnRlc3QudXJsJztcblxuICAgIHByaXZhdGUgdmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+O1xuICAgIC8vIHByaXZhdGUgcXVlcnlWYWx1ZXM6IE1hcDxzdHJpbmcsICBhbnk+O1xuXG5cbiAgICB0ZXN0VXJsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5qZWN0b3I6IEluamVjdG9yLCBwdWJsaWMgZW52aXJvbm1lbnQ6IEVudmlyb25tZW50KSB7XG4gICAgICAgIC8vIHdlIGV4cGVjdCB0aGVyZSB3aWxsIGJlIGFsd2F5cyB3aW5kb3cgYXZhaWxhYmxlLlxuICAgICAgICB0aGlzLnZhbHVlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIC8vIHRoaXMucXVlcnlWYWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgIGFueT4oKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2FsbGVkIGJ5IGZhY3RvcnkgbWV0aG9kIHRvIGluaXRpYWxpemUgdGhpcyBjb25maWcgY2xhc3NcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoY29uZmlnOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgICAgIHRoaXMuaW5pdERlZmF1bHRzKCk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29uZmlnKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlczogTWFwPHN0cmluZywgYW55PiA9IE1hcFdyYXBwZXIuY3JlYXRlRnJvbVN0cmluZ01hcDxhbnk+KGNvbmZpZyk7XG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+IHRoaXMuc2V0KGssIHYpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnQuc2V0VmFsdWUoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyLCB0aGlzLmdldChBcHBDb25maWcuQXNzZXRGb2xkZXIpKTtcblxuICAgICAgICBsZXQgbG9jYXRpb246IGFueSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgIGlmICh0aGlzLmVudmlyb25tZW50LmluVGVzdCkge1xuICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLmdldChBcHBDb25maWcuSW5UZXN0VXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIChpc1ByZXNlbnQobG9jYXRpb24pKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnBhcnNlUXVlcnlQYXJtcyhsb2NhdGlvbik7XG4gICAgICAgIC8vIH1cblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgcmVhZCBnbG9iYWxseSBpbnNlcnRlZCBzY3JpcHRzIHRvIGluaXRpYWxpemUgYXBwbGljYXRpb24gZnJvbSB0aGUgc2VydmVyIHNpZGUuXG4gICAgICogVGhlIHNjcmlwdCBjYW4gZGlyZWN0bHkgZGVjbGFyZSB0aGUgdmFyaWFibGVzIDpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogICA8c2NyaXB0PlxuICAgICAqICAgICAgdmFyIEFwcENvbmZpZ0dsb2JhbCA9IHtcbiAgICAgKiAgICAgICAgICAgICAgICdhcHAucHJvMSc6ICd2YWx1ZTEnLFxuICAgICAqICAgICAgICAgICAgICAgJ2FwcC5wcm8yJzogJ3ZhbHVlMicsXG4gICAgICogICAgICAgICAgICAgICAnbGFuZyc6ICdjaCdcbiAgICAgKiAgICAgIH07XG4gICAgICogIDwvc2NyaXB0PlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogICBvciBpdCBjYW4gYmUgaW5jbHVkZWQgb24gdGhlIGluZGV4Lmh0bWwgcGFnZSBkdXJpbmcgYnVpbGQgdGltZS5cbiAgICAgKlxuICAgICAqICAgV2UgZXhwZWN0IHRoYXQgd2lsbCBmaW5kIHRoZSBgQXBwQ29uZmlnR2xvYmFsYFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwYXJzZUdsb2JhbFBhcmFtcygpOiB2b2lkIHtcbiAgICAgICAgbGV0IGdsb2JhbENvbmZpZzogeyBbbmFtZTogc3RyaW5nXTogYW55IH0gPSByZWFkR2xvYmFsUGFyYW0oQXBwQ29uZmlnLkFwcENvbmZpZ0dsb2JhbFZhcik7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZ2xvYmFsQ29uZmlnKSkge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGdsb2JhbENvbmZpZykge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzLnNldChrZXkudG9Mb3dlckNhc2UoKSwgZ2xvYmFsQ29uZmlnW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlcyB0byBjb25maWd1cmF0aW9uLiB0byBtYWtlIHN1cmUgd2Ugd2lsbCBub3QgcnVuIGludG8gY2FzZS1zZW5zaXRpdmUgcHJvYmxlbXMgd2VcbiAgICAgKiBhcmUgY29udmVydGluZyBhbGwga2V5cyBpbnRvIGxvd2VyY2FzZVxuICAgICAqXG4gICAgICovXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVzLnNldChrZXkudG9Mb3dlckNhc2UoKSwgdmFsdWUpO1xuXG4gICAgICAgIGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gQXBwQ29uZmlnLkluVGVzdCkge1xuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudC5pblRlc3QgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZXMgdG8gY29uZmlndXJhdGlvblxuICAgICAqIHRvZG86IGRvbnQgZG8gYWxsIHRoaXMgd2l0aCB0aGlzIGhhY2t5IHdheS4ganVzdCBpZiB5b3UgbmVlZCB0byBjaGVjayBjYXNlIHNlbnNpdGl2aXR5LCB0aGVuXG4gICAgICogc2ltcGx5IG1hcCBrZXlzIGZyb20gdGhpcy52YWx1ZXMgaW50byBsb3dlcmNhc2UgYW5kIHRoZW4gY2hlY2sgaWYgaXQgaGFzIGEga2V5XG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVzLmhhcyhrZXkudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlcy5nZXQoa2V5LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgZ2V0TnVtYmVyKGtleTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBOdW1iZXJXcmFwcGVyLnBhcnNlSW50QXV0b1JhZGl4KHZhbCk7XG4gICAgfVxuXG5cbiAgICBnZXRCb29sZWFuKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmdldChrZXkpO1xuICAgICAgICByZXR1cm4gQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUodmFsKTtcbiAgICB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKlxuICAgIC8vICAqIENhbGxlZCBkdXJpbmcgaW5zdGFudGlhdGlvbiBhbmQgaXQgcmVhZCBxdWVyeSBwYXJhbXMgaWYgYW55IGFuZCB1c2UgdGhlbSBhc1xuICAgIC8vIGNvbmZpZ3VyYXRpb24uXG4gICAgLy8gICogV2UgbWlnaHQgd2FudCB0byBmb3JjZSB0byBwcmVmaXggZWFjaCBwYXJhbSB3aXRoIGVudi4gdG8gbWFrZSBzdXJlIHdlIGRvIG5vdCBzdG9yZVxuICAgIC8vIGV2ZXJ5dGhpbmcgKiAqLyBwcml2YXRlIHBhcnNlUXVlcnlQYXJtcyh1cmw6IHN0cmluZykgeyAgbGV0IHVybFNlcmlhbGl6ZXIgPSBuZXdcbiAgICAvLyBEZWZhdWx0VXJsU2VyaWFsaXplcigpOyBsZXQgdXJsVHJlZSA9IHVybFNlcmlhbGl6ZXIucGFyc2UodXJsKTsgIGlmXG4gICAgLy8gKGlzUHJlc2VudCh1cmxUcmVlLnF1ZXJ5UGFyYW1zKSkgeyAgZm9yIChsZXQga2V5IGluIHVybFRyZWUucXVlcnlQYXJhbXMpIHtcbiAgICAvLyB0aGlzLnF1ZXJ5VmFsdWVzLnNldChrZXkudG9Mb3dlckNhc2UoKSwgdXJsVHJlZS5xdWVyeVBhcmFtc1trZXldKTsgfSB9IH1cblxuICAgIHByaXZhdGUgaW5pdERlZmF1bHRzKCkge1xuXG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Jc0Rldk1vZGUsIGlzRGV2TW9kZSgpKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLlVzZXJBZ2VudCwgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuRGlyZWN0aW9uLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLk5hdlBsYXRmb3JtLCB3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbnRlbnRUeXBlLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvblJldHJ5SW50ZXJ2YWwsIDUwMCk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlciwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvbk1vY2tTZXJ2ZXJQYXRoLCAnL21vY2stcm91dGluZycpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuaTE4bkVuYWJsZWQsIHRydWUpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuSW5UZXN0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Eb21haW5VbmlxdWVOYW1lLCAndW5pcXVlTmFtZScpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuRG9tYWluUXVlcnksICdxJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQuaW5UZXN0KSB7XG4gICAgICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvbkFib3J0VGltZW91dCwgNTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uQWJvcnRUaW1lb3V0LCA4MDAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQXNzZXRGb2xkZXIsICdhc3NldHMnKTtcblxuICAgICAgICBpZiAoIXRoaXMudmFsdWVzLmhhcyhBcHBDb25maWcuTGFuZykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5MYW5nLCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy52YWx1ZXMuaGFzKEFwcENvbmZpZy5TdXBwb3J0ZWRMYW5ncykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5TdXBwb3J0ZWRMYW5ncywgU3Vwb3J0ZWRMYW5ndWFnZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRSZXN0QXBpQ29udGV4dFVybChlbnRpdHk6IHN0cmluZywgaXNOZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBuZXN0ZWRGbGFnID0gaXNOZXN0ZWQgPyAnJCcgOiAnJztcbiAgICAgICAgbGV0IHdpdGhFbnRpdHkgPSBgJHtBcHBDb25maWcuUmVzdEFwaUNvbnRleHRVcmx9LiR7bmVzdGVkRmxhZ30ke2VudGl0eX1gO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXQod2l0aEVudGl0eSkgfHwgdGhpcy5nZXQoQXBwQ29uZmlnLlJlc3RBcGlDb250ZXh0VXJsKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHVybCkpIHtcbiAgICAgICAgICAgIGlmICgvXFwvJC9nLnRlc3QodXJsKSkge1xuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzdCBBUElVcmkgaXMgbm90IGNvbmZpZ3VyZWQnKTtcbiAgICB9XG5cblxuICAgIGdldFJlc3RBcGlDb250ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChBcHBDb25maWcuUmVzdEFwaUNvbnRleHRVcmwpIHx8ICcnO1xuICAgIH1cblxuICAgIGdldFJlc3RBcGlIb3N0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChBcHBDb25maWcuUmVzdEFwaUhvc3RVcmwpIHx8ICcnO1xuICAgIH1cblxuICAgIGlzUHJvZHVjdGlvbk1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5nZXRCb29sZWFuKEFwcENvbmZpZy5Jc0Rldk1vZGUpO1xuICAgIH1cblxuICAgIGdldEJhc2VVcmwoKSB7XG4gICAgICAgIGNvbnN0IGlzTW9ja2VkID0gdGhpcy5nZXRCb29sZWFuKEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlcik7XG4gICAgICAgIGNvbnN0IGNueCA9IHRoaXMuZ2V0UmVzdEFwaUNvbnRleHQoKTtcbiAgICAgICAgY29uc3QgaG9zdCA9IHRoaXMuZ2V0UmVzdEFwaUhvc3QoKSB8fCAnJztcblxuICAgICAgICBpZiAoaXNNb2NrZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0KEFwcENvbmZpZy5Bc3NldEZvbGRlcik7XG4gICAgICAgICAgICByZXR1cm4gYCR7cHJlZml4fSR7Y254IHx8ICcvJ31gO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHVybCA9IGAke2hvc3R9JHtjbnggfHwgJy8nfWA7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IGZhY3RvcnkgbWV0aG9kIGluc2lkZXIgQVBQX0lOSVRJQUxJWkVSIHRvIHByZS1sb2FkIGkxOG4gc3VwcG9ydFxuICAgICAqXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZUkxOG4oKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PiA9IG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB1c2VkIGJ5IENvcmVNb2R1bGUgaW4gb3JkZXIgdG8gaW5zdGFudGlhdGUgQXBwQ29uZmlnIHByb3ZpZGVyXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNvbmZpZyhjb25maWc6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudjogRW52aXJvbm1lbnQpOiBBcHBDb25maWcge1xuICAgIC8vIHdoZW4gZW1wdHkgd2UgYXN1bWUgd2UgYXJlIGluIFRlc3QuIEFwcGxpY2F0aW9uIHNob3VsZCBhbHdheXMgaGF2ZSBzb21lIGJhc2ljIGluaXRpYWxpemF0aW9uXG4gICAgLy8gdG9kbzogTmVlZCB0byBnZXQgYmFjayB0byB0aGlzIGFzIHRoaXMgaXMgdGVtcG9yYXJ5LlxuXG4gICAgbGV0IGNvbmY6IEFwcENvbmZpZyA9IG5ldyBBcHBDb25maWcoaW5qZWN0b3IsIGVudik7XG4gICAgY29uZi5pbml0KGNvbmZpZyk7XG4gICAgcmV0dXJuIGNvbmY7XG59XG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHthc3NlcnR9IGZyb20gJy4uL3V0aWxzL2xhbmcnO1xuXG5cbi8qKlxuICogRW52aXJvbm1lbnQgaXMgc2hhcmFibGUgc3RhdGUgYmV0d2VlbiBjb21wb25lbnRzIGFuZCBpdHMgaW5qZWN0ZWQgYXQgdGhlIHJvb3QgbGV2ZWwgYW5kXG4gKiB0aGUgc2FtZSBpbnN0YW5jZSBhY2Nlc3NpYmxlIGRvd24gdGhlIGNvbXBvbmVudCB0cmVlLlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50XG57XG5cbiAgICAvKipcbiAgICAgKiBLZWVwIEN1cnJlbnQgTG9jYWxlLiBJbml0aWFsaXplZCBmcm9tIEFwcENvbmZpZyBhbG9uZyB3aXRoIGkxOG4gc3VwcG9ydFxuICAgICAqL1xuICAgIHByaXZhdGUgX2xvY2FsZTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IGNvbXBvbmVudCB0byBzYXZlIHNhdmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGZvciBwcm9jZXNzaW5nIGFuZCBpdHMgcmVuZGVyaW5nXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbnZWYXJpYWJsZXM6IE1hcDxzdHJpbmcsIGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFNpbXBsZSBzdGFjay1saWtlIHN0b3JhZ2Ugd2hlcmUgd2UgbmVlZCB0byBhIGtlZXAgaGlzdG9yeVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhY2tzVmFyaWFibGVzOiBNYXA8c3RyaW5nLCBhbnlbXT47XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgcHJvcGVydGllcyBmb3IgZGVidWdnaW5nIGFuZCB0ZXN0aW5nIHB1cnBvc2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1BzZXVkb0xvY2FsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGluVGVzdDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBjdXJyZW50IFBhZ2UgRm9ybUdyb3VwIFN0YXRlIHRoYXQgbmVlZCB0byBiZSBzaGFyZWQgZG93biBhY3Jvc3MgY29tcG9uZW50c1xuICAgICAqL1xuICAgIGN1cnJlbnRGb3JtOiBGb3JtR3JvdXA7XG5cbiAgICAvKipcbiAgICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGxvY2FsZSBjaGFuZ2UgZXZlbnRzXG4gICAgICovXG4gICAgb25Mb2NhbGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBpc1Byb2R1Y3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmVnaXN0ZXIgYW5kIHNhdmUgcmVmZXJlbmNlIHRvIHVzZXIgZGVmaW5lZCBydWxlcyBpZiBhbnkuIFlvdSBtaWdodCBkZWZpbmUgaXRzIG93biBtZXRhZGF0YVxuICAgICAqIHdoZW4gcmVuZGVyaW5nIFVJLlxuICAgICAqL1xuICAgIHVzZXJSdWxlczogYW55O1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBqc3V0IGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMgdG8gc2F2ZSBzb21lIHRlbXAgbWVzc2FnZSB0aGF0IEkgY2FuIHRoZW4gdHJhY2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBkZWJ1Z1N0cmluZzogc3RyaW5nO1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLl9sb2NhbGUgPSAnZW4nO1xuICAgICAgICB0aGlzLmVudlZhcmlhYmxlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIHRoaXMuc3RhY2tzVmFyaWFibGVzID0gbmV3IE1hcDxzdHJpbmcsIGFueVtdPigpO1xuICAgIH1cblxuXG4gICAgZ2V0VmFsdWUoa2V5OiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmVudlZhcmlhYmxlcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW52VmFyaWFibGVzLmdldChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5lbnZWYXJpYWJsZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGRlbGV0ZVZhbHVlKGtleTogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5lbnZWYXJpYWJsZXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNWYWx1ZShrZXk6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudlZhcmlhYmxlcy5oYXMoa2V5KTtcbiAgICB9XG5cbiAgICBhbGxWYXJpYWJsZXMoKTogTWFwPHN0cmluZywgYW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52VmFyaWFibGVzO1xuICAgIH1cblxuXG4gICAgZ2V0IGxvY2FsZSgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XG4gICAgfVxuXG4gICAgc2V0IGxvY2FsZSh2YWx1ZTogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlID0gdmFsdWU7XG5cbiAgICAgICAgLy8gRW1pdCBsb2NhbGUgY2hhbmdlZCBldmVudFxuICAgICAgICB0aGlzLm9uTG9jYWxlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIHBlYWs8VD4oa2V5OiBzdHJpbmcpOiBUXG4gICAge1xuICAgICAgICBsZXQgc3RhY2s6IFRbXSA9IHRoaXMuc3RhY2tzVmFyaWFibGVzLmdldChrZXkpIHx8IFtdO1xuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIubGFzdDxUPihzdGFjayk7XG5cbiAgICB9XG5cblxuICAgIHBvcDxUPihrZXk6IHN0cmluZyk6IFRcbiAgICB7XG4gICAgICAgIGxldCBzdGFjazogVFtdID0gdGhpcy5zdGFja3NWYXJpYWJsZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgIGFzc2VydChzdGFjay5sZW5ndGggPiAwLCAnIEF0dGVtcHQgdG8gZ2V0IHZhbHVlIGZyb20gZW1wdHkgc3RhY2snKTtcblxuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIucmVtb3ZlQXQ8YW55PihzdGFjaywgc3RhY2subGVuZ3RoIC0gMSk7XG4gICAgfVxuXG5cbiAgICBwdXNoPFQ+KGtleTogc3RyaW5nLCB2YWx1ZTogVCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBzdGFjazogVFtdID0gdGhpcy5zdGFja3NWYXJpYWJsZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgIHN0YWNrLnB1c2godmFsdWUpO1xuICAgICAgICB0aGlzLnN0YWNrc1ZhcmlhYmxlcy5zZXQoa2V5LCBzdGFjayk7XG4gICAgfVxuXG59XG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuXG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5cbi8qKlxuICogVG8gdW5pZnkgdGhlIHdvcmsgd2l0aCBkb21haW4gb2JqZWN0cyB3ZSBoYXZlIHRoZXNlIHNldCBvZiBpbnRlcmZhY2VzIHRoYXQgZWFjaCBFbnRpdHkgb3IgVmFsdWVcbiAqIG11c3QgdXNlIHRvIGxldmVyYWdlIHNvbWUgb2YgdGhlIGZ1bmN0aW9uYWxpdHkgd2UgaGF2ZSBpbiB0aGUgY29yZVxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb3NpdGVUeXBlXG57XG5cbiAgICBjbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgJHByb3RvPygpOiBDb21wb3NpdGVUeXBlO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSWRlbnRpdHlcbntcblxuICAgIGlkZW50aXR5KCk6IHN0cmluZztcblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2VyaWFsaXphYmxlXG57XG4gICAgZ2V0VHlwZXMoKTogYW55O1xufVxuXG5cbi8qKlxuICogRW50aXR5Q29tcG9zaXRlIGhhdmluZyBpZGVudGl0eSB0aGF0IGNhbiBiZSBpZGVudGlmaWVkIGluIHRoZSBzdG9yYWdlIGJ5IGl0cyBJRC4gRW50aXRpZXMgYXJlXG4gKiBtdXRhYmxlIG9iamVjdHNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbnRpdHkgZXh0ZW5kcyBJZGVudGl0eSxcbiAgICBEZXNlcmlhbGl6YWJsZSxcbiAgICBDb21wb3NpdGVUeXBlXG57XG59XG5cbi8qKlxuICogPGxpPk5vIElkZW50aXR5PC9saT5cbiAqIDxsaT5JbW11dGFibGU8L2xpPlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlIGV4dGVuZHMgRGVzZXJpYWxpemFibGUsXG4gICAgQ29tcG9zaXRlVHlwZVxue1xuICAgIC8vIGZvciB1c2Ugb2YgdHlwZSBndWFyZCBvbmx5LCBsYXRlciBvbiB3ZSBjYW4gdXNlIGl0IGZvciBzb21ldGhpbmdcbiAgICBjbG9uZSgpOiBWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50aXR5KGVudGl0eTogYW55KTogZW50aXR5IGlzIEVudGl0eVxue1xuICAgIHJldHVybiBpc1ByZXNlbnQoZW50aXR5KSAmJiBpc1ByZXNlbnQoKDxFbnRpdHk+ZW50aXR5KS5pZGVudGl0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbHVlKHZhbDogYW55KTogdmFsIGlzIFZhbHVlXG57XG4gICAgcmV0dXJuIGlzUHJlc2VudCh2YWwpICAmJiBpc1ByZXNlbnQoKDxWYWx1ZT52YWwpLmNsb25lKTtcbn1cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YXNzZXJ0LCBvYmplY3RUb05hbWV9IGZyb20gJy4uLy4uL3V0aWxzL2xhbmcnO1xuXG5leHBvcnQgZW51bSBSZXN0U2VnbWVudFR5cGVcbntcbiAgICBIb3N0LFxuICAgIENvbnRleHQsXG4gICAgQWN0aW9uLFxuICAgIFJlc291cmNlLFxuICAgIElkZW50aWZpZXIsXG4gICAgT2ZQYXJlbnRcbn1cblxuXG5leHBvcnQgZW51bSBSZXN0QWN0aW9uXG57XG4gICAgTG9hZCxcbiAgICBRdWVyeSxcbiAgICBTYXZlLFxuICAgIERvXG59XG5cblxuLyoqXG4gKiBTZXQgb2YgQVNUIGxpa2UgY2xhc3NlcyB0byBrZWVwIHRoZSBmbHVlbnQgQVBJIGdyYW1tYXIgaW4gdGhlIGFic3RyYWN0IGZvcm1hdCB0byBnaXZlIGRldmVsb3BlcnNcbiAqIGNoYW5nZXMgdG8gcHJvdmlkZSB0aGVpciBvd24gaW1wbGVtZW50YXRpb25cbiAqXG4gKiBUb2RvOiBFeHBvc2UgQnVpbGRlciBhcyBhIHNlcnZpY2VcbiAqXG4gKi9cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFVybFNlZ21lbnRcbntcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogUmVzdFNlZ21lbnRUeXBlLCBwdWJsaWMgdmFsdWU/OiBhbnksXG4gICAgICAgICAgICAgICAgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4sIHB1YmxpYyByYW5rOiBudW1iZXIgPSAtMSlcbiAgICB7XG5cbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgfVxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuICdXcm9uZyBSZXN0IFNlZ21lbnQgb3JkZXInO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgSG9zdFNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuSG9zdCwgdmFsdWUsIHBhcmFtcywgNSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT0gbnVsbCwgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIEhvc3Qgc2VnbWVudCBtdXN0IGJlIGZpcnN0IWA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0U2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5Db250ZXh0LCB2YWx1ZSwgcGFyYW1zLCAxMCk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5Ib3N0LCB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gQ29udGV4dCBzZWdtZW50IG11c3QgZm9sbG93IEhvc3QhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEFjdGlvblNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG4gICAgYWN0aW9uVHlwZTogUmVzdEFjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3Rpb246IFJlc3RBY3Rpb24sIHB1YmxpYyBkYXRhPzogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24sIGFjdGlvbiwgcGFyYW1zLCAwKTtcblxuICAgICAgICAvLyBzYXZlIGl0IHRvIGxvY2FsIHByb3BlcnR5IGZvciBlYXNpZXIgY29tcGFyaXNpb25cbiAgICAgICAgdGhpcy5hY3Rpb25UeXBlID0gYWN0aW9uO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuQ29udGV4dCwgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIEFjdGlvbiBtdXN0IGZvbGxvdyBDb250ZXh0IHNlZ21lbnQhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFJlc291cmNlU2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIHJlc291cmNlTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBUeXBlPGFueT4sIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlLCB2YWx1ZSwgcGFyYW1zLCAxNSk7XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZU5hbWUgPSBgJHtvYmplY3RUb05hbWUodGhpcy52YWx1ZSkudG9Mb3dlckNhc2UoKX1zYDtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydCgocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5BY3Rpb24gfHwgcHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudCksXG4gICAgICAgICAgICB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gUmVzb3VyY2UgbXVzdCBmb2xsb3cgZWl0aGVyIEFjdGlvbiBvciBPZiFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgSWRlbnRpZmllclNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuSWRlbnRpZmllciwgdmFsdWUsIHBhcmFtcywgMjApO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UsIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gSWRlbnRpZmllciBtdXN0IGZvbGxvdyBSZXNvdXJjZSFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgT2ZQYXJlbnRTZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50KTtcbiAgICAgICAgdGhpcy5yYW5rID0gMjtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlIHx8XG4gICAgICAgICAgICBwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLklkZW50aWZpZXIsXG4gICAgICAgICAgICB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIE9mIG11c3QgZm9sbG93IFJlc291cmNlIWA7XG4gICAgfVxufVxuXG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7QWN0aW9uU2VnbWVudCwgUmVzb3VyY2VTZWdtZW50LCBSZXN0QWN0aW9uLCBSZXN0U2VnbWVudFR5cGUsIFVybFNlZ21lbnR9IGZyb20gJy4vc2VnbWVudCc7XG5pbXBvcnQge2Fzc2VydCwgaXNQcmVzZW50LCBTdHJpbmdKb2luZXJ9IGZyb20gJy4uLy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtSZXN0VXJsR3JvdXB9IGZyb20gJy4vdXJsLWdyb3VwJztcblxuXG4vKipcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gdGhhdCByZWFkcyBhYnN0cmFjdCBVUkwgc3RydWN0dXJlIGFuZCBhc3NlbWJsZXMgY29ycmVjdCBVUkwuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZhdWx0UmVzdEJ1aWxkZXJcbntcbiAgICBwcml2YXRlIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVybEdyb3VwOiBSZXN0VXJsR3JvdXApXG4gICAge1xuICAgIH1cblxuICAgIGFzc2VtYmxlVXJsKGlzTW9ja2VkOiBib29sZWFuKTogc3RyaW5nXG4gICAge1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGUoKTtcblxuICAgICAgICBsZXQgc29ydGVkU2VnbWVudHMgPSB0aGlzLmFkanVzdFJhbmsodGhpcy51cmxHcm91cC5zZWdtZW50cyk7XG5cbiAgICAgICAgbGV0IHVybCA9IG5ldyBTdHJpbmdKb2luZXIoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzb3J0ZWRTZWdtZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHNvcnRlZFNlZ21lbnRzW2ldLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFJlc3RTZWdtZW50VHlwZS5BY3Rpb246XG4gICAgICAgICAgICAgICAgY2FzZSBSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2U6XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXNTZWdtZW50OiBSZXNvdXJjZVNlZ21lbnQgPSA8UmVzb3VyY2VTZWdtZW50PiBzb3J0ZWRTZWdtZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwuYWRkKCdtb2NrZWQnKS5hZGQoJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1cmwuYWRkKHJlc1NlZ21lbnQucmVzb3VyY2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTbGFzaCh1cmwsIGkgIT09IChzb3J0ZWRTZWdtZW50cy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB1cmwuYWRkKHNvcnRlZFNlZ21lbnRzW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTbGFzaCh1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmVzZW50KHNvcnRlZFNlZ21lbnRzW2ldLnZhbHVlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZFNlZ21lbnRzW2ldLnZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgIT09IChzb3J0ZWRTZWdtZW50cy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCg8QWN0aW9uU2VnbWVudD5zb3J0ZWRTZWdtZW50c1swXSkudmFsdWUgPT09IFJlc3RBY3Rpb24uRG8pIHtcbiAgICAgICAgICAgIHVybC5hZGQoJy8nKS5hZGQoJ2FjdGlvbnMnKS5hZGQoJy8nKS5hZGQoKDxBY3Rpb25TZWdtZW50PnNvcnRlZFNlZ21lbnRzWzBdKS5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgYWRkU2xhc2godXJsOiBTdHJpbmdKb2luZXIsIHNob3VsZEFkZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHVybC5hZGQoJy8nKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHZhbGlkYXRlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhY3Rpb246IEFjdGlvblNlZ21lbnQgPSA8QWN0aW9uU2VnbWVudD50aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuQWN0aW9uKTtcblxuICAgICAgICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uU2F2ZTpcbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5EbzpcbiAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgd2UgaGF2ZSBhIElkZW50aWZpZXJcbiAgICAgICAgICAgICAgICBsZXQgd2l0aElkQ291bnQgPSB0aGlzLnVybEdyb3VwLmNvdW50KFJlc3RTZWdtZW50VHlwZS5JZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICBsZXQgb2YgPSB0aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQpO1xuXG4gICAgICAgICAgICAgICAgYXNzZXJ0KHdpdGhJZENvdW50ID49IDEsICdNaXNzaW5nIHdpdGhJZCg8SURFTlRJRklFUj4pIGNhbGwhJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBPRiBzZWdtZW50IHdoZXJlIHdlIHJlZmVyIHRvIHBhcmVudCByZXNvdXJjZS4gSW4gc3VjaCBjYXNlIHdlXG4gICAgICogbmVlZCBtb3ZlIGFsbCBiZWZvcmUgT0YgYXQgdGhlIGVuZC4gRWl0aGVyIGFmdGVyIHBhcmVudCBSRVNPVVJDRSBvciBJREVOVElGSUVSXG4gICAgICpcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqICAgc2VydmljZVxuICAgICAqICAgICAgLmxvYWQoKVxuICAgICAqICAgICAgLnJlc291cmNlKExpbmVJdGVtKVxuICAgICAqICAgICAgLm9mXG4gICAgICogICAgICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gICAgICogICAgICAud2l0aElkKCcxMjMnKTtcbiAgICAgKiAgYGBgXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICogRmluZCB0aGUgT0Ygc2VnbWVudCBhbmQgZ28gYmFjayB1bnRpbCB3ZSByZWFjaCBSZXNvdXJjZSBhbmQgYWRqdXN0IHJhbmsgb2YgdGhlc2UgYWRuXG4gICAgICogdGhlblxuICAgICAqIHNvcnRcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRqdXN0UmFuayhzZWdtZW50czogVXJsU2VnbWVudFtdKTogVXJsU2VnbWVudFtdXG4gICAge1xuICAgICAgICBsZXQgb2ZJbmRleCA9IHNlZ21lbnRzXG4gICAgICAgICAgICAuZmluZEluZGV4KChzOiBVcmxTZWdtZW50KSA9PiBzLnR5cGUgPT09IFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudCk7XG5cbiAgICAgICAgaWYgKG9mSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgb2YgPSBzZWdtZW50c1tvZkluZGV4XTtcbiAgICAgICAgICAgIGxldCBzZWdtZW50OiBVcmxTZWdtZW50O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQgPSBzZWdtZW50c1stLW9mSW5kZXhdO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQucmFuayAqPSBvZi5yYW5rO1xuICAgICAgICAgICAgfSB3aGlsZSAoc2VnbWVudC50eXBlICE9PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzLnNvcnQoKGEsIGIpID0+IGEucmFuayAtIGIucmFuayk7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1Jlc291cmNlU2VnbWVudCwgUmVzdFNlZ21lbnRUeXBlLCBVcmxTZWdtZW50fSBmcm9tICcuL3NlZ21lbnQnO1xuaW1wb3J0IHthc3NlcnQsIGlzQmxhbmssIGlzUHJlc2VudCwgaXNTdHJpbmd9IGZyb20gJy4uLy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnLi4vLi4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqXG4gKiBUaGlzIGNsYXNzIGp1c3QgYWdncmVnYXRlcyBhbmQgcHJvdmlkZXMgY29udmllbnQgYXBpdCB0byB0byB3b3JrIHdpdGggVXJsU2VnbWVudHNcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXN0VXJsR3JvdXBcbntcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWdtZW50cz86IFVybFNlZ21lbnRbXSlcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3NlZ21lbnRzKSkge1xuICAgICAgICAgICAgdGhpcy5fc2VnbWVudHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBFdmVyeSBwdXNoIGlzIHZhbGlkYXRlZCBhZ2FpbnRzIFVybFNlZ21lbnQgYXNzZXJ0IG1ldGhvZHMgdG8gbWFrZSBzdXJlIHRoZSBvcmRlciBvZiB0aGVcbiAgICAgKiBtZXRob2QgY2FsbHMgaXMgY29ycmVjdFxuICAgICAqXG4gICAgICovXG4gICAgcHVzaChzZWdtZW50OiBVcmxTZWdtZW50KTogdm9pZFxuICAgIHtcbiAgICAgICAgc2VnbWVudC5hc3NlcnRTZWdtZW50KCh0aGlzLl9zZWdtZW50cy5sZW5ndGggPiAwKSA/IHRoaXMucGVhaygpLnR5cGUgOiBudWxsKTtcblxuICAgICAgICBpZiAoaXNTdHJpbmcoc2VnbWVudC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHNlZ21lbnQudmFsdWUgPSBzZWdtZW50LnZhbHVlLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFN0YWNrIGxpa2UgQVBJXG4gICAgICpcbiAgICAgKi9cbiAgICBwZWFrKCk6IFVybFNlZ21lbnRcbiAgICB7XG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5sYXN0PFVybFNlZ21lbnQ+KHRoaXMuX3NlZ21lbnRzKTtcbiAgICB9XG5cblxuICAgIHBvcCgpOiBVcmxTZWdtZW50XG4gICAge1xuICAgICAgICBhc3NlcnQodGhpcy5fc2VnbWVudHMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICcgQXR0ZW1wdCB0byBnZXQgdmFsdWUgZnJvbSBlbXB0eSBzZWdtZW50cyBzdGFjaycpO1xuXG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5yZW1vdmVBdDxVcmxTZWdtZW50Pih0aGlzLl9zZWdtZW50cywgdGhpcy5fc2VnbWVudHMubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VnbWVudChzZWdtZW50VHlwZTogUmVzdFNlZ21lbnRUeXBlLCBkYXRhOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgdXJsU2VnbWVudCA9IHRoaXMubG9va3VwKHNlZ21lbnRUeXBlKTtcbiAgICAgICAgdXJsU2VnbWVudC52YWx1ZSA9IGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBCYXNlZCBvbiB0aGUgZW51bSBTZWdtZW50IFR5cGUgIGl0IHdpbGwgcmV0cmlldmUgY29ycmVjdCBzZWdtZW50IGZyb20gdGhlIHN0YWNrXG4gICAgICpcbiAgICAgKi9cbiAgICBsb29rdXAoc2VnbWVudDogUmVzdFNlZ21lbnRUeXBlLCBieVJlc291cmNlPzogVHlwZTxhbnk+KTogVXJsU2VnbWVudFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zZWdtZW50cykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNzID0gWy4uLnRoaXMuc2VnbWVudHNdO1xuICAgICAgICBzcyA9IHNzLnJldmVyc2UoKTtcblxuICAgICAgICByZXR1cm4gc3MuZmluZCgoKHM6IFVybFNlZ21lbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNNYXRjaCA9IHMudHlwZSA9PT0gc2VnbWVudDtcblxuICAgICAgICAgICAgaWYgKHNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChieVJlc291cmNlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTWF0Y2ggJiYgKDxSZXNvdXJjZVNlZ21lbnQ+cykudmFsdWUgPT09IGJ5UmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc01hdGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoYXNNYXRjaDtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ291bnRzIG51bWJlciBvZiBzZWdtZW50cyBvZiBjZXJ0YWluIHR5cGVcbiAgICAgKlxuICAgICAqL1xuICAgIGNvdW50KHNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHNlZ21lbnRzID0gdGhpcy5zZWdtZW50cy5maWx0ZXIoKHM6IFVybFNlZ21lbnQpID0+IHNlZ21lbnQgPT09IHMudHlwZSk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoc2VnbWVudHMpID8gc2VnbWVudHMubGVuZ3RoIDogMDtcbiAgICB9XG5cblxuICAgIGdldCBzZWdtZW50cygpOiBVcmxTZWdtZW50W11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50cztcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cblxuXG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0luamVjdGFibGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBIdHRwQ2xpZW50LFxuICAgIEh0dHBFcnJvclJlc3BvbnNlLFxuICAgIEh0dHBIZWFkZXJzLFxuICAgIEh0dHBQYXJhbXMsXG4gICAgSHR0cFByb2dyZXNzRXZlbnQsXG4gICAgSHR0cFJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7RW50aXR5LCBpc0VudGl0eSwgaXNWYWx1ZSwgVmFsdWV9IGZyb20gJy4vZG9tYWluLW1vZGVsJztcbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICcuLi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge1xuICAgIEFjdGlvblNlZ21lbnQsXG4gICAgQ29udGV4dFNlZ21lbnQsXG4gICAgSG9zdFNlZ21lbnQsXG4gICAgSWRlbnRpZmllclNlZ21lbnQsXG4gICAgT2ZQYXJlbnRTZWdtZW50LFxuICAgIFJlc291cmNlU2VnbWVudCxcbiAgICBSZXN0QWN0aW9uLFxuICAgIFJlc3RTZWdtZW50VHlwZVxufSBmcm9tICcuL3VybC9zZWdtZW50JztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVmYXVsdFJlc3RCdWlsZGVyfSBmcm9tICcuL3VybC9idWlsZGVyJztcbmltcG9ydCB7UmVzdFVybEdyb3VwfSBmcm9tICcuL3VybC91cmwtZ3JvdXAnO1xuaW1wb3J0IHthc3NlcnQsIGlzQXJyYXksIGlzQmxhbmssIGlzRGF0ZSwgaXNQcmVzZW50fSBmcm9tICcuLi91dGlscy9sYW5nJztcblxuXG4vKipcbiAqIFJlc3BvbnNlIGlzIHRoZSBnZW5lcmljIHdyYXBwZXIgaW50ZXJmYWNlIGVuY2Fwc3VsYXRpbmcgYSByZXNwb25zZSBmcm9tIHRoZSBtaWNybyBzZXJ2aWNlLlxuICogQ3VycmVudGx5IHdlIGhhdmUgb25seSBib2R5IGZpZWxkLCBidXQgbGF0ZXIgb24gd2UgbmVlZCB0byBleHRlbmQgaXQgZm9yIGRpZmZlcmVudCBub3RpZmljYXRpb25zLFxuICogZXJyb3JzLCBwYWdpbmcgaW5mb3JtYXRpb24gYW5kIG11Y2ggbW9yZS5cbiAqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZTxUPiB7XG4gICAgcGF5bG9hZDogVDtcbn1cblxuXG4vKipcbiAqXG4gKiBUbyBzaW1wbGlmeSB3b3JrIHdpdGggY3VycmVudCBIdHRwQ2xpZW50IHRoZSBSZXNvdXJjZSBwcm92aWRlcyBmbHVlbnQgQVBJIG9uIHRvcCBvZiBpdC4gWW91IGRvbnRcbiAqIGFzc2VtYmxlIFVSTCB0cmFkaXRpb25hbCB3YXkgcmF0aGVyIG1vcmUgZmx1ZW50IGFuZCBmdW5jdGlvbmFsIHdheSwgd29ya2luZyB3aXRoIHJlYWwgZGF0YSB0eXBlc1xuICogc3VjaCBhIFZhbHVlIGFuZCBFbnRpdHkuXG4gKlxuICogRW50aXR5IGFuZCBWYWx1ZSBhcmUgdHdvIG1haW4ga2V5IGludGVyZmFjZXMgdGhhdCBhbGwgZG9tYWluIG9iamVjdHMgc2hvdWxkIGluaGVyaXQgZnJvbSBpZiB0aGV5XG4gKiB3YW50IHRvIGxldmVyYWdlIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiAjIyNFeGFtcGxlXG4gKlxuICogMS4gIHRvIHNpbXBseSBhc3NlbWJsZSBmb2xsb3dpbmcgVVJMIGh0dHA6Ly9hcGkuYXJpYmEuY29tL215U2VydmljZS92MS9yZXF1aXNpdGlvbnMvMTIzIGFuZFxuICogIGFuZCBmZXRjaCBSZXF1aXNpdGlvbiBkYXRhOlxuICpcbiAqIGBgYHRzXG4gKiAgbGV0IHI6IFJlc291cmNlXG4gKlxuICogIHIubG9hZCgpXG4gKiAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAqICAgLndpdGhJZCgnMTIzJylcbiAqICAgLmFzRW50aXR5PFJlcXVpc2l0aW9uPigocjogUmVxdWlzaXRpb24pID0+IHJlY2VpdmVkUiA9IHIpO1xuICpcbiAqIGBgYFxuICogWW91IHlvdSBjYW4gc2ltcGx5IHJlYWQgaXQ6IGxvYWQgcmVzb3VyY2UgUmVxdWlzaXRpb24gd2l0aCBJRCAxMjMgYW5kIHJldHVybiB0aGlzIGFzIEVudGl0eVxuICpcbiAqIDIuIEN1cnJlbnQgZmx1ZW50IEFQSSBhbHNvIHN1cHBvcnQgcGFydGlhbCB1cGRhdGVzIGFuZCBzdWJjb250ZXh0IHJlc291cmNlXG4gKiAgdG8gbG9hZCBkYXRhIGZyb20gdGhpcyBSRVNUIEFQSSBlbmRwb2ludFxuICogICAgICBodHRwOi8vYXBpLmFyaWJhLmNvbS9teVNlcnZpY2UvdjEvcmVxdWlzaXRpb25zLzEyMy9zdXBwbGllcnNcblxuXG4gKiBgYGB0c1xuICogIGxldCByOiBSZXNvdXJjZVxuICpcbiAqICByLmxvYWQoKVxuICogICAucmVzb3VyY2UoU3VwcGxpZXIpXG4gKiAgIC5vZlxuICogICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gKiAgIC53aXRoSWQoJzEyMycpXG4gKiAgIC5hc0VudGl0eTxTdXBwbGllcj4oKHI6ICBTdXBwbGllcltdKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKiBgYGBcbiAqXG4gKiAgWW91IGNhbiByZWFkIGFib3ZlOiBMb2FkIGFsbCBmcm9tIHJlc291cmNlIFN1cHBsaWVyIG9mIFJlcXVpc2l0aW9uIChvciBzdXBwbGllciBiZWxvbmdzIHRvXG4gKiAgUmVxdWlzaXRpb24pICB3aXRoIElEIDEyMyBhbmQgcmV0dXJuIHRoaXMgYXMgRW50aXR5LlxuICpcbiAqXG4gKiAzLiBUbyBzYXZlIGRhdGEgeW91IGZvbGxvdyB0aGUgc2FtZSBzeW50YXhcbiAqICAgICAgU2F2ZSByZXF1aXNpdGlvbiBzbyB3ZSBhcmUgUFVUdGluZyBkYXRhIHRvIGZvbGxvd2luZyBVUkxcbiAqICAgICAgaHR0cDovL2FwaS5hcmliYS5jb20vbXlTZXJ2aWNlL3YxL3JlcXVpc2l0aW9ucy8xMjNcbiAqXG4gKiBgYGB0c1xuICogIGxldCByOiBSZXNvdXJjZVxuICpcbiAqICAgICAgICAgIHJcbiAqICAgICAgICAuc2F2ZSgpXG4gKiAgICAgICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICogICAgICAgIC53aXRoSWQoJzEyMycpXG4gKiAgICAgICAgLndpdGhEYXRhKHByKVxuICogICAgICAgIC5hc0VudGl0eTxSZXF1aXNpdGlvbj4oKHI6IFJlcXVpc2l0aW9uKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKlxuICogYGBgXG4gKlxuICogIFlvdSBjYW4gcmVhZCBhYm92ZTogU2F2ZSByZXNvdXJjZSBSZXF1aXNpdGlvbiB3aXRoIElEIDEyMyBhbmQgd2l0aCBEYXRhIC4uLi4gYW5kIHJldHVybiBpdCBhc1xuICogIGEgRW50aXR5XG4gKlxuICpcbiAqICA0LiBBUEkgY2FuIGFsc28gZm9yIHlvdSBhc3NlbWJsZSBhbmQgZXhlY3V0ZSBhY3Rpb25zIHNvbWV0aW1lcyBjYWxsZWQgaW50ZXJhY3Rpb24uIE5vdCBhbGwgaXNcbiAqICBhYm91dCBDUlVELiBPdXIgY3VycmVudCBzeW50YXggZm9yIGFjdGlvbnMgaXNcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgaHR0cDovL2FwaS5hcmliYS5jb20vbXlTZXJ2aWNlL3YxL3JlcXVpc2l0aW9ucy8xMjMvYWN0aW9ucy9hcHByb3ZlXG4gKlxuICogYGBgdHNcbiAqICBsZXQgcjogUmVzb3VyY2VcbiAqXG4gKiAgICAgICAgclxuICogICAgICAgIC5kbygnYXBwcm92ZScpXG4gKiAgICAgICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICogICAgICAgIC53aXRoSWQoJzEyMycpXG4gKiAgICAgICAgLmFzRW50aXR5PFJlcXVpc2l0aW9uPigocjogUmVxdWlzaXRpb24pID0+IHJlY2VpdmVkUiA9IHIpO1xuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiBUbyBtYWtlIGl0IGVhc2lseSBleHRlbnNpYmxlIHRoZXkgYXJlIDMgbWFpbiBwaWVjZXNcbiAqICAtIFJlc291cmNlOiBUaGlzIGNsYXNzIGp1c3QgcHV0IHRvZ2V0aGVyIGFic3RyYWN0IHN0cnVjdHVyZSBVUkxTZWdtZW50XG4gKiAgLSBVUkxTZWdtZW50czogTW9yZSBsaWtlIEFTVCBzdHlsZSB0byBhc3NlbWJsZSB0aGUgVVJMXG4gKiAgLSBidWlsZGVyOiB0aGF0IHJlYWQgdGhpcyBBU1QgdG8gYXNzZW1ibGUgdGhlIFVSTFxuICpcbiAqXG4gKiBMYXRlciBvbiB3ZSBtaWdodCB3YW50IHRvIGV4cG9zZSBidWlsZGVyIGFzIGEgcHJvdmlkZXIgYW5kIHlvdSBjYW4gaGF2ZSB5b3VyIG93biBpbXBsZW1lbnRhdGlvblxuICpcbiAqXG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc291cmNlIHtcbiAgICAvKipcbiAgICAgKiBSZXN0VXJsR3JvdXAgYWdncmVnYXRlcyBVcmxTZWdtZW50c1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBfdXJsR3JvdXA6IFJlc3RVcmxHcm91cDtcblxuICAgIC8qKlxuICAgICAqIE9uY2UgYWxsIFVSTCBhcmUgYXNzZW1ibGVkIHRoZSBidWlsZGVyIHJldHVybnMgZmluYWwgVVJMIHRvIGJlIHVzZWQgZm9yIHRoZSBIdHRwQ2xpZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBfdXJsQnVpbGRlcjogRGVmYXVsdFJlc3RCdWlsZGVyO1xuXG4gICAgLyoqXG4gICAgICogQ2FjaGVkIHVybCwgc28gd2UgZG9udCBoYXZlIHRvIGFzc2VtYmxlIHRoaXMgZXZlcnl0aW1lIHNvbWVib2R5IGNhbGxzIHVybFxuICAgICAqL1xuICAgIHByaXZhdGUgX3VybDogc3RyaW5nO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgYXBwQ29uZmlnOiBBcHBDb25maWcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIEdFVCBvcGVyYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGxvYWQoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IEFjdGlvblNlZ21lbnQoUmVzdEFjdGlvbi5Mb2FkKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBQVVQgb3IgUE9TVCBvcGVyYXRpb24uIERlcGVuZGluZyBvbiB0aGUgb2JqZWN0LiBJZiB0aGUgb2JqZWN0IGhhcyBhbHJlYWR5XG4gICAgICogcG9wdWxhdGVkIGl0cyBpZGVudGlmaWVyLCB0aGVuIHdlIHVzZSBQVVQsIG90aGVyd2lzZSBQT1NUXG4gICAgICpcbiAgICAgKi9cbiAgICBzYXZlKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBBY3Rpb25TZWdtZW50KFJlc3RBY3Rpb24uU2F2ZSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgaW50ZXJhY3Rpb24uIEZvciB0aGlzIHdlIHVzZSBQT1NUXG4gICAgICpcbiAgICAgKi9cbiAgICBkbyhhY3Rpb246IHN0cmluZyk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBBY3Rpb25TZWdtZW50KFJlc3RBY3Rpb24uRG8sIGFjdGlvbikpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVE9ETzogU2luY2UgcXVlcnkgQVBJIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgb24gdGhlIHNlcnZlciBzaWRlID0+IFRCRFxuICAgICAqXG4gICAgICogVGhlcmUgd2hlcmUgc2hvdWxkIGJlIGFibGUgdG8gYWNjZXB0cyBpbmRpdmlkdWFsIHF1ZXJ5IGdyYW1tYXIuIFNpbWlsYXIgc3R5bGUgbGlrZSByeGpzXG4gICAgICogb3BlcmF0b3JzLlxuICAgICAqXG4gICAgICogIGUuZy46IFJlc291cmNlLnByb3RvdHlwZS5jb250YWlucyA9IC4uLi5cbiAgICAgKiAgICAgICAgUmVzb3VyY2UucHJvdG90eXBlLmVxID0gLi4uLlxuICAgICAqXG4gICAgICogWW91IHNob3VsZCBiZSBhYmxlIHRvIGFkZCBkeW5hbWljYWxseSBsZXQ7cyBjYWxsIGl0IFF1ZXJ5U3BlY2lmaWNhdGlvblxuICAgICAqXG4gICAgICogICAgICByZXNcbiAgICAgKiAgICAgIC5xdWVyeSgpXG4gICAgICogICAgICAucmVzb3VyY2UoUmVxdXNpdGlvbilcbiAgICAgKiAgICAgIC53aGVyZSggY29udGFpbnM8c3RyaW5nPihyZXFFbnRpdHkudGl0bGUoKSwgJyphc2RmKicgKVxuICAgICAqXG4gICAgICogIHNvIGl0IGNvdWxkIGxvb2sgbGlrZSBzb21ldGhpbmcgbGlrZTpcbiAgICAgKlxuICAgICAqXG4gICAgICogIGNvbnRhaW5zPFQ+KHRpdGxlOiBzdHJpbmcsIHZhbHVlOiBUKTogVFxuICAgICAqXG4gICAgICogIEJ1dCBzaW5jZSBhbGwgdGhlc2UgU3BlY2lmaWNhdGlvbiB3b3VsZCBoYXZlIGEgd2F5IHRvIHRyYW5zbGF0ZSB0aGlzIGtleXx2YWx1ZSB0byB0aGVcbiAgICAgKiAgcXVlcnkgc28gdGhlIHdoZXJlLCB3b3VsZCBqdXN0IGxpc3QgYWxsIHRoZSBzcGVjaWZpY2F0aW9uIHRvIGJ1bGlkXG4gICAgICogIHRoZSBxdWVyeVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBxdWVyeSgpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgd2hlcmUoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSWRlbnRpZmllcyBSZXNvdXJjZVNlZ21lbnQgd2l0aCBzcGVjaWZpYyB0eXBlIHRoYXQgbXVzdCBiZSBlaXRoZXIgRW50aXR5IG9yIFZhbHVlXG4gICAgICpcbiAgICAgKi9cbiAgICByZXNvdXJjZTxUIGV4dGVuZHMgRW50aXR5IHwgVmFsdWU+KHR5cGU6IFR5cGU8VD4pOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgUmVzb3VyY2VTZWdtZW50KHR5cGUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBJZGVudGlmaWVyU2VnbWVudFxuICAgICAqXG4gICAgICovXG4gICAgd2l0aElkKGlkZW50aWZpZXI6IHN0cmluZyk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBJZGVudGlmaWVyU2VnbWVudChpZGVudGlmaWVyKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgYXJlIHNhdmluZyBkYXRhIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gaW5zZXJ0IGEgcGF5bG9hZCB0byB0aGUgQWN0aW9uU2VnbWVudFxuICAgICAqXG4gICAgICovXG4gICAgd2l0aERhdGE8VCBleHRlbmRzIEVudGl0eSB8IFZhbHVlPihkYXRhOiBUKTogUmVzb3VyY2Uge1xuICAgICAgICBsZXQgdXJsU2VnbWVudCA9IHRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24pO1xuICAgICAgICBsZXQgaXNTYXZlID0gKDxBY3Rpb25TZWdtZW50PnVybFNlZ21lbnQpLmFjdGlvblR5cGUgPT09IFJlc3RBY3Rpb24uU2F2ZTtcblxuICAgICAgICBhc3NlcnQoaXNTYXZlLCAnd2l0aERhdGEgY2FuIGJlIHVzZWQgd2l0aCBTQVZFIG9wZXJhdGlvbiBvbmx5IScpO1xuXG4gICAgICAgICg8QWN0aW9uU2VnbWVudD51cmxTZWdtZW50KS5kYXRhID0gZGF0YTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBPRiBpcyBqdXN0IGEgc3ludGFjdGljIHN1Z2dhciBmb3IgYmV0dGVyIHJlYWRhYmlsaXR5IGFuZCB0byBlYXNpZXIgd29yayB3aXRoIHN1YiByZXNvdXJjZXMuXG4gICAgICogdXNpbmcgT0Ygd2UgYXJlIGFibGUgdG8gdGVsbCB0aGF0IHNvbWUgcmVzb3VyY2UgYmVsb25ncyB0byBvdGhlciByZXNvdXJjZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IG9mKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBPZlBhcmVudFNlZ21lbnQoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBPbmNlIHRlbGwgd2hhdCB5b3Ugd2FudCB0aGlzIGlzIHRoZSBsYXN0IGNhbGwgeW91IHdhbnQgdG8gbWFrZSB0byByZXR1cm4gcmVzb3VyY2VzIGFzIGFjdHVhbFxuICAgICAqIEVudGl0aWVzIG9yIFZhbHVlcy5cbiAgICAgKlxuICAgICAqIFRvZG86IE1heWJlIHJlbmFtZSBhIG1ldGhvZCBuYW1lIGFzIHdlIGNhbiByZXR1cm4gYm90aCBFbnRpdHkgYW5kIFZhbHVlLlxuICAgICAqXG4gICAgICogWW91IGhhdmUgYWxzbyBvcHRpb24gdG8gaW5zZXJ0IEh0dHBPcHRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGFzRW50aXR5PFQgZXh0ZW5kcyBFbnRpdHkgfCBWYWx1ZT4oc3Vic2NyaWJlcjogKHJlczogVCB8IFRbXSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZTogJ2JvZHknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zPzogSHR0cFBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlPzogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ID0ge29ic2VydmU6ICdib2R5J30pOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICBsZXQgc2VnbWVudDogQWN0aW9uU2VnbWVudCA9IDxBY3Rpb25TZWdtZW50PiB0aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuQWN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChzZWdtZW50KSwgJ01pc3NpbmcgSHR0cCBtZXRob2QuIE5vdCBzdXJlIGhvdyB0byBoYW5kbGUgdGhpcyEnKTtcblxuICAgICAgICBsZXQgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgICAgIGxldCBhY3Rpb25UeXBlOiBSZXN0QWN0aW9uID0gc2VnbWVudC52YWx1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uTG9hZDpcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLmdldDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uRG86XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwge30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uU2F2ZTpcbiAgICAgICAgICAgICAgICAvLyB3ZSBkb250IGhhdmUgcmlnaHQgbm93IG90aGVyIHVzZWNhc2Ugc3ViY29udGV4dCByZXNvdXJjZSB3aWxsIGJlIGFsd2F5cyBzb21lXG4gICAgICAgICAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgICAgICAgICBpZiAoaXNFbnRpdHkoc2VnbWVudC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNCbGFuaygoPEVudGl0eT5zZWdtZW50LmRhdGEpLmlkZW50aXR5KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnBvc3Q8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNWYWx1ZShzZWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGV4cGVjdCB2YWx1ZSB3aWxsIGJlIGFsd2F5cyBwdXNoZWRcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXA8UmVzcG9uc2U8VCB8IFRbXT4sIFQgfCBUW10+KHJlcyA9PiB0aGlzLmNvbnZlcnRUb0NvbXBvc2l0ZShyZXMsXG4gICAgICAgICAgICB0cnVlLCBmYWxzZSkpKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfVxuXG5cbiAgICBhc0h0dHBSZXNwb25zZTxUIGV4dGVuZHMgRW50aXR5IHxcbiAgICAgICAgVmFsdWU+KHN1YnNjcmliZXI6IChyZXM6IEh0dHBSZXNwb25zZTxSZXNwb25zZTxUIHwgVFtdPj4gfCBIdHRwUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgIGVycm9yPzogKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgcGFyYW1zPzogSHR0cFBhcmFtcywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZT86ICdqc29uJywgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhblxuICAgICAgICAgICAgICAgfSA9IHtvYnNlcnZlOiAncmVzcG9uc2UnfSk6IFN1YnNjcmlwdGlvbiB7XG5cbiAgICAgICAgbGV0IHNlZ21lbnQ6IEFjdGlvblNlZ21lbnQgPSA8QWN0aW9uU2VnbWVudD4gdGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbik7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQoc2VnbWVudCksICdNaXNzaW5nIEh0dHAgbWV0aG9kLiBOb3Qgc3VyZSBob3cgdG8gaGFuZGxlIHRoaXMhJyk7XG5cbiAgICAgICAgbGV0IG9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PjtcblxuICAgICAgICBsZXQgYWN0aW9uVHlwZTogUmVzdEFjdGlvbiA9IHNlZ21lbnQudmFsdWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkxvYWQ6XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkRvOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLlNhdmU6XG4gICAgICAgICAgICAgICAgLy8gd2UgZG9udCBoYXZlIHJpZ2h0IG5vdyBvdGhlciB1c2VjYXNlIHN1YmNvbnRleHQgcmVzb3VyY2Ugd2lsbCBiZSBhbHdheXMgc29tZVxuICAgICAgICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgICAgICAgaWYgKGlzRW50aXR5KHNlZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoKDxFbnRpdHk+c2VnbWVudC5kYXRhKS5pZGVudGl0eSgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzVmFsdWUoc2VnbWVudC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBleHBlY3QgdmFsdWUgd2lsbCBiZSBhbHdheXMgcHVzaGVkXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoYXNQcm9ncmVzcyA9IG9wdGlvbnMucmVwb3J0UHJvZ3Jlc3MgfHwgZmFsc2U7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUoXG4gICAgICAgICAgICBtYXAocmVzID0+IHRoaXMuY29udmVydFRvQ29tcG9zaXRlKHJlcywgZmFsc2UsIGhhc1Byb2dyZXNzKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHN1YnNjcmliZXIsIGVycm9yKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0dXJuIGFzc2VibGVkIFVSTCBBU1QgLT4gc3RyaW5nXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3VybCkpIHtcbiAgICAgICAgICAgIGxldCBpc01vY2tlZCA9IHRoaXMuYXBwQ29uZmlnLmdldEJvb2xlYW4oQXBwQ29uZmlnLkNvbm5lY3Rpb25Vc2VNb2NrU2VydmVyKTtcblxuICAgICAgICAgICAgdGhpcy5fdXJsID0gdGhpcy5fdXJsQnVpbGRlci5hc3NlbWJsZVVybChpc01vY2tlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCB1cmxHcm91cCgpOiBSZXN0VXJsR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXJsR3JvdXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJpdmF0ZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IHVybEJ1aWxkZXIoKTogRGVmYXVsdFJlc3RCdWlsZGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybEJ1aWxkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJpdmF0ZVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl91cmxHcm91cCA9IG5ldyBSZXN0VXJsR3JvdXAoKTtcbiAgICAgICAgdGhpcy5fdXJsQnVpbGRlciA9IG5ldyBEZWZhdWx0UmVzdEJ1aWxkZXIodGhpcy5fdXJsR3JvdXApO1xuICAgICAgICB0aGlzLl91cmwgPSBudWxsO1xuXG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBIb3N0U2VnbWVudCh0aGlzLmFwcENvbmZpZy5nZXRSZXN0QXBpSG9zdCgpKSk7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgQ29udGV4dFNlZ21lbnQodGhpcy5hcHBDb25maWcuZ2V0UmVzdEFwaUNvbnRleHQoKSkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBpbnNpZGUgLm1hcCB0byBtYXAgSlNPTiByZXNwb25zZSBvciBIdHRwUmVzcG9uc2UuYm9keSB0byBhY3R1YWwgdHlwZVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0VG9Db21wb3NpdGU8VCBleHRlbmRzIEVudGl0eSB8IFZhbHVlPihyZXM6IFJlc3BvbnNlPFQgfCBUW10+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIdHRwUmVzcG9uc2U8UmVzcG9uc2U8VCB8IFRbXT4+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wb3NpdGU6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ncmVzczogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGlmIChoYXNQcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgICAvLyB1bnNvcnRlZCBzZWdtZW50cyB3aWxsIGhhdmUgaGF2ZSBvdXIgdGFyZ2V0IHJlc291cmNlIGFzIGZpcnN0IG9uZVxuICAgICAgICBsZXQgc2dtOiBSZXNvdXJjZVNlZ21lbnQgPSA8UmVzb3VyY2VTZWdtZW50PnRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSk7XG5cbiAgICAgICAgaWYgKGlzQ29tcG9zaXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXNlcmlhbGl6ZSgoPFJlc3BvbnNlPFQ+PnJlcykucGF5bG9hZCwgc2dtLnZhbHVlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGh0dHBSZXMgPSA8SHR0cFJlc3BvbnNlPFJlc3BvbnNlPFQ+Pj5yZXM7XG4gICAgICAgICAgICBsZXQgbXlSZXNwOiBSZXNwb25zZTxUPiA9IHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiB0aGlzLmRlc2VyaWFsaXplKGh0dHBSZXMuYm9keS5wYXlsb2FkLCBzZ20udmFsdWUpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGh0dHBSZXMuY2xvbmUoe2JvZHk6IG15UmVzcH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzZXJpYWxpemU8VD4oZGF0YTogVCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENvbnZlcnRzIEpTT04gb2JqZWN0IHRvIGFjdHVhbCBUeXBlLiBXZSBkb24ndCBjYXJlIGFib3V0IHByaW1pdGl2ZSB0eXBlcyBhcyB3ZSBkb250IGhhdmUgdG9cbiAgICAgKiBkbyBhbnl0aGluZyB3aXRoIHRoZW0uIFdlIGRvIGluc3RhbnRpYXRlIG9iamVjdHMgb3IgY29tcGxleCB0eXBlcyBvbmx5LlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBkZXNlcmlhbGl6ZShqc29uOiBhbnksIGNsYXp6OiBUeXBlPGFueT4pOiBhbnkge1xuICAgICAgICBpZiAoaXNBcnJheShqc29uKSkge1xuICAgICAgICAgICAgbGV0IGluc3RhbmNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBpbiBqc29uKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VzLnB1c2godGhpcy5kZXNlcmlhbGl6ZShqc29uW2l0ZW1dLCBjbGF6eikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZTtcbiAgICAgICAgICAgIGlmIChjbGF6eiA9PT0gU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBqc29uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXp6ID09PSBOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IGpzb247XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXp6ID09PSBCb29sZWFuKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBqc29uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBjbGF6eigpO1xuICAgICAgICAgICAgICAgIGxldCB0eXBlcyA9IGluc3RhbmNlLmdldFR5cGVzKCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFqc29uLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodHlwZXNbcHJvcF0pICYmIGlzUHJlc2VudChqc29uW3Byb3BdKSAmJiB0eXBlc1twcm9wXSAhPT0gRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcF0gPSB0aGlzLmRlc2VyaWFsaXplKGpzb25bcHJvcF0sIHR5cGVzW3Byb3BdKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZSh0eXBlc1twcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BdID0gbmV3IHR5cGVzW3Byb3BdKGpzb25bcHJvcF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wXSA9IGpzb25bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGlmIChpc1N0cmluZyhqc29uW3Byb3BdKSAmJiBpc0VudGl0eShpbnN0YW5jZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICYmIHByb3AgPT09ICg8RW50aXR5Pmluc3RhbmNlKS5pZGVudGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBpZFN0cmluZyA9ICg8RW50aXR5Pmluc3RhbmNlKS5pZGVudGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgKDxhbnk+aW5zdGFuY2UpW2lkU3RyaW5nXSA9IDxzdHJpbmc+anNvbltwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFnZS1jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxoMT4gT29wcyE8L2gxPlxuICAgICAgICAgICAgICAgIDxoMj4gNDA0IE5vdCBGb3VuZDwvaDI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLWRldGFpbHNcIj4gU29ycnksIGFuIGVycm9yIGhhcyBvY2N1cmVkLCBSZXF1ZXN0ZWQgcGFnZSBub3QgZm91bmQhXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLmVycm9yLXRlbXBsYXRle3BhZGRpbmc6NDBweCAxNXB4O3RleHQtYWxpZ246Y2VudGVyfS5lcnJvci1hY3Rpb25ze21hcmdpbi10b3A6MTVweDttYXJnaW4tYm90dG9tOjE1cHh9LmVycm9yLWFjdGlvbnMgLmJ0bnttYXJnaW4tcmlnaHQ6MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOb3RGb3VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgIH1cblxufVxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBFdmVudCxcbiAgICBOYXZpZ2F0aW9uRW5kLFxuICAgIE5hdmlnYXRpb25FeHRyYXMsXG4gICAgTmF2aWdhdGlvblN0YXJ0LFxuICAgIFJvdXRlLFxuICAgIFJvdXRlclxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICcuLi91dGlscy9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuXG4vKipcbiAqIEJhc2ljIHdyYXBwZXIgYXJvdW5kIEFuZ3VsYXIncyBST1VURSBzZXJ2aWNlIHRvIHNpbXBsaWZ5IHRlbXBvcmFyeSBzdGF0ZSBjYWNoaW5nIGFzIHdlbGxcbiAqIG5hdmlnYXRpb24uIFRoaXMgc2VydmljZSBsaXN0ZW4gZm9yIFJvdXRpbmcgZXZlbnRzIHN1Y2ggYXMgTmF2aWdhdGlvblN0YXJ0IGFzIHdlbGwsXG4gKiBOYXZpZ2F0aW9uRW5kcyBhbmQgd2hlbiB0aGUgcm91dGluZyBFbnRlcnMsIFdlIGNoZWNrIGlmIHRoZXJlIGFueSBzdGF0ZSB3aGljaCBuZWVkcyB0byBiZSBjYWNoZWRcbiAqIGlmIHllcyB0aGVuIHdlIHNhdmUgaXQgaW50byB0aGUgc3RhdGVDYWNoZUhpc3Rvcnkgd2hpY2ggbWFwcyBmaW5hbCBVUkwgdG8gdGhlIGFjdHVhbCBTVEFURVxuICogb2JqZWN0LCBhbmQgd2hlbiB3ZSBhcmUgbmF2aWdhdGUgYmFjayB0byB0aGUgc2FtZSBVUkwgV2UgY2hlY2sgaWYgdGhlcmUgaXMgYW55IHNhdmVkIHN0YXRlLlxuICpcbiAqIFRoaXMgc2VydmljZSB3YXMgb3JpZ2luYWxseSBjcmVhdGVkIGFzIGEgcmVzcG9uc2UgdGhhdCBhbmd1bGFyIGFsd2F5cyBkZXN0cm95ZXMgYW5kIHJlY3JlYXRlc1xuICogY29tcG9uZW50cyB3aGVuIG5hdmlnYXRpbmcgYXdheXMgYW5kIHRoZW4gYmFjayB0byBpdC4gQnkgYSBvZiBhbmd1bGFyIDQuMi4wKyB0aGlzIG1pZ2h0IGJlXG4gKiBvYnNvbGV0ZS5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb3V0aW5nU2VydmljZVxue1xuICAgIC8qKlxuICAgICAqIFN0YWNrIGtlZXBpbmcgYWN0aXZlIFJvdXRlcyBzbyB3ZSBjYW4gZ28gYmFjay9yZWRpcmVjdCBiYWNrXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJvdXRpbmdTdGF0ZTogRXZlbnRbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogVGVtcG9yYXJ5IGZpZWxkIGhvbGRpbmcgYSBzdGF0ZSBPYmplY3Qgb2YgdHlwZSBUIGJlZm9yZSBpdHMgc2F2ZWQgaW50byBzdGF0ZUNhY2hlSGlzdG9yeSxcbiAgICAgKiBhbmQgcmV0cmlldmVkIHdoZW4gZ2V0dGluZyBiYWNrIGZyb20gU3RhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGN1cnJlbnRTdGF0ZUZyb206IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogVGVtcG9yYXJ5IGZpZWxkIGhvbGRpbmcgYSBzdGF0ZSBPYmplY3Qgb2YgdHlwZSBUIGJlZm9yZSBpdHMgc2F2ZWQgaW50byBzdGF0ZUNhY2hlSGlzdG9yeSxcbiAgICAgKiBhbmQgcmV0cmlldmVkIHdoZW4gZ2V0dGluZyB0byBTdGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgY3VycmVudFN0YXRlVG86IGFueTtcblxuICAgIC8qXG4gICAgICogRXZlbnQgb2JqZWN0IGZvciByZWdpc3RlcmluZyBsaXN0ZW5lcnMgdG8gc2F2ZSBhIGNlcnRhaW4gc3RhdGUgYXMgd2VsbCBhcyBicm9hZGNhc3RpbmcgYmFja1xuICAgICAqIHdoZW4gc3RhdGUgbmVlZHMgdG8gYmUgcmV0cmlldmVkIGJhY2sgdG8gdGhlIFBhZ2VcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRlQ2FjaGU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBpcyBvdXIgY2FjaGUgd2hpY2ggbWFwcyBVUkwgPT4gdG8gPSA+U1RBVEUuIEFueSBwYWdlIGNhbiBzYXZlIGFueSBzdGF0ZSB1c2luZ1xuICAgICAqIG9ic2VydmFibGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgcmV0cmlldmVkIGJhY2suXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0ZUNhY2hlSGlzdG9yeTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlcilcbiAgICB7XG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5zdWJzY3JpYmVUb1JvdXRpbmdFdmVudHMoZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEhlcmUgaXMgdGhlIG1haW4gcm91dGluZyBsb2dpYyB0aGF0IHByb2Nlc2VzIGV2ZXJ5IHJvdXRpbmcgZXZlbnRzLlxuICAgICAqXG4gICAgICovXG4gICAgc3Vic2NyaWJlVG9Sb3V0aW5nRXZlbnRzKGV2ZW50OiBFdmVudCk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICAgICAgbGV0IHVybCA9IGV2ZW50LnVybDtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlQ2FjaGVIaXN0b3J5Lmhhcyh1cmwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlLm5leHQodGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5nZXQodXJsKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5kZWxldGUodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm91dGluZ1N0YXRlLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG5cbiAgICAgICAgICAgIGxldCBpdGVtQmVmb3JlUm91dGUgPSBMaXN0V3JhcHBlci5sYXN0PEV2ZW50Pih0aGlzLnJvdXRpbmdTdGF0ZSk7XG5cblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmN1cnJlbnRTdGF0ZUZyb20pICYmIGlzUHJlc2VudChpdGVtQmVmb3JlUm91dGUpICYmIGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVGcm9tKSAmJiBpdGVtQmVmb3JlUm91dGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8XG4gICAgICAgICAgICAgICAgaXRlbUJlZm9yZVJvdXRlIGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2FjaGVIaXN0b3J5LnNldChpdGVtQmVmb3JlUm91dGUudXJsLCB0aGlzLmN1cnJlbnRTdGF0ZUZyb20pO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRnJvbSA9IG51bGw7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMuY3VycmVudFN0YXRlVG8pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5zZXQoZXZlbnQudXJsLCB0aGlzLmN1cnJlbnRTdGF0ZVRvKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZVRvID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlbmllbnQgR08gQkFDSyBtZXRob2QuIHdoaWNoIHRha2VzIHlvdSB0byBwcmV2aW91cyByb3V0ZSBhbG9uZyB3aXRoIHRoZSBVUkwgY2hhbmdlLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBnb0JhY2sobnVtT2ZTdGVwczogbnVtYmVyID0gMSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIHdlIGFyZSBzdGFydGluZyBmcm9tIC0xIGFzIHdlIG5lZWQgdG8gYWxzbyByZW1vdmUgY3VycmVudCByb3V0ZVxuICAgICAgICBsZXQgc3RlcHMgPSAtMTtcbiAgICAgICAgbGV0IG5hdmlnYXRlVXJsID0gJy80MDQnO1xuICAgICAgICB3aGlsZSAoc3RlcHMgIT09IG51bU9mU3RlcHMpIHtcbiAgICAgICAgICAgIGxldCBwb3BTdGF0ZSA9IHRoaXMucm91dGluZ1N0YXRlLnBvcCgpO1xuICAgICAgICAgICAgaWYgKHBvcFN0YXRlIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCB8fCBwb3BTdGF0ZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuICAgICAgICAgICAgICAgIG5hdmlnYXRlVXJsID0gcG9wU3RhdGUudXJsO1xuICAgICAgICAgICAgICAgIHN0ZXBzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKG5hdmlnYXRlVXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gbmF2aWdhdGluZyB0byBhIG5ldyBQYWdlIHlvdSBjYW4gdXNlIGRpcmVjdGx5IHJvdXRlciBvciBpZiB5b3Ugd2FudCB0byByZW1lbWJlciBzb21lXG4gICAgICogc3RhdGUgdG5lIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKi9cbiAgICBuYXZpZ2F0ZTxUPihjb21tYW5kczogYW55W10sIHN0YXRlPzogVCwgZXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRnJvbSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShjb21tYW5kcywgZXh0cmFzKTtcblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gbmF2aWdhdGluZyB0byBhIG5ldyBQYWdlIHlvdSBjYW4gdXNlIGRpcmVjdGx5IHJvdXRlciBvciBpZiB5b3Ugd2FudCB0byByZW1lbWJlciBzb21lXG4gICAgICogc3RhdGUgdG5lIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKi9cbiAgICBuYXZpZ2F0ZVdpdGhSb3V0ZTxUPihyb3V0ZTogUm91dGUsIHBhcmFtcz86IGFueSwgc3RhdGU/OiBULCBleHRyYXM/OiBOYXZpZ2F0aW9uRXh0cmFzKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVUbyA9IHN0YXRlO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGUucGF0aCwgcGFyYW1zXSwgZXh0cmFzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEVudHJ5IG1ldGhvZCBmb3IgYnJvYWRjYXN0aW5nIHN0YXRlQ2FjaGUgYW5kIHNlbmRpbmcgc2F2ZWQgU3RhdGUgYmFjayB0byB0aGUgcGFnZVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBiaW5kU3RhdGVDYWNoZTxUPihsaXN0ZW5lcjogKGl0ZW06IFQpID0+IHZvaWQpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnN0YXRlQ2FjaGUuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChzdGF0ZUl0ZW06IFQpID0+IGxpc3RlbmVyKHN0YXRlSXRlbSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIHNvIGNoZWNrIGV4dHJhIHBhcmFtZXRlcnMgd2hpY2ggYXJlIHBhc3NlZCB1c2luZyBNYXRyaXggbm90YXRpb25cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgb3BlcmF0aW9uKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IG9wZXJhdGlvbiA9IHJvdXRlLnNuYXBzaG90LnBhcmFtc1snbyddO1xuICAgICAgICByZXR1cm4gaXNCbGFuayhcbiAgICAgICAgICAgIG9wZXJhdGlvbikgfHwgKG9wZXJhdGlvbiAhPT0gJ3ZpZXcnICYmIG9wZXJhdGlvbiAhPT0gJ2NyZWF0ZScgJiYgb3BlcmF0aW9uICE9PSAnZWRpdCcpXG4gICAgICAgICAgICA/ICd2aWV3JyA6IG9wZXJhdGlvbjtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFzc2VtYmxlcyBhIHBhdGggYmFzZWQgb24gdGhlIGN1cnJlbnQgcm91dGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBwYXRoRm9yUGFnZShwYWdlTmFtZTogc3RyaW5nLCBwYXRoTmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3QudXJsfS8ke3BhdGhOYW1lfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWFyY2ggdG9wIGxldmVsIHJvdXRlcyBhbmQgcmV0dXJuIFJvdXRlIHRoYXQgaGFzIGNvbXBvbmVudCBuYW1lIGVxdWFsIHRvIHBhZ2VOYW1lXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHJvdXRlRm9yUGFnZShwYWdlTmFtZTogc3RyaW5nLCBwYXRoTmFtZT86IHN0cmluZywgYWN0aXZhdGVkUGF0aD86IHN0cmluZyk6IFJvdXRlXG4gICAge1xuICAgICAgICBsZXQgbmV4dFJvdXRlOiBhbnk7XG4gICAgICAgIC8vIHdlIG5lZWQgdGhpcyBhcyB3ZSBuZWVkIHRvIGxvb2t1cCBpZiB0aGVyZSBpcyBhbnkgcm91dGUgd2l0aCBnaXZlbiBwYWdlTmFtZSBhc1xuICAgICAgICAvLyBjaGlsZCByb3V0ZSwgaWYgbm90IHNlYXJjaCBmb3IgZ2xvYmFsIG9uY2VzXG5cbiAgICAgICAgbGV0IG5vcm1hbGl6ZWRQYXRoID0gYWN0aXZhdGVkUGF0aC5pbmRleE9mKCcvJykgPT09IDAgPyBhY3RpdmF0ZWRQYXRoLnN1YnN0cmluZygxKSA6XG4gICAgICAgICAgICBhY3RpdmF0ZWRQYXRoO1xuXG4gICAgICAgIGxldCBjdXJyZW50Um91dGU6IFJvdXRlID0gdGhpcy5yb3V0ZXIuY29uZmlnLmZpbmQoKHI6IFJvdXRlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCByb3V0ZVBhdGggPSByLnBhdGguaW5kZXhPZignLycpID09PSAwID8gci5wYXRoLnN1YnN0cmluZygxKSA6XG4gICAgICAgICAgICAgICAgICAgIHIucGF0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KG5vcm1hbGl6ZWRQYXRoKSAmJiBub3JtYWxpemVkUGF0aCA9PT0gcm91dGVQYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHRyeSB0byBtYXRjaCB0aGUgcGF0aCBhbmQgZXhwZWN0ZWQgcGFnZU5hbWVcbiAgICAgICAgaWYgKGlzUHJlc2VudChwYXRoTmFtZSkgJiYgaXNQcmVzZW50KGN1cnJlbnRSb3V0ZSkgJiYgY3VycmVudFJvdXRlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgbmV4dFJvdXRlID0gY3VycmVudFJvdXRlLmNoaWxkcmVuLmZpbmQoKHI6IFJvdXRlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnROYW1lID0gci5jb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGhOYW1lID09PSByLnBhdGggJiYgcGFnZU5hbWUgPT09IGNvbXBvbmVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQocGFnZU5hbWUpKSB7XG5cbiAgICAgICAgICAgIG5leHRSb3V0ZSA9IHRoaXMucm91dGVyLmNvbmZpZy5maW5kKChyOiBSb3V0ZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50TmFtZSA9IHIuY29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoTmFtZSA9PT0gci5wYXRoICYmIHBhZ2VOYW1lID09PSBjb21wb25lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGF0aCBub3QgZm91bmQgdGhlbiBjaGVjayBvbmx5IGlmIHdlIGZpbmQgYW55d2hlcmUgaW4gdGhlIHBhdGggcGFnZU5hZVxuICAgICAgICBpZiAoaXNCbGFuayhuZXh0Um91dGUpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5jb25maWcuZm9yRWFjaCgocjogUm91dGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChyLmNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudE5hbWUgPSByLmNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VOYW1lID09PSBjb21wb25lbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0Um91dGUgPSByO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHRSb3V0ZTtcbiAgICB9XG5cbn1cblxuXG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBOb3RpZmljYXRpb25zIHNlcnZpY2UgaXMgYSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgcHVibGlzaC9zdWJzY3JpYmUgZXZlbnQgYnVzIGZvciBwdWJsaXNoaW5nXG4gKiBhbmQgbGlzdGVuaW5nIGZvciBhcHBsaWNhdGlvbiBsZXZlbCBldmVudHMuXG4gKlxuICogVG8gc3Vic2NyaWJlIHRvIHNwZWNpZmljIGV2ZW50IGUuZy4gVXNlciBMb2dnZWQgSW4gd2hlcmUgdG9waWMgaXMgY2FsbGVkIHVzZXI6c2lnbmVkSW5cbiAqXG4gKlxuICogYGBgdHNcbiAqXG4gKiAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgIHNlbGVjdG9yOiAnbXktY29tcCcsXG4gKiAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgSGVsbG9cbiAqICAgICAgICAgICAgIGBcbiAqICAgICB9KVxuICogICAgIGNsYXNzIE15Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95XG4gKiAgICAge1xuICpcbiAqICAgICAgICBzdWJzY3I6IFN1YnNjcmlwdGlvbjtcbiAqXG4gKiAgICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9ucykge1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLnN1YnNjciA9IG5vdGlmaWNhdGlvbnMuc3Vic2NyaWJlKCd1c2VyOnNpZ25lZEluJywgKG1lc3NhZ2U6IGFueSkgPT5cbiAqICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgIC8vIGxvYWQgdXNlciBwcm9maWxlXG4gKiAgICAgICAgICAgICAgfSk7XG4gKiAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICAgICB0aGlzLnN1YnNjci51bnN1YnNjcmliZSgpO1xuICogICAgICAgICAgfVxuICpcbiAqXG4gKlxuICogICAgIH1cbiAqXG4gKlxuICogYGBgXG4gKlxuICogVG8gcHVibGlzaCBldmVudDpcbiAqXG4gKiBgYGBcbiAqICAgICBsZXQgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uO1xuICogICAgIG5vdGlmaWNhdGlvbnMucHVibGlzaCgndXNlcjpzaWduZWRJbicsICdVc2VyIGp1c3Qgc2lnbmVkIGluJyk7XG4gKlxuICogYGBgXG4gKlxuICogWW91IGNhbiBjcmVhdGUgYW5kIGxpc3RlbiBmb3IgeW91ciBvd24gYXBwbGljYXRpb24gbGV2ZWwgZXZlbnRzIG9yIHlvdSBjYW4gYWxzbyBsaXN0ZW4gZm9yIGFsbFxuICogdGhlIHRvcGljcyBpbiB0aGUgYXBwbGljYXRpb24gaWYgeW91IHVzZSAgYCpgIGFzIGFwcGxpY2F0aW9uIHRvcGljXG4gKlxuICogVW5zdWJzY3JpYmluZyBpcyByZXNwb25zaWJpbGl0eSAgb2YgZWFjaCBzdWJzY3JpYmVyXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uc1xue1xuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGlzIGlzIHVzZWQgYXMgYSB0b3BpYyBzdWJzY3JpYmVyIHJlY2VpdmVzIGFsbCBtZXNzYWdlc1xuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IEFsbFRvcGljcyA9ICcqJztcblxuICAgIC8qKlxuICAgICAqIE9ic2VydmFibGUgdXNlZCB0byBwdWJsaXNoIGFuZCBzdWJzY3JpYmUgdG8gYXBwbGljYXRpb24gbGV2ZWwgZXZlbnRzXG4gICAgICovXG4gICAgcHJpdmF0ZSBldmVudHM6IFN1YmplY3Q8TWVzc2FnZT47XG5cblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IFN1YmplY3Q8TWVzc2FnZT4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFN1YnNjcmliZSB0byBzcGVjaWZpYyBsaXN0ZW5lciBiYXNlZCBvbiBnaXZlbiB0b3BpYy5cbiAgICAgKlxuICAgICAqL1xuICAgIHN1YnNjcmliZSh0b3BpYzogc3RyaW5nLCBzdWJzY3JpYmVyOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvblxuICAgIHtcbiAgICAgICAgY29uc3QgdG9BbGwgPSBOb3RpZmljYXRpb25zLkFsbFRvcGljcztcblxuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihtc2cgPT4gbXNnLnRvcGljID09PSB0b3BpYyB8fCB0b3BpYyA9PT0gdG9BbGwpLFxuICAgICAgICAgICAgbWFwKChtc2c6IE1lc3NhZ2UpID0+IG1zZy5jb250ZW50KVxuXG4gICAgICAgICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUHVibGlzaCBuZXcgZXZlbnQgdG8gYSB0b3BpY1xuICAgICAqXG4gICAgICovXG4gICAgcHVibGlzaCh0b3BpYzogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgbXNnOiBNZXNzYWdlID0ge3RvcGljOiB0b3BpYywgY29udGVudDogbWVzc2FnZX07XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobXNnKTtcblxuICAgIH1cblxufVxuXG4vKipcbiAqXG4gKiBCYXNlIGNsYXNzIGZvciBnZW5lcmljIG1lc3NhZ2VcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZVxue1xuICAgIHRvcGljOiBzdHJpbmc7XG4gICAgY29udGVudDogYW55O1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtFcnJvckhhbmRsZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zfSBmcm9tICcuL21lc3NhZ2luZy9ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJy4vdXRpbHMvbGFuZyc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbEVycm9ySGFuZGxlciBleHRlbmRzIEVycm9ySGFuZGxlclxue1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvbnM/OiBOb3RpZmljYXRpb25zKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVFcnJvcihlcnJvcjogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm5vdGlmaWNhdGlvbnMpKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMucHVibGlzaCgnYXBwOmVycm9yJywgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGUsIFJvdXRlc30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Tm90Rm91bmRDb21wb25lbnR9IGZyb20gJy4vbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQnO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7cGF0aDogJ25vdC1mb3VuZCcsIGNvbXBvbmVudDogTm90Rm91bmRDb21wb25lbnR9XG5dO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxuICAgIF0sXG4gICAgZXhwb3J0czogW1JvdXRlck1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBcmliYUNvcmVSb3V0aW5nTW9kdWxlXG57XG59XG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgSHR0cEVycm9yUmVzcG9uc2UsXG4gICAgSHR0cEV2ZW50LFxuICAgIEh0dHBIYW5kbGVyLFxuICAgIEh0dHBJbnRlcmNlcHRvcixcbiAgICBIdHRwUmVxdWVzdCxcbiAgICBIdHRwUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dGhyb3dFcnJvciBhcyBvYnNlcnZhYmxlVGhyb3dFcnJvciwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4uL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBpc1N0cmluZ30gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi9kb21haW4vcmVzb3VyY2Uuc2VydmljZSc7XG5cblxuLyoqXG4gKiBUeXBlZCBpbnRlcmZhY2VkIHRvIHByb2Nlc3MgZWFzaWVyIHJvdXRlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vY2tSb3V0ZXNcbntcbiAgICByZXNvdXJjZTogc3RyaW5nO1xuICAgIHJvdXRlczogTW9ja1JvdXRlW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1vY2tSb3V0ZVxue1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICByZXNwb25zZUNvZGU6IG51bWJlcjtcbiAgICByZXNwb25zZVRleHQ6IHN0cmluZztcbiAgICBkYXRhOiBhbnkgfCBudWxsO1xufVxuXG4vKipcbiAqIEludGVyY2VwdG9yIHByb3ZpZGluZyBNb2NrIFNlcnZlciBmdW5jdGlvbmFsaXR5IGFuZCBpcyBpbnNlcnRlZCBvbmx5IGFuZCBpZiBtb2NrIHNlcnZlciBpc1xuICogZW5hYmxlZCB1c2luZyBBcHBDb25maWcncyBjb25uZWN0aW9uLm1vY2stc2VydmVyLmVuYWJsZWQgYm9vdHN0cmFwIHByb3BlcnR5XG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBNb2NrSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3JcbntcblxuICAgIC8qKlxuICAgICAqIFN0b3JlcyBsb2FkZWQgcm91dGVzIGJ5IGdpdmVuIGVudGl0eSBuYW1lLlxuICAgICAqXG4gICAgICovXG4gICAgcm91dGVzQnlFbnRpdHk6IE1hcDxzdHJpbmcsIE1vY2tSb3V0ZVtdPiA9IG5ldyBNYXA8c3RyaW5nLCBNb2NrUm91dGVbXT4oKTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBDb25maWc6IEFwcENvbmZpZylcbiAgICB7XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZiByb3V0ZSBpcyBmb3VuZCByZXR1cm5lZCBNb2NrIHJlc3VsZWQgZGVmaW5lZCBpbiB0aGUgSlNPTiBmaWxlcywgb3RoZXJ3aXNlIHBhc3NcbiAgICAgKiB0aGUgcmVxdWVzdCB0byB0aGUgbmV4dCBpbnRlcmNlcHRvci5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PlxuICAgIHtcblxuICAgICAgICBsZXQgbW9ja2VkUmVzcCA9IHRoaXMubWFrZVJlcyhyZXEpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQobW9ja2VkUmVzcCkpIHtcblxuICAgICAgICAgICAgaWYgKG1vY2tlZFJlc3Auc3RhdHVzID49IDIwMCAmJiBtb2NrZWRSZXNwLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoPEh0dHBSZXNwb25zZTxhbnk+Pm1vY2tlZFJlc3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJycm9yID0gbmV3IEh0dHBFcnJvclJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG1vY2tlZFJlc3AuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBtb2NrZWRSZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogbW9ja2VkUmVzcC5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHJlcS51cmxXaXRoUGFyYW1zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJycm9yKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiB1c2VyIGNvbmZpZ3VyYXRpb24gd2UgbG9hZCBhbGwgdGhlIGF2YWlsYWJsZSByb3V0ZXMgYW5kIHJlZ2lzdGVyIHRoZW0gaW50b1xuICAgICAqIGB0aGlzLnJvdXRlc0J5RW50aXR5YFxuICAgICAqXG4gICAgICovXG4gICAgbG9hZFJvdXRlcygpXG4gICAge1xuICAgICAgICBsZXQgcm91dGVzOiBzdHJpbmdbXSA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQ29ubmVjdGlvbk1vY2tTZXJ2ZXJSb3V0ZXMpO1xuICAgICAgICBmb3IgKGxldCByb3V0ZU5hbWUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICBsZXQgcmVxOiBIdHRwUmVxdWVzdDxhbnk+ID0gdGhpcy5tYWtlUmVxKHJvdXRlTmFtZSk7XG5cbiAgICAgICAgICAgIC8vIGxldCdzIG1ha2UgcXVpY2sgYW5kIGRpcnR5IGFzeW5jIGNhbGwgdG8gbG9hZCBvdXIgcm91dGVzIGJlZm9yZSBhbnl0aGluZyBlbHNlXG4gICAgICAgICAgICBsZXQgbW9ja2VkOiBNb2NrUm91dGVzID0gdGhpcy5yZXF1ZXN0Rm9yUm91dGVzKHJlcSk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlc0J5RW50aXR5LnNldChtb2NrZWQucmVzb3VyY2UsIG1vY2tlZC5yb3V0ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybnMgY29uZmlndXJhdGlvbiBiYXNlZCBvbiBtb2NrIEpTT04gZmlsZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlcXVlc3RGb3JSb3V0ZXMocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogTW9ja1JvdXRlc1xuICAgIHtcblxuICAgICAgICBsZXQgeG1sSHR0cFJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cbiAgICAgICAgeG1sSHR0cFJlcS5vcGVuKHJlcS5tZXRob2QsIHJlcS51cmxXaXRoUGFyYW1zLCBmYWxzZSk7XG5cbiAgICAgICAgcmVxLmhlYWRlcnMua2V5cygpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgYWxsID0gcmVxLmhlYWRlcnMuZ2V0QWxsKGtleSk7XG4gICAgICAgICAgICB4bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgYWxsLmpvaW4oJywnKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB4bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcbiAgICAgICAgeG1sSHR0cFJlcS5zZW5kKG51bGwpO1xuXG5cbiAgICAgICAgbGV0IGJvZHkgPSBpc0JsYW5rKHhtbEh0dHBSZXEucmVzcG9uc2UpID8geG1sSHR0cFJlcS5yZXNwb25zZVRleHQgOlxuICAgICAgICAgICAgeG1sSHR0cFJlcS5yZXNwb25zZTtcblxuICAgICAgICBpZiAoeG1sSHR0cFJlcS5zdGF0dXMgPCAyMDAgJiYgeG1sSHR0cFJlcS5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIE1vY2sgc2VydmVyIGNvbmZpZ3VyYXRpb24uIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB5b3UnICtcbiAgICAgICAgICAgICAgICAnIGhhdmUgYSBtb2NrLXJvdXRpbmcvIGZvbGRlciB1bmRlciB5b3VyIGFzc2V0cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzU3RyaW5nKGJvZHkpID8gSlNPTi5wYXJzZShib2R5KSA6IGJvZHk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENyZWF0ZSBhIHJlcXVlc3RzIHRvIGxvYWQgcm91dGVzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG1ha2VSZXEocm91dGVOYW1lOiBzdHJpbmcpOiBIdHRwUmVxdWVzdDxhbnk+XG4gICAge1xuICAgICAgICBsZXQgYXNzZXRGb2xkZXI6IHN0cmluZyA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQXNzZXRGb2xkZXIpO1xuICAgICAgICBsZXQgcGF0aDogc3RyaW5nID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5Db25uZWN0aW9uTW9ja1NlcnZlclBhdGgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3QoJ0dFVCcsIGAke2Fzc2V0Rm9sZGVyfSR7cGF0aH0vJHtyb3V0ZU5hbWV9Lmpzb25gLCB7XG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJ1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiB3ZSBhcmUgY3JlYXRpbmcgYSByZXNwb25zZSB3ZSBhbHdheXMgZXhwZWN0IHR3byB0aGluZ3M6XG4gICAgICogMSkgV2UgYXJlIGRlYWxpbmcgd2l0aCBFbnRpdHlcbiAgICAgKiAyKSBSRVNUIEFQSSBpcyBoYW5kbGVkIHVzaW5nIFJlc291cmNlIHdoaWNoIHByZXBlbmQgL21vY2tlZC9cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZVJlcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBIdHRwUmVzcG9uc2U8YW55PlxuICAgIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlT3A6IEh0dHBSZXNwb25zZTxhbnk+O1xuXG4gICAgICAgIGxldCBwYXRoID0gcmVxLnVybFdpdGhQYXJhbXMuc3Vic3RyaW5nKHJlcS51cmwuaW5kZXhPZignbW9ja2VkJykgKyA2KTtcbiAgICAgICAgbGV0IHJlc291cmNlID0gcGF0aC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIGlmIChyZXNvdXJjZS5pbmRleE9mKCcvJykgIT09IC0xKSB7XG4gICAgICAgICAgICByZXNvdXJjZSA9IHJlc291cmNlLnN1YnN0cmluZygwLCByZXNvdXJjZS5pbmRleE9mKCcvJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm91dGVzQnlFbnRpdHkuaGFzKHJlc291cmNlKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VPcCA9IHRoaXMuZG9IYW5kbGVSZXF1ZXN0KHJlcSwgcGF0aCwgcmVzb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsocmVzcG9uc2VPcCkgJiYgdGhpcy5hcHBDb25maWcuZ2V0Qm9vbGVhbihBcHBDb25maWcuSW5UZXN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIGJvZHk6IHt9LCBzdGF0dXM6IDQwNCwgc3RhdHVzVGV4dDogJ05vdCBGb3VuZCcsXG4gICAgICAgICAgICAgICAgdXJsOiByZXEudXJsV2l0aFBhcmFtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlT3A7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoaXMgd2lsbCBnZXQgdGhlIGNvbnRlbnQgZnJvbSB0aGUgcm91dGVzIC0+IHJvdXRlIGFzIGl0IGFzIGFuZCByZXR1cm4gaXQgYXMgYVxuICAgICAqIHJlc3BvbnNlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGRvSGFuZGxlUmVxdWVzdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHBhdGg6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZTogc3RyaW5nKTogSHR0cFJlc3BvbnNlPGFueT5cbiAgICB7XG4gICAgICAgIGxldCByb3V0ZXM6IE1vY2tSb3V0ZVtdID0gdGhpcy5yb3V0ZXNCeUVudGl0eS5nZXQocmVzb3VyY2UpO1xuXG4gICAgICAgIGxldCBtYXRjaGVkUm91dGUgPSByb3V0ZXMuZmluZEluZGV4KChlbDogTW9ja1JvdXRlKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSBlbC5tZXRob2QudG9Mb3dlckNhc2UoKSAmJiBlbC5wYXRoID09PSBwYXRoO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWF0Y2hlZFJvdXRlICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IHJvdXRlOiBNb2NrUm91dGUgPSByb3V0ZXNbbWF0Y2hlZFJvdXRlXTtcblxuICAgICAgICAgICAgbGV0IHBheWxvYWQ6IFJlc3BvbnNlPGFueT4gPSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZDogIHJvdXRlLmRhdGFcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlc3BvbnNlPFJlc3BvbnNlPGFueT4+KHtcbiAgICAgICAgICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcm91dGUucmVzcG9uc2VDb2RlLFxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHJvdXRlLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgICAgICB1cmw6IHJvdXRlLnBhdGhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgSHR0cEhhbmRsZXIgc28gd2UgY2FuIGhhdmUgY3VzdG9tIGJlaGF2aW9yIHRvIEhUVFBDbGllbnRcbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tJbnRlcmNlcHRvckhhbmRsZXIgaW1wbGVtZW50cyBIdHRwSGFuZGxlclxue1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV4dDogSHR0cEhhbmRsZXIsIHByaXZhdGUgaW50ZXJjZXB0b3I6IEh0dHBJbnRlcmNlcHRvcilcbiAgICB7XG4gICAgfVxuXG4gICAgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcmNlcHRvci5pbnRlcmNlcHQocmVxLCB0aGlzLm5leHQpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TWV0YSwgVGl0bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcbiAgICBBUFBfSU5JVElBTElaRVIsXG4gICAgRXJyb3JIYW5kbGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbmplY3RvcixcbiAgICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICAgIE5nTW9kdWxlLFxuICAgIE9wdGlvbmFsLFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBIVFRQX0lOVEVSQ0VQVE9SUyxcbiAgICBIdHRwQmFja2VuZCxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEh0dHBIYW5kbGVyLFxuICAgIEh0dHBJbnRlcmNlcHRvclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7QXBwQ29uZmlnLCBtYWtlQ29uZmlnfSBmcm9tICcuL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJy4vY29uZmlnL2Vudmlyb25tZW50JztcbmltcG9ydCB7Tm90Rm91bmRDb21wb25lbnR9IGZyb20gJy4vbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQnO1xuaW1wb3J0IHtSb3V0aW5nU2VydmljZX0gZnJvbSAnLi9yb3V0aW5nL3JvdXRpbmcuc2VydmljZSc7XG5pbXBvcnQge0dsb2JhbEVycm9ySGFuZGxlcn0gZnJvbSAnLi9nbG9iYWwtZXJyb3ItaGFuZGxlcic7XG5pbXBvcnQge0FyaWJhQ29yZVJvdXRpbmdNb2R1bGV9IGZyb20gJy4vYXJpYmEtY29yZS1yb3V0aW5nLm1vZHVsZSc7XG5pbXBvcnQge05vdGlmaWNhdGlvbnN9IGZyb20gJy4vbWVzc2FnaW5nL25vdGlmaWNhdGlvbnMuc2VydmljZSc7XG5pbXBvcnQge0h0dHBNb2NrSW50ZXJjZXB0b3IsIE1vY2tJbnRlcmNlcHRvckhhbmRsZXJ9IGZyb20gJy4vaHR0cC9odHRwLW1vY2staW50ZXJjZXB0b3InO1xuaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi9kb21haW4vcmVzb3VyY2Uuc2VydmljZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGNvbnN0IFVzZXJDb25maWcgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignVXNlckNvbmZpZycpO1xuXG5cbi8qKlxuICogQ29yZSBtb2RlIGluY2x1ZGVzIGFsbCBzaGFyZWQgbG9naWMgYWNjcm9zcyB3aG9sZSBhcHBsaWNhdGlvblxuICovXG4gICAgLy8gdG9kbzogZm9yIEFPVCB1c2UgZXhwb3J0ZWQgZnVuY3Rpb25zIGZvciBmYWN0b3JpZXMgaW5zdGVhZHMgdGhpcyBpbmxpbmUgb25lcy5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIEFyaWJhQ29yZVJvdXRpbmdNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW05vdEZvdW5kQ29tcG9uZW50XSxcblxuICAgIGJvb3RzdHJhcDogW11cblxufSlcbmV4cG9ydCBjbGFzcyBBcmliYUNvcmVNb2R1bGUge1xuXG4gICAgc3RhdGljIGZvclJvb3QoY29uZmlnOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBcmliYUNvcmVNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBUaXRsZSxcbiAgICAgICAgICAgICAgICBNZXRhLFxuICAgICAgICAgICAgICAgIEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMsXG4gICAgICAgICAgICAgICAgSHR0cE1vY2tJbnRlcmNlcHRvcixcblxuICAgICAgICAgICAgICAgIFJlc291cmNlLFxuXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IFVzZXJDb25maWcsIHVzZVZhbHVlOiBjb25maWd9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogQXBwQ29uZmlnLCB1c2VGYWN0b3J5OiBtYWtlQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbVXNlckNvbmZpZywgSW5qZWN0b3IsIEVudmlyb25tZW50XVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBIdHRwSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogbWFrZUh0dHBDbGllbnRIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBIdHRwQmFja2VuZCwgQXBwQ29uZmlnLCBIdHRwTW9ja0ludGVyY2VwdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgW25ldyBPcHRpb25hbCgpLCBuZXcgSW5qZWN0KEhUVFBfSU5URVJDRVBUT1JTKV1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlQ2xhc3M6IEdsb2JhbEVycm9ySGFuZGxlciwgZGVwczogW05vdGlmaWNhdGlvbnNdfSxcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogUm91dGluZ1NlcnZpY2UsIHVzZUNsYXNzOiBSb3V0aW5nU2VydmljZSwgZGVwczogW1JvdXRlcl19XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IEFyaWJhQ29yZU1vZHVsZSwgcHJpdmF0ZSBjb25mOiBBcHBDb25maWcpIHtcblxuICAgIH1cblxufVxuXG5cbi8qKlxuICpcbiAqIEFkZCBjdXN0b20gTW9jayBmdW5jdGlvbmFsaXR5IG9ubHkgYW5kIGlmIHdlIGVuYWJsZWQgdGhpcyBpbiB0aGUgc2V0dGluZ3MuIEkgZG9udCByZWFsbHkgd2FudCB0b1xuICogaGF2ZSBOb29wSW50ZXJjZXB0ZXIgaW4gdGhlIGNoYWluXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZUh0dHBDbGllbnRIYW5kbGVyKG5nQmFja2VuZDogSHR0cEJhY2tlbmQsIGNvbmZpZzogQXBwQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2NrSW50ZXJjZXB0b3I6IEh0dHBNb2NrSW50ZXJjZXB0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVyY2VwdG9yczogSHR0cEludGVyY2VwdG9yW10gfCBudWxsID0gW10pOiBIdHRwSGFuZGxlciB7XG4gICAgaWYgKGNvbmZpZy5nZXRCb29sZWFuKEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlcikpIHtcblxuICAgICAgICBtb2NrSW50ZXJjZXB0b3IubG9hZFJvdXRlcygpO1xuICAgICAgICBpbnRlcmNlcHRvcnMgPSBbLi4uaW50ZXJjZXB0b3JzLCBtb2NrSW50ZXJjZXB0b3JdO1xuICAgIH1cblxuICAgIGlmICghaW50ZXJjZXB0b3JzKSB7XG4gICAgICAgIHJldHVybiBuZ0JhY2tlbmQ7XG4gICAgfVxuICAgIHJldHVybiBpbnRlcmNlcHRvcnMucmVkdWNlUmlnaHQoXG4gICAgICAgIChuZXh0LCBpbnRlcmNlcHRvcikgPT4gbmV3IE1vY2tJbnRlcmNlcHRvckhhbmRsZXIobmV4dCwgaW50ZXJjZXB0b3IpLCBuZ0JhY2tlbmQpO1xufVxuXG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0ICogYXMgb2JqZWN0UGF0aCBmcm9tICdvYmplY3QtcGF0aCc7XG5pbXBvcnQge2lzQmxhbmssIGlzU3RyaW5nLCBpc1N0cmluZ01hcH0gZnJvbSAnLi9sYW5nJztcblxuXG4vKipcbiAqIFRoZSBGaWVsZFBhdGggaXMgdXRpbGl0eSBjbGFzcyBmb3IgcmVwcmVzZW50aW5nIG9mIGEgZG90dGVkIGZpZWxkUGF0aC5cbiAqXG4gKiBBIFN0cmluZyBzdWNoIGFzIFwiZm9vLmJhci5iYXpcIiBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgYSB2YWx1ZSBvbiBhIHRhcmdldCBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRmllbGRQYXRoXG57XG4gICAgX2ZpZWxkUGF0aHM6IHN0cmluZ1tdO1xuICAgIHByaXZhdGUgb2JqZWN0UGF0aEluc3RhbmNlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNldHMgYSB2YWx1ZSB0byB0YXJnZXQgb2JqZWN0c1xuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHNldEZpZWxkVmFsdWUodGFyZ2V0OiBhbnksIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgZnAgPSBuZXcgRmllbGRQYXRoKGZpZWxkKTtcbiAgICAgICAgZnAuc2V0RmllbGRWYWx1ZSh0YXJnZXQsIHZhbHVlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlYWRzIGEgdmFsdWUgZnJvbSB0YXJnZXQgb2JqZWN0c1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRGaWVsZFZhbHVlKHRhcmdldDogYW55LCBmaWVsZDogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICBsZXQgZnAgPSBuZXcgRmllbGRQYXRoKGZpZWxkKTtcbiAgICAgICAgbGV0IHZhbHVlID0gZnAuZ2V0RmllbGRWYWx1ZSh0YXJnZXQpO1xuXG4gICAgICAgIGlmIChmaWVsZCA9PT0gJyR0b1N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYXRoOiBzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLl9maWVsZFBhdGhzID0gaXNCbGFuayhfcGF0aCkgPyBbXSA6IF9wYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgIHRoaXMub2JqZWN0UGF0aEluc3RhbmNlID0gKDxhbnk+b2JqZWN0UGF0aClbJ2NyZWF0ZSddKHtpbmNsdWRlSW5oZXJpdGVkUHJvcHM6IHRydWV9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgT25lIG9mIHRoZSBtYWluIHJlYXNvbiB3aHkgSSBoYXZlIHRoaXMgaXMgbm90IG9ubHkgdG8gaXRlcmF0ZSB0aHJ1IGRvdHRlZCBmaWVsZCBwYXRoIGJ1dFxuICAgICAqIG1haW5seSB0byBiZSBhYmxlIHRvIHNldCBuYXR1cmFsbHkgdmFsdWUgaW50byBhIG5lc3RlZCBtYXBzIGxpa2UgOlxuICAgICAqXG4gICAgICogIGZpZWxkTmFtZS5maWVsZE5hbWVNYXAuZmllbGRLZXkgPT4gaXQgd2lsbCBhY2Nlc3MgZmllbGROYW1lIG9uIHRoZSB0YXJnZXQsIGZyb20gdGhlcmUgaXRcbiAgICAgKiByZWFkcyBGaWVsZE5hbWVNYXAgc2luY2UgZmllbGROYW1lIG5lc3RlZCBvYmplY3RzIGFuZCBzZXRzIGEgbmV3IHZhbHVlIGlkZW50aWZpZWQgYnkgTWFwIGtleVxuICAgICAqIGZpZWxkS2V5XG4gICAgICpcbiAgICAgKiAgYGBgXG4gICAgICogIGNsYXNzIE15Q2xhc3Mge1xuICAgICAqICAgICAgZmllbGROYW1lOk5lc3RlZE9iamVjdFxuICAgICAqXG4gICAgICogIH1cbiAgICAgKlxuICAgICAqICBjbGFzcyBOZXN0ZWRPYmplY3Qge1xuICAgICAqICAgICAgZmllbGROYW1lTWFwOk1hcDxrZXksIHZhbHVlPjtcbiAgICAgKiAgfVxuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqIHVzZSBmaWVsZCB2YWx1ZSBmb3IgYXNzaWdubWVudCBzbyBrZXlzIG9mIGZvcm0gXCJhLmIuY1wiIHdpbGwgZ28gaW4gbmVzdGVkIE1hcHNcbiAgICAgKi9cbiAgICBzZXRGaWVsZFZhbHVlKHRhcmdldDogYW55LCB2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gaW1wbGVtZW50IHRoZSBzYW1lIHRoaW5nIHdoYXQgd2UgaGF2ZSBvbiB0aGUgZ2V0LCBpZiBNYXAgc2V0IGZpZWxkIGludG8gbWFwXG4gICAgICAgIGlmICh0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCA+IDEgJiYgISh0YXJnZXQgaW5zdGFuY2VvZiBNYXApKSB7XG5cbiAgICAgICAgICAgIGxldCBwYXRoID0gdGhpcy5fZmllbGRQYXRocy5zbGljZSgwLCB0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCAtIDEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGxldCBvYmplY3RUb0JlVXBkYXRlZCA9IHRoaXMub2JqZWN0UGF0aEluc3RhbmNlLmdldCh0YXJnZXQsIHBhdGgpO1xuICAgICAgICAgICAgaWYgKG9iamVjdFRvQmVVcGRhdGVkIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VG9CZVVwZGF0ZWQuc2V0KHRoaXMuX2ZpZWxkUGF0aHNbdGhpcy5fZmllbGRQYXRocy5sZW5ndGggLSAxXSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZS5zZXQodGFyZ2V0LCB0aGlzLl9wYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICBsZXQgbWFwVGFyZ2V0OiBNYXA8c3RyaW5nLCBhbnk+ID0gdGFyZ2V0O1xuICAgICAgICAgICAgLy8gaGFuZGxlIE5lc3RlZCBNYXBcbiAgICAgICAgICAgIGlmICh0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IHRoaXMuX2ZpZWxkUGF0aHMuc3BsaWNlKDAsIDEpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5lc3RlZE1hcDogTWFwPHN0cmluZywgYW55PiA9IG1hcFRhcmdldC5nZXQocGF0aFswXSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsobmVzdGVkTWFwKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXN0ZWRNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICAgICAgICAgICAgICBtYXBUYXJnZXQuc2V0KHBhdGhbMF0sIG5lc3RlZE1hcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRWYWx1ZShuZXN0ZWRNYXAsIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldCh0aGlzLl9maWVsZFBhdGhzWzBdLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZS5zZXQodGFyZ2V0LCB0aGlzLl9wYXRoLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSByZWFzb24gYXMgZm9yIFNldEZpZWxkVmFsdWUuIE5lZWQgdG8gYmUgYWJsZSB0byByZWFkIHZhbHVlIGJ5IGRvdHRlZCBwYXRoIGFzIHdlbGxcbiAgICAgKiBhcyByZWFkeSB2YWx1ZSBmcm9tIE1hcHMuXG4gICAgICpcbiAgICAgKiB0b2RvOiB0aGlzIGlzIHF1aWNrIGFuZCBkaXJ0eSBpbXBsZW1lbnRhdGlvbiAtIG5lZWQgdG8gd3JpdGUgYmV0dGVyIHNvbHV0aW9uXG4gICAgICovXG4gICAgZ2V0RmllbGRWYWx1ZSh0YXJnZXQ6IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IHZhbHVlOiBhbnk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZmllbGRQYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKChpc1N0cmluZ01hcCh0YXJnZXQpIHx8IGlzU3RyaW5nKHRhcmdldCkpICYmICEodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5vYmplY3RQYXRoSW5zdGFuY2UuZ2V0KHRhcmdldCwgdGhpcy5fZmllbGRQYXRoc1tpXSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXRNYXAuZ2V0KHRoaXMuX2ZpZWxkUGF0aHNbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBqdXN0IHR3ZWFrIHRvIGJlIGFibGUgdG8gYWNjZXNzIG1hcHMgZmllbGQuc29tZU1hcEZpZWxkLm1hcEtleVxuICAgICAgICAgICAgLy8gSSB3YW50IHRoaXMgdG8gZ2V0IHRoZSBlbGVtZW50IGZyb20gdGhlIG1hcFxuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTWFwICYmIChpICsgMSkgPCB0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBtYXBWYWx1ZSA9IDxNYXA8c3RyaW5nLCBhbnk+PiB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwVmFsdWUuZ2V0KHRoaXMuX2ZpZWxkUGF0aHNbaSArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBnZXQgcGF0aCgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gICAgfVxuXG59XG5cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7aXNCbGFua30gZnJvbSAnLi91dGlscy9sYW5nJztcbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICcuL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7TWV0YSBhcyBNZXRhVGFncywgVGl0bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogTm90aW9uIG9mIGhhdmluZyBgQXJpYmFBcHBsaWNhdGlvbmAgY2xhc3MgY2FtZSBmcm9tICBhIHNpbXBsZSByZXF1aXJlbWVudCB0aGF0IGV2ZXJ5IHNpbmdsZVxuICogYXBwbGljYXRpb24gbmVlZHMgYSBjb21tb24gd2F5IGhvdyB0byBpbml0aWFsaXplLlxuICpcbiAqIFdlIHdhbnQgdG8gYmUgbW9yZSBhcHBsaWNhdGlvbiBzcGVjaWZpYyB0aGVyZWZvcmUgd2UgZG9uJ3Qgd2FudCB0byBoYXZlIGdlbmVyaWMgbmFtZXMgc3VjaCBhc1xuICogYGFwcC5jb21wb25lbnQgb3IgYXBwLm1vZHVsZWAsIHRoZSByb290IGNvbXBvbmVudCBzaG91bGQgYmUgbmFtZWQgYmFzZWQgb24gd2hhdCBpdCBpcyBkb2luZ1xuICogb3Igd2hhdCBpcyByZWFsIGFwcGxpY2F0aW9uIG5hbWUgZS5nLjogVG9kb0FwcCwgU291cmNpbmdBcHAsIGV0Y3MuIGFuZCB0aGVzZSBhcHBsaWNhdGlvbiB3aWxsXG4gKiBpbmhlcml0IGZyb20gYEFyaWJhQXBwbGljYXRpb25gIHRvIGdldCBzb21lIGNvbW1vbiBiZWhhdmlvci5cbiAqXG4gKiBTcGVjaWZpYyBhcHBsaWNhdGlvbiB0eXBlcyB3aWxsIGV4dGVuZHMgdGhpcyBjbGFzcyB0byBhZGQgbW9yZSBiZWhhdmlvci5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHR5cGVzIG9mIGJvb3RzdHJhcHBpbmcgYW5kIHBhc3NpbmcgZW52aXJvbm1lbnQgcGFyYW1ldGVycyB0byB0aGUgYXBwbGljYXRpb246XG4gKlxuICogLSAgRHVyaW5nIEFyaWJhQ29yZVVJIGltcG9ydDpcbiAqXG4gKiAjIyMgZXhhbXBsZVxuICpcbiAqIGBgYHRzXG4gKiAgICAgIEFyaWJhQ29yZU1vZHVsZS5mb3JSb290KHtcbiAqICAgICAgICAgICAgICAgICAgJ2FwcC50aXRsZSc6ICdQbGF5Z3JvdW5kIEFwcGxpY2F0aW9uJyxcbiAqICAgICAgICAgICAgICAgICAgJ2Fzc2V0LWZvbGRlcic6ICdwbGF5Z3JvdW5kL2Fzc2V0cycsXG4gKiAgICAgICAgICAgICAgICAgICdtZXRhdWkucnVsZXMuZmlsZS1uYW1lcyc6IFsnQXBwbGljYXRpb24nLCAnTGF5b3V0J10sXG4gKiAgICAgICAgICAgICAgICAgICdyZXN0YXBpLmNvbnRleHQnOiAnL215U2VydmljZS8nLFxuICogICAgICAgICAgICAgICAgICAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5lbmFibGVkJzogdHJ1ZSxcbiAqICAgICAgICAgICAgICAgICAgJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIucm91dGVzJzogWyd1c2VycyddLFxuICogICAgICAgICAgICAgIH0pLFxuICpcbiAqIGBgYFxuICogIFVzZSB0aGlzIHRvIHBhc3Mgc29tZSBzdGF0aWMgcHJvcGVydGllcy5cbiAqXG4gKlxuICogLSAgRnJvbSBBcmliYUFwcGxpY2F0aW9uIDpcbiAqXG4gKiAgV2hlbiB5b3UgaGF2ZSBzcGVjaWZpYyB0eXBlIG9mIGFwcGxpY2F0aW9ucyB0aGF0IG5lZWRzIG1vcmUgc2V0dGluZ3MgeW91IGluaGVyaXQgZnJvbSB0aGlzXG4gKiAgY2xhc3MgdG8gZXh0ZW5kIGl0cyBiZWhhdmlvciBhbmQgdGhlbiB1c2UgaXQgZm9yIHlvdXIgYXBwbGljYXRpb25zIHRvIHNoYXJlIGNvbW1vbiBiZWhhdmlvclxuICpcbiAqICMjIyBleGFtcGxlXG4gKlxuICogIGBgYHRzXG4gKlxuICogICAgIGV4cG9ydCBjbGFzcyBGYWNlYm9va0FwcGxpY2F0aW9uIGV4dGVuZHMgQXJpYmFBcHBsaWNhdGlvbiB7XG4gKlxuICogICAgICAgICBwcm90ZWN0ZWQgYXBwSWQ6IHN0cmluZyA9ICcuLi4uLic7XG4gKlxuICpcbiAqICAgICAgICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCk6IHZvaWRcbiAqICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gKlxuICogICAgICAgICAgICAgIHRoaXMuYXBwSWQgPSByZWFkQXBwSWRmcm9tRW52KCk7XG4gKlxuICogICAgICAgICAgICAgIHRoaXMuYXBwQ29uZmlnLnNldCgnZmFjZWJvb2suYXBwSWQnLCB0aGlzLmFwcElkICk7XG4gKlxuICogICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJGQkF1dGhlbnRpY2F0b3IoKTtcbiAqXG4gKiAgICAgICAgICB9XG4gKlxuICogICAgIH1cbiAqXG4gKiAgYGBgXG4gKiAgT25jZSB5b3UgZGVmaW5lZCB5b3VyIHR5cGUgb2YgYXBwbGljYXRpb24sIHRoZW4geW91IGNhbiBzdGFydCBjcmVhdGluZyBhcHBsaWNhdGlvbnMgdGhhdCBpbmhlcml0XG4gKiAgZnJvbSB0aGlzIGBGYWNlYm9va0FwcGxpY2F0aW9uYC4gUm9vdCBBcHAgY29tcG9uZW50XG4gKlxuICpcbiAqIGBgYHRzXG4gKiAgICAgIEBDb21wb25lbnQoey4uLn0pXG4gKiAgICAgIGV4cG9ydCBQaWN0dXJlQXBwQ29tcG9uZW50IGV4dGVuZHMgRmFjZWJvb2tBcHBsaWNhdGlvbiB7XG4gKiAgICAgICAgICAgICAuLi5cbiAqXG4gKiAgICAgIH1cbiAqXG4gKlxuICpcbiAqICAgICBATmdNb2R1bGUoeyBib290c3RyYXA6IFtQaWN0dXJlQXBwQ29tcG9uZW50XSB9KVxuICogICAgIGV4cG9ydCBjbGFzcyBQaWN0dXJlQXBwTW9kdWxlIHtcbiAqXG4gKiAgICAgfVxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBBcmliYUFwcGxpY2F0aW9uIGltcGxlbWVudHMgT25Jbml0XG57XG5cbiAgICAvKipcbiAgICAgKiBUaXRsZSBzZXJ2aWNlIGZvciBzZXR0aW5nIHBhZ2UgdGl0bGVcbiAgICAgKi9cbiAgICB0aXRsZTogVGl0bGU7XG5cblxuICAgIC8qKlxuICAgICAqIE1ldGEgc2VydmljZSBmb3IgYWRkaW5nIGFuZCB1cGRhdGluZyBwYWdlIG1ldGEgdGFnc1xuICAgICAqL1xuICAgIG1ldGFUYWdzOiBNZXRhVGFncztcblxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFwcENvbmZpZzogQXBwQ29uZmlnKVxuICAgIHtcbiAgICAgICAgdGhpcy5tZXRhVGFncyA9IHRoaXMuYXBwQ29uZmlnLmluamVjdG9yLmdldChNZXRhVGFncyk7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLmFwcENvbmZpZy5pbmplY3Rvci5nZXQoVGl0bGUpO1xuXG5cbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgZGVmYXVsdCBiZWhhdmlvciBqdXN0IHNldHMgYSB0aXRsZSBmb3IgdGhlIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHRpdGxlOiBzdHJpbmcgPSB0aGlzLmFwcENvbmZpZy5nZXQoQXBwQ29uZmlnLkFwcFRpdGxlKTtcbiAgICAgICAgaWYgKGlzQmxhbmsodGl0bGUpKSB7XG4gICAgICAgICAgICB0aXRsZSA9ICdBcmliYSBBcHBsaWNhdGlvbic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aXRsZS5zZXRUaXRsZSh0aXRsZSk7XG5cbiAgICB9XG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX3ZhbHVlcyIsIm1hcCIsIkNvbGxlY3Rpb25zLmFycmF5cyIsInRzbGliXzEuX19leHRlbmRzIiwib2YiLCJvYnNlcnZhYmxlT2YiLCJvYnNlcnZhYmxlVGhyb3dFcnJvciIsIigvKiogQHR5cGUgez99ICovIChvYmplY3RQYXRoKSlbJ2NyZWF0ZSddIiwiTWV0YVRhZ3MiXSwibWFwcGlu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