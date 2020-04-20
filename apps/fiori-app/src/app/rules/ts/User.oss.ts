/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = 'class=User {    field=uniqueName {     label:"Id";   }   field=fullName {     trait:labelField;   }     zNone => *;    zLeft => uniqueName#required => firstName => lastName => email => defaultCurrency;   } ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 