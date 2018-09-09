/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Environment, isPresent } from '@aribaui/core';
import { AccordionTab } from 'primeng/primeng';
import { BaseComponent } from '../../core/base.component';
/**
 * Allow developer to override default actions. Must have this declared before class when we
 * want to have this declaration inside the same file.
 */
export class SectionActionsComponent {
}
SectionActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-section-actions',
                template: `<ng-content></ng-content> `
            }] }
];
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
export class SectionComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
        /**
         * Should this section be opened at the start. Default is opened.
         */
        this.opened = true;
        /**
         * Whether this section can be closed or not.
         *
         */
        this.disableClose = false;
        /**
         * Whether this section is in EditState or not.
         *
         * When in editing state and we show "Cancel / Save" button developer needs use this binding
         * to control the state.
         */
        this.editState = false;
        /**
         * Current Editing mode. Tells the components if its its default behavior or driven by
         * application using this component.
         *
         * {\@see EditMode}
         *
         */
        this.editMode = 'default';
        /**
         * Developer can provide custom Edit action icon that will appear in the right top corner
         */
        this.actionIcon = 'icon-edit';
        /**
         * Event emitted when the section is fully opened.
         */
        this.onOpen = new EventEmitter();
        /**
         * Event emitted when the section is fully closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Edit state to broadcast state of current section
         */
        this.onEdit = new EventEmitter();
        /**
         * When in editing state and default buttons are rendered on click broadcast Cancel action
         */
        this.onCancelAction = new EventEmitter();
        /**
         * When in editing state and default buttons are rendered on click broadcast Save action
         */
        this.onSaveAction = new EventEmitter();
        this.onEditingComplete = new EventEmitter();
        this.editable = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
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
    }
    /**
     * Don't display header area if I don't have title and description.
     *
     * @return {?}
     */
    isHeaderDisplayed() {
        return (isPresent(this.title) || isPresent(this.description));
    }
    /**
     * Css Class that control the look and feel for section component.
     * @return {?}
     */
    aClass() {
        if (!this.isHeaderDisplayed()) {
            return 'section-no-header';
        }
        return '';
    }
    /**
     * Since we introduced buttons and editState the decision on when to exit editing mode
     * should be on the developer using this component therefore only startEditing
     *
     * @param {?} $event
     * @return {?}
     */
    onEditAction($event) {
        // when in editing make sure we dont switch state as there can be some Form errors
        // which needs to be handled by developer and only then change the editState
        if (!this.editState) {
            this.editState = !this.editState;
            /** @type {?} */
            let state = (this.editState) ? 'inEdit' : 'notInEdit';
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
    }
    /**
     * @return {?}
     */
    hasDescription() {
        return isPresent(this.description);
    }
    /**
     * Open this section, if it's already open, will do nothing.
     * @param {?=} event
     * @return {?}
     */
    open(event) {
        if (!this.expanded) {
            this.accordionTab.toggle(event);
        }
    }
    /**
     * Close this section, if it's already close, will do nothing.
     * @param {?} event
     * @return {?}
     */
    close(event) {
        if (this.expanded) {
            this.accordionTab.toggle(event);
        }
    }
    /**
     * Callback to be invoked when accordion is opened
     *
     * @param {?} event
     * @return {?}
     */
    onSectionOpen(event) {
        this.expanded = true;
        this.onOpen.emit('open');
    }
    /**
     * Callback to be invoked when accordion is closed
     *
     * @param {?} event
     * @return {?}
     */
    onSectionClose(event) {
        this.expanded = false;
        this.onClose.emit('close');
    }
    /**
     *
     * Tells us if we need to render application defined custom actions
     *
     * @return {?}
     */
    hasCustomActions() {
        return isPresent(this.customActions);
    }
    /**
     * Emit the editing state back to non-editable
     * @return {?}
     */
    completeEditing() {
        this.editState = false;
        this.onEditingComplete.emit(this.editState);
    }
}
SectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-section',
                template: "<div class=\"ui-g-12 section-container\"\n     [class.editing]=\"editable && editState && editMode === 'default'\">\n\n    <p-accordion (onOpen)=\"onSectionOpen($event)\" (onClose)=\"onSectionClose($event)\"\n                 [styleClass]=\"aClass()\">\n        <p-accordionTab #accordionTab [selected]=\"opened\" [disabled]=\"disableClose\">\n            <p-header>\n                <!-- title and description -->\n                <div class=\"section-header-container\">\n                    <div class=\"section-title\">{{title}}</div>\n                    <div *ngIf=\"hasDescription()\" class=\"section-description\">{{description}}</div>\n\n                    <!-- actions: Hide when in editing and editMode is default -->\n                    <div *ngIf=\"(editable && !editState && editMode === 'default') ||\n                        (editable && editMode === 'external')\"\n                         class=\"section-actions\">\n                        <aw-hyperlink (action)=\"onEditAction($event)\">\n                            <i class=\"sap-icon section-edit-action\" [ngClass]=\"actionIcon\"></i>\n                        </aw-hyperlink>\n                    </div>\n                </div>\n            </p-header>\n\n            <ng-content></ng-content>\n        </p-accordionTab>\n    </p-accordion>\n    <!--\n        need to put it outside of p-accordion otherwise button will inherit different\n        color scheme\n    -->\n    <div class=\"section-footer-container\" *ngIf=\"editable && editState &&\n            editMode === 'default'\">\n        <div class=\"footer-actions\">\n\n            <ng-template [ngIf]=\"!hasCustomActions()\">\n                <aw-button [style]=\"'secondary'\" size=\"small\"\n                           (action)=\"onCancelAction.emit($event)\">\n                    Cancel\n                </aw-button>\n                <aw-button size=\"small\" (action)=\"onSaveAction.emit($event)\">\n                    Save\n                </aw-button>\n            </ng-template>\n\n            <ng-content select=\"aw-section-actions\"></ng-content>\n        </div>\n    </div>\n</div>\n",
                styles: [".section-header-container{position:relative}.section-container{margin:10px 0;background-color:#fff;padding:.2em .5em;border:2px dashed transparent}.section-container.editing{border-color:#199de0}.section-container ::ng-deep .ui-accordion-header>a{display:flex}.section-container ::ng-deep .ui-accordion-header>a .ui-accordion-toggle-icon{flex:0 0 30px;padding-top:2px}.section-container ::ng-deep .ui-accordion-header>a p-header{flex:1 0}.section-container /deep/ .ui-accordion-header.ui-state-disabled{opacity:1}.section-title{font-size:1.1em}.section-description{font-size:.9em;padding:.6em 0 .2em}.section-footer-container{margin:1em 2em 0;padding:.8em 0 1.5em .8em;border-top:1px solid #d7d7d7}.section-footer-container .footer-actions{display:inline-block;text-align:right;width:100%}.section-actions{position:absolute;top:0;right:0;z-index:1}.section-actions /deep/ a.link,.section-actions /deep/ a.link:hover{padding:0;text-decoration:none}.section-edit-action{font-size:1.5em;position:relative;padding:.1em 0 .1em .5em;cursor:pointer}.section-edit-action.icon-edit{font-size:1.4em}.section-container /deep/ .ui-accordion-header{color:#363636;border:none;background:#fff!important;padding:0 1em}.section-container /deep/ .ui-accordion-content{border:none;padding:1em 2em}.section-container /deep/ .ui-accordion-header /deep/ a[role=tab]{padding:.75em 0;text-decoration:none}.section-container /deep/ .ui-accordion-header.ui-state-active /deep/ a[role=tab]{border-bottom:1px solid #d7d7d7;color:#363636}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header{height:1px}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header.ui-state-active /deep/ a[role=tab]{border-bottom:none}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header .section-edit-action{cursor:pointer!important}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-down,:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-right{font-family:\"SAP icon fonts\";font-size:1.1em;top:.8em;left:.1em;color:#767676;margin-top:0}:host /deep/ .ui-accordion-header.ui-state-disabled /deep/ .fa,:host /deep/ .ui-accordion-header.ui-state-disabled /deep/ .pi{display:none}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-right:before{content:\"\\e1ed\"}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-down:before{content:\"\\e1ef\"}"]
            }] }
];
/** @nocollapse */
SectionComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
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
if (false) {
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
export class SubSectionComponent {
}
SubSectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-subsection',
                template: `
                    <h4 class="subsection-title">{{title}}</h4>
                    <ng-content></ng-content>
                 `,
                styles: ['.subsection-title {color: #363636; }']
            }] }
];
SubSectionComponent.propDecorators = {
    title: [{ type: Input }]
};
if (false) {
    /**
     * The title of this sub section
     * @type {?}
     */
    SubSectionComponent.prototype.title;
}
/** @typedef {?} */
var EditMode;
export { EditMode };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zZWN0aW9uL3NlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7OztBQVd4RCxNQUFNOzs7WUFKTCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLDRCQUE0QjthQUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0lELE1BQU0sdUJBQXdCLFNBQVEsYUFBYTs7Ozs7SUE4Ry9DLFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRk8sWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7Ozs7c0JBM0ZoRCxJQUFJOzs7Ozs0QkFNRSxLQUFLOzs7Ozs7O3lCQVNSLEtBQUs7Ozs7Ozs7O3dCQVdMLFNBQVM7Ozs7MEJBT1QsV0FBVzs7OztzQkFNSixJQUFJLFlBQVksRUFBRTs7Ozt1QkFNakIsSUFBSSxZQUFZLEVBQUU7Ozs7c0JBTW5CLElBQUksWUFBWSxFQUFF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Ozs7SUFLRCxlQUFlO1FBRVgsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDL0M7OztZQTNQSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLGdtRUFBcUM7O2FBRXhDOzs7O1lBbkpHLFVBQVU7WUFNTixXQUFXOzs7b0JBb0pkLEtBQUs7MEJBTUwsS0FBSztxQkFNTCxLQUFLOzJCQU1MLEtBQUs7d0JBU0wsS0FBSzt1QkFXTCxLQUFLO3lCQU9MLEtBQUs7cUJBTUwsTUFBTTtzQkFNTixNQUFNO3FCQU1OLE1BQU07NkJBT04sTUFBTTsyQkFPTixNQUFNO2dDQUlOLE1BQU07MkJBYU4sU0FBUyxTQUFDLGNBQWM7NEJBT3hCLFlBQVksU0FBQyx1QkFBdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0p6QyxNQUFNOzs7WUFSTCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7O2tCQUdJO3lCQUNMLHNDQUFzQzthQUNsRDs7O29CQU9JLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QWNjb3JkaW9uVGFifSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuXG4vKipcbiAqIEFsbG93IGRldmVsb3BlciB0byBvdmVycmlkZSBkZWZhdWx0IGFjdGlvbnMuIE11c3QgaGF2ZSB0aGlzIGRlY2xhcmVkIGJlZm9yZSBjbGFzcyB3aGVuIHdlXG4gKiB3YW50IHRvIGhhdmUgdGhpcyBkZWNsYXJhdGlvbiBpbnNpZGUgdGhlIHNhbWUgZmlsZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1zZWN0aW9uLWFjdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBTZWN0aW9uQWN0aW9uc0NvbXBvbmVudFxue1xuXG59XG5cblxuLyoqXG4gKlxuICogU2VjdGlvbiBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzIGEgc2VjdGlvbiBvZiB0aGUgcGFnZS4gSXQncyBhbiBvdXRsaW5lIGJveCB0aGF0XG4gKiBoYXMgdGhlIGFiaWxpdHkgdG8gZXhwYW5kIGFuZCBoaWRlIGl0cyBjb250ZW50LlxuICpcbiAqIGBgYHRzXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ3JmeC1kZXRhaWxzJyAsXG4gKiAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICA8YXctc2VjdGlvbiB0aXRsZT1cIlNvdXJjaW5nIHJlcXVlc3QgaW5mb1wiIChvbkVkaXQpPVwib25TdGF0ZUNoYW5nZSgkZXZlbnQpXCJcbiAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlXT1cInRydWVcIj5cbiAqXG4gKiAgICAgICAgICAgICAgICA8bS1jb250ZXh0IFtvYmplY3RdPVwicmZ4RW50aXR5LmhlYWRlckluZm9cIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIFtvcGVyYXRpb25dPVwidGhpcy5lZGl0YWJpbGl0eVN0YXRlLmhlYWRlckluZm9PcFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0PVwiSW5zcGVjdFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgdWlHcm91cD1cIkhlYWRlckdlbmVyYWxcIj5cbiAqICAgICAgICAgICAgICAgICAgIDxtLWluY2x1ZGUtY29tcG9uZW50PjwvbS1pbmNsdWRlLWNvbXBvbmVudD5cbiAqICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gKiAgICAgICAgICAgPC9hdy1zZWN0aW9uPlxuICpcbiAqXG4gKiAgICAgICAgICAgPGF3LXNlY3Rpb24gI3N1cHBsaWVyU2VjdGlvbiB0aXRsZT1cIlNlbGVjdGVkIHN1cHBsaWVyc1wiIChvbk9wZW4pPVwib25PcGVuKClcIlxuICAgKiAgICAgICAgICAgICAgICBbb3BlbmVkXT1cImZhbHNlXCI+XG4gKiAgICAgICAgICAgICAgIDxzdXBwbGllci1wcm9maWxlLWNhcmQ+PC9zdXBwbGllci1wcm9maWxlLWNhcmQ+XG4gKiAgICAgICAgICAgPC9hdy1zZWN0aW9uPlxuICpcbiAqICAgICAgICAgICA8YXctc2VjdGlvbiB0aXRsZT1cIlJGUSBEZXRhaWxzXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIlJldmlldyBhbmQgdXBkYXRlIGluZm9ybWF0aW9uIGZvciBzdXBwbGllcnMgdG8gcmVzcG9uZC5cIlxuICogICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlQ2xvc2VdPVwidHJ1ZVwiPlxuICpcbiAqICAgICAgICAgICAgICAgPGF3LXN1YnNlY3Rpb24gdGl0bGU9XCJFdmVudCB0aW1lbGluZVwiPlxuICogICAgICAgICAgICAgICAgICAgPGF3LWZvcm0tdGFibGUgW3VzZUZpdmVab25lXT1cImZhbHNlXCIgW2VkaXRhYmxlXT1cInRydWVcIj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgPGF3LWZvcm0tcm93IFtsYWJlbF09XCInU3RhcnQgRGF0ZSdcIiBbbmFtZV09XCInc3RhcnREYXRlJ1wiIFtzaXplXT1cIidzbWFsbCdcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtoaWdobGlnaHRSb3ddPVwidHJ1ZVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctZGF0ZS10aW1lXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXROYW1lPVwiZGF0ZVRpbWVcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInN0YXJ0RGF0ZVwiIFt2YWx1ZV09XCJyZnhFbnRpdHkuY3JlYXRlZFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2hvd1RpbWVdPVwidHJ1ZVwiPjwvYXctZGF0ZS10aW1lPlxuICogICAgICAgICAgICAgICAgICAgICAgIDwvYXctZm9ybS1yb3c+XG4gKiAgICAgICAgICAgICAgICAgICA8L2F3LWZvcm0tdGFibGU+XG4gKiAgICAgICAgICAgICAgIDwvYXctc3Vic2VjdGlvbj5cbiAqICAgICAgICAgIDwvYXctc2VjdGlvbj5cbiAqICAgIGBcbiAqICAgIH0pXG4gKiAgICBleHBvcnQgY2xhc3MgTXlQYWdlXG4gKiAgICB7XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqXG4gKiAgICB9XG4gKlxuICogYGBgXG4gKlxuICogU2VjdGlvbiBjb21wb25lbnQgYWxzbyBzdXBwb3J0cyBlZGl0YWJpbGl0eSBtb2RlcyBhbmQgaWYgZW5hYmxlZCBpdCB3aWxsIHJlbmRlciBhY3Rpb24gYnV0dG9uc1xuICogaW4gdGhlIGZvb3Rlci4gRGV2ZWxvcGVyIGNhbiBhbHNvIG92ZXJyaWRlIGRlZmF1bHQgYmVoYXZpb3IgYW5kIHByb3ZpZGUgY3VzdG9tIGFjdGlvbnMuXG4gKlxuICpcbiAqIGUuZzpcbiAqXG4gKiBgYGBcbiAqICAgICAgPGF3LXNlY3Rpb24gW3RpdGxlXT1cInRpdGxlXCIgW2VkaXRhYmxlXT1cInRydWVcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIChvbkNhbmNlbEFjdGlvbik9XCJzb21lSGFuZGxlcjEoJGV2ZW50KVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uU2F2ZUFjdGlvbik9XCJzb21lSGFuZGxlcjIoJGV2ZW50KVwiID5cbiAqICAgICAgICAgICAgICBzZWN0aW9uIGNvbnRlbnRcbiAqXG4gKlxuICogICA8L2F3LXNlY3Rpb24+XG4gKlxuICogYGBgXG4gKlxuICogb3IgY3VzdG9tIGFjdGlvbiBidXR0b25zOlxuICpcbiAqXG4gKiBgYGBodG1sXG4gKlxuICogICAgICAgPGF3LXNlY3Rpb24tYWN0aW9ucz5cbiAqICAgICAgICAgICAgICAgICAgICAgIDxhdy1idXR0b24gPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgQnV0dG9uVGVzdDFcbiAqICAgICAgICAgICAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuICogICAgICAgICAgICAgICAgICAgICAgPGF3LWJ1dHRvbj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1dHRvblRlc3QyXG4gKiAgICAgICAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAqICAgICA8L2F3LXNlY3Rpb24tYWN0aW9ucz5cbiAqXG4gKiBgYGBcbiAqXG4gKlxuICogVGhlcmUgYXJlIHR3byBlZGl0IG1vZGVzXG4gKiAgIyBEZWZhdWx0XG4gKiAgICAgIFJlbmRlcnMgYWN0aW9uIGJ1dHRvbnMgaW4gdGhlIGZvb3RlcnMgYW5kIGVtaXQgYWN0aW9ucyB0byB0aGUgYXBwbGljYXRpb25cbiAqXG4gKiAgIyBFeHRlcm5hbFxuICogICAgIE5vIGFjdGlvbiBidXR0b25zIGFyZSBzaG93biBpbiB0aGUgZm9vdGVyIGFuZCBiZWhhdmlvciBpcyBoYW5kbGVkIGJ5IGFwcGxpY2F0aW9uLiBPbmx5IGV2ZW50XG4gKiAgICAgaXMgZW1pdGVkLlxuICpcbiAqXG4gKiAgZS5nOlxuICpcbiAqICBgYGB0c1xuICpcbiAqICAgICAgPGF3LXNlY3Rpb24gdGl0bGU9XCJVc2VyIEluZm9ybWF0aW9uXCIgKG9uRWRpdCk9XCJvbkFkZFNvbWV0aGluZygkZXZlbnQpXCJcbiAqICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlXT1cInRydWVcIiBbZWRpdE1vZGVdPVwiJ2V4dGVybmFsJ1wiID5cbiAqICAgICAgICAgICAgICAgICAgPGRpdj5cbiAqICAgICAgICAgICAgICAgICAgICAgIENvbnRlbnRcbiAqICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgIDwvYXctc2VjdGlvbj5cbiAqXG4gKiAgYGBgXG4gKlxuICogTm90ZTogV2hlbiB1c2luZyBlZGl0aW5nIG1vZGUgeW91IGhhdmUgdG8gY2FsbCBhdCB0aGUgZW5kIG9mIHRoZSBlZGl0aW5nIGN5Y2xlIG1ldGhvZFxuICogYGNvbXBsZXRlRWRpdGluZygpYCB0byBjb21taXQgZWRpdGluZyB3aGljaCBjaGFuZ2VzIGludGVybmFsIHN0YXRlIG9mIHRoZSBTZWN0aW9uLlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXNlY3Rpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3NlY3Rpb24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWN0aW9uQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpdGxlIG9mIHRoaXMgc2VjdGlvblxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGlzIHNlY3Rpb24uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRoaXMgc2VjdGlvbiBiZSBvcGVuZWQgYXQgdGhlIHN0YXJ0LiBEZWZhdWx0IGlzIG9wZW5lZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9wZW5lZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoaXMgc2VjdGlvbiBjYW4gYmUgY2xvc2VkIG9yIG5vdC5cbiAgICAgKiovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlQ2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhpcyBzZWN0aW9uIGlzIGluIEVkaXRTdGF0ZSBvciBub3QuXG4gICAgICpcbiAgICAgKiBXaGVuIGluIGVkaXRpbmcgc3RhdGUgYW5kIHdlIHNob3cgXCJDYW5jZWwgLyBTYXZlXCIgYnV0dG9uIGRldmVsb3BlciBuZWVkcyB1c2UgdGhpcyBiaW5kaW5nXG4gICAgICogdG8gY29udHJvbCB0aGUgc3RhdGUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBlZGl0U3RhdGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBFZGl0aW5nIG1vZGUuIFRlbGxzIHRoZSBjb21wb25lbnRzIGlmIGl0cyBpdHMgZGVmYXVsdCBiZWhhdmlvciBvciBkcml2ZW4gYnlcbiAgICAgKiBhcHBsaWNhdGlvbiB1c2luZyB0aGlzIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIHtAc2VlIEVkaXRNb2RlfVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBlZGl0TW9kZTogRWRpdE1vZGUgPSAnZGVmYXVsdCc7XG5cblxuICAgIC8qKlxuICAgICAqIERldmVsb3BlciBjYW4gcHJvdmlkZSBjdXN0b20gRWRpdCBhY3Rpb24gaWNvbiB0aGF0IHdpbGwgYXBwZWFyIGluIHRoZSByaWdodCB0b3AgY29ybmVyXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhY3Rpb25JY29uOiBzdHJpbmcgPSAnaWNvbi1lZGl0JztcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VjdGlvbiBpcyBmdWxseSBvcGVuZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25PcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VjdGlvbiBpcyBmdWxseSBjbG9zZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFZGl0IHN0YXRlIHRvIGJyb2FkY2FzdCBzdGF0ZSBvZiBjdXJyZW50IHNlY3Rpb25cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkVkaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGluIGVkaXRpbmcgc3RhdGUgYW5kIGRlZmF1bHQgYnV0dG9ucyBhcmUgcmVuZGVyZWQgb24gY2xpY2sgYnJvYWRjYXN0IENhbmNlbCBhY3Rpb25cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNhbmNlbEFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gaW4gZWRpdGluZyBzdGF0ZSBhbmQgZGVmYXVsdCBidXR0b25zIGFyZSByZW5kZXJlZCBvbiBjbGljayBicm9hZGNhc3QgU2F2ZSBhY3Rpb25cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblNhdmVBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICBAT3V0cHV0KClcbiAgICBvbkVkaXRpbmdDb21wbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBMb2NhbCB2YXJpYWJsZSBvbiB3aGV0aGVyIHRoaXMgc2VjdGlvbiBpcyBleHBhbmRlZCBvciBub3QuXG4gICAgICogRGlmZmVycyBmcm9tICdvcGVuZWQnLiBvcGVuZWQgaXMgYW4gaW5wdXQgcGFyYW1ldGVyIGFuZCBpdCBkb2Vzbid0IHRyYWNrXG4gICAgICogY3VycmVudCBzZWN0aW9uIGV4cGFuZGVkIHN0YXRlLlxuICAgICAqL1xuICAgIGV4cGFuZGVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogaW50ZXJuYWwgYWNjb3JkaW9uVGFiXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgnYWNjb3JkaW9uVGFiJylcbiAgICBwcml2YXRlIGFjY29yZGlvblRhYjogQWNjb3JkaW9uVGFiO1xuXG5cbiAgICAvKipcbiAgICAgKiBTYXZlIHJlZmVyZW5jZSB0byBkZXZlbG9wZXIncyBkZWZpbmVkIGFjdGlvbnMgc28gaWYgd2UgY2FuIGhpZGUgZGVmYXVsdCBvbmVzXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChTZWN0aW9uQWN0aW9uc0NvbXBvbmVudClcbiAgICBjdXN0b21BY3Rpb25zOiBTZWN0aW9uQWN0aW9uc0NvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICAvLyBJZiBJIGhhdmUgbm90IGhlYWRlciwgdGhlbiBJIGNhbid0IGNsb3NlIHRoZSBzZWN0aW9uLlxuICAgICAgICBpZiAoIXRoaXMuaXNIZWFkZXJEaXNwbGF5ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgSSBjYW4ndCBjbG9zZSB0aGUgc2VjdGlvbiwgdGhlbiBpdCBzaG91bGQgZGVmYXVsdCBvcGVuLlxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlQ2xvc2UpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgZXhwYW5kZWQgc3RhdGUuXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLm9wZW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb24ndCBkaXNwbGF5IGhlYWRlciBhcmVhIGlmIEkgZG9uJ3QgaGF2ZSB0aXRsZSBhbmQgZGVzY3JpcHRpb24uXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzSGVhZGVyRGlzcGxheWVkKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHRoaXMudGl0bGUpIHx8IGlzUHJlc2VudCh0aGlzLmRlc2NyaXB0aW9uKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3NzIENsYXNzIHRoYXQgY29udHJvbCB0aGUgbG9vayBhbmQgZmVlbCBmb3Igc2VjdGlvbiBjb21wb25lbnQuXG4gICAgICovXG4gICAgYUNsYXNzKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSGVhZGVyRGlzcGxheWVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2VjdGlvbi1uby1oZWFkZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpbmNlIHdlIGludHJvZHVjZWQgYnV0dG9ucyBhbmQgZWRpdFN0YXRlIHRoZSBkZWNpc2lvbiBvbiB3aGVuIHRvIGV4aXQgZWRpdGluZyBtb2RlXG4gICAgICogc2hvdWxkIGJlIG9uIHRoZSBkZXZlbG9wZXIgdXNpbmcgdGhpcyBjb21wb25lbnQgdGhlcmVmb3JlIG9ubHkgc3RhcnRFZGl0aW5nXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkVkaXRBY3Rpb24oJGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIC8vIHdoZW4gaW4gZWRpdGluZyBtYWtlIHN1cmUgd2UgZG9udCBzd2l0Y2ggc3RhdGUgYXMgdGhlcmUgY2FuIGJlIHNvbWUgRm9ybSBlcnJvcnNcbiAgICAgICAgLy8gd2hpY2ggbmVlZHMgdG8gYmUgaGFuZGxlZCBieSBkZXZlbG9wZXIgYW5kIG9ubHkgdGhlbiBjaGFuZ2UgdGhlIGVkaXRTdGF0ZVxuICAgICAgICBpZiAoIXRoaXMuZWRpdFN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRTdGF0ZSA9ICF0aGlzLmVkaXRTdGF0ZTtcbiAgICAgICAgICAgIGxldCBzdGF0ZTogc3RyaW5nID0gKHRoaXMuZWRpdFN0YXRlKSA/ICdpbkVkaXQnIDogJ25vdEluRWRpdCc7XG5cbiAgICAgICAgICAgIHRoaXMub25FZGl0LmVtaXQoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcmV2ZW50IHRoZSBvcmlnaW5hbCBldmVudCBmcm9tIGJ1YmJsaW5nIHVwLiBCZWNhdXNlIHRoZSBlZGl0IGljb24gaXMgaW5zaWRlXG4gICAgICAgIC8vIHRoZSBoZWFkZXIuIElmIHRoZSBjbGljayBldmVuIGlzIGJ1YmJsZWQgdXAsIHRoaXMgZXZlbnQgd2lsbCBjYXVzZSB0aGUgc2VjdGlvbiB0b1xuICAgICAgICAvLyBleHBhbmQgb3IgY29sbGFwc2UuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoJGV2ZW50LmV2ZW50KSkge1xuICAgICAgICAgICAgJGV2ZW50LmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgJGV2ZW50LmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNEZXNjcmlwdGlvbigpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZGVzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gdGhpcyBzZWN0aW9uLCBpZiBpdCdzIGFscmVhZHkgb3Blbiwgd2lsbCBkbyBub3RoaW5nLlxuICAgICAqL1xuICAgIG9wZW4oZXZlbnQ/OiBhbnkpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIGlmICghdGhpcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5hY2NvcmRpb25UYWIudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoaXMgc2VjdGlvbiwgaWYgaXQncyBhbHJlYWR5IGNsb3NlLCB3aWxsIGRvIG5vdGhpbmcuXG4gICAgICovXG4gICAgY2xvc2UoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjY29yZGlvblRhYi50b2dnbGUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIGFjY29yZGlvbiBpcyBvcGVuZWRcbiAgICAgKlxuICAgICAqL1xuICAgIG9uU2VjdGlvbk9wZW4oZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KCdvcGVuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIGFjY29yZGlvbiBpcyBjbG9zZWRcbiAgICAgKlxuICAgICAqL1xuICAgIG9uU2VjdGlvbkNsb3NlKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCdjbG9zZScpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUZWxscyB1cyBpZiB3ZSBuZWVkIHRvIHJlbmRlciBhcHBsaWNhdGlvbiBkZWZpbmVkIGN1c3RvbSBhY3Rpb25zXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNDdXN0b21BY3Rpb25zKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jdXN0b21BY3Rpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0IHRoZSBlZGl0aW5nIHN0YXRlIGJhY2sgdG8gbm9uLWVkaXRhYmxlXG4gICAgICovXG4gICAgY29tcGxldGVFZGl0aW5nKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZWRpdFN0YXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25FZGl0aW5nQ29tcGxldGUuZW1pdCh0aGlzLmVkaXRTdGF0ZSk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXN1YnNlY3Rpb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cInN1YnNlY3Rpb24tdGl0bGVcIj57e3RpdGxlfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgIGAsXG4gICAgc3R5bGVzOiBbJy5zdWJzZWN0aW9uLXRpdGxlIHtjb2xvcjogIzM2MzYzNjsgfSddXG59KVxuZXhwb3J0IGNsYXNzIFN1YlNlY3Rpb25Db21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aXRsZSBvZiB0aGlzIHN1YiBzZWN0aW9uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogc3RyaW5nO1xufVxuXG5cbi8qKlxuICogRGVmaW5lcyBlZGl0aW5nIG1vZGVzIGZvciB0aGUgU2VjdGlvbnMuIERlZmF1bHQgbWVhbnMgd2Ugc2hvdyBjYW5jZWwgLyBzYXZlIGJ1dHRvbnMgYW5kIGhpZGVcbiAqIGVkaXQgaWNvbnMgd2hlbiBpbiBlZGl0aW5nLiBleHRlcm5hbCBpcyBkcml2ZW4gYnkgYXBwbGljYXRpb25cbiAqL1xuZXhwb3J0IHR5cGUgRWRpdE1vZGUgPSAnZGVmYXVsdCcgfCAnZXh0ZXJuYWwnO1xuXG4iXX0=