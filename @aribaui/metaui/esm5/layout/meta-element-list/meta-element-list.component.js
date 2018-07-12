/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ lContext = this.contextMap.get(name);
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
        var /** @type {?} */ lContext = this.contextMap.get(name);
        return isPresent(lContext) ? lContext.propertyForKey('elementClass') : null;
    };
    MetaElementListComponent.decorators = [
        { type: Component, args: [{
                    template: "<!--<b>MetaElementList: {{allLayouts}} </b>-->\n<!--<pre [innerHTML]=\"context.debugString()\"></pre>-->\n\n<ng-template ngFor [ngForOf]=\"allLayouts\" let-cLayout>\n\n    <m-context [layout]=\"cLayout.name\" (afterContextSet)=\"afterContextSet($event)\"\n               (beforeContextSet)=\"beforeContextSet($event)\">\n\n        <!--<b>MetaElementList: layout {{cLayout.name}} </b>-->\n        <!--<pre [innerHTML]=\"debugString(cLayout.name)\"></pre>-->\n\n        <div class=\"ui-g \">\n            <div class=\"ui-g-12 ui-g-nopad\" [ngClass]=\"classString(cLayout.name)\"\n                 [ngStyle]=\"styleString(cLayout.name)\"\n            >\n                <m-include-component></m-include-component>\n            </div>\n        </div>\n    </m-context>\n\n</ng-template>\n\n",
                    styles: [""]
                },] },
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
function MetaElementListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MetaElementListComponent.prototype._metaContext;
    /** @type {?} */
    MetaElementListComponent.prototype.env;
    /** @type {?} */
    MetaElementListComponent.prototype.sanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1lbGVtZW50LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtZWxlbWVudC1saXN0L21ldGEtZWxlbWVudC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW1CQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFFdEMsb0RBQVU7SUFJcEQsa0NBQXNCLFlBQWtDLEVBQVMsR0FBZ0IsRUFDOUQ7UUFEbkIsWUFHSSxrQkFBTSxZQUFZLEVBQUUsR0FBRyxDQUFDLFNBRTNCO1FBTHFCLGtCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFDOUQsZUFBUyxHQUFULFNBQVM7O0tBSTNCOzs7OztJQUdELDhDQUFXOzs7O0lBQVgsVUFBWSxJQUFZO1FBRXBCLHFCQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztRQUtsRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7O0lBR0QsOENBQVc7Ozs7SUFBWCxVQUFZLElBQVk7UUFFcEIscUJBQUksUUFBUSxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUMvRTs7Z0JBckRKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb3hCQXNCYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2Y7Ozs7Z0JBcEVPLG9CQUFvQjtnQkFGcEIsV0FBVztnQkFEWCxZQUFZOzttQ0FwQnBCO0VBNEY4QyxVQUFVO1NBQTNDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TWV0YUxheW91dH0gZnJvbSAnLi4vbWV0YS1sYXlvdXQnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uLy4uL2NvcmUvY29udGV4dCc7XG5cbi8qKlxuICogTWV0YUVsZW1lbnRMaXN0IGlzIGltcGxlbWVudGF0aW9uIG9mIFN0YWNrIExheW91dCB3aGVyZSB0aGUgY29udGVudCBpcyByZW5kZXJlZCBhcyBsaXN0IChzdGFja2VkKVxuICogWW91IGRvIG5vdCB1c2UgdGhpcyBsYXlvdXQgZGlyZWN0bHkgYXMgaXQgaXMgaW5zdGFudGlhdGVkIGR5bmFtaWNhbGx5IHVzaW5nIE1ldGFJbmNsdWRlQ29tcG9uZW50LlxuICpcbiAqIEZvciBtb3JlIGRldGFpbCBwbGVhc2UgY2hlY2tvdXQgV2lkZ2V0UnVsZXMub3NzIHRoZSBwYXJ0IGJlbGxvdyB3aGVyZSBjcmVhdGUgbmV3IHRyYWl0XG4gKiB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvIGFueSBsYXlvdXQuXG4gKlxuICogYGBgXG4gKlxuICogbGF5b3V0IHtcbiAqXG4gKiAgIEB0cmFpdD1TdGFjayB7IHZpc2libGU6dHJ1ZTsgY29tcG9uZW50Ok1ldGFFbGVtZW50TGlzdENvbXBvbmVudCB9XG4gKlxuICogfVxuICpcbiAqIGBgYFxuICpcbiAqIEFjdHVhbCB1c2FnZSBjb3VsZCBiZSA6XG4gKlxuICpcbiAqIGBgYFxuICogIGxheW91dD1JbnNwZWN0MiNTdGFjayB7XG4gKiAgICAgICBAbGF5b3V0PUZpcnN0I0Zvcm0ge1xuICogICAgICAgICAgIGVsZW1lbnRTdHlsZTpcInBhZGRpbmctYm90dG9tOjEwMHB4XCI7XG4gKiAgICAgICB9XG4gKiAgICAgICBAbGF5b3V0PVNlY29uZCNGb3JtIHsgem9uZVBhdGg6U2Vjb25kOyB9XG4gKiAgIH1cbiAqXG4gKlxuICpcbiAqICAgIGNsYXNzPVVzZXIge1xuICogICAgICAgek5vbmUgPT4gKjtcbiAqICAgICAgIHpMZWZ0ID0+IGZpcnN0TmFtZSA9PiBsYXN0TmFtZSA9PiBhZ2UgPT4gZGVwYXJ0bWVudDtcbiAqICAgICAgIFNlY29uZC56TGVmdCA9PiBlbWFpbDtcbiAqXG4gKiAgIH1cbiAqXG4gKiBgYGBcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOiBgPCEtLTxiPk1ldGFFbGVtZW50TGlzdDoge3thbGxMYXlvdXRzfX0gPC9iPi0tPlxuPCEtLTxwcmUgW2lubmVySFRNTF09XCJjb250ZXh0LmRlYnVnU3RyaW5nKClcIj48L3ByZT4tLT5cblxuPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImFsbExheW91dHNcIiBsZXQtY0xheW91dD5cblxuICAgIDxtLWNvbnRleHQgW2xheW91dF09XCJjTGF5b3V0Lm5hbWVcIiAoYWZ0ZXJDb250ZXh0U2V0KT1cImFmdGVyQ29udGV4dFNldCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgIChiZWZvcmVDb250ZXh0U2V0KT1cImJlZm9yZUNvbnRleHRTZXQoJGV2ZW50KVwiPlxuXG4gICAgICAgIDwhLS08Yj5NZXRhRWxlbWVudExpc3Q6IGxheW91dCB7e2NMYXlvdXQubmFtZX19IDwvYj4tLT5cbiAgICAgICAgPCEtLTxwcmUgW2lubmVySFRNTF09XCJkZWJ1Z1N0cmluZyhjTGF5b3V0Lm5hbWUpXCI+PC9wcmU+LS0+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWcgXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy0xMiB1aS1nLW5vcGFkXCIgW25nQ2xhc3NdPVwiY2xhc3NTdHJpbmcoY0xheW91dC5uYW1lKVwiXG4gICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlU3RyaW5nKGNMYXlvdXQubmFtZSlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxtLWluY2x1ZGUtY29tcG9uZW50PjwvbS1pbmNsdWRlLWNvbXBvbmVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L20tY29udGV4dD5cblxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUVsZW1lbnRMaXN0Q29tcG9uZW50IGV4dGVuZHMgTWV0YUxheW91dFxue1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudCwgcHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKVxuICAgIHtcbiAgICAgICAgc3VwZXIoX21ldGFDb250ZXh0LCBlbnYpO1xuXG4gICAgfVxuXG5cbiAgICBzdHlsZVN0cmluZyhuYW1lOiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBsQ29udGV4dDogQ29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQobmFtZSk7XG4gICAgICAgIC8vIHJldHVybiBpc1ByZXNlbnQobENvbnRleHQpICYmIGlzUHJlc2VudChsQ29udGV4dC5wcm9wZXJ0eUZvcktleSgnZWxlbWVudFN0eWxlJykpID9cbiAgICAgICAgLy8gICAgIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShsQ29udGV4dC5wcm9wZXJ0eUZvcktleSgnZWxlbWVudFN0eWxlJykpIDpcbiAgICAgICAgLy8gbnVsbDtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIGNsYXNzU3RyaW5nKG5hbWU6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IGxDb250ZXh0OiBDb250ZXh0ID0gdGhpcy5jb250ZXh0TWFwLmdldChuYW1lKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChsQ29udGV4dCkgPyBsQ29udGV4dC5wcm9wZXJ0eUZvcktleSgnZWxlbWVudENsYXNzJykgOiBudWxsO1xuICAgIH1cbn1cbiJdfQ==