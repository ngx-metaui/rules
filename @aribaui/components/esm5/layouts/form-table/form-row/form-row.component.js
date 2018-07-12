/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, forwardRef, HostBinding, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { Validators } from '@angular/forms';
import { Environment, isBlank, isPresent, ListWrapper, StringWrapper } from '@aribaui/core';
import { FormTableComponent } from '../form-table.component';
import { BaseFormComponent, WidgetSizeColumns } from '../../../core/base-form.component';
/**
 * Used by FormTable to layout fields into Rows. Each FormTable row is reasonable for not only to
 * include actual component such is DropDown or InputField but mainly provides a enough context for
 * the component to specify the size, how it should layout, whether we need to show required flag,
 * to show/hide labels in case if we have no label layout and much more.
 *
 * FormRow component also registers angular validator for the current row/field. As already
 * mentioned We treat our widgets with minimal responsibility as possible to present and retrive
 * information to/from user and let somebody else to figure out where it appear and how.
 *
 * todo: Move under FormTable
 */
var FormRowComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormRowComponent, _super);
    function FormRowComponent(env, 
    // Event this creates CI depends. Need to have a reference to parent
    // I need to refactor more parent to not use this child and refactor layouting
    parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         * Hides the label
         *
         */
        _this.noLabelLayout = false;
        /**
         * Renders row with highlighted background
         *
         */
        _this.highlightRow = false;
        /**
         *
         *  Field label that should appear above or next to the control
         *
         */
        _this.label = '';
        /**
         *
         * For single column layout without zones we need to apply grid directly to the FormRow tag
         * so we don't need to introduce extra div level
         *
         */
        _this.classList = '';
        _this._size = 'ui-g-12 ui-md-' + WidgetSizeColumns.medium;
        return _this;
    }
    /**
     * Right now we just initialize this once and use the values we do not expect now to react to
     * changes
     */
    /**
     * Right now we just initialize this once and use the values we do not expect now to react to
     * changes
     * @return {?}
     */
    FormRowComponent.prototype.ngOnInit = /**
     * Right now we just initialize this once and use the values we do not expect now to react to
     * changes
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        _super.prototype.registerFormControl.call(this, null);
        this.registerValidators();
        this.omitPadding = this.parentContainer.omitPadding;
        this.classList += isPresent(this.parentContainer) ? ' ui-g-12 ' : '';
        this.classList = this.highlightRow ? this.classList + ' highlight-row ' : this.classList;
        this.classList = this.omitPadding ? this.classList + ' ui-g-nopad ' : this.classList;
    };
    Object.defineProperty(FormRowComponent.prototype, "size", {
        /**
         * Just a size getter
         *
         */
        get: /**
         * Just a size getter
         *
         * @return {?}
         */
        function () {
            return this._size;
        },
        /**
         *  A size setter we translate custom sizes into actual bootstrap grid system. We use medium
         * right now. but we should extend this for other screen sizes
         *
         *  todo: provide mapping and add other grid classes for other sizes xs, sm, lg, xl
         *
         *  Also check if this is dynamic size that should vary based on the how many number of columns
         * we have. e.g. Date widgets is by default small, but in 2, 3 columns layout this small is too
         * small.
         */
        set: /**
         *  A size setter we translate custom sizes into actual bootstrap grid system. We use medium
         * right now. but we should extend this for other screen sizes
         *
         *  todo: provide mapping and add other grid classes for other sizes xs, sm, lg, xl
         *
         *  Also check if this is dynamic size that should vary based on the how many number of columns
         * we have. e.g. Date widgets is by default small, but in 2, 3 columns layout this small is too
         * small.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ isDynVal = false;
            if (StringWrapper.startsWidth(value, 'd-')) {
                isDynVal = true;
                value = value.substr(2, value.length - 1);
            }
            if (isPresent(value)) {
                this._size = value;
                var /** @type {?} */ dSize = this.dynSize(value, isDynVal);
                this._size = 'ui-g-12 ui-md-' + dSize;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormRowComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngDoCheck.call(this);
        if (isPresent(this.parentContainer) && this.editable !== this.parentContainer.editable) {
            this.editable = this.parentContainer.editable;
        }
    };
    /**
     * Push out of box angular validator as well as custom one to current FormControl
     * @return {?}
     */
    FormRowComponent.prototype.registerValidators = /**
     * Push out of box angular validator as well as custom one to current FormControl
     * @return {?}
     */
    function () {
        var /** @type {?} */ validators = [];
        if (isPresent(this.maxLength)) {
            validators.push(Validators.maxLength(this.maxLength));
        }
        if (isPresent(this.minLength)) {
            validators.push(Validators.minLength(this.minLength));
        }
        if (isPresent(this.required) && this.required) {
            validators.push(Validators.required);
        }
        if (isPresent(this.pattern)) {
            validators.push(Validators.pattern(this.pattern));
        }
        if (isPresent(this.customValidators)) {
            ListWrapper.addAll(validators, this.customValidators);
        }
        if (validators.length === 1) {
            this.formControl.setValidators(validators[0]);
        }
        else if (validators.length > 1) {
            this.formControl.setValidators(Validators.compose(validators));
        }
        if (isPresent(this.customAsyncValidators) && this.customAsyncValidators.length === 1) {
            this.formControl.setAsyncValidators(this.customAsyncValidators[0]);
        }
        else if (isPresent(this.customAsyncValidators) && this.customAsyncValidators.length > 1) {
            this.formControl.setAsyncValidators(Validators.composeAsync(this.customAsyncValidators));
        }
    };
    Object.defineProperty(FormRowComponent.prototype, "labelsOnTop", {
        /**
         *
         * Do we have labels on TOP, try to read this from Parent
         *
         */
        get: /**
         *
         * Do we have labels on TOP, try to read this from Parent
         *
         * @return {?}
         */
        function () {
            if (isBlank(this._labelsOnTop) && isPresent(this.parentContainer)) {
                return (/** @type {?} */ (this.parentContainer)).isLabelsOnTop();
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * Can refactor all into 1 line but its hard to debug so this is just for read
     *
     * @param {?} value
     * @param {?} isDynValue
     * @return {?}
     */
    FormRowComponent.prototype.dynSize = /**
     *
     * Can refactor all into 1 line but its hard to debug so this is just for read
     *
     * @param {?} value
     * @param {?} isDynValue
     * @return {?}
     */
    function (value, isDynValue) {
        var /** @type {?} */ normalizeSize = value.toLowerCase().replace('-', '');
        if (isPresent(this.parentContainer) &&
            (/** @type {?} */ (this.parentContainer)).hasTwoColumn && isDynValue) {
            var /** @type {?} */ enumValues = Object.keys(WidgetSizeColumns);
            normalizeSize = enumValues[enumValues.indexOf(normalizeSize) + 1];
        }
        return (/** @type {?} */ (WidgetSizeColumns))[normalizeSize];
    };
    FormRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-form-row',
                    template: "<div *ngIf=\"!hidden\"\n     class=\"w-form-row ui-g\"\n     [class.highlight-row]=\"highlightRow\"\n     [class.required]=\"required\"\n     [class.label-on-top]=\"labelsOnTop\"\n     [class.label-on-side]=\"!labelsOnTop\"\n     [class.has-danger]=\"!formControl.valid && !formControl.pristine \"\n     [ngClass]=\"styleClass\">\n\n    <div class=\"control-label ui-g-12 ui-g-nopad\"\n         *ngIf=\"!noLabelLayout\"\n         [class.ui-md-3]=\"!labelsOnTop\">\n        <label [class.sr-only]=\"noLabelLayout\">{{label}}</label>\n    </div>\n\n    <div class=\"control-value ui-g-nopad\" [ngClass]=\"size\"\n         [class.read-only]=\"!editable\">\n        <ng-content></ng-content>\n        <a-error-messages [control]=\"formControl\"></a-error-messages>\n    </div>\n</div>\n",
                    styles: [".required label:after{content:\"*\";color:red}/deep/ .highlight-row{background-color:#f7f8fa}.w-form-row.highlight-row{background-color:#f7f8fa}.w-form-row.label-on-top{padding-bottom:13px}.w-form-row.label-on-top .control-label,.w-form-row.label-on-top .control-value{padding-top:0;padding-bottom:0}.w-form-row.label-on-top .control-label{padding-bottom:12px}.w-form-row.label-on-side .control-label,.w-form-row.label-on-side .control-value{padding-top:0;padding-bottom:0}.w-form-row.label-on-side .control-label ::ng-deep .w-string-field,.w-form-row.label-on-side .control-value ::ng-deep .w-string-field{line-height:36px}.w-form-row.label-on-side .control-label ::ng-deep .sap-icon,.w-form-row.label-on-side .control-value ::ng-deep .sap-icon{line-height:26px}.w-form-row.label-on-side .control-label label,.w-form-row.label-on-side .control-value label{line-height:36px}.w-form-row.label-on-side .control-label .fa,.w-form-row.label-on-side .control-value .fa{line-height:18px}.control-label{color:#636363}.u-validation-error{border-color:red}"],
                    providers: [
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return FormRowComponent; }) }
                    ]
                },] },
    ];
    /** @nocollapse */
    FormRowComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: FormTableComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return FormTableComponent; }),] }] }
    ]; };
    FormRowComponent.propDecorators = {
        noLabelLayout: [{ type: Input }],
        highlightRow: [{ type: Input }],
        label: [{ type: Input }],
        maxLength: [{ type: Input }],
        minLength: [{ type: Input }],
        pattern: [{ type: Input }],
        customAsyncValidators: [{ type: Input }],
        customValidators: [{ type: Input }],
        classList: [{ type: HostBinding, args: ['class',] }],
        size: [{ type: Input }]
    };
    return FormRowComponent;
}(BaseFormComponent));
export { FormRowComponent };
function FormRowComponent_tsickle_Closure_declarations() {
    /**
     * Hides the label
     *
     * @type {?}
     */
    FormRowComponent.prototype.noLabelLayout;
    /**
     * Renders row with highlighted background
     *
     * @type {?}
     */
    FormRowComponent.prototype.highlightRow;
    /**
     *
     *  Field label that should appear above or next to the control
     *
     * @type {?}
     */
    FormRowComponent.prototype.label;
    /**
     *  For inputs type fields provides default angular validators, maximal length of the field
     * @type {?}
     */
    FormRowComponent.prototype.maxLength;
    /**
     *  For inputs type fields provides default angular validators, minimal length of the field
     * @type {?}
     */
    FormRowComponent.prototype.minLength;
    /**
     *  For inputs type fields provides default angular formatters. How the input fields should be
     * formatted
     * @type {?}
     */
    FormRowComponent.prototype.pattern;
    /**
     * Defines custom async validators which will be attached to the Control
     * @type {?}
     */
    FormRowComponent.prototype.customAsyncValidators;
    /**
     * Defines custom  validators which will be attached to the Control
     * @type {?}
     */
    FormRowComponent.prototype.customValidators;
    /**
     * What is the current size of the field. Current we support 4 different sizes: x-small, small,
     * medium, large, x-large
     * @type {?}
     */
    FormRowComponent.prototype._size;
    /**
     *
     * For single column layout without zones we need to apply grid directly to the FormRow tag
     * so we don't need to introduce extra div level
     *
     * @type {?}
     */
    FormRowComponent.prototype.classList;
    /** @type {?} */
    FormRowComponent.prototype._labelsOnTop;
    /** @type {?} */
    FormRowComponent.prototype.env;
    /** @type {?} */
    FormRowComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQWdDLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7Ozs7OztJQTJDakQsNENBQWlCO0lBMEVuRCwwQkFBbUIsR0FBZ0I7OztJQUliLGVBQW1DO1FBSnpELFlBS0ksa0JBQU0sR0FBRyxFQUFFLGVBQWUsQ0FBQyxTQUc5QjtRQVJrQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBSWIscUJBQWUsR0FBZixlQUFlLENBQW9COzs7Ozs4QkF2RWhDLEtBQUs7Ozs7OzZCQU9OLEtBQUs7Ozs7OztzQkFRYixFQUFFOzs7Ozs7OzBCQStDd0IsRUFBRTtRQVl4QyxLQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQzs7S0FDNUQ7SUFHRDs7O09BR0c7Ozs7OztJQUNILG1DQUFROzs7OztJQUFSO1FBQ0ksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsaUJBQU0sbUJBQW1CLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFF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RUFBQztxQkFDaEY7aUJBQ0o7Ozs7Z0JBNUNPLFdBQVc7Z0JBQ1gsa0JBQWtCLHVCQXlIVCxRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDOzs7Z0NBdkUvRSxLQUFLOytCQU9MLEtBQUs7d0JBUUwsS0FBSzs0QkFNTCxLQUFLOzRCQU1MLEtBQUs7MEJBUUwsS0FBSzt3Q0FPTCxLQUFLO21DQU1MLEtBQUs7NEJBZUwsV0FBVyxTQUFDLE9BQU87dUJBdURuQixLQUFLOzsyQkEvTFY7RUFtRXNDLGlCQUFpQjtTQUExQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QXN5bmNWYWxpZGF0b3JGbiwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudCwgTGlzdFdyYXBwZXIsIFN0cmluZ1dyYXBwZXJ9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtGb3JtVGFibGVDb21wb25lbnR9IGZyb20gJy4uL2Zvcm0tdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnQsIFdpZGdldFNpemVDb2x1bW5zfSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuXG4vKipcbiAqIFVzZWQgYnkgRm9ybVRhYmxlIHRvIGxheW91dCBmaWVsZHMgaW50byBSb3dzLiBFYWNoIEZvcm1UYWJsZSByb3cgaXMgcmVhc29uYWJsZSBmb3Igbm90IG9ubHkgdG9cbiAqIGluY2x1ZGUgYWN0dWFsIGNvbXBvbmVudCBzdWNoIGlzIERyb3BEb3duIG9yIElucHV0RmllbGQgYnV0IG1haW5seSBwcm92aWRlcyBhIGVub3VnaCBjb250ZXh0IGZvclxuICogdGhlIGNvbXBvbmVudCB0byBzcGVjaWZ5IHRoZSBzaXplLCBob3cgaXQgc2hvdWxkIGxheW91dCwgd2hldGhlciB3ZSBuZWVkIHRvIHNob3cgcmVxdWlyZWQgZmxhZyxcbiAqIHRvIHNob3cvaGlkZSBsYWJlbHMgaW4gY2FzZSBpZiB3ZSBoYXZlIG5vIGxhYmVsIGxheW91dCBhbmQgbXVjaCBtb3JlLlxuICpcbiAqIEZvcm1Sb3cgY29tcG9uZW50IGFsc28gcmVnaXN0ZXJzIGFuZ3VsYXIgdmFsaWRhdG9yIGZvciB0aGUgY3VycmVudCByb3cvZmllbGQuIEFzIGFscmVhZHlcbiAqIG1lbnRpb25lZCBXZSB0cmVhdCBvdXIgd2lkZ2V0cyB3aXRoIG1pbmltYWwgcmVzcG9uc2liaWxpdHkgYXMgcG9zc2libGUgdG8gcHJlc2VudCBhbmQgcmV0cml2ZVxuICogaW5mb3JtYXRpb24gdG8vZnJvbSB1c2VyIGFuZCBsZXQgc29tZWJvZHkgZWxzZSB0byBmaWd1cmUgb3V0IHdoZXJlIGl0IGFwcGVhciBhbmQgaG93LlxuICpcbiAqIHRvZG86IE1vdmUgdW5kZXIgRm9ybVRhYmxlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZm9ybS1yb3cnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIiFoaWRkZW5cIlxuICAgICBjbGFzcz1cInctZm9ybS1yb3cgdWktZ1wiXG4gICAgIFtjbGFzcy5oaWdobGlnaHQtcm93XT1cImhpZ2hsaWdodFJvd1wiXG4gICAgIFtjbGFzcy5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgIFtjbGFzcy5sYWJlbC1vbi10b3BdPVwibGFiZWxzT25Ub3BcIlxuICAgICBbY2xhc3MubGFiZWwtb24tc2lkZV09XCIhbGFiZWxzT25Ub3BcIlxuICAgICBbY2xhc3MuaGFzLWRhbmdlcl09XCIhZm9ybUNvbnRyb2wudmFsaWQgJiYgIWZvcm1Db250cm9sLnByaXN0aW5lIFwiXG4gICAgIFtuZ0NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLWxhYmVsIHVpLWctMTIgdWktZy1ub3BhZFwiXG4gICAgICAgICAqbmdJZj1cIiFub0xhYmVsTGF5b3V0XCJcbiAgICAgICAgIFtjbGFzcy51aS1tZC0zXT1cIiFsYWJlbHNPblRvcFwiPlxuICAgICAgICA8bGFiZWwgW2NsYXNzLnNyLW9ubHldPVwibm9MYWJlbExheW91dFwiPnt7bGFiZWx9fTwvbGFiZWw+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC12YWx1ZSB1aS1nLW5vcGFkXCIgW25nQ2xhc3NdPVwic2l6ZVwiXG4gICAgICAgICBbY2xhc3MucmVhZC1vbmx5XT1cIiFlZGl0YWJsZVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxhLWVycm9yLW1lc3NhZ2VzIFtjb250cm9sXT1cImZvcm1Db250cm9sXCI+PC9hLWVycm9yLW1lc3NhZ2VzPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2AucmVxdWlyZWQgbGFiZWw6YWZ0ZXJ7Y29udGVudDpcIipcIjtjb2xvcjpyZWR9L2RlZXAvIC5oaWdobGlnaHQtcm93e2JhY2tncm91bmQtY29sb3I6I2Y3ZjhmYX0udy1mb3JtLXJvdy5oaWdobGlnaHQtcm93e2JhY2tncm91bmQtY29sb3I6I2Y3ZjhmYX0udy1mb3JtLXJvdy5sYWJlbC1vbi10b3B7cGFkZGluZy1ib3R0b206MTNweH0udy1mb3JtLXJvdy5sYWJlbC1vbi10b3AgLmNvbnRyb2wtbGFiZWwsLnctZm9ybS1yb3cubGFiZWwtb24tdG9wIC5jb250cm9sLXZhbHVle3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0udy1mb3JtLXJvdy5sYWJlbC1vbi10b3AgLmNvbnRyb2wtbGFiZWx7cGFkZGluZy1ib3R0b206MTJweH0udy1mb3JtLXJvdy5sYWJlbC1vbi1zaWRlIC5jb250cm9sLWxhYmVsLC53LWZvcm0tcm93LmxhYmVsLW9uLXNpZGUgLmNvbnRyb2wtdmFsdWV7cGFkZGluZy10b3A6MDtwYWRkaW5nLWJvdHRvbTowfS53LWZvcm0tcm93LmxhYmVsLW9uLXNpZGUgLmNvbnRyb2wtbGFiZWwgOjpuZy1kZWVwIC53LXN0cmluZy1maWVsZCwudy1mb3JtLXJvdy5sYWJlbC1vbi1zaWRlIC5jb250cm9sLXZhbHVlIDo6bmctZGVlcCAudy1zdHJpbmctZmllbGR7bGluZS1oZWlnaHQ6MzZweH0udy1mb3JtLXJvdy5sYWJlbC1vbi1zaWRlIC5jb250cm9sLWxhYmVsIDo6bmctZGVlcCAuc2FwLWljb24sLnctZm9ybS1yb3cubGFiZWwtb24tc2lkZSAuY29udHJvbC12YWx1ZSA6Om5nLWRlZXAgLnNhcC1pY29ue2xpbmUtaGVpZ2h0OjI2cHh9LnctZm9ybS1yb3cubGFiZWwtb24tc2lkZSAuY29udHJvbC1sYWJlbCBsYWJlbCwudy1mb3JtLXJvdy5sYWJlbC1vbi1zaWRlIC5jb250cm9sLXZhbHVlIGxhYmVse2xpbmUtaGVpZ2h0OjM2cHh9LnctZm9ybS1yb3cubGFiZWwtb24tc2lkZSAuY29udHJvbC1sYWJlbCAuZmEsLnctZm9ybS1yb3cubGFiZWwtb24tc2lkZSAuY29udHJvbC12YWx1ZSAuZmF7bGluZS1oZWlnaHQ6MThweH0uY29udHJvbC1sYWJlbHtjb2xvcjojNjM2MzYzfS51LXZhbGlkYXRpb24tZXJyb3J7Ym9yZGVyLWNvbG9yOnJlZH1gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1Sb3dDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgbGFiZWxcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm9MYWJlbExheW91dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyByb3cgd2l0aCBoaWdobGlnaHRlZCBiYWNrZ3JvdW5kXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhpZ2hsaWdodFJvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgRmllbGQgbGFiZWwgdGhhdCBzaG91bGQgYXBwZWFyIGFib3ZlIG9yIG5leHQgdG8gdGhlIGNvbnRyb2xcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogIEZvciBpbnB1dHMgdHlwZSBmaWVsZHMgcHJvdmlkZXMgZGVmYXVsdCBhbmd1bGFyIHZhbGlkYXRvcnMsIG1heGltYWwgbGVuZ3RoIG9mIHRoZSBmaWVsZFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiAgRm9yIGlucHV0cyB0eXBlIGZpZWxkcyBwcm92aWRlcyBkZWZhdWx0IGFuZ3VsYXIgdmFsaWRhdG9ycywgbWluaW1hbCBsZW5ndGggb2YgdGhlIGZpZWxkXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcblxuXG4gICAgLyoqXG4gICAgICogIEZvciBpbnB1dHMgdHlwZSBmaWVsZHMgcHJvdmlkZXMgZGVmYXVsdCBhbmd1bGFyIGZvcm1hdHRlcnMuIEhvdyB0aGUgaW5wdXQgZmllbGRzIHNob3VsZCBiZVxuICAgICAqIGZvcm1hdHRlZFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGF0dGVybjogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGN1c3RvbSBhc3luYyB2YWxpZGF0b3JzIHdoaWNoIHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIENvbnRyb2xcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGN1c3RvbUFzeW5jVmFsaWRhdG9yczogQXN5bmNWYWxpZGF0b3JGbltdO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBjdXN0b20gIHZhbGlkYXRvcnMgd2hpY2ggd2lsbCBiZSBhdHRhY2hlZCB0byB0aGUgQ29udHJvbFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY3VzdG9tVmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXTtcblxuICAgIC8qKlxuICAgICAqIFdoYXQgaXMgdGhlIGN1cnJlbnQgc2l6ZSBvZiB0aGUgZmllbGQuIEN1cnJlbnQgd2Ugc3VwcG9ydCA0IGRpZmZlcmVudCBzaXplczogeC1zbWFsbCwgc21hbGwsXG4gICAgICogbWVkaXVtLCBsYXJnZSwgeC1sYXJnZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3NpemU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRm9yIHNpbmdsZSBjb2x1bW4gbGF5b3V0IHdpdGhvdXQgem9uZXMgd2UgbmVlZCB0byBhcHBseSBncmlkIGRpcmVjdGx5IHRvIHRoZSBGb3JtUm93IHRhZ1xuICAgICAqIHNvIHdlIGRvbid0IG5lZWQgdG8gaW50cm9kdWNlIGV4dHJhIGRpdiBsZXZlbFxuICAgICAqXG4gICAgICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzTGlzdDogc3RyaW5nID0gJyc7XG5cblxuICAgIHByaXZhdGUgX2xhYmVsc09uVG9wOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgLy8gRXZlbnQgdGhpcyBjcmVhdGVzIENJIGRlcGVuZHMuIE5lZWQgdG8gaGF2ZSBhIHJlZmVyZW5jZSB0byBwYXJlbnRcbiAgICAgICAgICAgICAgICAvLyBJIG5lZWQgdG8gcmVmYWN0b3IgbW9yZSBwYXJlbnQgdG8gbm90IHVzZSB0aGlzIGNoaWxkIGFuZCByZWZhY3RvciBsYXlvdXRpbmdcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVRhYmxlQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBGb3JtVGFibGVDb21wb25lbnQpIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMuX3NpemUgPSAndWktZy0xMiB1aS1tZC0nICsgV2lkZ2V0U2l6ZUNvbHVtbnMubWVkaXVtO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmlnaHQgbm93IHdlIGp1c3QgaW5pdGlhbGl6ZSB0aGlzIG9uY2UgYW5kIHVzZSB0aGUgdmFsdWVzIHdlIGRvIG5vdCBleHBlY3Qgbm93IHRvIHJlYWN0IHRvXG4gICAgICogY2hhbmdlc1xuICAgICAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKG51bGwpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJWYWxpZGF0b3JzKCk7XG5cbiAgICAgICAgdGhpcy5vbWl0UGFkZGluZyA9IHRoaXMucGFyZW50Q29udGFpbmVyLm9taXRQYWRkaW5nO1xuICAgICAgICB0aGlzLmNsYXNzTGlzdCArPSBpc1ByZXNlbnQodGhpcy5wYXJlbnRDb250YWluZXIpID8gJyB1aS1nLTEyICcgOiAnJztcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSB0aGlzLmhpZ2hsaWdodFJvdyA/IHRoaXMuY2xhc3NMaXN0ICsgJyBoaWdobGlnaHQtcm93ICcgOiB0aGlzLmNsYXNzTGlzdDtcblxuICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IHRoaXMub21pdFBhZGRpbmcgPyB0aGlzLmNsYXNzTGlzdCArICcgdWktZy1ub3BhZCAnIDogdGhpcy5jbGFzc0xpc3Q7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBKdXN0IGEgc2l6ZSBnZXR0ZXJcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCBzaXplKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBBIHNpemUgc2V0dGVyIHdlIHRyYW5zbGF0ZSBjdXN0b20gc2l6ZXMgaW50byBhY3R1YWwgYm9vdHN0cmFwIGdyaWQgc3lzdGVtLiBXZSB1c2UgbWVkaXVtXG4gICAgICogcmlnaHQgbm93LiBidXQgd2Ugc2hvdWxkIGV4dGVuZCB0aGlzIGZvciBvdGhlciBzY3JlZW4gc2l6ZXNcbiAgICAgKlxuICAgICAqICB0b2RvOiBwcm92aWRlIG1hcHBpbmcgYW5kIGFkZCBvdGhlciBncmlkIGNsYXNzZXMgZm9yIG90aGVyIHNpemVzIHhzLCBzbSwgbGcsIHhsXG4gICAgICpcbiAgICAgKiAgQWxzbyBjaGVjayBpZiB0aGlzIGlzIGR5bmFtaWMgc2l6ZSB0aGF0IHNob3VsZCB2YXJ5IGJhc2VkIG9uIHRoZSBob3cgbWFueSBudW1iZXIgb2YgY29sdW1uc1xuICAgICAqIHdlIGhhdmUuIGUuZy4gRGF0ZSB3aWRnZXRzIGlzIGJ5IGRlZmF1bHQgc21hbGwsIGJ1dCBpbiAyLCAzIGNvbHVtbnMgbGF5b3V0IHRoaXMgc21hbGwgaXMgdG9vXG4gICAgICogc21hbGwuXG4gICAgICovXG5cblxuXG4gICAgQElucHV0KClcbiAgICBzZXQgc2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG5cbiAgICAgICAgbGV0IGlzRHluVmFsID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuc3RhcnRzV2lkdGgodmFsdWUsICdkLScpKSB7XG4gICAgICAgICAgICBpc0R5blZhbCA9IHRydWU7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigyLCB2YWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgICAgICAgICBsZXQgZFNpemUgPSB0aGlzLmR5blNpemUodmFsdWUsIGlzRHluVmFsKTtcbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSAndWktZy0xMiB1aS1tZC0nICsgZFNpemU7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdEb0NoZWNrKCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnBhcmVudENvbnRhaW5lcikgJiYgdGhpcy5lZGl0YWJsZSAhPT0gdGhpcy5wYXJlbnRDb250YWluZXIuZWRpdGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdGFibGUgPSB0aGlzLnBhcmVudENvbnRhaW5lci5lZGl0YWJsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1c2ggb3V0IG9mIGJveCBhbmd1bGFyIHZhbGlkYXRvciBhcyB3ZWxsIGFzIGN1c3RvbSBvbmUgdG8gY3VycmVudCBGb3JtQ29udHJvbFxuICAgICAqL1xuICAgIHByaXZhdGUgcmVnaXN0ZXJWYWxpZGF0b3JzKCkge1xuICAgICAgICBsZXQgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSA9IFtdO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5tYXhMZW5ndGgpKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXhMZW5ndGgodGhpcy5tYXhMZW5ndGgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5taW5MZW5ndGgpKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgodGhpcy5taW5MZW5ndGgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5yZXF1aXJlZCkgJiYgdGhpcy5yZXF1aXJlZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnBhdHRlcm4pKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5wYXR0ZXJuKHRoaXMucGF0dGVybikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5jdXN0b21WYWxpZGF0b3JzKSkge1xuICAgICAgICAgICAgTGlzdFdyYXBwZXIuYWRkQWxsKHZhbGlkYXRvcnMsIHRoaXMuY3VzdG9tVmFsaWRhdG9ycyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsaWRhdG9ycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzWzBdKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0b3JzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsaWRhdG9ycyhWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRhdG9ycykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmN1c3RvbUFzeW5jVmFsaWRhdG9ycykgJiYgdGhpcy5jdXN0b21Bc3luY1ZhbGlkYXRvcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldEFzeW5jVmFsaWRhdG9ycyh0aGlzLmN1c3RvbUFzeW5jVmFsaWRhdG9yc1swXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMuY3VzdG9tQXN5bmNWYWxpZGF0b3JzKSAmJiB0aGlzLmN1c3RvbUFzeW5jVmFsaWRhdG9ycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldEFzeW5jVmFsaWRhdG9ycyhcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyh0aGlzLmN1c3RvbUFzeW5jVmFsaWRhdG9ycykpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERvIHdlIGhhdmUgbGFiZWxzIG9uIFRPUCwgdHJ5IHRvIHJlYWQgdGhpcyBmcm9tIFBhcmVudFxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IGxhYmVsc09uVG9wKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9sYWJlbHNPblRvcCkgJiYgaXNQcmVzZW50KHRoaXMucGFyZW50Q29udGFpbmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICg8Rm9ybVRhYmxlQ29tcG9uZW50PnRoaXMucGFyZW50Q29udGFpbmVyKS5pc0xhYmVsc09uVG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDYW4gcmVmYWN0b3IgYWxsIGludG8gMSBsaW5lIGJ1dCBpdHMgaGFyZCB0byBkZWJ1ZyBzbyB0aGlzIGlzIGp1c3QgZm9yIHJlYWRcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgZHluU2l6ZSh2YWx1ZTogc3RyaW5nLCBpc0R5blZhbHVlOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG5vcm1hbGl6ZVNpemUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJy0nLCAnJyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnBhcmVudENvbnRhaW5lcikgJiZcbiAgICAgICAgICAgICg8Rm9ybVRhYmxlQ29tcG9uZW50PnRoaXMucGFyZW50Q29udGFpbmVyKS5oYXNUd29Db2x1bW4gJiYgaXNEeW5WYWx1ZSkge1xuXG4gICAgICAgICAgICBsZXQgZW51bVZhbHVlczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhXaWRnZXRTaXplQ29sdW1ucyk7XG4gICAgICAgICAgICBub3JtYWxpemVTaXplID0gZW51bVZhbHVlc1tlbnVtVmFsdWVzLmluZGV4T2Yobm9ybWFsaXplU2l6ZSkgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKDxhbnk+V2lkZ2V0U2l6ZUNvbHVtbnMpW25vcm1hbGl6ZVNpemVdO1xuXG4gICAgfVxufVxuIl19