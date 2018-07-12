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
import { EventEmitter, SimpleChanges } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
/**
 *  CheckboxType describes what type of checkbox is this:
 *
 * - Form type: that is writing and reading a value from/to model both using FormGroup as well
 *              as ngModel
 * - Action type:  only fires action and does not write value to model.
 *
 *
 */
export declare type CheckboxType = 'form' | 'action';
/**
 *
 * Implements standard HTML checkbox on top of PrimeNG. There are 2 types of
 * {@link CheckboxComponent}: form and action checkbox as described above.
 *
 *
 * Usage: Basic example having red checkbox checked
 *
 * ```HTML
 *        <aw-checkbox [name]="'color'" [value]="'red'" [label]="'Red'"
 *                                        [(ngModel)]="model">
 *        </aw-checkbox>
 *        <aw-checkbox [name]="'color'" [value]="'blue'" [label]="'Blue'"
 *                                        [(ngModel)]="model">
 *       </aw-checkbox>
 *
 * ```
 *
 * ```ts
 *
 *
 *   class CBBasicWithNgModelComponent
 *   {
 *
 *       model: string[] = ['red'];
 *
 *       constructor()
 *       {
 *       }
 *   }
 *
 * ```
 *
 * For more examples please see a playground or unit test.
 *
 */
export declare const CB_CONTROL_VALUE_ACCESSOR: any;
export declare class CheckboxComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    /**
     *
     * A value associated with this checkbox
     *
     */
    value: any;
    /**
     * Type of checkbox. Form based updates model and Action based only fires click events
     *
     */
    type: CheckboxType;
    /**
     * Label to be used when rendering a checkbox
     */
    label: string;
    /**
     * Trigger click event.
     *
     */
    action: EventEmitter<any>;
    /**
     * PrimeNG has this type called binary which works only with Boolean meaning it does not add or
     * remove values.
     *
     * In our case Checktype = Action is always binary or when this.value is boolean
     *
     */
    isBinary: boolean;
    /**
     * Internal model for checkbox
     */
    model: any;
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Called when Checkbox is clicked and it either fire action or updates the model.
     *
     */
    onChange(event: any): void;
    /**
     *
     * Tell if we are using Form Checkbox. This is used remove some of the bindings that are not
     * applicable for certain type.
     *
     */
    isFormType(): boolean;
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any): void;
}
