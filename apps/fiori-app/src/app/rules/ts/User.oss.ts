/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = '/*ɵ    User rules.oss -- Meta-data rules. Generated fileɵɵ    Default definitionɵ*/ɵ/*ɵ    Set specifics to FormGroup Layout containerɵɵ    you can make it more generic e.g. withɵ      layout class=User {..}ɵ      layout=Inspect class {..}ɵ    depending what you want to achiveɵ*/ɵ layout=Inspect class=User {ɵ   layoutPattern:"XL4-L3-M2-S1";ɵ   mainTitle:"User form";ɵ}ɵɵclass=User {ɵɵ    field=description {ɵ      after:zBottom;ɵ      hint: ${"You can type some long text here: " + value.length};ɵ    }ɵɵ    field=title#required {ɵ      label:"Main title";ɵ      editable:${object.firstName === "Fred"};ɵ    }ɵɵ    field=uniqueName {ɵ      trait:required;ɵ      label: "SSN #";ɵ    }ɵɵɵ   field=firstName {ɵ    rank:10;ɵ   }ɵɵɵ    zNone => *;ɵ    zOne => uniqueName => title;ɵ    zTwo => firstName;ɵ    zThree => firstName;ɵ    zFour => description;ɵ}ɵɵ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 