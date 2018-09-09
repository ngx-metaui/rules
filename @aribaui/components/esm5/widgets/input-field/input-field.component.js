/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { distinctUntilChanged } from 'rxjs/operators';
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
import { DecimalPipe } from '@angular/common';
/** *
 * This component represent a Input field and it can  accept different types of values such as
 * text, number.
 *
 *
 *
 * ### Example
 *
 * ```typescript
 * \@Component({
 *      selector: 'wrapper-comp' ,
 *      template: '<aw-input-field [value]="inputValue" [type]="inputType"></aw-input-field>'
 *  })
 *  export class TestInputComponent
 *  {
 *      inputValue: string = 'Some text';
 *
 *      // by default input type is text, you can pass string, String, or text
 *      inputType: string = 'string';
 *  }
 *
 * ```
 *
 *
 *
 * ### Example wher input field is initialized with ngModel
 *
 * ```typescript
 * \@Component({
 *      selector: 'wrapper-comp' ,
 *      template: '<aw-input-field [value]="inputValue" [(ngModel)]="inputType"></aw-input-field>'
 *  })
 *  export class TestInputComponent
 *  {
 *      inputValue: string = 'Some text';
 *
 *      // by default input type is text, you can pass string, String, or text
 *      inputType: string = 'string';
 *  }
 *
 * ```
 *
 *  Note: if you are using this outside of FormTable please provide your own FormGroup
 *
  @type {?} */
