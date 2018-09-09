/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, isBoolean, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
/** @typedef {?} */
var CheckboxType;
export { CheckboxType };
/** *
 *
 * Implements standard HTML checkbox on top of PrimeNG. There are 2 types of
 * {\@link CheckboxComponent}: form and action checkbox as described above.
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
  @type {?} */
export var CB_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CheckboxComponent; }),
    multi: true
};
var CheckboxComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxComponent, _super);
    function CheckboxComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         *
         * A value associated with this checkbox
         *
         */
        _this.value = '';
        /**
         * Type of checkbox. Form based updates model and Action based only fires click events
         *
         */
        _this.type = 'form';
        /**
         * Trigger click event.
         *
         */
        _this.action = new EventEmitter();
        /**
         * PrimeNG has this type called binary which works only with Boolean meaning it does not add or
         * remove values.
         *
         * In our case Checktype = Action is always binary or when this.value is boolean
         *
         */
        _this.isBinary = false;
        return _this;
    }
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.model = this.value;
        this.type = this.action.observers.length > 0 ? 'action' : this.type;
        if (this.isFormType()) {
            _super.prototype.ngOnInit.call(this);
            if (this.isStandalone) {
                _super.prototype.registerFormControl.call(this, this.value);
                this.model = this.formControl.value;
                this.onModelChanged(this.model);
            }
            else {
                // get control from parent
                this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
            }
        }
        // When value is boolean we are dealing with PrimeNg Binary checkbox
        // which only sets TRUE/FALSE and does not add or remove values
        this.isBinary = isBoolean(this.value);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CheckboxComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (isPresent(changes['value']) &&
            (changes['value'].currentValue !== changes['value'].previousValue)) {
            this.model = changes['value'].currentValue;
        }
    };
    /**
     * Called when Checkbox is clicked and it either fire action or updates the model.
     *
     */
    /**
     * Called when Checkbox is clicked and it either fire action or updates the model.
     *
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.onChange = /**
     * Called when Checkbox is clicked and it either fire action or updates the model.
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isFormType()) {
            this.onModelChanged(this.model);
            if (this.isStandalone) {
                this.formControl.setValue(this.model);
            }
        }
        else {
            this.action.emit(event);
        }
    };
    /**
     *
     * Tell if we are using Form Checkbox. This is used remove some of the bindings that are not
     * applicable for certain type.
     *
     */
    /**
     *
     * Tell if we are using Form Checkbox. This is used remove some of the bindings that are not
     * applicable for certain type.
     *
     * @return {?}
     */
    CheckboxComponent.prototype.isFormType = /**
     *
     * Tell if we are using Form Checkbox. This is used remove some of the bindings that are not
     * applicable for certain type.
     *
     * @return {?}
     */
    function () {
        return this.type === 'form';
    };
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    CheckboxComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.model && this.isFormType()) {
            this.model = value;
            if (this.isStandalone) {
                this.onModelChanged(this.model);
                this.formControl.setValue(this.model);
            }
        }
    };
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-checkbox',
                    template: "<span class=\"w-checkbox\">\n\n    <ng-template [ngIf]=\"editable && isFormType()\">\n        <p-checkbox [name]=\"name\" [value]=\"value\" [label]=\"label\"\n                    [(ngModel)]=\"model\"\n                    [binary]=\"isBinary\"\n                    (onChange)=\"onChange($event)\"\n                    [disabled]=\"disabled\"\n                    [class.u-validation-error]=\"!(formControl.valid || (formControl.pristine))\"\n        >\n        </p-checkbox>\n    </ng-template>\n\n\n    <ng-template [ngIf]=\"!isFormType()\">\n        <p-checkbox [binary]=\"isBinary\"\n                    [label]=\"label\"\n                    [(ngModel)]=\"model\"\n                    (onChange)=\"onChange($event)\"\n                    [disabled]=\"disabled\">\n        </p-checkbox>\n\n    </ng-template>\n</span>\n",
                    providers: [
                        CB_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return CheckboxComponent; }) }
                    ],
                    styles: ["/deep/ .ui-chkbox .ui-chkbox-box{width:22px;height:22px}/deep/ .ui-chkbox .pi{font-family:\"SAP icon fonts\";color:#199de0;cursor:pointer;font-size:1.07em;line-height:1.42em}/deep/ .ui-chkbox .pi.pi-check:before{content:'\\e05b'}"]
                }] }
    ];
    /** @nocollapse */
    CheckboxComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return BaseFormComponent; }),] }] }
    ]; };
    CheckboxComponent.propDecorators = {
        value: [{ type: Input }],
        type: [{ type: Input }],
        label: [{ type: Input }],
        action: [{ type: Output }]
    };
    return CheckboxComponent;
}(BaseFormComponent));
export { CheckboxComponent };
if (false) {
    /**
     *
     * A value associated with this checkbox
     *
     * @type {?}
     */
    CheckboxComponent.prototype.value;
    /**
     * Type of checkbox. Form based updates model and Action based only fires click events
     *
     * @type {?}
     */
    CheckboxComponent.prototype.type;
    /**
     * Label to be used when rendering a checkbox
     * @type {?}
     */
    CheckboxComponent.prototype.label;
    /**
     * Trigger click event.
     *
     * @type {?}
     */
    CheckboxComponent.prototype.action;
    /**
     * PrimeNG has this type called binary which works only with Boolean meaning it does not add or
     * remove values.
     *
     * In our case Checktype = Action is always binary or when this.value is boolean
     *
     * @type {?}
     */
    CheckboxComponent.prototype.isBinary;
    /**
     * Internal model for checkbox
     * @type {?}
     */
    CheckboxComponent.prototype.model;
    /** @type {?} */
    CheckboxComponent.prototype.env;
    /** @type {?} */
    CheckboxComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBRU4sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtEakUsV0FBYSx5QkFBeUIsR0FBUTtJQUMxQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUFhcUMsNkNBQWlCO0lBaURwRCwyQkFBbUIsR0FBZ0IsRUFFYixlQUFrQztRQUZ4RCxZQUlJLGtCQUFNLEdBQUcsRUFBRSxlQUFlLENBQUMsU0FDOUI7UUFMa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUViLHFCQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7O3NCQTFDM0MsRUFBRTs7Ozs7cUJBUU0sTUFBTTs7Ozs7dUJBZUMsSUFBSSxZQUFZLEVBQUU7Ozs7Ozs7O3lCQVMxQixLQUFLOztLQWF4Qjs7OztJQUVELG9DQUFROzs7SUFBUjtRQUVJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4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LEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDLEVBQUM7cUJBQ2pGOztpQkFDSjs7OztnQkFuRU8sV0FBVztnQkFDWCxpQkFBaUIsdUJBcUhSLFFBQVEsWUFBSSxRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUM7Ozt3QkExQzlFLEtBQUs7dUJBUUwsS0FBSzt3QkFPTCxLQUFLO3lCQVFMLE1BQU07OzRCQW5JWDtFQW9HdUMsaUJBQWlCO1NBQTNDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQm9vbGVhbiwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiAgQ2hlY2tib3hUeXBlIGRlc2NyaWJlcyB3aGF0IHR5cGUgb2YgY2hlY2tib3ggaXMgdGhpczpcbiAqXG4gKiAtIEZvcm0gdHlwZTogdGhhdCBpcyB3cml0aW5nIGFuZCByZWFkaW5nIGEgdmFsdWUgZnJvbS90byBtb2RlbCBib3RoIHVzaW5nIEZvcm1Hcm91cCBhcyB3ZWxsXG4gKiAgICAgICAgICAgICAgYXMgbmdNb2RlbFxuICogLSBBY3Rpb24gdHlwZTogIG9ubHkgZmlyZXMgYWN0aW9uIGFuZCBkb2VzIG5vdCB3cml0ZSB2YWx1ZSB0byBtb2RlbC5cbiAqXG4gKlxuICovXG5leHBvcnQgdHlwZSBDaGVja2JveFR5cGUgPSAnZm9ybScgfCAnYWN0aW9uJztcblxuLyoqXG4gKlxuICogSW1wbGVtZW50cyBzdGFuZGFyZCBIVE1MIGNoZWNrYm94IG9uIHRvcCBvZiBQcmltZU5HLiBUaGVyZSBhcmUgMiB0eXBlcyBvZlxuICoge0BsaW5rIENoZWNrYm94Q29tcG9uZW50fTogZm9ybSBhbmQgYWN0aW9uIGNoZWNrYm94IGFzIGRlc2NyaWJlZCBhYm92ZS5cbiAqXG4gKlxuICogVXNhZ2U6IEJhc2ljIGV4YW1wbGUgaGF2aW5nIHJlZCBjaGVja2JveCBjaGVja2VkXG4gKlxuICogYGBgSFRNTFxuICogICAgICAgIDxhdy1jaGVja2JveCBbbmFtZV09XCInY29sb3InXCIgW3ZhbHVlXT1cIidyZWQnXCIgW2xhYmVsXT1cIidSZWQnXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIj5cbiAqICAgICAgICA8L2F3LWNoZWNrYm94PlxuICogICAgICAgIDxhdy1jaGVja2JveCBbbmFtZV09XCInY29sb3InXCIgW3ZhbHVlXT1cIidibHVlJ1wiIFtsYWJlbF09XCInQmx1ZSdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbFwiPlxuICogICAgICAgPC9hdy1jaGVja2JveD5cbiAqXG4gKiBgYGBcbiAqXG4gKiBgYGB0c1xuICpcbiAqXG4gKiAgIGNsYXNzIENCQmFzaWNXaXRoTmdNb2RlbENvbXBvbmVudFxuICogICB7XG4gKlxuICogICAgICAgbW9kZWw6IHN0cmluZ1tdID0gWydyZWQnXTtcbiAqXG4gKiAgICAgICBjb25zdHJ1Y3RvcigpXG4gKiAgICAgICB7XG4gKiAgICAgICB9XG4gKiAgIH1cbiAqXG4gKiBgYGBcbiAqXG4gKiBGb3IgbW9yZSBleGFtcGxlcyBwbGVhc2Ugc2VlIGEgcGxheWdyb3VuZCBvciB1bml0IHRlc3QuXG4gKlxuICovXG5leHBvcnQgY29uc3QgQ0JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrYm94Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWNoZWNrYm94JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnY2hlY2tib3guY29tcG9uZW50LnNjc3MnXSxcblxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDQl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrYm94Q29tcG9uZW50KX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94Q29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaGVja2JveFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55ID0gJyc7XG5cblxuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgY2hlY2tib3guIEZvcm0gYmFzZWQgdXBkYXRlcyBtb2RlbCBhbmQgQWN0aW9uIGJhc2VkIG9ubHkgZmlyZXMgY2xpY2sgZXZlbnRzXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHR5cGU6IENoZWNrYm94VHlwZSA9ICdmb3JtJztcblxuXG4gICAgLyoqXG4gICAgICogTGFiZWwgdG8gYmUgdXNlZCB3aGVuIHJlbmRlcmluZyBhIGNoZWNrYm94XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsYWJlbDogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGNsaWNrIGV2ZW50LlxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFByaW1lTkcgaGFzIHRoaXMgdHlwZSBjYWxsZWQgYmluYXJ5IHdoaWNoIHdvcmtzIG9ubHkgd2l0aCBCb29sZWFuIG1lYW5pbmcgaXQgZG9lcyBub3QgYWRkIG9yXG4gICAgICogcmVtb3ZlIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEluIG91ciBjYXNlIENoZWNrdHlwZSA9IEFjdGlvbiBpcyBhbHdheXMgYmluYXJ5IG9yIHdoZW4gdGhpcy52YWx1ZSBpcyBib29sZWFuXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0JpbmFyeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbW9kZWwgZm9yIGNoZWNrYm94XG4gICAgICovXG4gICAgbW9kZWw6IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEJhc2VGb3JtQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5hY3Rpb24ub2JzZXJ2ZXJzLmxlbmd0aCA+IDAgPyAnYWN0aW9uJyA6IHRoaXMudHlwZTtcblxuICAgICAgICBpZiAodGhpcy5pc0Zvcm1UeXBlKCkpIHtcbiAgICAgICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhbmRhbG9uZSkge1xuICAgICAgICAgICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNvbnRyb2wgZnJvbSBwYXJlbnRcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sID0gPEZvcm1Db250cm9sPiB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gdmFsdWUgaXMgYm9vbGVhbiB3ZSBhcmUgZGVhbGluZyB3aXRoIFByaW1lTmcgQmluYXJ5IGNoZWNrYm94XG4gICAgICAgIC8vIHdoaWNoIG9ubHkgc2V0cyBUUlVFL0ZBTFNFIGFuZCBkb2VzIG5vdCBhZGQgb3IgcmVtb3ZlIHZhbHVlc1xuICAgICAgICB0aGlzLmlzQmluYXJ5ID0gaXNCb29sZWFuKHRoaXMudmFsdWUpO1xuXG4gICAgfVxuXG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChjaGFuZ2VzWyd2YWx1ZSddKSAmJlxuICAgICAgICAgICAgKGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzWyd2YWx1ZSddLnByZXZpb3VzVmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWU7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gQ2hlY2tib3ggaXMgY2xpY2tlZCBhbmQgaXQgZWl0aGVyIGZpcmUgYWN0aW9uIG9yIHVwZGF0ZXMgdGhlIG1vZGVsLlxuICAgICAqXG4gICAgICovXG4gICAgb25DaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlzRm9ybVR5cGUoKSkge1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhbmRhbG9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbi5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUZWxsIGlmIHdlIGFyZSB1c2luZyBGb3JtIENoZWNrYm94LiBUaGlzIGlzIHVzZWQgcmVtb3ZlIHNvbWUgb2YgdGhlIGJpbmRpbmdzIHRoYXQgYXJlIG5vdFxuICAgICAqIGFwcGxpY2FibGUgZm9yIGNlcnRhaW4gdHlwZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGlzRm9ybVR5cGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ2Zvcm0nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMubW9kZWwgJiYgdGhpcy5pc0Zvcm1UeXBlKCkpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=