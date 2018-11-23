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
 */
import {
  AfterContentInit,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {isPresent} from '../../core/utils/lang';
import {FormRowComponent} from '../../layouts/form-table/form-row/form-row.component';
import {BaseFormComponent, Environment} from '@ngx-metaui/rules';


/**
 * Wrapper class for RadioButton component providing convenient way to to render RadioButton Groups
 *
 *
 * ### Example
 *
 *
 * ```
 *      @Component({
 *          selector: 'gender-selector' ,
 *          template: `
 *              <aw-radiobutton-list [list]="rbListValues" [layout]="layout"
 *     [selection]="selectedValue" [name]="'name'">
 *               </aw-radiobutton-list>
 *      `
 *      })
 *      export class GenderSelectorComponent
 *      {
 *          rbListValues: string[] = ['male' , 'female' , 'other'];
 *          selectedValue: string = 'other';
 *          layout: string = 'stacked';
 *
 *
 *          formGroup: FormGroup = new FormGroup({});
 *
 *
 *          onCBClick (event): void
 *          {
 *              console.log('onCBClick = ' + event);
 *          }
 *
 *      }
 *
 * ```
 */


export const RB_LIST_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonListComponent),
  multi: true
};


@Component({
  selector: 'aw-radiobutton-list',
  templateUrl: 'radio-button-list.component.html',
  styleUrls: ['radio-button-list.component.scss'],
  providers: [
    RB_LIST_CONTROL_VALUE_ACCESSOR,
    {provide: BaseFormComponent, useExisting: forwardRef(() => RadioButtonListComponent)}
  ]

})
export class RadioButtonListComponent extends BaseFormComponent implements AfterContentInit {

  /**
   * LIst of values used to render the radio button group
   */
  @Input()
  list: any[];


  /**
   * Identifies which radio buttons is selected when rendered
   */
  @Input()
  selection: any;


  /**
   * special expression to format label
   */
  @Input()
  labelFormatter: (value: any) => string;


  /**
   *
   * Fires an event when radio button is selected
   *
   */
  @Output()
  onSelection: EventEmitter<any> = new EventEmitter<any>();


  /**
   * internal model to listen for radio value changes
   *
   */
  model: any;

  constructor(public env: Environment,
              @SkipSelf() @Optional() @Inject(forwardRef(() => FormRowComponent))
              protected parentContainer: BaseFormComponent) {
    super(env, parentContainer);
  }

  ngOnInit() {
    super.ngOnInit();

    if (isPresent(this.selection)) {
      this.model = 0;
    }

    this.updateModel(this.selection);
    this.onModelChanged(this.selection);
    this.registerFormControl(this.selection);
  }


  /**
   * Label is extracted into a method so in the future we can play how we want to display the
   * value. Since I want to support formatters for each components we might have a chance to
   * decide how the label will look like.
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
   *
   *
   */
  value(item: any): any {
    return item;
  }


  /**
   *
   * On NGModel change retrieve actual record based on the INDEX and propagate it to both
   * ngModel as well as FormGroup.
   *
   */
  onChange(event: any) {
    const updatedModel: any = this.list[this.model];

    this.onSelection.emit(updatedModel);
    this.onModelChanged(updatedModel);
    this.formControl.setValue(updatedModel, {
      emitEvent: true,
      emitViewToModelChange: false
    });
  }


  /**
   * Since we might be dealing with complex object store only INDEX number in the model.
   *
   */
  updateModel(souceItem: any): void {
    const index = this.list.findIndex((elem: any) => {
      return souceItem === elem;
    });
    this.model = index === -1 ? 0 : index;
  }

  ngAfterContentInit(): void {
    const updatedModel: any = this.list[this.model];
    this.formControl.setValue(updatedModel, {
      emitEvent: true,
      emitViewToModelChange: false
    });
    // this.cd.detectChanges();

  }

  /**
   * Internal. Please see ControlValueAccessor
   *
   */
  writeValue(value: any) {
    if (value !== this.value) {
      const newModel = value;
      this.updateModel(newModel);
    }

  }
}
