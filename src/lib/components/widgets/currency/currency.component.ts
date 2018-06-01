import {Component, forwardRef, Inject, Input, Optional, SkipSelf} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Environment, equals, isBlank, isPresent, Value} from '@aribaui/core';
import {BaseFormComponent} from '../../core/base-form.component';
import {FormRowComponent} from '../../layouts/form-table/form-row/form-row.component';

/**
 * Lightweight and configurable Currency component based on the ng bootstrap directive. This
 * component combines an input and currency code dropdown.
 *
 *
 * for more info please see class Doc of the:
 *  @see {@link currency/currency.component.ts}
 *
 *  ### Example
 *  ```
 *
 *  @Component({
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

export const CURRENCY_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyComponent),
    multi: true
};


@Component({
    selector: 'aw-currency',
    templateUrl: 'currency.component.html',
    styleUrls: ['currency.component.scss'],
    providers: [
        CURRENCY_CONTROL_VALUE_ACCESSOR,
        {provide: BaseFormComponent, useExisting: forwardRef(() => CurrencyComponent)}
    ]

})
export class CurrencyComponent extends BaseFormComponent
{
    /**
     * Money object that encapsulates value, locale, currency code.
     * If this object is set, values will be taken from this object
     */
    @Input()
    money: Money;

    /**
     * Disable user to change Money's currency code and still
     * allow user to edit Money's amount.
     */
    @Input()
    readonlyCurrencyCode: boolean = false;

    /**
     * The currency that's selected for this currency field.
     */
    @Input()
    currencySelection: string;

    /**
     *
     * The number of decimal places used to format the money object.
     *
     */
    @Input()
    precision: number;

    /**
     * List of currencies that this currency widget support. The format for each entry should be
     * [currency-code - description]
     */
    _currencies: any[];


    /**
     * The formatted currency value. Uses angular currencyPipe to format based on country code.
     */
    displayValue: string;

    /**
     * The currency pipe is used to format our money object.
     */
    currencyPipe: CurrencyPipe;

    constructor(public env: Environment,
                @SkipSelf() @Optional() @Inject(forwardRef(() => FormRowComponent))
                protected parentContainer: BaseFormComponent)
    {
        super(env, parentContainer);

        // Initialize currencies.
        this.initCurrencies();

        this.currencyPipe = new CurrencyPipe(env.locale);

        env.onLocaleChange.subscribe((locale: string) => {
            this.currencyPipe = new CurrencyPipe(locale);

            if (isPresent(this.money)) {
                this.displayValue = this.formatCurrency(
                    this.money.amount);
            }
        });
    }

    ngOnInit()
    {

        super.ngOnInit();
        super.registerFormControl(this.money);

        this.initCurrencies();

        if (isBlank(this.currencySelection)) {
            this.currencySelection = this._currencies[0];
        }

        // ready the money field if it exists. and override the existing values.
        if (this.money) {
            this.currencySelection = this.money.currency;
        } else {
            this.money = new Money(null, this.currencySelection);
        }

        this.displayValue = this.formatCurrency(this.money.amount);
    }


    private initCurrencies()
    {
        if (!this._currencies || this._currencies.length === 0) {
            this._currencies = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
        }
    }


    /**
     * Display the real value when the user clicks in the currency widget. Then he can modify the
     * value without seeing the formatting.
     *
     * @param el
     */
    onFocus(el: any): void
    {
        if (isPresent(this.money) && isPresent(this.money.amount)) {
            this.displayValue = this.money.amount.toString();
        }
    }

    /**
     * display the formatted currency value when the user navigates away.
     * @param el
     */
    onBlur(el: any): void
    {
        this.money = this.money.clone({amount: Number(el.value)});
        this.displayValue = this.formatCurrency(this.money.amount);

        this.onModelChanged(this.money);
    }

    onSelection(currency: any): void
    {
        this.currencySelection = currency;
        this.displayValue = this.formatCurrency(this.money.amount);

    }


    /**
     * Function will check to see if currency is a valid number before formatting.
     * @param val
     */
    private formatCurrency(val: any): any
    {
        if (!val || val.length === 0) {
            return val;
        }

        if (isNaN(val)) {
            return val;
        }

        let code = 'USD';
        if (this.currencySelection) {
            code = this.currencySelection;
        }

        this.money = this.money.clone({currency: this.currencySelection});

        // By default, the precision is 2. For example, 10.23 USD.
        let digits = '1.0-2';
        // If precision is present, use it for format the money value for display.
        if (isPresent(this.precision)) {
            digits = '1.0-' + this.precision;
        }
        return this.currencyPipe.transform(val, code, 'symbol', digits);
    }

    getMoneyCurrency(): string {
        if (isPresent(this.displayValue) && this.displayValue.length > 0) {
            return this.currencySelection;
        }
        return '';
    }

    @Input()
    get currencies(): any[]
    {
        return this._currencies;
    }

    set currencies(value: any[])
    {
        if (isPresent(value)) {
            this._currencies = value;
        }
    }

    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any)
    {
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

/**
 * Money object is represented as a value, locale, and currencyCode
 */
export class Money implements Value
{
    uniqueName: string;

    constructor(public readonly amount: number = 0, public readonly currency: string = 'USD',
                public readonly locale: string = 'en_US')
    {
    }


    getTypes(): any
    {
        return {
            amount: Number,
            currency: String,
            locale: String
        };
    }

    className(): string
    {
        return 'Money';
    }

    $proto(): Money
    {
        return new Money(1, '23', '33');
    }

    toString(): string
    {
        return this.amount + ', locale: ' + this.locale + ', code:  ' + this.currency;
    }


    clone(data: { amount?: number, currency?: string, locale?: string } = {}): Money
    {
        return new Money(
            isPresent(data.amount) ? data.amount : this.amount,
            isPresent(data.currency) ? data.currency : this.currency,
            isPresent(data.locale) ? data.locale : this.locale
        );
    }

}
