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
import {
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnDestroy,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import {Environment, isPresent} from '@aribaui/core';
import {ComponentRegistry} from '../../../core/component-registry.service';
import {PageType, PageWrapper} from '../page-wrapper';
import {PageNotification} from '../../page-notification/page-notification.component';
import {PageLifeCycleService} from '../page-lifecycle.service';
import {PageHeaderComponent} from '../page-header/page-header.component';
import {PageFooterComponent} from '../page-footer/page-footer.component';

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
@Component({
    selector: 'aw-object-page-wrapper',
    templateUrl: 'object-page-wrapper.component.html',
    styleUrls: ['object-page-wrapper.component.scss']
})
export class ObjectPageWrapperComponent extends PageWrapper implements OnDestroy
{

    /**
     * The title of this page
     */
    @Input()
    title: string;

    /**
     * The type of the object being rendered - Event, Workspace, contract, etc.
     */
    @Input()
    objectType: string;

    /**
     * label for the object status.
     */
    @Input()
    objectStatusLabel: string;

    /**
     * This object's status. For example, draft, pending selection,
     */
    @Input()
    objectStatus: string;

    /**
     * Optional. Some object has states. For example: RFxObject has Resolve, Review, Get Quote.
     * Object states will appear on the page when they are present.
     */
    @Input()
    objectStates: string[];


    /**
     * When Stepper is used this identifies current set state
     */
    @Input()
    currentState: string;


    /**
     * Header is a component type to be rendered as a page Header.
     *
     * The 'default' value is the component/widget/HeaderComponent
     */
    @Input()
    header: any;

    /**
     * Set true if page should not include any header. Need to set to true even no header
     * object is passed in. Otherwise, a default Header component will be added.
     */
    @Input()
    hideHeader: boolean = false;

    /**
     * Footer Component is the page footer.
     * can be overriden but the default value is compoenent/widget/FooterComponent.
     */
    @Input()
    footer: any;

    /**
     * Set true if page should not include any footer. Need to set to true even no footer
     * object is passed in. Otherwise, a default Footer component will be added.
     */
    @Input()
    hideFooter: boolean = false;

    /**
     * The positioning of the page actions (page buttons)
     *   'top' :    page buttons are placed at the top of the page, below the title, to the right.
     *   'bottom' : page buttons are placed at the bottom of the page, above the footer.
     *   'both'   : page buttons are placed at both top and bottom.
     *
     * @type {string}
     */
    @Input()
    pageActionPosition: string = 'top';


    /**
     * This flag is driven by pageActionPosition. The default position is top.
     * Value is true for both 'top' and 'both' of pageActionPosition.
     */
    hasTopPageActions: boolean = true;

    /**
     * This flag is driven by pageAction position.
     * Value is true for both 'bottom' and 'both' of pageActionPosition.
     */
    hasBottomPageActions: boolean;


    /**
     * Queries a p template if any
     */
    @ContentChild('pageActions')
    actionsTemplate: TemplateRef<any>;

    /**
     * Any Success, Info, Error, or Warn for this page.
     */
    @Input()
    notifications: PageNotification[];


    objectStateIndex: number = 0;

    constructor(protected element: ElementRef, public env: Environment,
                componentRegistry: ComponentRegistry, pageLifecycleService: PageLifeCycleService)
    {
        super(env, PageType.Object, componentRegistry, pageLifecycleService);

        // Setting Default header component
        this.header = PageHeaderComponent;
        this.footer = PageFooterComponent;
    }

    /**
     * Generate a unique Id for this object.
     *
     * @returns {string}
     */
    generatePageId(): string
    {
        return this.objectType + '_' + this.title + (this.id) ? ('_' + this.id) : '';
    }

    /**
     * Does my page have page notification?
     *
     * @returns {boolean}
     */
    hasNotifications(): boolean
    {
        return (this.notifications && this.notifications.length > 0);
    }

    hasObjectStates(): boolean
    {
        return isPresent(this.objectStates);
    }

    /**
     * Initialize my local components
     */
    ngOnInit()
    {
        super.ngOnInit();

        // New Component types that are used in c-include-component
        if (this.header) {
            this.componentRegistry.registerType(this.header.name, this.header);
        }

        // New Component types that are used in c-include-component
        if (this.footer) {
            this.componentRegistry.registerType(this.footer.name, this.footer);
        }

        /** notify subscribers of the page lifecycle service  */
        this.pageLifecycleService.onPageInit(this.title);

        // Setting the page action position.
        if (this.pageActionPosition === 'bottom') {
            this.hasTopPageActions = false;
            this.hasBottomPageActions = true;

        } else if (this.pageActionPosition === 'both') {

            this.hasTopPageActions = true;
            this.hasBottomPageActions = true;
        }

        if (isPresent(this.objectStates) && this.objectStates.length > 1
            && isPresent(this.currentState)) {

            this.objectStateIndex = this.objectStates.indexOf(this.currentState);
        }
    }


    ngOnChanges(changes: SimpleChanges): void
    {
        super.ngOnChanges(changes);

        if (isPresent(changes['currentState']) &&
            changes['currentState'].currentValue !== changes['currentState'].previousValue) {
            // we dont need to check if objectStates exists
            this.objectStateIndex = this.objectStates.indexOf(this.currentState);
        }

    }

    ngOnDestroy()
    {
        this.pageLifecycleService.onPageDestroy(this.title);
    }
}
