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
import { ElementRef } from '@angular/core';
import { Environment } from '@aribaui/core';
import { PageMenuItem } from '../page-header/page-header.component';
import { BaseComponent } from '../../../core/base.component';
/**
 *  This is a temporary implementation for the page header component.
 *  When the real implementation of side menu is done, PageHeaderComponent will
 *  be swaped to use it.
 *
 */
export declare class SidenavComponent extends BaseComponent {
    protected element: ElementRef;
    env: Environment;
    /**
     * list of menu items
     */
    items: PageMenuItem[];
    /**
     * displays the back link that navigates user to the previous page when clicked.
     */
    show: boolean;
    constructor(element: ElementRef, env: Environment);
    getSidenavClass(): string;
    open(): void;
    close(): void;
    toggle(): void;
}
