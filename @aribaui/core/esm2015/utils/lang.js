/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as bigIntImported from 'big-integer';
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
const /** @type {?} */ STRING_MAP_PROTO = Object.getPrototypeOf({});
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
    let /** @type {?} */ res = token.toString();
    let /** @type {?} */ newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
/**
 * @param {?} clazz
 * @return {?}
 */
export function className(clazz) {
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
export function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name]
                = baseCtor.prototype[name];
        });
    });
}
export class StringWrapper {
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
export class StringJoiner {
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
function StringJoiner_tsickle_Closure_declarations() {
    /** @type {?} */
    StringJoiner.prototype.parts;
}
export class NumberWrapper {
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
export class FunctionWrapper {
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
export function crc32(crc, anInt) {
    /* tslint:disable */
    let /** @type {?} */ table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
    /* tslint:enable */
    let /** @type {?} */ x = 0;
    let /** @type {?} */ y = 0;
    let /** @type {?} */ myCrc = crc ^ (-1);
    for (let /** @type {?} */ i = 0; i < 4; i++) {
        y = (crc ^ anInt) & 0xFF;
        x = Number('0x' + table.substr(y * 9, 8));
        crc = (crc >>> 8) ^ x;
    }
    return crc ^ (-1);
}
export class Json {
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
export class DateWrapper {
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
export class BooleanWrapper {
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
export function getSymbolIterator() {
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
export function evalExpression(expr, declarations, lets) {
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
export function evalExpressionWithCntx(expr, declarations, lets, thisContext) {
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
export function objectValues(obj) {
    return Object.keys(obj).map(key => obj[key]);
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
export function decamelize(string, separator = ' ', initialCaps = true) {
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
        let /** @type {?} */ toCaps = false;
        for (let /** @type {?} */ i = 0, /** @type {?} */ c = buf.length; i < c; i++) {
            let /** @type {?} */ ch = buf[i];
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
export class Extensible {
    /**
     *  Returns the Map in which the dynamically added fields reside.
     *
     * @return {?}
     */
    extendedFields() {
        return unimplemented();
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9sYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFjQSxPQUFPLEtBQUssY0FBYyxNQUFNLGFBQWEsQ0FBQztBQUU5Qyx1QkFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDOzs7Ozs7QUFROUIsdUJBQU0sUUFBUSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUM7QUFDekQsdUJBQU0sT0FBTyxHQUE0QixRQUFRLENBQUM7Ozs7O0FBR2xELE1BQU0sMEJBQTBCLE9BQVk7SUFFeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMzQjs7Ozs7QUFFRCxNQUFNLHlCQUF5QixPQUFZO0lBRXZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDM0I7Ozs7O0FBR0QsTUFBTSxrQ0FBa0MsSUFBUztJQUU3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2QjtJQUNELE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQztDQUN0Qjs7OztBQUVELE1BQU07SUFFRixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0NBQ3BDOzs7OztBQUVELE1BQU0sb0JBQW9CLEdBQVE7SUFFOUIsTUFBTSxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQztDQUM1Qzs7Ozs7QUFFRCxNQUFNLGtCQUFrQixHQUFRO0lBRTVCLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7Q0FDNUM7Ozs7O0FBRUQsTUFBTSxvQkFBb0IsR0FBUTtJQUU5QixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssU0FBUyxDQUFDO0NBQ25D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QUMsT0FBTyxDQUFDLEtBQVU7UUFFckIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUM7U0FDNUI7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUMzQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDaEI7Ozs7O0lBR0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFVO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDO1NBQzNCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDMUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0NBQ0o7QUFLRCxxQkFBSSxlQUFlLEdBQVEsSUFBSSxDQUFDOzs7O0FBRWhDLE1BQU07SUFFRixFQUFFLENB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LENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Q0FDekU7Ozs7Ozs7Ozs7O0FBVUQsTUFBTSxvQkFBb0IsUUFBYSxFQUFFLEtBQWE7SUFFbEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0lBRUQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBRW5FOzs7Ozs7Ozs7O0FBVUQsTUFBTTs7Ozs7O0lBT0YsY0FBYztRQUVWLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUMxQjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQG9yaWdpbmFsLWxpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICpcbiAqXG4gKlxuICogIENyZWRpdDogRGVyaXZlZCBhbmQgZXh0ZW5kZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyIGluIG9yZGVyIHRvIGhhdmUgc2V0IG9mXG4gKiAgcmV1c2FibGUgZ2xvYmFscy4gU2luY2UgaXRzIG5vdCBleHBvcnRlZCBBUEkgbmVlZCB0byBoYXZlIGEgY29weSB1bmRlciBjb3JlLlxuICovXG5pbXBvcnQgKiBhcyBiaWdJbnRJbXBvcnRlZCBmcm9tICdiaWctaW50ZWdlcic7XG5cbmNvbnN0IGJpZ0ludCA9IGJpZ0ludEltcG9ydGVkO1xuXG4vKipcbiAqICBTZXQgb2YgcmV1c2FibGUgZ2xvYmFscy4gVGhpcyBpcyB0YWtlbiBmcm9tIHRoZSBBbmd1bGFyIDIgc2luY2UgaXRzIG5vdCBleHBvcnRlZCBBUEkuIEFuZCB0aGVyZVxuICogIGlzIGEgbmVlZCBmb3Igc3VjaCBjb21tb24gZnVuY3Rpb25zIGFuZCB3cmFwcGVyc1xuICpcbiAqL1xuXG5jb25zdCBfX3dpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdztcbmNvbnN0IF9nbG9iYWw6IHsgW25hbWU6IHN0cmluZ106IGFueSB9ID0gX193aW5kb3c7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRHbG9iYWxQYXJhbSh2YXJOYW1lOiBhbnkpOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfVxue1xuICAgIHJldHVybiBfZ2xvYmFsW3Zhck5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEdsb2JhbFR5cGUodmFyTmFtZTogYW55KTogYW55XG57XG4gICAgcmV0dXJuIF9nbG9iYWxbdmFyTmFtZV07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGVOYW1lRm9yRGVidWdnaW5nKHR5cGU6IGFueSk6IHN0cmluZ1xue1xuICAgIGlmICh0eXBlWyduYW1lJ10pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVbJ25hbWUnXTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pbXBsZW1lbnRlZCgpOiBhbnlcbntcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJlc2VudChvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gb2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhvYmo6IGFueSk6IG9iaiBpcyBzdHJpbmdcbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ01hcChvYmo6IGFueSk6IG9iaiBpcyBPYmplY3RcbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsO1xufVxuXG5jb25zdCBTVFJJTkdfTUFQX1BST1RPID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaWN0U3RyaW5nTWFwKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBpc1N0cmluZ01hcChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBTVFJJTkdfTUFQX1BST1RPO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIC8vIGFsbG93IGFueSBQcm9taXNlL0ErIGNvbXBsaWFudCB0aGVuYWJsZS5cbiAgICAvLyBJdCdzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZW5zdXJlIHRoYXQgb2JqLnRoZW4gY29uZm9ybXMgdG8gdGhlIHNwZWNcbiAgICByZXR1cm4gaXNQcmVzZW50KG9iaikgJiYgaXNGdW5jdGlvbihvYmoudGhlbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUob2JqOiBhbnkpOiBvYmogaXMgRGF0ZVxue1xuICAgIHJldHVybiAob2JqIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ob2JqLnZhbHVlT2YoKSkpIHx8XG4gICAgICAgIChpc1ByZXNlbnQob2JqKSAmJiBpc0Z1bmN0aW9uKG9iai5ub3cpKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIGlmICghaXNKc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKSB8fFxuICAgICAgICAoIShvYmogaW5zdGFuY2VvZiBNYXApICYmICAgICAgLy8gSlMgTWFwIGFyZSBpdGVyYWJsZXMgYnV0IHJldHVybiBlbnRyaWVzIGFzIFtrLCB2XVxuICAgICAgICAgICAgZ2V0U3ltYm9sSXRlcmF0b3IoKSBpbiBvYmopOyAgLy8gSlMgSXRlcmFibGUgaGF2ZSBhIFN5bWJvbC5pdGVyYXRvciBwcm9wXG59XG5cblxuLyoqXG4gKiBDaGVja3MgaWYgYG9iamAgaXMgYSB3aW5kb3cgb2JqZWN0LlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzV2luZG93KG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBvYmogJiYgb2JqLndpbmRvdyA9PT0gb2JqO1xufVxuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIHZhbHVlIGlzIGEgcmVndWxhciBleHByZXNzaW9uIG9iamVjdC5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZ0V4cCh2YWx1ZTogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpXG57XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaWZ0TGVmdChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlclxue1xuICAgIHJldHVybiBiaWdJbnQoYSkuc2hpZnRMZWZ0KGIpLnZhbHVlT2YoKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2hpZnRSaWdodChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlclxue1xuICAgIHJldHVybiBiaWdJbnQoYSkuc2hpZnRSaWdodChiKS52YWx1ZU9mKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeSh0b2tlbjogYW55KTogc3RyaW5nXG57XG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cblxuICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkIHx8IHRva2VuID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJyArIHRva2VuO1xuICAgIH1cblxuICAgIGlmICh0b2tlbi5vdmVycmlkZGVuTmFtZSkge1xuICAgICAgICByZXR1cm4gdG9rZW4ub3ZlcnJpZGRlbk5hbWU7XG4gICAgfVxuICAgIGlmICh0b2tlbi5uYW1lKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi5uYW1lO1xuICAgIH1cblxuICAgIGxldCByZXMgPSB0b2tlbi50b1N0cmluZygpO1xuICAgIGxldCBuZXdMaW5lSW5kZXggPSByZXMuaW5kZXhPZignXFxuJyk7XG4gICAgcmV0dXJuIChuZXdMaW5lSW5kZXggPT09IC0xKSA/IHJlcyA6IHJlcy5zdWJzdHJpbmcoMCwgbmV3TGluZUluZGV4KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NOYW1lKGNsYXp6OiBhbnkpOiBzdHJpbmdcbntcbiAgICBpZiAoaXNQcmVzZW50KGNsYXp6LmNvbnN0cnVjdG9yKSkge1xuICAgICAgICBsZXQgY2xhc3NOID0gY2xhenouY29uc3RydWN0b3IudG9TdHJpbmcoKTtcbiAgICAgICAgY2xhc3NOID0gY2xhc3NOLnN1YnN0cignZnVuY3Rpb24gJy5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gY2xhc3NOLnN1YnN0cigwLCBjbGFzc04uaW5kZXhPZignKCcpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsYXp6O1xufVxuXG5cbi8qKlxuICogIFNvdXJjZTogaHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL2RvY3MvaGFuZGJvb2svbWl4aW5zLmh0bWxcbiAqXG4gKiAgRnVuY3Rpb24gdGhhdCBjb3BpZXMgcHJvcGVydGllcyBvZiB0aGUgYmFzZUN0b3JzIHRvIGRlcml2ZWRDdG9yLlxuICogIENhbiBiZSB1c2VkIHRvIGFjaGlldmUgbXVsdGlwbGUgaW5oZXJpdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1peGlucyhkZXJpdmVkQ3RvcjogYW55LCBiYXNlQ3RvcnM6IGFueVtdKVxue1xuICAgIGJhc2VDdG9ycy5mb3JFYWNoKGJhc2VDdG9yID0+XG4gICAge1xuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiYXNlQ3Rvci5wcm90b3R5cGUpLmZvckVhY2gobmFtZSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV1cbiAgICAgICAgICAgICAgICA9IGJhc2VDdG9yLnByb3RvdHlwZVtuYW1lXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdXcmFwcGVyXG57XG4gICAgc3RhdGljIGZyb21DaGFyQ29kZShjb2RlOiBudW1iZXIpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjaGFyQ29kZUF0KHM6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHMuY2hhckNvZGVBdChpbmRleCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNwbGl0KHM6IHN0cmluZywgcmVnRXhwOiBSZWdFeHApOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHMuc3BsaXQocmVnRXhwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKHM6IHN0cmluZywgczI6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzID09PSBzMjtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RyaXBMZWZ0KHM6IHN0cmluZywgY2hhclZhbDogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc1tpXSAhPT0gY2hhclZhbCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcocG9zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RyaXBSaWdodChzOiBzdHJpbmcsIGNoYXJWYWw6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNbaV0gIT09IGNoYXJWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2Uoczogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZShmcm9tLCByZXBsYWNlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVwbGFjZUFsbChzOiBzdHJpbmcsIGZyb206IFJlZ0V4cCwgcmVwbGFjZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKGZyb20sIHJlcGxhY2UpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzbGljZTxUPihzOiBzdHJpbmcsIGZyb206IG51bWJlciA9IDAsIHRvOiBudW1iZXIgPSBudWxsKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gcy5zbGljZShmcm9tLCB0byA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHRvKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnMoczogc3RyaW5nLCBzdWJzdHI6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzLmluZGV4T2Yoc3Vic3RyKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbXBhcmUoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGEgPiBiKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZW5kc1dpZHRoKHN1YmplY3Q6IHN0cmluZywgc2VhcmNoU3RyaW5nOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSB7XG4gICAgICAgICAgICBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHNzdHJpbmcsIHBvcyA9IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IHN1YmplY3RTdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3MgIT09ICdudW1iZXInIHx8ICFpc0Zpbml0ZShwb3MpIHx8IE1hdGguZmxvb3IocG9zKSAhPT0gcG9zIHx8IHBvc1xuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3RTdHJpbmcubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gc3ViamVjdFN0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcyAtPSBzc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEluZGV4ID0gc3ViamVjdFN0cmluZy5pbmRleE9mKHNzdHJpbmcsIHBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3M7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmVuZHNXaXRoKHNlYXJjaFN0cmluZyk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgc3RhcnRzV2lkdGgoc3ViamVjdDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmluZGV4T2Yoc2VhcmNoU3RyaW5nKSA9PT0gMDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdKb2luZXJcbntcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFydHM6IHN0cmluZ1tdID0gW10pXG4gICAge1xuICAgIH1cblxuICAgIGFkZChwYXJ0OiBzdHJpbmcpOiBTdHJpbmdKb2luZXJcbiAgICB7XG4gICAgICAgIHRoaXMucGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBsYXN0KCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHNbdGhpcy5wYXJ0cy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzLmpvaW4oJycpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgTnVtYmVyV3JhcHBlclxue1xuICAgIHN0YXRpYyB0b0ZpeGVkKG46IG51bWJlciwgZnJhY3Rpb25EaWdpdHM6IG51bWJlcik6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIG4udG9GaXhlZChmcmFjdGlvbkRpZ2l0cyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFsKGE6IG51bWJlciwgYjogbnVtYmVyKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlSW50QXV0b1JhZGl4KHRleHQ6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCk7XG4gICAgICAgIGlmIChpc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50ZWdlciBsaXRlcmFsIHdoZW4gcGFyc2luZyAnICsgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VJbnQodGV4dDogc3RyaW5nLCByYWRpeDogbnVtYmVyKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAocmFkaXggPT09IDEwKSB7XG4gICAgICAgICAgICBpZiAoL14oXFwtfFxcKyk/WzAtOV0rJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmFkaXggPT09IDE2KSB7XG4gICAgICAgICAgICBpZiAoL14oXFwtfFxcKyk/WzAtOUFCQ0RFRmFiY2RlZl0rJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgJyArIHRleHQgKyAnIGluIGJhc2UgJyArIHJhZGl4KTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBOYU4gaXMgYSB2YWxpZCBsaXRlcmFsIGJ1dCBpcyByZXR1cm5lZCBieSBwYXJzZUZsb2F0IHRvIGluZGljYXRlIGFuIGVycm9yLlxuICAgIHN0YXRpYyBwYXJzZUZsb2F0KHRleHQ6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGV4dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzTnVtZXJpYyh2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuICFpc05hTih2YWx1ZSAtIHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOYU4odmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc05hTih2YWx1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzSW50ZWdlcih2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uV3JhcHBlclxue1xuICAgIHN0YXRpYyBhcHBseShmbjogRnVuY3Rpb24sIHBvc0FyZ3M6IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIHBvc0FyZ3MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBiaW5kKGZuOiBGdW5jdGlvbiwgc2NvcGU6IGFueSk6IEZ1bmN0aW9uXG4gICAge1xuICAgICAgICByZXR1cm4gZm4uYmluZChzY29wZSk7XG4gICAgfVxufVxuXG4vLyBKUyBoYXMgTmFOICE9PSBOYU5cbmV4cG9ydCBmdW5jdGlvbiBsb29zZUlkZW50aWNhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gYSA9PT0gYiB8fCB0eXBlb2YgYSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGIgPT09ICdudW1iZXInICYmIGlzTmFOKGEpICYmIGlzTmFOKGIpO1xufVxuXG4vLyBKUyBjb25zaWRlcnMgTmFOIGlzIHRoZSBzYW1lIGFzIE5hTiBmb3IgbWFwIEtleSAod2hpbGUgTmFOICE9PSBOYU4gb3RoZXJ3aXNlKVxuLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcFxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hcEtleTxUPih2YWx1ZTogVCk6IFRcbntcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVCbGFuayhvYmo6IE9iamVjdCk6IGFueVxue1xuICAgIHJldHVybiBpc0JsYW5rKG9iaikgPyBudWxsIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQm9vbChvYmo6IGJvb2xlYW4pOiBib29sZWFuXG57XG4gICAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IGZhbHNlIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNKc09iamVjdChvOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIG8gIT09IG51bGwgJiYgKHR5cGVvZiBvID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvID09PSAnb2JqZWN0Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludChvYmo6IEVycm9yIHwgT2JqZWN0KVxue1xuICAgIGNvbnNvbGUubG9nKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuKG9iajogRXJyb3IgfCBPYmplY3QpXG57XG4gICAgY29uc29sZS53YXJuKG9iaik7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb246IGJvb2xlYW4sIG1zZzogc3RyaW5nKVxue1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrc3VtKHM6IGFueSlcbntcbiAgICBsZXQgY2hrID0gMHgxMjM0NTY3ODtcbiAgICBsZXQgbGVuID0gcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGsgKz0gKHMuY2hhckNvZGVBdChpKSAqIChpICsgMSkpO1xuICAgIH1cblxuICAgIHJldHVybiAoY2hrICYgMHhmZmZmZmZmZikudG9TdHJpbmcoMTYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JjMzIoY3JjOiBudW1iZXIsIGFuSW50OiBudW1iZXIpXG57XG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICBsZXQgdGFibGUgPSAnMDAwMDAwMDAgNzcwNzMwOTYgRUUwRTYxMkMgOTkwOTUxQkEgMDc2REM0MTkgNzA2QUY0OEYgRTk2M0E1MzUgOUU2NDk1QTMgMEVEQjg4MzIgNzlEQ0I4QTQgRTBENUU5MUUgOTdEMkQ5ODggMDlCNjRDMkIgN0VCMTdDQkQgRTdCODJEMDcgOTBCRjFEOTEgMURCNzEwNjQgNkFCMDIwRjIgRjNCOTcxNDggODRCRTQxREUgMUFEQUQ0N0QgNkREREU0RUIgRjRENEI1NTEgODNEMzg1QzcgMTM2Qzk4NTYgNjQ2QkE4QzAgRkQ2MkY5N0EgOEE2NUM5RUMgMTQwMTVDNEYgNjMwNjZDRDkgRkEwRjNENjMgOEQwODBERjUgM0I2RTIwQzggNEM2OTEwNUUgRDU2MDQxRTQgQTI2NzcxNzIgM0MwM0U0RDEgNEIwNEQ0NDcgRDIwRDg1RkQgQTUwQUI1NkIgMzVCNUE4RkEgNDJCMjk4NkMgREJCQkM5RDYgQUNCQ0Y5NDAgMzJEODZDRTMgNDVERjVDNzUgRENENjBEQ0YgQUJEMTNENTkgMjZEOTMwQUMgNTFERTAwM0EgQzhENzUxODAgQkZEMDYxMTYgMjFCNEY0QjUgNTZCM0M0MjMgQ0ZCQTk1OTkgQjhCREE1MEYgMjgwMkI4OUUgNUYwNTg4MDggQzYwQ0Q5QjIgQjEwQkU5MjQgMkY2RjdDODcgNTg2ODRDMTEgQzE2MTFEQUIgQjY2NjJEM0QgNzZEQzQxOTAgMDFEQjcxMDYgOThEMjIwQkMgRUZENTEwMkEgNzFCMTg1ODkgMDZCNkI1MUYgOUZCRkU0QTUgRThCOEQ0MzMgNzgwN0M5QTIgMEYwMEY5MzQgOTYwOUE4OEUgRTEwRTk4MTggN0Y2QTBEQkIgMDg2RDNEMkQgOTE2NDZDOTcgRTY2MzVDMDEgNkI2QjUxRjQgMUM2QzYxNjIgODU2NTMwRDggRjI2MjAwNEUgNkMwNjk1RUQgMUIwMUE1N0IgODIwOEY0QzEgRjUwRkM0NTcgNjVCMEQ5QzYgMTJCN0U5NTAgOEJCRUI4RUEgRkNCOTg4N0MgNjJERDFEREYgMTVEQTJENDkgOENEMzdDRjMgRkJENDRDNjUgNERCMjYxNTggM0FCNTUxQ0UgQTNCQzAwNzQgRDRCQjMwRTIgNEFERkE1NDEgM0REODk1RDcgQTREMUM0NkQgRDNENkY0RkIgNDM2OUU5NkEgMzQ2RUQ5RkMgQUQ2Nzg4NDYgREE2MEI4RDAgNDQwNDJENzMgMzMwMzFERTUgQUEwQTRDNUYgREQwRDdDQzkgNTAwNTcxM0MgMjcwMjQxQUEgQkUwQjEwMTAgQzkwQzIwODYgNTc2OEI1MjUgMjA2Rjg1QjMgQjk2NkQ0MDkgQ0U2MUU0OUYgNUVERUY5MEUgMjlEOUM5OTggQjBEMDk4MjIgQzdEN0E4QjQgNTlCMzNEMTcgMkVCNDBEODEgQjdCRDVDM0IgQzBCQTZDQUQgRURCODgzMjAgOUFCRkIzQjYgMDNCNkUyMEMgNzRCMUQyOUEgRUFENTQ3MzkgOUREMjc3QUYgMDREQjI2MTUgNzNEQzE2ODMgRTM2MzBCMTIgOTQ2NDNCODQgMEQ2RDZBM0UgN0E2QTVBQTggRTQwRUNGMEIgOTMwOUZGOUQgMEEwMEFFMjcgN0QwNzlFQjEgRjAwRjkzNDQgODcwOEEzRDIgMUUwMUYyNjggNjkwNkMyRkUgRjc2MjU3NUQgODA2NTY3Q0IgMTk2QzM2NzEgNkU2QjA2RTcgRkVENDFCNzYgODlEMzJCRTAgMTBEQTdBNUEgNjdERDRBQ0MgRjlCOURGNkYgOEVCRUVGRjkgMTdCN0JFNDMgNjBCMDhFRDUgRDZENkEzRTggQTFEMTkzN0UgMzhEOEMyQzQgNEZERkYyNTIgRDFCQjY3RjEgQTZCQzU3NjcgM0ZCNTA2REQgNDhCMjM2NEIgRDgwRDJCREEgQUYwQTFCNEMgMzYwMzRBRjYgNDEwNDdBNjAgREY2MEVGQzMgQTg2N0RGNTUgMzE2RThFRUYgNDY2OUJFNzkgQ0I2MUIzOEMgQkM2NjgzMUEgMjU2RkQyQTAgNTI2OEUyMzYgQ0MwQzc3OTUgQkIwQjQ3MDMgMjIwMjE2QjkgNTUwNTI2MkYgQzVCQTNCQkUgQjJCRDBCMjggMkJCNDVBOTIgNUNCMzZBMDQgQzJEN0ZGQTcgQjVEMENGMzEgMkNEOTlFOEIgNUJERUFFMUQgOUI2NEMyQjAgRUM2M0YyMjYgNzU2QUEzOUMgMDI2RDkzMEEgOUMwOTA2QTkgRUIwRTM2M0YgNzIwNzY3ODUgMDUwMDU3MTMgOTVCRjRBODIgRTJCODdBMTQgN0JCMTJCQUUgMENCNjFCMzggOTJEMjhFOUIgRTVENUJFMEQgN0NEQ0VGQjcgMEJEQkRGMjEgODZEM0QyRDQgRjFENEUyNDIgNjhEREIzRjggMUZEQTgzNkUgODFCRTE2Q0QgRjZCOTI2NUIgNkZCMDc3RTEgMThCNzQ3NzcgODgwODVBRTYgRkYwRjZBNzAgNjYwNjNCQ0EgMTEwMTBCNUMgOEY2NTlFRkYgRjg2MkFFNjkgNjE2QkZGRDMgMTY2Q0NGNDUgQTAwQUUyNzggRDcwREQyRUUgNEUwNDgzNTQgMzkwM0IzQzIgQTc2NzI2NjEgRDA2MDE2RjcgNDk2OTQ3NEQgM0U2RTc3REIgQUVEMTZBNEEgRDlENjVBREMgNDBERjBCNjYgMzdEODNCRjAgQTlCQ0FFNTMgREVCQjlFQzUgNDdCMkNGN0YgMzBCNUZGRTkgQkRCREYyMUMgQ0FCQUMyOEEgNTNCMzkzMzAgMjRCNEEzQTYgQkFEMDM2MDUgQ0RENzA2OTMgNTRERTU3MjkgMjNEOTY3QkYgQjM2NjdBMkUgQzQ2MTRBQjggNUQ2ODFCMDIgMkE2RjJCOTQgQjQwQkJFMzcgQzMwQzhFQTEgNUEwNURGMUIgMkQwMkVGOEQnO1xuICAgIC8qIHRzbGludDplbmFibGUgKi9cblxuICAgIGxldCB4ID0gMDtcbiAgICBsZXQgeSA9IDA7XG5cbiAgICBsZXQgbXlDcmMgPSBjcmMgXiAoLTEpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIHkgPSAoY3JjIF4gYW5JbnQpICYgMHhGRjtcbiAgICAgICAgeCA9IE51bWJlcignMHgnICsgdGFibGUuc3Vic3RyKHkgKiA5LCA4KSk7XG4gICAgICAgIGNyYyA9IChjcmMgPj4+IDgpIF4geDtcbiAgICB9XG4gICAgcmV0dXJuIGNyYyBeICgtMSk7XG59XG5cblxuLy8gQ2FuJ3QgYmUgYWxsIHVwcGVyY2FzZSBhcyBvdXIgdHJhbnNwaWxlciB3b3VsZCB0aGluayBpdCBpcyBhIHNwZWNpYWwgZGlyZWN0aXZlLi4uXG5leHBvcnQgY2xhc3MgSnNvblxue1xuICAgIHN0YXRpYyBwYXJzZShzOiBzdHJpbmcpOiBPYmplY3RcbiAgICB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdHJpbmdpZnkoZGF0YTogT2JqZWN0KTogc3RyaW5nXG4gICAge1xuICAgICAgICAvLyBEYXJ0IGRvZXNuJ3QgdGFrZSAzIGFyZ3VtZW50c1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0ZVdyYXBwZXJcbntcbiAgICBzdGF0aWMgY3JlYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciA9IDEsIGRheTogbnVtYmVyID0gMSwgaG91cjogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgICBzZWNvbmRzOiBudW1iZXIgPSAwLCBtaWxsaXNlY29uZHM6IG51bWJlciA9IDApOiBEYXRlXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21JU09TdHJpbmcoc3RyOiBzdHJpbmcpOiBEYXRlXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoc3RyKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbU1pbGxpcyhtczogbnVtYmVyKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG1zKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9NaWxsaXMoZGF0ZTogRGF0ZSk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBub3coKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvSnNvbihkYXRlOiBEYXRlKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gZGF0ZS50b0pTT04oKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEJvb2xlYW5XcmFwcGVyXG57XG5cbiAgICBzdGF0aWMgYm9sZWFuVmFsdWUodmFsdWU6IGFueSA9IGZhbHNlKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzRmFsc2UodmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ2ZhbHNlJztcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZ01hcCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlID09PSBmYWxzZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzVHJ1ZSh2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmdNYXAodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gdHJ1ZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuXG4vLyBXaGVuIFN5bWJvbC5pdGVyYXRvciBkb2Vzbid0IGV4aXN0LCByZXRyaWV2ZXMgdGhlIGtleSB1c2VkIGluIGVzNi1zaGltXG5kZWNsYXJlIGxldCBTeW1ib2w6IGFueTtcbmxldCBfc3ltYm9sSXRlcmF0b3I6IGFueSA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTeW1ib2xJdGVyYXRvcigpOiBzdHJpbmcgfCBzeW1ib2xcbntcbiAgICBpZiAoaXNCbGFuayhfc3ltYm9sSXRlcmF0b3IpKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoU3ltYm9sLml0ZXJhdG9yKSkge1xuICAgICAgICAgICAgX3N5bWJvbEl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZXM2LXNoaW0gc3BlY2lmaWMgbG9naWNcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTWFwLnByb3RvdHlwZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnZW50cmllcycgJiYga2V5ICE9PSAnc2l6ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgKE1hcCBhcyBhbnkpLnByb3RvdHlwZVtrZXldID09PSBNYXAucHJvdG90eXBlWydlbnRyaWVzJ10pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBfc3ltYm9sSXRlcmF0b3IgPSBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfc3ltYm9sSXRlcmF0b3I7XG59XG5cbmNvbnN0IFJlc2VydmVkS2V5d29yZCA9IFsnY2xhc3MnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWxFeHByZXNzaW9uKGV4cHI6IHN0cmluZywgZGVjbGFyYXRpb25zOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0czogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IGFueVxue1xuICAgIGxldCBmbkJvZHkgPSBgJHtkZWNsYXJhdGlvbnN9XFxuXFx0cmV0dXJuICR7ZXhwcn1cXG4vLyMgc291cmNlVVJMPUFyaWJhRXhwcmVzc2lvbmA7XG4gICAgbGV0IGZuQXJnTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGZuQXJnVmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGFyZ05hbWUgaW4gbGV0cykge1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBhcmdOYW1lKSkge1xuICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaChsZXRzW2FyZ05hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGV0cyBpbnN0YW5jZW9mIEV4dGVuc2libGUpIHtcbiAgICAgICAgbGV0IGV4dFZhbHVlczogRXh0ZW5zaWJsZSA9IGxldHM7XG5cbiAgICAgICAgZXh0VmFsdWVzLmV4dGVuZGVkRmllbGRzKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwga2V5KSAmJlxuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEgJiYgUmVzZXJ2ZWRLZXl3b3JkLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmbkFyZ05hbWVzLnB1c2goJ3RoaXMnKTtcbiAgICAvLyBmbkFyZ1ZhbHVlcy5wdXNoKGxldHMpO1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oLi4uZm5BcmdOYW1lcy5jb25jYXQoZm5Cb2R5KSkoLi4uZm5BcmdWYWx1ZXMpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsRXhwcmVzc2lvbldpdGhDbnR4KGV4cHI6IHN0cmluZywgZGVjbGFyYXRpb25zOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXRzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0NvbnRleHQ6IGFueSk6IGFueVxue1xuICAgIGxldCBmbkJvZHkgPSBgJHtkZWNsYXJhdGlvbnN9XFxuXFx0cmV0dXJuICR7ZXhwcn1cXG4vLyMgc291cmNlVVJMPUFyaWJhRXhwcmVzc2lvbmA7XG4gICAgbGV0IGZuQXJnTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGZuQXJnVmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGFyZ05hbWUgaW4gbGV0cykge1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBhcmdOYW1lKSkge1xuICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaChsZXRzW2FyZ05hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGV0cyBpbnN0YW5jZW9mIEV4dGVuc2libGUpIHtcbiAgICAgICAgbGV0IGV4dFZhbHVlczogRXh0ZW5zaWJsZSA9IGxldHM7XG5cbiAgICAgICAgZXh0VmFsdWVzLmV4dGVuZGVkRmllbGRzKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwga2V5KSAmJlxuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEgJiYgUmVzZXJ2ZWRLZXl3b3JkLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmbkFyZ05hbWVzLnB1c2goJ3RoaXMnKTtcbiAgICAvLyBmbkFyZ1ZhbHVlcy5wdXNoKGxldHMpO1xuICAgIGxldCBmbiA9IG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKTtcbiAgICBhc3NlcnQoaXNQcmVzZW50KGZuKSwgJ0Nhbm5vdCBldmFsdWF0ZSBleHByZXNzaW9uLiBGTiBpcyBub3QgZGVmaW5lZCcpO1xuICAgIGxldCBmbkJvdW5kID0gZm4uYmluZCh0aGlzQ29udGV4dCk7XG5cbiAgICByZXR1cm4gZm5Cb3VuZCguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gIWlzSnNPYmplY3Qob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NvbnN0cnVjdG9yKHZhbHVlOiBPYmplY3QsIHR5cGU6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IgPT09IHR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGUoczogc3RyaW5nKTogc3RyaW5nXG57XG4gICAgcmV0dXJuIGVuY29kZVVSSShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzOiBzdHJpbmcpOiBzdHJpbmdcbntcbiAgICByZXR1cm4gcy5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8W1xcXVxcL1xcXFxdKS9nLCAnXFxcXCQxJyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2hDb2RlKHN0cjogc3RyaW5nKTogbnVtYmVyXG57XG4gICAgbGV0IGhhc2ggPSAwO1xuICAgIGxldCBjaGFyOiBudW1iZXI7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICAgICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdFZhbHVlcyhvYmo6IGFueSk6IGFueVtdXG57XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSk7XG59XG5cbi8qKlxuICpcbiAqIENvbnZlcnRzIG9iamVjdCB0byBhIG5hbWU7XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0VG9OYW1lKHRhcmdldDogYW55KTogc3RyaW5nXG57XG4gICAgaWYgKGlzQmxhbmsodGFyZ2V0KSB8fCAoIWlzU3RyaW5nTWFwKHRhcmdldCkgJiYgIWlzVHlwZSh0YXJnZXQpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJyBDYW5ub3QgY29udmVydC4gVWtub3duIG9iamVjdCcpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1R5cGUodGFyZ2V0KSA/IHRhcmdldC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZSA6IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuXG4vKipcbiAqXG4gKiBCYXNpYyBmdW5jdGlvbiB0byBnZW5lcmF0ZSBVVUlEIHRha2VuIGZyb20gVzNDIGZyb20gb25lIG9mIHRoZSBleGFtcGxlc1xuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHV1aWQoKTogc3RyaW5nXG57XG4gICAgbGV0IGR0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgbGV0IHByb3RvID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLFxuICAgICAgICAoYzogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgciA9IChkdCArIE1hdGgucmFuZG9tKCkgKiAxNikgJSAxNiB8IDA7XG4gICAgICAgICAgICBkdCA9IE1hdGguZmxvb3IoZHQgLyAxNik7XG4gICAgICAgICAgICByZXR1cm4gKGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCkpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHByb3RvO1xufVxuXG4vKipcbiAqIENoZWNrIG9iamVjdCBlcXVhbGl0eSBkZXJpdmVkIGZyb20gYW5ndWxhci5lcXVhbHMgMS41IGltcGxlbWVudGF0aW9uXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKG8xOiBhbnksIG8yOiBhbnkpOiBib29sZWFuXG57XG4gICAgaWYgKG8xID09PSBvMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG8xID09PSBudWxsIHx8IG8yID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChvMSAhPT0gbzEgJiYgbzIgIT09IG8yKSB7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBOYU4gPT09IE5hTlxuICAgIH1cblxuICAgIGxldCB0MSA9IHR5cGVvZiBvMSwgdDIgPSB0eXBlb2YgbzIsIGxlbmd0aDogYW55LCBrZXk6IGFueSwga2V5U2V0OiBhbnk7XG4gICAgaWYgKHQxID09PSB0MiAmJiB0MSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChsZW5ndGggPSBvMS5sZW5ndGgpID09PSBvMi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSA9IDA7IGtleSA8IGxlbmd0aDsga2V5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShvMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKG8xLmdldFRpbWUoKSwgbzIuZ2V0VGltZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1JlZ0V4cChvMSkpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWdFeHAobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG8xLnRvU3RyaW5nKCkgPT09IG8yLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNXaW5kb3cobzEpIHx8IGlzV2luZG93KG8yKSB8fFxuICAgICAgICAgICAgICAgIGlzQXJyYXkobzIpIHx8IGlzRGF0ZShvMikgfHwgaXNSZWdFeHAobzIpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleVNldCA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xuICAgICAgICAgICAgLy8gdXNpbmcgT2JqZWN0LmtleXMgYXMgaXRlcmF0aW5nIHRocnUgb2JqZWN0IHN0b3Agd29ya2luZyBpbiBORzYsIFRTMi43XG4gICAgICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG8yKTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5c1trZXldLmNoYXJBdCgwKSA9PT0gJyQnIHx8IGlzRnVuY3Rpb24obzFba2V5c1trZXldXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZXF1YWxzKG8xW2tleXNba2V5XV0sIG8yW2tleXNba2V5XV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5U2V0LnNldChrZXlzW2tleV0sIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMobzIpO1xuICAgICAgICAgICAgZm9yIChrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgIGlmICghKGtleVNldC5oYXMoa2V5KSkgJiYga2V5LmNoYXJBdCgwKSAhPT0gJyQnXG4gICAgICAgICAgICAgICAgICAgICYmIGlzUHJlc2VudChvMltrZXldKSAmJiAhaXNGdW5jdGlvbihvMltrZXldKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cblxuLyoqXG4gKiB0cmFuc2Zvcm0gYSBzdHJpbmcgaW50byBkZWNhbWVsLiBmb3JtLiBNb3N0bHkgdXNlZCB3aGVuIHJlYWRpbmcgY2xhc3MgbmFtZXMgb3IgZmllbGQgbmFtZXNcbiAqIHN1Y2ggZmlyc3ROYW1lIGFuZCB3ZSB3YW50IHRvIGNyZWF0ZSBhIGxhYmVsIEZpcnN0IE5hbWVcbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjYW1lbGl6ZShzdHJpbmc6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcsIGluaXRpYWxDYXBzOiBib29sZWFuID0gdHJ1ZSlcbntcbiAgICBpZiAoaXNCbGFuayhzdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBsZXQgbGFzdFVDSW5kZXggPSAtMTtcbiAgICBsZXQgYWxsQ2FwcyA9IHRydWU7XG5cbiAgICBsZXQgc3BsaXRPblVDID0gIVN0cmluZ1dyYXBwZXIuY29udGFpbnMoc3RyaW5nLCAnXycpO1xuICAgIGxldCBidWYgPSAnJztcbiAgICBsZXQgaW5Xb3JkID0gMDtcblxuICAgIGZvciAobGV0IGkgPSBzdHJpbmcubGVuZ3RoOyBpbldvcmQgPCBpOyArK2luV29yZCkge1xuICAgICAgICBsZXQgYyA9IHN0cmluZ1tpbldvcmRdO1xuXG4gICAgICAgIGlmIChjLnRvVXBwZXJDYXNlKCkgPT09IGMpIHtcbiAgICAgICAgICAgIGlmICgoaW5Xb3JkIC0gMSkgIT09IGxhc3RVQ0luZGV4ICYmIHNwbGl0T25VQykge1xuICAgICAgICAgICAgICAgIGJ1ZiArPSBzZXBhcmF0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0VUNJbmRleCA9IGluV29yZDtcbiAgICAgICAgICAgIGlmICghaW5pdGlhbENhcHMpIHtcbiAgICAgICAgICAgICAgICBjID0gYy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGMudG9Mb3dlckNhc2UoKSA9PT0gYykge1xuICAgICAgICAgICAgaWYgKGluV29yZCA9PT0gMCAmJiBpbml0aWFsQ2Fwcykge1xuICAgICAgICAgICAgICAgIGMgPSBjLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbGxDYXBzID0gZmFsc2U7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjICE9PSAnXycpIHtcbiAgICAgICAgICAgIGMgPSBzZXBhcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgYnVmICs9IGM7XG4gICAgfVxuXG4gICAgaWYgKGFsbENhcHMpIHtcbiAgICAgICAgbGV0IHRvQ2FwcyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IGJ1Zi5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjaCA9IGJ1ZltpXTtcblxuICAgICAgICAgICAgaWYgKGNoLnRvTG93ZXJDYXNlKCkgIT09IGNoLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5Xb3JkICYmIGNoID09PSBjaC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZiA9IGJ1Zi5zdWJzdHIoMCwgaSkgKyBjaC50b0xvd2VyQ2FzZSgpICsgYnVmLnN1YnN0cihpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvQ2FwcyA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvQ2FwcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBidWY7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vblByaXZhdGVQcmVmaXgoaW5wdXQ6IHN0cmluZyk6IHN0cmluZ1xue1xuICAgIHJldHVybiBpbnB1dFswXSA9PT0gJ18nID8gU3RyaW5nV3JhcHBlci5zdHJpcExlZnQoaW5wdXQsICdfJykgOiBpbnB1dDtcbn1cblxuXG4vKipcbiAqXG4gKiBUaGlzIGNvbnNpZGVycyBjdXJyZW50bHkgb25seSAxIGZvcm0gd2hpY2ggd2hlbiB3ZSBoYXZlIGdldHRlciB3ZSBoYXZlIHRoaXMgZm9ybSBmb3JcbiAqIGRlY2xhcmF0aW9uIF88bmFtZT4gYW5kIGdldCA8bmFtZT4oKS4gSSBkbyBub3QgY2hlY2sgYW55IG90aGVyIGZvcm1zIG5vdy5cbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzR2V0dGVyKGluc3RhbmNlOiBhbnksIGZpZWxkOiBzdHJpbmcpOiBib29sZWFuXG57XG4gICAgaWYgKGlzQmxhbmsoZmllbGQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGZpZWxkWzBdID09PSAnXycgJiYgaXNQcmVzZW50KG5vblByaXZhdGVQcmVmaXgoZmllbGQpKSk7XG5cbn1cblxuLyoqXG4gKiBUaGUgRXh0ZW5zaWJsZSBpbnRlcmZhY2UgY2FuIGJlIGltcGxlbWVudGVkIHdoZW4gYSBnaXZlbiBjbGFzc1xuICogd2FudHMgdG8gcHJvdmlkZSBkeW5hbWljYWxseSBhZGRlZCBmaWVsZHMuICBPbmNlIHRoaXMgaXMgaW1wbGVtZW50ZWRcbiAqIHRvIHJldHVybiBhIE1hcCwgdGhlIEZpZWxkVmFsdWUgc3lzdGVtIHdpbGwgYmUgYWJsZSB0byBsb29rIGluXG4gKiB0aGUgTWFwIHRvIHNlZSBpZiB0aGUgZGVzaXJlZCBmaWVsZCBleGlzdHMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV4dGVuc2libGVcbntcblxuICAgIC8qKlxuICAgICAqICBSZXR1cm5zIHRoZSBNYXAgaW4gd2hpY2ggdGhlIGR5bmFtaWNhbGx5IGFkZGVkIGZpZWxkcyByZXNpZGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBleHRlbmRlZEZpZWxkcygpOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cbn1cblxuIl19