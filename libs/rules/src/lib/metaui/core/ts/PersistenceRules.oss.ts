/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const PersistenceRulesRule = '/**ɵ * @licenseɵ * Copyright 2017 SAP Aribaɵ *ɵ * Licensed under the Apache License, Version 2.0 (the "License");ɵ * you may not use this file except in compliance with the License.ɵ * You may obtain a copy of the License atɵ *ɵ * http://www.apache.org/licenses/LICENSE-2.0ɵ *ɵ * Unless required by applicable law or agreed to in writing, softwareɵ * distributed under the License is distributed on an "AS IS" BASIS,ɵ * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.ɵ * See the License for the specific language governing permissions andɵ * limitations under the License.ɵ *ɵ * Based on original work: MetaUI: Craig Federighi (2008)ɵ *ɵ */ɵɵclass {ɵ    displayKey:toString;ɵɵ    searchOperation:search;ɵɵ    trait=Searchable {ɵ        textSearchSupported:true;ɵ        searchOperation:keywordSearch;ɵ    }ɵɵɵ    operation=keywordSearch {ɵ        useTextIndex:true;ɵɵ        field {ɵ          visible:false;ɵ        }ɵ        @field=keywords#SearchableProperty {ɵ          visible:true!;ɵ          type:string;ɵ          rank:0;ɵ          after:zTop;ɵ          bindings: {ɵ            size:30;ɵ          };ɵ        }ɵ    }ɵɵ    operation=textSearch {ɵ        field {ɵ            trait=SearchableProperty {ɵ                visible:true!;ɵ            }ɵ        }ɵ    }ɵ}ɵɵɵɵ@traitGroup=RelViewers {ɵ    @trait=toOneRelationship;ɵ    @trait=toManyChooser;ɵ    @trait=toManyLink;ɵ}ɵɵɵaction=Inspect {ɵ    visible:true;ɵ    trait:pageAction;ɵ    pageName:MetaContentPageComponent;ɵ    pageBindings: {ɵ        object:${object};ɵ        operation:view;ɵ        layout:Inspect;ɵ        clientPanel:true;ɵ    };ɵ}ɵ';
/* tslint:disable */
/**
 *  @formatter:on
 *
 */
 