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
import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import {isPresent} from '../../core/utils/lang';

import {
  BottomZoneComponent,
  LeftZoneComponent,
  MiddleZoneComponent,
  RightZoneComponent,
  TopZoneComponent
} from '../five-zone-layout.component';
import {BaseFormComponent, Environment} from '@ngx-metaui/rules';


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
@Component({
  selector: 'aw-form-table',
  templateUrl: 'form-table.component.html',
  styleUrls: ['form-table.component.scss'],
  providers: [
    {provide: BaseFormComponent, useExisting: forwardRef(() => FormTableComponent)}
  ]
})
export class FormTableComponent extends BaseFormComponent implements AfterContentInit {

  /**
   * Used for the form layout to see if we need to render labels stacked  or side by side next to
   * the control
   *
   */
  @Input()
  labelsOnTop?: boolean = false;


  /**
   *
   * Is this a 4 zone layout
   *
   */
  @Input()
  useFiveZone?: boolean = false;

  /**
   * For certain usecase we dont want to set automatically this to all children
   */
  @Input()
  editabilityCheck: boolean = true;

  /**
   *  Triggers when the <form> is submitted. onSubmit we emit the whole formController objects
   *
   *
   */
  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter();


  /**
   * These properties represent individual zones and we use them to adjust our column grid
   * layout
   */
  @ContentChild(LeftZoneComponent) leftZone: LeftZoneComponent;

  @ContentChild(MiddleZoneComponent) middleZone: MiddleZoneComponent;

  @ContentChild(RightZoneComponent) rightZone: RightZoneComponent;

  @ContentChild(TopZoneComponent) topZone: TopZoneComponent;

  @ContentChild(BottomZoneComponent) bottomZone: BottomZoneComponent;


  @ContentChildren(BaseFormComponent, {descendants: true})
  formFields: QueryList<BaseFormComponent>;


  rows: BaseFormComponent[];


  /**
   * Calculated properties when init this component
   *
   */
  hasOneColumn: boolean = false;
  hasTwoColumn: boolean = false;
  hasThreeColumn: boolean = false;


  constructor(public env: Environment) {
    super(env, null);
  }


  ngOnInit(): void {
    super.ngOnInit();

    this.rows = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (isPresent(changes['editable']) &&
      changes['editable'].previousValue !== changes['editable'].currentValue) {

      this.updateFormFields();
    }
  }


  onSubmitForm(event: any) {
    this.onSubmit.emit(event);
  }

  /**
   *
   * Are labels on top
   *
   */
  isLabelsOnTop(): boolean {
    return this.labelsOnTop;
  }


  /**
   *
   * Used by child component to inherit editability
   *
   */
  isFormEditable(): boolean {
    return this.editable;
  }


  applyColumns(): void {
    if (!this.useFiveZone && this.hasAnyZones()) {
      throw new Error('Zones detected in the FormTable but useFiveZone option is false');
    }

    this.hasOneColumn = !isPresent(this.rightZone) && !isPresent(this.middleZone);
    this.hasTwoColumn = isPresent(this.leftZone) && isPresent(this.rightZone) &&
      !isPresent(this.middleZone);

    this.hasThreeColumn = isPresent(this.leftZone) && isPresent(this.rightZone) &&
      isPresent(this.middleZone);

    if (this.hasTwoColumn && !this.isTwoZoneReady()) {
      this.leftZone.classList += ' ui-md-6 ui-lg-6';
      this.rightZone.classList += ' ui-md-6 ui-lg-6';
    }

    if (this.hasThreeColumn && !this.isThreeZoneReady()) {
      this.leftZone.classList += ' ui-md-6 ui-lg-4';
      this.rightZone.classList += ' ui-md-6 ui-lg-4';
    }
  }


  private hasAnyZones() {
    return isPresent(this.leftZone) || isPresent(this.rightZone) || isPresent(this.middleZone)
      || isPresent(this.topZone) || isPresent(this.bottomZone);
  }

  /**
   * Helper method to check if we already initialized the classList.
   * the
   *
   * TODO: Probably string array would be easier
   */
  isTwoZoneReady(): boolean {
    return this.leftZone.classList.indexOf('ui-lg-6') > 0 &&
      this.leftZone.classList.indexOf('ui-lg-6') > 0;
  }


  /**
   * Helper method to check if we already initialized the classList.
   * the
   *
   * TODO: Probably string array would be easier
   */
  isThreeZoneReady(): boolean {
    return this.leftZone.classList.indexOf('ui-lg-4') > 0 &&
      this.leftZone.classList.indexOf('ui-lg-4') > 0;
  }

  ngAfterContentInit(): void {
    // problem since Angular 4.2, ngAfterContentInit
    // without this I get error that value was changed after view was checked
    // todo: refactor  - mainly our zones left, right middle
    setTimeout(() => {
      this.applyColumns();
      this.updateFormFields();
      this.adjustLayout();
    });
  }


  private updateFormFields(): void {
    if (this.editabilityCheck && isPresent(this.formFields) && this.formFields.length > 0) {
      this.formFields.forEach((item: BaseFormComponent) => {
        item.editable = this.editable;
        // item.formGroup = this.formGroup;
      });
    }
  }


  /**
   * Based on if we are 2 or 3 or 1 column layout we need to adjust widgets width within the
   * form row.
   */
  private adjustLayout(): void {
    if (isPresent(this.rows) && this.rows.length > 0) {
      if (this.hasThreeColumn) {
        this.rows.forEach((item: BaseFormComponent) => item.size = 'large');
      }

    }
  }

}
