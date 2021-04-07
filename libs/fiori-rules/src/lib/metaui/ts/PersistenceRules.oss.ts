/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const PersistenceRulesRule = '/**ɵ * @licenseɵ * Copyright 2017 SAP Aribaɵ *ɵ * Licensed under the Apache License, Version 2.0 (the "License");ɵ * you may not use this file except in compliance with the License.ɵ * You may obtain a copy of the License atɵ *ɵ * http://www.apache.org/licenses/LICENSE-2.0ɵ *ɵ * Unless required by applicable law or agreed to in writing, softwareɵ * distributed under the License is distributed on an "AS IS" BASIS,ɵ * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.ɵ * See the License for the specific language governing permissions andɵ * limitations under the License.ɵ *ɵ * Based on original work: MetaUI: Craig Federighi (2008)ɵ *ɵ */ɵɵɵfield {ɵ    trait=withDetail {ɵ        editable=false {ɵ            component:LinkComponent;ɵ            bindings: {ɵ                click: ${ɵ                    this.set("object", value);ɵ                    this.set("actionCategory", "General");ɵ                    this.set("action", "DetailInspect");ɵ                    meta.fireAction(this, null, true)ɵ                };ɵ                ngcontent: ${value ? FieldPath.getFieldValue(value, meta.displayLabel(type, properties.get("labelField") )) : null};ɵ            };ɵ        }ɵ    }ɵ}ɵɵɵaction=DetailInspect {ɵ    visible:true;ɵ    trait:pageAction;ɵ    routeName: ${properties.get("detailRoute")};ɵ    pageBindings: {ɵ        id:${object.identity()};ɵ        type:${properties.get("class")};ɵ        operation:view;ɵ        layout:Inspect;ɵ    };ɵ}ɵ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 