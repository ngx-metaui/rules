/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
/** @type {?} */
export var DragEvents = ['mousedown', 'dragstart', 'dragover', 'dragenter', 'dragleave',
    'drop', 'dragend'];
/** @enum {string} */
var DragDirection = {
    None: 'none',
    Up: 'dt-drag-row-top',
    Down: 'dt-drag-row-bottom',
    Middle: 'dt-drag-row-both',
};
export { DragDirection };
/** @enum {string} */
var DropPosition = {
    Before: 'before',
    After: 'after',
    Into: 'into',
};
export { DropPosition };
/**
 * Abstract type that is sharable among dependant DT object such as Columns, DataSources,
 * Directives to be able to communicate back to the datatable mainly to avoid circular dependency
 * @record
 */
export function AWDataTable() { }
/**
 * Allows you to pass your own datasource to override default one. Also when dataSource is
 * used the destinationClass or list are ignored
 * @type {?}
 */
AWDataTable.prototype.dataSource;
/**
 * Manages outline states for Datatables using outline control
 * @type {?}
 */
AWDataTable.prototype.outlineState;
/**
 * In case we have detail row remember its expansion state
 * @type {?}
 */
AWDataTable.prototype.detailRowExpansionState;
/**
 * What column is used as first for sorting
 * @type {?}
 */
AWDataTable.prototype.initialSortKey;
/**
 * Allow to change sorting direction
 * @type {?}
 */
AWDataTable.prototype.initialSortOrder;
/**
 *
 * Tells DT if we support cell selection or row based selection which is regular DT.
 *
 * @type {?}
 */
AWDataTable.prototype.selectionMode;
/**
 * In case of single or multiselection show controls
 *
 * @type {?}
 */
AWDataTable.prototype.showSelectionColumn;
/**
 * Tells if we want to render one selection control in the header to select all the
 * rows. Applicable for multiselection
 *
 * @type {?}
 */
AWDataTable.prototype.showSelectAll;
/**
 * Identify if row or cell is selectable based on data
 * @type {?}
 */
AWDataTable.prototype.isRowSelectable;
/**
 * Each DTColumn have have its own template to provide content for header, subheader and
 * body but if those template are identical there would be too much duplicate code to replicate
 * for each column the same. Therefore we have these global templates that you can declare
 * on DT level (not under columns) and content of these template will be used for each column
 *
 * You can mix them as well. You can have global templates as well as template on the Column
 * level which would override the global one
 *
 * @type {?}
 */
AWDataTable.prototype.headerTemplate;
/**
 * See headerTemplate for more details
 * @type {?}
 */
AWDataTable.prototype.subHeaderTemplate;
/**
 * See headerTemplate for more details
 * @type {?}
 */
AWDataTable.prototype.bodyTemplate;
/**
 * See headerTemplate for more details
 * @type {?}
 */
AWDataTable.prototype.headerFilterTemplate;
/**
 *
 * Render a subHeader template if present
 *
 * @type {?}
 */
AWDataTable.prototype.showSubHeader;
/**
 * This is global style function that can be bound to table and read by each column.
 * The same you can see on the DTColumn
 * @type {?}
 */
AWDataTable.prototype.bodyClassFn;
/**
 * Context is important when we execute any function that is passed in as input. We need to
 * give option to be executed within the context (this) of the code using this component.
 *
 * @type {?}
 */
AWDataTable.prototype.context;
/**
 * Pushes outlineFor section on the new line and 2nd level child make it root for this
 * section
 * @type {?}
 */
AWDataTable.prototype.pushRootSectionOnNewLine;
/**
 * You can change default indentation for the outline nodes
 *
 * @type {?}
 */
AWDataTable.prototype.indentationPerLevel;
/**
 * When active applies special styles to the DT. Later on once pivot is implemented this will
 * also add additional behavior to the DT
 *
 * @type {?}
 */
AWDataTable.prototype.pivotalLayout;
/**
 * When sorting is enabled this is current active column being sorted.
 *
 *  - we dont support multiple column sorting
 * @type {?}
 */
AWDataTable.prototype.sortColumn;
/**
 * Reference to aw-dt-detail-column if present detail row is rendered for specified
 * items
 * @type {?}
 */
AWDataTable.prototype.rowDetailColumn;
/**
 * Used for spaning calculation or for the detail row to identify correct number of columns
 * to span, when they are some non-data column (expansion control, single/multi selection)
 * @type {?}
 */
