/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import { AfterContentInit, EventEmitter, QueryList, SimpleChanges } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BottomZoneComponent, LeftZoneComponent, MiddleZoneComponent, RightZoneComponent, TopZoneComponent } from '../five-zone-layout.component';
import { FormRowComponent } from './form-row/form-row.component';
import { BaseFormComponent } from '../../core/base-form.component';
/**
 * FormTable is a specific layout component for rendering Labels and its controls in two columns
 * and 5 different zones.
 *
 * We support LEFT, MIDDLE, RIGHT, TOP, BOTTOM zone where we can place our component or widgets.
 * This
 * component is used as primary layout to wrap all the common use cases. E.g. When we lay out
 * fields in the form I do not want controls to be aware of error validation, size, labels, and
 * some other things. Control such INPUT is just responsible for retrieve user value but not how it
 * appear on the page.
 *
 * This way we can be flexible how we treat widgets for different kinds of situation depending
 * where they appear

 * FormTable just like the rest of the components are using Model driven approach how to work with
 * data, mean we are using FormGroup, FormControl etc. FormGroup can be passed into the FormTable,
 * otherwise its automatically created when the FormTable is instantiated.
 *
 * FormGroup is saved insode Environment where we are using this to pass this around the pages and
 * components.
 *
 * ### Example
 *
 * Simple Layout fields and its control
 *
 *
 * ```typescript
 *  @Component({
 *      selector: 'wrapper-comp' ,
 *      template: `
 *  			<aw-form-table [formGroup]="formGroup" (onSubmit)=>
 *  				<aw-form-row [label]="'name'" [name]="'name'">
 *  					<aw-input-field [type]="'string'"></aw-input-field>
 *  				</aw-form-row>
 *
 *  				<aw-form-row [label]="'Preferred Colors'" [name]="'myColors'">
 *  					<aw-checkbox-list [list]="checkBoxListValues"
 *  					                 [selections]="selectedValues"
 *  					                 [layout]="'inline'"
 *  					                 (onSelection)="onCBClick($event)">
 *  					</aw-checkbox-list>
 *  				</aw-form-row>
 *  				<aw-form-row [label]="'Gender'" [name]="'gender'">
 *
 *  					<aw-radiobutton-list [list]="rbValues" [selection]="rbSelection">
 *
 *  					</aw-radiobutton-list>
 *
 *  				</aw-form-row>
 *  				<aw-form-row [label]="'My birthdate'" [name]="'birthDate'" [size]="'small'">
 *
 *  					<aw-date-time [value]="date" [editable]="editable" [showTime]="showTime">
 *  					</aw-date-time>
 *  				</aw-form-row>
 *  			</aw-form-table>
 *    `
 *  })
 *  export class ShowUserInfoComponent
 *  {
 *       checkBoxListValues: string[] = ['blue' , 'red' , 'yellow' , 'orange' , 'white' , 'silver'
 *     , 'black' , 'Green'
 *     , 'Gray' , 'Navy' ,
 *          'Olive' , 'Aqua' , 'Purple'];
 *      selectedValues: string[] = ['blue' , 'Olive' , 'Aqua' , 'Purple'];
 *      rbValues: string[] = ['male' , 'female' , 'other'];
 *      rbSelection: string = 'male';
 *      editable: boolean = true;
 *      showTime: boolean = true;
 *
 *      formGroup: FormGroup = new FormGroup({});
 *
 *
 *      onCBClick (event): void
 *      {
 *          console.log('onCBClick = ' + event);
 *      }
 *
 *      onSubmit (model: any): void
 *      {
 *         console.log(model)
 *
 *         // will print { name:null, myColors:['blue' , 'Olive' , 'Aqua' , 'Purple'], gender:
 *     male}
 *      }
 *
 *  }
 *
 *  ```
 *
 *  Or you can use zone to layout these fields into two columns:
 *
 *  Current zones are implement with <ng-content SELECT> which is just a selector to searches for
 *     specific pattern. In our case instead of creating extra wrapper custom component use simple
 *     CSS class
 *
 *
 *  ```
 *            <aw-form-table #metaFormTable [editable]="editing"
 *                          [useFiveZone]="isFiveZoneLayout"
 *                          (onSubmit)="onSaveAction($event)">
 *
 *                <aw-left  *ngIf="canShowZone('zLeft')">
 *
 *                        <aw-form-row [label]="'name'" [name]="'name'">
 *                            <aw-input-field [type]="'string'"></aw-input-field>
 *                        </aw-form-row>
 *
 *                        <aw-form-row [label]="'Preferred Colors'" [name]="'myColors'">
 *                            <aw-checkbox-list [list]="checkBoxListValues"
 *                                             [selections]="selectedValues"
 *                                             [layout]="'inline'"
 *                                             (onSelection)="onCBClick($event)">
 *                            </aw-checkbox-list>
 *                        </aw-form-row>
 *                </aw-left>
 *
 *
 *                <aw-right  *ngIf="canShowZone('zRight')">
 *                        <aw-form-row [label]="'Gender'" [name]="'gender'">
 *                                <aw-radiobutton-list [list]="rbValues" [selection]="rbSelection">
 *                                </aw-radiobutton-list>
 *                        </aw-form-row>
 *
 *                        <aw-form-row [label]="'My birthdate'" [name]="'birthDate'"
 *     [size]="'small'">
 *                            <aw-date-time [value]="date" [editable]="editable"
 *     [showTime]="showTime">
 *                            </aw-date-time>
 *                        </aw-form-row>
 *                </<aw-right>
 *            </aw-form-table>
 *
 *  ```
 *
 *  todo: remove my css selectors for zones and replace it with real component even just a tag
 *  todo: would work file
 *
 */
