/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Environment, isBlank, isPresent, noop, uuid } from '@aribaui/core';
import { forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../core/base.component';
/** @typedef {?} */
var WidgetSize;
export { WidgetSize };
/** @enum {number} */
const WidgetSizeColumns = {
    xsmall: 1,
    small: 3,
    medium: 6,
    large: 9,
    xlarge: 12,
};
export { WidgetSizeColumns };
WidgetSizeColumns[WidgetSizeColumns.xsmall] = 'xsmall';
WidgetSizeColumns[WidgetSizeColumns.small] = 'small';
WidgetSizeColumns[WidgetSizeColumns.medium] = 'medium';
WidgetSizeColumns[WidgetSizeColumns.large] = 'large';
WidgetSizeColumns[WidgetSizeColumns.xlarge] = 'xlarge';
/**
 *  BaseFormComponnet extends BaseComponent for add specific form behavior
 *
 * @abstract
 */
export class BaseFormComponent extends BaseComponent {
    /**
     * Some of the BaseFormComponent can wrap other component and in these cases we want to
     * inherit some of the behavior from parent
     *
     * \@Inject(Environment) public env: Environment : is tem a workaround as without inject
     * on this specific component it complains that Environment is unresolved symbol
     *
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * Is current element visible
         */
        this.hidden = false;
        /**
         * Renders required flex around the component
         *
         */
        this.required = false;
        /**
         *  a text displayed when value is empty or NULL
         */
        this.placeHolder = '';
        /**
         * Identify if this control is used directly or if its part of some other control
         * e.g. GenericChooser and managed by this control.
         * Meaning State is mananged outside of this component
         *
         */
        this.isStandalone = true;
        this.onModelChanged = noop;
        this.onModelTouched = noop;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isPresent(this.parentContainer)) {
            this.formGroup = this.parentContainer.formGroup;
            this.editable = this.parentContainer.editable;
        }
        this.checkInitForm();
    }
    /**
     * Make sure that we have available formGroup and Name and ID
     *
     * @return {?}
     */
    checkInitForm() {
        if (isBlank(this.env.currentForm)) {
            this.env.currentForm = new FormGroup({});
        }
        /**
                 * Todo: Right now I just need to initialize name , but ideally it needs to be generated
                 * number basedon some semantics app.page.component if there are more component on the page
                 * then app.page.componentNumber. Simple solution is to is to get Elementref and query it.
                 */
        if (isBlank(this.name)) {
            this.name = uuid();
        }
        if (isBlank(this.id)) {
            this.id = uuid();
        }
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    doRegister(name, value) {
        /** @type {?} */
        let fControl;
        if (isBlank(this.formGroup.controls[name])) {
            this.formGroup.registerControl(name, new FormControl(value));
            fControl = /** @type {?} */ (this.formGroup.controls[name]);
        }
        else {
            fControl = /** @type {?} */ (this.formGroup.controls[name]);
            /** @type {?} */
            let updatedValue = isPresent(fControl.value) ? fControl.value : value;
            fControl.patchValue(updatedValue, { onlySelf: true, emitEvent: false });
        }
        return fControl;
    }
    /**
     * When we are dealing with Forms this is a helper method to register control
     *
     *
     * @param {?} value default value to be pre-set
     * @return {?}
     */
    registerFormControl(value) {
        this.formControl = this.doRegister(this.name, value);
        if (this.disabled) {
            this.formControl.disable();
        }
    }
    /**
     * @return {?}
     */
    get formGroup() {
        return isPresent(this._formGroup) ? this._formGroup : this.env.currentForm;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set formGroup(value) {
        this._formGroup = value;
    }
    /**
     * Indicates if we can pass field type as a binding to the components. e.g. InputField need
     * such type to correctly render input type=text, number
     *
     * todo: is this needed? can we maybe pass this to the formRow?
     * @return {?}
     */
    canSetType() {
        return false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChanged = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
}
/*
     *  Supported layout constants. It is expected there will be more options as we currently
     *  support only these two there will be other variations of it. e.g. for stacked it will not
     *  be 1 columns like it is now but multiple columns
     *
     */
BaseFormComponent.LayoutStacked = 'stacked';
BaseFormComponent.LayoutInline = 'inline';
/** @nocollapse */
BaseFormComponent.ctorParameters = () => [
    { type: Environment, decorators: [{ type: Inject, args: [Environment,] }] },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
BaseFormComponent.propDecorators = {
    name: [{ type: Input }],
    id: [{ type: Input }],
    hidden: [{ type: Input }],
    required: [{ type: Input }],
    placeHolder: [{ type: Input }],
    isStandalone: [{ type: Input }],
    formGroup: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    BaseFormComponent.LayoutStacked;
    /** @type {?} */
    BaseFormComponent.LayoutInline;
    /**
     * Component name attribute. Can be used to lookup component in form.
     * @type {?}
     */
    BaseFormComponent.prototype.name;
    /**
     * Component Id. Can be used to lookup component in form.
     * @type {?}
     */
    BaseFormComponent.prototype.id;
    /**
     *
     * Is current element visible
     * @type {?}
     */
    BaseFormComponent.prototype.hidden;
    /**
     * You can pass in formGroup which will be used with in the form
     *
     * \@Input() - see getter
     * @type {?}
     */
    BaseFormComponent.prototype._formGroup;
    /**
     * Renders required flex around the component
     *
     * @type {?}
     */
    BaseFormComponent.prototype.required;
    /**
     *  a text displayed when value is empty or NULL
     * @type {?}
     */
    BaseFormComponent.prototype.placeHolder;
    /**
     * Identify if this control is used directly or if its part of some other control
     * e.g. GenericChooser and managed by this control.
     * Meaning State is mananged outside of this component
     *
     * @type {?}
     */
    BaseFormComponent.prototype.isStandalone;
    /**
     * Form Control for the component. Its either inherited since it was precreated in parent
     * component or its created based on passed 'name' and registered with the 'formGroup'
     *
     * When  initialize FormControl we do setValue with onlySelf:true flag and we do not emit any
     * event outside
     *
     * @type {?}
     */
    BaseFormComponent.prototype.formControl;
    /**
     * Formatter that can be assign to the component in order to format its input
     * @type {?}
     */
    BaseFormComponent.prototype.formatter;
    /** @type {?} */
    BaseFormComponent.prototype.onModelChanged;
    /** @type {?} */
    BaseFormComponent.prototype.onModelTouched;
    /** @type {?} */
    BaseFormComponent.prototype.env;
    /** @type {?} */
    BaseFormComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFpQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUF1QixXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7SUFjakQsU0FBVTtJQUNWLFFBQVM7SUFDVCxTQUFVO0lBQ1YsUUFBUztJQUNULFVBQVc7OztvQ0FKWCxNQUFNO29DQUNOLEtBQUs7b0NBQ0wsTUFBTTtvQ0FDTixLQUFLO29DQUNMLE1BQU07Ozs7OztBQVFWLE1BQU0sd0JBQWtDLFNBQVEsYUFBYTs7Ozs7Ozs7Ozs7SUE4RnpELFlBQXlDLEdBQWdCLEVBRWxDLGVBQWtDO1FBRXJELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUowQixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWxDLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7c0JBakV2QyxLQUFLOzs7Ozt3QkFlSCxLQUFLOzs7OzJCQU9ILEVBQUU7Ozs7Ozs7NEJBU0EsSUFBSTs4QkFvQmlCLElBQUk7OEJBQ0osSUFBSTtLQWdCaEQ7Ozs7SUFHRCxRQUFRO1FBRUosS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUks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QUM7S0FDNUI7Ozs7Ozs7O2tDQTFNK0IsU0FBUztpQ0FDVixRQUFROzs7WUF0Q25DLFdBQVcsdUJBMkhELE1BQU0sU0FBQyxXQUFXO1lBRVEsaUJBQWlCLHVCQUQzQyxRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7OzttQkFoRi9FLEtBQUs7aUJBT0wsS0FBSztxQkFRTCxLQUFLO3VCQWVMLEtBQUs7MEJBT0wsS0FBSzsyQkFTTCxLQUFLO3dCQWtITCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnQsIG5vb3AsIHV1aWR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUGlwZVRyYW5zZm9ybSwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKiB4LXNtYWxsID0gPiAxMiUgID0gPiBjb2wtMVxuICogc21hbGwgPSA+IGBcbiAqIG1lZGl1bSA9ID4gNTAlICAgPSA+IGNvbC02XG4gKiBsYXJnZSA9ID4gNzUlICAgID0gPiBjb2wtOVxuICogbGFyZ2UgPSA+IDEwMCUgICA9ID4gY29sLTEyXG4gKlxuICovXG5leHBvcnQgdHlwZSBXaWRnZXRTaXplID0gJ3gtc21hbGwnIHwgJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJyB8ICd4LWxhcmdlJztcblxuZXhwb3J0IGVudW0gV2lkZ2V0U2l6ZUNvbHVtbnNcbntcbiAgICB4c21hbGwgPSAxLFxuICAgIHNtYWxsID0gMyxcbiAgICBtZWRpdW0gPSA2LFxuICAgIGxhcmdlID0gOSxcbiAgICB4bGFyZ2UgPSAxMlxufVxuXG5cbi8qKlxuICogIEJhc2VGb3JtQ29tcG9ubmV0IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBmb3IgYWRkIHNwZWNpZmljIGZvcm0gYmVoYXZpb3JcbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRm9ybUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3Nvclxue1xuICAgIC8qXG4gICAgICogIFN1cHBvcnRlZCBsYXlvdXQgY29uc3RhbnRzLiBJdCBpcyBleHBlY3RlZCB0aGVyZSB3aWxsIGJlIG1vcmUgb3B0aW9ucyBhcyB3ZSBjdXJyZW50bHlcbiAgICAgKiAgc3VwcG9ydCBvbmx5IHRoZXNlIHR3byB0aGVyZSB3aWxsIGJlIG90aGVyIHZhcmlhdGlvbnMgb2YgaXQuIGUuZy4gZm9yIHN0YWNrZWQgaXQgd2lsbCBub3RcbiAgICAgKiAgYmUgMSBjb2x1bW5zIGxpa2UgaXQgaXMgbm93IGJ1dCBtdWx0aXBsZSBjb2x1bW5zXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgTGF5b3V0U3RhY2tlZCA9ICdzdGFja2VkJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTGF5b3V0SW5saW5lID0gJ2lubGluZSc7XG5cblxuICAgIC8qKlxuICAgICAqIENvbXBvbmVudCBuYW1lIGF0dHJpYnV0ZS4gQ2FuIGJlIHVzZWQgdG8gbG9va3VwIGNvbXBvbmVudCBpbiBmb3JtLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbmFtZTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBDb21wb25lbnQgSWQuIENhbiBiZSB1c2VkIHRvIGxvb2t1cCBjb21wb25lbnQgaW4gZm9ybS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGlkOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSXMgY3VycmVudCBlbGVtZW50IHZpc2libGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhpZGRlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogWW91IGNhbiBwYXNzIGluIGZvcm1Hcm91cCB3aGljaCB3aWxsIGJlIHVzZWQgd2l0aCBpbiB0aGUgZm9ybVxuICAgICAqXG4gICAgICogQElucHV0KCkgLSBzZWUgZ2V0dGVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgcmVxdWlyZWQgZmxleCBhcm91bmQgdGhlIGNvbXBvbmVudFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiAgYSB0ZXh0IGRpc3BsYXllZCB3aGVuIHZhbHVlIGlzIGVtcHR5IG9yIE5VTExcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlSG9sZGVyOiBTdHJpbmcgPSAnJztcblxuICAgIC8qKlxuICAgICAqIElkZW50aWZ5IGlmIHRoaXMgY29udHJvbCBpcyB1c2VkIGRpcmVjdGx5IG9yIGlmIGl0cyBwYXJ0IG9mIHNvbWUgb3RoZXIgY29udHJvbFxuICAgICAqIGUuZy4gR2VuZXJpY0Nob29zZXIgYW5kIG1hbmFnZWQgYnkgdGhpcyBjb250cm9sLlxuICAgICAqIE1lYW5pbmcgU3RhdGUgaXMgbWFuYW5nZWQgb3V0c2lkZSBvZiB0aGlzIGNvbXBvbmVudFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpc1N0YW5kYWxvbmU6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBGb3JtIENvbnRyb2wgZm9yIHRoZSBjb21wb25lbnQuIEl0cyBlaXRoZXIgaW5oZXJpdGVkIHNpbmNlIGl0IHdhcyBwcmVjcmVhdGVkIGluIHBhcmVudFxuICAgICAqIGNvbXBvbmVudCBvciBpdHMgY3JlYXRlZCBiYXNlZCBvbiBwYXNzZWQgJ25hbWUnIGFuZCByZWdpc3RlcmVkIHdpdGggdGhlICdmb3JtR3JvdXAnXG4gICAgICpcbiAgICAgKiBXaGVuICBpbml0aWFsaXplIEZvcm1Db250cm9sIHdlIGRvIHNldFZhbHVlIHdpdGggb25seVNlbGY6dHJ1ZSBmbGFnIGFuZCB3ZSBkbyBub3QgZW1pdCBhbnlcbiAgICAgKiBldmVudCBvdXRzaWRlXG4gICAgICpcbiAgICAgKi9cbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG5cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdHRlciB0aGF0IGNhbiBiZSBhc3NpZ24gdG8gdGhlIGNvbXBvbmVudCBpbiBvcmRlciB0byBmb3JtYXQgaXRzIGlucHV0XG4gICAgICovXG4gICAgZm9ybWF0dGVyOiBQaXBlVHJhbnNmb3JtO1xuXG5cbiAgICBwcm90ZWN0ZWQgb25Nb2RlbENoYW5nZWQ6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuICAgIHByb3RlY3RlZCBvbk1vZGVsVG91Y2hlZDogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cblxuICAgIC8qKlxuICAgICAqIFNvbWUgb2YgdGhlIEJhc2VGb3JtQ29tcG9uZW50IGNhbiB3cmFwIG90aGVyIGNvbXBvbmVudCBhbmQgaW4gdGhlc2UgY2FzZXMgd2Ugd2FudCB0b1xuICAgICAqIGluaGVyaXQgc29tZSBvZiB0aGUgYmVoYXZpb3IgZnJvbSBwYXJlbnRcbiAgICAgKlxuICAgICAqIEBJbmplY3QoRW52aXJvbm1lbnQpIHB1YmxpYyBlbnY6IEVudmlyb25tZW50IDogaXMgdGVtIGEgd29ya2Fyb3VuZCBhcyB3aXRob3V0IGluamVjdFxuICAgICAqIG9uIHRoaXMgc3BlY2lmaWMgY29tcG9uZW50IGl0IGNvbXBsYWlucyB0aGF0IEVudmlyb25tZW50IGlzIHVucmVzb2x2ZWQgc3ltYm9sXG4gICAgICpcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoQEluamVjdChFbnZpcm9ubWVudCkgcHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBCYXNlRm9ybUNvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0ICgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5wYXJlbnRDb250YWluZXIpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cCA9IHRoaXMucGFyZW50Q29udGFpbmVyLmZvcm1Hcm91cDtcbiAgICAgICAgICAgIHRoaXMuZWRpdGFibGUgPSB0aGlzLnBhcmVudENvbnRhaW5lci5lZGl0YWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hlY2tJbml0Rm9ybSgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTWFrZSBzdXJlIHRoYXQgd2UgaGF2ZSBhdmFpbGFibGUgZm9ybUdyb3VwIGFuZCBOYW1lIGFuZCBJRFxuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNoZWNrSW5pdEZvcm0gKClcbiAgICB7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5lbnYuY3VycmVudEZvcm0pKSB7XG4gICAgICAgICAgICB0aGlzLmVudi5jdXJyZW50Rm9ybSA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRvZG86IFJpZ2h0IG5vdyBJIGp1c3QgbmVlZCB0byBpbml0aWFsaXplIG5hbWUgLCBidXQgaWRlYWxseSBpdCBuZWVkcyB0byBiZSBnZW5lcmF0ZWRcbiAgICAgICAgICogbnVtYmVyIGJhc2Vkb24gc29tZSBzZW1hbnRpY3MgYXBwLnBhZ2UuY29tcG9uZW50IGlmIHRoZXJlIGFyZSBtb3JlIGNvbXBvbmVudCBvbiB0aGUgcGFnZVxuICAgICAgICAgKiB0aGVuIGFwcC5wYWdlLmNvbXBvbmVudE51bWJlci4gU2ltcGxlIHNvbHV0aW9uIGlzIHRvIGlzIHRvIGdldCBFbGVtZW50cmVmIGFuZCBxdWVyeSBpdC5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMubmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHV1aWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuaWQpKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdXVpZCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZG9SZWdpc3RlciAobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogRm9ybUNvbnRyb2xcbiAgICB7XG5cbiAgICAgICAgbGV0IGZDb250cm9sOiBGb3JtQ29udHJvbDtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmZvcm1Hcm91cC5jb250cm9sc1tuYW1lXSkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChuYW1lLCBuZXcgRm9ybUNvbnRyb2wodmFsdWUpKTtcbiAgICAgICAgICAgIGZDb250cm9sID0gPEZvcm1Db250cm9sPiB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1tuYW1lXTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZkNvbnRyb2wgPSA8Rm9ybUNvbnRyb2w+IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW25hbWVdO1xuICAgICAgICAgICAgbGV0IHVwZGF0ZWRWYWx1ZTogYW55ID0gaXNQcmVzZW50KGZDb250cm9sLnZhbHVlKSA/IGZDb250cm9sLnZhbHVlIDogdmFsdWU7XG4gICAgICAgICAgICBmQ29udHJvbC5wYXRjaFZhbHVlKHVwZGF0ZWRWYWx1ZSwge29ubHlTZWxmOiB0cnVlLCBlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZDb250cm9sO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSBhcmUgZGVhbGluZyB3aXRoIEZvcm1zIHRoaXMgaXMgYSBoZWxwZXIgbWV0aG9kIHRvIHJlZ2lzdGVyIGNvbnRyb2xcbiAgICAgKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIGRlZmF1bHQgdmFsdWUgdG8gYmUgcHJlLXNldFxuICAgICAqL1xuICAgIHJlZ2lzdGVyRm9ybUNvbnRyb2wgKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sID0gdGhpcy5kb1JlZ2lzdGVyKHRoaXMubmFtZSwgdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgQElucHV0KCkgZ2V0IGZvcm1Hcm91cCAoKTogRm9ybUdyb3VwXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2Zvcm1Hcm91cCkgPyB0aGlzLl9mb3JtR3JvdXAgOiB0aGlzLmVudi5jdXJyZW50Rm9ybTtcbiAgICB9XG5cbiAgICBzZXQgZm9ybUdyb3VwICh2YWx1ZTogRm9ybUdyb3VwKVxuICAgIHtcbiAgICAgICAgdGhpcy5fZm9ybUdyb3VwID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGlmIHdlIGNhbiBwYXNzIGZpZWxkIHR5cGUgYXMgYSBiaW5kaW5nIHRvIHRoZSBjb21wb25lbnRzLiBlLmcuIElucHV0RmllbGQgbmVlZFxuICAgICAqIHN1Y2ggdHlwZSB0byBjb3JyZWN0bHkgcmVuZGVyIGlucHV0IHR5cGU9dGV4dCwgbnVtYmVyXG4gICAgICpcbiAgICAgKiB0b2RvOiBpcyB0aGlzIG5lZWRlZD8gY2FuIHdlIG1heWJlIHBhc3MgdGhpcyB0byB0aGUgZm9ybVJvdz9cbiAgICAgKi9cbiAgICBjYW5TZXRUeXBlICgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICB3cml0ZVZhbHVlICh2YWx1ZTogYW55KVxuICAgIHtcblxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UgKGZuOiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQgKGZuOiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxufVxuXG5cbiJdfQ==