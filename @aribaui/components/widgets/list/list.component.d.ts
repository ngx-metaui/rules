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
import { EventEmitter, TemplateRef } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { Listbox, SelectItem } from 'primeng/primeng';
import { CheckboxComponent } from '../checkbox/checkbox.component';
export declare const LB_CONTROL_VALUE_ACCESSOR: any;
/**
 *
 * The List component represent a structure which contains a list of selectable items. Items
 * selection can be configured in single-selection, multi-selection or multi-selection with visible
 * checkboxes mode.
 * In addition it can display data inside 3 zones LEFT, MIDDLE and RIGHT in order to provide
 * easy way for application developer to layout its own custom content or even change out of box
 * behavior.
 *
 *
 *  ### Examples
 *
 *  1. Render simple single selection list
 *
 *  ```html
 *
 *      <aw-list [list]="list"></aw-list>
 *
 *  ```
 *  2. Render list - multi selection with custom RIGHT content to show a CheckMark when item
 *  is selected
 *
 *  ```html
 *
 *   <aw-list #awlist [list]="list"
 *                       height="150px"
 *                       width="250px"
 *                       [selectionMode]="'multi'">
 *
 *                  <ng-template #right let-item>
 *
 *                      <span class="sap-icon"
 *                            [ngClass]="{'icon-accept': awlist.pListBox.isSelected(item),
 *                            '': !awlist.pListBox.isSelected(item)}">
 *
 *                      </span>
 *                  </ng-template>
 *   </aw-list>
 *
 *  ```
 *
 * 3. Render list - multi selection with visible checkboxes and custom MIDDLE content to change
 *  the way item name is rendered
 *
 *
 *
 *  ```html
 *
 *   <aw-list [list]="list" height="180px"
 *                       width="200px"
 *                       [selection]="selection"
 *                       [selectionMode]="'multiWithCheckbox'">
 *
 *                  <ng-template #middle let-item>
 *                      XX-{{item.value}}
 *                  </ng-template>
 *    </aw-list>
 *
 *  ```
 *
 *
 *
 */
export declare class ListComponent extends BaseFormComponent {
    env: Environment;
    protected parentContainer: BaseFormComponent;
    /**
     * List of option that will show in the list. Please not that this list is current used to
     * show limited number of items. It does not have any scrolling feature and lazy loading
     *
     */
    list: any[];
    /**
     * Items which was selected as a default values
     */
    selection: any;
    /**
     * Component recognizes 3 modes: single, multi, multi with visible checkboxes
     */
    selectionMode: SelectionMode;
    /**
     * Formatter used to format each selection for display.
     *
     */
    valueTransformer: (value: any) => string;
    /**
     * Used when dealing with object to identify specific field on the object forcomparison
     */
    field: string;
    /**
     * Don't render Listbox border. Used for embedding this inside other components
     *
     */
    borderless: boolean;
    /**
     * Triggered when we double click on the list Item
     *
     */
    action: EventEmitter<any>;
    /**
     * Event fired when user select a item
     *
     */
    onSelection: EventEmitter<any>;
    /**
     * In case we want to override default behavior or Left zone. We expose this listBox in order to
     * have access primeNg implementation
     */
    pListBox: Listbox;
    /**
     * Custom templates to override default behavior. The list item is divided into 3 zones
     *
     *
     *  ------------------------------------------------------
     *  |       |                                   |        |
     *  |   L   |             M                     |   R    |
     *  |       |                                   |        |
     *  |       |                                   |        |
     *  ------------------------------------------------------
     *
     *
     */
    lZoneTempl: TemplateRef<any>;
    mZoneTempl: TemplateRef<any>;
    rZoneTempl: TemplateRef<any>;
    /**
     * Internal
     */
    internalList: SelectItem[];
    listStyle: {
        [name: string]: any;
    };
    isMultiple: boolean;
    showCheckbox: boolean;
    constructor(env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     *
     * Since we are using <aw-checkbox> we need to have custom handling both when clicking on the
     * checkbox as well as item text.
     *
     *
     */
    itemClicked(event: any, item: any, checkbox: CheckboxComponent): void;
    /**
     * Internal
     *
     */
    hasRightTempl(): boolean;
    hasLeftTempl(): boolean;
    hasMiddleTempl(): boolean;
    /**
     *
     * Triggered by p-listbox component when item is selected. When state is managed internally
     * we also update FormControl model.
     *
     */
    onItemSelected(event: any): void;
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    writeValue(value: any): void;
    /**
     * Translates external form of the list into PrimeNG expected format where it uses
     * SelectionItem interface
     */
    private initList();
    /**
     *  Generates label value for the list box.
     *
     */
    private displayValue(item);
}
/**
 * List support these three selection modes
 *
 */
export declare type SelectionMode = 'single' | 'multi' | 'multiWithCheckbox';
