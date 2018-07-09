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
import {Environment} from '@aribaui/core';
import {ComponentRegistry} from '../../core/component-registry.service';
import {PageLifeCycleService} from './page-lifecycle.service';
import {BaseComponent} from '../../core/base.component';

/**
 * Represents the different page types in an application.
 */
export enum PageType {
    Init,         // Init Page type
    Login,        // Login Page
    Object,       // Object detail page
    List,         // List Page
    MasterDetail, // MasterDetail
    Dashboard,    // Dashboard page
    Modal         // Modal page, it can be configured to be a popup, or standalone page.
}

/** Placeholder now. The Error Manager handles all the errors on the page.
 *  It is initialized for every page. Page errors, warning, info goes through
 *  the error Manager and the result message is displayed on the page notification area.
 */
export class ErrorManager
{

}

/**
 *  Page wrapper is the base class for all pages. The idea is that there are different page types
 *  in an Application. A List Page renders a list of objects, ex: customers, requests, PO.  And
 *  a object page will render one object in detail.
 *
 *  They share common attributes such as page type and page id.
 *
 *  Ariba Page have a life cycle. When page starts up, it's initialized. And when the page is
 *  destroyed, it'll be complete.
 */
export abstract class PageWrapper extends BaseComponent
{
    /**
     * What type of page this is.
     *
     */
    protected pageType: PageType = PageType.Init;

    /**
     * Page Id. Used when pages are stored in map.
     */
    id: string;

    /**
     * Handling all the error on a page.
     */
    public errorManager: ErrorManager;

    /**
     * Indicate that this page wrapper has been wrapped by another page wrapper.
     * In this case, we wouldn't display header and footer and other page wrapper components
     */
    alreadyInPageWrapper: boolean;


    constructor(public env: Environment, pageType: PageType,
                protected componentRegistry: ComponentRegistry,
                protected pageLifecycleService: PageLifeCycleService)
    {
        super(env);
        this.pageType = pageType;
    }

    /**
     * All subclass needs to generated a page identifier.
     * It follows the following pattern:
     *    type_title_id
     *
     *    RFQ_SourcingRequest_123
     */
    abstract generatePageId(): string;

    /**
     * Get the unique Id for this page.
     *
     */
    public getId(): string
    {
        if (this.id) {
            return this.id;
        }

        this.id = this.generatePageId();
    }

}


