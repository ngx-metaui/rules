/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
import { distinctUntilChanged } from 'rxjs/operators';
/**
 * Renders html text area component
 *
 * ### Example
 *
 * ```typescript
 *
 * \@Component({
 *          selector: 'myNote' ,
 *          template: '<aw-text-area [value]="inputValue" [autoResize]="autoResize" >
 *              </aw-text-area>'
 *      })
 *      export class MyNoteComponent
 *      {
 *          inputValue: string = 'Some really long text';
 *          autoResize: false;
 *      }
 *
 * ```
 *  Note: if you are using this outside of FormTable please provide your own FormGroup
 */
export const /** @type {?} */ TEXTAREA_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaComponent),
    multi: true
};
export class TextAreaComponent extends BaseFormComponent {
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
         * A value used to store and read user input
         *
         */
        this.value = '';
        /**
         * Spefifies visible number of lines
         */
        this.rows = 2;
        /**
         * Specifies visible width
         */
        this.columns = 20;
        /**
         * when this option is TRUE and user starts typing it will maximize textarea's width and height
         */
        this.autoResize = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.value);
        this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe(val => {
            this.value = val;
            this.onModelChanged(this.value);
        });
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value, { onlySelf: true });
        }
    }
}
TextAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-text-area',
                template: `<div *ngIf="editable" [formGroup]="formGroup">

	<textarea
        pInputTextarea
        [attr.name]="name"
        class="w-text-area"
        [class.u-validation-error]="!(formControl.valid || (formControl.pristine))"
        [class.disabled]="disabled"
        formControlName="{{name}}"
        [rows]="rows"
        [cols]="columns"
        [autoResize]="autoResize"
        [attr.placeholder]="placeHolder"

    ></textarea>

</div>


<ng-template [ngIf]="!editable">
    <aw-string [value]="value"></aw-string>
</ng-template>
`,
                styles: [``],
                providers: [
                    TEXTAREA_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => TextAreaComponent) }
                ]
            },] },
];
/** @nocollapse */
TextAreaComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
TextAreaComponent.propDecorators = {
    value: [{ type: Input }],
    rows: [{ type: Input }],
    columns: [{ type: Input }],
    autoResize: [{ type: Input }]
};
function TextAreaComponent_tsickle_Closure_declarations() {
    /**
     *
     * A value used to store and read user input
     *
     * @type {?}
     */
    TextAreaComponent.prototype.value;
    /**
     * Spefifies visible number of lines
     * @type {?}
     */
    TextAreaComponent.prototype.rows;
    /**
     * Specifies visible width
     * @type {?}
     */
    TextAreaComponent.prototype.columns;
    /**
     * when this option is TRUE and user starts typing it will maximize textarea's width and height
     * @type {?}
     */
    TextAreaComponent.prototype.autoResize;
    /** @type {?} */
    TextAreaComponent.prototype.env;
    /** @type {?} */
    TextAreaComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3RleHQtYXJlYS90ZXh0LWFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDdEYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQnBELE1BQU0sQ0FBQyx1QkFBTSwrQkFBK0IsR0FBUTtJQUNoRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBbUNGLE1BQU0sd0JBQXlCLFNBQVEsaUJBQWlCOzs7OztJQStCcEQsWUFBbUIsR0FBZ0IsRUFFYixlQUFrQztRQUVwRCxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBSmIsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUViLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7O3FCQXpCM0MsRUFBRTs7OztvQkFPQSxDQUFDOzs7O3VCQU9FLEVBQUU7Ozs7MEJBT0UsSUFBSTtLQU96Qjs7OztJQUVELFFBQVE7UUFHSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQzlCLG9CQUFvQixFQUFFLENBQ3pCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBRWQsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7SUFPRCxVQUFVLENBQUMsS0FBVTtRQUVqQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7U0FDdEQ7S0FFSjs7O1lBakdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0JiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFFWixTQUFTLEVBQUU7b0JBQ1AsK0JBQStCO29CQUMvQixFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUM7aUJBQ2pGO2FBQ0o7Ozs7WUFuRU8sV0FBVztZQUNYLGlCQUFpQix1QkFtR1IsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDOzs7b0JBekI3RSxLQUFLO21CQU9MLEtBQUs7c0JBT0wsS0FBSzt5QkFPTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybVJvd0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tcm93L2Zvcm0tcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLyoqXG4gKiBSZW5kZXJzIGh0bWwgdGV4dCBhcmVhIGNvbXBvbmVudFxuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKlxuICogICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgIHNlbGVjdG9yOiAnbXlOb3RlJyAsXG4gKiAgICAgICAgICB0ZW1wbGF0ZTogJzxhdy10ZXh0LWFyZWEgW3ZhbHVlXT1cImlucHV0VmFsdWVcIiBbYXV0b1Jlc2l6ZV09XCJhdXRvUmVzaXplXCIgPlxuICogICAgICAgICAgICAgIDwvYXctdGV4dC1hcmVhPidcbiAqICAgICAgfSlcbiAqICAgICAgZXhwb3J0IGNsYXNzIE15Tm90ZUNvbXBvbmVudFxuICogICAgICB7XG4gKiAgICAgICAgICBpbnB1dFZhbHVlOiBzdHJpbmcgPSAnU29tZSByZWFsbHkgbG9uZyB0ZXh0JztcbiAqICAgICAgICAgIGF1dG9SZXNpemU6IGZhbHNlO1xuICogICAgICB9XG4gKlxuICogYGBgXG4gKiAgTm90ZTogaWYgeW91IGFyZSB1c2luZyB0aGlzIG91dHNpZGUgb2YgRm9ybVRhYmxlIHBsZWFzZSBwcm92aWRlIHlvdXIgb3duIEZvcm1Hcm91cFxuICovXG5cbmV4cG9ydCBjb25zdCBURVhUQVJFQV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGV4dEFyZWFDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctdGV4dC1hcmVhJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJlZGl0YWJsZVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG5cblx0PHRleHRhcmVhXG4gICAgICAgIHBJbnB1dFRleHRhcmVhXG4gICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgIGNsYXNzPVwidy10ZXh0LWFyZWFcIlxuICAgICAgICBbY2xhc3MudS12YWxpZGF0aW9uLWVycm9yXT1cIiEoZm9ybUNvbnRyb2wudmFsaWQgfHwgKGZvcm1Db250cm9sLnByaXN0aW5lKSlcIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ7e25hbWV9fVwiXG4gICAgICAgIFtyb3dzXT1cInJvd3NcIlxuICAgICAgICBbY29sc109XCJjb2x1bW5zXCJcbiAgICAgICAgW2F1dG9SZXNpemVdPVwiYXV0b1Jlc2l6ZVwiXG4gICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlSG9sZGVyXCJcblxuICAgID48L3RleHRhcmVhPlxuXG48L2Rpdj5cblxuXG48bmctdGVtcGxhdGUgW25nSWZdPVwiIWVkaXRhYmxlXCI+XG4gICAgPGF3LXN0cmluZyBbdmFsdWVdPVwidmFsdWVcIj48L2F3LXN0cmluZz5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICAgIHN0eWxlczogW2BgXSxcblxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBURVhUQVJFQV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRleHRBcmVhQ29tcG9uZW50KX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRBcmVhQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEEgdmFsdWUgdXNlZCB0byBzdG9yZSBhbmQgcmVhZCB1c2VyIGlucHV0XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBhbnkgPSAnJztcblxuXG4gICAgLyoqXG4gICAgICogU3BlZmlmaWVzIHZpc2libGUgbnVtYmVyIG9mIGxpbmVzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByb3dzOiBudW1iZXIgPSAyO1xuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdmlzaWJsZSB3aWR0aFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29sdW1uczogbnVtYmVyID0gMjA7XG5cblxuICAgIC8qKlxuICAgICAqIHdoZW4gdGhpcyBvcHRpb24gaXMgVFJVRSBhbmQgdXNlciBzdGFydHMgdHlwaW5nIGl0IHdpbGwgbWF4aW1pemUgdGV4dGFyZWEncyB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhdXRvUmVzaXplOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuXG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICAgKS5zdWJzY3JpYmUodmFsID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUsIHtvbmx5U2VsZjogdHJ1ZX0pO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=