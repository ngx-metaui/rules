/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
/**
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
 */
export const /** @type {?} */ RAB_CONTROL_VALUE_ACCESSOR = {
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
                template: `<span class="w-radiobutton">

    <ng-template [ngIf]="editable ">
        <p-radioButton [name]="name"
                       [value]="value"
                       [label]="label"
                       [(ngModel)]="model"
                       [disabled]="disabled"
                       (ngModelChange)="onModelChange($event)"
                       [class.u-validation-error]="!(formControl.valid || (formControl.pristine))">
        </p-radioButton>
    </ng-template>
</span>
`,
                styles: [`/deep/ .w-radiobutton .ui-radiobutton-box{width:23px;height:23px;line-height:23px}/deep/ .w-radiobutton .ui-radiobutton-icon{font-size:1.5em;line-height:1em}`],
                providers: [
                    RAB_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => RadioButtonComponent) }
                ]
            },] },
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
function RadioButtonComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlGdEYsTUFBTSxDQUFDLHVCQUFNLDBCQUEwQixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUEwQkYsTUFBTSwyQkFBNEIsU0FBUSxpQkFBaUI7Ozs7O0lBaUN2RCxZQUFvQixHQUFnQixFQUViLGVBQWtDO1FBRXJELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKWixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIsb0JBQWUsR0FBZixlQUFlLENBQW1COzs7Ozs7cUJBMUI1QyxFQUFFOzs7Ozt3QkFlZSxJQUFJLFlBQVksRUFBRTtLQWMvQzs7OztJQUVELFFBQVE7UUFFSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBRW5DO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsV0FBVyxxQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7U0FDdkU7S0FDSjs7Ozs7Ozs7SUFPRCxhQUFhLENBQUUsTUFBVztRQUV0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7Ozs7Ozs7SUFNRCxVQUFVLENBQUUsS0FBVTtRQUVsQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzthQUM1RDtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0tBQ0o7OztZQXhHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0NBYWI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsK0pBQStKLENBQUM7Z0JBRXpLLFNBQVMsRUFBRTtvQkFDUCwwQkFBMEI7b0JBQzFCLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBQztpQkFDcEY7YUFDSjs7OztZQWhITyxXQUFXO1lBQ1gsaUJBQWlCLHVCQWtKUCxRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7OztvQkExQjlFLEtBQUs7b0JBT0wsS0FBSzt1QkFRTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uLy4uL2xheW91dHMvZm9ybS10YWJsZS9mb3JtLXJvdy9mb3JtLXJvdy5jb21wb25lbnQnO1xuXG5cbi8qKlxuICpcbiAqIEltcGxlbWVudHMgc3RhbmRhcmQgSFRNTCByYWRpbyBidXR0b24gb24gdG9wIG9mIFByaW1lTkcgd2l0aCBhcmliYSBzdHlsaW5nXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiAxLiBCYXNpYyB1c2FnZSB1c2luZyBuZ01vZGVsIHByZS1zZWxlY3RlZCBmaXJzdCByYWRpb1xuICpcbiAqICBgYGB0c1xuICpcbiAqICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICBzZWxlY3RvcjogJ2RlbW8tY29tcCcsXG4gKiAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgIDxhdy1yYWRpb2J1dHRvbiBbbmFtZV09XCInY29sb3InXCIgW3ZhbHVlXT1cIidyZWQnXCIgW2xhYmVsXT1cIidSZWQnXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsXCI+XG4gKiAgICAgICAgICAgICA8L2F3LXJhZGlvYnV0dG9uPlxuICogICAgICAgICAgICAgIDxhdy1yYWRpb2J1dHRvbiBbbmFtZV09XCInY29sb3InXCIgW3ZhbHVlXT1cIidibHVlJ1wiIFtsYWJlbF09XCInQmx1ZSdcIlxuICogICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbFwiPlxuICogICAgICAgICAgICAgIDwvYXctcmFkaW9idXR0b24+XG4gKiAgICAgIGBcbiAqICAgICAgfSkqXG4gKiAgICAgIGNsYXNzIEJhc2ljV2l0aE5nTW9kZWxDb21wb25lbnRcbiAqICAgICAge1xuICogICAgICAgICAgbW9kZWw6IHN0cmluZ1tdID0gWydyZWQnXTtcbiAqXG4gKiAgICAgICAgICBjb25zdHJ1Y3RvcigpXG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICB9XG4gKiAgICAgIH1cbiAqXG4gKiAgYGBgXG4gKlxuICpcbiAqIDIuIEJhc2ljIHVzYWdlIHdpdGggZm9ybUdyb3VwXG4gKlxuICpcbiAqIGBgYHRzXG4gKiAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICBzZWxlY3RvcjogJ2RlbW8tY29tcCcsXG4gKiAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgIDxkaXYgW2Zvcm1Hcm91cF09XCJlbnYuY3VycmVudEZvcm1cIj5cbiAqICAgICAgICAgICAgICAgPGF3LXJhZGlvYnV0dG9uIFtuYW1lXT1cIidjb2xvcjInXCIgW3ZhbHVlXT1cIidyZWQnXCIgW2xhYmVsXT1cIidSZWQnXCJcbiAqICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIj5cbiAqICAgICAgICAgICAgICAgPC9hdy1yYWRpb2J1dHRvbj5cbiAqICAgICAgICAgICAgICAgPGF3LXJhZGlvYnV0dG9uIFtuYW1lXT1cIidjb2xvcjInXCIgW3ZhbHVlXT1cIidibHVlJ1wiIFtsYWJlbF09XCInQmx1ZSdcIlxuICogICAgICAgICAgICAgICAob25DaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiPlxuICogICAgICAgICAgICAgICA8L2F3LXJhZGlvYnV0dG9uPlxuICpcbiAqICAgICAgIDwvZGl2PlxuICogICAgICAgYFxuICogICAgICAgfSlcbiAqICAgICAgIGNsYXNzIEJhc2ljV2l0aEZvcm1Hcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxuICogICAgICAge1xuICogICAgICAgICAgIG1vZGVsOiBzdHJpbmcgPSAnYmx1ZSc7XG4gKlxuICogICAgICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICogICAgICAgICAgIHtcbiAqICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgIG5nT25Jbml0KCk6IHZvaWRcbiAqICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgIHRoaXMuZW52LmN1cnJlbnRGb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gKiAgICAgICAgICAgICAgIHRoaXMuZW52LmN1cnJlbnRGb3JtLnJlZ2lzdGVyQ29udHJvbCgnY29sb3IyJywgbmV3IEZvcm1Db250cm9sKHRoaXMubW9kZWwpKTtcbiAqICAgICAgICAgICB9XG4gKlxuICpcbiAqICAgICAgICAgICBvbkNoYW5nZShldmVudDogYW55KTogdm9pZFxuICogICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgdGhpcy5tb2RlbFNldCA9IGV2ZW50O1xuICogICAgICAgICAgIH1cbiAqXG4gKiAgICAgICB9XG4gKiAgYGBgYFxuICpcbiAqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IFJBQl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9CdXR0b25Db21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcmFkaW9idXR0b24nLFxuICAgIHRlbXBsYXRlOiBgPHNwYW4gY2xhc3M9XCJ3LXJhZGlvYnV0dG9uXCI+XG5cbiAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiZWRpdGFibGUgXCI+XG4gICAgICAgIDxwLXJhZGlvQnV0dG9uIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbGFiZWxdPVwibGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25Nb2RlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLnUtdmFsaWRhdGlvbi1lcnJvcl09XCIhKGZvcm1Db250cm9sLnZhbGlkIHx8IChmb3JtQ29udHJvbC5wcmlzdGluZSkpXCI+XG4gICAgICAgIDwvcC1yYWRpb0J1dHRvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9zcGFuPlxuYCxcbiAgICBzdHlsZXM6IFtgL2RlZXAvIC53LXJhZGlvYnV0dG9uIC51aS1yYWRpb2J1dHRvbi1ib3h7d2lkdGg6MjNweDtoZWlnaHQ6MjNweDtsaW5lLWhlaWdodDoyM3B4fS9kZWVwLyAudy1yYWRpb2J1dHRvbiAudWktcmFkaW9idXR0b24taWNvbntmb250LXNpemU6MS41ZW07bGluZS1oZWlnaHQ6MWVtfWBdLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFJBQl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvQnV0dG9uQ29tcG9uZW50KX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhpcyByYWRpb1xuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55ID0gJyc7XG5cblxuICAgIC8qKlxuICAgICAqIExhYmVsIHRvIGJlIHVzZWQgd2hlbiByZW5kZXJpbmcgYSByYWRpb1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBjbGljayBldmVudCB3aXRoIGN1cnJyZW50IHNlbGVjdGVkIHZhbHVlXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1vZGVsIHRvIGNvbXVuaWNhdGUgd2l0aCBwcmltZU5nIFJhZGlvXG4gICAgICovXG4gICAgbW9kZWw6IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuICAgIG5nT25Jbml0ICgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5tb2RlbCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSA8Rm9ybUNvbnRyb2w+IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW3RoaXMubmFtZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiByYWRpbyBpcyBjbGlja2VkLiBOb3QgdXNpbmcgUHJpbWVORyBjbGljayBldmVudCBhcyBpdCBpcyBmaXJlZCBiZWZvcmVcbiAgICAgKiB0aGUgbW9kZWwgaXMgY2hhbmdlZC4gVGhlcmVmb3JlIG5lZWQgdG8gbGlzdGVuIG9uIChuZ01vZGVsQ2hhbmdlKVxuICAgICAqXG4gICAgICovXG4gICAgb25Nb2RlbENoYW5nZSAobmV3VmFsOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMubW9kZWwpO1xuICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5tb2RlbCwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0aGlzLm1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSAodmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLm1vZGVsLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5tb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==