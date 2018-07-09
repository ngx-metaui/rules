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
import {Environment, isBlank, isPresent, noop, uuid} from '@aribaui/core';
import {forwardRef, Inject, Input, Optional, PipeTransform, SkipSelf} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup} from '@angular/forms';
import {BaseComponent} from '../core/base.component';

/**
 * x-small = > 12%  = > col-1
 * small = > `
 * medium = > 50%   = > col-6
 * large = > 75%    = > col-9
 * large = > 100%   = > col-12
 *
 */
export type WidgetSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export enum WidgetSizeColumns
{
    xsmall = 1,
    small = 3,
    medium = 6,
    large = 9,
    xlarge = 12
}


/**
 *  BaseFormComponnet extends BaseComponent for add specific form behavior
 *
 */
export abstract class BaseFormComponent extends BaseComponent implements ControlValueAccessor
{
    /*
     *  Supported layout constants. It is expected there will be more options as we currently
     *  support only these two there will be other variations of it. e.g. for stacked it will not
     *  be 1 columns like it is now but multiple columns
     *
     */
    static readonly LayoutStacked = 'stacked';
    static readonly LayoutInline = 'inline';


    /**
     * Component name attribute. Can be used to lookup component in form.
     */
    @Input()
    name: string;


    /**
     * Component Id. Can be used to lookup component in form.
     */
    @Input()
    id: string;


    /**
     *
     * Is current element visible
     */
    @Input()
    hidden: boolean = false;

    /**
     * You can pass in formGroup which will be used with in the form
     *
     * @Input() - see getter
     */
    private _formGroup: FormGroup;


    /**
     * Renders required flex around the component
     *
     */
    @Input()
    required: boolean = false;


    /**
     *  a text displayed when value is empty or NULL
     */
    @Input()
    placeHolder: String = '';

    /**
     * Identify if this control is used directly or if its part of some other control
     * e.g. GenericChooser and managed by this control.
     * Meaning State is mananged outside of this component
     *
     */
    @Input()
    isStandalone: boolean = true;


    /**
     * Form Control for the component. Its either inherited since it was precreated in parent
     * component or its created based on passed 'name' and registered with the 'formGroup'
     *
     * When  initialize FormControl we do setValue with onlySelf:true flag and we do not emit any
     * event outside
     *
     */
    formControl: FormControl;


    /**
     * Formatter that can be assign to the component in order to format its input
     */
    formatter: PipeTransform;


    protected onModelChanged: (_: any) => void = noop;
    protected onModelTouched: (_: any) => void = noop;


    /**
     * Some of the BaseFormComponent can wrap other component and in these cases we want to
     * inherit some of the behavior from parent
     *
     * @Inject(Environment) public env: Environment : is tem a workaround as without inject
     * on this specific component it complains that Environment is unresolved symbol
     *
     */
    constructor (@Inject(Environment) public env: Environment,
                 @SkipSelf() @Optional() @Inject(forwardRef(() => BaseFormComponent))
                 protected parentContainer: BaseFormComponent)
    {
        super(env);
    }


    ngOnInit (): void
    {
        super.ngOnInit();

        if (isPresent(this.parentContainer)) {
            this.formGroup = this.parentContainer.formGroup;
            this.editable = this.parentContainer.editable;
        }

        this.checkInitForm();
    }


    /**
     * Make sure that we have available formGroup and Name and ID
     *
     */
    protected checkInitForm ()
    {

        if (isBlank(this.env.currentForm)) {
            this.env.currentForm = new FormGroup({});
        }

        /**
         * Todo: Right now I just need to initialize name , but ideally it needs to be generated
         * number basedon some semantics app.page.component if there are more component on the page
         * then app.page.componentNumber. Simple solution is to is to get Elementref and query it.
         */
        if (isBlank(this.name)) {
            this.name = uuid();
        }

        if (isBlank(this.id)) {
            this.id = uuid();
        }

    }

    protected doRegister (name: string, value: any): FormControl
    {

        let fControl: FormControl;

        if (isBlank(this.formGroup.controls[name])) {
            this.formGroup.registerControl(name, new FormControl(value));
            fControl = <FormControl> this.formGroup.controls[name];

        } else {
            fControl = <FormControl> this.formGroup.controls[name];
            let updatedValue: any = isPresent(fControl.value) ? fControl.value : value;
            fControl.patchValue(updatedValue, {onlySelf: true, emitEvent: false});
        }
        return fControl;
    }


    /**
     * When we are dealing with Forms this is a helper method to register control
     *
     *
     * @param value default value to be pre-set
     */
    registerFormControl (value: any)
    {
        this.formControl = this.doRegister(this.name, value);

        if (this.disabled) {
            this.formControl.disable();
        }
    }


    @Input() get formGroup (): FormGroup
    {
        return isPresent(this._formGroup) ? this._formGroup : this.env.currentForm;
    }

    set formGroup (value: FormGroup)
    {
        this._formGroup = value;
    }

    /**
     * Indicates if we can pass field type as a binding to the components. e.g. InputField need
     * such type to correctly render input type=text, number
     *
     * todo: is this needed? can we maybe pass this to the formRow?
     */
    canSetType (): boolean
    {
        return false;
    }


    writeValue (value: any)
    {

    }

    registerOnChange (fn: any)
    {
        this.onModelChanged = fn;
    }

    registerOnTouched (fn: any)
    {
        this.onModelTouched = fn;
    }
}


