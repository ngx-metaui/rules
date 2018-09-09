import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Environment } from '@aribaui/core';
import { FormTableComponent } from '../form-table.component';
import { BaseFormComponent } from '../../../core/base-form.component';
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
export declare class FormRowComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: FormTableComponent;
    /**
     * Hides the label
     *
     */
    noLabelLayout: boolean;
    /**
     * Renders row with highlighted background
     *
     */
    highlightRow: boolean;
    /**
     *
     *  Field label that should appear above or next to the control
     *
     */
    label: string;
    /**
     *  For inputs type fields provides default angular validators, maximal length of the field
     */
    maxLength: number;
    /**
     *  For inputs type fields provides default angular validators, minimal length of the field
     */
    minLength: number;
    /**
     *  For inputs type fields provides default angular formatters. How the input fields should be
     * formatted
     */
    pattern: string;
    /**
     * Defines custom async validators which will be attached to the Control
     */
    customAsyncValidators: AsyncValidatorFn[];
    /**
     * Defines custom  validators which will be attached to the Control
     */
    customValidators: ValidatorFn[];
    /**
     * Tells the form row that we are rendering another nested form in this row. so we need
     * to go 100%
     */
    isNestedLayout: boolean;
    /**
     * What is the current size of the field. Current we support 4 different sizes: x-small, small,
     * medium, large, x-large
     */
    private _size;
    /**
     *
     * For single column layout without zones we need to apply grid directly to the FormRow tag
     * so we don't need to introduce extra div level
     *
     */
    classList: string;
    private _labelsOnTop;
    constructor(env: Environment, parentContainer: FormTableComponent);
    /**
     * Right now we just initialize this once and use the values we do not expect now to react to
     * changes
     */
    ngOnInit(): void;
    /**
     * Just a size getter
     *
     */
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
    size: string;
    ngDoCheck(): void;
    /**
     * Push out of box angular validator as well as custom one to current FormControl
     */
    private registerValidators();
    /**
     *
     * Do we have labels on TOP, try to read this from Parent
     *
     */
    readonly labelsOnTop: boolean;
    /**
     *
     * Can refactor all into 1 line but its hard to debug so this is just for read
     *
     */
    private dynSize(value, isDynValue);
}
