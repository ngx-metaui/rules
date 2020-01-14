/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const ApplicationRule = 'module {   productSwitcher:"switcher";   pageTitle:${"This is fiori MetaUI demo - " + properties.get("label")};      @actionCategory=Create {       @action=Order#pageAction {           icon:"sales-order-item";           routeName:"/mdemo/invoice/create";       }        @action=Invoice#pageAction {           icon:"money-bills";           routeName:"/mdemo/invoice/create";       }        @action=Receipt#pageAction {           icon:"customer-order-entry";           routeName:"/mdemo/invoice/create";       }   } }   @module=Home {   label:"Home";     @layout=Today {      after:zTop;      label: "News";      component:NewsComponent;    }     @layout=Documents {       after:zMain;       label: "My Documents";       component:MyDocumentsComponent;    }     @layout=Spend {       after:Documents;       label: "My Spends";       component:CommodityComponent;    }     @layout=Actions {       label:"Actions";       component:MetaActionListComponent;       after:zToc;       bindings: {        renderAs:"links";       };    }  }   @module=Invoicing {   label:"Invoicing";   homePage:"invoicing"; }   @module=Receiving {   label:"Receiving";   homePage:"receiving"; }    action {   detailRoute: "/mdemo/entity/detail";   @trait=controllerAction {       actionResults:${           m = properties.get("mRef");           m.call(this.controller, object);       };   } } ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
