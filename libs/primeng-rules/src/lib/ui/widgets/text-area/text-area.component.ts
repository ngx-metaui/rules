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
import {Component, forwardRef, Inject, Input, Optional, SkipSelf} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormRowComponent} from '../../layouts/form-table/form-row/form-row.component';
import {distinctUntilChanged} from 'rxjs/operators';
import {BaseFormComponent, Environment} from '@ngx-metaui/rules';


/**
 * Renders html text area component

 *
 * ### Example
 *
 * ```typescript
 *
 *      @Component({
 *          selector: 'myNote' ,
 *          template: '<aw-text-area [value]="inputValue" [autoResize]="autoResize" >
 *              </aw-text-area>'
 *      })
 *      export class MyNoteComponent
 *      {
 *          inputValue: string = 'Some really long text';
 *          autoResize: false;
 *      }
 *
 * ```
 *  Note: if you are using this outside of FormTable please provide your own FormGroup
 */

export const TEXTAREA_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextAreaComponent),
  multi: true
};


@Component({
  selector: 'aw-text-area',
  templateUrl: 'text-area.component.html',
  styleUrls: ['text-area.component.scss'],

  providers: [
    TEXTAREA_CONTROL_VALUE_ACCESSOR,
    {provide: BaseFormComponent, useExisting: forwardRef(() => TextAreaComponent)}
  ]
})
export class TextAreaComponent extends BaseFormComponent {
  /**
   *
   * A value used to store and read user input
   *
   */
  @Input()
  value: any = '';


  /**
   * Spefifies visible number of lines
   */
  @Input()
  rows: number = 2;


  /**
   * Specifies visible width
   */
  @Input()
  columns: number = 20;


  /**
   * when this option is TRUE and user starts typing it will maximize textarea's width and height
   */
  @Input()
  autoResize: boolean = true;

  constructor(public env: Environment,
              @SkipSelf() @Optional() @Inject(forwardRef(() => FormRowComponent))
              protected parentContainer: BaseFormComponent) {
    super(env, parentContainer);
  }

  ngOnInit() {

    super.ngOnInit();
    super.registerFormControl(this.value);

    this.formControl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(val => {
      this.value = val;
      this.onModelChanged(this.value);
    });
  }


  /**
   * Internal. Please see ControlValueAccessor
   *
   */
  writeValue(value: any) {
    if (value !== this.value) {
      this.value = value;
      this.formControl.setValue(value, {onlySelf: true});
    }

  }
}
