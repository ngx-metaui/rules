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
import { Environment } from '@aribaui/core';
import { PipeTransform } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../core/base.component';
/**
 * x-small = > 12%  = > col-1
 * small = > `
 * medium = > 50%   = > col-6
 * large = > 75%    = > col-9
 * large = > 100%   = > col-12
 *
 */
export declare type WidgetSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
export declare enum WidgetSizeColumns {
    xsmall = 1,
    small = 3,
    medium = 6,
    large = 9,
    xlarge = 12,
}
/**
 *  BaseFormComponnet extends BaseComponent for add specific form behavior
 *
 */
export declare abstract class BaseFormComponent extends BaseComponent implements ControlValueAccessor {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    static readonly LayoutStacked: string;
    static readonly LayoutInline: string;
    /**
     * Component name attribute. Can be used to lookup component in form.
     */
    name: string;
    /**
     * Component Id. Can be used to lookup component in form.
     */
    id: string;
    /**
     *
     * Is current element visible
     */
    hidden: boolean;
    /**
     * You can pass in formGroup which will be used with in the form
     *
     * @Input() - see getter
     */
    private _formGroup;
    /**
     * Renders required flex around the component
     *
     */
    required: boolean;
    /**
     *  a text displayed when value is empty or NULL
     */
    placeHolder: String;
    /**
     * Identify if this control is used directly or if its part of some other control
     * e.g. GenericChooser and managed by this control.
     * Meaning State is mananged outside of this component
     *
     */
    isStandalone: boolean;
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
    protected onModelChanged: (_: any) => void;
    protected onModelTouched: (_: any) => void;
    /**
     * Some of the BaseFormComponent can wrap other component and in these cases we want to
     * inherit some of the behavior from parent
     *
     * @Inject(Environment) public env: Environment : is tem a workaround as without inject
     * on this specific component it complains that Environment is unresolved symbol
     *
     */
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     * Make sure that we have available formGroup and Name and ID
     *
     */
    protected checkInitForm(): void;
    protected doRegister(name: string, value: any): FormControl;
    /**
     * When we are dealing with Forms this is a helper method to register control
     *
     *
     * @param value default value to be pre-set
     */
    registerFormControl(value: any): void;
    formGroup: FormGroup;
    /**
     * Indicates if we can pass field type as a binding to the components. e.g. InputField need
     * such type to correctly render input type=text, number
     *
     * todo: is this needed? can we maybe pass this to the formRow?
     */
    canSetType(): boolean;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