export declare class FormTableComponent extends BaseFormComponent implements AfterContentInit {
    env: Environment;
    /**
     * Used for the form layout to see if we need to render labels stacked  or side by side next to
     * the control
     *
     */
    labelsOnTop?: boolean;
    /**
     *
     * Is this a 4 zone layout
     *
     */
    useFiveZone?: boolean;
    /**
     * For certain usecase we dont want to set automatically this to all children
     */
    editabilityCheck: boolean;
    /**
     *  Triggers when the <form> is submitted. onSubmit we emit the whole formController objects
     *
     *
     */
    onSubmit: EventEmitter<any>;
    /**
     * These properties represent individual zones and we use them to adjust our column grid
     * layout
     */
    leftZone: LeftZoneComponent;
    middleZone: MiddleZoneComponent;
    rightZone: RightZoneComponent;
    topZone: TopZoneComponent;
    bottomZone: BottomZoneComponent;
    formFields: QueryList<BaseFormComponent>;
    rows: QueryList<FormRowComponent>;
    /**
     * Cache calculated properties when init this component
     *
     */
    hasOneColumn: boolean;
    hasTwoColumn: boolean;
    hasThreeColumn: boolean;
    constructor(env: Environment);
    ngOnChanges(changes: SimpleChanges): void;
    onSubmitForm(event: any): void;
    /**
     *
     * Are labels on top
     *
     */
    isLabelsOnTop(): boolean;
    /**
     *
     * Used by child component to inherit editability
     *
     */
    isFormEditable(): boolean;
    applyColumns(): void;
    private hasAnyZones();
    /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     */
    isTwoZoneReady(): boolean;
    /**
     * Helper method to check if we already initialized the classList.
     * the
     *
     * TODO: Probably string array would be easier
     */
    isThreeZoneReady(): boolean;
    ngAfterContentInit(): void;
    private updateFormFields();
    /**
     * Based on if we are 2 or 3 or 1 column layout we need to adjust widgets width within the
     * form row.
     */
    private adjustLayout();
}
