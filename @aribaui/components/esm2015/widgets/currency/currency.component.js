/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export const CURRENCY_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyComponent),
    multi: true
};
export class CurrencyComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Disable user to change Money's currency code and still
         * allow user to edit Money's amount.
         */
        this.readonlyCurrencyCode = false;
        // Initialize currencies.
        this.initCurrencies();
        this.currencyPipe = new CurrencyPipe(env.locale);
        env.onLocaleChange.subscribe((locale) => {
            this.currencyPipe = new CurrencyPipe(locale);
            if (isPresent(this.money)) {
                this.displayValue = this.formatCurrency(this.money.amount);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.money);
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
    }
    /**
     * @return {?}
     */
    initCurrencies() {
        if (!this._currencies || this._currencies.length === 0) {
            this._currencies = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
        }
    }
    /**
     * Display the real value when the user clicks in the currency widget. Then he can modify the
     * value without seeing the formatting.
     *
     * @param {?} el
     * @return {?}
     */
    onFocus(el) {
        if (isPresent(this.money) && isPresent(this.money.amount)) {
            this.displayValue = this.money.amount.toString();
        }
    }
    /**
     * display the formatted currency value when the user navigates away.
     * @param {?} el
     * @return {?}
     */
    onBlur(el) {
        this.money = this.money.clone({ amount: Number(el.value) });
        this.displayValue = this.formatCurrency(this.money.amount);
        this.onModelChanged(this.money);
    }
    /**
     * @param {?} currency
     * @return {?}
     */
    onSelection(currency) {
        this.currencySelection = currency;
        this.displayValue = this.formatCurrency(this.money.amount);
    }
    /**
     * Function will check to see if currency is a valid number before formatting.
     * @param {?} val
     * @return {?}
     */
    formatCurrency(val) {
        if (!val || val.length === 0) {
            return val;
        }
        if (isNaN(val)) {
            return val;
        }
        /** @type {?} */
        let code = 'USD';
        if (this.currencySelection) {
            code = this.currencySelection;
        }
        this.money = this.money.clone({ currency: this.currencySelection });
        /** @type {?} */
        let digits = '1.0-2';
        // If precision is present, use it for format the money value for display.
        if (isPresent(this.precision)) {
            digits = '1.0-' + this.precision;
        }
        return this.currencyPipe.transform(val, code, 'symbol', digits);
    }
    /**
     * @return {?}
     */
    getMoneyCurrency() {
        if (isPresent(this.displayValue) && this.displayValue.length > 0) {
            return this.currencySelection;
        }
        return '';
    }
    /**
     * @return {?}
     */
    get currencies() {
        return this._currencies;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currencies(value) {
        if (isPresent(value)) {
            this._currencies = value;
        }
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if ((value instanceof Money) && !equals(value, this.money)) {
            this.money = value;
            if (isPresent(this.money.currency)) {
                this.currencySelection = this.money.currency;
            }
            this.displayValue = this.formatCurrency(this.money.amount);
            this.formControl.setValue(this.money);
        }
    }
}
CurrencyComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-currency',
                template: "<ng-template [ngIf]=\"editable\">\n    <div class=\"w-currency-field ui-fluid\" [formGroup]=\"formGroup\">\n        <div class=\"ui-g \">\n            <div class=\"ui-g-8 ui-g-nopad \">\n                <input #currencyInput\n                       pInputText\n                       type=\"text\" class=\"w-text-field currency-format\"\n                       [attr.name]=\"name\"\n                       [attr.placeholder]=\"placeHolder\"\n                       [value]=\"displayValue\"\n                       (focus)=\"onFocus(currencyInput)\"\n                       (blur)=\"onBlur(currencyInput)\"\n                       [disabled]=\"disabled\">\n            </div>\n            <div class=\"ui-g-4 ui-g-nopad w-cc-field\">\n                <aw-dropdown *ngIf=\"!readonlyCurrencyCode\"\n                             [isStandalone]=\"false\" [list]=\"currencies\"\n                             [selection]=\"money.currency\"\n                             (onSelection)=\"onSelection($event)\"\n                             [disabled]=\"disabled\">\n\n                </aw-dropdown>\n                <div *ngIf=\"readonlyCurrencyCode\" class=\"w-cc-readonly-field\">{{money.currency}}</div>\n            </div>\n        </div>\n    </div>\n</ng-template>\n\n<!-- currency:'USD':true -->\n\n<ng-template [ngIf]=\"!editable\">\n    <aw-string value=\"{{displayValue}} {{ getMoneyCurrency() }}\"></aw-string>\n</ng-template>\n",
                providers: [
                    CURRENCY_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => CurrencyComponent) }
                ],
                styles: [".w-currency-field [readonly],.w-currency-type-field [readonly]{background-color:#fff}.w-currency-field input,.w-currency-type-field input{min-width:80px}.w-currency-field i.fa,.w-currency-type-field i.fa{cursor:pointer}.w-currency-field{margin-top:0}.w-currency-field /deep/ .ui-dropdown{min-width:80px}.w-cc-field{display:flex;align-items:center}.w-cc-readonly-field{padding-left:5px;color:#969696}.no-gutter>[class*=ui-g-]{padding-right:0;padding-left:0}"]
            }] }
];
/** @nocollapse */
CurrencyComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
CurrencyComponent.propDecorators = {
    money: [{ type: Input }],
    readonlyCurrencyCode: [{ type: Input }],
    currencySelection: [{ type: Input }],
    precision: [{ type: Input }],
    currencies: [{ type: Input }]
};
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
export class Money {
    /**
     * @param {?=} amount
     * @param {?=} currency
     * @param {?=} locale
     */
    constructor(amount = 0, currency = 'USD', locale = 'en_US') {
        this.amount = amount;
        this.currency = currency;
        this.locale = locale;
    }
    /**
     * @return {?}
     */
    getTypes() {
        return {
            amount: Number,
            currency: String,
            locale: String
        };
    }
    /**
     * @return {?}
     */
    className() {
        return 'Money';
    }
    /**
     * @return {?}
     */
    $proto() {
        return new Money(1, '23', '33');
    }
    /**
     * @return {?}
     */
    toString() {
        return this.amount + ', locale: ' + this.locale + ', code:  ' + this.currency;
    }
    /**
     * @param {?=} data
     * @return {?}
     */
    clone(data = {}) {
        return new Money(isPresent(data.amount) ? data.amount : this.amount, isPresent(data.currency) ? data.currency : this.currency, isPresent(data.locale) ? data.locale : this.locale);
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY3VycmVuY3kvY3VycmVuY3kuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0N0RixhQUFhLCtCQUErQixHQUFRO0lBQ2hELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFhRixNQUFNLHdCQUF5QixTQUFRLGlCQUFpQjs7Ozs7SUErQ3BELFlBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFFcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUpiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7O29DQW5DeEIsS0FBSzs7UUF3Q2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsWUFBWSxHQUFHLElB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LElBQUksQ0FBQyxNQUFNLENBQ3JELENBQUM7S0FDTDtDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0N1cnJlbmN5UGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGVxdWFscywgaXNCbGFuaywgaXNQcmVzZW50LCBWYWx1ZX0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcblxuLyoqXG4gKiBMaWdodHdlaWdodCBhbmQgY29uZmlndXJhYmxlIEN1cnJlbmN5IGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgbmcgYm9vdHN0cmFwIGRpcmVjdGl2ZS4gVGhpc1xuICogY29tcG9uZW50IGNvbWJpbmVzIGFuIGlucHV0IGFuZCBjdXJyZW5jeSBjb2RlIGRyb3Bkb3duLlxuICpcbiAqXG4gKiBmb3IgbW9yZSBpbmZvIHBsZWFzZSBzZWUgY2xhc3MgRG9jIG9mIHRoZTpcbiAqICBAc2VlIHtAbGluayBjdXJyZW5jeS9jdXJyZW5jeS5jb21wb25lbnQudHN9XG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdhbW91bnQnICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKlxuICogICAgICA8YXctY3VycmVuY3kgW21vbmV5XT1cInByaWNlXCIgW2N1cnJlbmNpZXNdPVwiY3VycmVuY2llc1wiIFtuYW1lXT1cIidjdXJyZW5jeSdcIj5cbiAqICAgICAgPC9hdy1jdXJyZW5jeT5cbiAqXG4gKiAgICBgXG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50XG4gKiAgICB7XG4gKiAgICAgICAgYW1vdW50OiBudW1iZXIgPSAxMDAwO1xuICogICAgICAgIGN1cnJlbmNpZXM6IHN0cmluZ1tdID0gWydVU0QnLCAnQ05ZJywgJ0FVRCcsICdFVVInLCAnR0JQJ107XG4gKiAgICAgICAgY3VycmVuY3lDb2RlOiBzdHJpbmcgPSB0aGlzLmN1cnJlbmNpZXNbMF07XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqL1xuXG5leHBvcnQgY29uc3QgQ1VSUkVOQ1lfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEN1cnJlbmN5Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWN1cnJlbmN5JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2N1cnJlbmN5LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnY3VycmVuY3kuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ1VSUkVOQ1lfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDdXJyZW5jeUNvbXBvbmVudCl9XG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5Q29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcbiAgICAvKipcbiAgICAgKiBNb25leSBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdmFsdWUsIGxvY2FsZSwgY3VycmVuY3kgY29kZS5cbiAgICAgKiBJZiB0aGlzIG9iamVjdCBpcyBzZXQsIHZhbHVlcyB3aWxsIGJlIHRha2VuIGZyb20gdGhpcyBvYmplY3RcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1vbmV5OiBNb25leTtcblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgdXNlciB0byBjaGFuZ2UgTW9uZXkncyBjdXJyZW5jeSBjb2RlIGFuZCBzdGlsbFxuICAgICAqIGFsbG93IHVzZXIgdG8gZWRpdCBNb25leSdzIGFtb3VudC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHJlYWRvbmx5Q3VycmVuY3lDb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVuY3kgdGhhdCdzIHNlbGVjdGVkIGZvciB0aGlzIGN1cnJlbmN5IGZpZWxkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY3VycmVuY3lTZWxlY3Rpb246IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB1c2VkIHRvIGZvcm1hdCB0aGUgbW9uZXkgb2JqZWN0LlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwcmVjaXNpb246IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgY3VycmVuY2llcyB0aGF0IHRoaXMgY3VycmVuY3kgd2lkZ2V0IHN1cHBvcnQuIFRoZSBmb3JtYXQgZm9yIGVhY2ggZW50cnkgc2hvdWxkIGJlXG4gICAgICogW2N1cnJlbmN5LWNvZGUgLSBkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBfY3VycmVuY2llczogYW55W107XG5cblxuICAgIC8qKlxuICAgICAqIFRoZSBmb3JtYXR0ZWQgY3VycmVuY3kgdmFsdWUuIFVzZXMgYW5ndWxhciBjdXJyZW5jeVBpcGUgdG8gZm9ybWF0IGJhc2VkIG9uIGNvdW50cnkgY29kZS5cbiAgICAgKi9cbiAgICBkaXNwbGF5VmFsdWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW5jeSBwaXBlIGlzIHVzZWQgdG8gZm9ybWF0IG91ciBtb25leSBvYmplY3QuXG4gICAgICovXG4gICAgY3VycmVuY3lQaXBlOiBDdXJyZW5jeVBpcGU7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBjdXJyZW5jaWVzLlxuICAgICAgICB0aGlzLmluaXRDdXJyZW5jaWVzKCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW5jeVBpcGUgPSBuZXcgQ3VycmVuY3lQaXBlKGVudi5sb2NhbGUpO1xuXG4gICAgICAgIGVudi5vbkxvY2FsZUNoYW5nZS5zdWJzY3JpYmUoKGxvY2FsZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbmN5UGlwZSA9IG5ldyBDdXJyZW5jeVBpcGUobG9jYWxlKTtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm1vbmV5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5mb3JtYXRDdXJyZW5jeShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25leS5hbW91bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuXG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy5tb25leSk7XG5cbiAgICAgICAgdGhpcy5pbml0Q3VycmVuY2llcygpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuY3VycmVuY3lTZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbmN5U2VsZWN0aW9uID0gdGhpcy5fY3VycmVuY2llc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlYWR5IHRoZSBtb25leSBmaWVsZCBpZiBpdCBleGlzdHMuIGFuZCBvdmVycmlkZSB0aGUgZXhpc3RpbmcgdmFsdWVzLlxuICAgICAgICBpZiAodGhpcy5tb25leSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW5jeVNlbGVjdGlvbiA9IHRoaXMubW9uZXkuY3VycmVuY3k7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vbmV5ID0gbmV3IE1vbmV5KG51bGwsIHRoaXMuY3VycmVuY3lTZWxlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmZvcm1hdEN1cnJlbmN5KHRoaXMubW9uZXkuYW1vdW50KTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgaW5pdEN1cnJlbmNpZXMoKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jdXJyZW5jaWVzIHx8IHRoaXMuX2N1cnJlbmNpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5jaWVzID0gWydVU0QnLCAnQ05ZJywgJ0FVRCcsICdFVVInLCAnR0JQJ107XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERpc3BsYXkgdGhlIHJlYWwgdmFsdWUgd2hlbiB0aGUgdXNlciBjbGlja3MgaW4gdGhlIGN1cnJlbmN5IHdpZGdldC4gVGhlbiBoZSBjYW4gbW9kaWZ5IHRoZVxuICAgICAqIHZhbHVlIHdpdGhvdXQgc2VlaW5nIHRoZSBmb3JtYXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsXG4gICAgICovXG4gICAgb25Gb2N1cyhlbDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm1vbmV5KSAmJiBpc1ByZXNlbnQodGhpcy5tb25leS5hbW91bnQpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMubW9uZXkuYW1vdW50LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkaXNwbGF5IHRoZSBmb3JtYXR0ZWQgY3VycmVuY3kgdmFsdWUgd2hlbiB0aGUgdXNlciBuYXZpZ2F0ZXMgYXdheS5cbiAgICAgKiBAcGFyYW0gZWxcbiAgICAgKi9cbiAgICBvbkJsdXIoZWw6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMubW9uZXkgPSB0aGlzLm1vbmV5LmNsb25lKHthbW91bnQ6IE51bWJlcihlbC52YWx1ZSl9KTtcbiAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmZvcm1hdEN1cnJlbmN5KHRoaXMubW9uZXkuYW1vdW50KTtcblxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMubW9uZXkpO1xuICAgIH1cblxuICAgIG9uU2VsZWN0aW9uKGN1cnJlbmN5OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmN1cnJlbmN5U2VsZWN0aW9uID0gY3VycmVuY3k7XG4gICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5mb3JtYXRDdXJyZW5jeSh0aGlzLm1vbmV5LmFtb3VudCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHdpbGwgY2hlY2sgdG8gc2VlIGlmIGN1cnJlbmN5IGlzIGEgdmFsaWQgbnVtYmVyIGJlZm9yZSBmb3JtYXR0aW5nLlxuICAgICAqIEBwYXJhbSB2YWxcbiAgICAgKi9cbiAgICBwcml2YXRlIGZvcm1hdEN1cnJlbmN5KHZhbDogYW55KTogYW55XG4gICAge1xuICAgICAgICBpZiAoIXZhbCB8fCB2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29kZSA9ICdVU0QnO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW5jeVNlbGVjdGlvbikge1xuICAgICAgICAgICAgY29kZSA9IHRoaXMuY3VycmVuY3lTZWxlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vbmV5ID0gdGhpcy5tb25leS5jbG9uZSh7Y3VycmVuY3k6IHRoaXMuY3VycmVuY3lTZWxlY3Rpb259KTtcblxuICAgICAgICAvLyBCeSBkZWZhdWx0LCB0aGUgcHJlY2lzaW9uIGlzIDIuIEZvciBleGFtcGxlLCAxMC4yMyBVU0QuXG4gICAgICAgIGxldCBkaWdpdHMgPSAnMS4wLTInO1xuICAgICAgICAvLyBJZiBwcmVjaXNpb24gaXMgcHJlc2VudCwgdXNlIGl0IGZvciBmb3JtYXQgdGhlIG1vbmV5IHZhbHVlIGZvciBkaXNwbGF5LlxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucHJlY2lzaW9uKSkge1xuICAgICAgICAgICAgZGlnaXRzID0gJzEuMC0nICsgdGhpcy5wcmVjaXNpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVuY3lQaXBlLnRyYW5zZm9ybSh2YWwsIGNvZGUsICdzeW1ib2wnLCBkaWdpdHMpO1xuICAgIH1cblxuICAgIGdldE1vbmV5Q3VycmVuY3koKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmRpc3BsYXlWYWx1ZSkgJiYgdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVuY3lTZWxlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGN1cnJlbmNpZXMoKTogYW55W11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW5jaWVzO1xuICAgIH1cblxuICAgIHNldCBjdXJyZW5jaWVzKHZhbHVlOiBhbnlbXSlcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW5jaWVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIE1vbmV5KSAmJiAhZXF1YWxzKHZhbHVlLCB0aGlzLm1vbmV5KSkge1xuICAgICAgICAgICAgdGhpcy5tb25leSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm1vbmV5LmN1cnJlbmN5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVuY3lTZWxlY3Rpb24gPSB0aGlzLm1vbmV5LmN1cnJlbmN5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmZvcm1hdEN1cnJlbmN5KHRoaXMubW9uZXkuYW1vdW50KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5tb25leSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogTW9uZXkgb2JqZWN0IGlzIHJlcHJlc2VudGVkIGFzIGEgdmFsdWUsIGxvY2FsZSwgYW5kIGN1cnJlbmN5Q29kZVxuICovXG5leHBvcnQgY2xhc3MgTW9uZXkgaW1wbGVtZW50cyBWYWx1ZVxue1xuICAgIHVuaXF1ZU5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhbW91bnQ6IG51bWJlciA9IDAsIHB1YmxpYyByZWFkb25seSBjdXJyZW5jeTogc3RyaW5nID0gJ1VTRCcsXG4gICAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGxvY2FsZTogc3RyaW5nID0gJ2VuX1VTJylcbiAgICB7XG4gICAgfVxuXG5cbiAgICBnZXRUeXBlcygpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbW91bnQ6IE51bWJlcixcbiAgICAgICAgICAgIGN1cnJlbmN5OiBTdHJpbmcsXG4gICAgICAgICAgICBsb2NhbGU6IFN0cmluZ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNsYXNzTmFtZSgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiAnTW9uZXknO1xuICAgIH1cblxuICAgICRwcm90bygpOiBNb25leVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb25leSgxLCAnMjMnLCAnMzMnKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmFtb3VudCArICcsIGxvY2FsZTogJyArIHRoaXMubG9jYWxlICsgJywgY29kZTogICcgKyB0aGlzLmN1cnJlbmN5O1xuICAgIH1cblxuXG4gICAgY2xvbmUoZGF0YTogeyBhbW91bnQ/OiBudW1iZXIsIGN1cnJlbmN5Pzogc3RyaW5nLCBsb2NhbGU/OiBzdHJpbmcgfSA9IHt9KTogTW9uZXlcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgTW9uZXkoXG4gICAgICAgICAgICBpc1ByZXNlbnQoZGF0YS5hbW91bnQpID8gZGF0YS5hbW91bnQgOiB0aGlzLmFtb3VudCxcbiAgICAgICAgICAgIGlzUHJlc2VudChkYXRhLmN1cnJlbmN5KSA/IGRhdGEuY3VycmVuY3kgOiB0aGlzLmN1cnJlbmN5LFxuICAgICAgICAgICAgaXNQcmVzZW50KGRhdGEubG9jYWxlKSA/IGRhdGEubG9jYWxlIDogdGhpcy5sb2NhbGVcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiJdfQ==