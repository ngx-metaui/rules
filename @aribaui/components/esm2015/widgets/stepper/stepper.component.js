/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
/** @type {?} */
const STEPPER_COMPLETED_STEP_COLOR = '#58b957';
/** @type {?} */
const STEPPER_CURRENT_STEP_COLOR = '#0076CB';
/** @type {?} */
const STEPPER_REMAINING_STEP_COLOR = '#D7D7D7';
/**
 * Stepper component displays a list of steps for user to follow. It can be used as a checklist
 * to indicate completed, current and remaining items. It could be also be used to indicate
 * the state of an document, created, submitted, approved, etc...
 *
 *
 * Usage:
 *   1.   Use the component inside your template. provide a list of steps and the current step.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                <aw-stepper [steps]="steps" [currentStep]="currentStep"></aw-stepper>
 *
 *                  `
 *         export class MyPageComponent implements OnInit {
 *
 *                     steps: string[] = ['Monitor', 'Add Supplier', 'Get Quote'];
 *                     currentStep: number = 1;
 *
 *                     constructor(private modalService: ModalService) {
 *                          super();
 *                       }
 *                     ngOnInit() { }
 *       }
 *
 *   2.  Override the default colors.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                            <aw-stepper [steps]="steps" [stepColorCurrent]="'#ff9900'"
 *                                        [stepColorRemaining]="'#CC0000'"
 *                                        [stepColorCompleted]="'#97a822'"
 *                                        [currentStep]="currentStep">
 *                            </aw-stepper>
 *                  `
 */
