/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = '/*ɵ    User rules.oss -- Meta-data rules. Generated fileɵɵ    Default definitionɵ*/ɵ/*ɵ    Set specifics to FormGroup Layout containerɵɵ    you can make it more generic e.g. withɵ      layout class=User {..}ɵ      layout=Inspect class {..}ɵ    depending what you want to achiveɵ*/ɵ layout=Inspect class=User {ɵ   mainTitle:"User form";ɵ   layoutPattern:"XL4-L4-M2-S1";ɵ}ɵɵɵclass=User {ɵ   layout=PageTitle {ɵ     title:"Checkout Page";ɵ   }ɵɵ   field=description {ɵ      after:zBottom;ɵ      hint: ${"You can type some long text here: " + value.length};ɵ    }ɵɵ    field=title#required {ɵ      label:"Main title";ɵ      editable:${object.firstName === "Fred"};ɵ    }ɵɵ    field=uniqueName {ɵ      trait:required;ɵ      label: "SSN #";ɵ    }ɵɵɵ   field=firstName {ɵ    rank:10;ɵ   }ɵɵɵ    zNone => *;ɵ    Header.zOne => uniqueName;ɵ    Header.zTwo => firstName;ɵ    Content.zOne => title;ɵ    Content.zTwo => description;ɵ}ɵɵclass=User {ɵ   layout=PageGlobalActions action=accept {ɵ     disabled: ${object.firstName === "Fredd"};ɵ   }ɵ}ɵ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 