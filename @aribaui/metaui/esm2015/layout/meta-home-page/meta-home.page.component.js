/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { BaseComponent } from '@aribaui/components';
import { Environment, isPresent } from '@aribaui/core';
import { ActivatedRoute } from '@angular/router';
import { UIMeta } from '../../core/uimeta';
/**
 * Default homePage implementation for a Module. Just like on the example bellow when we define a
 * module without a homePage this MetaHomePageComponent will be used.
 *
 * ```
 *
 * \@module=Home {
 *       label:"My Home";
 *       pageTitle:"You are now on Homepage";
 *
 * \@layout=Today {
 *          after:zTop;
 *          label: "Sales Graph";
 *          component:SalesGraphComponent;
 *     }
 *  }
 *
 * ```
 * Or you can decide not to use this MetaHomePage and Provide your own e.g:
 *
 * ```
 * \@module=Products {
 *      label:"Products for Somethig";
 *      pageTitle:"You are now on Products";
 *      homePage:ProductContentComponent;
 *  }
 *
 * ```
 *
 *
 */
export class MetaHomePageComponent extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} activatedRoute
     */
    constructor(env, activatedRoute) {
        super(env);
        this.env = env;
        this.activatedRoute = activatedRoute;
    }
    /**
     *
     * This page is triggered by router and we expect a module to be passed in by routing
     * params
     *
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        let /** @type {?} */ routeParams = this.activatedRoute.snapshot.params;
        if (isPresent(routeParams) && isPresent(routeParams[UIMeta.KeyModule])) {
            this.module = routeParams[UIMeta.KeyModule];
        }
    }
    /**
     * @return {?}
     */
    hasModule() {
        return isPresent(this.module);
    }
}
MetaHomePageComponent.decorators = [
    { type: Component, args: [{
                selector: 'm-home-page',
                template: `<div class="m-page" *ngIf="hasModule()">
    <m-context [module]="module">
        <m-include-component></m-include-component>
    </m-context>

</div>


`,
                styles: [`.m-page{width:100%;margin:0 auto;padding:5px}.m-page:after{content:".";display:block;height:0;clear:both;visibility:hidden}.module-footer{clear:both}`]
            },] },
];
/** @nocollapse */
MetaHomePageComponent.ctorParameters = () => [
    { type: Environment },
    { type: ActivatedRoute }
];
MetaHomePageComponent.propDecorators = {
    module: [{ type: Input }]
};
function MetaHomePageComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MetaHomePageComponent.prototype.module;
    /** @type {?} */
    MetaHomePageComponent.prototype.env;
    /** @type {?} */
    MetaHomePageComponent.prototype.activatedRoute;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1ob21lLnBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtaG9tZS1wYWdlL21ldGEtaG9tZS5wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStDekMsTUFBTSw0QkFBNkIsU0FBUSxhQUFhOzs7OztJQU1wRCxZQUFtQixHQUFnQixFQUFVLGNBQThCO1FBRXZFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZJLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7S0FHMUU7Ozs7Ozs7O0lBU0QsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixxQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0M7S0FDSjs7OztJQUVELFNBQVM7UUFFTCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqQzs7O1lBNUNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7Ozs7OztDQVFiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLHVKQUF1SixDQUFDO2FBQ3BLOzs7O1lBaERPLFdBQVc7WUFDWCxjQUFjOzs7cUJBbURqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uLy4uL2NvcmUvdWltZXRhJztcblxuXG4vKipcbiAqIERlZmF1bHQgaG9tZVBhZ2UgaW1wbGVtZW50YXRpb24gZm9yIGEgTW9kdWxlLiBKdXN0IGxpa2Ugb24gdGhlIGV4YW1wbGUgYmVsbG93IHdoZW4gd2UgZGVmaW5lIGFcbiAqIG1vZHVsZSB3aXRob3V0IGEgaG9tZVBhZ2UgdGhpcyBNZXRhSG9tZVBhZ2VDb21wb25lbnQgd2lsbCBiZSB1c2VkLlxuICpcbiAqIGBgYFxuICpcbiAqICAgQG1vZHVsZT1Ib21lIHtcbiAqICAgICAgIGxhYmVsOlwiTXkgSG9tZVwiO1xuICogICAgICAgcGFnZVRpdGxlOlwiWW91IGFyZSBub3cgb24gSG9tZXBhZ2VcIjtcbiAqXG4gKiAgICAgICBAbGF5b3V0PVRvZGF5IHtcbiAqICAgICAgICAgIGFmdGVyOnpUb3A7XG4gKiAgICAgICAgICBsYWJlbDogXCJTYWxlcyBHcmFwaFwiO1xuICogICAgICAgICAgY29tcG9uZW50OlNhbGVzR3JhcGhDb21wb25lbnQ7XG4gKiAgICAgfVxuICogIH1cbiAqXG4gKiBgYGBcbiAqIE9yIHlvdSBjYW4gZGVjaWRlIG5vdCB0byB1c2UgdGhpcyBNZXRhSG9tZVBhZ2UgYW5kIFByb3ZpZGUgeW91ciBvd24gZS5nOlxuICpcbiAqIGBgYFxuICogIEBtb2R1bGU9UHJvZHVjdHMge1xuICogICAgICBsYWJlbDpcIlByb2R1Y3RzIGZvciBTb21ldGhpZ1wiO1xuICogICAgICBwYWdlVGl0bGU6XCJZb3UgYXJlIG5vdyBvbiBQcm9kdWN0c1wiO1xuICogICAgICBob21lUGFnZTpQcm9kdWN0Q29udGVudENvbXBvbmVudDtcbiAqICB9XG4gKlxuICogYGBgXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtLWhvbWUtcGFnZScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibS1wYWdlXCIgKm5nSWY9XCJoYXNNb2R1bGUoKVwiPlxuICAgIDxtLWNvbnRleHQgW21vZHVsZV09XCJtb2R1bGVcIj5cbiAgICAgICAgPG0taW5jbHVkZS1jb21wb25lbnQ+PC9tLWluY2x1ZGUtY29tcG9uZW50PlxuICAgIDwvbS1jb250ZXh0PlxuXG48L2Rpdj5cblxuXG5gLFxuICAgIHN0eWxlczogW2AubS1wYWdle3dpZHRoOjEwMCU7bWFyZ2luOjAgYXV0bztwYWRkaW5nOjVweH0ubS1wYWdlOmFmdGVye2NvbnRlbnQ6XCIuXCI7ZGlzcGxheTpibG9jaztoZWlnaHQ6MDtjbGVhcjpib3RoO3Zpc2liaWxpdHk6aGlkZGVufS5tb2R1bGUtZm9vdGVye2NsZWFyOmJvdGh9YF1cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUhvbWVQYWdlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgQElucHV0KClcbiAgICBtb2R1bGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSlcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoaXMgcGFnZSBpcyB0cmlnZ2VyZWQgYnkgcm91dGVyIGFuZCB3ZSBleHBlY3QgYSBtb2R1bGUgdG8gYmUgcGFzc2VkIGluIGJ5IHJvdXRpbmdcbiAgICAgKiBwYXJhbXNcbiAgICAgKlxuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgbGV0IHJvdXRlUGFyYW1zID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXM7XG4gICAgICAgIGlmIChpc1ByZXNlbnQocm91dGVQYXJhbXMpICYmIGlzUHJlc2VudChyb3V0ZVBhcmFtc1tVSU1ldGEuS2V5TW9kdWxlXSkpIHtcbiAgICAgICAgICAgIHRoaXMubW9kdWxlID0gcm91dGVQYXJhbXNbVUlNZXRhLktleU1vZHVsZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNNb2R1bGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLm1vZHVsZSk7XG4gICAgfVxufVxuIl19