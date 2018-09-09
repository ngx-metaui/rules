/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1mb290ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2UtZm9vdGVyL3BhZ2UtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQW1CLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQ2xCLCtDQUFhO0lBYWxELDZCQUFzQixPQUFtQixFQUFTLEdBQWdCO1FBQWxFLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFIcUIsYUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7Ozs7cUNBRmxDLElBQUk7O0tBS25DOzs7O0lBR0Qsc0NBQVE7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7S0FDcEI7Ozs7SUFFRCxnREFBa0I7OztJQUFsQjtRQUVJLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDMUQ7O2dCQWhDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsd3NEQUF5Qzs7aUJBRTVDOzs7O2dCQXRDa0QsVUFBVTtnQkFDckQsV0FBVzs7OzRCQTRDZCxZQUFZLFNBQUMsV0FBVzs7OEJBakU3QjtFQTJEeUMsYUFBYTtTQUF6QyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7QWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogRm9vdGVyIGNvbXBvbmVudCB0aGF0IGltcGxlbWVudHMgY29uc2lzdGVudCBzdHlsaW5nLCBiZWhhdmlvci5cbiAqIFRoaXMgZm9vdGVyIGNvbXBvbmVudCBzZWxmIGNvbnRhaW5lZC5cbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ3JlZ2lzdHJhdGlvbicgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqXG4gKiAgICAgICAgICA8YXctcGFnZS1mb290ZXI+XG4gKiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWZvb3Rlci1sb2dvXCI+XG4gKiAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImltYWdlcy9hcmliYV9sb2dvX3doaXRlX2JrZ2QucG5nXCI+XG4gKiAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXItdXNlci1pbmZvXCI+XG4gKiAgICAgICAgICAgICAgICAgICBDaGFkIE5vbGwgKGNub2xsKSBsYXN0IHZpc2l0IHt7bGFzdF92aXNpdGVkIHwgZGF0ZTonTU0vZGQveXl5eSBoOm1tYScgfX1cbiAgKiAgICAgICAgICAgICAgICAgICB8IEJ1eWVyIE9yZ2FuaXphdGlvblxuICogICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYWdlLWZvb3Rlci1jb3B5cmlnaHRcIiAjY29weXJpZ2h0PlxuICogICAgICAgICAgICAgICAgICAgPHA+wqkgMjAyMOKAkzIwMjggVGhlIEZ1dHVyZSwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkPC9wPlxuICogICAgICAgICAgICAgICA8L3NwYW4+XG4gKiAgICAgICAgICAgPC9hdy1wYWdlLWZvb3Rlcj5cbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlQYWdlXG4gKiAgICB7XG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICpcbiAqICAgIH1cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1wYWdlLWZvb3RlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlLWZvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3BhZ2UtZm9vdGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGFnZUZvb3RlckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0XG57XG5cbiAgICAvKipcbiAgICAgKiBjb3B5cmlnaHQgY29udGVudFxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2NvcHlyaWdodCcpIGNvcHlyaWdodDogYW55O1xuXG4gICAgLyoqXG4gICAgICogc2hvdyBkZWZhdWx0IGNvcHlyaWdodC4gSWYgY29weXJpZ2h0IGlzIHBhc3NlZCBpbiwgdGhlbiBzaG93IHRoZSBwYXNzZWQgaW4gb25lLlxuICAgICAqL1xuICAgIHNob3dEZWZhdWx0Q29weXJpZ2h0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLnNob3dEZWZhdWx0Q29weXJpZ2h0ID0gIWlzUHJlc2VudCh0aGlzLmNvcHlyaWdodCk7XG4gICAgfVxufVxuIl19