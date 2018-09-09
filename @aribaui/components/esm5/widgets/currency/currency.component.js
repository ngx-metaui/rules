/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, equals, isBlank, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/** *
 * Lightweight and configurable Currency component based on the ng bootstrap directive. This
 * component combines an input and currency code dropdown.
 *
 *
 * for more info please see class Doc of the:
 * @see {\@link currency/currency.component.ts}
 *
 *  ### Example
 *  ```
 *
 * \@Component({
 *    selector: 'amount' ,
 *    template: `
 *
 *      <aw-currency [money]="price" [currencies]="currencies" [name]="'currency'">
 *      </aw-currency>
 *
 *    `
 *    })
 *    export class MyComponent
 *    {
 *        amount: number = 1000;
 *        currencies: string[] = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
 *        currencyCode: string = this.currencies[0];
 *
 *        constructor ()
 *        {
 *        }
 *    }
  @type {?} */
export var CURRENCY_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CurrencyComponent; }),
    multi: true
};
var CurrencyComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CurrencyComponent, _super);
    function CurrencyComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         * Disable user to change Money's currency code and still
         * allow user to edit Money's amount.
         */
        _this.readonlyCurrencyCode = false;
        // Initialize currencies.
        // Initialize currencies.
        _this.initCurrencies();
        _this.currencyPipe = new CurrencyPipe(env.locale);
        env.onLocaleChange.subscribe(function (locale) {
            _this.currencyPipe = new CurrencyPipe(locale);
            if (isPresent(_this.money)) {
                _this.displayValue = _this.formatCurrency(_this.money.amount);
            }
        });
        return _this;
    }
    /**
     * @return {?}
     */
    CurrencyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        _super.prototype.registerFormControl.call(this, this.money);
        this.initCurrencies();
        if (isBlank(this.currencySelection)) {
            this.currencySelection = this._currencies[0];
        }
        // ready the money field if it exists. and override the existing values.
        if (this.money) {
            this.currencySelection = this.money.currency;
        }
        else {
            this.money = new Money(null, this.currencySelection);
        }
        this.displayValue = this.formatCurrency(this.money.amount);
    };
    /**
     * @return {?}
     */
    CurrencyComponent.prototype.initCurrencies = /**
     * @return {?}
     */
    function () {
        if (!this._currencies || this._currencies.length === 0) {
            this._currencies = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
        }
    };
    /**
     * Display the real value when the user clicks in the currency widget. Then he can modify the
     * value without seeing the formatting.
     *
     * @param el
     */
    /**
     * Display the real value when the user clicks in the currency widget. Then he can modify the
     * value without seeing the formatting.
     *
     * @param {?} el
     * @return {?}
     */
    CurrencyComponent.prototype.onFocus = /**
     * Display the real value when the user clicks in the currency widget. Then he can modify the
     * value without seeing the formatting.
     *
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (isPresent(this.money) && isPresent(this.money.amount)) {
            this.displayValue = this.money.amount.toString();
        }
    };
    /**
     * display the formatted currency value when the user navigates away.
     * @param el
     */
    /**
     * display the formatted currency value when the user navigates away.
     * @param {?} el
     * @return {?}
     */
    CurrencyComponent.prototype.onBlur = /**
     * display the formatted currency value when the user navigates away.
     * @param {?} el
     * @return {?}
     */
    function (el) {
        this.money = this.money.clone({ amount: Number(el.value) });
        this.displayValue = this.formatCurrency(this.money.amount);
        this.onModelChanged(this.money);
    };
    /**
     * @param {?} currency
     * @return {?}
     */
    CurrencyComponent.prototype.onSelection = /**
     * @param {?} currency
     * @return {?}
     */
    function (currency) {
        this.currencySelection = currency;
        this.displayValue = this.formatCurrency(this.money.amount);
    };
    /**
     * Function will check to see if currency is a valid number before formatting.
     * @param {?} val
     * @return {?}
     */
    CurrencyComponent.prototype.formatCurrency = /**
     * Function will check to see if currency is a valid number before formatting.
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (!val || val.length === 0) {
            return val;
        }
        if (isNaN(val)) {
            return val;
        }
        /** @type {?} */
        var code = 'USD';
        if (this.currencySelection) {
            code = this.currencySelection;
        }
        this.money = this.money.clone({ currency: this.currencySelection });
        /** @type {?} */
        var digits = '1.0-2';
        // If precision is present, use it for format the money value for display.
        if (isPresent(this.precision)) {
            digits = '1.0-' + this.precision;
        }
        return this.currencyPipe.transform(val, code, 'symbol', digits);
    };
    /**
     * @return {?}
     */
    CurrencyComponent.prototype.getMoneyCurrency = /**
     * @return {?}
     */
    function () {
        if (isPresent(this.displayValue) && this.displayValue.length > 0) {
            return this.currencySelection;
        }
        return '';
    };
    Object.defineProperty(CurrencyComponent.prototype, "currencies", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currencies;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isPresent(value)) {
                this._currencies = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    CurrencyComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if ((value instanceof Money) && !equals(value, this.money)) {
            this.money = value;
            if (isPresent(this.money.currency)) {
                this.currencySelection = this.money.currency;
            }
            this.displayValue = this.formatCurrency(this.money.amount);
            this.formControl.setValue(this.money);
        }
    };
    CurrencyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-currency',
                    template: "<ng-template [ngIf]=\"editable\">\n    <div class=\"w-currency-field ui-fluid\" [formGroup]=\"formGroup\">\n        <div class=\"ui-g \">\n            <div class=\"ui-g-8 ui-g-nopad \">\n                <input #currencyInput\n                       pInputText\n                       type=\"text\" class=\"w-text-field currency-format\"\n                       [attr.name]=\"name\"\n                       [attr.placeholder]=\"placeHolder\"\n                       [value]=\"displayValue\"\n                       (focus)=\"onFocus(currencyInput)\"\n                       (blur)=\"onBlur(currencyInput)\"\n                       [disabled]=\"disabled\">\n            </div>\n            <div class=\"ui-g-4 ui-g-nopad w-cc-field\">\n                <aw-dropdown *ngIf=\"!readonlyCurrencyCode\"\n                             [isStandalone]=\"false\" [list]=\"currencies\"\n                             [selection]=\"money.currency\"\n                             (onSelection)=\"onSelection($event)\"\n                             [disabled]=\"disabled\">\n\n                </aw-dropdown>\n                <div *ngIf=\"readonlyCurrencyCode\" class=\"w-cc-readonly-field\">{{money.currency}}</div>\n            </div>\n        </div>\n    </div>\n</ng-template>\n\n<!-- currency:'USD':true -->\n\n<ng-template [ngIf]=\"!editable\">\n    <aw-string value=\"{{displayValue}} {{ getMoneyCurrency() }}\"></aw-string>\n</ng-template>\n",
                    providers: [
                        CURRENCY_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return CurrencyComponent; }) }
                    ],
                    styles: [".w-currency-field [readonly],.w-currency-type-field [readonly]{background-color:#fff}.w-currency-field input,.w-currency-type-field input{min-width:80px}.w-currency-field i.fa,.w-currency-type-field i.fa{cursor:pointer}.w-currency-field{margin-top:0}.w-currency-field /deep/ .ui-dropdown{min-width:80px}.w-cc-field{display:flex;align-items:center}.w-cc-readonly-field{padding-left:5px;color:#969696}.no-gutter>[class*=ui-g-]{padding-right:0;padding-left:0}"]
                }] }
    ];
    /** @nocollapse */
    CurrencyComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return FormRowComponent; }),] }] }
    ]; };
    CurrencyComponent.propDecorators = {
        money: [{ type: Input }],
        readonlyCurrencyCode: [{ type: Input }],
        currencySelection: [{ type: Input }],
        precision: [{ type: Input }],
        currencies: [{ type: Input }]
    };
    return CurrencyComponent;
}(BaseFormComponent));
export { CurrencyComponent };
if (false) {
    /**
     * Money object that encapsulates value, locale, currency code.
     * If this object is set, values will be taken from this object
     * @type {?}
     */
    CurrencyComponent.prototype.money;
    /**
     * Disable user to change Money's currency code and still
     * allow user to edit Money's amount.
     * @type {?}
     */
    CurrencyComponent.prototype.readonlyCurrencyCode;
    /**
     * The currency that's selected for this currency field.
     * @type {?}
     */
    CurrencyComponent.prototype.currencySelection;
    /**
     *
     * The number of decimal places used to format the money object.
     *
     * @type {?}
     */
    CurrencyComponent.prototype.precision;
    /**
     * List of currencies that this currency widget support. The format for each entry should be
     * [currency-code - description]
     * @type {?}
     */
    CurrencyComponent.prototype._currencies;
    /**
     * The formatted currency value. Uses angular currencyPipe to format based on country code.
     * @type {?}
     */
    CurrencyComponent.prototype.displayValue;
    /**
     * The currency pipe is used to format our money object.
     * @type {?}
     */
    CurrencyComponent.prototype.currencyPipe;
    /** @type {?} */
    CurrencyComponent.prototype.env;
    /** @type {?} */
    CurrencyComponent.prototype.parentContainer;
}
/**
 * Money object is represented as a value, locale, and currencyCode
 */
