/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { AccordionTab } from 'primeng/primeng';
import { BaseComponent } from '../../core/base.component';
/**
 * Allow developer to override default actions. Must have this declared before class when we
 * want to have this declaration inside the same file.
 */
var SectionActionsComponent = /** @class */ (function () {
    function SectionActionsComponent() {
    }
    SectionActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-section-actions',
                    template: "<ng-content></ng-content> ",
                },] },
    ];
    return SectionActionsComponent;
}());
export { SectionActionsComponent };
/**
 *
 * Section component that implements a section of the page. It's an outline box that
 * has the ability to expand and hide its content.
 *
 * ```ts
 * \@Component({
 *    selector: 'rfx-details' ,
 *    template: `
 *         <aw-section title="Sourcing request info" (onEdit)="onStateChange($event)"
 *                          [editable]="true">
 *
 *                <m-context [object]="rfxEntity.headerInfo"
 *                          [operation]="this.editabilityState.headerInfoOp"
 *                          layout="Inspect"
 *                          uiGroup="HeaderGeneral">
 *                   <m-include-component></m-include-component>
 *               </m-context>
 *           </aw-section>
 *
 *
 *           <aw-section #supplierSection title="Selected suppliers" (onOpen)="onOpen()"
 *                [opened]="false">
 *               <supplier-profile-card></supplier-profile-card>
 *           </aw-section>
 *
 *           <aw-section title="RFQ Details"
 *                       description="Review and update information for suppliers to respond."
 *                       [disableClose]="true">
 *
 *               <aw-subsection title="Event timeline">
 *                   <aw-form-table [useFiveZone]="false" [editable]="true">
 *
 *                       <aw-form-row [label]="'Start Date'" [name]="'startDate'" [size]="'small'"
 *                                   [highlightRow]="true">
 *                           <aw-date-time
 *                               formatName="dateTime"
 *                               name="startDate" [value]="rfxEntity.created"
 *                               [showTime]="true"></aw-date-time>
 *                       </aw-form-row>
 *                   </aw-form-table>
 *               </aw-subsection>
 *          </aw-section>
 *    `
 *    })
 *    export class MyPage
 *    {
 *
 *        constructor ()
 *        {
 *        }
 *
 *    }
 *
 * ```
 *
 * Section component also supports editability modes and if enabled it will render action buttons
 * in the footer. Developer can also override default behavior and provide custom actions.
 *
 *
 * e.g:
 *
 * ```
 *      <aw-section [title]="title" [editable]="true"
 *                          (onCancelAction)="someHandler1($event)"
 *                          (onSaveAction)="someHandler2($event)" >
 *              section content
 *
 *
 *   </aw-section>
 *
 * ```
 *
 * or custom action buttons:
 *
 *
 * ```html
 *
 *       <aw-section-actions>
 *                      <aw-button >
 *                            ButtonTest1
 *                      </aw-button>
 *                      <aw-button>
 *                            ButtonTest2
 *                      </aw-button>
 *     </aw-section-actions>
 *
 * ```
 *
 *
 * There are two edit modes
 *  # Default
 *      Renders action buttons in the footers and emit actions to the application
 *
 *  # External
 *     No action buttons are shown in the footer and behavior is handled by application. Only event
 *     is emited.
 *
 *
 *  e.g:
 *
 *  ```ts
 *
 *      <aw-section title="User Information" (onEdit)="onAddSomething($event)"
 *                  [editable]="true" [editMode]="'external'" >
 *                  <div>
 *                      Content
 *                  </div>
 *      </aw-section>
 *
 *  ```
 *
 * Note: When using editing mode you have to call at the end of the editing cycle method
 * `completeEditing()` to commit editing which changes internal state of the Section.
 *
 *
 *
 */
var SectionComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SectionComponent, _super);
    function SectionComponent(element, env) {
        var _this = _super.call(this, env) || this;
        _this.element = element;
        _this.env = env;
        /**
         * Should this section be opened at the start. Default is opened.
         */
        _this.opened = true;
        /**
         * Whether this section can be closed or not.
         *
         */
        _this.disableClose = false;
        /**
         * Whether this section is in EditState or not.
         *
         * When in editing state and we show "Cancel / Save" button developer needs use this binding
         * to control the state.
         */
        _this.editState = false;
        /**
         * Current Editing mode. Tells the components if its its default behavior or driven by
         * application using this component.
         *
         * {\@see EditMode}
         *
         */
        _this.editMode = 'default';
        /**
         * Developer can provide custom Edit action icon that will appear in the right top corner
         */
        _this.actionIcon = 'icon-edit';
        /**
         * Event emitted when the section is fully opened.
         */
        _this.onOpen = new EventEmitter();
        /**
         * Event emitted when the section is fully closed.
         */
        _this.onClose = new EventEmitter();
        /**
         * Edit state to broadcast state of current section
         */
        _this.onEdit = new EventEmitter();
        /**
         * When in editing state and default buttons are rendered on click broadcast Cancel action
         */
        _this.onCancelAction = new EventEmitter();
        /**
         * When in editing state and default buttons are rendered on click broadcast Save action
         */
        _this.onSaveAction = new EventEmitter();
        _this.onEditingComplete = new EventEmitter();
        _this.editable = false;
        return _this;
    }
    /**
     * @return {?}
     */
    SectionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        // If I have not header, then I can't close the section.
        if (!this.isHeaderDisplayed()) {
            this.disableClose = true;
        }
        // If I can't close the section, then it should default open.
        if (this.disableClose) {
            this.opened = true;
        }
        // initialize the expanded state.
        this.expanded = this.opened;
    };
    /**
     * Don't display header area if I don't have title and description.
     *
     * @return {?}
     */
    SectionComponent.prototype.isHeaderDisplayed = /**
     * Don't display header area if I don't have title and description.
     *
     * @return {?}
     */
    function () {
        return (isPresent(this.title) || isPresent(this.description));
    };
    /**
     * Css Class that control the look and feel for section component.
     */
    /**
     * Css Class that control the look and feel for section component.
     * @return {?}
     */
    SectionComponent.prototype.aClass = /**
     * Css Class that control the look and feel for section component.
     * @return {?}
     */
    function () {
        if (!this.isHeaderDisplayed()) {
            return 'section-no-header';
        }
        return '';
    };
    /**
     * Since we introduced buttons and editState the decision on when to exit editing mode
     * should be on the developer using this component therefore only startEditing
     *
     */
    /**
     * Since we introduced buttons and editState the decision on when to exit editing mode
     * should be on the developer using this component therefore only startEditing
     *
     * @param {?} $event
     * @return {?}
     */
    SectionComponent.prototype.onEditAction = /**
     * Since we introduced buttons and editState the decision on when to exit editing mode
     * should be on the developer using this component therefore only startEditing
     *
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        // when in editing make sure we dont switch state as there can be some Form errors
        // which needs to be handled by developer and only then change the editState
        if (!this.editState) {
            this.editState = !this.editState;
            var /** @type {?} */ state = (this.editState) ? 'inEdit' : 'notInEdit';
            this.onEdit.emit(state);
            this.open();
        }
        // prevent the original event from bubbling up. Because the edit icon is inside
        // the header. If the click even is bubbled up, this event will cause the section to
        // expand or collapse.
        if (isPresent($event.event)) {
            $event.event.stopPropagation();
            $event.event.preventDefault();
        }
    };
    /**
     * @return {?}
     */
    SectionComponent.prototype.hasDescription = /**
     * @return {?}
     */
    function () {
        return isPresent(this.description);
    };
    /**
     * Open this section, if it's already open, will do nothing.
     */
    /**
     * Open this section, if it's already open, will do nothing.
     * @param {?=} event
     * @return {?}
     */
    SectionComponent.prototype.open = /**
     * Open this section, if it's already open, will do nothing.
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        if (!this.expanded) {
            this.accordionTab.toggle(event);
        }
    };
    /**
     * Close this section, if it's already close, will do nothing.
     */
    /**
     * Close this section, if it's already close, will do nothing.
     * @param {?} event
     * @return {?}
     */
    SectionComponent.prototype.close = /**
     * Close this section, if it's already close, will do nothing.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.expanded) {
            this.accordionTab.toggle(event);
        }
    };
    /**
     * Callback to be invoked when accordion is opened
     *
     */
    /**
     * Callback to be invoked when accordion is opened
     *
     * @param {?} event
     * @return {?}
     */
    SectionComponent.prototype.onSectionOpen = /**
     * Callback to be invoked when accordion is opened
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.expanded = true;
        this.onOpen.emit('open');
    };
    /**
     * Callback to be invoked when accordion is closed
     *
     */
    /**
     * Callback to be invoked when accordion is closed
     *
     * @param {?} event
     * @return {?}
     */
    SectionComponent.prototype.onSectionClose = /**
     * Callback to be invoked when accordion is closed
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.expanded = false;
        this.onClose.emit('close');
    };
    /**
     *
     * Tells us if we need to render application defined custom actions
     *
     */
    /**
     *
     * Tells us if we need to render application defined custom actions
     *
     * @return {?}
     */
    SectionComponent.prototype.hasCustomActions = /**
     *
     * Tells us if we need to render application defined custom actions
     *
     * @return {?}
     */
    function () {
        return isPresent(this.customActions);
    };
    /**
     * Emit the editing state back to non-editable
     */
    /**
     * Emit the editing state back to non-editable
     * @return {?}
     */
    SectionComponent.prototype.completeEditing = /**
     * Emit the editing state back to non-editable
     * @return {?}
     */
    function () {
        this.editState = false;
        this.onEditingComplete.emit(this.editState);
    };
    SectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-section',
                    template: "<div class=\"ui-g-12 section-container\"\n     [class.editing]=\"editable && editState && editMode === 'default'\">\n\n    <p-accordion (onOpen)=\"onSectionOpen($event)\" (onClose)=\"onSectionClose($event)\"\n                 [styleClass]=\"aClass()\">\n        <p-accordionTab #accordionTab [selected]=\"opened\" [disabled]=\"disableClose\">\n            <p-header>\n                <!-- title and description -->\n                <div class=\"section-header-container\">\n                    <div class=\"section-title\">{{title}}</div>\n                    <div *ngIf=\"hasDescription()\" class=\"section-description\">{{description}}</div>\n\n                    <!-- actions: Hide when in editing and editMode is default -->\n                    <div *ngIf=\"(editable && !editState && editMode === 'default') ||\n                        (editable && editMode === 'external')\"\n                         class=\"section-actions\">\n                        <aw-hyperlink (action)=\"onEditAction($event)\">\n                            <i class=\"sap-icon section-edit-action\" [ngClass]=\"actionIcon\"></i>\n                        </aw-hyperlink>\n                    </div>\n                </div>\n            </p-header>\n\n            <ng-content></ng-content>\n        </p-accordionTab>\n    </p-accordion>\n    <!--\n        need to put it outside of p-accordion otherwise button will inherit different\n        color scheme\n    -->\n    <div class=\"section-footer-container\" *ngIf=\"editable && editState &&\n            editMode === 'default'\">\n        <div class=\"footer-actions\">\n\n            <ng-template [ngIf]=\"!hasCustomActions()\">\n                <aw-button [style]=\"'secondary'\" size=\"small\"\n                           (action)=\"onCancelAction.emit($event)\">\n                    Cancel\n                </aw-button>\n                <aw-button size=\"small\" (action)=\"onSaveAction.emit($event)\">\n                    Save\n                </aw-button>\n            </ng-template>\n\n            <ng-content select=\"aw-section-actions\"></ng-content>\n        </div>\n    </div>\n</div>\n",
                    styles: [".section-header-container{position:relative}.section-container{margin:10px 0;background-color:#fff;padding:.2em .5em;border:2px dashed transparent}.section-container.editing{border-color:#199de0}.section-container ::ng-deep .ui-accordion-header>a{display:flex}.section-container ::ng-deep .ui-accordion-header>a .ui-accordion-toggle-icon{flex:0 0 30px;padding-top:2px}.section-container ::ng-deep .ui-accordion-header>a p-header{flex:1 0}.section-container /deep/ .ui-accordion-header.ui-state-disabled{opacity:1}.section-title{font-size:1.1em}.section-description{font-size:.9em;padding:.6em 0 .2em}.section-footer-container{margin:1em 2em 0;padding:.8em 0 1.5em .8em;border-top:1px solid #d7d7d7}.section-footer-container .footer-actions{display:inline-block;text-align:right;width:100%}.section-actions{position:absolute;top:0;right:0;z-index:1}.section-actions /deep/ a.link,.section-actions /deep/ a.link:hover{padding:0;text-decoration:none}.section-edit-action{font-size:1.5em;position:relative;padding:.1em 0 .1em .5em;cursor:pointer}.section-edit-action.icon-edit{font-size:1.4em}.section-container /deep/ .ui-accordion-header{color:#363636;border:none;background:#fff!important;padding:0 1em}.section-container /deep/ .ui-accordion-content{border:none;padding:1em 2em}.section-container /deep/ .ui-accordion-header /deep/ a[role=tab]{padding:.75em 0;text-decoration:none}.section-container /deep/ .ui-accordion-header.ui-state-active /deep/ a[role=tab]{border-bottom:1px solid #d7d7d7;color:#363636}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header{height:1px}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header.ui-state-active /deep/ a[role=tab]{border-bottom:none}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header .section-edit-action{cursor:pointer!important}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-down,:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-right{font-family:\"SAP icon fonts\";font-size:1.1em;top:.8em;left:.1em;color:#767676;margin-top:0}:host /deep/ .ui-accordion-header.ui-state-disabled /deep/ .fa,:host /deep/ .ui-accordion-header.ui-state-disabled /deep/ .pi{display:none}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-right:before{content:\"\\e1ed\"}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-down:before{content:\"\\e1ef\"}"]
                },] },
    ];
    /** @nocollapse */
    SectionComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Environment }
    ]; };
    SectionComponent.propDecorators = {
        title: [{ type: Input }],
        description: [{ type: Input }],
        opened: [{ type: Input }],
        disableClose: [{ type: Input }],
        editState: [{ type: Input }],
        editMode: [{ type: Input }],
        actionIcon: [{ type: Input }],
        onOpen: [{ type: Output }],
        onClose: [{ type: Output }],
        onEdit: [{ type: Output }],
        onCancelAction: [{ type: Output }],
        onSaveAction: [{ type: Output }],
        onEditingComplete: [{ type: Output }],
        accordionTab: [{ type: ViewChild, args: ['accordionTab',] }],
        customActions: [{ type: ContentChild, args: [SectionActionsComponent,] }]
    };
    return SectionComponent;
}(BaseComponent));
export { SectionComponent };
function SectionComponent_tsickle_Closure_declarations() {
    /**
     * The title of this section
     * @type {?}
     */
    SectionComponent.prototype.title;
    /**
     * The description of this section.
     * @type {?}
     */
    SectionComponent.prototype.description;
    /**
     * Should this section be opened at the start. Default is opened.
     * @type {?}
     */
    SectionComponent.prototype.opened;
    /**
     * Whether this section can be closed or not.
     *
     * @type {?}
     */
    SectionComponent.prototype.disableClose;
    /**
     * Whether this section is in EditState or not.
     *
     * When in editing state and we show "Cancel / Save" button developer needs use this binding
     * to control the state.
     * @type {?}
     */
    SectionComponent.prototype.editState;
    /**
     * Current Editing mode. Tells the components if its its default behavior or driven by
     * application using this component.
     *
     * {\@see EditMode}
     *
     * @type {?}
     */
    SectionComponent.prototype.editMode;
    /**
     * Developer can provide custom Edit action icon that will appear in the right top corner
     * @type {?}
     */
    SectionComponent.prototype.actionIcon;
    /**
     * Event emitted when the section is fully opened.
     * @type {?}
     */
    SectionComponent.prototype.onOpen;
    /**
     * Event emitted when the section is fully closed.
     * @type {?}
     */
    SectionComponent.prototype.onClose;
    /**
     * Edit state to broadcast state of current section
     * @type {?}
     */
    SectionComponent.prototype.onEdit;
    /**
     * When in editing state and default buttons are rendered on click broadcast Cancel action
     * @type {?}
     */
    SectionComponent.prototype.onCancelAction;
    /**
     * When in editing state and default buttons are rendered on click broadcast Save action
     * @type {?}
     */
    SectionComponent.prototype.onSaveAction;
    /** @type {?} */
    SectionComponent.prototype.onEditingComplete;
    /**
     * Local variable on whether this section is expanded or not.
     * Differs from 'opened'. opened is an input parameter and it doesn't track
     * current section expanded state.
     * @type {?}
     */
    SectionComponent.prototype.expanded;
    /**
     * internal accordionTab
     * @type {?}
     */
    SectionComponent.prototype.accordionTab;
    /**
     * Save reference to developer's defined actions so if we can hide default ones
     * @type {?}
     */
    SectionComponent.prototype.customActions;
    /** @type {?} */
    SectionComponent.prototype.element;
    /** @type {?} */
    SectionComponent.prototype.env;
}
var SubSectionComponent = /** @class */ (function () {
    function SubSectionComponent() {
    }
    SubSectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-subsection',
                    template: "\n                    <h4 class=\"subsection-title\">{{title}}</h4>\n                    <ng-content></ng-content>\n                 ",
                    styles: ['.subsection-title {color: #363636; }']
                },] },
    ];
    SubSectionComponent.propDecorators = {
        title: [{ type: Input }]
    };
    return SubSectionComponent;
}());
export { SubSectionComponent };
function SubSectionComponent_tsickle_Closure_declarations() {
    /**
     * The title of this sub section
     * @type {?}
     */
    SubSectionComponent.prototype.title;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zZWN0aW9uL3NlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7O2dCQU92RCxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLDRCQUE0QjtpQkFDekM7O2tDQXpDRDs7U0EwQ2EsdUJBQXVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpTEUsNENBQWE7SUE4Ry9DLDBCQUFzQixPQUFtQixFQUFTLEdBQWdCO1FBQWxFLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBRWI7UUFKcUIsYUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7Ozs7dUJBM0ZoRCxJQUFJOzs7Ozs2QkFNRSxLQUFLOzs7Ozs7OzBCQVNSLEtBQUs7Ozs7Ozs7O3lCQVdMLFNBQVM7Ozs7MkJBT1QsV0FBVzs7Ozt1QkFNSixJQUFJLFlBQVksRUFBRTs7Ozt3QkFNakIsSUFBSSxZQUFZLEVBQUU7Ozs7dUJBTW5CLElBQUksWUFBWSxFQUFF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QW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0FjY29yZGlvblRhYn0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiBBbGxvdyBkZXZlbG9wZXIgdG8gb3ZlcnJpZGUgZGVmYXVsdCBhY3Rpb25zLiBNdXN0IGhhdmUgdGhpcyBkZWNsYXJlZCBiZWZvcmUgY2xhc3Mgd2hlbiB3ZVxuICogd2FudCB0byBoYXZlIHRoaXMgZGVjbGFyYXRpb24gaW5zaWRlIHRoZSBzYW1lIGZpbGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctc2VjdGlvbi1hY3Rpb25zJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgU2VjdGlvbkFjdGlvbnNDb21wb25lbnRcbntcblxufVxuXG5cbi8qKlxuICpcbiAqIFNlY3Rpb24gY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyBhIHNlY3Rpb24gb2YgdGhlIHBhZ2UuIEl0J3MgYW4gb3V0bGluZSBib3ggdGhhdFxuICogaGFzIHRoZSBhYmlsaXR5IHRvIGV4cGFuZCBhbmQgaGlkZSBpdHMgY29udGVudC5cbiAqXG4gKiBgYGB0c1xuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdyZngtZGV0YWlscycgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgPGF3LXNlY3Rpb24gdGl0bGU9XCJTb3VyY2luZyByZXF1ZXN0IGluZm9cIiAob25FZGl0KT1cIm9uU3RhdGVDaGFuZ2UoJGV2ZW50KVwiXG4gICogICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZV09XCJ0cnVlXCI+XG4gKlxuICogICAgICAgICAgICAgICAgPG0tY29udGV4dCBbb2JqZWN0XT1cInJmeEVudGl0eS5oZWFkZXJJbmZvXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBbb3BlcmF0aW9uXT1cInRoaXMuZWRpdGFiaWxpdHlTdGF0ZS5oZWFkZXJJbmZvT3BcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dD1cIkluc3BlY3RcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHVpR3JvdXA9XCJIZWFkZXJHZW5lcmFsXCI+XG4gKiAgICAgICAgICAgICAgICAgICA8bS1pbmNsdWRlLWNvbXBvbmVudD48L20taW5jbHVkZS1jb21wb25lbnQ+XG4gKiAgICAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuICogICAgICAgICAgIDwvYXctc2VjdGlvbj5cbiAqXG4gKlxuICogICAgICAgICAgIDxhdy1zZWN0aW9uICNzdXBwbGllclNlY3Rpb24gdGl0bGU9XCJTZWxlY3RlZCBzdXBwbGllcnNcIiAob25PcGVuKT1cIm9uT3BlbigpXCJcbiAgICogICAgICAgICAgICAgICAgW29wZW5lZF09XCJmYWxzZVwiPlxuICogICAgICAgICAgICAgICA8c3VwcGxpZXItcHJvZmlsZS1jYXJkPjwvc3VwcGxpZXItcHJvZmlsZS1jYXJkPlxuICogICAgICAgICAgIDwvYXctc2VjdGlvbj5cbiAqXG4gKiAgICAgICAgICAgPGF3LXNlY3Rpb24gdGl0bGU9XCJSRlEgRGV0YWlsc1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJSZXZpZXcgYW5kIHVwZGF0ZSBpbmZvcm1hdGlvbiBmb3Igc3VwcGxpZXJzIHRvIHJlc3BvbmQuXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZUNsb3NlXT1cInRydWVcIj5cbiAqXG4gKiAgICAgICAgICAgICAgIDxhdy1zdWJzZWN0aW9uIHRpdGxlPVwiRXZlbnQgdGltZWxpbmVcIj5cbiAqICAgICAgICAgICAgICAgICAgIDxhdy1mb3JtLXRhYmxlIFt1c2VGaXZlWm9uZV09XCJmYWxzZVwiIFtlZGl0YWJsZV09XCJ0cnVlXCI+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgIDxhdy1mb3JtLXJvdyBbbGFiZWxdPVwiJ1N0YXJ0IERhdGUnXCIgW25hbWVdPVwiJ3N0YXJ0RGF0ZSdcIiBbc2l6ZV09XCInc21hbGwnXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaGlnaGxpZ2h0Um93XT1cInRydWVcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWRhdGUtdGltZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0TmFtZT1cImRhdGVUaW1lXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzdGFydERhdGVcIiBbdmFsdWVdPVwicmZ4RW50aXR5LmNyZWF0ZWRcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Nob3dUaW1lXT1cInRydWVcIj48L2F3LWRhdGUtdGltZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWZvcm0tcm93PlxuICogICAgICAgICAgICAgICAgICAgPC9hdy1mb3JtLXRhYmxlPlxuICogICAgICAgICAgICAgICA8L2F3LXN1YnNlY3Rpb24+XG4gKiAgICAgICAgICA8L2F3LXNlY3Rpb24+XG4gKiAgICBgXG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15UGFnZVxuICogICAge1xuICpcbiAqICAgICAgICBjb25zdHJ1Y3RvciAoKVxuICogICAgICAgIHtcbiAqICAgICAgICB9XG4gKlxuICogICAgfVxuICpcbiAqIGBgYFxuICpcbiAqIFNlY3Rpb24gY29tcG9uZW50IGFsc28gc3VwcG9ydHMgZWRpdGFiaWxpdHkgbW9kZXMgYW5kIGlmIGVuYWJsZWQgaXQgd2lsbCByZW5kZXIgYWN0aW9uIGJ1dHRvbnNcbiAqIGluIHRoZSBmb290ZXIuIERldmVsb3BlciBjYW4gYWxzbyBvdmVycmlkZSBkZWZhdWx0IGJlaGF2aW9yIGFuZCBwcm92aWRlIGN1c3RvbSBhY3Rpb25zLlxuICpcbiAqXG4gKiBlLmc6XG4gKlxuICogYGBgXG4gKiAgICAgIDxhdy1zZWN0aW9uIFt0aXRsZV09XCJ0aXRsZVwiIFtlZGl0YWJsZV09XCJ0cnVlXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAob25DYW5jZWxBY3Rpb24pPVwic29tZUhhbmRsZXIxKCRldmVudClcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIChvblNhdmVBY3Rpb24pPVwic29tZUhhbmRsZXIyKCRldmVudClcIiA+XG4gKiAgICAgICAgICAgICAgc2VjdGlvbiBjb250ZW50XG4gKlxuICpcbiAqICAgPC9hdy1zZWN0aW9uPlxuICpcbiAqIGBgYFxuICpcbiAqIG9yIGN1c3RvbSBhY3Rpb24gYnV0dG9uczpcbiAqXG4gKlxuICogYGBgaHRtbFxuICpcbiAqICAgICAgIDxhdy1zZWN0aW9uLWFjdGlvbnM+XG4gKiAgICAgICAgICAgICAgICAgICAgICA8YXctYnV0dG9uID5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1dHRvblRlc3QxXG4gKiAgICAgICAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAqICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdXR0b25UZXN0MlxuICogICAgICAgICAgICAgICAgICAgICAgPC9hdy1idXR0b24+XG4gKiAgICAgPC9hdy1zZWN0aW9uLWFjdGlvbnM+XG4gKlxuICogYGBgXG4gKlxuICpcbiAqIFRoZXJlIGFyZSB0d28gZWRpdCBtb2Rlc1xuICogICMgRGVmYXVsdFxuICogICAgICBSZW5kZXJzIGFjdGlvbiBidXR0b25zIGluIHRoZSBmb290ZXJzIGFuZCBlbWl0IGFjdGlvbnMgdG8gdGhlIGFwcGxpY2F0aW9uXG4gKlxuICogICMgRXh0ZXJuYWxcbiAqICAgICBObyBhY3Rpb24gYnV0dG9ucyBhcmUgc2hvd24gaW4gdGhlIGZvb3RlciBhbmQgYmVoYXZpb3IgaXMgaGFuZGxlZCBieSBhcHBsaWNhdGlvbi4gT25seSBldmVudFxuICogICAgIGlzIGVtaXRlZC5cbiAqXG4gKlxuICogIGUuZzpcbiAqXG4gKiAgYGBgdHNcbiAqXG4gKiAgICAgIDxhdy1zZWN0aW9uIHRpdGxlPVwiVXNlciBJbmZvcm1hdGlvblwiIChvbkVkaXQpPVwib25BZGRTb21ldGhpbmcoJGV2ZW50KVwiXG4gKiAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZV09XCJ0cnVlXCIgW2VkaXRNb2RlXT1cIidleHRlcm5hbCdcIiA+XG4gKiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gKiAgICAgICAgICAgICAgICAgICAgICBDb250ZW50XG4gKiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICA8L2F3LXNlY3Rpb24+XG4gKlxuICogIGBgYFxuICpcbiAqIE5vdGU6IFdoZW4gdXNpbmcgZWRpdGluZyBtb2RlIHlvdSBoYXZlIHRvIGNhbGwgYXQgdGhlIGVuZCBvZiB0aGUgZWRpdGluZyBjeWNsZSBtZXRob2RcbiAqIGBjb21wbGV0ZUVkaXRpbmcoKWAgdG8gY29tbWl0IGVkaXRpbmcgd2hpY2ggY2hhbmdlcyBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgU2VjdGlvbi5cbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1zZWN0aW9uJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHNlY3Rpb24tY29udGFpbmVyXCJcbiAgICAgW2NsYXNzLmVkaXRpbmddPVwiZWRpdGFibGUgJiYgZWRpdFN0YXRlICYmIGVkaXRNb2RlID09PSAnZGVmYXVsdCdcIj5cblxuICAgIDxwLWFjY29yZGlvbiAob25PcGVuKT1cIm9uU2VjdGlvbk9wZW4oJGV2ZW50KVwiIChvbkNsb3NlKT1cIm9uU2VjdGlvbkNsb3NlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICBbc3R5bGVDbGFzc109XCJhQ2xhc3MoKVwiPlxuICAgICAgICA8cC1hY2NvcmRpb25UYWIgI2FjY29yZGlvblRhYiBbc2VsZWN0ZWRdPVwib3BlbmVkXCIgW2Rpc2FibGVkXT1cImRpc2FibGVDbG9zZVwiPlxuICAgICAgICAgICAgPHAtaGVhZGVyPlxuICAgICAgICAgICAgICAgIDwhLS0gdGl0bGUgYW5kIGRlc2NyaXB0aW9uIC0tPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWhlYWRlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdGl0bGVcIj57e3RpdGxlfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImhhc0Rlc2NyaXB0aW9uKClcIiBjbGFzcz1cInNlY3Rpb24tZGVzY3JpcHRpb25cIj57e2Rlc2NyaXB0aW9ufX08L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8IS0tIGFjdGlvbnM6IEhpZGUgd2hlbiBpbiBlZGl0aW5nIGFuZCBlZGl0TW9kZSBpcyBkZWZhdWx0IC0tPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiKGVkaXRhYmxlICYmICFlZGl0U3RhdGUgJiYgZWRpdE1vZGUgPT09ICdkZWZhdWx0JykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlZGl0YWJsZSAmJiBlZGl0TW9kZSA9PT0gJ2V4dGVybmFsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2VjdGlvbi1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YXctaHlwZXJsaW5rIChhY3Rpb24pPVwib25FZGl0QWN0aW9uKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInNhcC1pY29uIHNlY3Rpb24tZWRpdC1hY3Rpb25cIiBbbmdDbGFzc109XCJhY3Rpb25JY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1oeXBlcmxpbms+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9wLWhlYWRlcj5cblxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3AtYWNjb3JkaW9uVGFiPlxuICAgIDwvcC1hY2NvcmRpb24+XG4gICAgPCEtLVxuICAgICAgICBuZWVkIHRvIHB1dCBpdCBvdXRzaWRlIG9mIHAtYWNjb3JkaW9uIG90aGVyd2lzZSBidXR0b24gd2lsbCBpbmhlcml0IGRpZmZlcmVudFxuICAgICAgICBjb2xvciBzY2hlbWVcbiAgICAtLT5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1mb290ZXItY29udGFpbmVyXCIgKm5nSWY9XCJlZGl0YWJsZSAmJiBlZGl0U3RhdGUgJiZcbiAgICAgICAgICAgIGVkaXRNb2RlID09PSAnZGVmYXVsdCdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci1hY3Rpb25zXCI+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaGFzQ3VzdG9tQWN0aW9ucygpXCI+XG4gICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiBbc3R5bGVdPVwiJ3NlY29uZGFyeSdcIiBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFjdGlvbik9XCJvbkNhbmNlbEFjdGlvbi5lbWl0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgICAgICAgPC9hdy1idXR0b24+XG4gICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiBzaXplPVwic21hbGxcIiAoYWN0aW9uKT1cIm9uU2F2ZUFjdGlvbi5lbWl0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgU2F2ZVxuICAgICAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYXctc2VjdGlvbi1hY3Rpb25zXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgLnNlY3Rpb24taGVhZGVyLWNvbnRhaW5lcntwb3NpdGlvbjpyZWxhdGl2ZX0uc2VjdGlvbi1jb250YWluZXJ7bWFyZ2luOjEwcHggMDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzouMmVtIC41ZW07Ym9yZGVyOjJweCBkYXNoZWQgdHJhbnNwYXJlbnR9LnNlY3Rpb24tY29udGFpbmVyLmVkaXRpbmd7Ym9yZGVyLWNvbG9yOiMxOTlkZTB9LnNlY3Rpb24tY29udGFpbmVyIDo6bmctZGVlcCAudWktYWNjb3JkaW9uLWhlYWRlcj5he2Rpc3BsYXk6ZmxleH0uc2VjdGlvbi1jb250YWluZXIgOjpuZy1kZWVwIC51aS1hY2NvcmRpb24taGVhZGVyPmEgLnVpLWFjY29yZGlvbi10b2dnbGUtaWNvbntmbGV4OjAgMCAzMHB4O3BhZGRpbmctdG9wOjJweH0uc2VjdGlvbi1jb250YWluZXIgOjpuZy1kZWVwIC51aS1hY2NvcmRpb24taGVhZGVyPmEgcC1oZWFkZXJ7ZmxleDoxIDB9LnNlY3Rpb24tY29udGFpbmVyIC9kZWVwLyAudWktYWNjb3JkaW9uLWhlYWRlci51aS1zdGF0ZS1kaXNhYmxlZHtvcGFjaXR5OjF9LnNlY3Rpb24tdGl0bGV7Zm9udC1zaXplOjEuMWVtfS5zZWN0aW9uLWRlc2NyaXB0aW9ue2ZvbnQtc2l6ZTouOWVtO3BhZGRpbmc6LjZlbSAwIC4yZW19LnNlY3Rpb24tZm9vdGVyLWNvbnRhaW5lcnttYXJnaW46MWVtIDJlbSAwO3BhZGRpbmc6LjhlbSAwIDEuNWVtIC44ZW07Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q3ZDdkN30uc2VjdGlvbi1mb290ZXItY29udGFpbmVyIC5mb290ZXItYWN0aW9uc3tkaXNwbGF5OmlubGluZS1ibG9jazt0ZXh0LWFsaWduOnJpZ2h0O3dpZHRoOjEwMCV9LnNlY3Rpb24tYWN0aW9uc3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO3otaW5kZXg6MX0uc2VjdGlvbi1hY3Rpb25zIC9kZWVwLyBhLmxpbmssLnNlY3Rpb24tYWN0aW9ucyAvZGVlcC8gYS5saW5rOmhvdmVye3BhZGRpbmc6MDt0ZXh0LWRlY29yYXRpb246bm9uZX0uc2VjdGlvbi1lZGl0LWFjdGlvbntmb250LXNpemU6MS41ZW07cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzouMWVtIDAgLjFlbSAuNWVtO2N1cnNvcjpwb2ludGVyfS5zZWN0aW9uLWVkaXQtYWN0aW9uLmljb24tZWRpdHtmb250LXNpemU6MS40ZW19LnNlY3Rpb24tY29udGFpbmVyIC9kZWVwLyAudWktYWNjb3JkaW9uLWhlYWRlcntjb2xvcjojMzYzNjM2O2JvcmRlcjpub25lO2JhY2tncm91bmQ6I2ZmZiFpbXBvcnRhbnQ7cGFkZGluZzowIDFlbX0uc2VjdGlvbi1jb250YWluZXIgL2RlZXAvIC51aS1hY2NvcmRpb24tY29udGVudHtib3JkZXI6bm9uZTtwYWRkaW5nOjFlbSAyZW19LnNlY3Rpb24tY29udGFpbmVyIC9kZWVwLyAudWktYWNjb3JkaW9uLWhlYWRlciAvZGVlcC8gYVtyb2xlPXRhYl17cGFkZGluZzouNzVlbSAwO3RleHQtZGVjb3JhdGlvbjpub25lfS5zZWN0aW9uLWNvbnRhaW5lciAvZGVlcC8gLnVpLWFjY29yZGlvbi1oZWFkZXIudWktc3RhdGUtYWN0aXZlIC9kZWVwLyBhW3JvbGU9dGFiXXtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZDdkN2Q3O2NvbG9yOiMzNjM2MzZ9LnNlY3Rpb24tY29udGFpbmVyIC9kZWVwLyAuc2VjdGlvbi1uby1oZWFkZXIgL2RlZXAvIC51aS1hY2NvcmRpb24taGVhZGVye2hlaWdodDoxcHh9LnNlY3Rpb24tY29udGFpbmVyIC9kZWVwLyAuc2VjdGlvbi1uby1oZWFkZXIgL2RlZXAvIC51aS1hY2NvcmRpb24taGVhZGVyLnVpLXN0YXRlLWFjdGl2ZSAvZGVlcC8gYVtyb2xlPXRhYl17Ym9yZGVyLWJvdHRvbTpub25lfS5zZWN0aW9uLWNvbnRhaW5lciAvZGVlcC8gLnNlY3Rpb24tbm8taGVhZGVyIC9kZWVwLyAudWktYWNjb3JkaW9uLWhlYWRlciAuc2VjdGlvbi1lZGl0LWFjdGlvbntjdXJzb3I6cG9pbnRlciFpbXBvcnRhbnR9Omhvc3QgL2RlZXAvIC51aS1hY2NvcmRpb24taGVhZGVyIC9kZWVwLyAucGkucGktY2FyZXQtZG93biw6aG9zdCAvZGVlcC8gLnVpLWFjY29yZGlvbi1oZWFkZXIgL2RlZXAvIC5waS5waS1jYXJldC1yaWdodHtmb250LWZhbWlseTpcIlNBUCBpY29uIGZvbnRzXCI7Zm9udC1zaXplOjEuMWVtO3RvcDouOGVtO2xlZnQ6LjFlbTtjb2xvcjojNzY3Njc2O21hcmdpbi10b3A6MH06aG9zdCAvZGVlcC8gLnVpLWFjY29yZGlvbi1oZWFkZXIudWktc3RhdGUtZGlzYWJsZWQgL2RlZXAvIC5mYSw6aG9zdCAvZGVlcC8gLnVpLWFjY29yZGlvbi1oZWFkZXIudWktc3RhdGUtZGlzYWJsZWQgL2RlZXAvIC5waXtkaXNwbGF5Om5vbmV9Omhvc3QgL2RlZXAvIC51aS1hY2NvcmRpb24taGVhZGVyIC9kZWVwLyAucGkucGktY2FyZXQtcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTFlZFwifTpob3N0IC9kZWVwLyAudWktYWNjb3JkaW9uLWhlYWRlciAvZGVlcC8gLnBpLnBpLWNhcmV0LWRvd246YmVmb3Jle2NvbnRlbnQ6XCJcXFxcZTFlZlwifWBdXG59KVxuZXhwb3J0IGNsYXNzIFNlY3Rpb25Db21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGl0bGUgb2YgdGhpcyBzZWN0aW9uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRlc2NyaXB0aW9uIG9mIHRoaXMgc2VjdGlvbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTaG91bGQgdGhpcyBzZWN0aW9uIGJlIG9wZW5lZCBhdCB0aGUgc3RhcnQuIERlZmF1bHQgaXMgb3BlbmVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb3BlbmVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhpcyBzZWN0aW9uIGNhbiBiZSBjbG9zZWQgb3Igbm90LlxuICAgICAqKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVDbG9zZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGlzIHNlY3Rpb24gaXMgaW4gRWRpdFN0YXRlIG9yIG5vdC5cbiAgICAgKlxuICAgICAqIFdoZW4gaW4gZWRpdGluZyBzdGF0ZSBhbmQgd2Ugc2hvdyBcIkNhbmNlbCAvIFNhdmVcIiBidXR0b24gZGV2ZWxvcGVyIG5lZWRzIHVzZSB0aGlzIGJpbmRpbmdcbiAgICAgKiB0byBjb250cm9sIHRoZSBzdGF0ZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGVkaXRTdGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IEVkaXRpbmcgbW9kZS4gVGVsbHMgdGhlIGNvbXBvbmVudHMgaWYgaXRzIGl0cyBkZWZhdWx0IGJlaGF2aW9yIG9yIGRyaXZlbiBieVxuICAgICAqIGFwcGxpY2F0aW9uIHVzaW5nIHRoaXMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICoge0BzZWUgRWRpdE1vZGV9XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGVkaXRNb2RlOiBFZGl0TW9kZSA9ICdkZWZhdWx0JztcblxuXG4gICAgLyoqXG4gICAgICogRGV2ZWxvcGVyIGNhbiBwcm92aWRlIGN1c3RvbSBFZGl0IGFjdGlvbiBpY29uIHRoYXQgd2lsbCBhcHBlYXIgaW4gdGhlIHJpZ2h0IHRvcCBjb3JuZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFjdGlvbkljb246IHN0cmluZyA9ICdpY29uLWVkaXQnO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWN0aW9uIGlzIGZ1bGx5IG9wZW5lZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbk9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWN0aW9uIGlzIGZ1bGx5IGNsb3NlZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEVkaXQgc3RhdGUgdG8gYnJvYWRjYXN0IHN0YXRlIG9mIGN1cnJlbnQgc2VjdGlvblxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uRWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gaW4gZWRpdGluZyBzdGF0ZSBhbmQgZGVmYXVsdCBidXR0b25zIGFyZSByZW5kZXJlZCBvbiBjbGljayBicm9hZGNhc3QgQ2FuY2VsIGFjdGlvblxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2FuY2VsQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBpbiBlZGl0aW5nIHN0YXRlIGFuZCBkZWZhdWx0IGJ1dHRvbnMgYXJlIHJlbmRlcmVkIG9uIGNsaWNrIGJyb2FkY2FzdCBTYXZlIGFjdGlvblxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2F2ZUFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIEBPdXRwdXQoKVxuICAgIG9uRWRpdGluZ0NvbXBsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIExvY2FsIHZhcmlhYmxlIG9uIHdoZXRoZXIgdGhpcyBzZWN0aW9uIGlzIGV4cGFuZGVkIG9yIG5vdC5cbiAgICAgKiBEaWZmZXJzIGZyb20gJ29wZW5lZCcuIG9wZW5lZCBpcyBhbiBpbnB1dCBwYXJhbWV0ZXIgYW5kIGl0IGRvZXNuJ3QgdHJhY2tcbiAgICAgKiBjdXJyZW50IHNlY3Rpb24gZXhwYW5kZWQgc3RhdGUuXG4gICAgICovXG4gICAgZXhwYW5kZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBpbnRlcm5hbCBhY2NvcmRpb25UYWJcbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdhY2NvcmRpb25UYWInKVxuICAgIHByaXZhdGUgYWNjb3JkaW9uVGFiOiBBY2NvcmRpb25UYWI7XG5cblxuICAgIC8qKlxuICAgICAqIFNhdmUgcmVmZXJlbmNlIHRvIGRldmVsb3BlcidzIGRlZmluZWQgYWN0aW9ucyBzbyBpZiB3ZSBjYW4gaGlkZSBkZWZhdWx0IG9uZXNcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKFNlY3Rpb25BY3Rpb25zQ29tcG9uZW50KVxuICAgIGN1c3RvbUFjdGlvbnM6IFNlY3Rpb25BY3Rpb25zQ29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIC8vIElmIEkgaGF2ZSBub3QgaGVhZGVyLCB0aGVuIEkgY2FuJ3QgY2xvc2UgdGhlIHNlY3Rpb24uXG4gICAgICAgIGlmICghdGhpcy5pc0hlYWRlckRpc3BsYXllZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVDbG9zZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBJIGNhbid0IGNsb3NlIHRoZSBzZWN0aW9uLCB0aGVuIGl0IHNob3VsZCBkZWZhdWx0IG9wZW4uXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVDbG9zZSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSB0cnVlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBleHBhbmRlZCBzdGF0ZS5cbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRoaXMub3BlbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvbid0IGRpc3BsYXkgaGVhZGVyIGFyZWEgaWYgSSBkb24ndCBoYXZlIHRpdGxlIGFuZCBkZXNjcmlwdGlvbi5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNIZWFkZXJEaXNwbGF5ZWQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQodGhpcy50aXRsZSkgfHwgaXNQcmVzZW50KHRoaXMuZGVzY3JpcHRpb24pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDc3MgQ2xhc3MgdGhhdCBjb250cm9sIHRoZSBsb29rIGFuZCBmZWVsIGZvciBzZWN0aW9uIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBhQ2xhc3MoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuaXNIZWFkZXJEaXNwbGF5ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuICdzZWN0aW9uLW5vLWhlYWRlcic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2luY2Ugd2UgaW50cm9kdWNlZCBidXR0b25zIGFuZCBlZGl0U3RhdGUgdGhlIGRlY2lzaW9uIG9uIHdoZW4gdG8gZXhpdCBlZGl0aW5nIG1vZGVcbiAgICAgKiBzaG91bGQgYmUgb24gdGhlIGRldmVsb3BlciB1c2luZyB0aGlzIGNvbXBvbmVudCB0aGVyZWZvcmUgb25seSBzdGFydEVkaXRpbmdcbiAgICAgKlxuICAgICAqL1xuICAgIG9uRWRpdEFjdGlvbigkZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgLy8gd2hlbiBpbiBlZGl0aW5nIG1ha2Ugc3VyZSB3ZSBkb250IHN3aXRjaCBzdGF0ZSBhcyB0aGVyZSBjYW4gYmUgc29tZSBGb3JtIGVycm9yc1xuICAgICAgICAvLyB3aGljaCBuZWVkcyB0byBiZSBoYW5kbGVkIGJ5IGRldmVsb3BlciBhbmQgb25seSB0aGVuIGNoYW5nZSB0aGUgZWRpdFN0YXRlXG4gICAgICAgIGlmICghdGhpcy5lZGl0U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdFN0YXRlID0gIXRoaXMuZWRpdFN0YXRlO1xuICAgICAgICAgICAgbGV0IHN0YXRlOiBzdHJpbmcgPSAodGhpcy5lZGl0U3RhdGUpID8gJ2luRWRpdCcgOiAnbm90SW5FZGl0JztcblxuICAgICAgICAgICAgdGhpcy5vbkVkaXQuZW1pdChzdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZXZlbnQgdGhlIG9yaWdpbmFsIGV2ZW50IGZyb20gYnViYmxpbmcgdXAuIEJlY2F1c2UgdGhlIGVkaXQgaWNvbiBpcyBpbnNpZGVcbiAgICAgICAgLy8gdGhlIGhlYWRlci4gSWYgdGhlIGNsaWNrIGV2ZW4gaXMgYnViYmxlZCB1cCwgdGhpcyBldmVudCB3aWxsIGNhdXNlIHRoZSBzZWN0aW9uIHRvXG4gICAgICAgIC8vIGV4cGFuZCBvciBjb2xsYXBzZS5cbiAgICAgICAgaWYgKGlzUHJlc2VudCgkZXZlbnQuZXZlbnQpKSB7XG4gICAgICAgICAgICAkZXZlbnQuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkZXZlbnQuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0Rlc2NyaXB0aW9uKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5kZXNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiB0aGlzIHNlY3Rpb24sIGlmIGl0J3MgYWxyZWFkeSBvcGVuLCB3aWxsIGRvIG5vdGhpbmcuXG4gICAgICovXG4gICAgb3BlbihldmVudD86IGFueSk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjY29yZGlvblRhYi50b2dnbGUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2UgdGhpcyBzZWN0aW9uLCBpZiBpdCdzIGFscmVhZHkgY2xvc2UsIHdpbGwgZG8gbm90aGluZy5cbiAgICAgKi9cbiAgICBjbG9zZShldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uVGFiLnRvZ2dsZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gYWNjb3JkaW9uIGlzIG9wZW5lZFxuICAgICAqXG4gICAgICovXG4gICAgb25TZWN0aW9uT3BlbihldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub25PcGVuLmVtaXQoJ29wZW4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gYWNjb3JkaW9uIGlzIGNsb3NlZFxuICAgICAqXG4gICAgICovXG4gICAgb25TZWN0aW9uQ2xvc2UoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoJ2Nsb3NlJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRlbGxzIHVzIGlmIHdlIG5lZWQgdG8gcmVuZGVyIGFwcGxpY2F0aW9uIGRlZmluZWQgY3VzdG9tIGFjdGlvbnNcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0N1c3RvbUFjdGlvbnMoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmN1c3RvbUFjdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtaXQgdGhlIGVkaXRpbmcgc3RhdGUgYmFjayB0byBub24tZWRpdGFibGVcbiAgICAgKi9cbiAgICBjb21wbGV0ZUVkaXRpbmcoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5lZGl0U3RhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkVkaXRpbmdDb21wbGV0ZS5lbWl0KHRoaXMuZWRpdFN0YXRlKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctc3Vic2VjdGlvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwic3Vic2VjdGlvbi10aXRsZVwiPnt7dGl0bGV9fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgYCxcbiAgICBzdHlsZXM6IFsnLnN1YnNlY3Rpb24tdGl0bGUge2NvbG9yOiAjMzYzNjM2OyB9J11cbn0pXG5leHBvcnQgY2xhc3MgU3ViU2VjdGlvbkNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpdGxlIG9mIHRoaXMgc3ViIHNlY3Rpb25cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG59XG5cblxuLyoqXG4gKiBEZWZpbmVzIGVkaXRpbmcgbW9kZXMgZm9yIHRoZSBTZWN0aW9ucy4gRGVmYXVsdCBtZWFucyB3ZSBzaG93IGNhbmNlbCAvIHNhdmUgYnV0dG9ucyBhbmQgaGlkZVxuICogZWRpdCBpY29ucyB3aGVuIGluIGVkaXRpbmcuIGV4dGVybmFsIGlzIGRyaXZlbiBieSBhcHBsaWNhdGlvblxuICovXG5leHBvcnQgdHlwZSBFZGl0TW9kZSA9ICdkZWZhdWx0JyB8ICdleHRlcm5hbCc7XG5cbiJdfQ==