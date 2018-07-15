(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('big-integer'), require('typescript-collections'), require('@angular/core'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/router'), require('rxjs'), require('@angular/platform-browser'), require('@angular/common'), require('object-path')) :
    typeof define === 'function' && define.amd ? define('@aribaui/core', ['exports', 'big-integer', 'typescript-collections', '@angular/core', 'rxjs/operators', '@angular/common/http', '@angular/router', 'rxjs', '@angular/platform-browser', '@angular/common', 'object-path'], factory) :
    (factory((global.aribaui = global.aribaui || {}, global.aribaui.core = {}),null,null,global.ng.core,global.rxjs.operators,global.ng.common.http,global.ng.router,global.rxjs,global.ng.platformBrowser,global.ng.common,null));
}(this, (function (exports,bigIntImported,Collections,core,operators,http,router,rxjs,platformBrowser,common,objectPath) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
    var StringWrapper = (function () {
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
                if (from === void 0) {
                    from = 0;
                }
                if (to === void 0) {
                    to = null;
                }
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
                if (position === void 0) {
                    position = 0;
                }
                if (!String.prototype.endsWith) {
                    String.prototype.endsWith = function (sstring, pos) {
                        if (pos === void 0) {
                            pos = 0;
                        }
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
    var StringJoiner = (function () {
        function StringJoiner(parts) {
            if (parts === void 0) {
                parts = [];
            }
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
    var NumberWrapper = (function () {
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
    var FunctionWrapper = (function () {
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
    var Json = (function () {
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
    var DateWrapper = (function () {
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
                if (month === void 0) {
                    month = 1;
                }
                if (day === void 0) {
                    day = 1;
                }
                if (hour === void 0) {
                    hour = 0;
                }
                if (minutes === void 0) {
                    minutes = 0;
                }
                if (seconds === void 0) {
                    seconds = 0;
                }
                if (milliseconds === void 0) {
                    milliseconds = 0;
                }
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
    var BooleanWrapper = (function () {
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
                if (value === void 0) {
                    value = false;
                }
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
                        ((Map)).prototype[key] === Map.prototype['entries']) {
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
     * @param {?} obj
     * @return {?}
     */
    function objectValues(obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return))
                            _a.call(keys_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
        if (separator === void 0) {
            separator = ' ';
        }
        if (initialCaps === void 0) {
            initialCaps = true;
        }
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
    var /**
     * The Extensible interface can be implemented when a given class
     * wants to provide dynamically added fields.  Once this is implemented
     * to return a Map, the FieldValue system will be able to look in
     * the Map to see if the desired field exists.
     *
     *
     * @abstract
     */ Extensible = (function () {
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
        if ((((new Map()).keys())).next) {
            return function _clearValuesInner(m) {
                var /** @type {?} */ keyIterator = m.keys();
                var /** @type {?} */ k /** TODO #???? */;
                while (!((k = ((keyIterator)).next()).done)) {
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
    var MapWrapper = (function () {
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
                catch (e) {
                }
                var /** @type {?} */ map = new Map();
                m.forEach(function (v, k) {
                    map.set(k, v);
                });
                return map;
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
                    m.forEach(function (v, k) { return ((r))[k] = v; });
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
                if (inner === void 0) {
                    inner = false;
                }
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return))
                            _a.call(keys_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                var /** @type {?} */ map = new Map();
                for (var /** @type {?} */ i = 0; i < keys.length; i++) {
                    map.set(keys[i], MapWrapper.createEmpty());
                }
                return map;
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
    var /**
     * Wraps Javascript Objects
     */ StringMapWrapper = (function () {
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
            function (map, key) {
                return map.hasOwnProperty(key);
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
            function (map, key) {
                return map.hasOwnProperty(key) ? map[key] : undefined;
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
            function (map, key, value) {
                map[key] = value;
            };
        /**
         * @param {?} map
         * @return {?}
         */
        StringMapWrapper.isEmpty = /**
         * @param {?} map
         * @return {?}
         */
            function (map) {
                for (var /** @type {?} */ prop in map) {
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
            function (map, key) {
                delete map[key];
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
            function (map, callback) {
                try {
                    for (var _a = __values(Object.keys(map)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var k = _b.value;
                        callback(map[k], k);
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
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
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
                try {
                    for (var _d = __values(Object.keys(m2)), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var k = _e.value;
                        m[k] = m2[k];
                    }
                }
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (_e && !_e.done && (_f = _d.return))
                            _f.call(_d);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
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
    var ListWrapper = (function () {
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
                if (startIndex === void 0) {
                    startIndex = 0;
                }
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
                if (start === void 0) {
                    start = 0;
                }
                if (end === void 0) {
                    end = null;
                }
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
                if (from === void 0) {
                    from = 0;
                }
                if (to === void 0) {
                    to = null;
                }
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
                catch (e_5_1) {
                    e_5 = { error: e_5_1 };
                }
                finally {
                    try {
                        if (l_1_1 && !l_1_1.done && (_a = l_1.return))
                            _a.call(l_1);
                    }
                    finally {
                        if (e_5)
                            throw e_5.error;
                    }
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
                catch (e_6_1) {
                    e_6 = { error: e_6_1 };
                }
                finally {
                    try {
                        if (target_1_1 && !target_1_1.done && (_a = target_1.return))
                            _a.call(target_1);
                    }
                    finally {
                        if (e_6)
                            throw e_6.error;
                    }
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
                var /** @type {?} */ contains = Collections.arrays.contains(list, element, function (item1, item2) {
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
                        var /** @type {?} */ contains = Collections.arrays.contains(list, elem, function (item1, item2) {
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
                catch (e_7_1) {
                    e_7 = { error: e_7_1 };
                }
                finally {
                    try {
                        if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return))
                            _a.call(elements_1);
                    }
                    finally {
                        if (e_7)
                            throw e_7.error;
                    }
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
    var /** @type {?} */ AppConfigToken = new core.InjectionToken('App.Config');
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
    var AppConfig = (function () {
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
                this.set(AppConfig.IsDevMode, core.isDevMode());
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
                if (isNested === void 0) {
                    isNested = false;
                }
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
    var Environment = (function () {
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
            this.onLocaleChange = new core.EventEmitter();
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
             */ function () {
                return this._locale;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Injectable },
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
        return isPresent(entity) && isPresent(((entity)).identity);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    function isValue(val) {
        return isPresent(val) && isPresent(((val)).clone);
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
    var /**
     * Set of AST like classes to keep the fluent API grammar in the abstract format to give developers
     * changes to provide their own implementation
     *
     * Todo: Expose Builder as a service
     *
     * @abstract
     */ UrlSegment = (function () {
        function UrlSegment(type, value, params, rank) {
            if (rank === void 0) {
                rank = -1;
            }
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
    var HostSegment = (function (_super) {
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
    var ContextSegment = (function (_super) {
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
    var ActionSegment = (function (_super) {
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
    var ResourceSegment = (function (_super) {
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
    var IdentifierSegment = (function (_super) {
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
    var OfParentSegment = (function (_super) {
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
    var /**
     * Default implementation that reads abstract URL structure and assembles correct URL.
     */ DefaultRestBuilder = (function () {
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
                            var /** @type {?} */ resSegment = (sortedSegments[i]);
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
                if (((sortedSegments[0])).value === RestAction.Do) {
                    url.add('/').add('actions').add('/').add(((sortedSegments[0])).data);
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
                var /** @type {?} */ action = (this.urlGroup.lookup(RestSegmentType.Action));
                switch (action.actionType) {
                    case RestAction.Save:
                    case RestAction.Do:
                        // make sure we have a Identifier
                        var /** @type {?} */ withIdCount = this.urlGroup.count(RestSegmentType.Identifier);
                        var /** @type {?} */ of = this.urlGroup.lookup(RestSegmentType.OfParent);
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
                    var /** @type {?} */ of = segments[ofIndex];
                    var /** @type {?} */ segment = void 0;
                    do {
                        segment = segments[--ofIndex];
                        segment.rank *= of.rank;
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
    var /**
     *
     * This class just aggregates and provides convient apit to to work with UrlSegments
     *
     */ RestUrlGroup = (function () {
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
                            return hasMatch && ((s)).value === byResource;
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
             */ function () {
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
    var Resource = (function () {
        function Resource(http$$1, appConfig) {
            this.http = http$$1;
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
                var /** @type {?} */ isSave = ((urlSegment)).actionType === RestAction.Save;
                assert(isSave, 'withData can be used with SAVE operation only!');
                ((urlSegment)).data = data;
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
             */ function () {
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
                if (options === void 0) {
                    options = { observe: 'body' };
                }
                var /** @type {?} */ segment = (this.urlGroup.lookup(RestSegmentType.Action));
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
                            if (isBlank(((segment.data)).identity())) {
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
                return observable.pipe(operators.map(function (res) { return _this.convertToComposite(res, true, false); })).subscribe(subscriber);
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
                if (options === void 0) {
                    options = { observe: 'response' };
                }
                var /** @type {?} */ segment = (this.urlGroup.lookup(RestSegmentType.Action));
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
                            if (isBlank(((segment.data)).identity())) {
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
                return observable.pipe(operators.map(function (res) { return _this.convertToComposite(res, false, hasProgress); }))
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
             */ function () {
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
             */ function () {
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
             */ function () {
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
                var /** @type {?} */ sgm = (this.urlGroup.lookup(RestSegmentType.Resource));
                if (isComposite) {
                    return this.deserialize(((res)).payload, sgm.value);
                }
                else {
                    var /** @type {?} */ httpRes = (res);
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Resource.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: AppConfig }
            ];
        };
        return Resource;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NotFoundComponent = (function () {
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
            { type: core.Component, args: [{
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
    var RoutingService = (function () {
        function RoutingService(router$$1) {
            var _this = this;
            this.router = router$$1;
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
            this.stateCache = new rxjs.Subject();
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
                if (event instanceof router.NavigationEnd) {
                    var /** @type {?} */ url = event.url;
                    if (this.stateCacheHistory.has(url)) {
                        this.stateCache.next(this.stateCacheHistory.get(url));
                        this.stateCacheHistory.delete(url);
                    }
                    this.routingState.push(event);
                }
                if (event instanceof router.NavigationStart) {
                    var /** @type {?} */ itemBeforeRoute = ListWrapper.last(this.routingState);
                    if (isPresent(this.currentStateFrom) && isPresent(itemBeforeRoute) && isPresent(this.currentStateFrom) && itemBeforeRoute instanceof router.NavigationEnd ||
                        itemBeforeRoute instanceof router.NavigationStart) {
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
                if (numOfSteps === void 0) {
                    numOfSteps = 1;
                }
                // we are starting from -1 as we need to also remove current route
                var /** @type {?} */ steps = -1;
                var /** @type {?} */ navigateUrl = '/404';
                while (steps !== numOfSteps) {
                    var /** @type {?} */ popState = this.routingState.pop();
                    if (popState instanceof router.NavigationEnd || popState instanceof router.NavigationStart) {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        RoutingService.ctorParameters = function () {
            return [
                { type: router.Router }
            ];
        };
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
    var Notifications = (function () {
        function Notifications() {
            this.events = new rxjs.Subject();
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
                return this.events.pipe(operators.filter(function (msg) { return msg.topic === topic || topic === toAll; }), operators.map(function (msg) { return msg.content; })).subscribe(subscriber);
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        Notifications.ctorParameters = function () { return []; };
        return Notifications;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var GlobalErrorHandler = (function (_super) {
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        GlobalErrorHandler.ctorParameters = function () {
            return [
                { type: Notifications }
            ];
        };
        return GlobalErrorHandler;
    }(core.ErrorHandler));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ routes = [
        { path: 'not-found', component: NotFoundComponent }
    ];
    var AribaCoreRoutingModule = (function () {
        function AribaCoreRoutingModule() {
        }
        AribaCoreRoutingModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            router.RouterModule.forChild(routes)
                        ],
                        exports: [router.RouterModule],
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
    var HttpMockInterceptor = (function () {
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
                        return rxjs.of(/** @type {?} */ (mockedResp));
                    }
                    else {
                        var /** @type {?} */ errror = new http.HttpErrorResponse({
                            error: mockedResp.body,
                            status: mockedResp.status,
                            statusText: mockedResp.statusText,
                            url: req.urlWithParams
                        });
                        rxjs.throwError(errror);
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (routes_1_1 && !routes_1_1.done && (_a = routes_1.return))
                            _a.call(routes_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                return new http.HttpRequest('GET', "" + assetFolder + path + "/" + routeName + ".json", {
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
                    return new http.HttpResponse({
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
                    return new http.HttpResponse({
                        body: payload,
                        status: route.responseCode,
                        statusText: route.responseText,
                        url: route.path
                    });
                }
                return null;
            };
        HttpMockInterceptor.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        HttpMockInterceptor.ctorParameters = function () {
            return [
                { type: AppConfig }
            ];
        };
        return HttpMockInterceptor;
    }());
    /**
     * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
     */
    var /**
     * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
     */ MockInterceptorHandler = (function () {
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
    var /** @type {?} */ UserConfig = new core.InjectionToken('UserConfig');
    /**
     * Core mode includes all shared logic accross whole application
     */
    var AribaCoreModule = (function () {
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
                if (config === void 0) {
                    config = {};
                }
                return {
                    ngModule: AribaCoreModule,
                    providers: [
                        platformBrowser.Title,
                        platformBrowser.Meta,
                        Environment,
                        Notifications,
                        HttpMockInterceptor,
                        Resource,
                        { provide: UserConfig, useValue: config },
                        {
                            provide: AppConfig, useFactory: makeConfig,
                            deps: [UserConfig, core.Injector, Environment]
                        },
                        {
                            provide: http.HttpHandler,
                            useFactory: makeHttpClientHandler,
                            deps: [
                                http.HttpBackend, AppConfig, HttpMockInterceptor,
                                [new core.Optional(), new core.Inject(http.HTTP_INTERCEPTORS)]
                            ],
                        },
                        { provide: core.ErrorHandler, useClass: GlobalErrorHandler, deps: [Notifications] },
                        { provide: RoutingService, useClass: RoutingService, deps: [router.Router] }
                    ]
                };
            };
        AribaCoreModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            http.HttpClientModule,
                            AribaCoreRoutingModule
                        ],
                        declarations: [NotFoundComponent],
                        bootstrap: []
                    },] },
        ];
        /** @nocollapse */
        AribaCoreModule.ctorParameters = function () {
            return [
                { type: AribaCoreModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
                { type: AppConfig }
            ];
        };
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
        if (interceptors === void 0) {
            interceptors = [];
        }
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
    var /**
     * The FieldPath is utility class for representing of a dotted fieldPath.
     *
     * A String such as "foo.bar.baz" can be used to access a value on a target object.
     *
     */ FieldPath = (function () {
        function FieldPath(_path) {
            this._path = _path;
            this._fieldPaths = isBlank(_path) ? [] : _path.split('.');
            this.objectPathInstance = objectPath.create({ includeInheritedProps: true });
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
                        var /** @type {?} */ mapValue = (value);
                        return mapValue.get(this._fieldPaths[i + 1]);
                    }
                }
                return value;
            };
        Object.defineProperty(FieldPath.prototype, "path", {
            get: /**
             * @return {?}
             */ function () {
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
    var /**
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
     */ AribaApplication = (function () {
        function AribaApplication(appConfig) {
            this.appConfig = appConfig;
            this.metaTags = this.appConfig.injector.get(platformBrowser.Meta);
            this.title = this.appConfig.injector.get(platformBrowser.Title);
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

    exports.AppConfig = AppConfig;
    exports.makeConfig = makeConfig;
    exports.Environment = Environment;
    exports.Resource = Resource;
    exports.DefaultRestBuilder = DefaultRestBuilder;
    exports.isEntity = isEntity;
    exports.isValue = isValue;
    exports.ActionSegment = ActionSegment;
    exports.RestAction = RestAction;
    exports.ResourceSegment = ResourceSegment;
    exports.RestSegmentType = RestSegmentType;
    exports.UrlSegment = UrlSegment;
    exports.ContextSegment = ContextSegment;
    exports.HostSegment = HostSegment;
    exports.IdentifierSegment = IdentifierSegment;
    exports.OfParentSegment = OfParentSegment;
    exports.RestUrlGroup = RestUrlGroup;
    exports.MapWrapper = MapWrapper;
    exports.StringMapWrapper = StringMapWrapper;
    exports.ListWrapper = ListWrapper;
    exports.isListLikeIterable = isListLikeIterable$1;
    exports.areIterablesEqual = areIterablesEqual;
    exports.iterateListLike = iterateListLike;
    exports.findLast = findLast;
    exports.getTypeNameForDebugging = getTypeNameForDebugging;
    exports.unimplemented = unimplemented;
    exports.isPresent = isPresent;
    exports.isBlank = isBlank;
    exports.isBoolean = isBoolean;
    exports.isNumber = isNumber;
    exports.isString = isString;
    exports.isFunction = isFunction;
    exports.isType = isType;
    exports.isStringMap = isStringMap;
    exports.isStrictStringMap = isStrictStringMap;
    exports.isPromise = isPromise;
    exports.isArray = isArray;
    exports.isDate = isDate;
    exports.isWindow = isWindow;
    exports.isRegExp = isRegExp;
    exports.noop = noop;
    exports.stringify = stringify;
    exports.className = className;
    exports.applyMixins = applyMixins;
    exports.StringWrapper = StringWrapper;
    exports.StringJoiner = StringJoiner;
    exports.NumberWrapper = NumberWrapper;
    exports.FunctionWrapper = FunctionWrapper;
    exports.looseIdentical = looseIdentical;
    exports.getMapKey = getMapKey;
    exports.normalizeBlank = normalizeBlank;
    exports.normalizeBool = normalizeBool;
    exports.isJsObject = isJsObject;
    exports.print = print;
    exports.warn = warn;
    exports.assert = assert;
    exports.checksum = checksum;
    exports.crc32 = crc32;
    exports.Json = Json;
    exports.DateWrapper = DateWrapper;
    exports.BooleanWrapper = BooleanWrapper;
    exports.getSymbolIterator = getSymbolIterator;
    exports.evalExpression = evalExpression;
    exports.evalExpressionWithCntx = evalExpressionWithCntx;
    exports.isPrimitive = isPrimitive;
    exports.hasConstructor = hasConstructor;
    exports.escape = escape;
    exports.escapeRegExp = escapeRegExp;
    exports.hashCode = hashCode;
    exports.objectToName = objectToName;
    exports.equals = equals;
    exports.shiftLeft = shiftLeft;
    exports.shiftRight = shiftRight;
    exports.Extensible = Extensible;
    exports.readGlobalParam = readGlobalParam;
    exports.decamelize = decamelize;
    exports.nonPrivatePrefix = nonPrivatePrefix;
    exports.hasGetter = hasGetter;
    exports.uuid = uuid;
    exports.objectValues = objectValues;
    exports.NotFoundComponent = NotFoundComponent;
    exports.RoutingService = RoutingService;
    exports.AribaCoreModule = AribaCoreModule;
    exports.FieldPath = FieldPath;
    exports.AribaApplication = AribaApplication;
    exports.Notifications = Notifications;
    exports.ɵc = AribaCoreRoutingModule;
    exports.ɵa = UserConfig;
    exports.ɵb = makeHttpClientHandler;
    exports.ɵe = GlobalErrorHandler;
    exports.ɵd = HttpMockInterceptor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmF1aS1jb3JlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9AYXJpYmF1aS9jb3JlL3V0aWxzL2xhbmcudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvdXRpbHMvY29sbGVjdGlvbi50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9jb25maWcvYXBwLWNvbmZpZy50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9jb25maWcvZW52aXJvbm1lbnQudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZG9tYWluL2RvbWFpbi1tb2RlbC50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9kb21haW4vdXJsL3NlZ21lbnQudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZG9tYWluL3VybC9idWlsZGVyLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2RvbWFpbi91cmwvdXJsLWdyb3VwLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2RvbWFpbi9yZXNvdXJjZS5zZXJ2aWNlLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL25vdC1mb3VuZC9ub3QtZm91bmQuY29tcG9uZW50LnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL3JvdXRpbmcvcm91dGluZy5zZXJ2aWNlLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL21lc3NhZ2luZy9ub3RpZmljYXRpb25zLnNlcnZpY2UudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZ2xvYmFsLWVycm9yLWhhbmRsZXIudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvYXJpYmEtY29yZS1yb3V0aW5nLm1vZHVsZS50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9odHRwL2h0dHAtbW9jay1pbnRlcmNlcHRvci50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9hcmliYS5jb3JlLm1vZHVsZS50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS91dGlscy9maWVsZC1wYXRoLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2FyaWJhLWFwcGxpY2F0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiLyoqXG4gKlxuICogQG9yaWdpbmFsLWxpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICpcbiAqXG4gKlxuICogIENyZWRpdDogRGVyaXZlZCBhbmQgZXh0ZW5kZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyIGluIG9yZGVyIHRvIGhhdmUgc2V0IG9mXG4gKiAgcmV1c2FibGUgZ2xvYmFscy4gU2luY2UgaXRzIG5vdCBleHBvcnRlZCBBUEkgbmVlZCB0byBoYXZlIGEgY29weSB1bmRlciBjb3JlLlxuICovXG5pbXBvcnQgKiBhcyBiaWdJbnRJbXBvcnRlZCBmcm9tICdiaWctaW50ZWdlcic7XG5cbmNvbnN0IGJpZ0ludCA9IGJpZ0ludEltcG9ydGVkO1xuXG4vKipcbiAqICBTZXQgb2YgcmV1c2FibGUgZ2xvYmFscy4gVGhpcyBpcyB0YWtlbiBmcm9tIHRoZSBBbmd1bGFyIDIgc2luY2UgaXRzIG5vdCBleHBvcnRlZCBBUEkuIEFuZCB0aGVyZVxuICogIGlzIGEgbmVlZCBmb3Igc3VjaCBjb21tb24gZnVuY3Rpb25zIGFuZCB3cmFwcGVyc1xuICpcbiAqL1xuXG5jb25zdCBfX3dpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdztcbmNvbnN0IF9nbG9iYWw6IHsgW25hbWU6IHN0cmluZ106IGFueSB9ID0gX193aW5kb3c7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRHbG9iYWxQYXJhbSh2YXJOYW1lOiBhbnkpOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfVxue1xuICAgIHJldHVybiBfZ2xvYmFsW3Zhck5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEdsb2JhbFR5cGUodmFyTmFtZTogYW55KTogYW55XG57XG4gICAgcmV0dXJuIF9nbG9iYWxbdmFyTmFtZV07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGVOYW1lRm9yRGVidWdnaW5nKHR5cGU6IGFueSk6IHN0cmluZ1xue1xuICAgIGlmICh0eXBlWyduYW1lJ10pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVbJ25hbWUnXTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pbXBsZW1lbnRlZCgpOiBhbnlcbntcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaW1wbGVtZW50ZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJlc2VudChvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gb2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCbGFuayhvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhvYmo6IGFueSk6IG9iaiBpcyBzdHJpbmdcbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ01hcChvYmo6IGFueSk6IG9iaiBpcyBPYmplY3RcbntcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsO1xufVxuXG5jb25zdCBTVFJJTkdfTUFQX1BST1RPID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaWN0U3RyaW5nTWFwKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBpc1N0cmluZ01hcChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBTVFJJTkdfTUFQX1BST1RPO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIC8vIGFsbG93IGFueSBQcm9taXNlL0ErIGNvbXBsaWFudCB0aGVuYWJsZS5cbiAgICAvLyBJdCdzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZW5zdXJlIHRoYXQgb2JqLnRoZW4gY29uZm9ybXMgdG8gdGhlIHNwZWNcbiAgICByZXR1cm4gaXNQcmVzZW50KG9iaikgJiYgaXNGdW5jdGlvbihvYmoudGhlbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUob2JqOiBhbnkpOiBvYmogaXMgRGF0ZVxue1xuICAgIHJldHVybiAob2JqIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ob2JqLnZhbHVlT2YoKSkpIHx8XG4gICAgICAgIChpc1ByZXNlbnQob2JqKSAmJiBpc0Z1bmN0aW9uKG9iai5ub3cpKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIGlmICghaXNKc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKSB8fFxuICAgICAgICAoIShvYmogaW5zdGFuY2VvZiBNYXApICYmICAgICAgLy8gSlMgTWFwIGFyZSBpdGVyYWJsZXMgYnV0IHJldHVybiBlbnRyaWVzIGFzIFtrLCB2XVxuICAgICAgICAgICAgZ2V0U3ltYm9sSXRlcmF0b3IoKSBpbiBvYmopOyAgLy8gSlMgSXRlcmFibGUgaGF2ZSBhIFN5bWJvbC5pdGVyYXRvciBwcm9wXG59XG5cblxuLyoqXG4gKiBDaGVja3MgaWYgYG9iamAgaXMgYSB3aW5kb3cgb2JqZWN0LlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzV2luZG93KG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBvYmogJiYgb2JqLndpbmRvdyA9PT0gb2JqO1xufVxuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIHZhbHVlIGlzIGEgcmVndWxhciBleHByZXNzaW9uIG9iamVjdC5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZ0V4cCh2YWx1ZTogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpXG57XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaWZ0TGVmdChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlclxue1xuICAgIHJldHVybiBiaWdJbnQoYSkuc2hpZnRMZWZ0KGIpLnZhbHVlT2YoKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2hpZnRSaWdodChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlclxue1xuICAgIHJldHVybiBiaWdJbnQoYSkuc2hpZnRSaWdodChiKS52YWx1ZU9mKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeSh0b2tlbjogYW55KTogc3RyaW5nXG57XG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cblxuICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkIHx8IHRva2VuID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJyArIHRva2VuO1xuICAgIH1cblxuICAgIGlmICh0b2tlbi5vdmVycmlkZGVuTmFtZSkge1xuICAgICAgICByZXR1cm4gdG9rZW4ub3ZlcnJpZGRlbk5hbWU7XG4gICAgfVxuICAgIGlmICh0b2tlbi5uYW1lKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi5uYW1lO1xuICAgIH1cblxuICAgIGxldCByZXMgPSB0b2tlbi50b1N0cmluZygpO1xuICAgIGxldCBuZXdMaW5lSW5kZXggPSByZXMuaW5kZXhPZignXFxuJyk7XG4gICAgcmV0dXJuIChuZXdMaW5lSW5kZXggPT09IC0xKSA/IHJlcyA6IHJlcy5zdWJzdHJpbmcoMCwgbmV3TGluZUluZGV4KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NOYW1lKGNsYXp6OiBhbnkpOiBzdHJpbmdcbntcbiAgICBpZiAoaXNQcmVzZW50KGNsYXp6LmNvbnN0cnVjdG9yKSkge1xuICAgICAgICBsZXQgY2xhc3NOID0gY2xhenouY29uc3RydWN0b3IudG9TdHJpbmcoKTtcbiAgICAgICAgY2xhc3NOID0gY2xhc3NOLnN1YnN0cignZnVuY3Rpb24gJy5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gY2xhc3NOLnN1YnN0cigwLCBjbGFzc04uaW5kZXhPZignKCcpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsYXp6O1xufVxuXG5cbi8qKlxuICogIFNvdXJjZTogaHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL2RvY3MvaGFuZGJvb2svbWl4aW5zLmh0bWxcbiAqXG4gKiAgRnVuY3Rpb24gdGhhdCBjb3BpZXMgcHJvcGVydGllcyBvZiB0aGUgYmFzZUN0b3JzIHRvIGRlcml2ZWRDdG9yLlxuICogIENhbiBiZSB1c2VkIHRvIGFjaGlldmUgbXVsdGlwbGUgaW5oZXJpdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseU1peGlucyhkZXJpdmVkQ3RvcjogYW55LCBiYXNlQ3RvcnM6IGFueVtdKVxue1xuICAgIGJhc2VDdG9ycy5mb3JFYWNoKGJhc2VDdG9yID0+XG4gICAge1xuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiYXNlQ3Rvci5wcm90b3R5cGUpLmZvckVhY2gobmFtZSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV1cbiAgICAgICAgICAgICAgICA9IGJhc2VDdG9yLnByb3RvdHlwZVtuYW1lXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdXcmFwcGVyXG57XG4gICAgc3RhdGljIGZyb21DaGFyQ29kZShjb2RlOiBudW1iZXIpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjaGFyQ29kZUF0KHM6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHMuY2hhckNvZGVBdChpbmRleCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNwbGl0KHM6IHN0cmluZywgcmVnRXhwOiBSZWdFeHApOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHMuc3BsaXQocmVnRXhwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKHM6IHN0cmluZywgczI6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzID09PSBzMjtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RyaXBMZWZ0KHM6IHN0cmluZywgY2hhclZhbDogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc1tpXSAhPT0gY2hhclZhbCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcocG9zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RyaXBSaWdodChzOiBzdHJpbmcsIGNoYXJWYWw6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNbaV0gIT09IGNoYXJWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlcGxhY2Uoczogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZShmcm9tLCByZXBsYWNlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVwbGFjZUFsbChzOiBzdHJpbmcsIGZyb206IFJlZ0V4cCwgcmVwbGFjZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKGZyb20sIHJlcGxhY2UpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzbGljZTxUPihzOiBzdHJpbmcsIGZyb206IG51bWJlciA9IDAsIHRvOiBudW1iZXIgPSBudWxsKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gcy5zbGljZShmcm9tLCB0byA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHRvKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnMoczogc3RyaW5nLCBzdWJzdHI6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzLmluZGV4T2Yoc3Vic3RyKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbXBhcmUoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGEgPiBiKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZW5kc1dpZHRoKHN1YmplY3Q6IHN0cmluZywgc2VhcmNoU3RyaW5nOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKCFTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSB7XG4gICAgICAgICAgICBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHNzdHJpbmcsIHBvcyA9IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IHN1YmplY3RTdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3MgIT09ICdudW1iZXInIHx8ICFpc0Zpbml0ZShwb3MpIHx8IE1hdGguZmxvb3IocG9zKSAhPT0gcG9zIHx8IHBvc1xuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3RTdHJpbmcubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gc3ViamVjdFN0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcyAtPSBzc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEluZGV4ID0gc3ViamVjdFN0cmluZy5pbmRleE9mKHNzdHJpbmcsIHBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3M7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmVuZHNXaXRoKHNlYXJjaFN0cmluZyk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgc3RhcnRzV2lkdGgoc3ViamVjdDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmluZGV4T2Yoc2VhcmNoU3RyaW5nKSA9PT0gMDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdKb2luZXJcbntcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFydHM6IHN0cmluZ1tdID0gW10pXG4gICAge1xuICAgIH1cblxuICAgIGFkZChwYXJ0OiBzdHJpbmcpOiBTdHJpbmdKb2luZXJcbiAgICB7XG4gICAgICAgIHRoaXMucGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBsYXN0KCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHNbdGhpcy5wYXJ0cy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnRzLmpvaW4oJycpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgTnVtYmVyV3JhcHBlclxue1xuICAgIHN0YXRpYyB0b0ZpeGVkKG46IG51bWJlciwgZnJhY3Rpb25EaWdpdHM6IG51bWJlcik6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIG4udG9GaXhlZChmcmFjdGlvbkRpZ2l0cyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFsKGE6IG51bWJlciwgYjogbnVtYmVyKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlSW50QXV0b1JhZGl4KHRleHQ6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gcGFyc2VJbnQodGV4dCk7XG4gICAgICAgIGlmIChpc05hTihyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50ZWdlciBsaXRlcmFsIHdoZW4gcGFyc2luZyAnICsgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VJbnQodGV4dDogc3RyaW5nLCByYWRpeDogbnVtYmVyKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAocmFkaXggPT09IDEwKSB7XG4gICAgICAgICAgICBpZiAoL14oXFwtfFxcKyk/WzAtOV0rJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmFkaXggPT09IDE2KSB7XG4gICAgICAgICAgICBpZiAoL14oXFwtfFxcKyk/WzAtOUFCQ0RFRmFiY2RlZl0rJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgJyArIHRleHQgKyAnIGluIGJhc2UgJyArIHJhZGl4KTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBOYU4gaXMgYSB2YWxpZCBsaXRlcmFsIGJ1dCBpcyByZXR1cm5lZCBieSBwYXJzZUZsb2F0IHRvIGluZGljYXRlIGFuIGVycm9yLlxuICAgIHN0YXRpYyBwYXJzZUZsb2F0KHRleHQ6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGV4dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzTnVtZXJpYyh2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuICFpc05hTih2YWx1ZSAtIHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOYU4odmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc05hTih2YWx1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzSW50ZWdlcih2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uV3JhcHBlclxue1xuICAgIHN0YXRpYyBhcHBseShmbjogRnVuY3Rpb24sIHBvc0FyZ3M6IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIHBvc0FyZ3MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBiaW5kKGZuOiBGdW5jdGlvbiwgc2NvcGU6IGFueSk6IEZ1bmN0aW9uXG4gICAge1xuICAgICAgICByZXR1cm4gZm4uYmluZChzY29wZSk7XG4gICAgfVxufVxuXG4vLyBKUyBoYXMgTmFOICE9PSBOYU5cbmV4cG9ydCBmdW5jdGlvbiBsb29zZUlkZW50aWNhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gYSA9PT0gYiB8fCB0eXBlb2YgYSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGIgPT09ICdudW1iZXInICYmIGlzTmFOKGEpICYmIGlzTmFOKGIpO1xufVxuXG4vLyBKUyBjb25zaWRlcnMgTmFOIGlzIHRoZSBzYW1lIGFzIE5hTiBmb3IgbWFwIEtleSAod2hpbGUgTmFOICE9PSBOYU4gb3RoZXJ3aXNlKVxuLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcFxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hcEtleTxUPih2YWx1ZTogVCk6IFRcbntcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVCbGFuayhvYmo6IE9iamVjdCk6IGFueVxue1xuICAgIHJldHVybiBpc0JsYW5rKG9iaikgPyBudWxsIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQm9vbChvYmo6IGJvb2xlYW4pOiBib29sZWFuXG57XG4gICAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IGZhbHNlIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNKc09iamVjdChvOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIG8gIT09IG51bGwgJiYgKHR5cGVvZiBvID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvID09PSAnb2JqZWN0Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludChvYmo6IEVycm9yIHwgT2JqZWN0KVxue1xuICAgIGNvbnNvbGUubG9nKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXJuKG9iajogRXJyb3IgfCBPYmplY3QpXG57XG4gICAgY29uc29sZS53YXJuKG9iaik7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb246IGJvb2xlYW4sIG1zZzogc3RyaW5nKVxue1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrc3VtKHM6IGFueSlcbntcbiAgICBsZXQgY2hrID0gMHgxMjM0NTY3ODtcbiAgICBsZXQgbGVuID0gcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGsgKz0gKHMuY2hhckNvZGVBdChpKSAqIChpICsgMSkpO1xuICAgIH1cblxuICAgIHJldHVybiAoY2hrICYgMHhmZmZmZmZmZikudG9TdHJpbmcoMTYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JjMzIoY3JjOiBudW1iZXIsIGFuSW50OiBudW1iZXIpXG57XG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICBsZXQgdGFibGUgPSAnMDAwMDAwMDAgNzcwNzMwOTYgRUUwRTYxMkMgOTkwOTUxQkEgMDc2REM0MTkgNzA2QUY0OEYgRTk2M0E1MzUgOUU2NDk1QTMgMEVEQjg4MzIgNzlEQ0I4QTQgRTBENUU5MUUgOTdEMkQ5ODggMDlCNjRDMkIgN0VCMTdDQkQgRTdCODJEMDcgOTBCRjFEOTEgMURCNzEwNjQgNkFCMDIwRjIgRjNCOTcxNDggODRCRTQxREUgMUFEQUQ0N0QgNkREREU0RUIgRjRENEI1NTEgODNEMzg1QzcgMTM2Qzk4NTYgNjQ2QkE4QzAgRkQ2MkY5N0EgOEE2NUM5RUMgMTQwMTVDNEYgNjMwNjZDRDkgRkEwRjNENjMgOEQwODBERjUgM0I2RTIwQzggNEM2OTEwNUUgRDU2MDQxRTQgQTI2NzcxNzIgM0MwM0U0RDEgNEIwNEQ0NDcgRDIwRDg1RkQgQTUwQUI1NkIgMzVCNUE4RkEgNDJCMjk4NkMgREJCQkM5RDYgQUNCQ0Y5NDAgMzJEODZDRTMgNDVERjVDNzUgRENENjBEQ0YgQUJEMTNENTkgMjZEOTMwQUMgNTFERTAwM0EgQzhENzUxODAgQkZEMDYxMTYgMjFCNEY0QjUgNTZCM0M0MjMgQ0ZCQTk1OTkgQjhCREE1MEYgMjgwMkI4OUUgNUYwNTg4MDggQzYwQ0Q5QjIgQjEwQkU5MjQgMkY2RjdDODcgNTg2ODRDMTEgQzE2MTFEQUIgQjY2NjJEM0QgNzZEQzQxOTAgMDFEQjcxMDYgOThEMjIwQkMgRUZENTEwMkEgNzFCMTg1ODkgMDZCNkI1MUYgOUZCRkU0QTUgRThCOEQ0MzMgNzgwN0M5QTIgMEYwMEY5MzQgOTYwOUE4OEUgRTEwRTk4MTggN0Y2QTBEQkIgMDg2RDNEMkQgOTE2NDZDOTcgRTY2MzVDMDEgNkI2QjUxRjQgMUM2QzYxNjIgODU2NTMwRDggRjI2MjAwNEUgNkMwNjk1RUQgMUIwMUE1N0IgODIwOEY0QzEgRjUwRkM0NTcgNjVCMEQ5QzYgMTJCN0U5NTAgOEJCRUI4RUEgRkNCOTg4N0MgNjJERDFEREYgMTVEQTJENDkgOENEMzdDRjMgRkJENDRDNjUgNERCMjYxNTggM0FCNTUxQ0UgQTNCQzAwNzQgRDRCQjMwRTIgNEFERkE1NDEgM0REODk1RDcgQTREMUM0NkQgRDNENkY0RkIgNDM2OUU5NkEgMzQ2RUQ5RkMgQUQ2Nzg4NDYgREE2MEI4RDAgNDQwNDJENzMgMzMwMzFERTUgQUEwQTRDNUYgREQwRDdDQzkgNTAwNTcxM0MgMjcwMjQxQUEgQkUwQjEwMTAgQzkwQzIwODYgNTc2OEI1MjUgMjA2Rjg1QjMgQjk2NkQ0MDkgQ0U2MUU0OUYgNUVERUY5MEUgMjlEOUM5OTggQjBEMDk4MjIgQzdEN0E4QjQgNTlCMzNEMTcgMkVCNDBEODEgQjdCRDVDM0IgQzBCQTZDQUQgRURCODgzMjAgOUFCRkIzQjYgMDNCNkUyMEMgNzRCMUQyOUEgRUFENTQ3MzkgOUREMjc3QUYgMDREQjI2MTUgNzNEQzE2ODMgRTM2MzBCMTIgOTQ2NDNCODQgMEQ2RDZBM0UgN0E2QTVBQTggRTQwRUNGMEIgOTMwOUZGOUQgMEEwMEFFMjcgN0QwNzlFQjEgRjAwRjkzNDQgODcwOEEzRDIgMUUwMUYyNjggNjkwNkMyRkUgRjc2MjU3NUQgODA2NTY3Q0IgMTk2QzM2NzEgNkU2QjA2RTcgRkVENDFCNzYgODlEMzJCRTAgMTBEQTdBNUEgNjdERDRBQ0MgRjlCOURGNkYgOEVCRUVGRjkgMTdCN0JFNDMgNjBCMDhFRDUgRDZENkEzRTggQTFEMTkzN0UgMzhEOEMyQzQgNEZERkYyNTIgRDFCQjY3RjEgQTZCQzU3NjcgM0ZCNTA2REQgNDhCMjM2NEIgRDgwRDJCREEgQUYwQTFCNEMgMzYwMzRBRjYgNDEwNDdBNjAgREY2MEVGQzMgQTg2N0RGNTUgMzE2RThFRUYgNDY2OUJFNzkgQ0I2MUIzOEMgQkM2NjgzMUEgMjU2RkQyQTAgNTI2OEUyMzYgQ0MwQzc3OTUgQkIwQjQ3MDMgMjIwMjE2QjkgNTUwNTI2MkYgQzVCQTNCQkUgQjJCRDBCMjggMkJCNDVBOTIgNUNCMzZBMDQgQzJEN0ZGQTcgQjVEMENGMzEgMkNEOTlFOEIgNUJERUFFMUQgOUI2NEMyQjAgRUM2M0YyMjYgNzU2QUEzOUMgMDI2RDkzMEEgOUMwOTA2QTkgRUIwRTM2M0YgNzIwNzY3ODUgMDUwMDU3MTMgOTVCRjRBODIgRTJCODdBMTQgN0JCMTJCQUUgMENCNjFCMzggOTJEMjhFOUIgRTVENUJFMEQgN0NEQ0VGQjcgMEJEQkRGMjEgODZEM0QyRDQgRjFENEUyNDIgNjhEREIzRjggMUZEQTgzNkUgODFCRTE2Q0QgRjZCOTI2NUIgNkZCMDc3RTEgMThCNzQ3NzcgODgwODVBRTYgRkYwRjZBNzAgNjYwNjNCQ0EgMTEwMTBCNUMgOEY2NTlFRkYgRjg2MkFFNjkgNjE2QkZGRDMgMTY2Q0NGNDUgQTAwQUUyNzggRDcwREQyRUUgNEUwNDgzNTQgMzkwM0IzQzIgQTc2NzI2NjEgRDA2MDE2RjcgNDk2OTQ3NEQgM0U2RTc3REIgQUVEMTZBNEEgRDlENjVBREMgNDBERjBCNjYgMzdEODNCRjAgQTlCQ0FFNTMgREVCQjlFQzUgNDdCMkNGN0YgMzBCNUZGRTkgQkRCREYyMUMgQ0FCQUMyOEEgNTNCMzkzMzAgMjRCNEEzQTYgQkFEMDM2MDUgQ0RENzA2OTMgNTRERTU3MjkgMjNEOTY3QkYgQjM2NjdBMkUgQzQ2MTRBQjggNUQ2ODFCMDIgMkE2RjJCOTQgQjQwQkJFMzcgQzMwQzhFQTEgNUEwNURGMUIgMkQwMkVGOEQnO1xuICAgIC8qIHRzbGludDplbmFibGUgKi9cblxuICAgIGxldCB4ID0gMDtcbiAgICBsZXQgeSA9IDA7XG5cbiAgICBsZXQgbXlDcmMgPSBjcmMgXiAoLTEpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIHkgPSAoY3JjIF4gYW5JbnQpICYgMHhGRjtcbiAgICAgICAgeCA9IE51bWJlcignMHgnICsgdGFibGUuc3Vic3RyKHkgKiA5LCA4KSk7XG4gICAgICAgIGNyYyA9IChjcmMgPj4+IDgpIF4geDtcbiAgICB9XG4gICAgcmV0dXJuIGNyYyBeICgtMSk7XG59XG5cblxuLy8gQ2FuJ3QgYmUgYWxsIHVwcGVyY2FzZSBhcyBvdXIgdHJhbnNwaWxlciB3b3VsZCB0aGluayBpdCBpcyBhIHNwZWNpYWwgZGlyZWN0aXZlLi4uXG5leHBvcnQgY2xhc3MgSnNvblxue1xuICAgIHN0YXRpYyBwYXJzZShzOiBzdHJpbmcpOiBPYmplY3RcbiAgICB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdHJpbmdpZnkoZGF0YTogT2JqZWN0KTogc3RyaW5nXG4gICAge1xuICAgICAgICAvLyBEYXJ0IGRvZXNuJ3QgdGFrZSAzIGFyZ3VtZW50c1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0ZVdyYXBwZXJcbntcbiAgICBzdGF0aWMgY3JlYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciA9IDEsIGRheTogbnVtYmVyID0gMSwgaG91cjogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgICBzZWNvbmRzOiBudW1iZXIgPSAwLCBtaWxsaXNlY29uZHM6IG51bWJlciA9IDApOiBEYXRlXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21JU09TdHJpbmcoc3RyOiBzdHJpbmcpOiBEYXRlXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoc3RyKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbU1pbGxpcyhtczogbnVtYmVyKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG1zKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9NaWxsaXMoZGF0ZTogRGF0ZSk6IG51bWJlclxuICAgIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBub3coKTogRGF0ZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvSnNvbihkYXRlOiBEYXRlKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gZGF0ZS50b0pTT04oKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEJvb2xlYW5XcmFwcGVyXG57XG5cbiAgICBzdGF0aWMgYm9sZWFuVmFsdWUodmFsdWU6IGFueSA9IGZhbHNlKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzRmFsc2UodmFsdWU6IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ2ZhbHNlJztcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZ01hcCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlID09PSBmYWxzZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzVHJ1ZSh2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmdNYXAodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSA9PT0gdHJ1ZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuXG4vLyBXaGVuIFN5bWJvbC5pdGVyYXRvciBkb2Vzbid0IGV4aXN0LCByZXRyaWV2ZXMgdGhlIGtleSB1c2VkIGluIGVzNi1zaGltXG5kZWNsYXJlIGxldCBTeW1ib2w6IGFueTtcbmxldCBfc3ltYm9sSXRlcmF0b3I6IGFueSA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTeW1ib2xJdGVyYXRvcigpOiBzdHJpbmcgfCBzeW1ib2xcbntcbiAgICBpZiAoaXNCbGFuayhfc3ltYm9sSXRlcmF0b3IpKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoU3ltYm9sLml0ZXJhdG9yKSkge1xuICAgICAgICAgICAgX3N5bWJvbEl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZXM2LXNoaW0gc3BlY2lmaWMgbG9naWNcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTWFwLnByb3RvdHlwZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnZW50cmllcycgJiYga2V5ICE9PSAnc2l6ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgKE1hcCBhcyBhbnkpLnByb3RvdHlwZVtrZXldID09PSBNYXAucHJvdG90eXBlWydlbnRyaWVzJ10pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBfc3ltYm9sSXRlcmF0b3IgPSBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfc3ltYm9sSXRlcmF0b3I7XG59XG5cbmNvbnN0IFJlc2VydmVkS2V5d29yZCA9IFsnY2xhc3MnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWxFeHByZXNzaW9uKGV4cHI6IHN0cmluZywgZGVjbGFyYXRpb25zOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0czogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IGFueVxue1xuICAgIGxldCBmbkJvZHkgPSBgJHtkZWNsYXJhdGlvbnN9XFxuXFx0cmV0dXJuICR7ZXhwcn1cXG4vLyMgc291cmNlVVJMPUFyaWJhRXhwcmVzc2lvbmA7XG4gICAgbGV0IGZuQXJnTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGZuQXJnVmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGFyZ05hbWUgaW4gbGV0cykge1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBhcmdOYW1lKSkge1xuICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaChsZXRzW2FyZ05hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGV0cyBpbnN0YW5jZW9mIEV4dGVuc2libGUpIHtcbiAgICAgICAgbGV0IGV4dFZhbHVlczogRXh0ZW5zaWJsZSA9IGxldHM7XG5cbiAgICAgICAgZXh0VmFsdWVzLmV4dGVuZGVkRmllbGRzKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwga2V5KSAmJlxuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEgJiYgUmVzZXJ2ZWRLZXl3b3JkLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmbkFyZ05hbWVzLnB1c2goJ3RoaXMnKTtcbiAgICAvLyBmbkFyZ1ZhbHVlcy5wdXNoKGxldHMpO1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oLi4uZm5BcmdOYW1lcy5jb25jYXQoZm5Cb2R5KSkoLi4uZm5BcmdWYWx1ZXMpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsRXhwcmVzc2lvbldpdGhDbnR4KGV4cHI6IHN0cmluZywgZGVjbGFyYXRpb25zOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXRzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0NvbnRleHQ6IGFueSk6IGFueVxue1xuICAgIGxldCBmbkJvZHkgPSBgJHtkZWNsYXJhdGlvbnN9XFxuXFx0cmV0dXJuICR7ZXhwcn1cXG4vLyMgc291cmNlVVJMPUFyaWJhRXhwcmVzc2lvbmA7XG4gICAgbGV0IGZuQXJnTmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGZuQXJnVmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGFyZ05hbWUgaW4gbGV0cykge1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBhcmdOYW1lKSkge1xuICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaChsZXRzW2FyZ05hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGV0cyBpbnN0YW5jZW9mIEV4dGVuc2libGUpIHtcbiAgICAgICAgbGV0IGV4dFZhbHVlczogRXh0ZW5zaWJsZSA9IGxldHM7XG5cbiAgICAgICAgZXh0VmFsdWVzLmV4dGVuZGVkRmllbGRzKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuY29udGFpbnMoZXhwciwga2V5KSAmJlxuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEgJiYgUmVzZXJ2ZWRLZXl3b3JkLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgIGtleSkgPT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZuQXJnTmFtZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGZuQXJnVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmbkFyZ05hbWVzLnB1c2goJ3RoaXMnKTtcbiAgICAvLyBmbkFyZ1ZhbHVlcy5wdXNoKGxldHMpO1xuICAgIGxldCBmbiA9IG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKTtcbiAgICBhc3NlcnQoaXNQcmVzZW50KGZuKSwgJ0Nhbm5vdCBldmFsdWF0ZSBleHByZXNzaW9uLiBGTiBpcyBub3QgZGVmaW5lZCcpO1xuICAgIGxldCBmbkJvdW5kID0gZm4uYmluZCh0aGlzQ29udGV4dCk7XG5cbiAgICByZXR1cm4gZm5Cb3VuZCguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmo6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gIWlzSnNPYmplY3Qob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NvbnN0cnVjdG9yKHZhbHVlOiBPYmplY3QsIHR5cGU6IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IgPT09IHR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGUoczogc3RyaW5nKTogc3RyaW5nXG57XG4gICAgcmV0dXJuIGVuY29kZVVSSShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzOiBzdHJpbmcpOiBzdHJpbmdcbntcbiAgICByZXR1cm4gcy5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8W1xcXVxcL1xcXFxdKS9nLCAnXFxcXCQxJyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2hDb2RlKHN0cjogc3RyaW5nKTogbnVtYmVyXG57XG4gICAgbGV0IGhhc2ggPSAwO1xuICAgIGxldCBjaGFyOiBudW1iZXI7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICAgICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdFZhbHVlcyhvYmo6IGFueSk6IGFueVtdXG57XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSk7XG59XG5cbi8qKlxuICpcbiAqIENvbnZlcnRzIG9iamVjdCB0byBhIG5hbWU7XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0VG9OYW1lKHRhcmdldDogYW55KTogc3RyaW5nXG57XG4gICAgaWYgKGlzQmxhbmsodGFyZ2V0KSB8fCAoIWlzU3RyaW5nTWFwKHRhcmdldCkgJiYgIWlzVHlwZSh0YXJnZXQpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJyBDYW5ub3QgY29udmVydC4gVWtub3duIG9iamVjdCcpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1R5cGUodGFyZ2V0KSA/IHRhcmdldC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZSA6IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuXG4vKipcbiAqXG4gKiBCYXNpYyBmdW5jdGlvbiB0byBnZW5lcmF0ZSBVVUlEIHRha2VuIGZyb20gVzNDIGZyb20gb25lIG9mIHRoZSBleGFtcGxlc1xuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHV1aWQoKTogc3RyaW5nXG57XG4gICAgbGV0IGR0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgbGV0IHByb3RvID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLFxuICAgICAgICAoYzogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgciA9IChkdCArIE1hdGgucmFuZG9tKCkgKiAxNikgJSAxNiB8IDA7XG4gICAgICAgICAgICBkdCA9IE1hdGguZmxvb3IoZHQgLyAxNik7XG4gICAgICAgICAgICByZXR1cm4gKGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCkpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHByb3RvO1xufVxuXG4vKipcbiAqIENoZWNrIG9iamVjdCBlcXVhbGl0eSBkZXJpdmVkIGZyb20gYW5ndWxhci5lcXVhbHMgMS41IGltcGxlbWVudGF0aW9uXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKG8xOiBhbnksIG8yOiBhbnkpOiBib29sZWFuXG57XG4gICAgaWYgKG8xID09PSBvMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG8xID09PSBudWxsIHx8IG8yID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChvMSAhPT0gbzEgJiYgbzIgIT09IG8yKSB7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBOYU4gPT09IE5hTlxuICAgIH1cblxuICAgIGxldCB0MSA9IHR5cGVvZiBvMSwgdDIgPSB0eXBlb2YgbzIsIGxlbmd0aDogYW55LCBrZXk6IGFueSwga2V5U2V0OiBhbnk7XG4gICAgaWYgKHQxID09PSB0MiAmJiB0MSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChsZW5ndGggPSBvMS5sZW5ndGgpID09PSBvMi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSA9IDA7IGtleSA8IGxlbmd0aDsga2V5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUobzEpKSB7XG4gICAgICAgICAgICBpZiAoIWlzRGF0ZShvMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKG8xLmdldFRpbWUoKSwgbzIuZ2V0VGltZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1JlZ0V4cChvMSkpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWdFeHAobzIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG8xLnRvU3RyaW5nKCkgPT09IG8yLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNXaW5kb3cobzEpIHx8IGlzV2luZG93KG8yKSB8fFxuICAgICAgICAgICAgICAgIGlzQXJyYXkobzIpIHx8IGlzRGF0ZShvMikgfHwgaXNSZWdFeHAobzIpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleVNldCA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xuICAgICAgICAgICAgLy8gdXNpbmcgT2JqZWN0LmtleXMgYXMgaXRlcmF0aW5nIHRocnUgb2JqZWN0IHN0b3Agd29ya2luZyBpbiBORzYsIFRTMi43XG4gICAgICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG8yKTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5c1trZXldLmNoYXJBdCgwKSA9PT0gJyQnIHx8IGlzRnVuY3Rpb24obzFba2V5c1trZXldXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZXF1YWxzKG8xW2tleXNba2V5XV0sIG8yW2tleXNba2V5XV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5U2V0LnNldChrZXlzW2tleV0sIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMobzIpO1xuICAgICAgICAgICAgZm9yIChrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgIGlmICghKGtleVNldC5oYXMoa2V5KSkgJiYga2V5LmNoYXJBdCgwKSAhPT0gJyQnXG4gICAgICAgICAgICAgICAgICAgICYmIGlzUHJlc2VudChvMltrZXldKSAmJiAhaXNGdW5jdGlvbihvMltrZXldKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cblxuLyoqXG4gKiB0cmFuc2Zvcm0gYSBzdHJpbmcgaW50byBkZWNhbWVsLiBmb3JtLiBNb3N0bHkgdXNlZCB3aGVuIHJlYWRpbmcgY2xhc3MgbmFtZXMgb3IgZmllbGQgbmFtZXNcbiAqIHN1Y2ggZmlyc3ROYW1lIGFuZCB3ZSB3YW50IHRvIGNyZWF0ZSBhIGxhYmVsIEZpcnN0IE5hbWVcbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjYW1lbGl6ZShzdHJpbmc6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcsIGluaXRpYWxDYXBzOiBib29sZWFuID0gdHJ1ZSlcbntcbiAgICBpZiAoaXNCbGFuayhzdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBsZXQgbGFzdFVDSW5kZXggPSAtMTtcbiAgICBsZXQgYWxsQ2FwcyA9IHRydWU7XG5cbiAgICBsZXQgc3BsaXRPblVDID0gIVN0cmluZ1dyYXBwZXIuY29udGFpbnMoc3RyaW5nLCAnXycpO1xuICAgIGxldCBidWYgPSAnJztcbiAgICBsZXQgaW5Xb3JkID0gMDtcblxuICAgIGZvciAobGV0IGkgPSBzdHJpbmcubGVuZ3RoOyBpbldvcmQgPCBpOyArK2luV29yZCkge1xuICAgICAgICBsZXQgYyA9IHN0cmluZ1tpbldvcmRdO1xuXG4gICAgICAgIGlmIChjLnRvVXBwZXJDYXNlKCkgPT09IGMpIHtcbiAgICAgICAgICAgIGlmICgoaW5Xb3JkIC0gMSkgIT09IGxhc3RVQ0luZGV4ICYmIHNwbGl0T25VQykge1xuICAgICAgICAgICAgICAgIGJ1ZiArPSBzZXBhcmF0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0VUNJbmRleCA9IGluV29yZDtcbiAgICAgICAgICAgIGlmICghaW5pdGlhbENhcHMpIHtcbiAgICAgICAgICAgICAgICBjID0gYy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGMudG9Mb3dlckNhc2UoKSA9PT0gYykge1xuICAgICAgICAgICAgaWYgKGluV29yZCA9PT0gMCAmJiBpbml0aWFsQ2Fwcykge1xuICAgICAgICAgICAgICAgIGMgPSBjLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbGxDYXBzID0gZmFsc2U7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjICE9PSAnXycpIHtcbiAgICAgICAgICAgIGMgPSBzZXBhcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgYnVmICs9IGM7XG4gICAgfVxuXG4gICAgaWYgKGFsbENhcHMpIHtcbiAgICAgICAgbGV0IHRvQ2FwcyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IGJ1Zi5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjaCA9IGJ1ZltpXTtcblxuICAgICAgICAgICAgaWYgKGNoLnRvTG93ZXJDYXNlKCkgIT09IGNoLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5Xb3JkICYmIGNoID09PSBjaC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZiA9IGJ1Zi5zdWJzdHIoMCwgaSkgKyBjaC50b0xvd2VyQ2FzZSgpICsgYnVmLnN1YnN0cihpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvQ2FwcyA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvQ2FwcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBidWY7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vblByaXZhdGVQcmVmaXgoaW5wdXQ6IHN0cmluZyk6IHN0cmluZ1xue1xuICAgIHJldHVybiBpbnB1dFswXSA9PT0gJ18nID8gU3RyaW5nV3JhcHBlci5zdHJpcExlZnQoaW5wdXQsICdfJykgOiBpbnB1dDtcbn1cblxuXG4vKipcbiAqXG4gKiBUaGlzIGNvbnNpZGVycyBjdXJyZW50bHkgb25seSAxIGZvcm0gd2hpY2ggd2hlbiB3ZSBoYXZlIGdldHRlciB3ZSBoYXZlIHRoaXMgZm9ybSBmb3JcbiAqIGRlY2xhcmF0aW9uIF88bmFtZT4gYW5kIGdldCA8bmFtZT4oKS4gSSBkbyBub3QgY2hlY2sgYW55IG90aGVyIGZvcm1zIG5vdy5cbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzR2V0dGVyKGluc3RhbmNlOiBhbnksIGZpZWxkOiBzdHJpbmcpOiBib29sZWFuXG57XG4gICAgaWYgKGlzQmxhbmsoZmllbGQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGZpZWxkWzBdID09PSAnXycgJiYgaXNQcmVzZW50KG5vblByaXZhdGVQcmVmaXgoZmllbGQpKSk7XG5cbn1cblxuLyoqXG4gKiBUaGUgRXh0ZW5zaWJsZSBpbnRlcmZhY2UgY2FuIGJlIGltcGxlbWVudGVkIHdoZW4gYSBnaXZlbiBjbGFzc1xuICogd2FudHMgdG8gcHJvdmlkZSBkeW5hbWljYWxseSBhZGRlZCBmaWVsZHMuICBPbmNlIHRoaXMgaXMgaW1wbGVtZW50ZWRcbiAqIHRvIHJldHVybiBhIE1hcCwgdGhlIEZpZWxkVmFsdWUgc3lzdGVtIHdpbGwgYmUgYWJsZSB0byBsb29rIGluXG4gKiB0aGUgTWFwIHRvIHNlZSBpZiB0aGUgZGVzaXJlZCBmaWVsZCBleGlzdHMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV4dGVuc2libGVcbntcblxuICAgIC8qKlxuICAgICAqICBSZXR1cm5zIHRoZSBNYXAgaW4gd2hpY2ggdGhlIGR5bmFtaWNhbGx5IGFkZGVkIGZpZWxkcyByZXNpZGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBleHRlbmRlZEZpZWxkcygpOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cbn1cblxuIiwiLyoqXG4gKlxuICogQG9yaWdpbmFsLWxpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICpcbiAqXG4gKlxuICogIENyZWRpdDogRGVyaXZlZCBhbmQgZXh0ZW5kZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyIGluIG9yZGVyIHRvIGhhdmUgc2V0IG9mXG4gKiAgcmV1c2FibGUgZ2xvYmFscy4gU2luY2UgaXRzIG5vdCBleHBvcnRlZCBBUEkgbmVlZCB0byBoYXZlIGEgY29weSB1bmRlciBjb3JlLlxuICovXG5pbXBvcnQgKiBhcyBDb2xsZWN0aW9ucyBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgY2xhc3NOYW1lLFxuICAgIGVxdWFscyxcbiAgICBnZXRTeW1ib2xJdGVyYXRvcixcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNKc09iamVjdCxcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgU3RyaW5nSm9pbmVyXG59IGZyb20gJy4vbGFuZyc7XG5cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1hcEZyb21NYXA6IHsgKG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+IH0gPSAoZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChuZXcgTWFwKDxhbnk+bmV3IE1hcCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZU1hcEZyb21NYXBJbm5lcihtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXAoPGFueT5tKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVNYXBBbmRQb3B1bGF0ZUZyb21NYXAobTogTWFwPGFueSwgYW55Pik6IE1hcDxhbnksIGFueT4ge1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgIG1hcC5zZXQoaywgdik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH07XG59KSgpO1xuZXhwb3J0IGNvbnN0IF9jbGVhclZhbHVlczogeyAobTogTWFwPGFueSwgYW55Pik6IHZvaWQgfSA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCg8YW55PihuZXcgTWFwKCkpLmtleXMoKSkubmV4dCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gX2NsZWFyVmFsdWVzSW5uZXIobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgICAgICAgbGV0IGtleUl0ZXJhdG9yID0gbS5rZXlzKCk7XG4gICAgICAgICAgICBsZXQgazogYW55IC8qKiBUT0RPICM/Pz8/ICovO1xuICAgICAgICAgICAgd2hpbGUgKCEoKGsgPSAoPGFueT5rZXlJdGVyYXRvcikubmV4dCgpKS5kb25lKSkge1xuICAgICAgICAgICAgICAgIG0uc2V0KGsudmFsdWUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBfY2xlYXJWYWx1ZXNXaXRoRm9yZUVhY2gobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgbS5zZXQoaywgbnVsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG5leHBvcnQgY2xhc3MgTWFwV3JhcHBlciB7XG5cbiAgICBzdGF0aWMgY3JlYXRlRW1wdHk8SywgVj4oKTogTWFwPEssIFY+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXA8SywgVj4oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xvbmU8SywgVj4obTogTWFwPEssIFY+KTogTWFwPEssIFY+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuZXcgTWFwKDxhbnk+bmV3IE1hcCgpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWFwPEssIFY+KDxhbnk+IG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICBtYXAuc2V0KGssIHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRnJvbVN0cmluZ01hcDxUPihzdHJpbmdNYXA6IHsgW2tleTogc3RyaW5nXTogVCB9KTogTWFwPHN0cmluZywgVD4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzdHJpbmdNYXApIHtcbiAgICAgICAgICAgIHJlc3VsdC5zZXQoa2V5LCBzdHJpbmdNYXBba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjcmVhdGVGcm9tQW55TWFwPFQ+KHN0cmluZ01hcDogeyBba2V5OiBzdHJpbmddOiBUIH0pOiBNYXA8YW55LCBUPiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPGFueSwgVD4oKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHN0cmluZ01hcCkge1xuICAgICAgICAgICAgcmVzdWx0LnNldChrZXksIHN0cmluZ01hcFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNyZWF0ZUZyb21TdHJpbmdNYXBXaXRoUmVzb2x2ZTxUPihzdHJpbmdNYXA6IHsgW2tleTogc3RyaW5nXTogVCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZTogKGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBhbnkpID0+IGFueSk6IE1hcDxzdHJpbmcsIFQ+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBUPigpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3RyaW5nTWFwKSB7XG4gICAgICAgICAgICBsZXQgdXBkYXRlZFZhbHVlID0gcmVzb2x2ZShrZXksIHN0cmluZ01hcFtrZXldKTtcbiAgICAgICAgICAgIHJlc3VsdC5zZXQoa2V5LCB1cGRhdGVkVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvU3RyaW5nTWFwPFQ+KG06IE1hcDxzdHJpbmcsIFQ+KTogeyBba2V5OiBzdHJpbmddOiBUIH0ge1xuICAgICAgICBsZXQgcjogeyBba2V5OiBzdHJpbmddOiBUIH0gPSB7fTtcbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiByW2tdID0gdik7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b0FueU1hcDxUPihtOiBNYXA8YW55LCBUPik6IGFueSB7XG4gICAgICAgIGxldCByID0ge307XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChtKSkge1xuICAgICAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiAoPGFueT5yKVtrXSA9IHYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHRvU3RyaW5nKG06IE1hcDxzdHJpbmcsIGFueT4sIGlubmVyOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc2ogPSBuZXcgU3RyaW5nSm9pbmVyKFsnJ10pO1xuICAgICAgICBpZiAoIWlubmVyKSB7XG4gICAgICAgICAgICBzai5hZGQoJ3snKTtcbiAgICAgICAgfVxuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcblxuICAgICAgICAgICAgaWYgKHYgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICBzai5hZGQoTWFwV3JhcHBlci50b1N0cmluZyh2LCB0cnVlKSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2ouYWRkKGspO1xuICAgICAgICAgICAgICAgIHNqLmFkZCgnPScpO1xuICAgICAgICAgICAgICAgIHNqLmFkZCh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNqLmFkZCgnLCAnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpbm5lcikge1xuICAgICAgICAgICAgc2ouYWRkKCd9ICcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNsZWFyVmFsdWVzKG06IE1hcDxhbnksIGFueT4pIHtcbiAgICAgICAgX2NsZWFyVmFsdWVzKG0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBpdGVyYWJsZTxUPihtOiBUKTogVCB7XG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuXG4gICAgc3RhdGljIG1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoZGVzdDogTWFwPHN0cmluZywgYW55Piwgc291cmNlOiBNYXA8c3RyaW5nLCBhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZU1pc21hdGNoZWQ6IGJvb2xlYW4pOiBNYXA8c3RyaW5nLCBhbnk+IHtcblxuICAgICAgICBsZXQga2V5cyA9IEFycmF5LmZyb20oc291cmNlLmtleXMoKSk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2VWYWx1ZSA9IHNvdXJjZS5nZXQoa2V5KTtcbiAgICAgICAgICAgIGxldCBkZXN0VmFsdWUgPSBkZXN0LmdldChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoaXNCbGFuayhkZXN0VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBMaXN0V3JhcHBlci5jb3B5VmFsdWUoc291cmNlVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzdFZhbHVlIGluc3RhbmNlb2YgTWFwICYmIHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG5cbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksXG4gICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIubWVyZ2VNYXBJbnRvTWFwV2l0aE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY2xvbmU8c3RyaW5nLCBhbnk+KGRlc3RWYWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VWYWx1ZSwgb3ZlcndyaXRlTWlzbWF0Y2hlZClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkZXN0VmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgaXNBcnJheShzb3VyY2VWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgIGlmIChMaXN0V3JhcHBlci5hbGxFbGVtZW50c0FyZVN0cmluZ3Moc291cmNlVmFsdWUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBNYXBXcmFwcGVyLm1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNsb25lPHN0cmluZywgYW55PihkZXN0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jb252ZXJ0TGlzdFRvTWFwKHNvdXJjZVZhbHVlKSwgb3ZlcndyaXRlTWlzbWF0Y2hlZClcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzb3VyY2VWZWN0OiBzdHJpbmdbXSA9IExpc3RXcmFwcGVyLmNsb25lPGFueT4oc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQ8YW55Pihzb3VyY2VWZWN0LCBkZXN0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShkZXN0VmFsdWUpICYmIHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoTGlzdFdyYXBwZXIuYWxsRWxlbWVudHNBcmVTdHJpbmdzKGRlc3RWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBNYXBXcmFwcGVyLm1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNvbnZlcnRMaXN0VG9NYXAoZGVzdFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcndyaXRlTWlzbWF0Y2hlZClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiBjYW4gd2UgcmVhbGx5IG1hdGNoIHRoaXMgdmFsdWVzIHdpdGggaW5kZXhPZlxuICAgICAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQ8TWFwPHN0cmluZywgYW55Pj4oZGVzdFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jbG9uZTxzdHJpbmcsIGFueT4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkZXN0VmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgaXNTdHJpbmcoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRlc3RWYWx1ZU1hcCA9IE1hcFdyYXBwZXIuY2xvbmUoZGVzdFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKGRlc3RWYWx1ZU1hcC5nZXQoc291cmNlVmFsdWUpKSkge1xuICAgICAgICAgICAgICAgICAgICBkZXN0VmFsdWUuc2V0KHNvdXJjZVZhbHVlLCBNYXBXcmFwcGVyLmNyZWF0ZUVtcHR5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZGVzdFZhbHVlKSAmJiBzb3VyY2VWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VIYXNoID0gTWFwV3JhcHBlci5jbG9uZShzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoc291cmNlSGFzaC5nZXQoZGVzdFZhbHVlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSGFzaC5zZXQoZGVzdFZhbHVlLCBNYXBXcmFwcGVyLmNyZWF0ZUVtcHR5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZUhhc2gpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGVzdFZhbHVlKSAmJiBpc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGVzdFZhbHVlKSAmJiBpc1N0cmluZyhzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQoZGVzdFZhbHVlLCBzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZGVzdFZhbHVlKSAmJiBpc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VWZWN0OiBzdHJpbmdbXSA9IExpc3RXcmFwcGVyLmNsb25lPHN0cmluZz4oc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkRWxlbWVudElmQWJzZW50KHNvdXJjZVZlY3QsIGRlc3RWYWx1ZSk7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhkZXN0VmFsdWUpICYmIGlzU3RyaW5nKHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG92ZXJ3cml0ZU1pc21hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGRlc3RDbGFzcyA9IGNsYXNzTmFtZShkZXN0VmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VDbGFzcyA9IGNsYXNzTmFtZShzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVzdENsYXNzID09PSBzb3VyY2VDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnZlcnRMaXN0VG9NYXAoa2V5czogc3RyaW5nW10pOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWFwLnNldChrZXlzW2ldLCBNYXBXcmFwcGVyLmNyZWF0ZUVtcHR5PHN0cmluZywgYW55PigpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIHN0YXRpYyBncm91cEJ5PEs+KGl0ZW1zOiBhbnksIGdyb3VwQnlLZXk6IChpdGVtOiBLKSA9PiBzdHJpbmcpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGl0ZW1zLnJlZHVjZSgoZ3JvdXBSZXN1bHQ6IGFueSwgY3VycmVudFZhbHVlOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgbGV0IGdLZXkgPSBncm91cEJ5S2V5KGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAoZ3JvdXBSZXN1bHRbZ0tleV0gPSBncm91cFJlc3VsdFtnS2V5XSB8fCBbXSkucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwUmVzdWx0O1xuICAgICAgICB9LCB7fSk7XG5cblxuICAgICAgICBsZXQgZ3JvdXBlZDogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBncm91cGVkLnNldChrZXksIHJlc3VsdFtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBncm91cGVkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBXcmFwcyBKYXZhc2NyaXB0IE9iamVjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ01hcFdyYXBwZXIge1xuICAgIHN0YXRpYyBjcmVhdGUoKTogeyBbazogLyphbnkqLyBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIC8vIE5vdGU6IFdlIGFyZSBub3QgdXNpbmcgT2JqZWN0LmNyZWF0ZShudWxsKSBoZXJlIGR1ZSB0b1xuICAgICAgICAvLyBwZXJmb3JtYW5jZSFcbiAgICAgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vbmcyLW9iamVjdC1jcmVhdGUtbnVsbFxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5zKG1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwga2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQ8Vj4obWFwOiB7IFtrZXk6IHN0cmluZ106IFYgfSwga2V5OiBzdHJpbmcpOiBWIHtcbiAgICAgICAgcmV0dXJuIG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpID8gbWFwW2tleV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldDxWPihtYXA6IHsgW2tleTogc3RyaW5nXTogViB9LCBrZXk6IHN0cmluZywgdmFsdWU6IFYpIHtcbiAgICAgICAgbWFwW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBpc0VtcHR5KG1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBwcm9wIGluIG1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWxldGUobWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBrZXk6IHN0cmluZykge1xuICAgICAgICBkZWxldGUgbWFwW2tleV07XG4gICAgfVxuXG4gICAgc3RhdGljIGZvckVhY2g8SywgVj4obWFwOiB7IFtrZXk6IHN0cmluZ106IFYgfSwgY2FsbGJhY2s6ICh2OiBWLCBLOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyhtYXApKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhtYXBba10sIGspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIG1lcmdlPFY+KG0xOiB7IFtrZXk6IHN0cmluZ106IFYgfSwgbTI6IHsgW2tleTogc3RyaW5nXTogViB9KTogeyBba2V5OiBzdHJpbmddOiBWIH0ge1xuICAgICAgICBsZXQgbTogeyBba2V5OiBzdHJpbmddOiBWIH0gPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrIG9mIE9iamVjdC5rZXlzKG0xKSkge1xuICAgICAgICAgICAgbVtrXSA9IG0xW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyhtMikpIHtcbiAgICAgICAgICAgIG1ba10gPSBtMltrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbHM8Vj4obTE6IHsgW2tleTogc3RyaW5nXTogViB9LCBtMjogeyBba2V5OiBzdHJpbmddOiBWIH0pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGsxID0gT2JqZWN0LmtleXMobTEpO1xuICAgICAgICBsZXQgazIgPSBPYmplY3Qua2V5cyhtMik7XG4gICAgICAgIGlmIChrMS5sZW5ndGggIT09IGsyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBrZXk6IGFueSAvKiogVE9ETyAjPz8/PyAqLztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAga2V5ID0gazFbaV07XG4gICAgICAgICAgICBpZiAobTFba2V5XSAhPT0gbTJba2V5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBBIGJvb2xlYW4tdmFsdWVkIGZ1bmN0aW9uIG92ZXIgYSB2YWx1ZSwgcG9zc2libHkgaW5jbHVkaW5nIGNvbnRleHQgaW5mb3JtYXRpb25cbiAqIHJlZ2FyZGluZyB0aGF0IHZhbHVlJ3MgcG9zaXRpb24gaW4gYW4gYXJyYXkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJlZGljYXRlPFQ+IHtcbiAgICAodmFsdWU6IFQsIGluZGV4PzogbnVtYmVyLCBhcnJheT86IFRbXSk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBMaXN0V3JhcHBlciB7XG4gICAgLy8gSlMgaGFzIG5vIHdheSB0byBleHByZXNzIGEgc3RhdGljYWxseSBmaXhlZCBzaXplIGxpc3QsIGJ1dCBkYXJ0IGRvZXMgc28gd2VcbiAgICAvLyBrZWVwIGJvdGggbWV0aG9kcy5cbiAgICBzdGF0aWMgY3JlYXRlRml4ZWRTaXplKHNpemU6IG51bWJlcik6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheShzaXplKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlR3Jvd2FibGVTaXplKHNpemU6IG51bWJlcik6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheShzaXplKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xvbmU8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XG4gICAgICAgIHJldHVybiBhcnJheS5zbGljZSgwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZm9yRWFjaFdpdGhJbmRleDxUPihhcnJheTogVFtdLCBmbjogKHQ6IFQsIG46IG51bWJlcikgPT4gdm9pZCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmbihhcnJheVtpXSwgaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZmlyc3Q8VD4oYXJyYXk6IFRbXSk6IFQge1xuICAgICAgICBpZiAoIWFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBsYXN0PFQ+KGFycmF5OiBUW10pOiBUIHtcbiAgICAgICAgaWYgKCFhcnJheSB8fCBhcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5kZXhPZjxUPihhcnJheTogVFtdLCB2YWx1ZTogVCwgc3RhcnRJbmRleDogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlLCBzdGFydEluZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnM8VD4obGlzdDogVFtdLCBlbDogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKGVsKSAhPT0gLTE7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY29udGFpbnNBbGw8VD4obGlzdDogVFtdLCBlbHM6IFRbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZWxzLm1hcChmdW5jdGlvbiAobmVlZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKG5lZWRsZSk7XG4gICAgICAgIH0pLmluZGV4T2YoLTEpID09PSAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnNDb21wbGV4KGxpc3Q6IEFycmF5PGFueT4sIGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbGlzdC5maW5kSW5kZXgoZWwgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhlbCwgaXRlbSk7XG4gICAgICAgIH0pID4gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmRJbmRleENvbXBsZXgobGlzdDogQXJyYXk8YW55PiwgaXRlbTogYW55KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsaXN0LmZpbmRJbmRleChlbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKGVsLCBpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuXG4gICAgc3RhdGljIHJlbW92ZUlmRXhpc3QobGlzdDogQXJyYXk8YW55PiwgaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gbGlzdC5maW5kSW5kZXgoZWwgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhlbCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmVBdDxhbnk+KGxpc3QsIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZXZlcnNlZDxUPihhcnJheTogVFtdKTogVFtdIHtcbiAgICAgICAgbGV0IGEgPSBMaXN0V3JhcHBlci5jbG9uZShhcnJheSk7XG4gICAgICAgIHJldHVybiBhLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29uY2F0KGE6IGFueVtdLCBiOiBhbnlbXSk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnNlcnQ8VD4obGlzdDogVFtdLCBpbmRleDogbnVtYmVyLCB2YWx1ZTogVCkge1xuICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMCwgdmFsdWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVBdDxUPihsaXN0OiBUW10sIGluZGV4OiBudW1iZXIpOiBUIHtcbiAgICAgICAgbGV0IHJlcyA9IGxpc3RbaW5kZXhdO1xuICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUFsbDxUPihsaXN0OiBUW10sIGl0ZW1zOiBUW10pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gbGlzdC5pbmRleE9mKGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmU8VD4obGlzdDogVFtdLCBlbDogVCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaW5kZXggPSBsaXN0LmluZGV4T2YoZWwpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVMYXN0PFQ+KGFycmF5OiBUW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFhcnJheSB8fCBhcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5LnNwbGljZShhcnJheS5sZW5ndGggLSAxKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjbGVhcihsaXN0OiBhbnlbXSkge1xuICAgICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRW1wdHkobGlzdDogYW55W10pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGxpc3QubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBmaWxsKGxpc3Q6IGFueVtdLCB2YWx1ZTogYW55LCBzdGFydDogbnVtYmVyID0gMCwgZW5kOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGxpc3QuZmlsbCh2YWx1ZSwgc3RhcnQsIGVuZCA9PT0gbnVsbCA/IGxpc3QubGVuZ3RoIDogZW5kKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKGE6IGFueVtdLCBiOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2xpY2U8VD4obDogVFtdLCBmcm9tOiBudW1iZXIgPSAwLCB0bzogbnVtYmVyID0gbnVsbCk6IFRbXSB7XG4gICAgICAgIHJldHVybiBsLnNsaWNlKGZyb20sIHRvID09PSBudWxsID8gdW5kZWZpbmVkIDogdG8pO1xuICAgIH1cblxuICAgIHN0YXRpYyBzcGxpY2U8VD4obDogVFtdLCBmcm9tOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIGwuc3BsaWNlKGZyb20sIGxlbmd0aCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNvcnQ8VD4obDogVFtdLCBjb21wYXJlRm4/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29tcGFyZUZuKSkge1xuICAgICAgICAgICAgbC5zb3J0KGNvbXBhcmVGbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsLnNvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIHNvcnRCeUV4YW1wbGUodG9Tb3J0OiBzdHJpbmdbXSwgcGF0dGVybjogc3RyaW5nW10pIHtcbiAgICAgICAgdG9Tb3J0LnNvcnQoKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXhBID0gcGF0dGVybi5pbmRleE9mKGEpID09PSAtMSA/IDEwIDogcGF0dGVybi5pbmRleE9mKGEpO1xuICAgICAgICAgICAgbGV0IGluZGV4QiA9IHBhdHRlcm4uaW5kZXhPZihiKSA9PT0gLTEgPyAxMCA6IHBhdHRlcm4uaW5kZXhPZihiKTtcblxuICAgICAgICAgICAgcmV0dXJuIGluZGV4QSAtIGluZGV4QjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvU3RyaW5nPFQ+KGw6IFRbXSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBvdXQgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsKSB7XG4gICAgICAgICAgICBvdXQgKz0gaXRlbS50b1N0cmluZygpICsgJywgICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9KU09OPFQ+KGw6IFRbXSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShsKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbWF4aW11bTxUPihsaXN0OiBUW10sIHByZWRpY2F0ZTogKHQ6IFQpID0+IG51bWJlcik6IFQge1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzb2x1dGlvbjogYW55IC8qKiBUT0RPICM/Pz8/ICovID0gbnVsbDtcbiAgICAgICAgbGV0IG1heFZhbHVlID0gLUluZmluaXR5O1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGUgPSBsaXN0W2luZGV4XTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGVWYWx1ZSA9IHByZWRpY2F0ZShjYW5kaWRhdGUpO1xuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZVZhbHVlID4gbWF4VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzb2x1dGlvbiA9IGNhbmRpZGF0ZTtcbiAgICAgICAgICAgICAgICBtYXhWYWx1ZSA9IGNhbmRpZGF0ZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb2x1dGlvbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmxhdHRlbjxUPihsaXN0OiBBcnJheTxUIHwgVFtdPik6IFRbXSB7XG4gICAgICAgIGxldCB0YXJnZXQ6IGFueVtdID0gW107XG4gICAgICAgIF9mbGF0dGVuQXJyYXkobGlzdCwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBhbGxFbGVtZW50c0FyZVN0cmluZ3M8VD4obGlzdDogQXJyYXk8VCB8IFRbXT4pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHRhcmdldDogYW55W10gPSBMaXN0V3JhcHBlci5mbGF0dGVuKGxpc3QpO1xuICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRhcmdldCkge1xuICAgICAgICAgICAgaWYgKCFpc1N0cmluZyhlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRBbGw8VD4obGlzdDogQXJyYXk8VD4sIHNvdXJjZTogQXJyYXk8VD4pOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChzb3VyY2VbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdG9kbzogY2hlY2sgaWYgdGhpcyBoYW5kbGVzIG9iamVjdHMgd2l0aCBjb250YWluc1xuICAgIHN0YXRpYyBhZGRFbGVtZW50SWZBYnNlbnQ8VD4obGlzdDogQXJyYXk8VD4sIGVsZW1lbnQ6IFQpOiB2b2lkIHtcblxuICAgICAgICBsZXQgY29udGFpbnMgPSBDb2xsZWN0aW9ucy5hcnJheXMuY29udGFpbnMobGlzdCwgZWxlbWVudCwgKGl0ZW0xOiBhbnksIGl0ZW0yOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgaWYgKGl0ZW0xWydlcXVhbHNUbyddKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xWydlcXVhbHNUbyddKGl0ZW0yKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0xID09PSBpdGVtMjtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghY29udGFpbnMpIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIGFkZEVsZW1lbnRzSWZBYnNlbnQ8VD4obGlzdDogQXJyYXk8VD4sIGVsZW1lbnRzOiBUW10pOiB2b2lkIHtcblxuXG4gICAgICAgIGlmIChpc0JsYW5rKGVsZW1lbnRzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBlbGVtZW50cykge1xuXG4gICAgICAgICAgICBsZXQgY29udGFpbnMgPSBDb2xsZWN0aW9ucy5hcnJheXMuY29udGFpbnMobGlzdCwgZWxlbSwgKGl0ZW0xOiBhbnksIGl0ZW0yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbTFbJ2VxdWFsc1RvJ10gJiYgaXRlbTJbJ2VxdWFsc1RvJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xWydlcXVhbHNUbyddKGl0ZW0yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xID09PSBpdGVtMjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjb250YWlucykge1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaChlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIGNvcHlWYWx1ZTxUPih2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWFwV3JhcHBlci5jbG9uZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5jbG9uZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbn1cblxuZnVuY3Rpb24gX2ZsYXR0ZW5BcnJheShzb3VyY2U6IGFueVtdLCB0YXJnZXQ6IGFueVtdKTogYW55W10ge1xuICAgIGlmIChpc1ByZXNlbnQoc291cmNlKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzb3VyY2VbaV07XG4gICAgICAgICAgICBpZiAoaXNBcnJheShpdGVtKSkge1xuICAgICAgICAgICAgICAgIF9mbGF0dGVuQXJyYXkoaXRlbSwgdGFyZ2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc0pzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNBcnJheShvYmopIHx8XG4gICAgICAgICghKG9iaiBpbnN0YW5jZW9mIE1hcCkgJiYgICAgICAvLyBKUyBNYXAgYXJlIGl0ZXJhYmxlcyBidXQgcmV0dXJuIGVudHJpZXMgYXMgW2ssIHZdXG4gICAgICAgICAgICBnZXRTeW1ib2xJdGVyYXRvcigpIGluIG9iaik7ICAvLyBKUyBJdGVyYWJsZSBoYXZlIGEgU3ltYm9sLml0ZXJhdG9yIHByb3Bcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUl0ZXJhYmxlc0VxdWFsKGE6IGFueSwgYjogYW55LCBjb21wYXJhdG9yOiBGdW5jdGlvbik6IGJvb2xlYW4ge1xuICAgIGxldCBpdGVyYXRvcjEgPSBhW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gICAgbGV0IGl0ZXJhdG9yMiA9IGJbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBpdGVtMSA9IGl0ZXJhdG9yMS5uZXh0KCk7XG4gICAgICAgIGxldCBpdGVtMiA9IGl0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICAgIGlmIChpdGVtMS5kb25lICYmIGl0ZW0yLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtMS5kb25lIHx8IGl0ZW0yLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbXBhcmF0b3IoaXRlbTEudmFsdWUsIGl0ZW0yLnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXRlcmF0ZUxpc3RMaWtlKG9iajogYW55LCBmbjogRnVuY3Rpb24pIHtcbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmbihvYmpbaV0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gb2JqW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gICAgICAgIGxldCBpdGVtOiBhbnkgLyoqIFRPRE8gIz8/Pz8gKi87XG4gICAgICAgIHdoaWxlICghKChpdGVtID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSkge1xuICAgICAgICAgICAgZm4oaXRlbS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRMYXN0PFQ+KGFycjogVFtdLCBjb25kaXRpb246ICh2YWx1ZTogVCkgPT4gYm9vbGVhbik6IFQgfCBudWxsIHtcbiAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChjb25kaXRpb24oYXJyW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycltpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gU2FmYXJpIGFuZCBJbnRlcm5ldCBFeHBsb3JlciBkbyBub3Qgc3VwcG9ydCB0aGUgaXRlcmFibGUgcGFyYW1ldGVyIHRvIHRoZVxuLy8gU2V0IGNvbnN0cnVjdG9yLiAgV2Ugd29yayBhcm91bmQgdGhhdCBieSBtYW51YWxseSBhZGRpbmcgdGhlIGl0ZW1zLlxubGV0IGNyZWF0ZVNldEZyb21MaXN0OiB7IChsc3Q6IGFueVtdKTogU2V0PGFueT4gfSA9IChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRlc3QgPSBuZXcgU2V0KFsxLCAyLCAzXSk7XG4gICAgaWYgKHRlc3Quc2l6ZSA9PT0gMykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlU2V0RnJvbUxpc3RJbm5lcihsc3Q6IGFueVtdKTogU2V0PGFueT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQobHN0KTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlU2V0QW5kUG9wdWxhdGVGcm9tTGlzdChsc3Q6IGFueVtdKTogU2V0PGFueT4ge1xuICAgICAgICAgICAgbGV0IHJlcyA9IG5ldyBTZXQobHN0KTtcbiAgICAgICAgICAgIGlmIChyZXMuc2l6ZSAhPT0gbHN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5hZGQobHN0W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9O1xuICAgIH1cbn0pKCk7XG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIGlzRGV2TW9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jvb2xlYW5XcmFwcGVyLCBpc1ByZXNlbnQsIE51bWJlcldyYXBwZXIsIHJlYWRHbG9iYWxQYXJhbX0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge01hcFdyYXBwZXJ9IGZyb20gJy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5cblxuLyoqXG4gKiBTaW5jZSBvbiBlbnRlcnByaXNlIGxldmVsIHdlIG5lZWQgdG8gc3VwcG9ydCBhbGwgYXZhaWxhYmxlIGxvY2FsZXMgYXMgdXNlciBtaWdodCBjaGFuZ2VcbiAqIHRvIGRpZmZlcmVudCBsYW5nIGFueXRpbWUgd2UgbmVlZCB0byBpbXBvcnQgYWxsIGV4cGVjdGVkIGxvY2FsZXMgdGhhdCB3ZSB3YW50IHRvIHN1cHBvcnQuXG4gKlxuICogTm90ZTogIFJlbWVtYmVyIHdoZW4geW91IHdhbnQgdG8gc3VwcG9ydCBtb3JlIGxvY2FsZXMgeW91IG5lZWQgdG8gaW1wb3J0IHRoZW0gYW5kIHJlZ2lzdGVyXG4gKiB0aGVtIHVzaW5nIHJlZ2lzdGVyTG9jYWxlRGF0YVxuICovXG5leHBvcnQgY29uc3QgQXBwQ29uZmlnVG9rZW4gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignQXBwLkNvbmZpZycpO1xuXG5jb25zdCBTdXBvcnRlZExhbmd1YWdlcyA9IFsnZW4nLCAnZnInXTtcblxuXG4vKipcbiAqIFNpbXBsZSBDb25maWd1cmF0aW9uIGltcGxlbWVudGF0aW9uICB3aGljaCBsZXQgdXMgY29uZmlndXJlIGFwcGxpY2F0aW9uIGR1cmluZyBhIGJvb3RzdHJhcFxuICogcGhhc2UuIFlvdSBjYW4gcGFzcyB2YWx1ZXMgaW4gMyBkaWZmZXJlbnQgd2F5c1xuICpcbiAqIDEpIFVzaW5nIGltcG9ydCAtIGF0IHRoZSB0aW1lIHlvdSBpbXBvcnQgeW91ciBtb2R1bGVcbiAqIDIpIGluamVjdGVkIGFzIHNlcnZpY2UgYW5kIHlvdSBjYW4gc2V0IHZhbHVlc1xuICogMykgRnJvbSBTY3JpcHQgdGFnIG9yIGdsb2JhbGx5IGRlZmluZWQgVkFSIGR1cmluZyBhIGRlcGxveW1lbnRcbiAqXG4gKlxuICogVGhlcmUgaXMgYWxzbyBmcm9tIFVSTCBvcHRpb24gdGhhdCBpcyBmb3Igbm93IHRlbXBvcmFyeSBkaXNhYmxlZC5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBDb25maWcge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgbm90IHJlZ3VsYXIgZW52LiBwYXJhbSB3ZSB1c2UgdGhpcyB0byBxdWVyeSBnbG9iYWwgdmFyIHRoYXQgY2FuIGJlIGF0dGFjaGVkIHRvXG4gICAgICogd2luZG93IHRvIHJlYWQgZW52LiBzZXR0aW5ncyB0aGF0IGNhbiBiZSBpbmplY3RlZCBieSBzZXJ2ZXJcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBBcHBDb25maWdHbG9iYWxWYXIgPSAnQXBwQ29uZmlnR2xvYmFsJztcblxuICAgIHN0YXRpYyByZWFkb25seSBJc0Rldk1vZGUgPSAnZGV2bW9kZS5lbmFibGVkJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgVXNlckFnZW50ID0gJ3VzZXJhZ2VudCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IExhbmcgPSAnbGFuZyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFN1cHBvcnRlZExhbmdzID0gJ3N1cHBvcnRlZGxhbmcnO1xuICAgIHN0YXRpYyByZWFkb25seSBEaXJlY3Rpb24gPSAnZGlyJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTmF2UGxhdGZvcm0gPSAncGxhdGZvcm0nO1xuICAgIHN0YXRpYyByZWFkb25seSBpMThuRW5hYmxlZCA9ICdpMThuLmVuYWJsZWQnO1xuICAgIHN0YXRpYyByZWFkb25seSBBcHBUaXRsZSA9ICdhcHAudGl0bGUnO1xuICAgIHN0YXRpYyByZWFkb25seSBSZXN0QXBpQ29udGV4dFVybCA9ICdyZXN0YXBpLmNvbnRleHQnO1xuICAgIHN0YXRpYyByZWFkb25seSBSZXN0QXBpSG9zdFVybCA9ICdyZXN0YXBpLmhvc3QnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb250ZW50VHlwZSA9ICdjb250ZW50LXR5cGUnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uUmV0cnlJbnRlcnZhbCA9ICdjb25uZWN0aW9uLnJldHJ5JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvbkFib3J0VGltZW91dCA9ICdjb25uZWN0aW9uLmFib3J0LXRpbWVvdXQnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uVXNlTW9ja1NlcnZlciA9ICdjb25uZWN0aW9uLm1vY2stc2VydmVyLmVuYWJsZWQnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uTW9ja1NlcnZlclBhdGggPSAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5wYXRoJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvbk1vY2tTZXJ2ZXJSb3V0ZXMgPSAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5yb3V0ZXMnO1xuICAgIHN0YXRpYyByZWFkb25seSBEb21haW5VbmlxdWVOYW1lID0gJ2RvbWFpbi51bmlxdWVuYW1lJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgRG9tYWluUXVlcnkgPSAnZG9tYWluLnVuaXF1ZW5hbWUnO1xuICAgIHN0YXRpYyByZWFkb25seSBBc3NldEZvbGRlciA9ICdhc3NldC1mb2xkZXInO1xuICAgIHN0YXRpYyByZWFkb25seSBJblRlc3QgPSAnZW52LnRlc3QnO1xuXG4gICAgLyoqXG4gICAgICogU2luY2Ugd2UgdW5hYmxlIHRvIGNoYW5nZSBhbmQgc2ltdWxhdGUgVVJMIGR1cmluZyBuZyB0ZXN0IGJ1dCBzdGlsbCB3ZSBuZWVkIHRvIGJlIGFibGUgdG9cbiAgICAgKiB0ZXN0IHRoaXMgVVJMIHBhcnNpbmcgbG9naWMgdGhlbiBqdXN0IGZvciBhIFRlc3QgcHVycG9zZXMgdGhpcyBgZW52LnRlc3QudXJsYCBwcm9wZXJ0eVxuICAgICAqIHdpbGwgYmUgdXNlZCB0byBwYXNzIHVybCBkdXJpbmcgYSB0ZXN0LlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBJblRlc3RVcmwgPSAnZW52LnRlc3QudXJsJztcblxuICAgIHByaXZhdGUgdmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+O1xuICAgIC8vIHByaXZhdGUgcXVlcnlWYWx1ZXM6IE1hcDxzdHJpbmcsICBhbnk+O1xuXG5cbiAgICB0ZXN0VXJsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5qZWN0b3I6IEluamVjdG9yLCBwdWJsaWMgZW52aXJvbm1lbnQ6IEVudmlyb25tZW50KSB7XG4gICAgICAgIC8vIHdlIGV4cGVjdCB0aGVyZSB3aWxsIGJlIGFsd2F5cyB3aW5kb3cgYXZhaWxhYmxlLlxuICAgICAgICB0aGlzLnZhbHVlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIC8vIHRoaXMucXVlcnlWYWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgIGFueT4oKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2FsbGVkIGJ5IGZhY3RvcnkgbWV0aG9kIHRvIGluaXRpYWxpemUgdGhpcyBjb25maWcgY2xhc3NcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoY29uZmlnOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgICAgIHRoaXMuaW5pdERlZmF1bHRzKCk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29uZmlnKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlczogTWFwPHN0cmluZywgYW55PiA9IE1hcFdyYXBwZXIuY3JlYXRlRnJvbVN0cmluZ01hcDxhbnk+KGNvbmZpZyk7XG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+IHRoaXMuc2V0KGssIHYpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnQuc2V0VmFsdWUoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyLCB0aGlzLmdldChBcHBDb25maWcuQXNzZXRGb2xkZXIpKTtcblxuICAgICAgICBsZXQgbG9jYXRpb246IGFueSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgIGlmICh0aGlzLmVudmlyb25tZW50LmluVGVzdCkge1xuICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLmdldChBcHBDb25maWcuSW5UZXN0VXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIChpc1ByZXNlbnQobG9jYXRpb24pKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnBhcnNlUXVlcnlQYXJtcyhsb2NhdGlvbik7XG4gICAgICAgIC8vIH1cblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgcmVhZCBnbG9iYWxseSBpbnNlcnRlZCBzY3JpcHRzIHRvIGluaXRpYWxpemUgYXBwbGljYXRpb24gZnJvbSB0aGUgc2VydmVyIHNpZGUuXG4gICAgICogVGhlIHNjcmlwdCBjYW4gZGlyZWN0bHkgZGVjbGFyZSB0aGUgdmFyaWFibGVzIDpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogICA8c2NyaXB0PlxuICAgICAqICAgICAgdmFyIEFwcENvbmZpZ0dsb2JhbCA9IHtcbiAgICAgKiAgICAgICAgICAgICAgICdhcHAucHJvMSc6ICd2YWx1ZTEnLFxuICAgICAqICAgICAgICAgICAgICAgJ2FwcC5wcm8yJzogJ3ZhbHVlMicsXG4gICAgICogICAgICAgICAgICAgICAnbGFuZyc6ICdjaCdcbiAgICAgKiAgICAgIH07XG4gICAgICogIDwvc2NyaXB0PlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogICBvciBpdCBjYW4gYmUgaW5jbHVkZWQgb24gdGhlIGluZGV4Lmh0bWwgcGFnZSBkdXJpbmcgYnVpbGQgdGltZS5cbiAgICAgKlxuICAgICAqICAgV2UgZXhwZWN0IHRoYXQgd2lsbCBmaW5kIHRoZSBgQXBwQ29uZmlnR2xvYmFsYFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwYXJzZUdsb2JhbFBhcmFtcygpOiB2b2lkIHtcbiAgICAgICAgbGV0IGdsb2JhbENvbmZpZzogeyBbbmFtZTogc3RyaW5nXTogYW55IH0gPSByZWFkR2xvYmFsUGFyYW0oQXBwQ29uZmlnLkFwcENvbmZpZ0dsb2JhbFZhcik7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZ2xvYmFsQ29uZmlnKSkge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGdsb2JhbENvbmZpZykge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzLnNldChrZXkudG9Mb3dlckNhc2UoKSwgZ2xvYmFsQ29uZmlnW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlcyB0byBjb25maWd1cmF0aW9uLiB0byBtYWtlIHN1cmUgd2Ugd2lsbCBub3QgcnVuIGludG8gY2FzZS1zZW5zaXRpdmUgcHJvYmxlbXMgd2VcbiAgICAgKiBhcmUgY29udmVydGluZyBhbGwga2V5cyBpbnRvIGxvd2VyY2FzZVxuICAgICAqXG4gICAgICovXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVzLnNldChrZXkudG9Mb3dlckNhc2UoKSwgdmFsdWUpO1xuXG4gICAgICAgIGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gQXBwQ29uZmlnLkluVGVzdCkge1xuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudC5pblRlc3QgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZXMgdG8gY29uZmlndXJhdGlvblxuICAgICAqIHRvZG86IGRvbnQgZG8gYWxsIHRoaXMgd2l0aCB0aGlzIGhhY2t5IHdheS4ganVzdCBpZiB5b3UgbmVlZCB0byBjaGVjayBjYXNlIHNlbnNpdGl2aXR5LCB0aGVuXG4gICAgICogc2ltcGx5IG1hcCBrZXlzIGZyb20gdGhpcy52YWx1ZXMgaW50byBsb3dlcmNhc2UgYW5kIHRoZW4gY2hlY2sgaWYgaXQgaGFzIGEga2V5XG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVzLmhhcyhrZXkudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlcy5nZXQoa2V5LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgZ2V0TnVtYmVyKGtleTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBOdW1iZXJXcmFwcGVyLnBhcnNlSW50QXV0b1JhZGl4KHZhbCk7XG4gICAgfVxuXG5cbiAgICBnZXRCb29sZWFuKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmdldChrZXkpO1xuICAgICAgICByZXR1cm4gQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUodmFsKTtcbiAgICB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKlxuICAgIC8vICAqIENhbGxlZCBkdXJpbmcgaW5zdGFudGlhdGlvbiBhbmQgaXQgcmVhZCBxdWVyeSBwYXJhbXMgaWYgYW55IGFuZCB1c2UgdGhlbSBhc1xuICAgIC8vIGNvbmZpZ3VyYXRpb24uXG4gICAgLy8gICogV2UgbWlnaHQgd2FudCB0byBmb3JjZSB0byBwcmVmaXggZWFjaCBwYXJhbSB3aXRoIGVudi4gdG8gbWFrZSBzdXJlIHdlIGRvIG5vdCBzdG9yZVxuICAgIC8vIGV2ZXJ5dGhpbmcgKiAqLyBwcml2YXRlIHBhcnNlUXVlcnlQYXJtcyh1cmw6IHN0cmluZykgeyAgbGV0IHVybFNlcmlhbGl6ZXIgPSBuZXdcbiAgICAvLyBEZWZhdWx0VXJsU2VyaWFsaXplcigpOyBsZXQgdXJsVHJlZSA9IHVybFNlcmlhbGl6ZXIucGFyc2UodXJsKTsgIGlmXG4gICAgLy8gKGlzUHJlc2VudCh1cmxUcmVlLnF1ZXJ5UGFyYW1zKSkgeyAgZm9yIChsZXQga2V5IGluIHVybFRyZWUucXVlcnlQYXJhbXMpIHtcbiAgICAvLyB0aGlzLnF1ZXJ5VmFsdWVzLnNldChrZXkudG9Mb3dlckNhc2UoKSwgdXJsVHJlZS5xdWVyeVBhcmFtc1trZXldKTsgfSB9IH1cblxuICAgIHByaXZhdGUgaW5pdERlZmF1bHRzKCkge1xuXG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Jc0Rldk1vZGUsIGlzRGV2TW9kZSgpKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLlVzZXJBZ2VudCwgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuRGlyZWN0aW9uLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLk5hdlBsYXRmb3JtLCB3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbnRlbnRUeXBlLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvblJldHJ5SW50ZXJ2YWwsIDUwMCk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlciwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvbk1vY2tTZXJ2ZXJQYXRoLCAnL21vY2stcm91dGluZycpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuaTE4bkVuYWJsZWQsIHRydWUpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuSW5UZXN0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Eb21haW5VbmlxdWVOYW1lLCAndW5pcXVlTmFtZScpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuRG9tYWluUXVlcnksICdxJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQuaW5UZXN0KSB7XG4gICAgICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvbkFib3J0VGltZW91dCwgNTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uQWJvcnRUaW1lb3V0LCA4MDAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQXNzZXRGb2xkZXIsICdhc3NldHMnKTtcblxuICAgICAgICBpZiAoIXRoaXMudmFsdWVzLmhhcyhBcHBDb25maWcuTGFuZykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5MYW5nLCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy52YWx1ZXMuaGFzKEFwcENvbmZpZy5TdXBwb3J0ZWRMYW5ncykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5TdXBwb3J0ZWRMYW5ncywgU3Vwb3J0ZWRMYW5ndWFnZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRSZXN0QXBpQ29udGV4dFVybChlbnRpdHk6IHN0cmluZywgaXNOZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBuZXN0ZWRGbGFnID0gaXNOZXN0ZWQgPyAnJCcgOiAnJztcbiAgICAgICAgbGV0IHdpdGhFbnRpdHkgPSBgJHtBcHBDb25maWcuUmVzdEFwaUNvbnRleHRVcmx9LiR7bmVzdGVkRmxhZ30ke2VudGl0eX1gO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXQod2l0aEVudGl0eSkgfHwgdGhpcy5nZXQoQXBwQ29uZmlnLlJlc3RBcGlDb250ZXh0VXJsKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHVybCkpIHtcbiAgICAgICAgICAgIGlmICgvXFwvJC9nLnRlc3QodXJsKSkge1xuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzdCBBUElVcmkgaXMgbm90IGNvbmZpZ3VyZWQnKTtcbiAgICB9XG5cblxuICAgIGdldFJlc3RBcGlDb250ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChBcHBDb25maWcuUmVzdEFwaUNvbnRleHRVcmwpIHx8ICcnO1xuICAgIH1cblxuICAgIGdldFJlc3RBcGlIb3N0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChBcHBDb25maWcuUmVzdEFwaUhvc3RVcmwpIHx8ICcnO1xuICAgIH1cblxuICAgIGlzUHJvZHVjdGlvbk1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5nZXRCb29sZWFuKEFwcENvbmZpZy5Jc0Rldk1vZGUpO1xuICAgIH1cblxuICAgIGdldEJhc2VVcmwoKSB7XG4gICAgICAgIGNvbnN0IGlzTW9ja2VkID0gdGhpcy5nZXRCb29sZWFuKEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlcik7XG4gICAgICAgIGNvbnN0IGNueCA9IHRoaXMuZ2V0UmVzdEFwaUNvbnRleHQoKTtcbiAgICAgICAgY29uc3QgaG9zdCA9IHRoaXMuZ2V0UmVzdEFwaUhvc3QoKSB8fCAnJztcblxuICAgICAgICBpZiAoaXNNb2NrZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0KEFwcENvbmZpZy5Bc3NldEZvbGRlcik7XG4gICAgICAgICAgICByZXR1cm4gYCR7cHJlZml4fSR7Y254IHx8ICcvJ31gO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHVybCA9IGAke2hvc3R9JHtjbnggfHwgJy8nfWA7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IGZhY3RvcnkgbWV0aG9kIGluc2lkZXIgQVBQX0lOSVRJQUxJWkVSIHRvIHByZS1sb2FkIGkxOG4gc3VwcG9ydFxuICAgICAqXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZUkxOG4oKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PiA9IG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB1c2VkIGJ5IENvcmVNb2R1bGUgaW4gb3JkZXIgdG8gaW5zdGFudGlhdGUgQXBwQ29uZmlnIHByb3ZpZGVyXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNvbmZpZyhjb25maWc6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudjogRW52aXJvbm1lbnQpOiBBcHBDb25maWcge1xuICAgIC8vIHdoZW4gZW1wdHkgd2UgYXN1bWUgd2UgYXJlIGluIFRlc3QuIEFwcGxpY2F0aW9uIHNob3VsZCBhbHdheXMgaGF2ZSBzb21lIGJhc2ljIGluaXRpYWxpemF0aW9uXG4gICAgLy8gdG9kbzogTmVlZCB0byBnZXQgYmFjayB0byB0aGlzIGFzIHRoaXMgaXMgdGVtcG9yYXJ5LlxuXG4gICAgbGV0IGNvbmY6IEFwcENvbmZpZyA9IG5ldyBBcHBDb25maWcoaW5qZWN0b3IsIGVudik7XG4gICAgY29uZi5pbml0KGNvbmZpZyk7XG4gICAgcmV0dXJuIGNvbmY7XG59XG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHthc3NlcnR9IGZyb20gJy4uL3V0aWxzL2xhbmcnO1xuXG5cbi8qKlxuICogRW52aXJvbm1lbnQgaXMgc2hhcmFibGUgc3RhdGUgYmV0d2VlbiBjb21wb25lbnRzIGFuZCBpdHMgaW5qZWN0ZWQgYXQgdGhlIHJvb3QgbGV2ZWwgYW5kXG4gKiB0aGUgc2FtZSBpbnN0YW5jZSBhY2Nlc3NpYmxlIGRvd24gdGhlIGNvbXBvbmVudCB0cmVlLlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50XG57XG5cbiAgICAvKipcbiAgICAgKiBLZWVwIEN1cnJlbnQgTG9jYWxlLiBJbml0aWFsaXplZCBmcm9tIEFwcENvbmZpZyBhbG9uZyB3aXRoIGkxOG4gc3VwcG9ydFxuICAgICAqL1xuICAgIHByaXZhdGUgX2xvY2FsZTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IGNvbXBvbmVudCB0byBzYXZlIHNhdmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGZvciBwcm9jZXNzaW5nIGFuZCBpdHMgcmVuZGVyaW5nXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbnZWYXJpYWJsZXM6IE1hcDxzdHJpbmcsIGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFNpbXBsZSBzdGFjay1saWtlIHN0b3JhZ2Ugd2hlcmUgd2UgbmVlZCB0byBhIGtlZXAgaGlzdG9yeVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhY2tzVmFyaWFibGVzOiBNYXA8c3RyaW5nLCBhbnlbXT47XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgcHJvcGVydGllcyBmb3IgZGVidWdnaW5nIGFuZCB0ZXN0aW5nIHB1cnBvc2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1BzZXVkb0xvY2FsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGluVGVzdDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBjdXJyZW50IFBhZ2UgRm9ybUdyb3VwIFN0YXRlIHRoYXQgbmVlZCB0byBiZSBzaGFyZWQgZG93biBhY3Jvc3MgY29tcG9uZW50c1xuICAgICAqL1xuICAgIGN1cnJlbnRGb3JtOiBGb3JtR3JvdXA7XG5cbiAgICAvKipcbiAgICAgKiBBbiBFdmVudEVtaXR0ZXIgdG8gbGlzdGVuIHRvIGxvY2FsZSBjaGFuZ2UgZXZlbnRzXG4gICAgICovXG4gICAgb25Mb2NhbGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBpc1Byb2R1Y3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmVnaXN0ZXIgYW5kIHNhdmUgcmVmZXJlbmNlIHRvIHVzZXIgZGVmaW5lZCBydWxlcyBpZiBhbnkuIFlvdSBtaWdodCBkZWZpbmUgaXRzIG93biBtZXRhZGF0YVxuICAgICAqIHdoZW4gcmVuZGVyaW5nIFVJLlxuICAgICAqL1xuICAgIHVzZXJSdWxlczogYW55O1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBqc3V0IGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMgdG8gc2F2ZSBzb21lIHRlbXAgbWVzc2FnZSB0aGF0IEkgY2FuIHRoZW4gdHJhY2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBkZWJ1Z1N0cmluZzogc3RyaW5nO1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLl9sb2NhbGUgPSAnZW4nO1xuICAgICAgICB0aGlzLmVudlZhcmlhYmxlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIHRoaXMuc3RhY2tzVmFyaWFibGVzID0gbmV3IE1hcDxzdHJpbmcsIGFueVtdPigpO1xuICAgIH1cblxuXG4gICAgZ2V0VmFsdWUoa2V5OiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmVudlZhcmlhYmxlcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW52VmFyaWFibGVzLmdldChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5lbnZWYXJpYWJsZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGRlbGV0ZVZhbHVlKGtleTogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5lbnZWYXJpYWJsZXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNWYWx1ZShrZXk6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudlZhcmlhYmxlcy5oYXMoa2V5KTtcbiAgICB9XG5cbiAgICBhbGxWYXJpYWJsZXMoKTogTWFwPHN0cmluZywgYW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52VmFyaWFibGVzO1xuICAgIH1cblxuXG4gICAgZ2V0IGxvY2FsZSgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XG4gICAgfVxuXG4gICAgc2V0IGxvY2FsZSh2YWx1ZTogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlID0gdmFsdWU7XG5cbiAgICAgICAgLy8gRW1pdCBsb2NhbGUgY2hhbmdlZCBldmVudFxuICAgICAgICB0aGlzLm9uTG9jYWxlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIHBlYWs8VD4oa2V5OiBzdHJpbmcpOiBUXG4gICAge1xuICAgICAgICBsZXQgc3RhY2s6IFRbXSA9IHRoaXMuc3RhY2tzVmFyaWFibGVzLmdldChrZXkpIHx8IFtdO1xuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIubGFzdDxUPihzdGFjayk7XG5cbiAgICB9XG5cblxuICAgIHBvcDxUPihrZXk6IHN0cmluZyk6IFRcbiAgICB7XG4gICAgICAgIGxldCBzdGFjazogVFtdID0gdGhpcy5zdGFja3NWYXJpYWJsZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgIGFzc2VydChzdGFjay5sZW5ndGggPiAwLCAnIEF0dGVtcHQgdG8gZ2V0IHZhbHVlIGZyb20gZW1wdHkgc3RhY2snKTtcblxuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIucmVtb3ZlQXQ8YW55PihzdGFjaywgc3RhY2subGVuZ3RoIC0gMSk7XG4gICAgfVxuXG5cbiAgICBwdXNoPFQ+KGtleTogc3RyaW5nLCB2YWx1ZTogVCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBzdGFjazogVFtdID0gdGhpcy5zdGFja3NWYXJpYWJsZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgIHN0YWNrLnB1c2godmFsdWUpO1xuICAgICAgICB0aGlzLnN0YWNrc1ZhcmlhYmxlcy5zZXQoa2V5LCBzdGFjayk7XG4gICAgfVxuXG59XG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuXG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5cbi8qKlxuICogVG8gdW5pZnkgdGhlIHdvcmsgd2l0aCBkb21haW4gb2JqZWN0cyB3ZSBoYXZlIHRoZXNlIHNldCBvZiBpbnRlcmZhY2VzIHRoYXQgZWFjaCBFbnRpdHkgb3IgVmFsdWVcbiAqIG11c3QgdXNlIHRvIGxldmVyYWdlIHNvbWUgb2YgdGhlIGZ1bmN0aW9uYWxpdHkgd2UgaGF2ZSBpbiB0aGUgY29yZVxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb3NpdGVUeXBlXG57XG5cbiAgICBjbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgJHByb3RvPygpOiBDb21wb3NpdGVUeXBlO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSWRlbnRpdHlcbntcblxuICAgIGlkZW50aXR5KCk6IHN0cmluZztcblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2VyaWFsaXphYmxlXG57XG4gICAgZ2V0VHlwZXMoKTogYW55O1xufVxuXG5cbi8qKlxuICogRW50aXR5Q29tcG9zaXRlIGhhdmluZyBpZGVudGl0eSB0aGF0IGNhbiBiZSBpZGVudGlmaWVkIGluIHRoZSBzdG9yYWdlIGJ5IGl0cyBJRC4gRW50aXRpZXMgYXJlXG4gKiBtdXRhYmxlIG9iamVjdHNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbnRpdHkgZXh0ZW5kcyBJZGVudGl0eSxcbiAgICBEZXNlcmlhbGl6YWJsZSxcbiAgICBDb21wb3NpdGVUeXBlXG57XG59XG5cbi8qKlxuICogPGxpPk5vIElkZW50aXR5PC9saT5cbiAqIDxsaT5JbW11dGFibGU8L2xpPlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlIGV4dGVuZHMgRGVzZXJpYWxpemFibGUsXG4gICAgQ29tcG9zaXRlVHlwZVxue1xuICAgIC8vIGZvciB1c2Ugb2YgdHlwZSBndWFyZCBvbmx5LCBsYXRlciBvbiB3ZSBjYW4gdXNlIGl0IGZvciBzb21ldGhpbmdcbiAgICBjbG9uZSgpOiBWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50aXR5KGVudGl0eTogYW55KTogZW50aXR5IGlzIEVudGl0eVxue1xuICAgIHJldHVybiBpc1ByZXNlbnQoZW50aXR5KSAmJiBpc1ByZXNlbnQoKDxFbnRpdHk+ZW50aXR5KS5pZGVudGl0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbHVlKHZhbDogYW55KTogdmFsIGlzIFZhbHVlXG57XG4gICAgcmV0dXJuIGlzUHJlc2VudCh2YWwpICAmJiBpc1ByZXNlbnQoKDxWYWx1ZT52YWwpLmNsb25lKTtcbn1cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YXNzZXJ0LCBvYmplY3RUb05hbWV9IGZyb20gJy4uLy4uL3V0aWxzL2xhbmcnO1xuXG5leHBvcnQgZW51bSBSZXN0U2VnbWVudFR5cGVcbntcbiAgICBIb3N0LFxuICAgIENvbnRleHQsXG4gICAgQWN0aW9uLFxuICAgIFJlc291cmNlLFxuICAgIElkZW50aWZpZXIsXG4gICAgT2ZQYXJlbnRcbn1cblxuXG5leHBvcnQgZW51bSBSZXN0QWN0aW9uXG57XG4gICAgTG9hZCxcbiAgICBRdWVyeSxcbiAgICBTYXZlLFxuICAgIERvXG59XG5cblxuLyoqXG4gKiBTZXQgb2YgQVNUIGxpa2UgY2xhc3NlcyB0byBrZWVwIHRoZSBmbHVlbnQgQVBJIGdyYW1tYXIgaW4gdGhlIGFic3RyYWN0IGZvcm1hdCB0byBnaXZlIGRldmVsb3BlcnNcbiAqIGNoYW5nZXMgdG8gcHJvdmlkZSB0aGVpciBvd24gaW1wbGVtZW50YXRpb25cbiAqXG4gKiBUb2RvOiBFeHBvc2UgQnVpbGRlciBhcyBhIHNlcnZpY2VcbiAqXG4gKi9cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFVybFNlZ21lbnRcbntcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogUmVzdFNlZ21lbnRUeXBlLCBwdWJsaWMgdmFsdWU/OiBhbnksXG4gICAgICAgICAgICAgICAgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4sIHB1YmxpYyByYW5rOiBudW1iZXIgPSAtMSlcbiAgICB7XG5cbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgfVxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuICdXcm9uZyBSZXN0IFNlZ21lbnQgb3JkZXInO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgSG9zdFNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuSG9zdCwgdmFsdWUsIHBhcmFtcywgNSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT0gbnVsbCwgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIEhvc3Qgc2VnbWVudCBtdXN0IGJlIGZpcnN0IWA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0U2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5Db250ZXh0LCB2YWx1ZSwgcGFyYW1zLCAxMCk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5Ib3N0LCB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gQ29udGV4dCBzZWdtZW50IG11c3QgZm9sbG93IEhvc3QhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEFjdGlvblNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG4gICAgYWN0aW9uVHlwZTogUmVzdEFjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3Rpb246IFJlc3RBY3Rpb24sIHB1YmxpYyBkYXRhPzogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24sIGFjdGlvbiwgcGFyYW1zLCAwKTtcblxuICAgICAgICAvLyBzYXZlIGl0IHRvIGxvY2FsIHByb3BlcnR5IGZvciBlYXNpZXIgY29tcGFyaXNpb25cbiAgICAgICAgdGhpcy5hY3Rpb25UeXBlID0gYWN0aW9uO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuQ29udGV4dCwgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIEFjdGlvbiBtdXN0IGZvbGxvdyBDb250ZXh0IHNlZ21lbnQhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFJlc291cmNlU2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIHJlc291cmNlTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBUeXBlPGFueT4sIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlLCB2YWx1ZSwgcGFyYW1zLCAxNSk7XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZU5hbWUgPSBgJHtvYmplY3RUb05hbWUodGhpcy52YWx1ZSkudG9Mb3dlckNhc2UoKX1zYDtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydCgocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5BY3Rpb24gfHwgcHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudCksXG4gICAgICAgICAgICB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gUmVzb3VyY2UgbXVzdCBmb2xsb3cgZWl0aGVyIEFjdGlvbiBvciBPZiFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgSWRlbnRpZmllclNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuSWRlbnRpZmllciwgdmFsdWUsIHBhcmFtcywgMjApO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UsIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gSWRlbnRpZmllciBtdXN0IGZvbGxvdyBSZXNvdXJjZSFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgT2ZQYXJlbnRTZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50KTtcbiAgICAgICAgdGhpcy5yYW5rID0gMjtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlIHx8XG4gICAgICAgICAgICBwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLklkZW50aWZpZXIsXG4gICAgICAgICAgICB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIE9mIG11c3QgZm9sbG93IFJlc291cmNlIWA7XG4gICAgfVxufVxuXG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7QWN0aW9uU2VnbWVudCwgUmVzb3VyY2VTZWdtZW50LCBSZXN0QWN0aW9uLCBSZXN0U2VnbWVudFR5cGUsIFVybFNlZ21lbnR9IGZyb20gJy4vc2VnbWVudCc7XG5pbXBvcnQge2Fzc2VydCwgaXNQcmVzZW50LCBTdHJpbmdKb2luZXJ9IGZyb20gJy4uLy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtSZXN0VXJsR3JvdXB9IGZyb20gJy4vdXJsLWdyb3VwJztcblxuXG4vKipcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gdGhhdCByZWFkcyBhYnN0cmFjdCBVUkwgc3RydWN0dXJlIGFuZCBhc3NlbWJsZXMgY29ycmVjdCBVUkwuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZhdWx0UmVzdEJ1aWxkZXJcbntcbiAgICBwcml2YXRlIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVybEdyb3VwOiBSZXN0VXJsR3JvdXApXG4gICAge1xuICAgIH1cblxuICAgIGFzc2VtYmxlVXJsKGlzTW9ja2VkOiBib29sZWFuKTogc3RyaW5nXG4gICAge1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGUoKTtcblxuICAgICAgICBsZXQgc29ydGVkU2VnbWVudHMgPSB0aGlzLmFkanVzdFJhbmsodGhpcy51cmxHcm91cC5zZWdtZW50cyk7XG5cbiAgICAgICAgbGV0IHVybCA9IG5ldyBTdHJpbmdKb2luZXIoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzb3J0ZWRTZWdtZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHNvcnRlZFNlZ21lbnRzW2ldLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFJlc3RTZWdtZW50VHlwZS5BY3Rpb246XG4gICAgICAgICAgICAgICAgY2FzZSBSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2U6XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXNTZWdtZW50OiBSZXNvdXJjZVNlZ21lbnQgPSA8UmVzb3VyY2VTZWdtZW50PiBzb3J0ZWRTZWdtZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwuYWRkKCdtb2NrZWQnKS5hZGQoJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1cmwuYWRkKHJlc1NlZ21lbnQucmVzb3VyY2VOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTbGFzaCh1cmwsIGkgIT09IChzb3J0ZWRTZWdtZW50cy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB1cmwuYWRkKHNvcnRlZFNlZ21lbnRzW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTbGFzaCh1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmVzZW50KHNvcnRlZFNlZ21lbnRzW2ldLnZhbHVlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZFNlZ21lbnRzW2ldLnZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgIT09IChzb3J0ZWRTZWdtZW50cy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCg8QWN0aW9uU2VnbWVudD5zb3J0ZWRTZWdtZW50c1swXSkudmFsdWUgPT09IFJlc3RBY3Rpb24uRG8pIHtcbiAgICAgICAgICAgIHVybC5hZGQoJy8nKS5hZGQoJ2FjdGlvbnMnKS5hZGQoJy8nKS5hZGQoKDxBY3Rpb25TZWdtZW50PnNvcnRlZFNlZ21lbnRzWzBdKS5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgYWRkU2xhc2godXJsOiBTdHJpbmdKb2luZXIsIHNob3VsZEFkZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHVybC5hZGQoJy8nKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHZhbGlkYXRlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBhY3Rpb246IEFjdGlvblNlZ21lbnQgPSA8QWN0aW9uU2VnbWVudD50aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuQWN0aW9uKTtcblxuICAgICAgICBzd2l0Y2ggKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uU2F2ZTpcbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5EbzpcbiAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgd2UgaGF2ZSBhIElkZW50aWZpZXJcbiAgICAgICAgICAgICAgICBsZXQgd2l0aElkQ291bnQgPSB0aGlzLnVybEdyb3VwLmNvdW50KFJlc3RTZWdtZW50VHlwZS5JZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICBsZXQgb2YgPSB0aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQpO1xuXG4gICAgICAgICAgICAgICAgYXNzZXJ0KHdpdGhJZENvdW50ID49IDEsICdNaXNzaW5nIHdpdGhJZCg8SURFTlRJRklFUj4pIGNhbGwhJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBPRiBzZWdtZW50IHdoZXJlIHdlIHJlZmVyIHRvIHBhcmVudCByZXNvdXJjZS4gSW4gc3VjaCBjYXNlIHdlXG4gICAgICogbmVlZCBtb3ZlIGFsbCBiZWZvcmUgT0YgYXQgdGhlIGVuZC4gRWl0aGVyIGFmdGVyIHBhcmVudCBSRVNPVVJDRSBvciBJREVOVElGSUVSXG4gICAgICpcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqICAgc2VydmljZVxuICAgICAqICAgICAgLmxvYWQoKVxuICAgICAqICAgICAgLnJlc291cmNlKExpbmVJdGVtKVxuICAgICAqICAgICAgLm9mXG4gICAgICogICAgICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gICAgICogICAgICAud2l0aElkKCcxMjMnKTtcbiAgICAgKiAgYGBgXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICogRmluZCB0aGUgT0Ygc2VnbWVudCBhbmQgZ28gYmFjayB1bnRpbCB3ZSByZWFjaCBSZXNvdXJjZSBhbmQgYWRqdXN0IHJhbmsgb2YgdGhlc2UgYWRuXG4gICAgICogdGhlblxuICAgICAqIHNvcnRcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRqdXN0UmFuayhzZWdtZW50czogVXJsU2VnbWVudFtdKTogVXJsU2VnbWVudFtdXG4gICAge1xuICAgICAgICBsZXQgb2ZJbmRleCA9IHNlZ21lbnRzXG4gICAgICAgICAgICAuZmluZEluZGV4KChzOiBVcmxTZWdtZW50KSA9PiBzLnR5cGUgPT09IFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudCk7XG5cbiAgICAgICAgaWYgKG9mSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgb2YgPSBzZWdtZW50c1tvZkluZGV4XTtcbiAgICAgICAgICAgIGxldCBzZWdtZW50OiBVcmxTZWdtZW50O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQgPSBzZWdtZW50c1stLW9mSW5kZXhdO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQucmFuayAqPSBvZi5yYW5rO1xuICAgICAgICAgICAgfSB3aGlsZSAoc2VnbWVudC50eXBlICE9PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzLnNvcnQoKGEsIGIpID0+IGEucmFuayAtIGIucmFuayk7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1Jlc291cmNlU2VnbWVudCwgUmVzdFNlZ21lbnRUeXBlLCBVcmxTZWdtZW50fSBmcm9tICcuL3NlZ21lbnQnO1xuaW1wb3J0IHthc3NlcnQsIGlzQmxhbmssIGlzUHJlc2VudCwgaXNTdHJpbmd9IGZyb20gJy4uLy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnLi4vLi4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqXG4gKiBUaGlzIGNsYXNzIGp1c3QgYWdncmVnYXRlcyBhbmQgcHJvdmlkZXMgY29udmllbnQgYXBpdCB0byB0byB3b3JrIHdpdGggVXJsU2VnbWVudHNcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXN0VXJsR3JvdXBcbntcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWdtZW50cz86IFVybFNlZ21lbnRbXSlcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3NlZ21lbnRzKSkge1xuICAgICAgICAgICAgdGhpcy5fc2VnbWVudHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBFdmVyeSBwdXNoIGlzIHZhbGlkYXRlZCBhZ2FpbnRzIFVybFNlZ21lbnQgYXNzZXJ0IG1ldGhvZHMgdG8gbWFrZSBzdXJlIHRoZSBvcmRlciBvZiB0aGVcbiAgICAgKiBtZXRob2QgY2FsbHMgaXMgY29ycmVjdFxuICAgICAqXG4gICAgICovXG4gICAgcHVzaChzZWdtZW50OiBVcmxTZWdtZW50KTogdm9pZFxuICAgIHtcbiAgICAgICAgc2VnbWVudC5hc3NlcnRTZWdtZW50KCh0aGlzLl9zZWdtZW50cy5sZW5ndGggPiAwKSA/IHRoaXMucGVhaygpLnR5cGUgOiBudWxsKTtcblxuICAgICAgICBpZiAoaXNTdHJpbmcoc2VnbWVudC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHNlZ21lbnQudmFsdWUgPSBzZWdtZW50LnZhbHVlLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFN0YWNrIGxpa2UgQVBJXG4gICAgICpcbiAgICAgKi9cbiAgICBwZWFrKCk6IFVybFNlZ21lbnRcbiAgICB7XG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5sYXN0PFVybFNlZ21lbnQ+KHRoaXMuX3NlZ21lbnRzKTtcbiAgICB9XG5cblxuICAgIHBvcCgpOiBVcmxTZWdtZW50XG4gICAge1xuICAgICAgICBhc3NlcnQodGhpcy5fc2VnbWVudHMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICcgQXR0ZW1wdCB0byBnZXQgdmFsdWUgZnJvbSBlbXB0eSBzZWdtZW50cyBzdGFjaycpO1xuXG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5yZW1vdmVBdDxVcmxTZWdtZW50Pih0aGlzLl9zZWdtZW50cywgdGhpcy5fc2VnbWVudHMubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VnbWVudChzZWdtZW50VHlwZTogUmVzdFNlZ21lbnRUeXBlLCBkYXRhOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgdXJsU2VnbWVudCA9IHRoaXMubG9va3VwKHNlZ21lbnRUeXBlKTtcbiAgICAgICAgdXJsU2VnbWVudC52YWx1ZSA9IGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBCYXNlZCBvbiB0aGUgZW51bSBTZWdtZW50IFR5cGUgIGl0IHdpbGwgcmV0cmlldmUgY29ycmVjdCBzZWdtZW50IGZyb20gdGhlIHN0YWNrXG4gICAgICpcbiAgICAgKi9cbiAgICBsb29rdXAoc2VnbWVudDogUmVzdFNlZ21lbnRUeXBlLCBieVJlc291cmNlPzogVHlwZTxhbnk+KTogVXJsU2VnbWVudFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zZWdtZW50cykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNzID0gWy4uLnRoaXMuc2VnbWVudHNdO1xuICAgICAgICBzcyA9IHNzLnJldmVyc2UoKTtcblxuICAgICAgICByZXR1cm4gc3MuZmluZCgoKHM6IFVybFNlZ21lbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNNYXRjaCA9IHMudHlwZSA9PT0gc2VnbWVudDtcblxuICAgICAgICAgICAgaWYgKHNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChieVJlc291cmNlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTWF0Y2ggJiYgKDxSZXNvdXJjZVNlZ21lbnQ+cykudmFsdWUgPT09IGJ5UmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc01hdGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoYXNNYXRjaDtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ291bnRzIG51bWJlciBvZiBzZWdtZW50cyBvZiBjZXJ0YWluIHR5cGVcbiAgICAgKlxuICAgICAqL1xuICAgIGNvdW50KHNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IHNlZ21lbnRzID0gdGhpcy5zZWdtZW50cy5maWx0ZXIoKHM6IFVybFNlZ21lbnQpID0+IHNlZ21lbnQgPT09IHMudHlwZSk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoc2VnbWVudHMpID8gc2VnbWVudHMubGVuZ3RoIDogMDtcbiAgICB9XG5cblxuICAgIGdldCBzZWdtZW50cygpOiBVcmxTZWdtZW50W11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50cztcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cblxuXG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0luamVjdGFibGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBIdHRwQ2xpZW50LFxuICAgIEh0dHBFcnJvclJlc3BvbnNlLFxuICAgIEh0dHBIZWFkZXJzLFxuICAgIEh0dHBQYXJhbXMsXG4gICAgSHR0cFByb2dyZXNzRXZlbnQsXG4gICAgSHR0cFJlc3BvbnNlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7RW50aXR5LCBpc0VudGl0eSwgaXNWYWx1ZSwgVmFsdWV9IGZyb20gJy4vZG9tYWluLW1vZGVsJztcbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICcuLi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge1xuICAgIEFjdGlvblNlZ21lbnQsXG4gICAgQ29udGV4dFNlZ21lbnQsXG4gICAgSG9zdFNlZ21lbnQsXG4gICAgSWRlbnRpZmllclNlZ21lbnQsXG4gICAgT2ZQYXJlbnRTZWdtZW50LFxuICAgIFJlc291cmNlU2VnbWVudCxcbiAgICBSZXN0QWN0aW9uLFxuICAgIFJlc3RTZWdtZW50VHlwZVxufSBmcm9tICcuL3VybC9zZWdtZW50JztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVmYXVsdFJlc3RCdWlsZGVyfSBmcm9tICcuL3VybC9idWlsZGVyJztcbmltcG9ydCB7UmVzdFVybEdyb3VwfSBmcm9tICcuL3VybC91cmwtZ3JvdXAnO1xuaW1wb3J0IHthc3NlcnQsIGlzQXJyYXksIGlzQmxhbmssIGlzRGF0ZSwgaXNQcmVzZW50fSBmcm9tICcuLi91dGlscy9sYW5nJztcblxuXG4vKipcbiAqIFJlc3BvbnNlIGlzIHRoZSBnZW5lcmljIHdyYXBwZXIgaW50ZXJmYWNlIGVuY2Fwc3VsYXRpbmcgYSByZXNwb25zZSBmcm9tIHRoZSBtaWNybyBzZXJ2aWNlLlxuICogQ3VycmVudGx5IHdlIGhhdmUgb25seSBib2R5IGZpZWxkLCBidXQgbGF0ZXIgb24gd2UgbmVlZCB0byBleHRlbmQgaXQgZm9yIGRpZmZlcmVudCBub3RpZmljYXRpb25zLFxuICogZXJyb3JzLCBwYWdpbmcgaW5mb3JtYXRpb24gYW5kIG11Y2ggbW9yZS5cbiAqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZTxUPiB7XG4gICAgcGF5bG9hZDogVDtcbn1cblxuXG4vKipcbiAqXG4gKiBUbyBzaW1wbGlmeSB3b3JrIHdpdGggY3VycmVudCBIdHRwQ2xpZW50IHRoZSBSZXNvdXJjZSBwcm92aWRlcyBmbHVlbnQgQVBJIG9uIHRvcCBvZiBpdC4gWW91IGRvbnRcbiAqIGFzc2VtYmxlIFVSTCB0cmFkaXRpb25hbCB3YXkgcmF0aGVyIG1vcmUgZmx1ZW50IGFuZCBmdW5jdGlvbmFsIHdheSwgd29ya2luZyB3aXRoIHJlYWwgZGF0YSB0eXBlc1xuICogc3VjaCBhIFZhbHVlIGFuZCBFbnRpdHkuXG4gKlxuICogRW50aXR5IGFuZCBWYWx1ZSBhcmUgdHdvIG1haW4ga2V5IGludGVyZmFjZXMgdGhhdCBhbGwgZG9tYWluIG9iamVjdHMgc2hvdWxkIGluaGVyaXQgZnJvbSBpZiB0aGV5XG4gKiB3YW50IHRvIGxldmVyYWdlIHRoaXMgZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiAjIyNFeGFtcGxlXG4gKlxuICogMS4gIHRvIHNpbXBseSBhc3NlbWJsZSBmb2xsb3dpbmcgVVJMIGh0dHA6Ly9hcGkuYXJpYmEuY29tL215U2VydmljZS92MS9yZXF1aXNpdGlvbnMvMTIzIGFuZFxuICogIGFuZCBmZXRjaCBSZXF1aXNpdGlvbiBkYXRhOlxuICpcbiAqIGBgYHRzXG4gKiAgbGV0IHI6IFJlc291cmNlXG4gKlxuICogIHIubG9hZCgpXG4gKiAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAqICAgLndpdGhJZCgnMTIzJylcbiAqICAgLmFzRW50aXR5PFJlcXVpc2l0aW9uPigocjogUmVxdWlzaXRpb24pID0+IHJlY2VpdmVkUiA9IHIpO1xuICpcbiAqIGBgYFxuICogWW91IHlvdSBjYW4gc2ltcGx5IHJlYWQgaXQ6IGxvYWQgcmVzb3VyY2UgUmVxdWlzaXRpb24gd2l0aCBJRCAxMjMgYW5kIHJldHVybiB0aGlzIGFzIEVudGl0eVxuICpcbiAqIDIuIEN1cnJlbnQgZmx1ZW50IEFQSSBhbHNvIHN1cHBvcnQgcGFydGlhbCB1cGRhdGVzIGFuZCBzdWJjb250ZXh0IHJlc291cmNlXG4gKiAgdG8gbG9hZCBkYXRhIGZyb20gdGhpcyBSRVNUIEFQSSBlbmRwb2ludFxuICogICAgICBodHRwOi8vYXBpLmFyaWJhLmNvbS9teVNlcnZpY2UvdjEvcmVxdWlzaXRpb25zLzEyMy9zdXBwbGllcnNcblxuXG4gKiBgYGB0c1xuICogIGxldCByOiBSZXNvdXJjZVxuICpcbiAqICByLmxvYWQoKVxuICogICAucmVzb3VyY2UoU3VwcGxpZXIpXG4gKiAgIC5vZlxuICogICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gKiAgIC53aXRoSWQoJzEyMycpXG4gKiAgIC5hc0VudGl0eTxTdXBwbGllcj4oKHI6ICBTdXBwbGllcltdKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKiBgYGBcbiAqXG4gKiAgWW91IGNhbiByZWFkIGFib3ZlOiBMb2FkIGFsbCBmcm9tIHJlc291cmNlIFN1cHBsaWVyIG9mIFJlcXVpc2l0aW9uIChvciBzdXBwbGllciBiZWxvbmdzIHRvXG4gKiAgUmVxdWlzaXRpb24pICB3aXRoIElEIDEyMyBhbmQgcmV0dXJuIHRoaXMgYXMgRW50aXR5LlxuICpcbiAqXG4gKiAzLiBUbyBzYXZlIGRhdGEgeW91IGZvbGxvdyB0aGUgc2FtZSBzeW50YXhcbiAqICAgICAgU2F2ZSByZXF1aXNpdGlvbiBzbyB3ZSBhcmUgUFVUdGluZyBkYXRhIHRvIGZvbGxvd2luZyBVUkxcbiAqICAgICAgaHR0cDovL2FwaS5hcmliYS5jb20vbXlTZXJ2aWNlL3YxL3JlcXVpc2l0aW9ucy8xMjNcbiAqXG4gKiBgYGB0c1xuICogIGxldCByOiBSZXNvdXJjZVxuICpcbiAqICAgICAgICAgIHJcbiAqICAgICAgICAuc2F2ZSgpXG4gKiAgICAgICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICogICAgICAgIC53aXRoSWQoJzEyMycpXG4gKiAgICAgICAgLndpdGhEYXRhKHByKVxuICogICAgICAgIC5hc0VudGl0eTxSZXF1aXNpdGlvbj4oKHI6IFJlcXVpc2l0aW9uKSA9PiByZWNlaXZlZFIgPSByKTtcbiAqXG4gKlxuICogYGBgXG4gKlxuICogIFlvdSBjYW4gcmVhZCBhYm92ZTogU2F2ZSByZXNvdXJjZSBSZXF1aXNpdGlvbiB3aXRoIElEIDEyMyBhbmQgd2l0aCBEYXRhIC4uLi4gYW5kIHJldHVybiBpdCBhc1xuICogIGEgRW50aXR5XG4gKlxuICpcbiAqICA0LiBBUEkgY2FuIGFsc28gZm9yIHlvdSBhc3NlbWJsZSBhbmQgZXhlY3V0ZSBhY3Rpb25zIHNvbWV0aW1lcyBjYWxsZWQgaW50ZXJhY3Rpb24uIE5vdCBhbGwgaXNcbiAqICBhYm91dCBDUlVELiBPdXIgY3VycmVudCBzeW50YXggZm9yIGFjdGlvbnMgaXNcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgaHR0cDovL2FwaS5hcmliYS5jb20vbXlTZXJ2aWNlL3YxL3JlcXVpc2l0aW9ucy8xMjMvYWN0aW9ucy9hcHByb3ZlXG4gKlxuICogYGBgdHNcbiAqICBsZXQgcjogUmVzb3VyY2VcbiAqXG4gKiAgICAgICAgclxuICogICAgICAgIC5kbygnYXBwcm92ZScpXG4gKiAgICAgICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICogICAgICAgIC53aXRoSWQoJzEyMycpXG4gKiAgICAgICAgLmFzRW50aXR5PFJlcXVpc2l0aW9uPigocjogUmVxdWlzaXRpb24pID0+IHJlY2VpdmVkUiA9IHIpO1xuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiBUbyBtYWtlIGl0IGVhc2lseSBleHRlbnNpYmxlIHRoZXkgYXJlIDMgbWFpbiBwaWVjZXNcbiAqICAtIFJlc291cmNlOiBUaGlzIGNsYXNzIGp1c3QgcHV0IHRvZ2V0aGVyIGFic3RyYWN0IHN0cnVjdHVyZSBVUkxTZWdtZW50XG4gKiAgLSBVUkxTZWdtZW50czogTW9yZSBsaWtlIEFTVCBzdHlsZSB0byBhc3NlbWJsZSB0aGUgVVJMXG4gKiAgLSBidWlsZGVyOiB0aGF0IHJlYWQgdGhpcyBBU1QgdG8gYXNzZW1ibGUgdGhlIFVSTFxuICpcbiAqXG4gKiBMYXRlciBvbiB3ZSBtaWdodCB3YW50IHRvIGV4cG9zZSBidWlsZGVyIGFzIGEgcHJvdmlkZXIgYW5kIHlvdSBjYW4gaGF2ZSB5b3VyIG93biBpbXBsZW1lbnRhdGlvblxuICpcbiAqXG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc291cmNlIHtcbiAgICAvKipcbiAgICAgKiBSZXN0VXJsR3JvdXAgYWdncmVnYXRlcyBVcmxTZWdtZW50c1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBfdXJsR3JvdXA6IFJlc3RVcmxHcm91cDtcblxuICAgIC8qKlxuICAgICAqIE9uY2UgYWxsIFVSTCBhcmUgYXNzZW1ibGVkIHRoZSBidWlsZGVyIHJldHVybnMgZmluYWwgVVJMIHRvIGJlIHVzZWQgZm9yIHRoZSBIdHRwQ2xpZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBfdXJsQnVpbGRlcjogRGVmYXVsdFJlc3RCdWlsZGVyO1xuXG4gICAgLyoqXG4gICAgICogQ2FjaGVkIHVybCwgc28gd2UgZG9udCBoYXZlIHRvIGFzc2VtYmxlIHRoaXMgZXZlcnl0aW1lIHNvbWVib2R5IGNhbGxzIHVybFxuICAgICAqL1xuICAgIHByaXZhdGUgX3VybDogc3RyaW5nO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgYXBwQ29uZmlnOiBBcHBDb25maWcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIEdFVCBvcGVyYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGxvYWQoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IEFjdGlvblNlZ21lbnQoUmVzdEFjdGlvbi5Mb2FkKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBQVVQgb3IgUE9TVCBvcGVyYXRpb24uIERlcGVuZGluZyBvbiB0aGUgb2JqZWN0LiBJZiB0aGUgb2JqZWN0IGhhcyBhbHJlYWR5XG4gICAgICogcG9wdWxhdGVkIGl0cyBpZGVudGlmaWVyLCB0aGVuIHdlIHVzZSBQVVQsIG90aGVyd2lzZSBQT1NUXG4gICAgICpcbiAgICAgKi9cbiAgICBzYXZlKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBBY3Rpb25TZWdtZW50KFJlc3RBY3Rpb24uU2F2ZSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgaW50ZXJhY3Rpb24uIEZvciB0aGlzIHdlIHVzZSBQT1NUXG4gICAgICpcbiAgICAgKi9cbiAgICBkbyhhY3Rpb246IHN0cmluZyk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBBY3Rpb25TZWdtZW50KFJlc3RBY3Rpb24uRG8sIGFjdGlvbikpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVE9ETzogU2luY2UgcXVlcnkgQVBJIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgb24gdGhlIHNlcnZlciBzaWRlID0+IFRCRFxuICAgICAqXG4gICAgICogVGhlcmUgd2hlcmUgc2hvdWxkIGJlIGFibGUgdG8gYWNjZXB0cyBpbmRpdmlkdWFsIHF1ZXJ5IGdyYW1tYXIuIFNpbWlsYXIgc3R5bGUgbGlrZSByeGpzXG4gICAgICogb3BlcmF0b3JzLlxuICAgICAqXG4gICAgICogIGUuZy46IFJlc291cmNlLnByb3RvdHlwZS5jb250YWlucyA9IC4uLi5cbiAgICAgKiAgICAgICAgUmVzb3VyY2UucHJvdG90eXBlLmVxID0gLi4uLlxuICAgICAqXG4gICAgICogWW91IHNob3VsZCBiZSBhYmxlIHRvIGFkZCBkeW5hbWljYWxseSBsZXQ7cyBjYWxsIGl0IFF1ZXJ5U3BlY2lmaWNhdGlvblxuICAgICAqXG4gICAgICogICAgICByZXNcbiAgICAgKiAgICAgIC5xdWVyeSgpXG4gICAgICogICAgICAucmVzb3VyY2UoUmVxdXNpdGlvbilcbiAgICAgKiAgICAgIC53aGVyZSggY29udGFpbnM8c3RyaW5nPihyZXFFbnRpdHkudGl0bGUoKSwgJyphc2RmKicgKVxuICAgICAqXG4gICAgICogIHNvIGl0IGNvdWxkIGxvb2sgbGlrZSBzb21ldGhpbmcgbGlrZTpcbiAgICAgKlxuICAgICAqXG4gICAgICogIGNvbnRhaW5zPFQ+KHRpdGxlOiBzdHJpbmcsIHZhbHVlOiBUKTogVFxuICAgICAqXG4gICAgICogIEJ1dCBzaW5jZSBhbGwgdGhlc2UgU3BlY2lmaWNhdGlvbiB3b3VsZCBoYXZlIGEgd2F5IHRvIHRyYW5zbGF0ZSB0aGlzIGtleXx2YWx1ZSB0byB0aGVcbiAgICAgKiAgcXVlcnkgc28gdGhlIHdoZXJlLCB3b3VsZCBqdXN0IGxpc3QgYWxsIHRoZSBzcGVjaWZpY2F0aW9uIHRvIGJ1bGlkXG4gICAgICogIHRoZSBxdWVyeVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBxdWVyeSgpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgd2hlcmUoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSWRlbnRpZmllcyBSZXNvdXJjZVNlZ21lbnQgd2l0aCBzcGVjaWZpYyB0eXBlIHRoYXQgbXVzdCBiZSBlaXRoZXIgRW50aXR5IG9yIFZhbHVlXG4gICAgICpcbiAgICAgKi9cbiAgICByZXNvdXJjZTxUIGV4dGVuZHMgRW50aXR5IHwgVmFsdWU+KHR5cGU6IFR5cGU8VD4pOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgUmVzb3VyY2VTZWdtZW50KHR5cGUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBJZGVudGlmaWVyU2VnbWVudFxuICAgICAqXG4gICAgICovXG4gICAgd2l0aElkKGlkZW50aWZpZXI6IHN0cmluZyk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBJZGVudGlmaWVyU2VnbWVudChpZGVudGlmaWVyKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgYXJlIHNhdmluZyBkYXRhIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gaW5zZXJ0IGEgcGF5bG9hZCB0byB0aGUgQWN0aW9uU2VnbWVudFxuICAgICAqXG4gICAgICovXG4gICAgd2l0aERhdGE8VCBleHRlbmRzIEVudGl0eSB8IFZhbHVlPihkYXRhOiBUKTogUmVzb3VyY2Uge1xuICAgICAgICBsZXQgdXJsU2VnbWVudCA9IHRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24pO1xuICAgICAgICBsZXQgaXNTYXZlID0gKDxBY3Rpb25TZWdtZW50PnVybFNlZ21lbnQpLmFjdGlvblR5cGUgPT09IFJlc3RBY3Rpb24uU2F2ZTtcblxuICAgICAgICBhc3NlcnQoaXNTYXZlLCAnd2l0aERhdGEgY2FuIGJlIHVzZWQgd2l0aCBTQVZFIG9wZXJhdGlvbiBvbmx5IScpO1xuXG4gICAgICAgICg8QWN0aW9uU2VnbWVudD51cmxTZWdtZW50KS5kYXRhID0gZGF0YTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBPRiBpcyBqdXN0IGEgc3ludGFjdGljIHN1Z2dhciBmb3IgYmV0dGVyIHJlYWRhYmlsaXR5IGFuZCB0byBlYXNpZXIgd29yayB3aXRoIHN1YiByZXNvdXJjZXMuXG4gICAgICogdXNpbmcgT0Ygd2UgYXJlIGFibGUgdG8gdGVsbCB0aGF0IHNvbWUgcmVzb3VyY2UgYmVsb25ncyB0byBvdGhlciByZXNvdXJjZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IG9mKCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBPZlBhcmVudFNlZ21lbnQoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBPbmNlIHRlbGwgd2hhdCB5b3Ugd2FudCB0aGlzIGlzIHRoZSBsYXN0IGNhbGwgeW91IHdhbnQgdG8gbWFrZSB0byByZXR1cm4gcmVzb3VyY2VzIGFzIGFjdHVhbFxuICAgICAqIEVudGl0aWVzIG9yIFZhbHVlcy5cbiAgICAgKlxuICAgICAqIFRvZG86IE1heWJlIHJlbmFtZSBhIG1ldGhvZCBuYW1lIGFzIHdlIGNhbiByZXR1cm4gYm90aCBFbnRpdHkgYW5kIFZhbHVlLlxuICAgICAqXG4gICAgICogWW91IGhhdmUgYWxzbyBvcHRpb24gdG8gaW5zZXJ0IEh0dHBPcHRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIGFzRW50aXR5PFQgZXh0ZW5kcyBFbnRpdHkgfCBWYWx1ZT4oc3Vic2NyaWJlcjogKHJlczogVCB8IFRbXSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZTogJ2JvZHknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zPzogSHR0cFBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlPzogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ID0ge29ic2VydmU6ICdib2R5J30pOiBTdWJzY3JpcHRpb24ge1xuICAgICAgICBsZXQgc2VnbWVudDogQWN0aW9uU2VnbWVudCA9IDxBY3Rpb25TZWdtZW50PiB0aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuQWN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChzZWdtZW50KSwgJ01pc3NpbmcgSHR0cCBtZXRob2QuIE5vdCBzdXJlIGhvdyB0byBoYW5kbGUgdGhpcyEnKTtcblxuICAgICAgICBsZXQgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgICAgIGxldCBhY3Rpb25UeXBlOiBSZXN0QWN0aW9uID0gc2VnbWVudC52YWx1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uTG9hZDpcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLmdldDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uRG86XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwge30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uU2F2ZTpcbiAgICAgICAgICAgICAgICAvLyB3ZSBkb250IGhhdmUgcmlnaHQgbm93IG90aGVyIHVzZWNhc2Ugc3ViY29udGV4dCByZXNvdXJjZSB3aWxsIGJlIGFsd2F5cyBzb21lXG4gICAgICAgICAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgICAgICAgICBpZiAoaXNFbnRpdHkoc2VnbWVudC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNCbGFuaygoPEVudGl0eT5zZWdtZW50LmRhdGEpLmlkZW50aXR5KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnBvc3Q8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNWYWx1ZShzZWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGV4cGVjdCB2YWx1ZSB3aWxsIGJlIGFsd2F5cyBwdXNoZWRcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXA8UmVzcG9uc2U8VCB8IFRbXT4sIFQgfCBUW10+KHJlcyA9PiB0aGlzLmNvbnZlcnRUb0NvbXBvc2l0ZShyZXMsXG4gICAgICAgICAgICB0cnVlLCBmYWxzZSkpKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfVxuXG5cbiAgICBhc0h0dHBSZXNwb25zZTxUIGV4dGVuZHMgRW50aXR5IHxcbiAgICAgICAgVmFsdWU+KHN1YnNjcmliZXI6IChyZXM6IEh0dHBSZXNwb25zZTxSZXNwb25zZTxUIHwgVFtdPj4gfCBIdHRwUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgIGVycm9yPzogKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgcGFyYW1zPzogSHR0cFBhcmFtcywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZT86ICdqc29uJywgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhblxuICAgICAgICAgICAgICAgfSA9IHtvYnNlcnZlOiAncmVzcG9uc2UnfSk6IFN1YnNjcmlwdGlvbiB7XG5cbiAgICAgICAgbGV0IHNlZ21lbnQ6IEFjdGlvblNlZ21lbnQgPSA8QWN0aW9uU2VnbWVudD4gdGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbik7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQoc2VnbWVudCksICdNaXNzaW5nIEh0dHAgbWV0aG9kLiBOb3Qgc3VyZSBob3cgdG8gaGFuZGxlIHRoaXMhJyk7XG5cbiAgICAgICAgbGV0IG9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PjtcblxuICAgICAgICBsZXQgYWN0aW9uVHlwZTogUmVzdEFjdGlvbiA9IHNlZ21lbnQudmFsdWU7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkxvYWQ6XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkRvOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLlNhdmU6XG4gICAgICAgICAgICAgICAgLy8gd2UgZG9udCBoYXZlIHJpZ2h0IG5vdyBvdGhlciB1c2VjYXNlIHN1YmNvbnRleHQgcmVzb3VyY2Ugd2lsbCBiZSBhbHdheXMgc29tZVxuICAgICAgICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgICAgICAgaWYgKGlzRW50aXR5KHNlZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoKDxFbnRpdHk+c2VnbWVudC5kYXRhKS5pZGVudGl0eSgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzVmFsdWUoc2VnbWVudC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBleHBlY3QgdmFsdWUgd2lsbCBiZSBhbHdheXMgcHVzaGVkXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoYXNQcm9ncmVzcyA9IG9wdGlvbnMucmVwb3J0UHJvZ3Jlc3MgfHwgZmFsc2U7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnBpcGUoXG4gICAgICAgICAgICBtYXAocmVzID0+IHRoaXMuY29udmVydFRvQ29tcG9zaXRlKHJlcywgZmFsc2UsIGhhc1Byb2dyZXNzKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHN1YnNjcmliZXIsIGVycm9yKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0dXJuIGFzc2VibGVkIFVSTCBBU1QgLT4gc3RyaW5nXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3VybCkpIHtcbiAgICAgICAgICAgIGxldCBpc01vY2tlZCA9IHRoaXMuYXBwQ29uZmlnLmdldEJvb2xlYW4oQXBwQ29uZmlnLkNvbm5lY3Rpb25Vc2VNb2NrU2VydmVyKTtcblxuICAgICAgICAgICAgdGhpcy5fdXJsID0gdGhpcy5fdXJsQnVpbGRlci5hc3NlbWJsZVVybChpc01vY2tlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCB1cmxHcm91cCgpOiBSZXN0VXJsR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXJsR3JvdXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJpdmF0ZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IHVybEJ1aWxkZXIoKTogRGVmYXVsdFJlc3RCdWlsZGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybEJ1aWxkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJpdmF0ZVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl91cmxHcm91cCA9IG5ldyBSZXN0VXJsR3JvdXAoKTtcbiAgICAgICAgdGhpcy5fdXJsQnVpbGRlciA9IG5ldyBEZWZhdWx0UmVzdEJ1aWxkZXIodGhpcy5fdXJsR3JvdXApO1xuICAgICAgICB0aGlzLl91cmwgPSBudWxsO1xuXG5cbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBIb3N0U2VnbWVudCh0aGlzLmFwcENvbmZpZy5nZXRSZXN0QXBpSG9zdCgpKSk7XG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgQ29udGV4dFNlZ21lbnQodGhpcy5hcHBDb25maWcuZ2V0UmVzdEFwaUNvbnRleHQoKSkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBpbnNpZGUgLm1hcCB0byBtYXAgSlNPTiByZXNwb25zZSBvciBIdHRwUmVzcG9uc2UuYm9keSB0byBhY3R1YWwgdHlwZVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0VG9Db21wb3NpdGU8VCBleHRlbmRzIEVudGl0eSB8IFZhbHVlPihyZXM6IFJlc3BvbnNlPFQgfCBUW10+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIdHRwUmVzcG9uc2U8UmVzcG9uc2U8VCB8IFRbXT4+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wb3NpdGU6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9ncmVzczogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGlmIChoYXNQcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgICAvLyB1bnNvcnRlZCBzZWdtZW50cyB3aWxsIGhhdmUgaGF2ZSBvdXIgdGFyZ2V0IHJlc291cmNlIGFzIGZpcnN0IG9uZVxuICAgICAgICBsZXQgc2dtOiBSZXNvdXJjZVNlZ21lbnQgPSA8UmVzb3VyY2VTZWdtZW50PnRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSk7XG5cbiAgICAgICAgaWYgKGlzQ29tcG9zaXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXNlcmlhbGl6ZSgoPFJlc3BvbnNlPFQ+PnJlcykucGF5bG9hZCwgc2dtLnZhbHVlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGh0dHBSZXMgPSA8SHR0cFJlc3BvbnNlPFJlc3BvbnNlPFQ+Pj5yZXM7XG4gICAgICAgICAgICBsZXQgbXlSZXNwOiBSZXNwb25zZTxUPiA9IHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiB0aGlzLmRlc2VyaWFsaXplKGh0dHBSZXMuYm9keS5wYXlsb2FkLCBzZ20udmFsdWUpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGh0dHBSZXMuY2xvbmUoe2JvZHk6IG15UmVzcH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzZXJpYWxpemU8VD4oZGF0YTogVCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENvbnZlcnRzIEpTT04gb2JqZWN0IHRvIGFjdHVhbCBUeXBlLiBXZSBkb24ndCBjYXJlIGFib3V0IHByaW1pdGl2ZSB0eXBlcyBhcyB3ZSBkb250IGhhdmUgdG9cbiAgICAgKiBkbyBhbnl0aGluZyB3aXRoIHRoZW0uIFdlIGRvIGluc3RhbnRpYXRlIG9iamVjdHMgb3IgY29tcGxleCB0eXBlcyBvbmx5LlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBkZXNlcmlhbGl6ZShqc29uOiBhbnksIGNsYXp6OiBUeXBlPGFueT4pOiBhbnkge1xuICAgICAgICBpZiAoaXNBcnJheShqc29uKSkge1xuICAgICAgICAgICAgbGV0IGluc3RhbmNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBpbiBqc29uKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VzLnB1c2godGhpcy5kZXNlcmlhbGl6ZShqc29uW2l0ZW1dLCBjbGF6eikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZTtcbiAgICAgICAgICAgIGlmIChjbGF6eiA9PT0gU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBqc29uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXp6ID09PSBOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IGpzb247XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXp6ID09PSBCb29sZWFuKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBqc29uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBjbGF6eigpO1xuICAgICAgICAgICAgICAgIGxldCB0eXBlcyA9IGluc3RhbmNlLmdldFR5cGVzKCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFqc29uLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodHlwZXNbcHJvcF0pICYmIGlzUHJlc2VudChqc29uW3Byb3BdKSAmJiB0eXBlc1twcm9wXSAhPT0gRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcF0gPSB0aGlzLmRlc2VyaWFsaXplKGpzb25bcHJvcF0sIHR5cGVzW3Byb3BdKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZSh0eXBlc1twcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BdID0gbmV3IHR5cGVzW3Byb3BdKGpzb25bcHJvcF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wXSA9IGpzb25bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIGlmIChpc1N0cmluZyhqc29uW3Byb3BdKSAmJiBpc0VudGl0eShpbnN0YW5jZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICYmIHByb3AgPT09ICg8RW50aXR5Pmluc3RhbmNlKS5pZGVudGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBpZFN0cmluZyA9ICg8RW50aXR5Pmluc3RhbmNlKS5pZGVudGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgKDxhbnk+aW5zdGFuY2UpW2lkU3RyaW5nXSA9IDxzdHJpbmc+anNvbltwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFnZS1jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxoMT4gT29wcyE8L2gxPlxuICAgICAgICAgICAgICAgIDxoMj4gNDA0IE5vdCBGb3VuZDwvaDI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLWRldGFpbHNcIj4gU29ycnksIGFuIGVycm9yIGhhcyBvY2N1cmVkLCBSZXF1ZXN0ZWQgcGFnZSBub3QgZm91bmQhXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLmVycm9yLXRlbXBsYXRle3BhZGRpbmc6NDBweCAxNXB4O3RleHQtYWxpZ246Y2VudGVyfS5lcnJvci1hY3Rpb25ze21hcmdpbi10b3A6MTVweDttYXJnaW4tYm90dG9tOjE1cHh9LmVycm9yLWFjdGlvbnMgLmJ0bnttYXJnaW4tcmlnaHQ6MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOb3RGb3VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgIH1cblxufVxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBFdmVudCxcbiAgICBOYXZpZ2F0aW9uRW5kLFxuICAgIE5hdmlnYXRpb25FeHRyYXMsXG4gICAgTmF2aWdhdGlvblN0YXJ0LFxuICAgIFJvdXRlLFxuICAgIFJvdXRlclxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICcuLi91dGlscy9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuXG4vKipcbiAqIEJhc2ljIHdyYXBwZXIgYXJvdW5kIEFuZ3VsYXIncyBST1VURSBzZXJ2aWNlIHRvIHNpbXBsaWZ5IHRlbXBvcmFyeSBzdGF0ZSBjYWNoaW5nIGFzIHdlbGxcbiAqIG5hdmlnYXRpb24uIFRoaXMgc2VydmljZSBsaXN0ZW4gZm9yIFJvdXRpbmcgZXZlbnRzIHN1Y2ggYXMgTmF2aWdhdGlvblN0YXJ0IGFzIHdlbGwsXG4gKiBOYXZpZ2F0aW9uRW5kcyBhbmQgd2hlbiB0aGUgcm91dGluZyBFbnRlcnMsIFdlIGNoZWNrIGlmIHRoZXJlIGFueSBzdGF0ZSB3aGljaCBuZWVkcyB0byBiZSBjYWNoZWRcbiAqIGlmIHllcyB0aGVuIHdlIHNhdmUgaXQgaW50byB0aGUgc3RhdGVDYWNoZUhpc3Rvcnkgd2hpY2ggbWFwcyBmaW5hbCBVUkwgdG8gdGhlIGFjdHVhbCBTVEFURVxuICogb2JqZWN0LCBhbmQgd2hlbiB3ZSBhcmUgbmF2aWdhdGUgYmFjayB0byB0aGUgc2FtZSBVUkwgV2UgY2hlY2sgaWYgdGhlcmUgaXMgYW55IHNhdmVkIHN0YXRlLlxuICpcbiAqIFRoaXMgc2VydmljZSB3YXMgb3JpZ2luYWxseSBjcmVhdGVkIGFzIGEgcmVzcG9uc2UgdGhhdCBhbmd1bGFyIGFsd2F5cyBkZXN0cm95ZXMgYW5kIHJlY3JlYXRlc1xuICogY29tcG9uZW50cyB3aGVuIG5hdmlnYXRpbmcgYXdheXMgYW5kIHRoZW4gYmFjayB0byBpdC4gQnkgYSBvZiBhbmd1bGFyIDQuMi4wKyB0aGlzIG1pZ2h0IGJlXG4gKiBvYnNvbGV0ZS5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb3V0aW5nU2VydmljZVxue1xuICAgIC8qKlxuICAgICAqIFN0YWNrIGtlZXBpbmcgYWN0aXZlIFJvdXRlcyBzbyB3ZSBjYW4gZ28gYmFjay9yZWRpcmVjdCBiYWNrXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJvdXRpbmdTdGF0ZTogRXZlbnRbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogVGVtcG9yYXJ5IGZpZWxkIGhvbGRpbmcgYSBzdGF0ZSBPYmplY3Qgb2YgdHlwZSBUIGJlZm9yZSBpdHMgc2F2ZWQgaW50byBzdGF0ZUNhY2hlSGlzdG9yeSxcbiAgICAgKiBhbmQgcmV0cmlldmVkIHdoZW4gZ2V0dGluZyBiYWNrIGZyb20gU3RhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGN1cnJlbnRTdGF0ZUZyb206IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogVGVtcG9yYXJ5IGZpZWxkIGhvbGRpbmcgYSBzdGF0ZSBPYmplY3Qgb2YgdHlwZSBUIGJlZm9yZSBpdHMgc2F2ZWQgaW50byBzdGF0ZUNhY2hlSGlzdG9yeSxcbiAgICAgKiBhbmQgcmV0cmlldmVkIHdoZW4gZ2V0dGluZyB0byBTdGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgY3VycmVudFN0YXRlVG86IGFueTtcblxuICAgIC8qXG4gICAgICogRXZlbnQgb2JqZWN0IGZvciByZWdpc3RlcmluZyBsaXN0ZW5lcnMgdG8gc2F2ZSBhIGNlcnRhaW4gc3RhdGUgYXMgd2VsbCBhcyBicm9hZGNhc3RpbmcgYmFja1xuICAgICAqIHdoZW4gc3RhdGUgbmVlZHMgdG8gYmUgcmV0cmlldmVkIGJhY2sgdG8gdGhlIFBhZ2VcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRlQ2FjaGU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBpcyBvdXIgY2FjaGUgd2hpY2ggbWFwcyBVUkwgPT4gdG8gPSA+U1RBVEUuIEFueSBwYWdlIGNhbiBzYXZlIGFueSBzdGF0ZSB1c2luZ1xuICAgICAqIG9ic2VydmFibGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgcmV0cmlldmVkIGJhY2suXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0ZUNhY2hlSGlzdG9yeTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlcilcbiAgICB7XG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5zdWJzY3JpYmVUb1JvdXRpbmdFdmVudHMoZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEhlcmUgaXMgdGhlIG1haW4gcm91dGluZyBsb2dpYyB0aGF0IHByb2Nlc2VzIGV2ZXJ5IHJvdXRpbmcgZXZlbnRzLlxuICAgICAqXG4gICAgICovXG4gICAgc3Vic2NyaWJlVG9Sb3V0aW5nRXZlbnRzKGV2ZW50OiBFdmVudCk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICAgICAgbGV0IHVybCA9IGV2ZW50LnVybDtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlQ2FjaGVIaXN0b3J5Lmhhcyh1cmwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlLm5leHQodGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5nZXQodXJsKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5kZWxldGUodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm91dGluZ1N0YXRlLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG5cbiAgICAgICAgICAgIGxldCBpdGVtQmVmb3JlUm91dGUgPSBMaXN0V3JhcHBlci5sYXN0PEV2ZW50Pih0aGlzLnJvdXRpbmdTdGF0ZSk7XG5cblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmN1cnJlbnRTdGF0ZUZyb20pICYmIGlzUHJlc2VudChpdGVtQmVmb3JlUm91dGUpICYmIGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVGcm9tKSAmJiBpdGVtQmVmb3JlUm91dGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8XG4gICAgICAgICAgICAgICAgaXRlbUJlZm9yZVJvdXRlIGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2FjaGVIaXN0b3J5LnNldChpdGVtQmVmb3JlUm91dGUudXJsLCB0aGlzLmN1cnJlbnRTdGF0ZUZyb20pO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRnJvbSA9IG51bGw7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMuY3VycmVudFN0YXRlVG8pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5zZXQoZXZlbnQudXJsLCB0aGlzLmN1cnJlbnRTdGF0ZVRvKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZVRvID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlbmllbnQgR08gQkFDSyBtZXRob2QuIHdoaWNoIHRha2VzIHlvdSB0byBwcmV2aW91cyByb3V0ZSBhbG9uZyB3aXRoIHRoZSBVUkwgY2hhbmdlLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBnb0JhY2sobnVtT2ZTdGVwczogbnVtYmVyID0gMSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIHdlIGFyZSBzdGFydGluZyBmcm9tIC0xIGFzIHdlIG5lZWQgdG8gYWxzbyByZW1vdmUgY3VycmVudCByb3V0ZVxuICAgICAgICBsZXQgc3RlcHMgPSAtMTtcbiAgICAgICAgbGV0IG5hdmlnYXRlVXJsID0gJy80MDQnO1xuICAgICAgICB3aGlsZSAoc3RlcHMgIT09IG51bU9mU3RlcHMpIHtcbiAgICAgICAgICAgIGxldCBwb3BTdGF0ZSA9IHRoaXMucm91dGluZ1N0YXRlLnBvcCgpO1xuICAgICAgICAgICAgaWYgKHBvcFN0YXRlIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCB8fCBwb3BTdGF0ZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuICAgICAgICAgICAgICAgIG5hdmlnYXRlVXJsID0gcG9wU3RhdGUudXJsO1xuICAgICAgICAgICAgICAgIHN0ZXBzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKG5hdmlnYXRlVXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gbmF2aWdhdGluZyB0byBhIG5ldyBQYWdlIHlvdSBjYW4gdXNlIGRpcmVjdGx5IHJvdXRlciBvciBpZiB5b3Ugd2FudCB0byByZW1lbWJlciBzb21lXG4gICAgICogc3RhdGUgdG5lIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKi9cbiAgICBuYXZpZ2F0ZTxUPihjb21tYW5kczogYW55W10sIHN0YXRlPzogVCwgZXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRnJvbSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShjb21tYW5kcywgZXh0cmFzKTtcblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gbmF2aWdhdGluZyB0byBhIG5ldyBQYWdlIHlvdSBjYW4gdXNlIGRpcmVjdGx5IHJvdXRlciBvciBpZiB5b3Ugd2FudCB0byByZW1lbWJlciBzb21lXG4gICAgICogc3RhdGUgdG5lIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKi9cbiAgICBuYXZpZ2F0ZVdpdGhSb3V0ZTxUPihyb3V0ZTogUm91dGUsIHBhcmFtcz86IGFueSwgc3RhdGU/OiBULCBleHRyYXM/OiBOYXZpZ2F0aW9uRXh0cmFzKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVUbyA9IHN0YXRlO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGUucGF0aCwgcGFyYW1zXSwgZXh0cmFzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEVudHJ5IG1ldGhvZCBmb3IgYnJvYWRjYXN0aW5nIHN0YXRlQ2FjaGUgYW5kIHNlbmRpbmcgc2F2ZWQgU3RhdGUgYmFjayB0byB0aGUgcGFnZVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBiaW5kU3RhdGVDYWNoZTxUPihsaXN0ZW5lcjogKGl0ZW06IFQpID0+IHZvaWQpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnN0YXRlQ2FjaGUuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChzdGF0ZUl0ZW06IFQpID0+IGxpc3RlbmVyKHN0YXRlSXRlbSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIHNvIGNoZWNrIGV4dHJhIHBhcmFtZXRlcnMgd2hpY2ggYXJlIHBhc3NlZCB1c2luZyBNYXRyaXggbm90YXRpb25cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgb3BlcmF0aW9uKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IG9wZXJhdGlvbiA9IHJvdXRlLnNuYXBzaG90LnBhcmFtc1snbyddO1xuICAgICAgICByZXR1cm4gaXNCbGFuayhcbiAgICAgICAgICAgIG9wZXJhdGlvbikgfHwgKG9wZXJhdGlvbiAhPT0gJ3ZpZXcnICYmIG9wZXJhdGlvbiAhPT0gJ2NyZWF0ZScgJiYgb3BlcmF0aW9uICE9PSAnZWRpdCcpXG4gICAgICAgICAgICA/ICd2aWV3JyA6IG9wZXJhdGlvbjtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFzc2VtYmxlcyBhIHBhdGggYmFzZWQgb24gdGhlIGN1cnJlbnQgcm91dGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBwYXRoRm9yUGFnZShwYWdlTmFtZTogc3RyaW5nLCBwYXRoTmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3QudXJsfS8ke3BhdGhOYW1lfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWFyY2ggdG9wIGxldmVsIHJvdXRlcyBhbmQgcmV0dXJuIFJvdXRlIHRoYXQgaGFzIGNvbXBvbmVudCBuYW1lIGVxdWFsIHRvIHBhZ2VOYW1lXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHJvdXRlRm9yUGFnZShwYWdlTmFtZTogc3RyaW5nLCBwYXRoTmFtZT86IHN0cmluZywgYWN0aXZhdGVkUGF0aD86IHN0cmluZyk6IFJvdXRlXG4gICAge1xuICAgICAgICBsZXQgbmV4dFJvdXRlOiBhbnk7XG4gICAgICAgIC8vIHdlIG5lZWQgdGhpcyBhcyB3ZSBuZWVkIHRvIGxvb2t1cCBpZiB0aGVyZSBpcyBhbnkgcm91dGUgd2l0aCBnaXZlbiBwYWdlTmFtZSBhc1xuICAgICAgICAvLyBjaGlsZCByb3V0ZSwgaWYgbm90IHNlYXJjaCBmb3IgZ2xvYmFsIG9uY2VzXG5cbiAgICAgICAgbGV0IG5vcm1hbGl6ZWRQYXRoID0gYWN0aXZhdGVkUGF0aC5pbmRleE9mKCcvJykgPT09IDAgPyBhY3RpdmF0ZWRQYXRoLnN1YnN0cmluZygxKSA6XG4gICAgICAgICAgICBhY3RpdmF0ZWRQYXRoO1xuXG4gICAgICAgIGxldCBjdXJyZW50Um91dGU6IFJvdXRlID0gdGhpcy5yb3V0ZXIuY29uZmlnLmZpbmQoKHI6IFJvdXRlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCByb3V0ZVBhdGggPSByLnBhdGguaW5kZXhPZignLycpID09PSAwID8gci5wYXRoLnN1YnN0cmluZygxKSA6XG4gICAgICAgICAgICAgICAgICAgIHIucGF0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KG5vcm1hbGl6ZWRQYXRoKSAmJiBub3JtYWxpemVkUGF0aCA9PT0gcm91dGVQYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHRyeSB0byBtYXRjaCB0aGUgcGF0aCBhbmQgZXhwZWN0ZWQgcGFnZU5hbWVcbiAgICAgICAgaWYgKGlzUHJlc2VudChwYXRoTmFtZSkgJiYgaXNQcmVzZW50KGN1cnJlbnRSb3V0ZSkgJiYgY3VycmVudFJvdXRlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgbmV4dFJvdXRlID0gY3VycmVudFJvdXRlLmNoaWxkcmVuLmZpbmQoKHI6IFJvdXRlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnROYW1lID0gci5jb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGhOYW1lID09PSByLnBhdGggJiYgcGFnZU5hbWUgPT09IGNvbXBvbmVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQocGFnZU5hbWUpKSB7XG5cbiAgICAgICAgICAgIG5leHRSb3V0ZSA9IHRoaXMucm91dGVyLmNvbmZpZy5maW5kKChyOiBSb3V0ZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50TmFtZSA9IHIuY29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoTmFtZSA9PT0gci5wYXRoICYmIHBhZ2VOYW1lID09PSBjb21wb25lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGF0aCBub3QgZm91bmQgdGhlbiBjaGVjayBvbmx5IGlmIHdlIGZpbmQgYW55d2hlcmUgaW4gdGhlIHBhdGggcGFnZU5hZVxuICAgICAgICBpZiAoaXNCbGFuayhuZXh0Um91dGUpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5jb25maWcuZm9yRWFjaCgocjogUm91dGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChyLmNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudE5hbWUgPSByLmNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VOYW1lID09PSBjb21wb25lbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0Um91dGUgPSByO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHRSb3V0ZTtcbiAgICB9XG5cbn1cblxuXG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBOb3RpZmljYXRpb25zIHNlcnZpY2UgaXMgYSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgcHVibGlzaC9zdWJzY3JpYmUgZXZlbnQgYnVzIGZvciBwdWJsaXNoaW5nXG4gKiBhbmQgbGlzdGVuaW5nIGZvciBhcHBsaWNhdGlvbiBsZXZlbCBldmVudHMuXG4gKlxuICogVG8gc3Vic2NyaWJlIHRvIHNwZWNpZmljIGV2ZW50IGUuZy4gVXNlciBMb2dnZWQgSW4gd2hlcmUgdG9waWMgaXMgY2FsbGVkIHVzZXI6c2lnbmVkSW5cbiAqXG4gKlxuICogYGBgdHNcbiAqXG4gKiAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgIHNlbGVjdG9yOiAnbXktY29tcCcsXG4gKiAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgSGVsbG9cbiAqICAgICAgICAgICAgIGBcbiAqICAgICB9KVxuICogICAgIGNsYXNzIE15Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95XG4gKiAgICAge1xuICpcbiAqICAgICAgICBzdWJzY3I6IFN1YnNjcmlwdGlvbjtcbiAqXG4gKiAgICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9ucykge1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLnN1YnNjciA9IG5vdGlmaWNhdGlvbnMuc3Vic2NyaWJlKCd1c2VyOnNpZ25lZEluJywgKG1lc3NhZ2U6IGFueSkgPT5cbiAqICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgIC8vIGxvYWQgdXNlciBwcm9maWxlXG4gKiAgICAgICAgICAgICAgfSk7XG4gKiAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICAgICB0aGlzLnN1YnNjci51bnN1YnNjcmliZSgpO1xuICogICAgICAgICAgfVxuICpcbiAqXG4gKlxuICogICAgIH1cbiAqXG4gKlxuICogYGBgXG4gKlxuICogVG8gcHVibGlzaCBldmVudDpcbiAqXG4gKiBgYGBcbiAqICAgICBsZXQgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uO1xuICogICAgIG5vdGlmaWNhdGlvbnMucHVibGlzaCgndXNlcjpzaWduZWRJbicsICdVc2VyIGp1c3Qgc2lnbmVkIGluJyk7XG4gKlxuICogYGBgXG4gKlxuICogWW91IGNhbiBjcmVhdGUgYW5kIGxpc3RlbiBmb3IgeW91ciBvd24gYXBwbGljYXRpb24gbGV2ZWwgZXZlbnRzIG9yIHlvdSBjYW4gYWxzbyBsaXN0ZW4gZm9yIGFsbFxuICogdGhlIHRvcGljcyBpbiB0aGUgYXBwbGljYXRpb24gaWYgeW91IHVzZSAgYCpgIGFzIGFwcGxpY2F0aW9uIHRvcGljXG4gKlxuICogVW5zdWJzY3JpYmluZyBpcyByZXNwb25zaWJpbGl0eSAgb2YgZWFjaCBzdWJzY3JpYmVyXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uc1xue1xuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGlzIGlzIHVzZWQgYXMgYSB0b3BpYyBzdWJzY3JpYmVyIHJlY2VpdmVzIGFsbCBtZXNzYWdlc1xuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IEFsbFRvcGljcyA9ICcqJztcblxuICAgIC8qKlxuICAgICAqIE9ic2VydmFibGUgdXNlZCB0byBwdWJsaXNoIGFuZCBzdWJzY3JpYmUgdG8gYXBwbGljYXRpb24gbGV2ZWwgZXZlbnRzXG4gICAgICovXG4gICAgcHJpdmF0ZSBldmVudHM6IFN1YmplY3Q8TWVzc2FnZT47XG5cblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IFN1YmplY3Q8TWVzc2FnZT4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFN1YnNjcmliZSB0byBzcGVjaWZpYyBsaXN0ZW5lciBiYXNlZCBvbiBnaXZlbiB0b3BpYy5cbiAgICAgKlxuICAgICAqL1xuICAgIHN1YnNjcmliZSh0b3BpYzogc3RyaW5nLCBzdWJzY3JpYmVyOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvblxuICAgIHtcbiAgICAgICAgY29uc3QgdG9BbGwgPSBOb3RpZmljYXRpb25zLkFsbFRvcGljcztcblxuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihtc2cgPT4gbXNnLnRvcGljID09PSB0b3BpYyB8fCB0b3BpYyA9PT0gdG9BbGwpLFxuICAgICAgICAgICAgbWFwKChtc2c6IE1lc3NhZ2UpID0+IG1zZy5jb250ZW50KVxuXG4gICAgICAgICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUHVibGlzaCBuZXcgZXZlbnQgdG8gYSB0b3BpY1xuICAgICAqXG4gICAgICovXG4gICAgcHVibGlzaCh0b3BpYzogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgbXNnOiBNZXNzYWdlID0ge3RvcGljOiB0b3BpYywgY29udGVudDogbWVzc2FnZX07XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobXNnKTtcblxuICAgIH1cblxufVxuXG4vKipcbiAqXG4gKiBCYXNlIGNsYXNzIGZvciBnZW5lcmljIG1lc3NhZ2VcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZVxue1xuICAgIHRvcGljOiBzdHJpbmc7XG4gICAgY29udGVudDogYW55O1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtFcnJvckhhbmRsZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zfSBmcm9tICcuL21lc3NhZ2luZy9ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJy4vdXRpbHMvbGFuZyc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbEVycm9ySGFuZGxlciBleHRlbmRzIEVycm9ySGFuZGxlclxue1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvbnM/OiBOb3RpZmljYXRpb25zKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVFcnJvcihlcnJvcjogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm5vdGlmaWNhdGlvbnMpKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMucHVibGlzaCgnYXBwOmVycm9yJywgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGUsIFJvdXRlc30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Tm90Rm91bmRDb21wb25lbnR9IGZyb20gJy4vbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQnO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7cGF0aDogJ25vdC1mb3VuZCcsIGNvbXBvbmVudDogTm90Rm91bmRDb21wb25lbnR9XG5dO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxuICAgIF0sXG4gICAgZXhwb3J0czogW1JvdXRlck1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBcmliYUNvcmVSb3V0aW5nTW9kdWxlXG57XG59XG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgSHR0cEVycm9yUmVzcG9uc2UsXG4gICAgSHR0cEV2ZW50LFxuICAgIEh0dHBIYW5kbGVyLFxuICAgIEh0dHBJbnRlcmNlcHRvcixcbiAgICBIdHRwUmVxdWVzdCxcbiAgICBIdHRwUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dGhyb3dFcnJvciBhcyBvYnNlcnZhYmxlVGhyb3dFcnJvciwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4uL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBpc1N0cmluZ30gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi9kb21haW4vcmVzb3VyY2Uuc2VydmljZSc7XG5cblxuLyoqXG4gKiBUeXBlZCBpbnRlcmZhY2VkIHRvIHByb2Nlc3MgZWFzaWVyIHJvdXRlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vY2tSb3V0ZXNcbntcbiAgICByZXNvdXJjZTogc3RyaW5nO1xuICAgIHJvdXRlczogTW9ja1JvdXRlW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1vY2tSb3V0ZVxue1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICByZXNwb25zZUNvZGU6IG51bWJlcjtcbiAgICByZXNwb25zZVRleHQ6IHN0cmluZztcbiAgICBkYXRhOiBhbnkgfCBudWxsO1xufVxuXG4vKipcbiAqIEludGVyY2VwdG9yIHByb3ZpZGluZyBNb2NrIFNlcnZlciBmdW5jdGlvbmFsaXR5IGFuZCBpcyBpbnNlcnRlZCBvbmx5IGFuZCBpZiBtb2NrIHNlcnZlciBpc1xuICogZW5hYmxlZCB1c2luZyBBcHBDb25maWcncyBjb25uZWN0aW9uLm1vY2stc2VydmVyLmVuYWJsZWQgYm9vdHN0cmFwIHByb3BlcnR5XG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBNb2NrSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3JcbntcblxuICAgIC8qKlxuICAgICAqIFN0b3JlcyBsb2FkZWQgcm91dGVzIGJ5IGdpdmVuIGVudGl0eSBuYW1lLlxuICAgICAqXG4gICAgICovXG4gICAgcm91dGVzQnlFbnRpdHk6IE1hcDxzdHJpbmcsIE1vY2tSb3V0ZVtdPiA9IG5ldyBNYXA8c3RyaW5nLCBNb2NrUm91dGVbXT4oKTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBDb25maWc6IEFwcENvbmZpZylcbiAgICB7XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZiByb3V0ZSBpcyBmb3VuZCByZXR1cm5lZCBNb2NrIHJlc3VsZWQgZGVmaW5lZCBpbiB0aGUgSlNPTiBmaWxlcywgb3RoZXJ3aXNlIHBhc3NcbiAgICAgKiB0aGUgcmVxdWVzdCB0byB0aGUgbmV4dCBpbnRlcmNlcHRvci5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PlxuICAgIHtcblxuICAgICAgICBsZXQgbW9ja2VkUmVzcCA9IHRoaXMubWFrZVJlcyhyZXEpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQobW9ja2VkUmVzcCkpIHtcblxuICAgICAgICAgICAgaWYgKG1vY2tlZFJlc3Auc3RhdHVzID49IDIwMCAmJiBtb2NrZWRSZXNwLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoPEh0dHBSZXNwb25zZTxhbnk+Pm1vY2tlZFJlc3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJycm9yID0gbmV3IEh0dHBFcnJvclJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG1vY2tlZFJlc3AuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBtb2NrZWRSZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogbW9ja2VkUmVzcC5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHJlcS51cmxXaXRoUGFyYW1zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJycm9yKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiB1c2VyIGNvbmZpZ3VyYXRpb24gd2UgbG9hZCBhbGwgdGhlIGF2YWlsYWJsZSByb3V0ZXMgYW5kIHJlZ2lzdGVyIHRoZW0gaW50b1xuICAgICAqIGB0aGlzLnJvdXRlc0J5RW50aXR5YFxuICAgICAqXG4gICAgICovXG4gICAgbG9hZFJvdXRlcygpXG4gICAge1xuICAgICAgICBsZXQgcm91dGVzOiBzdHJpbmdbXSA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQ29ubmVjdGlvbk1vY2tTZXJ2ZXJSb3V0ZXMpO1xuICAgICAgICBmb3IgKGxldCByb3V0ZU5hbWUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICBsZXQgcmVxOiBIdHRwUmVxdWVzdDxhbnk+ID0gdGhpcy5tYWtlUmVxKHJvdXRlTmFtZSk7XG5cbiAgICAgICAgICAgIC8vIGxldCdzIG1ha2UgcXVpY2sgYW5kIGRpcnR5IGFzeW5jIGNhbGwgdG8gbG9hZCBvdXIgcm91dGVzIGJlZm9yZSBhbnl0aGluZyBlbHNlXG4gICAgICAgICAgICBsZXQgbW9ja2VkOiBNb2NrUm91dGVzID0gdGhpcy5yZXF1ZXN0Rm9yUm91dGVzKHJlcSk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlc0J5RW50aXR5LnNldChtb2NrZWQucmVzb3VyY2UsIG1vY2tlZC5yb3V0ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybnMgY29uZmlndXJhdGlvbiBiYXNlZCBvbiBtb2NrIEpTT04gZmlsZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlcXVlc3RGb3JSb3V0ZXMocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogTW9ja1JvdXRlc1xuICAgIHtcblxuICAgICAgICBsZXQgeG1sSHR0cFJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cbiAgICAgICAgeG1sSHR0cFJlcS5vcGVuKHJlcS5tZXRob2QsIHJlcS51cmxXaXRoUGFyYW1zLCBmYWxzZSk7XG5cbiAgICAgICAgcmVxLmhlYWRlcnMua2V5cygpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgYWxsID0gcmVxLmhlYWRlcnMuZ2V0QWxsKGtleSk7XG4gICAgICAgICAgICB4bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgYWxsLmpvaW4oJywnKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB4bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcbiAgICAgICAgeG1sSHR0cFJlcS5zZW5kKG51bGwpO1xuXG5cbiAgICAgICAgbGV0IGJvZHkgPSBpc0JsYW5rKHhtbEh0dHBSZXEucmVzcG9uc2UpID8geG1sSHR0cFJlcS5yZXNwb25zZVRleHQgOlxuICAgICAgICAgICAgeG1sSHR0cFJlcS5yZXNwb25zZTtcblxuICAgICAgICBpZiAoeG1sSHR0cFJlcS5zdGF0dXMgPCAyMDAgJiYgeG1sSHR0cFJlcS5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIE1vY2sgc2VydmVyIGNvbmZpZ3VyYXRpb24uIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB5b3UnICtcbiAgICAgICAgICAgICAgICAnIGhhdmUgYSBtb2NrLXJvdXRpbmcvIGZvbGRlciB1bmRlciB5b3VyIGFzc2V0cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzU3RyaW5nKGJvZHkpID8gSlNPTi5wYXJzZShib2R5KSA6IGJvZHk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENyZWF0ZSBhIHJlcXVlc3RzIHRvIGxvYWQgcm91dGVzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG1ha2VSZXEocm91dGVOYW1lOiBzdHJpbmcpOiBIdHRwUmVxdWVzdDxhbnk+XG4gICAge1xuICAgICAgICBsZXQgYXNzZXRGb2xkZXI6IHN0cmluZyA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQXNzZXRGb2xkZXIpO1xuICAgICAgICBsZXQgcGF0aDogc3RyaW5nID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5Db25uZWN0aW9uTW9ja1NlcnZlclBhdGgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3QoJ0dFVCcsIGAke2Fzc2V0Rm9sZGVyfSR7cGF0aH0vJHtyb3V0ZU5hbWV9Lmpzb25gLCB7XG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJ1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiB3ZSBhcmUgY3JlYXRpbmcgYSByZXNwb25zZSB3ZSBhbHdheXMgZXhwZWN0IHR3byB0aGluZ3M6XG4gICAgICogMSkgV2UgYXJlIGRlYWxpbmcgd2l0aCBFbnRpdHlcbiAgICAgKiAyKSBSRVNUIEFQSSBpcyBoYW5kbGVkIHVzaW5nIFJlc291cmNlIHdoaWNoIHByZXBlbmQgL21vY2tlZC9cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZVJlcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBIdHRwUmVzcG9uc2U8YW55PlxuICAgIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlT3A6IEh0dHBSZXNwb25zZTxhbnk+O1xuXG4gICAgICAgIGxldCBwYXRoID0gcmVxLnVybFdpdGhQYXJhbXMuc3Vic3RyaW5nKHJlcS51cmwuaW5kZXhPZignbW9ja2VkJykgKyA2KTtcbiAgICAgICAgbGV0IHJlc291cmNlID0gcGF0aC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIGlmIChyZXNvdXJjZS5pbmRleE9mKCcvJykgIT09IC0xKSB7XG4gICAgICAgICAgICByZXNvdXJjZSA9IHJlc291cmNlLnN1YnN0cmluZygwLCByZXNvdXJjZS5pbmRleE9mKCcvJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm91dGVzQnlFbnRpdHkuaGFzKHJlc291cmNlKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VPcCA9IHRoaXMuZG9IYW5kbGVSZXF1ZXN0KHJlcSwgcGF0aCwgcmVzb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsocmVzcG9uc2VPcCkgJiYgdGhpcy5hcHBDb25maWcuZ2V0Qm9vbGVhbihBcHBDb25maWcuSW5UZXN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIGJvZHk6IHt9LCBzdGF0dXM6IDQwNCwgc3RhdHVzVGV4dDogJ05vdCBGb3VuZCcsXG4gICAgICAgICAgICAgICAgdXJsOiByZXEudXJsV2l0aFBhcmFtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlT3A7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoaXMgd2lsbCBnZXQgdGhlIGNvbnRlbnQgZnJvbSB0aGUgcm91dGVzIC0+IHJvdXRlIGFzIGl0IGFzIGFuZCByZXR1cm4gaXQgYXMgYVxuICAgICAqIHJlc3BvbnNlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGRvSGFuZGxlUmVxdWVzdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHBhdGg6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZTogc3RyaW5nKTogSHR0cFJlc3BvbnNlPGFueT5cbiAgICB7XG4gICAgICAgIGxldCByb3V0ZXM6IE1vY2tSb3V0ZVtdID0gdGhpcy5yb3V0ZXNCeUVudGl0eS5nZXQocmVzb3VyY2UpO1xuXG4gICAgICAgIGxldCBtYXRjaGVkUm91dGUgPSByb3V0ZXMuZmluZEluZGV4KChlbDogTW9ja1JvdXRlKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSBlbC5tZXRob2QudG9Mb3dlckNhc2UoKSAmJiBlbC5wYXRoID09PSBwYXRoO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWF0Y2hlZFJvdXRlICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IHJvdXRlOiBNb2NrUm91dGUgPSByb3V0ZXNbbWF0Y2hlZFJvdXRlXTtcblxuICAgICAgICAgICAgbGV0IHBheWxvYWQ6IFJlc3BvbnNlPGFueT4gPSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZDogIHJvdXRlLmRhdGFcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlc3BvbnNlPFJlc3BvbnNlPGFueT4+KHtcbiAgICAgICAgICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcm91dGUucmVzcG9uc2VDb2RlLFxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHJvdXRlLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgICAgICB1cmw6IHJvdXRlLnBhdGhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgSHR0cEhhbmRsZXIgc28gd2UgY2FuIGhhdmUgY3VzdG9tIGJlaGF2aW9yIHRvIEhUVFBDbGllbnRcbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tJbnRlcmNlcHRvckhhbmRsZXIgaW1wbGVtZW50cyBIdHRwSGFuZGxlclxue1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV4dDogSHR0cEhhbmRsZXIsIHByaXZhdGUgaW50ZXJjZXB0b3I6IEh0dHBJbnRlcmNlcHRvcilcbiAgICB7XG4gICAgfVxuXG4gICAgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcmNlcHRvci5pbnRlcmNlcHQocmVxLCB0aGlzLm5leHQpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7TWV0YSwgVGl0bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcbiAgICBBUFBfSU5JVElBTElaRVIsXG4gICAgRXJyb3JIYW5kbGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbmplY3RvcixcbiAgICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICAgIE5nTW9kdWxlLFxuICAgIE9wdGlvbmFsLFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBIVFRQX0lOVEVSQ0VQVE9SUyxcbiAgICBIdHRwQmFja2VuZCxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEh0dHBIYW5kbGVyLFxuICAgIEh0dHBJbnRlcmNlcHRvclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7QXBwQ29uZmlnLCBtYWtlQ29uZmlnfSBmcm9tICcuL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJy4vY29uZmlnL2Vudmlyb25tZW50JztcbmltcG9ydCB7Tm90Rm91bmRDb21wb25lbnR9IGZyb20gJy4vbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQnO1xuaW1wb3J0IHtSb3V0aW5nU2VydmljZX0gZnJvbSAnLi9yb3V0aW5nL3JvdXRpbmcuc2VydmljZSc7XG5pbXBvcnQge0dsb2JhbEVycm9ySGFuZGxlcn0gZnJvbSAnLi9nbG9iYWwtZXJyb3ItaGFuZGxlcic7XG5pbXBvcnQge0FyaWJhQ29yZVJvdXRpbmdNb2R1bGV9IGZyb20gJy4vYXJpYmEtY29yZS1yb3V0aW5nLm1vZHVsZSc7XG5pbXBvcnQge05vdGlmaWNhdGlvbnN9IGZyb20gJy4vbWVzc2FnaW5nL25vdGlmaWNhdGlvbnMuc2VydmljZSc7XG5pbXBvcnQge0h0dHBNb2NrSW50ZXJjZXB0b3IsIE1vY2tJbnRlcmNlcHRvckhhbmRsZXJ9IGZyb20gJy4vaHR0cC9odHRwLW1vY2staW50ZXJjZXB0b3InO1xuaW1wb3J0IHtSZXNvdXJjZX0gZnJvbSAnLi9kb21haW4vcmVzb3VyY2Uuc2VydmljZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGNvbnN0IFVzZXJDb25maWcgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignVXNlckNvbmZpZycpO1xuXG5cbi8qKlxuICogQ29yZSBtb2RlIGluY2x1ZGVzIGFsbCBzaGFyZWQgbG9naWMgYWNjcm9zcyB3aG9sZSBhcHBsaWNhdGlvblxuICovXG4gICAgLy8gdG9kbzogZm9yIEFPVCB1c2UgZXhwb3J0ZWQgZnVuY3Rpb25zIGZvciBmYWN0b3JpZXMgaW5zdGVhZHMgdGhpcyBpbmxpbmUgb25lcy5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIEFyaWJhQ29yZVJvdXRpbmdNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW05vdEZvdW5kQ29tcG9uZW50XSxcblxuICAgIGJvb3RzdHJhcDogW11cblxufSlcbmV4cG9ydCBjbGFzcyBBcmliYUNvcmVNb2R1bGUge1xuXG4gICAgc3RhdGljIGZvclJvb3QoY29uZmlnOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBcmliYUNvcmVNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBUaXRsZSxcbiAgICAgICAgICAgICAgICBNZXRhLFxuICAgICAgICAgICAgICAgIEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIE5vdGlmaWNhdGlvbnMsXG4gICAgICAgICAgICAgICAgSHR0cE1vY2tJbnRlcmNlcHRvcixcblxuICAgICAgICAgICAgICAgIFJlc291cmNlLFxuXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IFVzZXJDb25maWcsIHVzZVZhbHVlOiBjb25maWd9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogQXBwQ29uZmlnLCB1c2VGYWN0b3J5OiBtYWtlQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbVXNlckNvbmZpZywgSW5qZWN0b3IsIEVudmlyb25tZW50XVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBIdHRwSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogbWFrZUh0dHBDbGllbnRIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBIdHRwQmFja2VuZCwgQXBwQ29uZmlnLCBIdHRwTW9ja0ludGVyY2VwdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgW25ldyBPcHRpb25hbCgpLCBuZXcgSW5qZWN0KEhUVFBfSU5URVJDRVBUT1JTKV1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlQ2xhc3M6IEdsb2JhbEVycm9ySGFuZGxlciwgZGVwczogW05vdGlmaWNhdGlvbnNdfSxcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogUm91dGluZ1NlcnZpY2UsIHVzZUNsYXNzOiBSb3V0aW5nU2VydmljZSwgZGVwczogW1JvdXRlcl19XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IEFyaWJhQ29yZU1vZHVsZSwgcHJpdmF0ZSBjb25mOiBBcHBDb25maWcpIHtcblxuICAgIH1cblxufVxuXG5cbi8qKlxuICpcbiAqIEFkZCBjdXN0b20gTW9jayBmdW5jdGlvbmFsaXR5IG9ubHkgYW5kIGlmIHdlIGVuYWJsZWQgdGhpcyBpbiB0aGUgc2V0dGluZ3MuIEkgZG9udCByZWFsbHkgd2FudCB0b1xuICogaGF2ZSBOb29wSW50ZXJjZXB0ZXIgaW4gdGhlIGNoYWluXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZUh0dHBDbGllbnRIYW5kbGVyKG5nQmFja2VuZDogSHR0cEJhY2tlbmQsIGNvbmZpZzogQXBwQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2NrSW50ZXJjZXB0b3I6IEh0dHBNb2NrSW50ZXJjZXB0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVyY2VwdG9yczogSHR0cEludGVyY2VwdG9yW10gfCBudWxsID0gW10pOiBIdHRwSGFuZGxlciB7XG4gICAgaWYgKGNvbmZpZy5nZXRCb29sZWFuKEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlcikpIHtcblxuICAgICAgICBtb2NrSW50ZXJjZXB0b3IubG9hZFJvdXRlcygpO1xuICAgICAgICBpbnRlcmNlcHRvcnMgPSBbLi4uaW50ZXJjZXB0b3JzLCBtb2NrSW50ZXJjZXB0b3JdO1xuICAgIH1cblxuICAgIGlmICghaW50ZXJjZXB0b3JzKSB7XG4gICAgICAgIHJldHVybiBuZ0JhY2tlbmQ7XG4gICAgfVxuICAgIHJldHVybiBpbnRlcmNlcHRvcnMucmVkdWNlUmlnaHQoXG4gICAgICAgIChuZXh0LCBpbnRlcmNlcHRvcikgPT4gbmV3IE1vY2tJbnRlcmNlcHRvckhhbmRsZXIobmV4dCwgaW50ZXJjZXB0b3IpLCBuZ0JhY2tlbmQpO1xufVxuXG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0ICogYXMgb2JqZWN0UGF0aCBmcm9tICdvYmplY3QtcGF0aCc7XG5pbXBvcnQge2lzQmxhbmssIGlzU3RyaW5nLCBpc1N0cmluZ01hcH0gZnJvbSAnLi9sYW5nJztcblxuXG4vKipcbiAqIFRoZSBGaWVsZFBhdGggaXMgdXRpbGl0eSBjbGFzcyBmb3IgcmVwcmVzZW50aW5nIG9mIGEgZG90dGVkIGZpZWxkUGF0aC5cbiAqXG4gKiBBIFN0cmluZyBzdWNoIGFzIFwiZm9vLmJhci5iYXpcIiBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgYSB2YWx1ZSBvbiBhIHRhcmdldCBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRmllbGRQYXRoXG57XG4gICAgX2ZpZWxkUGF0aHM6IHN0cmluZ1tdO1xuICAgIHByaXZhdGUgb2JqZWN0UGF0aEluc3RhbmNlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNldHMgYSB2YWx1ZSB0byB0YXJnZXQgb2JqZWN0c1xuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHNldEZpZWxkVmFsdWUodGFyZ2V0OiBhbnksIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgZnAgPSBuZXcgRmllbGRQYXRoKGZpZWxkKTtcbiAgICAgICAgZnAuc2V0RmllbGRWYWx1ZSh0YXJnZXQsIHZhbHVlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlYWRzIGEgdmFsdWUgZnJvbSB0YXJnZXQgb2JqZWN0c1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRGaWVsZFZhbHVlKHRhcmdldDogYW55LCBmaWVsZDogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICBsZXQgZnAgPSBuZXcgRmllbGRQYXRoKGZpZWxkKTtcbiAgICAgICAgbGV0IHZhbHVlID0gZnAuZ2V0RmllbGRWYWx1ZSh0YXJnZXQpO1xuXG4gICAgICAgIGlmIChmaWVsZCA9PT0gJyR0b1N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYXRoOiBzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLl9maWVsZFBhdGhzID0gaXNCbGFuayhfcGF0aCkgPyBbXSA6IF9wYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgIHRoaXMub2JqZWN0UGF0aEluc3RhbmNlID0gKDxhbnk+b2JqZWN0UGF0aClbJ2NyZWF0ZSddKHtpbmNsdWRlSW5oZXJpdGVkUHJvcHM6IHRydWV9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgT25lIG9mIHRoZSBtYWluIHJlYXNvbiB3aHkgSSBoYXZlIHRoaXMgaXMgbm90IG9ubHkgdG8gaXRlcmF0ZSB0aHJ1IGRvdHRlZCBmaWVsZCBwYXRoIGJ1dFxuICAgICAqIG1haW5seSB0byBiZSBhYmxlIHRvIHNldCBuYXR1cmFsbHkgdmFsdWUgaW50byBhIG5lc3RlZCBtYXBzIGxpa2UgOlxuICAgICAqXG4gICAgICogIGZpZWxkTmFtZS5maWVsZE5hbWVNYXAuZmllbGRLZXkgPT4gaXQgd2lsbCBhY2Nlc3MgZmllbGROYW1lIG9uIHRoZSB0YXJnZXQsIGZyb20gdGhlcmUgaXRcbiAgICAgKiByZWFkcyBGaWVsZE5hbWVNYXAgc2luY2UgZmllbGROYW1lIG5lc3RlZCBvYmplY3RzIGFuZCBzZXRzIGEgbmV3IHZhbHVlIGlkZW50aWZpZWQgYnkgTWFwIGtleVxuICAgICAqIGZpZWxkS2V5XG4gICAgICpcbiAgICAgKiAgYGBgXG4gICAgICogIGNsYXNzIE15Q2xhc3Mge1xuICAgICAqICAgICAgZmllbGROYW1lOk5lc3RlZE9iamVjdFxuICAgICAqXG4gICAgICogIH1cbiAgICAgKlxuICAgICAqICBjbGFzcyBOZXN0ZWRPYmplY3Qge1xuICAgICAqICAgICAgZmllbGROYW1lTWFwOk1hcDxrZXksIHZhbHVlPjtcbiAgICAgKiAgfVxuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqIHVzZSBmaWVsZCB2YWx1ZSBmb3IgYXNzaWdubWVudCBzbyBrZXlzIG9mIGZvcm0gXCJhLmIuY1wiIHdpbGwgZ28gaW4gbmVzdGVkIE1hcHNcbiAgICAgKi9cbiAgICBzZXRGaWVsZFZhbHVlKHRhcmdldDogYW55LCB2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gaW1wbGVtZW50IHRoZSBzYW1lIHRoaW5nIHdoYXQgd2UgaGF2ZSBvbiB0aGUgZ2V0LCBpZiBNYXAgc2V0IGZpZWxkIGludG8gbWFwXG4gICAgICAgIGlmICh0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCA+IDEgJiYgISh0YXJnZXQgaW5zdGFuY2VvZiBNYXApKSB7XG5cbiAgICAgICAgICAgIGxldCBwYXRoID0gdGhpcy5fZmllbGRQYXRocy5zbGljZSgwLCB0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCAtIDEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGxldCBvYmplY3RUb0JlVXBkYXRlZCA9IHRoaXMub2JqZWN0UGF0aEluc3RhbmNlLmdldCh0YXJnZXQsIHBhdGgpO1xuICAgICAgICAgICAgaWYgKG9iamVjdFRvQmVVcGRhdGVkIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VG9CZVVwZGF0ZWQuc2V0KHRoaXMuX2ZpZWxkUGF0aHNbdGhpcy5fZmllbGRQYXRocy5sZW5ndGggLSAxXSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZS5zZXQodGFyZ2V0LCB0aGlzLl9wYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICBsZXQgbWFwVGFyZ2V0OiBNYXA8c3RyaW5nLCBhbnk+ID0gdGFyZ2V0O1xuICAgICAgICAgICAgLy8gaGFuZGxlIE5lc3RlZCBNYXBcbiAgICAgICAgICAgIGlmICh0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IHRoaXMuX2ZpZWxkUGF0aHMuc3BsaWNlKDAsIDEpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5lc3RlZE1hcDogTWFwPHN0cmluZywgYW55PiA9IG1hcFRhcmdldC5nZXQocGF0aFswXSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsobmVzdGVkTWFwKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXN0ZWRNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICAgICAgICAgICAgICBtYXBUYXJnZXQuc2V0KHBhdGhbMF0sIG5lc3RlZE1hcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRWYWx1ZShuZXN0ZWRNYXAsIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldCh0aGlzLl9maWVsZFBhdGhzWzBdLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZS5zZXQodGFyZ2V0LCB0aGlzLl9wYXRoLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSByZWFzb24gYXMgZm9yIFNldEZpZWxkVmFsdWUuIE5lZWQgdG8gYmUgYWJsZSB0byByZWFkIHZhbHVlIGJ5IGRvdHRlZCBwYXRoIGFzIHdlbGxcbiAgICAgKiBhcyByZWFkeSB2YWx1ZSBmcm9tIE1hcHMuXG4gICAgICpcbiAgICAgKiB0b2RvOiB0aGlzIGlzIHF1aWNrIGFuZCBkaXJ0eSBpbXBsZW1lbnRhdGlvbiAtIG5lZWQgdG8gd3JpdGUgYmV0dGVyIHNvbHV0aW9uXG4gICAgICovXG4gICAgZ2V0RmllbGRWYWx1ZSh0YXJnZXQ6IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IHZhbHVlOiBhbnk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZmllbGRQYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKChpc1N0cmluZ01hcCh0YXJnZXQpIHx8IGlzU3RyaW5nKHRhcmdldCkpICYmICEodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5vYmplY3RQYXRoSW5zdGFuY2UuZ2V0KHRhcmdldCwgdGhpcy5fZmllbGRQYXRoc1tpXSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXRNYXAuZ2V0KHRoaXMuX2ZpZWxkUGF0aHNbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBqdXN0IHR3ZWFrIHRvIGJlIGFibGUgdG8gYWNjZXNzIG1hcHMgZmllbGQuc29tZU1hcEZpZWxkLm1hcEtleVxuICAgICAgICAgICAgLy8gSSB3YW50IHRoaXMgdG8gZ2V0IHRoZSBlbGVtZW50IGZyb20gdGhlIG1hcFxuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTWFwICYmIChpICsgMSkgPCB0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBtYXBWYWx1ZSA9IDxNYXA8c3RyaW5nLCBhbnk+PiB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwVmFsdWUuZ2V0KHRoaXMuX2ZpZWxkUGF0aHNbaSArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBnZXQgcGF0aCgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gICAgfVxuXG59XG5cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKi9cbmltcG9ydCB7aXNCbGFua30gZnJvbSAnLi91dGlscy9sYW5nJztcbmltcG9ydCB7QXBwQ29uZmlnfSBmcm9tICcuL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7TWV0YSBhcyBNZXRhVGFncywgVGl0bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogTm90aW9uIG9mIGhhdmluZyBgQXJpYmFBcHBsaWNhdGlvbmAgY2xhc3MgY2FtZSBmcm9tICBhIHNpbXBsZSByZXF1aXJlbWVudCB0aGF0IGV2ZXJ5IHNpbmdsZVxuICogYXBwbGljYXRpb24gbmVlZHMgYSBjb21tb24gd2F5IGhvdyB0byBpbml0aWFsaXplLlxuICpcbiAqIFdlIHdhbnQgdG8gYmUgbW9yZSBhcHBsaWNhdGlvbiBzcGVjaWZpYyB0aGVyZWZvcmUgd2UgZG9uJ3Qgd2FudCB0byBoYXZlIGdlbmVyaWMgbmFtZXMgc3VjaCBhc1xuICogYGFwcC5jb21wb25lbnQgb3IgYXBwLm1vZHVsZWAsIHRoZSByb290IGNvbXBvbmVudCBzaG91bGQgYmUgbmFtZWQgYmFzZWQgb24gd2hhdCBpdCBpcyBkb2luZ1xuICogb3Igd2hhdCBpcyByZWFsIGFwcGxpY2F0aW9uIG5hbWUgZS5nLjogVG9kb0FwcCwgU291cmNpbmdBcHAsIGV0Y3MuIGFuZCB0aGVzZSBhcHBsaWNhdGlvbiB3aWxsXG4gKiBpbmhlcml0IGZyb20gYEFyaWJhQXBwbGljYXRpb25gIHRvIGdldCBzb21lIGNvbW1vbiBiZWhhdmlvci5cbiAqXG4gKiBTcGVjaWZpYyBhcHBsaWNhdGlvbiB0eXBlcyB3aWxsIGV4dGVuZHMgdGhpcyBjbGFzcyB0byBhZGQgbW9yZSBiZWhhdmlvci5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHR5cGVzIG9mIGJvb3RzdHJhcHBpbmcgYW5kIHBhc3NpbmcgZW52aXJvbm1lbnQgcGFyYW1ldGVycyB0byB0aGUgYXBwbGljYXRpb246XG4gKlxuICogLSAgRHVyaW5nIEFyaWJhQ29yZVVJIGltcG9ydDpcbiAqXG4gKiAjIyMgZXhhbXBsZVxuICpcbiAqIGBgYHRzXG4gKiAgICAgIEFyaWJhQ29yZU1vZHVsZS5mb3JSb290KHtcbiAqICAgICAgICAgICAgICAgICAgJ2FwcC50aXRsZSc6ICdQbGF5Z3JvdW5kIEFwcGxpY2F0aW9uJyxcbiAqICAgICAgICAgICAgICAgICAgJ2Fzc2V0LWZvbGRlcic6ICdwbGF5Z3JvdW5kL2Fzc2V0cycsXG4gKiAgICAgICAgICAgICAgICAgICdtZXRhdWkucnVsZXMuZmlsZS1uYW1lcyc6IFsnQXBwbGljYXRpb24nLCAnTGF5b3V0J10sXG4gKiAgICAgICAgICAgICAgICAgICdyZXN0YXBpLmNvbnRleHQnOiAnL215U2VydmljZS8nLFxuICogICAgICAgICAgICAgICAgICAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5lbmFibGVkJzogdHJ1ZSxcbiAqICAgICAgICAgICAgICAgICAgJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIucm91dGVzJzogWyd1c2VycyddLFxuICogICAgICAgICAgICAgIH0pLFxuICpcbiAqIGBgYFxuICogIFVzZSB0aGlzIHRvIHBhc3Mgc29tZSBzdGF0aWMgcHJvcGVydGllcy5cbiAqXG4gKlxuICogLSAgRnJvbSBBcmliYUFwcGxpY2F0aW9uIDpcbiAqXG4gKiAgV2hlbiB5b3UgaGF2ZSBzcGVjaWZpYyB0eXBlIG9mIGFwcGxpY2F0aW9ucyB0aGF0IG5lZWRzIG1vcmUgc2V0dGluZ3MgeW91IGluaGVyaXQgZnJvbSB0aGlzXG4gKiAgY2xhc3MgdG8gZXh0ZW5kIGl0cyBiZWhhdmlvciBhbmQgdGhlbiB1c2UgaXQgZm9yIHlvdXIgYXBwbGljYXRpb25zIHRvIHNoYXJlIGNvbW1vbiBiZWhhdmlvclxuICpcbiAqICMjIyBleGFtcGxlXG4gKlxuICogIGBgYHRzXG4gKlxuICogICAgIGV4cG9ydCBjbGFzcyBGYWNlYm9va0FwcGxpY2F0aW9uIGV4dGVuZHMgQXJpYmFBcHBsaWNhdGlvbiB7XG4gKlxuICogICAgICAgICBwcm90ZWN0ZWQgYXBwSWQ6IHN0cmluZyA9ICcuLi4uLic7XG4gKlxuICpcbiAqICAgICAgICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCk6IHZvaWRcbiAqICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gKlxuICogICAgICAgICAgICAgIHRoaXMuYXBwSWQgPSByZWFkQXBwSWRmcm9tRW52KCk7XG4gKlxuICogICAgICAgICAgICAgIHRoaXMuYXBwQ29uZmlnLnNldCgnZmFjZWJvb2suYXBwSWQnLCB0aGlzLmFwcElkICk7XG4gKlxuICogICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJGQkF1dGhlbnRpY2F0b3IoKTtcbiAqXG4gKiAgICAgICAgICB9XG4gKlxuICogICAgIH1cbiAqXG4gKiAgYGBgXG4gKiAgT25jZSB5b3UgZGVmaW5lZCB5b3VyIHR5cGUgb2YgYXBwbGljYXRpb24sIHRoZW4geW91IGNhbiBzdGFydCBjcmVhdGluZyBhcHBsaWNhdGlvbnMgdGhhdCBpbmhlcml0XG4gKiAgZnJvbSB0aGlzIGBGYWNlYm9va0FwcGxpY2F0aW9uYC4gUm9vdCBBcHAgY29tcG9uZW50XG4gKlxuICpcbiAqIGBgYHRzXG4gKiAgICAgIEBDb21wb25lbnQoey4uLn0pXG4gKiAgICAgIGV4cG9ydCBQaWN0dXJlQXBwQ29tcG9uZW50IGV4dGVuZHMgRmFjZWJvb2tBcHBsaWNhdGlvbiB7XG4gKiAgICAgICAgICAgICAuLi5cbiAqXG4gKiAgICAgIH1cbiAqXG4gKlxuICpcbiAqICAgICBATmdNb2R1bGUoeyBib290c3RyYXA6IFtQaWN0dXJlQXBwQ29tcG9uZW50XSB9KVxuICogICAgIGV4cG9ydCBjbGFzcyBQaWN0dXJlQXBwTW9kdWxlIHtcbiAqXG4gKiAgICAgfVxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBBcmliYUFwcGxpY2F0aW9uIGltcGxlbWVudHMgT25Jbml0XG57XG5cbiAgICAvKipcbiAgICAgKiBUaXRsZSBzZXJ2aWNlIGZvciBzZXR0aW5nIHBhZ2UgdGl0bGVcbiAgICAgKi9cbiAgICB0aXRsZTogVGl0bGU7XG5cblxuICAgIC8qKlxuICAgICAqIE1ldGEgc2VydmljZSBmb3IgYWRkaW5nIGFuZCB1cGRhdGluZyBwYWdlIG1ldGEgdGFnc1xuICAgICAqL1xuICAgIG1ldGFUYWdzOiBNZXRhVGFncztcblxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFwcENvbmZpZzogQXBwQ29uZmlnKVxuICAgIHtcbiAgICAgICAgdGhpcy5tZXRhVGFncyA9IHRoaXMuYXBwQ29uZmlnLmluamVjdG9yLmdldChNZXRhVGFncyk7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLmFwcENvbmZpZy5pbmplY3Rvci5nZXQoVGl0bGUpO1xuXG5cbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgZGVmYXVsdCBiZWhhdmlvciBqdXN0IHNldHMgYSB0aXRsZSBmb3IgdGhlIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHRpdGxlOiBzdHJpbmcgPSB0aGlzLmFwcENvbmZpZy5nZXQoQXBwQ29uZmlnLkFwcFRpdGxlKTtcbiAgICAgICAgaWYgKGlzQmxhbmsodGl0bGUpKSB7XG4gICAgICAgICAgICB0aXRsZSA9ICdBcmliYSBBcHBsaWNhdGlvbic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aXRsZS5zZXRUaXRsZSh0aXRsZSk7XG5cbiAgICB9XG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX3ZhbHVlcyIsIkNvbGxlY3Rpb25zLmFycmF5cyIsIkluamVjdGlvblRva2VuIiwiaXNEZXZNb2RlIiwiRXZlbnRFbWl0dGVyIiwiSW5qZWN0YWJsZSIsInRzbGliXzEuX19leHRlbmRzIiwiaHR0cCIsIm1hcCIsIkh0dHBDbGllbnQiLCJDb21wb25lbnQiLCJyb3V0ZXIiLCJTdWJqZWN0IiwiTmF2aWdhdGlvbkVuZCIsIk5hdmlnYXRpb25TdGFydCIsIlJvdXRlciIsImZpbHRlciIsIkVycm9ySGFuZGxlciIsIk5nTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwib2JzZXJ2YWJsZU9mIiwiSHR0cEVycm9yUmVzcG9uc2UiLCJvYnNlcnZhYmxlVGhyb3dFcnJvciIsIkh0dHBSZXF1ZXN0IiwiSHR0cFJlc3BvbnNlIiwiVGl0bGUiLCJNZXRhIiwiSW5qZWN0b3IiLCJIdHRwSGFuZGxlciIsIkh0dHBCYWNrZW5kIiwiT3B0aW9uYWwiLCJJbmplY3QiLCJIVFRQX0lOVEVSQ0VQVE9SUyIsIkNvbW1vbk1vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiLCJTa2lwU2VsZiIsIigob2JqZWN0UGF0aCkpWydjcmVhdGUnXSIsIk1ldGFUYWdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FB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