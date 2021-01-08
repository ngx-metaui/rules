import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceCreateComponent} from './invoice-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {ActionBarModule, ButtonModule} from '@fundamental-ngx/core';
import {InvoiceViewComponent} from './invoice-view.component';
import {InvoiceEditComponent} from './invoice-edit.component';
import {AddressComponent} from './address/address.component';
import {
  FdpFormGroupModule,
  PlatformActionBarModule,
  PlatformActionButtonGroupModule,
  PlatformButtonModule
} from '@fundamental-ngx/platform';


@NgModule({
  declarations: [
    InvoiceCreateComponent,
    InvoiceViewComponent,
    InvoiceEditComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FioriRulesModule,
    ReactiveFormsModule,
    ActionBarModule,
    ButtonModule,
    FdpFormGroupModule,
    PlatformButtonModule,
    PlatformActionBarModule,
    PlatformActionButtonGroupModule

  ],
  exports: [
    InvoiceCreateComponent,
    InvoiceViewComponent,
    InvoiceEditComponent,
    AddressComponent
  ],
  providers: []
})
export class InvoiceModule {
}
