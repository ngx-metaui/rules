/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export var /** @type {?} */ INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return InputFieldComponent; }),
    multi: true
};
var InputFieldComponent = /** @class */ (function (_super) {
    tslib_1.__extends(InputFieldComponent, _super);
    function InputFieldComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         *
         * A value used to save and read  when rendering and updating a component
         *
         */
        _this.value = '';
        /**
         * Input field type. Currently we support either Number or text
         */
        _this._type = 'string';
        _this.decimalPipe = new DecimalPipe(env.locale);
        return _this;
    }
    /**
     * @return {?}
     */
    InputFieldComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        _super.prototype.registerFormControl.call(this, this.bigDecimal);
        this.vchSubscriber = this.formControl.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe(function (val) {
            setTimeout(function () { return _this.value = val; });
            // this.value = val;
            // this.value = val;
            _this.onModelChanged(_this.value);
        });
    };
    Object.defineProperty(InputFieldComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this._type;
        },
        /**
         *
         * generated setter to check for value and normalizing into expected either number or text
         *
         */
        set: /**
         *
         * generated setter to check for value and normalizing into expected either number or text
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value.toLowerCase() === 'string' || value.toLowerCase() === 'text') {
                this._type = 'text';
            }
            else if (value.toLowerCase() === 'number') {
                this._type = 'number';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputFieldComponent.prototype, "displayValue", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.bigDecimal) {
                this._displayValue = this.formatNumber(this.bigDecimal);
            }
            else {
                this._displayValue = this.value;
            }
            return this._displayValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    InputFieldComponent.prototype.canSetType = /**
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    InputFieldComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.bigDecimal && !equals(value, this.bigDecimal)) {
            this.bigDecimal = value;
            this.formControl.setValue(this.bigDecimal);
            return;
        }
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value, { onlySelf: true });
        }
    };
    /**
     * Format the number object according to its precision.
     *
     */
    /**
     * Format the number object according to its precision.
     *
     * @param {?} value
     * @return {?}
     */
    InputFieldComponent.prototype.formatNumber = /**
     * Format the number object according to its precision.
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // The default precision is 2. For example, 10.23.
        var /** @type {?} */ digits = '1.0-2';
        // If precision is present, use it for format the bigDecimal value for display.
        if (isPresent(this.precision) &&
            this._type === 'number') {
            digits = '1.0-' + this.precision;
            return this.decimalPipe.transform(value, digits);
        }
        return value;
    };
    /**
     * @return {?}
     */
    InputFieldComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        if (isPresent(this.vchSubscriber)) {
            this.vchSubscriber.unsubscribe();
        }
    };
    InputFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-input-field',
                    template: "<div *ngIf=\"editable\" [formGroup]=\"formGroup\" class=\"w-input-wrapper\">\n\n    <input pInputText\n\n           [attr.name]=\"name\"\n           [attr.type]=\"type\"\n           class=\"w-input-field\"\n           [ngClass]=\"styleClass\"\n           [class.has-icon]=\"icon\"\n           placeholder=\"{{placeHolder}}\"\n           [class.u-validation-error]=\"!(formControl.valid || (formControl.pristine))\"\n           formControlName=\"{{name}}\"\n           [value]=\"displayValue\">\n        <span *ngIf=\"icon\" class=\"sap-icon\" [ngClass]=\"icon\"></span>\n</div>\n\n\n<ng-template [ngIf]=\"!editable\">\n    <aw-string [value]=\"displayValue\"></aw-string>\n</ng-template>\n",
                    styles: [".w-input-wrapper{position:relative}.w-input-field~span{top:13px;position:absolute;right:15px}"],
                    providers: [
                        INPUT_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return InputFieldComponent; }) }
                    ]
                },] },
    ];
    /** @nocollapse */
    InputFieldComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return FormRowComponent; }),] }] }
    ]; };
    InputFieldComponent.propDecorators = {
        value: [{ type: Input }],
        precision: [{ type: Input }],
        bigDecimal: [{ type: Input }],
        icon: [{ type: Input }],
        type: [{ type: Input }]
    };
    return InputFieldComponent;
}(BaseFormComponent));
export { InputFieldComponent };
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
var /**
 * BigDecimal object is represented as a value, locale, and currencyCode
 */
