/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../core';
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
                },] },
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
function ToggleSwitchComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLXN3aXRjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy90b2dnbGUtc3dpdGNoL3RvZ2dsZS1zd2l0Y2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNDQyxpREFBYTtJQVdwRCwrQkFBbUIsR0FBZ0I7UUFBbkMsWUFFSSxrQkFBTSxHQUFHLENBQUMsU0FDYjtRQUhrQixTQUFHLEdBQUgsR0FBRyxDQUFhOzs7O3NCQU5ULEtBQUs7O0tBUzlCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNkNBQWE7Ozs7SUFBYjtRQUVJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQzVCOztnQkFwQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsc1RBUWI7b0JBQ0csTUFBTSxFQUFFLENBQUMsbWtCQUFta0IsQ0FBQztpQkFDaGxCOzs7O2dCQXBDTyxXQUFXOzs7d0JBMkNkLEtBQUs7NEJBSUwsS0FBSzs7Z0NBckVWO0VBNEQyQyxhQUFhO1NBQTNDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG4vKipcbiAqIFJlbmRlcnMgYSBUb2dnbGUgU3dpdGNoXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKlxuICogICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgIHNlbGVjdG9yOiAnbXlUb2dnbGVTZWN0aW9uJyAsXG4gKiAgICAgICAgICB0ZW1wbGF0ZTogJzxhdy10b2dnbGUgW21vZGVsXT1cImlucHV0VmFsdWVcIiBbbGFiZWxUZXh0XT1cImxhYmVsVGV4dFwiID5cbiAqICAgICAgICAgICAgICA8L2F3LXRvZ2dsZT4nXG4gKiAgICAgIH0pXG4gKiAgICAgIGV4cG9ydCBjbGFzcyBNeU5vdGVDb21wb25lbnRcbiAqICAgICAge1xuICogICAgICAgICAgaW5wdXRWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICogICAgICAgICAgbGFiZWxUZXh0OiBzdHJpbmcgPSAnbXkgbGFiZWwnO1xuICogICAgICB9XG4gKlxuICogYGBgXG4gKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy10b2dnbGUnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInctdG9nZ2xlXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwidy10b2dnbGVfX2xhYmVsXCIgKm5nSWY9XCJsYWJlbFRleHRcIj5cbiAgICAgICAge3sgbGFiZWxUZXh0IH19XG4gICAgPC9sYWJlbD5cbiAgICA8ZGl2IGNsYXNzPVwic2xpZGVyXCIgKGNsaWNrKT1cImNoYW5nZUhhbmRsZXIoKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2xpZGVyX19idXR0b25cIiBbbmdDbGFzc109XCJ7ICdzbGlkZXJfX2J1dHRvbi0taXMtYWN0aXZlJzogbW9kZWwgPT09IHRydWUgfVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdHtkaXNwbGF5OmJsb2NrfS53LXRvZ2dsZSBpbnB1dHtkaXNwbGF5Om5vbmV9LnctdG9nZ2xlX19sYWJlbHtjb2xvcjojOTk5O21hcmdpbi1yaWdodDouMnJlbX0udy10b2dnbGUgLnNsaWRlcntwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6LjZyZW07d2lkdGg6MS41cmVtO2JhY2tncm91bmQtY29sb3I6I2Q4ZDhkODtib3JkZXItcmFkaXVzOi45cmVtO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JvcmRlci10b3A6MXB4IHNvbGlkICM3ZTdlN2U7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNiNWI1YjU7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjYjViNWI1fS53LXRvZ2dsZSAuc2xpZGVyX19idXR0b257bGVmdDotLjFyZW07dHJhbnNpdGlvbjpsZWZ0IC4xcyBlYXNlLW91dDtjdXJzb3I6cG9pbnRlcjtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MXJlbTt3aWR0aDoxcmVtO2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6I2VhZWFlYTt0b3A6LS4ycmVtfS53LXRvZ2dsZSAuc2xpZGVyX19idXR0b24tLWlzLWFjdGl2ZXtsZWZ0OmNhbGMoMTAwJSAtIC44cmVtKTtiYWNrZ3JvdW5kLWNvbG9yOiMwOWE3YWZ9YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUb2dnbGVTd2l0Y2hDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogdG9nZ2xlIG1vZGVsXG4gICAgICovXG4gICAgQElucHV0KCkgbW9kZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBsYWJlbCB0ZXh0XG4gICAgICovXG4gICAgQElucHV0KCkgbGFiZWxUZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2xpY2sgaGFuZGxlciBmb3IgdG9nZ2xlXG4gICAgICovXG4gICAgY2hhbmdlSGFuZGxlcigpXG4gICAge1xuICAgICAgICB0aGlzLm1vZGVsID0gIXRoaXMubW9kZWw7XG4gICAgfVxufVxuXG5cbiJdfQ==