export class StepperComponent extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * Local variable to indicate whether to use the colors array or not.
         */
        this.bUseColorArray = false;
        /**
         * The current step that's on. If not provided default to the first step.
         */
        this.currentStep = 0;
        // Initial color for the different stages of steps.
        this.stepColorCompleted = STEPPER_COMPLETED_STEP_COLOR;
        this.stepColorCurrent = STEPPER_CURRENT_STEP_COLOR;
        this.stepColorRemaining = STEPPER_REMAINING_STEP_COLOR;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Calculate the connector width based on how many steps
        if (isPresent(this.steps) && this.steps.length > 1) {
            // (100% - 20% (side margins)) / (NumOfSteps -1)
            this.connectorWidth = Math.ceil(80 / (this.steps.length - 1)) + '%';
        }
        /**
                 * Use the color array if it's defined.
                 */
        if (isPresent(this.colors)) {
            this.bUseColorArray = true;
            if (this.colors.length !== this.steps.length) {
                throw new Error(`The size of the steps and colors don't match:
                  (steps.length = ${this.steps.length}), (colors.length = ${this.colors.length}`);
            }
        }
    }
    /**
     * Getting the color of the step for the current index
     *
     * @param {?} index
     * @return {?}
     */
    getStepColor(index) {
        // Color Array overrides everything else.
        if (this.bUseColorArray) {
            return this.colors[index];
        }
        if (index < this.currentStep) {
            return this.stepColorCompleted;
        }
        else if (index === this.currentStep) {
            return this.stepColorCurrent;
        }
        else {
            return this.stepColorRemaining;
        }
    }
    /**
     * The connector colors are driven by the step colors.
     *
     * @param {?} index
     * @return {?}
     */
    getConnectorColor(index) {
        // Color Array overrides everything else.
        if (this.bUseColorArray) {
            return this.colors[index];
        }
        if (index < this.currentStep) {
            return this.stepColorCompleted;
        }
        else {
            return this.stepColorRemaining;
        }
    }
    /**
     * Next step.
     * @return {?}
     */
    nextStep() {
        this.currentStep++;
    }
    /**
     * previous step.
     * @return {?}
     */
    prevStep() {
        this.currentStep--;
    }
}
StepperComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-stepper',
                template: "<div class=\"stepper-container\">\n    <div class=\"steps\">\n        <div class=\"step-spacing\"></div>\n\n        <ng-container *ngFor=\"let step of steps; let i=index; let last=last;\">\n            <div class=\"step\">\n                <aw-step [title]=\"step\" [color]=\"getStepColor(i)\"></aw-step>\n            </div>\n            <div *ngIf=\"!last\" class=\"step-connector\" [style.width]=\"connectorWidth\">\n                <div class=\"connector\" [style.borderBottomColor]=\"getConnectorColor(i)\"></div>\n            </div>\n        </ng-container>\n\n        <div class=\"step-spacing\"></div>\n    </div>\n\n    <div class=\"step-labels\"></div>\n</div>\n\n\n",
                styles: [".stepper-container{display:table;table-layout:fixed;width:100%}.steps{display:table-row}.step-spacing{display:table-cell;width:10%}.step{display:table-cell;width:32px}.step-connector{display:table-cell;vertical-align:middle}.connector{height:1px;border-bottom:3px solid #58b957}.step-labels{display:table-row;height:50px}"]
            }] }
];
/** @nocollapse */
StepperComponent.ctorParameters = () => [
    { type: Environment }
];
StepperComponent.propDecorators = {
    steps: [{ type: Input }],
    colors: [{ type: Input }],
    stepColorCompleted: [{ type: Input }],
    stepColorCurrent: [{ type: Input }],
    stepColorRemaining: [{ type: Input }],
    currentStep: [{ type: Input }]
};
if (false) {
    /**
     * Required
     * Array of steps. Order of the steps should be in array order.
     * @type {?}
     */
    StepperComponent.prototype.steps;
    /**
     * specify the colors associated with steps above. The number of colors
     * and number of steps must match.
     * Optional:, if empty, default colors or colors from stepColor inputs will be used.
     * @type {?}
     */
    StepperComponent.prototype.colors;
    /**
     * Local variable to indicate whether to use the colors array or not.
     * @type {?}
     */
    StepperComponent.prototype.bUseColorArray;
    /**
     * Optional Input for caller to override the color of completed step.
     * @type {?}
     */
    StepperComponent.prototype.stepColorCompleted;
    /**
     * Optional Input for caller to override the color of current step.
     * @type {?}
     */
    StepperComponent.prototype.stepColorCurrent;
    /**
     * Optional Input for caller to override the color of remaining step.
     * @type {?}
     */
    StepperComponent.prototype.stepColorRemaining;
    /**
     * The current step that's on. If not provided default to the first step.
     * @type {?}
     */
    StepperComponent.prototype.currentStep;
    /**
     * calculated the width of connectors between steps. The calculations is so
     * that the steps are spread out evenly.
     * @type {?}
     */
    StepperComponent.prototype.connectorWidth;
    /** @type {?} */
    StepperComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zdGVwcGVyL3N0ZXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOztBQUd4RCxNQUFNLDRCQUE0QixHQUFHLFNBQVMsQ0FBQzs7QUFDL0MsTUFBTSwwQkFBMEIsR0FBRyxTQUFTLENBQUM7O0FBQzdDLE1BQU0sNEJBQTRCLEdBQUcsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2Qy9DLE1BQU0sdUJBQXdCLFNBQVEsYUFBYTs7OztJQXFEL0MsWUFBbUIsR0FBZ0I7UUFFL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkksUUFBRyxHQUFILEdBQUcsQ0FBYTs7Ozs4QkFoQ1QsS0FBSzs7OzsyQkF3QlQsQ0FBQzs7UUFZbkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLDRCQUE0QixDQUFDO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsR0FBRywwQkFBMEIsQ0FBQztRQUNuRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsNEJBQTRCLENBQUM7S0FDMUQ7Ozs7SUFFRCxRQUFROztRQUdKLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3ZFOzs7O1FBS0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDO29DQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSx1QkFBdUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3JGO1NBQ0o7S0FDSjs7Ozs7OztJQU9ELFlBQVksQ0FBQyxLQUFhOztRQUd0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUUzQixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBRWxDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUVwQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBRWhDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFSixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDO0tBQ0o7Ozs7Ozs7SUFNRCxpQkFBaUIsQ0FBQyxLQUFhOztRQUczQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUUzQixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBRWxDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFSixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDO0tBQ0o7Ozs7O0lBS0QsUUFBUTtRQUVKLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7SUFLRCxRQUFRO1FBRUosSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RCOzs7WUF2SkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QiwrcUJBQXFDOzthQUV4Qzs7OztZQWxETyxXQUFXOzs7b0JBeURkLEtBQUs7cUJBU0wsS0FBSztpQ0FXTCxLQUFLOytCQU1MLEtBQUs7aUNBTUwsS0FBSzswQkFNTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5cblxuY29uc3QgU1RFUFBFUl9DT01QTEVURURfU1RFUF9DT0xPUiA9ICcjNThiOTU3JztcbmNvbnN0IFNURVBQRVJfQ1VSUkVOVF9TVEVQX0NPTE9SID0gJyMwMDc2Q0InO1xuY29uc3QgU1RFUFBFUl9SRU1BSU5JTkdfU1RFUF9DT0xPUiA9ICcjRDdEN0Q3JztcblxuLyoqXG4gKiBTdGVwcGVyIGNvbXBvbmVudCBkaXNwbGF5cyBhIGxpc3Qgb2Ygc3RlcHMgZm9yIHVzZXIgdG8gZm9sbG93LiBJdCBjYW4gYmUgdXNlZCBhcyBhIGNoZWNrbGlzdFxuICogdG8gaW5kaWNhdGUgY29tcGxldGVkLCBjdXJyZW50IGFuZCByZW1haW5pbmcgaXRlbXMuIEl0IGNvdWxkIGJlIGFsc28gYmUgdXNlZCB0byBpbmRpY2F0ZVxuICogdGhlIHN0YXRlIG9mIGFuIGRvY3VtZW50LCBjcmVhdGVkLCBzdWJtaXR0ZWQsIGFwcHJvdmVkLCBldGMuLi5cbiAqXG4gKlxuICogVXNhZ2U6XG4gKiAgIDEuICAgVXNlIHRoZSBjb21wb25lbnQgaW5zaWRlIHlvdXIgdGVtcGxhdGUuIHByb3ZpZGUgYSBsaXN0IG9mIHN0ZXBzIGFuZCB0aGUgY3VycmVudCBzdGVwLlxuICpcbiAqICAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhdy1wYWdlJyAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICA8YXctc3RlcHBlciBbc3RlcHNdPVwic3RlcHNcIiBbY3VycmVudFN0ZXBdPVwiY3VycmVudFN0ZXBcIj48L2F3LXN0ZXBwZXI+XG4gKlxuICogICAgICAgICAgICAgICAgICBgXG4gKiAgICAgICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgc3RlcHM6IHN0cmluZ1tdID0gWydNb25pdG9yJywgJ0FkZCBTdXBwbGllcicsICdHZXQgUXVvdGUnXTtcbiAqICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0ZXA6IG51bWJlciA9IDE7XG4gKlxuICogICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlKSB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAqICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiAgICAgICAgICAgICAgICAgICAgIG5nT25Jbml0KCkgeyB9XG4gKiAgICAgICB9XG4gKlxuICogICAyLiAgT3ZlcnJpZGUgdGhlIGRlZmF1bHQgY29sb3JzLlxuICpcbiAqICAgICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2F3LXBhZ2UnICxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1zdGVwcGVyIFtzdGVwc109XCJzdGVwc1wiIFtzdGVwQ29sb3JDdXJyZW50XT1cIicjZmY5OTAwJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3RlcENvbG9yUmVtYWluaW5nXT1cIicjQ0MwMDAwJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3RlcENvbG9yQ29tcGxldGVkXT1cIicjOTdhODIyJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY3VycmVudFN0ZXBdPVwiY3VycmVudFN0ZXBcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctc3RlcHBlcj5cbiAqICAgICAgICAgICAgICAgICAgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXN0ZXBwZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnc3RlcHBlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3N0ZXBwZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTdGVwcGVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqIFJlcXVpcmVkXG4gICAgICogQXJyYXkgb2Ygc3RlcHMuIE9yZGVyIG9mIHRoZSBzdGVwcyBzaG91bGQgYmUgaW4gYXJyYXkgb3JkZXIuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGVwczogc3RyaW5nW107XG5cblxuICAgIC8qKlxuICAgICAqIHNwZWNpZnkgdGhlIGNvbG9ycyBhc3NvY2lhdGVkIHdpdGggc3RlcHMgYWJvdmUuIFRoZSBudW1iZXIgb2YgY29sb3JzXG4gICAgICogYW5kIG51bWJlciBvZiBzdGVwcyBtdXN0IG1hdGNoLlxuICAgICAqIE9wdGlvbmFsOiwgaWYgZW1wdHksIGRlZmF1bHQgY29sb3JzIG9yIGNvbG9ycyBmcm9tIHN0ZXBDb2xvciBpbnB1dHMgd2lsbCBiZSB1c2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29sb3JzOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIExvY2FsIHZhcmlhYmxlIHRvIGluZGljYXRlIHdoZXRoZXIgdG8gdXNlIHRoZSBjb2xvcnMgYXJyYXkgb3Igbm90LlxuICAgICAqL1xuICAgIGJVc2VDb2xvckFycmF5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25hbCBJbnB1dCBmb3IgY2FsbGVyIHRvIG92ZXJyaWRlIHRoZSBjb2xvciBvZiBjb21wbGV0ZWQgc3RlcC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHN0ZXBDb2xvckNvbXBsZXRlZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9uYWwgSW5wdXQgZm9yIGNhbGxlciB0byBvdmVycmlkZSB0aGUgY29sb3Igb2YgY3VycmVudCBzdGVwLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcENvbG9yQ3VycmVudDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9uYWwgSW5wdXQgZm9yIGNhbGxlciB0byBvdmVycmlkZSB0aGUgY29sb3Igb2YgcmVtYWluaW5nIHN0ZXAuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGVwQ29sb3JSZW1haW5pbmc6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHN0ZXAgdGhhdCdzIG9uLiBJZiBub3QgcHJvdmlkZWQgZGVmYXVsdCB0byB0aGUgZmlyc3Qgc3RlcC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGN1cnJlbnRTdGVwOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogY2FsY3VsYXRlZCB0aGUgd2lkdGggb2YgY29ubmVjdG9ycyBiZXR3ZWVuIHN0ZXBzLiBUaGUgY2FsY3VsYXRpb25zIGlzIHNvXG4gICAgICogdGhhdCB0aGUgc3RlcHMgYXJlIHNwcmVhZCBvdXQgZXZlbmx5LlxuICAgICAqL1xuICAgIGNvbm5lY3RvcldpZHRoOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgICAgIC8vIEluaXRpYWwgY29sb3IgZm9yIHRoZSBkaWZmZXJlbnQgc3RhZ2VzIG9mIHN0ZXBzLlxuICAgICAgICB0aGlzLnN0ZXBDb2xvckNvbXBsZXRlZCA9IFNURVBQRVJfQ09NUExFVEVEX1NURVBfQ09MT1I7XG4gICAgICAgIHRoaXMuc3RlcENvbG9yQ3VycmVudCA9IFNURVBQRVJfQ1VSUkVOVF9TVEVQX0NPTE9SO1xuICAgICAgICB0aGlzLnN0ZXBDb2xvclJlbWFpbmluZyA9IFNURVBQRVJfUkVNQUlOSU5HX1NURVBfQ09MT1I7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb25uZWN0b3Igd2lkdGggYmFzZWQgb24gaG93IG1hbnkgc3RlcHNcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0ZXBzKSAmJiB0aGlzLnN0ZXBzLmxlbmd0aCA+IDEpIHtcblxuICAgICAgICAgICAgLy8gKDEwMCUgLSAyMCUgKHNpZGUgbWFyZ2lucykpIC8gKE51bU9mU3RlcHMgLTEpXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvcldpZHRoID0gTWF0aC5jZWlsKDgwIC8gKHRoaXMuc3RlcHMubGVuZ3RoIC0gMSkpICsgJyUnO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZSB0aGUgY29sb3IgYXJyYXkgaWYgaXQncyBkZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmNvbG9ycykpIHtcblxuICAgICAgICAgICAgdGhpcy5iVXNlQ29sb3JBcnJheSA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbG9ycy5sZW5ndGggIT09IHRoaXMuc3RlcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2l6ZSBvZiB0aGUgc3RlcHMgYW5kIGNvbG9ycyBkb24ndCBtYXRjaDpcbiAgICAgICAgICAgICAgICAgIChzdGVwcy5sZW5ndGggPSAke3RoaXMuc3RlcHMubGVuZ3RofSksIChjb2xvcnMubGVuZ3RoID0gJHt0aGlzLmNvbG9ycy5sZW5ndGh9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXR0aW5nIHRoZSBjb2xvciBvZiB0aGUgc3RlcCBmb3IgdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqL1xuICAgIGdldFN0ZXBDb2xvcihpbmRleDogbnVtYmVyKVxuICAgIHtcbiAgICAgICAgLy8gQ29sb3IgQXJyYXkgb3ZlcnJpZGVzIGV2ZXJ5dGhpbmcgZWxzZS5cbiAgICAgICAgaWYgKHRoaXMuYlVzZUNvbG9yQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbG9yc1tpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPCB0aGlzLmN1cnJlbnRTdGVwKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ZXBDb2xvckNvbXBsZXRlZDtcblxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLmN1cnJlbnRTdGVwKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ZXBDb2xvckN1cnJlbnQ7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RlcENvbG9yUmVtYWluaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbm5lY3RvciBjb2xvcnMgYXJlIGRyaXZlbiBieSB0aGUgc3RlcCBjb2xvcnMuXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRDb25uZWN0b3JDb2xvcihpbmRleDogbnVtYmVyKVxuICAgIHtcbiAgICAgICAgLy8gQ29sb3IgQXJyYXkgb3ZlcnJpZGVzIGV2ZXJ5dGhpbmcgZWxzZS5cbiAgICAgICAgaWYgKHRoaXMuYlVzZUNvbG9yQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbG9yc1tpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPCB0aGlzLmN1cnJlbnRTdGVwKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ZXBDb2xvckNvbXBsZXRlZDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGVwQ29sb3JSZW1haW5pbmc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOZXh0IHN0ZXAuXG4gICAgICovXG4gICAgbmV4dFN0ZXAoKVxuICAgIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCsrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHByZXZpb3VzIHN0ZXAuXG4gICAgICovXG4gICAgcHJldlN0ZXAoKVxuICAgIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcC0tO1xuICAgIH1cbn1cbiJdfQ==