import {NgModule} from '@angular/core';
import {PlayComponent} from './play.component';
import {CommonModule} from '@angular/common';
import {
  ArrayDataProvider,
  DATA_PROVIDERS,
  DataProvider,
  FioriRulesModule
} from '@ngx-metaui/fiori-rules';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePickerModule, FormModule} from '@fundamental-ngx/core';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {User} from '../mdemo/domain/model/user';
import {UserCSV, userDB} from '../mdemo/domain/rest/user';
import {Address} from '../mdemo/domain/model/address';
import {AddressCSV, addressDB} from '../mdemo/domain/rest/address';
import {Supplier} from '../mdemo/domain/model/supplier';
import {SupplierCSV, supplierWithLocations} from '../mdemo/domain/rest/supplier';
import {PaymentTerms} from '../mdemo/domain/model/payment-terms';
import {PaymentTermsCSV, paymentTermsDB} from '../mdemo/domain/rest/payment-terms';



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
    PlayComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    FioriRulesModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormModule,
    DatePickerModule,
    MetaUIRulesModule

  ],
  providers: [
    {provide: DATA_PROVIDERS, useFactory: heroServiceFactory}
  ]
})
export class PlaygroundModule {
}
