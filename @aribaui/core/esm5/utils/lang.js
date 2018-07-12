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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9sYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBY0EsT0FBTyxLQUFLLGNBQWMsTUFBTSxhQUFhLENBQUM7QUFFOUMscUJBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQzs7Ozs7O0FBUTlCLHFCQUFNLFFBQVEsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDO0FBQ3pELHFCQUFNLE9BQU8sR0FBNEIsUUFBUSxDQUFDOzs7OztBQUdsRCxNQUFNLDBCQUEwQixPQUFZO0lBQ3hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDM0I7Ozs7O0FBRUQsTUFBTSx5QkFBeUIsT0FBWTtJQUN2QyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQzNCOzs7OztBQUdELE1BQU0sa0NBQWtDLElBQVM7SUFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdkI7SUFDRCxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUM7Q0FDdEI7Ozs7QUFFRCxNQUFNO0lBQ0YsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztDQUNwQzs7Ozs7QUFFRCxNQUFNLG9CQUFvQixHQUFRO0lBQzlCLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7Q0FDNUM7Ozs7O0FBRUQsTUFBTSxrQkFBa0IsR0FBUTtJQUM1QixNQUFNLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDO0NBQzVDOzs7OztBQUVELE1BQU0sb0JBQW9CLEdBQVE7SUFDOUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLFNBQVMsQ0FBQztDQUNu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Q0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDakU7Z0JBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNqQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDbEI7U0FDSjtLQUNKO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztDQUNkOzs7OztBQUdELE1BQU0sMkJBQTJCLEtBQWE7SUFDMUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Q0FDekU7Ozs7Ozs7Ozs7O0FBVUQsTUFBTSxvQkFBb0IsUUFBYSxFQUFFLEtBQWE7SUFDbEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0lBRUQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBRW5FOzs7Ozs7Ozs7O0FBVUQ7Ozs7Ozs7OztBQUFBOzs7SUFFSTs7O09BR0c7Ozs7OztJQUNILG1DQUFjOzs7OztJQUFkO1FBQ0ksTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCO3FCQWgwQkw7SUFpMEJDLENBQUE7Ozs7Ozs7Ozs7QUFURCxzQkFTQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBvcmlnaW5hbC1saWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqXG4gKlxuICpcbiAqICBDcmVkaXQ6IERlcml2ZWQgYW5kIGV4dGVuZGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhciBpbiBvcmRlciB0byBoYXZlIHNldCBvZlxuICogIHJldXNhYmxlIGdsb2JhbHMuIFNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJIG5lZWQgdG8gaGF2ZSBhIGNvcHkgdW5kZXIgY29yZS5cbiAqL1xuaW1wb3J0ICogYXMgYmlnSW50SW1wb3J0ZWQgZnJvbSAnYmlnLWludGVnZXInO1xuXG5jb25zdCBiaWdJbnQgPSBiaWdJbnRJbXBvcnRlZDtcblxuLyoqXG4gKiAgU2V0IG9mIHJldXNhYmxlIGdsb2JhbHMuIFRoaXMgaXMgdGFrZW4gZnJvbSB0aGUgQW5ndWxhciAyIHNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJLiBBbmQgdGhlcmVcbiAqICBpcyBhIG5lZWQgZm9yIHN1Y2ggY29tbW9uIGZ1bmN0aW9ucyBhbmQgd3JhcHBlcnNcbiAqXG4gKi9cblxuY29uc3QgX193aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG5jb25zdCBfZ2xvYmFsOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IF9fd2luZG93O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkR2xvYmFsUGFyYW0odmFyTmFtZTogYW55KTogeyBbbmFtZTogc3RyaW5nXTogYW55IH0ge1xuICAgIHJldHVybiBfZ2xvYmFsW3Zhck5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEdsb2JhbFR5cGUodmFyTmFtZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gX2dsb2JhbFt2YXJOYW1lXTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcodHlwZTogYW55KTogc3RyaW5nIHtcbiAgICBpZiAodHlwZVsnbmFtZSddKSB7XG4gICAgICAgIHJldHVybiB0eXBlWyduYW1lJ107XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgdHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaW1wbGVtZW50ZWQoKTogYW55IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJlc2VudChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbihvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKG9iajogYW55KTogb2JqIGlzIHN0cmluZyB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24ob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nTWFwKG9iajogYW55KTogb2JqIGlzIE9iamVjdCB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbDtcbn1cblxuY29uc3QgU1RSSU5HX01BUF9QUk9UTyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih7fSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmljdFN0cmluZ01hcChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1N0cmluZ01hcChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBTVFJJTkdfTUFQX1BST1RPO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgLy8gYWxsb3cgYW55IFByb21pc2UvQSsgY29tcGxpYW50IHRoZW5hYmxlLlxuICAgIC8vIEl0J3MgdXAgdG8gdGhlIGNhbGxlciB0byBlbnN1cmUgdGhhdCBvYmoudGhlbiBjb25mb3JtcyB0byB0aGUgc3BlY1xuICAgIHJldHVybiBpc1ByZXNlbnQob2JqKSAmJiBpc0Z1bmN0aW9uKG9iai50aGVuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlKG9iajogYW55KTogb2JqIGlzIERhdGUge1xuICAgIHJldHVybiAob2JqIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ob2JqLnZhbHVlT2YoKSkpIHx8XG4gICAgICAgIChpc1ByZXNlbnQob2JqKSAmJiBpc0Z1bmN0aW9uKG9iai5ub3cpKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc0pzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopIHx8XG4gICAgICAgICghKG9iaiBpbnN0YW5jZW9mIE1hcCkgJiYgICAgICAvLyBKUyBNYXAgYXJlIGl0ZXJhYmxlcyBidXQgcmV0dXJuIGVudHJpZXMgYXMgW2ssIHZdXG4gICAgICAgICAgICBnZXRTeW1ib2xJdGVyYXRvcigpIGluIG9iaik7ICAvLyBKUyBJdGVyYWJsZSBoYXZlIGEgU3ltYm9sLml0ZXJhdG9yIHByb3Bcbn1cblxuXG4vKipcbiAqIENoZWNrcyBpZiBgb2JqYCBpcyBhIHdpbmRvdyBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNXaW5kb3cob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai53aW5kb3cgPT09IG9iajtcbn1cblxuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZWdFeHAodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2hpZnRMZWZ0KGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gYmlnSW50KGEpLnNoaWZ0TGVmdChiKS52YWx1ZU9mKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaWZ0UmlnaHQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBiaWdJbnQoYSkuc2hpZnRSaWdodChiKS52YWx1ZU9mKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeSh0b2tlbjogYW55KTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRva2VuID09PSB1bmRlZmluZWQgfHwgdG9rZW4gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnICsgdG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRva2VuLm92ZXJyaWRkZW5OYW1lKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi5vdmVycmlkZGVuTmFtZTtcbiAgICB9XG4gICAgaWYgKHRva2VuLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuLm5hbWU7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IHRva2VuLnRvU3RyaW5nKCk7XG4gICAgbGV0IG5ld0xpbmVJbmRleCA9IHJlcy5pbmRleE9mKCdcXG4nKTtcbiAgICByZXR1cm4gKG5ld0xpbmVJbmRleCA9PT0gLTEpID8gcmVzIDogcmVzLnN1YnN0cmluZygwLCBuZXdMaW5lSW5kZXgpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc05hbWUoY2xheno6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKGlzUHJlc2VudChjbGF6ei5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgbGV0IGNsYXNzTiA9IGNsYXp6LmNvbnN0cnVjdG9yLnRvU3RyaW5nKCk7XG4gICAgICAgIGNsYXNzTiA9IGNsYXNzTi5zdWJzdHIoJ2Z1bmN0aW9uICcubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGNsYXNzTi5zdWJzdHIoMCwgY2xhc3NOLmluZGV4T2YoJygnKSk7XG4gICAgfVxuICAgIHJldHVybiBjbGF6ejtcbn1cblxuXG4vKipcbiAqICBTb3VyY2U6IGh0dHBzOi8vd3d3LnR5cGVzY3JpcHRsYW5nLm9yZy9kb2NzL2hhbmRib29rL21peGlucy5odG1sXG4gKlxuICogIEZ1bmN0aW9uIHRoYXQgY29waWVzIHByb3BlcnRpZXMgb2YgdGhlIGJhc2VDdG9ycyB0byBkZXJpdmVkQ3Rvci5cbiAqICBDYW4gYmUgdXNlZCB0byBhY2hpZXZlIG11bHRpcGxlIGluaGVyaXRhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlNaXhpbnMoZGVyaXZlZEN0b3I6IGFueSwgYmFzZUN0b3JzOiBhbnlbXSkge1xuICAgIGJhc2VDdG9ycy5mb3JFYWNoKGJhc2VDdG9yID0+IHtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmFzZUN0b3IucHJvdG90eXBlKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgZGVyaXZlZEN0b3IucHJvdG90eXBlW25hbWVdXG4gICAgICAgICAgICAgICAgPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nV3JhcHBlciB7XG4gICAgc3RhdGljIGZyb21DaGFyQ29kZShjb2RlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hhckNvZGVBdChzOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3BsaXQoczogc3RyaW5nLCByZWdFeHA6IFJlZ0V4cCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHMuc3BsaXQocmVnRXhwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKHM6IHN0cmluZywgczI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcyA9PT0gczI7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0cmlwTGVmdChzOiBzdHJpbmcsIGNoYXJWYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmIChzICYmIHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzW2ldICE9PSBjaGFyVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMgPSBzLnN1YnN0cmluZyhwb3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdHJpcFJpZ2h0KHM6IHN0cmluZywgY2hhclZhbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNbaV0gIT09IGNoYXJWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2Uoczogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgcmVwbGFjZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2VBbGwoczogc3RyaW5nLCBmcm9tOiBSZWdFeHAsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgcmVwbGFjZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNsaWNlPFQ+KHM6IHN0cmluZywgZnJvbTogbnVtYmVyID0gMCwgdG86IG51bWJlciA9IG51bGwpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gcy5zbGljZShmcm9tLCB0byA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHRvKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnMoczogc3RyaW5nLCBzdWJzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcy5pbmRleE9mKHN1YnN0cikgIT09IC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb21wYXJlKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBlbmRzV2lkdGgoc3ViamVjdDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDApOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSB7XG4gICAgICAgICAgICBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHNzdHJpbmcsIHBvcyA9IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgc3ViamVjdFN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBvcyAhPT0gJ251bWJlcicgfHwgIWlzRmluaXRlKHBvcykgfHwgTWF0aC5mbG9vcihwb3MpICE9PSBwb3MgfHwgcG9zXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdFN0cmluZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gc3ViamVjdFN0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcyAtPSBzc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEluZGV4ID0gc3ViamVjdFN0cmluZy5pbmRleE9mKHNzdHJpbmcsIHBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3M7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmVuZHNXaXRoKHNlYXJjaFN0cmluZyk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgc3RhcnRzV2lkdGgoc3ViamVjdDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gc3ViamVjdC5pbmRleE9mKHNlYXJjaFN0cmluZykgPT09IDA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nSm9pbmVyIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFydHM6IHN0cmluZ1tdID0gW10pIHtcbiAgICB9XG5cbiAgICBhZGQocGFydDogc3RyaW5nKTogU3RyaW5nSm9pbmVyIHtcbiAgICAgICAgdGhpcy5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIGxhc3QoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHNbdGhpcy5wYXJ0cy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0cy5qb2luKCcnKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE51bWJlcldyYXBwZXIge1xuICAgIHN0YXRpYyB0b0ZpeGVkKG46IG51bWJlciwgZnJhY3Rpb25EaWdpdHM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBuLnRvRml4ZWQoZnJhY3Rpb25EaWdpdHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbChhOiBudW1iZXIsIGI6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VJbnRBdXRvUmFkaXgodGV4dDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCk7XG4gICAgICAgIGlmIChpc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50ZWdlciBsaXRlcmFsIHdoZW4gcGFyc2luZyAnICsgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VJbnQodGV4dDogc3RyaW5nLCByYWRpeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHJhZGl4ID09PSAxMCkge1xuICAgICAgICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTldKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJhZGl4ID09PSAxNikge1xuICAgICAgICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTlBQkNERUZhYmNkZWZdKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCBpbnRlZ2VyIGxpdGVyYWwgd2hlbiBwYXJzaW5nICcgKyB0ZXh0ICsgJyBpbiBiYXNlICcgKyByYWRpeCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogTmFOIGlzIGEgdmFsaWQgbGl0ZXJhbCBidXQgaXMgcmV0dXJuZWQgYnkgcGFyc2VGbG9hdCB0byBpbmRpY2F0ZSBhbiBlcnJvci5cbiAgICBzdGF0aWMgcGFyc2VGbG9hdCh0ZXh0OiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0ZXh0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOdW1lcmljKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFpc05hTih2YWx1ZSAtIHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOYU4odmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0ludGVnZXIodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25XcmFwcGVyIHtcbiAgICBzdGF0aWMgYXBwbHkoZm46IEZ1bmN0aW9uLCBwb3NBcmdzOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgcG9zQXJncyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGJpbmQoZm46IEZ1bmN0aW9uLCBzY29wZTogYW55KTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gZm4uYmluZChzY29wZSk7XG4gICAgfVxufVxuXG4vLyBKUyBoYXMgTmFOICE9PSBOYU5cbmV4cG9ydCBmdW5jdGlvbiBsb29zZUlkZW50aWNhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhID09PSBiIHx8IHR5cGVvZiBhID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgYiA9PT0gJ251bWJlcicgJiYgaXNOYU4oYSkgJiYgaXNOYU4oYik7XG59XG5cbi8vIEpTIGNvbnNpZGVycyBOYU4gaXMgdGhlIHNhbWUgYXMgTmFOIGZvciBtYXAgS2V5ICh3aGlsZSBOYU4gIT09IE5hTiBvdGhlcndpc2UpXG4vLyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFwS2V5PFQ+KHZhbHVlOiBUKTogVCB7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQmxhbmsob2JqOiBPYmplY3QpOiBhbnkge1xuICAgIHJldHVybiBpc0JsYW5rKG9iaikgPyBudWxsIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQm9vbChvYmo6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNCbGFuayhvYmopID8gZmFsc2UgOiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0pzT2JqZWN0KG86IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvICE9PSBudWxsICYmICh0eXBlb2YgbyA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgbyA9PT0gJ29iamVjdCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnQob2JqOiBFcnJvciB8IE9iamVjdCkge1xuICAgIGNvbnNvbGUubG9nKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuKG9iajogRXJyb3IgfCBPYmplY3QpIHtcbiAgICBjb25zb2xlLndhcm4ob2JqKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbjogYm9vbGVhbiwgbXNnOiBzdHJpbmcpIHtcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja3N1bShzOiBhbnkpIHtcbiAgICBsZXQgY2hrID0gMHgxMjM0NTY3ODtcbiAgICBsZXQgbGVuID0gcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGsgKz0gKHMuY2hhckNvZGVBdChpKSAqIChpICsgMSkpO1xuICAgIH1cblxuICAgIHJldHVybiAoY2hrICYgMHhmZmZmZmZmZikudG9TdHJpbmcoMTYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JjMzIoY3JjOiBudW1iZXIsIGFuSW50OiBudW1iZXIpIHtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgIGxldCB0YWJsZSA9ICcwMDAwMDAwMCA3NzA3MzA5NiBFRTBFNjEyQyA5OTA5NTFCQSAwNzZEQzQxOSA3MDZBRjQ4RiBFOTYzQTUzNSA5RTY0OTVBMyAwRURCODgzMiA3OURDQjhBNCBFMEQ1RTkxRSA5N0QyRDk4OCAwOUI2NEMyQiA3RUIxN0NCRCBFN0I4MkQwNyA5MEJGMUQ5MSAxREI3MTA2NCA2QUIwMjBGMiBGM0I5NzE0OCA4NEJFNDFERSAxQURBRDQ3RCA2RERERTRFQiBGNEQ0QjU1MSA4M0QzODVDNyAxMzZDOTg1NiA2NDZCQThDMCBGRDYyRjk3QSA4QTY1QzlFQyAxNDAxNUM0RiA2MzA2NkNEOSBGQTBGM0Q2MyA4RDA4MERGNSAzQjZFMjBDOCA0QzY5MTA1RSBENTYwNDFFNCBBMjY3NzE3MiAzQzAzRTREMSA0QjA0RDQ0NyBEMjBEODVGRCBBNTBBQjU2QiAzNUI1QThGQSA0MkIyOTg2QyBEQkJCQzlENiBBQ0JDRjk0MCAzMkQ4NkNFMyA0NURGNUM3NSBEQ0Q2MERDRiBBQkQxM0Q1OSAyNkQ5MzBBQyA1MURFMDAzQSBDOEQ3NTE4MCBCRkQwNjExNiAyMUI0RjRCNSA1NkIzQzQyMyBDRkJBOTU5OSBCOEJEQTUwRiAyODAyQjg5RSA1RjA1ODgwOCBDNjBDRDlCMiBCMTBCRTkyNCAyRjZGN0M4NyA1ODY4NEMxMSBDMTYxMURBQiBCNjY2MkQzRCA3NkRDNDE5MCAwMURCNzEwNiA5OEQyMjBCQyBFRkQ1MTAyQSA3MUIxODU4OSAwNkI2QjUxRiA5RkJGRTRBNSBFOEI4RDQzMyA3ODA3QzlBMiAwRjAwRjkzNCA5NjA5QTg4RSBFMTBFOTgxOCA3RjZBMERCQiAwODZEM0QyRCA5MTY0NkM5NyBFNjYzNUMwMSA2QjZCNTFGNCAxQzZDNjE2MiA4NTY1MzBEOCBGMjYyMDA0RSA2QzA2OTVFRCAxQjAxQTU3QiA4MjA4RjRDMSBGNTBGQzQ1NyA2NUIwRDlDNiAxMkI3RTk1MCA4QkJFQjhFQSBGQ0I5ODg3QyA2MkREMURERiAxNURBMkQ0OSA4Q0QzN0NGMyBGQkQ0NEM2NSA0REIyNjE1OCAzQUI1NTFDRSBBM0JDMDA3NCBENEJCMzBFMiA0QURGQTU0MSAzREQ4OTVENyBBNEQxQzQ2RCBEM0Q2RjRGQiA0MzY5RTk2QSAzNDZFRDlGQyBBRDY3ODg0NiBEQTYwQjhEMCA0NDA0MkQ3MyAzMzAzMURFNSBBQTBBNEM1RiBERDBEN0NDOSA1MDA1NzEzQyAyNzAyNDFBQSBCRTBCMTAxMCBDOTBDMjA4NiA1NzY4QjUyNSAyMDZGODVCMyBCOTY2RDQwOSBDRTYxRTQ5RiA1RURFRjkwRSAyOUQ5Qzk5OCBCMEQwOTgyMiBDN0Q3QThCNCA1OUIzM0QxNyAyRUI0MEQ4MSBCN0JENUMzQiBDMEJBNkNBRCBFREI4ODMyMCA5QUJGQjNCNiAwM0I2RTIwQyA3NEIxRDI5QSBFQUQ1NDczOSA5REQyNzdBRiAwNERCMjYxNSA3M0RDMTY4MyBFMzYzMEIxMiA5NDY0M0I4NCAwRDZENkEzRSA3QTZBNUFBOCBFNDBFQ0YwQiA5MzA5RkY5RCAwQTAwQUUyNyA3RDA3OUVCMSBGMDBGOTM0NCA4NzA4QTNEMiAxRTAxRjI2OCA2OTA2QzJGRSBGNzYyNTc1RCA4MDY1NjdDQiAxOTZDMzY3MSA2RTZCMDZFNyBGRUQ0MUI3NiA4OUQzMkJFMCAxMERBN0E1QSA2N0RENEFDQyBGOUI5REY2RiA4RUJFRUZGOSAxN0I3QkU0MyA2MEIwOEVENSBENkQ2QTNFOCBBMUQxOTM3RSAzOEQ4QzJDNCA0RkRGRjI1MiBEMUJCNjdGMSBBNkJDNTc2NyAzRkI1MDZERCA0OEIyMzY0QiBEODBEMkJEQSBBRjBBMUI0QyAzNjAzNEFGNiA0MTA0N0E2MCBERjYwRUZDMyBBODY3REY1NSAzMTZFOEVFRiA0NjY5QkU3OSBDQjYxQjM4QyBCQzY2ODMxQSAyNTZGRDJBMCA1MjY4RTIzNiBDQzBDNzc5NSBCQjBCNDcwMyAyMjAyMTZCOSA1NTA1MjYyRiBDNUJBM0JCRSBCMkJEMEIyOCAyQkI0NUE5MiA1Q0IzNkEwNCBDMkQ3RkZBNyBCNUQwQ0YzMSAyQ0Q5OUU4QiA1QkRFQUUxRCA5QjY0QzJCMCBFQzYzRjIyNiA3NTZBQTM5QyAwMjZEOTMwQSA5QzA5MDZBOSBFQjBFMzYzRiA3MjA3Njc4NSAwNTAwNTcxMyA5NUJGNEE4MiBFMkI4N0ExNCA3QkIxMkJBRSAwQ0I2MUIzOCA5MkQyOEU5QiBFNUQ1QkUwRCA3Q0RDRUZCNyAwQkRCREYyMSA4NkQzRDJENCBGMUQ0RTI0MiA2OEREQjNGOCAxRkRBODM2RSA4MUJFMTZDRCBGNkI5MjY1QiA2RkIwNzdFMSAxOEI3NDc3NyA4ODA4NUFFNiBGRjBGNkE3MCA2NjA2M0JDQSAxMTAxMEI1QyA4RjY1OUVGRiBGODYyQUU2OSA2MTZCRkZEMyAxNjZDQ0Y0NSBBMDBBRTI3OCBENzBERDJFRSA0RTA0ODM1NCAzOTAzQjNDMiBBNzY3MjY2MSBEMDYwMTZGNyA0OTY5NDc0RCAzRTZFNzdEQiBBRUQxNkE0QSBEOUQ2NUFEQyA0MERGMEI2NiAzN0Q4M0JGMCBBOUJDQUU1MyBERUJCOUVDNSA0N0IyQ0Y3RiAzMEI1RkZFOSBCREJERjIxQyBDQUJBQzI4QSA1M0IzOTMzMCAyNEI0QTNBNiBCQUQwMzYwNSBDREQ3MDY5MyA1NERFNTcyOSAyM0Q5NjdCRiBCMzY2N0EyRSBDNDYxNEFCOCA1RDY4MUIwMiAyQTZGMkI5NCBCNDBCQkUzNyBDMzBDOEVBMSA1QTA1REYxQiAyRDAyRUY4RCc7XG4gICAgLyogdHNsaW50OmVuYWJsZSAqL1xuXG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcblxuICAgIGxldCBteUNyYyA9IGNyYyBeICgtMSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgeSA9IChjcmMgXiBhbkludCkgJiAweEZGO1xuICAgICAgICB4ID0gTnVtYmVyKCcweCcgKyB0YWJsZS5zdWJzdHIoeSAqIDksIDgpKTtcbiAgICAgICAgY3JjID0gKGNyYyA+Pj4gOCkgXiB4O1xuICAgIH1cbiAgICByZXR1cm4gY3JjIF4gKC0xKTtcbn1cblxuXG4vLyBDYW4ndCBiZSBhbGwgdXBwZXJjYXNlIGFzIG91ciB0cmFuc3BpbGVyIHdvdWxkIHRoaW5rIGl0IGlzIGEgc3BlY2lhbCBkaXJlY3RpdmUuLi5cbmV4cG9ydCBjbGFzcyBKc29uIHtcbiAgICBzdGF0aWMgcGFyc2Uoczogc3RyaW5nKTogT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uocyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0cmluZ2lmeShkYXRhOiBPYmplY3QpOiBzdHJpbmcge1xuICAgICAgICAvLyBEYXJ0IGRvZXNuJ3QgdGFrZSAzIGFyZ3VtZW50c1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0ZVdyYXBwZXIge1xuICAgIHN0YXRpYyBjcmVhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyID0gMSwgZGF5OiBudW1iZXIgPSAxLCBob3VyOiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgICAgbWludXRlczogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICAgIHNlY29uZHM6IG51bWJlciA9IDAsIG1pbGxpc2Vjb25kczogbnVtYmVyID0gMCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21JU09TdHJpbmcoc3RyOiBzdHJpbmcpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHN0cik7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21NaWxsaXMobXM6IG51bWJlcik6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUobXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b01pbGxpcyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBub3coKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b0pzb24oZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkYXRlLnRvSlNPTigpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQm9vbGVhbldyYXBwZXIge1xuXG4gICAgc3RhdGljIGJvbGVhblZhbHVlKHZhbHVlOiBhbnkgPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodmFsdWUgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgaXNGYWxzZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ2ZhbHNlJztcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZ01hcCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlID09PSBmYWxzZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzVHJ1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nTWFwKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgPT09IHRydWUpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cblxuLy8gV2hlbiBTeW1ib2wuaXRlcmF0b3IgZG9lc24ndCBleGlzdCwgcmV0cmlldmVzIHRoZSBrZXkgdXNlZCBpbiBlczYtc2hpbVxuZGVjbGFyZSBsZXQgU3ltYm9sOiBhbnk7XG5sZXQgX3N5bWJvbEl0ZXJhdG9yOiBhbnkgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKTogc3RyaW5nIHwgc3ltYm9sIHtcbiAgICBpZiAoaXNCbGFuayhfc3ltYm9sSXRlcmF0b3IpKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoU3ltYm9sLml0ZXJhdG9yKSkge1xuICAgICAgICAgICAgX3N5bWJvbEl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZXM2LXNoaW0gc3BlY2lmaWMgbG9naWNcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTWFwLnByb3RvdHlwZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnZW50cmllcycgJiYga2V5ICE9PSAnc2l6ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgKE1hcCBhcyBhbnkpLnByb3RvdHlwZVtrZXldID09PSBNYXAucHJvdG90eXBlWydlbnRyaWVzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgX3N5bWJvbEl0ZXJhdG9yID0ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX3N5bWJvbEl0ZXJhdG9yO1xufVxuXG5jb25zdCBSZXNlcnZlZEtleXdvcmQgPSBbJ2NsYXNzJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsRXhwcmVzc2lvbihleHByOiBzdHJpbmcsIGRlY2xhcmF0aW9uczogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBhbnkge1xuICAgIGxldCBmbkJvZHkgPSBgJHtkZWNsYXJhdGlvbnN9XFxuXFx0cmV0dXJuICR7ZXhwcn1cXG4vLyMgc291cmNlVVJMPUFyaWJhRXhwcmVzc2lvbmA7XG4gICAgbGV0IGZuQXJnTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGZuQXJnVmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGFyZ05hbWUgaW4gbGV0cykge1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBhcmdOYW1lKSkge1xuICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaChsZXRzW2FyZ05hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGV0cyBpbnN0YW5jZW9mIEV4dGVuc2libGUpIHtcbiAgICAgICAgbGV0IGV4dFZhbHVlczogRXh0ZW5zaWJsZSA9IGxldHM7XG5cbiAgICAgICAgZXh0VmFsdWVzLmV4dGVuZGVkRmllbGRzKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwga2V5KSAmJlxuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEgJiYgUmVzZXJ2ZWRLZXl3b3JkLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGZuQXJnTmFtZXMucHVzaCgndGhpcycpO1xuICAgIC8vIGZuQXJnVmFsdWVzLnB1c2gobGV0cyk7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKSguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWxFeHByZXNzaW9uV2l0aENudHgoZXhwcjogc3RyaW5nLCBkZWNsYXJhdGlvbnM6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzQ29udGV4dDogYW55KTogYW55IHtcbiAgICBsZXQgZm5Cb2R5ID0gYCR7ZGVjbGFyYXRpb25zfVxcblxcdHJldHVybiAke2V4cHJ9XFxuLy8jIHNvdXJjZVVSTD1BcmliYUV4cHJlc3Npb25gO1xuICAgIGxldCBmbkFyZ05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBmbkFyZ1ZhbHVlczogYW55W10gPSBbXTtcbiAgICBmb3IgKGxldCBhcmdOYW1lIGluIGxldHMpIHtcbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwgYXJnTmFtZSkpIHtcbiAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChhcmdOYW1lKTtcbiAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2gobGV0c1thcmdOYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxldHMgaW5zdGFuY2VvZiBFeHRlbnNpYmxlKSB7XG4gICAgICAgIGxldCBleHRWYWx1ZXM6IEV4dGVuc2libGUgPSBsZXRzO1xuXG4gICAgICAgIGV4dFZhbHVlcy5leHRlbmRlZEZpZWxkcygpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGV4cHIsIGtleSkgJiZcbiAgICAgICAgICAgICAgICBmbkFyZ05hbWVzLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xICYmIFJlc2VydmVkS2V5d29yZC5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICBrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmbkFyZ05hbWVzLnB1c2goJ3RoaXMnKTtcbiAgICAvLyBmbkFyZ1ZhbHVlcy5wdXNoKGxldHMpO1xuICAgIGxldCBmbiA9IG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKTtcbiAgICBhc3NlcnQoaXNQcmVzZW50KGZuKSwgJ0Nhbm5vdCBldmFsdWF0ZSBleHByZXNzaW9uLiBGTiBpcyBub3QgZGVmaW5lZCcpO1xuICAgIGxldCBmbkJvdW5kID0gZm4uYmluZCh0aGlzQ29udGV4dCk7XG5cbiAgICByZXR1cm4gZm5Cb3VuZCguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNKc09iamVjdChvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ29uc3RydWN0b3IodmFsdWU6IE9iamVjdCwgdHlwZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVuY29kZVVSSShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzLnJlcGxhY2UoLyhbLiorP149IToke30oKXxbXFxdXFwvXFxcXF0pL2csICdcXFxcJDEnKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaGFzaENvZGUoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGxldCBoYXNoID0gMDtcbiAgICBsZXQgY2hhcjogbnVtYmVyO1xuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBoYXNoO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjaGFyID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgICAgIGhhc2ggPSBoYXNoICYgaGFzaDtcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG59XG5cbi8qKlxuICpcbiAqIENvbnZlcnRzIG9iamVjdCB0byBhIG5hbWU7XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0VG9OYW1lKHRhcmdldDogYW55KTogc3RyaW5nIHtcbiAgICBpZiAoaXNCbGFuayh0YXJnZXQpIHx8ICghaXNTdHJpbmdNYXAodGFyZ2V0KSAmJiAhaXNUeXBlKHRhcmdldCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignIENhbm5vdCBjb252ZXJ0LiBVa25vd24gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzVHlwZSh0YXJnZXQpID8gdGFyZ2V0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lIDogdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWU7XG59XG5cbi8qKlxuICpcbiAqIEJhc2ljIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIFVVSUQgdGFrZW4gZnJvbSBXM0MgZnJvbSBvbmUgb2YgdGhlIGV4YW1wbGVzXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXVpZCgpOiBzdHJpbmcge1xuICAgIGxldCBkdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGxldCBwcm90byA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZyxcbiAgICAgICAgKGM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IHIgPSAoZHQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xuICAgICAgICAgICAgZHQgPSBNYXRoLmZsb29yKGR0IC8gMTYpO1xuICAgICAgICAgICAgcmV0dXJuIChjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVjayBvYmplY3QgZXF1YWxpdHkgZGVyaXZlZCBmcm9tIGFuZ3VsYXIuZXF1YWxzIDEuNSBpbXBsZW1lbnRhdGlvblxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhvMTogYW55LCBvMjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKG8xID09PSBvMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG8xID09PSBudWxsIHx8IG8yID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChvMSAhPT0gbzEgJiYgbzIgIT09IG8yKSB7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBOYU4gPT09IE5hTlxuICAgIH1cblxuICAgIGxldCB0MSA9IHR5cGVvZiBvMSwgdDIgPSB0eXBlb2YgbzIsIGxlbmd0aDogYW55LCBrZXk6IGFueSwga2V5U2V0OiBhbnk7XG4gICAgaWYgKHQxID09PSB0MiAmJiB0MSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChsZW5ndGggPSBvMS5sZW5ndGgpID09PSBvMi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSA9IDA7IGtleSA8IGxlbmd0aDsga2V5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShvMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKG8xLmdldFRpbWUoKSwgbzIuZ2V0VGltZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1JlZ0V4cChvMSkpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWdFeHAobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG8xLnRvU3RyaW5nKCkgPT09IG8yLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNXaW5kb3cobzEpIHx8IGlzV2luZG93KG8yKSB8fFxuICAgICAgICAgICAgICAgIGlzQXJyYXkobzIpIHx8IGlzRGF0ZShvMikgfHwgaXNSZWdFeHAobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5U2V0ID0gbmV3IE1hcDxzdHJpbmcsIGJvb2xlYW4+KCk7XG4gICAgICAgICAgICAvLyB1c2luZyBPYmplY3Qua2V5cyBhcyBpdGVyYXRpbmcgdGhydSBvYmplY3Qgc3RvcCB3b3JraW5nIGluIE5HNiwgVFMyLjdcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobzIpO1xuICAgICAgICAgICAgZm9yIChrZXkgaW4ga2V5cykge1xuICAgICAgICAgICAgICAgIGlmIChrZXlzW2tleV0uY2hhckF0KDApID09PSAnJCcgfHwgaXNGdW5jdGlvbihvMVtrZXlzW2tleV1dKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5c1trZXldXSwgbzJba2V5c1trZXldXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXlTZXQuc2V0KGtleXNba2V5XSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhvMik7XG4gICAgICAgICAgICBmb3IgKGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5U2V0LmhhcyhrZXkpKSAmJiBrZXkuY2hhckF0KDApICE9PSAnJCdcbiAgICAgICAgICAgICAgICAgICAgJiYgaXNQcmVzZW50KG8yW2tleV0pICYmICFpc0Z1bmN0aW9uKG8yW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cblxuLyoqXG4gKiB0cmFuc2Zvcm0gYSBzdHJpbmcgaW50byBkZWNhbWVsLiBmb3JtLiBNb3N0bHkgdXNlZCB3aGVuIHJlYWRpbmcgY2xhc3MgbmFtZXMgb3IgZmllbGQgbmFtZXNcbiAqIHN1Y2ggZmlyc3ROYW1lIGFuZCB3ZSB3YW50IHRvIGNyZWF0ZSBhIGxhYmVsIEZpcnN0IE5hbWVcbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjYW1lbGl6ZShzdHJpbmc6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcsIGluaXRpYWxDYXBzOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmIChpc0JsYW5rKHN0cmluZykpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGxldCBsYXN0VUNJbmRleCA9IC0xO1xuICAgIGxldCBhbGxDYXBzID0gdHJ1ZTtcblxuICAgIGxldCBzcGxpdE9uVUMgPSAhU3RyaW5nV3JhcHBlci5jb250YWlucyhzdHJpbmcsICdfJyk7XG4gICAgbGV0IGJ1ZiA9ICcnO1xuICAgIGxldCBpbldvcmQgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IHN0cmluZy5sZW5ndGg7IGluV29yZCA8IGk7ICsraW5Xb3JkKSB7XG4gICAgICAgIGxldCBjID0gc3RyaW5nW2luV29yZF07XG5cbiAgICAgICAgaWYgKGMudG9VcHBlckNhc2UoKSA9PT0gYykge1xuICAgICAgICAgICAgaWYgKChpbldvcmQgLSAxKSAhPT0gbGFzdFVDSW5kZXggJiYgc3BsaXRPblVDKSB7XG4gICAgICAgICAgICAgICAgYnVmICs9IHNlcGFyYXRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RVQ0luZGV4ID0gaW5Xb3JkO1xuICAgICAgICAgICAgaWYgKCFpbml0aWFsQ2Fwcykge1xuICAgICAgICAgICAgICAgIGMgPSBjLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYy50b0xvd2VyQ2FzZSgpID09PSBjKSB7XG4gICAgICAgICAgICBpZiAoaW5Xb3JkID09PSAwICYmIGluaXRpYWxDYXBzKSB7XG4gICAgICAgICAgICAgICAgYyA9IGMudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFsbENhcHMgPSBmYWxzZTtcblxuICAgICAgICB9IGVsc2UgaWYgKGMgIT09ICdfJykge1xuICAgICAgICAgICAgYyA9IHNlcGFyYXRvcjtcbiAgICAgICAgfVxuICAgICAgICBidWYgKz0gYztcbiAgICB9XG5cbiAgICBpZiAoYWxsQ2Fwcykge1xuICAgICAgICBsZXQgdG9DYXBzID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBjID0gYnVmLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNoID0gYnVmW2ldO1xuXG4gICAgICAgICAgICBpZiAoY2gudG9Mb3dlckNhc2UoKSAhPT0gY2gudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpbldvcmQgJiYgY2ggPT09IGNoLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmID0gYnVmLnN1YnN0cigwLCBpKSArIGNoLnRvTG93ZXJDYXNlKCkgKyBidWYuc3Vic3RyKGkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9DYXBzID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9DYXBzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJ1Zjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbm9uUHJpdmF0ZVByZWZpeChpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaW5wdXRbMF0gPT09ICdfJyA/IFN0cmluZ1dyYXBwZXIuc3RyaXBMZWZ0KGlucHV0LCAnXycpIDogaW5wdXQ7XG59XG5cblxuLyoqXG4gKlxuICogVGhpcyBjb25zaWRlcnMgY3VycmVudGx5IG9ubHkgMSBmb3JtIHdoaWNoIHdoZW4gd2UgaGF2ZSBnZXR0ZXIgd2UgaGF2ZSB0aGlzIGZvcm0gZm9yXG4gKiBkZWNsYXJhdGlvbiBfPG5hbWU+IGFuZCBnZXQgPG5hbWU+KCkuIEkgZG8gbm90IGNoZWNrIGFueSBvdGhlciBmb3JtcyBub3cuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0dldHRlcihpbnN0YW5jZTogYW55LCBmaWVsZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzQmxhbmsoZmllbGQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGZpZWxkWzBdID09PSAnXycgJiYgaXNQcmVzZW50KG5vblByaXZhdGVQcmVmaXgoZmllbGQpKSk7XG5cbn1cblxuLyoqXG4gKiBUaGUgRXh0ZW5zaWJsZSBpbnRlcmZhY2UgY2FuIGJlIGltcGxlbWVudGVkIHdoZW4gYSBnaXZlbiBjbGFzc1xuICogd2FudHMgdG8gcHJvdmlkZSBkeW5hbWljYWxseSBhZGRlZCBmaWVsZHMuICBPbmNlIHRoaXMgaXMgaW1wbGVtZW50ZWRcbiAqIHRvIHJldHVybiBhIE1hcCwgdGhlIEZpZWxkVmFsdWUgc3lzdGVtIHdpbGwgYmUgYWJsZSB0byBsb29rIGluXG4gKiB0aGUgTWFwIHRvIHNlZSBpZiB0aGUgZGVzaXJlZCBmaWVsZCBleGlzdHMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV4dGVuc2libGUge1xuXG4gICAgLyoqXG4gICAgICogIFJldHVybnMgdGhlIE1hcCBpbiB3aGljaCB0aGUgZHluYW1pY2FsbHkgYWRkZWQgZmllbGRzIHJlc2lkZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGV4dGVuZGVkRmllbGRzKCk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cbn1cblxuIl19