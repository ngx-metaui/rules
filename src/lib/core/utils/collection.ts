/**
 *
 * @original-license
 *
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 *
 *
 *  Credit: Derived and extended from https://github.com/angular/angular in order to have set of
 *  reusable globals. Since its not exported API need to have a copy under core.
 */
import * as Collections from 'typescript-collections';
import * as _ from 'lodash';
import {
    className,
    equals,
    getSymbolIterator,
    isArray,
    isBlank,
    isJsObject,
    isPresent,
    isString,
    StringJoiner
} from './lang';


export const createMapFromMap: { (m: Map<any, any>): Map<any, any> } = (function ()
{
    try {
        if (new Map(<any>new Map())) {
            return function createMapFromMapInner (m: Map<any, any>): Map<any, any>
            {
                return new Map(<any>m);
            };
        }
    } catch (e) {
    }
    return function createMapAndPopulateFromMap (m: Map<any, any>): Map<any, any>
    {
        let map = new Map();
        m.forEach((v, k) =>
        {
            map.set(k, v);
        });
        return map;
    };
})();
export const _clearValues: { (m: Map<any, any>): void } = (function ()
{
    if ((<any>(new Map()).keys()).next) {
        return function _clearValuesInner (m: Map<any, any>)
        {
            let keyIterator = m.keys();
            let k: any /** TODO #???? */;
            while (!((k = (<any>keyIterator).next()).done)) {
                m.set(k.value, null);
            }
        };
    } else {
        return function _clearValuesWithForeEach (m: Map<any, any>)
        {
            m.forEach((v, k) =>
            {
                m.set(k, null);
            });
        };
    }
})();

export class MapWrapper
{

    static createEmpty<K, V> (): Map<K, V>
    {
        return new Map<K, V>();
    }

    static clone<K, V> (m: Map<K, V>): Map<K, V>
    {
        try {
            if (new Map(<any>new Map())) {
                return new Map<K, V>(<any> m);
            }
        } catch (e) {
        }
        let map = new Map();
        m.forEach((v, k) =>
        {
            map.set(k, v);
        });
        return map;
    }

    static createFromStringMap<T> (stringMap: { [key: string]: T }): Map<string, T>
    {
        let result = new Map<string, T>();
        for (let key in stringMap) {
            result.set(key, stringMap[key]);
        }
        return result;
    }


    static createFromAnyMap<T> (stringMap: { [key: string]: T }): Map<any, T>
    {
        let result = new Map<any, T>();
        for (let key in stringMap) {
            result.set(key, stringMap[key]);
        }
        return result;
    }


    static createFromStringMapWithResolve<T> (stringMap: { [key: string]: T },
                                              resolve: (key: string,
                                                        value: any) => any): Map<string, T>
    {
        let result = new Map<string, T>();
        for (let key in stringMap) {
            let updatedValue = resolve(key, stringMap[key]);
            result.set(key, updatedValue);
        }
        return result;
    }

    static toStringMap<T> (m: Map<string, T>): { [key: string]: T }
    {
        let r: { [key: string]: T } = {};
        m.forEach((v, k) => r[k] = v);
        return r;
    }

    static toAnyMap<T> (m: Map<any, T>): any
    {
        let r = {};

        if (isPresent(m)) {
            m.forEach((v, k) => (<any>r)[k] = v);
        }
        return r;
    }


