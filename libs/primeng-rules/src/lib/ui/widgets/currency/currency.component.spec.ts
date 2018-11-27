/**
 *
 * @license
 * Copyright 2017 SAP Ariba
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
 *
 */
/* tslint:disable:no-unused-variable */
import {CurrencyComponent, Money} from './currency.component';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {isPresent, readGlobalParam} from '../../core/utils/lang';
import {AWCurrencyModule} from './currency.module';
import {AWFormTableModule} from '../../layouts/form-table/form-table.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {PrimeNgRulesModule} from '../../../primeng-rules.module';

describe('Component: Currency', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCurrencyBasicBehaviorComponent,
        TestCurrencyDefaultBehaviorComponent,
        TestDTContainerBehaviorComponent,
        TestReadonlyCurrencyCodeComponent
      ],
      imports: [
        MetaUIRulesModule.forRoot({'i18n.enabled': false, 'env.test': true}),
        PrimeNgRulesModule.forRoot(),
        NoopAnimationsModule,
        AWCurrencyModule, AWFormTableModule
      ]
    });

    TestBed.compileComponents();

  });

  it('should instantiate and have default values for value, formatCurrency, name, editing',
    () => {

      const fixtureWrapper = TestBed.createComponent(TestCurrencyBasicBehaviorComponent);
      fixtureWrapper.detectChanges();

      expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual('$1,000');
      expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(1000);
      expect(fixtureWrapper.componentInstance.currency.name).toEqual('currency');
      expect(fixtureWrapper.componentInstance.currency.editable).toBeTruthy();
      expect(fixtureWrapper.componentInstance.currency.disabled).toBeFalsy();

    });

  it('should format currency based on currency code clicked', fakeAsync(() => {
    const fixtureWrapper = TestBed.createComponent(TestCurrencyBasicBehaviorComponent);
    fixtureWrapper.detectChanges();

    const dd = fixtureWrapper.nativeElement.querySelector('.w-dropdown .ui-dropdown');
    dd.click();

    tick();
    fixtureWrapper.detectChanges();

    const items = fixtureWrapper.nativeElement.querySelectorAll('.ui-dropdown-item ');
    items[3].click();

    tick();
    fixtureWrapper.detectChanges();


    flushPendingTimers();
    expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual('€1,000');
    expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(1000);
  }));

  it('should format the currency when new value is entered', fakeAsync(() => {

    const fixtureWrapper = TestBed.createComponent(TestCurrencyBasicBehaviorComponent);
    fixtureWrapper.detectChanges();

    const el = fixtureWrapper.nativeElement.querySelector('.currency-format');
    el.value = 1234567890.00;
    el.dispatchEvent(new Event('blur'));

    fixtureWrapper.detectChanges();
    tick();

    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual('$1,234,567,890');
    expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(1234567890);
  }));


  it('should have empty value and default currencies when no default value and currency' +
    ' code are passed in.', fakeAsync(() => {
    const fixtureWrapper = TestBed.createComponent(TestCurrencyDefaultBehaviorComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual(null);
    expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(null);
    expect(fixtureWrapper.componentInstance.currency.name).toEqual('currency');
    expect(fixtureWrapper.componentInstance.currency.editable).toBeTruthy();
    expect(fixtureWrapper.componentInstance.currency.disabled).toBeFalsy();
    expect(fixtureWrapper.componentInstance.currency.currencies.length).toEqual(5);

  }));

  it('should have initialized control correctly with default values', () => {

    const fixtureWrapper = TestBed.createComponent(TestDTContainerBehaviorComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual('$1,000');
    expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(1000);
    expect(fixtureWrapper.componentInstance.currency.name).toEqual('currency');
    expect(fixtureWrapper.componentInstance.currency.editable).toBeTruthy();
    expect(fixtureWrapper.componentInstance.currency.disabled).toBeFalsy();
  });

  it('should have read only currency code', () => {

    const fixtureWrapper = TestBed.createComponent(TestReadonlyCurrencyCodeComponent);
    fixtureWrapper.detectChanges();

    expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual('$1,000');
    expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(1000);

    const readonlyField = fixtureWrapper.nativeElement.querySelector('.w-cc-readonly-field');
    expect(readonlyField.textContent).toEqual('USD');

    const dd = fixtureWrapper.nativeElement.querySelector('.w-dropdown .ui-dropdown');
    expect(dd).toBeNull();
  });
});


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-currency [name]="'currency'">
    </aw-currency>
  `
})
  /* jshint ignore:end */
class TestCurrencyDefaultBehaviorComponent {
  @ViewChild(CurrencyComponent)
  currency: CurrencyComponent;

  constructor() {

  }
}


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-currency [money]="price" [currencies]="currencies" [name]="'currency'">
    </aw-currency>
  `
})
  /* jshint ignore:end */
class TestCurrencyBasicBehaviorComponent {
  @ViewChild(CurrencyComponent)
  currency: CurrencyComponent;

  editable = true;
  currencies: string[] = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
  currencyCode: string = this.currencies[0];
  price: Money = new Money(1000, this.currencyCode);

  constructor() {

  }
}

/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-form-table>
      <aw-form-row [label]="'Amount'" [name]="'amount'" [size]="'small'">
        <aw-currency [money]="price" [currencies]="currencies" [name]="'currency'">
        </aw-currency>
      </aw-form-row>
    </aw-form-table>

  `
})
  /* jshint ignore:end */
class TestDTContainerBehaviorComponent {
  @ViewChild(CurrencyComponent)
  currency: CurrencyComponent;

  currencies: string[] = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
  currencyCode: string = this.currencies[0];
  price: Money = new Money(1000, null, this.currencyCode);
}


/* jshint ignore:start */
@Component({
  selector: 'wrapper-comp',
  template: `
    <aw-currency [readonlyCurrencyCode]="true"
                 [money]="price"
                 [currencies]="currencies"
                 [name]="'currency'">
    </aw-currency>
  `
})
  /* jshint ignore:end */
class TestReadonlyCurrencyCodeComponent {
  @ViewChild(CurrencyComponent)
  currency: CurrencyComponent;

  editable = true;
  currencies: string[] = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
  currencyCode: string = this.currencies[0];
  price: Money = new Money(1000, this.currencyCode);

  constructor() {

  }
}

/**
 * This is workaround to get rid of XX timer(s) still in the queue, as Autocomplete from PrimeNg
 * is using Timers and they are not cleared before tests finishes I get this error
 */
function flushPendingTimers() {

  const zone: any = readGlobalParam('Zone');

  if (isPresent(zone) &&
    isPresent(zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec)) {

    zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec.pendingTimers = [];
  }
}
