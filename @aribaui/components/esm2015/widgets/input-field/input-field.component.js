/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { distinctUntilChanged } from 'rxjs/operators';
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, isPresent } from '@aribaui/core';
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
         * The formatted decimal value. Uses angular decimalPipe to format based on locale.
         */
        this.displayValue = '';
        /**
         * Input field type. Currently we support either Number or text
         */
        this._type = 'string';
        this.decimalPipe = new DecimalPipe(env.locale);
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
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
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.bigDecimal);
        this.vchSubscriber = this.formControl.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe(val => {
            this.value = val;
            this.onModelChanged(this.value);
        });
        if (this.bigDecimal) {
            this.displayValue = this.formatNumber(this.bigDecimal.amount);
        }
        else {
            this.displayValue = this.value;
        }
    }
    /**
     * @return {?}
     */
    canSetType() {
        return true;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    onKeyDown(el) {
        if (this._type === 'number') {
            this.displayValue = el.value;
            this.onModelChanged(this.displayValue);
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    onBlur(el) {
        if (this._type === 'number') {
            this.bigDecimal = new BigDecimal(Number(el.value));
            this.displayValue = this.formatNumber(this.bigDecimal.amount);
            this.onModelChanged(this.displayValue);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.displayValue) {
            this.value = value;
            this.displayValue = '';
            if (this.value) {
                this.displayValue = this.value;
            }
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
        if (!value) {
            return '';
        }
        // If precision is present, use it for format the bigDecimal value for display.
        if (isPresent(this.precision) &&
            this._type === 'number') {
            // The default precision is 2. For example, 10.23.
            let /** @type {?} */ digits = '1.0-2';
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
           #inputFieldValue
           [attr.name]="name"
           [attr.type]="type"
           class="w-input-field"
           [ngClass]="styleClass"
           [class.has-icon]="icon"
           placeholder="{{placeHolder}}"
           [class.u-validation-error]="!(formControl.valid || (formControl.pristine))"
           formControlName="{{name}}"
           (keydown)="onKeyDown(inputFieldValue)"
           (blur)="onBlur(inputFieldValue)"
           [value]="displayValue">
    <span *ngIf="icon" class="sap-icon" [ngClass]="icon"></span>
</div>


<ng-template [ngIf]="!editable">
    <aw-string [value]="displayValue"></aw-string>
</ng-template>
`,
                styles: [`.w-input-wrapper{position:relative}.w-input-field{padding-right:35px}.w-input-field~span{top:13px;position:absolute;right:15px}`],
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
     * The decimal pipe is used to format our number object.
     * @type {?}
     */
    InputFieldComponent.prototype.decimalPipe;
    /**
     * The formatted decimal value. Uses angular decimalPipe to format based on locale.
     * @type {?}
     */
    InputFieldComponent.prototype.displayValue;
    /**
     * Just to clean up subscriber when component is destroyed
     * @type {?}
     */
    InputFieldComponent.prototype.vchSubscriber;
    /**
     * Input field type. Currently we support either Number or text
     * @type {?}
     */
    InputFieldComponent.prototype._type;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvaW5wdXQtZmllbGQvaW5wdXQtZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFFdEYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUQ1QyxNQUFNLENBQUMsdUJBQU0sNEJBQTRCLEdBQVE7SUFDN0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQW9DRixNQUFNLDBCQUEyQixTQUFRLGlCQUFpQjs7Ozs7SUE4Q3RELFlBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFFcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUpiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7OztxQkF2QzNDLEVBQUU7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ZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnQsIFZhbHVlfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEZWNpbWFsUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IHJlcHJlc2VudCBhIElucHV0IGZpZWxkIGFuZCBpdCBjYW4gIGFjY2VwdCBkaWZmZXJlbnQgdHlwZXMgb2YgdmFsdWVzIHN1Y2ggYXNcbiAqIHRleHQsIG51bWJlci5cbiAqXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ3dyYXBwZXItY29tcCcgLFxuICogICAgICB0ZW1wbGF0ZTogJzxhdy1pbnB1dC1maWVsZCBbdmFsdWVdPVwiaW5wdXRWYWx1ZVwiIFt0eXBlXT1cImlucHV0VHlwZVwiPjwvYXctaW5wdXQtZmllbGQ+J1xuICogIH0pXG4gKiAgZXhwb3J0IGNsYXNzIFRlc3RJbnB1dENvbXBvbmVudFxuICogIHtcbiAqICAgICAgaW5wdXRWYWx1ZTogc3RyaW5nID0gJ1NvbWUgdGV4dCc7XG4gKlxuICogICAgICAvLyBieSBkZWZhdWx0IGlucHV0IHR5cGUgaXMgdGV4dCwgeW91IGNhbiBwYXNzIHN0cmluZywgU3RyaW5nLCBvciB0ZXh0XG4gKiAgICAgIGlucHV0VHlwZTogc3RyaW5nID0gJ3N0cmluZyc7XG4gKiAgfVxuICpcbiAqIGBgYFxuICpcbiAqXG4gKlxuICogIyMjIEV4YW1wbGUgd2hlciBpbnB1dCBmaWVsZCBpcyBpbml0aWFsaXplZCB3aXRoIG5nTW9kZWxcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiAnd3JhcHBlci1jb21wJyAsXG4gKiAgICAgIHRlbXBsYXRlOiAnPGF3LWlucHV0LWZpZWxkIFt2YWx1ZV09XCJpbnB1dFZhbHVlXCIgWyhuZ01vZGVsKV09XCJpbnB1dFR5cGVcIj48L2F3LWlucHV0LWZpZWxkPidcbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBUZXN0SW5wdXRDb21wb25lbnRcbiAqICB7XG4gKiAgICAgIGlucHV0VmFsdWU6IHN0cmluZyA9ICdTb21lIHRleHQnO1xuICpcbiAqICAgICAgLy8gYnkgZGVmYXVsdCBpbnB1dCB0eXBlIGlzIHRleHQsIHlvdSBjYW4gcGFzcyBzdHJpbmcsIFN0cmluZywgb3IgdGV4dFxuICogICAgICBpbnB1dFR5cGU6IHN0cmluZyA9ICdzdHJpbmcnO1xuICogIH1cbiAqXG4gKiBgYGBcbiAqXG4gKiAgTm90ZTogaWYgeW91IGFyZSB1c2luZyB0aGlzIG91dHNpZGUgb2YgRm9ybVRhYmxlIHBsZWFzZSBwcm92aWRlIHlvdXIgb3duIEZvcm1Hcm91cFxuICpcbiAqL1xuXG5cblxuZXhwb3J0IGNvbnN0IElOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dEZpZWxkQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWlucHV0LWZpZWxkJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJlZGl0YWJsZVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgY2xhc3M9XCJ3LWlucHV0LXdyYXBwZXJcIj5cblxuICAgIDxpbnB1dCBwSW5wdXRUZXh0XG4gICAgICAgICAgICNpbnB1dEZpZWxkVmFsdWVcbiAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgW2F0dHIudHlwZV09XCJ0eXBlXCJcbiAgICAgICAgICAgY2xhc3M9XCJ3LWlucHV0LWZpZWxkXCJcbiAgICAgICAgICAgW25nQ2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgIFtjbGFzcy5oYXMtaWNvbl09XCJpY29uXCJcbiAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlSG9sZGVyfX1cIlxuICAgICAgICAgICBbY2xhc3MudS12YWxpZGF0aW9uLWVycm9yXT1cIiEoZm9ybUNvbnRyb2wudmFsaWQgfHwgKGZvcm1Db250cm9sLnByaXN0aW5lKSlcIlxuICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ7e25hbWV9fVwiXG4gICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bihpbnB1dEZpZWxkVmFsdWUpXCJcbiAgICAgICAgICAgKGJsdXIpPVwib25CbHVyKGlucHV0RmllbGRWYWx1ZSlcIlxuICAgICAgICAgICBbdmFsdWVdPVwiZGlzcGxheVZhbHVlXCI+XG4gICAgPHNwYW4gKm5nSWY9XCJpY29uXCIgY2xhc3M9XCJzYXAtaWNvblwiIFtuZ0NsYXNzXT1cImljb25cIj48L3NwYW4+XG48L2Rpdj5cblxuXG48bmctdGVtcGxhdGUgW25nSWZdPVwiIWVkaXRhYmxlXCI+XG4gICAgPGF3LXN0cmluZyBbdmFsdWVdPVwiZGlzcGxheVZhbHVlXCI+PC9hdy1zdHJpbmc+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgICBzdHlsZXM6IFtgLnctaW5wdXQtd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZX0udy1pbnB1dC1maWVsZHtwYWRkaW5nLXJpZ2h0OjM1cHh9LnctaW5wdXQtZmllbGR+c3Bhbnt0b3A6MTNweDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxNXB4fWBdLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIElOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG5cbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dEZpZWxkQ29tcG9uZW50KX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0RmllbGRDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBBIHZhbHVlIHVzZWQgdG8gc2F2ZSBhbmQgcmVhZCAgd2hlbiByZW5kZXJpbmcgYW5kIHVwZGF0aW5nIGEgY29tcG9uZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBhbnkgPSAnJztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB1c2VkIHRvIGZvcm1hdCB0aGUgbnVtYmVyIG9iamVjdC5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHJlY2lzaW9uOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBCaWdEZWNpbWFsIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB2YWx1ZSBhbmQgbG9jYWxlLlxuICAgICAqIElmIHRoaXMgb2JqZWN0IGlzIHNldCwgdmFsdWVzIHdpbGwgYmUgdGFrZW4gZnJvbSB0aGlzIG9iamVjdFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYmlnRGVjaW1hbDogQmlnRGVjaW1hbDtcblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGUgY3VzdG9tIGljb24gdGhhdCBpcyBwbGFjZWQgaW50byB0aGUgaW5wdXQgZmllbGQuXG4gICAgICpcbiAgICAgKiBUb2RvOiBhZGQgZXh0cmEgYmluZGluZyB0aGF0IHdpbGwgYWxsb3cgZGV2ZWxvcGVyIHRvIHRlbGwgcG9zaXRpb24sIGxlZnQgcmlnaHRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGljb246IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgZGVjaW1hbCBwaXBlIGlzIHVzZWQgdG8gZm9ybWF0IG91ciBudW1iZXIgb2JqZWN0LlxuICAgICAqL1xuICAgIGRlY2ltYWxQaXBlOiBEZWNpbWFsUGlwZTtcbiAgICAvKipcbiAgICAgKiBUaGUgZm9ybWF0dGVkIGRlY2ltYWwgdmFsdWUuIFVzZXMgYW5ndWxhciBkZWNpbWFsUGlwZSB0byBmb3JtYXQgYmFzZWQgb24gbG9jYWxlLlxuICAgICAqL1xuICAgIGRpc3BsYXlWYWx1ZTogc3RyaW5nID0gJyc7XG4gICAgLyoqXG4gICAgICogSnVzdCB0byBjbGVhbiB1cCBzdWJzY3JpYmVyIHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3llZFxuICAgICAqL1xuICAgIHByaXZhdGUgdmNoU3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEZvcm1Sb3dDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgICAgICB0aGlzLmRlY2ltYWxQaXBlID0gbmV3IERlY2ltYWxQaXBlKGVudi5sb2NhbGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElucHV0IGZpZWxkIHR5cGUuIEN1cnJlbnRseSB3ZSBzdXBwb3J0IGVpdGhlciBOdW1iZXIgb3IgdGV4dFxuICAgICAqL1xuICAgIHByaXZhdGUgX3R5cGU6IHN0cmluZyA9ICdzdHJpbmcnO1xuXG4gICAgZ2V0IHR5cGUoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIGdlbmVyYXRlZCBzZXR0ZXIgdG8gY2hlY2sgZm9yIHZhbHVlIGFuZCBub3JtYWxpemluZyBpbnRvIGV4cGVjdGVkIGVpdGhlciBudW1iZXIgb3IgdGV4dFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICdzdHJpbmcnIHx8IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9ICdudW1iZXInO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLmJpZ0RlY2ltYWwpO1xuXG4gICAgICAgIHRoaXMudmNoU3Vic2NyaWJlciA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh2YWwgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5iaWdEZWNpbWFsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0TnVtYmVyKHRoaXMuYmlnRGVjaW1hbC5hbW91bnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuU2V0VHlwZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZWw6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLl90eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSBlbC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5kaXNwbGF5VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25CbHVyKGVsOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fdHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuYmlnRGVjaW1hbCA9IG5ldyBCaWdEZWNpbWFsKE51bWJlcihlbC52YWx1ZSkpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLmZvcm1hdE51bWJlcih0aGlzLmJpZ0RlY2ltYWwuYW1vdW50KTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5kaXNwbGF5VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmRpc3BsYXlWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSAnJztcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSwge29ubHlTZWxmOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXQgdGhlIG51bWJlciBvYmplY3QgYWNjb3JkaW5nIHRvIGl0cyBwcmVjaXNpb24uXG4gICAgICpcbiAgICAgKi9cbiAgICBmb3JtYXROdW1iZXIodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHByZWNpc2lvbiBpcyBwcmVzZW50LCB1c2UgaXQgZm9yIGZvcm1hdCB0aGUgYmlnRGVjaW1hbCB2YWx1ZSBmb3IgZGlzcGxheS5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnByZWNpc2lvbikgJiZcbiAgICAgICAgICAgIHRoaXMuX3R5cGUgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBUaGUgZGVmYXVsdCBwcmVjaXNpb24gaXMgMi4gRm9yIGV4YW1wbGUsIDEwLjIzLlxuICAgICAgICAgICAgbGV0IGRpZ2l0cyA9ICcxLjAtMic7XG4gICAgICAgICAgICBkaWdpdHMgPSAnMS4wLScgKyB0aGlzLnByZWNpc2lvbjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgZGlnaXRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMudmNoU3Vic2NyaWJlcikpIHtcbiAgICAgICAgICAgIHRoaXMudmNoU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEJpZ0RlY2ltYWwgb2JqZWN0IGlzIHJlcHJlc2VudGVkIGFzIGEgdmFsdWUsIGxvY2FsZSwgYW5kIGN1cnJlbmN5Q29kZVxuICovXG5leHBvcnQgY2xhc3MgQmlnRGVjaW1hbCBpbXBsZW1lbnRzIFZhbHVlXG57XG4gICAgdW5pcXVlTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFtb3VudDogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbG9jYWxlOiBzdHJpbmcgPSAnZW5fVVMnKVxuICAgIHtcbiAgICB9XG5cblxuICAgIGdldFR5cGVzKCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFtb3VudDogTnVtYmVyLFxuICAgICAgICAgICAgbG9jYWxlOiBTdHJpbmdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjbGFzc05hbWUoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gJ0JpZ0RlY2ltYWwnO1xuICAgIH1cblxuICAgICRwcm90bygpOiBCaWdEZWNpbWFsXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IEJpZ0RlY2ltYWwoMSwgJ2VuX1VTJyk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5hbW91bnQgKyAnLCBsb2NhbGU6ICcgKyB0aGlzLmxvY2FsZTtcbiAgICB9XG5cblxuICAgIGNsb25lKGRhdGE6IHsgYW1vdW50PzogbnVtYmVyLCBsb2NhbGU/OiBzdHJpbmcgfSA9IHt9KTogQmlnRGVjaW1hbFxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdEZWNpbWFsKFxuICAgICAgICAgICAgaXNQcmVzZW50KGRhdGEuYW1vdW50KSA/IGRhdGEuYW1vdW50IDogdGhpcy5hbW91bnQsXG4gICAgICAgICAgICBpc1ByZXNlbnQoZGF0YS5sb2NhbGUpID8gZGF0YS5sb2NhbGUgOiB0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG59XG5cbiJdfQ==