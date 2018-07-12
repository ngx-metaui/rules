/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, equals, isBlank, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/**
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
 */
export var /** @type {?} */ CURRENCY_CONTROL_VALUE_ACCESSOR = {
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
        var /** @type {?} */ code = 'USD';
        if (this.currencySelection) {
            code = this.currencySelection;
        }
        this.money = this.money.clone({ currency: this.currencySelection });
        // By default, the precision is 2. For example, 10.23 USD.
        var /** @type {?} */ digits = '1.0-2';
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
                    styles: [".w-currency-field [readonly],.w-currency-type-field [readonly]{background-color:#fff}.w-currency-field input,.w-currency-type-field input{min-width:80px}.w-currency-field i.fa,.w-currency-type-field i.fa{cursor:pointer}.w-currency-field{margin-top:0}.w-currency-field /deep/ .ui-dropdown{min-width:80px}.w-cc-field{display:flex;align-items:center}.w-cc-readonly-field{padding-left:5px;color:#969696}.no-gutter>[class*=ui-g-]{padding-right:0;padding-left:0}"],
                    providers: [
                        CURRENCY_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return CurrencyComponent; }) }
                    ]
                },] },
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
function CurrencyComponent_tsickle_Closure_declarations() {
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
function Money_tsickle_Closure_declarations() {
    /** @type {?} */
    Money.prototype.uniqueName;
    /** @type {?} */
    Money.prototype.amount;
    /** @type {?} */
    Money.prototype.currency;
    /** @type {?} */
    Money.prototype.locale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY3VycmVuY3kvY3VycmVuY3kuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtDdEYsTUFBTSxDQUFDLHFCQUFNLCtCQUErQixHQUFRO0lBQ2hELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDOztJQThDcUMsNkNBQWlCO0lBK0NwRCwyQkFBbUIsR0FBZ0IsRUFFYixlQUFrQztRQUZ4RCxZQUlJLGtCQUFNLEdBQUcsRUFBRSxlQUFlLENBQUMsU0FlOUI7UUFuQmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7O3FDQW5DeEIsS0FBSzs7UUF3Q2pDLEFBREEseUJBQXlCO1FBQ3pCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0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LENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNsRCxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUN4RCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUNyRCxDQUFDO0tBQ0w7Z0JBN1VMO0lBK1VDLENBQUE7Ozs7QUE1Q0QsaUJBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0N1cnJlbmN5UGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGVxdWFscywgaXNCbGFuaywgaXNQcmVzZW50LCBWYWx1ZX0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcblxuLyoqXG4gKiBMaWdodHdlaWdodCBhbmQgY29uZmlndXJhYmxlIEN1cnJlbmN5IGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgbmcgYm9vdHN0cmFwIGRpcmVjdGl2ZS4gVGhpc1xuICogY29tcG9uZW50IGNvbWJpbmVzIGFuIGlucHV0IGFuZCBjdXJyZW5jeSBjb2RlIGRyb3Bkb3duLlxuICpcbiAqXG4gKiBmb3IgbW9yZSBpbmZvIHBsZWFzZSBzZWUgY2xhc3MgRG9jIG9mIHRoZTpcbiAqICBAc2VlIHtAbGluayBjdXJyZW5jeS9jdXJyZW5jeS5jb21wb25lbnQudHN9XG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdhbW91bnQnICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKlxuICogICAgICA8YXctY3VycmVuY3kgW21vbmV5XT1cInByaWNlXCIgW2N1cnJlbmNpZXNdPVwiY3VycmVuY2llc1wiIFtuYW1lXT1cIidjdXJyZW5jeSdcIj5cbiAqICAgICAgPC9hdy1jdXJyZW5jeT5cbiAqXG4gKiAgICBgXG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50XG4gKiAgICB7XG4gKiAgICAgICAgYW1vdW50OiBudW1iZXIgPSAxMDAwO1xuICogICAgICAgIGN1cnJlbmNpZXM6IHN0cmluZ1tdID0gWydVU0QnLCAnQ05ZJywgJ0FVRCcsICdFVVInLCAnR0JQJ107XG4gKiAgICAgICAgY3VycmVuY3lDb2RlOiBzdHJpbmcgPSB0aGlzLmN1cnJlbmNpZXNbMF07XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqL1xuXG5leHBvcnQgY29uc3QgQ1VSUkVOQ1lfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEN1cnJlbmN5Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWN1cnJlbmN5JyxcbiAgICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJlZGl0YWJsZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3LWN1cnJlbmN5LWZpZWxkIHVpLWZsdWlkXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWcgXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy04IHVpLWctbm9wYWQgXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNjdXJyZW5jeUlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgIHBJbnB1dFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBjbGFzcz1cInctdGV4dC1maWVsZCBjdXJyZW5jeS1mb3JtYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZUhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJkaXNwbGF5VmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cyhjdXJyZW5jeUlucHV0KVwiXG4gICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uQmx1cihjdXJyZW5jeUlucHV0KVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy00IHVpLWctbm9wYWQgdy1jYy1maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxhdy1kcm9wZG93biAqbmdJZj1cIiFyZWFkb25seUN1cnJlbmN5Q29kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1N0YW5kYWxvbmVdPVwiZmFsc2VcIiBbbGlzdF09XCJjdXJyZW5jaWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NlbGVjdGlvbl09XCJtb25leS5jdXJyZW5jeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvblNlbGVjdGlvbik9XCJvblNlbGVjdGlvbigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG5cbiAgICAgICAgICAgICAgICA8L2F3LWRyb3Bkb3duPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJyZWFkb25seUN1cnJlbmN5Q29kZVwiIGNsYXNzPVwidy1jYy1yZWFkb25seS1maWVsZFwiPnt7bW9uZXkuY3VycmVuY3l9fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBjdXJyZW5jeTonVVNEJzp0cnVlIC0tPlxuXG48bmctdGVtcGxhdGUgW25nSWZdPVwiIWVkaXRhYmxlXCI+XG4gICAgPGF3LXN0cmluZyB2YWx1ZT1cInt7ZGlzcGxheVZhbHVlfX0ge3sgZ2V0TW9uZXlDdXJyZW5jeSgpIH19XCI+PC9hdy1zdHJpbmc+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgICBzdHlsZXM6IFtgLnctY3VycmVuY3ktZmllbGQgW3JlYWRvbmx5XSwudy1jdXJyZW5jeS10eXBlLWZpZWxkIFtyZWFkb25seV17YmFja2dyb3VuZC1jb2xvcjojZmZmfS53LWN1cnJlbmN5LWZpZWxkIGlucHV0LC53LWN1cnJlbmN5LXR5cGUtZmllbGQgaW5wdXR7bWluLXdpZHRoOjgwcHh9LnctY3VycmVuY3ktZmllbGQgaS5mYSwudy1jdXJyZW5jeS10eXBlLWZpZWxkIGkuZmF7Y3Vyc29yOnBvaW50ZXJ9LnctY3VycmVuY3ktZmllbGR7bWFyZ2luLXRvcDowfS53LWN1cnJlbmN5LWZpZWxkIC9kZWVwLyAudWktZHJvcGRvd257bWluLXdpZHRoOjgwcHh9LnctY2MtZmllbGR7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn0udy1jYy1yZWFkb25seS1maWVsZHtwYWRkaW5nLWxlZnQ6NXB4O2NvbG9yOiM5Njk2OTZ9Lm5vLWd1dHRlcj5bY2xhc3MqPXVpLWctXXtwYWRkaW5nLXJpZ2h0OjA7cGFkZGluZy1sZWZ0OjB9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENVUlJFTkNZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ3VycmVuY3lDb21wb25lbnQpfVxuICAgIF1cblxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeUNvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogTW9uZXkgb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHZhbHVlLCBsb2NhbGUsIGN1cnJlbmN5IGNvZGUuXG4gICAgICogSWYgdGhpcyBvYmplY3QgaXMgc2V0LCB2YWx1ZXMgd2lsbCBiZSB0YWtlbiBmcm9tIHRoaXMgb2JqZWN0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtb25leTogTW9uZXk7XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIHVzZXIgdG8gY2hhbmdlIE1vbmV5J3MgY3VycmVuY3kgY29kZSBhbmQgc3RpbGxcbiAgICAgKiBhbGxvdyB1c2VyIHRvIGVkaXQgTW9uZXkncyBhbW91bnQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByZWFkb25seUN1cnJlbmN5Q29kZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbmN5IHRoYXQncyBzZWxlY3RlZCBmb3IgdGhpcyBjdXJyZW5jeSBmaWVsZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGN1cnJlbmN5U2VsZWN0aW9uOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdXNlZCB0byBmb3JtYXQgdGhlIG1vbmV5IG9iamVjdC5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHJlY2lzaW9uOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGN1cnJlbmNpZXMgdGhhdCB0aGlzIGN1cnJlbmN5IHdpZGdldCBzdXBwb3J0LiBUaGUgZm9ybWF0IGZvciBlYWNoIGVudHJ5IHNob3VsZCBiZVxuICAgICAqIFtjdXJyZW5jeS1jb2RlIC0gZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgX2N1cnJlbmNpZXM6IGFueVtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZm9ybWF0dGVkIGN1cnJlbmN5IHZhbHVlLiBVc2VzIGFuZ3VsYXIgY3VycmVuY3lQaXBlIHRvIGZvcm1hdCBiYXNlZCBvbiBjb3VudHJ5IGNvZGUuXG4gICAgICovXG4gICAgZGlzcGxheVZhbHVlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVuY3kgcGlwZSBpcyB1c2VkIHRvIGZvcm1hdCBvdXIgbW9uZXkgb2JqZWN0LlxuICAgICAqL1xuICAgIGN1cnJlbmN5UGlwZTogQ3VycmVuY3lQaXBlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEZvcm1Sb3dDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgY3VycmVuY2llcy5cbiAgICAgICAgdGhpcy5pbml0Q3VycmVuY2llcygpO1xuXG4gICAgICAgIHRoaXMuY3VycmVuY3lQaXBlID0gbmV3IEN1cnJlbmN5UGlwZShlbnYubG9jYWxlKTtcblxuICAgICAgICBlbnYub25Mb2NhbGVDaGFuZ2Uuc3Vic2NyaWJlKChsb2NhbGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW5jeVBpcGUgPSBuZXcgQ3VycmVuY3lQaXBlKGxvY2FsZSk7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5tb25leSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0Q3VycmVuY3koXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uZXkuYW1vdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcblxuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMubW9uZXkpO1xuXG4gICAgICAgIHRoaXMuaW5pdEN1cnJlbmNpZXMoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmN1cnJlbmN5U2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW5jeVNlbGVjdGlvbiA9IHRoaXMuX2N1cnJlbmNpZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWFkeSB0aGUgbW9uZXkgZmllbGQgaWYgaXQgZXhpc3RzLiBhbmQgb3ZlcnJpZGUgdGhlIGV4aXN0aW5nIHZhbHVlcy5cbiAgICAgICAgaWYgKHRoaXMubW9uZXkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3lTZWxlY3Rpb24gPSB0aGlzLm1vbmV5LmN1cnJlbmN5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb25leSA9IG5ldyBNb25leShudWxsLCB0aGlzLmN1cnJlbmN5U2VsZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5mb3JtYXRDdXJyZW5jeSh0aGlzLm1vbmV5LmFtb3VudCk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGluaXRDdXJyZW5jaWVzKClcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5fY3VycmVuY2llcyB8fCB0aGlzLl9jdXJyZW5jaWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVuY2llcyA9IFsnVVNEJywgJ0NOWScsICdBVUQnLCAnRVVSJywgJ0dCUCddO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHRoZSByZWFsIHZhbHVlIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGluIHRoZSBjdXJyZW5jeSB3aWRnZXQuIFRoZW4gaGUgY2FuIG1vZGlmeSB0aGVcbiAgICAgKiB2YWx1ZSB3aXRob3V0IHNlZWluZyB0aGUgZm9ybWF0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbFxuICAgICAqL1xuICAgIG9uRm9jdXMoZWw6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5tb25leSkgJiYgaXNQcmVzZW50KHRoaXMubW9uZXkuYW1vdW50KSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLm1vbmV5LmFtb3VudC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGlzcGxheSB0aGUgZm9ybWF0dGVkIGN1cnJlbmN5IHZhbHVlIHdoZW4gdGhlIHVzZXIgbmF2aWdhdGVzIGF3YXkuXG4gICAgICogQHBhcmFtIGVsXG4gICAgICovXG4gICAgb25CbHVyKGVsOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm1vbmV5ID0gdGhpcy5tb25leS5jbG9uZSh7YW1vdW50OiBOdW1iZXIoZWwudmFsdWUpfSk7XG4gICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5mb3JtYXRDdXJyZW5jeSh0aGlzLm1vbmV5LmFtb3VudCk7XG5cbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLm1vbmV5KTtcbiAgICB9XG5cbiAgICBvblNlbGVjdGlvbihjdXJyZW5jeTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5jdXJyZW5jeVNlbGVjdGlvbiA9IGN1cnJlbmN5O1xuICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0Q3VycmVuY3kodGhpcy5tb25leS5hbW91bnQpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB3aWxsIGNoZWNrIHRvIHNlZSBpZiBjdXJyZW5jeSBpcyBhIHZhbGlkIG51bWJlciBiZWZvcmUgZm9ybWF0dGluZy5cbiAgICAgKiBAcGFyYW0gdmFsXG4gICAgICovXG4gICAgcHJpdmF0ZSBmb3JtYXRDdXJyZW5jeSh2YWw6IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgaWYgKCF2YWwgfHwgdmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTih2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvZGUgPSAnVVNEJztcbiAgICAgICAgaWYgKHRoaXMuY3VycmVuY3lTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvZGUgPSB0aGlzLmN1cnJlbmN5U2VsZWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb25leSA9IHRoaXMubW9uZXkuY2xvbmUoe2N1cnJlbmN5OiB0aGlzLmN1cnJlbmN5U2VsZWN0aW9ufSk7XG5cbiAgICAgICAgLy8gQnkgZGVmYXVsdCwgdGhlIHByZWNpc2lvbiBpcyAyLiBGb3IgZXhhbXBsZSwgMTAuMjMgVVNELlxuICAgICAgICBsZXQgZGlnaXRzID0gJzEuMC0yJztcbiAgICAgICAgLy8gSWYgcHJlY2lzaW9uIGlzIHByZXNlbnQsIHVzZSBpdCBmb3IgZm9ybWF0IHRoZSBtb25leSB2YWx1ZSBmb3IgZGlzcGxheS5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnByZWNpc2lvbikpIHtcbiAgICAgICAgICAgIGRpZ2l0cyA9ICcxLjAtJyArIHRoaXMucHJlY2lzaW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbmN5UGlwZS50cmFuc2Zvcm0odmFsLCBjb2RlLCAnc3ltYm9sJywgZGlnaXRzKTtcbiAgICB9XG5cbiAgICBnZXRNb25leUN1cnJlbmN5KCk6IHN0cmluZyB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kaXNwbGF5VmFsdWUpICYmIHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbmN5U2VsZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBjdXJyZW5jaWVzKCk6IGFueVtdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVuY2llcztcbiAgICB9XG5cbiAgICBzZXQgY3VycmVuY2llcyh2YWx1ZTogYW55W10pXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVuY2llcyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwuIFBsZWFzZSBzZWUgQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAgICAgKlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBNb25leSkgJiYgIWVxdWFscyh2YWx1ZSwgdGhpcy5tb25leSkpIHtcbiAgICAgICAgICAgIHRoaXMubW9uZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5tb25leS5jdXJyZW5jeSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbmN5U2VsZWN0aW9uID0gdGhpcy5tb25leS5jdXJyZW5jeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5mb3JtYXRDdXJyZW5jeSh0aGlzLm1vbmV5LmFtb3VudCk7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMubW9uZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIE1vbmV5IG9iamVjdCBpcyByZXByZXNlbnRlZCBhcyBhIHZhbHVlLCBsb2NhbGUsIGFuZCBjdXJyZW5jeUNvZGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1vbmV5IGltcGxlbWVudHMgVmFsdWVcbntcbiAgICB1bmlxdWVOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYW1vdW50OiBudW1iZXIgPSAwLCBwdWJsaWMgcmVhZG9ubHkgY3VycmVuY3k6IHN0cmluZyA9ICdVU0QnLFxuICAgICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBsb2NhbGU6IHN0cmluZyA9ICdlbl9VUycpXG4gICAge1xuICAgIH1cblxuXG4gICAgZ2V0VHlwZXMoKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW1vdW50OiBOdW1iZXIsXG4gICAgICAgICAgICBjdXJyZW5jeTogU3RyaW5nLFxuICAgICAgICAgICAgbG9jYWxlOiBTdHJpbmdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjbGFzc05hbWUoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gJ01vbmV5JztcbiAgICB9XG5cbiAgICAkcHJvdG8oKTogTW9uZXlcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTW9uZXkoMSwgJzIzJywgJzMzJyk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5hbW91bnQgKyAnLCBsb2NhbGU6ICcgKyB0aGlzLmxvY2FsZSArICcsIGNvZGU6ICAnICsgdGhpcy5jdXJyZW5jeTtcbiAgICB9XG5cblxuICAgIGNsb25lKGRhdGE6IHsgYW1vdW50PzogbnVtYmVyLCBjdXJyZW5jeT86IHN0cmluZywgbG9jYWxlPzogc3RyaW5nIH0gPSB7fSk6IE1vbmV5XG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE1vbmV5KFxuICAgICAgICAgICAgaXNQcmVzZW50KGRhdGEuYW1vdW50KSA/IGRhdGEuYW1vdW50IDogdGhpcy5hbW91bnQsXG4gICAgICAgICAgICBpc1ByZXNlbnQoZGF0YS5jdXJyZW5jeSkgPyBkYXRhLmN1cnJlbmN5IDogdGhpcy5jdXJyZW5jeSxcbiAgICAgICAgICAgIGlzUHJlc2VudChkYXRhLmxvY2FsZSkgPyBkYXRhLmxvY2FsZSA6IHRoaXMubG9jYWxlXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iXX0=