/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const AddressRule = 'class=Address {   field=name {     trait:labelField;   }    @field=(line1 , line2) {      trait:derived;      type:String;   }   zNone => *;   zLeft => name; }   locale=de class=Address  {   field=line1 {     value:${object.lines  };   }    field=line2 {     value:${object.postalCode + ", " +  object.city +  ", "  + object.country };   }    zNone => *;   zLeft => line1 => line2 ; }   locale=us class=Address {    field=line1 {        value:${object.lines  + ", " + object.city};     }     field=line2 {       value:${object.state  + ", " + object.postalCode};     }      zNone => *;     zLeft => line1 => line2 => country ; }   locale=ja class=Address {    field=line1 {        value:${"家 :" + object.lines  + ", " + object.city};     }     field=line2 {       value:${"市 : " + object.city + ", "+object.state  + ", "};    }     @field=line3 {     trait: derived;     type: String;      value:${"郵便 : " + object.postalCode + ", "+object.country + "住所"} ;   }   zNone => *;    zLeft => line1 => line2 => line3 ; }   ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 