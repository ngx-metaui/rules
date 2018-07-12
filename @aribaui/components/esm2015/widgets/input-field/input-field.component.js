/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { distinctUntilChanged } from 'rxjs/operators';
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, equals, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
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
 * \@Component({
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
 * \@Component({
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
export const /** @type {?} */ INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
};
export class InputFieldComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * A value used to save and read  when rendering and updating a component
         *
         */
        this.value = '';
        /**
         * Input field type. Currently we support either Number or text
         */
        this._type = 'string';
        this.decimalPipe = new DecimalPipe(env.locale);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.bigDecimal);
        this.vchSubscriber = this.formControl.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe(val => {
            setTimeout(() => this.value = val);
            // this.value = val;
            this.onModelChanged(this.value);
        });
    }
    /**
     *
     * generated setter to check for value and normalizing into expected either number or text
     *
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        if (value.toLowerCase() === 'string' || value.toLowerCase() === 'text') {
            this._type = 'text';
        }
        else if (value.toLowerCase() === 'number') {
            this._type = 'number';
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @return {?}
     */
    get displayValue() {
        if (this.bigDecimal) {
            this._displayValue = this.formatNumber(this.bigDecimal);
        }
        else {
            this._displayValue = this.value;
        }
        return this._displayValue;
    }
    /**
     * @return {?}
     */
    canSetType() {
        return true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.bigDecimal && !equals(value, this.bigDecimal)) {
            this.bigDecimal = value;
            this.formControl.setValue(this.bigDecimal);
            return;
        }
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value, { onlySelf: true });
        }
    }
    /**
     * Format the number object according to its precision.
     *
     * @param {?} value
     * @return {?}
     */
    formatNumber(value) {
        // The default precision is 2. For example, 10.23.
        let /** @type {?} */ digits = '1.0-2';
        // If precision is present, use it for format the bigDecimal value for display.
        if (isPresent(this.precision) &&
            this._type === 'number') {
            digits = '1.0-' + this.precision;
            return this.decimalPipe.transform(value, digits);
        }
        return value;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        if (isPresent(this.vchSubscriber)) {
            this.vchSubscriber.unsubscribe();
        }
    }
}
InputFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-input-field',
                template: `<div *ngIf="editable" [formGroup]="formGroup" class="w-input-wrapper">

    <input pInputText

           [attr.name]="name"
           [attr.type]="type"
           class="w-input-field"
           [ngClass]="styleClass"
           [class.has-icon]="icon"
           placeholder="{{placeHolder}}"
           [class.u-validation-error]="!(formControl.valid || (formControl.pristine))"
           formControlName="{{name}}"
           [value]="displayValue">
        <span *ngIf="icon" class="sap-icon" [ngClass]="icon"></span>
</div>


<ng-template [ngIf]="!editable">
    <aw-string [value]="displayValue"></aw-string>
</ng-template>
`,
                styles: [`.w-input-wrapper{position:relative}.w-input-field~span{top:13px;position:absolute;right:15px}`],
                providers: [
                    INPUT_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => InputFieldComponent) }
                ]
            },] },
];
/** @nocollapse */
InputFieldComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
InputFieldComponent.propDecorators = {
    value: [{ type: Input }],
    precision: [{ type: Input }],
    bigDecimal: [{ type: Input }],
    icon: [{ type: Input }],
    type: [{ type: Input }]
};
function InputFieldComponent_tsickle_Closure_declarations() {
    /**
     *
     * A value used to save and read  when rendering and updating a component
     *
     * @type {?}
     */
    InputFieldComponent.prototype.value;
    /**
     *
     * The number of decimal places used to format the number object.
     *
     * @type {?}
     */
    InputFieldComponent.prototype.precision;
    /**
     * BigDecimal object that encapsulates value and locale.
     * If this object is set, values will be taken from this object
     * @type {?}
     */
    InputFieldComponent.prototype.bigDecimal;
    /**
     * Provide custom icon that is placed into the input field.
     *
     * Todo: add extra binding that will allow developer to tell position, left right
     * @type {?}
     */
    InputFieldComponent.prototype.icon;
    /**
     * Input field type. Currently we support either Number or text
     * @type {?}
     */
    InputFieldComponent.prototype._type;
    /**
     * Just to clean up subscriber when component is destroyed
     * @type {?}
     */
    InputFieldComponent.prototype.vchSubscriber;
    /**
     * The decimal pipe is used to format our number object.
     * @type {?}
     */
    InputFieldComponent.prototype.decimalPipe;
    /**
     * The formatted decimal value. Uses angular decimalPipe to format based on locale.
     * @type {?}
     */
    InputFieldComponent.prototype._displayValue;
    /** @type {?} */
    InputFieldComponent.prototype.env;
    /** @type {?} */
    InputFieldComponent.prototype.parentContainer;
}
/**
 * BigDecimal object is represented as a value, locale, and currencyCode
 */
