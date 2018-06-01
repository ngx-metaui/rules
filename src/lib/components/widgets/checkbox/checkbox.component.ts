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
    Component,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    Optional,
    Output,
    SimpleChanges,
    SkipSelf
} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Environment, isBoolean, isPresent} from '@aribaui/core';
import {BaseFormComponent} from '../../core/base-form.component';


/**
 *  CheckboxType describes what type of checkbox is this:
 *
 * - Form type: that is writing and reading a value from/to model both using FormGroup as well
 *              as ngModel
 * - Action type:  only fires action and does not write value to model.
 *
 *
 */
export type CheckboxType = 'form' | 'action';

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
export const CB_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};


@Component({
    selector: 'aw-checkbox',
    templateUrl: 'checkbox.component.html',
    styleUrls: ['checkbox.component.scss'],

    providers: [
        CB_CONTROL_VALUE_ACCESSOR,
        {provide: BaseFormComponent, useExisting: forwardRef(() => CheckboxComponent)}
    ]
})
export class CheckboxComponent extends BaseFormComponent
{

    /**
     *
     * A value associated with this checkbox
     *
     */
    @Input()
    value: any = '';


    /**
     * Type of checkbox. Form based updates model and Action based only fires click events
     *
     */
    @Input()
    type: CheckboxType = 'form';


    /**
     * Label to be used when rendering a checkbox
     */
    @Input()
    label: string;


    /**
     * Trigger click event.
     *
     */
    @Output()
    action: EventEmitter<any> = new EventEmitter();

    /**
     * PrimeNG has this type called binary which works only with Boolean meaning it does not add or
     * remove values.
     *
     * In our case Checktype = Action is always binary or when this.value is boolean
     *
     */
    isBinary: boolean = false;

    /**
     * Internal model for checkbox
     */
    model: any;


    constructor(public env: Environment,
                @SkipSelf() @Optional() @Inject(forwardRef(() => BaseFormComponent))
                protected parentContainer: BaseFormComponent)
    {
        super(env, parentContainer);
    }

    ngOnInit()
    {
        this.model = this.value;
        this.type = this.action.observers.length > 0 ? 'action' : this.type;

        if (this.isFormType()) {
            super.ngOnInit();

            if (this.isStandalone) {
                super.registerFormControl(this.value);
                this.model = this.formControl.value;
                this.onModelChanged(this.model);
            } else {
                // get control from parent
                this.formControl = <FormControl> this.formGroup.controls[this.name];
            }
        }
        // When value is boolean we are dealing with PrimeNg Binary checkbox
        // which only sets TRUE/FALSE and does not add or remove values
        this.isBinary = isBoolean(this.value);

    }


    ngOnChanges(changes: SimpleChanges): void
    {
        super.ngOnChanges(changes);

        if (isPresent(changes['value']) &&
            (changes['value'].currentValue !== changes['value'].previousValue)) {
            this.model = changes['value'].currentValue;
        }


    }

    /**
     * Called when Checkbox is clicked and it either fire action or updates the model.
     *
     */
    onChange(event: any): void
    {
        if (this.isFormType()) {
            this.onModelChanged(this.model);
            if (this.isStandalone) {
                this.formControl.setValue(this.model);
            }
        } else {
            this.action.emit(event);
        }
    }


    /**
     *
     * Tell if we are using Form Checkbox. This is used remove some of the bindings that are not
     * applicable for certain type.
     *
     */
    isFormType(): boolean
    {
        return this.type === 'form';
    }

    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any)
    {
        if (value !== this.model && this.isFormType()) {
            this.model = value;

            if (this.isStandalone) {
                this.onModelChanged(this.model);
                this.formControl.setValue(this.model);
            }
        }
    }
}

