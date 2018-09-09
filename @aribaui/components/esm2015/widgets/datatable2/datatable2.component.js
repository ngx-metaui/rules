/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Inject, Injector, Input, NgZone, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import { isOutlineNode, OutlineState } from '../outline/index';
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
/** @typedef {?} */
var SelectionMode;
export { SelectionMode };
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
         *
         * See OutlineFor  - format - only used in the tree mode
         */
        this.outlineFormat = 'free';
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
            this.multiSelectColumn.initialize(this);
            this.columns.push(this.multiSelectColumn);
        }
        else if (this.hasLeadingSelectColumn() && this.selectionMode === 'single') {
            this.singleSelectColumn.initialize(this);
            this.columns.push(this.singleSelectColumn);
        }
        /**
                 * Add expansion column when detail row is enabled
                 */
        if (this.detailRowExpansionState.detailExpansionEnabled && !this.isOutline()) {
            this.rowDetailExpandColumn.initialize(this);
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
            /** @type {?} */
            let qType = (this.isOutline() && this.outlineFormat === 'tree') ?
                QueryType.FullTextOutline : QueryType.FullText;
            this.dataSource.init({
                obj: isPresent(this.destinationClass) ? this.destinationClass : this.list,
                queryType: qType,
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
        if (isPresent(this.rowDetailColumn)) {
            this.rowDetailColumn.initialize(this);
        }
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
        /** @type {?} */
        let lookupKey = {
            col: column.key || column.label,
            item: item
        };
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {
            /** @type {?} */
            let foundIndex = ListWrapper.findIndexComplex(this.state.selection, lookupKey);
            /** @type {?} */
            let isSelected = foundIndex !== -1;
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
        /** @type {?} */
        let rowSelected = true;
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {
            /** @type {?} */
            let foundIndex = ListWrapper.findIndexComplex(this.state.selection, item);
            /** @type {?} */
            let isSelected = foundIndex !== -1;
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
        /** @type {?} */
        let childrenForNode = this.children.apply(this.context, [currentItem]) || [];
        if (childrenForNode.length > 0) {
            // If is selected currently then toggle to other state
            if (!isSelected) {
                // when checking all from root, deselect children and add all
                this.onHandleOutlineRowToggleToChildren(currentItem, true);
                this.state.selection = [...this.state.selection, ...childrenForNode];
            }
            else {
                // remove each child
                for (let child of childrenForNode) {
                    /** @type {?} */
                    let foundIndex = ListWrapper.findIndexComplex(this.state.selection, child);
                    this.state.selection = this.state.selection
                        .filter((val, index) => index !== foundIndex);
                }
            }
            // apply the same for children of children
            for (let child of childrenForNode) {
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
        /** @type {?} */
        let parent = currentItem.$$parentItem;
        if (isPresent(parent)) {
            /** @type {?} */
            let childrenForNode = this.children.apply(this.context, [parent]) || [];
            /** @type {?} */
            let allSelected = true;
            for (let child of childrenForNode) {
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
                    /** @type {?} */
                    let parentIndex = ListWrapper.findIndexComplex(this.state.selection, parent);
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
            // console.log('Dropping row #: ', origPos + ' ' + dropPos + ' row #: ' + newPos);
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
        /** @type {?} */
        let item = event.item;
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
        if (isBlank(this.children) && isPresent(this.dataToRender)
            && this.dataToRender.length > 0 && isOutlineNode(this.dataToRender[0])) {
            this.outlineFormat = 'tree';
        }
        // this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
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
        /** @type {?} */
        let colMatched = item.key || item.label;
        /** @type {?} */
        let currentCol = this.state.headerSelection.key || this.state.headerSelection.label;
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
        /** @type {?} */
        let lookupKey = {
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
        /** @type {?} */
        let currentItems = this.dataToRender || [];
        /** @type {?} */
        let selectedObject = this.state.selection || [];
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
        /** @type {?} */
        let currentItems = this.dataToRender || [];
        /** @type {?} */
        let selectedObject = this.state.selection || [];
        return currentItems.length > 0 && selectedObject.length >= currentItems.length;
    }
    /**
     * @return {?}
     */
    isToggleAllColumnDisabled() {
        /** @type {?} */
        let currentItems = this.dataToRender || [];
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
     *
     * See AWDataTable
     *
     * @return {?}
     */
    isOutline() {
        return isPresent(this.children) || this.outlineFormat === 'tree';
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
            /** @type {?} */
            let lastInx = this.columns.slice()
                .reverse()
                .findIndex((col) => this.isInternalColumn(col));
            if (lastInx !== -1) {
                /** @type {?} */
                let idx = this.columns.length - 1 - lastInx;
                /** @type {?} */
                let internalCols = this.columns.splice(0, idx + 1);
                this.frozenColumns = [...internalCols, ...this.frozenColumns];
            }
            /** @type {?} */
            let hasValidCols = this.columns
                .findIndex((col) => isBlank(col.width)) === -1;
            assert(hasValidCols || isPresent(this.scrollWidth), 'When using [frozen] binding you need specify [width] for each ' +
                'column or [scrollWidth] on datatable!');
            assert(isBlank(this.rowDetailColumn), 'You cannot combine aw-dt-detail-column with frozen columns!');
        }
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
     * @param {?} item
     * @return {?}
     */
    canUseForDetailRow(item) {
        return isPresent(this.rowDetailColumn) &&
            (/** @type {?} */ (this.rowDetailColumn)).showDetailRow(item);
    }
}
Datatable2Component.decorators = [
    { type: Component, args: [{
                selector: 'aw-datatable2',
                template: "<!--\n    This template focus only on header and body rendering.\n\n    This datatable also supports frozen column and for this rendering it is pretty much transparent\n    as it received sets of column that it needs to render from the TableWrapper.\n\n    TableWrapper in case of frozen columns calls #headerRows and #bodyRows templates twice to\n    render to separate tables where one has frozen columns and another one has the rest and its\n    scrollable\n-->\n\n<aw-dt-wrapper #dtWrapper>\n    <ng-template #headingArea>\n        <ng-content select=\"aw-dt-header2\"></ng-content>\n    </ng-template>\n\n    <ng-template #headerRows let-colsToRender let-frozenView=\"frozenColumns\">\n        <ng-container\n            *ngTemplateOutlet=\"header; context:{$implicit: colsToRender, frozen:frozenView }\">\n        </ng-container>\n    </ng-template>\n\n    <ng-template #bodyRows let-colsToRender>\n        <ng-template [ngIf]=\"isOutline()\">\n            <ng-container\n                *ngTemplateOutlet=\"bodyOutline; context:{$implicit: colsToRender}\"></ng-container>\n        </ng-template>\n        <ng-template [ngIf]=\"!isOutline()\">\n            <ng-container\n                *ngTemplateOutlet=\"bodyPlain; context:{$implicit: colsToRender}\"></ng-container>\n        </ng-template>\n    </ng-template>\n</aw-dt-wrapper>\n\n\n<!--\n    Each rendering column has its own renderTemplate which define how things should be render.\n    Based on different column types this code should be transparent as we dont care on this\n    level what kind of column we are rendering.\n\n    Later on when we will support single/multi selection, this will be just another column extending\n    DTColumn and providing its own template\n\n    We pass into this template if we are rendering header, subHeader, or data\n-->\n<ng-template #header let-colsToRender let-frozen=\"frozen\">\n    <tr>\n        <ng-template ngFor let-col [ngForOf]=\"colsToRender\" let-lastCol=\"last\"\n                     let-columnIndex=\"index\">\n\n            <ng-container *ngTemplateOutlet=\"col.rendererTemplate;\n                context:{$implicit: true, isSubHeader:false,\n                columnIndex:(frozen ? columnIndex: (columns.length + columnIndex))}\">\n            </ng-container>\n        </ng-template>\n    </tr>\n\n    <tr *ngIf=\"showSubHeader\">\n        <ng-template ngFor let-col [ngForOf]=\"colsToRender\" let-lastCol=\"last\">\n            <ng-container *ngTemplateOutlet=\"col.rendererTemplate;\n                context:{$implicit: true, isSubHeader:true}\">\n            </ng-container>\n        </ng-template>\n    </tr>\n</ng-template>\n\n\n<ng-template #bodyPlain let-colsToRender>\n\n    <tbody [ngClass]=\"{'dt-content dt-data-cells ': true, 'dt-is-hoverable-row': rowHover}\">\n\n    <ng-template ngFor let-rowData [ngForOf]=\"dataToRender\" let-even=\"even\" let-odd=\"odd\"\n                 let-rowIndex=\"index\" [ngForTrackBy]=\"rowTrackBy\">\n\n        <ng-container *ngTemplateOutlet=\"rowTemplate; context:{$implicit: rowData, even:even,\n                                          odd:odd, rowIndex:rowIndex, colsToRender:colsToRender}\">\n        </ng-container>\n\n        <ng-template [ngIf]=\"showDetailColumn(rowData)\">\n            <ng-container *ngTemplateOutlet=\"rowDetailColumn.rendererTemplate;\n                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}\">\n            </ng-container>\n        </ng-template>\n\n    </ng-template>\n    <ng-container *ngTemplateOutlet=\"noData\"></ng-container>\n    </tbody>\n</ng-template>\n\n\n<ng-template #bodyOutline let-colsToRender>\n    <tbody #outlineFor awOutlineFor [list]=\"dataToRender\"\n           [format]=\"outlineFormat\"\n           [context]=\"context\"\n           [indentationPerLevel]=\"indentationPerLevel\"\n           [pushRootSectionOnNewLine]=\"pushRootSectionOnNewLine\"\n           [children]=\"children\" [expandAll]=\"expandAll\"\n           [state]=\"outlineState\"\n           [ngClass]=\"{'dt-content dt-data-cells ': true,\n                           'dt-is-hoverable-row': rowHover}\"\n           (onExpandChange)=\"onOutlineExpandChange($event)\">\n\n    <ng-template #outline let-rowData let-nestingLevel=\"nestingLevel\" let-rowIndex=\"rowIndex\">\n        <ng-container *ngTemplateOutlet=\"rowTemplate;\n                                context:{$implicit: rowData, nestingLevel:nestingLevel, colsToRender:colsToRender}\">\n        </ng-container>\n\n        <ng-template [ngIf]=\"showDetailColumn(rowData)\">\n            <ng-container *ngTemplateOutlet=\"rowDetailColumn.rendererTemplate;\n                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}\">\n            </ng-container>\n        </ng-template>\n\n    </ng-template>\n    <ng-container *ngTemplateOutlet=\"noData\"></ng-container>\n    </tbody>\n</ng-template>\n\n<!--\n    Default template that is display when there are no data\n-->\n<ng-template #noData>\n    <tr *ngIf=\"isEmpty()\" class=\" dt-emptymessage-row\"\n        [style.visibility]=\"loading ? 'hidden' : 'visible'\">\n\n        <td [attr.colspan]=\"visibleColumns().length\" class=\"dt-emptymessage\">\n            <span *ngIf=\"!emptyMessageTemplate\">{{emptyMessage}}</span>\n            <ng-container *ngTemplateOutlet=\"emptyMessageTemplate\"></ng-container>\n        </td>\n    </tr>\n</ng-template>\n\n<!--\n    Template that renders actual row. Renders both header and body column. Each rendered\n    column has its own template called rendererTemplate that has all things that needs to be\n    rendered and we just tell the template if we are rendering header, subheader or body\n-->\n<ng-template #rowTemplate let-rowData let-even=\"event\" let-odd=\"odd\" let-rowIndex=\"rowIndex\"\n             let-nestingLevel=\"nestingLevel\" let-colsToRender=\"colsToRender\">\n\n\n    <tr #rowElement dtDraggableRow [dndRowIndex]=\"rowIndex\"\n        class=\"dt-body-row\"\n        (click)=\"onHandleRowClicked($event, rowData)\"\n        [attr.nestingLevel]=\"nestingLevel\"\n        [ngClass]=\"{'dt-even-row': even, 'dt-odd-row': odd,\n            'dt-row-selected': isRowSelected(rowData),\n            'dt-row-draggable': dndRowEnabled,\n            'dt-root-section': nestingLevel === 0 }\">\n\n        <ng-template ngFor let-col [ngForOf]=\"colsToRender\" let-colIndex=\"index\">\n            <ng-container *ngTemplateOutlet=\"col.rendererTemplate;\n                    context:{$implicit: false, data:rowData, rowIndex:rowIndex,\n                    nestingLevel:nestingLevel}\">\n            </ng-container>\n        </ng-template>\n    </tr>\n</ng-template>\n\n\n",
                providers: [
                    ObjectUtils,
                    OutlineState,
                    { provide: DATA_SOURCE, useClass: DT2DataSource, deps: [DataProviders, DataFinders] },
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".w-datatable{position:relative;display:block;box-sizing:border-box}.w-datatable table{border-collapse:collapse;width:100%;table-layout:fixed}.w-datatable tbody,.w-datatable td,.w-datatable th{outline:0}.dt-cell-def,.dt-cell-def-selectable{border:1px solid transparent;padding:17px 16px;box-sizing:border-box}.dt-cell-def-selectable{cursor:pointer;width:100%;height:100%}th .dt-cell-def-selectable{border-width:4px 1px 1px;padding:14px 16px 17px}td .dt-cell-def-selectable{border-width:0 1px 0 5px;padding:17px 16px 17px 13px}.dt-data-cells tr.dt-is-highlight,.dt-data-cells tr.dt-is-hover{border-color:inherit;font-weight:inherit;cursor:pointer}.w-datatable-rtl{direction:rtl}.w-datatable-rtl.w-datatable-rtl.w-datatable thead th{text-align:right}.dt-root-section .dt-cell-def,.dt-root-section .dt-cell-def-selectable{background-color:#f3f6f8;padding:10px 16px;border-bottom-color:transparent;border-right-color:transparent}.dt-plain-layout .dt-is-active,.dt-plain-layout .dt-is-default,.dt-plain-layout .dt-is-highlight,.dt-plain-layout .dt-is-hover,.dt-plain-layout .dt-is-hoverable-row{border-right-color:transparent}.dt-is-active,.dt-is-default,.dt-is-highlight,.dt-is-hover,.dt-is-hoverable-row{border:1px solid #d7d7d7;background-color:#fff;color:#363636}.dt-row-selected td{background-color:rgba(238,255,238,.71)}.dt-is-active{border-color:#065d9c;color:#199de0}.dt-is-highlight{background-color:rgba(65,117,5,.18)}.dt-is-hidden{display:none}.dt-u-unselectable-text{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none}.dt-u-sortable{cursor:pointer}"]
            }] }
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
    outlineFormat: [{ type: Input }],
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
if (false) {
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
     *
     * Not used when [outlineFormat]="'truee'"
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
     *
     * See OutlineFor  - format - only used in the tree mode
     * @type {?}
     */
    Datatable2Component.prototype.outlineFormat;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RhdGF0YWJsZTIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUE2QkEsT0FBTyxFQUlILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULHdCQUF3QixFQUN4QixZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUVULFdBQVcsRUFDWCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRWpFLE9BQU8sRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFDSCxNQUFNLEVBQ04sY0FBYyxFQUNkLFdBQVcsRUFDWCxNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sRUFDUCxTQUFTLEVBQ1QsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFDSCw0QkFBNEIsRUFDL0IsTUFBTSwrREFBK0QsQ0FBQztBQUN2RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQyxDQUFD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c0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICogIEBvcmlnaW5hbC1saWNlbnNlXG4gKiAgVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgUHJpbWVUZWtcbiAqXG4gKiAgQ3JlZGl0OiBEZXJpdmVkIGFuZCBleHRlbmRlZCBmcm9tIFByaW1lLW5nIGRhdGFibGUgd2hlcmUgd2UgbmVlZGVkIG1vcmUgbW9kdWxhciBzb2x1dGlvbi5cbiAqICBXZSByZXVzZWQgdGhlIGNvcmUgc3RydWN0dXJlIGFuZCBsYXlvdXQgYnV0IGhhZCB0byByZWZhY3RvciBib3RoIGNvZGUgYW5kIHRlbXBsYXRlIHRvIG1hdGNoIG91clxuICogIG5lZWRzLiBNb3JlIGluIHRoZSBkZXNjcmlwdGlvblxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYmplY3RVdGlsc30gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL3V0aWxzL29iamVjdHV0aWxzJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7aXNPdXRsaW5lTm9kZSwgT3V0bGluZVN0YXRlfSBmcm9tICcuLi9vdXRsaW5lL2luZGV4JztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIGFzc2VydCxcbiAgICBCb29sZWFuV3JhcHBlcixcbiAgICBFbnZpcm9ubWVudCxcbiAgICBlcXVhbHMsXG4gICAgRmllbGRQYXRoLFxuICAgIGlzQmxhbmssXG4gICAgaXNQcmVzZW50LFxuICAgIExpc3RXcmFwcGVyXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtBV0RhdGFUYWJsZSwgRHJvcFBvc2l0aW9ufSBmcm9tICcuL2F3LWRhdGF0YWJsZSc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQge0RUSGVhZGVyQ29tcG9uZW50Mn0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0RURGV0YWlsUm93Q29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi9kZXRhaWwtcm93L2R0LWRldGFpbC1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgRFREZXRhaWxSb3dFeHBhbmRlckNvbXBvbmVudFxufSBmcm9tICcuL2NvbHVtbi9kZXRhaWwtcm93LWV4cGFuZGVyL2R0LWRldGFpbC1yb3ctZXhwYW5kZXIuY29tcG9uZW50JztcbmltcG9ydCB7REFUQV9TT1VSQ0V9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0RhdGFQcm92aWRlcnN9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXByb3ZpZGVycyc7XG5pbXBvcnQge0RhdGFGaW5kZXJzLCBRdWVyeVR5cGV9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtEYXRhdGFibGUyU3RhdGUsIERldGFpbFJvd0V4cGFuc2lvblN0YXRlLCBEVDJEYXRhU291cmNlfSBmcm9tICcuL2RhdGF0YWJsZTItZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtcbiAgICBEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50XG59IGZyb20gJy4vY29sdW1uL211bHRpLXNlbGVjdC9kdC1tdWx0aS1zZWxlY3QtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50XG59IGZyb20gJy4vY29sdW1uL3NpbmdsZS1zZWxlY3QvZHQtc2luZ2xlLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7TW9kZWxGb3JtYXR9IGZyb20gJy4uL291dGxpbmUvb3V0bGluZS1mb3IuY29tcG9uZW50JztcblxuXG5leHBvcnQgdHlwZSBTZWxlY3Rpb25Nb2RlID0gJ211bHRpJyB8ICdzaW5nbGUnIHwgJ2NlbGwnIHwgJ25vbmUnO1xuXG4vKipcbiAqIERUIGNvbXBvbmVudCB0aGF0IGltcGxlbWVudHMgdGhlIGRhdGEgZ3JpZCB0aGF0IHNob3dzIHRhYnVsYXIgZGF0YS4gRXZlbiB0aGUgYmFzaWNcbiAqIHN0cnVjdHVyZSBpcyBiYXNlZCBvbiBQcmltZU5HIGRhdGF0YWJsZSBpdHMgY29tcGxldGVseSByZWZhY3RvcmVkIGludG8gc21hbGxlciBwaWVjZXMgdGhhdFxuICogYWxsb3dzIG1vcmUgZXh0ZW5zaWJpbGl0eSBhbmQgdHJ5aW5nIHRvIHN0YXkgYXMgY2xvc2UgYXMgcG9zc2libGUgdG8gZXhpc3RpbmcgQVdMIGltcGxlbWVudGF0aW9uXG4gKlxuICogVGhlcmUgYXJlIDMgbWFpbiBwaWVjZXM6XG4gKlxuICogIFRhYmxlIFdyYXBwZXIgLSBmb2N1c2VzIG9uIHRoZSBvdXRlciBzdHJ1Y3R1cmUuIENvbnRhaW5lciB3aXRoIGJhc2ljIGRhdGFibGUgbGF5b3V0IHBsdXNcbiAqICBjb250YWlucyBhbnkgYWRkaXRpb25hbCBwYW5lbHMgdGhhdCBkYXRhdGFibGUgbmVlZHMgc3VjaCBhcyBvdXIgbmV3IGNvbmNlcHQgaG93IGVkaXRpbmcgd2lsbFxuICogIHdvcmsgLSBzbGlkaW5nIHBhbmVsIGZyb20gdGhlIGJvdHRvbVxuICpcbiAqICBEYXRhdGFibGUgQ29sdW1uIC0gSW5zdGVhZCBvZiByZW5kZXJpbmcgZXZlcnl0aGluZyBpbnNpZGUgRFQgSSBzcGxpdCB0aGUgcGFydCB0aGF0IHJlbmRlcnNcbiAqICBjb2x1bW4gaW50byBzZXBhcmF0ZSBjb21wb25lbnQuIFRoaXMgd2F5IGNvbXBvbmVudCBjb2x1bW4gaGFzIGl0cyBvd24gcmVuZGVyZXIgdGVtcGxhdGUgd2hpY2hcbiAqICBjYW4gcmVuZGVyIGJvdGggaGVhZGVyIGFuZCBkYXRhIGNlbGxzLlxuICogIExhdGVyIG9uIERUQ29sdW1uIGlzIHRoZW4gZXh0ZW5kZWQgdG8gc3VwcG9ydCBvdGhlciBhZGRpdGlvbmFsIGNvbHVtbiB0eXBlc1xuICogIFNpbmdsZVNlbGVjdGlvbkNvbHVtbiwgTXVsdGlTZWxlY3Rpb25Db2x1bW4sIGJvdGggcmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBzZWxlY3Rpb24gY29udHJvbHMuXG4gKlxuICogVG8gc3VwcG9ydCBwaXZvdGFsIGxheW91dCB0aGlzIGNhbiBiZSBleHRlbmRlZCBmb3Igb3RoZXIgYWRkaXRpb25hbCBjb2x1bW5zIHRoYXQgaW1wbGVtZW50cyB0aGVpclxuICogb3duIHJlbmRlcmluZyB0ZW1wbGF0ZXNcbiAqXG4gKiBEYXRhdGFibGUgLSBUaGUgbWFpbiBjb21wb25lbnQgdGhhdCBpcyBvbmx5IGZvY3VzIG9uIGhlYWRlciBhbmQgYm9keSByZW5kZXJpbmcgYW5kIGJhc2FlZCBvbiB0aGVcbiAqIGNvbHVtbiB0eXBlIGl0IHdpbGwgcmVuZGVyIHRoZSBjb3JyZWN0IHRlbXBsYXRlXG4gKiBjb2x1bW4gdHlwZSBpdCB3aWxsIHJlbmRlciB0aGUgY29ycmVjdCB0ZW1wbGF0ZVxuICpcbiAqXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZGF0YXRhYmxlMicsXG4gICAgdGVtcGxhdGVVcmw6ICdkYXRhdGFibGUyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZGF0YXRhYmxlMi5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBPYmplY3RVdGlscyxcbiAgICAgICAgT3V0bGluZVN0YXRlLFxuICAgICAgICB7cHJvdmlkZTogREFUQV9TT1VSQ0UsIHVzZUNsYXNzOiBEVDJEYXRhU291cmNlLCBkZXBzOiBbRGF0YVByb3ZpZGVycywgRGF0YUZpbmRlcnNdfSxcbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcblxufSlcbmV4cG9ydCBjbGFzcyBEYXRhdGFibGUyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFXRGF0YVRhYmxlLCBBZnRlclZpZXdDaGVja2VkLFxuICAgIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXRcbntcblxuICAgIC8qKlxuICAgICAqICBMaXN0IG9mIGl0ZW1zIHRvIHNob3cgaW4gdGhlIGRhdGF0YWJsZS5cbiAgICAgKlxuICAgICAqICB0b2RvOiBpbXBsZW1lbnQgdGhlIHNhbWUgRGF0YXNvdXJjZSBhbmQgbGF6eSBsb2FkaW5nIGp1c3QgbGlrZSBJIGRpZCBpdCBmb3IgZGF0YXRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsaXN0OiBhbnlbXTtcblxuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGVudGl0eSBmb3Igd2hpY2ggRGF0YVByb3ZpZGVyIHdpbGwgYmUgbG9hZGVkLiBZb3UgY2FuIGVpdGhlciBwYXNzIGxpc3Qgb2YgaXRlbXNcbiAgICAgKiBvciB1c2UgdGhpcyBkZXN0aW5hdGlvbkNsYXNzLiBOb3QgYm90aFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGVzdGluYXRpb25DbGFzczogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IFRhYmxlV3JhcHBlciB0byBhZGQgdXNlciBkZWZpbmVkIGNsYXMgaW50byB0aGUgdGFibGUgdGFnXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRhYmxlU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU2VlIGhlYWRlclRlbXBsYXRlIGZvciBtb3JlIGRldGFpbHNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJvZHlDbGFzc0ZuOiAoY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGlzUm93U2VsZWN0YWJsZTogKGl0ZW06IGFueSkgPT4gYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogIEhpZGVzIG9yIHNob3dzIHRhYmxlIGhlYWRpbmcgd2hlcmUgd2UgaGF2ZSBmaWx0ZXJzIGFuZCB0b29scyBtZW51c1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1RhYmxlSGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHBpdm90YWxMYXlvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb250ZXh0OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluaXRpYWxTb3J0T3JkZXI6IHN0cmluZyA9ICdkZXNjZW5kaW5nJztcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaW5pdGlhbFNvcnRLZXk6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBEVCBpcyBsb2FkZWQgaW4gdGhlIHBhZ2UgYW5kIHdlIGFyZSBub3QgaW4gdGhlIGZ1bGwgc2NyZWVuIChmdWxsIHBhZ2UgbW9kZSksIHRoaXNcbiAgICAgKiBpcyBodGUgbnVtYmVyIG9mIGxpbmVzIHRoYXQgRFQgd2lsbCBzaG93XG4gICAgICpcbiAgICAgKiB0b2RvOiBjb21lIHVwIHdpdGggYmV0dGVyIG5hbWVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlSb3dTaXplOiBudW1iZXIgPSAxMDtcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgcGFnaW5nIG9uIGxhenkgbG9hZGluZyB1c2luZyBpbmZpbml0ZSBzY3JvbGxlciB0byBzZXQgaW5pdGlhbCBmZXRjaCBsaW1pdCBzaXplXG4gICAgICpcbiAgICAgKiB0b2RvOiBjb21lIHVwIHdpdGggYmV0dGVyIG5hbWUgISEhXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHBhZ2VTaXplOiBudW1iZXIgPSAxNTtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkYXRhU291cmNlOiBEVDJEYXRhU291cmNlO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBtZXNzYWdlIHdoZW4gdGhlcmUgYXJlIG5vIGRhdGEgLlxuICAgICAqXG4gICAgICogdG9kbzogVXNlIGkxOG4gdmFsdWUgYW5kIGNyZWF0ZSByZXNvdXJjZSBmaWxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBlbXB0eU1lc3NhZ2U6IHN0cmluZyA9ICdObyByZWNvcmRzIGZvdW5kJztcblxuXG4gICAgLyoqXG4gICAgICogRGV2ZWxvcGVyIGNhbiBwcm92aWRlIGN1c3RvbSB0cmFja0J5IGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGl0ZXJhdGUgb3ZlciB0aGVcbiAgICAgKiByZWNvcmRzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByb3dUcmFja0J5OiAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUgYWRkcyBjdXN0b20gaG92ZXJpbmcgY2xhc3MgdG8gdGhlIHRib2R5XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByb3dIb3ZlcjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIERvIHdlIHNob3cgbG9hZGluZyBpbmRpY2F0b3JcbiAgICAgKlxuICAgICAqIFRvZG86IHJlbmFtZSB0byBzaG93TG9hZGluZ1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbG9hZGluZzogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0aW9uTW9kZTogU2VsZWN0aW9uTW9kZSA9ICdub25lJztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2FuIHByb3ZpZGUgY3VzdG9tIGljb24uIFRoZXNlIGljb25zIGFyZSBub3QgYW5pbWF0ZWQgZGl2cywgd2UgdXNlZCBjc3NcbiAgICAgKiB0cmFuc2Zvcm1hdGlvbiB0byByb3RhdGUgdGhlbS5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbG9hZGluZ0ljb246IHN0cmluZyA9ICdpY29uLXN5bmNocm9uaXplJztcblxuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBpbmRlbnQgY2FuIGJlIGFkZGVkIHdoZW4gcmVuZGVyaW5nIGRldGFpbCByb3dcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluZGVudERldGFpbFJvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluZGVudGF0aW9uUGVyTGV2ZWw6IG51bWJlciA9IDI1O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgU3ViSGVhZGVyIGlzIHVzZWQgdG8gc2hvdyBzdW1tYXJ5IGNvbHVtbnMsIHdoaWNoIGluIG91ciBVWCBpcyBzaG93biBhdCB0aGUgdG9wIGp1c3QgdW5kZXJcbiAgICAgKiAgdGhlIHJlZ3VsYXIgdGFibGUgaGVhZGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dTdWJIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNlZSBPdXRsaW5lRm9yIC0gb25seSB1c2VkIGluIHRoZSB0cmVlIG1vZGVcbiAgICAgKlxuICAgICAqIE5vdCB1c2VkIHdoZW4gW291dGxpbmVGb3JtYXRdPVwiJ3RydWVlJ1wiXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjaGlsZHJlbjogKHZhbHVlOiBhbnkpID0+IGFueVtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBXZSBtaWdodCBoYXZlIHRoaXMgY29uZGl0aW9uYWwgYXMgdGhpcyBjYW4gYmUgZHluYW1pYyBiYXNlZCBvbiB2YWx1ZSwgc28gdGhlIHNhbWVcbiAgICAgKiBhcyBjaGlsZHJlblxuICAgICAqXG4gICAgICogU2VlIE91dGxpbmVGb3IgLSBvbmx5IHVzZWQgaW4gdGhlIHRyZWUgbW9kZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0V4cGFuc2lvbkNvbnRyb2w6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTZWUgT3V0bGluZUZvciAtIG9ubHkgdXNlZCBpbiB0aGUgdHJlZSBtb2RlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBleHBhbmRBbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgT3V0bGluZUZvciAgLSBmb3JtYXQgLSBvbmx5IHVzZWQgaW4gdGhlIHRyZWUgbW9kZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb3V0bGluZUZvcm1hdDogTW9kZWxGb3JtYXQgPSAnZnJlZSc7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1c2hSb290U2VjdGlvbk9uTmV3TGluZTogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIFJlbmRlciBvciBoaWRlIGV4cGFuc2lvbiBjb250cm9sIGZvciByb3cgZGV0YWlsIGNvbHVtbnMuIEV4cGFuc2lvbiBjb250cm9sIG1ha2VzIHNlbnNlIGZvclxuICAgICAqIHNpbXBsZSB0YWJsZSwgd2hlbiB1c2luZyB0aGlzIGluc2lkZSBvdXRsaW5lICh0cmVlIHRhYmxlKSwgaXRzIGRyaXZlbiBieSBvdXRsaW5lIGNvbnRyb2xcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dSb3dEZXRhaWxFeHBhbnNpb25Db250cm9sOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93U2VsZWN0aW9uQ29sdW1uOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dTZWxlY3RBbGw6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBTaG93IG9yIGhpZGUgZ2xvYmFsIHNlYXJjaCB0ZXJtIGlucHV0IGZpZWxkIGluIHRoZSBoZWFkZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dHbG9iYWxTZWFyY2g6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIGZyb3plbiBjb2x1bW4gYXJlIHVzaW5nIHdlIGNhbiBzcGVjaWZ5IG9uIGdsb2JhbCBsZXZlbCB0b3RhbCB3aWR0aCBvZiB0aGUgdGFibGUgdGhlXG4gICAgICogb3ZlcmZsb3dpbmcgY29udGVudCBvciB3aWR0aCBmb3IgZWFjaCBjb2x1bW4uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzY3JvbGxXaWR0aDogYW55O1xuXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzIG9yIGRpc2FibGVzIHJvdyByZW9yZGVyaW5nXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRuZFJvd0VuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRmlyZXMgZXZlbnQgdGhhdCBzb3J0aW5nIGlzIGVuYWJsZWQgZm9yIGNvbHVtbiBhbmQgd2UgdHJpZ2dlciBzb3J0aW5nXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiBzZWxlY3Rpb24gbW9kZSBpdCB0cmlnZ2VycyBldmVuXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBtdWx0aSBvciBzaW5nbGUgc2VsZWN0aW9uIG1vZGUgaXMgZW5hYmxlZCBpdCB3aWxsIHRyaWdnZXIgZXZlbnQgd2hlbiBjaGVja2JveCBvclxuICAgICAqIHJhZGlvIGJ1dHRvbnMgaXMgc2VsZWN0ZWRcbiAgICAgKlxuICAgICAqIHRvZG86IGltcGxlbWVudCBTaW5nbGVTZWxlY3Rpb25EVENvbHVtbiwgTXVsdGlTZWxlY3Rpb25EVENvbHVtbiB3aXRoIHRoZWlyIHJlbmRlcmVyc1xuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uUm93U2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBjZWxsIGJvZHkgc2VsZWN0aW9uIGNoYW5nZXMgd2UgZmlyZSBldmVudFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25DZWxsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFdoZW4gY2VsbCBoZWFkZXIgc2VsZWN0aW9uIGNoYW5nZXMgd2UgZmlyZSBldmVudFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25IZWFkZXJTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICBAQ29udGVudENoaWxkKERUSGVhZGVyQ29tcG9uZW50MilcbiAgICBoZWFkZXI6IERUSGVhZGVyQ29tcG9uZW50MjtcblxuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBjdXN0b20gdGVtcGxhdGUgdGhhdCBjYW4gYmUgaW1wbGVtZW50ZWQgYnkgYXBwbGljYXRpb24gdG8gc2hvdyB3aGVuIHRoZXJlIGFyZVxuICAgICAqIG5vIGRhdGEgaW4gdGhlIGRhdGFibGVcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdub0RhdGFUZW1wbCcpXG4gICAgZW1wdHlNZXNzYWdlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2R0SGVhZGVyJylcbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2R0U3ViSGVhZGVyJylcbiAgICBzdWJIZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2R0Qm9keScpXG4gICAgYm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdoZWFkZXJGaWx0ZXInKVxuICAgIGhlYWRlckZpbHRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0cyB1c2VkIERUQ29sdW1uIGluc2lkZSBkYXRhdGFibGUgYW5kIHRoZW4gdGhleSBhcmUgdXNlZCBpbnNpZGUgdGhlIHRlbXBsYXRlIHRvXG4gICAgICogaXRlcmF0ZSBvdmVyIGFuZCB1c2UgaXRzIHJlbmRlcmVyVGVtcGxhdGUuXG4gICAgICpcbiAgICAgKiBXaGVuIHdlIHdpbGwgYmUgZGVmaW5pbmcgbmV3IGNvbHVtbnMgaXRzIGltcG9ydGFudCB0aGF0IGl0IGNhbiBhbHNvIG1hdGNoIGFsbCB0aGVcbiAgICAgKiBpbmhlcml0ZWQgb25lcy4gc28gd2UgbmVlZCB0byBtYWtlIHN1cmUgd2UgZGVmaW5lIGEgcHJvdmlkZXIgdGhvc2UgdGhvc2UgY29sdW1ucyB0byBwb2ludFxuICAgICAqIHRvIHRoZSBEVENvbHVtbkNvbXBvbmVudFxuICAgICAqXG4gICAgICogZS5nLjpcbiAgICAgKlxuICAgICAqIHtwcm92aWRlOiBEVENvbHVtbkNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGV0YWlsUm93Q29sdW1uKX1cbiAgICAgKlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oRFRDb2x1bW4yQ29tcG9uZW50KVxuICAgIGNvbHNRdWVyeTogUXVlcnlMaXN0PERUQ29sdW1uMkNvbXBvbmVudD47XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoRFREZXRhaWxSb3dDb21wb25lbnQpXG4gICAgcm93RGV0YWlsQ29sdW1uOiBEVERldGFpbFJvd0NvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUcmlnZ2VycyB3aGVuIGl0ZW1zIGluIHRoZSBsaXN0IGFyZSB1cGRhdGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICAgIGNsYXNzTGlzdDogc3RyaW5nID0gJ3ctZGF0YXRhYmxlICc7XG5cblxuICAgIC8qKlxuICAgICAqIEZvciBpbnRlcm5hbCB1c2VcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgZGF0YXNldCB0aGF0IGlzIGJlaW5nIHJlbmRlcmVkLiBTZXQgZnJvbSB0aGUgW2xpc3RdIGJpbmRpbmcgb3IgYnkgbGF6eSBsb2FkIGZyb21cbiAgICAgKiBkYXRhc291cmNlXG4gICAgICovXG4gICAgcHVibGljIGRhdGFUb1JlbmRlcjogYW55W107XG5cbiAgICAvKipcbiAgICAgKiBXZSBjb252ZXJ0IFF1ZXJ5TGlzdDxEVENvbHVtbjJDb21wb25lbnQ+IHRvIHRoaXMgYXJyYXkgZm9yIGVhc2llciBtYW5pcHVsYXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgY29sdW1uczogRFRDb2x1bW4yQ29tcG9uZW50W107XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgc2Vjb25kYXJ5IGxpc3Qgb2YgY29sdW1ucyB3aGljaCBpcyB1c2VkIGluIGNhc2Ugd2UgaGF2ZSBoYXZlIGVuYWJsZWRcbiAgICAgKiBmcm96ZW4gY29sdW1ucy4gQ29sdW1ucyB0aGF0IGFyZSBtYXJrZWQgYXMgZnJvemVuIG5lZWRzIHRvIGJlIHBsYWNlZCBpbnRvIHNlcGFyYXRlIGFycmF5XG4gICAgICogdG8gYmUgcmVuZGVyZWQgd2F5IHRoYW4gcmVndWxhciBjb2x1bW5zIHdoaWNoIGFyZSBzdG9yZWQgaW4gdGhlIGNvbHVtbnMgYXJyYXkuXG4gICAgICovXG4gICAgcHVibGljIGZyb3plbkNvbHVtbnM6IERUQ29sdW1uMkNvbXBvbmVudFtdO1xuXG5cbiAgICAvKipcbiAgICAgKiAgSW5kaWNhdGVzIHRoYXQgY29sdW1ucyB3ZXJlIGluaXRpYWxlZCBBbHNvIHVzZWQgd2hlbiB3ZSBoaWRlIGFuZCBzaG93IGNvbHVtbiB0byB0cmlnZ2VyXG4gICAgICogIGNoYW5nZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBjb2x1bW5zQ2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc29ydENvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gY29sc1F1ZXJ5IGFuZCBpdHMgY2hhbmdlcyBzbyB3ZSBjYW4gbGF0ZXIgb24gcmVsZWFzZSB0aGUgc3Vic2NyaXB0aW9uXG4gICAgICovXG4gICAgY29sdW1uc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBkZXRhaWxSb3dFeHBhbnNpb25TdGF0ZTogRGV0YWlsUm93RXhwYW5zaW9uU3RhdGU7XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIG51bWJlck9mQ29sc0JlZm9yZURhdGE6IG51bWJlciA9IDA7XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIHN0YXJ0T2ZGaXJzdERhdGFDb2x1bW46IG51bWJlciA9IDA7XG5cblxuICAgIC8qKlxuICAgICAqIFNlY3Rpb24gZm9yIHByb2dyYW1tYXRpY2FsbHkgaW5zdGFudGlhdGVkIGNvbHVtbnMgdGhhdCBhcmUgYWRkZWQgdG8gdGhlIGxpc3QgaWYgYWRkaXRpb25hbFxuICAgICAqIHNwYW4gb3IgbG9naWMgaXMgbmVlZGVkLlxuICAgICAqXG4gICAgICogVG8gcHJvZ3JhbW1hdGljYWxseSBpbnNlcnQgYSBuZXcgY29sdW1uIGludG8gY29sdW1ucyBhcnJheSBsaWtlIGV4cGFuZG8gY29sdW1uIGZvciBkZXRhaWxcbiAgICAgKiByb3csIG9yIFNpbmdsZVNlbGVjdCwgTXVsdGlTZWxlY3QgY29sdW1uIHdoZW4gc2VsZWN0aW9uIGlzIGVuYWJsZWQgd2UgbmVlZCB0byB1c2VcbiAgICAgKiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgdG8gaW5zdGFudGlhdGUgYSBuZXcgY29tcG9uZW50LlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSByb3dEZXRhaWxFeHBhbmRDb2x1bW46IERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnQ7XG4gICAgcHJpdmF0ZSBtdWx0aVNlbGVjdENvbHVtbjogRFRNdWx0aVNlbGVjdENvbHVtbkNvbXBvbmVudDtcbiAgICBwcml2YXRlIHNpbmdsZVNlbGVjdENvbHVtbjogRFRTaW5nbGVTZWxlY3RDb2x1bW5Db21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSW4gY2FzZSBvZiBvdXRsaW5lIHRhYmxlIHdlIGFyZSBpbmplY3QgT3V0bGluZVN0YXRlIHdoaWNoIGlzIHByb3ZpZGVkIGluIHRoZSBEVCBjb21wb25lbnRcbiAgICAgKiBkZWZpbml0aW9uLiBUaGlzIGlzIHVzZWQgYnkgbmVzdGVkIG91dGxpbmVGb3IgY29tcG9uZW50IGl0IHNldCBpdHNlbGYgYXMgcmVmZXJlbmNlIGFuZFxuICAgICAqIGluaXRpYWxpemUgdGhlIHN0YXRlIHNvIGl0IGNhbiBiZSB1c2VkIGxhdGVyIG9uIGluc2lkZSBPdXRsaW5lQ29udHJvbFxuICAgICAqXG4gICAgICpcbiAgICAgKiBFYWNoIERhdGF0YWJsZSBpcyBwcmUtZGVmYXVsdGVkIHdpdGggaXRzIG93biB2ZXJzaW9uIG9mIERhdGFTb3VyY2Ugc28gYWxsIHRoZSBvYnNlcnZlcnNcbiAgICAgKiBpbnNpZGUgYXJlIHVuaXF1ZSBmb3IgdGhpcyBjb21wb25lbnRcbiAgICAgKlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgQEluamVjdChEQVRBX1NPVVJDRSkgcHJpdmF0ZSBfZGVmYXVsdERTOiBEVDJEYXRhU291cmNlLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHVibGljIGZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdXRsaW5lU3RhdGU6IE91dGxpbmVTdGF0ZSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgem9uZTogTmdab25lLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLl9kZWZhdWx0RFM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgc3RhdGUgb3V0IHRvIGFwcGxpY2F0aW9uLiBDYW4gYmUgdXNlIGFzIHR3byB3YXkgYmluZGluZ3NcbiAgICAgKlxuICAgICAqIFsoc3RhdGUpXT1kdFN0YXRlKHMpXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGF0ZSgpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTb3VyY2Uuc3RhdGU7XG4gICAgfVxuXG4gICAgc2V0IHN0YXRlKHZhbDogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnN0YXRlID0gdmFsO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG5cbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxpc3QpICYmIGlzUHJlc2VudCh0aGlzLmRlc3RpbmF0aW9uQ2xhc3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgdXNlIGJvdGggYmluZGluZ3MgW2xpc3RdIGFuZCBbZGVzdGluYXRpb25DbGFzc10hJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZSA9IG5ldyBEZXRhaWxSb3dFeHBhbnNpb25TdGF0ZSh0aGlzKTtcblxuICAgICAgICAvLyBpbml0IGRlZmF1bHQgY29sdW1uc1xuICAgICAgICB0aGlzLnJvd0RldGFpbEV4cGFuZENvbHVtbiA9IHRoaXMuZmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRFREZXRhaWxSb3dFeHBhbmRlckNvbXBvbmVudCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpLmluc3RhbmNlO1xuXG5cbiAgICAgICAgdGhpcy5tdWx0aVNlbGVjdENvbHVtbiA9IHRoaXMuZmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRFRNdWx0aVNlbGVjdENvbHVtbkNvbXBvbmVudCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpLmluc3RhbmNlO1xuXG4gICAgICAgIHRoaXMuc2luZ2xlU2VsZWN0Q29sdW1uID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpLmluc3RhbmNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGUgZGF0YSBhcmUgbm90IGRlZmVycmVkIGFuZCB3ZSBnZXQgbGlzdCBkaXJlY3RseSB0aGVuIGl0IGNyZWF0ZXMgRFMuIElmXG4gICAgICAgICAqIG5nT25DaGFuZ2VzIGlzIGNhbGxlZCBmaXJzdCB3ZSBwcm9wZXJseSBpbml0IERTIGFuZCBjbGVhbiB0aGlzLmxpc3RcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kZXN0aW5hdGlvbkNsYXNzKSB8fCBpc1ByZXNlbnQodGhpcy5saXN0KSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RGF0YXNvdXJjZSgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhU291cmNlLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhc291cmNlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNpbmNlIHdlIHdvcmsgd2l0aCByZWZlcmVuY2VzIGxldCdzIHBhc3MgY3JlYXRlZCBtYXAgaW5zaWRlIG91ciBzdGF0ZVxuICAgICAgICB0aGlzLm91dGxpbmVTdGF0ZS5leHBhbnNpb25TdGF0ZXMgPSB0aGlzLnN0YXRlLm91dGxpbmVTdGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGRhdGEgYXJyaXZlcyBsYXRlciBtYXliZSBkdWUgdG8gUkVTVCBBUEkgbGF0ZW5jeSwgaW5pdGlhbGl6ZSBEUyBvbmx5IHdoZW4gd2UgaGF2ZSBhXG4gICAgICogZGF0YSwgb3RoZXJ3aXNlIGlmIGRhdGEgY2hhbmdlZCB0aHJ1IHRoZSBiaW5kaW5ncyBqdXN0IHRyaWdnZXIgZGF0YUNoYW5nZSBldmVudFxuICAgICAqXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuXG4gICAgICAgIGlmIChjaGFuZ2VzWydsaXN0J10gJiYgaXNQcmVzZW50KGNoYW5nZXNbJ2xpc3QnXS5jdXJyZW50VmFsdWUpXG4gICAgICAgICAgICAmJiAhdGhpcy5kYXRhU291cmNlLmluaXRpYWxpemVkKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGFzb3VyY2UoKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVNvdXJjZS5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5uZXh0KHRoaXMubGlzdCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpXG4gICAge1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBpbml0IGEgc3RhdGUgd2hlbiBkZXRhaWwgY29sdW1uIGlzIHByZXNlbnRcbiAgICAgICAgLy8gdG9kbzogbW92ZSB0aGlzIGluaXRpYWxpemF0aW9uIHRvIGRhdGFzb3VyY2VcbiAgICAgICAgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5kZXRhaWxFeHBhbnNpb25FbmFibGVkID0gaXNQcmVzZW50KHRoaXMucm93RGV0YWlsQ29sdW1uKTtcblxuICAgICAgICB0aGlzLmluaXRDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuY29sdW1uc1N1YnNjcmlwdGlvbiA9IHRoaXMuY29sc1F1ZXJ5LmNoYW5nZXMuc3Vic2NyaWJlKF8gPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbml0Q29sdW1ucygpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KClcbiAgICB7XG4gICAgICAgIC8vIGFzc2lnbiBpdCBwcm9ncmFtYXRpY2FsbHkgYXMgd2Ugd2FudCB0byBoYXZlIGEgY29udGV4dCBmb3IgdGhlIGZpbHRlclxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucm93RGV0YWlsQ29sdW1uKSAmJiBpc1ByZXNlbnQodGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvcikpIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZVN0YXRlLm91dGxpbmVGb3IuZmlsdGVyT3V0ID0gdGhpcy5za2lwT3V0bGluZUl0ZW0uYmluZCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvcikpIHtcbiAgICAgICAgICAgIC8vIHRoaXMub3V0bGluZVN0YXRlLm91dGxpbmVGb3IuY2hhbmdlRGV0ZWN0b3IuZGV0YWNoKCk7XG4gICAgICAgICAgICAvLyB0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zQ2hhbmdlZCAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNGcm96ZW5Db2x1bW5zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZnJvemVuQ29sdW1ucy5mb3JFYWNoKChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgICAgICAgICBjb2wucG9zdEluaXRpYWxpemUoaW5kZXgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgICAgICAgICBjb2wucG9zdEluaXRpYWxpemUoaW5kZXgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEtleSBlbnRyeSBtZXRob2QgdGhhdCBpbml0aWFsaXplZCBvdXIgY29sdW1ucy4gTGF0ZXIgb24gd2hlbiB3ZSB3aWxsIHN1cHBvcnQgc2VsZWN0aW9uIGFuZFxuICAgICAqIG11bHRpc2VsZWN0aW9uIHdlIHdpbGwgcHJvZ3JhbW1hdGljYWxseSBpbnN0YW50aWF0ZSBTaW5nbGVTZWxlY3Rpb24sIE11bHRpU2VsZWN0aW9uIGNvbHVtblxuICAgICAqIGNvbXBvbmVudHMgYW5kIGFkZCB0aGVtIHRvIHRoZSBsaXN0IHNvIHRoZXkgY2FuIGJlIHJlbmRlcmVkLlxuICAgICAqXG4gICAgICogc28gdGhlIGlkZWEgaGVyZSBpczpcbiAgICAgKlxuICAgICAqIFdoZW4gRFQgY29tcG9uZW50IGluaXRpYWxpemUgYW5kIHdlIGFyZSBpbiBlZGl0aW5nIG1vZGUgYW5kIHdlIHN1cHBvcnQgU2luZ2xlL011bHRpIHNlbGVjdGlvblxuICAgICAqIHdlIHdpbGwgdXNlIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB0byBjcmVhdGUgY29tcG9uZW50IGFuZCBhZGQgaXQgYXMgZmlyc3QgaXRlbSB0byB0aGUgbGlzdFxuICAgICAqIGFuZCB0aGVuIGl0IHdpbGwgYmUgcmVuZGVyZWQganVzdCBsaWtlIGFueXRoaWduIGVsc2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0Q29sdW1ucygpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgdGhpcy5mcm96ZW5Db2x1bW5zID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RGV0YWlsQ29sdW1uRXhwYW5zaW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpJykge1xuICAgICAgICAgICAgdGhpcy5tdWx0aVNlbGVjdENvbHVtbi5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2godGhpcy5tdWx0aVNlbGVjdENvbHVtbik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNMZWFkaW5nU2VsZWN0Q29sdW1uKCkgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5zaW5nbGVTZWxlY3RDb2x1bW4uaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKHRoaXMuc2luZ2xlU2VsZWN0Q29sdW1uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgZXhwYW5zaW9uIGNvbHVtbiB3aGVuIGRldGFpbCByb3cgaXMgZW5hYmxlZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCAmJiAhdGhpcy5pc091dGxpbmUoKSkge1xuICAgICAgICAgICAgdGhpcy5yb3dEZXRhaWxFeHBhbmRDb2x1bW4uaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKHRoaXMucm93RGV0YWlsRXhwYW5kQ29sdW1uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29sc1F1ZXJ5XG4gICAgICAgICAgICAuZmlsdGVyKChjb2wxOiBEVENvbHVtbjJDb21wb25lbnQpID0+ICFjb2wxLmZyb3plbilcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2wuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjb2wpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbml0RnJvemVuQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmluaXRDb2x1bW5JbmZvKCk7XG4gICAgICAgIHRoaXMuY29sdW1uc0NoYW5nZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGN1cnJlbnQgY29sdW1uIGlzIHByb2dyYW1tYXRpY2FsbHkgY3JlYXRlZFxuICAgICAqXG4gICAgICovXG4gICAgaXNJbnRlcm5hbENvbHVtbihjb2w6IERUQ29sdW1uMkNvbXBvbmVudCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBjb2wgaW5zdGFuY2VvZiBEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudCB8fFxuICAgICAgICAgICAgY29sIGluc3RhbmNlb2YgRFRNdWx0aVNlbGVjdENvbHVtbkNvbXBvbmVudCB8fFxuICAgICAgICAgICAgY29sIGluc3RhbmNlb2YgRFREZXRhaWxSb3dFeHBhbmRlckNvbXBvbmVudDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgRGF0YXNvdXJjZSBiYXNlZCBvbiBwYXNzZWQgdmFsdWVzLiBJdCB0cmllcyB0byBpbml0aWFsaXplIERTIGZvciBmaXJzdCB0aW1lXG4gICAgICogaW5zaWRlIHRoZSBuZ0luaXQgYnV0IGluIGNhc2UgRGF0YSBhcnJpdmVzIGxhdGVyIG1heWJlIGR1ZSB0byBzb21lIFJFU1QgQVBJIGNhbGxzIHRoaXNcbiAgICAgKiBjYW4gYmUgdHJpZ2dlcmVkIGFsc28gZnJvbSBuZ09uQ2hhbmdlcy5cbiAgICAgKlxuICAgICAqL1xuICAgIGluaXREYXRhc291cmNlKGluaXRpYWxpemU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBEYXRhdGFibGUyU3RhdGUuY3JlYXRlKDAsIHRoaXMucGFnZVNpemUsIHRoaXMuZGlzcGxheVJvd1NpemUsXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsU29ydEtleSwgdGhpcy5zb3J0T3JkZXJpbmdGb3JTdHJpbmcodGhpcy5pbml0aWFsU29ydE9yZGVyKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmxpbWl0ID0gdGhpcy5zdGF0ZS5kaXNwbGF5TGltaXQgPSB0aGlzLmRpc3BsYXlSb3dTaXplO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmluaXRpYWxTb3J0S2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc29ydEtleSA9IHRoaXMuaW5pdGlhbFNvcnRLZXk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zb3J0T3JkZXIgPSB0aGlzLnNvcnRPcmRlcmluZ0ZvclN0cmluZyh0aGlzLmluaXRpYWxTb3J0T3JkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluaXRpYWxpemUpIHtcblxuICAgICAgICAgICAgbGV0IHFUeXBlID0gKHRoaXMuaXNPdXRsaW5lKCkgJiYgdGhpcy5vdXRsaW5lRm9ybWF0ID09PSAndHJlZScpID9cbiAgICAgICAgICAgICAgICBRdWVyeVR5cGUuRnVsbFRleHRPdXRsaW5lIDogUXVlcnlUeXBlLkZ1bGxUZXh0O1xuXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UuaW5pdCh7XG4gICAgICAgICAgICAgICAgb2JqOiBpc1ByZXNlbnQodGhpcy5kZXN0aW5hdGlvbkNsYXNzKSA/IHRoaXMuZGVzdGluYXRpb25DbGFzcyA6IHRoaXMubGlzdCxcbiAgICAgICAgICAgICAgICBxdWVyeVR5cGU6IHFUeXBlLFxuICAgICAgICAgICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmZldGNoKHRoaXMuc3RhdGUpO1xuXG4gICAgICAgIC8vIHJlc2V0IGxpc3QgdG8gbWFrZSBzdXJlIGl0IGNvbWVzIGZyb20gRGF0YVByb3ZpZGVyLCB3ZSB1c2UgbGlzdCAgdG8gaW5pdGlhbGl6ZVxuICAgICAgICB0aGlzLmxpc3QgPSBudWxsO1xuXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIEVOVFJZIHBvaW50IGZvciB0aGUgREFUQSBDSEFOR0VTLiBBbGwgYWRkaXRpb24sIGVkaXRzLCBkZWxldGlvbiBlbmRzIHVwXG4gICAgICAgIC8vIGhlcmUuIFdlIGRvbnQgd29yayBkaXJlY3RseSB3aXRoIExJU1QuIEFueSBjaGFuZ2UgaXMgcmVhY3RpdmUgYW5kIGhlcmUgaXMgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLm9wZW4oKS5zdWJzY3JpYmUoKGRhdGE6IGFueVtdKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gZGV0YWlsUm93IGNvbHVtbiBpcyBwcmVzZW50IHdlIGluaXRpYWxpemUgYSBzdGF0ZSBob2xkaW5nIGluZm9ybWF0aW9uIHdoaWNoIGl0ZW0gaXNcbiAgICAgKiBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIHRvZG86IFRoaXMgaXMgdGVtcG9yYXJ5IGhlcmUgYW5kIG9uY2Ugd2Ugc3Vwb3J0IGxhenkgbG9hZGluZyBtb3ZlIHRoaXMgdG8gZGF0YXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEZvciBleGFtcGxlIGZvciBvdXRsaW5lIHRyZWUgdGFibGUgd2UgbmVlZCB0byBjb25uZWN0IGEgc3RhdGUgZnJvbSBvdXRsaW5lIHdpdGggYSBzdGF0ZSBpblxuICAgICAqIGhlcmUgYXMgd2UgYXJlIHVzaW5nIG91dGxpbmUgY29udHJvbCB0byBleHBhbmQgYW5kIGNvbGxhcHNlIGl0ZW1zXG4gICAgICovXG4gICAgaW5pdERldGFpbENvbHVtbkV4cGFuc2lvbigpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMucm93RGV0YWlsQ29sdW1uKSkge1xuICAgICAgICAgICAgdGhpcy5yb3dEZXRhaWxDb2x1bW4uaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLmRldGFpbEV4cGFuc2lvbkVuYWJsZWQgPSBpc1ByZXNlbnQodGhpcy5yb3dEZXRhaWxDb2x1bW4pICYmXG4gICAgICAgICAgICBCb29sZWFuV3JhcHBlci5pc1RydWUodGhpcy5zaG93Um93RGV0YWlsRXhwYW5zaW9uQ29udHJvbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgZXhlY3V0ZWQgYWZ0ZXIgd2UgaW5pdGlhbGl6ZSBhbGwgdGhlIGNvbHVtbnMgaW4gb3JkZXIgdG8gY2FsY3VsYXRlIGNvcnJlY3RcbiAgICAgKiBudW1iZXJzIHVzZWQgZm9yIGluZGVudGF0aW9uIHdoaWxlIHJlbmRlcmluZyBzZWxlY3Rpb24gY29sdW1ucyBhcyB3ZWxsIGFzIGRldGFpbCByb3cgY29sdW1ucy5cbiAgICAgKlxuICAgICAqIEhlcmUgd2UgbmVlZCB0byBiZSBhd2FyZSBob3cgbWFueSBjb2x1bW5zIHRvIHNwYW5cbiAgICAgKlxuICAgICAqL1xuICAgIGluaXRDb2x1bW5JbmZvKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZDb2xzQmVmb3JlRGF0YSA9IDA7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWNvbC5pc1ZhbHVlQ29sdW1uKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlck9mQ29sc0JlZm9yZURhdGErKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5kZW50RGV0YWlsUm93KSB7XG4gICAgICAgICAgICB0aGlzLm51bWJlck9mQ29sc0JlZm9yZURhdGErKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhcnRPZkZpcnN0RGF0YUNvbHVtbiA9IHRoaXMuY29sdW1ucy5sZW5ndGggLSB0aGlzLm51bWJlck9mQ29sc0JlZm9yZURhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNlbGxTZWxlY3Rpb25DaGFuZ2UoY2VsbDogYW55LCBjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSAhPT0gJ2NlbGwnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxvb2t1cEtleSA9IHtcbiAgICAgICAgICAgIGNvbDogY29sdW1uLmtleSB8fCBjb2x1bW4ubGFiZWwsXG4gICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH07XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdGF0ZS5zZWxlY3Rpb24pICYmIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgbGV0IGZvdW5kSW5kZXggPSBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBsb29rdXBLZXkpO1xuICAgICAgICAgICAgbGV0IGlzU2VsZWN0ZWQgPSBmb3VuZEluZGV4ICE9PSAtMTtcblxuICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBpbmRleCAhPT0gZm91bmRJbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gWy4uLnRoaXMuc3RhdGUuc2VsZWN0aW9uLCBsb29rdXBLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbbG9va3VwS2V5XTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2VsbENoYW5nZS5lbWl0KHRoaXMuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uSGVhZGVyU2VsZWN0aW9uQ2hhbmdlKGNlbGw6IGFueSwgY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNIZWFkZXJTZWxlY3RlZChjb2x1bW4pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbiA9IGNvbHVtbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uID0gY29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25IZWFkZXJTZWxlY3Rpb24uZW1pdCh0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbik7XG4gICAgfVxuXG4gICAgb25IYW5kbGVSb3dDbGlja2VkKGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIHNwZWNpYWwgYWx0IGtleSBtb2RpZmllci4gV2hlbiB1c2VkIHdpdGggcm93cyBpdCBpbmRpY2F0ZXMgdGhlcmUgaXMgYSBEJkQgZW5hYmxlZFxuICAgICAgICBpZiAoZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGknKSB7XG4gICAgICAgICAgICB0aGlzLm9uUm93VG9nZ2xlKGV2ZW50LCBpdGVtKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QoZXZlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvblJvd1RvZ2dsZShldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgcm93U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc3RhdGUuc2VsZWN0aW9uKSAmJiB0aGlzLnN0YXRlLnNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZm91bmRJbmRleCA9IExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGl0ZW0pO1xuICAgICAgICAgICAgbGV0IGlzU2VsZWN0ZWQgPSBmb3VuZEluZGV4ICE9PSAtMTtcblxuICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBpbmRleCAhPT0gZm91bmRJbmRleCk7XG5cbiAgICAgICAgICAgICAgICByb3dTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFsuLi50aGlzLnN0YXRlLnNlbGVjdGlvbiwgaXRlbV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZvciB0aGUgb3V0bGluZSBnbyB1cCBhbmQgZG93biB0aGUgc3luYyB3aXRoIHRyZWVpdGVtc1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oaXRlbSwgaXNTZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvUGFyZW50KGl0ZW0sIGlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbaXRlbV07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0bGluZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuKGl0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9QYXJlbnQoaXRlbSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblJvd1NlbGVjdGlvbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IHJvd1NlbGVjdGVkLFxuICAgICAgICAgICAgaXRlbTogdGhpcy5zdGF0ZS5zZWxlY3Rpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvblJvd1NlbGVjdChldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IGl0ZW07XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMub25Sb3dTZWxlY3Rpb25DaGFuZ2UuZW1pdChpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oY3VycmVudEl0ZW06IGFueSwgaXNTZWxlY3RlZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBjaGlsZHJlbkZvck5vZGUgPSB0aGlzLmNoaWxkcmVuLmFwcGx5KHRoaXMuY29udGV4dCwgW2N1cnJlbnRJdGVtXSkgfHwgW107XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuRm9yTm9kZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBJZiBpcyBzZWxlY3RlZCBjdXJyZW50bHkgdGhlbiB0b2dnbGUgdG8gb3RoZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIC8vIHdoZW4gY2hlY2tpbmcgYWxsIGZyb20gcm9vdCwgZGVzZWxlY3QgY2hpbGRyZW4gYW5kIGFkZCBhbGxcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oY3VycmVudEl0ZW0sIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gWy4uLnRoaXMuc3RhdGUuc2VsZWN0aW9uLCAuLi5jaGlsZHJlbkZvck5vZGVdO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBlYWNoIGNoaWxkXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW5Gb3JOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZEluZGV4ID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh2YWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gaW5kZXggIT09IGZvdW5kSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYXBwbHkgdGhlIHNhbWUgZm9yIGNoaWxkcmVuIG9mIGNoaWxkcmVuXG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbkZvck5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oY2hpbGQsIGlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvUGFyZW50KGN1cnJlbnRJdGVtOiBhbnksIGlzU2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgcGFyZW50ID0gY3VycmVudEl0ZW0uJCRwYXJlbnRJdGVtO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHBhcmVudCkpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbkZvck5vZGUgPSB0aGlzLmNoaWxkcmVuLmFwcGx5KHRoaXMuY29udGV4dCwgW3BhcmVudF0pIHx8IFtdO1xuXG4gICAgICAgICAgICBsZXQgYWxsU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW5Gb3JOb2RlKSB7XG4gICAgICAgICAgICAgICAgYWxsU2VsZWN0ZWQgPSBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBjaGlsZCkgIT09IC0xXG4gICAgICAgICAgICAgICAgICAgICYmIGFsbFNlbGVjdGVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWxsU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24ucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFsbFNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJlbnRJbmRleCA9IExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh2YWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gaW5kZXggIT09IHBhcmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9QYXJlbnQoY3VycmVudEl0ZW0uJCRwYXJlbnRJdGVtLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25EbkRSb3dEcm9wKG9yaWdQb3M6IG51bWJlciwgbmV3UG9zOiBudW1iZXIsIGRyb3BQb3M6IERyb3BQb3NpdGlvbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kYXRhU291cmNlKSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0Ryb3BwaW5nIHJvdyAjOiAnLCBvcmlnUG9zICsgJyAnICsgZHJvcFBvcyArICcgcm93ICM6ICcgKyBuZXdQb3MpO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnJlb3JkZXJSb3dzKG9yaWdQb3MsIG5ld1BvcywgZHJvcFBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uT3V0bGluZUV4cGFuZENoYW5nZShldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBldmVudC5pdGVtO1xuXG4gICAgICAgIC8vIFdlIGRvbnQgcmVhbGx5IG5lZWQgdG8gc3RvcmUgYSBzdGF0ZSBmb3JtIG91dGxpbmUgbG9jYWxseSBhcyB3ZSBhcmUgdXNpbmcgdGhlIHNhbWUgb2JqZWN0XG4gICAgICAgIC8vIHJlZmVyZW5jZVxuICAgICAgICAvLyB0aGlzLnN0YXRlLm91dGxpbmVTdGF0ZSA9IHRoaXMub3V0bGluZVN0YXRlLmV4cGFuc2lvblN0YXRlcztcblxuICAgICAgICBpZiAodGhpcy5jYW5Vc2VGb3JEZXRhaWxSb3coaXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUudG9nZ2xlKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHNvcnRTaW5nbGUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxpc3QpICYmIGlzUHJlc2VudCh0aGlzLnNvcnRDb2x1bW4pKSB7XG5cbiAgICAgICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5zb3J0Q29sdW1uLmtleSksICdJbnZhbGlkIGNvbHVtbiB0byBzb3J0Jyk7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCh0aGlzLnNvcnRDb2x1bW4ua2V5LCB0aGlzLnNvcnRDb2x1bW4uc29ydE9yZGVyKTtcblxuICAgICAgICAgICAgdGhpcy5vblNvcnQuZW1pdCh7XG4gICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMuc29ydENvbHVtbi5rZXksXG4gICAgICAgICAgICAgICAgb3JkZXI6IHRoaXMuc29ydENvbHVtbi5zb3J0T3JkZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYW5kbGVEYXRhQ2hhbmdlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNvcnRLZXkgfHwgdGhpcy5zb3J0Q29sdW1uKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc29ydENvbHVtbiAmJiB0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRDb2x1bW4gPSB0aGlzLmNvbHVtbnMuZmluZChcbiAgICAgICAgICAgICAgICAgICAgY29sID0+IGNvbC5rZXkgPT09IHRoaXMuc3RhdGUuc29ydEtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGFUb1JlbmRlcigpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5saXN0KTtcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhVG9SZW5kZXIoZGF0YXNvdXJjZT86IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMuZGF0YVRvUmVuZGVyID0gZGF0YXNvdXJjZSB8fCB0aGlzLmxpc3Q7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5jaGlsZHJlbikgJiYgaXNQcmVzZW50KHRoaXMuZGF0YVRvUmVuZGVyKVxuICAgICAgICAgICAgJiYgdGhpcy5kYXRhVG9SZW5kZXIubGVuZ3RoID4gMCAmJiBpc091dGxpbmVOb2RlKHRoaXMuZGF0YVRvUmVuZGVyWzBdKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lRm9ybWF0ID0gJ3RyZWUnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcmVzZXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zb3J0Q29sdW1uID0gbnVsbDtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBpc0hlYWRlclNlbGVjdGVkKGl0ZW06IERUQ29sdW1uMkNvbXBvbmVudCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvbE1hdGNoZWQgPSBpdGVtLmtleSB8fCBpdGVtLmxhYmVsO1xuICAgICAgICBsZXQgY3VycmVudENvbCA9IHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uLmtleSB8fCB0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbi5sYWJlbDtcbiAgICAgICAgcmV0dXJuIGNvbE1hdGNoZWQgPT09IGN1cnJlbnRDb2w7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGlzQm9keUNlbGxTZWxlY3RlZChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGxvb2t1cEtleSA9IHtcbiAgICAgICAgICAgIGNvbDogY29sdW1uLmtleSB8fCBjb2x1bW4ubGFiZWwsXG4gICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5zdGF0ZS5zZWxlY3Rpb24pICYmXG4gICAgICAgICAgICBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBsb29rdXBLZXkpICE9PSAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1Jvd1NlbGVjdGVkKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKSAmJiBpc1ByZXNlbnQodGhpcy5zdGF0ZS5zZWxlY3Rpb24pKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgaXRlbSkgIT09IC0xO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXF1YWxzKHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEbyB3ZSBoYXZlIGRhdGEgdG8gcmVuZGVyIFVzZWQgaW5zaWRlIHRlbXBsYXRlIHRvIHRlbGwgaWYgd2Ugc2hvdWxkIHVzZSB0aGUgTm9EYXRhIHRlbXBsYXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0VtcHR5KClcbiAgICB7XG4gICAgICAgIHJldHVybiBpc0JsYW5rKHRoaXMuZGF0YVRvUmVuZGVyKSB8fCAodGhpcy5kYXRhVG9SZW5kZXIubGVuZ3RoID09PSAwKTtcbiAgICB9XG5cbiAgICBoYXNGcm96ZW5Db2x1bW5zKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5mcm96ZW5Db2x1bW5zKSAmJiB0aGlzLmZyb3plbkNvbHVtbnMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBoYXNJbnZpc2libGVTZWxlY3Rpb25Db2x1bW4oKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpICYmICF0aGlzLnNob3dTZWxlY3Rpb25Db2x1bW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSAhPT0gJ25vbmUnICYmIHRoaXMuc2VsZWN0aW9uTW9kZSAhPT0gJ2NlbGwnO1xuICAgIH1cblxuICAgIHZpc2libGVDb2x1bW5zKCk6IERUQ29sdW1uMkNvbXBvbmVudFtdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLmZpbHRlcihjID0+IGMuaXNWaXNpYmxlKSA6IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgc29ydE9yZGVyaW5nRm9yU3RyaW5nKGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhkaXJlY3Rpb24pIHx8IGRpcmVjdGlvbiA9PT0gJ2FzY2VuZGluZycpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoZGlyZWN0aW9uKSB8fCBkaXJlY3Rpb24gPT09ICdkZXNjZW5kaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRvZG86IGxvZyBiYWQga2V5XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHNvcnRPcmRlcmluZ0Zvck51bWJlcihkaXJlY3Rpb246IG51bWJlcik6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoZGlyZWN0aW9uKSB8fCBkaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNjZW5kaW5nJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKGRpcmVjdGlvbikgfHwgZGlyZWN0aW9uID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuICdkZXNjZW5kaW5nJztcbiAgICAgICAgfVxuICAgICAgICAvLyB0b2RvOiBsb2cgYmFkIGtleVxuICAgICAgICByZXR1cm4gJ2FzY2VuZGluZyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICB0b2dnbGVBbGxDb2x1bW5zKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW1zID0gdGhpcy5kYXRhVG9SZW5kZXIgfHwgW107XG4gICAgICAgIGxldCBzZWxlY3RlZE9iamVjdCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uIHx8IFtdO1xuICAgICAgICBpZiAoc2VsZWN0ZWRPYmplY3QubGVuZ3RoID49IGN1cnJlbnRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbLi4uY3VycmVudEl0ZW1zXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1RvZ2dsZUFsbENvbHVtblNlbGVjdGVkKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBjdXJyZW50SXRlbXMgPSB0aGlzLmRhdGFUb1JlbmRlciB8fCBbXTtcbiAgICAgICAgbGV0IHNlbGVjdGVkT2JqZWN0ID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb24gfHwgW107XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtcy5sZW5ndGggPiAwICYmIHNlbGVjdGVkT2JqZWN0Lmxlbmd0aCA+PSBjdXJyZW50SXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGlzVG9nZ2xlQWxsQ29sdW1uRGlzYWJsZWQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtcyA9IHRoaXMuZGF0YVRvUmVuZGVyIHx8IFtdO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50SXRlbXMubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVXNlZCBieSB0ZW1wbGF0ZSB0byBkZWNpZGUgaWYgd2UgbmVlZCB0byByZW5kZXIgRGV0YWlsUm93IHRlbXBsYXRlLiBXZSBuZWVkIHRvIGhhdmVcbiAgICAgKiBEZXRhaWxSb3cgQ29udGVudENoaWxkIGFuZCB1c2luZyBEZXRhaWxSb3cgY29tcG9uZW50IFtpc1Zpc2libGVGbl0gZnVuY3Rpb24gYmluZGluZyB3ZVxuICAgICAqIGNoZWNrIGlmIHRoZSBpdGVtIHRoYXQgaXMgYWJvdXQgdG8gYmUgcmVuZGVyZWQgaXMgZWxpZ2libGUgZm9yIGRldGFpbCByb3dcbiAgICAgKlxuICAgICAqL1xuICAgIHNob3dEZXRhaWxDb2x1bW4oaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuVXNlRm9yRGV0YWlsUm93KGl0ZW0pICYmIHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuaXNFeHBhbmRlZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc091dGxpbmUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNoaWxkcmVuKSB8fCB0aGlzLm91dGxpbmVGb3JtYXQgPT09ICd0cmVlJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gZGVhbGluZyB3aXRoIGRldGFpbCBjb2x1bW4gKGRldGFpbCByb3cpIGFuZCBvdXRsaW5lIGFsbCB0b2dldGhlciB3ZSBuZWVkIGhhdmUgYVxuICAgICAqIG1lY2hhbmlzbSB0byB0ZWxsIHRvIHRoZSBvdXRsaW5lIFwiZG9uJ3QgcmVuZGVyIHRoZSBuZXh0IGxldmVsIG9mIGl0ZW1zXCIgYW5kIHVzZSBkZXRhaWwgcm93LlxuICAgICAqIFNvIGNlcnRhaW4gaXRlbSB0eXBlIG5lZWRzIHRvIGJlIHNraXBwZWQuXG4gICAgICpcbiAgICAgKiBUaGUgd2F5IHdlIHNraXAgdGhvc2UgaXRlbSBpcyB3ZSB1c2UgaXNWaXNpYmxlRm4gY29uZGl0aW9uIG9mIHRoZSBkZXRhaWwgcm93IGFuZCBsb29rIGFoZWFkXG4gICAgICogaWYgd2Ugc2hvdWxkIHNraXAgbmV4dCBsZXZlbC5cbiAgICAgKlxuICAgICAqL1xuICAgIHNraXBPdXRsaW5lSXRlbShpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5Vc2VGb3JEZXRhaWxSb3coaXRlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRWYWx1ZShkYXRhOiBhbnksIGZpZWxkOiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBGaWVsZFBhdGguZ2V0RmllbGRWYWx1ZShkYXRhLCBmaWVsZCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uc1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBzdXJlIHRoYXQgd2UgYWxzbyBpbmNsdWRlIHByb2dyYW1tYXRpYyBjb2x1bW4gaWYgcHJlc2VudC4gTW92ZSB0aGVtIHRvIHRoZSBjb3JyZWN0XG4gICAgICogYXJyYXlcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdEZyb3plbkNvbHVtbnMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5jb2xzUXVlcnlcbiAgICAgICAgICAgIC5maWx0ZXIoKGNvbDE6IERUQ29sdW1uMkNvbXBvbmVudCkgPT4gY29sMS5mcm96ZW4pXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Db2x1bW5zLnB1c2goY29sKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZnJvemVuQ29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBmaW5kIGxhc3QgaW5kZXggb2YgY29sdW1uIHRoYXQgaXMgaW50ZXJuYWwgLyBwcm9ncmFtbWF0aWNcblxuICAgICAgICAgICAgbGV0IGxhc3RJbnggPSB0aGlzLmNvbHVtbnMuc2xpY2UoKVxuICAgICAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgICAgICAuZmluZEluZGV4KChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCkgPT4gdGhpcy5pc0ludGVybmFsQ29sdW1uKGNvbCkpO1xuXG4gICAgICAgICAgICBpZiAobGFzdElueCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5jb2x1bW5zLmxlbmd0aCAtIDEgLSBsYXN0SW54O1xuICAgICAgICAgICAgICAgIGxldCBpbnRlcm5hbENvbHMgPSB0aGlzLmNvbHVtbnMuc3BsaWNlKDAsIGlkeCArIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuQ29sdW1ucyA9IFsuLi5pbnRlcm5hbENvbHMsIC4uLnRoaXMuZnJvemVuQ29sdW1uc107XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGhhc1ZhbGlkQ29scyA9IHRoaXMuY29sdW1uc1xuICAgICAgICAgICAgICAgIC5maW5kSW5kZXgoKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiBpc0JsYW5rKGNvbC53aWR0aCkpID09PSAtMTtcblxuICAgICAgICAgICAgYXNzZXJ0KGhhc1ZhbGlkQ29scyB8fCBpc1ByZXNlbnQodGhpcy5zY3JvbGxXaWR0aCksXG4gICAgICAgICAgICAgICAgJ1doZW4gdXNpbmcgW2Zyb3plbl0gYmluZGluZyB5b3UgbmVlZCBzcGVjaWZ5IFt3aWR0aF0gZm9yIGVhY2ggJyArXG4gICAgICAgICAgICAgICAgJ2NvbHVtbiBvciBbc2Nyb2xsV2lkdGhdIG9uIGRhdGF0YWJsZSEnKTtcblxuXG4gICAgICAgICAgICBhc3NlcnQoaXNCbGFuayh0aGlzLnJvd0RldGFpbENvbHVtbiksXG4gICAgICAgICAgICAgICAgJ1lvdSBjYW5ub3QgY29tYmluZSBhdy1kdC1kZXRhaWwtY29sdW1uIHdpdGggZnJvemVuIGNvbHVtbnMhJyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgY3VycmVudCBpbW11dGFibGUgbGlzdCBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uLiBOZWVkIHRvIHdyYXAgaXQgd2l0aFxuICAgICAqIHNldFRpbWVvdXQgYXMgdGhlIGNoYW5nZSBjYW4gZWFzaWx5IGNvbWUgYWZ0ZXIgdmlldyBjaGVja2VkIGFuZCB0aGlzIHdvdWxkIHJlc3VsdCBzb21lIGVycm9yc1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVMaXN0KG5ld0xpc3Q6IGFueVtdKTogdm9pZFxuICAgIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBuZXdMaXN0O1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVEYXRhQ2hhbmdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuVXNlRm9yRGV0YWlsUm93KGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5yb3dEZXRhaWxDb2x1bW4pICYmXG4gICAgICAgICAgICAoPERURGV0YWlsUm93Q29tcG9uZW50PnRoaXMucm93RGV0YWlsQ29sdW1uKS5zaG93RGV0YWlsUm93KGl0ZW0pO1xuICAgIH1cbn1cblxuXG5cbiJdfQ==