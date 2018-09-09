/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, ElementRef } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
/**
 * Footer component that implements consistent styling, behavior.
 * This footer component self contained.
 *
 * \@Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *          <aw-page-footer>
 *               <div class="page-footer-logo">
 *                   <img src="images/ariba_logo_white_bkgd.png">
 *               </div>
 *               <div class="page-footer-user-info">
 *                   Chad Noll (cnoll) last visit {{last_visited | date:'MM/dd/yyyy h:mma' }}
 *                   | Buyer Organization
 *               </div>
 *               <span class="page-footer-copyright" #copyright>
 *                   <p>© 2020–2028 The Future, Inc. All rights reserved</p>
 *               </span>
 *           </aw-page-footer>
 *    `
 *    })
 *    export class MyPage
 *    {
 *        constructor ()
 *        {
 *        }
 *
 *    }
 */
export class PageFooterComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
        /**
         * show default copyright. If copyright is passed in, then show the passed in one.
         */
        this.showDefaultCopyright = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.showDefaultCopyright = !isPresent(this.copyright);
    }
}
PageFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-page-footer',
                template: "<div class=\"page-footer\">\n    <div class=\"ui-g\">\n        <div class=\"ui-g-12 ui-md-8\">\n\n            <ng-content select=\".page-footer-logo\"></ng-content>\n\n            <div class=\"user-info\">\n                <ng-content select=\".page-footer-user-info\"></ng-content>\n            </div>\n\n            <ul class=\"footer-links\">\n                <li role=\"presentation\"><a href=\"http://www.ariba.com/legal/ariba_tou.cfm\">Terms of\n                    Use</a></li>\n                <li role=\"presentation\"><a\n                    href=\"http://www.ariba.com/legal/ariba_security_policy.cfm\">Security\n                    Disclosure</a></li>\n                <li role=\"presentation\"><a\n                    href=\"http://www.ariba.com/legal/ariba_privacy_statement.cfm\">Privacy\n                    Statement</a></li>\n                <li role=\"presentation\"><a\n                    href=\"http://www.ariba.com/legal/ariba-privacy-statement\">Cookie Statement</a>\n                </li>\n                <li role=\"presentation\"><a\n                    href=\"http://www.ariba.com/legal/ariba-privacy-statement\">Participant\n                    Statement</a></li>\n            </ul>\n        </div>\n\n        <div class=\"ui-g-12 ui-md-4\">\n            <div class=\"u-bottom-align\"></div>\n            <div class=\"u-hright copyright\">\n                <ng-content select=\".page-footer-copyright\"></ng-content>\n            </div>\n\n            <!-- Default Copyright -->\n            <div *ngIf=\"showDefaultCopyright\" class=\"u-hright copyright\">\n                <p>\u00A9 1996\u20132017 Ariba, Inc. All rights reserved</p>\n            </div>\n\n        </div>\n    </div>\n</div>\n",
                styles: [".page-footer{background:#fff;padding:15px 0 0;font-size:11px;border-top:1px solid #d7d7d7}.page-footer .user-info{color:#ccc}.page-footer .ui-g{margin:0 auto}.page-footer .copyright{color:#ccc}.footer-links{list-style:none;margin:0 -15px;padding:0;font-size:10px}.footer-links li{float:left}.footer-links:after,.footer-links:before{content:\" \";display:table}.footer-links:after{clear:both}.footer-links>li,.footer-links>li>a{position:relative;display:block}.footer-links>li>a{padding:10px 15px;color:#199de0}"]
            }] }
];
/** @nocollapse */
PageFooterComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
PageFooterComponent.propDecorators = {
    copyright: [{ type: ContentChild, args: ['copyright',] }]
};
if (false) {
    /**
     * copyright content
     * @type {?}
     */
    PageFooterComponent.prototype.copyright;
    /**
     * show default copyright. If copyright is passed in, then show the passed in one.
     * @type {?}
     */
    PageFooterComponent.prototype.showDefaultCopyright;
    /** @type {?} */
    PageFooterComponent.prototype.element;
    /** @type {?} */
    PageFooterComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1mb290ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2UtZm9vdGVyL3BhZ2UtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBbUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUMzRCxNQUFNLDBCQUEyQixTQUFRLGFBQWE7Ozs7O0lBYWxELFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRk8sWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7Ozs7b0NBRmxDLElBQUk7S0FLbkM7Ozs7SUFHRCxRQUFRO1FBRUosS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3BCOzs7O0lBRUQsa0JBQWtCO1FBRWQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMxRDs7O1lBaENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQix3c0RBQXlDOzthQUU1Qzs7OztZQXRDa0QsVUFBVTtZQUNyRCxXQUFXOzs7d0JBNENkLFlBQVksU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0FmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqIEZvb3RlciBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzIGNvbnNpc3RlbnQgc3R5bGluZywgYmVoYXZpb3IuXG4gKiBUaGlzIGZvb3RlciBjb21wb25lbnQgc2VsZiBjb250YWluZWQuXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdyZWdpc3RyYXRpb24nICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKlxuICogICAgICAgICAgPGF3LXBhZ2UtZm9vdGVyPlxuICogICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXItbG9nb1wiPlxuICogICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZXMvYXJpYmFfbG9nb193aGl0ZV9ia2dkLnBuZ1wiPlxuICogICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtZm9vdGVyLXVzZXItaW5mb1wiPlxuICogICAgICAgICAgICAgICAgICAgQ2hhZCBOb2xsIChjbm9sbCkgbGFzdCB2aXNpdCB7e2xhc3RfdmlzaXRlZCB8IGRhdGU6J01NL2RkL3l5eXkgaDptbWEnIH19XG4gICogICAgICAgICAgICAgICAgICAgfCBCdXllciBPcmdhbml6YXRpb25cbiAqICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGFnZS1mb290ZXItY29weXJpZ2h0XCIgI2NvcHlyaWdodD5cbiAqICAgICAgICAgICAgICAgICAgIDxwPsKpIDIwMjDigJMyMDI4IFRoZSBGdXR1cmUsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZDwvcD5cbiAqICAgICAgICAgICAgICAgPC9zcGFuPlxuICogICAgICAgICAgIDwvYXctcGFnZS1mb290ZXI+XG4gKiAgICBgXG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15UGFnZVxuICogICAge1xuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqXG4gKiAgICB9XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcGFnZS1mb290ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAncGFnZS1mb290ZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydwYWdlLWZvb3Rlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VGb290ZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdFxue1xuXG4gICAgLyoqXG4gICAgICogY29weXJpZ2h0IGNvbnRlbnRcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdjb3B5cmlnaHQnKSBjb3B5cmlnaHQ6IGFueTtcblxuICAgIC8qKlxuICAgICAqIHNob3cgZGVmYXVsdCBjb3B5cmlnaHQuIElmIGNvcHlyaWdodCBpcyBwYXNzZWQgaW4sIHRoZW4gc2hvdyB0aGUgcGFzc2VkIGluIG9uZS5cbiAgICAgKi9cbiAgICBzaG93RGVmYXVsdENvcHlyaWdodDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zaG93RGVmYXVsdENvcHlyaWdodCA9ICFpc1ByZXNlbnQodGhpcy5jb3B5cmlnaHQpO1xuICAgIH1cbn1cbiJdfQ==