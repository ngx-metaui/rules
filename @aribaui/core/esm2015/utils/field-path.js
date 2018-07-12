/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as objectPath from 'object-path';
import { isBlank, isString, isStringMap } from './lang';
/**
 * The FieldPath is utility class for representing of a dotted fieldPath.
 *
 * A String such as "foo.bar.baz" can be used to access a value on a target object.
 *
 */
export class FieldPath {
    /**
     * @param {?} _path
     */
    constructor(_path) {
        this._path = _path;
        this._fieldPaths = isBlank(_path) ? [] : _path.split('.');
        this.objectPathInstance = (/** @type {?} */ (objectPath))['create']({ includeInheritedProps: true });
    }
    /**
     *
     * Sets a value to target objects
     *
     * @param {?} target
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    static setFieldValue(target, field, value) {
        let /** @type {?} */ fp = new FieldPath(field);
        fp.setFieldValue(target, value);
    }
    /**
     * Reads a value from target objects
     * @param {?} target
     * @param {?} field
     * @return {?}
     */
    static getFieldValue(target, field) {
        let /** @type {?} */ fp = new FieldPath(field);
        let /** @type {?} */ value = fp.getFieldValue(target);
        if (field === '$toString') {
            return value();
        }
        return value;
    }
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
     * @param {?} target
     * @param {?} value
     * @return {?}
     */
    setFieldValue(target, value) {
        // implement the same thing what we have on the get, if Map set field into map
        if (this._fieldPaths.length > 1 && !(target instanceof Map)) {
            let /** @type {?} */ path = this._fieldPaths.slice(0, this._fieldPaths.length - 1).join('.');
            let /** @type {?} */ objectToBeUpdated = this.objectPathInstance.get(target, path);
            if (objectToBeUpdated instanceof Map) {
                objectToBeUpdated.set(this._fieldPaths[this._fieldPaths.length - 1], value);
            }
            else {
                this.objectPathInstance.set(target, this._path, value);
            }
        }
        if (target instanceof Map) {
            let /** @type {?} */ mapTarget = target;
            // handle Nested Map
            if (this._fieldPaths.length > 1) {
                let /** @type {?} */ path = this._fieldPaths.splice(0, 1);
                let /** @type {?} */ nestedMap = mapTarget.get(path[0]);
                if (isBlank(nestedMap)) {
                    nestedMap = new Map();
                    mapTarget.set(path[0], nestedMap);
                }
                this.setFieldValue(nestedMap, value);
            }
            else {
                target.set(this._fieldPaths[0], value);
            }
        }
        else {
            this.objectPathInstance.set(target, this._path, value);
        }
    }
    /**
     * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
     * as ready value from Maps.
     *
     * todo: this is quick and dirty implementation - need to write better solution
     * @param {?} target
     * @return {?}
     */
    getFieldValue(target) {
        let /** @type {?} */ value;
        for (let /** @type {?} */ i = 0; i < this._fieldPaths.length; i++) {
            if ((isStringMap(target) || isString(target)) && !(target instanceof Map)) {
                value = this.objectPathInstance.get(target, this._fieldPaths[i]);
                target = value;
            }
            else if (target instanceof Map) {
                let /** @type {?} */ targetMap = target;
                value = targetMap.get(this._fieldPaths[i]);
            }
            // just tweak to be able to access maps field.someMapField.mapKey
            // I want this to get the element from the map
            if (value instanceof Map && (i + 1) < this._fieldPaths.length) {
                let /** @type {?} */ mapValue = /** @type {?} */ (value);
                return mapValue.get(this._fieldPaths[i + 1]);
            }
        }
        return value;
    }
    /**
     * @return {?}
     */
    get path() {
        return this._path;
    }
    /**
     * @return {?}
     */
    toString() {
        return this._path;
    }
}
function FieldPath_tsickle_Closure_declarations() {
    /** @type {?} */
    FieldPath.prototype._fieldPaths;
    /** @type {?} */
    FieldPath.prototype.objectPathInstance;
    /** @type {?} */
    FieldPath.prototype._path;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcGF0aC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9maWVsZC1wYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxLQUFLLFVBQVUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7O0FBU3RELE1BQU07Ozs7SUErQkYsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFFN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsbUJBQU0sVUFBVSxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxxQkFBcUIsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQ3hGOzs7Ozs7Ozs7O0lBekJELE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBVyxFQUFFLEtBQWEsRUFBRSxLQUFVO1FBRXZELHFCQUFJLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNuQzs7Ozs7OztJQU1ELE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBVyxFQUFFLEtBQWE7UUFFM0MscUJBQUksRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLHFCQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0s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TSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNsQjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDL0IscUJBQUksU0FBUyxHQUFxQixNQUFNLENBQUM7Z0JBQ3pDLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5Qzs7O1lBSUQsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzVELHFCQUFJLFFBQVEscUJBQXNCLEtBQUssQ0FBQSxDQUFDO2dCQUN4QyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0o7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCOzs7O0lBR0QsSUFBSSxJQUFJO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDckI7Ozs7SUFFRCxRQUFRO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDckI7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0ICogYXMgb2JqZWN0UGF0aCBmcm9tICdvYmplY3QtcGF0aCc7XG5pbXBvcnQge2lzQmxhbmssIGlzU3RyaW5nLCBpc1N0cmluZ01hcH0gZnJvbSAnLi9sYW5nJztcblxuXG4vKipcbiAqIFRoZSBGaWVsZFBhdGggaXMgdXRpbGl0eSBjbGFzcyBmb3IgcmVwcmVzZW50aW5nIG9mIGEgZG90dGVkIGZpZWxkUGF0aC5cbiAqXG4gKiBBIFN0cmluZyBzdWNoIGFzIFwiZm9vLmJhci5iYXpcIiBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgYSB2YWx1ZSBvbiBhIHRhcmdldCBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRmllbGRQYXRoXG57XG4gICAgX2ZpZWxkUGF0aHM6IHN0cmluZ1tdO1xuICAgIHByaXZhdGUgb2JqZWN0UGF0aEluc3RhbmNlOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNldHMgYSB2YWx1ZSB0byB0YXJnZXQgb2JqZWN0c1xuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHNldEZpZWxkVmFsdWUodGFyZ2V0OiBhbnksIGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgZnAgPSBuZXcgRmllbGRQYXRoKGZpZWxkKTtcbiAgICAgICAgZnAuc2V0RmllbGRWYWx1ZSh0YXJnZXQsIHZhbHVlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlYWRzIGEgdmFsdWUgZnJvbSB0YXJnZXQgb2JqZWN0c1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRGaWVsZFZhbHVlKHRhcmdldDogYW55LCBmaWVsZDogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICBsZXQgZnAgPSBuZXcgRmllbGRQYXRoKGZpZWxkKTtcbiAgICAgICAgbGV0IHZhbHVlID0gZnAuZ2V0RmllbGRWYWx1ZSh0YXJnZXQpO1xuXG4gICAgICAgIGlmIChmaWVsZCA9PT0gJyR0b1N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYXRoOiBzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLl9maWVsZFBhdGhzID0gaXNCbGFuayhfcGF0aCkgPyBbXSA6IF9wYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgIHRoaXMub2JqZWN0UGF0aEluc3RhbmNlID0gKDxhbnk+b2JqZWN0UGF0aClbJ2NyZWF0ZSddKHtpbmNsdWRlSW5oZXJpdGVkUHJvcHM6IHRydWV9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgT25lIG9mIHRoZSBtYWluIHJlYXNvbiB3aHkgSSBoYXZlIHRoaXMgaXMgbm90IG9ubHkgdG8gaXRlcmF0ZSB0aHJ1IGRvdHRlZCBmaWVsZCBwYXRoIGJ1dFxuICAgICAqIG1haW5seSB0byBiZSBhYmxlIHRvIHNldCBuYXR1cmFsbHkgdmFsdWUgaW50byBhIG5lc3RlZCBtYXBzIGxpa2UgOlxuICAgICAqXG4gICAgICogIGZpZWxkTmFtZS5maWVsZE5hbWVNYXAuZmllbGRLZXkgPT4gaXQgd2lsbCBhY2Nlc3MgZmllbGROYW1lIG9uIHRoZSB0YXJnZXQsIGZyb20gdGhlcmUgaXRcbiAgICAgKiByZWFkcyBGaWVsZE5hbWVNYXAgc2luY2UgZmllbGROYW1lIG5lc3RlZCBvYmplY3RzIGFuZCBzZXRzIGEgbmV3IHZhbHVlIGlkZW50aWZpZWQgYnkgTWFwIGtleVxuICAgICAqIGZpZWxkS2V5XG4gICAgICpcbiAgICAgKiAgYGBgXG4gICAgICogIGNsYXNzIE15Q2xhc3Mge1xuICAgICAqICAgICAgZmllbGROYW1lOk5lc3RlZE9iamVjdFxuICAgICAqXG4gICAgICogIH1cbiAgICAgKlxuICAgICAqICBjbGFzcyBOZXN0ZWRPYmplY3Qge1xuICAgICAqICAgICAgZmllbGROYW1lTWFwOk1hcDxrZXksIHZhbHVlPjtcbiAgICAgKiAgfVxuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqIHVzZSBmaWVsZCB2YWx1ZSBmb3IgYXNzaWdubWVudCBzbyBrZXlzIG9mIGZvcm0gXCJhLmIuY1wiIHdpbGwgZ28gaW4gbmVzdGVkIE1hcHNcbiAgICAgKi9cbiAgICBzZXRGaWVsZFZhbHVlKHRhcmdldDogYW55LCB2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gaW1wbGVtZW50IHRoZSBzYW1lIHRoaW5nIHdoYXQgd2UgaGF2ZSBvbiB0aGUgZ2V0LCBpZiBNYXAgc2V0IGZpZWxkIGludG8gbWFwXG4gICAgICAgIGlmICh0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCA+IDEgJiYgISh0YXJnZXQgaW5zdGFuY2VvZiBNYXApKSB7XG5cbiAgICAgICAgICAgIGxldCBwYXRoID0gdGhpcy5fZmllbGRQYXRocy5zbGljZSgwLCB0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCAtIDEpLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGxldCBvYmplY3RUb0JlVXBkYXRlZCA9IHRoaXMub2JqZWN0UGF0aEluc3RhbmNlLmdldCh0YXJnZXQsIHBhdGgpO1xuICAgICAgICAgICAgaWYgKG9iamVjdFRvQmVVcGRhdGVkIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VG9CZVVwZGF0ZWQuc2V0KHRoaXMuX2ZpZWxkUGF0aHNbdGhpcy5fZmllbGRQYXRocy5sZW5ndGggLSAxXSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZS5zZXQodGFyZ2V0LCB0aGlzLl9wYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICBsZXQgbWFwVGFyZ2V0OiBNYXA8c3RyaW5nLCBhbnk+ID0gdGFyZ2V0O1xuICAgICAgICAgICAgLy8gaGFuZGxlIE5lc3RlZCBNYXBcbiAgICAgICAgICAgIGlmICh0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IHRoaXMuX2ZpZWxkUGF0aHMuc3BsaWNlKDAsIDEpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5lc3RlZE1hcDogTWFwPHN0cmluZywgYW55PiA9IG1hcFRhcmdldC5nZXQocGF0aFswXSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsobmVzdGVkTWFwKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXN0ZWRNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICAgICAgICAgICAgICBtYXBUYXJnZXQuc2V0KHBhdGhbMF0sIG5lc3RlZE1hcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRWYWx1ZShuZXN0ZWRNYXAsIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldCh0aGlzLl9maWVsZFBhdGhzWzBdLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZS5zZXQodGFyZ2V0LCB0aGlzLl9wYXRoLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSByZWFzb24gYXMgZm9yIFNldEZpZWxkVmFsdWUuIE5lZWQgdG8gYmUgYWJsZSB0byByZWFkIHZhbHVlIGJ5IGRvdHRlZCBwYXRoIGFzIHdlbGxcbiAgICAgKiBhcyByZWFkeSB2YWx1ZSBmcm9tIE1hcHMuXG4gICAgICpcbiAgICAgKiB0b2RvOiB0aGlzIGlzIHF1aWNrIGFuZCBkaXJ0eSBpbXBsZW1lbnRhdGlvbiAtIG5lZWQgdG8gd3JpdGUgYmV0dGVyIHNvbHV0aW9uXG4gICAgICovXG4gICAgZ2V0RmllbGRWYWx1ZSh0YXJnZXQ6IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IHZhbHVlOiBhbnk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZmllbGRQYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKChpc1N0cmluZ01hcCh0YXJnZXQpIHx8IGlzU3RyaW5nKHRhcmdldCkpICYmICEodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5vYmplY3RQYXRoSW5zdGFuY2UuZ2V0KHRhcmdldCwgdGhpcy5fZmllbGRQYXRoc1tpXSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXRNYXAuZ2V0KHRoaXMuX2ZpZWxkUGF0aHNbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBqdXN0IHR3ZWFrIHRvIGJlIGFibGUgdG8gYWNjZXNzIG1hcHMgZmllbGQuc29tZU1hcEZpZWxkLm1hcEtleVxuICAgICAgICAgICAgLy8gSSB3YW50IHRoaXMgdG8gZ2V0IHRoZSBlbGVtZW50IGZyb20gdGhlIG1hcFxuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTWFwICYmIChpICsgMSkgPCB0aGlzLl9maWVsZFBhdGhzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBtYXBWYWx1ZSA9IDxNYXA8c3RyaW5nLCBhbnk+PiB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwVmFsdWUuZ2V0KHRoaXMuX2ZpZWxkUGF0aHNbaSArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBnZXQgcGF0aCgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gICAgfVxuXG59XG5cbiJdfQ==