BigDecimal = /** @class */ (function () {
    function BigDecimal(amount, locale) {
        if (amount === void 0) { amount = 0; }
        if (locale === void 0) { locale = 'en_US'; }
        this.amount = amount;
        this.locale = locale;
    }
    /**
     * @return {?}
     */
    BigDecimal.prototype.getTypes = /**
     * @return {?}
     */
    function () {
        return {
            amount: Number,
            locale: String
        };
    };
    /**
     * @return {?}
     */
    BigDecimal.prototype.className = /**
     * @return {?}
     */
    function () {
        return 'BigDecimal';
    };
    /**
     * @return {?}
     */
    BigDecimal.prototype.$proto = /**
     * @return {?}
     */
    function () {
        return new BigDecimal(1, 'en_US');
    };
    /**
     * @return {?}
     */
    BigDecimal.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this.amount + ', locale: ' + this.locale;
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    BigDecimal.prototype.clone = /**
     * @param {?=} data
     * @return {?}
     */
    function (data) {
        if (data === void 0) { data = {}; }
        return new BigDecimal(isPresent(data.amount) ? data.amount : this.amount, isPresent(data.locale) ? data.locale : this.locale);
    };
    return BigDecimal;
}());
/**
 * BigDecimal object is represented as a value, locale, and currencyCode
 */
