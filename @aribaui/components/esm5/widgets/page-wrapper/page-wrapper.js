/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BaseComponent } from '../../core/base.component';
/** @enum {number} */
var PageType = {
    Init: 0,
    // Init Page type
    Login: 1,
    // Login Page
    Object: 2,
    // Object detail page
    List: 3,
    // List Page
    MasterDetail: 4,
    // MasterDetail
    Dashboard: 5,
    // Dashboard page
    Modal: 6 // Modal page, it can be configured to be a popup, or standalone page.
    ,
};
export { PageType };
PageType[PageType.Init] = 'Init';
PageType[PageType.Login] = 'Login';
PageType[PageType.Object] = 'Object';
PageType[PageType.List] = 'List';
PageType[PageType.MasterDetail] = 'MasterDetail';
PageType[PageType.Dashboard] = 'Dashboard';
PageType[PageType.Modal] = 'Modal';
/**
 * Placeholder now. The Error Manager handles all the errors on the page.
 *  It is initialized for every page. Page errors, warning, info goes through
 *  the error Manager and the result message is displayed on the page notification area.
 */
var /**
 * Placeholder now. The Error Manager handles all the errors on the page.
 *  It is initialized for every page. Page errors, warning, info goes through
 *  the error Manager and the result message is displayed on the page notification area.
 */
ErrorManager = /** @class */ (function () {
    function ErrorManager() {
    }
    return ErrorManager;
}());
/**
 * Placeholder now. The Error Manager handles all the errors on the page.
 *  It is initialized for every page. Page errors, warning, info goes through
 *  the error Manager and the result message is displayed on the page notification area.
 */
export { ErrorManager };
/**
 *  Page wrapper is the base class for all pages. The idea is that there are different page types
 *  in an Application. A List Page renders a list of objects, ex: customers, requests, PO.  And
 *  a object page will render one object in detail.
 *
 *  They share common attributes such as page type and page id.
 *
 *  Ariba Page have a life cycle. When page starts up, it's initialized. And when the page is
 *  destroyed, it'll be complete.
 * @abstract
 */
var /**
 *  Page wrapper is the base class for all pages. The idea is that there are different page types
 *  in an Application. A List Page renders a list of objects, ex: customers, requests, PO.  And
 *  a object page will render one object in detail.
 *
 *  They share common attributes such as page type and page id.
 *
 *  Ariba Page have a life cycle. When page starts up, it's initialized. And when the page is
 *  destroyed, it'll be complete.
 * @abstract
 */
PageWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(PageWrapper, _super);
    function PageWrapper(env, pageType, componentRegistry, pageLifecycleService) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this.componentRegistry = componentRegistry;
        _this.pageLifecycleService = pageLifecycleService;
        /**
         * What type of page this is.
         *
         */
        _this.pageType = PageType.Init;
        _this.pageType = pageType;
        return _this;
    }
    /**
     * Get the unique Id for this page.
     *
     * @return {?}
     */
    PageWrapper.prototype.getId = /**
     * Get the unique Id for this page.
     *
     * @return {?}
     */
    function () {
        if (this.id) {
            return this.id;
        }
        this.id = this.generatePageId();
    };
    return PageWrapper;
}(BaseComponent));
/**
 *  Page wrapper is the base class for all pages. The idea is that there are different page types
 *  in an Application. A List Page renders a list of objects, ex: customers, requests, PO.  And
 *  a object page will render one object in detail.
 *
 *  They share common attributes such as page type and page id.
 *
 *  Ariba Page have a life cycle. When page starts up, it's initialized. And when the page is
 *  destroyed, it'll be complete.
 * @abstract
 */
