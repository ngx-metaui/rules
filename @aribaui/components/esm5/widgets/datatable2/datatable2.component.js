/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var Datatable2Component = /** @class */ (function (_super) {
    tslib_1.__extends(Datatable2Component, _super);
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
     */
    function Datatable2Component(env, el, _defaultDS, changeDetector, factoryResolver, outlineState, zone, injector) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this.el = el;
        _this._defaultDS = _defaultDS;
        _this.changeDetector = changeDetector;
        _this.factoryResolver = factoryResolver;
        _this.outlineState = outlineState;
        _this.zone = zone;
        _this.injector = injector;
        /**
         *  Hides or shows table heading where we have filters and tools menus
         */
        _this.showTableHeader = true;
        /**
         * See AWDataTable
         *
         */
        _this.pivotalLayout = false;
        /**
         * See AWDataTable
         */
        _this.initialSortOrder = 'descending';
        /**
         * When DT is loaded in the page and we are not in the full screen (full page mode), this
         * is hte number of lines that DT will show
         *
         * todo: come up with better name
         */
        _this.displayRowSize = 10;
        /**
         * Used for paging on lazy loading using infinite scroller to set initial fetch limit size
         *
         * todo: come up with better name !!!
         *
         */
        _this.pageSize = 15;
        /**
         * Default message when there are no data .
         *
         * todo: Use i18n value and create resource file
         */
        _this.emptyMessage = 'No records found';
        /**
         *
         * See AWDataTable
         *
         */
        _this.selectionMode = 'none';
        /**
         *
         * Can provide custom icon. These icons are not animated divs, we used css
         * transformation to rotate them.
         *
         */
        _this.loadingIcon = 'icon-synchronize';
        /**
         * Additional indent can be added when rendering detail row
         */
        _this.indentDetailRow = false;
        /**
         * See AWDataTable
         *
         */
        _this.indentationPerLevel = 25;
        /**
         *
         *  SubHeader is used to show summary columns, which in our UX is shown at the top just under
         *  the regular table header
         *
         */
        _this.showSubHeader = false;
        /**
         * See OutlineFor - only used in the tree mode
         */
        _this.expandAll = false;
        /**
         * See AWDataTable
         */
        _this.pushRootSectionOnNewLine = true;
        /**
         * Render or hide expansion control for row detail columns. Expansion control makes sense for
         * simple table, when using this inside outline (tree table), its driven by outline control
         */
        _this.showRowDetailExpansionControl = true;
        /**
         * See AWDataTable
         *
         */
        _this.showSelectionColumn = true;
        /**
         * See AWDataTable
         *
         */
        _this.showSelectAll = true;
        /**
         * Show or hide global search term input field in the header
         */
        _this.showGlobalSearch = true;
        /**
         * Enables or disables row reordering
         *
         */
        _this.dndRowEnabled = false;
        /**
         *
         * Fires event that sorting is enabled for column and we trigger sorting
         *
         */
        _this.onSort = new EventEmitter();
        /**
         * Based on selection mode it triggers even
         *
         */
        _this.onRowClick = new EventEmitter();
        /**
         *
         * When multi or single selection mode is enabled it will trigger event when checkbox or
         * radio buttons is selected
         *
         * todo: implement SingleSelectionDTColumn, MultiSelectionDTColumn with their renderers
         */
        _this.onRowSelectionChange = new EventEmitter();
        /**
         * When cell body selection changes we fire event
         *
         */
        _this.onCellChange = new EventEmitter();
        /**
         * When cell header selection changes we fire event
         *
         */
        _this.onHeaderSelection = new EventEmitter();
        /**
         *
         * Triggers when items in the list are updated
         *
         */
        _this.valueChange = new EventEmitter();
        _this.classList = 'w-datatable ';
        /**
         *  Indicates that columns were initialed Also used when we hide and show column to trigger
         *  change.
         *
         */
        _this.columnsChanged = false;
        /**
         * See AWDataTable
         */
        _this.numberOfColsBeforeData = 0;
        /**
         * See AWDataTable
         */
        _this.startOfFirstDataColumn = 0;
        _this.dataSource = _this._defaultDS;
        return _this;
    }
    /**
     * @return {?}
     */
    Datatable2Component.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
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
    };
    /**
     * When data arrives later maybe due to REST API latency, initialize DS only when we have a
     * data, otherwise if data changed thru the bindings just trigger dataChange event
     *
     */
    /**
     * When data arrives later maybe due to REST API latency, initialize DS only when we have a
     * data, otherwise if data changed thru the bindings just trigger dataChange event
     *
     * @param {?} changes
     * @return {?}
     */
    Datatable2Component.prototype.ngOnChanges = /**
     * When data arrives later maybe due to REST API latency, initialize DS only when we have a
     * data, otherwise if data changed thru the bindings just trigger dataChange event
     *
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes['list'] && isPresent(changes['list'].currentValue)
            && !this.dataSource.initialized) {
            this.initDatasource();
        }
        else if (this.dataSource.initialized) {
            this.dataSource.dataProvider.dataChanges.next(this.list);
        }
    };
    /**
     * @return {?}
     */
    Datatable2Component.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // make sure we init a state when detail column is present
        // todo: move this initialization to datasource
        this.detailRowExpansionState.detailExpansionEnabled = isPresent(this.rowDetailColumn);
        this.initColumns();
        this.columnsSubscription = this.colsQuery.changes.subscribe(function (_) {
            _this.initColumns();
            _this.changeDetector.markForCheck();
        });
    };
    /**
     * @return {?}
     */
    Datatable2Component.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // assign it programatically as we want to have a context for the filter
        if (isPresent(this.rowDetailColumn) && isPresent(this.outlineState.outlineFor)) {
            this.outlineState.outlineFor.filterOut = this.skipOutlineItem.bind(this);
        }
        if (isPresent(this.outlineState.outlineFor)) {
            // this.outlineState.outlineFor.changeDetector.detach();
            // this.outlineState.outlineFor.changeDetector.detectChanges();
        }
        this.initialized = true;
    };
    /**
     * @return {?}
     */
    Datatable2Component.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this.columnsChanged && this.el.nativeElement.offsetParent) {
            this.columnsChanged = false;
        }
        if (this.hasFrozenColumns()) {
            this.frozenColumns.forEach(function (col, index) {
                return col.postInitialize(index);
            });
        }
        else {
            this.columns.forEach(function (col, index) {
                return col.postInitialize(index);
            });
        }
    };
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
     */
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
    Datatable2Component.prototype.initColumns = /**
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
    function () {
        var _this = this;
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
            .filter(function (col1) { return !col1.frozen; })
            .forEach(function (col) {
            col.initialize(_this);
            _this.columns.push(col);
        });
        this.initFrozenColumns();
        this.initColumnInfo();
        this.columnsChanged = true;
    };
    /**
     * Makes sure that we also include programmatic column if present. Move them to the correct
     * array
     *
     * @return {?}
     */
    Datatable2Component.prototype.initFrozenColumns = /**
     * Makes sure that we also include programmatic column if present. Move them to the correct
     * array
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this.colsQuery
            .filter(function (col1) { return col1.frozen; })
            .forEach(function (col) {
            col.initialize(_this);
            _this.frozenColumns.push(col);
        });
        if (this.frozenColumns.length > 0) {
            // find last index of column that is internal / programmatic
            var /** @type {?} */ lastInx = this.columns.slice()
                .reverse()
                .findIndex(function (col) { return _this.isInternalColumn(col); });
            if (lastInx !== -1) {
                var /** @type {?} */ idx = this.columns.length - 1 - lastInx;
                var /** @type {?} */ internalCols = this.columns.splice(0, idx + 1);
                this.frozenColumns = tslib_1.__spread(internalCols, this.frozenColumns);
            }
            var /** @type {?} */ hasValidCols = this.columns
                .findIndex(function (col) { return isBlank(col.width); }) === -1;
            assert(hasValidCols || isPresent(this.scrollWidth), 'When using [frozen] binding you need specify [width] for each ' +
                'column or [scrollWidth] on datatable!');
            assert(isBlank(this.rowDetailColumn), 'You cannot combine aw-dt-detail-column with frozen columns!');
        }
    };
    /**
     * Check if current column is programmatically created
     *
     */
    /**
     * Check if current column is programmatically created
     *
     * @param {?} col
     * @return {?}
     */
    Datatable2Component.prototype.isInternalColumn = /**
     * Check if current column is programmatically created
     *
     * @param {?} col
     * @return {?}
     */
    function (col) {
        return col instanceof DTSingleSelectColumnComponent ||
            col instanceof DTMultiSelectColumnComponent ||
            col instanceof DTDetailRowExpanderComponent;
    };
    /**
     * Create new Datasource based on passed values. It tries to initialize DS for first time
     * inside the ngInit but in case Data arrives later maybe due to some REST API calls this
     * can be triggered also from ngOnChanges.
     *
     */
    /**
     * Create new Datasource based on passed values. It tries to initialize DS for first time
     * inside the ngInit but in case Data arrives later maybe due to some REST API calls this
     * can be triggered also from ngOnChanges.
     *
     * @param {?=} initialize
     * @return {?}
     */
    Datatable2Component.prototype.initDatasource = /**
     * Create new Datasource based on passed values. It tries to initialize DS for first time
     * inside the ngInit but in case Data arrives later maybe due to some REST API calls this
     * can be triggered also from ngOnChanges.
     *
     * @param {?=} initialize
     * @return {?}
     */
    function (initialize) {
        var _this = this;
        if (initialize === void 0) { initialize = true; }
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
        this.dataSource.open().subscribe(function (data) {
            _this.updateList(data);
        });
    };
    /**
     * When detailRow column is present we initialize a state holding information which item is
     * expanded.
     *
     * todo: This is temporary here and once we suport lazy loading move this to datasource.
     *
     * For example for outline tree table we need to connect a state from outline with a state in
     * here as we are using outline control to expand and collapse items
     */
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
    Datatable2Component.prototype.initDetailColumnExpansion = /**
     * When detailRow column is present we initialize a state holding information which item is
     * expanded.
     *
     * todo: This is temporary here and once we suport lazy loading move this to datasource.
     *
     * For example for outline tree table we need to connect a state from outline with a state in
     * here as we are using outline control to expand and collapse items
     * @return {?}
     */
    function () {
        this.detailRowExpansionState.detailExpansionEnabled = isPresent(this.rowDetailColumn) &&
            BooleanWrapper.isTrue(this.showRowDetailExpansionControl);
    };
    /**
     * This method is executed after we initialize all the columns in order to calculate correct
     * numbers used for indentation while rendering selection columns as well as detail row columns.
     *
     * Here we need to be aware how many columns to span
     *
     */
    /**
     * This method is executed after we initialize all the columns in order to calculate correct
     * numbers used for indentation while rendering selection columns as well as detail row columns.
     *
     * Here we need to be aware how many columns to span
     *
     * @return {?}
     */
    Datatable2Component.prototype.initColumnInfo = /**
     * This method is executed after we initialize all the columns in order to calculate correct
     * numbers used for indentation while rendering selection columns as well as detail row columns.
     *
     * Here we need to be aware how many columns to span
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this.numberOfColsBeforeData = 0;
        this.columns.forEach(function (col) {
            if (!col.isValueColumn()) {
                _this.numberOfColsBeforeData++;
            }
        });
        if (this.indentDetailRow) {
            this.numberOfColsBeforeData++;
        }
        this.startOfFirstDataColumn = this.columns.length - this.numberOfColsBeforeData;
    };
    Object.defineProperty(Datatable2Component.prototype, "state", {
        /**
         * Pushes a state out to application. Can be use as two way bindings
         *
         * [(state)]=dtState(s)
         *
         */
        get: /**
         * Pushes a state out to application. Can be use as two way bindings
         *
         * [(state)]=dtState(s)
         *
         * @return {?}
         */
        function () {
            return this.dataSource.state;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.dataSource.state = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} cell
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    Datatable2Component.prototype.onCellSelectionChange = /**
     * See AWDataTable
     *
     * @param {?} cell
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    function (cell, column, item) {
        if (this.selectionMode !== 'cell') {
            return;
        }
        var /** @type {?} */ lookupKey = {
            col: column.key || column.label,
            item: item
        };
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {
            var /** @type {?} */ foundIndex_1 = ListWrapper.findIndexComplex(this.state.selection, lookupKey);
            var /** @type {?} */ isSelected = foundIndex_1 !== -1;
            if (isSelected) {
                this.state.selection = this.state.selection
                    .filter(function (val, index) { return index !== foundIndex_1; });
            }
            else {
                this.state.selection = tslib_1.__spread(this.state.selection, [lookupKey]);
            }
        }
        else {
            this.state.selection = [lookupKey];
        }
        this.onCellChange.emit(this.state.selection);
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} cell
     * @param {?} column
     * @return {?}
     */
    Datatable2Component.prototype.onHeaderSelectionChange = /**
     * See AWDataTable
     *
     * @param {?} cell
     * @param {?} column
     * @return {?}
     */
    function (cell, column) {
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
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    Datatable2Component.prototype.onHandleRowClicked = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
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
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    Datatable2Component.prototype.onRowToggle = /**
     * See AWDataTable
     *
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        var /** @type {?} */ rowSelected = true;
        if (isPresent(this.state.selection) && this.state.selection.length > 0) {
            var /** @type {?} */ foundIndex_2 = ListWrapper.findIndexComplex(this.state.selection, item);
            var /** @type {?} */ isSelected = foundIndex_2 !== -1;
            if (isSelected) {
                this.state.selection = this.state.selection
                    .filter(function (val, index) { return index !== foundIndex_2; });
                rowSelected = false;
            }
            else {
                this.state.selection = tslib_1.__spread(this.state.selection, [item]);
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
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    Datatable2Component.prototype.onRowSelect = /**
     * See AWDataTable
     *
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        this.state.selection = item;
        event.stopPropagation();
        this.onRowSelectionChange.emit(item);
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} currentItem
     * @param {?} isSelected
     * @return {?}
     */
    Datatable2Component.prototype.onHandleOutlineRowToggleToChildren = /**
     * See AWDataTable
     *
     * @param {?} currentItem
     * @param {?} isSelected
     * @return {?}
     */
    function (currentItem, isSelected) {
        var /** @type {?} */ childrenForNode = this.children.apply(this.context, [currentItem]) || [];
        if (childrenForNode.length > 0) {
            // If is selected currently then toggle to other state
            if (!isSelected) {
                // when checking all from root, deselect children and add all
                this.onHandleOutlineRowToggleToChildren(currentItem, true);
                this.state.selection = tslib_1.__spread(this.state.selection, childrenForNode);
            }
            else {
                var _loop_1 = function (child) {
                    var /** @type {?} */ foundIndex = ListWrapper.findIndexComplex(this_1.state.selection, child);
                    this_1.state.selection = this_1.state.selection
                        .filter(function (val, index) { return index !== foundIndex; });
                };
                var this_1 = this;
                try {
                    // remove each child
                    for (var childrenForNode_1 = tslib_1.__values(childrenForNode), childrenForNode_1_1 = childrenForNode_1.next(); !childrenForNode_1_1.done; childrenForNode_1_1 = childrenForNode_1.next()) {
                        var child = childrenForNode_1_1.value;
                        _loop_1(child);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (childrenForNode_1_1 && !childrenForNode_1_1.done && (_a = childrenForNode_1.return)) _a.call(childrenForNode_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            try {
                // apply the same for children of children
                for (var childrenForNode_2 = tslib_1.__values(childrenForNode), childrenForNode_2_1 = childrenForNode_2.next(); !childrenForNode_2_1.done; childrenForNode_2_1 = childrenForNode_2.next()) {
                    var child = childrenForNode_2_1.value;
                    this.onHandleOutlineRowToggleToChildren(child, isSelected);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (childrenForNode_2_1 && !childrenForNode_2_1.done && (_b = childrenForNode_2.return)) _b.call(childrenForNode_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        var e_1, _a, e_2, _b;
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} currentItem
     * @param {?} isSelected
     * @return {?}
     */
    Datatable2Component.prototype.oHandleOutlineRowToggleToParent = /**
     * See AWDataTable
     *
     * @param {?} currentItem
     * @param {?} isSelected
     * @return {?}
     */
    function (currentItem, isSelected) {
        var /** @type {?} */ parent = currentItem.$$parentItem;
        if (isPresent(parent)) {
            var /** @type {?} */ childrenForNode = this.children.apply(this.context, [parent]) || [];
            var /** @type {?} */ allSelected = true;
            try {
                for (var childrenForNode_3 = tslib_1.__values(childrenForNode), childrenForNode_3_1 = childrenForNode_3.next(); !childrenForNode_3_1.done; childrenForNode_3_1 = childrenForNode_3.next()) {
                    var child = childrenForNode_3_1.value;
                    allSelected = ListWrapper.findIndexComplex(this.state.selection, child) !== -1
                        && allSelected;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (childrenForNode_3_1 && !childrenForNode_3_1.done && (_a = childrenForNode_3.return)) _a.call(childrenForNode_3);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (!isSelected) {
                if (allSelected) {
                    this.state.selection.push(parent);
                }
            }
            else {
                if (!allSelected) {
                    var /** @type {?} */ parentIndex_1 = ListWrapper.findIndexComplex(this.state.selection, parent);
                    this.state.selection = this.state.selection
                        .filter(function (val, index) { return index !== parentIndex_1; });
                }
            }
            this.oHandleOutlineRowToggleToParent(currentItem.$$parentItem, isSelected);
        }
        var e_3, _a;
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} origPos
     * @param {?} newPos
     * @param {?} dropPos
     * @return {?}
     */
    Datatable2Component.prototype.onDnDRowDrop = /**
     * See AWDataTable
     *
     * @param {?} origPos
     * @param {?} newPos
     * @param {?} dropPos
     * @return {?}
     */
    function (origPos, newPos, dropPos) {
        if (isPresent(this.dataSource)) {
            console.log('Dropping row #: ', origPos + ' ' + dropPos + ' row #: ' + newPos);
            this.dataSource.reorderRows(origPos, newPos, dropPos);
        }
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @return {?}
     */
    Datatable2Component.prototype.onOutlineExpandChange = /**
     * See AWDataTable
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ item = event.item;
        // We dont really need to store a state form outline locally as we are using the same object
        // reference
        // this.state.outlineState = this.outlineState.expansionStates;
        if (this.canUseForDetailRow(item)) {
            this.detailRowExpansionState.toggle(item);
        }
    };
    /**
     * See AWDataTable
     *
     *
     */
    /**
     * See AWDataTable
     *
     *
     * @return {?}
     */
    Datatable2Component.prototype.sortSingle = /**
     * See AWDataTable
     *
     *
     * @return {?}
     */
    function () {
        if (isPresent(this.list) && isPresent(this.sortColumn)) {
            assert(isPresent(this.sortColumn.key), 'Invalid column to sort');
            this.dataSource.sort(this.sortColumn.key, this.sortColumn.sortOrder);
            this.onSort.emit({
                field: this.sortColumn.key,
                order: this.sortColumn.sortOrder
            });
        }
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @return {?}
     */
    Datatable2Component.prototype.handleDataChange = /**
     * See AWDataTable
     *
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.state.sortKey || this.sortColumn) {
            if (!this.sortColumn && this.columns) {
                this.sortColumn = this.columns.find(function (col) { return col.key === _this.state.sortKey; });
            }
        }
        this.updateDataToRender();
        this.valueChange.emit(this.list);
    };
    /**
     * @param {?=} datasource
     * @return {?}
     */
    Datatable2Component.prototype.updateDataToRender = /**
     * @param {?=} datasource
     * @return {?}
     */
    function (datasource) {
        this.dataToRender = datasource || this.list;
        // this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
    };
    /**
     * Updates current immutable list and trigger change detection. Need to wrap it with
     * setTimeout as the change can easily come after view checked and this would result some errors
     *
     * @param {?} newList
     * @return {?}
     */
    Datatable2Component.prototype.updateList = /**
     * Updates current immutable list and trigger change detection. Need to wrap it with
     * setTimeout as the change can easily come after view checked and this would result some errors
     *
     * @param {?} newList
     * @return {?}
     */
    function (newList) {
        var _this = this;
        setTimeout(function () {
            _this.list = newList;
            _this.handleDataChange();
        });
    };
    /**
     * @return {?}
     */
    Datatable2Component.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.sortColumn = null;
        this.updateDataToRender();
    };
    /**
     * See AWDataTable
     */
    /**
     * See AWDataTable
     * @param {?} item
     * @return {?}
     */
    Datatable2Component.prototype.isHeaderSelected = /**
     * See AWDataTable
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (isBlank(this.state.headerSelection)) {
            return false;
        }
        var /** @type {?} */ colMatched = item.key || item.label;
        var /** @type {?} */ currentCol = this.state.headerSelection.key || this.state.headerSelection.label;
        return colMatched === currentCol;
    };
    /**
     *
     * See AWDataTable
     *
     */
    /**
     *
     * See AWDataTable
     *
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    Datatable2Component.prototype.isBodyCellSelected = /**
     *
     * See AWDataTable
     *
     * @param {?} column
     * @param {?} item
     * @return {?}
     */
    function (column, item) {
        var /** @type {?} */ lookupKey = {
            col: column.key || column.label,
            item: item
        };
        return isPresent(this.state.selection) &&
            ListWrapper.findIndexComplex(this.state.selection, lookupKey) !== -1;
    };
    /**
     *  See AWDataTable
     *
     */
    /**
     *  See AWDataTable
     *
     * @param {?} item
     * @return {?}
     */
    Datatable2Component.prototype.isRowSelected = /**
     *  See AWDataTable
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.hasLeadingSelectColumn() && isPresent(this.state.selection)) {
            if (this.selectionMode === 'multi') {
                return ListWrapper.findIndexComplex(this.state.selection, item) !== -1;
            }
            else if (this.selectionMode === 'single') {
                return equals(this.state.selection, item);
            }
        }
        return false;
    };
    /**
     *
     * Do we have data to render Used inside template to tell if we should use the NoData template
     *
     */
    /**
     *
     * Do we have data to render Used inside template to tell if we should use the NoData template
     *
     * @return {?}
     */
    Datatable2Component.prototype.isEmpty = /**
     *
     * Do we have data to render Used inside template to tell if we should use the NoData template
     *
     * @return {?}
     */
    function () {
        return isBlank(this.dataToRender) || (this.dataToRender.length === 0);
    };
    /**
     * @return {?}
     */
    Datatable2Component.prototype.hasFrozenColumns = /**
     * @return {?}
     */
    function () {
        return isPresent(this.frozenColumns) && this.frozenColumns.length > 0;
    };
    /**
     * See AWDataTable
     */
    /**
     * See AWDataTable
     * @return {?}
     */
    Datatable2Component.prototype.hasInvisibleSelectionColumn = /**
     * See AWDataTable
     * @return {?}
     */
    function () {
        return this.hasLeadingSelectColumn() && !this.showSelectionColumn;
    };
    /**
     *
     * See AWDataTable
     *
     */
    /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    Datatable2Component.prototype.hasLeadingSelectColumn = /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    function () {
        return this.selectionMode !== 'none' && this.selectionMode !== 'cell';
    };
    /**
     * @return {?}
     */
    Datatable2Component.prototype.visibleColumns = /**
     * @return {?}
     */
    function () {
        return this.columns ? this.columns.filter(function (c) { return c.isVisible; }) : [];
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} direction
     * @return {?}
     */
    Datatable2Component.prototype.sortOrderingForString = /**
     * See AWDataTable
     *
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        if (isBlank(direction) || direction === 'ascending') {
            return 1;
        }
        if (isBlank(direction) || direction === 'descending') {
            return -1;
        }
        // todo: log bad key
        return 1;
    };
    /**
     * @param {?} direction
     * @return {?}
     */
    Datatable2Component.prototype.sortOrderingForNumber = /**
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        if (isBlank(direction) || direction === 1) {
            return 'ascending';
        }
        if (isBlank(direction) || direction === -1) {
            return 'descending';
        }
        // todo: log bad key
        return 'ascending';
    };
    /**
     * See AWDataTable
     *
     */
    /**
     * See AWDataTable
     *
     * @param {?} event
     * @return {?}
     */
    Datatable2Component.prototype.toggleAllColumns = /**
     * See AWDataTable
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ currentItems = this.dataToRender || [];
        var /** @type {?} */ selectedObject = this.state.selection || [];
        if (selectedObject.length >= currentItems.length) {
            this.state.selection = [];
        }
        else {
            this.state.selection = [];
            this.state.selection = tslib_1.__spread(currentItems);
        }
    };
    /**
     *
     * See AWDataTable
     *
     */
    /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    Datatable2Component.prototype.isToggleAllColumnSelected = /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ currentItems = this.dataToRender || [];
        var /** @type {?} */ selectedObject = this.state.selection || [];
        return currentItems.length > 0 && selectedObject.length >= currentItems.length;
    };
    /**
     * @return {?}
     */
    Datatable2Component.prototype.isToggleAllColumnDisabled = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ currentItems = this.dataToRender || [];
        return currentItems.length === 0;
    };
    /**
     *
     * Used by template to decide if we need to render DetailRow template. We need to have
     * DetailRow ContentChild and using DetailRow component [isVisibleFn] function binding we
     * check if the item that is about to be rendered is eligible for detail row
     *
     */
    /**
     *
     * Used by template to decide if we need to render DetailRow template. We need to have
     * DetailRow ContentChild and using DetailRow component [isVisibleFn] function binding we
     * check if the item that is about to be rendered is eligible for detail row
     *
     * @param {?} item
     * @return {?}
     */
    Datatable2Component.prototype.showDetailColumn = /**
     *
     * Used by template to decide if we need to render DetailRow template. We need to have
     * DetailRow ContentChild and using DetailRow component [isVisibleFn] function binding we
     * check if the item that is about to be rendered is eligible for detail row
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.canUseForDetailRow(item) && this.detailRowExpansionState.isExpanded(item)) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    Datatable2Component.prototype.canUseForDetailRow = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return isPresent(this.rowDetailColumn) &&
            (/** @type {?} */ (this.rowDetailColumn)).showDetailRow(item);
    };
    /**
     *
     * See AWDataTable
     *
     */
    /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    Datatable2Component.prototype.isOutline = /**
     *
     * See AWDataTable
     *
     * @return {?}
     */
    function () {
        return isPresent(this.children);
    };
    /**
     *
     * When dealing with detail column (detail row) and outline all together we need have a
     * mechanism to tell to the outline "don't render the next level of items" and use detail row.
     * So certain item type needs to be skipped.
     *
     * The way we skip those item is we use isVisibleFn condition of the detail row and look ahead
     * if we should skip next level.
     *
     */
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
    Datatable2Component.prototype.skipOutlineItem = /**
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
    function (item) {
        return this.canUseForDetailRow(item);
    };
    /**
     *
     * See AWDaTable
     *
     */
    /**
     *
     * See AWDaTable
     *
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    Datatable2Component.prototype.getValue = /**
     *
     * See AWDaTable
     *
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    function (data, field) {
        return FieldPath.getFieldValue(data, field);
    };
    /**
     * @return {?}
     */
    Datatable2Component.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
    };
    Datatable2Component.decorators = [
        { type: Component, args: [{
                    selector: 'aw-datatable2',
                    template: "<!--\n    This template focus only on header and body rendering.\n\n    This datatable also supports frozen column and for this rendering it is pretty much transparent\n    as it received sets of column that it needs to render from the TableWrapper.\n\n    TableWrapper in case of frozen columns calls #headerRows and #bodyRows templates twice to\n    render to separate tables where one has frozen columns and another one has the rest and its\n    scrollable\n-->\n\n<aw-dt-wrapper #dtWrapper>\n    <ng-template #headingArea>\n        <ng-content select=\"aw-dt-header2\"></ng-content>\n    </ng-template>\n\n    <ng-template #headerRows let-colsToRender let-frozenView=\"frozenColumns\">\n        <ng-container\n            *ngTemplateOutlet=\"header; context:{$implicit: colsToRender, frozen:frozenView }\">\n        </ng-container>\n    </ng-template>\n\n    <ng-template #bodyRows let-colsToRender>\n        <ng-template [ngIf]=\"isOutline()\">\n            <ng-container\n                *ngTemplateOutlet=\"bodyOutline; context:{$implicit: colsToRender}\"></ng-container>\n        </ng-template>\n        <ng-template [ngIf]=\"!isOutline()\">\n            <ng-container\n                *ngTemplateOutlet=\"bodyPlain; context:{$implicit: colsToRender}\"></ng-container>\n        </ng-template>\n    </ng-template>\n</aw-dt-wrapper>\n\n\n<!--\n    Each rendering column has its own renderTemplate which define how things should be render.\n    Based on different column types this code should be transparent as we dont care on this\n    level what kind of column we are rendering.\n\n    Later on when we will support single/multi selection, this will be just another column extending\n    DTColumn and providing its own template\n\n    We pass into this template if we are rendering header, subHeader, or data\n-->\n<ng-template #header let-colsToRender let-frozen=\"frozen\">\n    <tr>\n        <ng-template ngFor let-col [ngForOf]=\"colsToRender\" let-lastCol=\"last\"\n                     let-columnIndex=\"index\">\n\n            <ng-container *ngTemplateOutlet=\"col.rendererTemplate;\n                context:{$implicit: true, isSubHeader:false,\n                columnIndex:(frozen ? columnIndex: (columns.length + columnIndex))}\">\n            </ng-container>\n        </ng-template>\n    </tr>\n\n    <tr *ngIf=\"showSubHeader\">\n        <ng-template ngFor let-col [ngForOf]=\"colsToRender\" let-lastCol=\"last\">\n            <ng-container *ngTemplateOutlet=\"col.rendererTemplate;\n                context:{$implicit: true, isSubHeader:true}\">\n            </ng-container>\n        </ng-template>\n    </tr>\n</ng-template>\n\n\n<ng-template #bodyPlain let-colsToRender>\n\n    <tbody [ngClass]=\"{'dt-content dt-data-cells ': true, 'dt-is-hoverable-row': rowHover}\">\n\n    <ng-template ngFor let-rowData [ngForOf]=\"dataToRender\" let-even=\"even\" let-odd=\"odd\"\n                 let-rowIndex=\"index\" [ngForTrackBy]=\"rowTrackBy\">\n\n        <ng-container *ngTemplateOutlet=\"rowTemplate; context:{$implicit: rowData, even:even,\n                                          odd:odd, rowIndex:rowIndex, colsToRender:colsToRender}\">\n        </ng-container>\n\n        <ng-template [ngIf]=\"showDetailColumn(rowData)\">\n            <ng-container *ngTemplateOutlet=\"rowDetailColumn.rendererTemplate;\n                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}\">\n            </ng-container>\n        </ng-template>\n\n    </ng-template>\n    <ng-container *ngTemplateOutlet=\"noData\"></ng-container>\n    </tbody>\n</ng-template>\n\n\n<ng-template #bodyOutline let-colsToRender>\n    <tbody #outlineFor awOutlineFor [list]=\"dataToRender\"\n           [context]=\"context\"\n           [indentationPerLevel]=\"indentationPerLevel\"\n           [pushRootSectionOnNewLine]=\"pushRootSectionOnNewLine\"\n           [children]=\"children\" [expandAll]=\"expandAll\"\n           [state]=\"outlineState\"\n           [ngClass]=\"{'dt-content dt-data-cells ': true,\n                           'dt-is-hoverable-row': rowHover}\"\n           (onExpandChange)=\"onOutlineExpandChange($event)\">\n\n    <ng-template #outline let-rowData let-nestingLevel=\"nestingLevel\" let-rowIndex=\"rowIndex\">\n        <ng-container *ngTemplateOutlet=\"rowTemplate;\n                                context:{$implicit: rowData, nestingLevel:nestingLevel, colsToRender:colsToRender}\">\n        </ng-container>\n\n        <ng-template [ngIf]=\"showDetailColumn(rowData)\">\n            <ng-container *ngTemplateOutlet=\"rowDetailColumn.rendererTemplate;\n                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}\">\n            </ng-container>\n        </ng-template>\n\n    </ng-template>\n    <ng-container *ngTemplateOutlet=\"noData\"></ng-container>\n    </tbody>\n</ng-template>\n\n<!--\n    Default template that is display when there are no data\n-->\n<ng-template #noData>\n    <tr *ngIf=\"isEmpty()\" class=\" dt-emptymessage-row\"\n        [style.visibility]=\"loading ? 'hidden' : 'visible'\">\n\n        <td [attr.colspan]=\"visibleColumns().length\" class=\"dt-emptymessage\">\n            <span *ngIf=\"!emptyMessageTemplate\">{{emptyMessage}}</span>\n            <ng-container *ngTemplateOutlet=\"emptyMessageTemplate\"></ng-container>\n        </td>\n    </tr>\n</ng-template>\n\n<!--\n    Template that renders actual row. Renders both header and body column. Each rendered\n    column has its own template called rendererTemplate that has all things that needs to be\n    rendered and we just tell the template if we are rendering header, subheader or body\n-->\n<ng-template #rowTemplate let-rowData let-even=\"event\" let-odd=\"odd\" let-rowIndex=\"rowIndex\"\n             let-nestingLevel=\"nestingLevel\" let-colsToRender=\"colsToRender\">\n\n\n    <tr #rowElement dtDraggableRow [dndRowIndex]=\"rowIndex\"\n        class=\"dt-body-row\"\n        (click)=\"onHandleRowClicked($event, rowData)\"\n        [attr.nestingLevel]=\"nestingLevel\"\n        [ngClass]=\"{'dt-even-row': even, 'dt-odd-row': odd,\n            'dt-row-selected': isRowSelected(rowData),\n            'dt-row-draggable': dndRowEnabled,\n            'dt-root-section': nestingLevel === 0 }\">\n\n        <ng-template ngFor let-col [ngForOf]=\"colsToRender\" let-colIndex=\"index\">\n            <ng-container *ngTemplateOutlet=\"col.rendererTemplate;\n                    context:{$implicit: false, data:rowData, rowIndex:rowIndex,\n                    nestingLevel:nestingLevel}\">\n            </ng-container>\n        </ng-template>\n    </tr>\n</ng-template>\n\n\n",
                    styles: [".w-datatable{position:relative;display:block;box-sizing:border-box}.w-datatable table{border-collapse:collapse;width:100%;table-layout:fixed}.w-datatable tbody,.w-datatable td,.w-datatable th{outline:0}.dt-cell-def,.dt-cell-def-selectable{border:1px solid transparent;padding:17px 16px;box-sizing:border-box}.dt-cell-def-selectable{cursor:pointer;width:100%;height:100%}th .dt-cell-def-selectable{border-width:4px 1px 1px;padding:14px 16px 17px}td .dt-cell-def-selectable{border-width:0 1px 0 5px;padding:17px 16px 17px 13px}.dt-data-cells tr.dt-is-highlight,.dt-data-cells tr.dt-is-hover{border-color:inherit;font-weight:inherit;cursor:pointer}.w-datatable-rtl{direction:rtl}.w-datatable-rtl.w-datatable-rtl.w-datatable thead th{text-align:right}.dt-root-section .dt-cell-def,.dt-root-section .dt-cell-def-selectable{background-color:#f3f6f8;padding:10px 16px;border-bottom-color:transparent;border-right-color:transparent}.dt-plain-layout .dt-is-active,.dt-plain-layout .dt-is-default,.dt-plain-layout .dt-is-highlight,.dt-plain-layout .dt-is-hover,.dt-plain-layout .dt-is-hoverable-row{border-right-color:transparent}.dt-is-active,.dt-is-default,.dt-is-highlight,.dt-is-hover,.dt-is-hoverable-row{border:1px solid #d7d7d7;background-color:#fff;color:#363636}.dt-row-selected td{background-color:rgba(238,255,238,.71)}.dt-is-active{border-color:#065d9c;color:#199de0}.dt-is-highlight{background-color:rgba(65,117,5,.18)}.dt-is-hidden{display:none}.dt-u-unselectable-text{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;-ms-user-select:none;user-select:none}.dt-u-sortable{cursor:pointer}"],
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
    Datatable2Component.ctorParameters = function () { return [
        { type: Environment },
        { type: ElementRef },
        { type: DT2DataSource, decorators: [{ type: Inject, args: [DATA_SOURCE,] }] },
        { type: ChangeDetectorRef },
        { type: ComponentFactoryResolver },
        { type: OutlineState },
        { type: NgZone },
        { type: Injector }
    ]; };
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
    return Datatable2Component;
}(BaseComponent));
export { Datatable2Component };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RhdGF0YWJsZTIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBNkJBLE9BQU8sRUFJSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFFVCxXQUFXLEVBQ1gsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUVqRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFDSCxNQUFNLEVBQ04sY0FBYyxFQUNkLFdBQVcsRUFDWCxNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sRUFDUCxTQUFTLEVBQ1QsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFDSCw0QkFBNEIsRUFDL0IsTUFBTSwrREFBK0QsQ0FBQztBQUN2RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9B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QUFLOzBCQVFMLEtBQUs7Z0NBU0wsS0FBSzs4QkFTTCxLQUFLO2tDQU9MLEtBQUs7c0NBT0wsS0FBSztnQ0FTTCxLQUFLOzJCQU1MLEtBQUs7dUNBVUwsS0FBSzs0QkFNTCxLQUFLOzJDQU1MLEtBQUs7Z0RBUUwsS0FBSztzQ0FPTCxLQUFLO2dDQVFMLEtBQUs7bUNBT0wsS0FBSzs4QkFRTCxLQUFLO2dDQVFMLEtBQUs7eUJBUUwsTUFBTTs2QkFRTixNQUFNO3VDQVVOLE1BQU07K0JBUU4sTUFBTTtvQ0FPTixNQUFNO3lCQUlOLFlBQVksU0FBQyxrQkFBa0I7dUNBUS9CLFlBQVksU0FBQyxhQUFhO2lDQU8xQixZQUFZLFNBQUMsVUFBVTtvQ0FNdkIsWUFBWSxTQUFDLGFBQWE7K0JBTTFCLFlBQVksU0FBQyxRQUFRO3VDQU9yQixZQUFZLFNBQUMsY0FBYzs0QkFpQjNCLGVBQWUsU0FBQyxrQkFBa0I7a0NBT2xDLFlBQVksU0FBQyxvQkFBb0I7OEJBU2pDLE1BQU07NEJBSU4sV0FBVyxTQUFDLE9BQU87d0JBOFhuQixLQUFLOzs4QkFwZ0NWO0VBZ1N5QyxhQUFhO1NBQXpDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqICBAb3JpZ2luYWwtbGljZW5zZVxuICogIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IFByaW1lVGVrXG4gKlxuICogIENyZWRpdDogRGVyaXZlZCBhbmQgZXh0ZW5kZWQgZnJvbSBQcmltZS1uZyBkYXRhYmxlIHdoZXJlIHdlIG5lZWRlZCBtb3JlIG1vZHVsYXIgc29sdXRpb24uXG4gKiAgV2UgcmV1c2VkIHRoZSBjb3JlIHN0cnVjdHVyZSBhbmQgbGF5b3V0IGJ1dCBoYWQgdG8gcmVmYWN0b3IgYm90aCBjb2RlIGFuZCB0ZW1wbGF0ZSB0byBtYXRjaCBvdXJcbiAqICBuZWVkcy4gTW9yZSBpbiB0aGUgZGVzY3JpcHRpb25cbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0b3IsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JqZWN0VXRpbHN9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy91dGlscy9vYmplY3R1dGlscyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge091dGxpbmVTdGF0ZX0gZnJvbSAnLi4vb3V0bGluZS9pbmRleCc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBhc3NlcnQsXG4gICAgQm9vbGVhbldyYXBwZXIsXG4gICAgRW52aXJvbm1lbnQsXG4gICAgZXF1YWxzLFxuICAgIEZpZWxkUGF0aCxcbiAgICBpc0JsYW5rLFxuICAgIGlzUHJlc2VudCxcbiAgICBMaXN0V3JhcHBlclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QVdEYXRhVGFibGUsIERyb3BQb3NpdGlvbn0gZnJvbSAnLi9hdy1kYXRhdGFibGUnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4vY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtEVEhlYWRlckNvbXBvbmVudDJ9IGZyb20gJy4vaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtEVERldGFpbFJvd0NvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4vZGV0YWlsLXJvdy9kdC1kZXRhaWwtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnRcbn0gZnJvbSAnLi9jb2x1bW4vZGV0YWlsLXJvdy1leHBhbmRlci9kdC1kZXRhaWwtcm93LWV4cGFuZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0RBVEFfU09VUkNFfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJzfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1wcm92aWRlcnMnO1xuaW1wb3J0IHtEYXRhRmluZGVycywgUXVlcnlUeXBlfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1maW5kZXJzJztcbmltcG9ydCB7RGF0YXRhYmxlMlN0YXRlLCBEZXRhaWxSb3dFeHBhbnNpb25TdGF0ZSwgRFQyRGF0YVNvdXJjZX0gZnJvbSAnLi9kYXRhdGFibGUyLWRhdGEtc291cmNlJztcbmltcG9ydCB7XG4gICAgRFRNdWx0aVNlbGVjdENvbHVtbkNvbXBvbmVudFxufSBmcm9tICcuL2NvbHVtbi9tdWx0aS1zZWxlY3QvZHQtbXVsdGktc2VsZWN0LWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudFxufSBmcm9tICcuL2NvbHVtbi9zaW5nbGUtc2VsZWN0L2R0LXNpbmdsZS1zZWxlY3QtY29sdW1uLmNvbXBvbmVudCc7XG5cblxuZXhwb3J0IHR5cGUgU2VsZWN0aW9uTW9kZSA9ICdtdWx0aScgfCAnc2luZ2xlJyB8ICdjZWxsJyB8ICdub25lJztcblxuLyoqXG4gKiBEVCBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzIHRoZSBkYXRhIGdyaWQgdGhhdCBzaG93cyB0YWJ1bGFyIGRhdGEuIEV2ZW4gdGhlIGJhc2ljXG4gKiBzdHJ1Y3R1cmUgaXMgYmFzZWQgb24gUHJpbWVORyBkYXRhdGFibGUgaXRzIGNvbXBsZXRlbHkgcmVmYWN0b3JlZCBpbnRvIHNtYWxsZXIgcGllY2VzIHRoYXRcbiAqIGFsbG93cyBtb3JlIGV4dGVuc2liaWxpdHkgYW5kIHRyeWluZyB0byBzdGF5IGFzIGNsb3NlIGFzIHBvc3NpYmxlIHRvIGV4aXN0aW5nIEFXTCBpbXBsZW1lbnRhdGlvblxuICpcbiAqIFRoZXJlIGFyZSAzIG1haW4gcGllY2VzOlxuICpcbiAqICBUYWJsZSBXcmFwcGVyIC0gZm9jdXNlcyBvbiB0aGUgb3V0ZXIgc3RydWN0dXJlLiBDb250YWluZXIgd2l0aCBiYXNpYyBkYXRhYmxlIGxheW91dCBwbHVzXG4gKiAgY29udGFpbnMgYW55IGFkZGl0aW9uYWwgcGFuZWxzIHRoYXQgZGF0YXRhYmxlIG5lZWRzIHN1Y2ggYXMgb3VyIG5ldyBjb25jZXB0IGhvdyBlZGl0aW5nIHdpbGxcbiAqICB3b3JrIC0gc2xpZGluZyBwYW5lbCBmcm9tIHRoZSBib3R0b21cbiAqXG4gKiAgRGF0YXRhYmxlIENvbHVtbiAtIEluc3RlYWQgb2YgcmVuZGVyaW5nIGV2ZXJ5dGhpbmcgaW5zaWRlIERUIEkgc3BsaXQgdGhlIHBhcnQgdGhhdCByZW5kZXJzXG4gKiAgY29sdW1uIGludG8gc2VwYXJhdGUgY29tcG9uZW50LiBUaGlzIHdheSBjb21wb25lbnQgY29sdW1uIGhhcyBpdHMgb3duIHJlbmRlcmVyIHRlbXBsYXRlIHdoaWNoXG4gKiAgY2FuIHJlbmRlciBib3RoIGhlYWRlciBhbmQgZGF0YSBjZWxscy5cbiAqICBMYXRlciBvbiBEVENvbHVtbiBpcyB0aGVuIGV4dGVuZGVkIHRvIHN1cHBvcnQgb3RoZXIgYWRkaXRpb25hbCBjb2x1bW4gdHlwZXNcbiAqICBTaW5nbGVTZWxlY3Rpb25Db2x1bW4sIE11bHRpU2VsZWN0aW9uQ29sdW1uLCBib3RoIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgc2VsZWN0aW9uIGNvbnRyb2xzLlxuICpcbiAqIFRvIHN1cHBvcnQgcGl2b3RhbCBsYXlvdXQgdGhpcyBjYW4gYmUgZXh0ZW5kZWQgZm9yIG90aGVyIGFkZGl0aW9uYWwgY29sdW1ucyB0aGF0IGltcGxlbWVudHMgdGhlaXJcbiAqIG93biByZW5kZXJpbmcgdGVtcGxhdGVzXG4gKlxuICogRGF0YXRhYmxlIC0gVGhlIG1haW4gY29tcG9uZW50IHRoYXQgaXMgb25seSBmb2N1cyBvbiBoZWFkZXIgYW5kIGJvZHkgcmVuZGVyaW5nIGFuZCBiYXNhZWQgb24gdGhlXG4gKiBjb2x1bW4gdHlwZSBpdCB3aWxsIHJlbmRlciB0aGUgY29ycmVjdCB0ZW1wbGF0ZVxuICogY29sdW1uIHR5cGUgaXQgd2lsbCByZW5kZXIgdGhlIGNvcnJlY3QgdGVtcGxhdGVcbiAqXG4gKlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWRhdGF0YWJsZTInLFxuICAgIHRlbXBsYXRlOiBgPCEtLVxuICAgIFRoaXMgdGVtcGxhdGUgZm9jdXMgb25seSBvbiBoZWFkZXIgYW5kIGJvZHkgcmVuZGVyaW5nLlxuXG4gICAgVGhpcyBkYXRhdGFibGUgYWxzbyBzdXBwb3J0cyBmcm96ZW4gY29sdW1uIGFuZCBmb3IgdGhpcyByZW5kZXJpbmcgaXQgaXMgcHJldHR5IG11Y2ggdHJhbnNwYXJlbnRcbiAgICBhcyBpdCByZWNlaXZlZCBzZXRzIG9mIGNvbHVtbiB0aGF0IGl0IG5lZWRzIHRvIHJlbmRlciBmcm9tIHRoZSBUYWJsZVdyYXBwZXIuXG5cbiAgICBUYWJsZVdyYXBwZXIgaW4gY2FzZSBvZiBmcm96ZW4gY29sdW1ucyBjYWxscyAjaGVhZGVyUm93cyBhbmQgI2JvZHlSb3dzIHRlbXBsYXRlcyB0d2ljZSB0b1xuICAgIHJlbmRlciB0byBzZXBhcmF0ZSB0YWJsZXMgd2hlcmUgb25lIGhhcyBmcm96ZW4gY29sdW1ucyBhbmQgYW5vdGhlciBvbmUgaGFzIHRoZSByZXN0IGFuZCBpdHNcbiAgICBzY3JvbGxhYmxlXG4tLT5cblxuPGF3LWR0LXdyYXBwZXIgI2R0V3JhcHBlcj5cbiAgICA8bmctdGVtcGxhdGUgI2hlYWRpbmdBcmVhPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJhdy1kdC1oZWFkZXIyXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI2hlYWRlclJvd3MgbGV0LWNvbHNUb1JlbmRlciBsZXQtZnJvemVuVmlldz1cImZyb3plbkNvbHVtbnNcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXI7IGNvbnRleHQ6eyRpbXBsaWNpdDogY29sc1RvUmVuZGVyLCBmcm96ZW46ZnJvemVuVmlldyB9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI2JvZHlSb3dzIGxldC1jb2xzVG9SZW5kZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc091dGxpbmUoKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keU91dGxpbmU7IGNvbnRleHQ6eyRpbXBsaWNpdDogY29sc1RvUmVuZGVyfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWlzT3V0bGluZSgpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJib2R5UGxhaW47IGNvbnRleHQ6eyRpbXBsaWNpdDogY29sc1RvUmVuZGVyfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctdGVtcGxhdGU+XG48L2F3LWR0LXdyYXBwZXI+XG5cblxuPCEtLVxuICAgIEVhY2ggcmVuZGVyaW5nIGNvbHVtbiBoYXMgaXRzIG93biByZW5kZXJUZW1wbGF0ZSB3aGljaCBkZWZpbmUgaG93IHRoaW5ncyBzaG91bGQgYmUgcmVuZGVyLlxuICAgIEJhc2VkIG9uIGRpZmZlcmVudCBjb2x1bW4gdHlwZXMgdGhpcyBjb2RlIHNob3VsZCBiZSB0cmFuc3BhcmVudCBhcyB3ZSBkb250IGNhcmUgb24gdGhpc1xuICAgIGxldmVsIHdoYXQga2luZCBvZiBjb2x1bW4gd2UgYXJlIHJlbmRlcmluZy5cblxuICAgIExhdGVyIG9uIHdoZW4gd2Ugd2lsbCBzdXBwb3J0IHNpbmdsZS9tdWx0aSBzZWxlY3Rpb24sIHRoaXMgd2lsbCBiZSBqdXN0IGFub3RoZXIgY29sdW1uIGV4dGVuZGluZ1xuICAgIERUQ29sdW1uIGFuZCBwcm92aWRpbmcgaXRzIG93biB0ZW1wbGF0ZVxuXG4gICAgV2UgcGFzcyBpbnRvIHRoaXMgdGVtcGxhdGUgaWYgd2UgYXJlIHJlbmRlcmluZyBoZWFkZXIsIHN1YkhlYWRlciwgb3IgZGF0YVxuLS0+XG48bmctdGVtcGxhdGUgI2hlYWRlciBsZXQtY29sc1RvUmVuZGVyIGxldC1mcm96ZW49XCJmcm96ZW5cIj5cbiAgICA8dHI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY29sIFtuZ0Zvck9mXT1cImNvbHNUb1JlbmRlclwiIGxldC1sYXN0Q29sPVwibGFzdFwiXG4gICAgICAgICAgICAgICAgICAgICBsZXQtY29sdW1uSW5kZXg9XCJpbmRleFwiPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLnJlbmRlcmVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgY29udGV4dDp7JGltcGxpY2l0OiB0cnVlLCBpc1N1YkhlYWRlcjpmYWxzZSxcbiAgICAgICAgICAgICAgICBjb2x1bW5JbmRleDooZnJvemVuID8gY29sdW1uSW5kZXg6IChjb2x1bW5zLmxlbmd0aCArIGNvbHVtbkluZGV4KSl9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L3RyPlxuXG4gICAgPHRyICpuZ0lmPVwic2hvd1N1YkhlYWRlclwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNvbCBbbmdGb3JPZl09XCJjb2xzVG9SZW5kZXJcIiBsZXQtbGFzdENvbD1cImxhc3RcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2wucmVuZGVyZXJUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IHRydWUsIGlzU3ViSGVhZGVyOnRydWV9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L3RyPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI2JvZHlQbGFpbiBsZXQtY29sc1RvUmVuZGVyPlxuXG4gICAgPHRib2R5IFtuZ0NsYXNzXT1cInsnZHQtY29udGVudCBkdC1kYXRhLWNlbGxzICc6IHRydWUsICdkdC1pcy1ob3ZlcmFibGUtcm93Jzogcm93SG92ZXJ9XCI+XG5cbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvd0RhdGEgW25nRm9yT2ZdPVwiZGF0YVRvUmVuZGVyXCIgbGV0LWV2ZW49XCJldmVuXCIgbGV0LW9kZD1cIm9kZFwiXG4gICAgICAgICAgICAgICAgIGxldC1yb3dJbmRleD1cImluZGV4XCIgW25nRm9yVHJhY2tCeV09XCJyb3dUcmFja0J5XCI+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJvd1RlbXBsYXRlOyBjb250ZXh0OnskaW1wbGljaXQ6IHJvd0RhdGEsIGV2ZW46ZXZlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9kZDpvZGQsIHJvd0luZGV4OnJvd0luZGV4LCBjb2xzVG9SZW5kZXI6Y29sc1RvUmVuZGVyfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwic2hvd0RldGFpbENvbHVtbihyb3dEYXRhKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJvd0RldGFpbENvbHVtbi5yZW5kZXJlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IGZhbHNlLCBkYXRhOnJvd0RhdGEsIHJvd0luZGV4Oihyb3dJbmRleCl9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5vRGF0YVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvdGJvZHk+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjYm9keU91dGxpbmUgbGV0LWNvbHNUb1JlbmRlcj5cbiAgICA8dGJvZHkgI291dGxpbmVGb3IgYXdPdXRsaW5lRm9yIFtsaXN0XT1cImRhdGFUb1JlbmRlclwiXG4gICAgICAgICAgIFtjb250ZXh0XT1cImNvbnRleHRcIlxuICAgICAgICAgICBbaW5kZW50YXRpb25QZXJMZXZlbF09XCJpbmRlbnRhdGlvblBlckxldmVsXCJcbiAgICAgICAgICAgW3B1c2hSb290U2VjdGlvbk9uTmV3TGluZV09XCJwdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmVcIlxuICAgICAgICAgICBbY2hpbGRyZW5dPVwiY2hpbGRyZW5cIiBbZXhwYW5kQWxsXT1cImV4cGFuZEFsbFwiXG4gICAgICAgICAgIFtzdGF0ZV09XCJvdXRsaW5lU3RhdGVcIlxuICAgICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWNvbnRlbnQgZHQtZGF0YS1jZWxscyAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2R0LWlzLWhvdmVyYWJsZS1yb3cnOiByb3dIb3Zlcn1cIlxuICAgICAgICAgICAob25FeHBhbmRDaGFuZ2UpPVwib25PdXRsaW5lRXhwYW5kQ2hhbmdlKCRldmVudClcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjb3V0bGluZSBsZXQtcm93RGF0YSBsZXQtbmVzdGluZ0xldmVsPVwibmVzdGluZ0xldmVsXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJvd1RlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IHJvd0RhdGEsIG5lc3RpbmdMZXZlbDpuZXN0aW5nTGV2ZWwsIGNvbHNUb1JlbmRlcjpjb2xzVG9SZW5kZXJ9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJzaG93RGV0YWlsQ29sdW1uKHJvd0RhdGEpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicm93RGV0YWlsQ29sdW1uLnJlbmRlcmVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6eyRpbXBsaWNpdDogZmFsc2UsIGRhdGE6cm93RGF0YSwgcm93SW5kZXg6KHJvd0luZGV4KX1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibm9EYXRhXCI+PC9uZy1jb250YWluZXI+XG4gICAgPC90Ym9keT5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS1cbiAgICBEZWZhdWx0IHRlbXBsYXRlIHRoYXQgaXMgZGlzcGxheSB3aGVuIHRoZXJlIGFyZSBubyBkYXRhXG4tLT5cbjxuZy10ZW1wbGF0ZSAjbm9EYXRhPlxuICAgIDx0ciAqbmdJZj1cImlzRW1wdHkoKVwiIGNsYXNzPVwiIGR0LWVtcHR5bWVzc2FnZS1yb3dcIlxuICAgICAgICBbc3R5bGUudmlzaWJpbGl0eV09XCJsb2FkaW5nID8gJ2hpZGRlbicgOiAndmlzaWJsZSdcIj5cblxuICAgICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJ2aXNpYmxlQ29sdW1ucygpLmxlbmd0aFwiIGNsYXNzPVwiZHQtZW1wdHltZXNzYWdlXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFlbXB0eU1lc3NhZ2VUZW1wbGF0ZVwiPnt7ZW1wdHlNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlNZXNzYWdlVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC90ZD5cbiAgICA8L3RyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLVxuICAgIFRlbXBsYXRlIHRoYXQgcmVuZGVycyBhY3R1YWwgcm93LiBSZW5kZXJzIGJvdGggaGVhZGVyIGFuZCBib2R5IGNvbHVtbi4gRWFjaCByZW5kZXJlZFxuICAgIGNvbHVtbiBoYXMgaXRzIG93biB0ZW1wbGF0ZSBjYWxsZWQgcmVuZGVyZXJUZW1wbGF0ZSB0aGF0IGhhcyBhbGwgdGhpbmdzIHRoYXQgbmVlZHMgdG8gYmVcbiAgICByZW5kZXJlZCBhbmQgd2UganVzdCB0ZWxsIHRoZSB0ZW1wbGF0ZSBpZiB3ZSBhcmUgcmVuZGVyaW5nIGhlYWRlciwgc3ViaGVhZGVyIG9yIGJvZHlcbi0tPlxuPG5nLXRlbXBsYXRlICNyb3dUZW1wbGF0ZSBsZXQtcm93RGF0YSBsZXQtZXZlbj1cImV2ZW50XCIgbGV0LW9kZD1cIm9kZFwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCJcbiAgICAgICAgICAgICBsZXQtbmVzdGluZ0xldmVsPVwibmVzdGluZ0xldmVsXCIgbGV0LWNvbHNUb1JlbmRlcj1cImNvbHNUb1JlbmRlclwiPlxuXG5cbiAgICA8dHIgI3Jvd0VsZW1lbnQgZHREcmFnZ2FibGVSb3cgW2RuZFJvd0luZGV4XT1cInJvd0luZGV4XCJcbiAgICAgICAgY2xhc3M9XCJkdC1ib2R5LXJvd1wiXG4gICAgICAgIChjbGljayk9XCJvbkhhbmRsZVJvd0NsaWNrZWQoJGV2ZW50LCByb3dEYXRhKVwiXG4gICAgICAgIFthdHRyLm5lc3RpbmdMZXZlbF09XCJuZXN0aW5nTGV2ZWxcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWV2ZW4tcm93JzogZXZlbiwgJ2R0LW9kZC1yb3cnOiBvZGQsXG4gICAgICAgICAgICAnZHQtcm93LXNlbGVjdGVkJzogaXNSb3dTZWxlY3RlZChyb3dEYXRhKSxcbiAgICAgICAgICAgICdkdC1yb3ctZHJhZ2dhYmxlJzogZG5kUm93RW5hYmxlZCxcbiAgICAgICAgICAgICdkdC1yb290LXNlY3Rpb24nOiBuZXN0aW5nTGV2ZWwgPT09IDAgfVwiPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY29sIFtuZ0Zvck9mXT1cImNvbHNUb1JlbmRlclwiIGxldC1jb2xJbmRleD1cImluZGV4XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLnJlbmRlcmVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6eyRpbXBsaWNpdDogZmFsc2UsIGRhdGE6cm93RGF0YSwgcm93SW5kZXg6cm93SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIG5lc3RpbmdMZXZlbDpuZXN0aW5nTGV2ZWx9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L3RyPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG5gLFxuICAgIHN0eWxlczogW2Audy1kYXRhdGFibGV7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9LnctZGF0YXRhYmxlIHRhYmxle2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTt3aWR0aDoxMDAlO3RhYmxlLWxheW91dDpmaXhlZH0udy1kYXRhdGFibGUgdGJvZHksLnctZGF0YXRhYmxlIHRkLC53LWRhdGF0YWJsZSB0aHtvdXRsaW5lOjB9LmR0LWNlbGwtZGVmLC5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2JvcmRlcjoxcHggc29saWQgdHJhbnNwYXJlbnQ7cGFkZGluZzoxN3B4IDE2cHg7Ym94LXNpemluZzpib3JkZXItYm94fS5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2N1cnNvcjpwb2ludGVyO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9dGggLmR0LWNlbGwtZGVmLXNlbGVjdGFibGV7Ym9yZGVyLXdpZHRoOjRweCAxcHggMXB4O3BhZGRpbmc6MTRweCAxNnB4IDE3cHh9dGQgLmR0LWNlbGwtZGVmLXNlbGVjdGFibGV7Ym9yZGVyLXdpZHRoOjAgMXB4IDAgNXB4O3BhZGRpbmc6MTdweCAxNnB4IDE3cHggMTNweH0uZHQtZGF0YS1jZWxscyB0ci5kdC1pcy1oaWdobGlnaHQsLmR0LWRhdGEtY2VsbHMgdHIuZHQtaXMtaG92ZXJ7Ym9yZGVyLWNvbG9yOmluaGVyaXQ7Zm9udC13ZWlnaHQ6aW5oZXJpdDtjdXJzb3I6cG9pbnRlcn0udy1kYXRhdGFibGUtcnRse2RpcmVjdGlvbjpydGx9LnctZGF0YXRhYmxlLXJ0bC53LWRhdGF0YWJsZS1ydGwudy1kYXRhdGFibGUgdGhlYWQgdGh7dGV4dC1hbGlnbjpyaWdodH0uZHQtcm9vdC1zZWN0aW9uIC5kdC1jZWxsLWRlZiwuZHQtcm9vdC1zZWN0aW9uIC5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2JhY2tncm91bmQtY29sb3I6I2YzZjZmODtwYWRkaW5nOjEwcHggMTZweDtib3JkZXItYm90dG9tLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci1yaWdodC1jb2xvcjp0cmFuc3BhcmVudH0uZHQtcGxhaW4tbGF5b3V0IC5kdC1pcy1hY3RpdmUsLmR0LXBsYWluLWxheW91dCAuZHQtaXMtZGVmYXVsdCwuZHQtcGxhaW4tbGF5b3V0IC5kdC1pcy1oaWdobGlnaHQsLmR0LXBsYWluLWxheW91dCAuZHQtaXMtaG92ZXIsLmR0LXBsYWluLWxheW91dCAuZHQtaXMtaG92ZXJhYmxlLXJvd3tib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnR9LmR0LWlzLWFjdGl2ZSwuZHQtaXMtZGVmYXVsdCwuZHQtaXMtaGlnaGxpZ2h0LC5kdC1pcy1ob3ZlciwuZHQtaXMtaG92ZXJhYmxlLXJvd3tib3JkZXI6MXB4IHNvbGlkICNkN2Q3ZDc7YmFja2dyb3VuZC1jb2xvcjojZmZmO2NvbG9yOiMzNjM2MzZ9LmR0LXJvdy1zZWxlY3RlZCB0ZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjM4LDI1NSwyMzgsLjcxKX0uZHQtaXMtYWN0aXZle2JvcmRlci1jb2xvcjojMDY1ZDljO2NvbG9yOiMxOTlkZTB9LmR0LWlzLWhpZ2hsaWdodHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNjUsMTE3LDUsLjE4KX0uZHQtaXMtaGlkZGVue2Rpc3BsYXk6bm9uZX0uZHQtdS11bnNlbGVjdGFibGUtdGV4dHstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1vLXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZHQtdS1zb3J0YWJsZXtjdXJzb3I6cG9pbnRlcn1gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgT2JqZWN0VXRpbHMsXG4gICAgICAgIE91dGxpbmVTdGF0ZSxcbiAgICAgICAge3Byb3ZpZGU6IERBVEFfU09VUkNFLCB1c2VDbGFzczogRFQyRGF0YVNvdXJjZSwgZGVwczogW0RhdGFQcm92aWRlcnMsIERhdGFGaW5kZXJzXX0sXG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG5cbn0pXG5leHBvcnQgY2xhc3MgRGF0YXRhYmxlMkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBV0RhdGFUYWJsZSwgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIC8qKlxuICAgICAqICBMaXN0IG9mIGl0ZW1zIHRvIHNob3cgaW4gdGhlIGRhdGF0YWJsZS5cbiAgICAgKlxuICAgICAqICB0b2RvOiBpbXBsZW1lbnQgdGhlIHNhbWUgRGF0YXNvdXJjZSBhbmQgbGF6eSBsb2FkaW5nIGp1c3QgbGlrZSBJIGRpZCBpdCBmb3IgZGF0YXRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsaXN0OiBhbnlbXTtcblxuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGVudGl0eSBmb3Igd2hpY2ggRGF0YVByb3ZpZGVyIHdpbGwgYmUgbG9hZGVkLiBZb3UgY2FuIGVpdGhlciBwYXNzIGxpc3Qgb2YgaXRlbXNcbiAgICAgKiBvciB1c2UgdGhpcyBkZXN0aW5hdGlvbkNsYXNzLiBOb3QgYm90aFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGVzdGluYXRpb25DbGFzczogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IFRhYmxlV3JhcHBlciB0byBhZGQgdXNlciBkZWZpbmVkIGNsYXMgaW50byB0aGUgdGFibGUgdGFnXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRhYmxlU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU2VlIGhlYWRlclRlbXBsYXRlIGZvciBtb3JlIGRldGFpbHNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJvZHlDbGFzc0ZuOiAoY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGlzUm93U2VsZWN0YWJsZTogKGl0ZW06IGFueSkgPT4gYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogIEhpZGVzIG9yIHNob3dzIHRhYmxlIGhlYWRpbmcgd2hlcmUgd2UgaGF2ZSBmaWx0ZXJzIGFuZCB0b29scyBtZW51c1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1RhYmxlSGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHBpdm90YWxMYXlvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb250ZXh0OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluaXRpYWxTb3J0T3JkZXI6IHN0cmluZyA9ICdkZXNjZW5kaW5nJztcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaW5pdGlhbFNvcnRLZXk6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBEVCBpcyBsb2FkZWQgaW4gdGhlIHBhZ2UgYW5kIHdlIGFyZSBub3QgaW4gdGhlIGZ1bGwgc2NyZWVuIChmdWxsIHBhZ2UgbW9kZSksIHRoaXNcbiAgICAgKiBpcyBodGUgbnVtYmVyIG9mIGxpbmVzIHRoYXQgRFQgd2lsbCBzaG93XG4gICAgICpcbiAgICAgKiB0b2RvOiBjb21lIHVwIHdpdGggYmV0dGVyIG5hbWVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlSb3dTaXplOiBudW1iZXIgPSAxMDtcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgcGFnaW5nIG9uIGxhenkgbG9hZGluZyB1c2luZyBpbmZpbml0ZSBzY3JvbGxlciB0byBzZXQgaW5pdGlhbCBmZXRjaCBsaW1pdCBzaXplXG4gICAgICpcbiAgICAgKiB0b2RvOiBjb21lIHVwIHdpdGggYmV0dGVyIG5hbWUgISEhXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHBhZ2VTaXplOiBudW1iZXIgPSAxNTtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkYXRhU291cmNlOiBEVDJEYXRhU291cmNlO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBtZXNzYWdlIHdoZW4gdGhlcmUgYXJlIG5vIGRhdGEgLlxuICAgICAqXG4gICAgICogdG9kbzogVXNlIGkxOG4gdmFsdWUgYW5kIGNyZWF0ZSByZXNvdXJjZSBmaWxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBlbXB0eU1lc3NhZ2U6IHN0cmluZyA9ICdObyByZWNvcmRzIGZvdW5kJztcblxuXG4gICAgLyoqXG4gICAgICogRGV2ZWxvcGVyIGNhbiBwcm92aWRlIGN1c3RvbSB0cmFja0J5IGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGl0ZXJhdGUgb3ZlciB0aGVcbiAgICAgKiByZWNvcmRzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByb3dUcmFja0J5OiAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUgYWRkcyBjdXN0b20gaG92ZXJpbmcgY2xhc3MgdG8gdGhlIHRib2R5XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByb3dIb3ZlcjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIERvIHdlIHNob3cgbG9hZGluZyBpbmRpY2F0b3JcbiAgICAgKlxuICAgICAqIFRvZG86IHJlbmFtZSB0byBzaG93TG9hZGluZ1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbG9hZGluZzogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0aW9uTW9kZTogU2VsZWN0aW9uTW9kZSA9ICdub25lJztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2FuIHByb3ZpZGUgY3VzdG9tIGljb24uIFRoZXNlIGljb25zIGFyZSBub3QgYW5pbWF0ZWQgZGl2cywgd2UgdXNlZCBjc3NcbiAgICAgKiB0cmFuc2Zvcm1hdGlvbiB0byByb3RhdGUgdGhlbS5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbG9hZGluZ0ljb246IHN0cmluZyA9ICdpY29uLXN5bmNocm9uaXplJztcblxuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBpbmRlbnQgY2FuIGJlIGFkZGVkIHdoZW4gcmVuZGVyaW5nIGRldGFpbCByb3dcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluZGVudERldGFpbFJvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluZGVudGF0aW9uUGVyTGV2ZWw6IG51bWJlciA9IDI1O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiAgU3ViSGVhZGVyIGlzIHVzZWQgdG8gc2hvdyBzdW1tYXJ5IGNvbHVtbnMsIHdoaWNoIGluIG91ciBVWCBpcyBzaG93biBhdCB0aGUgdG9wIGp1c3QgdW5kZXJcbiAgICAgKiAgdGhlIHJlZ3VsYXIgdGFibGUgaGVhZGVyXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dTdWJIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNlZSBPdXRsaW5lRm9yIC0gb25seSB1c2VkIGluIHRoZSB0cmVlIG1vZGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNoaWxkcmVuOiAodmFsdWU6IGFueSkgPT4gYW55W107XG5cblxuICAgIC8qKlxuICAgICAqIFdlIG1pZ2h0IGhhdmUgdGhpcyBjb25kaXRpb25hbCBhcyB0aGlzIGNhbiBiZSBkeW5hbWljIGJhc2VkIG9uIHZhbHVlLCBzbyB0aGUgc2FtZVxuICAgICAqIGFzIGNoaWxkcmVuXG4gICAgICpcbiAgICAgKiBTZWUgT3V0bGluZUZvciAtIG9ubHkgdXNlZCBpbiB0aGUgdHJlZSBtb2RlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93RXhwYW5zaW9uQ29udHJvbDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFNlZSBPdXRsaW5lRm9yIC0gb25seSB1c2VkIGluIHRoZSB0cmVlIG1vZGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGV4cGFuZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmU6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgb3IgaGlkZSBleHBhbnNpb24gY29udHJvbCBmb3Igcm93IGRldGFpbCBjb2x1bW5zLiBFeHBhbnNpb24gY29udHJvbCBtYWtlcyBzZW5zZSBmb3JcbiAgICAgKiBzaW1wbGUgdGFibGUsIHdoZW4gdXNpbmcgdGhpcyBpbnNpZGUgb3V0bGluZSAodHJlZSB0YWJsZSksIGl0cyBkcml2ZW4gYnkgb3V0bGluZSBjb250cm9sXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93Um93RGV0YWlsRXhwYW5zaW9uQ29udHJvbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1NlbGVjdGlvbkNvbHVtbjogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93U2VsZWN0QWxsOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogU2hvdyBvciBoaWRlIGdsb2JhbCBzZWFyY2ggdGVybSBpbnB1dCBmaWVsZCBpbiB0aGUgaGVhZGVyXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93R2xvYmFsU2VhcmNoOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSBmcm96ZW4gY29sdW1uIGFyZSB1c2luZyB3ZSBjYW4gc3BlY2lmeSBvbiBnbG9iYWwgbGV2ZWwgdG90YWwgd2lkdGggb2YgdGhlIHRhYmxlIHRoZVxuICAgICAqIG92ZXJmbG93aW5nIGNvbnRlbnQgb3Igd2lkdGggZm9yIGVhY2ggY29sdW1uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2Nyb2xsV2lkdGg6IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBvciBkaXNhYmxlcyByb3cgcmVvcmRlcmluZ1xuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkbmRSb3dFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEZpcmVzIGV2ZW50IHRoYXQgc29ydGluZyBpcyBlbmFibGVkIGZvciBjb2x1bW4gYW5kIHdlIHRyaWdnZXIgc29ydGluZ1xuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25Tb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICogQmFzZWQgb24gc2VsZWN0aW9uIG1vZGUgaXQgdHJpZ2dlcnMgZXZlblxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25Sb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gbXVsdGkgb3Igc2luZ2xlIHNlbGVjdGlvbiBtb2RlIGlzIGVuYWJsZWQgaXQgd2lsbCB0cmlnZ2VyIGV2ZW50IHdoZW4gY2hlY2tib3ggb3JcbiAgICAgKiByYWRpbyBidXR0b25zIGlzIHNlbGVjdGVkXG4gICAgICpcbiAgICAgKiB0b2RvOiBpbXBsZW1lbnQgU2luZ2xlU2VsZWN0aW9uRFRDb2x1bW4sIE11bHRpU2VsZWN0aW9uRFRDb2x1bW4gd2l0aCB0aGVpciByZW5kZXJlcnNcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblJvd1NlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gY2VsbCBib2R5IHNlbGVjdGlvbiBjaGFuZ2VzIHdlIGZpcmUgZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2VsbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGNlbGwgaGVhZGVyIHNlbGVjdGlvbiBjaGFuZ2VzIHdlIGZpcmUgZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uSGVhZGVyU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgQENvbnRlbnRDaGlsZChEVEhlYWRlckNvbXBvbmVudDIpXG4gICAgaGVhZGVyOiBEVEhlYWRlckNvbXBvbmVudDI7XG5cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgY3VzdG9tIHRlbXBsYXRlIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGJ5IGFwcGxpY2F0aW9uIHRvIHNob3cgd2hlbiB0aGVyZSBhcmVcbiAgICAgKiBubyBkYXRhIGluIHRoZSBkYXRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnbm9EYXRhVGVtcGwnKVxuICAgIGVtcHR5TWVzc2FnZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdkdEhlYWRlcicpXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdkdFN1YkhlYWRlcicpXG4gICAgc3ViSGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdkdEJvZHknKVxuICAgIGJvZHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaGVhZGVyRmlsdGVyJylcbiAgICBoZWFkZXJGaWx0ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdHMgdXNlZCBEVENvbHVtbiBpbnNpZGUgZGF0YXRhYmxlIGFuZCB0aGVuIHRoZXkgYXJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZSB0b1xuICAgICAqIGl0ZXJhdGUgb3ZlciBhbmQgdXNlIGl0cyByZW5kZXJlclRlbXBsYXRlLlxuICAgICAqXG4gICAgICogV2hlbiB3ZSB3aWxsIGJlIGRlZmluaW5nIG5ldyBjb2x1bW5zIGl0cyBpbXBvcnRhbnQgdGhhdCBpdCBjYW4gYWxzbyBtYXRjaCBhbGwgdGhlXG4gICAgICogaW5oZXJpdGVkIG9uZXMuIHNvIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGRlZmluZSBhIHByb3ZpZGVyIHRob3NlIHRob3NlIGNvbHVtbnMgdG8gcG9pbnRcbiAgICAgKiB0byB0aGUgRFRDb2x1bW5Db21wb25lbnRcbiAgICAgKlxuICAgICAqIGUuZy46XG4gICAgICpcbiAgICAgKiB7cHJvdmlkZTogRFRDb2x1bW5Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERldGFpbFJvd0NvbHVtbil9XG4gICAgICpcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKERUQ29sdW1uMkNvbXBvbmVudClcbiAgICBjb2xzUXVlcnk6IFF1ZXJ5TGlzdDxEVENvbHVtbjJDb21wb25lbnQ+O1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKERURGV0YWlsUm93Q29tcG9uZW50KVxuICAgIHJvd0RldGFpbENvbHVtbjogRFREZXRhaWxSb3dDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHJpZ2dlcnMgd2hlbiBpdGVtcyBpbiB0aGUgbGlzdCBhcmUgdXBkYXRlZFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgICBjbGFzc0xpc3Q6IHN0cmluZyA9ICd3LWRhdGF0YWJsZSAnO1xuXG5cbiAgICAvKipcbiAgICAgKiBGb3IgaW50ZXJuYWwgdXNlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGRhdGFzZXQgdGhhdCBpcyBiZWluZyByZW5kZXJlZC4gU2V0IGZyb20gdGhlIFtsaXN0XSBiaW5kaW5nIG9yIGJ5IGxhenkgbG9hZCBmcm9tXG4gICAgICogZGF0YXNvdXJjZVxuICAgICAqL1xuICAgIHB1YmxpYyBkYXRhVG9SZW5kZXI6IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICogV2UgY29udmVydCBRdWVyeUxpc3Q8RFRDb2x1bW4yQ29tcG9uZW50PiB0byB0aGlzIGFycmF5IGZvciBlYXNpZXIgbWFuaXB1bGF0aW9uXG4gICAgICovXG4gICAgcHVibGljIGNvbHVtbnM6IERUQ29sdW1uMkNvbXBvbmVudFtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHNlY29uZGFyeSBsaXN0IG9mIGNvbHVtbnMgd2hpY2ggaXMgdXNlZCBpbiBjYXNlIHdlIGhhdmUgaGF2ZSBlbmFibGVkXG4gICAgICogZnJvemVuIGNvbHVtbnMuIENvbHVtbnMgdGhhdCBhcmUgbWFya2VkIGFzIGZyb3plbiBuZWVkcyB0byBiZSBwbGFjZWQgaW50byBzZXBhcmF0ZSBhcnJheVxuICAgICAqIHRvIGJlIHJlbmRlcmVkIHdheSB0aGFuIHJlZ3VsYXIgY29sdW1ucyB3aGljaCBhcmUgc3RvcmVkIGluIHRoZSBjb2x1bW5zIGFycmF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBmcm96ZW5Db2x1bW5zOiBEVENvbHVtbjJDb21wb25lbnRbXTtcblxuXG4gICAgLyoqXG4gICAgICogIEluZGljYXRlcyB0aGF0IGNvbHVtbnMgd2VyZSBpbml0aWFsZWQgQWxzbyB1c2VkIHdoZW4gd2UgaGlkZSBhbmQgc2hvdyBjb2x1bW4gdG8gdHJpZ2dlclxuICAgICAqICBjaGFuZ2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaWMgY29sdW1uc0NoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgcHVibGljIHNvcnRDb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIGNvbHNRdWVyeSBhbmQgaXRzIGNoYW5nZXMgc28gd2UgY2FuIGxhdGVyIG9uIHJlbGVhc2UgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqL1xuICAgIGNvbHVtbnNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgZGV0YWlsUm93RXhwYW5zaW9uU3RhdGU6IERldGFpbFJvd0V4cGFuc2lvblN0YXRlO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBudW1iZXJPZkNvbHNCZWZvcmVEYXRhOiBudW1iZXIgPSAwO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBzdGFydE9mRmlyc3REYXRhQ29sdW1uOiBudW1iZXIgPSAwO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWN0aW9uIGZvciBwcm9ncmFtbWF0aWNhbGx5IGluc3RhbnRpYXRlZCBjb2x1bW5zIHRoYXQgYXJlIGFkZGVkIHRvIHRoZSBsaXN0IGlmIGFkZGl0aW9uYWxcbiAgICAgKiBzcGFuIG9yIGxvZ2ljIGlzIG5lZWRlZC5cbiAgICAgKlxuICAgICAqIFRvIHByb2dyYW1tYXRpY2FsbHkgaW5zZXJ0IGEgbmV3IGNvbHVtbiBpbnRvIGNvbHVtbnMgYXJyYXkgbGlrZSBleHBhbmRvIGNvbHVtbiBmb3IgZGV0YWlsXG4gICAgICogcm93LCBvciBTaW5nbGVTZWxlY3QsIE11bHRpU2VsZWN0IGNvbHVtbiB3aGVuIHNlbGVjdGlvbiBpcyBlbmFibGVkIHdlIG5lZWQgdG8gdXNlXG4gICAgICogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHRvIGluc3RhbnRpYXRlIGEgbmV3IGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgcm93RGV0YWlsRXhwYW5kQ29sdW1uOiBEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50O1xuICAgIHByaXZhdGUgbXVsdGlTZWxlY3RDb2x1bW46IERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnQ7XG4gICAgcHJpdmF0ZSBzaW5nbGVTZWxlY3RDb2x1bW46IERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEluIGNhc2Ugb2Ygb3V0bGluZSB0YWJsZSB3ZSBhcmUgaW5qZWN0IE91dGxpbmVTdGF0ZSB3aGljaCBpcyBwcm92aWRlZCBpbiB0aGUgRFQgY29tcG9uZW50XG4gICAgICogZGVmaW5pdGlvbi4gVGhpcyBpcyB1c2VkIGJ5IG5lc3RlZCBvdXRsaW5lRm9yIGNvbXBvbmVudCBpdCBzZXQgaXRzZWxmIGFzIHJlZmVyZW5jZSBhbmRcbiAgICAgKiBpbml0aWFsaXplIHRoZSBzdGF0ZSBzbyBpdCBjYW4gYmUgdXNlZCBsYXRlciBvbiBpbnNpZGUgT3V0bGluZUNvbnRyb2xcbiAgICAgKlxuICAgICAqXG4gICAgICogRWFjaCBEYXRhdGFibGUgaXMgcHJlLWRlZmF1bHRlZCB3aXRoIGl0cyBvd24gdmVyc2lvbiBvZiBEYXRhU291cmNlIHNvIGFsbCB0aGUgb2JzZXJ2ZXJzXG4gICAgICogaW5zaWRlIGFyZSB1bmlxdWUgZm9yIHRoaXMgY29tcG9uZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoREFUQV9TT1VSQ0UpIHByaXZhdGUgX2RlZmF1bHREUzogRFQyRGF0YVNvdXJjZSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBmYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3V0bGluZVN0YXRlOiBPdXRsaW5lU3RhdGUsXG4gICAgICAgICAgICAgICAgcHVibGljIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuX2RlZmF1bHREUztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkgJiYgaXNQcmVzZW50KHRoaXMuZGVzdGluYXRpb25DbGFzcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbm5vdCB1c2UgYm90aCBiaW5kaW5ncyBbbGlzdF0gYW5kIFtkZXN0aW5hdGlvbkNsYXNzXSEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlID0gbmV3IERldGFpbFJvd0V4cGFuc2lvblN0YXRlKHRoaXMpO1xuXG4gICAgICAgIC8vIGluaXQgZGVmYXVsdCBjb2x1bW5zXG4gICAgICAgIHRoaXMucm93RGV0YWlsRXhwYW5kQ29sdW1uID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50KS5jcmVhdGUodGhpcy5pbmplY3RvcikuaW5zdGFuY2U7XG5cblxuICAgICAgICB0aGlzLm11bHRpU2VsZWN0Q29sdW1uID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShEVE11bHRpU2VsZWN0Q29sdW1uQ29tcG9uZW50KS5jcmVhdGUodGhpcy5pbmplY3RvcikuaW5zdGFuY2U7XG5cbiAgICAgICAgdGhpcy5zaW5nbGVTZWxlY3RDb2x1bW4gPSB0aGlzLmZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50KS5jcmVhdGUodGhpcy5pbmplY3RvcikuaW5zdGFuY2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoZSBkYXRhIGFyZSBub3QgZGVmZXJyZWQgYW5kIHdlIGdldCBsaXN0IGRpcmVjdGx5IHRoZW4gaXQgY3JlYXRlcyBEUy4gSWZcbiAgICAgICAgICogbmdPbkNoYW5nZXMgaXMgY2FsbGVkIGZpcnN0IHdlIHByb3Blcmx5IGluaXQgRFMgYW5kIGNsZWFuIHRoaXMubGlzdFxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmRlc3RpbmF0aW9uQ2xhc3MpIHx8IGlzUHJlc2VudCh0aGlzLmxpc3QpKSB7XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhc291cmNlKCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFTb3VyY2UuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGFzb3VyY2UoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2luY2Ugd2Ugd29yayB3aXRoIHJlZmVyZW5jZXMgbGV0J3MgcGFzcyBjcmVhdGVkIG1hcCBpbnNpZGUgb3VyIHN0YXRlXG4gICAgICAgIHRoaXMub3V0bGluZVN0YXRlLmV4cGFuc2lvblN0YXRlcyA9IHRoaXMuc3RhdGUub3V0bGluZVN0YXRlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBkYXRhIGFycml2ZXMgbGF0ZXIgbWF5YmUgZHVlIHRvIFJFU1QgQVBJIGxhdGVuY3ksIGluaXRpYWxpemUgRFMgb25seSB3aGVuIHdlIGhhdmUgYVxuICAgICAqIGRhdGEsIG90aGVyd2lzZSBpZiBkYXRhIGNoYW5nZWQgdGhydSB0aGUgYmluZGluZ3MganVzdCB0cmlnZ2VyIGRhdGFDaGFuZ2UgZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xpc3QnXSAmJiBpc1ByZXNlbnQoY2hhbmdlc1snbGlzdCddLmN1cnJlbnRWYWx1ZSlcbiAgICAgICAgICAgICYmICF0aGlzLmRhdGFTb3VyY2UuaW5pdGlhbGl6ZWQpIHtcblxuICAgICAgICAgICAgdGhpcy5pbml0RGF0YXNvdXJjZSgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhU291cmNlLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLm5leHQodGhpcy5saXN0KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBpbml0IGEgc3RhdGUgd2hlbiBkZXRhaWwgY29sdW1uIGlzIHByZXNlbnRcbiAgICAgICAgLy8gdG9kbzogbW92ZSB0aGlzIGluaXRpYWxpemF0aW9uIHRvIGRhdGFzb3VyY2VcbiAgICAgICAgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5kZXRhaWxFeHBhbnNpb25FbmFibGVkID0gaXNQcmVzZW50KHRoaXMucm93RGV0YWlsQ29sdW1uKTtcblxuICAgICAgICB0aGlzLmluaXRDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuY29sdW1uc1N1YnNjcmlwdGlvbiA9IHRoaXMuY29sc1F1ZXJ5LmNoYW5nZXMuc3Vic2NyaWJlKF8gPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0Q29sdW1ucygpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICAvLyBhc3NpZ24gaXQgcHJvZ3JhbWF0aWNhbGx5IGFzIHdlIHdhbnQgdG8gaGF2ZSBhIGNvbnRleHQgZm9yIHRoZSBmaWx0ZXJcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnJvd0RldGFpbENvbHVtbikgJiYgaXNQcmVzZW50KHRoaXMub3V0bGluZVN0YXRlLm91dGxpbmVGb3IpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yLmZpbHRlck91dCA9IHRoaXMuc2tpcE91dGxpbmVJdGVtLmJpbmQodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMub3V0bGluZVN0YXRlLm91dGxpbmVGb3IpKSB7XG4gICAgICAgICAgICAvLyB0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yLmNoYW5nZURldGVjdG9yLmRldGFjaCgpO1xuICAgICAgICAgICAgLy8gdGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvci5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnNDaGFuZ2VkICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0Zyb3plbkNvbHVtbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5mcm96ZW5Db2x1bW5zLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50LCBpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICAgICAgICAgIGNvbC5wb3N0SW5pdGlhbGl6ZShpbmRleCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50LCBpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICAgICAgICAgIGNvbC5wb3N0SW5pdGlhbGl6ZShpbmRleCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogS2V5IGVudHJ5IG1ldGhvZCB0aGF0IGluaXRpYWxpemVkIG91ciBjb2x1bW5zLiBMYXRlciBvbiB3aGVuIHdlIHdpbGwgc3VwcG9ydCBzZWxlY3Rpb24gYW5kXG4gICAgICogbXVsdGlzZWxlY3Rpb24gd2Ugd2lsbCBwcm9ncmFtbWF0aWNhbGx5IGluc3RhbnRpYXRlIFNpbmdsZVNlbGVjdGlvbiwgTXVsdGlTZWxlY3Rpb24gY29sdW1uXG4gICAgICogY29tcG9uZW50cyBhbmQgYWRkIHRoZW0gdG8gdGhlIGxpc3Qgc28gdGhleSBjYW4gYmUgcmVuZGVyZWQuXG4gICAgICpcbiAgICAgKiBzbyB0aGUgaWRlYSBoZXJlIGlzOlxuICAgICAqXG4gICAgICogV2hlbiBEVCBjb21wb25lbnQgaW5pdGlhbGl6ZSBhbmQgd2UgYXJlIGluIGVkaXRpbmcgbW9kZSBhbmQgd2Ugc3VwcG9ydCBTaW5nbGUvTXVsdGkgc2VsZWN0aW9uXG4gICAgICogd2Ugd2lsbCB1c2UgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHRvIGNyZWF0ZSBjb21wb25lbnQgYW5kIGFkZCBpdCBhcyBmaXJzdCBpdGVtIHRvIHRoZSBsaXN0XG4gICAgICogYW5kIHRoZW4gaXQgd2lsbCBiZSByZW5kZXJlZCBqdXN0IGxpa2UgYW55dGhpZ24gZWxzZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGluaXRDb2x1bW5zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgdGhpcy5mcm96ZW5Db2x1bW5zID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RGV0YWlsQ29sdW1uRXhwYW5zaW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpJykge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2godGhpcy5tdWx0aVNlbGVjdENvbHVtbik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNMZWFkaW5nU2VsZWN0Q29sdW1uKCkgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2godGhpcy5zaW5nbGVTZWxlY3RDb2x1bW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBleHBhbnNpb24gY29sdW1uIHdoZW4gZGV0YWlsIHJvdyBpcyBlbmFibGVkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5kZXRhaWxFeHBhbnNpb25FbmFibGVkICYmICF0aGlzLmlzT3V0bGluZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaCh0aGlzLnJvd0RldGFpbEV4cGFuZENvbHVtbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbHNRdWVyeVxuICAgICAgICAgICAgLmZpbHRlcigoY29sMTogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiAhY29sMS5mcm96ZW4pXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb2wuaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjb2wpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGlzLmluaXRGcm96ZW5Db2x1bW5zKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbHVtbkluZm8oKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBzdXJlIHRoYXQgd2UgYWxzbyBpbmNsdWRlIHByb2dyYW1tYXRpYyBjb2x1bW4gaWYgcHJlc2VudC4gTW92ZSB0aGVtIHRvIHRoZSBjb3JyZWN0XG4gICAgICogYXJyYXlcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdEZyb3plbkNvbHVtbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29sc1F1ZXJ5XG4gICAgICAgICAgICAuZmlsdGVyKChjb2wxOiBEVENvbHVtbjJDb21wb25lbnQpID0+IGNvbDEuZnJvemVuKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29sLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Db2x1bW5zLnB1c2goY29sKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZnJvemVuQ29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBmaW5kIGxhc3QgaW5kZXggb2YgY29sdW1uIHRoYXQgaXMgaW50ZXJuYWwgLyBwcm9ncmFtbWF0aWNcblxuICAgICAgICAgICAgbGV0IGxhc3RJbnggPSB0aGlzLmNvbHVtbnMuc2xpY2UoKVxuICAgICAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgICAgICAuZmluZEluZGV4KChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCkgPT4gdGhpcy5pc0ludGVybmFsQ29sdW1uKGNvbCkpO1xuXG4gICAgICAgICAgICBpZiAobGFzdElueCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5jb2x1bW5zLmxlbmd0aCAtIDEgLSBsYXN0SW54O1xuICAgICAgICAgICAgICAgIGxldCBpbnRlcm5hbENvbHMgPSB0aGlzLmNvbHVtbnMuc3BsaWNlKDAsIGlkeCArIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuQ29sdW1ucyA9IFsuLi5pbnRlcm5hbENvbHMsIC4uLnRoaXMuZnJvemVuQ29sdW1uc107XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGhhc1ZhbGlkQ29scyA9IHRoaXMuY29sdW1uc1xuICAgICAgICAgICAgICAgIC5maW5kSW5kZXgoKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiBpc0JsYW5rKGNvbC53aWR0aCkpID09PSAtMTtcblxuICAgICAgICAgICAgYXNzZXJ0KGhhc1ZhbGlkQ29scyB8fCBpc1ByZXNlbnQodGhpcy5zY3JvbGxXaWR0aCksXG4gICAgICAgICAgICAgICAgJ1doZW4gdXNpbmcgW2Zyb3plbl0gYmluZGluZyB5b3UgbmVlZCBzcGVjaWZ5IFt3aWR0aF0gZm9yIGVhY2ggJyArXG4gICAgICAgICAgICAgICAgJ2NvbHVtbiBvciBbc2Nyb2xsV2lkdGhdIG9uIGRhdGF0YWJsZSEnKTtcblxuXG4gICAgICAgICAgICBhc3NlcnQoaXNCbGFuayh0aGlzLnJvd0RldGFpbENvbHVtbiksXG4gICAgICAgICAgICAgICAgJ1lvdSBjYW5ub3QgY29tYmluZSBhdy1kdC1kZXRhaWwtY29sdW1uIHdpdGggZnJvemVuIGNvbHVtbnMhJyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGN1cnJlbnQgY29sdW1uIGlzIHByb2dyYW1tYXRpY2FsbHkgY3JlYXRlZFxuICAgICAqXG4gICAgICovXG4gICAgaXNJbnRlcm5hbENvbHVtbihjb2w6IERUQ29sdW1uMkNvbXBvbmVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gY29sIGluc3RhbmNlb2YgRFRTaW5nbGVTZWxlY3RDb2x1bW5Db21wb25lbnQgfHxcbiAgICAgICAgICAgIGNvbCBpbnN0YW5jZW9mIERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnQgfHxcbiAgICAgICAgICAgIGNvbCBpbnN0YW5jZW9mIERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IERhdGFzb3VyY2UgYmFzZWQgb24gcGFzc2VkIHZhbHVlcy4gSXQgdHJpZXMgdG8gaW5pdGlhbGl6ZSBEUyBmb3IgZmlyc3QgdGltZVxuICAgICAqIGluc2lkZSB0aGUgbmdJbml0IGJ1dCBpbiBjYXNlIERhdGEgYXJyaXZlcyBsYXRlciBtYXliZSBkdWUgdG8gc29tZSBSRVNUIEFQSSBjYWxscyB0aGlzXG4gICAgICogY2FuIGJlIHRyaWdnZXJlZCBhbHNvIGZyb20gbmdPbkNoYW5nZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0RGF0YXNvdXJjZShpbml0aWFsaXplOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IERhdGF0YWJsZTJTdGF0ZS5jcmVhdGUoMCwgdGhpcy5wYWdlU2l6ZSwgdGhpcy5kaXNwbGF5Um93U2l6ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxTb3J0S2V5LCB0aGlzLnNvcnRPcmRlcmluZ0ZvclN0cmluZyh0aGlzLmluaXRpYWxTb3J0T3JkZXIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUubGltaXQgPSB0aGlzLnN0YXRlLmRpc3BsYXlMaW1pdCA9IHRoaXMuZGlzcGxheVJvd1NpemU7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuaW5pdGlhbFNvcnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zb3J0S2V5ID0gdGhpcy5pbml0aWFsU29ydEtleTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNvcnRPcmRlciA9IHRoaXMuc29ydE9yZGVyaW5nRm9yU3RyaW5nKHRoaXMuaW5pdGlhbFNvcnRPcmRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLmluaXQoe1xuICAgICAgICAgICAgICAgIG9iajogaXNQcmVzZW50KHRoaXMuZGVzdGluYXRpb25DbGFzcykgPyB0aGlzLmRlc3RpbmF0aW9uQ2xhc3MgOiB0aGlzLmxpc3QsXG4gICAgICAgICAgICAgICAgcXVlcnlUeXBlOiBRdWVyeVR5cGUuRnVsbFRleHQsXG4gICAgICAgICAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmV0Y2godGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgLy8gcmVzZXQgbGlzdCB0byBtYWtlIHN1cmUgaXQgY29tZXMgZnJvbSBEYXRhUHJvdmlkZXIsIHdlIHVzZSBsaXN0ICB0byBpbml0aWFsaXplXG4gICAgICAgIHRoaXMubGlzdCA9IG51bGw7XG5cbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgRU5UUlkgcG9pbnQgZm9yIHRoZSBEQVRBIENIQU5HRVMuIEFsbCBhZGRpdGlvbiwgZWRpdHMsIGRlbGV0aW9uIGVuZHMgdXBcbiAgICAgICAgLy8gaGVyZS4gV2UgZG9udCB3b3JrIGRpcmVjdGx5IHdpdGggTElTVC4gQW55IGNoYW5nZSBpcyByZWFjdGl2ZSBhbmQgaGVyZSBpcyBsaXN0ZW5lclxuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uub3BlbigpLnN1YnNjcmliZSgoZGF0YTogYW55W10pID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBkZXRhaWxSb3cgY29sdW1uIGlzIHByZXNlbnQgd2UgaW5pdGlhbGl6ZSBhIHN0YXRlIGhvbGRpbmcgaW5mb3JtYXRpb24gd2hpY2ggaXRlbSBpc1xuICAgICAqIGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogdG9kbzogVGhpcyBpcyB0ZW1wb3JhcnkgaGVyZSBhbmQgb25jZSB3ZSBzdXBvcnQgbGF6eSBsb2FkaW5nIG1vdmUgdGhpcyB0byBkYXRhc291cmNlLlxuICAgICAqXG4gICAgICogRm9yIGV4YW1wbGUgZm9yIG91dGxpbmUgdHJlZSB0YWJsZSB3ZSBuZWVkIHRvIGNvbm5lY3QgYSBzdGF0ZSBmcm9tIG91dGxpbmUgd2l0aCBhIHN0YXRlIGluXG4gICAgICogaGVyZSBhcyB3ZSBhcmUgdXNpbmcgb3V0bGluZSBjb250cm9sIHRvIGV4cGFuZCBhbmQgY29sbGFwc2UgaXRlbXNcbiAgICAgKi9cbiAgICBpbml0RGV0YWlsQ29sdW1uRXhwYW5zaW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLmRldGFpbEV4cGFuc2lvbkVuYWJsZWQgPSBpc1ByZXNlbnQodGhpcy5yb3dEZXRhaWxDb2x1bW4pICYmXG4gICAgICAgICAgICBCb29sZWFuV3JhcHBlci5pc1RydWUodGhpcy5zaG93Um93RGV0YWlsRXhwYW5zaW9uQ29udHJvbCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBleGVjdXRlZCBhZnRlciB3ZSBpbml0aWFsaXplIGFsbCB0aGUgY29sdW1ucyBpbiBvcmRlciB0byBjYWxjdWxhdGUgY29ycmVjdFxuICAgICAqIG51bWJlcnMgdXNlZCBmb3IgaW5kZW50YXRpb24gd2hpbGUgcmVuZGVyaW5nIHNlbGVjdGlvbiBjb2x1bW5zIGFzIHdlbGwgYXMgZGV0YWlsIHJvdyBjb2x1bW5zLlxuICAgICAqXG4gICAgICogSGVyZSB3ZSBuZWVkIHRvIGJlIGF3YXJlIGhvdyBtYW55IGNvbHVtbnMgdG8gc3BhblxuICAgICAqXG4gICAgICovXG4gICAgaW5pdENvbHVtbkluZm8oKTogdm9pZCB7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZDb2xzQmVmb3JlRGF0YSA9IDA7XG5cbiAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvbC5pc1ZhbHVlQ29sdW1uKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlck9mQ29sc0JlZm9yZURhdGErKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5kZW50RGV0YWlsUm93KSB7XG4gICAgICAgICAgICB0aGlzLm51bWJlck9mQ29sc0JlZm9yZURhdGErKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhcnRPZkZpcnN0RGF0YUNvbHVtbiA9IHRoaXMuY29sdW1ucy5sZW5ndGggLSB0aGlzLm51bWJlck9mQ29sc0JlZm9yZURhdGE7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBzdGF0ZSBvdXQgdG8gYXBwbGljYXRpb24uIENhbiBiZSB1c2UgYXMgdHdvIHdheSBiaW5kaW5nc1xuICAgICAqXG4gICAgICogWyhzdGF0ZSldPWR0U3RhdGUocylcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0YXRlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTb3VyY2Uuc3RhdGU7XG4gICAgfVxuXG4gICAgc2V0IHN0YXRlKHZhbDogYW55KSB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zdGF0ZSA9IHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ2VsbFNlbGVjdGlvbkNoYW5nZShjZWxsOiBhbnksIGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSAhPT0gJ2NlbGwnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxvb2t1cEtleSA9IHtcbiAgICAgICAgICAgIGNvbDogY29sdW1uLmtleSB8fCBjb2x1bW4ubGFiZWwsXG4gICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH07XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zdGF0ZS5zZWxlY3Rpb24pICYmIHRoaXMuc3RhdGUuc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgbGV0IGZvdW5kSW5kZXggPSBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBsb29rdXBLZXkpO1xuICAgICAgICAgICAgbGV0IGlzU2VsZWN0ZWQgPSBmb3VuZEluZGV4ICE9PSAtMTtcblxuICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZhbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBpbmRleCAhPT0gZm91bmRJbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gWy4uLnRoaXMuc3RhdGUuc2VsZWN0aW9uLCBsb29rdXBLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbbG9va3VwS2V5XTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2VsbENoYW5nZS5lbWl0KHRoaXMuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25IZWFkZXJTZWxlY3Rpb25DaGFuZ2UoY2VsbDogYW55LCBjb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNIZWFkZXJTZWxlY3RlZChjb2x1bW4pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbiA9IGNvbHVtbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uID0gY29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25IZWFkZXJTZWxlY3Rpb24uZW1pdCh0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbik7XG4gICAgfVxuXG4gICAgb25IYW5kbGVSb3dDbGlja2VkKGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICAvLyBzcGVjaWFsIGFsdCBrZXkgbW9kaWZpZXIuIFdoZW4gdXNlZCB3aXRoIHJvd3MgaXQgaW5kaWNhdGVzIHRoZXJlIGlzIGEgRCZEIGVuYWJsZWRcbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpJykge1xuICAgICAgICAgICAgdGhpcy5vblJvd1RvZ2dsZShldmVudCwgaXRlbSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0KGV2ZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvblJvd1RvZ2dsZShldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJvd1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0YXRlLnNlbGVjdGlvbikgJiYgdGhpcy5zdGF0ZS5zZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGZvdW5kSW5kZXggPSBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBpdGVtKTtcbiAgICAgICAgICAgIGxldCBpc1NlbGVjdGVkID0gZm91bmRJbmRleCAhPT0gLTE7XG5cbiAgICAgICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh2YWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gaW5kZXggIT09IGZvdW5kSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgcm93U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbLi4udGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGl0ZW1dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmb3IgdGhlIG91dGxpbmUgZ28gdXAgYW5kIGRvd24gdGhlIHN5bmMgd2l0aCB0cmVlaXRlbXNcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0bGluZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuKGl0ZW0sIGlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMub0hhbmRsZU91dGxpbmVSb3dUb2dnbGVUb1BhcmVudChpdGVtLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gW2l0ZW1dO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc091dGxpbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbihpdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvUGFyZW50KGl0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Sb3dTZWxlY3Rpb25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBpc1NlbGVjdGVkOiByb3dTZWxlY3RlZCxcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuc3RhdGUuc2VsZWN0aW9uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25Sb3dTZWxlY3QoZXZlbnQ6IGFueSwgaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gaXRlbTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vblJvd1NlbGVjdGlvbkNoYW5nZS5lbWl0KGl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbihjdXJyZW50SXRlbTogYW55LCBpc1NlbGVjdGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGxldCBjaGlsZHJlbkZvck5vZGUgPSB0aGlzLmNoaWxkcmVuLmFwcGx5KHRoaXMuY29udGV4dCwgW2N1cnJlbnRJdGVtXSkgfHwgW107XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuRm9yTm9kZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBJZiBpcyBzZWxlY3RlZCBjdXJyZW50bHkgdGhlbiB0b2dnbGUgdG8gb3RoZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIC8vIHdoZW4gY2hlY2tpbmcgYWxsIGZyb20gcm9vdCwgZGVzZWxlY3QgY2hpbGRyZW4gYW5kIGFkZCBhbGxcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oY3VycmVudEl0ZW0sIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gWy4uLnRoaXMuc3RhdGUuc2VsZWN0aW9uLCAuLi5jaGlsZHJlbkZvck5vZGVdO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBlYWNoIGNoaWxkXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW5Gb3JOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZEluZGV4ID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh2YWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gaW5kZXggIT09IGZvdW5kSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYXBwbHkgdGhlIHNhbWUgZm9yIGNoaWxkcmVuIG9mIGNoaWxkcmVuXG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbkZvck5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvQ2hpbGRyZW4oY2hpbGQsIGlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvUGFyZW50KGN1cnJlbnRJdGVtOiBhbnksIGlzU2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGN1cnJlbnRJdGVtLiQkcGFyZW50SXRlbTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChwYXJlbnQpKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW5Gb3JOb2RlID0gdGhpcy5jaGlsZHJlbi5hcHBseSh0aGlzLmNvbnRleHQsIFtwYXJlbnRdKSB8fCBbXTtcblxuICAgICAgICAgICAgbGV0IGFsbFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuRm9yTm9kZSkge1xuICAgICAgICAgICAgICAgIGFsbFNlbGVjdGVkID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgY2hpbGQpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgICAmJiBhbGxTZWxlY3RlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFsbFNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyZW50SW5kZXggPSBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodmFsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGluZGV4ICE9PSBwYXJlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvUGFyZW50KGN1cnJlbnRJdGVtLiQkcGFyZW50SXRlbSwgaXNTZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uRG5EUm93RHJvcChvcmlnUG9zOiBudW1iZXIsIG5ld1BvczogbnVtYmVyLCBkcm9wUG9zOiBEcm9wUG9zaXRpb24pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmRhdGFTb3VyY2UpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRHJvcHBpbmcgcm93ICM6ICcsIG9yaWdQb3MgKyAnICcgKyBkcm9wUG9zICsgJyByb3cgIzogJyArIG5ld1Bvcyk7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UucmVvcmRlclJvd3Mob3JpZ1BvcywgbmV3UG9zLCBkcm9wUG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbk91dGxpbmVFeHBhbmRDaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgaXRlbSA9IGV2ZW50Lml0ZW07XG5cbiAgICAgICAgLy8gV2UgZG9udCByZWFsbHkgbmVlZCB0byBzdG9yZSBhIHN0YXRlIGZvcm0gb3V0bGluZSBsb2NhbGx5IGFzIHdlIGFyZSB1c2luZyB0aGUgc2FtZSBvYmplY3RcbiAgICAgICAgLy8gcmVmZXJlbmNlXG4gICAgICAgIC8vIHRoaXMuc3RhdGUub3V0bGluZVN0YXRlID0gdGhpcy5vdXRsaW5lU3RhdGUuZXhwYW5zaW9uU3RhdGVzO1xuXG4gICAgICAgIGlmICh0aGlzLmNhblVzZUZvckRldGFpbFJvdyhpdGVtKSkge1xuICAgICAgICAgICAgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS50b2dnbGUoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBzb3J0U2luZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkgJiYgaXNQcmVzZW50KHRoaXMuc29ydENvbHVtbikpIHtcblxuICAgICAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLnNvcnRDb2x1bW4ua2V5KSwgJ0ludmFsaWQgY29sdW1uIHRvIHNvcnQnKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0KHRoaXMuc29ydENvbHVtbi5rZXksIHRoaXMuc29ydENvbHVtbi5zb3J0T3JkZXIpO1xuXG4gICAgICAgICAgICB0aGlzLm9uU29ydC5lbWl0KHtcbiAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5zb3J0Q29sdW1uLmtleSxcbiAgICAgICAgICAgICAgICBvcmRlcjogdGhpcy5zb3J0Q29sdW1uLnNvcnRPcmRlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIGhhbmRsZURhdGFDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNvcnRLZXkgfHwgdGhpcy5zb3J0Q29sdW1uKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc29ydENvbHVtbiAmJiB0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRDb2x1bW4gPSB0aGlzLmNvbHVtbnMuZmluZChcbiAgICAgICAgICAgICAgICAgICAgY29sID0+IGNvbC5rZXkgPT09IHRoaXMuc3RhdGUuc29ydEtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGFUb1JlbmRlcigpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5saXN0KTtcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhVG9SZW5kZXIoZGF0YXNvdXJjZT86IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFUb1JlbmRlciA9IGRhdGFzb3VyY2UgfHwgdGhpcy5saXN0O1xuICAgICAgICAvLyB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGN1cnJlbnQgaW1tdXRhYmxlIGxpc3QgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbi4gTmVlZCB0byB3cmFwIGl0IHdpdGhcbiAgICAgKiBzZXRUaW1lb3V0IGFzIHRoZSBjaGFuZ2UgY2FuIGVhc2lseSBjb21lIGFmdGVyIHZpZXcgY2hlY2tlZCBhbmQgdGhpcyB3b3VsZCByZXN1bHQgc29tZSBlcnJvcnNcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlTGlzdChuZXdMaXN0OiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IG5ld0xpc3Q7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZURhdGFDaGFuZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuc29ydENvbHVtbiA9IG51bGw7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0YVRvUmVuZGVyKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBpc0hlYWRlclNlbGVjdGVkKGl0ZW06IERUQ29sdW1uMkNvbXBvbmVudCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2xNYXRjaGVkID0gaXRlbS5rZXkgfHwgaXRlbS5sYWJlbDtcbiAgICAgICAgbGV0IGN1cnJlbnRDb2wgPSB0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbi5rZXkgfHwgdGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24ubGFiZWw7XG4gICAgICAgIHJldHVybiBjb2xNYXRjaGVkID09PSBjdXJyZW50Q29sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0JvZHlDZWxsU2VsZWN0ZWQoY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbG9va3VwS2V5ID0ge1xuICAgICAgICAgICAgY29sOiBjb2x1bW4ua2V5IHx8IGNvbHVtbi5sYWJlbCxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLnN0YXRlLnNlbGVjdGlvbikgJiZcbiAgICAgICAgICAgIExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGxvb2t1cEtleSkgIT09IC0xO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaXNSb3dTZWxlY3RlZChpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpICYmIGlzUHJlc2VudCh0aGlzLnN0YXRlLnNlbGVjdGlvbikpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBpdGVtKSAhPT0gLTE7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcXVhbHModGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRG8gd2UgaGF2ZSBkYXRhIHRvIHJlbmRlciBVc2VkIGluc2lkZSB0ZW1wbGF0ZSB0byB0ZWxsIGlmIHdlIHNob3VsZCB1c2UgdGhlIE5vRGF0YSB0ZW1wbGF0ZVxuICAgICAqXG4gICAgICovXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIGlzQmxhbmsodGhpcy5kYXRhVG9SZW5kZXIpIHx8ICh0aGlzLmRhdGFUb1JlbmRlci5sZW5ndGggPT09IDApO1xuICAgIH1cblxuXG4gICAgaGFzRnJvemVuQ29sdW1ucygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmZyb3plbkNvbHVtbnMpICYmIHRoaXMuZnJvemVuQ29sdW1ucy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIGhhc0ludmlzaWJsZVNlbGVjdGlvbkNvbHVtbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpICYmICF0aGlzLnNob3dTZWxlY3Rpb25Db2x1bW47XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSAhPT0gJ25vbmUnICYmIHRoaXMuc2VsZWN0aW9uTW9kZSAhPT0gJ2NlbGwnO1xuICAgIH1cblxuXG4gICAgdmlzaWJsZUNvbHVtbnMoKTogRFRDb2x1bW4yQ29tcG9uZW50W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2x1bW5zID8gdGhpcy5jb2x1bW5zLmZpbHRlcihjID0+IGMuaXNWaXNpYmxlKSA6IFtdO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBzb3J0T3JkZXJpbmdGb3JTdHJpbmcoZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBpZiAoaXNCbGFuayhkaXJlY3Rpb24pIHx8IGRpcmVjdGlvbiA9PT0gJ2FzY2VuZGluZycpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoZGlyZWN0aW9uKSB8fCBkaXJlY3Rpb24gPT09ICdkZXNjZW5kaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRvZG86IGxvZyBiYWQga2V5XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cblxuXG4gICAgc29ydE9yZGVyaW5nRm9yTnVtYmVyKGRpcmVjdGlvbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoZGlyZWN0aW9uKSB8fCBkaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNjZW5kaW5nJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKGRpcmVjdGlvbikgfHwgZGlyZWN0aW9uID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuICdkZXNjZW5kaW5nJztcbiAgICAgICAgfVxuICAgICAgICAvLyB0b2RvOiBsb2cgYmFkIGtleVxuICAgICAgICByZXR1cm4gJ2FzY2VuZGluZyc7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIHRvZ2dsZUFsbENvbHVtbnMoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW1zID0gdGhpcy5kYXRhVG9SZW5kZXIgfHwgW107XG4gICAgICAgIGxldCBzZWxlY3RlZE9iamVjdCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uIHx8IFtdO1xuICAgICAgICBpZiAoc2VsZWN0ZWRPYmplY3QubGVuZ3RoID49IGN1cnJlbnRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbLi4uY3VycmVudEl0ZW1zXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc1RvZ2dsZUFsbENvbHVtblNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW1zID0gdGhpcy5kYXRhVG9SZW5kZXIgfHwgW107XG4gICAgICAgIGxldCBzZWxlY3RlZE9iamVjdCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uIHx8IFtdO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50SXRlbXMubGVuZ3RoID4gMCAmJiBzZWxlY3RlZE9iamVjdC5sZW5ndGggPj0gY3VycmVudEl0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpc1RvZ2dsZUFsbENvbHVtbkRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW1zID0gdGhpcy5kYXRhVG9SZW5kZXIgfHwgW107XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtcy5sZW5ndGggPT09IDA7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgYnkgdGVtcGxhdGUgdG8gZGVjaWRlIGlmIHdlIG5lZWQgdG8gcmVuZGVyIERldGFpbFJvdyB0ZW1wbGF0ZS4gV2UgbmVlZCB0byBoYXZlXG4gICAgICogRGV0YWlsUm93IENvbnRlbnRDaGlsZCBhbmQgdXNpbmcgRGV0YWlsUm93IGNvbXBvbmVudCBbaXNWaXNpYmxlRm5dIGZ1bmN0aW9uIGJpbmRpbmcgd2VcbiAgICAgKiBjaGVjayBpZiB0aGUgaXRlbSB0aGF0IGlzIGFib3V0IHRvIGJlIHJlbmRlcmVkIGlzIGVsaWdpYmxlIGZvciBkZXRhaWwgcm93XG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93RGV0YWlsQ29sdW1uKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5jYW5Vc2VGb3JEZXRhaWxSb3coaXRlbSkgJiYgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5pc0V4cGFuZGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5Vc2VGb3JEZXRhaWxSb3coaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5yb3dEZXRhaWxDb2x1bW4pICYmXG4gICAgICAgICAgICAoPERURGV0YWlsUm93Q29tcG9uZW50PnRoaXMucm93RGV0YWlsQ29sdW1uKS5zaG93RGV0YWlsUm93KGl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc091dGxpbmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jaGlsZHJlbik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gZGVhbGluZyB3aXRoIGRldGFpbCBjb2x1bW4gKGRldGFpbCByb3cpIGFuZCBvdXRsaW5lIGFsbCB0b2dldGhlciB3ZSBuZWVkIGhhdmUgYVxuICAgICAqIG1lY2hhbmlzbSB0byB0ZWxsIHRvIHRoZSBvdXRsaW5lIFwiZG9uJ3QgcmVuZGVyIHRoZSBuZXh0IGxldmVsIG9mIGl0ZW1zXCIgYW5kIHVzZSBkZXRhaWwgcm93LlxuICAgICAqIFNvIGNlcnRhaW4gaXRlbSB0eXBlIG5lZWRzIHRvIGJlIHNraXBwZWQuXG4gICAgICpcbiAgICAgKiBUaGUgd2F5IHdlIHNraXAgdGhvc2UgaXRlbSBpcyB3ZSB1c2UgaXNWaXNpYmxlRm4gY29uZGl0aW9uIG9mIHRoZSBkZXRhaWwgcm93IGFuZCBsb29rIGFoZWFkXG4gICAgICogaWYgd2Ugc2hvdWxkIHNraXAgbmV4dCBsZXZlbC5cbiAgICAgKlxuICAgICAqL1xuICAgIHNraXBPdXRsaW5lSXRlbShpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuVXNlRm9yRGV0YWlsUm93KGl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0VmFsdWUoZGF0YTogYW55LCBmaWVsZDogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIEZpZWxkUGF0aC5nZXRGaWVsZFZhbHVlKGRhdGEsIGZpZWxkKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uc1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4iXX0=