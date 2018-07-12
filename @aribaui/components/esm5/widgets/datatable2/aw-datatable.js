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
export var /** @type {?} */ DragEvents = ['mousedown', 'dragstart', 'dragover', 'dragenter', 'dragleave',
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXctZGF0YXRhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9hdy1kYXRhdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBLE1BQU0sQ0FBQyxxQkFBTSxVQUFVLEdBQWEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVztJQUMvRixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7OztVQUlaLE1BQU07UUFDUixpQkFBaUI7VUFDZixvQkFBb0I7WUFDbEIsa0JBQWtCOzs7OztZQU1sQixRQUFRO1dBQ1QsT0FBTztVQUNSLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cblxuXG5pbXBvcnQge1RlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U2VsZWN0aW9uTW9kZX0gZnJvbSAnLi9kYXRhdGFibGUyLmNvbXBvbmVudCc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7RGV0YWlsUm93RXhwYW5zaW9uU3RhdGUsIERUMkRhdGFTb3VyY2V9IGZyb20gJy4vZGF0YXRhYmxlMi1kYXRhLXNvdXJjZSc7XG5pbXBvcnQge091dGxpbmVTdGF0ZX0gZnJvbSAnLi4vb3V0bGluZSc7XG5pbXBvcnQge0RURGV0YWlsUm93Q29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi9kZXRhaWwtcm93L2R0LWRldGFpbC1yb3cuY29tcG9uZW50JztcblxuXG5leHBvcnQgY29uc3QgRHJhZ0V2ZW50czogc3RyaW5nW10gPSBbJ21vdXNlZG93bicsICdkcmFnc3RhcnQnLCAnZHJhZ292ZXInLCAnZHJhZ2VudGVyJywgJ2RyYWdsZWF2ZScsXG4gICAgJ2Ryb3AnLCAnZHJhZ2VuZCddO1xuXG5leHBvcnQgZW51bSBEcmFnRGlyZWN0aW9uXG57XG4gICAgTm9uZSA9ICdub25lJyxcbiAgICBVcCA9ICdkdC1kcmFnLXJvdy10b3AnLFxuICAgIERvd24gPSAnZHQtZHJhZy1yb3ctYm90dG9tJyxcbiAgICBNaWRkbGUgPSAnZHQtZHJhZy1yb3ctYm90aCdcbn1cblxuXG5leHBvcnQgZW51bSBEcm9wUG9zaXRpb25cbntcbiAgICBCZWZvcmUgPSAnYmVmb3JlJyxcbiAgICBBZnRlciA9ICdhZnRlcicsXG4gICAgSW50byA9ICdpbnRvJ1xufVxuXG5cbi8qKlxuICogQWJzdHJhY3QgdHlwZSB0aGF0IGlzIHNoYXJhYmxlIGFtb25nIGRlcGVuZGFudCBEVCBvYmplY3Qgc3VjaCBhcyBDb2x1bW5zLCBEYXRhU291cmNlcyxcbiAqIERpcmVjdGl2ZXMgdG8gYmUgYWJsZSB0byBjb21tdW5pY2F0ZSBiYWNrIHRvIHRoZSBkYXRhdGFibGUgbWFpbmx5IHRvIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY3lcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBV0RhdGFUYWJsZSB7XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgeW91IHRvIHBhc3MgeW91ciBvd24gZGF0YXNvdXJjZSB0byBvdmVycmlkZSBkZWZhdWx0IG9uZS4gQWxzbyB3aGVuIGRhdGFTb3VyY2UgaXNcbiAgICAgKiB1c2VkIHRoZSBkZXN0aW5hdGlvbkNsYXNzIG9yIGxpc3QgYXJlIGlnbm9yZWRcbiAgICAgKi9cbiAgICBkYXRhU291cmNlOiBEVDJEYXRhU291cmNlO1xuXG4gICAgLyoqXG4gICAgICogTWFuYWdlcyBvdXRsaW5lIHN0YXRlcyBmb3IgRGF0YXRhYmxlcyB1c2luZyBvdXRsaW5lIGNvbnRyb2xcbiAgICAgKi9cbiAgICBvdXRsaW5lU3RhdGU6IE91dGxpbmVTdGF0ZTtcblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSB3ZSBoYXZlIGRldGFpbCByb3cgcmVtZW1iZXIgaXRzIGV4cGFuc2lvbiBzdGF0ZVxuICAgICAqL1xuICAgIGRldGFpbFJvd0V4cGFuc2lvblN0YXRlOiBEZXRhaWxSb3dFeHBhbnNpb25TdGF0ZTtcblxuICAgIC8qKlxuICAgICAqIFdoYXQgY29sdW1uIGlzIHVzZWQgYXMgZmlyc3QgZm9yIHNvcnRpbmdcbiAgICAgKi9cbiAgICBpbml0aWFsU29ydEtleTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQWxsb3cgdG8gY2hhbmdlIHNvcnRpbmcgZGlyZWN0aW9uXG4gICAgICovXG4gICAgaW5pdGlhbFNvcnRPcmRlcjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUZWxscyBEVCBpZiB3ZSBzdXBwb3J0IGNlbGwgc2VsZWN0aW9uIG9yIHJvdyBiYXNlZCBzZWxlY3Rpb24gd2hpY2ggaXMgcmVndWxhciBEVC5cbiAgICAgKlxuICAgICAqL1xuICAgIHNlbGVjdGlvbk1vZGU6IFNlbGVjdGlvbk1vZGU7XG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIG9mIHNpbmdsZSBvciBtdWx0aXNlbGVjdGlvbiBzaG93IGNvbnRyb2xzXG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93U2VsZWN0aW9uQ29sdW1uOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGVsbHMgaWYgd2Ugd2FudCB0byByZW5kZXIgb25lIHNlbGVjdGlvbiBjb250cm9sIGluIHRoZSBoZWFkZXIgdG8gc2VsZWN0IGFsbCB0aGVcbiAgICAgKiByb3dzLiBBcHBsaWNhYmxlIGZvciBtdWx0aXNlbGVjdGlvblxuICAgICAqXG4gICAgICovXG4gICAgc2hvd1NlbGVjdEFsbDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIElkZW50aWZ5IGlmIHJvdyBvciBjZWxsIGlzIHNlbGVjdGFibGUgYmFzZWQgb24gZGF0YVxuICAgICAqL1xuICAgIGlzUm93U2VsZWN0YWJsZTogKGl0ZW06IGFueSkgPT4gYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogRWFjaCBEVENvbHVtbiBoYXZlIGhhdmUgaXRzIG93biB0ZW1wbGF0ZSB0byBwcm92aWRlIGNvbnRlbnQgZm9yIGhlYWRlciwgc3ViaGVhZGVyIGFuZFxuICAgICAqIGJvZHkgYnV0IGlmIHRob3NlIHRlbXBsYXRlIGFyZSBpZGVudGljYWwgdGhlcmUgd291bGQgYmUgdG9vIG11Y2ggZHVwbGljYXRlIGNvZGUgdG8gcmVwbGljYXRlXG4gICAgICogZm9yIGVhY2ggY29sdW1uIHRoZSBzYW1lLiBUaGVyZWZvcmUgd2UgaGF2ZSB0aGVzZSBnbG9iYWwgdGVtcGxhdGVzIHRoYXQgeW91IGNhbiBkZWNsYXJlXG4gICAgICogb24gRFQgbGV2ZWwgKG5vdCB1bmRlciBjb2x1bW5zKSBhbmQgY29udGVudCBvZiB0aGVzZSB0ZW1wbGF0ZSB3aWxsIGJlIHVzZWQgZm9yIGVhY2ggY29sdW1uXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIG1peCB0aGVtIGFzIHdlbGwuIFlvdSBjYW4gaGF2ZSBnbG9iYWwgdGVtcGxhdGVzIGFzIHdlbGwgYXMgdGVtcGxhdGUgb24gdGhlIENvbHVtblxuICAgICAqIGxldmVsIHdoaWNoIHdvdWxkIG92ZXJyaWRlIHRoZSBnbG9iYWwgb25lXG4gICAgICpcbiAgICAgKi9cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFNlZSBoZWFkZXJUZW1wbGF0ZSBmb3IgbW9yZSBkZXRhaWxzXG4gICAgICovXG4gICAgc3ViSGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBTZWUgaGVhZGVyVGVtcGxhdGUgZm9yIG1vcmUgZGV0YWlsc1xuICAgICAqL1xuICAgIGJvZHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvKipcbiAgICAgKiBTZWUgaGVhZGVyVGVtcGxhdGUgZm9yIG1vcmUgZGV0YWlsc1xuICAgICAqL1xuICAgIGhlYWRlckZpbHRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZW5kZXIgYSBzdWJIZWFkZXIgdGVtcGxhdGUgaWYgcHJlc2VudFxuICAgICAqXG4gICAgICovXG4gICAgc2hvd1N1YkhlYWRlcjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgZ2xvYmFsIHN0eWxlIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGJvdW5kIHRvIHRhYmxlIGFuZCByZWFkIGJ5IGVhY2ggY29sdW1uLlxuICAgICAqIFRoZSBzYW1lIHlvdSBjYW4gc2VlIG9uIHRoZSBEVENvbHVtblxuICAgICAqL1xuICAgIGJvZHlDbGFzc0ZuOiAoY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBDb250ZXh0IGlzIGltcG9ydGFudCB3aGVuIHdlIGV4ZWN1dGUgYW55IGZ1bmN0aW9uIHRoYXQgaXMgcGFzc2VkIGluIGFzIGlucHV0LiBXZSBuZWVkIHRvXG4gICAgICogZ2l2ZSBvcHRpb24gdG8gYmUgZXhlY3V0ZWQgd2l0aGluIHRoZSBjb250ZXh0ICh0aGlzKSBvZiB0aGUgY29kZSB1c2luZyB0aGlzIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqL1xuICAgIGNvbnRleHQ6IGFueTtcblxuICAgIC8vIE91dGxpbmUgbmVlZGVkIHByb3BlcnRpZXNcblxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBvdXRsaW5lRm9yIHNlY3Rpb24gb24gdGhlIG5ldyBsaW5lIGFuZCAybmQgbGV2ZWwgY2hpbGQgbWFrZSBpdCByb290IGZvciB0aGlzXG4gICAgICogc2VjdGlvblxuICAgICAqL1xuICAgIHB1c2hSb290U2VjdGlvbk9uTmV3TGluZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFlvdSBjYW4gY2hhbmdlIGRlZmF1bHQgaW5kZW50YXRpb24gZm9yIHRoZSBvdXRsaW5lIG5vZGVzXG4gICAgICpcbiAgICAgKi9cbiAgICBpbmRlbnRhdGlvblBlckxldmVsOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGFjdGl2ZSBhcHBsaWVzIHNwZWNpYWwgc3R5bGVzIHRvIHRoZSBEVC4gTGF0ZXIgb24gb25jZSBwaXZvdCBpcyBpbXBsZW1lbnRlZCB0aGlzIHdpbGxcbiAgICAgKiBhbHNvIGFkZCBhZGRpdGlvbmFsIGJlaGF2aW9yIHRvIHRoZSBEVFxuICAgICAqXG4gICAgICovXG4gICAgcGl2b3RhbExheW91dDogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBzb3J0aW5nIGlzIGVuYWJsZWQgdGhpcyBpcyBjdXJyZW50IGFjdGl2ZSBjb2x1bW4gYmVpbmcgc29ydGVkLlxuICAgICAqXG4gICAgICogIC0gd2UgZG9udCBzdXBwb3J0IG11bHRpcGxlIGNvbHVtbiBzb3J0aW5nXG4gICAgICovXG4gICAgc29ydENvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50O1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIGF3LWR0LWRldGFpbC1jb2x1bW4gaWYgcHJlc2VudCBkZXRhaWwgcm93IGlzIHJlbmRlcmVkIGZvciBzcGVjaWZpZWRcbiAgICAgKiBpdGVtc1xuICAgICAqL1xuICAgIHJvd0RldGFpbENvbHVtbjogRFREZXRhaWxSb3dDb21wb25lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBzcGFuaW5nIGNhbGN1bGF0aW9uIG9yIGZvciB0aGUgZGV0YWlsIHJvdyB0byBpZGVudGlmeSBjb3JyZWN0IG51bWJlciBvZiBjb2x1bW5zXG4gICAgICogdG8gc3Bhbiwgd2hlbiB0aGV5IGFyZSBzb21lIG5vbi1kYXRhIGNvbHVtbiAoZXhwYW5zaW9uIGNvbnRyb2wsIHNpbmdsZS9tdWx0aSBzZWxlY3Rpb24pXG4gICAgICovXG4gICAgbnVtYmVyT2ZDb2xzQmVmb3JlRGF0YTogbnVtYmVyO1xuXG5cbiAgICAvKipcbiAgICAgKiAgd2hhdCBpcyB0aGUgaW5kZXggb2YgZmlyc3QgZGF0YSBjb2x1bW5zXG4gICAgICovXG4gICAgc3RhcnRPZkZpcnN0RGF0YUNvbHVtbjogbnVtYmVyO1xuXG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgd2hlbiBpbiBjZWxsIHNlbGVjdGlvbiBtb2RlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNlbGxTZWxlY3Rpb25DaGFuZ2UoY2VsbDogYW55LCBjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KTogdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGJ5IGNvbHVtbiB3aGUgaGVhZGVyIGlzIHNlbGVjdGVkLiBDdXJyZW50IHdlIGFzc3VtZSB0aGUgb25seSBvbmUgaGVhZGVyIGNhbiBiZVxuICAgICAqIHNlbGVjdGVkIGF0IHRoZSB0aW1lLlxuICAgICAqXG4gICAgICovXG4gICAgb25IZWFkZXJTZWxlY3Rpb25DaGFuZ2UoY2VsbDogYW55LCBjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCk6IHZvaWQ7XG5cblxuICAgIG9uSGFuZGxlUm93Q2xpY2tlZChldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBIYW5kbGVzIHJvdyBzZWxlY3Rpb24gbG9naWMgd2hlcmUgaWYgdGhlIGl0ZW0gaXMgZm91bmQgaW5zaWRlIHRoZSBzZWxlY3RlZCBpdGVtcywgdGhlblxuICAgICAqIGl0cyByZW1vdmVkIG90aGVyd2lzZSBpdHMgYWRkZWQuXG4gICAgICpcbiAgICAgKiBUb2RvOiBTeW5jICYgcmVmYWN0b3IgdGhpcyB3aXRoIGR0Lm9uQ2VsbFNlbGVjdGlvbkNoYW5nZSAtIHByZXR0eSBzaW1pbGFyIGNvZGVcbiAgICAgKlxuICAgICAqIFdlIHdhbnQgdG8gaGF2ZSByb3dUb2dnbGUgYXMgd2VsbCBhcyB3ZSB3aWxsIGhhdmUgcm93U2VsZWN0IG9yIHNvbWV0aGlnbiBzaW1pbGFyIHRvXG4gICAgICogaWRlbnRpZnkgd2UgYXJlIGRlYWxpbmcgd2l0aCBtdWx0aXNlbGVjdCBhbmQgc2luZ2xlIHNlbGVjdGlvblxuICAgICAqL1xuICAgIG9uUm93VG9nZ2xlKGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSGFuZGxlcyByb3cgc2luZ2xlIHNlbGVjdGlvblxuICAgICAqXG4gICAgICovXG4gICAgb25Sb3dTZWxlY3QoZXZlbnQ6IGFueSwgaXRlbTogYW55KTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFdoZW4gZGVhbGluZyB3aXRoIG91dGxpbmUgKHRyZWUpIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdoZW4gd2Ugc2VsZWN0IHNvbWUgcm9vdCBpdGVtIGl0XG4gICAgICogd2lsbCBhdXRvbWF0aWNhbGx5IGFsc28gc2VsZWN0IGFsbCBpdHMgY2hpbGRyZW5cbiAgICAgKlxuICAgICAqL1xuICAgIG9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oY3VycmVudEl0ZW06IGFueSwgaXNTZWxlY3RlZDogYm9vbGVhbik6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSnVzdCBsaWtlIGZvciBvbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuIHRoZSBzYW1lIGJlaGF2aW9yIG5lZWRzIHRvIGJlIGFwcGxpZWQgZm9yXG4gICAgICogdG93YXJkcyB1cC5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgb0hhbmRsZU91dGxpbmVSb3dUb2dnbGVUb1BhcmVudChjdXJyZW50SXRlbTogYW55LCBpc1NlbGVjdGVkOiBib29sZWFuKTogdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDYWxsZWQgYnkgRCZEIHJvdyBkaXJlY3RpdmUgdG8gdXBkYXRlIHRoaXMgVEQgdGhhdCByb3cgcmVvcmRlcmluZyBuZWVkcyB0byBoYXBwZW4uIFdlXG4gICAgICogcmVjZWl2ZSBhbiBJTkRFWCBvZiByb3cgd2UgYXJlIGRyYWdnaW5nIGFuZCBuZXcgZHJvcCBwb3NpdGlvbiwgcGx1cyBpbmZvcm1hdGlvbiBpZiBpdFxuICAgICAqIG5lZWRzIHRvIGJlIGRyb3BwZWQgYmVmb3JlIG5ldyByb3cgcG9zaXRpb24gb3IgYWZ0ZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkRuRFJvd0Ryb3Aob3JpZ1BvczogbnVtYmVyLCBuZXdQb3M6IG51bWJlciwgZHJvcFBvczogRHJvcFBvc2l0aW9uKTogdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIGRldGFpbCByb3cgaXMgY29tYmluZWQgd2l0aCBvdXRsaW5lIGNvbnRyb2wgd2UgbmVlZCBtYWtlIHN1cmUgdGhhdCB3ZSBtYWludGFpbiB0aGVcbiAgICAgKiBjb3JyZWN0IHN0YXRlIGZvciBpdGVtcyB0aGF0IGFyZSBlbGlnaWJsZSBmb3IgZGV0YWlsIHJvd1xuICAgICAqXG4gICAgICogSW4gdGhpcyBzcGVjaWZpYyBjYXNlIHRoZSBkZXRhaWwgcm93IGRvZXMgbm90IGhhdmUgaXRzIG93biBleHBhbmRlciBidXQgdXRpbGl6aW5nIHRoZVxuICAgICAqIG91dGxpbmVDb250cm9sXG4gICAgICovXG4gICAgb25PdXRsaW5lRXhwYW5kQ2hhbmdlKGV2ZW50OiBhbnkpOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKiBTdXBwb3J0IGZvciBzaW5nbGUgY29sdW1uIHNvcnRpbmdcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgc29ydFNpbmdsZSgpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBkYXRhIGNoYW5nZXMsIGVpdGhlciB0aGV5IGFyZSBsYXppbHkgZmV0Y2hlZCBvciBASW5wdXQgTElTVCBpcyB1cGRhdGVkIHdlIG5lZWRcbiAgICAgKiByZXNvcnQgb3V0IGRhdGEgYmFzZWQgb24gY3VycmVudCBzdGF0ZSBhbmQgdXBkYXRlIGludGVybmFsIGxpc3QgZGF0YVRvUmVuZGVyIHNvIG5ld1xuICAgICAqIGRhdGEgY2FuIHJlLXJlbmRlcmVkICsgdHJpZ2dlcnMgZXZlbnQgdmFsdWVDaGFuZ2VcbiAgICAgKlxuICAgICAqL1xuICAgIGhhbmRsZURhdGFDaGFuZ2UoKTogdm9pZDtcblxuICAgIHVwZGF0ZURhdGFUb1JlbmRlcihkYXRhc291cmNlPzogYW55KTogdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IG9yIHVuc2VsZWN0IGFsbCByb3dzLiBVc2VkIGJ5IGhlYWRlciBjaGVja2JveFxuICAgICAqXG4gICAgICovXG4gICAgdG9nZ2xlQWxsQ29sdW1ucyhldmVudDogYW55KTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIE1vcmUgbGlrZSB1dGlsaXR5IG1ldGhvZHMgdG8gdHJhbnNsYXRlIHN0cmluZzwtLT5udW1iZXIgdmFsdWUgZm9yIHNvcnRpbmdcbiAgICAgKlxuICAgICAqIEN1cnJlbnRseSB1c2VkIG9ubHkgYnkgRFRDb2x1bW4uIFdlIG1pZ2h0IHdhbnQgdG8gbW92ZSB0aGlzIGl0cyBvd24gY29tcG9uZW50IGZvclxuICAgICAqIGhlYWRlclNvcnQgYW5kIG9yZGVyaW5nXG4gICAgICpcbiAgICAgKi9cbiAgICBzb3J0T3JkZXJpbmdGb3JTdHJpbmcoZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXI7XG5cbiAgICBzb3J0T3JkZXJpbmdGb3JOdW1iZXIoZGlyZWN0aW9uOiBudW1iZXIpOiBzdHJpbmc7XG5cbiAgICB2aXNpYmxlQ29sdW1ucygpOiBEVENvbHVtbjJDb21wb25lbnRbXTtcblxuICAgIGhhc0Zyb3plbkNvbHVtbnMoKTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBzaW5nbGUvbXVsdGlzZWxlY3QgZnVuY3Rpb25hbGl0eSB3aGVyZSB3ZSBuZWVkIHRvIHRyYWNrIGlmXG4gICAgICogd2Ugc3VwcG9ydCBzZWxlY3Rpb24gcGx1cyBob3cgbWFueSBjb2x1bW4gaXQgb2NjdXBpZXMgYW5kIGlmIHRoZSBzZWxlY3Rpb24gY29udHJvbHMgYXJlXG4gICAgICogdmlzaWJsZSBvciBoaWRkZW4uXG4gICAgICovXG4gICAgaGFzSW52aXNpYmxlU2VsZWN0aW9uQ29sdW1uKCk6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUGxhY2Vob2xkZXIgdG8gaWRlbnRpZnkgaWYgdGhleSBhcmUgbm9uLXZhbHVlIGNvbHVtblxuICAgICAqXG4gICAgICovXG4gICAgaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpOiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKiBUbyBjb21wYXJlIHRoZSBkYXRhIGlmIHdlIHVzZSBkZWVwIG9iamVjdCBlcXVhbGl0eSBhbmQgdGhpcyBpcyB1c2VkIHdpdGhpbiB0aGlzIGNsYXNzIGFzXG4gICAgICogd2VsbCBhcyBmcm9tIHRoZSBEVENvbHVtbiB0byBjb25kaXRpb25hbGx5IGFkZCBjbGFzcyB3aGljaCBzZWxlY3QgdGhlIGNlbGxcbiAgICAgKlxuICAgICAqIFdlIG1pZ2h0IHdhbnQgdG8gY2hhbmdlIHRvIGNoZWNrIG9ubHkgYSBrZXkgb2YgdGhlIG9iamVjdCBzb21lIHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgICAqL1xuICAgIGlzSGVhZGVyU2VsZWN0ZWQoaXRlbTogRFRDb2x1bW4yQ29tcG9uZW50KTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2hlY2sgaWYgdGhlIHNwZWNpZmljIGNlbGwgaXMgc2VsZWN0ZWQuIFdlIG5lZWQgdHdvIHBvaW50cyB0byBpZGVudGlmeSBpZiBjZWxsIGlzIHNlbGVjdGVkXG4gICAgICogdGhlIGFjdHVhbCBJdGVtIHRoYXQgY291bGQgcmVwcmVzZW50IHdob2xlIHJvdyBhbmQgQ29sdW1uXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0JvZHlDZWxsU2VsZWN0ZWQoY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiAgQ2hlY2sgaWYgdGhlIGdpdmVuIGl0ZW0gaXMgYW1vbmcgdGhlIHNlbGVjdGVkIG9uZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGlzUm93U2VsZWN0ZWQoaXRlbTogYW55KTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBbY2hpbGRyZW5dIGJpbmRpbmcgaXMgcHJlc2VudCB0aGVuIGl0IG1lYW5zIHdlIG5lZWQgdG8gcmVuZGVyIGl0IGFzIGEgdHJlZVxuICAgICAqXG4gICAgICovXG4gICAgaXNPdXRsaW5lKCk6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdGhlIGNoZWNrYm94IHRvIGVpdGhlciBzZWxlY3RlZCBhbmQgbm90IHNlbGVjdGVkIGRlcGVuZGVkIG9uIGludGVybmFsIHN0YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1RvZ2dsZUFsbENvbHVtblNlbGVjdGVkKCk6IGJvb2xlYW47XG5cbiAgICBpc1RvZ2dsZUFsbENvbHVtbkRpc2FibGVkKCk6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVXNlcyBhcmUgZmllbGQgcGF0aCB1dGlsaXR5IGNsYXNzIHRvIHJldHJpZXZlIGRhdGEgZnJvbSBvYmplY3RcbiAgICAgKlxuICAgICAqL1xuICAgIGdldFZhbHVlKGRhdGE6IGFueSwgZmllbGQ6IHN0cmluZyk6IGFueTtcblxufVxuIl19