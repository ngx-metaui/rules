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
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import {isPresent} from '../../core/utils/lang';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormRowComponent} from '../../layouts/form-table/form-row/form-row.component';
import {BaseFormComponent, Environment} from '@ngx-metaui/rules';


/**
 *  Checkbox list is a wrapper class around 'Checkbox' component to simply assembly of multi choice
 * component
 *
 * In Addition it adds ability to work with complex object. PrimeNG checkboxes work only with
 * primitive values.
 *
 * @see {@link check-box/check-box.component.ts}
 *
 *
 * ### Example
 *
 *
 *    @Component({
 *       selector: 'showCheckBoxList' ,
 *       template: `
 *           <aw-checkbox-list [list]="checkBoxListValues" [selections]="selectedValues"
 *
 *            [name]="'myColors'" [formGroup]="formGroup" (onSelection)="onCBClick">
 *           </aw-checkbox-list>
 *       `
 *
 *       })
 *        class MyShowCLComponent
 *        {
 *            checkBoxListValues: string[] = ['blue' , 'red' , 'yellow' , 'orange' , 'white' ,
 *     'silver' , 'black' ,
 *            'Green' , 'Gray' , 'Navy' , 'Olive' , 'Aqua' , 'Purple'];
 *
 *            selectedValues: string[] = ['blue' , 'Olive' , 'Aqua' , 'Purple'];
 *
 *
 *            formGroup: FormGroup = new FormGroup({});
 *
 *
 *            onCBClick (event): void
 *            {
 *                console.log('onCBClick = ' + event);
 *            }
 *
 *        }
 **
 */




export const CB_LIST_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckBoxListComponent),
  multi: true
};


@Component({
  selector: 'aw-checkbox-list',
  templateUrl: 'check-box-list.component.html',
  styleUrls: ['check-box-list.component.scss'],

  providers: [
    CB_LIST_CONTROL_VALUE_ACCESSOR,
    {provide: BaseFormComponent, useExisting: forwardRef(() => CheckBoxListComponent)}
  ]
})
export class CheckBoxListComponent extends BaseFormComponent {
  /**
   * List of values used to render checkboxes. Even we have here type as ANY we internally
   * support only string at the moment
   */
  @Input()
  list: any[];


  /**
   *  Selections are default CHECKED values passed. e.g. When rendering field favorite colors:
   * blue, red, yellow you will pass in here blue, red, then checkboxes with value blue, red wil
   * be rendered as check and yellow unchecked
   */
  @Input()
  selections: any[] = [];

  /**
   * Fires event when checkbox is selected/clicked. Emits current clicked checkboxed. not the
   * actuall internal model value in this case array of choices
   *
   */
  @Output()
  onSelection: EventEmitter<any> = new EventEmitter<any>();

  /**
   * special expression to format label
   */
  @Input()
  labelFormatter: (value: any) => string;


  constructor(public env: Environment,
              private cd: ChangeDetectorRef,
              @SkipSelf() @Optional() @Inject(forwardRef(() => FormRowComponent))
              protected parentContainer: BaseFormComponent) {
    super(env, parentContainer);
  }


  /**
   * Label is extracted into this method so in the future we can play more how we want to display
   * the value. Since I want to support formatters for each components we might have a chance to
   * decide how label will look like.
   *
   */
  labelValue(item: any): string {
    if (isPresent(this.labelFormatter)) {
      return this.labelFormatter(item);
    }
    return item.toString();
  }


  /**
   * Delegate event outside of this component and convert indexed model to original objects
   *
   */
  onChange(): void {
    this.onSelection.emit(this.selections);
    this.onModelChanged(this.selections);
  }


  /**
   * Internal. Please see ControlValueAccessor
   *
   */
  writeValue(value: any) {
    this.selections = value;
    this.cd.markForCheck();
  }
}
