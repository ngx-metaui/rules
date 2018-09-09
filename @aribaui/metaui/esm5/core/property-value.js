/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BooleanWrapper, evalExpressionWithCntx, FieldPath, isBlank, isBoolean, isFunction, isNumber, isPresent, isString, StringJoiner, unimplemented } from '@aribaui/core';
import { isPropertyMapAwaking, Meta } from './meta';
/**
 * @abstract
 */
var /**
 * @abstract
 */
DynamicPropertyValue = /** @class */ (function () {
    function DynamicPropertyValue() {
    }
    /**
     * @param {?} context
     * @return {?}
     */
    DynamicPropertyValue.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return unimplemented();
    };
    /**
     * @param {?} context
     * @return {?}
     */
    DynamicPropertyValue.prototype.bind = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return unimplemented();
    };
    return DynamicPropertyValue;
}());
/**
 * @abstract
 */
export { DynamicPropertyValue };
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
var /**
 * ;marker; interface for DynamicPropertyValues that depend only on their match context and
 * therefore can be computed and cached statically in the Context Activation tree
 */
StaticallyResolvable = /** @class */ (function (_super) {
    tslib_1.__extends(StaticallyResolvable, _super);
    function StaticallyResolvable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StaticallyResolvable;
}(DynamicPropertyValue));
/**
 * ;marker; interface for DynamicPropertyValues that depend only on their match context and
 * therefore can be computed and cached statically in the Context Activation tree
 */
