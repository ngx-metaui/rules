/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as bigIntImported from 'big-integer';
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
var /** @type {?} */ STRING_MAP_PROTO = Object.getPrototypeOf({});
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
    var /** @type {?} */ res = token.toString();
    var /** @type {?} */ newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
/**
 * @param {?} clazz
 * @return {?}
 */
export function className(clazz) {
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
function StringJoiner_tsickle_Closure_declarations() {
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
export function crc32(crc, anInt) {
    /* tslint:disable */
    var /** @type {?} */ table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
    /* tslint:enable */
    var /** @type {?} */ x = 0;
    var /** @type {?} */ y = 0;
    var /** @type {?} */ myCrc = crc ^ (-1);
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
var /** @type {?} */ _symbolIterator = null;
/**
 * @return {?}
 */
export function getSymbolIterator() {
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
export function evalExpression(expr, declarations, lets) {
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
    var /** @type {?} */ fn = new (Function.bind.apply(Function, tslib_1.__spread([void 0], fnArgNames.concat(fnBody))))();
    assert(isPresent(fn), 'Cannot evaluate expression. FN is not defined');
    var /** @type {?} */ fnBound = fn.bind(thisContext);
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
        var /** @type {?} */ toCaps = false;
        for (var /** @type {?} */ i = 0, /** @type {?} */ c = buf.length; i < c; i++) {
            var /** @type {?} */ ch = buf[i];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9sYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBY0EsT0FBTyxLQUFLLGNBQWMsTUFBTSxhQUFhLENBQUM7QUFFOUMscUJBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQzs7Ozs7O0FBUTlCLHFCQUFNLFFBQVEsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDO0FBQ3pELHFCQUFNLE9BQU8sR0FBNEIsUUFBUSxDQUFDOzs7OztBQUdsRCxNQUFNLDBCQUEwQixPQUFZO0lBRXhDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDM0I7Ozs7O0FBRUQsTUFBTSx5QkFBeUIsT0FBWTtJQUV2QyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQzNCOzs7OztBQUdELE1BQU0sa0NBQWtDLElBQVM7SUFFN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdkI7SUFDRCxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUM7Q0FDdEI7Ozs7QUFFRCxNQUFNO0lBRUYsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztDQUNwQzs7Ozs7QUFFRCxNQUFNLG9CQUFvQixHQUFRO0lBRTlCLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7Q0FDNUM7Ozs7O0FBRUQsTUFBTSxrQkFBa0IsR0FBUTtJQUU1QixNQUFNLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDO0NBQzVDOzs7OztBQUVELE1BQU0sb0JBQW9CLEdBQVE7SUFFOUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLFNBQVMsQ0FBQztDQUNu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QWo3Qkw7SUFrN0JDLENBQUE7Ozs7Ozs7Ozs7QUFYRCxzQkFXQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBvcmlnaW5hbC1saWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqXG4gKlxuICpcbiAqICBDcmVkaXQ6IERlcml2ZWQgYW5kIGV4dGVuZGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhciBpbiBvcmRlciB0byBoYXZlIHNldCBvZlxuICogIHJldXNhYmxlIGdsb2JhbHMuIFNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJIG5lZWQgdG8gaGF2ZSBhIGNvcHkgdW5kZXIgY29yZS5cbiAqL1xuaW1wb3J0ICogYXMgYmlnSW50SW1wb3J0ZWQgZnJvbSAnYmlnLWludGVnZXInO1xuXG5jb25zdCBiaWdJbnQgPSBiaWdJbnRJbXBvcnRlZDtcblxuLyoqXG4gKiAgU2V0IG9mIHJldXNhYmxlIGdsb2JhbHMuIFRoaXMgaXMgdGFrZW4gZnJvbSB0aGUgQW5ndWxhciAyIHNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJLiBBbmQgdGhlcmVcbiAqICBpcyBhIG5lZWQgZm9yIHN1Y2ggY29tbW9uIGZ1bmN0aW9ucyBhbmQgd3JhcHBlcnNcbiAqXG4gKi9cblxuY29uc3QgX193aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG5jb25zdCBfZ2xvYmFsOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IF9fd2luZG93O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkR2xvYmFsUGFyYW0odmFyTmFtZTogYW55KTogeyBbbmFtZTogc3RyaW5nXTogYW55IH1cbntcbiAgICByZXR1cm4gX2dsb2JhbFt2YXJOYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRHbG9iYWxUeXBlKHZhck5hbWU6IGFueSk6IGFueVxue1xuICAgIHJldHVybiBfZ2xvYmFsW3Zhck5hbWVdO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlTmFtZUZvckRlYnVnZ2luZyh0eXBlOiBhbnkpOiBzdHJpbmdcbntcbiAgICBpZiAodHlwZVsnbmFtZSddKSB7XG4gICAgICAgIHJldHVybiB0eXBlWyduYW1lJ107XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgdHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaW1wbGVtZW50ZWQoKTogYW55XG57XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByZXNlbnQob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIG9iaiAhPT0gdW5kZWZpbmVkICYmIG9iaiAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmxhbmsob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbihvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcob2JqOiBhbnkpOiBvYmogaXMgc3RyaW5nXG57XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVHlwZShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gaXNGdW5jdGlvbihvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdNYXAob2JqOiBhbnkpOiBvYmogaXMgT2JqZWN0XG57XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbDtcbn1cblxuY29uc3QgU1RSSU5HX01BUF9QUk9UTyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih7fSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmljdFN0cmluZ01hcChvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gaXNTdHJpbmdNYXAob2JqKSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gU1RSSU5HX01BUF9QUk9UTztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICAvLyBhbGxvdyBhbnkgUHJvbWlzZS9BKyBjb21wbGlhbnQgdGhlbmFibGUuXG4gICAgLy8gSXQncyB1cCB0byB0aGUgY2FsbGVyIHRvIGVuc3VyZSB0aGF0IG9iai50aGVuIGNvbmZvcm1zIHRvIHRoZSBzcGVjXG4gICAgcmV0dXJuIGlzUHJlc2VudChvYmopICYmIGlzRnVuY3Rpb24ob2JqLnRoZW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlKG9iajogYW55KTogb2JqIGlzIERhdGVcbntcbiAgICByZXR1cm4gKG9iaiBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKG9iai52YWx1ZU9mKCkpKSB8fFxuICAgICAgICAoaXNQcmVzZW50KG9iaikgJiYgaXNGdW5jdGlvbihvYmoubm93KSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlzdExpa2VJdGVyYWJsZShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICBpZiAoIWlzSnNPYmplY3Qob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KG9iaikgfHxcbiAgICAgICAgKCEob2JqIGluc3RhbmNlb2YgTWFwKSAmJiAgICAgIC8vIEpTIE1hcCBhcmUgaXRlcmFibGVzIGJ1dCByZXR1cm4gZW50cmllcyBhcyBbaywgdl1cbiAgICAgICAgICAgIGdldFN5bWJvbEl0ZXJhdG9yKCkgaW4gb2JqKTsgIC8vIEpTIEl0ZXJhYmxlIGhhdmUgYSBTeW1ib2wuaXRlcmF0b3IgcHJvcFxufVxuXG5cbi8qKlxuICogQ2hlY2tzIGlmIGBvYmpgIGlzIGEgd2luZG93IG9iamVjdC5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1dpbmRvdyhvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gb2JqICYmIG9iai53aW5kb3cgPT09IG9iajtcbn1cblxuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZWdFeHAodmFsdWU6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKVxue1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaGlmdExlZnQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXJcbntcbiAgICByZXR1cm4gYmlnSW50KGEpLnNoaWZ0TGVmdChiKS52YWx1ZU9mKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaWZ0UmlnaHQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXJcbntcbiAgICByZXR1cm4gYmlnSW50KGEpLnNoaWZ0UmlnaHQoYikudmFsdWVPZigpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkodG9rZW46IGFueSk6IHN0cmluZ1xue1xuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG5cbiAgICBpZiAodG9rZW4gPT09IHVuZGVmaW5lZCB8fCB0b2tlbiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJycgKyB0b2tlbjtcbiAgICB9XG5cbiAgICBpZiAodG9rZW4ub3ZlcnJpZGRlbk5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuLm92ZXJyaWRkZW5OYW1lO1xuICAgIH1cbiAgICBpZiAodG9rZW4ubmFtZSkge1xuICAgICAgICByZXR1cm4gdG9rZW4ubmFtZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gdG9rZW4udG9TdHJpbmcoKTtcbiAgICBsZXQgbmV3TGluZUluZGV4ID0gcmVzLmluZGV4T2YoJ1xcbicpO1xuICAgIHJldHVybiAobmV3TGluZUluZGV4ID09PSAtMSkgPyByZXMgOiByZXMuc3Vic3RyaW5nKDAsIG5ld0xpbmVJbmRleCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzTmFtZShjbGF6ejogYW55KTogc3RyaW5nXG57XG4gICAgaWYgKGlzUHJlc2VudChjbGF6ei5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgbGV0IGNsYXNzTiA9IGNsYXp6LmNvbnN0cnVjdG9yLnRvU3RyaW5nKCk7XG4gICAgICAgIGNsYXNzTiA9IGNsYXNzTi5zdWJzdHIoJ2Z1bmN0aW9uICcubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGNsYXNzTi5zdWJzdHIoMCwgY2xhc3NOLmluZGV4T2YoJygnKSk7XG4gICAgfVxuICAgIHJldHVybiBjbGF6ejtcbn1cblxuXG4vKipcbiAqICBTb3VyY2U6IGh0dHBzOi8vd3d3LnR5cGVzY3JpcHRsYW5nLm9yZy9kb2NzL2hhbmRib29rL21peGlucy5odG1sXG4gKlxuICogIEZ1bmN0aW9uIHRoYXQgY29waWVzIHByb3BlcnRpZXMgb2YgdGhlIGJhc2VDdG9ycyB0byBkZXJpdmVkQ3Rvci5cbiAqICBDYW4gYmUgdXNlZCB0byBhY2hpZXZlIG11bHRpcGxlIGluaGVyaXRhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNaXhpbnMoZGVyaXZlZEN0b3I6IGFueSwgYmFzZUN0b3JzOiBhbnlbXSlcbntcbiAgICBiYXNlQ3RvcnMuZm9yRWFjaChiYXNlQ3RvciA9PlxuICAgIHtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmFzZUN0b3IucHJvdG90eXBlKS5mb3JFYWNoKG5hbWUgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgZGVyaXZlZEN0b3IucHJvdG90eXBlW25hbWVdXG4gICAgICAgICAgICAgICAgPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nV3JhcHBlclxue1xuICAgIHN0YXRpYyBmcm9tQ2hhckNvZGUoY29kZTogbnVtYmVyKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hhckNvZGVBdChzOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiBzLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzcGxpdChzOiBzdHJpbmcsIHJlZ0V4cDogUmVnRXhwKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiBzLnNwbGl0KHJlZ0V4cCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFscyhzOiBzdHJpbmcsIHMyOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gcyA9PT0gczI7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0cmlwTGVmdChzOiBzdHJpbmcsIGNoYXJWYWw6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNbaV0gIT09IGNoYXJWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0cmlwUmlnaHQoczogc3RyaW5nLCBjaGFyVmFsOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmIChzICYmIHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgcG9zID0gcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmIChzW2ldICE9PSBjaGFyVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMgPSBzLnN1YnN0cmluZygwLCBwb3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXBsYWNlKHM6IHN0cmluZywgZnJvbTogc3RyaW5nLCByZXBsYWNlOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgcmVwbGFjZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2VBbGwoczogc3RyaW5nLCBmcm9tOiBSZWdFeHAsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZShmcm9tLCByZXBsYWNlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2xpY2U8VD4oczogc3RyaW5nLCBmcm9tOiBudW1iZXIgPSAwLCB0bzogbnVtYmVyID0gbnVsbCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHMuc2xpY2UoZnJvbSwgdG8gPT09IG51bGwgPyB1bmRlZmluZWQgOiB0byk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5zKHM6IHN0cmluZywgc3Vic3RyOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gcy5pbmRleE9mKHN1YnN0cikgIT09IC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb21wYXJlKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIGVuZHNXaWR0aChzdWJqZWN0OiBzdHJpbmcsIHNlYXJjaFN0cmluZzogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyID0gMCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICghU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCkge1xuICAgICAgICAgICAgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uIChzc3RyaW5nLCBwb3MgPSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBzdWJqZWN0U3RyaW5nID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcG9zICE9PSAnbnVtYmVyJyB8fCAhaXNGaW5pdGUocG9zKSB8fCBNYXRoLmZsb29yKHBvcykgIT09IHBvcyB8fCBwb3NcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0U3RyaW5nLmxlbmd0aClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHN1YmplY3RTdHJpbmcubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MgLT0gc3N0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RJbmRleCA9IHN1YmplY3RTdHJpbmcuaW5kZXhPZihzc3RyaW5nLCBwb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViamVjdC5lbmRzV2l0aChzZWFyY2hTdHJpbmcpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHN0YXJ0c1dpZHRoKHN1YmplY3Q6IHN0cmluZywgc2VhcmNoU3RyaW5nOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gc3ViamVjdC5pbmRleE9mKHNlYXJjaFN0cmluZykgPT09IDA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nSm9pbmVyXG57XG4gICAgY29uc3RydWN0b3IocHVibGljIHBhcnRzOiBzdHJpbmdbXSA9IFtdKVxuICAgIHtcbiAgICB9XG5cbiAgICBhZGQocGFydDogc3RyaW5nKTogU3RyaW5nSm9pbmVyXG4gICAge1xuICAgICAgICB0aGlzLnBhcnRzLnB1c2gocGFydCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgbGFzdCgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzW3RoaXMucGFydHMubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cy5qb2luKCcnKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE51bWJlcldyYXBwZXJcbntcbiAgICBzdGF0aWMgdG9GaXhlZChuOiBudW1iZXIsIGZyYWN0aW9uRGlnaXRzOiBudW1iZXIpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBuLnRvRml4ZWQoZnJhY3Rpb25EaWdpdHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbChhOiBudW1iZXIsIGI6IG51bWJlcik6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBhID09PSBiO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZUludEF1dG9SYWRpeCh0ZXh0OiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IHBhcnNlSW50KHRleHQpO1xuICAgICAgICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgJyArIHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlSW50KHRleHQ6IHN0cmluZywgcmFkaXg6IG51bWJlcik6IG51bWJlclxuICAgIHtcbiAgICAgICAgaWYgKHJhZGl4ID09PSAxMCkge1xuICAgICAgICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTldKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJhZGl4ID09PSAxNikge1xuICAgICAgICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTlBQkNERUZhYmNkZWZdKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCBpbnRlZ2VyIGxpdGVyYWwgd2hlbiBwYXJzaW5nICcgKyB0ZXh0ICsgJyBpbiBiYXNlICcgKyByYWRpeCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogTmFOIGlzIGEgdmFsaWQgbGl0ZXJhbCBidXQgaXMgcmV0dXJuZWQgYnkgcGFyc2VGbG9hdCB0byBpbmRpY2F0ZSBhbiBlcnJvci5cbiAgICBzdGF0aWMgcGFyc2VGbG9hdCh0ZXh0OiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRleHQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc051bWVyaWModmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAhaXNOYU4odmFsdWUgLSBwYXJzZUZsb2F0KHZhbHVlKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzTmFOKHZhbHVlOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0ludGVnZXIodmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbldyYXBwZXJcbntcbiAgICBzdGF0aWMgYXBwbHkoZm46IEZ1bmN0aW9uLCBwb3NBcmdzOiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBwb3NBcmdzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYmluZChmbjogRnVuY3Rpb24sIHNjb3BlOiBhbnkpOiBGdW5jdGlvblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZuLmJpbmQoc2NvcGUpO1xuICAgIH1cbn1cblxuLy8gSlMgaGFzIE5hTiAhPT0gTmFOXG5leHBvcnQgZnVuY3Rpb24gbG9vc2VJZGVudGljYWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIGEgPT09IGIgfHwgdHlwZW9mIGEgPT09ICdudW1iZXInICYmIHR5cGVvZiBiID09PSAnbnVtYmVyJyAmJiBpc05hTihhKSAmJiBpc05hTihiKTtcbn1cblxuLy8gSlMgY29uc2lkZXJzIE5hTiBpcyB0aGUgc2FtZSBhcyBOYU4gZm9yIG1hcCBLZXkgKHdoaWxlIE5hTiAhPT0gTmFOIG90aGVyd2lzZSlcbi8vIHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXBcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXBLZXk8VD4odmFsdWU6IFQpOiBUXG57XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQmxhbmsob2JqOiBPYmplY3QpOiBhbnlcbntcbiAgICByZXR1cm4gaXNCbGFuayhvYmopID8gbnVsbCA6IG9iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUJvb2wob2JqOiBib29sZWFuKTogYm9vbGVhblxue1xuICAgIHJldHVybiBpc0JsYW5rKG9iaikgPyBmYWxzZSA6IG9iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSnNPYmplY3QobzogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBvICE9PSBudWxsICYmICh0eXBlb2YgbyA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgbyA9PT0gJ29iamVjdCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnQob2JqOiBFcnJvciB8IE9iamVjdClcbntcbiAgICBjb25zb2xlLmxvZyhvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FybihvYmo6IEVycm9yIHwgT2JqZWN0KVxue1xuICAgIGNvbnNvbGUud2FybihvYmopO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uOiBib29sZWFuLCBtc2c6IHN0cmluZylcbntcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja3N1bShzOiBhbnkpXG57XG4gICAgbGV0IGNoayA9IDB4MTIzNDU2Nzg7XG4gICAgbGV0IGxlbiA9IHMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY2hrICs9IChzLmNoYXJDb2RlQXQoaSkgKiAoaSArIDEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGNoayAmIDB4ZmZmZmZmZmYpLnRvU3RyaW5nKDE2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyYzMyKGNyYzogbnVtYmVyLCBhbkludDogbnVtYmVyKVxue1xuICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgbGV0IHRhYmxlID0gJzAwMDAwMDAwIDc3MDczMDk2IEVFMEU2MTJDIDk5MDk1MUJBIDA3NkRDNDE5IDcwNkFGNDhGIEU5NjNBNTM1IDlFNjQ5NUEzIDBFREI4ODMyIDc5RENCOEE0IEUwRDVFOTFFIDk3RDJEOTg4IDA5QjY0QzJCIDdFQjE3Q0JEIEU3QjgyRDA3IDkwQkYxRDkxIDFEQjcxMDY0IDZBQjAyMEYyIEYzQjk3MTQ4IDg0QkU0MURFIDFBREFENDdEIDZERERFNEVCIEY0RDRCNTUxIDgzRDM4NUM3IDEzNkM5ODU2IDY0NkJBOEMwIEZENjJGOTdBIDhBNjVDOUVDIDE0MDE1QzRGIDYzMDY2Q0Q5IEZBMEYzRDYzIDhEMDgwREY1IDNCNkUyMEM4IDRDNjkxMDVFIEQ1NjA0MUU0IEEyNjc3MTcyIDNDMDNFNEQxIDRCMDRENDQ3IEQyMEQ4NUZEIEE1MEFCNTZCIDM1QjVBOEZBIDQyQjI5ODZDIERCQkJDOUQ2IEFDQkNGOTQwIDMyRDg2Q0UzIDQ1REY1Qzc1IERDRDYwRENGIEFCRDEzRDU5IDI2RDkzMEFDIDUxREUwMDNBIEM4RDc1MTgwIEJGRDA2MTE2IDIxQjRGNEI1IDU2QjNDNDIzIENGQkE5NTk5IEI4QkRBNTBGIDI4MDJCODlFIDVGMDU4ODA4IEM2MENEOUIyIEIxMEJFOTI0IDJGNkY3Qzg3IDU4Njg0QzExIEMxNjExREFCIEI2NjYyRDNEIDc2REM0MTkwIDAxREI3MTA2IDk4RDIyMEJDIEVGRDUxMDJBIDcxQjE4NTg5IDA2QjZCNTFGIDlGQkZFNEE1IEU4QjhENDMzIDc4MDdDOUEyIDBGMDBGOTM0IDk2MDlBODhFIEUxMEU5ODE4IDdGNkEwREJCIDA4NkQzRDJEIDkxNjQ2Qzk3IEU2NjM1QzAxIDZCNkI1MUY0IDFDNkM2MTYyIDg1NjUzMEQ4IEYyNjIwMDRFIDZDMDY5NUVEIDFCMDFBNTdCIDgyMDhGNEMxIEY1MEZDNDU3IDY1QjBEOUM2IDEyQjdFOTUwIDhCQkVCOEVBIEZDQjk4ODdDIDYyREQxRERGIDE1REEyRDQ5IDhDRDM3Q0YzIEZCRDQ0QzY1IDREQjI2MTU4IDNBQjU1MUNFIEEzQkMwMDc0IEQ0QkIzMEUyIDRBREZBNTQxIDNERDg5NUQ3IEE0RDFDNDZEIEQzRDZGNEZCIDQzNjlFOTZBIDM0NkVEOUZDIEFENjc4ODQ2IERBNjBCOEQwIDQ0MDQyRDczIDMzMDMxREU1IEFBMEE0QzVGIEREMEQ3Q0M5IDUwMDU3MTNDIDI3MDI0MUFBIEJFMEIxMDEwIEM5MEMyMDg2IDU3NjhCNTI1IDIwNkY4NUIzIEI5NjZENDA5IENFNjFFNDlGIDVFREVGOTBFIDI5RDlDOTk4IEIwRDA5ODIyIEM3RDdBOEI0IDU5QjMzRDE3IDJFQjQwRDgxIEI3QkQ1QzNCIEMwQkE2Q0FEIEVEQjg4MzIwIDlBQkZCM0I2IDAzQjZFMjBDIDc0QjFEMjlBIEVBRDU0NzM5IDlERDI3N0FGIDA0REIyNjE1IDczREMxNjgzIEUzNjMwQjEyIDk0NjQzQjg0IDBENkQ2QTNFIDdBNkE1QUE4IEU0MEVDRjBCIDkzMDlGRjlEIDBBMDBBRTI3IDdEMDc5RUIxIEYwMEY5MzQ0IDg3MDhBM0QyIDFFMDFGMjY4IDY5MDZDMkZFIEY3NjI1NzVEIDgwNjU2N0NCIDE5NkMzNjcxIDZFNkIwNkU3IEZFRDQxQjc2IDg5RDMyQkUwIDEwREE3QTVBIDY3REQ0QUNDIEY5QjlERjZGIDhFQkVFRkY5IDE3QjdCRTQzIDYwQjA4RUQ1IEQ2RDZBM0U4IEExRDE5MzdFIDM4RDhDMkM0IDRGREZGMjUyIEQxQkI2N0YxIEE2QkM1NzY3IDNGQjUwNkREIDQ4QjIzNjRCIEQ4MEQyQkRBIEFGMEExQjRDIDM2MDM0QUY2IDQxMDQ3QTYwIERGNjBFRkMzIEE4NjdERjU1IDMxNkU4RUVGIDQ2NjlCRTc5IENCNjFCMzhDIEJDNjY4MzFBIDI1NkZEMkEwIDUyNjhFMjM2IENDMEM3Nzk1IEJCMEI0NzAzIDIyMDIxNkI5IDU1MDUyNjJGIEM1QkEzQkJFIEIyQkQwQjI4IDJCQjQ1QTkyIDVDQjM2QTA0IEMyRDdGRkE3IEI1RDBDRjMxIDJDRDk5RThCIDVCREVBRTFEIDlCNjRDMkIwIEVDNjNGMjI2IDc1NkFBMzlDIDAyNkQ5MzBBIDlDMDkwNkE5IEVCMEUzNjNGIDcyMDc2Nzg1IDA1MDA1NzEzIDk1QkY0QTgyIEUyQjg3QTE0IDdCQjEyQkFFIDBDQjYxQjM4IDkyRDI4RTlCIEU1RDVCRTBEIDdDRENFRkI3IDBCREJERjIxIDg2RDNEMkQ0IEYxRDRFMjQyIDY4RERCM0Y4IDFGREE4MzZFIDgxQkUxNkNEIEY2QjkyNjVCIDZGQjA3N0UxIDE4Qjc0Nzc3IDg4MDg1QUU2IEZGMEY2QTcwIDY2MDYzQkNBIDExMDEwQjVDIDhGNjU5RUZGIEY4NjJBRTY5IDYxNkJGRkQzIDE2NkNDRjQ1IEEwMEFFMjc4IEQ3MEREMkVFIDRFMDQ4MzU0IDM5MDNCM0MyIEE3NjcyNjYxIEQwNjAxNkY3IDQ5Njk0NzREIDNFNkU3N0RCIEFFRDE2QTRBIEQ5RDY1QURDIDQwREYwQjY2IDM3RDgzQkYwIEE5QkNBRTUzIERFQkI5RUM1IDQ3QjJDRjdGIDMwQjVGRkU5IEJEQkRGMjFDIENBQkFDMjhBIDUzQjM5MzMwIDI0QjRBM0E2IEJBRDAzNjA1IENERDcwNjkzIDU0REU1NzI5IDIzRDk2N0JGIEIzNjY3QTJFIEM0NjE0QUI4IDVENjgxQjAyIDJBNkYyQjk0IEI0MEJCRTM3IEMzMEM4RUExIDVBMDVERjFCIDJEMDJFRjhEJztcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG5cbiAgICBsZXQgeCA9IDA7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgbGV0IG15Q3JjID0gY3JjIF4gKC0xKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICB5ID0gKGNyYyBeIGFuSW50KSAmIDB4RkY7XG4gICAgICAgIHggPSBOdW1iZXIoJzB4JyArIHRhYmxlLnN1YnN0cih5ICogOSwgOCkpO1xuICAgICAgICBjcmMgPSAoY3JjID4+PiA4KSBeIHg7XG4gICAgfVxuICAgIHJldHVybiBjcmMgXiAoLTEpO1xufVxuXG5cbi8vIENhbid0IGJlIGFsbCB1cHBlcmNhc2UgYXMgb3VyIHRyYW5zcGlsZXIgd291bGQgdGhpbmsgaXQgaXMgYSBzcGVjaWFsIGRpcmVjdGl2ZS4uLlxuZXhwb3J0IGNsYXNzIEpzb25cbntcbiAgICBzdGF0aWMgcGFyc2Uoczogc3RyaW5nKTogT2JqZWN0XG4gICAge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RyaW5naWZ5KGRhdGE6IE9iamVjdCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgLy8gRGFydCBkb2Vzbid0IHRha2UgMyBhcmd1bWVudHNcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERhdGVXcmFwcGVyXG57XG4gICAgc3RhdGljIGNyZWF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIgPSAxLCBkYXk6IG51bWJlciA9IDEsIGhvdXI6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgICBtaW51dGVzOiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgICAgc2Vjb25kczogbnVtYmVyID0gMCwgbWlsbGlzZWNvbmRzOiBudW1iZXIgPSAwKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tSVNPU3RyaW5nKHN0cjogc3RyaW5nKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHN0cik7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21NaWxsaXMobXM6IG51bWJlcik6IERhdGVcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShtcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvTWlsbGlzKGRhdGU6IERhdGUpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm93KCk6IERhdGVcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b0pzb24oZGF0ZTogRGF0ZSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGRhdGUudG9KU09OKCk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBCb29sZWFuV3JhcHBlclxue1xuXG4gICAgc3RhdGljIGJvbGVhblZhbHVlKHZhbHVlOiBhbnkgPSBmYWxzZSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBpc0ZhbHNlKHZhbHVlOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodmFsdWUgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICdmYWxzZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmdNYXAodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gZmFsc2UpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBpc1RydWUodmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nTWFwKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgPT09IHRydWUpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cblxuLy8gV2hlbiBTeW1ib2wuaXRlcmF0b3IgZG9lc24ndCBleGlzdCwgcmV0cmlldmVzIHRoZSBrZXkgdXNlZCBpbiBlczYtc2hpbVxuZGVjbGFyZSBsZXQgU3ltYm9sOiBhbnk7XG5sZXQgX3N5bWJvbEl0ZXJhdG9yOiBhbnkgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKTogc3RyaW5nIHwgc3ltYm9sXG57XG4gICAgaWYgKGlzQmxhbmsoX3N5bWJvbEl0ZXJhdG9yKSkge1xuICAgICAgICBpZiAoaXNQcmVzZW50KFN5bWJvbC5pdGVyYXRvcikpIHtcbiAgICAgICAgICAgIF9zeW1ib2xJdGVyYXRvciA9IFN5bWJvbC5pdGVyYXRvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzNi1zaGltIHNwZWNpZmljIGxvZ2ljXG4gICAgICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE1hcC5wcm90b3R5cGUpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2VudHJpZXMnICYmIGtleSAhPT0gJ3NpemUnICYmXG4gICAgICAgICAgICAgICAgICAgIChNYXAgYXMgYW55KS5wcm90b3R5cGVba2V5XSA9PT0gTWFwLnByb3RvdHlwZVsnZW50cmllcyddKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgX3N5bWJvbEl0ZXJhdG9yID0ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX3N5bWJvbEl0ZXJhdG9yO1xufVxuXG5jb25zdCBSZXNlcnZlZEtleXdvcmQgPSBbJ2NsYXNzJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsRXhwcmVzc2lvbihleHByOiBzdHJpbmcsIGRlY2xhcmF0aW9uczogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBhbnlcbntcbiAgICBsZXQgZm5Cb2R5ID0gYCR7ZGVjbGFyYXRpb25zfVxcblxcdHJldHVybiAke2V4cHJ9XFxuLy8jIHNvdXJjZVVSTD1BcmliYUV4cHJlc3Npb25gO1xuICAgIGxldCBmbkFyZ05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBmbkFyZ1ZhbHVlczogYW55W10gPSBbXTtcbiAgICBmb3IgKGxldCBhcmdOYW1lIGluIGxldHMpIHtcbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwgYXJnTmFtZSkpIHtcbiAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChhcmdOYW1lKTtcbiAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2gobGV0c1thcmdOYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxldHMgaW5zdGFuY2VvZiBFeHRlbnNpYmxlKSB7XG4gICAgICAgIGxldCBleHRWYWx1ZXM6IEV4dGVuc2libGUgPSBsZXRzO1xuXG4gICAgICAgIGV4dFZhbHVlcy5leHRlbmRlZEZpZWxkcygpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGV4cHIsIGtleSkgJiZcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xICYmIFJlc2VydmVkS2V5d29yZC5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICBrZXkpID09PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICBmbkFyZ1ZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZm5BcmdOYW1lcy5wdXNoKCd0aGlzJyk7XG4gICAgLy8gZm5BcmdWYWx1ZXMucHVzaChsZXRzKTtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKC4uLmZuQXJnTmFtZXMuY29uY2F0KGZuQm9keSkpKC4uLmZuQXJnVmFsdWVzKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXZhbEV4cHJlc3Npb25XaXRoQ250eChleHByOiBzdHJpbmcsIGRlY2xhcmF0aW9uczogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0czogeyBba2V5OiBzdHJpbmddOiBhbnkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNDb250ZXh0OiBhbnkpOiBhbnlcbntcbiAgICBsZXQgZm5Cb2R5ID0gYCR7ZGVjbGFyYXRpb25zfVxcblxcdHJldHVybiAke2V4cHJ9XFxuLy8jIHNvdXJjZVVSTD1BcmliYUV4cHJlc3Npb25gO1xuICAgIGxldCBmbkFyZ05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBmbkFyZ1ZhbHVlczogYW55W10gPSBbXTtcbiAgICBmb3IgKGxldCBhcmdOYW1lIGluIGxldHMpIHtcbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwgYXJnTmFtZSkpIHtcbiAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChhcmdOYW1lKTtcbiAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2gobGV0c1thcmdOYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxldHMgaW5zdGFuY2VvZiBFeHRlbnNpYmxlKSB7XG4gICAgICAgIGxldCBleHRWYWx1ZXM6IEV4dGVuc2libGUgPSBsZXRzO1xuXG4gICAgICAgIGV4dFZhbHVlcy5leHRlbmRlZEZpZWxkcygpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGV4cHIsIGtleSkgJiZcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xICYmIFJlc2VydmVkS2V5d29yZC5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICBrZXkpID09PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICBmbkFyZ1ZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZm5BcmdOYW1lcy5wdXNoKCd0aGlzJyk7XG4gICAgLy8gZm5BcmdWYWx1ZXMucHVzaChsZXRzKTtcbiAgICBsZXQgZm4gPSBuZXcgRnVuY3Rpb24oLi4uZm5BcmdOYW1lcy5jb25jYXQoZm5Cb2R5KSk7XG4gICAgYXNzZXJ0KGlzUHJlc2VudChmbiksICdDYW5ub3QgZXZhbHVhdGUgZXhwcmVzc2lvbi4gRk4gaXMgbm90IGRlZmluZWQnKTtcbiAgICBsZXQgZm5Cb3VuZCA9IGZuLmJpbmQodGhpc0NvbnRleHQpO1xuXG4gICAgcmV0dXJuIGZuQm91bmQoLi4uZm5BcmdWYWx1ZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmltaXRpdmUob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuICFpc0pzT2JqZWN0KG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb25zdHJ1Y3Rvcih2YWx1ZTogT2JqZWN0LCB0eXBlOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlKHM6IHN0cmluZyk6IHN0cmluZ1xue1xuICAgIHJldHVybiBlbmNvZGVVUkkocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoczogc3RyaW5nKTogc3RyaW5nXG57XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvKFsuKis/Xj0hOiR7fSgpfFtcXF1cXC9cXFxcXSkvZywgJ1xcXFwkMScpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoQ29kZShzdHI6IHN0cmluZyk6IG51bWJlclxue1xuICAgIGxldCBoYXNoID0gMDtcbiAgICBsZXQgY2hhcjogbnVtYmVyO1xuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBoYXNoO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RWYWx1ZXMob2JqOiBhbnkpOiBhbnlbXVxue1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pO1xufVxuXG4vKipcbiAqXG4gKiBDb252ZXJ0cyBvYmplY3QgdG8gYSBuYW1lO1xuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdFRvTmFtZSh0YXJnZXQ6IGFueSk6IHN0cmluZ1xue1xuICAgIGlmIChpc0JsYW5rKHRhcmdldCkgfHwgKCFpc1N0cmluZ01hcCh0YXJnZXQpICYmICFpc1R5cGUodGFyZ2V0KSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCcgQ2Fubm90IGNvbnZlcnQuIFVrbm93biBvYmplY3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNUeXBlKHRhcmdldCkgPyB0YXJnZXQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWUgOiB0YXJnZXQuY29uc3RydWN0b3IubmFtZTtcbn1cblxuLyoqXG4gKlxuICogQmFzaWMgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgVVVJRCB0YWtlbiBmcm9tIFczQyBmcm9tIG9uZSBvZiB0aGUgZXhhbXBsZXNcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1dWlkKCk6IHN0cmluZ1xue1xuICAgIGxldCBkdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGxldCBwcm90byA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZyxcbiAgICAgICAgKGM6IHN0cmluZykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHIgPSAoZHQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xuICAgICAgICAgICAgZHQgPSBNYXRoLmZsb29yKGR0IC8gMTYpO1xuICAgICAgICAgICAgcmV0dXJuIChjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVjayBvYmplY3QgZXF1YWxpdHkgZGVyaXZlZCBmcm9tIGFuZ3VsYXIuZXF1YWxzIDEuNSBpbXBsZW1lbnRhdGlvblxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhvMTogYW55LCBvMjogYW55KTogYm9vbGVhblxue1xuICAgIGlmIChvMSA9PT0gbzIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvMSA9PT0gbnVsbCB8fCBvMiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAobzEgIT09IG8xICYmIG8yICE9PSBvMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gTmFOID09PSBOYU5cbiAgICB9XG5cbiAgICBsZXQgdDEgPSB0eXBlb2YgbzEsIHQyID0gdHlwZW9mIG8yLCBsZW5ndGg6IGFueSwga2V5OiBhbnksIGtleVNldDogYW55O1xuICAgIGlmICh0MSA9PT0gdDIgJiYgdDEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG8xKSkge1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KG8yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgobGVuZ3RoID0gbzEubGVuZ3RoKSA9PT0gbzIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgPSAwOyBrZXkgPCBsZW5ndGg7IGtleSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXF1YWxzKG8xW2tleV0sIG8yW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKG8xKSkge1xuICAgICAgICAgICAgaWYgKCFpc0RhdGUobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhvMS5nZXRUaW1lKCksIG8yLmdldFRpbWUoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNSZWdFeHAobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzUmVnRXhwKG8yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvMS50b1N0cmluZygpID09PSBvMi50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzV2luZG93KG8xKSB8fCBpc1dpbmRvdyhvMikgfHxcbiAgICAgICAgICAgICAgICBpc0FycmF5KG8yKSB8fCBpc0RhdGUobzIpIHx8IGlzUmVnRXhwKG8yKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlTZXQgPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcbiAgICAgICAgICAgIC8vIHVzaW5nIE9iamVjdC5rZXlzIGFzIGl0ZXJhdGluZyB0aHJ1IG9iamVjdCBzdG9wIHdvcmtpbmcgaW4gTkc2LCBUUzIuN1xuICAgICAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvMik7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleXNba2V5XS5jaGFyQXQoMCkgPT09ICckJyB8fCBpc0Z1bmN0aW9uKG8xW2tleXNba2V5XV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWVxdWFscyhvMVtrZXlzW2tleV1dLCBvMltrZXlzW2tleV1dKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleVNldC5zZXQoa2V5c1trZXldLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKG8yKTtcbiAgICAgICAgICAgIGZvciAoa2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIShrZXlTZXQuaGFzKGtleSkpICYmIGtleS5jaGFyQXQoMCkgIT09ICckJ1xuICAgICAgICAgICAgICAgICAgICAmJiBpc1ByZXNlbnQobzJba2V5XSkgJiYgIWlzRnVuY3Rpb24obzJba2V5XSkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5cbi8qKlxuICogdHJhbnNmb3JtIGEgc3RyaW5nIGludG8gZGVjYW1lbC4gZm9ybS4gTW9zdGx5IHVzZWQgd2hlbiByZWFkaW5nIGNsYXNzIG5hbWVzIG9yIGZpZWxkIG5hbWVzXG4gKiBzdWNoIGZpcnN0TmFtZSBhbmQgd2Ugd2FudCB0byBjcmVhdGUgYSBsYWJlbCBGaXJzdCBOYW1lXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2FtZWxpemUoc3RyaW5nOiBzdHJpbmcsIHNlcGFyYXRvcjogc3RyaW5nID0gJyAnLCBpbml0aWFsQ2FwczogYm9vbGVhbiA9IHRydWUpXG57XG4gICAgaWYgKGlzQmxhbmsoc3RyaW5nKSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgbGV0IGxhc3RVQ0luZGV4ID0gLTE7XG4gICAgbGV0IGFsbENhcHMgPSB0cnVlO1xuXG4gICAgbGV0IHNwbGl0T25VQyA9ICFTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKHN0cmluZywgJ18nKTtcbiAgICBsZXQgYnVmID0gJyc7XG4gICAgbGV0IGluV29yZCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gc3RyaW5nLmxlbmd0aDsgaW5Xb3JkIDwgaTsgKytpbldvcmQpIHtcbiAgICAgICAgbGV0IGMgPSBzdHJpbmdbaW5Xb3JkXTtcblxuICAgICAgICBpZiAoYy50b1VwcGVyQ2FzZSgpID09PSBjKSB7XG4gICAgICAgICAgICBpZiAoKGluV29yZCAtIDEpICE9PSBsYXN0VUNJbmRleCAmJiBzcGxpdE9uVUMpIHtcbiAgICAgICAgICAgICAgICBidWYgKz0gc2VwYXJhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdFVDSW5kZXggPSBpbldvcmQ7XG4gICAgICAgICAgICBpZiAoIWluaXRpYWxDYXBzKSB7XG4gICAgICAgICAgICAgICAgYyA9IGMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjLnRvTG93ZXJDYXNlKCkgPT09IGMpIHtcbiAgICAgICAgICAgIGlmIChpbldvcmQgPT09IDAgJiYgaW5pdGlhbENhcHMpIHtcbiAgICAgICAgICAgICAgICBjID0gYy50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWxsQ2FwcyA9IGZhbHNlO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoYyAhPT0gJ18nKSB7XG4gICAgICAgICAgICBjID0gc2VwYXJhdG9yO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZiArPSBjO1xuICAgIH1cblxuICAgIGlmIChhbGxDYXBzKSB7XG4gICAgICAgIGxldCB0b0NhcHMgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSBidWYubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2ggPSBidWZbaV07XG5cbiAgICAgICAgICAgIGlmIChjaC50b0xvd2VyQ2FzZSgpICE9PSBjaC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluV29yZCAmJiBjaCA9PT0gY2gudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBidWYgPSBidWYuc3Vic3RyKDAsIGkpICsgY2gudG9Mb3dlckNhc2UoKSArIGJ1Zi5zdWJzdHIoaSArIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b0NhcHMgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b0NhcHMgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYnVmO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub25Qcml2YXRlUHJlZml4KGlucHV0OiBzdHJpbmcpOiBzdHJpbmdcbntcbiAgICByZXR1cm4gaW5wdXRbMF0gPT09ICdfJyA/IFN0cmluZ1dyYXBwZXIuc3RyaXBMZWZ0KGlucHV0LCAnXycpIDogaW5wdXQ7XG59XG5cblxuLyoqXG4gKlxuICogVGhpcyBjb25zaWRlcnMgY3VycmVudGx5IG9ubHkgMSBmb3JtIHdoaWNoIHdoZW4gd2UgaGF2ZSBnZXR0ZXIgd2UgaGF2ZSB0aGlzIGZvcm0gZm9yXG4gKiBkZWNsYXJhdGlvbiBfPG5hbWU+IGFuZCBnZXQgPG5hbWU+KCkuIEkgZG8gbm90IGNoZWNrIGFueSBvdGhlciBmb3JtcyBub3cuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0dldHRlcihpbnN0YW5jZTogYW55LCBmaWVsZDogc3RyaW5nKTogYm9vbGVhblxue1xuICAgIGlmIChpc0JsYW5rKGZpZWxkKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIChmaWVsZFswXSA9PT0gJ18nICYmIGlzUHJlc2VudChub25Qcml2YXRlUHJlZml4KGZpZWxkKSkpO1xuXG59XG5cbi8qKlxuICogVGhlIEV4dGVuc2libGUgaW50ZXJmYWNlIGNhbiBiZSBpbXBsZW1lbnRlZCB3aGVuIGEgZ2l2ZW4gY2xhc3NcbiAqIHdhbnRzIHRvIHByb3ZpZGUgZHluYW1pY2FsbHkgYWRkZWQgZmllbGRzLiAgT25jZSB0aGlzIGlzIGltcGxlbWVudGVkXG4gKiB0byByZXR1cm4gYSBNYXAsIHRoZSBGaWVsZFZhbHVlIHN5c3RlbSB3aWxsIGJlIGFibGUgdG8gbG9vayBpblxuICogdGhlIE1hcCB0byBzZWUgaWYgdGhlIGRlc2lyZWQgZmllbGQgZXhpc3RzLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFeHRlbnNpYmxlXG57XG5cbiAgICAvKipcbiAgICAgKiAgUmV0dXJucyB0aGUgTWFwIGluIHdoaWNoIHRoZSBkeW5hbWljYWxseSBhZGRlZCBmaWVsZHMgcmVzaWRlLlxuICAgICAqXG4gICAgICovXG4gICAgZXh0ZW5kZWRGaWVsZHMoKTogTWFwPHN0cmluZywgYW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTtcbiAgICB9XG59XG5cbiJdfQ==