    static toString (m: Map<string, any>, inner: boolean = false): string
    {
        let sj = new StringJoiner(['']);
        if (!inner) {
            sj.add('{');
        }
        m.forEach((v, k) =>
        {

            if (v instanceof Map) {
                sj.add(MapWrapper.toString(v, true));

            } else {
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


    static clearValues (m: Map<any, any>)
    {
        _clearValues(m);
    }

    static iterable<T> (m: T): T
    {
        return m;
    }


    static mergeMapIntoMapWithObject (dest: Map<string, any>, source: Map<string, any>,
                                      overwriteMismatched: boolean): Map<string, any>
    {

        let keys = Array.from(source.keys());

        for (let key of keys) {
            let sourceValue = source.get(key);
            let destValue = dest.get(key);

            if (isBlank(destValue)) {
                dest.set(key, ListWrapper.copyValue(sourceValue));
                continue;
            } else if (destValue instanceof Map && sourceValue instanceof Map) {

                dest.set(key,
                    MapWrapper.mergeMapIntoMapWithObject(
                        MapWrapper.clone<string, any>(destValue),
                        sourceValue, overwriteMismatched)
                );
            } else if (destValue instanceof Map && isArray(sourceValue)) {

                if (ListWrapper.allElementsAreStrings(sourceValue)) {

                    dest.set(key, MapWrapper.mergeMapIntoMapWithObject(
                        MapWrapper.clone<string, any>(destValue),
                        MapWrapper.convertListToMap(sourceValue), overwriteMismatched)
                    );

                } else {
                    let sourceVect: string[] = ListWrapper.clone<any>(sourceValue);
                    ListWrapper.addElementIfAbsent<any>(sourceVect, destValue);
                    dest.set(key, sourceVect);
                }
            } else if (isArray(destValue) && sourceValue instanceof Map) {

                if (ListWrapper.allElementsAreStrings(destValue)) {
                    dest.set(key, MapWrapper.mergeMapIntoMapWithObject(
                        MapWrapper.convertListToMap(destValue),
                        sourceValue,
                        overwriteMismatched)
                    );
                } else {
                    // todo: can we really match this values with indexOf
                    ListWrapper.addElementIfAbsent<Map<string, any>>(destValue,
                        MapWrapper.clone<string, any>(
                            sourceValue)
                    );
                }
            } else if (destValue instanceof Map && isString(sourceValue)) {
                let destValueMap = MapWrapper.clone(destValue);

                if (isBlank(destValueMap.get(sourceValue))) {
                    destValue.set(sourceValue, MapWrapper.createEmpty());
                }
            } else if (isString(destValue) && sourceValue instanceof Map) {
                let sourceHash = MapWrapper.clone(sourceValue);
                if (isBlank(sourceHash.get(destValue))) {
                    sourceHash.set(destValue, MapWrapper.createEmpty());
                }
                dest.set(key, sourceHash);

            } else if (isArray(destValue) && isArray(sourceValue)) {
                dest.set(key, sourceValue);

            } else if (isArray(destValue) && isString(sourceValue)) {
                ListWrapper.addElementIfAbsent(destValue, sourceValue);

            } else if (isString(destValue) && isArray(sourceValue)) {
                let sourceVect: string[] = ListWrapper.clone<string>(sourceValue);

                ListWrapper.addElementIfAbsent(sourceVect, destValue);
                dest.set(key, sourceVect);

            } else if (isString(destValue) && isString(sourceValue)) {
                dest.set(key, sourceValue);

            } else if (overwriteMismatched) {
                dest.set(key, sourceValue);
            } else {
                let destClass = className(destValue);
                let sourceClass = className(sourceValue);

                if (destClass === sourceClass) {
                    dest.set(key, sourceValue);
                }
            }
        }
        return dest;
    }

    static convertListToMap (keys: string[]): Map<string, any>
    {
        let map = new Map<string, any>();
        for (let i = 0; i < keys.length; i++) {
            map.set(keys[i], MapWrapper.createEmpty<string, any>());
        }
        return map;
    }

    static groupBy<K> (items: any, groupBy: (item: K) => string): Map<string, any>
    {
        let result = _(items).groupBy((value: any) =>
        {
            return groupBy(value);
        }).value();

        let grouped: Map<string, any> = new Map<string, any>();
        _.keys(result).forEach((key) =>
        {
            grouped.set(key, result[key]);
        });
        return grouped;
    }
}

/**
 * Wraps Javascript Objects
 */
export class StringMapWrapper
{
    static create (): { [k: /*any*/ string]: any }
    {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    }

    static contains (map: { [key: string]: any }, key: string): boolean
    {
        return map.hasOwnProperty(key);
    }

    static get<V> (map: { [key: string]: V }, key: string): V
    {
        return map.hasOwnProperty(key) ? map[key] : undefined;
    }

    static set<V> (map: { [key: string]: V }, key: string, value: V)
    {
        map[key] = value;
    }


    static isEmpty (map: { [key: string]: any }): boolean
    {
        for (let prop in map) {
            return false;
        }
        return true;
    }

    static delete (map: { [key: string]: any }, key: string)
    {
        delete map[key];
    }

    static forEach<K, V> (map: { [key: string]: V }, callback: (v: V, K: string) => void)
    {
        for (let k of Object.keys(map)) {
            callback(map[k], k);
        }
    }

    static merge<V> (m1: { [key: string]: V }, m2: { [key: string]: V }): { [key: string]: V }
    {
        let m: { [key: string]: V } = {};

        for (let k of Object.keys(m1)) {
            m[k] = m1[k];
        }

        for (let k of Object.keys(m2)) {
            m[k] = m2[k];
        }

        return m;
    }

    static equals<V> (m1: { [key: string]: V }, m2: { [key: string]: V }): boolean
    {
        let k1 = Object.keys(m1);
        let k2 = Object.keys(m2);
        if (k1.length !== k2.length) {
            return false;
        }
        let key: any /** TODO #???? */;
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
 */
export interface Predicate<T>
{
    (value: T, index?: number, array?: T[]): boolean;
}

export class ListWrapper
{
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    static createFixedSize (size: number): any[]
    {
        return new Array(size);
    }

    static createGrowableSize (size: number): any[]
    {
        return new Array(size);
    }

    static clone<T> (array: T[]): T[]
    {
        return array.slice(0);
    }

    static forEachWithIndex<T> (array: T[], fn: (t: T, n: number) => void)
    {
        for (let i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    }

    static first<T> (array: T[]): T
    {
        if (!array) {
            return null;
        }
    }

    static last<T> (array: T[]): T
    {
        if (!array || array.length === 0) {
            return null;
        }
        return array[array.length - 1];
    }

    static indexOf<T> (array: T[], value: T, startIndex: number = 0): number
    {
        return array.indexOf(value, startIndex);
    }

    static contains<T> (list: T[], el: T): boolean
    {
        return list.indexOf(el) !== -1;
    }


    static containsAll<T> (list: T[], els: T[]): boolean
    {
        return els.map(function (needle)
        {
            return list.indexOf(needle);
        }).indexOf(-1) === -1;
    }

    static containsComplex (list: Array<any>, item: any): boolean
    {
        return list.findIndex(el =>
        {
            return equals(el, item);
        }) > -1;
    }

    static findIndexComplex (list: Array<any>, item: any): number
    {
        const index = list.findIndex(el =>
        {
            return equals(el, item);
        });

        return index;
    }


    static removeIfExist (list: Array<any>, item: any): void
    {
        let index: number = list.findIndex(el =>
        {
            return equals(el, item);
        });
        if (index !== -1) {
            ListWrapper.removeAt<any>(list, index);
        }
    }

    static reversed<T> (array: T[]): T[]
    {
        let a = ListWrapper.clone(array);
        return a.reverse();
    }

    static concat (a: any[], b: any[]): any[]
    {
        return a.concat(b);
    }

    static insert<T> (list: T[], index: number, value: T)
    {
        list.splice(index, 0, value);
    }

    static removeAt<T> (list: T[], index: number): T
    {
        let res = list[index];
        list.splice(index, 1);
        return res;
    }

    static removeAll<T> (list: T[], items: T[])
    {
        for (let i = 0; i < items.length; ++i) {
            let index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    }

    static remove<T> (list: T[], el: T): boolean
    {
        let index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    }

    static removeLast<T> (array: T[]): void
    {
        if (!array || array.length === 0) {
            return null;
        }
        array.splice(array.length - 1);
    }


    static clear (list: any[])
    {
        list.length = 0;
    }

    static isEmpty (list: any[]): boolean
    {
        return list.length === 0;
    }

    static fill (list: any[], value: any, start: number = 0, end: number = null)
    {
        list.fill(value, start, end === null ? list.length : end);
    }

    static equals (a: any[], b: any[]): boolean
    {
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

    static slice<T> (l: T[], from: number = 0, to: number = null): T[]
    {
        return l.slice(from, to === null ? undefined : to);
    }

    static splice<T> (l: T[], from: number, length: number): T[]
    {
        return l.splice(from, length);
    }

    static sort<T> (l: T[], compareFn?: (a: T, b: T) => number)
    {
        if (isPresent(compareFn)) {
            l.sort(compareFn);
        } else {
            l.sort();
        }
    }


    static sortByExample (toSort: string[], pattern: string[])
    {
        toSort.sort((a: string, b: string) =>
        {
            let indexA = pattern.indexOf(a) === -1 ? 10 : pattern.indexOf(a);
            let indexB = pattern.indexOf(b) === -1 ? 10 : pattern.indexOf(b);

            return indexA - indexB;
        });
    }

    static toString<T> (l: T[]): string
    {
        let out = '';
        for (let item of l) {
            out += item.toString() + ',  ';
        }
        return out;
    }

    static toJSON<T> (l: T[]): string
    {
        return JSON.stringify(l);
    }

    static maximum<T> (list: T[], predicate: (t: T) => number): T
    {
        if (list.length === 0) {
            return null;
        }
        let solution: any /** TODO #???? */ = null;
        let maxValue = -Infinity;
        for (let index = 0; index < list.length; index++) {
            let candidate = list[index];
            if (isBlank(candidate)) {
                continue;
            }
            let candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    }

    static flatten<T> (list: Array<T | T[]>): T[]
    {
        let target: any[] = [];
        _flattenArray(list, target);
        return target;
    }


    static allElementsAreStrings<T> (list: Array<T | T[]>): boolean
    {
        let target: any[] = ListWrapper.flatten(list);
        for (let element of target) {
            if (!isString(element)) {
                return false;
            }
        }

        return true;
    }

    static addAll<T> (list: Array<T>, source: Array<T>): void
    {
        for (let i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    }

    // todo: check if this handles objects with contains
    static addElementIfAbsent<T> (list: Array<T>, element: T): void
    {

        let contains = Collections.arrays.contains(list, element, (item1: any, item2: any) =>
        {

            if (item1['equalsTo']) {
                return item1['equalsTo'](item2);

            }
            return item1 === item2;
        });
        if (!contains) {
            list.push(element);
        }
    }


    static addElementsIfAbsent<T> (list: Array<T>, elements: T[]): void
    {


        if (isBlank(elements)) {
            return;
        }

        for (let elem of elements) {

            let contains = Collections.arrays.contains(list, elem, (item1: any, item2: any) =>
            {
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


    static copyValue<T> (value: any): any
    {
        if (value instanceof Map) {
            return MapWrapper.clone(value);
        } else if (isArray(value)) {
            return ListWrapper.clone(value);
        }

        return value;
    }


}

function _flattenArray (source: any[], target: any[]): any[]
{
    if (isPresent(source)) {
        for (let i = 0; i < source.length; i++) {
            let item = source[i];
            if (isArray(item)) {
                _flattenArray(item, target);
            } else {
                target.push(item);
            }
        }
    }
    return target;
}


export function isListLikeIterable (obj: any): boolean
{
    if (!isJsObject(obj)) {
        return false;
    }
    return isArray(obj) ||
        (!(obj instanceof Map) &&      // JS Map are iterables but return entries as [k, v]
            getSymbolIterator() in obj);  // JS Iterable have a Symbol.iterator prop
}

export function areIterablesEqual (a: any, b: any, comparator: Function): boolean
{
    let iterator1 = a[getSymbolIterator()]();
    let iterator2 = b[getSymbolIterator()]();

    while (true) {
        let item1 = iterator1.next();
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

export function iterateListLike (obj: any, fn: Function)
{
    if (isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    } else {
        let iterator = obj[getSymbolIterator()]();
        let item: any /** TODO #???? */;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}


export function findLast<T> (arr: T[], condition: (value: T) => boolean): T | null
{
    for (let i = arr.length - 1; i >= 0; i--) {
        if (condition(arr[i])) {
            return arr[i];
        }
    }
    return null;
}

// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
let createSetFromList: { (lst: any[]): Set<any> } = (function ()
{
    let test = new Set([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromListInner (lst: any[]): Set<any>
        {
            return new Set(lst);
        };
    } else {
        return function createSetAndPopulateFromList (lst: any[]): Set<any>
        {
            let res = new Set(lst);
            if (res.size !== lst.length) {
                for (let i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
})();

