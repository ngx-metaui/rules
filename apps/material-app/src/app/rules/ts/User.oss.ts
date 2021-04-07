/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = '/*ɵ    User rules.oss -- Meta-data rules. Generated fileɵɵ    Default definitionɵ*/ɵclass=User {ɵ    field=title {ɵ      after:zTop;ɵ      trait:bold;ɵ      visible: ${object.firstName !== "boom"};ɵ    }ɵɵ    field=(uniqueName , firstName , prefAirline , favAnimal , toppings) {ɵ      after: zLeft;ɵ    }ɵɵ    field=(lastName , favColor , birthDate , isChecked) {ɵ          after: zRight;ɵ    }ɵɵ    field=uniqueName {ɵ      label: "SSN #";ɵ    }ɵɵɵ   /* field=uniqueName {ɵ      label: "Id";ɵ      hint: "This is generated field.";ɵ    }*/ɵɵ    field=(firstName, lastName) {ɵ      trait:required;ɵ    }ɵɵ    field=prefAirline {ɵ        label:"My airlines";ɵ        trait:required,asSelect;ɵ        choices:${controller.airlines};ɵ    }ɵɵ    field=favColor {ɵ        trait:asSelect;ɵ        choices:["Blue", "Red", "Yellow"];ɵ    }ɵɵ    field=favAnimal {ɵ       label: "My Animal";ɵ       hint: ${"Animal says: " + value.sound};ɵ       trait:asAutoComplete,required;ɵ       choices:${controller.animals};ɵ    }ɵɵ    field=isChecked {ɵ      label: "Do I live in cave?";ɵ    }ɵɵ    field=toppings {ɵ       label:"Preferred toppings";ɵ       choices:["Extra cheese", "Mushroom", "Onion", "Pepperoni", "Sausage", "Tomato"];ɵ    }ɵɵ    field=description {ɵ      after:zBottom;ɵ      hint: ${"You can type some long text here: " + value.length};ɵ    }ɵɵ    zNone=> *;ɵ    zLeft => prefAirline;ɵ}ɵɵɵrole=admin class=User{ɵ  field=uniqueName {ɵ    label:"uniqueName";ɵ  }ɵ}ɵɵɵ/**ɵ  .User .prefAirline {ɵ     trait:toOneRelationship;ɵ  }ɵɵ*/ɵclass=User field=prefAirline {ɵ   trait:toOneRelationship;ɵ}ɵɵɵɵclass=User {ɵ  object {ɵ      action=assignRole {ɵ          buttonStyle:"primary";ɵ       }ɵ       action=deactivateAccount {ɵ        buttonStyle:"warn";ɵ        visible: ${properties.get("editing")};ɵɵ       }ɵ  }ɵ}ɵɵɵɵɵɵ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 