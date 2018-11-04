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


import {TemplateRef} from '@angular/core';
import {SelectionMode} from './datatable2.component';
import {DTColumn2Component} from './column/dt-column.component';

import {DetailRowExpansionState, DT2DataSource} from './datatable2-data-source';
import {OutlineState} from '../outline';
import {DTDetailRowComponent} from './column/detail-row/dt-detail-row.component';


export const DragEvents: string[] = ['mousedown', 'dragstart', 'dragover', 'dragenter', 'dragleave',
  'drop', 'dragend'];

export enum DragRowDirection {
  None = 'none',
  Up = 'dt-drag-row-top',
  Down = 'dt-drag-row-bottom',
  Middle = 'dt-drag-row-both'
}


export enum DragColumnDirection {
  None = 'none',
  Left = 'dt-drag-col-left',
  Right = 'dt-drag-col-right',
}


export enum DropPosition {
  Before = 'before',
  After = 'after',
  Into = 'into'
}


/**
 * Abstract type that is sharable among dependant DT object such as Columns, DataSources,
 * Directives to be able to communicate back to the datatable mainly to avoid circular dependency
 */
export interface AWDataTable {

  /**
   * Allows you to pass your own datasource to override default one. Also when dataSource is
   * used the destinationClass or list are ignored
   */
  dataSource: DT2DataSource;

  /**
   * Manages outline states for Datatables using outline control
   */
  outlineState: OutlineState;


  /**
   * In case we have detail row remember its expansion state
   */
  detailRowExpansionState: DetailRowExpansionState;

  /**
   * What column is used as first for sorting
   */
  initialSortKey: string;

  /**
   * Allow to change sorting direction
   */
  initialSortOrder: string;

  /**
   *
   * Tells DT if we support cell selection or row based selection which is regular DT.
   *
   */
  selectionMode: SelectionMode;

  /**
   * In case of single or multiselection show controls
   *
   */
  showSelectionColumn: boolean;

  /**
   * Tells if we want to render one selection control in the header to select all the
   * rows. Applicable for multiselection
   *
   */
  showSelectAll: boolean;

  /**
   * Identify if row or cell is selectable based on data
   */
  isRowSelectable: (item: any) => boolean;


  /**
   * Enables or disables column reordering
   *
   */
  dndColumnEnabled: boolean;


  /**
   * Each DTColumn have have its own template to provide content for header, subheader and
   * body but if those template are identical there would be too much duplicate code to replicate
   * for each column the same. Therefore we have these global templates that you can declare
   * on DT level (not under columns) and content of these template will be used for each column
   *
   * You can mix them as well. You can have global templates as well as template on the Column
   * level which would override the global one
   *
   */
  headerTemplate: TemplateRef<any>;

  /**
   * See headerTemplate for more details
   */
  subHeaderTemplate: TemplateRef<any>;

  /**
   * See headerTemplate for more details
   */
  bodyTemplate: TemplateRef<any>;
  /**
   * See headerTemplate for more details
   */
  headerFilterTemplate: TemplateRef<any>;

  /**
   *
   * Render a subHeader template if present
   *
   */
  showSubHeader: boolean;

  /**
   * This is global style function that can be bound to table and read by each column.
   * The same you can see on the DTColumn
   */
  bodyClassFn: (column: DTColumn2Component, item: any) => string;


  /**
   * Context is important when we execute any function that is passed in as input. We need to
   * give option to be executed within the context (this) of the code using this component.
   *
   */
  context: any;

  // Outline needed properties

  /**
   * Pushes outlineFor section on the new line and 2nd level child make it root for this
   * section
   */
  pushRootSectionOnNewLine: boolean;

  /**
   * You can change default indentation for the outline nodes
   *
   */
  indentationPerLevel: number;

  /**
   * When active applies special styles to the DT. Later on once pivot is implemented this will
   * also add additional behavior to the DT
   *
   */
  pivotalLayout: boolean;


  /**
   * When sorting is enabled this is current active column being sorted.
   *
   *  - we dont support multiple column sorting
   */
  sortColumn: DTColumn2Component;

  /**
   * Reference to aw-dt-detail-column if present detail row is rendered for specified
   * items
   */
  rowDetailColumn: DTDetailRowComponent;

  /**
   * Used for spaning calculation or for the detail row to identify correct number of columns
   * to span, when they are some non-data column (expansion control, single/multi selection)
   */
  numberOfColsBeforeData: number;


  /**
   *  what is the index of first data columns
   */
  startOfFirstDataColumn: number;


