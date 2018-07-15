/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
                template: `<div class="w-toggle">
    <label class="w-toggle__label" *ngIf="labelText">
        {{ labelText }}
    </label>
    <div class="slider" (click)="changeHandler()">
        <div class="slider__button" [ngClass]="{ 'slider__button--is-active': model === true }"></div>
    </div>
</div>
`,
                styles: [`:host{display:block}.w-toggle input{display:none}.w-toggle__label{color:#999;margin-right:.2rem}.w-toggle .slider{position:relative;height:.6rem;width:1.5rem;background-color:#d8d8d8;border-radius:.9rem;display:inline-block;border-top:1px solid #7e7e7e;border-left:1px solid #b5b5b5;border-right:1px solid #b5b5b5}.w-toggle .slider__button{left:-.1rem;transition:left .1s ease-out;cursor:pointer;position:absolute;height:1rem;width:1rem;border-radius:50%;background-color:#eaeaea;top:-.2rem}.w-toggle .slider__button--is-active{left:calc(100% - .8rem);background-color:#09a7af}`]
            },] },
];
/** @nocollapse */
ToggleSwitchComponent.ctorParameters = () => [
    { type: Environment }
];
ToggleSwitchComponent.propDecorators = {
    model: [{ type: Input }],
    labelText: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLXN3aXRjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy90b2dnbGUtc3dpdGNoL3RvZ2dsZS1zd2l0Y2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQzFDLE1BQU0sNEJBQTZCLFNBQVEsYUFBYTs7OztJQVdwRCxZQUFtQixHQUFnQjtRQUUvQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFGSSxRQUFHLEdBQUgsR0FBRyxDQUFhOzs7O3FCQU5ULEtBQUs7S0FTOUI7Ozs7O0lBS0QsYUFBYTtRQUVULElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQzVCOzs7WUFwQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7Ozs7O0NBUWI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsbWtCQUFta0IsQ0FBQzthQUNobEI7Ozs7WUFwQ08sV0FBVzs7O29CQTJDZCxLQUFLO3dCQUlMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuLyoqXG4gKiBSZW5kZXJzIGEgVG9nZ2xlIFN3aXRjaFxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICpcbiAqICAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgICBzZWxlY3RvcjogJ215VG9nZ2xlU2VjdGlvbicgLFxuICogICAgICAgICAgdGVtcGxhdGU6ICc8YXctdG9nZ2xlIFttb2RlbF09XCJpbnB1dFZhbHVlXCIgW2xhYmVsVGV4dF09XCJsYWJlbFRleHRcIiA+XG4gKiAgICAgICAgICAgICAgPC9hdy10b2dnbGU+J1xuICogICAgICB9KVxuICogICAgICBleHBvcnQgY2xhc3MgTXlOb3RlQ29tcG9uZW50XG4gKiAgICAgIHtcbiAqICAgICAgICAgIGlucHV0VmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAqICAgICAgICAgIGxhYmVsVGV4dDogc3RyaW5nID0gJ215IGxhYmVsJztcbiAqICAgICAgfVxuICpcbiAqIGBgYFxuICovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctdG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3LXRvZ2dsZVwiPlxuICAgIDxsYWJlbCBjbGFzcz1cInctdG9nZ2xlX19sYWJlbFwiICpuZ0lmPVwibGFiZWxUZXh0XCI+XG4gICAgICAgIHt7IGxhYmVsVGV4dCB9fVxuICAgIDwvbGFiZWw+XG4gICAgPGRpdiBjbGFzcz1cInNsaWRlclwiIChjbGljayk9XCJjaGFuZ2VIYW5kbGVyKClcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNsaWRlcl9fYnV0dG9uXCIgW25nQ2xhc3NdPVwieyAnc2xpZGVyX19idXR0b24tLWlzLWFjdGl2ZSc6IG1vZGVsID09PSB0cnVlIH1cIj48L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9ja30udy10b2dnbGUgaW5wdXR7ZGlzcGxheTpub25lfS53LXRvZ2dsZV9fbGFiZWx7Y29sb3I6Izk5OTttYXJnaW4tcmlnaHQ6LjJyZW19LnctdG9nZ2xlIC5zbGlkZXJ7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0Oi42cmVtO3dpZHRoOjEuNXJlbTtiYWNrZ3JvdW5kLWNvbG9yOiNkOGQ4ZDg7Ym9yZGVyLXJhZGl1czouOXJlbTtkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXItdG9wOjFweCBzb2xpZCAjN2U3ZTdlO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjYjViNWI1O2JvcmRlci1yaWdodDoxcHggc29saWQgI2I1YjViNX0udy10b2dnbGUgLnNsaWRlcl9fYnV0dG9ue2xlZnQ6LS4xcmVtO3RyYW5zaXRpb246bGVmdCAuMXMgZWFzZS1vdXQ7Y3Vyc29yOnBvaW50ZXI7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjFyZW07d2lkdGg6MXJlbTtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNlYWVhZWE7dG9wOi0uMnJlbX0udy10b2dnbGUgLnNsaWRlcl9fYnV0dG9uLS1pcy1hY3RpdmV7bGVmdDpjYWxjKDEwMCUgLSAuOHJlbSk7YmFja2dyb3VuZC1jb2xvcjojMDlhN2FmfWBdXG59KVxuXG5leHBvcnQgY2xhc3MgVG9nZ2xlU3dpdGNoQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqIHRvZ2dsZSBtb2RlbFxuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGVsOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogbGFiZWwgdGV4dFxuICAgICAqL1xuICAgIEBJbnB1dCgpIGxhYmVsVGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNsaWNrIGhhbmRsZXIgZm9yIHRvZ2dsZVxuICAgICAqL1xuICAgIGNoYW5nZUhhbmRsZXIoKVxuICAgIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9ICF0aGlzLm1vZGVsO1xuICAgIH1cbn1cblxuXG4iXX0=