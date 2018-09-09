/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Collections from 'typescript-collections';
import { className, equals, getSymbolIterator, isArray, isBlank, isJsObject, isPresent, isString, StringJoiner } from './lang';
/** @type {?} */
export const createMapFromMap = (function () {
    try {
        if (new Map(/** @type {?} */ (new Map()))) {
            return function createMapFromMapInner(m) {
                return new Map(/** @type {?} */ (m));
            };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromMap(m) {
        /** @type {?} */
        let map = new Map();
        m.forEach((v, k) => {
            map.set(k, v);
        });
        return map;
    };
})();
/** @type {?} */
export const _clearValues = (function () {
    if ((/** @type {?} */ ((new Map()).keys())).next) {
        return function _clearValuesInner(m) {
            /** @type {?} */
            let keyIterator = m.keys();
            /** @type {?} */
            let k;
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
export class MapWrapper {
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
        catch (e) {
        }
        /** @type {?} */
        let map = new Map();
        m.forEach((v, k) => {
            map.set(k, v);
        });
        return map;
    }
    /**
     * @template T
     * @param {?} stringMap
     * @return {?}
     */
    static createFromStringMap(stringMap) {
        /** @type {?} */
        let result = new Map();
        for (let key in stringMap) {
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
        /** @type {?} */
        let result = new Map();
        for (let key in stringMap) {
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
        /** @type {?} */
        let result = new Map();
        for (let key in stringMap) {
            /** @type {?} */
            let updatedValue = resolve(key, stringMap[key]);
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
        /** @type {?} */
        let r = {};
        m.forEach((v, k) => r[k] = v);
        return r;
    }
    /**
     * @template T
     * @param {?} m
     * @return {?}
     */
    static toAnyMap(m) {
        /** @type {?} */
        let r = {};
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
        /** @type {?} */
        let sj = new StringJoiner(['']);
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
        /** @type {?} */
        let keys = Array.from(source.keys());
        for (let key of keys) {
            /** @type {?} */
            let sourceValue = source.get(key);
            /** @type {?} */
            let destValue = dest.get(key);
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
                    let sourceVect = ListWrapper.clone(sourceValue);
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
                let destValueMap = MapWrapper.clone(destValue);
                if (isBlank(destValueMap.get(sourceValue))) {
                    destValue.set(sourceValue, MapWrapper.createEmpty());
                }
            }
            else if (isString(destValue) && sourceValue instanceof Map) {
                /** @type {?} */
                let sourceHash = MapWrapper.clone(sourceValue);
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
                let sourceVect = ListWrapper.clone(sourceValue);
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
                let destClass = className(destValue);
                /** @type {?} */
                let sourceClass = className(sourceValue);
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
        /** @type {?} */
        let map = new Map();
        for (let i = 0; i < keys.length; i++) {
            map.set(keys[i], MapWrapper.createEmpty());
        }
        return map;
    }
    /**
     * @template K
     * @param {?} items
     * @param {?} groupByKey
     * @return {?}
     */
    static groupBy(items, groupByKey) {
        /** @type {?} */
        let result = items.reduce((groupResult, currentValue) => {
            /** @type {?} */
            let gKey = groupByKey(currentValue);
            (groupResult[gKey] = groupResult[gKey] || []).push(currentValue);
            return groupResult;
        }, {});
        /** @type {?} */
        let grouped = new Map();
        Object.keys(result).forEach((key) => {
            grouped.set(key, result[key]);
        });
        return grouped;
    }
}
/**
 * Wraps Javascript Objects
 */
export class StringMapWrapper {
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
    static contains(map, key) {
        return map.hasOwnProperty(key);
    }
    /**
     * @template V
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    static get(map, key) {
        return map.hasOwnProperty(key) ? map[key] : undefined;
    }
    /**
     * @template V
     * @param {?} map
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    static set(map, key, value) {
        map[key] = value;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    static isEmpty(map) {
        for (let prop in map) {
            return false;
        }
        return true;
    }
    /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    static delete(map, key) {
        delete map[key];
    }
    /**
     * @template K, V
     * @param {?} map
     * @param {?} callback
     * @return {?}
     */
    static forEach(map, callback) {
        for (let k of Object.keys(map)) {
            callback(map[k], k);
        }
    }
    /**
     * @template V
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static merge(m1, m2) {
        /** @type {?} */
        let m = {};
        for (let k of Object.keys(m1)) {
            m[k] = m1[k];
        }
        for (let k of Object.keys(m2)) {
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
        /** @type {?} */
        let k1 = Object.keys(m1);
        /** @type {?} */
        let k2 = Object.keys(m2);
        if (k1.length !== k2.length) {
            return false;
        }
        /** @type {?} */
        let key;
        for (let i = 0; i < k1.length; i++) {
            key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    }
}
/**
 * A boolean-valued function over a value, possibly including context information
 * regarding that value's position in an array.
 * @record
 * @template T
 */
export function Predicate() { }
export class ListWrapper {
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
        for (let i = 0; i < array.length; i++) {
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
        /** @type {?} */
        const index = list.findIndex(el => {
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
        /** @type {?} */
        let index = list.findIndex(el => {
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
        /** @type {?} */
        let a = ListWrapper.clone(array);
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
        /** @type {?} */
        let res = list[index];
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
        for (let i = 0; i < items.length; ++i) {
            /** @type {?} */
            let index = list.indexOf(items[i]);
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
        /** @type {?} */
        let index = list.indexOf(el);
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
        for (let i = 0; i < a.length; ++i) {
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
            /** @type {?} */
            let indexA = pattern.indexOf(a) === -1 ? 10 : pattern.indexOf(a);
            /** @type {?} */
            let indexB = pattern.indexOf(b) === -1 ? 10 : pattern.indexOf(b);
            return indexA - indexB;
        });
    }
    /**
     * @template T
     * @param {?} l
     * @return {?}
     */
    static toString(l) {
        /** @type {?} */
        let out = '';
        for (let item of l) {
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
        /** @type {?} */
        let solution = null;
        /** @type {?} */
        let maxValue = -Infinity;
        for (let index = 0; index < list.length; index++) {
            /** @type {?} */
            let candidate = list[index];
            if (isBlank(candidate)) {
                continue;
            }
            /** @type {?} */
            let candidateValue = predicate(candidate);
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
        /** @type {?} */
        let target = [];
        _flattenArray(list, target);
        return target;
    }
    /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    static allElementsAreStrings(list) {
        /** @type {?} */
        let target = ListWrapper.flatten(list);
        for (let element of target) {
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
        for (let i = 0; i < source.length; i++) {
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
        /** @type {?} */
        let contains = Collections.arrays.contains(list, element, (item1, item2) => {
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
        for (let elem of elements) {
            /** @type {?} */
            let contains = Collections.arrays.contains(list, elem, (item1, item2) => {
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
        for (let i = 0; i < source.length; i++) {
            /** @type {?} */
            let item = source[i];
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
    /** @type {?} */
    let iterator1 = a[getSymbolIterator()]();
    /** @type {?} */
    let iterator2 = b[getSymbolIterator()]();
    while (true) {
        /** @type {?} */
        let item1 = iterator1.next();
        /** @type {?} */
        let item2 = iterator2.next();
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
        for (let i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        /** @type {?} */
        let iterator = obj[getSymbolIterator()]();
        /** @type {?} */
        let item;
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
    for (let i = arr.length - 1; i >= 0; i--) {
        if (condition(arr[i])) {
            return arr[i];
        }
    }
    return null;
}
const ɵ0 = function () {
    /** @type {?} */
    let test = new Set([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromListInner(lst) {
            return new Set(lst);
        };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            /** @type {?} */
            let res = new Set(lst);
            if (res.size !== lst.length) {
                for (let i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
};
/** @type {?} */
let createSetFromList = (ɵ0)();
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFjQSxPQUFPLEtBQUssV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFDSCxTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLFlBQVksRUFDZixNQUFNLFFBQVEsQ0FBQzs7QUFHaEIsYUFBYSxnQkFBZ0IsR0FBMEMsQ0FBQztJQUNwRSxJQUFJLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsbUJBQU0sSUFBSSxHQUFHLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsK0JBQStCLENBQWdCO2dCQUNsRCxNQUFNLENBQUMsSUFBSSxHQUFHLG1CQUFNLENBQUMsRUFBQyxDQUFDO2FBQzFCLENBQUM7U0FDTDtLQUNKO0lBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDWjtJQUNELE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBZ0I7O1FBQ3hELElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pCLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDZCxDQUFDO0NBQ0wsQ0FBQyxFQUFFLENBQUM7O0FBQ0wsYUFBYSxZQUFZLEdBQWlDLENBQUM7SUFDdkQsRUFBRSxDQUFDLENBQUMsbUJBQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBZ0I7O1lBQzlDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7WUFDM0IsSUFBSSxDQUFDLENBQXdCO1lBQzdCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFNLFdBQVcsRUFBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3hCO1NBQ0osQ0FBQztLQUNMO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsa0NBQWtDLENBQWdCO1lBQ3JELENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2YsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEIsQ0FBQyxDQUFDO1NBQ04sQ0FBQztLQUNMO0NBQ0osQ0FBQyxFQUFFLENBQUM7QUFFTCxNQUFNOzs7OztJQUVGLE1BQU0sQ0FBQyxXQUFXO1FBQ2QsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFRLENBQUM7S0FDMUI7Ozs7OztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQU8sQ0FBWTtRQUMzQixJQUFJLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsbUJBQU0sSUFBSSxHQUFHLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLElBQUksR0FBRyxtQkFBYSxDQUFDLEVBQUMsQ0FBQzthQUNqQztTQUNKO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDWjs7UUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ2Q7Ozs7OztJQUVELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBSSxTQUErQjs7UUFDekQsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQWEsQ0FBQztRQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNqQjs7Ozs7O0lBR0QsTUFBTSxDQUFDLGdCQUFnQixDQUFJLFNBQStCOztRQUN0RCxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCOzs7Ozs7O0lBR0QsTUFBTSxDQUFDLDhCQUE4QixDQUFJLFNBQStCLEVBQy9CLE9BQzRCOztRQUNqRSxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBYSxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7O1lBQ3hCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDakM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCOzs7Ozs7SUFFRCxNQUFNLENBQUMsV0FBVyxDQUFJLENBQWlCOztRQUNuQyxJQUFJLENBQUMsR0FBeUIsRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNaOzs7Ozs7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFJLENBQWM7O1FBQzdCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVYLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsbUJBQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7Ozs7OztJQUdELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBbUIsRUFBRSxRQUFpQixLQUFLOztRQUN2RCxJQUFJLEVBQUUsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNmO1FBQ0QsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUVmLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFFeEM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNWLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1osRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiO1lBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQixDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVCxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN4Qjs7Ozs7SUFHRCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQWdCO1FBQy9CLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjs7Ozs7O0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBSSxDQUFJO1FBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjs7Ozs7OztJQUdELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxJQUFzQixFQUFFLE1BQXdCLEVBQ2hELG1CQUE0Qjs7UUFFekQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVyQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUNuQixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUNsQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsUUFBUSxDQUFDO2FBQ1o7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxZQUFZLEdBQUcsSUFBSSxXQUFXLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFaEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQ1IsVUFBVSxDQUFDLHlCQUF5QixDQUNoQyxVQUFVLENBQUMsS0FBSyxDQUFjLFNBQVMsQ0FBQyxFQUN4QyxXQUFXLEVBQUUsbUJBQW1CLENBQUMsQ0FDeEMsQ0FBQzthQUNMO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFMUQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLHlCQUF5QixDQUM5QyxVQUFVLENBQUMsS0FBSyxDQUFjLFNBQVMsQ0FBQyxFQUN4QyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FDakUsQ0FBQztpQkFFTDtnQkFBQyxJQUFJLENBQUMsQ0FBQzs7b0JBQ0osSUFBSSxVQUFVLEdBQWEsV0FBVyxDQUFDLEtBQUssQ0FBTSxXQUFXLENBQUMsQ0FBQztvQkFDL0QsV0FBVyxDQUFDLGtCQUFrQixDQUFNLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzdCO2FBQ0o7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFdBQVcsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUUxRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMseUJBQXlCLENBQzlDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFDdEMsV0FBVyxFQUNYLG1CQUFtQixDQUFDLENBQ3ZCLENBQUM7aUJBQ0w7Z0JBQUMsSUFBSSxDQUFDLENBQUM7O29CQUVKLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBbUIsU0FBUyxFQUN0RCxVQUFVLENBQUMsS0FBSyxDQUNaLFdBQVcsQ0FBQyxDQUNuQixDQUFDO2lCQUNMO2FBQ0o7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDM0QsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2lCQUN4RDthQUNKO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxXQUFXLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQzs7Z0JBQzNELElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQy9DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztpQkFDdkQ7Z0JBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFFN0I7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBRTlCO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxXQUFXLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBRTFEO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDckQsSUFBSSxVQUFVLEdBQWEsV0FBVyxDQUFDLEtBQUssQ0FBUyxXQUFXLENBQUMsQ0FBQztnQkFFbEUsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFFN0I7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBRTlCO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDOUI7WUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ0osSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztnQkFDckMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUV6QyxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQzlCO2FBQ0o7U0FDSjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBYzs7UUFDbEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUNqQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNuQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsV0FBVyxFQUFlLENBQUMsQ0FBQztTQUMzRDtRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDZDs7Ozs7OztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUksS0FBVSxFQUFFLFVBQStCOztRQUN6RCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBZ0IsRUFBRSxZQUFpQixFQUFFLEVBQUU7O1lBRTlELElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxXQUFXLENBQUM7U0FDdEIsRUFBRSxFQUFFLENBQUMsQ0FBQzs7UUFHUCxJQUFJLE9BQU8sR0FBcUIsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxPQUFPLENBQUM7S0FDbEI7Q0FDSjs7OztBQUtELE1BQU07Ozs7SUFDRixNQUFNLENBQUMsTUFBTTs7OztRQUlULE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDYjs7Ozs7O0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUEyQixFQUFFLEdBQVc7UUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEM7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBRyxDQUFJLEdBQXlCLEVBQUUsR0FBVztRQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7S0FDekQ7Ozs7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBSSxHQUF5QixFQUFFLEdBQVcsRUFBRSxLQUFRO1FBQzFELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDcEI7Ozs7O0lBR0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUEyQjtRQUN0QyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7OztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBMkIsRUFBRSxHQUFXO1FBQ2xELE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ25COzs7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBTyxHQUF5QixFQUFFLFFBQW1DO1FBQy9FLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkI7S0FDSjs7Ozs7OztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUksRUFBd0IsRUFBRSxFQUF3Qjs7UUFDOUQsSUFBSSxDQUFDLEdBQXlCLEVBQUUsQ0FBQztRQUVqQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjtRQUVELE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjs7Ozs7OztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUksRUFBd0IsRUFBRSxFQUF3Qjs7UUFDL0QsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFDekIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7O1FBQ0QsSUFBSSxHQUFHLENBQXdCO1FBQy9CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmO0NBRUo7Ozs7Ozs7O0FBVUQsTUFBTTs7Ozs7SUFHRixNQUFNLENBQUMsZUFBZSxDQUFDLElBQVk7UUFDL0IsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFZO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjs7Ozs7O0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBSSxLQUFVO1FBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFJLEtBQVUsRUFBRSxFQUE2QjtRQUNoRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ25CO0tBQ0o7Ozs7OztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUksS0FBVTtRQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7S0FDSjs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBSSxLQUFVO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDbEM7Ozs7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBSSxLQUFVLEVBQUUsS0FBUSxFQUFFLGFBQXFCLENBQUM7UUFDMUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzNDOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBSSxJQUFTLEVBQUUsRUFBSztRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNsQzs7Ozs7OztJQUdELE1BQU0sQ0FBQyxXQUFXLENBQUksSUFBUyxFQUFFLEdBQVE7UUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxNQUFNO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7Ozs7O0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFnQixFQUFFLElBQVM7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ1g7Ozs7OztJQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFnQixFQUFFLElBQVM7O1FBQy9DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjs7Ozs7O0lBR0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFnQixFQUFFLElBQVM7O1FBQzVDLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0IsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLFdBQVcsQ0FBQyxRQUFRLENBQU0sSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFDO0tBQ0o7Ozs7OztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUksS0FBVTs7UUFDekIsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3RCOzs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQVEsRUFBRSxDQUFRO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RCOzs7Ozs7OztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUksSUFBUyxFQUFFLEtBQWEsRUFBRSxLQUFRO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNoQzs7Ozs7OztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUksSUFBUyxFQUFFLEtBQWE7O1FBQ3ZDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ2Q7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFJLElBQVMsRUFBRSxLQUFVO1FBQ3JDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDOztZQUNwQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO0tBQ0o7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFJLElBQVMsRUFBRSxFQUFLOztRQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCOzs7Ozs7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFJLEtBQVU7UUFDM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNsQzs7Ozs7SUFHRCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQVc7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDbkI7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFXO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQVcsRUFBRSxLQUFVLEVBQUUsUUFBZ0IsQ0FBQyxFQUFFLE1BQWMsSUFBSTtRQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0Q7Ozs7OztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBUSxFQUFFLENBQVE7UUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDaEI7U0FDSjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFJLENBQU0sRUFBRSxPQUFlLENBQUMsRUFBRSxLQUFhLElBQUk7UUFDdkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDdEQ7Ozs7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBSSxDQUFNLEVBQUUsSUFBWSxFQUFFLE1BQWM7UUFDakQsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBSSxDQUFNLEVBQUUsU0FBa0M7UUFDckQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDWjtLQUNKOzs7Ozs7SUFHRCxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQWdCLEVBQUUsT0FBaUI7UUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRTs7WUFDakMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNqRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0tBQ047Ozs7OztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUksQ0FBTTs7UUFDckIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQztTQUNsQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDZDs7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBSSxDQUFNO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBSSxJQUFTLEVBQUUsU0FBMkI7UUFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjs7UUFDRCxJQUFJLFFBQVEsR0FBMEIsSUFBSSxDQUFDOztRQUMzQyxJQUFJLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN6QixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQzs7WUFDL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQzthQUNaOztZQUNELElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQyxFQUFFLENBQUMsQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsUUFBUSxHQUFHLFNBQVMsQ0FBQztnQkFDckIsUUFBUSxHQUFHLGNBQWMsQ0FBQzthQUM3QjtTQUNKO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUNuQjs7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBSSxJQUFvQjs7UUFDbEMsSUFBSSxNQUFNLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNqQjs7Ozs7O0lBR0QsTUFBTSxDQUFDLHFCQUFxQixDQUFJLElBQW9COztRQUNoRCxJQUFJLE1BQU0sR0FBVSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFJLElBQWMsRUFBRSxNQUFnQjtRQUM3QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0o7Ozs7Ozs7SUFHRCxNQUFNLENBQUMsa0JBQWtCLENBQUksSUFBYyxFQUFFLE9BQVU7O1FBRW5ELElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFVLEVBQUUsS0FBVSxFQUFFLEVBQUU7WUFFakYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUVuQztZQUNELE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO1NBQzFCLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEI7S0FDSjs7Ozs7OztJQUdELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBSSxJQUFjLEVBQUUsUUFBYTtRQUd2RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQztTQUNWO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQzs7WUFFeEIsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxLQUFVLEVBQUUsRUFBRTtnQkFDOUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ25DO2dCQUNELE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO2FBQzFCLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25CO1NBQ0o7S0FDSjs7Ozs7O0lBR0QsTUFBTSxDQUFDLFNBQVMsQ0FBSSxLQUFVO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0NBR0o7Ozs7OztBQUVELHVCQUF1QixNQUFhLEVBQUUsTUFBYTtJQUMvQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOztZQUNyQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUMvQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7U0FDSjtLQUNKO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUNqQjs7Ozs7QUFHRCxNQUFNLDZCQUE2QixHQUFRO0lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksR0FBRyxDQUFDLElBQVMsb0RBQW9EOztZQUMvRSxpQkFBaUIsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZDOzs7Ozs7O0FBRUQsTUFBTSw0QkFBNEIsQ0FBTSxFQUFFLENBQU0sRUFBRSxVQUFvQjs7SUFDbEUsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDOztJQUN6QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFFekMsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7UUFDVixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7O1FBQzdCLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCO0tBQ0o7Q0FDSjs7Ozs7O0FBRUQsTUFBTSwwQkFBMEIsR0FBUSxFQUFFLEVBQVk7SUFDbEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNkO0tBQ0o7SUFBQyxJQUFJLENBQUMsQ0FBQzs7UUFDSixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLENBQUM7O1FBQzFDLElBQUksSUFBSSxDQUF3QjtRQUNoQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEI7S0FDSjtDQUNKOzs7Ozs7O0FBR0QsTUFBTSxtQkFBc0IsR0FBUSxFQUFFLFNBQWdDO0lBQ2xFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Q0FDZjtXQUlvRDs7SUFDakQsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxnQ0FBZ0MsR0FBVTtZQUM3QyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkIsQ0FBQztLQUNMO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsc0NBQXNDLEdBQVU7O1lBQ25ELElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNsQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuQjthQUNKO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNkLENBQUM7S0FDTDtDQUNKOztBQWpCRCxJQUFJLGlCQUFpQixHQUErQixJQWlCbEQsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQG9yaWdpbmFsLWxpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICpcbiAqXG4gKlxuICogIENyZWRpdDogRGVyaXZlZCBhbmQgZXh0ZW5kZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyIGluIG9yZGVyIHRvIGhhdmUgc2V0IG9mXG4gKiAgcmV1c2FibGUgZ2xvYmFscy4gU2luY2UgaXRzIG5vdCBleHBvcnRlZCBBUEkgbmVlZCB0byBoYXZlIGEgY29weSB1bmRlciBjb3JlLlxuICovXG5pbXBvcnQgKiBhcyBDb2xsZWN0aW9ucyBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgY2xhc3NOYW1lLFxuICAgIGVxdWFscyxcbiAgICBnZXRTeW1ib2xJdGVyYXRvcixcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNKc09iamVjdCxcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgU3RyaW5nSm9pbmVyXG59IGZyb20gJy4vbGFuZyc7XG5cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1hcEZyb21NYXA6IHsgKG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+IH0gPSAoZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChuZXcgTWFwKDxhbnk+bmV3IE1hcCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZU1hcEZyb21NYXBJbm5lcihtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXAoPGFueT5tKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVNYXBBbmRQb3B1bGF0ZUZyb21NYXAobTogTWFwPGFueSwgYW55Pik6IE1hcDxhbnksIGFueT4ge1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgIG1hcC5zZXQoaywgdik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH07XG59KSgpO1xuZXhwb3J0IGNvbnN0IF9jbGVhclZhbHVlczogeyAobTogTWFwPGFueSwgYW55Pik6IHZvaWQgfSA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCg8YW55PihuZXcgTWFwKCkpLmtleXMoKSkubmV4dCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gX2NsZWFyVmFsdWVzSW5uZXIobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgICAgICAgbGV0IGtleUl0ZXJhdG9yID0gbS5rZXlzKCk7XG4gICAgICAgICAgICBsZXQgazogYW55IC8qKiBUT0RPICM/Pz8/ICovO1xuICAgICAgICAgICAgd2hpbGUgKCEoKGsgPSAoPGFueT5rZXlJdGVyYXRvcikubmV4dCgpKS5kb25lKSkge1xuICAgICAgICAgICAgICAgIG0uc2V0KGsudmFsdWUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBfY2xlYXJWYWx1ZXNXaXRoRm9yZUVhY2gobTogTWFwPGFueSwgYW55Pikge1xuICAgICAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgbS5zZXQoaywgbnVsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG5leHBvcnQgY2xhc3MgTWFwV3JhcHBlciB7XG5cbiAgICBzdGF0aWMgY3JlYXRlRW1wdHk8SywgVj4oKTogTWFwPEssIFY+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXA8SywgVj4oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xvbmU8SywgVj4obTogTWFwPEssIFY+KTogTWFwPEssIFY+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChuZXcgTWFwKDxhbnk+bmV3IE1hcCgpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWFwPEssIFY+KDxhbnk+IG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICBtYXAuc2V0KGssIHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRnJvbVN0cmluZ01hcDxUPihzdHJpbmdNYXA6IHsgW2tleTogc3RyaW5nXTogVCB9KTogTWFwPHN0cmluZywgVD4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcDxzdHJpbmcsIFQ+KCk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzdHJpbmdNYXApIHtcbiAgICAgICAgICAgIHJlc3VsdC5zZXQoa2V5LCBzdHJpbmdNYXBba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjcmVhdGVGcm9tQW55TWFwPFQ+KHN0cmluZ01hcDogeyBba2V5OiBzdHJpbmddOiBUIH0pOiBNYXA8YW55LCBUPiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPGFueSwgVD4oKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHN0cmluZ01hcCkge1xuICAgICAgICAgICAgcmVzdWx0LnNldChrZXksIHN0cmluZ01hcFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNyZWF0ZUZyb21TdHJpbmdNYXBXaXRoUmVzb2x2ZTxUPihzdHJpbmdNYXA6IHsgW2tleTogc3RyaW5nXTogVCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZTogKGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBhbnkpID0+IGFueSk6IE1hcDxzdHJpbmcsIFQ+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBUPigpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3RyaW5nTWFwKSB7XG4gICAgICAgICAgICBsZXQgdXBkYXRlZFZhbHVlID0gcmVzb2x2ZShrZXksIHN0cmluZ01hcFtrZXldKTtcbiAgICAgICAgICAgIHJlc3VsdC5zZXQoa2V5LCB1cGRhdGVkVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvU3RyaW5nTWFwPFQ+KG06IE1hcDxzdHJpbmcsIFQ+KTogeyBba2V5OiBzdHJpbmddOiBUIH0ge1xuICAgICAgICBsZXQgcjogeyBba2V5OiBzdHJpbmddOiBUIH0gPSB7fTtcbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiByW2tdID0gdik7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b0FueU1hcDxUPihtOiBNYXA8YW55LCBUPik6IGFueSB7XG4gICAgICAgIGxldCByID0ge307XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChtKSkge1xuICAgICAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiAoPGFueT5yKVtrXSA9IHYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cblxuXG4gICAgc3RhdGljIHRvU3RyaW5nKG06IE1hcDxzdHJpbmcsIGFueT4sIGlubmVyOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc2ogPSBuZXcgU3RyaW5nSm9pbmVyKFsnJ10pO1xuICAgICAgICBpZiAoIWlubmVyKSB7XG4gICAgICAgICAgICBzai5hZGQoJ3snKTtcbiAgICAgICAgfVxuICAgICAgICBtLmZvckVhY2goKHYsIGspID0+IHtcblxuICAgICAgICAgICAgaWYgKHYgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICBzai5hZGQoTWFwV3JhcHBlci50b1N0cmluZyh2LCB0cnVlKSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2ouYWRkKGspO1xuICAgICAgICAgICAgICAgIHNqLmFkZCgnPScpO1xuICAgICAgICAgICAgICAgIHNqLmFkZCh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNqLmFkZCgnLCAnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpbm5lcikge1xuICAgICAgICAgICAgc2ouYWRkKCd9ICcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNsZWFyVmFsdWVzKG06IE1hcDxhbnksIGFueT4pIHtcbiAgICAgICAgX2NsZWFyVmFsdWVzKG0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBpdGVyYWJsZTxUPihtOiBUKTogVCB7XG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuXG4gICAgc3RhdGljIG1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoZGVzdDogTWFwPHN0cmluZywgYW55Piwgc291cmNlOiBNYXA8c3RyaW5nLCBhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZU1pc21hdGNoZWQ6IGJvb2xlYW4pOiBNYXA8c3RyaW5nLCBhbnk+IHtcblxuICAgICAgICBsZXQga2V5cyA9IEFycmF5LmZyb20oc291cmNlLmtleXMoKSk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2VWYWx1ZSA9IHNvdXJjZS5nZXQoa2V5KTtcbiAgICAgICAgICAgIGxldCBkZXN0VmFsdWUgPSBkZXN0LmdldChrZXkpO1xuXG4gICAgICAgICAgICBpZiAoaXNCbGFuayhkZXN0VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBMaXN0V3JhcHBlci5jb3B5VmFsdWUoc291cmNlVmFsdWUpKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzdFZhbHVlIGluc3RhbmNlb2YgTWFwICYmIHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG5cbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksXG4gICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIubWVyZ2VNYXBJbnRvTWFwV2l0aE9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY2xvbmU8c3RyaW5nLCBhbnk+KGRlc3RWYWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VWYWx1ZSwgb3ZlcndyaXRlTWlzbWF0Y2hlZClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkZXN0VmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgaXNBcnJheShzb3VyY2VWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgIGlmIChMaXN0V3JhcHBlci5hbGxFbGVtZW50c0FyZVN0cmluZ3Moc291cmNlVmFsdWUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBNYXBXcmFwcGVyLm1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNsb25lPHN0cmluZywgYW55PihkZXN0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jb252ZXJ0TGlzdFRvTWFwKHNvdXJjZVZhbHVlKSwgb3ZlcndyaXRlTWlzbWF0Y2hlZClcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzb3VyY2VWZWN0OiBzdHJpbmdbXSA9IExpc3RXcmFwcGVyLmNsb25lPGFueT4oc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQ8YW55Pihzb3VyY2VWZWN0LCBkZXN0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShkZXN0VmFsdWUpICYmIHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoTGlzdFdyYXBwZXIuYWxsRWxlbWVudHNBcmVTdHJpbmdzKGRlc3RWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBNYXBXcmFwcGVyLm1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNvbnZlcnRMaXN0VG9NYXAoZGVzdFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcndyaXRlTWlzbWF0Y2hlZClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiBjYW4gd2UgcmVhbGx5IG1hdGNoIHRoaXMgdmFsdWVzIHdpdGggaW5kZXhPZlxuICAgICAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQ8TWFwPHN0cmluZywgYW55Pj4oZGVzdFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jbG9uZTxzdHJpbmcsIGFueT4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkZXN0VmFsdWUgaW5zdGFuY2VvZiBNYXAgJiYgaXNTdHJpbmcoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRlc3RWYWx1ZU1hcCA9IE1hcFdyYXBwZXIuY2xvbmUoZGVzdFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKGRlc3RWYWx1ZU1hcC5nZXQoc291cmNlVmFsdWUpKSkge1xuICAgICAgICAgICAgICAgICAgICBkZXN0VmFsdWUuc2V0KHNvdXJjZVZhbHVlLCBNYXBXcmFwcGVyLmNyZWF0ZUVtcHR5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZGVzdFZhbHVlKSAmJiBzb3VyY2VWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VIYXNoID0gTWFwV3JhcHBlci5jbG9uZShzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoc291cmNlSGFzaC5nZXQoZGVzdFZhbHVlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSGFzaC5zZXQoZGVzdFZhbHVlLCBNYXBXcmFwcGVyLmNyZWF0ZUVtcHR5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZUhhc2gpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGVzdFZhbHVlKSAmJiBpc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGVzdFZhbHVlKSAmJiBpc1N0cmluZyhzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRFbGVtZW50SWZBYnNlbnQoZGVzdFZhbHVlLCBzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZGVzdFZhbHVlKSAmJiBpc0FycmF5KHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VWZWN0OiBzdHJpbmdbXSA9IExpc3RXcmFwcGVyLmNsb25lPHN0cmluZz4oc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkRWxlbWVudElmQWJzZW50KHNvdXJjZVZlY3QsIGRlc3RWYWx1ZSk7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWZWN0KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhkZXN0VmFsdWUpICYmIGlzU3RyaW5nKHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG92ZXJ3cml0ZU1pc21hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGRlc3RDbGFzcyA9IGNsYXNzTmFtZShkZXN0VmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VDbGFzcyA9IGNsYXNzTmFtZShzb3VyY2VWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVzdENsYXNzID09PSBzb3VyY2VDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnZlcnRMaXN0VG9NYXAoa2V5czogc3RyaW5nW10pOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWFwLnNldChrZXlzW2ldLCBNYXBXcmFwcGVyLmNyZWF0ZUVtcHR5PHN0cmluZywgYW55PigpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIHN0YXRpYyBncm91cEJ5PEs+KGl0ZW1zOiBhbnksIGdyb3VwQnlLZXk6IChpdGVtOiBLKSA9PiBzdHJpbmcpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGl0ZW1zLnJlZHVjZSgoZ3JvdXBSZXN1bHQ6IGFueSwgY3VycmVudFZhbHVlOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgbGV0IGdLZXkgPSBncm91cEJ5S2V5KGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAoZ3JvdXBSZXN1bHRbZ0tleV0gPSBncm91cFJlc3VsdFtnS2V5XSB8fCBbXSkucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwUmVzdWx0O1xuICAgICAgICB9LCB7fSk7XG5cblxuICAgICAgICBsZXQgZ3JvdXBlZDogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBncm91cGVkLnNldChrZXksIHJlc3VsdFtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBncm91cGVkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBXcmFwcyBKYXZhc2NyaXB0IE9iamVjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ01hcFdyYXBwZXIge1xuICAgIHN0YXRpYyBjcmVhdGUoKTogeyBbazogLyphbnkqLyBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIC8vIE5vdGU6IFdlIGFyZSBub3QgdXNpbmcgT2JqZWN0LmNyZWF0ZShudWxsKSBoZXJlIGR1ZSB0b1xuICAgICAgICAvLyBwZXJmb3JtYW5jZSFcbiAgICAgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vbmcyLW9iamVjdC1jcmVhdGUtbnVsbFxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5zKG1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwga2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQ8Vj4obWFwOiB7IFtrZXk6IHN0cmluZ106IFYgfSwga2V5OiBzdHJpbmcpOiBWIHtcbiAgICAgICAgcmV0dXJuIG1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpID8gbWFwW2tleV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldDxWPihtYXA6IHsgW2tleTogc3RyaW5nXTogViB9LCBrZXk6IHN0cmluZywgdmFsdWU6IFYpIHtcbiAgICAgICAgbWFwW2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBpc0VtcHR5KG1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBwcm9wIGluIG1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWxldGUobWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBrZXk6IHN0cmluZykge1xuICAgICAgICBkZWxldGUgbWFwW2tleV07XG4gICAgfVxuXG4gICAgc3RhdGljIGZvckVhY2g8SywgVj4obWFwOiB7IFtrZXk6IHN0cmluZ106IFYgfSwgY2FsbGJhY2s6ICh2OiBWLCBLOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyhtYXApKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhtYXBba10sIGspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIG1lcmdlPFY+KG0xOiB7IFtrZXk6IHN0cmluZ106IFYgfSwgbTI6IHsgW2tleTogc3RyaW5nXTogViB9KTogeyBba2V5OiBzdHJpbmddOiBWIH0ge1xuICAgICAgICBsZXQgbTogeyBba2V5OiBzdHJpbmddOiBWIH0gPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBrIG9mIE9iamVjdC5rZXlzKG0xKSkge1xuICAgICAgICAgICAgbVtrXSA9IG0xW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyhtMikpIHtcbiAgICAgICAgICAgIG1ba10gPSBtMltrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcXVhbHM8Vj4obTE6IHsgW2tleTogc3RyaW5nXTogViB9LCBtMjogeyBba2V5OiBzdHJpbmddOiBWIH0pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGsxID0gT2JqZWN0LmtleXMobTEpO1xuICAgICAgICBsZXQgazIgPSBPYmplY3Qua2V5cyhtMik7XG4gICAgICAgIGlmIChrMS5sZW5ndGggIT09IGsyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBrZXk6IGFueSAvKiogVE9ETyAjPz8/PyAqLztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAga2V5ID0gazFbaV07XG4gICAgICAgICAgICBpZiAobTFba2V5XSAhPT0gbTJba2V5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBBIGJvb2xlYW4tdmFsdWVkIGZ1bmN0aW9uIG92ZXIgYSB2YWx1ZSwgcG9zc2libHkgaW5jbHVkaW5nIGNvbnRleHQgaW5mb3JtYXRpb25cbiAqIHJlZ2FyZGluZyB0aGF0IHZhbHVlJ3MgcG9zaXRpb24gaW4gYW4gYXJyYXkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJlZGljYXRlPFQ+IHtcbiAgICAodmFsdWU6IFQsIGluZGV4PzogbnVtYmVyLCBhcnJheT86IFRbXSk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBMaXN0V3JhcHBlciB7XG4gICAgLy8gSlMgaGFzIG5vIHdheSB0byBleHByZXNzIGEgc3RhdGljYWxseSBmaXhlZCBzaXplIGxpc3QsIGJ1dCBkYXJ0IGRvZXMgc28gd2VcbiAgICAvLyBrZWVwIGJvdGggbWV0aG9kcy5cbiAgICBzdGF0aWMgY3JlYXRlRml4ZWRTaXplKHNpemU6IG51bWJlcik6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheShzaXplKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlR3Jvd2FibGVTaXplKHNpemU6IG51bWJlcik6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheShzaXplKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xvbmU8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XG4gICAgICAgIHJldHVybiBhcnJheS5zbGljZSgwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZm9yRWFjaFdpdGhJbmRleDxUPihhcnJheTogVFtdLCBmbjogKHQ6IFQsIG46IG51bWJlcikgPT4gdm9pZCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmbihhcnJheVtpXSwgaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZmlyc3Q8VD4oYXJyYXk6IFRbXSk6IFQge1xuICAgICAgICBpZiAoIWFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBsYXN0PFQ+KGFycmF5OiBUW10pOiBUIHtcbiAgICAgICAgaWYgKCFhcnJheSB8fCBhcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5kZXhPZjxUPihhcnJheTogVFtdLCB2YWx1ZTogVCwgc3RhcnRJbmRleDogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlLCBzdGFydEluZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnM8VD4obGlzdDogVFtdLCBlbDogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKGVsKSAhPT0gLTE7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY29udGFpbnNBbGw8VD4obGlzdDogVFtdLCBlbHM6IFRbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZWxzLm1hcChmdW5jdGlvbiAobmVlZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKG5lZWRsZSk7XG4gICAgICAgIH0pLmluZGV4T2YoLTEpID09PSAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbnNDb21wbGV4KGxpc3Q6IEFycmF5PGFueT4sIGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbGlzdC5maW5kSW5kZXgoZWwgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhlbCwgaXRlbSk7XG4gICAgICAgIH0pID4gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmRJbmRleENvbXBsZXgobGlzdDogQXJyYXk8YW55PiwgaXRlbTogYW55KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsaXN0LmZpbmRJbmRleChlbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKGVsLCBpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuXG4gICAgc3RhdGljIHJlbW92ZUlmRXhpc3QobGlzdDogQXJyYXk8YW55PiwgaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gbGlzdC5maW5kSW5kZXgoZWwgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhlbCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmVBdDxhbnk+KGxpc3QsIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZXZlcnNlZDxUPihhcnJheTogVFtdKTogVFtdIHtcbiAgICAgICAgbGV0IGEgPSBMaXN0V3JhcHBlci5jbG9uZShhcnJheSk7XG4gICAgICAgIHJldHVybiBhLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29uY2F0KGE6IGFueVtdLCBiOiBhbnlbXSk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnNlcnQ8VD4obGlzdDogVFtdLCBpbmRleDogbnVtYmVyLCB2YWx1ZTogVCkge1xuICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMCwgdmFsdWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVBdDxUPihsaXN0OiBUW10sIGluZGV4OiBudW1iZXIpOiBUIHtcbiAgICAgICAgbGV0IHJlcyA9IGxpc3RbaW5kZXhdO1xuICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUFsbDxUPihsaXN0OiBUW10sIGl0ZW1zOiBUW10pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gbGlzdC5pbmRleE9mKGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmU8VD4obGlzdDogVFtdLCBlbDogVCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaW5kZXggPSBsaXN0LmluZGV4T2YoZWwpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVMYXN0PFQ+KGFycmF5OiBUW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCFhcnJheSB8fCBhcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5LnNwbGljZShhcnJheS5sZW5ndGggLSAxKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjbGVhcihsaXN0OiBhbnlbXSkge1xuICAgICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRW1wdHkobGlzdDogYW55W10pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGxpc3QubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBmaWxsKGxpc3Q6IGFueVtdLCB2YWx1ZTogYW55LCBzdGFydDogbnVtYmVyID0gMCwgZW5kOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGxpc3QuZmlsbCh2YWx1ZSwgc3RhcnQsIGVuZCA9PT0gbnVsbCA/IGxpc3QubGVuZ3RoIDogZW5kKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzKGE6IGFueVtdLCBiOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2xpY2U8VD4obDogVFtdLCBmcm9tOiBudW1iZXIgPSAwLCB0bzogbnVtYmVyID0gbnVsbCk6IFRbXSB7XG4gICAgICAgIHJldHVybiBsLnNsaWNlKGZyb20sIHRvID09PSBudWxsID8gdW5kZWZpbmVkIDogdG8pO1xuICAgIH1cblxuICAgIHN0YXRpYyBzcGxpY2U8VD4obDogVFtdLCBmcm9tOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIGwuc3BsaWNlKGZyb20sIGxlbmd0aCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNvcnQ8VD4obDogVFtdLCBjb21wYXJlRm4/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29tcGFyZUZuKSkge1xuICAgICAgICAgICAgbC5zb3J0KGNvbXBhcmVGbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsLnNvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIHNvcnRCeUV4YW1wbGUodG9Tb3J0OiBzdHJpbmdbXSwgcGF0dGVybjogc3RyaW5nW10pIHtcbiAgICAgICAgdG9Tb3J0LnNvcnQoKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXhBID0gcGF0dGVybi5pbmRleE9mKGEpID09PSAtMSA/IDEwIDogcGF0dGVybi5pbmRleE9mKGEpO1xuICAgICAgICAgICAgbGV0IGluZGV4QiA9IHBhdHRlcm4uaW5kZXhPZihiKSA9PT0gLTEgPyAxMCA6IHBhdHRlcm4uaW5kZXhPZihiKTtcblxuICAgICAgICAgICAgcmV0dXJuIGluZGV4QSAtIGluZGV4QjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvU3RyaW5nPFQ+KGw6IFRbXSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBvdXQgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBsKSB7XG4gICAgICAgICAgICBvdXQgKz0gaXRlbS50b1N0cmluZygpICsgJywgICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9KU09OPFQ+KGw6IFRbXSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShsKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbWF4aW11bTxUPihsaXN0OiBUW10sIHByZWRpY2F0ZTogKHQ6IFQpID0+IG51bWJlcik6IFQge1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzb2x1dGlvbjogYW55IC8qKiBUT0RPICM/Pz8/ICovID0gbnVsbDtcbiAgICAgICAgbGV0IG1heFZhbHVlID0gLUluZmluaXR5O1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGUgPSBsaXN0W2luZGV4XTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGVWYWx1ZSA9IHByZWRpY2F0ZShjYW5kaWRhdGUpO1xuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZVZhbHVlID4gbWF4VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzb2x1dGlvbiA9IGNhbmRpZGF0ZTtcbiAgICAgICAgICAgICAgICBtYXhWYWx1ZSA9IGNhbmRpZGF0ZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb2x1dGlvbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmxhdHRlbjxUPihsaXN0OiBBcnJheTxUIHwgVFtdPik6IFRbXSB7XG4gICAgICAgIGxldCB0YXJnZXQ6IGFueVtdID0gW107XG4gICAgICAgIF9mbGF0dGVuQXJyYXkobGlzdCwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBhbGxFbGVtZW50c0FyZVN0cmluZ3M8VD4obGlzdDogQXJyYXk8VCB8IFRbXT4pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHRhcmdldDogYW55W10gPSBMaXN0V3JhcHBlci5mbGF0dGVuKGxpc3QpO1xuICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRhcmdldCkge1xuICAgICAgICAgICAgaWYgKCFpc1N0cmluZyhlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRBbGw8VD4obGlzdDogQXJyYXk8VD4sIHNvdXJjZTogQXJyYXk8VD4pOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChzb3VyY2VbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdG9kbzogY2hlY2sgaWYgdGhpcyBoYW5kbGVzIG9iamVjdHMgd2l0aCBjb250YWluc1xuICAgIHN0YXRpYyBhZGRFbGVtZW50SWZBYnNlbnQ8VD4obGlzdDogQXJyYXk8VD4sIGVsZW1lbnQ6IFQpOiB2b2lkIHtcblxuICAgICAgICBsZXQgY29udGFpbnMgPSBDb2xsZWN0aW9ucy5hcnJheXMuY29udGFpbnMobGlzdCwgZWxlbWVudCwgKGl0ZW0xOiBhbnksIGl0ZW0yOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgaWYgKGl0ZW0xWydlcXVhbHNUbyddKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xWydlcXVhbHNUbyddKGl0ZW0yKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0xID09PSBpdGVtMjtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghY29udGFpbnMpIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIGFkZEVsZW1lbnRzSWZBYnNlbnQ8VD4obGlzdDogQXJyYXk8VD4sIGVsZW1lbnRzOiBUW10pOiB2b2lkIHtcblxuXG4gICAgICAgIGlmIChpc0JsYW5rKGVsZW1lbnRzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgZWxlbSBvZiBlbGVtZW50cykge1xuXG4gICAgICAgICAgICBsZXQgY29udGFpbnMgPSBDb2xsZWN0aW9ucy5hcnJheXMuY29udGFpbnMobGlzdCwgZWxlbSwgKGl0ZW0xOiBhbnksIGl0ZW0yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbTFbJ2VxdWFsc1RvJ10gJiYgaXRlbTJbJ2VxdWFsc1RvJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xWydlcXVhbHNUbyddKGl0ZW0yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xID09PSBpdGVtMjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjb250YWlucykge1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaChlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIGNvcHlWYWx1ZTxUPih2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWFwV3JhcHBlci5jbG9uZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5jbG9uZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbn1cblxuZnVuY3Rpb24gX2ZsYXR0ZW5BcnJheShzb3VyY2U6IGFueVtdLCB0YXJnZXQ6IGFueVtdKTogYW55W10ge1xuICAgIGlmIChpc1ByZXNlbnQoc291cmNlKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzb3VyY2VbaV07XG4gICAgICAgICAgICBpZiAoaXNBcnJheShpdGVtKSkge1xuICAgICAgICAgICAgICAgIF9mbGF0dGVuQXJyYXkoaXRlbSwgdGFyZ2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaXN0TGlrZUl0ZXJhYmxlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc0pzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gaXNBcnJheShvYmopIHx8XG4gICAgICAgICghKG9iaiBpbnN0YW5jZW9mIE1hcCkgJiYgICAgICAvLyBKUyBNYXAgYXJlIGl0ZXJhYmxlcyBidXQgcmV0dXJuIGVudHJpZXMgYXMgW2ssIHZdXG4gICAgICAgICAgICBnZXRTeW1ib2xJdGVyYXRvcigpIGluIG9iaik7ICAvLyBKUyBJdGVyYWJsZSBoYXZlIGEgU3ltYm9sLml0ZXJhdG9yIHByb3Bcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUl0ZXJhYmxlc0VxdWFsKGE6IGFueSwgYjogYW55LCBjb21wYXJhdG9yOiBGdW5jdGlvbik6IGJvb2xlYW4ge1xuICAgIGxldCBpdGVyYXRvcjEgPSBhW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gICAgbGV0IGl0ZXJhdG9yMiA9IGJbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBpdGVtMSA9IGl0ZXJhdG9yMS5uZXh0KCk7XG4gICAgICAgIGxldCBpdGVtMiA9IGl0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICAgIGlmIChpdGVtMS5kb25lICYmIGl0ZW0yLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtMS5kb25lIHx8IGl0ZW0yLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbXBhcmF0b3IoaXRlbTEudmFsdWUsIGl0ZW0yLnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXRlcmF0ZUxpc3RMaWtlKG9iajogYW55LCBmbjogRnVuY3Rpb24pIHtcbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmbihvYmpbaV0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gb2JqW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gICAgICAgIGxldCBpdGVtOiBhbnkgLyoqIFRPRE8gIz8/Pz8gKi87XG4gICAgICAgIHdoaWxlICghKChpdGVtID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSkge1xuICAgICAgICAgICAgZm4oaXRlbS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRMYXN0PFQ+KGFycjogVFtdLCBjb25kaXRpb246ICh2YWx1ZTogVCkgPT4gYm9vbGVhbik6IFQgfCBudWxsIHtcbiAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChjb25kaXRpb24oYXJyW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycltpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gU2FmYXJpIGFuZCBJbnRlcm5ldCBFeHBsb3JlciBkbyBub3Qgc3VwcG9ydCB0aGUgaXRlcmFibGUgcGFyYW1ldGVyIHRvIHRoZVxuLy8gU2V0IGNvbnN0cnVjdG9yLiAgV2Ugd29yayBhcm91bmQgdGhhdCBieSBtYW51YWxseSBhZGRpbmcgdGhlIGl0ZW1zLlxubGV0IGNyZWF0ZVNldEZyb21MaXN0OiB7IChsc3Q6IGFueVtdKTogU2V0PGFueT4gfSA9IChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRlc3QgPSBuZXcgU2V0KFsxLCAyLCAzXSk7XG4gICAgaWYgKHRlc3Quc2l6ZSA9PT0gMykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlU2V0RnJvbUxpc3RJbm5lcihsc3Q6IGFueVtdKTogU2V0PGFueT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQobHN0KTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlU2V0QW5kUG9wdWxhdGVGcm9tTGlzdChsc3Q6IGFueVtdKTogU2V0PGFueT4ge1xuICAgICAgICAgICAgbGV0IHJlcyA9IG5ldyBTZXQobHN0KTtcbiAgICAgICAgICAgIGlmIChyZXMuc2l6ZSAhPT0gbHN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5hZGQobHN0W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9O1xuICAgIH1cbn0pKCk7XG5cbiJdfQ==