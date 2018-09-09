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
import { ElementRef, EventEmitter } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../core/base.component';
/**
 * Allow developer to override default actions. Must have this declared before class when we
 * want to have this declaration inside the same file.
 */
export declare class SectionActionsComponent {
}
/**
 *
 * Section component that implements a section of the page. It's an outline box that
 * has the ability to expand and hide its content.
 *
 * ```ts
 *  @Component({
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
export declare class SectionComponent extends BaseComponent {
    protected element: ElementRef;
    env: Environment;
    /**
     * The title of this section
     */
    title: string;
    /**
     * The description of this section.
     */
    description: string;
    /**
     * Should this section be opened at the start. Default is opened.
     */
    opened: boolean;
    /**
     * Whether this section can be closed or not.
     **/
    disableClose: boolean;
    /**
     * Whether this section is in EditState or not.
     *
     * When in editing state and we show "Cancel / Save" button developer needs use this binding
     * to control the state.
     */
    editState: boolean;
    /**
     * Current Editing mode. Tells the components if its its default behavior or driven by
     * application using this component.
     *
     * {@see EditMode}
     *
     */
    editMode: EditMode;
    /**
     * Developer can provide custom Edit action icon that will appear in the right top corner
     */
    actionIcon: string;
    /**
     * Event emitted when the section is fully opened.
     */
    onOpen: EventEmitter<any>;
    /**
     * Event emitted when the section is fully closed.
     */
    onClose: EventEmitter<any>;
    /**
     * Edit state to broadcast state of current section
     */
    onEdit: EventEmitter<any>;
    /**
     * When in editing state and default buttons are rendered on click broadcast Cancel action
     */
    onCancelAction: EventEmitter<any>;
    /**
     * When in editing state and default buttons are rendered on click broadcast Save action
     */
    onSaveAction: EventEmitter<any>;
    onEditingComplete: EventEmitter<any>;
    /**
     * Local variable on whether this section is expanded or not.
     * Differs from 'opened'. opened is an input parameter and it doesn't track
     * current section expanded state.
     */
    expanded: boolean;
    /**
     * internal accordionTab
     */
    private accordionTab;
    /**
     * Save reference to developer's defined actions so if we can hide default ones
     */
    customActions: SectionActionsComponent;
    constructor(element: ElementRef, env: Environment);
    ngOnInit(): void;
    /**
     * Don't display header area if I don't have title and description.
     *
     */
    private isHeaderDisplayed();
    /**
     * Css Class that control the look and feel for section component.
     */
    aClass(): string;
    /**
     * Since we introduced buttons and editState the decision on when to exit editing mode
     * should be on the developer using this component therefore only startEditing
     *
     */
    onEditAction($event: any): void;
    hasDescription(): boolean;
    /**
     * Open this section, if it's already open, will do nothing.
     */
    open(event?: any): void;
    /**
     * Close this section, if it's already close, will do nothing.
     */
    close(event: any): void;
    /**
     * Callback to be invoked when accordion is opened
     *
     */
    onSectionOpen(event: any): void;
    /**
     * Callback to be invoked when accordion is closed
     *
     */
    onSectionClose(event: any): void;
    /**
     *
     * Tells us if we need to render application defined custom actions
     *
     */
    hasCustomActions(): boolean;
    /**
     * Emit the editing state back to non-editable
     */
    completeEditing(): void;
}
export declare class SubSectionComponent {
    /**
     * The title of this sub section
     */
    title: string;
}
/**
 * Defines editing modes for the Sections. Default means we show cancel / save buttons and hide
 * edit icons when in editing. external is driven by application
 */
export declare type EditMode = 'default' | 'external';
