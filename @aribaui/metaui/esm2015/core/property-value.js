/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { BooleanWrapper, evalExpressionWithCntx, FieldPath, isBlank, isBoolean, isFunction, isNumber, isPresent, isString, StringJoiner, unimplemented } from '@aribaui/core';
import { isPropertyMapAwaking, Meta } from './meta';
/**
 * @abstract
 */
export class DynamicPropertyValue {
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        return unimplemented();
    }
    /**
     * @param {?} context
     * @return {?}
     */
    bind(context) {
        return unimplemented();
    }
}
/**
 * @record
 */
export function DynamicSettablePropertyValue() { }
/** @type {?} */
DynamicSettablePropertyValue.prototype.settable;
/** @type {?} */
DynamicSettablePropertyValue.prototype.evaluateSet;
/**
 * ;marker; interface for DynamicPropertyValues that depend only on their match context and
 * therefore can be computed and cached statically in the Context Activation tree
 */
export class StaticallyResolvable extends DynamicPropertyValue {
}
export class StaticDynamicWrapper extends StaticallyResolvable {
    /**
     * @param {?} _orig
     */
    constructor(_orig) {
        super();
        this._orig = _orig;
        this.propertyAwaking = true;
    }
    /**
     * @return {?}
     */
    getDynamicValue() {
        return this._orig;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    awakeForPropertyMap(map) {
        /** @type {?} */
        let origaw = (isPropertyMapAwaking(this._orig)) ? /** @type {?} */ ((/** @type {?} */ (this._orig)).awakeForPropertyMap(map)) : this._orig;
        return new StaticDynamicWrapper(origaw);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        // we lazily static evaluate our value and cache the result
        if (isBlank(this._cached)) {
            this._cached = context.staticallyResolveValue(this._orig);
        }
        return this._cached;
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        let sj = new StringJoiner(['StaticDynamicWrapper']);
        sj.add('(');
        sj.add(((isPresent(this._cached)) ? this._cached : this._orig));
        sj.add(((isBlank(this._cached)) ? ' unevaluated' : ''));
        sj.add(')');
        return sj.toString();
    }
}
if (false) {
    /** @type {?} */
    StaticDynamicWrapper.prototype._cached;
    /** @type {?} */
    StaticDynamicWrapper.prototype.propertyAwaking;
    /** @type {?} */
    StaticDynamicWrapper.prototype._orig;
}
export class StaticallyResolvableWrapper extends StaticallyResolvable {
    /**
     * @param {?} _orig
     */
    constructor(_orig) {
        super();
        this._orig = _orig;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        return this._orig.evaluate(context);
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        let sj = new StringJoiner(['StaticallyResolvableWrapper']);
        sj.add('(');
        sj.add(this._orig.toString());
        sj.add(')');
        return sj.toString();
    }
}
if (false) {
    /** @type {?} */
    StaticallyResolvableWrapper.prototype._orig;
}
export class ContextFieldPath extends DynamicPropertyValue {
    /**
     * @param {?} path
     */
    constructor(path) {
        super();
        this.settable = true;
        this.fieldPath = new FieldPath(path);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        return this.fieldPath.getFieldValue(context);
    }
    /**
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    evaluateSet(context, value) {
        this.fieldPath.setFieldValue(context, value);
    }
}
if (false) {
    /** @type {?} */
    ContextFieldPath.prototype.settable;
    /** @type {?} */
    ContextFieldPath.prototype.fieldPath;
}
/**
 * @param {?} arg
 * @return {?}
 */
export function isDynamicSettable(arg) {
    return isPresent(arg.settable);
}
export class Expr extends DynamicPropertyValue {
    /**
     * @param {?} _expressionString
     */
    constructor(_expressionString) {
        super();
        this._expressionString = _expressionString;
        this._extendedObjects = new Map();
        this.addTypeToContext('Meta', Meta);
        this.addTypeToContext('FieldPath', FieldPath);
    }
    /**
     * @param {?} name
     * @param {?} context
     * @return {?}
     */
    addTypeToContext(name, context) {
        if (isFunction(context)) {
            this._extendedObjects.set(name, context);
        }
    }
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        /** @type {?} */
        let index = 0;
        this._extendedObjects.forEach((v, k) => {
            /** @type {?} */
            const typeName = `DynObj${index++}`;
            (/** @type {?} */ (context))[typeName] = v;
            if (this._expressionString.indexOf(`${k}.`) !== -1) {
                this._expressionString = this._expressionString.replace(`${k}.`, `${typeName}.`);
            }
        });
        /** @type {?} */
        let result = evalExpressionWithCntx(this._expressionString, '', context, context);
        index = 0;
        this._extendedObjects.forEach((v, k) => {
            /** @type {?} */
            const typeName = `DynObj${index++}`;
            if (isPresent((/** @type {?} */ (context))[typeName])) {
                delete (/** @type {?} */ (context))[typeName];
                // check if we can use undefined. Delete is pretty slow
            }
        });
        return result;
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        let sj = new StringJoiner(['expr:']);
        sj.add('(');
        sj.add(this._expressionString);
        sj.add(')');
        return sj.toString();
    }
}
if (false) {
    /** @type {?} */
    Expr.prototype._extendedObjects;
    /** @type {?} */
    Expr.prototype._expressionString;
}
export class DeferredOperationChain extends DynamicPropertyValue {
    /**
     * @param {?} _merger
     * @param {?} _orig
     * @param {?} _override
     */
    constructor(_merger, _orig, _override) {
        super();
        this._merger = _merger;
        this._orig = _orig;
        this._override = _override;
        this.propertyAwaking = true;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    evaluate(context) {
        return this._merger.merge(context.resolveValue(this._override), context.resolveValue(this._orig), context.isDeclare());
    }
    /**
     * @param {?} map
     * @return {?}
     */
    awakeForPropertyMap(map) {
        /** @type {?} */
        let orig = this._orig;
        /** @type {?} */
        let over = this._override;
        if (isPropertyMapAwaking(orig)) {
            orig = (/** @type {?} */ (orig)).awakeForPropertyMap(map);
        }
        if (isPropertyMapAwaking(over)) {
            over = (/** @type {?} */ (over)).awakeForPropertyMap(map);
        }
        if (orig !== this._orig || over !== this._override) {
            return new DeferredOperationChain(this._merger, orig, over);
        }
        return this;
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        let sj = new StringJoiner(['Chain']);
        sj.add('<');
        sj.add(this._merger.toString());
        sj.add('>');
        sj.add(': ');
        sj.add(this._override);
        sj.add(' => ');
        sj.add(this._orig);
        return sj.toString();
    }
}
if (false) {
    /** @type {?} */
    DeferredOperationChain.prototype.propertyAwaking;
    /** @type {?} */
    DeferredOperationChain.prototype._merger;
    /** @type {?} */
    DeferredOperationChain.prototype._orig;
    /** @type {?} */
    DeferredOperationChain.prototype._override;
}
export class ValueConverter {
    /**
     * @param {?} toType
     * @param {?} value
     * @return {?}
     */
    static value(toType, value) {
        if (toType === 'String') {
            if (isBlank(value) || isString(value)) {
                return value;
            }
            return value.toString();
        }
        else if (toType === 'Boolean') {
            if (isBlank(value) || isBoolean(value)) {
                return value;
            }
            return BooleanWrapper.boleanValue(value);
        }
        else if (toType === 'Number') {
            if (isBlank(value) || isNumber(value)) {
                return value;
            }
            // ignore dec. points for now
            return parseInt(value.toString());
        }
        return value;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktdmFsdWUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL3Byb3BlcnR5LXZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFtQkEsT0FBTyxFQUNILGNBQWMsRUFDZCxzQkFBc0IsRUFDdEIsU0FBUyxFQUNULE9BQU8sRUFDUCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLFlBQVksRUFDWixhQUFhLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQWtELE1BQU0sUUFBUSxDQUFDOzs7O0FBSW5HLE1BQU07Ozs7O0lBRUYsUUFBUSxDQUFDLE9BQWdCO1FBRXJCLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFFRCxJQUFJLENBQUMsT0FBWTtRQUViLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUMxQjtDQUdKOzs7Ozs7Ozs7Ozs7O0FBYUQsTUFBTSwyQkFBNEIsU0FBUSxvQkFBb0I7Q0FJN0Q7QUFHRCxNQUFNLDJCQUE0QixTQUFRLG9CQUFvQjs7OztJQUsxRCxZQUFvQixLQUEyQjtRQUUzQyxLQUFLLEVBQUUsQ0FBQztRQUZRLFVBQUssR0FBTCxLQUFLLENBQXNCOytCQUZwQixJQUFJO0tBSzlCOzs7O0lBR0QsZUFBZTtRQUVYLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3JCOzs7OztJQUVELG1CQUFtQixDQUFDLEdBQWdCOztRQUloQyxJQUFJLE1BQU0sR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQ3ZCLG1CQUFxQixJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEVBQy9FLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2pC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KiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEJvb2xlYW5XcmFwcGVyLFxuICAgIGV2YWxFeHByZXNzaW9uV2l0aENudHgsXG4gICAgRmllbGRQYXRoLFxuICAgIGlzQmxhbmssXG4gICAgaXNCb29sZWFuLFxuICAgIGlzRnVuY3Rpb24sXG4gICAgaXNOdW1iZXIsXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIFN0cmluZ0pvaW5lcixcbiAgICB1bmltcGxlbWVudGVkXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtpc1Byb3BlcnR5TWFwQXdha2luZywgTWV0YSwgUHJvcGVydHlNYXAsIFByb3BlcnR5TWFwQXdha2luZywgUHJvcGVydHlNZXJnZXJ9IGZyb20gJy4vbWV0YSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4vY29udGV4dCc7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIER5bmFtaWNQcm9wZXJ0eVZhbHVlXG57XG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTtcbiAgICB9XG5cbiAgICBiaW5kKGNvbnRleHQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEeW5hbWljU2V0dGFibGVQcm9wZXJ0eVZhbHVlXG57XG4gICAgc2V0dGFibGU6IGJvb2xlYW47XG5cbiAgICBldmFsdWF0ZVNldCAoY29udGV4dDogQ29udGV4dCwgdmFsdWU6IGFueSk6IHZvaWQ7XG59XG5cbi8qKlxuICogO21hcmtlcjsgaW50ZXJmYWNlIGZvciBEeW5hbWljUHJvcGVydHlWYWx1ZXMgdGhhdCBkZXBlbmQgb25seSBvbiB0aGVpciBtYXRjaCBjb250ZXh0IGFuZFxuICogdGhlcmVmb3JlIGNhbiBiZSBjb21wdXRlZCBhbmQgY2FjaGVkIHN0YXRpY2FsbHkgaW4gdGhlIENvbnRleHQgQWN0aXZhdGlvbiB0cmVlXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0aWNhbGx5UmVzb2x2YWJsZSBleHRlbmRzIER5bmFtaWNQcm9wZXJ0eVZhbHVlXG57XG5cblxufVxuXG5cbmV4cG9ydCBjbGFzcyBTdGF0aWNEeW5hbWljV3JhcHBlciBleHRlbmRzIFN0YXRpY2FsbHlSZXNvbHZhYmxlIGltcGxlbWVudHMgUHJvcGVydHlNYXBBd2FraW5nXG57XG4gICAgcHJpdmF0ZSBfY2FjaGVkOiBhbnk7XG4gICAgcHJvcGVydHlBd2FraW5nOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX29yaWc6IFN0YXRpY2FsbHlSZXNvbHZhYmxlKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cblxuICAgIGdldER5bmFtaWNWYWx1ZSgpOiBTdGF0aWNhbGx5UmVzb2x2YWJsZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWc7XG4gICAgfVxuXG4gICAgYXdha2VGb3JQcm9wZXJ0eU1hcChtYXA6IFByb3BlcnR5TWFwKTogYW55XG4gICAge1xuICAgICAgICAvLyBjb3B5IG91cnNlbHZlcyBzbyB0aGVyZSdzIGEgZnJlc2ggY29weSBmb3IgZWFjaCBjb250ZXh0IGluIHdoaWNoIGlzIGFwcGVhcnNcblxuICAgICAgICBsZXQgb3JpZ2F3ID0gKGlzUHJvcGVydHlNYXBBd2FraW5nKHRoaXMuX29yaWcpKSA/XG4gICAgICAgICAgICA8U3RhdGljYWxseVJlc29sdmFibGU+KDxQcm9wZXJ0eU1hcEF3YWtpbmc+dGhpcy5fb3JpZykuYXdha2VGb3JQcm9wZXJ0eU1hcChtYXApXG4gICAgICAgICAgICA6IHRoaXMuX29yaWc7XG4gICAgICAgIHJldHVybiBuZXcgU3RhdGljRHluYW1pY1dyYXBwZXIob3JpZ2F3KTtcbiAgICB9XG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55XG4gICAge1xuICAgICAgICAvLyB3ZSBsYXppbHkgc3RhdGljIGV2YWx1YXRlIG91ciB2YWx1ZSBhbmQgY2FjaGUgdGhlIHJlc3VsdFxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9jYWNoZWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZWQgPSBjb250ZXh0LnN0YXRpY2FsbHlSZXNvbHZlVmFsdWUodGhpcy5fb3JpZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlZDtcbiAgICB9XG5cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IHNqID0gbmV3IFN0cmluZ0pvaW5lcihbJ1N0YXRpY0R5bmFtaWNXcmFwcGVyJ10pO1xuICAgICAgICBzai5hZGQoJygnKTtcbiAgICAgICAgc2ouYWRkKCgoaXNQcmVzZW50KHRoaXMuX2NhY2hlZCkpID8gdGhpcy5fY2FjaGVkIDogdGhpcy5fb3JpZykpO1xuICAgICAgICBzai5hZGQoKChpc0JsYW5rKHRoaXMuX2NhY2hlZCkpID8gJyB1bmV2YWx1YXRlZCcgOiAnJykpO1xuICAgICAgICBzai5hZGQoJyknKTtcblxuICAgICAgICByZXR1cm4gc2oudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLy8gV3JhcHBlciB0aGF0IG1hcmtzIGEgbm9ybWFsbHkgZHluYW1pYyB2YWx1ZSAoZS5nLiBhbiBFeHByKSBhcyBTdGF0aWNhbGx5UmVzb2x2YWJsZVxuZXhwb3J0IGNsYXNzIFN0YXRpY2FsbHlSZXNvbHZhYmxlV3JhcHBlciBleHRlbmRzIFN0YXRpY2FsbHlSZXNvbHZhYmxlXG57XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vcmlnOiBEeW5hbWljUHJvcGVydHlWYWx1ZSlcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWcuZXZhbHVhdGUoY29udGV4dCk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgc2ogPSBuZXcgU3RyaW5nSm9pbmVyKFsnU3RhdGljYWxseVJlc29sdmFibGVXcmFwcGVyJ10pO1xuICAgICAgICBzai5hZGQoJygnKTtcbiAgICAgICAgc2ouYWRkKHRoaXMuX29yaWcudG9TdHJpbmcoKSk7XG4gICAgICAgIHNqLmFkZCgnKScpO1xuXG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQ29udGV4dEZpZWxkUGF0aCBleHRlbmRzIER5bmFtaWNQcm9wZXJ0eVZhbHVlIGltcGxlbWVudHMgRHluYW1pY1NldHRhYmxlUHJvcGVydHlWYWx1ZVxue1xuICAgIHNldHRhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByb3RlY3RlZCBmaWVsZFBhdGg6IEZpZWxkUGF0aDtcblxuICAgIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5maWVsZFBhdGggPSBuZXcgRmllbGRQYXRoKHBhdGgpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkUGF0aC5nZXRGaWVsZFZhbHVlKGNvbnRleHQpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlU2V0KGNvbnRleHQ6IENvbnRleHQsIHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIHRoaXMuZmllbGRQYXRoLnNldEZpZWxkVmFsdWUoY29udGV4dCwgdmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRHluYW1pY1NldHRhYmxlKGFyZzogYW55KTogYXJnIGlzIER5bmFtaWNTZXR0YWJsZVByb3BlcnR5VmFsdWVcbntcbiAgICByZXR1cm4gaXNQcmVzZW50KGFyZy5zZXR0YWJsZSk7XG59XG5cblxuZXhwb3J0IGNsYXNzIEV4cHIgZXh0ZW5kcyBEeW5hbWljUHJvcGVydHlWYWx1ZVxue1xuICAgIHByaXZhdGUgX2V4dGVuZGVkT2JqZWN0czogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9leHByZXNzaW9uU3RyaW5nOiBzdHJpbmcpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuYWRkVHlwZVRvQ29udGV4dCgnTWV0YScsIE1ldGEpO1xuICAgICAgICB0aGlzLmFkZFR5cGVUb0NvbnRleHQoJ0ZpZWxkUGF0aCcsIEZpZWxkUGF0aCk7XG4gICAgfVxuXG5cbiAgICBhZGRUeXBlVG9Db250ZXh0KG5hbWU6IHN0cmluZywgY29udGV4dDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2V4dGVuZGVkT2JqZWN0cy5zZXQobmFtZSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55XG4gICAge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB0aGlzLl9leHRlbmRlZE9iamVjdHMuZm9yRWFjaCgodiwgaykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgdHlwZU5hbWUgPSBgRHluT2JqJHtpbmRleCsrfWA7XG4gICAgICAgICAgICAoPGFueT5jb250ZXh0KVt0eXBlTmFtZV0gPSB2O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fZXhwcmVzc2lvblN0cmluZy5pbmRleE9mKGAke2t9LmApICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4cHJlc3Npb25TdHJpbmcgPSB0aGlzLl9leHByZXNzaW9uU3RyaW5nLnJlcGxhY2UoYCR7a30uYCwgYCR7dHlwZU5hbWV9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gZXZhbEV4cHJlc3Npb25XaXRoQ250eCh0aGlzLl9leHByZXNzaW9uU3RyaW5nLCAnJywgY29udGV4dCwgY29udGV4dCk7XG5cbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB0aGlzLl9leHRlbmRlZE9iamVjdHMuZm9yRWFjaCgodiwgaykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgdHlwZU5hbWUgPSBgRHluT2JqJHtpbmRleCsrfWA7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KCg8YW55PmNvbnRleHQpW3R5cGVOYW1lXSkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgKDxhbnk+Y29udGV4dClbdHlwZU5hbWVdO1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIGNhbiB1c2UgdW5kZWZpbmVkLiBEZWxldGUgaXMgcHJldHR5IHNsb3dcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgc2ogPSBuZXcgU3RyaW5nSm9pbmVyKFsnZXhwcjonXSk7XG4gICAgICAgIHNqLmFkZCgnKCcpO1xuICAgICAgICBzai5hZGQodGhpcy5fZXhwcmVzc2lvblN0cmluZyk7XG4gICAgICAgIHNqLmFkZCgnKScpO1xuXG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlZmVycmVkT3BlcmF0aW9uQ2hhaW4gZXh0ZW5kcyBEeW5hbWljUHJvcGVydHlWYWx1ZSBpbXBsZW1lbnRzIFByb3BlcnR5TWFwQXdha2luZ1xue1xuICAgIHByb3BlcnR5QXdha2luZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXJnZXI6IFByb3BlcnR5TWVyZ2VyLCBwcml2YXRlIF9vcmlnOiBhbnksIHByaXZhdGUgX292ZXJyaWRlOiBhbnkpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlci5tZXJnZShjb250ZXh0LnJlc29sdmVWYWx1ZSh0aGlzLl9vdmVycmlkZSksXG4gICAgICAgICAgICBjb250ZXh0LnJlc29sdmVWYWx1ZSh0aGlzLl9vcmlnKSxcbiAgICAgICAgICAgIGNvbnRleHQuaXNEZWNsYXJlKCkpO1xuICAgIH1cblxuXG4gICAgYXdha2VGb3JQcm9wZXJ0eU1hcChtYXA6IFByb3BlcnR5TWFwKTogYW55XG4gICAge1xuICAgICAgICBsZXQgb3JpZyA9IHRoaXMuX29yaWc7XG4gICAgICAgIGxldCBvdmVyID0gdGhpcy5fb3ZlcnJpZGU7XG5cbiAgICAgICAgaWYgKGlzUHJvcGVydHlNYXBBd2FraW5nKG9yaWcpKSB7XG4gICAgICAgICAgICBvcmlnID0gKDxQcm9wZXJ0eU1hcEF3YWtpbmc+b3JpZykuYXdha2VGb3JQcm9wZXJ0eU1hcChtYXApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1Byb3BlcnR5TWFwQXdha2luZyhvdmVyKSkge1xuICAgICAgICAgICAgb3ZlciA9ICg8UHJvcGVydHlNYXBBd2FraW5nPm92ZXIpLmF3YWtlRm9yUHJvcGVydHlNYXAobWFwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JpZyAhPT0gdGhpcy5fb3JpZyB8fCBvdmVyICE9PSB0aGlzLl9vdmVycmlkZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEZWZlcnJlZE9wZXJhdGlvbkNoYWluKHRoaXMuX21lcmdlciwgb3JpZywgb3Zlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBzaiA9IG5ldyBTdHJpbmdKb2luZXIoWydDaGFpbiddKTtcbiAgICAgICAgc2ouYWRkKCc8Jyk7XG4gICAgICAgIHNqLmFkZCh0aGlzLl9tZXJnZXIudG9TdHJpbmcoKSk7XG4gICAgICAgIHNqLmFkZCgnPicpO1xuICAgICAgICBzai5hZGQoJzogJyk7XG4gICAgICAgIHNqLmFkZCh0aGlzLl9vdmVycmlkZSk7XG4gICAgICAgIHNqLmFkZCgnID0+ICcpO1xuICAgICAgICBzai5hZGQodGhpcy5fb3JpZyk7XG5cbiAgICAgICAgcmV0dXJuIHNqLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGNsYXNzIFZhbHVlQ29udmVydGVyXG57XG5cbiAgICBzdGF0aWMgdmFsdWUodG9UeXBlOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnlcbiAgICB7XG5cbiAgICAgICAgaWYgKHRvVHlwZSA9PT0gJ1N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHZhbHVlKSB8fCBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRvVHlwZSA9PT0gJ0Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayh2YWx1ZSkgfHwgaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKHZhbHVlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRvVHlwZSA9PT0gJ051bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHZhbHVlKSB8fCBpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlnbm9yZSBkZWMuIHBvaW50cyBmb3Igbm93XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuXG4gICAgfVxufVxuXG4iXX0=