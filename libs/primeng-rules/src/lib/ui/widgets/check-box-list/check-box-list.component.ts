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
import {equals, isBlank, isPresent} from '../../core/utils/lang';
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
export class CheckBoxListComponent extends BaseFormComponent implements AfterContentInit {
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
  selections: any[];

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


  /**
   * Internal model
   */
  model: any = [];

  constructor(public env: Environment,
              private cd: ChangeDetectorRef,
              @SkipSelf() @Optional() @Inject(forwardRef(() => FormRowComponent))
              protected parentContainer: BaseFormComponent) {
    super(env, parentContainer);
  }

  ngOnInit() {
    super.ngOnInit();

    if (isBlank(this.selections)) {
      this.selections = [];
    }

    this.registerFormControl(this.selections);

    this.updateModel(this.selections);
    this.onModelChanged(this.selections);
  }


  ngAfterContentInit(): void {
    const updatedModel: any[] = [];

    this.model.forEach((index: number) => updatedModel.push(this.list[index]));
    this.formControl.setValue(updatedModel, {
      emitEvent: true,
      emitViewToModelChange: false
    });
    this.cd.detectChanges();

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
   * In this version of checkboxes we still expect only primitive types. Keep this functionality
   * in extra method so we can work with it even now we just return the same value back
   */
  value(item: any): any {
    return item;
  }

  /**
   * Delegate event outside of this component and convert indexed model to original objects
   *
   */
  onChange(event: any): void {
    const updatedModel: any[] = [];

    this.model.forEach((index: number) => {
      updatedModel.push(this.list[index]);
    });

    this.onSelection.emit(updatedModel);
    this.onModelChanged(updatedModel);
    this.formControl.setValue(updatedModel, {
      emitEvent: true,
      emitViewToModelChange: false
    });
  }


  /**
   * Since we might be dealing with complex object store only INDEXes number in the model.
   *
   */
  updateModel(sourceList: any[]): void {
    sourceList.forEach((item: any) => {
      const index = this.list.findIndex((elem: any) => {
        return equals(item, elem);
      });
      this.model.push(index);
    });
  }


  /**
   * Internal. Please see ControlValueAccessor
   *
   */
  writeValue(value: any) {
    if (isPresent(this.model) && isPresent(value)) {
      const newModel = value;
      this.updateModel(newModel);

      // this.cd.markForCheck();
    }
  }
}
