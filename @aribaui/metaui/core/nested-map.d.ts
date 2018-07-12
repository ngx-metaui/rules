/**
 A map that masks on top of an (immutable) parent map
 */
export declare class NestedMap<K, V> implements Map<K, V> {
    private _parent;
    private _map;
    static readonly _NullMarker: any;
    [Symbol.toStringTag]: 'Map';
    _overrideCount: number;
    private _size;
    static toMapEntry(iteratorResult: IteratorResult<any>): MapEntry;
    static isMapEntry(value: any): value is MapEntry;
    static isNMNullMarker(value: any): boolean;
    constructor(_parent: Map<K, V>, _map?: Map<K, any>);
    toMap(): Map<K, V>;
    reparentedMap(newParent: Map<K, V>): NestedMap<K, V>;
    get(key: K): any | V;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    clear(): void;
    set(key: K, value?: V): any;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    has(key: K): boolean;
    [Symbol.iterator](): IterableIterator<any>;
    entries(): IterableIterator<any>;
    readonly size: number;
    readonly map: Map<K, Object>;
    readonly parent: Map<K, V>;
    toString(): string;
}
export interface MapEntry {
    value: any;
    key: any;
    hasNext: boolean;
}
