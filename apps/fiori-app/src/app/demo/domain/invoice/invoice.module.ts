import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {ActionBarModule} from '@fundamental-ngx/platform';


@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FioriRulesModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ActionBarModule
  ],
  exports: [
    InvoiceComponent
  ],
  providers: []
})
export class InvoiceModule {
}
