import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {ActionBarModule as ABCore, ButtonModule} from '@fundamental-ngx/core';
import {ActionBarModule} from '@fundamental-ngx/platform';
import {InvoiceViewComponent} from './invoice-view.component';


@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceViewComponent
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
    InvoiceComponent,
    InvoiceViewComponent
  ],
  providers: []
})
export class InvoiceModule {
}