export { StaticallyResolvable };
var StaticDynamicWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(StaticDynamicWrapper, _super);
    function StaticDynamicWrapper(_orig) {
        var _this = _super.call(this) || this;
        _this._orig = _orig;
        _this.propertyAwaking = true;
        return _this;
    }
    /**
     * @return {?}
     */
    StaticDynamicWrapper.prototype.getDynamicValue = /**
     * @return {?}
     */
    function () {
        return this._orig;
    };
    /**
     * @param {?} map
     * @return {?}
     */
    StaticDynamicWrapper.prototype.awakeForPropertyMap = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        /** @type {?} */
        var origaw = (isPropertyMapAwaking(this._orig)) ? /** @type {?} */ ((/** @type {?} */ (this._orig)).awakeForPropertyMap(map)) : this._orig;
        return new StaticDynamicWrapper(origaw);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    StaticDynamicWrapper.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        // we lazily static evaluate our value and cache the result
        if (isBlank(this._cached)) {
            this._cached = context.staticallyResolveValue(this._orig);
        }
        return this._cached;
    };
    /**
     * @return {?}
     */
    StaticDynamicWrapper.prototype.toString = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sj = new StringJoiner(['StaticDynamicWrapper']);
        sj.add('(');
        sj.add(((isPresent(this._cached)) ? this._cached : this._orig));
        sj.add(((isBlank(this._cached)) ? ' unevaluated' : ''));
        sj.add(')');
        return sj.toString();
    };
    return StaticDynamicWrapper;
}(StaticallyResolvable));
export { StaticDynamicWrapper };
if (false) {
    /** @type {?} */
    StaticDynamicWrapper.prototype._cached;
    /** @type {?} */
    StaticDynamicWrapper.prototype.propertyAwaking;
    /** @type {?} */
    StaticDynamicWrapper.prototype._orig;
}
var StaticallyResolvableWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(StaticallyResolvableWrapper, _super);
    function StaticallyResolvableWrapper(_orig) {
        var _this = _super.call(this) || this;
        _this._orig = _orig;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    StaticallyResolvableWrapper.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this._orig.evaluate(context);
    };
    /**
     * @return {?}
     */
    StaticallyResolvableWrapper.prototype.toString = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sj = new StringJoiner(['StaticallyResolvableWrapper']);
        sj.add('(');
        sj.add(this._orig.toString());
        sj.add(')');
        return sj.toString();
    };
    return StaticallyResolvableWrapper;
}(StaticallyResolvable));
export { StaticallyResolvableWrapper };
if (false) {
    /** @type {?} */
    StaticallyResolvableWrapper.prototype._orig;
}
var ContextFieldPath = /** @class */ (function (_super) {
    tslib_1.__extends(ContextFieldPath, _super);
    function ContextFieldPath(path) {
        var _this = _super.call(this) || this;
        _this.settable = true;
        _this.fieldPath = new FieldPath(path);
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    ContextFieldPath.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.fieldPath.getFieldValue(context);
    };
    /**
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    ContextFieldPath.prototype.evaluateSet = /**
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    function (context, value) {
        this.fieldPath.setFieldValue(context, value);
    };
    return ContextFieldPath;
}(DynamicPropertyValue));
export { ContextFieldPath };
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
var Expr = /** @class */ (function (_super) {
    tslib_1.__extends(Expr, _super);
    function Expr(_expressionString) {
        var _this = _super.call(this) || this;
        _this._expressionString = _expressionString;
        _this._extendedObjects = new Map();
        _this.addTypeToContext('Meta', Meta);
        _this.addTypeToContext('FieldPath', FieldPath);
        return _this;
    }
    /**
     * @param {?} name
     * @param {?} context
     * @return {?}
     */
    Expr.prototype.addTypeToContext = /**
     * @param {?} name
     * @param {?} context
     * @return {?}
     */
    function (name, context) {
        if (isFunction(context)) {
            this._extendedObjects.set(name, context);
        }
    };
    /**
     * @param {?} context
     * @return {?}
     */
    Expr.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var index = 0;
        this._extendedObjects.forEach(function (v, k) {
            /** @type {?} */
            var typeName = "DynObj" + index++;
            (/** @type {?} */ (context))[typeName] = v;
            if (_this._expressionString.indexOf(k + ".") !== -1) {
                _this._expressionString = _this._expressionString.replace(k + ".", typeName + ".");
            }
        });
        /** @type {?} */
        var result = evalExpressionWithCntx(this._expressionString, '', context, context);
        index = 0;
        this._extendedObjects.forEach(function (v, k) {
            /** @type {?} */
            var typeName = "DynObj" + index++;
            if (isPresent((/** @type {?} */ (context))[typeName])) {
                delete (/** @type {?} */ (context))[typeName];
                // check if we can use undefined. Delete is pretty slow
            }
        });
        return result;
    };
    /**
     * @return {?}
     */
    Expr.prototype.toString = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sj = new StringJoiner(['expr:']);
        sj.add('(');
        sj.add(this._expressionString);
        sj.add(')');
        return sj.toString();
    };
    return Expr;
}(DynamicPropertyValue));
export { Expr };
if (false) {
    /** @type {?} */
    Expr.prototype._extendedObjects;
    /** @type {?} */
    Expr.prototype._expressionString;
}
var DeferredOperationChain = /** @class */ (function (_super) {
    tslib_1.__extends(DeferredOperationChain, _super);
    function DeferredOperationChain(_merger, _orig, _override) {
        var _this = _super.call(this) || this;
        _this._merger = _merger;
        _this._orig = _orig;
        _this._override = _override;
        _this.propertyAwaking = true;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    DeferredOperationChain.prototype.evaluate = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this._merger.merge(context.resolveValue(this._override), context.resolveValue(this._orig), context.isDeclare());
    };
    /**
     * @param {?} map
     * @return {?}
     */
    DeferredOperationChain.prototype.awakeForPropertyMap = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        /** @type {?} */
        var orig = this._orig;
        /** @type {?} */
        var over = this._override;
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
    };
    /**
     * @return {?}
     */
    DeferredOperationChain.prototype.toString = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sj = new StringJoiner(['Chain']);
        sj.add('<');
        sj.add(this._merger.toString());
        sj.add('>');
        sj.add(': ');
        sj.add(this._override);
        sj.add(' => ');
        sj.add(this._orig);
        return sj.toString();
    };
    return DeferredOperationChain;
}(DynamicPropertyValue));
export { DeferredOperationChain };
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
var ValueConverter = /** @class */ (function () {
    function ValueConverter() {
    }
    /**
     * @param {?} toType
     * @param {?} value
     * @return {?}
     */
    ValueConverter.value = /**
     * @param {?} toType
     * @param {?} value
     * @return {?}
     */
    function (toType, value) {
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
    };
    return ValueConverter;
}());
export { ValueConverter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktdmFsdWUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJjb3JlL3Byb3BlcnR5LXZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBbUJBLE9BQU8sRUFDSCxjQUFjLEVBQ2Qsc0JBQXNCLEVBQ3RCLFNBQVMsRUFDVCxPQUFPLEVBQ1AsU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixZQUFZLEVBQ1osYUFBYSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFrRCxNQUFNLFFBQVEsQ0FBQzs7OztBQUluRzs7O0FBQUE7Ozs7Ozs7SUFFSSx1Q0FBUTs7OztJQUFSLFVBQVMsT0FBZ0I7UUFFckIsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCOzs7OztJQUVELG1DQUFJOzs7O0lBQUosVUFBSyxPQUFZO1FBRWIsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCOytCQTlDTDtJQWlEQyxDQUFBOzs7O0FBYkQsZ0NBYUM7Ozs7Ozs7Ozs7Ozs7QUFhRDs7OztBQUFBO0lBQTBDLGdEQUFvQjs7OzsrQkE5RDlEO0VBOEQwQyxvQkFBb0IsRUFJN0QsQ0FBQTs7Ozs7QUFKRCxnQ0FJQztBQUdELElBQUE7SUFBMEMsZ0RBQW9CO0lBSzFELDhCQUFvQixLQUEyQjtRQUEvQyxZQUVJLGlCQUFPLFNBQ1Y7UUFIbUIsV0FBSyxHQUFMLEtBQUssQ0FBc0I7Z0NBRnBCLElBQUk7O0tBSzlCOzs7O0lBR0QsOENBQWU7OztJQUFmO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDckI7Ozs7O0lBRUQsa0RBQW1COzs7O0lBQW5CLFVBQW9CLEdBQWdCOztRQUloQyxJQUFJLE1BQU0sR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENB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LENBQUM7YUFDaEI7WUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUU1QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNoQjs7WUFHRCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUVoQjt5QkEzVEw7SUE0VEMsQ0FBQTtBQTlCRCwwQkE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQm9vbGVhbldyYXBwZXIsXG4gICAgZXZhbEV4cHJlc3Npb25XaXRoQ250eCxcbiAgICBGaWVsZFBhdGgsXG4gICAgaXNCbGFuayxcbiAgICBpc0Jvb2xlYW4sXG4gICAgaXNGdW5jdGlvbixcbiAgICBpc051bWJlcixcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgU3RyaW5nSm9pbmVyLFxuICAgIHVuaW1wbGVtZW50ZWRcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge2lzUHJvcGVydHlNYXBBd2FraW5nLCBNZXRhLCBQcm9wZXJ0eU1hcCwgUHJvcGVydHlNYXBBd2FraW5nLCBQcm9wZXJ0eU1lcmdlcn0gZnJvbSAnLi9tZXRhJztcbmltcG9ydCB7Q29udGV4dH0gZnJvbSAnLi9jb250ZXh0JztcblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRHluYW1pY1Byb3BlcnR5VmFsdWVcbntcbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cblxuICAgIGJpbmQoY29udGV4dDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTtcbiAgICB9XG5cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIER5bmFtaWNTZXR0YWJsZVByb3BlcnR5VmFsdWVcbntcbiAgICBzZXR0YWJsZTogYm9vbGVhbjtcblxuICAgIGV2YWx1YXRlU2V0IChjb250ZXh0OiBDb250ZXh0LCB2YWx1ZTogYW55KTogdm9pZDtcbn1cblxuLyoqXG4gKiA7bWFya2VyOyBpbnRlcmZhY2UgZm9yIER5bmFtaWNQcm9wZXJ0eVZhbHVlcyB0aGF0IGRlcGVuZCBvbmx5IG9uIHRoZWlyIG1hdGNoIGNvbnRleHQgYW5kXG4gKiB0aGVyZWZvcmUgY2FuIGJlIGNvbXB1dGVkIGFuZCBjYWNoZWQgc3RhdGljYWxseSBpbiB0aGUgQ29udGV4dCBBY3RpdmF0aW9uIHRyZWVcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRpY2FsbHlSZXNvbHZhYmxlIGV4dGVuZHMgRHluYW1pY1Byb3BlcnR5VmFsdWVcbntcblxuXG59XG5cblxuZXhwb3J0IGNsYXNzIFN0YXRpY0R5bmFtaWNXcmFwcGVyIGV4dGVuZHMgU3RhdGljYWxseVJlc29sdmFibGUgaW1wbGVtZW50cyBQcm9wZXJ0eU1hcEF3YWtpbmdcbntcbiAgICBwcml2YXRlIF9jYWNoZWQ6IGFueTtcbiAgICBwcm9wZXJ0eUF3YWtpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3JpZzogU3RhdGljYWxseVJlc29sdmFibGUpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuXG4gICAgZ2V0RHluYW1pY1ZhbHVlKCk6IFN0YXRpY2FsbHlSZXNvbHZhYmxlXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZztcbiAgICB9XG5cbiAgICBhd2FrZUZvclByb3BlcnR5TWFwKG1hcDogUHJvcGVydHlNYXApOiBhbnlcbiAgICB7XG4gICAgICAgIC8vIGNvcHkgb3Vyc2VsdmVzIHNvIHRoZXJlJ3MgYSBmcmVzaCBjb3B5IGZvciBlYWNoIGNvbnRleHQgaW4gd2hpY2ggaXMgYXBwZWFyc1xuXG4gICAgICAgIGxldCBvcmlnYXcgPSAoaXNQcm9wZXJ0eU1hcEF3YWtpbmcodGhpcy5fb3JpZykpID9cbiAgICAgICAgICAgIDxTdGF0aWNhbGx5UmVzb2x2YWJsZT4oPFByb3BlcnR5TWFwQXdha2luZz50aGlzLl9vcmlnKS5hd2FrZUZvclByb3BlcnR5TWFwKG1hcClcbiAgICAgICAgICAgIDogdGhpcy5fb3JpZztcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0aWNEeW5hbWljV3JhcHBlcihvcmlnYXcpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIC8vIHdlIGxhemlseSBzdGF0aWMgZXZhbHVhdGUgb3VyIHZhbHVlIGFuZCBjYWNoZSB0aGUgcmVzdWx0XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2NhY2hlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlZCA9IGNvbnRleHQuc3RhdGljYWxseVJlc29sdmVWYWx1ZSh0aGlzLl9vcmlnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVkO1xuICAgIH1cblxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgc2ogPSBuZXcgU3RyaW5nSm9pbmVyKFsnU3RhdGljRHluYW1pY1dyYXBwZXInXSk7XG4gICAgICAgIHNqLmFkZCgnKCcpO1xuICAgICAgICBzai5hZGQoKChpc1ByZXNlbnQodGhpcy5fY2FjaGVkKSkgPyB0aGlzLl9jYWNoZWQgOiB0aGlzLl9vcmlnKSk7XG4gICAgICAgIHNqLmFkZCgoKGlzQmxhbmsodGhpcy5fY2FjaGVkKSkgPyAnIHVuZXZhbHVhdGVkJyA6ICcnKSk7XG4gICAgICAgIHNqLmFkZCgnKScpO1xuXG4gICAgICAgIHJldHVybiBzai50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vLyBXcmFwcGVyIHRoYXQgbWFya3MgYSBub3JtYWxseSBkeW5hbWljIHZhbHVlIChlLmcuIGFuIEV4cHIpIGFzIFN0YXRpY2FsbHlSZXNvbHZhYmxlXG5leHBvcnQgY2xhc3MgU3RhdGljYWxseVJlc29sdmFibGVXcmFwcGVyIGV4dGVuZHMgU3RhdGljYWxseVJlc29sdmFibGVcbntcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX29yaWc6IER5bmFtaWNQcm9wZXJ0eVZhbHVlKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZy5ldmFsdWF0ZShjb250ZXh0KTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBzaiA9IG5ldyBTdHJpbmdKb2luZXIoWydTdGF0aWNhbGx5UmVzb2x2YWJsZVdyYXBwZXInXSk7XG4gICAgICAgIHNqLmFkZCgnKCcpO1xuICAgICAgICBzai5hZGQodGhpcy5fb3JpZy50b1N0cmluZygpKTtcbiAgICAgICAgc2ouYWRkKCcpJyk7XG5cbiAgICAgICAgcmV0dXJuIHNqLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0RmllbGRQYXRoIGV4dGVuZHMgRHluYW1pY1Byb3BlcnR5VmFsdWUgaW1wbGVtZW50cyBEeW5hbWljU2V0dGFibGVQcm9wZXJ0eVZhbHVlXG57XG4gICAgc2V0dGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJvdGVjdGVkIGZpZWxkUGF0aDogRmllbGRQYXRoO1xuXG4gICAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmZpZWxkUGF0aCA9IG5ldyBGaWVsZFBhdGgocGF0aCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGUoY29udGV4dDogQ29udGV4dCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRQYXRoLmdldEZpZWxkVmFsdWUoY29udGV4dCk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGVTZXQoY29udGV4dDogQ29udGV4dCwgdmFsdWU6IGFueSk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgdGhpcy5maWVsZFBhdGguc2V0RmllbGRWYWx1ZShjb250ZXh0LCB2YWx1ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEeW5hbWljU2V0dGFibGUoYXJnOiBhbnkpOiBhcmcgaXMgRHluYW1pY1NldHRhYmxlUHJvcGVydHlWYWx1ZVxue1xuICAgIHJldHVybiBpc1ByZXNlbnQoYXJnLnNldHRhYmxlKTtcbn1cblxuXG5leHBvcnQgY2xhc3MgRXhwciBleHRlbmRzIER5bmFtaWNQcm9wZXJ0eVZhbHVlXG57XG4gICAgcHJpdmF0ZSBfZXh0ZW5kZWRPYmplY3RzOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2V4cHJlc3Npb25TdHJpbmc6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5hZGRUeXBlVG9Db250ZXh0KCdNZXRhJywgTWV0YSk7XG4gICAgICAgIHRoaXMuYWRkVHlwZVRvQ29udGV4dCgnRmllbGRQYXRoJywgRmllbGRQYXRoKTtcbiAgICB9XG5cblxuICAgIGFkZFR5cGVUb0NvbnRleHQobmFtZTogc3RyaW5nLCBjb250ZXh0OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkge1xuICAgICAgICAgICAgdGhpcy5fZXh0ZW5kZWRPYmplY3RzLnNldChuYW1lLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV2YWx1YXRlKGNvbnRleHQ6IENvbnRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2V4dGVuZGVkT2JqZWN0cy5mb3JFYWNoKCh2LCBrKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB0eXBlTmFtZSA9IGBEeW5PYmoke2luZGV4Kyt9YDtcbiAgICAgICAgICAgICg8YW55PmNvbnRleHQpW3R5cGVOYW1lXSA9IHY7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9leHByZXNzaW9uU3RyaW5nLmluZGV4T2YoYCR7a30uYCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvblN0cmluZyA9IHRoaXMuX2V4cHJlc3Npb25TdHJpbmcucmVwbGFjZShgJHtrfS5gLCBgJHt0eXBlTmFtZX0uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBldmFsRXhwcmVzc2lvbldpdGhDbnR4KHRoaXMuX2V4cHJlc3Npb25TdHJpbmcsICcnLCBjb250ZXh0LCBjb250ZXh0KTtcblxuICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2V4dGVuZGVkT2JqZWN0cy5mb3JFYWNoKCh2LCBrKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB0eXBlTmFtZSA9IGBEeW5PYmoke2luZGV4Kyt9YDtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoKDxhbnk+Y29udGV4dClbdHlwZU5hbWVdKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSAoPGFueT5jb250ZXh0KVt0eXBlTmFtZV07XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgY2FuIHVzZSB1bmRlZmluZWQuIERlbGV0ZSBpcyBwcmV0dHkgc2xvd1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBzaiA9IG5ldyBTdHJpbmdKb2luZXIoWydleHByOiddKTtcbiAgICAgICAgc2ouYWRkKCcoJyk7XG4gICAgICAgIHNqLmFkZCh0aGlzLl9leHByZXNzaW9uU3RyaW5nKTtcbiAgICAgICAgc2ouYWRkKCcpJyk7XG5cbiAgICAgICAgcmV0dXJuIHNqLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVmZXJyZWRPcGVyYXRpb25DaGFpbiBleHRlbmRzIER5bmFtaWNQcm9wZXJ0eVZhbHVlIGltcGxlbWVudHMgUHJvcGVydHlNYXBBd2FraW5nXG57XG4gICAgcHJvcGVydHlBd2FraW5nOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lcmdlcjogUHJvcGVydHlNZXJnZXIsIHByaXZhdGUgX29yaWc6IGFueSwgcHJpdmF0ZSBfb3ZlcnJpZGU6IGFueSlcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG5cbiAgICBldmFsdWF0ZShjb250ZXh0OiBDb250ZXh0KTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVyZ2VyLm1lcmdlKGNvbnRleHQucmVzb2x2ZVZhbHVlKHRoaXMuX292ZXJyaWRlKSxcbiAgICAgICAgICAgIGNvbnRleHQucmVzb2x2ZVZhbHVlKHRoaXMuX29yaWcpLFxuICAgICAgICAgICAgY29udGV4dC5pc0RlY2xhcmUoKSk7XG4gICAgfVxuXG5cbiAgICBhd2FrZUZvclByb3BlcnR5TWFwKG1hcDogUHJvcGVydHlNYXApOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBvcmlnID0gdGhpcy5fb3JpZztcbiAgICAgICAgbGV0IG92ZXIgPSB0aGlzLl9vdmVycmlkZTtcblxuICAgICAgICBpZiAoaXNQcm9wZXJ0eU1hcEF3YWtpbmcob3JpZykpIHtcbiAgICAgICAgICAgIG9yaWcgPSAoPFByb3BlcnR5TWFwQXdha2luZz5vcmlnKS5hd2FrZUZvclByb3BlcnR5TWFwKG1hcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJvcGVydHlNYXBBd2FraW5nKG92ZXIpKSB7XG4gICAgICAgICAgICBvdmVyID0gKDxQcm9wZXJ0eU1hcEF3YWtpbmc+b3ZlcikuYXdha2VGb3JQcm9wZXJ0eU1hcChtYXApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcmlnICE9PSB0aGlzLl9vcmlnIHx8IG92ZXIgIT09IHRoaXMuX292ZXJyaWRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERlZmVycmVkT3BlcmF0aW9uQ2hhaW4odGhpcy5fbWVyZ2VyLCBvcmlnLCBvdmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IHNqID0gbmV3IFN0cmluZ0pvaW5lcihbJ0NoYWluJ10pO1xuICAgICAgICBzai5hZGQoJzwnKTtcbiAgICAgICAgc2ouYWRkKHRoaXMuX21lcmdlci50b1N0cmluZygpKTtcbiAgICAgICAgc2ouYWRkKCc+Jyk7XG4gICAgICAgIHNqLmFkZCgnOiAnKTtcbiAgICAgICAgc2ouYWRkKHRoaXMuX292ZXJyaWRlKTtcbiAgICAgICAgc2ouYWRkKCcgPT4gJyk7XG4gICAgICAgIHNqLmFkZCh0aGlzLl9vcmlnKTtcblxuICAgICAgICByZXR1cm4gc2oudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgVmFsdWVDb252ZXJ0ZXJcbntcblxuICAgIHN0YXRpYyB2YWx1ZSh0b1R5cGU6IHN0cmluZywgdmFsdWU6IGFueSk6IGFueVxuICAgIHtcblxuICAgICAgICBpZiAodG9UeXBlID09PSAnU3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsodmFsdWUpIHx8IGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodG9UeXBlID09PSAnQm9vbGVhbicpIHtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHZhbHVlKSB8fCBpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUodmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodG9UeXBlID09PSAnTnVtYmVyJykge1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWdub3JlIGRlYy4gcG9pbnRzIGZvciBub3dcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICB9XG59XG5cbiJdfQ==