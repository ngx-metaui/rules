import { Subscription } from 'rxjs';
/**
 * Notifications service is a implementation of the publish/subscribe event bus for publishing
 * and listening for application level events.
 *
 * To subscribe to specific event e.g. User Logged In where topic is called user:signedIn
 *
 *
 * ```ts
 *
 *     @Component({
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
export declare class Notifications {
    /**
     * When this is used as a topic subscriber receives all messages
     *
     */
    static readonly AllTopics: string;
    /**
     * Observable used to publish and subscribe to application level events
     */
    private events;
    constructor();
    /**
     *
     * Subscribe to specific listener based on given topic.
     *
     */
    subscribe(topic: string, subscriber: (value: any) => void): Subscription;
    /**
     *
     * Publish new event to a topic
     *
     */
    publish(topic: string, message: any): void;
}
/**
 *
 * Base class for generic message
 *
 */
export interface Message {
    topic: string;
    content: any;
}
