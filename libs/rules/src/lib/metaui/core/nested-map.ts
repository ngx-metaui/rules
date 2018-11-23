/**
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {isBlank, isPresent, unimplemented} from './utils/lang';

/**
 A map that masks on top of an (immutable) parent map
 */
export class NestedMap<K, V> implements Map<K, V> {
  static readonly _NullMarker: any = {nesnullmarker: true};

  [Symbol.toStringTag]: 'Map';

  _overrideCount: number = 0;
  private _size: number = 0;


  static toMapEntry(iteratorResult: IteratorResult<any>): MapEntry {
    const value = iteratorResult.value;

    if (isPresent(value) && NestedMap.isMapEntry(value)) {
      return value;
    }

    const entry: MapEntry = {

      key: (isPresent(
        iteratorResult.value)) ? iteratorResult.value[0] : iteratorResult.value,
      value: (isPresent(
        iteratorResult.value)) ? iteratorResult.value[1] : iteratorResult.value,
      hasNext: !iteratorResult.done
    };
    return entry;
  }

  static isMapEntry(value: any): value is MapEntry {
    return isPresent(value) && isPresent(value.hasNext);
  }

  static isNMNullMarker(value: any): boolean {
    return isPresent(value) && value['nesnullmarker'];
  }

  constructor(private _parent: Map<K, V>, private _map?: Map<K, any>) {

    if (isBlank(_map)) {
      this._map = new Map<K, any>();
    }
  }

  toMap(): Map<K, V> {
    return this._parent;
  }


  reparentedMap(newParent: Map<K, V>): NestedMap<K, V> {
    const newMap = new NestedMap<K, V>(newParent, this._map);
    newMap._overrideCount = this._overrideCount;
    return newMap;
  }


  get(key: K): any | V {
    const val = this._map.has(key) ? this._map.get(key) : this._parent.get(key);
    return NestedMap.isNMNullMarker(val) ? null : val;
  }


  keys(): IterableIterator<K> {
    return unimplemented();
  }


  values(): IterableIterator<V> {
    return unimplemented();
  }

  clear(): void {
    this._parent.clear();
    this._map.clear();
  }

  set(key: K, value?: V): any {
    const orig = this._map.get(key);

    if ((NestedMap.isNMNullMarker(orig) || isBlank(orig)) && this._parent.has(key)) {
      this._overrideCount += (NestedMap.isNMNullMarker(orig) ? -1 : 1);
    }

    this._map.set(key, value);

    return this;
  }


  delete(key: K): boolean {

    let returnVal = false;
    let orig: any = null;
    if (this._map.has(key)) {
      orig = this._map.delete(key);

      returnVal = true;
      // print('Removing: ' , orig);

      if (this._parent.has(key)) {
        this._map.set(key, NestedMap._NullMarker);
        // _overrideCount--;
        this._overrideCount++;
      }

    } else if (this._parent.has(key)) {
      // we're "removing" a value we don't have (but that our parent does)
      // we need to store a null override
      orig = this._parent.get(key);
      // print('Removing: ' , orig);
      this._map.set(key, NestedMap._NullMarker);
      this._overrideCount += 2;
    }
    return returnVal;
  }

  forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void {

    const entries = this.entries();

    let nextEntry: MapEntry;
    while ((nextEntry = NestedMap.toMapEntry(entries.next())) && nextEntry.hasNext) {
      callbackfn(nextEntry.value, nextEntry.key, this._parent);
    }
  }


  has(key: K): boolean {

    return this._map.has(key) ? (!NestedMap.isNMNullMarker(
      this._map.get(key))) : this._parent.has(key);
  }


  [Symbol.iterator](): IterableIterator<any> {
    return new NestedEntryIterator<K, V>(this);
  }


  entries(): IterableIterator<any> {
    return new NestedEntryIterator<K, V>(this);
  }


  get size(): number {
    return this._parent.size + this._map.size - this._overrideCount;
  }

  get map(): Map<K, Object> {
    return this._map;
  }

  get parent(): Map<K, V> {
    return this._parent;
  }


  toString(): string {
    return 'NestedMap';
  }
}

export interface MapEntry {
  value: any;
  key: any;
  hasNext: boolean;
}

class NestedEntryIterator<K, V> implements IterableIterator<MapEntry> {
  _parentIterator: IterableIterator<any>;
  _nestedIterator: IterableIterator<any>;
  _currentEntry: MapEntry;
  _nextEntry: MapEntry;
  _fromNested: boolean;


  _currentParentEntry: MapEntry;
  _currentNestedEntry: MapEntry;

  constructor(private _nestedMap: NestedMap<K, V>) {
    this._parentIterator = _nestedMap.parent.entries();
    this._nestedIterator = _nestedMap.map.entries();

    this.advanceToNext();
  }


  next(): IteratorResult<MapEntry> {
    // assert(isPresent(this._nextEntry) , 'next() when no more elements"');

    this._currentEntry = this._nextEntry;
    this.advanceToNext();

    const next: IteratorResult<MapEntry> = {
      value: this._currentEntry,
      done: !this._currentEntry.hasNext

    };
    return next;
  }


  [Symbol.iterator](): IterableIterator<MapEntry> {
    return this;
  }

  private advanceToNext() {
    this._fromNested = false;

    // Note: we need to skip nulls (masked values)

    while (!this._fromNested && (this._currentNestedEntry = NestedMap.toMapEntry(
      this._nestedIterator.next())) && this._currentNestedEntry.hasNext) {
      this._nextEntry = this._currentNestedEntry;
      if (!NestedMap.isNMNullMarker(this._nextEntry.value)) {
        this._fromNested = true;
      }
    }

    if (!this._fromNested) {
      while ((this._currentParentEntry = NestedMap.toMapEntry(
        this._parentIterator.next())) && this._currentParentEntry.hasNext) {
        this._nextEntry = this._currentParentEntry;

        if (!this._nestedMap.map.has(this._nextEntry.key)) {
          return;
        }
      }

      this._nextEntry = this._currentParentEntry;
    }


  }

}

