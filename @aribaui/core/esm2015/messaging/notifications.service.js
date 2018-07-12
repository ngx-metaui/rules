/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
/**
 * Notifications service is a implementation of the publish/subscribe event bus for publishing
 * and listening for application level events.
 *
 * To subscribe to specific event e.g. User Logged In where topic is called user:signedIn
 *
 *
 * ```ts
 *
 * \@Component({
 *         selector: 'my-comp',
 *         template: `
 *                 Hello
 *             `
 *     })
 *     class MyComponent implements OnDestroy
 *     {
 *
 *        subscr: Subscription;
 *
 *         constructor(private notifications: Notifications) {
 *
 *              this.subscr = notifications.subscribe('user:signedIn', (message: any) =>
 *              {
 *                  // load user profile
 *              });
 *         }
 *
 *          ngOnDestroy(): void
 *          {
 *             this.subscr.unsubscribe();
 *          }
 *
 *
 *
 *     }
 *
 *
 * ```
 *
 * To publish event:
 *
 * ```
 *     let notifications: Notification;
 *     notifications.publish('user:signedIn', 'User just signed in');
 *
 * ```
 *
 * You can create and listen for your own application level events or you can also listen for all
 * the topics in the application if you use  `*` as application topic
 *
 * Unsubscribing is responsibility  of each subscriber
 *
 */
export class Notifications {
    constructor() {
        this.events = new Subject();
    }
    /**
     *
     * Subscribe to specific listener based on given topic.
     *
     * @param {?} topic
     * @param {?} subscriber
     * @return {?}
     */
    subscribe(topic, subscriber) {
        const /** @type {?} */ toAll = Notifications.AllTopics;
        return this.events.pipe(filter(msg => msg.topic === topic || topic === toAll), map((msg) => msg.content)).subscribe(subscriber);
    }
    /**
     *
     * Publish new event to a topic
     *
     * @param {?} topic
     * @param {?} message
     * @return {?}
     */
    publish(topic, message) {
        let /** @type {?} */ msg = { topic: topic, content: message };
        this.events.next(msg);
    }
}
/**
 * When this is used as a topic subscriber receives all messages
 *
 */
Notifications.AllTopics = '*';
Notifications.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Notifications.ctorParameters = () => [];
function Notifications_tsickle_Closure_declarations() {
    /**
     * When this is used as a topic subscriber receives all messages
     *
     * @type {?}
     */
    Notifications.AllTopics;
    /**
     * Observable used to publish and subscribe to application level events
     * @type {?}
     */
    Notifications.prototype.events;
}
/**
 *
 * Base class for generic message
 *
 * @record
 */
