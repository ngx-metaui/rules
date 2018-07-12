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
import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
/**
 * Button component that implements consistent styling, behavior. Button can be rendered either as
 * a button or as a link. It could be standalone or be part of a form.
 *
 *  ### Example
 *  ```
 *
 *  @Component({
 *    selector: 'registration' ,
 *    template: `
 *
 *   <aw-form-table >
 *       <aw-form-row [label]="'Amount'" [name]="'amount'" [size]="'small'">
 *
 *           <aw-button [type]="'submit'" [name]="'button'"
 *                     (action)="onClicked($event)" [value]="command"
 *                     [style]="'warning'" >Button</aw-button>
 *       </aw-form-row>
 *   </aw-form-table>
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
 *        onClicked(value:string) {
 *           if (value) {
 *              // submit form.
 *           }
 *        }
 *    }
 */
export declare class ButtonComponent extends BaseComponent implements AfterViewInit {
    protected element: ElementRef;
    env: Environment;
    /**
     * Button types  [ button | submit | reset ]
     *
     */
    type: string;
    /**
     * Name for this button. Can be used to lookup component in form.
     */
    name: string;
    /**
     * styling for this button. See ButtonStyle for all supported styles.
     */
    style: ButtonStyle;
    /**
     * sizing for this button. [large, normal, small].
     */
    size: ButtonSize;
    /**
     * Specify the target of the button. [_blank | _self | _parent | _top | framename ]
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
     * PrimeNg button simply does not support content so we need to get around it
     */
    label: string;
    /**
     * Internal CSS class that styles this button based on input 'style' and 'size'
     */
    buttonClass: string;
    constructor(element: ElementRef, env: Environment);
    ngOnInit(): void;
    /**
     * This is little hacky hackity hack as currently primeng button directive does not work with
     * ngcontent projection but it has a label bindings, which is not the way developers work with
     * button. you want to
     *
     * <button> MY CONTENT</button instead of <button label='MyContent'></button>
     *
     *
     * @Todo: Change this until the time keep a test that check that they are still using ui-button
     *     that we are expecting and replacing
     */
    ngAfterViewInit(): void;
    /**
     *  Action clicked. Call parent action.
     */
    clicked($event: any): void;
}
/**
 * Supported Button Style
 */
export declare type ButtonStyle = 'info' | 'primary' | 'secondary' | 'warning' | 'success' | 'danger' | 'link';
/**
 * Supported Button Size
 */
export declare type ButtonSize = 'large' | 'normal' | 'small';
