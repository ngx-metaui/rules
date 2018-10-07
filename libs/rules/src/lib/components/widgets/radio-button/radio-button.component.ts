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
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Environment} from '../../../core/config/environment';
import {BaseFormComponent} from '../../core/base-form.component';
import {FormRowComponent} from '../../layouts/form-table/form-row/form-row.component';


/**
 *
 * Implements standard HTML radio button on top of PrimeNG with ariba styling
 *
 * ### Example
 *
 * 1. Basic usage using ngModel pre-selected first radio
 *
 *  ```ts
 *
 *      @Component({
 *          selector: 'demo-comp',
 *          template: `
 *              <aw-radiobutton [name]="'color'" [value]="'red'" [label]="'Red'"
 *                             [(ngModel)]="model">
 *             </aw-radiobutton>
 *              <aw-radiobutton [name]="'color'" [value]="'blue'" [label]="'Blue'"
 *                      [(ngModel)]="model">
 *              </aw-radiobutton>
 *      `
 *      })*
 *      class BasicWithNgModelComponent
 *      {
 *          model: string[] = ['red'];
 *
 *          constructor()
 *          {
 *          }
 *      }
 *
 *  ```
 *
 *
 * 2. Basic usage with formGroup
 *
 *
 * ```ts
 *       @Component({
 *           selector: 'demo-comp',
 *           template: `
 *          <div [formGroup]="env.currentForm">
 *               <aw-radiobutton [name]="'color2'" [value]="'red'" [label]="'Red'"
 *               (onChange)="onChange($event)">
 *               </aw-radiobutton>
 *               <aw-radiobutton [name]="'color2'" [value]="'blue'" [label]="'Blue'"
 *               (onChange)="onChange($event)">
 *               </aw-radiobutton>
 *
 *       </div>
 *       `
 *       })
 *       class BasicWithFormGroupComponent implements OnInit
 *       {
 *           model: string = 'blue';
 *
 *           constructor(public env: Environment)
 *           {
 *           }
 *
 *           ngOnInit(): void
 *           {
 *               this.env.currentForm = new FormGroup({});
 *               this.env.currentForm.registerControl('color2', new FormControl(this.model));
 *           }
 *
 *
 *           onChange(event: any): void
 *           {
 *               this.modelSet = event;
 *           }
 *
 *       }
 *  ````
 *
 *
 *
 *
 */
export const RAB_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonComponent),
  multi: true
};


@Component({
  selector: 'aw-radiobutton',
  templateUrl: 'radio-button.component.html',
  styleUrls: ['radio-button.component.scss'],

  providers: [
    RAB_CONTROL_VALUE_ACCESSOR,
    {provide: BaseFormComponent, useExisting: forwardRef(() => RadioButtonComponent)}
  ]
})
export class RadioButtonComponent extends BaseFormComponent {

  /**
   *
   * A value associated with this radio
   *
   */
  @Input()
  value: any = '';


  /**
   * Label to be used when rendering a radio
   */
  @Input()
  label: string;


  /**
   * Trigger click event with currrent selected value
   *
   */
  @Output()
  onChange: EventEmitter<any> = new EventEmitter();


  /**
   * Internal model to comunicate with primeNg Radio
   */
  model: any;


  constructor(public env: Environment,
              @SkipSelf() @Optional() @Inject(forwardRef(() => FormRowComponent))
              protected parentContainer: BaseFormComponent) {
    super(env, parentContainer);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.isStandalone) {
      super.registerFormControl(this.value);
      this.model = this.formControl.value;
      this.onModelChanged(this.model);

    } else {
      this.formControl = <FormControl> this.formGroup.controls[this.name];
    }
  }

  /**
   * Called when radio is clicked. Not using PrimeNG click event as it is fired before
   * the model is changed. Therefore need to listen on (ngModelChange)
   *
   */
  onModelChange(newVal: any): void {
    this.onModelChanged(this.model);
    if (this.isStandalone) {
      this.formControl.setValue(this.model, {emitEvent: true});
    }
    this.onChange.emit(this.model);
  }

  /**
   * Internal. Please see ControlValueAccessor
   *
   */
  writeValue(value: any) {
    if (value !== this.model) {
      this.model = value;
      if (this.isStandalone) {
        this.formControl.setValue(this.model, {emitEvent: true});
      }

      this.onModelChanged(this.model);
    }
  }
}