export function Message() { }
function Message_tsickle_Closure_declarations() {
    /** @type {?} */
    Message.prototype.topic;
    /** @type {?} */
    Message.prototype.content;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2luZy9ub3RpZmljYXRpb25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlEN0MsTUFBTTtJQWVGO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0tBQ3hDOzs7Ozs7Ozs7SUFPRCxTQUFTLENBQUMsS0FBYSxFQUFFLFVBQWdDO1FBRXJELHVCQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBRXRDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxFQUNyRCxHQUFHLENBQUMsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FFckMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDM0I7Ozs7Ozs7OztJQU9ELE9BQU8sQ0FBQyxLQUFhLEVBQUUsT0FBWTtRQUUvQixxQkFBSSxHQUFHLEdBQVksRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUV6Qjs7Ozs7OzBCQXZDMkIsR0FBRzs7WUFSbEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIE5vdGlmaWNhdGlvbnMgc2VydmljZSBpcyBhIGltcGxlbWVudGF0aW9uIG9mIHRoZSBwdWJsaXNoL3N1YnNjcmliZSBldmVudCBidXMgZm9yIHB1Ymxpc2hpbmdcbiAqIGFuZCBsaXN0ZW5pbmcgZm9yIGFwcGxpY2F0aW9uIGxldmVsIGV2ZW50cy5cbiAqXG4gKiBUbyBzdWJzY3JpYmUgdG8gc3BlY2lmaWMgZXZlbnQgZS5nLiBVc2VyIExvZ2dlZCBJbiB3aGVyZSB0b3BpYyBpcyBjYWxsZWQgdXNlcjpzaWduZWRJblxuICpcbiAqXG4gKiBgYGB0c1xuICpcbiAqICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgc2VsZWN0b3I6ICdteS1jb21wJyxcbiAqICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICAgICBIZWxsb1xuICogICAgICAgICAgICAgYFxuICogICAgIH0pXG4gKiAgICAgY2xhc3MgTXlDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbiAqICAgICB7XG4gKlxuICogICAgICAgIHN1YnNjcjogU3Vic2NyaXB0aW9uO1xuICpcbiAqICAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25zKSB7XG4gKlxuICogICAgICAgICAgICAgIHRoaXMuc3Vic2NyID0gbm90aWZpY2F0aW9ucy5zdWJzY3JpYmUoJ3VzZXI6c2lnbmVkSW4nLCAobWVzc2FnZTogYW55KSA9PlxuICogICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgLy8gbG9hZCB1c2VyIHByb2ZpbGVcbiAqICAgICAgICAgICAgICB9KTtcbiAqICAgICAgICAgfVxuICpcbiAqICAgICAgICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAqICAgICAgICAgIHtcbiAqICAgICAgICAgICAgIHRoaXMuc3Vic2NyLnVuc3Vic2NyaWJlKCk7XG4gKiAgICAgICAgICB9XG4gKlxuICpcbiAqXG4gKiAgICAgfVxuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiBUbyBwdWJsaXNoIGV2ZW50OlxuICpcbiAqIGBgYFxuICogICAgIGxldCBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb247XG4gKiAgICAgbm90aWZpY2F0aW9ucy5wdWJsaXNoKCd1c2VyOnNpZ25lZEluJywgJ1VzZXIganVzdCBzaWduZWQgaW4nKTtcbiAqXG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGNyZWF0ZSBhbmQgbGlzdGVuIGZvciB5b3VyIG93biBhcHBsaWNhdGlvbiBsZXZlbCBldmVudHMgb3IgeW91IGNhbiBhbHNvIGxpc3RlbiBmb3IgYWxsXG4gKiB0aGUgdG9waWNzIGluIHRoZSBhcHBsaWNhdGlvbiBpZiB5b3UgdXNlICBgKmAgYXMgYXBwbGljYXRpb24gdG9waWNcbiAqXG4gKiBVbnN1YnNjcmliaW5nIGlzIHJlc3BvbnNpYmlsaXR5ICBvZiBlYWNoIHN1YnNjcmliZXJcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25zXG57XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoaXMgaXMgdXNlZCBhcyBhIHRvcGljIHN1YnNjcmliZXIgcmVjZWl2ZXMgYWxsIG1lc3NhZ2VzXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgQWxsVG9waWNzID0gJyonO1xuXG4gICAgLyoqXG4gICAgICogT2JzZXJ2YWJsZSB1c2VkIHRvIHB1Ymxpc2ggYW5kIHN1YnNjcmliZSB0byBhcHBsaWNhdGlvbiBsZXZlbCBldmVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIGV2ZW50czogU3ViamVjdDxNZXNzYWdlPjtcblxuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgU3ViamVjdDxNZXNzYWdlPigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU3Vic2NyaWJlIHRvIHNwZWNpZmljIGxpc3RlbmVyIGJhc2VkIG9uIGdpdmVuIHRvcGljLlxuICAgICAqXG4gICAgICovXG4gICAgc3Vic2NyaWJlKHRvcGljOiBzdHJpbmcsIHN1YnNjcmliZXI6ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogU3Vic2NyaXB0aW9uXG4gICAge1xuICAgICAgICBjb25zdCB0b0FsbCA9IE5vdGlmaWNhdGlvbnMuQWxsVG9waWNzO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKG1zZyA9PiBtc2cudG9waWMgPT09IHRvcGljIHx8IHRvcGljID09PSB0b0FsbCksXG4gICAgICAgICAgICBtYXAoKG1zZzogTWVzc2FnZSkgPT4gbXNnLmNvbnRlbnQpXG5cbiAgICAgICAgKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBQdWJsaXNoIG5ldyBldmVudCB0byBhIHRvcGljXG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaXNoKHRvcGljOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBtc2c6IE1lc3NhZ2UgPSB7dG9waWM6IHRvcGljLCBjb250ZW50OiBtZXNzYWdlfTtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChtc2cpO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICpcbiAqIEJhc2UgY2xhc3MgZm9yIGdlbmVyaWMgbWVzc2FnZVxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlXG57XG4gICAgdG9waWM6IHN0cmluZztcbiAgICBjb250ZW50OiBhbnk7XG59XG4iXX0=