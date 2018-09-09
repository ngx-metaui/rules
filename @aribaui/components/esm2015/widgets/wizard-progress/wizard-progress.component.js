/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
/** @type {?} */
Step.prototype.complete;
/** @type {?} */
Step.prototype.current;
/** @type {?|undefined} */
Step.prototype.title;
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
            /** @type {?} */
            let currentIndex = this.steps.indexOf(this.steps.filter(step => step.current)[0]);
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
        /** @type {?} */
        let currentIndex = this.steps.indexOf(this.steps.filter(step => step.current)[0]);
        this.steps[currentIndex].current = false;
        this.setCurrentStep(index);
    }
}
WizardProgressComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-wizard-progress',
                template: "<div class=\"step-indicator\">{{currentStep + 1}}/{{totalSteps}}</div>\n<div class=\"aw-step-progress\">\n    <div class=\"aw-step-progress__item\" *ngFor=\"let step of steps; let i = index;\"\n         [ngClass]=\"{ 'aw-step-progress__item--is-active': step.current === true }\"\n         (click)=\"goToStep(i);\">\n    </div>\n</div>\n",
                styles: [":host{display:block}.step-indicator{width:100%;text-align:center;font-size:14px;font-weight:600;padding-bottom:.3rem}.aw-step-progress{display:flex;flex-direction:row;padding:.2rem;justify-content:center}.aw-step-progress__item{cursor:pointer;list-style:none;width:1.2rem;margin:0 .2rem;border-radius:.3rem;height:.4rem;background-color:#eaeaea}.aw-step-progress__item:last-child{margin-right:0}.aw-step-progress__item:first-child{margin-left:0}.aw-step-progress__item--is-active{background-color:#09a7af}"]
            }] }
];
/** @nocollapse */
WizardProgressComponent.ctorParameters = () => [];
WizardProgressComponent.propDecorators = {
    steps: [{ type: Input }],
    currentStep: [{ type: Input }],
    stepChanged: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    WizardProgressComponent.prototype.steps;
    /** @type {?} */
    WizardProgressComponent.prototype.currentStep;
    /** @type {?} */
    WizardProgressComponent.prototype.stepChanged;
    /** @type {?} */
    WizardProgressComponent.prototype.totalSteps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXByb2dyZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3dpemFyZC1wcm9ncmVzcy93aXphcmQtcHJvZ3Jlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7QUFjckUsTUFBTTtJQWFGOzJCQVBzQixDQUFDOzJCQUdVLElBQUksWUFBWSxFQUFPOzBCQUVuQyxDQUFDO0tBSXJCOzs7O0lBRUQsUUFBUTtRQUVKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUNiLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO0tBQ0o7Ozs7O0lBRUQsY0FBYyxDQUFDLFFBQWdCLENBQUM7UUFFNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO0tBQ3REOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQztTQUNWOztRQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXpDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7OztZQWhESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsNlZBQStDOzthQUVsRDs7Ozs7b0JBR0ksS0FBSzswQkFHTCxLQUFLOzBCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBAYXV0aG9yIGFtYW51bC5jaG93ZGh1cnlcbiAqIENvcHlyaWdodCAyMDE4IFNBUCBBcmliYVxuICpcbiAqIFdpemFyZFByb2dyZXNzQ29tcG9uZW50IGNhbiBiZSB1c2VkIGFzIGEgc3RlcCBwcm9ncmVzc1xuICogaW4gYSBwYWdlIHRoYXQgaGFzIG11bHRpcGxlIHN0ZXBzXG4gKiBgPGF3LXdpemFyZC1wcm9ncmVzc1xuICogIFtzdGVwc109XCJzdGVwc1wiXG4gKiAgW2N1cnJlbnRTdGVwXT1cImN1cnJlbnRTdGVwXCJcbiAqICAoc3RlcENoYW5nZWQpPVwib25TdGVwQ2hhbmdlZCgkZXZlbnQpXCI+XG4gKiA8L2F3LXdpemFyZC1wcm9ncmVzcz5gXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RlcFxue1xuICAgIGNvbXBsZXRlOiBib29sZWFuO1xuICAgIGN1cnJlbnQ6IGJvb2xlYW47XG4gICAgdGl0bGU/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctd2l6YXJkLXByb2dyZXNzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vd2l6YXJkLXByb2dyZXNzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi93aXphcmQtcHJvZ3Jlc3MuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBXaXphcmRQcm9ncmVzc0NvbXBvbmVudFxue1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcHM6IEFycmF5PFN0ZXA+O1xuXG4gICAgQElucHV0KClcbiAgICBjdXJyZW50U3RlcDogbnVtYmVyID0gMDtcblxuICAgIEBPdXRwdXQoKVxuICAgIHN0ZXBDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgdG90YWxTdGVwczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuc3RlcHMpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50SW5kZXggPSB0aGlzLnN0ZXBzLmluZGV4T2YodGhpcy5zdGVwcy5maWx0ZXIoc3RlcCA9PiBzdGVwLmN1cnJlbnQpWzBdKTtcbiAgICAgICAgICAgIHRoaXMudG90YWxTdGVwcyA9IHRoaXMuc3RlcHMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50U3RlcCh+Y3VycmVudEluZGV4ID8gY3VycmVudEluZGV4IDogMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDdXJyZW50U3RlcChpbmRleDogbnVtYmVyID0gMClcbiAgICB7XG4gICAgICAgIHRoaXMuc3RlcHNbaW5kZXhdLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gaW5kZXg7XG4gICAgICAgIHRoaXMuc3RlcENoYW5nZWQuZW1pdCh7Y3VycmVudDogdGhpcy5jdXJyZW50U3RlcH0pO1xuICAgIH1cblxuICAgIGdvVG9TdGVwKGluZGV4OiBudW1iZXIpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuc3RlcHNbaW5kZXhdLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gdGhpcy5zdGVwcy5pbmRleE9mKHRoaXMuc3RlcHMuZmlsdGVyKHN0ZXAgPT4gc3RlcC5jdXJyZW50KVswXSk7XG4gICAgICAgIHRoaXMuc3RlcHNbY3VycmVudEluZGV4XS5jdXJyZW50ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zZXRDdXJyZW50U3RlcChpbmRleCk7XG4gICAgfVxufVxuIl19