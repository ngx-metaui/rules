export declare function readGlobalParam(varName: any): {
    [name: string]: any;
};
export declare function readGlobalType(varName: any): any;
export declare function getTypeNameForDebugging(type: any): string;
export declare function unimplemented(): any;
export declare function isPresent(obj: any): boolean;
export declare function isBlank(obj: any): boolean;
export declare function isBoolean(obj: any): boolean;
export declare function isNumber(obj: any): boolean;
export declare function isString(obj: any): obj is string;
export declare function isFunction(obj: any): boolean;
export declare function isType(obj: any): boolean;
export declare function isStringMap(obj: any): obj is Object;
export declare function isStrictStringMap(obj: any): boolean;
export declare function isPromise(obj: any): boolean;
export declare function isArray(obj: any): boolean;
export declare function isDate(obj: any): obj is Date;
export declare function isListLikeIterable(obj: any): boolean;
/**
 * Checks if `obj` is a window object.
 *
 */
export declare function isWindow(obj: any): boolean;
/**
 * Determines if a value is a regular expression object.
 *
 */
export declare function isRegExp(value: any): boolean;
export declare function noop(): void;
export declare function shiftLeft(a: number, b: number): number;
export declare function shiftRight(a: number, b: number): number;
export declare function stringify(token: any): string;
export declare function className(clazz: any): string;
/**
 *  Source: https://www.typescriptlang.org/docs/handbook/mixins.html
 *
 *  Function that copies properties of the baseCtors to derivedCtor.
 *  Can be used to achieve multiple inheritance.
 */
export declare function applyMixins(derivedCtor: any, baseCtors: any[]): void;
export declare class StringWrapper {
    static fromCharCode(code: number): string;
    static charCodeAt(s: string, index: number): number;
    static split(s: string, regExp: RegExp): string[];
    static equals(s: string, s2: string): boolean;
    static stripLeft(s: string, charVal: string): string;
    static stripRight(s: string, charVal: string): string;
    static replace(s: string, from: string, replace: string): string;
    static replaceAll(s: string, from: RegExp, replace: string): string;
    static slice<T>(s: string, from?: number, to?: number): string;
    static contains(s: string, substr: string): boolean;
    static compare(a: string, b: string): number;
    static endsWidth(subject: string, searchString: string, position?: number): boolean;
    static startsWidth(subject: string, searchString: string): boolean;
}
export declare class StringJoiner {
    parts: string[];
    constructor(parts?: string[]);
    add(part: string): StringJoiner;
    last(): string;
    toString(): string;
}
export declare class NumberWrapper {
    static toFixed(n: number, fractionDigits: number): string;
    static equal(a: number, b: number): boolean;
    static parseIntAutoRadix(text: string): number;
    static parseInt(text: string, radix: number): number;
    static parseFloat(text: string): number;
    static isNumeric(value: any): boolean;
    static isNaN(value: any): boolean;
    static isInteger(value: any): boolean;
}
export declare class FunctionWrapper {
    static apply(fn: Function, posArgs: any): any;
    static bind(fn: Function, scope: any): Function;
}
export declare function looseIdentical(a: any, b: any): boolean;
export declare function getMapKey<T>(value: T): T;
export declare function normalizeBlank(obj: Object): any;
export declare function normalizeBool(obj: boolean): boolean;
export declare function isJsObject(o: any): boolean;
export declare function print(obj: Error | Object): void;
export declare function warn(obj: Error | Object): void;
export declare function assert(condition: boolean, msg: string): void;
export declare function checksum(s: any): string;
export declare function crc32(crc: number, anInt: number): number;
export declare class Json {
    static parse(s: string): Object;
    static stringify(data: Object): string;
}
export declare class DateWrapper {
    static create(year: number, month?: number, day?: number, hour?: number, minutes?: number, seconds?: number, milliseconds?: number): Date;
    static fromISOString(str: string): Date;
    static fromMillis(ms: number): Date;
    static toMillis(date: Date): number;
    static now(): Date;
    static toJson(date: Date): string;
}
export declare class BooleanWrapper {
    static boleanValue(value?: any): boolean;
    static isFalse(value: any): boolean;
    static isTrue(value: any): boolean;
}
export declare function getSymbolIterator(): string | symbol;
export declare function evalExpression(expr: string, declarations: string, lets: {
    [key: string]: any;
}): any;
export declare function evalExpressionWithCntx(expr: string, declarations: string, lets: {
    [key: string]: any;
}, thisContext: any): any;
export declare function isPrimitive(obj: any): boolean;
export declare function hasConstructor(value: Object, type: any): boolean;
export declare function escape(s: string): string;
export declare function escapeRegExp(s: string): string;
export declare function hashCode(str: string): number;
/**
 *
 * Converts object to a name;
 *
 */
export declare function objectToName(target: any): string;
/**
 *
 * Basic function to generate UUID taken from W3C from one of the examples
 *
 */
export declare function uuid(): string;
/**
 * Check object equality derived from angular.equals 1.5 implementation
 *
 */
export declare function equals(o1: any, o2: any): boolean;
/**
 * transform a string into decamel. form. Mostly used when reading class names or field names
 * such firstName and we want to create a label First Name
 *
 *
 */
export declare function decamelize(string: string, separator?: string, initialCaps?: boolean): string;
export declare function nonPrivatePrefix(input: string): string;
/**
 *
 * This considers currently only 1 form which when we have getter we have this form for
 * declaration _<name> and get <name>(). I do not check any other forms now.
 *
 *
 */
export declare function hasGetter(instance: any, field: string): boolean;
/**
 * The Extensible interface can be implemented when a given class
 * wants to provide dynamically added fields.  Once this is implemented
 * to return a Map, the FieldValue system will be able to look in
 * the Map to see if the desired field exists.
 *
 *
 */
export declare abstract class Extensible {
    /**
     *  Returns the Map in which the dynamically added fields reside.
     *
     */
    extendedFields(): Map<string, any>;
}