AWDataTable.prototype.numberOfColsBeforeData;
/**
 *  what is the index of first data columns
 * @type {?}
 */
AWDataTable.prototype.startOfFirstDataColumn;
/**
 * Triggered when in cell selection mode
 *
 * @type {?}
 */
AWDataTable.prototype.onCellSelectionChange;
/**
 * Triggered by column whe header is selected. Current we assume the only one header can be
 * selected at the time.
 *
 * @type {?}
 */
AWDataTable.prototype.onHeaderSelectionChange;
/** @type {?} */
AWDataTable.prototype.onHandleRowClicked;
/**
 *
 * Handles row selection logic where if the item is found inside the selected items, then
 * its removed otherwise its added.
 *
 * Todo: Sync & refactor this with dt.onCellSelectionChange - pretty similar code
 *
 * We want to have rowToggle as well as we will have rowSelect or somethign similar to
 * identify we are dealing with multiselect and single selection
 * @type {?}
 */
AWDataTable.prototype.onRowToggle;
/**
 *
 * Handles row single selection
 *
 * @type {?}
 */
AWDataTable.prototype.onRowSelect;
/**
 * When dealing with outline (tree) we need to make sure when we select some root item it
 * will automatically also select all its children
 *
 * @type {?}
 */
AWDataTable.prototype.onHandleOutlineRowToggleToChildren;
/**
 *
 * Just like for onHandleOutlineRowToggleToChildren the same behavior needs to be applied for
 * towards up.
 *
 *
 * @type {?}
 */
AWDataTable.prototype.oHandleOutlineRowToggleToParent;
/**
 *
 * Called by D&D row directive to update this TD that row reordering needs to happen. We
 * receive an INDEX of row we are dragging and new drop position, plus information if it
 * needs to be dropped before new row position or after.
 *
 * @type {?}
 */
AWDataTable.prototype.onDnDRowDrop;
/**
 *
 * When detail row is combined with outline control we need make sure that we maintain the
 * correct state for items that are eligible for detail row
 *
 * In this specific case the detail row does not have its own expander but utilizing the
 * outlineControl
 * @type {?}
 */
AWDataTable.prototype.onOutlineExpandChange;
/**
 * Support for single column sorting
 *
 *
 * @type {?}
 */
AWDataTable.prototype.sortSingle;
/**
 * When data changes, either they are lazily fetched or \@Input LIST is updated we need
 * resort out data based on current state and update internal list dataToRender so new
 * data can re-rendered + triggers event valueChange
 *
 * @type {?}
 */
AWDataTable.prototype.handleDataChange;
/** @type {?} */
AWDataTable.prototype.updateDataToRender;
/**
 * Select or unselect all rows. Used by header checkbox
 *
 * @type {?}
 */
AWDataTable.prototype.toggleAllColumns;
/**
 * More like utility methods to translate string<-->number value for sorting
 *
 * Currently used only by DTColumn. We might want to move this its own component for
 * headerSort and ordering
 *
 * @type {?}
 */
AWDataTable.prototype.sortOrderingForString;
/** @type {?} */
AWDataTable.prototype.sortOrderingForNumber;
/** @type {?} */
AWDataTable.prototype.visibleColumns;
/** @type {?} */
AWDataTable.prototype.hasFrozenColumns;
/**
 * Placeholder functionality for the single/multiselect functionality where we need to track if
 * we support selection plus how many column it occupies and if the selection controls are
 * visible or hidden.
 * @type {?}
 */
AWDataTable.prototype.hasInvisibleSelectionColumn;
/**
 *
 * Placeholder to identify if they are non-value column
 *
 * @type {?}
 */
AWDataTable.prototype.hasLeadingSelectColumn;
/**
 * To compare the data if we use deep object equality and this is used within this class as
 * well as from the DTColumn to conditionally add class which select the cell
 *
 * We might want to change to check only a key of the object some unique identifier.
 * @type {?}
 */
AWDataTable.prototype.isHeaderSelected;
/**
 *
 * Check if the specific cell is selected. We need two points to identify if cell is selected
 * the actual Item that could represent whole row and Column
 *
 * @type {?}
 */
AWDataTable.prototype.isBodyCellSelected;
/**
 *  Check if the given item is among the selected ones
 *
 * @type {?}
 */
