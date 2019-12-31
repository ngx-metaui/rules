import {NgModule} from '@angular/core';
import {ShellbarModule} from '@fundamental-ngx/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {
  ArrayDataProvider,
  DATA_PROVIDERS,
  DataProvider,
  MetaApplicationModule
} from '@ngx-metaui/fiori-rules';
import {HomeComponent} from './home.component';
import {MetaDemoRoutingModule} from './meta-demo-routing.module';
import {InvoiceModule} from './domain/invoice/invoice.module';
import {User} from './domain/model/user';
import {UserCSV, userDB} from './domain/rest/user';
import {Address} from './domain/model/address';
import {AddressCSV, addressDB} from './domain/rest/address';
import {Supplier} from './domain/model/supplier';
import {SupplierCSV, supplierWithLocations} from './domain/rest/supplier';
import {PaymentTerms} from './domain/model/payment-terms';
import {PaymentTermsCSV, paymentTermsDB} from './domain/rest/payment-terms';


const heroServiceFactory = () => {
  const providers = new Map<string, DataProvider<any>>();

  providers.set('User', new ArrayDataProvider<User>(
    userDB.map((i: UserCSV) => {

      const user = i.Name.split(' ');

      return new User(
        i.UniqueName, i.Name, user[0].trim(), user[1].trim(), i.Organization, i.EmailAddress,
        'US004', i.LocaleID, i.DefaultCurrency, '');
    })));


  providers.set('Address', new ArrayDataProvider<Address>(
    addressDB.map((i: AddressCSV) => {

      return new Address(
        i.UniqueName, i.Name, i.Lines, i.City, i.State, i.PostalCode + '',
        i.Phone, i.Fax, i.Email, i.URL, i.Country);
    })));


  providers.set('Supplier', new ArrayDataProvider<Supplier>(
    supplierWithLocations().map((i: SupplierCSV) => {
      return new Supplier(i.UniqueName, i.Name, i.location.Name, i.location.Contact,
        i.location.Lines, i.location.City, i.location.State, i.location.PostalCode,
        i.location.Country, i.location.Phone, i.location.EmailAddress);
    })));


  providers.set('PaymentTerms', new ArrayDataProvider<PaymentTerms>(
    paymentTermsDB.map((i: PaymentTermsCSV) => {
      return new PaymentTerms(i.UniqueName, i.Name, i.Description);
    })));

  return providers;
};


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ShellbarModule,
    MetaDemoRoutingModule,
    InvoiceModule,
    MetaApplicationModule
  ],
  providers: [
    {provide: DATA_PROVIDERS, useFactory: heroServiceFactory}
  ]
})
export class MetaDemoModule {
}



