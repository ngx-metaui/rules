/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
var /** @type {?} */ STEPPER_COMPLETED_STEP_COLOR = '#58b957';
var /** @type {?} */ STEPPER_CURRENT_STEP_COLOR = '#0076CB';
var /** @type {?} */ STEPPER_REMAINING_STEP_COLOR = '#D7D7D7';
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
var StepperComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StepperComponent, _super);
    function StepperComponent(env) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        /**
         * Local variable to indicate whether to use the colors array or not.
         */
        _this.bUseColorArray = false;
        /**
         * The current step that's on. If not provided default to the first step.
         */
        _this.currentStep = 0;
        // Initial color for the different stages of steps.
        // Initial color for the different stages of steps.
        _this.stepColorCompleted = STEPPER_COMPLETED_STEP_COLOR;
        _this.stepColorCurrent = STEPPER_CURRENT_STEP_COLOR;
        _this.stepColorRemaining = STEPPER_REMAINING_STEP_COLOR;
        return _this;
    }
    /**
     * @return {?}
     */
    StepperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
                throw new Error("The size of the steps and colors don't match:\n                  (steps.length = " + this.steps.length + "), (colors.length = " + this.colors.length);
            }
        }
    };
    /**
     * Getting the color of the step for the current index
     *
     * @param index
     */
    /**
     * Getting the color of the step for the current index
     *
     * @param {?} index
     * @return {?}
     */
    StepperComponent.prototype.getStepColor = /**
     * Getting the color of the step for the current index
     *
     * @param {?} index
     * @return {?}
     */
    function (index) {
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
    };
    /**
     * The connector colors are driven by the step colors.
     *
     */
    /**
     * The connector colors are driven by the step colors.
     *
     * @param {?} index
     * @return {?}
     */
    StepperComponent.prototype.getConnectorColor = /**
     * The connector colors are driven by the step colors.
     *
     * @param {?} index
     * @return {?}
     */
    function (index) {
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
    };
    /**
     * Next step.
     */
    /**
     * Next step.
     * @return {?}
     */
    StepperComponent.prototype.nextStep = /**
     * Next step.
     * @return {?}
     */
    function () {
        this.currentStep++;
    };
    /**
     * previous step.
     */
    /**
     * previous step.
     * @return {?}
     */
    StepperComponent.prototype.prevStep = /**
     * previous step.
     * @return {?}
     */
    function () {
        this.currentStep--;
    };
    StepperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-stepper',
                    template: "<div class=\"stepper-container\">\n    <div class=\"steps\">\n        <div class=\"step-spacing\"></div>\n\n        <ng-container *ngFor=\"let step of steps; let i=index; let last=last;\">\n            <div class=\"step\">\n                <aw-step [title]=\"step\" [color]=\"getStepColor(i)\"></aw-step>\n            </div>\n            <div *ngIf=\"!last\" class=\"step-connector\" [style.width]=\"connectorWidth\">\n                <div class=\"connector\" [style.borderBottomColor]=\"getConnectorColor(i)\"></div>\n            </div>\n        </ng-container>\n\n        <div class=\"step-spacing\"></div>\n    </div>\n\n    <div class=\"step-labels\"></div>\n</div>\n\n\n",
                    styles: [".stepper-container{display:table;table-layout:fixed;width:100%}.steps{display:table-row}.step-spacing{display:table-cell;width:10%}.step{display:table-cell;width:32px}.step-connector{display:table-cell;vertical-align:middle}.connector{height:1px;border-bottom:3px solid #58b957}.step-labels{display:table-row;height:50px}"]
                },] },
    ];
    /** @nocollapse */
    StepperComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    StepperComponent.propDecorators = {
        steps: [{ type: Input }],
        colors: [{ type: Input }],
        stepColorCompleted: [{ type: Input }],
        stepColorCurrent: [{ type: Input }],
        stepColorRemaining: [{ type: Input }],
        currentStep: [{ type: Input }]
    };
    return StepperComponent;
}(BaseComponent));
export { StepperComponent };
function StepperComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zdGVwcGVyL3N0ZXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUd4RCxxQkFBTSw0QkFBNEIsR0FBRyxTQUFTLENBQUM7QUFDL0MscUJBQU0sMEJBQTBCLEdBQUcsU0FBUyxDQUFDO0FBQzdDLHFCQUFNLDRCQUE0QixHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWlFVCw0Q0FBYTtJQXFEL0MsMEJBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBS2I7UUFQa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7OzsrQkFoQ1QsS0FBSzs7Ozs0QkF3QlQsQ0FBQzs7UUFZbkIsQUFEQSxtREFBbUQ7UUFDbkQsS0FBSSxDQUFDLGtCQUFrQixHQUFHLDRCQUE0QixDQUFDO1FBQ3ZELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRywwQkFBMEIsQ0FBQztRQUNuRCxLQUFJLENBQUMsa0JBQWtCLEdBQUcsNEJBQTRCLENBQUM7O0tBQzFEOzs7O0lBRUQsbUNBQVE7OztJQUFSOztRQUdJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3ZFOzs7O1FBS0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLHNGQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSw0QkFBdUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFRLENBQUMsQ0FBQzthQUNyRjtTQUNKO0tBQ0o7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsdUNBQVk7Ozs7OztJQUFaLFVBQWEsS0FBYTs7UUFHdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUVsQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUVoQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQztLQUNKO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsNENBQWlCOzs7Ozs7SUFBakIsVUFBa0IsS0FBYTs7UUFHM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUVsQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQztLQUNKO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsbUNBQVE7Ozs7SUFBUjtRQUVJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0QjtJQUVEOztPQUVHOzs7OztJQUNILG1DQUFROzs7O0lBQVI7UUFFSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdEI7O2dCQTNLSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSxxcUJBb0JiO29CQUNHLE1BQU0sRUFBRSxDQUFDLG1VQUFtVSxDQUFDO2lCQUNoVjs7OztnQkF0RU8sV0FBVzs7O3dCQTZFZCxLQUFLO3lCQVNMLEtBQUs7cUNBV0wsS0FBSzttQ0FNTCxLQUFLO3FDQU1MLEtBQUs7OEJBTUwsS0FBSzs7MkJBeElWO0VBNEZzQyxhQUFhO1NBQXRDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG5cbmNvbnN0IFNURVBQRVJfQ09NUExFVEVEX1NURVBfQ09MT1IgPSAnIzU4Yjk1Nyc7XG5jb25zdCBTVEVQUEVSX0NVUlJFTlRfU1RFUF9DT0xPUiA9ICcjMDA3NkNCJztcbmNvbnN0IFNURVBQRVJfUkVNQUlOSU5HX1NURVBfQ09MT1IgPSAnI0Q3RDdENyc7XG5cbi8qKlxuICogU3RlcHBlciBjb21wb25lbnQgZGlzcGxheXMgYSBsaXN0IG9mIHN0ZXBzIGZvciB1c2VyIHRvIGZvbGxvdy4gSXQgY2FuIGJlIHVzZWQgYXMgYSBjaGVja2xpc3RcbiAqIHRvIGluZGljYXRlIGNvbXBsZXRlZCwgY3VycmVudCBhbmQgcmVtYWluaW5nIGl0ZW1zLiBJdCBjb3VsZCBiZSBhbHNvIGJlIHVzZWQgdG8gaW5kaWNhdGVcbiAqIHRoZSBzdGF0ZSBvZiBhbiBkb2N1bWVudCwgY3JlYXRlZCwgc3VibWl0dGVkLCBhcHByb3ZlZCwgZXRjLi4uXG4gKlxuICpcbiAqIFVzYWdlOlxuICogICAxLiAgIFVzZSB0aGUgY29tcG9uZW50IGluc2lkZSB5b3VyIHRlbXBsYXRlLiBwcm92aWRlIGEgbGlzdCBvZiBzdGVwcyBhbmQgdGhlIGN1cnJlbnQgc3RlcC5cbiAqXG4gKiAgICAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYXctcGFnZScgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgPGF3LXN0ZXBwZXIgW3N0ZXBzXT1cInN0ZXBzXCIgW2N1cnJlbnRTdGVwXT1cImN1cnJlbnRTdGVwXCI+PC9hdy1zdGVwcGVyPlxuICpcbiAqICAgICAgICAgICAgICAgICAgYFxuICogICAgICAgICBleHBvcnQgY2xhc3MgTXlQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBzdHJpbmdbXSA9IFsnTW9uaXRvcicsICdBZGQgU3VwcGxpZXInLCAnR2V0IFF1b3RlJ107XG4gKiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGVwOiBudW1iZXIgPSAxO1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgICAgICAgICBuZ09uSW5pdCgpIHsgfVxuICogICAgICAgfVxuICpcbiAqICAgMi4gIE92ZXJyaWRlIHRoZSBkZWZhdWx0IGNvbG9ycy5cbiAqXG4gKiAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhdy1wYWdlJyAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctc3RlcHBlciBbc3RlcHNdPVwic3RlcHNcIiBbc3RlcENvbG9yQ3VycmVudF09XCInI2ZmOTkwMCdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0ZXBDb2xvclJlbWFpbmluZ109XCInI0NDMDAwMCdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0ZXBDb2xvckNvbXBsZXRlZF09XCInIzk3YTgyMidcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2N1cnJlbnRTdGVwXT1cImN1cnJlbnRTdGVwXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LXN0ZXBwZXI+XG4gKiAgICAgICAgICAgICAgICAgIGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1zdGVwcGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzdGVwcGVyLWNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJzdGVwc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RlcC1zcGFjaW5nXCI+PC9kaXY+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc3RlcCBvZiBzdGVwczsgbGV0IGk9aW5kZXg7IGxldCBsYXN0PWxhc3Q7XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RlcFwiPlxuICAgICAgICAgICAgICAgIDxhdy1zdGVwIFt0aXRsZV09XCJzdGVwXCIgW2NvbG9yXT1cImdldFN0ZXBDb2xvcihpKVwiPjwvYXctc3RlcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFsYXN0XCIgY2xhc3M9XCJzdGVwLWNvbm5lY3RvclwiIFtzdHlsZS53aWR0aF09XCJjb25uZWN0b3JXaWR0aFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25uZWN0b3JcIiBbc3R5bGUuYm9yZGVyQm90dG9tQ29sb3JdPVwiZ2V0Q29ubmVjdG9yQ29sb3IoaSlcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RlcC1zcGFjaW5nXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic3RlcC1sYWJlbHNcIj48L2Rpdj5cbjwvZGl2PlxuXG5cbmAsXG4gICAgc3R5bGVzOiBbYC5zdGVwcGVyLWNvbnRhaW5lcntkaXNwbGF5OnRhYmxlO3RhYmxlLWxheW91dDpmaXhlZDt3aWR0aDoxMDAlfS5zdGVwc3tkaXNwbGF5OnRhYmxlLXJvd30uc3RlcC1zcGFjaW5ne2Rpc3BsYXk6dGFibGUtY2VsbDt3aWR0aDoxMCV9LnN0ZXB7ZGlzcGxheTp0YWJsZS1jZWxsO3dpZHRoOjMycHh9LnN0ZXAtY29ubmVjdG9ye2Rpc3BsYXk6dGFibGUtY2VsbDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmNvbm5lY3RvcntoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206M3B4IHNvbGlkICM1OGI5NTd9LnN0ZXAtbGFiZWxze2Rpc3BsYXk6dGFibGUtcm93O2hlaWdodDo1MHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIFN0ZXBwZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogUmVxdWlyZWRcbiAgICAgKiBBcnJheSBvZiBzdGVwcy4gT3JkZXIgb2YgdGhlIHN0ZXBzIHNob3VsZCBiZSBpbiBhcnJheSBvcmRlci5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHN0ZXBzOiBzdHJpbmdbXTtcblxuXG4gICAgLyoqXG4gICAgICogc3BlY2lmeSB0aGUgY29sb3JzIGFzc29jaWF0ZWQgd2l0aCBzdGVwcyBhYm92ZS4gVGhlIG51bWJlciBvZiBjb2xvcnNcbiAgICAgKiBhbmQgbnVtYmVyIG9mIHN0ZXBzIG11c3QgbWF0Y2guXG4gICAgICogT3B0aW9uYWw6LCBpZiBlbXB0eSwgZGVmYXVsdCBjb2xvcnMgb3IgY29sb3JzIGZyb20gc3RlcENvbG9yIGlucHV0cyB3aWxsIGJlIHVzZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb2xvcnM6IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogTG9jYWwgdmFyaWFibGUgdG8gaW5kaWNhdGUgd2hldGhlciB0byB1c2UgdGhlIGNvbG9ycyBhcnJheSBvciBub3QuXG4gICAgICovXG4gICAgYlVzZUNvbG9yQXJyYXk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbmFsIElucHV0IGZvciBjYWxsZXIgdG8gb3ZlcnJpZGUgdGhlIGNvbG9yIG9mIGNvbXBsZXRlZCBzdGVwLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcENvbG9yQ29tcGxldGVkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25hbCBJbnB1dCBmb3IgY2FsbGVyIHRvIG92ZXJyaWRlIHRoZSBjb2xvciBvZiBjdXJyZW50IHN0ZXAuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGVwQ29sb3JDdXJyZW50OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25hbCBJbnB1dCBmb3IgY2FsbGVyIHRvIG92ZXJyaWRlIHRoZSBjb2xvciBvZiByZW1haW5pbmcgc3RlcC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHN0ZXBDb2xvclJlbWFpbmluZzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc3RlcCB0aGF0J3Mgb24uIElmIG5vdCBwcm92aWRlZCBkZWZhdWx0IHRvIHRoZSBmaXJzdCBzdGVwLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY3VycmVudFN0ZXA6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBjYWxjdWxhdGVkIHRoZSB3aWR0aCBvZiBjb25uZWN0b3JzIGJldHdlZW4gc3RlcHMuIFRoZSBjYWxjdWxhdGlvbnMgaXMgc29cbiAgICAgKiB0aGF0IHRoZSBzdGVwcyBhcmUgc3ByZWFkIG91dCBldmVubHkuXG4gICAgICovXG4gICAgY29ubmVjdG9yV2lkdGg6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICAgICAgLy8gSW5pdGlhbCBjb2xvciBmb3IgdGhlIGRpZmZlcmVudCBzdGFnZXMgb2Ygc3RlcHMuXG4gICAgICAgIHRoaXMuc3RlcENvbG9yQ29tcGxldGVkID0gU1RFUFBFUl9DT01QTEVURURfU1RFUF9DT0xPUjtcbiAgICAgICAgdGhpcy5zdGVwQ29sb3JDdXJyZW50ID0gU1RFUFBFUl9DVVJSRU5UX1NURVBfQ09MT1I7XG4gICAgICAgIHRoaXMuc3RlcENvbG9yUmVtYWluaW5nID0gU1RFUFBFUl9SRU1BSU5JTkdfU1RFUF9DT0xPUjtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbm5lY3RvciB3aWR0aCBiYXNlZCBvbiBob3cgbWFueSBzdGVwc1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc3RlcHMpICYmIHRoaXMuc3RlcHMubGVuZ3RoID4gMSkge1xuXG4gICAgICAgICAgICAvLyAoMTAwJSAtIDIwJSAoc2lkZSBtYXJnaW5zKSkgLyAoTnVtT2ZTdGVwcyAtMSlcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yV2lkdGggPSBNYXRoLmNlaWwoODAgLyAodGhpcy5zdGVwcy5sZW5ndGggLSAxKSkgKyAnJSc7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVXNlIHRoZSBjb2xvciBhcnJheSBpZiBpdCdzIGRlZmluZWQuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuY29sb3JzKSkge1xuXG4gICAgICAgICAgICB0aGlzLmJVc2VDb2xvckFycmF5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29sb3JzLmxlbmd0aCAhPT0gdGhpcy5zdGVwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzaXplIG9mIHRoZSBzdGVwcyBhbmQgY29sb3JzIGRvbid0IG1hdGNoOlxuICAgICAgICAgICAgICAgICAgKHN0ZXBzLmxlbmd0aCA9ICR7dGhpcy5zdGVwcy5sZW5ndGh9KSwgKGNvbG9ycy5sZW5ndGggPSAke3RoaXMuY29sb3JzLmxlbmd0aH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHRpbmcgdGhlIGNvbG9yIG9mIHRoZSBzdGVwIGZvciB0aGUgY3VycmVudCBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICovXG4gICAgZ2V0U3RlcENvbG9yKGluZGV4OiBudW1iZXIpXG4gICAge1xuICAgICAgICAvLyBDb2xvciBBcnJheSBvdmVycmlkZXMgZXZlcnl0aGluZyBlbHNlLlxuICAgICAgICBpZiAodGhpcy5iVXNlQ29sb3JBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JzW2luZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmRleCA8IHRoaXMuY3VycmVudFN0ZXApIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RlcENvbG9yQ29tcGxldGVkO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IHRoaXMuY3VycmVudFN0ZXApIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RlcENvbG9yQ3VycmVudDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGVwQ29sb3JSZW1haW5pbmc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29ubmVjdG9yIGNvbG9ycyBhcmUgZHJpdmVuIGJ5IHRoZSBzdGVwIGNvbG9ycy5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldENvbm5lY3RvckNvbG9yKGluZGV4OiBudW1iZXIpXG4gICAge1xuICAgICAgICAvLyBDb2xvciBBcnJheSBvdmVycmlkZXMgZXZlcnl0aGluZyBlbHNlLlxuICAgICAgICBpZiAodGhpcy5iVXNlQ29sb3JBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JzW2luZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmRleCA8IHRoaXMuY3VycmVudFN0ZXApIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RlcENvbG9yQ29tcGxldGVkO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ZXBDb2xvclJlbWFpbmluZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5leHQgc3RlcC5cbiAgICAgKi9cbiAgICBuZXh0U3RlcCgpXG4gICAge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwKys7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJldmlvdXMgc3RlcC5cbiAgICAgKi9cbiAgICBwcmV2U3RlcCgpXG4gICAge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGVwLS07XG4gICAgfVxufVxuIl19