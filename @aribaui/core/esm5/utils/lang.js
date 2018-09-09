/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as bigIntImported from 'big-integer';
/** @type {?} */
var bigInt = bigIntImported;
/** *
 *  Set of reusable globals. This is taken from the Angular 2 since its not exported API. And there
 *  is a need for such common functions and wrappers
 *
  @type {?} */
var __window = typeof window !== 'undefined' && window;
/** @type {?} */
var _global = __window;
/**
 * @param {?} varName
 * @return {?}
 */
export function readGlobalParam(varName) {
    return _global[varName];
}
/**
 * @param {?} varName
 * @return {?}
 */
export function readGlobalType(varName) {
    return _global[varName];
}
/**
 * @param {?} type
 * @return {?}
 */
export function getTypeNameForDebugging(type) {
    if (type['name']) {
        return type['name'];
    }
    return typeof type;
}
/**
 * @return {?}
 */
export function unimplemented() {
    throw new Error('unimplemented');
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isBlank(obj) {
    return obj === undefined || obj === null;
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isBoolean(obj) {
    return typeof obj === 'boolean';
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isNumber(obj) {
    return typeof obj === 'number';
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isString(obj) {
    return typeof obj === 'string';
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isFunction(obj) {
    return typeof obj === 'function';
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isType(obj) {
    return isFunction(obj);
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
}
/** @type {?} */
var STRING_MAP_PROTO = Object.getPrototypeOf({});
/**
 * @param {?} obj
 * @return {?}
 */
export function isStrictStringMap(obj) {
    return isStringMap(obj) && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return isPresent(obj) && isFunction(obj.then);
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isArray(obj) {
    return Array.isArray(obj);
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isDate(obj) {
    return (obj instanceof Date && !isNaN(obj.valueOf())) ||
        (isPresent(obj) && isFunction(obj.now));
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isListLikeIterable(obj) {
    if (!isJsObject(obj)) {
        return false;
    }
    return Array.isArray(obj) ||
        (!(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
            // JS Map are iterables but return entries as [k, v]
            getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
}
/**
 * Checks if `obj` is a window object.
 *
 * @param {?} obj
 * @return {?}
 */
export function isWindow(obj) {
    return obj && obj.window === obj;
}
/**
 * Determines if a value is a regular expression object.
 *
 * @param {?} value
 * @return {?}
 */
export function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
/**
 * @return {?}
 */
export function noop() {
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function shiftLeft(a, b) {
    return bigInt(a).shiftLeft(b).valueOf();
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function shiftRight(a, b) {
    return bigInt(a).shiftRight(b).valueOf();
}
/**
 * @param {?} token
 * @return {?}
 */
export function stringify(token) {
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
    /** @type {?} */
    var res = token.toString();
    /** @type {?} */
    var newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
/**
 * @param {?} clazz
 * @return {?}
 */
export function className(clazz) {
    if (isPresent(clazz.constructor)) {
        /** @type {?} */
        var classN = clazz.constructor.toString();
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
export function applyMixins(derivedCtor, baseCtors) {
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
            /** @type {?} */
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
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
            /** @type {?} */
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
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
                /** @type {?} */
                var subjectString = this.toString();
                if (typeof pos !== 'number' || !isFinite(pos) || Math.floor(pos) !== pos || pos
                    >
                        subjectString.length) {
                    pos = subjectString.length;
                }
                pos -= sstring.length;
                /** @type {?} */
                var lastIndex = subjectString.indexOf(sstring, pos);
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
export { StringWrapper };
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
export { StringJoiner };
if (false) {
    /** @type {?} */
    StringJoiner.prototype.parts;
}
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
        /** @type {?} */
        var result = parseInt(text);
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
            /** @type {?} */
            var result = parseInt(text, radix);
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
export { NumberWrapper };
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
export { FunctionWrapper };
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function looseIdentical(a, b) {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
export function getMapKey(value) {
    return value;
}
/**
 * @param {?} obj
 * @return {?}
 */
export function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
}
/**
 * @param {?} obj
 * @return {?}
 */
export function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
}
/**
 * @param {?} o
 * @return {?}
 */
export function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
/**
 * @param {?} obj
 * @return {?}
 */
export function print(obj) {
    console.log(obj);
}
/**
 * @param {?} obj
 * @return {?}
 */
export function warn(obj) {
    console.warn(obj);
}
/**
 * @param {?} condition
 * @param {?} msg
 * @return {?}
 */
export function assert(condition, msg) {
    if (!condition) {
        throw new Error(msg);
    }
}
/**
 * @param {?} s
 * @return {?}
 */
export function checksum(s) {
    /** @type {?} */
    var chk = 0x12345678;
    /** @type {?} */
    var len = s.length;
    for (var i = 0; i < len; i++) {
        chk += (s.charCodeAt(i) * (i + 1));
    }
    return (chk & 0xffffffff).toString(16);
}
/**
 * @param {?} crc
 * @param {?} anInt
 * @return {?}
 */
export function crc32(crc, anInt) {
    /** @type {?} */
    var table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
    /** @type {?} */
    var x = 0;
    /** @type {?} */
    var y = 0;
    /** @type {?} */
    var myCrc = crc ^ (-1);
    for (var i = 0; i < 4; i++) {
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
export { Json };
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
export { DateWrapper };
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
export { BooleanWrapper };
/** @type {?} */
var _symbolIterator = null;
/**
 * @return {?}
 */
export function getSymbolIterator() {
    if (isBlank(_symbolIterator)) {
        if (isPresent(Symbol.iterator)) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            /** @type {?} */
            var keys = Object.getOwnPropertyNames(Map.prototype);
            for (var i = 0; i < keys.length; ++i) {
                /** @type {?} */
                var key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    (/** @type {?} */ (Map)).prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
/** @type {?} */
var ReservedKeyword = ['class'];
/**
 * @param {?} expr
 * @param {?} declarations
 * @param {?} lets
 * @return {?}
 */
export function evalExpression(expr, declarations, lets) {
    /** @type {?} */
    var fnBody = declarations + "\n\treturn " + expr + "\n//# sourceURL=AribaExpression";
    /** @type {?} */
    var fnArgNames = [];
    /** @type {?} */
    var fnArgValues = [];
    for (var argName in lets) {
        if (StringWrapper.contains(expr, argName)) {
            fnArgNames.push(argName);
            fnArgValues.push(lets[argName]);
        }
    }
    if (lets instanceof Extensible) {
        /** @type {?} */
        var extValues = lets;
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
    return new (Function.bind.apply(Function, tslib_1.__spread([void 0], fnArgNames.concat(fnBody))))().apply(void 0, tslib_1.__spread(fnArgValues));
}
/**
 * @param {?} expr
 * @param {?} declarations
 * @param {?} lets
 * @param {?} thisContext
 * @return {?}
 */
export function evalExpressionWithCntx(expr, declarations, lets, thisContext) {
    /** @type {?} */
    var fnBody = declarations + "\n\treturn " + expr + "\n//# sourceURL=AribaExpression";
    /** @type {?} */
    var fnArgNames = [];
    /** @type {?} */
    var fnArgValues = [];
    for (var argName in lets) {
        if (StringWrapper.contains(expr, argName)) {
            fnArgNames.push(argName);
            fnArgValues.push(lets[argName]);
        }
    }
    if (lets instanceof Extensible) {
        /** @type {?} */
        var extValues = lets;
        extValues.extendedFields().forEach(function (value, key) {
            if (StringWrapper.contains(expr, key) &&
                fnArgNames.indexOf(key) === -1 && ReservedKeyword.indexOf(key) === -1) {
                fnArgNames.push(key);
                fnArgValues.push(value);
            }
        });
    }
    /** @type {?} */
    var fn = new (Function.bind.apply(Function, tslib_1.__spread([void 0], fnArgNames.concat(fnBody))))();
    assert(isPresent(fn), 'Cannot evaluate expression. FN is not defined');
    /** @type {?} */
    var fnBound = fn.bind(thisContext);
    return fnBound.apply(void 0, tslib_1.__spread(fnArgValues));
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isPrimitive(obj) {
    return !isJsObject(obj);
}
/**
 * @param {?} value
 * @param {?} type
 * @return {?}
 */
export function hasConstructor(value, type) {
    return value.constructor === type;
}
/**
 * @param {?} s
 * @return {?}
 */
export function escape(s) {
    return encodeURI(s);
}
/**
 * @param {?} s
 * @return {?}
 */
export function escapeRegExp(s) {
    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
/**
 * @param {?} str
 * @return {?}
 */
export function hashCode(str) {
    /** @type {?} */
    var hash = 0;
    /** @type {?} */
    var char;
    if (str.length === 0) {
        return hash;
    }
    for (var i = 0; i < str.length; i++) {
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
export function objectValues(obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
}
/**
 *
 * Converts object to a name;
 *
 * @param {?} target
 * @return {?}
 */
export function objectToName(target) {
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
export function uuid() {
    /** @type {?} */
    var dt = new Date().getTime();
    /** @type {?} */
    var proto = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        /** @type {?} */
        var r = (dt + Math.random() * 16) % 16 | 0;
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
export function equals(o1, o2) {
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
    /** @type {?} */
    var t1 = typeof o1;
    /** @type {?} */
    var t2 = typeof o2;
    /** @type {?} */
    var length;
    /** @type {?} */
    var key;
    /** @type {?} */
    var keySet;
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
            /** @type {?} */
            var keys = Object.keys(o2);
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
                for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
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
export function decamelize(string, separator, initialCaps) {
    if (separator === void 0) { separator = ' '; }
    if (initialCaps === void 0) { initialCaps = true; }
    if (isBlank(string)) {
        return '';
    }
    /** @type {?} */
    var lastUCIndex = -1;
    /** @type {?} */
    var allCaps = true;
    /** @type {?} */
    var splitOnUC = !StringWrapper.contains(string, '_');
    /** @type {?} */
    var buf = '';
    /** @type {?} */
    var inWord = 0;
    for (var i = string.length; inWord < i; ++inWord) {
        /** @type {?} */
        var c = string[inWord];
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
        /** @type {?} */
        var toCaps = false;
        for (var i = 0, c = buf.length; i < c; i++) {
            /** @type {?} */
            var ch = buf[i];
            if (ch.toLowerCase() !== ch.toUpperCase()) {
                if (inWord && ch === ch.toUpperCase()) {
                    buf = buf.substr(0, i) + ch.toLowerCase() + buf.substr(i + 1);
                }
                toCaps = true;
            }
            else {
                toCaps = false;
            }
        }
    }
    return buf;
}
/**
 * @param {?} input
 * @return {?}
 */
export function nonPrivatePrefix(input) {
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
export function hasGetter(instance, field) {
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
var /**
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
 * The Extensible interface can be implemented when a given class
 * wants to provide dynamically added fields.  Once this is implemented
 * to return a Map, the FieldValue system will be able to look in
 * the Map to see if the desired field exists.
 *
 *
 * @abstract
 */
export { Extensible };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9sYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBY0EsT0FBTyxLQUFLLGNBQWMsTUFBTSxhQUFhLENBQUM7O0FBRTlDLElBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQzs7Ozs7O0FBUTlCLElBQU0sUUFBUSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUM7O0FBQ3pELElBQU0sT0FBTyxHQUE0QixRQUFRLENBQUM7Ozs7O0FBR2xELE1BQU0sMEJBQTBCLE9BQVk7SUFFeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMzQjs7Ozs7QUFFRCxNQUFNLHlCQUF5QixPQUFZO0lBRXZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDM0I7Ozs7O0FBR0QsTUFBTSxrQ0FBa0MsSUFBUztJQUU3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2QjtJQUNELE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQztDQUN0Qjs7OztBQUVELE1BQU07SUFFRixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0NBQ3BDOzs7OztBQUVELE1BQU0sb0JBQW9CLEdBQVE7SUFFOUIsTUFBTSxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQztDQUM1Qzs7Ozs7QUFFRCxNQUFNLGtCQUFrQixHQUFRO0lBRTVCLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7Q0FDNUM7Ozs7O0FBRUQsTUFBTSxvQkFBb0IsR0FBUTtJQUU5QixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssU0FBUyxDQUFDO0NBQ25D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LENBQUMsYUFBYSxFQUFFLENBQUM7S0FDMUI7cUJBajdCTDtJQWs3QkMsQ0FBQTs7Ozs7Ozs7OztBQVhELHNCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQG9yaWdpbmFsLWxpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICpcbiAqXG4gKlxuICogIENyZWRpdDogRGVyaXZlZCBhbmQgZXh0ZW5kZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyIGluIG9yZGVyIHRvIGhhdmUgc2V0IG9mXG4gKiAgcmV1c2FibGUgZ2xvYmFscy4gU2luY2UgaXRzIG5vdCBleHBvcnRlZCBBUEkgbmVlZCB0byBoYXZlIGEgY29weSB1bmRlciBjb3JlLlxuICovXG5pbXBvcnQgKiBhcyBiaWdJbnRJbXBvcnRlZCBmcm9tICdiaWctaW50ZWdlcic7XG5cbmNvbnN0IGJpZ0ludCA9IGJpZ0ludEltcG9ydGVkO1xuXG4vKipcbiAqICBTZXQgb2YgcmV1c2FibGUgZ2xvYmFscy4gVGhpcyBpcyB0YWtlbiBmcm9tIHRoZSBBbmd1bGFyIDIgc2luY2UgaXRzIG5vdCBleHBvcnRlZCBBUEkuIEFuZCB0aGVyZVxuICogIGlzIGEgbmVlZCBmb3Igc3VjaCBjb21tb24gZnVuY3Rpb25zIGFuZCB3cmFwcGVyc1xuICpcbiAqL1xuXG5jb25zdCBfX3dpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdztcbmNvbnN0IF9nbG9iYWw6IHsgW25hbWU6IHN0cmluZ106IGFueSB9ID0gX193aW5kb3c7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRHbG9iYWxQYXJhbSh2YXJOYW1lOiBhbnkpOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfVxue1xuICAgIHJldHVybiBfZ2xvYmFsW3Zhck5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEdsb2JhbFR5cGUodmFyTmFtZTogYW55KTogYW55XG57XG4gICAgcmV0dXJuIF9nbG9iYWxbdmFyTmFtZV07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGVOYW1lRm9yRGVidWdnaW5nKHR5cGU6IGFueSk6IHN0cmluZ1xue1xuICAgIGlmICh0eXBlWyduYW1lJ10pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVbJ25hbWUnXTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pbXBsZW1lbnRlZCgpOiBhbnlcbntcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJlc2VudChvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gb2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhvYmo6IGFueSk6IG9iaiBpcyBzdHJpbmdcbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ01hcChvYmo6IGFueSk6IG9iaiBpcyBPYmplY3RcbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsO1xufVxuXG5jb25zdCBTVFJJTkdfTUFQX1BST1RPID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaWN0U3RyaW5nTWFwKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBpc1N0cmluZ01hcChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBTVFJJTkdfTUFQX1BST1RPO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIC8vIGFsbG93IGFueSBQcm9taXNlL0ErIGNvbXBsaWFudCB0aGVuYWJsZS5cbiAgICAvLyBJdCdzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZW5zdXJlIHRoYXQgb2JqLnRoZW4gY29uZm9ybXMgdG8gdGhlIHNwZWNcbiAgICByZXR1cm4gaXNQcmVzZW50KG9iaikgJiYgaXNGdW5jdGlvbihvYmoudGhlbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUob2JqOiBhbnkpOiBvYmogaXMgRGF0ZVxue1xuICAgIHJldHVybiAob2JqIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ob2JqLnZhbHVlT2YoKSkpIHx8XG4gICAgICAgIChpc1ByZXNlbnQob2JqKSAmJiBpc0Z1bmN0aW9uKG9iai5ub3cpKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIGlmICghaXNKc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKSB8fFxuICAgICAgICAoIShvYmogaW5zdGFuY2VvZiBNYXApICYmICAgICAgLy8gSlMgTWFwIGFyZSBpdGVyYWJsZXMgYnV0IHJldHVybiBlbnRyaWVzIGFzIFtrLCB2XVxuICAgICAgICAgICAgZ2V0U3ltYm9sSXRlcmF0b3IoKSBpbiBvYmopOyAgLy8gSlMgSXRlcmFibGUgaGF2ZSBhIFN5bWJvbC5pdGVyYXRvciBwcm9wXG59XG5cblxuLyoqXG4gKiBDaGVja3MgaWYgYG9iamAgaXMgYSB3aW5kb3cgb2JqZWN0LlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzV2luZG93KG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBvYmogJiYgb2JqLndpbmRvdyA9PT0gb2JqO1xufVxuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIHZhbHVlIGlzIGEgcmVndWxhciBleHByZXNzaW9uIG9iamVjdC5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZ0V4cCh2YWx1ZTogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpXG57XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaWZ0TGVmdChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlclxue1xuICAgIHJldHVybiBiaWdJbnQoYSkuc2hpZnRMZWZ0KGIpLnZhbHVlT2YoKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2hpZnRSaWdodChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlclxue1xuICAgIHJldHVybiBiaWdJbnQoYSkuc2hpZnRSaWdodChiKS52YWx1ZU9mKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeSh0b2tlbjogYW55KTogc3RyaW5nXG57XG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cblxuICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkIHx8IHRva2VuID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJyArIHRva2VuO1xuICAgIH1cblxuICAgIGlmICh0b2tlbi5vdmVycmlkZGVuTmFtZSkge1xuICAgICAgICByZXR1cm4gdG9rZW4ub3ZlcnJpZGRlbk5hbWU7XG4gICAgfVxuICAgIGlmICh0b2tlbi5uYW1lKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi5uYW1lO1xuICAgIH1cblxuICAgIGxldCByZXMgPSB0b2tlbi50b1N0cmluZygpO1xuICAgIGxldCBuZXdMaW5lSW5kZXggPSByZXMuaW5kZXhPZignXFxuJyk7XG4gICAgcmV0dXJuIChuZXdMaW5lSW5kZXggPT09IC0xKSA/IHJlcyA6IHJlcy5zdWJzdHJpbmcoMCwgbmV3TGluZUluZGV4KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NOYW1lKGNsYXp6OiBhbnkpOiBzdHJpbmdcbntcbiAgICBpZiAoaXNQcmVzZW50KGNsYXp6LmNvbnN0cnVjdG9yKSkge1xuICAgICAgICBsZXQgY2xhc3NOID0gY2xhenouY29uc3RydWN0b3IudG9TdHJpbmcoKTtcbiAgICAgICAgY2xhc3NOID0gY2xhc3NOLnN1YnN0cignZnVuY3Rpb24gJy5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gY2xhc3NOLnN1YnN0cigwLCBjbGFzc04uaW5kZXhPZignKCcpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsYXp6O1xufVxuXG5cbi8qKlxuICogIFNvdXJjZTogaHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL2RvY3MvaGFuZGJvb2svbWl4aW5zLmh0bWxcbiAqXG4gKiAgRnVuY3Rpb24gdGhhdCBjb3BpZXMgcHJvcGVydGllcyBvZiB0aGUgYmFzZUN0b3JzIHRvIGRlcml2ZWRDdG9yLlxuICogIENhbiBiZSB1c2VkIHRvIGFjaGlldmUgbXVsdGlwbGUgaW5oZXJpdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1peGlucyhkZXJpdmVkQ3RvcjogYW55LCBiYXNlQ3RvcnM6IGFueVtdKVxue1xuICAgIGJhc2VDdG9ycy5mb3JFYWNoKGJhc2VDdG9yID0+XG4gICAge1xuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiYXNlQ3Rvci5wcm90b3R5cGUpLmZvckVhY2gobmFtZSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV1cbiAgICAgICAgICAgICAgICA9IGJhc2VDdG9yLnByb3RvdHlwZVtuYW1lXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdXcmFwcGVyXG57XG4gICAgc3RhdGljIGZyb21DaGFyQ29kZShjb2RlOiBudW1iZXIpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjaGFyQ29kZUF0KHM6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHMuY2hhckNvZGVBdChpbmRleCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNwbGl0KHM6IHN0cmluZywgcmVnRXhwOiBSZWdFeHApOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHMuc3BsaXQocmVnRXhwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKHM6IHN0cmluZywgczI6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzID09PSBzMjtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RyaXBMZWZ0KHM6IHN0cmluZywgY2hhclZhbDogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc1tpXSAhPT0gY2hhclZhbCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcocG9zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RyaXBSaWdodChzOiBzdHJpbmcsIGNoYXJWYWw6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNbaV0gIT09IGNoYXJWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2Uoczogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZShmcm9tLCByZXBsYWNlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVwbGFjZUFsbChzOiBzdHJpbmcsIGZyb206IFJlZ0V4cCwgcmVwbGFjZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKGZyb20sIHJlcGxhY2UpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzbGljZTxUPihzOiBzdHJpbmcsIGZyb206IG51bWJlciA9IDAsIHRvOiBudW1iZXIgPSBudWxsKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gcy5zbGljZShmcm9tLCB0byA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHRvKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnMoczogc3RyaW5nLCBzdWJzdHI6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzLmluZGV4T2Yoc3Vic3RyKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbXBhcmUoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGEgPiBiKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZW5kc1dpZHRoKHN1YmplY3Q6IHN0cmluZywgc2VhcmNoU3RyaW5nOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSB7XG4gICAgICAgICAgICBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHNzdHJpbmcsIHBvcyA9IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IHN1YmplY3RTdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3MgIT09ICdudW1iZXInIHx8ICFpc0Zpbml0ZShwb3MpIHx8IE1hdGguZmxvb3IocG9zKSAhPT0gcG9zIHx8IHBvc1xuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3RTdHJpbmcubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gc3ViamVjdFN0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcyAtPSBzc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEluZGV4ID0gc3ViamVjdFN0cmluZy5pbmRleE9mKHNzdHJpbmcsIHBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3M7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmVuZHNXaXRoKHNlYXJjaFN0cmluZyk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgc3RhcnRzV2lkdGgoc3ViamVjdDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmluZGV4T2Yoc2VhcmNoU3RyaW5nKSA9PT0gMDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdKb2luZXJcbntcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFydHM6IHN0cmluZ1tdID0gW10pXG4gICAge1xuICAgIH1cblxuICAgIGFkZChwYXJ0OiBzdHJpbmcpOiBTdHJpbmdKb2luZXJcbiAgICB7XG4gICAgICAgIHRoaXMucGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBsYXN0KCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHNbdGhpcy5wYXJ0cy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzLmpvaW4oJycpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgTnVtYmVyV3JhcHBlclxue1xuICAgIHN0YXRpYyB0b0ZpeGVkKG46IG51bWJlciwgZnJhY3Rpb25EaWdpdHM6IG51bWJlcik6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIG4udG9GaXhlZChmcmFjdGlvbkRpZ2l0cyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFsKGE6IG51bWJlciwgYjogbnVtYmVyKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlSW50QXV0b1JhZGl4KHRleHQ6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCk7XG4gICAgICAgIGlmIChpc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50ZWdlciBsaXRlcmFsIHdoZW4gcGFyc2luZyAnICsgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VJbnQodGV4dDogc3RyaW5nLCByYWRpeDogbnVtYmVyKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAocmFkaXggPT09IDEwKSB7XG4gICAgICAgICAgICBpZiAoL14oXFwtfFxcKyk/WzAtOV0rJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmFkaXggPT09IDE2KSB7XG4gICAgICAgICAgICBpZiAoL14oXFwtfFxcKyk/WzAtOUFCQ0RFRmFiY2RlZl0rJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgJyArIHRleHQgKyAnIGluIGJhc2UgJyArIHJhZGl4KTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBOYU4gaXMgYSB2YWxpZCBsaXRlcmFsIGJ1dCBpcyByZXR1cm5lZCBieSBwYXJzZUZsb2F0IHRvIGluZGljYXRlIGFuIGVycm9yLlxuICAgIHN0YXRpYyBwYXJzZUZsb2F0KHRleHQ6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGV4dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzTnVtZXJpYyh2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuICFpc05hTih2YWx1ZSAtIHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOYU4odmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc05hTih2YWx1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzSW50ZWdlcih2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uV3JhcHBlclxue1xuICAgIHN0YXRpYyBhcHBseShmbjogRnVuY3Rpb24sIHBvc0FyZ3M6IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIHBvc0FyZ3MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBiaW5kKGZuOiBGdW5jdGlvbiwgc2NvcGU6IGFueSk6IEZ1bmN0aW9uXG4gICAge1xuICAgICAgICByZXR1cm4gZm4uYmluZChzY29wZSk7XG4gICAgfVxufVxuXG4vLyBKUyBoYXMgTmFOICE9PSBOYU5cbmV4cG9ydCBmdW5jdGlvbiBsb29zZUlkZW50aWNhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gYSA9PT0gYiB8fCB0eXBlb2YgYSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGIgPT09ICdudW1iZXInICYmIGlzTmFOKGEpICYmIGlzTmFOKGIpO1xufVxuXG4vLyBKUyBjb25zaWRlcnMgTmFOIGlzIHRoZSBzYW1lIGFzIE5hTiBmb3IgbWFwIEtleSAod2hpbGUgTmFOICE9PSBOYU4gb3RoZXJ3aXNlKVxuLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcFxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hcEtleTxUPih2YWx1ZTogVCk6IFRcbntcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVCbGFuayhvYmo6IE9iamVjdCk6IGFueVxue1xuICAgIHJldHVybiBpc0JsYW5rKG9iaikgPyBudWxsIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQm9vbChvYmo6IGJvb2xlYW4pOiBib29sZWFuXG57XG4gICAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IGZhbHNlIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNKc09iamVjdChvOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIG8gIT09IG51bGwgJiYgKHR5cGVvZiBvID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvID09PSAnb2JqZWN0Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludChvYmo6IEVycm9yIHwgT2JqZWN0KVxue1xuICAgIGNvbnNvbGUubG9nKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuKG9iajogRXJyb3IgfCBPYmplY3QpXG57XG4gICAgY29uc29sZS53YXJuKG9iaik7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb246IGJvb2xlYW4sIG1zZzogc3RyaW5nKVxue1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrc3VtKHM6IGFueSlcbntcbiAgICBsZXQgY2hrID0gMHgxMjM0NTY3ODtcbiAgICBsZXQgbGVuID0gcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGsgKz0gKHMuY2hhckNvZGVBdChpKSAqIChpICsgMSkpO1xuICAgIH1cblxuICAgIHJldHVybiAoY2hrICYgMHhmZmZmZmZmZikudG9TdHJpbmcoMTYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JjMzIoY3JjOiBudW1iZXIsIGFuSW50OiBudW1iZXIpXG57XG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICBsZXQgdGFibGUgPSAnMDAwMDAwMDAgNzcwNzMwOTYgRUUwRTYxMkMgOTkwOTUxQkEgMDc2REM0MTkgNzA2QUY0OEYgRTk2M0E1MzUgOUU2NDk1QTMgMEVEQjg4MzIgNzlEQ0I4QTQgRTBENUU5MUUgOTdEMkQ5ODggMDlCNjRDMkIgN0VCMTdDQkQgRTdCODJEMDcgOTBCRjFEOTEgMURCNzEwNjQgNkFCMDIwRjIgRjNCOTcxNDggODRCRTQxREUgMUFEQUQ0N0QgNkREREU0RUIgRjRENEI1NTEgODNEMzg1QzcgMTM2Qzk4NTYgNjQ2QkE4QzAgRkQ2MkY5N0EgOEE2NUM5RUMgMTQwMTVDNEYgNjMwNjZDRDkgRkEwRjNENjMgOEQwODBERjUgM0I2RTIwQzggNEM2OTEwNUUgRDU2MDQxRTQgQTI2NzcxNzIgM0MwM0U0RDEgNEIwNEQ0NDcgRDIwRDg1RkQgQTUwQUI1NkIgMzVCNUE4RkEgNDJCMjk4NkMgREJCQkM5RDYgQUNCQ0Y5NDAgMzJEODZDRTMgNDVERjVDNzUgRENENjBEQ0YgQUJEMTNENTkgMjZEOTMwQUMgNTFERTAwM0EgQzhENzUxODAgQkZEMDYxMTYgMjFCNEY0QjUgNTZCM0M0MjMgQ0ZCQTk1OTkgQjhCREE1MEYgMjgwMkI4OUUgNUYwNTg4MDggQzYwQ0Q5QjIgQjEwQkU5MjQgMkY2RjdDODcgNTg2ODRDMTEgQzE2MTFEQUIgQjY2NjJEM0QgNzZEQzQxOTAgMDFEQjcxMDYgOThEMjIwQkMgRUZENTEwMkEgNzFCMTg1ODkgMDZCNkI1MUYgOUZCRkU0QTUgRThCOEQ0MzMgNzgwN0M5QTIgMEYwMEY5MzQgOTYwOUE4OEUgRTEwRTk4MTggN0Y2QTBEQkIgMDg2RDNEMkQgOTE2NDZDOTcgRTY2MzVDMDEgNkI2QjUxRjQgMUM2QzYxNjIgODU2NTMwRDggRjI2MjAwNEUgNkMwNjk1RUQgMUIwMUE1N0IgODIwOEY0QzEgRjUwRkM0NTcgNjVCMEQ5QzYgMTJCN0U5NTAgOEJCRUI4RUEgRkNCOTg4N0MgNjJERDFEREYgMTVEQTJENDkgOENEMzdDRjMgRkJENDRDNjUgNERCMjYxNTggM0FCNTUxQ0UgQTNCQzAwNzQgRDRCQjMwRTIgNEFERkE1NDEgM0REODk1RDcgQTREMUM0NkQgRDNENkY0RkIgNDM2OUU5NkEgMzQ2RUQ5RkMgQUQ2Nzg4NDYgREE2MEI4RDAgNDQwNDJENzMgMzMwMzFERTUgQUEwQTRDNUYgREQwRDdDQzkgNTAwNTcxM0MgMjcwMjQxQUEgQkUwQjEwMTAgQzkwQzIwODYgNTc2OEI1MjUgMjA2Rjg1QjMgQjk2NkQ0MDkgQ0U2MUU0OUYgNUVERUY5MEUgMjlEOUM5OTggQjBEMDk4MjIgQzdEN0E4QjQgNTlCMzNEMTcgMkVCNDBEODEgQjdCRDVDM0IgQzBCQTZDQUQgRURCODgzMjAgOUFCRkIzQjYgMDNCNkUyMEMgNzRCMUQyOUEgRUFENTQ3MzkgOUREMjc3QUYgMDREQjI2MTUgNzNEQzE2ODMgRTM2MzBCMTIgOTQ2NDNCODQgMEQ2RDZBM0UgN0E2QTVBQTggRTQwRUNGMEIgOTMwOUZGOUQgMEEwMEFFMjcgN0QwNzlFQjEgRjAwRjkzNDQgODcwOEEzRDIgMUUwMUYyNjggNjkwNkMyRkUgRjc2MjU3NUQgODA2NTY3Q0IgMTk2QzM2NzEgNkU2QjA2RTcgRkVENDFCNzYgODlEMzJCRTAgMTBEQTdBNUEgNjdERDRBQ0MgRjlCOURGNkYgOEVCRUVGRjkgMTdCN0JFNDMgNjBCMDhFRDUgRDZENkEzRTggQTFEMTkzN0UgMzhEOEMyQzQgNEZERkYyNTIgRDFCQjY3RjEgQTZCQzU3NjcgM0ZCNTA2REQgNDhCMjM2NEIgRDgwRDJCREEgQUYwQTFCNEMgMzYwMzRBRjYgNDEwNDdBNjAgREY2MEVGQzMgQTg2N0RGNTUgMzE2RThFRUYgNDY2OUJFNzkgQ0I2MUIzOEMgQkM2NjgzMUEgMjU2RkQyQTAgNTI2OEUyMzYgQ0MwQzc3OTUgQkIwQjQ3MDMgMjIwMjE2QjkgNTUwNTI2MkYgQzVCQTNCQkUgQjJCRDBCMjggMkJCNDVBOTIgNUNCMzZBMDQgQzJEN0ZGQTcgQjVEMENGMzEgMkNEOTlFOEIgNUJERUFFMUQgOUI2NEMyQjAgRUM2M0YyMjYgNzU2QUEzOUMgMDI2RDkzMEEgOUMwOTA2QTkgRUIwRTM2M0YgNzIwNzY3ODUgMDUwMDU3MTMgOTVCRjRBODIgRTJCODdBMTQgN0JCMTJCQUUgMENCNjFCMzggOTJEMjhFOUIgRTVENUJFMEQgN0NEQ0VGQjcgMEJEQkRGMjEgODZEM0QyRDQgRjFENEUyNDIgNjhEREIzRjggMUZEQTgzNkUgODFCRTE2Q0QgRjZCOTI2NUIgNkZCMDc3RTEgMThCNzQ3NzcgODgwODVBRTYgRkYwRjZBNzAgNjYwNjNCQ0EgMTEwMTBCNUMgOEY2NTlFRkYgRjg2MkFFNjkgNjE2QkZGRDMgMTY2Q0NGNDUgQTAwQUUyNzggRDcwREQyRUUgNEUwNDgzNTQgMzkwM0IzQzIgQTc2NzI2NjEgRDA2MDE2RjcgNDk2OTQ3NEQgM0U2RTc3REIgQUVEMTZBNEEgRDlENjVBREMgNDBERjBCNjYgMzdEODNCRjAgQTlCQ0FFNTMgREVCQjlFQzUgNDdCMkNGN0YgMzBCNUZGRTkgQkRCREYyMUMgQ0FCQUMyOEEgNTNCMzkzMzAgMjRCNEEzQTYgQkFEMDM2MDUgQ0RENzA2OTMgNTRERTU3MjkgMjNEOTY3QkYgQjM2NjdBMkUgQzQ2MTRBQjggNUQ2ODFCMDIgMkE2RjJCOTQgQjQwQkJFMzcgQzMwQzhFQTEgNUEwNURGMUIgMkQwMkVGOEQnO1xuICAgIC8qIHRzbGludDplbmFibGUgKi9cblxuICAgIGxldCB4ID0gMDtcbiAgICBsZXQgeSA9IDA7XG5cbiAgICBsZXQgbXlDcmMgPSBjcmMgXiAoLTEpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIHkgPSAoY3JjIF4gYW5JbnQpICYgMHhGRjtcbiAgICAgICAgeCA9IE51bWJlcignMHgnICsgdGFibGUuc3Vic3RyKHkgKiA5LCA4KSk7XG4gICAgICAgIGNyYyA9IChjcmMgPj4+IDgpIF4geDtcbiAgICB9XG4gICAgcmV0dXJuIGNyYyBeICgtMSk7XG59XG5cblxuLy8gQ2FuJ3QgYmUgYWxsIHVwcGVyY2FzZSBhcyBvdXIgdHJhbnNwaWxlciB3b3VsZCB0aGluayBpdCBpcyBhIHNwZWNpYWwgZGlyZWN0aXZlLi4uXG5leHBvcnQgY2xhc3MgSnNvblxue1xuICAgIHN0YXRpYyBwYXJzZShzOiBzdHJpbmcpOiBPYmplY3RcbiAgICB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdHJpbmdpZnkoZGF0YTogT2JqZWN0KTogc3RyaW5nXG4gICAge1xuICAgICAgICAvLyBEYXJ0IGRvZXNuJ3QgdGFrZSAzIGFyZ3VtZW50c1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0ZVdyYXBwZXJcbntcbiAgICBzdGF0aWMgY3JlYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciA9IDEsIGRheTogbnVtYmVyID0gMSwgaG91cjogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgICBzZWNvbmRzOiBudW1iZXIgPSAwLCBtaWxsaXNlY29uZHM6IG51bWJlciA9IDApOiBEYXRlXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21JU09TdHJpbmcoc3RyOiBzdHJpbmcpOiBEYXRlXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoc3RyKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbU1pbGxpcyhtczogbnVtYmVyKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG1zKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9NaWxsaXMoZGF0ZTogRGF0ZSk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBub3coKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvSnNvbihkYXRlOiBEYXRlKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gZGF0ZS50b0pTT04oKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEJvb2xlYW5XcmFwcGVyXG57XG5cbiAgICBzdGF0aWMgYm9sZWFuVmFsdWUodmFsdWU6IGFueSA9IGZhbHNlKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzRmFsc2UodmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ2ZhbHNlJztcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZ01hcCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlID09PSBmYWxzZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzVHJ1ZSh2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmdNYXAodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gdHJ1ZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuXG4vLyBXaGVuIFN5bWJvbC5pdGVyYXRvciBkb2Vzbid0IGV4aXN0LCByZXRyaWV2ZXMgdGhlIGtleSB1c2VkIGluIGVzNi1zaGltXG5kZWNsYXJlIGxldCBTeW1ib2w6IGFueTtcbmxldCBfc3ltYm9sSXRlcmF0b3I6IGFueSA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTeW1ib2xJdGVyYXRvcigpOiBzdHJpbmcgfCBzeW1ib2xcbntcbiAgICBpZiAoaXNCbGFuayhfc3ltYm9sSXRlcmF0b3IpKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoU3ltYm9sLml0ZXJhdG9yKSkge1xuICAgICAgICAgICAgX3N5bWJvbEl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZXM2LXNoaW0gc3BlY2lmaWMgbG9naWNcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTWFwLnByb3RvdHlwZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnZW50cmllcycgJiYga2V5ICE9PSAnc2l6ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgKE1hcCBhcyBhbnkpLnByb3RvdHlwZVtrZXldID09PSBNYXAucHJvdG90eXBlWydlbnRyaWVzJ10pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBfc3ltYm9sSXRlcmF0b3IgPSBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfc3ltYm9sSXRlcmF0b3I7XG59XG5cbmNvbnN0IFJlc2VydmVkS2V5d29yZCA9IFsnY2xhc3MnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWxFeHByZXNzaW9uKGV4cHI6IHN0cmluZywgZGVjbGFyYXRpb25zOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0czogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IGFueVxue1xuICAgIGxldCBmbkJvZHkgPSBgJHtkZWNsYXJhdGlvbnN9XFxuXFx0cmV0dXJuICR7ZXhwcn1cXG4vLyMgc291cmNlVVJMPUFyaWJhRXhwcmVzc2lvbmA7XG4gICAgbGV0IGZuQXJnTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGZuQXJnVmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGFyZ05hbWUgaW4gbGV0cykge1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBhcmdOYW1lKSkge1xuICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaChsZXRzW2FyZ05hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGV0cyBpbnN0YW5jZW9mIEV4dGVuc2libGUpIHtcbiAgICAgICAgbGV0IGV4dFZhbHVlczogRXh0ZW5zaWJsZSA9IGxldHM7XG5cbiAgICAgICAgZXh0VmFsdWVzLmV4dGVuZGVkRmllbGRzKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwga2V5KSAmJlxuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEgJiYgUmVzZXJ2ZWRLZXl3b3JkLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmbkFyZ05hbWVzLnB1c2goJ3RoaXMnKTtcbiAgICAvLyBmbkFyZ1ZhbHVlcy5wdXNoKGxldHMpO1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oLi4uZm5BcmdOYW1lcy5jb25jYXQoZm5Cb2R5KSkoLi4uZm5BcmdWYWx1ZXMpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsRXhwcmVzc2lvbldpdGhDbnR4KGV4cHI6IHN0cmluZywgZGVjbGFyYXRpb25zOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXRzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0NvbnRleHQ6IGFueSk6IGFueVxue1xuICAgIGxldCBmbkJvZHkgPSBgJHtkZWNsYXJhdGlvbnN9XFxuXFx0cmV0dXJuICR7ZXhwcn1cXG4vLyMgc291cmNlVVJMPUFyaWJhRXhwcmVzc2lvbmA7XG4gICAgbGV0IGZuQXJnTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGZuQXJnVmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGFyZ05hbWUgaW4gbGV0cykge1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBhcmdOYW1lKSkge1xuICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaChsZXRzW2FyZ05hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGV0cyBpbnN0YW5jZW9mIEV4dGVuc2libGUpIHtcbiAgICAgICAgbGV0IGV4dFZhbHVlczogRXh0ZW5zaWJsZSA9IGxldHM7XG5cbiAgICAgICAgZXh0VmFsdWVzLmV4dGVuZGVkRmllbGRzKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwga2V5KSAmJlxuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEgJiYgUmVzZXJ2ZWRLZXl3b3JkLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmbkFyZ05hbWVzLnB1c2goJ3RoaXMnKTtcbiAgICAvLyBmbkFyZ1ZhbHVlcy5wdXNoKGxldHMpO1xuICAgIGxldCBmbiA9IG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKTtcbiAgICBhc3NlcnQoaXNQcmVzZW50KGZuKSwgJ0Nhbm5vdCBldmFsdWF0ZSBleHByZXNzaW9uLiBGTiBpcyBub3QgZGVmaW5lZCcpO1xuICAgIGxldCBmbkJvdW5kID0gZm4uYmluZCh0aGlzQ29udGV4dCk7XG5cbiAgICByZXR1cm4gZm5Cb3VuZCguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gIWlzSnNPYmplY3Qob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NvbnN0cnVjdG9yKHZhbHVlOiBPYmplY3QsIHR5cGU6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IgPT09IHR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGUoczogc3RyaW5nKTogc3RyaW5nXG57XG4gICAgcmV0dXJuIGVuY29kZVVSSShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzOiBzdHJpbmcpOiBzdHJpbmdcbntcbiAgICByZXR1cm4gcy5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8W1xcXVxcL1xcXFxdKS9nLCAnXFxcXCQxJyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2hDb2RlKHN0cjogc3RyaW5nKTogbnVtYmVyXG57XG4gICAgbGV0IGhhc2ggPSAwO1xuICAgIGxldCBjaGFyOiBudW1iZXI7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICAgICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdFZhbHVlcyhvYmo6IGFueSk6IGFueVtdXG57XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSk7XG59XG5cbi8qKlxuICpcbiAqIENvbnZlcnRzIG9iamVjdCB0byBhIG5hbWU7XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0VG9OYW1lKHRhcmdldDogYW55KTogc3RyaW5nXG57XG4gICAgaWYgKGlzQmxhbmsodGFyZ2V0KSB8fCAoIWlzU3RyaW5nTWFwKHRhcmdldCkgJiYgIWlzVHlwZSh0YXJnZXQpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJyBDYW5ub3QgY29udmVydC4gVWtub3duIG9iamVjdCcpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1R5cGUodGFyZ2V0KSA/IHRhcmdldC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZSA6IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuXG4vKipcbiAqXG4gKiBCYXNpYyBmdW5jdGlvbiB0byBnZW5lcmF0ZSBVVUlEIHRha2VuIGZyb20gVzNDIGZyb20gb25lIG9mIHRoZSBleGFtcGxlc1xuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHV1aWQoKTogc3RyaW5nXG57XG4gICAgbGV0IGR0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgbGV0IHByb3RvID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLFxuICAgICAgICAoYzogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgciA9IChkdCArIE1hdGgucmFuZG9tKCkgKiAxNikgJSAxNiB8IDA7XG4gICAgICAgICAgICBkdCA9IE1hdGguZmxvb3IoZHQgLyAxNik7XG4gICAgICAgICAgICByZXR1cm4gKGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCkpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHByb3RvO1xufVxuXG4vKipcbiAqIENoZWNrIG9iamVjdCBlcXVhbGl0eSBkZXJpdmVkIGZyb20gYW5ndWxhci5lcXVhbHMgMS41IGltcGxlbWVudGF0aW9uXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKG8xOiBhbnksIG8yOiBhbnkpOiBib29sZWFuXG57XG4gICAgaWYgKG8xID09PSBvMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG8xID09PSBudWxsIHx8IG8yID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChvMSAhPT0gbzEgJiYgbzIgIT09IG8yKSB7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBOYU4gPT09IE5hTlxuICAgIH1cblxuICAgIGxldCB0MSA9IHR5cGVvZiBvMSwgdDIgPSB0eXBlb2YgbzIsIGxlbmd0aDogYW55LCBrZXk6IGFueSwga2V5U2V0OiBhbnk7XG4gICAgaWYgKHQxID09PSB0MiAmJiB0MSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChsZW5ndGggPSBvMS5sZW5ndGgpID09PSBvMi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSA9IDA7IGtleSA8IGxlbmd0aDsga2V5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShvMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKG8xLmdldFRpbWUoKSwgbzIuZ2V0VGltZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1JlZ0V4cChvMSkpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWdFeHAobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG8xLnRvU3RyaW5nKCkgPT09IG8yLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNXaW5kb3cobzEpIHx8IGlzV2luZG93KG8yKSB8fFxuICAgICAgICAgICAgICAgIGlzQXJyYXkobzIpIHx8IGlzRGF0ZShvMikgfHwgaXNSZWdFeHAobzIpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleVNldCA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xuICAgICAgICAgICAgLy8gdXNpbmcgT2JqZWN0LmtleXMgYXMgaXRlcmF0aW5nIHRocnUgb2JqZWN0IHN0b3Agd29ya2luZyBpbiBORzYsIFRTMi43XG4gICAgICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG8yKTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5c1trZXldLmNoYXJBdCgwKSA9PT0gJyQnIHx8IGlzRnVuY3Rpb24obzFba2V5c1trZXldXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZXF1YWxzKG8xW2tleXNba2V5XV0sIG8yW2tleXNba2V5XV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5U2V0LnNldChrZXlzW2tleV0sIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMobzIpO1xuICAgICAgICAgICAgZm9yIChrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgIGlmICghKGtleVNldC5oYXMoa2V5KSkgJiYga2V5LmNoYXJBdCgwKSAhPT0gJyQnXG4gICAgICAgICAgICAgICAgICAgICYmIGlzUHJlc2VudChvMltrZXldKSAmJiAhaXNGdW5jdGlvbihvMltrZXldKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cblxuLyoqXG4gKiB0cmFuc2Zvcm0gYSBzdHJpbmcgaW50byBkZWNhbWVsLiBmb3JtLiBNb3N0bHkgdXNlZCB3aGVuIHJlYWRpbmcgY2xhc3MgbmFtZXMgb3IgZmllbGQgbmFtZXNcbiAqIHN1Y2ggZmlyc3ROYW1lIGFuZCB3ZSB3YW50IHRvIGNyZWF0ZSBhIGxhYmVsIEZpcnN0IE5hbWVcbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjYW1lbGl6ZShzdHJpbmc6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcsIGluaXRpYWxDYXBzOiBib29sZWFuID0gdHJ1ZSlcbntcbiAgICBpZiAoaXNCbGFuayhzdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBsZXQgbGFzdFVDSW5kZXggPSAtMTtcbiAgICBsZXQgYWxsQ2FwcyA9IHRydWU7XG5cbiAgICBsZXQgc3BsaXRPblVDID0gIVN0cmluZ1dyYXBwZXIuY29udGFpbnMoc3RyaW5nLCAnXycpO1xuICAgIGxldCBidWYgPSAnJztcbiAgICBsZXQgaW5Xb3JkID0gMDtcblxuICAgIGZvciAobGV0IGkgPSBzdHJpbmcubGVuZ3RoOyBpbldvcmQgPCBpOyArK2luV29yZCkge1xuICAgICAgICBsZXQgYyA9IHN0cmluZ1tpbldvcmRdO1xuXG4gICAgICAgIGlmIChjLnRvVXBwZXJDYXNlKCkgPT09IGMpIHtcbiAgICAgICAgICAgIGlmICgoaW5Xb3JkIC0gMSkgIT09IGxhc3RVQ0luZGV4ICYmIHNwbGl0T25VQykge1xuICAgICAgICAgICAgICAgIGJ1ZiArPSBzZXBhcmF0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0VUNJbmRleCA9IGluV29yZDtcbiAgICAgICAgICAgIGlmICghaW5pdGlhbENhcHMpIHtcbiAgICAgICAgICAgICAgICBjID0gYy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGMudG9Mb3dlckNhc2UoKSA9PT0gYykge1xuICAgICAgICAgICAgaWYgKGluV29yZCA9PT0gMCAmJiBpbml0aWFsQ2Fwcykge1xuICAgICAgICAgICAgICAgIGMgPSBjLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbGxDYXBzID0gZmFsc2U7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjICE9PSAnXycpIHtcbiAgICAgICAgICAgIGMgPSBzZXBhcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgYnVmICs9IGM7XG4gICAgfVxuXG4gICAgaWYgKGFsbENhcHMpIHtcbiAgICAgICAgbGV0IHRvQ2FwcyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IGJ1Zi5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjaCA9IGJ1ZltpXTtcblxuICAgICAgICAgICAgaWYgKGNoLnRvTG93ZXJDYXNlKCkgIT09IGNoLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5Xb3JkICYmIGNoID09PSBjaC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZiA9IGJ1Zi5zdWJzdHIoMCwgaSkgKyBjaC50b0xvd2VyQ2FzZSgpICsgYnVmLnN1YnN0cihpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvQ2FwcyA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvQ2FwcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBidWY7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vblByaXZhdGVQcmVmaXgoaW5wdXQ6IHN0cmluZyk6IHN0cmluZ1xue1xuICAgIHJldHVybiBpbnB1dFswXSA9PT0gJ18nID8gU3RyaW5nV3JhcHBlci5zdHJpcExlZnQoaW5wdXQsICdfJykgOiBpbnB1dDtcbn1cblxuXG4vKipcbiAqXG4gKiBUaGlzIGNvbnNpZGVycyBjdXJyZW50bHkgb25seSAxIGZvcm0gd2hpY2ggd2hlbiB3ZSBoYXZlIGdldHRlciB3ZSBoYXZlIHRoaXMgZm9ybSBmb3JcbiAqIGRlY2xhcmF0aW9uIF88bmFtZT4gYW5kIGdldCA8bmFtZT4oKS4gSSBkbyBub3QgY2hlY2sgYW55IG90aGVyIGZvcm1zIG5vdy5cbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzR2V0dGVyKGluc3RhbmNlOiBhbnksIGZpZWxkOiBzdHJpbmcpOiBib29sZWFuXG57XG4gICAgaWYgKGlzQmxhbmsoZmllbGQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGZpZWxkWzBdID09PSAnXycgJiYgaXNQcmVzZW50KG5vblByaXZhdGVQcmVmaXgoZmllbGQpKSk7XG5cbn1cblxuLyoqXG4gKiBUaGUgRXh0ZW5zaWJsZSBpbnRlcmZhY2UgY2FuIGJlIGltcGxlbWVudGVkIHdoZW4gYSBnaXZlbiBjbGFzc1xuICogd2FudHMgdG8gcHJvdmlkZSBkeW5hbWljYWxseSBhZGRlZCBmaWVsZHMuICBPbmNlIHRoaXMgaXMgaW1wbGVtZW50ZWRcbiAqIHRvIHJldHVybiBhIE1hcCwgdGhlIEZpZWxkVmFsdWUgc3lzdGVtIHdpbGwgYmUgYWJsZSB0byBsb29rIGluXG4gKiB0aGUgTWFwIHRvIHNlZSBpZiB0aGUgZGVzaXJlZCBmaWVsZCBleGlzdHMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV4dGVuc2libGVcbntcblxuICAgIC8qKlxuICAgICAqICBSZXR1cm5zIHRoZSBNYXAgaW4gd2hpY2ggdGhlIGR5bmFtaWNhbGx5IGFkZGVkIGZpZWxkcyByZXNpZGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBleHRlbmRlZEZpZWxkcygpOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cbn1cblxuIl19