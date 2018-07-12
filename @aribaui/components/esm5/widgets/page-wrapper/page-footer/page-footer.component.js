/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var PageFooterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PageFooterComponent, _super);
    function PageFooterComponent(element, env) {
        var _this = _super.call(this, env) || this;
        _this.element = element;
        _this.env = env;
        /**
         * show default copyright. If copyright is passed in, then show the passed in one.
         */
        _this.showDefaultCopyright = true;
        return _this;
    }
    /**
     * @return {?}
     */
    PageFooterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * @return {?}
     */
    PageFooterComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.showDefaultCopyright = !isPresent(this.copyright);
    };
    PageFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-page-footer',
                    template: "<div class=\"page-footer\">\n    <div class=\"ui-g\">\n        <div class=\"ui-g-12 ui-md-8\">\n\n            <ng-content select=\".page-footer-logo\"></ng-content>\n\n            <div class=\"user-info\">\n                <ng-content select=\".page-footer-user-info\"></ng-content>\n            </div>\n\n            <ul class=\"footer-links\">\n                <li role=\"presentation\"><a href=\"http://www.ariba.com/legal/ariba_tou.cfm\">Terms of\n                    Use</a></li>\n                <li role=\"presentation\"><a\n                    href=\"http://www.ariba.com/legal/ariba_security_policy.cfm\">Security\n                    Disclosure</a></li>\n                <li role=\"presentation\"><a\n                    href=\"http://www.ariba.com/legal/ariba_privacy_statement.cfm\">Privacy\n                    Statement</a></li>\n                <li role=\"presentation\"><a\n                    href=\"http://www.ariba.com/legal/ariba-privacy-statement\">Cookie Statement</a>\n                </li>\n                <li role=\"presentation\"><a\n                    href=\"http://www.ariba.com/legal/ariba-privacy-statement\">Participant\n                    Statement</a></li>\n            </ul>\n        </div>\n\n        <div class=\"ui-g-12 ui-md-4\">\n            <div class=\"u-bottom-align\"></div>\n            <div class=\"u-hright copyright\">\n                <ng-content select=\".page-footer-copyright\"></ng-content>\n            </div>\n\n            <!-- Default Copyright -->\n            <div *ngIf=\"showDefaultCopyright\" class=\"u-hright copyright\">\n                <p>\u00A9 1996\u20132017 Ariba, Inc. All rights reserved</p>\n            </div>\n\n        </div>\n    </div>\n</div>\n",
                    styles: [".page-footer{background:#fff;padding:15px 0 0;font-size:11px;border-top:1px solid #d7d7d7}.page-footer .user-info{color:#ccc}.page-footer .ui-g{margin:0 auto}.page-footer .copyright{color:#ccc}.footer-links{list-style:none;margin:0 -15px;padding:0;font-size:10px}.footer-links li{float:left}.footer-links:after,.footer-links:before{content:\" \";display:table}.footer-links:after{clear:both}.footer-links>li,.footer-links>li>a{position:relative;display:block}.footer-links>li>a{padding:10px 15px;color:#199de0}"]
                },] },
    ];
    /** @nocollapse */
    PageFooterComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment }
    ]; };
    PageFooterComponent.propDecorators = {
        copyright: [{ type: ContentChild, args: ['copyright',] }]
    };
    return PageFooterComponent;
}(BaseComponent));
export { PageFooterComponent };
function PageFooterComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1mb290ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2UtZm9vdGVyL3BhZ2UtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQW1CLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUErRWxCLCtDQUFhO0lBYWxELDZCQUFzQixPQUFtQixFQUFTLEdBQWdCO1FBQWxFLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFIcUIsYUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7Ozs7cUNBRmxDLElBQUk7O0tBS25DOzs7O0lBR0Qsc0NBQVE7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7S0FDcEI7Ozs7SUFFRCxnREFBa0I7OztJQUFsQjtRQUVJLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDMUQ7O2dCQTFFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDhyREEwQ2I7b0JBQ0csTUFBTSxFQUFFLENBQUMsZ2dCQUE4ZixDQUFDO2lCQUMzZ0I7Ozs7Z0JBaEZrRCxVQUFVO2dCQUNyRCxXQUFXOzs7NEJBc0ZkLFlBQVksU0FBQyxXQUFXOzs4QkEzRzdCO0VBcUd5QyxhQUFhO1NBQXpDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKiBGb290ZXIgY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyBjb25zaXN0ZW50IHN0eWxpbmcsIGJlaGF2aW9yLlxuICogVGhpcyBmb290ZXIgY29tcG9uZW50IHNlbGYgY29udGFpbmVkLlxuICpcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAncmVnaXN0cmF0aW9uJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICpcbiAqICAgICAgICAgIDxhdy1wYWdlLWZvb3Rlcj5cbiAqICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtZm9vdGVyLWxvZ29cIj5cbiAqICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1hZ2VzL2FyaWJhX2xvZ29fd2hpdGVfYmtnZC5wbmdcIj5cbiAqICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWZvb3Rlci11c2VyLWluZm9cIj5cbiAqICAgICAgICAgICAgICAgICAgIENoYWQgTm9sbCAoY25vbGwpIGxhc3QgdmlzaXQge3tsYXN0X3Zpc2l0ZWQgfCBkYXRlOidNTS9kZC95eXl5IGg6bW1hJyB9fVxuICAqICAgICAgICAgICAgICAgICAgIHwgQnV5ZXIgT3JnYW5pemF0aW9uXG4gKiAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBhZ2UtZm9vdGVyLWNvcHlyaWdodFwiICNjb3B5cmlnaHQ+XG4gKiAgICAgICAgICAgICAgICAgICA8cD7CqSAyMDIw4oCTMjAyOCBUaGUgRnV0dXJlLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQ8L3A+XG4gKiAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAqICAgICAgICAgICA8L2F3LXBhZ2UtZm9vdGVyPlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VcbiAqICAgIHtcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICB9XG4gKlxuICogICAgfVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXBhZ2UtZm9vdGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHVpLW1kLThcIj5cblxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLnBhZ2UtZm9vdGVyLWxvZ29cIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLWluZm9cIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCIucGFnZS1mb290ZXItdXNlci1pbmZvXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cImZvb3Rlci1saW5rc1wiPlxuICAgICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgaHJlZj1cImh0dHA6Ly93d3cuYXJpYmEuY29tL2xlZ2FsL2FyaWJhX3RvdS5jZm1cIj5UZXJtcyBvZlxuICAgICAgICAgICAgICAgICAgICBVc2U8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwOi8vd3d3LmFyaWJhLmNvbS9sZWdhbC9hcmliYV9zZWN1cml0eV9wb2xpY3kuY2ZtXCI+U2VjdXJpdHlcbiAgICAgICAgICAgICAgICAgICAgRGlzY2xvc3VyZTwvYT48L2xpPlxuICAgICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGFcbiAgICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHA6Ly93d3cuYXJpYmEuY29tL2xlZ2FsL2FyaWJhX3ByaXZhY3lfc3RhdGVtZW50LmNmbVwiPlByaXZhY3lcbiAgICAgICAgICAgICAgICAgICAgU3RhdGVtZW50PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YVxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cDovL3d3dy5hcmliYS5jb20vbGVnYWwvYXJpYmEtcHJpdmFjeS1zdGF0ZW1lbnRcIj5Db29raWUgU3RhdGVtZW50PC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YVxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cDovL3d3dy5hcmliYS5jb20vbGVnYWwvYXJpYmEtcHJpdmFjeS1zdGF0ZW1lbnRcIj5QYXJ0aWNpcGFudFxuICAgICAgICAgICAgICAgICAgICBTdGF0ZW1lbnQ8L2E+PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHVpLW1kLTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1LWJvdHRvbS1hbGlnblwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInUtaHJpZ2h0IGNvcHlyaWdodFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5wYWdlLWZvb3Rlci1jb3B5cmlnaHRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPCEtLSBEZWZhdWx0IENvcHlyaWdodCAtLT5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93RGVmYXVsdENvcHlyaWdodFwiIGNsYXNzPVwidS1ocmlnaHQgY29weXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPHA+wqkgMTk5NuKAkzIwMTcgQXJpYmEsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2AucGFnZS1mb290ZXJ7YmFja2dyb3VuZDojZmZmO3BhZGRpbmc6MTVweCAwIDA7Zm9udC1zaXplOjExcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q3ZDdkN30ucGFnZS1mb290ZXIgLnVzZXItaW5mb3tjb2xvcjojY2NjfS5wYWdlLWZvb3RlciAudWktZ3ttYXJnaW46MCBhdXRvfS5wYWdlLWZvb3RlciAuY29weXJpZ2h0e2NvbG9yOiNjY2N9LmZvb3Rlci1saW5rc3tsaXN0LXN0eWxlOm5vbmU7bWFyZ2luOjAgLTE1cHg7cGFkZGluZzowO2ZvbnQtc2l6ZToxMHB4fS5mb290ZXItbGlua3MgbGl7ZmxvYXQ6bGVmdH0uZm9vdGVyLWxpbmtzOmFmdGVyLC5mb290ZXItbGlua3M6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTp0YWJsZX0uZm9vdGVyLWxpbmtzOmFmdGVye2NsZWFyOmJvdGh9LmZvb3Rlci1saW5rcz5saSwuZm9vdGVyLWxpbmtzPmxpPmF7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9ja30uZm9vdGVyLWxpbmtzPmxpPmF7cGFkZGluZzoxMHB4IDE1cHg7Y29sb3I6IzE5OWRlMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlRm9vdGVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXRcbntcblxuICAgIC8qKlxuICAgICAqIGNvcHlyaWdodCBjb250ZW50XG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnY29weXJpZ2h0JykgY29weXJpZ2h0OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBzaG93IGRlZmF1bHQgY29weXJpZ2h0LiBJZiBjb3B5cmlnaHQgaXMgcGFzc2VkIGluLCB0aGVuIHNob3cgdGhlIHBhc3NlZCBpbiBvbmUuXG4gICAgICovXG4gICAgc2hvd0RlZmF1bHRDb3B5cmlnaHQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KClcbiAgICB7XG4gICAgICAgIHRoaXMuc2hvd0RlZmF1bHRDb3B5cmlnaHQgPSAhaXNQcmVzZW50KHRoaXMuY29weXJpZ2h0KTtcbiAgICB9XG59XG4iXX0=