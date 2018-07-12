/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Inject, Injector, Input, NgZone, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import { OutlineState } from '../outline/index';
import { BaseComponent } from '../../core/base.component';
import { assert, BooleanWrapper, Environment, equals, FieldPath, isBlank, isPresent, ListWrapper } from '@aribaui/core';
import { DTColumn2Component } from './column/dt-column.component';
import { DTHeaderComponent2 } from './header/header.component';
import { DTDetailRowComponent } from './column/detail-row/dt-detail-row.component';
import { DTDetailRowExpanderComponent } from './column/detail-row-expander/dt-detail-row-expander.component';
import { DATA_SOURCE } from '../../core/data/data-source';
import { DataProviders } from '../../core/data/data-providers';
import { DataFinders, QueryType } from '../../core/data/data-finders';
import { Datatable2State, DetailRowExpansionState, DT2DataSource } from './datatable2-data-source';
import { DTMultiSelectColumnComponent } from './column/multi-select/dt-multi-select-column.component';
import { DTSingleSelectColumnComponent } from './column/single-select/dt-single-select-column.component';
/**
 * DT component that implements the data grid that shows tabular data. Even the basic
 * structure is based on PrimeNG datatable its completely refactored into smaller pieces that
 * allows more extensibility and trying to stay as close as possible to existing AWL implementation
 *
 * There are 3 main pieces:
 *
 *  Table Wrapper - focuses on the outer structure. Container with basic datable layout plus
 *  contains any additional panels that datatable needs such as our new concept how editing will
 *  work - sliding panel from the bottom
 *
 *  Datatable Column - Instead of rendering everything inside DT I split the part that renders
 *  column into separate component. This way component column has its own renderer template which
 *  can render both header and data cells.
 *  Later on DTColumn is then extended to support other additional column types
 *  SingleSelectionColumn, MultiSelectionColumn, both responsible for rendering selection controls.
 *
 * To support pivotal layout this can be extended for other additional columns that implements their
 * own rendering templates
 *
 * Datatable - The main component that is only focus on header and body rendering and basaed on the
 * column type it will render the correct template
 * column type it will render the correct template
 *
 *
 *
 *
 *
 */
