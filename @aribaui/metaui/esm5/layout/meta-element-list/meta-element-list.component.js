/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Environment, isPresent } from '@aribaui/core';
import { MetaLayout } from '../meta-layout';
import { MetaContextComponent } from '../../core/meta-context/meta-context.component';
/**
 * MetaElementList is implementation of Stack Layout where the content is rendered as list (stacked)
 * You do not use this layout directly as it is instantiated dynamically using MetaIncludeComponent.
 *
 * For more detail please checkout WidgetRules.oss the part bellow where create new trait
 * that can be applied to any layout.
 *
 * ```
 *
 * layout {
 *
 * \@trait=Stack { visible:true; component:MetaElementListComponent }
 *
 * }
 *
 * ```
 *
 * Actual usage could be :
 *
 *
 * ```
 *  layout=Inspect2#Stack {
 * \@layout=First#Form {
 *           elementStyle:"padding-bottom:100px";
 *       }
 * \@layout=Second#Form { zonePath:Second; }
 *   }
 *
 *
 *
 *    class=User {
 *       zNone => *;
 *       zLeft => firstName => lastName => age => department;
 *       Second.zLeft => email;
 *
 *   }
 *
 * ```
 *
 */
var MetaElementListComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MetaElementListComponent, _super);
    function MetaElementListComponent(_metaContext, env, sanitizer) {
        var _this = _super.call(this, _metaContext, env) || this;
        _this._metaContext = _metaContext;
        _this.env = env;
        _this.sanitizer = sanitizer;
        return _this;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    MetaElementListComponent.prototype.styleString = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var lContext = this.contextMap.get(name);
        // return isPresent(lContext) && isPresent(lContext.propertyForKey('elementStyle')) ?
        //     this.sanitizer.bypassSecurityTrustStyle(lContext.propertyForKey('elementStyle')) :
        // null;
        return null;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    MetaElementListComponent.prototype.classString = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var lContext = this.contextMap.get(name);
        return isPresent(lContext) ? lContext.propertyForKey('elementClass') : null;
    };
    MetaElementListComponent.decorators = [
        { type: Component, args: [{
                    template: "<!--<b>MetaElementList: {{allLayouts}} </b>-->\n<!--<pre [innerHTML]=\"context.debugString()\"></pre>-->\n\n<ng-template ngFor [ngForOf]=\"allLayouts\" let-cLayout>\n\n    <m-context [layout]=\"cLayout.name\" (afterContextSet)=\"afterContextSet($event)\"\n               (beforeContextSet)=\"beforeContextSet($event)\">\n\n        <!--<b>MetaElementList: layout {{cLayout.name}} </b>-->\n        <!--<pre [innerHTML]=\"debugString(cLayout.name)\"></pre>-->\n\n        <div class=\"ui-g \">\n            <div class=\"ui-g-12 ui-g-nopad\" [ngClass]=\"classString(cLayout.name)\"\n                 [ngStyle]=\"styleString(cLayout.name)\"\n            >\n                <m-include-component></m-include-component>\n            </div>\n        </div>\n    </m-context>\n\n</ng-template>\n\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    MetaElementListComponent.ctorParameters = function () { return [
        { type: MetaContextComponent },
        { type: Environment },
        { type: DomSanitizer }
    ]; };
    return MetaElementListComponent;
}(MetaLayout));
export { MetaElementListComponent };
if (false) {
    /** @type {?} */
    MetaElementListComponent.prototype._metaContext;
    /** @type {?} */
    MetaElementListComponent.prototype.env;
    /** @type {?} */
    MetaElementListComponent.prototype.sanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1lbGVtZW50LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtZWxlbWVudC1saXN0L21ldGEtZWxlbWVudC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW1CQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQStDdEMsb0RBQVU7SUFJcEQsa0NBQXNCLFlBQWtDLEVBQVMsR0FBZ0IsRUFDOUQ7UUFEbkIsWUFHSSxrQkFBTSxZQUFZLEVBQUUsR0FBRyxDQUFDLFNBRTNCO1FBTHFCLGtCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFDOUQsZUFBUyxHQUFULFNBQVM7O0tBSTNCOzs7OztJQUdELDhDQUFXOzs7O0lBQVgsVUFBWSxJQUFZOztRQUVwQixJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztRQUtsRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7O0lBR0QsOENBQVc7Ozs7SUFBWCxVQUFZLElBQVk7O1FBRXBCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUMvRTs7Z0JBL0JKLFNBQVMsU0FBQztvQkFDUCw4eEJBQStDOztpQkFFbEQ7Ozs7Z0JBOUNPLG9CQUFvQjtnQkFGcEIsV0FBVztnQkFEWCxZQUFZOzttQ0FwQnBCO0VBc0U4QyxVQUFVO1NBQTNDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TWV0YUxheW91dH0gZnJvbSAnLi4vbWV0YS1sYXlvdXQnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uLy4uL2NvcmUvY29udGV4dCc7XG5cbi8qKlxuICogTWV0YUVsZW1lbnRMaXN0IGlzIGltcGxlbWVudGF0aW9uIG9mIFN0YWNrIExheW91dCB3aGVyZSB0aGUgY29udGVudCBpcyByZW5kZXJlZCBhcyBsaXN0IChzdGFja2VkKVxuICogWW91IGRvIG5vdCB1c2UgdGhpcyBsYXlvdXQgZGlyZWN0bHkgYXMgaXQgaXMgaW5zdGFudGlhdGVkIGR5bmFtaWNhbGx5IHVzaW5nIE1ldGFJbmNsdWRlQ29tcG9uZW50LlxuICpcbiAqIEZvciBtb3JlIGRldGFpbCBwbGVhc2UgY2hlY2tvdXQgV2lkZ2V0UnVsZXMub3NzIHRoZSBwYXJ0IGJlbGxvdyB3aGVyZSBjcmVhdGUgbmV3IHRyYWl0XG4gKiB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvIGFueSBsYXlvdXQuXG4gKlxuICogYGBgXG4gKlxuICogbGF5b3V0IHtcbiAqXG4gKiAgIEB0cmFpdD1TdGFjayB7IHZpc2libGU6dHJ1ZTsgY29tcG9uZW50Ok1ldGFFbGVtZW50TGlzdENvbXBvbmVudCB9XG4gKlxuICogfVxuICpcbiAqIGBgYFxuICpcbiAqIEFjdHVhbCB1c2FnZSBjb3VsZCBiZSA6XG4gKlxuICpcbiAqIGBgYFxuICogIGxheW91dD1JbnNwZWN0MiNTdGFjayB7XG4gKiAgICAgICBAbGF5b3V0PUZpcnN0I0Zvcm0ge1xuICogICAgICAgICAgIGVsZW1lbnRTdHlsZTpcInBhZGRpbmctYm90dG9tOjEwMHB4XCI7XG4gKiAgICAgICB9XG4gKiAgICAgICBAbGF5b3V0PVNlY29uZCNGb3JtIHsgem9uZVBhdGg6U2Vjb25kOyB9XG4gKiAgIH1cbiAqXG4gKlxuICpcbiAqICAgIGNsYXNzPVVzZXIge1xuICogICAgICAgek5vbmUgPT4gKjtcbiAqICAgICAgIHpMZWZ0ID0+IGZpcnN0TmFtZSA9PiBsYXN0TmFtZSA9PiBhZ2UgPT4gZGVwYXJ0bWVudDtcbiAqICAgICAgIFNlY29uZC56TGVmdCA9PiBlbWFpbDtcbiAqXG4gKiAgIH1cbiAqXG4gKiBgYGBcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnbWV0YS1lbGVtZW50LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydtZXRhLWVsZW1lbnQtbGlzdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFFbGVtZW50TGlzdENvbXBvbmVudCBleHRlbmRzIE1ldGFMYXlvdXRcbntcblxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcilcbiAgICB7XG4gICAgICAgIHN1cGVyKF9tZXRhQ29udGV4dCwgZW52KTtcblxuICAgIH1cblxuXG4gICAgc3R5bGVTdHJpbmcobmFtZTogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICBsZXQgbENvbnRleHQ6IENvbnRleHQgPSB0aGlzLmNvbnRleHRNYXAuZ2V0KG5hbWUpO1xuICAgICAgICAvLyByZXR1cm4gaXNQcmVzZW50KGxDb250ZXh0KSAmJiBpc1ByZXNlbnQobENvbnRleHQucHJvcGVydHlGb3JLZXkoJ2VsZW1lbnRTdHlsZScpKSA/XG4gICAgICAgIC8vICAgICB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUobENvbnRleHQucHJvcGVydHlGb3JLZXkoJ2VsZW1lbnRTdHlsZScpKSA6XG4gICAgICAgIC8vIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICBjbGFzc1N0cmluZyhuYW1lOiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBsQ29udGV4dDogQ29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQobmFtZSk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQobENvbnRleHQpID8gbENvbnRleHQucHJvcGVydHlGb3JLZXkoJ2VsZW1lbnRDbGFzcycpIDogbnVsbDtcbiAgICB9XG59XG4iXX0=