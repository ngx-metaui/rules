/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    Modal: 6,
};
export { PageType };
PageType[PageType.Init] = "Init";
PageType[PageType.Login] = "Login";
PageType[PageType.Object] = "Object";
PageType[PageType.List] = "List";
PageType[PageType.MasterDetail] = "MasterDetail";
PageType[PageType.Dashboard] = "Dashboard";
PageType[PageType.Modal] = "Modal";
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
function PageWrapper_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS13cmFwcGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2Utd3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQXVCQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CeEQ7Ozs7O0FBQUE7Ozt1QkExQ0E7SUE2Q0MsQ0FBQTs7Ozs7O0FBSEQsd0JBR0M7Ozs7Ozs7Ozs7OztBQVlEOzs7Ozs7Ozs7OztBQUFBO0lBQTBDLHVDQUFhO0lBeUJuRCxxQkFBbUIsR0FBZ0IsRUFBRSxRQUFrQixFQUNqQyxpQkFBb0MsRUFDcEMsb0JBQTBDO1FBRmhFLFlBSUksa0JBQU0sR0FBRyxDQUFDLFNBRWI7UUFOa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUNiLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsMEJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjs7Ozs7eUJBckJqQyxRQUFRLENBQUMsSUFBSTtRQXdCeEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0tBQzVCOzs7Ozs7SUFlTSwyQkFBSzs7Ozs7O1FBRVIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztzQkE3R3hDO0VBeUQwQyxhQUFhLEVBdUR0RCxDQUFBOzs7Ozs7Ozs7Ozs7QUF2REQsdUJBdURDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uLy4uL2NvcmUvY29tcG9uZW50LXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtQYWdlTGlmZUN5Y2xlU2VydmljZX0gZnJvbSAnLi9wYWdlLWxpZmVjeWNsZS5zZXJ2aWNlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZGlmZmVyZW50IHBhZ2UgdHlwZXMgaW4gYW4gYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBlbnVtIFBhZ2VUeXBlIHtcbiAgICBJbml0LCAgICAgICAgIC8vIEluaXQgUGFnZSB0eXBlXG4gICAgTG9naW4sICAgICAgICAvLyBMb2dpbiBQYWdlXG4gICAgT2JqZWN0LCAgICAgICAvLyBPYmplY3QgZGV0YWlsIHBhZ2VcbiAgICBMaXN0LCAgICAgICAgIC8vIExpc3QgUGFnZVxuICAgIE1hc3RlckRldGFpbCwgLy8gTWFzdGVyRGV0YWlsXG4gICAgRGFzaGJvYXJkLCAgICAvLyBEYXNoYm9hcmQgcGFnZVxuICAgIE1vZGFsICAgICAgICAgLy8gTW9kYWwgcGFnZSwgaXQgY2FuIGJlIGNvbmZpZ3VyZWQgdG8gYmUgYSBwb3B1cCwgb3Igc3RhbmRhbG9uZSBwYWdlLlxufVxuXG4vKiogUGxhY2Vob2xkZXIgbm93LiBUaGUgRXJyb3IgTWFuYWdlciBoYW5kbGVzIGFsbCB0aGUgZXJyb3JzIG9uIHRoZSBwYWdlLlxuICogIEl0IGlzIGluaXRpYWxpemVkIGZvciBldmVyeSBwYWdlLiBQYWdlIGVycm9ycywgd2FybmluZywgaW5mbyBnb2VzIHRocm91Z2hcbiAqICB0aGUgZXJyb3IgTWFuYWdlciBhbmQgdGhlIHJlc3VsdCBtZXNzYWdlIGlzIGRpc3BsYXllZCBvbiB0aGUgcGFnZSBub3RpZmljYXRpb24gYXJlYS5cbiAqL1xuZXhwb3J0IGNsYXNzIEVycm9yTWFuYWdlclxue1xuXG59XG5cbi8qKlxuICogIFBhZ2Ugd3JhcHBlciBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIHBhZ2VzLiBUaGUgaWRlYSBpcyB0aGF0IHRoZXJlIGFyZSBkaWZmZXJlbnQgcGFnZSB0eXBlc1xuICogIGluIGFuIEFwcGxpY2F0aW9uLiBBIExpc3QgUGFnZSByZW5kZXJzIGEgbGlzdCBvZiBvYmplY3RzLCBleDogY3VzdG9tZXJzLCByZXF1ZXN0cywgUE8uICBBbmRcbiAqICBhIG9iamVjdCBwYWdlIHdpbGwgcmVuZGVyIG9uZSBvYmplY3QgaW4gZGV0YWlsLlxuICpcbiAqICBUaGV5IHNoYXJlIGNvbW1vbiBhdHRyaWJ1dGVzIHN1Y2ggYXMgcGFnZSB0eXBlIGFuZCBwYWdlIGlkLlxuICpcbiAqICBBcmliYSBQYWdlIGhhdmUgYSBsaWZlIGN5Y2xlLiBXaGVuIHBhZ2Ugc3RhcnRzIHVwLCBpdCdzIGluaXRpYWxpemVkLiBBbmQgd2hlbiB0aGUgcGFnZSBpc1xuICogIGRlc3Ryb3llZCwgaXQnbGwgYmUgY29tcGxldGUuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYWdlV3JhcHBlciBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcbiAgICAvKipcbiAgICAgKiBXaGF0IHR5cGUgb2YgcGFnZSB0aGlzIGlzLlxuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHBhZ2VUeXBlOiBQYWdlVHlwZSA9IFBhZ2VUeXBlLkluaXQ7XG5cbiAgICAvKipcbiAgICAgKiBQYWdlIElkLiBVc2VkIHdoZW4gcGFnZXMgYXJlIHN0b3JlZCBpbiBtYXAuXG4gICAgICovXG4gICAgaWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEhhbmRsaW5nIGFsbCB0aGUgZXJyb3Igb24gYSBwYWdlLlxuICAgICAqL1xuICAgIHB1YmxpYyBlcnJvck1hbmFnZXI6IEVycm9yTWFuYWdlcjtcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlIHRoYXQgdGhpcyBwYWdlIHdyYXBwZXIgaGFzIGJlZW4gd3JhcHBlZCBieSBhbm90aGVyIHBhZ2Ugd3JhcHBlci5cbiAgICAgKiBJbiB0aGlzIGNhc2UsIHdlIHdvdWxkbid0IGRpc3BsYXkgaGVhZGVyIGFuZCBmb290ZXIgYW5kIG90aGVyIHBhZ2Ugd3JhcHBlciBjb21wb25lbnRzXG4gICAgICovXG4gICAgYWxyZWFkeUluUGFnZVdyYXBwZXI6IGJvb2xlYW47XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwYWdlVHlwZTogUGFnZVR5cGUsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGNvbXBvbmVudFJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFnZUxpZmVjeWNsZVNlcnZpY2U6IFBhZ2VMaWZlQ3ljbGVTZXJ2aWNlKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICAgICAgdGhpcy5wYWdlVHlwZSA9IHBhZ2VUeXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbCBzdWJjbGFzcyBuZWVkcyB0byBnZW5lcmF0ZWQgYSBwYWdlIGlkZW50aWZpZXIuXG4gICAgICogSXQgZm9sbG93cyB0aGUgZm9sbG93aW5nIHBhdHRlcm46XG4gICAgICogICAgdHlwZV90aXRsZV9pZFxuICAgICAqXG4gICAgICogICAgUkZRX1NvdXJjaW5nUmVxdWVzdF8xMjNcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZW5lcmF0ZVBhZ2VJZCgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHVuaXF1ZSBJZCBmb3IgdGhpcyBwYWdlLlxuICAgICAqXG4gICAgICovXG4gICAgcHVibGljIGdldElkKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuZ2VuZXJhdGVQYWdlSWQoKTtcbiAgICB9XG5cbn1cblxuXG4iXX0=