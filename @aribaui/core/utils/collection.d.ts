export declare const createMapFromMap: {
    (m: Map<any, any>): Map<any, any>;
};
export declare const _clearValues: {
    (m: Map<any, any>): void;
};
export declare class MapWrapper {
    static createEmpty<K, V>(): Map<K, V>;
    static clone<K, V>(m: Map<K, V>): Map<K, V>;
    static createFromStringMap<T>(stringMap: {
        [key: string]: T;
    }): Map<string, T>;
    static createFromAnyMap<T>(stringMap: {
        [key: string]: T;
    }): Map<any, T>;
    static createFromStringMapWithResolve<T>(stringMap: {
        [key: string]: T;
    }, resolve: (key: string, value: any) => any): Map<string, T>;
    static toStringMap<T>(m: Map<string, T>): {
        [key: string]: T;
    };
    static toAnyMap<T>(m: Map<any, T>): any;
    static toString(m: Map<string, any>, inner?: boolean): string;
    static clearValues(m: Map<any, any>): void;
    static iterable<T>(m: T): T;
    static mergeMapIntoMapWithObject(dest: Map<string, any>, source: Map<string, any>, overwriteMismatched: boolean): Map<string, any>;
    static convertListToMap(keys: string[]): Map<string, any>;
    static groupBy<K>(items: any, groupByKey: (item: K) => string): Map<string, any>;
}
/**
 * Wraps Javascript Objects
 */
export declare class StringMapWrapper {
    static create(): {
        [k: string]: any;
    };
    static contains(map: {
        [key: string]: any;
    }, key: string): boolean;
    static get<V>(map: {
        [key: string]: V;
    }, key: string): V;
    static set<V>(map: {
        [key: string]: V;
    }, key: string, value: V): void;
    static isEmpty(map: {
        [key: string]: any;
    }): boolean;
    static delete(map: {
        [key: string]: any;
    }, key: string): void;
    static forEach<K, V>(map: {
        [key: string]: V;
    }, callback: (v: V, K: string) => void): void;
    static merge<V>(m1: {
        [key: string]: V;
    }, m2: {
        [key: string]: V;
    }): {
        [key: string]: V;
    };
    static equals<V>(m1: {
        [key: string]: V;
    }, m2: {
        [key: string]: V;
    }): boolean;
}
/**
 * A boolean-valued function over a value, possibly including context information
 * regarding that value's position in an array.
 */
export interface Predicate<T> {
    (value: T, index?: number, array?: T[]): boolean;
}
export declare class ListWrapper {
    static createFixedSize(size: number): any[];
    static createGrowableSize(size: number): any[];
    static clone<T>(array: T[]): T[];
    static forEachWithIndex<T>(array: T[], fn: (t: T, n: number) => void): void;
    static first<T>(array: T[]): T;
    static last<T>(array: T[]): T;
    static indexOf<T>(array: T[], value: T, startIndex?: number): number;
    static contains<T>(list: T[], el: T): boolean;
    static containsAll<T>(list: T[], els: T[]): boolean;
    static containsComplex(list: Array<any>, item: any): boolean;
    static findIndexComplex(list: Array<any>, item: any): number;
    static removeIfExist(list: Array<any>, item: any): void;
    static reversed<T>(array: T[]): T[];
    static concat(a: any[], b: any[]): any[];
    static insert<T>(list: T[], index: number, value: T): void;
    static removeAt<T>(list: T[], index: number): T;
    static removeAll<T>(list: T[], items: T[]): void;
    static remove<T>(list: T[], el: T): boolean;
    static removeLast<T>(array: T[]): void;
    static clear(list: any[]): void;
    static isEmpty(list: any[]): boolean;
    static fill(list: any[], value: any, start?: number, end?: number): void;
    static equals(a: any[], b: any[]): boolean;
    static slice<T>(l: T[], from?: number, to?: number): T[];
    static splice<T>(l: T[], from: number, length: number): T[];
    static sort<T>(l: T[], compareFn?: (a: T, b: T) => number): void;
    static sortByExample(toSort: string[], pattern: string[]): void;
    static toString<T>(l: T[]): string;
    static toJSON<T>(l: T[]): string;
    static maximum<T>(list: T[], predicate: (t: T) => number): T;
    static flatten<T>(list: Array<T | T[]>): T[];
    static allElementsAreStrings<T>(list: Array<T | T[]>): boolean;
    static addAll<T>(list: Array<T>, source: Array<T>): void;
    static addElementIfAbsent<T>(list: Array<T>, element: T): void;
    static addElementsIfAbsent<T>(list: Array<T>, elements: T[]): void;
    static copyValue<T>(value: any): any;
}
export declare function isListLikeIterable(obj: any): boolean;
export declare function areIterablesEqual(a: any, b: any, comparator: Function): boolean;
export declare function iterateListLike(obj: any, fn: Function): void;
export declare function findLast<T>(arr: T[], condition: (value: T) => boolean): T | null;
