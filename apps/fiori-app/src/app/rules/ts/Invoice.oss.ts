/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const InvoiceRule = 'class=Invoice {   field=uniqueName {     label: "Id";   }   field=name {     label: "Title";     trait: required;     placeholder: "Unique name that identifies this Invoice";   }   field=requestor {     trait:asAutoComplete, withDetail;     placeholder: "Select a user";     lookupKey: "fullName";   }    field=purchaseOrder {     visible:false;   }    field=supplier {     trait:asAutoComplete, withDetail;     placeholder: "Select a supplier";   }    field=paymentTerms {    visible:false;   }    field=(billingAddress, shippingAddress ) {     trait:asAutoComplete, inlineObject;   }     field=description {     trait:longtext;     label: "Purpose";   }     field=shareContact {     visible:${object.isShared === true};    }    field=totalAmount {     valid: ${( value.amount < 200) ? "Amount must be above 200 USD  ": true};   }    field=accountCategory {     trait:asRadio;     choices: ["Asset", "Order", "Cost Center", "Project"];   } }  class=Invoice {    operation=create {       zNone => *;       zLeft   =>  name =>  needBy => totalAmount => billingAddress => supplier;    }     operation=edit {       zNone => *;       zLeft   =>  name;    }      operation=view {       zNone => *;       zLeft   =>  name;     } }   class=Invoice object {   action=(reset, save) {       trait:controllerAction;       visible:${properties.get("editing") === true};   }     action=edit {       trait:controllerAction;       visible:${properties.get("editing") === false}; }    action=(edit, save) {     buttonOptions:"emphasized";   } }   ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 