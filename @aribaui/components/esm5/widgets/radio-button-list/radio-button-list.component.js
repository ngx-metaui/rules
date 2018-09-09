/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/** *
 * Wrapper class for RadioButton component providing convenient way to to render RadioButton Groups
 *
 *
 * ### Example
 *
 *
 * ```
 * \@Component({
 *          selector: 'gender-selector' ,
 *          template: `
 *              <aw-radiobutton-list [list]="rbListValues" [layout]="layout"
 *     [selection]="selectedValue" [name]="'name'">
 *               </aw-radiobutton-list>
 *      `
 *      })
 *      export class GenderSelectorComponent
 *      {
 *          rbListValues: string[] = ['male' , 'female' , 'other'];
 *          selectedValue: string = 'other';
 *          layout: string = 'stacked';
 *
 *
 *          formGroup: FormGroup = new FormGroup({});
 *
 *
 *          onCBClick (event): void
 *          {
 *              console.log('onCBClick = ' + event);
 *          }
 *
 *      }
 *
 * ```
  @type {?} */
export var RB_LIST_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioButtonListComponent; }),
    multi: true
};
var RadioButtonListComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RadioButtonListComponent, _super);
    function RadioButtonListComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         *
         * Fires an event when radio button is selected
         *
         */
        _this.onSelection = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    RadioButtonListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (isPresent(this.selection)) {
            this.model = 0;
        }
        this.updateModel(this.selection);
        this.onModelChanged(this.selection);
        this.registerFormControl(this.selection);
    };
    /**
     * Label is extracted into a method so in the future we can play how we want to display the
     * value. Since I want to support formatters for each components we might have a chance to
     * decide how the label will look like.
     *
     */
    /**
     * Label is extracted into a method so in the future we can play how we want to display the
     * value. Since I want to support formatters for each components we might have a chance to
     * decide how the label will look like.
     *
     * @param {?} item
     * @return {?}
     */
    RadioButtonListComponent.prototype.labelValue = /**
     * Label is extracted into a method so in the future we can play how we want to display the
     * value. Since I want to support formatters for each components we might have a chance to
     * decide how the label will look like.
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (isPresent(this.labelFormatter)) {
            return this.labelFormatter(item);
        }
        return item.toString();
    };
    /**
     * In this version of checkboxes we still expect only primitive types. Keep this functionality
     * in extra method so we can work with it even now we just return the same value back
     *
     *
     */
    /**
     * In this version of checkboxes we still expect only primitive types. Keep this functionality
     * in extra method so we can work with it even now we just return the same value back
     *
     *
     * @param {?} item
     * @return {?}
     */
    RadioButtonListComponent.prototype.value = /**
     * In this version of checkboxes we still expect only primitive types. Keep this functionality
     * in extra method so we can work with it even now we just return the same value back
     *
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item;
    };
    /**
     *
     * On NGModel change retrieve actual record based on the INDEX and propagate it to both
     * ngModel as well as FormGroup.
     *
     */
    /**
     *
     * On NGModel change retrieve actual record based on the INDEX and propagate it to both
     * ngModel as well as FormGroup.
     *
     * @param {?} event
     * @return {?}
     */
    RadioButtonListComponent.prototype.onChange = /**
     *
     * On NGModel change retrieve actual record based on the INDEX and propagate it to both
     * ngModel as well as FormGroup.
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var updatedModel = this.list[this.model];
        this.onSelection.emit(updatedModel);
        this.onModelChanged(updatedModel);
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
    };
    /**
     * Since we might be dealing with complex object store only INDEX number in the model.
     *
     */
    /**
     * Since we might be dealing with complex object store only INDEX number in the model.
     *
     * @param {?} souceItem
     * @return {?}
     */
    RadioButtonListComponent.prototype.updateModel = /**
     * Since we might be dealing with complex object store only INDEX number in the model.
     *
     * @param {?} souceItem
     * @return {?}
     */
    function (souceItem) {
        /** @type {?} */
        var index = this.list.findIndex(function (elem) {
            return souceItem === elem;
        });
        this.model = index === -1 ? 0 : index;
    };
    /**
     * @return {?}
     */
    RadioButtonListComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var updatedModel = this.list[this.model];
        this.formControl.setValue(updatedModel, {
            emitEvent: true,
            emitViewToModelChange: false
        });
        // this.cd.detectChanges();
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
    RadioButtonListComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.value) {
            /** @type {?} */
            var newModel = value;
            this.updateModel(newModel);
        }
    };
    RadioButtonListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-radiobutton-list',
                    template: "<div *ngFor=\"let item of list;  let i = index\" class=\"ui-g\">\n\n    <div class=\"ui-g-12\">\n        <aw-radiobutton\n            [(ngModel)]=\"model\"\n            (ngModelChange)=\"onChange($event)\"\n            [isStandalone]=\"false\"\n            [name]=\"name\"\n            [value]=\"i\"\n            [label]=\"labelValue(item)\">\n        </aw-radiobutton>\n    </div>\n\n</div>\n",
                    providers: [
                        RB_LIST_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return RadioButtonListComponent; }) }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    RadioButtonListComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return FormRowComponent; }),] }] }
    ]; };
    RadioButtonListComponent.propDecorators = {
        list: [{ type: Input }],
        selection: [{ type: Input }],
        labelFormatter: [{ type: Input }],
        onSelection: [{ type: Output }]
    };
    return RadioButtonListComponent;
}(BaseFormComponent));
export { RadioButtonListComponent };
if (false) {
    /**
     * LIst of values used to render the radio button group
     * @type {?}
     */
    RadioButtonListComponent.prototype.list;
    /**
     * Identifies which radio buttons is selected when rendered
     * @type {?}
     */
    RadioButtonListComponent.prototype.selection;
    /**
     * special expression to format label
     * @type {?}
     */
    RadioButtonListComponent.prototype.labelFormatter;
    /**
     *
     * Fires an event when radio button is selected
     *
     * @type {?}
     */
    RadioButtonListComponent.prototype.onSelection;
    /**
     * internal model to listen for radio value changes
     *
     * @type {?}
     */
    RadioButtonListComponent.prototype.model;
    /** @type {?} */
    RadioButtonListComponent.prototype.env;
    /** @type {?} */
    RadioButtonListComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcmFkaW8tYnV0dG9uLWxpc3QvcmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBa0JBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3Q3RGLFdBQWEsOEJBQThCLEdBQVE7SUFDL0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx3QkFBd0IsRUFBeEIsQ0FBd0IsQ0FBQztJQUN2RCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBYTRDLG9EQUFpQjtJQXVDM0Qsa0NBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFGeEQsWUFJSSxrQkFBTSxHQUFHLEVBQUUsZUFBZSxDQUFDLFNBQzlCO1FBTGtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7Ozs0QkFYdkIsSUFBSSxZQUFZLEVBQU87O0tBY3ZEOzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsRUFBRSxDQUFD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Q0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUM7Ozt1QkFsQzdFLEtBQUs7NEJBT0wsS0FBSztpQ0FPTCxLQUFLOzhCQVNMLE1BQU07O21DQXRIWDtFQXlGOEMsaUJBQWlCO1NBQWxELHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcblxuXG4vKipcbiAqIFdyYXBwZXIgY2xhc3MgZm9yIFJhZGlvQnV0dG9uIGNvbXBvbmVudCBwcm92aWRpbmcgY29udmVuaWVudCB3YXkgdG8gdG8gcmVuZGVyIFJhZGlvQnV0dG9uIEdyb3Vwc1xuICpcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqXG4gKiBgYGBcbiAqICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICBzZWxlY3RvcjogJ2dlbmRlci1zZWxlY3RvcicgLFxuICogICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICA8YXctcmFkaW9idXR0b24tbGlzdCBbbGlzdF09XCJyYkxpc3RWYWx1ZXNcIiBbbGF5b3V0XT1cImxheW91dFwiXG4gKiAgICAgW3NlbGVjdGlvbl09XCJzZWxlY3RlZFZhbHVlXCIgW25hbWVdPVwiJ25hbWUnXCI+XG4gKiAgICAgICAgICAgICAgIDwvYXctcmFkaW9idXR0b24tbGlzdD5cbiAqICAgICAgYFxuICogICAgICB9KVxuICogICAgICBleHBvcnQgY2xhc3MgR2VuZGVyU2VsZWN0b3JDb21wb25lbnRcbiAqICAgICAge1xuICogICAgICAgICAgcmJMaXN0VmFsdWVzOiBzdHJpbmdbXSA9IFsnbWFsZScgLCAnZmVtYWxlJyAsICdvdGhlciddO1xuICogICAgICAgICAgc2VsZWN0ZWRWYWx1ZTogc3RyaW5nID0gJ290aGVyJztcbiAqICAgICAgICAgIGxheW91dDogc3RyaW5nID0gJ3N0YWNrZWQnO1xuICpcbiAqXG4gKiAgICAgICAgICBmb3JtR3JvdXA6IEZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICpcbiAqXG4gKiAgICAgICAgICBvbkNCQ2xpY2sgKGV2ZW50KTogdm9pZFxuICogICAgICAgICAge1xuICogICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkNCQ2xpY2sgPSAnICsgZXZlbnQpO1xuICogICAgICAgICAgfVxuICpcbiAqICAgICAgfVxuICpcbiAqIGBgYFxuICovXG5cblxuZXhwb3J0IGNvbnN0IFJCX0xJU1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvQnV0dG9uTGlzdENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1yYWRpb2J1dHRvbi1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3JhZGlvLWJ1dHRvbi1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsncmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgUkJfTElTVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvQnV0dG9uTGlzdENvbXBvbmVudCl9XG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdFxue1xuXG4gICAgLyoqXG4gICAgICogTElzdCBvZiB2YWx1ZXMgdXNlZCB0byByZW5kZXIgdGhlIHJhZGlvIGJ1dHRvbiBncm91cFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGlzdDogYW55W107XG5cblxuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgd2hpY2ggcmFkaW8gYnV0dG9ucyBpcyBzZWxlY3RlZCB3aGVuIHJlbmRlcmVkXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3Rpb246IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogc3BlY2lhbCBleHByZXNzaW9uIHRvIGZvcm1hdCBsYWJlbFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWxGb3JtYXR0ZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRmlyZXMgYW4gZXZlbnQgd2hlbiByYWRpbyBidXR0b24gaXMgc2VsZWN0ZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBpbnRlcm5hbCBtb2RlbCB0byBsaXN0ZW4gZm9yIHJhZGlvIHZhbHVlIGNoYW5nZXNcbiAgICAgKlxuICAgICAqL1xuICAgIG1vZGVsOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnNlbGVjdGlvbik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBMYWJlbCBpcyBleHRyYWN0ZWQgaW50byBhIG1ldGhvZCBzbyBpbiB0aGUgZnV0dXJlIHdlIGNhbiBwbGF5IGhvdyB3ZSB3YW50IHRvIGRpc3BsYXkgdGhlXG4gICAgICogdmFsdWUuIFNpbmNlIEkgd2FudCB0byBzdXBwb3J0IGZvcm1hdHRlcnMgZm9yIGVhY2ggY29tcG9uZW50cyB3ZSBtaWdodCBoYXZlIGEgY2hhbmNlIHRvXG4gICAgICogZGVjaWRlIGhvdyB0aGUgbGFiZWwgd2lsbCBsb29rIGxpa2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBsYWJlbFZhbHVlKGl0ZW06IGFueSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxhYmVsRm9ybWF0dGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxGb3JtYXR0ZXIoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEluIHRoaXMgdmVyc2lvbiBvZiBjaGVja2JveGVzIHdlIHN0aWxsIGV4cGVjdCBvbmx5IHByaW1pdGl2ZSB0eXBlcy4gS2VlcCB0aGlzIGZ1bmN0aW9uYWxpdHlcbiAgICAgKiBpbiBleHRyYSBtZXRob2Qgc28gd2UgY2FuIHdvcmsgd2l0aCBpdCBldmVuIG5vdyB3ZSBqdXN0IHJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHZhbHVlKGl0ZW06IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIE9uIE5HTW9kZWwgY2hhbmdlIHJldHJpZXZlIGFjdHVhbCByZWNvcmQgYmFzZWQgb24gdGhlIElOREVYIGFuZCBwcm9wYWdhdGUgaXQgdG8gYm90aFxuICAgICAqIG5nTW9kZWwgYXMgd2VsbCBhcyBGb3JtR3JvdXAuXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNoYW5nZShldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRNb2RlbDogYW55ID0gdGhpcy5saXN0W3RoaXMubW9kZWxdO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh1cGRhdGVkTW9kZWwpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHVwZGF0ZWRNb2RlbCk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodXBkYXRlZE1vZGVsLCB7XG4gICAgICAgICAgICBlbWl0RXZlbnQ6IHRydWUsXG4gICAgICAgICAgICBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2luY2Ugd2UgbWlnaHQgYmUgZGVhbGluZyB3aXRoIGNvbXBsZXggb2JqZWN0IHN0b3JlIG9ubHkgSU5ERVggbnVtYmVyIGluIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqL1xuICAgIHVwZGF0ZU1vZGVsKHNvdWNlSXRlbTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5saXN0LmZpbmRJbmRleCgoZWxlbTogYW55KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gc291Y2VJdGVtID09PSBlbGVtO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IGluZGV4ID09PSAtMSA/IDAgOiBpbmRleDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRNb2RlbDogYW55ID0gdGhpcy5saXN0W3RoaXMubW9kZWxdO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHVwZGF0ZWRNb2RlbCwge1xuICAgICAgICAgICAgZW1pdEV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbmV3TW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwobmV3TW9kZWwpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=