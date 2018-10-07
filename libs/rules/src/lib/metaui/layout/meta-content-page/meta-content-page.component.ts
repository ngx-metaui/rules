/**
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooleanWrapper, isPresent} from '../../../core/utils/lang';
import {RoutingService} from '../../../core/routing/routing.service';
import {UIMeta} from '../../core/uimeta';


/**
 * MetaContentPage  component is used from MetaRules and universal component rendering different
 * operation modes.
 *
 *
 */
@Component({
  selector: 'm-content-page',
  templateUrl: 'meta-content-page.component.html',
  styleUrls: ['meta-content-page.component.scss']
})
export class MetaContentPageComponent implements OnInit {

  object: any;
  operation: string;
  layout: string;
  newContext: boolean = true;
  objectName: string;
  isInspectAction: boolean = false;

  okLabel = 'Back';

  constructor(private route: ActivatedRoute, private routingService: RoutingService) {
  }

  ngOnInit() {
    this.layout = this.route.snapshot.params['layout'];
    this.operation = this.route.snapshot.params['operation'];

    let url = '/' + this.route.snapshot.url[0].toString();
    if (this.routingService.stateCacheHistory.has(url)) {
      this.object = this.routingService.stateCacheHistory.get(url);
      this.objectName = UIMeta.defaultLabelForIdentifier(this.object.constructor.name);
    }
    let withBackAction = this.route.snapshot.params['b'];
    if (isPresent(withBackAction) && BooleanWrapper.isTrue(withBackAction)) {
      this.isInspectAction = true;
    }

  }


  onBack(event: any): void {
    this.routingService.goBack();
  }

}
