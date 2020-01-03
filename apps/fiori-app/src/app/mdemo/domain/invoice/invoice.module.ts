import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FioriRulesModule} from '@ngx-metaui/fiori-rules';
import {ActionBarModule as ABCore, ActionBarModule, ButtonModule} from '@fundamental-ngx/core';
import {MetaUIRulesModule} from '@ngx-metaui/rules';


@NgModule({
  declarations: [
    InvoiceComponent
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
  entryComponents: [],
  exports: [
    InvoiceComponent
  ],
  providers: []
})
export class InvoiceModule {


  constructor() {
    // demo data

    localStorage.setItem('demo-invoice',
      `{"internalId":1,"name":"Angular Work Oct 1234","requestor":{"uniqueName":"akarras","fullName":"Arnold Karras","firstName":"Arnold","lastName":"Karras","organization":"Buyer","email":"nobody@ansmtp.ariba.com","purchasingUnit":"US004","locale":"en_US","defaultCurrency":"USD","description":""},"billingAddress":{"uniqueName":"US001","name":"Austin","lines":"3450 Industrial Park Road","city":"Austin","state":"TX","postalCode":"78701","phone":"214-401-5555","fax":"214-401-5575","email":"","url":"","country":"US"},"shippingAddress":{"uniqueName":"US003","name":"Sacramento","lines":"1400 Global Parkway","city":"Sacramento","state":"CA","postalCode":"95801","phone":"916-465-7890","fax":"916-465-7699","email":"","url":"","country":"US"},"needBy":"2019-12-17T23:00:00.000Z","accountCategory":"Order","isShared":null,"uniqueName":"INV-1","totalAmount":{"amount":2000,"currency":"USD","locale":"en_US"},"supplier":{"uniqueName":11,"name":"JCN Technologies (AN - Fulfillment FT)","locationName":"Fritz Lohr : STUTTGART","contact":"Fritz Lohr","lines":"Schelmenwasenstrasse 40","city":"Stuttgart","state":"","postalCode":7000,"country":"DE","phone":"(1)172-435-7982","email":""},"paymentTerms":"EOM","taxInvoiceNumber":"WE3434","purchaseOrder":"PO2222","description":"Invoice description\\n"}`
    );


  }
}
