/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export var /** @type {?} */ TEXTAREA_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TextAreaComponent; }),
    multi: true
};
var TextAreaComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TextAreaComponent, _super);
    function TextAreaComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         *
         * A value used to store and read user input
         *
         */
        _this.value = '';
        /**
         * Spefifies visible number of lines
         */
        _this.rows = 2;
        /**
         * Specifies visible width
         */
        _this.columns = 20;
        /**
         * when this option is TRUE and user starts typing it will maximize textarea's width and height
         */
        _this.autoResize = true;
        return _this;
    }
    /**
     * @return {?}
     */
    TextAreaComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        _super.prototype.registerFormControl.call(this, this.value);
        this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe(function (val) {
            _this.value = val;
            _this.onModelChanged(_this.value);
        });
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
    TextAreaComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value, { onlySelf: true });
        }
    };
    TextAreaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-text-area',
                    template: "<div *ngIf=\"editable\" [formGroup]=\"formGroup\">\n\n\t<textarea\n        pInputTextarea\n        [attr.name]=\"name\"\n        class=\"w-text-area\"\n        [class.u-validation-error]=\"!(formControl.valid || (formControl.pristine))\"\n        [class.disabled]=\"disabled\"\n        formControlName=\"{{name}}\"\n        [rows]=\"rows\"\n        [cols]=\"columns\"\n        [autoResize]=\"autoResize\"\n        [attr.placeholder]=\"placeHolder\"\n\n    ></textarea>\n\n</div>\n\n\n<ng-template [ngIf]=\"!editable\">\n    <aw-string [value]=\"value\"></aw-string>\n</ng-template>\n",
                    styles: [""],
                    providers: [
                        TEXTAREA_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return TextAreaComponent; }) }
                    ]
                },] },
    ];
    /** @nocollapse */
    TextAreaComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return FormRowComponent; }),] }] }
    ]; };
    TextAreaComponent.propDecorators = {
        value: [{ type: Input }],
        rows: [{ type: Input }],
        columns: [{ type: Input }],
        autoResize: [{ type: Input }]
    };
    return TextAreaComponent;
}(BaseFormComponent));
export { TextAreaComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3RleHQtYXJlYS90ZXh0LWFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJwRCxNQUFNLENBQUMscUJBQU0sK0JBQStCLEdBQVE7SUFDaEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBbUNxQyw2Q0FBaUI7SUErQnBELDJCQUFtQixHQUFnQixFQUViLGVBQWtDO1FBRnhELFlBSUksa0JBQU0sR0FBRyxFQUFFLGVBQWUsQ0FBQyxTQUM5QjtRQUxrQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIscUJBQWUsR0FBZixlQUFlLENBQW1COzs7Ozs7c0JBekIzQyxFQUFFOzs7O3FCQU9BLENBQUM7Ozs7d0JBT0UsRUFBRTs7OzsyQkFPRSxJQUFJOztLQU96Qjs7OztJQUVELG9DQUFROzs7SUFBUjtRQUFBLGlCQWFDO1FBVkcsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsaUJBQU0sbUJBQW1CLFlBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDOUIsb0JBQW9CLEVBQUUsQ0FDekIsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBRVgsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO0tBQ047SUFHRDs7O09BR0c7Ozs7Ozs7SUFDSCxzQ0FBVTs7Ozs7O0lBQVYsVUFBVyxLQUFVO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUN0RDtLQUVKOztnQkFqR0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUseWtCQXNCYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBRVosU0FBUyxFQUFFO3dCQUNQLCtCQUErQjt3QkFDL0IsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUMsRUFBQztxQkFDakY7aUJBQ0o7Ozs7Z0JBbkVPLFdBQVc7Z0JBQ1gsaUJBQWlCLHVCQW1HUixRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDOzs7d0JBekI3RSxLQUFLO3VCQU9MLEtBQUs7MEJBT0wsS0FBSzs2QkFPTCxLQUFLOzs0QkF0SFY7RUEwRnVDLGlCQUFpQjtTQUEzQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vKipcbiAqIFJlbmRlcnMgaHRtbCB0ZXh0IGFyZWEgY29tcG9uZW50XG5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqXG4gKiAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgc2VsZWN0b3I6ICdteU5vdGUnICxcbiAqICAgICAgICAgIHRlbXBsYXRlOiAnPGF3LXRleHQtYXJlYSBbdmFsdWVdPVwiaW5wdXRWYWx1ZVwiIFthdXRvUmVzaXplXT1cImF1dG9SZXNpemVcIiA+XG4gKiAgICAgICAgICAgICAgPC9hdy10ZXh0LWFyZWE+J1xuICogICAgICB9KVxuICogICAgICBleHBvcnQgY2xhc3MgTXlOb3RlQ29tcG9uZW50XG4gKiAgICAgIHtcbiAqICAgICAgICAgIGlucHV0VmFsdWU6IHN0cmluZyA9ICdTb21lIHJlYWxseSBsb25nIHRleHQnO1xuICogICAgICAgICAgYXV0b1Jlc2l6ZTogZmFsc2U7XG4gKiAgICAgIH1cbiAqXG4gKiBgYGBcbiAqICBOb3RlOiBpZiB5b3UgYXJlIHVzaW5nIHRoaXMgb3V0c2lkZSBvZiBGb3JtVGFibGUgcGxlYXNlIHByb3ZpZGUgeW91ciBvd24gRm9ybUdyb3VwXG4gKi9cblxuZXhwb3J0IGNvbnN0IFRFWFRBUkVBX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUZXh0QXJlYUNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy10ZXh0LWFyZWEnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImVkaXRhYmxlXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cblxuXHQ8dGV4dGFyZWFcbiAgICAgICAgcElucHV0VGV4dGFyZWFcbiAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgY2xhc3M9XCJ3LXRleHQtYXJlYVwiXG4gICAgICAgIFtjbGFzcy51LXZhbGlkYXRpb24tZXJyb3JdPVwiIShmb3JtQ29udHJvbC52YWxpZCB8fCAoZm9ybUNvbnRyb2wucHJpc3RpbmUpKVwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIGZvcm1Db250cm9sTmFtZT1cInt7bmFtZX19XCJcbiAgICAgICAgW3Jvd3NdPVwicm93c1wiXG4gICAgICAgIFtjb2xzXT1cImNvbHVtbnNcIlxuICAgICAgICBbYXV0b1Jlc2l6ZV09XCJhdXRvUmVzaXplXCJcbiAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2VIb2xkZXJcIlxuXG4gICAgPjwvdGV4dGFyZWE+XG5cbjwvZGl2PlxuXG5cbjxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhZWRpdGFibGVcIj5cbiAgICA8YXctc3RyaW5nIFt2YWx1ZV09XCJ2YWx1ZVwiPjwvYXctc3RyaW5nPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gICAgc3R5bGVzOiBbYGBdLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFRFWFRBUkVBX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGV4dEFyZWFDb21wb25lbnQpfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVGV4dEFyZWFDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQSB2YWx1ZSB1c2VkIHRvIHN0b3JlIGFuZCByZWFkIHVzZXIgaW5wdXRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IGFueSA9ICcnO1xuXG5cbiAgICAvKipcbiAgICAgKiBTcGVmaWZpZXMgdmlzaWJsZSBudW1iZXIgb2YgbGluZXNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHJvd3M6IG51bWJlciA9IDI7XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB2aXNpYmxlIHdpZHRoXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb2x1bW5zOiBudW1iZXIgPSAyMDtcblxuXG4gICAgLyoqXG4gICAgICogd2hlbiB0aGlzIG9wdGlvbiBpcyBUUlVFIGFuZCB1c2VyIHN0YXJ0cyB0eXBpbmcgaXQgd2lsbCBtYXhpbWl6ZSB0ZXh0YXJlYSdzIHdpZHRoIGFuZCBoZWlnaHRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGF1dG9SZXNpemU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEZvcm1Sb3dDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG5cbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnZhbHVlKTtcblxuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgICApLnN1YnNjcmliZSh2YWwgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwuIFBsZWFzZSBzZWUgQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAgICAgKlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSwge29ubHlTZWxmOiB0cnVlfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiJdfQ==