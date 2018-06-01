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
 * Page content is a wrapper for page content.
 * Currently, it's pretty bare, but as we add more interactions on the page, like a side bar,
 * the page content area will likely get affected.
 */
@Component({
    selector: 'aw-page-content',
    template: '<ng-content></ng-content>',
    styles: [':host {width: 100%; padding: 0 .5em;}']
})
export class PageContentComponent extends BaseComponent
{

    constructor(protected element: ElementRef, public env: Environment)
    {
        super(env);
    }
}
