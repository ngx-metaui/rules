/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as Collections from 'typescript-collections';
import { className, equals, getSymbolIterator, isArray, isBlank, isJsObject, isPresent, isString, StringJoiner } from './lang';
export const /** @type {?} */ createMapFromMap = (function () {
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
        let /** @type {?} */ map = new Map();
        m.forEach((v, k) => {
            map.set(k, v);
        });
        return map;
    };
})();
export const /** @type {?} */ _clearValues = (function () {
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
        catch (/** @type {?} */ e) {
        }
        let /** @type {?} */ map = new Map();
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
        let /** @type {?} */ map = new Map();
        for (let /** @type {?} */ i = 0; i < keys.length; i++) {
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
        for (let /** @type {?} */ prop in map) {
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
        for (let /** @type {?} */ k of Object.keys(map)) {
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
        let /** @type {?} */ contains = Collections.arrays.contains(list, element, (item1, item2) => {
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
            let /** @type {?} */ contains = Collections.arrays.contains(list, elem, (item1, item2) => {
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
export function iterateListLike(obj, fn) {
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
export function findLast(arr, condition) {
    for (let /** @type {?} */ i = arr.length - 1; i >= 0; i--) {
        if (condition(arr[i])) {
            return arr[i];
        }
    }
    return null;
}
const ɵ0 = function () {
    let /** @type {?} */ test = new Set([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromListInner(lst) {
            return new Set(lst);
        };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            let /** @type {?} */ res = new Set(lst);
            if (res.size !== lst.length) {
                for (let /** @type {?} */ i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
};
// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
let /** @type {?} */ createSetFromList = (ɵ0)();
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFjQSxPQUFPLEtBQUssV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFDSCxTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLFlBQVksRUFDZixNQUFNLFFBQVEsQ0FBQztBQUdoQixNQUFNLENBQUMsdUJBQU0sZ0JBQWdCLEdBQTBDLENBQUM7SUFDcEUsSUFBSSxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLG1CQUFNLElBQUksR0FBRyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLCtCQUErQixDQUFnQjtnQkFDbEQsTUFBTSxDQUFDLElBQUksR0FBRyxtQkFBTSxDQUFDLEVBQUMsQ0FBQzthQUMxQixDQUFDO1NBQ0w7S0FDSjtJQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFBLENBQUMsRUFBRSxDQUFDO0tBQ1o7SUFDRCxNQUFNLENBQUMscUNBQXFDLENBQWdCO1FBQ3hELHFCQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ2QsQ0FBQztDQUNMLENBQUMsRUFBRSxDQUFDO0FBQ0wsTUFBTSxDQUFDLHVCQUFNLFlBQVksR0FBaUMsQ0FBQztJQUN2RCxFQUFFLENBQUMsQ0FBQyxtQkFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMs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Ii8qKlxuICpcbiAqIEBvcmlnaW5hbC1saWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqXG4gKlxuICpcbiAqICBDcmVkaXQ6IERlcml2ZWQgYW5kIGV4dGVuZGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhciBpbiBvcmRlciB0byBoYXZlIHNldCBvZlxuICogIHJldXNhYmxlIGdsb2JhbHMuIFNpbmNlIGl0cyBub3QgZXhwb3J0ZWQgQVBJIG5lZWQgdG8gaGF2ZSBhIGNvcHkgdW5kZXIgY29yZS5cbiAqL1xuaW1wb3J0ICogYXMgQ29sbGVjdGlvbnMgZnJvbSAndHlwZXNjcmlwdC1jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIGNsYXNzTmFtZSxcbiAgICBlcXVhbHMsXG4gICAgZ2V0U3ltYm9sSXRlcmF0b3IsXG4gICAgaXNBcnJheSxcbiAgICBpc0JsYW5rLFxuICAgIGlzSnNPYmplY3QsXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIFN0cmluZ0pvaW5lclxufSBmcm9tICcuL2xhbmcnO1xuXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVNYXBGcm9tTWFwOiB7IChtOiBNYXA8YW55LCBhbnk+KTogTWFwPGFueSwgYW55PiB9ID0gKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAobmV3IE1hcCg8YW55Pm5ldyBNYXAoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVNYXBGcm9tTWFwSW5uZXIobTogTWFwPGFueSwgYW55Pik6IE1hcDxhbnksIGFueT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWFwKDxhbnk+bSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlTWFwQW5kUG9wdWxhdGVGcm9tTWFwKG06IE1hcDxhbnksIGFueT4pOiBNYXA8YW55LCBhbnk+IHtcbiAgICAgICAgbGV0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgICAgICBtYXAuc2V0KGssIHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9O1xufSkoKTtcbmV4cG9ydCBjb25zdCBfY2xlYXJWYWx1ZXM6IHsgKG06IE1hcDxhbnksIGFueT4pOiB2b2lkIH0gPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmICgoPGFueT4obmV3IE1hcCgpKS5rZXlzKCkpLm5leHQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9jbGVhclZhbHVlc0lubmVyKG06IE1hcDxhbnksIGFueT4pIHtcbiAgICAgICAgICAgIGxldCBrZXlJdGVyYXRvciA9IG0ua2V5cygpO1xuICAgICAgICAgICAgbGV0IGs6IGFueSAvKiogVE9ETyAjPz8/PyAqLztcbiAgICAgICAgICAgIHdoaWxlICghKChrID0gKDxhbnk+a2V5SXRlcmF0b3IpLm5leHQoKSkuZG9uZSkpIHtcbiAgICAgICAgICAgICAgICBtLnNldChrLnZhbHVlLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gX2NsZWFyVmFsdWVzV2l0aEZvcmVFYWNoKG06IE1hcDxhbnksIGFueT4pIHtcbiAgICAgICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICAgICAgICAgIG0uc2V0KGssIG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxufSkoKTtcblxuZXhwb3J0IGNsYXNzIE1hcFdyYXBwZXIge1xuXG4gICAgc3RhdGljIGNyZWF0ZUVtcHR5PEssIFY+KCk6IE1hcDxLLCBWPiB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwPEssIFY+KCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsb25lPEssIFY+KG06IE1hcDxLLCBWPik6IE1hcDxLLCBWPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobmV3IE1hcCg8YW55Pm5ldyBNYXAoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1hcDxLLCBWPig8YW55PiBtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB9XG4gICAgICAgIGxldCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICAgICAgbWFwLnNldChrLCB2KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUZyb21TdHJpbmdNYXA8VD4oc3RyaW5nTWFwOiB7IFtrZXk6IHN0cmluZ106IFQgfSk6IE1hcDxzdHJpbmcsIFQ+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBUPigpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3RyaW5nTWFwKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGtleSwgc3RyaW5nTWFwW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY3JlYXRlRnJvbUFueU1hcDxUPihzdHJpbmdNYXA6IHsgW2tleTogc3RyaW5nXTogVCB9KTogTWFwPGFueSwgVD4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcDxhbnksIFQ+KCk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzdHJpbmdNYXApIHtcbiAgICAgICAgICAgIHJlc3VsdC5zZXQoa2V5LCBzdHJpbmdNYXBba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjcmVhdGVGcm9tU3RyaW5nTWFwV2l0aFJlc29sdmU8VD4oc3RyaW5nTWFwOiB7IFtrZXk6IHN0cmluZ106IFQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmU6IChrZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYW55KSA9PiBhbnkpOiBNYXA8c3RyaW5nLCBUPiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgVD4oKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHN0cmluZ01hcCkge1xuICAgICAgICAgICAgbGV0IHVwZGF0ZWRWYWx1ZSA9IHJlc29sdmUoa2V5LCBzdHJpbmdNYXBba2V5XSk7XG4gICAgICAgICAgICByZXN1bHQuc2V0KGtleSwgdXBkYXRlZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyB0b1N0cmluZ01hcDxUPihtOiBNYXA8c3RyaW5nLCBUPik6IHsgW2tleTogc3RyaW5nXTogVCB9IHtcbiAgICAgICAgbGV0IHI6IHsgW2tleTogc3RyaW5nXTogVCB9ID0ge307XG4gICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4gcltrXSA9IHYpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9BbnlNYXA8VD4obTogTWFwPGFueSwgVD4pOiBhbnkge1xuICAgICAgICBsZXQgciA9IHt9O1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQobSkpIHtcbiAgICAgICAgICAgIG0uZm9yRWFjaCgodiwgaykgPT4gKDxhbnk+cilba10gPSB2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG5cblxuICAgIHN0YXRpYyB0b1N0cmluZyhtOiBNYXA8c3RyaW5nLCBhbnk+LCBpbm5lcjogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHNqID0gbmV3IFN0cmluZ0pvaW5lcihbJyddKTtcbiAgICAgICAgaWYgKCFpbm5lcikge1xuICAgICAgICAgICAgc2ouYWRkKCd7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgbS5mb3JFYWNoKCh2LCBrKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh2IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgc2ouYWRkKE1hcFdyYXBwZXIudG9TdHJpbmcodiwgdHJ1ZSkpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNqLmFkZChrKTtcbiAgICAgICAgICAgICAgICBzai5hZGQoJz0nKTtcbiAgICAgICAgICAgICAgICBzai5hZGQodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzai5hZGQoJywgJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaW5uZXIpIHtcbiAgICAgICAgICAgIHNqLmFkZCgnfSAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2oudG9TdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBjbGVhclZhbHVlcyhtOiBNYXA8YW55LCBhbnk+KSB7XG4gICAgICAgIF9jbGVhclZhbHVlcyhtKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXRlcmFibGU8VD4obTogVCk6IFQge1xuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBtZXJnZU1hcEludG9NYXBXaXRoT2JqZWN0KGRlc3Q6IE1hcDxzdHJpbmcsIGFueT4sIHNvdXJjZTogTWFwPHN0cmluZywgYW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyd3JpdGVNaXNtYXRjaGVkOiBib29sZWFuKTogTWFwPHN0cmluZywgYW55PiB7XG5cbiAgICAgICAgbGV0IGtleXMgPSBBcnJheS5mcm9tKHNvdXJjZS5rZXlzKCkpO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICBsZXQgc291cmNlVmFsdWUgPSBzb3VyY2UuZ2V0KGtleSk7XG4gICAgICAgICAgICBsZXQgZGVzdFZhbHVlID0gZGVzdC5nZXQoa2V5KTtcblxuICAgICAgICAgICAgaWYgKGlzQmxhbmsoZGVzdFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgTGlzdFdyYXBwZXIuY29weVZhbHVlKHNvdXJjZVZhbHVlKSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlc3RWYWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiBzb3VyY2VWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuXG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LFxuICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLm1lcmdlTWFwSW50b01hcFdpdGhPYmplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXBXcmFwcGVyLmNsb25lPHN0cmluZywgYW55PihkZXN0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlVmFsdWUsIG92ZXJ3cml0ZU1pc21hdGNoZWQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzdFZhbHVlIGluc3RhbmNlb2YgTWFwICYmIGlzQXJyYXkoc291cmNlVmFsdWUpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoTGlzdFdyYXBwZXIuYWxsRWxlbWVudHNBcmVTdHJpbmdzKHNvdXJjZVZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgTWFwV3JhcHBlci5tZXJnZU1hcEludG9NYXBXaXRoT2JqZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jbG9uZTxzdHJpbmcsIGFueT4oZGVzdFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY29udmVydExpc3RUb01hcChzb3VyY2VWYWx1ZSksIG92ZXJ3cml0ZU1pc21hdGNoZWQpXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc291cmNlVmVjdDogc3RyaW5nW10gPSBMaXN0V3JhcHBlci5jbG9uZTxhbnk+KHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkRWxlbWVudElmQWJzZW50PGFueT4oc291cmNlVmVjdCwgZGVzdFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGVzdFZhbHVlKSAmJiBzb3VyY2VWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKExpc3RXcmFwcGVyLmFsbEVsZW1lbnRzQXJlU3RyaW5ncyhkZXN0VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgTWFwV3JhcHBlci5tZXJnZU1hcEludG9NYXBXaXRoT2JqZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwV3JhcHBlci5jb252ZXJ0TGlzdFRvTWFwKGRlc3RWYWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZU1pc21hdGNoZWQpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdG9kbzogY2FuIHdlIHJlYWxseSBtYXRjaCB0aGlzIHZhbHVlcyB3aXRoIGluZGV4T2ZcbiAgICAgICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkRWxlbWVudElmQWJzZW50PE1hcDxzdHJpbmcsIGFueT4+KGRlc3RWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcFdyYXBwZXIuY2xvbmU8c3RyaW5nLCBhbnk+KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVZhbHVlKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzdFZhbHVlIGluc3RhbmNlb2YgTWFwICYmIGlzU3RyaW5nKHNvdXJjZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGxldCBkZXN0VmFsdWVNYXAgPSBNYXBXcmFwcGVyLmNsb25lKGRlc3RWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNCbGFuayhkZXN0VmFsdWVNYXAuZ2V0KHNvdXJjZVZhbHVlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdFZhbHVlLnNldChzb3VyY2VWYWx1ZSwgTWFwV3JhcHBlci5jcmVhdGVFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGRlc3RWYWx1ZSkgJiYgc291cmNlVmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlSGFzaCA9IE1hcFdyYXBwZXIuY2xvbmUoc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKHNvdXJjZUhhc2guZ2V0KGRlc3RWYWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUhhc2guc2V0KGRlc3RWYWx1ZSwgTWFwV3JhcHBlci5jcmVhdGVFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VIYXNoKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGRlc3RWYWx1ZSkgJiYgaXNBcnJheShzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGRlc3RWYWx1ZSkgJiYgaXNTdHJpbmcoc291cmNlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkRWxlbWVudElmQWJzZW50KGRlc3RWYWx1ZSwgc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGRlc3RWYWx1ZSkgJiYgaXNBcnJheShzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlVmVjdDogc3RyaW5nW10gPSBMaXN0V3JhcHBlci5jbG9uZTxzdHJpbmc+KHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEVsZW1lbnRJZkFic2VudChzb3VyY2VWZWN0LCBkZXN0VmFsdWUpO1xuICAgICAgICAgICAgICAgIGRlc3Quc2V0KGtleSwgc291cmNlVmVjdCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZGVzdFZhbHVlKSAmJiBpc1N0cmluZyhzb3VyY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkZXN0LnNldChrZXksIHNvdXJjZVZhbHVlKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChvdmVyd3JpdGVNaXNtYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBkZXN0Q2xhc3MgPSBjbGFzc05hbWUoZGVzdFZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlQ2xhc3MgPSBjbGFzc05hbWUoc291cmNlVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRlc3RDbGFzcyA9PT0gc291cmNlQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdC5zZXQoa2V5LCBzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH1cblxuICAgIHN0YXRpYyBjb252ZXJ0TGlzdFRvTWFwKGtleXM6IHN0cmluZ1tdKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1hcC5zZXQoa2V5c1tpXSwgTWFwV3JhcHBlci5jcmVhdGVFbXB0eTxzdHJpbmcsIGFueT4oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ3JvdXBCeTxLPihpdGVtczogYW55LCBncm91cEJ5S2V5OiAoaXRlbTogSykgPT4gc3RyaW5nKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBpdGVtcy5yZWR1Y2UoKGdyb3VwUmVzdWx0OiBhbnksIGN1cnJlbnRWYWx1ZTogYW55KSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBnS2V5ID0gZ3JvdXBCeUtleShjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgKGdyb3VwUmVzdWx0W2dLZXldID0gZ3JvdXBSZXN1bHRbZ0tleV0gfHwgW10pLnB1c2goY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBncm91cFJlc3VsdDtcbiAgICAgICAgfSwge30pO1xuXG5cbiAgICAgICAgbGV0IGdyb3VwZWQ6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgZ3JvdXBlZC5zZXQoa2V5LCByZXN1bHRba2V5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ3JvdXBlZDtcbiAgICB9XG59XG5cbi8qKlxuICogV3JhcHMgSmF2YXNjcmlwdCBPYmplY3RzXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHJpbmdNYXBXcmFwcGVyIHtcbiAgICBzdGF0aWMgY3JlYXRlKCk6IHsgW2s6IC8qYW55Ki8gc3RyaW5nXTogYW55IH0ge1xuICAgICAgICAvLyBOb3RlOiBXZSBhcmUgbm90IHVzaW5nIE9iamVjdC5jcmVhdGUobnVsbCkgaGVyZSBkdWUgdG9cbiAgICAgICAgLy8gcGVyZm9ybWFuY2UhXG4gICAgICAgIC8vIGh0dHA6Ly9qc3BlcmYuY29tL25nMi1vYmplY3QtY3JlYXRlLW51bGxcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWlucyhtYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBtYXAuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0PFY+KG1hcDogeyBba2V5OiBzdHJpbmddOiBWIH0sIGtleTogc3RyaW5nKTogViB7XG4gICAgICAgIHJldHVybiBtYXAuaGFzT3duUHJvcGVydHkoa2V5KSA/IG1hcFtrZXldIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQ8Vj4obWFwOiB7IFtrZXk6IHN0cmluZ106IFYgfSwga2V5OiBzdHJpbmcsIHZhbHVlOiBWKSB7XG4gICAgICAgIG1hcFtrZXldID0gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgaXNFbXB0eShtYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBtYXApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVsZXRlKG1hcDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwga2V5OiBzdHJpbmcpIHtcbiAgICAgICAgZGVsZXRlIG1hcFtrZXldO1xuICAgIH1cblxuICAgIHN0YXRpYyBmb3JFYWNoPEssIFY+KG1hcDogeyBba2V5OiBzdHJpbmddOiBWIH0sIGNhbGxiYWNrOiAodjogViwgSzogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgICAgIGZvciAobGV0IGsgb2YgT2JqZWN0LmtleXMobWFwKSkge1xuICAgICAgICAgICAgY2FsbGJhY2sobWFwW2tdLCBrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBtZXJnZTxWPihtMTogeyBba2V5OiBzdHJpbmddOiBWIH0sIG0yOiB7IFtrZXk6IHN0cmluZ106IFYgfSk6IHsgW2tleTogc3RyaW5nXTogViB9IHtcbiAgICAgICAgbGV0IG06IHsgW2tleTogc3RyaW5nXTogViB9ID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyhtMSkpIHtcbiAgICAgICAgICAgIG1ba10gPSBtMVtrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGsgb2YgT2JqZWN0LmtleXMobTIpKSB7XG4gICAgICAgICAgICBtW2tdID0gbTJba107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXF1YWxzPFY+KG0xOiB7IFtrZXk6IHN0cmluZ106IFYgfSwgbTI6IHsgW2tleTogc3RyaW5nXTogViB9KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBrMSA9IE9iamVjdC5rZXlzKG0xKTtcbiAgICAgICAgbGV0IGsyID0gT2JqZWN0LmtleXMobTIpO1xuICAgICAgICBpZiAoazEubGVuZ3RoICE9PSBrMi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQga2V5OiBhbnkgLyoqIFRPRE8gIz8/Pz8gKi87XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgazEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGtleSA9IGsxW2ldO1xuICAgICAgICAgICAgaWYgKG0xW2tleV0gIT09IG0yW2tleV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQSBib29sZWFuLXZhbHVlZCBmdW5jdGlvbiBvdmVyIGEgdmFsdWUsIHBvc3NpYmx5IGluY2x1ZGluZyBjb250ZXh0IGluZm9ybWF0aW9uXG4gKiByZWdhcmRpbmcgdGhhdCB2YWx1ZSdzIHBvc2l0aW9uIGluIGFuIGFycmF5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByZWRpY2F0ZTxUPiB7XG4gICAgKHZhbHVlOiBULCBpbmRleD86IG51bWJlciwgYXJyYXk/OiBUW10pOiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgTGlzdFdyYXBwZXIge1xuICAgIC8vIEpTIGhhcyBubyB3YXkgdG8gZXhwcmVzcyBhIHN0YXRpY2FsbHkgZml4ZWQgc2l6ZSBsaXN0LCBidXQgZGFydCBkb2VzIHNvIHdlXG4gICAgLy8ga2VlcCBib3RoIG1ldGhvZHMuXG4gICAgc3RhdGljIGNyZWF0ZUZpeGVkU2l6ZShzaXplOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUdyb3dhYmxlU2l6ZShzaXplOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsb25lPFQ+KGFycmF5OiBUW10pOiBUW10ge1xuICAgICAgICByZXR1cm4gYXJyYXkuc2xpY2UoMCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZvckVhY2hXaXRoSW5kZXg8VD4oYXJyYXk6IFRbXSwgZm46ICh0OiBULCBuOiBudW1iZXIpID0+IHZvaWQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm4oYXJyYXlbaV0sIGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGZpcnN0PFQ+KGFycmF5OiBUW10pOiBUIHtcbiAgICAgICAgaWYgKCFhcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbGFzdDxUPihhcnJheTogVFtdKTogVCB7XG4gICAgICAgIGlmICghYXJyYXkgfHwgYXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgc3RhdGljIGluZGV4T2Y8VD4oYXJyYXk6IFRbXSwgdmFsdWU6IFQsIHN0YXJ0SW5kZXg6IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSwgc3RhcnRJbmRleCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5zPFQ+KGxpc3Q6IFRbXSwgZWw6IFQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihlbCkgIT09IC0xO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGNvbnRhaW5zQWxsPFQ+KGxpc3Q6IFRbXSwgZWxzOiBUW10pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGVscy5tYXAoZnVuY3Rpb24gKG5lZWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihuZWVkbGUpO1xuICAgICAgICB9KS5pbmRleE9mKC0xKSA9PT0gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbnRhaW5zQ29tcGxleChsaXN0OiBBcnJheTxhbnk+LCBpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuZmluZEluZGV4KGVsID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcXVhbHMoZWwsIGl0ZW0pO1xuICAgICAgICB9KSA+IC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyBmaW5kSW5kZXhDb21wbGV4KGxpc3Q6IEFycmF5PGFueT4sIGl0ZW06IGFueSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbGlzdC5maW5kSW5kZXgoZWwgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVxdWFscyhlbCwgaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cblxuICAgIHN0YXRpYyByZW1vdmVJZkV4aXN0KGxpc3Q6IEFycmF5PGFueT4sIGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IGxpc3QuZmluZEluZGV4KGVsID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcXVhbHMoZWwsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlQXQ8YW55PihsaXN0LCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcmV2ZXJzZWQ8VD4oYXJyYXk6IFRbXSk6IFRbXSB7XG4gICAgICAgIGxldCBhID0gTGlzdFdyYXBwZXIuY2xvbmUoYXJyYXkpO1xuICAgICAgICByZXR1cm4gYS5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbmNhdChhOiBhbnlbXSwgYjogYW55W10pOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5zZXJ0PFQ+KGxpc3Q6IFRbXSwgaW5kZXg6IG51bWJlciwgdmFsdWU6IFQpIHtcbiAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDAsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlQXQ8VD4obGlzdDogVFtdLCBpbmRleDogbnVtYmVyKTogVCB7XG4gICAgICAgIGxldCByZXMgPSBsaXN0W2luZGV4XTtcbiAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVBbGw8VD4obGlzdDogVFtdLCBpdGVtczogVFtdKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGxpc3QuaW5kZXhPZihpdGVtc1tpXSk7XG4gICAgICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlPFQ+KGxpc3Q6IFRbXSwgZWw6IFQpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGluZGV4ID0gbGlzdC5pbmRleE9mKGVsKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlTGFzdDxUPihhcnJheTogVFtdKTogdm9pZCB7XG4gICAgICAgIGlmICghYXJyYXkgfHwgYXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBhcnJheS5zcGxpY2UoYXJyYXkubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgY2xlYXIobGlzdDogYW55W10pIHtcbiAgICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0VtcHR5KGxpc3Q6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBsaXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmlsbChsaXN0OiBhbnlbXSwgdmFsdWU6IGFueSwgc3RhcnQ6IG51bWJlciA9IDAsIGVuZDogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICBsaXN0LmZpbGwodmFsdWUsIHN0YXJ0LCBlbmQgPT09IG51bGwgPyBsaXN0Lmxlbmd0aCA6IGVuZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVxdWFscyhhOiBhbnlbXSwgYjogYW55W10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhdGljIHNsaWNlPFQ+KGw6IFRbXSwgZnJvbTogbnVtYmVyID0gMCwgdG86IG51bWJlciA9IG51bGwpOiBUW10ge1xuICAgICAgICByZXR1cm4gbC5zbGljZShmcm9tLCB0byA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHRvKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3BsaWNlPFQ+KGw6IFRbXSwgZnJvbTogbnVtYmVyLCBsZW5ndGg6IG51bWJlcik6IFRbXSB7XG4gICAgICAgIHJldHVybiBsLnNwbGljZShmcm9tLCBsZW5ndGgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzb3J0PFQ+KGw6IFRbXSwgY29tcGFyZUZuPzogKGE6IFQsIGI6IFQpID0+IG51bWJlcikge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGNvbXBhcmVGbikpIHtcbiAgICAgICAgICAgIGwuc29ydChjb21wYXJlRm4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbC5zb3J0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBzb3J0QnlFeGFtcGxlKHRvU29ydDogc3RyaW5nW10sIHBhdHRlcm46IHN0cmluZ1tdKSB7XG4gICAgICAgIHRvU29ydC5zb3J0KChhOiBzdHJpbmcsIGI6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4QSA9IHBhdHRlcm4uaW5kZXhPZihhKSA9PT0gLTEgPyAxMCA6IHBhdHRlcm4uaW5kZXhPZihhKTtcbiAgICAgICAgICAgIGxldCBpbmRleEIgPSBwYXR0ZXJuLmluZGV4T2YoYikgPT09IC0xID8gMTAgOiBwYXR0ZXJuLmluZGV4T2YoYik7XG5cbiAgICAgICAgICAgIHJldHVybiBpbmRleEEgLSBpbmRleEI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b1N0cmluZzxUPihsOiBUW10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgb3V0ID0gJyc7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbCkge1xuICAgICAgICAgICAgb3V0ICs9IGl0ZW0udG9TdHJpbmcoKSArICcsICAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvSlNPTjxUPihsOiBUW10pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG1heGltdW08VD4obGlzdDogVFtdLCBwcmVkaWNhdGU6ICh0OiBUKSA9PiBudW1iZXIpOiBUIHtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc29sdXRpb246IGFueSAvKiogVE9ETyAjPz8/PyAqLyA9IG51bGw7XG4gICAgICAgIGxldCBtYXhWYWx1ZSA9IC1JbmZpbml0eTtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlID0gbGlzdFtpbmRleF07XG4gICAgICAgICAgICBpZiAoaXNCbGFuayhjYW5kaWRhdGUpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlVmFsdWUgPSBwcmVkaWNhdGUoY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGVWYWx1ZSA+IG1heFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc29sdXRpb24gPSBjYW5kaWRhdGU7XG4gICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBjYW5kaWRhdGVWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc29sdXRpb247XG4gICAgfVxuXG4gICAgc3RhdGljIGZsYXR0ZW48VD4obGlzdDogQXJyYXk8VCB8IFRbXT4pOiBUW10ge1xuICAgICAgICBsZXQgdGFyZ2V0OiBhbnlbXSA9IFtdO1xuICAgICAgICBfZmxhdHRlbkFycmF5KGxpc3QsIHRhcmdldCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgYWxsRWxlbWVudHNBcmVTdHJpbmdzPFQ+KGxpc3Q6IEFycmF5PFQgfCBUW10+KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB0YXJnZXQ6IGFueVtdID0gTGlzdFdyYXBwZXIuZmxhdHRlbihsaXN0KTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICghaXNTdHJpbmcoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkQWxsPFQ+KGxpc3Q6IEFycmF5PFQ+LCBzb3VyY2U6IEFycmF5PFQ+KTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goc291cmNlW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRvZG86IGNoZWNrIGlmIHRoaXMgaGFuZGxlcyBvYmplY3RzIHdpdGggY29udGFpbnNcbiAgICBzdGF0aWMgYWRkRWxlbWVudElmQWJzZW50PFQ+KGxpc3Q6IEFycmF5PFQ+LCBlbGVtZW50OiBUKTogdm9pZCB7XG5cbiAgICAgICAgbGV0IGNvbnRhaW5zID0gQ29sbGVjdGlvbnMuYXJyYXlzLmNvbnRhaW5zKGxpc3QsIGVsZW1lbnQsIChpdGVtMTogYW55LCBpdGVtMjogYW55KSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChpdGVtMVsnZXF1YWxzVG8nXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtMVsnZXF1YWxzVG8nXShpdGVtMik7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtMSA9PT0gaXRlbTI7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWNvbnRhaW5zKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBhZGRFbGVtZW50c0lmQWJzZW50PFQ+KGxpc3Q6IEFycmF5PFQ+LCBlbGVtZW50czogVFtdKTogdm9pZCB7XG5cblxuICAgICAgICBpZiAoaXNCbGFuayhlbGVtZW50cykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGVsZW0gb2YgZWxlbWVudHMpIHtcblxuICAgICAgICAgICAgbGV0IGNvbnRhaW5zID0gQ29sbGVjdGlvbnMuYXJyYXlzLmNvbnRhaW5zKGxpc3QsIGVsZW0sIChpdGVtMTogYW55LCBpdGVtMjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0xWydlcXVhbHNUbyddICYmIGl0ZW0yWydlcXVhbHNUbyddKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtMVsnZXF1YWxzVG8nXShpdGVtMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtMSA9PT0gaXRlbTI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY29udGFpbnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBjb3B5VmFsdWU8VD4odmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hcFdyYXBwZXIuY2xvbmUodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIuY2xvbmUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIF9mbGF0dGVuQXJyYXkoc291cmNlOiBhbnlbXSwgdGFyZ2V0OiBhbnlbXSk6IGFueVtdIHtcbiAgICBpZiAoaXNQcmVzZW50KHNvdXJjZSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc291cmNlW2ldO1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBfZmxhdHRlbkFycmF5KGl0ZW0sIHRhcmdldCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlzdExpa2VJdGVyYWJsZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNKc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSB8fFxuICAgICAgICAoIShvYmogaW5zdGFuY2VvZiBNYXApICYmICAgICAgLy8gSlMgTWFwIGFyZSBpdGVyYWJsZXMgYnV0IHJldHVybiBlbnRyaWVzIGFzIFtrLCB2XVxuICAgICAgICAgICAgZ2V0U3ltYm9sSXRlcmF0b3IoKSBpbiBvYmopOyAgLy8gSlMgSXRlcmFibGUgaGF2ZSBhIFN5bWJvbC5pdGVyYXRvciBwcm9wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmVJdGVyYWJsZXNFcXVhbChhOiBhbnksIGI6IGFueSwgY29tcGFyYXRvcjogRnVuY3Rpb24pOiBib29sZWFuIHtcbiAgICBsZXQgaXRlcmF0b3IxID0gYVtnZXRTeW1ib2xJdGVyYXRvcigpXSgpO1xuICAgIGxldCBpdGVyYXRvcjIgPSBiW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBsZXQgaXRlbTEgPSBpdGVyYXRvcjEubmV4dCgpO1xuICAgICAgICBsZXQgaXRlbTIgPSBpdGVyYXRvcjIubmV4dCgpO1xuICAgICAgICBpZiAoaXRlbTEuZG9uZSAmJiBpdGVtMi5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbTEuZG9uZSB8fCBpdGVtMi5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb21wYXJhdG9yKGl0ZW0xLnZhbHVlLCBpdGVtMi52YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGl0ZXJhdGVMaXN0TGlrZShvYmo6IGFueSwgZm46IEZ1bmN0aW9uKSB7XG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm4ob2JqW2ldKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBpdGVyYXRvciA9IG9ialtnZXRTeW1ib2xJdGVyYXRvcigpXSgpO1xuICAgICAgICBsZXQgaXRlbTogYW55IC8qKiBUT0RPICM/Pz8/ICovO1xuICAgICAgICB3aGlsZSAoISgoaXRlbSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkpIHtcbiAgICAgICAgICAgIGZuKGl0ZW0udmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTGFzdDxUPihhcnI6IFRbXSwgY29uZGl0aW9uOiAodmFsdWU6IFQpID0+IGJvb2xlYW4pOiBUIHwgbnVsbCB7XG4gICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoY29uZGl0aW9uKGFycltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbi8vIFNhZmFyaSBhbmQgSW50ZXJuZXQgRXhwbG9yZXIgZG8gbm90IHN1cHBvcnQgdGhlIGl0ZXJhYmxlIHBhcmFtZXRlciB0byB0aGVcbi8vIFNldCBjb25zdHJ1Y3Rvci4gIFdlIHdvcmsgYXJvdW5kIHRoYXQgYnkgbWFudWFsbHkgYWRkaW5nIHRoZSBpdGVtcy5cbmxldCBjcmVhdGVTZXRGcm9tTGlzdDogeyAobHN0OiBhbnlbXSk6IFNldDxhbnk+IH0gPSAoZnVuY3Rpb24gKCkge1xuICAgIGxldCB0ZXN0ID0gbmV3IFNldChbMSwgMiwgM10pO1xuICAgIGlmICh0ZXN0LnNpemUgPT09IDMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVNldEZyb21MaXN0SW5uZXIobHN0OiBhbnlbXSk6IFNldDxhbnk+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KGxzdCk7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVNldEFuZFBvcHVsYXRlRnJvbUxpc3QobHN0OiBhbnlbXSk6IFNldDxhbnk+IHtcbiAgICAgICAgICAgIGxldCByZXMgPSBuZXcgU2V0KGxzdCk7XG4gICAgICAgICAgICBpZiAocmVzLnNpemUgIT09IGxzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByZXMuYWRkKGxzdFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG4iXX0=