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
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {isPresent} from '../../../core/utils/lang';
import {Environment} from '../../../core/config/environment';
import {AccordionTab} from 'primeng/primeng';
import {BaseComponent} from '../../core/base.component';


/**
 * Allow developer to override default actions. Must have this declared before class when we
 * want to have this declaration inside the same file.
 */
@Component({
  selector: 'aw-section-actions',
  template: `
    <ng-content></ng-content> `,
})
export class SectionActionsComponent {

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
@Component({
  selector: 'aw-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.scss']
})
export class SectionComponent extends BaseComponent {

  /**
   * The title of this section
   */
  @Input()
  title: string;

  /**
   * The description of this section.
   */
  @Input()
  description: string;

  /**
   * Should this section be opened at the start. Default is opened.
   */
  @Input()
  opened: boolean = true;

  /**
   * Whether this section can be closed or not.
   **/
  @Input()
  disableClose: boolean = false;

  /**
   * Whether this section is in EditState or not.
   *
   * When in editing state and we show "Cancel / Save" button developer needs use this binding
   * to control the state.
   */
  @Input()
  editState: boolean = false;


  /**
   * Current Editing mode. Tells the components if its its default behavior or driven by
   * application using this component.
   *
   * {@see EditMode}
   *
   */
  @Input()
  editMode: EditMode = 'default';


  /**
   * Developer can provide custom Edit action icon that will appear in the right top corner
   */
  @Input()
  actionIcon: string = 'icon-edit';

  /**
   * Event emitted when the section is fully opened.
   */
  @Output()
  onOpen: EventEmitter<any> = new EventEmitter();

  /**
   * Event emitted when the section is fully closed.
   */
  @Output()
  onClose: EventEmitter<any> = new EventEmitter();

  /**
   * Edit state to broadcast state of current section
   */
  @Output()
  onEdit: EventEmitter<any> = new EventEmitter();


  /**
   * When in editing state and default buttons are rendered on click broadcast Cancel action
   */
  @Output()
  onCancelAction: EventEmitter<any> = new EventEmitter();


  /**
   * When in editing state and default buttons are rendered on click broadcast Save action
   */
  @Output()
  onSaveAction: EventEmitter<any> = new EventEmitter();


  @Output()
  onEditingComplete: EventEmitter<any> = new EventEmitter();

  /**
   * Local variable on whether this section is expanded or not.
   * Differs from 'opened'. opened is an input parameter and it doesn't track
   * current section expanded state.
   */
  expanded: boolean;

  /**
   * internal accordionTab
   */
  @ViewChild('accordionTab')
  private accordionTab: AccordionTab;


  /**
   * Save reference to developer's defined actions so if we can hide default ones
   */
  @ContentChild(SectionActionsComponent)
  customActions: SectionActionsComponent;

  constructor(protected element: ElementRef, public env: Environment) {
    super(env);
    this.editable = false;
  }

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
   */
  private isHeaderDisplayed(): boolean {
    return (isPresent(this.title) || isPresent(this.description));
  }

  /**
   * Css Class that control the look and feel for section component.
   */
  aClass(): string {
    if (!this.isHeaderDisplayed()) {
      return 'section-no-header';
    }

    return '';
  }

  /**
   * Since we introduced buttons and editState the decision on when to exit editing mode
   * should be on the developer using this component therefore only startEditing
   *
   */
  onEditAction($event: any): void {

    // when in editing make sure we dont switch state as there can be some Form errors
    // which needs to be handled by developer and only then change the editState
    if (!this.editState) {
      this.editState = !this.editState;
      const state: string = (this.editState) ? 'inEdit' : 'notInEdit';

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

  hasDescription(): boolean {
    return isPresent(this.description);
  }

  /**
   * Open this section, if it's already open, will do nothing.
   */
  open(event?: any): void {

    if (!this.expanded) {
      this.accordionTab.toggle(event);
    }
  }

  /**
   * Close this section, if it's already close, will do nothing.
   */
  close(event: any): void {
    if (this.expanded) {
      this.accordionTab.toggle(event);
    }
  }

  /**
   * Callback to be invoked when accordion is opened
   *
   */
  onSectionOpen(event: any): void {
    this.expanded = true;
    this.onOpen.emit('open');
  }

  /**
   * Callback to be invoked when accordion is closed
   *
   */
  onSectionClose(event: any): void {
    this.expanded = false;
    this.onClose.emit('close');
  }


  /**
   *
   * Tells us if we need to render application defined custom actions
   *
   */
  hasCustomActions(): boolean {
    return isPresent(this.customActions);
  }

  /**
   * Emit the editing state back to non-editable
   */
  completeEditing(): void {
    this.editState = false;
    this.onEditingComplete.emit(this.editState);
  }
}

@Component({
  selector: 'aw-subsection',
  template: `
    <h4 class="subsection-title">{{title}}</h4>
    <ng-content></ng-content>
  `,
  styles: ['.subsection-title {color: #363636; }']
})
export class SubSectionComponent {

  /**
   * The title of this sub section
   */
  @Input()
  title: string;
}


/**
 * Defines editing modes for the Sections. Default means we show cancel / save buttons and hide
 * edit icons when in editing. external is driven by application
 */
export type EditMode = 'default' | 'external';

