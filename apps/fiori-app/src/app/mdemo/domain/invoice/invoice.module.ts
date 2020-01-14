import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {ActionBarModule as ABCore, ActionBarModule, ButtonModule} from '@fundamental-ngx/core';
import {AddressComponent} from './address/address.component';
import {MetaUIRulesModule} from '@ngx-metaui/rules';


@NgModule({
  declarations: [
    InvoiceComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FioriRulesModule,
    ReactiveFormsModule,
    ActionBarModule,
    ABCore,
    ButtonModule,
    MetaUIRulesModule

  ],
  entryComponents: [
    AddressComponent
  ],
  exports: [
    InvoiceComponent,
    AddressComponent
  ],
  providers: []
})
export class InvoiceModule {
}
