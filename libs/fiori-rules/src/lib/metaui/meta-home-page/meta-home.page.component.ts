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
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent, Environment, KeyModule} from '@ngx-metaui/rules';

/* tslint:disable */
/**
 * Default homePage implementation for a Module. Just like on the example bellow when we define a
 * module without a homePage this MetaHomePageComponent will be used.
 *
 * ```
 *
 *   @module=Home {
 *       label:"My Home";
 *       pageTitle:"You are now on Homepage";
 *
 *       @layout=Today {
 *          after:zTop;
 *          label: "Sales Graph";
 *          component:SalesGraphComponent;
 *     }
 *  }
 *
 * ```
 * Or you can decide not to use this MetaHomePage and Provide your own e.g:
 *
 * ```
 *  @module=Products {
 *      label:"Products for Somethig";
 *      pageTitle:"You are now on Products";
 *      homePage:ProductContentComponent;
 *  }
 *
 * ```
 *
 *
 */

/* tslint:enable */
@Component({
  selector: 'm-home-page',
  template: `
      <ng-template [ngIf]="module">
          <m-context [module]="module">
              <m-include-component></m-include-component>
          </m-context>
      </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MetaHomePageComponent extends BaseComponent {

  @Input()
  module: string;

  constructor(public env: Environment, private activatedRoute: ActivatedRoute,
              private _cd: ChangeDetectorRef) {
    super(env);
  }


  /**
   *
   * This page is triggered by router and we expect a module to be passed in by routing
   * params
   *
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params[KeyModule]) {
        this.module = params[KeyModule];
        this._cd.markForCheck();
      }
    });

  }

}
