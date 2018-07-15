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
var WizardProgressComponent = /** @class */ (function () {
    function WizardProgressComponent() {
        this.currentStep = 0;
        this.stepChanged = new EventEmitter();
        this.totalSteps = 0;
    }
    /**
     * @return {?}
     */
    WizardProgressComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.steps) {
            var /** @type {?} */ currentIndex = this.steps.indexOf(this.steps.filter(function (step) { return step.current; })[0]);
            this.totalSteps = this.steps.length;
            this.setCurrentStep(~currentIndex ? currentIndex : 0);
        }
    };
    /**
     * @param {?=} index
     * @return {?}
     */
    WizardProgressComponent.prototype.setCurrentStep = /**
     * @param {?=} index
     * @return {?}
     */
    function (index) {
        if (index === void 0) { index = 0; }
        this.steps[index].current = true;
        this.currentStep = index;
        this.stepChanged.emit({ current: this.currentStep });
    };
    /**
     * @param {?} index
     * @return {?}
     */
    WizardProgressComponent.prototype.goToStep = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (!this.steps[index].complete) {
            return;
        }
        var /** @type {?} */ currentIndex = this.steps.indexOf(this.steps.filter(function (step) { return step.current; })[0]);
        this.steps[currentIndex].current = false;
        this.setCurrentStep(index);
    };
    WizardProgressComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-wizard-progress',
                    template: "<div class=\"step-indicator\">{{currentStep + 1}}/{{totalSteps}}</div>\n<div class=\"aw-step-progress\">\n    <div class=\"aw-step-progress__item\" *ngFor=\"let step of steps; let i = index;\"\n         [ngClass]=\"{ 'aw-step-progress__item--is-active': step.current === true }\"\n         (click)=\"goToStep(i);\">\n    </div>\n</div>\n",
                    styles: [":host{display:block}.step-indicator{width:100%;text-align:center;font-size:14px;font-weight:600;padding-bottom:.3rem}.aw-step-progress{display:flex;flex-direction:row;padding:.2rem;justify-content:center}.aw-step-progress__item{cursor:pointer;list-style:none;width:1.2rem;margin:0 .2rem;border-radius:.3rem;height:.4rem;background-color:#eaeaea}.aw-step-progress__item:last-child{margin-right:0}.aw-step-progress__item:first-child{margin-left:0}.aw-step-progress__item--is-active{background-color:#09a7af}"]
                },] },
    ];
    /** @nocollapse */
    WizardProgressComponent.ctorParameters = function () { return []; };
    WizardProgressComponent.propDecorators = {
        steps: [{ type: Input }],
        currentStep: [{ type: Input }],
        stepChanged: [{ type: Output }]
    };
    return WizardProgressComponent;
}());
export { WizardProgressComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXByb2dyZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3dpemFyZC1wcm9ncmVzcy93aXphcmQtcHJvZ3Jlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUFrQ2pFOzJCQVBzQixDQUFDOzJCQUdVLElBQUksWUFBWSxFQUFPOzBCQUVuQyxDQUFDO0tBSXJCOzs7O0lBRUQsMENBQVE7OztJQUFSO1FBRUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixxQkFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxFQUFaLENBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO0tBQ0o7Ozs7O0lBRUQsZ0RBQWM7Ozs7SUFBZCxVQUFlLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsU0FBaUI7UUFFNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDO0tBQ3REOzs7OztJQUVELDBDQUFROzs7O0lBQVIsVUFBUyxLQUFhO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQztTQUNWO1FBRUQscUJBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sRUFBWixDQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUV6QyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCOztnQkF2REosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxtVkFPYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQywyZkFBMmYsQ0FBQztpQkFDeGdCOzs7Ozt3QkFHSSxLQUFLOzhCQUdMLEtBQUs7OEJBR0wsTUFBTTs7a0NBM0NYOztTQW1DYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBAYXV0aG9yIGFtYW51bC5jaG93ZGh1cnlcbiAqIENvcHlyaWdodCAyMDE4IFNBUCBBcmliYVxuICpcbiAqIFdpemFyZFByb2dyZXNzQ29tcG9uZW50IGNhbiBiZSB1c2VkIGFzIGEgc3RlcCBwcm9ncmVzc1xuICogaW4gYSBwYWdlIHRoYXQgaGFzIG11bHRpcGxlIHN0ZXBzXG4gKiBgPGF3LXdpemFyZC1wcm9ncmVzc1xuICogIFtzdGVwc109XCJzdGVwc1wiXG4gKiAgW2N1cnJlbnRTdGVwXT1cImN1cnJlbnRTdGVwXCJcbiAqICAoc3RlcENoYW5nZWQpPVwib25TdGVwQ2hhbmdlZCgkZXZlbnQpXCI+XG4gKiA8L2F3LXdpemFyZC1wcm9ncmVzcz5gXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RlcFxue1xuICAgIGNvbXBsZXRlOiBib29sZWFuO1xuICAgIGN1cnJlbnQ6IGJvb2xlYW47XG4gICAgdGl0bGU/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctd2l6YXJkLXByb2dyZXNzJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzdGVwLWluZGljYXRvclwiPnt7Y3VycmVudFN0ZXAgKyAxfX0ve3t0b3RhbFN0ZXBzfX08L2Rpdj5cbjxkaXYgY2xhc3M9XCJhdy1zdGVwLXByb2dyZXNzXCI+XG4gICAgPGRpdiBjbGFzcz1cImF3LXN0ZXAtcHJvZ3Jlc3NfX2l0ZW1cIiAqbmdGb3I9XCJsZXQgc3RlcCBvZiBzdGVwczsgbGV0IGkgPSBpbmRleDtcIlxuICAgICAgICAgW25nQ2xhc3NdPVwieyAnYXctc3RlcC1wcm9ncmVzc19faXRlbS0taXMtYWN0aXZlJzogc3RlcC5jdXJyZW50ID09PSB0cnVlIH1cIlxuICAgICAgICAgKGNsaWNrKT1cImdvVG9TdGVwKGkpO1wiPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdHtkaXNwbGF5OmJsb2NrfS5zdGVwLWluZGljYXRvcnt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjYwMDtwYWRkaW5nLWJvdHRvbTouM3JlbX0uYXctc3RlcC1wcm9ncmVzc3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O3BhZGRpbmc6LjJyZW07anVzdGlmeS1jb250ZW50OmNlbnRlcn0uYXctc3RlcC1wcm9ncmVzc19faXRlbXtjdXJzb3I6cG9pbnRlcjtsaXN0LXN0eWxlOm5vbmU7d2lkdGg6MS4ycmVtO21hcmdpbjowIC4ycmVtO2JvcmRlci1yYWRpdXM6LjNyZW07aGVpZ2h0Oi40cmVtO2JhY2tncm91bmQtY29sb3I6I2VhZWFlYX0uYXctc3RlcC1wcm9ncmVzc19faXRlbTpsYXN0LWNoaWxke21hcmdpbi1yaWdodDowfS5hdy1zdGVwLXByb2dyZXNzX19pdGVtOmZpcnN0LWNoaWxke21hcmdpbi1sZWZ0OjB9LmF3LXN0ZXAtcHJvZ3Jlc3NfX2l0ZW0tLWlzLWFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiMwOWE3YWZ9YF1cbn0pXG5leHBvcnQgY2xhc3MgV2l6YXJkUHJvZ3Jlc3NDb21wb25lbnRcbntcbiAgICBASW5wdXQoKVxuICAgIHN0ZXBzOiBBcnJheTxTdGVwPjtcblxuICAgIEBJbnB1dCgpXG4gICAgY3VycmVudFN0ZXA6IG51bWJlciA9IDA7XG5cbiAgICBAT3V0cHV0KClcbiAgICBzdGVwQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHRvdGFsU3RlcHM6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnN0ZXBzKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gdGhpcy5zdGVwcy5pbmRleE9mKHRoaXMuc3RlcHMuZmlsdGVyKHN0ZXAgPT4gc3RlcC5jdXJyZW50KVswXSk7XG4gICAgICAgICAgICB0aGlzLnRvdGFsU3RlcHMgPSB0aGlzLnN0ZXBzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFN0ZXAofmN1cnJlbnRJbmRleCA/IGN1cnJlbnRJbmRleCA6IDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudFN0ZXAoaW5kZXg6IG51bWJlciA9IDApXG4gICAge1xuICAgICAgICB0aGlzLnN0ZXBzW2luZGV4XS5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IGluZGV4O1xuICAgICAgICB0aGlzLnN0ZXBDaGFuZ2VkLmVtaXQoe2N1cnJlbnQ6IHRoaXMuY3VycmVudFN0ZXB9KTtcbiAgICB9XG5cbiAgICBnb1RvU3RlcChpbmRleDogbnVtYmVyKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0ZXBzW2luZGV4XS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMuc3RlcHMuaW5kZXhPZih0aGlzLnN0ZXBzLmZpbHRlcihzdGVwID0+IHN0ZXAuY3VycmVudClbMF0pO1xuICAgICAgICB0aGlzLnN0ZXBzW2N1cnJlbnRJbmRleF0uY3VycmVudCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFN0ZXAoaW5kZXgpO1xuICAgIH1cbn1cbiJdfQ==