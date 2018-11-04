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
import {Subject} from 'rxjs';
import {PageDestroyed, PageEvent, PageInitialized} from './page-events';

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
@Injectable()
export class PageLifeCycleService {

  /**
   * Page event queue when all page lifecycle events: init, destroy are emitted.
   * Listeners can subscribe to these events.
   */
  public pageEvents: Subject<PageEvent> = new Subject<PageEvent>();

  /**
   *
   */
  constructor() {

  }

  /**
   * Called when page is initialized.
   */
  public onPageInit(pageTitle: string): void {
    this.pageEvents.next(new PageInitialized(pageTitle));
  }

  /**
   * Call when page has been destroyed
   */
  public onPageDestroy(pageTitle: string): void {
    this.pageEvents.next(new PageDestroyed(pageTitle));
  }
}

