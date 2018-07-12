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
var /**
 * The FieldPath is utility class for representing of a dotted fieldPath.
 *
 * A String such as "foo.bar.baz" can be used to access a value on a target object.
 *
 */
FieldPath = /** @class */ (function () {
    function FieldPath(_path) {
        this._path = _path;
        this._fieldPaths = isBlank(_path) ? [] : _path.split('.');
        this.objectPathInstance = (/** @type {?} */ (objectPath))['create']({ includeInheritedProps: true });
    }
    /**
     *
     * Sets a value to target objects
     *
     */
    /**
     *
     * Sets a value to target objects
     *
     * @param {?} target
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    FieldPath.setFieldValue = /**
     *
     * Sets a value to target objects
     *
     * @param {?} target
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    function (target, field, value) {
        var /** @type {?} */ fp = new FieldPath(field);
        fp.setFieldValue(target, value);
    };
    /**
     * Reads a value from target objects
     */
    /**
     * Reads a value from target objects
     * @param {?} target
     * @param {?} field
     * @return {?}
     */
    FieldPath.getFieldValue = /**
     * Reads a value from target objects
     * @param {?} target
     * @param {?} field
     * @return {?}
     */
    function (target, field) {
        var /** @type {?} */ fp = new FieldPath(field);
        var /** @type {?} */ value = fp.getFieldValue(target);
        if (field === '$toString') {
            return value();
        }
        return value;
    };
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
    FieldPath.prototype.setFieldValue = /**
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
    function (target, value) {
        // implement the same thing what we have on the get, if Map set field into map
        if (this._fieldPaths.length > 1 && !(target instanceof Map)) {
            var /** @type {?} */ path = this._fieldPaths.slice(0, this._fieldPaths.length - 1).join('.');
            var /** @type {?} */ objectToBeUpdated = this.objectPathInstance.get(target, path);
            if (objectToBeUpdated instanceof Map) {
                objectToBeUpdated.set(this._fieldPaths[this._fieldPaths.length - 1], value);
            }
            else {
                this.objectPathInstance.set(target, this._path, value);
            }
        }
        if (target instanceof Map) {
            var /** @type {?} */ mapTarget = target;
            // handle Nested Map
            if (this._fieldPaths.length > 1) {
                var /** @type {?} */ path = this._fieldPaths.splice(0, 1);
                var /** @type {?} */ nestedMap = mapTarget.get(path[0]);
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
    };
    /**
     * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
     * as ready value from Maps.
     *
     * todo: this is quick and dirty implementation - need to write better solution
     */
    /**
     * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
     * as ready value from Maps.
     *
     * todo: this is quick and dirty implementation - need to write better solution
     * @param {?} target
     * @return {?}
     */
    FieldPath.prototype.getFieldValue = /**
     * The same reason as for SetFieldValue. Need to be able to read value by dotted path as well
     * as ready value from Maps.
     *
     * todo: this is quick and dirty implementation - need to write better solution
     * @param {?} target
     * @return {?}
     */
    function (target) {
        var /** @type {?} */ value;
        for (var /** @type {?} */ i = 0; i < this._fieldPaths.length; i++) {
            if ((isStringMap(target) || isString(target)) && !(target instanceof Map)) {
                value = this.objectPathInstance.get(target, this._fieldPaths[i]);
                target = value;
            }
            else if (target instanceof Map) {
                var /** @type {?} */ targetMap = target;
                value = targetMap.get(this._fieldPaths[i]);
            }
            // just tweak to be able to access maps field.someMapField.mapKey
            // I want this to get the element from the map
            if (value instanceof Map && (i + 1) < this._fieldPaths.length) {
                var /** @type {?} */ mapValue = /** @type {?} */ (value);
                return mapValue.get(this._fieldPaths[i + 1]);
            }
        }
        return value;
    };
    Object.defineProperty(FieldPath.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FieldPath.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this._path;
    };
    return FieldPath;
}());
/**
 * The FieldPath is utility class for representing of a dotted fieldPath.
 *
 * A String such as "foo.bar.baz" can be used to access a value on a target object.
 *
 */