export class Datatable2Component extends BaseComponent {
    /**
     *
     * In case of outline table we are inject OutlineState which is provided in the DT component
     * definition. This is used by nested outlineFor component it set itself as reference and
     * initialize the state so it can be used later on inside OutlineControl
     *
     *
     * Each Datatable is pre-defaulted with its own version of DataSource so all the observers
     * inside are unique for this component
     *
     * @param {?} env
     * @param {?} el
     * @param {?} _defaultDS
     * @param {?} changeDetector
     * @param {?} factoryResolver
     * @param {?} outlineState
     * @param {?} zone
     * @param {?} injector
     */
    constructor(env, el, _defaultDS, changeDetector, factoryResolver, outlineState, zone, injector) {
        super(env);
        this.env = env;
        this.el = el;
        this._defaultDS = _defaultDS;
        this.changeDetector = changeDetector;
        this.factoryResolver = factoryResolver;
        this.outlineState = outlineState;
        this.zone = zone;
        this.injector = injector;
        /**
         *  Hides or shows table heading where we have filters and tools menus
         */
        this.showTableHeader = true;
        /**
         * See AWDataTable
         *
         */
        this.pivotalLayout = false;
        /**
         * See AWDataTable
         */
        this.initialSortOrder = 'descending';
        /**
         * When DT is loaded in the page and we are not in the full screen (full page mode), this
         * is hte number of lines that DT will show
         *
         * todo: come up with better name
         */
        this.displayRowSize = 10;
        /**
         * Used for paging on lazy loading using infinite scroller to set initial fetch limit size
         *
         * todo: come up with better name !!!
         *
         */
        this.pageSize = 15;
        /**
         * Default message when there are no data .
         *
         * todo: Use i18n value and create resource file
         */
        this.emptyMessage = 'No records found';
        /**
         *
         * See AWDataTable
         *
         */
        this.selectionMode = 'none';
        /**
         *
         * Can provide custom icon. These icons are not animated divs, we used css
         * transformation to rotate them.
         *
         */
        this.loadingIcon = 'icon-synchronize';
        /**
         * Additional indent can be added when rendering detail row
         */
        this.indentDetailRow = false;
        /**
         * See AWDataTable
         *
         */
        this.indentationPerLevel = 25;
        /**
         *
         *  SubHeader is used to show summary columns, which in our UX is shown at the top just under
         *  the regular table header
         *
         */
        this.showSubHeader = false;
        /**
         * See OutlineFor - only used in the tree mode
         */
        this.expandAll = false;
        /**
         * See AWDataTable
         */
        this.pushRootSectionOnNewLine = true;
        /**
         * Render or hide expansion control for row detail columns. Expansion control makes sense for
         * simple table, when using this inside outline (tree table), its driven by outline control
         */
        this.showRowDetailExpansionControl = true;
        /**
         * See AWDataTable
         *
         */
        this.showSelectionColumn = true;
        /**
         * See AWDataTable
         *
         */
        this.showSelectAll = true;
        /**
         * Show or hide global search term input field in the header
         */
        this.showGlobalSearch = true;
        /**
         * Enables or disables row reordering
         *
         */
        this.dndRowEnabled = false;
        /**
         *
         * Fires event that sorting is enabled for column and we trigger sorting
         *
         */
        this.onSort = new EventEmitter();
        /**
         * Based on selection mode it triggers even
         *
         */
        this.onRowClick = new EventEmitter();
        /**
         *
         * When multi or single selection mode is enabled it will trigger event when checkbox or
         * radio buttons is selected
         *
         * todo: implement SingleSelectionDTColumn, MultiSelectionDTColumn with their renderers
         */
        this.onRowSelectionChange = new EventEmitter();
        /**
         * When cell body selection changes we fire event
         *
         */
        this.onCellChange = new EventEmitter();
        /**
         * When cell header selection changes we fire event
         *
         */
        this.onHeaderSelection = new EventEmitter();
        /**
         *
         * Triggers when items in the list are updated
         *
         */
        this.valueChange = new EventEmitter();
        this.classList = 'w-datatable ';
        /**
         *  Indicates that columns were initialed Also used when we hide and show column to trigger
         *  change.
         *
         */
        this.columnsChanged = false;
        /**
         * See AWDataTable
         */
        this.numberOfColsBeforeData = 0;
        /**
         * See AWDataTable
         */
        this.startOfFirstDataColumn = 0;
        this.dataSource = this._defaultDS;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isPresent(this.list) && isPresent(this.destinationClass)) {
            throw new Error('You cannot use both bindings [list] and [destinationClass]!');
        }
        this.detailRowExpansionState = new DetailRowExpansionState(this);
        // init default columns
        this.rowDetailExpandColumn = this.factoryResolver
            .resolveComponentFactory(DTDetailRowExpanderComponent).create(this.injector).instance;
        this.multiSelectColumn = this.factoryResolver
            .resolveComponentFactory(DTMultiSelectColumnComponent).create(this.injector).instance;
        this.singleSelectColumn = this.factoryResolver
            .resolveComponentFactory(DTSingleSelectColumnComponent).create(this.injector).instance;
        /**
                 * If the data are not deferred and we get list directly then it creates DS. If
                 * ngOnChanges is called first we properly init DS and clean this.list
                 *
                 */
        if (isPresent(this.destinationClass) || isPresent(this.list)) {
            this.initDatasource();
        }
        else if (this.dataSource.initialized) {
            this.initDatasource(false);
        }
        // since we work with references let's pass created map inside our state
        this.outlineState.expansionStates = this.state.outlineState;
    }
    /**
     * When data arrives later maybe due to REST API latency, initialize DS only when we have a
     * data, otherwise if data changed thru the bindings just trigger dataChange event
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (changes['list'] && isPresent(changes['list'].currentValue)
            && !this.dataSource.initialized) {
            this.initDatasource();
        }
        else if (this.dataSource.initialized) {
            this.dataSource.dataProvider.dataChanges.next(this.list);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // make sure we init a state when detail column is present
        // todo: move this initialization to datasource
        this.detailRowExpansionState.detailExpansionEnabled = isPresent(this.rowDetailColumn);
        this.initColumns();
        this.columnsSubscription = this.colsQuery.changes.subscribe(_ => {
            this.initColumns();
            this.changeDetector.markForCheck();
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // assign it programatically as we want to have a context for the filter
        if (isPresent(this.rowDetailColumn) && isPresent(this.outlineState.outlineFor)) {
            this.outlineState.outlineFor.filterOut = this.skipOutlineItem.bind(this);
        }
        if (isPresent(this.outlineState.outlineFor)) {
            // this.outlineState.outlineFor.changeDetector.detach();
            // this.outlineState.outlineFor.changeDetector.detectChanges();
        }
        this.initialized = true;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.columnsChanged && this.el.nativeElement.offsetParent) {
            this.columnsChanged = false;
        }
        if (this.hasFrozenColumns()) {
            this.frozenColumns.forEach((col, index) => col.postInitialize(index));
        }
        else {
            this.columns.forEach((col, index) => col.postInitialize(index));
        }
    }
    /**
     * Key entry method that initialized our columns. Later on when we will support selection and
     * multiselection we will programmatically instantiate SingleSelection, MultiSelection column
     * components and add them to the list so they can be rendered.
     *
     * so the idea here is:
     *
     * When DT component initialize and we are in editing mode and we support Single/Multi selection
     * we will use ComponentFactoryResolver to create component and add it as first item to the list
     * and then it will be rendered just like anythign else.
     *
     * @return {?}
     */
    initColumns() {
        this.columns = [];
        this.frozenColumns = [];
        if (this.detailRowExpansionState.detailExpansionEnabled) {
            this.initDetailColumnExpansion();
        }
        if (this.hasLeadingSelectColumn() && this.selectionMode === 'multi') {
            this.columns.push(this.multiSelectColumn);
        }
        else if (this.hasLeadingSelectColumn() && this.selectionMode === 'single') {
            this.columns.push(this.singleSelectColumn);
        }
        /**
                 * Add expansion column when detail row is enabled
                 */
        if (this.detailRowExpansionState.detailExpansionEnabled && !this.isOutline()) {
            this.columns.push(this.rowDetailExpandColumn);
        }
        this.colsQuery
            .filter((col1) => !col1.frozen)
            .forEach((col) => {
            col.initialize(this);
            this.columns.push(col);
        });
        this.initFrozenColumns();
        this.initColumnInfo();
        this.columnsChanged = true;
    }
    /**
     * Makes sure that we also include programmatic column if present. Move them to the correct
     * array
     *
     * @return {?}
     */
    initFrozenColumns() {
        this.colsQuery
            .filter((col1) => col1.frozen)
            .forEach((col) => {
            col.initialize(this);
            this.frozenColumns.push(col);
        });
        if (this.frozenColumns.length > 0) {
            // find last index of column that is internal / programmatic
            let /** @type {?} */ lastInx = this.columns.slice()
                .reverse()
                .findIndex((col) => this.isInternalColumn(col));
            if (lastInx !== -1) {
                let /** @type {?} */ idx = this.columns.length - 1 - lastInx;
                let /** @type {?} */ internalCols = this.columns.splice(0, idx + 1);
                this.frozenColumns = [...internalCols, ...this.frozenColumns];
            }
            let /** @type {?} */ hasValidCols = this.columns
                .findIndex((col) => isBlank(col.width)) === -1;
            assert(hasValidCols || isPresent(this.scrollWidth), 'When using [frozen] binding you need specify [width] for each ' +
                'column or [scrollWidth] on datatable!');
            assert(isBlank(this.rowDetailColumn), 'You cannot combine aw-dt-detail-column with frozen columns!');
        }
    }
    /**
     * Check if current column is programmatically created
     *
     * @param {?} col
     * @return {?}
     */
    isInternalColumn(col) {
        return col instanceof DTSingleSelectColumnComponent ||
            col instanceof DTMultiSelectColumnComponent ||
            col instanceof DTDetailRowExpanderComponent;
    }
    /**
     * Create new Datasource based on passed values. It tries to initialize DS for first time
     * inside the ngInit but in case Data arrives later maybe due to some REST API calls this
     * can be triggered also from ngOnChanges.
     *
     * @param {?=} initialize
     * @return {?}
     */
    initDatasource(initialize = true) {
        if (isBlank(this.state)) {
            this.state = Datatable2State.create(0, this.pageSize, this.displayRowSize, this.initialSortKey, this.sortOrderingForString(this.initialSortOrder));
        }
        else {
            this.state.limit = this.state.displayLimit = this.displayRowSize;
            if (isPresent(this.initialSortKey)) {
                this.state.sortKey = this.initialSortKey;
                this.state.sortOrder = this.sortOrderingForString(this.initialSortOrder);
            }
        }
        if (initialize) {
            this.dataSource.init({
                obj: isPresent(this.destinationClass) ? this.destinationClass : this.list,
                queryType: QueryType.FullText,
                state: this.state,
                multiselect: false
            });
        }
        this.dataSource.fetch(this.state);
        // reset list to make sure it comes from DataProvider, we use list  to initialize
        this.list = null;
        // This is the ENTRY point for the DATA CHANGES. All addition, edits, deletion ends up
        // here. We dont work directly with LIST. Any change is reactive and here is listener
        this.dataSource.open().subscribe((data) => {
            this.updateList(data);
        });
    }
    /**
     * When detailRow column is present we initialize a state holding information which item is
     * expanded.
     *
     * todo: This is temporary here and once we suport lazy loading move this to datasource.
     *
     * For example for outline tree table we need to connect a state from outline with a state in
     * here as we are using outline control to expand and collapse items
     * @return {?}
     */
    initDetailColumnExpansion() {
        this.detailRowExpansionState.detailExpansionEnabled = isPresent(this.rowDetailColumn) &&
            BooleanWrapper.isTrue(this.showRowDetailExpansionControl);
    }
    /**
     * This method is executed after we initialize all the columns in order to calculate correct
     * numbers used for indentation while rendering selection columns as well as detail row columns.
     *
     * Here we need to be aware how many columns to span
     *
     * @return {?}
     */
    initColumnInfo() {
        this.numberOfColsBeforeData = 0;
        this.columns.forEach((col) => {
            if (!col.isValueColumn()) {
                this.numberOfColsBeforeData++;
            }
        });
        if (this.indentDetailRow) {
            this.numberOfColsBeforeData++;
        }
        this.startOfFirstDataColumn = this.columns.length - this.numberOfColsBeforeData;
    }
    /**
     * Pushes a state out to application. Can be use as two way bindings
     *
     * [(state)]=dtState(s)
     *
     * @return {?}
     */
    get state() {
        return this.dataSource.state;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set state(val) {
        this.dataSource.state = val;
    }
    /**
     * See AWDataTable
     *
     * @param {?} cell
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    onCellSelectionChange(cell, column, item) {
        if (this.selectionMode !== 'cell') {
            return;
        }
        let /** @type {?} */ lookupKey = {
            col: column.key || column.label,
            item: item
        };
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {
            let /** @type {?} */ foundIndex = ListWrapper.findIndexComplex(this.state.selection, lookupKey);
            let /** @type {?} */ isSelected = foundIndex !== -1;
            if (isSelected) {
                this.state.selection = this.state.selection
                    .filter((val, index) => index !== foundIndex);
            }
            else {
                this.state.selection = [...this.state.selection, lookupKey];
            }
        }
        else {
            this.state.selection = [lookupKey];
        }
        this.onCellChange.emit(this.state.selection);
    }
    /**
     * See AWDataTable
     *
     * @param {?} cell
     * @param {?} column
     * @return {?}
     */
    onHeaderSelectionChange(cell, column) {
        if (isPresent(this.state.headerSelection)) {
            if (this.isHeaderSelected(column)) {
                this.state.headerSelection = null;
            }
            else {
                this.state.headerSelection = column;
            }
        }
        else {
            this.state.headerSelection = column;
        }
        this.onHeaderSelection.emit(this.state.headerSelection);
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    onHandleRowClicked(event, item) {
        // special alt key modifier. When used with rows it indicates there is a D&D enabled
        if (event.altKey) {
            return;
        }
        if (this.selectionMode === 'multi') {
            this.onRowToggle(event, item);
        }
        else if (this.selectionMode === 'single') {
            this.onRowSelect(event, item);
        }
    }
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    onRowToggle(event, item) {
        let /** @type {?} */ rowSelected = true;
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {
            let /** @type {?} */ foundIndex = ListWrapper.findIndexComplex(this.state.selection, item);
            let /** @type {?} */ isSelected = foundIndex !== -1;
            if (isSelected) {
                this.state.selection = this.state.selection
                    .filter((val, index) => index !== foundIndex);
                rowSelected = false;
            }
            else {
                this.state.selection = [...this.state.selection, item];
            }
            // for the outline go up and down the sync with treeitems
            if (this.isOutline()) {
                this.onHandleOutlineRowToggleToChildren(item, isSelected);
                this.oHandleOutlineRowToggleToParent(item, isSelected);
            }
        }
        else {
            this.state.selection = [item];
            if (this.isOutline()) {
                this.onHandleOutlineRowToggleToChildren(item, false);
                this.oHandleOutlineRowToggleToParent(item, false);
            }
        }
        this.onRowSelectionChange.emit({
            isSelected: rowSelected,
            item: this.state.selection
        });
        event.stopPropagation();
    }
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    onRowSelect(event, item) {
        this.state.selection = item;
        event.stopPropagation();
        this.onRowSelectionChange.emit(item);
    }
    /**
     * See AWDataTable
     *
     * @param {?} currentItem
     * @param {?} isSelected
     * @return {?}
     */
    onHandleOutlineRowToggleToChildren(currentItem, isSelected) {
        let /** @type {?} */ childrenForNode = this.children.apply(this.context, [currentItem]) || [];
        if (childrenForNode.length > 0) {
            // If is selected currently then toggle to other state
            if (!isSelected) {
                // when checking all from root, deselect children and add all
                this.onHandleOutlineRowToggleToChildren(currentItem, true);
                this.state.selection = [...this.state.selection, ...childrenForNode];
            }
            else {
                // remove each child
                for (let /** @type {?} */ child of childrenForNode) {
                    let /** @type {?} */ foundIndex = ListWrapper.findIndexComplex(this.state.selection, child);
                    this.state.selection = this.state.selection
                        .filter((val, index) => index !== foundIndex);
                }
            }
            // apply the same for children of children
            for (let /** @type {?} */ child of childrenForNode) {
                this.onHandleOutlineRowToggleToChildren(child, isSelected);
            }
        }
    }
    /**
     * See AWDataTable
     *
     * @param {?} currentItem
     * @param {?} isSelected
     * @return {?}
     */
    oHandleOutlineRowToggleToParent(currentItem, isSelected) {
        let /** @type {?} */ parent = currentItem.$$parentItem;
        if (isPresent(parent)) {
            let /** @type {?} */ childrenForNode = this.children.apply(this.context, [parent]) || [];
            let /** @type {?} */ allSelected = true;
            for (let /** @type {?} */ child of childrenForNode) {
                allSelected = ListWrapper.findIndexComplex(this.state.selection, child) !== -1
                    && allSelected;
            }
            if (!isSelected) {
                if (allSelected) {
                    this.state.selection.push(parent);
                }
            }
            else {
                if (!allSelected) {
                    let /** @type {?} */ parentIndex = ListWrapper.findIndexComplex(this.state.selection, parent);
                    this.state.selection = this.state.selection
                        .filter((val, index) => index !== parentIndex);
                }
            }
            this.oHandleOutlineRowToggleToParent(currentItem.$$parentItem, isSelected);
        }
    }
    /**
     * See AWDataTable
     *
     * @param {?} origPos
     * @param {?} newPos
     * @param {?} dropPos
     * @return {?}
     */
    onDnDRowDrop(origPos, newPos, dropPos) {
        if (isPresent(this.dataSource)) {
            console.log('Dropping row #: ', origPos + ' ' + dropPos + ' row #: ' + newPos);
            this.dataSource.reorderRows(origPos, newPos, dropPos);
        }
    }
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @return {?}
     */
    onOutlineExpandChange(event) {
        let /** @type {?} */ item = event.item;
        // We dont really need to store a state form outline locally as we are using the same object
        // reference
        // this.state.outlineState = this.outlineState.expansionStates;
        if (this.canUseForDetailRow(item)) {
            this.detailRowExpansionState.toggle(item);
        }
    }
    /**
     * See AWDataTable
     *
     *
     * @return {?}
     */
    sortSingle() {
        if (isPresent(this.list) && isPresent(this.sortColumn)) {
            assert(isPresent(this.sortColumn.key), 'Invalid column to sort');
            this.dataSource.sort(this.sortColumn.key, this.sortColumn.sortOrder);
            this.onSort.emit({
                field: this.sortColumn.key,
                order: this.sortColumn.sortOrder
            });
        }
    }
    /**
     * See AWDataTable
     *
     * @return {?}
     */
    handleDataChange() {
        if (this.state.sortKey || this.sortColumn) {
            if (!this.sortColumn && this.columns) {
                this.sortColumn = this.columns.find(col => col.key === this.state.sortKey);
            }
        }
        this.updateDataToRender();
        this.valueChange.emit(this.list);
    }
    /**
     * @param {?=} datasource
     * @return {?}
     */
    updateDataToRender(datasource) {
        this.dataToRender = datasource || this.list;
        // this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
    }
    /**
     * Updates current immutable list and trigger change detection. Need to wrap it with
     * setTimeout as the change can easily come after view checked and this would result some errors
     *
     * @param {?} newList
     * @return {?}
     */
    updateList(newList) {
        setTimeout(() => {
            this.list = newList;
            this.handleDataChange();
        });
    }
    /**
     * @return {?}
     */
    reset() {
        this.sortColumn = null;
        this.updateDataToRender();
    }
    /**
     * See AWDataTable
     * @param {?} item
     * @return {?}
     */
    isHeaderSelected(item) {
        if (isBlank(this.state.headerSelection)) {
            return false;
        }
        let /** @type {?} */ colMatched = item.key || item.label;
        let /** @type {?} */ currentCol = this.state.headerSelection.key || this.state.headerSelection.label;
        return colMatched === currentCol;
    }
    /**
     *
     * See AWDataTable
     *
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    isBodyCellSelected(column, item) {
        let /** @type {?} */ lookupKey = {
            col: column.key || column.label,
            item: item
        };
        return isPresent(this.state.selection) &&
            ListWrapper.findIndexComplex(this.state.selection, lookupKey) !== -1;
    }
    /**
     *  See AWDataTable
     *
     * @param {?} item
     * @return {?}
     */
    isRowSelected(item) {
        if (this.hasLeadingSelectColumn() && isPresent(this.state.selection)) {
            if (this.selectionMode === 'multi') {
                return ListWrapper.findIndexComplex(this.state.selection, item) !== -1;
            }
            else if (this.selectionMode === 'single') {
                return equals(this.state.selection, item);
            }
        }
        return false;
    }
    /**
     *
     * Do we have data to render Used inside template to tell if we should use the NoData template
     *
     * @return {?}
     */
    isEmpty() {
        return isBlank(this.dataToRender) || (this.dataToRender.length === 0);
    }
    /**
     * @return {?}
     */
    hasFrozenColumns() {
        return isPresent(this.frozenColumns) && this.frozenColumns.length > 0;
    }
    /**
     * See AWDataTable
     * @return {?}
     */
    hasInvisibleSelectionColumn() {
        return this.hasLeadingSelectColumn() && !this.showSelectionColumn;
    }
    /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    hasLeadingSelectColumn() {
        return this.selectionMode !== 'none' && this.selectionMode !== 'cell';
    }
    /**
     * @return {?}
     */
    visibleColumns() {
        return this.columns ? this.columns.filter(c => c.isVisible) : [];
    }
    /**
     * See AWDataTable
     *
     * @param {?} direction
     * @return {?}
     */
    sortOrderingForString(direction) {
        if (isBlank(direction) || direction === 'ascending') {
            return 1;
        }
        if (isBlank(direction) || direction === 'descending') {
            return -1;
        }
        // todo: log bad key
        return 1;
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    sortOrderingForNumber(direction) {
        if (isBlank(direction) || direction === 1) {
            return 'ascending';
        }
        if (isBlank(direction) || direction === -1) {
            return 'descending';
        }
        // todo: log bad key
        return 'ascending';
    }
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @return {?}
     */
    toggleAllColumns(event) {
        let /** @type {?} */ currentItems = this.dataToRender || [];
        let /** @type {?} */ selectedObject = this.state.selection || [];
        if (selectedObject.length >= currentItems.length) {
            this.state.selection = [];
        }
        else {
            this.state.selection = [];
            this.state.selection = [...currentItems];
        }
    }
    /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    isToggleAllColumnSelected() {
        let /** @type {?} */ currentItems = this.dataToRender || [];
        let /** @type {?} */ selectedObject = this.state.selection || [];
        return currentItems.length > 0 && selectedObject.length >= currentItems.length;
    }
    /**
     * @return {?}
     */
    isToggleAllColumnDisabled() {
        let /** @type {?} */ currentItems = this.dataToRender || [];
        return currentItems.length === 0;
    }
    /**
     *
     * Used by template to decide if we need to render DetailRow template. We need to have
     * DetailRow ContentChild and using DetailRow component [isVisibleFn] function binding we
     * check if the item that is about to be rendered is eligible for detail row
     *
     * @param {?} item
     * @return {?}
     */
    showDetailColumn(item) {
        if (this.canUseForDetailRow(item) && this.detailRowExpansionState.isExpanded(item)) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    canUseForDetailRow(item) {
        return isPresent(this.rowDetailColumn) &&
            (/** @type {?} */ (this.rowDetailColumn)).showDetailRow(item);
    }
    /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    isOutline() {
        return isPresent(this.children);
    }
    /**
     *
     * When dealing with detail column (detail row) and outline all together we need have a
     * mechanism to tell to the outline "don't render the next level of items" and use detail row.
     * So certain item type needs to be skipped.
     *
     * The way we skip those item is we use isVisibleFn condition of the detail row and look ahead
     * if we should skip next level.
     *
     * @param {?} item
     * @return {?}
     */
    skipOutlineItem(item) {
        return this.canUseForDetailRow(item);
    }
    /**
     *
     * See AWDaTable
     *
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    getValue(data, field) {
        return FieldPath.getFieldValue(data, field);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
    }
}
Datatable2Component.decorators = [
    { type: Component, args: [{
                selector: 'aw-datatable2',
                template: `<!--
    This template focus only on header and body rendering.

    This datatable also supports frozen column and for this rendering it is pretty much transparent
    as it received sets of column that it needs to render from the TableWrapper.

    TableWrapper in case of frozen columns calls #headerRows and #bodyRows templates twice to
    render to separate tables where one has frozen columns and another one has the rest and its
    scrollable
-->

<aw-dt-wrapper #dtWrapper>
    <ng-template #headingArea>
        <ng-content select="aw-dt-header2"></ng-content>
    </ng-template>

    <ng-template #headerRows let-colsToRender let-frozenView="frozenColumns">
        <ng-container
            *ngTemplateOutlet="header; context:{$implicit: colsToRender, frozen:frozenView }">
        </ng-container>
    </ng-template>

    <ng-template #bodyRows let-colsToRender>
        <ng-template [ngIf]="isOutline()">
            <ng-container
                *ngTemplateOutlet="bodyOutline; context:{$implicit: colsToRender}"></ng-container>
        </ng-template>
        <ng-template [ngIf]="!isOutline()">
            <ng-container
                *ngTemplateOutlet="bodyPlain; context:{$implicit: colsToRender}"></ng-container>
        </ng-template>
    </ng-template>
</aw-dt-wrapper>


<!--
    Each rendering column has its own renderTemplate which define how things should be render.
    Based on different column types this code should be transparent as we dont care on this
    level what kind of column we are rendering.

    Later on when we will support single/multi selection, this will be just another column extending
    DTColumn and providing its own template

    We pass into this template if we are rendering header, subHeader, or data
-->
<ng-template #header let-colsToRender let-frozen="frozen">
    <tr>
        <ng-template ngFor let-col [ngForOf]="colsToRender" let-lastCol="last"
                     let-columnIndex="index">

            <ng-container *ngTemplateOutlet="col.rendererTemplate;
                context:{$implicit: true, isSubHeader:false,
                columnIndex:(frozen ? columnIndex: (columns.length + columnIndex))}">
            </ng-container>
        </ng-template>
    </tr>

    <tr *ngIf="showSubHeader">
        <ng-template ngFor let-col [ngForOf]="colsToRender" let-lastCol="last">
            <ng-container *ngTemplateOutlet="col.rendererTemplate;
                context:{$implicit: true, isSubHeader:true}">
            </ng-container>
        </ng-template>
    </tr>
</ng-template>


<ng-template #bodyPlain let-colsToRender>

    <tbody [ngClass]="{'dt-content dt-data-cells ': true, 'dt-is-hoverable-row': rowHover}">

    <ng-template ngFor let-rowData [ngForOf]="dataToRender" let-even="even" let-odd="odd"
                 let-rowIndex="index" [ngForTrackBy]="rowTrackBy">

        <ng-container *ngTemplateOutlet="rowTemplate; context:{$implicit: rowData, even:even,
                                          odd:odd, rowIndex:rowIndex, colsToRender:colsToRender}">
        </ng-container>

        <ng-template [ngIf]="showDetailColumn(rowData)">
            <ng-container *ngTemplateOutlet="rowDetailColumn.rendererTemplate;
                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}">
            </ng-container>
        </ng-template>

    </ng-template>
    <ng-container *ngTemplateOutlet="noData"></ng-container>
    </tbody>
</ng-template>


<ng-template #bodyOutline let-colsToRender>
    <tbody #outlineFor awOutlineFor [list]="dataToRender"
           [context]="context"
           [indentationPerLevel]="indentationPerLevel"
           [pushRootSectionOnNewLine]="pushRootSectionOnNewLine"
           [children]="children" [expandAll]="expandAll"
           [state]="outlineState"
           [ngClass]="{'dt-content dt-data-cells ': true,
                           'dt-is-hoverable-row': rowHover}"
           (onExpandChange)="onOutlineExpandChange($event)">

    <ng-template #outline let-rowData let-nestingLevel="nestingLevel" let-rowIndex="rowIndex">
        <ng-container *ngTemplateOutlet="rowTemplate;
                                context:{$implicit: rowData, nestingLevel:nestingLevel, colsToRender:colsToRender}">
        </ng-container>

        <ng-template [ngIf]="showDetailColumn(rowData)">
            <ng-container *ngTemplateOutlet="rowDetailColumn.rendererTemplate;
                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}">
            </ng-container>
        </ng-template>

    </ng-template>
    <ng-container *ngTemplateOutlet="noData"></ng-container>
    </tbody>
</ng-template>

<!--
    Default template that is display when there are no data
-->
<ng-template #noData>
    <tr *ngIf="isEmpty()" class=" dt-emptymessage-row"
        [style.visibility]="loading ? 'hidden' : 'visible'">

        <td [attr.colspan]="visibleColumns().length" class="dt-emptymessage">
            <span *ngIf="!emptyMessageTemplate">{{emptyMessage}}</span>
            <ng-container *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
        </td>
    </tr>
</ng-template>

<!--
    Template that renders actual row. Renders both header and body column. Each rendered
    column has its own template called rendererTemplate that has all things that needs to be
    rendered and we just tell the template if we are rendering header, subheader or body
-->
<ng-template #rowTemplate let-rowData let-even="event" let-odd="odd" let-rowIndex="rowIndex"
             let-nestingLevel="nestingLevel" let-colsToRender="colsToRender">


    <tr #rowElement dtDraggableRow [dndRowIndex]="rowIndex"
        class="dt-body-row"
        (click)="onHandleRowClicked($event, rowData)"
        [attr.nestingLevel]="nestingLevel"
        [ngClass]="{'dt-even-row': even, 'dt-odd-row': odd,
            'dt-row-selected': isRowSelected(rowData),
            'dt-row-draggable': dndRowEnabled,
            'dt-root-section': nestingLevel === 0 }">

        <ng-template ngFor let-col [ngForOf]="colsToRender" let-colIndex="index">
            <ng-container *ngTemplateOutlet="col.rendererTemplate;
                    context:{$implicit: false, data:rowData, rowIndex:rowIndex,
                    nestingLevel:nestingLevel}">
            </ng-container>
        </ng-template>
    </tr>
</ng-template>


`,
                styles: [`.w-datatable{position:relative;display:block;box-sizing:border-box}.w-datatable table{border-collapse:collapse;width:100%;table-layout:fixed}.w-datatable tbody,.w-datatable td,.w-datatable th{outline:0}.dt-cell-def,.dt-cell-def-selectable{border:1px solid transparent;padding:17px 16px;box-sizing:border-box}.dt-cell-def-selectable{cursor:pointer;width:100%;height:100%}th .dt-cell-def-selectable{border-width:4px 1px 1px;padding:14px 16px 17px}td .dt-cell-def-selectable{border-width:0 1px 0 5px;padding:17px 16px 17px 13px}.dt-data-cells tr.dt-is-highlight,.dt-data-cells tr.dt-is-hover{border-color:inherit;font-weight:inherit;cursor:pointer}.w-datatable-rtl{direction:rtl}.w-datatable-rtl.w-datatable-rtl.w-datatable thead th{text-align:right}.dt-root-section .dt-cell-def,.dt-root-section .dt-cell-def-selectable{background-color:#f3f6f8;padding:10px 16px;border-bottom-color:transparent;border-right-color:transparent}.dt-plain-layout .dt-is-active,.dt-plain-layout .dt-is-default,.dt-plain-layout .dt-is-highlight,.dt-plain-layout .dt-is-hover,.dt-plain-layout .dt-is-hoverable-row{border-right-color:transparent}.dt-is-active,.dt-is-default,.dt-is-highlight,.dt-is-hover,.dt-is-hoverable-row{border:1px solid #d7d7d7;background-color:#fff;color:#363636}.dt-row-selected td{background-color:rgba(238,255,238,.71)}.dt-is-active{border-color:#065d9c;color:#199de0}.dt-is-highlight{background-color:rgba(65,117,5,.18)}.dt-is-hidden{display:none}.dt-u-unselectable-text{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none}.dt-u-sortable{cursor:pointer}`],
                providers: [
                    ObjectUtils,
                    OutlineState,
                    { provide: DATA_SOURCE, useClass: DT2DataSource, deps: [DataProviders, DataFinders] },
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
Datatable2Component.ctorParameters = () => [
    { type: Environment },
    { type: ElementRef },
    { type: DT2DataSource, decorators: [{ type: Inject, args: [DATA_SOURCE,] }] },
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver },
    { type: OutlineState },
    { type: NgZone },
    { type: Injector }
];
Datatable2Component.propDecorators = {
    list: [{ type: Input }],
    destinationClass: [{ type: Input }],
    tableStyleClass: [{ type: Input }],
    bodyClassFn: [{ type: Input }],
    isRowSelectable: [{ type: Input }],
    showTableHeader: [{ type: Input }],
    pivotalLayout: [{ type: Input }],
    context: [{ type: Input }],
    initialSortOrder: [{ type: Input }],
    initialSortKey: [{ type: Input }],
    displayRowSize: [{ type: Input }],
    pageSize: [{ type: Input }],
    dataSource: [{ type: Input }],
    emptyMessage: [{ type: Input }],
    rowTrackBy: [{ type: Input }],
    rowHover: [{ type: Input }],
    loading: [{ type: Input }],
    selectionMode: [{ type: Input }],
    loadingIcon: [{ type: Input }],
    indentDetailRow: [{ type: Input }],
    indentationPerLevel: [{ type: Input }],
    showSubHeader: [{ type: Input }],
    children: [{ type: Input }],
    showExpansionControl: [{ type: Input }],
    expandAll: [{ type: Input }],
    pushRootSectionOnNewLine: [{ type: Input }],
    showRowDetailExpansionControl: [{ type: Input }],
    showSelectionColumn: [{ type: Input }],
    showSelectAll: [{ type: Input }],
    showGlobalSearch: [{ type: Input }],
    scrollWidth: [{ type: Input }],
    dndRowEnabled: [{ type: Input }],
    onSort: [{ type: Output }],
    onRowClick: [{ type: Output }],
    onRowSelectionChange: [{ type: Output }],
    onCellChange: [{ type: Output }],
    onHeaderSelection: [{ type: Output }],
    header: [{ type: ContentChild, args: [DTHeaderComponent2,] }],
    emptyMessageTemplate: [{ type: ContentChild, args: ['noDataTempl',] }],
    headerTemplate: [{ type: ContentChild, args: ['dtHeader',] }],
    subHeaderTemplate: [{ type: ContentChild, args: ['dtSubHeader',] }],
    bodyTemplate: [{ type: ContentChild, args: ['dtBody',] }],
    headerFilterTemplate: [{ type: ContentChild, args: ['headerFilter',] }],
    colsQuery: [{ type: ContentChildren, args: [DTColumn2Component,] }],
    rowDetailColumn: [{ type: ContentChild, args: [DTDetailRowComponent,] }],
    valueChange: [{ type: Output }],
    classList: [{ type: HostBinding, args: ['class',] }],
    state: [{ type: Input }]
};
function Datatable2Component_tsickle_Closure_declarations() {
    /**
     *  List of items to show in the datatable.
     *
     *  todo: implement the same Datasource and lazy loading just like I did it for datatable
     * @type {?}
     */
    Datatable2Component.prototype.list;
    /**
     * Name of the entity for which DataProvider will be loaded. You can either pass list of items
     * or use this destinationClass. Not both
     * @type {?}
     */
    Datatable2Component.prototype.destinationClass;
    /**
     * Used by TableWrapper to add user defined clas into the table tag
     *
     * @type {?}
     */
    Datatable2Component.prototype.tableStyleClass;
    /**
     * See headerTemplate for more details
     * @type {?}
     */
    Datatable2Component.prototype.bodyClassFn;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.isRowSelectable;
    /**
     *  Hides or shows table heading where we have filters and tools menus
     * @type {?}
     */
    Datatable2Component.prototype.showTableHeader;
    /**
     * See AWDataTable
     *
     * @type {?}
     */
    Datatable2Component.prototype.pivotalLayout;
    /**
     * See AWDataTable
     *
     * @type {?}
     */
    Datatable2Component.prototype.context;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.initialSortOrder;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.initialSortKey;
    /**
     * When DT is loaded in the page and we are not in the full screen (full page mode), this
     * is hte number of lines that DT will show
     *
     * todo: come up with better name
     * @type {?}
     */
    Datatable2Component.prototype.displayRowSize;
    /**
     * Used for paging on lazy loading using infinite scroller to set initial fetch limit size
     *
     * todo: come up with better name !!!
     *
     * @type {?}
     */
    Datatable2Component.prototype.pageSize;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.dataSource;
    /**
     * Default message when there are no data .
     *
     * todo: Use i18n value and create resource file
     * @type {?}
     */
    Datatable2Component.prototype.emptyMessage;
    /**
     * Developer can provide custom trackBy function that will be used to iterate over the
     * records
     * @type {?}
     */
    Datatable2Component.prototype.rowTrackBy;
    /**
     * When true adds custom hovering class to the tbody
     * @type {?}
     */
    Datatable2Component.prototype.rowHover;
    /**
     * Do we show loading indicator
     *
     * Todo: rename to showLoading
     * @type {?}
     */
    Datatable2Component.prototype.loading;
    /**
     *
     * See AWDataTable
     *
     * @type {?}
     */
    Datatable2Component.prototype.selectionMode;
    /**
     *
     * Can provide custom icon. These icons are not animated divs, we used css
     * transformation to rotate them.
     *
     * @type {?}
     */
    Datatable2Component.prototype.loadingIcon;
    /**
     * Additional indent can be added when rendering detail row
     * @type {?}
     */
    Datatable2Component.prototype.indentDetailRow;
    /**
     * See AWDataTable
     *
     * @type {?}
     */
    Datatable2Component.prototype.indentationPerLevel;
    /**
     *
     *  SubHeader is used to show summary columns, which in our UX is shown at the top just under
     *  the regular table header
     *
     * @type {?}
     */
    Datatable2Component.prototype.showSubHeader;
    /**
     * See OutlineFor - only used in the tree mode
     * @type {?}
     */
    Datatable2Component.prototype.children;
    /**
     * We might have this conditional as this can be dynamic based on value, so the same
     * as children
     *
     * See OutlineFor - only used in the tree mode
     * @type {?}
     */
    Datatable2Component.prototype.showExpansionControl;
    /**
     * See OutlineFor - only used in the tree mode
     * @type {?}
     */
    Datatable2Component.prototype.expandAll;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.pushRootSectionOnNewLine;
    /**
     * Render or hide expansion control for row detail columns. Expansion control makes sense for
     * simple table, when using this inside outline (tree table), its driven by outline control
     * @type {?}
     */
    Datatable2Component.prototype.showRowDetailExpansionControl;
    /**
     * See AWDataTable
     *
     * @type {?}
     */
    Datatable2Component.prototype.showSelectionColumn;
    /**
     * See AWDataTable
     *
     * @type {?}
     */
    Datatable2Component.prototype.showSelectAll;
    /**
     * Show or hide global search term input field in the header
     * @type {?}
     */
    Datatable2Component.prototype.showGlobalSearch;
    /**
     * In case frozen column are using we can specify on global level total width of the table the
     * overflowing content or width for each column.
     * @type {?}
     */
    Datatable2Component.prototype.scrollWidth;
    /**
     * Enables or disables row reordering
     *
     * @type {?}
     */
    Datatable2Component.prototype.dndRowEnabled;
    /**
     *
     * Fires event that sorting is enabled for column and we trigger sorting
     *
     * @type {?}
     */
    Datatable2Component.prototype.onSort;
    /**
     * Based on selection mode it triggers even
     *
     * @type {?}
     */
    Datatable2Component.prototype.onRowClick;
    /**
     *
     * When multi or single selection mode is enabled it will trigger event when checkbox or
     * radio buttons is selected
     *
     * todo: implement SingleSelectionDTColumn, MultiSelectionDTColumn with their renderers
     * @type {?}
     */
    Datatable2Component.prototype.onRowSelectionChange;
    /**
     * When cell body selection changes we fire event
     *
     * @type {?}
     */
    Datatable2Component.prototype.onCellChange;
    /**
     * When cell header selection changes we fire event
     *
     * @type {?}
     */
    Datatable2Component.prototype.onHeaderSelection;
    /** @type {?} */
    Datatable2Component.prototype.header;
    /**
     * Defines custom template that can be implemented by application to show when there are
     * no data in the datable
     * @type {?}
     */
    Datatable2Component.prototype.emptyMessageTemplate;
    /**
     * See AWDataTable
     *
     * @type {?}
     */
    Datatable2Component.prototype.headerTemplate;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.subHeaderTemplate;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.bodyTemplate;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.headerFilterTemplate;
    /**
     * Collects used DTColumn inside datatable and then they are used inside the template to
     * iterate over and use its rendererTemplate.
     *
     * When we will be defining new columns its important that it can also match all the
     * inherited ones. so we need to make sure we define a provider those those columns to point
     * to the DTColumnComponent
     *
     * e.g.:
     *
     * {provide: DTColumnComponent, useExisting: forwardRef(() => DetailRowColumn)}
     *
     * @type {?}
     */
    Datatable2Component.prototype.colsQuery;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.rowDetailColumn;
    /**
     *
     * Triggers when items in the list are updated
     *
     * @type {?}
     */
    Datatable2Component.prototype.valueChange;
    /** @type {?} */
    Datatable2Component.prototype.classList;
    /**
     * Current dataset that is being rendered. Set from the [list] binding or by lazy load from
     * datasource
     * @type {?}
     */
    Datatable2Component.prototype.dataToRender;
    /**
     * We convert QueryList<DTColumn2Component> to this array for easier manipulation
     * @type {?}
     */
    Datatable2Component.prototype.columns;
    /**
     * This is secondary list of columns which is used in case we have have enabled
     * frozen columns. Columns that are marked as frozen needs to be placed into separate array
     * to be rendered way than regular columns which are stored in the columns array.
     * @type {?}
     */
    Datatable2Component.prototype.frozenColumns;
    /**
     *  Indicates that columns were initialed Also used when we hide and show column to trigger
     *  change.
     *
     * @type {?}
     */
    Datatable2Component.prototype.columnsChanged;
    /**
     *
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.sortColumn;
    /**
     * Reference to colsQuery and its changes so we can later on release the subscription
     * @type {?}
     */
    Datatable2Component.prototype.columnsSubscription;
    /** @type {?} */
    Datatable2Component.prototype.initialized;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.detailRowExpansionState;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.numberOfColsBeforeData;
    /**
     * See AWDataTable
     * @type {?}
     */
    Datatable2Component.prototype.startOfFirstDataColumn;
    /**
     * Section for programmatically instantiated columns that are added to the list if additional
     * span or logic is needed.
     *
     * To programmatically insert a new column into columns array like expando column for detail
     * row, or SingleSelect, MultiSelect column when selection is enabled we need to use
     * ComponentFactoryResolver to instantiate a new component.
     *
     * @type {?}
     */
    Datatable2Component.prototype.rowDetailExpandColumn;
    /** @type {?} */
    Datatable2Component.prototype.multiSelectColumn;
    /** @type {?} */
    Datatable2Component.prototype.singleSelectColumn;
    /** @type {?} */
    Datatable2Component.prototype.env;
    /** @type {?} */
    Datatable2Component.prototype.el;
    /** @type {?} */
    Datatable2Component.prototype._defaultDS;
    /** @type {?} */
    Datatable2Component.prototype.changeDetector;
    /** @type {?} */
    Datatable2Component.prototype.factoryResolver;
    /** @type {?} */
    Datatable2Component.prototype.outlineState;
    /** @type {?} */
    Datatable2Component.prototype.zone;
    /** @type {?} */
    Datatable2Component.prototype.injector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RhdGF0YWJsZTIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUE2QkEsT0FBTyxFQUlILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULHdCQUF3QixFQUN4QixZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUVULFdBQVcsRUFDWCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRWpFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUNILE1BQU0sRUFDTixjQUFjLEVBQ2QsV0FBVyxFQUNYLE1BQU0sRUFDTixTQUFTLEVBQ1QsT0FBTyxFQUNQLFNBQVMsRUFDVCxXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDakYsT0FBTyxFQUNILDRCQUE0QixFQUMvQixNQUFNLCtEQUErRCxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FB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QU1MLEtBQUs7c0JBUUwsS0FBSzs0QkFTTCxLQUFLOzBCQVNMLEtBQUs7OEJBT0wsS0FBSztrQ0FPTCxLQUFLOzRCQVNMLEtBQUs7dUJBTUwsS0FBSzttQ0FVTCxLQUFLO3dCQU1MLEtBQUs7dUNBTUwsS0FBSzs0Q0FRTCxLQUFLO2tDQU9MLEtBQUs7NEJBUUwsS0FBSzsrQkFPTCxLQUFLOzBCQVFMLEtBQUs7NEJBUUwsS0FBSztxQkFRTCxNQUFNO3lCQVFOLE1BQU07bUNBVU4sTUFBTTsyQkFRTixNQUFNO2dDQU9OLE1BQU07cUJBSU4sWUFBWSxTQUFDLGtCQUFrQjttQ0FRL0IsWUFBWSxTQUFDLGFBQWE7NkJBTzFCLFlBQVksU0FBQyxVQUFVO2dDQU12QixZQUFZLFNBQUMsYUFBYTsyQkFNMUIsWUFBWSxTQUFDLFFBQVE7bUNBT3JCLFlBQVksU0FBQyxjQUFjO3dCQWlCM0IsZUFBZSxTQUFDLGtCQUFrQjs4QkFPbEMsWUFBWSxTQUFDLG9CQUFvQjswQkFTakMsTUFBTTt3QkFJTixXQUFXLFNBQUMsT0FBTztvQkE4WG5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKiAgQG9yaWdpbmFsLWxpY2Vuc2VcbiAqICBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBQcmltZVRla1xuICpcbiAqICBDcmVkaXQ6IERlcml2ZWQgYW5kIGV4dGVuZGVkIGZyb20gUHJpbWUtbmcgZGF0YWJsZSB3aGVyZSB3ZSBuZWVkZWQgbW9yZSBtb2R1bGFyIHNvbHV0aW9uLlxuICogIFdlIHJldXNlZCB0aGUgY29yZSBzdHJ1Y3R1cmUgYW5kIGxheW91dCBidXQgaGFkIHRvIHJlZmFjdG9yIGJvdGggY29kZSBhbmQgdGVtcGxhdGUgdG8gbWF0Y2ggb3VyXG4gKiAgbmVlZHMuIE1vcmUgaW4gdGhlIGRlc2NyaXB0aW9uXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09iamVjdFV0aWxzfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvdXRpbHMvb2JqZWN0dXRpbHMnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtPdXRsaW5lU3RhdGV9IGZyb20gJy4uL291dGxpbmUvaW5kZXgnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgYXNzZXJ0LFxuICAgIEJvb2xlYW5XcmFwcGVyLFxuICAgIEVudmlyb25tZW50LFxuICAgIGVxdWFscyxcbiAgICBGaWVsZFBhdGgsXG4gICAgaXNCbGFuayxcbiAgICBpc1ByZXNlbnQsXG4gICAgTGlzdFdyYXBwZXJcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0FXRGF0YVRhYmxlLCBEcm9wUG9zaXRpb259IGZyb20gJy4vYXctZGF0YXRhYmxlJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi9kdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7RFRIZWFkZXJDb21wb25lbnQyfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7RFREZXRhaWxSb3dDb21wb25lbnR9IGZyb20gJy4vY29sdW1uL2RldGFpbC1yb3cvZHQtZGV0YWlsLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50XG59IGZyb20gJy4vY29sdW1uL2RldGFpbC1yb3ctZXhwYW5kZXIvZHQtZGV0YWlsLXJvdy1leHBhbmRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtEQVRBX1NPVVJDRX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtc291cmNlJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7RGF0YUZpbmRlcnMsIFF1ZXJ5VHlwZX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge0RhdGF0YWJsZTJTdGF0ZSwgRGV0YWlsUm93RXhwYW5zaW9uU3RhdGUsIERUMkRhdGFTb3VyY2V9IGZyb20gJy4vZGF0YXRhYmxlMi1kYXRhLXNvdXJjZSc7XG5pbXBvcnQge1xuICAgIERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnRcbn0gZnJvbSAnLi9jb2x1bW4vbXVsdGktc2VsZWN0L2R0LW11bHRpLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgRFRTaW5nbGVTZWxlY3RDb2x1bW5Db21wb25lbnRcbn0gZnJvbSAnLi9jb2x1bW4vc2luZ2xlLXNlbGVjdC9kdC1zaW5nbGUtc2VsZWN0LWNvbHVtbi5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCB0eXBlIFNlbGVjdGlvbk1vZGUgPSAnbXVsdGknIHwgJ3NpbmdsZScgfCAnY2VsbCcgfCAnbm9uZSc7XG5cbi8qKlxuICogRFQgY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyB0aGUgZGF0YSBncmlkIHRoYXQgc2hvd3MgdGFidWxhciBkYXRhLiBFdmVuIHRoZSBiYXNpY1xuICogc3RydWN0dXJlIGlzIGJhc2VkIG9uIFByaW1lTkcgZGF0YXRhYmxlIGl0cyBjb21wbGV0ZWx5IHJlZmFjdG9yZWQgaW50byBzbWFsbGVyIHBpZWNlcyB0aGF0XG4gKiBhbGxvd3MgbW9yZSBleHRlbnNpYmlsaXR5IGFuZCB0cnlpbmcgdG8gc3RheSBhcyBjbG9zZSBhcyBwb3NzaWJsZSB0byBleGlzdGluZyBBV0wgaW1wbGVtZW50YXRpb25cbiAqXG4gKiBUaGVyZSBhcmUgMyBtYWluIHBpZWNlczpcbiAqXG4gKiAgVGFibGUgV3JhcHBlciAtIGZvY3VzZXMgb24gdGhlIG91dGVyIHN0cnVjdHVyZS4gQ29udGFpbmVyIHdpdGggYmFzaWMgZGF0YWJsZSBsYXlvdXQgcGx1c1xuICogIGNvbnRhaW5zIGFueSBhZGRpdGlvbmFsIHBhbmVscyB0aGF0IGRhdGF0YWJsZSBuZWVkcyBzdWNoIGFzIG91ciBuZXcgY29uY2VwdCBob3cgZWRpdGluZyB3aWxsXG4gKiAgd29yayAtIHNsaWRpbmcgcGFuZWwgZnJvbSB0aGUgYm90dG9tXG4gKlxuICogIERhdGF0YWJsZSBDb2x1bW4gLSBJbnN0ZWFkIG9mIHJlbmRlcmluZyBldmVyeXRoaW5nIGluc2lkZSBEVCBJIHNwbGl0IHRoZSBwYXJ0IHRoYXQgcmVuZGVyc1xuICogIGNvbHVtbiBpbnRvIHNlcGFyYXRlIGNvbXBvbmVudC4gVGhpcyB3YXkgY29tcG9uZW50IGNvbHVtbiBoYXMgaXRzIG93biByZW5kZXJlciB0ZW1wbGF0ZSB3aGljaFxuICogIGNhbiByZW5kZXIgYm90aCBoZWFkZXIgYW5kIGRhdGEgY2VsbHMuXG4gKiAgTGF0ZXIgb24gRFRDb2x1bW4gaXMgdGhlbiBleHRlbmRlZCB0byBzdXBwb3J0IG90aGVyIGFkZGl0aW9uYWwgY29sdW1uIHR5cGVzXG4gKiAgU2luZ2xlU2VsZWN0aW9uQ29sdW1uLCBNdWx0aVNlbGVjdGlvbkNvbHVtbiwgYm90aCByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIHNlbGVjdGlvbiBjb250cm9scy5cbiAqXG4gKiBUbyBzdXBwb3J0IHBpdm90YWwgbGF5b3V0IHRoaXMgY2FuIGJlIGV4dGVuZGVkIGZvciBvdGhlciBhZGRpdGlvbmFsIGNvbHVtbnMgdGhhdCBpbXBsZW1lbnRzIHRoZWlyXG4gKiBvd24gcmVuZGVyaW5nIHRlbXBsYXRlc1xuICpcbiAqIERhdGF0YWJsZSAtIFRoZSBtYWluIGNvbXBvbmVudCB0aGF0IGlzIG9ubHkgZm9jdXMgb24gaGVhZGVyIGFuZCBib2R5IHJlbmRlcmluZyBhbmQgYmFzYWVkIG9uIHRoZVxuICogY29sdW1uIHR5cGUgaXQgd2lsbCByZW5kZXIgdGhlIGNvcnJlY3QgdGVtcGxhdGVcbiAqIGNvbHVtbiB0eXBlIGl0IHdpbGwgcmVuZGVyIHRoZSBjb3JyZWN0IHRlbXBsYXRlXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1kYXRhdGFibGUyJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS1cbiAgICBUaGlzIHRlbXBsYXRlIGZvY3VzIG9ubHkgb24gaGVhZGVyIGFuZCBib2R5IHJlbmRlcmluZy5cblxuICAgIFRoaXMgZGF0YXRhYmxlIGFsc28gc3VwcG9ydHMgZnJvemVuIGNvbHVtbiBhbmQgZm9yIHRoaXMgcmVuZGVyaW5nIGl0IGlzIHByZXR0eSBtdWNoIHRyYW5zcGFyZW50XG4gICAgYXMgaXQgcmVjZWl2ZWQgc2V0cyBvZiBjb2x1bW4gdGhhdCBpdCBuZWVkcyB0byByZW5kZXIgZnJvbSB0aGUgVGFibGVXcmFwcGVyLlxuXG4gICAgVGFibGVXcmFwcGVyIGluIGNhc2Ugb2YgZnJvemVuIGNvbHVtbnMgY2FsbHMgI2hlYWRlclJvd3MgYW5kICNib2R5Um93cyB0ZW1wbGF0ZXMgdHdpY2UgdG9cbiAgICByZW5kZXIgdG8gc2VwYXJhdGUgdGFibGVzIHdoZXJlIG9uZSBoYXMgZnJvemVuIGNvbHVtbnMgYW5kIGFub3RoZXIgb25lIGhhcyB0aGUgcmVzdCBhbmQgaXRzXG4gICAgc2Nyb2xsYWJsZVxuLS0+XG5cbjxhdy1kdC13cmFwcGVyICNkdFdyYXBwZXI+XG4gICAgPG5nLXRlbXBsYXRlICNoZWFkaW5nQXJlYT5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYXctZHQtaGVhZGVyMlwiPjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICNoZWFkZXJSb3dzIGxldC1jb2xzVG9SZW5kZXIgbGV0LWZyb3plblZpZXc9XCJmcm96ZW5Db2x1bW5zXCI+XG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyOyBjb250ZXh0OnskaW1wbGljaXQ6IGNvbHNUb1JlbmRlciwgZnJvemVuOmZyb3plblZpZXcgfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICNib2R5Um93cyBsZXQtY29sc1RvUmVuZGVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNPdXRsaW5lKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlPdXRsaW5lOyBjb250ZXh0OnskaW1wbGljaXQ6IGNvbHNUb1JlbmRlcn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpc091dGxpbmUoKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keVBsYWluOyBjb250ZXh0OnskaW1wbGljaXQ6IGNvbHNUb1JlbmRlcn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9hdy1kdC13cmFwcGVyPlxuXG5cbjwhLS1cbiAgICBFYWNoIHJlbmRlcmluZyBjb2x1bW4gaGFzIGl0cyBvd24gcmVuZGVyVGVtcGxhdGUgd2hpY2ggZGVmaW5lIGhvdyB0aGluZ3Mgc2hvdWxkIGJlIHJlbmRlci5cbiAgICBCYXNlZCBvbiBkaWZmZXJlbnQgY29sdW1uIHR5cGVzIHRoaXMgY29kZSBzaG91bGQgYmUgdHJhbnNwYXJlbnQgYXMgd2UgZG9udCBjYXJlIG9uIHRoaXNcbiAgICBsZXZlbCB3aGF0IGtpbmQgb2YgY29sdW1uIHdlIGFyZSByZW5kZXJpbmcuXG5cbiAgICBMYXRlciBvbiB3aGVuIHdlIHdpbGwgc3VwcG9ydCBzaW5nbGUvbXVsdGkgc2VsZWN0aW9uLCB0aGlzIHdpbGwgYmUganVzdCBhbm90aGVyIGNvbHVtbiBleHRlbmRpbmdcbiAgICBEVENvbHVtbiBhbmQgcHJvdmlkaW5nIGl0cyBvd24gdGVtcGxhdGVcblxuICAgIFdlIHBhc3MgaW50byB0aGlzIHRlbXBsYXRlIGlmIHdlIGFyZSByZW5kZXJpbmcgaGVhZGVyLCBzdWJIZWFkZXIsIG9yIGRhdGFcbi0tPlxuPG5nLXRlbXBsYXRlICNoZWFkZXIgbGV0LWNvbHNUb1JlbmRlciBsZXQtZnJvemVuPVwiZnJvemVuXCI+XG4gICAgPHRyPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNvbCBbbmdGb3JPZl09XCJjb2xzVG9SZW5kZXJcIiBsZXQtbGFzdENvbD1cImxhc3RcIlxuICAgICAgICAgICAgICAgICAgICAgbGV0LWNvbHVtbkluZGV4PVwiaW5kZXhcIj5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5yZW5kZXJlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6eyRpbXBsaWNpdDogdHJ1ZSwgaXNTdWJIZWFkZXI6ZmFsc2UsXG4gICAgICAgICAgICAgICAgY29sdW1uSW5kZXg6KGZyb3plbiA/IGNvbHVtbkluZGV4OiAoY29sdW1ucy5sZW5ndGggKyBjb2x1bW5JbmRleCkpfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC90cj5cblxuICAgIDx0ciAqbmdJZj1cInNob3dTdWJIZWFkZXJcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jb2wgW25nRm9yT2ZdPVwiY29sc1RvUmVuZGVyXCIgbGV0LWxhc3RDb2w9XCJsYXN0XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLnJlbmRlcmVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgY29udGV4dDp7JGltcGxpY2l0OiB0cnVlLCBpc1N1YkhlYWRlcjp0cnVlfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC90cj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNib2R5UGxhaW4gbGV0LWNvbHNUb1JlbmRlcj5cblxuICAgIDx0Ym9keSBbbmdDbGFzc109XCJ7J2R0LWNvbnRlbnQgZHQtZGF0YS1jZWxscyAnOiB0cnVlLCAnZHQtaXMtaG92ZXJhYmxlLXJvdyc6IHJvd0hvdmVyfVwiPlxuXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3dEYXRhIFtuZ0Zvck9mXT1cImRhdGFUb1JlbmRlclwiIGxldC1ldmVuPVwiZXZlblwiIGxldC1vZGQ9XCJvZGRcIlxuICAgICAgICAgICAgICAgICBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0ZvclRyYWNrQnldPVwicm93VHJhY2tCeVwiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyb3dUZW1wbGF0ZTsgY29udGV4dDp7JGltcGxpY2l0OiByb3dEYXRhLCBldmVuOmV2ZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZGQ6b2RkLCByb3dJbmRleDpyb3dJbmRleCwgY29sc1RvUmVuZGVyOmNvbHNUb1JlbmRlcn1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cInNob3dEZXRhaWxDb2x1bW4ocm93RGF0YSlcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyb3dEZXRhaWxDb2x1bW4ucmVuZGVyZXJUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDp7JGltcGxpY2l0OiBmYWxzZSwgZGF0YTpyb3dEYXRhLCByb3dJbmRleDoocm93SW5kZXgpfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJub0RhdGFcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L3Rib2R5PlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI2JvZHlPdXRsaW5lIGxldC1jb2xzVG9SZW5kZXI+XG4gICAgPHRib2R5ICNvdXRsaW5lRm9yIGF3T3V0bGluZUZvciBbbGlzdF09XCJkYXRhVG9SZW5kZXJcIlxuICAgICAgICAgICBbY29udGV4dF09XCJjb250ZXh0XCJcbiAgICAgICAgICAgW2luZGVudGF0aW9uUGVyTGV2ZWxdPVwiaW5kZW50YXRpb25QZXJMZXZlbFwiXG4gICAgICAgICAgIFtwdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmVdPVwicHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lXCJcbiAgICAgICAgICAgW2NoaWxkcmVuXT1cImNoaWxkcmVuXCIgW2V4cGFuZEFsbF09XCJleHBhbmRBbGxcIlxuICAgICAgICAgICBbc3RhdGVdPVwib3V0bGluZVN0YXRlXCJcbiAgICAgICAgICAgW25nQ2xhc3NdPVwieydkdC1jb250ZW50IGR0LWRhdGEtY2VsbHMgJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdkdC1pcy1ob3ZlcmFibGUtcm93Jzogcm93SG92ZXJ9XCJcbiAgICAgICAgICAgKG9uRXhwYW5kQ2hhbmdlKT1cIm9uT3V0bGluZUV4cGFuZENoYW5nZSgkZXZlbnQpXCI+XG5cbiAgICA8bmctdGVtcGxhdGUgI291dGxpbmUgbGV0LXJvd0RhdGEgbGV0LW5lc3RpbmdMZXZlbD1cIm5lc3RpbmdMZXZlbFwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyb3dUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDp7JGltcGxpY2l0OiByb3dEYXRhLCBuZXN0aW5nTGV2ZWw6bmVzdGluZ0xldmVsLCBjb2xzVG9SZW5kZXI6Y29sc1RvUmVuZGVyfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwic2hvd0RldGFpbENvbHVtbihyb3dEYXRhKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJvd0RldGFpbENvbHVtbi5yZW5kZXJlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IGZhbHNlLCBkYXRhOnJvd0RhdGEsIHJvd0luZGV4Oihyb3dJbmRleCl9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5vRGF0YVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvdGJvZHk+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tXG4gICAgRGVmYXVsdCB0ZW1wbGF0ZSB0aGF0IGlzIGRpc3BsYXkgd2hlbiB0aGVyZSBhcmUgbm8gZGF0YVxuLS0+XG48bmctdGVtcGxhdGUgI25vRGF0YT5cbiAgICA8dHIgKm5nSWY9XCJpc0VtcHR5KClcIiBjbGFzcz1cIiBkdC1lbXB0eW1lc3NhZ2Utcm93XCJcbiAgICAgICAgW3N0eWxlLnZpc2liaWxpdHldPVwibG9hZGluZyA/ICdoaWRkZW4nIDogJ3Zpc2libGUnXCI+XG5cbiAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwidmlzaWJsZUNvbHVtbnMoKS5sZW5ndGhcIiBjbGFzcz1cImR0LWVtcHR5bWVzc2FnZVwiPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZW1wdHlNZXNzYWdlVGVtcGxhdGVcIj57e2VtcHR5TWVzc2FnZX19PC9zcGFuPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS1cbiAgICBUZW1wbGF0ZSB0aGF0IHJlbmRlcnMgYWN0dWFsIHJvdy4gUmVuZGVycyBib3RoIGhlYWRlciBhbmQgYm9keSBjb2x1bW4uIEVhY2ggcmVuZGVyZWRcbiAgICBjb2x1bW4gaGFzIGl0cyBvd24gdGVtcGxhdGUgY2FsbGVkIHJlbmRlcmVyVGVtcGxhdGUgdGhhdCBoYXMgYWxsIHRoaW5ncyB0aGF0IG5lZWRzIHRvIGJlXG4gICAgcmVuZGVyZWQgYW5kIHdlIGp1c3QgdGVsbCB0aGUgdGVtcGxhdGUgaWYgd2UgYXJlIHJlbmRlcmluZyBoZWFkZXIsIHN1YmhlYWRlciBvciBib2R5XG4tLT5cbjxuZy10ZW1wbGF0ZSAjcm93VGVtcGxhdGUgbGV0LXJvd0RhdGEgbGV0LWV2ZW49XCJldmVudFwiIGxldC1vZGQ9XCJvZGRcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiXG4gICAgICAgICAgICAgbGV0LW5lc3RpbmdMZXZlbD1cIm5lc3RpbmdMZXZlbFwiIGxldC1jb2xzVG9SZW5kZXI9XCJjb2xzVG9SZW5kZXJcIj5cblxuXG4gICAgPHRyICNyb3dFbGVtZW50IGR0RHJhZ2dhYmxlUm93IFtkbmRSb3dJbmRleF09XCJyb3dJbmRleFwiXG4gICAgICAgIGNsYXNzPVwiZHQtYm9keS1yb3dcIlxuICAgICAgICAoY2xpY2spPVwib25IYW5kbGVSb3dDbGlja2VkKCRldmVudCwgcm93RGF0YSlcIlxuICAgICAgICBbYXR0ci5uZXN0aW5nTGV2ZWxdPVwibmVzdGluZ0xldmVsXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydkdC1ldmVuLXJvdyc6IGV2ZW4sICdkdC1vZGQtcm93Jzogb2RkLFxuICAgICAgICAgICAgJ2R0LXJvdy1zZWxlY3RlZCc6IGlzUm93U2VsZWN0ZWQocm93RGF0YSksXG4gICAgICAgICAgICAnZHQtcm93LWRyYWdnYWJsZSc6IGRuZFJvd0VuYWJsZWQsXG4gICAgICAgICAgICAnZHQtcm9vdC1zZWN0aW9uJzogbmVzdGluZ0xldmVsID09PSAwIH1cIj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNvbCBbbmdGb3JPZl09XCJjb2xzVG9SZW5kZXJcIiBsZXQtY29sSW5kZXg9XCJpbmRleFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5yZW5kZXJlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IGZhbHNlLCBkYXRhOnJvd0RhdGEsIHJvd0luZGV4OnJvd0luZGV4LFxuICAgICAgICAgICAgICAgICAgICBuZXN0aW5nTGV2ZWw6bmVzdGluZ0xldmVsfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC90cj5cbjwvbmctdGVtcGxhdGU+XG5cblxuYCxcbiAgICBzdHlsZXM6IFtgLnctZGF0YXRhYmxle3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS53LWRhdGF0YWJsZSB0YWJsZXtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7d2lkdGg6MTAwJTt0YWJsZS1sYXlvdXQ6Zml4ZWR9LnctZGF0YXRhYmxlIHRib2R5LC53LWRhdGF0YWJsZSB0ZCwudy1kYXRhdGFibGUgdGh7b3V0bGluZTowfS5kdC1jZWxsLWRlZiwuZHQtY2VsbC1kZWYtc2VsZWN0YWJsZXtib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50O3BhZGRpbmc6MTdweCAxNnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uZHQtY2VsbC1kZWYtc2VsZWN0YWJsZXtjdXJzb3I6cG9pbnRlcjt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfXRoIC5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2JvcmRlci13aWR0aDo0cHggMXB4IDFweDtwYWRkaW5nOjE0cHggMTZweCAxN3B4fXRkIC5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2JvcmRlci13aWR0aDowIDFweCAwIDVweDtwYWRkaW5nOjE3cHggMTZweCAxN3B4IDEzcHh9LmR0LWRhdGEtY2VsbHMgdHIuZHQtaXMtaGlnaGxpZ2h0LC5kdC1kYXRhLWNlbGxzIHRyLmR0LWlzLWhvdmVye2JvcmRlci1jb2xvcjppbmhlcml0O2ZvbnQtd2VpZ2h0OmluaGVyaXQ7Y3Vyc29yOnBvaW50ZXJ9LnctZGF0YXRhYmxlLXJ0bHtkaXJlY3Rpb246cnRsfS53LWRhdGF0YWJsZS1ydGwudy1kYXRhdGFibGUtcnRsLnctZGF0YXRhYmxlIHRoZWFkIHRoe3RleHQtYWxpZ246cmlnaHR9LmR0LXJvb3Qtc2VjdGlvbiAuZHQtY2VsbC1kZWYsLmR0LXJvb3Qtc2VjdGlvbiAuZHQtY2VsbC1kZWYtc2VsZWN0YWJsZXtiYWNrZ3JvdW5kLWNvbG9yOiNmM2Y2Zjg7cGFkZGluZzoxMHB4IDE2cHg7Ym9yZGVyLWJvdHRvbS1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnR9LmR0LXBsYWluLWxheW91dCAuZHQtaXMtYWN0aXZlLC5kdC1wbGFpbi1sYXlvdXQgLmR0LWlzLWRlZmF1bHQsLmR0LXBsYWluLWxheW91dCAuZHQtaXMtaGlnaGxpZ2h0LC5kdC1wbGFpbi1sYXlvdXQgLmR0LWlzLWhvdmVyLC5kdC1wbGFpbi1sYXlvdXQgLmR0LWlzLWhvdmVyYWJsZS1yb3d7Ym9yZGVyLXJpZ2h0LWNvbG9yOnRyYW5zcGFyZW50fS5kdC1pcy1hY3RpdmUsLmR0LWlzLWRlZmF1bHQsLmR0LWlzLWhpZ2hsaWdodCwuZHQtaXMtaG92ZXIsLmR0LWlzLWhvdmVyYWJsZS1yb3d7Ym9yZGVyOjFweCBzb2xpZCAjZDdkN2Q3O2JhY2tncm91bmQtY29sb3I6I2ZmZjtjb2xvcjojMzYzNjM2fS5kdC1yb3ctc2VsZWN0ZWQgdGR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIzOCwyNTUsMjM4LC43MSl9LmR0LWlzLWFjdGl2ZXtib3JkZXItY29sb3I6IzA2NWQ5Yztjb2xvcjojMTk5ZGUwfS5kdC1pcy1oaWdobGlnaHR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDY1LDExNyw1LC4xOCl9LmR0LWlzLWhpZGRlbntkaXNwbGF5Om5vbmV9LmR0LXUtdW5zZWxlY3RhYmxlLXRleHR7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstby11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmR0LXUtc29ydGFibGV7Y3Vyc29yOnBvaW50ZXJ9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE9iamVjdFV0aWxzLFxuICAgICAgICBPdXRsaW5lU3RhdGUsXG4gICAgICAgIHtwcm92aWRlOiBEQVRBX1NPVVJDRSwgdXNlQ2xhc3M6IERUMkRhdGFTb3VyY2UsIGRlcHM6IFtEYXRhUHJvdmlkZXJzLCBEYXRhRmluZGVyc119LFxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxuXG59KVxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZTJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQVdEYXRhVGFibGUsIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiAgTGlzdCBvZiBpdGVtcyB0byBzaG93IGluIHRoZSBkYXRhdGFibGUuXG4gICAgICpcbiAgICAgKiAgdG9kbzogaW1wbGVtZW50IHRoZSBzYW1lIERhdGFzb3VyY2UgYW5kIGxhenkgbG9hZGluZyBqdXN0IGxpa2UgSSBkaWQgaXQgZm9yIGRhdGF0YWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGlzdDogYW55W107XG5cbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBlbnRpdHkgZm9yIHdoaWNoIERhdGFQcm92aWRlciB3aWxsIGJlIGxvYWRlZC4gWW91IGNhbiBlaXRoZXIgcGFzcyBsaXN0IG9mIGl0ZW1zXG4gICAgICogb3IgdXNlIHRoaXMgZGVzdGluYXRpb25DbGFzcy4gTm90IGJvdGhcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRlc3RpbmF0aW9uQ2xhc3M6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBieSBUYWJsZVdyYXBwZXIgdG8gYWRkIHVzZXIgZGVmaW5lZCBjbGFzIGludG8gdGhlIHRhYmxlIHRhZ1xuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0YWJsZVN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNlZSBoZWFkZXJUZW1wbGF0ZSBmb3IgbW9yZSBkZXRhaWxzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib2R5Q2xhc3NGbjogKGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpID0+IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpc1Jvd1NlbGVjdGFibGU6IChpdGVtOiBhbnkpID0+IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqICBIaWRlcyBvciBzaG93cyB0YWJsZSBoZWFkaW5nIHdoZXJlIHdlIGhhdmUgZmlsdGVycyBhbmQgdG9vbHMgbWVudXNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dUYWJsZUhlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwaXZvdGFsTGF5b3V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29udGV4dDogYW55O1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbml0aWFsU29ydE9yZGVyOiBzdHJpbmcgPSAnZGVzY2VuZGluZyc7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluaXRpYWxTb3J0S2V5OiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gRFQgaXMgbG9hZGVkIGluIHRoZSBwYWdlIGFuZCB3ZSBhcmUgbm90IGluIHRoZSBmdWxsIHNjcmVlbiAoZnVsbCBwYWdlIG1vZGUpLCB0aGlzXG4gICAgICogaXMgaHRlIG51bWJlciBvZiBsaW5lcyB0aGF0IERUIHdpbGwgc2hvd1xuICAgICAqXG4gICAgICogdG9kbzogY29tZSB1cCB3aXRoIGJldHRlciBuYW1lXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5Um93U2l6ZTogbnVtYmVyID0gMTA7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIHBhZ2luZyBvbiBsYXp5IGxvYWRpbmcgdXNpbmcgaW5maW5pdGUgc2Nyb2xsZXIgdG8gc2V0IGluaXRpYWwgZmV0Y2ggbGltaXQgc2l6ZVxuICAgICAqXG4gICAgICogdG9kbzogY29tZSB1cCB3aXRoIGJldHRlciBuYW1lICEhIVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwYWdlU2l6ZTogbnVtYmVyID0gMTU7XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGF0YVNvdXJjZTogRFQyRGF0YVNvdXJjZTtcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgbWVzc2FnZSB3aGVuIHRoZXJlIGFyZSBubyBkYXRhIC5cbiAgICAgKlxuICAgICAqIHRvZG86IFVzZSBpMThuIHZhbHVlIGFuZCBjcmVhdGUgcmVzb3VyY2UgZmlsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZW1wdHlNZXNzYWdlOiBzdHJpbmcgPSAnTm8gcmVjb3JkcyBmb3VuZCc7XG5cblxuICAgIC8qKlxuICAgICAqIERldmVsb3BlciBjYW4gcHJvdmlkZSBjdXN0b20gdHJhY2tCeSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBpdGVyYXRlIG92ZXIgdGhlXG4gICAgICogcmVjb3Jkc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcm93VHJhY2tCeTogKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gYW55O1xuXG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlIGFkZHMgY3VzdG9tIGhvdmVyaW5nIGNsYXNzIHRvIHRoZSB0Ym9keVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcm93SG92ZXI6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBEbyB3ZSBzaG93IGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgICpcbiAgICAgKiBUb2RvOiByZW5hbWUgdG8gc2hvd0xvYWRpbmdcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxvYWRpbmc6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGlvbk1vZGU6IFNlbGVjdGlvbk1vZGUgPSAnbm9uZSc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENhbiBwcm92aWRlIGN1c3RvbSBpY29uLiBUaGVzZSBpY29ucyBhcmUgbm90IGFuaW1hdGVkIGRpdnMsIHdlIHVzZWQgY3NzXG4gICAgICogdHJhbnNmb3JtYXRpb24gdG8gcm90YXRlIHRoZW0uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxvYWRpbmdJY29uOiBzdHJpbmcgPSAnaWNvbi1zeW5jaHJvbml6ZSc7XG5cblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgaW5kZW50IGNhbiBiZSBhZGRlZCB3aGVuIHJlbmRlcmluZyBkZXRhaWwgcm93XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbmRlbnREZXRhaWxSb3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbmRlbnRhdGlvblBlckxldmVsOiBudW1iZXIgPSAyNTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIFN1YkhlYWRlciBpcyB1c2VkIHRvIHNob3cgc3VtbWFyeSBjb2x1bW5zLCB3aGljaCBpbiBvdXIgVVggaXMgc2hvd24gYXQgdGhlIHRvcCBqdXN0IHVuZGVyXG4gICAgICogIHRoZSByZWd1bGFyIHRhYmxlIGhlYWRlclxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93U3ViSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgT3V0bGluZUZvciAtIG9ubHkgdXNlZCBpbiB0aGUgdHJlZSBtb2RlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjaGlsZHJlbjogKHZhbHVlOiBhbnkpID0+IGFueVtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBXZSBtaWdodCBoYXZlIHRoaXMgY29uZGl0aW9uYWwgYXMgdGhpcyBjYW4gYmUgZHluYW1pYyBiYXNlZCBvbiB2YWx1ZSwgc28gdGhlIHNhbWVcbiAgICAgKiBhcyBjaGlsZHJlblxuICAgICAqXG4gICAgICogU2VlIE91dGxpbmVGb3IgLSBvbmx5IHVzZWQgaW4gdGhlIHRyZWUgbW9kZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0V4cGFuc2lvbkNvbnRyb2w6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTZWUgT3V0bGluZUZvciAtIG9ubHkgdXNlZCBpbiB0aGUgdHJlZSBtb2RlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBleHBhbmRBbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogUmVuZGVyIG9yIGhpZGUgZXhwYW5zaW9uIGNvbnRyb2wgZm9yIHJvdyBkZXRhaWwgY29sdW1ucy4gRXhwYW5zaW9uIGNvbnRyb2wgbWFrZXMgc2Vuc2UgZm9yXG4gICAgICogc2ltcGxlIHRhYmxlLCB3aGVuIHVzaW5nIHRoaXMgaW5zaWRlIG91dGxpbmUgKHRyZWUgdGFibGUpLCBpdHMgZHJpdmVuIGJ5IG91dGxpbmUgY29udHJvbFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1Jvd0RldGFpbEV4cGFuc2lvbkNvbnRyb2w6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dTZWxlY3Rpb25Db2x1bW46IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1NlbGVjdEFsbDogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIFNob3cgb3IgaGlkZSBnbG9iYWwgc2VhcmNoIHRlcm0gaW5wdXQgZmllbGQgaW4gdGhlIGhlYWRlclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0dsb2JhbFNlYXJjaDogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIEluIGNhc2UgZnJvemVuIGNvbHVtbiBhcmUgdXNpbmcgd2UgY2FuIHNwZWNpZnkgb24gZ2xvYmFsIGxldmVsIHRvdGFsIHdpZHRoIG9mIHRoZSB0YWJsZSB0aGVcbiAgICAgKiBvdmVyZmxvd2luZyBjb250ZW50IG9yIHdpZHRoIGZvciBlYWNoIGNvbHVtbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNjcm9sbFdpZHRoOiBhbnk7XG5cblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgcm93IHJlb3JkZXJpbmdcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZG5kUm93RW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGaXJlcyBldmVudCB0aGF0IHNvcnRpbmcgaXMgZW5hYmxlZCBmb3IgY29sdW1uIGFuZCB3ZSB0cmlnZ2VyIHNvcnRpbmdcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEJhc2VkIG9uIHNlbGVjdGlvbiBtb2RlIGl0IHRyaWdnZXJzIGV2ZW5cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIG11bHRpIG9yIHNpbmdsZSBzZWxlY3Rpb24gbW9kZSBpcyBlbmFibGVkIGl0IHdpbGwgdHJpZ2dlciBldmVudCB3aGVuIGNoZWNrYm94IG9yXG4gICAgICogcmFkaW8gYnV0dG9ucyBpcyBzZWxlY3RlZFxuICAgICAqXG4gICAgICogdG9kbzogaW1wbGVtZW50IFNpbmdsZVNlbGVjdGlvbkRUQ29sdW1uLCBNdWx0aVNlbGVjdGlvbkRUQ29sdW1uIHdpdGggdGhlaXIgcmVuZGVyZXJzXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25Sb3dTZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGNlbGwgYm9keSBzZWxlY3Rpb24gY2hhbmdlcyB3ZSBmaXJlIGV2ZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNlbGxDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBjZWxsIGhlYWRlciBzZWxlY3Rpb24gY2hhbmdlcyB3ZSBmaXJlIGV2ZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkhlYWRlclNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIEBDb250ZW50Q2hpbGQoRFRIZWFkZXJDb21wb25lbnQyKVxuICAgIGhlYWRlcjogRFRIZWFkZXJDb21wb25lbnQyO1xuXG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGN1c3RvbSB0ZW1wbGF0ZSB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBieSBhcHBsaWNhdGlvbiB0byBzaG93IHdoZW4gdGhlcmUgYXJlXG4gICAgICogbm8gZGF0YSBpbiB0aGUgZGF0YWJsZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ25vRGF0YVRlbXBsJylcbiAgICBlbXB0eU1lc3NhZ2VUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZHRIZWFkZXInKVxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZHRTdWJIZWFkZXInKVxuICAgIHN1YkhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZHRCb2R5JylcbiAgICBib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlckZpbHRlcicpXG4gICAgaGVhZGVyRmlsdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3RzIHVzZWQgRFRDb2x1bW4gaW5zaWRlIGRhdGF0YWJsZSBhbmQgdGhlbiB0aGV5IGFyZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUgdG9cbiAgICAgKiBpdGVyYXRlIG92ZXIgYW5kIHVzZSBpdHMgcmVuZGVyZXJUZW1wbGF0ZS5cbiAgICAgKlxuICAgICAqIFdoZW4gd2Ugd2lsbCBiZSBkZWZpbmluZyBuZXcgY29sdW1ucyBpdHMgaW1wb3J0YW50IHRoYXQgaXQgY2FuIGFsc28gbWF0Y2ggYWxsIHRoZVxuICAgICAqIGluaGVyaXRlZCBvbmVzLiBzbyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSBkZWZpbmUgYSBwcm92aWRlciB0aG9zZSB0aG9zZSBjb2x1bW5zIHRvIHBvaW50XG4gICAgICogdG8gdGhlIERUQ29sdW1uQ29tcG9uZW50XG4gICAgICpcbiAgICAgKiBlLmcuOlxuICAgICAqXG4gICAgICoge3Byb3ZpZGU6IERUQ29sdW1uQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZXRhaWxSb3dDb2x1bW4pfVxuICAgICAqXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihEVENvbHVtbjJDb21wb25lbnQpXG4gICAgY29sc1F1ZXJ5OiBRdWVyeUxpc3Q8RFRDb2x1bW4yQ29tcG9uZW50PjtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChEVERldGFpbFJvd0NvbXBvbmVudClcbiAgICByb3dEZXRhaWxDb2x1bW46IERURGV0YWlsUm93Q29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRyaWdnZXJzIHdoZW4gaXRlbXMgaW4gdGhlIGxpc3QgYXJlIHVwZGF0ZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gICAgY2xhc3NMaXN0OiBzdHJpbmcgPSAndy1kYXRhdGFibGUgJztcblxuXG4gICAgLyoqXG4gICAgICogRm9yIGludGVybmFsIHVzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBkYXRhc2V0IHRoYXQgaXMgYmVpbmcgcmVuZGVyZWQuIFNldCBmcm9tIHRoZSBbbGlzdF0gYmluZGluZyBvciBieSBsYXp5IGxvYWQgZnJvbVxuICAgICAqIGRhdGFzb3VyY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YVRvUmVuZGVyOiBhbnlbXTtcblxuICAgIC8qKlxuICAgICAqIFdlIGNvbnZlcnQgUXVlcnlMaXN0PERUQ29sdW1uMkNvbXBvbmVudD4gdG8gdGhpcyBhcnJheSBmb3IgZWFzaWVyIG1hbmlwdWxhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBjb2x1bW5zOiBEVENvbHVtbjJDb21wb25lbnRbXTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBzZWNvbmRhcnkgbGlzdCBvZiBjb2x1bW5zIHdoaWNoIGlzIHVzZWQgaW4gY2FzZSB3ZSBoYXZlIGhhdmUgZW5hYmxlZFxuICAgICAqIGZyb3plbiBjb2x1bW5zLiBDb2x1bW5zIHRoYXQgYXJlIG1hcmtlZCBhcyBmcm96ZW4gbmVlZHMgdG8gYmUgcGxhY2VkIGludG8gc2VwYXJhdGUgYXJyYXlcbiAgICAgKiB0byBiZSByZW5kZXJlZCB3YXkgdGhhbiByZWd1bGFyIGNvbHVtbnMgd2hpY2ggYXJlIHN0b3JlZCBpbiB0aGUgY29sdW1ucyBhcnJheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZnJvemVuQ29sdW1uczogRFRDb2x1bW4yQ29tcG9uZW50W107XG5cblxuICAgIC8qKlxuICAgICAqICBJbmRpY2F0ZXMgdGhhdCBjb2x1bW5zIHdlcmUgaW5pdGlhbGVkIEFsc28gdXNlZCB3aGVuIHdlIGhpZGUgYW5kIHNob3cgY29sdW1uIHRvIHRyaWdnZXJcbiAgICAgKiAgY2hhbmdlLlxuICAgICAqXG4gICAgICovXG4gICAgcHVibGljIGNvbHVtbnNDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIHB1YmxpYyBzb3J0Q29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBjb2xzUXVlcnkgYW5kIGl0cyBjaGFuZ2VzIHNvIHdlIGNhbiBsYXRlciBvbiByZWxlYXNlIHRoZSBzdWJzY3JpcHRpb25cbiAgICAgKi9cbiAgICBjb2x1bW5zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIGRldGFpbFJvd0V4cGFuc2lvblN0YXRlOiBEZXRhaWxSb3dFeHBhbnNpb25TdGF0ZTtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgbnVtYmVyT2ZDb2xzQmVmb3JlRGF0YTogbnVtYmVyID0gMDtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgc3RhcnRPZkZpcnN0RGF0YUNvbHVtbjogbnVtYmVyID0gMDtcblxuXG4gICAgLyoqXG4gICAgICogU2VjdGlvbiBmb3IgcHJvZ3JhbW1hdGljYWxseSBpbnN0YW50aWF0ZWQgY29sdW1ucyB0aGF0IGFyZSBhZGRlZCB0byB0aGUgbGlzdCBpZiBhZGRpdGlvbmFsXG4gICAgICogc3BhbiBvciBsb2dpYyBpcyBuZWVkZWQuXG4gICAgICpcbiAgICAgKiBUbyBwcm9ncmFtbWF0aWNhbGx5IGluc2VydCBhIG5ldyBjb2x1bW4gaW50byBjb2x1bW5zIGFycmF5IGxpa2UgZXhwYW5kbyBjb2x1bW4gZm9yIGRldGFpbFxuICAgICAqIHJvdywgb3IgU2luZ2xlU2VsZWN0LCBNdWx0aVNlbGVjdCBjb2x1bW4gd2hlbiBzZWxlY3Rpb24gaXMgZW5hYmxlZCB3ZSBuZWVkIHRvIHVzZVxuICAgICAqIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB0byBpbnN0YW50aWF0ZSBhIG5ldyBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJvd0RldGFpbEV4cGFuZENvbHVtbjogRFREZXRhaWxSb3dFeHBhbmRlckNvbXBvbmVudDtcbiAgICBwcml2YXRlIG11bHRpU2VsZWN0Q29sdW1uOiBEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50O1xuICAgIHByaXZhdGUgc2luZ2xlU2VsZWN0Q29sdW1uOiBEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJbiBjYXNlIG9mIG91dGxpbmUgdGFibGUgd2UgYXJlIGluamVjdCBPdXRsaW5lU3RhdGUgd2hpY2ggaXMgcHJvdmlkZWQgaW4gdGhlIERUIGNvbXBvbmVudFxuICAgICAqIGRlZmluaXRpb24uIFRoaXMgaXMgdXNlZCBieSBuZXN0ZWQgb3V0bGluZUZvciBjb21wb25lbnQgaXQgc2V0IGl0c2VsZiBhcyByZWZlcmVuY2UgYW5kXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgc3RhdGUgc28gaXQgY2FuIGJlIHVzZWQgbGF0ZXIgb24gaW5zaWRlIE91dGxpbmVDb250cm9sXG4gICAgICpcbiAgICAgKlxuICAgICAqIEVhY2ggRGF0YXRhYmxlIGlzIHByZS1kZWZhdWx0ZWQgd2l0aCBpdHMgb3duIHZlcnNpb24gb2YgRGF0YVNvdXJjZSBzbyBhbGwgdGhlIG9ic2VydmVyc1xuICAgICAqIGluc2lkZSBhcmUgdW5pcXVlIGZvciB0aGlzIGNvbXBvbmVudFxuICAgICAqXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBASW5qZWN0KERBVEFfU09VUkNFKSBwcml2YXRlIF9kZWZhdWx0RFM6IERUMkRhdGFTb3VyY2UsXG4gICAgICAgICAgICAgICAgcHVibGljIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwdWJsaWMgZmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHVibGljIG91dGxpbmVTdGF0ZTogT3V0bGluZVN0YXRlLFxuICAgICAgICAgICAgICAgIHB1YmxpYyB6b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLl9kZWZhdWx0RFM7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxpc3QpICYmIGlzUHJlc2VudCh0aGlzLmRlc3RpbmF0aW9uQ2xhc3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgdXNlIGJvdGggYmluZGluZ3MgW2xpc3RdIGFuZCBbZGVzdGluYXRpb25DbGFzc10hJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZSA9IG5ldyBEZXRhaWxSb3dFeHBhbnNpb25TdGF0ZSh0aGlzKTtcblxuICAgICAgICAvLyBpbml0IGRlZmF1bHQgY29sdW1uc1xuICAgICAgICB0aGlzLnJvd0RldGFpbEV4cGFuZENvbHVtbiA9IHRoaXMuZmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRFREZXRhaWxSb3dFeHBhbmRlckNvbXBvbmVudCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpLmluc3RhbmNlO1xuXG5cbiAgICAgICAgdGhpcy5tdWx0aVNlbGVjdENvbHVtbiA9IHRoaXMuZmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRFRNdWx0aVNlbGVjdENvbHVtbkNvbXBvbmVudCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpLmluc3RhbmNlO1xuXG4gICAgICAgIHRoaXMuc2luZ2xlU2VsZWN0Q29sdW1uID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpLmluc3RhbmNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGUgZGF0YSBhcmUgbm90IGRlZmVycmVkIGFuZCB3ZSBnZXQgbGlzdCBkaXJlY3RseSB0aGVuIGl0IGNyZWF0ZXMgRFMuIElmXG4gICAgICAgICAqIG5nT25DaGFuZ2VzIGlzIGNhbGxlZCBmaXJzdCB3ZSBwcm9wZXJseSBpbml0IERTIGFuZCBjbGVhbiB0aGlzLmxpc3RcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kZXN0aW5hdGlvbkNsYXNzKSB8fCBpc1ByZXNlbnQodGhpcy5saXN0KSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RGF0YXNvdXJjZSgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhU291cmNlLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhc291cmNlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNpbmNlIHdlIHdvcmsgd2l0aCByZWZlcmVuY2VzIGxldCdzIHBhc3MgY3JlYXRlZCBtYXAgaW5zaWRlIG91ciBzdGF0ZVxuICAgICAgICB0aGlzLm91dGxpbmVTdGF0ZS5leHBhbnNpb25TdGF0ZXMgPSB0aGlzLnN0YXRlLm91dGxpbmVTdGF0ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gZGF0YSBhcnJpdmVzIGxhdGVyIG1heWJlIGR1ZSB0byBSRVNUIEFQSSBsYXRlbmN5LCBpbml0aWFsaXplIERTIG9ubHkgd2hlbiB3ZSBoYXZlIGFcbiAgICAgKiBkYXRhLCBvdGhlcndpc2UgaWYgZGF0YSBjaGFuZ2VkIHRocnUgdGhlIGJpbmRpbmdzIGp1c3QgdHJpZ2dlciBkYXRhQ2hhbmdlIGV2ZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuXG4gICAgICAgIGlmIChjaGFuZ2VzWydsaXN0J10gJiYgaXNQcmVzZW50KGNoYW5nZXNbJ2xpc3QnXS5jdXJyZW50VmFsdWUpXG4gICAgICAgICAgICAmJiAhdGhpcy5kYXRhU291cmNlLmluaXRpYWxpemVkKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGFzb3VyY2UoKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVNvdXJjZS5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KHRoaXMubGlzdCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgaW5pdCBhIHN0YXRlIHdoZW4gZGV0YWlsIGNvbHVtbiBpcyBwcmVzZW50XG4gICAgICAgIC8vIHRvZG86IG1vdmUgdGhpcyBpbml0aWFsaXphdGlvbiB0byBkYXRhc291cmNlXG4gICAgICAgIHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCA9IGlzUHJlc2VudCh0aGlzLnJvd0RldGFpbENvbHVtbik7XG5cbiAgICAgICAgdGhpcy5pbml0Q29sdW1ucygpO1xuICAgICAgICB0aGlzLmNvbHVtbnNTdWJzY3JpcHRpb24gPSB0aGlzLmNvbHNRdWVyeS5jaGFuZ2VzLnN1YnNjcmliZShfID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdENvbHVtbnMoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gYXNzaWduIGl0IHByb2dyYW1hdGljYWxseSBhcyB3ZSB3YW50IHRvIGhhdmUgYSBjb250ZXh0IGZvciB0aGUgZmlsdGVyXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5yb3dEZXRhaWxDb2x1bW4pICYmIGlzUHJlc2VudCh0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvci5maWx0ZXJPdXQgPSB0aGlzLnNraXBPdXRsaW5lSXRlbS5iaW5kKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yKSkge1xuICAgICAgICAgICAgLy8gdGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvci5jaGFuZ2VEZXRlY3Rvci5kZXRhY2goKTtcbiAgICAgICAgICAgIC8vIHRoaXMub3V0bGluZVN0YXRlLm91dGxpbmVGb3IuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zQ2hhbmdlZCAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNGcm96ZW5Db2x1bW5zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZnJvemVuQ29sdW1ucy5mb3JFYWNoKChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgICAgICAgICBjb2wucG9zdEluaXRpYWxpemUoaW5kZXgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgICAgICAgICBjb2wucG9zdEluaXRpYWxpemUoaW5kZXgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEtleSBlbnRyeSBtZXRob2QgdGhhdCBpbml0aWFsaXplZCBvdXIgY29sdW1ucy4gTGF0ZXIgb24gd2hlbiB3ZSB3aWxsIHN1cHBvcnQgc2VsZWN0aW9uIGFuZFxuICAgICAqIG11bHRpc2VsZWN0aW9uIHdlIHdpbGwgcHJvZ3JhbW1hdGljYWxseSBpbnN0YW50aWF0ZSBTaW5nbGVTZWxlY3Rpb24sIE11bHRpU2VsZWN0aW9uIGNvbHVtblxuICAgICAqIGNvbXBvbmVudHMgYW5kIGFkZCB0aGVtIHRvIHRoZSBsaXN0IHNvIHRoZXkgY2FuIGJlIHJlbmRlcmVkLlxuICAgICAqXG4gICAgICogc28gdGhlIGlkZWEgaGVyZSBpczpcbiAgICAgKlxuICAgICAqIFdoZW4gRFQgY29tcG9uZW50IGluaXRpYWxpemUgYW5kIHdlIGFyZSBpbiBlZGl0aW5nIG1vZGUgYW5kIHdlIHN1cHBvcnQgU2luZ2xlL011bHRpIHNlbGVjdGlvblxuICAgICAqIHdlIHdpbGwgdXNlIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB0byBjcmVhdGUgY29tcG9uZW50IGFuZCBhZGQgaXQgYXMgZmlyc3QgaXRlbSB0byB0aGUgbGlzdFxuICAgICAqIGFuZCB0aGVuIGl0IHdpbGwgYmUgcmVuZGVyZWQganVzdCBsaWtlIGFueXRoaWduIGVsc2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0Q29sdW1ucygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgICAgIHRoaXMuZnJvemVuQ29sdW1ucyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLmRldGFpbEV4cGFuc2lvbkVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERldGFpbENvbHVtbkV4cGFuc2lvbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aScpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKHRoaXMubXVsdGlTZWxlY3RDb2x1bW4pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKHRoaXMuc2luZ2xlU2VsZWN0Q29sdW1uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgZXhwYW5zaW9uIGNvbHVtbiB3aGVuIGRldGFpbCByb3cgaXMgZW5hYmxlZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCAmJiAhdGhpcy5pc091dGxpbmUoKSkge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2godGhpcy5yb3dEZXRhaWxFeHBhbmRDb2x1bW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2xzUXVlcnlcbiAgICAgICAgICAgIC5maWx0ZXIoKGNvbDE6IERUQ29sdW1uMkNvbXBvbmVudCkgPT4gIWNvbDEuZnJvemVuKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29sLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goY29sKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5pbml0RnJvemVuQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmluaXRDb2x1bW5JbmZvKCk7XG4gICAgICAgIHRoaXMuY29sdW1uc0NoYW5nZWQgPSB0cnVlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgc3VyZSB0aGF0IHdlIGFsc28gaW5jbHVkZSBwcm9ncmFtbWF0aWMgY29sdW1uIGlmIHByZXNlbnQuIE1vdmUgdGhlbSB0byB0aGUgY29ycmVjdFxuICAgICAqIGFycmF5XG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRGcm96ZW5Db2x1bW5zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbHNRdWVyeVxuICAgICAgICAgICAgLmZpbHRlcigoY29sMTogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiBjb2wxLmZyb3plbilcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbC5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuQ29sdW1ucy5wdXNoKGNvbCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmZyb3plbkNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gZmluZCBsYXN0IGluZGV4IG9mIGNvbHVtbiB0aGF0IGlzIGludGVybmFsIC8gcHJvZ3JhbW1hdGljXG5cbiAgICAgICAgICAgIGxldCBsYXN0SW54ID0gdGhpcy5jb2x1bW5zLnNsaWNlKClcbiAgICAgICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAgICAgLmZpbmRJbmRleCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQpID0+IHRoaXMuaXNJbnRlcm5hbENvbHVtbihjb2wpKTtcblxuICAgICAgICAgICAgaWYgKGxhc3RJbnggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMuY29sdW1ucy5sZW5ndGggLSAxIC0gbGFzdElueDtcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJuYWxDb2xzID0gdGhpcy5jb2x1bW5zLnNwbGljZSgwLCBpZHggKyAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkNvbHVtbnMgPSBbLi4uaW50ZXJuYWxDb2xzLCAuLi50aGlzLmZyb3plbkNvbHVtbnNdO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBoYXNWYWxpZENvbHMgPSB0aGlzLmNvbHVtbnNcbiAgICAgICAgICAgICAgICAuZmluZEluZGV4KChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCkgPT4gaXNCbGFuayhjb2wud2lkdGgpKSA9PT0gLTE7XG5cbiAgICAgICAgICAgIGFzc2VydChoYXNWYWxpZENvbHMgfHwgaXNQcmVzZW50KHRoaXMuc2Nyb2xsV2lkdGgpLFxuICAgICAgICAgICAgICAgICdXaGVuIHVzaW5nIFtmcm96ZW5dIGJpbmRpbmcgeW91IG5lZWQgc3BlY2lmeSBbd2lkdGhdIGZvciBlYWNoICcgK1xuICAgICAgICAgICAgICAgICdjb2x1bW4gb3IgW3Njcm9sbFdpZHRoXSBvbiBkYXRhdGFibGUhJyk7XG5cblxuICAgICAgICAgICAgYXNzZXJ0KGlzQmxhbmsodGhpcy5yb3dEZXRhaWxDb2x1bW4pLFxuICAgICAgICAgICAgICAgICdZb3UgY2Fubm90IGNvbWJpbmUgYXctZHQtZGV0YWlsLWNvbHVtbiB3aXRoIGZyb3plbiBjb2x1bW5zIScpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBjdXJyZW50IGNvbHVtbiBpcyBwcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGlzSW50ZXJuYWxDb2x1bW4oY29sOiBEVENvbHVtbjJDb21wb25lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGNvbCBpbnN0YW5jZW9mIERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50IHx8XG4gICAgICAgICAgICBjb2wgaW5zdGFuY2VvZiBEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50IHx8XG4gICAgICAgICAgICBjb2wgaW5zdGFuY2VvZiBEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBEYXRhc291cmNlIGJhc2VkIG9uIHBhc3NlZCB2YWx1ZXMuIEl0IHRyaWVzIHRvIGluaXRpYWxpemUgRFMgZm9yIGZpcnN0IHRpbWVcbiAgICAgKiBpbnNpZGUgdGhlIG5nSW5pdCBidXQgaW4gY2FzZSBEYXRhIGFycml2ZXMgbGF0ZXIgbWF5YmUgZHVlIHRvIHNvbWUgUkVTVCBBUEkgY2FsbHMgdGhpc1xuICAgICAqIGNhbiBiZSB0cmlnZ2VyZWQgYWxzbyBmcm9tIG5nT25DaGFuZ2VzLlxuICAgICAqXG4gICAgICovXG4gICAgaW5pdERhdGFzb3VyY2UoaW5pdGlhbGl6ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBEYXRhdGFibGUyU3RhdGUuY3JlYXRlKDAsIHRoaXMucGFnZVNpemUsIHRoaXMuZGlzcGxheVJvd1NpemUsXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsU29ydEtleSwgdGhpcy5zb3J0T3JkZXJpbmdGb3JTdHJpbmcodGhpcy5pbml0aWFsU29ydE9yZGVyKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmxpbWl0ID0gdGhpcy5zdGF0ZS5kaXNwbGF5TGltaXQgPSB0aGlzLmRpc3BsYXlSb3dTaXplO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmluaXRpYWxTb3J0S2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc29ydEtleSA9IHRoaXMuaW5pdGlhbFNvcnRLZXk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zb3J0T3JkZXIgPSB0aGlzLnNvcnRPcmRlcmluZ0ZvclN0cmluZyh0aGlzLmluaXRpYWxTb3J0T3JkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluaXRpYWxpemUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5pbml0KHtcbiAgICAgICAgICAgICAgICBvYmo6IGlzUHJlc2VudCh0aGlzLmRlc3RpbmF0aW9uQ2xhc3MpID8gdGhpcy5kZXN0aW5hdGlvbkNsYXNzIDogdGhpcy5saXN0LFxuICAgICAgICAgICAgICAgIHF1ZXJ5VHlwZTogUXVlcnlUeXBlLkZ1bGxUZXh0LFxuICAgICAgICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmZldGNoKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIC8vIHJlc2V0IGxpc3QgdG8gbWFrZSBzdXJlIGl0IGNvbWVzIGZyb20gRGF0YVByb3ZpZGVyLCB3ZSB1c2UgbGlzdCAgdG8gaW5pdGlhbGl6ZVxuICAgICAgICB0aGlzLmxpc3QgPSBudWxsO1xuXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIEVOVFJZIHBvaW50IGZvciB0aGUgREFUQSBDSEFOR0VTLiBBbGwgYWRkaXRpb24sIGVkaXRzLCBkZWxldGlvbiBlbmRzIHVwXG4gICAgICAgIC8vIGhlcmUuIFdlIGRvbnQgd29yayBkaXJlY3RseSB3aXRoIExJU1QuIEFueSBjaGFuZ2UgaXMgcmVhY3RpdmUgYW5kIGhlcmUgaXMgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLm9wZW4oKS5zdWJzY3JpYmUoKGRhdGE6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gZGV0YWlsUm93IGNvbHVtbiBpcyBwcmVzZW50IHdlIGluaXRpYWxpemUgYSBzdGF0ZSBob2xkaW5nIGluZm9ybWF0aW9uIHdoaWNoIGl0ZW0gaXNcbiAgICAgKiBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIHRvZG86IFRoaXMgaXMgdGVtcG9yYXJ5IGhlcmUgYW5kIG9uY2Ugd2Ugc3Vwb3J0IGxhenkgbG9hZGluZyBtb3ZlIHRoaXMgdG8gZGF0YXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEZvciBleGFtcGxlIGZvciBvdXRsaW5lIHRyZWUgdGFibGUgd2UgbmVlZCB0byBjb25uZWN0IGEgc3RhdGUgZnJvbSBvdXRsaW5lIHdpdGggYSBzdGF0ZSBpblxuICAgICAqIGhlcmUgYXMgd2UgYXJlIHVzaW5nIG91dGxpbmUgY29udHJvbCB0byBleHBhbmQgYW5kIGNvbGxhcHNlIGl0ZW1zXG4gICAgICovXG4gICAgaW5pdERldGFpbENvbHVtbkV4cGFuc2lvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5kZXRhaWxFeHBhbnNpb25FbmFibGVkID0gaXNQcmVzZW50KHRoaXMucm93RGV0YWlsQ29sdW1uKSAmJlxuICAgICAgICAgICAgQm9vbGVhbldyYXBwZXIuaXNUcnVlKHRoaXMuc2hvd1Jvd0RldGFpbEV4cGFuc2lvbkNvbnRyb2wpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgZXhlY3V0ZWQgYWZ0ZXIgd2UgaW5pdGlhbGl6ZSBhbGwgdGhlIGNvbHVtbnMgaW4gb3JkZXIgdG8gY2FsY3VsYXRlIGNvcnJlY3RcbiAgICAgKiBudW1iZXJzIHVzZWQgZm9yIGluZGVudGF0aW9uIHdoaWxlIHJlbmRlcmluZyBzZWxlY3Rpb24gY29sdW1ucyBhcyB3ZWxsIGFzIGRldGFpbCByb3cgY29sdW1ucy5cbiAgICAgKlxuICAgICAqIEhlcmUgd2UgbmVlZCB0byBiZSBhd2FyZSBob3cgbWFueSBjb2x1bW5zIHRvIHNwYW5cbiAgICAgKlxuICAgICAqL1xuICAgIGluaXRDb2x1bW5JbmZvKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm51bWJlck9mQ29sc0JlZm9yZURhdGEgPSAwO1xuXG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb2wuaXNWYWx1ZUNvbHVtbigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJPZkNvbHNCZWZvcmVEYXRhKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmluZGVudERldGFpbFJvdykge1xuICAgICAgICAgICAgdGhpcy5udW1iZXJPZkNvbHNCZWZvcmVEYXRhKys7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXJ0T2ZGaXJzdERhdGFDb2x1bW4gPSB0aGlzLmNvbHVtbnMubGVuZ3RoIC0gdGhpcy5udW1iZXJPZkNvbHNCZWZvcmVEYXRhO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgc3RhdGUgb3V0IHRvIGFwcGxpY2F0aW9uLiBDYW4gYmUgdXNlIGFzIHR3byB3YXkgYmluZGluZ3NcbiAgICAgKlxuICAgICAqIFsoc3RhdGUpXT1kdFN0YXRlKHMpXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGF0ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU291cmNlLnN0YXRlO1xuICAgIH1cblxuICAgIHNldCBzdGF0ZSh2YWw6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUgPSB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNlbGxTZWxlY3Rpb25DaGFuZ2UoY2VsbDogYW55LCBjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgIT09ICdjZWxsJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsb29rdXBLZXkgPSB7XG4gICAgICAgICAgICBjb2w6IGNvbHVtbi5rZXkgfHwgY29sdW1uLmxhYmVsLFxuICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9O1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc3RhdGUuc2VsZWN0aW9uKSAmJiB0aGlzLnN0YXRlLnNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGxldCBmb3VuZEluZGV4ID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgbG9va3VwS2V5KTtcbiAgICAgICAgICAgIGxldCBpc1NlbGVjdGVkID0gZm91bmRJbmRleCAhPT0gLTE7XG5cbiAgICAgICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh2YWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gaW5kZXggIT09IGZvdW5kSW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFsuLi50aGlzLnN0YXRlLnNlbGVjdGlvbiwgbG9va3VwS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gW2xvb2t1cEtleV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNlbGxDaGFuZ2UuZW1pdCh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uSGVhZGVyU2VsZWN0aW9uQ2hhbmdlKGNlbGw6IGFueSwgY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSGVhZGVyU2VsZWN0ZWQoY29sdW1uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24gPSBjb2x1bW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbiA9IGNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uSGVhZGVyU2VsZWN0aW9uLmVtaXQodGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIG9uSGFuZGxlUm93Q2xpY2tlZChldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgLy8gc3BlY2lhbCBhbHQga2V5IG1vZGlmaWVyLiBXaGVuIHVzZWQgd2l0aCByb3dzIGl0IGluZGljYXRlcyB0aGVyZSBpcyBhIEQmRCBlbmFibGVkXG4gICAgICAgIGlmIChldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aScpIHtcbiAgICAgICAgICAgIHRoaXMub25Sb3dUb2dnbGUoZXZlbnQsIGl0ZW0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5vblJvd1NlbGVjdChldmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25Sb3dUb2dnbGUoZXZlbnQ6IGFueSwgaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCByb3dTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdGF0ZS5zZWxlY3Rpb24pICYmIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBmb3VuZEluZGV4ID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgaXRlbSk7XG4gICAgICAgICAgICBsZXQgaXNTZWxlY3RlZCA9IGZvdW5kSW5kZXggIT09IC0xO1xuXG4gICAgICAgICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodmFsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGluZGV4ICE9PSBmb3VuZEluZGV4KTtcblxuICAgICAgICAgICAgICAgIHJvd1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gWy4uLnRoaXMuc3RhdGUuc2VsZWN0aW9uLCBpdGVtXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZm9yIHRoZSBvdXRsaW5lIGdvIHVwIGFuZCBkb3duIHRoZSBzeW5jIHdpdGggdHJlZWl0ZW1zXG4gICAgICAgICAgICBpZiAodGhpcy5pc091dGxpbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbihpdGVtLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9QYXJlbnQoaXRlbSwgaXNTZWxlY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFtpdGVtXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oaXRlbSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMub0hhbmRsZU91dGxpbmVSb3dUb2dnbGVUb1BhcmVudChpdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUm93U2VsZWN0aW9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgaXNTZWxlY3RlZDogcm93U2VsZWN0ZWQsXG4gICAgICAgICAgICBpdGVtOiB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICB9KTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uUm93U2VsZWN0KGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IGl0ZW07XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMub25Sb3dTZWxlY3Rpb25DaGFuZ2UuZW1pdChpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oY3VycmVudEl0ZW06IGFueSwgaXNTZWxlY3RlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBsZXQgY2hpbGRyZW5Gb3JOb2RlID0gdGhpcy5jaGlsZHJlbi5hcHBseSh0aGlzLmNvbnRleHQsIFtjdXJyZW50SXRlbV0pIHx8IFtdO1xuXG4gICAgICAgIGlmIChjaGlsZHJlbkZvck5vZGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgaXMgc2VsZWN0ZWQgY3VycmVudGx5IHRoZW4gdG9nZ2xlIHRvIG90aGVyIHN0YXRlXG4gICAgICAgICAgICBpZiAoIWlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyB3aGVuIGNoZWNraW5nIGFsbCBmcm9tIHJvb3QsIGRlc2VsZWN0IGNoaWxkcmVuIGFuZCBhZGQgYWxsXG4gICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuKGN1cnJlbnRJdGVtLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFsuLi50aGlzLnN0YXRlLnNlbGVjdGlvbiwgLi4uY2hpbGRyZW5Gb3JOb2RlXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZWFjaCBjaGlsZFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuRm9yTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm91bmRJbmRleCA9IExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodmFsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGluZGV4ICE9PSBmb3VuZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHRoZSBzYW1lIGZvciBjaGlsZHJlbiBvZiBjaGlsZHJlblxuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW5Gb3JOb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuKGNoaWxkLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb0hhbmRsZU91dGxpbmVSb3dUb2dnbGVUb1BhcmVudChjdXJyZW50SXRlbTogYW55LCBpc1NlbGVjdGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBjdXJyZW50SXRlbS4kJHBhcmVudEl0ZW07XG4gICAgICAgIGlmIChpc1ByZXNlbnQocGFyZW50KSkge1xuICAgICAgICAgICAgbGV0IGNoaWxkcmVuRm9yTm9kZSA9IHRoaXMuY2hpbGRyZW4uYXBwbHkodGhpcy5jb250ZXh0LCBbcGFyZW50XSkgfHwgW107XG5cbiAgICAgICAgICAgIGxldCBhbGxTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbkZvck5vZGUpIHtcbiAgICAgICAgICAgICAgICBhbGxTZWxlY3RlZCA9IExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGNoaWxkKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICAgJiYgYWxsU2VsZWN0ZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChhbGxTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghYWxsU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudEluZGV4ID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBpbmRleCAhPT0gcGFyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub0hhbmRsZU91dGxpbmVSb3dUb2dnbGVUb1BhcmVudChjdXJyZW50SXRlbS4kJHBhcmVudEl0ZW0sIGlzU2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkRuRFJvd0Ryb3Aob3JpZ1BvczogbnVtYmVyLCBuZXdQb3M6IG51bWJlciwgZHJvcFBvczogRHJvcFBvc2l0aW9uKTogdm9pZCB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kYXRhU291cmNlKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Ryb3BwaW5nIHJvdyAjOiAnLCBvcmlnUG9zICsgJyAnICsgZHJvcFBvcyArICcgcm93ICM6ICcgKyBuZXdQb3MpO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnJlb3JkZXJSb3dzKG9yaWdQb3MsIG5ld1BvcywgZHJvcFBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25PdXRsaW5lRXhwYW5kQ2hhbmdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBldmVudC5pdGVtO1xuXG4gICAgICAgIC8vIFdlIGRvbnQgcmVhbGx5IG5lZWQgdG8gc3RvcmUgYSBzdGF0ZSBmb3JtIG91dGxpbmUgbG9jYWxseSBhcyB3ZSBhcmUgdXNpbmcgdGhlIHNhbWUgb2JqZWN0XG4gICAgICAgIC8vIHJlZmVyZW5jZVxuICAgICAgICAvLyB0aGlzLnN0YXRlLm91dGxpbmVTdGF0ZSA9IHRoaXMub3V0bGluZVN0YXRlLmV4cGFuc2lvblN0YXRlcztcblxuICAgICAgICBpZiAodGhpcy5jYW5Vc2VGb3JEZXRhaWxSb3coaXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUudG9nZ2xlKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgc29ydFNpbmdsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxpc3QpICYmIGlzUHJlc2VudCh0aGlzLnNvcnRDb2x1bW4pKSB7XG5cbiAgICAgICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5zb3J0Q29sdW1uLmtleSksICdJbnZhbGlkIGNvbHVtbiB0byBzb3J0Jyk7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCh0aGlzLnNvcnRDb2x1bW4ua2V5LCB0aGlzLnNvcnRDb2x1bW4uc29ydE9yZGVyKTtcblxuICAgICAgICAgICAgdGhpcy5vblNvcnQuZW1pdCh7XG4gICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMuc29ydENvbHVtbi5rZXksXG4gICAgICAgICAgICAgICAgb3JkZXI6IHRoaXMuc29ydENvbHVtbi5zb3J0T3JkZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYW5kbGVEYXRhQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zb3J0S2V5IHx8IHRoaXMuc29ydENvbHVtbikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNvcnRDb2x1bW4gJiYgdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0Q29sdW1uID0gdGhpcy5jb2x1bW5zLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIGNvbCA9PiBjb2wua2V5ID09PSB0aGlzLnN0YXRlLnNvcnRLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIoKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMubGlzdCk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YVRvUmVuZGVyKGRhdGFzb3VyY2U/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhVG9SZW5kZXIgPSBkYXRhc291cmNlIHx8IHRoaXMubGlzdDtcbiAgICAgICAgLy8gdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBjdXJyZW50IGltbXV0YWJsZSBsaXN0IGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24uIE5lZWQgdG8gd3JhcCBpdCB3aXRoXG4gICAgICogc2V0VGltZW91dCBhcyB0aGUgY2hhbmdlIGNhbiBlYXNpbHkgY29tZSBhZnRlciB2aWV3IGNoZWNrZWQgYW5kIHRoaXMgd291bGQgcmVzdWx0IHNvbWUgZXJyb3JzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUxpc3QobmV3TGlzdDogYW55W10pOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBuZXdMaXN0O1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVEYXRhQ2hhbmdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnNvcnRDb2x1bW4gPSBudWxsO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGFUb1JlbmRlcigpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgaXNIZWFkZXJTZWxlY3RlZChpdGVtOiBEVENvbHVtbjJDb21wb25lbnQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29sTWF0Y2hlZCA9IGl0ZW0ua2V5IHx8IGl0ZW0ubGFiZWw7XG4gICAgICAgIGxldCBjdXJyZW50Q29sID0gdGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24ua2V5IHx8IHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uLmxhYmVsO1xuICAgICAgICByZXR1cm4gY29sTWF0Y2hlZCA9PT0gY3VycmVudENvbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaXNCb2R5Q2VsbFNlbGVjdGVkKGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGxvb2t1cEtleSA9IHtcbiAgICAgICAgICAgIGNvbDogY29sdW1uLmtleSB8fCBjb2x1bW4ubGFiZWwsXG4gICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5zdGF0ZS5zZWxlY3Rpb24pICYmXG4gICAgICAgICAgICBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBsb29rdXBLZXkpICE9PSAtMTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGlzUm93U2VsZWN0ZWQoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKSAmJiBpc1ByZXNlbnQodGhpcy5zdGF0ZS5zZWxlY3Rpb24pKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgaXRlbSkgIT09IC0xO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXF1YWxzKHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERvIHdlIGhhdmUgZGF0YSB0byByZW5kZXIgVXNlZCBpbnNpZGUgdGVtcGxhdGUgdG8gdGVsbCBpZiB3ZSBzaG91bGQgdXNlIHRoZSBOb0RhdGEgdGVtcGxhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiBpc0JsYW5rKHRoaXMuZGF0YVRvUmVuZGVyKSB8fCAodGhpcy5kYXRhVG9SZW5kZXIubGVuZ3RoID09PSAwKTtcbiAgICB9XG5cblxuICAgIGhhc0Zyb3plbkNvbHVtbnMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5mcm96ZW5Db2x1bW5zKSAmJiB0aGlzLmZyb3plbkNvbHVtbnMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBoYXNJbnZpc2libGVTZWxlY3Rpb25Db2x1bW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKSAmJiAhdGhpcy5zaG93U2VsZWN0aW9uQ29sdW1uO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgIT09ICdub25lJyAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgIT09ICdjZWxsJztcbiAgICB9XG5cblxuICAgIHZpc2libGVDb2x1bW5zKCk6IERUQ29sdW1uMkNvbXBvbmVudFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1ucyA/IHRoaXMuY29sdW1ucy5maWx0ZXIoYyA9PiBjLmlzVmlzaWJsZSkgOiBbXTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgc29ydE9yZGVyaW5nRm9yU3RyaW5nKGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoZGlyZWN0aW9uKSB8fCBkaXJlY3Rpb24gPT09ICdhc2NlbmRpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKGRpcmVjdGlvbikgfHwgZGlyZWN0aW9uID09PSAnZGVzY2VuZGluZycpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0b2RvOiBsb2cgYmFkIGtleVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG5cblxuICAgIHNvcnRPcmRlcmluZ0Zvck51bWJlcihkaXJlY3Rpb246IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmIChpc0JsYW5rKGRpcmVjdGlvbikgfHwgZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2FzY2VuZGluZyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayhkaXJlY3Rpb24pIHx8IGRpcmVjdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiAnZGVzY2VuZGluZyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdG9kbzogbG9nIGJhZCBrZXlcbiAgICAgICAgcmV0dXJuICdhc2NlbmRpbmcnO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICB0b2dnbGVBbGxDb2x1bW5zKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtcyA9IHRoaXMuZGF0YVRvUmVuZGVyIHx8IFtdO1xuICAgICAgICBsZXQgc2VsZWN0ZWRPYmplY3QgPSB0aGlzLnN0YXRlLnNlbGVjdGlvbiB8fCBbXTtcbiAgICAgICAgaWYgKHNlbGVjdGVkT2JqZWN0Lmxlbmd0aCA+PSBjdXJyZW50SXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gWy4uLmN1cnJlbnRJdGVtc107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaXNUb2dnbGVBbGxDb2x1bW5TZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtcyA9IHRoaXMuZGF0YVRvUmVuZGVyIHx8IFtdO1xuICAgICAgICBsZXQgc2VsZWN0ZWRPYmplY3QgPSB0aGlzLnN0YXRlLnNlbGVjdGlvbiB8fCBbXTtcblxuICAgICAgICByZXR1cm4gY3VycmVudEl0ZW1zLmxlbmd0aCA+IDAgJiYgc2VsZWN0ZWRPYmplY3QubGVuZ3RoID49IGN1cnJlbnRJdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNUb2dnbGVBbGxDb2x1bW5EaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtcyA9IHRoaXMuZGF0YVRvUmVuZGVyIHx8IFtdO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50SXRlbXMubGVuZ3RoID09PSAwO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VkIGJ5IHRlbXBsYXRlIHRvIGRlY2lkZSBpZiB3ZSBuZWVkIHRvIHJlbmRlciBEZXRhaWxSb3cgdGVtcGxhdGUuIFdlIG5lZWQgdG8gaGF2ZVxuICAgICAqIERldGFpbFJvdyBDb250ZW50Q2hpbGQgYW5kIHVzaW5nIERldGFpbFJvdyBjb21wb25lbnQgW2lzVmlzaWJsZUZuXSBmdW5jdGlvbiBiaW5kaW5nIHdlXG4gICAgICogY2hlY2sgaWYgdGhlIGl0ZW0gdGhhdCBpcyBhYm91dCB0byBiZSByZW5kZXJlZCBpcyBlbGlnaWJsZSBmb3IgZGV0YWlsIHJvd1xuICAgICAqXG4gICAgICovXG4gICAgc2hvd0RldGFpbENvbHVtbihpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuVXNlRm9yRGV0YWlsUm93KGl0ZW0pICYmIHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuaXNFeHBhbmRlZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuVXNlRm9yRGV0YWlsUm93KGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMucm93RGV0YWlsQ29sdW1uKSAmJlxuICAgICAgICAgICAgKDxEVERldGFpbFJvd0NvbXBvbmVudD50aGlzLnJvd0RldGFpbENvbHVtbikuc2hvd0RldGFpbFJvdyhpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaXNPdXRsaW5lKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuY2hpbGRyZW4pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIGRlYWxpbmcgd2l0aCBkZXRhaWwgY29sdW1uIChkZXRhaWwgcm93KSBhbmQgb3V0bGluZSBhbGwgdG9nZXRoZXIgd2UgbmVlZCBoYXZlIGFcbiAgICAgKiBtZWNoYW5pc20gdG8gdGVsbCB0byB0aGUgb3V0bGluZSBcImRvbid0IHJlbmRlciB0aGUgbmV4dCBsZXZlbCBvZiBpdGVtc1wiIGFuZCB1c2UgZGV0YWlsIHJvdy5cbiAgICAgKiBTbyBjZXJ0YWluIGl0ZW0gdHlwZSBuZWVkcyB0byBiZSBza2lwcGVkLlxuICAgICAqXG4gICAgICogVGhlIHdheSB3ZSBza2lwIHRob3NlIGl0ZW0gaXMgd2UgdXNlIGlzVmlzaWJsZUZuIGNvbmRpdGlvbiBvZiB0aGUgZGV0YWlsIHJvdyBhbmQgbG9vayBhaGVhZFxuICAgICAqIGlmIHdlIHNob3VsZCBza2lwIG5leHQgbGV2ZWwuXG4gICAgICpcbiAgICAgKi9cbiAgICBza2lwT3V0bGluZUl0ZW0oaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhblVzZUZvckRldGFpbFJvdyhpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGdldFZhbHVlKGRhdGE6IGFueSwgZmllbGQ6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiBGaWVsZFBhdGguZ2V0RmllbGRWYWx1ZShkYXRhLCBmaWVsZCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuIl19