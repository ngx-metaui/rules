/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            let /** @type {?} */ qType = (this.isOutline() && this.outlineFormat === 'tree') ?
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
           [format]="outlineFormat"
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RhdGF0YWJsZTIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUE2QkEsT0FBTyxFQUlILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULHdCQUF3QixFQUN4QixZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUVULFdBQVcsRUFDWCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRWpFLE9BQU8sRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFDSCxNQUFNLEVBQ04sY0FBYyxFQUNkLFdBQVcsRUFDWCxNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sRUFDUCxTQUFTLEVBQ1QsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFDSCw0QkFBNEIsRUFDL0IsTUFBTSwrREFBK0QsQ0FBQztBQUN2RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQyxDQUFD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WSxTQUFDLGFBQWE7NkJBTzFCLFlBQVksU0FBQyxVQUFVO2dDQU12QixZQUFZLFNBQUMsYUFBYTsyQkFNMUIsWUFBWSxTQUFDLFFBQVE7bUNBT3JCLFlBQVksU0FBQyxjQUFjO3dCQWlCM0IsZUFBZSxTQUFDLGtCQUFrQjs4QkFPbEMsWUFBWSxTQUFDLG9CQUFvQjswQkFTakMsTUFBTTt3QkFJTixXQUFXLFNBQUMsT0FBTztvQkErR25CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKiAgQG9yaWdpbmFsLWxpY2Vuc2VcbiAqICBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBQcmltZVRla1xuICpcbiAqICBDcmVkaXQ6IERlcml2ZWQgYW5kIGV4dGVuZGVkIGZyb20gUHJpbWUtbmcgZGF0YWJsZSB3aGVyZSB3ZSBuZWVkZWQgbW9yZSBtb2R1bGFyIHNvbHV0aW9uLlxuICogIFdlIHJldXNlZCB0aGUgY29yZSBzdHJ1Y3R1cmUgYW5kIGxheW91dCBidXQgaGFkIHRvIHJlZmFjdG9yIGJvdGggY29kZSBhbmQgdGVtcGxhdGUgdG8gbWF0Y2ggb3VyXG4gKiAgbmVlZHMuIE1vcmUgaW4gdGhlIGRlc2NyaXB0aW9uXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09iamVjdFV0aWxzfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvdXRpbHMvb2JqZWN0dXRpbHMnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtpc091dGxpbmVOb2RlLCBPdXRsaW5lU3RhdGV9IGZyb20gJy4uL291dGxpbmUvaW5kZXgnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgYXNzZXJ0LFxuICAgIEJvb2xlYW5XcmFwcGVyLFxuICAgIEVudmlyb25tZW50LFxuICAgIGVxdWFscyxcbiAgICBGaWVsZFBhdGgsXG4gICAgaXNCbGFuayxcbiAgICBpc1ByZXNlbnQsXG4gICAgTGlzdFdyYXBwZXJcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0FXRGF0YVRhYmxlLCBEcm9wUG9zaXRpb259IGZyb20gJy4vYXctZGF0YXRhYmxlJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi9kdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7RFRIZWFkZXJDb21wb25lbnQyfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7RFREZXRhaWxSb3dDb21wb25lbnR9IGZyb20gJy4vY29sdW1uL2RldGFpbC1yb3cvZHQtZGV0YWlsLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50XG59IGZyb20gJy4vY29sdW1uL2RldGFpbC1yb3ctZXhwYW5kZXIvZHQtZGV0YWlsLXJvdy1leHBhbmRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtEQVRBX1NPVVJDRX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtc291cmNlJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7RGF0YUZpbmRlcnMsIFF1ZXJ5VHlwZX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge0RhdGF0YWJsZTJTdGF0ZSwgRGV0YWlsUm93RXhwYW5zaW9uU3RhdGUsIERUMkRhdGFTb3VyY2V9IGZyb20gJy4vZGF0YXRhYmxlMi1kYXRhLXNvdXJjZSc7XG5pbXBvcnQge1xuICAgIERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnRcbn0gZnJvbSAnLi9jb2x1bW4vbXVsdGktc2VsZWN0L2R0LW11bHRpLXNlbGVjdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgRFRTaW5nbGVTZWxlY3RDb2x1bW5Db21wb25lbnRcbn0gZnJvbSAnLi9jb2x1bW4vc2luZ2xlLXNlbGVjdC9kdC1zaW5nbGUtc2VsZWN0LWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtNb2RlbEZvcm1hdH0gZnJvbSAnLi4vb3V0bGluZS9vdXRsaW5lLWZvci5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCB0eXBlIFNlbGVjdGlvbk1vZGUgPSAnbXVsdGknIHwgJ3NpbmdsZScgfCAnY2VsbCcgfCAnbm9uZSc7XG5cbi8qKlxuICogRFQgY29tcG9uZW50IHRoYXQgaW1wbGVtZW50cyB0aGUgZGF0YSBncmlkIHRoYXQgc2hvd3MgdGFidWxhciBkYXRhLiBFdmVuIHRoZSBiYXNpY1xuICogc3RydWN0dXJlIGlzIGJhc2VkIG9uIFByaW1lTkcgZGF0YXRhYmxlIGl0cyBjb21wbGV0ZWx5IHJlZmFjdG9yZWQgaW50byBzbWFsbGVyIHBpZWNlcyB0aGF0XG4gKiBhbGxvd3MgbW9yZSBleHRlbnNpYmlsaXR5IGFuZCB0cnlpbmcgdG8gc3RheSBhcyBjbG9zZSBhcyBwb3NzaWJsZSB0byBleGlzdGluZyBBV0wgaW1wbGVtZW50YXRpb25cbiAqXG4gKiBUaGVyZSBhcmUgMyBtYWluIHBpZWNlczpcbiAqXG4gKiAgVGFibGUgV3JhcHBlciAtIGZvY3VzZXMgb24gdGhlIG91dGVyIHN0cnVjdHVyZS4gQ29udGFpbmVyIHdpdGggYmFzaWMgZGF0YWJsZSBsYXlvdXQgcGx1c1xuICogIGNvbnRhaW5zIGFueSBhZGRpdGlvbmFsIHBhbmVscyB0aGF0IGRhdGF0YWJsZSBuZWVkcyBzdWNoIGFzIG91ciBuZXcgY29uY2VwdCBob3cgZWRpdGluZyB3aWxsXG4gKiAgd29yayAtIHNsaWRpbmcgcGFuZWwgZnJvbSB0aGUgYm90dG9tXG4gKlxuICogIERhdGF0YWJsZSBDb2x1bW4gLSBJbnN0ZWFkIG9mIHJlbmRlcmluZyBldmVyeXRoaW5nIGluc2lkZSBEVCBJIHNwbGl0IHRoZSBwYXJ0IHRoYXQgcmVuZGVyc1xuICogIGNvbHVtbiBpbnRvIHNlcGFyYXRlIGNvbXBvbmVudC4gVGhpcyB3YXkgY29tcG9uZW50IGNvbHVtbiBoYXMgaXRzIG93biByZW5kZXJlciB0ZW1wbGF0ZSB3aGljaFxuICogIGNhbiByZW5kZXIgYm90aCBoZWFkZXIgYW5kIGRhdGEgY2VsbHMuXG4gKiAgTGF0ZXIgb24gRFRDb2x1bW4gaXMgdGhlbiBleHRlbmRlZCB0byBzdXBwb3J0IG90aGVyIGFkZGl0aW9uYWwgY29sdW1uIHR5cGVzXG4gKiAgU2luZ2xlU2VsZWN0aW9uQ29sdW1uLCBNdWx0aVNlbGVjdGlvbkNvbHVtbiwgYm90aCByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIHNlbGVjdGlvbiBjb250cm9scy5cbiAqXG4gKiBUbyBzdXBwb3J0IHBpdm90YWwgbGF5b3V0IHRoaXMgY2FuIGJlIGV4dGVuZGVkIGZvciBvdGhlciBhZGRpdGlvbmFsIGNvbHVtbnMgdGhhdCBpbXBsZW1lbnRzIHRoZWlyXG4gKiBvd24gcmVuZGVyaW5nIHRlbXBsYXRlc1xuICpcbiAqIERhdGF0YWJsZSAtIFRoZSBtYWluIGNvbXBvbmVudCB0aGF0IGlzIG9ubHkgZm9jdXMgb24gaGVhZGVyIGFuZCBib2R5IHJlbmRlcmluZyBhbmQgYmFzYWVkIG9uIHRoZVxuICogY29sdW1uIHR5cGUgaXQgd2lsbCByZW5kZXIgdGhlIGNvcnJlY3QgdGVtcGxhdGVcbiAqIGNvbHVtbiB0eXBlIGl0IHdpbGwgcmVuZGVyIHRoZSBjb3JyZWN0IHRlbXBsYXRlXG4gKlxuICpcbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1kYXRhdGFibGUyJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS1cbiAgICBUaGlzIHRlbXBsYXRlIGZvY3VzIG9ubHkgb24gaGVhZGVyIGFuZCBib2R5IHJlbmRlcmluZy5cblxuICAgIFRoaXMgZGF0YXRhYmxlIGFsc28gc3VwcG9ydHMgZnJvemVuIGNvbHVtbiBhbmQgZm9yIHRoaXMgcmVuZGVyaW5nIGl0IGlzIHByZXR0eSBtdWNoIHRyYW5zcGFyZW50XG4gICAgYXMgaXQgcmVjZWl2ZWQgc2V0cyBvZiBjb2x1bW4gdGhhdCBpdCBuZWVkcyB0byByZW5kZXIgZnJvbSB0aGUgVGFibGVXcmFwcGVyLlxuXG4gICAgVGFibGVXcmFwcGVyIGluIGNhc2Ugb2YgZnJvemVuIGNvbHVtbnMgY2FsbHMgI2hlYWRlclJvd3MgYW5kICNib2R5Um93cyB0ZW1wbGF0ZXMgdHdpY2UgdG9cbiAgICByZW5kZXIgdG8gc2VwYXJhdGUgdGFibGVzIHdoZXJlIG9uZSBoYXMgZnJvemVuIGNvbHVtbnMgYW5kIGFub3RoZXIgb25lIGhhcyB0aGUgcmVzdCBhbmQgaXRzXG4gICAgc2Nyb2xsYWJsZVxuLS0+XG5cbjxhdy1kdC13cmFwcGVyICNkdFdyYXBwZXI+XG4gICAgPG5nLXRlbXBsYXRlICNoZWFkaW5nQXJlYT5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYXctZHQtaGVhZGVyMlwiPjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICNoZWFkZXJSb3dzIGxldC1jb2xzVG9SZW5kZXIgbGV0LWZyb3plblZpZXc9XCJmcm96ZW5Db2x1bW5zXCI+XG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyOyBjb250ZXh0OnskaW1wbGljaXQ6IGNvbHNUb1JlbmRlciwgZnJvemVuOmZyb3plblZpZXcgfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICNib2R5Um93cyBsZXQtY29sc1RvUmVuZGVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNPdXRsaW5lKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlPdXRsaW5lOyBjb250ZXh0OnskaW1wbGljaXQ6IGNvbHNUb1JlbmRlcn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpc091dGxpbmUoKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keVBsYWluOyBjb250ZXh0OnskaW1wbGljaXQ6IGNvbHNUb1JlbmRlcn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9hdy1kdC13cmFwcGVyPlxuXG5cbjwhLS1cbiAgICBFYWNoIHJlbmRlcmluZyBjb2x1bW4gaGFzIGl0cyBvd24gcmVuZGVyVGVtcGxhdGUgd2hpY2ggZGVmaW5lIGhvdyB0aGluZ3Mgc2hvdWxkIGJlIHJlbmRlci5cbiAgICBCYXNlZCBvbiBkaWZmZXJlbnQgY29sdW1uIHR5cGVzIHRoaXMgY29kZSBzaG91bGQgYmUgdHJhbnNwYXJlbnQgYXMgd2UgZG9udCBjYXJlIG9uIHRoaXNcbiAgICBsZXZlbCB3aGF0IGtpbmQgb2YgY29sdW1uIHdlIGFyZSByZW5kZXJpbmcuXG5cbiAgICBMYXRlciBvbiB3aGVuIHdlIHdpbGwgc3VwcG9ydCBzaW5nbGUvbXVsdGkgc2VsZWN0aW9uLCB0aGlzIHdpbGwgYmUganVzdCBhbm90aGVyIGNvbHVtbiBleHRlbmRpbmdcbiAgICBEVENvbHVtbiBhbmQgcHJvdmlkaW5nIGl0cyBvd24gdGVtcGxhdGVcblxuICAgIFdlIHBhc3MgaW50byB0aGlzIHRlbXBsYXRlIGlmIHdlIGFyZSByZW5kZXJpbmcgaGVhZGVyLCBzdWJIZWFkZXIsIG9yIGRhdGFcbi0tPlxuPG5nLXRlbXBsYXRlICNoZWFkZXIgbGV0LWNvbHNUb1JlbmRlciBsZXQtZnJvemVuPVwiZnJvemVuXCI+XG4gICAgPHRyPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNvbCBbbmdGb3JPZl09XCJjb2xzVG9SZW5kZXJcIiBsZXQtbGFzdENvbD1cImxhc3RcIlxuICAgICAgICAgICAgICAgICAgICAgbGV0LWNvbHVtbkluZGV4PVwiaW5kZXhcIj5cblxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5yZW5kZXJlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6eyRpbXBsaWNpdDogdHJ1ZSwgaXNTdWJIZWFkZXI6ZmFsc2UsXG4gICAgICAgICAgICAgICAgY29sdW1uSW5kZXg6KGZyb3plbiA/IGNvbHVtbkluZGV4OiAoY29sdW1ucy5sZW5ndGggKyBjb2x1bW5JbmRleCkpfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC90cj5cblxuICAgIDx0ciAqbmdJZj1cInNob3dTdWJIZWFkZXJcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jb2wgW25nRm9yT2ZdPVwiY29sc1RvUmVuZGVyXCIgbGV0LWxhc3RDb2w9XCJsYXN0XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLnJlbmRlcmVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgY29udGV4dDp7JGltcGxpY2l0OiB0cnVlLCBpc1N1YkhlYWRlcjp0cnVlfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC90cj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNib2R5UGxhaW4gbGV0LWNvbHNUb1JlbmRlcj5cblxuICAgIDx0Ym9keSBbbmdDbGFzc109XCJ7J2R0LWNvbnRlbnQgZHQtZGF0YS1jZWxscyAnOiB0cnVlLCAnZHQtaXMtaG92ZXJhYmxlLXJvdyc6IHJvd0hvdmVyfVwiPlxuXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3dEYXRhIFtuZ0Zvck9mXT1cImRhdGFUb1JlbmRlclwiIGxldC1ldmVuPVwiZXZlblwiIGxldC1vZGQ9XCJvZGRcIlxuICAgICAgICAgICAgICAgICBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0ZvclRyYWNrQnldPVwicm93VHJhY2tCeVwiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyb3dUZW1wbGF0ZTsgY29udGV4dDp7JGltcGxpY2l0OiByb3dEYXRhLCBldmVuOmV2ZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZGQ6b2RkLCByb3dJbmRleDpyb3dJbmRleCwgY29sc1RvUmVuZGVyOmNvbHNUb1JlbmRlcn1cIj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cInNob3dEZXRhaWxDb2x1bW4ocm93RGF0YSlcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyb3dEZXRhaWxDb2x1bW4ucmVuZGVyZXJUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDp7JGltcGxpY2l0OiBmYWxzZSwgZGF0YTpyb3dEYXRhLCByb3dJbmRleDoocm93SW5kZXgpfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJub0RhdGFcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L3Rib2R5PlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI2JvZHlPdXRsaW5lIGxldC1jb2xzVG9SZW5kZXI+XG4gICAgPHRib2R5ICNvdXRsaW5lRm9yIGF3T3V0bGluZUZvciBbbGlzdF09XCJkYXRhVG9SZW5kZXJcIlxuICAgICAgICAgICBbZm9ybWF0XT1cIm91dGxpbmVGb3JtYXRcIlxuICAgICAgICAgICBbY29udGV4dF09XCJjb250ZXh0XCJcbiAgICAgICAgICAgW2luZGVudGF0aW9uUGVyTGV2ZWxdPVwiaW5kZW50YXRpb25QZXJMZXZlbFwiXG4gICAgICAgICAgIFtwdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmVdPVwicHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lXCJcbiAgICAgICAgICAgW2NoaWxkcmVuXT1cImNoaWxkcmVuXCIgW2V4cGFuZEFsbF09XCJleHBhbmRBbGxcIlxuICAgICAgICAgICBbc3RhdGVdPVwib3V0bGluZVN0YXRlXCJcbiAgICAgICAgICAgW25nQ2xhc3NdPVwieydkdC1jb250ZW50IGR0LWRhdGEtY2VsbHMgJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdkdC1pcy1ob3ZlcmFibGUtcm93Jzogcm93SG92ZXJ9XCJcbiAgICAgICAgICAgKG9uRXhwYW5kQ2hhbmdlKT1cIm9uT3V0bGluZUV4cGFuZENoYW5nZSgkZXZlbnQpXCI+XG5cbiAgICA8bmctdGVtcGxhdGUgI291dGxpbmUgbGV0LXJvd0RhdGEgbGV0LW5lc3RpbmdMZXZlbD1cIm5lc3RpbmdMZXZlbFwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyb3dUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDp7JGltcGxpY2l0OiByb3dEYXRhLCBuZXN0aW5nTGV2ZWw6bmVzdGluZ0xldmVsLCBjb2xzVG9SZW5kZXI6Y29sc1RvUmVuZGVyfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwic2hvd0RldGFpbENvbHVtbihyb3dEYXRhKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJvd0RldGFpbENvbHVtbi5yZW5kZXJlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IGZhbHNlLCBkYXRhOnJvd0RhdGEsIHJvd0luZGV4Oihyb3dJbmRleCl9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5vRGF0YVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvdGJvZHk+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tXG4gICAgRGVmYXVsdCB0ZW1wbGF0ZSB0aGF0IGlzIGRpc3BsYXkgd2hlbiB0aGVyZSBhcmUgbm8gZGF0YVxuLS0+XG48bmctdGVtcGxhdGUgI25vRGF0YT5cbiAgICA8dHIgKm5nSWY9XCJpc0VtcHR5KClcIiBjbGFzcz1cIiBkdC1lbXB0eW1lc3NhZ2Utcm93XCJcbiAgICAgICAgW3N0eWxlLnZpc2liaWxpdHldPVwibG9hZGluZyA/ICdoaWRkZW4nIDogJ3Zpc2libGUnXCI+XG5cbiAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwidmlzaWJsZUNvbHVtbnMoKS5sZW5ndGhcIiBjbGFzcz1cImR0LWVtcHR5bWVzc2FnZVwiPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZW1wdHlNZXNzYWdlVGVtcGxhdGVcIj57e2VtcHR5TWVzc2FnZX19PC9zcGFuPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS1cbiAgICBUZW1wbGF0ZSB0aGF0IHJlbmRlcnMgYWN0dWFsIHJvdy4gUmVuZGVycyBib3RoIGhlYWRlciBhbmQgYm9keSBjb2x1bW4uIEVhY2ggcmVuZGVyZWRcbiAgICBjb2x1bW4gaGFzIGl0cyBvd24gdGVtcGxhdGUgY2FsbGVkIHJlbmRlcmVyVGVtcGxhdGUgdGhhdCBoYXMgYWxsIHRoaW5ncyB0aGF0IG5lZWRzIHRvIGJlXG4gICAgcmVuZGVyZWQgYW5kIHdlIGp1c3QgdGVsbCB0aGUgdGVtcGxhdGUgaWYgd2UgYXJlIHJlbmRlcmluZyBoZWFkZXIsIHN1YmhlYWRlciBvciBib2R5XG4tLT5cbjxuZy10ZW1wbGF0ZSAjcm93VGVtcGxhdGUgbGV0LXJvd0RhdGEgbGV0LWV2ZW49XCJldmVudFwiIGxldC1vZGQ9XCJvZGRcIiBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiXG4gICAgICAgICAgICAgbGV0LW5lc3RpbmdMZXZlbD1cIm5lc3RpbmdMZXZlbFwiIGxldC1jb2xzVG9SZW5kZXI9XCJjb2xzVG9SZW5kZXJcIj5cblxuXG4gICAgPHRyICNyb3dFbGVtZW50IGR0RHJhZ2dhYmxlUm93IFtkbmRSb3dJbmRleF09XCJyb3dJbmRleFwiXG4gICAgICAgIGNsYXNzPVwiZHQtYm9keS1yb3dcIlxuICAgICAgICAoY2xpY2spPVwib25IYW5kbGVSb3dDbGlja2VkKCRldmVudCwgcm93RGF0YSlcIlxuICAgICAgICBbYXR0ci5uZXN0aW5nTGV2ZWxdPVwibmVzdGluZ0xldmVsXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydkdC1ldmVuLXJvdyc6IGV2ZW4sICdkdC1vZGQtcm93Jzogb2RkLFxuICAgICAgICAgICAgJ2R0LXJvdy1zZWxlY3RlZCc6IGlzUm93U2VsZWN0ZWQocm93RGF0YSksXG4gICAgICAgICAgICAnZHQtcm93LWRyYWdnYWJsZSc6IGRuZFJvd0VuYWJsZWQsXG4gICAgICAgICAgICAnZHQtcm9vdC1zZWN0aW9uJzogbmVzdGluZ0xldmVsID09PSAwIH1cIj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNvbCBbbmdGb3JPZl09XCJjb2xzVG9SZW5kZXJcIiBsZXQtY29sSW5kZXg9XCJpbmRleFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC5yZW5kZXJlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IGZhbHNlLCBkYXRhOnJvd0RhdGEsIHJvd0luZGV4OnJvd0luZGV4LFxuICAgICAgICAgICAgICAgICAgICBuZXN0aW5nTGV2ZWw6bmVzdGluZ0xldmVsfVwiPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC90cj5cbjwvbmctdGVtcGxhdGU+XG5cblxuYCxcbiAgICBzdHlsZXM6IFtgLnctZGF0YXRhYmxle3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS53LWRhdGF0YWJsZSB0YWJsZXtib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7d2lkdGg6MTAwJTt0YWJsZS1sYXlvdXQ6Zml4ZWR9LnctZGF0YXRhYmxlIHRib2R5LC53LWRhdGF0YWJsZSB0ZCwudy1kYXRhdGFibGUgdGh7b3V0bGluZTowfS5kdC1jZWxsLWRlZiwuZHQtY2VsbC1kZWYtc2VsZWN0YWJsZXtib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50O3BhZGRpbmc6MTdweCAxNnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uZHQtY2VsbC1kZWYtc2VsZWN0YWJsZXtjdXJzb3I6cG9pbnRlcjt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfXRoIC5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2JvcmRlci13aWR0aDo0cHggMXB4IDFweDtwYWRkaW5nOjE0cHggMTZweCAxN3B4fXRkIC5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2JvcmRlci13aWR0aDowIDFweCAwIDVweDtwYWRkaW5nOjE3cHggMTZweCAxN3B4IDEzcHh9LmR0LWRhdGEtY2VsbHMgdHIuZHQtaXMtaGlnaGxpZ2h0LC5kdC1kYXRhLWNlbGxzIHRyLmR0LWlzLWhvdmVye2JvcmRlci1jb2xvcjppbmhlcml0O2ZvbnQtd2VpZ2h0OmluaGVyaXQ7Y3Vyc29yOnBvaW50ZXJ9LnctZGF0YXRhYmxlLXJ0bHtkaXJlY3Rpb246cnRsfS53LWRhdGF0YWJsZS1ydGwudy1kYXRhdGFibGUtcnRsLnctZGF0YXRhYmxlIHRoZWFkIHRoe3RleHQtYWxpZ246cmlnaHR9LmR0LXJvb3Qtc2VjdGlvbiAuZHQtY2VsbC1kZWYsLmR0LXJvb3Qtc2VjdGlvbiAuZHQtY2VsbC1kZWYtc2VsZWN0YWJsZXtiYWNrZ3JvdW5kLWNvbG9yOiNmM2Y2Zjg7cGFkZGluZzoxMHB4IDE2cHg7Ym9yZGVyLWJvdHRvbS1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnR9LmR0LXBsYWluLWxheW91dCAuZHQtaXMtYWN0aXZlLC5kdC1wbGFpbi1sYXlvdXQgLmR0LWlzLWRlZmF1bHQsLmR0LXBsYWluLWxheW91dCAuZHQtaXMtaGlnaGxpZ2h0LC5kdC1wbGFpbi1sYXlvdXQgLmR0LWlzLWhvdmVyLC5kdC1wbGFpbi1sYXlvdXQgLmR0LWlzLWhvdmVyYWJsZS1yb3d7Ym9yZGVyLXJpZ2h0LWNvbG9yOnRyYW5zcGFyZW50fS5kdC1pcy1hY3RpdmUsLmR0LWlzLWRlZmF1bHQsLmR0LWlzLWhpZ2hsaWdodCwuZHQtaXMtaG92ZXIsLmR0LWlzLWhvdmVyYWJsZS1yb3d7Ym9yZGVyOjFweCBzb2xpZCAjZDdkN2Q3O2JhY2tncm91bmQtY29sb3I6I2ZmZjtjb2xvcjojMzYzNjM2fS5kdC1yb3ctc2VsZWN0ZWQgdGR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIzOCwyNTUsMjM4LC43MSl9LmR0LWlzLWFjdGl2ZXtib3JkZXItY29sb3I6IzA2NWQ5Yztjb2xvcjojMTk5ZGUwfS5kdC1pcy1oaWdobGlnaHR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDY1LDExNyw1LC4xOCl9LmR0LWlzLWhpZGRlbntkaXNwbGF5Om5vbmV9LmR0LXUtdW5zZWxlY3RhYmxlLXRleHR7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstby11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmR0LXUtc29ydGFibGV7Y3Vyc29yOnBvaW50ZXJ9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE9iamVjdFV0aWxzLFxuICAgICAgICBPdXRsaW5lU3RhdGUsXG4gICAgICAgIHtwcm92aWRlOiBEQVRBX1NPVVJDRSwgdXNlQ2xhc3M6IERUMkRhdGFTb3VyY2UsIGRlcHM6IFtEYXRhUHJvdmlkZXJzLCBEYXRhRmluZGVyc119LFxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxuXG59KVxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZTJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQVdEYXRhVGFibGUsIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdFxue1xuXG4gICAgLyoqXG4gICAgICogIExpc3Qgb2YgaXRlbXMgdG8gc2hvdyBpbiB0aGUgZGF0YXRhYmxlLlxuICAgICAqXG4gICAgICogIHRvZG86IGltcGxlbWVudCB0aGUgc2FtZSBEYXRhc291cmNlIGFuZCBsYXp5IGxvYWRpbmcganVzdCBsaWtlIEkgZGlkIGl0IGZvciBkYXRhdGFibGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxpc3Q6IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgZW50aXR5IGZvciB3aGljaCBEYXRhUHJvdmlkZXIgd2lsbCBiZSBsb2FkZWQuIFlvdSBjYW4gZWl0aGVyIHBhc3MgbGlzdCBvZiBpdGVtc1xuICAgICAqIG9yIHVzZSB0aGlzIGRlc3RpbmF0aW9uQ2xhc3MuIE5vdCBib3RoXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZXN0aW5hdGlvbkNsYXNzOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgYnkgVGFibGVXcmFwcGVyIHRvIGFkZCB1c2VyIGRlZmluZWQgY2xhcyBpbnRvIHRoZSB0YWJsZSB0YWdcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGFibGVTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgaGVhZGVyVGVtcGxhdGUgZm9yIG1vcmUgZGV0YWlsc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYm9keUNsYXNzRm46IChjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCwgaXRlbTogYW55KSA9PiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNSb3dTZWxlY3RhYmxlOiAoaXRlbTogYW55KSA9PiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKiAgSGlkZXMgb3Igc2hvd3MgdGFibGUgaGVhZGluZyB3aGVyZSB3ZSBoYXZlIGZpbHRlcnMgYW5kIHRvb2xzIG1lbnVzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93VGFibGVIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGl2b3RhbExheW91dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbnRleHQ6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaW5pdGlhbFNvcnRPcmRlcjogc3RyaW5nID0gJ2Rlc2NlbmRpbmcnO1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbml0aWFsU29ydEtleTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIERUIGlzIGxvYWRlZCBpbiB0aGUgcGFnZSBhbmQgd2UgYXJlIG5vdCBpbiB0aGUgZnVsbCBzY3JlZW4gKGZ1bGwgcGFnZSBtb2RlKSwgdGhpc1xuICAgICAqIGlzIGh0ZSBudW1iZXIgb2YgbGluZXMgdGhhdCBEVCB3aWxsIHNob3dcbiAgICAgKlxuICAgICAqIHRvZG86IGNvbWUgdXAgd2l0aCBiZXR0ZXIgbmFtZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheVJvd1NpemU6IG51bWJlciA9IDEwO1xuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBwYWdpbmcgb24gbGF6eSBsb2FkaW5nIHVzaW5nIGluZmluaXRlIHNjcm9sbGVyIHRvIHNldCBpbml0aWFsIGZldGNoIGxpbWl0IHNpemVcbiAgICAgKlxuICAgICAqIHRvZG86IGNvbWUgdXAgd2l0aCBiZXR0ZXIgbmFtZSAhISFcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGFnZVNpemU6IG51bWJlciA9IDE1O1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRhdGFTb3VyY2U6IERUMkRhdGFTb3VyY2U7XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IG1lc3NhZ2Ugd2hlbiB0aGVyZSBhcmUgbm8gZGF0YSAuXG4gICAgICpcbiAgICAgKiB0b2RvOiBVc2UgaTE4biB2YWx1ZSBhbmQgY3JlYXRlIHJlc291cmNlIGZpbGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGVtcHR5TWVzc2FnZTogc3RyaW5nID0gJ05vIHJlY29yZHMgZm91bmQnO1xuXG5cbiAgICAvKipcbiAgICAgKiBEZXZlbG9wZXIgY2FuIHByb3ZpZGUgY3VzdG9tIHRyYWNrQnkgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gaXRlcmF0ZSBvdmVyIHRoZVxuICAgICAqIHJlY29yZHNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHJvd1RyYWNrQnk6IChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IGFueTtcblxuICAgIC8qKlxuICAgICAqIFdoZW4gdHJ1ZSBhZGRzIGN1c3RvbSBob3ZlcmluZyBjbGFzcyB0byB0aGUgdGJvZHlcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHJvd0hvdmVyOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogRG8gd2Ugc2hvdyBsb2FkaW5nIGluZGljYXRvclxuICAgICAqXG4gICAgICogVG9kbzogcmVuYW1lIHRvIHNob3dMb2FkaW5nXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsb2FkaW5nOiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3Rpb25Nb2RlOiBTZWxlY3Rpb25Nb2RlID0gJ25vbmUnO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDYW4gcHJvdmlkZSBjdXN0b20gaWNvbi4gVGhlc2UgaWNvbnMgYXJlIG5vdCBhbmltYXRlZCBkaXZzLCB3ZSB1c2VkIGNzc1xuICAgICAqIHRyYW5zZm9ybWF0aW9uIHRvIHJvdGF0ZSB0aGVtLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsb2FkaW5nSWNvbjogc3RyaW5nID0gJ2ljb24tc3luY2hyb25pemUnO1xuXG5cbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIGluZGVudCBjYW4gYmUgYWRkZWQgd2hlbiByZW5kZXJpbmcgZGV0YWlsIHJvd1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaW5kZW50RGV0YWlsUm93OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaW5kZW50YXRpb25QZXJMZXZlbDogbnVtYmVyID0gMjU7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqICBTdWJIZWFkZXIgaXMgdXNlZCB0byBzaG93IHN1bW1hcnkgY29sdW1ucywgd2hpY2ggaW4gb3VyIFVYIGlzIHNob3duIGF0IHRoZSB0b3AganVzdCB1bmRlclxuICAgICAqICB0aGUgcmVndWxhciB0YWJsZSBoZWFkZXJcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1N1YkhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU2VlIE91dGxpbmVGb3IgLSBvbmx5IHVzZWQgaW4gdGhlIHRyZWUgbW9kZVxuICAgICAqXG4gICAgICogTm90IHVzZWQgd2hlbiBbb3V0bGluZUZvcm1hdF09XCIndHJ1ZWUnXCJcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNoaWxkcmVuOiAodmFsdWU6IGFueSkgPT4gYW55W107XG5cblxuICAgIC8qKlxuICAgICAqIFdlIG1pZ2h0IGhhdmUgdGhpcyBjb25kaXRpb25hbCBhcyB0aGlzIGNhbiBiZSBkeW5hbWljIGJhc2VkIG9uIHZhbHVlLCBzbyB0aGUgc2FtZVxuICAgICAqIGFzIGNoaWxkcmVuXG4gICAgICpcbiAgICAgKiBTZWUgT3V0bGluZUZvciAtIG9ubHkgdXNlZCBpbiB0aGUgdHJlZSBtb2RlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93RXhwYW5zaW9uQ29udHJvbDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFNlZSBPdXRsaW5lRm9yIC0gb25seSB1c2VkIGluIHRoZSB0cmVlIG1vZGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4cGFuZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBPdXRsaW5lRm9yICAtIGZvcm1hdCAtIG9ubHkgdXNlZCBpbiB0aGUgdHJlZSBtb2RlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBvdXRsaW5lRm9ybWF0OiBNb2RlbEZvcm1hdCA9ICdmcmVlJztcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVzaFJvb3RTZWN0aW9uT25OZXdMaW5lOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogUmVuZGVyIG9yIGhpZGUgZXhwYW5zaW9uIGNvbnRyb2wgZm9yIHJvdyBkZXRhaWwgY29sdW1ucy4gRXhwYW5zaW9uIGNvbnRyb2wgbWFrZXMgc2Vuc2UgZm9yXG4gICAgICogc2ltcGxlIHRhYmxlLCB3aGVuIHVzaW5nIHRoaXMgaW5zaWRlIG91dGxpbmUgKHRyZWUgdGFibGUpLCBpdHMgZHJpdmVuIGJ5IG91dGxpbmUgY29udHJvbFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1Jvd0RldGFpbEV4cGFuc2lvbkNvbnRyb2w6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dTZWxlY3Rpb25Db2x1bW46IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1NlbGVjdEFsbDogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIFNob3cgb3IgaGlkZSBnbG9iYWwgc2VhcmNoIHRlcm0gaW5wdXQgZmllbGQgaW4gdGhlIGhlYWRlclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd0dsb2JhbFNlYXJjaDogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIEluIGNhc2UgZnJvemVuIGNvbHVtbiBhcmUgdXNpbmcgd2UgY2FuIHNwZWNpZnkgb24gZ2xvYmFsIGxldmVsIHRvdGFsIHdpZHRoIG9mIHRoZSB0YWJsZSB0aGVcbiAgICAgKiBvdmVyZmxvd2luZyBjb250ZW50IG9yIHdpZHRoIGZvciBlYWNoIGNvbHVtbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNjcm9sbFdpZHRoOiBhbnk7XG5cblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgcm93IHJlb3JkZXJpbmdcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZG5kUm93RW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBGaXJlcyBldmVudCB0aGF0IHNvcnRpbmcgaXMgZW5hYmxlZCBmb3IgY29sdW1uIGFuZCB3ZSB0cmlnZ2VyIHNvcnRpbmdcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEJhc2VkIG9uIHNlbGVjdGlvbiBtb2RlIGl0IHRyaWdnZXJzIGV2ZW5cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIG11bHRpIG9yIHNpbmdsZSBzZWxlY3Rpb24gbW9kZSBpcyBlbmFibGVkIGl0IHdpbGwgdHJpZ2dlciBldmVudCB3aGVuIGNoZWNrYm94IG9yXG4gICAgICogcmFkaW8gYnV0dG9ucyBpcyBzZWxlY3RlZFxuICAgICAqXG4gICAgICogdG9kbzogaW1wbGVtZW50IFNpbmdsZVNlbGVjdGlvbkRUQ29sdW1uLCBNdWx0aVNlbGVjdGlvbkRUQ29sdW1uIHdpdGggdGhlaXIgcmVuZGVyZXJzXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25Sb3dTZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGNlbGwgYm9keSBzZWxlY3Rpb24gY2hhbmdlcyB3ZSBmaXJlIGV2ZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkNlbGxDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBjZWxsIGhlYWRlciBzZWxlY3Rpb24gY2hhbmdlcyB3ZSBmaXJlIGV2ZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkhlYWRlclNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIEBDb250ZW50Q2hpbGQoRFRIZWFkZXJDb21wb25lbnQyKVxuICAgIGhlYWRlcjogRFRIZWFkZXJDb21wb25lbnQyO1xuXG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGN1c3RvbSB0ZW1wbGF0ZSB0aGF0IGNhbiBiZSBpbXBsZW1lbnRlZCBieSBhcHBsaWNhdGlvbiB0byBzaG93IHdoZW4gdGhlcmUgYXJlXG4gICAgICogbm8gZGF0YSBpbiB0aGUgZGF0YWJsZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ25vRGF0YVRlbXBsJylcbiAgICBlbXB0eU1lc3NhZ2VUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZHRIZWFkZXInKVxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZHRTdWJIZWFkZXInKVxuICAgIHN1YkhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZHRCb2R5JylcbiAgICBib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlckZpbHRlcicpXG4gICAgaGVhZGVyRmlsdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3RzIHVzZWQgRFRDb2x1bW4gaW5zaWRlIGRhdGF0YWJsZSBhbmQgdGhlbiB0aGV5IGFyZSB1c2VkIGluc2lkZSB0aGUgdGVtcGxhdGUgdG9cbiAgICAgKiBpdGVyYXRlIG92ZXIgYW5kIHVzZSBpdHMgcmVuZGVyZXJUZW1wbGF0ZS5cbiAgICAgKlxuICAgICAqIFdoZW4gd2Ugd2lsbCBiZSBkZWZpbmluZyBuZXcgY29sdW1ucyBpdHMgaW1wb3J0YW50IHRoYXQgaXQgY2FuIGFsc28gbWF0Y2ggYWxsIHRoZVxuICAgICAqIGluaGVyaXRlZCBvbmVzLiBzbyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSBkZWZpbmUgYSBwcm92aWRlciB0aG9zZSB0aG9zZSBjb2x1bW5zIHRvIHBvaW50XG4gICAgICogdG8gdGhlIERUQ29sdW1uQ29tcG9uZW50XG4gICAgICpcbiAgICAgKiBlLmcuOlxuICAgICAqXG4gICAgICoge3Byb3ZpZGU6IERUQ29sdW1uQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZXRhaWxSb3dDb2x1bW4pfVxuICAgICAqXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihEVENvbHVtbjJDb21wb25lbnQpXG4gICAgY29sc1F1ZXJ5OiBRdWVyeUxpc3Q8RFRDb2x1bW4yQ29tcG9uZW50PjtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChEVERldGFpbFJvd0NvbXBvbmVudClcbiAgICByb3dEZXRhaWxDb2x1bW46IERURGV0YWlsUm93Q29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRyaWdnZXJzIHdoZW4gaXRlbXMgaW4gdGhlIGxpc3QgYXJlIHVwZGF0ZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gICAgY2xhc3NMaXN0OiBzdHJpbmcgPSAndy1kYXRhdGFibGUgJztcblxuXG4gICAgLyoqXG4gICAgICogRm9yIGludGVybmFsIHVzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBkYXRhc2V0IHRoYXQgaXMgYmVpbmcgcmVuZGVyZWQuIFNldCBmcm9tIHRoZSBbbGlzdF0gYmluZGluZyBvciBieSBsYXp5IGxvYWQgZnJvbVxuICAgICAqIGRhdGFzb3VyY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YVRvUmVuZGVyOiBhbnlbXTtcblxuICAgIC8qKlxuICAgICAqIFdlIGNvbnZlcnQgUXVlcnlMaXN0PERUQ29sdW1uMkNvbXBvbmVudD4gdG8gdGhpcyBhcnJheSBmb3IgZWFzaWVyIG1hbmlwdWxhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBjb2x1bW5zOiBEVENvbHVtbjJDb21wb25lbnRbXTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBzZWNvbmRhcnkgbGlzdCBvZiBjb2x1bW5zIHdoaWNoIGlzIHVzZWQgaW4gY2FzZSB3ZSBoYXZlIGhhdmUgZW5hYmxlZFxuICAgICAqIGZyb3plbiBjb2x1bW5zLiBDb2x1bW5zIHRoYXQgYXJlIG1hcmtlZCBhcyBmcm96ZW4gbmVlZHMgdG8gYmUgcGxhY2VkIGludG8gc2VwYXJhdGUgYXJyYXlcbiAgICAgKiB0byBiZSByZW5kZXJlZCB3YXkgdGhhbiByZWd1bGFyIGNvbHVtbnMgd2hpY2ggYXJlIHN0b3JlZCBpbiB0aGUgY29sdW1ucyBhcnJheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZnJvemVuQ29sdW1uczogRFRDb2x1bW4yQ29tcG9uZW50W107XG5cblxuICAgIC8qKlxuICAgICAqICBJbmRpY2F0ZXMgdGhhdCBjb2x1bW5zIHdlcmUgaW5pdGlhbGVkIEFsc28gdXNlZCB3aGVuIHdlIGhpZGUgYW5kIHNob3cgY29sdW1uIHRvIHRyaWdnZXJcbiAgICAgKiAgY2hhbmdlLlxuICAgICAqXG4gICAgICovXG4gICAgcHVibGljIGNvbHVtbnNDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIHB1YmxpYyBzb3J0Q29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byBjb2xzUXVlcnkgYW5kIGl0cyBjaGFuZ2VzIHNvIHdlIGNhbiBsYXRlciBvbiByZWxlYXNlIHRoZSBzdWJzY3JpcHRpb25cbiAgICAgKi9cbiAgICBjb2x1bW5zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIGRldGFpbFJvd0V4cGFuc2lvblN0YXRlOiBEZXRhaWxSb3dFeHBhbnNpb25TdGF0ZTtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgbnVtYmVyT2ZDb2xzQmVmb3JlRGF0YTogbnVtYmVyID0gMDtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgc3RhcnRPZkZpcnN0RGF0YUNvbHVtbjogbnVtYmVyID0gMDtcblxuXG4gICAgLyoqXG4gICAgICogU2VjdGlvbiBmb3IgcHJvZ3JhbW1hdGljYWxseSBpbnN0YW50aWF0ZWQgY29sdW1ucyB0aGF0IGFyZSBhZGRlZCB0byB0aGUgbGlzdCBpZiBhZGRpdGlvbmFsXG4gICAgICogc3BhbiBvciBsb2dpYyBpcyBuZWVkZWQuXG4gICAgICpcbiAgICAgKiBUbyBwcm9ncmFtbWF0aWNhbGx5IGluc2VydCBhIG5ldyBjb2x1bW4gaW50byBjb2x1bW5zIGFycmF5IGxpa2UgZXhwYW5kbyBjb2x1bW4gZm9yIGRldGFpbFxuICAgICAqIHJvdywgb3IgU2luZ2xlU2VsZWN0LCBNdWx0aVNlbGVjdCBjb2x1bW4gd2hlbiBzZWxlY3Rpb24gaXMgZW5hYmxlZCB3ZSBuZWVkIHRvIHVzZVxuICAgICAqIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB0byBpbnN0YW50aWF0ZSBhIG5ldyBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJvd0RldGFpbEV4cGFuZENvbHVtbjogRFREZXRhaWxSb3dFeHBhbmRlckNvbXBvbmVudDtcbiAgICBwcml2YXRlIG11bHRpU2VsZWN0Q29sdW1uOiBEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50O1xuICAgIHByaXZhdGUgc2luZ2xlU2VsZWN0Q29sdW1uOiBEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJbiBjYXNlIG9mIG91dGxpbmUgdGFibGUgd2UgYXJlIGluamVjdCBPdXRsaW5lU3RhdGUgd2hpY2ggaXMgcHJvdmlkZWQgaW4gdGhlIERUIGNvbXBvbmVudFxuICAgICAqIGRlZmluaXRpb24uIFRoaXMgaXMgdXNlZCBieSBuZXN0ZWQgb3V0bGluZUZvciBjb21wb25lbnQgaXQgc2V0IGl0c2VsZiBhcyByZWZlcmVuY2UgYW5kXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgc3RhdGUgc28gaXQgY2FuIGJlIHVzZWQgbGF0ZXIgb24gaW5zaWRlIE91dGxpbmVDb250cm9sXG4gICAgICpcbiAgICAgKlxuICAgICAqIEVhY2ggRGF0YXRhYmxlIGlzIHByZS1kZWZhdWx0ZWQgd2l0aCBpdHMgb3duIHZlcnNpb24gb2YgRGF0YVNvdXJjZSBzbyBhbGwgdGhlIG9ic2VydmVyc1xuICAgICAqIGluc2lkZSBhcmUgdW5pcXVlIGZvciB0aGlzIGNvbXBvbmVudFxuICAgICAqXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBASW5qZWN0KERBVEFfU09VUkNFKSBwcml2YXRlIF9kZWZhdWx0RFM6IERUMkRhdGFTb3VyY2UsXG4gICAgICAgICAgICAgICAgcHVibGljIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwdWJsaWMgZmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHVibGljIG91dGxpbmVTdGF0ZTogT3V0bGluZVN0YXRlLFxuICAgICAgICAgICAgICAgIHB1YmxpYyB6b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuX2RlZmF1bHREUztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBzdGF0ZSBvdXQgdG8gYXBwbGljYXRpb24uIENhbiBiZSB1c2UgYXMgdHdvIHdheSBiaW5kaW5nc1xuICAgICAqXG4gICAgICogWyhzdGF0ZSldPWR0U3RhdGUocylcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0YXRlKCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZS5zdGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgc3RhdGUodmFsOiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUgPSB2YWw7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcblxuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkgJiYgaXNQcmVzZW50KHRoaXMuZGVzdGluYXRpb25DbGFzcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbm5vdCB1c2UgYm90aCBiaW5kaW5ncyBbbGlzdF0gYW5kIFtkZXN0aW5hdGlvbkNsYXNzXSEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlID0gbmV3IERldGFpbFJvd0V4cGFuc2lvblN0YXRlKHRoaXMpO1xuXG4gICAgICAgIC8vIGluaXQgZGVmYXVsdCBjb2x1bW5zXG4gICAgICAgIHRoaXMucm93RGV0YWlsRXhwYW5kQ29sdW1uID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50KS5jcmVhdGUodGhpcy5pbmplY3RvcikuaW5zdGFuY2U7XG5cblxuICAgICAgICB0aGlzLm11bHRpU2VsZWN0Q29sdW1uID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50KS5jcmVhdGUodGhpcy5pbmplY3RvcikuaW5zdGFuY2U7XG5cbiAgICAgICAgdGhpcy5zaW5nbGVTZWxlY3RDb2x1bW4gPSB0aGlzLmZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50KS5jcmVhdGUodGhpcy5pbmplY3RvcikuaW5zdGFuY2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoZSBkYXRhIGFyZSBub3QgZGVmZXJyZWQgYW5kIHdlIGdldCBsaXN0IGRpcmVjdGx5IHRoZW4gaXQgY3JlYXRlcyBEUy4gSWZcbiAgICAgICAgICogbmdPbkNoYW5nZXMgaXMgY2FsbGVkIGZpcnN0IHdlIHByb3Blcmx5IGluaXQgRFMgYW5kIGNsZWFuIHRoaXMubGlzdFxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmRlc3RpbmF0aW9uQ2xhc3MpIHx8IGlzUHJlc2VudCh0aGlzLmxpc3QpKSB7XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhc291cmNlKCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFTb3VyY2UuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGFzb3VyY2UoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2luY2Ugd2Ugd29yayB3aXRoIHJlZmVyZW5jZXMgbGV0J3MgcGFzcyBjcmVhdGVkIG1hcCBpbnNpZGUgb3VyIHN0YXRlXG4gICAgICAgIHRoaXMub3V0bGluZVN0YXRlLmV4cGFuc2lvblN0YXRlcyA9IHRoaXMuc3RhdGUub3V0bGluZVN0YXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gZGF0YSBhcnJpdmVzIGxhdGVyIG1heWJlIGR1ZSB0byBSRVNUIEFQSSBsYXRlbmN5LCBpbml0aWFsaXplIERTIG9ubHkgd2hlbiB3ZSBoYXZlIGFcbiAgICAgKiBkYXRhLCBvdGhlcndpc2UgaWYgZGF0YSBjaGFuZ2VkIHRocnUgdGhlIGJpbmRpbmdzIGp1c3QgdHJpZ2dlciBkYXRhQ2hhbmdlIGV2ZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xpc3QnXSAmJiBpc1ByZXNlbnQoY2hhbmdlc1snbGlzdCddLmN1cnJlbnRWYWx1ZSlcbiAgICAgICAgICAgICYmICF0aGlzLmRhdGFTb3VyY2UuaW5pdGlhbGl6ZWQpXG4gICAgICAgIHtcblxuICAgICAgICAgICAgdGhpcy5pbml0RGF0YXNvdXJjZSgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhU291cmNlLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQodGhpcy5saXN0KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KClcbiAgICB7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGluaXQgYSBzdGF0ZSB3aGVuIGRldGFpbCBjb2x1bW4gaXMgcHJlc2VudFxuICAgICAgICAvLyB0b2RvOiBtb3ZlIHRoaXMgaW5pdGlhbGl6YXRpb24gdG8gZGF0YXNvdXJjZVxuICAgICAgICB0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLmRldGFpbEV4cGFuc2lvbkVuYWJsZWQgPSBpc1ByZXNlbnQodGhpcy5yb3dEZXRhaWxDb2x1bW4pO1xuXG4gICAgICAgIHRoaXMuaW5pdENvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zU3Vic2NyaXB0aW9uID0gdGhpcy5jb2xzUXVlcnkuY2hhbmdlcy5zdWJzY3JpYmUoXyA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmluaXRDb2x1bW5zKCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKVxuICAgIHtcbiAgICAgICAgLy8gYXNzaWduIGl0IHByb2dyYW1hdGljYWxseSBhcyB3ZSB3YW50IHRvIGhhdmUgYSBjb250ZXh0IGZvciB0aGUgZmlsdGVyXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5yb3dEZXRhaWxDb2x1bW4pICYmIGlzUHJlc2VudCh0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvci5maWx0ZXJPdXQgPSB0aGlzLnNraXBPdXRsaW5lSXRlbS5iaW5kKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yKSkge1xuICAgICAgICAgICAgLy8gdGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvci5jaGFuZ2VEZXRlY3Rvci5kZXRhY2goKTtcbiAgICAgICAgICAgIC8vIHRoaXMub3V0bGluZVN0YXRlLm91dGxpbmVGb3IuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnNDaGFuZ2VkICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0Zyb3plbkNvbHVtbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5mcm96ZW5Db2x1bW5zLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50LCBpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICAgICAgICAgIGNvbC5wb3N0SW5pdGlhbGl6ZShpbmRleCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50LCBpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICAgICAgICAgIGNvbC5wb3N0SW5pdGlhbGl6ZShpbmRleCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogS2V5IGVudHJ5IG1ldGhvZCB0aGF0IGluaXRpYWxpemVkIG91ciBjb2x1bW5zLiBMYXRlciBvbiB3aGVuIHdlIHdpbGwgc3VwcG9ydCBzZWxlY3Rpb24gYW5kXG4gICAgICogbXVsdGlzZWxlY3Rpb24gd2Ugd2lsbCBwcm9ncmFtbWF0aWNhbGx5IGluc3RhbnRpYXRlIFNpbmdsZVNlbGVjdGlvbiwgTXVsdGlTZWxlY3Rpb24gY29sdW1uXG4gICAgICogY29tcG9uZW50cyBhbmQgYWRkIHRoZW0gdG8gdGhlIGxpc3Qgc28gdGhleSBjYW4gYmUgcmVuZGVyZWQuXG4gICAgICpcbiAgICAgKiBzbyB0aGUgaWRlYSBoZXJlIGlzOlxuICAgICAqXG4gICAgICogV2hlbiBEVCBjb21wb25lbnQgaW5pdGlhbGl6ZSBhbmQgd2UgYXJlIGluIGVkaXRpbmcgbW9kZSBhbmQgd2Ugc3VwcG9ydCBTaW5nbGUvTXVsdGkgc2VsZWN0aW9uXG4gICAgICogd2Ugd2lsbCB1c2UgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHRvIGNyZWF0ZSBjb21wb25lbnQgYW5kIGFkZCBpdCBhcyBmaXJzdCBpdGVtIHRvIHRoZSBsaXN0XG4gICAgICogYW5kIHRoZW4gaXQgd2lsbCBiZSByZW5kZXJlZCBqdXN0IGxpa2UgYW55dGhpZ24gZWxzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGluaXRDb2x1bW5zKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgICAgICB0aGlzLmZyb3plbkNvbHVtbnMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5kZXRhaWxFeHBhbnNpb25FbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXREZXRhaWxDb2x1bW5FeHBhbnNpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oYXNMZWFkaW5nU2VsZWN0Q29sdW1uKCkgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGknKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpU2VsZWN0Q29sdW1uLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaCh0aGlzLm11bHRpU2VsZWN0Q29sdW1uKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICB0aGlzLnNpbmdsZVNlbGVjdENvbHVtbi5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2godGhpcy5zaW5nbGVTZWxlY3RDb2x1bW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBleHBhbnNpb24gY29sdW1uIHdoZW4gZGV0YWlsIHJvdyBpcyBlbmFibGVkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5kZXRhaWxFeHBhbnNpb25FbmFibGVkICYmICF0aGlzLmlzT3V0bGluZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnJvd0RldGFpbEV4cGFuZENvbHVtbi5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2godGhpcy5yb3dEZXRhaWxFeHBhbmRDb2x1bW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2xzUXVlcnlcbiAgICAgICAgICAgIC5maWx0ZXIoKGNvbDE6IERUQ29sdW1uMkNvbXBvbmVudCkgPT4gIWNvbDEuZnJvemVuKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbC5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluaXRGcm96ZW5Db2x1bW5zKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbHVtbkluZm8oKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgY3VycmVudCBjb2x1bW4gaXMgcHJvZ3JhbW1hdGljYWxseSBjcmVhdGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0ludGVybmFsQ29sdW1uKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGNvbCBpbnN0YW5jZW9mIERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50IHx8XG4gICAgICAgICAgICBjb2wgaW5zdGFuY2VvZiBEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50IHx8XG4gICAgICAgICAgICBjb2wgaW5zdGFuY2VvZiBEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBEYXRhc291cmNlIGJhc2VkIG9uIHBhc3NlZCB2YWx1ZXMuIEl0IHRyaWVzIHRvIGluaXRpYWxpemUgRFMgZm9yIGZpcnN0IHRpbWVcbiAgICAgKiBpbnNpZGUgdGhlIG5nSW5pdCBidXQgaW4gY2FzZSBEYXRhIGFycml2ZXMgbGF0ZXIgbWF5YmUgZHVlIHRvIHNvbWUgUkVTVCBBUEkgY2FsbHMgdGhpc1xuICAgICAqIGNhbiBiZSB0cmlnZ2VyZWQgYWxzbyBmcm9tIG5nT25DaGFuZ2VzLlxuICAgICAqXG4gICAgICovXG4gICAgaW5pdERhdGFzb3VyY2UoaW5pdGlhbGl6ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IERhdGF0YWJsZTJTdGF0ZS5jcmVhdGUoMCwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5kaXNwbGF5Um93U2l6ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxTb3J0S2V5LCB0aGlzLnNvcnRPcmRlcmluZ0ZvclN0cmluZyh0aGlzLmluaXRpYWxTb3J0T3JkZXIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUubGltaXQgPSB0aGlzLnN0YXRlLmRpc3BsYXlMaW1pdCA9IHRoaXMuZGlzcGxheVJvd1NpemU7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuaW5pdGlhbFNvcnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zb3J0S2V5ID0gdGhpcy5pbml0aWFsU29ydEtleTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNvcnRPcmRlciA9IHRoaXMuc29ydE9yZGVyaW5nRm9yU3RyaW5nKHRoaXMuaW5pdGlhbFNvcnRPcmRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5pdGlhbGl6ZSkge1xuXG4gICAgICAgICAgICBsZXQgcVR5cGUgPSAodGhpcy5pc091dGxpbmUoKSAmJiB0aGlzLm91dGxpbmVGb3JtYXQgPT09ICd0cmVlJykgP1xuICAgICAgICAgICAgICAgIFF1ZXJ5VHlwZS5GdWxsVGV4dE91dGxpbmUgOiBRdWVyeVR5cGUuRnVsbFRleHQ7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5pbml0KHtcbiAgICAgICAgICAgICAgICBvYmo6IGlzUHJlc2VudCh0aGlzLmRlc3RpbmF0aW9uQ2xhc3MpID8gdGhpcy5kZXN0aW5hdGlvbkNsYXNzIDogdGhpcy5saXN0LFxuICAgICAgICAgICAgICAgIHF1ZXJ5VHlwZTogcVR5cGUsXG4gICAgICAgICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmV0Y2godGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgLy8gcmVzZXQgbGlzdCB0byBtYWtlIHN1cmUgaXQgY29tZXMgZnJvbSBEYXRhUHJvdmlkZXIsIHdlIHVzZSBsaXN0ICB0byBpbml0aWFsaXplXG4gICAgICAgIHRoaXMubGlzdCA9IG51bGw7XG5cbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgRU5UUlkgcG9pbnQgZm9yIHRoZSBEQVRBIENIQU5HRVMuIEFsbCBhZGRpdGlvbiwgZWRpdHMsIGRlbGV0aW9uIGVuZHMgdXBcbiAgICAgICAgLy8gaGVyZS4gV2UgZG9udCB3b3JrIGRpcmVjdGx5IHdpdGggTElTVC4gQW55IGNoYW5nZSBpcyByZWFjdGl2ZSBhbmQgaGVyZSBpcyBsaXN0ZW5lclxuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uub3BlbigpLnN1YnNjcmliZSgoZGF0YTogYW55W10pID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBkZXRhaWxSb3cgY29sdW1uIGlzIHByZXNlbnQgd2UgaW5pdGlhbGl6ZSBhIHN0YXRlIGhvbGRpbmcgaW5mb3JtYXRpb24gd2hpY2ggaXRlbSBpc1xuICAgICAqIGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogdG9kbzogVGhpcyBpcyB0ZW1wb3JhcnkgaGVyZSBhbmQgb25jZSB3ZSBzdXBvcnQgbGF6eSBsb2FkaW5nIG1vdmUgdGhpcyB0byBkYXRhc291cmNlLlxuICAgICAqXG4gICAgICogRm9yIGV4YW1wbGUgZm9yIG91dGxpbmUgdHJlZSB0YWJsZSB3ZSBuZWVkIHRvIGNvbm5lY3QgYSBzdGF0ZSBmcm9tIG91dGxpbmUgd2l0aCBhIHN0YXRlIGluXG4gICAgICogaGVyZSBhcyB3ZSBhcmUgdXNpbmcgb3V0bGluZSBjb250cm9sIHRvIGV4cGFuZCBhbmQgY29sbGFwc2UgaXRlbXNcbiAgICAgKi9cbiAgICBpbml0RGV0YWlsQ29sdW1uRXhwYW5zaW9uKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5yb3dEZXRhaWxDb2x1bW4pKSB7XG4gICAgICAgICAgICB0aGlzLnJvd0RldGFpbENvbHVtbi5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCA9IGlzUHJlc2VudCh0aGlzLnJvd0RldGFpbENvbHVtbikgJiZcbiAgICAgICAgICAgIEJvb2xlYW5XcmFwcGVyLmlzVHJ1ZSh0aGlzLnNob3dSb3dEZXRhaWxFeHBhbnNpb25Db250cm9sKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBleGVjdXRlZCBhZnRlciB3ZSBpbml0aWFsaXplIGFsbCB0aGUgY29sdW1ucyBpbiBvcmRlciB0byBjYWxjdWxhdGUgY29ycmVjdFxuICAgICAqIG51bWJlcnMgdXNlZCBmb3IgaW5kZW50YXRpb24gd2hpbGUgcmVuZGVyaW5nIHNlbGVjdGlvbiBjb2x1bW5zIGFzIHdlbGwgYXMgZGV0YWlsIHJvdyBjb2x1bW5zLlxuICAgICAqXG4gICAgICogSGVyZSB3ZSBuZWVkIHRvIGJlIGF3YXJlIGhvdyBtYW55IGNvbHVtbnMgdG8gc3BhblxuICAgICAqXG4gICAgICovXG4gICAgaW5pdENvbHVtbkluZm8oKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5udW1iZXJPZkNvbHNCZWZvcmVEYXRhID0gMDtcblxuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghY29sLmlzVmFsdWVDb2x1bW4oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyT2ZDb2xzQmVmb3JlRGF0YSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5pbmRlbnREZXRhaWxSb3cpIHtcbiAgICAgICAgICAgIHRoaXMubnVtYmVyT2ZDb2xzQmVmb3JlRGF0YSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGFydE9mRmlyc3REYXRhQ29sdW1uID0gdGhpcy5jb2x1bW5zLmxlbmd0aCAtIHRoaXMubnVtYmVyT2ZDb2xzQmVmb3JlRGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ2VsbFNlbGVjdGlvbkNoYW5nZShjZWxsOiBhbnksIGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlICE9PSAnY2VsbCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbG9va3VwS2V5ID0ge1xuICAgICAgICAgICAgY29sOiBjb2x1bW4ua2V5IHx8IGNvbHVtbi5sYWJlbCxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0YXRlLnNlbGVjdGlvbikgJiYgdGhpcy5zdGF0ZS5zZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBsZXQgZm91bmRJbmRleCA9IExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGxvb2t1cEtleSk7XG4gICAgICAgICAgICBsZXQgaXNTZWxlY3RlZCA9IGZvdW5kSW5kZXggIT09IC0xO1xuXG4gICAgICAgICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodmFsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGluZGV4ICE9PSBmb3VuZEluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbLi4udGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGxvb2t1cEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFtsb29rdXBLZXldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25DZWxsQ2hhbmdlLmVtaXQodGhpcy5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25IZWFkZXJTZWxlY3Rpb25DaGFuZ2UoY2VsbDogYW55LCBjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0hlYWRlclNlbGVjdGVkKGNvbHVtbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uID0gY29sdW1uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24gPSBjb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkhlYWRlclNlbGVjdGlvbi5lbWl0KHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uKTtcbiAgICB9XG5cbiAgICBvbkhhbmRsZVJvd0NsaWNrZWQoZXZlbnQ6IGFueSwgaXRlbTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gc3BlY2lhbCBhbHQga2V5IG1vZGlmaWVyLiBXaGVuIHVzZWQgd2l0aCByb3dzIGl0IGluZGljYXRlcyB0aGVyZSBpcyBhIEQmRCBlbmFibGVkXG4gICAgICAgIGlmIChldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aScpIHtcbiAgICAgICAgICAgIHRoaXMub25Sb3dUb2dnbGUoZXZlbnQsIGl0ZW0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5vblJvd1NlbGVjdChldmVudCwgaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uUm93VG9nZ2xlKGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCByb3dTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdGF0ZS5zZWxlY3Rpb24pICYmIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBmb3VuZEluZGV4ID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgaXRlbSk7XG4gICAgICAgICAgICBsZXQgaXNTZWxlY3RlZCA9IGZvdW5kSW5kZXggIT09IC0xO1xuXG4gICAgICAgICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodmFsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGluZGV4ICE9PSBmb3VuZEluZGV4KTtcblxuICAgICAgICAgICAgICAgIHJvd1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gWy4uLnRoaXMuc3RhdGUuc2VsZWN0aW9uLCBpdGVtXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZm9yIHRoZSBvdXRsaW5lIGdvIHVwIGFuZCBkb3duIHRoZSBzeW5jIHdpdGggdHJlZWl0ZW1zXG4gICAgICAgICAgICBpZiAodGhpcy5pc091dGxpbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbihpdGVtLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9QYXJlbnQoaXRlbSwgaXNTZWxlY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFtpdGVtXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oaXRlbSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMub0hhbmRsZU91dGxpbmVSb3dUb2dnbGVUb1BhcmVudChpdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUm93U2VsZWN0aW9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgaXNTZWxlY3RlZDogcm93U2VsZWN0ZWQsXG4gICAgICAgICAgICBpdGVtOiB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICB9KTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uUm93U2VsZWN0KGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gaXRlbTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vblJvd1NlbGVjdGlvbkNoYW5nZS5lbWl0KGl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbihjdXJyZW50SXRlbTogYW55LCBpc1NlbGVjdGVkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuRm9yTm9kZSA9IHRoaXMuY2hpbGRyZW4uYXBwbHkodGhpcy5jb250ZXh0LCBbY3VycmVudEl0ZW1dKSB8fCBbXTtcblxuICAgICAgICBpZiAoY2hpbGRyZW5Gb3JOb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIGlzIHNlbGVjdGVkIGN1cnJlbnRseSB0aGVuIHRvZ2dsZSB0byBvdGhlciBzdGF0ZVxuICAgICAgICAgICAgaWYgKCFpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gd2hlbiBjaGVja2luZyBhbGwgZnJvbSByb290LCBkZXNlbGVjdCBjaGlsZHJlbiBhbmQgYWRkIGFsbFxuICAgICAgICAgICAgICAgIHRoaXMub25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbihjdXJyZW50SXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbLi4udGhpcy5zdGF0ZS5zZWxlY3Rpb24sIC4uLmNoaWxkcmVuRm9yTm9kZV07XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGVhY2ggY2hpbGRcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbkZvck5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvdW5kSW5kZXggPSBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBpbmRleCAhPT0gZm91bmRJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhcHBseSB0aGUgc2FtZSBmb3IgY2hpbGRyZW4gb2YgY2hpbGRyZW5cbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuRm9yTm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbihjaGlsZCwgaXNTZWxlY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9QYXJlbnQoY3VycmVudEl0ZW06IGFueSwgaXNTZWxlY3RlZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBjdXJyZW50SXRlbS4kJHBhcmVudEl0ZW07XG4gICAgICAgIGlmIChpc1ByZXNlbnQocGFyZW50KSkge1xuICAgICAgICAgICAgbGV0IGNoaWxkcmVuRm9yTm9kZSA9IHRoaXMuY2hpbGRyZW4uYXBwbHkodGhpcy5jb250ZXh0LCBbcGFyZW50XSkgfHwgW107XG5cbiAgICAgICAgICAgIGxldCBhbGxTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbkZvck5vZGUpIHtcbiAgICAgICAgICAgICAgICBhbGxTZWxlY3RlZCA9IExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGNoaWxkKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICAgJiYgYWxsU2VsZWN0ZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChhbGxTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbi5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghYWxsU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudEluZGV4ID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBpbmRleCAhPT0gcGFyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub0hhbmRsZU91dGxpbmVSb3dUb2dnbGVUb1BhcmVudChjdXJyZW50SXRlbS4kJHBhcmVudEl0ZW0sIGlzU2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkRuRFJvd0Ryb3Aob3JpZ1BvczogbnVtYmVyLCBuZXdQb3M6IG51bWJlciwgZHJvcFBvczogRHJvcFBvc2l0aW9uKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmRhdGFTb3VyY2UpKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnRHJvcHBpbmcgcm93ICM6ICcsIG9yaWdQb3MgKyAnICcgKyBkcm9wUG9zICsgJyByb3cgIzogJyArIG5ld1Bvcyk7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UucmVvcmRlclJvd3Mob3JpZ1BvcywgbmV3UG9zLCBkcm9wUG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25PdXRsaW5lRXhwYW5kQ2hhbmdlKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgaXRlbSA9IGV2ZW50Lml0ZW07XG5cbiAgICAgICAgLy8gV2UgZG9udCByZWFsbHkgbmVlZCB0byBzdG9yZSBhIHN0YXRlIGZvcm0gb3V0bGluZSBsb2NhbGx5IGFzIHdlIGFyZSB1c2luZyB0aGUgc2FtZSBvYmplY3RcbiAgICAgICAgLy8gcmVmZXJlbmNlXG4gICAgICAgIC8vIHRoaXMuc3RhdGUub3V0bGluZVN0YXRlID0gdGhpcy5vdXRsaW5lU3RhdGUuZXhwYW5zaW9uU3RhdGVzO1xuXG4gICAgICAgIGlmICh0aGlzLmNhblVzZUZvckRldGFpbFJvdyhpdGVtKSkge1xuICAgICAgICAgICAgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS50b2dnbGUoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgc29ydFNpbmdsZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkgJiYgaXNQcmVzZW50KHRoaXMuc29ydENvbHVtbikpIHtcblxuICAgICAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLnNvcnRDb2x1bW4ua2V5KSwgJ0ludmFsaWQgY29sdW1uIHRvIHNvcnQnKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0KHRoaXMuc29ydENvbHVtbi5rZXksIHRoaXMuc29ydENvbHVtbi5zb3J0T3JkZXIpO1xuXG4gICAgICAgICAgICB0aGlzLm9uU29ydC5lbWl0KHtcbiAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5zb3J0Q29sdW1uLmtleSxcbiAgICAgICAgICAgICAgICBvcmRlcjogdGhpcy5zb3J0Q29sdW1uLnNvcnRPcmRlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhbmRsZURhdGFDaGFuZ2UoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc29ydEtleSB8fCB0aGlzLnNvcnRDb2x1bW4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zb3J0Q29sdW1uICYmIHRoaXMuY29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydENvbHVtbiA9IHRoaXMuY29sdW1ucy5maW5kKFxuICAgICAgICAgICAgICAgICAgICBjb2wgPT4gY29sLmtleSA9PT0gdGhpcy5zdGF0ZS5zb3J0S2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YVRvUmVuZGVyKCk7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLmxpc3QpO1xuICAgIH1cblxuICAgIHVwZGF0ZURhdGFUb1JlbmRlcihkYXRhc291cmNlPzogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5kYXRhVG9SZW5kZXIgPSBkYXRhc291cmNlIHx8IHRoaXMubGlzdDtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmNoaWxkcmVuKSAmJiBpc1ByZXNlbnQodGhpcy5kYXRhVG9SZW5kZXIpXG4gICAgICAgICAgICAmJiB0aGlzLmRhdGFUb1JlbmRlci5sZW5ndGggPiAwICYmIGlzT3V0bGluZU5vZGUodGhpcy5kYXRhVG9SZW5kZXJbMF0pKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmVGb3JtYXQgPSAndHJlZSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICByZXNldCgpXG4gICAge1xuICAgICAgICB0aGlzLnNvcnRDb2x1bW4gPSBudWxsO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGFUb1JlbmRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIGlzSGVhZGVyU2VsZWN0ZWQoaXRlbTogRFRDb2x1bW4yQ29tcG9uZW50KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29sTWF0Y2hlZCA9IGl0ZW0ua2V5IHx8IGl0ZW0ubGFiZWw7XG4gICAgICAgIGxldCBjdXJyZW50Q29sID0gdGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24ua2V5IHx8IHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uLmxhYmVsO1xuICAgICAgICByZXR1cm4gY29sTWF0Y2hlZCA9PT0gY3VycmVudENvbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaXNCb2R5Q2VsbFNlbGVjdGVkKGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgbG9va3VwS2V5ID0ge1xuICAgICAgICAgICAgY29sOiBjb2x1bW4ua2V5IHx8IGNvbHVtbi5sYWJlbCxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLnN0YXRlLnNlbGVjdGlvbikgJiZcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGxvb2t1cEtleSkgIT09IC0xO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGlzUm93U2VsZWN0ZWQoaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpICYmIGlzUHJlc2VudCh0aGlzLnN0YXRlLnNlbGVjdGlvbikpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBpdGVtKSAhPT0gLTE7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcXVhbHModGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERvIHdlIGhhdmUgZGF0YSB0byByZW5kZXIgVXNlZCBpbnNpZGUgdGVtcGxhdGUgdG8gdGVsbCBpZiB3ZSBzaG91bGQgdXNlIHRoZSBOb0RhdGEgdGVtcGxhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGlzRW1wdHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzQmxhbmsodGhpcy5kYXRhVG9SZW5kZXIpIHx8ICh0aGlzLmRhdGFUb1JlbmRlci5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIGhhc0Zyb3plbkNvbHVtbnMoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmZyb3plbkNvbHVtbnMpICYmIHRoaXMuZnJvemVuQ29sdW1ucy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIGhhc0ludmlzaWJsZVNlbGVjdGlvbkNvbHVtbigpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNMZWFkaW5nU2VsZWN0Q29sdW1uKCkgJiYgIXRoaXMuc2hvd1NlbGVjdGlvbkNvbHVtbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlICE9PSAnbm9uZScgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlICE9PSAnY2VsbCc7XG4gICAgfVxuXG4gICAgdmlzaWJsZUNvbHVtbnMoKTogRFRDb2x1bW4yQ29tcG9uZW50W11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbHVtbnMgPyB0aGlzLmNvbHVtbnMuZmlsdGVyKGMgPT4gYy5pc1Zpc2libGUpIDogW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBzb3J0T3JkZXJpbmdGb3JTdHJpbmcoZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKGRpcmVjdGlvbikgfHwgZGlyZWN0aW9uID09PSAnYXNjZW5kaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayhkaXJlY3Rpb24pIHx8IGRpcmVjdGlvbiA9PT0gJ2Rlc2NlbmRpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdG9kbzogbG9nIGJhZCBrZXlcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgc29ydE9yZGVyaW5nRm9yTnVtYmVyKGRpcmVjdGlvbjogbnVtYmVyKTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhkaXJlY3Rpb24pIHx8IGRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuICdhc2NlbmRpbmcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoZGlyZWN0aW9uKSB8fCBkaXJlY3Rpb24gPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Rlc2NlbmRpbmcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRvZG86IGxvZyBiYWQga2V5XG4gICAgICAgIHJldHVybiAnYXNjZW5kaW5nJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIHRvZ2dsZUFsbENvbHVtbnMoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBjdXJyZW50SXRlbXMgPSB0aGlzLmRhdGFUb1JlbmRlciB8fCBbXTtcbiAgICAgICAgbGV0IHNlbGVjdGVkT2JqZWN0ID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb24gfHwgW107XG4gICAgICAgIGlmIChzZWxlY3RlZE9iamVjdC5sZW5ndGggPj0gY3VycmVudEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gW107XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFsuLi5jdXJyZW50SXRlbXNdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGlzVG9nZ2xlQWxsQ29sdW1uU2VsZWN0ZWQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtcyA9IHRoaXMuZGF0YVRvUmVuZGVyIHx8IFtdO1xuICAgICAgICBsZXQgc2VsZWN0ZWRPYmplY3QgPSB0aGlzLnN0YXRlLnNlbGVjdGlvbiB8fCBbXTtcblxuICAgICAgICByZXR1cm4gY3VycmVudEl0ZW1zLmxlbmd0aCA+IDAgJiYgc2VsZWN0ZWRPYmplY3QubGVuZ3RoID49IGN1cnJlbnRJdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNUb2dnbGVBbGxDb2x1bW5EaXNhYmxlZCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW1zID0gdGhpcy5kYXRhVG9SZW5kZXIgfHwgW107XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtcy5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VkIGJ5IHRlbXBsYXRlIHRvIGRlY2lkZSBpZiB3ZSBuZWVkIHRvIHJlbmRlciBEZXRhaWxSb3cgdGVtcGxhdGUuIFdlIG5lZWQgdG8gaGF2ZVxuICAgICAqIERldGFpbFJvdyBDb250ZW50Q2hpbGQgYW5kIHVzaW5nIERldGFpbFJvdyBjb21wb25lbnQgW2lzVmlzaWJsZUZuXSBmdW5jdGlvbiBiaW5kaW5nIHdlXG4gICAgICogY2hlY2sgaWYgdGhlIGl0ZW0gdGhhdCBpcyBhYm91dCB0byBiZSByZW5kZXJlZCBpcyBlbGlnaWJsZSBmb3IgZGV0YWlsIHJvd1xuICAgICAqXG4gICAgICovXG4gICAgc2hvd0RldGFpbENvbHVtbihpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodGhpcy5jYW5Vc2VGb3JEZXRhaWxSb3coaXRlbSkgJiYgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5pc0V4cGFuZGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGlzT3V0bGluZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuY2hpbGRyZW4pIHx8IHRoaXMub3V0bGluZUZvcm1hdCA9PT0gJ3RyZWUnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBkZWFsaW5nIHdpdGggZGV0YWlsIGNvbHVtbiAoZGV0YWlsIHJvdykgYW5kIG91dGxpbmUgYWxsIHRvZ2V0aGVyIHdlIG5lZWQgaGF2ZSBhXG4gICAgICogbWVjaGFuaXNtIHRvIHRlbGwgdG8gdGhlIG91dGxpbmUgXCJkb24ndCByZW5kZXIgdGhlIG5leHQgbGV2ZWwgb2YgaXRlbXNcIiBhbmQgdXNlIGRldGFpbCByb3cuXG4gICAgICogU28gY2VydGFpbiBpdGVtIHR5cGUgbmVlZHMgdG8gYmUgc2tpcHBlZC5cbiAgICAgKlxuICAgICAqIFRoZSB3YXkgd2Ugc2tpcCB0aG9zZSBpdGVtIGlzIHdlIHVzZSBpc1Zpc2libGVGbiBjb25kaXRpb24gb2YgdGhlIGRldGFpbCByb3cgYW5kIGxvb2sgYWhlYWRcbiAgICAgKiBpZiB3ZSBzaG91bGQgc2tpcCBuZXh0IGxldmVsLlxuICAgICAqXG4gICAgICovXG4gICAgc2tpcE91dGxpbmVJdGVtKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhblVzZUZvckRldGFpbFJvdyhpdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGdldFZhbHVlKGRhdGE6IGFueSwgZmllbGQ6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIEZpZWxkUGF0aC5nZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2VzIHN1cmUgdGhhdCB3ZSBhbHNvIGluY2x1ZGUgcHJvZ3JhbW1hdGljIGNvbHVtbiBpZiBwcmVzZW50LiBNb3ZlIHRoZW0gdG8gdGhlIGNvcnJlY3RcbiAgICAgKiBhcnJheVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0RnJvemVuQ29sdW1ucygpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmNvbHNRdWVyeVxuICAgICAgICAgICAgLmZpbHRlcigoY29sMTogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiBjb2wxLmZyb3plbilcbiAgICAgICAgICAgIC5mb3JFYWNoKChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2wuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkNvbHVtbnMucHVzaChjb2wpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5mcm96ZW5Db2x1bW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIGZpbmQgbGFzdCBpbmRleCBvZiBjb2x1bW4gdGhhdCBpcyBpbnRlcm5hbCAvIHByb2dyYW1tYXRpY1xuXG4gICAgICAgICAgICBsZXQgbGFzdElueCA9IHRoaXMuY29sdW1ucy5zbGljZSgpXG4gICAgICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgICAgIC5maW5kSW5kZXgoKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiB0aGlzLmlzSW50ZXJuYWxDb2x1bW4oY29sKSk7XG5cbiAgICAgICAgICAgIGlmIChsYXN0SW54ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLmNvbHVtbnMubGVuZ3RoIC0gMSAtIGxhc3RJbng7XG4gICAgICAgICAgICAgICAgbGV0IGludGVybmFsQ29scyA9IHRoaXMuY29sdW1ucy5zcGxpY2UoMCwgaWR4ICsgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Db2x1bW5zID0gWy4uLmludGVybmFsQ29scywgLi4udGhpcy5mcm96ZW5Db2x1bW5zXTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaGFzVmFsaWRDb2xzID0gdGhpcy5jb2x1bW5zXG4gICAgICAgICAgICAgICAgLmZpbmRJbmRleCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQpID0+IGlzQmxhbmsoY29sLndpZHRoKSkgPT09IC0xO1xuXG4gICAgICAgICAgICBhc3NlcnQoaGFzVmFsaWRDb2xzIHx8IGlzUHJlc2VudCh0aGlzLnNjcm9sbFdpZHRoKSxcbiAgICAgICAgICAgICAgICAnV2hlbiB1c2luZyBbZnJvemVuXSBiaW5kaW5nIHlvdSBuZWVkIHNwZWNpZnkgW3dpZHRoXSBmb3IgZWFjaCAnICtcbiAgICAgICAgICAgICAgICAnY29sdW1uIG9yIFtzY3JvbGxXaWR0aF0gb24gZGF0YXRhYmxlIScpO1xuXG5cbiAgICAgICAgICAgIGFzc2VydChpc0JsYW5rKHRoaXMucm93RGV0YWlsQ29sdW1uKSxcbiAgICAgICAgICAgICAgICAnWW91IGNhbm5vdCBjb21iaW5lIGF3LWR0LWRldGFpbC1jb2x1bW4gd2l0aCBmcm96ZW4gY29sdW1ucyEnKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBjdXJyZW50IGltbXV0YWJsZSBsaXN0IGFuZCB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24uIE5lZWQgdG8gd3JhcCBpdCB3aXRoXG4gICAgICogc2V0VGltZW91dCBhcyB0aGUgY2hhbmdlIGNhbiBlYXNpbHkgY29tZSBhZnRlciB2aWV3IGNoZWNrZWQgYW5kIHRoaXMgd291bGQgcmVzdWx0IHNvbWUgZXJyb3JzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUxpc3QobmV3TGlzdDogYW55W10pOiB2b2lkXG4gICAge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IG5ld0xpc3Q7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZURhdGFDaGFuZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5Vc2VGb3JEZXRhaWxSb3coaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLnJvd0RldGFpbENvbHVtbikgJiZcbiAgICAgICAgICAgICg8RFREZXRhaWxSb3dDb21wb25lbnQ+dGhpcy5yb3dEZXRhaWxDb2x1bW4pLnNob3dEZXRhaWxSb3coaXRlbSk7XG4gICAgfVxufVxuXG5cblxuIl19