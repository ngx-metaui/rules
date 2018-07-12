/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/**
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
 */
export var /** @type {?} */ RB_LIST_CONTROL_VALUE_ACCESSOR = {
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
        var /** @type {?} */ updatedModel = this.list[this.model];
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
        var /** @type {?} */ index = this.list.findIndex(function (elem) {
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
        var /** @type {?} */ updatedModel = this.list[this.model];
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
            var /** @type {?} */ newModel = value;
            this.updateModel(newModel);
        }
    };
    RadioButtonListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-radiobutton-list',
                    template: "<div *ngFor=\"let item of list;  let i = index\" class=\"ui-g\">\n\n    <div class=\"ui-g-12\">\n        <aw-radiobutton\n            [(ngModel)]=\"model\"\n            (ngModelChange)=\"onChange($event)\"\n            [isStandalone]=\"false\"\n            [name]=\"name\"\n            [value]=\"i\"\n            [label]=\"labelValue(item)\">\n        </aw-radiobutton>\n    </div>\n\n</div>\n",
                    styles: [""],
                    providers: [
                        RB_LIST_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return RadioButtonListComponent; }) }
                    ]
                },] },
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
function RadioButtonListComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcmFkaW8tYnV0dG9uLWxpc3QvcmFkaW8tYnV0dG9uLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBa0JBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3Q3RGLE1BQU0sQ0FBQyxxQkFBTSw4QkFBOEIsR0FBUTtJQUMvQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHdCQUF3QixFQUF4QixDQUF3QixDQUFDO0lBQ3ZELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUEyQjRDLG9EQUFpQjtJQXVDM0Qsa0NBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFGeEQsWUFJSSxrQkFBTSxHQUFHLEVBQUUsZUFBZSxDQUFDLFNBQzlCO1FBTGtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7Ozs0QkFYdkIsSUFBSSxZQUFZLEVBQU87O0tBY3ZEOzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFF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LGlCQUFpQix1QkFnSFIsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxnQkFBZ0IsRUFBaEIsQ0FBZ0IsQ0FBQzs7O3VCQWxDN0UsS0FBSzs0QkFPTCxLQUFLO2lDQU9MLEtBQUs7OEJBU0wsTUFBTTs7bUNBcElYO0VBdUc4QyxpQkFBaUI7U0FBbEQsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogV3JhcHBlciBjbGFzcyBmb3IgUmFkaW9CdXR0b24gY29tcG9uZW50IHByb3ZpZGluZyBjb252ZW5pZW50IHdheSB0byB0byByZW5kZXIgUmFkaW9CdXR0b24gR3JvdXBzXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICpcbiAqIGBgYFxuICogICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgIHNlbGVjdG9yOiAnZ2VuZGVyLXNlbGVjdG9yJyAsXG4gKiAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgIDxhdy1yYWRpb2J1dHRvbi1saXN0IFtsaXN0XT1cInJiTGlzdFZhbHVlc1wiIFtsYXlvdXRdPVwibGF5b3V0XCJcbiAqICAgICBbc2VsZWN0aW9uXT1cInNlbGVjdGVkVmFsdWVcIiBbbmFtZV09XCInbmFtZSdcIj5cbiAqICAgICAgICAgICAgICAgPC9hdy1yYWRpb2J1dHRvbi1saXN0PlxuICogICAgICBgXG4gKiAgICAgIH0pXG4gKiAgICAgIGV4cG9ydCBjbGFzcyBHZW5kZXJTZWxlY3RvckNvbXBvbmVudFxuICogICAgICB7XG4gKiAgICAgICAgICByYkxpc3RWYWx1ZXM6IHN0cmluZ1tdID0gWydtYWxlJyAsICdmZW1hbGUnICwgJ290aGVyJ107XG4gKiAgICAgICAgICBzZWxlY3RlZFZhbHVlOiBzdHJpbmcgPSAnb3RoZXInO1xuICogICAgICAgICAgbGF5b3V0OiBzdHJpbmcgPSAnc3RhY2tlZCc7XG4gKlxuICpcbiAqICAgICAgICAgIGZvcm1Hcm91cDogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gKlxuICpcbiAqICAgICAgICAgIG9uQ0JDbGljayAoZXZlbnQpOiB2b2lkXG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uQ0JDbGljayA9ICcgKyBldmVudCk7XG4gKiAgICAgICAgICB9XG4gKlxuICogICAgICB9XG4gKlxuICogYGBgXG4gKi9cblxuXG5leHBvcnQgY29uc3QgUkJfTElTVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9CdXR0b25MaXN0Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXJhZGlvYnV0dG9uLWxpc3QnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBsaXN0OyAgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwidWktZ1wiPlxuXG4gICAgPGRpdiBjbGFzcz1cInVpLWctMTJcIj5cbiAgICAgICAgPGF3LXJhZGlvYnV0dG9uXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsXCJcbiAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgW2lzU3RhbmRhbG9uZV09XCJmYWxzZVwiXG4gICAgICAgICAgICBbbmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJpXCJcbiAgICAgICAgICAgIFtsYWJlbF09XCJsYWJlbFZhbHVlKGl0ZW0pXCI+XG4gICAgICAgIDwvYXctcmFkaW9idXR0b24+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgYF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFJCX0xJU1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSYWRpb0J1dHRvbkxpc3RDb21wb25lbnQpfVxuICAgIF1cblxufSlcbmV4cG9ydCBjbGFzcyBSYWRpb0J1dHRvbkxpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXRcbntcblxuICAgIC8qKlxuICAgICAqIExJc3Qgb2YgdmFsdWVzIHVzZWQgdG8gcmVuZGVyIHRoZSByYWRpbyBidXR0b24gZ3JvdXBcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxpc3Q6IGFueVtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVzIHdoaWNoIHJhZGlvIGJ1dHRvbnMgaXMgc2VsZWN0ZWQgd2hlbiByZW5kZXJlZFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0aW9uOiBhbnk7XG5cblxuICAgIC8qKlxuICAgICAqIHNwZWNpYWwgZXhwcmVzc2lvbiB0byBmb3JtYXQgbGFiZWxcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsRm9ybWF0dGVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEZpcmVzIGFuIGV2ZW50IHdoZW4gcmFkaW8gYnV0dG9uIGlzIHNlbGVjdGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gICAgLyoqXG4gICAgICogaW50ZXJuYWwgbW9kZWwgdG8gbGlzdGVuIGZvciByYWRpbyB2YWx1ZSBjaGFuZ2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBtb2RlbDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEZvcm1Sb3dDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy5zZWxlY3Rpb24pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTGFiZWwgaXMgZXh0cmFjdGVkIGludG8gYSBtZXRob2Qgc28gaW4gdGhlIGZ1dHVyZSB3ZSBjYW4gcGxheSBob3cgd2Ugd2FudCB0byBkaXNwbGF5IHRoZVxuICAgICAqIHZhbHVlLiBTaW5jZSBJIHdhbnQgdG8gc3VwcG9ydCBmb3JtYXR0ZXJzIGZvciBlYWNoIGNvbXBvbmVudHMgd2UgbWlnaHQgaGF2ZSBhIGNoYW5jZSB0b1xuICAgICAqIGRlY2lkZSBob3cgdGhlIGxhYmVsIHdpbGwgbG9vayBsaWtlLlxuICAgICAqXG4gICAgICovXG4gICAgbGFiZWxWYWx1ZShpdGVtOiBhbnkpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5sYWJlbEZvcm1hdHRlcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsRm9ybWF0dGVyKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbiB0aGlzIHZlcnNpb24gb2YgY2hlY2tib3hlcyB3ZSBzdGlsbCBleHBlY3Qgb25seSBwcmltaXRpdmUgdHlwZXMuIEtlZXAgdGhpcyBmdW5jdGlvbmFsaXR5XG4gICAgICogaW4gZXh0cmEgbWV0aG9kIHNvIHdlIGNhbiB3b3JrIHdpdGggaXQgZXZlbiBub3cgd2UganVzdCByZXR1cm4gdGhlIHNhbWUgdmFsdWUgYmFja1xuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICB2YWx1ZShpdGVtOiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBPbiBOR01vZGVsIGNoYW5nZSByZXRyaWV2ZSBhY3R1YWwgcmVjb3JkIGJhc2VkIG9uIHRoZSBJTkRFWCBhbmQgcHJvcGFnYXRlIGl0IHRvIGJvdGhcbiAgICAgKiBuZ01vZGVsIGFzIHdlbGwgYXMgRm9ybUdyb3VwLlxuICAgICAqXG4gICAgICovXG4gICAgb25DaGFuZ2UoZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIGxldCB1cGRhdGVkTW9kZWw6IGFueSA9IHRoaXMubGlzdFt0aGlzLm1vZGVsXTtcblxuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uLmVtaXQodXBkYXRlZE1vZGVsKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh1cGRhdGVkTW9kZWwpO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHVwZGF0ZWRNb2RlbCwge1xuICAgICAgICAgICAgZW1pdEV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNpbmNlIHdlIG1pZ2h0IGJlIGRlYWxpbmcgd2l0aCBjb21wbGV4IG9iamVjdCBzdG9yZSBvbmx5IElOREVYIG51bWJlciBpbiB0aGUgbW9kZWwuXG4gICAgICpcbiAgICAgKi9cbiAgICB1cGRhdGVNb2RlbChzb3VjZUl0ZW06IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMubGlzdC5maW5kSW5kZXgoKGVsZW06IGFueSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHNvdWNlSXRlbSA9PT0gZWxlbTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubW9kZWwgPSBpbmRleCA9PT0gLTEgPyAwIDogaW5kZXg7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCB1cGRhdGVkTW9kZWw6IGFueSA9IHRoaXMubGlzdFt0aGlzLm1vZGVsXTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh1cGRhdGVkTW9kZWwsIHtcbiAgICAgICAgICAgIGVtaXRFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgIGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwuIFBsZWFzZSBzZWUgQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAgICAgKlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG5ld01vZGVsID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKG5ld01vZGVsKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIl19