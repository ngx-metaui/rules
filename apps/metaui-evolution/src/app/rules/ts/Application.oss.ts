/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const ApplicationRule = '@module=Home {     label:"My Home";     pageTitle:"You are now on Homepage";      @layout=Today {        after:zTop;        label: "Sales Graph";        component:SalesGraphComponent;     }      @layout=Sport {        after:Today;        label: "Sport today!";        component:StringComponent;        bindings:{value:"The Texas Tech quarterback <br/><br/><br/><br/><br/><br/><br/><br/>                         off a long day of measuring and team interviews and psychological testing ";        };     }        @layout=Tech {            after:Sport;            label: "Tech News";            component:StringComponent;            bindings:{value:"The most positive trend here is the addition of sensors to <br/><br/><br/><br/><br/>                         <br/><br/> don’t secure their phones well or at all ";            };      }       @layout=MessageBoard {         after:zBottom;         label: "Message Board";         component:StringComponent;         portletWidth:large;         bindings:{           value:"<b>Message from PR</b><br/>                     The most positive trend here is the addition of sensors to even low-end Android phones that unlock the device after                     detecting the user’s fingerprint. <br/> Why? Too many people don’t secure their phones well or at all ";         };      }  }    @module=Products {     pageTitle:"You are now on Products";     homePage:ProductContentComponent; }   @module=Sources {     label:"Sources for Module";     homePage:SourcesComponent;  } ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 