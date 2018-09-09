/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/** *
 *
 * Implements standard HTML radio button on top of PrimeNG with ariba styling
 *
 * ### Example
 *
 * 1. Basic usage using ngModel pre-selected first radio
 *
 *  ```ts
 *
 * \@Component({
 *          selector: 'demo-comp',
 *          template: `
 *              <aw-radiobutton [name]="'color'" [value]="'red'" [label]="'Red'"
 *                             [(ngModel)]="model">
 *             </aw-radiobutton>
 *              <aw-radiobutton [name]="'color'" [value]="'blue'" [label]="'Blue'"
 *                      [(ngModel)]="model">
 *              </aw-radiobutton>
 *      `
 *      })*
 *      class BasicWithNgModelComponent
 *      {
 *          model: string[] = ['red'];
 *
 *          constructor()
 *          {
 *          }
 *      }
 *
 *  ```
 *
 *
 * 2. Basic usage with formGroup
 *
 *
 * ```ts
 * \@Component({
 *           selector: 'demo-comp',
 *           template: `
 *          <div [formGroup]="env.currentForm">
 *               <aw-radiobutton [name]="'color2'" [value]="'red'" [label]="'Red'"
 *               (onChange)="onChange($event)">
 *               </aw-radiobutton>
 *               <aw-radiobutton [name]="'color2'" [value]="'blue'" [label]="'Blue'"
 *               (onChange)="onChange($event)">
 *               </aw-radiobutton>
 *
 *       </div>
 *       `
 *       })
 *       class BasicWithFormGroupComponent implements OnInit
 *       {
 *           model: string = 'blue';
 *
 *           constructor(public env: Environment)
 *           {
 *           }
 *
 *           ngOnInit(): void
 *           {
 *               this.env.currentForm = new FormGroup({});
 *               this.env.currentForm.registerControl('color2', new FormControl(this.model));
 *           }
 *
 *
 *           onChange(event: any): void
 *           {
 *               this.modelSet = event;
 *           }
 *
 *       }
 *  ````
 *
 *
 *
 *
  @type {?} */
