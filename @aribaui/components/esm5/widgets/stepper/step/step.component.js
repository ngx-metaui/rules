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
var /** @type {?} */ DEFAULT_COLOR = '#58b957';
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
                },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zdGVwcGVyL3N0ZXAvc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWdCbkQscUJBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQzs7SUE2QjVCLHVCQUFtQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0tBRWxDOzs7O0lBRUQsZ0NBQVE7OztJQUFSO1FBRUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7U0FDOUI7S0FDSjs7Z0JBcENKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLHFSQVFiO29CQUNHLE1BQU0sRUFBRSxDQUFDLHFkQUFxZCxDQUFDO2lCQUNsZTs7OztnQkE5Qk8sV0FBVzs7O3dCQW9DZCxLQUFLO3dCQU1MLEtBQUs7O3dCQS9EVjs7U0FvRGEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNCbGFua30gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cbi8qKlxuICogUmVuZGVycyBodG1sIHN0ZXAgY29tcG9uZW50XG4gKlxuICogICogVXNhZ2U6XG4gKiAgICAgICBTdHJhaWdodCBmb3J3YXJkIHRvIHVzZS4gQnV0IG1vc3RseSBpdCB3b3VsZCBiZSB1c2VkIGFzIHBhcnQgb2YgdGhlIHN0ZXBwZXIgY29tcG9uZW50LlxuICpcbiAqICAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhdy1wYWdlJyAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1zdGVwIFt0aXRsZV09XCJzdGVwXCIgW2NvbG9yXT1cImNvbG9yXCI+PC9hdy1zdGVwPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gKi9cblxuICAgIC8vIERlZmF1bHQgY29sb3IgZm9yIHRoaXMgc3RlcC5cbmNvbnN0IERFRkFVTFRfQ09MT1IgPSAnIzU4Yjk1Nyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctc3RlcCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic3RlcC1jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwib3V0ZXItY2lyY2xlXCIgW3N0eWxlLmJvcmRlckNvbG9yXT1cImNvbG9yXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci1jaXJjbGVcIiBbc3R5bGUuYm9yZGVyQ29sb3JdPVwiY29sb3JcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImNvbG9yXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic3RlcC10aXRsZVwiPnt7dGl0bGV9fTwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gICAgc3R5bGVzOiBbYC5zdGVwLWNvbnRhaW5lcntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDozMnB4fS5vdXRlci1jaXJjbGV7d2lkdGg6MjZweDtoZWlnaHQ6MjZweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjNweCBzb2xpZCAjNThiOTU3O3Bvc2l0aW9uOnJlbGF0aXZlfS5pbm5lci1jaXJjbGV7d2lkdGg6OHB4O2hlaWdodDo4cHg7Ym9yZGVyLXJhZGl1czo1MCU7Ym9yZGVyOjJweCBzb2xpZCAjNThiOTU3O2JhY2tncm91bmQtY29sb3I6IzU4Yjk1NzttYXJnaW46MCBhdXRvO3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpfS5zdGVwLXRpdGxle3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjE1MHB4O3RvcDo0MHB4O2xlZnQ6LTYwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9YF1cbn0pXG5leHBvcnQgY2xhc3MgU3RlcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuICAgIC8qKlxuICAgICAqIFRoZSBjb2xvciBvZiBzdGVwIGljb24uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb2xvcjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogdGl0bGUgYXBwZWFycyB1bmRlciB0aGUgc3RlcCBncmFwaGljcy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5jb2xvcikpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBERUZBVUxUX0NPTE9SO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19