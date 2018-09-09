/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class MetaElementListComponent extends MetaLayout {
    /**
     * @param {?} _metaContext
     * @param {?} env
     * @param {?} sanitizer
     */
    constructor(_metaContext, env, sanitizer) {
        super(_metaContext, env);
        this._metaContext = _metaContext;
        this.env = env;
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    styleString(name) {
        /** @type {?} */
        let lContext = this.contextMap.get(name);
        // return isPresent(lContext) && isPresent(lContext.propertyForKey('elementStyle')) ?
        //     this.sanitizer.bypassSecurityTrustStyle(lContext.propertyForKey('elementStyle')) :
        // null;
        return null;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    classString(name) {
        /** @type {?} */
        let lContext = this.contextMap.get(name);
        return isPresent(lContext) ? lContext.propertyForKey('elementClass') : null;
    }
}
MetaElementListComponent.decorators = [
    { type: Component, args: [{
                template: "<!--<b>MetaElementList: {{allLayouts}} </b>-->\n<!--<pre [innerHTML]=\"context.debugString()\"></pre>-->\n\n<ng-template ngFor [ngForOf]=\"allLayouts\" let-cLayout>\n\n    <m-context [layout]=\"cLayout.name\" (afterContextSet)=\"afterContextSet($event)\"\n               (beforeContextSet)=\"beforeContextSet($event)\">\n\n        <!--<b>MetaElementList: layout {{cLayout.name}} </b>-->\n        <!--<pre [innerHTML]=\"debugString(cLayout.name)\"></pre>-->\n\n        <div class=\"ui-g \">\n            <div class=\"ui-g-12 ui-g-nopad\" [ngClass]=\"classString(cLayout.name)\"\n                 [ngStyle]=\"styleString(cLayout.name)\"\n            >\n                <m-include-component></m-include-component>\n            </div>\n        </div>\n    </m-context>\n\n</ng-template>\n\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MetaElementListComponent.ctorParameters = () => [
    { type: MetaContextComponent },
    { type: Environment },
    { type: DomSanitizer }
];
if (false) {
    /** @type {?} */
    MetaElementListComponent.prototype._metaContext;
    /** @type {?} */
    MetaElementListComponent.prototype.env;
    /** @type {?} */
    MetaElementListComponent.prototype.sanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1lbGVtZW50LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtZWxlbWVudC1saXN0L21ldGEtZWxlbWVudC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQ3BGLE1BQU0sK0JBQWdDLFNBQVEsVUFBVTs7Ozs7O0lBSXBELFlBQXNCLFlBQWtDLEVBQVMsR0FBZ0IsRUFDOUQ7UUFFZixLQUFLLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBSFAsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUM5RCxjQUFTLEdBQVQsU0FBUztLQUkzQjs7Ozs7SUFHRCxXQUFXLENBQUMsSUFBWTs7UUFFcEIsSUFBSSxRQUFRLEdBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7UUFLbEQsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7OztJQUdELFdBQVcsQ0FBQyxJQUFZOztRQUVwQixJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDL0U7OztZQS9CSixTQUFTLFNBQUM7Z0JBQ1AsOHhCQUErQzs7YUFFbEQ7Ozs7WUE5Q08sb0JBQW9CO1lBRnBCLFdBQVc7WUFEWCxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNZXRhTGF5b3V0fSBmcm9tICcuLi9tZXRhLWxheW91dCc7XG5pbXBvcnQge01ldGFDb250ZXh0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcbmltcG9ydCB7Q29udGV4dH0gZnJvbSAnLi4vLi4vY29yZS9jb250ZXh0JztcblxuLyoqXG4gKiBNZXRhRWxlbWVudExpc3QgaXMgaW1wbGVtZW50YXRpb24gb2YgU3RhY2sgTGF5b3V0IHdoZXJlIHRoZSBjb250ZW50IGlzIHJlbmRlcmVkIGFzIGxpc3QgKHN0YWNrZWQpXG4gKiBZb3UgZG8gbm90IHVzZSB0aGlzIGxheW91dCBkaXJlY3RseSBhcyBpdCBpcyBpbnN0YW50aWF0ZWQgZHluYW1pY2FsbHkgdXNpbmcgTWV0YUluY2x1ZGVDb21wb25lbnQuXG4gKlxuICogRm9yIG1vcmUgZGV0YWlsIHBsZWFzZSBjaGVja291dCBXaWRnZXRSdWxlcy5vc3MgdGhlIHBhcnQgYmVsbG93IHdoZXJlIGNyZWF0ZSBuZXcgdHJhaXRcbiAqIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gYW55IGxheW91dC5cbiAqXG4gKiBgYGBcbiAqXG4gKiBsYXlvdXQge1xuICpcbiAqICAgQHRyYWl0PVN0YWNrIHsgdmlzaWJsZTp0cnVlOyBjb21wb25lbnQ6TWV0YUVsZW1lbnRMaXN0Q29tcG9uZW50IH1cbiAqXG4gKiB9XG4gKlxuICogYGBgXG4gKlxuICogQWN0dWFsIHVzYWdlIGNvdWxkIGJlIDpcbiAqXG4gKlxuICogYGBgXG4gKiAgbGF5b3V0PUluc3BlY3QyI1N0YWNrIHtcbiAqICAgICAgIEBsYXlvdXQ9Rmlyc3QjRm9ybSB7XG4gKiAgICAgICAgICAgZWxlbWVudFN0eWxlOlwicGFkZGluZy1ib3R0b206MTAwcHhcIjtcbiAqICAgICAgIH1cbiAqICAgICAgIEBsYXlvdXQ9U2Vjb25kI0Zvcm0geyB6b25lUGF0aDpTZWNvbmQ7IH1cbiAqICAgfVxuICpcbiAqXG4gKlxuICogICAgY2xhc3M9VXNlciB7XG4gKiAgICAgICB6Tm9uZSA9PiAqO1xuICogICAgICAgekxlZnQgPT4gZmlyc3ROYW1lID0+IGxhc3ROYW1lID0+IGFnZSA9PiBkZXBhcnRtZW50O1xuICogICAgICAgU2Vjb25kLnpMZWZ0ID0+IGVtYWlsO1xuICpcbiAqICAgfVxuICpcbiAqIGBgYFxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdtZXRhLWVsZW1lbnQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ21ldGEtZWxlbWVudC1saXN0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUVsZW1lbnRMaXN0Q29tcG9uZW50IGV4dGVuZHMgTWV0YUxheW91dFxue1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudCwgcHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKVxuICAgIHtcbiAgICAgICAgc3VwZXIoX21ldGFDb250ZXh0LCBlbnYpO1xuXG4gICAgfVxuXG5cbiAgICBzdHlsZVN0cmluZyhuYW1lOiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBsQ29udGV4dDogQ29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQobmFtZSk7XG4gICAgICAgIC8vIHJldHVybiBpc1ByZXNlbnQobENvbnRleHQpICYmIGlzUHJlc2VudChsQ29udGV4dC5wcm9wZXJ0eUZvcktleSgnZWxlbWVudFN0eWxlJykpID9cbiAgICAgICAgLy8gICAgIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShsQ29udGV4dC5wcm9wZXJ0eUZvcktleSgnZWxlbWVudFN0eWxlJykpIDpcbiAgICAgICAgLy8gbnVsbDtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIGNsYXNzU3RyaW5nKG5hbWU6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IGxDb250ZXh0OiBDb250ZXh0ID0gdGhpcy5jb250ZXh0TWFwLmdldChuYW1lKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChsQ29udGV4dCkgPyBsQ29udGV4dC5wcm9wZXJ0eUZvcktleSgnZWxlbWVudENsYXNzJykgOiBudWxsO1xuICAgIH1cbn1cbiJdfQ==