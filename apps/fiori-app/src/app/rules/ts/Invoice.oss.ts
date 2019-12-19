/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const InvoiceRule = 'class=Invoice {   field=uniqueName {     label: "Id";   }   field=name {     label: "Title";     trait:fluid;     placeholder: "Unique name that identifies this Invoice";   }   field=requestor {     trait:asAutoComplete;     placeholder: "Select a user";     lookupKey: "fullName";   }    field=purchaseOrder {     trait:asSelect;     choices: ["PO1111", "PO2222", "PO33333", "P33333", "PO3333", "PO44444", "PO55555"];   }    field=supplier {     trait:asAutoComplete;     placeholder: "Select a supplier";   }    field=paymentTerms {     trait:asSelect, required;     choices:${controller.paymentTermsDS};   }    field=totalAmount {     label: "Price to Pay";   }    field=billingAddress {     trait:asAutoComplete;     label: "Bill To";    }    field=shippingAddress {     trait:asAutoComplete;     label: "Ship To";   }    field=(shippingAddress, billingAddress) {     displayKey: "toString";   }    field=description {     trait:longtext;     label: "Purpose";   }    field=isShared {     label: "Ship To";   }    field=accountCategory {     trait:asSelect;     choices: ["Asset", "Order", "Cost Center", "Project"];   } }  class=Invoice {   zNone => *;   zLeft => name#fluid => requestor => needBy => accountCategory => isShared => billingAddress => shippingAddress    => supplier => paymentTerms => taxInvoiceNumber => purchaseOrder    => description;  }  /**   **/ ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 