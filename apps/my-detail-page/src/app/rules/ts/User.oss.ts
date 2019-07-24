/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const UserRule = '/*     User rules.oss -- Meta-data rules. Generated file      Default definition */ class=User {       field=uniqueName {            label:"Id";       }        field=name {            label:"Full name";            trait:required;            editable: ${object.isAngularDeveloper};       }        field=description {            trait:longtext;             editing=false {             visible: ${object.isAngularDeveloper};            }       }        field=luckyNumbers {          trait:list;          choices:[1, 2, 4, 5, 6, 9, 10];          chooserStyle:Chooser;           bindings:{             multiselect:true;           };       }        field=favColors {          trait:list;          choices:["red", "blue", "orangle", "purple", "yellow", "black"];          chooserStyle:Checkbox;       }         field=status {          trait:list,required;          choices:["New", "In Progress", "Reviewing", "Checked"];          chooserStyle:Dropdown;        }          field=drivingSkill {           trait:list,required;           choices:["Bad", "Good", "Excellent"];           chooserStyle:Radio;         }         zNone => *;       zLeft => uniqueName => name => description => created => drivingSkill;       zRight => age => luckyNumbers => favColors => status  => isAngularDeveloper; }     ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 