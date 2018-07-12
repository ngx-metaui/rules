/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as Collections from 'typescript-collections';
import { className, equals, getSymbolIterator, isArray, isBlank, isJsObject, isPresent, isString, StringJoiner } from './lang';
export var /** @type {?} */ createMapFromMap = (function () {
    try {
        if (new Map(/** @type {?} */ (new Map()))) {
            return function createMapFromMapInner(m) {
                return new Map(/** @type {?} */ (m));
            };
        }
    }
    catch (/** @type {?} */ e) {
    }
    return function createMapAndPopulateFromMap(m) {
        var /** @type {?} */ map = new Map();
        m.forEach(function (v, k) {
            map.set(k, v);
        });
        return map;
    };
})();
export var /** @type {?} */ _clearValues = (function () {
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
            for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
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
export { MapWrapper };
/**
 * Wraps Javascript Objects
 */
var /**
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
            for (var _a = tslib_1.__values(Object.keys(map)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var k = _b.value;
                callback(map[k], k);
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
            for (var _a = tslib_1.__values(Object.keys(m1)), _b = _a.next(); !_b.done; _b = _a.next()) {
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
            for (var _d = tslib_1.__values(Object.keys(m2)), _e = _d.next(); !_e.done; _e = _d.next()) {
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
/**
 * Wraps Javascript Objects
 */
export { StringMapWrapper };
/**
 * A boolean-valued function over a value, possibly including context information
 * regarding that value's position in an array.
 * @record
 * @template T
 */
export function Predicate() { }
function Predicate_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (value: T, index?: number, array?: T[]): boolean;
    */
}
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
            for (var l_1 = tslib_1.__values(l), l_1_1 = l_1.next(); !l_1_1.done; l_1_1 = l_1.next()) {
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
            for (var target_1 = tslib_1.__values(target), target_1_1 = target_1.next(); !target_1_1.done; target_1_1 = target_1.next()) {
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
            for (var elements_1 = tslib_1.__values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
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
export { ListWrapper };
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
export function isListLikeIterable(obj) {
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
export function areIterablesEqual(a, b, comparator) {
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
export function iterateListLike(obj, fn) {
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
export function findLast(arr, condition) {
    for (var /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
        if (condition(arr[i])) {
            return arr[i];
        }
    }
    return null;
}
var ɵ0 = function () {
    var /** @type {?} */ test = new Set([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromListInner(lst) {
            return new Set(lst);
        };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            var /** @type {?} */ res = new Set(lst);
            if (res.size !== lst.length) {
                for (var /** @type {?} */ i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
};
// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
var /** @type {?} */ createSetFromList = (ɵ0)();
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBY0EsT0FBTyxLQUFLLFdBQVcsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsU0FBUyxFQUNULE1BQU0sRUFDTixpQkFBaUIsRUFDakIsT0FBTyxFQUNQLE9BQU8sRUFDUCxVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixZQUFZLEVBQ2YsTUFBTSxRQUFRLENBQUM7QUFHaEIsTUFBTSxDQUFDLHFCQUFNLGdCQUFnQixHQUEwQyxDQUFDO0lBQ3BFLElBQUksQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxtQkFBTSxJQUFJLEdBQUcsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQywrQkFBK0IsQ0FBZ0I7Z0JBQ2xELE1BQU0sQ0FBQyxJQUFJLEdBQUcsbUJBQU0sQ0FBQyxFQUFDLENBQUM7YUFDMUIsQ0FBQztTQUNMO0tBQ0o7SUFBQyxLQUFLLENBQUMsQ0FBQyxpQkFBQSxDQUFDLEVBQUUsQ0FBQztLQUNaO0lBQ0QsTUFBTSxDQUFDLHFDQUFxQyxDQUFnQjtRQUN4RCxxQkFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7WUFDWCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ2QsQ0FBQztDQUNMLENBQUMsRUFBRSxDQUFDO0FBQ0wsTUFBTSxDQUFDLHFCQUFNLFlBQVksR0FBaUMsQ0FBQztJQUN2RCxFQUFFLENBQUMsQ0FBQyxtQkFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJ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O0tBQ0w7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxzQ0FBc0MsR0FBVTtZQUNuRCxxQkFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsR0FBRyxDQUFDLENBQUMscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNsQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuQjthQUNKO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNkLENBQUM7S0FDTDtDQUNKOzs7QUFqQkQscUJBQUksaUJBQWlCLEdBQStCLElBaUJsRCxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAb3JpZ2luYWwtbGljZW5zZVxuICpcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKlxuICpcbiAqXG4gKiAgQ3JlZGl0OiBEZXJpdmVkIGFuZCBleHRlbmRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIgaW4gb3JkZXIgdG8gaGF2ZSBzZXQgb2ZcbiAqICByZXVzYWJsZSBnbG9iYWxzLiBTaW5jZSBpdHMgbm90IGV4cG9ydGVkIEFQSSBuZWVkIHRvIGhhdmUgYSBjb3B5IHVuZGVyIGNvcmUuXG4gKi9cbmltcG9ydCAqIGFzIENvbGxlY3Rpb25zIGZyb20gJ3R5cGVzY3JpcHQtY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBjbGFzc05hbWUsXG4gICAgZXF1YWxzLFxuICAgIGdldFN5bWJvbEl0ZXJhdG9yLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc0pzT2JqZWN0LFxuICAgIGlzUHJlc2VudCxcbiAgICBpc1N0cmluZyxcbiAgICBTdHJpbmdKb2luZXJcbn0gZnJvbSAnLi9sYW5nJztcblxuXG5leHBvcnQgY29uc3QgY3JlYXRlTWFwRnJvbU1hcDogeyAobTogTWFwPGFueSwgYW55Pik6IE1hcDxhbnksIGFueT4gfSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKG5ldyBNYXAoPGFueT5uZXcgTWFwKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlTWFwRnJvbU1hcElubmVyKG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1hcCg8YW55Pm0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZU1hcEFuZFBvcHVsYXRlRnJvbU1hcChtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55PiB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICAgICAgbWFwLnNldChrLCB2KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfTtcbn0pKCk7XG5leHBvcnQgY29uc3QgX2NsZWFyVmFsdWVzOiB7IChtOiBNYXA8YW55LCBhbnk+KTogdm9pZCB9ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoKDxhbnk+KG5ldyBNYXAoKSkua2V5cygpKS5uZXh0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBfY2xlYXJWYWx1ZXNJbm5lcihtOiBNYXA8YW55LCBhbnk+KSB7XG4gICAgICAgICAgICBsZXQga2V5SXRlcmF0b3IgPSBtLmtleXMoKTtcbiAgICAgICAgICAgIGxldCBrOiBhbnkgLyoqIFRPRE8gIz8/Pz8gKi87XG4gICAgICAgICAgICB3aGlsZSAoISgoayA9ICg8YW55PmtleUl0ZXJhdG9yKS5uZXh0KCkpLmRvbmUpKSB7XG4gICAgICAgICAgICAgICAgbS5zZXQoay52YWx1ZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9jbGVhclZhbHVlc1dpdGhGb3JlRWFjaChtOiBNYXA8YW55LCBhbnk+KSB7XG4gICAgICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgICAgICBtLnNldChrLCBudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbn0pKCk7XG5cbmV4cG9ydCBjbGFzcyBNYXBXcmFwcGVyIHtcblxuICAgIHN0YXRpYyBjcmVhdGVFbXB0eTxLLCBWPigpOiBNYXA8SywgVj4ge1xuICAgICAgICByZXR1cm4gbmV3IE1hcDxLLCBWPigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbG9uZTxLLCBWPihtOiBNYXA8SywgVj4pOiBNYXA8SywgVj4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG5ldyBNYXAoPGFueT5uZXcgTWFwKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXA8SywgVj4oPGFueT4gbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgIG1hcC5zZXQoaywgdik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVGcm9tU3RyaW5nTWFwPFQ+KHN0cmluZ01hcDogeyBba2V5OiBzdHJpbmddOiBUIH0pOiBNYXA8c3RyaW5nLCBUPiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHN0cmluZ01hcCkge1xuICAgICAgICAgICAgcmVzdWx0LnNldChrZXksIHN0cmluZ01hcFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNyZWF0ZUZyb21BbnlNYXA8VD4oc3RyaW5nTWFwOiB7IFtrZXk6IHN0cmluZ106IFQgfSk6IE1hcDxhbnksIFQ+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXA8YW55LCBUPigpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3RyaW5nTWFwKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGtleSwgc3RyaW5nTWFwW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY3JlYXRlRnJvbVN0cmluZ01hcFdpdGhSZXNvbHZlPFQ+KHN0cmluZ01hcDogeyBba2V5OiBzdHJpbmddOiBUIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlOiAoa2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGFueSkgPT4gYW55KTogTWFwPHN0cmluZywgVD4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzdHJpbmdNYXApIHtcbiAgICAgICAgICAgIGxldCB1cGRhdGVkVmFsdWUgPSByZXNvbHZlKGtleSwgc3RyaW5nTWFwW2tleV0pO1xuICAgICAgICAgICAgcmVzdWx0LnNldChrZXksIHVwZGF0ZWRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9TdHJpbmdNYXA8VD4obTogTWFwPHN0cmluZywgVD4pOiB7IFtrZXk6IHN0cmluZ106IFQgfSB7XG4gICAgICAgIGxldCByOiB7IFtrZXk6IHN0cmluZ106IFQgfSA9IHt9O1xuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHJba10gPSB2KTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvQW55TWFwPFQ+KG06IE1hcDxhbnksIFQ+KTogYW55IHtcbiAgICAgICAgbGV0IHIgPSB7fTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KG0pKSB7XG4gICAgICAgICAgICBtLmZvckVhY2goKHYsIGspID0+ICg8YW55PnIpW2tdID0gdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgdG9TdHJpbmcobTogTWFwPHN0cmluZywgYW55PiwgaW5uZXI6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzaiA9IG5ldyBTdHJpbmdKb2luZXIoWycnXSk7XG4gICAgICAgIGlmICghaW5uZXIpIHtcbiAgICAgICAgICAgIHNqLmFkZCgneycpO1xuICAgICAgICB9XG4gICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4ge1xuXG4gICAgICAgICAgICBpZiAodiBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIHNqLmFkZChNYXBXcmFwcGVyLnRvU3RyaW5nKHYsIHRydWUpKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzai5hZGQoayk7XG4gICAgICAgICAgICAgICAgc2ouYWRkKCc9Jyk7XG4gICAgICAgICAgICAgICAgc2ouYWRkKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2ouYWRkKCcsICcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWlubmVyKSB7XG4gICAgICAgICAgICBzai5hZGQoJ30gJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNqLnRvU3RyaW5nKCk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY2xlYXJWYWx1ZXMobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgICBfY2xlYXJWYWx1ZXMobSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGl0ZXJhYmxlPFQ+KG06IFQpOiBUIHtcbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgbWVyZ2VNYXBJbnRvTWFwV2l0aE9iamVjdChkZXN0OiBNYXA8c3RyaW5nLCBhbnk+LCBzb3VyY2U6IE1hcDxzdHJpbmcsIGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcndyaXRlTWlzbWF0Y2hlZDogYm9vbGVhbik6IE1hcDxzdHJpbmcsIGFueT4ge1xuXG4gICAgICAgIGxldCBrZXlzID0gQXJyYXkuZnJvbShzb3VyY2Uua2V5cygpKTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgbGV0IHNvdXJjZVZhbHVlID0gc291cmNlLmdldChrZXkpO1xuICAgICAgICAgICAgbGV0IGRlc3RWYWx1ZSA9IGRlc3QuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKGRlc3RWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIExpc3RXcmFwcGVyLmNvcHlWYWx1ZShzb3VyY2VWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkZXN0VmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgc291cmNlVmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcblxuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSxcbiAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5tZXJnZU1hcEludG9NYXBXaXRoT2JqZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jbG9uZTxzdHJpbmcsIGFueT4oZGVzdFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVZhbHVlLCBvdmVyd3JpdGVNaXNtYXRjaGVkKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlc3RWYWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiBpc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKExpc3RXcmFwcGVyLmFsbEVsZW1lbnRzQXJlU3RyaW5ncyhzb3VyY2VWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIE1hcFdyYXBwZXIubWVyZ2VNYXBJbnRvTWFwV2l0aE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY2xvbmU8c3RyaW5nLCBhbnk+KGRlc3RWYWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNvbnZlcnRMaXN0VG9NYXAoc291cmNlVmFsdWUpLCBvdmVyd3JpdGVNaXNtYXRjaGVkKVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNvdXJjZVZlY3Q6IHN0cmluZ1tdID0gTGlzdFdyYXBwZXIuY2xvbmU8YW55Pihzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRJZkFic2VudDxhbnk+KHNvdXJjZVZlY3QsIGRlc3RWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGRlc3RWYWx1ZSkgJiYgc291cmNlVmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcblxuICAgICAgICAgICAgICAgIGlmIChMaXN0V3JhcHBlci5hbGxFbGVtZW50c0FyZVN0cmluZ3MoZGVzdFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIE1hcFdyYXBwZXIubWVyZ2VNYXBJbnRvTWFwV2l0aE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY29udmVydExpc3RUb01hcChkZXN0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVyd3JpdGVNaXNtYXRjaGVkKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRvZG86IGNhbiB3ZSByZWFsbHkgbWF0Y2ggdGhpcyB2YWx1ZXMgd2l0aCBpbmRleE9mXG4gICAgICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRJZkFic2VudDxNYXA8c3RyaW5nLCBhbnk+PihkZXN0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNsb25lPHN0cmluZywgYW55PihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlc3RWYWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiBpc1N0cmluZyhzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGVzdFZhbHVlTWFwID0gTWFwV3JhcHBlci5jbG9uZShkZXN0VmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoZGVzdFZhbHVlTWFwLmdldChzb3VyY2VWYWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RWYWx1ZS5zZXQoc291cmNlVmFsdWUsIE1hcFdyYXBwZXIuY3JlYXRlRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhkZXN0VmFsdWUpICYmIHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZUhhc2ggPSBNYXBXcmFwcGVyLmNsb25lKHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNCbGFuayhzb3VyY2VIYXNoLmdldChkZXN0VmFsdWUpKSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VIYXNoLnNldChkZXN0VmFsdWUsIE1hcFdyYXBwZXIuY3JlYXRlRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlSGFzaCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShkZXN0VmFsdWUpICYmIGlzQXJyYXkoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShkZXN0VmFsdWUpICYmIGlzU3RyaW5nKHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRJZkFic2VudChkZXN0VmFsdWUsIHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhkZXN0VmFsdWUpICYmIGlzQXJyYXkoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZVZlY3Q6IHN0cmluZ1tdID0gTGlzdFdyYXBwZXIuY2xvbmU8c3RyaW5nPihzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQoc291cmNlVmVjdCwgZGVzdFZhbHVlKTtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZlY3QpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGRlc3RWYWx1ZSkgJiYgaXNTdHJpbmcoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3ZlcndyaXRlTWlzbWF0Y2hlZCkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZGVzdENsYXNzID0gY2xhc3NOYW1lKGRlc3RWYWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZUNsYXNzID0gY2xhc3NOYW1lKHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChkZXN0Q2xhc3MgPT09IHNvdXJjZUNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udmVydExpc3RUb01hcChrZXlzOiBzdHJpbmdbXSk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtYXAuc2V0KGtleXNbaV0sIE1hcFdyYXBwZXIuY3JlYXRlRW1wdHk8c3RyaW5nLCBhbnk+KCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgc3RhdGljIGdyb3VwQnk8Sz4oaXRlbXM6IGFueSwgZ3JvdXBCeUtleTogKGl0ZW06IEspID0+IHN0cmluZyk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gaXRlbXMucmVkdWNlKChncm91cFJlc3VsdDogYW55LCBjdXJyZW50VmFsdWU6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgZ0tleSA9IGdyb3VwQnlLZXkoY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIChncm91cFJlc3VsdFtnS2V5XSA9IGdyb3VwUmVzdWx0W2dLZXldIHx8IFtdKS5wdXNoKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXBSZXN1bHQ7XG4gICAgICAgIH0sIHt9KTtcblxuXG4gICAgICAgIGxldCBncm91cGVkOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgT2JqZWN0LmtleXMocmVzdWx0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGdyb3VwZWQuc2V0KGtleSwgcmVzdWx0W2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGdyb3VwZWQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFdyYXBzIEphdmFzY3JpcHQgT2JqZWN0c1xuICovXG5leHBvcnQgY2xhc3MgU3RyaW5nTWFwV3JhcHBlciB7XG4gICAgc3RhdGljIGNyZWF0ZSgpOiB7IFtrOiAvKmFueSovIHN0cmluZ106IGFueSB9IHtcbiAgICAgICAgLy8gTm90ZTogV2UgYXJlIG5vdCB1c2luZyBPYmplY3QuY3JlYXRlKG51bGwpIGhlcmUgZHVlIHRvXG4gICAgICAgIC8vIHBlcmZvcm1hbmNlIVxuICAgICAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9uZzItb2JqZWN0LWNyZWF0ZS1udWxsXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnMobWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbWFwLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldDxWPihtYXA6IHsgW2tleTogc3RyaW5nXTogViB9LCBrZXk6IHN0cmluZyk6IFYge1xuICAgICAgICByZXR1cm4gbWFwLmhhc093blByb3BlcnR5KGtleSkgPyBtYXBba2V5XSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0PFY+KG1hcDogeyBba2V5OiBzdHJpbmddOiBWIH0sIGtleTogc3RyaW5nLCB2YWx1ZTogVikge1xuICAgICAgICBtYXBba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGlzRW1wdHkobWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gbWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZShtYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGtleTogc3RyaW5nKSB7XG4gICAgICAgIGRlbGV0ZSBtYXBba2V5XTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZm9yRWFjaDxLLCBWPihtYXA6IHsgW2tleTogc3RyaW5nXTogViB9LCBjYWxsYmFjazogKHY6IFYsIEs6IHN0cmluZykgPT4gdm9pZCkge1xuICAgICAgICBmb3IgKGxldCBrIG9mIE9iamVjdC5rZXlzKG1hcCkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG1hcFtrXSwgayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbWVyZ2U8Vj4obTE6IHsgW2tleTogc3RyaW5nXTogViB9LCBtMjogeyBba2V5OiBzdHJpbmddOiBWIH0pOiB7IFtrZXk6IHN0cmluZ106IFYgfSB7XG4gICAgICAgIGxldCBtOiB7IFtrZXk6IHN0cmluZ106IFYgfSA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGsgb2YgT2JqZWN0LmtleXMobTEpKSB7XG4gICAgICAgICAgICBtW2tdID0gbTFba107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBrIG9mIE9iamVjdC5rZXlzKG0yKSkge1xuICAgICAgICAgICAgbVtrXSA9IG0yW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFsczxWPihtMTogeyBba2V5OiBzdHJpbmddOiBWIH0sIG0yOiB7IFtrZXk6IHN0cmluZ106IFYgfSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgazEgPSBPYmplY3Qua2V5cyhtMSk7XG4gICAgICAgIGxldCBrMiA9IE9iamVjdC5rZXlzKG0yKTtcbiAgICAgICAgaWYgKGsxLmxlbmd0aCAhPT0gazIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGtleTogYW55IC8qKiBUT0RPICM/Pz8/ICovO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGsxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrZXkgPSBrMVtpXTtcbiAgICAgICAgICAgIGlmIChtMVtrZXldICE9PSBtMltrZXldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufVxuXG4vKipcbiAqIEEgYm9vbGVhbi12YWx1ZWQgZnVuY3Rpb24gb3ZlciBhIHZhbHVlLCBwb3NzaWJseSBpbmNsdWRpbmcgY29udGV4dCBpbmZvcm1hdGlvblxuICogcmVnYXJkaW5nIHRoYXQgdmFsdWUncyBwb3NpdGlvbiBpbiBhbiBhcnJheS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcmVkaWNhdGU8VD4ge1xuICAgICh2YWx1ZTogVCwgaW5kZXg/OiBudW1iZXIsIGFycmF5PzogVFtdKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIExpc3RXcmFwcGVyIHtcbiAgICAvLyBKUyBoYXMgbm8gd2F5IHRvIGV4cHJlc3MgYSBzdGF0aWNhbGx5IGZpeGVkIHNpemUgbGlzdCwgYnV0IGRhcnQgZG9lcyBzbyB3ZVxuICAgIC8vIGtlZXAgYm90aCBtZXRob2RzLlxuICAgIHN0YXRpYyBjcmVhdGVGaXhlZFNpemUoc2l6ZTogbnVtYmVyKTogYW55W10ge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5KHNpemUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVHcm93YWJsZVNpemUoc2l6ZTogbnVtYmVyKTogYW55W10ge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5KHNpemUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbG9uZTxUPihhcnJheTogVFtdKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LnNsaWNlKDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBmb3JFYWNoV2l0aEluZGV4PFQ+KGFycmF5OiBUW10sIGZuOiAodDogVCwgbjogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZuKGFycmF5W2ldLCBpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBmaXJzdDxUPihhcnJheTogVFtdKTogVCB7XG4gICAgICAgIGlmICghYXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGxhc3Q8VD4oYXJyYXk6IFRbXSk6IFQge1xuICAgICAgICBpZiAoIWFycmF5IHx8IGFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbmRleE9mPFQ+KGFycmF5OiBUW10sIHZhbHVlOiBULCBzdGFydEluZGV4OiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUsIHN0YXJ0SW5kZXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluczxUPihsaXN0OiBUW10sIGVsOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoZWwpICE9PSAtMTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjb250YWluc0FsbDxUPihsaXN0OiBUW10sIGVsczogVFtdKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBlbHMubWFwKGZ1bmN0aW9uIChuZWVkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YobmVlZGxlKTtcbiAgICAgICAgfSkuaW5kZXhPZigtMSkgPT09IC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluc0NvbXBsZXgobGlzdDogQXJyYXk8YW55PiwgaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBsaXN0LmZpbmRJbmRleChlbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKGVsLCBpdGVtKTtcbiAgICAgICAgfSkgPiAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluZEluZGV4Q29tcGxleChsaXN0OiBBcnJheTxhbnk+LCBpdGVtOiBhbnkpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpbmRleCA9IGxpc3QuZmluZEluZGV4KGVsID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcXVhbHMoZWwsIGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgcmVtb3ZlSWZFeGlzdChsaXN0OiBBcnJheTxhbnk+LCBpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSBsaXN0LmZpbmRJbmRleChlbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKGVsLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZUF0PGFueT4obGlzdCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJldmVyc2VkPFQ+KGFycmF5OiBUW10pOiBUW10ge1xuICAgICAgICBsZXQgYSA9IExpc3RXcmFwcGVyLmNsb25lKGFycmF5KTtcbiAgICAgICAgcmV0dXJuIGEucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb25jYXQoYTogYW55W10sIGI6IGFueVtdKTogYW55W10ge1xuICAgICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gICAgfVxuXG4gICAgc3RhdGljIGluc2VydDxUPihsaXN0OiBUW10sIGluZGV4OiBudW1iZXIsIHZhbHVlOiBUKSB7XG4gICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUF0PFQ+KGxpc3Q6IFRbXSwgaW5kZXg6IG51bWJlcik6IFQge1xuICAgICAgICBsZXQgcmVzID0gbGlzdFtpbmRleF07XG4gICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlQWxsPFQ+KGxpc3Q6IFRbXSwgaXRlbXM6IFRbXSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBsaXN0LmluZGV4T2YoaXRlbXNbaV0pO1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZTxUPihsaXN0OiBUW10sIGVsOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBpbmRleCA9IGxpc3QuaW5kZXhPZihlbCk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUxhc3Q8VD4oYXJyYXk6IFRbXSk6IHZvaWQge1xuICAgICAgICBpZiAoIWFycmF5IHx8IGFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXkuc3BsaWNlKGFycmF5Lmxlbmd0aCAtIDEpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNsZWFyKGxpc3Q6IGFueVtdKSB7XG4gICAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNFbXB0eShsaXN0OiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbGlzdC5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbGwobGlzdDogYW55W10sIHZhbHVlOiBhbnksIHN0YXJ0OiBudW1iZXIgPSAwLCBlbmQ6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgbGlzdC5maWxsKHZhbHVlLCBzdGFydCwgZW5kID09PSBudWxsID8gbGlzdC5sZW5ndGggOiBlbmQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbHMoYTogYW55W10sIGI6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBzbGljZTxUPihsOiBUW10sIGZyb206IG51bWJlciA9IDAsIHRvOiBudW1iZXIgPSBudWxsKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIGwuc2xpY2UoZnJvbSwgdG8gPT09IG51bGwgPyB1bmRlZmluZWQgOiB0byk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNwbGljZTxUPihsOiBUW10sIGZyb206IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpOiBUW10ge1xuICAgICAgICByZXR1cm4gbC5zcGxpY2UoZnJvbSwgbGVuZ3RoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc29ydDxUPihsOiBUW10sIGNvbXBhcmVGbj86IChhOiBULCBiOiBUKSA9PiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChjb21wYXJlRm4pKSB7XG4gICAgICAgICAgICBsLnNvcnQoY29tcGFyZUZuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwuc29ydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgc29ydEJ5RXhhbXBsZSh0b1NvcnQ6IHN0cmluZ1tdLCBwYXR0ZXJuOiBzdHJpbmdbXSkge1xuICAgICAgICB0b1NvcnQuc29ydCgoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleEEgPSBwYXR0ZXJuLmluZGV4T2YoYSkgPT09IC0xID8gMTAgOiBwYXR0ZXJuLmluZGV4T2YoYSk7XG4gICAgICAgICAgICBsZXQgaW5kZXhCID0gcGF0dGVybi5pbmRleE9mKGIpID09PSAtMSA/IDEwIDogcGF0dGVybi5pbmRleE9mKGIpO1xuXG4gICAgICAgICAgICByZXR1cm4gaW5kZXhBIC0gaW5kZXhCO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9TdHJpbmc8VD4obDogVFtdKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG91dCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGwpIHtcbiAgICAgICAgICAgIG91dCArPSBpdGVtLnRvU3RyaW5nKCkgKyAnLCAgJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHN0YXRpYyB0b0pTT048VD4obDogVFtdKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGwpO1xuICAgIH1cblxuICAgIHN0YXRpYyBtYXhpbXVtPFQ+KGxpc3Q6IFRbXSwgcHJlZGljYXRlOiAodDogVCkgPT4gbnVtYmVyKTogVCB7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNvbHV0aW9uOiBhbnkgLyoqIFRPRE8gIz8/Pz8gKi8gPSBudWxsO1xuICAgICAgICBsZXQgbWF4VmFsdWUgPSAtSW5maW5pdHk7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IGxpc3RbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsoY2FuZGlkYXRlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNhbmRpZGF0ZVZhbHVlID0gcHJlZGljYXRlKGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlVmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHNvbHV0aW9uID0gY2FuZGlkYXRlO1xuICAgICAgICAgICAgICAgIG1heFZhbHVlID0gY2FuZGlkYXRlVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvbHV0aW9uO1xuICAgIH1cblxuICAgIHN0YXRpYyBmbGF0dGVuPFQ+KGxpc3Q6IEFycmF5PFQgfCBUW10+KTogVFtdIHtcbiAgICAgICAgbGV0IHRhcmdldDogYW55W10gPSBbXTtcbiAgICAgICAgX2ZsYXR0ZW5BcnJheShsaXN0LCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFsbEVsZW1lbnRzQXJlU3RyaW5nczxUPihsaXN0OiBBcnJheTxUIHwgVFtdPik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdGFyZ2V0OiBhbnlbXSA9IExpc3RXcmFwcGVyLmZsYXR0ZW4obGlzdCk7XG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAoIWlzU3RyaW5nKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZEFsbDxUPihsaXN0OiBBcnJheTxUPiwgc291cmNlOiBBcnJheTxUPik6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGlzdC5wdXNoKHNvdXJjZVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0b2RvOiBjaGVjayBpZiB0aGlzIGhhbmRsZXMgb2JqZWN0cyB3aXRoIGNvbnRhaW5zXG4gICAgc3RhdGljIGFkZEVsZW1lbnRJZkFic2VudDxUPihsaXN0OiBBcnJheTxUPiwgZWxlbWVudDogVCk6IHZvaWQge1xuXG4gICAgICAgIGxldCBjb250YWlucyA9IENvbGxlY3Rpb25zLmFycmF5cy5jb250YWlucyhsaXN0LCBlbGVtZW50LCAoaXRlbTE6IGFueSwgaXRlbTI6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoaXRlbTFbJ2VxdWFsc1RvJ10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTFbJ2VxdWFsc1RvJ10oaXRlbTIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXRlbTEgPT09IGl0ZW0yO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFjb250YWlucykge1xuICAgICAgICAgICAgbGlzdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgYWRkRWxlbWVudHNJZkFic2VudDxUPihsaXN0OiBBcnJheTxUPiwgZWxlbWVudHM6IFRbXSk6IHZvaWQge1xuXG5cbiAgICAgICAgaWYgKGlzQmxhbmsoZWxlbWVudHMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBlbGVtIG9mIGVsZW1lbnRzKSB7XG5cbiAgICAgICAgICAgIGxldCBjb250YWlucyA9IENvbGxlY3Rpb25zLmFycmF5cy5jb250YWlucyhsaXN0LCBlbGVtLCAoaXRlbTE6IGFueSwgaXRlbTI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtMVsnZXF1YWxzVG8nXSAmJiBpdGVtMlsnZXF1YWxzVG8nXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTFbJ2VxdWFsc1RvJ10oaXRlbTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTEgPT09IGl0ZW0yO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5zKSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY29weVZhbHVlPFQ+KHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXBXcmFwcGVyLmNsb25lKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLmNsb25lKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxufVxuXG5mdW5jdGlvbiBfZmxhdHRlbkFycmF5KHNvdXJjZTogYW55W10sIHRhcmdldDogYW55W10pOiBhbnlbXSB7XG4gICAgaWYgKGlzUHJlc2VudChzb3VyY2UpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNvdXJjZVtpXTtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgX2ZsYXR0ZW5BcnJheShpdGVtLCB0YXJnZXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpc3RMaWtlSXRlcmFibGUob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIWlzSnNPYmplY3Qob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBpc0FycmF5KG9iaikgfHxcbiAgICAgICAgKCEob2JqIGluc3RhbmNlb2YgTWFwKSAmJiAgICAgIC8vIEpTIE1hcCBhcmUgaXRlcmFibGVzIGJ1dCByZXR1cm4gZW50cmllcyBhcyBbaywgdl1cbiAgICAgICAgICAgIGdldFN5bWJvbEl0ZXJhdG9yKCkgaW4gb2JqKTsgIC8vIEpTIEl0ZXJhYmxlIGhhdmUgYSBTeW1ib2wuaXRlcmF0b3IgcHJvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJlSXRlcmFibGVzRXF1YWwoYTogYW55LCBiOiBhbnksIGNvbXBhcmF0b3I6IEZ1bmN0aW9uKTogYm9vbGVhbiB7XG4gICAgbGV0IGl0ZXJhdG9yMSA9IGFbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTtcbiAgICBsZXQgaXRlcmF0b3IyID0gYltnZXRTeW1ib2xJdGVyYXRvcigpXSgpO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGV0IGl0ZW0xID0gaXRlcmF0b3IxLm5leHQoKTtcbiAgICAgICAgbGV0IGl0ZW0yID0gaXRlcmF0b3IyLm5leHQoKTtcbiAgICAgICAgaWYgKGl0ZW0xLmRvbmUgJiYgaXRlbTIuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0xLmRvbmUgfHwgaXRlbTIuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29tcGFyYXRvcihpdGVtMS52YWx1ZSwgaXRlbTIudmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpdGVyYXRlTGlzdExpa2Uob2JqOiBhbnksIGZuOiBGdW5jdGlvbikge1xuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZuKG9ialtpXSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaXRlcmF0b3IgPSBvYmpbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTtcbiAgICAgICAgbGV0IGl0ZW06IGFueSAvKiogVE9ETyAjPz8/PyAqLztcbiAgICAgICAgd2hpbGUgKCEoKGl0ZW0gPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpKSB7XG4gICAgICAgICAgICBmbihpdGVtLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZmluZExhc3Q8VD4oYXJyOiBUW10sIGNvbmRpdGlvbjogKHZhbHVlOiBUKSA9PiBib29sZWFuKTogVCB8IG51bGwge1xuICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbihhcnJbaV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG4vLyBTYWZhcmkgYW5kIEludGVybmV0IEV4cGxvcmVyIGRvIG5vdCBzdXBwb3J0IHRoZSBpdGVyYWJsZSBwYXJhbWV0ZXIgdG8gdGhlXG4vLyBTZXQgY29uc3RydWN0b3IuICBXZSB3b3JrIGFyb3VuZCB0aGF0IGJ5IG1hbnVhbGx5IGFkZGluZyB0aGUgaXRlbXMuXG5sZXQgY3JlYXRlU2V0RnJvbUxpc3Q6IHsgKGxzdDogYW55W10pOiBTZXQ8YW55PiB9ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdGVzdCA9IG5ldyBTZXQoWzEsIDIsIDNdKTtcbiAgICBpZiAodGVzdC5zaXplID09PSAzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVTZXRGcm9tTGlzdElubmVyKGxzdDogYW55W10pOiBTZXQ8YW55PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldChsc3QpO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVTZXRBbmRQb3B1bGF0ZUZyb21MaXN0KGxzdDogYW55W10pOiBTZXQ8YW55PiB7XG4gICAgICAgICAgICBsZXQgcmVzID0gbmV3IFNldChsc3QpO1xuICAgICAgICAgICAgaWYgKHJlcy5zaXplICE9PSBsc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmFkZChsc3RbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH07XG4gICAgfVxufSkoKTtcblxuIl19