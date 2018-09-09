/**
 * The FieldPath is utility class for representing of a dotted fieldPath.
 *
 * A String such as "foo.bar.baz" can be used to access a value on a target object.
 *
 */
export declare class FieldPath {
    private _path;
    _fieldPaths: string[];
    private objectPathInstance;
    /**
     *
     * Sets a value to target objects
     *
     */
    static setFieldValue(target: any, field: string, value: any): void;
    /**
     * Reads a value from target objects
     */
    static getFieldValue(target: any, field: string): any;
    constructor(_path: string);
    /**
     *  One of the main reason why I have this is not only to iterate thru dotted field path but
     * mainly to be able to set naturally value into a nested maps like :
     *
     *  fieldName.fieldNameMap.fieldKey => it will access fieldName on the target, from there it
     * reads FieldNameMap since fieldName nested objects and sets a new value identified by Map key
     * fieldKey
     *
     *  ```
     *  class MyClass {
     *      fieldName:NestedObject
     *
     *  }
     *
     *  class NestedObject {
     *      fieldNameMap:Map<key, value>;
     *  }
     *
     *  ```
     * use field value for assignment so keys of form "a.b.c" will go in nested Maps
     */
    setFieldValue(target: any, value: any): void;
    /**
     * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
     * as ready value from Maps.
     *
     * todo: this is quick and dirty implementation - need to write better solution
     */
    getFieldValue(target: any): any;
    readonly path: string;
    toString(): string;
}