var /**
 * Money object is represented as a value, locale, and currencyCode
 */
Money = /** @class */ (function () {
    function Money(amount, currency, locale) {
        if (amount === void 0) { amount = 0; }
        if (currency === void 0) { currency = 'USD'; }
        if (locale === void 0) { locale = 'en_US'; }
        this.amount = amount;
        this.currency = currency;
        this.locale = locale;
    }
    /**
     * @return {?}
     */
    Money.prototype.getTypes = /**
     * @return {?}
     */
    function () {
        return {
            amount: Number,
            currency: String,
            locale: String
        };
    };
    /**
     * @return {?}
     */
    Money.prototype.className = /**
     * @return {?}
     */
    function () {
        return 'Money';
    };
    /**
     * @return {?}
     */
    Money.prototype.$proto = /**
     * @return {?}
     */
    function () {
        return new Money(1, '23', '33');
    };
    /**
     * @return {?}
     */
    Money.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this.amount + ', locale: ' + this.locale + ', code:  ' + this.currency;
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    Money.prototype.clone = /**
     * @param {?=} data
     * @return {?}
     */
    function (data) {
        if (data === void 0) { data = {}; }
        return new Money(isPresent(data.amount) ? data.amount : this.amount, isPresent(data.currency) ? data.currency : this.currency, isPresent(data.locale) ? data.locale : this.locale);
    };
    return Money;
}());
/**
 * Money object is represented as a value, locale, and currencyCode
 */
