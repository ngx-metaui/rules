import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {ActionBarModule as ABCore, ActionBarModule, ButtonModule} from '@fundamental-ngx/core';
import {AddressComponent} from './address/address.component';
import {MetaUIRulesModule} from '@ngx-metaui/rules';
import {FdpFormGroupModule} from '@fundamental-ngx/platform';


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
    FdpFormGroupModule,
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
