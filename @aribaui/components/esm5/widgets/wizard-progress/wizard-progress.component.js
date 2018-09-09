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
            /** @type {?} */
            var currentIndex = this.steps.indexOf(this.steps.filter(function (step) { return step.current; })[0]);
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
        /** @type {?} */
        var currentIndex = this.steps.indexOf(this.steps.filter(function (step) { return step.current; })[0]);
        this.steps[currentIndex].current = false;
        this.setCurrentStep(index);
    };
    WizardProgressComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-wizard-progress',
                    template: "<div class=\"step-indicator\">{{currentStep + 1}}/{{totalSteps}}</div>\n<div class=\"aw-step-progress\">\n    <div class=\"aw-step-progress__item\" *ngFor=\"let step of steps; let i = index;\"\n         [ngClass]=\"{ 'aw-step-progress__item--is-active': step.current === true }\"\n         (click)=\"goToStep(i);\">\n    </div>\n</div>\n",
                    styles: [":host{display:block}.step-indicator{width:100%;text-align:center;font-size:14px;font-weight:600;padding-bottom:.3rem}.aw-step-progress{display:flex;flex-direction:row;padding:.2rem;justify-content:center}.aw-step-progress__item{cursor:pointer;list-style:none;width:1.2rem;margin:0 .2rem;border-radius:.3rem;height:.4rem;background-color:#eaeaea}.aw-step-progress__item:last-child{margin-right:0}.aw-step-progress__item:first-child{margin-left:0}.aw-step-progress__item--is-active{background-color:#09a7af}"]
                }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXByb2dyZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3dpemFyZC1wcm9ncmVzcy93aXphcmQtcHJvZ3Jlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7O0lBMkJqRTsyQkFQc0IsQ0FBQzsyQkFHVSxJQUFJLFlBQVksRUFBTzswQkFFbkMsQ0FBQztLQUlyQjs7OztJQUVELDBDQUFROzs7SUFBUjtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUNiLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sRUFBWixDQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RDtLQUNKOzs7OztJQUVELGdEQUFjOzs7O0lBQWQsVUFBZSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFNBQWlCO1FBRTVCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQztLQUN0RDs7Ozs7SUFFRCwwQ0FBUTs7OztJQUFSLFVBQVMsS0FBYTtRQUVsQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUM7U0FDVjs7UUFFRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxPQUFPLEVBQVosQ0FBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5Qjs7Z0JBaERKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5Qiw2VkFBK0M7O2lCQUVsRDs7Ozs7d0JBR0ksS0FBSzs4QkFHTCxLQUFLOzhCQUdMLE1BQU07O2tDQXBDWDs7U0E0QmEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQGF1dGhvciBhbWFudWwuY2hvd2RodXJ5XG4gKiBDb3B5cmlnaHQgMjAxOCBTQVAgQXJpYmFcbiAqXG4gKiBXaXphcmRQcm9ncmVzc0NvbXBvbmVudCBjYW4gYmUgdXNlZCBhcyBhIHN0ZXAgcHJvZ3Jlc3NcbiAqIGluIGEgcGFnZSB0aGF0IGhhcyBtdWx0aXBsZSBzdGVwc1xuICogYDxhdy13aXphcmQtcHJvZ3Jlc3NcbiAqICBbc3RlcHNdPVwic3RlcHNcIlxuICogIFtjdXJyZW50U3RlcF09XCJjdXJyZW50U3RlcFwiXG4gKiAgKHN0ZXBDaGFuZ2VkKT1cIm9uU3RlcENoYW5nZWQoJGV2ZW50KVwiPlxuICogPC9hdy13aXphcmQtcHJvZ3Jlc3M+YFxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0ZXBcbntcbiAgICBjb21wbGV0ZTogYm9vbGVhbjtcbiAgICBjdXJyZW50OiBib29sZWFuO1xuICAgIHRpdGxlPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXdpemFyZC1wcm9ncmVzcycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dpemFyZC1wcm9ncmVzcy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vd2l6YXJkLXByb2dyZXNzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2l6YXJkUHJvZ3Jlc3NDb21wb25lbnRcbntcbiAgICBASW5wdXQoKVxuICAgIHN0ZXBzOiBBcnJheTxTdGVwPjtcblxuICAgIEBJbnB1dCgpXG4gICAgY3VycmVudFN0ZXA6IG51bWJlciA9IDA7XG5cbiAgICBAT3V0cHV0KClcbiAgICBzdGVwQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHRvdGFsU3RlcHM6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnN0ZXBzKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gdGhpcy5zdGVwcy5pbmRleE9mKHRoaXMuc3RlcHMuZmlsdGVyKHN0ZXAgPT4gc3RlcC5jdXJyZW50KVswXSk7XG4gICAgICAgICAgICB0aGlzLnRvdGFsU3RlcHMgPSB0aGlzLnN0ZXBzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFN0ZXAofmN1cnJlbnRJbmRleCA/IGN1cnJlbnRJbmRleCA6IDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudFN0ZXAoaW5kZXg6IG51bWJlciA9IDApXG4gICAge1xuICAgICAgICB0aGlzLnN0ZXBzW2luZGV4XS5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IGluZGV4O1xuICAgICAgICB0aGlzLnN0ZXBDaGFuZ2VkLmVtaXQoe2N1cnJlbnQ6IHRoaXMuY3VycmVudFN0ZXB9KTtcbiAgICB9XG5cbiAgICBnb1RvU3RlcChpbmRleDogbnVtYmVyKVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0ZXBzW2luZGV4XS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMuc3RlcHMuaW5kZXhPZih0aGlzLnN0ZXBzLmZpbHRlcihzdGVwID0+IHN0ZXAuY3VycmVudClbMF0pO1xuICAgICAgICB0aGlzLnN0ZXBzW2N1cnJlbnRJbmRleF0uY3VycmVudCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFN0ZXAoaW5kZXgpO1xuICAgIH1cbn1cbiJdfQ==