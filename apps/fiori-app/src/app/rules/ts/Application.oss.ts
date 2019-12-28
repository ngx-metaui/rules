/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const ApplicationRule = 'module {   productSwitcher:"switcher"; }   @module=Home {   label:"Home";     @layout=Today {      after:zTop;      label: "News";      component:NewsComponent;    }     @layout=Documents {       after:zMain;       label: "My Documents";       component:MyDocumentsComponent;    }     @layout=Spend {       after:Documents;       label: "My Spends";       component:CommodityComponent;    } }   @module=Invoicing {   label:"Invoicing";   homePage:"invoicing"; }   @module=Receiving {   label:"Receiving";   homePage:"receiving"; }   action {   detailRoute: "/mdemo/entity/detail";   @trait=controllerAction {       actionResults:${           m = properties.get("mRef");           m.call(this.controller, object);       };   } }  ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 