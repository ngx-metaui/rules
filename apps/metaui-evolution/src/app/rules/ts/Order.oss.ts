/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const OrderRule = '/**     Declare basic classs definitions */ class=Order {      @field=title#derived {         type:String;         value:${"Purchase Order: " + object.name };         bindings:{             useNoLabelLayout:true;         };         wrapperComponent:GenericContainerComponent;         wrapperBindings: { tagName:h2; };     }      field=uniqueName {         label:"PO #";     }      field=description {         bindings: {             styleClass: "u-description";         };     }      field=requestor#asHover {         label: "Buyer";     }     zNone => *;    zTop => title;    zLeft => uniqueName => requestor => totalAmount => orderDate => state;    zRight => shippingAddress#asObject => billingAddress#asObject;    zBottom => description; }  ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 