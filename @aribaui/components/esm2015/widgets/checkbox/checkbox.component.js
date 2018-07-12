/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, isBoolean, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
/**
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
 */
export const /** @type {?} */ CB_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};
export class CheckboxComponent extends BaseFormComponent {
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
         * A value associated with this checkbox
         *
         */
        this.value = '';
        /**
         * Type of checkbox. Form based updates model and Action based only fires click events
         *
         */
        this.type = 'form';
        /**
         * Trigger click event.
         *
         */
        this.action = new EventEmitter();
        /**
         * PrimeNG has this type called binary which works only with Boolean meaning it does not add or
         * remove values.
         *
         * In our case Checktype = Action is always binary or when this.value is boolean
         *
         */
        this.isBinary = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.model = this.value;
        this.type = this.action.observers.length > 0 ? 'action' : this.type;
        if (this.isFormType()) {
            super.ngOnInit();
            if (this.isStandalone) {
                super.registerFormControl(this.value);
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (isPresent(changes['value']) &&
            (changes['value'].currentValue !== changes['value'].previousValue)) {
            this.model = changes['value'].currentValue;
        }
    }
    /**
     * Called when Checkbox is clicked and it either fire action or updates the model.
     *
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        if (this.isFormType()) {
            this.onModelChanged(this.model);
            if (this.isStandalone) {
                this.formControl.setValue(this.model);
            }
        }
        else {
            this.action.emit(event);
        }
    }
    /**
     *
     * Tell if we are using Form Checkbox. This is used remove some of the bindings that are not
     * applicable for certain type.
     *
     * @return {?}
     */
    isFormType() {
        return this.type === 'form';
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.model && this.isFormType()) {
            this.model = value;
            if (this.isStandalone) {
                this.onModelChanged(this.model);
                this.formControl.setValue(this.model);
            }
        }
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-checkbox',
                template: `<span class="w-checkbox">

    <ng-template [ngIf]="editable && isFormType()">
        <p-checkbox [name]="name" [value]="value" [label]="label"
                    [(ngModel)]="model"
                    [binary]="isBinary"
                    (onChange)="onChange($event)"
                    [disabled]="disabled"
                    [class.u-validation-error]="!(formControl.valid || (formControl.pristine))"
        >
        </p-checkbox>
    </ng-template>


    <ng-template [ngIf]="!isFormType()">
        <p-checkbox [binary]="isBinary"
                    [label]="label"
                    [(ngModel)]="model"
                    (onChange)="onChange($event)"
                    [disabled]="disabled">
        </p-checkbox>

    </ng-template>
</span>
`,
                styles: [`/deep/ .ui-chkbox .ui-chkbox-box{width:22px;height:22px}/deep/ .ui-chkbox .pi{font-family:"SAP icon fonts";color:#199de0;cursor:pointer;font-size:1.07em;line-height:1.42em}/deep/ .ui-chkbox .pi.pi-check:before{content:'\\e05b'}`],
                providers: [
                    CB_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => CheckboxComponent) }
                ]
            },] },
];
/** @nocollapse */
CheckboxComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
CheckboxComponent.propDecorators = {
    value: [{ type: Input }],
    type: [{ type: Input }],
    label: [{ type: Input }],
    action: [{ type: Output }]
};
function CheckboxComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFFTixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0RqRSxNQUFNLENBQUMsdUJBQU0seUJBQXlCLEdBQVE7SUFDMUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQXFDRixNQUFNLHdCQUF5QixTQUFRLGlCQUFpQjs7Ozs7SUFpRHBELFlBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFFcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUpiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7OztxQkExQzNDLEVBQUU7Ozs7O29CQVFNLE1BQU07Ozs7O3NCQWVDLElBQUksWUFBWSxFQUFFOzs7Ozs7Ozt3QkFTMUIsS0FBSztLQWF4Qjs7OztJQUVELFFBQVE7UUFFSixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFcEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25DO1lBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUVKLElBQUksQ0FBQyxXQUFXLHFCQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQzthQUN2RTtTQUNKOzs7UUFHRCxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FFekM7Ozs7O0lBR0QsV0FBVyxDQUFDLE9BQXNCO1FBRTlCLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUM7U0FDOUM7S0FHSjs7Ozs7OztJQU1ELFFBQVEsQ0FBQyxLQUFVO1FBRWYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO0tBQ0o7Ozs7Ozs7O0lBU0QsVUFBVTtRQUVOLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztLQUMvQjs7Ozs7OztJQU1ELFVBQVUsQ0FBQyxLQUFVO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFFbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekM7U0FDSjtLQUNKOzs7WUF4S0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdCYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxxT0FBcU8sQ0FBQztnQkFFL08sU0FBUyxFQUFFO29CQUNQLHlCQUF5QjtvQkFDekIsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDO2lCQUNqRjthQUNKOzs7O1lBM0ZPLFdBQVc7WUFDWCxpQkFBaUIsdUJBNklSLFFBQVEsWUFBSSxRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzs7O29CQTFDOUUsS0FBSzttQkFRTCxLQUFLO29CQU9MLEtBQUs7cUJBUUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQm9vbGVhbiwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiAgQ2hlY2tib3hUeXBlIGRlc2NyaWJlcyB3aGF0IHR5cGUgb2YgY2hlY2tib3ggaXMgdGhpczpcbiAqXG4gKiAtIEZvcm0gdHlwZTogdGhhdCBpcyB3cml0aW5nIGFuZCByZWFkaW5nIGEgdmFsdWUgZnJvbS90byBtb2RlbCBib3RoIHVzaW5nIEZvcm1Hcm91cCBhcyB3ZWxsXG4gKiAgICAgICAgICAgICAgYXMgbmdNb2RlbFxuICogLSBBY3Rpb24gdHlwZTogIG9ubHkgZmlyZXMgYWN0aW9uIGFuZCBkb2VzIG5vdCB3cml0ZSB2YWx1ZSB0byBtb2RlbC5cbiAqXG4gKlxuICovXG5leHBvcnQgdHlwZSBDaGVja2JveFR5cGUgPSAnZm9ybScgfCAnYWN0aW9uJztcblxuLyoqXG4gKlxuICogSW1wbGVtZW50cyBzdGFuZGFyZCBIVE1MIGNoZWNrYm94IG9uIHRvcCBvZiBQcmltZU5HLiBUaGVyZSBhcmUgMiB0eXBlcyBvZlxuICoge0BsaW5rIENoZWNrYm94Q29tcG9uZW50fTogZm9ybSBhbmQgYWN0aW9uIGNoZWNrYm94IGFzIGRlc2NyaWJlZCBhYm92ZS5cbiAqXG4gKlxuICogVXNhZ2U6IEJhc2ljIGV4YW1wbGUgaGF2aW5nIHJlZCBjaGVja2JveCBjaGVja2VkXG4gKlxuICogYGBgSFRNTFxuICogICAgICAgIDxhdy1jaGVja2JveCBbbmFtZV09XCInY29sb3InXCIgW3ZhbHVlXT1cIidyZWQnXCIgW2xhYmVsXT1cIidSZWQnXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIj5cbiAqICAgICAgICA8L2F3LWNoZWNrYm94PlxuICogICAgICAgIDxhdy1jaGVja2JveCBbbmFtZV09XCInY29sb3InXCIgW3ZhbHVlXT1cIidibHVlJ1wiIFtsYWJlbF09XCInQmx1ZSdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbFwiPlxuICogICAgICAgPC9hdy1jaGVja2JveD5cbiAqXG4gKiBgYGBcbiAqXG4gKiBgYGB0c1xuICpcbiAqXG4gKiAgIGNsYXNzIENCQmFzaWNXaXRoTmdNb2RlbENvbXBvbmVudFxuICogICB7XG4gKlxuICogICAgICAgbW9kZWw6IHN0cmluZ1tdID0gWydyZWQnXTtcbiAqXG4gKiAgICAgICBjb25zdHJ1Y3RvcigpXG4gKiAgICAgICB7XG4gKiAgICAgICB9XG4gKiAgIH1cbiAqXG4gKiBgYGBcbiAqXG4gKiBGb3IgbW9yZSBleGFtcGxlcyBwbGVhc2Ugc2VlIGEgcGxheWdyb3VuZCBvciB1bml0IHRlc3QuXG4gKlxuICovXG5leHBvcnQgY29uc3QgQ0JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrYm94Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWNoZWNrYm94JyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuIGNsYXNzPVwidy1jaGVja2JveFwiPlxuXG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImVkaXRhYmxlICYmIGlzRm9ybVR5cGUoKVwiPlxuICAgICAgICA8cC1jaGVja2JveCBbbmFtZV09XCJuYW1lXCIgW3ZhbHVlXT1cInZhbHVlXCIgW2xhYmVsXT1cImxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgIFtiaW5hcnldPVwiaXNCaW5hcnlcIlxuICAgICAgICAgICAgICAgICAgICAob25DaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy51LXZhbGlkYXRpb24tZXJyb3JdPVwiIShmb3JtQ29udHJvbC52YWxpZCB8fCAoZm9ybUNvbnRyb2wucHJpc3RpbmUpKVwiXG4gICAgICAgID5cbiAgICAgICAgPC9wLWNoZWNrYm94PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaXNGb3JtVHlwZSgpXCI+XG4gICAgICAgIDxwLWNoZWNrYm94IFtiaW5hcnldPVwiaXNCaW5hcnlcIlxuICAgICAgICAgICAgICAgICAgICBbbGFiZWxdPVwibGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgPC9wLWNoZWNrYm94PlxuXG4gICAgPC9uZy10ZW1wbGF0ZT5cbjwvc3Bhbj5cbmAsXG4gICAgc3R5bGVzOiBbYC9kZWVwLyAudWktY2hrYm94IC51aS1jaGtib3gtYm94e3dpZHRoOjIycHg7aGVpZ2h0OjIycHh9L2RlZXAvIC51aS1jaGtib3ggLnBpe2ZvbnQtZmFtaWx5OlwiU0FQIGljb24gZm9udHNcIjtjb2xvcjojMTk5ZGUwO2N1cnNvcjpwb2ludGVyO2ZvbnQtc2l6ZToxLjA3ZW07bGluZS1oZWlnaHQ6MS40MmVtfS9kZWVwLyAudWktY2hrYm94IC5waS5waS1jaGVjazpiZWZvcmV7Y29udGVudDonXFxcXGUwNWInfWBdLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENCX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hlY2tib3hDb21wb25lbnQpfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBBIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNoZWNrYm94XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBhbnkgPSAnJztcblxuXG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBjaGVja2JveC4gRm9ybSBiYXNlZCB1cGRhdGVzIG1vZGVsIGFuZCBBY3Rpb24gYmFzZWQgb25seSBmaXJlcyBjbGljayBldmVudHNcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHlwZTogQ2hlY2tib3hUeXBlID0gJ2Zvcm0nO1xuXG5cbiAgICAvKipcbiAgICAgKiBMYWJlbCB0byBiZSB1c2VkIHdoZW4gcmVuZGVyaW5nIGEgY2hlY2tib3hcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgY2xpY2sgZXZlbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBhY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogUHJpbWVORyBoYXMgdGhpcyB0eXBlIGNhbGxlZCBiaW5hcnkgd2hpY2ggd29ya3Mgb25seSB3aXRoIEJvb2xlYW4gbWVhbmluZyBpdCBkb2VzIG5vdCBhZGQgb3JcbiAgICAgKiByZW1vdmUgdmFsdWVzLlxuICAgICAqXG4gICAgICogSW4gb3VyIGNhc2UgQ2hlY2t0eXBlID0gQWN0aW9uIGlzIGFsd2F5cyBiaW5hcnkgb3Igd2hlbiB0aGlzLnZhbHVlIGlzIGJvb2xlYW5cbiAgICAgKlxuICAgICAqL1xuICAgIGlzQmluYXJ5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtb2RlbCBmb3IgY2hlY2tib3hcbiAgICAgKi9cbiAgICBtb2RlbDogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQmFzZUZvcm1Db21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLmFjdGlvbi5vYnNlcnZlcnMubGVuZ3RoID4gMCA/ICdhY3Rpb24nIDogdGhpcy50eXBlO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRm9ybVR5cGUoKSkge1xuICAgICAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgY29udHJvbCBmcm9tIHBhcmVudFxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSA8Rm9ybUNvbnRyb2w+IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW3RoaXMubmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiB2YWx1ZSBpcyBib29sZWFuIHdlIGFyZSBkZWFsaW5nIHdpdGggUHJpbWVOZyBCaW5hcnkgY2hlY2tib3hcbiAgICAgICAgLy8gd2hpY2ggb25seSBzZXRzIFRSVUUvRkFMU0UgYW5kIGRvZXMgbm90IGFkZCBvciByZW1vdmUgdmFsdWVzXG4gICAgICAgIHRoaXMuaXNCaW5hcnkgPSBpc0Jvb2xlYW4odGhpcy52YWx1ZSk7XG5cbiAgICB9XG5cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGNoYW5nZXNbJ3ZhbHVlJ10pICYmXG4gICAgICAgICAgICAoY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXNbJ3ZhbHVlJ10ucHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBDaGVja2JveCBpcyBjbGlja2VkIGFuZCBpdCBlaXRoZXIgZmlyZSBhY3Rpb24gb3IgdXBkYXRlcyB0aGUgbW9kZWwuXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNoYW5nZShldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaXNGb3JtVHlwZSgpKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRlbGwgaWYgd2UgYXJlIHVzaW5nIEZvcm0gQ2hlY2tib3guIFRoaXMgaXMgdXNlZCByZW1vdmUgc29tZSBvZiB0aGUgYmluZGluZ3MgdGhhdCBhcmUgbm90XG4gICAgICogYXBwbGljYWJsZSBmb3IgY2VydGFpbiB0eXBlLlxuICAgICAqXG4gICAgICovXG4gICAgaXNGb3JtVHlwZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlID09PSAnZm9ybSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwuIFBsZWFzZSBzZWUgQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAgICAgKlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5tb2RlbCAmJiB0aGlzLmlzRm9ybVR5cGUoKSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==