export { PageWrapper };
if (false) {
    /**
     * What type of page this is.
     *
     * @type {?}
     */
    PageWrapper.prototype.pageType;
    /**
     * Page Id. Used when pages are stored in map.
     * @type {?}
     */
    PageWrapper.prototype.id;
    /**
     * Handling all the error on a page.
     * @type {?}
     */
    PageWrapper.prototype.errorManager;
    /**
     * Indicate that this page wrapper has been wrapped by another page wrapper.
     * In this case, we wouldn't display header and footer and other page wrapper components
     * @type {?}
     */
    PageWrapper.prototype.alreadyInPageWrapper;
    /** @type {?} */
    PageWrapper.prototype.env;
    /** @type {?} */
    PageWrapper.prototype.componentRegistry;
    /** @type {?} */
    PageWrapper.prototype.pageLifecycleService;
    /**
     * All subclass needs to generated a page identifier.
     * It follows the following pattern:
     *    type_title_id
     *
     *    RFQ_SourcingRequest_123
     * @abstract
     * @return {?}
     */
    PageWrapper.prototype.generatePageId = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS13cmFwcGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2Utd3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQXVCQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7OztJQU1wRCxPQUFJOztJQUNKLFFBQUs7O0lBQ0wsU0FBTTs7SUFDTixPQUFJOztJQUNKLGVBQVk7O0lBQ1osWUFBUzs7SUFDVCxRQUFLOzs7O2tCQU5MLElBQUk7a0JBQ0osS0FBSztrQkFDTCxNQUFNO2tCQUNOLElBQUk7a0JBQ0osWUFBWTtrQkFDWixTQUFTO2tCQUNULEtBQUs7Ozs7OztBQU9UOzs7OztBQUFBOzs7dUJBMUNBO0lBNkNDLENBQUE7Ozs7OztBQUhELHdCQUdDOzs7Ozs7Ozs7Ozs7QUFZRDs7Ozs7Ozs7Ozs7QUFBQTtJQUEwQyx1Q0FBYTtJQXlCbkQscUJBQW1CLEdBQWdCLEVBQUUsUUFBa0IsRUFDakMsaUJBQW9DLEVBQ3BDLG9CQUEwQztRQUZoRSxZQUlJLGtCQUFNLEdBQUcsQ0FBQyxTQUViO1FBTmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFDYix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLDBCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7Ozs7O3lCQXJCakMsUUFBUSxDQUFDLElBQUk7UUF3QnhDLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztLQUM1Qjs7Ozs7O0lBZU0sMkJBQUs7Ozs7OztRQUVSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7c0JBN0d4QztFQXlEMEMsYUFBYSxFQXVEdEQsQ0FBQTs7Ozs7Ozs7Ozs7O0FBdkRELHVCQXVEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0NvbXBvbmVudFJlZ2lzdHJ5fSBmcm9tICcuLi8uLi9jb3JlL2NvbXBvbmVudC1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7UGFnZUxpZmVDeWNsZVNlcnZpY2V9IGZyb20gJy4vcGFnZS1saWZlY3ljbGUuc2VydmljZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRpZmZlcmVudCBwYWdlIHR5cGVzIGluIGFuIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgZW51bSBQYWdlVHlwZSB7XG4gICAgSW5pdCwgICAgICAgICAvLyBJbml0IFBhZ2UgdHlwZVxuICAgIExvZ2luLCAgICAgICAgLy8gTG9naW4gUGFnZVxuICAgIE9iamVjdCwgICAgICAgLy8gT2JqZWN0IGRldGFpbCBwYWdlXG4gICAgTGlzdCwgICAgICAgICAvLyBMaXN0IFBhZ2VcbiAgICBNYXN0ZXJEZXRhaWwsIC8vIE1hc3RlckRldGFpbFxuICAgIERhc2hib2FyZCwgICAgLy8gRGFzaGJvYXJkIHBhZ2VcbiAgICBNb2RhbCAgICAgICAgIC8vIE1vZGFsIHBhZ2UsIGl0IGNhbiBiZSBjb25maWd1cmVkIHRvIGJlIGEgcG9wdXAsIG9yIHN0YW5kYWxvbmUgcGFnZS5cbn1cblxuLyoqIFBsYWNlaG9sZGVyIG5vdy4gVGhlIEVycm9yIE1hbmFnZXIgaGFuZGxlcyBhbGwgdGhlIGVycm9ycyBvbiB0aGUgcGFnZS5cbiAqICBJdCBpcyBpbml0aWFsaXplZCBmb3IgZXZlcnkgcGFnZS4gUGFnZSBlcnJvcnMsIHdhcm5pbmcsIGluZm8gZ29lcyB0aHJvdWdoXG4gKiAgdGhlIGVycm9yIE1hbmFnZXIgYW5kIHRoZSByZXN1bHQgbWVzc2FnZSBpcyBkaXNwbGF5ZWQgb24gdGhlIHBhZ2Ugbm90aWZpY2F0aW9uIGFyZWEuXG4gKi9cbmV4cG9ydCBjbGFzcyBFcnJvck1hbmFnZXJcbntcblxufVxuXG4vKipcbiAqICBQYWdlIHdyYXBwZXIgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBwYWdlcy4gVGhlIGlkZWEgaXMgdGhhdCB0aGVyZSBhcmUgZGlmZmVyZW50IHBhZ2UgdHlwZXNcbiAqICBpbiBhbiBBcHBsaWNhdGlvbi4gQSBMaXN0IFBhZ2UgcmVuZGVycyBhIGxpc3Qgb2Ygb2JqZWN0cywgZXg6IGN1c3RvbWVycywgcmVxdWVzdHMsIFBPLiAgQW5kXG4gKiAgYSBvYmplY3QgcGFnZSB3aWxsIHJlbmRlciBvbmUgb2JqZWN0IGluIGRldGFpbC5cbiAqXG4gKiAgVGhleSBzaGFyZSBjb21tb24gYXR0cmlidXRlcyBzdWNoIGFzIHBhZ2UgdHlwZSBhbmQgcGFnZSBpZC5cbiAqXG4gKiAgQXJpYmEgUGFnZSBoYXZlIGEgbGlmZSBjeWNsZS4gV2hlbiBwYWdlIHN0YXJ0cyB1cCwgaXQncyBpbml0aWFsaXplZC4gQW5kIHdoZW4gdGhlIHBhZ2UgaXNcbiAqICBkZXN0cm95ZWQsIGl0J2xsIGJlIGNvbXBsZXRlLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFnZVdyYXBwZXIgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogV2hhdCB0eXBlIG9mIHBhZ2UgdGhpcyBpcy5cbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBwYWdlVHlwZTogUGFnZVR5cGUgPSBQYWdlVHlwZS5Jbml0O1xuXG4gICAgLyoqXG4gICAgICogUGFnZSBJZC4gVXNlZCB3aGVuIHBhZ2VzIGFyZSBzdG9yZWQgaW4gbWFwLlxuICAgICAqL1xuICAgIGlkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGluZyBhbGwgdGhlIGVycm9yIG9uIGEgcGFnZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZXJyb3JNYW5hZ2VyOiBFcnJvck1hbmFnZXI7XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZSB0aGF0IHRoaXMgcGFnZSB3cmFwcGVyIGhhcyBiZWVuIHdyYXBwZWQgYnkgYW5vdGhlciBwYWdlIHdyYXBwZXIuXG4gICAgICogSW4gdGhpcyBjYXNlLCB3ZSB3b3VsZG4ndCBkaXNwbGF5IGhlYWRlciBhbmQgZm9vdGVyIGFuZCBvdGhlciBwYWdlIHdyYXBwZXIgY29tcG9uZW50c1xuICAgICAqL1xuICAgIGFscmVhZHlJblBhZ2VXcmFwcGVyOiBib29sZWFuO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcGFnZVR5cGU6IFBhZ2VUeXBlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBjb21wb25lbnRSZWdpc3RyeTogQ29tcG9uZW50UmVnaXN0cnksXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhZ2VMaWZlY3ljbGVTZXJ2aWNlOiBQYWdlTGlmZUN5Y2xlU2VydmljZSlcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgICAgIHRoaXMucGFnZVR5cGUgPSBwYWdlVHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGwgc3ViY2xhc3MgbmVlZHMgdG8gZ2VuZXJhdGVkIGEgcGFnZSBpZGVudGlmaWVyLlxuICAgICAqIEl0IGZvbGxvd3MgdGhlIGZvbGxvd2luZyBwYXR0ZXJuOlxuICAgICAqICAgIHR5cGVfdGl0bGVfaWRcbiAgICAgKlxuICAgICAqICAgIFJGUV9Tb3VyY2luZ1JlcXVlc3RfMTIzXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2VuZXJhdGVQYWdlSWQoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB1bmlxdWUgSWQgZm9yIHRoaXMgcGFnZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRJZCgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmdlbmVyYXRlUGFnZUlkKCk7XG4gICAgfVxuXG59XG5cblxuIl19