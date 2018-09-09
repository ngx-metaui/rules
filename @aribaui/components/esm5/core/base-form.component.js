/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Environment, isBlank, isPresent, noop, uuid } from '@aribaui/core';
import { forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../core/base.component';
/** @typedef {?} */
var WidgetSize;
export { WidgetSize };
/** @enum {number} */
var WidgetSizeColumns = {
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
var BaseFormComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BaseFormComponent, _super);
    /**
     * Some of the BaseFormComponent can wrap other component and in these cases we want to
     * inherit some of the behavior from parent
     *
     * @Inject(Environment) public env: Environment : is tem a workaround as without inject
     * on this specific component it complains that Environment is unresolved symbol
     *
     */
    function BaseFormComponent(env, parentContainer) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         *
         * Is current element visible
         */
        _this.hidden = false;
        /**
         * Renders required flex around the component
         *
         */
        _this.required = false;
        /**
         *  a text displayed when value is empty or NULL
         */
        _this.placeHolder = '';
        /**
         * Identify if this control is used directly or if its part of some other control
         * e.g. GenericChooser and managed by this control.
         * Meaning State is mananged outside of this component
         *
         */
        _this.isStandalone = true;
        _this.onModelChanged = noop;
        _this.onModelTouched = noop;
        return _this;
    }
    /**
     * @return {?}
     */
    BaseFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (isPresent(this.parentContainer)) {
            this.formGroup = this.parentContainer.formGroup;
            this.editable = this.parentContainer.editable;
        }
        this.checkInitForm();
    };
    /**
     * Make sure that we have available formGroup and Name and ID
     *
     */
    /**
     * Make sure that we have available formGroup and Name and ID
     *
     * @return {?}
     */
    BaseFormComponent.prototype.checkInitForm = /**
     * Make sure that we have available formGroup and Name and ID
     *
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    BaseFormComponent.prototype.doRegister = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        /** @type {?} */
        var fControl;
        if (isBlank(this.formGroup.controls[name])) {
            this.formGroup.registerControl(name, new FormControl(value));
            fControl = /** @type {?} */ (this.formGroup.controls[name]);
        }
        else {
            fControl = /** @type {?} */ (this.formGroup.controls[name]);
            /** @type {?} */
            var updatedValue = isPresent(fControl.value) ? fControl.value : value;
            fControl.patchValue(updatedValue, { onlySelf: true, emitEvent: false });
        }
        return fControl;
    };
    /**
     * When we are dealing with Forms this is a helper method to register control
     *
     *
     * @param value default value to be pre-set
     */
    /**
     * When we are dealing with Forms this is a helper method to register control
     *
     *
     * @param {?} value default value to be pre-set
     * @return {?}
     */
    BaseFormComponent.prototype.registerFormControl = /**
     * When we are dealing with Forms this is a helper method to register control
     *
     *
     * @param {?} value default value to be pre-set
     * @return {?}
     */
    function (value) {
        this.formControl = this.doRegister(this.name, value);
        if (this.disabled) {
            this.formControl.disable();
        }
    };
    Object.defineProperty(BaseFormComponent.prototype, "formGroup", {
        get: /**
         * @return {?}
         */
        function () {
            return isPresent(this._formGroup) ? this._formGroup : this.env.currentForm;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._formGroup = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Indicates if we can pass field type as a binding to the components. e.g. InputField need
     * such type to correctly render input type=text, number
     *
     * todo: is this needed? can we maybe pass this to the formRow?
     */
    /**
     * Indicates if we can pass field type as a binding to the components. e.g. InputField need
     * such type to correctly render input type=text, number
     *
     * todo: is this needed? can we maybe pass this to the formRow?
     * @return {?}
     */
    BaseFormComponent.prototype.canSetType = /**
     * Indicates if we can pass field type as a binding to the components. e.g. InputField need
     * such type to correctly render input type=text, number
     *
     * todo: is this needed? can we maybe pass this to the formRow?
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseFormComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    BaseFormComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChanged = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    BaseFormComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelTouched = fn;
    };
    /*
         *  Supported layout constants. It is expected there will be more options as we currently
         *  support only these two there will be other variations of it. e.g. for stacked it will not
         *  be 1 columns like it is now but multiple columns
         *
         */
    BaseFormComponent.LayoutStacked = 'stacked';
    BaseFormComponent.LayoutInline = 'inline';
    /** @nocollapse */
    BaseFormComponent.ctorParameters = function () { return [
        { type: Environment, decorators: [{ type: Inject, args: [Environment,] }] },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return BaseFormComponent; }),] }] }
    ]; };
    BaseFormComponent.propDecorators = {
        name: [{ type: Input }],
        id: [{ type: Input }],
        hidden: [{ type: Input }],
        required: [{ type: Input }],
        placeHolder: [{ type: Input }],
        isStandalone: [{ type: Input }],
        formGroup: [{ type: Input }]
    };
    return BaseFormComponent;
}(BaseComponent));
export { BaseFormComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBaUIsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBdUIsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0lBY2pELFNBQVU7SUFDVixRQUFTO0lBQ1QsU0FBVTtJQUNWLFFBQVM7SUFDVCxVQUFXOzs7b0NBSlgsTUFBTTtvQ0FDTixLQUFLO29DQUNMLE1BQU07b0NBQ04sS0FBSztvQ0FDTCxNQUFNOzs7Ozs7O0lBUXNDLDZDQUFhO0lBc0Z6RDs7Ozs7OztPQU9HO0lBQ0gsMkJBQXlDLEdBQWdCLEVBRWxDLGVBQWtDO1FBRnpELFlBSUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFMd0MsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUVsQyxxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7O3VCQWpFdkMsS0FBSzs7Ozs7eUJBZUgsS0FBSzs7Ozs0QkFPSCxFQUFFOzs7Ozs7OzZCQVNBLElBQUk7K0JBb0JpQixJQUFJOytCQUNKLElBQUk7O0tBZ0JoRDs7OztJQUdELG9DQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUks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QWtCLEVBQU87UUFFckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7S0FDNUI7Ozs7O0lBRUQsNkNBQWlCOzs7O0lBQWpCLFVBQW1CLEVBQU87UUFFdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7S0FDNUI7Ozs7Ozs7c0NBMU0rQixTQUFTO3FDQUNWLFFBQVE7OztnQkF0Q25DLFdBQVcsdUJBMkhELE1BQU0sU0FBQyxXQUFXO2dCQUVRLGlCQUFpQix1QkFEM0MsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQzs7O3VCQWhGL0UsS0FBSztxQkFPTCxLQUFLO3lCQVFMLEtBQUs7MkJBZUwsS0FBSzs4QkFPTCxLQUFLOytCQVNMLEtBQUs7NEJBa0hMLEtBQUs7OzRCQWhPVjtFQWlEZ0QsYUFBYTtTQUF2QyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudCwgbm9vcCwgdXVpZH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge2ZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBQaXBlVHJhbnNmb3JtLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqIHgtc21hbGwgPSA+IDEyJSAgPSA+IGNvbC0xXG4gKiBzbWFsbCA9ID4gYFxuICogbWVkaXVtID0gPiA1MCUgICA9ID4gY29sLTZcbiAqIGxhcmdlID0gPiA3NSUgICAgPSA+IGNvbC05XG4gKiBsYXJnZSA9ID4gMTAwJSAgID0gPiBjb2wtMTJcbiAqXG4gKi9cbmV4cG9ydCB0eXBlIFdpZGdldFNpemUgPSAneC1zbWFsbCcgfCAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnIHwgJ3gtbGFyZ2UnO1xuXG5leHBvcnQgZW51bSBXaWRnZXRTaXplQ29sdW1uc1xue1xuICAgIHhzbWFsbCA9IDEsXG4gICAgc21hbGwgPSAzLFxuICAgIG1lZGl1bSA9IDYsXG4gICAgbGFyZ2UgPSA5LFxuICAgIHhsYXJnZSA9IDEyXG59XG5cblxuLyoqXG4gKiAgQmFzZUZvcm1Db21wb25uZXQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGZvciBhZGQgc3BlY2lmaWMgZm9ybSBiZWhhdmlvclxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VGb3JtQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG57XG4gICAgLypcbiAgICAgKiAgU3VwcG9ydGVkIGxheW91dCBjb25zdGFudHMuIEl0IGlzIGV4cGVjdGVkIHRoZXJlIHdpbGwgYmUgbW9yZSBvcHRpb25zIGFzIHdlIGN1cnJlbnRseVxuICAgICAqICBzdXBwb3J0IG9ubHkgdGhlc2UgdHdvIHRoZXJlIHdpbGwgYmUgb3RoZXIgdmFyaWF0aW9ucyBvZiBpdC4gZS5nLiBmb3Igc3RhY2tlZCBpdCB3aWxsIG5vdFxuICAgICAqICBiZSAxIGNvbHVtbnMgbGlrZSBpdCBpcyBub3cgYnV0IG11bHRpcGxlIGNvbHVtbnNcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBMYXlvdXRTdGFja2VkID0gJ3N0YWNrZWQnO1xuICAgIHN0YXRpYyByZWFkb25seSBMYXlvdXRJbmxpbmUgPSAnaW5saW5lJztcblxuXG4gICAgLyoqXG4gICAgICogQ29tcG9uZW50IG5hbWUgYXR0cmlidXRlLiBDYW4gYmUgdXNlZCB0byBsb29rdXAgY29tcG9uZW50IGluIGZvcm0uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBuYW1lOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIENvbXBvbmVudCBJZC4gQ2FuIGJlIHVzZWQgdG8gbG9va3VwIGNvbXBvbmVudCBpbiBmb3JtLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaWQ6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJcyBjdXJyZW50IGVsZW1lbnQgdmlzaWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGlkZGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBZb3UgY2FuIHBhc3MgaW4gZm9ybUdyb3VwIHdoaWNoIHdpbGwgYmUgdXNlZCB3aXRoIGluIHRoZSBmb3JtXG4gICAgICpcbiAgICAgKiBASW5wdXQoKSAtIHNlZSBnZXR0ZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIF9mb3JtR3JvdXA6IEZvcm1Hcm91cDtcblxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyByZXF1aXJlZCBmbGV4IGFyb3VuZCB0aGUgY29tcG9uZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqICBhIHRleHQgZGlzcGxheWVkIHdoZW4gdmFsdWUgaXMgZW1wdHkgb3IgTlVMTFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2VIb2xkZXI6IFN0cmluZyA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZnkgaWYgdGhpcyBjb250cm9sIGlzIHVzZWQgZGlyZWN0bHkgb3IgaWYgaXRzIHBhcnQgb2Ygc29tZSBvdGhlciBjb250cm9sXG4gICAgICogZS5nLiBHZW5lcmljQ2hvb3NlciBhbmQgbWFuYWdlZCBieSB0aGlzIGNvbnRyb2wuXG4gICAgICogTWVhbmluZyBTdGF0ZSBpcyBtYW5hbmdlZCBvdXRzaWRlIG9mIHRoaXMgY29tcG9uZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGlzU3RhbmRhbG9uZTogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIEZvcm0gQ29udHJvbCBmb3IgdGhlIGNvbXBvbmVudC4gSXRzIGVpdGhlciBpbmhlcml0ZWQgc2luY2UgaXQgd2FzIHByZWNyZWF0ZWQgaW4gcGFyZW50XG4gICAgICogY29tcG9uZW50IG9yIGl0cyBjcmVhdGVkIGJhc2VkIG9uIHBhc3NlZCAnbmFtZScgYW5kIHJlZ2lzdGVyZWQgd2l0aCB0aGUgJ2Zvcm1Hcm91cCdcbiAgICAgKlxuICAgICAqIFdoZW4gIGluaXRpYWxpemUgRm9ybUNvbnRyb2wgd2UgZG8gc2V0VmFsdWUgd2l0aCBvbmx5U2VsZjp0cnVlIGZsYWcgYW5kIHdlIGRvIG5vdCBlbWl0IGFueVxuICAgICAqIGV2ZW50IG91dHNpZGVcbiAgICAgKlxuICAgICAqL1xuICAgIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcblxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0dGVyIHRoYXQgY2FuIGJlIGFzc2lnbiB0byB0aGUgY29tcG9uZW50IGluIG9yZGVyIHRvIGZvcm1hdCBpdHMgaW5wdXRcbiAgICAgKi9cbiAgICBmb3JtYXR0ZXI6IFBpcGVUcmFuc2Zvcm07XG5cblxuICAgIHByb3RlY3RlZCBvbk1vZGVsQ2hhbmdlZDogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG4gICAgcHJvdGVjdGVkIG9uTW9kZWxUb3VjaGVkOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuXG4gICAgLyoqXG4gICAgICogU29tZSBvZiB0aGUgQmFzZUZvcm1Db21wb25lbnQgY2FuIHdyYXAgb3RoZXIgY29tcG9uZW50IGFuZCBpbiB0aGVzZSBjYXNlcyB3ZSB3YW50IHRvXG4gICAgICogaW5oZXJpdCBzb21lIG9mIHRoZSBiZWhhdmlvciBmcm9tIHBhcmVudFxuICAgICAqXG4gICAgICogQEluamVjdChFbnZpcm9ubWVudCkgcHVibGljIGVudjogRW52aXJvbm1lbnQgOiBpcyB0ZW0gYSB3b3JrYXJvdW5kIGFzIHdpdGhvdXQgaW5qZWN0XG4gICAgICogb24gdGhpcyBzcGVjaWZpYyBjb21wb25lbnQgaXQgY29tcGxhaW5zIHRoYXQgRW52aXJvbm1lbnQgaXMgdW5yZXNvbHZlZCBzeW1ib2xcbiAgICAgKlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChASW5qZWN0KEVudmlyb25tZW50KSBwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEJhc2VGb3JtQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQgKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnBhcmVudENvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwID0gdGhpcy5wYXJlbnRDb250YWluZXIuZm9ybUdyb3VwO1xuICAgICAgICAgICAgdGhpcy5lZGl0YWJsZSA9IHRoaXMucGFyZW50Q29udGFpbmVyLmVkaXRhYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGVja0luaXRGb3JtKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHN1cmUgdGhhdCB3ZSBoYXZlIGF2YWlsYWJsZSBmb3JtR3JvdXAgYW5kIE5hbWUgYW5kIElEXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY2hlY2tJbml0Rm9ybSAoKVxuICAgIHtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmVudi5jdXJyZW50Rm9ybSkpIHtcbiAgICAgICAgICAgIHRoaXMuZW52LmN1cnJlbnRGb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVG9kbzogUmlnaHQgbm93IEkganVzdCBuZWVkIHRvIGluaXRpYWxpemUgbmFtZSAsIGJ1dCBpZGVhbGx5IGl0IG5lZWRzIHRvIGJlIGdlbmVyYXRlZFxuICAgICAgICAgKiBudW1iZXIgYmFzZWRvbiBzb21lIHNlbWFudGljcyBhcHAucGFnZS5jb21wb25lbnQgaWYgdGhlcmUgYXJlIG1vcmUgY29tcG9uZW50IG9uIHRoZSBwYWdlXG4gICAgICAgICAqIHRoZW4gYXBwLnBhZ2UuY29tcG9uZW50TnVtYmVyLiBTaW1wbGUgc29sdXRpb24gaXMgdG8gaXMgdG8gZ2V0IEVsZW1lbnRyZWYgYW5kIHF1ZXJ5IGl0LlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5uYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdXVpZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5pZCkpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSB1dWlkKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBkb1JlZ2lzdGVyIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBGb3JtQ29udHJvbFxuICAgIHtcblxuICAgICAgICBsZXQgZkNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW25hbWVdKSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5hbWUsIG5ldyBGb3JtQ29udHJvbCh2YWx1ZSkpO1xuICAgICAgICAgICAgZkNvbnRyb2wgPSA8Rm9ybUNvbnRyb2w+IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW25hbWVdO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmQ29udHJvbCA9IDxGb3JtQ29udHJvbD4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHNbbmFtZV07XG4gICAgICAgICAgICBsZXQgdXBkYXRlZFZhbHVlOiBhbnkgPSBpc1ByZXNlbnQoZkNvbnRyb2wudmFsdWUpID8gZkNvbnRyb2wudmFsdWUgOiB2YWx1ZTtcbiAgICAgICAgICAgIGZDb250cm9sLnBhdGNoVmFsdWUodXBkYXRlZFZhbHVlLCB7b25seVNlbGY6IHRydWUsIGVtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZkNvbnRyb2w7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGFyZSBkZWFsaW5nIHdpdGggRm9ybXMgdGhpcyBpcyBhIGhlbHBlciBtZXRob2QgdG8gcmVnaXN0ZXIgY29udHJvbFxuICAgICAqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgZGVmYXVsdCB2YWx1ZSB0byBiZSBwcmUtc2V0XG4gICAgICovXG4gICAgcmVnaXN0ZXJGb3JtQ29udHJvbCAodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSB0aGlzLmRvUmVnaXN0ZXIodGhpcy5uYW1lLCB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBASW5wdXQoKSBnZXQgZm9ybUdyb3VwICgpOiBGb3JtR3JvdXBcbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5fZm9ybUdyb3VwKSA/IHRoaXMuX2Zvcm1Hcm91cCA6IHRoaXMuZW52LmN1cnJlbnRGb3JtO1xuICAgIH1cblxuICAgIHNldCBmb3JtR3JvdXAgKHZhbHVlOiBGb3JtR3JvdXApXG4gICAge1xuICAgICAgICB0aGlzLl9mb3JtR3JvdXAgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgaWYgd2UgY2FuIHBhc3MgZmllbGQgdHlwZSBhcyBhIGJpbmRpbmcgdG8gdGhlIGNvbXBvbmVudHMuIGUuZy4gSW5wdXRGaWVsZCBuZWVkXG4gICAgICogc3VjaCB0eXBlIHRvIGNvcnJlY3RseSByZW5kZXIgaW5wdXQgdHlwZT10ZXh0LCBudW1iZXJcbiAgICAgKlxuICAgICAqIHRvZG86IGlzIHRoaXMgbmVlZGVkPyBjYW4gd2UgbWF5YmUgcGFzcyB0aGlzIHRvIHRoZSBmb3JtUm93P1xuICAgICAqL1xuICAgIGNhblNldFR5cGUgKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIHdyaXRlVmFsdWUgKHZhbHVlOiBhbnkpXG4gICAge1xuXG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZSAoZm46IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZCAoZm46IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG59XG5cblxuIl19