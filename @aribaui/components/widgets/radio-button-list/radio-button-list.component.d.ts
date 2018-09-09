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
import { AfterContentInit, EventEmitter } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
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
export declare const RB_LIST_CONTROL_VALUE_ACCESSOR: any;
export declare class RadioButtonListComponent extends BaseFormComponent implements AfterContentInit {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    /**
     * LIst of values used to render the radio button group
     */
    list: any[];
    /**
     * Identifies which radio buttons is selected when rendered
     */
    selection: any;
    /**
     * special expression to format label
     */
    labelFormatter: (value: any) => string;
    /**
     *
     * Fires an event when radio button is selected
     *
     */
    onSelection: EventEmitter<any>;
    /**
     * internal model to listen for radio value changes
     *
     */
    model: any;
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     * Label is extracted into a method so in the future we can play how we want to display the
     * value. Since I want to support formatters for each components we might have a chance to
     * decide how the label will look like.
     *
     */
    labelValue(item: any): string;
    /**
     * In this version of checkboxes we still expect only primitive types. Keep this functionality
     * in extra method so we can work with it even now we just return the same value back
     *
     *
     */
    value(item: any): any;
    /**
     *
     * On NGModel change retrieve actual record based on the INDEX and propagate it to both
     * ngModel as well as FormGroup.
     *
     */
    onChange(event: any): void;
    /**
     * Since we might be dealing with complex object store only INDEX number in the model.
     *
     */
    updateModel(souceItem: any): void;
    ngAfterContentInit(): void;
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any): void;
}
