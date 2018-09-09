/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
import { distinctUntilChanged } from 'rxjs/operators';
/** *
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
  @type {?} */
export var TEXTAREA_CONTROL_VALUE_ACCESSOR = {
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
                    providers: [
                        TEXTAREA_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return TextAreaComponent; }) }
                    ],
                    styles: [""]
                }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3RleHQtYXJlYS90ZXh0LWFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJwRCxXQUFhLCtCQUErQixHQUFRO0lBQ2hELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDOztJQWFxQyw2Q0FBaUI7SUErQnBELDJCQUFtQixHQUFnQixFQUViLGVBQWtDO1FBRnhELFlBSUksa0JBQU0sR0FBRyxFQUFFLGVBQWUsQ0FBQyxTQUM5QjtRQUxrQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIscUJBQWUsR0FBZixlQUFlLENBQW1COzs7Ozs7c0JBekIzQyxFQUFFOzs7O3FCQU9BLENBQUM7Ozs7d0JBT0UsRUFBRTs7OzsyQkFPRSxJQUFJOztLQU96Qjs7OztJQUVELG9DQUFROzs7SUFBUjtRQUFBLGlCQWFDO1FBVkcsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsaUJBQU0sbUJBQW1CLFlBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDOUIsb0JBQW9CLEVBQUUsQ0FDekIsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBRVgsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO0tBQ047SUFHRDs7O09BR0c7Ozs7Ozs7SUFDSCxzQ0FBVTs7Ozs7O0lBQVYsVUFBVyxLQUFVO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUN0RDtLQUVKOztnQkEzRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4QixtbEJBQXVDO29CQUd2QyxTQUFTLEVBQUU7d0JBQ1AsK0JBQStCO3dCQUMvQixFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQyxFQUFDO3FCQUNqRjs7aUJBQ0o7Ozs7Z0JBN0NPLFdBQVc7Z0JBQ1gsaUJBQWlCLHVCQTZFUixRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDOzs7d0JBekI3RSxLQUFLO3VCQU9MLEtBQUs7MEJBT0wsS0FBSzs2QkFPTCxLQUFLOzs0QkFoR1Y7RUFvRXVDLGlCQUFpQjtTQUEzQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vKipcbiAqIFJlbmRlcnMgaHRtbCB0ZXh0IGFyZWEgY29tcG9uZW50XG5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqXG4gKiAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgc2VsZWN0b3I6ICdteU5vdGUnICxcbiAqICAgICAgICAgIHRlbXBsYXRlOiAnPGF3LXRleHQtYXJlYSBbdmFsdWVdPVwiaW5wdXRWYWx1ZVwiIFthdXRvUmVzaXplXT1cImF1dG9SZXNpemVcIiA+XG4gKiAgICAgICAgICAgICAgPC9hdy10ZXh0LWFyZWE+J1xuICogICAgICB9KVxuICogICAgICBleHBvcnQgY2xhc3MgTXlOb3RlQ29tcG9uZW50XG4gKiAgICAgIHtcbiAqICAgICAgICAgIGlucHV0VmFsdWU6IHN0cmluZyA9ICdTb21lIHJlYWxseSBsb25nIHRleHQnO1xuICogICAgICAgICAgYXV0b1Jlc2l6ZTogZmFsc2U7XG4gKiAgICAgIH1cbiAqXG4gKiBgYGBcbiAqICBOb3RlOiBpZiB5b3UgYXJlIHVzaW5nIHRoaXMgb3V0c2lkZSBvZiBGb3JtVGFibGUgcGxlYXNlIHByb3ZpZGUgeW91ciBvd24gRm9ybUdyb3VwXG4gKi9cblxuZXhwb3J0IGNvbnN0IFRFWFRBUkVBX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUZXh0QXJlYUNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy10ZXh0LWFyZWEnLFxuICAgIHRlbXBsYXRlVXJsOiAndGV4dC1hcmVhLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsndGV4dC1hcmVhLmNvbXBvbmVudC5zY3NzJ10sXG5cbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVEVYVEFSRUFfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUZXh0QXJlYUNvbXBvbmVudCl9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYUNvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBBIHZhbHVlIHVzZWQgdG8gc3RvcmUgYW5kIHJlYWQgdXNlciBpbnB1dFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55ID0gJyc7XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWZpZmllcyB2aXNpYmxlIG51bWJlciBvZiBsaW5lc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcm93czogbnVtYmVyID0gMjtcblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHZpc2libGUgd2lkdGhcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbHVtbnM6IG51bWJlciA9IDIwO1xuXG5cbiAgICAvKipcbiAgICAgKiB3aGVuIHRoaXMgb3B0aW9uIGlzIFRSVUUgYW5kIHVzZXIgc3RhcnRzIHR5cGluZyBpdCB3aWxsIG1heGltaXplIHRleHRhcmVhJ3Mgd2lkdGggYW5kIGhlaWdodFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXV0b1Jlc2l6ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcblxuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICAgICkuc3Vic2NyaWJlKHZhbCA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlLCB7b25seVNlbGY6IHRydWV9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIl19