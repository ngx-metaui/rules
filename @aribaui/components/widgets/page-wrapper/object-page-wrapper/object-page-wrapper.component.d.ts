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
import { ElementRef, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { Environment } from '@aribaui/core';
import { ComponentRegistry } from '../../../core/component-registry.service';
import { PageWrapper } from '../page-wrapper';
import { PageNotification } from '../../page-notification/page-notification.component';
import { PageLifeCycleService } from '../page-lifecycle.service';
/**
 *
 * Object Page Wrapper Component renders any object instance in detail. It has a uniform layout,
 * Header, Page title, Page notification, actions, content, and Footer.
 *
 *
 *  Usage:
 *
 *  @Component({
 *    selector: 'RFXPage' ,
 *    template: `
 *       <aw-object-page-wrapper
 *                        [title]="rfxEntity.headerInfo.title"
 *                        [objectType]="rfxEntity.headerInfo.eventTypeString"
 *                        [notification]="pageNotification">
 *
 *
 *           <aw-page-actions>
 *               <aw-button [type]="'submit'" [name]="'edit'" [value]="edit" [style]="'primary'">
 *                   Edit
 *                </aw-button>
 *               <aw-button [type]="'button'" [name]="'cancel'" [value]="cancel"
 *                                                         [style]="'secondary'">
 *                  Cancel
 *               </aw-button>
 *           </aw-page-actions>
 *
 *           <aw-page-content>
 *             <aw-section title="Sourcing request info" (onStateChanged)="onStateChange($event)">
 *
 *                   <m-context [object]="rfxEntity.headerInfo"
 *                              [operation]="this.editabilityState.headerInfoOp"
 *                              layout="Inspect"
 *                              uiGroup="HeaderGeneral"
 *                   >
 *                       <m-include-component></m-include-component>
 *                   </m-context>
 *
 *             </aw-section>
 *           </aw-page-content>
 *       </aw-object-page-wrapper>
 *    `
 *    })
 *    export class RFXPage
 *    {
 *       // To keep track what section is editable and which read only
 *       editabilityState: EditabilityState;
 *
 *       // Current RFX event
 *       rfxEntity: RfxEventEntity;
 *
 *       // Notifications
 *       notification: PageNotification = new PageNotification("warn",
 *                              "Policy Warning", "This request requires 3 bids.");
 *
 *        constructor ()
 *        {
 *        }
 *
 *    }
 */
export declare class ObjectPageWrapperComponent extends PageWrapper implements OnDestroy {
    protected element: ElementRef;
    env: Environment;
    /**
     * The title of this page
     */
    title: string;
    /**
     * The type of the object being rendered - Event, Workspace, contract, etc.
     */
    objectType: string;
    /**
     * label for the object status.
     */
    objectStatusLabel: string;
    /**
     * This object's status. For example, draft, pending selection,
     */
    objectStatus: string;
    /**
     * Optional. Some object has states. For example: RFxObject has Resolve, Review, Get Quote.
     * Object states will appear on the page when they are present.
     */
    objectStates: string[];
    /**
     * When Stepper is used this identifies current set state
     */
    currentState: string;
    /**
     * Header is a component type to be rendered as a page Header.
     *
     * The 'default' value is the component/widget/HeaderComponent
     */
    header: any;
    /**
     * Set true if page should not include any header. Need to set to true even no header
     * object is passed in. Otherwise, a default Header component will be added.
     */
    hideHeader: boolean;
    /**
     * Footer Component is the page footer.
     * can be overriden but the default value is compoenent/widget/FooterComponent.
     */
    footer: any;
    /**
     * Set true if page should not include any footer. Need to set to true even no footer
     * object is passed in. Otherwise, a default Footer component will be added.
     */
    hideFooter: boolean;
    /**
     * The positioning of the page actions (page buttons)
     *   'top' :    page buttons are placed at the top of the page, below the title, to the right.
     *   'bottom' : page buttons are placed at the bottom of the page, above the footer.
     *   'both'   : page buttons are placed at both top and bottom.
     *
     */
    pageActionPosition: string;
    /**
     * This flag is driven by pageActionPosition. The default position is top.
     * Value is true for both 'top' and 'both' of pageActionPosition.
     */
    hasTopPageActions: boolean;
    /**
     * This flag is driven by pageAction position.
     * Value is true for both 'bottom' and 'both' of pageActionPosition.
     */
    hasBottomPageActions: boolean;
    /**
     * Queries a p template if any
     */
    actionsTemplate: TemplateRef<any>;
    /**
     * Any Success, Info, Error, or Warn for this page.
     */
    notifications: PageNotification[];
    objectStateIndex: number;
    constructor(element: ElementRef, env: Environment, componentRegistry: ComponentRegistry, pageLifecycleService: PageLifeCycleService);
    /**
     * Generate a unique Id for this object.
     *
     */
    generatePageId(): string;
    /**
     * Does my page have page notification?
     *
     */
    hasNotifications(): boolean;
    hasObjectStates(): boolean;
    /**
     * Initialize my local components
     */
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
