/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
/** @type {?} */
var STEPPER_COMPLETED_STEP_COLOR = '#58b957';
/** @type {?} */
var STEPPER_CURRENT_STEP_COLOR = '#0076CB';
/** @type {?} */
var STEPPER_REMAINING_STEP_COLOR = '#D7D7D7';
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
                }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zdGVwcGVyL3N0ZXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7QUFHeEQsSUFBTSw0QkFBNEIsR0FBRyxTQUFTLENBQUM7O0FBQy9DLElBQU0sMEJBQTBCLEdBQUcsU0FBUyxDQUFDOztBQUM3QyxJQUFNLDRCQUE0QixHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTZDVCw0Q0FBYTtJQXFEL0MsMEJBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBS2I7UUFQa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7OzsrQkFoQ1QsS0FBSzs7Ozs0QkF3QlQsQ0FBQzs7UUFZbkIsQUFEQSxtREFBbUQ7UUFDbkQsS0FBSSxDQUFDLGtCQUFrQixHQUFHLDRCQUE0QixDQUFDO1FBQ3ZELEtBQUksQ0FBQyxnQkFBZ0IsR0FBRywwQkFBMEIsQ0FBQztRQUNuRCxLQUFJLENBQUMsa0JBQWtCLEdBQUcsNEJBQTRCLENBQUM7O0tBQzFEOzs7O0lBRUQsbUNBQVE7OztJQUFSOztRQUdJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFHakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3ZFOzs7O1FBS0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLHNGQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSw0QkFBdUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFRLENBQUMsQ0FBQzthQUNyRjtTQUNKO0tBQ0o7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsdUNBQVk7Ozs7OztJQUFaLFVBQWEsS0FBYTs7UUFHdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUVsQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUVoQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQztLQUNKO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsNENBQWlCOzs7Ozs7SUFBakIsVUFBa0IsS0FBYTs7UUFHM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUVsQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQztLQUNKO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsbUNBQVE7Ozs7SUFBUjtRQUVJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0QjtJQUVEOztPQUVHOzs7OztJQUNILG1DQUFROzs7O0lBQVI7UUFFSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdEI7O2dCQXZKSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLCtxQkFBcUM7O2lCQUV4Qzs7OztnQkFsRE8sV0FBVzs7O3dCQXlEZCxLQUFLO3lCQVNMLEtBQUs7cUNBV0wsS0FBSzttQ0FNTCxLQUFLO3FDQU1MLEtBQUs7OEJBTUwsS0FBSzs7MkJBcEhWO0VBd0VzQyxhQUFhO1NBQXRDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG5cbmNvbnN0IFNURVBQRVJfQ09NUExFVEVEX1NURVBfQ09MT1IgPSAnIzU4Yjk1Nyc7XG5jb25zdCBTVEVQUEVSX0NVUlJFTlRfU1RFUF9DT0xPUiA9ICcjMDA3NkNCJztcbmNvbnN0IFNURVBQRVJfUkVNQUlOSU5HX1NURVBfQ09MT1IgPSAnI0Q3RDdENyc7XG5cbi8qKlxuICogU3RlcHBlciBjb21wb25lbnQgZGlzcGxheXMgYSBsaXN0IG9mIHN0ZXBzIGZvciB1c2VyIHRvIGZvbGxvdy4gSXQgY2FuIGJlIHVzZWQgYXMgYSBjaGVja2xpc3RcbiAqIHRvIGluZGljYXRlIGNvbXBsZXRlZCwgY3VycmVudCBhbmQgcmVtYWluaW5nIGl0ZW1zLiBJdCBjb3VsZCBiZSBhbHNvIGJlIHVzZWQgdG8gaW5kaWNhdGVcbiAqIHRoZSBzdGF0ZSBvZiBhbiBkb2N1bWVudCwgY3JlYXRlZCwgc3VibWl0dGVkLCBhcHByb3ZlZCwgZXRjLi4uXG4gKlxuICpcbiAqIFVzYWdlOlxuICogICAxLiAgIFVzZSB0aGUgY29tcG9uZW50IGluc2lkZSB5b3VyIHRlbXBsYXRlLiBwcm92aWRlIGEgbGlzdCBvZiBzdGVwcyBhbmQgdGhlIGN1cnJlbnQgc3RlcC5cbiAqXG4gKiAgICAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYXctcGFnZScgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgPGF3LXN0ZXBwZXIgW3N0ZXBzXT1cInN0ZXBzXCIgW2N1cnJlbnRTdGVwXT1cImN1cnJlbnRTdGVwXCI+PC9hdy1zdGVwcGVyPlxuICpcbiAqICAgICAgICAgICAgICAgICAgYFxuICogICAgICAgICBleHBvcnQgY2xhc3MgTXlQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBzdHJpbmdbXSA9IFsnTW9uaXRvcicsICdBZGQgU3VwcGxpZXInLCAnR2V0IFF1b3RlJ107XG4gKiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGVwOiBudW1iZXIgPSAxO1xuICpcbiAqICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSkge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgICAgICAgICBuZ09uSW5pdCgpIHsgfVxuICogICAgICAgfVxuICpcbiAqICAgMi4gIE92ZXJyaWRlIHRoZSBkZWZhdWx0IGNvbG9ycy5cbiAqXG4gKiAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhdy1wYWdlJyAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctc3RlcHBlciBbc3RlcHNdPVwic3RlcHNcIiBbc3RlcENvbG9yQ3VycmVudF09XCInI2ZmOTkwMCdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0ZXBDb2xvclJlbWFpbmluZ109XCInI0NDMDAwMCdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0ZXBDb2xvckNvbXBsZXRlZF09XCInIzk3YTgyMidcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2N1cnJlbnRTdGVwXT1cImN1cnJlbnRTdGVwXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LXN0ZXBwZXI+XG4gKiAgICAgICAgICAgICAgICAgIGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1zdGVwcGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3N0ZXBwZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzdGVwcGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU3RlcHBlckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcbiAgICAvKipcbiAgICAgKiBSZXF1aXJlZFxuICAgICAqIEFycmF5IG9mIHN0ZXBzLiBPcmRlciBvZiB0aGUgc3RlcHMgc2hvdWxkIGJlIGluIGFycmF5IG9yZGVyLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcHM6IHN0cmluZ1tdO1xuXG5cbiAgICAvKipcbiAgICAgKiBzcGVjaWZ5IHRoZSBjb2xvcnMgYXNzb2NpYXRlZCB3aXRoIHN0ZXBzIGFib3ZlLiBUaGUgbnVtYmVyIG9mIGNvbG9yc1xuICAgICAqIGFuZCBudW1iZXIgb2Ygc3RlcHMgbXVzdCBtYXRjaC5cbiAgICAgKiBPcHRpb25hbDosIGlmIGVtcHR5LCBkZWZhdWx0IGNvbG9ycyBvciBjb2xvcnMgZnJvbSBzdGVwQ29sb3IgaW5wdXRzIHdpbGwgYmUgdXNlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbG9yczogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBMb2NhbCB2YXJpYWJsZSB0byBpbmRpY2F0ZSB3aGV0aGVyIHRvIHVzZSB0aGUgY29sb3JzIGFycmF5IG9yIG5vdC5cbiAgICAgKi9cbiAgICBiVXNlQ29sb3JBcnJheTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9uYWwgSW5wdXQgZm9yIGNhbGxlciB0byBvdmVycmlkZSB0aGUgY29sb3Igb2YgY29tcGxldGVkIHN0ZXAuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGVwQ29sb3JDb21wbGV0ZWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbmFsIElucHV0IGZvciBjYWxsZXIgdG8gb3ZlcnJpZGUgdGhlIGNvbG9yIG9mIGN1cnJlbnQgc3RlcC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHN0ZXBDb2xvckN1cnJlbnQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbmFsIElucHV0IGZvciBjYWxsZXIgdG8gb3ZlcnJpZGUgdGhlIGNvbG9yIG9mIHJlbWFpbmluZyBzdGVwLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcENvbG9yUmVtYWluaW5nOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGVwIHRoYXQncyBvbi4gSWYgbm90IHByb3ZpZGVkIGRlZmF1bHQgdG8gdGhlIGZpcnN0IHN0ZXAuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjdXJyZW50U3RlcDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIGNhbGN1bGF0ZWQgdGhlIHdpZHRoIG9mIGNvbm5lY3RvcnMgYmV0d2VlbiBzdGVwcy4gVGhlIGNhbGN1bGF0aW9ucyBpcyBzb1xuICAgICAqIHRoYXQgdGhlIHN0ZXBzIGFyZSBzcHJlYWQgb3V0IGV2ZW5seS5cbiAgICAgKi9cbiAgICBjb25uZWN0b3JXaWR0aDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgICAgICAvLyBJbml0aWFsIGNvbG9yIGZvciB0aGUgZGlmZmVyZW50IHN0YWdlcyBvZiBzdGVwcy5cbiAgICAgICAgdGhpcy5zdGVwQ29sb3JDb21wbGV0ZWQgPSBTVEVQUEVSX0NPTVBMRVRFRF9TVEVQX0NPTE9SO1xuICAgICAgICB0aGlzLnN0ZXBDb2xvckN1cnJlbnQgPSBTVEVQUEVSX0NVUlJFTlRfU1RFUF9DT0xPUjtcbiAgICAgICAgdGhpcy5zdGVwQ29sb3JSZW1haW5pbmcgPSBTVEVQUEVSX1JFTUFJTklOR19TVEVQX0NPTE9SO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29ubmVjdG9yIHdpZHRoIGJhc2VkIG9uIGhvdyBtYW55IHN0ZXBzXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdGVwcykgJiYgdGhpcy5zdGVwcy5sZW5ndGggPiAxKSB7XG5cbiAgICAgICAgICAgIC8vICgxMDAlIC0gMjAlIChzaWRlIG1hcmdpbnMpKSAvIChOdW1PZlN0ZXBzIC0xKVxuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JXaWR0aCA9IE1hdGguY2VpbCg4MCAvICh0aGlzLnN0ZXBzLmxlbmd0aCAtIDEpKSArICclJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2UgdGhlIGNvbG9yIGFycmF5IGlmIGl0J3MgZGVmaW5lZC5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5jb2xvcnMpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYlVzZUNvbG9yQXJyYXkgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb2xvcnMubGVuZ3RoICE9PSB0aGlzLnN0ZXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNpemUgb2YgdGhlIHN0ZXBzIGFuZCBjb2xvcnMgZG9uJ3QgbWF0Y2g6XG4gICAgICAgICAgICAgICAgICAoc3RlcHMubGVuZ3RoID0gJHt0aGlzLnN0ZXBzLmxlbmd0aH0pLCAoY29sb3JzLmxlbmd0aCA9ICR7dGhpcy5jb2xvcnMubGVuZ3RofWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0dGluZyB0aGUgY29sb3Igb2YgdGhlIHN0ZXAgZm9yIHRoZSBjdXJyZW50IGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKi9cbiAgICBnZXRTdGVwQ29sb3IoaW5kZXg6IG51bWJlcilcbiAgICB7XG4gICAgICAgIC8vIENvbG9yIEFycmF5IG92ZXJyaWRlcyBldmVyeXRoaW5nIGVsc2UuXG4gICAgICAgIGlmICh0aGlzLmJVc2VDb2xvckFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xvcnNbaW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5jdXJyZW50U3RlcCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGVwQ29sb3JDb21wbGV0ZWQ7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5jdXJyZW50U3RlcCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGVwQ29sb3JDdXJyZW50O1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ZXBDb2xvclJlbWFpbmluZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25uZWN0b3IgY29sb3JzIGFyZSBkcml2ZW4gYnkgdGhlIHN0ZXAgY29sb3JzLlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0Q29ubmVjdG9yQ29sb3IoaW5kZXg6IG51bWJlcilcbiAgICB7XG4gICAgICAgIC8vIENvbG9yIEFycmF5IG92ZXJyaWRlcyBldmVyeXRoaW5nIGVsc2UuXG4gICAgICAgIGlmICh0aGlzLmJVc2VDb2xvckFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xvcnNbaW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5jdXJyZW50U3RlcCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGVwQ29sb3JDb21wbGV0ZWQ7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RlcENvbG9yUmVtYWluaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmV4dCBzdGVwLlxuICAgICAqL1xuICAgIG5leHRTdGVwKClcbiAgICB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0ZXArKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcmV2aW91cyBzdGVwLlxuICAgICAqL1xuICAgIHByZXZTdGVwKClcbiAgICB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0ZXAtLTtcbiAgICB9XG59XG4iXX0=