/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const AddressRule = ' class=Address {    field=fullName {     label: "Name";   }    @field=zipCity#derived {        label: "Zip,";        type:String;        value:${object.zip  + ", " + object.city};    }     zNone => *;    zLeft => fullName => street => zipCity; }    ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 