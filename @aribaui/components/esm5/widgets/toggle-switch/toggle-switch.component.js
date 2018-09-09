/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { Environment } from '@aribaui/core';
/**
 * Renders a Toggle Switch
 *
 * ### Example
 *
 * ```typescript
 *
 * \@Component({
 *          selector: 'myToggleSection' ,
 *          template: '<aw-toggle [model]="inputValue" [labelText]="labelText" >
 *              </aw-toggle>'
 *      })
 *      export class MyNoteComponent
 *      {
 *          inputValue: boolean = false;
 *          labelText: string = 'my label';
 *      }
 *
 * ```
 */
var ToggleSwitchComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToggleSwitchComponent, _super);
    function ToggleSwitchComponent(env) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        /**
         * toggle model
         */
        _this.model = false;
        return _this;
    }
    /**
     * click handler for toggle
     */
    /**
     * click handler for toggle
     * @return {?}
     */
    ToggleSwitchComponent.prototype.changeHandler = /**
     * click handler for toggle
     * @return {?}
     */
    function () {
        this.model = !this.model;
    };
    ToggleSwitchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-toggle',
                    template: "<div class=\"w-toggle\">\n    <label class=\"w-toggle__label\" *ngIf=\"labelText\">\n        {{ labelText }}\n    </label>\n    <div class=\"slider\" (click)=\"changeHandler()\">\n        <div class=\"slider__button\" [ngClass]=\"{ 'slider__button--is-active': model === true }\"></div>\n    </div>\n</div>\n",
                    styles: [":host{display:block}.w-toggle input{display:none}.w-toggle__label{color:#999;margin-right:.2rem}.w-toggle .slider{position:relative;height:.6rem;width:1.5rem;background-color:#d8d8d8;border-radius:.9rem;display:inline-block;border-top:1px solid #7e7e7e;border-left:1px solid #b5b5b5;border-right:1px solid #b5b5b5}.w-toggle .slider__button{left:-.1rem;transition:left .1s ease-out;cursor:pointer;position:absolute;height:1rem;width:1rem;border-radius:50%;background-color:#eaeaea;top:-.2rem}.w-toggle .slider__button--is-active{left:calc(100% - .8rem);background-color:#09a7af}"]
                }] }
    ];
    /** @nocollapse */
    ToggleSwitchComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    ToggleSwitchComponent.propDecorators = {
        model: [{ type: Input }],
        labelText: [{ type: Input }]
    };
    return ToggleSwitchComponent;
}(BaseComponent));
export { ToggleSwitchComponent };
if (false) {
    /**
     * toggle model
     * @type {?}
     */
    ToggleSwitchComponent.prototype.model;
    /**
     * label text
     * @type {?}
     */
    ToggleSwitchComponent.prototype.labelText;
    /** @type {?} */
    ToggleSwitchComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLXN3aXRjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy90b2dnbGUtc3dpdGNoL3RvZ2dsZS1zd2l0Y2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBOEJDLGlEQUFhO0lBV3BELCtCQUFtQixHQUFnQjtRQUFuQyxZQUVJLGtCQUFNLEdBQUcsQ0FBQyxTQUNiO1FBSGtCLFNBQUcsR0FBSCxHQUFHLENBQWE7Ozs7c0JBTlQsS0FBSzs7S0FTOUI7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2Q0FBYTs7OztJQUFiO1FBRUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUI7O2dCQTVCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGdVQUE2Qzs7aUJBRWhEOzs7O2dCQTVCTyxXQUFXOzs7d0JBbUNkLEtBQUs7NEJBSUwsS0FBSzs7Z0NBN0RWO0VBb0QyQyxhQUFhO1NBQTNDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG4vKipcbiAqIFJlbmRlcnMgYSBUb2dnbGUgU3dpdGNoXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKlxuICogICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgIHNlbGVjdG9yOiAnbXlUb2dnbGVTZWN0aW9uJyAsXG4gKiAgICAgICAgICB0ZW1wbGF0ZTogJzxhdy10b2dnbGUgW21vZGVsXT1cImlucHV0VmFsdWVcIiBbbGFiZWxUZXh0XT1cImxhYmVsVGV4dFwiID5cbiAqICAgICAgICAgICAgICA8L2F3LXRvZ2dsZT4nXG4gKiAgICAgIH0pXG4gKiAgICAgIGV4cG9ydCBjbGFzcyBNeU5vdGVDb21wb25lbnRcbiAqICAgICAge1xuICogICAgICAgICAgaW5wdXRWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICogICAgICAgICAgbGFiZWxUZXh0OiBzdHJpbmcgPSAnbXkgbGFiZWwnO1xuICogICAgICB9XG4gKlxuICogYGBgXG4gKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy10b2dnbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b2dnbGUtc3dpdGNoLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b2dnbGUtc3dpdGNoLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBUb2dnbGVTd2l0Y2hDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogdG9nZ2xlIG1vZGVsXG4gICAgICovXG4gICAgQElucHV0KCkgbW9kZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBsYWJlbCB0ZXh0XG4gICAgICovXG4gICAgQElucHV0KCkgbGFiZWxUZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2xpY2sgaGFuZGxlciBmb3IgdG9nZ2xlXG4gICAgICovXG4gICAgY2hhbmdlSGFuZGxlcigpXG4gICAge1xuICAgICAgICB0aGlzLm1vZGVsID0gIXRoaXMubW9kZWw7XG4gICAgfVxufVxuXG5cbiJdfQ==