export class BigDecimal {
    /**
     * @param {?=} amount
     * @param {?=} locale
     */
    constructor(amount = 0, locale = 'en_US') {
        this.amount = amount;
        this.locale = locale;
    }
    /**
     * @return {?}
     */
    getTypes() {
        return {
            amount: Number,
            locale: String
        };
    }
    /**
     * @return {?}
     */
    className() {
        return 'BigDecimal';
    }
    /**
     * @return {?}
     */
    $proto() {
        return new BigDecimal(1, 'en_US');
    }
    /**
     * @return {?}
     */
    toString() {
        return this.amount + ', locale: ' + this.locale;
    }
    /**
     * @param {?=} data
     * @return {?}
     */
    clone(data = {}) {
        return new BigDecimal(isPresent(data.amount) ? data.amount : this.amount, isPresent(data.locale) ? data.locale : this.locale);
    }
}
function BigDecimal_tsickle_Closure_declarations() {
    /** @type {?} */
    BigDecimal.prototype.uniqueName;
    /** @type {?} */
    BigDecimal.prototype.amount;
    /** @type {?} */
    BigDecimal.prototype.locale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvaW5wdXQtZmllbGQvaW5wdXQtZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQ0gsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFDOUMsUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUV0RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtRDVDLE1BQU0sQ0FBQyx1QkFBTSw0QkFBNEIsR0FBUTtJQUM3QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBa0NGLE1BQU0sMEJBQTJCLFNBQVEsaUJBQWlCOzs7OztJQXNEdEQsWUFBbUIsR0FBZ0IsRUFFYixlQUFrQztRQUNwRCxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBSGIsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUViLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7O3FC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dkI7Ozs7SUFFRCxNQUFNO1FBQ0YsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNyQzs7OztJQUVELFFBQVE7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUNuRDs7Ozs7SUFHRCxLQUFLLENBQUMsT0FBNkMsRUFBRTtRQUNqRCxNQUFNLENBQUMsSUFBSSxVQUFVLENBQ2pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ2xELFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMzRDtDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBTaW1wbGVDaGFuZ2VzLFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgZXF1YWxzLCBpc1ByZXNlbnQsIFZhbHVlfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEZWNpbWFsUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IHJlcHJlc2VudCBhIElucHV0IGZpZWxkIGFuZCBpdCBjYW4gIGFjY2VwdCBkaWZmZXJlbnQgdHlwZXMgb2YgdmFsdWVzIHN1Y2ggYXNcbiAqIHRleHQsIG51bWJlci5cbiAqXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ3dyYXBwZXItY29tcCcgLFxuICogICAgICB0ZW1wbGF0ZTogJzxhdy1pbnB1dC1maWVsZCBbdmFsdWVdPVwiaW5wdXRWYWx1ZVwiIFt0eXBlXT1cImlucHV0VHlwZVwiPjwvYXctaW5wdXQtZmllbGQ+J1xuICogIH0pXG4gKiAgZXhwb3J0IGNsYXNzIFRlc3RJbnB1dENvbXBvbmVudFxuICogIHtcbiAqICAgICAgaW5wdXRWYWx1ZTogc3RyaW5nID0gJ1NvbWUgdGV4dCc7XG4gKlxuICogICAgICAvLyBieSBkZWZhdWx0IGlucHV0IHR5cGUgaXMgdGV4dCwgeW91IGNhbiBwYXNzIHN0cmluZywgU3RyaW5nLCBvciB0ZXh0XG4gKiAgICAgIGlucHV0VHlwZTogc3RyaW5nID0gJ3N0cmluZyc7XG4gKiAgfVxuICpcbiAqIGBgYFxuICpcbiAqXG4gKlxuICogIyMjIEV4YW1wbGUgd2hlciBpbnB1dCBmaWVsZCBpcyBpbml0aWFsaXplZCB3aXRoIG5nTW9kZWxcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiAnd3JhcHBlci1jb21wJyAsXG4gKiAgICAgIHRlbXBsYXRlOiAnPGF3LWlucHV0LWZpZWxkIFt2YWx1ZV09XCJpbnB1dFZhbHVlXCIgWyhuZ01vZGVsKV09XCJpbnB1dFR5cGVcIj48L2F3LWlucHV0LWZpZWxkPidcbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBUZXN0SW5wdXRDb21wb25lbnRcbiAqICB7XG4gKiAgICAgIGlucHV0VmFsdWU6IHN0cmluZyA9ICdTb21lIHRleHQnO1xuICpcbiAqICAgICAgLy8gYnkgZGVmYXVsdCBpbnB1dCB0eXBlIGlzIHRleHQsIHlvdSBjYW4gcGFzcyBzdHJpbmcsIFN0cmluZywgb3IgdGV4dFxuICogICAgICBpbnB1dFR5cGU6IHN0cmluZyA9ICdzdHJpbmcnO1xuICogIH1cbiAqXG4gKiBgYGBcbiAqXG4gKiAgTm90ZTogaWYgeW91IGFyZSB1c2luZyB0aGlzIG91dHNpZGUgb2YgRm9ybVRhYmxlIHBsZWFzZSBwcm92aWRlIHlvdXIgb3duIEZvcm1Hcm91cFxuICpcbiAqL1xuXG5cblxuZXhwb3J0IGNvbnN0IElOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dEZpZWxkQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWlucHV0LWZpZWxkJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJlZGl0YWJsZVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgY2xhc3M9XCJ3LWlucHV0LXdyYXBwZXJcIj5cblxuICAgIDxpbnB1dCBwSW5wdXRUZXh0XG5cbiAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgW2F0dHIudHlwZV09XCJ0eXBlXCJcbiAgICAgICAgICAgY2xhc3M9XCJ3LWlucHV0LWZpZWxkXCJcbiAgICAgICAgICAgW25nQ2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgIFtjbGFzcy5oYXMtaWNvbl09XCJpY29uXCJcbiAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlSG9sZGVyfX1cIlxuICAgICAgICAgICBbY2xhc3MudS12YWxpZGF0aW9uLWVycm9yXT1cIiEoZm9ybUNvbnRyb2wudmFsaWQgfHwgKGZvcm1Db250cm9sLnByaXN0aW5lKSlcIlxuICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ7e25hbWV9fVwiXG4gICAgICAgICAgIFt2YWx1ZV09XCJkaXNwbGF5VmFsdWVcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpY29uXCIgY2xhc3M9XCJzYXAtaWNvblwiIFtuZ0NsYXNzXT1cImljb25cIj48L3NwYW4+XG48L2Rpdj5cblxuXG48bmctdGVtcGxhdGUgW25nSWZdPVwiIWVkaXRhYmxlXCI+XG4gICAgPGF3LXN0cmluZyBbdmFsdWVdPVwiZGlzcGxheVZhbHVlXCI+PC9hdy1zdHJpbmc+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgICBzdHlsZXM6IFtgLnctaW5wdXQtd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZX0udy1pbnB1dC1maWVsZH5zcGFue3RvcDoxM3B4O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjE1cHh9YF0sXG5cbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcblxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0RmllbGRDb21wb25lbnQpfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRGaWVsZENvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQSB2YWx1ZSB1c2VkIHRvIHNhdmUgYW5kIHJlYWQgIHdoZW4gcmVuZGVyaW5nIGFuZCB1cGRhdGluZyBhIGNvbXBvbmVudFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdXNlZCB0byBmb3JtYXQgdGhlIG51bWJlciBvYmplY3QuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHByZWNpc2lvbjogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQmlnRGVjaW1hbCBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdmFsdWUgYW5kIGxvY2FsZS5cbiAgICAgKiBJZiB0aGlzIG9iamVjdCBpcyBzZXQsIHZhbHVlcyB3aWxsIGJlIHRha2VuIGZyb20gdGhpcyBvYmplY3RcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJpZ0RlY2ltYWw6IEJpZ0RlY2ltYWw7XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlIGN1c3RvbSBpY29uIHRoYXQgaXMgcGxhY2VkIGludG8gdGhlIGlucHV0IGZpZWxkLlxuICAgICAqXG4gICAgICogVG9kbzogYWRkIGV4dHJhIGJpbmRpbmcgdGhhdCB3aWxsIGFsbG93IGRldmVsb3BlciB0byB0ZWxsIHBvc2l0aW9uLCBsZWZ0IHJpZ2h0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpY29uOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJbnB1dCBmaWVsZCB0eXBlLiBDdXJyZW50bHkgd2Ugc3VwcG9ydCBlaXRoZXIgTnVtYmVyIG9yIHRleHRcbiAgICAgKi9cbiAgICBwcml2YXRlIF90eXBlOiBzdHJpbmcgPSAnc3RyaW5nJztcblxuXG4gICAgLyoqXG4gICAgICogSnVzdCB0byBjbGVhbiB1cCBzdWJzY3JpYmVyIHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3llZFxuICAgICAqL1xuICAgIHByaXZhdGUgdmNoU3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRlY2ltYWwgcGlwZSBpcyB1c2VkIHRvIGZvcm1hdCBvdXIgbnVtYmVyIG9iamVjdC5cbiAgICAgKi9cbiAgICBkZWNpbWFsUGlwZTogRGVjaW1hbFBpcGU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZm9ybWF0dGVkIGRlY2ltYWwgdmFsdWUuIFVzZXMgYW5ndWxhciBkZWNpbWFsUGlwZSB0byBmb3JtYXQgYmFzZWQgb24gbG9jYWxlLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2Rpc3BsYXlWYWx1ZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEZvcm1Sb3dDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KSB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5kZWNpbWFsUGlwZSA9IG5ldyBEZWNpbWFsUGlwZShlbnYubG9jYWxlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLmJpZ0RlY2ltYWwpO1xuXG4gICAgICAgIHRoaXMudmNoU3Vic2NyaWJlciA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy52YWx1ZSA9IHZhbCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBnZW5lcmF0ZWQgc2V0dGVyIHRvIGNoZWNrIGZvciB2YWx1ZSBhbmQgbm9ybWFsaXppbmcgaW50byBleHBlY3RlZCBlaXRoZXIgbnVtYmVyIG9yIHRleHRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHR5cGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N0cmluZycgfHwgdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICB0aGlzLl90eXBlID0gJ3RleHQnO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLl90eXBlID0gJ251bWJlcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cblxuICAgIGdldCBkaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuYmlnRGVjaW1hbCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGxheVZhbHVlID0gdGhpcy5mb3JtYXROdW1iZXIodGhpcy5iaWdEZWNpbWFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlWYWx1ZTtcbiAgICB9XG5cbiAgICBjYW5TZXRUeXBlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuYmlnRGVjaW1hbCAmJiAhZXF1YWxzKHZhbHVlLCB0aGlzLmJpZ0RlY2ltYWwpKSB7XG4gICAgICAgICAgICB0aGlzLmJpZ0RlY2ltYWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5iaWdEZWNpbWFsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUsIHtvbmx5U2VsZjogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IHRoZSBudW1iZXIgb2JqZWN0IGFjY29yZGluZyB0byBpdHMgcHJlY2lzaW9uLlxuICAgICAqXG4gICAgICovXG4gICAgZm9ybWF0TnVtYmVyKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgLy8gVGhlIGRlZmF1bHQgcHJlY2lzaW9uIGlzIDIuIEZvciBleGFtcGxlLCAxMC4yMy5cbiAgICAgICAgbGV0IGRpZ2l0cyA9ICcxLjAtMic7XG5cbiAgICAgICAgLy8gSWYgcHJlY2lzaW9uIGlzIHByZXNlbnQsIHVzZSBpdCBmb3IgZm9ybWF0IHRoZSBiaWdEZWNpbWFsIHZhbHVlIGZvciBkaXNwbGF5LlxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucHJlY2lzaW9uKSAmJlxuICAgICAgICAgICAgdGhpcy5fdHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGRpZ2l0cyA9ICcxLjAtJyArIHRoaXMucHJlY2lzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjaW1hbFBpcGUudHJhbnNmb3JtKHZhbHVlLCBkaWdpdHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMudmNoU3Vic2NyaWJlcikpIHtcbiAgICAgICAgICAgIHRoaXMudmNoU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEJpZ0RlY2ltYWwgb2JqZWN0IGlzIHJlcHJlc2VudGVkIGFzIGEgdmFsdWUsIGxvY2FsZSwgYW5kIGN1cnJlbmN5Q29kZVxuICovXG5leHBvcnQgY2xhc3MgQmlnRGVjaW1hbCBpbXBsZW1lbnRzIFZhbHVlIHtcbiAgICB1bmlxdWVOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYW1vdW50OiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBsb2NhbGU6IHN0cmluZyA9ICdlbl9VUycpIHtcbiAgICB9XG5cblxuICAgIGdldFR5cGVzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbW91bnQ6IE51bWJlcixcbiAgICAgICAgICAgIGxvY2FsZTogU3RyaW5nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnQmlnRGVjaW1hbCc7XG4gICAgfVxuXG4gICAgJHByb3RvKCk6IEJpZ0RlY2ltYWwge1xuICAgICAgICByZXR1cm4gbmV3IEJpZ0RlY2ltYWwoMSwgJ2VuX1VTJyk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW1vdW50ICsgJywgbG9jYWxlOiAnICsgdGhpcy5sb2NhbGU7XG4gICAgfVxuXG5cbiAgICBjbG9uZShkYXRhOiB7IGFtb3VudD86IG51bWJlciwgbG9jYWxlPzogc3RyaW5nIH0gPSB7fSk6IEJpZ0RlY2ltYWwge1xuICAgICAgICByZXR1cm4gbmV3IEJpZ0RlY2ltYWwoXG4gICAgICAgICAgICBpc1ByZXNlbnQoZGF0YS5hbW91bnQpID8gZGF0YS5hbW91bnQgOiB0aGlzLmFtb3VudCxcbiAgICAgICAgICAgIGlzUHJlc2VudChkYXRhLmxvY2FsZSkgPyBkYXRhLmxvY2FsZSA6IHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbn1cblxuIl19