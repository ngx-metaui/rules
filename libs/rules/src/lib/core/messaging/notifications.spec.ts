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
import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {Notifications} from './notifications.service';
import {AribaCoreModule} from '..//ariba.core.module';


describe('Notifications service ', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AribaCoreModule.forRoot({
          'i18n.enabled': false,
          'env.test': true
        }),

      ]
    });
  });


  it('should broadcast message to different topics',
    inject([Notifications],
      fakeAsync((notifications: Notifications) => {

        let sysHttp: string;
        let appInitDone: string;
        let alertInactive: string;
        let appLoggedIn: string;

        notifications.subscribe('sys:http', (message: any) => sysHttp = message);
        notifications.subscribe('app:init-done', (message: any) => appInitDone = message);
        notifications.subscribe('alert:inactive',
          (message: any) => alertInactive = message);
        notifications.subscribe('app:logged', (message: any) => appLoggedIn = message);


        notifications.publish('sys:http', '404 Not Found');
        notifications.publish('app:init-done', 'Initialized!');
        notifications.publish('alert:inactive', 'User is InActive!');
        notifications.publish('app:loggedx', 'Used is signed!');
        tick();

        expect(sysHttp).toBe('404 Not Found');
        expect(appInitDone).toBe('Initialized!');
        expect(alertInactive).toBe('User is InActive!');


        // we sent this to different topic. must be undefined
        expect(appLoggedIn).toBeUndefined();
      })));


  it('should broadcast message to multiple subscribers',
    inject([Notifications],
      fakeAsync((notifications: Notifications) => {

        let sysHttp1: string;
        let sysHttp2: string;
        let sysHttp3: string;


        notifications.subscribe('sys:http', (message: any) => sysHttp1 = message);
        notifications.subscribe('sys:http', (message: any) => sysHttp2 = message);
        notifications.subscribe('sys:http', (message: any) => sysHttp3 = message);

        notifications.publish('sys:http', '404 Not Found');

        tick();

        expect(sysHttp1).toBe('404 Not Found');
        expect(sysHttp2).toBe('404 Not Found');
        expect(sysHttp2).toBe('404 Not Found');

      })));


  it('should not publish any events when subscriber unsubscribed',
    inject([Notifications],
      fakeAsync((notifications: Notifications) => {

        let sysHttp: string;


        let subscription = notifications.subscribe('sys:http', (message: any) =>
          sysHttp = message);


        subscription.unsubscribe();
        notifications.publish('sys:http', '404 Not Found');

        tick();
        expect(sysHttp).toBeUndefined();
      })));


  it('should broadcast multiple messages  so it buffers ',
    inject([Notifications],
      fakeAsync((notifications: Notifications) => {

        let sysHttp: string[] = [];


        notifications.subscribe('sys:http', (message: any) => sysHttp.push(message));


        notifications.publish('sys:http', '404 Not Found1');
        notifications.publish('sys:http', '404 Not Found1');
        notifications.publish('sys:http', '404 Not Found1');

        tick();

        expect(sysHttp.length).toBe(3);

      })));


  it('should receive all messages since we listen for AllTopic',
    inject([Notifications],
      fakeAsync((notifications: Notifications) => {

        let messages: string[] = [];


        notifications.subscribe('*', (message: any) => messages.push(message));


        notifications.publish('sys:http', '404 Not Found');
        notifications.publish('app:init-done', 'Initialized!');
        notifications.publish('alert:inactive', 'User is InActive!');
        notifications.publish('app:loggedx', 'Used is signed!');

        tick();

        expect(messages.length).toBe(4);

      })));


});

