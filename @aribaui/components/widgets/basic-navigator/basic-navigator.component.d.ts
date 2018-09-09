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
import { EventEmitter, TemplateRef } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { AppConfig, Environment } from '@aribaui/core';
/**
 *
 * basic navigation bar provide a main action buttons for its content (page level buttons).
 * This is not the Top level application navigation. This component provides by default action OK,
 * CANCEL and you are free to modify how the OK or CANCEL will be call as well as subscribe to the
 * event. Or you can provide your own buttons template which will be used instead of this default
 * one.
 *
 *
 *
 *
 *
 * ### Example 1:
 *
 * In order to use navigation bar in its basic usage you can do following:
 * this will render buttons on the top as well as on the bottom around the content.
 *
 *
 *  ```html
 *
 *      <aw-basic-navigator [brandImg]="'img/aribalogobal.png'">
 *
 *            <div class="container">
 *                <form>
 *                    User name: <input type=text value="peter.pan">
 *                </<form>>
 *            </div>
 *      </aw-basic-navigator>
 *
 *
 * ```
 *
 *  if you do not want button on the top or bottom you can say thi using binding showTop or
 * showBottom.
 *
 *
 * ### Example 2:
 *  In this example we are providing custom buttons as well as brank section
 *
 *
 *  ```html
 *
 *
 *      <aw-basic-navigator [brandImg]="'img/aribalogobal.png'">
 *            <ng-template #buttons>
 *                <ul class="nav navbar-nav float-md-right collapse navbar-toggleable-xs">
 *                    <li class="nav-item ">
 *                        <button class="btn btn-secondary" type="button"
 * (click)="onSaveAction($evemt)">Cancel</button>
 *                    </li>
 *                    <li class="nav-item active">
 *                        <button class="btn btn-primary" type="button"
 * (click)="onCancelAction($event)"> Save
 *                        </button>
 *                    </li>
 *                </ul>
 *            </ng-template>
 *
 *            <ng-template #brand>
 *                <span class="brand-title">Ariba</span>
 *            </ng-template>
 *
 *
 *            <div class="container">
 *                <form>
 *                    User name: <input type=text value="peter.pan">
 *                </<form>>
 *            </div>
 *      </aw-basic-navigator>
 *
 *
 * ```

 *
 */
export declare class BasicNavigatorComponent extends BaseComponent {
    /**
     * Indicates that buttons will be rendered on the top
     *
     * Default value is TRUE
     *
     */
    showTop: boolean;
    /**
     * Indicates that buttons will be rendered on the bottom
     *
     * Default value is TRUE
     *
     */
    showBottom: boolean;
    /**
     * Indicates that brand section that is on the left side and only in the top bar is visible
     *
     * Default value is TRUE
     *
     */
    showBrand: boolean;
    /**
     * Relative path to a image. Images are saved inside assets folder.
     *
     */
    brandImg: string;
    /**
     * If you are not using custom buttons you can pass a label to OK action
     *
     * Default value is OK
     */
    okActionLabel: string;
    /**
     * If you are not using custom buttons you can pass a label to Cancel action
     *
     * Default value is OK
     */
    cancelActionLabel: string;
    /**
     * Context is an object which is rendered inside nav-bar content. Sometimes there are situation
     * that you want to render some information from the object inside navigation bar. So you are
     * free to pass a context object and then access it inside your template
     *
     * ```HTML
     *            <ng-template #brand let-item>
     *                <span class="brand-title">{{item.firstName}}</span>
     *            </ng-template>
     *
     * ```
     */
    context: any;
    showCancelButton: boolean;
    /**
     *
     * EventEmitter that is triggered when you click on default OK Action
     *
     */
    onOKAction: EventEmitter<any>;
    /**
     *
     * EventEmitter that is triggered when you click on default CANCEL Action
     *
     */
    onCancelAction: EventEmitter<any>;
    /**
     * Queries a buttons template if any
     */
    buttonsTemplate: TemplateRef<any>;
    /**
     * Queries a brand template if any
     */
    brandTemplate: TemplateRef<any>;
    constructor(env: Environment, appConfig: AppConfig);
    ngOnInit(): void;
    /**
     * Returns if buttonsTemplate is available
     *
     */
    hasButtonTemplate(): boolean;
    /**
     * Returns if brandTemplate is available
     *
     */
    hasBrandTemplate(): boolean;
}
