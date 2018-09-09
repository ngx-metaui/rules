/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class FormRowComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, 
    // Event this creates CI depends. Need to have a reference to parent
    // I need to refactor more parent to not use this child and refactor layouting
    parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Hides the label
         *
         */
        this.noLabelLayout = false;
        /**
         * Renders row with highlighted background
         *
         */
        this.highlightRow = false;
        /**
         *
         *  Field label that should appear above or next to the control
         *
         */
        this.label = '';
        /**
         * Tells the form row that we are rendering another nested form in this row. so we need
         * to go 100%
         */
        this.isNestedLayout = false;
        /**
         *
         * For single column layout without zones we need to apply grid directly to the FormRow tag
         * so we don't need to introduce extra div level
         *
         */
        this.classList = '';
        this._size = 'ui-g-12 ui-md-' + WidgetSizeColumns.medium;
    }
    /**
     * Right now we just initialize this once and use the values we do not expect now to react to
     * changes
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(null);
        this.registerValidators();
        this.omitPadding = this.parentContainer.omitPadding;
        this.classList += isPresent(this.parentContainer) ? ' ui-g-12 ' : '';
        this.classList = this.highlightRow ? this.classList + ' highlight-row ' : this.classList;
        this.classList = this.omitPadding ? this.classList + ' ui-g-nopad ' : this.classList;
    }
    /**
     * Just a size getter
     *
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
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
    set size(value) {
        /** @type {?} */
        let isDynVal = false;
        if (StringWrapper.startsWidth(value, 'd-')) {
            isDynVal = true;
            value = value.substr(2, value.length - 1);
        }
        if (isPresent(value) && !this.isNestedLayout) {
            this._size = value;
            /** @type {?} */
            let dSize = this.dynSize(value, isDynVal);
            this._size = 'ui-g-12 ui-md-' + dSize;
        }
        else if (this.isNestedLayout) {
            this._size = 'ui-g-12 ui-md-12';
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        super.ngDoCheck();
        if (isPresent(this.parentContainer) && this.editable !== this.parentContainer.editable) {
            this.editable = this.parentContainer.editable;
        }
    }
    /**
     * Push out of box angular validator as well as custom one to current FormControl
     * @return {?}
     */
    registerValidators() {
        /** @type {?} */
        let validators = [];
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
    }
    /**
     *
     * Do we have labels on TOP, try to read this from Parent
     *
     * @return {?}
     */
    get labelsOnTop() {
        if (isBlank(this._labelsOnTop) && isPresent(this.parentContainer)) {
            return (/** @type {?} */ (this.parentContainer)).isLabelsOnTop();
        }
        return false;
    }
    /**
     *
     * Can refactor all into 1 line but its hard to debug so this is just for read
     *
     * @param {?} value
     * @param {?} isDynValue
     * @return {?}
     */
    dynSize(value, isDynValue) {
        /** @type {?} */
        let normalizeSize = value.toLowerCase().replace('-', '');
        if (isPresent(this.parentContainer) &&
            (/** @type {?} */ (this.parentContainer)).hasTwoColumn && isDynValue) {
            /** @type {?} */
            let enumValues = Object.keys(WidgetSizeColumns);
            normalizeSize = enumValues[enumValues.indexOf(normalizeSize) + 1];
        }
        return (/** @type {?} */ (WidgetSizeColumns))[normalizeSize];
    }
}
FormRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-form-row',
                template: "<div *ngIf=\"!hidden\"\n     class=\"w-form-row ui-g\"\n     [class.highlight-row]=\"highlightRow\"\n     [class.required]=\"required\"\n     [class.label-on-top]=\"labelsOnTop\"\n     [class.label-on-side]=\"!labelsOnTop\"\n     [class.has-danger]=\"!formControl.valid && !formControl.pristine \"\n     [ngClass]=\"styleClass\">\n\n    <div class=\"control-label ui-g-12 ui-g-nopad\"\n         *ngIf=\"!noLabelLayout\"\n         [class.ui-md-3]=\"!labelsOnTop\">\n        <label [class.sr-only]=\"noLabelLayout\">{{label}}</label>\n    </div>\n\n    <div class=\"control-value ui-g-nopad\" [ngClass]=\"size\"\n         [class.read-only]=\"!editable\">\n        <ng-content></ng-content>\n        <a-error-messages [control]=\"formControl\"></a-error-messages>\n    </div>\n</div>\n",
                providers: [
                    { provide: BaseFormComponent, useExisting: forwardRef(() => FormRowComponent) }
                ],
                styles: [".required label:after{content:\"*\";color:red}/deep/ .highlight-row{background-color:#f7f8fa}.w-form-row.highlight-row{background-color:#f7f8fa}.w-form-row.label-on-top{padding-bottom:13px}.w-form-row.label-on-top .control-label,.w-form-row.label-on-top .control-value{padding-top:0;padding-bottom:0}.w-form-row.label-on-top .control-label{padding-bottom:12px}.w-form-row.label-on-side .control-label,.w-form-row.label-on-side .control-value{padding-top:0;padding-bottom:0}.w-form-row.label-on-side .control-label ::ng-deep .w-string-field,.w-form-row.label-on-side .control-value ::ng-deep .w-string-field{line-height:36px}.w-form-row.label-on-side .control-label ::ng-deep .sap-icon,.w-form-row.label-on-side .control-value ::ng-deep .sap-icon{line-height:26px}.w-form-row.label-on-side .control-label label,.w-form-row.label-on-side .control-value label{line-height:36px}.w-form-row.label-on-side .control-label .fa,.w-form-row.label-on-side .control-value .fa{line-height:18px}.w-form-row .w-form-row{padding-top:.5em;padding-bottom:.5em}.control-label{color:#636363}.u-validation-error{border-color:red}"]
            }] }
];
/** @nocollapse */
FormRowComponent.ctorParameters = () => [
    { type: Environment },
    { type: FormTableComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormTableComponent),] }] }
];
FormRowComponent.propDecorators = {
    noLabelLayout: [{ type: Input }],
    highlightRow: [{ type: Input }],
    label: [{ type: Input }],
    maxLength: [{ type: Input }],
    minLength: [{ type: Input }],
    pattern: [{ type: Input }],
    customAsyncValidators: [{ type: Input }],
    customValidators: [{ type: Input }],
    isNestedLayout: [{ type: Input }],
    classList: [{ type: HostBinding, args: ['class',] }],
    size: [{ type: Input }]
};
if (false) {
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
     * Tells the form row that we are rendering another nested form in this row. so we need
     * to go 100%
     * @type {?}
     */
    FormRowComponent.prototype.isNestedLayout;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBZ0MsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFzQnZGLE1BQU0sdUJBQXdCLFNBQVEsaUJBQWlCOzs7OztJQWtGbkQsWUFBbUIsR0FBZ0I7OztJQUliLGVBQW1DO1FBRXJELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFOYixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBSWIsb0JBQWUsR0FBZixlQUFlLENBQW9COzs7Ozs2QkE5RWhDLEtBQUs7Ozs7OzRCQU9OLEtBQUs7Ozs7OztxQkFRYixFQUFFOzs7Ozs4QkF3Q1EsS0FBSzs7Ozs7Ozt5QkFjVyxFQUFFO1FBYXhDLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO0tBQzVEOzs7Ozs7SUFPRCxRQUFRO1FBRUosS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJ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Q0FBQyxFQUFDO2lCQUNoRjs7YUFDSjs7OztZQXZCTyxXQUFXO1lBQ1gsa0JBQWtCLHVCQTRHVCxRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Ozs0QkE5RS9FLEtBQUs7MkJBT0wsS0FBSztvQkFRTCxLQUFLO3dCQU1MLEtBQUs7d0JBTUwsS0FBSztzQkFRTCxLQUFLO29DQU9MLEtBQUs7K0JBTUwsS0FBSzs2QkFPTCxLQUFLO3dCQWVMLFdBQVcsU0FBQyxPQUFPO21CQTBEbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBc3luY1ZhbGlkYXRvckZuLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50LCBMaXN0V3JhcHBlciwgU3RyaW5nV3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Zvcm1UYWJsZUNvbXBvbmVudH0gZnJvbSAnLi4vZm9ybS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudCwgV2lkZ2V0U2l6ZUNvbHVtbnN9IGZyb20gJy4uLy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5cbi8qKlxuICogVXNlZCBieSBGb3JtVGFibGUgdG8gbGF5b3V0IGZpZWxkcyBpbnRvIFJvd3MuIEVhY2ggRm9ybVRhYmxlIHJvdyBpcyByZWFzb25hYmxlIGZvciBub3Qgb25seSB0b1xuICogaW5jbHVkZSBhY3R1YWwgY29tcG9uZW50IHN1Y2ggaXMgRHJvcERvd24gb3IgSW5wdXRGaWVsZCBidXQgbWFpbmx5IHByb3ZpZGVzIGEgZW5vdWdoIGNvbnRleHQgZm9yXG4gKiB0aGUgY29tcG9uZW50IHRvIHNwZWNpZnkgdGhlIHNpemUsIGhvdyBpdCBzaG91bGQgbGF5b3V0LCB3aGV0aGVyIHdlIG5lZWQgdG8gc2hvdyByZXF1aXJlZCBmbGFnLFxuICogdG8gc2hvdy9oaWRlIGxhYmVscyBpbiBjYXNlIGlmIHdlIGhhdmUgbm8gbGFiZWwgbGF5b3V0IGFuZCBtdWNoIG1vcmUuXG4gKlxuICogRm9ybVJvdyBjb21wb25lbnQgYWxzbyByZWdpc3RlcnMgYW5ndWxhciB2YWxpZGF0b3IgZm9yIHRoZSBjdXJyZW50IHJvdy9maWVsZC4gQXMgYWxyZWFkeVxuICogbWVudGlvbmVkIFdlIHRyZWF0IG91ciB3aWRnZXRzIHdpdGggbWluaW1hbCByZXNwb25zaWJpbGl0eSBhcyBwb3NzaWJsZSB0byBwcmVzZW50IGFuZCByZXRyaXZlXG4gKiBpbmZvcm1hdGlvbiB0by9mcm9tIHVzZXIgYW5kIGxldCBzb21lYm9keSBlbHNlIHRvIGZpZ3VyZSBvdXQgd2hlcmUgaXQgYXBwZWFyIGFuZCBob3cuXG4gKlxuICogdG9kbzogTW92ZSB1bmRlciBGb3JtVGFibGVcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1mb3JtLXJvdycsXG4gICAgdGVtcGxhdGVVcmw6ICdmb3JtLXJvdy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2Zvcm0tcm93LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCl9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtUm93Q29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBsYWJlbFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBub0xhYmVsTGF5b3V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHJvdyB3aXRoIGhpZ2hsaWdodGVkIGJhY2tncm91bmRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGlnaGxpZ2h0Um93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqICBGaWVsZCBsYWJlbCB0aGF0IHNob3VsZCBhcHBlYXIgYWJvdmUgb3IgbmV4dCB0byB0aGUgY29udHJvbFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiAgRm9yIGlucHV0cyB0eXBlIGZpZWxkcyBwcm92aWRlcyBkZWZhdWx0IGFuZ3VsYXIgdmFsaWRhdG9ycywgbWF4aW1hbCBsZW5ndGggb2YgdGhlIGZpZWxkXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqICBGb3IgaW5wdXRzIHR5cGUgZmllbGRzIHByb3ZpZGVzIGRlZmF1bHQgYW5ndWxhciB2YWxpZGF0b3JzLCBtaW5pbWFsIGxlbmd0aCBvZiB0aGUgZmllbGRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1pbkxlbmd0aDogbnVtYmVyO1xuXG5cbiAgICAvKipcbiAgICAgKiAgRm9yIGlucHV0cyB0eXBlIGZpZWxkcyBwcm92aWRlcyBkZWZhdWx0IGFuZ3VsYXIgZm9ybWF0dGVycy4gSG93IHRoZSBpbnB1dCBmaWVsZHMgc2hvdWxkIGJlXG4gICAgICogZm9ybWF0dGVkXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwYXR0ZXJuOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgY3VzdG9tIGFzeW5jIHZhbGlkYXRvcnMgd2hpY2ggd2lsbCBiZSBhdHRhY2hlZCB0byB0aGUgQ29udHJvbFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY3VzdG9tQXN5bmNWYWxpZGF0b3JzOiBBc3luY1ZhbGlkYXRvckZuW107XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGN1c3RvbSAgdmFsaWRhdG9ycyB3aGljaCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBDb250cm9sXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjdXN0b21WYWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdO1xuXG4gICAgLyoqXG4gICAgICogVGVsbHMgdGhlIGZvcm0gcm93IHRoYXQgd2UgYXJlIHJlbmRlcmluZyBhbm90aGVyIG5lc3RlZCBmb3JtIGluIHRoaXMgcm93LiBzbyB3ZSBuZWVkXG4gICAgICogdG8gZ28gMTAwJVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNOZXN0ZWRMYXlvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFdoYXQgaXMgdGhlIGN1cnJlbnQgc2l6ZSBvZiB0aGUgZmllbGQuIEN1cnJlbnQgd2Ugc3VwcG9ydCA0IGRpZmZlcmVudCBzaXplczogeC1zbWFsbCwgc21hbGwsXG4gICAgICogbWVkaXVtLCBsYXJnZSwgeC1sYXJnZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3NpemU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRm9yIHNpbmdsZSBjb2x1bW4gbGF5b3V0IHdpdGhvdXQgem9uZXMgd2UgbmVlZCB0byBhcHBseSBncmlkIGRpcmVjdGx5IHRvIHRoZSBGb3JtUm93IHRhZ1xuICAgICAqIHNvIHdlIGRvbid0IG5lZWQgdG8gaW50cm9kdWNlIGV4dHJhIGRpdiBsZXZlbFxuICAgICAqXG4gICAgICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzTGlzdDogc3RyaW5nID0gJyc7XG5cblxuICAgIHByaXZhdGUgX2xhYmVsc09uVG9wOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgLy8gRXZlbnQgdGhpcyBjcmVhdGVzIENJIGRlcGVuZHMuIE5lZWQgdG8gaGF2ZSBhIHJlZmVyZW5jZSB0byBwYXJlbnRcbiAgICAgICAgICAgICAgICAvLyBJIG5lZWQgdG8gcmVmYWN0b3IgbW9yZSBwYXJlbnQgdG8gbm90IHVzZSB0aGlzIGNoaWxkIGFuZCByZWZhY3RvciBsYXlvdXRpbmdcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVRhYmxlQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBGb3JtVGFibGVDb21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy5fc2l6ZSA9ICd1aS1nLTEyIHVpLW1kLScgKyBXaWRnZXRTaXplQ29sdW1ucy5tZWRpdW07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSaWdodCBub3cgd2UganVzdCBpbml0aWFsaXplIHRoaXMgb25jZSBhbmQgdXNlIHRoZSB2YWx1ZXMgd2UgZG8gbm90IGV4cGVjdCBub3cgdG8gcmVhY3QgdG9cbiAgICAgKiBjaGFuZ2VzXG4gICAgICovXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbChudWxsKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyVmFsaWRhdG9ycygpO1xuXG4gICAgICAgIHRoaXMub21pdFBhZGRpbmcgPSB0aGlzLnBhcmVudENvbnRhaW5lci5vbWl0UGFkZGluZztcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QgKz0gaXNQcmVzZW50KHRoaXMucGFyZW50Q29udGFpbmVyKSA/ICcgdWktZy0xMiAnIDogJyc7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0ID0gdGhpcy5oaWdobGlnaHRSb3cgPyB0aGlzLmNsYXNzTGlzdCArICcgaGlnaGxpZ2h0LXJvdyAnIDogdGhpcy5jbGFzc0xpc3Q7XG5cbiAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSB0aGlzLm9taXRQYWRkaW5nID8gdGhpcy5jbGFzc0xpc3QgKyAnIHVpLWctbm9wYWQgJyA6IHRoaXMuY2xhc3NMaXN0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSnVzdCBhIHNpemUgZ2V0dGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgc2l6ZSgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBBIHNpemUgc2V0dGVyIHdlIHRyYW5zbGF0ZSBjdXN0b20gc2l6ZXMgaW50byBhY3R1YWwgYm9vdHN0cmFwIGdyaWQgc3lzdGVtLiBXZSB1c2UgbWVkaXVtXG4gICAgICogcmlnaHQgbm93LiBidXQgd2Ugc2hvdWxkIGV4dGVuZCB0aGlzIGZvciBvdGhlciBzY3JlZW4gc2l6ZXNcbiAgICAgKlxuICAgICAqICB0b2RvOiBwcm92aWRlIG1hcHBpbmcgYW5kIGFkZCBvdGhlciBncmlkIGNsYXNzZXMgZm9yIG90aGVyIHNpemVzIHhzLCBzbSwgbGcsIHhsXG4gICAgICpcbiAgICAgKiAgQWxzbyBjaGVjayBpZiB0aGlzIGlzIGR5bmFtaWMgc2l6ZSB0aGF0IHNob3VsZCB2YXJ5IGJhc2VkIG9uIHRoZSBob3cgbWFueSBudW1iZXIgb2YgY29sdW1uc1xuICAgICAqIHdlIGhhdmUuIGUuZy4gRGF0ZSB3aWRnZXRzIGlzIGJ5IGRlZmF1bHQgc21hbGwsIGJ1dCBpbiAyLCAzIGNvbHVtbnMgbGF5b3V0IHRoaXMgc21hbGwgaXMgdG9vXG4gICAgICogc21hbGwuXG4gICAgICovXG5cblxuXG4gICAgQElucHV0KClcbiAgICBzZXQgc2l6ZSh2YWx1ZTogc3RyaW5nKVxuICAgIHtcblxuICAgICAgICBsZXQgaXNEeW5WYWwgPSBmYWxzZTtcblxuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5zdGFydHNXaWR0aCh2YWx1ZSwgJ2QtJykpIHtcbiAgICAgICAgICAgIGlzRHluVmFsID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKDIsIHZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkgJiYgIXRoaXMuaXNOZXN0ZWRMYXlvdXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBkU2l6ZSA9IHRoaXMuZHluU2l6ZSh2YWx1ZSwgaXNEeW5WYWwpO1xuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9ICd1aS1nLTEyIHVpLW1kLScgKyBkU2l6ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTmVzdGVkTGF5b3V0KSB7XG4gICAgICAgICAgICB0aGlzLl9zaXplID0gJ3VpLWctMTIgdWktbWQtMTInO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ0RvQ2hlY2soKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdEb0NoZWNrKCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnBhcmVudENvbnRhaW5lcikgJiYgdGhpcy5lZGl0YWJsZSAhPT0gdGhpcy5wYXJlbnRDb250YWluZXIuZWRpdGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdGFibGUgPSB0aGlzLnBhcmVudENvbnRhaW5lci5lZGl0YWJsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1c2ggb3V0IG9mIGJveCBhbmd1bGFyIHZhbGlkYXRvciBhcyB3ZWxsIGFzIGN1c3RvbSBvbmUgdG8gY3VycmVudCBGb3JtQ29udHJvbFxuICAgICAqL1xuICAgIHByaXZhdGUgcmVnaXN0ZXJWYWxpZGF0b3JzKClcbiAgICB7XG4gICAgICAgIGxldCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdID0gW107XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm1heExlbmd0aCkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aCh0aGlzLm1heExlbmd0aCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm1pbkxlbmd0aCkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbkxlbmd0aCh0aGlzLm1pbkxlbmd0aCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnJlcXVpcmVkKSAmJiB0aGlzLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnBhdHRlcm4odGhpcy5wYXR0ZXJuKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmN1c3RvbVZhbGlkYXRvcnMpKSB7XG4gICAgICAgICAgICBMaXN0V3JhcHBlci5hZGRBbGwodmFsaWRhdG9ycywgdGhpcy5jdXN0b21WYWxpZGF0b3JzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWxpZGF0b3JzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWxpZGF0b3JzKHZhbGlkYXRvcnNbMF0pO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRvcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWxpZGF0b3JzKFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZGF0b3JzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuY3VzdG9tQXN5bmNWYWxpZGF0b3JzKSAmJiB0aGlzLmN1c3RvbUFzeW5jVmFsaWRhdG9ycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0QXN5bmNWYWxpZGF0b3JzKHRoaXMuY3VzdG9tQXN5bmNWYWxpZGF0b3JzWzBdKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5jdXN0b21Bc3luY1ZhbGlkYXRvcnMpICYmIHRoaXMuY3VzdG9tQXN5bmNWYWxpZGF0b3JzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0QXN5bmNWYWxpZGF0b3JzKFxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKHRoaXMuY3VzdG9tQXN5bmNWYWxpZGF0b3JzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRG8gd2UgaGF2ZSBsYWJlbHMgb24gVE9QLCB0cnkgdG8gcmVhZCB0aGlzIGZyb20gUGFyZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgbGFiZWxzT25Ub3AoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fbGFiZWxzT25Ub3ApICYmIGlzUHJlc2VudCh0aGlzLnBhcmVudENvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIHJldHVybiAoPEZvcm1UYWJsZUNvbXBvbmVudD50aGlzLnBhcmVudENvbnRhaW5lcikuaXNMYWJlbHNPblRvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2FuIHJlZmFjdG9yIGFsbCBpbnRvIDEgbGluZSBidXQgaXRzIGhhcmQgdG8gZGVidWcgc28gdGhpcyBpcyBqdXN0IGZvciByZWFkXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGR5blNpemUodmFsdWU6IHN0cmluZywgaXNEeW5WYWx1ZTogYm9vbGVhbik6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IG5vcm1hbGl6ZVNpemUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJy0nLCAnJyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnBhcmVudENvbnRhaW5lcikgJiZcbiAgICAgICAgICAgICg8Rm9ybVRhYmxlQ29tcG9uZW50PnRoaXMucGFyZW50Q29udGFpbmVyKS5oYXNUd29Db2x1bW4gJiYgaXNEeW5WYWx1ZSlcbiAgICAgICAge1xuXG4gICAgICAgICAgICBsZXQgZW51bVZhbHVlczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhXaWRnZXRTaXplQ29sdW1ucyk7XG4gICAgICAgICAgICBub3JtYWxpemVTaXplID0gZW51bVZhbHVlc1tlbnVtVmFsdWVzLmluZGV4T2Yobm9ybWFsaXplU2l6ZSkgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKDxhbnk+V2lkZ2V0U2l6ZUNvbHVtbnMpW25vcm1hbGl6ZVNpemVdO1xuXG4gICAgfVxufVxuIl19