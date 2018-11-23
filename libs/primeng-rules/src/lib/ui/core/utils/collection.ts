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
import {equals, isPresent, StringJoiner} from './lang';


export class MapWrapper {


  static clone<K, V>(m: Map<K, V>): Map<K, V> {
    try {
      if (new Map(<any>new Map())) {
        return new Map<K, V>(<any> m);
      }
    } catch (e) {
    }
    const map = new Map();
    m.forEach((v, k) => {
      map.set(k, v);
    });
    return map;
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
}

export class ListWrapper {


  static clone<T>(array: T[]): T[] {
    return array.slice(0);
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

  static containsComplex(list: Array<any>, item: any): boolean {
    return list.findIndex(el => {
      return equals(el, item);
    }) > -1;
  }


  static removeIfExist(list: Array<any>, item: any): void {
    const index: number = list.findIndex(el => {
      return equals(el, item);
    });
    if (index !== -1) {
      ListWrapper.removeAt<any>(list, index);
    }
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

  static removeLast<T>(array: T[]): void {
    if (!array || array.length === 0) {
      return null;
    }
    array.splice(array.length - 1);
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


  static addAll<T>(list: Array<T>, source: Array<T>): void {
    for (let i = 0; i < source.length; i++) {
      list.push(source[i]);
    }
  }


}


