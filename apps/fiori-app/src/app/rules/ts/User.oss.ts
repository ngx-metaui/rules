/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = '/*ɵ    User rules.oss -- Meta-data rules. Generated fileɵɵ    Default definitionɵ*/ɵ/*ɵ    Set specifics to FormGroup Layout containerɵɵ    you can make it more generic e.g. withɵ      layout class=User {..}ɵ      layout=Inspect class {..}ɵ    depending what you want to achiveɵ*/ɵlayout class=User {ɵɵ   layoutPattern:"XL2-L2-M1-S1";ɵ}ɵɵɵclass=User {ɵ   layout=PageTitle {ɵ     title:"Checkout Page";ɵ   }ɵɵ   field=description {ɵ      after:zBottom;ɵ      hint: ${"You can type some long text here: " + value.length};ɵ    }ɵɵ    field=title#required {ɵ      label:"Main title";ɵ      editable:${object.firstName === "Fred"};ɵ    }ɵɵ    field=uniqueName {ɵ      trait:required, heading2;ɵ      editable:false;ɵ      label: "SSN #";ɵ    }ɵɵɵ   field=firstName {ɵ    trait: heading2;ɵ    editable:false;ɵ    alignEnd:true;ɵ    rank:10;ɵ   }ɵɵɵ    zNone => *;ɵ    Header.zDetail => uniqueName => firstName;ɵ    Content.zOne => title;ɵ    Content.zTwo => description;ɵ}ɵɵclass=User {ɵ   layout=PageLayoutActions action {ɵ     visible: false;ɵ   }ɵɵ   layout=PageFooterActions actionCategory=FooterPageActions{ɵ     visible: false;ɵ   }ɵɵ   layout=PageGlobalActions {ɵ     actionCategory=GlobalPageActions {ɵ       @action=submit {ɵ           trait:controllerAction;ɵ           visible:true;ɵ           type:"emphasized";ɵ       }ɵ       @action=edit {ɵ           trait:controllerAction;ɵ           visible:true;ɵ       }ɵ     }ɵ   }ɵ}ɵɵ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 