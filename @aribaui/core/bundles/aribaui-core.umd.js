(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('big-integer'), require('typescript-collections'), require('@angular/core'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/router'), require('rxjs'), require('@angular/platform-browser'), require('@angular/common'), require('object-path')) :
    typeof define === 'function' && define.amd ? define('@aribaui/core', ['exports', 'big-integer', 'typescript-collections', '@angular/core', 'rxjs/operators', '@angular/common/http', '@angular/router', 'rxjs', '@angular/platform-browser', '@angular/common', 'object-path'], factory) :
    (factory((global.aribaui = global.aribaui || {}, global.aribaui.core = {}),global.bigIntImported,global.Collections,global.ng.core,global.rxjs.operators,global.ng.common.http,global.ng.router,global.rxjs,global.ng.platformBrowser,global.ng.common,global.objectPath));
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
    /** @type {?} */
    var STRING_MAP_PROTO = Object.getPrototypeOf({});
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
    function className(clazz) {
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
    function crc32(crc, anInt) {
        /** @type {?} */
        var table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
        /** @type {?} */
        var x = 0;
        /** @type {?} */
        var y = 0;
        for (var i = 0; i < 4; i++) {
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
    /** @type {?} */
    var _symbolIterator = null;
    /**
     * @return {?}
     */
    function getSymbolIterator() {
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
                        ((Map)).prototype[key] === Map.prototype['entries']) {
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
    function evalExpression(expr, declarations, lets) {
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
        var fn = new (Function.bind.apply(Function, __spread([void 0], fnArgNames.concat(fnBody))))();
        assert(isPresent(fn), 'Cannot evaluate expression. FN is not defined');
        /** @type {?} */
        var fnBound = fn.bind(thisContext);
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
            for (var i = 0, c = buf.length; i < c; i++) {
                /** @type {?} */
                var ch = buf[i];
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var _clearValues = (function () {
        if ((((new Map()).keys())).next) {
            return function _clearValuesInner(m) {
                /** @type {?} */
                var keyIterator = m.keys();
                /** @type {?} */
                var k;
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
                /** @type {?} */
                var map = new Map();
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
                /** @type {?} */
                var result = new Map();
                for (var key in stringMap) {
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
                /** @type {?} */
                var result = new Map();
                for (var key in stringMap) {
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
                /** @type {?} */
                var result = new Map();
                for (var key in stringMap) {
                    /** @type {?} */
                    var updatedValue = resolve(key, stringMap[key]);
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
                /** @type {?} */
                var r = {};
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
                /** @type {?} */
                var r = {};
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
                /** @type {?} */
                var sj = new StringJoiner(['']);
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
                /** @type {?} */
                var keys = Array.from(source.keys());
                try {
                    for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                        var key = keys_1_1.value;
                        /** @type {?} */
                        var sourceValue = source.get(key);
                        /** @type {?} */
                        var destValue = dest.get(key);
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
                                /** @type {?} */
                                var sourceVect = ListWrapper.clone(sourceValue);
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
                            /** @type {?} */
                            var destValueMap = MapWrapper.clone(destValue);
                            if (isBlank(destValueMap.get(sourceValue))) {
                                destValue.set(sourceValue, MapWrapper.createEmpty());
                            }
                        }
                        else if (isString(destValue) && sourceValue instanceof Map) {
                            /** @type {?} */
                            var sourceHash = MapWrapper.clone(sourceValue);
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
                            /** @type {?} */
                            var sourceVect = ListWrapper.clone(sourceValue);
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
                            /** @type {?} */
                            var destClass = className(destValue);
                            /** @type {?} */
                            var sourceClass = className(sourceValue);
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
                /** @type {?} */
                var map = new Map();
                for (var i = 0; i < keys.length; i++) {
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
                /** @type {?} */
                var result = items.reduce(function (groupResult, currentValue) {
                    /** @type {?} */
                    var gKey = groupByKey(currentValue);
                    (groupResult[gKey] = groupResult[gKey] || []).push(currentValue);
                    return groupResult;
                }, {});
                /** @type {?} */
                var grouped = new Map();
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
                for (var prop in map) {
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
                /** @type {?} */
                var m = {};
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
                /** @type {?} */
                var k1 = Object.keys(m1);
                /** @type {?} */
                var k2 = Object.keys(m2);
                if (k1.length !== k2.length) {
                    return false;
                }
                /** @type {?} */
                var key;
                for (var i = 0; i < k1.length; i++) {
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
                for (var i = 0; i < array.length; i++) {
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
                /** @type {?} */
                var index = list.findIndex(function (el) {
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
                /** @type {?} */
                var index = list.findIndex(function (el) {
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
                /** @type {?} */
                var a = ListWrapper.clone(array);
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
                /** @type {?} */
                var res = list[index];
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
                for (var i = 0; i < items.length; ++i) {
                    /** @type {?} */
                    var index = list.indexOf(items[i]);
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
                /** @type {?} */
                var index = list.indexOf(el);
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
                for (var i = 0; i < a.length; ++i) {
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
                    /** @type {?} */
                    var indexA = pattern.indexOf(a) === -1 ? 10 : pattern.indexOf(a);
                    /** @type {?} */
                    var indexB = pattern.indexOf(b) === -1 ? 10 : pattern.indexOf(b);
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
                /** @type {?} */
                var out = '';
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
                /** @type {?} */
                var solution = null;
                /** @type {?} */
                var maxValue = -Infinity;
                for (var index = 0; index < list.length; index++) {
                    /** @type {?} */
                    var candidate = list[index];
                    if (isBlank(candidate)) {
                        continue;
                    }
                    /** @type {?} */
                    var candidateValue = predicate(candidate);
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
                /** @type {?} */
                var target = [];
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
                /** @type {?} */
                var target = ListWrapper.flatten(list);
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
                for (var i = 0; i < source.length; i++) {
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
                /** @type {?} */
                var contains = Collections.arrays.contains(list, element, function (item1, item2) {
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
                        /** @type {?} */
                        var contains = Collections.arrays.contains(list, elem, function (item1, item2) {
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
            for (var i = 0; i < source.length; i++) {
                /** @type {?} */
                var item = source[i];
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
        /** @type {?} */
        var iterator1 = a[getSymbolIterator()]();
        /** @type {?} */
        var iterator2 = b[getSymbolIterator()]();
        while (true) {
            /** @type {?} */
            var item1 = iterator1.next();
            /** @type {?} */
            var item2 = iterator2.next();
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
            for (var i = 0; i < obj.length; i++) {
                fn(obj[i]);
            }
        }
        else {
            /** @type {?} */
            var iterator = obj[getSymbolIterator()]();
            /** @type {?} */
            var item = void 0;
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
        for (var i = arr.length - 1; i >= 0; i--) {
            if (condition(arr[i])) {
                return arr[i];
            }
        }
        return null;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Since on enterprise level we need to support all available locales as user might change
     * to different lang anytime we need to import all expected locales that we want to support.
     *
     * Note:  Remember when you want to support more locales you need to import them and register
     * them using registerLocaleData
      @type {?} */
    var AppConfigToken = new core.InjectionToken('App.Config');
    /** @type {?} */
    var SuportedLanguages = ['en', 'fr'];
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
                    /** @type {?} */
                    var values = MapWrapper.createFromStringMap(config);
                    values.forEach(function (v, k) { return _this.set(k, v); });
                }
                this.environment.setValue(AppConfig.AssetFolder, this.get(AppConfig.AssetFolder));
                /** @type {?} */
                var location = window.location.pathname + window.location.search;
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
                /** @type {?} */
                var globalConfig = readGlobalParam(AppConfig.AppConfigGlobalVar);
                if (isPresent(globalConfig)) {
                    for (var key in globalConfig) {
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
                /** @type {?} */
                var val = this.get(key);
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
                /** @type {?} */
                var val = this.get(key);
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
                /** @type {?} */
                var nestedFlag = isNested ? '$' : '';
                /** @type {?} */
                var withEntity = AppConfig.RestApiContextUrl + "." + nestedFlag + entity;
                /** @type {?} */
                var url = this.get(withEntity) || this.get(AppConfig.RestApiContextUrl);
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
                /** @type {?} */
                var isMocked = this.getBoolean(AppConfig.ConnectionUseMockServer);
                /** @type {?} */
                var cnx = this.getRestApiContext();
                /** @type {?} */
                var host = this.getRestApiHost() || '';
                if (isMocked) {
                    /** @type {?} */
                    var prefix = this.get(AppConfig.AssetFolder);
                    return "" + prefix + (cnx || '/');
                }
                /** @type {?} */
                var url = "" + host + (cnx || '/');
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
                /** @type {?} */
                var promise = new Promise(function (resolve) {
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
        /** @type {?} */
        var conf = new AppConfig(injector, env);
        conf.init(config);
        return conf;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var stack = this.stacksVariables.get(key) || [];
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
                /** @type {?} */
                var stack = this.stacksVariables.get(key) || [];
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
                /** @type {?} */
                var stack = this.stacksVariables.get(key) || [];
                stack.push(value);
                this.stacksVariables.set(key, stack);
            };
        Environment.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Environment.ctorParameters = function () { return []; };
        return Environment;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    RestSegmentType[RestSegmentType.Host] = 'Host';
    RestSegmentType[RestSegmentType.Context] = 'Context';
    RestSegmentType[RestSegmentType.Action] = 'Action';
    RestSegmentType[RestSegmentType.Resource] = 'Resource';
    RestSegmentType[RestSegmentType.Identifier] = 'Identifier';
    RestSegmentType[RestSegmentType.OfParent] = 'OfParent';
    /** @enum {number} */
    var RestAction = {
        Load: 0,
        Query: 1,
        Save: 2,
        Do: 3,
    };
    RestAction[RestAction.Load] = 'Load';
    RestAction[RestAction.Query] = 'Query';
    RestAction[RestAction.Save] = 'Save';
    RestAction[RestAction.Do] = 'Do';
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var sortedSegments = this.adjustRank(this.urlGroup.segments);
                /** @type {?} */
                var url = new StringJoiner();
                for (var i = 1; i < sortedSegments.length; i++) {
                    switch (sortedSegments[i].type) {
                        case RestSegmentType.Action:
                        case RestSegmentType.OfParent:
                            break;
                        case RestSegmentType.Resource:
                            /** @type {?} */
                            var resSegment = (sortedSegments[i]);
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
                /** @type {?} */
                var action = (this.urlGroup.lookup(RestSegmentType.Action));
                switch (action.actionType) {
                    case RestAction.Save:
                    case RestAction.Do:
                        /** @type {?} */
                        var withIdCount = this.urlGroup.count(RestSegmentType.Identifier);
                        /** @type {?} */
                        var of = this.urlGroup.lookup(RestSegmentType.OfParent);
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
                /** @type {?} */
                var ofIndex = segments
                    .findIndex(function (s) { return s.type === RestSegmentType.OfParent; });
                if (ofIndex !== -1) {
                    /** @type {?} */
                    var of = segments[ofIndex];
                    /** @type {?} */
                    var segment = void 0;
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var urlSegment = this.lookup(segmentType);
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
                /** @type {?} */
                var ss = __spread(this.segments);
                ss = ss.reverse();
                return ss.find((function (s) {
                    /** @type {?} */
                    var hasMatch = s.type === segment;
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
                /** @type {?} */
                var segments = this.segments.filter(function (s) { return segment === s.type; });
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var urlSegment = this.urlGroup.lookup(RestSegmentType.Action);
                /** @type {?} */
                var isSave = ((urlSegment)).actionType === RestAction.Save;
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
                /** @type {?} */
                var segment = (this.urlGroup.lookup(RestSegmentType.Action));
                assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
                /** @type {?} */
                var observable;
                /** @type {?} */
                var actionType = segment.value;
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
                /** @type {?} */
                var segment = (this.urlGroup.lookup(RestSegmentType.Action));
                assert(isPresent(segment), 'Missing Http method. Not sure how to handle this!');
                /** @type {?} */
                var observable;
                /** @type {?} */
                var actionType = segment.value;
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
                /** @type {?} */
                var hasProgress = options.reportProgress || false;
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
                    /** @type {?} */
                    var isMocked = this.appConfig.getBoolean(AppConfig.ConnectionUseMockServer);
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
                /** @type {?} */
                var sgm = (this.urlGroup.lookup(RestSegmentType.Resource));
                if (isComposite) {
                    return this.deserialize(((res)).payload, sgm.value);
                }
                else {
                    /** @type {?} */
                    var httpRes = (res);
                    /** @type {?} */
                    var myResp = {
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
                    /** @type {?} */
                    var instances = [];
                    for (var item in json) {
                        instances.push(this.deserialize(json[item], clazz));
                    }
                    return instances;
                }
                else {
                    /** @type {?} */
                    var instance = void 0;
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
                        /** @type {?} */
                        var types = instance.getTypes();
                        for (var prop in json) {
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
            { type: core.Injectable }
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    }] }
        ];
        /** @nocollapse */
        NotFoundComponent.ctorParameters = function () { return []; };
        return NotFoundComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    /** @type {?} */
                    var url = event.url;
                    if (this.stateCacheHistory.has(url)) {
                        this.stateCache.next(this.stateCacheHistory.get(url));
                        this.stateCacheHistory.delete(url);
                    }
                    this.routingState.push(event);
                }
                if (event instanceof router.NavigationStart) {
                    /** @type {?} */
                    var itemBeforeRoute = ListWrapper.last(this.routingState);
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
                /** @type {?} */
                var steps = -1;
                /** @type {?} */
                var navigateUrl = '/404';
                while (steps !== numOfSteps) {
                    /** @type {?} */
                    var popState = this.routingState.pop();
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
                /** @type {?} */
                var operation = route.snapshot.params['o'];
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
                /** @type {?} */
                var nextRoute;
                /** @type {?} */
                var normalizedPath = activatedPath.indexOf('/') === 0 ? activatedPath.substring(1) :
                    activatedPath;
                /** @type {?} */
                var currentRoute = this.router.config.find(function (r) {
                    /** @type {?} */
                    var routePath = r.path.indexOf('/') === 0 ? r.path.substring(1) :
                        r.path;
                    return isPresent(normalizedPath) && normalizedPath === routePath;
                });
                // try to match the path and expected pageName
                if (isPresent(pathName) && isPresent(currentRoute) && currentRoute.children.length > 0) {
                    nextRoute = currentRoute.children.find(function (r) {
                        /** @type {?} */
                        var componentName = r.component.prototype.constructor.name;
                        return pathName === r.path && pageName === componentName;
                    });
                }
                else if (isPresent(pageName)) {
                    nextRoute = this.router.config.find(function (r) {
                        /** @type {?} */
                        var componentName = r.component.prototype.constructor.name;
                        return pathName === r.path && pageName === componentName;
                    });
                }
                // path not found then check only if we find anywhere in the path pageNae
                if (isBlank(nextRoute)) {
                    this.router.config.forEach(function (r) {
                        if (isPresent(r.component)) {
                            /** @type {?} */
                            var componentName = r.component.prototype.constructor.name;
                            if (pageName === componentName) {
                                nextRoute = r;
                            }
                        }
                    });
                }
                return nextRoute;
            };
        RoutingService.decorators = [
            { type: core.Injectable }
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var toAll = Notifications.AllTopics;
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
                /** @type {?} */
                var msg = { topic: topic, content: message };
                this.events.next(msg);
            };
        /**
         * When this is used as a topic subscriber receives all messages
         *
         */
        Notifications.AllTopics = '*';
        Notifications.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Notifications.ctorParameters = function () { return []; };
        return Notifications;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            { type: core.Injectable }
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var routes = [
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
                    },] }
        ];
        return AribaCoreRoutingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var mockedResp = this.makeRes(req);
                if (isPresent(mockedResp)) {
                    if (mockedResp.status >= 200 && mockedResp.status < 300) {
                        return rxjs.of(/** @type {?} */ (mockedResp));
                    }
                    else {
                        /** @type {?} */
                        var errror = new http.HttpErrorResponse({
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
                /** @type {?} */
                var routes = this.appConfig.get(AppConfig.ConnectionMockServerRoutes);
                try {
                    for (var routes_1 = __values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
                        var routeName = routes_1_1.value;
                        /** @type {?} */
                        var req = this.makeReq(routeName);
                        /** @type {?} */
                        var mocked = this.requestForRoutes(req);
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
                /** @type {?} */
                var xmlHttpReq = new XMLHttpRequest();
                xmlHttpReq.open(req.method, req.urlWithParams, false);
                req.headers.keys().forEach(function (key) {
                    /** @type {?} */
                    var all = req.headers.getAll(key);
                    xmlHttpReq.setRequestHeader(name, all.join(','));
                });
                xmlHttpReq.setRequestHeader('Accept', 'application/json, text/plain, */*');
                xmlHttpReq.send(null);
                /** @type {?} */
                var body = isBlank(xmlHttpReq.response) ? xmlHttpReq.responseText :
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
                /** @type {?} */
                var assetFolder = this.appConfig.get(AppConfig.AssetFolder);
                /** @type {?} */
                var path = this.appConfig.get(AppConfig.ConnectionMockServerPath);
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
                /** @type {?} */
                var responseOp;
                /** @type {?} */
                var path = req.urlWithParams.substring(req.url.indexOf('mocked') + 6);
                /** @type {?} */
                var resource = path.substring(1);
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
                /** @type {?} */
                var routes = this.routesByEntity.get(resource);
                /** @type {?} */
                var matchedRoute = routes.findIndex(function (el) {
                    return req.method.toLowerCase() === el.method.toLowerCase() && el.path === path;
                });
                if (matchedRoute !== -1) {
                    /** @type {?} */
                    var route = routes[matchedRoute];
                    /** @type {?} */
                    var payload = {
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
            { type: core.Injectable }
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var UserConfig = new core.InjectionToken('UserConfig');
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
                    },] }
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var fp = new FieldPath(field);
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
                /** @type {?} */
                var fp = new FieldPath(field);
                /** @type {?} */
                var value = fp.getFieldValue(target);
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
                    /** @type {?} */
                    var path = this._fieldPaths.slice(0, this._fieldPaths.length - 1).join('.');
                    /** @type {?} */
                    var objectToBeUpdated = this.objectPathInstance.get(target, path);
                    if (objectToBeUpdated instanceof Map) {
                        objectToBeUpdated.set(this._fieldPaths[this._fieldPaths.length - 1], value);
                    }
                    else {
                        this.objectPathInstance.set(target, this._path, value);
                    }
                }
                if (target instanceof Map) {
                    /** @type {?} */
                    var mapTarget = target;
                    // handle Nested Map
                    if (this._fieldPaths.length > 1) {
                        /** @type {?} */
                        var path = this._fieldPaths.splice(0, 1);
                        /** @type {?} */
                        var nestedMap = mapTarget.get(path[0]);
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
                /** @type {?} */
                var value;
                for (var i = 0; i < this._fieldPaths.length; i++) {
                    if ((isStringMap(target) || isString(target)) && !(target instanceof Map)) {
                        value = this.objectPathInstance.get(target, this._fieldPaths[i]);
                        target = value;
                    }
                    else if (target instanceof Map) {
                        /** @type {?} */
                        var targetMap = target;
                        value = targetMap.get(this._fieldPaths[i]);
                    }
                    // just tweak to be able to access maps field.someMapField.mapKey
                    // I want this to get the element from the map
                    if (value instanceof Map && (i + 1) < this._fieldPaths.length) {
                        /** @type {?} */
                        var mapValue = (value);
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                /** @type {?} */
                var title = this.appConfig.get(AppConfig.AppTitle);
                if (isBlank(title)) {
                    title = 'Ariba Application';
                }
                this.title.setTitle(title);
            };
        return AribaApplication;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmF1aS1jb3JlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL0BhcmliYXVpL2NvcmUvdXRpbHMvbGFuZy50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS91dGlscy9jb2xsZWN0aW9uLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2NvbmZpZy9hcHAtY29uZmlnLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2NvbmZpZy9lbnZpcm9ubWVudC50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9kb21haW4vZG9tYWluLW1vZGVsLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2RvbWFpbi91cmwvc2VnbWVudC50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9kb21haW4vdXJsL2J1aWxkZXIudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZG9tYWluL3VybC91cmwtZ3JvdXAudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvZG9tYWluL3Jlc291cmNlLnNlcnZpY2UudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvcm91dGluZy9yb3V0aW5nLnNlcnZpY2UudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvbWVzc2FnaW5nL25vdGlmaWNhdGlvbnMuc2VydmljZS50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9nbG9iYWwtZXJyb3ItaGFuZGxlci50cyIsIm5nOi8vQGFyaWJhdWkvY29yZS9hcmliYS1jb3JlLXJvdXRpbmcubW9kdWxlLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2h0dHAvaHR0cC1tb2NrLWludGVyY2VwdG9yLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL2FyaWJhLmNvcmUubW9kdWxlLnRzIiwibmc6Ly9AYXJpYmF1aS9jb3JlL3V0aWxzL2ZpZWxkLXBhdGgudHMiLCJuZzovL0BhcmliYXVpL2NvcmUvYXJpYmEtYXBwbGljYXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCIvKipcbiAqXG4gKiBAb3JpZ2luYWwtbGljZW5zZVxuICpcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKlxuICpcbiAqXG4gKiAgQ3JlZGl0OiBEZXJpdmVkIGFuZCBleHRlbmRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIgaW4gb3JkZXIgdG8gaGF2ZSBzZXQgb2ZcbiAqICByZXVzYWJsZSBnbG9iYWxzLiBTaW5jZSBpdHMgbm90IGV4cG9ydGVkIEFQSSBuZWVkIHRvIGhhdmUgYSBjb3B5IHVuZGVyIGNvcmUuXG4gKi9cbmltcG9ydCAqIGFzIGJpZ0ludEltcG9ydGVkIGZyb20gJ2JpZy1pbnRlZ2VyJztcblxuY29uc3QgYmlnSW50ID0gYmlnSW50SW1wb3J0ZWQ7XG5cbi8qKlxuICogIFNldCBvZiByZXVzYWJsZSBnbG9iYWxzLiBUaGlzIGlzIHRha2VuIGZyb20gdGhlIEFuZ3VsYXIgMiBzaW5jZSBpdHMgbm90IGV4cG9ydGVkIEFQSS4gQW5kIHRoZXJlXG4gKiAgaXMgYSBuZWVkIGZvciBzdWNoIGNvbW1vbiBmdW5jdGlvbnMgYW5kIHdyYXBwZXJzXG4gKlxuICovXG5cbmNvbnN0IF9fd2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93O1xuY29uc3QgX2dsb2JhbDogeyBbbmFtZTogc3RyaW5nXTogYW55IH0gPSBfX3dpbmRvdztcblxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEdsb2JhbFBhcmFtKHZhck5hbWU6IGFueSk6IHsgW25hbWU6IHN0cmluZ106IGFueSB9XG57XG4gICAgcmV0dXJuIF9nbG9iYWxbdmFyTmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkR2xvYmFsVHlwZSh2YXJOYW1lOiBhbnkpOiBhbnlcbntcbiAgICByZXR1cm4gX2dsb2JhbFt2YXJOYW1lXTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcodHlwZTogYW55KTogc3RyaW5nXG57XG4gICAgaWYgKHR5cGVbJ25hbWUnXSkge1xuICAgICAgICByZXR1cm4gdHlwZVsnbmFtZSddO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmltcGxlbWVudGVkKCk6IGFueVxue1xuICAgIHRocm93IG5ldyBFcnJvcigndW5pbXBsZW1lbnRlZCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmVzZW50KG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4ob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKG9iajogYW55KTogb2JqIGlzIHN0cmluZ1xue1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1R5cGUob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24ob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nTWFwKG9iajogYW55KTogb2JqIGlzIE9iamVjdFxue1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGw7XG59XG5cbmNvbnN0IFNUUklOR19NQVBfUFJPVE8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoe30pO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpY3RTdHJpbmdNYXAob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIGlzU3RyaW5nTWFwKG9iaikgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT09IFNUUklOR19NQVBfUFJPVE87XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2Uob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgLy8gYWxsb3cgYW55IFByb21pc2UvQSsgY29tcGxpYW50IHRoZW5hYmxlLlxuICAgIC8vIEl0J3MgdXAgdG8gdGhlIGNhbGxlciB0byBlbnN1cmUgdGhhdCBvYmoudGhlbiBjb25mb3JtcyB0byB0aGUgc3BlY1xuICAgIHJldHVybiBpc1ByZXNlbnQob2JqKSAmJiBpc0Z1bmN0aW9uKG9iai50aGVuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZShvYmo6IGFueSk6IG9iaiBpcyBEYXRlXG57XG4gICAgcmV0dXJuIChvYmogaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihvYmoudmFsdWVPZigpKSkgfHxcbiAgICAgICAgKGlzUHJlc2VudChvYmopICYmIGlzRnVuY3Rpb24ob2JqLm5vdykpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpc3RMaWtlSXRlcmFibGUob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgaWYgKCFpc0pzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopIHx8XG4gICAgICAgICghKG9iaiBpbnN0YW5jZW9mIE1hcCkgJiYgICAgICAvLyBKUyBNYXAgYXJlIGl0ZXJhYmxlcyBidXQgcmV0dXJuIGVudHJpZXMgYXMgW2ssIHZdXG4gICAgICAgICAgICBnZXRTeW1ib2xJdGVyYXRvcigpIGluIG9iaik7ICAvLyBKUyBJdGVyYWJsZSBoYXZlIGEgU3ltYm9sLml0ZXJhdG9yIHByb3Bcbn1cblxuXG4vKipcbiAqIENoZWNrcyBpZiBgb2JqYCBpcyBhIHdpbmRvdyBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNXaW5kb3cob2JqOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIG9iaiAmJiBvYmoud2luZG93ID09PSBvYmo7XG59XG5cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgdmFsdWUgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24gb2JqZWN0LlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVnRXhwKHZhbHVlOiBhbnkpOiBib29sZWFuXG57XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKClcbntcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2hpZnRMZWZ0KGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyXG57XG4gICAgcmV0dXJuIGJpZ0ludChhKS5zaGlmdExlZnQoYikudmFsdWVPZigpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaGlmdFJpZ2h0KGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyXG57XG4gICAgcmV0dXJuIGJpZ0ludChhKS5zaGlmdFJpZ2h0KGIpLnZhbHVlT2YoKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KHRva2VuOiBhbnkpOiBzdHJpbmdcbntcbiAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRva2VuID09PSB1bmRlZmluZWQgfHwgdG9rZW4gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnICsgdG9rZW47XG4gICAgfVxuXG4gICAgaWYgKHRva2VuLm92ZXJyaWRkZW5OYW1lKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi5vdmVycmlkZGVuTmFtZTtcbiAgICB9XG4gICAgaWYgKHRva2VuLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuLm5hbWU7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IHRva2VuLnRvU3RyaW5nKCk7XG4gICAgbGV0IG5ld0xpbmVJbmRleCA9IHJlcy5pbmRleE9mKCdcXG4nKTtcbiAgICByZXR1cm4gKG5ld0xpbmVJbmRleCA9PT0gLTEpID8gcmVzIDogcmVzLnN1YnN0cmluZygwLCBuZXdMaW5lSW5kZXgpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc05hbWUoY2xheno6IGFueSk6IHN0cmluZ1xue1xuICAgIGlmIChpc1ByZXNlbnQoY2xhenouY29uc3RydWN0b3IpKSB7XG4gICAgICAgIGxldCBjbGFzc04gPSBjbGF6ei5jb25zdHJ1Y3Rvci50b1N0cmluZygpO1xuICAgICAgICBjbGFzc04gPSBjbGFzc04uc3Vic3RyKCdmdW5jdGlvbiAnLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBjbGFzc04uc3Vic3RyKDAsIGNsYXNzTi5pbmRleE9mKCcoJykpO1xuICAgIH1cbiAgICByZXR1cm4gY2xheno7XG59XG5cblxuLyoqXG4gKiAgU291cmNlOiBodHRwczovL3d3dy50eXBlc2NyaXB0bGFuZy5vcmcvZG9jcy9oYW5kYm9vay9taXhpbnMuaHRtbFxuICpcbiAqICBGdW5jdGlvbiB0aGF0IGNvcGllcyBwcm9wZXJ0aWVzIG9mIHRoZSBiYXNlQ3RvcnMgdG8gZGVyaXZlZEN0b3IuXG4gKiAgQ2FuIGJlIHVzZWQgdG8gYWNoaWV2ZSBtdWx0aXBsZSBpbmhlcml0YW5jZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5TWl4aW5zKGRlcml2ZWRDdG9yOiBhbnksIGJhc2VDdG9yczogYW55W10pXG57XG4gICAgYmFzZUN0b3JzLmZvckVhY2goYmFzZUN0b3IgPT5cbiAgICB7XG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaChuYW1lID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlcml2ZWRDdG9yLnByb3RvdHlwZVtuYW1lXVxuICAgICAgICAgICAgICAgID0gYmFzZUN0b3IucHJvdG90eXBlW25hbWVdO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGNsYXNzIFN0cmluZ1dyYXBwZXJcbntcbiAgICBzdGF0aWMgZnJvbUNoYXJDb2RlKGNvZGU6IG51bWJlcik6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNoYXJDb2RlQXQoczogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gcy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3BsaXQoczogc3RyaW5nLCByZWdFeHA6IFJlZ0V4cCk6IHN0cmluZ1tdXG4gICAge1xuICAgICAgICByZXR1cm4gcy5zcGxpdChyZWdFeHApO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbHMoczogc3RyaW5nLCBzMjogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHMgPT09IHMyO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdHJpcExlZnQoczogc3RyaW5nLCBjaGFyVmFsOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmIChzICYmIHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzW2ldICE9PSBjaGFyVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMgPSBzLnN1YnN0cmluZyhwb3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdHJpcFJpZ2h0KHM6IHN0cmluZywgY2hhclZhbDogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHBvcyA9IHMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAoc1tpXSAhPT0gY2hhclZhbCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcoMCwgcG9zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVwbGFjZShzOiBzdHJpbmcsIGZyb206IHN0cmluZywgcmVwbGFjZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKGZyb20sIHJlcGxhY2UpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXBsYWNlQWxsKHM6IHN0cmluZywgZnJvbTogUmVnRXhwLCByZXBsYWNlOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgcmVwbGFjZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNsaWNlPFQ+KHM6IHN0cmluZywgZnJvbTogbnVtYmVyID0gMCwgdG86IG51bWJlciA9IG51bGwpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBzLnNsaWNlKGZyb20sIHRvID09PSBudWxsID8gdW5kZWZpbmVkIDogdG8pO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWlucyhzOiBzdHJpbmcsIHN1YnN0cjogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHMuaW5kZXhPZihzdWJzdHIpICE9PSAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29tcGFyZShhOiBzdHJpbmcsIGI6IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBlbmRzV2lkdGgoc3ViamVjdDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDApOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoIVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgpIHtcbiAgICAgICAgICAgIFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc3N0cmluZywgcG9zID0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgc3ViamVjdFN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBvcyAhPT0gJ251bWJlcicgfHwgIWlzRmluaXRlKHBvcykgfHwgTWF0aC5mbG9vcihwb3MpICE9PSBwb3MgfHwgcG9zXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdFN0cmluZy5sZW5ndGgpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwb3MgPSBzdWJqZWN0U3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zIC09IHNzdHJpbmcubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGxldCBsYXN0SW5kZXggPSBzdWJqZWN0U3RyaW5nLmluZGV4T2Yoc3N0cmluZywgcG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvcztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YmplY3QuZW5kc1dpdGgoc2VhcmNoU3RyaW5nKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBzdGFydHNXaWR0aChzdWJqZWN0OiBzdHJpbmcsIHNlYXJjaFN0cmluZzogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuaW5kZXhPZihzZWFyY2hTdHJpbmcpID09PSAwO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0cmluZ0pvaW5lclxue1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXJ0czogc3RyaW5nW10gPSBbXSlcbiAgICB7XG4gICAgfVxuXG4gICAgYWRkKHBhcnQ6IHN0cmluZyk6IFN0cmluZ0pvaW5lclxuICAgIHtcbiAgICAgICAgdGhpcy5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIGxhc3QoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0c1t0aGlzLnBhcnRzLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydHMuam9pbignJyk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJXcmFwcGVyXG57XG4gICAgc3RhdGljIHRvRml4ZWQobjogbnVtYmVyLCBmcmFjdGlvbkRpZ2l0czogbnVtYmVyKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gbi50b0ZpeGVkKGZyYWN0aW9uRGlnaXRzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWwoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VJbnRBdXRvUmFkaXgodGV4dDogc3RyaW5nKTogbnVtYmVyXG4gICAge1xuICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSBwYXJzZUludCh0ZXh0KTtcbiAgICAgICAgaWYgKGlzTmFOKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnRlZ2VyIGxpdGVyYWwgd2hlbiBwYXJzaW5nICcgKyB0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZUludCh0ZXh0OiBzdHJpbmcsIHJhZGl4OiBudW1iZXIpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGlmIChyYWRpeCA9PT0gMTApIHtcbiAgICAgICAgICAgIGlmICgvXihcXC18XFwrKT9bMC05XSskLy50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRleHQsIHJhZGl4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyYWRpeCA9PT0gMTYpIHtcbiAgICAgICAgICAgIGlmICgvXihcXC18XFwrKT9bMC05QUJDREVGYWJjZGVmXSskLy50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRleHQsIHJhZGl4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IHBhcnNlSW50KHRleHQsIHJhZGl4KTtcbiAgICAgICAgICAgIGlmICghaXNOYU4ocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgaW50ZWdlciBsaXRlcmFsIHdoZW4gcGFyc2luZyAnICsgdGV4dCArICcgaW4gYmFzZSAnICsgcmFkaXgpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IE5hTiBpcyBhIHZhbGlkIGxpdGVyYWwgYnV0IGlzIHJldHVybmVkIGJ5IHBhcnNlRmxvYXQgdG8gaW5kaWNhdGUgYW4gZXJyb3IuXG4gICAgc3RhdGljIHBhcnNlRmxvYXQodGV4dDogc3RyaW5nKTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0ZXh0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNOdW1lcmljKHZhbHVlOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gIWlzTmFOKHZhbHVlIC0gcGFyc2VGbG9hdCh2YWx1ZSkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc05hTih2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzTmFOKHZhbHVlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNJbnRlZ2VyKHZhbHVlOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25XcmFwcGVyXG57XG4gICAgc3RhdGljIGFwcGx5KGZuOiBGdW5jdGlvbiwgcG9zQXJnczogYW55KTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgcG9zQXJncyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGJpbmQoZm46IEZ1bmN0aW9uLCBzY29wZTogYW55KTogRnVuY3Rpb25cbiAgICB7XG4gICAgICAgIHJldHVybiBmbi5iaW5kKHNjb3BlKTtcbiAgICB9XG59XG5cbi8vIEpTIGhhcyBOYU4gIT09IE5hTlxuZXhwb3J0IGZ1bmN0aW9uIGxvb3NlSWRlbnRpY2FsKGE6IGFueSwgYjogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiBhID09PSBiIHx8IHR5cGVvZiBhID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgYiA9PT0gJ251bWJlcicgJiYgaXNOYU4oYSkgJiYgaXNOYU4oYik7XG59XG5cbi8vIEpTIGNvbnNpZGVycyBOYU4gaXMgdGhlIHNhbWUgYXMgTmFOIGZvciBtYXAgS2V5ICh3aGlsZSBOYU4gIT09IE5hTiBvdGhlcndpc2UpXG4vLyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFwS2V5PFQ+KHZhbHVlOiBUKTogVFxue1xuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUJsYW5rKG9iajogT2JqZWN0KTogYW55XG57XG4gICAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IG51bGwgOiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVCb29sKG9iajogYm9vbGVhbik6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gaXNCbGFuayhvYmopID8gZmFsc2UgOiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0pzT2JqZWN0KG86IGFueSk6IGJvb2xlYW5cbntcbiAgICByZXR1cm4gbyAhPT0gbnVsbCAmJiAodHlwZW9mIG8gPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG8gPT09ICdvYmplY3QnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50KG9iajogRXJyb3IgfCBPYmplY3QpXG57XG4gICAgY29uc29sZS5sb2cob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhcm4ob2JqOiBFcnJvciB8IE9iamVjdClcbntcbiAgICBjb25zb2xlLndhcm4ob2JqKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbjogYm9vbGVhbiwgbXNnOiBzdHJpbmcpXG57XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tzdW0oczogYW55KVxue1xuICAgIGxldCBjaGsgPSAweDEyMzQ1Njc4O1xuICAgIGxldCBsZW4gPSBzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNoayArPSAocy5jaGFyQ29kZUF0KGkpICogKGkgKyAxKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChjaGsgJiAweGZmZmZmZmZmKS50b1N0cmluZygxNik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmMzMihjcmM6IG51bWJlciwgYW5JbnQ6IG51bWJlcilcbntcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuICAgIGxldCB0YWJsZSA9ICcwMDAwMDAwMCA3NzA3MzA5NiBFRTBFNjEyQyA5OTA5NTFCQSAwNzZEQzQxOSA3MDZBRjQ4RiBFOTYzQTUzNSA5RTY0OTVBMyAwRURCODgzMiA3OURDQjhBNCBFMEQ1RTkxRSA5N0QyRDk4OCAwOUI2NEMyQiA3RUIxN0NCRCBFN0I4MkQwNyA5MEJGMUQ5MSAxREI3MTA2NCA2QUIwMjBGMiBGM0I5NzE0OCA4NEJFNDFERSAxQURBRDQ3RCA2RERERTRFQiBGNEQ0QjU1MSA4M0QzODVDNyAxMzZDOTg1NiA2NDZCQThDMCBGRDYyRjk3QSA4QTY1QzlFQyAxNDAxNUM0RiA2MzA2NkNEOSBGQTBGM0Q2MyA4RDA4MERGNSAzQjZFMjBDOCA0QzY5MTA1RSBENTYwNDFFNCBBMjY3NzE3MiAzQzAzRTREMSA0QjA0RDQ0NyBEMjBEODVGRCBBNTBBQjU2QiAzNUI1QThGQSA0MkIyOTg2QyBEQkJCQzlENiBBQ0JDRjk0MCAzMkQ4NkNFMyA0NURGNUM3NSBEQ0Q2MERDRiBBQkQxM0Q1OSAyNkQ5MzBBQyA1MURFMDAzQSBDOEQ3NTE4MCBCRkQwNjExNiAyMUI0RjRCNSA1NkIzQzQyMyBDRkJBOTU5OSBCOEJEQTUwRiAyODAyQjg5RSA1RjA1ODgwOCBDNjBDRDlCMiBCMTBCRTkyNCAyRjZGN0M4NyA1ODY4NEMxMSBDMTYxMURBQiBCNjY2MkQzRCA3NkRDNDE5MCAwMURCNzEwNiA5OEQyMjBCQyBFRkQ1MTAyQSA3MUIxODU4OSAwNkI2QjUxRiA5RkJGRTRBNSBFOEI4RDQzMyA3ODA3QzlBMiAwRjAwRjkzNCA5NjA5QTg4RSBFMTBFOTgxOCA3RjZBMERCQiAwODZEM0QyRCA5MTY0NkM5NyBFNjYzNUMwMSA2QjZCNTFGNCAxQzZDNjE2MiA4NTY1MzBEOCBGMjYyMDA0RSA2QzA2OTVFRCAxQjAxQTU3QiA4MjA4RjRDMSBGNTBGQzQ1NyA2NUIwRDlDNiAxMkI3RTk1MCA4QkJFQjhFQSBGQ0I5ODg3QyA2MkREMURERiAxNURBMkQ0OSA4Q0QzN0NGMyBGQkQ0NEM2NSA0REIyNjE1OCAzQUI1NTFDRSBBM0JDMDA3NCBENEJCMzBFMiA0QURGQTU0MSAzREQ4OTVENyBBNEQxQzQ2RCBEM0Q2RjRGQiA0MzY5RTk2QSAzNDZFRDlGQyBBRDY3ODg0NiBEQTYwQjhEMCA0NDA0MkQ3MyAzMzAzMURFNSBBQTBBNEM1RiBERDBEN0NDOSA1MDA1NzEzQyAyNzAyNDFBQSBCRTBCMTAxMCBDOTBDMjA4NiA1NzY4QjUyNSAyMDZGODVCMyBCOTY2RDQwOSBDRTYxRTQ5RiA1RURFRjkwRSAyOUQ5Qzk5OCBCMEQwOTgyMiBDN0Q3QThCNCA1OUIzM0QxNyAyRUI0MEQ4MSBCN0JENUMzQiBDMEJBNkNBRCBFREI4ODMyMCA5QUJGQjNCNiAwM0I2RTIwQyA3NEIxRDI5QSBFQUQ1NDczOSA5REQyNzdBRiAwNERCMjYxNSA3M0RDMTY4MyBFMzYzMEIxMiA5NDY0M0I4NCAwRDZENkEzRSA3QTZBNUFBOCBFNDBFQ0YwQiA5MzA5RkY5RCAwQTAwQUUyNyA3RDA3OUVCMSBGMDBGOTM0NCA4NzA4QTNEMiAxRTAxRjI2OCA2OTA2QzJGRSBGNzYyNTc1RCA4MDY1NjdDQiAxOTZDMzY3MSA2RTZCMDZFNyBGRUQ0MUI3NiA4OUQzMkJFMCAxMERBN0E1QSA2N0RENEFDQyBGOUI5REY2RiA4RUJFRUZGOSAxN0I3QkU0MyA2MEIwOEVENSBENkQ2QTNFOCBBMUQxOTM3RSAzOEQ4QzJDNCA0RkRGRjI1MiBEMUJCNjdGMSBBNkJDNTc2NyAzRkI1MDZERCA0OEIyMzY0QiBEODBEMkJEQSBBRjBBMUI0QyAzNjAzNEFGNiA0MTA0N0E2MCBERjYwRUZDMyBBODY3REY1NSAzMTZFOEVFRiA0NjY5QkU3OSBDQjYxQjM4QyBCQzY2ODMxQSAyNTZGRDJBMCA1MjY4RTIzNiBDQzBDNzc5NSBCQjBCNDcwMyAyMjAyMTZCOSA1NTA1MjYyRiBDNUJBM0JCRSBCMkJEMEIyOCAyQkI0NUE5MiA1Q0IzNkEwNCBDMkQ3RkZBNyBCNUQwQ0YzMSAyQ0Q5OUU4QiA1QkRFQUUxRCA5QjY0QzJCMCBFQzYzRjIyNiA3NTZBQTM5QyAwMjZEOTMwQSA5QzA5MDZBOSBFQjBFMzYzRiA3MjA3Njc4NSAwNTAwNTcxMyA5NUJGNEE4MiBFMkI4N0ExNCA3QkIxMkJBRSAwQ0I2MUIzOCA5MkQyOEU5QiBFNUQ1QkUwRCA3Q0RDRUZCNyAwQkRCREYyMSA4NkQzRDJENCBGMUQ0RTI0MiA2OEREQjNGOCAxRkRBODM2RSA4MUJFMTZDRCBGNkI5MjY1QiA2RkIwNzdFMSAxOEI3NDc3NyA4ODA4NUFFNiBGRjBGNkE3MCA2NjA2M0JDQSAxMTAxMEI1QyA4RjY1OUVGRiBGODYyQUU2OSA2MTZCRkZEMyAxNjZDQ0Y0NSBBMDBBRTI3OCBENzBERDJFRSA0RTA0ODM1NCAzOTAzQjNDMiBBNzY3MjY2MSBEMDYwMTZGNyA0OTY5NDc0RCAzRTZFNzdEQiBBRUQxNkE0QSBEOUQ2NUFEQyA0MERGMEI2NiAzN0Q4M0JGMCBBOUJDQUU1MyBERUJCOUVDNSA0N0IyQ0Y3RiAzMEI1RkZFOSBCREJERjIxQyBDQUJBQzI4QSA1M0IzOTMzMCAyNEI0QTNBNiBCQUQwMzYwNSBDREQ3MDY5MyA1NERFNTcyOSAyM0Q5NjdCRiBCMzY2N0EyRSBDNDYxNEFCOCA1RDY4MUIwMiAyQTZGMkI5NCBCNDBCQkUzNyBDMzBDOEVBMSA1QTA1REYxQiAyRDAyRUY4RCc7XG4gICAgLyogdHNsaW50OmVuYWJsZSAqL1xuXG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcblxuICAgIGxldCBteUNyYyA9IGNyYyBeICgtMSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgeSA9IChjcmMgXiBhbkludCkgJiAweEZGO1xuICAgICAgICB4ID0gTnVtYmVyKCcweCcgKyB0YWJsZS5zdWJzdHIoeSAqIDksIDgpKTtcbiAgICAgICAgY3JjID0gKGNyYyA+Pj4gOCkgXiB4O1xuICAgIH1cbiAgICByZXR1cm4gY3JjIF4gKC0xKTtcbn1cblxuXG4vLyBDYW4ndCBiZSBhbGwgdXBwZXJjYXNlIGFzIG91ciB0cmFuc3BpbGVyIHdvdWxkIHRoaW5rIGl0IGlzIGEgc3BlY2lhbCBkaXJlY3RpdmUuLi5cbmV4cG9ydCBjbGFzcyBKc29uXG57XG4gICAgc3RhdGljIHBhcnNlKHM6IHN0cmluZyk6IE9iamVjdFxuICAgIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uocyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHN0cmluZ2lmeShkYXRhOiBPYmplY3QpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIC8vIERhcnQgZG9lc24ndCB0YWtlIDMgYXJndW1lbnRzXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRlV3JhcHBlclxue1xuICAgIHN0YXRpYyBjcmVhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyID0gMSwgZGF5OiBudW1iZXIgPSAxLCBob3VyOiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgICAgbWludXRlczogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICAgIHNlY29uZHM6IG51bWJlciA9IDAsIG1pbGxpc2Vjb25kczogbnVtYmVyID0gMCk6IERhdGVcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSwgaG91ciwgbWludXRlcywgc2Vjb25kcywgbWlsbGlzZWNvbmRzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbUlTT1N0cmluZyhzdHI6IHN0cmluZyk6IERhdGVcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShzdHIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tTWlsbGlzKG1zOiBudW1iZXIpOiBEYXRlXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUobXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b01pbGxpcyhkYXRlOiBEYXRlKTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdygpOiBEYXRlXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9Kc29uKGRhdGU6IERhdGUpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBkYXRlLnRvSlNPTigpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQm9vbGVhbldyYXBwZXJcbntcblxuICAgIHN0YXRpYyBib2xlYW5WYWx1ZSh2YWx1ZTogYW55ID0gZmFsc2UpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodmFsdWUgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgaXNGYWxzZSh2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAnZmFsc2UnO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nTWFwKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgPT09IGZhbHNlKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgaXNUcnVlKHZhbHVlOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodmFsdWUgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJztcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZ01hcCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlID09PSB0cnVlKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5cbi8vIFdoZW4gU3ltYm9sLml0ZXJhdG9yIGRvZXNuJ3QgZXhpc3QsIHJldHJpZXZlcyB0aGUga2V5IHVzZWQgaW4gZXM2LXNoaW1cbmRlY2xhcmUgbGV0IFN5bWJvbDogYW55O1xubGV0IF9zeW1ib2xJdGVyYXRvcjogYW55ID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN5bWJvbEl0ZXJhdG9yKCk6IHN0cmluZyB8IHN5bWJvbFxue1xuICAgIGlmIChpc0JsYW5rKF9zeW1ib2xJdGVyYXRvcikpIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChTeW1ib2wuaXRlcmF0b3IpKSB7XG4gICAgICAgICAgICBfc3ltYm9sSXRlcmF0b3IgPSBTeW1ib2wuaXRlcmF0b3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlczYtc2hpbSBzcGVjaWZpYyBsb2dpY1xuICAgICAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhNYXAucHJvdG90eXBlKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICdlbnRyaWVzJyAmJiBrZXkgIT09ICdzaXplJyAmJlxuICAgICAgICAgICAgICAgICAgICAoTWFwIGFzIGFueSkucHJvdG90eXBlW2tleV0gPT09IE1hcC5wcm90b3R5cGVbJ2VudHJpZXMnXSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIF9zeW1ib2xJdGVyYXRvciA9IGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9zeW1ib2xJdGVyYXRvcjtcbn1cblxuY29uc3QgUmVzZXJ2ZWRLZXl3b3JkID0gWydjbGFzcyddO1xuXG5leHBvcnQgZnVuY3Rpb24gZXZhbEV4cHJlc3Npb24oZXhwcjogc3RyaW5nLCBkZWNsYXJhdGlvbnM6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXRzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogYW55XG57XG4gICAgbGV0IGZuQm9keSA9IGAke2RlY2xhcmF0aW9uc31cXG5cXHRyZXR1cm4gJHtleHByfVxcbi8vIyBzb3VyY2VVUkw9QXJpYmFFeHByZXNzaW9uYDtcbiAgICBsZXQgZm5BcmdOYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgZm5BcmdWYWx1ZXM6IGFueVtdID0gW107XG4gICAgZm9yIChsZXQgYXJnTmFtZSBpbiBsZXRzKSB7XG4gICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGV4cHIsIGFyZ05hbWUpKSB7XG4gICAgICAgICAgICBmbkFyZ05hbWVzLnB1c2goYXJnTmFtZSk7XG4gICAgICAgICAgICBmbkFyZ1ZhbHVlcy5wdXNoKGxldHNbYXJnTmFtZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChsZXRzIGluc3RhbmNlb2YgRXh0ZW5zaWJsZSkge1xuICAgICAgICBsZXQgZXh0VmFsdWVzOiBFeHRlbnNpYmxlID0gbGV0cztcblxuICAgICAgICBleHRWYWx1ZXMuZXh0ZW5kZWRGaWVsZHMoKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBrZXkpICYmXG4gICAgICAgICAgICAgICAgZm5BcmdOYW1lcy5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICBrZXkpID09PSAtMSAmJiBSZXNlcnZlZEtleXdvcmQuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGZuQXJnTmFtZXMucHVzaCgndGhpcycpO1xuICAgIC8vIGZuQXJnVmFsdWVzLnB1c2gobGV0cyk7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKSguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWxFeHByZXNzaW9uV2l0aENudHgoZXhwcjogc3RyaW5nLCBkZWNsYXJhdGlvbnM6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzQ29udGV4dDogYW55KTogYW55XG57XG4gICAgbGV0IGZuQm9keSA9IGAke2RlY2xhcmF0aW9uc31cXG5cXHRyZXR1cm4gJHtleHByfVxcbi8vIyBzb3VyY2VVUkw9QXJpYmFFeHByZXNzaW9uYDtcbiAgICBsZXQgZm5BcmdOYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgZm5BcmdWYWx1ZXM6IGFueVtdID0gW107XG4gICAgZm9yIChsZXQgYXJnTmFtZSBpbiBsZXRzKSB7XG4gICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGV4cHIsIGFyZ05hbWUpKSB7XG4gICAgICAgICAgICBmbkFyZ05hbWVzLnB1c2goYXJnTmFtZSk7XG4gICAgICAgICAgICBmbkFyZ1ZhbHVlcy5wdXNoKGxldHNbYXJnTmFtZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChsZXRzIGluc3RhbmNlb2YgRXh0ZW5zaWJsZSkge1xuICAgICAgICBsZXQgZXh0VmFsdWVzOiBFeHRlbnNpYmxlID0gbGV0cztcblxuICAgICAgICBleHRWYWx1ZXMuZXh0ZW5kZWRGaWVsZHMoKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5jb250YWlucyhleHByLCBrZXkpICYmXG4gICAgICAgICAgICAgICAgZm5BcmdOYW1lcy5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICBrZXkpID09PSAtMSAmJiBSZXNlcnZlZEtleXdvcmQuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAga2V5KSA9PT0gLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm5BcmdOYW1lcy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgZm5BcmdWYWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGZuQXJnTmFtZXMucHVzaCgndGhpcycpO1xuICAgIC8vIGZuQXJnVmFsdWVzLnB1c2gobGV0cyk7XG4gICAgbGV0IGZuID0gbmV3IEZ1bmN0aW9uKC4uLmZuQXJnTmFtZXMuY29uY2F0KGZuQm9keSkpO1xuICAgIGFzc2VydChpc1ByZXNlbnQoZm4pLCAnQ2Fubm90IGV2YWx1YXRlIGV4cHJlc3Npb24uIEZOIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgbGV0IGZuQm91bmQgPSBmbi5iaW5kKHRoaXNDb250ZXh0KTtcblxuICAgIHJldHVybiBmbkJvdW5kKC4uLmZuQXJnVmFsdWVzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJpbWl0aXZlKG9iajogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiAhaXNKc09iamVjdChvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ29uc3RydWN0b3IodmFsdWU6IE9iamVjdCwgdHlwZTogYW55KTogYm9vbGVhblxue1xuICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gdHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZShzOiBzdHJpbmcpOiBzdHJpbmdcbntcbiAgICByZXR1cm4gZW5jb2RlVVJJKHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHM6IHN0cmluZyk6IHN0cmluZ1xue1xuICAgIHJldHVybiBzLnJlcGxhY2UoLyhbLiorP149IToke30oKXxbXFxdXFwvXFxcXF0pL2csICdcXFxcJDEnKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaGFzaENvZGUoc3RyOiBzdHJpbmcpOiBudW1iZXJcbntcbiAgICBsZXQgaGFzaCA9IDA7XG4gICAgbGV0IGNoYXI6IG51bWJlcjtcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2hhciA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyO1xuICAgICAgICBoYXNoID0gaGFzaCAmIGhhc2g7XG4gICAgfVxuICAgIHJldHVybiBoYXNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0VmFsdWVzKG9iajogYW55KTogYW55W11cbntcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKTtcbn1cblxuLyoqXG4gKlxuICogQ29udmVydHMgb2JqZWN0IHRvIGEgbmFtZTtcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RUb05hbWUodGFyZ2V0OiBhbnkpOiBzdHJpbmdcbntcbiAgICBpZiAoaXNCbGFuayh0YXJnZXQpIHx8ICghaXNTdHJpbmdNYXAodGFyZ2V0KSAmJiAhaXNUeXBlKHRhcmdldCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignIENhbm5vdCBjb252ZXJ0LiBVa25vd24gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzVHlwZSh0YXJnZXQpID8gdGFyZ2V0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lIDogdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWU7XG59XG5cbi8qKlxuICpcbiAqIEJhc2ljIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIFVVSUQgdGFrZW4gZnJvbSBXM0MgZnJvbSBvbmUgb2YgdGhlIGV4YW1wbGVzXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXVpZCgpOiBzdHJpbmdcbntcbiAgICBsZXQgZHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBsZXQgcHJvdG8gPSAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csXG4gICAgICAgIChjOiBzdHJpbmcpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCByID0gKGR0ICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDtcbiAgICAgICAgICAgIGR0ID0gTWF0aC5mbG9vcihkdCAvIDE2KTtcbiAgICAgICAgICAgIHJldHVybiAoYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gcHJvdG87XG59XG5cbi8qKlxuICogQ2hlY2sgb2JqZWN0IGVxdWFsaXR5IGRlcml2ZWQgZnJvbSBhbmd1bGFyLmVxdWFscyAxLjUgaW1wbGVtZW50YXRpb25cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMobzE6IGFueSwgbzI6IGFueSk6IGJvb2xlYW5cbntcbiAgICBpZiAobzEgPT09IG8yKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAobzEgPT09IG51bGwgfHwgbzIgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKG8xICE9PSBvMSAmJiBvMiAhPT0gbzIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIE5hTiA9PT0gTmFOXG4gICAgfVxuXG4gICAgbGV0IHQxID0gdHlwZW9mIG8xLCB0MiA9IHR5cGVvZiBvMiwgbGVuZ3RoOiBhbnksIGtleTogYW55LCBrZXlTZXQ6IGFueTtcbiAgICBpZiAodDEgPT09IHQyICYmIHQxID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNBcnJheShvMSkpIHtcbiAgICAgICAgICAgIGlmICghaXNBcnJheShvMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKGxlbmd0aCA9IG8xLmxlbmd0aCkgPT09IG8yLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAoa2V5ID0gMDsga2V5IDwgbGVuZ3RoOyBrZXkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVxdWFscyhvMVtrZXldLCBvMltrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShvMSkpIHtcbiAgICAgICAgICAgIGlmICghaXNEYXRlKG8yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlcXVhbHMobzEuZ2V0VGltZSgpLCBvMi5nZXRUaW1lKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUmVnRXhwKG8xKSkge1xuICAgICAgICAgICAgaWYgKCFpc1JlZ0V4cChvMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbzEudG9TdHJpbmcoKSA9PT0gbzIudG9TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc1dpbmRvdyhvMSkgfHwgaXNXaW5kb3cobzIpIHx8XG4gICAgICAgICAgICAgICAgaXNBcnJheShvMikgfHwgaXNEYXRlKG8yKSB8fCBpc1JlZ0V4cChvMikpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5U2V0ID0gbmV3IE1hcDxzdHJpbmcsIGJvb2xlYW4+KCk7XG4gICAgICAgICAgICAvLyB1c2luZyBPYmplY3Qua2V5cyBhcyBpdGVyYXRpbmcgdGhydSBvYmplY3Qgc3RvcCB3b3JraW5nIGluIE5HNiwgVFMyLjdcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobzIpO1xuICAgICAgICAgICAgZm9yIChrZXkgaW4ga2V5cykge1xuICAgICAgICAgICAgICAgIGlmIChrZXlzW2tleV0uY2hhckF0KDApID09PSAnJCcgfHwgaXNGdW5jdGlvbihvMVtrZXlzW2tleV1dKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlcXVhbHMobzFba2V5c1trZXldXSwgbzJba2V5c1trZXldXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXlTZXQuc2V0KGtleXNba2V5XSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhvMik7XG4gICAgICAgICAgICBmb3IgKGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5U2V0LmhhcyhrZXkpKSAmJiBrZXkuY2hhckF0KDApICE9PSAnJCdcbiAgICAgICAgICAgICAgICAgICAgJiYgaXNQcmVzZW50KG8yW2tleV0pICYmICFpc0Z1bmN0aW9uKG8yW2tleV0pKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKipcbiAqIHRyYW5zZm9ybSBhIHN0cmluZyBpbnRvIGRlY2FtZWwuIGZvcm0uIE1vc3RseSB1c2VkIHdoZW4gcmVhZGluZyBjbGFzcyBuYW1lcyBvciBmaWVsZCBuYW1lc1xuICogc3VjaCBmaXJzdE5hbWUgYW5kIHdlIHdhbnQgdG8gY3JlYXRlIGEgbGFiZWwgRmlyc3QgTmFtZVxuICpcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNhbWVsaXplKHN0cmluZzogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcgJywgaW5pdGlhbENhcHM6IGJvb2xlYW4gPSB0cnVlKVxue1xuICAgIGlmIChpc0JsYW5rKHN0cmluZykpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGxldCBsYXN0VUNJbmRleCA9IC0xO1xuICAgIGxldCBhbGxDYXBzID0gdHJ1ZTtcblxuICAgIGxldCBzcGxpdE9uVUMgPSAhU3RyaW5nV3JhcHBlci5jb250YWlucyhzdHJpbmcsICdfJyk7XG4gICAgbGV0IGJ1ZiA9ICcnO1xuICAgIGxldCBpbldvcmQgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IHN0cmluZy5sZW5ndGg7IGluV29yZCA8IGk7ICsraW5Xb3JkKSB7XG4gICAgICAgIGxldCBjID0gc3RyaW5nW2luV29yZF07XG5cbiAgICAgICAgaWYgKGMudG9VcHBlckNhc2UoKSA9PT0gYykge1xuICAgICAgICAgICAgaWYgKChpbldvcmQgLSAxKSAhPT0gbGFzdFVDSW5kZXggJiYgc3BsaXRPblVDKSB7XG4gICAgICAgICAgICAgICAgYnVmICs9IHNlcGFyYXRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RVQ0luZGV4ID0gaW5Xb3JkO1xuICAgICAgICAgICAgaWYgKCFpbml0aWFsQ2Fwcykge1xuICAgICAgICAgICAgICAgIGMgPSBjLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYy50b0xvd2VyQ2FzZSgpID09PSBjKSB7XG4gICAgICAgICAgICBpZiAoaW5Xb3JkID09PSAwICYmIGluaXRpYWxDYXBzKSB7XG4gICAgICAgICAgICAgICAgYyA9IGMudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFsbENhcHMgPSBmYWxzZTtcblxuICAgICAgICB9IGVsc2UgaWYgKGMgIT09ICdfJykge1xuICAgICAgICAgICAgYyA9IHNlcGFyYXRvcjtcbiAgICAgICAgfVxuICAgICAgICBidWYgKz0gYztcbiAgICB9XG5cbiAgICBpZiAoYWxsQ2Fwcykge1xuICAgICAgICBsZXQgdG9DYXBzID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBjID0gYnVmLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNoID0gYnVmW2ldO1xuXG4gICAgICAgICAgICBpZiAoY2gudG9Mb3dlckNhc2UoKSAhPT0gY2gudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpbldvcmQgJiYgY2ggPT09IGNoLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmID0gYnVmLnN1YnN0cigwLCBpKSArIGNoLnRvTG93ZXJDYXNlKCkgKyBidWYuc3Vic3RyKGkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9DYXBzID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9DYXBzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJ1Zjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbm9uUHJpdmF0ZVByZWZpeChpbnB1dDogc3RyaW5nKTogc3RyaW5nXG57XG4gICAgcmV0dXJuIGlucHV0WzBdID09PSAnXycgPyBTdHJpbmdXcmFwcGVyLnN0cmlwTGVmdChpbnB1dCwgJ18nKSA6IGlucHV0O1xufVxuXG5cbi8qKlxuICpcbiAqIFRoaXMgY29uc2lkZXJzIGN1cnJlbnRseSBvbmx5IDEgZm9ybSB3aGljaCB3aGVuIHdlIGhhdmUgZ2V0dGVyIHdlIGhhdmUgdGhpcyBmb3JtIGZvclxuICogZGVjbGFyYXRpb24gXzxuYW1lPiBhbmQgZ2V0IDxuYW1lPigpLiBJIGRvIG5vdCBjaGVjayBhbnkgb3RoZXIgZm9ybXMgbm93LlxuICpcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNHZXR0ZXIoaW5zdGFuY2U6IGFueSwgZmllbGQ6IHN0cmluZyk6IGJvb2xlYW5cbntcbiAgICBpZiAoaXNCbGFuayhmaWVsZCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAoZmllbGRbMF0gPT09ICdfJyAmJiBpc1ByZXNlbnQobm9uUHJpdmF0ZVByZWZpeChmaWVsZCkpKTtcblxufVxuXG4vKipcbiAqIFRoZSBFeHRlbnNpYmxlIGludGVyZmFjZSBjYW4gYmUgaW1wbGVtZW50ZWQgd2hlbiBhIGdpdmVuIGNsYXNzXG4gKiB3YW50cyB0byBwcm92aWRlIGR5bmFtaWNhbGx5IGFkZGVkIGZpZWxkcy4gIE9uY2UgdGhpcyBpcyBpbXBsZW1lbnRlZFxuICogdG8gcmV0dXJuIGEgTWFwLCB0aGUgRmllbGRWYWx1ZSBzeXN0ZW0gd2lsbCBiZSBhYmxlIHRvIGxvb2sgaW5cbiAqIHRoZSBNYXAgdG8gc2VlIGlmIHRoZSBkZXNpcmVkIGZpZWxkIGV4aXN0cy5cbiAqXG4gKlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXh0ZW5zaWJsZVxue1xuXG4gICAgLyoqXG4gICAgICogIFJldHVybnMgdGhlIE1hcCBpbiB3aGljaCB0aGUgZHluYW1pY2FsbHkgYWRkZWQgZmllbGRzIHJlc2lkZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGV4dGVuZGVkRmllbGRzKCk6IE1hcDxzdHJpbmcsIGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxufVxuXG4iLCIvKipcbiAqXG4gKiBAb3JpZ2luYWwtbGljZW5zZVxuICpcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKlxuICpcbiAqXG4gKiAgQ3JlZGl0OiBEZXJpdmVkIGFuZCBleHRlbmRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIgaW4gb3JkZXIgdG8gaGF2ZSBzZXQgb2ZcbiAqICByZXVzYWJsZSBnbG9iYWxzLiBTaW5jZSBpdHMgbm90IGV4cG9ydGVkIEFQSSBuZWVkIHRvIGhhdmUgYSBjb3B5IHVuZGVyIGNvcmUuXG4gKi9cbmltcG9ydCAqIGFzIENvbGxlY3Rpb25zIGZyb20gJ3R5cGVzY3JpcHQtY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBjbGFzc05hbWUsXG4gICAgZXF1YWxzLFxuICAgIGdldFN5bWJvbEl0ZXJhdG9yLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc0pzT2JqZWN0LFxuICAgIGlzUHJlc2VudCxcbiAgICBpc1N0cmluZyxcbiAgICBTdHJpbmdKb2luZXJcbn0gZnJvbSAnLi9sYW5nJztcblxuXG5leHBvcnQgY29uc3QgY3JlYXRlTWFwRnJvbU1hcDogeyAobTogTWFwPGFueSwgYW55Pik6IE1hcDxhbnksIGFueT4gfSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKG5ldyBNYXAoPGFueT5uZXcgTWFwKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlTWFwRnJvbU1hcElubmVyKG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1hcCg8YW55Pm0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZU1hcEFuZFBvcHVsYXRlRnJvbU1hcChtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55PiB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICAgICAgbWFwLnNldChrLCB2KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfTtcbn0pKCk7XG5leHBvcnQgY29uc3QgX2NsZWFyVmFsdWVzOiB7IChtOiBNYXA8YW55LCBhbnk+KTogdm9pZCB9ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoKDxhbnk+KG5ldyBNYXAoKSkua2V5cygpKS5uZXh0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBfY2xlYXJWYWx1ZXNJbm5lcihtOiBNYXA8YW55LCBhbnk+KSB7XG4gICAgICAgICAgICBsZXQga2V5SXRlcmF0b3IgPSBtLmtleXMoKTtcbiAgICAgICAgICAgIGxldCBrOiBhbnkgLyoqIFRPRE8gIz8/Pz8gKi87XG4gICAgICAgICAgICB3aGlsZSAoISgoayA9ICg8YW55PmtleUl0ZXJhdG9yKS5uZXh0KCkpLmRvbmUpKSB7XG4gICAgICAgICAgICAgICAgbS5zZXQoay52YWx1ZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9jbGVhclZhbHVlc1dpdGhGb3JlRWFjaChtOiBNYXA8YW55LCBhbnk+KSB7XG4gICAgICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgICAgICBtLnNldChrLCBudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbn0pKCk7XG5cbmV4cG9ydCBjbGFzcyBNYXBXcmFwcGVyIHtcblxuICAgIHN0YXRpYyBjcmVhdGVFbXB0eTxLLCBWPigpOiBNYXA8SywgVj4ge1xuICAgICAgICByZXR1cm4gbmV3IE1hcDxLLCBWPigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbG9uZTxLLCBWPihtOiBNYXA8SywgVj4pOiBNYXA8SywgVj4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG5ldyBNYXAoPGFueT5uZXcgTWFwKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXA8SywgVj4oPGFueT4gbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgIG1hcC5zZXQoaywgdik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVGcm9tU3RyaW5nTWFwPFQ+KHN0cmluZ01hcDogeyBba2V5OiBzdHJpbmddOiBUIH0pOiBNYXA8c3RyaW5nLCBUPiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHN0cmluZ01hcCkge1xuICAgICAgICAgICAgcmVzdWx0LnNldChrZXksIHN0cmluZ01hcFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNyZWF0ZUZyb21BbnlNYXA8VD4oc3RyaW5nTWFwOiB7IFtrZXk6IHN0cmluZ106IFQgfSk6IE1hcDxhbnksIFQ+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXA8YW55LCBUPigpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3RyaW5nTWFwKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGtleSwgc3RyaW5nTWFwW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY3JlYXRlRnJvbVN0cmluZ01hcFdpdGhSZXNvbHZlPFQ+KHN0cmluZ01hcDogeyBba2V5OiBzdHJpbmddOiBUIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlOiAoa2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGFueSkgPT4gYW55KTogTWFwPHN0cmluZywgVD4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzdHJpbmdNYXApIHtcbiAgICAgICAgICAgIGxldCB1cGRhdGVkVmFsdWUgPSByZXNvbHZlKGtleSwgc3RyaW5nTWFwW2tleV0pO1xuICAgICAgICAgICAgcmVzdWx0LnNldChrZXksIHVwZGF0ZWRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9TdHJpbmdNYXA8VD4obTogTWFwPHN0cmluZywgVD4pOiB7IFtrZXk6IHN0cmluZ106IFQgfSB7XG4gICAgICAgIGxldCByOiB7IFtrZXk6IHN0cmluZ106IFQgfSA9IHt9O1xuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHJba10gPSB2KTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvQW55TWFwPFQ+KG06IE1hcDxhbnksIFQ+KTogYW55IHtcbiAgICAgICAgbGV0IHIgPSB7fTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KG0pKSB7XG4gICAgICAgICAgICBtLmZvckVhY2goKHYsIGspID0+ICg8YW55PnIpW2tdID0gdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgdG9TdHJpbmcobTogTWFwPHN0cmluZywgYW55PiwgaW5uZXI6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzaiA9IG5ldyBTdHJpbmdKb2luZXIoWycnXSk7XG4gICAgICAgIGlmICghaW5uZXIpIHtcbiAgICAgICAgICAgIHNqLmFkZCgneycpO1xuICAgICAgICB9XG4gICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4ge1xuXG4gICAgICAgICAgICBpZiAodiBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIHNqLmFkZChNYXBXcmFwcGVyLnRvU3RyaW5nKHYsIHRydWUpKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzai5hZGQoayk7XG4gICAgICAgICAgICAgICAgc2ouYWRkKCc9Jyk7XG4gICAgICAgICAgICAgICAgc2ouYWRkKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2ouYWRkKCcsICcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWlubmVyKSB7XG4gICAgICAgICAgICBzai5hZGQoJ30gJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNqLnRvU3RyaW5nKCk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY2xlYXJWYWx1ZXMobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgICBfY2xlYXJWYWx1ZXMobSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGl0ZXJhYmxlPFQ+KG06IFQpOiBUIHtcbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgbWVyZ2VNYXBJbnRvTWFwV2l0aE9iamVjdChkZXN0OiBNYXA8c3RyaW5nLCBhbnk+LCBzb3VyY2U6IE1hcDxzdHJpbmcsIGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcndyaXRlTWlzbWF0Y2hlZDogYm9vbGVhbik6IE1hcDxzdHJpbmcsIGFueT4ge1xuXG4gICAgICAgIGxldCBrZXlzID0gQXJyYXkuZnJvbShzb3VyY2Uua2V5cygpKTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgbGV0IHNvdXJjZVZhbHVlID0gc291cmNlLmdldChrZXkpO1xuICAgICAgICAgICAgbGV0IGRlc3RWYWx1ZSA9IGRlc3QuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKGRlc3RWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIExpc3RXcmFwcGVyLmNvcHlWYWx1ZShzb3VyY2VWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkZXN0VmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgc291cmNlVmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcblxuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSxcbiAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5tZXJnZU1hcEludG9NYXBXaXRoT2JqZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jbG9uZTxzdHJpbmcsIGFueT4oZGVzdFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVZhbHVlLCBvdmVyd3JpdGVNaXNtYXRjaGVkKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlc3RWYWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiBpc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKExpc3RXcmFwcGVyLmFsbEVsZW1lbnRzQXJlU3RyaW5ncyhzb3VyY2VWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIE1hcFdyYXBwZXIubWVyZ2VNYXBJbnRvTWFwV2l0aE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY2xvbmU8c3RyaW5nLCBhbnk+KGRlc3RWYWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNvbnZlcnRMaXN0VG9NYXAoc291cmNlVmFsdWUpLCBvdmVyd3JpdGVNaXNtYXRjaGVkKVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNvdXJjZVZlY3Q6IHN0cmluZ1tdID0gTGlzdFdyYXBwZXIuY2xvbmU8YW55Pihzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRJZkFic2VudDxhbnk+KHNvdXJjZVZlY3QsIGRlc3RWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGRlc3RWYWx1ZSkgJiYgc291cmNlVmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcblxuICAgICAgICAgICAgICAgIGlmIChMaXN0V3JhcHBlci5hbGxFbGVtZW50c0FyZVN0cmluZ3MoZGVzdFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIE1hcFdyYXBwZXIubWVyZ2VNYXBJbnRvTWFwV2l0aE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY29udmVydExpc3RUb01hcChkZXN0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVyd3JpdGVNaXNtYXRjaGVkKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRvZG86IGNhbiB3ZSByZWFsbHkgbWF0Y2ggdGhpcyB2YWx1ZXMgd2l0aCBpbmRleE9mXG4gICAgICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRJZkFic2VudDxNYXA8c3RyaW5nLCBhbnk+PihkZXN0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNsb25lPHN0cmluZywgYW55PihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlc3RWYWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiBpc1N0cmluZyhzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGVzdFZhbHVlTWFwID0gTWFwV3JhcHBlci5jbG9uZShkZXN0VmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoZGVzdFZhbHVlTWFwLmdldChzb3VyY2VWYWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RWYWx1ZS5zZXQoc291cmNlVmFsdWUsIE1hcFdyYXBwZXIuY3JlYXRlRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhkZXN0VmFsdWUpICYmIHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZUhhc2ggPSBNYXBXcmFwcGVyLmNsb25lKHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNCbGFuayhzb3VyY2VIYXNoLmdldChkZXN0VmFsdWUpKSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VIYXNoLnNldChkZXN0VmFsdWUsIE1hcFdyYXBwZXIuY3JlYXRlRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlSGFzaCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShkZXN0VmFsdWUpICYmIGlzQXJyYXkoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShkZXN0VmFsdWUpICYmIGlzU3RyaW5nKHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRJZkFic2VudChkZXN0VmFsdWUsIHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhkZXN0VmFsdWUpICYmIGlzQXJyYXkoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZVZlY3Q6IHN0cmluZ1tdID0gTGlzdFdyYXBwZXIuY2xvbmU8c3RyaW5nPihzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQoc291cmNlVmVjdCwgZGVzdFZhbHVlKTtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZlY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGRlc3RWYWx1ZSkgJiYgaXNTdHJpbmcoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3ZlcndyaXRlTWlzbWF0Y2hlZCkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZGVzdENsYXNzID0gY2xhc3NOYW1lKGRlc3RWYWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZUNsYXNzID0gY2xhc3NOYW1lKHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChkZXN0Q2xhc3MgPT09IHNvdXJjZUNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udmVydExpc3RUb01hcChrZXlzOiBzdHJpbmdbXSk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtYXAuc2V0KGtleXNbaV0sIE1hcFdyYXBwZXIuY3JlYXRlRW1wdHk8c3RyaW5nLCBhbnk+KCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgc3RhdGljIGdyb3VwQnk8Sz4oaXRlbXM6IGFueSwgZ3JvdXBCeUtleTogKGl0ZW06IEspID0+IHN0cmluZyk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gaXRlbXMucmVkdWNlKChncm91cFJlc3VsdDogYW55LCBjdXJyZW50VmFsdWU6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgZ0tleSA9IGdyb3VwQnlLZXkoY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIChncm91cFJlc3VsdFtnS2V5XSA9IGdyb3VwUmVzdWx0W2dLZXldIHx8IFtdKS5wdXNoKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXBSZXN1bHQ7XG4gICAgICAgIH0sIHt9KTtcblxuXG4gICAgICAgIGxldCBncm91cGVkOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgT2JqZWN0LmtleXMocmVzdWx0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGdyb3VwZWQuc2V0KGtleSwgcmVzdWx0W2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGdyb3VwZWQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFdyYXBzIEphdmFzY3JpcHQgT2JqZWN0c1xuICovXG5leHBvcnQgY2xhc3MgU3RyaW5nTWFwV3JhcHBlciB7XG4gICAgc3RhdGljIGNyZWF0ZSgpOiB7IFtrOiAvKmFueSovIHN0cmluZ106IGFueSB9IHtcbiAgICAgICAgLy8gTm90ZTogV2UgYXJlIG5vdCB1c2luZyBPYmplY3QuY3JlYXRlKG51bGwpIGhlcmUgZHVlIHRvXG4gICAgICAgIC8vIHBlcmZvcm1hbmNlIVxuICAgICAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9uZzItb2JqZWN0LWNyZWF0ZS1udWxsXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnMobWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbWFwLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldDxWPihtYXA6IHsgW2tleTogc3RyaW5nXTogViB9LCBrZXk6IHN0cmluZyk6IFYge1xuICAgICAgICByZXR1cm4gbWFwLmhhc093blByb3BlcnR5KGtleSkgPyBtYXBba2V5XSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0PFY+KG1hcDogeyBba2V5OiBzdHJpbmddOiBWIH0sIGtleTogc3RyaW5nLCB2YWx1ZTogVikge1xuICAgICAgICBtYXBba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzRW1wdHkobWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gbWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZShtYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGtleTogc3RyaW5nKSB7XG4gICAgICAgIGRlbGV0ZSBtYXBba2V5XTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZm9yRWFjaDxLLCBWPihtYXA6IHsgW2tleTogc3RyaW5nXTogViB9LCBjYWxsYmFjazogKHY6IFYsIEs6IHN0cmluZykgPT4gdm9pZCkge1xuICAgICAgICBmb3IgKGxldCBrIG9mIE9iamVjdC5rZXlzKG1hcCkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG1hcFtrXSwgayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbWVyZ2U8Vj4obTE6IHsgW2tleTogc3RyaW5nXTogViB9LCBtMjogeyBba2V5OiBzdHJpbmddOiBWIH0pOiB7IFtrZXk6IHN0cmluZ106IFYgfSB7XG4gICAgICAgIGxldCBtOiB7IFtrZXk6IHN0cmluZ106IFYgfSA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGsgb2YgT2JqZWN0LmtleXMobTEpKSB7XG4gICAgICAgICAgICBtW2tdID0gbTFba107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBrIG9mIE9iamVjdC5rZXlzKG0yKSkge1xuICAgICAgICAgICAgbVtrXSA9IG0yW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFsczxWPihtMTogeyBba2V5OiBzdHJpbmddOiBWIH0sIG0yOiB7IFtrZXk6IHN0cmluZ106IFYgfSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgazEgPSBPYmplY3Qua2V5cyhtMSk7XG4gICAgICAgIGxldCBrMiA9IE9iamVjdC5rZXlzKG0yKTtcbiAgICAgICAgaWYgKGsxLmxlbmd0aCAhPT0gazIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGtleTogYW55IC8qKiBUT0RPICM/Pz8/ICovO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGsxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrZXkgPSBrMVtpXTtcbiAgICAgICAgICAgIGlmIChtMVtrZXldICE9PSBtMltrZXldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufVxuXG4vKipcbiAqIEEgYm9vbGVhbi12YWx1ZWQgZnVuY3Rpb24gb3ZlciBhIHZhbHVlLCBwb3NzaWJseSBpbmNsdWRpbmcgY29udGV4dCBpbmZvcm1hdGlvblxuICogcmVnYXJkaW5nIHRoYXQgdmFsdWUncyBwb3NpdGlvbiBpbiBhbiBhcnJheS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcmVkaWNhdGU8VD4ge1xuICAgICh2YWx1ZTogVCwgaW5kZXg/OiBudW1iZXIsIGFycmF5PzogVFtdKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIExpc3RXcmFwcGVyIHtcbiAgICAvLyBKUyBoYXMgbm8gd2F5IHRvIGV4cHJlc3MgYSBzdGF0aWNhbGx5IGZpeGVkIHNpemUgbGlzdCwgYnV0IGRhcnQgZG9lcyBzbyB3ZVxuICAgIC8vIGtlZXAgYm90aCBtZXRob2RzLlxuICAgIHN0YXRpYyBjcmVhdGVGaXhlZFNpemUoc2l6ZTogbnVtYmVyKTogYW55W10ge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5KHNpemUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVHcm93YWJsZVNpemUoc2l6ZTogbnVtYmVyKTogYW55W10ge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5KHNpemUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbG9uZTxUPihhcnJheTogVFtdKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LnNsaWNlKDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBmb3JFYWNoV2l0aEluZGV4PFQ+KGFycmF5OiBUW10sIGZuOiAodDogVCwgbjogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZuKGFycmF5W2ldLCBpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBmaXJzdDxUPihhcnJheTogVFtdKTogVCB7XG4gICAgICAgIGlmICghYXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGxhc3Q8VD4oYXJyYXk6IFRbXSk6IFQge1xuICAgICAgICBpZiAoIWFycmF5IHx8IGFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbmRleE9mPFQ+KGFycmF5OiBUW10sIHZhbHVlOiBULCBzdGFydEluZGV4OiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUsIHN0YXJ0SW5kZXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluczxUPihsaXN0OiBUW10sIGVsOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoZWwpICE9PSAtMTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjb250YWluc0FsbDxUPihsaXN0OiBUW10sIGVsczogVFtdKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBlbHMubWFwKGZ1bmN0aW9uIChuZWVkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YobmVlZGxlKTtcbiAgICAgICAgfSkuaW5kZXhPZigtMSkgPT09IC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluc0NvbXBsZXgobGlzdDogQXJyYXk8YW55PiwgaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBsaXN0LmZpbmRJbmRleChlbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKGVsLCBpdGVtKTtcbiAgICAgICAgfSkgPiAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluZEluZGV4Q29tcGxleChsaXN0OiBBcnJheTxhbnk+LCBpdGVtOiBhbnkpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpbmRleCA9IGxpc3QuZmluZEluZGV4KGVsID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcXVhbHMoZWwsIGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgcmVtb3ZlSWZFeGlzdChsaXN0OiBBcnJheTxhbnk+LCBpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBsaXN0LmZpbmRJbmRleChlbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKGVsLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZUF0PGFueT4obGlzdCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJldmVyc2VkPFQ+KGFycmF5OiBUW10pOiBUW10ge1xuICAgICAgICBsZXQgYSA9IExpc3RXcmFwcGVyLmNsb25lKGFycmF5KTtcbiAgICAgICAgcmV0dXJuIGEucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb25jYXQoYTogYW55W10sIGI6IGFueVtdKTogYW55W10ge1xuICAgICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gICAgfVxuXG4gICAgc3RhdGljIGluc2VydDxUPihsaXN0OiBUW10sIGluZGV4OiBudW1iZXIsIHZhbHVlOiBUKSB7XG4gICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUF0PFQ+KGxpc3Q6IFRbXSwgaW5kZXg6IG51bWJlcik6IFQge1xuICAgICAgICBsZXQgcmVzID0gbGlzdFtpbmRleF07XG4gICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlQWxsPFQ+KGxpc3Q6IFRbXSwgaXRlbXM6IFRbXSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBsaXN0LmluZGV4T2YoaXRlbXNbaV0pO1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZTxUPihsaXN0OiBUW10sIGVsOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBpbmRleCA9IGxpc3QuaW5kZXhPZihlbCk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUxhc3Q8VD4oYXJyYXk6IFRbXSk6IHZvaWQge1xuICAgICAgICBpZiAoIWFycmF5IHx8IGFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXkuc3BsaWNlKGFycmF5Lmxlbmd0aCAtIDEpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNsZWFyKGxpc3Q6IGFueVtdKSB7XG4gICAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNFbXB0eShsaXN0OiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbGlzdC5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbGwobGlzdDogYW55W10sIHZhbHVlOiBhbnksIHN0YXJ0OiBudW1iZXIgPSAwLCBlbmQ6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgbGlzdC5maWxsKHZhbHVlLCBzdGFydCwgZW5kID09PSBudWxsID8gbGlzdC5sZW5ndGggOiBlbmQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbHMoYTogYW55W10sIGI6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBzbGljZTxUPihsOiBUW10sIGZyb206IG51bWJlciA9IDAsIHRvOiBudW1iZXIgPSBudWxsKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIGwuc2xpY2UoZnJvbSwgdG8gPT09IG51bGwgPyB1bmRlZmluZWQgOiB0byk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNwbGljZTxUPihsOiBUW10sIGZyb206IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpOiBUW10ge1xuICAgICAgICByZXR1cm4gbC5zcGxpY2UoZnJvbSwgbGVuZ3RoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc29ydDxUPihsOiBUW10sIGNvbXBhcmVGbj86IChhOiBULCBiOiBUKSA9PiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChjb21wYXJlRm4pKSB7XG4gICAgICAgICAgICBsLnNvcnQoY29tcGFyZUZuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwuc29ydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgc29ydEJ5RXhhbXBsZSh0b1NvcnQ6IHN0cmluZ1tdLCBwYXR0ZXJuOiBzdHJpbmdbXSkge1xuICAgICAgICB0b1NvcnQuc29ydCgoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleEEgPSBwYXR0ZXJuLmluZGV4T2YoYSkgPT09IC0xID8gMTAgOiBwYXR0ZXJuLmluZGV4T2YoYSk7XG4gICAgICAgICAgICBsZXQgaW5kZXhCID0gcGF0dGVybi5pbmRleE9mKGIpID09PSAtMSA/IDEwIDogcGF0dGVybi5pbmRleE9mKGIpO1xuXG4gICAgICAgICAgICByZXR1cm4gaW5kZXhBIC0gaW5kZXhCO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9TdHJpbmc8VD4obDogVFtdKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG91dCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGwpIHtcbiAgICAgICAgICAgIG91dCArPSBpdGVtLnRvU3RyaW5nKCkgKyAnLCAgJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyB0b0pTT048VD4obDogVFtdKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGwpO1xuICAgIH1cblxuICAgIHN0YXRpYyBtYXhpbXVtPFQ+KGxpc3Q6IFRbXSwgcHJlZGljYXRlOiAodDogVCkgPT4gbnVtYmVyKTogVCB7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNvbHV0aW9uOiBhbnkgLyoqIFRPRE8gIz8/Pz8gKi8gPSBudWxsO1xuICAgICAgICBsZXQgbWF4VmFsdWUgPSAtSW5maW5pdHk7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IGxpc3RbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsoY2FuZGlkYXRlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNhbmRpZGF0ZVZhbHVlID0gcHJlZGljYXRlKGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlVmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHNvbHV0aW9uID0gY2FuZGlkYXRlO1xuICAgICAgICAgICAgICAgIG1heFZhbHVlID0gY2FuZGlkYXRlVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvbHV0aW9uO1xuICAgIH1cblxuICAgIHN0YXRpYyBmbGF0dGVuPFQ+KGxpc3Q6IEFycmF5PFQgfCBUW10+KTogVFtdIHtcbiAgICAgICAgbGV0IHRhcmdldDogYW55W10gPSBbXTtcbiAgICAgICAgX2ZsYXR0ZW5BcnJheShsaXN0LCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFsbEVsZW1lbnRzQXJlU3RyaW5nczxUPihsaXN0OiBBcnJheTxUIHwgVFtdPik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdGFyZ2V0OiBhbnlbXSA9IExpc3RXcmFwcGVyLmZsYXR0ZW4obGlzdCk7XG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAoIWlzU3RyaW5nKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZEFsbDxUPihsaXN0OiBBcnJheTxUPiwgc291cmNlOiBBcnJheTxUPik6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGlzdC5wdXNoKHNvdXJjZVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0b2RvOiBjaGVjayBpZiB0aGlzIGhhbmRsZXMgb2JqZWN0cyB3aXRoIGNvbnRhaW5zXG4gICAgc3RhdGljIGFkZEVsZW1lbnRJZkFic2VudDxUPihsaXN0OiBBcnJheTxUPiwgZWxlbWVudDogVCk6IHZvaWQge1xuXG4gICAgICAgIGxldCBjb250YWlucyA9IENvbGxlY3Rpb25zLmFycmF5cy5jb250YWlucyhsaXN0LCBlbGVtZW50LCAoaXRlbTE6IGFueSwgaXRlbTI6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoaXRlbTFbJ2VxdWFsc1RvJ10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTFbJ2VxdWFsc1RvJ10oaXRlbTIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbTEgPT09IGl0ZW0yO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFjb250YWlucykge1xuICAgICAgICAgICAgbGlzdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgYWRkRWxlbWVudHNJZkFic2VudDxUPihsaXN0OiBBcnJheTxUPiwgZWxlbWVudHM6IFRbXSk6IHZvaWQge1xuXG5cbiAgICAgICAgaWYgKGlzQmxhbmsoZWxlbWVudHMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBlbGVtIG9mIGVsZW1lbnRzKSB7XG5cbiAgICAgICAgICAgIGxldCBjb250YWlucyA9IENvbGxlY3Rpb25zLmFycmF5cy5jb250YWlucyhsaXN0LCBlbGVtLCAoaXRlbTE6IGFueSwgaXRlbTI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtMVsnZXF1YWxzVG8nXSAmJiBpdGVtMlsnZXF1YWxzVG8nXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTFbJ2VxdWFsc1RvJ10oaXRlbTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTEgPT09IGl0ZW0yO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5zKSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY29weVZhbHVlPFQ+KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXBXcmFwcGVyLmNsb25lKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLmNsb25lKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxufVxuXG5mdW5jdGlvbiBfZmxhdHRlbkFycmF5KHNvdXJjZTogYW55W10sIHRhcmdldDogYW55W10pOiBhbnlbXSB7XG4gICAgaWYgKGlzUHJlc2VudChzb3VyY2UpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNvdXJjZVtpXTtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgX2ZsYXR0ZW5BcnJheShpdGVtLCB0YXJnZXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpc3RMaWtlSXRlcmFibGUob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIWlzSnNPYmplY3Qob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc0FycmF5KG9iaikgfHxcbiAgICAgICAgKCEob2JqIGluc3RhbmNlb2YgTWFwKSAmJiAgICAgIC8vIEpTIE1hcCBhcmUgaXRlcmFibGVzIGJ1dCByZXR1cm4gZW50cmllcyBhcyBbaywgdl1cbiAgICAgICAgICAgIGdldFN5bWJvbEl0ZXJhdG9yKCkgaW4gb2JqKTsgIC8vIEpTIEl0ZXJhYmxlIGhhdmUgYSBTeW1ib2wuaXRlcmF0b3IgcHJvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJlSXRlcmFibGVzRXF1YWwoYTogYW55LCBiOiBhbnksIGNvbXBhcmF0b3I6IEZ1bmN0aW9uKTogYm9vbGVhbiB7XG4gICAgbGV0IGl0ZXJhdG9yMSA9IGFbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTtcbiAgICBsZXQgaXRlcmF0b3IyID0gYltnZXRTeW1ib2xJdGVyYXRvcigpXSgpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGV0IGl0ZW0xID0gaXRlcmF0b3IxLm5leHQoKTtcbiAgICAgICAgbGV0IGl0ZW0yID0gaXRlcmF0b3IyLm5leHQoKTtcbiAgICAgICAgaWYgKGl0ZW0xLmRvbmUgJiYgaXRlbTIuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0xLmRvbmUgfHwgaXRlbTIuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29tcGFyYXRvcihpdGVtMS52YWx1ZSwgaXRlbTIudmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpdGVyYXRlTGlzdExpa2Uob2JqOiBhbnksIGZuOiBGdW5jdGlvbikge1xuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZuKG9ialtpXSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaXRlcmF0b3IgPSBvYmpbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTtcbiAgICAgICAgbGV0IGl0ZW06IGFueSAvKiogVE9ETyAjPz8/PyAqLztcbiAgICAgICAgd2hpbGUgKCEoKGl0ZW0gPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpKSB7XG4gICAgICAgICAgICBmbihpdGVtLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZmluZExhc3Q8VD4oYXJyOiBUW10sIGNvbmRpdGlvbjogKHZhbHVlOiBUKSA9PiBib29sZWFuKTogVCB8IG51bGwge1xuICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbihhcnJbaV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG4vLyBTYWZhcmkgYW5kIEludGVybmV0IEV4cGxvcmVyIGRvIG5vdCBzdXBwb3J0IHRoZSBpdGVyYWJsZSBwYXJhbWV0ZXIgdG8gdGhlXG4vLyBTZXQgY29uc3RydWN0b3IuICBXZSB3b3JrIGFyb3VuZCB0aGF0IGJ5IG1hbnVhbGx5IGFkZGluZyB0aGUgaXRlbXMuXG5sZXQgY3JlYXRlU2V0RnJvbUxpc3Q6IHsgKGxzdDogYW55W10pOiBTZXQ8YW55PiB9ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdGVzdCA9IG5ldyBTZXQoWzEsIDIsIDNdKTtcbiAgICBpZiAodGVzdC5zaXplID09PSAzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVTZXRGcm9tTGlzdElubmVyKGxzdDogYW55W10pOiBTZXQ8YW55PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldChsc3QpO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVTZXRBbmRQb3B1bGF0ZUZyb21MaXN0KGxzdDogYW55W10pOiBTZXQ8YW55PiB7XG4gICAgICAgICAgICBsZXQgcmVzID0gbmV3IFNldChsc3QpO1xuICAgICAgICAgICAgaWYgKHJlcy5zaXplICE9PSBsc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmFkZChsc3RbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH07XG4gICAgfVxufSkoKTtcblxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGlvblRva2VuLCBJbmplY3RvciwgaXNEZXZNb2RlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Qm9vbGVhbldyYXBwZXIsIGlzUHJlc2VudCwgTnVtYmVyV3JhcHBlciwgcmVhZEdsb2JhbFBhcmFtfSBmcm9tICcuLi91dGlscy9sYW5nJztcbmltcG9ydCB7TWFwV3JhcHBlcn0gZnJvbSAnLi4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICcuL2Vudmlyb25tZW50JztcblxuXG4vKipcbiAqIFNpbmNlIG9uIGVudGVycHJpc2UgbGV2ZWwgd2UgbmVlZCB0byBzdXBwb3J0IGFsbCBhdmFpbGFibGUgbG9jYWxlcyBhcyB1c2VyIG1pZ2h0IGNoYW5nZVxuICogdG8gZGlmZmVyZW50IGxhbmcgYW55dGltZSB3ZSBuZWVkIHRvIGltcG9ydCBhbGwgZXhwZWN0ZWQgbG9jYWxlcyB0aGF0IHdlIHdhbnQgdG8gc3VwcG9ydC5cbiAqXG4gKiBOb3RlOiAgUmVtZW1iZXIgd2hlbiB5b3Ugd2FudCB0byBzdXBwb3J0IG1vcmUgbG9jYWxlcyB5b3UgbmVlZCB0byBpbXBvcnQgdGhlbSBhbmQgcmVnaXN0ZXJcbiAqIHRoZW0gdXNpbmcgcmVnaXN0ZXJMb2NhbGVEYXRhXG4gKi9cbmV4cG9ydCBjb25zdCBBcHBDb25maWdUb2tlbiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdBcHAuQ29uZmlnJyk7XG5cbmNvbnN0IFN1cG9ydGVkTGFuZ3VhZ2VzID0gWydlbicsICdmciddO1xuXG5cbi8qKlxuICogU2ltcGxlIENvbmZpZ3VyYXRpb24gaW1wbGVtZW50YXRpb24gIHdoaWNoIGxldCB1cyBjb25maWd1cmUgYXBwbGljYXRpb24gZHVyaW5nIGEgYm9vdHN0cmFwXG4gKiBwaGFzZS4gWW91IGNhbiBwYXNzIHZhbHVlcyBpbiAzIGRpZmZlcmVudCB3YXlzXG4gKlxuICogMSkgVXNpbmcgaW1wb3J0IC0gYXQgdGhlIHRpbWUgeW91IGltcG9ydCB5b3VyIG1vZHVsZVxuICogMikgaW5qZWN0ZWQgYXMgc2VydmljZSBhbmQgeW91IGNhbiBzZXQgdmFsdWVzXG4gKiAzKSBGcm9tIFNjcmlwdCB0YWcgb3IgZ2xvYmFsbHkgZGVmaW5lZCBWQVIgZHVyaW5nIGEgZGVwbG95bWVudFxuICpcbiAqXG4gKiBUaGVyZSBpcyBhbHNvIGZyb20gVVJMIG9wdGlvbiB0aGF0IGlzIGZvciBub3cgdGVtcG9yYXJ5IGRpc2FibGVkLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEFwcENvbmZpZyB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBub3QgcmVndWxhciBlbnYuIHBhcmFtIHdlIHVzZSB0aGlzIHRvIHF1ZXJ5IGdsb2JhbCB2YXIgdGhhdCBjYW4gYmUgYXR0YWNoZWQgdG9cbiAgICAgKiB3aW5kb3cgdG8gcmVhZCBlbnYuIHNldHRpbmdzIHRoYXQgY2FuIGJlIGluamVjdGVkIGJ5IHNlcnZlclxuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IEFwcENvbmZpZ0dsb2JhbFZhciA9ICdBcHBDb25maWdHbG9iYWwnO1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IElzRGV2TW9kZSA9ICdkZXZtb2RlLmVuYWJsZWQnO1xuICAgIHN0YXRpYyByZWFkb25seSBVc2VyQWdlbnQgPSAndXNlcmFnZW50JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTGFuZyA9ICdsYW5nJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgU3VwcG9ydGVkTGFuZ3MgPSAnc3VwcG9ydGVkbGFuZyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IERpcmVjdGlvbiA9ICdkaXInO1xuICAgIHN0YXRpYyByZWFkb25seSBOYXZQbGF0Zm9ybSA9ICdwbGF0Zm9ybSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IGkxOG5FbmFibGVkID0gJ2kxOG4uZW5hYmxlZCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEFwcFRpdGxlID0gJ2FwcC50aXRsZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFJlc3RBcGlDb250ZXh0VXJsID0gJ3Jlc3RhcGkuY29udGV4dCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFJlc3RBcGlIb3N0VXJsID0gJ3Jlc3RhcGkuaG9zdCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbnRlbnRUeXBlID0gJ2NvbnRlbnQtdHlwZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25SZXRyeUludGVydmFsID0gJ2Nvbm5lY3Rpb24ucmV0cnknO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uQWJvcnRUaW1lb3V0ID0gJ2Nvbm5lY3Rpb24uYWJvcnQtdGltZW91dCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25Vc2VNb2NrU2VydmVyID0gJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIuZW5hYmxlZCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25Nb2NrU2VydmVyUGF0aCA9ICdjb25uZWN0aW9uLm1vY2stc2VydmVyLnBhdGgnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uTW9ja1NlcnZlclJvdXRlcyA9ICdjb25uZWN0aW9uLm1vY2stc2VydmVyLnJvdXRlcyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IERvbWFpblVuaXF1ZU5hbWUgPSAnZG9tYWluLnVuaXF1ZW5hbWUnO1xuICAgIHN0YXRpYyByZWFkb25seSBEb21haW5RdWVyeSA9ICdkb21haW4udW5pcXVlbmFtZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEFzc2V0Rm9sZGVyID0gJ2Fzc2V0LWZvbGRlcic7XG4gICAgc3RhdGljIHJlYWRvbmx5IEluVGVzdCA9ICdlbnYudGVzdCc7XG5cbiAgICAvKipcbiAgICAgKiBTaW5jZSB3ZSB1bmFibGUgdG8gY2hhbmdlIGFuZCBzaW11bGF0ZSBVUkwgZHVyaW5nIG5nIHRlc3QgYnV0IHN0aWxsIHdlIG5lZWQgdG8gYmUgYWJsZSB0b1xuICAgICAqIHRlc3QgdGhpcyBVUkwgcGFyc2luZyBsb2dpYyB0aGVuIGp1c3QgZm9yIGEgVGVzdCBwdXJwb3NlcyB0aGlzIGBlbnYudGVzdC51cmxgIHByb3BlcnR5XG4gICAgICogd2lsbCBiZSB1c2VkIHRvIHBhc3MgdXJsIGR1cmluZyBhIHRlc3QuXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IEluVGVzdFVybCA9ICdlbnYudGVzdC51cmwnO1xuXG4gICAgcHJpdmF0ZSB2YWx1ZXM6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgLy8gcHJpdmF0ZSBxdWVyeVZhbHVlczogTWFwPHN0cmluZywgIGFueT47XG5cblxuICAgIHRlc3RVcmw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpbmplY3RvcjogSW5qZWN0b3IsIHB1YmxpYyBlbnZpcm9ubWVudDogRW52aXJvbm1lbnQpIHtcbiAgICAgICAgLy8gd2UgZXhwZWN0IHRoZXJlIHdpbGwgYmUgYWx3YXlzIHdpbmRvdyBhdmFpbGFibGUuXG4gICAgICAgIHRoaXMudmFsdWVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgLy8gdGhpcy5xdWVyeVZhbHVlcyA9IG5ldyBNYXA8c3RyaW5nLCAgYW55PigpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDYWxsZWQgYnkgZmFjdG9yeSBtZXRob2QgdG8gaW5pdGlhbGl6ZSB0aGlzIGNvbmZpZyBjbGFzc1xuICAgICAqXG4gICAgICovXG4gICAgaW5pdChjb25maWc6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdHMoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChjb25maWcpKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+ID0gTWFwV3JhcHBlci5jcmVhdGVGcm9tU3RyaW5nTWFwPGFueT4oY29uZmlnKTtcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKCh2OiBhbnksIGs6IGFueSkgPT4gdGhpcy5zZXQoaywgdikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudC5zZXRWYWx1ZShBcHBDb25maWcuQXNzZXRGb2xkZXIsIHRoaXMuZ2V0KEFwcENvbmZpZy5Bc3NldEZvbGRlcikpO1xuXG4gICAgICAgIGxldCBsb2NhdGlvbjogYW55ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQuaW5UZXN0KSB7XG4gICAgICAgICAgICBsb2NhdGlvbiA9IHRoaXMuZ2V0KEFwcENvbmZpZy5JblRlc3RVcmwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKGlzUHJlc2VudChsb2NhdGlvbikpIHtcbiAgICAgICAgLy8gICAgIHRoaXMucGFyc2VRdWVyeVBhcm1zKGxvY2F0aW9uKTtcbiAgICAgICAgLy8gfVxuXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCByZWFkIGdsb2JhbGx5IGluc2VydGVkIHNjcmlwdHMgdG8gaW5pdGlhbGl6ZSBhcHBsaWNhdGlvbiBmcm9tIHRoZSBzZXJ2ZXIgc2lkZS5cbiAgICAgKiBUaGUgc2NyaXB0IGNhbiBkaXJlY3RseSBkZWNsYXJlIHRoZSB2YXJpYWJsZXMgOlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAgIDxzY3JpcHQ+XG4gICAgICogICAgICB2YXIgQXBwQ29uZmlnR2xvYmFsID0ge1xuICAgICAqICAgICAgICAgICAgICAgJ2FwcC5wcm8xJzogJ3ZhbHVlMScsXG4gICAgICogICAgICAgICAgICAgICAnYXBwLnBybzInOiAndmFsdWUyJyxcbiAgICAgKiAgICAgICAgICAgICAgICdsYW5nJzogJ2NoJ1xuICAgICAqICAgICAgfTtcbiAgICAgKiAgPC9zY3JpcHQ+XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAgIG9yIGl0IGNhbiBiZSBpbmNsdWRlZCBvbiB0aGUgaW5kZXguaHRtbCBwYWdlIGR1cmluZyBidWlsZCB0aW1lLlxuICAgICAqXG4gICAgICogICBXZSBleHBlY3QgdGhhdCB3aWxsIGZpbmQgdGhlIGBBcHBDb25maWdHbG9iYWxgXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHBhcnNlR2xvYmFsUGFyYW1zKCk6IHZvaWQge1xuICAgICAgICBsZXQgZ2xvYmFsQ29uZmlnOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IHJlYWRHbG9iYWxQYXJhbShBcHBDb25maWcuQXBwQ29uZmlnR2xvYmFsVmFyKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChnbG9iYWxDb25maWcpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gZ2xvYmFsQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMuc2V0KGtleS50b0xvd2VyQ2FzZSgpLCBnbG9iYWxDb25maWdba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWVzIHRvIGNvbmZpZ3VyYXRpb24uIHRvIG1ha2Ugc3VyZSB3ZSB3aWxsIG5vdCBydW4gaW50byBjYXNlLXNlbnNpdGl2ZSBwcm9ibGVtcyB3ZVxuICAgICAqIGFyZSBjb252ZXJ0aW5nIGFsbCBrZXlzIGludG8gbG93ZXJjYXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZXMuc2V0KGtleS50b0xvd2VyQ2FzZSgpLCB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSBBcHBDb25maWcuSW5UZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50LmluVGVzdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlcyB0byBjb25maWd1cmF0aW9uXG4gICAgICogdG9kbzogZG9udCBkbyBhbGwgdGhpcyB3aXRoIHRoaXMgaGFja3kgd2F5LiBqdXN0IGlmIHlvdSBuZWVkIHRvIGNoZWNrIGNhc2Ugc2Vuc2l0aXZpdHksIHRoZW5cbiAgICAgKiBzaW1wbHkgbWFwIGtleXMgZnJvbSB0aGlzLnZhbHVlcyBpbnRvIGxvd2VyY2FzZSBhbmQgdGhlbiBjaGVjayBpZiBpdCBoYXMgYSBrZXlcbiAgICAgKi9cbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZXMuaGFzKGtleS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmdldChrZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICBnZXROdW1iZXIoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIE51bWJlcldyYXBwZXIucGFyc2VJbnRBdXRvUmFkaXgodmFsKTtcbiAgICB9XG5cblxuICAgIGdldEJvb2xlYW4oa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZSh2YWwpO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqXG4gICAgLy8gICogQ2FsbGVkIGR1cmluZyBpbnN0YW50aWF0aW9uIGFuZCBpdCByZWFkIHF1ZXJ5IHBhcmFtcyBpZiBhbnkgYW5kIHVzZSB0aGVtIGFzXG4gICAgLy8gY29uZmlndXJhdGlvbi5cbiAgICAvLyAgKiBXZSBtaWdodCB3YW50IHRvIGZvcmNlIHRvIHByZWZpeCBlYWNoIHBhcmFtIHdpdGggZW52LiB0byBtYWtlIHN1cmUgd2UgZG8gbm90IHN0b3JlXG4gICAgLy8gZXZlcnl0aGluZyAqICovIHByaXZhdGUgcGFyc2VRdWVyeVBhcm1zKHVybDogc3RyaW5nKSB7ICBsZXQgdXJsU2VyaWFsaXplciA9IG5ld1xuICAgIC8vIERlZmF1bHRVcmxTZXJpYWxpemVyKCk7IGxldCB1cmxUcmVlID0gdXJsU2VyaWFsaXplci5wYXJzZSh1cmwpOyAgaWZcbiAgICAvLyAoaXNQcmVzZW50KHVybFRyZWUucXVlcnlQYXJhbXMpKSB7ICBmb3IgKGxldCBrZXkgaW4gdXJsVHJlZS5xdWVyeVBhcmFtcykge1xuICAgIC8vIHRoaXMucXVlcnlWYWx1ZXMuc2V0KGtleS50b0xvd2VyQ2FzZSgpLCB1cmxUcmVlLnF1ZXJ5UGFyYW1zW2tleV0pOyB9IH0gfVxuXG4gICAgcHJpdmF0ZSBpbml0RGVmYXVsdHMoKSB7XG5cbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLklzRGV2TW9kZSwgaXNEZXZNb2RlKCkpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuVXNlckFnZW50LCB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5EaXJlY3Rpb24sIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXIpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuTmF2UGxhdGZvcm0sIHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29udGVudFR5cGUsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uUmV0cnlJbnRlcnZhbCwgNTAwKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25Vc2VNb2NrU2VydmVyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uTW9ja1NlcnZlclBhdGgsICcvbW9jay1yb3V0aW5nJyk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5pMThuRW5hYmxlZCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5JblRlc3QsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkRvbWFpblVuaXF1ZU5hbWUsICd1bmlxdWVOYW1lJyk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Eb21haW5RdWVyeSwgJ3EnKTtcblxuICAgICAgICBpZiAodGhpcy5lbnZpcm9ubWVudC5pblRlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uQWJvcnRUaW1lb3V0LCA1MDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25BYm9ydFRpbWVvdXQsIDgwMDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Bc3NldEZvbGRlciwgJ2Fzc2V0cycpO1xuXG4gICAgICAgIGlmICghdGhpcy52YWx1ZXMuaGFzKEFwcENvbmZpZy5MYW5nKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkxhbmcsIHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlcy5oYXMoQXBwQ29uZmlnLlN1cHBvcnRlZExhbmdzKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLlN1cHBvcnRlZExhbmdzLCBTdXBvcnRlZExhbmd1YWdlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldFJlc3RBcGlDb250ZXh0VXJsKGVudGl0eTogc3RyaW5nLCBpc05lc3RlZDogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG5lc3RlZEZsYWcgPSBpc05lc3RlZCA/ICckJyA6ICcnO1xuICAgICAgICBsZXQgd2l0aEVudGl0eSA9IGAke0FwcENvbmZpZy5SZXN0QXBpQ29udGV4dFVybH0uJHtuZXN0ZWRGbGFnfSR7ZW50aXR5fWA7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdldCh3aXRoRW50aXR5KSB8fCB0aGlzLmdldChBcHBDb25maWcuUmVzdEFwaUNvbnRleHRVcmwpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodXJsKSkge1xuICAgICAgICAgICAgaWYgKC9cXC8kL2cudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXN0IEFQSVVyaSBpcyBub3QgY29uZmlndXJlZCcpO1xuICAgIH1cblxuXG4gICAgZ2V0UmVzdEFwaUNvbnRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KEFwcENvbmZpZy5SZXN0QXBpQ29udGV4dFVybCkgfHwgJyc7XG4gICAgfVxuXG4gICAgZ2V0UmVzdEFwaUhvc3QoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KEFwcENvbmZpZy5SZXN0QXBpSG9zdFVybCkgfHwgJyc7XG4gICAgfVxuXG4gICAgaXNQcm9kdWN0aW9uTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmdldEJvb2xlYW4oQXBwQ29uZmlnLklzRGV2TW9kZSk7XG4gICAgfVxuXG4gICAgZ2V0QmFzZVVybCgpIHtcbiAgICAgICAgY29uc3QgaXNNb2NrZWQgPSB0aGlzLmdldEJvb2xlYW4oQXBwQ29uZmlnLkNvbm5lY3Rpb25Vc2VNb2NrU2VydmVyKTtcbiAgICAgICAgY29uc3QgY254ID0gdGhpcy5nZXRSZXN0QXBpQ29udGV4dCgpO1xuICAgICAgICBjb25zdCBob3N0ID0gdGhpcy5nZXRSZXN0QXBpSG9zdCgpIHx8ICcnO1xuXG4gICAgICAgIGlmIChpc01vY2tlZCkge1xuICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gdGhpcy5nZXQoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBgJHtwcmVmaXh9JHtjbnggfHwgJy8nfWA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXJsID0gYCR7aG9zdH0ke2NueCB8fCAnLyd9YDtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgYnkgZmFjdG9yeSBtZXRob2QgaW5zaWRlciBBUFBfSU5JVElBTElaRVIgdG8gcHJlLWxvYWQgaTE4biBzdXBwb3J0XG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0aWFsaXplSTE4bigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgcHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHVzZWQgYnkgQ29yZU1vZHVsZSBpbiBvcmRlciB0byBpbnN0YW50aWF0ZSBBcHBDb25maWcgcHJvdmlkZXJcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlQ29uZmlnKGNvbmZpZzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52OiBFbnZpcm9ubWVudCk6IEFwcENvbmZpZyB7XG4gICAgLy8gd2hlbiBlbXB0eSB3ZSBhc3VtZSB3ZSBhcmUgaW4gVGVzdC4gQXBwbGljYXRpb24gc2hvdWxkIGFsd2F5cyBoYXZlIHNvbWUgYmFzaWMgaW5pdGlhbGl6YXRpb25cbiAgICAvLyB0b2RvOiBOZWVkIHRvIGdldCBiYWNrIHRvIHRoaXMgYXMgdGhpcyBpcyB0ZW1wb3JhcnkuXG5cbiAgICBsZXQgY29uZjogQXBwQ29uZmlnID0gbmV3IEFwcENvbmZpZyhpbmplY3RvciwgZW52KTtcbiAgICBjb25mLmluaXQoY29uZmlnKTtcbiAgICByZXR1cm4gY29uZjtcbn1cblxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnLi4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge2Fzc2VydH0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5cblxuLyoqXG4gKiBFbnZpcm9ubWVudCBpcyBzaGFyYWJsZSBzdGF0ZSBiZXR3ZWVuIGNvbXBvbmVudHMgYW5kIGl0cyBpbmplY3RlZCBhdCB0aGUgcm9vdCBsZXZlbCBhbmRcbiAqIHRoZSBzYW1lIGluc3RhbmNlIGFjY2Vzc2libGUgZG93biB0aGUgY29tcG9uZW50IHRyZWUuXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRcbntcblxuICAgIC8qKlxuICAgICAqIEtlZXAgQ3VycmVudCBMb2NhbGUuIEluaXRpYWxpemVkIGZyb20gQXBwQ29uZmlnIGFsb25nIHdpdGggaTE4biBzdXBwb3J0XG4gICAgICovXG4gICAgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgYnkgY29tcG9uZW50IHRvIHNhdmUgc2F2ZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgZm9yIHByb2Nlc3NpbmcgYW5kIGl0cyByZW5kZXJpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIGVudlZhcmlhYmxlczogTWFwPHN0cmluZywgYW55PjtcblxuXG4gICAgLyoqXG4gICAgICogU2ltcGxlIHN0YWNrLWxpa2Ugc3RvcmFnZSB3aGVyZSB3ZSBuZWVkIHRvIGEga2VlcCBoaXN0b3J5XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGFja3NWYXJpYWJsZXM6IE1hcDxzdHJpbmcsIGFueVtdPjtcblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBwcm9wZXJ0aWVzIGZvciBkZWJ1Z2dpbmcgYW5kIHRlc3RpbmcgcHVycG9zZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGlzUHNldWRvTG9jYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaW5UZXN0OiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGN1cnJlbnQgUGFnZSBGb3JtR3JvdXAgU3RhdGUgdGhhdCBuZWVkIHRvIGJlIHNoYXJlZCBkb3duIGFjcm9zcyBjb21wb25lbnRzXG4gICAgICovXG4gICAgY3VycmVudEZvcm06IEZvcm1Hcm91cDtcblxuICAgIC8qKlxuICAgICAqIEFuIEV2ZW50RW1pdHRlciB0byBsaXN0ZW4gdG8gbG9jYWxlIGNoYW5nZSBldmVudHNcbiAgICAgKi9cbiAgICBvbkxvY2FsZUNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIGlzUHJvZHVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZWdpc3RlciBhbmQgc2F2ZSByZWZlcmVuY2UgdG8gdXNlciBkZWZpbmVkIHJ1bGVzIGlmIGFueS4gWW91IG1pZ2h0IGRlZmluZSBpdHMgb3duIG1ldGFkYXRhXG4gICAgICogd2hlbiByZW5kZXJpbmcgVUkuXG4gICAgICovXG4gICAgdXNlclJ1bGVzOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGpzdXQgZm9yIGRlYnVnZ2luZyBwdXJwb3NlcyB0byBzYXZlIHNvbWUgdGVtcCBtZXNzYWdlIHRoYXQgSSBjYW4gdGhlbiB0cmFjZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGRlYnVnU3RyaW5nOiBzdHJpbmc7XG5cblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2xvY2FsZSA9ICdlbic7XG4gICAgICAgIHRoaXMuZW52VmFyaWFibGVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgdGhpcy5zdGFja3NWYXJpYWJsZXMgPSBuZXcgTWFwPHN0cmluZywgYW55W10+KCk7XG4gICAgfVxuXG5cbiAgICBnZXRWYWx1ZShrZXk6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZW52VmFyaWFibGVzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbnZWYXJpYWJsZXMuZ2V0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmVudlZhcmlhYmxlcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZGVsZXRlVmFsdWUoa2V5OiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmVudlZhcmlhYmxlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1ZhbHVlKGtleTogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52VmFyaWFibGVzLmhhcyhrZXkpO1xuICAgIH1cblxuICAgIGFsbFZhcmlhYmxlcygpOiBNYXA8c3RyaW5nLCBhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnZWYXJpYWJsZXM7XG4gICAgfVxuXG5cbiAgICBnZXQgbG9jYWxlKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICB9XG5cbiAgICBzZXQgbG9jYWxlKHZhbHVlOiBzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLl9sb2NhbGUgPSB2YWx1ZTtcblxuICAgICAgICAvLyBFbWl0IGxvY2FsZSBjaGFuZ2VkIGV2ZW50XG4gICAgICAgIHRoaXMub25Mb2NhbGVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcGVhazxUPihrZXk6IHN0cmluZyk6IFRcbiAgICB7XG4gICAgICAgIGxldCBzdGFjazogVFtdID0gdGhpcy5zdGFja3NWYXJpYWJsZXMuZ2V0KGtleSkgfHwgW107XG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5sYXN0PFQ+KHN0YWNrKTtcblxuICAgIH1cblxuXG4gICAgcG9wPFQ+KGtleTogc3RyaW5nKTogVFxuICAgIHtcbiAgICAgICAgbGV0IHN0YWNrOiBUW10gPSB0aGlzLnN0YWNrc1ZhcmlhYmxlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgYXNzZXJ0KHN0YWNrLmxlbmd0aCA+IDAsICcgQXR0ZW1wdCB0byBnZXQgdmFsdWUgZnJvbSBlbXB0eSBzdGFjaycpO1xuXG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5yZW1vdmVBdDxhbnk+KHN0YWNrLCBzdGFjay5sZW5ndGggLSAxKTtcbiAgICB9XG5cblxuICAgIHB1c2g8VD4oa2V5OiBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHN0YWNrOiBUW10gPSB0aGlzLnN0YWNrc1ZhcmlhYmxlcy5nZXQoa2V5KSB8fCBbXTtcbiAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc3RhY2tzVmFyaWFibGVzLnNldChrZXksIHN0YWNrKTtcbiAgICB9XG5cbn1cblxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5cbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICcuLi91dGlscy9sYW5nJztcblxuLyoqXG4gKiBUbyB1bmlmeSB0aGUgd29yayB3aXRoIGRvbWFpbiBvYmplY3RzIHdlIGhhdmUgdGhlc2Ugc2V0IG9mIGludGVyZmFjZXMgdGhhdCBlYWNoIEVudGl0eSBvciBWYWx1ZVxuICogbXVzdCB1c2UgdG8gbGV2ZXJhZ2Ugc29tZSBvZiB0aGUgZnVuY3Rpb25hbGl0eSB3ZSBoYXZlIGluIHRoZSBjb3JlXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvc2l0ZVR5cGVcbntcblxuICAgIGNsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICAkcHJvdG8/KCk6IENvbXBvc2l0ZVR5cGU7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJZGVudGl0eVxue1xuXG4gICAgaWRlbnRpdHkoKTogc3RyaW5nO1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVzZXJpYWxpemFibGVcbntcbiAgICBnZXRUeXBlcygpOiBhbnk7XG59XG5cblxuLyoqXG4gKiBFbnRpdHlDb21wb3NpdGUgaGF2aW5nIGlkZW50aXR5IHRoYXQgY2FuIGJlIGlkZW50aWZpZWQgaW4gdGhlIHN0b3JhZ2UgYnkgaXRzIElELiBFbnRpdGllcyBhcmVcbiAqIG11dGFibGUgb2JqZWN0c1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eSBleHRlbmRzIElkZW50aXR5LFxuICAgIERlc2VyaWFsaXphYmxlLFxuICAgIENvbXBvc2l0ZVR5cGVcbntcbn1cblxuLyoqXG4gKiA8bGk+Tm8gSWRlbnRpdHk8L2xpPlxuICogPGxpPkltbXV0YWJsZTwvbGk+XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWUgZXh0ZW5kcyBEZXNlcmlhbGl6YWJsZSxcbiAgICBDb21wb3NpdGVUeXBlXG57XG4gICAgLy8gZm9yIHVzZSBvZiB0eXBlIGd1YXJkIG9ubHksIGxhdGVyIG9uIHdlIGNhbiB1c2UgaXQgZm9yIHNvbWV0aGluZ1xuICAgIGNsb25lKCk6IFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRpdHkoZW50aXR5OiBhbnkpOiBlbnRpdHkgaXMgRW50aXR5XG57XG4gICAgcmV0dXJuIGlzUHJlc2VudChlbnRpdHkpICYmIGlzUHJlc2VudCgoPEVudGl0eT5lbnRpdHkpLmlkZW50aXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsdWUodmFsOiBhbnkpOiB2YWwgaXMgVmFsdWVcbntcbiAgICByZXR1cm4gaXNQcmVzZW50KHZhbCkgICYmIGlzUHJlc2VudCgoPFZhbHVlPnZhbCkuY2xvbmUpO1xufVxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIG9iamVjdFRvTmFtZX0gZnJvbSAnLi4vLi4vdXRpbHMvbGFuZyc7XG5cbmV4cG9ydCBlbnVtIFJlc3RTZWdtZW50VHlwZVxue1xuICAgIEhvc3QsXG4gICAgQ29udGV4dCxcbiAgICBBY3Rpb24sXG4gICAgUmVzb3VyY2UsXG4gICAgSWRlbnRpZmllcixcbiAgICBPZlBhcmVudFxufVxuXG5cbmV4cG9ydCBlbnVtIFJlc3RBY3Rpb25cbntcbiAgICBMb2FkLFxuICAgIFF1ZXJ5LFxuICAgIFNhdmUsXG4gICAgRG9cbn1cblxuXG4vKipcbiAqIFNldCBvZiBBU1QgbGlrZSBjbGFzc2VzIHRvIGtlZXAgdGhlIGZsdWVudCBBUEkgZ3JhbW1hciBpbiB0aGUgYWJzdHJhY3QgZm9ybWF0IHRvIGdpdmUgZGV2ZWxvcGVyc1xuICogY2hhbmdlcyB0byBwcm92aWRlIHRoZWlyIG93biBpbXBsZW1lbnRhdGlvblxuICpcbiAqIFRvZG86IEV4cG9zZSBCdWlsZGVyIGFzIGEgc2VydmljZVxuICpcbiAqL1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVXJsU2VnbWVudFxue1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBSZXN0U2VnbWVudFR5cGUsIHB1YmxpYyB2YWx1ZT86IGFueSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPiwgcHVibGljIHJhbms6IG51bWJlciA9IC0xKVxuICAgIHtcblxuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICB9XG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gJ1dyb25nIFJlc3QgU2VnbWVudCBvcmRlcic7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBIb3N0U2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5Ib3N0LCB2YWx1ZSwgcGFyYW1zLCA1KTtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChwcmV2U2VnbWVudCA9PSBudWxsLCB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gSG9zdCBzZWdtZW50IG11c3QgYmUgZmlyc3QhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIENvbnRleHRTZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLkNvbnRleHQsIHZhbHVlLCBwYXJhbXMsIDEwKTtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLkhvc3QsIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmFzc2VydE1zZygpfS4gLiBDb250ZXh0IHNlZ21lbnQgbXVzdCBmb2xsb3cgSG9zdCFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQWN0aW9uU2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcbiAgICBhY3Rpb25UeXBlOiBSZXN0QWN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGFjdGlvbjogUmVzdEFjdGlvbiwgcHVibGljIGRhdGE/OiBhbnksIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbiwgYWN0aW9uLCBwYXJhbXMsIDApO1xuXG4gICAgICAgIC8vIHNhdmUgaXQgdG8gbG9jYWwgcHJvcGVydHkgZm9yIGVhc2llciBjb21wYXJpc2lvblxuICAgICAgICB0aGlzLmFjdGlvblR5cGUgPSBhY3Rpb247XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5Db250ZXh0LCB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gQWN0aW9uIG11c3QgZm9sbG93IENvbnRleHQgc2VnbWVudCFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuXG4gICAgcmVzb3VyY2VOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IFR5cGU8YW55PiwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UsIHZhbHVlLCBwYXJhbXMsIDE1KTtcblxuICAgICAgICB0aGlzLnJlc291cmNlTmFtZSA9IGAke29iamVjdFRvTmFtZSh0aGlzLnZhbHVlKS50b0xvd2VyQ2FzZSgpfXNgO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KChwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLkFjdGlvbiB8fCBwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50KSxcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmFzc2VydE1zZygpfS4gLiBSZXNvdXJjZSBtdXN0IGZvbGxvdyBlaXRoZXIgQWN0aW9uIG9yIE9mIWA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBJZGVudGlmaWVyU2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5JZGVudGlmaWVyLCB2YWx1ZSwgcGFyYW1zLCAyMCk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSwgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmFzc2VydE1zZygpfS4gLiBJZGVudGlmaWVyIG11c3QgZm9sbG93IFJlc291cmNlIWA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBPZlBhcmVudFNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQpO1xuICAgICAgICB0aGlzLnJhbmsgPSAyO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UgfHxcbiAgICAgICAgICAgIHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuSWRlbnRpZmllcixcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gT2YgbXVzdCBmb2xsb3cgUmVzb3VyY2UhYDtcbiAgICB9XG59XG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtBY3Rpb25TZWdtZW50LCBSZXNvdXJjZVNlZ21lbnQsIFJlc3RBY3Rpb24sIFJlc3RTZWdtZW50VHlwZSwgVXJsU2VnbWVudH0gZnJvbSAnLi9zZWdtZW50JztcbmltcG9ydCB7YXNzZXJ0LCBpc1ByZXNlbnQsIFN0cmluZ0pvaW5lcn0gZnJvbSAnLi4vLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge1Jlc3RVcmxHcm91cH0gZnJvbSAnLi91cmwtZ3JvdXAnO1xuXG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB0aGF0IHJlYWRzIGFic3RyYWN0IFVSTCBzdHJ1Y3R1cmUgYW5kIGFzc2VtYmxlcyBjb3JyZWN0IFVSTC5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRSZXN0QnVpbGRlclxue1xuICAgIHByaXZhdGUgc29ydGVkOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXJsR3JvdXA6IFJlc3RVcmxHcm91cClcbiAgICB7XG4gICAgfVxuXG4gICAgYXNzZW1ibGVVcmwoaXNNb2NrZWQ6IGJvb2xlYW4pOiBzdHJpbmdcbiAgICB7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuXG4gICAgICAgIGxldCBzb3J0ZWRTZWdtZW50cyA9IHRoaXMuYWRqdXN0UmFuayh0aGlzLnVybEdyb3VwLnNlZ21lbnRzKTtcblxuICAgICAgICBsZXQgdXJsID0gbmV3IFN0cmluZ0pvaW5lcigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNvcnRlZFNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoc29ydGVkU2VnbWVudHNbaV0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgUmVzdFNlZ21lbnRUeXBlLkFjdGlvbjpcbiAgICAgICAgICAgICAgICBjYXNlIFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZTpcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc1NlZ21lbnQ6IFJlc291cmNlU2VnbWVudCA9IDxSZXNvdXJjZVNlZ21lbnQ+IHNvcnRlZFNlZ21lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNNb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybC5hZGQoJ21vY2tlZCcpLmFkZCgnLycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHVybC5hZGQocmVzU2VnbWVudC5yZXNvdXJjZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNsYXNoKHVybCwgaSAhPT0gKHNvcnRlZFNlZ21lbnRzLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHVybC5hZGQoc29ydGVkU2VnbWVudHNbaV0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNsYXNoKHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ByZXNlbnQoc29ydGVkU2VnbWVudHNbaV0udmFsdWUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGVkU2VnbWVudHNbaV0udmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAhPT0gKHNvcnRlZFNlZ21lbnRzLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoKDxBY3Rpb25TZWdtZW50PnNvcnRlZFNlZ21lbnRzWzBdKS52YWx1ZSA9PT0gUmVzdEFjdGlvbi5Ebykge1xuICAgICAgICAgICAgdXJsLmFkZCgnLycpLmFkZCgnYWN0aW9ucycpLmFkZCgnLycpLmFkZCgoPEFjdGlvblNlZ21lbnQ+c29ydGVkU2VnbWVudHNbMF0pLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVybC50b1N0cmluZygpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBhZGRTbGFzaCh1cmw6IFN0cmluZ0pvaW5lciwgc2hvdWxkQWRkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgICAgdXJsLmFkZCgnLycpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIHByaXZhdGUgdmFsaWRhdGUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGFjdGlvbjogQWN0aW9uU2VnbWVudCA9IDxBY3Rpb25TZWdtZW50PnRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24pO1xuXG4gICAgICAgIHN3aXRjaCAoYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5TYXZlOlxuICAgICAgICAgICAgY2FzZSBSZXN0QWN0aW9uLkRvOlxuICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBoYXZlIGEgSWRlbnRpZmllclxuICAgICAgICAgICAgICAgIGxldCB3aXRoSWRDb3VudCA9IHRoaXMudXJsR3JvdXAuY291bnQoUmVzdFNlZ21lbnRUeXBlLklkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIGxldCBvZiA9IHRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudCk7XG5cbiAgICAgICAgICAgICAgICBhc3NlcnQod2l0aElkQ291bnQgPj0gMSwgJ01pc3Npbmcgd2l0aElkKDxJREVOVElGSUVSPikgY2FsbCEnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIE9GIHNlZ21lbnQgd2hlcmUgd2UgcmVmZXIgdG8gcGFyZW50IHJlc291cmNlLiBJbiBzdWNoIGNhc2Ugd2VcbiAgICAgKiBuZWVkIG1vdmUgYWxsIGJlZm9yZSBPRiBhdCB0aGUgZW5kLiBFaXRoZXIgYWZ0ZXIgcGFyZW50IFJFU09VUkNFIG9yIElERU5USUZJRVJcbiAgICAgKlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogICBzZXJ2aWNlXG4gICAgICogICAgICAubG9hZCgpXG4gICAgICogICAgICAucmVzb3VyY2UoTGluZUl0ZW0pXG4gICAgICogICAgICAub2ZcbiAgICAgKiAgICAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAgICAgKiAgICAgIC53aXRoSWQoJzEyMycpO1xuICAgICAqICBgYGBcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKiBGaW5kIHRoZSBPRiBzZWdtZW50IGFuZCBnbyBiYWNrIHVudGlsIHdlIHJlYWNoIFJlc291cmNlIGFuZCBhZGp1c3QgcmFuayBvZiB0aGVzZSBhZG5cbiAgICAgKiB0aGVuXG4gICAgICogc29ydFxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGp1c3RSYW5rKHNlZ21lbnRzOiBVcmxTZWdtZW50W10pOiBVcmxTZWdtZW50W11cbiAgICB7XG4gICAgICAgIGxldCBvZkluZGV4ID0gc2VnbWVudHNcbiAgICAgICAgICAgIC5maW5kSW5kZXgoKHM6IFVybFNlZ21lbnQpID0+IHMudHlwZSA9PT0gUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50KTtcblxuICAgICAgICBpZiAob2ZJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBvZiA9IHNlZ21lbnRzW29mSW5kZXhdO1xuICAgICAgICAgICAgbGV0IHNlZ21lbnQ6IFVybFNlZ21lbnQ7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgc2VnbWVudCA9IHNlZ21lbnRzWy0tb2ZJbmRleF07XG4gICAgICAgICAgICAgICAgc2VnbWVudC5yYW5rICo9IG9mLnJhbms7XG4gICAgICAgICAgICB9IHdoaWxlIChzZWdtZW50LnR5cGUgIT09IFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VnbWVudHMuc29ydCgoYSwgYikgPT4gYS5yYW5rIC0gYi5yYW5rKTtcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7UmVzb3VyY2VTZWdtZW50LCBSZXN0U2VnbWVudFR5cGUsIFVybFNlZ21lbnR9IGZyb20gJy4vc2VnbWVudCc7XG5pbXBvcnQge2Fzc2VydCwgaXNCbGFuaywgaXNQcmVzZW50LCBpc1N0cmluZ30gZnJvbSAnLi4vLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICcuLi8uLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICpcbiAqIFRoaXMgY2xhc3MganVzdCBhZ2dyZWdhdGVzIGFuZCBwcm92aWRlcyBjb252aWVudCBhcGl0IHRvIHRvIHdvcmsgd2l0aCBVcmxTZWdtZW50c1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc3RVcmxHcm91cFxue1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlZ21lbnRzPzogVXJsU2VnbWVudFtdKVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fc2VnbWVudHMpKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWdtZW50cyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEV2ZXJ5IHB1c2ggaXMgdmFsaWRhdGVkIGFnYWludHMgVXJsU2VnbWVudCBhc3NlcnQgbWV0aG9kcyB0byBtYWtlIHN1cmUgdGhlIG9yZGVyIG9mIHRoZVxuICAgICAqIG1ldGhvZCBjYWxscyBpcyBjb3JyZWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBwdXNoKHNlZ21lbnQ6IFVybFNlZ21lbnQpOiB2b2lkXG4gICAge1xuICAgICAgICBzZWdtZW50LmFzc2VydFNlZ21lbnQoKHRoaXMuX3NlZ21lbnRzLmxlbmd0aCA+IDApID8gdGhpcy5wZWFrKCkudHlwZSA6IG51bGwpO1xuXG4gICAgICAgIGlmIChpc1N0cmluZyhzZWdtZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgc2VnbWVudC52YWx1ZSA9IHNlZ21lbnQudmFsdWUucmVwbGFjZSgvXlxcL3xcXC8kL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU3RhY2sgbGlrZSBBUElcbiAgICAgKlxuICAgICAqL1xuICAgIHBlYWsoKTogVXJsU2VnbWVudFxuICAgIHtcbiAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLmxhc3Q8VXJsU2VnbWVudD4odGhpcy5fc2VnbWVudHMpO1xuICAgIH1cblxuXG4gICAgcG9wKCk6IFVybFNlZ21lbnRcbiAgICB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9zZWdtZW50cy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgJyBBdHRlbXB0IHRvIGdldCB2YWx1ZSBmcm9tIGVtcHR5IHNlZ21lbnRzIHN0YWNrJyk7XG5cbiAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLnJlbW92ZUF0PFVybFNlZ21lbnQ+KHRoaXMuX3NlZ21lbnRzLCB0aGlzLl9zZWdtZW50cy5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWdtZW50KHNlZ21lbnRUeXBlOiBSZXN0U2VnbWVudFR5cGUsIGRhdGE6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCB1cmxTZWdtZW50ID0gdGhpcy5sb29rdXAoc2VnbWVudFR5cGUpO1xuICAgICAgICB1cmxTZWdtZW50LnZhbHVlID0gZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEJhc2VkIG9uIHRoZSBlbnVtIFNlZ21lbnQgVHlwZSAgaXQgd2lsbCByZXRyaWV2ZSBjb3JyZWN0IHNlZ21lbnQgZnJvbSB0aGUgc3RhY2tcbiAgICAgKlxuICAgICAqL1xuICAgIGxvb2t1cChzZWdtZW50OiBSZXN0U2VnbWVudFR5cGUsIGJ5UmVzb3VyY2U/OiBUeXBlPGFueT4pOiBVcmxTZWdtZW50XG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnNlZ21lbnRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3MgPSBbLi4udGhpcy5zZWdtZW50c107XG4gICAgICAgIHNzID0gc3MucmV2ZXJzZSgpO1xuXG4gICAgICAgIHJldHVybiBzcy5maW5kKCgoczogVXJsU2VnbWVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhhc01hdGNoID0gcy50eXBlID09PSBzZWdtZW50O1xuXG4gICAgICAgICAgICBpZiAoc2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KGJ5UmVzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNNYXRjaCAmJiAoPFJlc291cmNlU2VnbWVudD5zKS52YWx1ZSA9PT0gYnlSZXNvdXJjZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzTWF0Y2g7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhhc01hdGNoO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDb3VudHMgbnVtYmVyIG9mIHNlZ21lbnRzIG9mIGNlcnRhaW4gdHlwZVxuICAgICAqXG4gICAgICovXG4gICAgY291bnQoc2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogbnVtYmVyXG4gICAge1xuICAgICAgICBsZXQgc2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcigoczogVXJsU2VnbWVudCkgPT4gc2VnbWVudCA9PT0gcy50eXBlKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChzZWdtZW50cykgPyBzZWdtZW50cy5sZW5ndGggOiAwO1xuICAgIH1cblxuXG4gICAgZ2V0IHNlZ21lbnRzKCk6IFVybFNlZ21lbnRbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnRzO1xuICAgIH1cbn1cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuXG5cbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEh0dHBDbGllbnQsXG4gICAgSHR0cEVycm9yUmVzcG9uc2UsXG4gICAgSHR0cEhlYWRlcnMsXG4gICAgSHR0cFBhcmFtcyxcbiAgICBIdHRwUHJvZ3Jlc3NFdmVudCxcbiAgICBIdHRwUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtFbnRpdHksIGlzRW50aXR5LCBpc1ZhbHVlLCBWYWx1ZX0gZnJvbSAnLi9kb21haW4tbW9kZWwnO1xuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4uL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7XG4gICAgQWN0aW9uU2VnbWVudCxcbiAgICBDb250ZXh0U2VnbWVudCxcbiAgICBIb3N0U2VnbWVudCxcbiAgICBJZGVudGlmaWVyU2VnbWVudCxcbiAgICBPZlBhcmVudFNlZ21lbnQsXG4gICAgUmVzb3VyY2VTZWdtZW50LFxuICAgIFJlc3RBY3Rpb24sXG4gICAgUmVzdFNlZ21lbnRUeXBlXG59IGZyb20gJy4vdXJsL3NlZ21lbnQnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEZWZhdWx0UmVzdEJ1aWxkZXJ9IGZyb20gJy4vdXJsL2J1aWxkZXInO1xuaW1wb3J0IHtSZXN0VXJsR3JvdXB9IGZyb20gJy4vdXJsL3VybC1ncm91cCc7XG5pbXBvcnQge2Fzc2VydCwgaXNBcnJheSwgaXNCbGFuaywgaXNEYXRlLCBpc1ByZXNlbnR9IGZyb20gJy4uL3V0aWxzL2xhbmcnO1xuXG5cbi8qKlxuICogUmVzcG9uc2UgaXMgdGhlIGdlbmVyaWMgd3JhcHBlciBpbnRlcmZhY2UgZW5jYXBzdWxhdGluZyBhIHJlc3BvbnNlIGZyb20gdGhlIG1pY3JvIHNlcnZpY2UuXG4gKiBDdXJyZW50bHkgd2UgaGF2ZSBvbmx5IGJvZHkgZmllbGQsIGJ1dCBsYXRlciBvbiB3ZSBuZWVkIHRvIGV4dGVuZCBpdCBmb3IgZGlmZmVyZW50IG5vdGlmaWNhdGlvbnMsXG4gKiBlcnJvcnMsIHBhZ2luZyBpbmZvcm1hdGlvbiBhbmQgbXVjaCBtb3JlLlxuICpcbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlc3BvbnNlPFQ+IHtcbiAgICBwYXlsb2FkOiBUO1xufVxuXG5cbi8qKlxuICpcbiAqIFRvIHNpbXBsaWZ5IHdvcmsgd2l0aCBjdXJyZW50IEh0dHBDbGllbnQgdGhlIFJlc291cmNlIHByb3ZpZGVzIGZsdWVudCBBUEkgb24gdG9wIG9mIGl0LiBZb3UgZG9udFxuICogYXNzZW1ibGUgVVJMIHRyYWRpdGlvbmFsIHdheSByYXRoZXIgbW9yZSBmbHVlbnQgYW5kIGZ1bmN0aW9uYWwgd2F5LCB3b3JraW5nIHdpdGggcmVhbCBkYXRhIHR5cGVzXG4gKiBzdWNoIGEgVmFsdWUgYW5kIEVudGl0eS5cbiAqXG4gKiBFbnRpdHkgYW5kIFZhbHVlIGFyZSB0d28gbWFpbiBrZXkgaW50ZXJmYWNlcyB0aGF0IGFsbCBkb21haW4gb2JqZWN0cyBzaG91bGQgaW5oZXJpdCBmcm9tIGlmIHRoZXlcbiAqIHdhbnQgdG8gbGV2ZXJhZ2UgdGhpcyBmdW5jdGlvbmFsaXR5LlxuICpcbiAqICMjI0V4YW1wbGVcbiAqXG4gKiAxLiAgdG8gc2ltcGx5IGFzc2VtYmxlIGZvbGxvd2luZyBVUkwgaHR0cDovL2FwaS5hcmliYS5jb20vbXlTZXJ2aWNlL3YxL3JlcXVpc2l0aW9ucy8xMjMgYW5kXG4gKiAgYW5kIGZldGNoIFJlcXVpc2l0aW9uIGRhdGE6XG4gKlxuICogYGBgdHNcbiAqICBsZXQgcjogUmVzb3VyY2VcbiAqXG4gKiAgci5sb2FkKClcbiAqICAgLnJlc291cmNlKFJlcXVpc2l0aW9uKVxuICogICAud2l0aElkKCcxMjMnKVxuICogICAuYXNFbnRpdHk8UmVxdWlzaXRpb24+KChyOiBSZXF1aXNpdGlvbikgPT4gcmVjZWl2ZWRSID0gcik7XG4gKlxuICogYGBgXG4gKiBZb3UgeW91IGNhbiBzaW1wbHkgcmVhZCBpdDogbG9hZCByZXNvdXJjZSBSZXF1aXNpdGlvbiB3aXRoIElEIDEyMyBhbmQgcmV0dXJuIHRoaXMgYXMgRW50aXR5XG4gKlxuICogMi4gQ3VycmVudCBmbHVlbnQgQVBJIGFsc28gc3VwcG9ydCBwYXJ0aWFsIHVwZGF0ZXMgYW5kIHN1YmNvbnRleHQgcmVzb3VyY2VcbiAqICB0byBsb2FkIGRhdGEgZnJvbSB0aGlzIFJFU1QgQVBJIGVuZHBvaW50XG4gKiAgICAgIGh0dHA6Ly9hcGkuYXJpYmEuY29tL215U2VydmljZS92MS9yZXF1aXNpdGlvbnMvMTIzL3N1cHBsaWVyc1xuXG5cbiAqIGBgYHRzXG4gKiAgbGV0IHI6IFJlc291cmNlXG4gKlxuICogIHIubG9hZCgpXG4gKiAgIC5yZXNvdXJjZShTdXBwbGllcilcbiAqICAgLm9mXG4gKiAgIC5yZXNvdXJjZShSZXF1aXNpdGlvbilcbiAqICAgLndpdGhJZCgnMTIzJylcbiAqICAgLmFzRW50aXR5PFN1cHBsaWVyPigocjogIFN1cHBsaWVyW10pID0+IHJlY2VpdmVkUiA9IHIpO1xuICpcbiAqIGBgYFxuICpcbiAqICBZb3UgY2FuIHJlYWQgYWJvdmU6IExvYWQgYWxsIGZyb20gcmVzb3VyY2UgU3VwcGxpZXIgb2YgUmVxdWlzaXRpb24gKG9yIHN1cHBsaWVyIGJlbG9uZ3MgdG9cbiAqICBSZXF1aXNpdGlvbikgIHdpdGggSUQgMTIzIGFuZCByZXR1cm4gdGhpcyBhcyBFbnRpdHkuXG4gKlxuICpcbiAqIDMuIFRvIHNhdmUgZGF0YSB5b3UgZm9sbG93IHRoZSBzYW1lIHN5bnRheFxuICogICAgICBTYXZlIHJlcXVpc2l0aW9uIHNvIHdlIGFyZSBQVVR0aW5nIGRhdGEgdG8gZm9sbG93aW5nIFVSTFxuICogICAgICBodHRwOi8vYXBpLmFyaWJhLmNvbS9teVNlcnZpY2UvdjEvcmVxdWlzaXRpb25zLzEyM1xuICpcbiAqIGBgYHRzXG4gKiAgbGV0IHI6IFJlc291cmNlXG4gKlxuICogICAgICAgICAgclxuICogICAgICAgIC5zYXZlKClcbiAqICAgICAgICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gKiAgICAgICAgLndpdGhJZCgnMTIzJylcbiAqICAgICAgICAud2l0aERhdGEocHIpXG4gKiAgICAgICAgLmFzRW50aXR5PFJlcXVpc2l0aW9uPigocjogUmVxdWlzaXRpb24pID0+IHJlY2VpdmVkUiA9IHIpO1xuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiAgWW91IGNhbiByZWFkIGFib3ZlOiBTYXZlIHJlc291cmNlIFJlcXVpc2l0aW9uIHdpdGggSUQgMTIzIGFuZCB3aXRoIERhdGEgLi4uLiBhbmQgcmV0dXJuIGl0IGFzXG4gKiAgYSBFbnRpdHlcbiAqXG4gKlxuICogIDQuIEFQSSBjYW4gYWxzbyBmb3IgeW91IGFzc2VtYmxlIGFuZCBleGVjdXRlIGFjdGlvbnMgc29tZXRpbWVzIGNhbGxlZCBpbnRlcmFjdGlvbi4gTm90IGFsbCBpc1xuICogIGFib3V0IENSVUQuIE91ciBjdXJyZW50IHN5bnRheCBmb3IgYWN0aW9ucyBpc1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICBodHRwOi8vYXBpLmFyaWJhLmNvbS9teVNlcnZpY2UvdjEvcmVxdWlzaXRpb25zLzEyMy9hY3Rpb25zL2FwcHJvdmVcbiAqXG4gKiBgYGB0c1xuICogIGxldCByOiBSZXNvdXJjZVxuICpcbiAqICAgICAgICByXG4gKiAgICAgICAgLmRvKCdhcHByb3ZlJylcbiAqICAgICAgICAucmVzb3VyY2UoUmVxdWlzaXRpb24pXG4gKiAgICAgICAgLndpdGhJZCgnMTIzJylcbiAqICAgICAgICAuYXNFbnRpdHk8UmVxdWlzaXRpb24+KChyOiBSZXF1aXNpdGlvbikgPT4gcmVjZWl2ZWRSID0gcik7XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqIFRvIG1ha2UgaXQgZWFzaWx5IGV4dGVuc2libGUgdGhleSBhcmUgMyBtYWluIHBpZWNlc1xuICogIC0gUmVzb3VyY2U6IFRoaXMgY2xhc3MganVzdCBwdXQgdG9nZXRoZXIgYWJzdHJhY3Qgc3RydWN0dXJlIFVSTFNlZ21lbnRcbiAqICAtIFVSTFNlZ21lbnRzOiBNb3JlIGxpa2UgQVNUIHN0eWxlIHRvIGFzc2VtYmxlIHRoZSBVUkxcbiAqICAtIGJ1aWxkZXI6IHRoYXQgcmVhZCB0aGlzIEFTVCB0byBhc3NlbWJsZSB0aGUgVVJMXG4gKlxuICpcbiAqIExhdGVyIG9uIHdlIG1pZ2h0IHdhbnQgdG8gZXhwb3NlIGJ1aWxkZXIgYXMgYSBwcm92aWRlciBhbmQgeW91IGNhbiBoYXZlIHlvdXIgb3duIGltcGxlbWVudGF0aW9uXG4gKlxuICpcbiAqXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzb3VyY2Uge1xuICAgIC8qKlxuICAgICAqIFJlc3RVcmxHcm91cCBhZ2dyZWdhdGVzIFVybFNlZ21lbnRzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIF91cmxHcm91cDogUmVzdFVybEdyb3VwO1xuXG4gICAgLyoqXG4gICAgICogT25jZSBhbGwgVVJMIGFyZSBhc3NlbWJsZWQgdGhlIGJ1aWxkZXIgcmV0dXJucyBmaW5hbCBVUkwgdG8gYmUgdXNlZCBmb3IgdGhlIEh0dHBDbGllbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIF91cmxCdWlsZGVyOiBEZWZhdWx0UmVzdEJ1aWxkZXI7XG5cbiAgICAvKipcbiAgICAgKiBDYWNoZWQgdXJsLCBzbyB3ZSBkb250IGhhdmUgdG8gYXNzZW1ibGUgdGhpcyBldmVyeXRpbWUgc29tZWJvZHkgY2FsbHMgdXJsXG4gICAgICovXG4gICAgcHJpdmF0ZSBfdXJsOiBzdHJpbmc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBhcHBDb25maWc6IEFwcENvbmZpZykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgR0VUIG9wZXJhdGlvblxuICAgICAqXG4gICAgICovXG4gICAgbG9hZCgpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRoaXMudXJsR3JvdXAucHVzaChuZXcgQWN0aW9uU2VnbWVudChSZXN0QWN0aW9uLkxvYWQpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIFBVVCBvciBQT1NUIG9wZXJhdGlvbi4gRGVwZW5kaW5nIG9uIHRoZSBvYmplY3QuIElmIHRoZSBvYmplY3QgaGFzIGFscmVhZHlcbiAgICAgKiBwb3B1bGF0ZWQgaXRzIGlkZW50aWZpZXIsIHRoZW4gd2UgdXNlIFBVVCwgb3RoZXJ3aXNlIFBPU1RcbiAgICAgKlxuICAgICAqL1xuICAgIHNhdmUoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IEFjdGlvblNlZ21lbnQoUmVzdEFjdGlvbi5TYXZlKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllcyBpbnRlcmFjdGlvbi4gRm9yIHRoaXMgd2UgdXNlIFBPU1RcbiAgICAgKlxuICAgICAqL1xuICAgIGRvKGFjdGlvbjogc3RyaW5nKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IEFjdGlvblNlZ21lbnQoUmVzdEFjdGlvbi5EbywgYWN0aW9uKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUT0RPOiBTaW5jZSBxdWVyeSBBUEkgaXMgbm90IHlldCBpbXBsZW1lbnRlZCBvbiB0aGUgc2VydmVyIHNpZGUgPT4gVEJEXG4gICAgICpcbiAgICAgKiBUaGVyZSB3aGVyZSBzaG91bGQgYmUgYWJsZSB0byBhY2NlcHRzIGluZGl2aWR1YWwgcXVlcnkgZ3JhbW1hci4gU2ltaWxhciBzdHlsZSBsaWtlIHJ4anNcbiAgICAgKiBvcGVyYXRvcnMuXG4gICAgICpcbiAgICAgKiAgZS5nLjogUmVzb3VyY2UucHJvdG90eXBlLmNvbnRhaW5zID0gLi4uLlxuICAgICAqICAgICAgICBSZXNvdXJjZS5wcm90b3R5cGUuZXEgPSAuLi4uXG4gICAgICpcbiAgICAgKiBZb3Ugc2hvdWxkIGJlIGFibGUgdG8gYWRkIGR5bmFtaWNhbGx5IGxldDtzIGNhbGwgaXQgUXVlcnlTcGVjaWZpY2F0aW9uXG4gICAgICpcbiAgICAgKiAgICAgIHJlc1xuICAgICAqICAgICAgLnF1ZXJ5KClcbiAgICAgKiAgICAgIC5yZXNvdXJjZShSZXF1c2l0aW9uKVxuICAgICAqICAgICAgLndoZXJlKCBjb250YWluczxzdHJpbmc+KHJlcUVudGl0eS50aXRsZSgpLCAnKmFzZGYqJyApXG4gICAgICpcbiAgICAgKiAgc28gaXQgY291bGQgbG9vayBsaWtlIHNvbWV0aGluZyBsaWtlOlxuICAgICAqXG4gICAgICpcbiAgICAgKiAgY29udGFpbnM8VD4odGl0bGU6IHN0cmluZywgdmFsdWU6IFQpOiBUXG4gICAgICpcbiAgICAgKiAgQnV0IHNpbmNlIGFsbCB0aGVzZSBTcGVjaWZpY2F0aW9uIHdvdWxkIGhhdmUgYSB3YXkgdG8gdHJhbnNsYXRlIHRoaXMga2V5fHZhbHVlIHRvIHRoZVxuICAgICAqICBxdWVyeSBzbyB0aGUgd2hlcmUsIHdvdWxkIGp1c3QgbGlzdCBhbGwgdGhlIHNwZWNpZmljYXRpb24gdG8gYnVsaWRcbiAgICAgKiAgdGhlIHF1ZXJ5XG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHF1ZXJ5KCk6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG5cbiAgICB3aGVyZSgpOiBSZXNvdXJjZSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZGVudGlmaWVzIFJlc291cmNlU2VnbWVudCB3aXRoIHNwZWNpZmljIHR5cGUgdGhhdCBtdXN0IGJlIGVpdGhlciBFbnRpdHkgb3IgVmFsdWVcbiAgICAgKlxuICAgICAqL1xuICAgIHJlc291cmNlPFQgZXh0ZW5kcyBFbnRpdHkgfCBWYWx1ZT4odHlwZTogVHlwZTxUPik6IFJlc291cmNlIHtcbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBSZXNvdXJjZVNlZ21lbnQodHlwZSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVyIElkZW50aWZpZXJTZWdtZW50XG4gICAgICpcbiAgICAgKi9cbiAgICB3aXRoSWQoaWRlbnRpZmllcjogc3RyaW5nKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IElkZW50aWZpZXJTZWdtZW50KGlkZW50aWZpZXIpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSBhcmUgc2F2aW5nIGRhdGEgdGhpcyBtZXRob2QgaXMgdXNlZCB0byBpbnNlcnQgYSBwYXlsb2FkIHRvIHRoZSBBY3Rpb25TZWdtZW50XG4gICAgICpcbiAgICAgKi9cbiAgICB3aXRoRGF0YTxUIGV4dGVuZHMgRW50aXR5IHwgVmFsdWU+KGRhdGE6IFQpOiBSZXNvdXJjZSB7XG4gICAgICAgIGxldCB1cmxTZWdtZW50ID0gdGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbik7XG4gICAgICAgIGxldCBpc1NhdmUgPSAoPEFjdGlvblNlZ21lbnQ+dXJsU2VnbWVudCkuYWN0aW9uVHlwZSA9PT0gUmVzdEFjdGlvbi5TYXZlO1xuXG4gICAgICAgIGFzc2VydChpc1NhdmUsICd3aXRoRGF0YSBjYW4gYmUgdXNlZCB3aXRoIFNBVkUgb3BlcmF0aW9uIG9ubHkhJyk7XG5cbiAgICAgICAgKDxBY3Rpb25TZWdtZW50PnVybFNlZ21lbnQpLmRhdGEgPSBkYXRhO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE9GIGlzIGp1c3QgYSBzeW50YWN0aWMgc3VnZ2FyIGZvciBiZXR0ZXIgcmVhZGFiaWxpdHkgYW5kIHRvIGVhc2llciB3b3JrIHdpdGggc3ViIHJlc291cmNlcy5cbiAgICAgKiB1c2luZyBPRiB3ZSBhcmUgYWJsZSB0byB0ZWxsIHRoYXQgc29tZSByZXNvdXJjZSBiZWxvbmdzIHRvIG90aGVyIHJlc291cmNlXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgb2YoKTogUmVzb3VyY2Uge1xuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IE9mUGFyZW50U2VnbWVudCgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIE9uY2UgdGVsbCB3aGF0IHlvdSB3YW50IHRoaXMgaXMgdGhlIGxhc3QgY2FsbCB5b3Ugd2FudCB0byBtYWtlIHRvIHJldHVybiByZXNvdXJjZXMgYXMgYWN0dWFsXG4gICAgICogRW50aXRpZXMgb3IgVmFsdWVzLlxuICAgICAqXG4gICAgICogVG9kbzogTWF5YmUgcmVuYW1lIGEgbWV0aG9kIG5hbWUgYXMgd2UgY2FuIHJldHVybiBib3RoIEVudGl0eSBhbmQgVmFsdWUuXG4gICAgICpcbiAgICAgKiBZb3UgaGF2ZSBhbHNvIG9wdGlvbiB0byBpbnNlcnQgSHR0cE9wdGlvblxuICAgICAqXG4gICAgICovXG4gICAgYXNFbnRpdHk8VCBleHRlbmRzIEVudGl0eSB8IFZhbHVlPihzdWJzY3JpYmVyOiAocmVzOiBUIHwgVFtdKSA9PiB2b2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlOiAnYm9keSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM/OiBIdHRwUGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU/OiAnanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPSB7b2JzZXJ2ZTogJ2JvZHknfSk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIGxldCBzZWdtZW50OiBBY3Rpb25TZWdtZW50ID0gPEFjdGlvblNlZ21lbnQ+IHRoaXMudXJsR3JvdXAubG9va3VwKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24pO1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHNlZ21lbnQpLCAnTWlzc2luZyBIdHRwIG1ldGhvZC4gTm90IHN1cmUgaG93IHRvIGhhbmRsZSB0aGlzIScpO1xuXG4gICAgICAgIGxldCBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgICAgICAgbGV0IGFjdGlvblR5cGU6IFJlc3RBY3Rpb24gPSBzZWdtZW50LnZhbHVlO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5Mb2FkOlxuICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAuZ2V0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5EbzpcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnBvc3Q8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCB7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgUmVzdEFjdGlvbi5TYXZlOlxuICAgICAgICAgICAgICAgIC8vIHdlIGRvbnQgaGF2ZSByaWdodCBub3cgb3RoZXIgdXNlY2FzZSBzdWJjb250ZXh0IHJlc291cmNlIHdpbGwgYmUgYWx3YXlzIHNvbWVcbiAgICAgICAgICAgICAgICAvLyBhcnJheVxuICAgICAgICAgICAgICAgIGlmIChpc0VudGl0eShzZWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKCg8RW50aXR5PnNlZ21lbnQuZGF0YSkuaWRlbnRpdHkoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwgc2VnbWVudC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1ZhbHVlKHNlZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgZXhwZWN0IHZhbHVlIHdpbGwgYmUgYWx3YXlzIHB1c2hlZFxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKG1hcDxSZXNwb25zZTxUIHwgVFtdPiwgVCB8IFRbXT4ocmVzID0+IHRoaXMuY29udmVydFRvQ29tcG9zaXRlKHJlcyxcbiAgICAgICAgICAgIHRydWUsIGZhbHNlKSkpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9XG5cblxuICAgIGFzSHR0cFJlc3BvbnNlPFQgZXh0ZW5kcyBFbnRpdHkgfFxuICAgICAgICBWYWx1ZT4oc3Vic2NyaWJlcjogKHJlczogSHR0cFJlc3BvbnNlPFJlc3BvbnNlPFQgfCBUW10+PiB8IEh0dHBQcm9ncmVzc0V2ZW50KSA9PiB2b2lkLFxuICAgICAgICAgICAgICAgZXJyb3I/OiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB2b2lkLFxuICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgICBwYXJhbXM/OiBIdHRwUGFyYW1zLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlPzogJ2pzb24nLCB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuXG4gICAgICAgICAgICAgICB9ID0ge29ic2VydmU6ICdyZXNwb25zZSd9KTogU3Vic2NyaXB0aW9uIHtcblxuICAgICAgICBsZXQgc2VnbWVudDogQWN0aW9uU2VnbWVudCA9IDxBY3Rpb25TZWdtZW50PiB0aGlzLnVybEdyb3VwLmxvb2t1cChSZXN0U2VnbWVudFR5cGUuQWN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGlzUHJlc2VudChzZWdtZW50KSwgJ01pc3NpbmcgSHR0cCBtZXRob2QuIE5vdCBzdXJlIGhvdyB0byBoYW5kbGUgdGhpcyEnKTtcblxuICAgICAgICBsZXQgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgICAgIGxldCBhY3Rpb25UeXBlOiBSZXN0QWN0aW9uID0gc2VnbWVudC52YWx1ZTtcbiAgICAgICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uTG9hZDpcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLmdldDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uRG86XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFJlc3BvbnNlPFQgfCBUW10+Pih0aGlzLnVybCwge30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFJlc3RBY3Rpb24uU2F2ZTpcbiAgICAgICAgICAgICAgICAvLyB3ZSBkb250IGhhdmUgcmlnaHQgbm93IG90aGVyIHVzZWNhc2Ugc3ViY29udGV4dCByZXNvdXJjZSB3aWxsIGJlIGFsd2F5cyBzb21lXG4gICAgICAgICAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgICAgICAgICBpZiAoaXNFbnRpdHkoc2VnbWVudC5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNCbGFuaygoPEVudGl0eT5zZWdtZW50LmRhdGEpLmlkZW50aXR5KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnBvc3Q8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxSZXNwb25zZTxUIHwgVFtdPj4odGhpcy51cmwsIHNlZ21lbnQuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNWYWx1ZShzZWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGV4cGVjdCB2YWx1ZSB3aWxsIGJlIGFsd2F5cyBwdXNoZWRcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8UmVzcG9uc2U8VCB8IFRbXT4+KHRoaXMudXJsLCBzZWdtZW50LmRhdGEsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhhc1Byb2dyZXNzID0gb3B0aW9ucy5yZXBvcnRQcm9ncmVzcyB8fCBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShcbiAgICAgICAgICAgIG1hcChyZXMgPT4gdGhpcy5jb252ZXJ0VG9Db21wb3NpdGUocmVzLCBmYWxzZSwgaGFzUHJvZ3Jlc3MpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoc3Vic2NyaWJlciwgZXJyb3IpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZXR1cm4gYXNzZWJsZWQgVVJMIEFTVCAtPiBzdHJpbmdcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fdXJsKSkge1xuICAgICAgICAgICAgbGV0IGlzTW9ja2VkID0gdGhpcy5hcHBDb25maWcuZ2V0Qm9vbGVhbihBcHBDb25maWcuQ29ubmVjdGlvblVzZU1vY2tTZXJ2ZXIpO1xuXG4gICAgICAgICAgICB0aGlzLl91cmwgPSB0aGlzLl91cmxCdWlsZGVyLmFzc2VtYmxlVXJsKGlzTW9ja2VkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdXJsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogcHJpdmF0ZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IHVybEdyb3VwKCk6IFJlc3RVcmxHcm91cCB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cmxHcm91cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcml2YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgdXJsQnVpbGRlcigpOiBEZWZhdWx0UmVzdEJ1aWxkZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXJsQnVpbGRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcml2YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3VybEdyb3VwID0gbmV3IFJlc3RVcmxHcm91cCgpO1xuICAgICAgICB0aGlzLl91cmxCdWlsZGVyID0gbmV3IERlZmF1bHRSZXN0QnVpbGRlcih0aGlzLl91cmxHcm91cCk7XG4gICAgICAgIHRoaXMuX3VybCA9IG51bGw7XG5cblxuICAgICAgICB0aGlzLnVybEdyb3VwLnB1c2gobmV3IEhvc3RTZWdtZW50KHRoaXMuYXBwQ29uZmlnLmdldFJlc3RBcGlIb3N0KCkpKTtcbiAgICAgICAgdGhpcy51cmxHcm91cC5wdXNoKG5ldyBDb250ZXh0U2VnbWVudCh0aGlzLmFwcENvbmZpZy5nZXRSZXN0QXBpQ29udGV4dCgpKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGluc2lkZSAubWFwIHRvIG1hcCBKU09OIHJlc3BvbnNlIG9yIEh0dHBSZXNwb25zZS5ib2R5IHRvIGFjdHVhbCB0eXBlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRUb0NvbXBvc2l0ZTxUIGV4dGVuZHMgRW50aXR5IHwgVmFsdWU+KHJlczogUmVzcG9uc2U8VCB8IFRbXT4gfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEh0dHBSZXNwb25zZTxSZXNwb25zZTxUIHwgVFtdPj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBvc2l0ZTogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Byb2dyZXNzOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgaWYgKGhhc1Byb2dyZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVuc29ydGVkIHNlZ21lbnRzIHdpbGwgaGF2ZSBoYXZlIG91ciB0YXJnZXQgcmVzb3VyY2UgYXMgZmlyc3Qgb25lXG4gICAgICAgIGxldCBzZ206IFJlc291cmNlU2VnbWVudCA9IDxSZXNvdXJjZVNlZ21lbnQ+dGhpcy51cmxHcm91cC5sb29rdXAoUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlKTtcblxuICAgICAgICBpZiAoaXNDb21wb3NpdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlc2VyaWFsaXplKCg8UmVzcG9uc2U8VD4+cmVzKS5wYXlsb2FkLCBzZ20udmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgaHR0cFJlcyA9IDxIdHRwUmVzcG9uc2U8UmVzcG9uc2U8VD4+PnJlcztcbiAgICAgICAgICAgIGxldCBteVJlc3A6IFJlc3BvbnNlPFQ+ID0ge1xuICAgICAgICAgICAgICAgIHBheWxvYWQ6IHRoaXMuZGVzZXJpYWxpemUoaHR0cFJlcy5ib2R5LnBheWxvYWQsIHNnbS52YWx1ZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gaHR0cFJlcy5jbG9uZSh7Ym9keTogbXlSZXNwfSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHNlcmlhbGl6ZTxUPihkYXRhOiBUKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ29udmVydHMgSlNPTiBvYmplY3QgdG8gYWN0dWFsIFR5cGUuIFdlIGRvbid0IGNhcmUgYWJvdXQgcHJpbWl0aXZlIHR5cGVzIGFzIHdlIGRvbnQgaGF2ZSB0b1xuICAgICAqIGRvIGFueXRoaW5nIHdpdGggdGhlbS4gV2UgZG8gaW5zdGFudGlhdGUgb2JqZWN0cyBvciBjb21wbGV4IHR5cGVzIG9ubHkuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGRlc2VyaWFsaXplKGpzb246IGFueSwgY2xheno6IFR5cGU8YW55Pik6IGFueSB7XG4gICAgICAgIGlmIChpc0FycmF5KGpzb24pKSB7XG4gICAgICAgICAgICBsZXQgaW5zdGFuY2VzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIGluIGpzb24pIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZXMucHVzaCh0aGlzLmRlc2VyaWFsaXplKGpzb25baXRlbV0sIGNsYXp6KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2VzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGluc3RhbmNlO1xuICAgICAgICAgICAgaWYgKGNsYXp6ID09PSBTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IGpzb24udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xhenogPT09IE51bWJlcikge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0ganNvbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xhenogPT09IEJvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IGpzb247XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IGNsYXp6KCk7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGVzID0gaW5zdGFuY2UuZ2V0VHlwZXMoKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4ganNvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWpzb24uaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0eXBlc1twcm9wXSkgJiYgaXNQcmVzZW50KGpzb25bcHJvcF0pICYmIHR5cGVzW3Byb3BdICE9PSBEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wXSA9IHRoaXMuZGVzZXJpYWxpemUoanNvbltwcm9wXSwgdHlwZXNbcHJvcF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKHR5cGVzW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcF0gPSBuZXcgdHlwZXNbcHJvcF0oanNvbltwcm9wXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BdID0ganNvbltwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGVsc2UgaWYgKGlzU3RyaW5nKGpzb25bcHJvcF0pICYmIGlzRW50aXR5KGluc3RhbmNlKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgJiYgcHJvcCA9PT0gKDxFbnRpdHk+aW5zdGFuY2UpLmlkZW50aXR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IGlkU3RyaW5nID0gKDxFbnRpdHk+aW5zdGFuY2UpLmlkZW50aXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAoPGFueT5pbnN0YW5jZSlbaWRTdHJpbmddID0gPHN0cmluZz5qc29uW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ25vdC1mb3VuZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ25vdC1mb3VuZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5vdEZvdW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFjdGl2YXRlZFJvdXRlLFxuICAgIEV2ZW50LFxuICAgIE5hdmlnYXRpb25FbmQsXG4gICAgTmF2aWdhdGlvbkV4dHJhcyxcbiAgICBOYXZpZ2F0aW9uU3RhcnQsXG4gICAgUm91dGUsXG4gICAgUm91dGVyXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnLi4vdXRpbHMvY29sbGVjdGlvbic7XG5cbi8qKlxuICogQmFzaWMgd3JhcHBlciBhcm91bmQgQW5ndWxhcidzIFJPVVRFIHNlcnZpY2UgdG8gc2ltcGxpZnkgdGVtcG9yYXJ5IHN0YXRlIGNhY2hpbmcgYXMgd2VsbFxuICogbmF2aWdhdGlvbi4gVGhpcyBzZXJ2aWNlIGxpc3RlbiBmb3IgUm91dGluZyBldmVudHMgc3VjaCBhcyBOYXZpZ2F0aW9uU3RhcnQgYXMgd2VsbCxcbiAqIE5hdmlnYXRpb25FbmRzIGFuZCB3aGVuIHRoZSByb3V0aW5nIEVudGVycywgV2UgY2hlY2sgaWYgdGhlcmUgYW55IHN0YXRlIHdoaWNoIG5lZWRzIHRvIGJlIGNhY2hlZFxuICogaWYgeWVzIHRoZW4gd2Ugc2F2ZSBpdCBpbnRvIHRoZSBzdGF0ZUNhY2hlSGlzdG9yeSB3aGljaCBtYXBzIGZpbmFsIFVSTCB0byB0aGUgYWN0dWFsIFNUQVRFXG4gKiBvYmplY3QsIGFuZCB3aGVuIHdlIGFyZSBuYXZpZ2F0ZSBiYWNrIHRvIHRoZSBzYW1lIFVSTCBXZSBjaGVjayBpZiB0aGVyZSBpcyBhbnkgc2F2ZWQgc3RhdGUuXG4gKlxuICogVGhpcyBzZXJ2aWNlIHdhcyBvcmlnaW5hbGx5IGNyZWF0ZWQgYXMgYSByZXNwb25zZSB0aGF0IGFuZ3VsYXIgYWx3YXlzIGRlc3Ryb3llcyBhbmQgcmVjcmVhdGVzXG4gKiBjb21wb25lbnRzIHdoZW4gbmF2aWdhdGluZyBhd2F5cyBhbmQgdGhlbiBiYWNrIHRvIGl0LiBCeSBhIG9mIGFuZ3VsYXIgNC4yLjArIHRoaXMgbWlnaHQgYmVcbiAqIG9ic29sZXRlLlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvdXRpbmdTZXJ2aWNlXG57XG4gICAgLyoqXG4gICAgICogU3RhY2sga2VlcGluZyBhY3RpdmUgUm91dGVzIHNvIHdlIGNhbiBnbyBiYWNrL3JlZGlyZWN0IGJhY2tcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgcm91dGluZ1N0YXRlOiBFdmVudFtdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBUZW1wb3JhcnkgZmllbGQgaG9sZGluZyBhIHN0YXRlIE9iamVjdCBvZiB0eXBlIFQgYmVmb3JlIGl0cyBzYXZlZCBpbnRvIHN0YXRlQ2FjaGVIaXN0b3J5LFxuICAgICAqIGFuZCByZXRyaWV2ZWQgd2hlbiBnZXR0aW5nIGJhY2sgZnJvbSBTdGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgY3VycmVudFN0YXRlRnJvbTogYW55O1xuXG5cbiAgICAvKipcbiAgICAgKiBUZW1wb3JhcnkgZmllbGQgaG9sZGluZyBhIHN0YXRlIE9iamVjdCBvZiB0eXBlIFQgYmVmb3JlIGl0cyBzYXZlZCBpbnRvIHN0YXRlQ2FjaGVIaXN0b3J5LFxuICAgICAqIGFuZCByZXRyaWV2ZWQgd2hlbiBnZXR0aW5nIHRvIFN0YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjdXJyZW50U3RhdGVUbzogYW55O1xuXG4gICAgLypcbiAgICAgKiBFdmVudCBvYmplY3QgZm9yIHJlZ2lzdGVyaW5nIGxpc3RlbmVycyB0byBzYXZlIGEgY2VydGFpbiBzdGF0ZSBhcyB3ZWxsIGFzIGJyb2FkY2FzdGluZyBiYWNrXG4gICAgICogd2hlbiBzdGF0ZSBuZWVkcyB0byBiZSByZXRyaWV2ZWQgYmFjayB0byB0aGUgUGFnZVxuICAgICAqXG4gICAgICovXG4gICAgc3RhdGVDYWNoZTogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG91ciBjYWNoZSB3aGljaCBtYXBzIFVSTCA9PiB0byA9ID5TVEFURS4gQW55IHBhZ2UgY2FuIHNhdmUgYW55IHN0YXRlIHVzaW5nXG4gICAgICogb2JzZXJ2YWJsZSBvYmplY3Qgd2hpY2ggd2lsbCBiZSByZXRyaWV2ZWQgYmFjay5cbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRlQ2FjaGVIaXN0b3J5OiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJvdXRlcjogUm91dGVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLnN1YnNjcmliZVRvUm91dGluZ0V2ZW50cyhldmVudCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSGVyZSBpcyB0aGUgbWFpbiByb3V0aW5nIGxvZ2ljIHRoYXQgcHJvY2VzZXMgZXZlcnkgcm91dGluZyBldmVudHMuXG4gICAgICpcbiAgICAgKi9cbiAgICBzdWJzY3JpYmVUb1JvdXRpbmdFdmVudHMoZXZlbnQ6IEV2ZW50KTogdm9pZFxuICAgIHtcblxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgICAgICBsZXQgdXJsID0gZXZlbnQudXJsO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVDYWNoZUhpc3RvcnkuaGFzKHVybCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2FjaGUubmV4dCh0aGlzLnN0YXRlQ2FjaGVIaXN0b3J5LmdldCh1cmwpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2FjaGVIaXN0b3J5LmRlbGV0ZSh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yb3V0aW5nU3RhdGUucHVzaChldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpIHtcblxuICAgICAgICAgICAgbGV0IGl0ZW1CZWZvcmVSb3V0ZSA9IExpc3RXcmFwcGVyLmxhc3Q8RXZlbnQ+KHRoaXMucm91dGluZ1N0YXRlKTtcblxuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuY3VycmVudFN0YXRlRnJvbSkgJiYgaXNQcmVzZW50KGl0ZW1CZWZvcmVSb3V0ZSkgJiYgaXNQcmVzZW50KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUZyb20pICYmIGl0ZW1CZWZvcmVSb3V0ZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQgfHxcbiAgICAgICAgICAgICAgICBpdGVtQmVmb3JlUm91dGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDYWNoZUhpc3Rvcnkuc2V0KGl0ZW1CZWZvcmVSb3V0ZS51cmwsIHRoaXMuY3VycmVudFN0YXRlRnJvbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVGcm9tID0gbnVsbDtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5jdXJyZW50U3RhdGVUbykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2FjaGVIaXN0b3J5LnNldChldmVudC51cmwsIHRoaXMuY3VycmVudFN0YXRlVG8pO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlVG8gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVuaWVudCBHTyBCQUNLIG1ldGhvZC4gd2hpY2ggdGFrZXMgeW91IHRvIHByZXZpb3VzIHJvdXRlIGFsb25nIHdpdGggdGhlIFVSTCBjaGFuZ2UuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGdvQmFjayhudW1PZlN0ZXBzOiBudW1iZXIgPSAxKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gd2UgYXJlIHN0YXJ0aW5nIGZyb20gLTEgYXMgd2UgbmVlZCB0byBhbHNvIHJlbW92ZSBjdXJyZW50IHJvdXRlXG4gICAgICAgIGxldCBzdGVwcyA9IC0xO1xuICAgICAgICBsZXQgbmF2aWdhdGVVcmwgPSAnLzQwNCc7XG4gICAgICAgIHdoaWxlIChzdGVwcyAhPT0gbnVtT2ZTdGVwcykge1xuICAgICAgICAgICAgbGV0IHBvcFN0YXRlID0gdGhpcy5yb3V0aW5nU3RhdGUucG9wKCk7XG4gICAgICAgICAgICBpZiAocG9wU3RhdGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8IHBvcFN0YXRlIGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgbmF2aWdhdGVVcmwgPSBwb3BTdGF0ZS51cmw7XG4gICAgICAgICAgICAgICAgc3RlcHMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwobmF2aWdhdGVVcmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBuYXZpZ2F0aW5nIHRvIGEgbmV3IFBhZ2UgeW91IGNhbiB1c2UgZGlyZWN0bHkgcm91dGVyIG9yIGlmIHlvdSB3YW50IHRvIHJlbWVtYmVyIHNvbWVcbiAgICAgKiBzdGF0ZSB0bmUgdGhpcyBtZXRob2QgY2FuIGJlIHVzZWQgYXMgd2VsbC5cbiAgICAgKlxuICAgICAqL1xuICAgIG5hdmlnYXRlPFQ+KGNvbW1hbmRzOiBhbnlbXSwgc3RhdGU/OiBULCBleHRyYXM/OiBOYXZpZ2F0aW9uRXh0cmFzKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVGcm9tID0gc3RhdGU7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKGNvbW1hbmRzLCBleHRyYXMpO1xuXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBuYXZpZ2F0aW5nIHRvIGEgbmV3IFBhZ2UgeW91IGNhbiB1c2UgZGlyZWN0bHkgcm91dGVyIG9yIGlmIHlvdSB3YW50IHRvIHJlbWVtYmVyIHNvbWVcbiAgICAgKiBzdGF0ZSB0bmUgdGhpcyBtZXRob2QgY2FuIGJlIHVzZWQgYXMgd2VsbC5cbiAgICAgKlxuICAgICAqL1xuICAgIG5hdmlnYXRlV2l0aFJvdXRlPFQ+KHJvdXRlOiBSb3V0ZSwgcGFyYW1zPzogYW55LCBzdGF0ZT86IFQsIGV4dHJhcz86IE5hdmlnYXRpb25FeHRyYXMpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZVRvID0gc3RhdGU7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtyb3V0ZS5wYXRoLCBwYXJhbXNdLCBleHRyYXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRW50cnkgbWV0aG9kIGZvciBicm9hZGNhc3Rpbmcgc3RhdGVDYWNoZSBhbmQgc2VuZGluZyBzYXZlZCBTdGF0ZSBiYWNrIHRvIHRoZSBwYWdlXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGJpbmRTdGF0ZUNhY2hlPFQ+KGxpc3RlbmVyOiAoaXRlbTogVCkgPT4gdm9pZCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc3RhdGVDYWNoZS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKHN0YXRlSXRlbTogVCkgPT4gbGlzdGVuZXIoc3RhdGVJdGVtKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBtZXRob2Qgc28gY2hlY2sgZXh0cmEgcGFyYW1ldGVycyB3aGljaCBhcmUgcGFzc2VkIHVzaW5nIE1hdHJpeCBub3RhdGlvblxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBvcGVyYXRpb24ocm91dGU6IEFjdGl2YXRlZFJvdXRlKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgb3BlcmF0aW9uID0gcm91dGUuc25hcHNob3QucGFyYW1zWydvJ107XG4gICAgICAgIHJldHVybiBpc0JsYW5rKFxuICAgICAgICAgICAgb3BlcmF0aW9uKSB8fCAob3BlcmF0aW9uICE9PSAndmlldycgJiYgb3BlcmF0aW9uICE9PSAnY3JlYXRlJyAmJiBvcGVyYXRpb24gIT09ICdlZGl0JylcbiAgICAgICAgICAgID8gJ3ZpZXcnIDogb3BlcmF0aW9uO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQXNzZW1ibGVzIGEgcGF0aCBiYXNlZCBvbiB0aGUgY3VycmVudCByb3V0ZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHBhdGhGb3JQYWdlKHBhZ2VOYW1lOiBzdHJpbmcsIHBhdGhOYW1lOiBzdHJpbmcpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC51cmx9LyR7cGF0aE5hbWV9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlYXJjaCB0b3AgbGV2ZWwgcm91dGVzIGFuZCByZXR1cm4gUm91dGUgdGhhdCBoYXMgY29tcG9uZW50IG5hbWUgZXF1YWwgdG8gcGFnZU5hbWVcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcm91dGVGb3JQYWdlKHBhZ2VOYW1lOiBzdHJpbmcsIHBhdGhOYW1lPzogc3RyaW5nLCBhY3RpdmF0ZWRQYXRoPzogc3RyaW5nKTogUm91dGVcbiAgICB7XG4gICAgICAgIGxldCBuZXh0Um91dGU6IGFueTtcbiAgICAgICAgLy8gd2UgbmVlZCB0aGlzIGFzIHdlIG5lZWQgdG8gbG9va3VwIGlmIHRoZXJlIGlzIGFueSByb3V0ZSB3aXRoIGdpdmVuIHBhZ2VOYW1lIGFzXG4gICAgICAgIC8vIGNoaWxkIHJvdXRlLCBpZiBub3Qgc2VhcmNoIGZvciBnbG9iYWwgb25jZXNcblxuICAgICAgICBsZXQgbm9ybWFsaXplZFBhdGggPSBhY3RpdmF0ZWRQYXRoLmluZGV4T2YoJy8nKSA9PT0gMCA/IGFjdGl2YXRlZFBhdGguc3Vic3RyaW5nKDEpIDpcbiAgICAgICAgICAgIGFjdGl2YXRlZFBhdGg7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRSb3V0ZTogUm91dGUgPSB0aGlzLnJvdXRlci5jb25maWcuZmluZCgocjogUm91dGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IHJvdXRlUGF0aCA9IHIucGF0aC5pbmRleE9mKCcvJykgPT09IDAgPyByLnBhdGguc3Vic3RyaW5nKDEpIDpcbiAgICAgICAgICAgICAgICAgICAgci5wYXRoO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1ByZXNlbnQobm9ybWFsaXplZFBhdGgpICYmIG5vcm1hbGl6ZWRQYXRoID09PSByb3V0ZVBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gdHJ5IHRvIG1hdGNoIHRoZSBwYXRoIGFuZCBleHBlY3RlZCBwYWdlTmFtZVxuICAgICAgICBpZiAoaXNQcmVzZW50KHBhdGhOYW1lKSAmJiBpc1ByZXNlbnQoY3VycmVudFJvdXRlKSAmJiBjdXJyZW50Um91dGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBuZXh0Um91dGUgPSBjdXJyZW50Um91dGUuY2hpbGRyZW4uZmluZCgocjogUm91dGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudE5hbWUgPSByLmNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aE5hbWUgPT09IHIucGF0aCAmJiBwYWdlTmFtZSA9PT0gY29tcG9uZW50TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChwYWdlTmFtZSkpIHtcblxuICAgICAgICAgICAgbmV4dFJvdXRlID0gdGhpcy5yb3V0ZXIuY29uZmlnLmZpbmQoKHI6IFJvdXRlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnROYW1lID0gci5jb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGhOYW1lID09PSByLnBhdGggJiYgcGFnZU5hbWUgPT09IGNvbXBvbmVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwYXRoIG5vdCBmb3VuZCB0aGVuIGNoZWNrIG9ubHkgaWYgd2UgZmluZCBhbnl3aGVyZSBpbiB0aGUgcGF0aCBwYWdlTmFlXG4gICAgICAgIGlmIChpc0JsYW5rKG5leHRSb3V0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLmNvbmZpZy5mb3JFYWNoKChyOiBSb3V0ZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KHIuY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50TmFtZSA9IHIuY29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFnZU5hbWUgPT09IGNvbXBvbmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3V0ZSA9IHI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dFJvdXRlO1xuICAgIH1cblxufVxuXG5cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIE5vdGlmaWNhdGlvbnMgc2VydmljZSBpcyBhIGltcGxlbWVudGF0aW9uIG9mIHRoZSBwdWJsaXNoL3N1YnNjcmliZSBldmVudCBidXMgZm9yIHB1Ymxpc2hpbmdcbiAqIGFuZCBsaXN0ZW5pbmcgZm9yIGFwcGxpY2F0aW9uIGxldmVsIGV2ZW50cy5cbiAqXG4gKiBUbyBzdWJzY3JpYmUgdG8gc3BlY2lmaWMgZXZlbnQgZS5nLiBVc2VyIExvZ2dlZCBJbiB3aGVyZSB0b3BpYyBpcyBjYWxsZWQgdXNlcjpzaWduZWRJblxuICpcbiAqXG4gKiBgYGB0c1xuICpcbiAqICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgc2VsZWN0b3I6ICdteS1jb21wJyxcbiAqICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICAgICBIZWxsb1xuICogICAgICAgICAgICAgYFxuICogICAgIH0pXG4gKiAgICAgY2xhc3MgTXlDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbiAqICAgICB7XG4gKlxuICogICAgICAgIHN1YnNjcjogU3Vic2NyaXB0aW9uO1xuICpcbiAqICAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25zKSB7XG4gKlxuICogICAgICAgICAgICAgIHRoaXMuc3Vic2NyID0gbm90aWZpY2F0aW9ucy5zdWJzY3JpYmUoJ3VzZXI6c2lnbmVkSW4nLCAobWVzc2FnZTogYW55KSA9PlxuICogICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgLy8gbG9hZCB1c2VyIHByb2ZpbGVcbiAqICAgICAgICAgICAgICB9KTtcbiAqICAgICAgICAgfVxuICpcbiAqICAgICAgICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAqICAgICAgICAgIHtcbiAqICAgICAgICAgICAgIHRoaXMuc3Vic2NyLnVuc3Vic2NyaWJlKCk7XG4gKiAgICAgICAgICB9XG4gKlxuICpcbiAqXG4gKiAgICAgfVxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiBUbyBwdWJsaXNoIGV2ZW50OlxuICpcbiAqIGBgYFxuICogICAgIGxldCBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb247XG4gKiAgICAgbm90aWZpY2F0aW9ucy5wdWJsaXNoKCd1c2VyOnNpZ25lZEluJywgJ1VzZXIganVzdCBzaWduZWQgaW4nKTtcbiAqXG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGNyZWF0ZSBhbmQgbGlzdGVuIGZvciB5b3VyIG93biBhcHBsaWNhdGlvbiBsZXZlbCBldmVudHMgb3IgeW91IGNhbiBhbHNvIGxpc3RlbiBmb3IgYWxsXG4gKiB0aGUgdG9waWNzIGluIHRoZSBhcHBsaWNhdGlvbiBpZiB5b3UgdXNlICBgKmAgYXMgYXBwbGljYXRpb24gdG9waWNcbiAqXG4gKiBVbnN1YnNjcmliaW5nIGlzIHJlc3BvbnNpYmlsaXR5ICBvZiBlYWNoIHN1YnNjcmliZXJcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25zXG57XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoaXMgaXMgdXNlZCBhcyBhIHRvcGljIHN1YnNjcmliZXIgcmVjZWl2ZXMgYWxsIG1lc3NhZ2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgQWxsVG9waWNzID0gJyonO1xuXG4gICAgLyoqXG4gICAgICogT2JzZXJ2YWJsZSB1c2VkIHRvIHB1Ymxpc2ggYW5kIHN1YnNjcmliZSB0byBhcHBsaWNhdGlvbiBsZXZlbCBldmVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIGV2ZW50czogU3ViamVjdDxNZXNzYWdlPjtcblxuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgU3ViamVjdDxNZXNzYWdlPigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU3Vic2NyaWJlIHRvIHNwZWNpZmljIGxpc3RlbmVyIGJhc2VkIG9uIGdpdmVuIHRvcGljLlxuICAgICAqXG4gICAgICovXG4gICAgc3Vic2NyaWJlKHRvcGljOiBzdHJpbmcsIHN1YnNjcmliZXI6ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogU3Vic2NyaXB0aW9uXG4gICAge1xuICAgICAgICBjb25zdCB0b0FsbCA9IE5vdGlmaWNhdGlvbnMuQWxsVG9waWNzO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKG1zZyA9PiBtc2cudG9waWMgPT09IHRvcGljIHx8IHRvcGljID09PSB0b0FsbCksXG4gICAgICAgICAgICBtYXAoKG1zZzogTWVzc2FnZSkgPT4gbXNnLmNvbnRlbnQpXG5cbiAgICAgICAgKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBQdWJsaXNoIG5ldyBldmVudCB0byBhIHRvcGljXG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaXNoKHRvcGljOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBtc2c6IE1lc3NhZ2UgPSB7dG9waWM6IHRvcGljLCBjb250ZW50OiBtZXNzYWdlfTtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChtc2cpO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICpcbiAqIEJhc2UgY2xhc3MgZm9yIGdlbmVyaWMgbWVzc2FnZVxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlXG57XG4gICAgdG9waWM6IHN0cmluZztcbiAgICBjb250ZW50OiBhbnk7XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge0Vycm9ySGFuZGxlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05vdGlmaWNhdGlvbnN9IGZyb20gJy4vbWVzc2FnaW5nL25vdGlmaWNhdGlvbnMuc2VydmljZSc7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnLi91dGlscy9sYW5nJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2xvYmFsRXJyb3JIYW5kbGVyIGV4dGVuZHMgRXJyb3JIYW5kbGVyXG57XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9ucz86IE5vdGlmaWNhdGlvbnMpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubm90aWZpY2F0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5wdWJsaXNoKCdhcHA6ZXJyb3InLCBlcnJvcik7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZSwgUm91dGVzfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtOb3RGb3VuZENvbXBvbmVudH0gZnJvbSAnLi9ub3QtZm91bmQvbm90LWZvdW5kLmNvbXBvbmVudCc7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHtwYXRoOiAnbm90LWZvdW5kJywgY29tcG9uZW50OiBOb3RGb3VuZENvbXBvbmVudH1cbl07XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXG4gICAgXSxcbiAgICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFyaWJhQ29yZVJvdXRpbmdNb2R1bGVcbntcbn1cbiIsIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgICBIdHRwRXZlbnQsXG4gICAgSHR0cEhhbmRsZXIsXG4gICAgSHR0cEludGVyY2VwdG9yLFxuICAgIEh0dHBSZXF1ZXN0LFxuICAgIEh0dHBSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0aHJvd0Vycm9yIGFzIG9ic2VydmFibGVUaHJvd0Vycm9yLCBvZiBhcyBvYnNlcnZhYmxlT2YsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIGlzU3RyaW5nfSBmcm9tICcuLi91dGlscy9sYW5nJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uL2RvbWFpbi9yZXNvdXJjZS5zZXJ2aWNlJztcblxuXG4vKipcbiAqIFR5cGVkIGludGVyZmFjZWQgdG8gcHJvY2VzcyBlYXNpZXIgcm91dGVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9ja1JvdXRlc1xue1xuICAgIHJlc291cmNlOiBzdHJpbmc7XG4gICAgcm91dGVzOiBNb2NrUm91dGVbXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTW9ja1JvdXRlXG57XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIG1ldGhvZDogc3RyaW5nO1xuICAgIHJlc3BvbnNlQ29kZTogbnVtYmVyO1xuICAgIHJlc3BvbnNlVGV4dDogc3RyaW5nO1xuICAgIGRhdGE6IGFueSB8IG51bGw7XG59XG5cbi8qKlxuICogSW50ZXJjZXB0b3IgcHJvdmlkaW5nIE1vY2sgU2VydmVyIGZ1bmN0aW9uYWxpdHkgYW5kIGlzIGluc2VydGVkIG9ubHkgYW5kIGlmIG1vY2sgc2VydmVyIGlzXG4gKiBlbmFibGVkIHVzaW5nIEFwcENvbmZpZydzIGNvbm5lY3Rpb24ubW9jay1zZXJ2ZXIuZW5hYmxlZCBib290c3RyYXAgcHJvcGVydHlcbiAqXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cE1vY2tJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvclxue1xuXG4gICAgLyoqXG4gICAgICogU3RvcmVzIGxvYWRlZCByb3V0ZXMgYnkgZ2l2ZW4gZW50aXR5IG5hbWUuXG4gICAgICpcbiAgICAgKi9cbiAgICByb3V0ZXNCeUVudGl0eTogTWFwPHN0cmluZywgTW9ja1JvdXRlW10+ID0gbmV3IE1hcDxzdHJpbmcsIE1vY2tSb3V0ZVtdPigpO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcENvbmZpZzogQXBwQ29uZmlnKVxuICAgIHtcblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElmIHJvdXRlIGlzIGZvdW5kIHJldHVybmVkIE1vY2sgcmVzdWxlZCBkZWZpbmVkIGluIHRoZSBKU09OIGZpbGVzLCBvdGhlcndpc2UgcGFzc1xuICAgICAqIHRoZSByZXF1ZXN0IHRvIHRoZSBuZXh0IGludGVyY2VwdG9yLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+XG4gICAge1xuXG4gICAgICAgIGxldCBtb2NrZWRSZXNwID0gdGhpcy5tYWtlUmVzKHJlcSk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChtb2NrZWRSZXNwKSkge1xuXG4gICAgICAgICAgICBpZiAobW9ja2VkUmVzcC5zdGF0dXMgPj0gMjAwICYmIG1vY2tlZFJlc3Auc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZig8SHR0cFJlc3BvbnNlPGFueT4+bW9ja2VkUmVzcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBlcnJyb3IgPSBuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogbW9ja2VkUmVzcC5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IG1vY2tlZFJlc3Auc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiBtb2NrZWRSZXNwLnN0YXR1c1RleHQsXG4gICAgICAgICAgICAgICAgICAgIHVybDogcmVxLnVybFdpdGhQYXJhbXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJyb3IpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEJhc2VkIG9uIHVzZXIgY29uZmlndXJhdGlvbiB3ZSBsb2FkIGFsbCB0aGUgYXZhaWxhYmxlIHJvdXRlcyBhbmQgcmVnaXN0ZXIgdGhlbSBpbnRvXG4gICAgICogYHRoaXMucm91dGVzQnlFbnRpdHlgXG4gICAgICpcbiAgICAgKi9cbiAgICBsb2FkUm91dGVzKClcbiAgICB7XG4gICAgICAgIGxldCByb3V0ZXM6IHN0cmluZ1tdID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5Db25uZWN0aW9uTW9ja1NlcnZlclJvdXRlcyk7XG4gICAgICAgIGZvciAobGV0IHJvdXRlTmFtZSBvZiByb3V0ZXMpIHtcbiAgICAgICAgICAgIGxldCByZXE6IEh0dHBSZXF1ZXN0PGFueT4gPSB0aGlzLm1ha2VSZXEocm91dGVOYW1lKTtcblxuICAgICAgICAgICAgLy8gbGV0J3MgbWFrZSBxdWljayBhbmQgZGlydHkgYXN5bmMgY2FsbCB0byBsb2FkIG91ciByb3V0ZXMgYmVmb3JlIGFueXRoaW5nIGVsc2VcbiAgICAgICAgICAgIGxldCBtb2NrZWQ6IE1vY2tSb3V0ZXMgPSB0aGlzLnJlcXVlc3RGb3JSb3V0ZXMocmVxKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVzQnlFbnRpdHkuc2V0KG1vY2tlZC5yZXNvdXJjZSwgbW9ja2VkLnJvdXRlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0dXJucyBjb25maWd1cmF0aW9uIGJhc2VkIG9uIG1vY2sgSlNPTiBmaWxlcy5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVxdWVzdEZvclJvdXRlcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBNb2NrUm91dGVzXG4gICAge1xuXG4gICAgICAgIGxldCB4bWxIdHRwUmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cblxuICAgICAgICB4bWxIdHRwUmVxLm9wZW4ocmVxLm1ldGhvZCwgcmVxLnVybFdpdGhQYXJhbXMsIGZhbHNlKTtcblxuICAgICAgICByZXEuaGVhZGVycy5rZXlzKCkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBhbGwgPSByZXEuaGVhZGVycy5nZXRBbGwoa2V5KTtcbiAgICAgICAgICAgIHhtbEh0dHBSZXEuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCBhbGwuam9pbignLCcpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHhtbEh0dHBSZXEuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicpO1xuICAgICAgICB4bWxIdHRwUmVxLnNlbmQobnVsbCk7XG5cblxuICAgICAgICBsZXQgYm9keSA9IGlzQmxhbmsoeG1sSHR0cFJlcS5yZXNwb25zZSkgPyB4bWxIdHRwUmVxLnJlc3BvbnNlVGV4dCA6XG4gICAgICAgICAgICB4bWxIdHRwUmVxLnJlc3BvbnNlO1xuXG4gICAgICAgIGlmICh4bWxIdHRwUmVxLnN0YXR1cyA8IDIwMCAmJiB4bWxIdHRwUmVxLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgTW9jayBzZXJ2ZXIgY29uZmlndXJhdGlvbi4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHlvdScgK1xuICAgICAgICAgICAgICAgICcgaGF2ZSBhIG1vY2stcm91dGluZy8gZm9sZGVyIHVuZGVyIHlvdXIgYXNzZXRzJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXNTdHJpbmcoYm9keSkgPyBKU09OLnBhcnNlKGJvZHkpIDogYm9keTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ3JlYXRlIGEgcmVxdWVzdHMgdG8gbG9hZCByb3V0ZXNcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZVJlcShyb3V0ZU5hbWU6IHN0cmluZyk6IEh0dHBSZXF1ZXN0PGFueT5cbiAgICB7XG4gICAgICAgIGxldCBhc3NldEZvbGRlcjogc3RyaW5nID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5Bc3NldEZvbGRlcik7XG4gICAgICAgIGxldCBwYXRoOiBzdHJpbmcgPSB0aGlzLmFwcENvbmZpZy5nZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25Nb2NrU2VydmVyUGF0aCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdCgnR0VUJywgYCR7YXNzZXRGb2xkZXJ9JHtwYXRofS8ke3JvdXRlTmFtZX0uanNvbmAsIHtcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIHdlIGFyZSBjcmVhdGluZyBhIHJlc3BvbnNlIHdlIGFsd2F5cyBleHBlY3QgdHdvIHRoaW5nczpcbiAgICAgKiAxKSBXZSBhcmUgZGVhbGluZyB3aXRoIEVudGl0eVxuICAgICAqIDIpIFJFU1QgQVBJIGlzIGhhbmRsZWQgdXNpbmcgUmVzb3VyY2Ugd2hpY2ggcHJlcGVuZCAvbW9ja2VkL1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBtYWtlUmVzKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IEh0dHBSZXNwb25zZTxhbnk+XG4gICAge1xuICAgICAgICBsZXQgcmVzcG9uc2VPcDogSHR0cFJlc3BvbnNlPGFueT47XG5cbiAgICAgICAgbGV0IHBhdGggPSByZXEudXJsV2l0aFBhcmFtcy5zdWJzdHJpbmcocmVxLnVybC5pbmRleE9mKCdtb2NrZWQnKSArIDYpO1xuICAgICAgICBsZXQgcmVzb3VyY2UgPSBwYXRoLnN1YnN0cmluZygxKTtcbiAgICAgICAgaWYgKHJlc291cmNlLmluZGV4T2YoJy8nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJlc291cmNlID0gcmVzb3VyY2Uuc3Vic3RyaW5nKDAsIHJlc291cmNlLmluZGV4T2YoJy8nKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb3V0ZXNCeUVudGl0eS5oYXMocmVzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXNwb25zZU9wID0gdGhpcy5kb0hhbmRsZVJlcXVlc3QocmVxLCBwYXRoLCByZXNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayhyZXNwb25zZU9wKSAmJiB0aGlzLmFwcENvbmZpZy5nZXRCb29sZWFuKEFwcENvbmZpZy5JblRlc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgYm9keToge30sIHN0YXR1czogNDA0LCBzdGF0dXNUZXh0OiAnTm90IEZvdW5kJyxcbiAgICAgICAgICAgICAgICB1cmw6IHJlcS51cmxXaXRoUGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VPcDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyB3aWxsIGdldCB0aGUgY29udGVudCBmcm9tIHRoZSByb3V0ZXMgLT4gcm91dGUgYXMgaXQgYXMgYW5kIHJldHVybiBpdCBhcyBhXG4gICAgICogcmVzcG9uc2VcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgZG9IYW5kbGVSZXF1ZXN0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgcGF0aDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlOiBzdHJpbmcpOiBIdHRwUmVzcG9uc2U8YW55PlxuICAgIHtcbiAgICAgICAgbGV0IHJvdXRlczogTW9ja1JvdXRlW10gPSB0aGlzLnJvdXRlc0J5RW50aXR5LmdldChyZXNvdXJjZSk7XG5cbiAgICAgICAgbGV0IG1hdGNoZWRSb3V0ZSA9IHJvdXRlcy5maW5kSW5kZXgoKGVsOiBNb2NrUm91dGUpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiByZXEubWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09IGVsLm1ldGhvZC50b0xvd2VyQ2FzZSgpICYmIGVsLnBhdGggPT09IHBhdGg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtYXRjaGVkUm91dGUgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgcm91dGU6IE1vY2tSb3V0ZSA9IHJvdXRlc1ttYXRjaGVkUm91dGVdO1xuXG4gICAgICAgICAgICBsZXQgcGF5bG9hZDogUmVzcG9uc2U8YW55PiA9IHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiAgcm91dGUuZGF0YVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVzcG9uc2U8UmVzcG9uc2U8YW55Pj4oe1xuICAgICAgICAgICAgICAgIGJvZHk6IHBheWxvYWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByb3V0ZS5yZXNwb25zZUNvZGUsXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogcm91dGUucmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgICAgIHVybDogcm91dGUucGF0aFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBIdHRwSGFuZGxlciBzbyB3ZSBjYW4gaGF2ZSBjdXN0b20gYmVoYXZpb3IgdG8gSFRUUENsaWVudFxuICovXG5leHBvcnQgY2xhc3MgTW9ja0ludGVyY2VwdG9ySGFuZGxlciBpbXBsZW1lbnRzIEh0dHBIYW5kbGVyXG57XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZXh0OiBIdHRwSGFuZGxlciwgcHJpdmF0ZSBpbnRlcmNlcHRvcjogSHR0cEludGVyY2VwdG9yKVxuICAgIHtcbiAgICB9XG5cbiAgICBoYW5kbGUocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVyY2VwdG9yLmludGVyY2VwdChyZXEsIHRoaXMubmV4dCk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtNZXRhLCBUaXRsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICAgIEFQUF9JTklUSUFMSVpFUixcbiAgICBFcnJvckhhbmRsZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIEluamVjdG9yLFxuICAgIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gICAgTmdNb2R1bGUsXG4gICAgT3B0aW9uYWwsXG4gICAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEhUVFBfSU5URVJDRVBUT1JTLFxuICAgIEh0dHBCYWNrZW5kLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgSHR0cEhhbmRsZXIsXG4gICAgSHR0cEludGVyY2VwdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtBcHBDb25maWcsIG1ha2VDb25maWd9IGZyb20gJy4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnLi9jb25maWcvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHtOb3RGb3VuZENvbXBvbmVudH0gZnJvbSAnLi9ub3QtZm91bmQvbm90LWZvdW5kLmNvbXBvbmVudCc7XG5pbXBvcnQge1JvdXRpbmdTZXJ2aWNlfSBmcm9tICcuL3JvdXRpbmcvcm91dGluZy5zZXJ2aWNlJztcbmltcG9ydCB7R2xvYmFsRXJyb3JIYW5kbGVyfSBmcm9tICcuL2dsb2JhbC1lcnJvci1oYW5kbGVyJztcbmltcG9ydCB7QXJpYmFDb3JlUm91dGluZ01vZHVsZX0gZnJvbSAnLi9hcmliYS1jb3JlLXJvdXRpbmcubW9kdWxlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uc30gZnJvbSAnLi9tZXNzYWdpbmcvbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7SHR0cE1vY2tJbnRlcmNlcHRvciwgTW9ja0ludGVyY2VwdG9ySGFuZGxlcn0gZnJvbSAnLi9odHRwL2h0dHAtbW9jay1pbnRlcmNlcHRvcic7XG5pbXBvcnQge1Jlc291cmNlfSBmcm9tICcuL2RvbWFpbi9yZXNvdXJjZS5zZXJ2aWNlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgY29uc3QgVXNlckNvbmZpZyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdVc2VyQ29uZmlnJyk7XG5cblxuLyoqXG4gKiBDb3JlIG1vZGUgaW5jbHVkZXMgYWxsIHNoYXJlZCBsb2dpYyBhY2Nyb3NzIHdob2xlIGFwcGxpY2F0aW9uXG4gKi9cbiAgICAvLyB0b2RvOiBmb3IgQU9UIHVzZSBleHBvcnRlZCBmdW5jdGlvbnMgZm9yIGZhY3RvcmllcyBpbnN0ZWFkcyB0aGlzIGlubGluZSBvbmVzLlxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICAgICAgQXJpYmFDb3JlUm91dGluZ01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbTm90Rm91bmRDb21wb25lbnRdLFxuXG4gICAgYm9vdHN0cmFwOiBbXVxuXG59KVxuZXhwb3J0IGNsYXNzIEFyaWJhQ29yZU1vZHVsZSB7XG5cbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFyaWJhQ29yZU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIFRpdGxlLFxuICAgICAgICAgICAgICAgIE1ldGEsXG4gICAgICAgICAgICAgICAgRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9ucyxcbiAgICAgICAgICAgICAgICBIdHRwTW9ja0ludGVyY2VwdG9yLFxuXG4gICAgICAgICAgICAgICAgUmVzb3VyY2UsXG5cbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogVXNlckNvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBBcHBDb25maWcsIHVzZUZhY3Rvcnk6IG1ha2VDb25maWcsXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtVc2VyQ29uZmlnLCBJbmplY3RvciwgRW52aXJvbm1lbnRdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IEh0dHBIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiBtYWtlSHR0cENsaWVudEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIEh0dHBCYWNrZW5kLCBBcHBDb25maWcsIEh0dHBNb2NrSW50ZXJjZXB0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmV3IE9wdGlvbmFsKCksIG5ldyBJbmplY3QoSFRUUF9JTlRFUkNFUFRPUlMpXVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VDbGFzczogR2xvYmFsRXJyb3JIYW5kbGVyLCBkZXBzOiBbTm90aWZpY2F0aW9uc119LFxuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBSb3V0aW5nU2VydmljZSwgdXNlQ2xhc3M6IFJvdXRpbmdTZXJ2aWNlLCBkZXBzOiBbUm91dGVyXX1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogQXJpYmFDb3JlTW9kdWxlLCBwcml2YXRlIGNvbmY6IEFwcENvbmZpZykge1xuXG4gICAgfVxuXG59XG5cblxuLyoqXG4gKlxuICogQWRkIGN1c3RvbSBNb2NrIGZ1bmN0aW9uYWxpdHkgb25seSBhbmQgaWYgd2UgZW5hYmxlZCB0aGlzIGluIHRoZSBzZXR0aW5ncy4gSSBkb250IHJlYWxseSB3YW50IHRvXG4gKiBoYXZlIE5vb3BJbnRlcmNlcHRlciBpbiB0aGUgY2hhaW5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSHR0cENsaWVudEhhbmRsZXIobmdCYWNrZW5kOiBIdHRwQmFja2VuZCwgY29uZmlnOiBBcHBDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tJbnRlcmNlcHRvcjogSHR0cE1vY2tJbnRlcmNlcHRvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSB8IG51bGwgPSBbXSk6IEh0dHBIYW5kbGVyIHtcbiAgICBpZiAoY29uZmlnLmdldEJvb2xlYW4oQXBwQ29uZmlnLkNvbm5lY3Rpb25Vc2VNb2NrU2VydmVyKSkge1xuXG4gICAgICAgIG1vY2tJbnRlcmNlcHRvci5sb2FkUm91dGVzKCk7XG4gICAgICAgIGludGVyY2VwdG9ycyA9IFsuLi5pbnRlcmNlcHRvcnMsIG1vY2tJbnRlcmNlcHRvcl07XG4gICAgfVxuXG4gICAgaWYgKCFpbnRlcmNlcHRvcnMpIHtcbiAgICAgICAgcmV0dXJuIG5nQmFja2VuZDtcbiAgICB9XG4gICAgcmV0dXJuIGludGVyY2VwdG9ycy5yZWR1Y2VSaWdodChcbiAgICAgICAgKG5leHQsIGludGVyY2VwdG9yKSA9PiBuZXcgTW9ja0ludGVyY2VwdG9ySGFuZGxlcihuZXh0LCBpbnRlcmNlcHRvciksIG5nQmFja2VuZCk7XG59XG5cblxuIiwiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQgKiBhcyBvYmplY3RQYXRoIGZyb20gJ29iamVjdC1wYXRoJztcbmltcG9ydCB7aXNCbGFuaywgaXNTdHJpbmcsIGlzU3RyaW5nTWFwfSBmcm9tICcuL2xhbmcnO1xuXG5cbi8qKlxuICogVGhlIEZpZWxkUGF0aCBpcyB1dGlsaXR5IGNsYXNzIGZvciByZXByZXNlbnRpbmcgb2YgYSBkb3R0ZWQgZmllbGRQYXRoLlxuICpcbiAqIEEgU3RyaW5nIHN1Y2ggYXMgXCJmb28uYmFyLmJhelwiIGNhbiBiZSB1c2VkIHRvIGFjY2VzcyBhIHZhbHVlIG9uIGEgdGFyZ2V0IG9iamVjdC5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWVsZFBhdGhcbntcbiAgICBfZmllbGRQYXRoczogc3RyaW5nW107XG4gICAgcHJpdmF0ZSBvYmplY3RQYXRoSW5zdGFuY2U6IGFueTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2V0cyBhIHZhbHVlIHRvIHRhcmdldCBvYmplY3RzXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0RmllbGRWYWx1ZSh0YXJnZXQ6IGFueSwgZmllbGQ6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBmcCA9IG5ldyBGaWVsZFBhdGgoZmllbGQpO1xuICAgICAgICBmcC5zZXRGaWVsZFZhbHVlKHRhcmdldCwgdmFsdWUpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVhZHMgYSB2YWx1ZSBmcm9tIHRhcmdldCBvYmplY3RzXG4gICAgICovXG4gICAgc3RhdGljIGdldEZpZWxkVmFsdWUodGFyZ2V0OiBhbnksIGZpZWxkOiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBmcCA9IG5ldyBGaWVsZFBhdGgoZmllbGQpO1xuICAgICAgICBsZXQgdmFsdWUgPSBmcC5nZXRGaWVsZFZhbHVlKHRhcmdldCk7XG5cbiAgICAgICAgaWYgKGZpZWxkID09PSAnJHRvU3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhdGg6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuX2ZpZWxkUGF0aHMgPSBpc0JsYW5rKF9wYXRoKSA/IFtdIDogX3BhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgdGhpcy5vYmplY3RQYXRoSW5zdGFuY2UgPSAoPGFueT5vYmplY3RQYXRoKVsnY3JlYXRlJ10oe2luY2x1ZGVJbmhlcml0ZWRQcm9wczogdHJ1ZX0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBPbmUgb2YgdGhlIG1haW4gcmVhc29uIHdoeSBJIGhhdmUgdGhpcyBpcyBub3Qgb25seSB0byBpdGVyYXRlIHRocnUgZG90dGVkIGZpZWxkIHBhdGggYnV0XG4gICAgICogbWFpbmx5IHRvIGJlIGFibGUgdG8gc2V0IG5hdHVyYWxseSB2YWx1ZSBpbnRvIGEgbmVzdGVkIG1hcHMgbGlrZSA6XG4gICAgICpcbiAgICAgKiAgZmllbGROYW1lLmZpZWxkTmFtZU1hcC5maWVsZEtleSA9PiBpdCB3aWxsIGFjY2VzcyBmaWVsZE5hbWUgb24gdGhlIHRhcmdldCwgZnJvbSB0aGVyZSBpdFxuICAgICAqIHJlYWRzIEZpZWxkTmFtZU1hcCBzaW5jZSBmaWVsZE5hbWUgbmVzdGVkIG9iamVjdHMgYW5kIHNldHMgYSBuZXcgdmFsdWUgaWRlbnRpZmllZCBieSBNYXAga2V5XG4gICAgICogZmllbGRLZXlcbiAgICAgKlxuICAgICAqICBgYGBcbiAgICAgKiAgY2xhc3MgTXlDbGFzcyB7XG4gICAgICogICAgICBmaWVsZE5hbWU6TmVzdGVkT2JqZWN0XG4gICAgICpcbiAgICAgKiAgfVxuICAgICAqXG4gICAgICogIGNsYXNzIE5lc3RlZE9iamVjdCB7XG4gICAgICogICAgICBmaWVsZE5hbWVNYXA6TWFwPGtleSwgdmFsdWU+O1xuICAgICAqICB9XG4gICAgICpcbiAgICAgKiAgYGBgXG4gICAgICogdXNlIGZpZWxkIHZhbHVlIGZvciBhc3NpZ25tZW50IHNvIGtleXMgb2YgZm9ybSBcImEuYi5jXCIgd2lsbCBnbyBpbiBuZXN0ZWQgTWFwc1xuICAgICAqL1xuICAgIHNldEZpZWxkVmFsdWUodGFyZ2V0OiBhbnksIHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBpbXBsZW1lbnQgdGhlIHNhbWUgdGhpbmcgd2hhdCB3ZSBoYXZlIG9uIHRoZSBnZXQsIGlmIE1hcCBzZXQgZmllbGQgaW50byBtYXBcbiAgICAgICAgaWYgKHRoaXMuX2ZpZWxkUGF0aHMubGVuZ3RoID4gMSAmJiAhKHRhcmdldCBpbnN0YW5jZW9mIE1hcCkpIHtcblxuICAgICAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9maWVsZFBhdGhzLnNsaWNlKDAsIHRoaXMuX2ZpZWxkUGF0aHMubGVuZ3RoIC0gMSkuam9pbignLicpO1xuICAgICAgICAgICAgbGV0IG9iamVjdFRvQmVVcGRhdGVkID0gdGhpcy5vYmplY3RQYXRoSW5zdGFuY2UuZ2V0KHRhcmdldCwgcGF0aCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0VG9CZVVwZGF0ZWQgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICBvYmplY3RUb0JlVXBkYXRlZC5zZXQodGhpcy5fZmllbGRQYXRoc1t0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCAtIDFdLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0UGF0aEluc3RhbmNlLnNldCh0YXJnZXQsIHRoaXMuX3BhdGgsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgIGxldCBtYXBUYXJnZXQ6IE1hcDxzdHJpbmcsIGFueT4gPSB0YXJnZXQ7XG4gICAgICAgICAgICAvLyBoYW5kbGUgTmVzdGVkIE1hcFxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZpZWxkUGF0aHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gdGhpcy5fZmllbGRQYXRocy5zcGxpY2UoMCwgMSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmVzdGVkTWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gbWFwVGFyZ2V0LmdldChwYXRoWzBdKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNCbGFuayhuZXN0ZWRNYXApKSB7XG4gICAgICAgICAgICAgICAgICAgIG5lc3RlZE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgICAgICAgICAgICAgIG1hcFRhcmdldC5zZXQocGF0aFswXSwgbmVzdGVkTWFwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZFZhbHVlKG5lc3RlZE1hcCwgdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0KHRoaXMuX2ZpZWxkUGF0aHNbMF0sIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0UGF0aEluc3RhbmNlLnNldCh0YXJnZXQsIHRoaXMuX3BhdGgsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIHJlYXNvbiBhcyBmb3IgU2V0RmllbGRWYWx1ZS4gTmVlZCB0byBiZSBhYmxlIHRvIHJlYWQgdmFsdWUgYnkgZG90dGVkIHBhdGggYXMgd2VsbFxuICAgICAqIGFzIHJlYWR5IHZhbHVlIGZyb20gTWFwcy5cbiAgICAgKlxuICAgICAqIHRvZG86IHRoaXMgaXMgcXVpY2sgYW5kIGRpcnR5IGltcGxlbWVudGF0aW9uIC0gbmVlZCB0byB3cml0ZSBiZXR0ZXIgc29sdXRpb25cbiAgICAgKi9cbiAgICBnZXRGaWVsZFZhbHVlKHRhcmdldDogYW55KTogYW55XG4gICAge1xuICAgICAgICBsZXQgdmFsdWU6IGFueTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9maWVsZFBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKGlzU3RyaW5nTWFwKHRhcmdldCkgfHwgaXNTdHJpbmcodGFyZ2V0KSkgJiYgISh0YXJnZXQgaW5zdGFuY2VvZiBNYXApKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZS5nZXQodGFyZ2V0LCB0aGlzLl9maWVsZFBhdGhzW2ldKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldE1hcDogTWFwPHN0cmluZywgYW55PiA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRhcmdldE1hcC5nZXQodGhpcy5fZmllbGRQYXRoc1tpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGp1c3QgdHdlYWsgdG8gYmUgYWJsZSB0byBhY2Nlc3MgbWFwcyBmaWVsZC5zb21lTWFwRmllbGQubWFwS2V5XG4gICAgICAgICAgICAvLyBJIHdhbnQgdGhpcyB0byBnZXQgdGhlIGVsZW1lbnQgZnJvbSB0aGUgbWFwXG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgKGkgKyAxKSA8IHRoaXMuX2ZpZWxkUGF0aHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hcFZhbHVlID0gPE1hcDxzdHJpbmcsIGFueT4+IHZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXBWYWx1ZS5nZXQodGhpcy5fZmllbGRQYXRoc1tpICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBwYXRoKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgICB9XG5cbn1cblxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtpc0JsYW5rfSBmcm9tICcuL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtNZXRhIGFzIE1ldGFUYWdzLCBUaXRsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBOb3Rpb24gb2YgaGF2aW5nIGBBcmliYUFwcGxpY2F0aW9uYCBjbGFzcyBjYW1lIGZyb20gIGEgc2ltcGxlIHJlcXVpcmVtZW50IHRoYXQgZXZlcnkgc2luZ2xlXG4gKiBhcHBsaWNhdGlvbiBuZWVkcyBhIGNvbW1vbiB3YXkgaG93IHRvIGluaXRpYWxpemUuXG4gKlxuICogV2Ugd2FudCB0byBiZSBtb3JlIGFwcGxpY2F0aW9uIHNwZWNpZmljIHRoZXJlZm9yZSB3ZSBkb24ndCB3YW50IHRvIGhhdmUgZ2VuZXJpYyBuYW1lcyBzdWNoIGFzXG4gKiBgYXBwLmNvbXBvbmVudCBvciBhcHAubW9kdWxlYCwgdGhlIHJvb3QgY29tcG9uZW50IHNob3VsZCBiZSBuYW1lZCBiYXNlZCBvbiB3aGF0IGl0IGlzIGRvaW5nXG4gKiBvciB3aGF0IGlzIHJlYWwgYXBwbGljYXRpb24gbmFtZSBlLmcuOiBUb2RvQXBwLCBTb3VyY2luZ0FwcCwgZXRjcy4gYW5kIHRoZXNlIGFwcGxpY2F0aW9uIHdpbGxcbiAqIGluaGVyaXQgZnJvbSBgQXJpYmFBcHBsaWNhdGlvbmAgdG8gZ2V0IHNvbWUgY29tbW9uIGJlaGF2aW9yLlxuICpcbiAqIFNwZWNpZmljIGFwcGxpY2F0aW9uIHR5cGVzIHdpbGwgZXh0ZW5kcyB0aGlzIGNsYXNzIHRvIGFkZCBtb3JlIGJlaGF2aW9yLlxuICpcbiAqIFRoZXJlIGFyZSB0d28gdHlwZXMgb2YgYm9vdHN0cmFwcGluZyBhbmQgcGFzc2luZyBlbnZpcm9ubWVudCBwYXJhbWV0ZXJzIHRvIHRoZSBhcHBsaWNhdGlvbjpcbiAqXG4gKiAtICBEdXJpbmcgQXJpYmFDb3JlVUkgaW1wb3J0OlxuICpcbiAqICMjIyBleGFtcGxlXG4gKlxuICogYGBgdHNcbiAqICAgICAgQXJpYmFDb3JlTW9kdWxlLmZvclJvb3Qoe1xuICogICAgICAgICAgICAgICAgICAnYXBwLnRpdGxlJzogJ1BsYXlncm91bmQgQXBwbGljYXRpb24nLFxuICogICAgICAgICAgICAgICAgICAnYXNzZXQtZm9sZGVyJzogJ3BsYXlncm91bmQvYXNzZXRzJyxcbiAqICAgICAgICAgICAgICAgICAgJ21ldGF1aS5ydWxlcy5maWxlLW5hbWVzJzogWydBcHBsaWNhdGlvbicsICdMYXlvdXQnXSxcbiAqICAgICAgICAgICAgICAgICAgJ3Jlc3RhcGkuY29udGV4dCc6ICcvbXlTZXJ2aWNlLycsXG4gKiAgICAgICAgICAgICAgICAgICdjb25uZWN0aW9uLm1vY2stc2VydmVyLmVuYWJsZWQnOiB0cnVlLFxuICogICAgICAgICAgICAgICAgICAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5yb3V0ZXMnOiBbJ3VzZXJzJ10sXG4gKiAgICAgICAgICAgICAgfSksXG4gKlxuICogYGBgXG4gKiAgVXNlIHRoaXMgdG8gcGFzcyBzb21lIHN0YXRpYyBwcm9wZXJ0aWVzLlxuICpcbiAqXG4gKiAtICBGcm9tIEFyaWJhQXBwbGljYXRpb24gOlxuICpcbiAqICBXaGVuIHlvdSBoYXZlIHNwZWNpZmljIHR5cGUgb2YgYXBwbGljYXRpb25zIHRoYXQgbmVlZHMgbW9yZSBzZXR0aW5ncyB5b3UgaW5oZXJpdCBmcm9tIHRoaXNcbiAqICBjbGFzcyB0byBleHRlbmQgaXRzIGJlaGF2aW9yIGFuZCB0aGVuIHVzZSBpdCBmb3IgeW91ciBhcHBsaWNhdGlvbnMgdG8gc2hhcmUgY29tbW9uIGJlaGF2aW9yXG4gKlxuICogIyMjIGV4YW1wbGVcbiAqXG4gKiAgYGBgdHNcbiAqXG4gKiAgICAgZXhwb3J0IGNsYXNzIEZhY2Vib29rQXBwbGljYXRpb24gZXh0ZW5kcyBBcmliYUFwcGxpY2F0aW9uIHtcbiAqXG4gKiAgICAgICAgIHByb3RlY3RlZCBhcHBJZDogc3RyaW5nID0gJy4uLi4uJztcbiAqXG4gKlxuICogICAgICAgICAgcHJvdGVjdGVkIGluaXRpYWxpemUoKTogdm9pZFxuICogICAgICAgICAge1xuICogICAgICAgICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAqXG4gKiAgICAgICAgICAgICAgdGhpcy5hcHBJZCA9IHJlYWRBcHBJZGZyb21FbnYoKTtcbiAqXG4gKiAgICAgICAgICAgICAgdGhpcy5hcHBDb25maWcuc2V0KCdmYWNlYm9vay5hcHBJZCcsIHRoaXMuYXBwSWQgKTtcbiAqXG4gKiAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckZCQXV0aGVudGljYXRvcigpO1xuICpcbiAqICAgICAgICAgIH1cbiAqXG4gKiAgICAgfVxuICpcbiAqICBgYGBcbiAqICBPbmNlIHlvdSBkZWZpbmVkIHlvdXIgdHlwZSBvZiBhcHBsaWNhdGlvbiwgdGhlbiB5b3UgY2FuIHN0YXJ0IGNyZWF0aW5nIGFwcGxpY2F0aW9ucyB0aGF0IGluaGVyaXRcbiAqICBmcm9tIHRoaXMgYEZhY2Vib29rQXBwbGljYXRpb25gLiBSb290IEFwcCBjb21wb25lbnRcbiAqXG4gKlxuICogYGBgdHNcbiAqICAgICAgQENvbXBvbmVudCh7Li4ufSlcbiAqICAgICAgZXhwb3J0IFBpY3R1cmVBcHBDb21wb25lbnQgZXh0ZW5kcyBGYWNlYm9va0FwcGxpY2F0aW9uIHtcbiAqICAgICAgICAgICAgIC4uLlxuICpcbiAqICAgICAgfVxuICpcbiAqXG4gKlxuICogICAgIEBOZ01vZHVsZSh7IGJvb3RzdHJhcDogW1BpY3R1cmVBcHBDb21wb25lbnRdIH0pXG4gKiAgICAgZXhwb3J0IGNsYXNzIFBpY3R1cmVBcHBNb2R1bGUge1xuICpcbiAqICAgICB9XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEFyaWJhQXBwbGljYXRpb24gaW1wbGVtZW50cyBPbkluaXRcbntcblxuICAgIC8qKlxuICAgICAqIFRpdGxlIHNlcnZpY2UgZm9yIHNldHRpbmcgcGFnZSB0aXRsZVxuICAgICAqL1xuICAgIHRpdGxlOiBUaXRsZTtcblxuXG4gICAgLyoqXG4gICAgICogTWV0YSBzZXJ2aWNlIGZvciBhZGRpbmcgYW5kIHVwZGF0aW5nIHBhZ2UgbWV0YSB0YWdzXG4gICAgICovXG4gICAgbWV0YVRhZ3M6IE1ldGFUYWdzO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYXBwQ29uZmlnOiBBcHBDb25maWcpXG4gICAge1xuICAgICAgICB0aGlzLm1ldGFUYWdzID0gdGhpcy5hcHBDb25maWcuaW5qZWN0b3IuZ2V0KE1ldGFUYWdzKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMuYXBwQ29uZmlnLmluamVjdG9yLmdldChUaXRsZSk7XG5cblxuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBkZWZhdWx0IGJlaGF2aW9yIGp1c3Qgc2V0cyBhIHRpdGxlIGZvciB0aGUgYXBwbGljYXRpb25cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQXBwVGl0bGUpO1xuICAgICAgICBpZiAoaXNCbGFuayh0aXRsZSkpIHtcbiAgICAgICAgICAgIHRpdGxlID0gJ0FyaWJhIEFwcGxpY2F0aW9uJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpdGxlLnNldFRpdGxlKHRpdGxlKTtcblxuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIiwiQ29sbGVjdGlvbnMuYXJyYXlzIiwiSW5qZWN0aW9uVG9rZW4iLCJpc0Rldk1vZGUiLCJFdmVudEVtaXR0ZXIiLCJJbmplY3RhYmxlIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJodHRwIiwibWFwIiwiSHR0cENsaWVudCIsIkNvbXBvbmVudCIsInJvdXRlciIsIlN1YmplY3QiLCJOYXZpZ2F0aW9uRW5kIiwiTmF2aWdhdGlvblN0YXJ0IiwiUm91dGVyIiwiZmlsdGVyIiwiRXJyb3JIYW5kbGVyIiwiTmdNb2R1bGUiLCJSb3V0ZXJNb2R1bGUiLCJvYnNlcnZhYmxlT2YiLCJIdHRwRXJyb3JSZXNwb25zZSIsIm9ic2VydmFibGVUaHJvd0Vycm9yIiwiSHR0cFJlcXVlc3QiLCJIdHRwUmVzcG9uc2UiLCJUaXRsZSIsIk1ldGEiLCJJbmplY3RvciIsIkh0dHBIYW5kbGVyIiwiSHR0cEJhY2tlbmQiLCJPcHRpb25hbCIsIkluamVjdCIsIkhUVFBfSU5URVJDRVBUT1JTIiwiQ29tbW9uTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSIsIlNraXBTZWxmIiwiKChvYmplY3RQYXRoKSlbJ2NyZWF0ZSddIiwiTWV0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