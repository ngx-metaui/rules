/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageDestroyed, PageInitialized } from './page-events';
/**
 * Page LifeCycle Service monitors all page initialization and destructions.
 * The purpose of this service is to help the application monitor page lifecycle, subscribe
 * to lifecycle events and execute actions such as user analytics.
 *
 * Usage:
 *
 *    1.  Inject PageLifeCycleService into your constructor
 *
 *    constructor(pageLifecycle:PageLifeCycleService) {
 *        pageLifecycle.pageEvents.subscribe(event:Event => {
 *            if(event instanceof PageInitialized) {
 *            }
 *            // PageDestroyed
 *
 *        });
 *     }
 */
var PageLifeCycleService = /** @class */ (function () {
    /**
     *
     */
    function PageLifeCycleService() {
        /**
         * Page event queue when all page lifecycle events: init, destroy are emitted.
         * Listeners can subscribe to these events.
         */
        this.pageEvents = new Subject();
    }
    /**
     * Called when page is initialized.
     * @param {?} pageTitle
     * @return {?}
     */
    PageLifeCycleService.prototype.onPageInit = /**
     * Called when page is initialized.
     * @param {?} pageTitle
     * @return {?}
     */
    function (pageTitle) {
        this.pageEvents.next(new PageInitialized(pageTitle));
    };
    /**
     * Call when page has been destroyed
     * @param {?} pageTitle
     * @return {?}
     */
    PageLifeCycleService.prototype.onPageDestroy = /**
     * Call when page has been destroyed
     * @param {?} pageTitle
     * @return {?}
     */
    function (pageTitle) {
        this.pageEvents.next(new PageDestroyed(pageTitle));
    };
    PageLifeCycleService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PageLifeCycleService.ctorParameters = function () { return []; };
    return PageLifeCycleService;
}());
export { PageLifeCycleService };
if (false) {
    /**
     * Page event queue when all page lifecycle events: init, destroy are emitted.
     * Listeners can subscribe to these events.
     * @type {?}
     */
    PageLifeCycleService.prototype.pageEvents;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1saWZlY3ljbGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3BhZ2Utd3JhcHBlci9wYWdlLWxpZmVjeWNsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxhQUFhLEVBQWEsZUFBZSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQThCcEU7O09BRUc7SUFDSDs7Ozs7MEJBTHdDLElBQUksT0FBTyxFQUFhO0tBUS9EOzs7Ozs7SUFNTSx5Q0FBVTs7Ozs7Y0FBQyxTQUFpQjtRQUUvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBT2xELDRDQUFhOzs7OztjQUFDLFNBQWlCO1FBRWxDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7OztnQkFqQzFELFVBQVU7Ozs7K0JBMUNYOztTQTJDYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtQYWdlRGVzdHJveWVkLCBQYWdlRXZlbnQsIFBhZ2VJbml0aWFsaXplZH0gZnJvbSAnLi9wYWdlLWV2ZW50cyc7XG5cbi8qKlxuICogUGFnZSBMaWZlQ3ljbGUgU2VydmljZSBtb25pdG9ycyBhbGwgcGFnZSBpbml0aWFsaXphdGlvbiBhbmQgZGVzdHJ1Y3Rpb25zLlxuICogVGhlIHB1cnBvc2Ugb2YgdGhpcyBzZXJ2aWNlIGlzIHRvIGhlbHAgdGhlIGFwcGxpY2F0aW9uIG1vbml0b3IgcGFnZSBsaWZlY3ljbGUsIHN1YnNjcmliZVxuICogdG8gbGlmZWN5Y2xlIGV2ZW50cyBhbmQgZXhlY3V0ZSBhY3Rpb25zIHN1Y2ggYXMgdXNlciBhbmFseXRpY3MuXG4gKlxuICogVXNhZ2U6XG4gKlxuICogICAgMS4gIEluamVjdCBQYWdlTGlmZUN5Y2xlU2VydmljZSBpbnRvIHlvdXIgY29uc3RydWN0b3JcbiAqXG4gKiAgICBjb25zdHJ1Y3RvcihwYWdlTGlmZWN5Y2xlOlBhZ2VMaWZlQ3ljbGVTZXJ2aWNlKSB7XG4gKiAgICAgICAgcGFnZUxpZmVjeWNsZS5wYWdlRXZlbnRzLnN1YnNjcmliZShldmVudDpFdmVudCA9PiB7XG4gKiAgICAgICAgICAgIGlmKGV2ZW50IGluc3RhbmNlb2YgUGFnZUluaXRpYWxpemVkKSB7XG4gKiAgICAgICAgICAgIH1cbiAqICAgICAgICAgICAgLy8gUGFnZURlc3Ryb3llZFxuICpcbiAqICAgICAgICB9KTtcbiAqICAgICB9XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYWdlTGlmZUN5Y2xlU2VydmljZVxue1xuXG4gICAgLyoqXG4gICAgICogUGFnZSBldmVudCBxdWV1ZSB3aGVuIGFsbCBwYWdlIGxpZmVjeWNsZSBldmVudHM6IGluaXQsIGRlc3Ryb3kgYXJlIGVtaXR0ZWQuXG4gICAgICogTGlzdGVuZXJzIGNhbiBzdWJzY3JpYmUgdG8gdGhlc2UgZXZlbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBwYWdlRXZlbnRzOiBTdWJqZWN0PFBhZ2VFdmVudD4gPSBuZXcgU3ViamVjdDxQYWdlRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBwYWdlIGlzIGluaXRpYWxpemVkLlxuICAgICAqIEBwYXJhbSBwYWdlVGl0bGVcbiAgICAgKi9cbiAgICBwdWJsaWMgb25QYWdlSW5pdChwYWdlVGl0bGU6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMucGFnZUV2ZW50cy5uZXh0KG5ldyBQYWdlSW5pdGlhbGl6ZWQocGFnZVRpdGxlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCB3aGVuIHBhZ2UgaGFzIGJlZW4gZGVzdHJveWVkXG4gICAgICogQHBhcmFtIHRpdGxlXG4gICAgICovXG4gICAgcHVibGljIG9uUGFnZURlc3Ryb3kocGFnZVRpdGxlOiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnBhZ2VFdmVudHMubmV4dChuZXcgUGFnZURlc3Ryb3llZChwYWdlVGl0bGUpKTtcbiAgICB9XG59XG5cbiJdfQ==