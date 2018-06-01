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
import {Component, Input} from '@angular/core';
import {BaseComponent} from '@aribaui/components';
import {Environment, isPresent} from '@aribaui/core';
import {ActivatedRoute} from '@angular/router';
import {UIMeta} from '../../core/uimeta';


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
@Component({
    selector: 'm-home-page',
    templateUrl: 'meta-home.page.component.html',
    styleUrls: ['meta-home.page.component.scss']
})
export class MetaHomePageComponent extends BaseComponent
{

    @Input()
    module: string;

    constructor(public env: Environment, private activatedRoute: ActivatedRoute)
    {
        super(env);
    }


    /**
     *
     * This page is triggered by router and we expect a module to be passed in by routing
     * params
     *
     */
    ngOnInit(): void
    {
        super.ngOnInit();

        let routeParams = this.activatedRoute.snapshot.params;
        if (isPresent(routeParams) && isPresent(routeParams[UIMeta.KeyModule])) {
            this.module = routeParams[UIMeta.KeyModule];
        }
    }

    hasModule(): boolean
    {
        return isPresent(this.module);
    }
}
