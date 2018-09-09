/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { MetaLayout } from '../meta-layout';
import { MetaContextComponent } from '../../core/meta-context/meta-context.component';
import { UIMeta } from '../../core/uimeta';
/** *
 *
 * Defines 4 sizes for the portlet size
 *
  @type {?} */
const PortletSizes = {
    'small': 'ui-md-3',
    'medium': 'ui-md-4',
    'wide': 'ui-md-6',
    'large': 'ui-md-12'
};
/**
 * Simple Dashboard implementation for the homePage. Just like we support inside MetaFormTable
 * different zones and distribute fields to them, we do the same with defined layouts.
 *
 * This dashboard supports 3 zones.
 *
 *    zToc: This is the place where usually all the actions or 2nd level navigation will go
 *    zTop,zBottom: is where the portlets are rendered.
 *
 *
 * To distribute layouts to different zones :
 *
 * ```
 * \@module=Home {
 *           label:"My Home";
 *           pageTitle:"You are now on Homepage";
 *
 *
 * \@layout=Today {
 *              after:zTop;
 *              label: "Sales Graph";
 *              component:SalesGraphComponent;
 *
 *           }
 *
 * \@layout=Sport {
 *              after:Today;
 *              label: "Sport today!";
 *              component:StringComponent;
 *              bindings:{value:"The Texas Tech quarterback arrived at  " }
 *
 *           }
 *
 * ```
 *
 *  or Push actions to the zToc zone:
 *
 * ```
 * \@module=Home {
 *           label:"My Home";
 *           pageTitle:"You are now on Homepage";
 *
 *
 * \@layout=Today {
 *              after:zTop;
 *              label: "Sales Graph";
 *              component:SalesGraphComponent;
 *
 *           }
 *
 * \@layout=Actions#ActionLinks {
 *               label:$[a004]Actions;
 *                after:zToc;
 *            }
 *
 *
 * \@actionCategory=Create {
 * \@action=NewBlog#pageAction { pageName:blogPage;}
 * \@action=NewChart#pageAction { pageName:chartPage;}
 *           }
 *
 * }
 *
 *
 *
 */
