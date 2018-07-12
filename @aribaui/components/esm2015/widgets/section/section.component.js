/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                template: `<ng-content></ng-content> `,
            },] },
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
            let /** @type {?} */ state = (this.editState) ? 'inEdit' : 'notInEdit';
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
                template: `<div class="ui-g-12 section-container"
     [class.editing]="editable && editState && editMode === 'default'">

    <p-accordion (onOpen)="onSectionOpen($event)" (onClose)="onSectionClose($event)"
                 [styleClass]="aClass()">
        <p-accordionTab #accordionTab [selected]="opened" [disabled]="disableClose">
            <p-header>
                <!-- title and description -->
                <div class="section-header-container">
                    <div class="section-title">{{title}}</div>
                    <div *ngIf="hasDescription()" class="section-description">{{description}}</div>

                    <!-- actions: Hide when in editing and editMode is default -->
                    <div *ngIf="(editable && !editState && editMode === 'default') ||
                        (editable && editMode === 'external')"
                         class="section-actions">
                        <aw-hyperlink (action)="onEditAction($event)">
                            <i class="sap-icon section-edit-action" [ngClass]="actionIcon"></i>
                        </aw-hyperlink>
                    </div>
                </div>
            </p-header>

            <ng-content></ng-content>
        </p-accordionTab>
    </p-accordion>
    <!--
        need to put it outside of p-accordion otherwise button will inherit different
        color scheme
    -->
    <div class="section-footer-container" *ngIf="editable && editState &&
            editMode === 'default'">
        <div class="footer-actions">

            <ng-template [ngIf]="!hasCustomActions()">
                <aw-button [style]="'secondary'" size="small"
                           (action)="onCancelAction.emit($event)">
                    Cancel
                </aw-button>
                <aw-button size="small" (action)="onSaveAction.emit($event)">
                    Save
                </aw-button>
            </ng-template>

            <ng-content select="aw-section-actions"></ng-content>
        </div>
    </div>
</div>
`,
                styles: [`.section-header-container{position:relative}.section-container{margin:10px 0;background-color:#fff;padding:.2em .5em;border:2px dashed transparent}.section-container.editing{border-color:#199de0}.section-container ::ng-deep .ui-accordion-header>a{display:flex}.section-container ::ng-deep .ui-accordion-header>a .ui-accordion-toggle-icon{flex:0 0 30px;padding-top:2px}.section-container ::ng-deep .ui-accordion-header>a p-header{flex:1 0}.section-container /deep/ .ui-accordion-header.ui-state-disabled{opacity:1}.section-title{font-size:1.1em}.section-description{font-size:.9em;padding:.6em 0 .2em}.section-footer-container{margin:1em 2em 0;padding:.8em 0 1.5em .8em;border-top:1px solid #d7d7d7}.section-footer-container .footer-actions{display:inline-block;text-align:right;width:100%}.section-actions{position:absolute;top:0;right:0;z-index:1}.section-actions /deep/ a.link,.section-actions /deep/ a.link:hover{padding:0;text-decoration:none}.section-edit-action{font-size:1.5em;position:relative;padding:.1em 0 .1em .5em;cursor:pointer}.section-edit-action.icon-edit{font-size:1.4em}.section-container /deep/ .ui-accordion-header{color:#363636;border:none;background:#fff!important;padding:0 1em}.section-container /deep/ .ui-accordion-content{border:none;padding:1em 2em}.section-container /deep/ .ui-accordion-header /deep/ a[role=tab]{padding:.75em 0;text-decoration:none}.section-container /deep/ .ui-accordion-header.ui-state-active /deep/ a[role=tab]{border-bottom:1px solid #d7d7d7;color:#363636}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header{height:1px}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header.ui-state-active /deep/ a[role=tab]{border-bottom:none}.section-container /deep/ .section-no-header /deep/ .ui-accordion-header .section-edit-action{cursor:pointer!important}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-down,:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-right{font-family:"SAP icon fonts";font-size:1.1em;top:.8em;left:.1em;color:#767676;margin-top:0}:host /deep/ .ui-accordion-header.ui-state-disabled /deep/ .fa,:host /deep/ .ui-accordion-header.ui-state-disabled /deep/ .pi{display:none}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-right:before{content:"\\e1ed"}:host /deep/ .ui-accordion-header /deep/ .pi.pi-caret-down:before{content:"\\e1ef"}`]
            },] },
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
            },] },
];
SubSectionComponent.propDecorators = {
    title: [{ type: Input }]
};
function SubSectionComponent_tsickle_Closure_declarations() {
    /**
     * The title of this sub section
     * @type {?}
     */
    SubSectionComponent.prototype.title;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9zZWN0aW9uL3NlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7OztBQVd4RCxNQUFNOzs7WUFKTCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLDRCQUE0QjthQUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0xELE1BQU0sdUJBQXdCLFNBQVEsYUFBYTs7Ozs7SUE4Ry9DLFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRk8sWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7Ozs7c0JBM0ZoRCxJQUFJOzs7Ozs0QkFNRSxLQUFLOzs7Ozs7O3lCQVNSLEtBQUs7Ozs7Ozs7O3dCQVdMLFNBQVM7Ozs7MEJBT1QsV0FBVzs7OztzQkFNSixJQUFJLFlBQVksRUFBRTs7Ozt1QkFNakIsSUFBSSxZQUFZLEVBQUU7Ozs7c0JBTW5CLElBQUksWUFBWSxFQUFF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Ozs7SUFLRCxlQUFlO1FBRVgsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDL0M7OztZQTNTSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBZ0RiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLHF6RUFBcXpFLENBQUM7YUFDbDBFOzs7O1lBbk1HLFVBQVU7WUFNTixXQUFXOzs7b0JBb01kLEtBQUs7MEJBTUwsS0FBSztxQkFNTCxLQUFLOzJCQU1MLEtBQUs7d0JBU0wsS0FBSzt1QkFXTCxLQUFLO3lCQU9MLEtBQUs7cUJBTUwsTUFBTTtzQkFNTixNQUFNO3FCQU1OLE1BQU07NkJBT04sTUFBTTsyQkFPTixNQUFNO2dDQUlOLE1BQU07MkJBYU4sU0FBUyxTQUFDLGNBQWM7NEJBT3hCLFlBQVksU0FBQyx1QkFBdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0p6QyxNQUFNOzs7WUFSTCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7O2tCQUdJO2dCQUNkLE1BQU0sRUFBRSxDQUFDLHNDQUFzQyxDQUFDO2FBQ25EOzs7b0JBT0ksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtBY2NvcmRpb25UYWJ9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogQWxsb3cgZGV2ZWxvcGVyIHRvIG92ZXJyaWRlIGRlZmF1bHQgYWN0aW9ucy4gTXVzdCBoYXZlIHRoaXMgZGVjbGFyZWQgYmVmb3JlIGNsYXNzIHdoZW4gd2VcbiAqIHdhbnQgdG8gaGF2ZSB0aGlzIGRlY2xhcmF0aW9uIGluc2lkZSB0aGUgc2FtZSBmaWxlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXNlY3Rpb24tYWN0aW9ucycsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIFNlY3Rpb25BY3Rpb25zQ29tcG9uZW50XG57XG5cbn1cblxuXG4vKipcbiAqXG4gKiBTZWN0aW9uIGNvbXBvbmVudCB0aGF0IGltcGxlbWVudHMgYSBzZWN0aW9uIG9mIHRoZSBwYWdlLiBJdCdzIGFuIG91dGxpbmUgYm94IHRoYXRcbiAqIGhhcyB0aGUgYWJpbGl0eSB0byBleHBhbmQgYW5kIGhpZGUgaXRzIGNvbnRlbnQuXG4gKlxuICogYGBgdHNcbiAqICBAQ29tcG9uZW50KHtcbiAqICAgIHNlbGVjdG9yOiAncmZ4LWRldGFpbHMnICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKiAgICAgICAgIDxhdy1zZWN0aW9uIHRpdGxlPVwiU291cmNpbmcgcmVxdWVzdCBpbmZvXCIgKG9uRWRpdCk9XCJvblN0YXRlQ2hhbmdlKCRldmVudClcIlxuICAqICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVdPVwidHJ1ZVwiPlxuICpcbiAqICAgICAgICAgICAgICAgIDxtLWNvbnRleHQgW29iamVjdF09XCJyZnhFbnRpdHkuaGVhZGVySW5mb1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgW29wZXJhdGlvbl09XCJ0aGlzLmVkaXRhYmlsaXR5U3RhdGUuaGVhZGVySW5mb09wXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ9XCJJbnNwZWN0XCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB1aUdyb3VwPVwiSGVhZGVyR2VuZXJhbFwiPlxuICogICAgICAgICAgICAgICAgICAgPG0taW5jbHVkZS1jb21wb25lbnQ+PC9tLWluY2x1ZGUtY29tcG9uZW50PlxuICogICAgICAgICAgICAgICA8L20tY29udGV4dD5cbiAqICAgICAgICAgICA8L2F3LXNlY3Rpb24+XG4gKlxuICpcbiAqICAgICAgICAgICA8YXctc2VjdGlvbiAjc3VwcGxpZXJTZWN0aW9uIHRpdGxlPVwiU2VsZWN0ZWQgc3VwcGxpZXJzXCIgKG9uT3Blbik9XCJvbk9wZW4oKVwiXG4gICAqICAgICAgICAgICAgICAgIFtvcGVuZWRdPVwiZmFsc2VcIj5cbiAqICAgICAgICAgICAgICAgPHN1cHBsaWVyLXByb2ZpbGUtY2FyZD48L3N1cHBsaWVyLXByb2ZpbGUtY2FyZD5cbiAqICAgICAgICAgICA8L2F3LXNlY3Rpb24+XG4gKlxuICogICAgICAgICAgIDxhdy1zZWN0aW9uIHRpdGxlPVwiUkZRIERldGFpbHNcIlxuICogICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiUmV2aWV3IGFuZCB1cGRhdGUgaW5mb3JtYXRpb24gZm9yIHN1cHBsaWVycyB0byByZXNwb25kLlwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVDbG9zZV09XCJ0cnVlXCI+XG4gKlxuICogICAgICAgICAgICAgICA8YXctc3Vic2VjdGlvbiB0aXRsZT1cIkV2ZW50IHRpbWVsaW5lXCI+XG4gKiAgICAgICAgICAgICAgICAgICA8YXctZm9ybS10YWJsZSBbdXNlRml2ZVpvbmVdPVwiZmFsc2VcIiBbZWRpdGFibGVdPVwidHJ1ZVwiPlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICA8YXctZm9ybS1yb3cgW2xhYmVsXT1cIidTdGFydCBEYXRlJ1wiIFtuYW1lXT1cIidzdGFydERhdGUnXCIgW3NpemVdPVwiJ3NtYWxsJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2hpZ2hsaWdodFJvd109XCJ0cnVlXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1kYXRlLXRpbWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE5hbWU9XCJkYXRlVGltZVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwic3RhcnREYXRlXCIgW3ZhbHVlXT1cInJmeEVudGl0eS5jcmVhdGVkXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzaG93VGltZV09XCJ0cnVlXCI+PC9hdy1kYXRlLXRpbWU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPC9hdy1mb3JtLXJvdz5cbiAqICAgICAgICAgICAgICAgICAgIDwvYXctZm9ybS10YWJsZT5cbiAqICAgICAgICAgICAgICAgPC9hdy1zdWJzZWN0aW9uPlxuICogICAgICAgICAgPC9hdy1zZWN0aW9uPlxuICogICAgYFxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeVBhZ2VcbiAqICAgIHtcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICpcbiAqICAgIH1cbiAqXG4gKiBgYGBcbiAqXG4gKiBTZWN0aW9uIGNvbXBvbmVudCBhbHNvIHN1cHBvcnRzIGVkaXRhYmlsaXR5IG1vZGVzIGFuZCBpZiBlbmFibGVkIGl0IHdpbGwgcmVuZGVyIGFjdGlvbiBidXR0b25zXG4gKiBpbiB0aGUgZm9vdGVyLiBEZXZlbG9wZXIgY2FuIGFsc28gb3ZlcnJpZGUgZGVmYXVsdCBiZWhhdmlvciBhbmQgcHJvdmlkZSBjdXN0b20gYWN0aW9ucy5cbiAqXG4gKlxuICogZS5nOlxuICpcbiAqIGBgYFxuICogICAgICA8YXctc2VjdGlvbiBbdGl0bGVdPVwidGl0bGVcIiBbZWRpdGFibGVdPVwidHJ1ZVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2FuY2VsQWN0aW9uKT1cInNvbWVIYW5kbGVyMSgkZXZlbnQpXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAob25TYXZlQWN0aW9uKT1cInNvbWVIYW5kbGVyMigkZXZlbnQpXCIgPlxuICogICAgICAgICAgICAgIHNlY3Rpb24gY29udGVudFxuICpcbiAqXG4gKiAgIDwvYXctc2VjdGlvbj5cbiAqXG4gKiBgYGBcbiAqXG4gKiBvciBjdXN0b20gYWN0aW9uIGJ1dHRvbnM6XG4gKlxuICpcbiAqIGBgYGh0bWxcbiAqXG4gKiAgICAgICA8YXctc2VjdGlvbi1hY3Rpb25zPlxuICogICAgICAgICAgICAgICAgICAgICAgPGF3LWJ1dHRvbiA+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdXR0b25UZXN0MVxuICogICAgICAgICAgICAgICAgICAgICAgPC9hdy1idXR0b24+XG4gKiAgICAgICAgICAgICAgICAgICAgICA8YXctYnV0dG9uPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgQnV0dG9uVGVzdDJcbiAqICAgICAgICAgICAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuICogICAgIDwvYXctc2VjdGlvbi1hY3Rpb25zPlxuICpcbiAqIGBgYFxuICpcbiAqXG4gKiBUaGVyZSBhcmUgdHdvIGVkaXQgbW9kZXNcbiAqICAjIERlZmF1bHRcbiAqICAgICAgUmVuZGVycyBhY3Rpb24gYnV0dG9ucyBpbiB0aGUgZm9vdGVycyBhbmQgZW1pdCBhY3Rpb25zIHRvIHRoZSBhcHBsaWNhdGlvblxuICpcbiAqICAjIEV4dGVybmFsXG4gKiAgICAgTm8gYWN0aW9uIGJ1dHRvbnMgYXJlIHNob3duIGluIHRoZSBmb290ZXIgYW5kIGJlaGF2aW9yIGlzIGhhbmRsZWQgYnkgYXBwbGljYXRpb24uIE9ubHkgZXZlbnRcbiAqICAgICBpcyBlbWl0ZWQuXG4gKlxuICpcbiAqICBlLmc6XG4gKlxuICogIGBgYHRzXG4gKlxuICogICAgICA8YXctc2VjdGlvbiB0aXRsZT1cIlVzZXIgSW5mb3JtYXRpb25cIiAob25FZGl0KT1cIm9uQWRkU29tZXRoaW5nKCRldmVudClcIlxuICogICAgICAgICAgICAgICAgICBbZWRpdGFibGVdPVwidHJ1ZVwiIFtlZGl0TW9kZV09XCInZXh0ZXJuYWwnXCIgPlxuICogICAgICAgICAgICAgICAgICA8ZGl2PlxuICogICAgICAgICAgICAgICAgICAgICAgQ29udGVudFxuICogICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgPC9hdy1zZWN0aW9uPlxuICpcbiAqICBgYGBcbiAqXG4gKiBOb3RlOiBXaGVuIHVzaW5nIGVkaXRpbmcgbW9kZSB5b3UgaGF2ZSB0byBjYWxsIGF0IHRoZSBlbmQgb2YgdGhlIGVkaXRpbmcgY3ljbGUgbWV0aG9kXG4gKiBgY29tcGxldGVFZGl0aW5nKClgIHRvIGNvbW1pdCBlZGl0aW5nIHdoaWNoIGNoYW5nZXMgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIFNlY3Rpb24uXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctc2VjdGlvbicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidWktZy0xMiBzZWN0aW9uLWNvbnRhaW5lclwiXG4gICAgIFtjbGFzcy5lZGl0aW5nXT1cImVkaXRhYmxlICYmIGVkaXRTdGF0ZSAmJiBlZGl0TW9kZSA9PT0gJ2RlZmF1bHQnXCI+XG5cbiAgICA8cC1hY2NvcmRpb24gKG9uT3Blbik9XCJvblNlY3Rpb25PcGVuKCRldmVudClcIiAob25DbG9zZSk9XCJvblNlY3Rpb25DbG9zZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlQ2xhc3NdPVwiYUNsYXNzKClcIj5cbiAgICAgICAgPHAtYWNjb3JkaW9uVGFiICNhY2NvcmRpb25UYWIgW3NlbGVjdGVkXT1cIm9wZW5lZFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlQ2xvc2VcIj5cbiAgICAgICAgICAgIDxwLWhlYWRlcj5cbiAgICAgICAgICAgICAgICA8IS0tIHRpdGxlIGFuZCBkZXNjcmlwdGlvbiAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1oZWFkZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRpdGxlXCI+e3t0aXRsZX19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJoYXNEZXNjcmlwdGlvbigpXCIgY2xhc3M9XCJzZWN0aW9uLWRlc2NyaXB0aW9uXCI+e3tkZXNjcmlwdGlvbn19PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBhY3Rpb25zOiBIaWRlIHdoZW4gaW4gZWRpdGluZyBhbmQgZWRpdE1vZGUgaXMgZGVmYXVsdCAtLT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIihlZGl0YWJsZSAmJiAhZWRpdFN0YXRlICYmIGVkaXRNb2RlID09PSAnZGVmYXVsdCcpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoZWRpdGFibGUgJiYgZWRpdE1vZGUgPT09ICdleHRlcm5hbCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInNlY3Rpb24tYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGF3LWh5cGVybGluayAoYWN0aW9uKT1cIm9uRWRpdEFjdGlvbigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJzYXAtaWNvbiBzZWN0aW9uLWVkaXQtYWN0aW9uXCIgW25nQ2xhc3NdPVwiYWN0aW9uSWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctaHlwZXJsaW5rPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcC1oZWFkZXI+XG5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9wLWFjY29yZGlvblRhYj5cbiAgICA8L3AtYWNjb3JkaW9uPlxuICAgIDwhLS1cbiAgICAgICAgbmVlZCB0byBwdXQgaXQgb3V0c2lkZSBvZiBwLWFjY29yZGlvbiBvdGhlcndpc2UgYnV0dG9uIHdpbGwgaW5oZXJpdCBkaWZmZXJlbnRcbiAgICAgICAgY29sb3Igc2NoZW1lXG4gICAgLS0+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tZm9vdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZWRpdGFibGUgJiYgZWRpdFN0YXRlICYmXG4gICAgICAgICAgICBlZGl0TW9kZSA9PT0gJ2RlZmF1bHQnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItYWN0aW9uc1wiPlxuXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWhhc0N1c3RvbUFjdGlvbnMoKVwiPlxuICAgICAgICAgICAgICAgIDxhdy1idXR0b24gW3N0eWxlXT1cIidzZWNvbmRhcnknXCIgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwib25DYW5jZWxBY3Rpb24uZW1pdCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICAgIDwvYXctYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxhdy1idXR0b24gc2l6ZT1cInNtYWxsXCIgKGFjdGlvbik9XCJvblNhdmVBY3Rpb24uZW1pdCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIFNhdmVcbiAgICAgICAgICAgICAgICA8L2F3LWJ1dHRvbj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImF3LXNlY3Rpb24tYWN0aW9uc1wiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC5zZWN0aW9uLWhlYWRlci1jb250YWluZXJ7cG9zaXRpb246cmVsYXRpdmV9LnNlY3Rpb24tY29udGFpbmVye21hcmdpbjoxMHB4IDA7YmFja2dyb3VuZC1jb2xvcjojZmZmO3BhZGRpbmc6LjJlbSAuNWVtO2JvcmRlcjoycHggZGFzaGVkIHRyYW5zcGFyZW50fS5zZWN0aW9uLWNvbnRhaW5lci5lZGl0aW5ne2JvcmRlci1jb2xvcjojMTk5ZGUwfS5zZWN0aW9uLWNvbnRhaW5lciA6Om5nLWRlZXAgLnVpLWFjY29yZGlvbi1oZWFkZXI+YXtkaXNwbGF5OmZsZXh9LnNlY3Rpb24tY29udGFpbmVyIDo6bmctZGVlcCAudWktYWNjb3JkaW9uLWhlYWRlcj5hIC51aS1hY2NvcmRpb24tdG9nZ2xlLWljb257ZmxleDowIDAgMzBweDtwYWRkaW5nLXRvcDoycHh9LnNlY3Rpb24tY29udGFpbmVyIDo6bmctZGVlcCAudWktYWNjb3JkaW9uLWhlYWRlcj5hIHAtaGVhZGVye2ZsZXg6MSAwfS5zZWN0aW9uLWNvbnRhaW5lciAvZGVlcC8gLnVpLWFjY29yZGlvbi1oZWFkZXIudWktc3RhdGUtZGlzYWJsZWR7b3BhY2l0eToxfS5zZWN0aW9uLXRpdGxle2ZvbnQtc2l6ZToxLjFlbX0uc2VjdGlvbi1kZXNjcmlwdGlvbntmb250LXNpemU6LjllbTtwYWRkaW5nOi42ZW0gMCAuMmVtfS5zZWN0aW9uLWZvb3Rlci1jb250YWluZXJ7bWFyZ2luOjFlbSAyZW0gMDtwYWRkaW5nOi44ZW0gMCAxLjVlbSAuOGVtO2JvcmRlci10b3A6MXB4IHNvbGlkICNkN2Q3ZDd9LnNlY3Rpb24tZm9vdGVyLWNvbnRhaW5lciAuZm9vdGVyLWFjdGlvbnN7ZGlzcGxheTppbmxpbmUtYmxvY2s7dGV4dC1hbGlnbjpyaWdodDt3aWR0aDoxMDAlfS5zZWN0aW9uLWFjdGlvbnN7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDt6LWluZGV4OjF9LnNlY3Rpb24tYWN0aW9ucyAvZGVlcC8gYS5saW5rLC5zZWN0aW9uLWFjdGlvbnMgL2RlZXAvIGEubGluazpob3ZlcntwYWRkaW5nOjA7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LnNlY3Rpb24tZWRpdC1hY3Rpb257Zm9udC1zaXplOjEuNWVtO3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6LjFlbSAwIC4xZW0gLjVlbTtjdXJzb3I6cG9pbnRlcn0uc2VjdGlvbi1lZGl0LWFjdGlvbi5pY29uLWVkaXR7Zm9udC1zaXplOjEuNGVtfS5zZWN0aW9uLWNvbnRhaW5lciAvZGVlcC8gLnVpLWFjY29yZGlvbi1oZWFkZXJ7Y29sb3I6IzM2MzYzNjtib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOiNmZmYhaW1wb3J0YW50O3BhZGRpbmc6MCAxZW19LnNlY3Rpb24tY29udGFpbmVyIC9kZWVwLyAudWktYWNjb3JkaW9uLWNvbnRlbnR7Ym9yZGVyOm5vbmU7cGFkZGluZzoxZW0gMmVtfS5zZWN0aW9uLWNvbnRhaW5lciAvZGVlcC8gLnVpLWFjY29yZGlvbi1oZWFkZXIgL2RlZXAvIGFbcm9sZT10YWJde3BhZGRpbmc6Ljc1ZW0gMDt0ZXh0LWRlY29yYXRpb246bm9uZX0uc2VjdGlvbi1jb250YWluZXIgL2RlZXAvIC51aS1hY2NvcmRpb24taGVhZGVyLnVpLXN0YXRlLWFjdGl2ZSAvZGVlcC8gYVtyb2xlPXRhYl17Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2Q3ZDdkNztjb2xvcjojMzYzNjM2fS5zZWN0aW9uLWNvbnRhaW5lciAvZGVlcC8gLnNlY3Rpb24tbm8taGVhZGVyIC9kZWVwLyAudWktYWNjb3JkaW9uLWhlYWRlcntoZWlnaHQ6MXB4fS5zZWN0aW9uLWNvbnRhaW5lciAvZGVlcC8gLnNlY3Rpb24tbm8taGVhZGVyIC9kZWVwLyAudWktYWNjb3JkaW9uLWhlYWRlci51aS1zdGF0ZS1hY3RpdmUgL2RlZXAvIGFbcm9sZT10YWJde2JvcmRlci1ib3R0b206bm9uZX0uc2VjdGlvbi1jb250YWluZXIgL2RlZXAvIC5zZWN0aW9uLW5vLWhlYWRlciAvZGVlcC8gLnVpLWFjY29yZGlvbi1oZWFkZXIgLnNlY3Rpb24tZWRpdC1hY3Rpb257Y3Vyc29yOnBvaW50ZXIhaW1wb3J0YW50fTpob3N0IC9kZWVwLyAudWktYWNjb3JkaW9uLWhlYWRlciAvZGVlcC8gLnBpLnBpLWNhcmV0LWRvd24sOmhvc3QgL2RlZXAvIC51aS1hY2NvcmRpb24taGVhZGVyIC9kZWVwLyAucGkucGktY2FyZXQtcmlnaHR7Zm9udC1mYW1pbHk6XCJTQVAgaWNvbiBmb250c1wiO2ZvbnQtc2l6ZToxLjFlbTt0b3A6LjhlbTtsZWZ0Oi4xZW07Y29sb3I6Izc2NzY3NjttYXJnaW4tdG9wOjB9Omhvc3QgL2RlZXAvIC51aS1hY2NvcmRpb24taGVhZGVyLnVpLXN0YXRlLWRpc2FibGVkIC9kZWVwLyAuZmEsOmhvc3QgL2RlZXAvIC51aS1hY2NvcmRpb24taGVhZGVyLnVpLXN0YXRlLWRpc2FibGVkIC9kZWVwLyAucGl7ZGlzcGxheTpub25lfTpob3N0IC9kZWVwLyAudWktYWNjb3JkaW9uLWhlYWRlciAvZGVlcC8gLnBpLnBpLWNhcmV0LXJpZ2h0OmJlZm9yZXtjb250ZW50OlwiXFxcXGUxZWRcIn06aG9zdCAvZGVlcC8gLnVpLWFjY29yZGlvbi1oZWFkZXIgL2RlZXAvIC5waS5waS1jYXJldC1kb3duOmJlZm9yZXtjb250ZW50OlwiXFxcXGUxZWZcIn1gXVxufSlcbmV4cG9ydCBjbGFzcyBTZWN0aW9uQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpdGxlIG9mIHRoaXMgc2VjdGlvblxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGlzIHNlY3Rpb24uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRoaXMgc2VjdGlvbiBiZSBvcGVuZWQgYXQgdGhlIHN0YXJ0LiBEZWZhdWx0IGlzIG9wZW5lZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9wZW5lZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoaXMgc2VjdGlvbiBjYW4gYmUgY2xvc2VkIG9yIG5vdC5cbiAgICAgKiovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlQ2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhpcyBzZWN0aW9uIGlzIGluIEVkaXRTdGF0ZSBvciBub3QuXG4gICAgICpcbiAgICAgKiBXaGVuIGluIGVkaXRpbmcgc3RhdGUgYW5kIHdlIHNob3cgXCJDYW5jZWwgLyBTYXZlXCIgYnV0dG9uIGRldmVsb3BlciBuZWVkcyB1c2UgdGhpcyBiaW5kaW5nXG4gICAgICogdG8gY29udHJvbCB0aGUgc3RhdGUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBlZGl0U3RhdGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBFZGl0aW5nIG1vZGUuIFRlbGxzIHRoZSBjb21wb25lbnRzIGlmIGl0cyBpdHMgZGVmYXVsdCBiZWhhdmlvciBvciBkcml2ZW4gYnlcbiAgICAgKiBhcHBsaWNhdGlvbiB1c2luZyB0aGlzIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIHtAc2VlIEVkaXRNb2RlfVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBlZGl0TW9kZTogRWRpdE1vZGUgPSAnZGVmYXVsdCc7XG5cblxuICAgIC8qKlxuICAgICAqIERldmVsb3BlciBjYW4gcHJvdmlkZSBjdXN0b20gRWRpdCBhY3Rpb24gaWNvbiB0aGF0IHdpbGwgYXBwZWFyIGluIHRoZSByaWdodCB0b3AgY29ybmVyXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhY3Rpb25JY29uOiBzdHJpbmcgPSAnaWNvbi1lZGl0JztcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VjdGlvbiBpcyBmdWxseSBvcGVuZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25PcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VjdGlvbiBpcyBmdWxseSBjbG9zZWQuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFZGl0IHN0YXRlIHRvIGJyb2FkY2FzdCBzdGF0ZSBvZiBjdXJyZW50IHNlY3Rpb25cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkVkaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGluIGVkaXRpbmcgc3RhdGUgYW5kIGRlZmF1bHQgYnV0dG9ucyBhcmUgcmVuZGVyZWQgb24gY2xpY2sgYnJvYWRjYXN0IENhbmNlbCBhY3Rpb25cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNhbmNlbEFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gaW4gZWRpdGluZyBzdGF0ZSBhbmQgZGVmYXVsdCBidXR0b25zIGFyZSByZW5kZXJlZCBvbiBjbGljayBicm9hZGNhc3QgU2F2ZSBhY3Rpb25cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblNhdmVBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICBAT3V0cHV0KClcbiAgICBvbkVkaXRpbmdDb21wbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBMb2NhbCB2YXJpYWJsZSBvbiB3aGV0aGVyIHRoaXMgc2VjdGlvbiBpcyBleHBhbmRlZCBvciBub3QuXG4gICAgICogRGlmZmVycyBmcm9tICdvcGVuZWQnLiBvcGVuZWQgaXMgYW4gaW5wdXQgcGFyYW1ldGVyIGFuZCBpdCBkb2Vzbid0IHRyYWNrXG4gICAgICogY3VycmVudCBzZWN0aW9uIGV4cGFuZGVkIHN0YXRlLlxuICAgICAqL1xuICAgIGV4cGFuZGVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogaW50ZXJuYWwgYWNjb3JkaW9uVGFiXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgnYWNjb3JkaW9uVGFiJylcbiAgICBwcml2YXRlIGFjY29yZGlvblRhYjogQWNjb3JkaW9uVGFiO1xuXG5cbiAgICAvKipcbiAgICAgKiBTYXZlIHJlZmVyZW5jZSB0byBkZXZlbG9wZXIncyBkZWZpbmVkIGFjdGlvbnMgc28gaWYgd2UgY2FuIGhpZGUgZGVmYXVsdCBvbmVzXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChTZWN0aW9uQWN0aW9uc0NvbXBvbmVudClcbiAgICBjdXN0b21BY3Rpb25zOiBTZWN0aW9uQWN0aW9uc0NvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICAvLyBJZiBJIGhhdmUgbm90IGhlYWRlciwgdGhlbiBJIGNhbid0IGNsb3NlIHRoZSBzZWN0aW9uLlxuICAgICAgICBpZiAoIXRoaXMuaXNIZWFkZXJEaXNwbGF5ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgSSBjYW4ndCBjbG9zZSB0aGUgc2VjdGlvbiwgdGhlbiBpdCBzaG91bGQgZGVmYXVsdCBvcGVuLlxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlQ2xvc2UpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgZXhwYW5kZWQgc3RhdGUuXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLm9wZW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb24ndCBkaXNwbGF5IGhlYWRlciBhcmVhIGlmIEkgZG9uJ3QgaGF2ZSB0aXRsZSBhbmQgZGVzY3JpcHRpb24uXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzSGVhZGVyRGlzcGxheWVkKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHRoaXMudGl0bGUpIHx8IGlzUHJlc2VudCh0aGlzLmRlc2NyaXB0aW9uKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3NzIENsYXNzIHRoYXQgY29udHJvbCB0aGUgbG9vayBhbmQgZmVlbCBmb3Igc2VjdGlvbiBjb21wb25lbnQuXG4gICAgICovXG4gICAgYUNsYXNzKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSGVhZGVyRGlzcGxheWVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2VjdGlvbi1uby1oZWFkZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpbmNlIHdlIGludHJvZHVjZWQgYnV0dG9ucyBhbmQgZWRpdFN0YXRlIHRoZSBkZWNpc2lvbiBvbiB3aGVuIHRvIGV4aXQgZWRpdGluZyBtb2RlXG4gICAgICogc2hvdWxkIGJlIG9uIHRoZSBkZXZlbG9wZXIgdXNpbmcgdGhpcyBjb21wb25lbnQgdGhlcmVmb3JlIG9ubHkgc3RhcnRFZGl0aW5nXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkVkaXRBY3Rpb24oJGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIC8vIHdoZW4gaW4gZWRpdGluZyBtYWtlIHN1cmUgd2UgZG9udCBzd2l0Y2ggc3RhdGUgYXMgdGhlcmUgY2FuIGJlIHNvbWUgRm9ybSBlcnJvcnNcbiAgICAgICAgLy8gd2hpY2ggbmVlZHMgdG8gYmUgaGFuZGxlZCBieSBkZXZlbG9wZXIgYW5kIG9ubHkgdGhlbiBjaGFuZ2UgdGhlIGVkaXRTdGF0ZVxuICAgICAgICBpZiAoIXRoaXMuZWRpdFN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRTdGF0ZSA9ICF0aGlzLmVkaXRTdGF0ZTtcbiAgICAgICAgICAgIGxldCBzdGF0ZTogc3RyaW5nID0gKHRoaXMuZWRpdFN0YXRlKSA/ICdpbkVkaXQnIDogJ25vdEluRWRpdCc7XG5cbiAgICAgICAgICAgIHRoaXMub25FZGl0LmVtaXQoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcmV2ZW50IHRoZSBvcmlnaW5hbCBldmVudCBmcm9tIGJ1YmJsaW5nIHVwLiBCZWNhdXNlIHRoZSBlZGl0IGljb24gaXMgaW5zaWRlXG4gICAgICAgIC8vIHRoZSBoZWFkZXIuIElmIHRoZSBjbGljayBldmVuIGlzIGJ1YmJsZWQgdXAsIHRoaXMgZXZlbnQgd2lsbCBjYXVzZSB0aGUgc2VjdGlvbiB0b1xuICAgICAgICAvLyBleHBhbmQgb3IgY29sbGFwc2UuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoJGV2ZW50LmV2ZW50KSkge1xuICAgICAgICAgICAgJGV2ZW50LmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgJGV2ZW50LmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNEZXNjcmlwdGlvbigpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZGVzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gdGhpcyBzZWN0aW9uLCBpZiBpdCdzIGFscmVhZHkgb3Blbiwgd2lsbCBkbyBub3RoaW5nLlxuICAgICAqL1xuICAgIG9wZW4oZXZlbnQ/OiBhbnkpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIGlmICghdGhpcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5hY2NvcmRpb25UYWIudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoaXMgc2VjdGlvbiwgaWYgaXQncyBhbHJlYWR5IGNsb3NlLCB3aWxsIGRvIG5vdGhpbmcuXG4gICAgICovXG4gICAgY2xvc2UoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjY29yZGlvblRhYi50b2dnbGUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIGFjY29yZGlvbiBpcyBvcGVuZWRcbiAgICAgKlxuICAgICAqL1xuICAgIG9uU2VjdGlvbk9wZW4oZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KCdvcGVuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIGFjY29yZGlvbiBpcyBjbG9zZWRcbiAgICAgKlxuICAgICAqL1xuICAgIG9uU2VjdGlvbkNsb3NlKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCdjbG9zZScpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUZWxscyB1cyBpZiB3ZSBuZWVkIHRvIHJlbmRlciBhcHBsaWNhdGlvbiBkZWZpbmVkIGN1c3RvbSBhY3Rpb25zXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNDdXN0b21BY3Rpb25zKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jdXN0b21BY3Rpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0IHRoZSBlZGl0aW5nIHN0YXRlIGJhY2sgdG8gbm9uLWVkaXRhYmxlXG4gICAgICovXG4gICAgY29tcGxldGVFZGl0aW5nKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZWRpdFN0YXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25FZGl0aW5nQ29tcGxldGUuZW1pdCh0aGlzLmVkaXRTdGF0ZSk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXN1YnNlY3Rpb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cInN1YnNlY3Rpb24tdGl0bGVcIj57e3RpdGxlfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgIGAsXG4gICAgc3R5bGVzOiBbJy5zdWJzZWN0aW9uLXRpdGxlIHtjb2xvcjogIzM2MzYzNjsgfSddXG59KVxuZXhwb3J0IGNsYXNzIFN1YlNlY3Rpb25Db21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aXRsZSBvZiB0aGlzIHN1YiBzZWN0aW9uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogc3RyaW5nO1xufVxuXG5cbi8qKlxuICogRGVmaW5lcyBlZGl0aW5nIG1vZGVzIGZvciB0aGUgU2VjdGlvbnMuIERlZmF1bHQgbWVhbnMgd2Ugc2hvdyBjYW5jZWwgLyBzYXZlIGJ1dHRvbnMgYW5kIGhpZGVcbiAqIGVkaXQgaWNvbnMgd2hlbiBpbiBlZGl0aW5nLiBleHRlcm5hbCBpcyBkcml2ZW4gYnkgYXBwbGljYXRpb25cbiAqL1xuZXhwb3J0IHR5cGUgRWRpdE1vZGUgPSAnZGVmYXVsdCcgfCAnZXh0ZXJuYWwnO1xuXG4iXX0=