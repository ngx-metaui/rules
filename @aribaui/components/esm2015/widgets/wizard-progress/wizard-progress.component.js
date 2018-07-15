/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * @author amanul.chowdhury
 * Copyright 2018 SAP Ariba
 *
 * WizardProgressComponent can be used as a step progress
 * in a page that has multiple steps
 * `<aw-wizard-progress
 *  [steps]="steps"
 *  [currentStep]="currentStep"
 *  (stepChanged)="onStepChanged($event)">
 * </aw-wizard-progress>`
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * @record
 */
export function Step() { }
function Step_tsickle_Closure_declarations() {
    /** @type {?} */
    Step.prototype.complete;
    /** @type {?} */
    Step.prototype.current;
    /** @type {?|undefined} */
    Step.prototype.title;
}
export class WizardProgressComponent {
    constructor() {
        this.currentStep = 0;
        this.stepChanged = new EventEmitter();
        this.totalSteps = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.steps) {
            let /** @type {?} */ currentIndex = this.steps.indexOf(this.steps.filter(step => step.current)[0]);
            this.totalSteps = this.steps.length;
            this.setCurrentStep(~currentIndex ? currentIndex : 0);
        }
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    setCurrentStep(index = 0) {
        this.steps[index].current = true;
        this.currentStep = index;
        this.stepChanged.emit({ current: this.currentStep });
    }
    /**
     * @param {?} index
     * @return {?}
     */
    goToStep(index) {
        if (!this.steps[index].complete) {
            return;
        }
        let /** @type {?} */ currentIndex = this.steps.indexOf(this.steps.filter(step => step.current)[0]);
        this.steps[currentIndex].current = false;
        this.setCurrentStep(index);
    }
}
WizardProgressComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-wizard-progress',
                template: `<div class="step-indicator">{{currentStep + 1}}/{{totalSteps}}</div>
<div class="aw-step-progress">
    <div class="aw-step-progress__item" *ngFor="let step of steps; let i = index;"
         [ngClass]="{ 'aw-step-progress__item--is-active': step.current === true }"
         (click)="goToStep(i);">
    </div>
</div>
`,
                styles: [`:host{display:block}.step-indicator{width:100%;text-align:center;font-size:14px;font-weight:600;padding-bottom:.3rem}.aw-step-progress{display:flex;flex-direction:row;padding:.2rem;justify-content:center}.aw-step-progress__item{cursor:pointer;list-style:none;width:1.2rem;margin:0 .2rem;border-radius:.3rem;height:.4rem;background-color:#eaeaea}.aw-step-progress__item:last-child{margin-right:0}.aw-step-progress__item:first-child{margin-left:0}.aw-step-progress__item--is-active{background-color:#09a7af}`]
            },] },
];
/** @nocollapse */
WizardProgressComponent.ctorParameters = () => [];
WizardProgressComponent.propDecorators = {
    steps: [{ type: Input }],
    currentStep: [{ type: Input }],
    stepChanged: [{ type: Output }]
};
function WizardProgressComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    WizardProgressComponent.prototype.steps;
    /** @type {?} */
    WizardProgressComponent.prototype.currentStep;
    /** @type {?} */
    WizardProgressComponent.prototype.stepChanged;
    /** @type {?} */
    WizardProgressComponent.prototype.totalSteps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXByb2dyZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3dpemFyZC1wcm9ncmVzcy93aXphcmQtcHJvZ3Jlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQXFCckUsTUFBTTtJQWFGOzJCQVBzQixDQUFDOzJCQUdVLElBQUksWUFBWSxFQUFPOzBCQUVuQyxDQUFDO0tBSXJCOzs7O0lBRUQsUUFBUTtRQUVKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IscUJBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO0tBQ0o7Ozs7O0lBRUQsY0FBYyxDQUFDLFFBQWdCLENBQUM7UUFFNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO0tBQ3REOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQztTQUNWO1FBRUQscUJBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXpDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7OztZQXZESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7O0NBT2I7Z0JBQ0csTUFBTSxFQUFFLENBQUMsMmZBQTJmLENBQUM7YUFDeGdCOzs7OztvQkFHSSxLQUFLOzBCQUdMLEtBQUs7MEJBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIEBhdXRob3IgYW1hbnVsLmNob3dkaHVyeVxuICogQ29weXJpZ2h0IDIwMTggU0FQIEFyaWJhXG4gKlxuICogV2l6YXJkUHJvZ3Jlc3NDb21wb25lbnQgY2FuIGJlIHVzZWQgYXMgYSBzdGVwIHByb2dyZXNzXG4gKiBpbiBhIHBhZ2UgdGhhdCBoYXMgbXVsdGlwbGUgc3RlcHNcbiAqIGA8YXctd2l6YXJkLXByb2dyZXNzXG4gKiAgW3N0ZXBzXT1cInN0ZXBzXCJcbiAqICBbY3VycmVudFN0ZXBdPVwiY3VycmVudFN0ZXBcIlxuICogIChzdGVwQ2hhbmdlZCk9XCJvblN0ZXBDaGFuZ2VkKCRldmVudClcIj5cbiAqIDwvYXctd2l6YXJkLXByb2dyZXNzPmBcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGVwXG57XG4gICAgY29tcGxldGU6IGJvb2xlYW47XG4gICAgY3VycmVudDogYm9vbGVhbjtcbiAgICB0aXRsZT86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy13aXphcmQtcHJvZ3Jlc3MnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInN0ZXAtaW5kaWNhdG9yXCI+e3tjdXJyZW50U3RlcCArIDF9fS97e3RvdGFsU3RlcHN9fTwvZGl2PlxuPGRpdiBjbGFzcz1cImF3LXN0ZXAtcHJvZ3Jlc3NcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYXctc3RlcC1wcm9ncmVzc19faXRlbVwiICpuZ0Zvcj1cImxldCBzdGVwIG9mIHN0ZXBzOyBsZXQgaSA9IGluZGV4O1wiXG4gICAgICAgICBbbmdDbGFzc109XCJ7ICdhdy1zdGVwLXByb2dyZXNzX19pdGVtLS1pcy1hY3RpdmUnOiBzdGVwLmN1cnJlbnQgPT09IHRydWUgfVwiXG4gICAgICAgICAoY2xpY2spPVwiZ29Ub1N0ZXAoaSk7XCI+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e2Rpc3BsYXk6YmxvY2t9LnN0ZXAtaW5kaWNhdG9ye3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NjAwO3BhZGRpbmctYm90dG9tOi4zcmVtfS5hdy1zdGVwLXByb2dyZXNze2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7cGFkZGluZzouMnJlbTtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5hdy1zdGVwLXByb2dyZXNzX19pdGVte2N1cnNvcjpwb2ludGVyO2xpc3Qtc3R5bGU6bm9uZTt3aWR0aDoxLjJyZW07bWFyZ2luOjAgLjJyZW07Ym9yZGVyLXJhZGl1czouM3JlbTtoZWlnaHQ6LjRyZW07YmFja2dyb3VuZC1jb2xvcjojZWFlYWVhfS5hdy1zdGVwLXByb2dyZXNzX19pdGVtOmxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0OjB9LmF3LXN0ZXAtcHJvZ3Jlc3NfX2l0ZW06Zmlyc3QtY2hpbGR7bWFyZ2luLWxlZnQ6MH0uYXctc3RlcC1wcm9ncmVzc19faXRlbS0taXMtYWN0aXZle2JhY2tncm91bmQtY29sb3I6IzA5YTdhZn1gXVxufSlcbmV4cG9ydCBjbGFzcyBXaXphcmRQcm9ncmVzc0NvbXBvbmVudFxue1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcHM6IEFycmF5PFN0ZXA+O1xuXG4gICAgQElucHV0KClcbiAgICBjdXJyZW50U3RlcDogbnVtYmVyID0gMDtcblxuICAgIEBPdXRwdXQoKVxuICAgIHN0ZXBDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgdG90YWxTdGVwczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuc3RlcHMpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50SW5kZXggPSB0aGlzLnN0ZXBzLmluZGV4T2YodGhpcy5zdGVwcy5maWx0ZXIoc3RlcCA9PiBzdGVwLmN1cnJlbnQpWzBdKTtcbiAgICAgICAgICAgIHRoaXMudG90YWxTdGVwcyA9IHRoaXMuc3RlcHMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50U3RlcCh+Y3VycmVudEluZGV4ID8gY3VycmVudEluZGV4IDogMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDdXJyZW50U3RlcChpbmRleDogbnVtYmVyID0gMClcbiAgICB7XG4gICAgICAgIHRoaXMuc3RlcHNbaW5kZXhdLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gaW5kZXg7XG4gICAgICAgIHRoaXMuc3RlcENoYW5nZWQuZW1pdCh7Y3VycmVudDogdGhpcy5jdXJyZW50U3RlcH0pO1xuICAgIH1cblxuICAgIGdvVG9TdGVwKGluZGV4OiBudW1iZXIpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuc3RlcHNbaW5kZXhdLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gdGhpcy5zdGVwcy5pbmRleE9mKHRoaXMuc3RlcHMuZmlsdGVyKHN0ZXAgPT4gc3RlcC5jdXJyZW50KVswXSk7XG4gICAgICAgIHRoaXMuc3RlcHNbY3VycmVudEluZGV4XS5jdXJyZW50ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zZXRDdXJyZW50U3RlcChpbmRleCk7XG4gICAgfVxufVxuIl19