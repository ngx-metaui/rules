/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = 'class=User {    field=uniqueName {     label:"Id";   }   field=fullName {     trait:labelField;   }    zLeft => uniqueName => firstName => organization => purchasingUnit => defaultCurrency;   zRight => fullName => lastName => email;    zBottom => description; } ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 