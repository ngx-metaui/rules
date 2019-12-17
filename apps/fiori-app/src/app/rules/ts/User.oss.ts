/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = 'class=User {     field=(uniqueName,firstName, lastName, isChecked) {       after:zLeft;    }     field=(favColor, birthDate, toppings) {       after:zRight;    }      field=title {       label: "Main Title";        after:zTop;     }      field=uniqueName {       label: "SSN #";       after:isChecked;     }       field=favColor {         trait:asSelect;         choices:["Blue", "Red", "Yellow"];     }       field=isChecked {       label: "Do I live in cave?";     }      field=toppings {        label:"Preferred toppings";        choices:["Extra cheese", "Mushroom", "Onion", "Pepperoni", "Sausage", "Tomato"];     }       field=description {       trait:longtext;        hint: ${"You can type some long text here: " + (value && value.length)};     }   } ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 