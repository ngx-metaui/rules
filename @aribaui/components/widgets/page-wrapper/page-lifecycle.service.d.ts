import { Subject } from 'rxjs';
import { PageEvent } from './page-events';
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
export declare class PageLifeCycleService {
    /**
     * Page event queue when all page lifecycle events: init, destroy are emitted.
     * Listeners can subscribe to these events.
     */
    pageEvents: Subject<PageEvent>;
    /**
     *
     */
    constructor();
    /**
     * Called when page is initialized.
     * @param pageTitle
     */
    onPageInit(pageTitle: string): void;
    /**
     * Call when page has been destroyed
     * @param title
     */
    onPageDestroy(pageTitle: string): void;
}
