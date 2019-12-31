/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const InvoiceRule = 'class=Invoice {   field=uniqueName {     label: "Id";   }   field=name {     label: "Title";     trait: required;     placeholder: "Unique name that identifies this Invoice";   }   field=requestor {     trait:asAutoComplete, withDetail;     placeholder: "Select a user";     lookupKey: "fullName";   }    field=purchaseOrder {     trait:asSelect;     choices: ["PO1111", "PO2222", "PO33333", "P33333", "PO3333", "PO44444", "PO55555"];     editable:${object.accountCategory == "Order"};   }    field=supplier {     trait:asAutoComplete, withDetail;     placeholder: "Select a supplier";   }    field=paymentTerms {     trait:asSelect, required;     choices:${controller.paymentTermsDS};   }    field=(billingAddress, shippingAddress ) {     trait:asAutoComplete, inlineObject;   }     field=description {     trait:longtext;     label: "Purpose";   }     field=shareContact {     visible:${object.isShared === true};    }    field=totalAmount {     valid: ${( value.amount < 200) ? "Amount must be above 200 USD  ": true};   }    field=accountCategory {     trait:asRadio;     choices: ["Asset", "Order", "Cost Center", "Project"];   } }  class=Invoice {    operation=create {       zNone => *;       zLeft   =>  name =>  needBy => totalAmount => billingAddress => supplier;    }     operation=edit {       zNone => *;       zLeft   =>  name#fluid => requestor =>  needBy => purchaseOrder => shippingAddress => billingAddress => accountCategory;       zRight  => totalAmount => supplier => paymentTerms => taxInvoiceNumber => isShared => shareContact;       zBottom => description;    }      operation=view {       zNone => *;       zLeft   => name  => requestor => needBy => purchaseOrder => shippingAddress => billingAddress => accountCategory;       zRight  => uniqueName => totalAmount => supplier => paymentTerms => taxInvoiceNumber => isShared => shareContact;       zBottom => description;     } }   class=Invoice object {   action=(reset, save) {       trait:controllerAction;       visible:${properties.get("editing") === true};   }     action=edit {       trait:controllerAction;       visible:${properties.get("editing") === false};   }    action=(edit, save) {     buttonOptions:"emphasized";   } }   ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 