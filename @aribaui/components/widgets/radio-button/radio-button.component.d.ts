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
import { EventEmitter } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
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
export declare const RAB_CONTROL_VALUE_ACCESSOR: any;
export declare class RadioButtonComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    /**
     *
     * A value associated with this radio
     *
     */
    value: any;
    /**
     * Label to be used when rendering a radio
     */
    label: string;
    /**
     * Trigger click event with currrent selected value
     *
     */
    onChange: EventEmitter<any>;
    /**
     * Internal model to comunicate with primeNg Radio
     */
    model: any;
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     * Called when radio is clicked. Not using PrimeNG click event as it is fired before
     * the model is changed. Therefore need to listen on (ngModelChange)
     *
     */
    onModelChange(newVal: any): void;
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any): void;
}
