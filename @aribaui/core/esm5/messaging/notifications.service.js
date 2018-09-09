/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
var Notifications = /** @class */ (function () {
    function Notifications() {
        this.events = new Subject();
    }
    /**
     *
     * Subscribe to specific listener based on given topic.
     *
     */
    /**
     *
     * Subscribe to specific listener based on given topic.
     *
     * @param {?} topic
     * @param {?} subscriber
     * @return {?}
     */
    Notifications.prototype.subscribe = /**
     *
     * Subscribe to specific listener based on given topic.
     *
     * @param {?} topic
     * @param {?} subscriber
     * @return {?}
     */
    function (topic, subscriber) {
        /** @type {?} */
        var toAll = Notifications.AllTopics;
        return this.events.pipe(filter(function (msg) { return msg.topic === topic || topic === toAll; }), map(function (msg) { return msg.content; })).subscribe(subscriber);
    };
    /**
     *
     * Publish new event to a topic
     *
     */
    /**
     *
     * Publish new event to a topic
     *
     * @param {?} topic
     * @param {?} message
     * @return {?}
     */
    Notifications.prototype.publish = /**
     *
     * Publish new event to a topic
     *
     * @param {?} topic
     * @param {?} message
     * @return {?}
     */
    function (topic, message) {
        /** @type {?} */
        var msg = { topic: topic, content: message };
        this.events.next(msg);
    };
    /**
     * When this is used as a topic subscriber receives all messages
     *
     */
    Notifications.AllTopics = '*';
    Notifications.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Notifications.ctorParameters = function () { return []; };
    return Notifications;
}());
export { Notifications };
if (false) {
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
/** @type {?} */
Message.prototype.topic;
/** @type {?} */
Message.prototype.content;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2luZy9ub3RpZmljYXRpb25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3RXpDO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0tBQ3hDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7O0lBQ0gsaUNBQVM7Ozs7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsVUFBZ0M7O1FBRXJELElBQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFFdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNuQixNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsS0FBSyxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssS0FBSyxFQUF0QyxDQUFzQyxDQUFDLEVBQ3JELEdBQUcsQ0FBQyxVQUFDLEdBQVksSUFBSyxPQUFBLEdBQUcsQ0FBQyxPQUFPLEVBQVgsQ0FBVyxDQUFDLENBRXJDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzNCO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7O0lBQ0gsK0JBQU87Ozs7Ozs7O0lBQVAsVUFBUSxLQUFhLEVBQUUsT0FBWTs7UUFFL0IsSUFBSSxHQUFHLEdBQVksRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUV6Qjs7Ozs7OEJBdkMyQixHQUFHOztnQkFSbEMsVUFBVTs7Ozt3QkE5RVg7O1NBK0VhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBOb3RpZmljYXRpb25zIHNlcnZpY2UgaXMgYSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgcHVibGlzaC9zdWJzY3JpYmUgZXZlbnQgYnVzIGZvciBwdWJsaXNoaW5nXG4gKiBhbmQgbGlzdGVuaW5nIGZvciBhcHBsaWNhdGlvbiBsZXZlbCBldmVudHMuXG4gKlxuICogVG8gc3Vic2NyaWJlIHRvIHNwZWNpZmljIGV2ZW50IGUuZy4gVXNlciBMb2dnZWQgSW4gd2hlcmUgdG9waWMgaXMgY2FsbGVkIHVzZXI6c2lnbmVkSW5cbiAqXG4gKlxuICogYGBgdHNcbiAqXG4gKiAgICAgQENvbXBvbmVudCh7XG4gKiAgICAgICAgIHNlbGVjdG9yOiAnbXktY29tcCcsXG4gKiAgICAgICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgICAgICAgICAgSGVsbG9cbiAqICAgICAgICAgICAgIGBcbiAqICAgICB9KVxuICogICAgIGNsYXNzIE15Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95XG4gKiAgICAge1xuICpcbiAqICAgICAgICBzdWJzY3I6IFN1YnNjcmlwdGlvbjtcbiAqXG4gKiAgICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9ucykge1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLnN1YnNjciA9IG5vdGlmaWNhdGlvbnMuc3Vic2NyaWJlKCd1c2VyOnNpZ25lZEluJywgKG1lc3NhZ2U6IGFueSkgPT5cbiAqICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgIC8vIGxvYWQgdXNlciBwcm9maWxlXG4gKiAgICAgICAgICAgICAgfSk7XG4gKiAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICAgICB0aGlzLnN1YnNjci51bnN1YnNjcmliZSgpO1xuICogICAgICAgICAgfVxuICpcbiAqXG4gKlxuICogICAgIH1cbiAqXG4gKlxuICogYGBgXG4gKlxuICogVG8gcHVibGlzaCBldmVudDpcbiAqXG4gKiBgYGBcbiAqICAgICBsZXQgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uO1xuICogICAgIG5vdGlmaWNhdGlvbnMucHVibGlzaCgndXNlcjpzaWduZWRJbicsICdVc2VyIGp1c3Qgc2lnbmVkIGluJyk7XG4gKlxuICogYGBgXG4gKlxuICogWW91IGNhbiBjcmVhdGUgYW5kIGxpc3RlbiBmb3IgeW91ciBvd24gYXBwbGljYXRpb24gbGV2ZWwgZXZlbnRzIG9yIHlvdSBjYW4gYWxzbyBsaXN0ZW4gZm9yIGFsbFxuICogdGhlIHRvcGljcyBpbiB0aGUgYXBwbGljYXRpb24gaWYgeW91IHVzZSAgYCpgIGFzIGFwcGxpY2F0aW9uIHRvcGljXG4gKlxuICogVW5zdWJzY3JpYmluZyBpcyByZXNwb25zaWJpbGl0eSAgb2YgZWFjaCBzdWJzY3JpYmVyXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uc1xue1xuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGlzIGlzIHVzZWQgYXMgYSB0b3BpYyBzdWJzY3JpYmVyIHJlY2VpdmVzIGFsbCBtZXNzYWdlc1xuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IEFsbFRvcGljcyA9ICcqJztcblxuICAgIC8qKlxuICAgICAqIE9ic2VydmFibGUgdXNlZCB0byBwdWJsaXNoIGFuZCBzdWJzY3JpYmUgdG8gYXBwbGljYXRpb24gbGV2ZWwgZXZlbnRzXG4gICAgICovXG4gICAgcHJpdmF0ZSBldmVudHM6IFN1YmplY3Q8TWVzc2FnZT47XG5cblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IFN1YmplY3Q8TWVzc2FnZT4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFN1YnNjcmliZSB0byBzcGVjaWZpYyBsaXN0ZW5lciBiYXNlZCBvbiBnaXZlbiB0b3BpYy5cbiAgICAgKlxuICAgICAqL1xuICAgIHN1YnNjcmliZSh0b3BpYzogc3RyaW5nLCBzdWJzY3JpYmVyOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvblxuICAgIHtcbiAgICAgICAgY29uc3QgdG9BbGwgPSBOb3RpZmljYXRpb25zLkFsbFRvcGljcztcblxuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihtc2cgPT4gbXNnLnRvcGljID09PSB0b3BpYyB8fCB0b3BpYyA9PT0gdG9BbGwpLFxuICAgICAgICAgICAgbWFwKChtc2c6IE1lc3NhZ2UpID0+IG1zZy5jb250ZW50KVxuXG4gICAgICAgICkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUHVibGlzaCBuZXcgZXZlbnQgdG8gYSB0b3BpY1xuICAgICAqXG4gICAgICovXG4gICAgcHVibGlzaCh0b3BpYzogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgbXNnOiBNZXNzYWdlID0ge3RvcGljOiB0b3BpYywgY29udGVudDogbWVzc2FnZX07XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobXNnKTtcblxuICAgIH1cblxufVxuXG4vKipcbiAqXG4gKiBCYXNlIGNsYXNzIGZvciBnZW5lcmljIG1lc3NhZ2VcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZVxue1xuICAgIHRvcGljOiBzdHJpbmc7XG4gICAgY29udGVudDogYW55O1xufVxuIl19