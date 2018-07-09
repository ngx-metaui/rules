/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
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
@Injectable()
export class Notifications
{

    /**
     * When this is used as a topic subscriber receives all messages
     *
     */
    static readonly AllTopics = '*';

    /**
     * Observable used to publish and subscribe to application level events
     */
    private events: Subject<Message>;


    constructor()
    {
        this.events = new Subject<Message>();
    }

    /**
     *
     * Subscribe to specific listener based on given topic.
     *
     */
    subscribe(topic: string, subscriber: (value: any) => void): Subscription
    {
        const toAll = Notifications.AllTopics;

        return this.events.pipe(
            filter(msg => msg.topic === topic || topic === toAll),
            map((msg: Message) => msg.content)

        ).subscribe(subscriber);
    }

    /**
     *
     * Publish new event to a topic
     *
     */
    publish(topic: string, message: any): void
    {
        let msg: Message = {topic: topic, content: message};
        this.events.next(msg);

    }

}

/**
 *
 * Base class for generic message
 *
 */
export interface Message
{
    topic: string;
    content: any;
}
