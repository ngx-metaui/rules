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
import { AfterContentInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
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
export declare const CB_LIST_CONTROL_VALUE_ACCESSOR: any;
export declare class CheckBoxListComponent extends BaseFormComponent implements AfterContentInit {
    env: Environment;
    private cd;
    protected parentContainer: BaseFormComponent;
    /**
     * List of values used to render checkboxes. Even we have here type as ANY we internally
     * support only string at the moment
     */
    list: any[];
    /**
     *  Selections are default CHECKED values passed. e.g. When rendering field favorite colors:
     * blue, red, yellow you will pass in here blue, red, then checkboxes with value blue, red wil
     * be rendered as check and yellow unchecked
     */
    selections: any[];
    /**
     * Fires event when checkbox is selected/clicked. Emits current clicked checkboxed. not the
     * actuall internal model value in this case array of choices
     *
     */
    onSelection: EventEmitter<any>;
    /**
     * special expression to format label
     */
    labelFormatter: (value: any) => string;
    /**
     * Internal model
     */
    model: any;
    constructor(env: Environment, cd: ChangeDetectorRef, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    /**
     * Label is extracted into this method so in the future we can play more how we want to display
     * the value. Since I want to support formatters for each components we might have a chance to
     * decide how label will look like.
     *
     */
    labelValue(item: any): string;
    /**
     * In this version of checkboxes we still expect only primitive types. Keep this functionality
     * in extra method so we can work with it even now we just return the same value back
     */
    value(item: any): any;
    /**
     * Delegate event outside of this component and convert indexed model to original objects
     *
     */
    onChange(event: any): void;
    /**
     * Since we might be dealing with complex object store only INDEXes number in the model.
     *
     */
    updateModel(sourceList: any[]): void;
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any): void;
}
