/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, forwardRef, Host, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { BooleanWrapper, Environment, isPresent } from '@aribaui/core';
import { FormRowComponent } from '@aribaui/components';
import { MetaContextComponent } from '../../../core/meta-context/meta-context.component';
import { UIMeta } from '../../../core/uimeta';
import { MetaBaseComponent } from '../../meta.base.component';
/**
 * Component responsible for rendering a row using MetaIncludeComponent.
 * What I am still not sure, if I want to use fully validation from MetaRule and if I cannot
 * leverage basic validation from angular.
 *
 * Meaning I might remove default valid::** rule from WidgetsRules and when its required insert
 * default Required validation from angular.
 *
 */
var MetaFormRowComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MetaFormRowComponent, _super);
    function MetaFormRowComponent(_metaContext, env) {
        var _this = _super.call(this, env, _metaContext) || this;
        _this._metaContext = _metaContext;
        _this.env = env;
        /**
         * There could be special cases when we are layout component that we want to extends the row
         * 100%.
         */
        _this.initialSize = 'medium';
        return _this;
    }
    /**
     * @return {?}
     */
    MetaFormRowComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.validators = this.createValidators();
    };
    /**
     * @param {?} key
     * @return {?}
     */
    MetaFormRowComponent.prototype.bindingBoolProperty = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var bindings = this.context.propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) && bindings.has(key)) {
            /** @type {?} */
            var value = bindings.get(key);
            return BooleanWrapper.boleanValue(value);
        }
        return false;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    MetaFormRowComponent.prototype.bindingStringProperty = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var bindings = this.context.propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) && bindings.has(key)) {
            return bindings.get(key);
        }
        return null;
    };
    Object.defineProperty(MetaFormRowComponent.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var bindings = this.context.propertyForKey(UIMeta.KeyBindings);
            if (isPresent(bindings) && bindings.has('size')) {
                return bindings.get('size');
            }
            return this.initialSize;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.initialSize = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates angular based Validator which for a current field executes validation rules real
     * time as use type. At the bottom of the file there is example of async validator
     *
     * @return {?}
     */
    MetaFormRowComponent.prototype.createValidators = /**
     * Creates angular based Validator which for a current field executes validation rules real
     * time as use type. At the bottom of the file there is example of async validator
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var that = this;
        /** @type {?} */
        var metaValidator = function (control) {
            if (isPresent(Validators.required(control)) || !control.touched) {
                return null;
            }
            /** @type {?} */
            var errorMsg = UIMeta.validationError(that.context);
            return isPresent(errorMsg) ? {
                'metavalid': { 'msg': errorMsg }
            } : null;
        };
        return [metaValidator];
    };
    /**
     * @return {?}
     */
    MetaFormRowComponent.prototype.isRequired = /**
     * @return {?}
     */
    function () {
        return (isPresent(this.editing) && this.context.booleanPropertyForKey('required', false));
    };
    MetaFormRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'm-form-row',
                    template: "<aw-form-row\n    [editable]=\"editable\"\n    [customValidators]=\"validators\"\n    [isNestedLayout]=\"properties('nestedLayout', false)\"\n    [size]=\"size\"\n    [hidden]=\"!properties('visible')\"\n    [styleClass]=\"bindingStringProperty('styleClass')\"\n    [name]=\"properties('field')\"\n    [required]=\"isRequired()\"\n    [label]=\"properties('label')\"\n    [noLabelLayout]=\"bindingBoolProperty('useNoLabelLayout')\">\n\n    <m-include-component></m-include-component>\n</aw-form-row>\n\n",
                    providers: [
                        { provide: FormRowComponent, useExisting: forwardRef(function () { return MetaFormRowComponent; }) }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    MetaFormRowComponent.ctorParameters = function () { return [
        { type: MetaContextComponent, decorators: [{ type: Host }] },
        { type: Environment }
    ]; };
    MetaFormRowComponent.propDecorators = {
        field: [{ type: Input }],
        initialSize: [{ type: Input }]
    };
    return MetaFormRowComponent;
}(MetaBaseComponent));
export { MetaFormRowComponent };
if (false) {
    /** @type {?} */
    MetaFormRowComponent.prototype.field;
    /**
     * There could be special cases when we are layout component that we want to extends the row
     * 100%.
     * @type {?}
     */
    MetaFormRowComponent.prototype.initialSize;
    /**
     * Cached validatos
     * @type {?}
     */
    MetaFormRowComponent.prototype.validators;
    /** @type {?} */
    MetaFormRowComponent.prototype._metaContext;
    /** @type {?} */
    MetaFormRowComponent.prototype.env;
}
/*

 return new Promise((resolve) => {
 setTimeout (()=>{

 let context: UIContext = <UIContext> this._contextSnapshot.hydrate();
 context.value = control.value;

 let errorMsg = UIMeta.validationError(context);


 if(isPresent(errorMsg)) {
 resolve({metavalid: {msg: errorMsg}});
 } else{
 resolve(null);
 }

 }, 700);
 });


 */
