/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
         *
         * See OutlineFor  - format - only used in the tree mode
         */
        _this.outlineFormat = 'free';
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
            var /** @type {?} */ qType = (this.isOutline() && this.outlineFormat === 'tree') ?
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
        if (isPresent(this.rowDetailColumn)) {
            this.rowDetailColumn.initialize(this);
        }
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
            // console.log('Dropping row #: ', origPos + ' ' + dropPos + ' row #: ' + newPos);
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
        if (isBlank(this.children) && isPresent(this.dataToRender)
            && this.dataToRender.length > 0 && isOutlineNode(this.dataToRender[0])) {
            this.outlineFormat = 'tree';
        }
        // this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
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
        return isPresent(this.children) || this.outlineFormat === 'tree';
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
    Datatable2Component.decorators = [
        { type: Component, args: [{
                    selector: 'aw-datatable2',
                    template: "<!--\n    This template focus only on header and body rendering.\n\n    This datatable also supports frozen column and for this rendering it is pretty much transparent\n    as it received sets of column that it needs to render from the TableWrapper.\n\n    TableWrapper in case of frozen columns calls #headerRows and #bodyRows templates twice to\n    render to separate tables where one has frozen columns and another one has the rest and its\n    scrollable\n-->\n\n<aw-dt-wrapper #dtWrapper>\n    <ng-template #headingArea>\n        <ng-content select=\"aw-dt-header2\"></ng-content>\n    </ng-template>\n\n    <ng-template #headerRows let-colsToRender let-frozenView=\"frozenColumns\">\n        <ng-container\n            *ngTemplateOutlet=\"header; context:{$implicit: colsToRender, frozen:frozenView }\">\n        </ng-container>\n    </ng-template>\n\n    <ng-template #bodyRows let-colsToRender>\n        <ng-template [ngIf]=\"isOutline()\">\n            <ng-container\n                *ngTemplateOutlet=\"bodyOutline; context:{$implicit: colsToRender}\"></ng-container>\n        </ng-template>\n        <ng-template [ngIf]=\"!isOutline()\">\n            <ng-container\n                *ngTemplateOutlet=\"bodyPlain; context:{$implicit: colsToRender}\"></ng-container>\n        </ng-template>\n    </ng-template>\n</aw-dt-wrapper>\n\n\n<!--\n    Each rendering column has its own renderTemplate which define how things should be render.\n    Based on different column types this code should be transparent as we dont care on this\n    level what kind of column we are rendering.\n\n    Later on when we will support single/multi selection, this will be just another column extending\n    DTColumn and providing its own template\n\n    We pass into this template if we are rendering header, subHeader, or data\n-->\n<ng-template #header let-colsToRender let-frozen=\"frozen\">\n    <tr>\n        <ng-template ngFor let-col [ngForOf]=\"colsToRender\" let-lastCol=\"last\"\n                     let-columnIndex=\"index\">\n\n            <ng-container *ngTemplateOutlet=\"col.rendererTemplate;\n                context:{$implicit: true, isSubHeader:false,\n                columnIndex:(frozen ? columnIndex: (columns.length + columnIndex))}\">\n            </ng-container>\n        </ng-template>\n    </tr>\n\n    <tr *ngIf=\"showSubHeader\">\n        <ng-template ngFor let-col [ngForOf]=\"colsToRender\" let-lastCol=\"last\">\n            <ng-container *ngTemplateOutlet=\"col.rendererTemplate;\n                context:{$implicit: true, isSubHeader:true}\">\n            </ng-container>\n        </ng-template>\n    </tr>\n</ng-template>\n\n\n<ng-template #bodyPlain let-colsToRender>\n\n    <tbody [ngClass]=\"{'dt-content dt-data-cells ': true, 'dt-is-hoverable-row': rowHover}\">\n\n    <ng-template ngFor let-rowData [ngForOf]=\"dataToRender\" let-even=\"even\" let-odd=\"odd\"\n                 let-rowIndex=\"index\" [ngForTrackBy]=\"rowTrackBy\">\n\n        <ng-container *ngTemplateOutlet=\"rowTemplate; context:{$implicit: rowData, even:even,\n                                          odd:odd, rowIndex:rowIndex, colsToRender:colsToRender}\">\n        </ng-container>\n\n        <ng-template [ngIf]=\"showDetailColumn(rowData)\">\n            <ng-container *ngTemplateOutlet=\"rowDetailColumn.rendererTemplate;\n                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}\">\n            </ng-container>\n        </ng-template>\n\n    </ng-template>\n    <ng-container *ngTemplateOutlet=\"noData\"></ng-container>\n    </tbody>\n</ng-template>\n\n\n<ng-template #bodyOutline let-colsToRender>\n    <tbody #outlineFor awOutlineFor [list]=\"dataToRender\"\n           [format]=\"outlineFormat\"\n           [context]=\"context\"\n           [indentationPerLevel]=\"indentationPerLevel\"\n           [pushRootSectionOnNewLine]=\"pushRootSectionOnNewLine\"\n           [children]=\"children\" [expandAll]=\"expandAll\"\n           [state]=\"outlineState\"\n           [ngClass]=\"{'dt-content dt-data-cells ': true,\n                           'dt-is-hoverable-row': rowHover}\"\n           (onExpandChange)=\"onOutlineExpandChange($event)\">\n\n    <ng-template #outline let-rowData let-nestingLevel=\"nestingLevel\" let-rowIndex=\"rowIndex\">\n        <ng-container *ngTemplateOutlet=\"rowTemplate;\n                                context:{$implicit: rowData, nestingLevel:nestingLevel, colsToRender:colsToRender}\">\n        </ng-container>\n\n        <ng-template [ngIf]=\"showDetailColumn(rowData)\">\n            <ng-container *ngTemplateOutlet=\"rowDetailColumn.rendererTemplate;\n                    context:{$implicit: false, data:rowData, rowIndex:(rowIndex)}\">\n            </ng-container>\n        </ng-template>\n\n    </ng-template>\n    <ng-container *ngTemplateOutlet=\"noData\"></ng-container>\n    </tbody>\n</ng-template>\n\n<!--\n    Default template that is display when there are no data\n-->\n<ng-template #noData>\n    <tr *ngIf=\"isEmpty()\" class=\" dt-emptymessage-row\"\n        [style.visibility]=\"loading ? 'hidden' : 'visible'\">\n\n        <td [attr.colspan]=\"visibleColumns().length\" class=\"dt-emptymessage\">\n            <span *ngIf=\"!emptyMessageTemplate\">{{emptyMessage}}</span>\n            <ng-container *ngTemplateOutlet=\"emptyMessageTemplate\"></ng-container>\n        </td>\n    </tr>\n</ng-template>\n\n<!--\n    Template that renders actual row. Renders both header and body column. Each rendered\n    column has its own template called rendererTemplate that has all things that needs to be\n    rendered and we just tell the template if we are rendering header, subheader or body\n-->\n<ng-template #rowTemplate let-rowData let-even=\"event\" let-odd=\"odd\" let-rowIndex=\"rowIndex\"\n             let-nestingLevel=\"nestingLevel\" let-colsToRender=\"colsToRender\">\n\n\n    <tr #rowElement dtDraggableRow [dndRowIndex]=\"rowIndex\"\n        class=\"dt-body-row\"\n        (click)=\"onHandleRowClicked($event, rowData)\"\n        [attr.nestingLevel]=\"nestingLevel\"\n        [ngClass]=\"{'dt-even-row': even, 'dt-odd-row': odd,\n            'dt-row-selected': isRowSelected(rowData),\n            'dt-row-draggable': dndRowEnabled,\n            'dt-root-section': nestingLevel === 0 }\">\n\n        <ng-template ngFor let-col [ngForOf]=\"colsToRender\" let-colIndex=\"index\">\n            <ng-container *ngTemplateOutlet=\"col.rendererTemplate;\n                    context:{$implicit: false, data:rowData, rowIndex:rowIndex,\n                    nestingLevel:nestingLevel}\">\n            </ng-container>\n        </ng-template>\n    </tr>\n</ng-template>\n\n\n",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2RhdGF0YWJsZTIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBNkJBLE9BQU8sRUFJSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFFVCxXQUFXLEVBQ1gsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUVqRSxPQUFPLEVBQUMsYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzdELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQ0gsTUFBTSxFQUNOLGNBQWMsRUFDZCxXQUFXLEVBQ1gsTUFBTSxFQUNOLFNBQVMsRUFDVCxPQUFPLEVBQ1AsU0FBUyxFQUNULFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqRixPQUFPLEVBQ0gsNEJBQTRCLEVBQy9CLE1BQU0sK0RBQStELENBQUM7QUFDdkUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FB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QyxhQUFhO2lDQU8xQixZQUFZLFNBQUMsVUFBVTtvQ0FNdkIsWUFBWSxTQUFDLGFBQWE7K0JBTTFCLFlBQVksU0FBQyxRQUFRO3VDQU9yQixZQUFZLFNBQUMsY0FBYzs0QkFpQjNCLGVBQWUsU0FBQyxrQkFBa0I7a0NBT2xDLFlBQVksU0FBQyxvQkFBb0I7OEJBU2pDLE1BQU07NEJBSU4sV0FBVyxTQUFDLE9BQU87d0JBK0duQixLQUFLOzs4QkFsd0JWO0VBa1N5QyxhQUFhO1NBQXpDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqICBAb3JpZ2luYWwtbGljZW5zZVxuICogIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IFByaW1lVGVrXG4gKlxuICogIENyZWRpdDogRGVyaXZlZCBhbmQgZXh0ZW5kZWQgZnJvbSBQcmltZS1uZyBkYXRhYmxlIHdoZXJlIHdlIG5lZWRlZCBtb3JlIG1vZHVsYXIgc29sdXRpb24uXG4gKiAgV2UgcmV1c2VkIHRoZSBjb3JlIHN0cnVjdHVyZSBhbmQgbGF5b3V0IGJ1dCBoYWQgdG8gcmVmYWN0b3IgYm90aCBjb2RlIGFuZCB0ZW1wbGF0ZSB0byBtYXRjaCBvdXJcbiAqICBuZWVkcy4gTW9yZSBpbiB0aGUgZGVzY3JpcHRpb25cbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0b3IsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JqZWN0VXRpbHN9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy91dGlscy9vYmplY3R1dGlscyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2lzT3V0bGluZU5vZGUsIE91dGxpbmVTdGF0ZX0gZnJvbSAnLi4vb3V0bGluZS9pbmRleCc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBhc3NlcnQsXG4gICAgQm9vbGVhbldyYXBwZXIsXG4gICAgRW52aXJvbm1lbnQsXG4gICAgZXF1YWxzLFxuICAgIEZpZWxkUGF0aCxcbiAgICBpc0JsYW5rLFxuICAgIGlzUHJlc2VudCxcbiAgICBMaXN0V3JhcHBlclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QVdEYXRhVGFibGUsIERyb3BQb3NpdGlvbn0gZnJvbSAnLi9hdy1kYXRhdGFibGUnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4vY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtEVEhlYWRlckNvbXBvbmVudDJ9IGZyb20gJy4vaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtEVERldGFpbFJvd0NvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4vZGV0YWlsLXJvdy9kdC1kZXRhaWwtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnRcbn0gZnJvbSAnLi9jb2x1bW4vZGV0YWlsLXJvdy1leHBhbmRlci9kdC1kZXRhaWwtcm93LWV4cGFuZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0RBVEFfU09VUkNFfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJzfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1wcm92aWRlcnMnO1xuaW1wb3J0IHtEYXRhRmluZGVycywgUXVlcnlUeXBlfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1maW5kZXJzJztcbmltcG9ydCB7RGF0YXRhYmxlMlN0YXRlLCBEZXRhaWxSb3dFeHBhbnNpb25TdGF0ZSwgRFQyRGF0YVNvdXJjZX0gZnJvbSAnLi9kYXRhdGFibGUyLWRhdGEtc291cmNlJztcbmltcG9ydCB7XG4gICAgRFRNdWx0aVNlbGVjdENvbHVtbkNvbXBvbmVudFxufSBmcm9tICcuL2NvbHVtbi9tdWx0aS1zZWxlY3QvZHQtbXVsdGktc2VsZWN0LWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBEVFNpbmdsZVNlbGVjdENvbHVtbkNvbXBvbmVudFxufSBmcm9tICcuL2NvbHVtbi9zaW5nbGUtc2VsZWN0L2R0LXNpbmdsZS1zZWxlY3QtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQge01vZGVsRm9ybWF0fSBmcm9tICcuLi9vdXRsaW5lL291dGxpbmUtZm9yLmNvbXBvbmVudCc7XG5cblxuZXhwb3J0IHR5cGUgU2VsZWN0aW9uTW9kZSA9ICdtdWx0aScgfCAnc2luZ2xlJyB8ICdjZWxsJyB8ICdub25lJztcblxuLyoqXG4gKiBEVCBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzIHRoZSBkYXRhIGdyaWQgdGhhdCBzaG93cyB0YWJ1bGFyIGRhdGEuIEV2ZW4gdGhlIGJhc2ljXG4gKiBzdHJ1Y3R1cmUgaXMgYmFzZWQgb24gUHJpbWVORyBkYXRhdGFibGUgaXRzIGNvbXBsZXRlbHkgcmVmYWN0b3JlZCBpbnRvIHNtYWxsZXIgcGllY2VzIHRoYXRcbiAqIGFsbG93cyBtb3JlIGV4dGVuc2liaWxpdHkgYW5kIHRyeWluZyB0byBzdGF5IGFzIGNsb3NlIGFzIHBvc3NpYmxlIHRvIGV4aXN0aW5nIEFXTCBpbXBsZW1lbnRhdGlvblxuICpcbiAqIFRoZXJlIGFyZSAzIG1haW4gcGllY2VzOlxuICpcbiAqICBUYWJsZSBXcmFwcGVyIC0gZm9jdXNlcyBvbiB0aGUgb3V0ZXIgc3RydWN0dXJlLiBDb250YWluZXIgd2l0aCBiYXNpYyBkYXRhYmxlIGxheW91dCBwbHVzXG4gKiAgY29udGFpbnMgYW55IGFkZGl0aW9uYWwgcGFuZWxzIHRoYXQgZGF0YXRhYmxlIG5lZWRzIHN1Y2ggYXMgb3VyIG5ldyBjb25jZXB0IGhvdyBlZGl0aW5nIHdpbGxcbiAqICB3b3JrIC0gc2xpZGluZyBwYW5lbCBmcm9tIHRoZSBib3R0b21cbiAqXG4gKiAgRGF0YXRhYmxlIENvbHVtbiAtIEluc3RlYWQgb2YgcmVuZGVyaW5nIGV2ZXJ5dGhpbmcgaW5zaWRlIERUIEkgc3BsaXQgdGhlIHBhcnQgdGhhdCByZW5kZXJzXG4gKiAgY29sdW1uIGludG8gc2VwYXJhdGUgY29tcG9uZW50LiBUaGlzIHdheSBjb21wb25lbnQgY29sdW1uIGhhcyBpdHMgb3duIHJlbmRlcmVyIHRlbXBsYXRlIHdoaWNoXG4gKiAgY2FuIHJlbmRlciBib3RoIGhlYWRlciBhbmQgZGF0YSBjZWxscy5cbiAqICBMYXRlciBvbiBEVENvbHVtbiBpcyB0aGVuIGV4dGVuZGVkIHRvIHN1cHBvcnQgb3RoZXIgYWRkaXRpb25hbCBjb2x1bW4gdHlwZXNcbiAqICBTaW5nbGVTZWxlY3Rpb25Db2x1bW4sIE11bHRpU2VsZWN0aW9uQ29sdW1uLCBib3RoIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgc2VsZWN0aW9uIGNvbnRyb2xzLlxuICpcbiAqIFRvIHN1cHBvcnQgcGl2b3RhbCBsYXlvdXQgdGhpcyBjYW4gYmUgZXh0ZW5kZWQgZm9yIG90aGVyIGFkZGl0aW9uYWwgY29sdW1ucyB0aGF0IGltcGxlbWVudHMgdGhlaXJcbiAqIG93biByZW5kZXJpbmcgdGVtcGxhdGVzXG4gKlxuICogRGF0YXRhYmxlIC0gVGhlIG1haW4gY29tcG9uZW50IHRoYXQgaXMgb25seSBmb2N1cyBvbiBoZWFkZXIgYW5kIGJvZHkgcmVuZGVyaW5nIGFuZCBiYXNhZWQgb24gdGhlXG4gKiBjb2x1bW4gdHlwZSBpdCB3aWxsIHJlbmRlciB0aGUgY29ycmVjdCB0ZW1wbGF0ZVxuICogY29sdW1uIHR5cGUgaXQgd2lsbCByZW5kZXIgdGhlIGNvcnJlY3QgdGVtcGxhdGVcbiAqXG4gKlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWRhdGF0YWJsZTInLFxuICAgIHRlbXBsYXRlOiBgPCEtLVxuICAgIFRoaXMgdGVtcGxhdGUgZm9jdXMgb25seSBvbiBoZWFkZXIgYW5kIGJvZHkgcmVuZGVyaW5nLlxuXG4gICAgVGhpcyBkYXRhdGFibGUgYWxzbyBzdXBwb3J0cyBmcm96ZW4gY29sdW1uIGFuZCBmb3IgdGhpcyByZW5kZXJpbmcgaXQgaXMgcHJldHR5IG11Y2ggdHJhbnNwYXJlbnRcbiAgICBhcyBpdCByZWNlaXZlZCBzZXRzIG9mIGNvbHVtbiB0aGF0IGl0IG5lZWRzIHRvIHJlbmRlciBmcm9tIHRoZSBUYWJsZVdyYXBwZXIuXG5cbiAgICBUYWJsZVdyYXBwZXIgaW4gY2FzZSBvZiBmcm96ZW4gY29sdW1ucyBjYWxscyAjaGVhZGVyUm93cyBhbmQgI2JvZHlSb3dzIHRlbXBsYXRlcyB0d2ljZSB0b1xuICAgIHJlbmRlciB0byBzZXBhcmF0ZSB0YWJsZXMgd2hlcmUgb25lIGhhcyBmcm96ZW4gY29sdW1ucyBhbmQgYW5vdGhlciBvbmUgaGFzIHRoZSByZXN0IGFuZCBpdHNcbiAgICBzY3JvbGxhYmxlXG4tLT5cblxuPGF3LWR0LXdyYXBwZXIgI2R0V3JhcHBlcj5cbiAgICA8bmctdGVtcGxhdGUgI2hlYWRpbmdBcmVhPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJhdy1kdC1oZWFkZXIyXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI2hlYWRlclJvd3MgbGV0LWNvbHNUb1JlbmRlciBsZXQtZnJvemVuVmlldz1cImZyb3plbkNvbHVtbnNcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXI7IGNvbnRleHQ6eyRpbXBsaWNpdDogY29sc1RvUmVuZGVyLCBmcm96ZW46ZnJvemVuVmlldyB9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI2JvZHlSb3dzIGxldC1jb2xzVG9SZW5kZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc091dGxpbmUoKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keU91dGxpbmU7IGNvbnRleHQ6eyRpbXBsaWNpdDogY29sc1RvUmVuZGVyfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWlzT3V0bGluZSgpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJib2R5UGxhaW47IGNvbnRleHQ6eyRpbXBsaWNpdDogY29sc1RvUmVuZGVyfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctdGVtcGxhdGU+XG48L2F3LWR0LXdyYXBwZXI+XG5cblxuPCEtLVxuICAgIEVhY2ggcmVuZGVyaW5nIGNvbHVtbiBoYXMgaXRzIG93biByZW5kZXJUZW1wbGF0ZSB3aGljaCBkZWZpbmUgaG93IHRoaW5ncyBzaG91bGQgYmUgcmVuZGVyLlxuICAgIEJhc2VkIG9uIGRpZmZlcmVudCBjb2x1bW4gdHlwZXMgdGhpcyBjb2RlIHNob3VsZCBiZSB0cmFuc3BhcmVudCBhcyB3ZSBkb250IGNhcmUgb24gdGhpc1xuICAgIGxldmVsIHdoYXQga2luZCBvZiBjb2x1bW4gd2UgYXJlIHJlbmRlcmluZy5cblxuICAgIExhdGVyIG9uIHdoZW4gd2Ugd2lsbCBzdXBwb3J0IHNpbmdsZS9tdWx0aSBzZWxlY3Rpb24sIHRoaXMgd2lsbCBiZSBqdXN0IGFub3RoZXIgY29sdW1uIGV4dGVuZGluZ1xuICAgIERUQ29sdW1uIGFuZCBwcm92aWRpbmcgaXRzIG93biB0ZW1wbGF0ZVxuXG4gICAgV2UgcGFzcyBpbnRvIHRoaXMgdGVtcGxhdGUgaWYgd2UgYXJlIHJlbmRlcmluZyBoZWFkZXIsIHN1YkhlYWRlciwgb3IgZGF0YVxuLS0+XG48bmctdGVtcGxhdGUgI2hlYWRlciBsZXQtY29sc1RvUmVuZGVyIGxldC1mcm96ZW49XCJmcm96ZW5cIj5cbiAgICA8dHI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY29sIFtuZ0Zvck9mXT1cImNvbHNUb1JlbmRlclwiIGxldC1sYXN0Q29sPVwibGFzdFwiXG4gICAgICAgICAgICAgICAgICAgICBsZXQtY29sdW1uSW5kZXg9XCJpbmRleFwiPlxuXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLnJlbmRlcmVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgY29udGV4dDp7JGltcGxpY2l0OiB0cnVlLCBpc1N1YkhlYWRlcjpmYWxzZSxcbiAgICAgICAgICAgICAgICBjb2x1bW5JbmRleDooZnJvemVuID8gY29sdW1uSW5kZXg6IChjb2x1bW5zLmxlbmd0aCArIGNvbHVtbkluZGV4KSl9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L3RyPlxuXG4gICAgPHRyICpuZ0lmPVwic2hvd1N1YkhlYWRlclwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNvbCBbbmdGb3JPZl09XCJjb2xzVG9SZW5kZXJcIiBsZXQtbGFzdENvbD1cImxhc3RcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2wucmVuZGVyZXJUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IHRydWUsIGlzU3ViSGVhZGVyOnRydWV9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L3RyPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48bmctdGVtcGxhdGUgI2JvZHlQbGFpbiBsZXQtY29sc1RvUmVuZGVyPlxuXG4gICAgPHRib2R5IFtuZ0NsYXNzXT1cInsnZHQtY29udGVudCBkdC1kYXRhLWNlbGxzICc6IHRydWUsICdkdC1pcy1ob3ZlcmFibGUtcm93Jzogcm93SG92ZXJ9XCI+XG5cbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvd0RhdGEgW25nRm9yT2ZdPVwiZGF0YVRvUmVuZGVyXCIgbGV0LWV2ZW49XCJldmVuXCIgbGV0LW9kZD1cIm9kZFwiXG4gICAgICAgICAgICAgICAgIGxldC1yb3dJbmRleD1cImluZGV4XCIgW25nRm9yVHJhY2tCeV09XCJyb3dUcmFja0J5XCI+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJvd1RlbXBsYXRlOyBjb250ZXh0OnskaW1wbGljaXQ6IHJvd0RhdGEsIGV2ZW46ZXZlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9kZDpvZGQsIHJvd0luZGV4OnJvd0luZGV4LCBjb2xzVG9SZW5kZXI6Y29sc1RvUmVuZGVyfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwic2hvd0RldGFpbENvbHVtbihyb3dEYXRhKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJvd0RldGFpbENvbHVtbi5yZW5kZXJlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IGZhbHNlLCBkYXRhOnJvd0RhdGEsIHJvd0luZGV4Oihyb3dJbmRleCl9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5vRGF0YVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvdGJvZHk+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjYm9keU91dGxpbmUgbGV0LWNvbHNUb1JlbmRlcj5cbiAgICA8dGJvZHkgI291dGxpbmVGb3IgYXdPdXRsaW5lRm9yIFtsaXN0XT1cImRhdGFUb1JlbmRlclwiXG4gICAgICAgICAgIFtmb3JtYXRdPVwib3V0bGluZUZvcm1hdFwiXG4gICAgICAgICAgIFtjb250ZXh0XT1cImNvbnRleHRcIlxuICAgICAgICAgICBbaW5kZW50YXRpb25QZXJMZXZlbF09XCJpbmRlbnRhdGlvblBlckxldmVsXCJcbiAgICAgICAgICAgW3B1c2hSb290U2VjdGlvbk9uTmV3TGluZV09XCJwdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmVcIlxuICAgICAgICAgICBbY2hpbGRyZW5dPVwiY2hpbGRyZW5cIiBbZXhwYW5kQWxsXT1cImV4cGFuZEFsbFwiXG4gICAgICAgICAgIFtzdGF0ZV09XCJvdXRsaW5lU3RhdGVcIlxuICAgICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWNvbnRlbnQgZHQtZGF0YS1jZWxscyAnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2R0LWlzLWhvdmVyYWJsZS1yb3cnOiByb3dIb3Zlcn1cIlxuICAgICAgICAgICAob25FeHBhbmRDaGFuZ2UpPVwib25PdXRsaW5lRXhwYW5kQ2hhbmdlKCRldmVudClcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjb3V0bGluZSBsZXQtcm93RGF0YSBsZXQtbmVzdGluZ0xldmVsPVwibmVzdGluZ0xldmVsXCIgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJvd1RlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OnskaW1wbGljaXQ6IHJvd0RhdGEsIG5lc3RpbmdMZXZlbDpuZXN0aW5nTGV2ZWwsIGNvbHNUb1JlbmRlcjpjb2xzVG9SZW5kZXJ9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJzaG93RGV0YWlsQ29sdW1uKHJvd0RhdGEpXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicm93RGV0YWlsQ29sdW1uLnJlbmRlcmVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6eyRpbXBsaWNpdDogZmFsc2UsIGRhdGE6cm93RGF0YSwgcm93SW5kZXg6KHJvd0luZGV4KX1cIj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibm9EYXRhXCI+PC9uZy1jb250YWluZXI+XG4gICAgPC90Ym9keT5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS1cbiAgICBEZWZhdWx0IHRlbXBsYXRlIHRoYXQgaXMgZGlzcGxheSB3aGVuIHRoZXJlIGFyZSBubyBkYXRhXG4tLT5cbjxuZy10ZW1wbGF0ZSAjbm9EYXRhPlxuICAgIDx0ciAqbmdJZj1cImlzRW1wdHkoKVwiIGNsYXNzPVwiIGR0LWVtcHR5bWVzc2FnZS1yb3dcIlxuICAgICAgICBbc3R5bGUudmlzaWJpbGl0eV09XCJsb2FkaW5nID8gJ2hpZGRlbicgOiAndmlzaWJsZSdcIj5cblxuICAgICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJ2aXNpYmxlQ29sdW1ucygpLmxlbmd0aFwiIGNsYXNzPVwiZHQtZW1wdHltZXNzYWdlXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFlbXB0eU1lc3NhZ2VUZW1wbGF0ZVwiPnt7ZW1wdHlNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlNZXNzYWdlVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC90ZD5cbiAgICA8L3RyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLVxuICAgIFRlbXBsYXRlIHRoYXQgcmVuZGVycyBhY3R1YWwgcm93LiBSZW5kZXJzIGJvdGggaGVhZGVyIGFuZCBib2R5IGNvbHVtbi4gRWFjaCByZW5kZXJlZFxuICAgIGNvbHVtbiBoYXMgaXRzIG93biB0ZW1wbGF0ZSBjYWxsZWQgcmVuZGVyZXJUZW1wbGF0ZSB0aGF0IGhhcyBhbGwgdGhpbmdzIHRoYXQgbmVlZHMgdG8gYmVcbiAgICByZW5kZXJlZCBhbmQgd2UganVzdCB0ZWxsIHRoZSB0ZW1wbGF0ZSBpZiB3ZSBhcmUgcmVuZGVyaW5nIGhlYWRlciwgc3ViaGVhZGVyIG9yIGJvZHlcbi0tPlxuPG5nLXRlbXBsYXRlICNyb3dUZW1wbGF0ZSBsZXQtcm93RGF0YSBsZXQtZXZlbj1cImV2ZW50XCIgbGV0LW9kZD1cIm9kZFwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCJcbiAgICAgICAgICAgICBsZXQtbmVzdGluZ0xldmVsPVwibmVzdGluZ0xldmVsXCIgbGV0LWNvbHNUb1JlbmRlcj1cImNvbHNUb1JlbmRlclwiPlxuXG5cbiAgICA8dHIgI3Jvd0VsZW1lbnQgZHREcmFnZ2FibGVSb3cgW2RuZFJvd0luZGV4XT1cInJvd0luZGV4XCJcbiAgICAgICAgY2xhc3M9XCJkdC1ib2R5LXJvd1wiXG4gICAgICAgIChjbGljayk9XCJvbkhhbmRsZVJvd0NsaWNrZWQoJGV2ZW50LCByb3dEYXRhKVwiXG4gICAgICAgIFthdHRyLm5lc3RpbmdMZXZlbF09XCJuZXN0aW5nTGV2ZWxcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2R0LWV2ZW4tcm93JzogZXZlbiwgJ2R0LW9kZC1yb3cnOiBvZGQsXG4gICAgICAgICAgICAnZHQtcm93LXNlbGVjdGVkJzogaXNSb3dTZWxlY3RlZChyb3dEYXRhKSxcbiAgICAgICAgICAgICdkdC1yb3ctZHJhZ2dhYmxlJzogZG5kUm93RW5hYmxlZCxcbiAgICAgICAgICAgICdkdC1yb290LXNlY3Rpb24nOiBuZXN0aW5nTGV2ZWwgPT09IDAgfVwiPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY29sIFtuZ0Zvck9mXT1cImNvbHNUb1JlbmRlclwiIGxldC1jb2xJbmRleD1cImluZGV4XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLnJlbmRlcmVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6eyRpbXBsaWNpdDogZmFsc2UsIGRhdGE6cm93RGF0YSwgcm93SW5kZXg6cm93SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIG5lc3RpbmdMZXZlbDpuZXN0aW5nTGV2ZWx9XCI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L3RyPlxuPC9uZy10ZW1wbGF0ZT5cblxuXG5gLFxuICAgIHN0eWxlczogW2Audy1kYXRhdGFibGV7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9LnctZGF0YXRhYmxlIHRhYmxle2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTt3aWR0aDoxMDAlO3RhYmxlLWxheW91dDpmaXhlZH0udy1kYXRhdGFibGUgdGJvZHksLnctZGF0YXRhYmxlIHRkLC53LWRhdGF0YWJsZSB0aHtvdXRsaW5lOjB9LmR0LWNlbGwtZGVmLC5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2JvcmRlcjoxcHggc29saWQgdHJhbnNwYXJlbnQ7cGFkZGluZzoxN3B4IDE2cHg7Ym94LXNpemluZzpib3JkZXItYm94fS5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2N1cnNvcjpwb2ludGVyO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9dGggLmR0LWNlbGwtZGVmLXNlbGVjdGFibGV7Ym9yZGVyLXdpZHRoOjRweCAxcHggMXB4O3BhZGRpbmc6MTRweCAxNnB4IDE3cHh9dGQgLmR0LWNlbGwtZGVmLXNlbGVjdGFibGV7Ym9yZGVyLXdpZHRoOjAgMXB4IDAgNXB4O3BhZGRpbmc6MTdweCAxNnB4IDE3cHggMTNweH0uZHQtZGF0YS1jZWxscyB0ci5kdC1pcy1oaWdobGlnaHQsLmR0LWRhdGEtY2VsbHMgdHIuZHQtaXMtaG92ZXJ7Ym9yZGVyLWNvbG9yOmluaGVyaXQ7Zm9udC13ZWlnaHQ6aW5oZXJpdDtjdXJzb3I6cG9pbnRlcn0udy1kYXRhdGFibGUtcnRse2RpcmVjdGlvbjpydGx9LnctZGF0YXRhYmxlLXJ0bC53LWRhdGF0YWJsZS1ydGwudy1kYXRhdGFibGUgdGhlYWQgdGh7dGV4dC1hbGlnbjpyaWdodH0uZHQtcm9vdC1zZWN0aW9uIC5kdC1jZWxsLWRlZiwuZHQtcm9vdC1zZWN0aW9uIC5kdC1jZWxsLWRlZi1zZWxlY3RhYmxle2JhY2tncm91bmQtY29sb3I6I2YzZjZmODtwYWRkaW5nOjEwcHggMTZweDtib3JkZXItYm90dG9tLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci1yaWdodC1jb2xvcjp0cmFuc3BhcmVudH0uZHQtcGxhaW4tbGF5b3V0IC5kdC1pcy1hY3RpdmUsLmR0LXBsYWluLWxheW91dCAuZHQtaXMtZGVmYXVsdCwuZHQtcGxhaW4tbGF5b3V0IC5kdC1pcy1oaWdobGlnaHQsLmR0LXBsYWluLWxheW91dCAuZHQtaXMtaG92ZXIsLmR0LXBsYWluLWxheW91dCAuZHQtaXMtaG92ZXJhYmxlLXJvd3tib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnR9LmR0LWlzLWFjdGl2ZSwuZHQtaXMtZGVmYXVsdCwuZHQtaXMtaGlnaGxpZ2h0LC5kdC1pcy1ob3ZlciwuZHQtaXMtaG92ZXJhYmxlLXJvd3tib3JkZXI6MXB4IHNvbGlkICNkN2Q3ZDc7YmFja2dyb3VuZC1jb2xvcjojZmZmO2NvbG9yOiMzNjM2MzZ9LmR0LXJvdy1zZWxlY3RlZCB0ZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjM4LDI1NSwyMzgsLjcxKX0uZHQtaXMtYWN0aXZle2JvcmRlci1jb2xvcjojMDY1ZDljO2NvbG9yOiMxOTlkZTB9LmR0LWlzLWhpZ2hsaWdodHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNjUsMTE3LDUsLjE4KX0uZHQtaXMtaGlkZGVue2Rpc3BsYXk6bm9uZX0uZHQtdS11bnNlbGVjdGFibGUtdGV4dHstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1vLXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZHQtdS1zb3J0YWJsZXtjdXJzb3I6cG9pbnRlcn1gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgT2JqZWN0VXRpbHMsXG4gICAgICAgIE91dGxpbmVTdGF0ZSxcbiAgICAgICAge3Byb3ZpZGU6IERBVEFfU09VUkNFLCB1c2VDbGFzczogRFQyRGF0YVNvdXJjZSwgZGVwczogW0RhdGFQcm92aWRlcnMsIERhdGFGaW5kZXJzXX0sXG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG5cbn0pXG5leHBvcnQgY2xhc3MgRGF0YXRhYmxlMkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBV0RhdGFUYWJsZSwgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0XG57XG5cbiAgICAvKipcbiAgICAgKiAgTGlzdCBvZiBpdGVtcyB0byBzaG93IGluIHRoZSBkYXRhdGFibGUuXG4gICAgICpcbiAgICAgKiAgdG9kbzogaW1wbGVtZW50IHRoZSBzYW1lIERhdGFzb3VyY2UgYW5kIGxhenkgbG9hZGluZyBqdXN0IGxpa2UgSSBkaWQgaXQgZm9yIGRhdGF0YWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGlzdDogYW55W107XG5cbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBlbnRpdHkgZm9yIHdoaWNoIERhdGFQcm92aWRlciB3aWxsIGJlIGxvYWRlZC4gWW91IGNhbiBlaXRoZXIgcGFzcyBsaXN0IG9mIGl0ZW1zXG4gICAgICogb3IgdXNlIHRoaXMgZGVzdGluYXRpb25DbGFzcy4gTm90IGJvdGhcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRlc3RpbmF0aW9uQ2xhc3M6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBieSBUYWJsZVdyYXBwZXIgdG8gYWRkIHVzZXIgZGVmaW5lZCBjbGFzIGludG8gdGhlIHRhYmxlIHRhZ1xuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0YWJsZVN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNlZSBoZWFkZXJUZW1wbGF0ZSBmb3IgbW9yZSBkZXRhaWxzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib2R5Q2xhc3NGbjogKGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50LCBpdGVtOiBhbnkpID0+IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpc1Jvd1NlbGVjdGFibGU6IChpdGVtOiBhbnkpID0+IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqICBIaWRlcyBvciBzaG93cyB0YWJsZSBoZWFkaW5nIHdoZXJlIHdlIGhhdmUgZmlsdGVycyBhbmQgdG9vbHMgbWVudXNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dUYWJsZUhlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwaXZvdGFsTGF5b3V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29udGV4dDogYW55O1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbml0aWFsU29ydE9yZGVyOiBzdHJpbmcgPSAnZGVzY2VuZGluZyc7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluaXRpYWxTb3J0S2V5OiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gRFQgaXMgbG9hZGVkIGluIHRoZSBwYWdlIGFuZCB3ZSBhcmUgbm90IGluIHRoZSBmdWxsIHNjcmVlbiAoZnVsbCBwYWdlIG1vZGUpLCB0aGlzXG4gICAgICogaXMgaHRlIG51bWJlciBvZiBsaW5lcyB0aGF0IERUIHdpbGwgc2hvd1xuICAgICAqXG4gICAgICogdG9kbzogY29tZSB1cCB3aXRoIGJldHRlciBuYW1lXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5Um93U2l6ZTogbnVtYmVyID0gMTA7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIHBhZ2luZyBvbiBsYXp5IGxvYWRpbmcgdXNpbmcgaW5maW5pdGUgc2Nyb2xsZXIgdG8gc2V0IGluaXRpYWwgZmV0Y2ggbGltaXQgc2l6ZVxuICAgICAqXG4gICAgICogdG9kbzogY29tZSB1cCB3aXRoIGJldHRlciBuYW1lICEhIVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwYWdlU2l6ZTogbnVtYmVyID0gMTU7XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGF0YVNvdXJjZTogRFQyRGF0YVNvdXJjZTtcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgbWVzc2FnZSB3aGVuIHRoZXJlIGFyZSBubyBkYXRhIC5cbiAgICAgKlxuICAgICAqIHRvZG86IFVzZSBpMThuIHZhbHVlIGFuZCBjcmVhdGUgcmVzb3VyY2UgZmlsZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZW1wdHlNZXNzYWdlOiBzdHJpbmcgPSAnTm8gcmVjb3JkcyBmb3VuZCc7XG5cblxuICAgIC8qKlxuICAgICAqIERldmVsb3BlciBjYW4gcHJvdmlkZSBjdXN0b20gdHJhY2tCeSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBpdGVyYXRlIG92ZXIgdGhlXG4gICAgICogcmVjb3Jkc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcm93VHJhY2tCeTogKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gYW55O1xuXG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlIGFkZHMgY3VzdG9tIGhvdmVyaW5nIGNsYXNzIHRvIHRoZSB0Ym9keVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcm93SG92ZXI6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBEbyB3ZSBzaG93IGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgICpcbiAgICAgKiBUb2RvOiByZW5hbWUgdG8gc2hvd0xvYWRpbmdcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxvYWRpbmc6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGlvbk1vZGU6IFNlbGVjdGlvbk1vZGUgPSAnbm9uZSc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENhbiBwcm92aWRlIGN1c3RvbSBpY29uLiBUaGVzZSBpY29ucyBhcmUgbm90IGFuaW1hdGVkIGRpdnMsIHdlIHVzZWQgY3NzXG4gICAgICogdHJhbnNmb3JtYXRpb24gdG8gcm90YXRlIHRoZW0uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxvYWRpbmdJY29uOiBzdHJpbmcgPSAnaWNvbi1zeW5jaHJvbml6ZSc7XG5cblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgaW5kZW50IGNhbiBiZSBhZGRlZCB3aGVuIHJlbmRlcmluZyBkZXRhaWwgcm93XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbmRlbnREZXRhaWxSb3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpbmRlbnRhdGlvblBlckxldmVsOiBudW1iZXIgPSAyNTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogIFN1YkhlYWRlciBpcyB1c2VkIHRvIHNob3cgc3VtbWFyeSBjb2x1bW5zLCB3aGljaCBpbiBvdXIgVVggaXMgc2hvd24gYXQgdGhlIHRvcCBqdXN0IHVuZGVyXG4gICAgICogIHRoZSByZWd1bGFyIHRhYmxlIGhlYWRlclxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93U3ViSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgT3V0bGluZUZvciAtIG9ubHkgdXNlZCBpbiB0aGUgdHJlZSBtb2RlXG4gICAgICpcbiAgICAgKiBOb3QgdXNlZCB3aGVuIFtvdXRsaW5lRm9ybWF0XT1cIid0cnVlZSdcIlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2hpbGRyZW46ICh2YWx1ZTogYW55KSA9PiBhbnlbXTtcblxuXG4gICAgLyoqXG4gICAgICogV2UgbWlnaHQgaGF2ZSB0aGlzIGNvbmRpdGlvbmFsIGFzIHRoaXMgY2FuIGJlIGR5bmFtaWMgYmFzZWQgb24gdmFsdWUsIHNvIHRoZSBzYW1lXG4gICAgICogYXMgY2hpbGRyZW5cbiAgICAgKlxuICAgICAqIFNlZSBPdXRsaW5lRm9yIC0gb25seSB1c2VkIGluIHRoZSB0cmVlIG1vZGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dFeHBhbnNpb25Db250cm9sOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogU2VlIE91dGxpbmVGb3IgLSBvbmx5IHVzZWQgaW4gdGhlIHRyZWUgbW9kZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZXhwYW5kQWxsOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIE91dGxpbmVGb3IgIC0gZm9ybWF0IC0gb25seSB1c2VkIGluIHRoZSB0cmVlIG1vZGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG91dGxpbmVGb3JtYXQ6IE1vZGVsRm9ybWF0ID0gJ2ZyZWUnO1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdXNoUm9vdFNlY3Rpb25Pbk5ld0xpbmU6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgb3IgaGlkZSBleHBhbnNpb24gY29udHJvbCBmb3Igcm93IGRldGFpbCBjb2x1bW5zLiBFeHBhbnNpb24gY29udHJvbCBtYWtlcyBzZW5zZSBmb3JcbiAgICAgKiBzaW1wbGUgdGFibGUsIHdoZW4gdXNpbmcgdGhpcyBpbnNpZGUgb3V0bGluZSAodHJlZSB0YWJsZSksIGl0cyBkcml2ZW4gYnkgb3V0bGluZSBjb250cm9sXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93Um93RGV0YWlsRXhwYW5zaW9uQ29udHJvbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1NlbGVjdGlvbkNvbHVtbjogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93U2VsZWN0QWxsOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogU2hvdyBvciBoaWRlIGdsb2JhbCBzZWFyY2ggdGVybSBpbnB1dCBmaWVsZCBpbiB0aGUgaGVhZGVyXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93R2xvYmFsU2VhcmNoOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSBmcm96ZW4gY29sdW1uIGFyZSB1c2luZyB3ZSBjYW4gc3BlY2lmeSBvbiBnbG9iYWwgbGV2ZWwgdG90YWwgd2lkdGggb2YgdGhlIHRhYmxlIHRoZVxuICAgICAqIG92ZXJmbG93aW5nIGNvbnRlbnQgb3Igd2lkdGggZm9yIGVhY2ggY29sdW1uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2Nyb2xsV2lkdGg6IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBvciBkaXNhYmxlcyByb3cgcmVvcmRlcmluZ1xuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkbmRSb3dFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEZpcmVzIGV2ZW50IHRoYXQgc29ydGluZyBpcyBlbmFibGVkIGZvciBjb2x1bW4gYW5kIHdlIHRyaWdnZXIgc29ydGluZ1xuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25Tb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICogQmFzZWQgb24gc2VsZWN0aW9uIG1vZGUgaXQgdHJpZ2dlcnMgZXZlblxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25Sb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gbXVsdGkgb3Igc2luZ2xlIHNlbGVjdGlvbiBtb2RlIGlzIGVuYWJsZWQgaXQgd2lsbCB0cmlnZ2VyIGV2ZW50IHdoZW4gY2hlY2tib3ggb3JcbiAgICAgKiByYWRpbyBidXR0b25zIGlzIHNlbGVjdGVkXG4gICAgICpcbiAgICAgKiB0b2RvOiBpbXBsZW1lbnQgU2luZ2xlU2VsZWN0aW9uRFRDb2x1bW4sIE11bHRpU2VsZWN0aW9uRFRDb2x1bW4gd2l0aCB0aGVpciByZW5kZXJlcnNcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblJvd1NlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gY2VsbCBib2R5IHNlbGVjdGlvbiBjaGFuZ2VzIHdlIGZpcmUgZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQ2VsbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGNlbGwgaGVhZGVyIHNlbGVjdGlvbiBjaGFuZ2VzIHdlIGZpcmUgZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uSGVhZGVyU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgQENvbnRlbnRDaGlsZChEVEhlYWRlckNvbXBvbmVudDIpXG4gICAgaGVhZGVyOiBEVEhlYWRlckNvbXBvbmVudDI7XG5cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgY3VzdG9tIHRlbXBsYXRlIHRoYXQgY2FuIGJlIGltcGxlbWVudGVkIGJ5IGFwcGxpY2F0aW9uIHRvIHNob3cgd2hlbiB0aGVyZSBhcmVcbiAgICAgKiBubyBkYXRhIGluIHRoZSBkYXRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnbm9EYXRhVGVtcGwnKVxuICAgIGVtcHR5TWVzc2FnZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdkdEhlYWRlcicpXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdkdFN1YkhlYWRlcicpXG4gICAgc3ViSGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdkdEJvZHknKVxuICAgIGJvZHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaGVhZGVyRmlsdGVyJylcbiAgICBoZWFkZXJGaWx0ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdHMgdXNlZCBEVENvbHVtbiBpbnNpZGUgZGF0YXRhYmxlIGFuZCB0aGVuIHRoZXkgYXJlIHVzZWQgaW5zaWRlIHRoZSB0ZW1wbGF0ZSB0b1xuICAgICAqIGl0ZXJhdGUgb3ZlciBhbmQgdXNlIGl0cyByZW5kZXJlclRlbXBsYXRlLlxuICAgICAqXG4gICAgICogV2hlbiB3ZSB3aWxsIGJlIGRlZmluaW5nIG5ldyBjb2x1bW5zIGl0cyBpbXBvcnRhbnQgdGhhdCBpdCBjYW4gYWxzbyBtYXRjaCBhbGwgdGhlXG4gICAgICogaW5oZXJpdGVkIG9uZXMuIHNvIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGRlZmluZSBhIHByb3ZpZGVyIHRob3NlIHRob3NlIGNvbHVtbnMgdG8gcG9pbnRcbiAgICAgKiB0byB0aGUgRFRDb2x1bW5Db21wb25lbnRcbiAgICAgKlxuICAgICAqIGUuZy46XG4gICAgICpcbiAgICAgKiB7cHJvdmlkZTogRFRDb2x1bW5Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERldGFpbFJvd0NvbHVtbil9XG4gICAgICpcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKERUQ29sdW1uMkNvbXBvbmVudClcbiAgICBjb2xzUXVlcnk6IFF1ZXJ5TGlzdDxEVENvbHVtbjJDb21wb25lbnQ+O1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKERURGV0YWlsUm93Q29tcG9uZW50KVxuICAgIHJvd0RldGFpbENvbHVtbjogRFREZXRhaWxSb3dDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHJpZ2dlcnMgd2hlbiBpdGVtcyBpbiB0aGUgbGlzdCBhcmUgdXBkYXRlZFxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgICBjbGFzc0xpc3Q6IHN0cmluZyA9ICd3LWRhdGF0YWJsZSAnO1xuXG5cbiAgICAvKipcbiAgICAgKiBGb3IgaW50ZXJuYWwgdXNlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGRhdGFzZXQgdGhhdCBpcyBiZWluZyByZW5kZXJlZC4gU2V0IGZyb20gdGhlIFtsaXN0XSBiaW5kaW5nIG9yIGJ5IGxhenkgbG9hZCBmcm9tXG4gICAgICogZGF0YXNvdXJjZVxuICAgICAqL1xuICAgIHB1YmxpYyBkYXRhVG9SZW5kZXI6IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICogV2UgY29udmVydCBRdWVyeUxpc3Q8RFRDb2x1bW4yQ29tcG9uZW50PiB0byB0aGlzIGFycmF5IGZvciBlYXNpZXIgbWFuaXB1bGF0aW9uXG4gICAgICovXG4gICAgcHVibGljIGNvbHVtbnM6IERUQ29sdW1uMkNvbXBvbmVudFtdO1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHNlY29uZGFyeSBsaXN0IG9mIGNvbHVtbnMgd2hpY2ggaXMgdXNlZCBpbiBjYXNlIHdlIGhhdmUgaGF2ZSBlbmFibGVkXG4gICAgICogZnJvemVuIGNvbHVtbnMuIENvbHVtbnMgdGhhdCBhcmUgbWFya2VkIGFzIGZyb3plbiBuZWVkcyB0byBiZSBwbGFjZWQgaW50byBzZXBhcmF0ZSBhcnJheVxuICAgICAqIHRvIGJlIHJlbmRlcmVkIHdheSB0aGFuIHJlZ3VsYXIgY29sdW1ucyB3aGljaCBhcmUgc3RvcmVkIGluIHRoZSBjb2x1bW5zIGFycmF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBmcm96ZW5Db2x1bW5zOiBEVENvbHVtbjJDb21wb25lbnRbXTtcblxuXG4gICAgLyoqXG4gICAgICogIEluZGljYXRlcyB0aGF0IGNvbHVtbnMgd2VyZSBpbml0aWFsZWQgQWxzbyB1c2VkIHdoZW4gd2UgaGlkZSBhbmQgc2hvdyBjb2x1bW4gdG8gdHJpZ2dlclxuICAgICAqICBjaGFuZ2UuXG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaWMgY29sdW1uc0NoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgcHVibGljIHNvcnRDb2x1bW46IERUQ29sdW1uMkNvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIGNvbHNRdWVyeSBhbmQgaXRzIGNoYW5nZXMgc28gd2UgY2FuIGxhdGVyIG9uIHJlbGVhc2UgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqL1xuICAgIGNvbHVtbnNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgZGV0YWlsUm93RXhwYW5zaW9uU3RhdGU6IERldGFpbFJvd0V4cGFuc2lvblN0YXRlO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBudW1iZXJPZkNvbHNCZWZvcmVEYXRhOiBudW1iZXIgPSAwO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKi9cbiAgICBzdGFydE9mRmlyc3REYXRhQ29sdW1uOiBudW1iZXIgPSAwO1xuXG5cbiAgICAvKipcbiAgICAgKiBTZWN0aW9uIGZvciBwcm9ncmFtbWF0aWNhbGx5IGluc3RhbnRpYXRlZCBjb2x1bW5zIHRoYXQgYXJlIGFkZGVkIHRvIHRoZSBsaXN0IGlmIGFkZGl0aW9uYWxcbiAgICAgKiBzcGFuIG9yIGxvZ2ljIGlzIG5lZWRlZC5cbiAgICAgKlxuICAgICAqIFRvIHByb2dyYW1tYXRpY2FsbHkgaW5zZXJ0IGEgbmV3IGNvbHVtbiBpbnRvIGNvbHVtbnMgYXJyYXkgbGlrZSBleHBhbmRvIGNvbHVtbiBmb3IgZGV0YWlsXG4gICAgICogcm93LCBvciBTaW5nbGVTZWxlY3QsIE11bHRpU2VsZWN0IGNvbHVtbiB3aGVuIHNlbGVjdGlvbiBpcyBlbmFibGVkIHdlIG5lZWQgdG8gdXNlXG4gICAgICogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHRvIGluc3RhbnRpYXRlIGEgbmV3IGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgcm93RGV0YWlsRXhwYW5kQ29sdW1uOiBEVERldGFpbFJvd0V4cGFuZGVyQ29tcG9uZW50O1xuICAgIHByaXZhdGUgbXVsdGlTZWxlY3RDb2x1bW46IERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnQ7XG4gICAgcHJpdmF0ZSBzaW5nbGVTZWxlY3RDb2x1bW46IERUU2luZ2xlU2VsZWN0Q29sdW1uQ29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEluIGNhc2Ugb2Ygb3V0bGluZSB0YWJsZSB3ZSBhcmUgaW5qZWN0IE91dGxpbmVTdGF0ZSB3aGljaCBpcyBwcm92aWRlZCBpbiB0aGUgRFQgY29tcG9uZW50XG4gICAgICogZGVmaW5pdGlvbi4gVGhpcyBpcyB1c2VkIGJ5IG5lc3RlZCBvdXRsaW5lRm9yIGNvbXBvbmVudCBpdCBzZXQgaXRzZWxmIGFzIHJlZmVyZW5jZSBhbmRcbiAgICAgKiBpbml0aWFsaXplIHRoZSBzdGF0ZSBzbyBpdCBjYW4gYmUgdXNlZCBsYXRlciBvbiBpbnNpZGUgT3V0bGluZUNvbnRyb2xcbiAgICAgKlxuICAgICAqXG4gICAgICogRWFjaCBEYXRhdGFibGUgaXMgcHJlLWRlZmF1bHRlZCB3aXRoIGl0cyBvd24gdmVyc2lvbiBvZiBEYXRhU291cmNlIHNvIGFsbCB0aGUgb2JzZXJ2ZXJzXG4gICAgICogaW5zaWRlIGFyZSB1bmlxdWUgZm9yIHRoaXMgY29tcG9uZW50XG4gICAgICpcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoREFUQV9TT1VSQ0UpIHByaXZhdGUgX2RlZmF1bHREUzogRFQyRGF0YVNvdXJjZSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBmYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3V0bGluZVN0YXRlOiBPdXRsaW5lU3RhdGUsXG4gICAgICAgICAgICAgICAgcHVibGljIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5fZGVmYXVsdERTO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIHN0YXRlIG91dCB0byBhcHBsaWNhdGlvbi4gQ2FuIGJlIHVzZSBhcyB0d28gd2F5IGJpbmRpbmdzXG4gICAgICpcbiAgICAgKiBbKHN0YXRlKV09ZHRTdGF0ZShzKVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgc3RhdGUoKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU291cmNlLnN0YXRlO1xuICAgIH1cblxuICAgIHNldCBzdGF0ZSh2YWw6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zdGF0ZSA9IHZhbDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuXG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5saXN0KSAmJiBpc1ByZXNlbnQodGhpcy5kZXN0aW5hdGlvbkNsYXNzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IHVzZSBib3RoIGJpbmRpbmdzIFtsaXN0XSBhbmQgW2Rlc3RpbmF0aW9uQ2xhc3NdIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUgPSBuZXcgRGV0YWlsUm93RXhwYW5zaW9uU3RhdGUodGhpcyk7XG5cbiAgICAgICAgLy8gaW5pdCBkZWZhdWx0IGNvbHVtbnNcbiAgICAgICAgdGhpcy5yb3dEZXRhaWxFeHBhbmRDb2x1bW4gPSB0aGlzLmZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnQpLmNyZWF0ZSh0aGlzLmluamVjdG9yKS5pbnN0YW5jZTtcblxuXG4gICAgICAgIHRoaXMubXVsdGlTZWxlY3RDb2x1bW4gPSB0aGlzLmZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnQpLmNyZWF0ZSh0aGlzLmluamVjdG9yKS5pbnN0YW5jZTtcblxuICAgICAgICB0aGlzLnNpbmdsZVNlbGVjdENvbHVtbiA9IHRoaXMuZmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRFRTaW5nbGVTZWxlY3RDb2x1bW5Db21wb25lbnQpLmNyZWF0ZSh0aGlzLmluamVjdG9yKS5pbnN0YW5jZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhlIGRhdGEgYXJlIG5vdCBkZWZlcnJlZCBhbmQgd2UgZ2V0IGxpc3QgZGlyZWN0bHkgdGhlbiBpdCBjcmVhdGVzIERTLiBJZlxuICAgICAgICAgKiBuZ09uQ2hhbmdlcyBpcyBjYWxsZWQgZmlyc3Qgd2UgcHJvcGVybHkgaW5pdCBEUyBhbmQgY2xlYW4gdGhpcy5saXN0XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZGVzdGluYXRpb25DbGFzcykgfHwgaXNQcmVzZW50KHRoaXMubGlzdCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGFzb3VyY2UoKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YVNvdXJjZS5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RGF0YXNvdXJjZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzaW5jZSB3ZSB3b3JrIHdpdGggcmVmZXJlbmNlcyBsZXQncyBwYXNzIGNyZWF0ZWQgbWFwIGluc2lkZSBvdXIgc3RhdGVcbiAgICAgICAgdGhpcy5vdXRsaW5lU3RhdGUuZXhwYW5zaW9uU3RhdGVzID0gdGhpcy5zdGF0ZS5vdXRsaW5lU3RhdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBkYXRhIGFycml2ZXMgbGF0ZXIgbWF5YmUgZHVlIHRvIFJFU1QgQVBJIGxhdGVuY3ksIGluaXRpYWxpemUgRFMgb25seSB3aGVuIHdlIGhhdmUgYVxuICAgICAqIGRhdGEsIG90aGVyd2lzZSBpZiBkYXRhIGNoYW5nZWQgdGhydSB0aGUgYmluZGluZ3MganVzdCB0cmlnZ2VyIGRhdGFDaGFuZ2UgZXZlbnRcbiAgICAgKlxuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgICAgICBpZiAoY2hhbmdlc1snbGlzdCddICYmIGlzUHJlc2VudChjaGFuZ2VzWydsaXN0J10uY3VycmVudFZhbHVlKVxuICAgICAgICAgICAgJiYgIXRoaXMuZGF0YVNvdXJjZS5pbml0aWFsaXplZClcbiAgICAgICAge1xuXG4gICAgICAgICAgICB0aGlzLmluaXREYXRhc291cmNlKCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGFTb3VyY2UuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZXMubmV4dCh0aGlzLmxpc3QpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKVxuICAgIHtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgaW5pdCBhIHN0YXRlIHdoZW4gZGV0YWlsIGNvbHVtbiBpcyBwcmVzZW50XG4gICAgICAgIC8vIHRvZG86IG1vdmUgdGhpcyBpbml0aWFsaXphdGlvbiB0byBkYXRhc291cmNlXG4gICAgICAgIHRoaXMuZGV0YWlsUm93RXhwYW5zaW9uU3RhdGUuZGV0YWlsRXhwYW5zaW9uRW5hYmxlZCA9IGlzUHJlc2VudCh0aGlzLnJvd0RldGFpbENvbHVtbik7XG5cbiAgICAgICAgdGhpcy5pbml0Q29sdW1ucygpO1xuICAgICAgICB0aGlzLmNvbHVtbnNTdWJzY3JpcHRpb24gPSB0aGlzLmNvbHNRdWVyeS5jaGFuZ2VzLnN1YnNjcmliZShfID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdENvbHVtbnMoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpXG4gICAge1xuICAgICAgICAvLyBhc3NpZ24gaXQgcHJvZ3JhbWF0aWNhbGx5IGFzIHdlIHdhbnQgdG8gaGF2ZSBhIGNvbnRleHQgZm9yIHRoZSBmaWx0ZXJcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnJvd0RldGFpbENvbHVtbikgJiYgaXNQcmVzZW50KHRoaXMub3V0bGluZVN0YXRlLm91dGxpbmVGb3IpKSB7XG4gICAgICAgICAgICB0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yLmZpbHRlck91dCA9IHRoaXMuc2tpcE91dGxpbmVJdGVtLmJpbmQodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMub3V0bGluZVN0YXRlLm91dGxpbmVGb3IpKSB7XG4gICAgICAgICAgICAvLyB0aGlzLm91dGxpbmVTdGF0ZS5vdXRsaW5lRm9yLmNoYW5nZURldGVjdG9yLmRldGFjaCgpO1xuICAgICAgICAgICAgLy8gdGhpcy5vdXRsaW5lU3RhdGUub3V0bGluZUZvci5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uc0NoYW5nZWQgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzRnJvemVuQ29sdW1ucygpKSB7XG4gICAgICAgICAgICB0aGlzLmZyb3plbkNvbHVtbnMuZm9yRWFjaCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQsIGluZGV4OiBudW1iZXIpID0+XG4gICAgICAgICAgICAgICAgY29sLnBvc3RJbml0aWFsaXplKGluZGV4KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQsIGluZGV4OiBudW1iZXIpID0+XG4gICAgICAgICAgICAgICAgY29sLnBvc3RJbml0aWFsaXplKGluZGV4KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBLZXkgZW50cnkgbWV0aG9kIHRoYXQgaW5pdGlhbGl6ZWQgb3VyIGNvbHVtbnMuIExhdGVyIG9uIHdoZW4gd2Ugd2lsbCBzdXBwb3J0IHNlbGVjdGlvbiBhbmRcbiAgICAgKiBtdWx0aXNlbGVjdGlvbiB3ZSB3aWxsIHByb2dyYW1tYXRpY2FsbHkgaW5zdGFudGlhdGUgU2luZ2xlU2VsZWN0aW9uLCBNdWx0aVNlbGVjdGlvbiBjb2x1bW5cbiAgICAgKiBjb21wb25lbnRzIGFuZCBhZGQgdGhlbSB0byB0aGUgbGlzdCBzbyB0aGV5IGNhbiBiZSByZW5kZXJlZC5cbiAgICAgKlxuICAgICAqIHNvIHRoZSBpZGVhIGhlcmUgaXM6XG4gICAgICpcbiAgICAgKiBXaGVuIERUIGNvbXBvbmVudCBpbml0aWFsaXplIGFuZCB3ZSBhcmUgaW4gZWRpdGluZyBtb2RlIGFuZCB3ZSBzdXBwb3J0IFNpbmdsZS9NdWx0aSBzZWxlY3Rpb25cbiAgICAgKiB3ZSB3aWxsIHVzZSBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgdG8gY3JlYXRlIGNvbXBvbmVudCBhbmQgYWRkIGl0IGFzIGZpcnN0IGl0ZW0gdG8gdGhlIGxpc3RcbiAgICAgKiBhbmQgdGhlbiBpdCB3aWxsIGJlIHJlbmRlcmVkIGp1c3QgbGlrZSBhbnl0aGlnbiBlbHNlLlxuICAgICAqXG4gICAgICovXG4gICAgaW5pdENvbHVtbnMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgICAgIHRoaXMuZnJvemVuQ29sdW1ucyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLmRldGFpbEV4cGFuc2lvbkVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERldGFpbENvbHVtbkV4cGFuc2lvbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aScpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlTZWxlY3RDb2x1bW4uaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKHRoaXMubXVsdGlTZWxlY3RDb2x1bW4pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzTGVhZGluZ1NlbGVjdENvbHVtbigpICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlU2VsZWN0Q29sdW1uLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaCh0aGlzLnNpbmdsZVNlbGVjdENvbHVtbik7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIGV4cGFuc2lvbiBjb2x1bW4gd2hlbiBkZXRhaWwgcm93IGlzIGVuYWJsZWRcbiAgICAgICAgICovXG4gICAgICAgIGlmICh0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLmRldGFpbEV4cGFuc2lvbkVuYWJsZWQgJiYgIXRoaXMuaXNPdXRsaW5lKCkpIHtcbiAgICAgICAgICAgIHRoaXMucm93RGV0YWlsRXhwYW5kQ29sdW1uLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaCh0aGlzLnJvd0RldGFpbEV4cGFuZENvbHVtbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbHNRdWVyeVxuICAgICAgICAgICAgLmZpbHRlcigoY29sMTogRFRDb2x1bW4yQ29tcG9uZW50KSA9PiAhY29sMS5mcm96ZW4pXG4gICAgICAgICAgICAuZm9yRWFjaCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goY29sKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5pdEZyb3plbkNvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5pbml0Q29sdW1uSW5mbygpO1xuICAgICAgICB0aGlzLmNvbHVtbnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBjdXJyZW50IGNvbHVtbiBpcyBwcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZWRcbiAgICAgKlxuICAgICAqL1xuICAgIGlzSW50ZXJuYWxDb2x1bW4oY29sOiBEVENvbHVtbjJDb21wb25lbnQpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gY29sIGluc3RhbmNlb2YgRFRTaW5nbGVTZWxlY3RDb2x1bW5Db21wb25lbnQgfHxcbiAgICAgICAgICAgIGNvbCBpbnN0YW5jZW9mIERUTXVsdGlTZWxlY3RDb2x1bW5Db21wb25lbnQgfHxcbiAgICAgICAgICAgIGNvbCBpbnN0YW5jZW9mIERURGV0YWlsUm93RXhwYW5kZXJDb21wb25lbnQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IERhdGFzb3VyY2UgYmFzZWQgb24gcGFzc2VkIHZhbHVlcy4gSXQgdHJpZXMgdG8gaW5pdGlhbGl6ZSBEUyBmb3IgZmlyc3QgdGltZVxuICAgICAqIGluc2lkZSB0aGUgbmdJbml0IGJ1dCBpbiBjYXNlIERhdGEgYXJyaXZlcyBsYXRlciBtYXliZSBkdWUgdG8gc29tZSBSRVNUIEFQSSBjYWxscyB0aGlzXG4gICAgICogY2FuIGJlIHRyaWdnZXJlZCBhbHNvIGZyb20gbmdPbkNoYW5nZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0RGF0YXNvdXJjZShpbml0aWFsaXplOiBib29sZWFuID0gdHJ1ZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gRGF0YXRhYmxlMlN0YXRlLmNyZWF0ZSgwLCB0aGlzLnBhZ2VTaXplLCB0aGlzLmRpc3BsYXlSb3dTaXplLFxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbFNvcnRLZXksIHRoaXMuc29ydE9yZGVyaW5nRm9yU3RyaW5nKHRoaXMuaW5pdGlhbFNvcnRPcmRlcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5saW1pdCA9IHRoaXMuc3RhdGUuZGlzcGxheUxpbWl0ID0gdGhpcy5kaXNwbGF5Um93U2l6ZTtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5pbml0aWFsU29ydEtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNvcnRLZXkgPSB0aGlzLmluaXRpYWxTb3J0S2V5O1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc29ydE9yZGVyID0gdGhpcy5zb3J0T3JkZXJpbmdGb3JTdHJpbmcodGhpcy5pbml0aWFsU29ydE9yZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbml0aWFsaXplKSB7XG5cbiAgICAgICAgICAgIGxldCBxVHlwZSA9ICh0aGlzLmlzT3V0bGluZSgpICYmIHRoaXMub3V0bGluZUZvcm1hdCA9PT0gJ3RyZWUnKSA/XG4gICAgICAgICAgICAgICAgUXVlcnlUeXBlLkZ1bGxUZXh0T3V0bGluZSA6IFF1ZXJ5VHlwZS5GdWxsVGV4dDtcblxuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLmluaXQoe1xuICAgICAgICAgICAgICAgIG9iajogaXNQcmVzZW50KHRoaXMuZGVzdGluYXRpb25DbGFzcykgPyB0aGlzLmRlc3RpbmF0aW9uQ2xhc3MgOiB0aGlzLmxpc3QsXG4gICAgICAgICAgICAgICAgcXVlcnlUeXBlOiBxVHlwZSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5mZXRjaCh0aGlzLnN0YXRlKTtcblxuICAgICAgICAvLyByZXNldCBsaXN0IHRvIG1ha2Ugc3VyZSBpdCBjb21lcyBmcm9tIERhdGFQcm92aWRlciwgd2UgdXNlIGxpc3QgIHRvIGluaXRpYWxpemVcbiAgICAgICAgdGhpcy5saXN0ID0gbnVsbDtcblxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBFTlRSWSBwb2ludCBmb3IgdGhlIERBVEEgQ0hBTkdFUy4gQWxsIGFkZGl0aW9uLCBlZGl0cywgZGVsZXRpb24gZW5kcyB1cFxuICAgICAgICAvLyBoZXJlLiBXZSBkb250IHdvcmsgZGlyZWN0bHkgd2l0aCBMSVNULiBBbnkgY2hhbmdlIGlzIHJlYWN0aXZlIGFuZCBoZXJlIGlzIGxpc3RlbmVyXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5vcGVuKCkuc3Vic2NyaWJlKChkYXRhOiBhbnlbXSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0KGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGRldGFpbFJvdyBjb2x1bW4gaXMgcHJlc2VudCB3ZSBpbml0aWFsaXplIGEgc3RhdGUgaG9sZGluZyBpbmZvcm1hdGlvbiB3aGljaCBpdGVtIGlzXG4gICAgICogZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiB0b2RvOiBUaGlzIGlzIHRlbXBvcmFyeSBoZXJlIGFuZCBvbmNlIHdlIHN1cG9ydCBsYXp5IGxvYWRpbmcgbW92ZSB0aGlzIHRvIGRhdGFzb3VyY2UuXG4gICAgICpcbiAgICAgKiBGb3IgZXhhbXBsZSBmb3Igb3V0bGluZSB0cmVlIHRhYmxlIHdlIG5lZWQgdG8gY29ubmVjdCBhIHN0YXRlIGZyb20gb3V0bGluZSB3aXRoIGEgc3RhdGUgaW5cbiAgICAgKiBoZXJlIGFzIHdlIGFyZSB1c2luZyBvdXRsaW5lIGNvbnRyb2wgdG8gZXhwYW5kIGFuZCBjb2xsYXBzZSBpdGVtc1xuICAgICAqL1xuICAgIGluaXREZXRhaWxDb2x1bW5FeHBhbnNpb24oKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnJvd0RldGFpbENvbHVtbikpIHtcbiAgICAgICAgICAgIHRoaXMucm93RGV0YWlsQ29sdW1uLmluaXRpYWxpemUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXRhaWxSb3dFeHBhbnNpb25TdGF0ZS5kZXRhaWxFeHBhbnNpb25FbmFibGVkID0gaXNQcmVzZW50KHRoaXMucm93RGV0YWlsQ29sdW1uKSAmJlxuICAgICAgICAgICAgQm9vbGVhbldyYXBwZXIuaXNUcnVlKHRoaXMuc2hvd1Jvd0RldGFpbEV4cGFuc2lvbkNvbnRyb2wpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGV4ZWN1dGVkIGFmdGVyIHdlIGluaXRpYWxpemUgYWxsIHRoZSBjb2x1bW5zIGluIG9yZGVyIHRvIGNhbGN1bGF0ZSBjb3JyZWN0XG4gICAgICogbnVtYmVycyB1c2VkIGZvciBpbmRlbnRhdGlvbiB3aGlsZSByZW5kZXJpbmcgc2VsZWN0aW9uIGNvbHVtbnMgYXMgd2VsbCBhcyBkZXRhaWwgcm93IGNvbHVtbnMuXG4gICAgICpcbiAgICAgKiBIZXJlIHdlIG5lZWQgdG8gYmUgYXdhcmUgaG93IG1hbnkgY29sdW1ucyB0byBzcGFuXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0Q29sdW1uSW5mbygpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm51bWJlck9mQ29sc0JlZm9yZURhdGEgPSAwO1xuXG4gICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFjb2wuaXNWYWx1ZUNvbHVtbigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJPZkNvbHNCZWZvcmVEYXRhKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmluZGVudERldGFpbFJvdykge1xuICAgICAgICAgICAgdGhpcy5udW1iZXJPZkNvbHNCZWZvcmVEYXRhKys7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXJ0T2ZGaXJzdERhdGFDb2x1bW4gPSB0aGlzLmNvbHVtbnMubGVuZ3RoIC0gdGhpcy5udW1iZXJPZkNvbHNCZWZvcmVEYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25DZWxsU2VsZWN0aW9uQ2hhbmdlKGNlbGw6IGFueSwgY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgIT09ICdjZWxsJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsb29rdXBLZXkgPSB7XG4gICAgICAgICAgICBjb2w6IGNvbHVtbi5rZXkgfHwgY29sdW1uLmxhYmVsLFxuICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9O1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc3RhdGUuc2VsZWN0aW9uKSAmJiB0aGlzLnN0YXRlLnNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGxldCBmb3VuZEluZGV4ID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgbG9va3VwS2V5KTtcbiAgICAgICAgICAgIGxldCBpc1NlbGVjdGVkID0gZm91bmRJbmRleCAhPT0gLTE7XG5cbiAgICAgICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh2YWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gaW5kZXggIT09IGZvdW5kSW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFsuLi50aGlzLnN0YXRlLnNlbGVjdGlvbiwgbG9va3VwS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gW2xvb2t1cEtleV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNlbGxDaGFuZ2UuZW1pdCh0aGlzLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkhlYWRlclNlbGVjdGlvbkNoYW5nZShjZWxsOiBhbnksIGNvbHVtbjogRFRDb2x1bW4yQ29tcG9uZW50KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSGVhZGVyU2VsZWN0ZWQoY29sdW1uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuaGVhZGVyU2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24gPSBjb2x1bW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbiA9IGNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uSGVhZGVyU2VsZWN0aW9uLmVtaXQodGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIG9uSGFuZGxlUm93Q2xpY2tlZChldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBzcGVjaWFsIGFsdCBrZXkgbW9kaWZpZXIuIFdoZW4gdXNlZCB3aXRoIHJvd3MgaXQgaW5kaWNhdGVzIHRoZXJlIGlzIGEgRCZEIGVuYWJsZWRcbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpJykge1xuICAgICAgICAgICAgdGhpcy5vblJvd1RvZ2dsZShldmVudCwgaXRlbSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0KGV2ZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25Sb3dUb2dnbGUoZXZlbnQ6IGFueSwgaXRlbTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHJvd1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnN0YXRlLnNlbGVjdGlvbikgJiYgdGhpcy5zdGF0ZS5zZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGZvdW5kSW5kZXggPSBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLCBpdGVtKTtcbiAgICAgICAgICAgIGxldCBpc1NlbGVjdGVkID0gZm91bmRJbmRleCAhPT0gLTE7XG5cbiAgICAgICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh2YWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gaW5kZXggIT09IGZvdW5kSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgcm93U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbLi4udGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGl0ZW1dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmb3IgdGhlIG91dGxpbmUgZ28gdXAgYW5kIGRvd24gdGhlIHN5bmMgd2l0aCB0cmVlaXRlbXNcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0bGluZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuKGl0ZW0sIGlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMub0hhbmRsZU91dGxpbmVSb3dUb2dnbGVUb1BhcmVudChpdGVtLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gW2l0ZW1dO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc091dGxpbmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25IYW5kbGVPdXRsaW5lUm93VG9nZ2xlVG9DaGlsZHJlbihpdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvUGFyZW50KGl0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Sb3dTZWxlY3Rpb25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBpc1NlbGVjdGVkOiByb3dTZWxlY3RlZCxcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuc3RhdGUuc2VsZWN0aW9uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb25Sb3dTZWxlY3QoZXZlbnQ6IGFueSwgaXRlbTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBpdGVtO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLm9uUm93U2VsZWN0aW9uQ2hhbmdlLmVtaXQoaXRlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuKGN1cnJlbnRJdGVtOiBhbnksIGlzU2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgY2hpbGRyZW5Gb3JOb2RlID0gdGhpcy5jaGlsZHJlbi5hcHBseSh0aGlzLmNvbnRleHQsIFtjdXJyZW50SXRlbV0pIHx8IFtdO1xuXG4gICAgICAgIGlmIChjaGlsZHJlbkZvck5vZGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgaXMgc2VsZWN0ZWQgY3VycmVudGx5IHRoZW4gdG9nZ2xlIHRvIG90aGVyIHN0YXRlXG4gICAgICAgICAgICBpZiAoIWlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyB3aGVuIGNoZWNraW5nIGFsbCBmcm9tIHJvb3QsIGRlc2VsZWN0IGNoaWxkcmVuIGFuZCBhZGQgYWxsXG4gICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuKGN1cnJlbnRJdGVtLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFsuLi50aGlzLnN0YXRlLnNlbGVjdGlvbiwgLi4uY2hpbGRyZW5Gb3JOb2RlXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZWFjaCBjaGlsZFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuRm9yTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm91bmRJbmRleCA9IExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodmFsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGluZGV4ICE9PSBmb3VuZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IHRoZSBzYW1lIGZvciBjaGlsZHJlbiBvZiBjaGlsZHJlblxuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW5Gb3JOb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRsZU91dGxpbmVSb3dUb2dnbGVUb0NoaWxkcmVuKGNoaWxkLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgb0hhbmRsZU91dGxpbmVSb3dUb2dnbGVUb1BhcmVudChjdXJyZW50SXRlbTogYW55LCBpc1NlbGVjdGVkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGN1cnJlbnRJdGVtLiQkcGFyZW50SXRlbTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChwYXJlbnQpKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW5Gb3JOb2RlID0gdGhpcy5jaGlsZHJlbi5hcHBseSh0aGlzLmNvbnRleHQsIFtwYXJlbnRdKSB8fCBbXTtcblxuICAgICAgICAgICAgbGV0IGFsbFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuRm9yTm9kZSkge1xuICAgICAgICAgICAgICAgIGFsbFNlbGVjdGVkID0gTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgY2hpbGQpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgICAmJiBhbGxTZWxlY3RlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFsbFNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbGxTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyZW50SW5kZXggPSBMaXN0V3JhcHBlci5maW5kSW5kZXhDb21wbGV4KHRoaXMuc3RhdGUuc2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnN0YXRlLnNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodmFsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGluZGV4ICE9PSBwYXJlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vSGFuZGxlT3V0bGluZVJvd1RvZ2dsZVRvUGFyZW50KGN1cnJlbnRJdGVtLiQkcGFyZW50SXRlbSwgaXNTZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIG9uRG5EUm93RHJvcChvcmlnUG9zOiBudW1iZXIsIG5ld1BvczogbnVtYmVyLCBkcm9wUG9zOiBEcm9wUG9zaXRpb24pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZGF0YVNvdXJjZSkpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdEcm9wcGluZyByb3cgIzogJywgb3JpZ1BvcyArICcgJyArIGRyb3BQb3MgKyAnIHJvdyAjOiAnICsgbmV3UG9zKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5yZW9yZGVyUm93cyhvcmlnUG9zLCBuZXdQb3MsIGRyb3BQb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBvbk91dGxpbmVFeHBhbmRDaGFuZ2UoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBpdGVtID0gZXZlbnQuaXRlbTtcblxuICAgICAgICAvLyBXZSBkb250IHJlYWxseSBuZWVkIHRvIHN0b3JlIGEgc3RhdGUgZm9ybSBvdXRsaW5lIGxvY2FsbHkgYXMgd2UgYXJlIHVzaW5nIHRoZSBzYW1lIG9iamVjdFxuICAgICAgICAvLyByZWZlcmVuY2VcbiAgICAgICAgLy8gdGhpcy5zdGF0ZS5vdXRsaW5lU3RhdGUgPSB0aGlzLm91dGxpbmVTdGF0ZS5leHBhbnNpb25TdGF0ZXM7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FuVXNlRm9yRGV0YWlsUm93KGl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLnRvZ2dsZShpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBzb3J0U2luZ2xlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5saXN0KSAmJiBpc1ByZXNlbnQodGhpcy5zb3J0Q29sdW1uKSkge1xuXG4gICAgICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuc29ydENvbHVtbi5rZXkpLCAnSW52YWxpZCBjb2x1bW4gdG8gc29ydCcpO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQodGhpcy5zb3J0Q29sdW1uLmtleSwgdGhpcy5zb3J0Q29sdW1uLnNvcnRPcmRlcik7XG5cbiAgICAgICAgICAgIHRoaXMub25Tb3J0LmVtaXQoe1xuICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLnNvcnRDb2x1bW4ua2V5LFxuICAgICAgICAgICAgICAgIG9yZGVyOiB0aGlzLnNvcnRDb2x1bW4uc29ydE9yZGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaGFuZGxlRGF0YUNoYW5nZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zb3J0S2V5IHx8IHRoaXMuc29ydENvbHVtbikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNvcnRDb2x1bW4gJiYgdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0Q29sdW1uID0gdGhpcy5jb2x1bW5zLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIGNvbCA9PiBjb2wua2V5ID09PSB0aGlzLnN0YXRlLnNvcnRLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIoKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMubGlzdCk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YVRvUmVuZGVyKGRhdGFzb3VyY2U/OiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLmRhdGFUb1JlbmRlciA9IGRhdGFzb3VyY2UgfHwgdGhpcy5saXN0O1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuY2hpbGRyZW4pICYmIGlzUHJlc2VudCh0aGlzLmRhdGFUb1JlbmRlcilcbiAgICAgICAgICAgICYmIHRoaXMuZGF0YVRvUmVuZGVyLmxlbmd0aCA+IDAgJiYgaXNPdXRsaW5lTm9kZSh0aGlzLmRhdGFUb1JlbmRlclswXSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMub3V0bGluZUZvcm1hdCA9ICd0cmVlJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHJlc2V0KClcbiAgICB7XG4gICAgICAgIHRoaXMuc29ydENvbHVtbiA9IG51bGw7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0YVRvUmVuZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgaXNIZWFkZXJTZWxlY3RlZChpdGVtOiBEVENvbHVtbjJDb21wb25lbnQpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb2xNYXRjaGVkID0gaXRlbS5rZXkgfHwgaXRlbS5sYWJlbDtcbiAgICAgICAgbGV0IGN1cnJlbnRDb2wgPSB0aGlzLnN0YXRlLmhlYWRlclNlbGVjdGlvbi5rZXkgfHwgdGhpcy5zdGF0ZS5oZWFkZXJTZWxlY3Rpb24ubGFiZWw7XG4gICAgICAgIHJldHVybiBjb2xNYXRjaGVkID09PSBjdXJyZW50Q29sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0JvZHlDZWxsU2VsZWN0ZWQoY29sdW1uOiBEVENvbHVtbjJDb21wb25lbnQsIGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBsb29rdXBLZXkgPSB7XG4gICAgICAgICAgICBjb2w6IGNvbHVtbi5rZXkgfHwgY29sdW1uLmxhYmVsLFxuICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuc3RhdGUuc2VsZWN0aW9uKSAmJlxuICAgICAgICAgICAgTGlzdFdyYXBwZXIuZmluZEluZGV4Q29tcGxleCh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgbG9va3VwS2V5KSAhPT0gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaXNSb3dTZWxlY3RlZChpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodGhpcy5oYXNMZWFkaW5nU2VsZWN0Q29sdW1uKCkgJiYgaXNQcmVzZW50KHRoaXMuc3RhdGUuc2VsZWN0aW9uKSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGknKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLmZpbmRJbmRleENvbXBsZXgodGhpcy5zdGF0ZS5zZWxlY3Rpb24sIGl0ZW0pICE9PSAtMTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVxdWFscyh0aGlzLnN0YXRlLnNlbGVjdGlvbiwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRG8gd2UgaGF2ZSBkYXRhIHRvIHJlbmRlciBVc2VkIGluc2lkZSB0ZW1wbGF0ZSB0byB0ZWxsIGlmIHdlIHNob3VsZCB1c2UgdGhlIE5vRGF0YSB0ZW1wbGF0ZVxuICAgICAqXG4gICAgICovXG4gICAgaXNFbXB0eSgpXG4gICAge1xuICAgICAgICByZXR1cm4gaXNCbGFuayh0aGlzLmRhdGFUb1JlbmRlcikgfHwgKHRoaXMuZGF0YVRvUmVuZGVyLmxlbmd0aCA9PT0gMCk7XG4gICAgfVxuXG4gICAgaGFzRnJvemVuQ29sdW1ucygpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZnJvemVuQ29sdW1ucykgJiYgdGhpcy5mcm96ZW5Db2x1bW5zLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICovXG4gICAgaGFzSW52aXNpYmxlU2VsZWN0aW9uQ29sdW1uKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0xlYWRpbmdTZWxlY3RDb2x1bW4oKSAmJiAhdGhpcy5zaG93U2VsZWN0aW9uQ29sdW1uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGF0YVRhYmxlXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNMZWFkaW5nU2VsZWN0Q29sdW1uKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgIT09ICdub25lJyAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgIT09ICdjZWxsJztcbiAgICB9XG5cbiAgICB2aXNpYmxlQ29sdW1ucygpOiBEVENvbHVtbjJDb21wb25lbnRbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1ucyA/IHRoaXMuY29sdW1ucy5maWx0ZXIoYyA9PiBjLmlzVmlzaWJsZSkgOiBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWUgQVdEYXRhVGFibGVcbiAgICAgKlxuICAgICAqL1xuICAgIHNvcnRPcmRlcmluZ0ZvclN0cmluZyhkaXJlY3Rpb246IHN0cmluZyk6IG51bWJlclxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoZGlyZWN0aW9uKSB8fCBkaXJlY3Rpb24gPT09ICdhc2NlbmRpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKGRpcmVjdGlvbikgfHwgZGlyZWN0aW9uID09PSAnZGVzY2VuZGluZycpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0b2RvOiBsb2cgYmFkIGtleVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBzb3J0T3JkZXJpbmdGb3JOdW1iZXIoZGlyZWN0aW9uOiBudW1iZXIpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKGRpcmVjdGlvbikgfHwgZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2FzY2VuZGluZyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayhkaXJlY3Rpb24pIHx8IGRpcmVjdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiAnZGVzY2VuZGluZyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdG9kbzogbG9nIGJhZCBrZXlcbiAgICAgICAgcmV0dXJuICdhc2NlbmRpbmcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgdG9nZ2xlQWxsQ29sdW1ucyhldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtcyA9IHRoaXMuZGF0YVRvUmVuZGVyIHx8IFtdO1xuICAgICAgICBsZXQgc2VsZWN0ZWRPYmplY3QgPSB0aGlzLnN0YXRlLnNlbGVjdGlvbiB8fCBbXTtcbiAgICAgICAgaWYgKHNlbGVjdGVkT2JqZWN0Lmxlbmd0aCA+PSBjdXJyZW50SXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbiA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3Rpb24gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0aW9uID0gWy4uLmN1cnJlbnRJdGVtc107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaXNUb2dnbGVBbGxDb2x1bW5TZWxlY3RlZCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgY3VycmVudEl0ZW1zID0gdGhpcy5kYXRhVG9SZW5kZXIgfHwgW107XG4gICAgICAgIGxldCBzZWxlY3RlZE9iamVjdCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uIHx8IFtdO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50SXRlbXMubGVuZ3RoID4gMCAmJiBzZWxlY3RlZE9iamVjdC5sZW5ndGggPj0gY3VycmVudEl0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpc1RvZ2dsZUFsbENvbHVtbkRpc2FibGVkKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGxldCBjdXJyZW50SXRlbXMgPSB0aGlzLmRhdGFUb1JlbmRlciB8fCBbXTtcblxuICAgICAgICByZXR1cm4gY3VycmVudEl0ZW1zLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgYnkgdGVtcGxhdGUgdG8gZGVjaWRlIGlmIHdlIG5lZWQgdG8gcmVuZGVyIERldGFpbFJvdyB0ZW1wbGF0ZS4gV2UgbmVlZCB0byBoYXZlXG4gICAgICogRGV0YWlsUm93IENvbnRlbnRDaGlsZCBhbmQgdXNpbmcgRGV0YWlsUm93IGNvbXBvbmVudCBbaXNWaXNpYmxlRm5dIGZ1bmN0aW9uIGJpbmRpbmcgd2VcbiAgICAgKiBjaGVjayBpZiB0aGUgaXRlbSB0aGF0IGlzIGFib3V0IHRvIGJlIHJlbmRlcmVkIGlzIGVsaWdpYmxlIGZvciBkZXRhaWwgcm93XG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93RGV0YWlsQ29sdW1uKGl0ZW06IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmNhblVzZUZvckRldGFpbFJvdyhpdGVtKSAmJiB0aGlzLmRldGFpbFJvd0V4cGFuc2lvblN0YXRlLmlzRXhwYW5kZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNlZSBBV0RhdGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgaXNPdXRsaW5lKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jaGlsZHJlbikgfHwgdGhpcy5vdXRsaW5lRm9ybWF0ID09PSAndHJlZSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIGRlYWxpbmcgd2l0aCBkZXRhaWwgY29sdW1uIChkZXRhaWwgcm93KSBhbmQgb3V0bGluZSBhbGwgdG9nZXRoZXIgd2UgbmVlZCBoYXZlIGFcbiAgICAgKiBtZWNoYW5pc20gdG8gdGVsbCB0byB0aGUgb3V0bGluZSBcImRvbid0IHJlbmRlciB0aGUgbmV4dCBsZXZlbCBvZiBpdGVtc1wiIGFuZCB1c2UgZGV0YWlsIHJvdy5cbiAgICAgKiBTbyBjZXJ0YWluIGl0ZW0gdHlwZSBuZWVkcyB0byBiZSBza2lwcGVkLlxuICAgICAqXG4gICAgICogVGhlIHdheSB3ZSBza2lwIHRob3NlIGl0ZW0gaXMgd2UgdXNlIGlzVmlzaWJsZUZuIGNvbmRpdGlvbiBvZiB0aGUgZGV0YWlsIHJvdyBhbmQgbG9vayBhaGVhZFxuICAgICAqIGlmIHdlIHNob3VsZCBza2lwIG5leHQgbGV2ZWwuXG4gICAgICpcbiAgICAgKi9cbiAgICBza2lwT3V0bGluZUl0ZW0oaXRlbTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuVXNlRm9yRGV0YWlsUm93KGl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2VlIEFXRGFUYWJsZVxuICAgICAqXG4gICAgICovXG4gICAgZ2V0VmFsdWUoZGF0YTogYW55LCBmaWVsZDogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUoZGF0YSwgZmllbGQpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1uc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgc3VyZSB0aGF0IHdlIGFsc28gaW5jbHVkZSBwcm9ncmFtbWF0aWMgY29sdW1uIGlmIHByZXNlbnQuIE1vdmUgdGhlbSB0byB0aGUgY29ycmVjdFxuICAgICAqIGFycmF5XG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRGcm96ZW5Db2x1bW5zKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY29sc1F1ZXJ5XG4gICAgICAgICAgICAuZmlsdGVyKChjb2wxOiBEVENvbHVtbjJDb21wb25lbnQpID0+IGNvbDEuZnJvemVuKVxuICAgICAgICAgICAgLmZvckVhY2goKGNvbDogRFRDb2x1bW4yQ29tcG9uZW50KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbC5pbml0aWFsaXplKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuQ29sdW1ucy5wdXNoKGNvbCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmZyb3plbkNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gZmluZCBsYXN0IGluZGV4IG9mIGNvbHVtbiB0aGF0IGlzIGludGVybmFsIC8gcHJvZ3JhbW1hdGljXG5cbiAgICAgICAgICAgIGxldCBsYXN0SW54ID0gdGhpcy5jb2x1bW5zLnNsaWNlKClcbiAgICAgICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAgICAgLmZpbmRJbmRleCgoY29sOiBEVENvbHVtbjJDb21wb25lbnQpID0+IHRoaXMuaXNJbnRlcm5hbENvbHVtbihjb2wpKTtcblxuICAgICAgICAgICAgaWYgKGxhc3RJbnggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMuY29sdW1ucy5sZW5ndGggLSAxIC0gbGFzdElueDtcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJuYWxDb2xzID0gdGhpcy5jb2x1bW5zLnNwbGljZSgwLCBpZHggKyAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkNvbHVtbnMgPSBbLi4uaW50ZXJuYWxDb2xzLCAuLi50aGlzLmZyb3plbkNvbHVtbnNdO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBoYXNWYWxpZENvbHMgPSB0aGlzLmNvbHVtbnNcbiAgICAgICAgICAgICAgICAuZmluZEluZGV4KChjb2w6IERUQ29sdW1uMkNvbXBvbmVudCkgPT4gaXNCbGFuayhjb2wud2lkdGgpKSA9PT0gLTE7XG5cbiAgICAgICAgICAgIGFzc2VydChoYXNWYWxpZENvbHMgfHwgaXNQcmVzZW50KHRoaXMuc2Nyb2xsV2lkdGgpLFxuICAgICAgICAgICAgICAgICdXaGVuIHVzaW5nIFtmcm96ZW5dIGJpbmRpbmcgeW91IG5lZWQgc3BlY2lmeSBbd2lkdGhdIGZvciBlYWNoICcgK1xuICAgICAgICAgICAgICAgICdjb2x1bW4gb3IgW3Njcm9sbFdpZHRoXSBvbiBkYXRhdGFibGUhJyk7XG5cblxuICAgICAgICAgICAgYXNzZXJ0KGlzQmxhbmsodGhpcy5yb3dEZXRhaWxDb2x1bW4pLFxuICAgICAgICAgICAgICAgICdZb3UgY2Fubm90IGNvbWJpbmUgYXctZHQtZGV0YWlsLWNvbHVtbiB3aXRoIGZyb3plbiBjb2x1bW5zIScpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGN1cnJlbnQgaW1tdXRhYmxlIGxpc3QgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbi4gTmVlZCB0byB3cmFwIGl0IHdpdGhcbiAgICAgKiBzZXRUaW1lb3V0IGFzIHRoZSBjaGFuZ2UgY2FuIGVhc2lseSBjb21lIGFmdGVyIHZpZXcgY2hlY2tlZCBhbmQgdGhpcyB3b3VsZCByZXN1bHQgc29tZSBlcnJvcnNcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlTGlzdChuZXdMaXN0OiBhbnlbXSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gbmV3TGlzdDtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRGF0YUNoYW5nZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhblVzZUZvckRldGFpbFJvdyhpdGVtOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMucm93RGV0YWlsQ29sdW1uKSAmJlxuICAgICAgICAgICAgKDxEVERldGFpbFJvd0NvbXBvbmVudD50aGlzLnJvd0RldGFpbENvbHVtbikuc2hvd0RldGFpbFJvdyhpdGVtKTtcbiAgICB9XG59XG5cblxuXG4iXX0=