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
const DEFAULT_COLOR = '#58b957';
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
                template: "<div class=\"step-container\">\n    <div class=\"outer-circle\" [style.borderColor]=\"color\">\n        <div class=\"inner-circle\" [style.borderColor]=\"color\" [style.backgroundColor]=\"color\"></div>\n    </div>\n\n    <div class=\"step-title\">{{title}}</div>\n</div>\n\n",
                styles: [".step-container{position:relative;width:32px}.outer-circle{width:26px;height:26px;border-radius:50%;background-color:#fff;border:3px solid #58b957;position:relative}.inner-circle{width:8px;height:8px;border-radius:50%;border:2px solid #58b957;background-color:#58b957;margin:0 auto;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.step-title{position:absolute;width:150px;top:40px;left:-60px;text-align:center}"]
            }] }
];
/** @nocollapse */
StepComponent.ctorParameters = () => [
    { type: Environment }
];
StepComponent.propDecorators = {
    color: [{ type: Input }],
    title: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zdGVwcGVyL3N0ZXAvc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWdCbkQsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBT2hDLE1BQU07Ozs7SUFjRixZQUFtQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0tBRWxDOzs7O0lBRUQsUUFBUTtRQUVKLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1NBQzlCO0tBQ0o7OztZQTVCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLCtSQUFrQzs7YUFFckM7Ozs7WUF0Qk8sV0FBVzs7O29CQTRCZCxLQUFLO29CQU1MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmt9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG4vKipcbiAqIFJlbmRlcnMgaHRtbCBzdGVwIGNvbXBvbmVudFxuICpcbiAqICAqIFVzYWdlOlxuICogICAgICAgU3RyYWlnaHQgZm9yd2FyZCB0byB1c2UuIEJ1dCBtb3N0bHkgaXQgd291bGQgYmUgdXNlZCBhcyBwYXJ0IG9mIHRoZSBzdGVwcGVyIGNvbXBvbmVudC5cbiAqXG4gKiAgICAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYXctcGFnZScgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctc3RlcCBbdGl0bGVdPVwic3RlcFwiIFtjb2xvcl09XCJjb2xvclwiPjwvYXctc3RlcD5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICovXG5cbiAgICAvLyBEZWZhdWx0IGNvbG9yIGZvciB0aGlzIHN0ZXAuXG5jb25zdCBERUZBVUxUX0NPTE9SID0gJyM1OGI5NTcnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXN0ZXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnc3RlcC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3N0ZXAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG4gICAgLyoqXG4gICAgICogVGhlIGNvbG9yIG9mIHN0ZXAgaWNvbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbG9yOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiB0aXRsZSBhcHBlYXJzIHVuZGVyIHRoZSBzdGVwIGdyYXBoaWNzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmNvbG9yKSkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IERFRkFVTFRfQ09MT1I7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=