export var INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return InputFieldComponent; }),
    multi: true
};
var InputFieldComponent = /** @class */ (function (_super) {
    tslib_1.__extends(InputFieldComponent, _super);
    function InputFieldComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         *
         * A value used to save and read  when rendering and updating a component
         *
         */
        _this.value = '';
        /**
         * The formatted decimal value. Uses angular decimalPipe to format based on locale.
         */
        _this.displayValue = '';
        /**
         * Input field type. Currently we support either Number or text
         */
        _this._type = 'string';
        _this.decimalPipe = new DecimalPipe(env.locale);
        return _this;
    }
    Object.defineProperty(InputFieldComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this._type;
        },
        /**
         *
         * generated setter to check for value and normalizing into expected either number or text
         *
         */
        set: /**
         *
         * generated setter to check for value and normalizing into expected either number or text
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value.toLowerCase() === 'string' || value.toLowerCase() === 'text') {
                this._type = 'text';
            }
            else if (value.toLowerCase() === 'number') {
                this._type = 'number';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    InputFieldComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        _super.prototype.registerFormControl.call(this, this.bigDecimal);
        this.vchSubscriber = this.formControl.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe(function (val) {
            _this.value = val;
            _this.onModelChanged(_this.value);
        });
        if (this.bigDecimal) {
            this.displayValue = this.formatNumber(this.bigDecimal.amount);
        }
        else {
            this.displayValue = this.value;
        }
    };
    /**
     * @return {?}
     */
    InputFieldComponent.prototype.canSetType = /**
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    InputFieldComponent.prototype.onKeyDown = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this._type === 'number') {
            this.displayValue = el.value;
            this.onModelChanged(this.displayValue);
        }
    };
    /**
     * @param {?} el
     * @return {?}
     */
    InputFieldComponent.prototype.onBlur = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this._type === 'number') {
            this.bigDecimal = new BigDecimal(Number(el.value));
            this.displayValue = this.formatNumber(this.bigDecimal.amount);
            this.onModelChanged(this.displayValue);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    InputFieldComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.displayValue) {
            this.value = value;
            this.displayValue = '';
            if (this.value) {
                this.displayValue = this.value;
            }
            this.formControl.setValue(value, { onlySelf: true });
        }
    };
    /**
     * Format the number object according to its precision.
     *
     */
    /**
     * Format the number object according to its precision.
     *
     * @param {?} value
     * @return {?}
     */
    InputFieldComponent.prototype.formatNumber = /**
     * Format the number object according to its precision.
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            return '';
        }
        // If precision is present, use it for format the bigDecimal value for display.
        if (isPresent(this.precision) &&
            this._type === 'number') {
            /** @type {?} */
            var digits = '1.0-2';
            digits = '1.0-' + this.precision;
            return this.decimalPipe.transform(value, digits);
        }
        return value;
    };
    /**
     * @return {?}
     */
    InputFieldComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        if (isPresent(this.vchSubscriber)) {
            this.vchSubscriber.unsubscribe();
        }
    };
    InputFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-input-field',
                    template: "<div *ngIf=\"editable\" [formGroup]=\"formGroup\" class=\"w-input-wrapper\">\n\n    <input pInputText\n           #inputFieldValue\n           [attr.name]=\"name\"\n           [attr.type]=\"type\"\n           class=\"w-input-field\"\n           [ngClass]=\"styleClass\"\n           [class.has-icon]=\"icon\"\n           placeholder=\"{{placeHolder}}\"\n           [class.u-validation-error]=\"!(formControl.valid || (formControl.pristine))\"\n           formControlName=\"{{name}}\"\n           (keydown)=\"onKeyDown(inputFieldValue)\"\n           (blur)=\"onBlur(inputFieldValue)\"\n           [value]=\"displayValue\">\n    <span *ngIf=\"icon\" class=\"sap-icon\" [ngClass]=\"icon\"></span>\n</div>\n\n\n<ng-template [ngIf]=\"!editable\">\n    <aw-string [value]=\"displayValue\"></aw-string>\n</ng-template>\n",
                    providers: [
                        INPUT_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return InputFieldComponent; }) }
                    ],
                    styles: [".w-input-wrapper{position:relative}.w-input-field{padding-right:35px}.w-input-field~span{top:13px;position:absolute;right:15px}"]
                }] }
    ];
    /** @nocollapse */
    InputFieldComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return FormRowComponent; }),] }] }
    ]; };
    InputFieldComponent.propDecorators = {
        value: [{ type: Input }],
        precision: [{ type: Input }],
        bigDecimal: [{ type: Input }],
        icon: [{ type: Input }],
        type: [{ type: Input }]
    };
    return InputFieldComponent;
}(BaseFormComponent));
export { InputFieldComponent };
if (false) {
    /**
     *
     * A value used to save and read  when rendering and updating a component
     *
     * @type {?}
     */
    InputFieldComponent.prototype.value;
    /**
     *
     * The number of decimal places used to format the number object.
     *
     * @type {?}
     */
    InputFieldComponent.prototype.precision;
    /**
     * BigDecimal object that encapsulates value and locale.
     * If this object is set, values will be taken from this object
     * @type {?}
     */
    InputFieldComponent.prototype.bigDecimal;
    /**
     * Provide custom icon that is placed into the input field.
     *
     * Todo: add extra binding that will allow developer to tell position, left right
     * @type {?}
     */
    InputFieldComponent.prototype.icon;
    /**
     * The decimal pipe is used to format our number object.
     * @type {?}
     */
    InputFieldComponent.prototype.decimalPipe;
    /**
     * The formatted decimal value. Uses angular decimalPipe to format based on locale.
     * @type {?}
     */
    InputFieldComponent.prototype.displayValue;
    /**
     * Just to clean up subscriber when component is destroyed
     * @type {?}
     */
    InputFieldComponent.prototype.vchSubscriber;
    /**
     * Input field type. Currently we support either Number or text
     * @type {?}
     */
    InputFieldComponent.prototype._type;
    /** @type {?} */
    InputFieldComponent.prototype.env;
    /** @type {?} */
    InputFieldComponent.prototype.parentContainer;
}
/**
 * BigDecimal object is represented as a value, locale, and currencyCode
 */
var /**
 * BigDecimal object is represented as a value, locale, and currencyCode
 */