  /**
   * Triggered when in cell selection mode
   *
   */
  onCellSelectionChange(cell: any, column: DTColumn2Component, item: any): void;


  /**
   * Triggered by column whe header is selected. Current we assume the only one header can be
   * selected at the time.
   *
   */
  onHeaderSelectionChange(cell: any, column: DTColumn2Component): void;


  onHandleRowClicked(event: any, item: any): void;

  /**
   *
   * Handles row selection logic where if the item is found inside the selected items, then
   * its removed otherwise its added.
   *
   * Todo: Sync & refactor this with dt.onCellSelectionChange - pretty similar code
   *
   * We want to have rowToggle as well as we will have rowSelect or somethign similar to
   * identify we are dealing with multiselect and single selection
   */
  onRowToggle(event: any, item: any): void;


  /**
   *
   * Handles row single selection
   *
   */
  onRowSelect(event: any, item: any): void;

  /**
   * When dealing with outline (tree) we need to make sure when we select some root item it
   * will automatically also select all its children
   *
   */
  onHandleOutlineRowToggleToChildren(currentItem: any, isSelected: boolean): void;


  /**
   *
   * Just like for onHandleOutlineRowToggleToChildren the same behavior needs to be applied for
   * towards up.
   *
   *
   */
  oHandleOutlineRowToggleToParent(currentItem: any, isSelected: boolean): void;


  /**
   *
   * Called by D&D row directive to update this TD that row reordering needs to happen. We
   * receive an INDEX of row we are dragging and new drop position, plus information if it
   * needs to be dropped before new row position or after.
   *
   */
  onDnDRowDrop(origPos: number, newPos: number, dropPos: DropPosition): void;


  /**
   *
   * When detail row is combined with outline control we need make sure that we maintain the
   * correct state for items that are eligible for detail row
   *
   * In this specific case the detail row does not have its own expander but utilizing the
   * outlineControl
   */
  onOutlineExpandChange(event: any): void;


  /**
   *
   * Called by D&D column directive to reorder column. Functionality is similar like
   * onDnDRowDrop
   *
   */
  onDnDColumnDrop(origPos: number, newPos: number, dropPos: DropPosition,
                  drop: DropPosition
  ): void;


  /**
   * Support for single column sorting
   *
   *
   */
  sortSingle(): void;

  /**
   * When data changes, either they are lazily fetched or @Input LIST is updated we need
   * resort out data based on current state and update internal list dataToRender so new
   * data can re-rendered + triggers event valueChange
   *
   */
  handleDataChange(): void;

  updateDataToRender(datasource?: any): void;


  /**
   * Select or unselect all rows. Used by header checkbox
   *
   */
  toggleAllColumns(event: any): void;

  /**
   * More like utility methods to translate string<-->number value for sorting
   *
   * Currently used only by DTColumn. We might want to move this its own component for
   * headerSort and ordering
   *
   */
  sortOrderingForString(direction: string): number;

  sortOrderingForNumber(direction: number): string;

  visibleColumns(): DTColumn2Component[];

  hasFrozenColumns(): boolean;

  /**
   * Placeholder functionality for the single/multiselect functionality where we need to track if
   * we support selection plus how many column it occupies and if the selection controls are
   * visible or hidden.
   */
  hasInvisibleSelectionColumn(): boolean;


  /**
   *
   * Placeholder to identify if they are non-value column
   *
   */
  hasLeadingSelectColumn(): boolean;


  /**
   * To compare the data if we use deep object equality and this is used within this class as
   * well as from the DTColumn to conditionally add class which select the cell
   *
   * We might want to change to check only a key of the object some unique identifier.
   */
  isHeaderSelected(item: DTColumn2Component): boolean;

  /**
   *
   * Check if the specific cell is selected. We need two points to identify if cell is selected
   * the actual Item that could represent whole row and Column
   *
   */
  isBodyCellSelected(column: DTColumn2Component, item: any): boolean;

  /**
   *  Check if the given item is among the selected ones
   *
   */
  isRowSelected(item: any): boolean;

  /**
   *
   * When [children] binding is present then it means we need to render it as a tree
   *
   */
  isOutline(): boolean;


  /**
   *
   * Defaults the checkbox to either selected and not selected depended on internal state
   *
   */
  isToggleAllColumnSelected(): boolean;

  isToggleAllColumnDisabled(): boolean;


  /**
   *
   * Uses are field path utility class to retrieve data from object
   *
   */
  getValue(data: any, field: string): any;

}
