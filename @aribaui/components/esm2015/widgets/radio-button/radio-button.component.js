/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export const RAB_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
};
export class RadioButtonComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         *
         * A value associated with this radio
         *
         */
        this.value = '';
        /**
         * Trigger click event with currrent selected value
         *
         */
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.isStandalone) {
            super.registerFormControl(this.value);
            this.model = this.formControl.value;
            this.onModelChanged(this.model);
        }
        else {
            this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
        }
    }
    /**
     * Called when radio is clicked. Not using PrimeNG click event as it is fired before
     * the model is changed. Therefore need to listen on (ngModelChange)
     *
     * @param {?} newVal
     * @return {?}
     */
    onModelChange(newVal) {
        this.onModelChanged(this.model);
        if (this.isStandalone) {
            this.formControl.setValue(this.model, { emitEvent: true });
        }
        this.onChange.emit(this.model);
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.model) {
            this.model = value;
            if (this.isStandalone) {
                this.formControl.setValue(this.model, { emitEvent: true });
            }
            this.onModelChanged(this.model);
        }
    }
}
RadioButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-radiobutton',
                template: "<span class=\"w-radiobutton\">\n\n    <ng-template [ngIf]=\"editable \">\n        <p-radioButton [name]=\"name\"\n                       [value]=\"value\"\n                       [label]=\"label\"\n                       [(ngModel)]=\"model\"\n                       [disabled]=\"disabled\"\n                       (ngModelChange)=\"onModelChange($event)\"\n                       [class.u-validation-error]=\"!(formControl.valid || (formControl.pristine))\">\n        </p-radioButton>\n    </ng-template>\n</span>\n",
                providers: [
                    RAB_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => RadioButtonComponent) }
                ],
                styles: ["/deep/ .w-radiobutton .ui-radiobutton-box{width:23px;height:23px;line-height:23px}/deep/ .w-radiobutton .ui-radiobutton-icon{font-size:1.5em;line-height:1em}"]
            }] }
];
/** @nocollapse */
RadioButtonComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
RadioButtonComponent.propDecorators = {
    value: [{ type: Input }],
    label: [{ type: Input }],
    onChange: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlGdEYsYUFBYSwwQkFBMEIsR0FBUTtJQUMzQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBYUYsTUFBTSwyQkFBNEIsU0FBUSxpQkFBaUI7Ozs7O0lBaUN2RCxZQUFvQixHQUFnQixFQUViLGVBQWtDO1FBRXJELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKWixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIsb0JBQWUsR0FBZixlQUFlLENBQW1COzs7Ozs7cUJBMUI1QyxFQUFFOzs7Ozt3QkFlZSxJQUFJLFlBQVksRUFBRTtLQWMvQzs7OztJQUVELFFBQVE7UUFFSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRW5DO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsV0FBVyxxQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7U0FDdkU7S0FDSjs7Ozs7Ozs7SUFPRCxhQUFhLENBQUUsTUFBVztRQUV0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7Ozs7Ozs7SUFNRCxVQUFVLENBQUUsS0FBVTtRQUVsQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzthQUM1RDtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7OztZQTNGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZ2hCQUEwQztnQkFHMUMsU0FBUyxFQUFFO29CQUNQLDBCQUEwQjtvQkFDMUIsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFDO2lCQUNwRjs7YUFDSjs7OztZQW5HTyxXQUFXO1lBQ1gsaUJBQWlCLHVCQXFJUCxRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7OztvQkExQjlFLEtBQUs7b0JBT0wsS0FBSzt1QkFRTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuXG5cbi8qKlxuICpcbiAqIEltcGxlbWVudHMgc3RhbmRhcmQgSFRNTCByYWRpbyBidXR0b24gb24gdG9wIG9mIFByaW1lTkcgd2l0aCBhcmliYSBzdHlsaW5nXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiAxLiBCYXNpYyB1c2FnZSB1c2luZyBuZ01vZGVsIHByZS1zZWxlY3RlZCBmaXJzdCByYWRpb1xuICpcbiAqICBgYGB0c1xuICpcbiAqICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICBzZWxlY3RvcjogJ2RlbW8tY29tcCcsXG4gKiAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgIDxhdy1yYWRpb2J1dHRvbiBbbmFtZV09XCInY29sb3InXCIgW3ZhbHVlXT1cIidyZWQnXCIgW2xhYmVsXT1cIidSZWQnXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsXCI+XG4gKiAgICAgICAgICAgICA8L2F3LXJhZGlvYnV0dG9uPlxuICogICAgICAgICAgICAgIDxhdy1yYWRpb2J1dHRvbiBbbmFtZV09XCInY29sb3InXCIgW3ZhbHVlXT1cIidibHVlJ1wiIFtsYWJlbF09XCInQmx1ZSdcIlxuICogICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbFwiPlxuICogICAgICAgICAgICAgIDwvYXctcmFkaW9idXR0b24+XG4gKiAgICAgIGBcbiAqICAgICAgfSkqXG4gKiAgICAgIGNsYXNzIEJhc2ljV2l0aE5nTW9kZWxDb21wb25lbnRcbiAqICAgICAge1xuICogICAgICAgICAgbW9kZWw6IHN0cmluZ1tdID0gWydyZWQnXTtcbiAqXG4gKiAgICAgICAgICBjb25zdHJ1Y3RvcigpXG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICB9XG4gKiAgICAgIH1cbiAqXG4gKiAgYGBgXG4gKlxuICpcbiAqIDIuIEJhc2ljIHVzYWdlIHdpdGggZm9ybUdyb3VwXG4gKlxuICpcbiAqIGBgYHRzXG4gKiAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICBzZWxlY3RvcjogJ2RlbW8tY29tcCcsXG4gKiAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJlbnYuY3VycmVudEZvcm1cIj5cbiAqICAgICAgICAgICAgICAgPGF3LXJhZGlvYnV0dG9uIFtuYW1lXT1cIidjb2xvcjInXCIgW3ZhbHVlXT1cIidyZWQnXCIgW2xhYmVsXT1cIidSZWQnXCJcbiAqICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIj5cbiAqICAgICAgICAgICAgICAgPC9hdy1yYWRpb2J1dHRvbj5cbiAqICAgICAgICAgICAgICAgPGF3LXJhZGlvYnV0dG9uIFtuYW1lXT1cIidjb2xvcjInXCIgW3ZhbHVlXT1cIidibHVlJ1wiIFtsYWJlbF09XCInQmx1ZSdcIlxuICogICAgICAgICAgICAgICAob25DaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiPlxuICogICAgICAgICAgICAgICA8L2F3LXJhZGlvYnV0dG9uPlxuICpcbiAqICAgICAgIDwvZGl2PlxuICogICAgICAgYFxuICogICAgICAgfSlcbiAqICAgICAgIGNsYXNzIEJhc2ljV2l0aEZvcm1Hcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxuICogICAgICAge1xuICogICAgICAgICAgIG1vZGVsOiBzdHJpbmcgPSAnYmx1ZSc7XG4gKlxuICogICAgICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICogICAgICAgICAgIHtcbiAqICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgIG5nT25Jbml0KCk6IHZvaWRcbiAqICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgIHRoaXMuZW52LmN1cnJlbnRGb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gKiAgICAgICAgICAgICAgIHRoaXMuZW52LmN1cnJlbnRGb3JtLnJlZ2lzdGVyQ29udHJvbCgnY29sb3IyJywgbmV3IEZvcm1Db250cm9sKHRoaXMubW9kZWwpKTtcbiAqICAgICAgICAgICB9XG4gKlxuICpcbiAqICAgICAgICAgICBvbkNoYW5nZShldmVudDogYW55KTogdm9pZFxuICogICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgdGhpcy5tb2RlbFNldCA9IGV2ZW50O1xuICogICAgICAgICAgIH1cbiAqXG4gKiAgICAgICB9XG4gKiAgYGBgYFxuICpcbiAqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IFJBQl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9CdXR0b25Db21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcmFkaW9idXR0b24nLFxuICAgIHRlbXBsYXRlVXJsOiAncmFkaW8tYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsncmFkaW8tYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXG5cbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgUkFCX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9CdXR0b25Db21wb25lbnQpfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9CdXR0b25Db21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBBIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHJhZGlvXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBhbnkgPSAnJztcblxuXG4gICAgLyoqXG4gICAgICogTGFiZWwgdG8gYmUgdXNlZCB3aGVuIHJlbmRlcmluZyBhIHJhZGlvXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsYWJlbDogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGNsaWNrIGV2ZW50IHdpdGggY3VycnJlbnQgc2VsZWN0ZWQgdmFsdWVcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbW9kZWwgdG8gY29tdW5pY2F0ZSB3aXRoIHByaW1lTmcgUmFkaW9cbiAgICAgKi9cbiAgICBtb2RlbDogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQgKClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIGlmICh0aGlzLmlzU3RhbmRhbG9uZSkge1xuICAgICAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLm1vZGVsKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IDxGb3JtQ29udHJvbD4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHNbdGhpcy5uYW1lXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHJhZGlvIGlzIGNsaWNrZWQuIE5vdCB1c2luZyBQcmltZU5HIGNsaWNrIGV2ZW50IGFzIGl0IGlzIGZpcmVkIGJlZm9yZVxuICAgICAqIHRoZSBtb2RlbCBpcyBjaGFuZ2VkLiBUaGVyZWZvcmUgbmVlZCB0byBsaXN0ZW4gb24gKG5nTW9kZWxDaGFuZ2UpXG4gICAgICpcbiAgICAgKi9cbiAgICBvbk1vZGVsQ2hhbmdlIChuZXdWYWw6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5tb2RlbCk7XG4gICAgICAgIGlmICh0aGlzLmlzU3RhbmRhbG9uZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLm1vZGVsLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICpcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlICh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMubW9kZWwsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLm1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIl19