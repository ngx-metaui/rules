/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
export const /** @type {?} */ DragEvents = ['mousedown', 'dragstart', 'dragover', 'dragenter', 'dragleave',
    'drop', 'dragend'];
/** @enum {string} */
const DragDirection = {
    None: 'none',
    Up: 'dt-drag-row-top',
    Down: 'dt-drag-row-bottom',
    Middle: 'dt-drag-row-both',
};
export { DragDirection };
/** @enum {string} */
const DropPosition = {
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
function AWDataTable_tsickle_Closure_declarations() {
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXctZGF0YXRhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9hdy1kYXRhdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBLE1BQU0sQ0FBQyx1QkFBTSxVQUFVLEdBQWEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVztJQUMvRixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7OztVQUlaLE1BQU07UUFDUixpQkFBaUI7VUFDZixvQkFBb0I7WUFDbEIsa0JBQWtCOzs7OztZQU1sQixRQUFRO1dBQ1QsT0FBTztVQUNSLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cblxuXG5pbXBvcnQge1RlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U2VsZWN0aW9uTW9kZX0gZnJvbSAnLi9kYXRhdGFibGUyLmNvbXBvbmVudCc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7RGV0YWlsUm93RXhwYW5zaW9uU3RhdGUsIERUMkRhdGFTb3VyY2V9IGZyb20gJy4vZGF0YXRhYmxlMi1kYXRhLXNvdXJjZSc7XG5pbXBvcnQge091dGxpbmVTdGF0ZX0gZnJvbSAnLi4vb3V0bGluZSc7XG5pbXBvcnQge0RURGV0YWlsUm93Q29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi9kZXRhaWwtcm93L2R0LWRldGFpbC1yb3cuY29tcG9uZW50JztcblxuXG5leHBvcnQgY29uc3QgRHJhZ0V2ZW50czogc3RyaW5nW10gPSBbJ21vdXNlZG93bicsICdkcmFnc3RhcnQnLCAnZHJhZ292ZXInLCAnZHJhZ2VudGVyJywgJ2RyYWdsZWF2ZScsXG4gICAgJ2Ryb3AnLCAnZHJhZ2VuZCddO1xuXG5leHBvcnQgZW51bSBEcmFnRGlyZWN0aW9uXG57XG4gICAgTm9uZSA9ICdub25lJyxcbiAgICBVcCA9ICdkdC1kcmFnLXJvdy10b3AnLFxuICAgIERvd24gPSAnZHQtZHJhZy1yb3ctYm90dG9tJyxcbiAgICBNaWRkbGUgPSAnZHQtZHJhZy1yb3ctYm90aCdcbn1cblxuXG5leHBvcnQgZW51bSBEcm9wUG9zaXRpb25cbntcbiAgICBCZWZvcmUgPSAnYmVmb3JlJyxcbiAgICBBZnRlciA9ICdhZnRlcicsXG4gICAgSW50byA9ICdpbnRvJ1xufVxuXG5cbi8qKlxuICogQWJzdHJhY3QgdHlwZSB0aGF0IGlzIHNoYXJhYmxlIGFtb25nIGRlcGVuZGFudCBEVCBvYmplY3Qgc3VjaCBhcyBDb2x1bW5zLCBEYXRhU291cmNlcyxcbiAqIERpcmVjdGl2ZXMgdG8gYmUgYWJsZSB0byBjb21tdW5pY2F0ZSBiYWNrIHRvIHRoZSBkYXRhdGFibGUgbWFpbmx5IHRvIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY3lcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBV0RhdGFUYWJsZVxue1xuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHlvdSB0byBwYXNzIHlvdXIgb3duIGRhdGFzb3VyY2UgdG8gb3ZlcnJpZGUgZGVmYXVsdCBvbmUuIEFsc28gd2hlbiBkYXRhU291cmNlIGlzXG4gICAgICogdXNlZCB0aGUgZGVzdGluYXRpb25DbGFzcyBvciBsaXN0IGFyZSBpZ25vcmVkXG4gICAgICovXG4gICAgZGF0YVNvdXJjZTogRFQyRGF0YVNvdXJjZTtcblxuICAgIC8qKlxuICAgICAqIE1hbmFnZXMgb3V0bGluZSBzdGF0ZXMgZm9yIERhdGF0YWJsZXMgdXNpbmcgb3V0bGluZSBjb250cm9sXG4gICAgICovXG4gICAgb3V0bGluZVN0YXRlOiBPdXRsaW5lU3RhdGU7XG5cblxuICAgIC8qKlxuICAgICAqIEluIGNhc2Ugd2UgaGF2ZSBkZXRhaWwgcm93IHJlbWVtYmVyIGl0cyBleHBhbnNpb24gc3RhdGVcbiAgICAgKi9cbiAgICBkZXRhaWxSb3dFeHBhbnNpb25TdGF0ZTogRGV0YWlsUm93RXhwYW5zaW9uU3RhdGU7XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IGNvbHVtbiBpcyB1c2VkIGFzIGZpcnN0IGZvciBzb3J0aW5nXG4gICAgICovXG4gICAgaW5pdGlhbFNvcnRLZXk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEFsbG93IHRvIGNoYW5nZSBzb3J0aW5nIGRpcmVjdGlvblxuICAgICAqL1xuICAgIGluaXRpYWxTb3J0T3JkZXI6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGVsbHMgRFQgaWYgd2Ugc3VwcG9ydCBjZWxsIHNlbGVjdGlvbiBvciByb3cgYmFzZWQgc2VsZWN0aW9uIHdoaWNoIGlzIHJlZ3VsYXIgRFQuXG4gICAgICpcbiAgICAgKi9cbiAgICBzZWxlY3Rpb25Nb2RlOiBTZWxlY3Rpb25Nb2RlO1xuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSBvZiBzaW5nbGUgb3IgbXVsdGlzZWxlY3Rpb24gc2hvdyBjb250cm9sc1xuICAgICAqXG4gICAgICovXG4gICAgc2hvd1NlbGVjdGlvbkNvbHVtbjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHdlIHdhbnQgdG8gcmVuZGVyIG9uZSBzZWxlY3Rpb24gY29udHJvbCBpbiB0aGUgaGVhZGVyIHRvIHNlbGVjdCBhbGwgdGhlXG4gICAgICogcm93cy4gQXBwbGljYWJsZSBmb3IgbXVsdGlzZWxlY3Rpb25cbiAgICAgKlxuICAgICAqL1xuICAgIHNob3dTZWxlY3RBbGw6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBJZGVudGlmeSBpZiByb3cgb3IgY2VsbCBpcyBzZWxlY3RhYmxlIGJhc2VkIG9uIGRhdGFcbiAgICAgKi9cbiAgICBpc1Jvd1NlbGVjdGFibGU6IChpdGVtOiBhbnkpID0+IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIEVhY2ggRFRDb2x1bW4gaGF2ZSBoYXZlIGl0cyBvd24gdGVtcGxhdGUgdG8gcHJvdmlkZSBjb250ZW50IGZvciBoZWFkZXIsIHN1YmhlYWRlciBhbmRcbiAgICAgKiBib2R5IGJ1dCBpZiB0aG9zZSB0ZW1wbGF0ZSBhcmUgaWRlbnRpY2FsIHRoZXJlIHdvdWxkIGJlIHRvbyBtdWNoIGR1cGxpY2F0ZSBjb2RlIHRvIHJlcGxpY2F0ZVxuICAgICAqIGZvciBlYWNoIGNvbHVtbiB0aGUgc2FtZS4gVGhlcmVmb3JlIHdlIGhhdmUgdGhlc2UgZ2xvYmFsIHRlbXBsYXRlcyB0aGF0IHlvdSBjYW4gZGVjbGFyZVxuICAgICAqIG9uIERUIGxldmVsIChub3QgdW5kZXIgY29sdW1ucykgYW5kIGNvbnRlbnQgb2YgdGhlc2UgdGVtcGxhdGUgd2lsbCBiZSB1c2VkIGZvciBlYWNoIGNvbHVtblxuICAgICAqXG4gICAgICogWW91IGNhbiBtaXggdGhlbSBhcyB3ZWxsLiBZb3UgY2FuIGhhdmUgZ2xvYmFsIHRlbXBsYXRlcyBhcyB3ZWxsIGFzIHRlbXBsYXRlIG9uIHRoZSBDb2x1bW5cbiAgICAgKiBsZXZlbCB3aGljaCB3b3VsZCBvdmVycmlkZSB0aGUgZ2xvYmFsIG9uZVxuICAgICAqXG4gICAgICovXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBTZWUgaGVhZGVyVGVtcGxhdGUgZm9yIG1vcmUgZGV0YWlsc1xuICAgICAqL1xuICAgIHN1YkhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2VlIGhlYWRlclRlbXBsYXRlIGZvciBtb3JlIGRldGFpbHNcbiAgICAgKi9cbiAgICBib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLyoqXG4gICAgICogU2VlIGhlYWRlclRlbXBsYXRlIGZvciBtb3JlIGRldGFpbHNcbiAgICAgKi9cbiAgICBoZWFkZXJGaWx0ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmVuZGVyIGEgc3ViSGVhZGVyIHRlbXBsYXRlIGlmIHByZXNlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIHNob3dTdWJIZWFkZXI6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGdsb2JhbCBzdHlsZSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBib3VuZCB0byB0YWJsZSBhbmQgcmVhZCBieSBlYWNoIGNvbHVtbi5cbiAgICAgKiBUaGUgc2FtZSB5b3UgY2FuIHNlZSBvbiB0aGUgRFRDb2x1bW5cbiAgICAgKi9cbiAgICBib2R5Q2xhc3NGbjogKGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpID0+IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogQ29udGV4dCBpcyBpbXBvcnRhbnQgd2hlbiB3ZSBleGVjdXRlIGFueSBmdW5jdGlvbiB0aGF0IGlzIHBhc3NlZCBpbiBhcyBpbnB1dC4gV2UgbmVlZCB0b1xuICAgICAqIGdpdmUgb3B0aW9uIHRvIGJlIGV4ZWN1dGVkIHdpdGhpbiB0aGUgY29udGV4dCAodGhpcykgb2YgdGhlIGNvZGUgdXNpbmcgdGhpcyBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBjb250ZXh0OiBhbnk7XG5cbiAgICAvLyBPdXRsaW5lIG5lZWRlZCBwcm9wZXJ0aWVzXG5cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgb3V0bGluZUZvciBzZWN0aW9uIG9uIHRoZSBuZXcgbGluZSBhbmQgMm5kIGxldmVsIGNoaWxkIG1ha2UgaXQgcm9vdCBmb3IgdGhpc1xuICAgICAqIHNlY3Rpb25cbiAgICAgKi9cbiAgICBwdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBZb3UgY2FuIGNoYW5nZSBkZWZhdWx0IGluZGVudGF0aW9uIGZvciB0aGUgb3V0bGluZSBub2Rlc1xuICAgICAqXG4gICAgICovXG4gICAgaW5kZW50YXRpb25QZXJMZXZlbDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBhY3RpdmUgYXBwbGllcyBzcGVjaWFsIHN0eWxlcyB0byB0aGUgRFQuIExhdGVyIG9uIG9uY2UgcGl2b3QgaXMgaW1wbGVtZW50ZWQgdGhpcyB3aWxsXG4gICAgICogYWxzbyBhZGQgYWRkaXRpb25hbCBiZWhhdmlvciB0byB0aGUgRFRcbiAgICAgKlxuICAgICAqL1xuICAgIHBpdm90YWxMYXlvdXQ6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gc29ydGluZyBpcyBlbmFibGVkIHRoaXMgaXMgY3VycmVudCBhY3RpdmUgY29sdW1uIGJlaW5nIHNvcnRlZC5cbiAgICAgKlxuICAgICAqICAtIHdlIGRvbnQgc3VwcG9ydCBtdWx0aXBsZSBjb2x1bW4gc29ydGluZ1xuICAgICAqL1xuICAgIHNvcnRDb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudDtcblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBhdy1kdC1kZXRhaWwtY29sdW1uIGlmIHByZXNlbnQgZGV0YWlsIHJvdyBpcyByZW5kZXJlZCBmb3Igc3BlY2lmaWVkXG4gICAgICogaXRlbXNcbiAgICAgKi9cbiAgICByb3dEZXRhaWxDb2x1bW46IERURGV0YWlsUm93Q29tcG9uZW50O1xuXG4gICAgLyoqXG4gICAgICogVXNlZCBmb3Igc3BhbmluZyBjYWxjdWxhdGlvbiBvciBmb3IgdGhlIGRldGFpbCByb3cgdG8gaWRlbnRpZnkgY29ycmVjdCBudW1iZXIgb2YgY29sdW1uc1xuICAgICAqIHRvIHNwYW4sIHdoZW4gdGhleSBhcmUgc29tZSBub24tZGF0YSBjb2x1bW4gKGV4cGFuc2lvbiBjb250cm9sLCBzaW5nbGUvbXVsdGkgc2VsZWN0aW9uKVxuICAgICAqL1xuICAgIG51bWJlck9mQ29sc0JlZm9yZURhdGE6IG51bWJlcjtcblxuXG4gICAgLyoqXG4gICAgICogIHdoYXQgaXMgdGhlIGluZGV4IG9mIGZpcnN0IGRhdGEgY29sdW1uc1xuICAgICAqL1xuICAgIHN0YXJ0T2ZGaXJzdERhdGFDb2x1bW46IG51bWJlcjtcblxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIHdoZW4gaW4gY2VsbCBzZWxlY3Rpb24gbW9kZVxuICAgICAqXG4gICAgICovXG4gICAgb25DZWxsU2VsZWN0aW9uQ2hhbmdlKGNlbGw6IGFueSwgY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSk6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBieSBjb2x1bW4gd2hlIGhlYWRlciBpcyBzZWxlY3RlZC4gQ3VycmVudCB3ZSBhc3N1bWUgdGhlIG9ubHkgb25lIGhlYWRlciBjYW4gYmVcbiAgICAgKiBzZWxlY3RlZCBhdCB0aGUgdGltZS5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uSGVhZGVyU2VsZWN0aW9uQ2hhbmdlKGNlbGw6IGFueSwgY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQpOiB2b2lkO1xuXG5cbiAgICBvbkhhbmRsZVJvd0NsaWNrZWQoZXZlbnQ6IGFueSwgaXRlbTogYW55KTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSGFuZGxlcyByb3cgc2VsZWN0aW9uIGxvZ2ljIHdoZXJlIGlmIHRoZSBpdGVtIGlzIGZvdW5kIGluc2lkZSB0aGUgc2VsZWN0ZWQgaXRlbXMsIHRoZW5cbiAgICAgKiBpdHMgcmVtb3ZlZCBvdGhlcndpc2UgaXRzIGFkZGVkLlxuICAgICAqXG4gICAgICogVG9kbzogU3luYyAmIHJlZmFjdG9yIHRoaXMgd2l0aCBkdC5vbkNlbGxTZWxlY3Rpb25DaGFuZ2UgLSBwcmV0dHkgc2ltaWxhciBjb2RlXG4gICAgICpcbiAgICAgKiBXZSB3YW50IHRvIGhhdmUgcm93VG9nZ2xlIGFzIHdlbGwgYXMgd2Ugd2lsbCBoYXZlIHJvd1NlbGVjdCBvciBzb21ldGhpZ24gc2ltaWxhciB0b1xuICAgICAqIGlkZW50aWZ5IHdlIGFyZSBkZWFsaW5nIHdpdGggbXVsdGlzZWxlY3QgYW5kIHNpbmdsZSBzZWxlY3Rpb25cbiAgICAgKi9cbiAgICBvblJvd1RvZ2dsZShldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEhhbmRsZXMgcm93IHNpbmdsZSBzZWxlY3Rpb25cbiAgICAgKlxuICAgICAqL1xuICAgIG9uUm93U2VsZWN0KGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGRlYWxpbmcgd2l0aCBvdXRsaW5lICh0cmVlKSB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB3aGVuIHdlIHNlbGVjdCBzb21lIHJvb3QgaXRlbSBpdFxuICAgICAqIHdpbGwgYXV0b21hdGljYWxseSBhbHNvIHNlbGVjdCBhbGwgaXRzIGNoaWxkcmVuXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuKGN1cnJlbnRJdGVtOiBhbnksIGlzU2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEp1c3QgbGlrZSBmb3Igb25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbiB0aGUgc2FtZSBiZWhhdmlvciBuZWVkcyB0byBiZSBhcHBsaWVkIGZvclxuICAgICAqIHRvd2FyZHMgdXAuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIG9IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9QYXJlbnQoY3VycmVudEl0ZW06IGFueSwgaXNTZWxlY3RlZDogYm9vbGVhbik6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2FsbGVkIGJ5IEQmRCByb3cgZGlyZWN0aXZlIHRvIHVwZGF0ZSB0aGlzIFREIHRoYXQgcm93IHJlb3JkZXJpbmcgbmVlZHMgdG8gaGFwcGVuLiBXZVxuICAgICAqIHJlY2VpdmUgYW4gSU5ERVggb2Ygcm93IHdlIGFyZSBkcmFnZ2luZyBhbmQgbmV3IGRyb3AgcG9zaXRpb24sIHBsdXMgaW5mb3JtYXRpb24gaWYgaXRcbiAgICAgKiBuZWVkcyB0byBiZSBkcm9wcGVkIGJlZm9yZSBuZXcgcm93IHBvc2l0aW9uIG9yIGFmdGVyLlxuICAgICAqXG4gICAgICovXG4gICAgb25EbkRSb3dEcm9wKG9yaWdQb3M6IG51bWJlciwgbmV3UG9zOiBudW1iZXIsIGRyb3BQb3M6IERyb3BQb3NpdGlvbik6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBkZXRhaWwgcm93IGlzIGNvbWJpbmVkIHdpdGggb3V0bGluZSBjb250cm9sIHdlIG5lZWQgbWFrZSBzdXJlIHRoYXQgd2UgbWFpbnRhaW4gdGhlXG4gICAgICogY29ycmVjdCBzdGF0ZSBmb3IgaXRlbXMgdGhhdCBhcmUgZWxpZ2libGUgZm9yIGRldGFpbCByb3dcbiAgICAgKlxuICAgICAqIEluIHRoaXMgc3BlY2lmaWMgY2FzZSB0aGUgZGV0YWlsIHJvdyBkb2VzIG5vdCBoYXZlIGl0cyBvd24gZXhwYW5kZXIgYnV0IHV0aWxpemluZyB0aGVcbiAgICAgKiBvdXRsaW5lQ29udHJvbFxuICAgICAqL1xuICAgIG9uT3V0bGluZUV4cGFuZENoYW5nZShldmVudDogYW55KTogdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICogU3VwcG9ydCBmb3Igc2luZ2xlIGNvbHVtbiBzb3J0aW5nXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHNvcnRTaW5nbGUoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFdoZW4gZGF0YSBjaGFuZ2VzLCBlaXRoZXIgdGhleSBhcmUgbGF6aWx5IGZldGNoZWQgb3IgQElucHV0IExJU1QgaXMgdXBkYXRlZCB3ZSBuZWVkXG4gICAgICogcmVzb3J0IG91dCBkYXRhIGJhc2VkIG9uIGN1cnJlbnQgc3RhdGUgYW5kIHVwZGF0ZSBpbnRlcm5hbCBsaXN0IGRhdGFUb1JlbmRlciBzbyBuZXdcbiAgICAgKiBkYXRhIGNhbiByZS1yZW5kZXJlZCArIHRyaWdnZXJzIGV2ZW50IHZhbHVlQ2hhbmdlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYW5kbGVEYXRhQ2hhbmdlKCk6IHZvaWQ7XG5cbiAgICB1cGRhdGVEYXRhVG9SZW5kZXIoZGF0YXNvdXJjZT86IGFueSk6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBvciB1bnNlbGVjdCBhbGwgcm93cy4gVXNlZCBieSBoZWFkZXIgY2hlY2tib3hcbiAgICAgKlxuICAgICAqL1xuICAgIHRvZ2dsZUFsbENvbHVtbnMoZXZlbnQ6IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBNb3JlIGxpa2UgdXRpbGl0eSBtZXRob2RzIHRvIHRyYW5zbGF0ZSBzdHJpbmc8LS0+bnVtYmVyIHZhbHVlIGZvciBzb3J0aW5nXG4gICAgICpcbiAgICAgKiBDdXJyZW50bHkgdXNlZCBvbmx5IGJ5IERUQ29sdW1uLiBXZSBtaWdodCB3YW50IHRvIG1vdmUgdGhpcyBpdHMgb3duIGNvbXBvbmVudCBmb3JcbiAgICAgKiBoZWFkZXJTb3J0IGFuZCBvcmRlcmluZ1xuICAgICAqXG4gICAgICovXG4gICAgc29ydE9yZGVyaW5nRm9yU3RyaW5nKGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyO1xuXG4gICAgc29ydE9yZGVyaW5nRm9yTnVtYmVyKGRpcmVjdGlvbjogbnVtYmVyKTogc3RyaW5nO1xuXG4gICAgdmlzaWJsZUNvbHVtbnMoKTogRFRDb2x1bW4yQ29tcG9uZW50W107XG5cbiAgICBoYXNGcm96ZW5Db2x1bW5zKCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciBmdW5jdGlvbmFsaXR5IGZvciB0aGUgc2luZ2xlL211bHRpc2VsZWN0IGZ1bmN0aW9uYWxpdHkgd2hlcmUgd2UgbmVlZCB0byB0cmFjayBpZlxuICAgICAqIHdlIHN1cHBvcnQgc2VsZWN0aW9uIHBsdXMgaG93IG1hbnkgY29sdW1uIGl0IG9jY3VwaWVzIGFuZCBpZiB0aGUgc2VsZWN0aW9uIGNvbnRyb2xzIGFyZVxuICAgICAqIHZpc2libGUgb3IgaGlkZGVuLlxuICAgICAqL1xuICAgIGhhc0ludmlzaWJsZVNlbGVjdGlvbkNvbHVtbigpOiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFBsYWNlaG9sZGVyIHRvIGlkZW50aWZ5IGlmIHRoZXkgYXJlIG5vbi12YWx1ZSBjb2x1bW5cbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKTogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogVG8gY29tcGFyZSB0aGUgZGF0YSBpZiB3ZSB1c2UgZGVlcCBvYmplY3QgZXF1YWxpdHkgYW5kIHRoaXMgaXMgdXNlZCB3aXRoaW4gdGhpcyBjbGFzcyBhc1xuICAgICAqIHdlbGwgYXMgZnJvbSB0aGUgRFRDb2x1bW4gdG8gY29uZGl0aW9uYWxseSBhZGQgY2xhc3Mgd2hpY2ggc2VsZWN0IHRoZSBjZWxsXG4gICAgICpcbiAgICAgKiBXZSBtaWdodCB3YW50IHRvIGNoYW5nZSB0byBjaGVjayBvbmx5IGEga2V5IG9mIHRoZSBvYmplY3Qgc29tZSB1bmlxdWUgaWRlbnRpZmllci5cbiAgICAgKi9cbiAgICBpc0hlYWRlclNlbGVjdGVkKGl0ZW06IERUQ29sdW1uMkNvbXBvbmVudCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENoZWNrIGlmIHRoZSBzcGVjaWZpYyBjZWxsIGlzIHNlbGVjdGVkLiBXZSBuZWVkIHR3byBwb2ludHMgdG8gaWRlbnRpZnkgaWYgY2VsbCBpcyBzZWxlY3RlZFxuICAgICAqIHRoZSBhY3R1YWwgSXRlbSB0aGF0IGNvdWxkIHJlcHJlc2VudCB3aG9sZSByb3cgYW5kIENvbHVtblxuICAgICAqXG4gICAgICovXG4gICAgaXNCb2R5Q2VsbFNlbGVjdGVkKGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogIENoZWNrIGlmIHRoZSBnaXZlbiBpdGVtIGlzIGFtb25nIHRoZSBzZWxlY3RlZCBvbmVzXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1Jvd1NlbGVjdGVkKGl0ZW06IGFueSk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gW2NoaWxkcmVuXSBiaW5kaW5nIGlzIHByZXNlbnQgdGhlbiBpdCBtZWFucyB3ZSBuZWVkIHRvIHJlbmRlciBpdCBhcyBhIHRyZWVcbiAgICAgKlxuICAgICAqL1xuICAgIGlzT3V0bGluZSgpOiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERlZmF1bHRzIHRoZSBjaGVja2JveCB0byBlaXRoZXIgc2VsZWN0ZWQgYW5kIG5vdCBzZWxlY3RlZCBkZXBlbmRlZCBvbiBpbnRlcm5hbCBzdGF0ZVxuICAgICAqXG4gICAgICovXG4gICAgaXNUb2dnbGVBbGxDb2x1bW5TZWxlY3RlZCgpOiBib29sZWFuO1xuXG4gICAgaXNUb2dnbGVBbGxDb2x1bW5EaXNhYmxlZCgpOiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZXMgYXJlIGZpZWxkIHBhdGggdXRpbGl0eSBjbGFzcyB0byByZXRyaWV2ZSBkYXRhIGZyb20gb2JqZWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRWYWx1ZShkYXRhOiBhbnksIGZpZWxkOiBzdHJpbmcpOiBhbnk7XG5cbn1cbiJdfQ==