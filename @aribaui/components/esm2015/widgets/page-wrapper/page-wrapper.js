/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { BaseComponent } from '../../core/base.component';
/** @enum {number} */
const PageType = {
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
export class ErrorManager {
}
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
export class PageWrapper extends BaseComponent {
    /**
     * @param {?} env
     * @param {?} pageType
     * @param {?} componentRegistry
     * @param {?} pageLifecycleService
     */
    constructor(env, pageType, componentRegistry, pageLifecycleService) {
        super(env);
        this.env = env;
        this.componentRegistry = componentRegistry;
        this.pageLifecycleService = pageLifecycleService;
        /**
         * What type of page this is.
         *
         */
        this.pageType = PageType.Init;
        this.pageType = pageType;
    }
    /**
     * Get the unique Id for this page.
     *
     * @return {?}
     */
    getId() {
        if (this.id) {
            return this.id;
        }
        this.id = this.generatePageId();
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS13cmFwcGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcGFnZS13cmFwcGVyL3BhZ2Utd3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBdUJBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7O0lBTXBELE9BQUk7O0lBQ0osUUFBSzs7SUFDTCxTQUFNOztJQUNOLE9BQUk7O0lBQ0osZUFBWTs7SUFDWixZQUFTOztJQUNULFFBQUs7Ozs7a0JBTkwsSUFBSTtrQkFDSixLQUFLO2tCQUNMLE1BQU07a0JBQ04sSUFBSTtrQkFDSixZQUFZO2tCQUNaLFNBQVM7a0JBQ1QsS0FBSzs7Ozs7O0FBT1QsTUFBTTtDQUdMOzs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLGtCQUE0QixTQUFRLGFBQWE7Ozs7Ozs7SUF5Qm5ELFlBQW1CLEdBQWdCLEVBQUUsUUFBa0IsRUFDakMsaUJBQW9DLEVBQ3BDLG9CQUEwQztRQUU1RCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFKSSxRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ2Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCOzs7Ozt3QkFyQmpDLFFBQVEsQ0FBQyxJQUFJO1FBd0J4QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztLQUM1Qjs7Ozs7O0lBZU0sS0FBSztRQUVSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Q0FHdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4vLi4vY29yZS9jb21wb25lbnQtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge1BhZ2VMaWZlQ3ljbGVTZXJ2aWNlfSBmcm9tICcuL3BhZ2UtbGlmZWN5Y2xlLnNlcnZpY2UnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkaWZmZXJlbnQgcGFnZSB0eXBlcyBpbiBhbiBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGVudW0gUGFnZVR5cGUge1xuICAgIEluaXQsICAgICAgICAgLy8gSW5pdCBQYWdlIHR5cGVcbiAgICBMb2dpbiwgICAgICAgIC8vIExvZ2luIFBhZ2VcbiAgICBPYmplY3QsICAgICAgIC8vIE9iamVjdCBkZXRhaWwgcGFnZVxuICAgIExpc3QsICAgICAgICAgLy8gTGlzdCBQYWdlXG4gICAgTWFzdGVyRGV0YWlsLCAvLyBNYXN0ZXJEZXRhaWxcbiAgICBEYXNoYm9hcmQsICAgIC8vIERhc2hib2FyZCBwYWdlXG4gICAgTW9kYWwgICAgICAgICAvLyBNb2RhbCBwYWdlLCBpdCBjYW4gYmUgY29uZmlndXJlZCB0byBiZSBhIHBvcHVwLCBvciBzdGFuZGFsb25lIHBhZ2UuXG59XG5cbi8qKiBQbGFjZWhvbGRlciBub3cuIFRoZSBFcnJvciBNYW5hZ2VyIGhhbmRsZXMgYWxsIHRoZSBlcnJvcnMgb24gdGhlIHBhZ2UuXG4gKiAgSXQgaXMgaW5pdGlhbGl6ZWQgZm9yIGV2ZXJ5IHBhZ2UuIFBhZ2UgZXJyb3JzLCB3YXJuaW5nLCBpbmZvIGdvZXMgdGhyb3VnaFxuICogIHRoZSBlcnJvciBNYW5hZ2VyIGFuZCB0aGUgcmVzdWx0IG1lc3NhZ2UgaXMgZGlzcGxheWVkIG9uIHRoZSBwYWdlIG5vdGlmaWNhdGlvbiBhcmVhLlxuICovXG5leHBvcnQgY2xhc3MgRXJyb3JNYW5hZ2VyXG57XG5cbn1cblxuLyoqXG4gKiAgUGFnZSB3cmFwcGVyIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgcGFnZXMuIFRoZSBpZGVhIGlzIHRoYXQgdGhlcmUgYXJlIGRpZmZlcmVudCBwYWdlIHR5cGVzXG4gKiAgaW4gYW4gQXBwbGljYXRpb24uIEEgTGlzdCBQYWdlIHJlbmRlcnMgYSBsaXN0IG9mIG9iamVjdHMsIGV4OiBjdXN0b21lcnMsIHJlcXVlc3RzLCBQTy4gIEFuZFxuICogIGEgb2JqZWN0IHBhZ2Ugd2lsbCByZW5kZXIgb25lIG9iamVjdCBpbiBkZXRhaWwuXG4gKlxuICogIFRoZXkgc2hhcmUgY29tbW9uIGF0dHJpYnV0ZXMgc3VjaCBhcyBwYWdlIHR5cGUgYW5kIHBhZ2UgaWQuXG4gKlxuICogIEFyaWJhIFBhZ2UgaGF2ZSBhIGxpZmUgY3ljbGUuIFdoZW4gcGFnZSBzdGFydHMgdXAsIGl0J3MgaW5pdGlhbGl6ZWQuIEFuZCB3aGVuIHRoZSBwYWdlIGlzXG4gKiAgZGVzdHJveWVkLCBpdCdsbCBiZSBjb21wbGV0ZS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VXcmFwcGVyIGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqIFdoYXQgdHlwZSBvZiBwYWdlIHRoaXMgaXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcGFnZVR5cGU6IFBhZ2VUeXBlID0gUGFnZVR5cGUuSW5pdDtcblxuICAgIC8qKlxuICAgICAqIFBhZ2UgSWQuIFVzZWQgd2hlbiBwYWdlcyBhcmUgc3RvcmVkIGluIG1hcC5cbiAgICAgKi9cbiAgICBpZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSGFuZGxpbmcgYWxsIHRoZSBlcnJvciBvbiBhIHBhZ2UuXG4gICAgICovXG4gICAgcHVibGljIGVycm9yTWFuYWdlcjogRXJyb3JNYW5hZ2VyO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGUgdGhhdCB0aGlzIHBhZ2Ugd3JhcHBlciBoYXMgYmVlbiB3cmFwcGVkIGJ5IGFub3RoZXIgcGFnZSB3cmFwcGVyLlxuICAgICAqIEluIHRoaXMgY2FzZSwgd2Ugd291bGRuJ3QgZGlzcGxheSBoZWFkZXIgYW5kIGZvb3RlciBhbmQgb3RoZXIgcGFnZSB3cmFwcGVyIGNvbXBvbmVudHNcbiAgICAgKi9cbiAgICBhbHJlYWR5SW5QYWdlV3JhcHBlcjogYm9vbGVhbjtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHBhZ2VUeXBlOiBQYWdlVHlwZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgY29tcG9uZW50UmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYWdlTGlmZWN5Y2xlU2VydmljZTogUGFnZUxpZmVDeWNsZVNlcnZpY2UpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgICAgICB0aGlzLnBhZ2VUeXBlID0gcGFnZVR5cGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsIHN1YmNsYXNzIG5lZWRzIHRvIGdlbmVyYXRlZCBhIHBhZ2UgaWRlbnRpZmllci5cbiAgICAgKiBJdCBmb2xsb3dzIHRoZSBmb2xsb3dpbmcgcGF0dGVybjpcbiAgICAgKiAgICB0eXBlX3RpdGxlX2lkXG4gICAgICpcbiAgICAgKiAgICBSRlFfU291cmNpbmdSZXF1ZXN0XzEyM1xuICAgICAqL1xuICAgIGFic3RyYWN0IGdlbmVyYXRlUGFnZUlkKCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdW5pcXVlIElkIGZvciB0aGlzIHBhZ2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SWQoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAodGhpcy5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlkID0gdGhpcy5nZW5lcmF0ZVBhZ2VJZCgpO1xuICAgIH1cblxufVxuXG5cbiJdfQ==