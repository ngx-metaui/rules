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
import {CurrencyComponent, Money} from '../currency.component';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AribaCoreModule} from '../../../../core/ariba.core.module';
import {Component, ViewChild} from '@angular/core';
import {isPresent, readGlobalParam} from '@aribaui/core';
import {AWCurrencyModule} from '../currency.module';
import {AWFormTableModule} from '../../../layouts/form-table/form-table.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AribaComponentsTestProviderModule} from '../../../ariba.component.provider.module';
import {AribaCoreI18nModule} from '../../../../core';

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
                AribaCoreI18nModule,
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                NoopAnimationsModule,
                AWCurrencyModule, AWFormTableModule
            ]
        });

        TestBed.compileComponents();

    });

    it('should instantiate and have default values for value, formatCurrency, name, editing',
        () => {

            let fixtureWrapper = TestBed.createComponent(TestCurrencyBasicBehaviorComponent);
            fixtureWrapper.detectChanges();

            expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual('$1,000');
            expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(1000);
            expect(fixtureWrapper.componentInstance.currency.name).toEqual('currency');
            expect(fixtureWrapper.componentInstance.currency.editable).toBeTruthy();
            expect(fixtureWrapper.componentInstance.currency.disabled).toBeFalsy();

        });

    it('should format currency based on currency code clicked', fakeAsync(() => {
        let fixtureWrapper = TestBed.createComponent(TestCurrencyBasicBehaviorComponent);
        fixtureWrapper.detectChanges();

        let dd = fixtureWrapper.nativeElement.querySelector('.w-dropdown .ui-dropdown');
        dd.click();

        tick();
        fixtureWrapper.detectChanges();

        let items = fixtureWrapper.nativeElement.querySelectorAll('.ui-dropdown-item ');
        items[3].click();

        tick();
        fixtureWrapper.detectChanges();


        flushPendingTimers();
        expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual('€1,000');
        expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(1000);
    }));

    it('should format the currency when new value is entered', fakeAsync(() => {

        let fixtureWrapper = TestBed.createComponent(TestCurrencyBasicBehaviorComponent);
        fixtureWrapper.detectChanges();

        let el = fixtureWrapper.nativeElement.querySelector('.currency-format');
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
        let fixtureWrapper = TestBed.createComponent(TestCurrencyDefaultBehaviorComponent);
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual(null);
        expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(null);
        expect(fixtureWrapper.componentInstance.currency.name).toEqual('currency');
        expect(fixtureWrapper.componentInstance.currency.editable).toBeTruthy();
        expect(fixtureWrapper.componentInstance.currency.disabled).toBeFalsy();
        expect(fixtureWrapper.componentInstance.currency.currencies.length).toEqual(5);

    }));

    it('should have initialized control correctly with default values', () => {

        let fixtureWrapper = TestBed.createComponent(TestDTContainerBehaviorComponent);
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual('$1,000');
        expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(1000);
        expect(fixtureWrapper.componentInstance.currency.name).toEqual('currency');
        expect(fixtureWrapper.componentInstance.currency.editable).toBeTruthy();
        expect(fixtureWrapper.componentInstance.currency.disabled).toBeFalsy();
    });

    it('should have read only currency code', () => {

        let fixtureWrapper = TestBed.createComponent(TestReadonlyCurrencyCodeComponent);
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.currency.displayValue).toEqual('$1,000');
        expect(fixtureWrapper.componentInstance.currency.money.amount).toEqual(1000);

        let readonlyField = fixtureWrapper.nativeElement.querySelector('.w-cc-readonly-field');
        expect(readonlyField.textContent).toEqual('USD');

        let dd = fixtureWrapper.nativeElement.querySelector('.w-dropdown .ui-dropdown');
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
class TestCurrencyDefaultBehaviorComponent
{
    @ViewChild(CurrencyComponent)
    currency: CurrencyComponent;

    constructor()
    {

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
class TestCurrencyBasicBehaviorComponent
{
    @ViewChild(CurrencyComponent)
    currency: CurrencyComponent;

    editable = true;
    currencies: string[] = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
    currencyCode: string = this.currencies[0];
    price: Money = new Money(1000, this.currencyCode);

    constructor()
    {

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
class TestDTContainerBehaviorComponent
{
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
class TestReadonlyCurrencyCodeComponent
{
    @ViewChild(CurrencyComponent)
    currency: CurrencyComponent;

    editable = true;
    currencies: string[] = ['USD', 'CNY', 'AUD', 'EUR', 'GBP'];
    currencyCode: string = this.currencies[0];
    price: Money = new Money(1000, this.currencyCode);

    constructor()
    {

    }
}

/**
 * This is workaround to get rid of XX timer(s) still in the queue, as Autocomplete from PrimeNg
 * is using Timers and they are not cleared before tests finishes I get this error
 */
function flushPendingTimers()
{

    let zone: any = readGlobalParam('Zone');

    if (isPresent(zone) &&
        isPresent(zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec)) {

        zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec.pendingTimers = [];
    }
}