// metaValid (): AsyncValidatorFn[]
// {
//     let metaValidator = (control: AbstractControl): {[key: string]: any} =>
//     {
//         return new Promise((resolve) =>
//         {
//             setTimeout(()=>
//             {
//                 let context: UIContext = <UIContext> this._contextSnapshot.hydrate();
//                 context.value = control.value;
//
//                 let errorMsg = UIMeta.validationError(context);
//
//
//                 if (isPresent(errorMsg)) {
//                     resolve({metavalid: {msg: errorMsg}});
//                 } else {
//                     resolve(null);
//                 }
//
//             } , 400);
//         });
//     };
//     return [metaValidator];
// }

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1mb3JtLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1mb3JtL21ldGEtZm9ybS1yb3cvbWV0YS1mb3JtLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFtQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQStCLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUN2RixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7Ozs7O0lBcUJsQixnREFBaUI7SUFvQnZELDhCQUE4QixZQUFrQyxFQUFTLEdBQWdCO1FBQXpGLFlBRUksa0JBQU0sR0FBRyxFQUFFLFlBQVksQ0FBQyxTQUMzQjtRQUg2QixrQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhOzs7Ozs0QkFSbkUsUUFBUTs7S0FXN0I7Ozs7SUFHRCx1Q0FBUTs7O0lBQVI7UUFFSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQzdDOzs7OztJQUVELGtEQUFtQjs7OztJQUFuQixVQUFvQixHQUFXOztRQUUzQixJQUFJLFFBQVEsR0FBcUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxj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QyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBmb3J3YXJkUmVmLCBIb3N0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Qm9vbGVhbldyYXBwZXIsIEVudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7TWV0YUNvbnRleHRDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uLy4uLy4uL2NvcmUvdWltZXRhJztcbmltcG9ydCB7TWV0YUJhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL21ldGEuYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqIENvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIGEgcm93IHVzaW5nIE1ldGFJbmNsdWRlQ29tcG9uZW50LlxuICogV2hhdCBJIGFtIHN0aWxsIG5vdCBzdXJlLCBpZiBJIHdhbnQgdG8gdXNlIGZ1bGx5IHZhbGlkYXRpb24gZnJvbSBNZXRhUnVsZSBhbmQgaWYgSSBjYW5ub3RcbiAqIGxldmVyYWdlIGJhc2ljIHZhbGlkYXRpb24gZnJvbSBhbmd1bGFyLlxuICpcbiAqIE1lYW5pbmcgSSBtaWdodCByZW1vdmUgZGVmYXVsdCB2YWxpZDo6KiogcnVsZSBmcm9tIFdpZGdldHNSdWxlcyBhbmQgd2hlbiBpdHMgcmVxdWlyZWQgaW5zZXJ0XG4gKiBkZWZhdWx0IFJlcXVpcmVkIHZhbGlkYXRpb24gZnJvbSBhbmd1bGFyLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtLWZvcm0tcm93JyxcbiAgICB0ZW1wbGF0ZVVybDogJ21ldGEtZm9ybS1yb3cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydtZXRhLWZvcm0tcm93LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG5cbiAgICAgICAge3Byb3ZpZGU6IEZvcm1Sb3dDb21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1ldGFGb3JtUm93Q29tcG9uZW50KX1cbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUZvcm1Sb3dDb21wb25lbnQgZXh0ZW5kcyBNZXRhQmFzZUNvbXBvbmVudFxue1xuXG4gICAgQElucHV0KClcbiAgICBmaWVsZDogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGVyZSBjb3VsZCBiZSBzcGVjaWFsIGNhc2VzIHdoZW4gd2UgYXJlIGxheW91dCBjb21wb25lbnQgdGhhdCB3ZSB3YW50IHRvIGV4dGVuZHMgdGhlIHJvd1xuICAgICAqIDEwMCUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbml0aWFsU2l6ZTogc3RyaW5nID0gJ21lZGl1bSc7XG5cbiAgICAvKipcbiAgICAgKiBDYWNoZWQgdmFsaWRhdG9zXG4gICAgICovXG4gICAgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXTtcblxuXG4gICAgY29uc3RydWN0b3IoQEhvc3QoKSBwcm90ZWN0ZWQgX21ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudCwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIF9tZXRhQ29udGV4dCk7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvcnMgPSB0aGlzLmNyZWF0ZVZhbGlkYXRvcnMoKTtcbiAgICB9XG5cbiAgICBiaW5kaW5nQm9vbFByb3BlcnR5KGtleTogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGJpbmRpbmdzOiBNYXA8c3RyaW5nLCBhbnk+ID0gdGhpcy5jb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlCaW5kaW5ncyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChiaW5kaW5ncykgJiYgYmluZGluZ3MuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJpbmRpbmdzLmdldChrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKHZhbHVlKTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIGJpbmRpbmdTdHJpbmdQcm9wZXJ0eShrZXk6IHN0cmluZyk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IGJpbmRpbmdzOiBNYXA8c3RyaW5nLCBhbnk+ID0gdGhpcy5jb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlCaW5kaW5ncyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChiaW5kaW5ncykgJiYgYmluZGluZ3MuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBiaW5kaW5ncy5nZXQoa2V5KTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgZ2V0IHNpemUoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgYmluZGluZ3M6IE1hcDxzdHJpbmcsIGFueT4gPSB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGJpbmRpbmdzKSAmJiBiaW5kaW5ncy5oYXMoJ3NpemUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzLmdldCgnc2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluaXRpYWxTaXplO1xuICAgIH1cblxuICAgIHNldCBzaXplKHZhbHVlOiBzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLmluaXRpYWxTaXplID0gdmFsdWU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZ3VsYXIgYmFzZWQgVmFsaWRhdG9yIHdoaWNoIGZvciBhIGN1cnJlbnQgZmllbGQgZXhlY3V0ZXMgdmFsaWRhdGlvbiBydWxlcyByZWFsXG4gICAgICogdGltZSBhcyB1c2UgdHlwZS4gQXQgdGhlIGJvdHRvbSBvZiB0aGUgZmlsZSB0aGVyZSBpcyBleGFtcGxlIG9mIGFzeW5jIHZhbGlkYXRvclxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVWYWxpZGF0b3JzKCk6IFZhbGlkYXRvckZuW11cbiAgICB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IG1ldGFWYWxpZGF0b3IgPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KFZhbGlkYXRvcnMucmVxdWlyZWQoY29udHJvbCkpIHx8ICFjb250cm9sLnRvdWNoZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGVycm9yTXNnID0gVUlNZXRhLnZhbGlkYXRpb25FcnJvcih0aGF0LmNvbnRleHQpO1xuICAgICAgICAgICAgcmV0dXJuIGlzUHJlc2VudChlcnJvck1zZykgPyB7XG4gICAgICAgICAgICAgICAgJ21ldGF2YWxpZCc6IHsnbXNnJzogZXJyb3JNc2d9XG4gICAgICAgICAgICB9IDogbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gW21ldGFWYWxpZGF0b3JdO1xuICAgIH1cblxuICAgIGlzUmVxdWlyZWQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQodGhpcy5lZGl0aW5nKSAmJiB0aGlzLmNvbnRleHQuYm9vbGVhblByb3BlcnR5Rm9yS2V5KCdyZXF1aXJlZCcsIGZhbHNlKSk7XG4gICAgfVxuXG59XG5cblxuLypcblxuIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuIHNldFRpbWVvdXQgKCgpPT57XG5cbiBsZXQgY29udGV4dDogVUlDb250ZXh0ID0gPFVJQ29udGV4dD4gdGhpcy5fY29udGV4dFNuYXBzaG90Lmh5ZHJhdGUoKTtcbiBjb250ZXh0LnZhbHVlID0gY29udHJvbC52YWx1ZTtcblxuIGxldCBlcnJvck1zZyA9IFVJTWV0YS52YWxpZGF0aW9uRXJyb3IoY29udGV4dCk7XG5cblxuIGlmKGlzUHJlc2VudChlcnJvck1zZykpIHtcbiByZXNvbHZlKHttZXRhdmFsaWQ6IHttc2c6IGVycm9yTXNnfX0pO1xuIH0gZWxzZXtcbiByZXNvbHZlKG51bGwpO1xuIH1cblxuIH0sIDcwMCk7XG4gfSk7XG5cblxuICovXG5cblxuLy8gbWV0YVZhbGlkICgpOiBBc3luY1ZhbGlkYXRvckZuW11cbi8vIHtcbi8vICAgICBsZXQgbWV0YVZhbGlkYXRvciA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSA9PlxuLy8gICAgIHtcbi8vICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PlxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT5cbi8vICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICBsZXQgY29udGV4dDogVUlDb250ZXh0ID0gPFVJQ29udGV4dD4gdGhpcy5fY29udGV4dFNuYXBzaG90Lmh5ZHJhdGUoKTtcbi8vICAgICAgICAgICAgICAgICBjb250ZXh0LnZhbHVlID0gY29udHJvbC52YWx1ZTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgbGV0IGVycm9yTXNnID0gVUlNZXRhLnZhbGlkYXRpb25FcnJvcihjb250ZXh0KTtcbi8vXG4vL1xuLy8gICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoZXJyb3JNc2cpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe21ldGF2YWxpZDoge21zZzogZXJyb3JNc2d9fSk7XG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgfSAsIDQwMCk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH07XG4vLyAgICAgcmV0dXJuIFttZXRhVmFsaWRhdG9yXTtcbi8vIH1cbiJdfQ==