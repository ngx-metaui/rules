import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {AppComponent} from './app.component';
import {PlaygroundModule} from './playground/play.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MetaConfig, MetaUIRulesModule} from '@ngx-metaui/rules';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import * as userRules from './user-rules';
import localeStr from '@angular/common/locales/es-US';
import {BaseDataProvider, DATA_PROVIDERS, DataProvider} from '@fundamental-ngx/platform';
import {User} from '../../../../temp/demo/domain/model/user';
import {UserCSV, userDB} from '../../../../temp/demo/domain/rest/user';
import {Address} from '../../../../temp/demo/domain/model/address';
import {AddressCSV, addressDB} from '../../../../temp/demo/domain/rest/address';
import {Supplier} from '../../../../temp/demo/domain/model/supplier';
import {SupplierCSV, supplierWithLocations} from '../../../../temp/demo/domain/rest/supplier';
import {PaymentTerms} from '../../../../temp/demo/domain/model/payment-terms';
import {PaymentTermsCSV, paymentTermsDB} from '../../../../temp/demo/domain/rest/payment-terms';
import {DynamicComponentService} from '@fundamental-ngx/core';


const dataProviderServiceFactory = () => {
  const providers = new Map<string, DataProvider<any>>();

  providers.set('User', new BaseDataProvider<User>(
    userDB.map((i: UserCSV) => {

      const user = i.Name.split(' ');

      return new User(
        i.UniqueName, i.Name, user[0].trim(), user[1].trim(), i.Organization, i.EmailAddress,
        'US004', i.LocaleID, i.DefaultCurrency, '');
    })));


  providers.set('Address', new BaseDataProvider<Address>(
    addressDB.map((i: AddressCSV) => {

      return new Address(
        i.UniqueName, i.Name, i.Lines, i.City, i.State, i.PostalCode + '',
        i.Phone, i.Fax, i.Email, i.URL, i.Country);
    })));


  providers.set('Supplier', new BaseDataProvider<Supplier>(
    supplierWithLocations().map((i: SupplierCSV) => {
      return new Supplier(i.UniqueName, i.Name, i.location.Name, i.location.Contact,
        i.location.Lines, i.location.City, i.location.State, i.location.PostalCode,
        i.location.Country, i.location.Phone, i.location.EmailAddress);
    })));


  providers.set('PaymentTerms', new BaseDataProvider<PaymentTerms>(
    paymentTermsDB.map((i: PaymentTermsCSV) => {
      return new PaymentTerms(i.UniqueName, i.Name, i.Description);
    })));

  return providers;
};


const LOCALE = 'us';

registerLocaleData(localeStr, LOCALE);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // DemoModule,
    // PlaygroundModule,
    // MetaDemoModule,
    PlaygroundModule,
    MetaUIRulesModule.forRoot(),
    FioriRulesModule.forRoot(),
    AppRoutingModule

  ],
  exports: [],
  providers: [
    DynamicComponentService,
    {provide: LOCALE_ID, useValue: LOCALE},
    {provide: DATA_PROVIDERS, useFactory: dataProviderServiceFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private config: MetaConfig) {

    const rules: any[] = config.get('metaui.rules.user-rules') || [];
    rules.push(userRules);
    config.set('metaui.rules.user-rules', rules);
  }
}
