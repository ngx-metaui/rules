import { Environment, Value } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { DecimalPipe } from '@angular/common';
/**
 * This component represent a Input field and it can  accept different types of values such as
 * text, number.
 *
 *
 *
 * ### Example
 *
 * ```typescript
 *  @Component({
 *      selector: 'wrapper-comp' ,
 *      template: '<aw-input-field [value]="inputValue" [type]="inputType"></aw-input-field>'
 *  })
 *  export class TestInputComponent
 *  {
 *      inputValue: string = 'Some text';
 *
 *      // by default input type is text, you can pass string, String, or text
 *      inputType: string = 'string';
 *  }
 *
 * ```
 *
 *
 *
 * ### Example wher input field is initialized with ngModel
 *
 * ```typescript
 *  @Component({
 *      selector: 'wrapper-comp' ,
 *      template: '<aw-input-field [value]="inputValue" [(ngModel)]="inputType"></aw-input-field>'
 *  })
 *  export class TestInputComponent
 *  {
 *      inputValue: string = 'Some text';
 *
 *      // by default input type is text, you can pass string, String, or text
 *      inputType: string = 'string';
 *  }
 *
 * ```
 *
 *  Note: if you are using this outside of FormTable please provide your own FormGroup
 *
 */
export declare const INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class InputFieldComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    /**
     *
     * A value used to save and read  when rendering and updating a component
     *
     */
    value: any;
    /**
     *
     * The number of decimal places used to format the number object.
     *
     */
    precision: number;
    /**
     * BigDecimal object that encapsulates value and locale.
     * If this object is set, values will be taken from this object
     */
    bigDecimal: BigDecimal;
    /**
     * Provide custom icon that is placed into the input field.
     *
     * Todo: add extra binding that will allow developer to tell position, left right
     */
    icon: string;
    /**
     * Input field type. Currently we support either Number or text
     */
    private _type;
    /**
     * Just to clean up subscriber when component is destroyed
     */
    private vchSubscriber;
    /**
     * The decimal pipe is used to format our number object.
     */
    decimalPipe: DecimalPipe;
    /**
     * The formatted decimal value. Uses angular decimalPipe to format based on locale.
     */
    private _displayValue;
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     *
     * generated setter to check for value and normalizing into expected either number or text
     *
     */
    type: string;
    readonly displayValue: string;
    canSetType(): boolean;
    writeValue(value: any): void;
    /**
     * Format the number object according to its precision.
     *
     */
    formatNumber(value: any): any;
    ngOnDestroy(): void;
}
/**
 * BigDecimal object is represented as a value, locale, and currencyCode
 */
export declare class BigDecimal implements Value {
    readonly amount: number;
    readonly locale: string;
    uniqueName: string;
    constructor(amount?: number, locale?: string);
    getTypes(): any;
    className(): string;
    $proto(): BigDecimal;
    toString(): string;
    clone(data?: {
        amount?: number;
        locale?: string;
    }): BigDecimal;
}
