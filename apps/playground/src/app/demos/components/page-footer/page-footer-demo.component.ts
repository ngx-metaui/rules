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
import {Component} from '@angular/core';
import {BaseComponent, Environment} from '@ngx-metaui/rules';


@Component({
  templateUrl: './page-footer-demo.component.html',
  styleUrls: ['./page-footer-demo.component.scss']
})
export class PageFooterDemoComponent extends BaseComponent {

  last_visited: any;

  constructor(public env: Environment) {
    super(env);
    let d = new Date();
    d.setDate(d.getDate() - 1);

    this.last_visited = d;
  }


  ngOnInit(): void {
    super.ngOnInit();
  }
}