export class MetaDashboardLayoutComponent extends MetaLayout {
    /**
     * @param {?} metaContext
     * @param {?} env
     */
    constructor(metaContext, env) {
        super(metaContext, env);
        /**
         * Defines if sidebar is collapsed or expanded
         *
         */
        this.activeMenu = false;
        /**
         * Current Module name
         *
         */
        this.dashboardName = '';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.dashboardName = this.label();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleMenu(event) {
        this.activeMenu = !this.activeMenu;
    }
    /**
     * @return {?}
     */
    zones() {
        return MetaDashboardLayoutComponent.ZonesTB;
    }
    /**
     * @return {?}
     */
    topLayouts() {
        /** @type {?} */
        let tops = this.layoutsByZones.get(UIMeta.ZoneTop);
        return isPresent(tops) ? tops : [];
    }
    /**
     * @param {?} name
     * @return {?}
     */
    portletWidth(name) {
        /** @type {?} */
        let lContext = this.contextMap.get(name);
        /** @type {?} */
        let width = lContext.propertyForKey('portletWidth');
        return isPresent(width) && isPresent(PortletSizes[width]) ? PortletSizes[width] :
            'ui-md-4';
    }
    /**
     * @return {?}
     */
    bottomLayouts() {
        /** @type {?} */
        let bottom = this.layoutsByZones.get(UIMeta.ZoneBottom);
        return isPresent(bottom) ? bottom : [];
    }
    /**
     * @return {?}
     */
    zTocLayouts() {
        /** @type {?} */
        let bottom = this.layoutsByZones.get(MetaDashboardLayoutComponent.ZoneToc);
        return isPresent(bottom) ? bottom : [];
    }
}
/**
 * New defined zone for Actions
 *
 */
MetaDashboardLayoutComponent.ZoneToc = 'zToc';
MetaDashboardLayoutComponent.ZonesTB = [
    MetaDashboardLayoutComponent.ZoneToc, UIMeta.ZoneTop,
    UIMeta.ZoneBottom
];
MetaDashboardLayoutComponent.decorators = [
    { type: Component, args: [{
                template: "<div>\n    <span class=\"m-dashbord-name\">{{dashboardName}} </span>\n    <span class=\"m-dashbord-lbl\"> Dashboard</span>\n</div>\n\n\n<div id=\"m-toggle-bar\" *ngIf=\"zTocLayouts().length > 0\">\n    <aw-hyperlink (action)=\"toggleMenu($event)\" [size]=\"'large'\">\n        <i class=\"fa fa-bars\"></i>\n    </aw-hyperlink>\n</div>\n<div id=\"m-toc\" [class.active]=\"activeMenu\" *ngIf=\"zTocLayouts().length > 0\">\n    <div class=\"ui-g \">\n        <m-context *ngFor=\"let layout of zTocLayouts()\"\n                   [layout]=\"layout.name\" (afterContextSet)=\"afterContextSet($event)\"\n                   (beforeContextSet)=\"beforeContextSet($event)\">\n\n            <div class=\"ui-g-12 \" [ngClass]=\"portletWidth(layout.name)\">\n                <p-panel [header]=\"labelForContext(layout.name)\">\n                    <m-include-component></m-include-component>\n                </p-panel>\n            </div>\n        </m-context>\n    </div>\n</div>\n\n<div id=\"m-content\">\n    <div class=\"ui-g m-dashboard\">\n        <!-- top -->\n        <div class=\"ui-g-12\">\n            <div class=\"ui-g \">\n                <m-context *ngFor=\"let layout of topLayouts()\"\n                           [layout]=\"layout.name\" (afterContextSet)=\"afterContextSet($event)\"\n                           (beforeContextSet)=\"beforeContextSet($event)\">\n\n                    <div class=\"ui-g-12 \" [ngClass]=\"portletWidth(layout.name)\">\n                        <p-panel [header]=\"labelForContext(layout.name)\" [toggleable]=\"false\">\n                            <m-include-component></m-include-component>\n                        </p-panel>\n                    </div>\n                </m-context>\n            </div>\n        </div>\n\n        <!-- bottom -->\n        <div class=\"ui-g-12\">\n            <div class=\"ui-g \">\n                <m-context *ngFor=\"let layout of bottomLayouts()\"\n                           [layout]=\"layout.name\" (afterContextSet)=\"afterContextSet($event)\"\n                           (beforeContextSet)=\"beforeContextSet($event)\">\n\n                    <div class=\"ui-g-12 \" [ngClass]=\"portletWidth(layout.name)\">\n                        <p-panel [header]=\"labelForContext(layout.name)\" [toggleable]=\"false\">\n                            <m-include-component></m-include-component>\n                        </p-panel>\n                    </div>\n                </m-context>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n",
                styles: ["#m-toc{position:relative;float:left;z-index:99;width:15em;padding:.5em;box-shadow:6px 0 10px -4px rgba(0,0,0,.3)}#m-content{float:left;padding-top:1em;padding-left:1em;height:auto}#m-toggle-bar{box-sizing:border-box;border-bottom:1px solid #dde3e6;overflow:hidden;display:none;border-radius:5px;padding:.5em;width:2em;height:2.3em}#m-toggle-bar:focus,#m-toggle-bar:hover{background-color:#ececec}#m-toggle-bar:after{content:'';display:block;clear:both}.m-dashbord-name{font-weight:600}.ui-g{display:block}@media screen and (max-width:64em){#m-toc{display:none;overflow-y:auto;z-index:999}#m-toc.active{display:block}#m-toggle-bar{display:block;position:relative;z-index:1000;margin-right:1em}}"]
            }] }
];
/** @nocollapse */
MetaDashboardLayoutComponent.ctorParameters = () => [
    { type: MetaContextComponent },
    { type: Environment }
];
if (false) {
    /**
     * New defined zone for Actions
     *
     * @type {?}
     */
    MetaDashboardLayoutComponent.ZoneToc;
    /** @type {?} */
    MetaDashboardLayoutComponent.ZonesTB;
    /**
     * Defines if sidebar is collapsed or expanded
     *
     * @type {?}
     */
    MetaDashboardLayoutComponent.prototype.activeMenu;
    /**
     * Current Module name
     *
     * @type {?}
     */
    MetaDashboardLayoutComponent.prototype.dashboardName;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhc2hib2FyZC1sYXlvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtZGFzaGJvYXJkL21ldGFkYXNoYm9hcmQtbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7O0FBVXpDLE1BQU0sWUFBWSxHQUEwQjtJQUN4QyxPQUFPLEVBQUUsU0FBUztJQUNsQixRQUFRLEVBQUUsU0FBUztJQUNuQixNQUFNLEVBQUUsU0FBUztJQUNqQixPQUFPLEVBQUUsVUFBVTtDQUN0QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0VGLE1BQU0sbUNBQW9DLFNBQVEsVUFBVTs7Ozs7SUF5QnhELFlBQVksV0FBaUMsRUFBRSxHQUFnQjtRQUUzRCxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7OzswQkFWTixLQUFLOzs7Ozs2QkFNSCxFQUFFO0tBS3pCOzs7O0lBR0QsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNyQzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUVqQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN0Qzs7OztJQUVELEtBQUs7UUFFRCxNQUFNLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDO0tBQy9DOzs7O0lBRUQsVUFBVTs7UUFFTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbkQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDdEM7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVk7O1FBRXJCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUNsRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3RSxTQUFTLENBQUM7S0FDakI7Ozs7SUFFRCxhQUFhOztRQUVULElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4RCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUMxQzs7OztJQUdELFdBQVc7O1FBRVAsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDMUM7Ozs7Ozt1Q0FwRWdCLE1BQU07dUNBQ047SUFDYiw0QkFBNEIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87SUFDcEQsTUFBTSxDQUFDLFVBQVU7Q0FDcEI7O1lBZkosU0FBUyxTQUFDO2dCQUNQLCs5RUFBa0Q7O2FBRXJEOzs7O1lBdkZPLG9CQUFvQjtZQUZwQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNZXRhTGF5b3V0fSBmcm9tICcuLi9tZXRhLWxheW91dCc7XG5pbXBvcnQge01ldGFDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuLi8uLi9jb3JlL3VpbWV0YSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uLy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge0l0ZW1Qcm9wZXJ0aWVzfSBmcm9tICcuLi8uLi9jb3JlL2l0ZW0tcHJvcGVydGllcyc7XG5cblxuLyoqXG4gKlxuICogRGVmaW5lcyA0IHNpemVzIGZvciB0aGUgcG9ydGxldCBzaXplXG4gKlxuICovXG5jb25zdCBQb3J0bGV0U2l6ZXM6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAnc21hbGwnOiAndWktbWQtMycsXG4gICAgJ21lZGl1bSc6ICd1aS1tZC00JyxcbiAgICAnd2lkZSc6ICd1aS1tZC02JyxcbiAgICAnbGFyZ2UnOiAndWktbWQtMTInXG59O1xuXG4vKipcbiAqIFNpbXBsZSBEYXNoYm9hcmQgaW1wbGVtZW50YXRpb24gZm9yIHRoZSBob21lUGFnZS4gSnVzdCBsaWtlIHdlIHN1cHBvcnQgaW5zaWRlIE1ldGFGb3JtVGFibGVcbiAqIGRpZmZlcmVudCB6b25lcyBhbmQgZGlzdHJpYnV0ZSBmaWVsZHMgdG8gdGhlbSwgd2UgZG8gdGhlIHNhbWUgd2l0aCBkZWZpbmVkIGxheW91dHMuXG4gKlxuICogVGhpcyBkYXNoYm9hcmQgc3VwcG9ydHMgMyB6b25lcy5cbiAqXG4gKiAgICB6VG9jOiBUaGlzIGlzIHRoZSBwbGFjZSB3aGVyZSB1c3VhbGx5IGFsbCB0aGUgYWN0aW9ucyBvciAybmQgbGV2ZWwgbmF2aWdhdGlvbiB3aWxsIGdvXG4gKiAgICB6VG9wLHpCb3R0b206IGlzIHdoZXJlIHRoZSBwb3J0bGV0cyBhcmUgcmVuZGVyZWQuXG4gKlxuICpcbiAqIFRvIGRpc3RyaWJ1dGUgbGF5b3V0cyB0byBkaWZmZXJlbnQgem9uZXMgOlxuICpcbiAqIGBgYFxuICogICAgICAgQG1vZHVsZT1Ib21lIHtcbiAqICAgICAgICAgICBsYWJlbDpcIk15IEhvbWVcIjtcbiAqICAgICAgICAgICBwYWdlVGl0bGU6XCJZb3UgYXJlIG5vdyBvbiBIb21lcGFnZVwiO1xuICpcbiAqXG4gKiAgICAgICAgICAgQGxheW91dD1Ub2RheSB7XG4gKiAgICAgICAgICAgICAgYWZ0ZXI6elRvcDtcbiAqICAgICAgICAgICAgICBsYWJlbDogXCJTYWxlcyBHcmFwaFwiO1xuICogICAgICAgICAgICAgIGNvbXBvbmVudDpTYWxlc0dyYXBoQ29tcG9uZW50O1xuICpcbiAqICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgIEBsYXlvdXQ9U3BvcnQge1xuICogICAgICAgICAgICAgIGFmdGVyOlRvZGF5O1xuICogICAgICAgICAgICAgIGxhYmVsOiBcIlNwb3J0IHRvZGF5IVwiO1xuICogICAgICAgICAgICAgIGNvbXBvbmVudDpTdHJpbmdDb21wb25lbnQ7XG4gKiAgICAgICAgICAgICAgYmluZGluZ3M6e3ZhbHVlOlwiVGhlIFRleGFzIFRlY2ggcXVhcnRlcmJhY2sgYXJyaXZlZCBhdCAgXCIgfVxuICpcbiAqICAgICAgICAgICB9XG4gKlxuICogYGBgXG4gKlxuICogIG9yIFB1c2ggYWN0aW9ucyB0byB0aGUgelRvYyB6b25lOlxuICpcbiAqIGBgYFxuICogICAgICAgQG1vZHVsZT1Ib21lIHtcbiAqICAgICAgICAgICBsYWJlbDpcIk15IEhvbWVcIjtcbiAqICAgICAgICAgICBwYWdlVGl0bGU6XCJZb3UgYXJlIG5vdyBvbiBIb21lcGFnZVwiO1xuICpcbiAqXG4gKiAgICAgICAgICAgQGxheW91dD1Ub2RheSB7XG4gKiAgICAgICAgICAgICAgYWZ0ZXI6elRvcDtcbiAqICAgICAgICAgICAgICBsYWJlbDogXCJTYWxlcyBHcmFwaFwiO1xuICogICAgICAgICAgICAgIGNvbXBvbmVudDpTYWxlc0dyYXBoQ29tcG9uZW50O1xuICpcbiAqICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgICBAbGF5b3V0PUFjdGlvbnMjQWN0aW9uTGlua3Mge1xuICogICAgICAgICAgICAgICBsYWJlbDokW2EwMDRdQWN0aW9ucztcbiAqICAgICAgICAgICAgICAgIGFmdGVyOnpUb2M7XG4gKiAgICAgICAgICAgIH1cbiAqXG4gKlxuICogICAgICAgICAgIEBhY3Rpb25DYXRlZ29yeT1DcmVhdGUge1xuICogICAgICAgICAgICAgIEBhY3Rpb249TmV3QmxvZyNwYWdlQWN0aW9uIHsgcGFnZU5hbWU6YmxvZ1BhZ2U7fVxuICogICAgICAgICAgICAgIEBhY3Rpb249TmV3Q2hhcnQjcGFnZUFjdGlvbiB7IHBhZ2VOYW1lOmNoYXJ0UGFnZTt9XG4gKiAgICAgICAgICAgfVxuICpcbiAqIH1cbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdtZXRhZGFzaGJvYXJkLWxheW91dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ21ldGFkYXNoYm9hcmQtbGF5b3V0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWV0YURhc2hib2FyZExheW91dENvbXBvbmVudCBleHRlbmRzIE1ldGFMYXlvdXRcbntcblxuICAgIC8qKlxuICAgICAqIE5ldyBkZWZpbmVkIHpvbmUgZm9yIEFjdGlvbnNcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyBab25lVG9jID0gJ3pUb2MnO1xuICAgIHN0YXRpYyBab25lc1RCID0gW1xuICAgICAgICBNZXRhRGFzaGJvYXJkTGF5b3V0Q29tcG9uZW50LlpvbmVUb2MsIFVJTWV0YS5ab25lVG9wLFxuICAgICAgICBVSU1ldGEuWm9uZUJvdHRvbVxuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIHNpZGViYXIgaXMgY29sbGFwc2VkIG9yIGV4cGFuZGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBhY3RpdmVNZW51OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IE1vZHVsZSBuYW1lXG4gICAgICpcbiAgICAgKi9cbiAgICBkYXNoYm9hcmROYW1lOiBzdHJpbmcgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKG1ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudCwgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKG1ldGFDb250ZXh0LCBlbnYpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICB0aGlzLmRhc2hib2FyZE5hbWUgPSB0aGlzLmxhYmVsKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlTWVudShldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5hY3RpdmVNZW51ID0gIXRoaXMuYWN0aXZlTWVudTtcbiAgICB9XG5cbiAgICB6b25lcygpOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIE1ldGFEYXNoYm9hcmRMYXlvdXRDb21wb25lbnQuWm9uZXNUQjtcbiAgICB9XG5cbiAgICB0b3BMYXlvdXRzKCk6IEl0ZW1Qcm9wZXJ0aWVzW11cbiAgICB7XG4gICAgICAgIGxldCB0b3BzID0gdGhpcy5sYXlvdXRzQnlab25lcy5nZXQoVUlNZXRhLlpvbmVUb3ApO1xuXG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodG9wcykgPyB0b3BzIDogW107XG4gICAgfVxuXG4gICAgcG9ydGxldFdpZHRoKG5hbWU6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IGxDb250ZXh0OiBDb250ZXh0ID0gdGhpcy5jb250ZXh0TWFwLmdldChuYW1lKTtcbiAgICAgICAgbGV0IHdpZHRoID0gbENvbnRleHQucHJvcGVydHlGb3JLZXkoJ3BvcnRsZXRXaWR0aCcpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHdpZHRoKSAmJiBpc1ByZXNlbnQoUG9ydGxldFNpemVzW3dpZHRoXSkgPyBQb3J0bGV0U2l6ZXNbd2lkdGhdIDpcbiAgICAgICAgICAgICd1aS1tZC00JztcbiAgICB9XG5cbiAgICBib3R0b21MYXlvdXRzKCk6IEl0ZW1Qcm9wZXJ0aWVzW11cbiAgICB7XG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLmxheW91dHNCeVpvbmVzLmdldChVSU1ldGEuWm9uZUJvdHRvbSk7XG5cbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChib3R0b20pID8gYm90dG9tIDogW107XG4gICAgfVxuXG5cbiAgICB6VG9jTGF5b3V0cygpOiBJdGVtUHJvcGVydGllc1tdXG4gICAge1xuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5sYXlvdXRzQnlab25lcy5nZXQoTWV0YURhc2hib2FyZExheW91dENvbXBvbmVudC5ab25lVG9jKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChib3R0b20pID8gYm90dG9tIDogW107XG4gICAgfVxuXG5cbn1cbiJdfQ==