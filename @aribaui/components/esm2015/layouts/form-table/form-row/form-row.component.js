/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        let /** @type {?} */ isDynVal = false;
        if (StringWrapper.startsWidth(value, 'd-')) {
            isDynVal = true;
            value = value.substr(2, value.length - 1);
        }
        if (isPresent(value)) {
            this._size = value;
            let /** @type {?} */ dSize = this.dynSize(value, isDynVal);
            this._size = 'ui-g-12 ui-md-' + dSize;
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
        let /** @type {?} */ validators = [];
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
        let /** @type {?} */ normalizeSize = value.toLowerCase().replace('-', '');
        if (isPresent(this.parentContainer) &&
            (/** @type {?} */ (this.parentContainer)).hasTwoColumn && isDynValue) {
            let /** @type {?} */ enumValues = Object.keys(WidgetSizeColumns);
            normalizeSize = enumValues[enumValues.indexOf(normalizeSize) + 1];
        }
        return (/** @type {?} */ (WidgetSizeColumns))[normalizeSize];
    }
}
FormRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-form-row',
                template: `<div *ngIf="!hidden"
     class="w-form-row ui-g"
     [class.highlight-row]="highlightRow"
     [class.required]="required"
     [class.label-on-top]="labelsOnTop"
     [class.label-on-side]="!labelsOnTop"
     [class.has-danger]="!formControl.valid && !formControl.pristine "
     [ngClass]="styleClass">

    <div class="control-label ui-g-12 ui-g-nopad"
         *ngIf="!noLabelLayout"
         [class.ui-md-3]="!labelsOnTop">
        <label [class.sr-only]="noLabelLayout">{{label}}</label>
    </div>

    <div class="control-value ui-g-nopad" [ngClass]="size"
         [class.read-only]="!editable">
        <ng-content></ng-content>
        <a-error-messages [control]="formControl"></a-error-messages>
    </div>
</div>
`,
                styles: [`.required label:after{content:"*";color:red}/deep/ .highlight-row{background-color:#f7f8fa}.w-form-row.highlight-row{background-color:#f7f8fa}.w-form-row.label-on-top{padding-bottom:13px}.w-form-row.label-on-top .control-label,.w-form-row.label-on-top .control-value{padding-top:0;padding-bottom:0}.w-form-row.label-on-top .control-label{padding-bottom:12px}.w-form-row.label-on-side .control-label,.w-form-row.label-on-side .control-value{padding-top:0;padding-bottom:0}.w-form-row.label-on-side .control-label ::ng-deep .w-string-field,.w-form-row.label-on-side .control-value ::ng-deep .w-string-field{line-height:36px}.w-form-row.label-on-side .control-label ::ng-deep .sap-icon,.w-form-row.label-on-side .control-value ::ng-deep .sap-icon{line-height:26px}.w-form-row.label-on-side .control-label label,.w-form-row.label-on-side .control-value label{line-height:36px}.w-form-row.label-on-side .control-label .fa,.w-form-row.label-on-side .control-value .fa{line-height:18px}.control-label{color:#636363}.u-validation-error{border-color:red}`],
                providers: [
                    { provide: BaseFormComponent, useExisting: forwardRef(() => FormRowComponent) }
                ]
            },] },
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
    classList: [{ type: HostBinding, args: ['class',] }],
    size: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBZ0MsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7Ozs7Ozs7QUEyQ3ZGLE1BQU0sdUJBQXdCLFNBQVEsaUJBQWlCOzs7OztJQTBFbkQsWUFBbUIsR0FBZ0I7OztJQUliLGVBQW1DO1FBQ3JELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFMYixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBSWIsb0JBQWUsR0FBZixlQUFlLENBQW9COzs7Ozs2QkF2RWhDLEtBQUs7Ozs7OzRCQU9OLEtBQUs7Ozs7OztxQkFRYixFQUFFOzs7Ozs7O3lCQStDd0IsRUFBRTtRQVl4QyxJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztLQUM1RDs7Ozs7O0lBT0QsUUFBUTtRQUNKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFF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LFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDOzs7NEJBdkUvRSxLQUFLOzJCQU9MLEtBQUs7b0JBUUwsS0FBSzt3QkFNTCxLQUFLO3dCQU1MLEtBQUs7c0JBUUwsS0FBSztvQ0FPTCxLQUFLOytCQU1MLEtBQUs7d0JBZUwsV0FBVyxTQUFDLE9BQU87bUJBdURuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FzeW5jVmFsaWRhdG9yRm4sIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnQsIExpc3RXcmFwcGVyLCBTdHJpbmdXcmFwcGVyfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Rm9ybVRhYmxlQ29tcG9uZW50fSBmcm9tICcuLi9mb3JtLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50LCBXaWRnZXRTaXplQ29sdW1uc30gZnJvbSAnLi4vLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcblxuLyoqXG4gKiBVc2VkIGJ5IEZvcm1UYWJsZSB0byBsYXlvdXQgZmllbGRzIGludG8gUm93cy4gRWFjaCBGb3JtVGFibGUgcm93IGlzIHJlYXNvbmFibGUgZm9yIG5vdCBvbmx5IHRvXG4gKiBpbmNsdWRlIGFjdHVhbCBjb21wb25lbnQgc3VjaCBpcyBEcm9wRG93biBvciBJbnB1dEZpZWxkIGJ1dCBtYWlubHkgcHJvdmlkZXMgYSBlbm91Z2ggY29udGV4dCBmb3JcbiAqIHRoZSBjb21wb25lbnQgdG8gc3BlY2lmeSB0aGUgc2l6ZSwgaG93IGl0IHNob3VsZCBsYXlvdXQsIHdoZXRoZXIgd2UgbmVlZCB0byBzaG93IHJlcXVpcmVkIGZsYWcsXG4gKiB0byBzaG93L2hpZGUgbGFiZWxzIGluIGNhc2UgaWYgd2UgaGF2ZSBubyBsYWJlbCBsYXlvdXQgYW5kIG11Y2ggbW9yZS5cbiAqXG4gKiBGb3JtUm93IGNvbXBvbmVudCBhbHNvIHJlZ2lzdGVycyBhbmd1bGFyIHZhbGlkYXRvciBmb3IgdGhlIGN1cnJlbnQgcm93L2ZpZWxkLiBBcyBhbHJlYWR5XG4gKiBtZW50aW9uZWQgV2UgdHJlYXQgb3VyIHdpZGdldHMgd2l0aCBtaW5pbWFsIHJlc3BvbnNpYmlsaXR5IGFzIHBvc3NpYmxlIHRvIHByZXNlbnQgYW5kIHJldHJpdmVcbiAqIGluZm9ybWF0aW9uIHRvL2Zyb20gdXNlciBhbmQgbGV0IHNvbWVib2R5IGVsc2UgdG8gZmlndXJlIG91dCB3aGVyZSBpdCBhcHBlYXIgYW5kIGhvdy5cbiAqXG4gKiB0b2RvOiBNb3ZlIHVuZGVyIEZvcm1UYWJsZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWZvcm0tcm93JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCIhaGlkZGVuXCJcbiAgICAgY2xhc3M9XCJ3LWZvcm0tcm93IHVpLWdcIlxuICAgICBbY2xhc3MuaGlnaGxpZ2h0LXJvd109XCJoaWdobGlnaHRSb3dcIlxuICAgICBbY2xhc3MucmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgICBbY2xhc3MubGFiZWwtb24tdG9wXT1cImxhYmVsc09uVG9wXCJcbiAgICAgW2NsYXNzLmxhYmVsLW9uLXNpZGVdPVwiIWxhYmVsc09uVG9wXCJcbiAgICAgW2NsYXNzLmhhcy1kYW5nZXJdPVwiIWZvcm1Db250cm9sLnZhbGlkICYmICFmb3JtQ29udHJvbC5wcmlzdGluZSBcIlxuICAgICBbbmdDbGFzc109XCJzdHlsZUNsYXNzXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1sYWJlbCB1aS1nLTEyIHVpLWctbm9wYWRcIlxuICAgICAgICAgKm5nSWY9XCIhbm9MYWJlbExheW91dFwiXG4gICAgICAgICBbY2xhc3MudWktbWQtM109XCIhbGFiZWxzT25Ub3BcIj5cbiAgICAgICAgPGxhYmVsIFtjbGFzcy5zci1vbmx5XT1cIm5vTGFiZWxMYXlvdXRcIj57e2xhYmVsfX08L2xhYmVsPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtdmFsdWUgdWktZy1ub3BhZFwiIFtuZ0NsYXNzXT1cInNpemVcIlxuICAgICAgICAgW2NsYXNzLnJlYWQtb25seV09XCIhZWRpdGFibGVcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8YS1lcnJvci1tZXNzYWdlcyBbY29udHJvbF09XCJmb3JtQ29udHJvbFwiPjwvYS1lcnJvci1tZXNzYWdlcz5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLnJlcXVpcmVkIGxhYmVsOmFmdGVye2NvbnRlbnQ6XCIqXCI7Y29sb3I6cmVkfS9kZWVwLyAuaGlnaGxpZ2h0LXJvd3tiYWNrZ3JvdW5kLWNvbG9yOiNmN2Y4ZmF9LnctZm9ybS1yb3cuaGlnaGxpZ2h0LXJvd3tiYWNrZ3JvdW5kLWNvbG9yOiNmN2Y4ZmF9LnctZm9ybS1yb3cubGFiZWwtb24tdG9we3BhZGRpbmctYm90dG9tOjEzcHh9LnctZm9ybS1yb3cubGFiZWwtb24tdG9wIC5jb250cm9sLWxhYmVsLC53LWZvcm0tcm93LmxhYmVsLW9uLXRvcCAuY29udHJvbC12YWx1ZXtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjB9LnctZm9ybS1yb3cubGFiZWwtb24tdG9wIC5jb250cm9sLWxhYmVse3BhZGRpbmctYm90dG9tOjEycHh9LnctZm9ybS1yb3cubGFiZWwtb24tc2lkZSAuY29udHJvbC1sYWJlbCwudy1mb3JtLXJvdy5sYWJlbC1vbi1zaWRlIC5jb250cm9sLXZhbHVle3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0udy1mb3JtLXJvdy5sYWJlbC1vbi1zaWRlIC5jb250cm9sLWxhYmVsIDo6bmctZGVlcCAudy1zdHJpbmctZmllbGQsLnctZm9ybS1yb3cubGFiZWwtb24tc2lkZSAuY29udHJvbC12YWx1ZSA6Om5nLWRlZXAgLnctc3RyaW5nLWZpZWxke2xpbmUtaGVpZ2h0OjM2cHh9LnctZm9ybS1yb3cubGFiZWwtb24tc2lkZSAuY29udHJvbC1sYWJlbCA6Om5nLWRlZXAgLnNhcC1pY29uLC53LWZvcm0tcm93LmxhYmVsLW9uLXNpZGUgLmNvbnRyb2wtdmFsdWUgOjpuZy1kZWVwIC5zYXAtaWNvbntsaW5lLWhlaWdodDoyNnB4fS53LWZvcm0tcm93LmxhYmVsLW9uLXNpZGUgLmNvbnRyb2wtbGFiZWwgbGFiZWwsLnctZm9ybS1yb3cubGFiZWwtb24tc2lkZSAuY29udHJvbC12YWx1ZSBsYWJlbHtsaW5lLWhlaWdodDozNnB4fS53LWZvcm0tcm93LmxhYmVsLW9uLXNpZGUgLmNvbnRyb2wtbGFiZWwgLmZhLC53LWZvcm0tcm93LmxhYmVsLW9uLXNpZGUgLmNvbnRyb2wtdmFsdWUgLmZhe2xpbmUtaGVpZ2h0OjE4cHh9LmNvbnRyb2wtbGFiZWx7Y29sb3I6IzYzNjM2M30udS12YWxpZGF0aW9uLWVycm9ye2JvcmRlci1jb2xvcjpyZWR9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCl9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtUm93Q29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnQge1xuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIGxhYmVsXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG5vTGFiZWxMYXlvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgcm93IHdpdGggaGlnaGxpZ2h0ZWQgYmFja2dyb3VuZFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoaWdobGlnaHRSb3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIEZpZWxkIGxhYmVsIHRoYXQgc2hvdWxkIGFwcGVhciBhYm92ZSBvciBuZXh0IHRvIHRoZSBjb250cm9sXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKlxuICAgICAqICBGb3IgaW5wdXRzIHR5cGUgZmllbGRzIHByb3ZpZGVzIGRlZmF1bHQgYW5ndWxhciB2YWxpZGF0b3JzLCBtYXhpbWFsIGxlbmd0aCBvZiB0aGUgZmllbGRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1heExlbmd0aDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogIEZvciBpbnB1dHMgdHlwZSBmaWVsZHMgcHJvdmlkZXMgZGVmYXVsdCBhbmd1bGFyIHZhbGlkYXRvcnMsIG1pbmltYWwgbGVuZ3RoIG9mIHRoZSBmaWVsZFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG5cblxuICAgIC8qKlxuICAgICAqICBGb3IgaW5wdXRzIHR5cGUgZmllbGRzIHByb3ZpZGVzIGRlZmF1bHQgYW5ndWxhciBmb3JtYXR0ZXJzLiBIb3cgdGhlIGlucHV0IGZpZWxkcyBzaG91bGQgYmVcbiAgICAgKiBmb3JtYXR0ZWRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHBhdHRlcm46IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBjdXN0b20gYXN5bmMgdmFsaWRhdG9ycyB3aGljaCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBDb250cm9sXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjdXN0b21Bc3luY1ZhbGlkYXRvcnM6IEFzeW5jVmFsaWRhdG9yRm5bXTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgY3VzdG9tICB2YWxpZGF0b3JzIHdoaWNoIHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIENvbnRyb2xcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGN1c3RvbVZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW107XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IGlzIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIGZpZWxkLiBDdXJyZW50IHdlIHN1cHBvcnQgNCBkaWZmZXJlbnQgc2l6ZXM6IHgtc21hbGwsIHNtYWxsLFxuICAgICAqIG1lZGl1bSwgbGFyZ2UsIHgtbGFyZ2VcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zaXplOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEZvciBzaW5nbGUgY29sdW1uIGxheW91dCB3aXRob3V0IHpvbmVzIHdlIG5lZWQgdG8gYXBwbHkgZ3JpZCBkaXJlY3RseSB0byB0aGUgRm9ybVJvdyB0YWdcbiAgICAgKiBzbyB3ZSBkb24ndCBuZWVkIHRvIGludHJvZHVjZSBleHRyYSBkaXYgbGV2ZWxcbiAgICAgKlxuICAgICAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc0xpc3Q6IHN0cmluZyA9ICcnO1xuXG5cbiAgICBwcml2YXRlIF9sYWJlbHNPblRvcDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIC8vIEV2ZW50IHRoaXMgY3JlYXRlcyBDSSBkZXBlbmRzLiBOZWVkIHRvIGhhdmUgYSByZWZlcmVuY2UgdG8gcGFyZW50XG4gICAgICAgICAgICAgICAgLy8gSSBuZWVkIHRvIHJlZmFjdG9yIG1vcmUgcGFyZW50IHRvIG5vdCB1c2UgdGhpcyBjaGlsZCBhbmQgcmVmYWN0b3IgbGF5b3V0aW5nXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEZvcm1UYWJsZUNvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogRm9ybVRhYmxlQ29tcG9uZW50KSB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLl9zaXplID0gJ3VpLWctMTIgdWktbWQtJyArIFdpZGdldFNpemVDb2x1bW5zLm1lZGl1bTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJpZ2h0IG5vdyB3ZSBqdXN0IGluaXRpYWxpemUgdGhpcyBvbmNlIGFuZCB1c2UgdGhlIHZhbHVlcyB3ZSBkbyBub3QgZXhwZWN0IG5vdyB0byByZWFjdCB0b1xuICAgICAqIGNoYW5nZXNcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbChudWxsKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyVmFsaWRhdG9ycygpO1xuXG4gICAgICAgIHRoaXMub21pdFBhZGRpbmcgPSB0aGlzLnBhcmVudENvbnRhaW5lci5vbWl0UGFkZGluZztcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QgKz0gaXNQcmVzZW50KHRoaXMucGFyZW50Q29udGFpbmVyKSA/ICcgdWktZy0xMiAnIDogJyc7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0ID0gdGhpcy5oaWdobGlnaHRSb3cgPyB0aGlzLmNsYXNzTGlzdCArICcgaGlnaGxpZ2h0LXJvdyAnIDogdGhpcy5jbGFzc0xpc3Q7XG5cbiAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSB0aGlzLm9taXRQYWRkaW5nID8gdGhpcy5jbGFzc0xpc3QgKyAnIHVpLWctbm9wYWQgJyA6IHRoaXMuY2xhc3NMaXN0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSnVzdCBhIHNpemUgZ2V0dGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgc2l6ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQSBzaXplIHNldHRlciB3ZSB0cmFuc2xhdGUgY3VzdG9tIHNpemVzIGludG8gYWN0dWFsIGJvb3RzdHJhcCBncmlkIHN5c3RlbS4gV2UgdXNlIG1lZGl1bVxuICAgICAqIHJpZ2h0IG5vdy4gYnV0IHdlIHNob3VsZCBleHRlbmQgdGhpcyBmb3Igb3RoZXIgc2NyZWVuIHNpemVzXG4gICAgICpcbiAgICAgKiAgdG9kbzogcHJvdmlkZSBtYXBwaW5nIGFuZCBhZGQgb3RoZXIgZ3JpZCBjbGFzc2VzIGZvciBvdGhlciBzaXplcyB4cywgc20sIGxnLCB4bFxuICAgICAqXG4gICAgICogIEFsc28gY2hlY2sgaWYgdGhpcyBpcyBkeW5hbWljIHNpemUgdGhhdCBzaG91bGQgdmFyeSBiYXNlZCBvbiB0aGUgaG93IG1hbnkgbnVtYmVyIG9mIGNvbHVtbnNcbiAgICAgKiB3ZSBoYXZlLiBlLmcuIERhdGUgd2lkZ2V0cyBpcyBieSBkZWZhdWx0IHNtYWxsLCBidXQgaW4gMiwgMyBjb2x1bW5zIGxheW91dCB0aGlzIHNtYWxsIGlzIHRvb1xuICAgICAqIHNtYWxsLlxuICAgICAqL1xuXG5cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xuXG4gICAgICAgIGxldCBpc0R5blZhbCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChTdHJpbmdXcmFwcGVyLnN0YXJ0c1dpZHRoKHZhbHVlLCAnZC0nKSkge1xuICAgICAgICAgICAgaXNEeW5WYWwgPSB0cnVlO1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMiwgdmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgbGV0IGRTaXplID0gdGhpcy5keW5TaXplKHZhbHVlLCBpc0R5blZhbCk7XG4gICAgICAgICAgICB0aGlzLl9zaXplID0gJ3VpLWctMTIgdWktbWQtJyArIGRTaXplO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm5nRG9DaGVjaygpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5wYXJlbnRDb250YWluZXIpICYmIHRoaXMuZWRpdGFibGUgIT09IHRoaXMucGFyZW50Q29udGFpbmVyLmVkaXRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRhYmxlID0gdGhpcy5wYXJlbnRDb250YWluZXIuZWRpdGFibGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdXNoIG91dCBvZiBib3ggYW5ndWxhciB2YWxpZGF0b3IgYXMgd2VsbCBhcyBjdXN0b20gb25lIHRvIGN1cnJlbnQgRm9ybUNvbnRyb2xcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZ2lzdGVyVmFsaWRhdG9ycygpIHtcbiAgICAgICAgbGV0IHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gPSBbXTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubWF4TGVuZ3RoKSkge1xuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKHRoaXMubWF4TGVuZ3RoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubWluTGVuZ3RoKSkge1xuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKHRoaXMubWluTGVuZ3RoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucmVxdWlyZWQpICYmIHRoaXMucmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5wYXR0ZXJuKSkge1xuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucGF0dGVybih0aGlzLnBhdHRlcm4pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuY3VzdG9tVmFsaWRhdG9ycykpIHtcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLmFkZEFsbCh2YWxpZGF0b3JzLCB0aGlzLmN1c3RvbVZhbGlkYXRvcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbGlkYXRvcnModmFsaWRhdG9yc1swXSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdG9ycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbGlkYXRvcnMoVmFsaWRhdG9ycy5jb21wb3NlKHZhbGlkYXRvcnMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5jdXN0b21Bc3luY1ZhbGlkYXRvcnMpICYmIHRoaXMuY3VzdG9tQXN5bmNWYWxpZGF0b3JzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRBc3luY1ZhbGlkYXRvcnModGhpcy5jdXN0b21Bc3luY1ZhbGlkYXRvcnNbMF0pO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLmN1c3RvbUFzeW5jVmFsaWRhdG9ycykgJiYgdGhpcy5jdXN0b21Bc3luY1ZhbGlkYXRvcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRBc3luY1ZhbGlkYXRvcnMoXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jb21wb3NlQXN5bmModGhpcy5jdXN0b21Bc3luY1ZhbGlkYXRvcnMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEbyB3ZSBoYXZlIGxhYmVscyBvbiBUT1AsIHRyeSB0byByZWFkIHRoaXMgZnJvbSBQYXJlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCBsYWJlbHNPblRvcCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fbGFiZWxzT25Ub3ApICYmIGlzUHJlc2VudCh0aGlzLnBhcmVudENvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIHJldHVybiAoPEZvcm1UYWJsZUNvbXBvbmVudD50aGlzLnBhcmVudENvbnRhaW5lcikuaXNMYWJlbHNPblRvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2FuIHJlZmFjdG9yIGFsbCBpbnRvIDEgbGluZSBidXQgaXRzIGhhcmQgdG8gZGVidWcgc28gdGhpcyBpcyBqdXN0IGZvciByZWFkXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGR5blNpemUodmFsdWU6IHN0cmluZywgaXNEeW5WYWx1ZTogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIGxldCBub3JtYWxpemVTaXplID0gdmFsdWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCctJywgJycpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5wYXJlbnRDb250YWluZXIpICYmXG4gICAgICAgICAgICAoPEZvcm1UYWJsZUNvbXBvbmVudD50aGlzLnBhcmVudENvbnRhaW5lcikuaGFzVHdvQ29sdW1uICYmIGlzRHluVmFsdWUpIHtcblxuICAgICAgICAgICAgbGV0IGVudW1WYWx1ZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoV2lkZ2V0U2l6ZUNvbHVtbnMpO1xuICAgICAgICAgICAgbm9ybWFsaXplU2l6ZSA9IGVudW1WYWx1ZXNbZW51bVZhbHVlcy5pbmRleE9mKG5vcm1hbGl6ZVNpemUpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICg8YW55PldpZGdldFNpemVDb2x1bW5zKVtub3JtYWxpemVTaXplXTtcblxuICAgIH1cbn1cbiJdfQ==