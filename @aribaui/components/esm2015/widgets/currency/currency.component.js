/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export const /** @type {?} */ CURRENCY_CONTROL_VALUE_ACCESSOR = {
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
        let /** @type {?} */ code = 'USD';
        if (this.currencySelection) {
            code = this.currencySelection;
        }
        this.money = this.money.clone({ currency: this.currencySelection });
        // By default, the precision is 2. For example, 10.23 USD.
        let /** @type {?} */ digits = '1.0-2';
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
                template: `<ng-template [ngIf]="editable">
    <div class="w-currency-field ui-fluid" [formGroup]="formGroup">
        <div class="ui-g ">
            <div class="ui-g-8 ui-g-nopad ">
                <input #currencyInput
                       pInputText
                       type="text" class="w-text-field currency-format"
                       [attr.name]="name"
                       [attr.placeholder]="placeHolder"
                       [value]="displayValue"
                       (focus)="onFocus(currencyInput)"
                       (blur)="onBlur(currencyInput)"
                       [disabled]="disabled">
            </div>
            <div class="ui-g-4 ui-g-nopad w-cc-field">
                <aw-dropdown *ngIf="!readonlyCurrencyCode"
                             [isStandalone]="false" [list]="currencies"
                             [selection]="money.currency"
                             (onSelection)="onSelection($event)"
                             [disabled]="disabled">

                </aw-dropdown>
                <div *ngIf="readonlyCurrencyCode" class="w-cc-readonly-field">{{money.currency}}</div>
            </div>
        </div>
    </div>
</ng-template>

<!-- currency:'USD':true -->

<ng-template [ngIf]="!editable">
    <aw-string value="{{displayValue}} {{ getMoneyCurrency() }}"></aw-string>
</ng-template>
`,
                styles: [`.w-currency-field [readonly],.w-currency-type-field [readonly]{background-color:#fff}.w-currency-field input,.w-currency-type-field input{min-width:80px}.w-currency-field i.fa,.w-currency-type-field i.fa{cursor:pointer}.w-currency-field{margin-top:0}.w-currency-field /deep/ .ui-dropdown{min-width:80px}.w-cc-field{display:flex;align-items:center}.w-cc-readonly-field{padding-left:5px;color:#969696}.no-gutter>[class*=ui-g-]{padding-right:0;padding-left:0}`],
                providers: [
                    CURRENCY_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => CurrencyComponent) }
                ]
            },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY3VycmVuY3kvY3VycmVuY3kuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0N0RixNQUFNLENBQUMsdUJBQU0sK0JBQStCLEdBQVE7SUFDaEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQThDRixNQUFNLHdCQUF5QixTQUFRLGlCQUFpQjs7Ozs7SUErQ3BELFlBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFFcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUpiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7O29DQW5DeEIsS0FBSzs7UUF3Q2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMs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UUFBUSxFQUN4RCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUNyRCxDQUFDO0tBQ0w7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDdXJyZW5jeVBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBlcXVhbHMsIGlzQmxhbmssIGlzUHJlc2VudCwgVmFsdWV9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybVJvd0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tcm93L2Zvcm0tcm93LmNvbXBvbmVudCc7XG5cbi8qKlxuICogTGlnaHR3ZWlnaHQgYW5kIGNvbmZpZ3VyYWJsZSBDdXJyZW5jeSBjb21wb25lbnQgYmFzZWQgb24gdGhlIG5nIGJvb3RzdHJhcCBkaXJlY3RpdmUuIFRoaXNcbiAqIGNvbXBvbmVudCBjb21iaW5lcyBhbiBpbnB1dCBhbmQgY3VycmVuY3kgY29kZSBkcm9wZG93bi5cbiAqXG4gKlxuICogZm9yIG1vcmUgaW5mbyBwbGVhc2Ugc2VlIGNsYXNzIERvYyBvZiB0aGU6XG4gKiAgQHNlZSB7QGxpbmsgY3VycmVuY3kvY3VycmVuY3kuY29tcG9uZW50LnRzfVxuICpcbiAqICAjIyMgRXhhbXBsZVxuICogIGBgYFxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAnYW1vdW50JyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICpcbiAqICAgICAgPGF3LWN1cnJlbmN5IFttb25leV09XCJwcmljZVwiIFtjdXJyZW5jaWVzXT1cImN1cnJlbmNpZXNcIiBbbmFtZV09XCInY3VycmVuY3knXCI+XG4gKiAgICAgIDwvYXctY3VycmVuY3k+XG4gKlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudFxuICogICAge1xuICogICAgICAgIGFtb3VudDogbnVtYmVyID0gMTAwMDtcbiAqICAgICAgICBjdXJyZW5jaWVzOiBzdHJpbmdbXSA9IFsnVVNEJywgJ0NOWScsICdBVUQnLCAnRVVSJywgJ0dCUCddO1xuICogICAgICAgIGN1cnJlbmN5Q29kZTogc3RyaW5nID0gdGhpcy5jdXJyZW5jaWVzWzBdO1xuICpcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICB9XG4gKiAgICB9XG4gKi9cblxuZXhwb3J0IGNvbnN0IENVUlJFTkNZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDdXJyZW5jeUNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1jdXJyZW5jeScsXG4gICAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgW25nSWZdPVwiZWRpdGFibGVcIj5cbiAgICA8ZGl2IGNsYXNzPVwidy1jdXJyZW5jeS1maWVsZCB1aS1mbHVpZFwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nIFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctOCB1aS1nLW5vcGFkIFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCAjY3VycmVuY3lJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICBwSW5wdXRUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ3LXRleHQtZmllbGQgY3VycmVuY3ktZm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2VIb2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZGlzcGxheVZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoY3VycmVuY3lJbnB1dClcIlxuICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkJsdXIoY3VycmVuY3lJbnB1dClcIlxuICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctNCB1aS1nLW5vcGFkIHctY2MtZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8YXctZHJvcGRvd24gKm5nSWY9XCIhcmVhZG9ubHlDdXJyZW5jeUNvZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNTdGFuZGFsb25lXT1cImZhbHNlXCIgW2xpc3RdPVwiY3VycmVuY2llc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzZWxlY3Rpb25dPVwibW9uZXkuY3VycmVuY3lcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25TZWxlY3Rpb24pPVwib25TZWxlY3Rpb24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuXG4gICAgICAgICAgICAgICAgPC9hdy1kcm9wZG93bj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVhZG9ubHlDdXJyZW5jeUNvZGVcIiBjbGFzcz1cInctY2MtcmVhZG9ubHktZmllbGRcIj57e21vbmV5LmN1cnJlbmN5fX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gY3VycmVuY3k6J1VTRCc6dHJ1ZSAtLT5cblxuPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFlZGl0YWJsZVwiPlxuICAgIDxhdy1zdHJpbmcgdmFsdWU9XCJ7e2Rpc3BsYXlWYWx1ZX19IHt7IGdldE1vbmV5Q3VycmVuY3koKSB9fVwiPjwvYXctc3RyaW5nPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gICAgc3R5bGVzOiBbYC53LWN1cnJlbmN5LWZpZWxkIFtyZWFkb25seV0sLnctY3VycmVuY3ktdHlwZS1maWVsZCBbcmVhZG9ubHlde2JhY2tncm91bmQtY29sb3I6I2ZmZn0udy1jdXJyZW5jeS1maWVsZCBpbnB1dCwudy1jdXJyZW5jeS10eXBlLWZpZWxkIGlucHV0e21pbi13aWR0aDo4MHB4fS53LWN1cnJlbmN5LWZpZWxkIGkuZmEsLnctY3VycmVuY3ktdHlwZS1maWVsZCBpLmZhe2N1cnNvcjpwb2ludGVyfS53LWN1cnJlbmN5LWZpZWxke21hcmdpbi10b3A6MH0udy1jdXJyZW5jeS1maWVsZCAvZGVlcC8gLnVpLWRyb3Bkb3due21pbi13aWR0aDo4MHB4fS53LWNjLWZpZWxke2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXJ9LnctY2MtcmVhZG9ubHktZmllbGR7cGFkZGluZy1sZWZ0OjVweDtjb2xvcjojOTY5Njk2fS5uby1ndXR0ZXI+W2NsYXNzKj11aS1nLV17cGFkZGluZy1yaWdodDowO3BhZGRpbmctbGVmdDowfWBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDVVJSRU5DWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEN1cnJlbmN5Q29tcG9uZW50KX1cbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVuY3lDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqIE1vbmV5IG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB2YWx1ZSwgbG9jYWxlLCBjdXJyZW5jeSBjb2RlLlxuICAgICAqIElmIHRoaXMgb2JqZWN0IGlzIHNldCwgdmFsdWVzIHdpbGwgYmUgdGFrZW4gZnJvbSB0aGlzIG9iamVjdFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbW9uZXk6IE1vbmV5O1xuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSB1c2VyIHRvIGNoYW5nZSBNb25leSdzIGN1cnJlbmN5IGNvZGUgYW5kIHN0aWxsXG4gICAgICogYWxsb3cgdXNlciB0byBlZGl0IE1vbmV5J3MgYW1vdW50LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHlDdXJyZW5jeUNvZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW5jeSB0aGF0J3Mgc2VsZWN0ZWQgZm9yIHRoaXMgY3VycmVuY3kgZmllbGQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjdXJyZW5jeVNlbGVjdGlvbjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHVzZWQgdG8gZm9ybWF0IHRoZSBtb25leSBvYmplY3QuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHByZWNpc2lvbjogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBjdXJyZW5jaWVzIHRoYXQgdGhpcyBjdXJyZW5jeSB3aWRnZXQgc3VwcG9ydC4gVGhlIGZvcm1hdCBmb3IgZWFjaCBlbnRyeSBzaG91bGQgYmVcbiAgICAgKiBbY3VycmVuY3ktY29kZSAtIGRlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIF9jdXJyZW5jaWVzOiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogVGhlIGZvcm1hdHRlZCBjdXJyZW5jeSB2YWx1ZS4gVXNlcyBhbmd1bGFyIGN1cnJlbmN5UGlwZSB0byBmb3JtYXQgYmFzZWQgb24gY291bnRyeSBjb2RlLlxuICAgICAqL1xuICAgIGRpc3BsYXlWYWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbmN5IHBpcGUgaXMgdXNlZCB0byBmb3JtYXQgb3VyIG1vbmV5IG9iamVjdC5cbiAgICAgKi9cbiAgICBjdXJyZW5jeVBpcGU6IEN1cnJlbmN5UGlwZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGN1cnJlbmNpZXMuXG4gICAgICAgIHRoaXMuaW5pdEN1cnJlbmNpZXMoKTtcblxuICAgICAgICB0aGlzLmN1cnJlbmN5UGlwZSA9IG5ldyBDdXJyZW5jeVBpcGUoZW52LmxvY2FsZSk7XG5cbiAgICAgICAgZW52Lm9uTG9jYWxlQ2hhbmdlLnN1YnNjcmliZSgobG9jYWxlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3lQaXBlID0gbmV3IEN1cnJlbmN5UGlwZShsb2NhbGUpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubW9uZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmZvcm1hdEN1cnJlbmN5KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbmV5LmFtb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG5cbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLm1vbmV5KTtcblxuICAgICAgICB0aGlzLmluaXRDdXJyZW5jaWVzKCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5jdXJyZW5jeVNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3lTZWxlY3Rpb24gPSB0aGlzLl9jdXJyZW5jaWVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVhZHkgdGhlIG1vbmV5IGZpZWxkIGlmIGl0IGV4aXN0cy4gYW5kIG92ZXJyaWRlIHRoZSBleGlzdGluZyB2YWx1ZXMuXG4gICAgICAgIGlmICh0aGlzLm1vbmV5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbmN5U2VsZWN0aW9uID0gdGhpcy5tb25leS5jdXJyZW5jeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9uZXkgPSBuZXcgTW9uZXkobnVsbCwgdGhpcy5jdXJyZW5jeVNlbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0Q3VycmVuY3kodGhpcy5tb25leS5hbW91bnQpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBpbml0Q3VycmVuY2llcygpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbmNpZXMgfHwgdGhpcy5fY3VycmVuY2llcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbmNpZXMgPSBbJ1VTRCcsICdDTlknLCAnQVVEJywgJ0VVUicsICdHQlAnXTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheSB0aGUgcmVhbCB2YWx1ZSB3aGVuIHRoZSB1c2VyIGNsaWNrcyBpbiB0aGUgY3VycmVuY3kgd2lkZ2V0LiBUaGVuIGhlIGNhbiBtb2RpZnkgdGhlXG4gICAgICogdmFsdWUgd2l0aG91dCBzZWVpbmcgdGhlIGZvcm1hdHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxcbiAgICAgKi9cbiAgICBvbkZvY3VzKGVsOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubW9uZXkpICYmIGlzUHJlc2VudCh0aGlzLm1vbmV5LmFtb3VudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5tb25leS5hbW91bnQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRpc3BsYXkgdGhlIGZvcm1hdHRlZCBjdXJyZW5jeSB2YWx1ZSB3aGVuIHRoZSB1c2VyIG5hdmlnYXRlcyBhd2F5LlxuICAgICAqIEBwYXJhbSBlbFxuICAgICAqL1xuICAgIG9uQmx1cihlbDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5tb25leSA9IHRoaXMubW9uZXkuY2xvbmUoe2Ftb3VudDogTnVtYmVyKGVsLnZhbHVlKX0pO1xuICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0Q3VycmVuY3kodGhpcy5tb25leS5hbW91bnQpO1xuXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5tb25leSk7XG4gICAgfVxuXG4gICAgb25TZWxlY3Rpb24oY3VycmVuY3k6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY3VycmVuY3lTZWxlY3Rpb24gPSBjdXJyZW5jeTtcbiAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmZvcm1hdEN1cnJlbmN5KHRoaXMubW9uZXkuYW1vdW50KTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gd2lsbCBjaGVjayB0byBzZWUgaWYgY3VycmVuY3kgaXMgYSB2YWxpZCBudW1iZXIgYmVmb3JlIGZvcm1hdHRpbmcuXG4gICAgICogQHBhcmFtIHZhbFxuICAgICAqL1xuICAgIHByaXZhdGUgZm9ybWF0Q3VycmVuY3kodmFsOiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmICghdmFsIHx8IHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4odmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2RlID0gJ1VTRCc7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbmN5U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBjb2RlID0gdGhpcy5jdXJyZW5jeVNlbGVjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9uZXkgPSB0aGlzLm1vbmV5LmNsb25lKHtjdXJyZW5jeTogdGhpcy5jdXJyZW5jeVNlbGVjdGlvbn0pO1xuXG4gICAgICAgIC8vIEJ5IGRlZmF1bHQsIHRoZSBwcmVjaXNpb24gaXMgMi4gRm9yIGV4YW1wbGUsIDEwLjIzIFVTRC5cbiAgICAgICAgbGV0IGRpZ2l0cyA9ICcxLjAtMic7XG4gICAgICAgIC8vIElmIHByZWNpc2lvbiBpcyBwcmVzZW50LCB1c2UgaXQgZm9yIGZvcm1hdCB0aGUgbW9uZXkgdmFsdWUgZm9yIGRpc3BsYXkuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5wcmVjaXNpb24pKSB7XG4gICAgICAgICAgICBkaWdpdHMgPSAnMS4wLScgKyB0aGlzLnByZWNpc2lvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW5jeVBpcGUudHJhbnNmb3JtKHZhbCwgY29kZSwgJ3N5bWJvbCcsIGRpZ2l0cyk7XG4gICAgfVxuXG4gICAgZ2V0TW9uZXlDdXJyZW5jeSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZGlzcGxheVZhbHVlKSAmJiB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW5jeVNlbGVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgY3VycmVuY2llcygpOiBhbnlbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbmNpZXM7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbmNpZXModmFsdWU6IGFueVtdKVxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbmNpZXMgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgTW9uZXkpICYmICFlcXVhbHModmFsdWUsIHRoaXMubW9uZXkpKSB7XG4gICAgICAgICAgICB0aGlzLm1vbmV5ID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubW9uZXkuY3VycmVuY3kpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW5jeVNlbGVjdGlvbiA9IHRoaXMubW9uZXkuY3VycmVuY3k7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0Q3VycmVuY3kodGhpcy5tb25leS5hbW91bnQpO1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLm1vbmV5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBNb25leSBvYmplY3QgaXMgcmVwcmVzZW50ZWQgYXMgYSB2YWx1ZSwgbG9jYWxlLCBhbmQgY3VycmVuY3lDb2RlXG4gKi9cbmV4cG9ydCBjbGFzcyBNb25leSBpbXBsZW1lbnRzIFZhbHVlXG57XG4gICAgdW5pcXVlTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFtb3VudDogbnVtYmVyID0gMCwgcHVibGljIHJlYWRvbmx5IGN1cnJlbmN5OiBzdHJpbmcgPSAnVVNEJyxcbiAgICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbG9jYWxlOiBzdHJpbmcgPSAnZW5fVVMnKVxuICAgIHtcbiAgICB9XG5cblxuICAgIGdldFR5cGVzKCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFtb3VudDogTnVtYmVyLFxuICAgICAgICAgICAgY3VycmVuY3k6IFN0cmluZyxcbiAgICAgICAgICAgIGxvY2FsZTogU3RyaW5nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuICdNb25leSc7XG4gICAgfVxuXG4gICAgJHByb3RvKCk6IE1vbmV5XG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE1vbmV5KDEsICcyMycsICczMycpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW1vdW50ICsgJywgbG9jYWxlOiAnICsgdGhpcy5sb2NhbGUgKyAnLCBjb2RlOiAgJyArIHRoaXMuY3VycmVuY3k7XG4gICAgfVxuXG5cbiAgICBjbG9uZShkYXRhOiB7IGFtb3VudD86IG51bWJlciwgY3VycmVuY3k/OiBzdHJpbmcsIGxvY2FsZT86IHN0cmluZyB9ID0ge30pOiBNb25leVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb25leShcbiAgICAgICAgICAgIGlzUHJlc2VudChkYXRhLmFtb3VudCkgPyBkYXRhLmFtb3VudCA6IHRoaXMuYW1vdW50LFxuICAgICAgICAgICAgaXNQcmVzZW50KGRhdGEuY3VycmVuY3kpID8gZGF0YS5jdXJyZW5jeSA6IHRoaXMuY3VycmVuY3ksXG4gICAgICAgICAgICBpc1ByZXNlbnQoZGF0YS5sb2NhbGUpID8gZGF0YS5sb2NhbGUgOiB0aGlzLmxvY2FsZVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19