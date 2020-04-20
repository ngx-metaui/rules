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
import {className, isArray, isBlank, isPresent, isString, StringJoiner} from './lang';


export class MapWrapper {

  static createEmpty<K, V>(): Map<K, V> {
    return new Map<K, V>();
  }

  static clone<K, V>(m: Map<K, V>): Map<K, V> {
    try {
      if (new Map(<any>new Map())) {
        return new Map<K, V>(<any>m);
      }
    } catch (e) {
    }
    const map = new Map();
    m.forEach((v, k) => {
      map.set(k, v);
    });
    return map;
  }

  static createFromStringMap<T>(stringMap: { [p: string]: any } | Map<string, any>):
    Map<string, T> {
    const result = new Map<string, T>();
    for (const key in stringMap) {
      result.set(key, stringMap[key]);
    }
    return result;
  }


  static createFromStringMapWithResolve<T>(stringMap: { [p: string]: any } | Map<string, any>,
                                           resolve: (key: string,
                                                     value: any) => any): Map<string, T> {
    const result = new Map<string, T>();
    for (const key in stringMap) {
      const updatedValue = resolve(key, stringMap[key]);
      result.set(key, updatedValue);
    }
    return result;
  }

  static toString(m: Map<string, any>, inner: boolean = false): string {
    const sj = new StringJoiner(['']);
    if (!inner) {
      sj.add('{');
    }
    m.forEach((v, k) => {

      if (v instanceof Map) {
        sj.add(MapWrapper.toString(v, true));

      } else {
        const sValue = <string>v;
        sj.add(k);
        sj.add('=');
        sj.add(sValue);
      }
      sj.add(', ');
    });

    if (!inner) {
      sj.add('} ');
    }
    return sj.toString();
  }


  static iterable<T>(m: T): T {
    return m;
  }


  static mergeMapIntoMapWithObject(dest: Map<string, any>, source: Map<string, any>,
                                   overwriteMismatched: boolean): Map<string, any> {

    const keys = Array.from(source.keys());

    for (const key of keys) {
      const sourceValue = source.get(key);
      const destValue = dest.get(key);

      if (isBlank(destValue)) {
        dest.set(key, ListWrapper.copyValue(sourceValue));

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
          const sourceVect: any[] = ListWrapper.clone<any>(sourceValue);
          ListWrapper.addElementIfAbsent<any>(sourceVect, destValue);
          dest.set(key, sourceVect);
        }
      } else if (isArray(destValue) && sourceValue instanceof Map) {

        if (ListWrapper.allElementsAreStrings(<any[]>destValue)) {
          dest.set(key, MapWrapper.mergeMapIntoMapWithObject(
            MapWrapper.convertListToMap(<string[]>destValue), sourceValue, overwriteMismatched)
          );
        } else {
          // todo: can we really match this values with indexOf
          ListWrapper.addElementIfAbsent<Map<string, any>>(<Map<string, any>[]>destValue,
            MapWrapper.clone<string, any>(sourceValue));
        }
      } else if (destValue instanceof Map && isString(sourceValue)) {
        const destValueMap = MapWrapper.clone(destValue);

        if (isBlank(destValueMap.get(sourceValue))) {
          destValue.set(sourceValue, MapWrapper.createEmpty());
        }
      } else if (isString(destValue) && sourceValue instanceof Map) {
        const sourceHash = MapWrapper.clone(sourceValue);
        if (isBlank(sourceHash.get(destValue))) {
          sourceHash.set(destValue, MapWrapper.createEmpty());
        }
        dest.set(key, sourceHash);

      } else if (isArray(destValue) && isArray(sourceValue)) {
        dest.set(key, sourceValue);

      } else if (isArray(destValue) && isString(sourceValue)) {
        ListWrapper.addElementIfAbsent(<any>destValue, sourceValue);

      } else if (isString(destValue) && isArray(sourceValue)) {
        const sourceVect: string[] = ListWrapper.clone<string>(sourceValue);

        ListWrapper.addElementIfAbsent(sourceVect, destValue);
        dest.set(key, sourceVect);

      } else if (isString(destValue) && isString(sourceValue)) {
        dest.set(key, sourceValue);

      } else if (overwriteMismatched) {
        dest.set(key, sourceValue);
      } else {
        const destClass = className(destValue);
        const sourceClass = className(sourceValue);

        if (destClass === sourceClass) {
          dest.set(key, sourceValue);
        }
      }
    }
    return dest;
  }

  static convertListToMap(keys: string[]): Map<string, any> {
    const map = new Map<string, any>();
    for (let i = 0; i < keys.length; i++) {
      map.set(keys[i], MapWrapper.createEmpty<string, any>());
    }
    return map;
  }

  static groupBy<K>(items: any, groupByKey: (item: K) => string): Map<string, any> {
    const result = items.reduce((groupResult: any, currentValue: any) => {

      const gKey = groupByKey(currentValue);
      (groupResult[gKey] = groupResult[gKey] || []).push(currentValue);
      return groupResult;
    }, {});


    const grouped: Map<string, any> = new Map<string, any>();
    Object.keys(result).forEach((key) => {
      grouped.set(key, result[key]);
    });
    return grouped;
  }
}

export class ListWrapper {

  static clone<T>(array: T[]): T[] {
    return array.slice(0);
  }

  static forEachWithIndex<T>(array: T[], fn: (t: T, n: number) => void) {
    for (let i = 0; i < array.length; i++) {
      fn(array[i], i);
    }
  }

  static first<T>(array: T[]): T {
    if (!array) {
      return null;
    }
  }

  static last<T>(array: T[]): T {
    if (!array || array.length === 0) {
      return null;
    }
    return array[array.length - 1];
  }

  static indexOf<T>(array: T[], value: T, startIndex: number = 0): number {
    return array.indexOf(value, startIndex);
  }

  static contains<T>(list: T[], el: T): boolean {
    return list.indexOf(el) !== -1;
  }


  static containsAll<T>(list: T[], els: T[]): boolean {
    return els.map(function (needle) {
      return list.indexOf(needle);
    }).indexOf(-1) === -1;
  }

  static concat(a: any[], b: any[]): any[] {
    return a.concat(b);
  }

  static insert<T>(list: T[], index: number, value: T) {
    list.splice(index, 0, value);
  }

  static removeAt<T>(list: T[], index: number): T {
    const res = list[index];
    list.splice(index, 1);
    return res;
  }


  static remove<T>(list: T[], el: T): boolean {
    const index = list.indexOf(el);
    if (index > -1) {
      list.splice(index, 1);
      return true;
    }
    return false;
  }


  static clear(list: any[]) {
    list.length = 0;
  }

  static isEmpty(list: any[]): boolean {
    return list.length === 0;
  }

  static fill(list: any[], value: any, start: number = 0, end: number = null) {
    list.fill(value, start, end === null ? list.length : end);
  }

  static equals(a: any[], b: any[]): boolean {
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

  static slice<T>(l: T[], from: number = 0, to: number = null): T[] {
    return l.slice(from, to === null ? undefined : to);
  }

  static sort<T>(l: T[], compareFn?: (a: T, b: T) => number) {
    if (isPresent(compareFn)) {
      l.sort(compareFn);
    } else {
      l.sort();
    }
  }


  static sortByExample(toSort: string[], pattern: string[]) {
    toSort.sort((a: string, b: string) => {
      const indexA = pattern.indexOf(a) === -1 ? 10 : pattern.indexOf(a);
      const indexB = pattern.indexOf(b) === -1 ? 10 : pattern.indexOf(b);

      return indexA - indexB;
    });
  }

  static toString<T>(l: T[]): string {
    let out = '';
    for (const item of l) {
      out += item.toString() + ',  ';
    }
    return out;
  }

  static flatten<T>(list: Array<T | T[]>): T[] {
    const target: any[] = [];
    _flattenArray(list, target);
    return target;
  }


  static allElementsAreStrings<T>(list: Array<T | T[]>): boolean {
    const target: any[] = ListWrapper.flatten(list);
    for (const element of target) {
      if (!isString(element)) {
        return false;
      }
    }

    return true;
  }

  static addAll<T>(list: Array<T>, source: Array<T>): void {
    for (let i = 0; i < source.length; i++) {
      list.push(source[i]);
    }
  }

  // todo: check if this handles objects with contains
  static addElementIfAbsent<T>(list: Array<T>, element: T): void {

    const contains = Collections.arrays.contains(list, element, (item1: any, item2: any) => {

      if (item1['equalsTo']) {
        return item1['equalsTo'](item2);

      }
      return item1 === item2;
    });
    if (!contains) {
      list.push(element);
    }
  }


  static addElementsIfAbsent<T>(list: Array<T>, elements: T[]): void {


    if (isBlank(elements)) {
      return;
    }

    for (const elem of elements) {

      const contains = Collections.arrays.contains(list, elem, (item1: any, item2: any) => {
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


  static copyValue<T>(value: any): any {
    if (value instanceof Map) {
      return MapWrapper.clone(value);
    } else if (isArray(value)) {
      return ListWrapper.clone<any>(<any>value);
    }

    return value;
  }


}

function _flattenArray(source: any[], target: any[]): any[] {
  if (isPresent(source)) {
    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      if (isArray(item)) {
        _flattenArray(item, target);
      } else {
        target.push(item);
      }
    }
  }
  return target;
}




