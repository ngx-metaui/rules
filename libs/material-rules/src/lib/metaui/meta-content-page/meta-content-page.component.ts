/**
 * @license
 * F. Kolar
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoutingService} from '@ngx-metaui/rules';


/**
 * Simple implementation for rendering nested objects
 *
 *
 */
@Component({
  selector: 'm-content-page',
  templateUrl: 'meta-content-page.component.html',
  styleUrls: ['meta-content-page.component.scss']
})
export class MetaContentPageComponent implements OnInit, OnDestroy {

  object: any;
  operation: string;
  layout: string;
  newContext: boolean = true;

  /**
   * Rendered object detail can have a section label
   */
  label: string;

  constructor(private route: ActivatedRoute,
              private routingService: RoutingService) {
  }

  ngOnInit() {
    this.layout = this.route.snapshot.params['layout'];
    this.operation = this.route.snapshot.params['operation'];
    this.object = this.route.snapshot.data['object'] || null;

    if (this.object) {
      this.label = this.object.constructor.name;
    }


    this.routingService.appRouting.next([
      {
        action: this.onBack,
        label: '',
        icon: 'keyboard_arrow_left',
        showBefore: true,
        executionContext: this
      }
    ]);
  }


  onBack(event: any): void {
    this.routingService.goBack();
  }

  ngOnDestroy(): void {
    this.routingService.appRouting.next(null);
  }


}
