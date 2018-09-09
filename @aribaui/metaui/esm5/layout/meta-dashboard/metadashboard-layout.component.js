/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var PortletSizes = {
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
var MetaDashboardLayoutComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MetaDashboardLayoutComponent, _super);
    function MetaDashboardLayoutComponent(metaContext, env) {
        var _this = _super.call(this, metaContext, env) || this;
        /**
         * Defines if sidebar is collapsed or expanded
         *
         */
        _this.activeMenu = false;
        /**
         * Current Module name
         *
         */
        _this.dashboardName = '';
        return _this;
    }
    /**
     * @return {?}
     */
    MetaDashboardLayoutComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.dashboardName = this.label();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MetaDashboardLayoutComponent.prototype.toggleMenu = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.activeMenu = !this.activeMenu;
    };
    /**
     * @return {?}
     */
    MetaDashboardLayoutComponent.prototype.zones = /**
     * @return {?}
     */
    function () {
        return MetaDashboardLayoutComponent.ZonesTB;
    };
    /**
     * @return {?}
     */
    MetaDashboardLayoutComponent.prototype.topLayouts = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tops = this.layoutsByZones.get(UIMeta.ZoneTop);
        return isPresent(tops) ? tops : [];
    };
    /**
     * @param {?} name
     * @return {?}
     */
    MetaDashboardLayoutComponent.prototype.portletWidth = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var lContext = this.contextMap.get(name);
        /** @type {?} */
        var width = lContext.propertyForKey('portletWidth');
        return isPresent(width) && isPresent(PortletSizes[width]) ? PortletSizes[width] :
            'ui-md-4';
    };
    /**
     * @return {?}
     */
    MetaDashboardLayoutComponent.prototype.bottomLayouts = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var bottom = this.layoutsByZones.get(UIMeta.ZoneBottom);
        return isPresent(bottom) ? bottom : [];
    };
    /**
     * @return {?}
     */
    MetaDashboardLayoutComponent.prototype.zTocLayouts = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var bottom = this.layoutsByZones.get(MetaDashboardLayoutComponent.ZoneToc);
        return isPresent(bottom) ? bottom : [];
    };
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
    MetaDashboardLayoutComponent.ctorParameters = function () { return [
        { type: MetaContextComponent },
        { type: Environment }
    ]; };
    return MetaDashboardLayoutComponent;
}(MetaLayout));
export { MetaDashboardLayoutComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhc2hib2FyZC1sYXlvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtZGFzaGJvYXJkL21ldGFkYXNoYm9hcmQtbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW1CQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNwRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQVV6QyxJQUFNLFlBQVksR0FBMEI7SUFDeEMsT0FBTyxFQUFFLFNBQVM7SUFDbEIsUUFBUSxFQUFFLFNBQVM7SUFDbkIsTUFBTSxFQUFFLFNBQVM7SUFDakIsT0FBTyxFQUFFLFVBQVU7Q0FDdEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3RWdELHdEQUFVO0lBeUJ4RCxzQ0FBWSxXQUFpQyxFQUFFLEdBQWdCO1FBQS9ELFlBRUksa0JBQU0sV0FBVyxFQUFFLEdBQUcsQ0FBQyxTQUMxQjs7Ozs7MkJBWHFCLEtBQUs7Ozs7OzhCQU1ILEVBQUU7O0tBS3pCOzs7O0lBR0QsK0NBQVE7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDckM7Ozs7O0lBRUQsaURBQVU7Ozs7SUFBVixVQUFXLEtBQVU7UUFFakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDdEM7Ozs7SUFFRCw0Q0FBSzs7O0lBQUw7UUFFSSxNQUFNLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDO0tBQy9DOzs7O0lBRUQsaURBQVU7OztJQUFWOztRQUVJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUN0Qzs7Ozs7SUFFRCxtREFBWTs7OztJQUFaLFVBQWEsSUFBWTs7UUFFckIsSUFBSSxRQUFRLEdBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBQ2xELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdFLFNBQVMsQ0FBQztLQUNqQjs7OztJQUVELG9EQUFhOzs7SUFBYjs7UUFFSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDMUM7Ozs7SUFHRCxrREFBVzs7O0lBQVg7O1FBRUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDMUM7Ozs7OzJDQXBFZ0IsTUFBTTsyQ0FDTjtRQUNiLDRCQUE0QixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztRQUNwRCxNQUFNLENBQUMsVUFBVTtLQUNwQjs7Z0JBZkosU0FBUyxTQUFDO29CQUNQLCs5RUFBa0Q7O2lCQUVyRDs7OztnQkF2Rk8sb0JBQW9CO2dCQUZwQixXQUFXOzt1Q0FwQm5CO0VBOEdrRCxVQUFVO1NBQS9DLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TWV0YUxheW91dH0gZnJvbSAnLi4vbWV0YS1sYXlvdXQnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vLi4vY29yZS91aW1ldGEnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuLi8uLi9jb3JlL2NvbnRleHQnO1xuaW1wb3J0IHtJdGVtUHJvcGVydGllc30gZnJvbSAnLi4vLi4vY29yZS9pdGVtLXByb3BlcnRpZXMnO1xuXG5cbi8qKlxuICpcbiAqIERlZmluZXMgNCBzaXplcyBmb3IgdGhlIHBvcnRsZXQgc2l6ZVxuICpcbiAqL1xuY29uc3QgUG9ydGxldFNpemVzOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgJ3NtYWxsJzogJ3VpLW1kLTMnLFxuICAgICdtZWRpdW0nOiAndWktbWQtNCcsXG4gICAgJ3dpZGUnOiAndWktbWQtNicsXG4gICAgJ2xhcmdlJzogJ3VpLW1kLTEyJ1xufTtcblxuLyoqXG4gKiBTaW1wbGUgRGFzaGJvYXJkIGltcGxlbWVudGF0aW9uIGZvciB0aGUgaG9tZVBhZ2UuIEp1c3QgbGlrZSB3ZSBzdXBwb3J0IGluc2lkZSBNZXRhRm9ybVRhYmxlXG4gKiBkaWZmZXJlbnQgem9uZXMgYW5kIGRpc3RyaWJ1dGUgZmllbGRzIHRvIHRoZW0sIHdlIGRvIHRoZSBzYW1lIHdpdGggZGVmaW5lZCBsYXlvdXRzLlxuICpcbiAqIFRoaXMgZGFzaGJvYXJkIHN1cHBvcnRzIDMgem9uZXMuXG4gKlxuICogICAgelRvYzogVGhpcyBpcyB0aGUgcGxhY2Ugd2hlcmUgdXN1YWxseSBhbGwgdGhlIGFjdGlvbnMgb3IgMm5kIGxldmVsIG5hdmlnYXRpb24gd2lsbCBnb1xuICogICAgelRvcCx6Qm90dG9tOiBpcyB3aGVyZSB0aGUgcG9ydGxldHMgYXJlIHJlbmRlcmVkLlxuICpcbiAqXG4gKiBUbyBkaXN0cmlidXRlIGxheW91dHMgdG8gZGlmZmVyZW50IHpvbmVzIDpcbiAqXG4gKiBgYGBcbiAqICAgICAgIEBtb2R1bGU9SG9tZSB7XG4gKiAgICAgICAgICAgbGFiZWw6XCJNeSBIb21lXCI7XG4gKiAgICAgICAgICAgcGFnZVRpdGxlOlwiWW91IGFyZSBub3cgb24gSG9tZXBhZ2VcIjtcbiAqXG4gKlxuICogICAgICAgICAgIEBsYXlvdXQ9VG9kYXkge1xuICogICAgICAgICAgICAgIGFmdGVyOnpUb3A7XG4gKiAgICAgICAgICAgICAgbGFiZWw6IFwiU2FsZXMgR3JhcGhcIjtcbiAqICAgICAgICAgICAgICBjb21wb25lbnQ6U2FsZXNHcmFwaENvbXBvbmVudDtcbiAqXG4gKiAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICBAbGF5b3V0PVNwb3J0IHtcbiAqICAgICAgICAgICAgICBhZnRlcjpUb2RheTtcbiAqICAgICAgICAgICAgICBsYWJlbDogXCJTcG9ydCB0b2RheSFcIjtcbiAqICAgICAgICAgICAgICBjb21wb25lbnQ6U3RyaW5nQ29tcG9uZW50O1xuICogICAgICAgICAgICAgIGJpbmRpbmdzOnt2YWx1ZTpcIlRoZSBUZXhhcyBUZWNoIHF1YXJ0ZXJiYWNrIGFycml2ZWQgYXQgIFwiIH1cbiAqXG4gKiAgICAgICAgICAgfVxuICpcbiAqIGBgYFxuICpcbiAqICBvciBQdXNoIGFjdGlvbnMgdG8gdGhlIHpUb2Mgem9uZTpcbiAqXG4gKiBgYGBcbiAqICAgICAgIEBtb2R1bGU9SG9tZSB7XG4gKiAgICAgICAgICAgbGFiZWw6XCJNeSBIb21lXCI7XG4gKiAgICAgICAgICAgcGFnZVRpdGxlOlwiWW91IGFyZSBub3cgb24gSG9tZXBhZ2VcIjtcbiAqXG4gKlxuICogICAgICAgICAgIEBsYXlvdXQ9VG9kYXkge1xuICogICAgICAgICAgICAgIGFmdGVyOnpUb3A7XG4gKiAgICAgICAgICAgICAgbGFiZWw6IFwiU2FsZXMgR3JhcGhcIjtcbiAqICAgICAgICAgICAgICBjb21wb25lbnQ6U2FsZXNHcmFwaENvbXBvbmVudDtcbiAqXG4gKiAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICAgQGxheW91dD1BY3Rpb25zI0FjdGlvbkxpbmtzIHtcbiAqICAgICAgICAgICAgICAgbGFiZWw6JFthMDA0XUFjdGlvbnM7XG4gKiAgICAgICAgICAgICAgICBhZnRlcjp6VG9jO1xuICogICAgICAgICAgICB9XG4gKlxuICpcbiAqICAgICAgICAgICBAYWN0aW9uQ2F0ZWdvcnk9Q3JlYXRlIHtcbiAqICAgICAgICAgICAgICBAYWN0aW9uPU5ld0Jsb2cjcGFnZUFjdGlvbiB7IHBhZ2VOYW1lOmJsb2dQYWdlO31cbiAqICAgICAgICAgICAgICBAYWN0aW9uPU5ld0NoYXJ0I3BhZ2VBY3Rpb24geyBwYWdlTmFtZTpjaGFydFBhZ2U7fVxuICogICAgICAgICAgIH1cbiAqXG4gKiB9XG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnbWV0YWRhc2hib2FyZC1sYXlvdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydtZXRhZGFzaGJvYXJkLWxheW91dC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFEYXNoYm9hcmRMYXlvdXRDb21wb25lbnQgZXh0ZW5kcyBNZXRhTGF5b3V0XG57XG5cbiAgICAvKipcbiAgICAgKiBOZXcgZGVmaW5lZCB6b25lIGZvciBBY3Rpb25zXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgWm9uZVRvYyA9ICd6VG9jJztcbiAgICBzdGF0aWMgWm9uZXNUQiA9IFtcbiAgICAgICAgTWV0YURhc2hib2FyZExheW91dENvbXBvbmVudC5ab25lVG9jLCBVSU1ldGEuWm9uZVRvcCxcbiAgICAgICAgVUlNZXRhLlpvbmVCb3R0b21cbiAgICBdO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBzaWRlYmFyIGlzIGNvbGxhcHNlZCBvciBleHBhbmRlZFxuICAgICAqXG4gICAgICovXG4gICAgYWN0aXZlTWVudTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBNb2R1bGUgbmFtZVxuICAgICAqXG4gICAgICovXG4gICAgZGFzaGJvYXJkTmFtZTogc3RyaW5nID0gJyc7XG5cbiAgICBjb25zdHJ1Y3RvcihtZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQsIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihtZXRhQ29udGV4dCwgZW52KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgdGhpcy5kYXNoYm9hcmROYW1lID0gdGhpcy5sYWJlbCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZU1lbnUoZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMuYWN0aXZlTWVudSA9ICF0aGlzLmFjdGl2ZU1lbnU7XG4gICAgfVxuXG4gICAgem9uZXMoKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiBNZXRhRGFzaGJvYXJkTGF5b3V0Q29tcG9uZW50LlpvbmVzVEI7XG4gICAgfVxuXG4gICAgdG9wTGF5b3V0cygpOiBJdGVtUHJvcGVydGllc1tdXG4gICAge1xuICAgICAgICBsZXQgdG9wcyA9IHRoaXMubGF5b3V0c0J5Wm9uZXMuZ2V0KFVJTWV0YS5ab25lVG9wKTtcblxuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRvcHMpID8gdG9wcyA6IFtdO1xuICAgIH1cblxuICAgIHBvcnRsZXRXaWR0aChuYW1lOiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBsQ29udGV4dDogQ29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQobmFtZSk7XG4gICAgICAgIGxldCB3aWR0aCA9IGxDb250ZXh0LnByb3BlcnR5Rm9yS2V5KCdwb3J0bGV0V2lkdGgnKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh3aWR0aCkgJiYgaXNQcmVzZW50KFBvcnRsZXRTaXplc1t3aWR0aF0pID8gUG9ydGxldFNpemVzW3dpZHRoXSA6XG4gICAgICAgICAgICAndWktbWQtNCc7XG4gICAgfVxuXG4gICAgYm90dG9tTGF5b3V0cygpOiBJdGVtUHJvcGVydGllc1tdXG4gICAge1xuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5sYXlvdXRzQnlab25lcy5nZXQoVUlNZXRhLlpvbmVCb3R0b20pO1xuXG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoYm90dG9tKSA/IGJvdHRvbSA6IFtdO1xuICAgIH1cblxuXG4gICAgelRvY0xheW91dHMoKTogSXRlbVByb3BlcnRpZXNbXVxuICAgIHtcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubGF5b3V0c0J5Wm9uZXMuZ2V0KE1ldGFEYXNoYm9hcmRMYXlvdXRDb21wb25lbnQuWm9uZVRvYyk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoYm90dG9tKSA/IGJvdHRvbSA6IFtdO1xuICAgIH1cblxuXG59XG4iXX0=