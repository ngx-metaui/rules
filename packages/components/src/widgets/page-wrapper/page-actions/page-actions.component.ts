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
import {Component, ElementRef} from '@angular/core';
import {Environment} from '@aribaui/core';
import {BaseComponent} from '../../../core/base.component';

/**
 * Page actions is a wrapper for all page actions, buttons, links, menus that interacts it with the
 * page. The wrapper use the ability to position it as needed.
 */
@Component({
    selector: 'aw-page-actions',
    templateUrl: 'page-actions.component.html',
    styleUrls: ['page-actions.component.scss']
})
export class PageActionsComponent extends BaseComponent
{

    constructor(protected element: ElementRef, public env: Environment)
    {
        super(env);
    }
}
