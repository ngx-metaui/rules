/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { distinctUntilChanged } from 'rxjs/operators';
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
import { DecimalPipe } from '@angular/common';
/** *
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
  @type {?} */
export const INPUT_CONTROL_VALUE_ACCESSOR = {
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
            /** @type {?} */
            let digits = '1.0-2';
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
                template: "<div *ngIf=\"editable\" [formGroup]=\"formGroup\" class=\"w-input-wrapper\">\n\n    <input pInputText\n           #inputFieldValue\n           [attr.name]=\"name\"\n           [attr.type]=\"type\"\n           class=\"w-input-field\"\n           [ngClass]=\"styleClass\"\n           [class.has-icon]=\"icon\"\n           placeholder=\"{{placeHolder}}\"\n           [class.u-validation-error]=\"!(formControl.valid || (formControl.pristine))\"\n           formControlName=\"{{name}}\"\n           (keydown)=\"onKeyDown(inputFieldValue)\"\n           (blur)=\"onBlur(inputFieldValue)\"\n           [value]=\"displayValue\">\n    <span *ngIf=\"icon\" class=\"sap-icon\" [ngClass]=\"icon\"></span>\n</div>\n\n\n<ng-template [ngIf]=\"!editable\">\n    <aw-string [value]=\"displayValue\"></aw-string>\n</ng-template>\n",
                providers: [
                    INPUT_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => InputFieldComponent) }
                ],
                styles: [".w-input-wrapper{position:relative}.w-input-field{padding-right:35px}.w-input-field~span{top:13px;position:absolute;right:15px}"]
            }] }
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
if (false) {
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
if (false) {
    /** @type {?} */
    BigDecimal.prototype.uniqueName;
    /** @type {?} */
    BigDecimal.prototype.amount;
    /** @type {?} */
    BigDecimal.prototype.locale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvaW5wdXQtZmllbGQvaW5wdXQtZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFFdEYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUQ1QyxhQUFhLDRCQUE0QixHQUFRO0lBQzdDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFjRixNQUFNLDBCQUEyQixTQUFRLGlCQUFpQjs7Ozs7SUE4Q3RELFlBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFFcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUpiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7OztxQkF2QzNDLEVBQUU7Ozs7NEJBK0JRLEVB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QkF2QzdFLEtBQUs7d0JBUUwsS0FBSzt5QkFPTCxLQUFLO21CQVFMLEtBQUs7bUJBc0NMLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtR1YsTUFBTTs7Ozs7SUFJRixZQUE0QixTQUFpQixDQUFDLEVBQ2xCLFNBQWlCLE9BQU87UUFEeEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNsQixXQUFNLEdBQU4sTUFBTTtLQUVqQzs7OztJQUdELFFBQVE7UUFFSixNQUFNLENBQUM7WUFDSCxNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxNQUFNO1NBQ2pCLENBQUM7S0FDTDs7OztJQUVELFNBQVM7UUFFTCxNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3ZCOzs7O0lBRUQsTUFBTTtRQUVGLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDckM7Ozs7SUFFRCxRQUFRO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDbkQ7Ozs7O0lBR0QsS0FBSyxDQUFDLE9BQTZDLEVBQUU7UUFFakQsTUFBTSxDQUFDLElBQUksVUFBVSxDQUNqQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNsRCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDM0Q7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7Q29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50LCBWYWx1ZX0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVjaW1hbFBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCByZXByZXNlbnQgYSBJbnB1dCBmaWVsZCBhbmQgaXQgY2FuICBhY2NlcHQgZGlmZmVyZW50IHR5cGVzIG9mIHZhbHVlcyBzdWNoIGFzXG4gKiB0ZXh0LCBudW1iZXIuXG4gKlxuICpcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgICAgc2VsZWN0b3I6ICd3cmFwcGVyLWNvbXAnICxcbiAqICAgICAgdGVtcGxhdGU6ICc8YXctaW5wdXQtZmllbGQgW3ZhbHVlXT1cImlucHV0VmFsdWVcIiBbdHlwZV09XCJpbnB1dFR5cGVcIj48L2F3LWlucHV0LWZpZWxkPidcbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBUZXN0SW5wdXRDb21wb25lbnRcbiAqICB7XG4gKiAgICAgIGlucHV0VmFsdWU6IHN0cmluZyA9ICdTb21lIHRleHQnO1xuICpcbiAqICAgICAgLy8gYnkgZGVmYXVsdCBpbnB1dCB0eXBlIGlzIHRleHQsIHlvdSBjYW4gcGFzcyBzdHJpbmcsIFN0cmluZywgb3IgdGV4dFxuICogICAgICBpbnB1dFR5cGU6IHN0cmluZyA9ICdzdHJpbmcnO1xuICogIH1cbiAqXG4gKiBgYGBcbiAqXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlIHdoZXIgaW5wdXQgZmllbGQgaXMgaW5pdGlhbGl6ZWQgd2l0aCBuZ01vZGVsXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ3dyYXBwZXItY29tcCcgLFxuICogICAgICB0ZW1wbGF0ZTogJzxhdy1pbnB1dC1maWVsZCBbdmFsdWVdPVwiaW5wdXRWYWx1ZVwiIFsobmdNb2RlbCldPVwiaW5wdXRUeXBlXCI+PC9hdy1pbnB1dC1maWVsZD4nXG4gKiAgfSlcbiAqICBleHBvcnQgY2xhc3MgVGVzdElucHV0Q29tcG9uZW50XG4gKiAge1xuICogICAgICBpbnB1dFZhbHVlOiBzdHJpbmcgPSAnU29tZSB0ZXh0JztcbiAqXG4gKiAgICAgIC8vIGJ5IGRlZmF1bHQgaW5wdXQgdHlwZSBpcyB0ZXh0LCB5b3UgY2FuIHBhc3Mgc3RyaW5nLCBTdHJpbmcsIG9yIHRleHRcbiAqICAgICAgaW5wdXRUeXBlOiBzdHJpbmcgPSAnc3RyaW5nJztcbiAqICB9XG4gKlxuICogYGBgXG4gKlxuICogIE5vdGU6IGlmIHlvdSBhcmUgdXNpbmcgdGhpcyBvdXRzaWRlIG9mIEZvcm1UYWJsZSBwbGVhc2UgcHJvdmlkZSB5b3VyIG93biBGb3JtR3JvdXBcbiAqXG4gKi9cblxuXG5cbmV4cG9ydCBjb25zdCBJTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXRGaWVsZENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1pbnB1dC1maWVsZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdpbnB1dC1maWVsZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2lucHV0LWZpZWxkLmNvbXBvbmVudC5zY3NzJ10sXG5cbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcblxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0RmllbGRDb21wb25lbnQpfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRGaWVsZENvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEEgdmFsdWUgdXNlZCB0byBzYXZlIGFuZCByZWFkICB3aGVuIHJlbmRlcmluZyBhbmQgdXBkYXRpbmcgYSBjb21wb25lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IGFueSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHVzZWQgdG8gZm9ybWF0IHRoZSBudW1iZXIgb2JqZWN0LlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwcmVjaXNpb246IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEJpZ0RlY2ltYWwgb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHZhbHVlIGFuZCBsb2NhbGUuXG4gICAgICogSWYgdGhpcyBvYmplY3QgaXMgc2V0LCB2YWx1ZXMgd2lsbCBiZSB0YWtlbiBmcm9tIHRoaXMgb2JqZWN0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBiaWdEZWNpbWFsOiBCaWdEZWNpbWFsO1xuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZSBjdXN0b20gaWNvbiB0aGF0IGlzIHBsYWNlZCBpbnRvIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKlxuICAgICAqIFRvZG86IGFkZCBleHRyYSBiaW5kaW5nIHRoYXQgd2lsbCBhbGxvdyBkZXZlbG9wZXIgdG8gdGVsbCBwb3NpdGlvbiwgbGVmdCByaWdodFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaWNvbjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWNpbWFsIHBpcGUgaXMgdXNlZCB0byBmb3JtYXQgb3VyIG51bWJlciBvYmplY3QuXG4gICAgICovXG4gICAgZGVjaW1hbFBpcGU6IERlY2ltYWxQaXBlO1xuICAgIC8qKlxuICAgICAqIFRoZSBmb3JtYXR0ZWQgZGVjaW1hbCB2YWx1ZS4gVXNlcyBhbmd1bGFyIGRlY2ltYWxQaXBlIHRvIGZvcm1hdCBiYXNlZCBvbiBsb2NhbGUuXG4gICAgICovXG4gICAgZGlzcGxheVZhbHVlOiBzdHJpbmcgPSAnJztcbiAgICAvKipcbiAgICAgKiBKdXN0IHRvIGNsZWFuIHVwIHN1YnNjcmliZXIgd2hlbiBjb21wb25lbnQgaXMgZGVzdHJveWVkXG4gICAgICovXG4gICAgcHJpdmF0ZSB2Y2hTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuZGVjaW1hbFBpcGUgPSBuZXcgRGVjaW1hbFBpcGUoZW52LmxvY2FsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5wdXQgZmllbGQgdHlwZS4gQ3VycmVudGx5IHdlIHN1cHBvcnQgZWl0aGVyIE51bWJlciBvciB0ZXh0XG4gICAgICovXG4gICAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nID0gJ3N0cmluZyc7XG5cbiAgICBnZXQgdHlwZSgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogZ2VuZXJhdGVkIHNldHRlciB0byBjaGVjayBmb3IgdmFsdWUgYW5kIG5vcm1hbGl6aW5nIGludG8gZXhwZWN0ZWQgZWl0aGVyIG51bWJlciBvciB0ZXh0XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpXG4gICAge1xuICAgICAgICBpZiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N0cmluZycgfHwgdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICB0aGlzLl90eXBlID0gJ3RleHQnO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLl90eXBlID0gJ251bWJlcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMuYmlnRGVjaW1hbCk7XG5cbiAgICAgICAgdGhpcy52Y2hTdWJzY3JpYmVyID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHZhbCA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmJpZ0RlY2ltYWwpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5mb3JtYXROdW1iZXIodGhpcy5iaWdEZWNpbWFsLmFtb3VudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5TZXRUeXBlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihlbDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IGVsLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLmRpc3BsYXlWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJsdXIoZWw6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLl90eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5iaWdEZWNpbWFsID0gbmV3IEJpZ0RlY2ltYWwoTnVtYmVyKGVsLnZhbHVlKSk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0TnVtYmVyKHRoaXMuYmlnRGVjaW1hbC5hbW91bnQpO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLmRpc3BsYXlWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuZGlzcGxheVZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlLCB7b25seVNlbGY6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCB0aGUgbnVtYmVyIG9iamVjdCBhY2NvcmRpbmcgdG8gaXRzIHByZWNpc2lvbi5cbiAgICAgKlxuICAgICAqL1xuICAgIGZvcm1hdE51bWJlcih2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgcHJlY2lzaW9uIGlzIHByZXNlbnQsIHVzZSBpdCBmb3IgZm9ybWF0IHRoZSBiaWdEZWNpbWFsIHZhbHVlIGZvciBkaXNwbGF5LlxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucHJlY2lzaW9uKSAmJlxuICAgICAgICAgICAgdGhpcy5fdHlwZSA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRoZSBkZWZhdWx0IHByZWNpc2lvbiBpcyAyLiBGb3IgZXhhbXBsZSwgMTAuMjMuXG4gICAgICAgICAgICBsZXQgZGlnaXRzID0gJzEuMC0yJztcbiAgICAgICAgICAgIGRpZ2l0cyA9ICcxLjAtJyArIHRoaXMucHJlY2lzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjaW1hbFBpcGUudHJhbnNmb3JtKHZhbHVlLCBkaWdpdHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy52Y2hTdWJzY3JpYmVyKSkge1xuICAgICAgICAgICAgdGhpcy52Y2hTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQmlnRGVjaW1hbCBvYmplY3QgaXMgcmVwcmVzZW50ZWQgYXMgYSB2YWx1ZSwgbG9jYWxlLCBhbmQgY3VycmVuY3lDb2RlXG4gKi9cbmV4cG9ydCBjbGFzcyBCaWdEZWNpbWFsIGltcGxlbWVudHMgVmFsdWVcbntcbiAgICB1bmlxdWVOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYW1vdW50OiBudW1iZXIgPSAwLFxuICAgICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBsb2NhbGU6IHN0cmluZyA9ICdlbl9VUycpXG4gICAge1xuICAgIH1cblxuXG4gICAgZ2V0VHlwZXMoKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW1vdW50OiBOdW1iZXIsXG4gICAgICAgICAgICBsb2NhbGU6IFN0cmluZ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNsYXNzTmFtZSgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiAnQmlnRGVjaW1hbCc7XG4gICAgfVxuXG4gICAgJHByb3RvKCk6IEJpZ0RlY2ltYWxcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgQmlnRGVjaW1hbCgxLCAnZW5fVVMnKTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmFtb3VudCArICcsIGxvY2FsZTogJyArIHRoaXMubG9jYWxlO1xuICAgIH1cblxuXG4gICAgY2xvbmUoZGF0YTogeyBhbW91bnQ/OiBudW1iZXIsIGxvY2FsZT86IHN0cmluZyB9ID0ge30pOiBCaWdEZWNpbWFsXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IEJpZ0RlY2ltYWwoXG4gICAgICAgICAgICBpc1ByZXNlbnQoZGF0YS5hbW91bnQpID8gZGF0YS5hbW91bnQgOiB0aGlzLmFtb3VudCxcbiAgICAgICAgICAgIGlzUHJlc2VudChkYXRhLmxvY2FsZSkgPyBkYXRhLmxvY2FsZSA6IHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbn1cblxuIl19