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
import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../core';
import {Environment} from '@aribaui/core';


/**
 * Renders a Toggle Switch
 *
 * ### Example
 *
 * ```typescript
 *
 *      @Component({
 *          selector: 'myToggleSection' ,
 *          template: '<aw-toggle [model]="inputValue" [labelText]="labelText" >
 *              </aw-toggle>'
 *      })
 *      export class MyNoteComponent
 *      {
 *          inputValue: boolean = false;
 *          labelText: string = 'my label';
 *      }
 *
 * ```
 */

@Component({
    selector: 'aw-toggle',
    templateUrl: './toggle-switch.component.html',
    styleUrls: ['./toggle-switch.component.scss']
})

export class ToggleSwitchComponent extends BaseComponent
{
    /**
     * toggle model
     */
    @Input() model: boolean = false;
    /**
     * label text
     */
    @Input() labelText: string;

    constructor(public env: Environment)
    {
        super(env);
    }

    /**
     * click handler for toggle
     */
    changeHandler()
    {
        this.model = !this.model;
    }
}


