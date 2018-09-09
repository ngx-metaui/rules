/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class ToggleSwitchComponent extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * toggle model
         */
        this.model = false;
    }
    /**
     * click handler for toggle
     * @return {?}
     */
    changeHandler() {
        this.model = !this.model;
    }
}
ToggleSwitchComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-toggle',
                template: "<div class=\"w-toggle\">\n    <label class=\"w-toggle__label\" *ngIf=\"labelText\">\n        {{ labelText }}\n    </label>\n    <div class=\"slider\" (click)=\"changeHandler()\">\n        <div class=\"slider__button\" [ngClass]=\"{ 'slider__button--is-active': model === true }\"></div>\n    </div>\n</div>\n",
                styles: [":host{display:block}.w-toggle input{display:none}.w-toggle__label{color:#999;margin-right:.2rem}.w-toggle .slider{position:relative;height:.6rem;width:1.5rem;background-color:#d8d8d8;border-radius:.9rem;display:inline-block;border-top:1px solid #7e7e7e;border-left:1px solid #b5b5b5;border-right:1px solid #b5b5b5}.w-toggle .slider__button{left:-.1rem;transition:left .1s ease-out;cursor:pointer;position:absolute;height:1rem;width:1rem;border-radius:50%;background-color:#eaeaea;top:-.2rem}.w-toggle .slider__button--is-active{left:calc(100% - .8rem);background-color:#09a7af}"]
            }] }
];
/** @nocollapse */
ToggleSwitchComponent.ctorParameters = () => [
    { type: Environment }
];
ToggleSwitchComponent.propDecorators = {
    model: [{ type: Input }],
    labelText: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLXN3aXRjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy90b2dnbGUtc3dpdGNoL3RvZ2dsZS1zd2l0Y2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCMUMsTUFBTSw0QkFBNkIsU0FBUSxhQUFhOzs7O0lBV3BELFlBQW1CLEdBQWdCO1FBRS9CLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZJLFFBQUcsR0FBSCxHQUFHLENBQWE7Ozs7cUJBTlQsS0FBSztLQVM5Qjs7Ozs7SUFLRCxhQUFhO1FBRVQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUI7OztZQTVCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLGdVQUE2Qzs7YUFFaEQ7Ozs7WUE1Qk8sV0FBVzs7O29CQW1DZCxLQUFLO3dCQUlMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuLyoqXG4gKiBSZW5kZXJzIGEgVG9nZ2xlIFN3aXRjaFxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICpcbiAqICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICBzZWxlY3RvcjogJ215VG9nZ2xlU2VjdGlvbicgLFxuICogICAgICAgICAgdGVtcGxhdGU6ICc8YXctdG9nZ2xlIFttb2RlbF09XCJpbnB1dFZhbHVlXCIgW2xhYmVsVGV4dF09XCJsYWJlbFRleHRcIiA+XG4gKiAgICAgICAgICAgICAgPC9hdy10b2dnbGU+J1xuICogICAgICB9KVxuICogICAgICBleHBvcnQgY2xhc3MgTXlOb3RlQ29tcG9uZW50XG4gKiAgICAgIHtcbiAqICAgICAgICAgIGlucHV0VmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAqICAgICAgICAgIGxhYmVsVGV4dDogc3RyaW5nID0gJ215IGxhYmVsJztcbiAqICAgICAgfVxuICpcbiAqIGBgYFxuICovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctdG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdG9nZ2xlLXN3aXRjaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdG9nZ2xlLXN3aXRjaC5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgVG9nZ2xlU3dpdGNoQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqIHRvZ2dsZSBtb2RlbFxuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGVsOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogbGFiZWwgdGV4dFxuICAgICAqL1xuICAgIEBJbnB1dCgpIGxhYmVsVGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNsaWNrIGhhbmRsZXIgZm9yIHRvZ2dsZVxuICAgICAqL1xuICAgIGNoYW5nZUhhbmRsZXIoKVxuICAgIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9ICF0aGlzLm1vZGVsO1xuICAgIH1cbn1cblxuXG4iXX0=