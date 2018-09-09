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
import { EventEmitter } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { Environment } from '@aribaui/core';
/**
 * Hyperlink component that implements consistent styling, behavior. Hyperlink supports all of the
 * native link functionality. In addition, it supports navigation to components through the action
 * binding.
 *
 *
 * for more info please see class Doc of the:
 *  @see {@link button/button.component.ts}
 *
 *  ### Example
 *  ```
 *
 *  @Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *           <aw-hyperlink  [type]="'text/html'" [name]="'link'"
 *                        (action)="onClicked($event)" [value]="customerId"
 *                        [size]="'large'" >my link</aw-hyperlink>
 *
 *    `
 *    })
 *    export class MyComponent
 *    {
 *        command:boolean;
 *
 *        constructor ()
 *        {
 *        }
 *
 *        onClicked(customerId:string) {
 *           if (customerId) {
 *              // display customer details component.
 *           }
 *        }
 *    }
 */
export declare class HyperlinkComponent extends BaseComponent {
    env: Environment;
    /**
     *    Specifies the media type of the linked document. Mime type
     *    ex: [text/html | text/csv | image/png | audio/3gpp | ....]
     */
    type: string;
    /**
     * url for this hyperlink. Can be used to navigate to a component.
     */
    href: string;
    /**
     * rel for this hyperlink. Specify the relationship of the current document and linked document
     */
    rel: string;
    /**
     * sizing for this link. [large, normal, small].
     */
    size: LinkSize;
    /**
     * Specify the target of the hyperlink. [_blank | _self | _parent | _top | framename ]
     */
    target: string;
    /**
     * Value to be send to server when clicked.
     */
    value: string;
    /**
     * Event fired when user select a item
     */
    action: EventEmitter<any>;
    /**
     * Internal CSS class that styles this hyperlink based on input 'size'
     */
    linkClass: string;
    constructor(env: Environment);
    ngOnInit(): void;
    /**
     *  Action clicked. Call parent action.
     */
    clicked(event: any): void;
}
/**
 * Supported Link Size
 */
export declare type LinkSize = 'large' | 'normal' | 'small';