export { Money };
if (false) {
    /** @type {?} */
    Money.prototype.uniqueName;
    /** @type {?} */
    Money.prototype.amount;
    /** @type {?} */
    Money.prototype.currency;
    /** @type {?} */
    Money.prototype.locale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY3VycmVuY3kvY3VycmVuY3kuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtDdEYsV0FBYSwrQkFBK0IsR0FBUTtJQUNoRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUFhcUMsNkNBQWlCO0lBK0NwRCwyQkFBbUIsR0FBZ0IsRUFFYixlQUFrQztRQUZ4RCxZQUlJLGtCQUFNLEdBQUcsRUFBRSxlQUFlLENBQUMsU0FlOUI7UUFuQmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7O3FDQW5DeEIsS0FBSzs7UUF3Q2pDLEFBREEseUJBQXlCO1FBQ3pCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixLQUFJLENBQUMs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LENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ2xELFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ3hELFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQ3JELENBQUM7S0FDTDtnQkE1U0w7SUE4U0MsQ0FBQTs7OztBQTVDRCxpQkE0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q3VycmVuY3lQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgZXF1YWxzLCBpc0JsYW5rLCBpc1ByZXNlbnQsIFZhbHVlfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuXG4vKipcbiAqIExpZ2h0d2VpZ2h0IGFuZCBjb25maWd1cmFibGUgQ3VycmVuY3kgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBuZyBib290c3RyYXAgZGlyZWN0aXZlLiBUaGlzXG4gKiBjb21wb25lbnQgY29tYmluZXMgYW4gaW5wdXQgYW5kIGN1cnJlbmN5IGNvZGUgZHJvcGRvd24uXG4gKlxuICpcbiAqIGZvciBtb3JlIGluZm8gcGxlYXNlIHNlZSBjbGFzcyBEb2Mgb2YgdGhlOlxuICogIEBzZWUge0BsaW5rIGN1cnJlbmN5L2N1cnJlbmN5LmNvbXBvbmVudC50c31cbiAqXG4gKiAgIyMjIEV4YW1wbGVcbiAqICBgYGBcbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ2Ftb3VudCcgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqXG4gKiAgICAgIDxhdy1jdXJyZW5jeSBbbW9uZXldPVwicHJpY2VcIiBbY3VycmVuY2llc109XCJjdXJyZW5jaWVzXCIgW25hbWVdPVwiJ2N1cnJlbmN5J1wiPlxuICogICAgICA8L2F3LWN1cnJlbmN5PlxuICpcbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlDb21wb25lbnRcbiAqICAgIHtcbiAqICAgICAgICBhbW91bnQ6IG51bWJlciA9IDEwMDA7XG4gKiAgICAgICAgY3VycmVuY2llczogc3RyaW5nW10gPSBbJ1VTRCcsICdDTlknLCAnQVVEJywgJ0VVUicsICdHQlAnXTtcbiAqICAgICAgICBjdXJyZW5jeUNvZGU6IHN0cmluZyA9IHRoaXMuY3VycmVuY2llc1swXTtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICogICAgfVxuICovXG5cbmV4cG9ydCBjb25zdCBDVVJSRU5DWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ3VycmVuY3lDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctY3VycmVuY3knLFxuICAgIHRlbXBsYXRlVXJsOiAnY3VycmVuY3kuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjdXJyZW5jeS5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDVVJSRU5DWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEN1cnJlbmN5Q29tcG9uZW50KX1cbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVuY3lDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqIE1vbmV5IG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB2YWx1ZSwgbG9jYWxlLCBjdXJyZW5jeSBjb2RlLlxuICAgICAqIElmIHRoaXMgb2JqZWN0IGlzIHNldCwgdmFsdWVzIHdpbGwgYmUgdGFrZW4gZnJvbSB0aGlzIG9iamVjdFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbW9uZXk6IE1vbmV5O1xuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSB1c2VyIHRvIGNoYW5nZSBNb25leSdzIGN1cnJlbmN5IGNvZGUgYW5kIHN0aWxsXG4gICAgICogYWxsb3cgdXNlciB0byBlZGl0IE1vbmV5J3MgYW1vdW50LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHlDdXJyZW5jeUNvZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW5jeSB0aGF0J3Mgc2VsZWN0ZWQgZm9yIHRoaXMgY3VycmVuY3kgZmllbGQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjdXJyZW5jeVNlbGVjdGlvbjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHVzZWQgdG8gZm9ybWF0IHRoZSBtb25leSBvYmplY3QuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHByZWNpc2lvbjogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBjdXJyZW5jaWVzIHRoYXQgdGhpcyBjdXJyZW5jeSB3aWRnZXQgc3VwcG9ydC4gVGhlIGZvcm1hdCBmb3IgZWFjaCBlbnRyeSBzaG91bGQgYmVcbiAgICAgKiBbY3VycmVuY3ktY29kZSAtIGRlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIF9jdXJyZW5jaWVzOiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogVGhlIGZvcm1hdHRlZCBjdXJyZW5jeSB2YWx1ZS4gVXNlcyBhbmd1bGFyIGN1cnJlbmN5UGlwZSB0byBmb3JtYXQgYmFzZWQgb24gY291bnRyeSBjb2RlLlxuICAgICAqL1xuICAgIGRpc3BsYXlWYWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbmN5IHBpcGUgaXMgdXNlZCB0byBmb3JtYXQgb3VyIG1vbmV5IG9iamVjdC5cbiAgICAgKi9cbiAgICBjdXJyZW5jeVBpcGU6IEN1cnJlbmN5UGlwZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGN1cnJlbmNpZXMuXG4gICAgICAgIHRoaXMuaW5pdEN1cnJlbmNpZXMoKTtcblxuICAgICAgICB0aGlzLmN1cnJlbmN5UGlwZSA9IG5ldyBDdXJyZW5jeVBpcGUoZW52LmxvY2FsZSk7XG5cbiAgICAgICAgZW52Lm9uTG9jYWxlQ2hhbmdlLnN1YnNjcmliZSgobG9jYWxlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3lQaXBlID0gbmV3IEN1cnJlbmN5UGlwZShsb2NhbGUpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubW9uZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmZvcm1hdEN1cnJlbmN5KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5LmFtb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG5cbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLm1vbmV5KTtcblxuICAgICAgICB0aGlzLmluaXRDdXJyZW5jaWVzKCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5jdXJyZW5jeVNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3lTZWxlY3Rpb24gPSB0aGlzLl9jdXJyZW5jaWVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVhZHkgdGhlIG1vbmV5IGZpZWxkIGlmIGl0IGV4aXN0cy4gYW5kIG92ZXJyaWRlIHRoZSBleGlzdGluZyB2YWx1ZXMuXG4gICAgICAgIGlmICh0aGlzLm1vbmV5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbmN5U2VsZWN0aW9uID0gdGhpcy5tb25leS5jdXJyZW5jeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9uZXkgPSBuZXcgTW9uZXkobnVsbCwgdGhpcy5jdXJyZW5jeVNlbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0Q3VycmVuY3kodGhpcy5tb25leS5hbW91bnQpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBpbml0Q3VycmVuY2llcygpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbmNpZXMgfHwgdGhpcy5fY3VycmVuY2llcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbmNpZXMgPSBbJ1VTRCcsICdDTlknLCAnQVVEJywgJ0VVUicsICdHQlAnXTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheSB0aGUgcmVhbCB2YWx1ZSB3aGVuIHRoZSB1c2VyIGNsaWNrcyBpbiB0aGUgY3VycmVuY3kgd2lkZ2V0LiBUaGVuIGhlIGNhbiBtb2RpZnkgdGhlXG4gICAgICogdmFsdWUgd2l0aG91dCBzZWVpbmcgdGhlIGZvcm1hdHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxcbiAgICAgKi9cbiAgICBvbkZvY3VzKGVsOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubW9uZXkpICYmIGlzUHJlc2VudCh0aGlzLm1vbmV5LmFtb3VudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5tb25leS5hbW91bnQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRpc3BsYXkgdGhlIGZvcm1hdHRlZCBjdXJyZW5jeSB2YWx1ZSB3aGVuIHRoZSB1c2VyIG5hdmlnYXRlcyBhd2F5LlxuICAgICAqIEBwYXJhbSBlbFxuICAgICAqL1xuICAgIG9uQmx1cihlbDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5tb25leSA9IHRoaXMubW9uZXkuY2xvbmUoe2Ftb3VudDogTnVtYmVyKGVsLnZhbHVlKX0pO1xuICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0Q3VycmVuY3kodGhpcy5tb25leS5hbW91bnQpO1xuXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5tb25leSk7XG4gICAgfVxuXG4gICAgb25TZWxlY3Rpb24oY3VycmVuY3k6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY3VycmVuY3lTZWxlY3Rpb24gPSBjdXJyZW5jeTtcbiAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmZvcm1hdEN1cnJlbmN5KHRoaXMubW9uZXkuYW1vdW50KTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gd2lsbCBjaGVjayB0byBzZWUgaWYgY3VycmVuY3kgaXMgYSB2YWxpZCBudW1iZXIgYmVmb3JlIGZvcm1hdHRpbmcuXG4gICAgICogQHBhcmFtIHZhbFxuICAgICAqL1xuICAgIHByaXZhdGUgZm9ybWF0Q3VycmVuY3kodmFsOiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmICghdmFsIHx8IHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4odmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2RlID0gJ1VTRCc7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbmN5U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBjb2RlID0gdGhpcy5jdXJyZW5jeVNlbGVjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9uZXkgPSB0aGlzLm1vbmV5LmNsb25lKHtjdXJyZW5jeTogdGhpcy5jdXJyZW5jeVNlbGVjdGlvbn0pO1xuXG4gICAgICAgIC8vIEJ5IGRlZmF1bHQsIHRoZSBwcmVjaXNpb24gaXMgMi4gRm9yIGV4YW1wbGUsIDEwLjIzIFVTRC5cbiAgICAgICAgbGV0IGRpZ2l0cyA9ICcxLjAtMic7XG4gICAgICAgIC8vIElmIHByZWNpc2lvbiBpcyBwcmVzZW50LCB1c2UgaXQgZm9yIGZvcm1hdCB0aGUgbW9uZXkgdmFsdWUgZm9yIGRpc3BsYXkuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5wcmVjaXNpb24pKSB7XG4gICAgICAgICAgICBkaWdpdHMgPSAnMS4wLScgKyB0aGlzLnByZWNpc2lvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW5jeVBpcGUudHJhbnNmb3JtKHZhbCwgY29kZSwgJ3N5bWJvbCcsIGRpZ2l0cyk7XG4gICAgfVxuXG4gICAgZ2V0TW9uZXlDdXJyZW5jeSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZGlzcGxheVZhbHVlKSAmJiB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW5jeVNlbGVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgY3VycmVuY2llcygpOiBhbnlbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbmNpZXM7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbmNpZXModmFsdWU6IGFueVtdKVxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbmNpZXMgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgTW9uZXkpICYmICFlcXVhbHModmFsdWUsIHRoaXMubW9uZXkpKSB7XG4gICAgICAgICAgICB0aGlzLm1vbmV5ID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubW9uZXkuY3VycmVuY3kpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW5jeVNlbGVjdGlvbiA9IHRoaXMubW9uZXkuY3VycmVuY3k7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0Q3VycmVuY3kodGhpcy5tb25leS5hbW91bnQpO1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLm1vbmV5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBNb25leSBvYmplY3QgaXMgcmVwcmVzZW50ZWQgYXMgYSB2YWx1ZSwgbG9jYWxlLCBhbmQgY3VycmVuY3lDb2RlXG4gKi9cbmV4cG9ydCBjbGFzcyBNb25leSBpbXBsZW1lbnRzIFZhbHVlXG57XG4gICAgdW5pcXVlTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFtb3VudDogbnVtYmVyID0gMCwgcHVibGljIHJlYWRvbmx5IGN1cnJlbmN5OiBzdHJpbmcgPSAnVVNEJyxcbiAgICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbG9jYWxlOiBzdHJpbmcgPSAnZW5fVVMnKVxuICAgIHtcbiAgICB9XG5cblxuICAgIGdldFR5cGVzKCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFtb3VudDogTnVtYmVyLFxuICAgICAgICAgICAgY3VycmVuY3k6IFN0cmluZyxcbiAgICAgICAgICAgIGxvY2FsZTogU3RyaW5nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuICdNb25leSc7XG4gICAgfVxuXG4gICAgJHByb3RvKCk6IE1vbmV5XG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE1vbmV5KDEsICcyMycsICczMycpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW1vdW50ICsgJywgbG9jYWxlOiAnICsgdGhpcy5sb2NhbGUgKyAnLCBjb2RlOiAgJyArIHRoaXMuY3VycmVuY3k7XG4gICAgfVxuXG5cbiAgICBjbG9uZShkYXRhOiB7IGFtb3VudD86IG51bWJlciwgY3VycmVuY3k/OiBzdHJpbmcsIGxvY2FsZT86IHN0cmluZyB9ID0ge30pOiBNb25leVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb25leShcbiAgICAgICAgICAgIGlzUHJlc2VudChkYXRhLmFtb3VudCkgPyBkYXRhLmFtb3VudCA6IHRoaXMuYW1vdW50LFxuICAgICAgICAgICAgaXNQcmVzZW50KGRhdGEuY3VycmVuY3kpID8gZGF0YS5jdXJyZW5jeSA6IHRoaXMuY3VycmVuY3ksXG4gICAgICAgICAgICBpc1ByZXNlbnQoZGF0YS5sb2NhbGUpID8gZGF0YS5sb2NhbGUgOiB0aGlzLmxvY2FsZVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19