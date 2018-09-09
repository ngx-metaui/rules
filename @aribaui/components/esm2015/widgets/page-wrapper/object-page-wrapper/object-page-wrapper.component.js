/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, ElementRef, Input, TemplateRef } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { ComponentRegistry } from '../../../core/component-registry.service';
import { PageType, PageWrapper } from '../page-wrapper';
import { PageLifeCycleService } from '../page-lifecycle.service';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { PageFooterComponent } from '../page-footer/page-footer.component';
/**
 *
 * Object Page Wrapper Component renders any object instance in detail. It has a uniform layout,
 * Header, Page title, Page notification, actions, content, and Footer.
 *
 *
 *  Usage:
 *
 * \@Component({
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
export class ObjectPageWrapperComponent extends PageWrapper {
    /**
     * @param {?} element
     * @param {?} env
     * @param {?} componentRegistry
     * @param {?} pageLifecycleService
     */
    constructor(element, env, componentRegistry, pageLifecycleService) {
        super(env, PageType.Object, componentRegistry, pageLifecycleService);
        this.element = element;
        this.env = env;
        /**
         * Set true if page should not include any header. Need to set to true even no header
         * object is passed in. Otherwise, a default Header component will be added.
         */
        this.hideHeader = false;
        /**
         * Set true if page should not include any footer. Need to set to true even no footer
         * object is passed in. Otherwise, a default Footer component will be added.
         */
        this.hideFooter = false;
        /**
         * The positioning of the page actions (page buttons)
         *   'top' :    page buttons are placed at the top of the page, below the title, to the right.
         *   'bottom' : page buttons are placed at the bottom of the page, above the footer.
         *   'both'   : page buttons are placed at both top and bottom.
         *
         */
        this.pageActionPosition = 'top';
        /**
         * This flag is driven by pageActionPosition. The default position is top.
         * Value is true for both 'top' and 'both' of pageActionPosition.
         */
        this.hasTopPageActions = true;
        this.objectStateIndex = 0;
        // Setting Default header component
        this.header = PageHeaderComponent;
        this.footer = PageFooterComponent;
    }
    /**
     * Generate a unique Id for this object.
     *
     * @return {?}
     */
    generatePageId() {
        return this.objectType + '_' + this.title + (this.id) ? ('_' + this.id) : '';
    }
    /**
     * Does my page have page notification?
     *
     * @return {?}
     */
    hasNotifications() {
        return (this.notifications && this.notifications.length > 0);
    }
    /**
     * @return {?}
     */
    hasObjectStates() {
        return isPresent(this.objectStates);
    }
    /**
     * Initialize my local components
     * @return {?}
     */
    ngOnInit() {
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
        }
        else if (this.pageActionPosition === 'both') {
            this.hasTopPageActions = true;
            this.hasBottomPageActions = true;
        }
        if (isPresent(this.objectStates) && this.objectStates.length > 1
            && isPresent(this.currentState)) {
            this.objectStateIndex = this.objectStates.indexOf(this.currentState);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (isPresent(changes['currentState']) &&
            changes['currentState'].currentValue !== changes['currentState'].previousValue) {
            // we dont need to check if objectStates exists
            this.objectStateIndex = this.objectStates.indexOf(this.currentState);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.pageLifecycleService.onPageDestroy(this.title);
    }
}
ObjectPageWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-object-page-wrapper',
                template: "<div class=\"page-wrapper\">\n    <ng-template [ngIf]=\"!hideHeader\">\n        <aw-include-component [name]='header.name'></aw-include-component>\n    </ng-template>\n\n    <div class=\"arc-object-detail\">\n\n        <div class=\"ui-g\">\n\n            <!-- page header -->\n            <div class=\"ui-g-12 page-title\">\n\n                <!-- page title -->\n                <div class=\"ui-g-8 ui-md-8 page-title-text\">{{title}}</div>\n\n                <div class=\"ui-g-4 ui-md-4 page-status\">\n                    <span class=\"object-status-label\">{{objectStatusLabel}} &nbsp;</span>\n                    <span class=\"object-status\">{{objectStatus}}</span>\n                </div>\n            </div>\n\n            <!-- page actions -->\n            <div class=\"ui-g-12 page-actions\" *ngIf=\"hasTopPageActions\">\n                <ng-template [embeddedItem]=\"actionsTemplate\"\n                             *ngIf=\"hasTopPageActions\"></ng-template>\n            </div>\n\n            <!-- object states  displays only if state exists. -->\n            <div class=\"ui-g-12 page-state\">\n                <div class=\"ui-g-3 page-state-left\" [class.content]=\"hasObjectStates()\">\n                    <ng-content select=\".page-state-left\"></ng-content>\n                </div>\n                <div class=\"ui-g-6 page-state-center\">\n                    <ng-container *ngIf=\"hasObjectStates()\">\n                        <aw-stepper [steps]=\"objectStates\"\n                                    [currentStep]=\"objectStateIndex\"></aw-stepper>\n                    </ng-container>\n                </div>\n                <div class=\"ui-g-3 page-state-right\">\n                    <ng-content select=\".page-state-right\"></ng-content>\n                </div>\n            </div>\n\n\n            <!-- Page Notification -->\n            <ng-template [ngIf]=\"hasNotifications()\">\n                <div class=\"ui-g-12 u-nopadding\">\n\n                    <aw-page-notification *ngFor=\"let notification of notifications\"\n                                          [notification]=\"notification\"></aw-page-notification>\n                </div>\n            </ng-template>\n\n            <!-- additional content -->\n            <ng-content select=\"aw-page-content\"></ng-content>\n\n        </div>\n\n    </div>\n\n    <!-- page actions -->\n    <div class=\"ui-g-12 page-actions-bottom\" *ngIf=\"hasBottomPageActions\">\n        <ng-template [embeddedItem]=\"actionsTemplate\"\n                     *ngIf=\"hasBottomPageActions\"></ng-template>\n\n    </div>\n\n    <div class=\"page-push\"></div>\n</div>\n\n<ng-template [ngIf]=\"!hideFooter\">\n    <aw-include-component [name]='footer.name'></aw-include-component>\n</ng-template>\n",
                styles: [".page-wrapper{background-color:#f2f2f2;min-height:100%;margin-bottom:-100px}.arc-object-detail{padding:20px}.page-title-text{font-size:22px;color:#000;padding:14px 0}.page-title{padding:5px 0;border-bottom:1px solid #d7d7d7}.page-actions{padding:15px 0 5px}.page-actions-bottom{padding:0 20px}.page-state,.page-state-center,.page-state-left,.page-state-right{padding:0}.content::after{content:'\\x000a0';font-size:0}.page-title /deep/ .ui-button{min-width:100px}.page-status{text-align:right;padding:18px 0}.page-status .object-status-label{color:#767676}.page-status .object-status{font-weight:700;color:#038719}.page-push{height:100px}"]
            }] }
];
/** @nocollapse */
ObjectPageWrapperComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment },
    { type: ComponentRegistry },
    { type: PageLifeCycleService }
];
ObjectPageWrapperComponent.propDecorators = {
    title: [{ type: Input }],
    objectType: [{ type: Input }],
    objectStatusLabel: [{ type: Input }],
    objectStatus: [{ type: Input }],
    objectStates: [{ type: Input }],
    currentState: [{ type: Input }],
    header: [{ type: Input }],
    hideHeader: [{ type: Input }],
    footer: [{ type: Input }],
    hideFooter: [{ type: Input }],
    pageActionPosition: [{ type: Input }],
    actionsTemplate: [{ type: ContentChild, args: ['pageActions',] }],
    notifications: [{ type: Input }]
};
if (false) {
    /**
     * The title of this page
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.title;
    /**
     * The type of the object being rendered - Event, Workspace, contract, etc.
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.objectType;
    /**
     * label for the object status.
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.objectStatusLabel;
    /**
     * This object's status. For example, draft, pending selection,
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.objectStatus;
    /**
     * Optional. Some object has states. For example: RFxObject has Resolve, Review, Get Quote.
     * Object states will appear on the page when they are present.
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.objectStates;
    /**
     * When Stepper is used this identifies current set state
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.currentState;
    /**
     * Header is a component type to be rendered as a page Header.
     *
     * The 'default' value is the component/widget/HeaderComponent
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.header;
    /**
     * Set true if page should not include any header. Need to set to true even no header
     * object is passed in. Otherwise, a default Header component will be added.
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.hideHeader;
    /**
     * Footer Component is the page footer.
     * can be overriden but the default value is compoenent/widget/FooterComponent.
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.footer;
    /**
     * Set true if page should not include any footer. Need to set to true even no footer
     * object is passed in. Otherwise, a default Footer component will be added.
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.hideFooter;
    /**
     * The positioning of the page actions (page buttons)
     *   'top' :    page buttons are placed at the top of the page, below the title, to the right.
     *   'bottom' : page buttons are placed at the bottom of the page, above the footer.
     *   'both'   : page buttons are placed at both top and bottom.
     *
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.pageActionPosition;
    /**
     * This flag is driven by pageActionPosition. The default position is top.
     * Value is true for both 'top' and 'both' of pageActionPosition.
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.hasTopPageActions;
    /**
     * This flag is driven by pageAction position.
     * Value is true for both 'bottom' and 'both' of pageActionPosition.
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.hasBottomPageActions;
    /**
     * Queries a p template if any
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.actionsTemplate;
    /**
     * Any Success, Info, Error, or Warn for this page.
     * @type {?}
     */
    ObjectPageWrapperComponent.prototype.notifications;
    /** @type {?} */
    ObjectPageWrapperComponent.prototype.objectStateIndex;
    /** @type {?} */
    ObjectPageWrapperComponent.prototype.element;
    /** @type {?} */
    ObjectPageWrapperComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LXBhZ2Utd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9wYWdlLXdyYXBwZXIvb2JqZWN0LXBhZ2Utd3JhcHBlci9vYmplY3QtcGFnZS13cmFwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0V6RSxNQUFNLGlDQUFrQyxTQUFRLFdBQVc7Ozs7Ozs7SUE4R3ZELFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0IsRUFDdEQsaUJBQW9DLEVBQUUsb0JBQTBDO1FBRXhGLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBSG5ELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFhOzs7OzswQkF2RDVDLEtBQUs7Ozs7OzBCQWNMLEtBQUs7Ozs7Ozs7O2tDQVVFLEtB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Ozs7WUExTUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLDR0RkFBaUQ7O2FBRXBEOzs7O1lBL0VHLFVBQVU7WUFNTixXQUFXO1lBQ1gsaUJBQWlCO1lBR2pCLG9CQUFvQjs7O29CQTRFdkIsS0FBSzt5QkFNTCxLQUFLO2dDQU1MLEtBQUs7MkJBTUwsS0FBSzsyQkFPTCxLQUFLOzJCQU9MLEtBQUs7cUJBU0wsS0FBSzt5QkFPTCxLQUFLO3FCQU9MLEtBQUs7eUJBT0wsS0FBSztpQ0FVTCxLQUFLOzhCQW9CTCxZQUFZLFNBQUMsYUFBYTs0QkFNMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtDb21wb25lbnRSZWdpc3RyeX0gZnJvbSAnLi4vLi4vLi4vY29yZS9jb21wb25lbnQtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge1BhZ2VUeXBlLCBQYWdlV3JhcHBlcn0gZnJvbSAnLi4vcGFnZS13cmFwcGVyJztcbmltcG9ydCB7UGFnZU5vdGlmaWNhdGlvbn0gZnJvbSAnLi4vLi4vcGFnZS1ub3RpZmljYXRpb24vcGFnZS1ub3RpZmljYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7UGFnZUxpZmVDeWNsZVNlcnZpY2V9IGZyb20gJy4uL3BhZ2UtbGlmZWN5Y2xlLnNlcnZpY2UnO1xuaW1wb3J0IHtQYWdlSGVhZGVyQ29tcG9uZW50fSBmcm9tICcuLi9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtQYWdlRm9vdGVyQ29tcG9uZW50fSBmcm9tICcuLi9wYWdlLWZvb3Rlci9wYWdlLWZvb3Rlci5jb21wb25lbnQnO1xuXG4vKipcbiAqXG4gKiBPYmplY3QgUGFnZSBXcmFwcGVyIENvbXBvbmVudCByZW5kZXJzIGFueSBvYmplY3QgaW5zdGFuY2UgaW4gZGV0YWlsLiBJdCBoYXMgYSB1bmlmb3JtIGxheW91dCxcbiAqIEhlYWRlciwgUGFnZSB0aXRsZSwgUGFnZSBub3RpZmljYXRpb24sIGFjdGlvbnMsIGNvbnRlbnQsIGFuZCBGb290ZXIuXG4gKlxuICpcbiAqICBVc2FnZTpcbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ1JGWFBhZ2UnICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICA8YXctb2JqZWN0LXBhZ2Utd3JhcHBlclxuICogICAgICAgICAgICAgICAgICAgICAgICBbdGl0bGVdPVwicmZ4RW50aXR5LmhlYWRlckluZm8udGl0bGVcIlxuICogICAgICAgICAgICAgICAgICAgICAgICBbb2JqZWN0VHlwZV09XCJyZnhFbnRpdHkuaGVhZGVySW5mby5ldmVudFR5cGVTdHJpbmdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICBbbm90aWZpY2F0aW9uXT1cInBhZ2VOb3RpZmljYXRpb25cIj5cbiAqXG4gKlxuICogICAgICAgICAgIDxhdy1wYWdlLWFjdGlvbnM+XG4gKiAgICAgICAgICAgICAgIDxhdy1idXR0b24gW3R5cGVdPVwiJ3N1Ym1pdCdcIiBbbmFtZV09XCInZWRpdCdcIiBbdmFsdWVdPVwiZWRpdFwiIFtzdHlsZV09XCIncHJpbWFyeSdcIj5cbiAqICAgICAgICAgICAgICAgICAgIEVkaXRcbiAqICAgICAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuICogICAgICAgICAgICAgICA8YXctYnV0dG9uIFt0eXBlXT1cIididXR0b24nXCIgW25hbWVdPVwiJ2NhbmNlbCdcIiBbdmFsdWVdPVwiY2FuY2VsXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlXT1cIidzZWNvbmRhcnknXCI+XG4gKiAgICAgICAgICAgICAgICAgIENhbmNlbFxuICogICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAqICAgICAgICAgICA8L2F3LXBhZ2UtYWN0aW9ucz5cbiAqXG4gKiAgICAgICAgICAgPGF3LXBhZ2UtY29udGVudD5cbiAqICAgICAgICAgICAgIDxhdy1zZWN0aW9uIHRpdGxlPVwiU291cmNpbmcgcmVxdWVzdCBpbmZvXCIgKG9uU3RhdGVDaGFuZ2VkKT1cIm9uU3RhdGVDaGFuZ2UoJGV2ZW50KVwiPlxuICpcbiAqICAgICAgICAgICAgICAgICAgIDxtLWNvbnRleHQgW29iamVjdF09XCJyZnhFbnRpdHkuaGVhZGVySW5mb1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcGVyYXRpb25dPVwidGhpcy5lZGl0YWJpbGl0eVN0YXRlLmhlYWRlckluZm9PcFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dD1cIkluc3BlY3RcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aUdyb3VwPVwiSGVhZGVyR2VuZXJhbFwiXG4gKiAgICAgICAgICAgICAgICAgICA+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPG0taW5jbHVkZS1jb21wb25lbnQ+PC9tLWluY2x1ZGUtY29tcG9uZW50PlxuICogICAgICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gKlxuICogICAgICAgICAgICAgPC9hdy1zZWN0aW9uPlxuICogICAgICAgICAgIDwvYXctcGFnZS1jb250ZW50PlxuICogICAgICAgPC9hdy1vYmplY3QtcGFnZS13cmFwcGVyPlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBSRlhQYWdlXG4gKiAgICB7XG4gKiAgICAgICAvLyBUbyBrZWVwIHRyYWNrIHdoYXQgc2VjdGlvbiBpcyBlZGl0YWJsZSBhbmQgd2hpY2ggcmVhZCBvbmx5XG4gKiAgICAgICBlZGl0YWJpbGl0eVN0YXRlOiBFZGl0YWJpbGl0eVN0YXRlO1xuICpcbiAqICAgICAgIC8vIEN1cnJlbnQgUkZYIGV2ZW50XG4gKiAgICAgICByZnhFbnRpdHk6IFJmeEV2ZW50RW50aXR5O1xuICpcbiAqICAgICAgIC8vIE5vdGlmaWNhdGlvbnNcbiAqICAgICAgIG5vdGlmaWNhdGlvbjogUGFnZU5vdGlmaWNhdGlvbiA9IG5ldyBQYWdlTm90aWZpY2F0aW9uKFwid2FyblwiLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBvbGljeSBXYXJuaW5nXCIsIFwiVGhpcyByZXF1ZXN0IHJlcXVpcmVzIDMgYmlkcy5cIik7XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqXG4gKiAgICB9XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctb2JqZWN0LXBhZ2Utd3JhcHBlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdvYmplY3QtcGFnZS13cmFwcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnb2JqZWN0LXBhZ2Utd3JhcHBlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE9iamVjdFBhZ2VXcmFwcGVyQ29tcG9uZW50IGV4dGVuZHMgUGFnZVdyYXBwZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbntcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aXRsZSBvZiB0aGlzIHBhZ2VcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgb2JqZWN0IGJlaW5nIHJlbmRlcmVkIC0gRXZlbnQsIFdvcmtzcGFjZSwgY29udHJhY3QsIGV0Yy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9iamVjdFR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGxhYmVsIGZvciB0aGUgb2JqZWN0IHN0YXR1cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9iamVjdFN0YXR1c0xhYmVsOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG9iamVjdCdzIHN0YXR1cy4gRm9yIGV4YW1wbGUsIGRyYWZ0LCBwZW5kaW5nIHNlbGVjdGlvbixcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9iamVjdFN0YXR1czogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9uYWwuIFNvbWUgb2JqZWN0IGhhcyBzdGF0ZXMuIEZvciBleGFtcGxlOiBSRnhPYmplY3QgaGFzIFJlc29sdmUsIFJldmlldywgR2V0IFF1b3RlLlxuICAgICAqIE9iamVjdCBzdGF0ZXMgd2lsbCBhcHBlYXIgb24gdGhlIHBhZ2Ugd2hlbiB0aGV5IGFyZSBwcmVzZW50LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb2JqZWN0U3RhdGVzOiBzdHJpbmdbXTtcblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBTdGVwcGVyIGlzIHVzZWQgdGhpcyBpZGVudGlmaWVzIGN1cnJlbnQgc2V0IHN0YXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjdXJyZW50U3RhdGU6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogSGVhZGVyIGlzIGEgY29tcG9uZW50IHR5cGUgdG8gYmUgcmVuZGVyZWQgYXMgYSBwYWdlIEhlYWRlci5cbiAgICAgKlxuICAgICAqIFRoZSAnZGVmYXVsdCcgdmFsdWUgaXMgdGhlIGNvbXBvbmVudC93aWRnZXQvSGVhZGVyQ29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFNldCB0cnVlIGlmIHBhZ2Ugc2hvdWxkIG5vdCBpbmNsdWRlIGFueSBoZWFkZXIuIE5lZWQgdG8gc2V0IHRvIHRydWUgZXZlbiBubyBoZWFkZXJcbiAgICAgKiBvYmplY3QgaXMgcGFzc2VkIGluLiBPdGhlcndpc2UsIGEgZGVmYXVsdCBIZWFkZXIgY29tcG9uZW50IHdpbGwgYmUgYWRkZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoaWRlSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBGb290ZXIgQ29tcG9uZW50IGlzIHRoZSBwYWdlIGZvb3Rlci5cbiAgICAgKiBjYW4gYmUgb3ZlcnJpZGVuIGJ1dCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBjb21wb2VuZW50L3dpZGdldC9Gb290ZXJDb21wb25lbnQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmb290ZXI6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFNldCB0cnVlIGlmIHBhZ2Ugc2hvdWxkIG5vdCBpbmNsdWRlIGFueSBmb290ZXIuIE5lZWQgdG8gc2V0IHRvIHRydWUgZXZlbiBubyBmb290ZXJcbiAgICAgKiBvYmplY3QgaXMgcGFzc2VkIGluLiBPdGhlcndpc2UsIGEgZGVmYXVsdCBGb290ZXIgY29tcG9uZW50IHdpbGwgYmUgYWRkZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoaWRlRm9vdGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcG9zaXRpb25pbmcgb2YgdGhlIHBhZ2UgYWN0aW9ucyAocGFnZSBidXR0b25zKVxuICAgICAqICAgJ3RvcCcgOiAgICBwYWdlIGJ1dHRvbnMgYXJlIHBsYWNlZCBhdCB0aGUgdG9wIG9mIHRoZSBwYWdlLCBiZWxvdyB0aGUgdGl0bGUsIHRvIHRoZSByaWdodC5cbiAgICAgKiAgICdib3R0b20nIDogcGFnZSBidXR0b25zIGFyZSBwbGFjZWQgYXQgdGhlIGJvdHRvbSBvZiB0aGUgcGFnZSwgYWJvdmUgdGhlIGZvb3Rlci5cbiAgICAgKiAgICdib3RoJyAgIDogcGFnZSBidXR0b25zIGFyZSBwbGFjZWQgYXQgYm90aCB0b3AgYW5kIGJvdHRvbS5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGFnZUFjdGlvblBvc2l0aW9uOiBzdHJpbmcgPSAndG9wJztcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmbGFnIGlzIGRyaXZlbiBieSBwYWdlQWN0aW9uUG9zaXRpb24uIFRoZSBkZWZhdWx0IHBvc2l0aW9uIGlzIHRvcC5cbiAgICAgKiBWYWx1ZSBpcyB0cnVlIGZvciBib3RoICd0b3AnIGFuZCAnYm90aCcgb2YgcGFnZUFjdGlvblBvc2l0aW9uLlxuICAgICAqL1xuICAgIGhhc1RvcFBhZ2VBY3Rpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZmxhZyBpcyBkcml2ZW4gYnkgcGFnZUFjdGlvbiBwb3NpdGlvbi5cbiAgICAgKiBWYWx1ZSBpcyB0cnVlIGZvciBib3RoICdib3R0b20nIGFuZCAnYm90aCcgb2YgcGFnZUFjdGlvblBvc2l0aW9uLlxuICAgICAqL1xuICAgIGhhc0JvdHRvbVBhZ2VBY3Rpb25zOiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKiBRdWVyaWVzIGEgcCB0ZW1wbGF0ZSBpZiBhbnlcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdwYWdlQWN0aW9ucycpXG4gICAgYWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQW55IFN1Y2Nlc3MsIEluZm8sIEVycm9yLCBvciBXYXJuIGZvciB0aGlzIHBhZ2UuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBub3RpZmljYXRpb25zOiBQYWdlTm90aWZpY2F0aW9uW107XG5cblxuICAgIG9iamVjdFN0YXRlSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5LCBwYWdlTGlmZWN5Y2xlU2VydmljZTogUGFnZUxpZmVDeWNsZVNlcnZpY2UpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIFBhZ2VUeXBlLk9iamVjdCwgY29tcG9uZW50UmVnaXN0cnksIHBhZ2VMaWZlY3ljbGVTZXJ2aWNlKTtcblxuICAgICAgICAvLyBTZXR0aW5nIERlZmF1bHQgaGVhZGVyIGNvbXBvbmVudFxuICAgICAgICB0aGlzLmhlYWRlciA9IFBhZ2VIZWFkZXJDb21wb25lbnQ7XG4gICAgICAgIHRoaXMuZm9vdGVyID0gUGFnZUZvb3RlckNvbXBvbmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhIHVuaXF1ZSBJZCBmb3IgdGhpcyBvYmplY3QuXG4gICAgICpcbiAgICAgKi9cbiAgICBnZW5lcmF0ZVBhZ2VJZCgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdFR5cGUgKyAnXycgKyB0aGlzLnRpdGxlICsgKHRoaXMuaWQpID8gKCdfJyArIHRoaXMuaWQpIDogJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9lcyBteSBwYWdlIGhhdmUgcGFnZSBub3RpZmljYXRpb24/XG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNOb3RpZmljYXRpb25zKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAodGhpcy5ub3RpZmljYXRpb25zICYmIHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICBoYXNPYmplY3RTdGF0ZXMoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLm9iamVjdFN0YXRlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBteSBsb2NhbCBjb21wb25lbnRzXG4gICAgICovXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICAvLyBOZXcgQ29tcG9uZW50IHR5cGVzIHRoYXQgYXJlIHVzZWQgaW4gYy1pbmNsdWRlLWNvbXBvbmVudFxuICAgICAgICBpZiAodGhpcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVnaXN0cnkucmVnaXN0ZXJUeXBlKHRoaXMuaGVhZGVyLm5hbWUsIHRoaXMuaGVhZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5ldyBDb21wb25lbnQgdHlwZXMgdGhhdCBhcmUgdXNlZCBpbiBjLWluY2x1ZGUtY29tcG9uZW50XG4gICAgICAgIGlmICh0aGlzLmZvb3Rlcikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWdpc3RyeS5yZWdpc3RlclR5cGUodGhpcy5mb290ZXIubmFtZSwgdGhpcy5mb290ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqIG5vdGlmeSBzdWJzY3JpYmVycyBvZiB0aGUgcGFnZSBsaWZlY3ljbGUgc2VydmljZSAgKi9cbiAgICAgICAgdGhpcy5wYWdlTGlmZWN5Y2xlU2VydmljZS5vblBhZ2VJbml0KHRoaXMudGl0bGUpO1xuXG4gICAgICAgIC8vIFNldHRpbmcgdGhlIHBhZ2UgYWN0aW9uIHBvc2l0aW9uLlxuICAgICAgICBpZiAodGhpcy5wYWdlQWN0aW9uUG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICB0aGlzLmhhc1RvcFBhZ2VBY3Rpb25zID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmhhc0JvdHRvbVBhZ2VBY3Rpb25zID0gdHJ1ZTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFnZUFjdGlvblBvc2l0aW9uID09PSAnYm90aCcpIHtcblxuICAgICAgICAgICAgdGhpcy5oYXNUb3BQYWdlQWN0aW9ucyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmhhc0JvdHRvbVBhZ2VBY3Rpb25zID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5vYmplY3RTdGF0ZXMpICYmIHRoaXMub2JqZWN0U3RhdGVzLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICYmIGlzUHJlc2VudCh0aGlzLmN1cnJlbnRTdGF0ZSkpIHtcblxuICAgICAgICAgICAgdGhpcy5vYmplY3RTdGF0ZUluZGV4ID0gdGhpcy5vYmplY3RTdGF0ZXMuaW5kZXhPZih0aGlzLmN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGNoYW5nZXNbJ2N1cnJlbnRTdGF0ZSddKSAmJlxuICAgICAgICAgICAgY2hhbmdlc1snY3VycmVudFN0YXRlJ10uY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzWydjdXJyZW50U3RhdGUnXS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAvLyB3ZSBkb250IG5lZWQgdG8gY2hlY2sgaWYgb2JqZWN0U3RhdGVzIGV4aXN0c1xuICAgICAgICAgICAgdGhpcy5vYmplY3RTdGF0ZUluZGV4ID0gdGhpcy5vYmplY3RTdGF0ZXMuaW5kZXhPZih0aGlzLmN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KClcbiAgICB7XG4gICAgICAgIHRoaXMucGFnZUxpZmVjeWNsZVNlcnZpY2Uub25QYWdlRGVzdHJveSh0aGlzLnRpdGxlKTtcbiAgICB9XG59XG4iXX0=