BigDecimal = /** @class */ (function () {
    function BigDecimal(amount, locale) {
        if (amount === void 0) { amount = 0; }
        if (locale === void 0) { locale = 'en_US'; }
        this.amount = amount;
        this.locale = locale;
    }
    /**
     * @return {?}
     */
    BigDecimal.prototype.getTypes = /**
     * @return {?}
     */
    function () {
        return {
            amount: Number,
            locale: String
        };
    };
    /**
     * @return {?}
     */
    BigDecimal.prototype.className = /**
     * @return {?}
     */
    function () {
        return 'BigDecimal';
    };
    /**
     * @return {?}
     */
    BigDecimal.prototype.$proto = /**
     * @return {?}
     */
    function () {
        return new BigDecimal(1, 'en_US');
    };
    /**
     * @return {?}
     */
    BigDecimal.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this.amount + ', locale: ' + this.locale;
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    BigDecimal.prototype.clone = /**
     * @param {?=} data
     * @return {?}
     */
    function (data) {
        if (data === void 0) { data = {}; }
        return new BigDecimal(isPresent(data.amount) ? data.amount : this.amount, isPresent(data.locale) ? data.locale : this.locale);
    };
    return BigDecimal;
}());
/**
 * BigDecimal object is represented as a value, locale, and currencyCode
 */
