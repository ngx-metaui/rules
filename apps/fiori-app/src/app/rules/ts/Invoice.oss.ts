/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const InvoiceRule = 'class=Invoice {   field=name {     trait:fluid;   }     field {      after:zNone;    }    field=(name, requestor, needBy, accountCategory, shippingAddress, billingAddress) {     after: zLeft;   }    field=(totalAmount, supplier, paymentTerms, taxInvoiceNumber, purchaseOrder, isShared, shareContact) {     after: zRight;   }     field=description {       trait:longtext;       after: zBottom;     } } ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 