AWDataTable.prototype.isRowSelected;
/**
 *
 * When [children] binding is present then it means we need to render it as a tree
 *
 * @type {?}
 */
AWDataTable.prototype.isOutline;
/**
 *
 * Defaults the checkbox to either selected and not selected depended on internal state
 *
 * @type {?}
 */
AWDataTable.prototype.isToggleAllColumnSelected;
/** @type {?} */
AWDataTable.prototype.isToggleAllColumnDisabled;
/**
 *
 * Uses are field path utility class to retrieve data from object
 *
 * @type {?}
 */
AWDataTable.prototype.getValue;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXctZGF0YXRhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9hdy1kYXRhdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStCQSxXQUFhLFVBQVUsR0FBYSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXO0lBQy9GLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQzs7O0lBSW5CLE1BQU8sTUFBTTtJQUNiLElBQUssaUJBQWlCO0lBQ3RCLE1BQU8sb0JBQW9CO0lBQzNCLFFBQVMsa0JBQWtCOzs7OztJQU0zQixRQUFTLFFBQVE7SUFDakIsT0FBUSxPQUFPO0lBQ2YsTUFBTyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5cblxuaW1wb3J0IHtUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NlbGVjdGlvbk1vZGV9IGZyb20gJy4vZGF0YXRhYmxlMi5jb21wb25lbnQnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4vY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuXG5pbXBvcnQge0RldGFpbFJvd0V4cGFuc2lvblN0YXRlLCBEVDJEYXRhU291cmNlfSBmcm9tICcuL2RhdGF0YWJsZTItZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtPdXRsaW5lU3RhdGV9IGZyb20gJy4uL291dGxpbmUnO1xuaW1wb3J0IHtEVERldGFpbFJvd0NvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4vZGV0YWlsLXJvdy9kdC1kZXRhaWwtcm93LmNvbXBvbmVudCc7XG5cblxuZXhwb3J0IGNvbnN0IERyYWdFdmVudHM6IHN0cmluZ1tdID0gWydtb3VzZWRvd24nLCAnZHJhZ3N0YXJ0JywgJ2RyYWdvdmVyJywgJ2RyYWdlbnRlcicsICdkcmFnbGVhdmUnLFxuICAgICdkcm9wJywgJ2RyYWdlbmQnXTtcblxuZXhwb3J0IGVudW0gRHJhZ0RpcmVjdGlvblxue1xuICAgIE5vbmUgPSAnbm9uZScsXG4gICAgVXAgPSAnZHQtZHJhZy1yb3ctdG9wJyxcbiAgICBEb3duID0gJ2R0LWRyYWctcm93LWJvdHRvbScsXG4gICAgTWlkZGxlID0gJ2R0LWRyYWctcm93LWJvdGgnXG59XG5cblxuZXhwb3J0IGVudW0gRHJvcFBvc2l0aW9uXG57XG4gICAgQmVmb3JlID0gJ2JlZm9yZScsXG4gICAgQWZ0ZXIgPSAnYWZ0ZXInLFxuICAgIEludG8gPSAnaW50bydcbn1cblxuXG4vKipcbiAqIEFic3RyYWN0IHR5cGUgdGhhdCBpcyBzaGFyYWJsZSBhbW9uZyBkZXBlbmRhbnQgRFQgb2JqZWN0IHN1Y2ggYXMgQ29sdW1ucywgRGF0YVNvdXJjZXMsXG4gKiBEaXJlY3RpdmVzIHRvIGJlIGFibGUgdG8gY29tbXVuaWNhdGUgYmFjayB0byB0aGUgZGF0YXRhYmxlIG1haW5seSB0byBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQVdEYXRhVGFibGVcbntcblxuICAgIC8qKlxuICAgICAqIEFsbG93cyB5b3UgdG8gcGFzcyB5b3VyIG93biBkYXRhc291cmNlIHRvIG92ZXJyaWRlIGRlZmF1bHQgb25lLiBBbHNvIHdoZW4gZGF0YVNvdXJjZSBpc1xuICAgICAqIHVzZWQgdGhlIGRlc3RpbmF0aW9uQ2xhc3Mgb3IgbGlzdCBhcmUgaWdub3JlZFxuICAgICAqL1xuICAgIGRhdGFTb3VyY2U6IERUMkRhdGFTb3VyY2U7XG5cbiAgICAvKipcbiAgICAgKiBNYW5hZ2VzIG91dGxpbmUgc3RhdGVzIGZvciBEYXRhdGFibGVzIHVzaW5nIG91dGxpbmUgY29udHJvbFxuICAgICAqL1xuICAgIG91dGxpbmVTdGF0ZTogT3V0bGluZVN0YXRlO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIHdlIGhhdmUgZGV0YWlsIHJvdyByZW1lbWJlciBpdHMgZXhwYW5zaW9uIHN0YXRlXG4gICAgICovXG4gICAgZGV0YWlsUm93RXhwYW5zaW9uU3RhdGU6IERldGFpbFJvd0V4cGFuc2lvblN0YXRlO1xuXG4gICAgLyoqXG4gICAgICogV2hhdCBjb2x1bW4gaXMgdXNlZCBhcyBmaXJzdCBmb3Igc29ydGluZ1xuICAgICAqL1xuICAgIGluaXRpYWxTb3J0S2V5OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBBbGxvdyB0byBjaGFuZ2Ugc29ydGluZyBkaXJlY3Rpb25cbiAgICAgKi9cbiAgICBpbml0aWFsU29ydE9yZGVyOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRlbGxzIERUIGlmIHdlIHN1cHBvcnQgY2VsbCBzZWxlY3Rpb24gb3Igcm93IGJhc2VkIHNlbGVjdGlvbiB3aGljaCBpcyByZWd1bGFyIERULlxuICAgICAqXG4gICAgICovXG4gICAgc2VsZWN0aW9uTW9kZTogU2VsZWN0aW9uTW9kZTtcblxuICAgIC8qKlxuICAgICAqIEluIGNhc2Ugb2Ygc2luZ2xlIG9yIG11bHRpc2VsZWN0aW9uIHNob3cgY29udHJvbHNcbiAgICAgKlxuICAgICAqL1xuICAgIHNob3dTZWxlY3Rpb25Db2x1bW46IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB3ZSB3YW50IHRvIHJlbmRlciBvbmUgc2VsZWN0aW9uIGNvbnRyb2wgaW4gdGhlIGhlYWRlciB0byBzZWxlY3QgYWxsIHRoZVxuICAgICAqIHJvd3MuIEFwcGxpY2FibGUgZm9yIG11bHRpc2VsZWN0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93U2VsZWN0QWxsOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogSWRlbnRpZnkgaWYgcm93IG9yIGNlbGwgaXMgc2VsZWN0YWJsZSBiYXNlZCBvbiBkYXRhXG4gICAgICovXG4gICAgaXNSb3dTZWxlY3RhYmxlOiAoaXRlbTogYW55KSA9PiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKiBFYWNoIERUQ29sdW1uIGhhdmUgaGF2ZSBpdHMgb3duIHRlbXBsYXRlIHRvIHByb3ZpZGUgY29udGVudCBmb3IgaGVhZGVyLCBzdWJoZWFkZXIgYW5kXG4gICAgICogYm9keSBidXQgaWYgdGhvc2UgdGVtcGxhdGUgYXJlIGlkZW50aWNhbCB0aGVyZSB3b3VsZCBiZSB0b28gbXVjaCBkdXBsaWNhdGUgY29kZSB0byByZXBsaWNhdGVcbiAgICAgKiBmb3IgZWFjaCBjb2x1bW4gdGhlIHNhbWUuIFRoZXJlZm9yZSB3ZSBoYXZlIHRoZXNlIGdsb2JhbCB0ZW1wbGF0ZXMgdGhhdCB5b3UgY2FuIGRlY2xhcmVcbiAgICAgKiBvbiBEVCBsZXZlbCAobm90IHVuZGVyIGNvbHVtbnMpIGFuZCBjb250ZW50IG9mIHRoZXNlIHRlbXBsYXRlIHdpbGwgYmUgdXNlZCBmb3IgZWFjaCBjb2x1bW5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gbWl4IHRoZW0gYXMgd2VsbC4gWW91IGNhbiBoYXZlIGdsb2JhbCB0ZW1wbGF0ZXMgYXMgd2VsbCBhcyB0ZW1wbGF0ZSBvbiB0aGUgQ29sdW1uXG4gICAgICogbGV2ZWwgd2hpY2ggd291bGQgb3ZlcnJpZGUgdGhlIGdsb2JhbCBvbmVcbiAgICAgKlxuICAgICAqL1xuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2VlIGhlYWRlclRlbXBsYXRlIGZvciBtb3JlIGRldGFpbHNcbiAgICAgKi9cbiAgICBzdWJIZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFNlZSBoZWFkZXJUZW1wbGF0ZSBmb3IgbW9yZSBkZXRhaWxzXG4gICAgICovXG4gICAgYm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIC8qKlxuICAgICAqIFNlZSBoZWFkZXJUZW1wbGF0ZSBmb3IgbW9yZSBkZXRhaWxzXG4gICAgICovXG4gICAgaGVhZGVyRmlsdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJlbmRlciBhIHN1YkhlYWRlciB0ZW1wbGF0ZSBpZiBwcmVzZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93U3ViSGVhZGVyOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBnbG9iYWwgc3R5bGUgZnVuY3Rpb24gdGhhdCBjYW4gYmUgYm91bmQgdG8gdGFibGUgYW5kIHJlYWQgYnkgZWFjaCBjb2x1bW4uXG4gICAgICogVGhlIHNhbWUgeW91IGNhbiBzZWUgb24gdGhlIERUQ29sdW1uXG4gICAgICovXG4gICAgYm9keUNsYXNzRm46IChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KSA9PiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIENvbnRleHQgaXMgaW1wb3J0YW50IHdoZW4gd2UgZXhlY3V0ZSBhbnkgZnVuY3Rpb24gdGhhdCBpcyBwYXNzZWQgaW4gYXMgaW5wdXQuIFdlIG5lZWQgdG9cbiAgICAgKiBnaXZlIG9wdGlvbiB0byBiZSBleGVjdXRlZCB3aXRoaW4gdGhlIGNvbnRleHQgKHRoaXMpIG9mIHRoZSBjb2RlIHVzaW5nIHRoaXMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICovXG4gICAgY29udGV4dDogYW55O1xuXG4gICAgLy8gT3V0bGluZSBuZWVkZWQgcHJvcGVydGllc1xuXG4gICAgLyoqXG4gICAgICogUHVzaGVzIG91dGxpbmVGb3Igc2VjdGlvbiBvbiB0aGUgbmV3IGxpbmUgYW5kIDJuZCBsZXZlbCBjaGlsZCBtYWtlIGl0IHJvb3QgZm9yIHRoaXNcbiAgICAgKiBzZWN0aW9uXG4gICAgICovXG4gICAgcHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogWW91IGNhbiBjaGFuZ2UgZGVmYXVsdCBpbmRlbnRhdGlvbiBmb3IgdGhlIG91dGxpbmUgbm9kZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGluZGVudGF0aW9uUGVyTGV2ZWw6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFdoZW4gYWN0aXZlIGFwcGxpZXMgc3BlY2lhbCBzdHlsZXMgdG8gdGhlIERULiBMYXRlciBvbiBvbmNlIHBpdm90IGlzIGltcGxlbWVudGVkIHRoaXMgd2lsbFxuICAgICAqIGFsc28gYWRkIGFkZGl0aW9uYWwgYmVoYXZpb3IgdG8gdGhlIERUXG4gICAgICpcbiAgICAgKi9cbiAgICBwaXZvdGFsTGF5b3V0OiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHNvcnRpbmcgaXMgZW5hYmxlZCB0aGlzIGlzIGN1cnJlbnQgYWN0aXZlIGNvbHVtbiBiZWluZyBzb3J0ZWQuXG4gICAgICpcbiAgICAgKiAgLSB3ZSBkb250IHN1cHBvcnQgbXVsdGlwbGUgY29sdW1uIHNvcnRpbmdcbiAgICAgKi9cbiAgICBzb3J0Q29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gYXctZHQtZGV0YWlsLWNvbHVtbiBpZiBwcmVzZW50IGRldGFpbCByb3cgaXMgcmVuZGVyZWQgZm9yIHNwZWNpZmllZFxuICAgICAqIGl0ZW1zXG4gICAgICovXG4gICAgcm93RGV0YWlsQ29sdW1uOiBEVERldGFpbFJvd0NvbXBvbmVudDtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIHNwYW5pbmcgY2FsY3VsYXRpb24gb3IgZm9yIHRoZSBkZXRhaWwgcm93IHRvIGlkZW50aWZ5IGNvcnJlY3QgbnVtYmVyIG9mIGNvbHVtbnNcbiAgICAgKiB0byBzcGFuLCB3aGVuIHRoZXkgYXJlIHNvbWUgbm9uLWRhdGEgY29sdW1uIChleHBhbnNpb24gY29udHJvbCwgc2luZ2xlL211bHRpIHNlbGVjdGlvbilcbiAgICAgKi9cbiAgICBudW1iZXJPZkNvbHNCZWZvcmVEYXRhOiBudW1iZXI7XG5cblxuICAgIC8qKlxuICAgICAqICB3aGF0IGlzIHRoZSBpbmRleCBvZiBmaXJzdCBkYXRhIGNvbHVtbnNcbiAgICAgKi9cbiAgICBzdGFydE9mRmlyc3REYXRhQ29sdW1uOiBudW1iZXI7XG5cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCB3aGVuIGluIGNlbGwgc2VsZWN0aW9uIG1vZGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ2VsbFNlbGVjdGlvbkNoYW5nZShjZWxsOiBhbnksIGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYnkgY29sdW1uIHdoZSBoZWFkZXIgaXMgc2VsZWN0ZWQuIEN1cnJlbnQgd2UgYXNzdW1lIHRoZSBvbmx5IG9uZSBoZWFkZXIgY2FuIGJlXG4gICAgICogc2VsZWN0ZWQgYXQgdGhlIHRpbWUuXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkhlYWRlclNlbGVjdGlvbkNoYW5nZShjZWxsOiBhbnksIGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50KTogdm9pZDtcblxuXG4gICAgb25IYW5kbGVSb3dDbGlja2VkKGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEhhbmRsZXMgcm93IHNlbGVjdGlvbiBsb2dpYyB3aGVyZSBpZiB0aGUgaXRlbSBpcyBmb3VuZCBpbnNpZGUgdGhlIHNlbGVjdGVkIGl0ZW1zLCB0aGVuXG4gICAgICogaXRzIHJlbW92ZWQgb3RoZXJ3aXNlIGl0cyBhZGRlZC5cbiAgICAgKlxuICAgICAqIFRvZG86IFN5bmMgJiByZWZhY3RvciB0aGlzIHdpdGggZHQub25DZWxsU2VsZWN0aW9uQ2hhbmdlIC0gcHJldHR5IHNpbWlsYXIgY29kZVxuICAgICAqXG4gICAgICogV2Ugd2FudCB0byBoYXZlIHJvd1RvZ2dsZSBhcyB3ZWxsIGFzIHdlIHdpbGwgaGF2ZSByb3dTZWxlY3Qgb3Igc29tZXRoaWduIHNpbWlsYXIgdG9cbiAgICAgKiBpZGVudGlmeSB3ZSBhcmUgZGVhbGluZyB3aXRoIG11bHRpc2VsZWN0IGFuZCBzaW5nbGUgc2VsZWN0aW9uXG4gICAgICovXG4gICAgb25Sb3dUb2dnbGUoZXZlbnQ6IGFueSwgaXRlbTogYW55KTogdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBIYW5kbGVzIHJvdyBzaW5nbGUgc2VsZWN0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBvblJvd1NlbGVjdChldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBkZWFsaW5nIHdpdGggb3V0bGluZSAodHJlZSkgd2UgbmVlZCB0byBtYWtlIHN1cmUgd2hlbiB3ZSBzZWxlY3Qgc29tZSByb290IGl0ZW0gaXRcbiAgICAgKiB3aWxsIGF1dG9tYXRpY2FsbHkgYWxzbyBzZWxlY3QgYWxsIGl0cyBjaGlsZHJlblxuICAgICAqXG4gICAgICovXG4gICAgb25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbihjdXJyZW50SXRlbTogYW55LCBpc1NlbGVjdGVkOiBib29sZWFuKTogdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBKdXN0IGxpa2UgZm9yIG9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4gdGhlIHNhbWUgYmVoYXZpb3IgbmVlZHMgdG8gYmUgYXBwbGllZCBmb3JcbiAgICAgKiB0b3dhcmRzIHVwLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBvSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvUGFyZW50KGN1cnJlbnRJdGVtOiBhbnksIGlzU2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENhbGxlZCBieSBEJkQgcm93IGRpcmVjdGl2ZSB0byB1cGRhdGUgdGhpcyBURCB0aGF0IHJvdyByZW9yZGVyaW5nIG5lZWRzIHRvIGhhcHBlbi4gV2VcbiAgICAgKiByZWNlaXZlIGFuIElOREVYIG9mIHJvdyB3ZSBhcmUgZHJhZ2dpbmcgYW5kIG5ldyBkcm9wIHBvc2l0aW9uLCBwbHVzIGluZm9ybWF0aW9uIGlmIGl0XG4gICAgICogbmVlZHMgdG8gYmUgZHJvcHBlZCBiZWZvcmUgbmV3IHJvdyBwb3NpdGlvbiBvciBhZnRlci5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uRG5EUm93RHJvcChvcmlnUG9zOiBudW1iZXIsIG5ld1BvczogbnVtYmVyLCBkcm9wUG9zOiBEcm9wUG9zaXRpb24pOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gZGV0YWlsIHJvdyBpcyBjb21iaW5lZCB3aXRoIG91dGxpbmUgY29udHJvbCB3ZSBuZWVkIG1ha2Ugc3VyZSB0aGF0IHdlIG1haW50YWluIHRoZVxuICAgICAqIGNvcnJlY3Qgc3RhdGUgZm9yIGl0ZW1zIHRoYXQgYXJlIGVsaWdpYmxlIGZvciBkZXRhaWwgcm93XG4gICAgICpcbiAgICAgKiBJbiB0aGlzIHNwZWNpZmljIGNhc2UgdGhlIGRldGFpbCByb3cgZG9lcyBub3QgaGF2ZSBpdHMgb3duIGV4cGFuZGVyIGJ1dCB1dGlsaXppbmcgdGhlXG4gICAgICogb3V0bGluZUNvbnRyb2xcbiAgICAgKi9cbiAgICBvbk91dGxpbmVFeHBhbmRDaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqIFN1cHBvcnQgZm9yIHNpbmdsZSBjb2x1bW4gc29ydGluZ1xuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBzb3J0U2luZ2xlKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGRhdGEgY2hhbmdlcywgZWl0aGVyIHRoZXkgYXJlIGxhemlseSBmZXRjaGVkIG9yIEBJbnB1dCBMSVNUIGlzIHVwZGF0ZWQgd2UgbmVlZFxuICAgICAqIHJlc29ydCBvdXQgZGF0YSBiYXNlZCBvbiBjdXJyZW50IHN0YXRlIGFuZCB1cGRhdGUgaW50ZXJuYWwgbGlzdCBkYXRhVG9SZW5kZXIgc28gbmV3XG4gICAgICogZGF0YSBjYW4gcmUtcmVuZGVyZWQgKyB0cmlnZ2VycyBldmVudCB2YWx1ZUNoYW5nZVxuICAgICAqXG4gICAgICovXG4gICAgaGFuZGxlRGF0YUNoYW5nZSgpOiB2b2lkO1xuXG4gICAgdXBkYXRlRGF0YVRvUmVuZGVyKGRhdGFzb3VyY2U/OiBhbnkpOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3Qgb3IgdW5zZWxlY3QgYWxsIHJvd3MuIFVzZWQgYnkgaGVhZGVyIGNoZWNrYm94XG4gICAgICpcbiAgICAgKi9cbiAgICB0b2dnbGVBbGxDb2x1bW5zKGV2ZW50OiBhbnkpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogTW9yZSBsaWtlIHV0aWxpdHkgbWV0aG9kcyB0byB0cmFuc2xhdGUgc3RyaW5nPC0tPm51bWJlciB2YWx1ZSBmb3Igc29ydGluZ1xuICAgICAqXG4gICAgICogQ3VycmVudGx5IHVzZWQgb25seSBieSBEVENvbHVtbi4gV2UgbWlnaHQgd2FudCB0byBtb3ZlIHRoaXMgaXRzIG93biBjb21wb25lbnQgZm9yXG4gICAgICogaGVhZGVyU29ydCBhbmQgb3JkZXJpbmdcbiAgICAgKlxuICAgICAqL1xuICAgIHNvcnRPcmRlcmluZ0ZvclN0cmluZyhkaXJlY3Rpb246IHN0cmluZyk6IG51bWJlcjtcblxuICAgIHNvcnRPcmRlcmluZ0Zvck51bWJlcihkaXJlY3Rpb246IG51bWJlcik6IHN0cmluZztcblxuICAgIHZpc2libGVDb2x1bW5zKCk6IERUQ29sdW1uMkNvbXBvbmVudFtdO1xuXG4gICAgaGFzRnJvemVuQ29sdW1ucygpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIHNpbmdsZS9tdWx0aXNlbGVjdCBmdW5jdGlvbmFsaXR5IHdoZXJlIHdlIG5lZWQgdG8gdHJhY2sgaWZcbiAgICAgKiB3ZSBzdXBwb3J0IHNlbGVjdGlvbiBwbHVzIGhvdyBtYW55IGNvbHVtbiBpdCBvY2N1cGllcyBhbmQgaWYgdGhlIHNlbGVjdGlvbiBjb250cm9scyBhcmVcbiAgICAgKiB2aXNpYmxlIG9yIGhpZGRlbi5cbiAgICAgKi9cbiAgICBoYXNJbnZpc2libGVTZWxlY3Rpb25Db2x1bW4oKTogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBQbGFjZWhvbGRlciB0byBpZGVudGlmeSBpZiB0aGV5IGFyZSBub24tdmFsdWUgY29sdW1uXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNMZWFkaW5nU2VsZWN0Q29sdW1uKCk6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIFRvIGNvbXBhcmUgdGhlIGRhdGEgaWYgd2UgdXNlIGRlZXAgb2JqZWN0IGVxdWFsaXR5IGFuZCB0aGlzIGlzIHVzZWQgd2l0aGluIHRoaXMgY2xhc3MgYXNcbiAgICAgKiB3ZWxsIGFzIGZyb20gdGhlIERUQ29sdW1uIHRvIGNvbmRpdGlvbmFsbHkgYWRkIGNsYXNzIHdoaWNoIHNlbGVjdCB0aGUgY2VsbFxuICAgICAqXG4gICAgICogV2UgbWlnaHQgd2FudCB0byBjaGFuZ2UgdG8gY2hlY2sgb25seSBhIGtleSBvZiB0aGUgb2JqZWN0IHNvbWUgdW5pcXVlIGlkZW50aWZpZXIuXG4gICAgICovXG4gICAgaXNIZWFkZXJTZWxlY3RlZChpdGVtOiBEVENvbHVtbjJDb21wb25lbnQpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaGVjayBpZiB0aGUgc3BlY2lmaWMgY2VsbCBpcyBzZWxlY3RlZC4gV2UgbmVlZCB0d28gcG9pbnRzIHRvIGlkZW50aWZ5IGlmIGNlbGwgaXMgc2VsZWN0ZWRcbiAgICAgKiB0aGUgYWN0dWFsIEl0ZW0gdGhhdCBjb3VsZCByZXByZXNlbnQgd2hvbGUgcm93IGFuZCBDb2x1bW5cbiAgICAgKlxuICAgICAqL1xuICAgIGlzQm9keUNlbGxTZWxlY3RlZChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqICBDaGVjayBpZiB0aGUgZ2l2ZW4gaXRlbSBpcyBhbW9uZyB0aGUgc2VsZWN0ZWQgb25lc1xuICAgICAqXG4gICAgICovXG4gICAgaXNSb3dTZWxlY3RlZChpdGVtOiBhbnkpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIFtjaGlsZHJlbl0gYmluZGluZyBpcyBwcmVzZW50IHRoZW4gaXQgbWVhbnMgd2UgbmVlZCB0byByZW5kZXIgaXQgYXMgYSB0cmVlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc091dGxpbmUoKTogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEZWZhdWx0cyB0aGUgY2hlY2tib3ggdG8gZWl0aGVyIHNlbGVjdGVkIGFuZCBub3Qgc2VsZWN0ZWQgZGVwZW5kZWQgb24gaW50ZXJuYWwgc3RhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGlzVG9nZ2xlQWxsQ29sdW1uU2VsZWN0ZWQoKTogYm9vbGVhbjtcblxuICAgIGlzVG9nZ2xlQWxsQ29sdW1uRGlzYWJsZWQoKTogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VzIGFyZSBmaWVsZCBwYXRoIHV0aWxpdHkgY2xhc3MgdG8gcmV0cmlldmUgZGF0YSBmcm9tIG9iamVjdFxuICAgICAqXG4gICAgICovXG4gICAgZ2V0VmFsdWUoZGF0YTogYW55LCBmaWVsZDogc3RyaW5nKTogYW55O1xuXG59XG4iXX0=