export { FieldPath };
function FieldPath_tsickle_Closure_declarations() {
    /** @type {?} */
    FieldPath.prototype._fieldPaths;
    /** @type {?} */
    FieldPath.prototype.objectPathInstance;
    /** @type {?} */
    FieldPath.prototype._path;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcGF0aC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9maWVsZC1wYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxLQUFLLFVBQVUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7O0FBU3REOzs7Ozs7QUFBQTtJQStCSSxtQkFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFFN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsbUJBQU0sVUFBVSxFQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxxQkFBcUIsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQ3hGO0lBOUJEOzs7O09BSUc7Ozs7Ozs7Ozs7SUFDSSx1QkFBYTs7Ozs7Ozs7O0lBQXBCLFVBQXFCLE1BQVcsRUFBRSxLQUFhLEVBQUUsS0FBVTtRQUV2RCxxQkFBSSxFQUFFLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkM7SUFHRDs7T0FFRzs7Ozs7OztJQUNJLHVCQUFhOzs7Ozs7SUFBcEIsVUFBcUIsTUFBVyxFQUFFLEtBQWE7UUFFM0MscUJBQUksRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLHFCQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLEtBQUss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QUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDbEI7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLHFCQUFJLFNBQVMsR0FBcUIsTUFBTSxDQUFDO2dCQUN6QyxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUM7OztZQUlELEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxxQkFBSSxRQUFRLHFCQUFzQixLQUFLLENBQUEsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRDtTQUNKO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNoQjtJQUdELHNCQUFJLDJCQUFJOzs7O1FBQVI7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNyQjs7O09BQUE7Ozs7SUFFRCw0QkFBUTs7O0lBQVI7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNyQjtvQkEvSkw7SUFpS0MsQ0FBQTs7Ozs7OztBQW5JRCxxQkFtSUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCAqIGFzIG9iamVjdFBhdGggZnJvbSAnb2JqZWN0LXBhdGgnO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1N0cmluZywgaXNTdHJpbmdNYXB9IGZyb20gJy4vbGFuZyc7XG5cblxuLyoqXG4gKiBUaGUgRmllbGRQYXRoIGlzIHV0aWxpdHkgY2xhc3MgZm9yIHJlcHJlc2VudGluZyBvZiBhIGRvdHRlZCBmaWVsZFBhdGguXG4gKlxuICogQSBTdHJpbmcgc3VjaCBhcyBcImZvby5iYXIuYmF6XCIgY2FuIGJlIHVzZWQgdG8gYWNjZXNzIGEgdmFsdWUgb24gYSB0YXJnZXQgb2JqZWN0LlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkUGF0aFxue1xuICAgIF9maWVsZFBhdGhzOiBzdHJpbmdbXTtcbiAgICBwcml2YXRlIG9iamVjdFBhdGhJbnN0YW5jZTogYW55O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZXRzIGEgdmFsdWUgdG8gdGFyZ2V0IG9iamVjdHNcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRGaWVsZFZhbHVlKHRhcmdldDogYW55LCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGZwID0gbmV3IEZpZWxkUGF0aChmaWVsZCk7XG4gICAgICAgIGZwLnNldEZpZWxkVmFsdWUodGFyZ2V0LCB2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyBhIHZhbHVlIGZyb20gdGFyZ2V0IG9iamVjdHNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0RmllbGRWYWx1ZSh0YXJnZXQ6IGFueSwgZmllbGQ6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IGZwID0gbmV3IEZpZWxkUGF0aChmaWVsZCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IGZwLmdldEZpZWxkVmFsdWUodGFyZ2V0KTtcblxuICAgICAgICBpZiAoZmllbGQgPT09ICckdG9TdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGF0aDogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5fZmllbGRQYXRocyA9IGlzQmxhbmsoX3BhdGgpID8gW10gOiBfcGF0aC5zcGxpdCgnLicpO1xuICAgICAgICB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZSA9ICg8YW55Pm9iamVjdFBhdGgpWydjcmVhdGUnXSh7aW5jbHVkZUluaGVyaXRlZFByb3BzOiB0cnVlfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIE9uZSBvZiB0aGUgbWFpbiByZWFzb24gd2h5IEkgaGF2ZSB0aGlzIGlzIG5vdCBvbmx5IHRvIGl0ZXJhdGUgdGhydSBkb3R0ZWQgZmllbGQgcGF0aCBidXRcbiAgICAgKiBtYWlubHkgdG8gYmUgYWJsZSB0byBzZXQgbmF0dXJhbGx5IHZhbHVlIGludG8gYSBuZXN0ZWQgbWFwcyBsaWtlIDpcbiAgICAgKlxuICAgICAqICBmaWVsZE5hbWUuZmllbGROYW1lTWFwLmZpZWxkS2V5ID0+IGl0IHdpbGwgYWNjZXNzIGZpZWxkTmFtZSBvbiB0aGUgdGFyZ2V0LCBmcm9tIHRoZXJlIGl0XG4gICAgICogcmVhZHMgRmllbGROYW1lTWFwIHNpbmNlIGZpZWxkTmFtZSBuZXN0ZWQgb2JqZWN0cyBhbmQgc2V0cyBhIG5ldyB2YWx1ZSBpZGVudGlmaWVkIGJ5IE1hcCBrZXlcbiAgICAgKiBmaWVsZEtleVxuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqICBjbGFzcyBNeUNsYXNzIHtcbiAgICAgKiAgICAgIGZpZWxkTmFtZTpOZXN0ZWRPYmplY3RcbiAgICAgKlxuICAgICAqICB9XG4gICAgICpcbiAgICAgKiAgY2xhc3MgTmVzdGVkT2JqZWN0IHtcbiAgICAgKiAgICAgIGZpZWxkTmFtZU1hcDpNYXA8a2V5LCB2YWx1ZT47XG4gICAgICogIH1cbiAgICAgKlxuICAgICAqICBgYGBcbiAgICAgKiB1c2UgZmllbGQgdmFsdWUgZm9yIGFzc2lnbm1lbnQgc28ga2V5cyBvZiBmb3JtIFwiYS5iLmNcIiB3aWxsIGdvIGluIG5lc3RlZCBNYXBzXG4gICAgICovXG4gICAgc2V0RmllbGRWYWx1ZSh0YXJnZXQ6IGFueSwgdmFsdWU6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIGltcGxlbWVudCB0aGUgc2FtZSB0aGluZyB3aGF0IHdlIGhhdmUgb24gdGhlIGdldCwgaWYgTWFwIHNldCBmaWVsZCBpbnRvIG1hcFxuICAgICAgICBpZiAodGhpcy5fZmllbGRQYXRocy5sZW5ndGggPiAxICYmICEodGFyZ2V0IGluc3RhbmNlb2YgTWFwKSkge1xuXG4gICAgICAgICAgICBsZXQgcGF0aCA9IHRoaXMuX2ZpZWxkUGF0aHMuc2xpY2UoMCwgdGhpcy5fZmllbGRQYXRocy5sZW5ndGggLSAxKS5qb2luKCcuJyk7XG4gICAgICAgICAgICBsZXQgb2JqZWN0VG9CZVVwZGF0ZWQgPSB0aGlzLm9iamVjdFBhdGhJbnN0YW5jZS5nZXQodGFyZ2V0LCBwYXRoKTtcbiAgICAgICAgICAgIGlmIChvYmplY3RUb0JlVXBkYXRlZCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIG9iamVjdFRvQmVVcGRhdGVkLnNldCh0aGlzLl9maWVsZFBhdGhzW3RoaXMuX2ZpZWxkUGF0aHMubGVuZ3RoIC0gMV0sIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RQYXRoSW5zdGFuY2Uuc2V0KHRhcmdldCwgdGhpcy5fcGF0aCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgbGV0IG1hcFRhcmdldDogTWFwPHN0cmluZywgYW55PiA9IHRhcmdldDtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBOZXN0ZWQgTWFwXG4gICAgICAgICAgICBpZiAodGhpcy5fZmllbGRQYXRocy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9maWVsZFBhdGhzLnNwbGljZSgwLCAxKTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRNYXA6IE1hcDxzdHJpbmcsIGFueT4gPSBtYXBUYXJnZXQuZ2V0KHBhdGhbMF0pO1xuICAgICAgICAgICAgICAgIGlmIChpc0JsYW5rKG5lc3RlZE1hcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmVzdGVkTWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwVGFyZ2V0LnNldChwYXRoWzBdLCBuZXN0ZWRNYXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldEZpZWxkVmFsdWUobmVzdGVkTWFwLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXQodGhpcy5fZmllbGRQYXRoc1swXSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vYmplY3RQYXRoSW5zdGFuY2Uuc2V0KHRhcmdldCwgdGhpcy5fcGF0aCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgcmVhc29uIGFzIGZvciBTZXRGaWVsZFZhbHVlLiBOZWVkIHRvIGJlIGFibGUgdG8gcmVhZCB2YWx1ZSBieSBkb3R0ZWQgcGF0aCBhcyB3ZWxsXG4gICAgICogYXMgcmVhZHkgdmFsdWUgZnJvbSBNYXBzLlxuICAgICAqXG4gICAgICogdG9kbzogdGhpcyBpcyBxdWljayBhbmQgZGlydHkgaW1wbGVtZW50YXRpb24gLSBuZWVkIHRvIHdyaXRlIGJldHRlciBzb2x1dGlvblxuICAgICAqL1xuICAgIGdldEZpZWxkVmFsdWUodGFyZ2V0OiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCB2YWx1ZTogYW55O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2ZpZWxkUGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoaXNTdHJpbmdNYXAodGFyZ2V0KSB8fCBpc1N0cmluZyh0YXJnZXQpKSAmJiAhKHRhcmdldCBpbnN0YW5jZW9mIE1hcCkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMub2JqZWN0UGF0aEluc3RhbmNlLmdldCh0YXJnZXQsIHRoaXMuX2ZpZWxkUGF0aHNbaV0pO1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0TWFwOiBNYXA8c3RyaW5nLCBhbnk+ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGFyZ2V0TWFwLmdldCh0aGlzLl9maWVsZFBhdGhzW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8ganVzdCB0d2VhayB0byBiZSBhYmxlIHRvIGFjY2VzcyBtYXBzIGZpZWxkLnNvbWVNYXBGaWVsZC5tYXBLZXlcbiAgICAgICAgICAgIC8vIEkgd2FudCB0aGlzIHRvIGdldCB0aGUgZWxlbWVudCBmcm9tIHRoZSBtYXBcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCAmJiAoaSArIDEpIDwgdGhpcy5fZmllbGRQYXRocy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWFwVmFsdWUgPSA8TWFwPHN0cmluZywgYW55Pj4gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcFZhbHVlLmdldCh0aGlzLl9maWVsZFBhdGhzW2kgKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgZ2V0IHBhdGgoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICAgIH1cblxufVxuXG4iXX0=