/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const PersistenceRulesRule = '/**  * @license  * Copyright 2017 SAP Ariba  *  * Licensed under the Apache License, Version 2.0 (the "License");  * you may not use this file except in compliance with the License.  * You may obtain a copy of the License at  *  * http://www.apache.org/licenses/LICENSE-2.0  *  * Unless required by applicable law or agreed to in writing, software  * distributed under the License is distributed on an "AS IS" BASIS,  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  * See the License for the specific language governing permissions and  * limitations under the License.  *  * Based on original work: MetaUI: Craig Federighi (2008)  *  */   field {     trait=withDetail {         editable=false {             component:LinkComponent;             bindings: {                 click: ${                     this.set("object", value);                     this.set("actionCategory", "General");                     this.set("action", "DetailInspect");                     meta.fireAction(this, null, true)                 };                 ngcontent: ${value ? FieldPath.getFieldValue(value, meta.displayLabel(type, properties.get("labelField") )) : null};             };         }     } }   action=DetailInspect {     visible:true;     trait:pageAction;     routeName: ${properties.get("detailRoute")};     pageBindings: {         id:${object.identity()};         type:${properties.get("class")};         operation:view;         layout:Inspect;     }; } ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 