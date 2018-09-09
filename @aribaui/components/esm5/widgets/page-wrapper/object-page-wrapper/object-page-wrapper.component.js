/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ObjectPageWrapperComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectPageWrapperComponent, _super);
    function ObjectPageWrapperComponent(element, env, componentRegistry, pageLifecycleService) {
        var _this = _super.call(this, env, PageType.Object, componentRegistry, pageLifecycleService) || this;
        _this.element = element;
        _this.env = env;
        /**
         * Set true if page should not include any header. Need to set to true even no header
         * object is passed in. Otherwise, a default Header component will be added.
         */
        _this.hideHeader = false;
        /**
         * Set true if page should not include any footer. Need to set to true even no footer
         * object is passed in. Otherwise, a default Footer component will be added.
         */
        _this.hideFooter = false;
        /**
         * The positioning of the page actions (page buttons)
         *   'top' :    page buttons are placed at the top of the page, below the title, to the right.
         *   'bottom' : page buttons are placed at the bottom of the page, above the footer.
         *   'both'   : page buttons are placed at both top and bottom.
         *
         */
        _this.pageActionPosition = 'top';
        /**
         * This flag is driven by pageActionPosition. The default position is top.
         * Value is true for both 'top' and 'both' of pageActionPosition.
         */
        _this.hasTopPageActions = true;
        _this.objectStateIndex = 0;
        // Setting Default header component
        // Setting Default header component
        _this.header = PageHeaderComponent;
        _this.footer = PageFooterComponent;
        return _this;
    }
    /**
     * Generate a unique Id for this object.
     *
     */
    /**
     * Generate a unique Id for this object.
     *
     * @return {?}
     */
    ObjectPageWrapperComponent.prototype.generatePageId = /**
     * Generate a unique Id for this object.
     *
     * @return {?}
     */
    function () {
        return this.objectType + '_' + this.title + (this.id) ? ('_' + this.id) : '';
    };
    /**
     * Does my page have page notification?
     *
     */
    /**
     * Does my page have page notification?
     *
     * @return {?}
     */
    ObjectPageWrapperComponent.prototype.hasNotifications = /**
     * Does my page have page notification?
     *
     * @return {?}
     */
    function () {
        return (this.notifications && this.notifications.length > 0);
    };
    /**
     * @return {?}
     */
    ObjectPageWrapperComponent.prototype.hasObjectStates = /**
     * @return {?}
     */
    function () {
        return isPresent(this.objectStates);
    };
    /**
     * Initialize my local components
     */
    /**
     * Initialize my local components
     * @return {?}
     */
    ObjectPageWrapperComponent.prototype.ngOnInit = /**
     * Initialize my local components
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
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
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ObjectPageWrapperComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (isPresent(changes['currentState']) &&
            changes['currentState'].currentValue !== changes['currentState'].previousValue) {
            // we dont need to check if objectStates exists
            this.objectStateIndex = this.objectStates.indexOf(this.currentState);
        }
    };
    /**
     * @return {?}
     */
    ObjectPageWrapperComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.pageLifecycleService.onPageDestroy(this.title);
    };
    ObjectPageWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-object-page-wrapper',
                    template: "<div class=\"page-wrapper\">\n    <ng-template [ngIf]=\"!hideHeader\">\n        <aw-include-component [name]='header.name'></aw-include-component>\n    </ng-template>\n\n    <div class=\"arc-object-detail\">\n\n        <div class=\"ui-g\">\n\n            <!-- page header -->\n            <div class=\"ui-g-12 page-title\">\n\n                <!-- page title -->\n                <div class=\"ui-g-8 ui-md-8 page-title-text\">{{title}}</div>\n\n                <div class=\"ui-g-4 ui-md-4 page-status\">\n                    <span class=\"object-status-label\">{{objectStatusLabel}} &nbsp;</span>\n                    <span class=\"object-status\">{{objectStatus}}</span>\n                </div>\n            </div>\n\n            <!-- page actions -->\n            <div class=\"ui-g-12 page-actions\" *ngIf=\"hasTopPageActions\">\n                <ng-template [embeddedItem]=\"actionsTemplate\"\n                             *ngIf=\"hasTopPageActions\"></ng-template>\n            </div>\n\n            <!-- object states  displays only if state exists. -->\n            <div class=\"ui-g-12 page-state\">\n                <div class=\"ui-g-3 page-state-left\" [class.content]=\"hasObjectStates()\">\n                    <ng-content select=\".page-state-left\"></ng-content>\n                </div>\n                <div class=\"ui-g-6 page-state-center\">\n                    <ng-container *ngIf=\"hasObjectStates()\">\n                        <aw-stepper [steps]=\"objectStates\"\n                                    [currentStep]=\"objectStateIndex\"></aw-stepper>\n                    </ng-container>\n                </div>\n                <div class=\"ui-g-3 page-state-right\">\n                    <ng-content select=\".page-state-right\"></ng-content>\n                </div>\n            </div>\n\n\n            <!-- Page Notification -->\n            <ng-template [ngIf]=\"hasNotifications()\">\n                <div class=\"ui-g-12 u-nopadding\">\n\n                    <aw-page-notification *ngFor=\"let notification of notifications\"\n                                          [notification]=\"notification\"></aw-page-notification>\n                </div>\n            </ng-template>\n\n            <!-- additional content -->\n            <ng-content select=\"aw-page-content\"></ng-content>\n\n        </div>\n\n    </div>\n\n    <!-- page actions -->\n    <div class=\"ui-g-12 page-actions-bottom\" *ngIf=\"hasBottomPageActions\">\n        <ng-template [embeddedItem]=\"actionsTemplate\"\n                     *ngIf=\"hasBottomPageActions\"></ng-template>\n\n    </div>\n\n    <div class=\"page-push\"></div>\n</div>\n\n<ng-template [ngIf]=\"!hideFooter\">\n    <aw-include-component [name]='footer.name'></aw-include-component>\n</ng-template>\n",
                    styles: [".page-wrapper{background-color:#f2f2f2;min-height:100%;margin-bottom:-100px}.arc-object-detail{padding:20px}.page-title-text{font-size:22px;color:#000;padding:14px 0}.page-title{padding:5px 0;border-bottom:1px solid #d7d7d7}.page-actions{padding:15px 0 5px}.page-actions-bottom{padding:0 20px}.page-state,.page-state-center,.page-state-left,.page-state-right{padding:0}.content::after{content:'\\x000a0';font-size:0}.page-title /deep/ .ui-button{min-width:100px}.page-status{text-align:right;padding:18px 0}.page-status .object-status-label{color:#767676}.page-status .object-status{font-weight:700;color:#038719}.page-push{height:100px}"]
                }] }
    ];
    /** @nocollapse */
    ObjectPageWrapperComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment },
        { type: ComponentRegistry },
        { type: PageLifeCycleService }
    ]; };
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
    return ObjectPageWrapperComponent;
}(PageWrapper));
export { ObjectPageWrapperComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LXBhZ2Utd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9wYWdlLXdyYXBwZXIvb2JqZWN0LXBhZ2Utd3JhcHBlci9vYmplY3QtcGFnZS13cmFwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXRELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvRXpCLHNEQUFXO0lBOEd2RCxvQ0FBc0IsT0FBbUIsRUFBUyxHQUFnQixFQUN0RCxpQkFBb0MsRUFBRSxvQkFBMEM7UUFENUYsWUFHSSxrQkFBTSxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQyxTQUt2RTtRQVJxQixhQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVMsU0FBRyxHQUFILEdBQUcsQ0FBYTs7Ozs7MkJBdkQ1QyxLQUFLOzs7OzsyQkFjTCxLQUFLOzs7Ozs7OzttQ0FVRSxLQUFLOzs7OztrQ0FPTCxJQUFJ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RUQsZ0RBQVc7OztJQUFYO1FBRUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkQ7O2dCQTFNSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsNHRGQUFpRDs7aUJBRXBEOzs7O2dCQS9FRyxVQUFVO2dCQU1OLFdBQVc7Z0JBQ1gsaUJBQWlCO2dCQUdqQixvQkFBb0I7Ozt3QkE0RXZCLEtBQUs7NkJBTUwsS0FBSztvQ0FNTCxLQUFLOytCQU1MLEtBQUs7K0JBT0wsS0FBSzsrQkFPTCxLQUFLO3lCQVNMLEtBQUs7NkJBT0wsS0FBSzt5QkFPTCxLQUFLOzZCQU9MLEtBQUs7cUNBVUwsS0FBSztrQ0FvQkwsWUFBWSxTQUFDLGFBQWE7Z0NBTTFCLEtBQUs7O3FDQS9NVjtFQXVHZ0QsV0FBVztTQUE5QywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uLy4uLy4uL2NvcmUvY29tcG9uZW50LXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtQYWdlVHlwZSwgUGFnZVdyYXBwZXJ9IGZyb20gJy4uL3BhZ2Utd3JhcHBlcic7XG5pbXBvcnQge1BhZ2VOb3RpZmljYXRpb259IGZyb20gJy4uLy4uL3BhZ2Utbm90aWZpY2F0aW9uL3BhZ2Utbm90aWZpY2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQge1BhZ2VMaWZlQ3ljbGVTZXJ2aWNlfSBmcm9tICcuLi9wYWdlLWxpZmVjeWNsZS5zZXJ2aWNlJztcbmltcG9ydCB7UGFnZUhlYWRlckNvbXBvbmVudH0gZnJvbSAnLi4vcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7UGFnZUZvb3RlckNvbXBvbmVudH0gZnJvbSAnLi4vcGFnZS1mb290ZXIvcGFnZS1mb290ZXIuY29tcG9uZW50JztcblxuLyoqXG4gKlxuICogT2JqZWN0IFBhZ2UgV3JhcHBlciBDb21wb25lbnQgcmVuZGVycyBhbnkgb2JqZWN0IGluc3RhbmNlIGluIGRldGFpbC4gSXQgaGFzIGEgdW5pZm9ybSBsYXlvdXQsXG4gKiBIZWFkZXIsIFBhZ2UgdGl0bGUsIFBhZ2Ugbm90aWZpY2F0aW9uLCBhY3Rpb25zLCBjb250ZW50LCBhbmQgRm9vdGVyLlxuICpcbiAqXG4gKiAgVXNhZ2U6XG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdSRlhQYWdlJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgPGF3LW9iamVjdC1wYWdlLXdyYXBwZXJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW3RpdGxlXT1cInJmeEVudGl0eS5oZWFkZXJJbmZvLnRpdGxlXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW29iamVjdFR5cGVdPVwicmZ4RW50aXR5LmhlYWRlckluZm8uZXZlbnRUeXBlU3RyaW5nXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW25vdGlmaWNhdGlvbl09XCJwYWdlTm90aWZpY2F0aW9uXCI+XG4gKlxuICpcbiAqICAgICAgICAgICA8YXctcGFnZS1hY3Rpb25zPlxuICogICAgICAgICAgICAgICA8YXctYnV0dG9uIFt0eXBlXT1cIidzdWJtaXQnXCIgW25hbWVdPVwiJ2VkaXQnXCIgW3ZhbHVlXT1cImVkaXRcIiBbc3R5bGVdPVwiJ3ByaW1hcnknXCI+XG4gKiAgICAgICAgICAgICAgICAgICBFZGl0XG4gKiAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAqICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiBbdHlwZV09XCInYnV0dG9uJ1wiIFtuYW1lXT1cIidjYW5jZWwnXCIgW3ZhbHVlXT1cImNhbmNlbFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCInc2Vjb25kYXJ5J1wiPlxuICogICAgICAgICAgICAgICAgICBDYW5jZWxcbiAqICAgICAgICAgICAgICAgPC9hdy1idXR0b24+XG4gKiAgICAgICAgICAgPC9hdy1wYWdlLWFjdGlvbnM+XG4gKlxuICogICAgICAgICAgIDxhdy1wYWdlLWNvbnRlbnQ+XG4gKiAgICAgICAgICAgICA8YXctc2VjdGlvbiB0aXRsZT1cIlNvdXJjaW5nIHJlcXVlc3QgaW5mb1wiIChvblN0YXRlQ2hhbmdlZCk9XCJvblN0YXRlQ2hhbmdlKCRldmVudClcIj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICA8bS1jb250ZXh0IFtvYmplY3RdPVwicmZ4RW50aXR5LmhlYWRlckluZm9cIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbb3BlcmF0aW9uXT1cInRoaXMuZWRpdGFiaWxpdHlTdGF0ZS5oZWFkZXJJbmZvT3BcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ9XCJJbnNwZWN0XCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlHcm91cD1cIkhlYWRlckdlbmVyYWxcIlxuICogICAgICAgICAgICAgICAgICAgPlxuICogICAgICAgICAgICAgICAgICAgICAgIDxtLWluY2x1ZGUtY29tcG9uZW50PjwvbS1pbmNsdWRlLWNvbXBvbmVudD5cbiAqICAgICAgICAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuICpcbiAqICAgICAgICAgICAgIDwvYXctc2VjdGlvbj5cbiAqICAgICAgICAgICA8L2F3LXBhZ2UtY29udGVudD5cbiAqICAgICAgIDwvYXctb2JqZWN0LXBhZ2Utd3JhcHBlcj5cbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgUkZYUGFnZVxuICogICAge1xuICogICAgICAgLy8gVG8ga2VlcCB0cmFjayB3aGF0IHNlY3Rpb24gaXMgZWRpdGFibGUgYW5kIHdoaWNoIHJlYWQgb25seVxuICogICAgICAgZWRpdGFiaWxpdHlTdGF0ZTogRWRpdGFiaWxpdHlTdGF0ZTtcbiAqXG4gKiAgICAgICAvLyBDdXJyZW50IFJGWCBldmVudFxuICogICAgICAgcmZ4RW50aXR5OiBSZnhFdmVudEVudGl0eTtcbiAqXG4gKiAgICAgICAvLyBOb3RpZmljYXRpb25zXG4gKiAgICAgICBub3RpZmljYXRpb246IFBhZ2VOb3RpZmljYXRpb24gPSBuZXcgUGFnZU5vdGlmaWNhdGlvbihcIndhcm5cIixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQb2xpY3kgV2FybmluZ1wiLCBcIlRoaXMgcmVxdWVzdCByZXF1aXJlcyAzIGJpZHMuXCIpO1xuICpcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICB9XG4gKlxuICogICAgfVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LW9iamVjdC1wYWdlLXdyYXBwZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnb2JqZWN0LXBhZ2Utd3JhcHBlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ29iamVjdC1wYWdlLXdyYXBwZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBPYmplY3RQYWdlV3JhcHBlckNvbXBvbmVudCBleHRlbmRzIFBhZ2VXcmFwcGVyIGltcGxlbWVudHMgT25EZXN0cm95XG57XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGl0bGUgb2YgdGhpcyBwYWdlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIG9iamVjdCBiZWluZyByZW5kZXJlZCAtIEV2ZW50LCBXb3Jrc3BhY2UsIGNvbnRyYWN0LCBldGMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBvYmplY3RUeXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBsYWJlbCBmb3IgdGhlIG9iamVjdCBzdGF0dXMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBvYmplY3RTdGF0dXNMYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBvYmplY3QncyBzdGF0dXMuIEZvciBleGFtcGxlLCBkcmFmdCwgcGVuZGluZyBzZWxlY3Rpb24sXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBvYmplY3RTdGF0dXM6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbmFsLiBTb21lIG9iamVjdCBoYXMgc3RhdGVzLiBGb3IgZXhhbXBsZTogUkZ4T2JqZWN0IGhhcyBSZXNvbHZlLCBSZXZpZXcsIEdldCBRdW90ZS5cbiAgICAgKiBPYmplY3Qgc3RhdGVzIHdpbGwgYXBwZWFyIG9uIHRoZSBwYWdlIHdoZW4gdGhleSBhcmUgcHJlc2VudC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9iamVjdFN0YXRlczogc3RyaW5nW107XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gU3RlcHBlciBpcyB1c2VkIHRoaXMgaWRlbnRpZmllcyBjdXJyZW50IHNldCBzdGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY3VycmVudFN0YXRlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEhlYWRlciBpcyBhIGNvbXBvbmVudCB0eXBlIHRvIGJlIHJlbmRlcmVkIGFzIGEgcGFnZSBIZWFkZXIuXG4gICAgICpcbiAgICAgKiBUaGUgJ2RlZmF1bHQnIHZhbHVlIGlzIHRoZSBjb21wb25lbnQvd2lkZ2V0L0hlYWRlckNvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGVhZGVyOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdHJ1ZSBpZiBwYWdlIHNob3VsZCBub3QgaW5jbHVkZSBhbnkgaGVhZGVyLiBOZWVkIHRvIHNldCB0byB0cnVlIGV2ZW4gbm8gaGVhZGVyXG4gICAgICogb2JqZWN0IGlzIHBhc3NlZCBpbi4gT3RoZXJ3aXNlLCBhIGRlZmF1bHQgSGVhZGVyIGNvbXBvbmVudCB3aWxsIGJlIGFkZGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGlkZUhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogRm9vdGVyIENvbXBvbmVudCBpcyB0aGUgcGFnZSBmb290ZXIuXG4gICAgICogY2FuIGJlIG92ZXJyaWRlbiBidXQgdGhlIGRlZmF1bHQgdmFsdWUgaXMgY29tcG9lbmVudC93aWRnZXQvRm9vdGVyQ29tcG9uZW50LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9vdGVyOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdHJ1ZSBpZiBwYWdlIHNob3VsZCBub3QgaW5jbHVkZSBhbnkgZm9vdGVyLiBOZWVkIHRvIHNldCB0byB0cnVlIGV2ZW4gbm8gZm9vdGVyXG4gICAgICogb2JqZWN0IGlzIHBhc3NlZCBpbi4gT3RoZXJ3aXNlLCBhIGRlZmF1bHQgRm9vdGVyIGNvbXBvbmVudCB3aWxsIGJlIGFkZGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGlkZUZvb3RlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHBvc2l0aW9uaW5nIG9mIHRoZSBwYWdlIGFjdGlvbnMgKHBhZ2UgYnV0dG9ucylcbiAgICAgKiAgICd0b3AnIDogICAgcGFnZSBidXR0b25zIGFyZSBwbGFjZWQgYXQgdGhlIHRvcCBvZiB0aGUgcGFnZSwgYmVsb3cgdGhlIHRpdGxlLCB0byB0aGUgcmlnaHQuXG4gICAgICogICAnYm90dG9tJyA6IHBhZ2UgYnV0dG9ucyBhcmUgcGxhY2VkIGF0IHRoZSBib3R0b20gb2YgdGhlIHBhZ2UsIGFib3ZlIHRoZSBmb290ZXIuXG4gICAgICogICAnYm90aCcgICA6IHBhZ2UgYnV0dG9ucyBhcmUgcGxhY2VkIGF0IGJvdGggdG9wIGFuZCBib3R0b20uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHBhZ2VBY3Rpb25Qb3NpdGlvbjogc3RyaW5nID0gJ3RvcCc7XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZmxhZyBpcyBkcml2ZW4gYnkgcGFnZUFjdGlvblBvc2l0aW9uLiBUaGUgZGVmYXVsdCBwb3NpdGlvbiBpcyB0b3AuXG4gICAgICogVmFsdWUgaXMgdHJ1ZSBmb3IgYm90aCAndG9wJyBhbmQgJ2JvdGgnIG9mIHBhZ2VBY3Rpb25Qb3NpdGlvbi5cbiAgICAgKi9cbiAgICBoYXNUb3BQYWdlQWN0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZsYWcgaXMgZHJpdmVuIGJ5IHBhZ2VBY3Rpb24gcG9zaXRpb24uXG4gICAgICogVmFsdWUgaXMgdHJ1ZSBmb3IgYm90aCAnYm90dG9tJyBhbmQgJ2JvdGgnIG9mIHBhZ2VBY3Rpb25Qb3NpdGlvbi5cbiAgICAgKi9cbiAgICBoYXNCb3R0b21QYWdlQWN0aW9uczogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogUXVlcmllcyBhIHAgdGVtcGxhdGUgaWYgYW55XG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgncGFnZUFjdGlvbnMnKVxuICAgIGFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEFueSBTdWNjZXNzLCBJbmZvLCBFcnJvciwgb3IgV2FybiBmb3IgdGhpcyBwYWdlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm90aWZpY2F0aW9uczogUGFnZU5vdGlmaWNhdGlvbltdO1xuXG5cbiAgICBvYmplY3RTdGF0ZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeSwgcGFnZUxpZmVjeWNsZVNlcnZpY2U6IFBhZ2VMaWZlQ3ljbGVTZXJ2aWNlKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBQYWdlVHlwZS5PYmplY3QsIGNvbXBvbmVudFJlZ2lzdHJ5LCBwYWdlTGlmZWN5Y2xlU2VydmljZSk7XG5cbiAgICAgICAgLy8gU2V0dGluZyBEZWZhdWx0IGhlYWRlciBjb21wb25lbnRcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBQYWdlSGVhZGVyQ29tcG9uZW50O1xuICAgICAgICB0aGlzLmZvb3RlciA9IFBhZ2VGb290ZXJDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSB1bmlxdWUgSWQgZm9yIHRoaXMgb2JqZWN0LlxuICAgICAqXG4gICAgICovXG4gICAgZ2VuZXJhdGVQYWdlSWQoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RUeXBlICsgJ18nICsgdGhpcy50aXRsZSArICh0aGlzLmlkKSA/ICgnXycgKyB0aGlzLmlkKSA6ICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvZXMgbXkgcGFnZSBoYXZlIHBhZ2Ugbm90aWZpY2F0aW9uP1xuICAgICAqXG4gICAgICovXG4gICAgaGFzTm90aWZpY2F0aW9ucygpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gKHRoaXMubm90aWZpY2F0aW9ucyAmJiB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCk7XG4gICAgfVxuXG4gICAgaGFzT2JqZWN0U3RhdGVzKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5vYmplY3RTdGF0ZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgbXkgbG9jYWwgY29tcG9uZW50c1xuICAgICAqL1xuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgLy8gTmV3IENvbXBvbmVudCB0eXBlcyB0aGF0IGFyZSB1c2VkIGluIGMtaW5jbHVkZS1jb21wb25lbnRcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5LnJlZ2lzdGVyVHlwZSh0aGlzLmhlYWRlci5uYW1lLCB0aGlzLmhlYWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOZXcgQ29tcG9uZW50IHR5cGVzIHRoYXQgYXJlIHVzZWQgaW4gYy1pbmNsdWRlLWNvbXBvbmVudFxuICAgICAgICBpZiAodGhpcy5mb290ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVnaXN0cnkucmVnaXN0ZXJUeXBlKHRoaXMuZm9vdGVyLm5hbWUsIHRoaXMuZm9vdGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiBub3RpZnkgc3Vic2NyaWJlcnMgb2YgdGhlIHBhZ2UgbGlmZWN5Y2xlIHNlcnZpY2UgICovXG4gICAgICAgIHRoaXMucGFnZUxpZmVjeWNsZVNlcnZpY2Uub25QYWdlSW5pdCh0aGlzLnRpdGxlKTtcblxuICAgICAgICAvLyBTZXR0aW5nIHRoZSBwYWdlIGFjdGlvbiBwb3NpdGlvbi5cbiAgICAgICAgaWYgKHRoaXMucGFnZUFjdGlvblBvc2l0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgdGhpcy5oYXNUb3BQYWdlQWN0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5oYXNCb3R0b21QYWdlQWN0aW9ucyA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VBY3Rpb25Qb3NpdGlvbiA9PT0gJ2JvdGgnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaGFzVG9wUGFnZUFjdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5oYXNCb3R0b21QYWdlQWN0aW9ucyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMub2JqZWN0U3RhdGVzKSAmJiB0aGlzLm9iamVjdFN0YXRlcy5sZW5ndGggPiAxXG4gICAgICAgICAgICAmJiBpc1ByZXNlbnQodGhpcy5jdXJyZW50U3RhdGUpKSB7XG5cbiAgICAgICAgICAgIHRoaXMub2JqZWN0U3RhdGVJbmRleCA9IHRoaXMub2JqZWN0U3RhdGVzLmluZGV4T2YodGhpcy5jdXJyZW50U3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChjaGFuZ2VzWydjdXJyZW50U3RhdGUnXSkgJiZcbiAgICAgICAgICAgIGNoYW5nZXNbJ2N1cnJlbnRTdGF0ZSddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snY3VycmVudFN0YXRlJ10ucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgLy8gd2UgZG9udCBuZWVkIHRvIGNoZWNrIGlmIG9iamVjdFN0YXRlcyBleGlzdHNcbiAgICAgICAgICAgIHRoaXMub2JqZWN0U3RhdGVJbmRleCA9IHRoaXMub2JqZWN0U3RhdGVzLmluZGV4T2YodGhpcy5jdXJyZW50U3RhdGUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpXG4gICAge1xuICAgICAgICB0aGlzLnBhZ2VMaWZlY3ljbGVTZXJ2aWNlLm9uUGFnZURlc3Ryb3kodGhpcy50aXRsZSk7XG4gICAgfVxufVxuIl19