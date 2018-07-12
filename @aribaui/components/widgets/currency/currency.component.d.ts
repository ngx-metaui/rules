import { CurrencyPipe } from '@angular/common';
import { Environment, Value } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
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
export declare const CURRENCY_CONTROL_VALUE_ACCESSOR: any;
export declare class CurrencyComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    /**
     * Money object that encapsulates value, locale, currency code.
     * If this object is set, values will be taken from this object
     */
    money: Money;
    /**
     * Disable user to change Money's currency code and still
     * allow user to edit Money's amount.
     */
    readonlyCurrencyCode: boolean;
    /**
     * The currency that's selected for this currency field.
     */
    currencySelection: string;
    /**
     *
     * The number of decimal places used to format the money object.
     *
     */
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
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    private initCurrencies();
    /**
     * Display the real value when the user clicks in the currency widget. Then he can modify the
     * value without seeing the formatting.
     *
     * @param el
     */
    onFocus(el: any): void;
    /**
     * display the formatted currency value when the user navigates away.
     * @param el
     */
    onBlur(el: any): void;
    onSelection(currency: any): void;
    /**
     * Function will check to see if currency is a valid number before formatting.
     * @param val
     */
    private formatCurrency(val);
    getMoneyCurrency(): string;
    currencies: any[];
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any): void;
}
/**
 * Money object is represented as a value, locale, and currencyCode
 */
export declare class Money implements Value {
    readonly amount: number;
    readonly currency: string;
    readonly locale: string;
    uniqueName: string;
    constructor(amount?: number, currency?: string, locale?: string);
    getTypes(): any;
    className(): string;
    $proto(): Money;
    toString(): string;
    clone(data?: {
        amount?: number;
        currency?: string;
        locale?: string;
    }): Money;
}
