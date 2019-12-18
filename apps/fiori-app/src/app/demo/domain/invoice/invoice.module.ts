import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceCreateComponent} from './invoice-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {ActionBarModule as ABCore, ButtonModule} from '@fundamental-ngx/core';
import {ActionBarModule} from '@fundamental-ngx/platform';
import {InvoiceViewComponent} from './invoice-view.component';
import {InvoiceEditComponent} from './invoice-edit.component';
import {AddressComponent} from './address/address.component';


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
    ABCore,
    ButtonModule

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
