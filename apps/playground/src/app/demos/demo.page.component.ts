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
 */
import {Component, OnInit} from '@angular/core';
import {BaseComponent, Environment, RoutingService} from '@ngx-meta/rules';


@Component({
  templateUrl: './demo.page.component.html',
  styleUrls: ['./demo.page.component.scss']
})
export class DemoPageComponent extends BaseComponent implements OnInit {


  constructor(public env: Environment, public routerS: RoutingService) {
    super(env);

  }


  ngOnInit() {


  }

}