export var RAB_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioButtonComponent; }),
    multi: true
};
var RadioButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RadioButtonComponent, _super);
    function RadioButtonComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         *
         * A value associated with this radio
         *
         */
        _this.value = '';
        /**
         * Trigger click event with currrent selected value
         *
         */
        _this.onChange = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    RadioButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (this.isStandalone) {
            _super.prototype.registerFormControl.call(this, this.value);
            this.model = this.formControl.value;
            this.onModelChanged(this.model);
        }
        else {
            this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
        }
    };
    /**
     * Called when radio is clicked. Not using PrimeNG click event as it is fired before
     * the model is changed. Therefore need to listen on (ngModelChange)
     *
     */
    /**
     * Called when radio is clicked. Not using PrimeNG click event as it is fired before
     * the model is changed. Therefore need to listen on (ngModelChange)
     *
     * @param {?} newVal
     * @return {?}
     */
    RadioButtonComponent.prototype.onModelChange = /**
     * Called when radio is clicked. Not using PrimeNG click event as it is fired before
     * the model is changed. Therefore need to listen on (ngModelChange)
     *
     * @param {?} newVal
     * @return {?}
     */
    function (newVal) {
        this.onModelChanged(this.model);
        if (this.isStandalone) {
            this.formControl.setValue(this.model, { emitEvent: true });
        }
        this.onChange.emit(this.model);
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
    RadioButtonComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.model) {
            this.model = value;
            if (this.isStandalone) {
                this.formControl.setValue(this.model, { emitEvent: true });
            }
            this.onModelChanged(this.model);
        }
    };
    RadioButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-radiobutton',
                    template: "<span class=\"w-radiobutton\">\n\n    <ng-template [ngIf]=\"editable \">\n        <p-radioButton [name]=\"name\"\n                       [value]=\"value\"\n                       [label]=\"label\"\n                       [(ngModel)]=\"model\"\n                       [disabled]=\"disabled\"\n                       (ngModelChange)=\"onModelChange($event)\"\n                       [class.u-validation-error]=\"!(formControl.valid || (formControl.pristine))\">\n        </p-radioButton>\n    </ng-template>\n</span>\n",
                    providers: [
                        RAB_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return RadioButtonComponent; }) }
                    ],
                    styles: ["/deep/ .w-radiobutton .ui-radiobutton-box{width:23px;height:23px;line-height:23px}/deep/ .w-radiobutton .ui-radiobutton-icon{font-size:1.5em;line-height:1em}"]
                }] }
    ];
    /** @nocollapse */
    RadioButtonComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return FormRowComponent; }),] }] }
    ]; };
    RadioButtonComponent.propDecorators = {
        value: [{ type: Input }],
        label: [{ type: Input }],
        onChange: [{ type: Output }]
    };
    return RadioButtonComponent;
}(BaseFormComponent));
export { RadioButtonComponent };
if (false) {
    /**
     *
     * A value associated with this radio
     *
     * @type {?}
     */
    RadioButtonComponent.prototype.value;
    /**
     * Label to be used when rendering a radio
     * @type {?}
     */
    RadioButtonComponent.prototype.label;
    /**
     * Trigger click event with currrent selected value
     *
     * @type {?}
     */
    RadioButtonComponent.prototype.onChange;
    /**
     * Internal model to comunicate with primeNg Radio
     * @type {?}
     */
    RadioButtonComponent.prototype.model;
    /** @type {?} */
    RadioButtonComponent.prototype.env;
    /** @type {?} */
    RadioButtonComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBa0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRnRGLFdBQWEsMEJBQTBCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBYXdDLGdEQUFpQjtJQWlDdkQsOEJBQW9CLEdBQWdCLEVBRWIsZUFBa0M7UUFGekQsWUFJSSxrQkFBTSxHQUFHLEVBQUUsZUFBZSxDQUFDLFNBQzlCO1FBTG1CLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7OztzQkExQjVDLEVBQUU7Ozs7O3lCQWVlLElBQUksWUFBWSxFQUFFOztLQWMvQzs7OztJQUVELHVDQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLGlCQUFNLG1CQUFtQixZQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRW5DO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsV0FBVyxxQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7U0FDdkU7S0FDSjtJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsNENBQWE7Ozs7Ozs7SUFBYixVQUFlLE1BQVc7UUFFdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gseUNBQVU7Ozs7OztJQUFWLFVBQVksS0FBVTtRQUVsQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzthQUM1RDtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7O2dCQTNGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsZ2hCQUEwQztvQkFHMUMsU0FBUyxFQUFFO3dCQUNQLDBCQUEwQjt3QkFDMUIsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQW9CLEVBQXBCLENBQW9CLENBQUMsRUFBQztxQkFDcEY7O2lCQUNKOzs7O2dCQW5HTyxXQUFXO2dCQUNYLGlCQUFpQix1QkFxSVAsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxnQkFBZ0IsRUFBaEIsQ0FBZ0IsQ0FBQzs7O3dCQTFCOUUsS0FBSzt3QkFPTCxLQUFLOzJCQVFMLE1BQU07OytCQXhKWDtFQWlJMEMsaUJBQWlCO1NBQTlDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcblxuXG4vKipcbiAqXG4gKiBJbXBsZW1lbnRzIHN0YW5kYXJkIEhUTUwgcmFkaW8gYnV0dG9uIG9uIHRvcCBvZiBQcmltZU5HIHdpdGggYXJpYmEgc3R5bGluZ1xuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogMS4gQmFzaWMgdXNhZ2UgdXNpbmcgbmdNb2RlbCBwcmUtc2VsZWN0ZWQgZmlyc3QgcmFkaW9cbiAqXG4gKiAgYGBgdHNcbiAqXG4gKiAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgc2VsZWN0b3I6ICdkZW1vLWNvbXAnLFxuICogICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICA8YXctcmFkaW9idXR0b24gW25hbWVdPVwiJ2NvbG9yJ1wiIFt2YWx1ZV09XCIncmVkJ1wiIFtsYWJlbF09XCInUmVkJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbFwiPlxuICogICAgICAgICAgICAgPC9hdy1yYWRpb2J1dHRvbj5cbiAqICAgICAgICAgICAgICA8YXctcmFkaW9idXR0b24gW25hbWVdPVwiJ2NvbG9yJ1wiIFt2YWx1ZV09XCInYmx1ZSdcIiBbbGFiZWxdPVwiJ0JsdWUnXCJcbiAqICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWxcIj5cbiAqICAgICAgICAgICAgICA8L2F3LXJhZGlvYnV0dG9uPlxuICogICAgICBgXG4gKiAgICAgIH0pKlxuICogICAgICBjbGFzcyBCYXNpY1dpdGhOZ01vZGVsQ29tcG9uZW50XG4gKiAgICAgIHtcbiAqICAgICAgICAgIG1vZGVsOiBzdHJpbmdbXSA9IFsncmVkJ107XG4gKlxuICogICAgICAgICAgY29uc3RydWN0b3IoKVxuICogICAgICAgICAge1xuICogICAgICAgICAgfVxuICogICAgICB9XG4gKlxuICogIGBgYFxuICpcbiAqXG4gKiAyLiBCYXNpYyB1c2FnZSB3aXRoIGZvcm1Hcm91cFxuICpcbiAqXG4gKiBgYGB0c1xuICogICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICAgc2VsZWN0b3I6ICdkZW1vLWNvbXAnLFxuICogICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICA8ZGl2IFtmb3JtR3JvdXBdPVwiZW52LmN1cnJlbnRGb3JtXCI+XG4gKiAgICAgICAgICAgICAgIDxhdy1yYWRpb2J1dHRvbiBbbmFtZV09XCInY29sb3IyJ1wiIFt2YWx1ZV09XCIncmVkJ1wiIFtsYWJlbF09XCInUmVkJ1wiXG4gKiAgICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCI+XG4gKiAgICAgICAgICAgICAgIDwvYXctcmFkaW9idXR0b24+XG4gKiAgICAgICAgICAgICAgIDxhdy1yYWRpb2J1dHRvbiBbbmFtZV09XCInY29sb3IyJ1wiIFt2YWx1ZV09XCInYmx1ZSdcIiBbbGFiZWxdPVwiJ0JsdWUnXCJcbiAqICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIj5cbiAqICAgICAgICAgICAgICAgPC9hdy1yYWRpb2J1dHRvbj5cbiAqXG4gKiAgICAgICA8L2Rpdj5cbiAqICAgICAgIGBcbiAqICAgICAgIH0pXG4gKiAgICAgICBjbGFzcyBCYXNpY1dpdGhGb3JtR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbiAqICAgICAgIHtcbiAqICAgICAgICAgICBtb2RlbDogc3RyaW5nID0gJ2JsdWUnO1xuICpcbiAqICAgICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAqICAgICAgICAgICB7XG4gKiAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICBuZ09uSW5pdCgpOiB2b2lkXG4gKiAgICAgICAgICAge1xuICogICAgICAgICAgICAgICB0aGlzLmVudi5jdXJyZW50Rm9ybSA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICogICAgICAgICAgICAgICB0aGlzLmVudi5jdXJyZW50Rm9ybS5yZWdpc3RlckNvbnRyb2woJ2NvbG9yMicsIG5ldyBGb3JtQ29udHJvbCh0aGlzLm1vZGVsKSk7XG4gKiAgICAgICAgICAgfVxuICpcbiAqXG4gKiAgICAgICAgICAgb25DaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWRcbiAqICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgIHRoaXMubW9kZWxTZXQgPSBldmVudDtcbiAqICAgICAgICAgICB9XG4gKlxuICogICAgICAgfVxuICogIGBgYGBcbiAqXG4gKlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBSQUJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvQnV0dG9uQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXJhZGlvYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3JhZGlvLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3JhZGlvLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFJBQl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvQnV0dG9uQ29tcG9uZW50KX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhpcyByYWRpb1xuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55ID0gJyc7XG5cblxuICAgIC8qKlxuICAgICAqIExhYmVsIHRvIGJlIHVzZWQgd2hlbiByZW5kZXJpbmcgYSByYWRpb1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBjbGljayBldmVudCB3aXRoIGN1cnJyZW50IHNlbGVjdGVkIHZhbHVlXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1vZGVsIHRvIGNvbXVuaWNhdGUgd2l0aCBwcmltZU5nIFJhZGlvXG4gICAgICovXG4gICAgbW9kZWw6IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0ICgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5tb2RlbCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSA8Rm9ybUNvbnRyb2w+IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW3RoaXMubmFtZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiByYWRpbyBpcyBjbGlja2VkLiBOb3QgdXNpbmcgUHJpbWVORyBjbGljayBldmVudCBhcyBpdCBpcyBmaXJlZCBiZWZvcmVcbiAgICAgKiB0aGUgbW9kZWwgaXMgY2hhbmdlZC4gVGhlcmVmb3JlIG5lZWQgdG8gbGlzdGVuIG9uIChuZ01vZGVsQ2hhbmdlKVxuICAgICAqXG4gICAgICovXG4gICAgb25Nb2RlbENoYW5nZSAobmV3VmFsOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMubW9kZWwpO1xuICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5tb2RlbCwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0aGlzLm1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSAodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLm1vZGVsLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5tb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==