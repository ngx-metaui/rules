/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                },] },
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
function ObjectPageWrapperComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LXBhZ2Utd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9wYWdlLXdyYXBwZXIvb2JqZWN0LXBhZ2Utd3JhcHBlci9vYmplY3QtcGFnZS13cmFwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXRELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE2SXpCLHNEQUFXO0lBOEd2RCxvQ0FBc0IsT0FBbUIsRUFBUyxHQUFnQixFQUN0RCxpQkFBb0MsRUFBRSxvQkFBMEM7UUFENUYsWUFHSSxrQkFBTSxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQyxTQUt2RTtRQVJxQixhQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVMsU0FBRyxHQUFILEdBQUcsQ0FBYTs7Ozs7MkJBdkQ1QyxLQUFLOzs7OzsyQkFjTCxLQUFLOzs7Ozs7OzttQ0FVRSxLQUFLOzs7OztrQ0FPTCxJQUFJ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RUQsZ0RBQVc7OztJQUFYO1FBRUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkQ7O2dCQW5SSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLGt0RkF5RWI7b0JBQ0csTUFBTSxFQUFFLENBQUMsK25CQUE2bkIsQ0FBQztpQkFDMW9COzs7O2dCQXhKRyxVQUFVO2dCQU1OLFdBQVc7Z0JBQ1gsaUJBQWlCO2dCQUdqQixvQkFBb0I7Ozt3QkFxSnZCLEtBQUs7NkJBTUwsS0FBSztvQ0FNTCxLQUFLOytCQU1MLEtBQUs7K0JBT0wsS0FBSzsrQkFPTCxLQUFLO3lCQVNMLEtBQUs7NkJBT0wsS0FBSzt5QkFPTCxLQUFLOzZCQU9MLEtBQUs7cUNBVUwsS0FBSztrQ0FvQkwsWUFBWSxTQUFDLGFBQWE7Z0NBTTFCLEtBQUs7O3FDQXhSVjtFQWdMZ0QsV0FBVztTQUE5QywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4uLy4uLy4uL2NvcmUvY29tcG9uZW50LXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtQYWdlVHlwZSwgUGFnZVdyYXBwZXJ9IGZyb20gJy4uL3BhZ2Utd3JhcHBlcic7XG5pbXBvcnQge1BhZ2VOb3RpZmljYXRpb259IGZyb20gJy4uLy4uL3BhZ2Utbm90aWZpY2F0aW9uL3BhZ2Utbm90aWZpY2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQge1BhZ2VMaWZlQ3ljbGVTZXJ2aWNlfSBmcm9tICcuLi9wYWdlLWxpZmVjeWNsZS5zZXJ2aWNlJztcbmltcG9ydCB7UGFnZUhlYWRlckNvbXBvbmVudH0gZnJvbSAnLi4vcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7UGFnZUZvb3RlckNvbXBvbmVudH0gZnJvbSAnLi4vcGFnZS1mb290ZXIvcGFnZS1mb290ZXIuY29tcG9uZW50JztcblxuLyoqXG4gKlxuICogT2JqZWN0IFBhZ2UgV3JhcHBlciBDb21wb25lbnQgcmVuZGVycyBhbnkgb2JqZWN0IGluc3RhbmNlIGluIGRldGFpbC4gSXQgaGFzIGEgdW5pZm9ybSBsYXlvdXQsXG4gKiBIZWFkZXIsIFBhZ2UgdGl0bGUsIFBhZ2Ugbm90aWZpY2F0aW9uLCBhY3Rpb25zLCBjb250ZW50LCBhbmQgRm9vdGVyLlxuICpcbiAqXG4gKiAgVXNhZ2U6XG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdSRlhQYWdlJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgPGF3LW9iamVjdC1wYWdlLXdyYXBwZXJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW3RpdGxlXT1cInJmeEVudGl0eS5oZWFkZXJJbmZvLnRpdGxlXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW29iamVjdFR5cGVdPVwicmZ4RW50aXR5LmhlYWRlckluZm8uZXZlbnRUeXBlU3RyaW5nXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgW25vdGlmaWNhdGlvbl09XCJwYWdlTm90aWZpY2F0aW9uXCI+XG4gKlxuICpcbiAqICAgICAgICAgICA8YXctcGFnZS1hY3Rpb25zPlxuICogICAgICAgICAgICAgICA8YXctYnV0dG9uIFt0eXBlXT1cIidzdWJtaXQnXCIgW25hbWVdPVwiJ2VkaXQnXCIgW3ZhbHVlXT1cImVkaXRcIiBbc3R5bGVdPVwiJ3ByaW1hcnknXCI+XG4gKiAgICAgICAgICAgICAgICAgICBFZGl0XG4gKiAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAqICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiBbdHlwZV09XCInYnV0dG9uJ1wiIFtuYW1lXT1cIidjYW5jZWwnXCIgW3ZhbHVlXT1cImNhbmNlbFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCInc2Vjb25kYXJ5J1wiPlxuICogICAgICAgICAgICAgICAgICBDYW5jZWxcbiAqICAgICAgICAgICAgICAgPC9hdy1idXR0b24+XG4gKiAgICAgICAgICAgPC9hdy1wYWdlLWFjdGlvbnM+XG4gKlxuICogICAgICAgICAgIDxhdy1wYWdlLWNvbnRlbnQ+XG4gKiAgICAgICAgICAgICA8YXctc2VjdGlvbiB0aXRsZT1cIlNvdXJjaW5nIHJlcXVlc3QgaW5mb1wiIChvblN0YXRlQ2hhbmdlZCk9XCJvblN0YXRlQ2hhbmdlKCRldmVudClcIj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICA8bS1jb250ZXh0IFtvYmplY3RdPVwicmZ4RW50aXR5LmhlYWRlckluZm9cIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbb3BlcmF0aW9uXT1cInRoaXMuZWRpdGFiaWxpdHlTdGF0ZS5oZWFkZXJJbmZvT3BcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ9XCJJbnNwZWN0XCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlHcm91cD1cIkhlYWRlckdlbmVyYWxcIlxuICogICAgICAgICAgICAgICAgICAgPlxuICogICAgICAgICAgICAgICAgICAgICAgIDxtLWluY2x1ZGUtY29tcG9uZW50PjwvbS1pbmNsdWRlLWNvbXBvbmVudD5cbiAqICAgICAgICAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuICpcbiAqICAgICAgICAgICAgIDwvYXctc2VjdGlvbj5cbiAqICAgICAgICAgICA8L2F3LXBhZ2UtY29udGVudD5cbiAqICAgICAgIDwvYXctb2JqZWN0LXBhZ2Utd3JhcHBlcj5cbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgUkZYUGFnZVxuICogICAge1xuICogICAgICAgLy8gVG8ga2VlcCB0cmFjayB3aGF0IHNlY3Rpb24gaXMgZWRpdGFibGUgYW5kIHdoaWNoIHJlYWQgb25seVxuICogICAgICAgZWRpdGFiaWxpdHlTdGF0ZTogRWRpdGFiaWxpdHlTdGF0ZTtcbiAqXG4gKiAgICAgICAvLyBDdXJyZW50IFJGWCBldmVudFxuICogICAgICAgcmZ4RW50aXR5OiBSZnhFdmVudEVudGl0eTtcbiAqXG4gKiAgICAgICAvLyBOb3RpZmljYXRpb25zXG4gKiAgICAgICBub3RpZmljYXRpb246IFBhZ2VOb3RpZmljYXRpb24gPSBuZXcgUGFnZU5vdGlmaWNhdGlvbihcIndhcm5cIixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQb2xpY3kgV2FybmluZ1wiLCBcIlRoaXMgcmVxdWVzdCByZXF1aXJlcyAzIGJpZHMuXCIpO1xuICpcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICB9XG4gKlxuICogICAgfVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LW9iamVjdC1wYWdlLXdyYXBwZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2Utd3JhcHBlclwiPlxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaGlkZUhlYWRlclwiPlxuICAgICAgICA8YXctaW5jbHVkZS1jb21wb25lbnQgW25hbWVdPSdoZWFkZXIubmFtZSc+PC9hdy1pbmNsdWRlLWNvbXBvbmVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPGRpdiBjbGFzcz1cImFyYy1vYmplY3QtZGV0YWlsXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWdcIj5cblxuICAgICAgICAgICAgPCEtLSBwYWdlIGhlYWRlciAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHBhZ2UtdGl0bGVcIj5cblxuICAgICAgICAgICAgICAgIDwhLS0gcGFnZSB0aXRsZSAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy04IHVpLW1kLTggcGFnZS10aXRsZS10ZXh0XCI+e3t0aXRsZX19PC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy00IHVpLW1kLTQgcGFnZS1zdGF0dXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvYmplY3Qtc3RhdHVzLWxhYmVsXCI+e3tvYmplY3RTdGF0dXNMYWJlbH19ICZuYnNwOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvYmplY3Qtc3RhdHVzXCI+e3tvYmplY3RTdGF0dXN9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8IS0tIHBhZ2UgYWN0aW9ucyAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHBhZ2UtYWN0aW9uc1wiICpuZ0lmPVwiaGFzVG9wUGFnZUFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW2VtYmVkZGVkSXRlbV09XCJhY3Rpb25zVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc1RvcFBhZ2VBY3Rpb25zXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8IS0tIG9iamVjdCBzdGF0ZXMgIGRpc3BsYXlzIG9ubHkgaWYgc3RhdGUgZXhpc3RzLiAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHBhZ2Utc3RhdGVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy0zIHBhZ2Utc3RhdGUtbGVmdFwiIFtjbGFzcy5jb250ZW50XT1cImhhc09iamVjdFN0YXRlcygpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5wYWdlLXN0YXRlLWxlZnRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctNiBwYWdlLXN0YXRlLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaGFzT2JqZWN0U3RhdGVzKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1zdGVwcGVyIFtzdGVwc109XCJvYmplY3RTdGF0ZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2N1cnJlbnRTdGVwXT1cIm9iamVjdFN0YXRlSW5kZXhcIj48L2F3LXN0ZXBwZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTMgcGFnZS1zdGF0ZS1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCIucGFnZS1zdGF0ZS1yaWdodFwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgIDwhLS0gUGFnZSBOb3RpZmljYXRpb24gLS0+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaGFzTm90aWZpY2F0aW9ucygpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctMTIgdS1ub3BhZGRpbmdcIj5cblxuICAgICAgICAgICAgICAgICAgICA8YXctcGFnZS1ub3RpZmljYXRpb24gKm5nRm9yPVwibGV0IG5vdGlmaWNhdGlvbiBvZiBub3RpZmljYXRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtub3RpZmljYXRpb25dPVwibm90aWZpY2F0aW9uXCI+PC9hdy1wYWdlLW5vdGlmaWNhdGlvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDwhLS0gYWRkaXRpb25hbCBjb250ZW50IC0tPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYXctcGFnZS1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIHBhZ2UgYWN0aW9ucyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwidWktZy0xMiBwYWdlLWFjdGlvbnMtYm90dG9tXCIgKm5nSWY9XCJoYXNCb3R0b21QYWdlQWN0aW9uc1wiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW2VtYmVkZGVkSXRlbV09XCJhY3Rpb25zVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJoYXNCb3R0b21QYWdlQWN0aW9uc1wiPjwvbmctdGVtcGxhdGU+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJwYWdlLXB1c2hcIj48L2Rpdj5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgW25nSWZdPVwiIWhpZGVGb290ZXJcIj5cbiAgICA8YXctaW5jbHVkZS1jb21wb25lbnQgW25hbWVdPSdmb290ZXIubmFtZSc+PC9hdy1pbmNsdWRlLWNvbXBvbmVudD5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICAgIHN0eWxlczogW2AucGFnZS13cmFwcGVye2JhY2tncm91bmQtY29sb3I6I2YyZjJmMjttaW4taGVpZ2h0OjEwMCU7bWFyZ2luLWJvdHRvbTotMTAwcHh9LmFyYy1vYmplY3QtZGV0YWlse3BhZGRpbmc6MjBweH0ucGFnZS10aXRsZS10ZXh0e2ZvbnQtc2l6ZToyMnB4O2NvbG9yOiMwMDA7cGFkZGluZzoxNHB4IDB9LnBhZ2UtdGl0bGV7cGFkZGluZzo1cHggMDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZDdkN2Q3fS5wYWdlLWFjdGlvbnN7cGFkZGluZzoxNXB4IDAgNXB4fS5wYWdlLWFjdGlvbnMtYm90dG9te3BhZGRpbmc6MCAyMHB4fS5wYWdlLXN0YXRlLC5wYWdlLXN0YXRlLWNlbnRlciwucGFnZS1zdGF0ZS1sZWZ0LC5wYWdlLXN0YXRlLXJpZ2h0e3BhZGRpbmc6MH0uY29udGVudDo6YWZ0ZXJ7Y29udGVudDonXFxcXDAwYTAnO2ZvbnQtc2l6ZTowfS5wYWdlLXRpdGxlIC9kZWVwLyAudWktYnV0dG9ue21pbi13aWR0aDoxMDBweH0ucGFnZS1zdGF0dXN7dGV4dC1hbGlnbjpyaWdodDtwYWRkaW5nOjE4cHggMH0ucGFnZS1zdGF0dXMgLm9iamVjdC1zdGF0dXMtbGFiZWx7Y29sb3I6Izc2NzY3Nn0ucGFnZS1zdGF0dXMgLm9iamVjdC1zdGF0dXN7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOiMwMzg3MTl9LnBhZ2UtcHVzaHtoZWlnaHQ6MTAwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgT2JqZWN0UGFnZVdyYXBwZXJDb21wb25lbnQgZXh0ZW5kcyBQYWdlV3JhcHBlciBpbXBsZW1lbnRzIE9uRGVzdHJveVxue1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpdGxlIG9mIHRoaXMgcGFnZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBvYmplY3QgYmVpbmcgcmVuZGVyZWQgLSBFdmVudCwgV29ya3NwYWNlLCBjb250cmFjdCwgZXRjLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb2JqZWN0VHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogbGFiZWwgZm9yIHRoZSBvYmplY3Qgc3RhdHVzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb2JqZWN0U3RhdHVzTGFiZWw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoaXMgb2JqZWN0J3Mgc3RhdHVzLiBGb3IgZXhhbXBsZSwgZHJhZnQsIHBlbmRpbmcgc2VsZWN0aW9uLFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb2JqZWN0U3RhdHVzOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25hbC4gU29tZSBvYmplY3QgaGFzIHN0YXRlcy4gRm9yIGV4YW1wbGU6IFJGeE9iamVjdCBoYXMgUmVzb2x2ZSwgUmV2aWV3LCBHZXQgUXVvdGUuXG4gICAgICogT2JqZWN0IHN0YXRlcyB3aWxsIGFwcGVhciBvbiB0aGUgcGFnZSB3aGVuIHRoZXkgYXJlIHByZXNlbnQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBvYmplY3RTdGF0ZXM6IHN0cmluZ1tdO1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIFN0ZXBwZXIgaXMgdXNlZCB0aGlzIGlkZW50aWZpZXMgY3VycmVudCBzZXQgc3RhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGN1cnJlbnRTdGF0ZTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBIZWFkZXIgaXMgYSBjb21wb25lbnQgdHlwZSB0byBiZSByZW5kZXJlZCBhcyBhIHBhZ2UgSGVhZGVyLlxuICAgICAqXG4gICAgICogVGhlICdkZWZhdWx0JyB2YWx1ZSBpcyB0aGUgY29tcG9uZW50L3dpZGdldC9IZWFkZXJDb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhlYWRlcjogYW55O1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRydWUgaWYgcGFnZSBzaG91bGQgbm90IGluY2x1ZGUgYW55IGhlYWRlci4gTmVlZCB0byBzZXQgdG8gdHJ1ZSBldmVuIG5vIGhlYWRlclxuICAgICAqIG9iamVjdCBpcyBwYXNzZWQgaW4uIE90aGVyd2lzZSwgYSBkZWZhdWx0IEhlYWRlciBjb21wb25lbnQgd2lsbCBiZSBhZGRlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhpZGVIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEZvb3RlciBDb21wb25lbnQgaXMgdGhlIHBhZ2UgZm9vdGVyLlxuICAgICAqIGNhbiBiZSBvdmVycmlkZW4gYnV0IHRoZSBkZWZhdWx0IHZhbHVlIGlzIGNvbXBvZW5lbnQvd2lkZ2V0L0Zvb3RlckNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZvb3RlcjogYW55O1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRydWUgaWYgcGFnZSBzaG91bGQgbm90IGluY2x1ZGUgYW55IGZvb3Rlci4gTmVlZCB0byBzZXQgdG8gdHJ1ZSBldmVuIG5vIGZvb3RlclxuICAgICAqIG9iamVjdCBpcyBwYXNzZWQgaW4uIE90aGVyd2lzZSwgYSBkZWZhdWx0IEZvb3RlciBjb21wb25lbnQgd2lsbCBiZSBhZGRlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhpZGVGb290ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBwb3NpdGlvbmluZyBvZiB0aGUgcGFnZSBhY3Rpb25zIChwYWdlIGJ1dHRvbnMpXG4gICAgICogICAndG9wJyA6ICAgIHBhZ2UgYnV0dG9ucyBhcmUgcGxhY2VkIGF0IHRoZSB0b3Agb2YgdGhlIHBhZ2UsIGJlbG93IHRoZSB0aXRsZSwgdG8gdGhlIHJpZ2h0LlxuICAgICAqICAgJ2JvdHRvbScgOiBwYWdlIGJ1dHRvbnMgYXJlIHBsYWNlZCBhdCB0aGUgYm90dG9tIG9mIHRoZSBwYWdlLCBhYm92ZSB0aGUgZm9vdGVyLlxuICAgICAqICAgJ2JvdGgnICAgOiBwYWdlIGJ1dHRvbnMgYXJlIHBsYWNlZCBhdCBib3RoIHRvcCBhbmQgYm90dG9tLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwYWdlQWN0aW9uUG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZsYWcgaXMgZHJpdmVuIGJ5IHBhZ2VBY3Rpb25Qb3NpdGlvbi4gVGhlIGRlZmF1bHQgcG9zaXRpb24gaXMgdG9wLlxuICAgICAqIFZhbHVlIGlzIHRydWUgZm9yIGJvdGggJ3RvcCcgYW5kICdib3RoJyBvZiBwYWdlQWN0aW9uUG9zaXRpb24uXG4gICAgICovXG4gICAgaGFzVG9wUGFnZUFjdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBmbGFnIGlzIGRyaXZlbiBieSBwYWdlQWN0aW9uIHBvc2l0aW9uLlxuICAgICAqIFZhbHVlIGlzIHRydWUgZm9yIGJvdGggJ2JvdHRvbScgYW5kICdib3RoJyBvZiBwYWdlQWN0aW9uUG9zaXRpb24uXG4gICAgICovXG4gICAgaGFzQm90dG9tUGFnZUFjdGlvbnM6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIFF1ZXJpZXMgYSBwIHRlbXBsYXRlIGlmIGFueVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3BhZ2VBY3Rpb25zJylcbiAgICBhY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBBbnkgU3VjY2VzcywgSW5mbywgRXJyb3IsIG9yIFdhcm4gZm9yIHRoaXMgcGFnZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG5vdGlmaWNhdGlvbnM6IFBhZ2VOb3RpZmljYXRpb25bXTtcblxuXG4gICAgb2JqZWN0U3RhdGVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRSZWdpc3RyeTogQ29tcG9uZW50UmVnaXN0cnksIHBhZ2VMaWZlY3ljbGVTZXJ2aWNlOiBQYWdlTGlmZUN5Y2xlU2VydmljZSlcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgUGFnZVR5cGUuT2JqZWN0LCBjb21wb25lbnRSZWdpc3RyeSwgcGFnZUxpZmVjeWNsZVNlcnZpY2UpO1xuXG4gICAgICAgIC8vIFNldHRpbmcgRGVmYXVsdCBoZWFkZXIgY29tcG9uZW50XG4gICAgICAgIHRoaXMuaGVhZGVyID0gUGFnZUhlYWRlckNvbXBvbmVudDtcbiAgICAgICAgdGhpcy5mb290ZXIgPSBQYWdlRm9vdGVyQ29tcG9uZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgdW5pcXVlIElkIGZvciB0aGlzIG9iamVjdC5cbiAgICAgKlxuICAgICAqL1xuICAgIGdlbmVyYXRlUGFnZUlkKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0VHlwZSArICdfJyArIHRoaXMudGl0bGUgKyAodGhpcy5pZCkgPyAoJ18nICsgdGhpcy5pZCkgOiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb2VzIG15IHBhZ2UgaGF2ZSBwYWdlIG5vdGlmaWNhdGlvbj9cbiAgICAgKlxuICAgICAqL1xuICAgIGhhc05vdGlmaWNhdGlvbnMoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm5vdGlmaWNhdGlvbnMgJiYgdGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCA+IDApO1xuICAgIH1cblxuICAgIGhhc09iamVjdFN0YXRlcygpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMub2JqZWN0U3RhdGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIG15IGxvY2FsIGNvbXBvbmVudHNcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIC8vIE5ldyBDb21wb25lbnQgdHlwZXMgdGhhdCBhcmUgdXNlZCBpbiBjLWluY2x1ZGUtY29tcG9uZW50XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWdpc3RyeS5yZWdpc3RlclR5cGUodGhpcy5oZWFkZXIubmFtZSwgdGhpcy5oZWFkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTmV3IENvbXBvbmVudCB0eXBlcyB0aGF0IGFyZSB1c2VkIGluIGMtaW5jbHVkZS1jb21wb25lbnRcbiAgICAgICAgaWYgKHRoaXMuZm9vdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZ2lzdHJ5LnJlZ2lzdGVyVHlwZSh0aGlzLmZvb3Rlci5uYW1lLCB0aGlzLmZvb3Rlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvKiogbm90aWZ5IHN1YnNjcmliZXJzIG9mIHRoZSBwYWdlIGxpZmVjeWNsZSBzZXJ2aWNlICAqL1xuICAgICAgICB0aGlzLnBhZ2VMaWZlY3ljbGVTZXJ2aWNlLm9uUGFnZUluaXQodGhpcy50aXRsZSk7XG5cbiAgICAgICAgLy8gU2V0dGluZyB0aGUgcGFnZSBhY3Rpb24gcG9zaXRpb24uXG4gICAgICAgIGlmICh0aGlzLnBhZ2VBY3Rpb25Qb3NpdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzVG9wUGFnZUFjdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaGFzQm90dG9tUGFnZUFjdGlvbnMgPSB0cnVlO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlQWN0aW9uUG9zaXRpb24gPT09ICdib3RoJykge1xuXG4gICAgICAgICAgICB0aGlzLmhhc1RvcFBhZ2VBY3Rpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGFzQm90dG9tUGFnZUFjdGlvbnMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm9iamVjdFN0YXRlcykgJiYgdGhpcy5vYmplY3RTdGF0ZXMubGVuZ3RoID4gMVxuICAgICAgICAgICAgJiYgaXNQcmVzZW50KHRoaXMuY3VycmVudFN0YXRlKSkge1xuXG4gICAgICAgICAgICB0aGlzLm9iamVjdFN0YXRlSW5kZXggPSB0aGlzLm9iamVjdFN0YXRlcy5pbmRleE9mKHRoaXMuY3VycmVudFN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlc1snY3VycmVudFN0YXRlJ10pICYmXG4gICAgICAgICAgICBjaGFuZ2VzWydjdXJyZW50U3RhdGUnXS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXNbJ2N1cnJlbnRTdGF0ZSddLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvbnQgbmVlZCB0byBjaGVjayBpZiBvYmplY3RTdGF0ZXMgZXhpc3RzXG4gICAgICAgICAgICB0aGlzLm9iamVjdFN0YXRlSW5kZXggPSB0aGlzLm9iamVjdFN0YXRlcy5pbmRleE9mKHRoaXMuY3VycmVudFN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKVxuICAgIHtcbiAgICAgICAgdGhpcy5wYWdlTGlmZWN5Y2xlU2VydmljZS5vblBhZ2VEZXN0cm95KHRoaXMudGl0bGUpO1xuICAgIH1cbn1cbiJdfQ==