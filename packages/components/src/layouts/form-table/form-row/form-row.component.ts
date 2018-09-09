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
import {Component, forwardRef, HostBinding, Inject, Input, Optional, SkipSelf} from '@angular/core';
import {AsyncValidatorFn, ValidatorFn, Validators} from '@angular/forms';
import {Environment, isBlank, isPresent, ListWrapper, StringWrapper} from '@aribaui/core';
import {FormTableComponent} from '../form-table.component';
import {BaseFormComponent, WidgetSizeColumns} from '../../../core/base-form.component';

/**
 * Used by FormTable to layout fields into Rows. Each FormTable row is reasonable for not only to
 * include actual component such is DropDown or InputField but mainly provides a enough context for
 * the component to specify the size, how it should layout, whether we need to show required flag,
 * to show/hide labels in case if we have no label layout and much more.
 *
 * FormRow component also registers angular validator for the current row/field. As already
 * mentioned We treat our widgets with minimal responsibility as possible to present and retrive
 * information to/from user and let somebody else to figure out where it appear and how.
 *
 * todo: Move under FormTable
 */
@Component({
    selector: 'aw-form-row',
    templateUrl: 'form-row.component.html',
    styleUrls: ['form-row.component.scss'],
    providers: [
        {provide: BaseFormComponent, useExisting: forwardRef(() => FormRowComponent)}
    ]
})
export class FormRowComponent extends BaseFormComponent
{

    /**
     * Hides the label
     *
     */
    @Input()
    noLabelLayout: boolean = false;

    /**
     * Renders row with highlighted background
     *
     */
    @Input()
    highlightRow: boolean = false;

    /**
     *
     *  Field label that should appear above or next to the control
     *
     */
    @Input()
    label: string = '';

    /**
     *  For inputs type fields provides default angular validators, maximal length of the field
     */
    @Input()
    maxLength: number;

    /**
     *  For inputs type fields provides default angular validators, minimal length of the field
     */
    @Input()
    minLength: number;


    /**
     *  For inputs type fields provides default angular formatters. How the input fields should be
     * formatted
     */
    @Input()
    pattern: string;


    /**
     * Defines custom async validators which will be attached to the Control
     */
    @Input()
    customAsyncValidators: AsyncValidatorFn[];

    /**
     * Defines custom  validators which will be attached to the Control
     */
    @Input()
    customValidators: ValidatorFn[];

    /**
     * Tells the form row that we are rendering another nested form in this row. so we need
     * to go 100%
     */
    @Input()
    isNestedLayout: boolean = false;

    /**
     * What is the current size of the field. Current we support 4 different sizes: x-small, small,
     * medium, large, x-large
     */
    private _size: string;

    /**
     *
     * For single column layout without zones we need to apply grid directly to the FormRow tag
     * so we don't need to introduce extra div level
     *
     */
    @HostBinding('class') classList: string = '';


    private _labelsOnTop: boolean;

    constructor(public env: Environment,
                // Event this creates CI depends. Need to have a reference to parent
                // I need to refactor more parent to not use this child and refactor layouting
                @SkipSelf() @Optional() @Inject(forwardRef(() => FormTableComponent))
                protected parentContainer: FormTableComponent)
    {
        super(env, parentContainer);

        this._size = 'ui-g-12 ui-md-' + WidgetSizeColumns.medium;
    }


    /**
     * Right now we just initialize this once and use the values we do not expect now to react to
     * changes
     */
    ngOnInit()
    {
        super.ngOnInit();
        super.registerFormControl(null);

        this.registerValidators();

        this.omitPadding = this.parentContainer.omitPadding;
        this.classList += isPresent(this.parentContainer) ? ' ui-g-12 ' : '';
        this.classList = this.highlightRow ? this.classList + ' highlight-row ' : this.classList;

        this.classList = this.omitPadding ? this.classList + ' ui-g-nopad ' : this.classList;
    }


    /**
     * Just a size getter
     *
     */
    get size(): string
    {
        return this._size;
    }

    /**
     *  A size setter we translate custom sizes into actual bootstrap grid system. We use medium
     * right now. but we should extend this for other screen sizes
     *
     *  todo: provide mapping and add other grid classes for other sizes xs, sm, lg, xl
     *
     *  Also check if this is dynamic size that should vary based on the how many number of columns
     * we have. e.g. Date widgets is by default small, but in 2, 3 columns layout this small is too
     * small.
     */



    @Input()
    set size(value: string)
    {

        let isDynVal = false;

        if (StringWrapper.startsWidth(value, 'd-')) {
            isDynVal = true;
            value = value.substr(2, value.length - 1);
        }

        if (isPresent(value) && !this.isNestedLayout) {
            this._size = value;
            let dSize = this.dynSize(value, isDynVal);
            this._size = 'ui-g-12 ui-md-' + dSize;
        } else if (this.isNestedLayout) {
            this._size = 'ui-g-12 ui-md-12';
        }
    }


    ngDoCheck(): void
    {
        super.ngDoCheck();

        if (isPresent(this.parentContainer) && this.editable !== this.parentContainer.editable) {
            this.editable = this.parentContainer.editable;
        }
    }

    /**
     * Push out of box angular validator as well as custom one to current FormControl
     */
    private registerValidators()
    {
        let validators: ValidatorFn[] = [];

        if (isPresent(this.maxLength)) {
            validators.push(Validators.maxLength(this.maxLength));
        }

        if (isPresent(this.minLength)) {
            validators.push(Validators.minLength(this.minLength));
        }

        if (isPresent(this.required) && this.required) {
            validators.push(Validators.required);
        }

        if (isPresent(this.pattern)) {
            validators.push(Validators.pattern(this.pattern));
        }
        if (isPresent(this.customValidators)) {
            ListWrapper.addAll(validators, this.customValidators);
        }

        if (validators.length === 1) {
            this.formControl.setValidators(validators[0]);
        } else if (validators.length > 1) {
            this.formControl.setValidators(Validators.compose(validators));
        }

        if (isPresent(this.customAsyncValidators) && this.customAsyncValidators.length === 1) {
            this.formControl.setAsyncValidators(this.customAsyncValidators[0]);
        } else if (isPresent(this.customAsyncValidators) && this.customAsyncValidators.length > 1) {
            this.formControl.setAsyncValidators(
                Validators.composeAsync(this.customAsyncValidators));
        }
    }


    /**
     *
     * Do we have labels on TOP, try to read this from Parent
     *
     */
    get labelsOnTop(): boolean
    {
        if (isBlank(this._labelsOnTop) && isPresent(this.parentContainer)) {
            return (<FormTableComponent>this.parentContainer).isLabelsOnTop();
        }
        return false;
    }


    /**
     *
     * Can refactor all into 1 line but its hard to debug so this is just for read
     *
     */
    private dynSize(value: string, isDynValue: boolean): string
    {
        let normalizeSize = value.toLowerCase().replace('-', '');

        if (isPresent(this.parentContainer) &&
            (<FormTableComponent>this.parentContainer).hasTwoColumn && isDynValue)
        {

            let enumValues: string[] = Object.keys(WidgetSizeColumns);
            normalizeSize = enumValues[enumValues.indexOf(normalizeSize) + 1];
        }
        return (<any>WidgetSizeColumns)[normalizeSize];

    }
}
