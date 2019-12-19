/**
 * @license
 * F. Kolar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  Optional,
  Self,
  ViewEncapsulation
} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {NgControl, NgForm} from '@angular/forms';
import {FormFieldControl} from '../form-control';
import {BaseInput} from '../base.input';
import {Money} from '../../domain/data-model';


/**
 * Simple and configurable Currency component based on the input-groups. This
 * component combines an input and currency code select.
 *
 * todo: remove hover and focus from the inputs elements and make it on the input group level
 *
 */
@Component({
  selector: 'fdp-money',
  templateUrl: 'money.component.html',
  styleUrls: ['./money.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: FormFieldControl, useExisting: MoneyComponent, multi: true}
  ]
})
export class MoneyComponent extends BaseInput {

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


  @Input()
  get value(): any {
    return super.getValue();
  }

  set value(value: any) {
    super.setValue(value);
  }

  /**
   *
   * The number of decimal places used to format the money object.
   *
   */
  @Input()
  precision: number;

  /**
   * The formatted currency value. Uses angular currencyPipe to format based on country code.
   */
  inputDisplayValue: string;

  /**
   * List of currencies that this currency widget support. The format for each entry should be
   * [currency-code - description]
   */
  currencies: any[];

  /**
   * The currency pipe is used to format our money object.
   */
  currencyPipe: CurrencyPipe;


  constructor(protected _cd: ChangeDetectorRef,
              @Optional() @Self() public ngControl: NgControl,
              @Optional() @Self() public ngForm: NgForm,
              @Optional() @Inject(LOCALE_ID) private locale: string = 'en-US') {


    super(_cd, ngControl, ngForm);
    this.initCurrencies();

    this.currencyPipe = new CurrencyPipe(locale);
  }

  ngOnInit(): void {
    this.initCurrencies();

    if (this.currencySelection) {
      this.currencySelection = this.currencies[0];
    }
  }

  writeValue(value: any): void {
    if (!value) {
      value = new Money(0);
    }

    if (value instanceof Money && !isNaN(value.amount)) {
      const m = <Money>value;
      if (m.currency) {
        this.currencySelection = m.currency;
      }
      super.writeValue(value);
      this.inputDisplayValue = this.formatCurrency(m.amount);
    }
  }


  onSelection(currency: any): void {
    this.currencySelection = currency;
    this.inputDisplayValue = this.formatCurrency(this.value.amount);

    this.updateMoney(this.value.amount, this.currencySelection);
    this.stateChanges.next('CurrencySet');
    this._cd.markForCheck();
  }


  _onFocusChanged(isFocused: boolean, element?: HTMLInputElement) {
    if (isFocused) {
      if (this.value && this.value.amount) {
        this.inputDisplayValue = this.value.amount.toString();
      }
    } else {
      this.updateMoney(element.value, this.currencySelection);
    }
    super._onFocusChanged(isFocused);
  }

  get currency(): string {
    if (this.inputDisplayValue && this.inputDisplayValue.length > 0) {
      return this.currencySelection;
    }
    return '';
  }

  private updateMoney(amount: string | number, currency: string) {
    this.value = this.value.clone({amount: Number(amount || 0), currency: currency});
    this.inputDisplayValue = this.formatCurrency(this.value.amount);
    this.onChange(this.value);
    this.value = this.value;
  }

  /**
   * Function will check to see if currency is a valid number before formatting.
   */
  private formatCurrency(val: any): any {
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
    this.value = this.value.clone({currency: this.currencySelection});

    // By default, the precision is 2. For example, 10.23 USD.
    let digits = '1.0-2';
    // If precision is present, use it for format the money value for display.
    if (this.precision) {
      digits = '1.0-' + this.precision;
    }
    return this.currencyPipe.transform(val, code, 'symbol', digits);
  }

  private initCurrencies() {
    if (!this.currencies || this.currencies.length === 0) {
      this.currencies = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
    }
  }
}

