/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Environment, isBlank } from '@aribaui/core';
/**
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
 */
const /** @type {?} */ DEFAULT_COLOR = '#58b957';
export class StepComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        this.env = env;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isBlank(this.color)) {
            this.color = DEFAULT_COLOR;
        }
    }
}
StepComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-step',
                template: `<div class="step-container">
    <div class="outer-circle" [style.borderColor]="color">
        <div class="inner-circle" [style.borderColor]="color" [style.backgroundColor]="color"></div>
    </div>

    <div class="step-title">{{title}}</div>
</div>

`,
                styles: [`.step-container{position:relative;width:32px}.outer-circle{width:26px;height:26px;border-radius:50%;background-color:#fff;border:3px solid #58b957;position:relative}.inner-circle{width:8px;height:8px;border-radius:50%;border:2px solid #58b957;background-color:#58b957;margin:0 auto;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.step-title{position:absolute;width:150px;top:40px;left:-60px;text-align:center}`]
            },] },
];
/** @nocollapse */
StepComponent.ctorParameters = () => [
    { type: Environment }
];
StepComponent.propDecorators = {
    color: [{ type: Input }],
    title: [{ type: Input }]
};
function StepComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zdGVwcGVyL3N0ZXAvc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWdCbkQsdUJBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQztBQWVoQyxNQUFNOzs7O0lBY0YsWUFBbUIsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTtLQUVsQzs7OztJQUVELFFBQVE7UUFFSixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztTQUM5QjtLQUNKOzs7WUFwQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUU7Ozs7Ozs7O0NBUWI7Z0JBQ0csTUFBTSxFQUFFLENBQUMscWRBQXFkLENBQUM7YUFDbGU7Ozs7WUE5Qk8sV0FBVzs7O29CQW9DZCxLQUFLO29CQU1MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmt9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG4vKipcbiAqIFJlbmRlcnMgaHRtbCBzdGVwIGNvbXBvbmVudFxuICpcbiAqICAqIFVzYWdlOlxuICogICAgICAgU3RyYWlnaHQgZm9yd2FyZCB0byB1c2UuIEJ1dCBtb3N0bHkgaXQgd291bGQgYmUgdXNlZCBhcyBwYXJ0IG9mIHRoZSBzdGVwcGVyIGNvbXBvbmVudC5cbiAqXG4gKiAgICAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYXctcGFnZScgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctc3RlcCBbdGl0bGVdPVwic3RlcFwiIFtjb2xvcl09XCJjb2xvclwiPjwvYXctc3RlcD5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICovXG5cbiAgICAvLyBEZWZhdWx0IGNvbG9yIGZvciB0aGlzIHN0ZXAuXG5jb25zdCBERUZBVUxUX0NPTE9SID0gJyM1OGI5NTcnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXN0ZXAnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInN0ZXAtY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cIm91dGVyLWNpcmNsZVwiIFtzdHlsZS5ib3JkZXJDb2xvcl09XCJjb2xvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItY2lyY2xlXCIgW3N0eWxlLmJvcmRlckNvbG9yXT1cImNvbG9yXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb2xvclwiPjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInN0ZXAtdGl0bGVcIj57e3RpdGxlfX08L2Rpdj5cbjwvZGl2PlxuXG5gLFxuICAgIHN0eWxlczogW2Auc3RlcC1jb250YWluZXJ7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MzJweH0ub3V0ZXItY2lyY2xle3dpZHRoOjI2cHg7aGVpZ2h0OjI2cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlcjozcHggc29saWQgIzU4Yjk1Nztwb3NpdGlvbjpyZWxhdGl2ZX0uaW5uZXItY2lyY2xle3dpZHRoOjhweDtoZWlnaHQ6OHB4O2JvcmRlci1yYWRpdXM6NTAlO2JvcmRlcjoycHggc29saWQgIzU4Yjk1NztiYWNrZ3JvdW5kLWNvbG9yOiM1OGI5NTc7bWFyZ2luOjAgYXV0bztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKX0uc3RlcC10aXRsZXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxNTBweDt0b3A6NDBweDtsZWZ0Oi02MHB4O3RleHQtYWxpZ246Y2VudGVyfWBdXG59KVxuZXhwb3J0IGNsYXNzIFN0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgICAvKipcbiAgICAgKiBUaGUgY29sb3Igb2Ygc3RlcCBpY29uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29sb3I6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIHRpdGxlIGFwcGVhcnMgdW5kZXIgdGhlIHN0ZXAgZ3JhcGhpY3MuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuY29sb3IpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gREVGQVVMVF9DT0xPUjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==