export { BigDecimal };
function BigDecimal_tsickle_Closure_declarations() {
    /** @type {?} */
    BigDecimal.prototype.uniqueName;
    /** @type {?} */
    BigDecimal.prototype.amount;
    /** @type {?} */
    BigDecimal.prototype.locale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvaW5wdXQtZmllbGQvaW5wdXQtZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUNILFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQzlDLFFBQVEsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFFdEYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUQ1QyxNQUFNLENBQUMscUJBQU0sNEJBQTRCLEdBQVE7SUFDN0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBa0N1QywrQ0FBaUI7SUFzRHRELDZCQUFtQixHQUFnQixFQUViLGVBQWtDO1FBRnhELFlBR0ksa0JBQU0sR0FBRyxFQUFFLGVBQWUsQ0FBQyxTQUU5QjtRQUxrQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIscUJBQWUsR0FBZixlQUFlLENBQW1COzs7Ozs7c0JBaEQzQyxF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O0tBQ2pDOzs7O0lBR0QsNkJBQVE7OztJQUFSO1FBQ0ksTUFBTSxDQUFDO1lBQ0gsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsTUFBTTtTQUNqQixDQUFDO0tBQ0w7Ozs7SUFFRCw4QkFBUzs7O0lBQVQ7UUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3ZCOzs7O0lBRUQsMkJBQU07OztJQUFOO1FBQ0ksTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNyQzs7OztJQUVELDZCQUFROzs7SUFBUjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ25EOzs7OztJQUdELDBCQUFLOzs7O0lBQUwsVUFBTSxJQUErQztRQUEvQyxxQkFBQSxFQUFBLFNBQStDO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FDakIsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFDbEQsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzNEO3FCQXRSTDtJQXdSQyxDQUFBOzs7O0FBbENELHNCQWtDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2ltcGxlQ2hhbmdlcyxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGVxdWFscywgaXNQcmVzZW50LCBWYWx1ZX0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGVjaW1hbFBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCByZXByZXNlbnQgYSBJbnB1dCBmaWVsZCBhbmQgaXQgY2FuICBhY2NlcHQgZGlmZmVyZW50IHR5cGVzIG9mIHZhbHVlcyBzdWNoIGFzXG4gKiB0ZXh0LCBudW1iZXIuXG4gKlxuICpcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgICAgc2VsZWN0b3I6ICd3cmFwcGVyLWNvbXAnICxcbiAqICAgICAgdGVtcGxhdGU6ICc8YXctaW5wdXQtZmllbGQgW3ZhbHVlXT1cImlucHV0VmFsdWVcIiBbdHlwZV09XCJpbnB1dFR5cGVcIj48L2F3LWlucHV0LWZpZWxkPidcbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBUZXN0SW5wdXRDb21wb25lbnRcbiAqICB7XG4gKiAgICAgIGlucHV0VmFsdWU6IHN0cmluZyA9ICdTb21lIHRleHQnO1xuICpcbiAqICAgICAgLy8gYnkgZGVmYXVsdCBpbnB1dCB0eXBlIGlzIHRleHQsIHlvdSBjYW4gcGFzcyBzdHJpbmcsIFN0cmluZywgb3IgdGV4dFxuICogICAgICBpbnB1dFR5cGU6IHN0cmluZyA9ICdzdHJpbmcnO1xuICogIH1cbiAqXG4gKiBgYGBcbiAqXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlIHdoZXIgaW5wdXQgZmllbGQgaXMgaW5pdGlhbGl6ZWQgd2l0aCBuZ01vZGVsXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ3dyYXBwZXItY29tcCcgLFxuICogICAgICB0ZW1wbGF0ZTogJzxhdy1pbnB1dC1maWVsZCBbdmFsdWVdPVwiaW5wdXRWYWx1ZVwiIFsobmdNb2RlbCldPVwiaW5wdXRUeXBlXCI+PC9hdy1pbnB1dC1maWVsZD4nXG4gKiAgfSlcbiAqICBleHBvcnQgY2xhc3MgVGVzdElucHV0Q29tcG9uZW50XG4gKiAge1xuICogICAgICBpbnB1dFZhbHVlOiBzdHJpbmcgPSAnU29tZSB0ZXh0JztcbiAqXG4gKiAgICAgIC8vIGJ5IGRlZmF1bHQgaW5wdXQgdHlwZSBpcyB0ZXh0LCB5b3UgY2FuIHBhc3Mgc3RyaW5nLCBTdHJpbmcsIG9yIHRleHRcbiAqICAgICAgaW5wdXRUeXBlOiBzdHJpbmcgPSAnc3RyaW5nJztcbiAqICB9XG4gKlxuICogYGBgXG4gKlxuICogIE5vdGU6IGlmIHlvdSBhcmUgdXNpbmcgdGhpcyBvdXRzaWRlIG9mIEZvcm1UYWJsZSBwbGVhc2UgcHJvdmlkZSB5b3VyIG93biBGb3JtR3JvdXBcbiAqXG4gKi9cblxuXG5cbmV4cG9ydCBjb25zdCBJTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXRGaWVsZENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1pbnB1dC1maWVsZCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZWRpdGFibGVcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIGNsYXNzPVwidy1pbnB1dC13cmFwcGVyXCI+XG5cbiAgICA8aW5wdXQgcElucHV0VGV4dFxuXG4gICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgIFthdHRyLnR5cGVdPVwidHlwZVwiXG4gICAgICAgICAgIGNsYXNzPVwidy1pbnB1dC1maWVsZFwiXG4gICAgICAgICAgIFtuZ0NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICBbY2xhc3MuaGFzLWljb25dPVwiaWNvblwiXG4gICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3twbGFjZUhvbGRlcn19XCJcbiAgICAgICAgICAgW2NsYXNzLnUtdmFsaWRhdGlvbi1lcnJvcl09XCIhKGZvcm1Db250cm9sLnZhbGlkIHx8IChmb3JtQ29udHJvbC5wcmlzdGluZSkpXCJcbiAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwie3tuYW1lfX1cIlxuICAgICAgICAgICBbdmFsdWVdPVwiZGlzcGxheVZhbHVlXCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiaWNvblwiIGNsYXNzPVwic2FwLWljb25cIiBbbmdDbGFzc109XCJpY29uXCI+PC9zcGFuPlxuPC9kaXY+XG5cblxuPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFlZGl0YWJsZVwiPlxuICAgIDxhdy1zdHJpbmcgW3ZhbHVlXT1cImRpc3BsYXlWYWx1ZVwiPjwvYXctc3RyaW5nPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gICAgc3R5bGVzOiBbYC53LWlucHV0LXdyYXBwZXJ7cG9zaXRpb246cmVsYXRpdmV9LnctaW5wdXQtZmllbGR+c3Bhbnt0b3A6MTNweDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxNXB4fWBdLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIElOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG5cbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dEZpZWxkQ29tcG9uZW50KX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0RmllbGRDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEEgdmFsdWUgdXNlZCB0byBzYXZlIGFuZCByZWFkICB3aGVuIHJlbmRlcmluZyBhbmQgdXBkYXRpbmcgYSBjb21wb25lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IGFueSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHVzZWQgdG8gZm9ybWF0IHRoZSBudW1iZXIgb2JqZWN0LlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwcmVjaXNpb246IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEJpZ0RlY2ltYWwgb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHZhbHVlIGFuZCBsb2NhbGUuXG4gICAgICogSWYgdGhpcyBvYmplY3QgaXMgc2V0LCB2YWx1ZXMgd2lsbCBiZSB0YWtlbiBmcm9tIHRoaXMgb2JqZWN0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBiaWdEZWNpbWFsOiBCaWdEZWNpbWFsO1xuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZSBjdXN0b20gaWNvbiB0aGF0IGlzIHBsYWNlZCBpbnRvIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKlxuICAgICAqIFRvZG86IGFkZCBleHRyYSBiaW5kaW5nIHRoYXQgd2lsbCBhbGxvdyBkZXZlbG9wZXIgdG8gdGVsbCBwb3NpdGlvbiwgbGVmdCByaWdodFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaWNvbjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSW5wdXQgZmllbGQgdHlwZS4gQ3VycmVudGx5IHdlIHN1cHBvcnQgZWl0aGVyIE51bWJlciBvciB0ZXh0XG4gICAgICovXG4gICAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nID0gJ3N0cmluZyc7XG5cblxuICAgIC8qKlxuICAgICAqIEp1c3QgdG8gY2xlYW4gdXAgc3Vic2NyaWJlciB3aGVuIGNvbXBvbmVudCBpcyBkZXN0cm95ZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIHZjaFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBkZWNpbWFsIHBpcGUgaXMgdXNlZCB0byBmb3JtYXQgb3VyIG51bWJlciBvYmplY3QuXG4gICAgICovXG4gICAgZGVjaW1hbFBpcGU6IERlY2ltYWxQaXBlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZvcm1hdHRlZCBkZWNpbWFsIHZhbHVlLiBVc2VzIGFuZ3VsYXIgZGVjaW1hbFBpcGUgdG8gZm9ybWF0IGJhc2VkIG9uIGxvY2FsZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9kaXNwbGF5VmFsdWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudCkge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuZGVjaW1hbFBpcGUgPSBuZXcgRGVjaW1hbFBpcGUoZW52LmxvY2FsZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy5iaWdEZWNpbWFsKTtcblxuICAgICAgICB0aGlzLnZjaFN1YnNjcmliZXIgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudmFsdWUgPSB2YWwpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogZ2VuZXJhdGVkIHNldHRlciB0byBjaGVjayBmb3IgdmFsdWUgYW5kIG5vcm1hbGl6aW5nIGludG8gZXhwZWN0ZWQgZWl0aGVyIG51bWJlciBvciB0ZXh0XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICdzdHJpbmcnIHx8IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9ICdudW1iZXInO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG5cbiAgICBnZXQgZGlzcGxheVZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmJpZ0RlY2ltYWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlWYWx1ZSA9IHRoaXMuZm9ybWF0TnVtYmVyKHRoaXMuYmlnRGVjaW1hbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5VmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5VmFsdWU7XG4gICAgfVxuXG4gICAgY2FuU2V0VHlwZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmJpZ0RlY2ltYWwgJiYgIWVxdWFscyh2YWx1ZSwgdGhpcy5iaWdEZWNpbWFsKSkge1xuICAgICAgICAgICAgdGhpcy5iaWdEZWNpbWFsID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMuYmlnRGVjaW1hbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlLCB7b25seVNlbGY6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCB0aGUgbnVtYmVyIG9iamVjdCBhY2NvcmRpbmcgdG8gaXRzIHByZWNpc2lvbi5cbiAgICAgKlxuICAgICAqL1xuICAgIGZvcm1hdE51bWJlcih2YWx1ZTogYW55KSB7XG4gICAgICAgIC8vIFRoZSBkZWZhdWx0IHByZWNpc2lvbiBpcyAyLiBGb3IgZXhhbXBsZSwgMTAuMjMuXG4gICAgICAgIGxldCBkaWdpdHMgPSAnMS4wLTInO1xuXG4gICAgICAgIC8vIElmIHByZWNpc2lvbiBpcyBwcmVzZW50LCB1c2UgaXQgZm9yIGZvcm1hdCB0aGUgYmlnRGVjaW1hbCB2YWx1ZSBmb3IgZGlzcGxheS5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnByZWNpc2lvbikgJiZcbiAgICAgICAgICAgIHRoaXMuX3R5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBkaWdpdHMgPSAnMS4wLScgKyB0aGlzLnByZWNpc2lvbjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY2ltYWxQaXBlLnRyYW5zZm9ybSh2YWx1ZSwgZGlnaXRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnZjaFN1YnNjcmliZXIpKSB7XG4gICAgICAgICAgICB0aGlzLnZjaFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBCaWdEZWNpbWFsIG9iamVjdCBpcyByZXByZXNlbnRlZCBhcyBhIHZhbHVlLCBsb2NhbGUsIGFuZCBjdXJyZW5jeUNvZGVcbiAqL1xuZXhwb3J0IGNsYXNzIEJpZ0RlY2ltYWwgaW1wbGVtZW50cyBWYWx1ZSB7XG4gICAgdW5pcXVlTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFtb3VudDogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbG9jYWxlOiBzdHJpbmcgPSAnZW5fVVMnKSB7XG4gICAgfVxuXG5cbiAgICBnZXRUeXBlcygpOiBhbnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW1vdW50OiBOdW1iZXIsXG4gICAgICAgICAgICBsb2NhbGU6IFN0cmluZ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ0JpZ0RlY2ltYWwnO1xuICAgIH1cblxuICAgICRwcm90bygpOiBCaWdEZWNpbWFsIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdEZWNpbWFsKDEsICdlbl9VUycpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFtb3VudCArICcsIGxvY2FsZTogJyArIHRoaXMubG9jYWxlO1xuICAgIH1cblxuXG4gICAgY2xvbmUoZGF0YTogeyBhbW91bnQ/OiBudW1iZXIsIGxvY2FsZT86IHN0cmluZyB9ID0ge30pOiBCaWdEZWNpbWFsIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdEZWNpbWFsKFxuICAgICAgICAgICAgaXNQcmVzZW50KGRhdGEuYW1vdW50KSA/IGRhdGEuYW1vdW50IDogdGhpcy5hbW91bnQsXG4gICAgICAgICAgICBpc1ByZXNlbnQoZGF0YS5sb2NhbGUpID8gZGF0YS5sb2NhbGUgOiB0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG59XG5cbiJdfQ==