export { BigDecimal };
if (false) {
    /** @type {?} */
    BigDecimal.prototype.uniqueName;
    /** @type {?} */
    BigDecimal.prototype.amount;
    /** @type {?} */
    BigDecimal.prototype.locale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvaW5wdXQtZmllbGQvaW5wdXQtZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBRXRGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1ENUMsV0FBYSw0QkFBNEIsR0FBUTtJQUM3QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG1CQUFtQixFQUFuQixDQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUFjdUMsK0NBQWlCO0lBOEN0RCw2QkFBbUIsR0FBZ0IsRUFFYixlQUFrQztRQUZ4RCxZQUlJLGtCQUFNLEdBQUcsRUFBRSxlQUFlLENBQUMsU0FFOUI7UUFOa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUViLHFCQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7O3NCQXZDM0MsRUFBRTs7Ozs2QkErQlEsRUFBRTs7Oztz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LENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDM0Q7cUJBM1JMO0lBNlJDLENBQUE7Ozs7QUF6Q0Qsc0JBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnQsIFZhbHVlfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEZWNpbWFsUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IHJlcHJlc2VudCBhIElucHV0IGZpZWxkIGFuZCBpdCBjYW4gIGFjY2VwdCBkaWZmZXJlbnQgdHlwZXMgb2YgdmFsdWVzIHN1Y2ggYXNcbiAqIHRleHQsIG51bWJlci5cbiAqXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ3dyYXBwZXItY29tcCcgLFxuICogICAgICB0ZW1wbGF0ZTogJzxhdy1pbnB1dC1maWVsZCBbdmFsdWVdPVwiaW5wdXRWYWx1ZVwiIFt0eXBlXT1cImlucHV0VHlwZVwiPjwvYXctaW5wdXQtZmllbGQ+J1xuICogIH0pXG4gKiAgZXhwb3J0IGNsYXNzIFRlc3RJbnB1dENvbXBvbmVudFxuICogIHtcbiAqICAgICAgaW5wdXRWYWx1ZTogc3RyaW5nID0gJ1NvbWUgdGV4dCc7XG4gKlxuICogICAgICAvLyBieSBkZWZhdWx0IGlucHV0IHR5cGUgaXMgdGV4dCwgeW91IGNhbiBwYXNzIHN0cmluZywgU3RyaW5nLCBvciB0ZXh0XG4gKiAgICAgIGlucHV0VHlwZTogc3RyaW5nID0gJ3N0cmluZyc7XG4gKiAgfVxuICpcbiAqIGBgYFxuICpcbiAqXG4gKlxuICogIyMjIEV4YW1wbGUgd2hlciBpbnB1dCBmaWVsZCBpcyBpbml0aWFsaXplZCB3aXRoIG5nTW9kZWxcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiAnd3JhcHBlci1jb21wJyAsXG4gKiAgICAgIHRlbXBsYXRlOiAnPGF3LWlucHV0LWZpZWxkIFt2YWx1ZV09XCJpbnB1dFZhbHVlXCIgWyhuZ01vZGVsKV09XCJpbnB1dFR5cGVcIj48L2F3LWlucHV0LWZpZWxkPidcbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBUZXN0SW5wdXRDb21wb25lbnRcbiAqICB7XG4gKiAgICAgIGlucHV0VmFsdWU6IHN0cmluZyA9ICdTb21lIHRleHQnO1xuICpcbiAqICAgICAgLy8gYnkgZGVmYXVsdCBpbnB1dCB0eXBlIGlzIHRleHQsIHlvdSBjYW4gcGFzcyBzdHJpbmcsIFN0cmluZywgb3IgdGV4dFxuICogICAgICBpbnB1dFR5cGU6IHN0cmluZyA9ICdzdHJpbmcnO1xuICogIH1cbiAqXG4gKiBgYGBcbiAqXG4gKiAgTm90ZTogaWYgeW91IGFyZSB1c2luZyB0aGlzIG91dHNpZGUgb2YgRm9ybVRhYmxlIHBsZWFzZSBwcm92aWRlIHlvdXIgb3duIEZvcm1Hcm91cFxuICpcbiAqL1xuXG5cblxuZXhwb3J0IGNvbnN0IElOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dEZpZWxkQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWlucHV0LWZpZWxkJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2lucHV0LWZpZWxkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnaW5wdXQtZmllbGQuY29tcG9uZW50LnNjc3MnXSxcblxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBJTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXRGaWVsZENvbXBvbmVudCl9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQSB2YWx1ZSB1c2VkIHRvIHNhdmUgYW5kIHJlYWQgIHdoZW4gcmVuZGVyaW5nIGFuZCB1cGRhdGluZyBhIGNvbXBvbmVudFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdXNlZCB0byBmb3JtYXQgdGhlIG51bWJlciBvYmplY3QuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHByZWNpc2lvbjogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQmlnRGVjaW1hbCBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdmFsdWUgYW5kIGxvY2FsZS5cbiAgICAgKiBJZiB0aGlzIG9iamVjdCBpcyBzZXQsIHZhbHVlcyB3aWxsIGJlIHRha2VuIGZyb20gdGhpcyBvYmplY3RcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJpZ0RlY2ltYWw6IEJpZ0RlY2ltYWw7XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlIGN1c3RvbSBpY29uIHRoYXQgaXMgcGxhY2VkIGludG8gdGhlIGlucHV0IGZpZWxkLlxuICAgICAqXG4gICAgICogVG9kbzogYWRkIGV4dHJhIGJpbmRpbmcgdGhhdCB3aWxsIGFsbG93IGRldmVsb3BlciB0byB0ZWxsIHBvc2l0aW9uLCBsZWZ0IHJpZ2h0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpY29uOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGRlY2ltYWwgcGlwZSBpcyB1c2VkIHRvIGZvcm1hdCBvdXIgbnVtYmVyIG9iamVjdC5cbiAgICAgKi9cbiAgICBkZWNpbWFsUGlwZTogRGVjaW1hbFBpcGU7XG4gICAgLyoqXG4gICAgICogVGhlIGZvcm1hdHRlZCBkZWNpbWFsIHZhbHVlLiBVc2VzIGFuZ3VsYXIgZGVjaW1hbFBpcGUgdG8gZm9ybWF0IGJhc2VkIG9uIGxvY2FsZS5cbiAgICAgKi9cbiAgICBkaXNwbGF5VmFsdWU6IHN0cmluZyA9ICcnO1xuICAgIC8qKlxuICAgICAqIEp1c3QgdG8gY2xlYW4gdXAgc3Vic2NyaWJlciB3aGVuIGNvbXBvbmVudCBpcyBkZXN0cm95ZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIHZjaFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5kZWNpbWFsUGlwZSA9IG5ldyBEZWNpbWFsUGlwZShlbnYubG9jYWxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnB1dCBmaWVsZCB0eXBlLiBDdXJyZW50bHkgd2Ugc3VwcG9ydCBlaXRoZXIgTnVtYmVyIG9yIHRleHRcbiAgICAgKi9cbiAgICBwcml2YXRlIF90eXBlOiBzdHJpbmcgPSAnc3RyaW5nJztcblxuICAgIGdldCB0eXBlKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBnZW5lcmF0ZWQgc2V0dGVyIHRvIGNoZWNrIGZvciB2YWx1ZSBhbmQgbm9ybWFsaXppbmcgaW50byBleHBlY3RlZCBlaXRoZXIgbnVtYmVyIG9yIHRleHRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHR5cGUodmFsdWU6IHN0cmluZylcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAnc3RyaW5nJyB8fCB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3R5cGUgPSAndGV4dCc7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuX3R5cGUgPSAnbnVtYmVyJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy5iaWdEZWNpbWFsKTtcblxuICAgICAgICB0aGlzLnZjaFN1YnNjcmliZXIgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYmlnRGVjaW1hbCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmZvcm1hdE51bWJlcih0aGlzLmJpZ0RlY2ltYWwuYW1vdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhblNldFR5cGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGVsOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fdHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gZWwudmFsdWU7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMuZGlzcGxheVZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQmx1cihlbDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmJpZ0RlY2ltYWwgPSBuZXcgQmlnRGVjaW1hbChOdW1iZXIoZWwudmFsdWUpKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5mb3JtYXROdW1iZXIodGhpcy5iaWdEZWNpbWFsLmFtb3VudCk7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMuZGlzcGxheVZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5kaXNwbGF5VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUsIHtvbmx5U2VsZjogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IHRoZSBudW1iZXIgb2JqZWN0IGFjY29yZGluZyB0byBpdHMgcHJlY2lzaW9uLlxuICAgICAqXG4gICAgICovXG4gICAgZm9ybWF0TnVtYmVyKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBwcmVjaXNpb24gaXMgcHJlc2VudCwgdXNlIGl0IGZvciBmb3JtYXQgdGhlIGJpZ0RlY2ltYWwgdmFsdWUgZm9yIGRpc3BsYXkuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5wcmVjaXNpb24pICYmXG4gICAgICAgICAgICB0aGlzLl90eXBlID09PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVGhlIGRlZmF1bHQgcHJlY2lzaW9uIGlzIDIuIEZvciBleGFtcGxlLCAxMC4yMy5cbiAgICAgICAgICAgIGxldCBkaWdpdHMgPSAnMS4wLTInO1xuICAgICAgICAgICAgZGlnaXRzID0gJzEuMC0nICsgdGhpcy5wcmVjaXNpb247XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNpbWFsUGlwZS50cmFuc2Zvcm0odmFsdWUsIGRpZ2l0cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnZjaFN1YnNjcmliZXIpKSB7XG4gICAgICAgICAgICB0aGlzLnZjaFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBCaWdEZWNpbWFsIG9iamVjdCBpcyByZXByZXNlbnRlZCBhcyBhIHZhbHVlLCBsb2NhbGUsIGFuZCBjdXJyZW5jeUNvZGVcbiAqL1xuZXhwb3J0IGNsYXNzIEJpZ0RlY2ltYWwgaW1wbGVtZW50cyBWYWx1ZVxue1xuICAgIHVuaXF1ZU5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhbW91bnQ6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGxvY2FsZTogc3RyaW5nID0gJ2VuX1VTJylcbiAgICB7XG4gICAgfVxuXG5cbiAgICBnZXRUeXBlcygpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbW91bnQ6IE51bWJlcixcbiAgICAgICAgICAgIGxvY2FsZTogU3RyaW5nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuICdCaWdEZWNpbWFsJztcbiAgICB9XG5cbiAgICAkcHJvdG8oKTogQmlnRGVjaW1hbFxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdEZWNpbWFsKDEsICdlbl9VUycpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW1vdW50ICsgJywgbG9jYWxlOiAnICsgdGhpcy5sb2NhbGU7XG4gICAgfVxuXG5cbiAgICBjbG9uZShkYXRhOiB7IGFtb3VudD86IG51bWJlciwgbG9jYWxlPzogc3RyaW5nIH0gPSB7fSk6IEJpZ0RlY2ltYWxcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgQmlnRGVjaW1hbChcbiAgICAgICAgICAgIGlzUHJlc2VudChkYXRhLmFtb3VudCkgPyBkYXRhLmFtb3VudCA6IHRoaXMuYW1vdW50LFxuICAgICAgICAgICAgaXNQcmVzZW50KGRhdGEubG9jYWxlKSA/IGRhdGEubG9jYWxlIDogdGhpcy5sb2NhbGUpO1xuICAgIH1cblxufVxuXG4iXX0=