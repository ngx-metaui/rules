/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = '/*     User rules.oss -- Meta-data rules. Generated file      Default definition */ class=User {    field {       placeholder:"Enter value";    }      field=title {       trait:bold;     }      field=uniqueName {       label: "SSN #";       placeholder:"Enter your name";       valid:${ value.includes("00") ? true : "There must be 2 zeros." };     }      /* field=uniqueName {       label: "Id";       hint: "This is generated field.";     }*/      field=(firstName, lastName) {       trait:required;     }      field=prefAirline {         label:"My airlines";         trait:required,asSelect;         choices:${controller.airlines};     }      field=favColor {         trait:asSelect;         choices:["Blue", "Red", "Yellow"];     }      field=favAnimal {        label: "My Animal";        hint: ${"Animal says: " + value.sound};        trait:asAutoComplete,required;        choices:${controller.animals};     }      field=isChecked {       label: "Do I live in cave?";     }      field=toppings {        label:"Preferred toppings";        choices:["Extra cheese", "Mushroom", "Onion", "Pepperoni", "Sausage", "Tomato"];     }      field=description {        hint: ${"You can type some long text here: " + value.length};     }      zNone => *;     zLeft => title => uniqueName => firstName => lastName => prefAirline => favAnimal => isChecked => toppings => description; }    /**   .User .prefAirline {      trait:toOneRelationship;   }  */ class=User field=prefAirline {    trait:toOneRelationship; }    class=User {   object {       action=assignRole {           buttonStyle:"primary";        }        action=deactivateAccount {         buttonStyle:"warn";         visible: ${properties.get("editing")};         }   } }         ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 