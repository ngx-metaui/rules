/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Environment, isBlank } from '@aribaui/core';
/** *
 * Renders html step component
 *
 *  * Usage:
 *       Straight forward to use. But mostly it would be used as part of the stepper component.
 *
 * \@Component({
 *                selector: 'aw-page' ,
 *                           template: `
 *                           <aw-step [title]="step" [color]="color"></aw-step>
 *                           `
  @type {?} */
var DEFAULT_COLOR = '#58b957';
var StepComponent = /** @class */ (function () {
    function StepComponent(env) {
        this.env = env;
    }
    /**
     * @return {?}
     */
    StepComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isBlank(this.color)) {
            this.color = DEFAULT_COLOR;
        }
    };
    StepComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-step',
                    template: "<div class=\"step-container\">\n    <div class=\"outer-circle\" [style.borderColor]=\"color\">\n        <div class=\"inner-circle\" [style.borderColor]=\"color\" [style.backgroundColor]=\"color\"></div>\n    </div>\n\n    <div class=\"step-title\">{{title}}</div>\n</div>\n\n",
                    styles: [".step-container{position:relative;width:32px}.outer-circle{width:26px;height:26px;border-radius:50%;background-color:#fff;border:3px solid #58b957;position:relative}.inner-circle{width:8px;height:8px;border-radius:50%;border:2px solid #58b957;background-color:#58b957;margin:0 auto;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.step-title{position:absolute;width:150px;top:40px;left:-60px;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    StepComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    StepComponent.propDecorators = {
        color: [{ type: Input }],
        title: [{ type: Input }]
    };
    return StepComponent;
}());
export { StepComponent };
if (false) {
    /**
     * The color of step icon.
     * @type {?}
     */
    StepComponent.prototype.color;
    /**
     * title appears under the step graphics.
     * @type {?}
     */
    StepComponent.prototype.title;
    /** @type {?} */
    StepComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zdGVwcGVyL3N0ZXAvc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWdCbkQsSUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDOztJQXFCNUIsdUJBQW1CLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7S0FFbEM7Ozs7SUFFRCxnQ0FBUTs7O0lBQVI7UUFFSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztTQUM5QjtLQUNKOztnQkE1QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQiwrUkFBa0M7O2lCQUVyQzs7OztnQkF0Qk8sV0FBVzs7O3dCQTRCZCxLQUFLO3dCQU1MLEtBQUs7O3dCQXZEVjs7U0E0Q2EsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNCbGFua30gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cbi8qKlxuICogUmVuZGVycyBodG1sIHN0ZXAgY29tcG9uZW50XG4gKlxuICogICogVXNhZ2U6XG4gKiAgICAgICBTdHJhaWdodCBmb3J3YXJkIHRvIHVzZS4gQnV0IG1vc3RseSBpdCB3b3VsZCBiZSB1c2VkIGFzIHBhcnQgb2YgdGhlIHN0ZXBwZXIgY29tcG9uZW50LlxuICpcbiAqICAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhdy1wYWdlJyAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1zdGVwIFt0aXRsZV09XCJzdGVwXCIgW2NvbG9yXT1cImNvbG9yXCI+PC9hdy1zdGVwPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gKi9cblxuICAgIC8vIERlZmF1bHQgY29sb3IgZm9yIHRoaXMgc3RlcC5cbmNvbnN0IERFRkFVTFRfQ09MT1IgPSAnIzU4Yjk1Nyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctc3RlcCcsXG4gICAgdGVtcGxhdGVVcmw6ICdzdGVwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc3RlcC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFN0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgICAvKipcbiAgICAgKiBUaGUgY29sb3Igb2Ygc3RlcCBpY29uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29sb3I6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIHRpdGxlIGFwcGVhcnMgdW5kZXIgdGhlIHN0ZXAgZ3JhcGhpY3MuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuY29sb3IpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gREVGQVVMVF9DT0xPUjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==